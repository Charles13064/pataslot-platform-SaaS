/**
 * PataSlot — dropzone.js
 * Wires up every [data-dropzone] element on the page (drag/drop, click to
 * upload, preview, remove). Previously this lived only inside
 * onboarding.js — pulled out so any page (Add Product, Settings → Logo,
 * the register wizard) can reuse it without duplicating the logic.
 */

const DropzoneWidget = (function () {
  'use strict';

  function initOne(dropzone) {
    const input = dropzone.querySelector('input[type="file"]');
    const thumb = dropzone.querySelector('[data-dropzone-thumb]');
    const filename = dropzone.querySelector('[data-dropzone-filename]');
    const removeBtn = dropzone.querySelector('[data-dropzone-remove]');
    if (!input) return;

    const showFile = (file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        if (thumb) thumb.src = e.target.result;
        if (filename) filename.textContent = file.name;
        dropzone.classList.add('has-file');
      };
      reader.readAsDataURL(file);
    };

    dropzone.addEventListener('click', (e) => {
      if (e.target !== removeBtn && !removeBtn?.contains(e.target)) input.click();
    });
    input.addEventListener('change', () => showFile(input.files[0]));

    ['dragover', 'dragenter'].forEach((evt) =>
      dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add('is-dragover'); })
    );
    ['dragleave', 'drop'].forEach((evt) =>
      dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.remove('is-dragover'); })
    );
    dropzone.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (file) { input.files = e.dataTransfer.files; showFile(file); }
    });

    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        input.value = '';
        dropzone.classList.remove('has-file');
      });
    }
  }

  function initAll(scope) {
    (scope || document).querySelectorAll('[data-dropzone]').forEach(initOne);
  }

  document.addEventListener('DOMContentLoaded', () => initAll());

  return { initAll, initOne };
})();
