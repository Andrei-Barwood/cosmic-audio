import numpy as np

from .hokkaido_reverb import PORTAL_FREQS, band_energy


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


class TemporalParadoxRecorder:
    """
    Records into seven mirrors with different time-stretch ratios.

    Ratios: 1x, 0.5x, 2x, -1x (reverse), 1.618x, 3.14159x, 0 (quantum silence).
    On stop, the exit mirror becomes the primary take; others become ghost tracks
    summonable by portal frequencies.
    """

    def __init__(self, sample_rate: int = 48_000) -> None:
        self.sample_rate = sample_rate
        self.ratios = [1.0, 0.5, 2.0, -1.0, 1.618, 3.14159, 0.0]
        self.start()

    def _reset_active(self) -> None:
        self.active_takes: list[np.ndarray | None] = [None] * 7

    def start(self) -> None:
        """Begin a new recording pass."""
        self._reset_active()
        self.primary_take: np.ndarray | None = None
        self.ghost_tracks: dict[float, np.ndarray] = {}

    def record_block(self, buffer: np.ndarray) -> None:
        """Capture an incoming block into all mirror takes with stretching."""
        if buffer is None or buffer.size == 0:
            return

        for idx, ratio in enumerate(self.ratios):
            stretched = self._time_stretch(buffer, ratio)
            if self.active_takes[idx] is None:
                self.active_takes[idx] = stretched
            else:
                self.active_takes[idx] = np.concatenate([self.active_takes[idx], stretched], axis=1)

    def stop(self, exit_mirror: int = 0) -> dict:
        """
        Finalize the recording, preserving only the exit mirror as primary.
        Others become ghost tracks keyed by their portal frequency.
        """
        exit_mirror = exit_mirror % len(self.ratios)
        self.primary_take = self.active_takes[exit_mirror]
        self.ghost_tracks = {}
        for idx, take in enumerate(self.active_takes):
            if take is None:
                continue
            if idx == exit_mirror:
                continue
            freq = PORTAL_FREQS[idx]
            self.ghost_tracks[freq] = take

        summary = {
            "primary_exit": exit_mirror,
            "primary_samples": None if self.primary_take is None else self.primary_take.shape[1],
            "ghost_count": len(self.ghost_tracks),
            "ghost_freqs": list(self.ghost_tracks.keys()),
        }
        self._reset_active()
        return summary

    def summon(self, buffer: np.ndarray) -> dict:
        """
        Pass audio through to awaken ghost tracks at matching portal frequencies.
        Returns a mix of input + summoned ghosts (if any).
        """
        if buffer is None or buffer.size == 0:
            return {"output": buffer, "portal_hits": [], "ghosts_summoned": []}

        portal_active, hits = detect_portal(buffer, self.sample_rate)
        ghosts_used: list[float] = []
        output = buffer.copy()

        if portal_active:
            for freq in hits:
                ghost = self.ghost_tracks.get(freq)
                if ghost is None:
                    continue
                output = self._mix(output, ghost)
                ghosts_used.append(freq)

        return {"output": output, "portal_hits": hits, "ghosts_summoned": ghosts_used}

    def _time_stretch(self, buffer: np.ndarray, ratio: float) -> np.ndarray:
        """Simple time-stretch using interpolation; negative ratio reverses."""
        if ratio == 0.0:
            return np.zeros_like(buffer)

        reverse = ratio < 0
        ratio = abs(ratio)

        num_samples = buffer.shape[1]
        target_samples = max(1, int(num_samples * ratio))
        t_original = np.arange(num_samples)
        t_target = np.linspace(0, num_samples - 1, target_samples)

        stretched_channels = []
        for ch in buffer:
            stretched_channels.append(np.interp(t_target, t_original, ch))
        stretched = np.stack(stretched_channels, axis=0)

        if reverse:
            stretched = np.flip(stretched, axis=1)
        return stretched

    def _mix(self, a: np.ndarray, b: np.ndarray, pad_value: float = 0.0) -> np.ndarray:
        """Length-align two buffers and mix."""
        max_len = max(a.shape[1], b.shape[1])
        a_padded = self._pad(a, max_len, pad_value)
        b_padded = self._pad(b, max_len, pad_value)
        return a_padded + b_padded

    def _pad(self, buf: np.ndarray, target: int, pad_value: float) -> np.ndarray:
        if buf.shape[1] >= target:
            return buf
        pad_width = target - buf.shape[1]
        pad = np.full((buf.shape[0], pad_width), pad_value, dtype=buf.dtype)
        return np.concatenate([buf, pad], axis=1)

