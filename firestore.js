(function v32Patch(){
'use strict';

/* ── EQ LABEL MAP ──────────────────────────────────────── */
const EQ_LABELS_V32 = {
  bilanciere:'Bilanciere + Pesi', manubri:'Manubri', kettlebell:'Kettlebell',
  sbarra:'Sbarra per trazioni', parallele:'Parallele / Dip station',
  bande:'Bande elastiche', trx:'TRX / Anelli', tapis_roulant:'Tapis roulant',
  cyclette:'Cyclette / Bike', panca:'Panca piana', macchinari:'Macchine isotoniche',
  niente:'Solo corpo libero',
};
const EQ_ICO_V32 = {
  bilanciere:'🏋️', manubri:'💪', kettlebell:'🔔', sbarra:'🤸', parallele:'⊤',
  bande:'🪢', trx:'🎯', tapis_roulant:'🏃', cyclette:'🚴', panca:'🛋️',
  macchinari:'🦾', niente:'🧘',
};

/* Mappa attrezzo → quali esercizi di un preset lo richiedono */
function getBlockedExercises(preset, missingSet){
  const blocked = [];
  if(!preset||!missingSet||missingSet.size===0) return blocked;
  (preset.days||[]).forEach(day=>{
    if(day.rest) return;
    (day.exercises||[]).forEach(ex=>{
      const exDef = (typeof EX_DB!=='undefined'?EX_DB:[]).find(e=>e.id===ex.id);
      if(!exDef) return;
      const eq = exDef.equipment||[];
      const missing = eq.filter(e=>{
        const mapped = e==='anelli'?'trx': e==='attrezzi_strongman'?null: e;
        return mapped && missingSet.has(mapped);
      });
      if(missing.length>0){
        blocked.push({
          name: exDef.name,
          icon: exDef.icon||'💪',
          day: day.name,
          needs: missing.map(m=>{
            const mapped = m==='anelli'?'trx':m;
            return EQ_LABELS_V32[mapped]||mapped;
          }),
          needsIds: missing.map(m=>m==='anelli'?'trx':m),
        });
      }
    });
  });
  // Deduplica per nome
  const seen = new Set();
  return blocked.filter(b=>{ if(seen.has(b.name)) return false; seen.add(b.name); return true; });
}

/* ── NUOVA showMissingEquipmentAlert con lista esercizi ── */
window.showMissingEquipmentAlert = function(presetName, missingLabels, presetId){
  document.getElementById('v32-missing-modal')?.remove();

  // Trova preset e calcola esercizi bloccati
  const preset = (typeof PRESETS_DATA!=='undefined'?PRESETS_DATA:[]).find(p=>p.id===presetId||p.name===presetName);
  const userEq = typeof getUserEquipment==='function' ? getUserEquipment() : new Set();
  const missingIds = new Set(
    Object.entries(EQ_LABELS_V32)
      .filter(([id,lbl])=>missingLabels.includes(lbl))
      .map(([id])=>id)
  );
  const blocked = getBlockedExercises(preset, missingIds);

  const modal = document.createElement('div');
  modal.id = 'v32-missing-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,0.78);display:flex;align-items:flex-end;backdrop-filter:blur(14px);';

  // Lista attrezzatura mancante con pulsanti "Aggiungi"
  const eqHtml = [...new Set(missingLabels)].map(lbl=>{
    const id = Object.entries(EQ_LABELS_V32).find(([k,v])=>v===lbl)?.[0]||'';
    const ico = EQ_ICO_V32[id]||'🔧';
    return `
    <div style="display:flex;align-items:center;gap:12px;background:rgba(255,92,106,0.08);border:1px solid rgba(255,92,106,0.25);border-radius:14px;padding:12px 14px;margin-bottom:8px;">
      <span style="font-size:22px">${ico}</span>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:800;color:var(--text)">${lbl}</div>
        <div style="font-size:10px;color:var(--text3);margin-top:1px">Non configurato nella tua palestra</div>
      </div>
      <button onclick="v32AddEquipment('${id}',this)" style="background:rgba(200,245,60,0.1);border:1px solid rgba(200,245,60,0.3);border-radius:10px;padding:7px 12px;font-family:'Syne',sans-serif;font-size:11px;font-weight:800;color:var(--acc);cursor:pointer;white-space:nowrap;">+ Aggiungi</button>
    </div>`;
  }).join('');

  // Lista esercizi bloccati (max 4)
  const blockedHtml = blocked.length>0 ? `
    <div style="margin-top:16px">
      <div style="font-size:10px;font-weight:800;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px">Esercizi non eseguibili (${blocked.length})</div>
      ${blocked.slice(0,5).map(b=>`
        <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--bg3);border-radius:10px;margin-bottom:6px;border:1px solid var(--border);">
          <span style="font-size:18px;opacity:0.5">${b.icon}</span>
          <div style="flex:1">
            <div style="font-size:12px;font-weight:700;color:var(--text2)">${b.name}</div>
            <div style="font-size:10px;color:var(--text3)">Serve: ${b.needs.join(', ')}</div>
          </div>
          <span style="font-size:16px;opacity:0.4">🔒</span>
        </div>`).join('')}
      ${blocked.length>5?`<div style="font-size:11px;color:var(--text3);text-align:center;padding:6px">+${blocked.length-5} altri esercizi bloccati</div>`:''}
    </div>` : '';

  modal.innerHTML = `
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:28px 28px 0 0;width:100%;padding:20px 18px calc(32px + env(safe-area-inset-bottom));max-height:90vh;overflow-y:auto;animation:slideUp .35s cubic-bezier(.22,1,.36,1) both;box-shadow:0 -20px 60px rgba(0,0,0,0.5);">
    
    <div style="display:flex;justify-content:center;margin-bottom:16px;">
      <div style="width:40px;height:4px;border-radius:99px;background:var(--border3)"></div>
    </div>
    
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <div style="width:38px;height:38px;background:rgba(255,92,106,0.12);border:1px solid rgba(255,92,106,0.3);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;">⚠️</div>
        <div>
          <div style="font-size:15px;font-weight:800;color:var(--red);">Attrezzatura mancante</div>
          <div style="font-size:11px;color:var(--text3);">${presetName}</div>
        </div>
      </div>
      <button onclick="document.getElementById('v32-missing-modal').remove()" style="width:30px;height:30px;background:var(--bg4);border:none;border-radius:50%;color:var(--text2);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">×</button>
    </div>
    <div style="height:1px;background:var(--border);margin:14px 0;"></div>
    
    <div style="font-size:11px;font-weight:800;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;">Aggiungi alla tua palestra</div>
    ${eqHtml}
    ${blockedHtml}
    
    <div style="background:var(--acc4);border:1px solid rgba(200,245,60,0.12);border-radius:12px;padding:11px 13px;margin-top:14px;font-size:11px;color:var(--text2);line-height:1.6;">
      💡 Puoi comunque avviare il programma — gli esercizi bloccati verranno segnalati durante l'allenamento.
    </div>
    
    <div style="display:flex;gap:8px;margin-top:16px;">
      <button onclick="document.getElementById('v32-missing-modal').remove();typeof openEquipmentSettings==='function'&&openEquipmentSettings();" style="flex:1.3;padding:13px;background:var(--acc);color:#06060E;border:none;border-radius:14px;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer;box-shadow:0 3px 14px rgba(200,245,60,0.2);">
        🏋️ Configura palestra
      </button>
      <button onclick="document.getElementById('v32-missing-modal').remove();" style="flex:1;padding:13px;background:var(--bg4);color:var(--text2);border:1px solid var(--border2);border-radius:14px;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">
        Chiudi
      </button>
    </div>
  </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.remove(); });
};

/* Aggiunge direttamente un singolo attrezzo e aggiorna i badge */
window.v32AddEquipment = function(eqId, btn){
  if(!eqId) return;
  try{
    const saved = JSON.parse(localStorage.getItem('ft_equipment')||'[]');
    if(!saved.includes(eqId)){
      // Rimuovi 'niente' se aggiunge qualcosa
      const filtered = saved.filter(e=>e!=='niente');
      filtered.push(eqId);
      localStorage.setItem('ft_equipment','['+filtered.map(e=>`"${e}"`).join(',')+']');
    }
  }catch(e){}
  // Feedback visivo sul pulsante
  if(btn){
    btn.textContent='✓ Aggiunto';
    btn.style.background='rgba(62,223,138,0.15)';
    btn.style.borderColor='rgba(62,223,138,0.4)';
    btn.style.color='var(--green)';
    btn.disabled=true;
  }
  // Ricalcola badge
  setTimeout(()=>{
    if(typeof applyCompatibilityBadges==='function') applyCompatibilityBadges();
  }, 200);
};

/* ── PATCH applyCompatibilityBadges: passa presetId al modal ── */
(function patchBadgeClick(){
  // Sovrascriviamo applyCompatibilityBadges con versione che passa presetId
  const _orig = window.applyCompatibilityBadges;
  window.applyCompatibilityBadges = function(){
    const userEq = typeof getUserEquipment==='function' ? getUserEquipment() : new Set();
    if(userEq.size===0) return;
    if(typeof PRESETS_DATA==='undefined') return;

    PRESETS_DATA.forEach(preset=>{
      const compat = typeof getPresetCompatibility==='function' ? getPresetCompatibility(preset.id) : {missing:new Set(),missingLabels:[]};
      const selector = `[onclick*="${preset.id}"], [data-id="${preset.id}"]`;
      document.querySelectorAll(selector).forEach(card=>{
        card.querySelector('.v30-compat-badge')?.remove();
        if(compat.missing.size===0) return;

        const n = compat.missingLabels.length;
        const badge = document.createElement('div');
        badge.className = 'v30-compat-badge';
        badge.style.cssText = `
          display:flex;align-items:center;justify-content:center;gap:5px;
          width:calc(100% - 0px);margin-top:10px;
          background:rgba(255,92,106,0.10);
          border:1px solid rgba(255,92,106,0.28);
          border-radius:10px;padding:7px 12px;
          font-size:11px;font-weight:800;color:#FF5C6A;
          cursor:pointer;box-sizing:border-box;
        `;
        badge.innerHTML = `<span>⚠️</span><span>${n} attrezzo${n>1?'i':''} mancante${n>1?'i':''} — tocca per dettagli</span>`;
        badge.onclick = e=>{
          e.stopPropagation();
          window.showMissingEquipmentAlert(preset.name, compat.missingLabels, preset.id);
        };
        card.style.position='';
        card.appendChild(badge);
      });
    });
  };
})();

/* ── PATCH openEquipmentSettings: highlight attrezzo specifico ── */
(function patchOpenEqSettings(){
  if(window._v32EqSettingsPatched) return;
  window._v32EqSettingsPatched = true;

  const _orig = window.openEquipmentSettings;
  window.openEquipmentSettings = function(highlightId){
    if(typeof _orig==='function') _orig();
    // Dopo apertura, scrolla e illumina l'attrezzo
    if(!highlightId) return;
    setTimeout(()=>{
      // Cerca l'elemento dell'attrezzo nel modal aperto
      const selectors = [
        `#v27eq-${highlightId}`,
        `[id*="${highlightId}"]`,
        `[onclick*="'${highlightId}'"]`,
      ];
      let el = null;
      for(const s of selectors){
        el = document.querySelector(s);
        if(el) break;
      }
      if(!el) return;
      el.scrollIntoView({behavior:'smooth',block:'center'});
      // Pulse animation
      const origBorder = el.style.border;
      const origShadow = el.style.boxShadow;
      el.style.border='1.5px solid var(--acc)';
      el.style.boxShadow='0 0 0 3px rgba(200,245,60,0.2)';
      el.style.transition='all .3s';
      setTimeout(()=>{
        el.style.border=origBorder;
        el.style.boxShadow=origShadow;
      },2500);
    }, 350);
  };
})();

/* ── PALESTRA COMPLETA = macchinari include tutto ────────── */
// Se l'utente ha 'macchinari', aggiungiamo implicitamente panca e bilanciere
(function patchEquipmentExpansion(){
  const _origGet = window.getUserEquipment;
  if(!_origGet || window._v32EqExpanded) return;
  window._v32EqExpanded = true;
  window.getUserEquipment = function(){
    const base = _origGet();
    if(base.has('macchinari')){
      // Una vera palestra ha anche panca e bilanciere
      base.add('panca');
      base.add('bilanciere');
      base.add('manubri');
    }
    return base;
  };
})();

/* ── PREMIUM CSS EXTRA ──────────────────────────────────── */
(function injectPremiumCSS(){
  const style = document.createElement('style');
  style.textContent = `
    /* ── Subscreen premium ── */
    .subscreen{
      background:var(--bg) !important;
    }
    .sub-topbar{
      background:rgba(6,6,14,0.85) !important;
      backdrop-filter:blur(24px) !important;
      border-bottom:1px solid var(--border2) !important;
      box-shadow:0 2px 20px rgba(0,0,0,0.3) !important;
    }
    .sub-back{
      background:var(--bg3) !important;
      border:1px solid var(--border2) !important;
      border-radius:10px !important;
      padding:6px 14px !important;
      font-weight:700 !important;
      font-size:12px !important;
      transition:all .18s !important;
    }
    .sub-back:hover{border-color:var(--acc) !important;color:var(--acc) !important;}

    /* ── Input premium ── */
    input[type=text], input[type=number], input[type=email], textarea, select {
      background:var(--bg3) !important;
      border:1px solid var(--border2) !important;
      border-radius:var(--r) !important;
      color:var(--text) !important;
      transition:border-color .18s, box-shadow .18s !important;
    }
    input:focus, textarea:focus, select:focus {
      border-color:rgba(200,245,60,0.4) !important;
      box-shadow:0 0 0 3px rgba(200,245,60,0.06) !important;
      outline:none !important;
    }

    /* ── Exercise cards in workout ── */
    .ex-card, [class*="ex-row"], [class*="exercise-row"] {
      border-radius:var(--r-lg) !important;
      border:1px solid var(--border2) !important;
      background:linear-gradient(145deg,var(--bg3),var(--bg4)) !important;
      box-shadow:0 2px 12px rgba(0,0,0,0.35) !important;
      transition:border-color .2s !important;
    }

    /* ── Modali premium ── */
    [id*="modal"] > div:last-child,
    [id*="ovl"] > div:last-child {
      box-shadow:0 -20px 60px rgba(0,0,0,0.55) !important;
    }

    /* ── Scrollbar invisibile ma funzionante ── */
    *::-webkit-scrollbar{width:0;height:0;}
    *{scrollbar-width:none;}

    /* ── Page transition ── */
    .page{animation:fadeUpPremium .3s cubic-bezier(.22,1,.36,1) both !important;}
    @keyframes fadeUpPremium{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}

    /* ── Ripple on buttons ── */
    .pres-btn, .cta-btn-main, .rec-btn {
      position:relative;overflow:hidden;
    }
    .pres-btn::after, .cta-btn-main::after, .rec-btn::after {
      content:'';position:absolute;inset:0;
      background:radial-gradient(circle at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 70%);
      opacity:0;transition:opacity .3s;pointer-events:none;
    }
    .pres-btn:active::after, .cta-btn-main:active::after, .rec-btn:active::after{opacity:1;}

    /* ── Preset match % badge premium ── */
    [class*="match"], [id*="match-pct"] {
      font-family:'Bebas Neue',sans-serif !important;
      letter-spacing:.02em !important;
      text-shadow:0 0 12px currentColor !important;
    }

    /* ── Home name ── */
    .home-name {
      font-size:30px !important;
      letter-spacing:-.6px !important;
      line-height:1.05 !important;
    }

    /* ── Hero card depth ── */
    .home-workout-hero {
      box-shadow:0 12px 40px rgba(0,0,0,0.5) !important;
    }

    /* ── CTA banner glow upgrade ── */
    .cta-banner.has-prog::before {
      box-shadow:0 0 12px rgba(200,245,60,0.35) !important;
    }

    /* ── Anatomia mappa ── */
    .ana-card {
      background:linear-gradient(145deg,var(--bg3),var(--bg4)) !important;
      border:1px solid var(--border2) !important;
      border-radius:var(--r-xl) !important;
      box-shadow:0 4px 20px rgba(0,0,0,0.4) !important;
    }

    /* ── Nutrition food items ── */
    [class*="food-item"], [class*="food-row"], [class*="nutr-item"] {
      border-radius:var(--r-lg) !important;
      transition:background .15s !important;
    }

    /* ── Recipe cards ── */
    [class*="ric-card"], [class*="recipe-card"] {
      border-radius:var(--r-xl) !important;
      box-shadow:0 4px 18px rgba(0,0,0,0.4) !important;
    }

    /* ── Progress charts ── */
    [class*="prog-card"], [class*="chart-card"] {
      border-radius:var(--r-xl) !important;
      border:1px solid var(--border2) !important;
    }

    /* ── Version badge ── */
    #ft-version-footer {
      font-size:10px !important;
      letter-spacing:.06em !important;
      opacity:.5 !important;
    }

    /* ── Equipment modal items ── */
    [id^="v27eq-"] {
      border-radius:var(--r-lg) !important;
      transition:all .18s cubic-bezier(.22,1,.36,1) !important;
    }
    [id^="v27eq-"]:active { transform:scale(.97) !important; }

    /* ── App version number in header ── */
    .app-v-badge, [id*="v-badge"] {
      font-size:10px !important;
      background:rgba(200,245,60,0.08) !important;
      border:1px solid rgba(200,245,60,0.18) !important;
      border-radius:99px !important;
      padding:2px 8px !important;
      color:var(--acc) !important;
      font-weight:800 !important;
      letter-spacing:.06em !important;
    }

    /* Header version badge */
    .home-ttl span, .home-ttl .vbadge {
      font-size:11px !important;
      background:var(--acc4) !important;
      border:1px solid rgba(200,245,60,0.2) !important;
      border-radius:6px !important;
      padding:1px 6px !important;
      color:var(--acc) !important;
      vertical-align:middle !important;
      margin-left:6px !important;
    }
  `;
  document.head.appendChild(style);
})();

/* ── INIT ── */
(function v32Init(){
  const run = ()=>{
    // Fix version footer
    const footer = document.getElementById('ft-version-footer');
    if(footer) footer.textContent = 'FitTrack AI V32 · Dati salvati localmente';
    // Aggiorna version badge in header se presente
    document.querySelectorAll('.app-v-badge,[id*="v-badge"]').forEach(el=>{
      if(el.textContent.includes('V')) el.textContent='V32';
    });
      };
  document.readyState==='loading'
    ? document.addEventListener('DOMContentLoaded',run)
    : run();
})();

})(); // end v32Patch


