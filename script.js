/* script.js - Premium Crestline Web Studio */
/* Enhanced with smooth animations, typing effects, and sophisticated interactions */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initTypingEffect();
    initHeroSlider();
    initTestimonialSliders();
    initStatsCounter();
    initFAQAccordion();
    initServiceAnimations();
    initScrollAnimations();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenuOverlay = document.createElement('div');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    // Create overlay
    mobileMenuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileMenuOverlay);
    
    // Open mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
        
        // Close all dropdowns
        mobileDropdownToggles.forEach(toggle => {
            toggle.classList.remove('active');
            toggle.nextElementSibling.classList.remove('active');
        });
    }
    
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    // Mobile dropdown toggles
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            
            // Close all other dropdowns
            mobileDropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.classList.remove('active');
                    otherToggle.nextElementSibling.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            this.classList.toggle('active', !isActive);
            this.nextElementSibling.classList.toggle('active', !isActive);
        });
    });
    
    // Close dropdown when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileDropdownToggles.forEach(toggle => {
                toggle.classList.remove('active');
                toggle.nextElementSibling.classList.remove('active');
            });
        }
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.querySelector('.mobile-menu-overlay').classList.remove('active');
                document.querySelector('.mobile-menu-btn').classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > 200) {
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

// Typing Effect in Hero Section
function initTypingEffect() {
    const typingElement = document.getElementById('typed-text');
    const ctaButton = document.getElementById('cta-btn');
    
    if (!typingElement) return;
    
    const phrases = [
        "Building digital foundations for construction companies",
        "Premium websites that convert visitors into clients",
        "Specializing in construction industry websites",
        "Mobile-optimized designs for contractors and builders",
        "SEO strategies that get you found locally"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting text
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing text
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        // Determine typing speed
        let typeSpeed = 100;
        
        if (isDeleting) {
            typeSpeed = 50;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end
            typeSpeed = 2000;
            isWaiting = true;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Move to next phrase
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        } else if (isWaiting) {
            // Brief pause before deleting
            typeSpeed = 1000;
            isWaiting = false;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect
    setTimeout(type, 1000);
    
    // Animate CTA button text
    if (ctaButton) {
        const btnText = ctaButton.querySelector('.btn-text');
        const originalText = btnText.textContent;
        const animatedText = "Let's Build Your Website →";
        let ctaCharIndex = 0;
        
        function animateCTA() {
            if (ctaCharIndex <= animatedText.length) {
                btnText.textContent = animatedText.substring(0, ctaCharIndex);
                ctaCharIndex++;
                setTimeout(animateCTA, 50);
            } else {
                // Add pulse animation
                ctaButton.style.animation = 'pulse 2s infinite';
            }
        }
        
        // Start CTA animation after typing effect begins
        setTimeout(animateCTA, 1500);
        
        // Add pulse animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4); }
                50% { transform: translateY(-8px); box-shadow: 0 16px 50px rgba(197, 165, 114, 0.4); }
                100% { transform: translateY(-5px); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Hero Background Slider
function initHeroSlider() {
    const heroImages = document.querySelectorAll('.hero-bg-image');
    if (heroImages.length < 2) return;
    
    let currentImage = 0;
    
    function changeHeroImage() {
        // Remove active class from all images
        heroImages.forEach(img => img.classList.remove('active'));
        
        // Add active class to current image
        heroImages[currentImage].classList.add('active');
        
        // Update current image index
        currentImage = (currentImage + 1) % heroImages.length;
    }
    
    // Change image every 6 seconds
    setInterval(changeHeroImage, 6000);
    
    // Initialize first image
    heroImages[0].classList.add('active');
}

// Testimonial Sliders
function initTestimonialSliders() {
    const testimonialContainers = document.querySelectorAll('.testimonials-grid');
    
    testimonialContainers.forEach(container => {
        if (container.children.length > 3) {
            let currentIndex = 0;
            const testimonials = Array.from(container.children);
            const totalTestimonials = testimonials.length;
            
            function showNextTestimonial() {
                // Hide current testimonial
                testimonials.forEach(testimonial => {
                    testimonial.style.opacity = '0';
                    testimonial.style.transform = 'translateX(100%)';
                });
                
                // Show next testimonial
                testimonials[currentIndex].style.opacity = '1';
                testimonials[currentIndex].style.transform = 'translateX(0)';
                
                // Update index
                currentIndex = (currentIndex + 1) % totalTestimonials;
            }
            
            // Set initial positions and transitions
            testimonials.forEach((testimonial, index) => {
                testimonial.style.transition = 'all 0.5s ease';
                testimonial.style.position = 'absolute';
                testimonial.style.width = '100%';
                testimonial.style.opacity = index === 0 ? '1' : '0';
                testimonial.style.transform = index === 0 ? 'translateX(0)' : 'translateX(100%)';
            });
            
            container.style.position = 'relative';
            container.style.height = testimonials[0].offsetHeight + 'px';
            
            // Start auto-rotation
            setInterval(showNextTestimonial, 5000);
        }
    });
}

// Animated Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    if (!statNumbers.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const current = parseInt(statNumber.textContent);
                const increment = target / 100;
                let count = current;
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(count);
                }, 20);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// FAQ Accordion
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
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

// Service Card Animations
function initServiceAnimations() {
    const serviceCards = document.querySelectorAll('.service-card, .industry-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .feature, .process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Form Validation (for contact page)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('error');
                    isValid = false;
                } else {
                    input.classList.remove('error');
                }
                
                // Email validation
                if (input.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value)) {
                        input.classList.add('error');
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you! Your message has been sent successfully.</p>
                `;
                successMessage.style.cssText = `
                    background: #d4edda;
                    color: #155724;
                    padding: 1rem;
                    border-radius: 0.375rem;
                    margin-top: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: fadeIn 0.3s ease;
                `;
                
                form.parentNode.insertBefore(successMessage, form.nextSibling);
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    form.reset();
                    successMessage.remove();
                }, 3000);
            }
        });
        
        // Remove error class on input
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for contact page and initialize form validation
    if (window.location.pathname.includes('contact.html') || document.querySelector('#contact-form')) {
        initFormValidation();
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Add smooth page transitions
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('#')) {
                e.preventDefault();
                document.body.classList.add('page-transition');
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });
    
    // Add page transition styles
    const style = document.createElement('style');
    style.textContent = `
        .page-transition {
            animation: fadeOut 0.3s ease forwards;
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
            }
        }
        
        body.loaded {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        .animated {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .form-error {
            border-color: #dc3545 !important;
            background-color: #f8d7da !important;
        }
        
        img.loaded {
            animation: fadeIn 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization
window.addEventListener('load', function() {
    // Remove preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
    
    // Initialize AOS (Animate On Scroll) for any elements that need it
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// Add loading state to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        button.classList.add('loading');
        
        // Simulate loading state
        setTimeout(() => {
            button.classList.remove('loading');
        }, 2000);
    }
});

/* =========================================== */
/* TESTIMONIALS PAGE ENHANCEMENTS */
/* =========================================== */

function initTestimonialsPage() {
    // Initialize testimonial card animations
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100); // Stagger animation
                }
            });
        }, { threshold: 0.1 });
        
        testimonialCards.forEach(card => observer.observe(card));
    }
    
    // Add testimonial filtering by trade (if you want to implement filters)
    const tradeCards = document.querySelectorAll('.trade-card');
    tradeCards.forEach(card => {
        card.addEventListener('click', function() {
            const trade = this.querySelector('.trade-title').textContent.toLowerCase();
            alert(`Filtering testimonials for: ${trade}`);
            // You can implement actual filtering here
        });
    });
}

