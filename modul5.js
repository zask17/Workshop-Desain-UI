    document.addEventListener('DOMContentLoaded', () => {
        const cur = document.getElementById('cursor'), ring = document.getElementById('cursorRing');
    let pos = { mx: 0, my: 0, rx: 0, ry: 0 };

    // 1. Gabungan Logika Kursor (Mouse & Ring)
    document.addEventListener('mousemove', e => {
        [pos.mx, pos.my] = [e.clientX, e.clientY];
        cur.style.transform = `translate(${pos.mx}px, ${pos.my}px) translate(-50%, -50%)`;
    });

    (function anim() {
        pos.rx += (pos.mx - pos.rx) * 0.15;
        pos.ry += (pos.my - pos.ry) * 0.15;
        ring.style.transform = `translate(${pos.rx}px, ${pos.ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(anim);
    })();

        // efek hover interaktif
document.querySelectorAll('a, button, .btn, .power-card, .char-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cur.style.width = '20px';
        cur.style.height = '20px';
        ring.style.width = '50px';
        ring.style.height = '50px';
    });

    el.addEventListener('mouseleave', () => {
        cur.style.width = '12px';
        cur.style.height = '12px';
        ring.style.width = '36px';
        ring.style.height = '36px';
    });
});

document.addEventListener('mousedown', () => {
    cur.style.transform += ' scale(0.7)';
});

document.addEventListener('mouseup', () => {
    cur.style.transform = cur.style.transform.replace(' scale(0.7)', '');
});

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