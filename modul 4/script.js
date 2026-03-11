document.addEventListener('DOMContentLoaded', () => {
    // Logika Sidebar
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sidebar = document.querySelector('.sidebar-section');
    const overlay = document.getElementById('overlay');
    const toggleSidebar = () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    };
    
    menuBtn.addEventListener('click', toggleSidebar);
    closeBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);
});