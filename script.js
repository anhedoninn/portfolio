const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const currentYear = document.getElementById('year');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}