/* =========================================== */
/* CONTACT PAGE ENHANCEMENTS */
/* =========================================== */

function initContactPage() {
    // Enhanced form validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('.form-input');
        
        // Add focus effects
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                validateField(this);
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formData = new FormData(this);
            
            // Validate all fields
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.querySelector('.btn-text').textContent;
                submitBtn.classList.add('loading');
                submitBtn.querySelector('.btn-text').textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    // Show success message
                    showFormSuccess(this, formData);
                    
                    // Reset button
                    submitBtn.classList.remove('loading');
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    // Add character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.875rem;
            color: var(--dark-gray);
            margin-top: 0.5rem;
        `;
        counter.textContent = `0/1000 characters`;
        messageField.parentElement.appendChild(counter);
        
        messageField.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length}/1000 characters`;
            
            if (length > 1000) {
                counter.style.color = '#ef4444';
            } else if (length > 800) {
                counter.style.color = var(--gold);
            } else {
                counter.style.color = 'var(--dark-gray)';
            }
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    
    // Clear previous error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    field.classList.remove('error');
    
    // Validation rules
    if (!value) {
        showFieldError(field, 'This field is required');
        isValid = false;
    } else if (fieldName === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    } else if (fieldName === 'message' && value.length < 10) {
        showFieldError(field, 'Please provide more details (minimum 10 characters)');
        isValid = false;
    } else if (fieldName === 'message' && value.length > 1000) {
        showFieldError(field, 'Message is too long (maximum 1000 characters)');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    field.parentElement.appendChild(errorDiv);
}

function showFormSuccess(form, formData) {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <div>
            <h4>Message Sent Successfully!</h4>
            <p>Thank you, ${formData.get('name')}. We've received your inquiry and will get back to you within 24 hours.</p>
            <p><small>We've sent a confirmation email to ${formData.get('email')}.</small></p>
        </div>
    `;
    
    // Style the success message
    successDiv.style.cssText = `
        background: #d1fae5;
        color: #065f46;
        padding: 1.5rem;
        border-radius: var(--radius-md);
        margin-top: 2rem;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        animation: slideIn 0.3s ease;
    `;
    
    successDiv.querySelector('h4').style.cssText = `
        margin: 0 0 0.5rem 0;
        color: #065f46;
    `;
    
    successDiv.querySelector('p').style.cssText = `
        margin: 0.25rem 0;
        line-height: 1.5;
    `;
    
    successDiv.querySelector('small').style.cssText = `
        opacity: 0.8;
    `;
    
    // Insert after form
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    // Reset form after 5 seconds
    setTimeout(() => {
        form.reset();
        successDiv.remove();
        
        // Reset character counter if exists
        const counter = form.querySelector('.character-counter');
        if (counter) {
            counter.textContent = '0/1000 characters';
            counter.style.color = 'var(--dark-gray)';
        }
    }, 5000);
}

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Add after existing initializations...
    
    // Initialize testimonials page
    if (window.location.pathname.includes('testimonials.html')) {
        initTestimonialsPage();
    }
    
    // Initialize contact page
    if (window.location.pathname.includes('contact.html')) {
        initContactPage();
    }
});





