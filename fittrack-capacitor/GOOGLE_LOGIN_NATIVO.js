// ═══════════════════════════════════════════════════════════════
// GOOGLE LOGIN NATIVO — Capacitor + Firebase
// Sostituisce completamente il blocco "// GOOGLE LOGIN" nel modulo
// ES dentro index.html (quello che inizia con firebaseSignIn)
//
// COME USARLO:
// 1. Dentro index.html, nel <script type="module"> di Firebase,
//    trova il blocco che inizia con:
//      // GOOGLE LOGIN
//    e sostituiscilo con questo codice.
//
// 2. Aggiungi PRIMA del </body> (fuori dal modulo ES):
//      <script src="capacitor.js"></script>
//      <script>
//        const { GoogleAuth } = Capacitor.Plugins;
//        window.CapacitorGoogleAuth = GoogleAuth;
//      </script>
//
// 3. Nel capacitor.config.json metti il serverClientId corretto
//    (vedi istruzioni sotto per trovarlo)
// ═══════════════════════════════════════════════════════════════

// ── Rileva se siamo dentro Capacitor (app nativa) o browser ──
function _isNativeApp() {
  return typeof window.Capacitor !== 'undefined' &&
         window.Capacitor.isNativePlatform &&
         window.Capacitor.isNativePlatform();
}

// ── Helper: ripristina bottone Google ──
function _resetGoogleBtn() {
  var btnG = document.getElementById('google-signin-btn');
  if (!btnG) return;
  btnG.disabled = false;
  btnG.innerHTML =
    '<svg width="18" height="18" viewBox="0 0 48 48" style="flex-shrink:0;">' +
    '<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>' +
    '<path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>' +
    '<path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>' +
    '<path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>' +
    '</svg> Continua con Google';
}

// ── Login Google NATIVO (dentro l'app Android) ──
async function _googleLoginNative() {
  try {
    // Usa il plugin Capacitor GoogleAuth — apre il selettore Google nativo Android
    // Zero popup, zero iframe, zero OAuth problems
    const GoogleAuth = window.CapacitorGoogleAuth ||
                       (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.GoogleAuth);

    if (!GoogleAuth) throw new Error('Plugin GoogleAuth non disponibile');

    const googleUser = await GoogleAuth.signIn();

    // googleUser contiene: id, name, email, imageUrl, authentication.idToken
    const idToken = googleUser.authentication.idToken;
    if (!idToken) throw new Error('idToken non ricevuto da Google');

    // Passa il token a Firebase — niente popup, niente iframe
    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);

    await _routeAfterLogin(result.user);

  } catch(e) {
    // Utente ha premuto "Annulla" nel selettore Google
    if (e.message && (e.message.includes('cancel') || e.message.includes('12501'))) {
      _resetGoogleBtn();
      return;
    }
    _showAuthError('Errore Google: ' + (e.message || 'sconosciuto'));
    _resetGoogleBtn();
  }
}

// ── Login Google WEB (su browser/Vercel — fallback) ──
async function _googleLoginWeb() {
  try {
    // Su desktop usa popup, su mobile usa redirect
    var ua = navigator.userAgent || '';
    var isMobile = /Android|iPhone|iPad|iPod/i.test(ua) && ('ontouchstart' in window);

    if (isMobile) {
      await signInWithRedirect(auth, provider);
      // La pagina si ricarica — il risultato viene catturato da _handleGoogleRedirect
    } else {
      var result = await signInWithPopup(auth, provider);
      if (result && result.user) await _routeAfterLogin(result.user);
    }
  } catch(e) {
    var silent = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request'];
    if (!silent.includes(e.code)) {
      var msgs = {
        'auth/unauthorized-domain': 'Dominio non autorizzato su Firebase Console.',
        'auth/network-request-failed': 'Errore di rete.',
        'auth/popup-blocked': 'Popup bloccato — consenti i popup per questo sito.',
      };
      _showAuthError(msgs[e.code] || 'Errore Google: ' + e.message);
    }
    _resetGoogleBtn();
  }
}

// ── Gestione risultato redirect al boot (solo web mobile) ──
(async function _handleGoogleRedirect() {
  if (_isNativeApp()) return; // Non serve su app nativa
  try {
    var r = await getRedirectResult(auth);
    if (r && r.user) {
      window._authHandled = false;
      await _routeAfterLogin(r.user);
    }
  } catch(e) {
    var ignore = ['auth/no-current-user', 'auth/null-user', 'auth/user-cancelled'];
    if (e.code && !ignore.includes(e.code)) {
      _showAuthError('Errore accesso: ' + e.message);
    }
  }
})();

// ── Funzione principale chiamata dal bottone ──
window.firebaseSignIn = async function() {
  var btnG = document.getElementById('google-signin-btn');
  var errEl = document.getElementById('auth-error-msg');
  if (errEl) errEl.style.display = 'none';
  if (btnG) {
    btnG.disabled = true;
    btnG.innerHTML =
      '<div style="width:18px;height:18px;border-radius:50%;border:2px solid rgba(0,0,0,0.2);' +
      'border-top-color:#3c4043;animation:spin .8s linear infinite;display:inline-block;' +
      'vertical-align:middle;margin-right:8px;"></div> Accesso in corso...';
  }

  if (_isNativeApp()) {
    // App Android — usa il plugin nativo (zero errori OAuth)
    await _googleLoginNative();
  } else {
    // Browser / Vercel — usa popup o redirect
    await _googleLoginWeb();
  }
};
