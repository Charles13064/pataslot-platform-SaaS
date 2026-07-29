/**
 * PataSlot — ai-usage-chart.js
 * AI tokens consumed across the platform, for the admin dashboard.
 * Replace MOCK_DATA with a fetch to /api/v1/admin/analytics/ai-usage.
 */

const AiUsageChart = (function () {
  'use strict';

  const MOCK_DATA = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [120000, 138000, 152000, 149000, 168000, 191000, 176000],
  };

  function init(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return null;

    const c = ChartTheme.colors();
    const ctx = canvas.getContext('2d');
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels: MOCK_DATA.labels,
        datasets: [{
          label: 'Tokens used',
          data: MOCK_DATA.values,
          borderColor: c.warning,
          backgroundColor: ChartTheme.fillGradient(ctx, c.warning),
          borderWidth: 2.5,
          pointRadius: 0,
          tension: 0.4,
          fill: true,
        }],
      },
      options: ChartTheme.baseOptions({
        plugins: {
          tooltip: {
            backgroundColor: '#0F172A', padding: 10, cornerRadius: 8,
            callbacks: { label: (item) => ' ' + item.parsed.y.toLocaleString() + ' tokens' },
          },
        },
      }),
    });
  }

  return { init };
})();
