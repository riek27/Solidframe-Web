// script.js - Crestline Web Studio - Updated
// Enhanced with better functionality, error handling, and mobile optimization

document.addEventListener('DOMContentLoaded', function() {
    // ========== TYPING EFFECT ==========
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
        let isPaused = false;
        
        function typeText() {
            if (isPaused) return;
            
            const currentString = typingStrings[stringIndex];
            
            if (isDeleting) {
                // Deleting text
                typedText.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Typing text
                typedText.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            // Check if we've finished typing the current string
            if (!isDeleting && charIndex === currentString.length) {
                // Pause at the end
                typingSpeed = 1500;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next string
                isDeleting = false;
                stringIndex = (stringIndex + 1) % typingStrings.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeText, typingSpeed);
        }
        
        // Start typing effect after a short delay
        setTimeout(typeText, 1000);
        
        // Pause typing when tab is not visible
        document.addEventListener('visibilitychange', function() {
            isPaused = document.hidden;
        });
    }

    // ========== MOBILE MENU FUNCTIONALITY ==========
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    function openMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
            body.style.paddingRight = getScrollbarWidth() + 'px';
            document.documentElement.style.overflow = 'hidden';
        }
    }
    
    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            body.style.overflow = '';
            body.style.paddingRight = '';
            document.documentElement.style.overflow = '';
        }
    }
    
    if (mobileMenuBtn && mobileMenuClose && mobileMenu) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only close if it's not a dropdown toggle
                if (!link.classList.contains('mobile-dropdown-toggle')) {
                    closeMobileMenu();
                }
            });
        });
        
        // Close mobile menu when clicking on backdrop (outside menu)
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    // ========== MOBILE DROPDOWN FUNCTIONALITY ==========
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = toggle.parentElement.querySelector('.mobile-dropdown');
            const isActive = dropdown.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.mobile-dropdown').forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                    const otherIcon = otherDropdown.parentElement.querySelector('.mobile-dropdown-toggle i');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current dropdown
            if (isActive) {
                dropdown.classList.remove('active');
                const icon = toggle.querySelector('i');
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                dropdown.classList.add('active');
                const icon = toggle.querySelector('i');
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // ========== DESKTOP DROPDOWN FUNCTIONALITY ==========
    const desktopDropdowns = document.querySelectorAll('.has-dropdown');
    desktopDropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            const dropdownMenu = dropdown.querySelector('.dropdown');
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            }
        });
        
        dropdown.addEventListener('mouseleave', () => {
            const dropdownMenu = dropdown.querySelector('.dropdown');
            if (dropdownMenu) {
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(10px)';
            }
        });
        
        // Touch support for mobile (when menu is open on larger screens)
        dropdown.addEventListener('touchstart', (e) => {
            if (window.innerWidth > 992) {
                const dropdownMenu = dropdown.querySelector('.dropdown');
                if (dropdownMenu) {
                    const isVisible = dropdownMenu.style.visibility === 'visible';
                    if (!isVisible) {
                        dropdownMenu.style.opacity = '1';
                        dropdownMenu.style.visibility = 'visible';
                        dropdownMenu.style.transform = 'translateY(0)';
                        e.preventDefault();
                    }
                }
            }
        });
    });

    // ========== SERVICES ACCORDION FUNCTIONALITY ==========
    const accordionItems = document.querySelectorAll('.service-accordion-item');
    
    function closeAllAccordions() {
        accordionItems.forEach(item => {
            item.classList.remove('active');
            const content = item.querySelector('.service-accordion-content');
            if (content) {
                content.style.maxHeight = null;
            }
        });
    }
    
    function openAccordion(item) {
        const content = item.querySelector('.service-accordion-content');
        const isActive = item.classList.contains('active');
        
        if (!isActive) {
            // Close all others first
            closeAllAccordions();
            
            // Open this one
            item.classList.add('active');
            if (content) {
                content.style.maxHeight = content.scrollHeight + 'px';
                
                // Scroll into view if on mobile
                if (window.innerWidth < 768) {
                    setTimeout(() => {
                        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 300);
                }
            }
        }
    }
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.service-accordion-header');
        const toggle = item.querySelector('.accordion-toggle');
        
        if (header && toggle) {
            // Open first item by default
            if (item === accordionItems[0] && !document.location.hash) {
                setTimeout(() => {
                    openAccordion(item);
                }, 500);
            }
            
            header.addEventListener('click', () => {
                openAccordion(item);
            });
            
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                openAccordion(item);
            });
        }
    });
    
    // Handle hash links to open specific accordion
    function handleHashAccordion() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement && targetElement.classList.contains('service-accordion-item')) {
                setTimeout(() => {
                    openAccordion(targetElement);
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }
    
    // Check for hash on load and when hash changes
    handleHashAccordion();
    window.addEventListener('hashchange', handleHashAccordion);

    // ========== FAQ FUNCTIONALITY ==========
    // FAQ Category Tabs
    const categoryButtons = document.querySelectorAll('.category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    if (categoryButtons.length > 0 && faqCategories.length > 0) {
        // Set first category as active by default
        if (!document.location.hash) {
            const firstCategory = document.querySelector('.faq-category');
            const firstButton = document.querySelector('.category-btn');
            if (firstCategory && firstButton) {
                firstCategory.classList.add('active');
                firstButton.classList.add('active');
            }
        }
        
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');
                
                // Update active button
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Show selected category
                faqCategories.forEach(cat => {
                    if (cat.id === `${category}-category`) {
                        cat.classList.add('active');
                    } else {
                        cat.classList.remove('active');
                    }
                });
                
                // Update URL hash without scrolling
                history.replaceState(null, null, `#${category}`);
            });
        });
        
        // Handle hash for FAQ categories
        const hash = window.location.hash.replace('#', '');
        if (hash && hash !== 'design' && hash !== 'development' && hash !== 'seo' && hash !== 'redesign') {
            const targetButton = document.querySelector(`.category-btn[data-category="${hash}"]`);
            const targetCategory = document.querySelector(`#${hash}-category`);
            
            if (targetButton && targetCategory) {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                faqCategories.forEach(cat => cat.classList.remove('active'));
                
                targetButton.classList.add('active');
                targetCategory.classList.add('active');
            }
        }
    }
    
    // FAQ Accordion Items
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQ answers in the same category
            const category = question.closest('.faq-category');
            if (category) {
                category.querySelectorAll('.faq-answer').forEach(item => {
                    if (item !== answer) {
                        item.classList.remove('active');
                        item.style.maxHeight = null;
                    }
                });
                
                // Remove active class from other questions in same category
                category.querySelectorAll('.faq-question').forEach(item => {
                    if (item !== question) {
                        item.classList.remove('active');
                    }
                });
            }
            
            // Toggle current FAQ
            if (!isActive) {
                answer.classList.add('active');
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.classList.remove('active');
                question.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
        
        // Add keyboard support
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });

    // ========== ANIMATED COUNTER FOR STATS ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const current = parseInt(element.textContent);
        const increment = target > current ? 1 : -1;
        const speed = Math.min(2000 / target, 30); // Adjust speed based on target number
        
        if (current !== target) {
            element.textContent = current + increment;
            setTimeout(() => animateCounter(element), speed);
        } else {
            // Add plus sign for multipliers
            if (target === 10) {
                element.textContent = target + 'x';
            } else {
                element.textContent = target + '%';
            }
        }
    }
    
    // Scroll animation for stats
    function checkStatsVisibility() {
        statNumbers.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            const isVisible = rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0;
            
            if (isVisible && stat.textContent === '0') {
                animateCounter(stat);
            }
        });
    }
    
    if (statNumbers.length > 0) {
        // Use Intersection Observer for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    if (stat.textContent === '0') {
                        animateCounter(stat);
                    }
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
        
        // Also check on load as fallback
        checkStatsVisibility();
    }

    // ========== HEADER SCROLL EFFECT ==========
    const header = document.querySelector('.main-header');
    let lastScroll = 0;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
            
            // Hide header on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }
    
    if (header) {
        window.addEventListener('scroll', updateHeader);
        updateHeader(); // Initialize
    }

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's a dropdown link
            if (href === '#' || href.startsWith('#!')) return;
            
            // Only process if we're on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    // Calculate header height
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: targetPosition - headerHeight,
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const company = document.getElementById('company').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const businessType = document.getElementById('business-type').value;
            const serviceArea = document.getElementById('service-area').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            const errors = [];
            
            if (!name) errors.push('Name is required');
            if (!company) errors.push('Company name is required');
            if (!email || !isValidEmail(email)) errors.push('Valid email is required');
            if (!phone) errors.push('Phone number is required');
            if (!businessType) errors.push('Business type is required');
            if (!serviceArea) errors.push('Service area is required');
            if (!message) errors.push('Message is required');
            
            if (errors.length > 0) {
                alert('Please fix the following errors:\n\n' + errors.join('\n'));
                return;
            }
            
            // Create form data object
            const formData = {
                name,
                company,
                email,
                phone,
                businessType,
                serviceArea,
                budget: document.getElementById('budget').value,
                timeline: document.getElementById('timeline').value,
                message
            };
            
            // In a real implementation, you would send this data to a server
            // For now, we'll show a success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                alert(`Thank you, ${name} from ${company}!\n\nYour message has been sent successfully. We'll contact you at ${email} or ${phone} within 24 hours.`);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Scroll to top of form
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 1500);
        });
        
        // Auto-expand textarea
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            messageTextarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
            
            // Initialize height
            setTimeout(() => {
                messageTextarea.style.height = 'auto';
                messageTextarea.style.height = (messageTextarea.scrollHeight) + 'px';
            }, 100);
        }
    }

    // ========== ACTIVE NAV LINK HIGHLIGHTING ==========
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Check if this link matches current page
            if (linkHref === currentPage || 
                (currentPage === '' && linkHref === 'index.html') ||
                (currentPage === 'index.html' && (linkHref === './' || linkHref === '/')) ||
                (linkHref.includes(currentPage.replace('.html', '')) && currentPage !== 'index.html')) {
                link.classList.add('active');
            }
            
            // Special handling for services page with hash
            if (currentPage === 'services.html' && linkHref && linkHref.includes('services.html#')) {
                const hash = window.location.hash;
                if (hash && linkHref === `services.html${hash}`) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Run on page load and when URL changes
    setActiveNavLink();
    window.addEventListener('popstate', setActiveNavLink);

    // ========== UPDATE CURRENT YEAR IN FOOTER ==========
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // ========== IMAGE LAZY LOADING ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    if ('IntersectionObserver' in window && lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========== HELPER FUNCTIONS ==========
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function getScrollbarWidth() {
        // Create a temporary div to measure scrollbar width
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.width = '100px';
        outer.style.position = 'absolute';
        outer.style.top = '-9999px';
        document.body.appendChild(outer);
        
        const inner = document.createElement('div');
        inner.style.width = '100%';
        outer.appendChild(inner);
        
        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    }

    // ========== INITIALIZE ON LOAD ==========
    // Handle any initial hash
    setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
    }, 500);
    
    // Add loading class to body for initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    body:not(.loaded) * {
        animation: none !important;
        transition: none !important;
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
    
    .animate-fade-in-up {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);
