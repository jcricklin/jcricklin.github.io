// ============================================================
// Site Web Académique — Jean-Christophe Ricklin
// JavaScript — Navigation, scroll & subtle animations
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ----- Navbar scroll effect -----
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // ----- Active section highlight -----
    function highlightActiveSection() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleNavScroll();
        highlightActiveSection();
        handleBackToTop();
    });

    // ----- Smooth scroll -----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 10;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                navLinksEl.classList.remove('open');
                navToggle.classList.remove('open');
            }
        });
    });

    // ----- Mobile menu toggle -----
    const navToggle = document.getElementById('navToggle');
    const navLinksEl = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinksEl.classList.toggle('open');
        navToggle.classList.toggle('open');
    });

    // ----- Animate on scroll (IntersectionObserver) -----
    const animateElements = document.querySelectorAll('.animate-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => observer.observe(el));

    // ----- Back to top button -----
    const backToTop = document.getElementById('backToTop');

    function handleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ----- Lightbox (image zoom on click) -----
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const zoomableImages = document.querySelectorAll('.gallery-item img, .card-image, .thesis-schema');

    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ----- Init -----
    handleNavScroll();
    highlightActiveSection();
});
