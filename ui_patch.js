var RICETTE_CATS=[
  {id:'all',label:'Tutte'},
  {id:'massa',label:'💪 Massa'},
  {id:'definizione',label:'🎯 Definizione'},
  {id:'pre-workout',label:'⚡ Pre-WO'},
  {id:'post-workout',label:'🔄 Post-WO'},
  {id:'veg',label:'🌿 Veg'},
  {id:'colazione',label:'☀️ Colazione'},
  {id:'pranzo',label:'🍴 Pranzo'},
  {id:'cena',label:'🌙 Cena'},
  {id:'spuntino',label:'🍎 Spuntino'},
  {id:'rapido',label:'⏱ Rapido'},
  {id:'meal-prep',label:'📦 Meal Prep'},
  {id:'snack',label:'🍫 Snack'},
  {id:'dolci',label:'🍰 Dolci Fit'},
];

var RICETTE_ALIMENTI=[
  /* ── PROTEINE ANIMALI ── */
  {id:'pollo',label:'🍗 Pollo'},
  {id:'manzo',label:'🥩 Manzo'},
  {id:'tacchino',label:'🦃 Tacchino'},
  {id:'salmone',label:'🐟 Salmone'},
  {id:'tonno',label:'🐡 Tonno'},
  {id:'gamberoni',label:'🍤 Gamberoni'},
  {id:'uova',label:'🥚 Uova'},
  {id:'polpo',label:'🐙 Polpo'},
  {id:'merluzzo',label:'🐠 Merluzzo'},
  {id:'prosciutto',label:'🥓 Prosciutto'},
  {id:'bacon',label:'🥓 Bacon'},
  /* ── LATTICINI ── */
  {id:'yogurt greco',label:'🫙 Yogurt Greco'},
  {id:'ricotta',label:'🧀 Ricotta'},
  {id:'cottage cheese',label:'🧀 Cottage'},
  {id:'parmigiano',label:'🧀 Parmigiano'},
  {id:'feta',label:'🧀 Feta'},
  {id:'latte',label:'🥛 Latte'},
  /* ── PROTEINE VEGETALI ── */
  {id:'tofu',label:'🟨 Tofu'},
  {id:'tempeh',label:'🟤 Tempeh'},
  {id:'ceci',label:'🫘 Ceci'},
  {id:'lenticchie',label:'🫘 Lenticchie'},
  {id:'fagioli',label:'🫘 Fagioli'},
  {id:'edamame',label:'🫘 Edamame'},
  {id:'whey',label:'🥛 Whey'},
  /* ── CEREALI & CARBOIDRATI ── */
  {id:'avena',label:'🌾 Avena'},
  {id:'riso',label:'🍚 Riso'},
  {id:'pasta integrale',label:'🍝 Pasta'},
  {id:'pasta',label:'🍝 Pasta Bianc.'},
  {id:'quinoa',label:'🌿 Quinoa'},
  {id:'pane integrale',label:'🍞 Pane Integrale'},
  {id:'patate',label:'🥔 Patate'},
  {id:'patate dolci',label:'🍠 Patate Dolci'},
  {id:'tortilla',label:'🫓 Tortilla'},
  /* ── GRASSI & CONDIMENTI ── */
  {id:'avocado',label:'🥑 Avocado'},
  {id:'burro di arachidi',label:'🥜 Burro Arachidi'},
  {id:'mandorle',label:'🌰 Mandorle'},
  {id:'tahini',label:'🫙 Tahini'},
  {id:'olio evo',label:'🫒 Olio EVO'},
  {id:'sesamo',label:'🌱 Sesamo'},
  /* ── FRUTTA & VERDURA ── */
  {id:'banana',label:'🍌 Banana'},
  {id:'mirtilli',label:'🫐 Mirtilli'},
  {id:'fragole',label:'🍓 Fragole'},
  {id:'spinaci',label:'🥬 Spinaci'},
  {id:'broccoli',label:'🥦 Broccoli'},
  {id:'zucchine',label:'🥒 Zucchine'},
  {id:'peperoni',label:'🫑 Peperoni'},
  {id:'pomodori',label:'🍅 Pomodori'},
  {id:'cetriolo',label:'🥒 Cetriolo'},
  {id:'carote',label:'🥕 Carote'},
  {id:'mela',label:'🍎 Mela'},
];

function _ricettaMatchFiltri(r){
  // Filtro per nome
  if(ricetteSearchQ && !(r.name||'').toLowerCase().includes(ricetteSearchQ)) return false;
  // Filtro per categoria
  if(ricetteFilter!=='all' && !r.tags.includes(ricetteFilter)) return false;
  // Filtro per ingredienti: cerca in alimenti[], ingredienti[], steps e desc
  if(ricetteIngFiltri.length===0) return true;
  var haystack=(
    (r.alimenti||[]).join(' ')+' '+
    (r.ingredienti||[]).join(' ')+' '+
    (typeof r.steps==='string'?r.steps:(r.steps||[]).join(' '))+' '+
    (r.desc||'')+' '+
    (r.ing||[]).join(' ')
  ).toLowerCase();
  // partial match: "pollo" matcha anche "petto di pollo grigliato"
  return ricetteIngFiltri.every(function(ing){
    return haystack.indexOf(ing.toLowerCase())>=0;
  });
}

function renderRicette(){
  const froot=document.getElementById('ricette-filters');
  if(froot) froot.innerHTML=RICETTE_CATS.map(function(c){ var cid=c.id; return '<button class="rf-chip'+(cid===ricetteFilter?' on':'')+'" onclick="setRicetteFilter(\''+cid+'\',this)">'+c.label+'</button>'; }).join('');

  const fing=document.getElementById('ricette-ing-filters');
  if(fing){
    const open=fing.getAttribute('data-open')==='1';
    const ingBtns=RICETTE_ALIMENTI.map(function(a){
      const sel=ricetteIngFiltri.indexOf(a.id)>=0;
      return '<button onclick="toggleIngFiltro(\''+a.id+'\')" style="padding:5px 10px;border-radius:99px;font-size:12px;font-family:\'Syne\',sans-serif;font-weight:700;cursor:pointer;border:1.5px solid '+(sel?'var(--acc)':'var(--border2)')+';background:'+(sel?'rgba(200,245,60,.15)':'var(--bg3)')+';color:'+(sel?'var(--acc)':'var(--text2)')+'">'+a.label+'</button>';
    }).join('');
    fing.innerHTML='<div style="display:flex;align-items:center;gap:8px;margin-bottom:'+(open?'8px':'0')+'">'
      +'<button onclick="toggleIngFiltriPanel()" style="display:flex;align-items:center;gap:6px;background:'+(ricetteIngFiltri.length?'rgba(200,245,60,.15)':'var(--bg3)')+';border:1.5px solid '+(ricetteIngFiltri.length?'var(--acc)':'var(--border2)')+';color:'+(ricetteIngFiltri.length?'var(--acc)':'var(--text2)')+';padding:6px 12px;border-radius:99px;font-family:\'Syne\',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">'
      +'🥦 Filtra per ingrediente'+(ricetteIngFiltri.length?' ('+ricetteIngFiltri.length+')':'')+'<span style="font-size:10px">'+(open?'▲':'▼')+'</span></button>'
      +(ricetteIngFiltri.length?'<button onclick="clearIngFiltri()" style="background:none;border:none;color:var(--text3);font-size:11px;cursor:pointer;font-family:\'Syne\',sans-serif;">✕ Cancella</button>':'')
      +'</div>'
      +(open?'<div style="display:flex;flex-wrap:wrap;gap:6px;padding:4px 0 8px;">'+ingBtns+'</div>':'');
  }

  const list=document.getElementById('ricette-list');
  if(!list) return;
  const filtered=RICETTE.filter(_ricettaMatchFiltri);
  if(!filtered.length){
    list.innerHTML='<div style="padding:32px;text-align:center;color:var(--text2)"><div style="font-size:32px;margin-bottom:8px">🔍</div>Nessuna ricetta con questi filtri.<br><button onclick="clearIngFiltri();setRicetteFilter(\'all\',document.querySelector(\'.rf-chip\'))" style="margin-top:12px;padding:8px 16px;background:var(--acc3);color:var(--acc);border:none;border-radius:99px;font-family:\'Syne\',sans-serif;font-weight:700;cursor:pointer;">Rimuovi filtri</button></div>';
    return;
  }
  list.innerHTML=filtered.map(function(r,i){
    const tagBadges=r.tags.map(function(t){
      const cat=RICETTE_CATS.find(function(c){ return c.id===t; });
      return cat&&cat.id!=='all'?'<span class="recipe-tag" style="background:var(--acc3);color:var(--acc)">'+cat.label+'</span>':'';
    }).join('');
    const ingMatch=(r.alimenti||[]).filter(function(a){ return ricetteIngFiltri.indexOf(a)>=0; }).map(function(a){ return '<span class="recipe-tag" style="background:rgba(200,245,60,.18);color:var(--acc);border:1px solid var(--acc)">'+a+'</span>'; }).join('');
    return '<div class="recipe-card">'
      +'<div class="recipe-head" onclick="toggleRecipe(\'rc'+i+'\',this)">'
        +'<div class="recipe-ico">'+r.ico+'</div>'
        +'<div class="recipe-info">'
          +'<div class="recipe-name">'+r.name+'</div>'
          +'<div class="recipe-tags">'+tagBadges+ingMatch+'<span class="recipe-tag" style="background:var(--bg4);color:var(--text2)">⏱ '+r.time+'</span><span class="recipe-tag" style="background:var(--bg4);color:var(--text2)">'+r.diff+'</span></div>'
          +'<div class="recipe-desc">'+r.desc+'</div>'
        +'</div>'
      +'</div>'
      +'<div class="recipe-macros">'
        +'<div class="recipe-macro"><div class="recipe-macro-val" style="color:var(--acc)">'+r.kcal+'</div><div class="recipe-macro-lbl">kcal</div></div>'
        +'<div class="recipe-macro"><div class="recipe-macro-val" style="color:var(--green)">'+r.p+'g</div><div class="recipe-macro-lbl">proteine</div></div>'
        +'<div class="recipe-macro"><div class="recipe-macro-val" style="color:var(--blue)">'+r.c+'g</div><div class="recipe-macro-lbl">carbs</div></div>'
        +'<div class="recipe-macro"><div class="recipe-macro-val" style="color:var(--orange)">'+r.g+'g</div><div class="recipe-macro-lbl">grassi</div></div>'
      +'</div>'
      +'<div class="recipe-body" id="rc'+i+'">'
        +'<div class="recipe-ingredients"><div class="ri-title">Ingredienti</div>'+r.ingredienti.map(function(ing){ return '<div class="ri-item"><div class="ri-dot"></div>'+ing+'</div>'; }).join('')+'</div>'
        +'<div class="recipe-steps"><div class="ri-title" style="margin-top:12px">Preparazione</div>'+r.steps.map(function(s,si){ return '<div class="rs-step"><div class="rs-num">'+(si+1)+'</div><div class="rs-txt">'+s+'</div></div>'; }).join('')+'</div>'
        +'<button style="margin-top:12px;width:100%;padding:11px;background:var(--green-d);color:var(--green);border:1px solid rgba(62,223,138,.2);border-radius:var(--r);font-family:\'Syne\',sans-serif;font-size:12px;font-weight:700;cursor:pointer" onclick="addRecipeToNutr(\''+r.id+'\')">+ Aggiungi ai pasti di oggi</button>'
      +'</div>'
    +'</div>';
  }).join('');
}

function toggleIngFiltriPanel(){
  const fing=document.getElementById('ricette-ing-filters');
  if(!fing) return;
  fing.setAttribute('data-open', fing.getAttribute('data-open')==='1'?'0':'1');
  renderRicette();
}

function toggleIngFiltro(id){
  const idx=ricetteIngFiltri.indexOf(id);
  if(idx>=0) ricetteIngFiltri.splice(idx,1);
  else ricetteIngFiltri.push(id);
  renderRicette();
}

function clearIngFiltri(){
  ricetteIngFiltri=[];
  renderRicette();
}

function setRicetteFilter(f,btn){
  ricetteFilter=f;
  document.querySelectorAll('.rf-chip').forEach(function(c){ c.classList.remove('on'); });
  if(btn) btn.classList.add('on');
  renderRicette();
}

function toggleRecipe(id,head){
  const body=document.getElementById(id);
  if(body) body.classList.toggle('open');
}

function addRecipeToNutr(id){
  const r=RICETTE.find(x=>x.id===id);
  if(!r) return;
  const nt=todayNutr();
  const mealIdx=1; // pranzo di default
  nt.meals[mealIdx].items.push({name:r.name+' (ricetta)',g:1,unit:'porzione',kcal:r.kcal,p:r.p,c:r.c,g_fat:r.g});
  saveAll();
  showToast('✅ '+r.name+' aggiunto al pranzo!');
}

// ════════════════════════════════════════
// V4 — WORKOUT PROGRESS BAR (patch finishWorkout + renderWoExs)
// ════════════════════════════════════════
function updateWoProgressBar(){
  const exs=woDayData?.exercises||[];
  const totalSets=exs.reduce((a,ex)=>a+safeSets(ex.s),0);
  const doneSets=Object.values(woSets).filter(Boolean).length;
  const pct=totalSets>0?Math.round(doneSets/totalSets*100):0;
  const bar=document.getElementById('wo-prog-fill');
  const lbl=document.getElementById('wo-pct-label');
  if(bar) bar.style.width=pct+'%';
  if(lbl) lbl.textContent=`${pct}% completato · ${doneSets}/${totalSets} serie`;

  // ── Aggiorna ring + stat counters ──
  const arc = document.getElementById('wo-ring-arc');
  const pctNum = document.getElementById('wo-ring-pct-num');
  const statSets = document.getElementById('wo-stat-sets');
  const statTime = document.getElementById('wo-stat-time');
  const statVol  = document.getElementById('wo-stat-vol');

  if(arc){
    const circumf = 157; // 2π×25
    arc.style.strokeDashoffset = circumf * (1 - pct/100);
    // Colore dinamico
    const col = pct >= 100 ? 'var(--green)' : pct >= 50 ? 'var(--acc)' : 'var(--blue)';
    arc.style.stroke = col;
    if(pctNum){ pctNum.style.color = col; pctNum.textContent = pct+'%'; }
  }

  if(statSets) statSets.textContent = doneSets+'/'+totalSets;

  // Volume: somma tutti i pesi fatti (se disponibili)
  if(statVol){
    let vol = 0;
    (Array.isArray(exs)?exs:[]).forEach((ex, ei) => {
      for(let si=0; si<safeSets(ex.s); si++){
        const key=`${ei}_${si}`;
        if(woSets[key]){
          const reps = safeReps(ex.r);
          const kg   = parseFloat((ex.kg||'').toString().replace(/[^0-9.]/g,'')) || 0;
          vol += reps * kg;
        }
      }
    });
    statVol.textContent = vol > 0 ? (vol >= 1000 ? (vol/1000).toFixed(1)+'t' : vol+'kg') : doneSets;
  }

  // Durata sessione live
  if(statTime && typeof woStart !== 'undefined' && woStart){
    const elapsed = Math.floor((Date.now() - woStart) / 1000);
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    statTime.textContent = m + ':' + String(s).padStart(2,'0');
  }
}

// Patch toggleWoSet to update progress bar
const _origToggleWoSet=toggleWoSet;
toggleWoSet=function(ei,si,rs){
  _origToggleWoSet(ei,si,rs);
  updateWoProgressBar();
};

// ════════════════════════════════════════
// V4 — FIX renderWeeklyProgram: ogni giorno avviabile
// ════════════════════════════════════════
const _origRenderWeeklyProgram=renderWeeklyProgram;
renderWeeklyProgram=function(){
  const root=document.getElementById('weekly-program-view');
  if(!root) return;
  const typeOptions=['all','push','pull','lower','full','calisthenics','cardio','custom'];
  const presetRaw=(profile.recPreset&&PRESETS_DATA.find(x=>x.id===profile.recPreset))||PRESETS_DATA[0];
  const preset=normalizeProgramSets(JSON.parse(JSON.stringify(presetRaw)));
  const goals=(profile.goals||[]).map(goalLabel).join(' · ')||'Performance generale';
  const activeDays=preset.days.filter(d=>!d.rest&&(trainingTypeFilter==='all'||d.type===trainingTypeFilter));
  const daysHtml=activeDays.map((d,dayI)=>{
    const dtc=TC[d.type]||TC.custom;
    const exRows=(d.exercises||[]).map(ex=>{
      const exd=EX_DB.find(e=>e.id===ex.id)||{name:ex.id,tags:['muscolo'],icon:'🏋️'};
      const guide=EX_GUIDES[ex.id];
      return `<div class="wp-ex-row" onclick="openExDetail('${ex.id}')">
        <div class="wp-ex-ico">${exd.icon||'🏋️'}</div>
        <div class="wp-ex-info">
          <div class="wp-ex-nm">${exd.name}</div>
          <div class="wp-ex-sets">${ex.s||'3'} serie · ${ex.r||'10'} reps · riposo ${ex.rs||'75s'}</div>
          <div class="wp-ex-sets" style="margin-top:4px;color:var(--text3)">Tecnica: ${exerciseTechnique(ex.id)} · ${guide?.difficulty||'Intermedio'}</div>
        </div>
        <span class="wp-ex-muscle" style="background:${dtc.bg};color:${dtc.c}">${(exd.tags&&exd.tags[0])||'focus'}</span>
      </div>`;
    }).join('');
    return `<div class="wp-day-card">
      <div class="wp-day-head" onclick="toggleWpDay(${dayI})">
        <div class="wp-day-icon" style="background:${dtc.bg};color:${dtc.c}">${d.type==='cardio'?'🔥':d.type==='lower'?'🦵':d.type==='pull'?'🟢':d.type==='push'?'🔴':'🏋️'}</div>
        <div style="flex:1"><div class="wp-day-nm">${d.name}</div><div class="wp-day-sub">${(d.exercises||[]).length} esercizi pianificati</div></div>
        <button style="padding:8px 14px;background:var(--acc);color:#080810;border:none;border-radius:99px;font-family:'Syne',sans-serif;font-size:11px;font-weight:700;cursor:pointer;flex-shrink:0" onclick="event.stopPropagation();startDayFromWeekly('${preset.id}',${preset.days.indexOf(d)})">▶ Avvia</button>
      </div>
      <div class="wp-day-body${dayI===0?' open':''}" id="wpd-${dayI}">${exRows||'<div class="wp-rest-row">Nessun esercizio disponibile</div>'}</div>
    </div>`;
  }).join('');
  root.innerHTML=`
    <div class="wp-overview">
      <div style="font-size:11px;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px;">📅 Piano Settimanale</div>
      <div class="wp-title">${preset.icon ? preset.icon + ' ' : ''}${preset.name}</div>
      <div class="wp-sub">Obiettivo: <b style="color:var(--acc)">${goals}</b>. Tipologia: <b>${preset.t}</b>.</div>
      <div class="wp-meta">
        <span class="wp-meta-chip">${preset.days.filter(d=>!d.rest).length} giorni attivi</span>
        <span class="wp-meta-chip">${preset.dur} min media</span>
        <span class="wp-meta-chip">Difficolta: ${humanDiff(preset.diff)}</span>
      </div>
    </div>
    <div class="tt-filters">${typeOptions.map(tp=>`<button class="tt-chip${tp===trainingTypeFilter?' on':''}" onclick="setTrainingTypeFilter('${tp}',this)">${tp==='all'?'Tutti':tp}</button>`).join('')}</div>
    ${daysHtml||'<div class="empty-state"><div class="es-txt">Nessun giorno trovato per questa tipologia.</div></div>'}`;
};

function startDayFromWeekly(presetId,dayIdx){
  const p=PRESETS_DATA.find(x=>x.id===presetId);
  if(!p||!p.days[dayIdx]) return;
  const normalized=normalizeProgramSets(JSON.parse(JSON.stringify(p)));
  beginWorkout(normalized,normalized.days[dayIdx]);
}

