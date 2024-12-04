document.addEventListener('DOMContentLoaded', function() {
  const works = document.querySelectorAll('.work-item');
  const categories = new Set();

  works.forEach(work => {
    const category = work.getAttribute('data-category');
    categories.add(category);
  });

  const filterButtonsContainer = document.getElementById('filter-buttons');
  filterButtonsContainer.innerHTML = ''; // Clear existing buttons

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
    Fancybox.bind('.work-item:not(.visually-hidden) [data-fancybox^="gallery"]', {
      hideScrollbar: false,
      autoFocus: false,
      Thumbs: {
        autoStart: false
      },
      Toolbar: true,
      arrows: true,
      dragToClose: false,
      Image: {
        zoom: false,
        click: 'next', // This enables click to next
      },
      Carousel: {
        friction: 0, // Makes sliding between images instant
      },
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
      const workCategory = work.getAttribute('data-category').toLowerCase();
      if (filter === '' || workCategory === filter) {
        work.classList.remove('visually-hidden');

      } else {
        work.classList.add('visually-hidden');
        // We're not using aria-hidden here anymore
      }
    });
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

  filterWorks('');
  updateFancybox();




      const intro = document.getElementById('works-intro');
      const mainContent = document.getElementById('works-main');

      if (intro && mainContent) {
        intro.classList.remove('hidden');
        intro.style.animation = 'fadeIn 0.5s ease-in-out';

        setTimeout(() => {
          intro.style.animation = 'fadeOut 0.5s ease-in-out';
          setTimeout(() => {
            intro.classList.add('hidden');
            mainContent.classList.remove('hidden');
            mainContent.style.animation = 'fadeIn 0.5s ease-in-out';
          }, 200);
        }, 1200);
      }
    });




console.log(Fancybox.version);
