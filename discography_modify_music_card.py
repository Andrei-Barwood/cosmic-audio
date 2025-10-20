import os
import re
from bs4 import BeautifulSoup

# --- Configuration ---
html_filename = 'discography.html'
img_dir = 'img/directory'
artist_name = 'Mega Doll'
# ----------------------

# Load the HTML
with open(html_filename, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

# Index image files in img_dir (assume .jpg)
img_files = [f for f in os.listdir(img_dir) if f.lower().endswith('.jpg')]

for card, img_file in zip(soup.select('.music-card'), img_files):
    # Remove numbers, 'cover', and artist name from img_file (case sensitive for artist name)
    display_name = os.path.splitext(img_file)[0]
    display_name = re.sub(r'\d+', '', display_name)  # Remove all digits
    display_name = display_name.replace('cover', '')  # Remove 'cover'
    display_name = display_name.replace(artist_name, '')  # Remove artist name ("Mega Doll")
    display_name = display_name.replace('_', ' ').replace('-', ' ')  # Replace _ and - with spaces
    display_name = display_name.strip()
    display_name = re.sub(r'\s+', ' ', display_name)  # Normalize spaces
    
    # Fix title capitalization (optional, for pleasant appearance)
    display_name = display_name.title()
    
    # Update <img> tag
    img_tag = card.find('img', class_='music-card-img')
    if img_tag:
        img_tag['src'] = f'{img_dir}/{img_file}'
        img_tag['alt'] = f'{display_name} cover'
    
    # Update <h3> tag
    h3_tag = card.find('h3')
    if h3_tag:
        h3_tag.string = display_name

# Write modified HTML back to file (overwrite)
with open(html_filename, 'w', encoding='utf-8') as f:
    f.write(str(soup.prettify()))
