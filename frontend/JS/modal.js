/**
 * PataSlot — modal.js
 * Any button with data-modal-open="modal-id" opens #modal-id.
 * Any element inside a modal with data-modal-close closes its modal.
 * No page needs its own open/close logic — this is the single controller.
 */

(function () {
  'use strict';

  let activeModal = null;

  function openModal(modal) {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    activeModal = modal;
    const firstField = modal.querySelector('input, select, textarea, button');
    if (firstField) firstField.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    if (activeModal === modal) activeModal = null;
  }

  document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modal = document.getElementById(trigger.dataset.modalOpen);
      if (modal) openModal(modal);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
    backdrop.querySelectorAll('[data-modal-close]').forEach((btn) => {
      btn.addEventListener('click', () => closeModal(backdrop));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) closeModal(activeModal);
  });
})();
