
// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get all work items and their mediums
    const works = document.querySelectorAll('.work-item');
    const categories = new Set();

    works.forEach(work => {
        const category = work.getAttribute('data-category');
        categories.add(category); // Automatically deduplicates due to the Set
    });

    // Get the filter buttons container
    const filterButtonsContainer = document.getElementById('filter-buttons');

    // Add a button for each unique medium
    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('filter-button');
        button.setAttribute('data-filter', category.toLowerCase());
        button.textContent = category;
        filterButtonsContainer.appendChild(button);
    });

    // Filter logic
    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter').toLowerCase();

            // Remove active class from all buttons and add to the clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter works based on the selected medium
            works.forEach(work => {
                const workCategory = work.getAttribute('data-category').toLowerCase();
                work.style.display = (filter === '' || workCategory === filter) ? 'block' : 'none';
            });
        });
    });

    // Initialize Fancybox
    Fancybox.bind("[data-fancybox='gallery']", {
        on: {
            ready: (fancybox) => {
                if (fancybox && fancybox.container) {
                    console.log('Fancybox elements:', fancybox.container.children);

                    // Apply transparent background to Fancybox elements
                    const elements = fancybox.container.querySelectorAll('*');
                    elements.forEach(el => {
                        el.style.setProperty('background-color', 'transparent', 'important');
                    });
                }
            }
        },
        // Prevent Fancybox from adding aria-hidden to the root
        hideScrollbar: false,
        autoFocus: false,
        // Disable thumbnails
        Thumbs: false
    });


  // const title = document.querySelector('.index-title-works');
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
});
