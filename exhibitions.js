

// Initialize Fancybox for Exhibitions
Fancybox.bind("[data-fancybox^='gallery-']", {
  Thumbs: false, // Disable thumbnails
  autoFocus: false,
  hideScrollbar: false,
  on: {
      ready: (fancybox) => {
          if (fancybox && fancybox.container) {
              // Apply transparent background to Fancybox elements
              const elements = fancybox.container.querySelectorAll('*');
              elements.forEach(el => {
                  el.style.setProperty('background-color', 'transparent', 'important');
              });
          }
      }
  }
});

function removeContainerPadding() {
  const mainContainer = document.querySelector('.main-container');
  console.log(mainContainer);  // Check if the element is found
  if(mainContainer && window.location.href.includes("/exhibitions")) {
    console.log('Removing padding...');
    mainContainer.style.padding = '0';
  }
}

removeContainerPadding();


document.addEventListener("DOMContentLoaded", function() {
  const title = document.querySelector('.index-title');
  const carousels = document.querySelectorAll('.carousel-card');

  if (title) {
    const text = title.textContent.trim();
    title.innerHTML = ''; // Clear existing content

    // Split the text into individual letters and wrap each in a span tag
    text.split('').forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.setProperty('--letter-index', index); // Set custom CSS property for delay
      title.appendChild(span);
    });

    // Trigger the opacity animation after adding spans
    title.style.opacity = 1;

    // Wait for the text animation to complete (3 seconds in this case)
    setTimeout(() => {
      // After the text animation is done, show the carousels
      carousels.forEach(carousel => {
        carousel.classList.add('visible');
      });
    }, 3000); // Match this timeout duration to the text animation duration (3s)
  }


  function toggleText() {
    // Select all the "Text" links within exhibition details
    const showTextLinks = document.querySelectorAll('.exhibition-details .show-text a');

    showTextLinks.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor link behavior

        // Find the exhibition details container for this specific exhibition
        const exhibitionDetails = link.closest('.exhibition-details');

        // Check if the additional text already exists in the exhibition details container
        let exhibitionText = exhibitionDetails.querySelector('.additional-exhibition-text');

        if (!exhibitionText) {
          // If the text does not exist, create it
          exhibitionText = document.createElement('p');
          exhibitionText.textContent = "Here is some additional text about the exhibition..."; // Set the content
          exhibitionText.classList.add('additional-exhibition-text');

          // Append the additional text below the existing exhibition details
          exhibitionDetails.appendChild(exhibitionText);
        } else {
          // If the text already exists, toggle its visibility (show or hide)
          exhibitionText.style.display = exhibitionText.style.display === 'none' ? 'block' : 'none';
        }
      });
    });
  }

   toggleText();
})
