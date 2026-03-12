// ═══════════════════════════════════════════════════════
//  ApiTrack — Auth & Navigation partagée
// ═══════════════════════════════════════════════════════

(function() {

  // ── 1. Détecter la page courante ──────────────────────
  const currentFile = location.pathname.split('/').pop() || 'INDEX.html';

  // ── 2. Injecter les styles mobiles + nav bottom ───────
  const mobileCSS = `
    /* ─── RESET SIDEBAR MOBILE ─────────────────────── */
    @media (max-width: 768px) {
      .sidebar {
        display: none !important;
      }
      .main, main.main {
        margin-left: 0 !important;
        padding: 16px 16px 90px !important;
      }
      /* Ajustements grilles responsive */
      .kpi-grid { grid-template-columns: repeat(2,1fr) !important; }
      .cols { grid-template-columns: 1fr !important; }
      .bottom-row { grid-template-columns: 1fr !important; }
      .global-stats { grid-template-columns: repeat(2,1fr) !important; }
      .ruchers-grid { grid-template-columns: repeat(2,1fr) !important; }
      .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
      .ca-grid { grid-template-columns: repeat(2,1fr) !important; }
      .stock-grid { grid-template-columns: repeat(2,1fr) !important; }
      .main { grid-template-columns: 1fr !important; }
      .zone-left { max-height: none !important; }
    }
    @media (max-width: 480px) {
      .kpi-grid { grid-template-columns: 1fr 1fr !important; }
      .ruchers-grid { grid-template-columns: 1fr !important; }
    }

    /* ─── BARRE DE NAV MOBILE (bottom) ─────────────── */
    #mobile-nav {
      display: none;
    }
    @media (max-width: 768px) {
      #mobile-nav {
        display: flex;
        position: fixed;
        bottom: 0; left: 0; right: 0;
        height: 64px;
        background: linear-gradient(180deg, #00B050, #007A38);
        z-index: 500;
        align-items: center;
        justify-content: space-around;
        padding: 0 4px;
        box-shadow: 0 -4px 20px rgba(92,54,8,0.22);
      }
      .mnav-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        padding: 6px 2px;
        border-radius: 12px;
        cursor: pointer;
        border: none;
        background: none;
        color: rgba(208,242,224,0.7);
        transition: all 0.2s;
        position: relative;
        text-decoration: none;
      }
      .mnav-item.active {
        color: #F5C842;
        background: rgba(255,255,255,0.12);
      }
      .mnav-icon { font-size: 20px; line-height: 1; }
      .mnav-label { font-size: 9px; font-weight: 700; letter-spacing: 0.04em; font-family: 'Josefin Sans', sans-serif; white-space: nowrap; }
      .mnav-badge {
        position: absolute;
        top: 4px; right: 8px;
        width: 14px; height: 14px;
        background: #B03020;
        border-radius: 50%;
        font-size: 8px; font-weight: 700; color: #fff;
        display: flex; align-items: center; justify-content: center;
        border: 2px solid #007A38;
      }
    }

    /* ─── BOUTON "PLUS" MENU MOBILE ─────────────────── */
    #mobile-more-menu {
      display: none;
      position: fixed;
      bottom: 72px; left: 0; right: 0;
      background: #FAF0D0;
      border-radius: 22px 22px 0 0;
      padding: 16px 20px 8px;
      box-shadow: 0 -6px 30px rgba(92,54,8,0.18);
      z-index: 499;
      max-height: 60vh;
      overflow-y: auto;
    }
    #mobile-more-menu.open { display: block; }
    #mobile-more-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(92,54,8,0.35);
      z-index: 498;
    }
    #mobile-more-overlay.open { display: block; }
    .mm-title {
      font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
      text-transform: uppercase; color: #D4AA78; margin-bottom: 12px;
    }
    .mm-item {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 14px; border-radius: 14px; cursor: pointer;
      text-decoration: none; color: #5C3608;
      transition: background 0.18s;
      margin-bottom: 4px;
    }
    .mm-item:hover, .mm-item.active { background: #D0F2E0; }
    .mm-item.active { color: #007A38; font-weight: 700; }
    .mm-icon { font-size: 20px; width: 36px; height: 36px; background: #F0E0A8; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .mm-label { font-size: 13px; font-weight: 600; font-family: 'Josefin Sans', sans-serif; }
    .mm-soon { font-size: 9px; font-weight: 700; background: #F0E0A8; color: #D4AA78; padding: 2px 8px; border-radius: 10px; margin-left: auto; }

    /* ─── PAGE DE CONNEXION ─────────────────────────── */
    #auth-overlay {
      position: fixed; inset: 0; z-index: 9999;
      background: #FAF0D0;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Josefin Sans', sans-serif;
    }
    #auth-overlay::before {
      content: '';
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='104'%3E%3Cpath d='M30 2l28 16v32L30 66 2 50V18L30 2zm0 8L8 24v24l22 13 22-13V24L30 10z' fill='%2300B050' fill-opacity='0.045'/%3E%3Cpath d='M30 66l28 16v32L30 130 2 114V82L30 66zm0 8L8 88v24l22 13 22-13V88L30 74z' fill='%2300B050' fill-opacity='0.045'/%3E%3C/svg%3E");
    }
    .auth-card {
      position: relative; z-index: 1;
      background: #FFFDF4;
      border: 2px solid #F0E0A8;
      border-radius: 28px;
      padding: 48px 44px 40px;
      max-width: 400px; width: 90%;
      box-shadow: 0 20px 60px rgba(92,54,8,0.18);
      text-align: center;
      animation: authPop 0.45s cubic-bezier(.4,0,.2,1) both;
    }
    @keyframes authPop { from{opacity:0;transform:scale(.9) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
    .auth-logo {
      width: 72px; height: 72px;
      background: linear-gradient(135deg, #F0A800, #D4920A);
      border-radius: 22px;
      display: flex; align-items: center; justify-content: center;
      font-size: 36px;
      margin: 0 auto 18px;
      box-shadow: 0 8px 28px rgba(240,168,0,.4);
    }
    .auth-title { font-family: 'Dancing Script', cursive; font-size: 46px; font-weight: 700; color: #00B050; line-height: 1; }
    .auth-sub { font-family: 'Crimson Pro', serif; font-style: italic; font-size: 16px; color: #8B5A20; margin-top: 6px; }
    .auth-desc { font-size: 13px; color: #B8864A; margin: 18px 0 28px; line-height: 1.6; }
    .auth-google-btn {
      display: flex; align-items: center; justify-content: center; gap: 12px;
      width: 100%; padding: 14px 20px;
      background: #fff;
      border: 2px solid #F0E0A8;
      border-radius: 50px;
      cursor: pointer;
      font-family: 'Josefin Sans', sans-serif;
      font-size: 14px; font-weight: 700;
      color: #5C3608;
      box-shadow: 0 4px 16px rgba(92,54,8,0.1);
      transition: all 0.25s;
    }
    .auth-google-btn:hover { border-color: #00B050; box-shadow: 0 6px 22px rgba(0,176,80,0.2); transform: translateY(-2px); }
    .auth-google-btn:active { transform: translateY(0); }
    .auth-google-logo { width: 22px; height: 22px; }
    .auth-error {
      margin-top: 14px; padding: 10px 16px;
      background: #FDEAEA; border-radius: 12px;
      font-size: 12px; font-weight: 600; color: #B03020;
      display: none;
    }
    .auth-loading {
      margin-top: 14px; font-size: 12px; font-style: italic;
      color: #B8864A; display: none;
    }
    .auth-footer { margin-top: 20px; font-size: 11px; color: #D4AA78; }

    /* ─── USER BADGE DESKTOP ────────────────────────── */
    #user-photo {
      width: 38px; height: 38px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(255,255,255,0.3);
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = mobileCSS;
  document.head.appendChild(styleEl);

  // ── 3. Injecter la barre de nav mobile ────────────────
  function buildMobileNav() {
    // 5 items principaux toujours visibles
    const mainItems = [
      { icon:"🏠", label:"Accueil",  file:"INDEX.html" },
      { icon:"🏕️", label:"Rucher",   file:"02-au-rucher.html" },
      { icon:"🔧", label:"Atelier",  file:"03-atelier.html" },
      { icon:"👑", label:"Reines",   file:"04-elevage-reines.html" },
      { icon:"☰",  label:"Plus",     file:null, more:true },
    ];

    const nav = document.createElement('nav');
    nav.id = 'mobile-nav';
    mainItems.forEach(item => {
      const el = document.createElement(item.file ? 'a' : 'button');
      if (item.file) el.href = item.file;
      el.className = 'mnav-item' + (currentFile === item.file ? ' active' : '');
      el.innerHTML = `<span class="mnav-icon">${item.icon}</span><span class="mnav-label">${item.label}</span>`;
      if (item.more) {
        el.addEventListener('click', (e) => { e.preventDefault(); toggleMoreMenu(); });
      }
      nav.appendChild(el);
    });
    document.body.appendChild(nav);

    // Overlay + menu "Plus"
    const overlay = document.createElement('div');
    overlay.id = 'mobile-more-overlay';
    overlay.addEventListener('click', closeMoreMenu);
    document.body.appendChild(overlay);

    const moreMenu = document.createElement('div');
    moreMenu.id = 'mobile-more-menu';
    const allPages = [
      { icon:"🏠", label:"Tableau de bord", file:"01-tableau-de-bord.html" },
      { icon:"🏕️", label:"Au Rucher",        file:"02-au-rucher.html" },
      { icon:"🔧", label:"Atelier",           file:"03-atelier.html" },
      { icon:"👑", label:"Élevage Reines",    file:"04-elevage-reines.html" },
      { icon:"🍯", label:"Récoltes",          file:null, soon:true },
      { icon:"🛒", label:"Vente",             file:"06-vente.html" },
      { icon:"📦", label:"Achats",            file:null, soon:true },
      { icon:"📊", label:"Résultats",         file:null, soon:true },
      { icon:"🌤️", label:"Météo Ruchers",     file:null, soon:true },
    ];
    moreMenu.innerHTML = `<div class="mm-title">📋 Tous les modules</div>`;
    allPages.forEach(p => {
      const el = document.createElement(p.file ? 'a' : 'div');
      if (p.file) el.href = p.file;
      el.className = 'mm-item' + (currentFile === p.file ? ' active' : '');
      el.innerHTML = `<div class="mm-icon">${p.icon}</div><span class="mm-label">${p.label}</span>${p.soon ? '<span class="mm-soon">Bientôt</span>' : ''}`;
      if (p.file) el.addEventListener('click', closeMoreMenu);
      moreMenu.appendChild(el);
    });
    document.body.appendChild(moreMenu);
  }

  function toggleMoreMenu() {
    document.getElementById('mobile-more-menu').classList.toggle('open');
    document.getElementById('mobile-more-overlay').classList.toggle('open');
  }
  function closeMoreMenu() {
    document.getElementById('mobile-more-menu').classList.remove('open');
    document.getElementById('mobile-more-overlay').classList.remove('open');
  }

  // ── 4. Rendre les liens de la sidebar fonctionnels ────
  function activateSidebarLinks() {
    const navItems = document.querySelectorAll('.nav-item, .nav-item');
    // Mapping icône → fichier
    const iconMap = {
      '🏠': '01-tableau-de-bord.html',
      '🏕️': '02-au-rucher.html',
      '🔧': '03-atelier.html',
      '🍯': null, // bientôt
      '👑': '04-elevage-reines.html',
      '📊': null,
      '🛒': '06-vente.html',
      '📦': null,
      '🌤️': null,
    };

    navItems.forEach(item => {
      const iconEl = item.querySelector('.nav-icon, .nav-icon');
      if (!iconEl) return;
      const icon = iconEl.textContent.trim();
      const target = iconMap[icon];

      // Marquer actif
      if (target && currentFile === target) {
        item.classList.add('active');
      } else if (!target && item.classList.contains('active') && currentFile !== '01-tableau-de-bord.html') {
        item.classList.remove('active');
      }

      if (target) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => { window.location.href = target; });
      } else {
        // Module "bientôt" : ajouter badge
        if (!iconEl.querySelector('.nav-alert')) {
          const badge = document.createElement('span');
          badge.style.cssText = 'position:absolute;top:50%;right:10px;transform:translateY(-50%);font-size:9px;font-weight:700;background:rgba(212,170,120,0.3);color:rgba(208,242,224,0.5);padding:2px 6px;border-radius:8px;opacity:0;transition:opacity 0.2s;white-space:nowrap;';
          badge.textContent = 'bientôt';
          const labelEl = item.querySelector('.nav-label');
          if (labelEl) {
            // insérer badge après le label
            item.style.position = 'relative';
            item.appendChild(badge);
            item.parentElement && item.parentElement.closest('.sidebar') && item.parentElement.closest('.sidebar').addEventListener('mouseenter', () => { badge.style.opacity = '1'; });
            item.parentElement && item.parentElement.closest('.sidebar') && item.parentElement.closest('.sidebar').addEventListener('mouseleave', () => { badge.style.opacity = '0'; });
          }
        }
      }
    });

    // Lien logo → INDEX
    const sbLogo = document.querySelector('.sb-brand, .sidebar-brand');
    if (sbLogo) {
      sbLogo.style.cursor = 'pointer';
      sbLogo.addEventListener('click', () => window.location.href = 'INDEX.html');
    }
  }

  // ── 5. Firebase Auth ──────────────────────────────────
  function initFirebase() {
    // Vérifier que Firebase est chargé
    if (typeof firebase === 'undefined') {
      console.warn('[ApiTrack] Firebase non chargé — mode hors ligne');
      onUserAuthenticated({ displayName: 'Céline', email: 'demo@apitrack.local', photoURL: null });
      return;
    }

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG);
      }

      const auth = firebase.auth();
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');

      auth.onAuthStateChanged(user => {
        if (user) {
          // Vérifier si l'email est autorisé
          if (!ALLOWED_EMAILS.includes(user.email) && !ALLOWED_EMAILS.includes('demo@apitrack.local')) {
            auth.signOut();
            showAuthOverlay(provider, auth, 'Accès réservé aux utilisateurs autorisés.');
            return;
          }
          hideAuthOverlay();
          onUserAuthenticated(user);
        } else {
          showAuthOverlay(provider, auth);
        }
      });
    } catch (e) {
      console.warn('[ApiTrack] Erreur Firebase:', e);
      onUserAuthenticated({ displayName: 'Céline', email: 'demo@apitrack.local', photoURL: null });
    }
  }

  function showAuthOverlay(provider, auth, errorMsg) {
    let overlay = document.getElementById('auth-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'auth-overlay';
      overlay.innerHTML = `
        <div class="auth-card">
          <div class="auth-logo">🐝</div>
          <div class="auth-title">ApiTrack</div>
          <div class="auth-sub">Le Rucher de Céline</div>
          <div class="auth-desc">Application de gestion apicole.<br>Connexion réservée aux utilisateurs autorisés.</div>
          <button class="auth-google-btn" id="btn-google-signin">
            <svg class="auth-google-logo" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Se connecter avec Google
          </button>
          <div class="auth-error" id="auth-error">${errorMsg || ''}</div>
          <div class="auth-loading" id="auth-loading">Connexion en cours…</div>
          <div class="auth-footer">🔒 Accès sécurisé · 2 utilisateurs autorisés</div>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    if (errorMsg) {
      const errEl = document.getElementById('auth-error');
      if (errEl) { errEl.textContent = errorMsg; errEl.style.display = 'block'; }
    }

    document.getElementById('btn-google-signin')?.addEventListener('click', async () => {
      const loading = document.getElementById('auth-loading');
      const errEl = document.getElementById('auth-error');
      if (loading) loading.style.display = 'block';
      if (errEl) errEl.style.display = 'none';
      try {
        await auth.signInWithPopup(provider);
      } catch (e) {
        if (loading) loading.style.display = 'none';
        if (errEl) { errEl.textContent = 'Erreur de connexion : ' + e.message; errEl.style.display = 'block'; }
      }
    });
  }

  function hideAuthOverlay() {
    const overlay = document.getElementById('auth-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.3s';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 300);
    }
  }

  function onUserAuthenticated(user) {
    // Mettre à jour l'avatar et le nom dans la sidebar
    const avatarEl = document.querySelector('.sb-avatar, .user-avatar');
    const nameEl = document.querySelector('.sb-user-name, .user-name-txt');
    const roleEl = document.querySelector('.sb-user-role, .user-role');

    if (avatarEl) {
      if (user.photoURL) {
        const img = document.createElement('img');
        img.id = 'user-photo';
        img.src = user.photoURL;
        img.alt = user.displayName || 'User';
        avatarEl.innerHTML = '';
        avatarEl.appendChild(img);
      } else {
        avatarEl.textContent = user.displayName ? user.displayName[0] : '👩';
      }
    }
    if (nameEl) nameEl.textContent = user.displayName || user.email;

    // Ajouter bouton déconnexion
    const userSection = document.querySelector('.sb-user');
    if (userSection && !document.getElementById('logout-btn') && typeof firebase !== 'undefined' && firebase.apps.length) {
      const logoutBtn = document.createElement('button');
      logoutBtn.id = 'logout-btn';
      logoutBtn.title = 'Se déconnecter';
      logoutBtn.style.cssText = 'background:none;border:none;cursor:pointer;color:rgba(208,242,224,0.4);font-size:14px;padding:4px;border-radius:6px;transition:all 0.2s;opacity:0;flex-shrink:0;';
      logoutBtn.textContent = '⏻';
      logoutBtn.addEventListener('click', () => firebase.auth().signOut());
      logoutBtn.addEventListener('mouseenter', () => { logoutBtn.style.color = '#FDEAEA'; logoutBtn.style.background = 'rgba(176,48,32,0.2)'; });
      logoutBtn.addEventListener('mouseleave', () => { logoutBtn.style.color = 'rgba(208,242,224,0.4)'; logoutBtn.style.background = 'none'; });
      userSection.appendChild(logoutBtn);

      // Afficher au survol de la sidebar
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.addEventListener('mouseenter', () => { logoutBtn.style.opacity = '1'; });
        sidebar.addEventListener('mouseleave', () => { logoutBtn.style.opacity = '0'; });
      }
    }
  }

  // ── 6. Init au chargement ──────────────────────────────
  function init() {
    buildMobileNav();
    activateSidebarLinks();

    // Firebase : charger dynamiquement si pas déjà présent
    if (typeof firebase === 'undefined') {
      // Charger Firebase depuis CDN
      const scripts = [
        'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js',
        'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js',
      ];
      let loaded = 0;
      scripts.forEach(src => {
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => { loaded++; if (loaded === scripts.length) initFirebase(); };
        s.onerror = () => { console.warn('[ApiTrack] Impossible de charger Firebase'); onUserAuthenticated({ displayName: 'Céline', email: 'demo@apitrack.local', photoURL: null }); };
        document.head.appendChild(s);
      });
    } else {
      initFirebase();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
