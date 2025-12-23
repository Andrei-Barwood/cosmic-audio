import numpy as np


class MirrorInstance:
    """Represents one mirror with an independent temporal bubble."""

    def __init__(self, mirror_id: int, sample_rate: int = 48_000, max_drift_seconds: float = 0.08) -> None:
        self.mirror_id = mirror_id
        self.sample_rate = sample_rate
        self.playhead = 0
        # Drift each mirror differently so they do not stay phase-aligned.
        self.drift_samples = int(max_drift_seconds * sample_rate * (0.3 + 0.7 * np.random.rand()))

    def process(self, buffer: np.ndarray) -> np.ndarray:
        """Apply a simple temporal offset to emulate playhead divergence."""
        if buffer is None or buffer.size == 0:
            return buffer

        drift_offset = (self.playhead + self.drift_samples) % max(1, buffer.shape[1])
        rotated = np.roll(buffer, shift=drift_offset, axis=1)
        self.playhead += buffer.shape[1]
        return rotated

