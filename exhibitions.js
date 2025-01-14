document.addEventListener("DOMContentLoaded", function () {


function removeContainerPadding() {
  const mainContainer = document.querySelector('.main-container');
  console.log(mainContainer);  // Check if the element is found
  if (mainContainer && window.location.href.includes("/exhibitions")) {
    console.log('Removing padding...');
    mainContainer.style.padding = '0';
  }
}

removeContainerPadding();



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
      <p class="exhibition-details-title">${title}</p>
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
