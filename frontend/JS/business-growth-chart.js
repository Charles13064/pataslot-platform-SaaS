/**
 * PataSlot — business-growth-chart.js
 * New business signups per month, for the admin dashboard.
 * Replace MOCK_DATA with a fetch to /api/v1/admin/analytics/signups.
 */

const BusinessGrowthChart = (function () {
  'use strict';

  const MOCK_DATA = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [86, 104, 121, 138, 162, 190],
  };

  function init(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return null;

    const c = ChartTheme.colors();
    return new Chart(canvas.getContext('2d'), {
      type: 'bar',
      data: {
        labels: MOCK_DATA.labels,
        datasets: [{
          label: 'New businesses',
          data: MOCK_DATA.values,
          backgroundColor: c.primaryLight,
          hoverBackgroundColor: c.primary,
          borderRadius: 6,
          maxBarThickness: 34,
        }],
      },
      options: ChartTheme.baseOptions(),
    });
  }

  return { init };
})();
