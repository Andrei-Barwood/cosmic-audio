import numpy as np


class SlimShadyDetector:
    """
    Lightweight heuristic for Eminem-like vocal timbre.

    Looks for energy in low baritone fundamentals plus nasal/formant-heavy mids
    and boosted sibilance, blended with a spectral centroid check.
    """

    def __init__(self, sample_rate: int = 48_000, sensitivity: float = 0.55) -> None:
        self.sample_rate = sample_rate
        self.sensitivity = sensitivity

    def _band_energy(self, spectrum: np.ndarray, freqs: np.ndarray, lo: float, hi: float) -> float:
        mask = (freqs >= lo) & (freqs < hi)
        return float(np.sum(spectrum[mask]))

    def detect(self, buffer: np.ndarray) -> bool:
        if buffer is None or buffer.size == 0:
            return False

        mono = buffer.mean(axis=0)
        spectrum = np.abs(np.fft.rfft(mono))
        if np.allclose(spectrum.sum(), 0.0):
            return False

        freqs = np.fft.rfftfreq(mono.size, 1.0 / self.sample_rate)
        low = self._band_energy(spectrum, freqs, 80, 260)
        nasal = self._band_energy(spectrum, freqs, 800, 3_000)
        sibilance = self._band_energy(spectrum, freqs, 5_000, 9_000)

        centroid = float(np.sum(freqs * spectrum) / (np.sum(spectrum) + 1e-9))
        centroid_norm = centroid / (self.sample_rate / 2)

        score = (
            0.3 * self._safe_norm(low, spectrum)
            + 0.4 * self._safe_norm(nasal, spectrum)
            + 0.2 * self._safe_norm(sibilance, spectrum)
            + 0.1 * centroid_norm
        )
        return score > self.sensitivity

    def _safe_norm(self, value: float, spectrum: np.ndarray) -> float:
        total = float(np.sum(spectrum)) + 1e-9
        return value / total

