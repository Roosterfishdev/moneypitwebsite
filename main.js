/* ── MOBILE NAV ── */
(function () {
  const nav = document.querySelector('.nav-float-wrap nav');
  const toggle = document.querySelector('.nav-toggle');
  const overlay = document.getElementById('nav-overlay');
  if (!nav || !toggle) return;

  function setMenuOpen(open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-menu-open', open);
    if (overlay) {
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
    }
  }

  toggle.addEventListener('click', () => {
    setMenuOpen(!nav.classList.contains('is-open'));
  });

  overlay?.addEventListener('click', () => setMenuOpen(false));

  nav.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
  });
})();

/* ── CONTACT FORM (mailto) ── */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]')?.value.trim() || '';
    const email = form.querySelector('[name="email"]')?.value.trim() || '';
    const message = form.querySelector('[name="message"]')?.value.trim() || '';
    if (!email || !message) return;
    const subject = encodeURIComponent(`MoneyPit contact from ${name || email}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:support@mymoneypit.io?subject=${subject}&body=${body}`;
  });
})();

/* ── TRACK BUILDS: tabs, accordions, view toggle ── */
(function () {
  const section = document.getElementById('features');
  if (!section) return;

  section.querySelectorAll('.track-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const name = tab.getAttribute('data-track-tab');
      section.querySelectorAll('.track-tab').forEach((t) => {
        const on = t.getAttribute('data-track-tab') === name;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      section.querySelectorAll('.track-tab-panel').forEach((panel) => {
        const match = panel.getAttribute('data-track-panel') === name;
        panel.hidden = !match;
      });
    });
  });

  section.querySelectorAll('.track-accordion').forEach((acc) => {
    const btn = acc.querySelector('.track-accordion-trigger');
    const panel = acc.querySelector('.track-accordion-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const open = !acc.classList.contains('is-open');
      acc.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  section.querySelectorAll('.track-view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-view-mode');
      section.querySelectorAll('.track-view-btn').forEach((b) => {
        const active = b.getAttribute('data-view-mode') === mode;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      const list = section.querySelector('#track-parts-list');
      if (list) {
        list.classList.toggle('track-parts-grid', mode === 'grid');
      }
    });
  });
})();

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal, .reveal-section-heading, .reveal-card');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

/* ── HERO MASKED VIDEO ── */
const heroMaskVideo = document.querySelector('.hero-mask-video');
if (heroMaskVideo) {
  heroMaskVideo.play().catch(() => {});
}

/* ── WAITLIST ── */
function handleWaitlist() {
  const input = document.getElementById('wl-email');
  const val = input.value.trim();
  if (!val || !val.includes('@')) {
    input.style.borderLeft = '2px solid #E10000';
    setTimeout(() => input.style.borderLeft = '', 1200);
    return;
  }
  input.value = '';
  const btn = document.querySelector('.waitlist-btn');
  btn.textContent = 'You\'re on the list ✓';
  btn.style.background = '#2a7a2a';
  btn.style.pointerEvents = 'none';
}
