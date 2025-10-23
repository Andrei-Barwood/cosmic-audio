// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

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

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Back to top button
const backToTop = document.getElementById('backToTop');

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

// DYNAMIC FAVICON

// Color palette: change/add hex codes for your moods/seasons!
const colors = [
  "#731D26", "#B62645", "#541D1D", "#292C30", "#000000", "#212226",
  "#46474B", "#565656", "#000000", "#FFFF00", "#D0D2D6", "#242623", "#B7B8BA", "#98999A"
];

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
setInterval(cycleFavicon, 4000); // Change every 4 seconds
