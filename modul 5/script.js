document.addEventListener('DOMContentLoaded', () => {
    const cur = document.getElementById('cursor'), ring = document.getElementById('cursorRing');
    let pos = { mx: 0, my: 0, rx: 0, ry: 0 };

    // 1. Gabungan Logika Kursor (Mouse & Ring)
    document.addEventListener('mousemove', e => {
        [pos.mx, pos.my] = [e.clientX, e.clientY];
        cur.style.transform = `translate(${pos.mx}px, ${pos.my}px)`;
    });

    (function anim() {
        pos.rx += (pos.mx - pos.rx) * 0.15;
        pos.ry += (pos.my - pos.ry) * 0.15;
        ring.style.transform = `translate(${pos.rx}px, ${pos.ry}px)`;
        requestAnimationFrame(anim);
    })();

    // 2. Navbar & Reveal Observer (Digabung)
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                // Jalankan animasi bar jika yang terlihat adalah char-card
                e.target.querySelectorAll('.stat-fill').forEach((b, i) => 
                    setTimeout(() => b.style.transform = `scaleX(${b.dataset.w})`, 200 + i * 150));
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal, .char-card').forEach(el => obs.observe(el));
    window.addEventListener('scroll', () => document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60));

    // 3. Sistem Partikel Ringkas
    setInterval(() => {
        const p = document.createElement('div');
        const sz = Math.random() * 4 + 2;
        p.className = 'particle';
        p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:0;background:#8b0000;animation-duration:${Math.random()*8+4}s;--drift:${(Math.random()-0.5)*150}px`;
        document.getElementById('particles').appendChild(p);
        setTimeout(() => p.remove(), 10000);
    }, 800);
});