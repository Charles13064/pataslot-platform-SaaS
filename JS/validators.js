/**
 * PataSlot — validators.js
 * Pure, reusable validation functions. No DOM access here — auth.js and
 * onboarding.js call these and apply the result to the DOM themselves.
 */

const Validators = (function () {
  'use strict';

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_RE = /^(\+?254|0)[17]\d{8}$/; // Kenyan mobile format
  const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;

  function isRequired(value) {
    return typeof value === 'string' ? value.trim().length > 0 : Boolean(value);
  }

  function isValidEmail(value) {
    return EMAIL_RE.test(String(value).trim());
  }

  function isValidPhone(value) {
    return PHONE_RE.test(String(value).trim().replace(/\s+/g, ''));
  }

  function isValidUrl(value) {
    if (!value) return true; // optional fields
    return URL_RE.test(String(value).trim());
  }

  function minLength(value, len) {
    return String(value || '').trim().length >= len;
  }

  /**
   * Scores a password 0–4 and returns a label + score.
   * Not a substitute for server-side strength checks.
   */
  function passwordStrength(value) {
    const v = String(value || '');
    let score = 0;
    if (v.length >= 8) score++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
    if (/\d/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;

    const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
    return { score, label: v.length === 0 ? '' : labels[score] };
  }

  function passwordsMatch(a, b) {
    return a === b && a.length > 0;
  }

  return {
    isRequired,
    isValidEmail,
    isValidPhone,
    isValidUrl,
    minLength,
    passwordStrength,
    passwordsMatch,
  };
})();
