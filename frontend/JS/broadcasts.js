/**
 * PataSlot — broadcasts.js
 * Drives the New Broadcast modal: live phone preview as the message is
 * typed, and showing/hiding the schedule date field.
 */

(function () {
  'use strict';

  const modal = document.getElementById('modal-new-broadcast');
  if (!modal) return;

  const messageInput = modal.querySelector('[data-broadcast-message]');
  const previewBubble = modal.querySelector('[data-broadcast-preview]');

  if (messageInput && previewBubble) {
    const render = () => {
      const text = messageInput.value.trim();
      previewBubble.textContent = text || 'Your broadcast message will appear here…';
      previewBubble.classList.toggle('preview-phone__placeholder', !text);
    };
    messageInput.addEventListener('input', render);
    render();
  }

  const scheduleRadios = modal.querySelectorAll('[name="broadcast_timing"]');
  const scheduleField = modal.querySelector('[data-schedule-field]');
  if (scheduleRadios.length && scheduleField) {
    scheduleRadios.forEach((radio) => {
      radio.addEventListener('change', () => {
        scheduleField.classList.toggle('is-hidden', radio.value !== 'schedule' || !radio.checked);
      });
    });
  }
})();
