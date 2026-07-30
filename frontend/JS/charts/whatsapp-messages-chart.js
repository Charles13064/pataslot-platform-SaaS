/**
 * PataSlot — whatsapp-messages-chart.js
 * Incoming vs outgoing WhatsApp message volume, for the admin dashboard.
 * Replace MOCK_DATA with a fetch to /api/v1/admin/analytics/messages.
 */

const WhatsappMessagesChart = (function () {
  'use strict';

  const MOCK_DATA = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    incoming: [4200, 4600, 5100, 4800, 5600, 6400, 5900],
    outgoing: [4100, 4500, 5000, 4700, 5500, 6200, 5700],
  };

  function init(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || typeof Chart === 'undefined') return null;

    const c = ChartTheme.colors();
    return new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: MOCK_DATA.labels,
        datasets: [
          {
            label: 'Incoming',
            data: MOCK_DATA.incoming,
            borderColor: c.primary,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 0,
            tension: 0.4,
          },
          {
            label: 'Outgoing',
            data: MOCK_DATA.outgoing,
            borderColor: c.info,
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            borderDash: [5, 4],
            pointRadius: 0,
            tension: 0.4,
          },
        ],
      },
      options: ChartTheme.baseOptions({
        plugins: { legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 10, boxHeight: 10, usePointStyle: true, font: { family: 'Inter', size: 11 } } } },
      }),
    });
  }

  return { init };
})();
