// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});
}

// Close mobile menu when clicking on a link
if (navMenu) {
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll - respeta las temporadas
const navbar = document.getElementById('navbar');
if (navbar) {
    // Función para obtener el color de fondo según la temporada activa
    function getNavbarBackground(scrollOpacity) {
        const body = document.body;
        
        if (body.classList.contains('season-nocturne')) {
            return `rgba(46, 25, 70, ${scrollOpacity})`; // Purple oscuro
        } else if (body.classList.contains('season-prism')) {
            return `rgba(27, 152, 209, ${scrollOpacity})`; // Azul
        } else if (body.classList.contains('season-pastel')) {
            return `rgba(250, 181, 98, ${scrollOpacity})`; // Amarillo
        } else if (body.classList.contains('season-80s')) {
            return `rgba(36, 126, 98, ${scrollOpacity})`; // Verde turquesa oscuro de los 80s
        } else if (body.classList.contains('season-goth-pajamas')) {
            // No aplicar estilo inline para goth-pajamas, dejar que el CSS lo maneje
            return null; // Retornar null para que el CSS tome control
        } else if (body.classList.contains('season-cloud-of-the-desert')) {
            // No aplicar estilo inline para cloud-of-the-desert, dejar que el CSS lo maneje
            return null; // Retornar null para que el CSS tome control
        } else {
            // Estilo original Pinocho
            return `rgba(42, 26, 17, ${scrollOpacity})`; // Madera oscura
        }
    }
    
    window.addEventListener('scroll', () => {
        const scrollOpacity = window.scrollY > 100 ? 0.98 : 0.95;
        const bgColor = getNavbarBackground(scrollOpacity);
        if (bgColor) {
            navbar.style.background = bgColor;
        } else {
            // Para goth-pajamas, remover estilo inline y dejar que CSS maneje
            navbar.style.background = '';
        }
    });
    
    // Aplicar el color inicial al cargar la página
    const initialBgColor = getNavbarBackground(0.95);
    if (initialBgColor) {
        navbar.style.background = initialBgColor;
    } else {
        // Para goth-pajamas, remover estilo inline y dejar que CSS maneje
        navbar.style.background = '';
    }
}

// Back to top button
const backToTop = document.getElementById('backToTop');

if (backToTop) {
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to cards and sections
document.querySelectorAll('.music-card, .event-card, .about-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form submission logic here
        alert('Message sent!');
        contactForm.reset();
    });
}

// sharing to social media

document.addEventListener('DOMContentLoaded', function() {
    // Only run if share buttons exist on this page
    if (!document.querySelector('.share-btn')) return;
    
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(document.title);
    const shareText = encodeURIComponent('Check out this awesome underground DJ site! #techno #dj');

    // Update Twitter link
    const twitterBtn = document.querySelector('.share-btn.twitter');
    if (twitterBtn) twitterBtn.href = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`;

    // Update Facebook link
    const facebookBtn = document.querySelector('.share-btn.facebook');
    if (facebookBtn) facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;

    // Update Reddit link
    const redditBtn = document.querySelector('.share-btn.reddit');
    if (redditBtn) redditBtn.href = `https://reddit.com/submit?url=${currentUrl}&title=${currentTitle}`;

    // Update WhatsApp link
    const whatsappBtn = document.querySelector('.share-btn.whatsapp');
    if (whatsappBtn) whatsappBtn.href = `whatsapp://send?text=${shareText} ${currentUrl}`;
});

// copy to clipboard

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied!'));
}

// DYNAMIC FAVICON - Colores según temporada activa

