document.addEventListener('DOMContentLoaded', function() {
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

    // Create "All" button if it doesn't exist
    if (!filterButtonsContainer.querySelector('button[data-filter=""]')) {
      const allButton = document.createElement('button');
      allButton.classList.add('filter-button', 'active');
      allButton.setAttribute('data-filter', '');
      allButton.textContent = 'All';
      filterButtonsContainer.appendChild(allButton);
    }

    // Create buttons for each category
    categories.forEach(category => {
      const button = document.createElement('button');
      button.classList.add('filter-button');
      button.setAttribute('data-filter', category.toLowerCase());
      button.textContent = category;
      filterButtonsContainer.appendChild(button);
    });

    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');

    function updateFancybox() {
      Fancybox.bind('.work-item:not(.visually-hidden) [data-fancybox^="gallery"]', {
        hideScrollbar: false,
        autoFocus: false,
        Thumbs: { autoStart: false },
        Toolbar: true,
        arrows: true,
        dragToClose: false,
        Image: { zoom: false, click: 'next' },
        Carousel: { friction: 0 },
        on: {
          init: (fancybox) => {
            console.log('Fancybox initialized');
          },
          destroy: () => {
            works.forEach(work => {
              work.removeAttribute('tabindex');
            });
          }
        }
      });
    }

    function filterWorks(filter) {
      works.forEach(work => {
        const workCategory = work.getAttribute('data-category')?.toLowerCase();
        if (filter === '' || workCategory === filter) {
          work.classList.remove('visually-hidden');
        } else {
          work.classList.add('visually-hidden');
        }
      });
      updateFancybox();
    }

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter').toLowerCase();
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterWorks(filter);
      });
    });

    // Initial filtering to show all works
    filterWorks('');




    // Intro animation logic
    const navbar = document.querySelector('.navbar');
    const intro = document.getElementById('works-intro');
    const mainContent = document.getElementById('works-main');
    const artistName = document.querySelector('.navbar-brand');
    const currentPageName = document.querySelector('.current-page-name');

    if (navbar && intro && mainContent && artistName) {
      navbar.style.display = 'none';
      artistName.style.display = 'none';
      currentPageName.style.display = 'none';

      // Wait for navbar to fade out, then show intro
      setTimeout(() => {
        intro.classList.remove('hidden');
        intro.style.animation = 'fadeIn 0.5s ease-in-out';

        // Fade out intro after a delay
        setTimeout(() => {
          intro.style.animation = 'fadeOut 0.5s ease-in-out';

          // Show main content after intro fades out
          setTimeout(() => {
            intro.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.animation = 'fadeIn 0.5s ease-in-out';

            // Bring back the navbar and artist name
            navbar.style.display = ''; // Reset display to its original value
            artistName.style.display = '';
            currentPageName.style.display = ''; // Reset current page name display
            navbar.style.animation = 'fadeIn 0.5s ease-in-out';
            artistName.style.animation = 'fadeIn 0.5s ease-in-out';
            currentPageName.style.animation = 'fadeIn 0.5s ease-in-out';
          }, 300); // Duration of fade out for intro
        }, 1300); // Duration for which the intro is visible
      }, 300); // Delay before starting the intro animation
    }
  } else {
    console.error("Filter buttons container not found.");
  }

  console.log(Fancybox.version);
});
