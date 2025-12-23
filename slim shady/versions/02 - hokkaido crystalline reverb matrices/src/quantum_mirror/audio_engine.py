import numpy as np

from .mirror_instance import MirrorInstance
from .routing import MirrorRouter
from .slim_shady_detector import SlimShadyDetector


class QuantumMirrorEngine:
    """Coordinates seven mirrors and routes audio through temporal portals."""

    def __init__(self, sample_rate: int = 48_000, mirror_count: int = 7, seed: int | None = None) -> None:
        self.sample_rate = sample_rate
        self.rng = np.random.default_rng(seed)
        self.mirrors = [MirrorInstance(idx, sample_rate=sample_rate) for idx in range(mirror_count)]
        self.router = MirrorRouter(self.mirrors)
        self.detector = SlimShadyDetector(sample_rate=sample_rate)
        self.portal_instability = False

    def process_block(self, buffer: np.ndarray) -> dict:
        """Process one audio block, returning routing metadata."""
        instability_triggered = self.detector.detect(buffer)
        if instability_triggered:
            self.portal_instability = True

        threshold_hit = self.router.passes_threshold(buffer)
        destination = 0
        routed_buffer = buffer
        if threshold_hit:
            routed_buffer, destination = self.router.route(
                buffer, portal_instability=self.portal_instability, rng=self.rng
            )

        processed = self.mirrors[destination].process(routed_buffer)

        return {
            "output": processed,
            "destination_mirror": destination,
            "threshold_crossed": threshold_hit,
            "portal_instability": self.portal_instability,
            "instability_triggered": instability_triggered,
        }

