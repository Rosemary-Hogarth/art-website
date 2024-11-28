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
  // const title = document.querySelector('.index-title');
  // const carousels = document.querySelectorAll('.carousel-card');

  // if (title) {
  //   const text = title.textContent.trim();
  //   title.innerHTML = ''; // Clear existing content

  //   // Split the text into individual letters and wrap each in a span tag
  //   text.split('').forEach((letter, index) => {
  //     const span = document.createElement('span');
  //     span.textContent = letter;
  //     span.style.setProperty('--letter-index', index); // Set custom CSS property for delay
  //     title.appendChild(span);
  //   });

  //   // Trigger the opacity animation after adding spans
  //   title.style.opacity = 1;

  //   // Wait for the text animation to complete (3 seconds in this case)
  //   setTimeout(() => {
  //     // After the text animation is done, show the carousels
  //     carousels.forEach(carousel => {
  //       carousel.classList.add('visible');
  //     });
  //   }, 3000); // Match this timeout duration to the text animation duration (3s)
  // }


    const showTextButtons = document.querySelectorAll('.show-text');
    const exhibitionGrid = document.getElementById('exhibition-grid');
    const exhibitionText = document.getElementById('exhibition-text');
    const textContent = document.getElementById('text-content');
    const backToGridButton = document.getElementById('back-to-grid');

    if (showTextButtons && exhibitionGrid && exhibitionText && textContent && backToGridButton) {
      showTextButtons.forEach(button => {
        button.addEventListener('click', function() {
          const text = this.dataset.exhibitionText;
          const title = this.dataset.exhibitionTextTitle;
          const author = this.dataset.exhibitionTextAuthor;
          textContent.innerHTML = `
            <h2>${title}</h2>
            <p><em>By ${author}</em></p>
            <p>${text}</p>
          `;
          exhibitionGrid.style.display = 'none';
          exhibitionText.style.display = 'block';

          // Update URL without page reload (optional)
          history.pushState(null, '', '/exhibitions');
        });
      });

      backToGridButton.addEventListener('click', function() {
        exhibitionGrid.style.display = 'block';
        exhibitionText.style.display = 'none';

        exhibitionGrid.removeAttribute('style');
        // Optionally update URL back to exhibitions
        history.pushState(null, '', '/exhibitions');
      });
    } else {
      console.warn('One or more required elements not found');
    }
  });
