// Initialize Fancybox for Exhibitions
Fancybox.bind("[data-fancybox^='gallery-']", {
  Thumbs: false, // Disable thumbnails
  autoFocus: false,
  hideScrollbar: false,
  Image: {
    zoom: false,
    click: 'next', // This enables click to next
  },
  Carousel: {
    friction: 0, // Makes sliding between images instant
  },
  on: {
    ready: (fancybox) => {
      if (fancybox && fancybox.container) {
        // Apply transparent background to Fancybox elements
        const elements = fancybox.container.querySelectorAll('*');
        elements.forEach(el => {
          el.style.setProperty('background-color', 'transparent', 'important');
        });
      }
    },
    // Log when an image is clicked
    click: (fancybox, slide) => {
      console.log('Image clicked:', slide);
      fancybox.next();
    }
  }
});

function removeContainerPadding() {
  const mainContainer = document.querySelector('.main-container');
  console.log(mainContainer);  // Check if the element is found
  if (mainContainer && window.location.href.includes("/exhibitions")) {
    console.log('Removing padding...');
    mainContainer.style.padding = '0';
  }
}

removeContainerPadding();

document.addEventListener("DOMContentLoaded", function() {
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
