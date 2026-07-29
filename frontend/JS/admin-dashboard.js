/**
 * PataSlot — admin-dashboard.js
 * Platform Admin Dashboard page controller. Same pattern as dashboard.js:
 * this file only decides which charts render where; each chart's data
 * and Chart.js config live in their own module under js/charts/.
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('platformRevenueChart')) {
      RevenueChart.init('platformRevenueChart', { label: 'MRR (KES)' });
    }
    if (document.getElementById('businessGrowthChart')) {
      BusinessGrowthChart.init('businessGrowthChart');
    }
    if (document.getElementById('whatsappMessagesChart')) {
      WhatsappMessagesChart.init('whatsappMessagesChart');
    }
    if (document.getElementById('aiUsageChart')) {
      AiUsageChart.init('aiUsageChart');
    }
    if (document.getElementById('subscriptionBreakdownChart')) {
      SubscriptionBreakdownChart.init('subscriptionBreakdownChart');
    }
  });
})();
