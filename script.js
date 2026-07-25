// ==========================================
// MORVIZY - Premium Eyewear Landing Page
// JavaScript Interactions
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initSmoothScroll();
    initAnimations();
    initMobileMenu();
    initFloatingCard();
    initScrollToTop();
    initModals();
});

// ==========================================
// NAVBAR - Scroll Effects
// ==========================================
function initNavbar() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow on scroll
        if (currentScroll > 50) {
            header.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// ==========================================
// SMOOTH SCROLL - Navigation
// ==========================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href && href !== '#' && !href.includes('login') && !href.includes('signup')) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ==========================================
// ANIMATIONS - Fade In on Scroll
// ==========================================
function initAnimations() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const animateElements = document.querySelectorAll('.feature-card, .showcase-grid, .newsletter-content');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
}

// ==========================================
// MOBILE MENU - Toggle
// ==========================================
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    
    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            
            // Add rotation animation
            const spans = toggle.querySelectorAll('span');
            if (toggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// ==========================================
// FLOATING CARD - Scroll Button
// ==========================================
function initFloatingCard() {
    const scrollBtn = document.querySelector('.floating-card-scroll');
    
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// ==========================================
// SCROLL TO TOP BUTTON
// ==========================================
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top-button');
    
    if (!scrollTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// MODALS - Login & Signup
// ==========================================
function initModals() {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const modalCloses = document.querySelectorAll('.modal-close');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const switchLinks = document.querySelectorAll('.switch-modal');

    // Open Login Modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Open Signup Modal
    if (signupBtn && signupModal) {
        signupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signupModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal function
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close on X button
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on overlay click
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            closeModal(modal);
        });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // Switch between modals
    switchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModalId = link.getAttribute('data-target');
            const targetModal = document.getElementById(targetModalId);
            const currentModal = link.closest('.modal');
            
            closeModal(currentModal);
            setTimeout(() => {
                targetModal.classList.add('active');
            }, 300);
        });
    });

    // Form submission handlers
    const loginForm = loginModal?.querySelector('.modal-form');
    const signupForm = signupModal?.querySelector('.modal-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Login functionality will be implemented!');
            closeModal(loginModal);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Signup functionality will be implemented!');
            closeModal(signupModal);
        });
    }
}

// ==========================================
// IMAGE PARALLAX - Subtle Effect
// ==========================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const heroImg = document.querySelector('.hero-image');
            
            if (heroImg && scrolled < window.innerHeight) {
                heroImg.style.transform = `translateY(${scrolled * 0.2}px) scale(1)`;
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// ==========================================
// NEWSLETTER FORM - Submit Handler
// ==========================================
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const input = newsletterForm.querySelector('input[type="email"]');
        const email = input.value;
        
        if (email) {
            // Show success message
            alert('Thank you for subscribing! We\'ll keep you updated.');
            input.value = '';
        }
    });
}

// ==========================================
// LAZY LOADING - Images
// ==========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// PERFORMANCE - Reduce Motion
// ==========================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('*').forEach(el => {
        el.style.transition = 'none';
        el.style.animation = 'none';
    });
}
