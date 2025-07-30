document.addEventListener('DOMContentLoaded', () => {
    // Theme switching
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-theme') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            document.body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    hamburger.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Add transition effect for hamburger to LBW
        if (isMenuOpen) {
            hamburger.style.width = '60px';
        } else {
            hamburger.style.width = '30px';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.style.width = '30px';
            isMenuOpen = false;
        }
    });

    // Scroll Animations with Intersection Observer
    const animatedSelectors = [
        '.section',
        '.profile-header',
        '.timeline-item',
        '.skill-item',
        '.info-item'
    ];
    const animatedElements = document.querySelectorAll(animatedSelectors.join(','));
    const animationDelay = 200; // ms

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, idx * animationDelay);
                obs.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.15
    });

    animatedElements.forEach((el, idx) => {
        observer.observe(el);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Back to Top button functionality
    const backToTopButton = document.getElementById('backToTop');
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}); 