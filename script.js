// ============================================
// Hash Future School - Interactive JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initFAQ();
    initStickyBar();
    initAnimateOnScroll();
    initCounterAnimation();
    initSmoothScroll();
    initAdmissionModal();
    initGoogleReviewsPopup();
});

// ============================================
// Navbar Scroll Effect
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
}

// ============================================
// FAQ Accordion
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ============================================
// Sticky Bottom Bar
// ============================================
function initStickyBar() {
    const stickyBar = document.getElementById('stickyBar');
    const hero = document.getElementById('hero');

    if (!stickyBar || !hero) return;

    const heroHeight = hero.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight - 200) {
            stickyBar.classList.add('visible');
        } else {
            stickyBar.classList.remove('visible');
        }
    });
}

// ============================================
// Animate Elements on Scroll
// ============================================
function initAnimateOnScroll() {
    const animatedElements = document.querySelectorAll(
        '.problem-card, .outcome-card, .who-card, .curriculum-card, .video-card, .testimonial-card, .facilitator-card'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ============================================
// Counter Animation
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    };

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Video Lazy Loading Enhancement
// ============================================
function initVideoLazyLoad() {
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    const observerOptions = {
        threshold: 0.25
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                    iframe.removeAttribute('data-src');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    videoWrappers.forEach(wrapper => {
        observer.observe(wrapper);
    });
}

// ============================================
// Parallax Effect for Hero Background
// ============================================
function initParallax() {
    const heroCircles = document.querySelectorAll('.hero-circle');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        heroCircles.forEach((circle, index) => {
            const speed = (index + 1) * 0.1;
            circle.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// ============================================
// Form Validation (for future form integration)
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(phone);
}

// ============================================
// Track CTA Clicks (for analytics integration)
// ============================================
function trackCTAClick(ctaName) {
    // Google Analytics or other tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
            'event_category': 'engagement',
            'event_label': ctaName
        });
    }

    // Console log for debugging
    console.log('CTA Clicked:', ctaName);
}

// Add click tracking to all CTA buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta, .sticky-bar-cta').forEach(button => {
    button.addEventListener('click', function () {
        trackCTAClick(this.textContent.trim());
    });
});

// ============================================
// Loading State Handler
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Initialize parallax after load
    initParallax();

    // Initialize video lazy loading
    initVideoLazyLoad();
});

// ============================================
// Handle Window Resize
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate sticky bar trigger point
        initStickyBar();
    }, 250);
});

// ============================================
// Keyboard Navigation Support
// ============================================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');

        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    }
});

// ============================================
// Touch Device Detection
// ============================================
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// Adjust hover effects for touch devices
if (isTouchDevice()) {
    document.body.classList.add('touch-device');
}

// ============================================
// Admission Modal Logic
// ============================================
function initAdmissionModal() {
    const modal = document.getElementById('admissionModal');
    const iframe = document.getElementById('admissionFrame');
    const closeBtn = document.querySelector('.close-modal');

    // Using a specific URL for Book a Demo
    const demoUrl = "https://futureassist.hashfuture.school/admissions/demo";

    if (!modal || !iframe || !closeBtn) return;

    // Open modal function
    const openModal = () => {
        // Set source if not already set or different
        if (iframe.src !== demoUrl) {
            iframe.src = demoUrl;
        }

        modal.style.display = 'block';
        // Use setTimeout to allow display:block to apply before adding class for transition
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Trigger buttons
    document.querySelectorAll('.open-admission-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Auto open after 1 minute (60000ms)
    setTimeout(() => {
        // Only open if not already open
        if (!modal.classList.contains('show')) {
            openModal();
        }
    }, 60000);

    // Close modal function
    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            // Optional: reset iframe source to stop video/audio if any
            // iframe.src = ''; 
        }, 300);
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// ============================================
// Google Reviews Popup
// ============================================
function initGoogleReviewsPopup() {
    const reviewsBtn = document.getElementById('googleReviewsBtn');

    if (!reviewsBtn) return;

    const reviewsUrl = "https://www.google.com/search?sca_esv=262b8e8005cfc964&biw=1366&bih=646&aic=0&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOU-zxeFMVASMyjyDK65iUocHVVh1EBBXSU6qgJFwXPdmTX6yp2uKN2JlBqbhZEGgYclxVXgWke2Ore_qCsRvkInIhfXz&q=%23FUTURE+SCHOOL+Reviews&sa=X&ved=2ahUKEwjRgrac56iSAxWzRmwGHfXNMIAQ0bkNegQIGxAH";

    const openPopup = () => {
        // Calculate center of screen
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;

        window.open(
            reviewsUrl,
            'GoogleReviews',
            `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no,toolbar=no,menubar=no,location=no`
        );
    };

    reviewsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openPopup();
    });

    // Allow keyboard activation (Enter key)
    reviewsBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPopup();
        }
    });
}
