/**
 * PataSlot — auth.js
 * Drives login.html. No inline handlers — everything binds here.
 */

(function () {
  'use strict';

  const form = document.querySelector('[data-login-form]');
  if (!form) return;

  const emailField = form.querySelector('[data-field="email"]');
  const passwordField = form.querySelector('[data-field="password"]');
  const submitBtn = form.querySelector('[data-submit-btn]');
  const rememberInput = form.querySelector('[data-field="remember"]');

  function setFieldError(fieldEl, message) {
    const wrapper = fieldEl.closest('.field');
    wrapper.classList.toggle('is-invalid', Boolean(message));
    wrapper.classList.toggle('is-valid', !message);
    const errorEl = wrapper.querySelector('.field__error span');
    if (errorEl) errorEl.textContent = message || '';
  }

  function validate() {
    let valid = true;

    if (!Validators.isValidEmail(emailField.value)) {
      setFieldError(emailField, 'Enter a valid email address.');
      valid = false;
    } else {
      setFieldError(emailField, '');
    }

    if (!Validators.isRequired(passwordField.value)) {
      setFieldError(passwordField, 'Password is required.');
      valid = false;
    } else {
      setFieldError(passwordField, '');
    }

    return valid;
  }

  // Live-clear errors as the user types
  [emailField, passwordField].forEach((el) => {
    el.addEventListener('input', () => {
      if (el.closest('.field').classList.contains('is-invalid')) validate();
    });
  });

  // Password visibility toggle
  const toggleBtn = form.querySelector('[data-toggle-password]');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isPassword = passwordField.type === 'password';
      passwordField.type = isPassword ? 'text' : 'password';
      toggleBtn.innerHTML = isPassword
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  }

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.innerHTML = isLoading
      ? '<span class="spinner"></span> Signing in…'
      : '<i class="fa-solid fa-arrow-right-to-bracket"></i> Sign in';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const data = await Api.post('/auth/login', {
        email: emailField.value.trim(),
        password: passwordField.value,
      }, { skipAuth: true });

      Storage.set(Storage.KEYS.TOKEN, data.token);
      if (data.refreshToken) Storage.set(Storage.KEYS.REFRESH_TOKEN, data.refreshToken);
      if (data.user) Storage.set(Storage.KEYS.USER, data.user);
      if (data.businessId) Storage.set(Storage.KEYS.BUSINESS_ID, data.businessId);
      Storage.set(Storage.KEYS.REMEMBER_ME, Boolean(rememberInput && rememberInput.checked));

      Notify.success('Welcome back! Redirecting…');
      window.location.href = 'dashboard.html';
    } catch (err) {
      const message = err instanceof Api.ApiError
        ? err.message
        : 'Something went wrong. Please try again.';
      Notify.error(message);
      setLoading(false);
    }
  });
})();
