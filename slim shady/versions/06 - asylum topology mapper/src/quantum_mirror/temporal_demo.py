import numpy as np

from .temporal_paradox import TemporalParadoxRecorder


def make_phrase(sample_rate: int, samples: int) -> np.ndarray:
    t = np.arange(samples) / sample_rate
    phrase = 0.3 * np.sin(2 * np.pi * 330 * t) + 0.25 * np.sin(2 * np.pi * 660 * t)
    noise = 0.02 * np.random.randn(samples)
    mono = phrase + noise
    return np.stack([mono, mono], axis=0)


def make_portal_ping(sample_rate: int, samples: int, freq: float) -> np.ndarray:
    t = np.arange(samples) / sample_rate
    sig = 0.4 * np.sin(2 * np.pi * freq * t)
    return np.stack([sig, sig], axis=0)


def run_demo() -> None:
    sample_rate = 48_000
    block = 2_048
    recorder = TemporalParadoxRecorder(sample_rate=sample_rate)

    # Record a few blocks
    for _ in range(3):
        recorder.record_block(make_phrase(sample_rate, block))

    # Exit through mirror index 3 (reverse take)
    summary = recorder.stop(exit_mirror=3)
    print(f"Stopped recording. Exit mirror: {summary['primary_exit']}, ghosts: {summary['ghost_freqs']}")

    # Summon a ghost by sending a portal-frequency ping
    portal_buffer = make_portal_ping(sample_rate, block, freq=528)
    summon = recorder.summon(portal_buffer)
    print(f"Portal hits: {summon['portal_hits']}, ghosts summoned: {summon['ghosts_summoned']}")


if __name__ == "__main__":
    run_demo()

