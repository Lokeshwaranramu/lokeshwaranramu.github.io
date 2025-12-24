/* ========================================
   Google Antigravity Portfolio - JavaScript
   All interactions, animations, and behaviors
   ======================================== */

(function() {
  'use strict';

  /* ========================================
     Configuration & State
     ======================================== */
  const config = {
    particleCount: 150,
    particleMinSize: 2,
    particleMaxSize: 6,
    particleSpeedMin: 0.1,
    particleSpeedMax: 0.5,
    colors: [
      '#3186FF', // blue
      '#749BFF', // light blue
      '#DADCE0', // gray
      '#86868B'  // lighter gray
    ],
    observerThreshold: 0.3
  };

  let mouseX = 0.5;
  let mouseY = 0.5;
  let lastScrollPosition = 0;
  let ticking = false;

  /* ========================================
     Particle Drift Animation (Canvas)
     ======================================== */
  class ParticleSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.animationId = null;
      this.mouseX = this.canvas.width / 2;
      this.mouseY = this.canvas.height / 2;
      this.targetMouseX = this.mouseX;
      this.targetMouseY = this.mouseY;
      
      this.init();
      this.setupEventListeners();
      this.animate();
    }

    init() {
      this.resize();
      this.createParticles();
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.mouseX = this.canvas.width / 2;
      this.mouseY = this.canvas.height / 2;
      this.targetMouseX = this.mouseX;
      this.targetMouseY = this.mouseY;
      this.particles = [];
      this.createParticles();
    }

    createParticles() {
      for (let i = 0; i < config.particleCount; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          baseX: 0,
          baseY: 0,
          size: config.particleMinSize + Math.random() * (config.particleMaxSize - config.particleMinSize),
          color: config.colors[Math.floor(Math.random() * config.colors.length)],
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: 0.3 + Math.random() * 0.7,
          fadeSpeed: (Math.random() - 0.5) * 0.01,
          density: (Math.random() * 20) + 5
        });
      }
    }

    setupEventListeners() {
      window.addEventListener('resize', () => this.resize());
      
      // Track mouse movement
      document.addEventListener('mousemove', (e) => {
        this.targetMouseX = e.clientX;
        this.targetMouseY = e.clientY;
      });
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Smooth mouse following with easing
      const ease = 0.05;
      this.mouseX += (this.targetMouseX - this.mouseX) * ease;
      this.mouseY += (this.targetMouseY - this.mouseY) * ease;

      this.particles.forEach(particle => {
        // Calculate distance from mouse
        const dx = this.mouseX - particle.x;
        const dy = this.mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        // Mouse interaction - push particles away
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          const pushStrength = force * particle.density * 0.5;
          
          particle.x -= Math.cos(angle) * pushStrength;
          particle.y -= Math.sin(angle) * pushStrength;
        }

        // Base drift movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Update opacity with gentle fade
        particle.opacity += particle.fadeSpeed;
        if (particle.opacity >= 1 || particle.opacity <= 0.2) {
          particle.fadeSpeed *= -1;
        }

        // Wrap around screen edges
        if (particle.x < -10) particle.x = this.canvas.width + 10;
        if (particle.x > this.canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = this.canvas.height + 10;
        if (particle.y > this.canvas.height + 10) particle.y = -10;

        // Draw particle
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = particle.color;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
      });

      this.ctx.globalAlpha = 1;
      this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }
  }

  /* ========================================
     Mouse Tracking (CSS Custom Properties + 3D Transform)
     ======================================== */
  function initMouseTracking() {
    let mouseTimeout;
    
    // Track mouse position for CSS custom properties
    document.addEventListener('mousemove', (e) => {
      clearTimeout(mouseTimeout);
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          mouseX = (e.clientX / window.innerWidth);
          mouseY = (e.clientY / window.innerHeight);
          
          // Set CSS custom properties (0-100 range for backgrounds)
          document.documentElement.style.setProperty('--mouse-x', mouseX * 100);
          document.documentElement.style.setProperty('--mouse-y', mouseY * 100);
          
          // Set normalized values (-1 to 1 range for transforms)
          const normalizedX = (mouseX - 0.5) * 2;
          const normalizedY = (mouseY - 0.5) * 2;
          document.documentElement.style.setProperty('--mouse-normalized-x', normalizedX);
          document.documentElement.style.setProperty('--mouse-normalized-y', normalizedY);
          
          ticking = false;
        });
        ticking = true;
      }
    });
    
    // Apply 3D transform to interactive elements
    const interactiveElements = document.querySelectorAll('.feature-card, .skill-card, .featured-card, .project-card, .solution-card, .cert-badge, .detail-card, .cta-card');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        
        const maxRotation = 8;
        const rotateY = percentX * maxRotation;
        const rotateX = -percentY * maxRotation;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
      });
    });
  }

  /* ========================================
     Hidey Bar (Header)
     ======================================== */
  function initHideyBar() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;
          
          if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('hidden');
          } else {
            header.classList.remove('hidden');
          }
          
          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ========================================
     Scroll-Triggered Animations
     ======================================== */
  function initScrollAnimations() {
    const observerOptions = {
      threshold: [0, config.observerThreshold, 0.5, 1],
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= config.observerThreshold) {
          entry.target.classList.add('animate-in');
          
          // Trigger typewriter effect if element has typewriter-trigger class
          if (entry.target.classList.contains('typewriter-trigger')) {
            entry.target.classList.add('active');
          }
          
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-scale, .typewriter-trigger');
    animatedElements.forEach(el => observer.observe(el));
  }

  /* ========================================
     Carousel Functionality
     ======================================== */
  function initCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.carousel-item');
    const btnLeft = document.querySelector('.carousel-btn-left');
    const btnRight = document.querySelector('.carousel-btn-right');

    let currentIndex = 0;

    // Update snapped item
    function updateSnapped() {
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = items[0].offsetWidth;
      const gap = parseInt(getComputedStyle(carousel).gap);
      
      currentIndex = Math.round(scrollLeft / (itemWidth + gap));
      
      items.forEach((item, index) => {
        if (index === currentIndex) {
          item.classList.add('snapped');
          
          // Trigger typewriter for caption
          const caption = item.querySelector('.carousel-caption');
          if (caption && !caption.classList.contains('typewriter-animated')) {
            caption.classList.add('typewriter-animated');
            caption.style.animation = 'typewriter 2s steps(40) forwards, blink 0.7s step-end infinite';
          }
        } else {
          item.classList.remove('snapped');
        }
      });
    }

    // Scroll to item
    function scrollToItem(index) {
      const itemWidth = items[0].offsetWidth;
      const gap = parseInt(getComputedStyle(carousel).gap);
      carousel.scrollTo({
        left: index * (itemWidth + gap),
        behavior: 'smooth'
      });
    }

    // Button events
    if (btnLeft) {
      btnLeft.addEventListener('click', () => {
        const newIndex = Math.max(0, currentIndex - 1);
        scrollToItem(newIndex);
      });
    }

    if (btnRight) {
      btnRight.addEventListener('click', () => {
        const newIndex = Math.min(items.length - 1, currentIndex + 1);
        scrollToItem(newIndex);
      });
    }

    // Scroll event
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateSnapped, 100);
    });

    // Initial update
    updateSnapped();
  }

  /* ========================================
     Smooth Scroll for Navigation
     ======================================== */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(targetId);
        
        if (target) {
          const headerHeight = document.getElementById('header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          const navMenu = document.querySelector('.nav-menu');
          if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
          }
        }
      });
    });
  }

  /* ========================================
     Mobile Menu Toggle
     ======================================== */
  function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.nav-menu');
    
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      
      // Toggle icon
      const icon = toggle.querySelector('.material-symbols-outlined');
      if (menu.classList.contains('active')) {
        icon.textContent = 'close';
      } else {
        icon.textContent = 'menu';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
        const icon = toggle.querySelector('.material-symbols-outlined');
        icon.textContent = 'menu';
      }
    });
  }

  /* ========================================
     Contact Form Handling
     ======================================== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formStatus = document.getElementById('formStatus');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      // Get form data
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
      };

      // Validation
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        formStatus.textContent = 'Please fill out all fields.';
        formStatus.className = 'form-status error';
        return;
      }

      // Show loading state
      submitBtn.innerHTML = '<span class="material-symbols-outlined">hourglass_empty</span> Sending...';
      submitBtn.disabled = true;

      try {
        // Send email using EmailJS
        const response = await emailjs.send(
          'service_hln8j1b',
          'template_ms8hvz7',
          formData
        );

        if (response.status === 200) {
          formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          formStatus.className = 'form-status success';
          form.reset();
        }
      } catch (error) {
        console.error('Error sending email:', error);
        formStatus.textContent = 'Failed to send message. Please try again or email me directly.';
        formStatus.className = 'form-status error';
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        // Hide status after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
    });
  }

  /* ========================================
     Lazy Loading Images
     ======================================== */
  function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }
  }

  /* ========================================
     Performance: Debounce Function
     ======================================== */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /* ========================================
     Icon Strip Animation on Scroll
     ======================================== */
  function initIconStripAnimation() {
    const iconsStrip = document.querySelector('.icons-strip');
    if (!iconsStrip) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const icons = iconsStrip.querySelectorAll('.icon');
          icons.forEach((icon, index) => {
            setTimeout(() => {
              icon.style.animation = `wobble 4s ease-in-out infinite alternate ${index * -0.15}s`;
            }, index * 50);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(iconsStrip);
  }

  /* ========================================
     Prefers Reduced Motion
     ======================================== */
  function checkReducedMotion() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      // Disable animations
      document.documentElement.style.setProperty('--transition-fast', '0.01ms');
      document.documentElement.style.setProperty('--transition-normal', '0.01ms');
      document.documentElement.style.setProperty('--transition-slow', '0.01ms');
      document.documentElement.style.setProperty('--transition-very-slow', '0.01ms');
      
      // Don't initialize particle animation
      return true;
    }
    return false;
  }

  /* ========================================
     Keyboard Navigation Enhancement
     ======================================== */
  function initKeyboardNavigation() {
    // Add visible focus styles for keyboard users
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });

    document.body.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }

  /* ========================================
     Initialize All Features
     ======================================== */
  function init() {
    console.log('🚀 Initializing Antigravity Portfolio...');

    // Check for reduced motion preference
    const reducedMotion = checkReducedMotion();

    // Initialize particle system if motion is allowed
    if (!reducedMotion) {
      const canvas = document.getElementById('particleCanvas');
      if (canvas) {
        const particleSystem = new ParticleSystem(canvas);
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
          particleSystem.destroy();
        });
      }
    }

    // Initialize all features
    initMouseTracking();
    initHideyBar();
    initScrollAnimations();
    initCarousel();
    initSmoothScroll();
    initMobileMenu();
    initContactForm();
    initLazyLoading();
    initIconStripAnimation();
    initKeyboardNavigation();

    console.log('✅ Portfolio initialized successfully!');
  }

  /* ========================================
     Start when DOM is ready
     ======================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ========================================
     Dark Mode Toggle
     ======================================== */
  function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    
    // Check for saved dark mode preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    darkModeIcon.textContent = currentTheme === 'dark' ? 'light_mode' : 'dark_mode';
    
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        darkModeIcon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
        
        // Dispatch custom event for theme change
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
      });
    }
  }

  /* ========================================
     Visitor Counter - Simple Version
     ======================================== */
  function initVisitorCounter() {
    const STORAGE_KEY = 'portfolio_visits';
    
    // Get stored data
    let totalVisits = parseInt(localStorage.getItem(STORAGE_KEY) || '0');
    
    // Increment total visits
    totalVisits++;
    localStorage.setItem(STORAGE_KEY, totalVisits.toString());
    
    // Update display
    const visitorCountEl = document.getElementById('visitorCount');
    if (visitorCountEl) {
      visitorCountEl.textContent = totalVisits.toLocaleString();
    }
  }

  /* ========================================
     Service Worker Registration (PWA)
     ======================================== */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            console.log('✅ ServiceWorker registered:', registration.scope);
            
            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  console.log('🆕 New version available! Refresh to update.');
                }
              });
            });
          })
          .catch(error => {
            console.log('❌ ServiceWorker registration failed:', error);
          });
      });
    }
  }

  /* ========================================
     Install PWA Prompt
     ======================================== */
  function initPWAInstall() {
    let deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      
      // Show custom install button (optional)
      console.log('💾 PWA install prompt available');
    });
    
    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA installed successfully');
      deferredPrompt = null;
    });
  }

  /* ========================================
     Enhanced Contact Form with reCAPTCHA
     ======================================== */
  function enhanceContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Check reCAPTCHA
      const recaptchaResponse = grecaptcha.getResponse();
      if (!recaptchaResponse) {
        showFormStatus('Please complete the reCAPTCHA verification.', 'error');
        return;
      }
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        'g-recaptcha-response': recaptchaResponse
      };
      
      try {
        // Send via EmailJS
        await emailjs.send('service_hln8j1b', 'template_ms8hvz7', formData);
        showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        grecaptcha.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        showFormStatus('Failed to send message. Please try again.', 'error');
      }
    });
  }

  function showFormStatus(message, type) {
    const statusEl = document.getElementById('formStatus');
    if (!statusEl) return;
    
    statusEl.textContent = message;
    statusEl.className = `form-status ${type}`;
    statusEl.style.display = 'block';
    
    setTimeout(() => {
      statusEl.style.display = 'none';
    }, 5000);
  }

  /* ========================================
     Initialize All Dynamic Features
     ======================================== */
  function initDynamicFeatures() {
    console.log('🚀 Initializing portfolio automation...');
    
    initDarkMode();
    initVisitorCounter();
    registerServiceWorker();
    initPWAInstall();
    enhanceContactForm();
    
    console.log('✅ All dynamic features initialized successfully');
  }

  // Run dynamic features after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicFeatures);
  } else {
    initDynamicFeatures();
  }

  /* ========================================
     Handle Page Visibility Changes
     ======================================== */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause expensive operations when tab is not visible
      console.log('⏸️ Page hidden - pausing animations');
    } else {
      console.log('▶️ Page visible - resuming animations');
    }
  });

  /* ========================================
     Expose API for debugging (optional)
     ======================================== */
  if (typeof window !== 'undefined') {
    window.PortfolioAPI = {
      version: '1.0.0',
      config: config,
      getMousePosition: () => ({ x: mouseX, y: mouseY }),
      reinitialize: init
    };
  }

})();

/* ========================================
   Additional Utilities
   ======================================== */

// Add CSS class for keyboard navigation
const style = document.createElement('style');
style.textContent = `
  .keyboard-nav *:focus {
    outline: 2px solid var(--color-primary-blue) !important;
    outline-offset: 2px !important;
  }
`;
document.head.appendChild(style);

// Console styling
console.log(
  '%c🎨 Antigravity Portfolio',
  'font-size: 20px; font-weight: bold; color: #3186FF; text-shadow: 2px 2px 0px rgba(0,0,0,0.1);'
);
console.log(
  '%cBuilt with ❤️ for Lokeshwaran Ramu',
  'font-size: 12px; color: #86868B;'
);
