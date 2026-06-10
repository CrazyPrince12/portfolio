# 💼 Voufo Francis Bedel — Portfolio

> Portfolio professionnel de **Voufo Francis Bedel**, Comptable & Gestionnaire d'Entreprise basé à Yaoundé, Cameroun.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/CrazyPrince12/portfolio)

> 🔁 **Remplace `YOUR_GITHUB_USERNAME`** dans l'URL ci-dessus par ton vrai pseudo GitHub avant de pousser le dépôt — sinon le bouton ne fonctionnera pas.

---

## ✨ Aperçu

- **Design** : Dark, ultra-moderne, premium minimal · accents or (#C8A96E)
- **Typo** : Cormorant Garamond (display) · Inter (body) · JetBrains Mono (mono)
- **Animations** : GSAP + ScrollTrigger · Marquee · Loader letter-by-letter
- **Multilingue** : Français (par défaut) / English — toggle instantané
- **Responsive** : Mobile-first · bottom-nav sur mobile · sidebar sur desktop
- **A11y** : Sémantique HTML5 · aria-labels · clavier · prefers-reduced-motion
- **Backend** : Vercel Serverless Function pour formulaire de contact (Nodemailer + Gmail SMTP)
- **Sécurité** : Rate-limit (5 req / 15min / IP), validation stricte, sanitisation HTML

---

## 📁 Structure du projet

```
portfolio/
├── public/
│   ├── index.html             ← Page unique
│   ├── favicon.png / .svg     ← Favicons
│   ├── apple-touch-icon.png   ← Icône iOS (180×180)
│   ├── manifest.json          ← PWA manifest
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── assets/
│   │   ├── images/
│   │   │   ├── profile.png    ← Photo de profil
│   │   │   └── og-image.png   ← Open Graph (1200×630)
│   │   ├── sounds/
│   │   │   └── click.mp3      ← Son micro-interactions
│   │   └── icons/
│   ├── css/
│   │   └── style.css          ← Styles custom
│   └── js/
│       ├── main.js            ← Init, loader, menu, tabs
│       ├── animations.js      ← GSAP + ScrollTrigger
│       ├── i18n.js            ← Toggle FR/EN
│       └── contact.js         ← Submit du form
├── api/
│   └── contact.js             ← Serverless function (Nodemailer)
├── vercel.json
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Déploiement rapide sur Vercel

### Option 1 — En un clic (recommandée)

1. Clique sur le bouton **"Deploy with Vercel"** en haut du README
2. Connecte ton compte GitHub
3. Renseigne les **3 variables d'environnement** demandées (voir section dédiée plus bas)
4. Clique sur **Deploy** → site en ligne en ~1 minute 🎉

### Option 2 — En ligne de commande

```bash
# 1. Cloner le repo
git clone https://github.com/YOUR_GITHUB_USERNAME/portfolio.git
cd portfolio

# 2. Installer les dépendances
npm install

# 3. Installer le CLI Vercel
npm install -g vercel

# 4. Déployer
vercel --prod
```

---

## 🔧 Configuration des variables d'environnement

Le formulaire de contact utilise **Gmail SMTP** via Nodemailer.

### Étapes pour configurer Gmail :

1. **Active la validation en 2 étapes** sur ton compte Google :
   👉 https://myaccount.google.com/security

2. **Génère un mot de passe d'application** (16 caractères) :
   👉 https://myaccount.google.com/apppasswords

3. **Ajoute ces 3 variables** dans Vercel (Settings → Environment Variables) :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `GMAIL_USER` | Ton adresse Gmail (expéditeur) | `francisvoufo@gmail.com` |
| `GMAIL_PASS` | Le mot de passe d'application (sans espaces) | `abcdefghijklmnop` |
| `CONTACT_EMAIL` | Email destinataire des messages | `francisvoufo@gmail.com` |

### Pour le dev local

```bash
cp .env.example .env
# Édite .env avec tes credentials
vercel dev
```

---

## 🛠️ Stack technique

### Frontend
- **HTML5** sémantique avec ARIA
- **Tailwind CSS** (v3 via CDN)
- **Vanilla JavaScript** (ES6+, modulaire)
- **GSAP + ScrollTrigger** pour les animations
- **i18next** (toggle FR/EN avec persistance localStorage)

### Backend
- **Node.js + Vercel Serverless Functions**
- **Nodemailer** (Gmail SMTP)
- **Rate-limiting** in-memory (5 req / 15min / IP)
- **Validation** stricte + sanitisation HTML

### Déploiement
- **Vercel** (`vercel.json` configuré)
- API exposée sous `/api/contact`

---

## 📱 Compatibilité

✅ Chrome / Edge / Firefox / Safari (desktop)
✅ Safari iOS / Chrome Android
✅ Safe-area-inset pour iPhone notch
✅ `prefers-reduced-motion` respecté
✅ `prefers-color-scheme: dark` natif
✅ Navigation clavier complète

---

## 🎨 Design System

| Variable | Couleur |
|----------|---------|
| `--bg-primary`   | `#0A0A0F` |
| `--bg-secondary` | `#111118` |
| `--accent`       | `#C8A96E` *(gold)* |
| `--text-primary` | `#F0EDE8` |
| `--text-muted`   | `#7A7A8A` |
| `--border`       | `#1E1E2E` |

---

## 📋 Sections incluses

1. **Loading Screen** — Counter 00% → 100% + nom lettre par lettre
2. **Sidebar / Nav** — Fixed left (desktop) · Hamburger overlay (mobile)
3. **Hero** — Nom XXL animé + CTA
4. **Marquee** — "Rigueur · Précision · Excellence · Intégrité"
5. **About** — Photo + Bio + Qualités + Langues
6. **Skills** — 4 onglets (Logiciels, Techniques, Bureautique, Soft Skills)
7. **Timeline** — Formation (2019→2024) + Expérience
8. **Services** — Tenue compta, Paie, États financiers, Conseil
9. **Contact** — Formulaire + Coordonnées + WhatsApp
10. **Footer**
11. **Bottom Nav** (mobile uniquement)

---

## 📝 Personnalisation

### Changer le contenu

- **Textes** : modifie `public/index.html` (FR) + `public/js/i18n.js` (FR + EN)
- **Couleurs** : modifie `:root` dans `public/css/style.css` ET la config Tailwind dans `index.html` (`<script>tailwind.config = {...}</script>`)
- **Polices** : remplace le `<link>` Google Fonts dans `index.html`
- **Images** : remplace les fichiers dans `public/assets/images/` (formats AVIF/WebP/PNG)

### Ajouter une section

1. Ajoute la section dans `index.html` avec un ID + classe `reveal`
2. Ajoute le lien dans la sidebar + mobile menu
3. Les animations scroll s'appliquent automatiquement

---

## 📞 Contact

**Voufo Francis Bedel**
📧 francisvoufo@gmail.com
📱 +237 694 26 82 25 / +237 620 114 013
📍 Rond Point Damas, Yaoundé — Cameroun

---

## 📄 Licence

MIT © 2025 Voufo Francis Bedel

---

<p align="center">
  Conçu avec 💛 — <em>Rigueur · Précision · Excellence · Intégrité</em>
</p>
