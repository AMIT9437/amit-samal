// -------------------- Mobile Navigation Toggle --------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// -------------------- Smooth scrolling for anchor links --------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// -------------------- Service Card Animations --------------------
const serviceCards = document.querySelectorAll('.service-card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// -------------------- Counter Animation --------------------
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
});

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// -------------------- Back to Top Button --------------------
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #d84336;
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.transform = 'scale(1.1)';
    backToTopBtn.style.background = '#c0392b';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.transform = 'scale(1)';
    backToTopBtn.style.background = '#d84336';
});

// -------------------- Contact Cards Animation --------------------
const contactCards = document.querySelectorAll('.contact-card');
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            contactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

contactCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    contactObserver.observe(card);
});
// PART 3 — Reveal + Hover Glow + Mobile menu improvements

// 1) IntersectionObserver: add .in-view to .reveal elements (staggered)
(function(){
  const reveals = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || reveals.length === 0){
    // fallback: add in-view on load
    reveals.forEach((el, i) => {
      setTimeout(()=> el.classList.add('in-view'), i * 120);
    });
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        // optionally unobserve to avoid repeated triggers
        obs.unobserve(entry.target);
      }
    });
  }, {root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.12});

  reveals.forEach((el) => io.observe(el));
})();


// 2) Mobile hamburger behaviour: close menu when a nav link is clicked
(function(){
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if(hamburger && navMenu){
    // toggle already present from earlier code — ensure links close menu
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if(window.getComputedStyle(hamburger).display !== 'none'){
          // mobile — hide menu & reset hamburger
          navMenu.style.display = '';
          hamburger.classList.remove('active');
        }
      });
    });
  }
})();


// 3) Optional subtle hero parallax (very light)
(function(){
  const hero = document.querySelector('.about-hero');
  if(!hero) return;
  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    // small translate for subtle depth
    hero.style.transform = `translateY(${sc * 0.02}px)`;
  }, {passive:true});
})();


// 4) Add small hover glow for neon cards on pointer devices
(function(){
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  if(!supportsHover) return;
  document.querySelectorAll('.neon-card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('neon-hover'));
    card.addEventListener('mouseleave', () => card.classList.remove('neon-hover'));
  });
})();
