document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const fullscreenMenu = document.getElementById("fullscreenMenu");

  navToggle.addEventListener("click", () => {
    fullscreenMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
});
