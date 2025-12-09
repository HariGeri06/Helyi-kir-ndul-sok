// main.js - általános UI (mobil menü, galéria lightbox)
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if(navToggle && mainNav){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
    });
  }

  // Simple lightbox for gallery images
  document.body.addEventListener('click', (e) => {
    if(e.target.matches('.gallery img')){
      const src = e.target.dataset.full || e.target.src;
      const overlay = document.createElement('div');
      overlay.className = 'lightbox';
      overlay.innerHTML = `<img src="${src}" alt=""><button class="close" aria-label="Bezárás">✕</button>`;
      document.body.appendChild(overlay);
      overlay.addEventListener('click', (ev) => {
        if(ev.target === overlay || ev.target.classList.contains('close')) overlay.remove();
      });
    }
  });
});
