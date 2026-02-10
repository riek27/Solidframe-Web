// script.js - Crestline Web Studio
document.addEventListener('DOMContentLoaded', function() {
    // Typing Effect for Hero Section
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
    }

    // Mobile Menu Functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuBtn && mobileMenuClose && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Mobile dropdown functionality
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.parentElement.querySelector('.mobile-dropdown');
            dropdown.classList.toggle('active');
            
            // Toggle icon rotation
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            }
        });
    });

    // Desktop dropdown functionality
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
    });

    // Services Accordion Functionality
    const accordionItems = document.querySelectorAll('.service-accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.service-accordion-header');
        const toggle = item.querySelector('.accordion-toggle');
        
        if (header && toggle) {
            // Set first item as active by default
            if (item === accordionItems[0]) {
                item.classList.add('active');
                const content = item.querySelector('.service-accordion-content');
                if (content) content.style.maxHeight = content.scrollHeight + 'px';
            }
            
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.service-accordion-content');
                        if (otherContent) otherContent.style.maxHeight = null;
                    }
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    const content = item.querySelector('.service-accordion-content');
                    if (content) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                    }
                } else {
                    item.classList.remove('active');
                    const content = item.querySelector('.service-accordion-content');
                    if (content) content.style.maxHeight = null;
                }
            });
            
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                header.click();
            });
        }
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all other FAQ answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                item.classList.remove('active');
                item.style.maxHeight = null;
            });
            
            // Remove active class from all questions
            document.querySelectorAll('.faq-question').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                answer.classList.add('active');
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const current = parseInt(element.textContent);
        const increment = target > current ? 1 : -1;
        const speed = Math.min(1000 / target, 10); // Adjust speed based on target number
        
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
    
    if (statNumbers.length > 0) {
        window.addEventListener('scroll', checkStatsVisibility);
        checkStatsVisibility(); // Check on load
    }

    // Update current year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or if it's a different page anchor
            if (href === '#' || href.startsWith('#!')) return;
            
            // Only process if we're on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent. We'll contact you at ${email} within 24 hours.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Active nav link highlighting based on current page
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Check if this link matches current page
            if (linkHref === currentPage) {
                link.classList.add('active');
            }
            
            // Special handling for index.html
            if (currentPage === '' || currentPage === 'index.html') {
                if (linkHref === 'index.html' || linkHref === './' || linkHref === '/') {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Run on page load
    setActiveNavLink();

    // Handle anchor links from other pages
    function handleAnchorLinks() {
        const hash = window.location.hash;
        if (hash) {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }
    }
    
    handleAnchorLinks();
});
