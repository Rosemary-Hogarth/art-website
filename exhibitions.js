document.addEventListener("DOMContentLoaded", function () {
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

// handle text section

    const showTextButtons = document.querySelectorAll('.show-text');
    const exhibitionGrid = document.getElementById('exhibition-grid');
    const exhibitionText = document.getElementById('exhibition-text');
    const textContent = document.getElementById('text-content');
    const backToGridButton = document.getElementById('back-to-grid');

    if (!showTextButtons || !exhibitionGrid || !exhibitionText || !textContent || !backToGridButton) {
      console.warn('One or more required elements not found');
      return;
    }

    function splitTextIfNecessary(text, title, author) {
      // Temporarily inject the full text to measure height
      textContent.innerHTML = `<p>${text}</p>`;
      const textHeight = textContent.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (textHeight < viewportHeight) {
        renderSingleColumnText(title, author, text);
      } else {
        renderTwoColumnText(title, author, text);
      }
    }

    function renderSingleColumnText(title, author, text) {
      textContent.innerHTML = `
        <h2>${title}</h2>
        <p><em>By ${author}</em></p>
        <p>${text}</p>
      `;
    }

    function renderTwoColumnText(title, author, text) {
      const words = text.split(' ');
      const midPoint = Math.ceil(words.length / 2);
      const leftText = words.slice(0, midPoint).join(' ');
      const rightText = words.slice(midPoint).join(' ');

      textContent.innerHTML = `
        <h2>${title}</h2>
        <p><em>By ${author}</em></p>
        <div class="row">
          <div class="column left-column">
            <p>${leftText}</p>
          </div>
          <div class="column right-column">
            <p>${rightText}</p>
          </div>
        </div>
      `;
    }

    function showExhibitionText(button) {
      const text = button.dataset.exhibitionText;
      const title = button.dataset.exhibitionTextTitle;
      const author = button.dataset.exhibitionTextAuthor;

      splitTextIfNecessary(text, title, author);
      exhibitionGrid.style.display = 'none';
      exhibitionText.style.display = 'block';

      // Update URL without page reload (optional)
      history.pushState(null, '', '/exhibitions');
    }

    function returnToGridView() {
      exhibitionGrid.style.display = 'block';
      exhibitionText.style.display = 'none';
      exhibitionGrid.removeAttribute('style');

      // Optionally update URL back to exhibitions
      history.pushState(null, '', '/exhibitions');
    }

    // Attach event listeners
    showTextButtons.forEach(button => {
      button.addEventListener('click', function () {
        showExhibitionText(this);
      });
    });

    backToGridButton.addEventListener('click', returnToGridView);




// Handle intro section

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
        }, 1300);
      }, 300);
    }
  });
