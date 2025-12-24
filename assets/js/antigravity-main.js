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
      '#3186FF', // Salesforce blue
      '#00A1E0', // Salesforce light blue
      '#032D60', // Salesforce navy
      '#FFE432', // Lightning yellow
      '#FBBC04', // Gold
      '#00B95C'  // Success green
    ],
    observerThreshold: 0.3
  };

  let mouseX = 0.5;
  let mouseY = 0.5;
  let lastScrollPosition = 0;
  let ticking = false;

  /* ========================================
     Utility Functions
     ======================================== */
  function throttle(func, wait) {
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
  /* ========================================
     PROJECT STATS DASHBOARD
     ======================================== */
  function initStatsCounters() {
    const statCards = document.querySelectorAll('.stat-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate number counter
          const numberElement = entry.target.querySelector('.stat-number');
          if (numberElement && !numberElement.dataset.counted) {
            const targetValue = parseInt(numberElement.dataset.counter);
            animateCounter(numberElement, targetValue, 2000);
            numberElement.dataset.counted = 'true';
          }
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    statCards.forEach(card => observer.observe(card));
  }

  function animateCounter(element, target, duration) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  /* ========================================
     TECH STACK VISUALIZATION
     ======================================== */
  function initTechStack() {
    const canvas = document.getElementById('techCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const techNodes = document.querySelectorAll('.tech-node');
    const centerNode = document.querySelector('.tech-center');
    
    // Set canvas size
    function resizeCanvas() {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      drawConnections();
    }
    
    resizeCanvas();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 200);
    });
    
    // Draw connections from center to all nodes
    function drawConnections() {
      if (window.innerWidth <= 930) return; // Don't draw on mobile
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!centerNode) return;
      
      const centerRect = centerNode.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      const centerX = centerRect.left + centerRect.width / 2 - canvasRect.left;
      const centerY = centerRect.top + centerRect.height / 2 - canvasRect.top;
      
      techNodes.forEach(node => {
        if (node === centerNode) return;
        
        const nodeRect = node.getBoundingClientRect();
        const nodeX = nodeRect.left + nodeRect.width / 2 - canvasRect.left;
        const nodeY = nodeRect.top + nodeRect.height / 2 - canvasRect.top;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(nodeX, nodeY);
        ctx.strokeStyle = node.classList.contains('active') 
          ? 'rgba(49, 134, 255, 0.5)' 
          : 'rgba(218, 220, 224, 0.5)';
        ctx.lineWidth = node.classList.contains('active') ? 2 : 1;
        ctx.stroke();
      });
    }
    
    // Node hover interactions
    techNodes.forEach(node => {
      node.addEventListener('mouseenter', () => {
        node.classList.add('active');
        drawConnections();
      });
      
      node.addEventListener('mouseleave', () => {
        node.classList.remove('active');
        drawConnections();
      });
    });
    
    // Initial draw
    setTimeout(drawConnections, 100);
  }

  /* ========================================
     CODE SHOWCASE
     ======================================== */
  function initCodeShowcase() {
    const tabs = document.querySelectorAll('.code-tab');
    const panels = document.querySelectorAll('.code-panel');
    const copyButtons = document.querySelectorAll('.code-copy');
    
    if (!tabs.length || !panels.length) {
      console.log('Code showcase elements not found');
      return;
    }
    
    console.log(`Code showcase: ${tabs.length} tabs, ${panels.length} panels found`);
    
    // Tab switching
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = tab.dataset.lang;
        
        console.log(`Switching to: ${lang}`);
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active panel
        panels.forEach(panel => {
          if (panel.dataset.panel === lang) {
            panel.classList.add('active');
            console.log(`Showing panel: ${lang}`);
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
    
    // Copy to clipboard
    copyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const codeType = button.dataset.code;
        const panel = document.querySelector(`.code-panel[data-panel="${codeType}"]`);
        if (!panel) return;
        
        const codeBlock = panel.querySelector('code');
        if (!codeBlock) return;
        
        const codeText = codeBlock.textContent;
        
        navigator.clipboard.writeText(codeText).then(() => {
          const originalText = button.innerHTML;
          button.innerHTML = '<span class="material-symbols-outlined">check</span> Copied!';
          button.style.background = 'rgba(0, 185, 92, 0.2)';
          
          setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
          }, 2000);
        });
      });
    });
  }

  /* ========================================
     ARCHITECTURE DIAGRAM
     ======================================== */
  function initArchitectureDiagram() {
    const components = document.querySelectorAll('.arch-component');
    const popup = document.getElementById('archPopup');
    const closeBtn = document.querySelector('.arch-popup-close');
    
    // Component data
    const componentInfo = {
      'lwc': {
        title: 'Lightning Web Components',
        description: 'Modern UI framework using web standards. Fast, lightweight, and follows best practices for component-based architecture.',
        tags: ['JavaScript', 'HTML', 'CSS', 'Web Components']
      },
      'visualforce': {
        title: 'Visualforce Pages',
        description: 'Server-side rendering framework for custom UI. Used for complex page layouts and legacy integrations.',
        tags: ['Apex', 'HTML', 'JavaScript', 'Server-Side']
      },
      'apex-classes': {
        title: 'Apex Classes',
        description: 'Business logic implementation with object-oriented patterns. Handles data processing, validations, and complex calculations.',
        tags: ['Apex', 'OOP', 'Business Logic', 'Unit Tests']
      },
      'triggers': {
        title: 'Apex Triggers',
        description: 'Event-driven automation for DML operations. Implements before/after logic for record lifecycle management.',
        tags: ['Apex', 'Automation', 'Event-Driven', 'Data Validation']
      },
      'flows': {
        title: 'Flows & Process Builder',
        description: 'Declarative automation tools for screen flows, record-triggered flows, and scheduled automation.',
        tags: ['Flow Builder', 'No-Code', 'Automation', 'Declarative']
      },
      'rest-api': {
        title: 'REST APIs',
        description: 'RESTful web services for external integrations. Handles authentication, rate limiting, and JSON payloads.',
        tags: ['REST', 'HTTP', 'JSON', 'OAuth']
      },
      'platform-events': {
        title: 'Platform Events',
        description: 'Event-driven architecture for real-time messaging. Enables decoupled, scalable integrations.',
        tags: ['Event Bus', 'Pub/Sub', 'Real-Time', 'Scalable']
      },
      'mulesoft': {
        title: 'MuleSoft Integration',
        description: 'Enterprise integration platform for API-led connectivity. Orchestrates complex data flows across systems.',
        tags: ['MuleSoft', 'APIs', 'ESB', 'Data Mapping']
      },
      'custom-objects': {
        title: 'Custom Objects',
        description: 'Custom data models tailored to business needs. Includes relationships, validation rules, and security.',
        tags: ['Data Model', 'Relationships', 'Schema', 'Metadata']
      },
      'external-objects': {
        title: 'External Objects',
        description: 'Real-time access to external data via Salesforce Connect. No data storage, direct API calls.',
        tags: ['Salesforce Connect', 'OData', 'External Data', 'Real-Time']
      },
      'aws': {
        title: 'AWS Services',
        description: 'Cloud infrastructure for scalable processing. Lambda functions, S3 storage, and SQS queues.',
        tags: ['AWS Lambda', 'S3', 'SQS', 'CloudWatch']
      },
      'third-party': {
        title: 'Third-Party APIs',
        description: 'External service integrations for payments, SMS, email, and specialized business functions.',
        tags: ['External APIs', 'Webhooks', 'HTTP Callouts', 'Authentication']
      }
    };
    
    // Click handler
    components.forEach(component => {
      component.addEventListener('click', () => {
        const compKey = component.dataset.component;
        const info = componentInfo[compKey];
        
        if (info) {
          document.getElementById('popupTitle').textContent = info.title;
          document.getElementById('popupDescription').textContent = info.description;
          
          const tagsContainer = document.getElementById('popupTags');
          tagsContainer.innerHTML = info.tags
            .map(tag => `<span class="popup-tag">${tag}</span>`)
            .join('');
          
          popup.classList.add('active');
        }
      });
    });
    
    // Close handlers
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });
    
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('active');
      }
    });
  }

  /* ========================================
     CASE STUDIES
     ======================================== */
  function initCaseStudies() {
    const cards = document.querySelectorAll('.case-study-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    cards.forEach(card => observer.observe(card));
  }

  /* ========================================
     Initialize Portfolio
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
    
    // Initialize enhanced animations (batch 1)
    initScrollProgressIndicator();
    initTimelineProgressAnimation();
    initParallaxCards();
    initStaggeredEntrance();
    initInteractiveGradient();
    
    // Initialize enhanced animations (batch 2)
    // initTypingAnimation(); // Disabled - static text per user request
    initMagneticButtons();
    initNumberCounters();
    initFloatingBadges();
    initPageTransitions();
    // initSkillProgressBars(); // Disabled - removed per user request
    initMouseTrail();
    
    // Initialize new showcase sections
    initStatsCounters();
    initTechStack();
    initCodeShowcase();
    initArchitectureDiagram();
    initCaseStudies();

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
     Salesforce Themed Animations
     ======================================== */
  
  // Lightning Strike Animation
  function createLightningStrike() {
    const lightning = document.createElement('div');
    lightning.className = 'sf-lightning';
    lightning.innerHTML = '⚡';
    lightning.style.cssText = `
      left: ${Math.random() * 100}%;
      top: -50px;
      font-size: ${24 + Math.random() * 24}px;
      color: ${['#FFE432', '#FBBC04', '#3186FF'][Math.floor(Math.random() * 3)]};
      position: fixed;
      filter: drop-shadow(0 0 10px currentColor);
    `;
    
    document.body.appendChild(lightning);
    
    // Trigger animation
    setTimeout(() => lightning.classList.add('active'), 10);
    
    // Remove after animation
    setTimeout(() => lightning.remove(), 600);
  }

  // Data Node Animation (Salesforce data flow)
  function createDataNodes() {
    const sections = document.querySelectorAll('.features-section, .skills-section, .experience-section');
    
    sections.forEach(section => {
      // Create 5-8 data nodes per section
      const nodeCount = 5 + Math.floor(Math.random() * 4);
      
      for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'sf-data-node';
        node.style.cssText = `
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          animation-delay: ${Math.random() * 2}s;
        `;
        section.style.position = 'relative';
        section.appendChild(node);
      }
    });
  }

  // Connection Lines Animation (data flow between elements)
  function createConnectionLines() {
    const cards = document.querySelectorAll('.feature-card, .skill-card');
    
    cards.forEach((card, index) => {
      if (index % 3 === 0) { // Add lines to every 3rd card
        const line = document.createElement('div');
        line.className = 'sf-connection-line';
        line.style.cssText = `
          width: ${100 + Math.random() * 100}px;
          top: 50%;
          left: 100%;
          animation-delay: ${Math.random() * 3}s;
        `;
        card.style.position = 'relative';
        card.style.overflow = 'visible';
        card.appendChild(line);
      }
    });
  }

  // Initialize Salesforce animations
  function initSalesforceAnimations() {
    // Create data nodes - DISABLED
    // createDataNodes();
    
    // Create connection lines
    createConnectionLines();
    
    // Lightning strikes every 5-10 seconds
    setInterval(() => {
      if (Math.random() > 0.5) {
        createLightningStrike();
      }
    }, 5000 + Math.random() * 5000);
    
    // Add badge glow to certification images
    document.querySelectorAll('.cert-badge img').forEach(img => {
      img.parentElement.classList.add('sf-badge-glow');
    });
    
    // Add interactive class to project cards
    document.querySelectorAll('.featured-card, .solution-card, .appexchange-card').forEach(card => {
      card.classList.add('sf-interactive');
    });
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initSalesforceAnimations, 1000);
    });
  } else {
    setTimeout(initSalesforceAnimations, 1000);
  }

  /* ========================================
     Salesforce Cursor Follower Cloud
     ======================================== */
  
  function initCursorFollower() {
    // Create cursor cloud element
    const cursorCloud = document.createElement('div');
    cursorCloud.className = 'sf-cursor-cloud';
    cursorCloud.innerHTML = '☁️';
    document.body.appendChild(cursorCloud);

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const ease = 0.15; // Smoothing factor (lower = smoother but slower)
    let isMoving = false;
    let hideTimeout;
    const trails = [];
    let lastTrailTime = 0;
    const trailInterval = 50; // Create trail dot every 50ms

    // Smooth animation loop
    function animate() {
      // Smooth easing towards target position
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      // Update cloud position
      cursorCloud.style.left = currentX + 'px';
      cursorCloud.style.top = currentY + 'px';

      // Continue animation loop
      requestAnimationFrame(animate);
    }

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Show cloud on movement
      if (!isMoving) {
        isMoving = true;
        cursorCloud.classList.add('active');
      }

      // Clear hide timeout
      clearTimeout(hideTimeout);

      // Create trail effect
      const now = Date.now();
      if (now - lastTrailTime > trailInterval) {
        createTrailDot(e.clientX, e.clientY);
        lastTrailTime = now;
      }

      // Hide after 2 seconds of no movement
      hideTimeout = setTimeout(() => {
        isMoving = false;
        cursorCloud.classList.remove('active');
      }, 2000);
    });

    // Hide when mouse leaves window
    document.addEventListener('mouseleave', () => {
      cursorCloud.classList.remove('active');
    });

    // Show when mouse enters window
    document.addEventListener('mouseenter', () => {
      if (isMoving) {
        cursorCloud.classList.add('active');
      }
    });

    // Create trail dot
    function createTrailDot(x, y) {
      const trail = document.createElement('div');
      trail.className = 'sf-cursor-trail';
      trail.style.left = x + 'px';
      trail.style.top = y + 'px';
      document.body.appendChild(trail);

      // Activate trail
      setTimeout(() => trail.classList.add('active'), 10);

      // Remove after animation
      setTimeout(() => trail.remove(), 1000);
    }

    // Start animation loop
    animate();
  }

  /* ========================================
     Touch Ripple Effect (Mobile Alternative)
     ======================================== */
  function initTouchRipple() {
    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      createTouchRipple(touch.clientX, touch.clientY);
    });

    document.addEventListener('touchmove', (e) => {
      // Create ripples along touch path (throttled)
      const touch = e.touches[0];
      const now = Date.now();
      if (now - (window.lastTouchRipple || 0) > 100) {
        createTouchRipple(touch.clientX, touch.clientY);
        window.lastTouchRipple = now;
      }
    });

    function createTouchRipple(x, y) {
      const ripple = document.createElement('div');
      ripple.className = 'sf-touch-ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      document.body.appendChild(ripple);

      // Activate ripple
      setTimeout(() => ripple.classList.add('active'), 10);

      // Remove after animation
      setTimeout(() => ripple.remove(), 800);
    }
  }

  // Initialize cursor follower after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initCursorFollower, 500);
    });
  } else {
    setTimeout(initCursorFollower, 500);
  }

  /* ========================================
     Enhanced Animations
     ======================================== */
  
  // 1. Scroll Progress Indicator
  function initScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.pageYOffset;
      const progress = (scrolled / scrollHeight) * 100;
      progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // 2. Timeline Progress Line Animation
  function initTimelineProgressAnimation() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    // Create progress line
    const progressLine = document.createElement('div');
    progressLine.className = 'timeline-progress';
    
    const progressDot = document.createElement('div');
    progressDot.className = 'timeline-progress-dot';
    progressLine.appendChild(progressDot);
    
    timeline.appendChild(progressLine);

    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function updateTimelineProgress() {
      const timelineRect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate progress based on timeline visibility
      if (timelineRect.top < viewportHeight && timelineRect.bottom > 0) {
        const scrollProgress = Math.max(0, viewportHeight - timelineRect.top);
        const maxHeight = Math.min(timelineRect.height, scrollProgress);
        progressLine.style.height = maxHeight + 'px';
        
        // Highlight timeline items that are passed
        timelineItems.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < viewportHeight * 0.5) {
            item.classList.add('timeline-active');
          } else {
            item.classList.remove('timeline-active');
          }
        });
      }
    }

    window.addEventListener('scroll', updateTimelineProgress, { passive: true });
    updateTimelineProgress();
  }

  // 3. Card Parallax Depth Effect
  function initParallaxCards() {
    // Skip on mobile/touch devices for performance
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const cards = document.querySelectorAll('.feature-card, .detail-card, .project-card');
    
    cards.forEach(card => {
      card.classList.add('parallax-card');
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.classList.add('parallax-active');
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('parallax-active');
        card.style.transform = '';
      });
    });
  }

  // 4. Staggered Entrance Animations
  function initStaggeredEntrance() {
    const skillCards = document.querySelectorAll('.skill-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Add stagger class to all items
    [...skillCards, ...timelineItems, ...featureCards].forEach(item => {
      item.classList.add('stagger-item');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Find all stagger items in the parent container
          const container = entry.target.closest('.skills-grid, .timeline, .features-grid');
          if (container) {
            const items = container.querySelectorAll('.stagger-item');
            items.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('stagger-visible');
              }, index * 100); // 100ms between each item
            });
          } else {
            entry.target.classList.add('stagger-visible');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Observe parent containers
    const containers = document.querySelectorAll('.skills-grid, .timeline, .features-grid');
    containers.forEach(container => observer.observe(container));
  }

  // 5. Interactive Background Gradient
  function initInteractiveGradient() {
    // Create gradient background element
    const gradientBg = document.createElement('div');
    gradientBg.className = 'gradient-bg';
    document.body.insertBefore(gradientBg, document.body.firstChild);

    // Update gradient position based on mouse movement (throttled)
    let ticking = false;
    
    document.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth) * 100;
          const y = (e.clientY / window.innerHeight) * 100;
          
          gradientBg.style.setProperty('--mouse-x', x + '%');
          gradientBg.style.setProperty('--mouse-y', y + '%');
          
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ========================================
     Additional Enhanced Animations (Batch 2)
     ======================================== */

  // 1. Typing Animation for Hero Tagline
  function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const phrases = JSON.parse(typingElement.dataset.phrases || '[]');
    if (phrases.length === 0) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before new phrase
      }

      setTimeout(type, typingSpeed);
    }

    // Start typing after short delay
    setTimeout(type, 1000);
  }

  // 2. Magnetic Button Effect
  function initMagneticButtons() {
    // Skip on mobile/touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
      button.classList.add('magnetic-button');
      const magneticArea = 50; // Pixels

      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < magneticArea + rect.width / 2) {
          const strength = Math.min(1, (magneticArea - distance) / magneticArea);
          const moveX = deltaX * strength * 0.3;
          const moveY = deltaY * strength * 0.3;
          
          button.style.transform = `translate(${moveX}px, ${moveY}px)`;
          button.classList.add('magnetic-active');
        }
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
        button.classList.remove('magnetic-active');
      });
    });
  }

  // 3. Scroll-Triggered Number Counter
  function initNumberCounters() {
    const counters = document.querySelectorAll('#yearsOfExperience, [data-counter]');
    
    const animateCounter = (element) => {
      const target = parseInt(element.textContent);
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      element.classList.add('counter-number', 'counting');
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target;
          element.classList.remove('counting');
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current);
        }
      }, duration / steps);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // 4. Floating Badge Animations
  function initFloatingBadges() {
    // Add to certification badges
    const badges = document.querySelectorAll('.certification-card, .badge-card');
    badges.forEach(badge => {
      badge.classList.add('floating-badge');
    });
  }

  // 5. Smooth Page Transitions
  function initPageTransitions() {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    overlay.innerHTML = `
      <div class="page-transition-content">
        <div class="page-transition-spinner"></div>
        <span>Loading...</span>
      </div>
    `;
    document.body.appendChild(overlay);

    // Trigger on internal navigation
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = link.getAttribute('href');
        if (target && target !== '#') {
          overlay.classList.add('active');
          
          setTimeout(() => {
            overlay.classList.remove('active');
          }, 500);
        }
      });
    });

    // Hide on page load
    window.addEventListener('load', () => {
      overlay.classList.remove('active');
    });
  }

  // 6. Interactive Skill Progress Bars
  function initSkillProgressBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Define skill levels (you can customize these)
    const skillLevels = {
      'Agentforce': 90,
      'OmniStudio': 85,
      'Salesforce LWC': 95,
      'Apex': 95,
      'SOQL': 90,
      'Salesforce Flows': 90,
      'Python': 85,
      'JavaScript': 90,
      'SQL': 85,
      'REST APIs': 90,
      'Data Migration': 95,
      'Integration': 90
    };

    skillCards.forEach(card => {
      const skillName = card.querySelector('strong')?.textContent?.trim();
      const level = skillLevels[skillName] || 80;

      // Create progress bar
      const progressBar = document.createElement('div');
      progressBar.className = 'skill-progress-bar';
      progressBar.innerHTML = `
        <div class="skill-progress-fill" data-progress="${level}"></div>
      `;
      
      card.appendChild(progressBar);
    });

    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector('.skill-progress-fill');
          if (fill) {
            const progress = fill.dataset.progress;
            setTimeout(() => {
              fill.style.width = progress + '%';
            }, 100);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillCards.forEach(card => observer.observe(card));
  }

  // 7. Mouse Trail Effect
  function initMouseTrail() {
    // Skip on mobile/touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const colors = ['trail-color-1', 'trail-color-2', 'trail-color-3', 'trail-color-4'];
    let colorIndex = 0;
    let lastTrailTime = 0;
    const trailInterval = 30; // ms between particles

    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastTrailTime < trailInterval) return;
      
      lastTrailTime = now;

      const particle = document.createElement('div');
      particle.className = `mouse-trail-particle ${colors[colorIndex]}`;
      particle.style.left = e.clientX + 'px';
      particle.style.top = e.clientY + 'px';
      
      document.body.appendChild(particle);

      // Remove after animation
      setTimeout(() => particle.remove(), 1000);

      colorIndex = (colorIndex + 1) % colors.length;
    });
  }

  /* ========================================
     Expose API for debugging (optional)
     ======================================== */
  if (typeof window !== 'undefined') {
    window.PortfolioAPI = {
      version: '2.0.0',
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
