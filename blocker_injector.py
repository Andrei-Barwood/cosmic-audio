import os

# Directorio donde están los archivos HTML
html_dir = './'

# El contenido del script que quieres inyectar
script_tag = '<script src="blockers.js"></script>'

# Recorre todos los archivos HTML en el directorio
for filename in os.listdir(html_dir):
    if filename.endswith('.html'):
        with open(os.path.join(html_dir, filename), 'r') as file:
            content = file.read()

        # Inserta el script antes de </body>
        content = content.replace('</body>', f'{script_tag}</body>')

        # Guarda el archivo modificado
        with open(os.path.join(html_dir, filename), 'w') as file:
            file.write(content)
