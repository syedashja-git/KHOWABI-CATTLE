// ====================================
//  KHOWABI CATTELS — app.js
// ====================================

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
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
    const id   = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight)
        ? 'var(--gold-light)' : '';
    }
  });
});

// ============================================
//  CONTACT FORM — Pure JS + Formspree Fetch
//  No redirect! Popup on same page!
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault(); // ← Formspree redirect ROKTA hai

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(this);

    try {
      const response = await fetch('https://formspree.io/f/xaqajayr', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        // ✅ Success — show popup
        this.reset();
        showThankYouPopup();
      } else {
        alert('Kuch masla hua. Dobara koshish karein.');
      }
    } catch (err) {
      alert('Network error. Internet check karein.');
    }

    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  });
}

// ============================================
//  THANK YOU POPUP
// ============================================
function showThankYouPopup() {
  const existing = document.getElementById('ty-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'ty-overlay';
  overlay.innerHTML = `
    <div class="ty-popup">
      <img src="logo.png" alt="Khowabi Cattels" class="ty-logo" />
      <div class="ty-checkmark">✓</div>
      <h2 class="ty-title">Shukriya! 🙏</h2>
      <p class="ty-msg">
        Aapka message hamein mil gaya hai۔<br>
        Hum jald hi aapse <strong>rabta karenge</strong>۔
      </p>
      <p class="ty-sub">— Khowabi Cattels Team —</p>
      <button class="ty-close-btn" onclick="closeThankYou()">← Wapas Jayein</button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
  setTimeout(() => overlay.classList.add('visible'), 10);
}

function closeThankYou() {
  const overlay = document.getElementById('ty-overlay');
  if (overlay) {
    overlay.classList.remove('visible');
    setTimeout(() => overlay.remove(), 400);
    document.body.style.overflow = '';
  }
}

// --- Fade-in on scroll ---
const fadeEls = document.querySelectorAll(
  '.service-card, .cow-card, .about-text, .about-img-wrap, .contact-info, .contact-form'
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
  el.style.opacity   = '0';
  el.style.transform = 'translateY(30px)';
  observer.observe(el);
});
fadeEls.forEach(el => {
  el.addEventListener('animationend', () => {
    el.style.opacity   = '';
    el.style.transform = '';
  });
});

// --- Logo fallback ---
document.querySelectorAll('.logo-img').forEach(img => {
  img.addEventListener('error', () => img.classList.add('error'));
});

console.log('✅ Khowabi Cattels loaded!');