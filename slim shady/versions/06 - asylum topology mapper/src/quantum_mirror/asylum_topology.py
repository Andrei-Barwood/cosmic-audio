import numpy as np


def heptagram_vertices(radius: float = 1.0) -> np.ndarray:
    """Compute seven vertices in a heptagram ordering on the XY plane."""
    angles = np.arange(7) * (2 * np.pi / 7)
    # Star ordering: connect every second vertex (step=2)
    order = (np.arange(7) * 2) % 7
    verts = []
    for idx in order:
        a = angles[idx]
        verts.append([radius * np.cos(a), radius * np.sin(a), 0.0])
    return np.array(verts)


class AsylumTopologyMapper:
    """
    Conceptual ambisonic / VR navigation model.

    - Seven mirrors at heptagram vertices
    - Approaching a mirror shows an alternate mix "reflection" (metadata stub)
    - Crossing increments portal jump count and escalates glitch factor
    - Glitch peaks on the seventh jump
    """

    def __init__(self, radius: float = 1.0, glitch_max: float = 1.0, approach_threshold: float = 0.25) -> None:
        self.verts = heptagram_vertices(radius)
        self.approach_threshold = approach_threshold
        self.jump_count = 0
        self.glitch_level = 0.0
        self.glitch_max = glitch_max
        self.current_mirror = None

    def update_position(self, position: np.ndarray) -> dict:
        """
        Update user position (from VR or MIDI-mapped XY). Returns UI state:
        - nearest mirror
        - whether approaching (within threshold)
        - whether crossing (inside very small radius)
        - glitch level (0..glitch_max)
        """
        nearest_idx, dist = self._nearest_mirror(position)
        approaching = dist < self.approach_threshold
        crossing = dist < (self.approach_threshold * 0.3)

        reflection = {"mirror": nearest_idx, "alt_mix_hint": f"Alternate mix for mirror {nearest_idx}"}

        if crossing and nearest_idx != self.current_mirror:
            self.current_mirror = nearest_idx
            self.jump_count += 1
            self.glitch_level = min(self.glitch_max, self.jump_count / 7 * self.glitch_max)

        return {
            "nearest_mirror": nearest_idx,
            "distance": dist,
            "approaching": approaching,
            "crossing": crossing,
            "reflection": reflection,
            "jump_count": self.jump_count,
            "glitch_level": self.glitch_level,
            "glitch_peaked": self.glitch_level >= self.glitch_max,
        }

    def _nearest_mirror(self, position: np.ndarray) -> tuple[int, float]:
        diffs = self.verts - position
        dists = np.linalg.norm(diffs, axis=1)
        idx = int(np.argmin(dists))
        return idx, float(dists[idx])

