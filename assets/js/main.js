document.addEventListener('DOMContentLoaded', () => {
    // Simple Intersection Observer for Fade-In Effects
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to elements for a smooth reveal on scroll
    const animatedElements = document.querySelectorAll('.course-card, .membership, .section-title, .gallery-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(el);
    });

    // Custom CSS for the fade-in state
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Generate Floating Background SVGs
    const bgContainer = document.getElementById('floating-bg');
    if (bgContainer) {
        const icons = [
            // Heart
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
            // Star
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
            // Flower/Sparkle
            '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z"/></svg>'
        ];

        // Create 15 floating elements
        for (let i = 0; i < 15; i++) {
            const el = document.createElement('div');
            el.className = 'floating-element';
            el.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            
            // Random properties for natural movement
            const size = Math.random() * 20 + 10; // 10px to 30px
            const left = Math.random() * 100; // 0% to 100%
            const duration = Math.random() * 20 + 15; // 15s to 35s
            const delay = Math.random() * 5; // 0s to 5s
            
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.left = `${left}%`;
            el.style.bottom = `-50px`;
            el.style.animationDuration = `${duration}s`;
            el.style.animationDelay = `${delay}s`;
            
            bgContainer.appendChild(el);
        }
    }

    // --- Mobile Menu Logic ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Anchor Link Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
