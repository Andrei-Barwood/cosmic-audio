// Tutorial Table of Contents functionality
document.addEventListener('DOMContentLoaded', function() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const progressBar = document.getElementById('progressBar');
    const sections = document.querySelectorAll('.tutorial-section');
    
    // Update active link on scroll
    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update progress bar
    function updateProgressBar() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = (window.pageYOffset / documentHeight) * 100;
        progressBar.style.width = scrolled + '%';
        
        // Update reading progress text
        const progressText = document.querySelector('.reading-progress');
        if (progressText) {
            progressText.textContent = Math.round(scrolled) + '% Complete';
        }
    }

    window.addEventListener('scroll', () => {
        updateActiveLink();
        updateProgressBar();
    });

    // Initial update
    updateActiveLink();
    updateProgressBar();
});
