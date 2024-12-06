document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  const navToggle = document.getElementById("navToggle");
  console.log("navToggle element:", navToggle);
  const fullscreenMenu = document.getElementById("fullscreenMenu");

  navToggle.addEventListener("click", () => {
    fullscreenMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

// Create a new MutationObserver
const observer = new MutationObserver((mutations) => {
  // For each mutation that occurs...
  mutations.forEach((mutation) => {
    // Check if the mutation is an attribute change and specifically a class change
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      // Check if Fancybox is open by looking for its container element
      const fancyboxOpen = document.querySelector('.fancybox__container') !== null;

      if (fancyboxOpen) {
        // If Fancybox is open, hide the navigation toggle
        console.log("Fancybox is open, hiding navToggle");
        navToggle.style.display = 'none';
      } else {
        // If Fancybox is closed, show the navigation toggle
        console.log("Fancybox is closed, showing navToggle");
        navToggle.style.display = 'block';
      }
    }
  });
});

// Start observing the document body for changes
observer.observe(document.body, {
  attributes: true,  // Watch for attribute changes
  subtree: true,     // Watch all descendants, not just direct children
  childList: true    // Watch for changes to the direct children of the body
});

});