// ════════════════════════════════════════
// V4 — PATCH goPage + initApp
// ════════════════════════════════════════
if(!window._v4GoPagePatched){
window._v4GoPagePatched=true;
var _origGoPageV4=window.goPage;
window.goPage=function(p){
  if(typeof _origGoPageV4==='function')_origGoPageV4(p);
  if(p==='ricette'){renderRicette();}
  if(p==='profile'){renderProfilePage();renderWeightChart();}
  if(p==='progressi'){renderWeightChart();}
};

const _origInitApp=initApp; // V41: avatar onclick merged into consolidated initApp
// initApp v3 override neutralised

// ════════════════════════════════════════
// V4 — PATCH renderProgressi to include weight chart
// ════════════════════════════════════════
const _origRenderProgressi=renderProgressi; // V41: renderWeightChart merged into consolidated renderProgressi
// renderProgressi v4 override neutralised

// ── BOOT ─────────────────────────────────
async function boot(){
  const t=Date.now();
  await initDB();
  const [sp,ss,sn,sm,spb,sprog]=await Promise.all([dbGet('profile'),dbGet('sessions'),dbGet('nutrition'),dbGet('metrics'),dbGet('pbs'),dbGet('program')]);
  if(sp)profile=sp;
  sessions = Array.isArray(ss) ? ss : [];
  if(sn)nutrition=sn;if(sm)metrics=sm;if(spb)pbs=spb;
  if(sprog && sprog.days) woProgram=sprog;
  sanitizeRuntimeState();
  const wait=Math.max(0,1400-(Date.now()-t));
  setTimeout(()=>{
    document.getElementById('scr-splash').classList.remove('active');

    // Ripristina ft_just_reset se il redirect era partito durante un reset
    // (il redirect ricarica la pagina, il flag potrebbe essere sopravvissuto o meno)
    const pendingLogin = localStorage.getItem('ft_pending_google_login');
    if (pendingLogin === 'reset' && !localStorage.getItem('ft_just_reset')) {
      localStorage.setItem('ft_just_reset', '1');
    }

    // Se appena resettato — mostra login Google, onboarding parte dopo il login
    if (localStorage.getItem('ft_just_reset') === '1') {
      document.getElementById('scr-google-login')?.classList.add('active');
      return;
    }
    // Check if user has already logged in with Google
    const googleUser = localStorage.getItem('ft_google_user');
    const skipGoogle = localStorage.getItem('ft_skip_google');
    if(googleUser || skipGoogle) {
      // Already authenticated or chose to skip — go straight to app/onboarding
      ftEnterApp();
    } else {
      // Show Google login screen
      document.getElementById('scr-google-login').classList.add('active');
    }
  },wait);
}

/* ── Onboarding launcher — unico punto di ingresso ── */
function _startOnboarding() {
  window._ftOnboardingActive = true;
  // Azzera stato onboarding
  try {
    if(typeof obSel !== 'undefined') obSel = {};
    if(typeof obGoals !== 'undefined') obGoals = [];
    if(typeof obCurStep !== 'undefined') obCurStep = 0;
    if(typeof _tempKcal !== 'undefined') window._tempKcal = null;
    if(typeof _tempMacros !== 'undefined') window._tempMacros = null;
    if(typeof _tempPhysique !== 'undefined') window._tempPhysique = null;
  } catch(e) {}
  // Resetta tutti gli step — solo ob_s0 attivo
  document.querySelectorAll('.ob-step').forEach(function(s){ s.classList.remove('active'); });
  var s0 = document.getElementById('ob_s0');
  if (s0) s0.classList.add('active');
  // Pulisci input nome
  var nameInp = document.getElementById('ob-name');
  if (nameInp) nameInp.value = '';
  // Pulisci selezioni precedenti
  document.querySelectorAll('.ob-card.sel').forEach(function(c){ c.classList.remove('sel'); });
  document.querySelectorAll('.ob-card.on').forEach(function(c){ c.classList.remove('on'); });
  // Nascondi splash, login; mostra onboarding
  document.querySelectorAll('.screen.active').forEach(function(s){ s.classList.remove('active'); });
  var obScreen = document.getElementById('scr-onboard');
  if (obScreen) obScreen.classList.add('active');
}

/* ── Google Login Flow ── */
async function ftEnterApp() {
  // Guard contro doppia chiamata simultanea
  if (window._ftEnterAppRunning) return;
  window._ftEnterAppRunning = true;
  // Rilascia il guard al termine (anche in caso di errore)
  const _releaseGuard = () => { window._ftEnterAppRunning = false; };

  // Se reset in corso → onboarding
  if (localStorage.getItem('ft_just_reset') === '1') { _startOnboarding(); _releaseGuard(); return; }
  // Se onboarding già attivo → non fare niente
  if (window._ftOnboardingActive) { _releaseGuard(); return; }
  // Se i dati locali ci sono già → entra subito
  if (profile.name) {
    window._ftOnboardingActive = false;
    document.getElementById('scr-app').classList.add('active');
    initApp();
    _releaseGuard();
    return;
  }

  // Nessun dato locale — potrebbe essere un nuovo dispositivo con account già configurato.
  // Aspetta che Firebase Auth risponda (max 4s) e prova a scaricare dal cloud.
  const googleUser = localStorage.getItem('ft_google_user');
  const skipGoogle  = localStorage.getItem('ft_skip_google');

  // Se ha saltato il login Google → onboarding diretto (nessun cloud da caricare)
  if (skipGoogle && !googleUser) {
    _startOnboarding();
    _releaseGuard();
    return;
  }

  // Mostra schermata di caricamento intermedia (non il login, non l'onboarding)
  const splash = document.getElementById('scr-splash');
  if (splash) {
    splash.classList.add('active');
    const splashTxt = splash.querySelector('.splash-sub, .splash-txt, p, div:last-child');
    if (splashTxt) splashTxt.textContent = 'Recupero dati dal cloud…';
  }

  // Aspetta auth Firebase (max 4 secondi)
  // Guard: se siamo in fase di reset, non caricare dal cloud
  if (localStorage.getItem('ft_just_reset') === '1') {
    _startOnboarding();
    return;
  }
  let cloudLoaded = false;
  try {
    cloudLoaded = await new Promise(function(resolve) {
      var timeout = setTimeout(function() { resolve(false); }, 4000);
      // Se firestoreLoad è già disponibile e l'utente è loggato, prova subito
      if (typeof window.firestoreLoad === 'function') {
        window.firestoreLoad().then(function(ok) {
          clearTimeout(timeout);
          resolve(ok);
        }).catch(function() {
          clearTimeout(timeout);
          resolve(false);
        });
      } else {
        // Aspetta onAuthStateChanged tramite evento custom o polling
        var polls = 0;
        var poll = setInterval(function() {
          polls++;
          if (typeof window.firestoreLoad === 'function') {
            clearInterval(poll);
            window.firestoreLoad().then(function(ok) {
              clearTimeout(timeout);
              resolve(ok);
            }).catch(function() {
              clearTimeout(timeout);
              resolve(false);
            });
          } else if (polls > 35) { // ~3.5s
            clearInterval(poll);
            resolve(false);
          }
        }, 100);
      }
    });
  } catch(e) { cloudLoaded = false; }

  // Nascondi splash
  if (splash) splash.classList.remove('active');

  if (cloudLoaded) {
    // Dati scaricati dal cloud — rileggi il profilo e vai all'app
    try {
      const savedProfile = await (typeof dbGet === 'function' ? dbGet('profile') : Promise.resolve(null));
      if (savedProfile && savedProfile.name) {
        profile = savedProfile;
        if (typeof sanitizeRuntimeState === 'function') sanitizeRuntimeState();
      }
    } catch(e) {}

    if (profile.name) {
      // Utente già configurato — vai all'app
      window._ftOnboardingActive = false;
      document.getElementById('scr-app').classList.add('active');
      initApp();
      if (typeof showToast === 'function') setTimeout(function(){ showToast('☁️ Dati sincronizzati dal cloud'); }, 800);
    } else {
      // Cloud vuoto o nuovo utente — onboarding
      _startOnboarding();
    }
  } else {
    // Nessun dato cloud raggiungibile
    let localProfile = null;
    try { localProfile = typeof dbGet === 'function' ? await dbGet('profile') : null; } catch(e) {}
    if (localProfile && localProfile.name && !localStorage.getItem('ft_just_reset')) {
      profile = localProfile;
      if (typeof sanitizeRuntimeState === 'function') sanitizeRuntimeState();
      window._ftOnboardingActive = false;
      document.getElementById('scr-app').classList.add('active');
      if (typeof initApp === 'function') initApp();
    } else {
      _startOnboarding();
    }
  }
  _releaseGuard();
}

async function ftGoogleLogin() {
  // Usa Firebase Authentication
  const statusEl = document.getElementById('google-login-status');
  const btn = document.getElementById('google-signin-btn');
  if (btn) btn.style.display = 'none';
  if (statusEl) statusEl.textContent = 'Connessione a Google…';
  if (typeof window.firebaseSignIn === 'function') {
    await window.firebaseSignIn();
    return;
  }
  // fallback — riprova tra 1.5s
  setTimeout(async () => {
    if (typeof window.firebaseSignIn === 'function') {
      await window.firebaseSignIn();
    } else {
      if (statusEl) statusEl.textContent = 'Errore. Ricarica la pagina.';
      if (btn) btn.style.display = 'flex';
    }
  }, 1500);
}
async function _ftGoogleLogin_DISABLED() {
  const btn2 = document.getElementById('google-signin-btn');
  const loading = document.getElementById('google-login-loading');
  const errEl = document.getElementById('google-login-error');
  const statusEl2 = document.getElementById('google-login-status');
  btn2.style.display = 'none';
  loading.style.display = 'block';
  errEl.style.display = 'none';

  try {
    // Check if GoogleSync is configured (CLIENT_ID set)
    if (!window.GoogleSync || !window.GoogleSync.isConfigured()) {
      // CLIENT_ID not set — show setup guide and fallback to local
      if (statusEl) statusEl.textContent = 'Apertura guida configurazione…';
      setTimeout(() => {
        if (typeof window.GoogleSync !== 'undefined') {
          window.GoogleSync.injectGoogleSetupGuide();
        }
        loading.style.display = 'none';
        btn.style.display = 'flex';
        const errMsg = document.getElementById('google-login-error-msg');
        // Client ID configurato
        // errore nascosto — client ID configurato
      }, 800);
      return;
    }

    if (statusEl) statusEl.textContent = 'Connessione a Google…';

    // Try to load existing backup from Drive
    if (statusEl) statusEl.textContent = 'Scaricamento dati da Drive…';
    await window.GoogleSync.load();

    // Re-load profile after potential restore
    const sp = await dbGet('profile');
    if (sp) profile = sp;
    const ss2 = await dbGet('sessions');
    if (ss2) sessions = ss2;

    // Mark as google-authenticated
    localStorage.setItem('ft_google_user', JSON.stringify({ ts: new Date().toISOString() }));

    if (statusEl) statusEl.textContent = 'Accesso completato! ✅';

    setTimeout(() => {
      document.getElementById('scr-google-login').classList.remove('active');
      ftEnterApp();
    }, 700);

  } catch(e) {
    console.error('[FitTrack] Google login error:', e);
    loading.style.display = 'none';
    btn.style.display = 'flex';
    const errMsg = document.getElementById('google-login-error-msg');
    if(errMsg) errMsg.textContent = 'Errore: ' + (e.message || 'Accesso annullato. Riprova.');
    errEl.style.display = 'block';
  }
}

function ftSkipGoogleLogin() {
  localStorage.setItem('ft_skip_google', '1');
  // Azzera RAM
  try {
    if(typeof profile !== 'undefined') profile = {name:'',level:'',goals:{calories:2500,weight:70,goalType:'maintain'},days:'5',kcalTarget:2500,macros:{p:180,c:280,g:70},tdee:2500,physique:{age:17,weight:70,height:175,sex:'m',activity:1.55},weeklyWorkoutsTarget:3,weightHistory:[]};
    if(typeof sessions !== 'undefined') sessions = [];
    if(typeof nutrition !== 'undefined') nutrition = {};
    if(typeof metrics !== 'undefined') metrics = {};
    if(typeof pbs !== 'undefined') pbs = {};
  } catch(e) {}
  _startOnboarding();
}

/* Logout Google — resetla lo stato e mostra di nuovo il login */
window.ftGoogleLogout = function() {
  localStorage.removeItem('ft_google_user');
  localStorage.removeItem('ft_skip_google');
  localStorage.removeItem('ft_google_token');
  if(typeof showToast === 'function') showToast('Disconnesso da Google');
};

/**
 * FUNZIONI HOME PAGE — DASHBOARD ALLENAMENTI
 */
function initHome() {
  // scr-home è nascosta — l'app usa scr-app con page-home
  // questa funzione è mantenuta per compatibilità ma non fa nulla
}

function updateWeekDays() {
  const today = new Date();
  const todayDay = today.getDay();
  const weekItems = document.querySelectorAll('.weekday-item');
  
  weekItems.forEach((item, idx) => {
    const dayNum = (idx + 1) % 7; // Lunedì = 1, Domenica = 0
    item.dataset.dayOfWeek = dayNum;
    
    if (dayNum === todayDay) {
      item.classList.add('current');
    } else {
      item.classList.remove('current');
    }
  });
}

function updateTodayWorkout() {
  const today = new Date();
  const todayStr = today.toLocaleDateString('it-IT', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
  
  // Se esiste un programma caricato
  if (woProgram && woProgram.days && woProgram.days.length > 0) {
    const todayDay = today.getDay();
    const dayData = woProgram.days[todayDay === 0 ? 6 : todayDay - 1]; // Adatta domenica
    
    if (dayData && dayData.name) {
      document.getElementById('home-workout-title').textContent = dayData.name;
      document.getElementById('home-workout-date').textContent = todayStr;
      
      // Calcola durata e level
      const totalMins = (dayData.exercises || []).reduce((sum, ex) => sum + (parseInt(ex.r) || 3) * (ex.sets || 3) * 2, 0);
      document.getElementById('home-workout-duration').textContent = Math.max(20, totalMins) + ' Minutes';
      
      document.getElementById('home-empty-state').style.display = 'none';
      document.getElementById('home-workout-details').style.display = 'flex';
    } else {
      showEmptyState();
    }
  } else {
    showEmptyState();
  }
}

function showEmptyState() {
  document.getElementById('home-empty-state').style.display = 'flex';
  document.getElementById('home-workout-details').style.display = 'none';
}

function selectDay(element) {
  document.querySelectorAll('.weekday-item').forEach(item => item.classList.remove('current'));
  element.classList.add('current');
  // Qui puoi aggiungere la logica per caricare l'allenamento del giorno selezionato
}

function startWorkoutFromHome() {
  if (woProgram && woProgram.days) {
    const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
    const dayData = woProgram.days[todayIdx];
    if (dayData) {
      const normalized = normalizeProgramSets(JSON.parse(JSON.stringify(woProgram)));
      beginWorkout(normalized, normalized.days[todayIdx]);
      return;
    }
  }
  // Fallback: go to training page
  goPage('allenamento');
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

/* ══════════════════════════════════════════════════════════
   FitTrack AI  V5  — New Features
   1. Adaptive exercises (zero-base → elite)
   2. Female cycle tracking + adaptive training
   3. Auto-generated weekly plan from onboarding
══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   ADAPTIVE EXERCISE PROGRESSIONS
   Maps every movement to the full ladder
   from absolute zero to elite
───────────────────────────────────────── */
const PROGRESSIONS = {
  /* PUSH ─────────────────── */
  push: [
    {id:'wall-push',     name:'Push-up al muro',        icon:'🔴', m:'push', tags:['petto'], desc:'Mani al muro all\'altezza del petto, corpo dritto, piega i gomiti lentamente.', minLevel:'zero'},
    {id:'incline-push-h',name:'Push-up inclinato alto', icon:'🔴', m:'push', tags:['petto'], desc:'Mani su un piano alto (tavolo). Più alto = più facile.', minLevel:'zero'},
    {id:'incline-push-l',name:'Push-up inclinato basso',icon:'🔴', m:'push', tags:['petto'], desc:'Mani su un piano basso (sedia). Più difficile del tavolo.', minLevel:'zero'},
    {id:'knee-push',     name:'Push-up sulle ginocchia',icon:'🔴', m:'push', tags:['petto'], desc:'Ginocchia a terra, corpo dritto dalla testa alle ginocchia.', minLevel:'zero'},
    {id:'push-up',       name:'Push-up standard',       icon:'🔴', m:'push', tags:['petto'], desc:'Corpo rigido, gomiti a 45°, petto che sfiora il pavimento.', minLevel:'beginner'},
    {id:'archer-pu',     name:'Archer Push-up',         icon:'🔴', m:'push', tags:['petto'], desc:'Un braccio esteso, l\'altro esegue il movimento.', minLevel:'intermediate'},
    {id:'dips',          name:'Dips',                   icon:'🔴', m:'push', tags:['petto','tricipiti'], desc:'Parallele o due sedie robuste. Abbassa fino a gomito a 90°.', minLevel:'intermediate'},
    {id:'dips-w',        name:'Dips zavorra',           icon:'🔴', m:'push', tags:['petto','tricipiti'], desc:'Aggiungi carico con zaino o cintura.', minLevel:'advanced'},
    {id:'planche-pu',    name:'Planche Push-up',        icon:'🟣', m:'skill',tags:['spalle'], desc:'Spinta orizzontale con busto inclinato avanti.', minLevel:'athlete'},
  ],
  pull: [
    {id:'dead-hang',     name:'Dead Hang',              icon:'🟢', m:'pull', tags:['dorsali','presa'], desc:'Appenditi alla sbarra con braccia tese. Reggi il peso.', minLevel:'zero'},
    {id:'scap-pull',     name:'Scapular Pull',          icon:'🟢', m:'pull', tags:['dorsali'], desc:'Partenza dead hang, abbassa e alza le scapole senza piegare i gomiti.', minLevel:'zero'},
    {id:'neg-pull',      name:'Negative Pull-up',       icon:'🟢', m:'pull', tags:['dorsali'], desc:'Parti con il mento sopra la sbarra (usa una sedia), scendi lentamente in 5 sec.', minLevel:'zero'},
    {id:'band-pull',     name:'Pull-up assistito (elastico)', icon:'🟢', m:'pull', tags:['dorsali'], desc:'Elastico da ginnastica per ridurre il peso corporeo.', minLevel:'beginner'},
    {id:'pull-up',       name:'Pull-up',                icon:'🟢', m:'pull', tags:['dorsali','bicipiti'], desc:'Presa prona, corpo teso, tira fino al mento sopra la sbarra.', minLevel:'beginner'},
    {id:'pull-up-w',     name:'Pull-up zavorra',        icon:'🟢', m:'pull', tags:['dorsali'], desc:'Cintura o zaino con peso. ROM completo.', minLevel:'advanced'},
    {id:'pull-exp',      name:'Pull-up esplosivo',      icon:'🟢', m:'pull', tags:['dorsali','skill'], desc:'Tira con forza massima, prova ad alzare il petto alla sbarra.', minLevel:'advanced'},
    {id:'neg-mu',        name:'Negative Muscle-up',     icon:'🟣', m:'skill',tags:['pull'], desc:'Parti con petto alla sbarra, scendi lentamente attraverso la transizione.', minLevel:'advanced'},
    {id:'mu',            name:'Muscle-up',              icon:'🟣', m:'skill',tags:['pull','push'], desc:'Trazione + transizione + spinta. Il re dei movimenti alla sbarra.', minLevel:'athlete'},
  ],
  squat: [
    {id:'box-squat-h',   name:'Box Squat alto',         icon:'🟡', m:'lower',tags:['quadricipiti'], desc:'Scendi su una sedia/box alto senza appoggiarti. Rialzati con controllo.', minLevel:'zero'},
    {id:'assisted-squat',name:'Squat assistito',        icon:'🟡', m:'lower',tags:['quadricipiti'], desc:'Tieni un supporto (porta, colonna) mentre scendi, per imparare il pattern.', minLevel:'zero'},
    {id:'ct-squat',      name:'Squat corpo libero',     icon:'🟡', m:'lower',tags:['quadricipiti'], desc:'Piedi a larghezza spalle, scendi lento, ginocchia in linea ai piedi.', minLevel:'zero'},
    {id:'squat-w',       name:'Squat zavorra',          icon:'🟡', m:'lower',tags:['quadricipiti'], desc:'Zaino con peso sulle spalle o bilanciere leggero.', minLevel:'beginner'},
    {id:'front-squat',   name:'Front Squat',            icon:'🟡', m:'lower',tags:['quadricipiti','core'], desc:'Bilanciere in posizione frontale. Core fortissimo.', minLevel:'intermediate'},
    {id:'bss',           name:'Bulgarian Split Squat',  icon:'🟡', m:'lower',tags:['quadricipiti','glutei'], desc:'Piede posteriore su rialzo, lavoro unilaterale intenso.', minLevel:'intermediate'},
    {id:'pistol',        name:'Pistol Squat',           icon:'🟡', m:'lower',tags:['quadricipiti'], desc:'Squat su una gamba sola, l\'altra tesa in avanti.', minLevel:'advanced'},
    {id:'pistol-w',      name:'Pistol Squat zavorra',   icon:'🟡', m:'lower',tags:['quadricipiti'], desc:'Pistol con peso in mano o in cintura.', minLevel:'athlete'},
  ],
  core: [
    {id:'dead-bug-ez',   name:'Dead Bug facilitato',    icon:'🔵', m:'core', tags:['addominali'], desc:'Schiena a terra, abbassa solo un arto per volta, mantieni lombare piatta.', minLevel:'zero'},
    {id:'knee-tuck',     name:'Knee Tuck isometrico',   icon:'🔵', m:'core', tags:['addominali'], desc:'Seduto, porta le ginocchia al petto e tieni 20 secondi.', minLevel:'zero'},
    {id:'plank-knee',    name:'Plank sulle ginocchia',  icon:'🔵', m:'core', tags:['addominali'], desc:'Plank con ginocchia a terra. Progressione verso il plank completo.', minLevel:'zero'},
    {id:'plank',         name:'Plank',                  icon:'🔵', m:'core', tags:['addominali'], desc:'Corpo rigido dalla testa ai talloni. Glutei contratti.', minLevel:'beginner'},
    {id:'hollow',        name:'Hollow Body Hold',       icon:'🔵', m:'core', tags:['addominali'], desc:'Schiena piatta, braccia e gambe sollevate, ondula come una banana.', minLevel:'intermediate'},
    {id:'dragon-f',      name:'Dragon Flag negativo',   icon:'🔵', m:'core', tags:['addominali'], desc:'Scendi lentamente dalla posizione verticale mantenendo il corpo rigido.', minLevel:'advanced'},
    {id:'lsit',          name:'L-Sit Hold',             icon:'🟣', m:'skill',tags:['core','hip flexor'], desc:'Braccia tese, gambe parallele al suolo, tutto il core attivato.', minLevel:'advanced'},
  ],
};

/* Database esercizi per zero-base (usati solo per livello zero) */
const ZERO_BASE_EXERCISES = {
  push: [
    {id:'wall-push',    name:'Push-up al muro',         icon:'🔴', m:'push', s:'3', r:'10', rs:'60s'},
    {id:'incline-push-h',name:'Push-up inclinato (tavolo)', icon:'🔴', m:'push', s:'3', r:'8',  rs:'60s'},
    {id:'incline-push-l',name:'Push-up inclinato (sedia)', icon:'🔴', m:'push', s:'3', r:'6',  rs:'75s'},
    {id:'knee-push',    name:'Push-up sulle ginocchia', icon:'🔴', m:'push', s:'3', r:'8',  rs:'75s'},
  ],
  pull: [
    {id:'dead-hang',    name:'Dead Hang',               icon:'🟢', m:'pull', s:'3', r:'20s', rs:'90s'},
    {id:'scap-pull',    name:'Scapular Pull',           icon:'🟢', m:'pull', s:'3', r:'10',  rs:'75s'},
    {id:'neg-pull',     name:'Negative Pull-up',        icon:'🟢', m:'pull', s:'3', r:'3',   rs:'120s'},
  ],
  squat: [
    {id:'box-squat-h',  name:'Box Squat alto',          icon:'🟡', m:'lower',s:'3', r:'12',  rs:'60s'},
    {id:'assisted-squat',name:'Squat assistito',        icon:'🟡', m:'lower',s:'3', r:'10',  rs:'60s'},
    {id:'ct-squat',     name:'Squat corpo libero',      icon:'🟡', m:'lower',s:'3', r:'15',  rs:'60s'},
  ],
  core: [
    {id:'dead-bug-ez',  name:'Dead Bug facilitato',     icon:'🔵', m:'core', s:'3', r:'8',   rs:'45s'},
    {id:'plank-knee',   name:'Plank sulle ginocchia',   icon:'🔵', m:'core', s:'3', r:'20s', rs:'45s'},
    {id:'knee-tuck',    name:'Knee Tuck isometrico',    icon:'🔵', m:'core', s:'3', r:'20s', rs:'45s'},
  ],
};

/* ─────────────────────────────────────────
   CYCLE TRACKING ENGINE
───────────────────────────────────────── */
const CYCLE_PHASES = {
  menstrual: {
    name:'🔴 Mestruazione', color:'#FF5CA0',
    days:[1,5],
    ico:'🔴',
    advice:'Intensità ridotta. Focus su mobilità, respirazione e recupero attivo. Idratazione extra.',
    trainingMod:'easy',
    nutritionTip:'Aumenta ferro (carne rossa, legumi) e magnesio (cioccolato fondente, noci).',
    workoutNote:'Oggi preferisci mobilità e stretching. Se ti senti bene, allenamento leggero ok.',
  },
  follicular: {
    name:'🟡 Follicolare', color:'#FFB800',
    days:[6,13],
    ico:'🟡',
    advice:'Energia in crescita. Ottimo momento per volume e nuovi PR. Il corpo recupera bene.',
    trainingMod:'normal',
    nutritionTip:'Carbs moderati, proteine alte. Energia in aumento — sfruttala.',
    workoutNote:'Buona fase per aumentare volume o provare nuovi esercizi.',
  },
  ovulation: {
    name:'🟢 Ovulazione', color:'#3EDF8A',
    days:[14,16],
    ico:'🟢',
    advice:'PICCO DI FORZA 💪 Massima energia e coordinazione. Ottimo per PR e intensità alta.',
    trainingMod:'intense',
    nutritionTip:'Proteine alte, carbs pre-workout per massimizzare le performance.',
    workoutNote:'Spingi di più oggi — è il tuo momento migliore del mese!',
  },
  luteal: {
    name:'🟠 Luteale', color:'#FF9A3C',
    days:[17,28],
    ico:'🟠',
    advice:'Energia variabile. Mantieni la routine ma non forzare. Focus su tecnica e qualità.',
    trainingMod:'moderate',
    nutritionTip:'Riduci caffeina, aumenta omega-3 e vitamina B6. Può aumentare voglia di dolci.',
    workoutNote:'Allenamento regolare, ma ascolta il corpo. Volume moderato.',
  },
};

function getCycleData() { return profile.cycle || null; }

/* Calcola la fase del ciclo per una data specifica (non solo "oggi") */
function getCyclePhaseForDate(dateStr) {
  const c = getCycleData();
  if (!c || !c.lastPeriod || !c.trackCycle) return null;
  if (typeof profile === 'undefined' || profile.physique?.sex !== 'f') return null;
  const last     = new Date(c.lastPeriod);
  const target   = new Date(dateStr);
  const elapsed  = Math.floor((target - last) / 86400000);
  if (elapsed < 0) return null; // data prima dell'ultima mestruazione
  const cycleLen  = c.cycleLen  || 28;
  const periodLen = c.periodLen || 5;
  const dayInCycle = (elapsed % cycleLen) + 1;
  let phase;
  if (dayInCycle <= periodLen)  phase = CYCLE_PHASES.menstrual;
  else if (dayInCycle <= 13)   phase = CYCLE_PHASES.follicular;
  else if (dayInCycle <= 16)   phase = CYCLE_PHASES.ovulation;
  else                          phase = CYCLE_PHASES.luteal;
  return { phase, dayInCycle, cycleLen };
}

function getCurrentCyclePhase() {
  const c = getCycleData();
  if (!c || !c.lastPeriod) return null;
  const last = new Date(c.lastPeriod);
  const today2 = new Date();
  const dayInCycle = (Math.floor((today2 - last) / 86400000) % (c.cycleLen||28)) + 1;
  const periodLen = c.periodLen || 5;
  const cycleLen  = c.cycleLen  || 28;
  let phase;
  if (dayInCycle <= periodLen)      phase = CYCLE_PHASES.menstrual;
  else if (dayInCycle <= 13)        phase = CYCLE_PHASES.follicular;
  else if (dayInCycle <= 16)        phase = CYCLE_PHASES.ovulation;
  else                               phase = CYCLE_PHASES.luteal;
  const daysToNext = cycleLen - dayInCycle + 1;
  return { phase, dayInCycle, cycleLen, daysToNext };
}

function getNextPeriodDate() {
  const c = getCycleData();
  if (!c || !c.lastPeriod) return null;
  const last = new Date(c.lastPeriod);
  const today2 = new Date();
  const elapsed = Math.floor((today2 - last) / 86400000);
  const cycleLen = c.cycleLen || 28;
  const daysLeft = cycleLen - (elapsed % cycleLen);
  const next = new Date();
  next.setDate(next.getDate() + daysLeft);
  return { date: next, daysLeft };
}

function renderCycleBanner() {
  const banner = document.getElementById('h-cycle-banner');
  if (!banner) return;
  const c = getCycleData();
  if (!c || !c.trackCycle || profile.physique?.sex !== 'f') { banner.style.display='none'; return; }
  const info = getCurrentCyclePhase();
  if (!info) { banner.style.display='none'; return; }
  banner.style.display = 'block';
  const ph = info.phase;
  document.getElementById('h-cycle-ico').textContent  = ph.ico;
  document.getElementById('h-cycle-phase-name').textContent = ph.name + ` · Giorno ${info.dayInCycle}/${info.cycleLen}`;
  document.getElementById('h-cycle-advice').textContent = ph.workoutNote;
}

function renderCycleProfile() {
  const card = document.getElementById('pr-cycle-card');
  if (!card) return;
  const c = getCycleData();
  if (!c || !c.trackCycle || profile.physique?.sex !== 'f') { card.style.display='none'; return; }
  card.style.display = 'block';
  const info = getCurrentCyclePhase();
  if (!info) return;
  const ph = info.phase;
  const pct = Math.round(info.dayInCycle / info.cycleLen * 100);
  document.getElementById('pr-cycle-phase-name').textContent = ph.name;
  document.getElementById('pr-cycle-phase-desc').textContent = ph.advice;
  document.getElementById('pr-cycle-day').textContent = info.dayInCycle;
  document.getElementById('pr-cycle-bar').style.width = pct + '%';
  const np = getNextPeriodDate();
  document.getElementById('pr-next-period-label').textContent = np ? `Prossima: tra ${np.daysLeft} gg` : '—';
}

function openCycleSettings() {
  const c = getCycleData() || {};
  document.getElementById('cs-cycle-len').value  = c.cycleLen  || 28;
  document.getElementById('cs-period-len').value = c.periodLen || 5;
  document.getElementById('cs-last-period').value= c.lastPeriod || '';
  document.getElementById('cycle-modal').classList.add('open');
}
window.openCycleSettings = openCycleSettings;

async function saveCycleSettings() {
  const cycleLen  = parseInt(document.getElementById('cs-cycle-len').value)  || 28;
  const periodLen = parseInt(document.getElementById('cs-period-len').value) || 5;
  const lastPeriod = document.getElementById('cs-last-period').value;
  if (!profile) profile = {};
  profile.cycle = { trackCycle: true, cycleLen, periodLen, lastPeriod };
  await saveAll();
  document.getElementById('cycle-modal').classList.remove('open');
  if (typeof renderCycleBanner  === 'function') try { renderCycleBanner();  } catch(e) {}
  if (typeof renderCycleProfile === 'function') try { renderCycleProfile(); } catch(e) {}
  if (typeof renderHomeCalendar === 'function') try { renderHomeCalendar(); } catch(e) {}
  showToast('✅ Ciclo aggiornato');
}
window.saveCycleSettings = saveCycleSettings;

/* Build a cycle-adapted day given a standard day */
function adaptDayForCycle(day) {
  const info = getCurrentCyclePhase();
  if (!info) return day;
  const mod = info.phase.trainingMod;
  if (mod === 'easy') {
    // Replace with mobility / light version
    return {
      ...day,
      name: day.name + ' (adattato — fase mestruale)',
      _cycleNote: '🔴 Allenamento alleggerito per la fase mestruale. Concentrati sulla tecnica e sulla respirazione.',
      exercises: day.exercises.map(ex => ({
        ...ex,
        s: String(Math.max(1, safeSets(ex.s) - 1)),
        r: ex.r.includes('s') ? ex.r : String(Math.max(5, Math.round(safeReps(ex.r) * 0.7))),
        rs: String(Math.min(120, parseRest(ex.rs) + 30)) + 's',
      })),
    };
  }
  if (mod === 'intense') {
    return {
      ...day,
      name: day.name + ' 💪 (picco ovulatoria)',
      _cycleNote: '🟢 Sei nel tuo picco mensile di forza. Spingi sui pesi e prova nuovi record!',
      exercises: day.exercises.map(ex => ({
        ...ex,
        s: String(safeSets(ex.s) + 1),
      })),
    };
  }
  return day; // normal / moderate — unchanged
}

/**
 * getCycleBadgeHtml()
 * Returns a one-line HTML badge showing the cycle intensity modifier.
 * Returns '' if cycle tracking is inactive or user is not female.
 *
 * Examples:
 *   "− volume  ·  fase mestruale"
 *   "+ intensità  ·  fase ovulazione"
 *   "volume moderato  ·  fase luteale"
 *   "" (follicolare / non tracciato)
 */
function getCycleBadgeHtml() {
  if (profile.physique?.sex !== 'f') return '';
  const c = getCycleData();
  if (!c || !c.trackCycle) return '';
  const info = getCurrentCyclePhase();
  if (!info) return '';

  const mod = info.phase.trainingMod;
  const phaseName = info.phase.name; // già include emoji e nome

  let label = '';
  let bg    = '';
  let color = '';

  if (mod === 'easy') {
    // Fase mestruale → volume ridotto
    label = '− volume  ·  fase mestruale';
    bg    = 'rgba(255,92,160,.12)';
    color = '#FF5CA0';
  } else if (mod === 'intense') {
    // Fase ovulazione → intensità aumentata
    label = '+ intensità  ·  fase ovulazione';
    bg    = 'rgba(62,223,138,.12)';
    color = 'var(--green)';
  } else if (mod === 'moderate') {
    // Fase luteale → volume moderato
    label = 'volume moderato  ·  fase luteale';
    bg    = 'rgba(255,154,60,.12)';
    color = 'var(--orange)';
  } else {
    // Follicolare → nessun modificatore visibile (normale)
    return '';
  }

  return `<div style="
      display:inline-flex;align-items:center;gap:5px;
      font-size:10px;font-weight:700;
      background:${bg};color:${color};
      border-radius:99px;padding:3px 10px;
      letter-spacing:.03em;margin-top:6px;
    ">${info.phase.ico} ${label}</div>`;
}

/**
 * getCycleSuggestionHtml()
 * Returns a short suggestion line to place near the ▶ Avvia button.
 * Same guards as getCycleBadgeHtml — returns '' when inactive/male/follicular.
 *
 * fase mestruale  → "Riduci intensità oggi"
 * fase ovulazione → "Spingi sui carichi oggi"
 * fase luteale    → "Mantieni volume moderato"
 */
function getCycleSuggestionHtml() {
  if (profile.physique?.sex !== 'f') return '';
  const c = getCycleData();
  if (!c || !c.trackCycle) return '';
  const info = getCurrentCyclePhase();
  if (!info) return '';

  const mod = info.phase.trainingMod;
  let text  = '';
  let color = '';
  let ico   = '';

  if (mod === 'easy') {
    text  = 'Riduci intensità oggi';
    color = '#FF5CA0';
    ico   = '🔴';
  } else if (mod === 'intense') {
    text  = 'Spingi sui carichi oggi';
    color = 'var(--green)';
    ico   = '🟢';
  } else if (mod === 'moderate') {
    text  = 'Mantieni volume moderato';
    color = 'var(--orange)';
    ico   = '🟠';
  } else {
    return ''; // follicolare → nessun suggerimento
  }

  return `<div style="
      font-size:11px;font-weight:700;color:${color};
      margin-top:8px;display:flex;align-items:center;gap:5px;
    ">${ico} ${text}</div>`;
}

/**
 * showPwCycleModal(dayName)
 * Called after finishWorkout for female users with active cycle tracking.
 * Shows fase attuale + "Allenamento completato in fase X" + suggerimento.
 * No-op for male users or if cycle not tracked.
 */
function showPwCycleModal(dayName) {
  // Guard: only females with cycle tracking
  if (profile.physique?.sex !== 'f') return;
  const c = getCycleData();
  if (!c || !c.trackCycle) return;
  const info = getCurrentCyclePhase();
  if (!info) return;

  const mod       = info.phase.trainingMod;
  const faseName  = info.phase.name;  // e.g. "Mestruale"
  const faseIco   = info.phase.ico;   // e.g. "🔴"

  // Per-phase content
  const PHASE_DATA = {
    easy: {
      barColor:   'linear-gradient(90deg,#FF5CA0,#FF91C7)',
      msgColor:   '#FF5CA0',
      suggestion: '💪 Ottimo aver mantenuto il ritmo — in questa fase è già un successo allenarsi.',
    },
    intense: {
      barColor:   'linear-gradient(90deg,var(--green),var(--acc))',
      msgColor:   'var(--green)',
      suggestion: '🚀 Perfetto per la progressione — sei nel picco di forza mensile. Registra i tuoi carichi.',
    },
    moderate: {
      barColor:   'linear-gradient(90deg,var(--orange),#FFD580)',
      msgColor:   'var(--orange)',
      suggestion: '⚖️ Buon controllo del volume — la fase luteale premia la costanza più dell\'intensità.',
    },
    normal: {
      barColor:   'linear-gradient(90deg,var(--acc),var(--green))',
      msgColor:   'var(--acc)',
      suggestion: '✅ Allenamento completato — stai costruendo la tua base per la prossima fase.',
    },
  };

  const pd = PHASE_DATA[mod] || PHASE_DATA.normal;

  // Fill modal
  document.getElementById('pw-modal-bar').style.background       = pd.barColor;
  document.getElementById('pw-modal-ico').textContent            = faseIco;
  document.getElementById('pw-modal-fase').style.color           = pd.msgColor;
  document.getElementById('pw-modal-fase').textContent           = faseName;
  document.getElementById('pw-modal-msg').textContent            =
    `Allenamento completato in fase ${faseName}`;
  document.getElementById('pw-modal-suggestion').textContent     = pd.suggestion;

  // Log (richiesto dalla spec)

  // Show
  const modal = document.getElementById('pw-cycle-modal');
  modal.style.display = 'flex';
}

function closePwCycleModal() {
  const modal = document.getElementById('pw-cycle-modal');
  if (modal) modal.style.display = 'none';
}

// Close on overlay click
document.addEventListener('click', e => {
  const modal = document.getElementById('pw-cycle-modal');
  if (modal && e.target === modal) closePwCycleModal();
});

/* ─────────────────────────────────────────
   NEW ONBOARDING HELPERS
───────────────────────────────────────── */
let obTrainingDays = 3;
let obGeneratedPlan = null;
window.obGeneratedPlan = null; // esposto globalmente per evitare ReferenceError in override chain
let obSelectedDayIndices = []; // giorni specifici selezionati (0=Lun..6=Dom)
window.obSelectedDayIndices = obSelectedDayIndices;

// Toggle giorno nella selezione onboarding step 8
function obToggleDay(el, dow) {
  const idx = obSelectedDayIndices.indexOf(dow);
  const maxDays = typeof obTrainingDays !== 'undefined' ? (obTrainingDays || 7) : 7;
  if (idx >= 0) {
    // Deseleziona
    obSelectedDayIndices.splice(idx, 1);
    el.style.background = 'var(--bg3)';
    el.style.borderColor = 'var(--border2)';
    el.querySelector('span').style.color = 'var(--text2)';
  } else {
    // Controlla limite
    if (obSelectedDayIndices.length >= maxDays) {
      if (typeof showToast === 'function') showToast('⚠️ Hai già selezionato ' + maxDays + ' giorn' + (maxDays===1?'o':'i'));
      el.style.transform = 'scale(0.93)';
      setTimeout(() => { el.style.transform = ''; }, 150);
      return;
    }
    obSelectedDayIndices.push(dow);
    obSelectedDayIndices.sort((a,b)=>a-b);
    el.style.background = 'rgba(200,245,60,0.15)';
    el.style.borderColor = 'var(--acc)';
    el.querySelector('span').style.color = 'var(--acc)';
  }
  const n = obSelectedDayIndices.length;
  // Aggiorna anche il selettore numerico per coerenza
  if (typeof obPickNDays === 'function' && n > 0 && n !== (typeof obTrainingDays!=='undefined' ? obTrainingDays : 0)) {
    const grid = document.getElementById('ob-ndays-grid');
    if (grid) {
      grid.querySelectorAll('.ob-card').forEach(c => c.classList.remove('on'));
      const target = grid.querySelector('.ob-card:nth-child(' + (n-1) + ')');
      // solo aggiorna il numero, non il picker visivo per non confondere
    }
    obTrainingDays = n;
    if (typeof obSel !== 'undefined') obSel.days = String(n);
  }
  const hint = document.getElementById('ob-days-hint');
  if (hint) {
    if (n === 0) { hint.textContent = 'Seleziona almeno 1 giorno'; hint.style.color = 'var(--text2)'; }
    else {
      const labels = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
      hint.textContent = n + ' ' + (n===1?'giorno':'giorni') + ': ' + obSelectedDayIndices.map(d=>labels[d]).join(', ');
      hint.style.color = 'var(--acc)';
    }
  }
}

function obConfirmDays() {
  if (obSelectedDayIndices.length === 0) {
    if (typeof showToast === 'function') showToast('⚠️ Seleziona almeno un giorno');
    return;
  }
  obTrainingDays = obSelectedDayIndices.length;
  obSel.days = String(obTrainingDays);
  obSel.specificDays = [...obSelectedDayIndices];
  obNext(9);
}

/* ── Calcolo automatico giorni di allenamento ─────────────────────
   Basato su: livello, obiettivi, sport praticati, disponibilità
   Regole:
   - Principiante → 3 giorni (L-M-V)
   - Intermedio   → 4 giorni (L-M-G-V)
   - Avanzato     → 5 giorni (L-M-M-G-V)
   - Obiettivo dimagrimento → +1 giorno cardio se < 4
   - Sport faticosi (calcio, judo, crossfit) → -1 giorno se > 3
   - Obiettivo forza pura → 3-4 (no 5-7, troppo volume)
───────────────────────────────────────────────────────────────── */
function obAutoCalcDaysAndNext() {
  const _obSel = (typeof obSel !== 'undefined' && obSel) ? obSel : {};
  const level  = _obSel.level  || 'intermediate';
  const goals  = (typeof obGoals !== 'undefined' && obGoals) ? obGoals : [];
  const sports = _obSel.sports || _obSel.multi?.sports || [];
  const env    = _obSel.env    || 'gym';

  // Base giorni per livello
  let n = 3;
  if (level === 'beginner')     n = 3;
  else if (level === 'intermediate') n = 4;
  else if (level === 'advanced') n = 5;

  // Aggiustamenti per obiettivo
  const wantsLoss    = goals.some(g => ['dimagrire','definizione','cut'].includes(g));
  const wantsStrOnly = goals.length === 1 && goals[0] === 'forza';
  const wantsMass    = goals.some(g => ['massa','ipertrofia','bulk'].includes(g));

  if (wantsLoss && n < 4) n = 4;          // dimagrimento vuole più frequenza
  if (wantsStrOnly && n > 4) n = 4;       // forza pura: no volumi enormi
  if (wantsMass && level === 'advanced') n = Math.min(n + 1, 5);

  // Sport faticosi riducono i giorni palestra
  const heavySports = ['calcio','judo','crossfit','basket','boxe'];
  const hasHeavySport = sports.some(s => heavySports.includes(s));
  if (hasHeavySport && n > 3) n = n - 1;

  // Corpo libero a casa: max 5 (recupero più lento senza macchine)
  if (env === 'home' && n > 5) n = 5;

  // Clamp 2-6
  n = Math.max(2, Math.min(6, n));

  // Preset giorni della settimana ottimali
  const presets = {
    2: [0,3],         // Lun, Gio
    3: [0,2,4],       // Lun, Mer, Ven
    4: [0,1,3,4],     // Lun, Mar, Gio, Ven
    5: [0,1,2,3,4],   // Lun→Ven
    6: [0,1,2,3,4,5], // Lun→Sab
  };

  obTrainingDays = n;
  obSel.days = String(n);
  obSel.specificDays = presets[n] || presets[3];
  obSelectedDayIndices = [...obSel.specificDays];

  // Labels per toast
  const dayLabels = ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
  const dayNames  = obSel.specificDays.map(d => dayLabels[d]).join(', ');
  const levelLabels = { beginner:'Principiante', intermediate:'Intermedio', advanced:'Avanzato' };

  showToast(`🤖 ${n} giorni consigliati (${levelLabels[level] || level}): ${dayNames}`);

  // Salta direttamente allo step 9
  obNext(9);
}
window.obAutoCalcDaysAndNext = obAutoCalcDaysAndNext;

/* ═══════════════════════════════════════════════════════════════════
   SPORT + RUOLI — sistema con selezione ruolo dinamica
═══════════════════════════════════════════════════════════════════ */
const SPORT_ROLES = {
  calcio: {
    label:'Calcio', icon:'⚽',
    roles:[
      {id:'attaccante', label:'Attaccante', desc:'Sprint, finalizzazione, tiro', perfs:['perf_velocita','perf_salto','perf_potenza_braccia']},
      {id:'centrocampista', label:'Centrocampista', desc:'Resistenza, visione, verticalità', perfs:['perf_resistenza','perf_velocita','perf_core']},
      {id:'difensore', label:'Difensore', desc:'Forza fisica, duelli, marcatura', perfs:['perf_gambe','perf_salto','perf_core']},
      {id:'terzino', label:'Terzino', desc:'Resistenza e velocità di corsa', perfs:['perf_resistenza','perf_velocita','perf_gambe']},
      {id:'portiere', label:'Portiere', desc:'Reattività, spalle, riflessi', perfs:['perf_salto','perf_spalle','perf_coordinazione']},
    ]
  },
  basket: {
    label:'Basket', icon:'🏀',
    roles:[
      {id:'playmaker', label:'Play / Point Guard', desc:'Agilità, cambio direzione, resistenza', perfs:['perf_velocita','perf_coordinazione','perf_resistenza']},
      {id:'guardia', label:'Guardia tiratrice / SG', desc:'Sprint, rapidità braccia, salto', perfs:['perf_velocita','perf_salto','perf_potenza_braccia']},
      {id:'ala_piccola', label:'Ala piccola / SF', desc:'Equilibrio forza-velocità-salto', perfs:['perf_salto','perf_velocita','perf_gambe']},
      {id:'ala_grande', label:'Ala grande / PF', desc:'Fisicità, forza in post, rimbalzi', perfs:['perf_gambe','perf_salto','perf_muscoli_grandi']},
      {id:'centro', label:'Centro / Pivot', desc:'Forza massima, fisicità, altezza', perfs:['perf_muscoli_grandi','perf_gambe','perf_core']},
    ]
  },
  nuoto: {
    label:'Nuoto', icon:'🏊',
    roles:[
      {id:'stile_libero', label:'Stile libero (Crawl)', desc:'Spalle, resistenza aerobica, core', perfs:['perf_spalle','perf_resistenza','perf_core']},
      {id:'dorso', label:'Dorso', desc:'Dorsali, spalle, core laterale', perfs:['perf_spalle','perf_core','perf_resistenza']},
      {id:'rana', label:'Rana', desc:'Gambe, anca, flessibilità', perfs:['perf_gambe','perf_flessibilita','perf_core']},
      {id:'farfalla', label:'Farfalla', desc:'Potenza totale, core, schiena', perfs:['perf_potenza_braccia','perf_core','perf_spalle']},
      {id:'nuoto_misto', label:'Nuoto — stile misto', desc:'Equilibrio totale', perfs:['perf_resistenza','perf_spalle','perf_core']},
      {id:'pallanuoto', label:'Pallanuoto', desc:'Gambe, spalle, esplosività', perfs:['perf_salto','perf_spalle','perf_resistenza']},
    ]
  },
  pallavolo: {
    label:'Pallavolo', icon:'🏐',
    roles:[
      {id:'schiacciatore', label:'Schiacciatore', desc:'Salto verticale, potenza braccia', perfs:['perf_salto','perf_potenza_braccia','perf_spalle']},
      {id:'libero', label:'Libero', desc:'Reattività, baricentro basso, gambe', perfs:['perf_velocita','perf_coordinazione','perf_gambe']},
      {id:'alzatore', label:'Alzatore', desc:'Dita, polsi, agilità, visione', perfs:['perf_coordinazione','perf_velocita','perf_grip']},
      {id:'centrale', label:'Centrale', desc:'Muro, rimbalzo, esplosività', perfs:['perf_salto','perf_gambe','perf_core']},
      {id:'opposto', label:'Opposto', desc:'Attacco da zona 2, potenza', perfs:['perf_salto','perf_potenza_braccia','perf_muscoli_grandi']},
    ]
  },
  atletica: {
    label:'Atletica', icon:'🏃',
    roles:[
      {id:'velocista', label:'Velocista (100–400m)', desc:'Esplosività, forza gambe, partenza', perfs:['perf_velocita','perf_gambe','perf_salto']},
      {id:'mezzofondo', label:'Mezzofondo (800–3000m)', desc:'Resistenza aerobica e anaerobica', perfs:['perf_resistenza','perf_gambe','perf_core']},
      {id:'fondo', label:'Fondo / Maratona', desc:'Resistenza aerobica estrema', perfs:['perf_resistenza','perf_gambe','perf_core']},
      {id:'saltatore', label:'Salto in alto / triplo / lungo', desc:'Esplosività, coordinazione, gambe', perfs:['perf_salto','perf_velocita','perf_coordinazione']},
      {id:'lanciatore', label:'Lancio (peso, disco, giavellotto)', desc:'Potenza esplosiva totale', perfs:['perf_potenza_braccia','perf_core','perf_gambe']},
    ]
  },
  boxe: {
    label:'Boxe / Kickboxing', icon:'🥊',
    roles:[
      {id:'pugile', label:'Pugile classico', desc:'Potenza braccia, condizionamento, piedi', perfs:['perf_potenza_braccia','perf_velocita','perf_resistenza']},
      {id:'kickboxer', label:'Kickboxer', desc:'Gambe esplosive, rotazione, potenza', perfs:['perf_gambe','perf_potenza_braccia','perf_velocita']},
      {id:'muay_thai', label:'Muay Thai', desc:'Clinch, ginocchia, resistenza', perfs:['perf_gambe','perf_resistenza','perf_core']},
    ]
  },
  judo: {
    label:'Judo / Lotta / MMA', icon:'🥋',
    roles:[
      {id:'judoka', label:'Judoka / Lottatore', desc:'Forza di presa, schiena, gambe', perfs:['perf_grip','perf_gambe','perf_core']},
      {id:'mma', label:'MMA Fighter', desc:'Full contact — tutto il corpo', perfs:['perf_potenza_braccia','perf_gambe','perf_resistenza','perf_core']},
    ]
  },
  tennis: {
    label:'Tennis / Padel', icon:'🎾',
    roles:[
      {id:'giocatore_base', label:'Giocatore amatoriale', desc:'Core, gambe, resistenza generale', perfs:['perf_core','perf_gambe','perf_resistenza']},
      {id:'serve_volley', label:'Serve & Volley', desc:'Esplosività, braccio, reattività', perfs:['perf_potenza_braccia','perf_velocita','perf_coordinazione']},
      {id:'difensore', label:'Difensore da fondo', desc:'Resistenza estrema, gambe, core', perfs:['perf_resistenza','perf_gambe','perf_core']},
    ]
  },
  rugby: {
    label:'Rugby', icon:'🏉',
    roles:[
      {id:'trequarti', label:'Trequarti / Tre quarti', desc:'Velocità, agilità, cambio passo', perfs:['perf_velocita','perf_salto','perf_gambe']},
      {id:'pilone', label:'Pilone / Prop', desc:'Forza massima, spinta, fisicità', perfs:['perf_muscoli_grandi','perf_gambe','perf_core']},
      {id:'flanker', label:'Flanker / Numero 8', desc:'Resistenza, fisicità, rucking', perfs:['perf_resistenza','perf_gambe','perf_potenza_braccia']},
    ]
  },
  ciclismo: {label:'Ciclismo',icon:'🚴',roles:[
    {id:'granfondista',label:'Granfondista / Endurance',desc:'Resistenza aerobica, gambe, core',perfs:['perf_resistenza','perf_gambe','perf_core']},
    {id:'scalatore',label:'Scalatore',desc:'Potenza/peso, gambe, core',perfs:['perf_gambe','perf_resistenza','perf_core']},
    {id:'sprinter_bici',label:'Sprinter',desc:'Esplosività gambe, potenza',perfs:['perf_gambe','perf_velocita','perf_salto']},
  ]},
  crossfit: {label:'CrossFit',icon:'⚙️',roles:[
    {id:'crossfitter_base',label:'CrossFitter — General',desc:'Forza, resistenza, skill WOD',perfs:['perf_muscoli_grandi','perf_resistenza','perf_skill_cali']},
  ]},
  powerlifting: {label:'Powerlifting',icon:'🏋️',roles:[
    {id:'powerlifter',label:'Powerlifter',desc:'Squat, panca, stacco — massimale',perfs:['perf_muscoli_grandi','perf_gambe','perf_grip']},
  ]},
  ginnastica: {label:'Ginnastica',icon:'🤸',roles:[
    {id:'ginnasta',label:'Ginnasta',desc:'Skill, corpo libero, attrezzi',perfs:['perf_skill_cali','perf_flessibilita','perf_coordinazione']},
  ]},
  danza: {label:'Danza',icon:'💃',roles:[
    {id:'danzatore',label:'Danzatore',desc:'Flessibilità, coordinazione, core',perfs:['perf_flessibilita','perf_coordinazione','perf_core']},
  ]},
  arrampicata: {label:'Arrampicata',icon:'🧗',roles:[
    {id:'boulder',label:'Boulder',desc:'Forza presa, esplosività braccia',perfs:['perf_grip','perf_potenza_braccia','perf_core']},
    {id:'lead',label:'Arrampicata in cordata',desc:'Resistenza, grip, core',perfs:['perf_grip','perf_resistenza','perf_core']},
  ]},
  hockey: {label:'Hockey',icon:'🏒',roles:[
    {id:'hockey_player',label:'Giocatore',desc:'Gambe, core, resistenza',perfs:['perf_gambe','perf_core','perf_resistenza']},
  ]},
  golf: {label:'Golf',icon:'⛳',roles:[
    {id:'golfista',label:'Golfista',desc:'Core, rotazione, mobilità',perfs:['perf_core','perf_flessibilita','perf_coordinazione']},
  ]},
};

// Mappa per conversione legacy
const SPORT_TO_LEGACY = {
  calcio:'sport_calcio',basket:'sport_basket',nuoto:'sport_nuoto',
  pallavolo:'sport_volley',atletica:'sport_corsa',ciclismo:'sport_ciclismo',
  tennis:'sport_tennis',boxe:'sport_arti_marziali',judo:'sport_arti_marziali',
  ginnastica:'sport_ginnastica',rugby:'sport_rugby',danza:'sport_danza',
  crossfit:'sport_nessuno',powerlifting:'sport_nessuno',
  arrampicata:'sport_nessuno',hockey:'sport_nessuno',golf:'sport_nessuno',
};

var obSelectedSports = {}; // { calcio: 'attaccante', basket: null, ... }

function obSportToggle(el, sport) {
  if (!obSel.multi) obSel.multi = {};
  if (!obSel.multi.sports) obSel.multi.sports = [];
  if (!obSel.multi.sportRoles) obSel.multi.sportRoles = {};

  const isNone = sport === 'sport_nessuno';
  if (isNone) {
    // toggle nessuno
    if (obSelectedSports.nessuno) {
      delete obSelectedSports.nessuno;
      el.classList.remove('sel');
    } else {
      obSelectedSports = { nessuno: true };
      document.querySelectorAll('#ob3b .ob-multi').forEach(c => c.classList.remove('sel'));
      el.classList.add('sel');
    }
    obSel.multi.sports = [];
    document.getElementById('ob-sport-roles').style.display = 'none';
    return;
  }

  delete obSelectedSports.nessuno;
  document.querySelector('#ob3b .ob-multi[onclick*="sport_nessuno"]')?.classList.remove('sel');

  if (obSelectedSports[sport] !== undefined) {
    delete obSelectedSports[sport];
    el.classList.remove('sel');
  } else {
    obSelectedSports[sport] = null;
    el.classList.add('sel');
  }

  // Sync to obSel.multi.sports (legacy format)
  obSel.multi.sports = Object.keys(obSelectedSports)
    .filter(s => s !== 'nessuno')
    .map(s => SPORT_TO_LEGACY[s] || ('sport_' + s));

  obRenderSportRoles();
  if (document.getElementById('ob3c')?.classList.contains('active')) obRefreshSmartPreview();
}

function obRenderSportRoles() {
  const box = document.getElementById('ob-sport-roles');
  if (!box) return;
  const sports = Object.keys(obSelectedSports).filter(s => s !== 'nessuno' && SPORT_ROLES[s]);
  if (!sports.length) { box.style.display = 'none'; return; }

  box.style.display = 'block';
  box.innerHTML = sports.map(sport => {
    const def = SPORT_ROLES[sport];
    if (!def || !def.roles?.length) return '';
    const curRole = obSelectedSports[sport];
    return `<div style="margin-bottom:14px;">
      <div style="font-size:11px;font-weight:800;color:var(--acc);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">${def.icon} ${def.label} — Ruolo</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${def.roles.map(r => `<button
          onclick="obSetSportRole('${sport}','${r.id}',this)"
          style="padding:8px 13px;border-radius:99px;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;transition:all .15s;
            background:${curRole===r.id?'var(--acc)':'var(--bg4)'};
            color:${curRole===r.id?'#080810':'var(--text2)'};
            border:1px solid ${curRole===r.id?'var(--acc)':'var(--border2)'};">
          ${r.label}
          <span style="font-size:10px;font-weight:400;opacity:.7;display:block;">${r.desc}</span>
        </button>`).join('')}
      </div>
    </div>`;
  }).join('');
}

function obSetSportRole(sport, roleId, btn) {
  if (!obSel.multi) obSel.multi = {};
  if (!obSel.multi.sportRoles) obSel.multi.sportRoles = {};

  obSelectedSports[sport] = roleId;
  obSel.multi.sportRoles[sport] = roleId;

  // Auto-add perfs from role
  const def = SPORT_ROLES[sport];
  const role = def?.roles.find(r => r.id === roleId);
  if (role?.perfs) {
    if (!obSel.multi.perfs) obSel.multi.perfs = [];
    (role.perfs||[]).forEach(p => {
      if (!obSel.multi.perfs.includes(p)) obSel.multi.perfs.push(p);
    });
  }

  obRenderSportRoles();
}

/* ─── ONBOARDING SKIP ─── */
function obSkipAll() {
  const nm = document.getElementById('ob-name')?.value?.trim();
  if (nm) profile.name = nm;
  else profile.name = 'Atleta';
  profile.skippedOnboard = true;
  profile.level = profile.level || 'beginner';
  profile.recPreset = profile.recPreset || 'cali-starter';
  dbSet('profile', profile);
  window._ftOnboardingActive = false;
  localStorage.removeItem('ft_just_reset');
  localStorage.removeItem('ft_pending_google_login');
  document.getElementById('scr-onboard').classList.remove('active');
  document.getElementById('scr-app').classList.add('active');
  initApp();
  setTimeout(() => showToast('👋 Benvenuto! Completa il profilo quando vuoi.'), 500);
}

/* ─── EQUIPMENT HELPERS ─── */
const GYM_ALL_EQ = [
  'eq_manubri','eq_bilanciere','eq_bilanciere_smith','eq_ez_bar','eq_trap_bar',
  'eq_panca_piana','eq_panca_inclinata','eq_pec_deck','eq_chest_press','eq_shoulder_press',
  'eq_dip_machine','eq_cable_torre','eq_triceps_machine',
  'eq_lat_machine','eq_rematore_cavi','eq_t_bar_row','eq_face_pull_cavo',
  'eq_back_extension','eq_curl_machine',
  'eq_leg_press','eq_hack_squat','eq_leg_extension','eq_leg_curl',
  'eq_hip_thrust_bench','eq_abductor','eq_calf_machine','eq_gluteus_machine',
  'eq_tapis_roulant','eq_bici_cardio','eq_ellittica','eq_vogatore',
  'eq_assault_bike','eq_ski_erg','eq_sled','eq_battle_ropes',
  'eq_ab_machine','eq_ab_wheel','eq_roman_chair','eq_pallof_press_eq',
  'eq_sbarra','eq_parallele','eq_banda','eq_kettlebell',
];

function obSelectAllGym() {
  if (!obSel.multi) obSel.multi = {};
  if (!obSel.multi.eqs) obSel.multi.eqs = [];
  (typeof GYM_ALL_EQ!=='undefined'?GYM_ALL_EQ:[]).forEach(eq => {
    if (!obSel.multi.eqs.includes(eq)) obSel.multi.eqs.push(eq);
    const el = document.querySelector(`[onclick*="${eq}"]`);
    if (el) el.classList.add('sel');
  });
  obSel.env = obSel.env || 'gym';
  showToast('🏋️ Palestra completa selezionata!');
}

/* ── V6: Selezione solo macchinari ── */
const GYM_MACHINES_ONLY_EQ = [
  'eq_chest_press','eq_shoulder_press','eq_dip_machine','eq_cable_torre',
  'eq_triceps_machine','eq_lat_machine','eq_rematore_cavi','eq_back_extension',
  'eq_curl_machine','eq_leg_press','eq_hack_squat','eq_leg_extension','eq_leg_curl',
  'eq_hip_thrust_bench','eq_abductor','eq_calf_machine','eq_gluteus_machine',
  'eq_tapis_roulant','eq_bici_cardio','eq_ellittica','eq_vogatore',
  'eq_ab_machine','eq_pec_deck',
];
function obSelectMachinesOnly() {
  if (!obSel.multi) obSel.multi = {};
  obSel.multi.eqs = [];
  // deseleziona tutto
  document.querySelectorAll('#ob_s7 .ob-multi').forEach(el=>el.classList.remove('sel'));
  (typeof GYM_MACHINES_ONLY_EQ!=='undefined'?GYM_MACHINES_ONLY_EQ:[]).forEach(eq => {
    obSel.multi.eqs.push(eq);
    const el = document.querySelector(`[onclick*="${eq}"]`);
    if (el) el.classList.add('sel');
  });
  obSel.env = 'gym';
  obSel.machinePrimary = true;
  showToast('🤖 Solo macchinari selezionati!');
}
window.obSelectMachinesOnly = obSelectMachinesOnly;

function obClearEquip() {
  if (!obSel.multi) obSel.multi = {};
  obSel.multi.eqs = [];
  // Deseleziona tutte le card attrezzatura nello step ob_s7 (ID corretto)
  document.querySelectorAll('#ob_s7 .ob-multi').forEach(el => el.classList.remove('sel'));
  showToast('✕ Attrezzatura azzerata');
}

// Patch obMulti to also track eqs
// obMulti override v44 (eq_) — neutralizzato, gestito da obMulti consolidata
var _origObMultiV44 = window.obMulti; // kept for reference only

/* ═══════════════════════════════════════════════════════════════════
   CLONE & CUSTOMIZE PRESET — "Crea copia modificabile"
   Aggiunge pulsante "✏️ Personalizza" a ogni preset card nella
   schermata Esplora. L'utente clona il preset nel builder e può
   modificare ogni esercizio, serie, reps, riposo e peso.
═══════════════════════════════════════════════════════════════════ */

/* Salva i programmi personalizzati in IndexedDB */
async function loadCustomPrograms() {
  const stored = await dbGet('customPrograms');
  window.CUSTOM_PROGRAMS = stored || [];
}
async function saveCustomPrograms() {
  await dbSet('customPrograms', window.CUSTOM_PROGRAMS || []);
}
window.CUSTOM_PROGRAMS = [];
loadCustomPrograms();

/* Clona un preset nel builder per personalizzarlo */
function clonePresetToBuilder(presetId) {
  const base = PRESETS_DATA.find(p => p.id === presetId);
  if (!base) { showToast('Preset non trovato'); return; }
  editProg = JSON.parse(JSON.stringify(base));
  editProg.id = 'custom_' + Date.now();
  editProg.name = base.name + ' — Personale';
  editProg.isCustom = true;
  editProg.basePreset = presetId;
  // Add weight field to every exercise
  (editProg.days || []).forEach(day => {
    (day.exercises || []).forEach(ex => {
      if (!ex.kg) ex.kg = '';
    });
  });
  renderBuilder();
  openSub('sub-new-sess');
  showToast('✏️ Copia creata — modifica liberamente!');
}

/* Salva come programma personalizzato (senza avviare subito) */
async function saveAsCustomProgram() {
  const nm = document.getElementById('b-name')?.value?.trim();
  if (!nm) { showToast('⚠️ Inserisci un nome!'); return; }
  editProg.name = nm;
  editProg.type = document.getElementById('b-type')?.value || 'custom';
  editProg.duration = document.getElementById('b-dur')?.value || '60';
  editProg.difficulty = document.getElementById('b-diff')?.value || 'intermediate';
  normalizeProgramSets(editProg);
  const activeDays = editProg.days.filter(d => !d.rest);
  if (!activeDays.length) { showToast('⚠️ Aggiungi almeno un giorno!'); return; }
  // Upsert
  if (!window.CUSTOM_PROGRAMS) window.CUSTOM_PROGRAMS = [];
  const idx = window.CUSTOM_PROGRAMS.findIndex(p => p.id === editProg.id);
  if (idx >= 0) window.CUSTOM_PROGRAMS[idx] = editProg;
  else window.CUSTOM_PROGRAMS.push(editProg);
  await saveCustomPrograms();
  closeSub('sub-new-sess');
  showToast('✅ Programma personalizzato salvato!');
  renderCustomProgramsSection();
}

/* Render lista programmi personalizzati nella tab "Il mio programma" */
function renderCustomProgramsSection() {
  const list = window.CUSTOM_PROGRAMS || [];
  const wrap = document.getElementById('custom-programs-wrap');
  if (!wrap) return;
  if (!list.length) {
    wrap.innerHTML = `<div style="text-align:center;padding:24px 0;color:var(--text3);font-size:13px;">
      Nessun programma personale. Vai su <b>Esplora preset</b> e tocca <b>✏️ Personalizza</b> su qualsiasi programma.
    </div>`;
    return;
  }
  wrap.innerHTML = list.map((p,i) => {
    const activeDays = (p.days||[]).filter(d=>!d.rest);
    return `<div style="background:var(--bg3);border:1.5px solid var(--border2);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:10px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="font-size:24px;">${p.icon||'✏️'}</div>
        <div style="flex:1;">
          <div style="font-size:15px;font-weight:800;">${p.name}</div>
          <div style="font-size:11px;color:var(--text2);">${activeDays.length} giorni · ${p.duration||'?'} min</div>
          ${p.basePreset?`<div style="font-size:10px;color:var(--acc);margin-top:2px;">📋 Basato su: ${PRESETS_DATA.find(x=>x.id===p.basePreset)?.name||p.basePreset}</div>`:''}
        </div>
        <button onclick="deleteCustomProgram('${p.id}')" style="padding:6px 10px;background:none;border:1px solid rgba(255,92,106,.2);border-radius:var(--r-sm);color:var(--red);font-size:12px;cursor:pointer;">✕</button>
      </div>
      <div style="display:flex;gap:6px;">
        <button onclick="startCustomProgram('${p.id}')" style="flex:1;padding:10px;background:var(--acc);color:#080810;border:none;border-radius:var(--r-sm);font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer;">▶ Avvia</button>
        <button onclick="editCustomProgram('${p.id}')" style="padding:10px 14px;background:var(--bg4);border:1px solid var(--border);border-radius:var(--r-sm);font-family:'Syne',sans-serif;font-size:12px;font-weight:700;color:var(--text2);cursor:pointer;">✏️ Modifica</button>
      </div>
    </div>`;
  }).join('');
}

function startCustomProgram(id) {
  const p = (window.CUSTOM_PROGRAMS||[]).find(x=>x.id===id);
  if (!p) return;
  const normalized = normalizeProgramSets(JSON.parse(JSON.stringify(p)));
  const activeDays = normalized.days.filter(d=>!d.rest);
  if (!activeDays.length) { showToast('Nessun giorno attivo'); return; }
  beginWorkout(normalized, activeDays[0]);
}

function editCustomProgram(id) {
  const p = (window.CUSTOM_PROGRAMS||[]).find(x=>x.id===id);
  if (!p) return;
  editProg = JSON.parse(JSON.stringify(p));
  renderBuilder();
  openSub('sub-new-sess');
}

async function deleteCustomProgram(id) {
  if (!confirm('Eliminare questo programma?')) return;
  window.CUSTOM_PROGRAMS = (window.CUSTOM_PROGRAMS||[]).filter(p=>p.id!==id);
  await saveCustomPrograms();
  renderCustomProgramsSection();
  showToast('Programma eliminato');
}

/* Patch del builder per aggiungere campo PESO e pulsante "Salva senza avviare" */
const _origExItemHTML = window.exItemHTML || function(){return '';};
window.exItemHTML_v44 = function(ex, di, j) {
  const exD = EX_DB.find(e=>e.id===ex.id)||{name:ex.name||ex.id,m:'custom'};
  const tc = TC[exD.m]||TC.custom;
  return `<div class="ex-item">
    <span class="ex-drag">⠿</span>
    <div class="ex-body">
      <div class="ex-nm"><span style="font-size:10px;background:${tc.bg};color:${tc.c};padding:2px 7px;border-radius:99px;margin-right:6px">${exD.m}</span>${exD.name}</div>
      <div class="params" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;">
        <div class="param-w"><input class="param-in" value="${ex.s||'3'}" onchange="editProg.days[${di}].exercises[${j}].s=this.value" style="width:44px;"><div class="param-lbl">Serie</div></div>
        <div class="param-w"><input class="param-in" value="${ex.r||'10'}" onchange="editProg.days[${di}].exercises[${j}].r=this.value" style="width:44px;"><div class="param-lbl">Reps</div></div>
        <div class="param-w"><input class="param-in" value="${ex.rs||'75s'}" onchange="editProg.days[${di}].exercises[${j}].rs=this.value" style="width:44px;"><div class="param-lbl">Riposo</div></div>
        <div class="param-w"><input class="param-in" placeholder="—" value="${ex.kg||''}" onchange="editProg.days[${di}].exercises[${j}].kg=this.value" style="width:50px;"><div class="param-lbl">kg / note</div></div>
      </div>
    </div>
    <button class="ex-del" onclick="removeEx(${di},${j})">✕</button>
  </div>`;
};
// Override the global exItemHTML if available
if (typeof exItemHTML === 'function') { window.exItemHTML = window.exItemHTML_v44; }

/* Patch toggleEpCard to inject "Personalizza" button inside expanded card */
const _origToggleEpCard = window.toggleEpCard;
window.toggleEpCard = function(i) {
  if (typeof _origToggleEpCard === 'function') _origToggleEpCard(i);
  // After toggling, inject the customize button if not already there
  const body = document.getElementById('epb-' + i);
  if (!body || body.style.display === 'none') return;
  if (body.querySelector('.ft-customize-btn')) return; // already injected
  const preset = (window.PRESETS_DATA || PRESETS_DATA)?.[i];
  if (!preset) return;
  const btnWrap = document.createElement('div');
  btnWrap.style.cssText = 'padding:0 16px 16px;';
  btnWrap.innerHTML = `<button class="ft-customize-btn" onclick="clonePresetToBuilder('${preset.id}')"
    style="width:100%;padding:12px;background:var(--bg4);border:1.5px dashed rgba(200,245,60,.35);
      border-radius:var(--r-sm);font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
      color:var(--acc);cursor:pointer;transition:all .15s;letter-spacing:.02em;"
    onmouseover="this.style.background='rgba(200,245,60,.06)'"
    onmouseout="this.style.background='var(--bg4)'">
    ✏️ Crea copia personalizzabile
  </button>`;
  body.appendChild(btnWrap);
};

/* Also patch renderPresetsInTraining to add customize button on training tab cards */
const _origRenderPresetsInTraining = window.renderPresetsInTraining;
window.renderPresetsInTraining = function() {
  if (typeof _origRenderPresetsInTraining === 'function') _origRenderPresetsInTraining();
  // Inject customize links under each card
  setTimeout(() => {
    const wrap = document.getElementById('training-presets-wrap');
    if (!wrap) return;
    // Custom programs section
    if (!document.getElementById('custom-programs-section')) {
      const sec = document.createElement('div');
      sec.id = 'custom-programs-section';
      sec.innerHTML = `
        <div style="font-size:10px;font-weight:800;color:var(--text3);text-transform:uppercase;letter-spacing:.12em;margin:16px 0 10px;">✏️ Miei programmi personali</div>
        <div id="custom-programs-wrap"></div>`;
      try { if(wrap.parentNode && wrap.parentNode.contains(wrap)) wrap.parentNode.insertBefore(sec, wrap.nextSibling); } catch(e) {}
    }
    renderCustomProgramsSection();
  }, 200);
};

/* Patch saveProgram to also offer "Save without starting" */
const _origSaveProgram = window.saveProgram;
window.saveProgram = async function() {
  // If editing a custom program, use saveAsCustomProgram
  if (editProg && editProg.isCustom) {
    await saveAsCustomProgram();
    return;
  }
  if (typeof _origSaveProgram === 'function') await _origSaveProgram();
};

/* ── BUILDER: add "Salva senza avviare" button ── */
(function patchBuilderFooter() {
  function tryPatch() {
    const saveBtn = document.querySelector('#sub-new-sess .btn-acc[onclick*="saveProgram"]');
    if (!saveBtn || saveBtn.dataset.patched) return;
    saveBtn.dataset.patched = '1';
    const saveNoStart = document.createElement('button');
    saveNoStart.className = 'btn btn-ghost btn-sm';
    saveNoStart.style.cssText = 'margin-top:8px;width:100%;';
    saveNoStart.textContent = '💾 Salva programma (senza avviare)';
    saveNoStart.onclick = saveAsCustomProgram;
    try { if(saveBtn.parentNode && saveBtn.parentNode.contains(saveBtn)) saveBtn.parentNode.insertBefore(saveNoStart, saveBtn.nextSibling); } catch(e) {}
  }
  document.addEventListener('click', () => setTimeout(tryPatch, 300));
  setTimeout(tryPatch, 2000);
})();
var obTrainingIntensity = null; // 'minimal'|'moderate'|'serious'|'hardcore'

function obPickIntensity(el, val) {
  el.closest('.ob-grid').querySelectorAll('.ob-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  obTrainingIntensity = val;
}

/* Calcola giorni ottimali in base a intensità + sport + obiettivi fisici */
function obCalcSmartDays() {
  const intensity = obTrainingIntensity || 'moderate';
  const sports   = (obSel.multi?.sports || []);
  const perfs    = (obSel.multi?.perfs  || []);
  const level    = obSel.level || 'intermediate';

  const baseMap = { minimal: 2, moderate: 3, serious: 4, hardcore: 5 };
  let days = baseMap[intensity] || 3;

  const highVolSports = ['sport_calcio','sport_basket','sport_nuoto','sport_corsa','sport_ciclismo','sport_rugby'];
  const hasMajorSport = sports.some(s => highVolSports.includes(s));
  if (hasMajorSport && days > 2) days = Math.max(2, days - 1);

  const explosivePerfs = ['perf_salto','perf_velocita','perf_potenza_braccia'];
  const hasExplosive = perfs.some(p => explosivePerfs.includes(p));
  if (hasExplosive && level === 'beginner') days = Math.min(days, 3);
  if (perfs.includes('perf_skill_cali') && days < 3) days = 3;
  if (intensity === 'hardcore' && !hasMajorSport) days = Math.min(6, days + 1);

  return Math.max(2, Math.min(6, days));
}

/* Usa il motore V44 per trovare il preset migliore e mostrarlo */
function obBuildSmartPreview() {
  const days = obCalcSmartDays();
  const sports = (obSel.multi?.sports || []).filter(s => !s.includes('nessuno'));
  const perfs  = (obSel.multi?.perfs  || []);

  // Chiama il motore di raccomandazione V44 con tutti i dati disponibili
  let presetId = 'cali-intermediate';
  if (typeof getRecommendedPresetV44 === 'function') {
    presetId = getRecommendedPresetV44({
      goals:     obGoals.length ? [...obGoals] : ['hypertrophy'],
      level:     obSel.level || 'intermediate',
      env:       obSel.env   || 'calisthenics',
      sex:       obSel.sex   || 'm',
      sports:    sports,
      perfs:     perfs,
      intensity: obTrainingIntensity || 'moderate',
      equipment: [...(obSel.multi?.eqs||[])],
    });
  }

  const preset = (typeof PRESETS_DATA !== 'undefined') ? PRESETS_DATA.find(p=>p.id===presetId) : null;

  const sportLabels = {
    sport_calcio:'calcio', sport_basket:'basket', sport_nuoto:'nuoto',
    sport_corsa:'corsa', sport_ciclismo:'ciclismo', sport_arti_marziali:'arti marziali',
    sport_ginnastica:'ginnastica', sport_tennis:'tennis/padel', sport_volley:'volley',
    sport_rugby:'rugby', sport_danza:'danza'
  };
  const perfLabels = {
    perf_salto:'salto', perf_potenza_braccia:'potenza braccia',
    perf_velocita:'sprint', perf_resistenza:'resistenza', perf_core:'core',
    perf_flessibilita:'flessibilità', perf_muscoli_grandi:'ipertrofia',
    perf_grip:'grip', perf_spalle:'spalle', perf_gambe:'gambe',
    perf_coordinazione:'coordinazione', perf_skill_cali:'skill calistheniche'
  };

  let lines = [];
  if (preset) {
    lines.push(`<b style="font-size:15px;">${preset.icon} ${preset.name}</b>`);
    lines.push(`<span style="color:var(--text2);font-size:12px;">${preset.desc}</span>`);
    lines.push(`<span style="display:inline-block;margin-top:6px;padding:2px 10px;background:var(--bg4);border-radius:99px;font-size:11px;">${preset.diff} · ${preset.dur} min/sessione · ${preset.days.filter(d=>!d.rest).length} giorni/sett</span>`);
  }
  if (sports.length) lines.push(`<div style="margin-top:8px;font-size:11px;color:var(--text3);">Sport: ${sports.map(s=>sportLabels[s]||s).join(', ')}</div>`);
  if (perfs.length)  lines.push(`<div style="font-size:11px;color:var(--text3);">Focus: ${perfs.map(p=>perfLabels[p]||p).join(', ')}</div>`);

  window._obSmartPresetId = presetId;
  return { days, text: lines.join('') };
}

/* Aggiorna il box preview in real-time */
function obRefreshSmartPreview() {
  const box = document.getElementById('ob-smart-days-preview');
  const txt = document.getElementById('ob-smart-days-text');
  if (!box || !txt) return;
  const { text } = obBuildSmartPreview();
  txt.innerHTML = text;
  box.style.display = 'block';
}

/* Chiamata al click "Continua" dello step 3c */
function obFinalizeSmartDays() {
  const { days } = obBuildSmartPreview();
  obTrainingDays = days;
  obSel.days = String(days);
  // Pre-imposta il preset raccomandato
  if (window._obSmartPresetId) window._recPresetId = window._obSmartPresetId;
  obGo(4);
}

/* Patch obMulti per aggiornare preview in real-time */
// obMulti override sport_/perf_ — neutralizzato, gestito da obMulti consolidata
var _origObMulti = window.obMulti; // kept for reference only

function showDaysPreview(n) { /* no-op — kept for compatibility */ }
function obPickDays(el, n) { obTrainingDays = n; obSel.days = String(n); }

function onSexChange() {
  const sex = document.getElementById('ob-sex')?.value;
  const preg = document.getElementById('ob-preg-wrap');
  if (preg) preg.style.display = sex === 'f' ? '' : 'none';
  
  // ═══ CICLO INTELLIGENTE: Mostrato SOLO a donne ═══
  const cycleStep = document.getElementById('ob6');
  const fContent = document.getElementById('ob6-female-content');
  const mContent = document.getElementById('ob6-male-content');
  
  if (sex === 'f') {
    // DONNA: Mostra ciclo normalmente
    if (cycleStep) cycleStep.style.display = '';
    if (fContent) fContent.style.display = '';
    if (mContent) mContent.style.display = 'none';
  } else {
    // Ciclo richiesto solo per donne: step nascosto per uomini
    if (cycleStep) cycleStep.style.display = 'none';
    if (fContent) fContent.style.display = 'none';
    if (mContent) mContent.style.display = 'none';
    if (obCurStep === 6) obGo(7);
  }
  
  calcTDEE();
}
setTimeout(onSexChange, 0);

// Wire cycle choice cards
function obPickCycle(el, val) {
  el.closest('.ob-grid').querySelectorAll('.ob-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  const fields = document.getElementById('ob-cycle-fields');
  if (fields) fields.style.display = val === 'yes' ? '' : 'none';
  obSel.cycle = val;
}

/* V41: obGo 8-step flow merged into consolidated V41 obGo */
var _origObGoV41 = typeof obGo !== "undefined" ? obGo : null; // reference kept, override neutralised
// obGo v5 8-step override neutralised

/* ─────────────────────────────────────────
   AUTO-GENERATE WEEKLY PLAN
───────────────────────────────────────── */
function buildGeneratedPlan() {
  const level  = obSel.level || 'beginner';
  const goals  = obGoals.length ? obGoals : ['hypertrophy'];
  const days   = obTrainingDays || 3;
  const isZero = level === 'zero';

  // Pick base preset
  let presetId = getRecommendedPreset(goals, isZero ? 'beginner' : level);
  let base = PRESETS_DATA.find(x => x.id === presetId) || PRESETS_DATA[0];
  base = JSON.parse(JSON.stringify(base)); // deep clone

  // Build the weekly schedule based on days count
  const plan = generateWeeklySchedule(base, days, level, goals, isZero);
  obGeneratedPlan = plan;
  window.obGeneratedPlan = plan;
  window._recPresetId = presetId;
  renderGeneratedPlan(plan, level, isZero);
}

const WEEKDAYS = ['Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato','Domenica'];

function generateWeeklySchedule(basePreset, numDays, level, goals, isZero) {
  // Training day distribution patterns
  const patterns = {
    2: [0, 3],                // Mon, Thu
    3: [0, 2, 4],             // Mon, Wed, Fri
    4: [0, 1, 3, 4],          // Mon, Tue, Thu, Fri
    5: [0, 1, 2, 4, 5],       // Mon–Wed, Fri–Sat
    6: [0, 1, 2, 3, 4, 5],    // Mon–Sat
  };
  // Se l'utente ha selezionato giorni specifici, usa quelli; altrimenti usa pattern default
  const trainIdx = (typeof obSelectedDayIndices !== 'undefined' && obSelectedDayIndices.length > 0)
    ? [...obSelectedDayIndices]
    : (patterns[numDays] || patterns[3]);

  // Get active training days from preset (filter out rest)
  let activeDays = basePreset.days.filter(d => !d.rest);

  // For zero-base: replace exercises with progressions
  if (isZero) {
    activeDays = activeDays.map(d => adaptDayForZeroBase(d, goals));
  }

  // Cycle/repeat preset days to fill all training slots
  const schedule = [];
  for (let dow = 0; dow < 7; dow++) {
    if (trainIdx.includes(dow)) {
      const slotIdx = trainIdx.indexOf(dow);
      const dayTemplate = activeDays[slotIdx % activeDays.length];
      schedule.push({
        weekday: WEEKDAYS[dow],
        isRest: false,
        day: { ...dayTemplate, name: WEEKDAYS[dow] + ' — ' + dayTemplate.name },
      });
    } else {
      schedule.push({
        weekday: WEEKDAYS[dow],
        isRest: true,
        day: { name: WEEKDAYS[dow] + ' — Riposo', type:'rest', rest:true, exercises:[] },
      });
    }
  }
  return { schedule, presetName: basePreset.name, presetIcon: basePreset.icon, numDays, level };
}

function adaptDayForZeroBase(day, goals) {
  // Replace each exercise with zero-base equivalent
  const adapted = { ...day, exercises: [] };
  const usedMotions = new Set();

  (day.exercises||[]).forEach(ex => {
    const exD = EX_DB.find(e => e.id === ex.id);
    const motion = exD?.m || 'push';
    if (!usedMotions.has(motion)) {
      usedMotions.add(motion);
      const zeroExs = ZERO_BASE_EXERCISES[motion === 'lower' ? 'squat' : motion === 'skill' ? 'core' : motion];
      if (zeroExs) {
        (zeroExs||[]).forEach(ze => adapted.exercises.push(ze));
        return;
      }
    }
    // Fallback: keep original but reduce intensity
    adapted.exercises.push({
      ...ex,
      s: String(Math.max(1, safeSets(ex.s) - 1)),
      r: ex.r.includes('s') ? ex.r : String(Math.max(5, Math.round(safeReps(ex.r) * 0.6))),
    });
  });

  if (!adapted.exercises.length) {
    adapted.exercises = ZERO_BASE_EXERCISES.push.slice(0,2)
      .concat(ZERO_BASE_EXERCISES.squat.slice(0,2))
      .concat(ZERO_BASE_EXERCISES.core.slice(0,1));
  }

  return adapted;
}

function renderGeneratedPlan(plan, level, isZero) {
  const wrap = document.getElementById('ob-generated-plan');
  if (!wrap) return;

  const levelBadge = {
    zero:'🌿 Zero Base', beginner:'🌱 Principiante', intermediate:'⚡ Intermedio',
    advanced:'🔥 Avanzato', athlete:'🏆 Atleta'
  }[level] || level;

  const dayCards = plan.schedule.map(slot => {
    if (slot.isRest) {
      return `<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--bg3);border-radius:var(--r);margin-bottom:6px;opacity:.6">
        <span style="font-size:18px">🛌</span>
        <div>
          <div style="font-size:13px;font-weight:700">${slot.weekday}</div>
          <div style="font-size:11px;color:var(--text2)">Riposo / Recupero attivo</div>
        </div>
      </div>`;
    }
    const d = slot.day;
    const tc = TC[d.type] || TC.custom;
    const exCount = (d.exercises||[]).length;
    return `<div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);margin-bottom:6px;overflow:hidden">
      <div style="display:flex;align-items:center;gap:10px;padding:10px 14px">
        <div style="width:36px;height:36px;border-radius:var(--r-sm);background:${tc.bg};color:${tc.c};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${{push:'🔴',pull:'🟢',lower:'🟡',full:'💪',calisthenics:'⚡',cardio:'🔥',custom:'🏋️'}[d.type]||'🏋️'}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:800">${slot.weekday}</div>
          <div style="font-size:11px;color:${tc.c};font-weight:700">${d.name.replace(slot.weekday+' — ','')}</div>
        </div>
        <div style="font-size:11px;color:var(--text2)">${exCount} esercizi</div>
      </div>
      <div style="padding:0 14px 10px;display:flex;gap:6px;flex-wrap:wrap">
        ${(d.exercises||[]).slice(0,4).map(ex=>{
          const exd=EX_DB.find(e=>e.id===ex.id)||{name:ex.name||ex.id};
          return `<span style="font-size:10px;background:var(--bg4);color:var(--text2);padding:3px 8px;border-radius:99px">${exd.name}</span>`;
        }).join('')}
        ${exCount>4?`<span style="font-size:10px;color:var(--text3)">+${exCount-4} altri</span>`:''}
      </div>
    </div>`;
  }).join('');

  wrap.innerHTML = `
    <div style="background:linear-gradient(135deg,rgba(200,245,60,.1),rgba(62,223,138,.06));border:1px solid rgba(200,245,60,.2);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:12px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--acc),var(--green))"></div>
      <div style="font-size:10px;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.1em;margin-bottom:4px">✨ Piano personalizzato generato</div>
      <div style="font-size:16px;font-weight:800">${plan.presetIcon} ${plan.presetName}</div>
      <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">
        <span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:99px;background:var(--acc3);color:var(--acc)">${plan.numDays} giorni/settimana</span>
        <span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:99px;background:var(--bg4);color:var(--text2)">${levelBadge}</span>
        ${isZero?'<span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:99px;background:var(--green-d);color:var(--green)">Progressioni zero-base ✓</span>':''}
      </div>
    </div>
    ${dayCards}
    <div style="font-size:11px;color:var(--text2);text-align:center;padding:8px;line-height:1.6">Puoi modificare questo programma in qualsiasi momento dal Training.</div>`;
}

/* ─────────────────────────────────────────
   OVERRIDE finishOnboard — neutralizzato (logica consolidata sopra)
───────────────────────────────────────── */
var _origFinishOnboardV41 = finishOnboard; // reference kept for safety

/* ─────────────────────────────────────────
   OVERRIDE renderWeeklyProgram — show
   generated plan + cycle adaptation banner
───────────────────────────────────────── */
const _v5OrigRenderWeekly = renderWeeklyProgram;
renderWeeklyProgram = function() {
  // If we have a generated plan, show it
  if (profile.generatedPlan) {
    renderSavedGeneratedPlan();
  } else {
    _v5OrigRenderWeekly();
  }
};

function renderSavedGeneratedPlan() {
  const root = document.getElementById('weekly-program-view');
  if (!root) return;

  const gp = profile.generatedPlan;
  const cycleInfo = getCycleData()?.trackCycle ? getCurrentCyclePhase() : null;

  // Cycle banner at top of training
  const cycleBannerHtml = cycleInfo ? `
    <div style="background:linear-gradient(135deg,rgba(255,92,160,.1),rgba(168,126,248,.07));border:1px solid rgba(255,92,160,.2);border-radius:var(--r-lg);padding:12px 14px;margin-bottom:12px;display:flex;gap:10px;align-items:center">
      <span style="font-size:22px">${cycleInfo.phase.ico}</span>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:800;margin-bottom:2px">${cycleInfo.phase.name} — Giorno ${cycleInfo.dayInCycle}/${cycleInfo.cycleLen}</div>
        <div style="font-size:11px;color:var(--text2)">${cycleInfo.phase.workoutNote}</div>
      </div>
    </div>` : '';

  const dayCards = gp.schedule.map((slot, si) => {
    if (slot.isRest) {
      return `<div style="display:flex;align-items:center;gap:10px;padding:12px 14px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);margin-bottom:8px;opacity:.65">
        <span style="font-size:20px">🛌</span>
        <div><div style="font-size:14px;font-weight:700">${slot.weekday}</div><div style="font-size:11px;color:var(--text2)">Riposo / Recupero attivo</div></div>
      </div>`;
    }

    let day = { ...slot.day };
    let cycleNote = '';
    // Apply cycle adaptation
    if (cycleInfo && getCycleData()?.trackCycle) {
      const adapted = adaptDayForCycle(day);
      cycleNote = adapted._cycleNote || '';
      day = adapted;
    }

    const tc = TC[day.type] || TC.custom;
    const ico = {push:'🔴',pull:'🟢',lower:'🟡',full:'💪',calisthenics:'⚡',cardio:'🔥',custom:'🏋️'}[day.type]||'🏋️';
    const exRows = (day.exercises||[]).map(ex => {
      const exd = EX_DB.find(e => e.id===ex.id) || {name:ex.name||ex.id, icon:'🏋️', tags:[]};
      // Find progression info
      const allProgs = Object.values(PROGRESSIONS).flat();
      const progEx = allProgs.find(p => p.id===ex.id);
      return `<div class="wp-ex-row" onclick="openExDetail('${ex.id}')">
        <div class="wp-ex-ico">${exd.icon||progEx?.icon||'🏋️'}</div>
        <div class="wp-ex-info">
          <div class="wp-ex-nm">${exd.name||progEx?.name||ex.id}</div>
          <div class="wp-ex-sets">${ex.s||'3'} serie · ${ex.r||'10'} reps · riposo ${ex.rs||'75s'}</div>
          ${progEx?.desc?`<div class="wp-ex-sets" style="margin-top:3px;color:var(--text3)">${progEx.desc.slice(0,60)}…</div>`:''}
        </div>
        <span class="wp-ex-muscle" style="background:${tc.bg};color:${tc.c}">${exd.tags?.[0]||day.type}</span>
      </div>`;
    }).join('');

    const isToday = slot.weekday === WEEKDAYS[new Date().getDay() === 0 ? 6 : new Date().getDay()-1];

    return `<div class="wp-day-card" style="${isToday?'border-color:var(--acc);box-shadow:0 0 0 1px var(--acc)':''}">
      <div class="wp-day-head" onclick="toggleWpDay(${si})">
        <div class="wp-day-icon" style="background:${tc.bg};color:${tc.c}">${ico}</div>
        <div style="flex:1">
          <div class="wp-day-nm">${slot.weekday}${isToday?' <span style="font-size:10px;background:var(--acc);color:#080810;padding:2px 7px;border-radius:99px;vertical-align:middle">Oggi</span>':''}</div>
          <div class="wp-day-sub">${day.name.replace(slot.weekday+' — ','').replace(' (adattato — fase mestruale)','').replace(' 💪 (picco ovulatoria)','')}</div>
        </div>
        <button style="padding:8px 14px;background:var(--acc);color:#080810;border:none;border-radius:99px;font-size:11px;font-weight:700;cursor:pointer;flex-shrink:0;font-family:'Syne',sans-serif" onclick="event.stopPropagation();beginWorkout({name:'Piano Settimanale',days:[]},${JSON.stringify(day).replace(/'/g,'&#39;')})">▶ Avvia</button>
      </div>
      <div class="wp-day-body" id="wpd-${si}">
        ${cycleNote?`<div style="padding:8px 14px;background:rgba(255,92,160,.06);font-size:11px;color:#FF5CA0;border-bottom:1px solid rgba(255,92,160,.12)">${cycleNote}</div>`:''}
        ${exRows||'<div class="wp-rest-row">Nessun esercizio.</div>'}
      </div>
    </div>`;
  }).join('');

  // Overview card
  const levelBadge = {zero:'🌿 Zero Base',beginner:'🌱 Principiante',intermediate:'⚡ Intermedio',advanced:'🔥 Avanzato',athlete:'🏆 Atleta'}[gp.level||profile.level]||'';
  root.innerHTML = `
    ${cycleBannerHtml}
    <div class="wp-overview">
      <div class="wp-title">${gp.presetIcon||'💪'} ${gp.presetName||'Il tuo piano'}</div>
      <div class="wp-sub">${gp.numDays} giorni/settimana · <b style="color:var(--acc)">${(profile.goals||[]).map(g=>({hypertrophy:'Ipertrofia',strength:'Forza',fat_loss:'Definizione',endurance:'Resistenza',calisthenics:'Calisthenics',mobility:'Mobilità'}[g]||g)).join(', ')}</b></div>
      <div class="wp-meta">
        <span class="wp-meta-chip">${levelBadge}</span>
        <span class="wp-meta-chip">${gp.numDays} gg attivi</span>
        ${getCycleData()?.trackCycle?'<span class="wp-meta-chip" style="background:rgba(255,92,160,.12);color:#FF5CA0">🔴 Ciclo attivo</span>':''}
      </div>
    </div>
    ${dayCards}
    <button onclick="profile.generatedPlan=null;saveAll();renderWeeklyProgram();" style="width:100%;margin-top:8px;padding:11px;background:transparent;border:1.5px dashed var(--border2);border-radius:var(--r);color:var(--text2);font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer">Usa preset standard invece →</button>`;
}

/* ─────────────────────────────────────────
   OVERRIDE initApp — render cycle banner
───────────────────────────────────────── */
const _v5OrigInit = initApp; // V41: renderCycleBanner merged into consolidated initApp
// initApp v5 override neutralised

/* ─────────────────────────────────────────
   OVERRIDE renderProfilePage — cycle card
───────────────────────────────────────── */
const _v5OrigRenderProfile = renderProfilePage; // V41: renderCycleProfile merged into consolidated renderProfilePage
// renderProfilePage v5 override neutralised

/* ─────────────────────────────────────────
   OVERRIDE renderHome — cycle banner
───────────────────────────────────────── */
const _v5OrigRenderHome = renderHome; // V41: merged into consolidated renderHome
// renderHome override neutralised — V41 consolidates all renderHome patches

/* ─────────────────────────────────────────
   EXERCISE DETAIL — show progression ladder
───────────────────────────────────────── */
const _v5OrigOpenExDetail = openExDetail;
openExDetail = function(id) {
  _v5OrigOpenExDetail(id);
  // Append progression ladder after detail content loads
  setTimeout(() => {
    const content = document.getElementById('ex-detail-content');
    if (!content) return;
    // Find which progression chain this exercise belongs to
    const allChains = Object.entries(PROGRESSIONS);
    const chain = allChains.find(([,arr]) => arr.some(p => p.id === id));
    if (!chain) return;
    const [chainName, steps] = chain;
    const curIdx = steps.findIndex(p => p.id === id);
    const ladderHtml = steps.map((step, i) => {
      const isCur = i === curIdx;
      const isDone = i < curIdx;
      return `<div style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:var(--r-sm);margin-bottom:4px;background:${isCur?'var(--acc4)':isDone?'var(--bg3)':'var(--bg2)'};border:1px solid ${isCur?'var(--acc)':'var(--border)'}">
        <div style="width:24px;height:24px;border-radius:50%;background:${isCur?'var(--acc)':isDone?'var(--green-d)':'var(--bg4)'};color:${isCur?'#080810':isDone?'var(--green)':'var(--text3)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">${isDone?'✓':i+1}</div>
        <div style="flex:1">
          <div style="font-size:13px;font-weight:${isCur?'800':'600'};color:${isCur?'var(--acc)':'var(--text)'}">${step.icon} ${step.name}</div>
          <div style="font-size:11px;color:var(--text2)">${step.minLevel==='zero'?'Zero Base':step.minLevel==='beginner'?'Principiante':step.minLevel==='intermediate'?'Intermedio':step.minLevel==='advanced'?'Avanzato':'Atleta'}</div>
        </div>
        ${isCur?'<span style="font-size:10px;font-weight:700;color:var(--acc);background:var(--acc3);padding:3px 9px;border-radius:99px">Ora</span>':''}
      </div>`;
    }).join('');
    content.innerHTML += `
      <div class="ex-step-card" style="margin-top:14px">
        <div style="font-size:11px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:10px">📈 Progressione completa</div>
        ${ladderHtml}
      </div>`;
  }, 80);
};

/* ══════════════════════════════════════════════════════════════════
   WEEKLY GOAL SYSTEM + PRESET PANEL + PROFILE FIXES
══════════════════════════════════════════════════════════════════ */

// ── Weekly goal helpers ──────────────────────────────────────────

/** Returns ISO week string e.g. "2025-W03" for the given date */
function getISOWeek(date){
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  return `${d.getUTCFullYear()}-W${String(weekNo).padStart(2,'0')}`;
}

/** Count sessions completed in the current ISO week */
function getWeeklyCompleted(){
  const thisWeek = getISOWeek(new Date());
  return sessions.filter(s => {
    if(!s.date) return false;
    return getISOWeek(new Date(s.date)) === thisWeek;
  }).length;
}

/** Status message based on completion ratio */
function weeklyStatusMsg(completed, target){
  const rem = target - completed;
  if(completed === 0)           return `Inizia oggi — obiettivo: ${target} allenamenti questa settimana 💪`;
  if(completed >= target)       return `🎉 Obiettivo raggiunto! ${completed}/${target} allenamenti completati questa settimana.`;
  if(rem === 1)                 return `Ancora 1 allenamento per raggiungere l'obiettivo! Forza 🔥`;
  return `Ottimo! Ancora ${rem} allenamenti per completare la settimana.`;
}

/** Render/update the weekly goal card on the home page */
function renderWeeklyGoalCard(){
  const card = document.getElementById('weekly-goal-card');
  if(!card) return;

  const target    = profile.weeklyWorkoutsTarget || 3;
  const completed = getWeeklyCompleted();
  const pct       = Math.min(100, Math.round((completed / target) * 100));
  const isDone    = completed >= target;

  // Numbers
  document.getElementById('wg-completed').textContent = completed;
  document.getElementById('wg-target').textContent    = target;

  // Progress bar
  const bar = document.getElementById('wg-bar');
  if(bar){
    bar.style.width = pct + '%';
    bar.style.background = isDone
      ? 'linear-gradient(90deg,var(--acc),var(--green))'
      : 'linear-gradient(90deg,var(--acc),var(--acc2))';
  }

  // Dot indicators
  const dotsEl = document.getElementById('wg-dots');
  if(dotsEl){
    dotsEl.innerHTML = Array.from({length: target}, (_,i) => {
      const done  = i < completed;
      const color = done ? 'var(--acc)' : 'var(--bg4)';
      const border= done ? '1px solid var(--acc2)' : '1px solid var(--border2)';
      const shadow= done ? '0 0 6px rgba(200,245,60,.4)' : 'none';
      return `<div style="
        width:28px;height:28px;border-radius:50%;
        background:${color};border:${border};
        box-shadow:${shadow};
        display:flex;align-items:center;justify-content:center;
        font-size:14px;
        transition:all .3s;">
        ${done ? '✓' : ''}
      </div>`;
    }).join('');
  }

  // Status message
  const statusEl = document.getElementById('wg-status');
  if(statusEl) statusEl.textContent = weeklyStatusMsg(completed, target);

  // Label
  const labelEl = document.getElementById('wg-label');
  if(labelEl) labelEl.textContent = isDone
    ? '✅ Settimana completata!'
    : 'allenamenti questa settimana';
}

/** Open the edit sheet with number picker */
function openWeeklyGoalEdit(){
  const target = profile.weeklyWorkoutsTarget || 3;
  const picker = document.getElementById('wg-picker');
  if(picker){
    picker.innerHTML = [1,2,3,4,5,6,7].map(n => `
      <div onclick="selectWeeklyTarget(${n},this)"
        style="
          width:52px;height:52px;border-radius:var(--r-lg);
          background:${n===target?'var(--acc)':'var(--bg3)'};
          color:${n===target?'#080810':'var(--text2)'};
          border:1.5px solid ${n===target?'var(--acc)':'var(--border)'};
          display:flex;align-items:center;justify-content:center;
          font-family:'Bebas Neue',sans-serif;font-size:26px;
          cursor:pointer;transition:all .15s;
          ${n===target?'box-shadow:0 0 12px rgba(200,245,60,.3);':''}
        "
        data-wg-val="${n}">
        ${n}
      </div>`).join('');
  }
  const ovl = document.getElementById('wg-sheet-ovl');
  if(ovl) ovl.style.display = 'flex';
}

let _wgSelected = null;

function selectWeeklyTarget(n, el){
  _wgSelected = n;
  document.querySelectorAll('#wg-picker [data-wg-val]').forEach(d => {
    const active = parseInt(d.dataset.wgVal) === n;
    d.style.background = active ? 'var(--acc)' : 'var(--bg3)';
    d.style.color       = active ? '#080810' : 'var(--text2)';
    d.style.borderColor = active ? 'var(--acc)' : 'var(--border)';
    d.style.boxShadow   = active ? '0 0 12px rgba(200,245,60,.3)' : 'none';
  });
}

async function saveWeeklyGoal(){
  if(_wgSelected === null){
    showToast('⚠️ Seleziona un numero prima di salvare');
    return;
  }
  profile.weeklyWorkoutsTarget = _wgSelected;
  await saveAll();
  closeWeeklyGoalEdit();
  renderWeeklyGoalCard();
  showToast(`✅ Obiettivo: ${_wgSelected} allenamenti/settimana`);
  _wgSelected = null;
}

function closeWeeklyGoalEdit(){
  const ovl = document.getElementById('wg-sheet-ovl');
  if(ovl) ovl.style.display = 'none';
}

// Close sheet tapping overlay
document.addEventListener('click', e => {
  const ovl = document.getElementById('wg-sheet-ovl');
  if(ovl && e.target === ovl) closeWeeklyGoalEdit();
});

// ── Presets panel inside Training page ──────────────────────────

/** Renders quick-start preset cards inside the Allenamento page */
function renderPresetsInTraining(){
  if(typeof PRESETS_DATA==='undefined'||!Array.isArray(PRESETS_DATA)) return;
  const wrap = document.getElementById('training-presets-wrap');
  if(!wrap) return;
  const rec = profile.recPreset
    ? PRESETS_DATA.find(x => x.id === profile.recPreset)
    : null;
  const list = rec
    ? [rec, ...PRESETS_DATA.filter(p => p.id !== rec.id)]
    : PRESETS_DATA;

  wrap.innerHTML = list.slice(0, 4).map(p => {
    const tc = TC[p.t] || TC.custom;
    const activeDays = (p.days||[]).filter(d=>!d.rest);
    const isRec = rec && p.id === rec.id;

    // Day selector options
    const dayOpts = activeDays.map((d, di) => {
      const realIdx = (p.days||[]).indexOf(d);
      return `<option value="${realIdx}">${d.name}</option>`;
    }).join('');

    return `<div style="
        background:${isRec?'linear-gradient(135deg,rgba(200,245,60,.09),rgba(200,245,60,.03))':'var(--bg2)'};
        border:1.5px solid ${isRec?'rgba(200,245,60,.3)':'var(--border)'};
        border-radius:var(--r-lg);padding:14px 16px;margin-bottom:10px;
        position:relative;overflow:hidden;">
      ${isRec?`<div style="position:absolute;top:0;left:0;right:0;height:2px;
        background:linear-gradient(90deg,var(--acc),var(--green))"></div>`:''}

      
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
        <div style="font-size:24px;flex-shrink:0;">${p.icon}</div>
        <div style="flex:1;min-width:0;">
          ${isRec?`<div style="font-size:9px;font-weight:700;color:var(--acc);
            text-transform:uppercase;letter-spacing:.1em;margin-bottom:2px;">🎯 Consigliato per te</div>`:''}
          <div style="font-size:15px;font-weight:800;letter-spacing:-.2px;">${p.name}</div>
          <div style="font-size:11px;color:var(--text2);margin-top:2px;display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
            <span style="font-size:10px;font-weight:700;padding:1px 8px;border-radius:99px;
              background:${tc.bg};color:${tc.c};">${p.t}</span>
            <span>${activeDays.length} giorni/sett.</span>
            <span>${p.dur} min</span>
          </div>
          ${getCycleBadgeHtml()}
        </div>
      </div>

      
      <div style="display:flex;gap:6px;align-items:stretch;">
        <select id="day-sel-${p.id}"
          style="flex:1;background:var(--bg3);border:1px solid var(--border);
            border-radius:var(--r-sm);padding:9px 10px;font-family:'Syne',sans-serif;
            font-size:12px;font-weight:600;color:var(--text);outline:none;cursor:pointer;
            transition:border-color .15s;"
          onfocus="this.style.borderColor='var(--acc)'"
          onblur="this.style.borderColor='var(--border)'">
          ${dayOpts}
        </select>
        <button onclick="(function(){
            const sel=document.getElementById('day-sel-${p.id}');
            const dayIdx=sel?parseInt(sel.value):0;
            startPresetDay('${p.id}', dayIdx);
          })()"
          style="padding:9px 16px;background:${isRec?'var(--acc)':'var(--bg3)'};
            color:${isRec?'#080810':'var(--acc)'};
            border:1.5px solid ${isRec?'var(--acc)':'rgba(200,245,60,.3)'};
            border-radius:var(--r-sm);font-family:'Syne',sans-serif;
            font-size:13px;font-weight:800;cursor:pointer;
            white-space:nowrap;transition:all .15s;flex-shrink:0;"
          onmouseover="this.style.opacity='.85'"
          onmouseout="this.style.opacity='1'">
          ▶ Avvia
        </button>
        <button onclick="switchAlTab('esplora',null);setTimeout(()=>{
            const idx=Array.from(PRESETS_DATA).findIndex(x=>x.id==='${p.id}');
            if(idx>=0) toggleEpCard(idx);
            const el=document.getElementById('epb-${p.id}');
            if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
          },200)"
          style="padding:9px 12px;background:var(--bg3);
            border:1px solid var(--border2);border-radius:var(--r-sm);
            font-family:'Syne',sans-serif;font-size:12px;font-weight:700;
            color:var(--text2);cursor:pointer;white-space:nowrap;
            transition:all .15s;flex-shrink:0;"
          onmouseover="this.style.borderColor='var(--border3)';this.style.color='var(--text)'"
          onmouseout="this.style.borderColor='var(--border2)';this.style.color='var(--text2)'">
          Dettagli
        </button>
      </div>
    </div>`;
  }).join('') + `
    <button onclick="switchAlTab('esplora',null)"
      style="width:100%;padding:11px;background:transparent;
        border:1.5px dashed var(--border2);border-radius:var(--r-lg);
        color:var(--text2);font-family:'Syne',sans-serif;
        font-size:12px;font-weight:700;cursor:pointer;margin-bottom:16px;
        transition:all .15s;"
      onmouseover="this.style.borderColor='var(--acc)';this.style.color='var(--acc)'"
      onmouseout="this.style.borderColor='var(--border2)';this.style.color='var(--text2)'">
      Esplora tutti i programmi →
    </button>`;
}

// ── Profile page fixes ───────────────────────────────────────────

/** Enhanced renderProfilePage that ensures all fields render correctly */
/** Export full data as JSON */
function exportData(){
  const data = {
    profile, sessions, nutrition, metrics, pbs,
    exportedAt: new Date().toISOString(),
    version: 'FitTrack-V7'
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = `fittrack_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('📤 Backup esportato!');
}

/** Import data from JSON file */
function importData(){
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = async e => {
    try {
      const text = await e.target.files[0].text();
      const data = JSON.parse(text);
      if(!data.profile) { showToast('❌ File non valido'); return; }
      if(!confirm('Sovrascrivere tutti i dati attuali con il backup?\nQuesta azione non può essere annullata.')) return;
      if(data.profile)   profile   = data.profile;
      if(data.sessions)  sessions  = data.sessions;
      if(data.nutrition) nutrition = data.nutrition;
      if(data.metrics)   metrics   = data.metrics;
      if(data.pbs)       pbs       = data.pbs;
      await saveAll();
      showToast('✅ Dati importati!');
      setTimeout(() => location.reload(), 800);
    } catch(err) { showToast('❌ Errore: ' + err.message); }
  };
  input.click();
}

// ── V41: weeklyGoal finishWorkout merged into consolidated finishWorkout ──
const _wgOrigFinish = finishWorkout; // reference kept, override neutralised
// finishWorkout weeklyGoal override neutralised

// ── V41: weeklyGoal/presets merged into consolidated initApp ──
const _wgOrigInitApp = typeof initApp === 'function' ? initApp : null;
// initApp weeklyGoal override neutralised

/* ── End Weekly Goal System ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#ob6-female-content .ob-card').forEach(card => {
    card.addEventListener('click', function() {
      const val = this.querySelector('.ob-card-nm').textContent.includes('Sì') ? 'yes' : 'no';
      obSel.cycle = val;
      document.getElementById('ob-cycle-fields').style.display = val === 'yes' ? '' : 'none';
      this.closest('.ob-grid').querySelectorAll('.ob-card').forEach(c => c.classList.remove('sel'));
      this.classList.add('sel');
    });
  });
});

/* ══════════════════════════════════════════════════════════════════
   FITNESS LOGIC MODULE — FitTrack AI V6
   Autore: modulo non-invasivo aggiunto dopo boot()
   Regole rispettate:
     • NESSUNA modifica all'UI esistente
     • NESSUNA modifica alla struttura dati esistente
     • NESSUNA rottura di funzioni esistenti
     • Solo aggiunta di logica compatibile
══════════════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────────────────────────────
   SEZIONE 1 — PROGRESSIONE AUTOMATICA
   Struttura dati: exerciseLog = {
     [exId]: {
       history: [ { date, reps, weight, targetReps } ],
       currentWeight: number,    // kg aggiuntivi o 0
       currentReps:   number,    // reps effettive ultima sessione
     }
   }
   Salvato in IndexedDB / localStorage con chiave "exerciseLog"
───────────────────────────────────────────────────────────────── */

let exerciseLog = {}; // caricato al boot

/** Carica exerciseLog dal DB */
async function loadExerciseLog() {
  const saved = await dbGet('exerciseLog');
  if (saved) exerciseLog = saved;
}

/** Salva exerciseLog nel DB */
async function saveExerciseLog() {
  await dbSet('exerciseLog', exerciseLog);
}

/**
 * Ottieni il peso suggerito per un esercizio basandosi sullo storico.
 * Ritorna 0 se non esiste storico (bodyweight) o il peso progressivo calcolato.
 * @param {string} exId
 * @param {number} targetReps  — reps target del programma
 * @returns {number}
 */
function getProgressiveWeight(exId, targetReps) {
  const log = exerciseLog[exId];
  if (!log || !log.history || log.history.length === 0) return 0;

  const last = log.history[log.history.length - 1];
  const lastWeight = last.weight || 0;
  const lastReps   = last.reps   || 0;
  const lastTarget = last.targetReps || targetReps || 10;

  // Ha raggiunto o superato il target → aumenta peso del 2.5–5%
  if (lastReps >= lastTarget) {
    const increment = lastWeight > 0
      ? Math.max(0.5, Math.round(lastWeight * 0.025 * 2) / 2) // 2.5%, arrotondato a 0.5 kg
      : 0; // bodyweight → rimane 0 (progressione gestita dalle reps)
    const newWeight = Math.round((lastWeight + increment) * 10) / 10;
    return newWeight;
  }

  // Non ha raggiunto il target → mantieni peso attuale
  // Se era ben sotto (< 60% del target) riduci leggermente
  if (lastWeight > 0 && lastReps < lastTarget * 0.6) {
    const reduced = Math.max(0, Math.round((lastWeight * 0.95) * 10) / 10);
    return reduced;
  }

  return lastWeight;
}

/**
 * Registra il completamento di un set/esercizio al termine della sessione.
 * Chiamato da saveWorkoutToLog() dopo finishWorkout().
 * @param {string} exId
 * @param {number} repsCompleted
 * @param {number} weightUsed
 * @param {number} targetReps
 */
function recordExercisePerformance(exId, repsCompleted, weightUsed, targetReps) {
  if (!exerciseLog[exId]) {
    exerciseLog[exId] = { history: [], currentWeight: 0, currentReps: 0 };
  }
  exerciseLog[exId].history.push({
    date:        today(),
    reps:        repsCompleted,
    weight:      weightUsed,
    targetReps:  targetReps,
  });
  // Mantieni storico ultimi 30 record per esercizio (evita bloat)
  if (exerciseLog[exId].history.length > 30) {
    exerciseLog[exId].history = exerciseLog[exId].history.slice(-30);
  }
  exerciseLog[exId].currentWeight = weightUsed;
  exerciseLog[exId].currentReps   = repsCompleted;
}

/**
 * Salva i dati degli esercizi dopo la fine di una sessione.
 * Viene chiamato dall'override di finishWorkout.
 * Usa woSets (set completati) e woDayData (esercizi programmati).
 */
async function saveWorkoutToLog() {
  const exs = Array.isArray(woDayData?.exercises) ? woDayData.exercises : [];
  exs.forEach((ex, ei) => {
    const sets = safeSets(ex.s);
    const targetReps = safeReps(ex.r);
    // Conta quante serie sono state completate
    let completedSets = 0;
    for (let si = 0; si < sets; si++) {
      if (woSets[`${ei}_${si}`]) completedSets++;
    }
    if (completedSets === 0) return; // Esercizio non toccato → ignora

    // Reps effettive stimate: se ha completato tutte le serie → reps target
    // se ne ha saltate → proporzionale
    const completionRatio = completedSets / sets;
    const estimatedReps   = Math.round(targetReps * completionRatio);

    // Peso: cerca il peso specificato nel programma (formato "X kg" o numero)
    const weightMatch = String(ex.r || '').match(/(\d+(?:\.\d+)?)\s*kg/i);
    const currentWeight = weightMatch
      ? parseFloat(weightMatch[1])
      : (exerciseLog[ex.id]?.currentWeight || 0);

    recordExercisePerformance(ex.id, estimatedReps, currentWeight, targetReps);
  });
  await saveExerciseLog();
}

/* ─────────────────────────────────────────────────────────────────
   SEZIONE 2 — PUNTEGGIO PROGRAMMA (0–100)
───────────────────────────────────────────────────────────────── */

/**
 * Mappa tag/muscle → categoria principale
 */
const MUSCLE_CATEGORY = {
  // Petto
  'petto':'chest','petto alto':'chest','petto basso':'chest',
  // Schiena
  'dorsali':'back','schiena':'back','trapezi':'back','romboidi':'back',
  'lat machine':'back','rematore':'back',
  // Gambe
  'quadricipiti':'legs','glutei':'legs','femorali':'legs',
  'polpacci':'legs','esplosività':'legs',
  // Spalle
  'spalle':'shoulders',
  // Braccia
  'bicipiti':'arms','tricipiti':'arms','avambraccio':'arms',
  // Core
  'addominali':'core','obliqui':'core','hip flexor':'core',
  // Cardio
  'full body':'cardio',
};

/** Muscle category dall'id esercizio via EX_DB */
function getExerciseMuscleCategories(exId) {
  const ex = EX_DB.find(e => e.id === exId);
  if (!ex) return new Set();
  const cats = new Set();
  (ex.tags || []).forEach(tag => {
    const cat = MUSCLE_CATEGORY[tag.toLowerCase()];
    if (cat) cats.add(cat);
  });
  // Inferisci dalla categoria m
  if (ex.m === 'push') { cats.add('chest'); cats.add('shoulders'); }
  if (ex.m === 'pull') cats.add('back');
  if (ex.m === 'lower') cats.add('legs');
  if (ex.m === 'core') cats.add('core');
  if (ex.m === 'cardio') cats.add('cardio');
  return cats;
}

/**
 * calculateProgramScore(program)
 * program = { days: [ { exercises: [{id, s, r}], rest } ] }
 * Ritorna punteggio 0–100 e breakdown dettagliato.
 */
function calculateProgramScore(program) {
  const days  = (program.days || []).filter(d => !d.rest);
  const score = { total: 0, breakdown: {} };

  if (days.length === 0) {
    return score;
  }

  // Aggrega tutti gli esercizi con conteggio serie e muscoli
  const muscleVolume  = {}; // cat → serie totali
  const muscleFreq    = {}; // cat → giorni che la allenano
  let   totalSets     = 0;
  let   totalExercises= 0;

  (days||[]).forEach(day => {
    const dayCats = new Set();
    (day.exercises || []).forEach(ex => {
      const sets = safeSets(ex.s);
      totalSets += sets;
      totalExercises++;
      const cats = getExerciseMuscleCategories(ex.id);
      (cats||[]).forEach(cat => {
        muscleVolume[cat] = (muscleVolume[cat] || 0) + sets;
        dayCats.add(cat);
      });
    });
    (dayCats||[]).forEach(cat => {
      muscleFreq[cat] = (muscleFreq[cat] || 0) + 1;
    });
  });

  // ── Criterio 1: muscoli presenti (+40) ──
  const KEY_MUSCLES = ['chest','back','legs','shoulders','arms'];
  const presentMuscles = KEY_MUSCLES.filter(m => (muscleVolume[m] || 0) > 0);
  const muscleScore = Math.round((presentMuscles.length / KEY_MUSCLES.length) * 40);
  score.breakdown.muscles = { score: muscleScore, present: presentMuscles };
  score.total += muscleScore;

  // ── Criterio 2: equilibrio petto vs schiena (+20) ──
  const chestVol = muscleVolume['chest'] || 0;
  const backVol  = muscleVolume['back']  || 0;
  let balanceScore = 0;
  if (chestVol > 0 && backVol > 0) {
    const ratio = Math.min(chestVol, backVol) / Math.max(chestVol, backVol);
    balanceScore = Math.round(ratio * 20);
  } else if (chestVol === 0 && backVol === 0) {
    balanceScore = 20; // nessuno dei due → no penalità
  }
  score.breakdown.balance = { score: balanceScore, chest: chestVol, back: backVol };
  score.total += balanceScore;

  // ── Criterio 3: volume totale (+20) ──
  // Benchmark: ~18 serie/sessione × giorni è buono. Soglia minima 3 serie/esercizio.
  const avgSetsPerSession = days.length > 0 ? totalSets / days.length : 0;
  let volumeScore = 0;
  if (avgSetsPerSession >= 18)      volumeScore = 20;
  else if (avgSetsPerSession >= 12) volumeScore = 15;
  else if (avgSetsPerSession >= 8)  volumeScore = 10;
  else if (avgSetsPerSession >= 4)  volumeScore = 5;
  score.breakdown.volume = { score: volumeScore, avgSetsPerSession: Math.round(avgSetsPerSession) };
  score.total += volumeScore;

  // ── Criterio 4: frequenza muscolare ≥ 2×/settimana (+20) ──
  const mainMuscles      = ['chest','back','legs'];
  const trainedFreqOk    = mainMuscles.filter(m => (muscleFreq[m] || 0) >= 2);
  const freqScore        = Math.round((trainedFreqOk.length / mainMuscles.length) * 20);
  score.breakdown.frequency = { score: freqScore, musclesHit2x: trainedFreqOk };
  score.total += freqScore;

  // ── Penalità squilibri ──
  const penalties = [];
  if (chestVol > 0 && backVol === 0) { score.total -= 10; penalties.push('Nessuna schiena (-10)'); }
  if (chestVol > backVol * 2)        { score.total -= 5;  penalties.push('Petto >> Schiena (-5)'); }
  if ((muscleVolume['legs'] || 0) === 0 && days.length >= 2) { score.total -= 10; penalties.push('Nessuna gamba (-10)'); }
  score.breakdown.penalties = penalties;
  score.total = Math.max(0, Math.min(100, score.total));


  return score;
}

/* ─────────────────────────────────────────────────────────────────
   SEZIONE 3 — SUGGERIMENTI AUTOMATICI
───────────────────────────────────────────────────────────────── */

/**
 * analyzeAndSuggest(program)
 * Stampa suggerimenti precisi su console basandosi sull'analisi.
 * Non tocca la UI.
 */
function analyzeAndSuggest(program) {
  const score     = calculateProgramScore(program);
  const bd        = score.breakdown;
  const suggestions = [];

  // Muscoli mancanti
  if (!(bd.muscles?.present || []).includes('back')) {
    suggestions.push('📌 Aggiungi esercizi per la schiena (es. Australian Row, Pull-up, Rematore bilanciere, Lat Machine)');
  }
  if (!(bd.muscles?.present || []).includes('legs')) {
    suggestions.push('📌 Aggiungi esercizi per le gambe (es. Squat, Bulgarian Split Squat, Leg Press, Pistol Squat)');
  }
  if (!(bd.muscles?.present || []).includes('shoulders')) {
    suggestions.push('📌 Aggiungi esercizi per le spalle (es. Overhead Press, Lateral Raises, Face Pull)');
  }
  if (!(bd.muscles?.present || []).includes('arms')) {
    suggestions.push('📌 Aggiungi esercizi per le braccia (es. Curl, Hammer Curl, Dips, Tricep Extension)');
  }

  // Squilibrio petto/schiena
  const chestVol = bd.balance?.chest || 0;
  const backVol  = bd.balance?.back  || 0;
  if (chestVol > backVol * 1.5 && backVol > 0) {
    suggestions.push(`⚖️ Petto (${chestVol} serie) molto superiore alla schiena (${backVol} serie) → Aumenta il volume della schiena per prevenire postura curva`);
  }
  if (backVol > chestVol * 1.5 && chestVol > 0) {
    suggestions.push(`⚖️ Schiena (${backVol} serie) molto superiore al petto (${chestVol} serie) → Aggiungi serie di panca o dips`);
  }

  // Volume basso
  const avg = bd.volume?.avgSetsPerSession || 0;
  if (avg < 8) {
    suggestions.push(`📊 Volume molto basso (${avg} serie/sessione) → Mira a 12–20 serie per sessione per stimolo ottimale`);
  } else if (avg < 12) {
    suggestions.push(`📊 Volume basso (${avg} serie/sessione) → Aggiungi 2–4 serie per sessione per migliorare i risultati`);
  } else if (avg > 28) {
    suggestions.push(`⚠️ Volume elevato (${avg} serie/sessione) → Potresti andare in overtraining; considera di ridurre o aggiungere un giorno di riposo`);
  }

  // Frequenza muscolare
  const freq2x = bd.frequency?.musclesHit2x || [];
  if (!freq2x.includes('legs') && (bd.muscles?.present || []).includes('legs')) {
    suggestions.push('🔁 Le gambe vengono allenate solo 1×/settimana → Aggiungi una seconda sessione lower per crescita ottimale');
  }
  if (!freq2x.includes('back') && (bd.muscles?.present || []).includes('back')) {
    suggestions.push('🔁 La schiena viene allenata solo 1×/settimana → Aggiungi una seconda sessione pull o back accessory');
  }

  // Penalità
  (bd.penalties || []).forEach(p => {
    suggestions.push(`❗ ${p}`);
  });

  // Output
  if (suggestions.length === 0) {
    } else {
      }

  return { score, suggestions };
}

/* ─────────────────────────────────────────────────────────────────
   SEZIONE 4 — INTEGRAZIONE (hook non-invasivi)
───────────────────────────────────────────────────────────────── */

/* V41: saveWorkoutToLog + analyzeAndSuggest merged into consolidated finishWorkout */
const _v6OrigFinishWorkout = finishWorkout; // reference kept, override neutralised
// finishWorkout v6 override neutralised

/**
 * Patch di saveProgram (builder):
 * Dopo il salvataggio analizza il programma appena creato/modificato.
 */
const _v6OrigSaveProgram = typeof saveProgram === 'function' ? saveProgram : null;
if (_v6OrigSaveProgram) {
  saveProgram = async function() {
    await _v6OrigSaveProgram.apply(this, arguments);
    try {
      if (editProg) {
                analyzeAndSuggest(editProg);
      }
    } catch(e) {}
  };
}

/**
 * Patch di startPreset:
 * Quando si carica un preset analizza subito il suo equilibrio.
 */
const _v6OrigStartPreset = typeof startPreset === 'function' ? startPreset : null;
if (_v6OrigStartPreset) {
  startPreset = function(preset) {
    try {
      analyzeAndSuggest(preset);
    } catch(e) {}
    return _v6OrigStartPreset.apply(this, arguments);
  };
}

/* V41: progressive weight badge merged into consolidated renderWoExs */
const _v6OrigRenderWoExs = renderWoExs; // reference kept, override neutralised
// renderWoExs v6 override neutralised

/**
 * Boot aggiuntivo: carica exerciseLog al boot.
 */
(async () => {
  // Attendi che il db sia inizializzato (boot() è già stato chiamato prima)
  // Usiamo un piccolo delay per essere sicuri
  const waitForDB = () => new Promise(res => {
    const check = () => (typeof db !== 'undefined') ? res() : setTimeout(check, 50);
    check();
  });
  await waitForDB();
  await loadExerciseLog();
  
  // Analisi iniziale del programma attivo (se esiste)
  const activeProg = (typeof profile !== 'undefined' && profile.generatedPlan)
    || (typeof editProg !== 'undefined' && editProg)
    || null;
  if (activeProg) {
      analyzeAndSuggest(activeProg);
  }
})();

/* ── Fine Fitness Logic Module V6 ── */

/* ══════════════════════════════════════════════════════════
   FitTrack AI  V7  — Miglioramenti UX
   1. Post-workout summary ricco (statistiche + confronto)
   2. Sistema notifiche funzionante
   3. Grafico progressione per esercizio
   4. Badge peso suggerito con spiegazione contestuale
   5. Aggiornamento peso con ricalcolo TDEE inline
══════════════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   1. POST-WORKOUT SUMMARY
───────────────────────────────────────── */
function showPwSummary(dur, exs, vol, sessionRecord) {
  const modal = document.getElementById('pw-summary-modal');
  if (!modal) return;

  // Calcola kcal stimate con formula MET corretta
  // MET × peso_kg × ore = kcal
  const weight = parseFloat(profile.physique?.weight) || 75;
  // Stima MET in base al tipo di sessione e intensità
  const _exCount = exs || 0;
  const _vol = vol || 0;
  // Intensità approssimativa: più esercizi/serie → più intenso
  const _setsPerEx = _exCount > 0 ? (_vol / _exCount) : 3;
  // Tipo di sessione dal nome del giorno (se disponibile)
  const _dayName = (sessionRecord?.dayName || '').toLowerCase();
  let _MET = 5.5; // default: resistance training
  if(_dayName.includes('cardio') || _dayName.includes('hiit') || _dayName.includes('tabata')) _MET = 9.0;
  else if(_dayName.includes('forza') || _dayName.includes('pesant') || _dayName.includes('strength')) _MET = 6.0;
  else if(_dayName.includes('skill') || _dayName.includes('mobil')) _MET = 4.0;
  else if(_dayName.includes('lower') || _dayName.includes('gambe') || _dayName.includes('legs')) _MET = 6.5;
  else if(_setsPerEx >= 5) _MET = 6.5;
  // Kcal = MET × peso(kg) × durata(ore)
  const kcalEst = Math.round(_MET * weight * (dur / 60));

  // Trova sessione precedente dello stesso tipo
  const prev = [...sessions].reverse().find(
    s => s.dayName === sessionRecord.dayName && s.date !== sessionRecord.date
  );

  // Headline motivazionale basata su performance
  const pct = sessionRecord.totalSets > 0
    ? Math.round(sessionRecord.doneSets / sessionRecord.totalSets * 100) : 100;
  let trophy = '🏆', headline = 'OTTIMO LAVORO!', subline = '';
  if (pct === 100) { trophy = '🏆'; headline = 'SESSIONE PERFETTA!'; subline = 'Tutte le serie completate — sei inarrestabile!'; }
  else if (pct >= 75) { trophy = '💪'; headline = 'GRANDE SESSIONE!'; subline = `${pct}% delle serie completate — continua così!`; }
  else if (pct >= 50) { trophy = '✊'; headline = 'ALLENAMENTO FATTO!'; subline = `${pct}% delle serie — meglio di non farlo!`; }
  else { trophy = '🎯'; headline = 'INIZIO!'; subline = 'Ogni sessione conta — sei sulla strada giusta.'; }

  document.getElementById('pws-trophy').textContent = trophy;
  document.getElementById('pws-headline').textContent = headline;
  document.getElementById('pws-subline').textContent = subline || woDayData.name;
  document.getElementById('pws-dur').textContent = dur || '<1';
  document.getElementById('pws-exs').textContent = exs.length;
  document.getElementById('pws-vol').textContent = vol;
  // Aggiorna label volume per essere più leggibile
  const volLabelEl = document.querySelector('#pws-stats-grid div:last-child div:last-child');
  if(volLabelEl) volLabelEl.textContent = 'Serie × Reps';
  document.getElementById('pws-kcal').textContent = kcalEst + ' kcal';

  // Confronto con sessione precedente
  const cmpEl = document.getElementById('pws-compare');
  if (prev) {
    cmpEl.style.display = 'block';
    const durDiff = dur - prev.duration;
    const volDiff = vol - (prev.volume || 0);
    document.getElementById('pws-compare-grid').innerHTML = [
      { lbl: 'Durata', cur: dur + ' min', diff: durDiff, unit: 'min' },
      { lbl: 'Volume', cur: vol + ' rep', diff: volDiff, unit: 'rep' },
    ].map(({lbl, cur, diff, unit}) => {
      const col = diff > 0 ? 'var(--green)' : diff < 0 ? 'var(--red)' : 'var(--text2)';
      const sign = diff > 0 ? '+' : '';
      return `<div style="background:var(--bg4);border-radius:var(--r-sm);padding:10px;text-align:center;">
        <div style="font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-bottom:4px;">${lbl}</div>
        <div style="font-size:16px;font-weight:800;">${cur}</div>
        <div style="font-size:12px;font-weight:700;color:${col};margin-top:2px;">${sign}${diff} ${unit}</div>
      </div>`;
    }).join('');
  } else {
    cmpEl.style.display = 'none';
  }

  // Sets list with weights
  document.getElementById('pws-sets-list').innerHTML = exs.map((ex, ei) => {
    const exD = EX_DB.find(e => e.id === ex.id) || {name: ex.name || ex.id};
    const sets = safeSets(ex.s);
    const done = Array.from({length: sets}, (_, si) => !!(woSets[ei+'_'+si] || sessionRecord.woSetsSnap?.[ei+'_'+si]));
    const doneCount = done.filter(Boolean).length;
    // Raccoglie i kg usati
    const weights = Array.from({length: sets}, (_, si) => woWeights['wo_w_'+ei+'_'+si]).filter(Boolean);
    const maxW = weights.length ? Math.max(...weights.map(Number).filter(n=>!isNaN(n))) : null;
    return `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">
      <div style="font-size:16px;flex-shrink:0;">${doneCount === sets ? '✅' : doneCount > 0 ? '⚡' : '○'}</div>
      <div style="flex:1;font-size:13px;font-weight:700;">${exD.name}</div>
      ${maxW ? `<div style="font-size:11px;font-weight:700;color:var(--blue);background:var(--bg4);border-radius:99px;padding:2px 8px;">${maxW}kg</div>` : ''}
      <div style="font-size:12px;color:${doneCount===sets?'var(--acc)':'var(--text2)'};">${doneCount}/${sets} serie</div>
    </div>`;
  }).join('');

  // Streak badge
  const streak = calcStreak();
  const streakEl = document.getElementById('pws-streak-badge');
  if (streak >= 2) {
    streakEl.style.display = 'block';
    document.getElementById('pws-streak-text').textContent = `🔥 Streak: ${streak} giorni consecutivi!`;
  } else {
    streakEl.style.display = 'none';
  }

  modal.style.display = 'flex';

  // Aggiorna calorie in nutrizione se tracciata
  try {
    const tod = today();
    if (!nutrition[tod]) nutrition[tod] = {};
    nutrition[tod].kcalBurned = (nutrition[tod].kcalBurned || 0) + kcalEst;
    saveAll();
  } catch(e) {}

  // Cycle modal after summary close is triggered by closePwSummary
}

function closePwSummary() {
  const modal = document.getElementById('pw-summary-modal');
  if (modal) modal.style.display = 'none';
  // Then cycle modal if applicable
  setTimeout(() => showPwCycleModal(woDayData?.name || ''), 300);
}

/* ─────────────────────────────────────────
   2. SISTEMA NOTIFICHE
───────────────────────────────────────── */
let _notifications = [];

function loadNotifications() {
  try { _notifications = JSON.parse(localStorage.getItem('ft_notifs') || '[]'); } catch(e) { _notifications = []; }
}

function saveNotifications() {
  try { localStorage.setItem('ft_notifs', JSON.stringify(_notifications.slice(-50))); } catch(e) {}
}

function addNotification(title, body, type = 'info') {
  _notifications.unshift({ id: Date.now(), title, body, type, read: false, ts: new Date().toISOString() });
  saveNotifications();
  updateNotifBadge();
}

function updateNotifBadge() {
  const badge = document.getElementById('notif-badge');
  if (!badge) return;
  const unread = _notifications.filter(n => !n.read).length;
  if (unread > 0) {
    badge.style.display = 'inline-block';
    badge.textContent = unread > 9 ? '9+' : unread;
  } else {
    badge.style.display = 'none';
  }
}

function openNotifPanel() {
  loadNotifications();
  renderNotifList();
  document.getElementById('notif-panel').style.display = 'block';
  // Mark all as read
  (Array.isArray(_notifications)?_notifications:[]).forEach(n => n.read = true);
  saveNotifications();
  setTimeout(updateNotifBadge, 200);
}

function closeNotifPanel() {
  document.getElementById('notif-panel').style.display = 'none';
}

function clearAllNotifications() {
  _notifications = [];
  saveNotifications();
  renderNotifList();
  updateNotifBadge();
}

function renderNotifList() {
  const el = document.getElementById('notif-list');
  if (!el) return;
  if (!_notifications.length) {
    el.innerHTML = `<div style="text-align:center;padding:48px 20px;">
      <div style="font-size:40px;margin-bottom:12px;">🔔</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:6px;">Nessuna notifica</div>
      <div style="font-size:12px;color:var(--text2);line-height:1.6;">Le notifiche di allenamento e obiettivi appariranno qui.</div>
    </div>`;
    return;
  }
  const ICONS = { workout:'🏋️', info:'💡', goal:'🎯', weight:'⚖️', streak:'🔥', nutrition:'🥗' };
  el.innerHTML = _notifications.map(n => {
    const ico = ICONS[n.type] || '🔔';
    const time = n.ts ? new Date(n.ts).toLocaleString('it-IT',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}) : '';
    return `<div style="display:flex;gap:12px;padding:14px 0;border-bottom:1px solid var(--border);">
      <div style="font-size:22px;flex-shrink:0;margin-top:2px;">${ico}</div>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:700;margin-bottom:3px;">${n.title}</div>
        <div style="font-size:12px;color:var(--text2);line-height:1.5;margin-bottom:4px;">${n.body}</div>
        <div style="font-size:10px;color:var(--text3);">${time}</div>
      </div>
    </div>`;
  }).join('');
}

// Close panel clicking outside
document.getElementById('notif-panel').addEventListener('click', e => {
  if (e.target === document.getElementById('notif-panel')) closeNotifPanel();
});

// Boot: load and badge
loadNotifications();
updateNotifBadge();

// Hook weight update to add notification
const _v7origUpdateWeight = updateWeight;
updateWeight = function(newWeight) {
  const prev = profile.physique?.weight;
  _v7origUpdateWeight.apply(this, arguments);
  if (prev && Math.abs(newWeight - prev) >= 0.1) {
    const diff = (newWeight - prev).toFixed(1);
    const sign = diff > 0 ? '+' : '';
    addNotification('⚖️ Peso aggiornato', `${newWeight} kg (${sign}${diff} kg rispetto a prima)`, 'weight');
    // Ricalcola TDEE e aggiorna kcalTarget
    const p = profile.physique || {};
    if (p.height && p.age) {
      const sex = p.sex || 'm';
      const age = p.age;
      const h = p.height;
      let bmr = sex==='m' ? 10*newWeight+6.25*h-5*age+5 : 10*newWeight+6.25*h-5*age-161;
      if (age < 20) bmr *= 1.06;
      const act = p.activity || 1.55;
      const newTdee = Math.round(bmr * act);
      const g = _ensureGoals();
      const gt = g.goalType || 'maintain';
      let newKcal = newTdee;
      if (gt === 'cut') newKcal = Math.round(newTdee * 0.82);
      else if (gt === 'bulk') newKcal = Math.round(newTdee * 1.12);
      newKcal = Math.max(1200, newKcal);
      profile.kcalTarget = newKcal;
      updateGoals({ calories: newKcal });
      addNotification('🔥 TDEE ricalcolato', `Nuovo target: ${newKcal} kcal/giorno (basato su ${newWeight} kg)`, 'info');
      renderHome();
    }
  }
};

/* ─────────────────────────────────────────
   3. GRAFICO PROGRESSIONE ESERCIZIO
───────────────────────────────────────── */
function openExProgression(exId) {
  const ex = EX_DB.find(e => e.id === exId);
  const exName = ex ? ex.name : exId;
  document.getElementById('ex-prog-title').textContent = exName;
  const content = document.getElementById('ex-prog-content');

  // ── Raccoglie storico da exerciseLog + ft_ex_weights + sessions ──
  function buildFullHistory() {
    const entries = [];
    // 1. exerciseLog history (set per set da allenamenti)
    if (typeof exerciseLog !== 'undefined' && exerciseLog[exId] && exerciseLog[exId].history) {
      exerciseLog[exId].history.forEach(r => {
        entries.push({ date: r.date||'', kg: parseFloat(r.weight)||0, reps: parseInt(r.reps)||0, sets: parseInt(r.sets)||1, src:'log' });
      });
    }
    // 2. ft_ex_weights (auto-save da finishWorkout)
    try {
      const db = JSON.parse(localStorage.getItem('ft_ex_weights')||'{}');
      (db[exId]||[]).forEach(r => {
        if (!entries.find(e => e.date === r.date))
          entries.push({ date: r.date||'', kg: parseFloat(r.kg)||0, reps: 0, sets: 0, src:'weights' });
      });
    } catch(e) {}
    // 3. sessions array — cerca esercizio per id
    if (typeof sessions !== 'undefined' && Array.isArray(sessions)) {
      sessions.forEach(sess => {
        (sess.exercises||[]).forEach(ex2 => {
          if (ex2.id === exId && !entries.find(e => e.date === sess.date && e.src === 'session')) {
            entries.push({
              date: sess.date||'',
              kg: parseFloat(ex2.kg||ex2.weight)||0,
              reps: parseInt(ex2.reps||ex2.r)||0,
              sets: parseInt(ex2.sets||ex2.s)||0,
              src: 'session'
            });
          }
        });
      });
    }
    // 4. Manuale da localStorage
    try {
      const manual = JSON.parse(localStorage.getItem('ft_manual_log_'+exId)||'[]');
      manual.forEach(r => entries.push({ ...r, src:'manual' }));
    } catch(e) {}
    // Sort by date desc
    return entries.sort((a,b) => b.date.localeCompare(a.date));
  }

  function renderProgContent() {
    const history = buildFullHistory();

    // Build chart data from sorted asc
    const chartData = [...history].reverse().slice(-20);
    const weights = chartData.map(r => r.kg);
    const maxW = Math.max(...weights, 1);
    const minW = Math.min(...weights.filter(w=>w>0), 0);
    const W = 300, H = 80;
    const pts = chartData.map((r,i) => {
      const x = chartData.length===1 ? W/2 : Math.round(i/(chartData.length-1)*(W-20))+10;
      const y = r.kg>0 ? Math.round(H-((r.kg-minW)/(maxW-minW||1))*(H-10)-5) : H-5;
      return { x, y, kg: r.kg, reps: r.reps, date: (r.date||'').slice(5) };
    });
    const lineD = pts.map((p,i)=>(i===0?`M${p.x},${p.y}`:`L${p.x},${p.y}`)).join(' ');
    const areaD = pts.length > 1 ? lineD+` L${pts[pts.length-1].x},${H} L${pts[0].x},${H} Z` : '';
    const dates = chartData.map(r=>(r.date||'').slice(5));

    const prW = history.length ? Math.max(...history.map(r=>r.kg)) : 0;
    const prReps = history.length ? Math.max(...history.map(r=>r.reps)) : 0;
    const firstKg = [...history].reverse().find(r=>r.kg>0)?.kg || 0;
    const lastKg = history.find(r=>r.kg>0)?.kg || 0;
    const deltaKg = lastKg - firstKg;

    content.innerHTML = `
    <div style="padding:0 0 80px;">

      
      <div style="margin:0 16px 16px;background:var(--bg2);border:1.5px solid rgba(200,245,60,.25);border-radius:var(--r-lg);padding:16px;">
        <div style="font-size:12px;font-weight:800;color:var(--acc);text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px;">✏️ Inserisci allenamento</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:10px;">
          <div>
            <div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.06em;">Kg</div>
            <input id="prog-kg" type="number" step="0.5" min="0" placeholder="0" style="width:100%;padding:10px 8px;background:var(--bg3);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:Syne,sans-serif;font-size:16px;font-weight:700;text-align:center;box-sizing:border-box;">
          </div>
          <div>
            <div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.06em;">Reps</div>
            <input id="prog-reps" type="number" min="1" placeholder="0" style="width:100%;padding:10px 8px;background:var(--bg3);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:Syne,sans-serif;font-size:16px;font-weight:700;text-align:center;box-sizing:border-box;">
          </div>
          <div>
            <div style="font-size:10px;color:var(--text3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.06em;">Serie</div>
            <input id="prog-sets" type="number" min="1" placeholder="3" style="width:100%;padding:10px 8px;background:var(--bg3);border:1px solid var(--border);border-radius:10px;color:var(--text);font-family:Syne,sans-serif;font-size:16px;font-weight:700;text-align:center;box-sizing:border-box;">
          </div>
        </div>
        <button onclick="saveManualProgEntry('${exId}')" style="width:100%;padding:11px;background:var(--acc);color:var(--bg);border:none;border-radius:10px;font-family:Syne,sans-serif;font-size:13px;font-weight:800;cursor:pointer;">💾 Salva</button>
      </div>

      ${history.length === 0 ? `
      <div style="text-align:center;padding:40px 20px;color:var(--text3);">
        <div style="font-size:40px;margin-bottom:12px;">📊</div>
        <div style="font-size:14px;font-weight:700;margin-bottom:6px;color:var(--text2);">Nessun dato ancora</div>
        <div style="font-size:12px;line-height:1.6;">Inserisci manualmente o completa una sessione con questo esercizio.</div>
      </div>` : `

      
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 16px;margin-bottom:16px;">
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:12px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--acc);line-height:1;">${prW>0?prW+'kg':'—'}</div>
          <div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-top:3px;">Miglior carico</div>
        </div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:12px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--green);line-height:1;">${prReps||'—'}</div>
          <div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-top:3px;">Miglior reps</div>
        </div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:12px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--blue);line-height:1;">${history.length}</div>
          <div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-top:3px;">Sessioni</div>
        </div>
      </div>

      ${firstKg>0 ? `
      <div style="margin:0 16px 16px;background:${deltaKg>=0?'var(--green-d)':'var(--red-d)'};border:1px solid ${deltaKg>=0?'rgba(62,223,138,.25)':'rgba(255,92,106,.25)'};border-radius:var(--r-lg);padding:12px 14px;display:flex;align-items:center;gap:10px;">
        <div style="font-size:22px;">${deltaKg>=0?'📈':'📉'}</div>
        <div>
          <div style="font-size:12px;font-weight:700;">Progressione carico</div>
          <div style="font-size:11px;color:var(--text2);margin-top:2px;">${firstKg}kg → ${lastKg}kg · <span style="color:${deltaKg>=0?'var(--green)':'var(--red)'};font-weight:700;">${deltaKg>=0?'+':''}${deltaKg.toFixed(1)}kg</span></div>
        </div>
      </div>` : ''}

      ${weights.some(w=>w>0) ? `
      <div style="margin:0 16px 16px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:14px;">
        <div style="font-size:11px;font-weight:700;color:var(--text2);margin-bottom:10px;">📊 Storico carico (kg)</div>
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;border-radius:6px;">
          <defs>
            <linearGradient id="pg-grad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="var(--acc)" stop-opacity=".35"/>
              <stop offset="100%" stop-color="var(--acc)" stop-opacity="0"/>
            </linearGradient>
          </defs>
          ${areaD ? `<path d="${areaD}" fill="url(#pg-grad2)"/>` : ''}
          <path d="${lineD}" fill="none" stroke="var(--acc)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          ${pts.map(p=>`<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="var(--acc)" opacity="${p.kg>0?1:.2}"/>`).join('')}
        </svg>
        <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text3);margin-top:6px;">
          ${dates.length>1?`<span>${dates[0]}</span><span>${dates[Math.floor(dates.length/2)]}</span><span>${dates[dates.length-1]}</span>`:`<span>${dates[0]||''}</span>`}
        </div>
      </div>` : ''}

      
      <div style="margin:0 16px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;">
        <div style="padding:12px 16px;border-bottom:1px solid var(--border);font-size:12px;font-weight:700;display:flex;justify-content:space-between;align-items:center;">
          <span>Storico sessioni</span>
          <span style="font-size:10px;color:var(--text3);">${history.length} entries</span>
        </div>
        ${history.slice(0,15).map((r,i)=>`
        <div style="display:flex;align-items:center;gap:10px;padding:11px 16px;border-bottom:1px solid var(--border);${i===0?'background:rgba(200,245,60,.04)':''}">
          <div style="font-size:10px;color:var(--text3);min-width:42px;">${(r.date||'').slice(5)}</div>
          <div style="flex:1;">
            ${r.sets>0?`<span style="font-size:12px;color:var(--text2);">${r.sets}×${r.reps||'?'}</span>`:''}
            ${r.reps>0&&!r.sets?`<span style="font-size:12px;color:var(--text2);">${r.reps} reps</span>`:''}
          </div>
          ${r.kg>0?`<div style="font-size:14px;font-weight:800;color:var(--acc);">${r.kg}kg</div>`:'<div style="font-size:11px;color:var(--text3);">BW</div>'}
          ${r.src==='manual'?`<button onclick="deleteManualEntry('${exId}',${i})" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px;padding:0 0 0 4px;">✕</button>`:''}
        </div>`).join('')}
      </div>`}
    </div>`;
  }

  // Expose save/delete functions
  window.saveManualProgEntry = function(id) {
    const kg = parseFloat(document.getElementById('prog-kg')?.value)||0;
    const reps = parseInt(document.getElementById('prog-reps')?.value)||0;
    const sets = parseInt(document.getElementById('prog-sets')?.value)||3;
    if (!kg && !reps) { if(typeof showToast==='function') showToast('⚠️ Inserisci almeno kg o reps'); return; }
    try {
      const key = 'ft_manual_log_'+id;
      const arr = JSON.parse(localStorage.getItem(key)||'[]');
      arr.unshift({ date: (typeof today==='function'?today():new Date().toISOString().slice(0,10)), kg, reps, sets, src:'manual' });
      if (arr.length > 50) arr.pop();
      localStorage.setItem(key, JSON.stringify(arr));
      // Also save to ft_ex_weights for auto-progression
      if (typeof saveExWeightHistory === 'function') saveExWeightHistory(id, kg, true);
      if(typeof showToast==='function') showToast('✅ Salvato!');
      renderProgContent();
    } catch(e) { if(typeof showToast==='function') showToast('Errore salvataggio'); }
  };

  window.deleteManualEntry = function(id, idx) {
    try {
      const key = 'ft_manual_log_'+id;
      const arr = JSON.parse(localStorage.getItem(key)||'[]');
      // idx refers to position in full history - find matching manual entry
      const manuals = arr;
      if (manuals[idx]) { manuals.splice(idx, 1); localStorage.setItem(key, JSON.stringify(manuals)); }
      renderProgContent();
    } catch(e) {}
  };

  renderProgContent();
  openSub('sub-ex-progression');
}

// v7 progression hook neutralised — v43 unified hook handles this
// (removed duplicate button injection)

/* ─────────────────────────────────────────
   4. BADGE PESO CON SPIEGAZIONE CONTESTUALE
───────────────────────────────────────── */
/* V41: v7 renderWoExs badge-tap merged into consolidated renderWoExs */
const _v7origRenderWoExs = renderWoExs; // reference kept, override neutralised
// renderWoExs v7 override neutralised

function showWeightExplainToast(weight, msg) {
  // Remove existing
  document.getElementById('v7-weight-explain')?.remove();
  const box = document.createElement('div');
  box.id = 'v7-weight-explain';
  box.style.cssText = `position:fixed;bottom:calc(var(--nav-h,68px) + 80px);left:16px;right:16px;
    background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r-lg);
    padding:16px;z-index:700;box-shadow:0 8px 32px rgba(0,0,0,.5);
    animation:slideUp .25s cubic-bezier(.22,1,.36,1) both;font-size:13px;line-height:1.65;`;
  box.innerHTML = `<div style="display:flex;align-items:flex-start;gap:10px;">
    <div style="font-size:18px;flex-shrink:0;">⚖️</div>
    <div style="flex:1;">
      <div style="font-weight:800;color:var(--acc);margin-bottom:6px;">${weight} — Perché questo peso?</div>
      <div style="color:var(--text2);">${msg.replace(/\n/g,'<br>')}</div>
    </div>
    <button onclick="this.closest('#v7-weight-explain').remove()" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:18px;flex-shrink:0;padding:0 0 0 4px;">✕</button>
  </div>`;
  document.body.appendChild(box);
  setTimeout(() => box?.remove(), 7000);
}

/* ─────────────────────────────────────────
   5. AGGIORNAMENTO PESO CON PANNELLO INLINE
───────────────────────────────────────── */
// Override logWeightPrompt with a nicer inline modal
function logWeightPrompt() {
  const cur = profile.physique?.weight || 70;
  // Use the existing add-weight modal instead of prompt()
  const modal = document.getElementById('add-weight-modal');
  const inp = document.getElementById('awm-val');
  if (modal && inp) {
    inp.value = cur;
    modal.classList.add('open');
    setTimeout(() => inp.focus(), 120);
    // Override save button to also update profile.physique.weight and recalc TDEE
    modal._v7override = true;
  } else {
    // Fallback — usa il modal in-app invece di prompt() nativo
    logWeightPromptModal(cur);
  }
}

function logWeightPromptModal(cur) {
  _showProfileModal({
    title:'⚖️ Peso attuale',
    fields:[{id:'weight',label:'Peso (kg)',type:'number',value:cur,min:20,max:400}],
    onSave(vals){
      const w=safeNumber(vals.weight,20,400,null);
      if(w===null) return 'Valore non valido (20–400 kg)';
      updateWeight(w); renderProfilePage();
      showToast('✅ Peso: '+w+' kg');
    }
  });
}

// Patch saveWeightEntry to call updateWeight (so TDEE recalc fires)
const _v7origSaveWeightEntry = saveWeightEntry;
saveWeightEntry = async function() {
  const kg = parseFloat(document.getElementById('awm-val').value);
  if (!kg || kg < 20 || kg > 300) { showToast('⚠️ Valore non valido'); return; }
  // Update physique weight + history + TDEE
  updateWeight(kg);
  // Call original for weightLog persistence
  if (!profile.weightLog) profile.weightLog = [];
  const tod = today();
  const existing = profile.weightLog.findIndex(e => e.date === tod);
  if (existing >= 0) profile.weightLog[existing].kg = kg;
  else profile.weightLog.push({date: tod, kg});
  profile.weightLog.sort((a,b)=>a.date.localeCompare(b.date));
  if (profile.weightLog.length > 60) profile.weightLog = profile.weightLog.slice(-60);
  metrics.peso = kg;
  await saveAll();
  document.getElementById('add-weight-modal').classList.remove('open');
  renderWeightChart();
  renderHealthCard();
  renderProfilePage();
  showToast('✅ Peso aggiornato: '+kg+' kg');
};

/* ── Notifiche di benvenuto e promemoria settimanale ── */
(function initBootNotifications() {
  // Se non ci sono sessioni questa settimana, aggiungi promemoria motivazionale
  const thisWeekSessions = sessions.filter(s => {
    const d = new Date(s.date), now = new Date();
    const diffDays = Math.floor((now - d) / 86400000);
    return diffDays < 7;
  });
  if (thisWeekSessions.length === 0 && sessions.length === 0) {
    // First boot
    addNotification('👋 Benvenuto in FitTrack AI!', 'Il tuo coach personale è pronto. Completa il primo allenamento per iniziare a tracciare i tuoi progressi.', 'info');
  } else if (thisWeekSessions.length === 0 && sessions.length > 0) {
    addNotification('📅 Nessun allenamento questa settimana', 'Riprendiamo dove avevamo lasciato! Apri la sezione Training per scegliere una sessione.', 'streak');
  }
})();

/* ── Fine FitTrack AI V7 ── */

/* ══════════════════════════════════════════════════════════
   FitTrack AI  V8  — Calendario Allenamento
   • Calendario settimanale nella Home (7 giorni, navigabile)
   • Calendario mensile nella sezione Allenamento
   • Mapping automatico programma attivo → giorni settimana
   • Avvio diretto dell'allenamento dal giorno selezionato
   • Indicatori completamento sessioni passate
══════════════════════════════════════════════════════════ */

/* ─── STATE ─────────────────────────── */
let _calWeekOffset = 0;    // 0 = settimana corrente
let _calSelDate    = today(); // data selezionata (YYYY-MM-DD)
let _calMonthRef   = new Date(); // mese visualizzato nel full calendar
let _calMonthSel   = null; // data selezionata nel full calendar

/* ─── HELPERS ───────────────────────── */
function _dateStr(d) {
  // Use local date parts to avoid UTC offset shifting the date (e.g. Italy CEST = UTC+2)
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dy = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + dy;
}
function _addDays(dateStr, n) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + n);
  return _dateStr(d);
}
function _isoMonday(dateStr) {
  // Returns the Monday of the week containing dateStr
  const d = new Date(dateStr);
  const day = d.getDay(); // 0=Sun
  const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff);
  return _dateStr(d);
}
function _parseDateLocal(dateStr) {
  // Parse YYYY-MM-DD as local date to avoid UTC midnight offset
  const [y,m,d] = dateStr.split('-').map(Number);
  return new Date(y, m-1, d);
}
function _dayOfWeekIt(dateStr) {
  const DAYS_IT = ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'];
  return DAYS_IT[_parseDateLocal(dateStr).getDay()];
}
function _dayOfWeekItFull(dateStr) {
  const DAYS_IT = ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
  return DAYS_IT[_parseDateLocal(dateStr).getDay()];
}
function _monthLabelIt(d) {
  const M = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
             'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
  return M[d.getMonth()] + ' ' + d.getFullYear();
}
function _formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.getDate() + '/' + (d.getMonth()+1);
}

/* ─── PROGRAMMA ATTIVO ──────────────── */
/**
 * Returns the active program (preset or custom).
 * Priority: profile.generatedPlan → active preset → null
 */
function _getActiveProgram() {
  if (woProgram?.days?.length) return woProgram;
  // Generated weekly schedule from onboarding
  if (profile.generatedPlan?.schedule?.length) {
    return {
      id: profile.recPreset || 'generated',
      name: profile.generatedPlan.presetName || 'Programma personalizzato',
      icon: profile.generatedPlan.presetIcon || '🏋️',
      days: profile.generatedPlan.schedule.map(s => s.day),
      _isGeneratedPlan: true,
      _schedule: profile.generatedPlan.schedule
    };
  }
  // Try active preset
  if (profile.recPreset) {
    return PRESETS_DATA.find(x => x.id === profile.recPreset) || null;
  }
  // Try editProg if it has days
  if (editProg && editProg.days && editProg.days.length) return editProg;
  return null;
}

/**
 * Maps a date to the corresponding workout day in the active program.
 * Cycles through active (non-rest) days based on weekday.
 * Returns { day, dayIndex, presetId } or null (rest day / no program).
 */
function _getWorkoutForDate(dateStr) {
  const prog = _getActiveProgram();
  if (!prog || !prog.days || !prog.days.length) return null;

  if (prog._isGeneratedPlan && Array.isArray(prog._schedule)) {
    const isoWd = (_parseDateLocal(dateStr).getDay() + 6) % 7; // Mon=0..Sun=6
    const slot = prog._schedule[isoWd];
    if (!slot || slot.isRest || !slot.day || slot.day.rest) return null;
    return { day: slot.day, dayIndex: isoWd, prog, presetId: prog.id || null };
  }

  const allDays = prog.days;
  const activeDays = allDays.filter(d => !d.rest);
  if (!activeDays.length) return null;

  // Use ISO weekday (Mon=0 … Sun=6) as the cycle index
  const d = _parseDateLocal(dateStr);
  const isoWd = (d.getDay() + 6) % 7; // Mon=0, Tue=1 … Sun=6

  // Build the weekly assignment: spread active days across the week
  // Strategy: assign days 0,1,2… to isoWd positions 0,1,2,3,4,5,6
  // Rest days fall on the remaining weekdays
  const numActive = activeDays.length;
  const spreadPositions = [];
  for (let i = 0; i < numActive; i++) {
    // Distribute evenly Mon–Sun (prefer weekdays first)
    spreadPositions.push(Math.floor(i * 7 / numActive));
  }

  const posIdx = spreadPositions.indexOf(isoWd);
  if (posIdx === -1) return null; // rest day

  const day = activeDays[posIdx];
  const dayIndex = allDays.indexOf(day);
  return { day, dayIndex, prog, presetId: prog.id || null };
}

/**
 * Returns true if there's a completed session for this date with a matching day name.
 */
function _sessionDoneOnDate(dateStr) {
  return sessions.some(s => s.date === dateStr);
}

function _sessionDoneForDay(dateStr, dayName) {
  return sessions.some(s => s.date === dateStr &&
    (s.dayName === dayName || s.progName === (_getActiveProgram()?.name || '')));
}

function _goalPhaseBadgeHtml(){
  const gt = profile?.goalsMeta?.goalType || 'maintain';
  if(gt === 'cut') return `<span class="cal-det-status-chip" style="background:rgba(255,92,106,.12);color:var(--red);">CUT consigliato</span>`;
  if(gt === 'bulk') return `<span class="cal-det-status-chip" style="background:rgba(62,223,138,.12);color:var(--green);">BULK consigliato</span>`;
  return `<span class="cal-det-status-chip" style="background:rgba(91,156,239,.12);color:var(--blue);">MANTENIMENTO</span>`;
}

/* ─── TYPE COLORS ───────────────────── */
const CAL_TYPE_COLORS = {
  push:         { bg:'rgba(255,92,106,.15)',  c:'var(--red)',    dot:'var(--red)'   },
  pull:         { bg:'rgba(62,223,138,.12)',  c:'var(--green)',  dot:'var(--green)' },
  lower:        { bg:'rgba(91,156,239,.12)',  c:'var(--blue)',   dot:'var(--blue)'  },
  full:         { bg:'rgba(200,245,60,.12)',  c:'var(--acc)',    dot:'var(--acc)'   },
  calisthenics: { bg:'rgba(168,126,248,.12)', c:'var(--purple)', dot:'var(--purple)'},
  cardio:       { bg:'rgba(255,154,60,.12)',  c:'var(--orange)', dot:'var(--orange)'},
  skill:        { bg:'rgba(62,207,207,.12)',  c:'var(--teal)',   dot:'var(--teal)'  },
  custom:       { bg:'rgba(255,255,255,.06)', c:'var(--text2)',  dot:'var(--text3)' },
  rest:         { bg:'transparent',           c:'var(--text3)',  dot:'var(--border2)'},
};
function _calTypeColor(type) {
  return CAL_TYPE_COLORS[type] || CAL_TYPE_COLORS.custom;
}

/* ══════════════════════════════════════
   HOME — WEEKLY STRIP CALENDAR
══════════════════════════════════════ */
function renderHomeCalendar() {
  const card = document.getElementById('home-cal-card');
  if (!card) return;

  const prog = _getActiveProgram();

  // Update program name subtitle
  const nameEl = document.getElementById('cal-prog-name');
  if (nameEl) nameEl.textContent = prog ? (prog.name || 'Programma attivo') : 'Nessun programma attivo';

  // Compute week start (Monday) applying offset
  const baseDateStr = today();
  const monday = _isoMonday(baseDateStr);
  const mondayShifted = _addDays(monday, _calWeekOffset * 7);

  // Week label
  const sun = _addDays(mondayShifted, 6);
  const weekEl = document.getElementById('cal-week-label');
  if (weekEl) weekEl.textContent = _formatDate(mondayShifted) + '–' + _formatDate(sun);

  // Cycle tracking active?
  const c = getCycleData();
  const showCycle = c && c.trackCycle && c.lastPeriod &&
                    typeof profile !== 'undefined' && profile.physique?.sex === 'f';

  // Mostra/nascondi legenda ciclo
  const legend = document.getElementById('cal-cycle-legend');
  if (legend) legend.style.display = showCycle ? 'flex' : 'none';

  // Build 7 days
  const strip = document.getElementById('cal-days-strip');
  if (!strip) return;

  const todayStr = today();
  let html = '';
  for (let i = 0; i < 7; i++) {
    const dateStr = _addDays(mondayShifted, i);
    const wo = _getWorkoutForDate(dateStr);
    const isToday = dateStr === todayStr;
    const isSel = dateStr === _calSelDate;
    const done = _sessionDoneOnDate(dateStr);
    const isRest = !wo;
    const d = new Date(dateStr);
    const dayNum = d.getDate();
    const dayLbl = _dayOfWeekIt(dateStr);

    const tc = wo ? _calTypeColor(wo.day.type) : _calTypeColor('rest');

    // Fase ciclo per questo giorno
    let cycleChip = '';
    if (showCycle) {
      const cp = getCyclePhaseForDate(dateStr);
      if (cp) {
        const phaseStyle = {
          menstrual:  { bg:'rgba(255,92,160,.18)', c:'#FF5CA0', ico:'🔴' },
          follicular: { bg:'rgba(200,245,60,.12)',  c:'var(--acc)', ico:'🌱' },
          ovulation:  { bg:'rgba(62,223,138,.18)',  c:'var(--green)', ico:'⚡' },
          luteal:     { bg:'rgba(255,180,60,.14)',   c:'#FFB43C', ico:'🌙' },
        };
        const phKey = Object.keys(CYCLE_PHASES).find(k => CYCLE_PHASES[k] === cp.phase) || 'follicular';
        const ps = phaseStyle[phKey] || phaseStyle.follicular;
        cycleChip = `<div style="font-size:7px;margin-top:2px;background:${ps.bg};color:${ps.c};border-radius:4px;padding:1px 3px;line-height:1.3;text-align:center;">${ps.ico}</div>`;
      }
    }

    let dotHtml = '';
    if (done) {
      dotHtml = `<div class="cal-day-done-ring"></div>`;
    } else if (wo) {
      dotHtml = `<div class="cal-day-dot" style="background:${tc.dot};${isToday?'box-shadow:0 0 6px '+tc.dot:''}"></div>`;
    } else {
      dotHtml = `<div class="cal-day-dot" style="background:var(--border2)"></div>`;
    }

    let typeChip = '';
    if (wo && !isRest) {
      const label = wo.day.type.charAt(0).toUpperCase() + wo.day.type.slice(1,4);
      typeChip = `<div class="cal-day-type-chip" style="background:${tc.bg};color:${tc.c};">${label}</div>`;
    } else {
      typeChip = `<div class="cal-day-type-chip" style="color:var(--text3);font-size:8px;">Rip.</div>`;
    }

    html += `<div class="cal-day${isToday?' cal-today':''}${isSel?' cal-selected':''}${isRest?' cal-rest':''}"
      onclick="calSelectDay('${dateStr}')">
      <div class="cal-day-lbl">${dayLbl}</div>
      <div class="cal-day-num">${dayNum}</div>
      ${typeChip}
      ${cycleChip}
      ${dotHtml}
    </div>`;
  }
  strip.innerHTML = html;

  // Render detail panel for selected date
  renderCalDetailPanel(_calSelDate);
}

function calShiftWeek(dir) {
  _calWeekOffset += dir;
  renderHomeCalendar();
}

function calSelectDay(dateStr) {
  _calSelDate = dateStr;
  renderHomeCalendar();
}

function renderCalDetailPanel(dateStr) {
  const panel = document.getElementById('cal-detail-panel');
  if (!panel) return;

  const wo = _getWorkoutForDate(dateStr);
  const done = _sessionDoneOnDate(dateStr);
  const todayStr = today();
  const isFuture = dateStr > todayStr;
  const isPast = dateStr < todayStr;
  const d = new Date(dateStr);

  panel.style.display = 'block';

  // Cycle phase block per questo giorno (solo se donna con ciclo attivo)
  let cycleBlock = '';
  const cp = (typeof getCyclePhaseForDate === 'function') ? getCyclePhaseForDate(dateStr) : null;
  if (cp) {
    const phKey = Object.keys(CYCLE_PHASES).find(k => CYCLE_PHASES[k] === cp.phase) || 'follicular';
    const phColors = {
      menstrual:  { bg:'rgba(255,92,160,.12)',  c:'#FF5CA0' },
      follicular: { bg:'rgba(200,245,60,.10)',   c:'var(--acc)' },
      ovulation:  { bg:'rgba(62,223,138,.12)',   c:'var(--green)' },
      luteal:     { bg:'rgba(255,180,60,.12)',    c:'#FFB43C' },
    };
    const pc = phColors[phKey] || phColors.follicular;
    cycleBlock = `<div style="margin-bottom:10px;padding:9px 12px;background:${pc.bg};border-radius:10px;border-left:3px solid ${pc.c};">
      <div style="font-size:11px;font-weight:800;color:${pc.c};margin-bottom:3px;">${cp.phase.ico} ${cp.phase.name} · Giorno ${cp.dayInCycle}/${cp.cycleLen}</div>
      <div style="font-size:11px;color:var(--text2);line-height:1.5;">${cp.phase.workoutNote || cp.phase.advice}</div>
    </div>`;
  }

  if (!wo || !wo.day) {
    panel.innerHTML = `<div class="cal-rest-block">
      <div class="cal-rest-ico">😴</div>
      <div style="font-size:14px;font-weight:700;margin-bottom:4px;">${_dayOfWeekItFull(dateStr)} ${d.getDate()}/${d.getMonth()+1}</div>
      <div style="font-size:12px;color:var(--text2);line-height:1.6;">Giorno di riposo — recupero attivo consigliato.<br>Mobilità, stretching o una camminata leggera.</div>
      ${cycleBlock ? '<div style="margin-top:10px;">'+cycleBlock+'</div>' : ''}
    </div>`;
    return;
  }

  const day = wo.day;
  const tc = _calTypeColor(day.type);
  const exList = (day.exercises || []).slice(0, 4);
  const moreCount = (day.exercises || []).length - exList.length;

  // Status chip
  let statusChip = '';
  if (done) {
    statusChip = `<span class="cal-det-status-chip" style="background:rgba(62,223,138,.15);color:var(--green);">✅ Completato</span>`;
  } else if (isPast) {
    statusChip = `<span class="cal-det-status-chip" style="background:rgba(255,92,106,.1);color:var(--red);">Saltato</span>`;
  } else if (dateStr === todayStr) {
    statusChip = `<span class="cal-det-status-chip" style="background:rgba(200,245,60,.15);color:var(--acc);">● Oggi</span>`;
  } else {
    statusChip = `<span class="cal-det-status-chip" style="background:var(--bg4);color:var(--text3);">${isFuture?'Programmato':'—'}</span>`;
  }
  const goalChip = _goalPhaseBadgeHtml();

  const exRows = exList.map(ex => {
    const exD = EX_DB.find(e => e.id === ex.id) || {name: ex.name || ex.id, icon:'💪'};
    return `<div class="cal-det-ex-row">
      <div class="cal-det-ex-ico">${exD.icon || '💪'}</div>
      <div class="cal-det-ex-nm">${exD.name}</div>
      <div class="cal-det-ex-sets">${ex.s||3}×${ex.r||10}</div>
    </div>`;
  }).join('');

  const moreRow = moreCount > 0
    ? `<div style="font-size:11px;color:var(--text3);text-align:center;padding:4px 0;">+${moreCount} altri esercizi</div>` : '';

  // Start button
  let btnHtml = '';
  if (done) {
    btnHtml = `<button class="cal-start-btn" disabled>✅ Già completato oggi</button>`;
  } else if (isFuture && dateStr !== todayStr) {
    btnHtml = `<button class="cal-start-btn" style="background:var(--bg4);color:var(--text2);cursor:default;" disabled>📅 Programmato per ${d.getDate()}/${d.getMonth()+1}</button>`;
  } else {
    btnHtml = `<button class="cal-start-btn" onclick="calStartWorkout('${dateStr}')">▶ Inizia ${day.name}</button>`;
  }

  panel.innerHTML = `
    <div class="cal-det-day-header">
      <div class="cal-det-day-name">${_dayOfWeekItFull(dateStr)}, ${d.getDate()}/${d.getMonth()+1}</div>
      ${statusChip}
    </div>
    <div style="margin-bottom:8px">${goalChip}</div>
    ${cycleBlock}
    <div class="cal-det-workout-name">
      <span style="background:${tc.bg};color:${tc.c};padding:2px 8px;border-radius:99px;font-size:10px;">${day.type}</span>
      ${day.name}
    </div>
    <div class="cal-det-exercises">${exRows}${moreRow}</div>
    ${btnHtml}`;
}

function calStartWorkout(dateStr) {
  const wo = _getWorkoutForDate(dateStr);
  if (!wo) return;
  const prog = JSON.parse(JSON.stringify(wo.prog));
  normalizeProgramSets(prog);
  const day = prog.days[wo.dayIndex];
  if (!day || day.rest) { showToast('⚠️ Giorno di riposo'); return; }
  beginWorkout(prog, day);
  showToast('▶ Avvio: ' + day.name);
}

/* Hook renderHome — V41: renderHomeCalendar merged into consolidated renderHome */
const _v8origRenderHome = typeof renderHome === 'function' ? renderHome : null;
// override neutralised — renderHomeCalendar called directly in V41 renderHome

/* ══════════════════════════════════════
   TRAINING — MONTH CALENDAR
══════════════════════════════════════ */
function renderMonthCalendar() {
  const d = _calMonthRef;
  const monthEl = document.getElementById('al-cal-month-title');
  if (monthEl) monthEl.textContent = _monthLabelIt(d);

  const grid = document.getElementById('al-cal-month-grid');
  if (!grid) return;

  const year = d.getFullYear(), month = d.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);

  // Start from Monday of the week containing firstDay
  const firstIsoWd = (firstDay.getDay() + 6) % 7; // Mon=0
  const startDate = new Date(firstDay);
  startDate.setDate(1 - firstIsoWd);

  const todayStr = today();
  let html = '';
  let cur = new Date(startDate);

  // Generate 6 rows × 7 cols
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      const dateStr = _dateStr(cur);
      const isThisMonth = cur.getMonth() === month;
      const isToday = dateStr === todayStr;
      const isSel = dateStr === _calMonthSel;
      const done = _sessionDoneOnDate(dateStr);
      const wo = _getWorkoutForDate(dateStr);
      const tc = wo ? _calTypeColor(wo.day.type) : null;

      let dotHtml = '';
      if (done) {
        dotHtml = `<div class="cal-month-day-dot" style="background:var(--green);"></div>`;
      } else if (wo) {
        dotHtml = `<div class="cal-month-day-dot" style="background:${tc.dot};opacity:.7;"></div>`;
      }

      html += `<div class="cal-month-day${isToday?' today':''}${done?' has-session':''}${!isThisMonth?' other-month':''}${isSel?' cal-selected':''}"
        onclick="calMonthSelect('${dateStr}')"
        style="${isSel?'border:1.5px solid var(--acc);background:rgba(200,245,60,.1);':''}">
        <div class="cal-month-day-n">${cur.getDate()}</div>
        ${dotHtml}
      </div>`;

      cur.setDate(cur.getDate() + 1);
    }
    // Fine riga: `col` del for interno non è in scope qui (let) — usare solo cur.
    // Senza questo fix la funzione lancia ReferenceError e la griglia resta vuota.
    if (cur > lastDay) break;
  }
  grid.innerHTML = html;

  // Show detail for selected day
  if (_calMonthSel) renderMonthDayDetail(_calMonthSel);
}

function calMonthShift(dir) {
  _calMonthRef = new Date(_calMonthRef.getFullYear(), _calMonthRef.getMonth() + dir, 1);
  renderMonthCalendar();
}

function calMonthSelect(dateStr) {
  _calMonthSel = dateStr;
  renderMonthCalendar();
}

function renderMonthDayDetail(dateStr) {
  const wrap = document.getElementById('al-cal-day-detail');
  const content = document.getElementById('al-cal-day-content');
  if (!wrap || !content) return;

  const wo = _getWorkoutForDate(dateStr);
  const done = _sessionDoneOnDate(dateStr);
  const todayStr = today();
  const isFuture = dateStr > todayStr;
  const isPast = dateStr < todayStr;
  const d = new Date(dateStr);

  wrap.style.display = 'block';

  if (!wo || !wo.day) {
    content.innerHTML = `<div style="text-align:center;padding:12px 0;">
      <div style="font-size:28px;margin-bottom:8px;">😴</div>
      <div style="font-size:14px;font-weight:700;">${_dayOfWeekItFull(dateStr)} ${d.getDate()}/${d.getMonth()+1}</div>
      <div style="font-size:12px;color:var(--text2);margin-top:4px;">Giorno di riposo programmato</div>
    </div>`;
    return;
  }

  const day = wo.day;
  const tc = _calTypeColor(day.type);
  const prog = _getActiveProgram();
  const goalChip = _goalPhaseBadgeHtml();

  // All sessions for this date
  const sessForDay = sessions.filter(s => s.date === dateStr);

  let statusHtml = '';
  if (done) {
    const s = sessForDay[0];
    statusHtml = `<div style="background:rgba(62,223,138,.1);border:1px solid rgba(62,223,138,.2);border-radius:var(--r-sm);padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;gap:10px;">
      <div style="font-size:20px;">✅</div>
      <div>
        <div style="font-size:12px;font-weight:700;color:var(--green);">Completato</div>
        <div style="font-size:11px;color:var(--text2);">${s ? s.duration+'min · vol '+s.volume : ''}</div>
      </div>
    </div>`;
  }

  const exRows = (day.exercises || []).map(ex => {
    const exD = EX_DB.find(e => e.id === ex.id) || {name: ex.name || ex.id, icon:'💪'};
    return `<div class="cal-det-ex-row">
      <div class="cal-det-ex-ico">${exD.icon||'💪'}</div>
      <div class="cal-det-ex-nm">${exD.name}</div>
      <div class="cal-det-ex-sets">${ex.s||3}×${ex.r||10}</div>
    </div>`;
  }).join('');

  let btnHtml = '';
  if (done) {
    btnHtml = `<button class="cal-start-btn" style="margin-top:12px;" disabled>✅ Sessione completata</button>`;
  } else if (isFuture) {
    btnHtml = `<button class="cal-start-btn" style="margin-top:12px;background:var(--bg4);color:var(--text2);" disabled>📅 ${d.getDate()}/${d.getMonth()+1} — programmato</button>`;
  } else {
    btnHtml = `<button class="cal-start-btn" style="margin-top:12px;" onclick="calStartWorkout('${dateStr}')">▶ Inizia ${day.name}</button>`;
  }

  content.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
      <div style="font-size:15px;font-weight:800;">${_dayOfWeekItFull(dateStr)}, ${d.getDate()}/${d.getMonth()+1}</div>
      <span style="font-size:10px;font-weight:700;background:${tc.bg};color:${tc.c};padding:3px 10px;border-radius:99px;">${day.type}</span>
    </div>
    <div style="margin-bottom:8px">${goalChip}</div>
    <div style="font-size:14px;font-weight:700;color:var(--acc);margin-bottom:10px;">${day.name}</div>
    ${statusHtml}
    <div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;">Esercizi programmati</div>
    <div class="cal-det-exercises">${exRows || '<div style="font-size:12px;color:var(--text2);padding:8px 0;">Nessun esercizio definito</div>'}</div>
    ${btnHtml}`;
}

/* ── Boot: init calendar state ────── */
(function initCalendar() {
  _calSelDate = today();
  _calMonthRef = new Date();
  _calMonthSel = today();
  // Will be called again by renderHome hook — just set defaults
})();

/* ── Fine FitTrack AI V8 — Calendario ── */

} // end if(!window._v4GoPagePatched)

/* ══ V29 FIX: esponi const come window.* per gli script successivi ══ */
window.EX_DB = EX_DB;
window.FOOD_DB = FOOD_DB;
window.PRESETS_DATA = PRESETS_DATA;
window.WORKOUT_PRESETS = PRESETS_DATA;
window.RICETTE = RICETTE;
window.profile_ref = () => (typeof profile !== 'undefined' ? profile : null);
// Garantisce che renderWoExs sia sempre accessibile come window.*
if(typeof renderWoExs === 'function') window.renderWoExs = renderWoExs;
if(typeof obGo === 'function') window.obGo = obGo;
if(typeof finishOnboard === 'function') window.finishOnboard = finishOnboard;
</script>