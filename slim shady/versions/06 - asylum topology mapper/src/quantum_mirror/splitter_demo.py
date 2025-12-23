import numpy as np

from .slim_shady_splitter import SlimShadyPersonaSplitter


def make_vocalish(sample_rate: int, samples: int) -> np.ndarray:
    t = np.arange(samples) / sample_rate
    vox = 0.25 * np.sin(2 * np.pi * 185 * t) + 0.18 * np.sin(2 * np.pi * 450 * t)
    vox += 0.07 * np.sin(2 * np.pi * 7_000 * t)
    noise = 0.02 * np.random.randn(samples)
    mono = vox + noise
    return np.stack([mono, mono], axis=0)


def run_demo() -> None:
    sample_rate = 48_000
    block = 2_048
    splitter = SlimShadyPersonaSplitter(sample_rate=sample_rate, seed=4242)

    buf = make_vocalish(sample_rate, block)
    result = splitter.process(buf, portal_button=True)
    print(
        f"Portal dest mirror: {result['portal_destination']}, Eminem rms={rms(result['eminem']):.4f}, Slim rms={rms(result['slim']):.4f}"
    )


def rms(buffer: np.ndarray) -> float:
    if buffer is None or buffer.size == 0:
        return 0.0
    return float(np.sqrt(np.mean(buffer**2)))


if __name__ == "__main__":
    run_demo()

