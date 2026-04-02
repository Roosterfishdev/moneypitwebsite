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
