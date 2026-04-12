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
    faqItem.classList.toggle('active');
  };

  $$('.faq-question').forEach(question => {
    question.addEventListener('click', function(e) {
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
      
      const btn = $('.form-submit', form);
      if (!btn) return;
      
      const originalText = btn.innerHTML;
      btn.innerHTML = '✅ Message Sent!';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      
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
          observer.unobserve(entry.target);
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
      
      link.classList.remove('active');
      
      if (href === currentPath || 
          (currentPath === '' && href === 'index.html') ||
          (currentPath === 'index.html' && href === 'index.html') ||
          (href.includes(currentPath) && currentPath !== '')) {
        link.classList.add('active');
      }
    });
  }
  setActiveNavLink();

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
    }
  }

  // ===== CLOSE MOBILE MENU ON ESCAPE =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMain && navMain.classList.contains('open')) {
      navToggle?.classList.remove('active');
      navMain.classList.remove('open');
      mobileOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ===== INITIAL SCROLL STATE =====
  if (navbar) {
    if (window.scrollY > 80) navbar.classList.add('scrolled');
  }
  if (scrollTopBtn) {
    if (window.scrollY > 500) scrollTopBtn.classList.add('visible');
  }

  // ===== DROPDOWN TOGGLE (DESKTOP & MOBILE) – PREVENT NAVIGATION =====
  $$('.nav-dropdown > .nav-link').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', (e) => {
      // If it's the Services link (or any with a dropdown), prevent navigation
      const parentDropdown = dropdownToggle.closest('.nav-dropdown');
      if (parentDropdown) {
        e.preventDefault(); // Stop the link from navigating to services.html
        parentDropdown.classList.toggle('open');
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      $$('.nav-dropdown').forEach(drop => drop.classList.remove('open'));
    }
  });

  // Allow actual navigation when clicking on dropdown items (they are <a> tags)
  // No action needed – they will navigate normally.

})();

// ===== ENHANCED FAQ TOGGLE (ACCORDION STYLE) =====
(function initFaqAccordion() {
  const allFaqItems = document.querySelectorAll('.faq-item');
  if (allFaqItems.length === 0) return;

  function handleFaqClick(e) {
    const faqItem = e.currentTarget.closest('.faq-item');
    if (!faqItem) return;
    faqItem.classList.toggle('active');
  }

  allFaqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.removeAttribute('onclick');
      question.addEventListener('click', handleFaqClick);
    }
  });

  document.body.addEventListener('click', (e) => {
    const question = e.target.closest('.faq-question');
    if (!question) return;
    const faqItem = question.closest('.faq-item');
    if (!faqItem) return;
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
    faqItem.classList.toggle('active');
  });

  window.toggleFaq = function(element) {
    const faqItem = element.closest('.faq-item');
    if (faqItem) faqItem.classList.toggle('active');
  };
})();

// ===== TRUSTED BY LOGO CAROUSEL =====
(function initLogoCarousel() {
  const carousel = document.getElementById('logoCarousel');
  if (!carousel) return;

  const originalItems = Array.from(carousel.children);
  carousel.innerHTML = '';
  originalItems.forEach(item => carousel.appendChild(item.cloneNode(true)));
  
  const items = carousel.querySelectorAll('.logo-item');
  items.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
  });

  function setAnimationDuration() {
    const itemCount = items.length;
    const baseSpeed = window.innerWidth <= 768 ? 20 : 30;
    carousel.style.animationDuration = baseSpeed + 's';
  }
  setAnimationDuration();
  window.addEventListener('resize', setAnimationDuration);
})();
