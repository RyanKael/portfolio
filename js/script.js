// Preencha apenas os canais que deseja tornar públicos.
const CONTACT = {
  email: "ryankael@hotmail.com",
  whatsapp: "5574999962143", // Código do país + DDD + número, somente dígitos.
  linkedin: "https://www.linkedin.com/in/ryankael", // URL completa https://www.linkedin.com/in/...
  github: "https://github.com/RyanKael"
};

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 900px)');
function setMenu(open) {
  navigation.classList.toggle('is-collapsed', mobile.matches && !open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
menuButton.hidden = false;
setMenu(false);
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobile.addEventListener('change', () => setMenu(false));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header')) setMenu(false);
});
const header = document.querySelector('#header');
const backTop = document.querySelector('.back-top');
function updateScroll() {
  header.classList.toggle('scrolled', window.scrollY > 20);
  backTop.hidden = window.scrollY < 500;
}
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();
document.querySelector('#year').textContent = new Date().getFullYear();
function secureUrl(value, host) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (url.hostname === host || url.hostname === 'www.' + host) ? url.href : '';
  } catch { return ''; }
}
const email = CONTACT.email.trim();
const phone = CONTACT.whatsapp.replace(/[\s()+-]/g, '');
const channels = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? `mailto:${email}` : '',
  whatsapp: /^\d{10,15}$/.test(phone) ? `https://wa.me/${phone}` : '',
  linkedin: secureUrl(CONTACT.linkedin, 'linkedin.com'),
  github: secureUrl(CONTACT.github, 'github.com')
};
document.querySelectorAll('[data-contact]').forEach(link => {
  const url = channels[link.dataset.contact];
  link.hidden = !url;
  if (url) link.href = url;
});
