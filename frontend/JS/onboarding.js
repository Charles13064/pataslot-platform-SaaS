/**
 * PataSlot — onboarding.js
 * Drives the multi-step wizard on register.html.
 */

(function () {
  'use strict';

  const wizard = document.querySelector('[data-wizard]');
  if (!wizard) return;

  const panels = Array.from(wizard.querySelectorAll('.wizard-panel'));
  const progressSteps = Array.from(document.querySelectorAll('[data-progress-step]'));
  const nextBtns = wizard.querySelectorAll('[data-wizard-next]');
  const prevBtns = wizard.querySelectorAll('[data-wizard-prev]');
  const submitBtn = wizard.querySelector('[data-wizard-submit]');
  let current = 0;

  /* ---------------------------------------------------------------------
   * Field error helper (shared shape with auth.js)
   * ------------------------------------------------------------------- */
  function setFieldError(fieldEl, message) {
    const wrapper = fieldEl.closest('.field');
    if (!wrapper) return;
    wrapper.classList.toggle('is-invalid', Boolean(message));
    wrapper.classList.toggle('is-valid', !message);
    const errorEl = wrapper.querySelector('.field__error span');
    if (errorEl) errorEl.textContent = message || '';
  }

  /* ---------------------------------------------------------------------
   * Per-step validation rules — keyed by panel index
   * ------------------------------------------------------------------- */
  function validateStep(index) {
    const panel = panels[index];
    let valid = true;

    panel.querySelectorAll('[data-required]').forEach((field) => {
      if (!Validators.isRequired(field.value)) {
        setFieldError(field, 'This field is required.');
        valid = false;
      } else {
        setFieldError(field, '');
      }
    });

    panel.querySelectorAll('[data-validate="email"]').forEach((field) => {
      if (field.value && !Validators.isValidEmail(field.value)) {
        setFieldError(field, 'Enter a valid email address.');
        valid = false;
      }
    });

    panel.querySelectorAll('[data-validate="phone"]').forEach((field) => {
      if (field.value && !Validators.isValidPhone(field.value)) {
        setFieldError(field, 'Enter a valid Kenyan phone number.');
        valid = false;
      }
    });

    panel.querySelectorAll('[data-validate="url"]').forEach((field) => {
      if (field.value && !Validators.isValidUrl(field.value)) {
        setFieldError(field, 'Enter a valid URL.');
        valid = false;
      }
    });

    const pwField = panel.querySelector('[data-field="password"]');
    const pwConfirmField = panel.querySelector('[data-field="password_confirm"]');
    if (pwField) {
      const strength = Validators.passwordStrength(pwField.value);
      if (strength.score < 2) {
        setFieldError(pwField, 'Choose a stronger password.');
        valid = false;
      } else {
        setFieldError(pwField, '');
      }
    }
    if (pwField && pwConfirmField) {
      if (!Validators.passwordsMatch(pwField.value, pwConfirmField.value)) {
        setFieldError(pwConfirmField, 'Passwords do not match.');
        valid = false;
      } else {
        setFieldError(pwConfirmField, '');
      }
    }

    const termsBox = panel.querySelector('[data-field="terms"]');
    if (termsBox && !termsBox.checked) {
      Notify.error('Please accept the Terms of Service to continue.');
      valid = false;
    }

    return valid;
  }

  /* ---------------------------------------------------------------------
   * Step display + progress bar
   * ------------------------------------------------------------------- */
  function goToStep(index) {
    panels.forEach((panel, i) => panel.classList.toggle('is-active', i === index));

    progressSteps.forEach((stepEl, i) => {
      stepEl.classList.toggle('is-active', i === index);
      stepEl.classList.toggle('is-complete', i < index);
    });

    if (index === panels.length - 1) populateReview();

    wizard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    current = index;
  }

  nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!validateStep(current)) return;
      if (current < panels.length - 1) goToStep(current + 1);
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (current > 0) goToStep(current - 1);
    });
  });

  // Allow jumping back to a completed step via the progress dots
  progressSteps.forEach((stepEl, i) => {
    stepEl.addEventListener('click', () => {
      if (stepEl.classList.contains('is-complete')) goToStep(i);
    });
  });

  /* ---------------------------------------------------------------------
   * Password strength meter (live)
   * ------------------------------------------------------------------- */
  const pwInput = wizard.querySelector('[data-field="password"]');
  const pwMeter = wizard.querySelector('[data-pw-meter]');
  const pwLabel = wizard.querySelector('[data-pw-label]');
  if (pwInput && pwMeter) {
    pwInput.addEventListener('input', () => {
      const { score, label } = Validators.passwordStrength(pwInput.value);
      pwMeter.dataset.strength = String(score);
      if (pwLabel) pwLabel.textContent = label;
    });
  }

  /* ---------------------------------------------------------------------
   * Logo dropzone
   * ------------------------------------------------------------------- */
  const dropzone = wizard.querySelector('[data-dropzone]');
  if (dropzone) {
    const input = dropzone.querySelector('input[type="file"]');
    const thumb = dropzone.querySelector('[data-dropzone-thumb]');
    const filename = dropzone.querySelector('[data-dropzone-filename]');
    const removeBtn = dropzone.querySelector('[data-dropzone-remove]');

    const showFile = (file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        thumb.src = e.target.result;
        filename.textContent = file.name;
        dropzone.classList.add('has-file');
      };
      reader.readAsDataURL(file);
    };

    dropzone.addEventListener('click', (e) => {
      if (e.target !== removeBtn && !removeBtn?.contains(e.target)) input.click();
    });
    input.addEventListener('change', () => showFile(input.files[0]));

    ['dragover', 'dragenter'].forEach((evt) =>
      dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add('is-dragover'); })
    );
    ['dragleave', 'drop'].forEach((evt) =>
      dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.remove('is-dragover'); })
    );
    dropzone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (file) { input.files = e.dataTransfer.files; showFile(file); }
    });

    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        input.value = '';
        dropzone.classList.remove('has-file');
      });
    }
  }

  /* ---------------------------------------------------------------------
   * Plan selection cards
   * ------------------------------------------------------------------- */
  wizard.querySelectorAll('[data-plan-card]').forEach((card) => {
    card.addEventListener('click', () => {
      wizard.querySelectorAll('[data-plan-card]').forEach((c) => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      card.querySelector('input[type="radio"]').checked = true;
    });
  });

  /* ---------------------------------------------------------------------
   * Review step summary
   * ------------------------------------------------------------------- */
  function populateReview() {
    const map = {
      review_business_name: 'business_name',
      review_owner_name: 'owner_name',
      review_email: 'business_email',
      review_whatsapp: 'whatsapp_number',
      review_location: 'city',
      review_plan: null, // handled separately
    };
    Object.entries(map).forEach(([targetName, sourceName]) => {
      if (!sourceName) return;
      const target = wizard.querySelector(`[data-review="${targetName}"]`);
      const source = wizard.querySelector(`[name="${sourceName}"]`);
      if (target && source) target.textContent = source.value || '—';
    });

    const selectedPlan = wizard.querySelector('[data-plan-card].is-selected h3');
    const planTarget = wizard.querySelector('[data-review="review_plan"]');
    if (planTarget) planTarget.textContent = selectedPlan ? selectedPlan.textContent : '—';
  }

  /* ---------------------------------------------------------------------
   * Final submit
   * ------------------------------------------------------------------- */
  const form = wizard.querySelector('form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateStep(current)) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Creating your account…';

      try {
        // Uses FormData directly (not Api.post) because the logo file
        // needs multipart/form-data rather than JSON.
        const formData = new FormData(form);
        const res = await fetch('/api/v1/auth/register', { method: 'POST', body: formData });
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error((data && data.message) || 'Registration failed.');

        Notify.success('Account created! Check your email to verify.');
        window.location.href = 'verify-email.html';
      } catch (err) {
        Notify.error(err.message || 'Something went wrong. Please try again.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-rocket"></i> Create my account';
      }
    });
  }

  goToStep(0);
})();
