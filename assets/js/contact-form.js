/**
 * DREAM PEAK - Contact Form Validation & Submission
 */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('dreamPeakContactForm');
  const successBanner = document.getElementById('formSuccessBanner');

  if (!contactForm) return;

  const fields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    service: document.getElementById('service'),
    message: document.getElementById('message')
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  }

  function setValid(field) {
    field.classList.remove('is-invalid');
  }

  function setInvalid(field) {
    field.classList.add('is-invalid');
  }

  // Real-time input cleaning
  Object.values(fields).forEach(field => {
    if (!field) return;
    field.addEventListener('input', () => {
      if (field.classList.contains('is-invalid')) {
        setValid(field);
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate Name
    if (!fields.name || fields.name.value.trim().length < 2) {
      setInvalid(fields.name);
      isValid = false;
    } else {
      setValid(fields.name);
    }

    // Validate Email
    if (!fields.email || !validateEmail(fields.email.value.trim())) {
      setInvalid(fields.email);
      isValid = false;
    } else {
      setValid(fields.email);
    }

    // Validate Phone
    if (!fields.phone || !validatePhone(fields.phone.value.trim())) {
      setInvalid(fields.phone);
      isValid = false;
    } else {
      setValid(fields.phone);
    }

    // Validate Service
    if (!fields.service || fields.service.value === '') {
      setInvalid(fields.service);
      isValid = false;
    } else {
      setValid(fields.service);
    }

    // Validate Message
    if (!fields.message || fields.message.value.trim().length < 10) {
      setInvalid(fields.message);
      isValid = false;
    } else {
      setValid(fields.message);
    }

    if (!isValid) {
      const firstInvalid = contactForm.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Submission UI
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="spinner" viewBox="0 0 50 50" style="width:20px;height:20px;animation:spin 1s linear infinite;">
        <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4"></circle>
      </svg>
      Submitting Project Details...
    `;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (successBanner) {
        successBanner.style.display = 'block';
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
          successBanner.style.display = 'none';
        }, 7000);
      } else {
        alert('Thank you! Your message and project details have been successfully received. Dream Peak\'s project team will contact you shortly.');
      }
    }, 1200);
  });
});