/* ══════════════════════════════════════════════════
   V35 PRESET EXPANSION — matcher ancora più preciso
   Aggiunge preset per: donna, senior, 2 giorni,
   specializzazione muscolare, sport-specifici
══════════════════════════════════════════════════ */
(function addV35Presets(){

const V35 = [

  /* ── 2 GIORNI ── */
  {
    id:'2day-full',name:'Full Body 2× — Minimalista',icon:'✌️',color:'var(--blue)',
    t:'full',diff:'beginner',dur:'40',env:'calisthenics',
    goals:['hypertrophy','fat_loss'],levels:['beginner','intermediate'],
    desc:'Due sessioni a settimana, massima efficienza. Perfetto per chi ha poco tempo ma vuole risultati.',
    days:[
      {name:'Sessione A',type:'full',rest:false,exercises:[
        {id:'push-up',s:'4',r:'12',rs:'60s'},
        {id:'pull-up',s:'4',r:'6',rs:'90s'},
        {id:'squat-w',s:'4',r:'12',rs:'75s'},
        {id:'hollow',s:'3',r:'40s',rs:'45s'},
        {id:'burpees',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione B',type:'full',rest:false,exercises:[
        {id:'dips-w',s:'4',r:'10',rs:'90s'},
        {id:'row',s:'4',r:'12',rs:'75s'},
        {id:'bss',s:'4',r:'10',rs:'75s'},
        {id:'plank',s:'3',r:'60s',rs:'45s'},
        {id:'mt-cl',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'2day-gym',name:'Palestra 2× — Full Body Pesante',icon:'✌️',color:'var(--orange)',
    t:'full',diff:'intermediate',dur:'60',env:'gym',
    goals:['strength','hypertrophy'],levels:['beginner','intermediate'],
    desc:'Due allenamenti pesanti a settimana. Fondamentali e accessori. Ottimo per chi lavora molto.',
    days:[
      {name:'Sessione A',type:'full',rest:false,exercises:[
        {id:'bs',s:'4',r:'6',rs:'180s'},
        {id:'bp',s:'4',r:'8',rs:'150s'},
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'db-ohp',s:'3',r:'10',rs:'90s'},
        {id:'bic-bar',s:'3',r:'12',rs:'60s'},
        {id:'tri-rope',s:'3',r:'12',rs:'60s'},
        {id:'calf-mach',s:'3',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione B',type:'full',rest:false,exercises:[
        {id:'dl',s:'4',r:'5',rs:'240s'},
        {id:'ip',s:'4',r:'10',rs:'120s'},
        {id:'seated-row',s:'4',r:'10',rs:'90s'},
        {id:'leg-press',s:'4',r:'12',rs:'90s'},
        {id:'bic-db',s:'3',r:'12',rs:'60s'},
        {id:'skull',s:'3',r:'12',rs:'75s'},
        {id:'ab-roll',s:'3',r:'10',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ── DONNA — focus glutei e tonificazione ── */
  {
    id:'donna-glute',name:'Donna — Glute & Legs Focus',icon:'🍑',color:'var(--purple)',
    t:'lower',diff:'beginner',dur:'45',env:'gym',
    goals:['hypertrophy','fat_loss'],levels:['beginner','intermediate'],
    sex:['f'],
    desc:'Programma femminile specializzato su glutei e gambe. Hip thrust, squat e lunges per la forma che vuoi.',
    days:[
      {name:'Lunedì — Glute Focus',type:'lower',rest:false,exercises:[
        {id:'hip-thr',s:'5',r:'12',rs:'90s'},
        {id:'bs',s:'4',r:'10',rs:'90s'},
        {id:'abductor',s:'4',r:'20',rs:'60s'},
        {id:'rdl',s:'4',r:'12',rs:'90s'},
        {id:'leg-curl',s:'4',r:'15',rs:'60s'},
        {id:'calf-mach',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Martedì — Upper + Core',type:'push',rest:false,exercises:[
        {id:'lat-pull',s:'4',r:'12',rs:'75s'},
        {id:'ip',s:'3',r:'12',rs:'75s'},
        {id:'db-ohp',s:'3',r:'12',rs:'75s'},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s'},
        {id:'bic-db',s:'3',r:'15',rs:'60s'},
        {id:'ab-crunch',s:'4',r:'20',rs:'45s'},
        {id:'plank',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Quad & Glute',type:'lower',rest:false,exercises:[
        {id:'hack-sq',s:'4',r:'12',rs:'90s'},
        {id:'leg-press',s:'4',r:'15',rs:'75s'},
        {id:'leg-ext',s:'4',r:'15',rs:'60s'},
        {id:'hip-thr',s:'4',r:'15',rs:'75s'},
        {id:'ct-lunge',s:'4',r:'12',rs:'60s'},
        {id:'abductor',s:'4',r:'20',rs:'60s'},
      ]},
      {name:'Venerdì — HIIT + Core',type:'cardio',rest:false,exercises:[
        {id:'squat-j',s:'4',r:'40s',rs:'20s'},
        {id:'burpees',s:'3',r:'30s',rs:'30s'},
        {id:'mt-cl',s:'4',r:'40s',rs:'20s'},
        {id:'ab-crunch',s:'3',r:'20',rs:'45s'},
        {id:'side-plank',s:'3',r:'40s',rs:'30s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'donna-tono',name:'Donna — Tonificazione Total Body',icon:'💃',color:'var(--teal)',
    t:'full',diff:'beginner',dur:'40',env:'gym',
    goals:['fat_loss','hypertrophy'],levels:['beginner'],
    sex:['f'],
    desc:'Circuiti total body con pesi moderati e cardio integrato. Tono, definizione e resistenza.',
    days:[
      {name:'Lunedì — Total Body A',type:'full',rest:false,exercises:[
        {id:'leg-press',s:'3',r:'15',rs:'60s'},
        {id:'lat-pull',s:'3',r:'12',rs:'60s'},
        {id:'hip-thr',s:'3',r:'15',rs:'60s'},
        {id:'pec-deck',s:'3',r:'15',rs:'60s'},
        {id:'ab-crunch',s:'3',r:'20',rs:'45s'},
        {id:'jump-j',s:'3',r:'40s',rs:'20s'},
      ]},
      {name:'Martedì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Mercoledì — Total Body B',type:'full',rest:false,exercises:[
        {id:'hack-sq',s:'3',r:'15',rs:'60s'},
        {id:'seated-row',s:'3',r:'12',rs:'60s'},
        {id:'abductor',s:'3',r:'20',rs:'45s'},
        {id:'db-ohp',s:'3',r:'12',rs:'60s'},
        {id:'plank',s:'3',r:'45s',rs:'45s'},
        {id:'mt-cl',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Giovedì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Venerdì — HIIT Total Body',type:'cardio',rest:false,exercises:[
        {id:'squat-j',s:'4',r:'40s',rs:'20s'},
        {id:'hip-thr',s:'3',r:'15',rs:'60s'},
        {id:'burpees',s:'3',r:'30s',rs:'30s'},
        {id:'lat-mach',s:'3',r:'15',rs:'60s'},
        {id:'ab-crunch',s:'3',r:'20',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'donna-cali',name:'Donna — Calisthenics & Shape',icon:'🌸',color:'var(--green)',
    t:'calisthenics',diff:'beginner',dur:'35',env:'calisthenics',
    goals:['hypertrophy','mobility','fat_loss'],levels:['beginner','intermediate'],
    sex:['f'],
    desc:'Corpo libero al femminile. Push-up, squat, glute bridge e hollow body per una forma atletica.',
    days:[
      {name:'Push + Core',type:'push',rest:false,exercises:[
        {id:'push-up',s:'4',r:'8',rs:'60s'},
        {id:'ct-pike',s:'3',r:'10',rs:'75s'},
        {id:'ct-hollow',s:'4',r:'35s',rs:'45s'},
        {id:'side-plank',s:'3',r:'40s',rs:'30s'},
        {id:'plank',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Lower + Glute',type:'lower',rest:false,exercises:[
        {id:'ct-squat',s:'4',r:'20',rs:'60s'},
        {id:'ct-lunge',s:'4',r:'12',rs:'60s'},
        {id:'glute-b',s:'5',r:'20',rs:'45s'},
        {id:'ct-wall',s:'3',r:'60s',rs:'45s'},
        {id:'ct-calf',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body HIIT',type:'cardio',rest:false,exercises:[
        {id:'squat-j',s:'4',r:'40s',rs:'20s'},
        {id:'mt-cl',s:'4',r:'30s',rs:'30s'},
        {id:'ct-hiit1',s:'3',r:'30s',rs:'30s'},
        {id:'glute-b',s:'3',r:'20',rs:'45s'},
        {id:'ct-hollow',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ── SENIOR / OVER 40 ── */
  {
    id:'senior-3day',name:'Over 40 — Forza & Salute',icon:'🧓',color:'var(--blue)',
    t:'full',diff:'beginner',dur:'45',env:'gym',
    goals:['strength','mobility'],levels:['beginner','intermediate'],
    ageGroup:'senior',
    desc:'Programma pensato per over 40: carichi moderati, recupero lungo, focus su tecnica e prevenzione infortuni.',
    days:[
      {name:'Lunedì — Upper',type:'push',rest:false,exercises:[
        {id:'lat-pull',s:'3',r:'12',rs:'90s'},
        {id:'ip',s:'3',r:'12',rs:'90s'},
        {id:'seated-row',s:'3',r:'12',rs:'90s'},
        {id:'db-ohp',s:'3',r:'12',rs:'90s'},
        {id:'bic-db',s:'3',r:'12',rs:'75s'},
        {id:'tri-rope',s:'3',r:'12',rs:'75s'},
      ]},
      {name:'Martedì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Mercoledì — Lower',type:'lower',rest:false,exercises:[
        {id:'leg-press',s:'3',r:'12',rs:'90s'},
        {id:'rdl',s:'3',r:'12',rs:'90s'},
        {id:'leg-ext',s:'3',r:'15',rs:'75s'},
        {id:'leg-curl',s:'3',r:'15',rs:'75s'},
        {id:'hip-thr',s:'3',r:'15',rs:'75s'},
        {id:'calf-mach',s:'3',r:'20',rs:'60s'},
      ]},
      {name:'Giovedì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Venerdì — Full Body leggero',type:'full',rest:false,exercises:[
        {id:'leg-press',s:'2',r:'15',rs:'75s'},
        {id:'lat-pull',s:'2',r:'15',rs:'75s'},
        {id:'pec-deck',s:'2',r:'15',rs:'75s'},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s'},
        {id:'plank',s:'3',r:'45s',rs:'45s'},
        {id:'ab-crunch',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'senior-cali',name:'Over 40 — Corpo Libero',icon:'🌿',color:'var(--teal)',
    t:'calisthenics',diff:'beginner',dur:'35',env:'calisthenics',
    goals:['mobility','strength'],levels:['beginner'],
    ageGroup:'senior',
    desc:'Mobilità, forza funzionale e recupero. Programma leggero ma efficace per mantenere il corpo attivo.',
    days:[
      {name:'Sessione A',type:'full',rest:false,exercises:[
        {id:'ct-incl',s:'3',r:'8',rs:'75s'},
        {id:'row',s:'3',r:'10',rs:'75s'},
        {id:'ct-squat',s:'3',r:'12',rs:'75s'},
        {id:'glute-b',s:'3',r:'15',rs:'60s'},
        {id:'plank',s:'3',r:'40s',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione B — Mobilità',type:'custom',rest:false,exercises:[
        {id:'ct-wall',s:'3',r:'60s',rs:'30s'},
        {id:'hollow',s:'3',r:'25s',rs:'30s'},
        {id:'side-plank',s:'3',r:'30s',rs:'30s'},
        {id:'ct-lunge',s:'3',r:'8',rs:'60s'},
        {id:'calf',s:'3',r:'15',rs:'45s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Sessione C — Full body',type:'full',rest:false,exercises:[
        {id:'push-up',s:'3',r:'8',rs:'75s'},
        {id:'ct-row',s:'3',r:'10',rs:'75s'},
        {id:'ct-glute',s:'3',r:'15',rs:'60s'},
        {id:'ct-hollow',s:'3',r:'25s',rs:'45s'},
        {id:'jump-j',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ── SPECIALIZZAZIONE MUSCOLARE ── */
  {
    id:'spec-chest',name:'Petto Specializzato',icon:'🔴',color:'var(--red)',
    t:'push',diff:'intermediate',dur:'55',env:'gym',
    goals:['hypertrophy'],levels:['intermediate','advanced'],
    desc:'4 sessioni: 2 dedicate al petto, upper e lower complementari. Massimo volume pettorale.',
    days:[
      {name:'Lunedì — Petto Volume',type:'push',rest:false,exercises:[
        {id:'bp',s:'5',r:'10',rs:'90s'},
        {id:'ip',s:'4',r:'12',rs:'75s'},
        {id:'fly',s:'4',r:'15',rs:'60s'},
        {id:'pec-deck',s:'4',r:'15',rs:'60s'},
        {id:'cfly',s:'3',r:'15',rs:'60s'},
        {id:'tri-rope',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Martedì — Back',type:'pull',rest:false,exercises:[
        {id:'dl',s:'4',r:'6',rs:'180s'},
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'seated-row',s:'4',r:'12',rs:'90s'},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s'},
        {id:'bic-bar',s:'4',r:'12',rs:'75s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Petto Forza',type:'push',rest:false,exercises:[
        {id:'bp',s:'5',r:'5',rs:'180s'},
        {id:'dp',s:'4',r:'8',rs:'120s'},
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'ip',s:'3',r:'12',rs:'75s'},
        {id:'skull',s:'4',r:'12',rs:'75s'},
      ]},
      {name:'Venerdì — Legs',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'8',rs:'150s'},
        {id:'rdl',s:'4',r:'10',rs:'120s'},
        {id:'leg-ext',s:'4',r:'15',rs:'60s'},
        {id:'leg-curl',s:'4',r:'15',rs:'75s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'spec-back',name:'Schiena Specializzata',icon:'🟢',color:'var(--green)',
    t:'pull',diff:'intermediate',dur:'55',env:'gym',
    goals:['hypertrophy','strength'],levels:['intermediate','advanced'],
    desc:'2 sessioni schiena a settimana: larghezza e spessore. Lat machine, rematori e stacco varianti.',
    days:[
      {name:'Lunedì — Schiena Larghezza',type:'pull',rest:false,exercises:[
        {id:'lat-pull',s:'5',r:'10',rs:'90s'},
        {id:'pull-up-w',s:'4',r:'6',rs:'90s'},
        {id:'cable-row',s:'4',r:'12',rs:'75s'},
        {id:'rev-fly',s:'4',r:'15',rs:'60s'},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s'},
        {id:'bic-bar',s:'4',r:'12',rs:'75s'},
      ]},
      {name:'Martedì — Push',type:'push',rest:false,exercises:[
        {id:'bp',s:'4',r:'8',rs:'120s'},
        {id:'mil-press',s:'4',r:'10',rs:'90s'},
        {id:'lat-mach',s:'4',r:'15',rs:'60s'},
        {id:'fly',s:'3',r:'15',rs:'60s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Schiena Spessore',type:'pull',rest:false,exercises:[
        {id:'dl',s:'4',r:'5',rs:'240s'},
        {id:'t-row',s:'5',r:'8',rs:'120s'},
        {id:'seated-row',s:'4',r:'10',rs:'90s'},
        {id:'lat-pull',s:'4',r:'12',rs:'90s'},
        {id:'bic-db',s:'4',r:'12',rs:'75s'},
      ]},
      {name:'Venerdì — Legs',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'8',rs:'150s'},
        {id:'rdl',s:'4',r:'10',rs:'120s'},
        {id:'leg-press',s:'4',r:'12',rs:'90s'},
        {id:'hip-thr',s:'4',r:'15',rs:'75s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'spec-shoulder',name:'Spalle Specializzate',icon:'🔵',color:'var(--blue)',
    t:'push',diff:'intermediate',dur:'50',env:'gym',
    goals:['hypertrophy'],levels:['intermediate','advanced'],
    desc:'Costruisci spalle tonde e proporzionate. 2 sessioni spalle: overhead, laterali, posteriori.',
    days:[
      {name:'Lunedì — Spalle + Push',type:'push',rest:false,exercises:[
        {id:'mil-press',s:'5',r:'8',rs:'120s'},
        {id:'db-ohp',s:'4',r:'10',rs:'90s'},
        {id:'lat-mach',s:'5',r:'15',rs:'60s'},
        {id:'face-pull-c',s:'4',r:'20',rs:'60s'},
        {id:'rev-fly',s:'4',r:'15',rs:'60s'},
        {id:'bp',s:'3',r:'10',rs:'90s'},
      ]},
      {name:'Martedì — Pull',type:'pull',rest:false,exercises:[
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'seated-row',s:'4',r:'12',rs:'90s'},
        {id:'t-row',s:'4',r:'10',rs:'90s'},
        {id:'bic-bar',s:'4',r:'12',rs:'75s'},
        {id:'bic-db',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Spalle Volume',type:'push',rest:false,exercises:[
        {id:'db-ohp',s:'4',r:'12',rs:'90s'},
        {id:'lat-mach',s:'6',r:'15',rs:'60s'},
        {id:'face-pull-c',s:'5',r:'20',rs:'60s'},
        {id:'rev-fly',s:'5',r:'15',rs:'60s'},
        {id:'hspu',s:'3',r:'5',rs:'120s'},
      ]},
      {name:'Venerdì — Legs',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'8',rs:'150s'},
        {id:'rdl',s:'4',r:'10',rs:'120s'},
        {id:'leg-press',s:'4',r:'12',rs:'90s'},
        {id:'hip-thr',s:'4',r:'15',rs:'75s'},
        {id:'calf-mach',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'spec-arms',name:'Braccia Specializzate',icon:'💪',color:'var(--orange)',
    t:'push',diff:'intermediate',dur:'50',env:'gym',
    goals:['hypertrophy'],levels:['intermediate','advanced'],
    desc:'2 sessioni braccia: curl varianti per bicipiti, overhead e corde per tricipiti. Volume massiccio.',
    days:[
      {name:'Lunedì — Braccia + Petto',type:'push',rest:false,exercises:[
        {id:'bic-bar',s:'4',r:'10',rs:'75s'},
        {id:'bic-db',s:'4',r:'12',rs:'60s'},
        {id:'skull',s:'4',r:'12',rs:'75s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
        {id:'bp',s:'4',r:'10',rs:'90s'},
        {id:'fly',s:'3',r:'15',rs:'60s'},
      ]},
      {name:'Martedì — Schiena',type:'pull',rest:false,exercises:[
        {id:'lat-pull',s:'4',r:'10',rs:'90s'},
        {id:'seated-row',s:'4',r:'12',rs:'90s'},
        {id:'dl',s:'3',r:'6',rs:'180s'},
        {id:'face-pull-c',s:'3',r:'20',rs:'60s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Braccia Volume',type:'push',rest:false,exercises:[
        {id:'bic-cab',s:'5',r:'15',rs:'60s'},
        {id:'bic-db',s:'4',r:'15',rs:'60s'},
        {id:'hammer-c',s:'4',r:'15',rs:'60s'},
        {id:'tri-dip-mach',s:'4',r:'15',rs:'60s'},
        {id:'skull',s:'4',r:'12',rs:'75s'},
        {id:'tri-rope',s:'4',r:'15',rs:'60s'},
      ]},
      {name:'Venerdì — Legs + Spalle',type:'lower',rest:false,exercises:[
        {id:'bs',s:'4',r:'8',rs:'150s'},
        {id:'rdl',s:'4',r:'10',rs:'120s'},
        {id:'mil-press',s:'4',r:'10',rs:'90s'},
        {id:'lat-mach',s:'4',r:'15',rs:'60s'},
        {id:'calf-mach',s:'4',r:'20',rs:'45s'},
      ]},
      {name:'Sabato — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ── SPORT-SPECIFICI ── */
  {
    id:'sport-endurance',name:'Endurance Athlete',icon:'🏃',color:'var(--blue)',
    t:'cardio',diff:'intermediate',dur:'45',env:'calisthenics',
    goals:['endurance','fat_loss'],levels:['intermediate','advanced'],
    desc:'Resistenza cardiovascolare, forza funzionale e mobilità. Per runner, ciclisti e sport di durata.',
    days:[
      {name:'Lunedì — Forza Funzionale',type:'full',rest:false,exercises:[
        {id:'squat-w',s:'4',r:'12',rs:'75s'},
        {id:'push-up',s:'4',r:'15',rs:'60s'},
        {id:'row',s:'4',r:'12',rs:'60s'},
        {id:'nordic',s:'3',r:'6',rs:'90s'},
        {id:'hollow',s:'3',r:'45s',rs:'45s'},
      ]},
      {name:'Martedì — Resistenza',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'5',r:'45s',rs:'15s'},
        {id:'squat-j',s:'5',r:'45s',rs:'15s'},
        {id:'mt-cl',s:'5',r:'45s',rs:'15s'},
        {id:'hi-kn',s:'5',r:'45s',rs:'15s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Forza Lower',type:'lower',rest:false,exercises:[
        {id:'bss',s:'4',r:'12',rs:'75s'},
        {id:'pistol',s:'3',r:'6',rs:'90s'},
        {id:'nordic',s:'3',r:'6',rs:'90s'},
        {id:'glute-b',s:'4',r:'15',rs:'60s'},
        {id:'calf',s:'5',r:'20',rs:'45s'},
      ]},
      {name:'Venerdì — HIIT Lungo',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'6',r:'40s',rs:'20s'},
        {id:'squat-j',s:'5',r:'40s',rs:'20s'},
        {id:'mt-cl',s:'6',r:'40s',rs:'20s'},
        {id:'sprint',s:'5',r:'30s',rs:'30s'},
      ]},
      {name:'Sabato — Mobilità',type:'custom',rest:false,exercises:[
        {id:'plank',s:'3',r:'60s',rs:'30s'},
        {id:'ct-wall',s:'3',r:'60s',rs:'30s'},
        {id:'hollow',s:'3',r:'40s',rs:'30s'},
        {id:'side-plank',s:'3',r:'45s',rs:'30s'},
      ]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
  {
    id:'sport-martial',name:'MMA & Arti Marziali',icon:'🥊',color:'var(--red)',
    t:'cardio',diff:'advanced',dur:'55',env:'calisthenics',
    goals:['strength','endurance','fat_loss'],levels:['intermediate','advanced','athlete'],
    desc:'Potenza esplosiva, resistenza anaerobica e forza funzionale per le arti marziali. Senza attrezzi.',
    days:[
      {name:'Lunedì — Forza Esplosiva Upper',type:'push',rest:false,exercises:[
        {id:'push-up-w',s:'5',r:'8',rs:'90s'},
        {id:'pull-exp',s:'5',r:'5',rs:'120s'},
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'archer-pu',s:'3',r:'6',rs:'90s'},
        {id:'hollow',s:'3',r:'50s',rs:'45s'},
      ]},
      {name:'Martedì — Condizionamento',type:'cardio',rest:false,exercises:[
        {id:'burpees',s:'6',r:'30s',rs:'30s'},
        {id:'squat-j',s:'5',r:'30s',rs:'30s'},
        {id:'mt-cl',s:'6',r:'30s',rs:'30s'},
        {id:'sprint',s:'5',r:'20s',rs:'40s'},
        {id:'ct-hiit2',s:'5',r:'30s',rs:'30s'},
      ]},
      {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Giovedì — Lower Potenza',type:'lower',rest:false,exercises:[
        {id:'pistol-w',s:'5',r:'5',rs:'120s'},
        {id:'squat-j',s:'5',r:'8',rs:'75s'},
        {id:'nordic',s:'4',r:'6',rs:'120s'},
        {id:'bss',s:'4',r:'8',rs:'90s'},
        {id:'dragon-f',s:'3',r:'5',rs:'75s'},
      ]},
      {name:'Venerdì — Full Power',type:'full',rest:false,exercises:[
        {id:'mu',s:'4',r:'4',rs:'180s'},
        {id:'pull-exp',s:'4',r:'5',rs:'120s'},
        {id:'dips-w',s:'4',r:'8',rs:'90s'},
        {id:'pistol',s:'3',r:'6',rs:'90s'},
        {id:'burpees',s:'5',r:'40s',rs:'20s'},
      ]},
      {name:'Sabato — Condizionamento',type:'cardio',rest:false,exercises:[
        {id:'ct-hiit1',s:'6',r:'30s',rs:'30s'},
        {id:'ct-hiit2',s:'6',r:'30s',rs:'30s'},
        {id:'sprint',s:'8',r:'20s',rs:'40s'},
        {id:'hi-kn',s:'5',r:'30s',rs:'30s'},
      ]},
      {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },

  /* ── IBRIDO speciali ── */
  {
    id:'hybrid-beginner',name:'Ibrido — Primo Programma',icon:'🌱',color:'var(--green)',
    t:'full',diff:'beginner',dur:'40',env:'hybrid',
    goals:['hypertrophy','strength'],levels:['beginner'],
    desc:'Introduzione all\'allenamento ibrido. Pesi liberi di base + sbarra. Perfetto per chi inizia con entrambi.',
    days:[
      {name:'Full Body A',type:'full',rest:false,exercises:[
        {id:'push-up',s:'3',r:'10',rs:'60s'},
        {id:'lat-pull',s:'3',r:'12',rs:'75s'},
        {id:'bs',s:'3',r:'10',rs:'90s'},
        {id:'plank',s:'3',r:'40s',rs:'45s'},
        {id:'burpees',s:'3',r:'8',rs:'60s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body B',type:'full',rest:false,exercises:[
        {id:'dips',s:'3',r:'8',rs:'75s'},
        {id:'row',s:'3',r:'12',rs:'60s'},
        {id:'leg-press',s:'3',r:'12',rs:'90s'},
        {id:'hollow',s:'3',r:'35s',rs:'45s'},
        {id:'mt-cl',s:'3',r:'30s',rs:'30s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Full Body C',type:'full',rest:false,exercises:[
        {id:'bp',s:'3',r:'8',rs:'90s'},
        {id:'pull-up',s:'3',r:'5',rs:'90s'},
        {id:'rdl',s:'3',r:'10',rs:'90s'},
        {id:'ct-hollow',s:'3',r:'40s',rs:'45s'},
        {id:'jump-j',s:'3',r:'40s',rs:'20s'},
      ]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
      {name:'Riposo',type:'rest',rest:true,exercises:[]},
    ]
  },
];

V35.forEach(p => {
  if(!PRESETS_DATA.find(x=>x.id===p.id)) PRESETS_DATA.push(p);
});

// Aggiorna anche WORKOUT_PRESETS alias
if(typeof WORKOUT_PRESETS !== 'undefined') window.WORKOUT_PRESETS = PRESETS_DATA;

})(); // end addV35Presets

/* ═══════════════════════════════════════════════════════════════
   FITTRACK PREMIUM SYSTEM — V33
   - isPremium() controlla lo stato abbonamento
   - PREMIUM_PRESETS = preset solo Premium
   - FREE_PRESETS    = preset gratuiti
   - showPaywall()   apre il modal abbonamento
   - activatePremium() attiva (demo/sandbox)
═══════════════════════════════════════════════════════════════ */
(function premiumSystem(){

/* ── 1. CONFIGURAZIONE PIANI ─────────────────────────────────── */
const PLANS = [
  {
    id:'yearly',
    label:'Annuale',
    price:'€9,99',
    period:'/ anno',
    badge:'🔥 Miglior valore',
    highlight:true,
    description:'Equivale a €0,83/mese — cancella quando vuoi.',
    googleProductId:'fittrack_premium_yearly'
  },
  {
    id:'monthly',
    label:'Mensile',
    price:'€2,99',
    period:'/ mese',
    badge:null,
    highlight:false,
    description:'Accesso completo. Rinnovo mensile, disdici quando vuoi.',
    googleProductId:'fittrack_premium_monthly'
  }
];

/* ── 2. PRESET FREE vs PREMIUM ───────────────────────────────── */
// IDs dei preset gratuiti (visibili a tutti)
const FREE_PRESET_IDS = [
  'casa-full','casa-starter','hiit','hiit-beginner','mob',
  'cali-starter','full-beginner','ppl-beginner','forza-base','core-base'
];
// IDs dei preset Premium (bloccati per utenti free)
const PREMIUM_PRESET_IDS = [
  'cali-base','cali-intermediate','cali5','cali-skill',
  'ppl','ppl-6day','upper-lower','forza','casa-cal',
  'full-intermediate','hiit-advanced','core-advanced','mob-advanced',
  'athlete-full','lean-mass',
  'gym-beginner','gym-ppl','gym-hypertrophy','gym-strength','gym-powerbuilding',
  'gym-upper-lower','gym-ppl-6day','gym-arnold','gym-fbw',
  'hybrid-starter','hybrid-ppl','hybrid-strength','hybrid-athlete'
];

/* ── 3. FUNZIONI STATO ───────────────────────────────────────── */
function isPremium(){
  try {
    const data = JSON.parse(localStorage.getItem('ft_premium') || '{}');
    if(!data.active) return false;
    if(data.plan === 'yearly' && data.expiry){
      return Date.now() < new Date(data.expiry).getTime();
    }
    if(data.plan === 'monthly' && data.expiry){
      return Date.now() < new Date(data.expiry).getTime();
    }
    return false;
  } catch(e){ return false; }
}

function getPremiumData(){
  try{ return JSON.parse(localStorage.getItem('ft_premium') || '{}'); }
  catch(e){ return {}; }
}

function savePremiumData(data){
  localStorage.setItem('ft_premium', JSON.stringify(data));
}

/** Attiva Premium (in produzione viene chiamato dopo conferma Google Play Billing) */
function activatePremium(planId){
  const now = new Date();
  let expiry;
  if(planId === 'yearly'){
    expiry = new Date(now.getFullYear()+1, now.getMonth(), now.getDate()).toISOString();
  } else {
    expiry = new Date(now.getFullYear(), now.getMonth()+1, now.getDate()).toISOString();
  }
  savePremiumData({ active:true, plan:planId, since:now.toISOString(), expiry });
  closePaywall();
  showToast('🎉 Benvenuto in FitTrack Premium!');
  // Aggiorna UI
  updatePremiumBadge();
  if(typeof renderPresetExplorer === 'function') renderPresetExplorer();
  if(typeof renderPresetsInTraining === 'function') renderPresetsInTraining();
}

window._confirmCancelPremium = function() {
  const ovl = document.createElement('div');
  ovl.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:9900;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px);';
  ovl.innerHTML = '<div style="background:var(--bg2);border:1.5px solid rgba(255,92,106,.2);border-radius:20px;padding:28px 24px;max-width:320px;width:100%;text-align:center;">'
    + '<div style="font-size:36px;margin-bottom:12px;">💳</div>'
    + '<div style="font-size:17px;font-weight:800;margin-bottom:8px;">Disdire Premium?</div>'
    + '<div style="font-size:13px;color:var(--text2);line-height:1.6;margin-bottom:22px;">Perderai accesso a tutte le funzioni Premium. Puoi riattivarle in qualsiasi momento.</div>'
    + '<div style="display:flex;gap:10px;">'
    + '<button onclick="this.closest(\'div[style*=inset]\').remove()" style="flex:1;padding:13px;background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r-lg);font-family:\'Syne\',sans-serif;font-size:14px;font-weight:700;color:var(--text);cursor:pointer;">Mantieni</button>'
    + '<button onclick="this.closest(\'div[style*=inset]\').remove();cancelPremium()" style="flex:1;padding:13px;background:rgba(255,92,106,.12);border:1.5px solid rgba(255,92,106,.35);border-radius:var(--r-lg);font-family:\'Syne\',sans-serif;font-size:14px;font-weight:800;color:var(--red);cursor:pointer;">Disdici</button>'
    + '</div></div>';
  document.body.appendChild(ovl);
};

function cancelPremium(){
  savePremiumData({ active:false });
  updatePremiumBadge();
  showToast('Abbonamento disattivato');
}

/* ── 4. BADGE HEADER ─────────────────────────────────────────── */
function updatePremiumBadge(){
  document.querySelectorAll('.ft-premium-badge').forEach(el => el.remove());
  if(!isPremium()) return;
  const headers = document.querySelectorAll('.home-header, .coach-head, .page > div:first-child');
  // metti il badge nel version footer
  const footer = document.getElementById('ft-version-footer');
  if(footer){
    footer.innerHTML = `FitTrack AI V33 · Dati salvati localmente &nbsp;<span style="background:linear-gradient(90deg,#C8F53C,#A8D828);color:#080810;font-size:10px;font-weight:800;padding:2px 9px;border-radius:99px;">⭐ PREMIUM</span>`;
  }
}

/* ── 5. MODAL PAYWALL ────────────────────────────────────────── */
function showPaywall(triggerPresetId){
  // rimuovi istanza precedente
  const old = document.getElementById('ft-paywall-modal');
  if(old) old.remove();

  const modal = document.createElement('div');
  modal.id = 'ft-paywall-modal';
  modal.style.cssText = `
    position:fixed;inset:0;z-index:99999;
    background:rgba(6,6,14,0.92);
    backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);
    display:flex;flex-direction:column;
    overflow-y:auto;
    animation:slideUp .32s cubic-bezier(.22,1,.36,1);
  `;

  modal.innerHTML = `
    <div style="max-width:420px;margin:0 auto;width:100%;padding:24px 20px 40px;min-height:100%;display:flex;flex-direction:column;">

      
      <div style="display:flex;justify-content:flex-end;margin-bottom:4px;">
        <button onclick="closePaywall()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:99px;width:36px;height:36px;font-size:18px;color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>

      
      <div style="text-align:center;margin-bottom:28px;">
        <div style="font-size:52px;margin-bottom:10px;animation:float 3s ease-in-out infinite;">⭐</div>
        <div style="font-family:'Bebas Neue',sans-serif;font-size:36px;letter-spacing:.04em;background:linear-gradient(90deg,#C8F53C,#A8D828,#C8F53C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">FitTrack Premium</div>
        <div style="font-size:14px;color:var(--text2);margin-top:6px;line-height:1.5;">Sblocca tutto per soli €9,99 all'anno.<br>Meno di un caffè al mese.</div>
      </div>

      
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:var(--r-lg);padding:18px;margin-bottom:20px;">
        ${[
          ['✅','Tutti i preset (PPL, Forza, Calisthenics avanzato, Casa Intermedio)'],
          ['✅','Programmi illimitati personalizzati'],
          ['✅','Coach IA senza limiti'],
          ['✅','Analisi avanzata progressi'],
          ['✅','Niente pubblicità'],
          ['❌','(Free) Solo 3 preset base'],
          ['❌','(Free) Pubblicità tra gli esercizi'],
        ].map(([ico,txt],i)=>`
          <div style="display:flex;align-items:flex-start;gap:10px;${i<5?'color:var(--text)':'color:var(--text3);text-decoration:line-through'};padding:7px 0;${i>0?'border-top:1px solid rgba(255,255,255,0.04)':''}">
            <span style="flex-shrink:0;font-size:15px;">${ico}</span>
            <span style="font-size:13px;font-weight:600;line-height:1.4;">${txt}</span>
          </div>`).join('')}
      </div>

      
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;" id="ft-plan-selector">
        ${PLANS.map(p=>`
          <div class="ft-plan-card" data-plan="${p.id}"
            onclick="selectPlan('${p.id}')"
            style="border-radius:var(--r-lg);padding:16px 18px;cursor:pointer;transition:all .2s;
              border:2px solid ${p.highlight?'var(--acc)':'rgba(255,255,255,0.09)'};
              background:${p.highlight?'rgba(200,245,60,0.06)':'rgba(255,255,255,0.03)'};
              position:relative;">
            ${p.badge?`<div style="position:absolute;top:-10px;right:14px;background:var(--acc);color:#080810;font-size:10px;font-weight:800;padding:3px 10px;border-radius:99px;">${p.badge}</div>`:''}
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div>
                <div style="font-size:16px;font-weight:800;${p.highlight?'color:var(--acc)':'color:var(--text)'}">${p.label}</div>
                <div style="font-size:11px;color:var(--text2);margin-top:3px;">${p.description}</div>
              </div>
              <div style="text-align:right;flex-shrink:0;margin-left:12px;">
                <div style="font-size:22px;font-weight:800;${p.highlight?'color:var(--acc)':'color:var(--text)'}">${p.price}</div>
                <div style="font-size:11px;color:var(--text2);">${p.period}</div>
              </div>
            </div>
          </div>`).join('')}
      </div>

      
      <button id="ft-subscribe-btn" onclick="handleSubscribe()"
        style="width:100%;padding:17px;border-radius:var(--r-lg);border:none;
          background:linear-gradient(90deg,#C8F53C,#A8D828);
          color:#080810;font-family:'Syne',sans-serif;font-size:16px;font-weight:800;
          cursor:pointer;letter-spacing:.02em;
          box-shadow:0 8px 32px rgba(200,245,60,0.3);
          transition:all .2s;margin-bottom:12px;">
        🚀 Inizia per €9,99 / Anno
      </button>

      <div style="text-align:center;font-size:11px;color:var(--text3);line-height:1.6;">
        Pagamento sicuro tramite Google Play · Disdici in qualsiasi momento<br>
        <span style="color:var(--text2);">Nessun addebito nascosto.</span>
      </div>

      
      <button onclick="restorePurchase()"
        style="background:none;border:none;color:var(--text2);font-family:'Syne',sans-serif;
          font-size:12px;cursor:pointer;margin-top:14px;text-decoration:underline;text-align:center;width:100%;">
        Ripristina acquisto
      </button>

    </div>
  `;

  document.body.appendChild(modal);
  // Seleziona il piano annuale di default
  selectPlan('yearly');
}

function closePaywall(){
  const m = document.getElementById('ft-paywall-modal');
  if(m){ m.style.animation='fadeIn .2s reverse'; setTimeout(()=>m.remove(), 180); }
}

/* ── 6. SELEZIONE PIANO ──────────────────────────────────────── */
let _selectedPlan = 'yearly';
function selectPlan(planId){
  _selectedPlan = planId;
  document.querySelectorAll('.ft-plan-card').forEach(el => {
    const isSelected = el.dataset.plan === planId;
    el.style.border = isSelected ? '2px solid var(--acc)' : '2px solid rgba(255,255,255,0.09)';
    el.style.background = isSelected ? 'rgba(200,245,60,0.06)' : 'rgba(255,255,255,0.03)';
  });
  const btn = document.getElementById('ft-subscribe-btn');
  const plan = PLANS.find(p=>p.id===planId);
  if(btn && plan){
    btn.textContent = `🚀 Abbonati — ${plan.price} ${plan.period}`;
  }
}

/* ── 7. AVVIO ACQUISTO ───────────────────────────────────────── */
function handleSubscribe(){
  const btn = document.getElementById('ft-subscribe-btn');
  if(btn){ btn.textContent = '⏳ Elaborazione...'; btn.disabled = true; }

  /*
   * 🔧 IN PRODUZIONE — Sostituisci questo blocco con la chiamata
   * reale a Google Play Billing (Android) o StoreKit (iOS):
   *
   * Android (Java/Kotlin in WebView):
   *   Android.launchBillingFlow(_selectedPlan);
   *   // poi dal native chiama: window.onPurchaseSuccess(planId)
   *
   * Per ora simuliamo conferma dopo 1.5s (modalità demo/test)
   */
  setTimeout(()=>{
    activatePremium(_selectedPlan);
  }, 1500);
}

/** Chiamato dal codice Android/iOS dopo conferma acquisto */
window.onPurchaseSuccess = function(planId){
  activatePremium(planId || _selectedPlan);
};

/** Ripristina acquisto precedente */
function restorePurchase(){
  /*
   * 🔧 IN PRODUZIONE: chiama Android.queryPurchases() o StoreKit.restorePurchases()
   * Per ora, controlla localStorage
   */
  if(isPremium()){
    closePaywall();
    showToast('✅ Abbonamento ripristinato!');
  } else {
    showToast('Nessun acquisto trovato per questo account.');
  }
}

/* ── 8. PAYWALL PRESET — sovrascrive renderPresetExplorer ────── */
const _originalRenderPresetExplorer = typeof renderPresetExplorer === 'function'
  ? renderPresetExplorer : null;

window.renderPresetExplorer = function(){
  const root = document.getElementById('esplora-preset-view');
  if(!root) return;

  const premium = isPremium();
  const rec = profile.recPreset ? PRESETS_DATA.find(x=>x.id===profile.recPreset) : null;
  const sorted = rec
    ? [rec, ...PRESETS_DATA.filter(p=>p.id!==rec.id)]
    : PRESETS_DATA;

  // Separa i preset
  const freePresets    = sorted.filter(p => FREE_PRESET_IDS.includes(p.id));
  const premiumPresets = sorted.filter(p => PREMIUM_PRESET_IDS.includes(p.id));

  const renderCard = (p, i, locked) => {
    const tc = (typeof TC !== 'undefined' ? TC[p.t] : null) || {bg:'var(--bg4)',c:'var(--text2)'};
    const activeDays = (p.days||[]).filter(d=>!d.rest);
    const isRec = rec && p.id===rec.id;
    const diffLabel = typeof humanDiff==='function' ? humanDiff(p.diff) : p.diff;
    const diffBg = p.diff==='beginner'?'var(--green-d)':p.diff==='advanced'?'var(--red-d)':'var(--orange-d)';
    const diffC  = p.diff==='beginner'?'var(--green)':p.diff==='advanced'?'var(--red)':'var(--orange)';

    if(locked){
      // Card bloccata
      return `<div style="
          border-radius:var(--r-lg);margin-bottom:10px;overflow:hidden;position:relative;
          background:var(--bg2);border:1.5px solid rgba(255,255,255,0.05);
          opacity:0.75;cursor:pointer;"
        onclick="showPaywall('${p.id}')">
        
        <div style="position:absolute;inset:0;background:rgba(6,6,14,0.45);z-index:2;border-radius:var(--r-lg);display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;">
            <div style="font-size:28px;margin-bottom:4px;">🔒</div>
            <div style="font-size:12px;font-weight:700;color:var(--acc);">Solo Premium</div>
          </div>
        </div>
        <div style="padding:16px;display:flex;align-items:flex-start;gap:12px;filter:blur(1px);">
          <div style="font-size:28px;flex-shrink:0;">${p.icon}</div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:15px;font-weight:800;">${p.name}</div>
            <div style="font-size:12px;color:var(--text2);margin-top:3px;">${p.desc}</div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
              <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:${tc.bg};color:${tc.c};">${p.t}</span>
              <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:${diffBg};color:${diffC};">${diffLabel}</span>
              <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2);">${activeDays.length} giorni/sett.</span>
            </div>
          </div>
        </div>
      </div>`;
    }

    // Card normale (identica alla v32)
    return `<div class="ep-card" style="
        background:${isRec?'linear-gradient(135deg,rgba(200,245,60,.07),rgba(200,245,60,.03))':'var(--bg2)'};
        border:1.5px solid ${isRec?'rgba(200,245,60,.28)':'var(--border)'};
        border-radius:var(--r-lg);margin-bottom:10px;overflow:hidden;position:relative;">
      ${isRec?`<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--acc),var(--green))"></div>`:''}
      <div onclick="toggleEpCard('prem_${i}')" style="padding:16px;cursor:pointer;display:flex;align-items:flex-start;gap:12px;">
        <div style="font-size:28px;flex-shrink:0;">${p.icon}</div>
        <div style="flex:1;min-width:0;">
          ${isRec?`<div style="font-size:9px;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px">🎯 Consigliato per te</div>`:''}
          <div style="font-size:15px;font-weight:800;">${p.name}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:3px;line-height:1.5;">${p.desc}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:${tc.bg};color:${tc.c};">${p.t}</span>
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:${diffBg};color:${diffC};">${diffLabel}</span>
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2);">${activeDays.length} giorni/sett.</span>
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2);">${p.dur} min</span>
          </div>
        </div>
        <div id="ep-arrow-prem_${i}" style="font-size:16px;color:var(--text3);flex-shrink:0;transition:transform .25s;">›</div>
      </div>
      <div class="ep-card-body" id="epb-prem_${i}" style="display:none;border-top:1px solid var(--border);">
        <div style="padding:12px 16px 4px;">
          <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;">Programma settimanale</div>
          ${(p.days||[]).map(d=>{
            const dtc=(typeof TC!=='undefined'?TC[d.type]:null)||{bg:'var(--bg4)',c:'var(--text2)'};
            return `<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);">
              <div style="font-size:18px;">${d.rest?'🛌':'💪'}</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:700;">${d.name}</div>
                ${d.rest?'<div style="font-size:11px;color:var(--text3);">Riposo</div>':`<div style="font-size:11px;color:var(--text2);margin-top:2px;">${(d.exercises||[]).length} esercizi</div>`}
              </div>
              ${!d.rest?`<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:${dtc.bg};color:${dtc.c};">${d.type}</span>`:''}
            </div>`;
          }).join('')}
        </div>
        <div style="padding:12px 16px 16px;">
          ${activeDays.map((d,di)=>`
            <button onclick="startPresetDay('${p.id}',${p.days.indexOf(d)})"
              style="width:100%;padding:11px 14px;text-align:left;background:var(--bg3);
                border:1px solid var(--border);border-radius:var(--r-sm);margin-bottom:6px;
                font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text);
                cursor:pointer;display:flex;align-items:center;gap:10px;">
              <span>▶</span><span>${d.name}</span>
              <span style="margin-left:auto;font-size:11px;color:var(--text2);">${(d.exercises||[]).length} esercizi</span>
            </button>`).join('')}
          <button onclick="startPreset(PRESETS_DATA.find(x=>x.id==='${p.id}'))"
            style="width:100%;padding:13px;background:${isRec?'var(--acc)':'var(--bg3)'};
              color:${isRec?'#080810':'var(--acc)'};
              border:1.5px solid ${isRec?'var(--acc)':'rgba(200,245,60,.3)'};
              border-radius:var(--r-sm);font-family:'Syne',sans-serif;font-size:13px;font-weight:800;
              cursor:pointer;margin-top:2px;">
            ⚡ Avvia primo giorno
          </button>
        </div>
      </div>
    </div>`;
  };

  let html = '';

  // ── Sezione GRATUITA ──
  html += `<div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin:0 4px 10px;">🆓 Piani Gratuiti</div>`;
  html += freePresets.map((p,i)=> renderCard(p, 'f'+i, false)).join('');

  // ── Separatore PREMIUM ──
  html += `
    <div style="margin:20px 0 14px;position:relative;text-align:center;">
      <div style="position:absolute;inset-block-start:50%;left:0;right:0;height:1px;background:rgba(200,245,60,0.2);top:50%;"></div>
      <span style="position:relative;background:var(--bg);padding:0 12px;font-size:11px;font-weight:800;
        color:var(--acc);text-transform:uppercase;letter-spacing:.12em;">⭐ Solo Premium</span>
    </div>`;

  // ── Piani PREMIUM ──
  if(!premium){
    // Banner upgrade
    html += `
      <div onclick="showPaywall()" style="
        background:linear-gradient(135deg,rgba(200,245,60,0.08),rgba(200,245,60,0.03));
        border:1.5px solid rgba(200,245,60,0.3);border-radius:var(--r-lg);
        padding:18px;margin-bottom:14px;cursor:pointer;
        display:flex;align-items:center;gap:14px;">
        <div style="font-size:36px;">⭐</div>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:800;color:var(--acc);">Sblocca tutti i programmi</div>
          <div style="font-size:12px;color:var(--text2);margin-top:3px;">PPL, Forza, Calisthenics avanzato e molto altro. Da €2,50/mese.</div>
        </div>
        <div style="font-size:20px;color:var(--acc);">›</div>
      </div>`;
    html += premiumPresets.map((p,i)=> renderCard(p, 'p'+i, true)).join('');
  } else {
    // Premium attivo — mostra tutto sbloccato
    html += premiumPresets.map((p,i)=> renderCard(p, 'p'+i, false)).join('');
  }

  root.innerHTML = html;
};

/* ── 9. BLOCCO startPresetDay PER PRESET PREMIUM ─────────────── */
const _originalStartPresetDay = typeof startPresetDay === 'function' ? startPresetDay : null;
window.startPresetDay = function(presetId, dayIndex){
  if(PREMIUM_PRESET_IDS.includes(presetId) && !isPremium()){
    showPaywall(presetId);
    return;
  }
  // Aggiorna preset attivo nel profilo
  if(typeof profile !== 'undefined' && profile.recPreset !== presetId){
    profile.recPreset = presetId;
    if(typeof saveAll === 'function') saveAll();
    // Aggiorna UI
    setTimeout(()=>{
      if(typeof renderHomeCta==='function') renderHomeCta();
      if(typeof renderWeeklyProgram==='function'){
        const wp = document.getElementById('weekly-program-view');
        if(wp && wp.children.length > 0) renderWeeklyProgram();
      }
    }, 200);
  }
  if(_originalStartPresetDay) _originalStartPresetDay(presetId, dayIndex);
};

const _originalStartPreset = typeof startPreset === 'function' ? startPreset : null;
window.startPreset = function(preset){
  if(!preset) return;
  if(PREMIUM_PRESET_IDS.includes(preset.id) && !isPremium()){
    showPaywall(preset.id);
    return;
  }
  if(_originalStartPreset) _originalStartPreset(preset);
  // Aggiorna la tab Programma se è visibile
  setTimeout(()=>{
    if(typeof renderWeeklyProgram==='function'){
      const wp = document.getElementById('weekly-program-view');
      if(wp && wp.children.length > 0) renderWeeklyProgram();
    }
  }, 300);
};

/* ── 10. SEZIONE ABBONAMENTO NEL PROFILO ─────────────────────── */
function injectPremiumProfileSection(){
  const footer = document.getElementById('ft-version-footer');
  if(!footer) return;

  const old = document.getElementById('ft-premium-profile-section');
  if(old) old.remove();

  const premium = isPremium();
  const data = getPremiumData();
  const expLabel = data.expiry
    ? new Date(data.expiry).toLocaleDateString('it-IT')
    : '—';

  const section = document.createElement('div');
  section.id = 'ft-premium-profile-section';
  section.style.cssText = 'margin:0 0 12px;';

  if(premium){
    section.innerHTML = `
      <div style="background:linear-gradient(135deg,rgba(200,245,60,0.08),rgba(200,245,60,0.04));
        border:1px solid rgba(200,245,60,0.25);border-radius:var(--r-lg);overflow:hidden;margin-bottom:4px;">
        <div style="padding:16px 18px;display:flex;align-items:center;gap:12px;">
          <div style="font-size:28px;">⭐</div>
          <div style="flex:1;">
            <div style="font-size:14px;font-weight:800;color:var(--acc);">FitTrack Premium Attivo</div>
            <div style="font-size:11px;color:var(--text2);margin-top:2px;">
              Piano: <b style="color:var(--text)">${data.plan==='yearly'?'Annuale':'Mensile'}</b> · Scade: <b style="color:var(--text)">${expLabel}</b>
            </div>
          </div>
          <span style="background:var(--acc);color:#080810;font-size:10px;font-weight:800;padding:3px 10px;border-radius:99px;">ATTIVO</span>
        </div>
        <div style="border-top:1px solid rgba(200,245,60,0.12);padding:10px 18px;display:flex;gap:10px;">
          <button onclick="showPaywall()" style="flex:1;padding:9px;background:rgba(200,245,60,0.08);border:1px solid rgba(200,245,60,0.2);border-radius:var(--r-sm);color:var(--acc);font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Gestisci piano</button>
          <button onclick="window._confirmCancelPremium()" style="flex:1;padding:9px;background:rgba(255,92,106,0.08);border:1px solid rgba(255,92,106,0.2);border-radius:var(--r-sm);color:var(--red);font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Disdici</button>
        </div>
      </div>`;
  } else {
    section.innerHTML = `
`; // premium banner rimosso
  }

  try { if(footer.parentNode && footer.parentNode.contains(footer)) footer.parentNode.insertBefore(section, footer); } catch(e) {}
}

/* ── 11. V41: injectPremiumProfileSection merged into consolidated renderProfilePage ── */
const _origRenderProfilePage = typeof renderProfilePage === 'function' ? renderProfilePage : null;
// V25 renderProfilePage override neutralised

/* ── 12. ESPONI FUNZIONI GLOBALI ─────────────────────────────── */
window.showPaywall      = showPaywall;
window.closePaywall     = closePaywall;
window.selectPlan       = selectPlan;
window.handleSubscribe  = handleSubscribe;
window.activatePremium  = activatePremium;
window.cancelPremium    = cancelPremium;
window.restorePurchase  = restorePurchase;
window.isPremium        = isPremium;

/* ── 13. INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', ()=>{
  updatePremiumBadge();
  injectPremiumProfileSection();
  // Re-render preset explorer se già visibile
  if(typeof renderPresetExplorer === 'function'){
    const el = document.getElementById('esplora-preset-view');
    if(el && el.children.length > 0) renderPresetExplorer();
  }
});

})(); // end premiumSystem

/* ── V35 Onboarding helpers ── */
// ═══════════════════════════════════════════════════════════════
//  CONSOLIDATED obMulti — gestisce eq_, inj_, sport_, perf_ e tutti i tipi
// ═══════════════════════════════════════════════════════════════
window.obMulti = function(el, key){
  el.classList.toggle('sel');
  if(!obSel.multi) obSel.multi = {};

  // 'nessuna' / 'niente' escludono tutti gli altri nella griglia
  if(key.endsWith('_none') || key.endsWith('_niente')){
    var grid = el.closest('.ob-grid');
    if(grid) grid.querySelectorAll('.ob-multi.sel').forEach(function(c){
      if(c !== el) c.classList.remove('sel');
    });
    var baseKey = key.split('_')[0];
    obSel.multi[baseKey+'s'] = el.classList.contains('sel') ? [key] : [];
    obSel[baseKey+'s'] = obSel.multi[baseKey+'s'];
    return;
  }

  // Gestione per tipo di chiave
  if(key.startsWith('eq_')){
    if(!obSel.multi.eqs) obSel.multi.eqs = [];
    var ei = obSel.multi.eqs.indexOf(key);
    if(el.classList.contains('sel') && ei === -1) obSel.multi.eqs.push(key);
    else if(!el.classList.contains('sel') && ei > -1) obSel.multi.eqs.splice(ei, 1);
    obSel.eqs = obSel.multi.eqs;
  } else if(key.startsWith('inj_')){
    if(!obSel.multi.injs) obSel.multi.injs = [];
    var ii = obSel.multi.injs.indexOf(key);
    if(el.classList.contains('sel') && ii === -1) obSel.multi.injs.push(key);
    else if(!el.classList.contains('sel') && ii > -1) obSel.multi.injs.splice(ii, 1);
    obSel.injs = obSel.multi.injs;
  } else if(key.startsWith('sport_')){
    if(!obSel.multi.sports) obSel.multi.sports = [];
    var si = obSel.multi.sports.indexOf(key);
    if(el.classList.contains('sel') && si === -1) obSel.multi.sports.push(key);
    else if(!el.classList.contains('sel') && si > -1) obSel.multi.sports.splice(si, 1);
    obSel.sports = obSel.multi.sports;
  } else if(key.startsWith('perf_')){
    if(!obSel.multi.perfs) obSel.multi.perfs = [];
    var pi = obSel.multi.perfs.indexOf(key);
    if(el.classList.contains('sel') && pi === -1) obSel.multi.perfs.push(key);
    else if(!el.classList.contains('sel') && pi > -1) obSel.multi.perfs.splice(pi, 1);
    obSel.perfs = obSel.multi.perfs;
  } else {
    // Generico: usa prefisso come chiave
    var prefix = key.split('_')[0];
    if(!obSel.multi[prefix+'s']) obSel.multi[prefix+'s'] = [];
    var arr = obSel.multi[prefix+'s'].filter(function(x){ return !x.endsWith('_none') && !x.endsWith('_niente'); });
    var idx = arr.indexOf(key);
    if(el.classList.contains('sel') && idx === -1) arr.push(key);
    else if(!el.classList.contains('sel') && idx > -1) arr.splice(idx, 1);
    obSel.multi[prefix+'s'] = arr;
    obSel[prefix+'s'] = arr;
  }

  // Aggiorna preview smart days se siamo in ob3c
  if(document.getElementById('ob3c') && document.getElementById('ob3c').classList.contains('active')){
    if(typeof obRefreshSmartPreview === 'function') obRefreshSmartPreview();
  }
};

window.obPickVal = function(el, field, val){
  var container = el.closest('.ob-grid') || el.closest('.ob-step');
  if(container) container.querySelectorAll('.ob-card').forEach(function(c){
    c.classList.remove('sel'); c.style.borderColor=''; c.style.background='';
  });
  el.classList.add('sel');
  if(typeof obSel !== 'undefined') obSel[field] = val;
};

window.obPickTime = function(el, val){
  el.closest('div').querySelectorAll('.ob-time-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  obSel.timeOfDay = val;
};

window.obPickEnergy = function(el, val){
  el.closest('#ob-energy-btns').querySelectorAll('.ob-energy-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  obSel.energyLevel = val;
};

window.obPickSex = function(el, val){
  el.closest('.ob-grid').querySelectorAll('.ob-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  obSel.sex = val;
  // Sync with physical data step sex field
  const sexSel = document.getElementById('ob-sex');
  if(sexSel){ sexSel.value = val; if(typeof calcTDEE==='function') calcTDEE(); }
  // Update cycle step content based on sex
  const femContent = document.getElementById('ob6-female-content');
  const maleContent = document.getElementById('ob6-male-content');
  if(femContent) femContent.style.display = val==='f' ? '' : 'none';
  if(maleContent) maleContent.style.display = val==='m' ? '' : 'none';
  // Also show/hide pregnancy field in TDEE step
  const pregWrap = document.getElementById('ob-preg-wrap');
  if(pregWrap) pregWrap.style.display = val==='f' ? '' : 'none';
};

/* ═══════════════════════════════════════════════════════
   V34 — TRAINING ENVIRONMENT SYSTEM
   - obPickEnv()      → selezione in onboarding
   - profile.env      → 'calisthenics'|'gym'|'hybrid'|'home'
   - renderEnvSection → sezione profilo modificabile
   - getRecommendedPresetV34 → matcher con env
═══════════════════════════════════════════════════════ */
(function trainingEnvSystem(){

const ENV_LABELS = {
  calisthenics:{ label:'Corpo Libero', icon:'🤸', desc:'Sbarra, parallele, pavimento' },
  gym:          { label:'Palestra',     icon:'🏋️', desc:'Pesi liberi, macchinari, cavi' },
  hybrid:       { label:'Ibrido',       icon:'🔀', desc:'Corpo libero + palestra' },
  home:         { label:'Casa',         icon:'🏠', desc:'Zero attrezzi, solo pavimento' },
};

/* ── Onboarding pick ── */
window.obPickEnv = function(el, val){
  el.closest('.ob-grid').querySelectorAll('.ob-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  obSel.env = val;
};

/* ── finishOnboard V47 — salva env e delega alla versione principale ── */
var _origFinishOnboardV47 = window.finishOnboard || null;
window.finishOnboard = async function(){
  // Ensure env is in obSel before saving
  if(typeof obSel !== 'undefined' && obSel && obSel.env) {
    window._pendingEnv = obSel.env;
  }
  // Call main finishOnboard (which calls saveAll + launchApp)
  if(typeof _origFinishOnboardV47 === 'function') {
    try { await _origFinishOnboardV47.apply(this, arguments); } catch(e) {
      console.error('[finishOnboard V47]', e);
      // Fallback: force app launch
      var onboard = document.getElementById('scr-onboard');
      var app = document.getElementById('scr-app');
      if(onboard) onboard.classList.remove('active');
      window._ftOnboardingActive = false;
      if(app) { app.classList.add('active'); if(typeof initApp==='function') initApp(); }
    }
  }
  // Patch env post-save
  if(window._pendingEnv && typeof profile!=='undefined' && profile) {
    profile.env = window._pendingEnv;
    if(typeof saveAll==='function') await saveAll();
  }
};

/* ── Sezione profilo modificabile ── */
function injectEnvProfileSection(){
  const premSection = document.getElementById('ft-premium-profile-section');
  if(!premSection) return;

  const old = document.getElementById('ft-env-profile-section');
  if(old) old.remove();

  const currentEnv = (profile && profile.env) || 'calisthenics';
  const envInfo = ENV_LABELS[currentEnv] || ENV_LABELS.calisthenics;

  const section = document.createElement('div');
  section.id = 'ft-env-profile-section';
  section.style.cssText = 'margin-bottom:12px;';
  section.innerHTML = `
    <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">Ambiente di allenamento</div>
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;">
      <div style="padding:14px 16px;display:flex;align-items:center;gap:12px;">
        <div style="font-size:28px;">${envInfo.icon}</div>
        <div style="flex:1;">
          <div style="font-size:14px;font-weight:800;">${envInfo.label}</div>
          <div style="font-size:11px;color:var(--text2);margin-top:2px;">${envInfo.desc}</div>
        </div>
        <button onclick="showEnvPicker()" style="background:var(--acc3);border:1px solid rgba(200,245,60,.2);border-radius:var(--r-sm);padding:7px 12px;color:var(--acc);font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Modifica</button>
      </div>
    </div>`;

  try { if(premSection.parentNode && premSection.parentNode.contains(premSection)) premSection.parentNode.insertBefore(section, premSection); } catch(e) { console.warn("[EnvSection] insertBefore failed", e); }
}

/* ── Modal cambio ambiente ── */
window.showEnvPicker = function(){
  const old = document.getElementById('ft-env-modal');
  if(old) old.remove();

  const current = (profile && profile.env) || 'calisthenics';
  const modal = document.createElement('div');
  modal.id = 'ft-env-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:99998;background:rgba(6,6,14,0.9);backdrop-filter:blur(16px);display:flex;align-items:flex-end;';
  modal.innerHTML = `
    <div style="width:100%;max-width:480px;margin:0 auto;background:var(--bg2);border-radius:24px 24px 0 0;padding:24px 20px 40px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
        <div style="font-size:18px;font-weight:800;">Cambia ambiente</div>
        <button onclick="document.getElementById('ft-env-modal').remove()" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:99px;width:32px;height:32px;font-size:16px;color:var(--text2);cursor:pointer;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>
      ${Object.entries(ENV_LABELS).map(([k,v])=>`
        <div onclick="selectEnv('${k}')" style="
          display:flex;align-items:center;gap:14px;padding:14px 16px;
          border-radius:var(--r);margin-bottom:8px;cursor:pointer;
          background:${k===current?'rgba(200,245,60,0.07)':'var(--bg3)'};
          border:1.5px solid ${k===current?'rgba(200,245,60,0.3)':'rgba(255,255,255,0.05)'};
          transition:all .2s;">
          <div style="font-size:28px;flex-shrink:0">${v.icon}</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:700;${k===current?'color:var(--acc)':''}">${v.label}</div>
            <div style="font-size:11px;color:var(--text2);margin-top:2px;">${v.desc}</div>
          </div>
          ${k===current?'<span style="color:var(--acc);font-size:18px;">✓</span>':''}
        </div>`).join('')}
    </div>`;
  document.body.appendChild(modal);
};

window.selectEnv = async function(env){
  if(typeof profile !== 'undefined'){
    profile.env = env;
    if(typeof saveAll === 'function') await saveAll();
  }
  document.getElementById('ft-env-modal')?.remove();
  if(typeof showToast === 'function') showToast('✅ Ambiente aggiornato: ' + (ENV_LABELS[env]?.label || env));
  // Aggiorna sezione profilo
  if(typeof renderProfilePage === 'function') renderProfilePage();
  // Aggiorna preset explorer se aperto
  if(typeof renderPresetExplorer === 'function'){
    const el = document.getElementById('esplora-preset-view');
    if(el && el.children.length > 0) renderPresetExplorer();
  }
};

/* ── V41: injectEnvProfileSection merged into consolidated renderProfilePage ── */
const _origRenderProfilePageEnv = window.renderProfilePage; // reference kept, override neutralised
// V34 renderProfilePage override neutralised

/* ── Matcher V34: include trainingEnv ── */
const _prevGetRec = window.getRecommendedPresetV19;
window.getRecommendedPresetV34 = function(profile){
  const _WP = (typeof PRESETS_DATA !== 'undefined' ? PRESETS_DATA : []);
  if(!_WP.length) return 'ppl';

  const goals     = profile.goals || [];
  const level     = profile.level || 'intermediate';
  const env       = profile.env || 'calisthenics';
  const days      = parseInt(profile.trainingDays || profile.days) || 3;
  const goalType  = profile.goalsMeta?.goalType || 'maintain';
  const age       = parseInt(profile.physique?.age || profile.age) || 25;
  const sex       = profile.sex || 'm';
  const injuries  = profile.injuries || [];
  const equipment = profile.equipment || [];
  const sessionDur= parseInt(profile.sessionDur) || 45;
  const style     = profile.style || 'moderate_vol';
  const event     = profile.event || 'none';
  const energy    = parseInt(profile.energyLevel) || 3;

  const envMap = {
    calisthenics: ['calisthenics','home'],
    gym:          ['gym'],
    hybrid:       ['gym','calisthenics','hybrid'],
    home:         ['home','calisthenics'],
  };
  const validEnvs = envMap[env] || [];

  const scored = _WP.map(preset => {
    let score = 0;

    // 1. Match ambiente — PESO MASSIMO (0-50 pt)
    const presetEnv = preset.env || 'calisthenics'; // default per preset vecchi
    if(env === 'hybrid'){
      // ibrido accetta tutto ma preferisce preset hybrid
      if(presetEnv === 'hybrid') score += 50;
      else if(presetEnv === 'gym' || presetEnv === 'calisthenics') score += 30;
      else score += 10;
    } else if(env === 'home'){
      if(presetEnv === 'home' || (!preset.env && !preset.id.startsWith('gym'))) score += 50;
      else if(presetEnv === 'calisthenics') score += 30;
      else score -= 20;
    } else if(env === 'gym'){
      if(presetEnv === 'gym') score += 50;
      else score -= 15;
    } else { // calisthenics
      if(!preset.env || presetEnv === 'calisthenics') score += 50;
      else if(presetEnv === 'hybrid') score += 20;
      else score -= 20;
    }

    // 2. Match obiettivi (0-40 pt)
    const matchedGoals = goals.filter(g => (preset.goals || []).includes(g));
    score += matchedGoals.length * 12;
    if(matchedGoals.length === goals.length && goals.length > 0) score += 10;

    // 3. Match livello (0-25 pt)
    if((preset.levels || []).includes(level)) score += 25;
    else if(level === 'intermediate' && (preset.levels || []).includes('beginner')) score += 8;
    else if(level === 'advanced' && (preset.levels || []).includes('intermediate')) score += 5;

    // 4. Match giorni allenamento
    const presetActiveDays = (preset.days || []).filter(d=>!d.rest).length;
    const dayDiff = Math.abs(presetActiveDays - days);
    score += Math.max(0, 15 - dayDiff * 5);

    // 5. goalType match
    if(goalType === 'cut' && (preset.goals || []).includes('fat_loss')) score += 15;
    if(goalType === 'bulk' && (preset.goals || []).includes('hypertrophy')) score += 10;

    // 6. Età
    if(age >= 55 && preset.ageGroup === 'senior') score += 15;
    else if(age >= 55 && preset.ageGroup !== 'senior') score -= 10;

    // 7. Penalità livello troppo alto
    if(level === 'beginner' && (preset.levels||[]).includes('athlete') && !(preset.levels||[]).includes('beginner')) score -= 35;
    if(level === 'zero' && !(preset.levels||[]).some(l=>['zero','beginner'].includes(l))) score -= 50;

    // 8. Sesso — preset specifici donna/uomo (±30 pt)
    if(sex === 'f' && preset.sex && preset.sex.includes('f')) score += 30;
    if(sex === 'm' && preset.sex && preset.sex.includes('f')) score -= 10;

    // 9. Infortuni — penalità preset incompatibili (±25 pt)
    if(injuries.includes('inj_spalla') && (preset.t==='push'||(preset.id||'').includes('spall'))) score -= 20;
    if(injuries.includes('inj_ginocchio') && (preset.t==='lower'||(preset.id||'').includes('gamb')||(preset.id||'').includes('leg'))) score -= 15;
    if(injuries.includes('inj_schiena') && ((preset.id||'').includes('stacco')||(preset.id||'').includes('strength')||(preset.id||'').includes('forza'))) score -= 10;
    if(injuries.length>0 && !injuries.includes('inj_none') && (preset.goals||[]).includes('mobility')) score += 15;

    // 10. Durata sessione (±15 pt)
    const presetDur = parseInt(preset.dur) || 45;
    score += Math.max(0, 15 - Math.abs(presetDur - sessionDur) * 0.3);

    // 11. Stile preferito (±20 pt)
    if(style==='heavy_low' && ((preset.goals||[]).includes('strength')||preset.diff==='advanced')) score += 15;
    if(style==='heavy_low' && (preset.goals||[]).includes('fat_loss')) score -= 10;
    if((style==='high_vol'||style==='cardio_mix') && ((preset.goals||[]).includes('fat_loss')||(preset.goals||[]).includes('endurance')||preset.t==='cardio')) score += 15;
    if(style==='skill_based' && (preset.t==='calisthenics'||(preset.goals||[]).includes('calisthenics'))) score += 20;
    if(style==='moderate_vol' && preset.diff==='intermediate') score += 8;

    // 12. Evento motivazionale (±15 pt)
    if((event==='estate'||event==='matrimonio') && ((preset.goals||[]).includes('fat_loss')||(preset.goals||[]).includes('hypertrophy'))) score += 12;
    if((event==='gara') && ((preset.goals||[]).includes('strength')||(preset.goals||[]).includes('endurance'))) score += 15;
    if(event==='salute' && ((preset.goals||[]).includes('mobility')||preset.ageGroup==='senior')) score += 12;

    // 13. Energia attuale — stanco → più recupero, carico leggero (±15 pt)
    if(energy<=2 && ((preset.goals||[]).includes('mobility')||preset.diff==='beginner')) score += 15;
    if(energy<=2 && (preset.diff==='advanced'||preset.diff==='athlete')) score -= 10;
    if(energy>=4 && (preset.diff==='advanced'||preset.diff==='athlete')) score += 10;

    // 14. Attrezzatura specifica (±20 pt)
    if(equipment.includes('eq_niente') && (preset.env==='home'||(preset.id||'').includes('casa'))) score += 20;
    if(equipment.includes('eq_niente') && preset.env==='gym') score -= 30;
    if(equipment.includes('eq_sbarra') && (preset.t==='calisthenics'||preset.env==='calisthenics')) score += 8;
    if(equipment.includes('eq_bilanciere') && equipment.includes('eq_manubri') && (preset.env==='gym'||preset.env==='hybrid')) score += 10;

    return { id: preset.id, score, env:presetEnv };
  });

  scored.sort((a,b)=>b.score-a.score);
  console.log('[V34] Top 5:', scored.slice(0,5).map(s=>`${s.id}(${s.score})`).join(', '));
  return scored[0]?.id || (env==='gym'?'gym-ppl':'ppl');
};

// Override il matcher globale con V34
window.getRecommendedPresetV19 = function(profile){
  return window.getRecommendedPresetV34(profile);
};

/* ── Override getRecommendedPreset base ── */
const _origBase = window.getRecommendedPreset || function(){ return 'ppl'; };
window.getRecommendedPreset = function(goals, level){
  if(typeof profile !== 'undefined'){
    return window.getRecommendedPresetV34({...profile, goals, level});
  }
  return _origBase(goals, level);
};

/* ── Filtra preset explorer per ambiente ── */
const _prevRenderExplorer = window.renderPresetExplorer;
window.renderPresetExplorer = function(){
  // Richiama il renderer premium esistente (già sovrascrive PRESETS_DATA sort)
  if(_prevRenderExplorer) _prevRenderExplorer();
  // Dopo il render, aggiungi il badge di ambiente su ogni card
  const env = (profile && profile.env) || 'calisthenics';
  const envInfo = ENV_LABELS[env] || ENV_LABELS.calisthenics;
  // Aggiunge un filtro visivo nella sezione preset (se esiste il root)
  const root = document.getElementById('esplora-preset-view');
  if(!root) return;
  // Aggiunge barra filtro ambiente in cima se non esiste
  let filterBar = document.getElementById('ft-env-filter-bar');
  if(!filterBar){
    filterBar = document.createElement('div');
    filterBar.id = 'ft-env-filter-bar';
    filterBar.style.cssText = 'margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;';
    filterBar.innerHTML = `
      <div style="font-size:12px;color:var(--text2);">
        Programmi per: <b style="color:var(--acc)">${envInfo.icon} ${envInfo.label}</b>
      </div>
      <button onclick="showEnvPicker()" style="background:rgba(200,245,60,0.07);border:1px solid rgba(200,245,60,0.2);border-radius:var(--r-sm);padding:5px 10px;color:var(--acc);font-family:'Syne',sans-serif;font-size:11px;font-weight:700;cursor:pointer;">Cambia ⚙️</button>`;
    try { root.insertBefore(filterBar, root.firstChild); } catch(e) { root.appendChild(filterBar); }
  } else {
    filterBar.querySelector('b').textContent = `${envInfo.icon} ${envInfo.label}`;
  }
};

})(); // end trainingEnvSystem

/* ── Sezione "Il Tuo Profilo Fitness" nel profilo ── */
(function profileFitnessSection(){

function injectFitnessProfileDetails(){
  const envSection = document.getElementById('ft-env-profile-section');
  if(!envSection) return;
  const old = document.getElementById('ft-fitness-details');
  if(old) old.remove();

  const inj = profile.injuries || [];
  const eq  = profile.equipment || [];
  const INJ_LABELS = {inj_spalla:'💪 Spalla',inj_schiena:'🦴 Schiena',inj_ginocchio:'🦵 Ginocchio',inj_polso:'🤚 Polso',inj_anca:'🍑 Anca'};
  const EQ_LABELS  = {eq_sbarra:'🏗️ Sbarra',eq_parallele:'🤸 Parallele',eq_manubri:'🏋️ Manubri',eq_bilanciere:'⚖️ Bilanciere',eq_anelli:'⭕ Anelli',eq_banda:'🪢 Bande',eq_kettlebell:'🔔 Kettlebell'};
  const STYLE_LABELS = {heavy_low:'🏋️ Pesante/Forza',moderate_vol:'⚖️ Volume moderato',high_vol:'🔥 Alto volume',skill_based:'🎯 Skill/Tecnica',cardio_mix:'💨 Cardio+Forza'};
  const EVENT_LABELS = {estate:'🏖️ Estate',matrimonio:'💍 Matrimonio',gara:'🏅 Gara',viaggio:'✈️ Viaggio',salute:'❤️ Salute',none:'🎯 Miglioramento continuo'};
  const TIME_LABELS  = {morning:'🌅 Mattina',afternoon:'☀️ Pomeriggio',evening:'🌙 Sera',any:'🎲 Flessibile'};

  const section = document.createElement('div');
  section.id = 'ft-fitness-details';
  section.style.cssText = 'margin-bottom:12px;';
  section.innerHTML = `
    <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">Profilo Fitness Dettagliato</div>
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;">
      ${[
        ['⏱ Sessione', (profile.sessionDur||'45') + ' min · ' + (TIME_LABELS[profile.timeOfDay]||'Flessibile')],
        ['🎨 Stile', STYLE_LABELS[profile.style]||'Moderato'],
        ['🎯 Evento', EVENT_LABELS[profile.event]||'—'],
        ['⚡ Energia', '⭐'.repeat(Math.min(5,parseInt(profile.energyLevel)||3)) + ' ' + (parseInt(profile.energyLevel)||3) + '/5'],
        ['⚠️ Limitazioni', inj.length&&!inj.includes('inj_none') ? inj.map(x=>INJ_LABELS[x]||x).join(', ') : 'Nessuna'],
        ['🛠️ Attrezzatura', eq.length&&!eq.includes('eq_niente') ? eq.map(x=>EQ_LABELS[x]||x).join(', ') : 'Solo pavimento'],
      ].map(([ lbl, val ], i) => `
        <div style="padding:11px 16px;display:flex;justify-content:space-between;align-items:center;${i>0?'border-top:1px solid var(--border)':''}">
          <span style="font-size:12px;font-weight:700;color:var(--text2);">${lbl}</span>
          <span style="font-size:12px;font-weight:700;color:var(--text);text-align:right;max-width:60%;word-break:break-word;">${val}</span>
        </div>`).join('')}
      <div style="border-top:1px solid var(--border);padding:10px 16px;">
        
        
      </div>
    </div>`;

  try { if(envSection.parentNode && envSection.parentNode.contains(envSection)) envSection.parentNode.insertBefore(section, envSection.nextSibling); } catch(e) { console.warn("[EnvSection2] insertBefore failed", e); }
}

// V41: injectFitnessProfileDetails merged into consolidated renderProfilePage
const _prev = window.renderProfilePage; // reference kept, override neutralised
// V39 renderProfilePage override neutralised

})();

/* ══════════════════════════════════════════════════════════════════════
   FitTrack AI  V40  — ADAPTIVE DASHBOARD · DYNAMIC GOALS · RETENTION
   1. Dynamic fitness goals (weight, calories, frequency, objective) 
   2. Goal adaptation over time (realistic suggestions, impossible target detection)
   3. Cycle-phase workout adaptation (females only, Apple Health style cards)
   4. Retention & motivation system (inactivity detection, adaptive tone)
   5. Adaptive personalized dashboard (readiness, recovery, streak, insights)
══════════════════════════════════════════════════════════════════════ */
(function FitTrackV40() {
'use strict';

/* ── CSS INJECTION ── */
const V40_CSS = `
/* ═══ V40 ADAPTIVE DASHBOARD ═══ */
@keyframes v40fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes v40pop{0%{transform:scale(.85);opacity:0}70%{transform:scale(1.04)}100%{transform:scale(1);opacity:1}}
@keyframes v40shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes v40glow{0%,100%{opacity:.7}50%{opacity:1}}
@keyframes v40pulse2{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
@keyframes v40slide{from{transform:translateX(-12px);opacity:0}to{transform:translateX(0);opacity:1}}

/* ── READINESS RING ── */
.v40-readiness-ring{
  position:relative;display:flex;align-items:center;justify-content:center;
  width:86px;height:86px;flex-shrink:0;
}
.v40-readiness-ring svg{transform:rotate(-90deg);}
.v40-ring-bg{fill:none;stroke:var(--bg4);stroke-width:7;}
.v40-ring-fg{fill:none;stroke-width:7;stroke-linecap:round;stroke-dasharray:240;stroke-dashoffset:240;transition:stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1),stroke .5s ease;}
.v40-ring-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.v40-ring-val{font-family:'Bebas Neue',sans-serif;font-size:22px;line-height:1;}
.v40-ring-lbl{font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);}

/* ── ADAPTIVE HERO CARD ── */
.v40-hero{
  margin:0 16px 14px;border-radius:22px;overflow:hidden;
  background:var(--bg2);border:1px solid var(--border2);
  box-shadow:0 6px 32px rgba(0,0,0,.5);
  animation:v40fadeUp .5s cubic-bezier(.22,1,.36,1) both;
  position:relative;
}
.v40-hero::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--acc),var(--green),var(--blue),var(--purple));
  background-size:200% 100%;animation:v40shimmer 4s ease infinite;
}
.v40-hero-top{
  display:flex;align-items:center;gap:14px;
  padding:18px 18px 14px;
}
.v40-hero-info{flex:1;min-width:0;}
.v40-hero-label{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;color:var(--text3);margin-bottom:3px;}
.v40-hero-state{font-size:22px;font-weight:800;letter-spacing:-.5px;color:var(--text);line-height:1.15;}
.v40-hero-sub{font-size:12px;color:var(--text2);margin-top:3px;line-height:1.5;}
.v40-hero-metrics{
  display:grid;grid-template-columns:repeat(3,1fr);
  border-top:1px solid var(--border);
}
.v40-metric{
  display:flex;flex-direction:column;align-items:center;
  padding:12px 8px;border-right:1px solid var(--border);
}
.v40-metric:last-child{border-right:none;}
.v40-metric-val{font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--acc);line-height:1;margin-bottom:2px;}
.v40-metric-lbl{font-size:9px;color:var(--text3);font-weight:700;text-transform:uppercase;letter-spacing:.06em;text-align:center;}
.v40-hero-insight{
  padding:12px 16px;
  background:rgba(200,245,60,.04);
  border-top:1px solid rgba(200,245,60,.08);
  display:flex;align-items:center;gap:10px;
}
.v40-insight-dot{width:6px;height:6px;border-radius:50%;background:var(--acc);flex-shrink:0;animation:v40glow 2s ease infinite;}
.v40-insight-msg{font-size:12px;color:var(--text2);line-height:1.5;flex:1;}
.v40-insight-ico{font-size:18px;flex-shrink:0;}

/* ── TODAY WORKOUT CARD ── */
.v40-today-card{
  margin:0 16px 14px;border-radius:var(--r-xl);overflow:hidden;
  background:var(--bg2);border:1px solid var(--border);
  animation:v40fadeUp .5s .08s cubic-bezier(.22,1,.36,1) both;
}
.v40-today-hdr{
  padding:14px 16px 10px;
  display:flex;align-items:center;justify-content:space-between;
}
.v40-today-label{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:var(--text3);}
.v40-today-badge{
  font-size:10px;font-weight:700;padding:3px 10px;border-radius:99px;
  letter-spacing:.03em;
}
.v40-today-workout{
  display:flex;align-items:center;gap:12px;
  padding:0 16px 14px;
}
.v40-today-ico{
  width:52px;height:52px;border-radius:var(--r);
  display:flex;align-items:center;justify-content:center;
  font-size:22px;flex-shrink:0;
}
.v40-today-name{font-size:16px;font-weight:800;letter-spacing:-.2px;margin-bottom:3px;}
.v40-today-meta{font-size:11px;color:var(--text2);}
.v40-today-btn{
  margin:0 16px 16px;width:calc(100% - 32px);padding:13px;
  background:var(--acc);color:#080810;border:none;
  border-radius:var(--r-lg);font-family:'Syne',sans-serif;
  font-size:14px;font-weight:800;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:8px;
  transition:all .2s;letter-spacing:.02em;
}
.v40-today-btn:hover{background:var(--acc2);transform:translateY(-1px);box-shadow:0 8px 24px rgba(200,245,60,.3);}
.v40-today-btn:active{transform:scale(.98);}

/* ── CYCLE INSIGHT CARDS (Apple Health style) ── */
.v40-cycle-card{
  margin:0 16px 14px;border-radius:var(--r-xl);overflow:hidden;
  animation:v40fadeUp .5s .12s cubic-bezier(.22,1,.36,1) both;
  position:relative;
}
.v40-cycle-inner{
  padding:16px;
  position:relative;z-index:1;
}
.v40-cycle-phase-bar{
  height:3px;width:100%;border-radius:99px;margin-bottom:14px;
  position:relative;overflow:hidden;
}
.v40-cycle-phase-bar::after{
  content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent);
  animation:v40shimmer 3s ease infinite;
}
.v40-cycle-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;}
.v40-cycle-phase-name{font-size:16px;font-weight:800;letter-spacing:-.2px;}
.v40-cycle-day-badge{
  font-size:10px;font-weight:700;padding:4px 12px;border-radius:99px;
  backdrop-filter:blur(8px);
}
.v40-cycle-advice{font-size:12px;line-height:1.65;opacity:.85;margin-bottom:14px;}
.v40-cycle-pills{display:flex;gap:7px;flex-wrap:wrap;}
.v40-cycle-pill{
  font-size:10px;font-weight:700;padding:5px 11px;border-radius:99px;
  letter-spacing:.02em;
}
.v40-cycle-timeline{
  margin-top:12px;padding-top:12px;
  border-top:1px solid rgba(255,255,255,.1);
}
.v40-timeline-track{
  height:6px;background:rgba(255,255,255,.1);border-radius:99px;
  position:relative;overflow:visible;
}
.v40-timeline-fill{
  height:100%;border-radius:99px;position:absolute;top:0;left:0;
  transition:width 1s cubic-bezier(.22,1,.36,1);
}
.v40-timeline-dot{
  position:absolute;top:50%;transform:translate(-50%,-50%);
  width:12px;height:12px;border-radius:50%;
  border:2px solid var(--bg2);box-shadow:0 0 8px rgba(0,0,0,.4);
  transition:left 1s cubic-bezier(.22,1,.36,1);
}
.v40-timeline-phases{
  display:flex;justify-content:space-between;margin-top:6px;
}
.v40-timeline-ph{font-size:8px;font-weight:700;opacity:.6;text-transform:uppercase;letter-spacing:.04em;}

/* ── GOAL CARDS (compact) ── */
.v40-goals-row{
  margin:0 16px 14px;display:grid;grid-template-columns:1fr 1fr;gap:8px;
  animation:v40fadeUp .5s .16s cubic-bezier(.22,1,.36,1) both;
}
.v40-goal-tile{
  background:var(--bg2);border:1.5px solid var(--border);
  border-radius:var(--r-lg);padding:14px;cursor:pointer;
  transition:all .2s;position:relative;overflow:hidden;
}
.v40-goal-tile::after{
  content:'';position:absolute;inset:0;opacity:0;transition:opacity .2s;
  background:linear-gradient(135deg,rgba(200,245,60,.05),transparent);
}
.v40-goal-tile:hover{border-color:var(--border2);transform:translateY(-1px);}
.v40-goal-tile:hover::after{opacity:1;}
.v40-goal-tile:active{transform:scale(.97);}
.v40-goal-tile.has-warn{border-color:rgba(255,154,60,.35);}
.v40-goal-tile.has-ok{border-color:rgba(62,223,138,.25);}
.v40-goal-tile-ico{font-size:18px;margin-bottom:6px;}
.v40-goal-tile-lbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.09em;color:var(--text3);margin-bottom:3px;}
.v40-goal-tile-val{font-size:20px;font-weight:800;color:var(--text);letter-spacing:-.3px;line-height:1;}
.v40-goal-tile-sub{font-size:10px;color:var(--text2);margin-top:3px;line-height:1.4;}
.v40-goal-tile-warn{font-size:9px;font-weight:700;margin-top:6px;padding:3px 8px;border-radius:99px;display:inline-block;}

/* ── MOTIVATION CARD ── */
.v40-moto-card{
  margin:0 16px 14px;border-radius:var(--r-xl);overflow:hidden;
  animation:v40fadeUp .5s .2s cubic-bezier(.22,1,.36,1) both;
  background:var(--bg2);border:1px solid var(--border);
}
.v40-moto-inner{padding:16px;display:flex;gap:12px;align-items:flex-start;}
.v40-moto-pulse{
  width:42px;height:42px;border-radius:var(--r);
  display:flex;align-items:center;justify-content:center;
  font-size:20px;flex-shrink:0;
  animation:v40pulse2 3s ease infinite;
}
.v40-moto-content{}
.v40-moto-label{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;margin-bottom:4px;}
.v40-moto-msg{font-size:13px;color:var(--text);line-height:1.6;font-weight:600;}
.v40-moto-sub{font-size:11px;color:var(--text2);margin-top:4px;line-height:1.5;}

/* ── DYNAMIC GOALS SHEET (enhanced) ── */
.v40-dg-overlay{
  position:fixed;inset:0;z-index:950;
  background:rgba(6,6,14,.92);
  backdrop-filter:blur(20px) saturate(180%);
  -webkit-backdrop-filter:blur(20px) saturate(180%);
  display:flex;align-items:flex-end;justify-content:center;
  animation:fadeIn .2s ease;
}
.v40-dg-sheet{
  width:100%;max-width:480px;
  background:var(--bg2);
  border:1px solid var(--border2);
  border-radius:32px 32px 0 0;
  max-height:90vh;overflow-y:auto;
  animation:slideUp .32s cubic-bezier(.22,1,.36,1) both;
  padding-bottom:calc(32px + env(safe-area-inset-bottom,0px));
}
.v40-dg-bar{
  position:sticky;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--acc),var(--green),var(--blue));
  background-size:200% 100%;animation:v40shimmer 4s ease infinite;
  border-radius:2px 2px 0 0;
  z-index:2;
}
.v40-dg-hdr{
  position:sticky;top:2px;z-index:1;
  background:var(--bg2);
  padding:18px 20px 14px;
  border-bottom:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;
}
.v40-dg-handle{
  position:absolute;top:8px;left:50%;transform:translateX(-50%);
  width:36px;height:3px;border-radius:99px;background:var(--border2);
}
.v40-dg-title{font-size:18px;font-weight:800;letter-spacing:-.4px;}
.v40-dg-close{
  background:var(--bg3);border:1px solid var(--border);
  border-radius:50%;width:30px;height:30px;
  color:var(--text2);cursor:pointer;font-size:14px;
  display:flex;align-items:center;justify-content:center;
  transition:all .15s;
}
.v40-dg-close:hover{background:var(--bg4);color:var(--text);}
.v40-dg-body{padding:20px;}
.v40-dg-sec{margin-bottom:22px;}
.v40-dg-sec-lbl{
  font-size:9px;font-weight:800;color:var(--text3);
  text-transform:uppercase;letter-spacing:.12em;
  margin-bottom:12px;display:flex;align-items:center;gap:8px;
}
.v40-dg-sec-lbl::after{content:'';flex:1;height:1px;background:var(--border);}

/* Goal field widget */
.v40-gf{
  background:var(--bg3);border:1.5px solid var(--border);
  border-radius:var(--r-lg);padding:14px 16px;margin-bottom:8px;
  transition:all .15s;
}
.v40-gf:focus-within{border-color:var(--acc);box-shadow:0 0 0 3px rgba(200,245,60,.08);}
.v40-gf-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;}
.v40-gf-label{font-size:9px;font-weight:800;color:var(--text2);text-transform:uppercase;letter-spacing:.1em;}
.v40-gf-edit{font-size:10px;font-weight:700;color:var(--acc);cursor:pointer;padding:2px 8px;border-radius:99px;background:var(--acc4);border:none;font-family:'Syne',sans-serif;transition:all .15s;}
.v40-gf-edit:hover{background:rgba(200,245,60,.2);}
.v40-gf-input-row{display:flex;align-items:baseline;gap:6px;}
.v40-gf-input{
  background:transparent;border:none;outline:none;
  font-family:'Syne',sans-serif;font-size:26px;font-weight:800;
  color:var(--text);letter-spacing:-.4px;width:120px;
  -moz-appearance:textfield;
}
.v40-gf-input::-webkit-outer-spin-button,.v40-gf-input::-webkit-inner-spin-button{-webkit-appearance:none;}
.v40-gf-unit{font-size:14px;font-weight:700;color:var(--text3);}
.v40-gf-progress{margin-top:10px;}
.v40-gf-bar{height:4px;background:var(--bg5);border-radius:99px;overflow:hidden;}
.v40-gf-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--acc),var(--green));transition:width .8s cubic-bezier(.22,1,.36,1);}
.v40-gf-bar-labels{display:flex;justify-content:space-between;margin-top:4px;}
.v40-gf-bar-lbl{font-size:9px;color:var(--text3);font-weight:700;}

/* Goal insight chips */
.v40-goal-insight{
  border-radius:var(--r-lg);padding:11px 13px;
  margin-bottom:8px;
  display:flex;align-items:flex-start;gap:9px;
  animation:v40slide .3s cubic-bezier(.22,1,.36,1) both;
}
.v40-goal-insight.warn{background:linear-gradient(135deg,rgba(255,154,60,.1),rgba(255,92,106,.06));border:1px solid rgba(255,154,60,.3);}
.v40-goal-insight.ok{background:linear-gradient(135deg,rgba(62,223,138,.09),rgba(200,245,60,.05));border:1px solid rgba(62,223,138,.25);}
.v40-goal-insight.info{background:linear-gradient(135deg,rgba(91,156,239,.09),rgba(168,126,248,.05));border:1px solid rgba(91,156,239,.25);}
.v40-goal-insight.impossible{background:linear-gradient(135deg,rgba(255,92,106,.12),rgba(255,154,60,.06));border:1px solid rgba(255,92,106,.3);}
.v40-goal-insight-ico{font-size:16px;line-height:1.3;flex-shrink:0;}
.v40-gi-title{font-size:11px;font-weight:800;margin-bottom:2px;}
.v40-goal-insight.warn .v40-gi-title{color:var(--orange);}
.v40-goal-insight.ok .v40-gi-title{color:var(--green);}
.v40-goal-insight.info .v40-gi-title{color:var(--blue);}
.v40-goal-insight.impossible .v40-gi-title{color:var(--red);}
.v40-gi-txt{font-size:11px;color:var(--text2);line-height:1.55;}
.v40-gi-action{display:inline-block;margin-top:5px;font-size:10px;font-weight:700;color:var(--acc);cursor:pointer;text-decoration:underline;text-underline-offset:2px;}

/* Objective chips */
.v40-obj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;}
.v40-obj{
  padding:14px 10px;border-radius:var(--r-lg);
  background:var(--bg3);border:1.5px solid var(--border);
  cursor:pointer;transition:all .15s;text-align:center;
  font-family:'Syne',sans-serif;
}
.v40-obj:active{transform:scale(.95);}
.v40-obj.sel{border-color:var(--acc);background:var(--acc4);}
.v40-obj-ico{font-size:22px;margin-bottom:5px;}
.v40-obj-nm{font-size:12px;font-weight:700;color:var(--text);}
.v40-obj.sel .v40-obj-nm{color:var(--acc);}
.v40-obj-sub{font-size:10px;color:var(--text3);margin-top:2px;}

/* Freq stepper */
.v40-freq-row{display:flex;align-items:center;gap:14px;padding:4px 0;}
.v40-freq-btn{
  width:44px;height:44px;border-radius:50%;
  background:var(--bg3);border:1.5px solid var(--border);
  font-size:22px;color:var(--text);cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .15s;flex-shrink:0;
}
.v40-freq-btn:hover{border-color:var(--acc);color:var(--acc);}
.v40-freq-btn:active{transform:scale(.88);}
.v40-freq-display{flex:1;text-align:center;}
.v40-freq-val{font-family:'Bebas Neue',sans-serif;font-size:42px;color:var(--acc);line-height:1;}
.v40-freq-lbl{font-size:11px;color:var(--text2);}

/* Save button */
.v40-save-btn{
  width:100%;padding:15px;background:var(--acc);color:#080810;border:none;
  border-radius:var(--r-lg);font-family:'Syne',sans-serif;
  font-size:15px;font-weight:800;cursor:pointer;
  letter-spacing:.03em;transition:all .2s;
  display:flex;align-items:center;justify-content:center;gap:8px;
  margin-top:16px;
}
.v40-save-btn:hover{background:var(--acc2);box-shadow:0 8px 28px rgba(200,245,60,.3);}
.v40-save-btn:active{transform:scale(.98);}

/* ── RETENTION MESSAGES ── */
.v40-retention-card{
  margin:0 16px 14px;border-radius:var(--r-xl);overflow:hidden;
  background:var(--bg2);border:1px solid var(--border);
  animation:v40fadeUp .5s .24s cubic-bezier(.22,1,.36,1) both;
}
.v40-ret-inner{padding:16px;display:flex;gap:12px;align-items:center;}
.v40-ret-ico{font-size:26px;flex-shrink:0;}
.v40-ret-body{flex:1;}
.v40-ret-title{font-size:13px;font-weight:800;margin-bottom:3px;}
.v40-ret-msg{font-size:12px;color:var(--text2);line-height:1.55;}
.v40-ret-cta{
  margin:0 16px 14px;
  display:flex;align-items:center;justify-content:center;
  gap:8px;padding:12px 16px;
  background:var(--acc3);border:1px solid rgba(200,245,60,.25);
  border-radius:var(--r-lg);cursor:pointer;
  font-size:13px;font-weight:700;color:var(--acc);
  transition:all .2s;
}
.v40-ret-cta:hover{background:rgba(200,245,60,.15);}

/* ── ACTIVE GOAL BANNER (home) ── */
.v40-active-goal{
  margin:0 16px 14px;
  background:var(--bg2);border:1px solid var(--border2);
  border-radius:var(--r-xl);overflow:hidden;
  animation:v40fadeUp .5s .04s cubic-bezier(.22,1,.36,1) both;
}
.v40-ag-top{
  padding:12px 16px 10px;display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--border);
}
.v40-ag-label{font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:var(--text3);}
.v40-ag-edit{font-size:10px;font-weight:700;color:var(--acc);cursor:pointer;background:none;border:none;font-family:'Syne',sans-serif;padding:0;}
.v40-ag-body{padding:12px 16px 14px;}
.v40-ag-obj{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.v40-ag-obj-ico{font-size:18px;}
.v40-ag-obj-nm{font-size:14px;font-weight:800;}
.v40-ag-obj-sub{font-size:11px;color:var(--text2);margin-left:auto;}
.v40-ag-bars{display:flex;flex-direction:column;gap:8px;}
.v40-ag-bar-row{display:flex;align-items:center;gap:10px;}
.v40-ag-bar-lbl{font-size:10px;font-weight:700;color:var(--text2);min-width:60px;}
.v40-ag-bar-track{flex:1;height:5px;background:var(--bg4);border-radius:99px;overflow:hidden;}
.v40-ag-bar-fill{height:100%;border-radius:99px;transition:width .8s cubic-bezier(.22,1,.36,1);}
.v40-ag-bar-val{font-size:10px;font-weight:700;color:var(--text);min-width:40px;text-align:right;}
`;

const styleEl = document.createElement('style');
styleEl.textContent = V40_CSS;
document.head.appendChild(styleEl);

/* ══════════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════════ */
function safeP(){ return (typeof profile !== 'undefined' && profile) ? profile : {}; }
function safeSess(){ return (typeof sessions !== 'undefined' && Array.isArray(sessions)) ? sessions : []; }
function todayStr(){ return new Date().toISOString().slice(0,10); }
function daysSince(dateStr){
  if(!dateStr) return 999;
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
}

/* ══════════════════════════════════════════════════════
   1. DYNAMIC GOALS ENGINE
══════════════════════════════════════════════════════ */
const GOAL_OBJECTIVES = [
  { id:'cut',      ico:'📉', nm:'Perdere peso',    sub:'Deficit calorico mirato' },
  { id:'bulk',     ico:'📈', nm:'Guadagnare massa', sub:'Surplus + volume alto'  },
  { id:'maintain', ico:'⚖️', nm:'Mantenimento',    sub:'Equilibrio e forma'     },
  { id:'health',   ico:'❤️', nm:'Salute & longevità', sub:'Stile di vita sano'  },
];

function getGoalsMeta(){
  const p = safeP();
  const g = p.goalsMeta || {};
  return {
    calories:    g.calories    || p.kcalTarget  || 2200,
    weight:      g.weight      || p.physique?.weight || 70,
    frequency:   g.frequency   || parseInt(p.days) || 3,
    goalType:    g.goalType    || 'maintain',
    tdee:        g.tdee        || p.tdee || 2500,
    setAt:       g.setAt       || null,
    history:     g.history     || [],
  };
}

function validateGoals(goals) {
  const issues = [];
  const p = safeP();
  const currentWeight = p.physique?.weight || 70;
  const tdee = goals.tdee || 2500;
  const weightDiff = goals.weight - currentWeight;
  const cal = goals.calories;

  // Impossible weight speed
  const weeksNeeded = Math.abs(weightDiff) / 0.5;
  if (Math.abs(weightDiff) > 30) {
    issues.push({ type:'impossible', title:'Obiettivo peso molto ambizioso', ico:'⚠️',
      txt:`${Math.abs(weightDiff)} kg è un percorso lungo. Considera obiettivi intermedi di 5–10 kg.`,
      action: weightDiff < 0 ? 'Imposta -10 kg' : 'Imposta +8 kg',
      actionFn: () => { goals.weight = currentWeight + (weightDiff < 0 ? -10 : 8); }
    });
  }

  // Extreme calorie deficit
  if (cal < 1200) {
    issues.push({ type:'impossible', title:'Calorie troppo basse', ico:'🚫',
      txt:`${cal} kcal è pericolosamente basso. Minimo raccomandato: 1200 kcal.`,
      action: 'Imposta 1300 kcal', actionFn: () => { goals.calories = 1300; }
    });
  } else if (goals.goalType === 'cut' && cal > tdee - 100) {
    issues.push({ type:'warn', title:'Deficit troppo piccolo', ico:'💡',
      txt:`Per perdere peso serve un deficit di almeno 300 kcal. Attuale TDEE: ~${tdee} kcal.`,
      action: `Imposta ${Math.round(tdee * 0.82)} kcal`, actionFn: () => { goals.calories = Math.round(tdee * 0.82); }
    });
  } else if (goals.goalType === 'bulk' && cal < tdee + 100) {
    issues.push({ type:'warn', title:'Surplus troppo piccolo per massa', ico:'💡',
      txt:`Per crescita muscolare ottimale: +300–500 kcal sopra TDEE (~${tdee} kcal).`,
      action: `Imposta ${Math.round(tdee * 1.1)} kcal`, actionFn: () => { goals.calories = Math.round(tdee * 1.1); }
    });
  } else if (goals.goalType === 'cut') {
    const defPct = Math.round((1 - cal/tdee)*100);
    if (defPct > 25) {
      issues.push({ type:'warn', title:'Deficit aggressivo', ico:'⚡',
        txt:`Stai tagliando il ${defPct}% delle calorie. Rischio perdita muscolare. Consigliato: 15–20%.`,
        action: `Imposta ${Math.round(tdee * 0.82)} kcal`, actionFn: () => { goals.calories = Math.round(tdee * 0.82); }
      });
    } else {
      issues.push({ type:'ok', title:'Deficit sostenibile ✓', ico:'✅',
        txt:`-${defPct}% è nel range ottimale. Perderai circa 0.5 kg a settimana preservando il muscolo.`
      });
    }
  } else if (goals.goalType === 'bulk') {
    const surPct = Math.round((cal/tdee - 1)*100);
    if (surPct < 5) {
      issues.push({ type:'info', title:'Surplus leggero', ico:'📊',
        txt:`+${surPct}% darà crescita lenta ma pulita (lean bulk). Ottimo per chi non vuole grasso extra.`
      });
    } else {
      issues.push({ type:'ok', title:'Surplus per crescita ✓', ico:'✅',
        txt:`+${surPct}% è buono per la crescita muscolare. Traccia il peso settimanalmente.`
      });
    }
  }

  // Frequency validation
  if (goals.frequency >= 6) {
    issues.push({ type:'warn', title:'Frequenza molto alta', ico:'😅',
      txt:`${goals.frequency} giorni/sett. lascia poco recupero. Pianifica almeno 1 giorno di riposo attivo.`
    });
  } else if (goals.frequency <= 1) {
    issues.push({ type:'info', title:'Frequenza bassa', ico:'📅',
      txt:`1 giorno/sett. è un buon punto di partenza. Anche 2–3 sessioni brevi migliorano molto.`
    });
  }

  // Pace suggestion based on history
  const sess = safeSess();
  const recentWeeks = 4;
  const cutoff = new Date(Date.now() - recentWeeks * 7 * 86400000).toISOString().slice(0,10);
  const recentSessions = sess.filter(s => s.date >= cutoff).length;
  const avgPerWeek = recentSessions / recentWeeks;

  if (goals.frequency > avgPerWeek + 2 && avgPerWeek > 0) {
    issues.push({ type:'warn', title:'Salto di frequenza brusco', ico:'📈',
      txt:`Vai mediamente ${avgPerWeek.toFixed(1)} giorni/sett. Salire a ${goals.frequency} subito è rischioso. Prova con ${Math.round(avgPerWeek + 1)}.`,
      action: `Imposta ${Math.min(goals.frequency, Math.round(avgPerWeek + 1))} giorni`,
      actionFn: () => { goals.frequency = Math.min(goals.frequency, Math.round(avgPerWeek + 1)); }
    });
  }

  return issues;
}

/* ── Goals Sheet ── */
let v40GoalsCurrent = {};
let v40GoalsIssues  = [];

function openGoalsSheet() {
  const overlay = document.getElementById('v40-goals-overlay');
  if (overlay) { overlay.style.display = 'flex'; refreshGoalsSheet(); return; }

  const el = document.createElement('div');
  el.id = 'v40-goals-overlay';
  el.className = 'v40-dg-overlay';
  el.innerHTML = `
    <div class="v40-dg-sheet" id="v40-goals-sheet">
      <div class="v40-dg-bar"></div>
      <div class="v40-dg-hdr">
        <div class="v40-dg-handle"></div>
        <div class="v40-dg-title">🎯 I Tuoi Obiettivi</div>
        <button class="v40-dg-close" onclick="document.getElementById('v40-goals-overlay').style.display='none'">✕</button>
      </div>
      <div class="v40-dg-body" id="v40-goals-body"></div>
    </div>`;
  el.addEventListener('click', e => { if(e.target === el) el.style.display = 'none'; });
  document.body.appendChild(el);
  refreshGoalsSheet();
}

function refreshGoalsSheet() {
  v40GoalsCurrent = getGoalsMeta();
  v40GoalsIssues  = validateGoals({...v40GoalsCurrent});
  const body = document.getElementById('v40-goals-body');
  if (!body) return;

  const objChips = GOAL_OBJECTIVES.map(o => `
    <div class="v40-obj${v40GoalsCurrent.goalType === o.id ? ' sel' : ''}"
         onclick="v40SelectObj('${o.id}')">
      <div class="v40-obj-ico">${o.ico}</div>
      <div class="v40-obj-nm">${o.nm}</div>
      <div class="v40-obj-sub">${o.sub}</div>
    </div>`).join('');

  const insightHtml = v40GoalsIssues.map(issue => `
    <div class="v40-goal-insight ${issue.type}">
      <div class="v40-goal-insight-ico">${issue.ico}</div>
      <div>
        <div class="v40-gi-title">${issue.title}</div>
        <div class="v40-gi-txt">${issue.txt}</div>
        ${issue.action ? `<span class="v40-gi-action" onclick="v40ApplyIssue(${v40GoalsIssues.indexOf(issue)})">${issue.action} →</span>` : ''}
      </div>
    </div>`).join('');

  const currentKcal = v40GoalsCurrent.calories;
  const tdee        = v40GoalsCurrent.tdee || 2500;
  const pct         = Math.min(100, Math.round(currentKcal / tdee * 100));

  body.innerHTML = `
    
    <div class="v40-dg-sec">
      <div class="v40-dg-sec-lbl">Tipo obiettivo</div>
      <div class="v40-obj-grid">${objChips}</div>
    </div>

    
    <div class="v40-dg-sec">
      <div class="v40-dg-sec-lbl">Calorie giornaliere</div>
      <div class="v40-gf">
        <div class="v40-gf-top">
          <div class="v40-gf-label">Target calorico</div>
          <div class="v40-gf-lbl" style="font-size:10px;color:var(--text3)">TDEE: ~${tdee} kcal</div>
        </div>
        <div class="v40-gf-input-row">
          <input class="v40-gf-input" id="v40-cal-input" type="number"
            value="${currentKcal}" min="1200" max="6000"
            oninput="v40GoalsCurrent.calories=parseInt(this.value)||${currentKcal};v40UpdateInsights()">
          <span class="v40-gf-unit">kcal/giorno</span>
        </div>
        <div class="v40-gf-progress">
          <div class="v40-gf-bar">
            <div class="v40-gf-fill" id="v40-cal-bar" style="width:${pct}%"></div>
          </div>
          <div class="v40-gf-bar-labels">
            <span class="v40-gf-bar-lbl">1200</span>
            <span class="v40-gf-bar-lbl">TDEE ${tdee}</span>
            <span class="v40-gf-bar-lbl">+20%</span>
          </div>
        </div>
      </div>
    </div>

    
    <div class="v40-dg-sec">
      <div class="v40-dg-sec-lbl">Peso obiettivo</div>
      <div class="v40-gf">
        <div class="v40-gf-top">
          <div class="v40-gf-label">Peso target</div>
          <div class="v40-gf-lbl" style="font-size:10px;color:var(--text3)">
            Attuale: ${(safeP().physique?.weight || 70)} kg
          </div>
        </div>
        <div class="v40-gf-input-row">
          <input class="v40-gf-input" id="v40-weight-input" type="number" step="0.5"
            value="${v40GoalsCurrent.weight}" min="30" max="250"
            oninput="v40GoalsCurrent.weight=parseFloat(this.value)||${v40GoalsCurrent.weight};v40UpdateInsights()">
          <span class="v40-gf-unit">kg</span>
        </div>
        <div style="font-size:11px;color:var(--text2);margin-top:6px;" id="v40-weight-timeline"></div>
      </div>
    </div>

    
    <div class="v40-dg-sec">
      <div class="v40-dg-sec-lbl">Frequenza settimanale</div>
      <div class="v40-gf">
        <div class="v40-freq-row">
          <button class="v40-freq-btn" onclick="v40FreqAdj(-1)">−</button>
          <div class="v40-freq-display">
            <div class="v40-freq-val" id="v40-freq-val">${v40GoalsCurrent.frequency}</div>
            <div class="v40-freq-lbl" id="v40-freq-lbl">${v40FreqLabel(v40GoalsCurrent.frequency)}</div>
          </div>
          <button class="v40-freq-btn" onclick="v40FreqAdj(+1)">+</button>
        </div>
      </div>
    </div>

    
    <div class="v40-dg-sec" id="v40-insights-sec">
      <div class="v40-dg-sec-lbl">Analisi & suggerimenti</div>
      <div id="v40-insights-body">${insightHtml}</div>
    </div>

    <button class="v40-save-btn" onclick="v40SaveGoals()">
      ✓ Salva obiettivi
    </button>
  `;

  v40UpdateWeightTimeline();
}

window.v40SelectObj = function(id) {
  v40GoalsCurrent.goalType = id;
  document.querySelectorAll('.v40-obj').forEach(el => el.classList.remove('sel'));
  document.querySelectorAll('.v40-obj').forEach(el => {
    if (el.querySelector('.v40-obj-ico')?.textContent.trim() === GOAL_OBJECTIVES.find(o=>o.id===id)?.ico)
      el.classList.add('sel');
  });
  v40UpdateInsights();
};

window.v40FreqAdj = function(delta) {
  const cur = v40GoalsCurrent.frequency || 3;
  const next = Math.min(7, Math.max(1, cur + delta));
  v40GoalsCurrent.frequency = next;
  const vEl = document.getElementById('v40-freq-val');
  const lEl = document.getElementById('v40-freq-lbl');
  if (vEl) vEl.textContent = next;
  if (lEl) lEl.textContent = v40FreqLabel(next);
  v40UpdateInsights();
};

function v40FreqLabel(n) {
  if (n <= 1) return 'giorno a settimana';
  if (n === 7) return 'giorni — ogni giorno!';
  return `giorni a settimana`;
}

function v40UpdateWeightTimeline() {
  const el = document.getElementById('v40-weight-timeline');
  if (!el) return;
  const p = safeP();
  const cur = parseFloat(p.physique?.weight) || 70;
  const target = parseFloat(v40GoalsCurrent.weight) || cur;
  const diff = target - cur;
  if (Math.abs(diff) < 0.5) { el.textContent = 'Sei già al tuo peso target!'; return; }
  const weeks = Math.abs(diff) / 0.4;
  const months = Math.round(weeks / 4.3);
  const dir = diff < 0 ? 'da perdere' : 'da guadagnare';
  el.innerHTML = `<span style="color:var(--acc);font-weight:700">${Math.abs(diff).toFixed(1)} kg</span> ${dir} · stimato <span style="color:var(--text);font-weight:700">~${months > 1 ? months + ' mesi' : Math.round(weeks) + ' settimane'}</span> al ritmo consigliato`;
}

function v40UpdateInsights() {
  v40GoalsIssues = validateGoals({...v40GoalsCurrent});
  const body = document.getElementById('v40-insights-body');
  if (!body) return;

  // Update cal bar
  const tdee = v40GoalsCurrent.tdee || 2500;
  const calBar = document.getElementById('v40-cal-bar');
  if (calBar) {
    const pct = Math.min(120, Math.round(v40GoalsCurrent.calories / tdee * 100));
    calBar.style.width = Math.min(100, pct) + '%';
    const over = pct > 100;
    calBar.style.background = over
      ? 'linear-gradient(90deg,var(--acc),var(--orange))'
      : 'linear-gradient(90deg,var(--acc),var(--green))';
  }

  v40UpdateWeightTimeline();

  body.innerHTML = v40GoalsIssues.map((issue, i) => `
    <div class="v40-goal-insight ${issue.type}" style="animation-delay:${i*0.06}s">
      <div class="v40-goal-insight-ico">${issue.ico}</div>
      <div>
        <div class="v40-gi-title">${issue.title}</div>
        <div class="v40-gi-txt">${issue.txt}</div>
        ${issue.action ? `<span class="v40-gi-action" onclick="v40ApplyIssue(${i})">${issue.action} →</span>` : ''}
      </div>
    </div>`).join('') || '<div style="font-size:12px;color:var(--text2);padding:8px 0;">✅ Obiettivi bilanciati — ottima scelta!</div>';
}

window.v40ApplyIssue = function(idx) {
  const issue = v40GoalsIssues[idx];
  if (issue?.actionFn) {
    issue.actionFn();
    // Sync inputs
    const calInput = document.getElementById('v40-cal-input');
    if (calInput) calInput.value = v40GoalsCurrent.calories;
    const wInput = document.getElementById('v40-weight-input');
    if (wInput) wInput.value = v40GoalsCurrent.weight;
    const vEl = document.getElementById('v40-freq-val');
    const lEl = document.getElementById('v40-freq-lbl');
    if (vEl) vEl.textContent = v40GoalsCurrent.frequency;
    if (lEl) lEl.textContent = v40FreqLabel(v40GoalsCurrent.frequency);
    v40UpdateInsights();
    if (typeof showToast === 'function') showToast('✅ Suggerimento applicato');
  }
};

window.v40SaveGoals = function() {
  const p = safeP();
  if (!p.goalsMeta) p.goalsMeta = {};

  // Snapshot history
  const prev = {...(p.goalsMeta || {})};
  if (p.goalsMeta.calories || p.goalsMeta.frequency) {
    p.goalsMeta.history = [...(p.goalsMeta.history || []).slice(-9), {
      calories: p.goalsMeta.calories, weight: p.goalsMeta.weight,
      frequency: p.goalsMeta.frequency, goalType: p.goalsMeta.goalType,
      changedAt: todayStr()
    }];
  }

  Object.assign(p.goalsMeta, {
    calories:  v40GoalsCurrent.calories,
    weight:    v40GoalsCurrent.weight,
    frequency: v40GoalsCurrent.frequency,
    goalType:  v40GoalsCurrent.goalType,
    tdee:      v40GoalsCurrent.tdee,
    setAt:     todayStr(),
  });

  p.kcalTarget = v40GoalsCurrent.calories;
  p.days = String(v40GoalsCurrent.frequency);

  if (typeof saveAll === 'function') saveAll();
  document.getElementById('v40-goals-overlay').style.display = 'none';

  // Re-render
  setTimeout(() => {
    if (typeof renderHome === 'function') renderHome();
    v40InjectDashboard();
  }, 100);

  const obj = GOAL_OBJECTIVES.find(o => o.id === v40GoalsCurrent.goalType);
  if (typeof showToast === 'function')
    showToast(`✅ ${obj?.ico || ''} Obiettivo: ${obj?.nm || v40GoalsCurrent.goalType} · ${v40GoalsCurrent.calories} kcal · ${v40GoalsCurrent.frequency}gg/sett.`);
};

/* ══════════════════════════════════════════════════════
   2. READINESS SCORE
══════════════════════════════════════════════════════ */
function calcReadiness() {
  const p = safeP();
  const sess = safeSess();
  const streakFn = typeof calcStreak === 'function' ? calcStreak : () => 0;
  const streak = streakFn();
  const lastDate = sess[0]?.date;
  const daysSinceLast = daysSince(lastDate);

  let score = 65; // base
  let label = 'Pronto';
  let color = 'var(--acc)';
  let reason = '';

  // Streak bonus
  if (streak >= 5) { score += 15; }
  else if (streak >= 3) { score += 8; }
  else if (streak === 0 && daysSinceLast > 3) { score -= 20; }

  // Recent session volume & frequency
  const week = new Date(Date.now() - 7*86400000).toISOString().slice(0,10);
  const recentCount = sess.filter(s => s.date >= week).length;
  const goals = getGoalsMeta();
  const freqTarget = goals.frequency || 3;
  const freqRatio = freqTarget > 0 ? recentCount / freqTarget : 0;

  if (freqRatio >= 1) { score += 12; }
  else if (freqRatio >= 0.7) { score += 5; }
  else if (freqRatio < 0.4) { score -= 10; }

  // Cap
  score = Math.min(99, Math.max(20, Math.round(score)));

  if (score >= 85) { label = 'Eccellente'; color = 'var(--green)'; reason = 'Recupero ottimale. Giornata ideale per intensità alta.'; }
  else if (score >= 70) { label = 'Pronto'; color = 'var(--acc)'; reason = 'Corpo in buono stato. Vai con sicurezza.'; }
  else if (score >= 50) { label = 'Accettabile'; color = 'var(--orange)'; reason = 'Considera di ridurre leggermente il volume oggi.'; }
  else { label = 'Recupera'; color = 'var(--red)'; reason = 'Corpo stanco. Opta per mobilità o riposo attivo.'; }

  return { score, label, color, reason };
}

function calcRecovery() {
  const sess = safeSess();
  const lastDate = sess[0]?.date;
  const days = daysSince(lastDate);
  if (days === 0) return { pct: 40, label: 'In recupero', color:'var(--orange)' };
  if (days === 1) return { pct: 75, label: 'Quasi pronto', color:'var(--acc)' };
  if (days >= 2) return { pct: 95, label: 'Recuperato', color:'var(--green)' };
  return { pct: 60, label: 'Moderato', color:'var(--text2)' };
}

/* ══════════════════════════════════════════════════════
   3. CYCLE INSIGHT CARDS (Apple Health Style)
══════════════════════════════════════════════════════ */
const CYCLE_PHASE_CONFIG = {
  easy: {
    name: '🔴 Fase Mestruale',
    bg: 'linear-gradient(135deg,rgba(30,10,20,1) 0%,rgba(50,8,22,1) 100%)',
    barColor: 'linear-gradient(90deg,#FF3A7A,#FF8FA0)',
    dotColor: '#FF3A7A',
    dayBg: 'rgba(255,58,122,.15)',
    dayColor: '#FF5CA0',
    pillBg: 'rgba(255,58,122,.15)',
    pillColor: '#FF5CA0',
    pills: ['🧘 Mobilità', '💆 Recupero attivo', '🚶 Cammina'],
    advice: 'Ascolta il tuo corpo. Workout leggeri come yoga, stretching o camminate migliorano il benessere senza stress aggiuntivo.',
    workoutTips: ['Riduci i pesi del 20–30%', 'Più riposo tra le serie', 'Evita esercizi pesanti sul core'],
  },
  normal: {
    name: '🟡 Fase Follicolare',
    bg: 'linear-gradient(135deg,rgba(14,20,12,1) 0%,rgba(10,28,10,1) 100%)',
    barColor: 'linear-gradient(90deg,#E8FF50,#A8D820)',
    dotColor: '#C8F53C',
    dayBg: 'rgba(200,245,60,.12)',
    dayColor: 'var(--acc)',
    pillBg: 'rgba(200,245,60,.12)',
    pillColor: 'var(--acc)',
    pills: ['📈 Volume in aumento', '💪 Progressione dei pesi', '🎯 Tecnica'],
    advice: 'Energia in crescita. Ottimo momento per aumentare progressivamente il volume e i carichi. Il corpo risponde bene agli stimoli nuovi.',
    workoutTips: ['Aumenta il volume del 10%', 'Prova nuovi esercizi', 'Buona tolleranza all\'intensità'],
  },
  intense: {
    name: '🟢 Fase Ovulatoria',
    bg: 'linear-gradient(135deg,rgba(8,22,16,1) 0%,rgba(5,30,18,1) 100%)',
    barColor: 'linear-gradient(90deg,#3EDF8A,#C8F53C)',
    dotColor: '#3EDF8A',
    dayBg: 'rgba(62,223,138,.15)',
    dayColor: 'var(--green)',
    pillBg: 'rgba(62,223,138,.12)',
    pillColor: 'var(--green)',
    pills: ['🚀 Alta intensità', '🏋️ Carichi massimali', '⚡ HIIT'],
    advice: 'Picco mensile di forza e coordinazione. Prova i tuoi massimali, spingi sui carichi pesanti e sfrutta questa finestra di adattamento ottimale.',
    workoutTips: ['Testa nuovi record personali', 'Aggiungi 1 serie extra', 'Recupero ridotto tra set'],
  },
  moderate: {
    name: '🟠 Fase Luteale',
    bg: 'linear-gradient(135deg,rgba(20,14,6,1) 0%,rgba(28,12,4,1) 100%)',
    barColor: 'linear-gradient(90deg,#FF9A3C,#FFD580)',
    dotColor: '#FF9A3C',
    dayBg: 'rgba(255,154,60,.12)',
    dayColor: 'var(--orange)',
    pillBg: 'rgba(255,154,60,.10)',
    pillColor: 'var(--orange)',
    pills: ['⚖️ Volume moderato', '🎯 Focus tecnica', '🧘 Yoga/Stretching'],
    advice: 'Il corpo preferisce costanza all\'intensità in questa fase. Mantieni il volume moderato, focus sulla tecnica e integra stretching e respirazione.',
    workoutTips: ['Mantieni i carichi abituali', 'Allarga i tempi di recupero', 'Priorità alla forma esecutiva'],
  },
};

function buildCycleCard() {
  const p = safeP();
  if (p.physique?.sex !== 'f') return null;
  if (typeof getCycleData !== 'function') return null;
  const c = getCycleData();
  if (!c || !c.trackCycle) return null;
  if (typeof getCurrentCyclePhase !== 'function') return null;
  const info = getCurrentCyclePhase();
  if (!info) return null;

  const mod = info.phase.trainingMod || 'normal';
  const cfg = CYCLE_PHASE_CONFIG[mod] || CYCLE_PHASE_CONFIG.normal;
  const pct = Math.round(info.dayInCycle / info.cycleLen * 100);

  // Build phase sections for timeline
  const phases = [
    { nm:'Mestr.', pct: Math.round(info.phase.period / info.cycleLen * 100) },
    { nm:'Foll.', pct: Math.round(0.45 * 100) },
    { nm:'Ovul.', pct: Math.round(0.55 * 100) },
    { nm:'Lut.', pct: 100 },
  ];

  const pillsHtml = cfg.pills.map(p => `
    <span class="v40-cycle-pill" style="background:${cfg.pillBg};color:${cfg.pillColor};">${p}</span>`).join('');

  const tipsHtml = cfg.workoutTips.map(t =>
    `<div style="font-size:11px;color:rgba(255,255,255,.7);padding:3px 0;display:flex;align-items:center;gap:6px;"><span style="color:${cfg.dotColor};font-size:8px;">●</span>${t}</div>`).join('');

  return `
    <div class="v40-cycle-card">
      <div style="background:${cfg.bg};border-radius:var(--r-xl);overflow:hidden;border:1px solid rgba(255,255,255,.07);">
        <div class="v40-cycle-inner">
          
          <div class="v40-cycle-phase-bar" style="background:rgba(255,255,255,.08);">
            <div style="height:100%;border-radius:99px;width:${pct}%;background:${cfg.barColor};transition:width 1s cubic-bezier(.22,1,.36,1);"></div>
          </div>

          <div class="v40-cycle-top">
            <div>
              <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.14em;opacity:.5;margin-bottom:4px;color:rgba(255,255,255,.7)">Ciclo mestruale</div>
              <div class="v40-cycle-phase-name" style="color:rgba(255,255,255,.95);">${cfg.name}</div>
            </div>
            <div class="v40-cycle-day-badge" style="background:${cfg.dayBg};color:${cfg.dayColor};border:1px solid ${cfg.dayColor}33;">
              Giorno ${info.dayInCycle}/${info.cycleLen}
            </div>
          </div>

          <div class="v40-cycle-advice" style="color:rgba(255,255,255,.75);">${cfg.advice}</div>
          <div class="v40-cycle-pills">${pillsHtml}</div>

          
          <div style="margin-top:14px;background:rgba(0,0,0,.2);border-radius:var(--r);padding:12px;">
            <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;color:${cfg.dotColor};margin-bottom:8px;">💪 Adattamenti allenamento</div>
            ${tipsHtml}
          </div>

          
          <div class="v40-cycle-timeline">
            <div class="v40-timeline-track">
              <div class="v40-timeline-fill" style="width:${pct}%;background:${cfg.barColor};"></div>
              <div class="v40-timeline-dot" style="left:${pct}%;background:${cfg.dotColor};"></div>
            </div>
            <div class="v40-timeline-phases">
              <span class="v40-timeline-ph" style="color:rgba(255,255,255,.5);">Mestr.</span>
              <span class="v40-timeline-ph" style="color:rgba(255,255,255,.5);">Foll.</span>
              <span class="v40-timeline-ph" style="color:rgba(255,255,255,.5);">Ovul.</span>
              <span class="v40-timeline-ph" style="color:rgba(255,255,255,.5);">Lut.</span>
            </div>
          </div>

          
          <button onclick="if(typeof openCycleSettings==='function')openCycleSettings()"
            style="margin-top:12px;width:100%;padding:9px;background:rgba(255,255,255,.07);
              border:1px solid rgba(255,255,255,.12);border-radius:var(--r);
              color:rgba(255,255,255,.6);font-family:'Syne',sans-serif;font-size:11px;
              font-weight:700;cursor:pointer;letter-spacing:.04em;transition:all .15s;"
            onmouseover="this.style.background='rgba(255,255,255,.12)'"
            onmouseout="this.style.background='rgba(255,255,255,.07)'">
            ⚙️ Modifica impostazioni ciclo
          </button>
        </div>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════
   4. RETENTION & MOTIVATION SYSTEM
══════════════════════════════════════════════════════ */
function getMotivationState() {
  const sess = safeSess();
  const streakFn = typeof calcStreak === 'function' ? calcStreak : () => 0;
  const streak = streakFn();
  const lastDate = sess[0]?.date;
  const daysSinceLast = daysSince(lastDate);
  const goals = getGoalsMeta();
  const freqTarget = goals.frequency || 3;

  // Count sessions per week for last 4 weeks
  const weekCounts = [0,1,2,3].map(w => {
    const from = new Date(Date.now() - (w+1)*7*86400000).toISOString().slice(0,10);
    const to   = new Date(Date.now() - w*7*86400000).toISOString().slice(0,10);
    return sess.filter(s => s.date >= from && s.date < to).length;
  });

  const avgWeekly = weekCounts.reduce((a,b) => a+b, 0) / 4;
  const declining = weekCounts[0] < weekCounts[1] && weekCounts[1] < weekCounts[2];
  const improving = weekCounts[0] > weekCounts[1] && streak >= 2;
  const inactive  = daysSinceLast >= 4;
  const skipping  = daysSinceLast >= 2 && avgWeekly < freqTarget * 0.5;

  let mode = 'normal'; // normal | struggling | improving | star

  if (inactive || (declining && avgWeekly < freqTarget * 0.5)) mode = 'struggling';
  else if (streak >= 7 || improving) mode = 'star';
  else if (improving) mode = 'improving';

  return { mode, streak, daysSinceLast, avgWeekly, freqTarget, declining, improving, inactive, skipping };
}

const MOTIVATION_CONFIG = {
  struggling: {
    tone: 'soft',
    messages: [
      { ico:'🌱', title:'Ogni passo conta', msg:'Non devi fare tutto in una volta. Anche 15 minuti oggi ti rimettono in pista.', sub:null },
      { ico:'🔄', title:'Ricomincia, senza pressione', msg:'Hai saltato qualche sessione — normale. L\'importante è riprendere adesso, non domani.', sub:null },
      { ico:'💙', title:'Il corpo ti aspetta', msg:'Anche una camminata o 10 minuti di stretching è un allenamento. Inizia piccolo.', sub:null },
    ],
    ctaText: '▶ Avvia una sessione breve',
    color: 'var(--blue)',
    bg: 'rgba(91,156,239,.08)',
    border: 'rgba(91,156,239,.2)',
    goalSuggestion: 'Obiettivo suggerito: riduci la frequenza a 2 giorni/sett. per riprendere il ritmo.',
  },
  improving: {
    tone: 'encouraging',
    messages: [
      { ico:'📈', title:'Stai crescendo', msg:'La tua costanza negli ultimi giorni è in aumento. Continua su questo ritmo.', sub:null },
      { ico:'⚡', title:'Momentum in corso', msg:'Ogni sessione che completi rende la prossima più facile. Sei sulla strada giusta.', sub:null },
    ],
    ctaText: '🔥 Continua la serie',
    color: 'var(--acc)',
    bg: 'rgba(200,245,60,.07)',
    border: 'rgba(200,245,60,.2)',
    goalSuggestion: null,
  },
  star: {
    tone: 'strong',
    messages: [
      { ico:'🏆', title:'Prestazione di livello', msg:'Top 5% di costanza. Stai costruendo qualcosa di concreto.', sub:'Potresti aumentare il volume o la frequenza questa settimana.' },
      { ico:'🔥', title:'Serie impressionante', msg:'Chi allena con questa costanza raggiunge i risultati. Nessuna eccezione.', sub:null },
    ],
    ctaText: '⚡ Spingi ancora di più',
    color: 'var(--green)',
    bg: 'rgba(62,223,138,.07)',
    border: 'rgba(62,223,138,.2)',
    goalSuggestion: 'Sei pronto per aumentare la frequenza o i carichi.',
  },
  normal: {
    tone: 'neutral',
    messages: [
      { ico:'💪', title:'Continua così', msg:'Tieni il ritmo. La costanza supera sempre l\'intensità nel lungo periodo.', sub:null },
      { ico:'🎯', title:'Obiettivo in vista', msg:'Stai lavorando verso il tuo obiettivo. Ogni sessione è un mattone.', sub:null },
    ],
    ctaText: '▶ Allena oggi',
    color: 'var(--text2)',
    bg: 'var(--bg3)',
    border: 'var(--border)',
    goalSuggestion: null,
  },
};

function buildMotivationCard(state) {
  const cfg = MOTIVATION_CONFIG[state.mode] || MOTIVATION_CONFIG.normal;
  const msgs = cfg.messages;
  const msg = msgs[Math.floor(Date.now() / 86400000) % msgs.length];

  let contextLine = '';
  if (state.inactive && state.daysSinceLast < 999)
    contextLine = `Ultima sessione: ${state.daysSinceLast} giorni fa`;
  else if (state.streak >= 3)
    contextLine = `🔥 ${state.streak} giorni di streak attivo`;
  else if (state.avgWeekly > 0)
    contextLine = `Media settimana: ${state.avgWeekly.toFixed(1)} sessioni`;

  return `
    <div class="v40-moto-card">
      <div class="v40-moto-inner">
        <div class="v40-moto-pulse" style="background:${cfg.bg};border:1px solid ${cfg.border};">
          ${msg.ico}
        </div>
        <div class="v40-moto-content" style="flex:1;">
          <div class="v40-moto-label" style="color:${cfg.color};">${msg.title}</div>
          <div class="v40-moto-msg">${msg.msg}</div>
          ${msg.sub ? `<div class="v40-moto-sub">${msg.sub}</div>` : ''}
          ${contextLine ? `<div style="font-size:10px;color:var(--text3);margin-top:5px;">${contextLine}</div>` : ''}
          ${cfg.goalSuggestion ? `
            <div style="margin-top:8px;padding:8px 10px;background:${cfg.bg};border:1px solid ${cfg.border};border-radius:var(--r-sm);">
              <div style="font-size:10px;color:${cfg.color};font-weight:700;">${cfg.goalSuggestion}</div>
            </div>` : ''}
        </div>
      </div>
      <div style="border-top:1px solid var(--border);padding:10px 16px;">
        <button style="width:100%;padding:10px;background:${cfg.bg};border:1px solid ${cfg.border};border-radius:var(--r);
          color:${cfg.color};font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;transition:all .15s;"
          onclick="if(typeof goPage==='function')goPage('allenamento')"
          onmouseover="this.style.opacity='.8'"
          onmouseout="this.style.opacity='1'">
          ${cfg.ctaText}
        </button>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════
   5. ADAPTIVE DASHBOARD INJECTION
══════════════════════════════════════════════════════ */
function buildReadinessCard() {
  const readiness = calcReadiness();
  const recovery  = calcRecovery();
  const streakFn  = typeof calcStreak === 'function' ? calcStreak : () => 0;
  const streak    = streakFn();
  const goals     = getGoalsMeta();
  const obj       = GOAL_OBJECTIVES.find(o => o.id === goals.goalType) || GOAL_OBJECTIVES[2];
  const ringOffset= Math.round(240 - (readiness.score / 100) * 240);
  const ringColor = readiness.color;

  // Today's workout suggestion
  const p = safeP();
  const plan = p.generatedPlan;
  let workoutHtml = '';
  if (plan?.schedule) {
    const dayOfWeek = new Date().getDay();
    const dayMap = { 0:'dom',1:'lun',2:'mar',3:'mer',4:'gio',5:'ven',6:'sab' };
    const dow = dayMap[dayOfWeek];
    const dayEntry = plan.schedule.find(d => d.day === dow || d.dayName?.toLowerCase().includes(dow));
    if (dayEntry && !dayEntry.rest) {
      const cycleBadge = (typeof getCycleBadgeHtml === 'function') ? getCycleBadgeHtml() : '';
      workoutHtml = `
        <div class="v40-today-card">
          <div class="v40-today-hdr">
            <div class="v40-today-label">Allenamento di oggi</div>
            <div class="v40-today-badge" style="background:var(--acc3);color:var(--acc);">Programmato</div>
          </div>
          <div class="v40-today-workout">
            <div class="v40-today-ico" style="background:var(--acc3);border:1px solid rgba(200,245,60,.2);">💪</div>
            <div>
              <div class="v40-today-name">${dayEntry.name || dayEntry.type || 'Sessione'}</div>
              <div class="v40-today-meta">${dayEntry.exercises?.length || 0} esercizi · ~${plan.duration || 45} min</div>
              ${cycleBadge}
            </div>
          </div>
          <button class="v40-today-btn" onclick="if(typeof goPage==='function')goPage('allenamento')">
            ▶ Avvia allenamento
          </button>
        </div>`;
    }
  }

  return `
    <div class="v40-hero">
      <div class="v40-hero-top">
        
        <div class="v40-readiness-ring">
          <svg width="86" height="86" viewBox="0 0 86 86">
            <circle class="v40-ring-bg" cx="43" cy="43" r="38"/>
            <circle class="v40-ring-fg" cx="43" cy="43" r="38"
              style="stroke:${ringColor};stroke-dashoffset:${ringOffset};" id="v40-ring-circle"/>
          </svg>
          <div class="v40-ring-center">
            <div class="v40-ring-val" style="color:${ringColor};">${readiness.score}</div>
            <div class="v40-ring-lbl">Prontezza</div>
          </div>
        </div>

        
        <div class="v40-hero-info">
          <div class="v40-hero-label">Stato oggi</div>
          <div class="v40-hero-state" style="color:${ringColor};">${readiness.label}</div>
          <div class="v40-hero-sub">${readiness.reason}</div>
          
          <div style="display:inline-flex;align-items:center;gap:5px;margin-top:8px;
            background:var(--acc4);border:1px solid rgba(200,245,60,.2);
            border-radius:99px;padding:4px 10px;cursor:pointer;"
            onclick="openGoalsSheet()">
            <span style="font-size:12px;">${obj.ico}</span>
            <span style="font-size:10px;font-weight:700;color:var(--acc);">${obj.nm}</span>
            <span style="font-size:9px;color:var(--text3);">· modifica →</span>
          </div>
        </div>
      </div>

      
      <div class="v40-hero-metrics">
        <div class="v40-metric">
          <div class="v40-metric-val">${streak}</div>
          <div class="v40-metric-lbl">🔥 Streak</div>
        </div>
        <div class="v40-metric">
          <div class="v40-metric-val" style="color:${recovery.color};">${recovery.pct}%</div>
          <div class="v40-metric-lbl">💤 Recupero</div>
        </div>
        <div class="v40-metric">
          <div class="v40-metric-val">${goals.calories}</div>
          <div class="v40-metric-lbl">🔥 Kcal target</div>
        </div>
      </div>

      
      <div class="v40-hero-insight" onclick="openGoalsSheet()" style="cursor:pointer;">
        <div class="v40-insight-ico">🎯</div>
        <div class="v40-insight-msg" id="v40-hero-insight-msg">
          ${buildHeroInsightMsg(readiness, recovery, goals)}
        </div>
        <div style="font-size:9px;color:var(--text3);flex-shrink:0;">Tocca →</div>
      </div>
    </div>

    ${workoutHtml}`;
}

function buildHeroInsightMsg(readiness, recovery, goals) {
  const streakFn = typeof calcStreak === 'function' ? calcStreak : () => 0;
  const streak = streakFn();
  if (streak >= 7) return `🔥 ${streak} giorni di streak! Prestazione eccezionale.`;
  if (readiness.score < 50) return `Recupero prioritario oggi. ${readiness.reason}`;
  const obj = GOAL_OBJECTIVES.find(o => o.id === goals.goalType);
  if (obj) return `Obiettivo: ${obj.ico} ${obj.nm} · ${goals.calories} kcal · ${goals.frequency} gg/sett.`;
  return 'Tocca per vedere e modificare i tuoi obiettivi.';
}

function buildActiveGoalCard() {
  const goals = getGoalsMeta();
  const obj   = GOAL_OBJECTIVES.find(o => o.id === goals.goalType) || GOAL_OBJECTIVES[2];
  const p     = safeP();
  const cw    = parseFloat(p.physique?.weight) || 70;
  const gw    = goals.weight || cw;
  const diff  = Math.abs(gw - cw);
  const progW = diff > 0 ? Math.min(100, Math.round((1 - diff / (Math.abs(gw - cw) + 5)) * 100)) : 100;

  const tdee  = goals.tdee || 2500;
  const calPct= Math.min(100, Math.round(goals.calories / tdee * 100));

  const sess  = safeSess();
  const week  = new Date(Date.now() - 7*86400000).toISOString().slice(0,10);
  const doneThisWeek = sess.filter(s => s.date >= week).length;
  const freqPct = Math.min(100, Math.round(doneThisWeek / goals.frequency * 100));

  return `
    <div class="v40-active-goal">
      <div class="v40-ag-top">
        <div class="v40-ag-label">Obiettivo attivo</div>
        <button class="v40-ag-edit" onclick="openGoalsSheet()">Modifica →</button>
      </div>
      <div class="v40-ag-body">
        <div class="v40-ag-obj">
          <div class="v40-ag-obj-ico">${obj.ico}</div>
          <div class="v40-ag-obj-nm">${obj.nm}</div>
          <div class="v40-ag-obj-sub">${goals.calories} kcal/gg</div>
        </div>
        <div class="v40-ag-bars">
          <div class="v40-ag-bar-row">
            <div class="v40-ag-bar-lbl">Calorie</div>
            <div class="v40-ag-bar-track">
              <div class="v40-ag-bar-fill" style="width:${calPct}%;background:linear-gradient(90deg,var(--acc),var(--green));"></div>
            </div>
            <div class="v40-ag-bar-val">${goals.calories}</div>
          </div>
          <div class="v40-ag-bar-row">
            <div class="v40-ag-bar-lbl">Freq. sett.</div>
            <div class="v40-ag-bar-track">
              <div class="v40-ag-bar-fill" style="width:${freqPct}%;background:linear-gradient(90deg,var(--blue),var(--purple));"></div>
            </div>
            <div class="v40-ag-bar-val">${doneThisWeek}/${goals.frequency}</div>
          </div>
          ${Math.abs(gw - cw) > 0.5 ? `
          <div class="v40-ag-bar-row">
            <div class="v40-ag-bar-lbl">Peso</div>
            <div class="v40-ag-bar-track">
              <div class="v40-ag-bar-fill" style="width:${progW}%;background:linear-gradient(90deg,var(--orange),var(--acc));"></div>
            </div>
            <div class="v40-ag-bar-val">${cw}→${gw}kg</div>
          </div>` : ''}
        </div>
      </div>
    </div>`;
}

function v40InjectDashboard() {
  const home = document.getElementById('page-home');
  if (!home) return;

  // Remove old V40 elements
  ['v40-hero-wrap','v40-active-goal-wrap','v40-cycle-wrap','v40-moto-wrap'].forEach(id => {
    document.getElementById(id)?.remove();
  });

  // Find insertion point (after stats strip)
  const statsStrip = home.querySelector('.stats-strip');
  if (!statsStrip) return;

  const motoState = getMotivationState();

  // 1. HERO CARD (readiness, recovery, today workout)
  const heroWrap = document.createElement('div');
  heroWrap.id = 'v40-hero-wrap';
  heroWrap.innerHTML = buildReadinessCard();
  statsStrip.insertAdjacentElement('afterend', heroWrap);

  let insertAfter = heroWrap;

  // 2. ACTIVE GOAL CARD
  const agWrap = document.createElement('div');
  agWrap.id = 'v40-active-goal-wrap';
  agWrap.innerHTML = buildActiveGoalCard();
  insertAfter.insertAdjacentElement('afterend', agWrap);
  insertAfter = agWrap;

  // 3. CYCLE CARD (females only)
  const cycleHtml = buildCycleCard();
  if (cycleHtml) {
    const cycleWrap = document.createElement('div');
    cycleWrap.id = 'v40-cycle-wrap';
    cycleWrap.innerHTML = cycleHtml;
    insertAfter.insertAdjacentElement('afterend', cycleWrap);
    insertAfter = cycleWrap;
  }

  // 4. MOTIVATION CARD
  const motoWrap = document.createElement('div');
  motoWrap.id = 'v40-moto-wrap';
  motoWrap.innerHTML = buildMotivationCard(motoState);
  insertAfter.insertAdjacentElement('afterend', motoWrap);

  // Animate ring with delay
  requestAnimationFrame(() => {
    const ring = document.getElementById('v40-ring-circle');
    if (ring) {
      const readiness = calcReadiness();
      ring.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)';
      ring.style.strokeDashoffset = String(Math.round(240 - (readiness.score / 100) * 240));
    }
  });
}

/* ── V41: renderHome hook and boot moved to consolidated V41 module ── */
window.openGoalsSheet = openGoalsSheet;

/* ── V41: inactivity notification — deferred, non-blocking ── */
setTimeout(() => {
  if (typeof getMotivationState === 'function') {
    try {
      const state = getMotivationState();
      if (state.inactive && typeof addNotification === 'function') {
        addNotification('💙 Bentornato! Hai saltato qualche giorno — anche una sessione breve conta molto.', 'info');
      }
    } catch(e) {}
  }
}, 4000);

})(); /* end FitTrackV40 */

/* ══════════════════════════════════════════════════════════════════════
   FitTrack AI  V41  — STABILIZATION & CLEANUP
   Strategy: Replace the final link in each patch-chain with a clean,
   consolidated function. All additive behavior is preserved — just
   merged into one direct call instead of N nested wrappers.
   No feature removed. No UI changed.
══════════════════════════════════════════════════════════════════════ */
(function FitTrackV41() {
'use strict';

/* ─────────────────────────────────────────
   SAFE ELEMENT ACCESSOR
   Wraps getElementById with null-guard.
   Returns a no-op proxy when element missing.
───────────────────────────────────────── */
function _el(id) { return document.getElementById(id); }
function _setText(id, val) { const e = _el(id); if (e) e.textContent = val; }
function _setHTML(id, val) { const e = _el(id); if (e) e.innerHTML = val; }

/* ─────────────────────────────────────────
   CONSOLIDATED renderHome
   Merges: base + v5(cycle banner) + v8(calendar)
         + v9(greeting/stats/moto) + v17(vol label)
         + v19(AI coach) + v40(dashboard)
   Single call — no more wrapper chain.
───────────────────────────────────────── */
window.renderHome = function renderHome() {
  if (window._ftOnboardingActive) return; // blocca durante onboarding
  // ── 1. CTA Banner & streak warning (base) ──
  if (typeof renderHomeCta === 'function') renderHomeCta();
  if (typeof renderStreakWarning === 'function') renderStreakWarning();

  // ── 2. Greeting (v9 / base) ──
  if (typeof buildDynamicGreeting === 'function') {
    try { buildDynamicGreeting(); } catch(e) {}
  } else {
    const n = (typeof profile !== 'undefined' && profile.name) || 'Atleta';
    const hr = new Date().getHours();
    const greet = hr < 12 ? 'Buongiorno' : hr < 18 ? 'Buon pomeriggio' : 'Buonasera';
    _setText('h-greet', greet + ',');
    const hn = _el('h-name');
    if (hn) hn.innerHTML = n + ' <em>💪</em>';
  }

  // ── 3. Stats strip ──
  if (typeof updateStatsStrip === 'function') {
    try { updateStatsStrip(); } catch(e) {}
  }
  if (typeof calcStreak === 'function') _setText('s-streak', calcStreak());
  const _se = _el('s-sess');
  if (_se && typeof sessions !== 'undefined') _se.textContent = sessions.length;

  // ── 4. Calorie ring & macros ──
  try {
    const nt  = typeof todayNutr === 'function' ? todayNutr() : {};
    const tot = typeof calcNutritionTotals === 'function' ? calcNutritionTotals(nt) : {eaten:0,p:0,c:0,g:0};
    const eaten = tot.eaten || 0;
    const tgt = (typeof safeKcal === 'function' ? safeKcal(profile?.kcalTarget) : 0) || 2500;
    const {p:tp=180, c:tc=280, g:tg=70} = (typeof profile !== 'undefined' && profile.macros) || {};
    const pct = Math.min(100, Math.round(eaten / tgt * 100));
    const rem = Math.max(0, tgt - eaten);
    _setText('s-kcal', eaten);
    _setText('s-rem', rem);
    const circ = 2 * Math.PI * 39;
    const kr = _el('h-kring');
    if (kr) { kr.style.strokeDasharray = circ; kr.style.strokeDashoffset = circ * (1 - pct / 100); }
    _setText('h-kv', eaten);
    _setText('h-ktgt-ring', tgt);
    _setText('h-kpct', pct + '%');
    _setText('h-kbig', eaten);
    _setText('h-ktgt', '/ ' + tgt + ' kcal obiettivo');
    _setText('h-krem', rem + ' kcal rimanenti');
    if (typeof setMpill === 'function') {
      setMpill('mp-pv','mp-pb', tot.p||0, tp, 'var(--green)', 'g');
      setMpill('mp-cv','mp-cb', tot.c||0, tc, 'var(--blue)',  'g');
      setMpill('mp-gv','mp-gb', tot.g||0, tg, 'var(--orange)','g');
    }
  } catch(e) {}

  // ── 5. Last session card ──
  try {
    const ls = (typeof sessions !== 'undefined' && sessions.length) ? sessions[sessions.length - 1] : null;
    const lsCard = _el('h-last-sess');
    if (ls && lsCard) {
      lsCard.style.display = 'block';
      _setText('h-ls-nm', ls.dayName || ls.progName || '—');
      _setText('h-ls-dt', ls.date || '');
      _setText('h-ls-exs', ls.exCount || 0);
      _setText('h-ls-dur', ls.duration || 0);
      _setText('h-ls-vol', (ls.volume || 0) + ' s×r');
      // v17 volume label tooltip
      const volLbl = document.querySelector('#h-last-sess .ls-stats .l:last-child');
      if (volLbl) volLbl.title = 'Serie × ripetizioni completate';
    }
  } catch(e) {}

  // ── 6. Active program card with cycle badge ──
  try {
    const progCard = _el('h-active-prog-card');
    if (progCard && typeof profile !== 'undefined') {
      const pid  = profile.recPreset;
      const prog = pid && typeof PRESETS_DATA !== 'undefined' ? PRESETS_DATA.find(x => x.id === pid) : null;
      if (prog) {
        const tcol = (typeof TC !== 'undefined' && TC[prog.t]) || (typeof TC !== 'undefined' && TC.custom) || {bg:'var(--bg4)',c:'var(--text2)'};
        const badge = typeof getCycleBadgeHtml === 'function' ? getCycleBadgeHtml() : '';
        progCard.style.display = 'block';
        progCard.innerHTML = `<div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:14px 16px;margin:0 16px 12px;cursor:pointer;transition:border-color .15s;"
          onclick="goPage('allenamento')" onmouseover="this.style.borderColor='var(--border2)'" onmouseout="this.style.borderColor='var(--border)'">
          <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">📋 Programma attivo</div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="font-size:22px;flex-shrink:0;">${prog.icon}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:15px;font-weight:800;letter-spacing:-.2px;">${prog.name}</div>
              <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;margin-top:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:${tcol.bg};color:${tcol.c};">${prog.t}</span>
                <span style="font-size:10px;color:var(--text3);">${(prog.days||[]).filter(d=>!d.rest).length} giorni/sett. · ${prog.dur} min</span>
              </div>${badge}
            </div>
            <div style="font-size:18px;color:var(--text3);flex-shrink:0;">›</div>
          </div>
        </div>`;
      } else {
        progCard.style.display = 'none';
      }
    }
  } catch(e) {}

  // ── 7. Cycle banner (v5) ──
  if (typeof renderCycleBanner === 'function') try { renderCycleBanner(); } catch(e) {}

  // ── 8. Weekly calendar (v8) ──
  if (typeof renderHomeCalendar === 'function') try { renderHomeCalendar(); } catch(e) {}

  // ── 9. Contextual moto (v9) ──
  if (typeof setContextualMoto === 'function') try { setContextualMoto(); } catch(e) {}

  // ── 10. Weekly goal card ──
  if (typeof renderWeeklyGoalCard === 'function') try { renderWeeklyGoalCard(); } catch(e) {}

  // ── 11. AI coach banner (v19) ──
  if (typeof injectAICoachBanner === 'function') try { injectAICoachBanner(); } catch(e) {}

  // ── 12. V40 adaptive dashboard (deferred to avoid DOM race) ──
  if (typeof v40InjectDashboard === 'function') {
    requestAnimationFrame(() => { try { v40InjectDashboard(); } catch(e) {} });
  }
};

/* ─────────────────────────────────────────
   CONSOLIDATED initApp
   Merges: base + v(avatar) + v5(cycle) + v9(greeting/stats)
         + weeklyGoal + v40
───────────────────────────────────────── */
window.initApp = function initApp() {
  if (window._ftOnboardingActive) return; // blocca sempre durante onboarding
  if (typeof profile === 'undefined') return;

  // Avatar
  const n = profile.name || 'Atleta';
  const tbAv = _el('tb-av');
  if (tbAv) { tbAv.textContent = n[0].toUpperCase(); tbAv.onclick = () => goPage('profile'); }

  // Moto
  const motoEl = _el('moto-txt');
  if (motoEl && typeof MOTO !== 'undefined') motoEl.textContent = MOTO[Math.floor(Math.random() * MOTO.length)];

  // Core renders
  if (typeof renderLibrary === 'function')      try { renderLibrary(); }      catch(e) {}
  if (typeof renderWeeklyProgram === 'function') try { renderWeeklyProgram(); } catch(e) {}
  if (typeof renderPresetExplorer === 'function') try { renderPresetExplorer(); } catch(e) {}

  renderHome();

  // Cycle banner (v5)
  if (typeof renderCycleBanner === 'function') try { renderCycleBanner(); } catch(e) {}

  // V9 first-load enrichments
  if (typeof buildDynamicGreeting === 'function') try { buildDynamicGreeting(); } catch(e) {}
  if (typeof updateStatsStrip === 'function')    try { updateStatsStrip();     } catch(e) {}
  if (typeof setContextualMoto === 'function')   try { setContextualMoto();    } catch(e) {}

  // Weekly goal + presets (deferred by one tick — DOM must exist)
  Promise.resolve().then(() => {
    if (typeof renderWeeklyGoalCard === 'function')    try { renderWeeklyGoalCard(); }    catch(e) {}
    if (typeof renderPresetsInTraining === 'function') try { renderPresetsInTraining(); } catch(e) {}
    // Auto-features checks
    setTimeout(() => {
      try { if (typeof showDeloadBannerIfNeeded === 'function') showDeloadBannerIfNeeded(); } catch(e) {}
    }, 1500);
  });

  // Auto-save check (safe delay)
  if (typeof _checkAutoSaveOnLoad === 'function') setTimeout(_checkAutoSaveOnLoad, 1200);
};

/* ─────────────────────────────────────────
   CONSOLIDATED renderProfilePage
   Merges: base + v4(weight chart) + v5(cycle profile)
         + trainingEnv + fitnessProfile
───────────────────────────────────────── */
const _v41_baseRenderProfile = window.renderProfilePage;
window.renderProfilePage = function renderProfilePage() {
  if (typeof _v41_baseRenderProfile === 'function') {
    try { _v41_baseRenderProfile.apply(this, arguments); } catch(e) {}
  }
  // v4: weight chart
  if (typeof renderWeightChart === 'function')        try { renderWeightChart(); }        catch(e) {}
  // v5: cycle profile card
  if (typeof renderCycleProfile === 'function')       try { renderCycleProfile(); }       catch(e) {}
  // v23: equipment section (deferred — DOM must settle after base render)
  if (typeof renderEquipmentSection === 'function')   try { setTimeout(() => { try { renderEquipmentSection(); } catch(e) {} }, 30); } catch(e) {}
  // v25: premium section
  if (typeof injectPremiumProfileSection === 'function') try { injectPremiumProfileSection(); } catch(e) {}
  if (typeof updatePremiumBadge === 'function')       try { updatePremiumBadge(); }       catch(e) {}
  // v34: training environment section
  if (typeof injectEnvProfileSection === 'function')  try { setTimeout(() => { try { injectEnvProfileSection(); } catch(e) {} }, 15); } catch(e) {}
  // v39: fitness profile details
  if (typeof injectFitnessProfileDetails === 'function') try { setTimeout(() => { try { injectFitnessProfileDetails(); } catch(e) {} }, 20); } catch(e) {}
};

/* ─────────────────────────────────────────
   CONSOLIDATED finishWorkout
   Merges: base + v6(log + suggest) + weeklyGoal + v9(toast)
   Single async function, no chain.
───────────────────────────────────────── */
window.finishWorkout = async function finishWorkout() {
  if (typeof clearInterval === 'function' && typeof woTimer !== 'undefined') clearInterval(woTimer);
  if (typeof _clearAutoSave === 'function') _clearAutoSave();

  // Immediate feedback toast (v9)
  if (typeof showToast === 'function') showToast('⏳ Salvataggio sessione…');
  if (typeof clearInterval === 'function') try { clearInterval(window._v9RestVibInterval); } catch(e) {}

  // V6: save exercise log before session data is cleared
  if (typeof saveWorkoutToLog === 'function') try { await saveWorkoutToLog(); } catch(e) {}

  // Build session record
  const dur = Math.round((Date.now() - woStart) / 60000);
  const exs = (typeof woDayData !== 'undefined' && woDayData.exercises) || [];
  let vol = 0;
  exs.forEach(ex => { vol += (typeof safeSets === 'function' ? safeSets(ex.s) : parseInt(ex.s)||3) * (typeof safeReps === 'function' ? safeReps(ex.r) : parseInt(ex.r)||10); });
  const totalSets = exs.reduce((a, ex) => a + (typeof safeSets === 'function' ? safeSets(ex.s) : 3), 0);
  const doneSets  = Object.keys(typeof woSets !== 'undefined' ? woSets : {}).filter(k => woSets[k]).length;
  const sessionRecord = {
    date: typeof today === 'function' ? today() : new Date().toISOString().slice(0,10),
    progName: (typeof woProgram !== 'undefined' && woProgram.name) || '',
    dayName:  (typeof woDayData !== 'undefined'  && woDayData.name)  || '',
    duration: dur, exCount: (exs||[]).length, volume: vol, doneSets, totalSets,
    woSetsSnap: {...(typeof woSets !== 'undefined' ? woSets : {})}
  };

  if (typeof sessions !== 'undefined') sessions.push(sessionRecord);
  if (typeof saveAll === 'function') await saveAll();

  // Close overlay
  const ovl = _el('wo-ovl');
  if (ovl) ovl.classList.remove('open');

  // Re-render core pages
  if (typeof renderAllenamento === 'function') try { renderAllenamento(); } catch(e) {}
  renderHome();

  // Notification
  if (typeof addNotification === 'function') {
    try { addNotification('🎉 Sessione completata', `${woDayData?.name || ''} · ${dur} min · volume ${vol}`, 'workout'); } catch(e) {}
  }

  // V6: post-session analysis
  if (typeof analyzeAndSuggest === 'function') {
    try {
      const prog = (typeof woProgram !== 'undefined' && woProgram) || (typeof profile !== 'undefined' && profile.generatedPlan) || null;
      if (prog) analyzeAndSuggest(prog);
    } catch(e) {}
  }

  // Weekly goal update (weeklyGoal system)
  if (typeof renderWeeklyGoalCard === 'function') try { renderWeeklyGoalCard(); } catch(e) {}
  if (typeof getWeeklyCompleted === 'function') {
    try {
      const completed = getWeeklyCompleted();
      const target    = (typeof profile !== 'undefined' && profile.weeklyWorkoutsTarget) || 3;
      const msg = completed >= target
        ? `🏆 Obiettivo settimanale raggiunto! ${target}/${target}`
        : `📅 ${completed}/${target} allenamenti questa settimana`;
      setTimeout(() => { if (typeof showToast === 'function') showToast(msg); }, 1800);
    } catch(e) {}
  }

  // Post-workout summary (deferred to let DOM settle)
  setTimeout(() => {
    if (typeof showPwSummary === 'function') {
      try { showPwSummary(dur, exs, vol, sessionRecord); } catch(e) {}
    }
  }, 300);
};

/* ─────────────────────────────────────────
   CONSOLIDATED renderWoExs
   Merges: base + v6(progressive weight badge)
         + v7(badge clickable) + v9(per-ex weight entry)
         + v17(series counter label) + v17b(skip easier)
───────────────────────────────────────── */
const _v41_baseRenderWoExs = (function() {
  // Capture the original base (pre-patch) function
  // We re-implement it cleanly here rather than chaining
  return function() {
    const exs = (typeof woDayData !== 'undefined' && woDayData.exercises) || [];
    const totalSets    = exs.reduce((a, ex) => a + (typeof safeSets==='function'?safeSets(ex.s):3), 0);
    const doneSetsCount= Object.keys(typeof woSets!=='undefined'?woSets:{}).filter(k=>woSets[k]).length;
    const pct = totalSets > 0 ? Math.round(doneSetsCount / totalSets * 100) : 0;
    const rem = totalSets - doneSetsCount;
    const progFill = _el('wo-prog-fill');
    const pctLabel = _el('wo-pct-label');
    if (progFill) progFill.style.width = pct + '%';
    if (pctLabel) {
      if (rem > 0) {
        pctLabel.innerHTML = `<span style="color:var(--acc);font-weight:700;">${doneSetsCount}</span> <span style="color:var(--text3)">/ ${totalSets} serie completate</span> &nbsp;·&nbsp; <span style="color:var(--text2)">${rem} rimanenti</span>`;
      } else if (totalSets > 0) {
        pctLabel.innerHTML = `<span style="color:var(--green);font-weight:700;">✓ Tutte le serie completate!</span>`;
      } else {
        pctLabel.textContent = pct + '% completato';
      }
    }

    const BODYWEIGHT_EXS = new Set(['burpees','mt-cl','jump-j','hi-kn','sprint','plank','side-plank','hollow','lsit','hshold']);
    const woExsEl = _el('wo-exs');
    if (!woExsEl) return;
    woExsEl.innerHTML = exs.map((ex, ei) => {
      const exD = (typeof EX_DB !== 'undefined' && EX_DB.find(e => e.id === ex.id)) || {name: ex.name || ex.id, tags: []};
      const sets      = typeof safeSets === 'function' ? safeSets(ex.s) : parseInt(ex.s) || 3;
      const isPushPull= ex.id && !BODYWEIGHT_EXS.has(ex.id);
      // Progressive weight badge (v6)
      const suggestedWeight = typeof getProgressiveWeight === 'function' ? getProgressiveWeight(ex.id, typeof safeReps==='function'?safeReps(ex.r):10) : 0;
      // Last recorded weight (v9)
      const lastW = (typeof profile !== 'undefined' && profile.exWeights?.[ex.id]);
      const weightBadge = lastW
        ? `<div class="v9-weight-badge" style="margin-top:6px;display:flex;align-items:center;gap:8px;">
            <span style="font-size:11px;color:var(--acc);font-weight:700;">⚖️ Ultima: ${lastW.kg} kg</span>
            <button onclick="openWeightInput(${ei},'${ex.id}','${exD.name.replace(/'/g,"\\'")}');event.stopPropagation()" style="font-size:10px;color:var(--text3);background:none;border:none;cursor:pointer;padding:2px 6px;border-radius:4px;font-family:'Syne',sans-serif;">Modifica</button>
          </div>`
        : `<div class="v9-weight-badge" style="margin-top:6px;">
            <button onclick="openWeightInput(${ei},'${ex.id}','${exD.name.replace(/'/g,"\\'")}');event.stopPropagation()" style="font-size:11px;font-weight:700;color:var(--text3);background:var(--bg4);border:1px dashed var(--border2);border-radius:6px;padding:5px 10px;cursor:pointer;font-family:'Syne',sans-serif;">⚖️ Inserisci peso usato</button>
          </div>`;
      // Suggested weight badge (v6 — only if progressive weight available and no last recorded)
      const progBadge = (!lastW && suggestedWeight > 0)
        ? `<span class="v6-weight-badge" style="display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:700;background:rgba(200,245,60,0.12);color:var(--acc);border:1px solid rgba(200,245,60,0.25);border-radius:99px;padding:2px 9px;margin-left:10px;vertical-align:middle;font-family:'DM Mono',monospace;" title="Peso progressivo suggerito">⚖ ${suggestedWeight} kg</span>`
        : '';

      const setRows = Array.from({length: sets}, (_, si) => {
        const done = !!(typeof woSets !== 'undefined' && woSets[ei+'_'+si]);
        const wKey = 'wo_w_'+ei+'_'+si;
        const savedW = (typeof woWeights !== 'undefined' && woWeights[wKey]) || '';
        return `<div class="wo-set-row${done?' done':''}" style="cursor:default;display:block;padding:10px 13px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="wo-set-n">Serie ${si+1}</div>
            <div class="wo-set-info" style="flex:1">${ex.r||'10'} reps · riposo ${ex.rs||'75s'}</div>
            ${isPushPull ? `<div style="display:flex;align-items:center;gap:4px;">
              <input type="number" inputmode="decimal" placeholder="kg" value="${savedW}"
                onchange="if(typeof woWeights!=='undefined'){woWeights['${wKey}']=this.value;if(typeof _autoSaveWorkout==='function')_autoSaveWorkout();}"
                onclick="event.stopPropagation()"
                style="width:54px;background:var(--bg4);border:1px solid ${done?'var(--acc)':'var(--border)'};border-radius:var(--r-sm);padding:5px 7px;font-size:12px;font-family:'DM Mono',monospace;color:var(--text);text-align:center;outline:none;">
              <span style="font-size:10px;color:var(--text3)">kg</span>
            </div>` : ''}
            <div class="wo-set-chk" onclick="if(typeof toggleWoSet==='function')toggleWoSet(${ei},${si},'${ex.rs||'75s'}')" style="cursor:pointer;padding:4px;font-size:20px;">${done?'✅':'○'}</div>
          </div>
        </div>`;
      }).join('');

      return `<div class="wo-ex-card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <div class="wo-ex-nm" style="margin-bottom:0">${exD.name}${progBadge}</div>

        </div>
        ${weightBadge}
        ${setRows}
      </div>`;
    }).join('');
  };
})();

window.renderWoExs = _v41_baseRenderWoExs;

/* ─────────────────────────────────────────
   CONSOLIDATED obGo
   Merges all obGo patches into one coherent flow.
   Preserves: sex→skip-cycle-step, equipment step,
              step counter update, segment bar, plan build.
───────────────────────────────────────── */
// ═══════════════════════════════════════════════════════════════
//  CONSOLIDATED obGo — versione finale unica, stabile e robusta
//  Sostituisce tutte le versioni precedenti (v41, v17, v8 ecc.)
//  Ordine step: 0→1→22→2→21→23→24→25→26→27→45a→45b→45c→3b→3c→4→5→6→7
// ═══════════════════════════════════════════════════════════════
window.obGo = function obGo(step) {
  try {
    var sex = (document.getElementById('ob-sex') && document.getElementById('ob-sex').value)
              || (typeof obSel !== 'undefined' && obSel && obSel.sex)
              || 'm';

    // ── Salta step 6 (ciclo) per maschi ──
    if (step === 6 && sex !== 'f') {
      if (typeof obSel !== 'undefined') obSel.cycle = 'no';
      step = 7;
    }

    // ── ob3 è uno step vuoto/rimosso: redirect sicuro a ob4 ──
    if (step === 3) { step = 4; }

    // ── Genera piano prima di step 7 ──
    if (step === 7 && typeof buildGeneratedPlan === 'function') {
      try { buildGeneratedPlan(); } catch(e) { console.warn('[obGo] buildGeneratedPlan error:', e); }
    }

    // ── Trigger preview per step 3c ──
    if (step === '3c') {
      setTimeout(function() {
        if (typeof obRefreshSmartPreview === 'function') obRefreshSmartPreview();
      }, 100);
    }

    // ── Deattiva step corrente ──
    if (typeof obCurStep !== 'undefined') {
      var curEl = document.getElementById('ob' + obCurStep);
      if (curEl) curEl.classList.remove('active');
    }

    // ── Aggiorna stato ──
    if (typeof obCurStep !== 'undefined') obCurStep = step;
    window._v41_inEquipStep = false;

    // ── Attiva nuovo step ──
    var el = document.getElementById('ob' + step);
    if (el) {
      el.classList.add('active');
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = '';
    } else {
      console.warn('[obGo] step element not found: ob' + step);
    }

    // ── Aggiorna barre progresso ──
    var stepOrder = [0,1,22,2,21,23,24,25,26,27,'45a','45b','45c','3b','3c',4,5,6,7];
    var visualIdx = stepOrder.indexOf(step);
    var segs = document.querySelectorAll('.ob-prog-seg');
    if (segs.length > 0) {
      var pct = visualIdx < 0 ? 0 : (visualIdx + 1) / stepOrder.length;
      segs.forEach(function(seg, i) {
        seg.classList.toggle('on', i < Math.ceil(pct * segs.length));
      });
    } else {
      for (var i = 0; i < 9; i++) {
        var seg = document.getElementById('seg' + i);
        if (seg) seg.classList.toggle('on', visualIdx < 0 ? false : i <= visualIdx);
      }
    }

    // ── Aggiorna label step 7 ──
    if (step === 7) {
      var eyebrow = document.querySelector('#ob7 .ob-eyebrow');
      if (eyebrow) eyebrow.textContent = sex === 'f' ? 'Passo 19 di 19 — Il tuo programma' : 'Passo 18 di 18 — Il tuo programma';
    }

  } catch(err) {
    console.error('[obGo] Errore critico, fallback manuale:', err);
    // Fallback sicuro: mostra lo step richiesto comunque
    try {
      document.querySelectorAll('.ob-step').forEach(function(s) { s.classList.remove('active'); });
      var fallbackEl = document.getElementById('ob' + step);
      if (fallbackEl) {
        fallbackEl.classList.add('active');
        fallbackEl.style.animation = 'none';
        void fallbackEl.offsetHeight;
        fallbackEl.style.animation = '';
      }
    } catch(e2) { console.error('[obGo] Fallback failed:', e2); }
  }
};

/* ─────────────────────────────────────────
   CONSOLIDATED saveCycleSettings
   Merges: base + v40 dashboard refresh
───────────────────────────────────────── */
// v41 saveCycle wrapper: aggiunge solo v40InjectDashboard (il resto già in saveCycleSettings)
const _v41_baseSaveCycle = window.saveCycleSettings;
if (typeof _v41_baseSaveCycle === 'function') {
  window.saveCycleSettings = async function saveCycleSettings() {
    await _v41_baseSaveCycle.apply(this, arguments);
    if (typeof v40InjectDashboard === 'function') try { v40InjectDashboard(); } catch(e) {}
  };
}

/* ─────────────────────────────────────────
   CONSOLIDATED renderProgressi
   Merges: base + v4(weight chart)
───────────────────────────────────────── */
const _v41_baseRenderProgressi = window.renderProgressi;
if (typeof _v41_baseRenderProgressi === 'function') {
  window.renderProgressi = function renderProgressi() {
    try { _v41_baseRenderProgressi.apply(this, arguments); } catch(e) {}
    if (typeof renderWeightChart === 'function') try { renderWeightChart(); } catch(e) {}
  };
}

/* ─────────────────────────────────────────
   SAFE goPage — null-guard + deduplication
───────────────────────────────────────── */
const _v41_origGoPage = window.goPage;
window.goPage = function goPage(p) {
  document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.bni').forEach(el => el.classList.remove('on'));
  const pageEl = document.getElementById('page-' + p);
  if (!pageEl) return; // silent — no console warn needed in production
  pageEl.classList.add('active');
  const ni = document.getElementById('bni-' + p);
  if (ni) ni.classList.add('on');

  const safeCall = (fn, name) => { if (typeof fn === 'function') try { fn(); } catch(e) {} };

  switch (p) {
    case 'home':       renderHome(); if(typeof renderWeeklyGoalCard==='function')renderWeeklyGoalCard(); break;
    case 'allenamento': safeCall(renderAllenamento,'renderAllenamento'); safeCall(renderWeeklyProgram,'renderWeeklyProgram'); safeCall(renderPresetsInTraining,'renderPresetsInTraining'); break;
    case 'esplora':    safeCall(renderPresetExplorer,'renderPresetExplorer'); break;
    case 'esercizi':   safeCall(filterLibrary,'filterLibrary'); break;
    case 'nutrizione': safeCall(renderNutrizione,'renderNutrizione'); break;
    case 'progressi':  if(typeof renderProgressi==='function') renderProgressi(); break;
    case 'coach':      safeCall(renderCoach,'renderCoach'); break;
    case 'ricette':    safeCall(window.renderRicette,'renderRicette'); break;
    case 'profile':    if(typeof renderProfilePage==='function') renderProfilePage(); break;
  }
};

/* ─────────────────────────────────────────
   STRIP ALL DEAD console.log CALLS
   (runtime patch — silences all [Vx] debug logs)
───────────────────────────────────────── */
// Tutti i console.log con marker [*] sono già stati rimossi — no override necessario

/* ─────────────────────────────────────────
   DEDUPLICATION GUARD — renderWoExs
   Prevent any remaining old wrapper from
   re-triggering another renderWoExs call
   (e.g. via lingering closure references)
───────────────────────────────────────── */
let _v41_renderWoExsRunning = false;
const _v41_safeRenderWoExs = window.renderWoExs;
window.renderWoExs = function renderWoExs() {
  if (_v41_renderWoExsRunning) return;
  _v41_renderWoExsRunning = true;
  try { _v41_safeRenderWoExs(); } finally { _v41_renderWoExsRunning = false; }
};

/* ─────────────────────────────────────────
   SMART BOOT — wait for real DOM + data ready
   Replaces all the scattered setTimeout boots
   with a single sequential init
───────────────────────────────────────── */
function v41Boot() {
  // Guard: don't boot if DB not ready
  const waitDB = (cb, n) => {
    if (typeof db !== 'undefined') { cb(); return; }
    if (n <= 0) { cb(); return; } // fallback
    setTimeout(() => waitDB(cb, n - 1), 60);
  };

  waitDB(() => {
    // Re-run initApp only if not in onboarding AND app not already active
    if (!window._ftOnboardingActive && !document.getElementById('scr-app')?.classList.contains('active') && typeof initApp === 'function') try { initApp(); } catch(e) {}

    // Deferred extras (after first paint)
    requestAnimationFrame(() => {
      if (typeof v40InjectDashboard === 'function') try { v40InjectDashboard(); } catch(e) {}
    });
  }, 20);
}

// Trigger v41Boot — only if boot() hasn't already been called by BootFix
// This prevents double-init on normal load paths
if (typeof window._fittrackBootCalled === 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(v41Boot, 200));
  } else {
    setTimeout(v41Boot, 200);
  }
}

/* ─────────────────────────────────────────
   EXPOSE KEY V41 UTILITIES
───────────────────────────────────────── */
window.v41 = {
  version: '41',
  renderHome,
  goPage: window.goPage,
  _el,
  _setText,
};

})(); /* end FitTrackV41 */

(function v42Fix() {
  function whenReady(fn, maxWait) {
    var t0 = Date.now();
    var id = setInterval(function() {
      if (Date.now() - t0 > (maxWait || 8000)) { clearInterval(id); return; }
      try { fn(); clearInterval(id); } catch(e) {}
    }, 80);
  }

  /* 1. BYPASS PAYWALL */
  whenReady(function() {
    if (typeof isPremium === 'undefined') throw 'w';
    window.isPremium = function() { return true; };
  });

  /* 2. FIX selectPresetV20 */
  whenReady(function() {
    if (typeof PRESETS_DATA === 'undefined' || typeof profile === 'undefined') throw 'w';
    window.selectPresetV20 = async function(presetId) {
      var allP = [];
      if (typeof WORKOUT_PRESETS !== 'undefined') allP = allP.concat(WORKOUT_PRESETS);
      if (typeof PRESETS_DATA !== 'undefined') allP = allP.concat(PRESETS_DATA);
      var seen = {};
      allP = allP.filter(function(p){ if(seen[p.id]) return false; seen[p.id]=1; return true; });
      var preset = allP.find(function(p){ return p.id === presetId; });
      if (!preset) return;

      /* Cancella piano generato — priorità al preset scelto manualmente */
      profile.generatedPlan = null;
      profile.recPreset = presetId;

      var prog = JSON.parse(JSON.stringify(preset));
      if (typeof normalizeProgramSets === 'function') normalizeProgramSets(prog);
      var goalType = (profile.goalsMeta && profile.goalsMeta.goalType) || 'maintain';
      if (typeof adaptProgramToGoal === 'function') prog = adaptProgramToGoal(prog, goalType) || prog;
      window.woProgram = prog;

      if (typeof saveAll === 'function') await saveAll();
      if (typeof dbSet === 'function') await dbSet('program', prog);

      window._v42RefreshAll();

      var progTab = document.getElementById('alt-programma');
      if (progTab) {
        if (typeof switchAlTab === 'function') switchAlTab('programma', progTab);
        progTab.classList.add('on');
        document.querySelectorAll('.al-tab').forEach(function(t){ if(t!==progTab) t.classList.remove('on'); });
      }
      if (typeof showToast === 'function') showToast('Programma attivo: ' + preset.icon + ' ' + preset.name);
    };
  });

  /* 3. FIX _getActiveProgram */
  whenReady(function() {
    if (typeof PRESETS_DATA === 'undefined') throw 'w';
    window._getActiveProgram = function() {
      if (window.woProgram && window.woProgram.days && window.woProgram.days.length) return window.woProgram;
      if (profile.recPreset && !profile.generatedPlan) {
        var p = PRESETS_DATA.find(function(x){ return x.id === profile.recPreset; });
        if (p) return p;
      }
      if (profile.generatedPlan && profile.generatedPlan.schedule && profile.generatedPlan.schedule.length) {
        return {
          id: profile.recPreset || 'generated',
          name: profile.generatedPlan.presetName || 'Piano personalizzato',
          icon: profile.generatedPlan.presetIcon || '\ud83c\udfd7',
          days: profile.generatedPlan.schedule.map(function(s){ return s.day; }),
          _isGeneratedPlan: true,
          _schedule: profile.generatedPlan.schedule
        };
      }
      if (profile.recPreset) {
        var p2 = PRESETS_DATA.find(function(x){ return x.id === profile.recPreset; });
        if (p2) return p2;
      }
      if (window.editProg && window.editProg.days && window.editProg.days.length) return window.editProg;
      return null;
    };
  });

  /* 4. FIX startPresetDay — rimuovi blocco premium */
  whenReady(function() {
    if (typeof startPresetDay === 'undefined' || typeof beginWorkout === 'undefined') throw 'w';
    window.startPresetDay = function(presetId, dayIndex) {
      var allP = [];
      if (typeof WORKOUT_PRESETS !== 'undefined') allP = allP.concat(WORKOUT_PRESETS);
      if (typeof PRESETS_DATA !== 'undefined') allP = allP.concat(PRESETS_DATA);
      var preset = allP.find(function(p){ return p.id === presetId; });
      if (!preset) return;
      var prog = JSON.parse(JSON.stringify(preset));
      if (typeof normalizeProgramSets === 'function') normalizeProgramSets(prog);
      var day = prog.days[dayIndex];
      if (!day) { if(typeof showToast==='function') showToast('Giorno non trovato'); return; }
      beginWorkout(prog, day);
    };
  });

  /* 5. Helper refresh globale */
  window._v42RefreshAll = function() {
    try { typeof renderWeeklyProgram==='function' && renderWeeklyProgram(); } catch(e){}
    try { typeof renderHomeCalendar==='function' && renderHomeCalendar(); } catch(e){}
    try { typeof renderHome==='function' && renderHome(); } catch(e){}
    try { typeof renderPresetsInTraining==='function' && renderPresetsInTraining(); } catch(e){}
    try { typeof renderEsploraV20==='function' && renderEsploraV20(); } catch(e){}
    try { typeof renderHomeCta==='function' && renderHomeCta(); } catch(e){}
    var spPreset = document.getElementById('sp-preset');
    if (spPreset && profile && profile.recPreset) spPreset.value = profile.recPreset;
  };

  /* 6. Boot: ricostruisci woProgram da recPreset se perso */
  whenReady(function() {
    if (typeof PRESETS_DATA === 'undefined' || typeof profile === 'undefined') throw 'w';
    setTimeout(function() {
      if (profile.recPreset && (!window.woProgram || !window.woProgram.days || !window.woProgram.days.length)) {
        var preset = PRESETS_DATA.find(function(x){ return x.id === profile.recPreset; });
        if (preset) {
          var prog = JSON.parse(JSON.stringify(preset));
          if (typeof normalizeProgramSets === 'function') normalizeProgramSets(prog);
          window.woProgram = prog;
          window._v42RefreshAll();
        }
      }
    }, 1500);
  }, 12000);

})();
