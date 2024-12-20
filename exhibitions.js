document.addEventListener("DOMContentLoaded", function () {
  // Initialize Fancybox for Exhibitions
  Fancybox.bind("[data-fancybox^='gallery-']", {
    Thumbs: false, // Disable thumbnails
    autoFocus: false,
    hideScrollbar: false,
    Image: {
      zoom: false,
      click: 'next', // Clicking on the image goes to the next slide
    },
    Carousel: {
      friction: 0, // Instant slide transition
    },
    click: false, // Disable default click behavior to handle it manually
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
      closing: (fancybox) => {
        console.log("Fancybox is closing...");
      },
      done: (fancybox, slide) => {
        console.log("Slide is ready:", slide);
      },
    },
  });

  // Custom handler for background clicks
  document.addEventListener('click', function (event) {
    // Check if the click is within a Fancybox slide container
    const fancyboxSlide = event.target.closest('.fancybox__slide');
    const fancyboxContainer = event.target.closest('.fancybox__container');

    if (fancyboxContainer && fancyboxSlide && !event.target.closest('.fancybox__content')) {
      // If clicked outside the image/content, move to the next slide
      const instance = Fancybox.getInstance();
      if (instance) {
        instance.next();
        event.preventDefault();
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

  //   const showTextButtons = document.querySelectorAll('.show-text');
  //   const exhibitionGrid = document.getElementById('exhibition-grid');
  //   const exhibitionText = document.getElementById('exhibition-text');
  //   const textContent = document.getElementById('text-content');
  //   const backToGridButton = document.getElementById('back-to-grid');

  //   if (!showTextButtons || !exhibitionGrid || !exhibitionText || !textContent || !backToGridButton) {
  //     console.warn('One or more required elements not found');
  //     return;
  //   }

  //   function splitTextIfNecessary(text, title, location, date) {
  //     // Temporarily inject the full text to measure height
  //     textContent.innerHTML = `<p>${text}</p>`;
  //     const textHeight = textContent.scrollHeight;
  //     const viewportHeight = window.innerHeight;

  //     if (textHeight < viewportHeight) {
  //       renderSingleColumnText(title, location, date, text);
  //     } else {
  //       renderTwoColumnText(title, location, date, text);
  //     }
  //   }

  //   function renderSingleColumnText(title, location, date, text) {
  //     textContent.innerHTML = `
  //       <h2 class="exhibition-details-title">${title}</h2>
  //       <p class="exhibition-details-location">${location}</p>
  //       <p class="exhibition-details-date">${date}</p>
  //       <p class="exhibition-details-text">${text}</p>
  //     `;
  //   }

  //   function renderTwoColumnText(title, location, date, text) {
  //     const words = text.split(' ');
  //     const midPoint = Math.ceil(words.length / 2);
  //     const leftText = words.slice(0, midPoint).join(' ');
  //     const rightText = words.slice(midPoint).join(' ');

  //     textContent.innerHTML = `
  //       <h2 class="exhibition-details-title">${title}</h2>
  //       <p class="exhibition-details-location">${location}</p>
  //       <p class="exhibition-details-date">${date}</p>
  //       <div class="row">
  //         <div class="column left-column">
  //           <p>${leftText}</p>
  //         </div>
  //         <div class="column right-column">
  //           <p>${rightText}</p>
  //         </div>
  //       </div>
  //     `;
  //   }

  //   function showExhibitionText(button) {
  //     const text = button.dataset.exhibitionText;
  //     const title = button.dataset.exhibitionTextTitle;
  //     const location = button.dataset.exhibitionTextLocation;
  //     const date = button.dataset.exhibitionTextDates;

  // console.log({ title, location, date, text });

  //     splitTextIfNecessary(text, title, location, date);
  //     exhibitionGrid.style.display = 'none';
  //     exhibitionText.style.display = 'block';

  //     // Update URL without page reload (optional)
  //     history.pushState(null, '', '/exhibitions');
  //   }

  //   function returnToGridView() {
  //     exhibitionGrid.style.display = 'block';
  //     exhibitionText.style.display = 'none';
  //     exhibitionGrid.removeAttribute('style');

  //     // Optionally update URL back to exhibitions
  //     history.pushState(null, '', '/exhibitions');
  //   }

  //   // Attach event listeners
  //   showTextButtons.forEach(button => {
  //     button.addEventListener('click', function () {
  //       showExhibitionText(this);
  //     });
  //   });

  //   backToGridButton.addEventListener('click', returnToGridView);

  const showTextButtons = document.querySelectorAll('.show-text');
  const exhibitionGrid = document.getElementById('exhibition-grid');
  const exhibitionText = document.getElementById('exhibition-text');
  const textContent = document.getElementById('text-content');
  const backToGridButton = document.getElementById('back-to-grid');

  if (!showTextButtons || !exhibitionGrid || !exhibitionText || !textContent || !backToGridButton) {
    console.warn('One or more required elements not found');
    return;
  }

  function renderText(title, location, date, text) {
    textContent.innerHTML = `
      <h2 class="exhibition-details-title">${title}</h2>
      <p class="exhibition-details-location">${location}</p>
      <p class="exhibition-details-date">${date}</p>
      <p class="exhibition-details-text">${text}</p>
    `;
  }

  function showExhibitionText(button) {
    const text = button.dataset.exhibitionText;
    const title = button.dataset.exhibitionTextTitle;
    const location = button.dataset.exhibitionTextLocation;
    const date = button.dataset.exhibitionTextDates;

    console.log({ title, location, date, text });

    renderText(title, location, date, text);
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


  });
