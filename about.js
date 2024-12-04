document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('language-toggle');
  const textEn = document.getElementById('text-en');
  const textOther = document.getElementById('text-other');

  toggleButton.addEventListener('click', () => {
    console.log('clicked'); // Check if this logs

    // Toggle visibility based on current language
    if (toggleButton.getAttribute('data-current-language') === 'en') {
      textEn.classList.add('hidden');
      textOther.classList.remove('hidden');
      toggleButton.textContent = 'Switch to English';
      toggleButton.setAttribute('data-current-language', 'other'); // Update current language
    } else {
      textEn.classList.remove('hidden');
      textOther.classList.add('hidden');
      toggleButton.textContent = 'Switch Language';
      toggleButton.setAttribute('data-current-language', 'en'); // Update current language
    }
  });
});
