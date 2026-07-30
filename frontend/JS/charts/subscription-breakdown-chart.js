/**
 * PataSlot — subscription-breakdown-chart.js
 * Share of businesses per plan, for the admin dashboard.
 * Replace MOCK_DATA with a fetch to /api/v1/admin/analytics/plans.
 */

const SubscriptionBreakdownChart = (function () {
  'use strict';

  const MOCK_DATA = {
    labels: ['Starter', 'Growth', 'Scale', 'Free trial'],
    values: [612, 984, 214, 358],
  };

  function init(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return null;

    const c = ChartTheme.colors();
    return new Chart(canvas.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: MOCK_DATA.labels,
        datasets: [{
          data: MOCK_DATA.values,
          backgroundColor: [c.gray, c.primary, c.primaryDark, c.primaryLight],
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, padding: 16, font: { family: 'Inter', size: 11 }, color: c.text },
          },
          tooltip: { backgroundColor: '#0F172A', padding: 10, cornerRadius: 8 },
        },
      },
    });
  }

  return { init };
})();
