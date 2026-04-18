/* ── SCROLL: navbar shadow & back-to-top ── */
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 20);
  backTop.classList.toggle('visible', y > 400);
});

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── HAMBURGER ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

/* Close mobile menu when a link is clicked */
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      /* stagger siblings in the same parent */
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 0.08) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ── COUNT-UP ANIMATION ── */
function animateCount(el) {
  const target  = parseInt(el.dataset.count, 10);
  const suffix  = el.dataset.suffix || '';
  const display = el.querySelector('.stat-number');
  const duration = 1200;
  const start    = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
    display.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => countObserver.observe(card));

/* ── PARTICLE TABS ── */
const particleData = {
  proton: {
    html: '<strong>Proton (p⁺)</strong> — Partikel bermuatan positif di dalam inti atom. Jumlah proton menentukan nomor atom dan identitas unsur.'
  },
  neutron: {
    html: '<strong>Neutron (n⁰)</strong> — Partikel netral tanpa muatan di dalam inti atom. Berfungsi menstabilkan inti agar proton tidak saling tolak menolak.'
  },
  elektron: {
    html: '<strong>Elektron (e⁻)</strong> — Partikel bermuatan negatif yang bergerak mengelilingi inti. Elektron menentukan sifat kimia dan kemampuan ikatan suatu atom.'
  }
};

document.querySelectorAll('.ptab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const info = document.getElementById('particleInfo');
    info.style.opacity = '0';
    info.style.transform = 'translateY(6px)';

    setTimeout(() => {
      info.innerHTML = particleData[btn.dataset.particle].html;
      info.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      info.style.opacity = '1';
      info.style.transform = 'translateY(0)';
    }, 160);
  });
});

/* ── MOLECULE SWITCHER ── */
const molData = {
  CH4: '<strong>Metana (CH₄)</strong> — Gas alam yang terbentuk dari 1 karbon dan 4 hidrogen. Contoh ikatan kovalen tunggal karbon yang paling sederhana.',
  CO2: '<strong>Karbon Dioksida (CO₂)</strong> — Terdiri dari 1 karbon dan 2 oksigen dengan ikatan rangkap dua (C=O). Dihasilkan dari pernapasan dan pembakaran.',
  H2O: '<strong>Air (H₂O)</strong> — Dua atom hidrogen berikatan dengan satu oksigen membentuk sudut 104,5°. Molekul polar yang esensial bagi kehidupan.'
};

document.querySelectorAll('.mol-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mol-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const desc = document.getElementById('molDesc');
    desc.style.opacity = '0';
    desc.style.transform = 'translateY(6px)';

    setTimeout(() => {
      desc.innerHTML = molData[btn.dataset.mol];
      desc.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      desc.style.opacity = '1';
      desc.style.transform = 'translateY(0)';
    }, 160);
  });
});

/* ── RIPPLE on btn-primary ── */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect   = btn.getBoundingClientRect();
    const circle = document.createElement('span');
    const size   = Math.max(rect.width, rect.height);
    circle.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
      background:rgba(255,255,255,0.2);
      border-radius:50%;
      transform:scale(0);
      animation:ripple 0.55s linear;
      pointer-events:none;
    `;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

/* Inject ripple keyframes */
const style = document.createElement('style');
style.textContent = `@keyframes ripple { to { transform:scale(3.5); opacity:0; } }`;
document.head.appendChild(style);

/* ── ACTIVE NAV LINK on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
  });
});