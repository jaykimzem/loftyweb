/**
 * LOFTY SERVICES & CONSULTANTS LTD
 * Elite GSAP & Tactical Interaction Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Loading Screen Animation
  initLoader();

  // 2. Navigation Header & Scroll Detection
  initNavigation();

  // 3. Mobile Navigation Drawer
  initMobileNav();

  // 4. Back To Top Controller
  initBackToTop();

  // 5. GSAP Hero & ScrollTrigger Orchestration
  initGSAPAnimations();

  // 6. Interactive Category Filter (Services Spectrum)
  initCategoryFilter();

  // 7. Interactive Security Coverage Calculator
  initSecurityCalculator();

  // 8. Contact & Quote Consultation Form
  initContactForm();

  // 9. Smooth Anchor Scrolling
  initSmoothScroll();
});

/* ==========================================================================
   1. LOADER CONTROLLER
   ========================================================================== */
function initLoader() {
  const loader = document.getElementById('loading-screen');
  const hero = document.querySelector('.hero');
  if (!loader) return;

  const minLoadTime = 1300;
  const startTime = Date.now();

  const dismissLoader = () => {
    loader.classList.add('fade-out');
    if (hero) hero.classList.add('loaded');
    
    // Trigger GSAP hero timeline right after loader dismiss
    if (window.playHeroTimeline) {
      window.playHeroTimeline();
    }

    setTimeout(() => {
      loader.style.display = 'none';
    }, 750);
  };

  window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minLoadTime - elapsed);
    setTimeout(dismissLoader, remaining);
  });

  // Safety fallback
  setTimeout(() => {
    if (!loader.classList.contains('fade-out')) {
      dismissLoader();
    }
  }, 3200);
}

/* ==========================================================================
   2. NAVIGATION HEADER BEHAVIOR
   ========================================================================== */
function initNavigation() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggleBtn || !mobileNav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   4. BACK TO TOP CONTROLLER
   ========================================================================== */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backBtn.classList.add('visible');
    } else {
      backBtn.classList.remove('visible');
    }
  }, { passive: true });

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   5. GSAP & SCROLLTRIGGER ANIMATIONS
   ========================================================================== */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded. Running fallback styles.');
    return;
  }

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // A. Hero Master Timeline
  window.playHeroTimeline = () => {
    const heroTL = gsap.timeline();

    heroTL.from('.hero-eyebrow', {
      y: -25,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-title', {
      y: 35,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-subtitle', {
      y: 25,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    }, '-=0.6')
    .from('.hero-actions .btn', {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power2.out'
    }, '-=0.5')
    .from('.stat-item', {
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.8,
      ease: 'back.out(1.4)'
    }, '-=0.4');
  };

  // If hero is already loaded before this runs
  const hero = document.querySelector('.hero');
  if (hero && hero.classList.contains('loaded')) {
    window.playHeroTimeline();
  }

  // B. ScrollTrigger Batch Animations for Sections
  if (typeof ScrollTrigger !== 'undefined') {
    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // Service Cards
    const serviceCards = gsap.utils.toArray('.service-card');
    if (serviceCards.length) {
      ScrollTrigger.batch(serviceCards, {
        start: 'top 85%',
        onEnter: batch => {
          gsap.from(batch, {
            y: 50,
            opacity: 0,
            scale: 0.96,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power2.out',
            overwrite: true
          });
        }
      });
    }

    // 4 Pillars Grid
    const pillarItems = gsap.utils.toArray('.pillar-item');
    if (pillarItems.length) {
      ScrollTrigger.batch(pillarItems, {
        start: 'top 85%',
        onEnter: batch => {
          gsap.from(batch, {
            y: 40,
            opacity: 0,
            stagger: 0.14,
            duration: 0.75,
            ease: 'power3.out',
            overwrite: true
          });
        }
      });
    }

    // Sector Cards
    const sectorCards = gsap.utils.toArray('#sectors .card');
    if (sectorCards.length) {
      ScrollTrigger.batch(sectorCards, {
        start: 'top 85%',
        onEnter: batch => {
          gsap.from(batch, {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power2.out',
            overwrite: true
          });
        }
      });
    }

    // Calculator Card
    const calcCard = document.querySelector('.calculator-card');
    if (calcCard) {
      gsap.from(calcCard, {
        scrollTrigger: {
          trigger: calcCard,
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    // Split Section Image & Content
    const splitImg = document.querySelector('.split-image');
    const splitContent = document.querySelector('.split-content');
    if (splitImg && splitContent) {
      gsap.from(splitImg, {
        scrollTrigger: {
          trigger: '.split-section',
          start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out'
      });
      gsap.from(splitContent.children, {
        scrollTrigger: {
          trigger: '.split-section',
          start: 'top 80%'
        },
        x: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }

  // C. Magnetic Buttons Micro-Interaction
  const buttons = document.querySelectorAll('.btn-primary, .btn-cta-dark');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)'
      });
    });
  });
}

/* ==========================================================================
   6. INTERACTIVE CATEGORY FILTER (Service Spectrum)
   ========================================================================== */
