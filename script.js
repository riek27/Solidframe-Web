(function() {
  "use strict";

  // ===== UTILITIES =====
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => context.querySelectorAll(selector);

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = $('#navbar');
  const scrollTopBtn = $('#scrollTop');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      if (scrollTopBtn) {
        if (window.scrollY > 500) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }
    });
  }

  // ===== SCROLL TO TOP =====
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  document.body.classList.add('js-loaded');

  // ===== MOBILE MENU =====
  const navToggle = $('#navToggle');
  const navMain = $('#navMain');
  const mobileOverlay = $('#mobileOverlay');
  
  if (navToggle && navMain && mobileOverlay) {
    const closeMenu = () => {
      navToggle.classList.remove('active');
      navMain.classList.remove('open');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    const openMenu = () => {
      navToggle.classList.add('active');
      navMain.classList.add('open');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    navToggle.addEventListener('click', () => {
      if (navMain.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileOverlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked (mobile)
    $$('.nav-link, .nav-quote-btn, .dropdown-item').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });

    // Mobile dropdown toggle
    $$('.nav-dropdown > .nav-link').forEach(dropdownToggle => {
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = dropdownToggle.closest('.nav-dropdown');
          if (parent) {
            parent.classList.toggle('open');
          }
        }
      });
    });
  }

  // ===== FAQ TOGGLE =====
  window.toggleFaq = function(element) {
    const faqItem = element.closest('.faq-item');
    if (!faqItem) return;
    
    const isActive = faqItem.classList.contains('active');
    
    // Optional: close others in the same category? Not required, but we can keep independent.
    // For better UX, we'll allow multiple open, or you can uncomment below to accordion.
    /*
    const parentCategory = faqItem.closest('.faq-category');
    if (parentCategory) {
      $$('.faq-item', parentCategory).forEach(item => item.classList.remove('active'));
    }
    */
    
    if (!isActive) {
      faqItem.classList.add('active');
    } else {
      faqItem.classList.remove('active');
    }
  };

  // Also attach click listeners to all FAQ questions (in case inline onclick not used)
  $$('.faq-question').forEach(question => {
    question.addEventListener('click', function(e) {
      // If the click was on the toggle icon or the question, we handle.
      const faqItem = this.closest('.faq-item');
      if (faqItem) {
        faqItem.classList.toggle('active');
      }
    });
  });

  // ===== READ MORE / LESS (Blog) =====
  $$('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const targetId = this.dataset.target;
      if (!targetId) return;
      
      const excerpt = $(`#${targetId}-excerpt`);
      const full = $(`#${targetId}-full`);
      
      if (!excerpt || !full) return;
      
      if (full.style.display === 'none' || getComputedStyle(full).display === 'none') {
        full.style.display = 'block';
        excerpt.style.display = 'none';
        this.textContent = 'Read Less';
      } else {
        full.style.display = 'none';
        excerpt.style.display = 'block';
        this.textContent = 'Read More';
      }
    });
  });

  // ===== FORM SUBMIT SIMULATION =====
  $$('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation (HTML5 handles required, but we can add more)
      const btn = $('.form-submit', form);
      if (!btn) return;
      
      const originalText = btn.innerHTML;
      btn.innerHTML = '✅ Message Sent!';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      
      // Optionally clear form
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  });

  // ===== INTERSECTION OBSERVER FOR FADE ANIMATIONS =====
  const animatedElements = $$('.fade-in, .fade-in-left, .fade-in-right');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => observer.observe(el));
  }

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = $$('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      
      // Remove active class from all
      link.classList.remove('active');
      
      // Check if href matches current page
      if (href === currentPath || 
          (currentPath === '' && href === 'index.html') ||
          (currentPath === 'index.html' && href === 'index.html') ||
          (href.includes(currentPath) && currentPath !== '')) {
        link.classList.add('active');
      }
    });
    
    // Also handle dropdown parent active state if needed
    const dropdownParents = $$('.nav-dropdown');
    dropdownParents.forEach(drop => {
      const link = $('.nav-link', drop);
      const activeChild = $('.dropdown-item.active', drop);
      if (activeChild) {
        link.classList.add('active');
      }
    });
  }
  setActiveNavLink();

  // Also update active on scroll for single-page sections (index only)
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
    const sections = $$('section[id]');
    const navLinks = $$('.nav-links .nav-link');
    
    const scrollHandler = () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
          link.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', scrollHandler);
    scrollHandler(); // initial call
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!' || !href.startsWith('#')) return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        
        // Update URL without jump
        history.pushState(null, null, href);
      }
    });
  });

  // ===== COUNTER ANIMATION (Hero Stats) =====
  const statNumbers = $$('.hero-stat-number');
  if (statNumbers.length > 0) {
    const animateCounters = () => {
      statNumbers.forEach(counter => {
        const text = counter.textContent;
        if (text.includes('+')) {
          const target = parseInt(text.replace(/\D/g, ''));
          if (isNaN(target)) return;
          
          let current = 0;
          const increment = Math.ceil(target / 40);
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target + '+';
              clearInterval(timer);
            } else {
              counter.textContent = current + '+';
            }
          }, 25);
        }
      });
    };
    
    const heroStatsSection = $('.hero-stats');
    if (heroStatsSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      heroObserver.observe(heroStatsSection);
    } else {
      // If no hero-stats wrapper, just observe first stat's parent
      const firstStat = statNumbers[0];
      if (firstStat) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              animateCounters();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });
        observer.observe(firstStat.closest('.hero-stats') || firstStat);
      }
    }
  }

  // ===== ADDITIONAL: CLOSE MOBILE MENU ON ESCAPE =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMain && navMain.classList.contains('open')) {
      navToggle?.classList.remove('active');
      navMain.classList.remove('open');
      mobileOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ===== PRICING CARD HOVER EFFECT (already in CSS) =====
  // No extra JS needed.

  // ===== INITIAL CHECK FOR SCROLLED CLASS ON PAGE LOAD =====
  if (navbar) {
    if (window.scrollY > 80) navbar.classList.add('scrolled');
  }
  if (scrollTopBtn) {
    if (window.scrollY > 500) scrollTopBtn.classList.add('visible');
  }

  // ===== FIX FOR DROPDOWN MENU ON DESKTOP: ensure hover works, no JS needed =====
  // But we need to prevent default if href is just "#" for dropdown toggles
  $$('.nav-dropdown > .nav-link').forEach(link => {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', (e) => e.preventDefault());
    }
  });

})();
