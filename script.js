// ===========================================
// CREST WEB STUDIO - MAIN JAVASCRIPT
// All features: mobile menu, FAQ, blog, contact form, stats, etc.
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // ===========================================
    // 1. TYPING EFFECT FOR HERO SECTION (Index page)
    // ===========================================
    const typedText = document.getElementById('typed-text');
    if (typedText) {
        const typingStrings = [
            "Custom websites built for construction companies.",
            "SEO-optimized to rank higher in local searches.",
            "Mobile-first designs for on-site accessibility.",
            "Lead-generating websites that grow your business."
        ];
        
        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeText() {
            const currentString = typingStrings[stringIndex];
            
            if (isDeleting) {
                typedText.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedText.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentString.length) {
                typingSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % typingStrings.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        setTimeout(typeText, 1000);
    }

    // ===========================================
    // 2. MOBILE MENU FUNCTIONALITY
    // ===========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on any link (except dropdown toggles)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link:not(.mobile-dropdown-toggle)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Mobile dropdown toggle (Services submenu)
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = toggle.closest('.mobile-has-dropdown');
            const dropdown = parent ? parent.querySelector('.mobile-dropdown') : null;
            if (dropdown) {
                dropdown.classList.toggle('active');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
                }
            }
        });
    });
    
    // ===========================================
    // 3. DESKTOP DROPDOWN (Services)
    // ===========================================
    const desktopDropdowns = document.querySelectorAll('.has-dropdown');
    desktopDropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown');
        if (dropdownMenu) {
            dropdown.addEventListener('mouseenter', () => {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(10px)';
            });
        }
    });
    
    // ===========================================
    // 4. FAQ ACCORDION (for both pricing and FAQ pages)
    // ===========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement; // .faq-item
            const isActive = faqItem.classList.contains('active');
            
            // Optional: close all others (for better UX)
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle current
            faqItem.classList.toggle('active');
        });
    });
    
    // ===========================================
    // 5. BLOG READ MORE / READ LESS BUTTONS
    // ===========================================
    const readMoreBtns = document.querySelectorAll('.btn-read-more');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const blogCard = btn.closest('.blog-card');
            const fullContent = blogCard ? blogCard.querySelector('.blog-full-content') : null;
            if (fullContent) {
                fullContent.classList.toggle('active');
                btn.classList.toggle('active');
                btn.innerHTML = fullContent.classList.contains('active') ? 
                    'Read Less <i class="fas fa-chevron-up"></i>' : 
                    'Read More <i class="fas fa-chevron-down"></i>';
            }
        });
    });
    
    // ===========================================
    // 6. ANIMATED COUNTER FOR STATS
    // ===========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const targetText = element.getAttribute('data-count');
        // If no data-count, try to parse the text content (removing non-digits)
        let target = targetText ? parseInt(targetText) : parseInt(element.textContent.replace(/[^0-9]/g, ''));
        if (isNaN(target)) return;
        
        let current = 0;
        const duration = 1500; // ms
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        
        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            current += increment;
            if (currentStep >= steps) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat);
                }
                statsObserver.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ===========================================
    // 7. UPDATE CURRENT YEAR IN FOOTER
    // ===========================================
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ===========================================
    // 8. HEADER SCROLL EFFECT (adds shadow / background)
    // ===========================================
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ===========================================
    // 9. SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            
            // Skip if it's an external link or contains .html
            if (targetId.includes('.html')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80; // fixed header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================================
    // 10. ACTIVE NAV LINK HIGHLIGHTING (based on scroll)
    // ===========================================
    function highlightNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        let currentSectionId = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                currentSectionId = section.id;
            }
        });
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            } else if (href !== '#' && !href?.startsWith('#')) {
                // For non-anchor links, don't remove active if it's a page link
                // Only remove if it's not the current section
                if (!currentSectionId) return;
                link.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll();
    
    // ===========================================
    // 11. PRICING PAGE CARD HOVER (enhanced)
    // ===========================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (card.classList.contains('featured')) {
                card.style.transform = 'scale(1.02) translateY(-8px)';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (card.classList.contains('featured')) {
                card.style.transform = 'scale(1.02)';
            } else {
                card.style.transform = '';
            }
        });
    });
    
    // ===========================================
    // 12. BLOG CARD IMAGE ZOOM (already done in CSS, but ensure consistency)
    // ===========================================
    const blogImages = document.querySelectorAll('.blog-image img');
    blogImages.forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    });
    
    // ===========================================
    // 13. CONTACT FORM SUBMISSION (Netlify)
    // ===========================================
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contact-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            fetch('/', {
                method: 'POST',
                body: new URLSearchParams(formData),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(() => {
                if (contactSuccess) {
                    contactSuccess.classList.add('show');
                    setTimeout(() => {
                        contactSuccess.classList.remove('show');
                    }, 5000);
                }
                contactForm.reset();
            })
            .catch(error => {
                alert('Oops! There was a problem submitting your form. Please try again or call us directly.');
                console.error('Form submission error:', error);
            });
        });
    }
    
    // Also handle newsletter form if present on blog page
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletter-success');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(newsletterForm);
            
            fetch('/', {
                method: 'POST',
                body: new URLSearchParams(formData),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(() => {
                if (newsletterSuccess) {
                    newsletterSuccess.style.display = 'block';
                    setTimeout(() => {
                        newsletterSuccess.style.opacity = '1';
                    }, 10);
                    setTimeout(() => {
                        newsletterSuccess.style.opacity = '0';
                        setTimeout(() => {
                            newsletterSuccess.style.display = 'none';
                        }, 500);
                    }, 5000);
                }
                newsletterForm.reset();
            })
            .catch(error => {
                alert('Subscription failed. Please try again.');
                console.error(error);
            });
        });
    }
    
    // ===========================================
    // 14. LAZY LOADING FOR IMAGES (optional)
    // ===========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===========================================
    // 15. FIX FOR ANY MISSING CLICK HANDLERS ON FAQ (backup)
    // ===========================================
    // If any FAQ items are not working due to dynamic content, re-run
    const dynamicFaqQuestions = document.querySelectorAll('.faq-question');
    if (dynamicFaqQuestions.length && !window._faqInitialized) {
        window._faqInitialized = true;
        // Already handled above, but ensure no duplicates
    }
});

