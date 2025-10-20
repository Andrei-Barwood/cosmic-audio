import os

# Get the current directory (where the script is located)
current_dir = os.path.dirname(os.path.abspath(__file__))

# Loop through all files in the current directory
for filename in os.listdir(current_dir):
    # Check if file is a PNG
    if filename.lower().endswith('.png'):
        # Delete the PNG file
        file_path = os.path.join(current_dir, filename)
        os.remove(file_path)
        print(f"Deleted: {filename}")

print("All PNG files have been deleted!")
