/**
 * PataSlot — sidebar.js
 * Handles the desktop icon-rail collapse and the mobile off-canvas drawer.
 * Shared by dashboard.html and admin-dashboard.html.
 */

(function () {
  'use strict';

  const shell = document.querySelector('[data-app-shell]');
  const sidebar = document.querySelector('[data-sidebar]');
  if (!shell || !sidebar) return;

  const STORAGE_KEY = 'pataslot_sidebar_collapsed';

  /* ---------------------------------------------------------------------
   * Desktop collapse (persisted)
   * ------------------------------------------------------------------- */
  const collapseBtn = document.querySelector('[data-sidebar-collapse]');
  if (localStorage.getItem(STORAGE_KEY) === '1') shell.classList.add('is-collapsed');

  if (collapseBtn) {
    collapseBtn.addEventListener('click', () => {
      shell.classList.toggle('is-collapsed');
      localStorage.setItem(STORAGE_KEY, shell.classList.contains('is-collapsed') ? '1' : '0');
    });
  }

  /* ---------------------------------------------------------------------
   * Mobile drawer
   * ------------------------------------------------------------------- */
  const menuBtn = document.querySelector('[data-sidebar-open]');
  const backdrop = document.querySelector('[data-sidebar-backdrop]');

  function openDrawer() {
    sidebar.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    sidebar.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (menuBtn) menuBtn.addEventListener('click', openDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
  sidebar.querySelectorAll('.sidebar-link').forEach((link) =>
    link.addEventListener('click', () => { if (window.innerWidth <= 1024) closeDrawer(); })
  );
  window.addEventListener('resize', () => { if (window.innerWidth > 1024) closeDrawer(); });
})();
