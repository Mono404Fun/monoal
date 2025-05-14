document.addEventListener('DOMContentLoaded', () => {
  initComponents();
});
function initComponents() {
  initPreloader();
  initSmoothScrolling();
  initScrollBehavior();
  initCursor();
  initThemeSwitcher();
  initMobileMenu();
  initScrollReveal();
  initParticles();
  initBackToTop();
  initContactForm();
  initSkillProgress();
  initStatsCounter();
  initBackgroundEffects();
}
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  const progressBar = document.querySelector('.preloader-progress__bar');
  const progressText = document.querySelector('.progress__text');

  if (!preloader) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 5) + 1;
    if (progress > 100) progress = 100;

    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;

    if (progress === 100) {
      clearInterval(interval);
      setTimeout(() => {
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'auto';
            AOS.init({
              duration: 800,
              easing: 'ease-in-out-quad',
              mirror: false,
              anchorPlacement: 'top-bottom',
            });
            setTimeout(() => AOS.refresh(), 100);
          }
        });
      }, 1500);
    }
  }, 50);
}
// function initPreloader() {
//   const preloader = document.querySelector('.preloader');
//   const progressBar = document.querySelector('.preloader-progress__bar');
//   const progressText = document.querySelector('.progress__text');
//
//   if (!preloader) return;
//
//   const calculateLoadProgress = () => {
//     const resources = window.performance.getEntriesByType("resource");
//     let loadedCount = 0;
//     let totalCount = 0;
//
//     resources.forEach(resource => {
//       if (resource.initiatorType !== 'beacon' &&
//           resource.initiatorType !== 'xmlhttprequest') {
//         totalCount++;
//         if (resource.duration > 0) loadedCount++;
//       }
//     });
//
//     const domReady = document.readyState === 'complete' ? 1 : 0.3;
//     const totalProgress = (loadedCount / Math.max(1, totalCount) * 0.7) + (domReady * 0.3);
//
//     return Math.min(Math.floor(totalProgress * 100), 100);
//   };
//
//   const updateProgress = () => {
//     const progress = calculateLoadProgress();
//     progressBar.style.width = `${progress}%`;
//     progressText.textContent = `${progress}%`;
//
//     gsap.to(progressBar, {
//       width: `${progress}%`,
//       duration: 0.5,
//       ease: 'power2.out'
//     });
//
//   if (progress >= 100) {
//     setTimeout(() => {
//       gsap.to(preloader, {
//         opacity: 0,
//         duration: 0.5,
//         ease: 'power2.in',
//         onComplete: () => {
//           preloader.style.display = 'none';
//           document.body.style.overflow = 'visible';
//
//           document.dispatchEvent(new Event('pageLoaded'));
//         }
//       });
//     }, 2000);
//     return true;
//   }
//     return false;
//   };
//
//   const initialInterval = setInterval(() => {
//     if (updateProgress()) {
//       clearInterval(initialInterval);
//     }
//   }, 50);
//
//   setTimeout(() => {
//     clearInterval(initialInterval);
//     progressBar.style.width = '100%';
//     progressText.textContent = '100%';
//
//     gsap.to(preloader, {
//       opacity: 0,
//       duration: 0.5,
//       onComplete: () => {
//         preloader.style.display = 'none';
//         document.body.style.overflow = 'visible';
//       }
//     });
//   }, 4000);
//
//   window.addEventListener('load', () => {
//     clearInterval(initialInterval);
//     updateProgress();
//   });
// }
function initBackgroundEffects () {
    const radiantOverlay = document.createElement('div');
    radiantOverlay.className = 'radiant-overlay';
    radiantOverlay.style.position = 'fixed';
    radiantOverlay.style.top = '0';
    radiantOverlay.style.left = '0';
    radiantOverlay.style.width = '100%';
    radiantOverlay.style.height = '100%';

    radiantOverlay.style.background = 'radial-gradient(circle at center, transparent 0%, rgba(106, 52, 255, 0.08) 100%)';
    radiantOverlay.style.zIndex = '-1';
    radiantOverlay.style.pointerEvents = 'none';
    document.body.appendChild(radiantOverlay);

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.position = 'relative';
        heroSection.style.overflow = 'hidden';

        const heroGradient = document.createElement('div');
        heroGradient.className = 'hero-gradient';
        heroGradient.style.position = 'absolute';
        heroGradient.style.top = '0';
        heroGradient.style.left = '0';
        heroGradient.style.width = '100%';
        heroGradient.style.height = '100%';
        heroGradient.style.background = 'radial-gradient(circle at 70% 50%, rgba(106, 52, 255, 1.5) 0%, transparent 70%)';
        heroGradient.style.zIndex = '-1';
        heroGradient.style.pointerEvents = 'none';
        heroGradient.style.animation = 'pulse 8s ease-in-out infinite alternate';
        heroSection.appendChild(heroGradient);
    }
}
function initCursor() {
  const cursorNormal = document.querySelector('.cursor--normal');
  const cursorHover = document.querySelector('.cursor--hover');
  const cursorActive = document.querySelector('.cursor--active');
  const hoverElements = document.querySelectorAll('[data-cursor-hover]');

  if (!cursorNormal) return;

  const moveCursor = (e) => {
    cursorNormal.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorHover.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorActive.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  };

  document.addEventListener('mousemove', moveCursor);

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorNormal.style.opacity = '0';
      cursorHover.style.opacity = '1';
    });

    el.addEventListener('mouseleave', () => {
      cursorNormal.style.opacity = '1';
      cursorHover.style.opacity = '0';
      cursorActive.style.opacity = '0';
    });

    el.addEventListener('mousedown', () => {
      cursorHover.style.opacity = '0';
      cursorActive.style.opacity = '1';
    });

    el.addEventListener('mouseup', () => {
      cursorActive.style.opacity = '0';
      cursorHover.style.opacity = '1';
    });
  });
}
function initThemeSwitcher() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;

  if (!themeToggle) return;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
