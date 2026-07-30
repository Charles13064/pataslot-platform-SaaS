/**
 * PataSlot — tabs.js
 * Any container with [data-tab-group] gets exclusive is-active toggling
 * across its direct children on click. Powers status filter chips,
 * category chips, list-view tabs, and List/Calendar-style toggles —
 * one implementation instead of one-off click handlers per page.
 */

(function () {
  'use strict';

  document.querySelectorAll('[data-tab-group]').forEach((group) => {
    const items = Array.from(group.children);
    items.forEach((item) => {
      item.addEventListener('click', () => {
        items.forEach((i) => i.classList.remove('is-active'));
        item.classList.add('is-active');
      });
    });
  });
})();
