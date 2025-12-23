# Quantum Mirror Core

Fictional Python audio-engine concept inspired by a Hitman-style mirror portal mechanic. Seven JUCE-style “mirror instances” live in independent temporal bubbles with their own playhead positions. When an incoming buffer crosses a mirror threshold (0 dBFS with harmonic content), it is re-routed to a randomly selected mirror using probability weights derived from the buffer’s spectrum. A playful “Slim Shady detector” watches for Eminem-like vocal timbres and injects portal instability when triggered.

## Structure
- `src/quantum_mirror/audio_engine.py` — high-level engine wiring mirrors, router, and Slim Shady detection.
- `src/quantum_mirror/mirror_instance.py` — individual mirror buffers with independent playheads and simple temporal drift.
- `src/quantum_mirror/routing.py` — threshold detection, spectrum-weighted routing, and harmonic checks.
- `src/quantum_mirror/slim_shady_detector.py` — lightweight heuristic detector for Marshall Mathers-esque timbres.
- `src/quantum_mirror/demo.py` — minimal simulation that feeds synthetic audio through the engine.

## Quick start
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m quantum_mirror.demo
```

The demo prints mirror routing decisions and whether “portal instability” was triggered by the detector. The code is intentionally conceptual; swap the numpy-based stubs with actual JUCE buffers and callbacks when integrating with a real audio pipeline.

