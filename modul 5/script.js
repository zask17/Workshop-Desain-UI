document.addEventListener('DOMContentLoaded', () => {
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
});