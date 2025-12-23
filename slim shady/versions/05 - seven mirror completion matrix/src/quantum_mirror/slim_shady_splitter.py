import numpy as np

from .mirror_instance import MirrorInstance


class SlimShadyPersonaSplitter:
    """
    Conceptual VST3-like persona splitter.

    Uses a toy spectral heuristic to separate an "Eminem" stream (cleaner, lower
    centroid, less sibilance) from a "Slim Shady" stream (brighter, more edge),
    then offers a portal button to teleport Slim to a random mirror instance.

    Note: This is a placeholder for real neural voice cloning + source
    separation. Replace the heuristics and buffers with your model inference and
    JUCE/VST3 audio callbacks.
    """

    def __init__(self, sample_rate: int = 48_000, mirror_count: int = 7, seed: int | None = None) -> None:
        self.sample_rate = sample_rate
        self.rng = np.random.default_rng(seed)
        self.mirrors = [MirrorInstance(idx, sample_rate=sample_rate) for idx in range(mirror_count)]

    def process(self, buffer: np.ndarray, portal_button: bool = False) -> dict:
        """
        Split buffer into Eminem and Slim streams. If portal_button is pressed,
        Slim is sent through a random mirror instance.
        """
        if buffer is None or buffer.size == 0:
            return {"eminem": buffer, "slim": buffer, "portal_destination": None}

        eminem, slim = self._split_streams(buffer)

        portal_destination = None
        if portal_button:
            portal_destination = int(self.rng.integers(0, len(self.mirrors)))
            slim = self.mirrors[portal_destination].process(slim)

        return {"eminem": eminem, "slim": slim, "portal_destination": portal_destination}

    def _split_streams(self, buffer: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
        """
        Very rough heuristic separation based on spectral centroid and sibilance
        energy; not a real separator.
        """
        mono = buffer.mean(axis=0)
        spectrum = np.abs(np.fft.rfft(mono))
        freqs = np.fft.rfftfreq(mono.size, 1.0 / self.sample_rate)
        total = spectrum.sum() + 1e-9

        centroid = float(np.sum(freqs * spectrum) / total)
        sibilance = float(np.sum(spectrum[(freqs > 5_000) & (freqs < 10_000)])) / total

        # Blend weights to form two spectral emphasis curves
        eminem_weight = np.clip(1.2 - centroid / (self.sample_rate / 2), 0.2, 1.0) * (1.1 - sibilance * 2)
        slim_weight = 1.0 - eminem_weight

        # Apply simple per-channel weighting
        eminem_out = buffer * eminem_weight
        slim_out = buffer * slim_weight
        return eminem_out, slim_out

