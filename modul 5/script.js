document.addEventListener('DOMContentLoaded', () => {
    const cur = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => 
        { mx = e.clientX; my = e.clientY; cur.style.left = mx + 'px'; cur.style.top = my + 'px'; });
    (function animRing() { rx += (mx - rx) * .12; ry += (my - ry) * .12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); })();

    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));

    const revObs = new IntersectionObserver(entries => 
        { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    const statObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            e.target.querySelectorAll('.stat-fill').forEach((bar, i) => 
                { setTimeout(() => { bar.style.transform = `scaleX(${bar.dataset.w})`; }, 200 + i * 160); });
        });
    }, { threshold: .4 });
    document.querySelectorAll('.char-card').forEach(c => statObs.observe(c));

    /* Logic Partikel Sederhana */
    const pcEl = document.getElementById('particles');
    function mkP() {
        const p = document.createElement('div'); p.className = 'particle';
        const sz = Math.random() * 4 + 1;
        p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;bottom:0;background:#8b0000;animation-duration:${Math.random() * 10 + 5}s;--drift:${(Math.random() - .5) * 200}px`;
        pcEl.appendChild(p);
        setTimeout(() => p.remove(), 15000);
    }
    setInterval(mkP, 800);
});