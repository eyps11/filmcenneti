document.addEventListener("DOMContentLoaded", function() {
    let slideIndex = 0;
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    window.moveSlide = function(step) {
        slideIndex += step;
        if (slideIndex < 0) {
            slideIndex = totalSlides - 1;
        } else if (slideIndex >= totalSlides) {
            slideIndex = 0;
        }
        slides.style.transform = `translateX(${-slideIndex * 100}%)`;
    };

    // Otomatik slider: 5 saniyede bir geçiş
    setInterval(() => {
        moveSlide(1);
    }, 5000);
});