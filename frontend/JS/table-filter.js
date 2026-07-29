/**
 * PataSlot — table-filter.js
 * Wires any input[data-filter-input] to hide/show rows in the element it
 * points to via data-filter-target, matching on data-filter-row text.
 * One implementation shared by contacts.html, products.html,
 * admin-businesses.html — nobody re-writes this search loop per page.
 */

(function () {
  'use strict';

  document.querySelectorAll('[data-filter-input]').forEach((input) => {
    const target = document.querySelector(input.dataset.filterTarget);
    if (!target) return;
    const rows = () => target.querySelectorAll('[data-filter-row]');
    const emptyState = target.parentElement.querySelector('[data-filter-empty]');

    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      let visibleCount = 0;

      rows().forEach((row) => {
        const haystack = row.textContent.toLowerCase();
        const matches = haystack.includes(query);
        row.style.display = matches ? '' : 'none';
        if (matches) visibleCount++;
      });

      if (emptyState) emptyState.style.display = visibleCount === 0 ? 'flex' : 'none';
    });
  });
})();
