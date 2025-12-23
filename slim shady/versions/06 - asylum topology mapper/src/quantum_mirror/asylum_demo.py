import numpy as np

from .asylum_topology import AsylumTopologyMapper


def run_demo() -> None:
    mapper = AsylumTopologyMapper(radius=1.0, glitch_max=1.0, approach_threshold=0.25)

    # Simulate a path that visits around the heptagram
    path = []
    angles = np.linspace(0, 2 * np.pi, 20)
    for a in angles:
        path.append(np.array([1.05 * np.cos(a), 1.05 * np.sin(a), 0.0]))
    # Force some direct crossings
    for idx in range(7):
        v = mapper.verts[idx] * 0.05
        path.append(v)

    for step, pos in enumerate(path, start=1):
        state = mapper.update_position(pos)
        if state["crossing"]:
            print(
                f"Step {step}: CROSS mirror {state['nearest_mirror']} | glitch={state['glitch_level']:.2f} | jumps={state['jump_count']}"
            )
        elif state["approaching"]:
            print(f"Step {step}: approach mirror {state['nearest_mirror']} (dist={state['distance']:.2f})")

    final_state = mapper.update_position(mapper.verts[0] * 0.01)
    print(
        f"Final: jumps={final_state['jump_count']} glitch={final_state['glitch_level']:.2f} peaked={final_state['glitch_peaked']}"
    )


if __name__ == "__main__":
    run_demo()

