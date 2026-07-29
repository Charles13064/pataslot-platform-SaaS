/**
 * PataSlot — chart-theme.js
 * One place that knows how charts should look. Every chart module calls
 * ChartTheme.colors() and ChartTheme.baseOptions() instead of hardcoding
 * hex values or duplicating Chart.js config — keeps chart files small and
 * keeps every graph consistent with the current light/dark theme.
 */

const ChartTheme = (function () {
  'use strict';

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function colors() {
    return {
      primary: cssVar('--color-primary') || '#16A34A',
      primaryDark: cssVar('--color-primary-dark') || '#15803D',
      primaryLight: cssVar('--color-primary-light') || '#DCFCE7',
      gray: cssVar('--color-gray-500') || '#64748B',
      grid: cssVar('--border-subtle') || '#E7ECF3',
      text: cssVar('--color-gray-600') || '#475569',
      warning: cssVar('--color-warning') || '#F59E0B',
      danger: cssVar('--color-danger') || '#EF4444',
      info: '#3B82F6',
    };
  }

  /** Options common to every chart on the dashboards. */
  function baseOptions(overrides) {
    const c = colors();
    const base = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0F172A',
          padding: 10,
          cornerRadius: 8,
          titleFont: { family: 'Inter', size: 12 },
          bodyFont: { family: 'Inter', size: 12 },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: c.text, font: { family: 'Inter', size: 11 } } },
        y: { grid: { color: c.grid }, ticks: { color: c.text, font: { family: 'Inter', size: 11 } }, beginAtZero: true },
      },
    };
    return Object.assign({}, base, overrides || {});
  }

  /** Builds a soft vertical fill gradient for line charts. */
  function fillGradient(ctx, hexColor) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, hexColor + '33');
    gradient.addColorStop(1, hexColor + '00');
    return gradient;
  }

  return { colors, baseOptions, fillGradient };
})();
