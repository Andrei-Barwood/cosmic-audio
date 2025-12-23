import numpy as np


class MirrorRouter:
    """Handles threshold detection and spectrum-weighted routing across mirrors."""

    def __init__(self, mirrors: list, threshold_dbfs: float = 0.0) -> None:
        self.mirrors = mirrors
        self.threshold_linear = 10 ** (threshold_dbfs / 20)

    def passes_threshold(self, buffer: np.ndarray) -> bool:
        if buffer is None or buffer.size == 0:
            return False

        peak = np.max(np.abs(buffer))
        if peak < self.threshold_linear:
            return False

        mono = buffer.mean(axis=0)
        spectrum = np.abs(np.fft.rfft(mono))
        if spectrum.size < 4:
            return False

        fundamental_idx = np.argmax(spectrum[1:]) + 1
        fundamental_mag = spectrum[fundamental_idx]
        harmonic_energy = 0.0
        for harmonic in (2, 3, 4):
            idx = min(fundamental_idx * harmonic, spectrum.size - 1)
            harmonic_energy += spectrum[idx]

        return harmonic_energy > fundamental_mag * 0.8

    def route(self, buffer: np.ndarray, portal_instability: bool = False, rng: np.random.Generator | None = None) -> tuple[np.ndarray, int]:
        if buffer is None or buffer.size == 0:
            return buffer, 0

        rng = rng or np.random.default_rng()
        mono = buffer.mean(axis=0)
        spectrum = np.abs(np.fft.rfft(mono))
        freqs = np.fft.rfftfreq(mono.size, 1.0 / 48_000)

        band_edges = [
            (20, 120),
            (120, 300),
            (300, 800),
            (800, 2_000),
            (2_000, 4_000),
            (4_000, 8_000),
            (8_000, 16_000),
        ]

        energies = []
        for low, high in band_edges:
            band_mask = (freqs >= low) & (freqs < high)
            energy = float(np.sum(spectrum[band_mask])) + 1e-6
            energies.append(energy)

        weights = np.array(energies)
        if portal_instability:
            weights += rng.uniform(0.0, weights.mean() + 1e-3, size=weights.size)

        weights = weights / weights.sum()
        destination = int(rng.choice(len(self.mirrors), p=weights))
        return buffer.copy(), destination

