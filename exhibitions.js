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
