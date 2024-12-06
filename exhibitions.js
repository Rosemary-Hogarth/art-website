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






    const navbar = document.querySelector('.navbar');
    const intro = document.getElementById('exhibitions-intro');
    const mainContent = document.getElementById('exhibitions-main');
    const artistName = document.querySelector('.navbar-brand');
    const currentPageName = document.querySelector('.current-page-name');

    if (navbar && intro && mainContent) {
      // Fade out navbar
      navbar.style.display = 'none';

      // Hide the artist's name/link
    artistName.style.display = 'none';
    currentPageName.style.display = 'none';

      // Wait for navbar to fade out, then show intro
      setTimeout(() => {
        navbar.style.display = 'none'; // Hide navbar completely
        artistName.style.display = 'none'; // Hide artist name completely
        currentPageName.style.display = 'none'; // Hide current page name


        intro.classList.remove('hidden');
        intro.style.animation = 'fadeIn 0.5s ease-in-out';

        // Fade out intro after 1.5 seconds
        setTimeout(() => {
          intro.style.animation = 'fadeOut 0.5s ease-in-out';

          // Show main content after intro fades out
          setTimeout(() => {
            intro.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.animation = 'fadeIn 0.5s ease-in-out';

            // Bring back the navbar
            navbar.style.display = ''; // Reset display to its original value
            artistName.style.display = ''; // Reset artist name display
            currentPageName.style.display = ''; // Reset current page name display
            navbar.style.animation = 'fadeIn 0.5s ease-in-out';
            artistName.style.animation = 'fadeIn 0.5s ease-in-out';
            currentPageName.style.animation = 'fadeIn 0.5s ease-in-out';
          }, 300);
        }, 1500);
      }, 300);
    }
  });
