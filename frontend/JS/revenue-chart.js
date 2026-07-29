/**
 * PataSlot — revenue-chart.js
 * Renders a revenue-over-time line chart. Reused by dashboard.html
 * (per-business revenue) and admin-dashboard.html (platform-wide MRR).
 * Replace MOCK_DATA with a fetch to /api/v1/analytics/revenue.
 */

const RevenueChart = (function () {
  'use strict';

  const MOCK_DATA = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    values: [182000, 204500, 231000, 265000, 298500, 341200],
  };

  function init(canvasId, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return null;

    const data = (options && options.data) || MOCK_DATA;
    const c = ChartTheme.colors();
    const ctx = canvas.getContext('2d');

    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: (options && options.label) || 'Revenue (KES)',
          data: data.values,
          borderColor: c.primary,
          backgroundColor: ChartTheme.fillGradient(ctx, c.primary),
          borderWidth: 2.5,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: c.primary,
          tension: 0.4,
          fill: true,
        }],
      },
      options: ChartTheme.baseOptions({
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0F172A',
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              label: (item) => ' KES ' + item.parsed.y.toLocaleString(),
            },
          },
        },
      }),
    });
  }

  return { init };
})();
