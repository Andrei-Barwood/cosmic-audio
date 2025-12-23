import numpy as np

from .hokkaido_reverb import HokkaidoReverbMatrix, PORTAL_FREQS


def make_buffer(sample_rate: int, samples: int, include_portal: bool = False) -> np.ndarray:
    t = np.arange(samples) / sample_rate
    sig = 0.2 * np.sin(2 * np.pi * 250 * t) + 0.15 * np.sin(2 * np.pi * 620 * t)
    if include_portal:
        for freq in PORTAL_FREQS:
            sig += 0.05 * np.sin(2 * np.pi * freq * t)
    noise = 0.02 * np.random.randn(samples)
    mono = sig + noise
    return np.stack([mono, mono], axis=0)


def run_demo() -> None:
    sample_rate = 48_000
    block = 4_096
    matrix = HokkaidoReverbMatrix(sample_rate=sample_rate, seed=2025)

    clean = make_buffer(sample_rate, block, include_portal=False)
    portal = make_buffer(sample_rate, block, include_portal=True)

    for label, buf in [("clean", clean), ("portal", portal)]:
        result = matrix.process(buf, algorithm_index=0)
        print(
            f"{label}: algo={result['algorithm_index']} portal={result['portal_active']} hits={result['portal_hits']}"
        )


if __name__ == "__main__":
    run_demo()

