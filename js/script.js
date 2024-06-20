// js/script.js
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('.section');

  links.forEach(link => {
      link.addEventListener('click', function() {
          const targetId = this.getAttribute('data-target');
          sections.forEach(section => {
              section.classList.remove('active');
              if (section.id === targetId) {
                  section.classList.add('active');
              }
          });
      });
  });

  // Show the home section by default
  document.getElementById('home').classList.add('active');
});
