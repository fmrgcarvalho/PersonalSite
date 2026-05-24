// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 60);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const w = bar.getAttribute('data-w');
        setTimeout(() => { bar.style.width = w + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

// Smooth active nav
const sections = document.querySelectorAll('section[id], #stats-bar');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
}, { passive: true });

// Counter animation for hero stats
function animateCount(el, target, prefix, suffix) {
  let current = 0;
  const step = target / 40;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    const val = Math.round(current);
    el.textContent = prefix + (val >= 1000 ? val.toLocaleString('en') : val) + suffix;
    if (current >= target) clearInterval(timer);
  }, 30);
}
const statNums = document.querySelectorAll('.stat-item-num');
const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const txt = e.target.textContent.trim();
      const match = txt.match(/^([^0-9]*)([\d,]+)([^0-9]*)$/);
      if (match) {
        const target = parseInt(match[2].replace(/,/g, ''));
        animateCount(e.target, target, match[1], match[3]);
      }
      statsObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(n => statsObs.observe(n));

// Nav scroll style
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 60 ? 'rgba(8,10,15,.95)' : 'rgba(8,10,15,.85)';
}, { passive: true });

// Cert toggle
document.getElementById('toggleCerts').addEventListener('click', function() {
  const el = document.getElementById('certsAll');
  const icon = document.getElementById('toggleIcon');
  const btn = document.getElementById('toggleCerts');
  if (el.style.display === 'none') {
    el.style.display = 'block';
    icon.style.transform = 'rotate(180deg)';
    btn.lastChild.textContent = ' Hide certifications';
  } else {
    el.style.display = 'none';
    icon.style.transform = '';
    btn.lastChild.textContent = ' Show all 20+ certifications';
  }
});