/**
 * PataSlot — inbox.js
 * Drives inbox.html: selecting a chat, mobile single-column navigation
 * between list/conversation/details, and the message composer.
 */

(function () {
  'use strict';

  const shell = document.querySelector('[data-inbox-shell]');
  if (!shell) return;

  /* ---------------------------------------------------------------------
   * Selecting a conversation from the list
   * ------------------------------------------------------------------- */
  const listItems = shell.querySelectorAll('.inbox-list-item');
  listItems.forEach((item) => {
    item.addEventListener('click', () => {
      listItems.forEach((i) => i.classList.remove('is-active'));
      item.classList.add('is-active');
      const unread = item.querySelector('.inbox-list-item__unread');
      if (unread) unread.remove();

      // On mobile, opening a chat swaps the list column for the conversation.
      if (window.innerWidth <= 1024) {
        shell.classList.add('is-conversation-open');
        shell.classList.remove('is-details-open');
      }
    });
  });

  /* ---------------------------------------------------------------------
   * Mobile back navigation
   * ------------------------------------------------------------------- */
  const backBtn = shell.querySelector('[data-inbox-back]');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      shell.classList.remove('is-conversation-open', 'is-details-open');
    });
  }

  /* ---------------------------------------------------------------------
   * Customer details panel toggle (mobile "info" button)
   * ------------------------------------------------------------------- */
  const infoBtn = shell.querySelector('[data-inbox-info]');
  if (infoBtn) {
    infoBtn.addEventListener('click', () => shell.classList.toggle('is-details-open'));
  }

  /* ---------------------------------------------------------------------
   * Composer — auto-grow textarea + send appends a bubble
   * ------------------------------------------------------------------- */
  const input = shell.querySelector('.composer-input');
  const sendBtn = shell.querySelector('[data-inbox-send]');
  const messages = shell.querySelector('.inbox-conversation__messages');

  if (input) {
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';
    });
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text || !messages) return;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble msg-bubble--out';
    bubble.innerHTML = `${escapeHtml(text)}<span class="msg-bubble__time">${currentTime()}</span>`;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;

    input.value = '';
    input.style.height = 'auto';
  }

  function currentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  if (sendBtn) sendBtn.addEventListener('click', sendMessage);
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  /* ---------------------------------------------------------------------
   * AI reply toggle label
   * ------------------------------------------------------------------- */
  const aiToggle = shell.querySelector('[data-ai-toggle]');
  const aiLabel = shell.querySelector('[data-ai-toggle-label]');
  if (aiToggle && aiLabel) {
    aiToggle.addEventListener('change', () => {
      aiLabel.textContent = aiToggle.checked ? 'AI auto-reply is ON' : 'AI auto-reply is OFF';
    });
  }
})();