function initMobileMenu() {
  const menuToggle = document.querySelector('.toggle-menu');
  const nav = document.querySelector('.header__nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
  });
}
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}
function initScrollReveal() {
  const animateElements = document.querySelectorAll('.animate__animated');

  if (!animateElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animationClass = entry.target.dataset.animation || 'animate__fadeInUp';
        entry.target.classList.add(animationClass);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(element => observer.observe(element));
}
function initScrollBehavior () {
    const header = document.querySelector('.main-header');
    let lastScrollPosition = window.pageYOffset;
    let ticking = false;

    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.pageYOffset;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll(header, lastScrollPosition, currentScrollPosition);
                lastScrollPosition = currentScrollPosition;
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener('scroll', () => {
        if (window.pageYOffset === 0) {
            header.classList.remove('scroll-down');
        }
    });
}

function handleScroll (header, lastScroll, currentScroll) {
    if (lastScroll > currentScroll) {
        header.classList.remove('scroll-down');
        if (currentScroll > 50) {
            header.classList.add('scroll-up');
            header.classList.add('header-glow');
        } else {
            header.classList.remove('scroll-up');
            header.classList.remove('header-glow');
        }
    } else {
        if (currentScroll > 100) {
            header.classList.add('scroll-down');
        }
    }
}
function initParticles() {
  if (typeof particlesJS !== 'function') return;

  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#6a34ff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: true,
        animation: { enable: true, speed: 1, opacity_min: 0.1 }
      },
      size: {
        value: 3,
        random: true,
        animation: { enable: true, speed: 2, size_min: 0.1 }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#6a34ff",
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: false },
        resize: true
      },
      modes: { repulse: { distance: 100, duration: 0.4 } }
    },
    retina_detect: true
  });
}
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');

  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 300);
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
function initContactForm() {
  const contactForm = document.querySelector('.contact__form');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="bx bx-check"></i> Sent!';
      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 1500);
  });

  document.querySelectorAll('.floating input, .floating textarea').forEach(input => {
    input.addEventListener('focus', () => {
      input.previousElementSibling.classList.add('active');
      input.nextElementSibling.style.width = '100%';
    });

    input.addEventListener('blur', () => {
      if (!input.value) input.previousElementSibling.classList.remove('active');
      input.nextElementSibling.style.width = '0';
    });
  });
}
function initSkillProgress() {
  const skillItems = document.querySelectorAll('.skill__item');

  if (!skillItems.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target.querySelector('.progress__bar');
        progressBar.style.width = `${entry.target.dataset.percent}%`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  skillItems.forEach(item => observer.observe(item));
}
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat__number');

  if (!statNumbers.length) return;

  statNumbers.forEach(stat => {
    const target = +stat.dataset.count;
    const increment = target / 30;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        stat.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.unobserve(stat);
      }
    });

    observer.observe(stat);
  });
}
