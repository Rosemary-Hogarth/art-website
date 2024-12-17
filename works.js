document.addEventListener('DOMContentLoaded', function () {
  const works = document.querySelectorAll('.work-item');
  const categories = new Set();

  // Collect unique categories from work items
  works.forEach(work => {
    const category = work.getAttribute('data-category');
    if (category) {
      categories.add(category);
    }
  });

  const filterButtonsContainer = document.getElementById('filter-buttons');

  if (filterButtonsContainer) {
    filterButtonsContainer.innerHTML = ''; // Clear existing buttons

    // Create "All" button
    const allButton = document.createElement('button');
    allButton.classList.add('filter-button', 'active');
    allButton.setAttribute('data-filter', '');
    allButton.textContent = 'All';
    filterButtonsContainer.appendChild(allButton);

    // Create buttons for each category
    categories.forEach(category => {
      const button = document.createElement('button');
      button.classList.add('filter-button');
      button.setAttribute('data-filter', category.toLowerCase());
      button.textContent = category;
      filterButtonsContainer.appendChild(button);
    });

    const filterButtons = document.querySelectorAll('.filter-button');

    // Function to update Fancybox bindings for all works
    function updateFancybox() {
      // Bind Fancybox for all works in the "All" gallery
      Fancybox.bind('[data-fancybox="gallery"], [data-fancybox="all-installations"]', {
        hideScrollbar: false,
        autoFocus: false,
        Thumbs: { autoStart: false },
        Toolbar: true,
        arrows: true,
        dragToClose: false,
        Image: { zoom: false, click: 'next' },
        Carousel: { friction: 0 },
        click: false,
        on: {
          click: (fancybox, event) => {
            const slide = fancybox.getSlide();
            // If click is outside the image/content area, move to the next slide
            if (event.target.closest('.fancybox__content') === null) {
              event.preventDefault();
              fancybox.next(); // Move to the next slide
            }
          },
        },
      });

      // Bind Fancybox for visible items in the current filter (works that are shown)
      Fancybox.bind('.work-item:not(.visually-hidden) [data-fancybox^="gallery"]', {
        hideScrollbar: false,
        autoFocus: false,
        Thumbs: { autoStart: false },
        Toolbar: true,
        arrows: true,
        dragToClose: false,
        Image: { zoom: false, click: 'next' },
        Carousel: { friction: 0 },
        click: false
      });
    }

    // Function to filter works based on the selected filter
    function filterWorks(filter) {
      works.forEach(work => {
        const workCategory = work.getAttribute('data-category')?.toLowerCase();
        if (filter === '' || workCategory === filter) {
          work.classList.remove('visually-hidden');
        } else {
          work.classList.add('visually-hidden');
        }
      });

      // After filtering, update Fancybox bindings
      updateFancybox();
    }

    // Event listener for filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter').toLowerCase();
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterWorks(filter);
      });
    });

    // Initial filtering to show all works
    filterWorks('');
  }
});
