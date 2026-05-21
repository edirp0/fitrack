  import { initializeApp, getApps } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
  import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
  import { getFirestore, doc, setDoc, getDoc, enableIndexedDbPersistence } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

  const firebaseConfig = {
    apiKey: "AIzaSyDDUoIkszKgK_9Yu5wHlqZ9IifIQWnhvv0",
    authDomain: "fittrack-fb939.firebaseapp.com",
    databaseURL: "https://fittrack-fb939-default-rtdb.europe-west1.firebaseio.com",
    projectId: "fittrack-fb939",
    storageBucket: "fittrack-fb939.firebasestorage.app",
    messagingSenderId: "828892951236",
    appId: "1:828892951236:web:ffe330ca7fe0cc6dae0f91"
  };

  // Use existing app if already initialized
  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  // Enable offline persistence
  try { enableIndexedDbPersistence(db); } catch(e) {}

  // Save all local data to Firestore
  window.firestoreSave = async function() {
    const user = auth.currentUser;
    if (!user) return;
    try {
      // Leggi direttamente da IndexedDB/RAM per massima freschezza
      const getVal = async (key, fallback) => {
        try {
          if (typeof dbGet === 'function') {
            const v = await dbGet(key);
            if (v !== null && v !== undefined) return v;
          }
        } catch(e) {}
        try {
          const ls = localStorage.getItem('ft3_' + key) || localStorage.getItem('ft_' + key);
          return ls ? JSON.parse(ls) : fallback;
        } catch(e) { return fallback; }
      };

      const [prof, sess, nutr, metr, pbsD] = await Promise.all([
        getVal('profile', null),
        getVal('sessions', []),
        getVal('nutrition', {}),
        getVal('metrics', {}),
        getVal('pbs', {})
      ]);

      const data = {
        profile:    prof,
        sessions:   Array.isArray(sess) ? sess.slice(-500) : sess, // max 500 sessioni
        nutrition:  nutr,
        metrics:    metr,
        pbs:        pbsD,
        badges:     JSON.parse(localStorage.getItem('ft_badges') || '{}'),
        settings:   JSON.parse(localStorage.getItem('ft_v45_settings') || localStorage.getItem('v45_settings') || '{}'),
        proStatus:  JSON.parse(localStorage.getItem('ft_pro_status') || '{}'),
        updatedAt:  new Date().toISOString(),
        appVersion: 'V47'
      };

      await setDoc(doc(db, 'users', user.uid, 'data', 'main'), data);
      // Badge cloud nella navbar
      const badge = document.getElementById('ft-cloud-badge');
      if (badge) { badge.textContent = '☁️'; badge.title = 'Sync ' + new Date().toLocaleTimeString(); }
    } catch(e) {
      console.error('[Firestore] ❌ Errore:', e.message);
    }
  };

  // Load data from Firestore and sync to local storage
  window.firestoreLoad = async function() {
    const user = auth.currentUser;
    if (!user) return false;
    try {
      const snap = await getDoc(doc(db, 'users', user.uid, 'data', 'main'));
      if (!snap.exists()) return false;
      const data = snap.data();

      // Merge intelligente: il profilo viene sempre caricato dal cloud se esiste
      // (essenziale su nuovo dispositivo / browser pulito dove ft_last_local_save è assente)
      const localUpdated = localStorage.getItem('ft_last_local_save') || '0';
      const cloudUpdated = data.updatedAt || '0';
      const cloudIsNewer = cloudUpdated > localUpdated;

      const save = async (key, val) => {
        if (!val) return;
        try {
          if (typeof dbSet === 'function') await dbSet(key, val);
          localStorage.setItem('ft3_' + key, JSON.stringify(val));
          localStorage.setItem('ft_' + key, JSON.stringify(val));
        } catch(e) {}
      };

      // Il profilo viene SEMPRE caricato dal cloud se presente — evita falso onboarding
      if (data.profile && data.profile.name) {
        await save('profile', data.profile);
        // Aggiorna RAM subito così ftEnterApp trova profile.name
        try {
          if (typeof profile !== 'undefined' && !profile.name) {
            profile = Object.assign(profile, data.profile);
          }
        } catch(e) {}
      }

      if (cloudIsNewer) {
        await Promise.all([
          save('sessions',  data.sessions),
          save('nutrition', data.nutrition),
          save('metrics',   data.metrics),
          save('pbs',       data.pbs),
        ]);
        if (data.badges)   localStorage.setItem('ft_badges', JSON.stringify(data.badges));
        if (data.settings) { localStorage.setItem('ft_v45_settings', JSON.stringify(data.settings)); localStorage.setItem('v45_settings', JSON.stringify(data.settings)); }
        if (data.proStatus) localStorage.setItem('ft_pro_status', JSON.stringify(data.proStatus));
      } else {
        // Cloud più vecchio: carica solo PRO status (dati sensibili)
        if (data.proStatus) localStorage.setItem('ft_pro_status', JSON.stringify(data.proStatus));
      }

      // Espone helper per verifica PRO
      window._fsGetDoc = async function(path) {
        try {
          const parts = path.split('/');
          const ref = doc(db, ...parts);
          const s = await getDoc(ref);
          return s.exists() ? s.data() : null;
        } catch(e) { return null; }
      };

      return true;
    } catch(e) {
      console.error('[Firestore] ❌ Errore caricamento:', e.message);
      return false;
    }
  };

  // Auto-save every 2 minutes when logged in
  onAuthStateChanged(auth, function(user) {
    if (user) {
      // Guard reset e onboarding
      if (localStorage.getItem('ft_just_reset') === '1') return;
      if (window._ftOnboardingActive) return;
      setTimeout(function() {
        if (window._ftOnboardingActive) return;
        // NON chiamare initApp se l'app è già attiva — disturberebbe l'utente durante l'inserimento dati
        var appAlreadyActive = document.getElementById('scr-app')?.classList.contains('active');
        if (window.firestoreLoad) window.firestoreLoad().then(function(loaded) {
          if (loaded && !window._ftOnboardingActive && !appAlreadyActive) {
            if (typeof initApp === 'function') try { initApp(); } catch(e) {}
          }
        });
      }, 800);

      // Auto-save ogni 3 minuti — gestito dal secondo onAuthStateChanged

      // Aggiungi badge cloud nella navbar
      setTimeout(function() {
        var nav = document.querySelector('.bni') || document.querySelector('.bottom-nav');
        if (nav && !document.getElementById('ft-cloud-badge')) {
          var badge = document.createElement('div');
          badge.id = 'ft-cloud-badge';
          badge.title = 'Cloud sync attivo';
          badge.style.cssText = 'position:fixed;top:calc(8px + var(--safe-top,0px));right:16px;font-size:13px;z-index:200;opacity:.7;cursor:pointer;';
          badge.textContent = '☁️';
          badge.onclick = function() { window.firestoreSave().then(function(){ if(typeof showToast==='function') showToast('☁️ Sync completato'); }); };
          document.body.appendChild(badge);
        }
      }, 1500);
    }
  });

  // Expose save trigger for manual use
  window.cloudSave = window.firestoreSave;