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
    setTimeout(() => {
      details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  } else {
    button.querySelector('span:first-child').textContent = 'Learn More';
  }
}

// Form handling with Formspree
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = this;
  const submitButton = form.querySelector('.submit-btn');
  const originalText = submitButton.textContent;
  const formSuccess = document.getElementById('form-success');
  
  // Show loading state
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      // Show success message
      form.style.display = 'none';
      formSuccess.style.display = 'block';
      
      // Scroll to success message
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Track in analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submission', {
          'event_category': 'Contact',
          'event_label': 'Contact Form'
        });
      }
      
      // Reset form after 5 seconds
      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        formSuccess.style.display = 'none';
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 5000);
      
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    // Show error message but KEEP FORM VISIBLE
    alert('There was a problem submitting your form. Please email us directly at info@neuverrax.com');
    
    // Reset button state
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    
    // IMPORTANT: Keep form visible
    form.style.display = 'block';
    formSuccess.style.display = 'none';
  }
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