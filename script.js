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
        }
    });
});

// Header background change on scroll with animation
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.scrollY > 100;
    header.classList.toggle('scrolled', scrolled);
});

// Carousel functionality with enhanced animations
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let autoPlayInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next');
        if (i === index) {
            slide.classList.add('active');
        } else if (i === (index - 1 + slides.length) % slides.length) {
            slide.classList.add('prev');
        } else if (i === (index + 1) % slides.length) {
            slide.classList.add('next');
        }
    });
    currentSlide = index;
    updateCarouselIndicators();
}

function updateCarouselIndicators() {
    // Add visual indicators if needed
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        clearInterval(autoPlayInterval);
        prevSlide();
        startAutoPlay();
    });
    nextBtn.addEventListener('click', () => {
        clearInterval(autoPlayInterval);
        nextSlide();
        startAutoPlay();
    });
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

// Start auto-play
startAutoPlay();

// Enhanced FAQ toggle with smooth animations
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Advanced scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100); // Staggered animation
        }
    });
}, observerOptions);

// Observe elements with enhanced animations
document.querySelectorAll('.travel-card, .featured-item, .faq-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Enhanced Parallax effect for hero background
// Use background-position on slides instead of translating the hero container
// Parallax: update background-position in percent and clamp to avoid seams
(() => {
    let ticking = false;
    const slides = document.querySelectorAll('.carousel-slide');
    const factor = 0.08; // subtle factor for percent movement

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                // Convert to percent of viewport height, clamp between -40% and 40%
                const pct = Math.max(-40, Math.min(40, - (scrolled * factor) ));
                slides.forEach(slide => {
                    slide.style.backgroundPosition = `center ${pct}%`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();

// Dynamic card hover effects
document.querySelectorAll('.travel-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// Dynamic background particles (subtle)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
}

createParticles();

// Typing effect for hero text (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Apply typing effect to hero heading
const heroHeading = document.querySelector('.hero h1');
if (heroHeading) {
    const originalText = heroHeading.textContent;
    // typeWriter(heroHeading, originalText, 200); // Removed slow typing animation
    heroHeading.textContent = originalText; // Display text instantly
}

// Enhanced button interactions
document.querySelectorAll('.cta-button, .card-link').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05) translateY(-2px)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) translateY(0)';
    });

    button.addEventListener('click', (e) => {
        // Ripple effect
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        button.appendChild(ripple);

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

        setTimeout(() => ripple.remove(), 600);
    });
});