function initCategoryFilter() {
  const filterBtns = document.querySelectorAll('.cat-btn');
  const cards = document.querySelectorAll('.service-card[data-category]');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const isMatch = (filterVal === 'all' || cat === filterVal);

        if (typeof gsap !== 'undefined') {
          if (isMatch) {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: 'power2.out',
              onStart: () => { card.style.display = 'flex'; }
            });
          } else {
            gsap.to(card, {
              opacity: 0,
              scale: 0.92,
              duration: 0.3,
              ease: 'power2.in',
              onComplete: () => { card.style.display = 'none'; }
            });
          }
        } else {
          card.style.display = isMatch ? 'flex' : 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. SECURITY COVERAGE CALCULATOR
   ========================================================================== */
function initSecurityCalculator() {
  const propType = document.getElementById('calc-prop-type');
  const propScale = document.getElementById('calc-prop-scale');
  const threatLevel = document.getElementById('calc-threat-level');

  const guardsCountEl = document.getElementById('calc-res-guards');
  const patrolFreqEl = document.getElementById('calc-res-patrols');
  const responseTimeEl = document.getElementById('calc-res-response');
  const techPkgEl = document.getElementById('calc-res-tech');
  const applyBtn = document.getElementById('calc-apply-quote');

  const updateCalculator = () => {
    const type = propType ? propType.value : 'commercial';
    const scale = propScale ? parseInt(propScale.value, 10) : 2;
    const threat = threatLevel ? threatLevel.value : 'medium';

    let guards = 2;
    let patrols = '2x Daily Supervisory Sweeps';
    let response = '< 7 Mins Tactical Arrival';
    let tech = 'CCTV Integration & Access Logging';

    switch (type) {
      case 'commercial':
        guards = scale * 2;
        tech = 'AI CCTV Perimeter + Turnstile Biometrics + Fire Marshalling';
        break;
      case 'residential':
        guards = Math.max(2, Math.round(scale * 1.5));
        tech = 'Electric Fence Alarm Link + Resident QR Passes + Night K-9 Patrol';
        break;
      case 'retail':
        guards = scale * 3;
        tech = 'Anti-Shoplifting EAS Gate + Covert Floor Detectives + Till Audit';
        break;
      case 'industrial':
        guards = scale * 2 + 2;
        tech = 'Thermal Long-Range Cameras + Weighbridge Audit + Canine Unit';
        break;
      case 'vip':
        guards = scale * 2;
        tech = 'Armored Convoy Escort + Threat Advance Reconnaissance + 24/7 Close Escort';
        response = '< 3 Mins Immediate Tactical';
        break;
      case 'event':
        guards = scale * 4;
        tech = 'Metal Detector Arches + Bag X-Ray + Rapid Crowd Dispersal Team';
        response = 'Dedicated On-Site Tactical Team';
        break;
    }

    if (threat === 'high') {
      guards += 2;
      patrols = '4x Daily + 24/7 Dedicated Patrol Unit';
      response = '< 5 Mins Armed Backup';
    } else if (threat === 'critical') {
      guards += 4;
      patrols = 'Continuous Armed Patrol Unit';
      response = '< 3 Mins SOC Direct Dispatch';
    } else {
      patrols = '3x Daily Guard Shift Inspections';
    }

    if (guardsCountEl) guardsCountEl.textContent = `${guards} Officers`;
    if (patrolFreqEl) patrolFreqEl.textContent = patrols;
    if (responseTimeEl) responseTimeEl.textContent = response;
    if (techPkgEl) techPkgEl.textContent = tech;

    // GSAP Pulse Highlight
    if (typeof gsap !== 'undefined') {
      gsap.fromTo([guardsCountEl, responseTimeEl], 
        { scale: 1.15, color: '#FFFFFF' },
        { scale: 1, color: '#F3CA40', duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  if (propType) propType.addEventListener('change', updateCalculator);
  if (propScale) propScale.addEventListener('input', updateCalculator);
  if (threatLevel) threatLevel.addEventListener('change', updateCalculator);

  updateCalculator();

  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const quoteServiceSelect = document.getElementById('service-select');
      const quoteNotes = document.getElementById('form-message');
      const contactSection = document.getElementById('contact');

      if (quoteServiceSelect && propType) {
        const map = {
          commercial: 'static-guarding',
          residential: 'static-guarding',
          retail: 'retail-security',
          industrial: 'mobile-patrol',
          vip: 'vip-protection',
          event: 'event-security'
        };
        quoteServiceSelect.value = map[propType.value] || 'static-guarding';
      }

      if (quoteNotes && guardsCountEl) {
        quoteNotes.value = `[Calculator Estimate]: Recommended ${guardsCountEl.textContent}, ${patrolFreqEl.textContent}, Response Profile: ${responseTimeEl.textContent}.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

/* ==========================================================================
   8. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const successBlock = document.getElementById('form-success-box');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Transmitting to Command...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }

      if (successBlock) {
        form.style.display = 'none';
        successBlock.classList.add('show');
        if (typeof gsap !== 'undefined') {
          gsap.from(successBlock, { scale: 0.9, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' });
        }
        successBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        alert('Assessment dispatched! Our duty commander will contact you shortly.');
        form.reset();
      }
    }, 1100);
  });
}

/* ==========================================================================
   9. SMOOTH ANCHOR SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = 70;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
}
