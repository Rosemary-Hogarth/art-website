document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.home-slide');
  let currentSlide = 0;


  function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

    // Show the first slide immediately
    slides[0].classList.add('active');


  // Add click event listener to each slide
  slides.forEach(slide => {
    slide.addEventListener('click', function(e) {
      // Prevent the default anchor behavior
      e.preventDefault();

      console.log('Slide clicked');

      // Navigate to the exhibitions page
      window.location.href = '/exhibitions';
    });
  });

  // Start the slideshow after 5 seconds
  setTimeout(() => {
    setInterval(nextSlide, 7000);
  }, 7000);


});
