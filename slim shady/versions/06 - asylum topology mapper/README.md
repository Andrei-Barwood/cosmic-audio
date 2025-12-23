# Quantum Mirror Core

Fictional Python audio-engine concept inspired by a Hitman-style mirror portal mechanic. Seven JUCE-style “mirror instances” live in independent temporal bubbles with their own playhead positions. When an incoming buffer crosses a mirror threshold (0 dBFS with harmonic content), it is re-routed to a randomly selected mirror using probability weights derived from the buffer’s spectrum. A playful “Slim Shady detector” watches for Eminem-like vocal timbres and injects portal instability when triggered.

## Structure
- `src/quantum_mirror/audio_engine.py` — high-level engine wiring mirrors, router, and Slim Shady detection.
- `src/quantum_mirror/mirror_instance.py` — individual mirror buffers with independent playheads and simple temporal drift.
- `src/quantum_mirror/routing.py` — threshold detection, spectrum-weighted routing, and harmonic checks.
- `src/quantum_mirror/slim_shady_detector.py` — lightweight heuristic detector for Marshall Mathers-esque timbres.
- `src/quantum_mirror/demo.py` — minimal simulation that feeds synthetic audio through the engine.
- `src/quantum_mirror/hokkaido_reverb.py` — seven Hokkaido crystalline reverb matrices with portal-frequency routing.
- `src/quantum_mirror/reverb_demo.py` — tiny driver to exercise the reverb matrix and portal activation.
- `src/quantum_mirror/temporal_paradox.py` — temporal paradox recorder that time-stretches into seven mirrors and stores ghost tracks.
- `src/quantum_mirror/temporal_demo.py` — demonstration of recording, exiting a mirror, and summoning ghost tracks via portal frequencies.
- `src/quantum_mirror/slim_shady_splitter.py` — conceptual persona splitter (Eminem vs Slim Shady) with portal button to teleport Slim to a random mirror instance.
- `src/quantum_mirror/splitter_demo.py` — demo that runs the splitter, routes Slim via portal, and keeps Eminem in the main timeline.
- `src/quantum_mirror/seven_mirror_matrix.py` — destructive processing chain requiring traversal of all seven mirrors before final export.
- `src/quantum_mirror/seven_matrix_demo.py` — walkthrough of the seven-mirror completion matrix.
- `src/quantum_mirror/asylum_topology.py` — heptagram ambisonic layout with portal jumps and glitch escalation.
- `src/quantum_mirror/asylum_demo.py` — simulates navigation, mirror crossings, and glitch accumulation.

## Quick start
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m quantum_mirror.demo
# Reverb matrix demo
python -m quantum_mirror.reverb_demo
# Temporal paradox recorder demo
python -m quantum_mirror.temporal_demo
# Slim Shady persona splitter demo
python -m quantum_mirror.splitter_demo
# Seven-mirror completion matrix demo
python -m quantum_mirror.seven_matrix_demo
# Asylum topology mapper demo
python -m quantum_mirror.asylum_demo
```

The demo prints mirror routing decisions and whether “portal instability” was triggered by the detector. The code is intentionally conceptual; swap the numpy-based stubs with actual JUCE buffers and callbacks when integrating with a real audio pipeline.

