import numpy as np

from .seven_mirror_matrix import SevenMirrorCompletionMatrix, rms


def make_mix(sample_rate: int, samples: int) -> np.ndarray:
    t = np.arange(samples) / sample_rate
    mix = 0.3 * np.sin(2 * np.pi * 110 * t) + 0.2 * np.sin(2 * np.pi * 440 * t)
    mix += 0.1 * np.sin(2 * np.pi * 880 * t)
    noise = 0.02 * np.random.randn(samples)
    mono = mix + noise
    return np.stack([mono, mono], axis=0)


def run_demo() -> None:
    sample_rate = 48_000
    block = 8_192
    matrix = SevenMirrorCompletionMatrix(sample_rate=sample_rate, seed=7)

    buf = make_mix(sample_rate, block)
    result = matrix.process(buf)
    print(f"Export ready: {result['export_ready']}, stage={result['stage']}, rms={result['rms']:.4f}")


if __name__ == "__main__":
    run_demo()

