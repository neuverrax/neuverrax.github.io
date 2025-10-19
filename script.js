// NeuverraX Website JavaScript

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Fade in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Product expand/collapse functionality
function toggleProduct(productId) {
  const details = document.getElementById(productId + '-details');
  const button = event.target.closest('.expand-btn');
  const allDetails = document.querySelectorAll('.product-details');
  const allButtons = document.querySelectorAll('.expand-btn');
  
  // Close all other products
  allDetails.forEach(detail => {
    if (detail.id !== productId + '-details') {
      detail.classList.remove('expanded');
    }
  });
  
  allButtons.forEach(btn => {
    if (btn !== button) {
      btn.classList.remove('expanded');
      btn.querySelector('span:first-child').textContent = 'Learn More';
    }
  });
  
  // Toggle current product
  details.classList.toggle('expanded');
  button.classList.toggle('expanded');
  
  if (details.classList.contains('expanded')) {
    button.querySelector('span:first-child').textContent = 'Show Less';
    // Smooth scroll to product details
    setTimeout(() => {
      details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  } else {
    button.querySelector('span:first-child').textContent = 'Learn More';
  }
}

// Form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  // Log form data (in production, send to backend/email service)
  console.log('Form submission:', data);
  console.log('Role:', data.role);
  console.log('Interest:', data.interest);
  console.log('Message:', data.message);
  
  // Show success message
  alert('Thank you for your interest! We will contact you within 24 hours.\n\nFor immediate assistance, email us at info@neuverrax.com');
  
  // Reset form
  this.reset();
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a, footer a, a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});