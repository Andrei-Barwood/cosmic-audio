import numpy as np

from .audio_engine import QuantumMirrorEngine


def synthetic_buffer(sample_rate: int, samples: int, trigger_threshold: bool = False, vocalish: bool = False) -> np.ndarray:
    t = np.arange(samples) / sample_rate
    base = 0.2 * np.sin(2 * np.pi * 60 * t) + 0.2 * np.sin(2 * np.pi * 120 * t)

    if trigger_threshold:
        base += 0.9 * np.sin(2 * np.pi * 220 * t) + 0.7 * np.sin(2 * np.pi * 440 * t)

    if vocalish:
        base += 0.6 * np.sin(2 * np.pi * 185 * t)
        base += 0.35 * np.sin(2 * np.pi * 950 * t)
        base += 0.25 * np.sin(2 * np.pi * 3_200 * t)
        base += 0.15 * np.sin(2 * np.pi * 7_000 * t)

    noise = 0.02 * np.random.randn(samples)
    mono = base + noise
    stereo = np.stack([mono, mono], axis=0)
    return stereo


def portal_buffer(sample_rate: int, samples: int, freq: float = 528.0) -> np.ndarray:
    t = np.arange(samples) / sample_rate
    sig = 0.35 * np.sin(2 * np.pi * freq * t)
    stereo = np.stack([sig, sig], axis=0)
    return stereo


def run_demo() -> None:
    engine = QuantumMirrorEngine(sample_rate=48_000, seed=1337)
    sample_rate = 48_000
    block_size = 2_048

    buffers = [
        synthetic_buffer(sample_rate, block_size, trigger_threshold=False, vocalish=False),
        synthetic_buffer(sample_rate, block_size, trigger_threshold=True, vocalish=False),
        synthetic_buffer(sample_rate, block_size, trigger_threshold=True, vocalish=True),
    ]

    engine.start_temporal_recording()

    for idx, buf in enumerate(buffers, start=1):
        result = engine.process_block(buf)
        print(
            f"Block {idx}: dest={result['destination_mirror']}, threshold={result['threshold_crossed']}, instability={result['portal_instability']}, detector={result['instability_triggered']}"
        )

    stop_summary = engine.stop_temporal_recording(exit_mirror=3)
    print(f"Stopped recording via mirror {stop_summary['primary_exit']}; ghost portals: {stop_summary['ghost_freqs']}")

    portal = portal_buffer(sample_rate, block_size, freq=528.0)
    ghosted = engine.process_block(portal, summon_ghosts=True)
    print(
        f"Portal summon: ghosts={ghosted['ghosts']['ghosts_summoned']} portal_hits={ghosted['ghosts']['portal_hits']}"
    )


if __name__ == "__main__":
    run_demo()

