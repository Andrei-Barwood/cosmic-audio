from music21 import note, interval

# Define Hungarian minor intervals (semitones: 0,2,3,6,7,8,11)
hungarian_intervals = [0, 2, 3, 6, 7, 8, 11]

def generate_hungarian_minor(root_note):
    """Generate Hungarian minor scale from given root using manual transposition."""
    try:
        # Preprocess: remove quotes, uppercase note, handle flats
        root_note = root_note.strip().strip("'\"").upper()
        if 'FLAT' in root_note:
            root_note = root_note.replace('FLAT', 'B')
        root = note.Note(root_note)
        pitches = [root]
        current = root
        for i in hungarian_intervals[1:]:
            current = current.transpose(interval.Interval(i))
            pitches.append(current)
        # Format as note names with octave (starts at C4 for consistency, but transposes accordingly)
        note_names = [p.nameWithOctave for p in pitches]
        return note_names
    except Exception as e:
        raise ValueError(f"Invalid root note '{root_note}': {e}")

# Main loop: Ask one at a time
print("Hungarian Minor Scale Generator")
print("Enter root notes (e.g., 'C', 'A#', 'Bb', 'A flat') one at a time. Type 'quit' to stop.\n")

while True:
    user_input = input("Enter root note: ").strip()
    if not user_input or user_input.lower() == 'quit':
        if not user_input:
            print("Empty input ignored. Try again or type 'quit' to exit.\n")
            continue
        print("Exiting.")
        break
    try:
        scale_notes = generate_hungarian_minor(user_input)
        print(f"{user_input} Hungarian Minor: {' - '.join(scale_notes)}\n")
    except ValueError as e:
        print(f"{e}. Please try again.\n")
