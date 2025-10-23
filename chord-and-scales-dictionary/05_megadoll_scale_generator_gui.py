import tkinter as tk
from tkinter import ttk, scrolledtext
from music21 import note, interval, chord

# Define scale intervals (semitones from root)
SCALES = {
    'Hungarian Minor': [0, 2, 3, 6, 7, 8, 11],
    'Phrygian Dominant': [0, 1, 4, 5, 7, 8, 10],
    'Augmented': [0, 3, 4, 7, 8, 11]
}

def normalize_note_name(note_name):
    """Convert music21's hyphen flat notation (E-) to standard format (Eb)."""
    return note_name.replace('-', 'b')

def generate_scale(root_note, scale_type):
    """Generate scale pitches from given root and scale type."""
    try:
        root_note = root_note.strip().strip("'\"").upper()
        if 'FLAT' in root_note:
            root_note = root_note.replace('FLAT', 'B')
        
        if not any(char.isdigit() for char in root_note):
            root_note += '4'
        
        root = note.Note(root_note)
        pitches = []
        scale_intervals = SCALES[scale_type]
        
        for i in scale_intervals:
            p = root.transpose(interval.Interval(i))
            if p.pitch.ps < root.pitch.ps and i > 0:
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
    scale_length = len(pitches)
    
    for degree in range(scale_length):
        if chord_type == 'Suspended':
            degree_indices = [degree % scale_length, (degree + 3) % scale_length, (degree + 4) % scale_length]
        elif chord_type == 'Seventh':
            degree_indices = [(degree + i * 2) % scale_length for i in range(4)]
        elif chord_type == 'Ninth':
            degree_indices = [(degree + i * 2) % scale_length for i in range(5)]
        
        chord_pitches = []
        base_octave = pitches[0].octave
        prev_index = degree % scale_length
        
        for idx, scale_idx in enumerate(degree_indices):
            p = pitches[scale_idx].transpose(0)
            if idx == 0:
                p.octave = base_octave
            else:
                if scale_idx <= prev_index:
                    p.octave = chord_pitches[-1].octave + 1
                else:
                    p.octave = chord_pitches[-1].octave
                if p.pitch.ps <= chord_pitches[-1].pitch.ps:
                    p.octave += 1
            chord_pitches.append(p)
            prev_index = scale_idx
        
        ch = chord.Chord(chord_pitches)
        inversions = [ch]
        for i in range(1, len(chord_pitches)):
            try:
                inv_ch = ch.inversion(i)
                if inv_ch is not None:
                    inversions.append(inv_ch)
            except Exception:
                pass
        chords_by_degree[degree + 1] = inversions
    return chords_by_degree

class ScaleChordGeneratorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Scale & Chord Generator")
        self.root.geometry("700x600")
        self.root.resizable(True, True)
        
        # Main frame
        main_frame = ttk.Frame(root, padding="10")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))
        
        # Scale selection
        ttk.Label(main_frame, text="Select Scale:", font=('Arial', 11, 'bold')).grid(row=0, column=0, sticky=tk.W, pady=5)
        self.scale_var = tk.StringVar(value='Hungarian Minor')
        scale_dropdown = ttk.Combobox(main_frame, textvariable=self.scale_var, values=list(SCALES.keys()), state='readonly', width=25)
        scale_dropdown.grid(row=0, column=1, sticky=tk.W, pady=5)
        
        # Chord type selection
        ttk.Label(main_frame, text="Select Chord Type:", font=('Arial', 11, 'bold')).grid(row=1, column=0, sticky=tk.W, pady=5)
        self.chord_var = tk.StringVar(value='Seventh')
        chord_frame = ttk.Frame(main_frame)
        chord_frame.grid(row=1, column=1, sticky=tk.W, pady=5)
        ttk.Radiobutton(chord_frame, text="Seventh", variable=self.chord_var, value='Seventh').pack(side=tk.LEFT, padx=5)
        ttk.Radiobutton(chord_frame, text="Ninth", variable=self.chord_var, value='Ninth').pack(side=tk.LEFT, padx=5)
        ttk.Radiobutton(chord_frame, text="Suspended", variable=self.chord_var, value='Suspended').pack(side=tk.LEFT, padx=5)
        
        # Root note entry
        ttk.Label(main_frame, text="Enter Root Note:", font=('Arial', 11, 'bold')).grid(row=2, column=0, sticky=tk.W, pady=5)
        self.root_entry = ttk.Entry(main_frame, width=28)
        self.root_entry.grid(row=2, column=1, sticky=tk.W, pady=5)
        self.root_entry.insert(0, "C")
        
        # Buttons
        button_frame = ttk.Frame(main_frame)
        button_frame.grid(row=3, column=0, columnspan=2, pady=10)
        ttk.Button(button_frame, text="Generate", command=self.generate_output).pack(side=tk.LEFT, padx=5)
        ttk.Button(button_frame, text="Clear Output", command=self.clear_output).pack(side=tk.LEFT, padx=5)
        
        # Output display
        ttk.Label(main_frame, text="Results:", font=('Arial', 11, 'bold')).grid(row=4, column=0, sticky=tk.W, pady=5)
        self.output_text = scrolledtext.ScrolledText(main_frame, width=80, height=25, wrap=tk.WORD, font=('Courier', 10))
        self.output_text.grid(row=5, column=0, columnspan=2, pady=5)
        
        # Configure grid weights
        root.columnconfigure(0, weight=1)
        root.rowconfigure(0, weight=1)
        main_frame.columnconfigure(1, weight=1)
        main_frame.rowconfigure(5, weight=1)
    
    def generate_output(self):
        """Generate and display scale and chords."""
        try:
            root_note = self.root_entry.get().strip()
            scale_type = self.scale_var.get()
            chord_type = self.chord_var.get()
            
            if not root_note:
                self.output_text.insert(tk.END, "Error: Please enter a root note.\n\n")
                return
            
            # Generate scale
            scale_pitches = generate_scale(root_note, scale_type)
            scale_notes = [normalize_note_name(p.nameWithOctave) for p in scale_pitches]
            
            # Display scale
            self.output_text.insert(tk.END, f"{'='*70}\n")
            self.output_text.insert(tk.END, f"{root_note.upper()} {scale_type} Scale:\n")
            self.output_text.insert(tk.END, f"{' - '.join(scale_notes)}\n")
            self.output_text.insert(tk.END, f"{'='*70}\n\n")
            
            # Generate and display chords
            chords = build_diatonic_chords(scale_pitches, chord_type)
            for degree, inv_list in chords.items():
                self.output_text.insert(tk.END, f"Degree {degree} {chord_type} Chords:\n")
                for idx, inv_ch in enumerate(inv_list):
                    if inv_ch is not None:
                        inv_type = "Root" if idx == 0 else f"Inv {idx}"
                        chord_notes = ' - '.join([normalize_note_name(p.nameWithOctave) for p in inv_ch.pitches])
                        self.output_text.insert(tk.END, f"  {inv_type}: {chord_notes}\n")
                self.output_text.insert(tk.END, "\n")
            
            self.output_text.insert(tk.END, "\n")
            self.output_text.see(tk.END)
            
        except ValueError as e:
            self.output_text.insert(tk.END, f"Error: {e}\n\n")
            self.output_text.see(tk.END)
    
    def clear_output(self):
        """Clear the output display."""
        self.output_text.delete('1.0', tk.END)

# Run the application
if __name__ == "__main__":
    root = tk.Tk()  # Fixed: was tk.Tkinter()
    app = ScaleChordGeneratorApp(root)
    root.mainloop()
