from flask import Flask, render_template_string, request
from music21 import note, interval, chord

app = Flask(__name__)

SCALES = {
    'Hungarian Minor': [0, 2, 3, 6, 7, 8, 11],
    'Phrygian Dominant': [0, 1, 4, 5, 7, 8, 10],
    'Augmented': [0, 3, 4, 7, 8, 11]
}

def normalize_note_name(note_name):
    return note_name.replace('-', 'b')

def generate_scale(root_note, scale_type):
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

def build_diatonic_chords(pitches, chord_type):
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

HTML_TEMPLATE = '''
<!DOCTYPE html>
<html>
<head>
    <title>Scale & Chord Generator</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 40px auto; padding: 20px; background: #f5f5f5; }
        h1 { color: #333; text-align: center; }
        .form-container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
        select, input[type="text"] { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; }
        .radio-group { display: flex; gap: 20px; }
        .radio-group label { font-weight: normal; display: flex; align-items: center; }
        .radio-group input { margin-right: 5px; width: auto; }
        button { background: #4CAF50; color: white; padding: 12px 30px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; width: 100%; }
        button:hover { background: #45a049; }
        .results { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-top: 20px; }
        .results pre { background: #f8f8f8; padding: 15px; border-radius: 5px; overflow-x: auto; line-height: 1.6; }
        .scale-notes { color: #2196F3; font-weight: bold; font-size: 16px; }
        .degree { color: #FF5722; font-weight: bold; }
    </style>
</head>
<body>
    <h1>🎵 Scale & Chord Generator</h1>
    <div class="form-container">
        <form method="POST">
            <div class="form-group">
                <label>Select Scale:</label>
                <select name="scale">
                    <option value="Hungarian Minor" {% if scale=='Hungarian Minor' %}selected{% endif %}>Hungarian Minor</option>
                    <option value="Phrygian Dominant" {% if scale=='Phrygian Dominant' %}selected{% endif %}>Phrygian Dominant</option>
                    <option value="Augmented" {% if scale=='Augmented' %}selected{% endif %}>Augmented</option>
                </select>
            </div>
            <div class="form-group">
                <label>Select Chord Type:</label>
                <div class="radio-group">
                    <label><input type="radio" name="chord_type" value="Seventh" {% if chord_type=='Seventh' %}checked{% endif %}> Seventh</label>
                    <label><input type="radio" name="chord_type" value="Ninth" {% if chord_type=='Ninth' %}checked{% endif %}> Ninth</label>
                    <label><input type="radio" name="chord_type" value="Suspended" {% if chord_type=='Suspended' %}checked{% endif %}> Suspended</label>
                </div>
            </div>
            <div class="form-group">
                <label>Enter Root Note (e.g., C, F#, Bb, A flat):</label>
                <input type="text" name="root" value="{{ root }}" placeholder="C" required>
            </div>
            <button type="submit">Generate Scale & Chords</button>
        </form>
    </div>
    
    {% if output %}
    <div class="results">
        <h2>Results</h2>
        <pre>{{ output|safe }}</pre>
    </div>
    {% endif %}
</body>
</html>
'''

@app.route('/', methods=['GET', 'POST'])
def index():
    output = ""
    scale = "Hungarian Minor"
    chord_type = "Seventh"
    root = "C"
    
    if request.method == 'POST':
        root = request.form.get('root', 'C')
        scale = request.form.get('scale', 'Hungarian Minor')
        chord_type = request.form.get('chord_type', 'Seventh')
        
        try:
            scale_pitches = generate_scale(root, scale)
            scale_notes = [normalize_note_name(p.nameWithOctave) for p in scale_pitches]
            
            output += f"{'='*70}\n"
            output += f"<span class='scale-notes'>{root.upper()} {scale} Scale:\n"
            output += f"{' - '.join(scale_notes)}</span>\n"
            output += f"{'='*70}\n\n"
            
            chords = build_diatonic_chords(scale_pitches, chord_type)
            for degree, inv_list in chords.items():
                output += f"<span class='degree'>Degree {degree} {chord_type} Chords:</span>\n"
                for idx, inv_ch in enumerate(inv_list):
                    if inv_ch is not None:
                        inv_type = "Root" if idx == 0 else f"Inv {idx}"
                        chord_notes = ' - '.join([normalize_note_name(p.nameWithOctave) for p in inv_ch.pitches])
                        output += f"  {inv_type}: {chord_notes}\n"
                output += "\n"
        except Exception as e:
            output = f"Error: {str(e)}"
    
    return render_template_string(HTML_TEMPLATE, output=output, scale=scale, chord_type=chord_type, root=root)

if __name__ == '__main__':
    print("\n🎵 Starting Scale & Chord Generator...")
    print("Open your browser to: http://127.0.0.1:5000\n")
    app.run(debug=True, port=5000)
