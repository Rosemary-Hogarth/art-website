document.addEventListener('DOMContentLoaded', () => {
  // Initialize all carousels
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    // Initialize each carousel
    initCarousel(carousel);


    // Add click event listeners to images
    const images = carousel.querySelectorAll('.carousel-item img');
    images.forEach(image => {
      image.addEventListener('click', function(event) {
        const rect = image.getBoundingClientRect();
        const x = event.clientX - rect.left;
        if (x < rect.width / 2) {
          $(carousel).carousel('prev');
        } else {
          $(carousel).carousel('next');
        }
      });
    });
  });
});

function initCarousel(carousel) {
  let touchStartX = 0;
  let touchEndX = 0;

  function handleTouchStart(event) {
      touchStartX = event.changedTouches[0].screenX;
  }

  function handleTouchMove(event) {
      touchEndX = event.changedTouches[0].screenX;
  }

  function handleTouchEnd() {
      if (touchEndX < touchStartX) {
          // Swipe left
          $(carousel).carousel('next');
      }
      if (touchEndX > touchStartX) {
          // Swipe right
          $(carousel).carousel('prev');
      }
  }

  // Add touch event listeners
  carousel.addEventListener('touchstart', handleTouchStart, false);
  carousel.addEventListener('touchmove', handleTouchMove, false);
  carousel.addEventListener('touchend', handleTouchEnd, false);

  // Initialize Bootstrap carousel
  $(carousel).carousel({
      interval: false // Disable auto-sliding
  });

  // Add click event listeners for custom navigation buttons if they exist
  const prevButton = carousel.querySelector('.carousel-control-prev');
  const nextButton = carousel.querySelector('.carousel-control-next');

  if (prevButton) {
      prevButton.addEventListener('click', () => {
          $(carousel).carousel('prev');
      });
  }

  if (nextButton) {
      nextButton.addEventListener('click', () => {
          $(carousel).carousel('next');
      });
  }
}
