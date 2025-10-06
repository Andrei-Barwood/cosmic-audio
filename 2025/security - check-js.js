/*

(function() {
    setTimeout(function() {
        // Verificar si JavaScript está habilitado (creamos una cookie)
        document.cookie = "js_enabled=true; path=/";

        // Intentamos detectar bloqueadores de anuncios
        let adTest = document.createElement("div");
        adTest.innerHTML = "&nbsp;";
        adTest.className = "adsbox";
        adTest.style.display = "none";
        document.body.appendChild(adTest);

        setTimeout(function() {
            if (adTest.offsetHeight === 0) {
                // Bloqueador detectado
                document.cookie = "ad_blocker_detected=true; path=/";
                console.warn("Bloqueador de anuncios detectado.");
            }
        }, 100);
    }, 100);

    // Redirección si JavaScript está deshabilitado
    window.onload = function() {
        setTimeout(function() {
            if (!document.cookie.includes("js_enabled=true")) {
                window.location.href = "/security - habilita-js.html";
            }
            if (document.cookie.includes("ad_blocker_detected=true")) {
    window.location.href = "/bloqueado.html";
}

        }, 200);

        // Mostrar alerta si se detecta bloqueador de anuncios
        setTimeout(function() {
            if (document.cookie.includes("ad_blocker_detected=true")) {
                alert("Detectamos un bloqueador de anuncios. Algunas funciones pueden no funcionar.");
            }
        }, 500);
    };
})();
*/