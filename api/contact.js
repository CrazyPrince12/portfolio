/* ═══════════════════════════════════════
   /api/contact.js — Vercel Serverless Function
   POST { name, email, message }
   ═══════════════════════════════════════ */

const nodemailer = require('nodemailer');

// ─── Rate limit en mémoire (par IP) ─────────────
// Note : sur Vercel serverless, la mémoire n'est pas garantie persistante
// entre invocations, mais ça aide pour les bursts depuis la même instance.
const rateLimitStore = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 min

function checkRateLimit(ip) {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Cleanup old entries occasionally
  if (rateLimitStore.size > 1000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (now - v.firstAt > RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(k);
    }
  }

  if (!record || now - record.firstAt > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, firstAt: now });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - record.firstAt)) / 1000);
    return { ok: false, retryAfter };
  }

  record.count += 1;
  return { ok: true, remaining: RATE_LIMIT_MAX - record.count };
}

// ─── Validation ─────────────────────────────────
function validate(data) {
  if (!data || typeof data !== 'object') return 'Données invalides';

  const { name, email, message } = data;

  if (!name || typeof name !== 'string' || name.trim().length < 2 || name.length > 100) {
    return 'Nom invalide (2-100 caractères)';
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRe.test(email) || email.length > 200) {
    return 'Email invalide';
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) {
    return 'Message invalide (10-5000 caractères)';
  }

  return null;
}

// ─── Sanitize HTML ──────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ─── Handler ────────────────────────────────────
module.exports = async (req, res) => {
  // CORS
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    // IP detection (Vercel)
    const ip =
      (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      'unknown';

    // Rate limit
    const rl = checkRateLimit(ip);
    if (!rl.ok) {
      res.setHeader('Retry-After', rl.retryAfter);
      return res.status(429).json({
        error: `Trop de requêtes. Réessayez dans ${Math.ceil(rl.retryAfter / 60)} minutes.`
      });
    }

    // Parse body (Vercel le fait déjà si Content-Type est json, mais on sécurise)
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (_) { body = {}; }
    }

    // Validation
    const validationError = validate(body);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const name = body.name.trim();
    const email = body.email.trim();
    const message = body.message.trim();

    // ENV check
    const { GMAIL_USER, GMAIL_PASS, CONTACT_EMAIL } = process.env;
    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('Variables d\'environnement SMTP manquantes');
      return res.status(500).json({ error: 'Service email non configuré. Contactez directement par email.' });
    }

    const toEmail = CONTACT_EMAIL || GMAIL_USER;

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_PASS }
    });

    // Verify (optionnel — peut ralentir, à désactiver en prod si latence)
    // await transporter.verify();

    // Send mail
    await transporter.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] Nouveau message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Envoyé depuis voufo-francis-bedel.vercel.app`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0F; color: #F0EDE8; padding: 32px; border-radius: 8px;">
          <div style="border-bottom: 1px solid #1E1E2E; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="color: #C8A96E; font-family: Georgia, serif; margin: 0 0 4px 0; font-weight: 400;">Nouveau message — Portfolio</h2>
            <p style="color: #7A7A8A; font-size: 12px; margin: 0; letter-spacing: 0.1em; text-transform: uppercase;">voufo-francis-bedel.vercel.app</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #7A7A8A; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; width: 80px;">Nom</td><td style="padding: 8px 0; color: #F0EDE8;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding: 8px 0; color: #7A7A8A; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Email</td><td style="padding: 8px 0;"><a style="color: #C8A96E; text-decoration: none;" href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #111118; border-left: 3px solid #C8A96E; border-radius: 2px;">
            <p style="color: #7A7A8A; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 12px 0;">Message</p>
            <p style="color: #F0EDE8; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <p style="color: #7A7A8A; font-size: 11px; margin-top: 24px; text-align: center;">
            Répondre directement à cet email pour contacter ${escapeHtml(name)}
          </p>
        </div>
      `
    });

    return res.status(200).json({ success: true, message: 'Message envoyé avec succès' });

  } catch (err) {
    console.error('Erreur /api/contact:', err);
    return res.status(500).json({
      error: 'Erreur lors de l\'envoi. Veuillez réessayer ou contacter directement par email.'
    });
  }
};
