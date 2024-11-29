document.addEventListener('DOMContentLoaded', function() {
  const works = document.querySelectorAll('.work-item');
  const categories = new Set();

  works.forEach(work => {
    const category = work.getAttribute('data-category');
    categories.add(category);
  });

  const filterButtonsContainer = document.getElementById('filter-buttons');

  // Only add "All" button if it doesn't already exist
  if (!filterButtonsContainer.querySelector('button[data-filter=""]')) {
    const allButton = document.createElement('button');
    allButton.classList.add('filter-button', 'active');
    allButton.setAttribute('data-filter', '');
    allButton.textContent = 'All';
    filterButtonsContainer.appendChild(allButton);
  }

  categories.forEach(category => {
    const button = document.createElement('button');
    button.classList.add('filter-button');
    button.setAttribute('data-filter', category.toLowerCase());
    button.textContent = category;
    filterButtonsContainer.appendChild(button);
  });

  const filterButtons = document.querySelectorAll('.filter-button');

  function updateFancybox() {
    Fancybox.destroy();
    // only bind to visible elements
    Fancybox.bind('.work-item:not([style*="display: none"]) [data-fancybox^="gallery"]', {
      hideScrollbar: false,
      autoFocus: false,
      Thumbs: false,
      Toolbar: true,
      arrows: true,
      dragToClose: false,
      on: {
        ready: (fancybox) => {
          if (fancybox && fancybox.container) {
            console.log('Fancybox elements initialized');
            const elements = fancybox.container.querySelectorAll('*');
            elements.forEach(el => {
              el.style.setProperty('background-color', 'transparent', 'important');
            });
          }
        }
      }
    });
  }

  function filterWorks(filter) {
    works.forEach(work => {
      const workCategory = work.getAttribute('data-category').toLowerCase();
      work.style.display = (filter === '' || workCategory === filter) ? 'block' : 'none';
    });
    // makes sure the slideshow only has the filtered images
    updateFancybox();
  }

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter').toLowerCase();
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      filterWorks(filter);
    });
  });

  // Initial filtering (show all)
  // empty string means no filter applied
  filterWorks('');

  // Initialize Bootstrap carousels for installations
  const carousels = document.querySelectorAll('.installation-carousel');
  carousels.forEach(carousel => {
    new bootstrap.Carousel(carousel, {
      interval: false // Disable auto-sliding
    });
  });
});
