/**
 * PataSlot — storage.js
 * Thin wrapper around localStorage. Never store API secrets here —
 * onboarding.js sends Meta/WhatsApp/AI credentials straight to the API,
 * it does not persist them client-side beyond the active form session.
 */

const Storage = (function () {
  'use strict';

  const KEYS = {
    TOKEN: 'pataslot_token',
    REFRESH_TOKEN: 'pataslot_refresh_token',
    USER: 'pataslot_user',
    BUSINESS_ID: 'pataslot_business_id',
    THEME: 'pataslot_theme',
    LANGUAGE: 'pataslot_language',
    REMEMBER_ME: 'pataslot_remember_me',
  };

  function set(key, value) {
    try {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      return true;
    } catch (err) {
      console.error('Storage.set failed', err);
      return false;
    }
  }

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return fallback ?? null;
      try {
        return JSON.parse(raw);
      } catch {
        return raw; // plain string value
      }
    } catch (err) {
      console.error('Storage.get failed', err);
      return fallback ?? null;
    }
  }

  function remove(key) {
    localStorage.removeItem(key);
  }

  function clearSession() {
    [KEYS.TOKEN, KEYS.REFRESH_TOKEN, KEYS.USER, KEYS.BUSINESS_ID].forEach(remove);
  }

  return { KEYS, set, get, remove, clearSession };
})();
