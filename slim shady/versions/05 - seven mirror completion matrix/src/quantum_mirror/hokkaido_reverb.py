import numpy as np

PORTAL_FREQS = [432, 528, 741, 852, 963, 1111, 1212]


def band_energy(spectrum: np.ndarray, freqs: np.ndarray, center: float, width: float = 4.0) -> float:
    mask = (freqs >= center - width) & (freqs <= center + width)
    return float(np.sum(spectrum[mask]))


def detect_portal(buffer: np.ndarray, sample_rate: int) -> tuple[bool, list[float]]:
    if buffer is None or buffer.size == 0:
        return False, []

    mono = buffer.mean(axis=0)
    spectrum = np.abs(np.fft.rfft(mono))
    if np.allclose(spectrum.sum(), 0.0):
        return False, []

    freqs = np.fft.rfftfreq(mono.size, 1.0 / sample_rate)
    total = float(np.sum(spectrum)) + 1e-9
    hits = []
    for freq in PORTAL_FREQS:
        energy = band_energy(spectrum, freqs, freq)
        if energy / total > 0.08:
            hits.append(freq)

    return len(hits) > 0, hits


class BaseReverb:
    def __init__(self, sample_rate: int = 48_000) -> None:
        self.sample_rate = sample_rate

    def process(self, buffer: np.ndarray) -> np.ndarray:
        raise NotImplementedError


class CryogenicChamber(BaseReverb):
    """Infinite freeze with slow bleed."""

    def __init__(self, sample_rate: int = 48_000, bleed: float = 0.02) -> None:
        super().__init__(sample_rate)
        self.bleed = bleed
        self.frozen: np.ndarray | None = None

    def process(self, buffer: np.ndarray) -> np.ndarray:
        if buffer is None or buffer.size == 0:
            return buffer
        if self.frozen is None:
            self.frozen = buffer.copy()
        else:
            self.frozen = (1 - self.bleed) * self.frozen + self.bleed * buffer
        return self.frozen


class HotSprings(BaseReverb):
    """Steam density modulation via modulated comb delay."""

    def __init__(self, sample_rate: int = 48_000, base_delay_ms: float = 35.0) -> None:
        super().__init__(sample_rate)
        self.base_delay = int(base_delay_ms * sample_rate / 1000)
        self.phase = 0.0

    def process(self, buffer: np.ndarray) -> np.ndarray:
        if buffer is None or buffer.size == 0:
            return buffer
        self.phase += 0.07
        mod = int(self.base_delay * (0.7 + 0.3 * np.sin(self.phase)))
        return np.roll(buffer, shift=mod, axis=1) * 0.7 + buffer * 0.3


class SurgicalSuite(BaseReverb):
    """Sterile convolution with short clinical impulse."""

    def __init__(self, sample_rate: int = 48_000) -> None:
        super().__init__(sample_rate)
        taps = int(0.012 * sample_rate)
        impulse = np.zeros(taps)
        impulse[0] = 1.0
        impulse[taps // 4] = 0.2
        impulse[taps // 2] = 0.05
        self.impulse = impulse

    def process(self, buffer: np.ndarray) -> np.ndarray:
        if buffer is None or buffer.size == 0:
            return buffer
        convolved = []
        for ch in buffer:
            convolved.append(np.convolve(ch, self.impulse, mode="same"))
        return np.stack(convolved, axis=0)


class Morgue(BaseReverb):
    """Subharmonic decay that pulls tails downward."""

    def __init__(self, sample_rate: int = 48_000, decay: float = 0.5) -> None:
        super().__init__(sample_rate)
        self.decay = decay

    def process(self, buffer: np.ndarray) -> np.ndarray:
        if buffer is None or buffer.size == 0:
            return buffer
        down = buffer[:, ::2]
        stretched = np.repeat(down, 2, axis=1)
        return 0.6 * buffer + 0.4 * stretched * self.decay


class Garden(BaseReverb):
    """Botanical IR with random early reflections."""

    def __init__(self, sample_rate: int = 48_000) -> None:
        super().__init__(sample_rate)
        rng = np.random.default_rng(777)
        taps = int(0.08 * sample_rate)
        impulse = rng.random(taps) * np.exp(-np.linspace(0, 4, taps))
        impulse[0] = 1.0
        self.impulse = impulse

    def process(self, buffer: np.ndarray) -> np.ndarray:
        if buffer is None or buffer.size == 0:
            return buffer
        convolved = []
        for ch in buffer:
            convolved.append(np.convolve(ch, self.impulse, mode="same"))
        return np.stack(convolved, axis=0)


class Helipad(BaseReverb):
    """Open-air doppler with gentle pitch drift."""

    def __init__(self, sample_rate: int = 48_000) -> None:
        super().__init__(sample_rate)
        self.phase = 0.0

    def process(self, buffer: np.ndarray) -> np.ndarray:
        if buffer is None or buffer.size == 0:
            return buffer
        self.phase += 0.03
        rate = 1.0 + 0.01 * np.sin(self.phase)
        idx = np.arange(buffer.shape[1]) * rate
        idx = np.mod(idx, buffer.shape[1]).astype(int)
        return buffer[:, idx]


class SecurityRoom(BaseReverb):
    """Gated surveillance reverb with fast noise gate."""

    def __init__(self, sample_rate: int = 48_000, gate_threshold: float = 0.12) -> None:
        super().__init__(sample_rate)
        self.gate_threshold = gate_threshold
        self.prev_gain = 0.0

    def process(self, buffer: np.ndarray) -> np.ndarray:
        if buffer is None or buffer.size == 0:
            return buffer
        envelope = np.mean(np.abs(buffer), axis=0)
        gate = (envelope > self.gate_threshold).astype(float)
        # Smooth the gate to avoid clicks.
        gate = np.convolve(gate, np.ones(64) / 64, mode="same")
        self.prev_gain = 0.8 * self.prev_gain + 0.2 * gate.max()
        return buffer * gate * (0.6 + 0.4 * self.prev_gain)


class HokkaidoReverbMatrix:
    """Coordinates seven distinct reverbs and portal routing."""

    def __init__(self, sample_rate: int = 48_000, seed: int | None = None) -> None:
        self.sample_rate = sample_rate
        self.rng = np.random.default_rng(seed)
        self.reverbs = [
            CryogenicChamber(sample_rate),
            HotSprings(sample_rate),
            SurgicalSuite(sample_rate),
            Morgue(sample_rate),
            Garden(sample_rate),
            Helipad(sample_rate),
            SecurityRoom(sample_rate),
        ]

    def process(self, buffer: np.ndarray, algorithm_index: int = 0) -> dict:
        portal_active, hits = detect_portal(buffer, self.sample_rate)
        chosen = algorithm_index
        if portal_active:
            chosen = int(self.rng.choice(len(self.reverbs)))
        chosen = chosen % len(self.reverbs)
        processed = self.reverbs[chosen].process(buffer)
        return {
            "output": processed,
            "portal_active": portal_active,
            "portal_hits": hits,
            "algorithm_index": chosen,
        }

