// ====================================
//  KHOWABI CATTELS — script.js
// ====================================

// --- Show More Cows ---
function showMoreCows() {
  const hidden = document.querySelectorAll('.hidden-cow');
  hidden.forEach((card, i) => {
    setTimeout(() => {
      card.style.display = 'flex';
      card.style.animation = 'fadeUp 0.6s ease both';
    }, i * 120);
  });
  // Hide the button after click
  document.getElementById('exploreBtnWrap').style.display = 'none';
}

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--gold-light)';
      } else {
        link.style.color = '';
      }
    }
  });
});

// --- Contact form submit ---
function handleSubmit(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  e.target.reset();
  setTimeout(() => { success.style.display = 'none'; }, 5000);
}

// --- Fade-in on scroll (Intersection Observer) ---
const fadeEls = document.querySelectorAll(
  '.breed-card, .service-card, .gallery-item, .about-text, .about-img-wrap, .contact-info, .contact-form'
);
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeUp 0.7s ease both';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  observer.observe(el);
});

// When animation fires, reset inline style so CSS takes over
fadeEls.forEach(el => {
  el.addEventListener('animationend', () => {
    el.style.opacity   = '';
    el.style.transform = '';
  });
});

// --- Logo fallback error handler ---
document.querySelectorAll('.logo-img').forEach(img => {
  img.addEventListener('error', () => img.classList.add('error'));
});

console.log('✅ Khowabi Cattels website loaded successfully!');