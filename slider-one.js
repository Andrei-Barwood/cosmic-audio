// script.js
document.addEventListener("DOMContentLoaded", () => {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    
    function showSlide(index) {
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    document.querySelector('.buttons button:first-child').addEventListener('click', () => showSlide(currentIndex - 1));
    document.querySelector('.buttons button:last-child').addEventListener('click', () => showSlide(currentIndex + 1));

    setInterval(() => showSlide(currentIndex + 1), 3000);
});
