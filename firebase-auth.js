// firebase-auth.js — FitTrack
import { app } from './firebase-config.js';
import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  GoogleAuthProvider
} from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ── Espone auth globalmente per uso nell'HTML ──
window._ftAuth = auth;

// ── Stato utente ──
onAuthStateChanged(auth, function(user) {
  window._ftCurrentUser = user || null;
  document.dispatchEvent(new CustomEvent('ft:authchange', { detail: { user } }));
});

// ── getRedirectResult: gestisce il ritorno dal login Google ──
(async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      localStorage.removeItem('ft_pending_google_login');
      if (typeof window._onLoginSuccess === 'function') {
        window._onLoginSuccess(result.user);
      }
    }
  } catch(e) {
    const msgs = {
      'auth/network-request-failed': 'Errore di rete. Controlla la connessione e riprova.',
      'auth/unauthorized-domain': 'Dominio non autorizzato. Contatta il supporto.',
      'auth/user-disabled': 'Account disabilitato.',
      'auth/operation-not-allowed': 'Accesso Google non abilitato.',
    };
    if (e.code && e.code !== 'auth/no-current-user') {
      if (typeof window._showAuthError === 'function') {
        window._showAuthError(msgs[e.code] || 'Errore accesso: riprova o usa email/password.');
      }
    }
  }
})();

// ── Google Sign-In (sempre redirect, compatibile GitHub Pages) ──
window.firebaseSignIn = async function() {
  const btnG = document.getElementById('google-signin-btn');
  if (btnG) { btnG.disabled = true; btnG.textContent = 'Reindirizzamento…'; }
  const loadingEl = document.getElementById('auth-loading');
  const errorEl   = document.getElementById('auth-error-msg');
  if (loadingEl) loadingEl.style.display = 'block';
  if (errorEl)   errorEl.style.display   = 'none';

  const isReset = localStorage.getItem('ft_just_reset') === '1';
  localStorage.setItem('ft_pending_google_login', isReset ? 'reset' : '1');

  try {
    await signInWithRedirect(auth, provider);
    // La pagina si ricarica — risultato gestito da getRedirectResult sopra
  } catch(e) {
    const msgs = {
      'auth/network-request-failed': 'Errore di rete. Controlla la connessione.',
      'auth/unauthorized-domain': 'Dominio non autorizzato in Firebase Console.',
      'auth/operation-not-allowed': 'Accesso Google non abilitato su Firebase.',
    };
    if (typeof window._showAuthError === 'function') {
      window._showAuthError(msgs[e.code] || 'Errore Google: ' + e.message);
    }
    if (btnG) {
      btnG.disabled = false;
      btnG.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 48 48" style="flex-shrink:0;">' +
          '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
          '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
          '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
          '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>' +
        '</svg> Continua con Google';
    }
  }
};

// ── Email/Password Login ──
window.firebaseEmailLogin = async function() {
  const email = (document.getElementById('auth-email')?.value || '').trim();
  const pwd   = document.getElementById('auth-password')?.value || '';
  if (!email || !pwd) {
    if (typeof window._showAuthError === 'function') window._showAuthError('Inserisci email e password.');
    return;
  }
  const loadingEl = document.getElementById('auth-loading');
  const errorEl   = document.getElementById('auth-error-msg');
  if (loadingEl) loadingEl.style.display = 'block';
  if (errorEl)   errorEl.style.display   = 'none';
  try {
    const result = await signInWithEmailAndPassword(auth, email, pwd);
    if (typeof window._onLoginSuccess === 'function') window._onLoginSuccess(result.user);
  } catch(e) {
    const msgs = {
      'auth/user-not-found':     'Nessun account trovato con questa email.',
      'auth/wrong-password':     'Password errata.',
      'auth/invalid-email':      'Email non valida.',
      'auth/too-many-requests':  'Troppi tentativi. Riprova più tardi.',
      'auth/invalid-credential': 'Credenziali non valide. Controlla email e password.',
    };
    if (typeof window._showAuthError === 'function') {
      window._showAuthError(msgs[e.code] || 'Errore: ' + e.message);
    }
    if (loadingEl) loadingEl.style.display = 'none';
  }
};

// ── Registrazione Email/Password ──
window.firebaseEmailRegister = async function() {
  const name  = (document.getElementById('auth-name')?.value  || '').trim();
  const email = (document.getElementById('auth-email')?.value || '').trim();
  const pwd   = document.getElementById('auth-password')?.value || '';
  if (!name || !email || !pwd) {
    if (typeof window._showAuthError === 'function') window._showAuthError('Compila tutti i campi.');
    return;
  }
  if (pwd.length < 6) {
    if (typeof window._showAuthError === 'function') window._showAuthError('La password deve avere almeno 6 caratteri.');
    return;
  }
  const loadingEl = document.getElementById('auth-loading');
  const errorEl   = document.getElementById('auth-error-msg');
  if (loadingEl) loadingEl.style.display = 'block';
  if (errorEl)   errorEl.style.display   = 'none';
  try {
    const result = await createUserWithEmailAndPassword(auth, email, pwd);
    await updateProfile(result.user, { displayName: name });
    if (typeof window._onLoginSuccess === 'function') window._onLoginSuccess(result.user);
  } catch(e) {
    const msgs = {
      'auth/email-already-in-use': 'Email già registrata. Accedi invece.',
      'auth/invalid-email':        'Email non valida.',
      'auth/weak-password':        'Password troppo debole (min 6 caratteri).',
    };
    if (typeof window._showAuthError === 'function') {
      window._showAuthError(msgs[e.code] || 'Errore registrazione: ' + e.message);
    }
    if (loadingEl) loadingEl.style.display = 'none';
  }
};

// ── Reset Password ──
window.firebaseResetPassword = async function() {
  const email = (document.getElementById('auth-email')?.value || '').trim();
  if (!email) {
    if (typeof window._showAuthError === 'function') window._showAuthError('Inserisci la tua email per il recupero password.');
    else if (typeof showToast === 'function') showToast('⚠️ Inserisci la tua email');
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    if (typeof showToast === 'function') showToast('📧 Email di recupero inviata a: ' + email);
  } catch(e) {
    if (typeof window._showAuthError === 'function') window._showAuthError('Errore: ' + e.message);
  }
};

// ── Logout ──
window.firebaseSignOut = async function() {
  try {
    await signOut(auth);
    localStorage.clear();
    location.reload();
  } catch(e) {
    console.error('[FitTrack] Logout error:', e);
  }
};
