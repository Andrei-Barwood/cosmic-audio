addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  
  // Si la respuesta es HTML, inyectar los scripts
  if (response.headers.get('Content-Type').includes('text/html')) {
    const html = await response.text()

    // Script para deshabilitar clic derecho y ver código fuente
    const script = `
      <script>
        // Deshabilitar clic derecho
        document.addEventListener('contextmenu', event => event.preventDefault());

        // Bloquear el acceso al código fuente
        document.onkeydown = function(event) {
          if (event.key === 'F12' || event.key === 'U' || event.key === 's') {
            event.preventDefault();
          }
        };
      </script>
    `

    // Inyectar el script al final del HTML
    const modifiedHtml = html.replace('</body>', script + '</body>')

    return new Response(modifiedHtml, {
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })
  }

  // Si no es HTML, devolver la respuesta original
  return response
}
