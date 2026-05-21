  import { getApps, initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
  import {
    getAuth, signInWithRedirect, getRedirectResult,
    GoogleAuthProvider, browserLocalPersistence, setPersistence,
    onAuthStateChanged, signOut,
    signInWithEmailAndPassword, createUserWithEmailAndPassword,
    updateProfile, sendPasswordResetEmail
  } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

  const firebaseConfig = {
    apiKey: "AIzaSyDDUoIkszKgK_9Yu5wHlqZ9IifIQWnhvv0",
    authDomain: "fittrack-fb939.firebaseapp.com",
    databaseURL: "https://fittrack-fb939-default-rtdb.europe-west1.firebaseio.com",
    projectId: "fittrack-fb939",
    storageBucket: "fittrack-fb939.firebasestorage.app",
    messagingSenderId: "828892951236",
    appId: "1:828892951236:web:ffe330ca7fe0cc6dae0f91"
  };

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  try { await setPersistence(auth, browserLocalPersistence); } catch(e) {}
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  // ═══════════════════════════════════════════════════
  // STATO GLOBALE — un solo flag gestisce tutto il flusso
  // ═══════════════════════════════════════════════════
  // _authHandled = true significa che qualcuno ha già preso in carico
  // il login e sta navigando → onAuthStateChanged non deve fare niente
  window._authHandled = false;

  // ── Mostra errore nel form ──
  function _showAuthError(msg) {
    const errEl = document.getElementById('auth-error-msg');
    if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
    const loadEl = document.getElementById('auth-loading');
    if (loadEl) loadEl.style.display = 'none';
    const btnG = document.getElementById('google-signin-btn');
    if (btnG) btnG.disabled = false;
  }

  // ── Nascondi login screen ──
  function _hideLoginScreen() {
    const s = document.getElementById('scr-google-login');
    if (s) s.classList.remove('active');
  }

  // ── Mostra splash con messaggio ──
  function _showSplash(msg) {
    const s = document.getElementById('scr-splash');
    if (!s) return;
    s.classList.add('active');
    const sub = s.querySelector('.splash-sub, .splash-txt, p');
    if (sub) sub.textContent = msg || 'Caricamento…';
  }
  function _hideSplash() {
    const s = document.getElementById('scr-splash');
    if (s) s.classList.remove('active');
  }

  // ── Aspetta firestoreLoad (max ms) ──
  function _waitFirestoreLoad(ms) {
    return new Promise(function(resolve) {
      const t = setTimeout(function() { resolve(false); }, ms);
      const attempt = function() {
        if (typeof window.firestoreLoad === 'function') {
          window.firestoreLoad()
            .then(function(ok) { clearTimeout(t); resolve(!!ok); })
            .catch(function() { clearTimeout(t); resolve(false); });
        } else {
          setTimeout(attempt, 120);
        }
      };
      attempt();
    });
  }

  // ── Rileggi profilo da IndexedDB dopo cloud load ──
  async function _reloadProfile() {
    try {
      if (typeof profile !== 'undefined' && profile.name) return; // già in RAM
      const saved = typeof dbGet === 'function' ? await dbGet('profile') : null;
      if (saved && saved.name) {
        profile = saved;
        if (typeof sanitizeRuntimeState === 'function') sanitizeRuntimeState();
      }
    } catch(e) {}
  }

  // ═══════════════════════════════════════════════════
  // ROUTER PRINCIPALE — chiamato dopo ogni login riuscito
  // ═══════════════════════════════════════════════════
  async function _routeAfterLogin(user) {
    // Previeni doppie esecuzioni
    if (window._authHandled) return;
    window._authHandled = true;

    const displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'Utente');
    const userData = {
      uid: user.uid, name: displayName,
      email: user.email, photo: user.photoURL || null,
      ts: new Date().toISOString()
    };
    localStorage.setItem('ft_firebase_user', JSON.stringify(userData));
    localStorage.setItem('ft_google_user', JSON.stringify(userData));
    localStorage.removeItem('ft_pending_google_login');
    window._firebaseUser = user;

    _hideLoginScreen();

    // ── CASO RESET ──
    if (localStorage.getItem('ft_just_reset') === '1') {
      localStorage.removeItem('ft_just_reset');
      try {
        if(typeof profile!=='undefined') profile={name:'',level:'',goals:{calories:2500,weight:70,goalType:'maintain'},days:'5',kcalTarget:2500,macros:{p:180,c:280,g:70},tdee:2500,physique:{age:17,weight:70,height:175,sex:'m',activity:1.55},weeklyWorkoutsTarget:3,weightHistory:[]};
        if(typeof sessions!=='undefined') sessions=[];
        if(typeof nutrition!=='undefined') nutrition={};
        if(typeof metrics!=='undefined') metrics={};
        if(typeof pbs!=='undefined') pbs={};
        if(typeof obSel!=='undefined') obSel={};
        if(typeof obGoals!=='undefined') obGoals=[];
        if(typeof obCurStep!=='undefined') obCurStep=0;
      } catch(e) {}
      _startOnboarding();
      if (typeof showToast==='function') showToast('👋 Ciao ' + displayName.split(' ')[0] + '! Configura il tuo profilo');
      return;
    }

    // ── CASO NORMALE ──
    // 1. Controlla prima i dati locali (veloce)
    if (typeof profile !== 'undefined' && profile.name) {
      _goToApp(displayName, false);
      return;
    }

    // 2. Nessun dato locale — prova cloud
    _showSplash('Caricamento dati…');
    const cloudOk = await _waitFirestoreLoad(5000);
    _hideSplash();

    if (cloudOk) await _reloadProfile();

    if (typeof profile !== 'undefined' && profile.name) {
      _goToApp(displayName, cloudOk);
    } else {
      // Nuovo utente — onboarding
      _startOnboarding();
      if (typeof showToast==='function') showToast('👋 Ciao ' + displayName.split(' ')[0] + '! Configura il tuo profilo');
    }
  }

  function _goToApp(displayName, fromCloud) {
    window._ftOnboardingActive = false;
    window._ftEnterAppRunning = false;
    // Nascondi tutte le schermate, mostra solo app
    document.querySelectorAll('.screen.active').forEach(function(s) {
      if (s.id !== 'scr-app') s.classList.remove('active');
    });
    const appScreen = document.getElementById('scr-app');
    if (appScreen) appScreen.classList.add('active');
    if (typeof initApp === 'function') initApp();
    if (typeof showToast === 'function') setTimeout(function() {
      showToast('Bentornato ' + displayName.split(' ')[0] + '!' + (fromCloud ? ' ☁️' : ''));
    }, 500);
    // Avvia auto-save ogni 3 minuti
    _startAutoSave();
    // Badge cloud
    _addCloudBadge();
  }

  function _startAutoSave() {
    clearInterval(window._fsAutoSaveInterval);
    window._fsAutoSaveInterval = setInterval(function() {
      if (auth.currentUser && window.firestoreSave && localStorage.getItem('ft_just_reset') !== '1') {
        localStorage.setItem('ft_last_local_save', new Date().toISOString());
        window.firestoreSave();
      }
    }, 180000);
  }

  function _addCloudBadge() {
    setTimeout(function() {
      if (document.getElementById('ft-cloud-badge')) return;
      const badge = document.createElement('div');
      badge.id = 'ft-cloud-badge';
      badge.title = 'Cloud sync attivo — tocca per sincronizzare';
      badge.style.cssText = 'position:fixed;top:calc(10px + var(--safe-top,0px));right:16px;font-size:14px;z-index:200;opacity:.6;cursor:pointer;';
      badge.textContent = '☁️';
      badge.onclick = function() {
        if (window.firestoreSave) window.firestoreSave().then(function() {
          if (typeof showToast === 'function') showToast('☁️ Sincronizzato!');
        });
      };
      document.body.appendChild(badge);
    }, 1500);
  }

  // ═══════════════════════════════════════════════════
  // GOOGLE LOGIN
  // ═══════════════════════════════════════════════════
  window.firebaseSignIn = async function() {
    const btnG = document.getElementById('google-signin-btn');
    if (btnG) { btnG.disabled = true; btnG.textContent = 'Reindirizzamento…'; }
    const loadEl = document.getElementById('auth-loading');
    if (loadEl) loadEl.style.display = 'block';
    const errEl = document.getElementById('auth-error-msg');
    if (errEl) errEl.style.display = 'none';

    localStorage.setItem('ft_pending_google_login', '1');
    try {
      await signInWithRedirect(auth, provider);
    } catch(e) {
      const msgs = {
        'auth/network-request-failed': 'Errore di rete. Controlla la connessione.',
        'auth/unauthorized-domain': 'Dominio non autorizzato in Firebase Console.',
        'auth/operation-not-allowed': 'Accesso Google non abilitato su Firebase.',
      };
      _showAuthError(msgs[e.code] || 'Errore Google: ' + e.message);
      localStorage.removeItem('ft_pending_google_login');
    }
  };

  // ── Gestione risultato redirect (eseguita al caricamento pagina) ──
  (async function handleRedirectResult() {
    try {
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        await _routeAfterLogin(result.user);
      }
    } catch(e) {
      if (e.code && e.code !== 'auth/no-current-user') {
        const msgs = {
          'auth/network-request-failed': 'Errore di rete. Controlla la connessione e riprova.',
          'auth/unauthorized-domain': 'Dominio non autorizzato. Aggiungi il dominio su Firebase Console.',
          'auth/user-disabled': 'Account disabilitato.',
          'auth/operation-not-allowed': 'Accesso Google non abilitato.',
        };
        _showAuthError(msgs[e.code] || 'Errore accesso: ' + e.message);
      }
      localStorage.removeItem('ft_pending_google_login');
    }
  })();

  // ═══════════════════════════════════════════════════
  // EMAIL / PASSWORD
  // ═══════════════════════════════════════════════════
  window.firebaseEmailLogin = async function() {
    const email = document.getElementById('auth-email')?.value?.trim();
    const pwd   = document.getElementById('auth-password')?.value;
    if (!email || !pwd) { _showAuthError('Inserisci email e password.'); return; }
    const loadEl = document.getElementById('auth-loading');
    if (loadEl) loadEl.style.display = 'block';
    const errEl = document.getElementById('auth-error-msg');
    if (errEl) errEl.style.display = 'none';
    try {
      const result = await signInWithEmailAndPassword(auth, email, pwd);
      await _routeAfterLogin(result.user);
    } catch(e) {
      const msgs = {
        'auth/user-not-found': 'Account non trovato. Registrati prima.',
        'auth/wrong-password': 'Password errata.',
        'auth/invalid-email': 'Email non valida.',
        'auth/too-many-requests': 'Troppi tentativi. Attendi qualche minuto.',
        'auth/invalid-credential': 'Email o password errati.'
      };
      _showAuthError(msgs[e.code] || 'Errore: ' + e.message);
    }
  };

  // ═══════════════════════════════════════════════════
  // REGISTRAZIONE
  // ═══════════════════════════════════════════════════
  window.firebaseEmailRegister = async function() {
    const name  = document.getElementById('auth-name')?.value?.trim();
    const email = document.getElementById('auth-email')?.value?.trim();
    const pwd   = document.getElementById('auth-password')?.value;
    if (!email || !pwd) { _showAuthError('Inserisci email e password.'); return; }
    if (pwd.length < 6) { _showAuthError('La password deve essere almeno 6 caratteri.'); return; }
    const loadEl = document.getElementById('auth-loading');
    if (loadEl) loadEl.style.display = 'block';
    const errEl = document.getElementById('auth-error-msg');
    if (errEl) errEl.style.display = 'none';
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pwd);
      if (name) await updateProfile(result.user, { displayName: name });
      // Ricarica user dopo updateProfile per avere displayName aggiornato
      await result.user.reload().catch(()=>{});
      await _routeAfterLogin(auth.currentUser || result.user);
    } catch(e) {
      const msgs = {
        'auth/email-already-in-use': 'Email già registrata. Prova ad accedere.',
        'auth/invalid-email': 'Email non valida.',
        'auth/weak-password': 'Password troppo debole (min. 6 caratteri).'
      };
      _showAuthError(msgs[e.code] || 'Errore: ' + e.message);
    }
  };

  // ═══════════════════════════════════════════════════
  // RESET PASSWORD
  // ═══════════════════════════════════════════════════
  window.firebaseResetPassword = async function() {
    const email = document.getElementById('auth-email')?.value?.trim();
    if (!email) { _showAuthError('Inserisci la tua email per il reset.'); return; }
    try {
      await sendPasswordResetEmail(auth, email);
      const errEl = document.getElementById('auth-error-msg');
      if (errEl) { errEl.style.color = 'var(--acc)'; errEl.textContent = '✅ Email di reset inviata! Controlla la casella.'; errEl.style.display = 'block'; }
    } catch(e) {
      _showAuthError('Errore reset: ' + e.message);
    }
  };

  // ═══════════════════════════════════════════════════
  // LOGOUT
  // ═══════════════════════════════════════════════════
  window.firebaseSignOut = async function() {
    if (!confirm('Vuoi davvero uscire dall'account?')) return;
    try {
      await signOut(auth);
      localStorage.removeItem('ft_firebase_user');
      localStorage.removeItem('ft_google_user');
      window._firebaseUser = null;
      window._authHandled = false;
      if (typeof showToast === 'function') showToast('👋 Disconnesso.');
      setTimeout(function() { location.reload(); }, 800);
    } catch(e) { console.error('Logout error:', e); }
  };

  // ═══════════════════════════════════════════════════
  // onAuthStateChanged — solo per auto-login al boot
  // NON naviga mai se _routeAfterLogin è già stato chiamato
  // ═══════════════════════════════════════════════════
  onAuthStateChanged(auth, function(user) {
    if (user) {
      window._firebaseUser = user;
      localStorage.setItem('ft_firebase_user', JSON.stringify({
        uid: user.uid, name: user.displayName || user.email.split('@')[0],
        email: user.email, photo: user.photoURL || null
      }));
      localStorage.setItem('ft_google_user', localStorage.getItem('ft_firebase_user'));

      // Se _routeAfterLogin ha già gestito il login (Google redirect o email) → skip
      if (window._authHandled) {
        _startAutoSave();
        _addCloudBadge();
        return;
      }

      // Se c'è un redirect Google in corso → aspetta getRedirectResult
      if (localStorage.getItem('ft_pending_google_login')) return;

      // Boot normale (utente era già loggato) → naviga dopo un tick
      setTimeout(function() {
        if (!window._authHandled) {
          _routeAfterLogin(user);
        }
      }, 300);
    }
  });

  // Toggle visibilità password
  window.togglePasswordVisibility = function() {
    const inp = document.getElementById('auth-password');
    if (!inp) return;
    inp.type = inp.type === 'password' ? 'text' : 'password';
  };