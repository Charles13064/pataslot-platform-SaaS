/**
 * PataSlot — theme.js
 * Loaded as a normal blocking <script src> at the top of <head> (after the
 * CSS links) so the theme attribute is set before first paint — no flash,
 * and no inline <script> needed to achieve it.
 *
 * Any element with class="theme-toggle" on any page/device toggles theme;
 * the choice is shared across every open tab via the "storage" event.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'pataslot_theme';

  function getPreferredTheme() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Runs immediately — before body renders — to prevent a flash.
  applyTheme(getPreferredTheme());

  function wireToggles() {
    var current = document.documentElement.getAttribute('data-theme');
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(current === 'dark'));
      btn.addEventListener('click', function () {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* private mode */ }
        document.querySelectorAll('.theme-toggle').forEach(function (b) {
          b.setAttribute('aria-pressed', String(next === 'dark'));
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireToggles);
  } else {
    wireToggles();
  }

  // Keep other open tabs/devices in sync if the user flips theme in one.
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY && e.newValue) applyTheme(e.newValue);
  });
})();
