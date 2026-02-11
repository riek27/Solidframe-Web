// ===========================================
// CRESTLINE WEB STUDIO - MAIN JAVASCRIPT
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    // ===========================================
    // TYPING EFFECT FOR HERO SECTION
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
    // MOBILE MENU FUNCTIONALITY
    // ===========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link:not(.mobile-dropdown-toggle)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Mobile dropdown functionality
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.parentElement.querySelector('.mobile-dropdown');
            dropdown.classList.toggle('active');
            
            // Toggle icon rotation
            const icon = toggle.querySelector('i');
            icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
        });
    });
    
    // ===========================================
    // DESKTOP DROPDOWN FUNCTIONALITY
    // ===========================================
    const desktopDropdowns = document.querySelectorAll('.has-dropdown');
    desktopDropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            dropdown.querySelector('.dropdown').style.opacity = '1';
            dropdown.querySelector('.dropdown').style.visibility = 'visible';
            dropdown.querySelector('.dropdown').style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            dropdown.querySelector('.dropdown').style.opacity = '0';
            dropdown.querySelector('.dropdown').style.visibility = 'hidden';
            dropdown.querySelector('.dropdown').style.transform = 'translateY(10px)';
        });
    });
    
    // ===========================================
    // FAQ ACCORDION
    // ===========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQ answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
            });
            
            // Remove active class from all questions
            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                answer.classList.add('active');
                question.classList.add('active');
            }
        });
    });
    
    // ===========================================
    // ANIMATED COUNTER FOR STATS
    // ===========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const current = parseInt(element.textContent);
        const increment = target > current ? 1 : -1;
        const speed = Math.min(1000 / target, 10);
        
        if (current !== target) {
            element.textContent = current + increment;
            setTimeout(() => animateCounter(element), speed);
        }
    }
    
    // Scroll animation for stats
    function checkStatsVisibility() {
        statNumbers.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight && rect.bottom >= 0;
            
            if (isVisible && stat.textContent === '0') {
                animateCounter(stat);
            }
        });
    }
    
    window.addEventListener('scroll', checkStatsVisibility);
    checkStatsVisibility(); // Check on load
    
    // ===========================================
    // UPDATE CURRENT YEAR IN FOOTER
    // ===========================================
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ===========================================
    // HEADER SCROLL EFFECT
    // ===========================================
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===========================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // For internal page links, don't prevent default
            if (targetId.includes('.html')) return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    

    // ===========================================
    // ACTIVE NAV LINK HIGHLIGHTING
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
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Run on page load
    
    // ===========================================
    // PRICING PAGE SPECIFIC FUNCTIONALITY
    // ===========================================
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) return;
            card.style.transform = 'scale(1.05) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) return;
            card.style.transform = 'scale(1.05)';
        });
    });
    
    // ===========================================
    // BLOG CARD HOVER EFFECTS
    // ===========================================
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.blog-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.blog-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    // ===========================================
    // LAZY LOADING FOR IMAGES
    // ===========================================
    const lazyImages = document.querySelectorAll('img[data-src]');
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
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const successMessage = document.getElementById("contact-success");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch("/", {
            method: "POST",
            body: new URLSearchParams(formData),
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(() => {
            // Show success message
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.opacity = "1";
            }, 10); // trigger CSS transition

            // Hide message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = "0";
                setTimeout(() => {
                    successMessage.style.display = "none";
                }, 500); // match transition
            }, 5000);

            // Reset form
            form.reset();
        })
        .catch((error) => {
            alert("Oops! There was a problem submitting your form.");
            console.error(error);
        });
    });
});

