/* ═══════════════════════════════════════
   i18n.js — Internationalization FR/EN
   ═══════════════════════════════════════ */

(function () {
  'use strict';

  const translations = {
    fr: {
      'sidebar.role': 'Comptable',
      'sidebar.location': 'Yaoundé, Cameroun',
      'nav.home': 'Accueil',
      'nav.about': 'À Propos',
      'nav.skills': 'Compétences',
      'nav.experience': 'Expérience',
      'nav.services': 'Services',
      'nav.contact': 'Contact',
      'nav.home_short': 'Accueil',
      'nav.skills_short': 'Skills',
      'nav.services_short': 'Services',
      'nav.contact_short': 'Contact',

      'hero.greeting': '— BIENVENUE',
      'hero.title': "Comptable & Gestionnaire d'Entreprise",
      'hero.subtitle': 'BTS CGE · Yaoundé · Disponible',
      'hero.cta_contact': 'Me contacter →',
      'hero.scroll': 'DÉFILER',

      'about.title': 'À Propos',
      'about.bio1': "Jeune comptable diplômé, passionné par la rigueur des chiffres et la précision des écritures. Formé au BTS CGE, je mets à votre service une expertise en tenue de comptabilité, gestion de paie et conseil en gestion d'entreprise.",
      'about.bio2': "Basé à Yaoundé, je suis disponible pour accompagner les PME et entrepreneurs camerounais dans la structuration et l'optimisation de leur gestion financière.",
      'about.qualities_title': 'QUALITÉS',
      'about.q1': '· Rigoureux',
      'about.q2': '· Ponctuel',
      'about.q3': '· Adaptable',
      'about.q4': "· Esprit d'équipe",
      'about.languages_title': 'LANGUES',
      'about.l1': '· Français — C1',
      'about.l2': '· Anglais — B1',

      'skills.title': 'Compétences',
      'skills.tab1': 'LOGICIELS',
      'skills.tab2': 'TECHNIQUES',
      'skills.tab3': 'BUREAUTIQUE',
      'skills.tab4': 'SOFT SKILLS',
      'skills.s1': 'Compta 100 — Maîtrise avancée',
      'skills.s2': 'Gestion complète de la paie',
      'skills.s3': 'Logiciel comptable',
      'skills.t1_title': 'Tenue de comptabilité',
      'skills.t1_desc': 'Journaux, grand-livre, balance',
      'skills.t2_title': 'Mise en place comptabilité',
      'skills.t2_desc': 'Plan comptable, paramétrage',
      'skills.t3_title': "Gestion d'entreprise",
      'skills.t3_desc': 'Pilotage, contrôle de gestion',
      'skills.b1': 'Rédaction professionnelle',
      'skills.b2': 'Tableaux, formules, analyse',
      'skills.sk1': "Travail d'équipe",
      'skills.sk2': 'Communication',
      'skills.sk3': 'Adaptabilité',
      'skills.sk4': 'Rigueur',

      'timeline.title': 'Formation & Expérience',
      'timeline.formation': 'Formation',
      'timeline.experience': 'Expérience',
      'timeline.f1': "Comptabilité & Gestion d'Entreprise — Année 2",
      'timeline.f2': "Comptabilité & Gestion d'Entreprise — Année 1",
      'timeline.f3_title': 'Baccalauréat CGE',
      'timeline.f3_desc': 'Série Comptabilité',
      'timeline.f4_title': 'Probatoire CGE',
      'timeline.f4_desc': 'Série Comptabilité',
      'timeline.f5_desc': "Brevet d'Études du Premier Cycle",
      'timeline.e1_title': 'Stage Académique',
      'timeline.e1_desc': "Immersion professionnelle au sein du service comptabilité : tenue des journaux, rapprochements bancaires, et participation à la mise en place des procédures comptables.",

      'services.title': 'Services',
      'services.s1_title': 'Tenue de comptabilité',
      'services.s1_desc': "Enregistrement des opérations, journaux, balance, grand-livre. Suivi mensuel rigoureux selon les normes OHADA.",
      'services.s2_title': 'Gestion de la paie',
      'services.s2_desc': "Bulletins de paie, déclarations CNPS, calcul des cotisations sociales avec SAGE PAIE.",
      'services.s3_title': 'États financiers',
      'services.s3_desc': "Bilan, compte de résultat, annexes. Production des liasses fiscales pour les déclarations.",
      'services.s4_title': 'Conseil en gestion',
      'services.s4_desc': "Accompagnement stratégique, optimisation des processus, contrôle de gestion pour PME.",

      'contact.title': 'Discutons',
      'contact.subtitle': "Une opportunité, un projet, une mission ? Écrivez-moi, je vous réponds sous 24h.",
      'contact.name': 'NOM',
      'contact.phone': 'TÉLÉPHONE',
      'contact.location': 'LOCALISATION',
      'contact.send': 'ENVOYER LE MESSAGE',
      'contact.sending': 'ENVOI EN COURS...',
      'contact.success': '✓ Message envoyé avec succès. Je vous réponds sous 24h.',
      'contact.error': '✗ Erreur. Veuillez réessayer ou contacter directement par email.',
      'contact.invalid': '✗ Veuillez remplir tous les champs correctement.',

      'footer.text': 'Conçu & développé avec passion · © 2025 Voufo Francis Bedel'
    },

    en: {
      'sidebar.role': 'Accountant',
      'sidebar.location': 'Yaoundé, Cameroon',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.experience': 'Experience',
      'nav.services': 'Services',
      'nav.contact': 'Contact',
      'nav.home_short': 'Home',
      'nav.skills_short': 'Skills',
      'nav.services_short': 'Services',
      'nav.contact_short': 'Contact',

      'hero.greeting': '— WELCOME',
      'hero.title': 'Accountant & Business Manager',
      'hero.subtitle': 'BTS CGE · Yaoundé · Available',
      'hero.cta_contact': 'Contact me →',
      'hero.scroll': 'SCROLL',

      'about.title': 'About',
      'about.bio1': "Young certified accountant, passionate about the rigor of numbers and the precision of bookkeeping. Trained in BTS CGE, I offer expertise in accounting, payroll management, and business consulting.",
      'about.bio2': "Based in Yaoundé, I am available to support Cameroonian SMEs and entrepreneurs in structuring and optimizing their financial management.",
      'about.qualities_title': 'QUALITIES',
      'about.q1': '· Rigorous',
      'about.q2': '· Punctual',
      'about.q3': '· Adaptable',
      'about.q4': '· Team player',
      'about.languages_title': 'LANGUAGES',
      'about.l1': '· French — C1',
      'about.l2': '· English — B1',

      'skills.title': 'Skills',
      'skills.tab1': 'SOFTWARE',
      'skills.tab2': 'TECHNICAL',
      'skills.tab3': 'OFFICE',
      'skills.tab4': 'SOFT SKILLS',
      'skills.s1': 'Compta 100 — Advanced',
      'skills.s2': 'Complete payroll management',
      'skills.s3': 'Accounting software',
      'skills.t1_title': 'Bookkeeping',
      'skills.t1_desc': 'Journals, ledger, balance',
      'skills.t2_title': 'Accounting setup',
      'skills.t2_desc': 'Chart of accounts, configuration',
      'skills.t3_title': 'Business management',
      'skills.t3_desc': 'Steering, management control',
      'skills.b1': 'Professional writing',
      'skills.b2': 'Tables, formulas, analysis',
      'skills.sk1': 'Teamwork',
      'skills.sk2': 'Communication',
      'skills.sk3': 'Adaptability',
      'skills.sk4': 'Rigor',

      'timeline.title': 'Education & Experience',
      'timeline.formation': 'Education',
      'timeline.experience': 'Experience',
      'timeline.f1': 'Accounting & Business Management — Year 2',
      'timeline.f2': 'Accounting & Business Management — Year 1',
      'timeline.f3_title': 'Baccalaureate CGE',
      'timeline.f3_desc': 'Accounting track',
      'timeline.f4_title': 'Probatoire CGE',
      'timeline.f4_desc': 'Accounting track',
      'timeline.f5_desc': 'First Cycle Studies Certificate',
      'timeline.e1_title': 'Academic Internship',
      'timeline.e1_desc': "Professional immersion within the accounting department: keeping of journals, bank reconciliations, and participation in the implementation of accounting procedures.",

      'services.title': 'Services',
      'services.s1_title': 'Bookkeeping',
      'services.s1_desc': "Recording of transactions, journals, balance, ledger. Rigorous monthly follow-up according to OHADA standards.",
      'services.s2_title': 'Payroll management',
      'services.s2_desc': "Pay slips, CNPS declarations, calculation of social contributions with SAGE PAIE.",
      'services.s3_title': 'Financial statements',
      'services.s3_desc': "Balance sheet, income statement, annexes. Production of tax bundles for declarations.",
      'services.s4_title': 'Business consulting',
      'services.s4_desc': "Strategic support, process optimization, management control for SMEs.",

      'contact.title': "Let's talk",
      'contact.subtitle': "An opportunity, a project, a mission? Write to me, I reply within 24 hours.",
      'contact.name': 'NAME',
      'contact.phone': 'PHONE',
      'contact.location': 'LOCATION',
      'contact.send': 'SEND MESSAGE',
      'contact.sending': 'SENDING...',
      'contact.success': '✓ Message sent successfully. I reply within 24h.',
      'contact.error': '✗ Error. Please try again or contact directly by email.',
      'contact.invalid': '✗ Please fill all fields correctly.'
,
      'footer.text': 'Designed & developed with passion · © 2025 Voufo Francis Bedel'
    }
  };

  // Langue par défaut : FR
  const lang = localStorage.getItem('lang') || 'fr';

  function applyTranslations(currentLang) {
    const dict = translations[currentLang] || translations.fr;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });
    document.documentElement.setAttribute('lang', currentLang);

    // Update toggle labels (show the OTHER language)
    const other = currentLang === 'fr' ? 'EN' : 'FR';
    const l1 = document.getElementById('lang-label');
    const l2 = document.getElementById('mobile-lang-label');
    if (l1) l1.textContent = other;
    if (l2) l2.textContent = other;
  }

  function toggleLang() {
    const current = localStorage.getItem('lang') || 'fr';
    const next = current === 'fr' ? 'en' : 'fr';
    localStorage.setItem('lang', next);
    applyTranslations(next);
  }

  // Expose globally
  window.i18nApp = { applyTranslations, toggleLang, getLang: () => localStorage.getItem('lang') || 'fr' };

  // Init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    applyTranslations(lang);
    const btn1 = document.getElementById('lang-toggle');
    const btn2 = document.getElementById('mobile-lang-toggle');
    if (btn1) btn1.addEventListener('click', toggleLang);
    if (btn2) btn2.addEventListener('click', toggleLang);
  });
})();
