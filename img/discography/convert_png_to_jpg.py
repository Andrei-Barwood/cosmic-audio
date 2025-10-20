from PIL import Image
import os

# Get the current directory (where the script is located)
current_dir = os.path.dirname(os.path.abspath(__file__))

# Loop through all files in the current directory
for filename in os.listdir(current_dir):
    # Check if file is a PNG
    if filename.lower().endswith('.png'):
        # Open the PNG image
        img = Image.open(filename)
        
        # Convert to RGB mode (required for JPEG)
        rgb_img = img.convert('RGB')
        
        # Create new filename with .jpg extension
        new_filename = filename[:-4] + '.jpg'
        
        # Save as JPEG with high quality
        rgb_img.save(new_filename, 'JPEG', quality=95, optimize=True)
        
        print(f"Converted: {filename} -> {new_filename}")

print("Conversion complete!")
