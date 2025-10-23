from music21 import note, interval, chord, pitch

# Define scale intervals (semitones from root)
SCALES = {
    'hungarian_minor': [0, 2, 3, 6, 7, 8, 11],
    'phrygian_dominant': [0, 1, 4, 5, 7, 8, 10]
}

def generate_scale(root_note, scale_type):
    """Generate scale pitches from given root and scale type."""
    try:
        # Preprocess: remove quotes, uppercase note, handle flats
        root_note = root_note.strip().strip("'\"").upper()
        if 'FLAT' in root_note:
            root_note = root_note.replace('FLAT', 'B')
        
        # Ensure root has octave (default to 4 if not specified)
        if not any(char.isdigit() for char in root_note):
            root_note += '4'
        
        root = note.Note(root_note)
        pitches = []
        scale_intervals = SCALES[scale_type]
        
        for i in scale_intervals:
            p = root.transpose(interval.Interval(i))
            # Ensure octave is set explicitly by checking pitch space
            if p.pitch.ps < root.pitch.ps and i > 0:  # Wrapped below, add octave
                p.octave = root.octave + 1
            elif p.octave is None:
                p.octave = root.octave
            pitches.append(p)
        
        return pitches
    except Exception as e:
        raise ValueError(f"Invalid root note '{root_note}': {e}")

def build_diatonic_chords(pitches, chord_type):
    """Build diatonic chords of specified type from scale pitches, with all inversions."""
    chords_by_degree = {}
    
    for degree in range(7):  # Degrees 0-6 (1-7)
        if chord_type == 'suspended':
            # Sus4: degrees 0, 3, 4 from root degree
            degree_indices = [degree % 7, (degree + 3) % 7, (degree + 4) % 7]
        elif chord_type == 'seventh':
            # Seventh: stack every other degree (0,2,4,6)
            degree_indices = [(degree + i * 2) % 7 for i in range(4)]
        elif chord_type == 'ninth':
            # Ninth: seventh + 9th (2nd degree + octave)
            degree_indices = [(degree + i * 2) % 7 for i in range(5)]
        
        # Build chord with proper octave voicing
        chord_pitches = []
        base_octave = pitches[0].octave
        prev_index = degree % 7
        
        for idx, scale_idx in enumerate(degree_indices):
            p = pitches[scale_idx].transpose(0)  # Copy
            # Set octave: if wrapping backward in scale, increment octave
            if idx == 0:
                p.octave = base_octave
            else:
                if scale_idx <= prev_index:
                    p.octave = chord_pitches[-1].octave + 1
                else:
                    p.octave = chord_pitches[-1].octave
                # Final check: ensure ascending pitch space
                if p.pitch.ps <= chord_pitches[-1].pitch.ps:
                    p.octave += 1
            chord_pitches.append(p)
            prev_index = scale_idx
        
        ch = chord.Chord(chord_pitches)
        # Generate root + inversions with None check
        inversions = [ch]  # Root position
        for i in range(1, len(chord_pitches)):
            try:
                inv_ch = ch.inversion(i)
                if inv_ch is not None:  # Check for None
                    inversions.append(inv_ch)
            except Exception:
                pass  # Skip failed inversions
        chords_by_degree[degree + 1] = inversions
    return chords_by_degree

# Prompt for scale type once
print("Scale and Chord Generator")
print("Select scale type (once): 1=Hungarian Minor, 2=Phrygian Dominant")
scale_choice = input("Enter choice (1/2): ").strip()
scale_type_map = {'1': 'hungarian_minor', '2': 'phrygian_dominant'}
scale_names = {'hungarian_minor': 'Hungarian Minor', 'phrygian_dominant': 'Phrygian Dominant'}

if scale_choice not in scale_type_map:
    print("Invalid choice. Defaulting to Hungarian Minor.")
    scale_type = 'hungarian_minor'
else:
    scale_type = scale_type_map[scale_choice]
print(f"Selected: {scale_names[scale_type]}\n")

# Prompt for chord type once
print("Select chord type (once): 1=Seventh, 2=Ninth, 3=Suspended")
chord_choice = input("Enter choice (1/2/3): ").strip()
chord_type_map = {'1': 'seventh', '2': 'ninth', '3': 'suspended'}
if chord_choice not in chord_type_map:
    print("Invalid choice. Defaulting to seventh.")
    chord_type = 'seventh'
else:
    chord_type = chord_type_map[chord_choice]
print(f"Selected: {chord_type.capitalize()} chords\n")

print("Enter root notes (e.g., 'C', 'A#', 'Bb', 'A flat') one at a time. Type 'quit' to stop.\n")

# Main loop: Ask one at a time
while True:
    user_input = input("Enter root note: ").strip()
    if not user_input or user_input.lower() == 'quit':
        if not user_input:
            print("Empty input ignored. Try again or type 'quit' to exit.\n")
            continue
        print("Exiting.")
        break
    try:
        scale_pitches = generate_scale(user_input, scale_type)
        scale_notes = [p.nameWithOctave for p in scale_pitches]
        print(f"{user_input} {scale_names[scale_type]} Scale: {' - '.join(scale_notes)}\n")
        
        chords = build_diatonic_chords(scale_pitches, chord_type)
        for degree, inv_list in chords.items():
            print(f"Degree {degree} {chord_type.capitalize()} Chords:")
            for idx, inv_ch in enumerate(inv_list):
                if inv_ch is not None:  # Safety check
                    inv_type = "Root" if idx == 0 else f"Inv {idx}"
                    chord_notes = ' - '.join([p.nameWithOctave for p in inv_ch.pitches])
                    print(f"  {inv_type}: {chord_notes}")
            print("")
    except ValueError as e:
        print(f"{e}. Please try again.\n")
