import numpy as np


def rms(x: np.ndarray) -> float:
    return float(np.sqrt(np.mean(x**2))) if x is not None and x.size else 0.0


class SevenMirrorCompletionMatrix:
    """
    Destructive seven-stage mirror traversal. Audio must pass through all
    mirrors; final export is only available after Mirror 7.
    """

    def __init__(self, sample_rate: int = 48_000, seed: int | None = None) -> None:
        self.sample_rate = sample_rate
        self.rng = np.random.default_rng(seed)
        # Store frozen spectrum for Mirror 2
        self._frozen_spectrum = None
        # Precompute facility IRs for Mirror 3
        self._irs = self._make_irs()

    def process(self, buffer: np.ndarray) -> dict:
        if buffer is None or buffer.size == 0:
            return {"output": buffer, "stage": 7, "export_ready": False}

        x = buffer.copy()
        meta = {}

        x = self._mirror1_bit_crush(x)
        x, meta["mirror2_freeze_active"] = self._mirror2_spectral_freeze(x)
        x = self._mirror3_convolution(x)
        x = self._mirror4_granular_stretch(x)
        x = self._mirror5_formant_shift_jp(x)
        x = self._mirror6_binaural_8d(x)
        x = self._mirror7_ai_mastering(x)

        meta.update(
            {
                "stage": 7,
                "export_ready": True,
                "rms": rms(x),
            }
        )
        return {"output": x, **meta}

    # Mirror 1: Bit-crusher
    def _mirror1_bit_crush(self, x: np.ndarray, bits: int = 8, downsample: int = 2) -> np.ndarray:
        peak = np.max(np.abs(x)) + 1e-9
        step = 2 / (2**bits)
        crushed = np.round(x / step) * step
        crushed = crushed[::, ::downsample]
        # stretch back to original length
        crushed = np.repeat(crushed, downsample, axis=1)
        crushed = crushed[:, : x.shape[1]]
        return crushed * peak

    # Mirror 2: Spectral freeze
    def _mirror2_spectral_freeze(self, x: np.ndarray) -> tuple[np.ndarray, bool]:
        mono = x.mean(axis=0)
        spectrum = np.fft.rfft(mono)
        if self._frozen_spectrum is None:
            self._frozen_spectrum = spectrum
            frozen_active = False
        else:
            frozen_active = True
        frozen = np.fft.irfft(self._frozen_spectrum, n=mono.size)
        out = np.stack([frozen, frozen], axis=0)
        return out, frozen_active

    # Mirror 3: Convolution with facility IRs
    def _mirror3_convolution(self, x: np.ndarray) -> np.ndarray:
        ir = self.rng.choice(self._irs)
        convolved = []
        for ch in x:
            convolved.append(np.convolve(ch, ir, mode="same"))
        return np.stack(convolved, axis=0)

    # Mirror 4: Granular time-stretch
    def _mirror4_granular_stretch(self, x: np.ndarray, grain: int = 256, stretch: float = 1.35) -> np.ndarray:
        num_samples = x.shape[1]
        grains = []
        for start in range(0, num_samples, grain):
            g = x[:, start : start + grain]
            grains.append(g)
        # Random re-order and duplication
        self.rng.shuffle(grains)
        dup_count = max(1, int(len(grains) * (stretch - 1)))
        for _ in range(dup_count):
            grains.insert(self.rng.integers(0, len(grains) + 1), grains[self.rng.integers(0, len(grains))])
        stretched = np.concatenate(grains, axis=1)
        return stretched[:, :num_samples]

    # Mirror 5: Formant shift to Japanese scales (approx via spectral tilt)
    def _mirror5_formant_shift_jp(self, x: np.ndarray) -> np.ndarray:
        mono = x.mean(axis=0)
        spectrum = np.fft.rfft(mono)
        freqs = np.fft.rfftfreq(mono.size, 1.0 / self.sample_rate)
        # Emphasize scale-related formants (rough heuristic)
        jp_formants = [262, 294, 330, 392, 440, 494]  # C major pentatonic-ish
        tilt = np.ones_like(spectrum, dtype=float)
        for f in jp_formants:
            mask = (freqs > f * 0.9) & (freqs < f * 1.1)
            tilt[mask] *= 1.4
        shaped = spectrum * tilt
        shifted = np.fft.irfft(shaped, n=mono.size)
        return np.stack([shifted, shifted], axis=0)

    # Mirror 6: Binaural 8D conversion (pan LFO)
    def _mirror6_binaural_8d(self, x: np.ndarray) -> np.ndarray:
        t = np.linspace(0, 2 * np.pi, x.shape[1])
        pan = 0.5 + 0.5 * np.sin(t * 0.25)
        left = x[0] * pan
        right = x[1] * (1 - pan)
        return np.stack([left, right], axis=0)

    # Mirror 7: AI mastering with aggression profile (compress + clip)
    def _mirror7_ai_mastering(self, x: np.ndarray, threshold: float = 0.4, makeup: float = 1.5) -> np.ndarray:
        envelope = np.mean(np.abs(x), axis=0)
        gain_reduction = np.clip(envelope / (threshold + 1e-6), 0, 1)
        gain = 1.0 / (1.0 + gain_reduction)
        gain = gain * makeup
        out = x * gain
        out = np.clip(out, -0.98, 0.98)
        return out

    def _make_irs(self, count: int = 4, length_ms: float = 80.0) -> list[np.ndarray]:
        length = int(self.sample_rate * length_ms / 1000)
        irs = []
        for _ in range(count):
            base = self.rng.standard_normal(length) * np.exp(-np.linspace(0, 6, length))
            base[0] = 1.0
            irs.append(base)
        return irs

