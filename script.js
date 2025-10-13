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
