let currentTheme = localStorage.getItem('ip1_resume_theme') || 'dark';

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);

    // ปุ่มสลับโหมด Dark / Light
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('ip1_resume_theme', currentTheme);
            applyTheme(currentTheme);
        });
    }

    // พับเก็บเมนู Hamburger อัตโนมัติเมื่อกดลิงก์บนมือถือ (Requirement 9 & 10)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapseEl = document.getElementById('navbarNav');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapseEl && navbarCollapseEl.classList.contains('show') && window.bootstrap) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseEl) || new bootstrap.Collapse(navbarCollapseEl, { toggle: false });
                bsCollapse.hide();
            }
        });
    });

    // ไฮไลต์เมนู Navbar ตาม Section ที่กำลังแสดงผล
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let currentSection = 'about';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});

function applyTheme(theme) {
    const navbar = document.getElementById('mainNavbar');
    const icon = document.getElementById('themeIcon');

    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (navbar) {
            navbar.classList.remove('navbar-dark');
            navbar.classList.add('navbar-light');
        }
        if (icon) {
            icon.className = 'bi bi-moon-stars-fill';
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (navbar) {
            navbar.classList.remove('navbar-light');
            navbar.classList.add('navbar-dark');
        }
        if (icon) {
            icon.className = 'bi bi-sun-fill';
        }
    }
}
