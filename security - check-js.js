(function() {
    // First, check if we're being redirected back (to prevent infinite loops)
    const currentPage = window.location.pathname;
    if (currentPage.includes('security') || currentPage.includes('habilita-js')) {
        return; // Don't run detection on the error page itself
    }

    // Immediately set the cookie (don't wait)
    document.cookie = "js_enabled=true; path=/; max-age=3600"; // Expires in 1 hour

    // Ad blocker detection (optional - keep if you need it)
    setTimeout(function() {
        let adTest = document.createElement("div");
        adTest.innerHTML = "&nbsp;";
        adTest.className = "adsbox";
        adTest.style.cssText = "position: absolute; width: 1px; height: 1px; visibility: hidden;";
        document.body.appendChild(adTest);

        setTimeout(function() {
            if (adTest.offsetHeight === 0 || window.getComputedStyle(adTest).display === "none") {
                document.cookie = "ad_blocker_detected=true; path=/; max-age=3600";
                console.warn("Bloqueador de anuncios detectado.");
            }
            // Clean up
            document.body.removeChild(adTest);
        }, 100);
    }, 100);

    // Remove the window.onload redirect - it's causing the problem
    // JavaScript is clearly enabled if this code is running!

})();
