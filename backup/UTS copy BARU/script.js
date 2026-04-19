/* ── NAV: shadow on scroll + back-to-top ── */
const navbar  = document.getElementById('navbar');
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 20);
  backTop.classList.toggle('visible', y > 400);
}, { passive: true });

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── HAMBURGER ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}));

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = (idx * 0.09) + 's';
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── PARTICLE TABS ── */
const particleData = {
  proton:   '<strong>Proton (p⁺)</strong> — Partikel bermuatan positif di dalam inti atom. Jumlah proton menentukan nomor atom dan identitas unsur.',
  neutron:  '<strong>Neutron (n⁰)</strong> — Partikel netral tanpa muatan di dalam inti atom. Berfungsi menstabilkan inti agar proton tidak saling tolak menolak.',
  elektron: '<strong>Elektron (e⁻)</strong> — Partikel bermuatan negatif yang bergerak mengelilingi inti. Elektron menentukan sifat kimia dan kemampuan ikatan suatu atom.'
};

document.querySelectorAll('.ptab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const info = document.getElementById('particleInfo');
    info.style.cssText = 'opacity:0;transform:translateY(5px);transition:opacity .22s ease,transform .22s ease';
    setTimeout(() => {
      info.innerHTML = particleData[btn.dataset.particle];
      info.style.cssText = 'opacity:1;transform:translateY(0);transition:opacity .22s ease,transform .22s ease';
    }, 150);
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
    desc.style.cssText = 'opacity:0;transform:translateY(5px);transition:opacity .22s ease,transform .22s ease';
    setTimeout(() => {
      desc.innerHTML = molData[btn.dataset.mol];
      desc.style.cssText = 'opacity:1;transform:translateY(0);transition:opacity .22s ease,transform .22s ease';
    }, 150);
  });
});

/* ── RIPPLE on .btn-primary ── */
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes ripple { to { transform:scale(3.8); opacity:0; } }`;
document.head.appendChild(rippleStyle);

document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('click', e => {
    const r = btn.getBoundingClientRect();
    const s = Math.max(r.width, r.height);
    const el = document.createElement('span');
    el.style.cssText = `position:absolute;width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px;background:rgba(255,255,255,0.22);border-radius:50%;transform:scale(0);animation:ripple .55s linear;pointer-events:none;`;
    btn.appendChild(el);
    setTimeout(() => el.remove(), 600);
  });
});

/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 80) current = sec.id; });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--text)' : '';
  });
}, { passive: true });