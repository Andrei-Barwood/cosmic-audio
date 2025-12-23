import numpy as np

from .mirror_instance import MirrorInstance
from .routing import MirrorRouter
from .slim_shady_detector import SlimShadyDetector
from .temporal_paradox import TemporalParadoxRecorder


class QuantumMirrorEngine:
    """Coordinates seven mirrors and routes audio through temporal portals."""

    def __init__(self, sample_rate: int = 48_000, mirror_count: int = 7, seed: int | None = None) -> None:
        self.sample_rate = sample_rate
        self.rng = np.random.default_rng(seed)
        self.mirrors = [MirrorInstance(idx, sample_rate=sample_rate) for idx in range(mirror_count)]
        self.router = MirrorRouter(self.mirrors)
        self.detector = SlimShadyDetector(sample_rate=sample_rate)
        self.portal_instability = False
        self.recorder = TemporalParadoxRecorder(sample_rate=sample_rate)
        self.recording_active = False

    def start_temporal_recording(self) -> None:
        """Begin capturing into all mirrors with time-stretch ratios."""
        self.recorder.start()
        self.recording_active = True

    def stop_temporal_recording(self, exit_mirror: int = 0) -> dict:
        """Stop recording and select which mirror's take becomes primary."""
        summary = self.recorder.stop(exit_mirror=exit_mirror)
        self.recording_active = False
        return summary

    def process_block(self, buffer: np.ndarray, summon_ghosts: bool = False) -> dict:
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

        if self.recording_active:
            self.recorder.record_block(buffer)

        processed = self.mirrors[destination].process(routed_buffer)

        ghost_meta = {"portal_hits": [], "ghosts_summoned": []}
        if summon_ghosts:
            summon_result = self.recorder.summon(processed)
            processed = summon_result["output"]
            ghost_meta = {k: v for k, v in summon_result.items() if k != "output"}

        return {
            "output": processed,
            "destination_mirror": destination,
            "threshold_crossed": threshold_hit,
            "portal_instability": self.portal_instability,
            "instability_triggered": instability_triggered,
            "ghosts": ghost_meta,
        }

