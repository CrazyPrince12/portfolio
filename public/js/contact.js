/* ═══════════════════════════════════════
   contact.js — Form submission
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const statusEl = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    const setStatus = (msg, type) => {
      statusEl.textContent = msg;
      statusEl.className = 'text-sm font-mono ' + (type || '');
    };

    const getMsg = (key) => {
      const lang = (window.i18nApp && window.i18nApp.getLang()) || 'fr';
      const messages = {
        fr: {
          sending: '⟳ Envoi en cours...',
          success: '✓ Message envoyé avec succès. Je vous réponds sous 24h.',
          error: '✗ Erreur. Veuillez réessayer ou contacter directement par email.',
          invalid: '✗ Veuillez remplir tous les champs correctement.',
          sendBtn: 'ENVOYER LE MESSAGE',
          sendingBtn: 'ENVOI...'
        },
        en: {
          sending: '⟳ Sending...',
          success: '✓ Message sent successfully. I reply within 24h.',
          error: '✗ Error. Please try again or contact directly by email.',
          invalid: '✗ Please fill all fields correctly.',
          sendBtn: 'SEND MESSAGE',
          sendingBtn: 'SENDING...'
        }
      };
      return messages[lang][key];
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {
        name: (formData.get('name') || '').trim(),
        email: (formData.get('email') || '').trim(),
        message: (formData.get('message') || '').trim()
      };

      // Validation
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.name || data.name.length < 2 || !emailRe.test(data.email) || !data.message || data.message.length < 10) {
        setStatus(getMsg('invalid'), 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      const btnSpan = submitBtn.querySelector('span');
      const originalText = btnSpan ? btnSpan.textContent : '';
      if (btnSpan) btnSpan.textContent = getMsg('sendingBtn');
      setStatus(getMsg('sending'), 'loading');

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });

        if (!res.ok) {
          let errMsg = getMsg('error');
          try {
            const errBody = await res.json();
            if (errBody && errBody.error) errMsg = '✗ ' + errBody.error;
          } catch (_) {}
          throw new Error(errMsg);
        }

        setStatus(getMsg('success'), 'success');
        form.reset();
      } catch (err) {
        console.error('Contact form error:', err);
        setStatus(err.message || getMsg('error'), 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        if (btnSpan) btnSpan.textContent = originalText || getMsg('sendBtn');
      }
    });
  });
})();
