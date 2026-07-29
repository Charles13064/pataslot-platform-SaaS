/**
 * PataSlot — dashboard.js
 * Business Owner Dashboard page controller. Keeps chart rendering out of
 * this file entirely — it only decides *which* charts belong on this page
 * and hands off to the matching module in js/charts/.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('revenueChart')) {
      RevenueChart.init('revenueChart', { label: 'Revenue (KES)' });
    }
  });
})();
