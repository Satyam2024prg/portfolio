/**
 * Satyam Portfolio - Main JavaScript
 * Vanilla JS - No frameworks
 */

(function () {
  'use strict';

  // ============================================
  // DOM Elements
  // ============================================
  const DOM = {
    html: document.documentElement,
    body: document.body,
    navbar: document.getElementById('navbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileMenu: document.getElementById('mobile-menu'),
    mobileOverlay: document.getElementById('mobile-overlay'),
    mobileNavLinks: document.querySelectorAll('.mobile-nav-link'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    scrollProgress: document.getElementById('scroll-progress'),
    backToTop: document.getElementById('back-to-top'),
    contactForm: document.getElementById('contact-form'),
    formSuccess: document.getElementById('form-success'),
    counters: document.querySelectorAll('[data-counter]'),
    statCounters: document.querySelectorAll('[data-stat-counter]'),
    sections: document.querySelectorAll('section[id]'),
    currentYear: document.getElementById('current-year'),
  };

  // ============================================
  // Theme Management
  // ============================================
  const Theme = {
    STORAGE_KEY: 'portfolio-theme',

    init() {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const theme = saved || 'dark';
      this.set(theme);

      DOM.themeToggle?.addEventListener('click', () => {
        const current = DOM.html.getAttribute('data-theme') || 'dark';
        this.set(current === 'dark' ? 'light' : 'dark');
      });

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.set(e.matches ? 'dark' : 'light');
        }
      });
    },

    set(theme) {
      DOM.html.setAttribute('data-theme', theme);
      localStorage.setItem(this.STORAGE_KEY, theme);
      this.updateIcon(theme);
    },

    updateIcon(theme) {
      if (!DOM.themeIcon) return;
      DOM.themeIcon.className = theme === 'dark'
        ? 'fas fa-sun text-lg'
        : 'fas fa-moon text-lg';
    },
  };

  // ============================================
  // Navigation
  // ============================================
  const Navigation = {
    init() {
      this.setupSmoothScroll();
      this.setupActiveLinks();
      this.setupMobileMenu();
      this.setupScrollEffects();
    },

    setupSmoothScroll() {
      const allLinks = [...DOM.navLinks, ...DOM.mobileNavLinks];
      allLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (!href?.startsWith('#')) return;

          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            MobileMenu.close();
          }
        });
      });
    },

    setupActiveLinks() {
      const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            this.setActiveLink(id);
          }
        });
      }, observerOptions);

      DOM.sections.forEach((section) => observer.observe(section));
    },

    setActiveLink(sectionId) {
      DOM.navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
      });

      DOM.mobileNavLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
      });
    },

    setupMobileMenu() {
      DOM.mobileMenuBtn?.addEventListener('click', () => MobileMenu.toggle());
      DOM.mobileOverlay?.addEventListener('click', () => MobileMenu.close());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') MobileMenu.close();
      });
    },

    setupScrollEffects() {
      let ticking = false;

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    },

    handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (DOM.scrollProgress) {
        DOM.scrollProgress.style.width = `${scrollPercent}%`;
      }

      if (DOM.navbar) {
        DOM.navbar.classList.toggle('scrolled', scrollTop > 50);
      }

      if (DOM.backToTop) {
        DOM.backToTop.classList.toggle('visible', scrollTop > 400);
      }
    },
  };

  const MobileMenu = {
    isOpen: false,

    toggle() {
      this.isOpen ? this.close() : this.open();
    },

    open() {
      this.isOpen = true;
      DOM.mobileMenu?.classList.add('open');
      DOM.mobileOverlay?.classList.add('open');
      DOM.mobileMenuBtn?.setAttribute('aria-expanded', 'true');
      DOM.body.style.overflow = 'hidden';
    },

    close() {
      this.isOpen = false;
      DOM.mobileMenu?.classList.remove('open');
      DOM.mobileOverlay?.classList.remove('open');
      DOM.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      DOM.body.style.overflow = '';
    },
  };

  // ============================================
  // Counter Animation
  // ============================================
  const CounterAnimation = {
    animated: new Set(),

    init() {
      const allCounters = [...DOM.counters, ...DOM.statCounters];
      if (!allCounters.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.animated.has(entry.target)) {
              this.animate(entry.target);
              this.animated.add(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      allCounters.forEach((counter) => observer.observe(counter));
    },

    animate(element) {
      const target = parseInt(element.getAttribute('data-counter') || element.getAttribute('data-stat-counter'), 10);
      const suffix = element.getAttribute('data-suffix') || '';
      const prefix = element.getAttribute('data-prefix') || '';
      const duration = 2000;
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        element.textContent = `${prefix}${current}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          element.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    },
  };

  // ============================================
  // Typed.js Initialization
  // ============================================
  const TypingAnimation = {
    init() {
      const typedElement = document.getElementById('typed-text');
      if (!typedElement || typeof Typed === 'undefined') return;

      new Typed('#typed-text', {
        strings: [
          'Full Stack Developer',
          'Backend Engineer',
          'API Developer',
          'Problem Solver',
          'Automation Enthusiast',
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      });
    },
  };

  // ============================================
  // AOS Initialization
  // ============================================
  const ScrollAnimations = {
    init() {
      if (typeof AOS === 'undefined') return;

      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80,
        disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      });
    },
  };

  // ============================================
  // Contact Form
  // ============================================
  const ContactForm = {
    init() {
      DOM.contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    },

    handleSubmit() {
      const formData = new FormData(DOM.contactForm);
      const data = Object.fromEntries(formData.entries());

      if (!this.validate(data)) return;

      DOM.contactForm.style.display = 'none';
      if (DOM.formSuccess) {
        DOM.formSuccess.classList.remove('hidden');
        DOM.formSuccess.textContent = 'Thank you for your message! I will get back to you soon.';
      }

      setTimeout(() => {
        DOM.contactForm.reset();
        DOM.contactForm.style.display = '';
        DOM.formSuccess?.classList.add('hidden');
      }, 5000);
    },

    validate(data) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.name?.trim()) {
        this.showError('Please enter your name.');
        return false;
      }
      if (!emailRegex.test(data.email)) {
        this.showError('Please enter a valid email address.');
        return false;
      }
      if (!data.subject?.trim()) {
        this.showError('Please enter a subject.');
        return false;
      }
      if (!data.message?.trim()) {
        this.showError('Please enter your message.');
        return false;
      }
      return true;
    },

    showError(message) {
      if (DOM.formSuccess) {
        DOM.formSuccess.classList.remove('hidden');
        DOM.formSuccess.className = 'form-success mt-4';
        DOM.formSuccess.style.background = 'rgba(239, 68, 68, 0.1)';
        DOM.formSuccess.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        DOM.formSuccess.style.color = '#ef4444';
        DOM.formSuccess.textContent = message;

        setTimeout(() => {
          DOM.formSuccess.classList.add('hidden');
          DOM.formSuccess.style.background = '';
          DOM.formSuccess.style.borderColor = '';
          DOM.formSuccess.style.color = '';
        }, 3000);
      }
    },
  };

  // ============================================
  // Back to Top
  // ============================================
  const BackToTop = {
    init() {
      DOM.backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
  };

  // ============================================
  // Footer Year
  // ============================================
  const Footer = {
    init() {
      if (DOM.currentYear) {
        DOM.currentYear.textContent = new Date().getFullYear();
      }
    },
  };

  // ============================================
  // Navbar Scroll Class Styles (injected)
  // ============================================
  const NavbarStyles = {
    init() {
      const style = document.createElement('style');
      style.textContent = `
        #navbar.scrolled {
          background: var(--glass-bg) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
      `;
      document.head.appendChild(style);
    },
  };

  // ============================================
  // Initialize Everything
  // ============================================
  function init() {
    Theme.init();
    Navigation.init();
    CounterAnimation.init();
    TypingAnimation.init();
    ScrollAnimations.init();
    ContactForm.init();
    BackToTop.init();
    Footer.init();
    NavbarStyles.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
