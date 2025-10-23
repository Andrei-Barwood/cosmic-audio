// SCALE DATA
const SCALES = {
  hungarian_minor:    [0, 2, 3, 6, 7, 8, 11],
  phrygian_dominant:  [0, 1, 4, 5, 7, 8, 10],
  augmented:          [0, 3, 4, 7, 8, 11]
};

const NOTE_NAMES = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

// Given root "C" and interval 3 returns "Eb"
function transposeNote(root, interval) {
  let idx = NOTE_NAMES.indexOf(root.replace('b', 'b').replace('#', '#'));
  let newIdx = (idx + interval) % 12;
  let octave = 4;
  if (root.match(/\d/)) { 
    octave = parseInt(root.match(/\d/)[0],10);
  }
  // If we wrap past C, bump octave (+1 for each 12 semitones)
  let octaveOffset = Math.floor((idx + interval) / 12);
  return NOTE_NAMES[newIdx] + (octave + octaveOffset);
}

function parseRoot(input) {
  input = input.trim().replace("flat","b").replace("sharp","#").toUpperCase();
  let m = input.match(/^([A-G][b#]?)(\d?)$/);
  if (!m) return "C";
  return m[1] + (m[2] ? m[2] : "4");
}

function buildScale(root, scaleType) {
  let rootNote = parseRoot(root);
  let rootBase = rootNote.match(/^([A-G][b#]?)/)[1];
  let scale = SCALES[scaleType];
  return scale.map(i => transposeNote(rootBase, i));
}

// Chord-building logic
function buildChords(scaleNotes, chordType) {
  let result = [];
  let scaleLength = scaleNotes.length;
  for (let degree = 0; degree < scaleLength; degree++) {
    let degreeNotes = [];
    if (chordType === "suspended") {
      // Sus4: 1-4-5
      degreeNotes = [
        scaleNotes[ (degree) % scaleLength ],
        scaleNotes[ (degree+3) % scaleLength ],
        scaleNotes[ (degree+4) % scaleLength ]
      ];
    } else if (chordType === "seventh") {
      // Diatonic 7th: stack every other degree
      degreeNotes = [
        scaleNotes[ (degree) % scaleLength ],
        scaleNotes[ (degree+2) % scaleLength ],
        scaleNotes[ (degree+4) % scaleLength ],
        scaleNotes[ (degree+6) % scaleLength ]
      ];
    } else {
      // Ninth: 7th plus 9th (next scale degree, octave up)
      degreeNotes = [
        scaleNotes[ (degree) % scaleLength ],
        scaleNotes[ (degree+2) % scaleLength ],
        scaleNotes[ (degree+4) % scaleLength ],
        scaleNotes[ (degree+6) % scaleLength ],
        transposeNote(scaleNotes[ (degree+2) % scaleLength ], 12)
      ];
    }
    // Generate inversions (rotate order)
    let inversions = [];
    for (let i = 0; i < degreeNotes.length; i++) {
      let inv = degreeNotes.slice(i).concat(degreeNotes.slice(0,i));
      inversions.push(inv);
    }
    result.push({
      degree: degree + 1,
      inversions: inversions
    });
  }
  return result;
}

// UI Handler
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('generator-form');
  const output = document.getElementById('output');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let scaleType = document.getElementById('scale').value;
    let chordType = document.querySelector('input[name="chord_type"]:checked').value;
    let root = document.getElementById('root').value;
    let scaleNotes = buildScale(root, scaleType);
    let chords = buildChords(scaleNotes, chordType);

    let html = `<div><b>${root.toUpperCase()} ${scaleType.replace('_',' ')} Scale:</b> ${scaleNotes.join(' - ')}</div><hr>`;
    chords.forEach(chd => {
      html += `<div><b>Degree ${chd.degree} ${chordType.charAt(0).toUpperCase() + chordType.slice(1)} Chords:</b></div>`;
      chd.inversions.forEach((inv,idx) => {
        html += `<div style="margin-left:20px;">${idx===0 ? "Root" : "Inv "+idx}: ${inv.join(' - ')}</div>`;
      });
      html += `<br>`;
    });
    output.innerHTML = html;
  });
});
