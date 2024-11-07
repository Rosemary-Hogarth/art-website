let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX; // Get the starting touch point
}

function handleTouchMove(event) {
    touchEndX = event.changedTouches[0].screenX; // Get the ending touch point
}

function handleTouchEnd() {
    const carousel = document.getElementById('carouselExampleControls');
    if (touchEndX < touchStartX) {
        // Swipe left
        $(carousel).carousel('next');
    }
    if (touchEndX > touchStartX) {
        // Swipe right
        $(carousel).carousel('prev');
    }
}

function initSwipe() {
    const carousel = document.getElementById('carouselExampleControls');
    if (!carousel) return; // Exit if there's no carousel on the page

    carousel.addEventListener('touchstart', handleTouchStart, false);
    carousel.addEventListener('touchmove', handleTouchMove, false);
    carousel.addEventListener('touchend', handleTouchEnd, false);
}

// Initialize swipe functionality once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initSwipe();
});