// Función para obtener la paleta de colores según la temporada
function getSeasonColors() {
    const body = document.body;
    
    if (body.classList.contains('season-nocturne')) {
        // SEASON: NOCTURNE (Mágico / Glitch Oscuro)
        return [
            "#2E1946", // Purple oscuro (wood-dark)
            "#662F89", // Coat Shadow (wood-medium)
            "#9B7FB8", // Coat Light (wood-light)
            "#EC058E", // Pink Sparkle (primary-color)
            "#B19CD9", // Highlight Top (tertiary-color)
            "#CCB2D3", // Highlight Bottom (text-secondary)
            "#00ffff", // Glitch cyan
            "#ff00ff"  // Glitch magenta
        ];
    } else if (body.classList.contains('season-prism')) {
        // SEASON: PRISM (Velocidad / Breakcore Ácido)
        return [
            "#1B98D1", // Azul intenso (wood-dark)
            "#5DBBE8", // Coat Mid (wood-medium)
            "#9BD1E8", // Coat Light (wood-light)
            "#EF7135", // Naranja crin (primary-color)
            "#5FBB4E", // Verde crin (acid-green)
            "#EC4141", // Rojo crin (tertiary-color)
            "#FAF5AB"  // Amarillo crin (secondary-color)
        ];
    } else if (body.classList.contains('season-pastel')) {
        // SEASON: PASTEL BLOOM (Pastel Creepy / Soft)
        return [
            "#FABA62", // Coat Shadow (wood-dark)
            "#FAF5AB", // Coat (wood-medium)
            "#FEF9E7", // Coat Highlight (wood-light)
            "#F06EAA", // Mane Rosa (primary-color)
            "#50C356", // Ojos Verde tóxico (acid-green)
            "#F5B5C7", // Mane Highlight (tertiary-color)
            "#D4669C"  // Text secondary
        ];
    } else if (body.classList.contains('season-80s')) {
        // SEASON: 80s NIGHTMARE (Pesadilla de los 80')
        return [
            "#247E62", // Verde oscuro base (wood-dark)
            "#30A281", // Verde turquesa medio (wood-medium)
            "#66C5A8", // Verde turquesa claro (wood-light)
            "#E6F90B", // Amarillo lima brillante (primary-color)
            "#85FFDA", // Cyan brillante (acid-green)
            "#FF5285", // Rosa/magenta vibrante (tertiary-color)
            "#FFB900", // Amarillo dorado (secondary-color)
            "#BAC81C"  // Verde lima (olive-accent)
        ];
    } else if (body.classList.contains('season-goth-pajamas')) {
        // SEASON: GOTH-PAJAMAS (Gótico Nocturno)
        return [
            "#000000", // Negro puro (wood-dark)
            "#323232", // Gris oscuro (wood-medium)
            "#5F3B7C", // Morado medio oscuro (wood-light)
            "#905BBA", // Morado/violeta principal (primary-color)
            "#6B438C", // Morado oscuro (secondary-color)
            "#E8EFEE", // Gris muy claro (tertiary-color)
            "#93A1A1", // Gris azulado (acid-green)
            "#352043"  // Morado muy oscuro (olive-accent)
        ];
    } else if (body.classList.contains('season-cloud-of-the-desert')) {
        // SEASON: CLOUD-OF-THE-DESERT (Nube del Desierto)
        return [
            "#2B1F1F", // Marrón oscuro rojizo (wood-dark)
            "#450A0A", // Rojo muy oscuro (wood-medium)
            "#8B0000", // Rojo oscuro (wood-light)
            "#FF1744", // Rojo brillante/vibrante (primary-color)
            "#DC143C", // Crimson/rojo medio (acid-green)
            "#FF4444", // Rojo claro/rosa rojizo (tertiary-color)
            "#1A0F0F", // Negro con tinte rojizo (teal-darker)
            "#0D0208"  // Casi negro (darker-bg)
        ];
    } else {
        // Estilo original Pinocho (default)
        return [
            "#2A1A11", // Madera oscura (wood-dark)
            "#4A2E1F", // Madera media (wood-medium)
            "#8B5E3C", // Madera clara (wood-light)
            "#ccff00", // Verde ácido (acid-green)
            "#00ffff", // Glitch cyan
            "#ff4400", // Naranja óxido (rust-orange)
            "#ff00ff"  // Glitch magenta
        ];
    }
}

// Obtener colores de la temporada actual
const colors = getSeasonColors();

// Your Evilz heart SVG path data
const heartPath = `M491 551q-7 0 -16 11.5t-9 22.5q0 19 26 19q22 0 22 -17q0 -11 -7.5 -23.5t-15.5 -12.5zM577 408q-24 0 -41 20t-17 49q0 28 17 48.5t41 20.5q25 0 42 -20.5t17 -48.5q0 -29 -17 -49t-42 -20zM401 408q-25 0 -42 20t-17 49q0 28 17 48.5t42 20.5q24 0 41 -20.5t17 -48.5
q0 -29 -17 -49t-41 -20zM492 223q-87 -137 -213 -137q-85 0 -144 65q-61 68 -57 171q11 76 55 161q106 204 359 423q252 -219 358 -423q44 -85 55 -161q4 -114 -68.5 -182t-168.5 -51q-104 19 -176 134zM577 635v7q0 16 -11 28.5t-27 13.5q-16 2 -24 -5q-12 9 -26 9
q-16 0 -28 -10q-8 8 -25 6q-15 -1 -26.5 -13.5t-11.5 -28.5v-9q-121 -36 -121 -140q0 -85 66 -143q62 -56 149 -56q85 0 149.5 57t64.5 142q0 50 -33.5 88t-95.5 54z`;

function setFavicon(color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="-10 0 999 1000">
      <path fill="${color}" d="${heartPath}" />
    </svg>
  `;
  // Encode SVG as base64
  const url = 'data:image/svg+xml;base64,' + btoa(svg);
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

let colorIndex = 0;
function cycleFavicon() {
  setFavicon(colors[colorIndex]);
  colorIndex = (colorIndex + 1) % colors.length;
}
cycleFavicon(); // Set immediately on page load
setInterval(cycleFavicon, 2000); // Change every 2 seconds
