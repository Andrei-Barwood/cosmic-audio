import fontforge

# Open your .ttf/.otf font file
font = fontforge.open("Evilz.ttf")  # Replace with your actual font file name

# Select the 'f' glyph
glyph = font['f']

# Export the glyph as SVG
glyph.export("evilz-heart-f.svg")
