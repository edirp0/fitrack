function initApp(){
  if(window._ftOnboardingActive) return; // blocca durante onboarding
  const n=profile.name||'Atleta';
  const _tbAv=document.getElementById('tb-av'); if(_tbAv) _tbAv.textContent=n[0].toUpperCase();
  const _moto=document.getElementById('moto-txt'); if(_moto) _moto.textContent=MOTO[Math.floor(Math.random()*MOTO.length)];
  renderLibrary();
  renderWeeklyProgram();
  renderPresetExplorer();
  renderHome();
  // Controlla se c'era un allenamento non concluso
  setTimeout(_checkAutoSaveOnLoad, 1500);
}

// Streak warning banner — avvisa se la streak è in pericolo
function renderStreakWarning(){
  if(typeof sessions==='undefined'||typeof profile==='undefined') return;
  const existing=document.getElementById('streak-warning-banner');
  if(existing) existing.remove();
  const streak=calcStreak();
  if(streak<1) return;
  // Controlla se oggi è già stato allenato
  const todayDone=(sessions||[]).some(s=>s.date===today());
  if(todayDone) return;
  // Controlla ora — avvisa dopo le 18:00 o se mancano meno di 6 ore alla mezzanotte
  const now=new Date();
  const hoursLeft=((24-now.getHours()-1)+(60-now.getMinutes())/60);
  if(hoursLeft>8) return; // troppo presto
  const banner=document.createElement('div');
  banner.id='streak-warning-banner';
  banner.style.cssText='background:linear-gradient(135deg,rgba(255,154,60,.12),rgba(255,92,106,.08));border:1px solid rgba(255,154,60,.3);border-radius:var(--r-lg);padding:12px 16px;margin:0 16px 12px;display:flex;align-items:center;gap:12px;animation:fadeUp .35s cubic-bezier(.22,1,.36,1) both;';
  banner.innerHTML=`
    <div style="font-size:24px;">⚠️</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:800;color:var(--orange);">Streak di ${streak} giorni in pericolo!</div>
      <div style="font-size:11px;color:var(--text2);margin-top:2px;">Mancano circa ${Math.round(hoursLeft)} ore. Allenati ora per mantenerla.</div>
    </div>
    <button onclick="goPage('allenamento')" style="background:var(--orange);color:#080810;border:none;border-radius:var(--r-sm);padding:8px 12px;font-size:11px;font-weight:800;cursor:pointer;font-family:'Syne',sans-serif;flex-shrink:0">Vai →</button>`;
  // Inserisci nel page-home dopo il primo elemento
  const homeBody=document.getElementById('home-body')||document.getElementById('page-home');
  if(homeBody) { try { homeBody.insertBefore(banner, homeBody.firstChild); } catch(e) { homeBody.appendChild(banner); } }
}
/* ─────────────────────────────────────────────────────────────
   HOME CTA — primo elemento visibile
   Mostra "Continua allenamento" o "Scegli programma"
───────────────────────────────────────────────────────────── */

/**
 * Calcola il prossimo giorno di allenamento da avviare.
 * Usa le sessioni passate per capire a che punto è l'utente nel programma.
 * Restituisce { prog, day, dayIndex, totalActive, completedThisCycle }
 */
function getActiveProgramState(){
  if(typeof profile==='undefined'||typeof PRESETS_DATA==='undefined') return null;
  const pid  = profile.recPreset;
  const prog = pid ? PRESETS_DATA.find(x => x.id === pid) : null;
  if(!prog) return null;

  const activeDays = (prog.days || [])
    .map((d, i) => ({...d, realIdx: i}))
    .filter(d => !d.rest);

  if(!activeDays.length) return null;

  const totalActive = activeDays.length;

  // Conta sessioni di questo programma (ultime 30 sessioni)
  const progSessions = sessions
    .filter(s => s.progName === prog.name || s.progId === prog.id)
    .slice(-totalActive * 3); // guarda massimo 3 cicli indietro

  // Quante sessioni ha fatto nell'ultimo "giro" del programma
  const completedThisCycle = progSessions.length % totalActive;

  // Il prossimo giorno = il successivo non ancora fatto oggi
  const nextIdx = completedThisCycle % totalActive;
  const day     = activeDays[nextIdx];
  const dayNum  = nextIdx + 1;

  return { prog, day, dayIndex: day.realIdx, dayNum, totalActive, completedThisCycle };
}

/** Renders the CTA banner into #home-cta-banner */
function renderHomeCta(){
  if(typeof profile==='undefined'||typeof sessions==='undefined') return;
  const wrap = document.getElementById('home-cta-banner');
  if(!wrap) return;

  const state = getActiveProgramState();

  if(state){
    const { prog, day, dayNum, totalActive } = state;
    const tc = TC[prog.t] || TC.custom;
    const cycleBadge = getCycleBadgeHtml();

    wrap.innerHTML = `
      <div class="cta-banner has-prog">
        <div class="cta-eyebrow" style="color:var(--acc)">⚡ Programma attivo</div>
        <div class="cta-prog-name">${prog.icon} ${prog.name}</div>
        <div class="cta-day-info">
          <span style="font-weight:700;color:var(--text);">Giorno ${dayNum} / ${totalActive}</span>
          ${day.name ? ` &nbsp;·&nbsp; <span>${day.name}</span>` : ''}
          ${day.type ? ` &nbsp;·&nbsp; <span style="font-size:10px;font-weight:700;padding:1px 7px;border-radius:99px;background:${tc.bg};color:${tc.c};">${day.type}</span>` : ''}
        </div>
        ${cycleBadge ? `<div style="margin-bottom:12px;">${cycleBadge}</div>` : ''}
        <button class="cta-btn-main accent" onclick="startActiveDay()">
          <span style="font-size:18px">▶</span> Continua allenamento
        </button>
      </div>`;
  } else {
    wrap.innerHTML = `
      <div class="cta-banner no-prog">
        <div class="cta-eyebrow" style="color:var(--text3)">Inizia ora</div>
        <div class="cta-prog-name" style="color:var(--text2);font-size:16px;">Nessun programma attivo</div>
        <div class="cta-no-prog-txt">Scegli un programma per vedere qui il tuo prossimo allenamento.</div>
        <button class="cta-btn-main ghost" onclick="goPage('allenamento');setTimeout(()=>switchAlTab('esplora',null),80)">
          <span style="font-size:18px">🏋️</span> Scegli programma
        </button>
      </div>`;
  }
}

/**
 * Avvia il giorno corrente del programma attivo.
 * Chiamato dal bottone "Continua allenamento".
 */
function startActiveDay(){
  const state = getActiveProgramState();
  if(!state){ showToast('⚠️ Nessun programma attivo'); return; }
  const { prog, dayIndex } = state;
  startPresetDay(prog.id, dayIndex);
}

function renderHome(){
  renderHomeCta(); // ← primo elemento visibile
  renderStreakWarning(); // ← avviso streak in pericolo

  const n=profile.name||'Atleta';
  const hr=new Date().getHours();
  const greet=hr<12?'Buongiorno':hr<18?'Buon pomeriggio':'Buonasera';
  const _hg=document.getElementById('h-greet'); if(_hg) _hg.textContent=greet+',';
  const _hn=document.getElementById('h-name'); if(_hn) _hn.innerHTML=n+' <em>💪</em>';

  const nt=todayNutr();
  const totals = calcNutritionTotals(nt);
  const eaten = totals.eaten;
  const ep = totals.p;
  const ec = totals.c;
  const eg = totals.g;
  const tgt=safeKcal(profile.kcalTarget)||2500;
  const {p:tp,c:tc,g:tg}=profile.macros||{p:180,c:280,g:70};
  const pct=Math.min(100,Math.round(eaten/tgt*100));
  const rem=Math.max(0,tgt-eaten);

  const _ss=document.getElementById('s-streak'); if(_ss) _ss.textContent=calcStreak();
  const _se=document.getElementById('s-sess'); if(_se) _se.textContent=(sessions&&sessions.length)||0;
  const _sk=document.getElementById('s-kcal'); if(_sk) _sk.textContent=eaten;
  const _sr=document.getElementById('s-rem'); if(_sr) _sr.textContent=rem;

  // Ring
  const circ=2*Math.PI*39;
  const offset=circ*(1-pct/100);
  const _kr=document.getElementById('h-kring');
  if(_kr){ _kr.style.strokeDasharray=circ; _kr.style.strokeDashoffset=offset; }
  const _kv=document.getElementById('h-kv'); if(_kv) _kv.textContent=eaten;
  const _kt=document.getElementById('h-ktgt-ring'); if(_kt) _kt.textContent=tgt;
  const _kp=document.getElementById('h-kpct'); if(_kp) _kp.textContent=pct+'%';
  const _kb=document.getElementById('h-kbig'); if(_kb) _kb.textContent=eaten;
  const _kg=document.getElementById('h-ktgt'); if(_kg) _kg.textContent='/ '+tgt+' kcal obiettivo';
  const _km=document.getElementById('h-krem'); if(_km) _km.textContent=rem+' kcal rimanenti';

  // Macro pills
  setMpill('mp-pv','mp-pb',ep,tp,'var(--green)','g');
  setMpill('mp-cv','mp-cb',ec,tc,'var(--blue)','g');
  setMpill('mp-gv','mp-gb',eg,tg,'var(--orange)','g');

  // Last session
  const ls=sessions&&sessions.length?sessions[sessions.length-1]:null;
  if(ls){
    const _lsc=document.getElementById('h-last-sess');
    if(_lsc) _lsc.style.display='block';
    const _lsnm=document.getElementById('h-ls-nm'); if(_lsnm) _lsnm.textContent=ls.dayName||ls.progName;
    const _lsdt=document.getElementById('h-ls-dt'); if(_lsdt) _lsdt.textContent=ls.date;
    const _lsex=document.getElementById('h-ls-exs'); if(_lsex) _lsex.textContent=ls.exCount||0;
    const _lsdu=document.getElementById('h-ls-dur'); if(_lsdu) _lsdu.textContent=ls.duration||0;
    const _lsvo=document.getElementById('h-ls-vol'); if(_lsvo) _lsvo.textContent=(ls.volume||0)+' s×r';
  }

  // Active program card with cycle badge
  const progCard = document.getElementById('h-active-prog-card');
  if(progCard){
    const pid = profile.recPreset;
    const prog = pid ? PRESETS_DATA.find(x=>x.id===pid) : null;
    if(prog){
      const tc = TC[prog.t]||TC.custom;
      const badge = getCycleBadgeHtml();
      progCard.style.display = 'block';
      progCard.innerHTML = `
        <div style="
          background:var(--bg2);border:1px solid var(--border);
          border-radius:var(--r-lg);padding:14px 16px;margin:0 16px 12px;
          cursor:pointer;transition:border-color .15s;"
          onclick="goPage('allenamento')"
          onmouseover="this.style.borderColor='var(--border2)'"
          onmouseout="this.style.borderColor='var(--border)'">
          <div style="font-size:10px;font-weight:700;color:var(--text3);
            text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">
            📋 Programma attivo
          </div>
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="font-size:22px;flex-shrink:0;">${prog.icon}</div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:15px;font-weight:800;letter-spacing:-.2px;">${prog.name}</div>
              <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;margin-top:4px;">
                <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;
                  background:${tc.bg};color:${tc.c};">${prog.t}</span>
                <span style="font-size:10px;color:var(--text3);">
                  ${(prog.days||[]).filter(d=>!d.rest).length} giorni/sett. · ${prog.dur} min
                </span>
              </div>
              ${badge}
            </div>
            <div style="font-size:18px;color:var(--text3);flex-shrink:0;">›</div>
          </div>
        </div>`;
    } else {
      progCard.style.display = 'none';
    }
  }
}

function setMpill(vid,bid,curr,tgt,color,unit){
  const pct=Math.min(100,tgt>0?Math.round(curr/tgt*100):0);
  const vel=document.getElementById(vid); if(vel) vel.textContent=curr+(unit||'');
  const bel=document.getElementById(bid); if(bel) bel.style.width=pct+'%';
}

// ── COACH ─────────────────────────────────
function renderCoach(){
  const pid=profile.recPreset;
  const p=pid?PRESETS_DATA.find(x=>x.id===pid):null;
  const banner=document.getElementById('coach-rec-banner');
  if(p){
    const tc=TC[p.t]||TC.custom;
    banner.style.display='block';
    banner.innerHTML=`
      <div class="rec-eye">🎯 Il tuo programma consigliato</div>
      <div class="rec-nm">${p.icon} ${p.name}</div>
      <div class="rec-desc">${p.desc}</div>
      <button class="rec-btn" onclick="startPreset(PRESETS_DATA.find(x=>x.id==='${p.id}'))">▶ Inizia ora</button>`;
  } else banner.style.display='none';
}

// ── ALLENAMENTO ───────────────────────────
function calcStreak(){
  if(typeof sessions==='undefined'||!sessions||!sessions.length) return 0;
  // Ordina sessioni per data decrescente
  const sorted=[...sessions].sort((a,b)=>new Date(b.date)-new Date(a.date));
  const todayStr=today();
  let streak=0;
  let curDate=new Date(todayStr);
  // Conta giorni consecutivi a ritroso (finestra 36h per evitare perdite alla mezzanotte)
  const seen=new Set(sorted.map(s=>s.date));
  // Inizia da oggi o ieri se oggi non c'è ancora
  const todayDone=seen.has(todayStr);
  if(!todayDone){
    // Controlla ieri
    const yd=new Date(curDate);yd.setDate(yd.getDate()-1);
    const ydStr=yd.toISOString().slice(0,10);
    if(!seen.has(ydStr)) return 0;
    curDate=yd;
  }
  // Conta streak
  for(let i=0;i<365;i++){
    const ds=curDate.toISOString().slice(0,10);
    if(seen.has(ds)){streak++;curDate.setDate(curDate.getDate()-1);}
    else break;
  }
  return streak;
}
function renderAllenamento(){
  if(typeof profile==='undefined'||typeof PRESETS_DATA==='undefined') return;
  const el=document.getElementById('sess-list');
  if(!(sessions&&sessions.length)){
    el.innerHTML=`<div class="empty-state"><div class="es-ico">🏋️</div><div class="es-txt">Nessuna sessione ancora.<br>Creane una nuova o carica un preset dal Coach IA!</div><button class="btn btn-acc" onclick="goPage('coach')">Vai al Coach →</button></div>`;
    return;
  }
  el.innerHTML=[...sessions].reverse().map((s,i)=>`
    <div class="sess-card" onclick="showToast('${s.dayName||s.progName}')">
      <div class="sess-top">
        <div><div class="sess-name">${s.dayName||s.progName}</div><div class="sess-date">${s.date}</div></div>
        <button class="sess-del" onclick="event.stopPropagation();deleteSession(${sessions.length-1-i})">🗑</button>
      </div>
      <div class="sess-chips">
        <span class="sc">${s.exCount||0} esercizi</span>
        <span class="sc">${s.duration||0} min</span>
        <span class="sc hi" title="serie × ripetizioni completate">${s.volume||0} <span style=\"font-size:9px;opacity:.7\">s×r</span></span>
      </div>
    </div>`).join('');
}
function deleteSession(i){
  const removed = sessions.splice(i, 1)[0];
  saveAll(); renderAllenamento();
  // Toast con undo — no confirm() nativo
  const tid = '_del-sess-' + Date.now();
  const t = document.createElement('div');
  t.id = tid;
  t.style.cssText = 'position:fixed;bottom:calc(var(--nav-h,68px)+14px);left:50%;transform:translateX(-50%);background:var(--bg2);border:1px solid var(--border2);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:12px;z-index:9500;font-family:\'Syne\',sans-serif;font-size:13px;box-shadow:0 8px 24px rgba(0,0,0,.5);white-space:nowrap;';
  t.innerHTML = '<span style="color:var(--text2)">🗑 Sessione eliminata</span>'
    + '<button onclick="window._undoDelSession(\''+tid+'\')" style="background:none;border:none;color:var(--acc);font-family:\'Syne\',sans-serif;font-size:13px;font-weight:800;cursor:pointer;padding:0;">Annulla</button>';
  document.body.appendChild(t);
  window._undoData = window._undoData || {};
  window._undoData[tid] = { idx: i, sess: removed };
  window._undoDelSession = function(id) {
    const d = (window._undoData||{})[id];
    if (!d) return;
    sessions.splice(d.idx, 0, d.sess);
    saveAll(); renderAllenamento();
    document.getElementById(id)?.remove();
  };
  setTimeout(() => { document.getElementById(tid)?.remove(); delete (window._undoData||{})[tid]; }, 4000);
}

function switchAlTab(tab, _unused){
  ['sessioni','programma','calendario','esplora'].forEach(t=>{
    const bt=document.getElementById('alt-'+t);
    const ct=document.getElementById('alt-'+t+'-content');
    if(bt) bt.classList.toggle('on',t===tab);
    if(ct) ct.style.display=t===tab?'block':'none';
  });
  if(tab==='programma') renderWeeklyProgram();
  if(tab==='esplora'){ if(typeof renderEsploraV20==='function') renderEsploraV20(); else if(typeof renderPresetExplorer==='function') renderPresetExplorer(); }
  if(tab==='calendario') renderMonthCalendar();
  if(tab==='sessioni'){
    renderAllenamento();
    if(typeof renderPresetsInTraining==='function') renderPresetsInTraining();
  }
}
function humanDiff(d){
  if(d==='advanced') return 'Avanzato';
  if(d==='beginner') return 'Principiante';
  return 'Intermedio';
}
function goalLabel(g){
  const m={hypertrophy:'Ipertrofia',strength:'Forza',fat_loss:'Definizione',endurance:'Resistenza',calisthenics:'Skill calisthenics',mobility:'Mobilita'};
  return m[g]||'Performance generale';
}
function isFundamentalEx(ex){
  const meta=EX_DB.find(e=>e.id===ex.id);
  const nm=(meta?.name||ex.name||'').toLowerCase();
  return !!(meta?.fundamental || nm.includes('panca') || nm.includes('squat') || nm.includes('stacco') || nm.includes('deadlift') || nm.includes('bench'));
}
function normalizeProgramSets(program){
  if(!program?.days) return program;
  (program.days||[]).forEach(day=>{
    (day.exercises||[]).forEach(ex=>{
      ex.s=String(isFundamentalEx(ex)?4:3);
    });
  });
  return program;
}
function exerciseTechnique(exId){
  const g=EX_GUIDES[exId];
  if(g) return g.steps?.[0]||'Controlla assetto e traiettoria.';
  return 'Movimento controllato, ROM completo e stabilita del core.';
}
function renderWeeklyProgram(){
  const root=document.getElementById('weekly-program-view');
  if(!root) return;
  const typeOptions=['all','push','pull','lower','full','calisthenics','cardio','custom'];
  const presetRaw=(profile.recPreset&&PRESETS_DATA.find(x=>x.id===profile.recPreset))||PRESETS_DATA[0];
  const preset=normalizeProgramSets(JSON.parse(JSON.stringify(presetRaw)));
  const goals=(profile.goals||[]).map(goalLabel).join(' · ')||'Performance generale';
  const activeDays=preset.days.filter(d=>!d.rest&&(trainingTypeFilter==='all'||d.type===trainingTypeFilter));
  const daysHtml=activeDays.map((d,i)=>{
    const dtc=TC[d.type]||TC.custom;
    const exRows=(d.exercises||[]).map(ex=>{
      const exd=EX_DB.find(e=>e.id===ex.id)||{name:ex.id,tags:['muscolo'],icon:'🏋️'};
      const guide=EX_GUIDES[ex.id];
      return `<div class="wp-ex-row" onclick="openExDetail('${ex.id}')">
        <div class="wp-ex-ico">${exd.icon||'🏋️'}</div>
        <div class="wp-ex-info">
          <div class="wp-ex-nm">${exd.name}</div>
          <div class="wp-ex-sets">${ex.s||'3'} serie · ${ex.r||'10'} reps · recupero ${ex.rs||'75s'}</div>
          <div class="wp-ex-sets" style="margin-top:4px;color:var(--text3)">Tecnica: ${exerciseTechnique(ex.id)} · Livello: ${guide?.difficulty||'Intermedio'}</div>
        </div>
        <span class="wp-ex-muscle" style="background:${dtc.bg};color:${dtc.c}">${(exd.tags&&exd.tags[0])||'focus'}</span>
      </div>`;
    }).join('');
    return `<div class="wp-day-card">
      <div class="wp-day-head" onclick="toggleWpDay(${i})">
        <div class="wp-day-icon" style="background:${dtc.bg};color:${dtc.c}">${d.type==='cardio'?'🔥':d.type==='lower'?'🦵':d.type==='pull'?'🟢':d.type==='push'?'🔴':'🏋️'}</div>
        <div style="flex:1"><div class="wp-day-nm">${d.name}</div><div class="wp-day-sub">${(d.exercises||[]).length} esercizi pianificati</div></div>
      </div>
      <div class="wp-day-body${i===0?' open':''}" id="wpd-${i}">${exRows||'<div class="wp-rest-row">Nessun esercizio disponibile</div>'}</div>
    </div>`;
  }).join('');
  const envBadge = preset.env ? ({calisthenics:'🤸 Corpo libero',gym:'🏋️ Palestra',hybrid:'🔀 Ibrido',home:'🏠 Casa'}[preset.env]||preset.env) : '';
  root.innerHTML=`
    <div style="background:linear-gradient(135deg,rgba(200,245,60,.07),rgba(200,245,60,.03));border:1.5px solid rgba(200,245,60,.25);border-radius:var(--r-lg);padding:16px;margin-bottom:14px;position:relative;overflow:hidden;">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--acc),var(--green));"></div>
      <div style="font-size:9px;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px;">⚡ PROGRAMMA ATTIVO</div>
      <div style="display:flex;align-items:flex-start;gap:12px;">
        <div style="font-size:36px;flex-shrink:0;line-height:1;">${preset.icon}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:17px;font-weight:800;line-height:1.2;margin-bottom:4px;">${preset.name}</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.5;margin-bottom:8px;">${preset.desc}</div>
          <div style="display:flex;flex-wrap:wrap;gap:5px;">
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--acc3);color:var(--acc);">${humanDiff(preset.diff)}</span>
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2);">${preset.days.filter(d=>!d.rest).length} giorni/sett</span>
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2);">⏱ ${preset.dur} min</span>
            ${envBadge?`<span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2);">${envBadge}</span>`:''}
          </div>
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-top:12px;">
        <button onclick="switchAlTab('esplora',null)" style="flex:1;padding:9px;background:rgba(200,245,60,.08);border:1px solid rgba(200,245,60,.2);border-radius:var(--r-sm);color:var(--acc);font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">🔄 Cambia</button>
        <button onclick="startPresetDay('${preset.id}',0)" style="flex:1;padding:9px;background:var(--acc);color:#080810;border:none;border-radius:var(--r-sm);font-family:'Syne',sans-serif;font-size:12px;font-weight:800;cursor:pointer;">▶ Avvia</button>
      </div>
    </div>
    <div style="font-size:11px;color:var(--text2);margin-bottom:10px;padding:0 2px;">🎯 Obiettivo: <b style="color:var(--acc)">${goals}</b></div>
    <div class="tt-filters" style="margin-bottom:10px;">${typeOptions.map(tp=>`<button class="tt-chip${tp===trainingTypeFilter?' on':''}" onclick="setTrainingTypeFilter('${tp}',this)">${tp==='all'?'Tutti':tp}</button>`).join('')}</div>
    ${daysHtml||'<div class="empty-state"><div class="es-txt">Nessun giorno trovato per questa tipologia.</div></div>'}`;
}
function setTrainingTypeFilter(tp,btn){
  trainingTypeFilter=tp;
  document.querySelectorAll('.tt-chip').forEach(c=>c.classList.remove('on'));
  btn.classList.add('on');
  renderWeeklyProgram();
}
function toggleWpDay(i){document.getElementById('wpd-'+i)?.classList.toggle('open');}
function renderPresetExplorer(){
  const root=document.getElementById('esplora-preset-view');
  if(!root) return;

  const rec = profile.recPreset ? PRESETS_DATA.find(x=>x.id===profile.recPreset) : null;
  const sorted = rec
    ? [rec, ...PRESETS_DATA.filter(p=>p.id!==rec.id)]
    : PRESETS_DATA;

  root.innerHTML = sorted.map((p,i)=>{
    const tc=TC[p.t]||TC.custom;
    const activeDays=(p.days||[]).filter(d=>!d.rest);
    const isRec = rec && p.id===rec.id;
    const diffLabel = humanDiff(p.diff);
    const diffBg = p.diff==='beginner'?'var(--green-d)':p.diff==='advanced'?'var(--red-d)':'var(--orange-d)';
    const diffC  = p.diff==='beginner'?'var(--green)':p.diff==='advanced'?'var(--red)':'var(--orange)';

    return `<div class="ep-card" style="
        background:${isRec?'linear-gradient(135deg,rgba(200,245,60,.07),rgba(200,245,60,.03))':'var(--bg2)'};
        border:1.5px solid ${isRec?'rgba(200,245,60,.28)':'var(--border)'};
        border-radius:var(--r-lg);margin-bottom:10px;overflow:hidden;position:relative;">
      ${isRec?`<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--acc),var(--green))"></div>`:''}

      
      <div onclick="toggleEpCard(${i})" style="padding:16px;cursor:pointer;display:flex;align-items:flex-start;gap:12px;">
        <div style="font-size:28px;flex-shrink:0;">${p.icon}</div>
        <div style="flex:1;min-width:0;">
          ${isRec?`<div style="font-size:9px;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px">🎯 Consigliato per te</div>`:''}
          <div style="font-size:15px;font-weight:800;letter-spacing:-.2px;">${p.name}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:3px;line-height:1.5;">${p.desc}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px;">
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:${tc.bg};color:${tc.c};">${p.t}</span>
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:${diffBg};color:${diffC};">${diffLabel}</span>
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2);">${activeDays.length} giorni/sett.</span>
            <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2);">${p.dur} min</span>
          </div>
          ${getCycleBadgeHtml()}
        </div>
        <div id="ep-arrow-${i}" style="font-size:16px;color:var(--text3);flex-shrink:0;transition:transform .25s cubic-bezier(.22,1,.36,1);">›</div>
      </div>

      
      <div class="ep-card-body" id="epb-${i}" style="display:none;border-top:1px solid var(--border);">
        
        <div style="padding:12px 16px 4px;">
          <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:10px;">Programma settimanale</div>
          ${(p.days||[]).map(d=>{
            const dtc=TC[d.type]||TC.custom;
            return `<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border);">
              <div style="font-size:18px;flex-shrink:0;">${d.rest?'🛌':'💪'}</div>
              <div style="flex:1;">
                <div style="font-size:13px;font-weight:700;">${d.name}</div>
                ${d.rest?'<div style="font-size:11px;color:var(--text3);">Giorno di recupero</div>':`
                  <div style="font-size:11px;color:var(--text2);margin-top:2px;">${(d.exercises||[]).map(ex=>{
                    const xd=EX_DB.find(e=>e.id===ex.id)||{name:ex.id};
                    return `${xd.name} ${ex.s}×${ex.r}`;
                  }).join(' · ')}</div>`}
              </div>
              ${!d.rest?`<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;background:${dtc.bg};color:${dtc.c};flex-shrink:0;">${d.type}</span>`:''}
            </div>`;
          }).join('')}
        </div>

        
        <div style="padding:12px 16px 16px;">
          <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">Scegli il giorno da avviare</div>
          <div style="display:flex;flex-direction:column;gap:6px;" id="ep-day-sel-${i}">
            ${activeDays.map((d,di)=>`
              <button onclick="startPresetDay('${p.id}',${p.days.indexOf(d)})"
                style="width:100%;padding:11px 14px;text-align:left;background:var(--bg3);
                  border:1px solid var(--border);border-radius:var(--r-sm);
                  font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text);
                  cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:10px;"
                onmouseover="this.style.borderColor='var(--acc)';this.style.background='var(--acc4)'"
                onmouseout="this.style.borderColor='var(--border)';this.style.background='var(--bg3)'">
                <span style="font-size:16px;">▶</span>
                <span>${d.name}</span>
                <span style="margin-left:auto;font-size:11px;color:var(--text2);font-weight:400;">${(d.exercises||[]).length} esercizi</span>
              </button>`).join('')}
          </div>
          <button onclick="startPreset(PRESETS_DATA.find(x=>x.id==='${p.id}'))"
            style="width:100%;padding:13px;background:${isRec?'var(--acc)':'var(--bg3)'};
              color:${isRec?'#080810':'var(--acc)'};
              border:1.5px solid ${isRec?'var(--acc)':'rgba(200,245,60,.3)'};
              border-radius:var(--r-sm);font-family:'Syne',sans-serif;font-size:13px;font-weight:800;
              cursor:pointer;transition:all .15s;letter-spacing:.02em;margin-top:8px;">
            ⚡ Avvia primo giorno
          </button>
          <button id="btn-add-my-${p.id}" onclick="toggleMyPreset('${p.id}',this)"
            style="width:100%;padding:10px;margin-top:6px;
              background:${(profile.myPresets||[]).includes(p.id)?'rgba(200,245,60,.12)':'var(--bg4)'};
              border:1px solid ${(profile.myPresets||[]).includes(p.id)?'rgba(200,245,60,.3)':'var(--border)'};
              border-radius:var(--r-sm);font-family:'Syne',sans-serif;font-size:12px;font-weight:700;
              color:${(profile.myPresets||[]).includes(p.id)?'var(--acc)':'var(--text2)'};
              cursor:pointer;transition:all .15s;">
            ${(profile.myPresets||[]).includes(p.id) ? '★ Nei miei preset' : '☆ Aggiungi ai miei preset'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
  // Aggiorna sezione "I miei preset"
  if(typeof renderMyPresetsSection === 'function') renderMyPresetsSection();
}


/* ─── I MIEI PRESET ─────────────────────────── */
function toggleMyPreset(pid, btn) {
  if (!profile.myPresets) profile.myPresets = [];
  const idx = profile.myPresets.indexOf(pid);
  if (idx >= 0) {
    profile.myPresets.splice(idx, 1);
    if (btn) {
      btn.textContent = '☆ Aggiungi ai miei preset';
      btn.style.background = 'var(--bg4)';
      btn.style.borderColor = 'var(--border)';
      btn.style.color = 'var(--text2)';
    }
    if (typeof showToast === 'function') showToast('Rimosso dai tuoi preset');
  } else {
    profile.myPresets.push(pid);
    if (btn) {
      btn.textContent = '★ Nei miei preset';
      btn.style.background = 'var(--acc3)';
      btn.style.borderColor = 'rgba(200,245,60,.3)';
      btn.style.color = 'var(--acc)';
    }
    if (typeof showToast === 'function') showToast('✅ Aggiunto ai tuoi preset!');
  }
  if (typeof saveAll === 'function') saveAll();
  // Aggiorna sezione "I miei preset"
  renderMyPresetsSection();
}

function renderMyPresetsSection() {
  const wrap = document.getElementById('my-presets-section');
  if (!wrap) return;
  const myIds = profile.myPresets || [];
  if (myIds.length === 0) {
    wrap.innerHTML = `<div style="font-size:12px;color:var(--text3);text-align:center;padding:12px 0;font-style:italic;">Nessun preset salvato. Esplora i preset e aggiungi quelli che ti piacciono.</div>`;
    return;
  }
  const recId = profile.recPreset;
  wrap.innerHTML = myIds.map(pid => {
    const p = PRESETS_DATA.find(x => x.id === pid);
    if (!p) return '';
    const isRec = pid === recId;
    const tc = TC[p.t] || TC.custom;
    return `<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;
        background:${isRec ? 'rgba(200,245,60,.08)' : 'var(--bg3)'};
        border:1.5px solid ${isRec ? 'rgba(200,245,60,.3)' : 'var(--border)'};
        border-radius:var(--r-lg);margin-bottom:8px;position:relative;overflow:hidden;">
      ${isRec ? '<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:var(--acc);"></div>' : ''}
      <div style="font-size:26px;">${p.icon}</div>
      <div style="flex:1;min-width:0;">
        ${isRec ? '<div style="font-size:9px;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.1em;margin-bottom:2px;">🎯 Consigliato per te</div>' : ''}
        <div style="font-size:14px;font-weight:800;">${p.name}</div>
        <div style="font-size:11px;color:var(--text2);margin-top:2px;">${p.days.filter(d=>!d.rest).length} giorni · ${p.dur} min</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;align-items:flex-end;">
        <button onclick="startPreset(PRESETS_DATA.find(x=>x.id==='${p.id}'))"
          style="padding:8px 14px;background:${isRec?'var(--acc)':'var(--bg4)'};color:${isRec?'#080810':'var(--acc)'};
            border:1px solid ${isRec?'var(--acc)':'rgba(200,245,60,.3)'};border-radius:99px;
            font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">
          ▶ Avvia
        </button>
        <button onclick="toggleMyPreset('${p.id}',this)"
          style="padding:5px 10px;background:transparent;border:none;
            font-family:'Syne',sans-serif;font-size:11px;color:var(--text3);cursor:pointer;">
          Rimuovi
        </button>
      </div>
    </div>`;
  }).join('');
}

function toggleEpCard(i){
  const body=document.getElementById('epb-'+i);
  const arrow=document.getElementById('ep-arrow-'+i);
  if(!body) return;
  const open = body.style.display==='none';
  body.style.display=open?'block':'none';
  if(arrow) arrow.style.transform=open?'rotate(90deg)':'rotate(0deg)';
}

/** Start a specific day of a preset by preset id + day index */
function startPresetDay(presetId, dayIndex){
  const preset = PRESETS_DATA.find(x=>x.id===presetId);
  if(!preset){ showToast('Preset non trovato'); return; }
  const day = preset.days[dayIndex];
  if(!day||day.rest){ showToast('⚠️ Giorno di riposo — scegli un altro giorno'); return; }
  const normalized = normalizeProgramSets(JSON.parse(JSON.stringify(preset)));
  const normDay = normalized.days[dayIndex];
  // Close any open subscreen or overlay
  document.querySelectorAll('.subscreen.open').forEach(s=>s.classList.remove('open'));
  beginWorkout(normalized, normDay);
  showToast(`▶ Avvio: ${normDay.name}`);
}

// ── BUILDER ───────────────────────────────
function openNewSession(){
  editProg={id:Date.now(),name:'',type:'calisthenics',duration:'55',difficulty:'intermediate',days:[]};
  renderBuilder();openSub('sub-new-sess');
}
function renderBuilder(){
  const _bn=document.getElementById('b-name'); if(_bn) _bn.value=editProg.name||'';
  const _bt=document.getElementById('b-type'); if(_bt) _bt.value=editProg.type||'calisthenics';
  const _bd=document.getElementById('b-dur'); if(_bd) _bd.value=editProg.duration||'55';
  const _bdf=document.getElementById('b-diff'); if(_bdf) _bdf.value=editProg.difficulty||'intermediate';
  renderDays();
}
function renderDays(){const el=document.getElementById('days-builder');if(el)el.innerHTML=(editProg.days||[]).map((d,i)=>dayHTML(d,i)).join('');}
function dayHTML(d,i){
  const tc=TC[d.type]||TC.custom;
  const exH=d.rest?'':(d.exercises||[]).map((ex,j)=>exItemHTML(ex,i,j)).join('');
  return `<div class="day-blk" id="db-${i}">
    <div class="day-hd" onclick="toggleDay(${i})">
      <span class="day-arr" id="da-${i}">▶</span>
      <input class="day-nm-inp" value="${d.name||'Giorno '+(i+1)}" onchange="editProg.days[${i}].name=this.value" onclick="event.stopPropagation()">
      <button class="day-type-btn" style="background:${tc.bg};color:${tc.c}" onclick="event.stopPropagation();cycleType(${i})">${d.type}</button>
      <button class="day-rm" onclick="event.stopPropagation();removeDay(${i})">✕</button>
    </div>
    <div class="day-bd" id="dbd-${i}">
      <label class="rest-sw-row" onclick="toggleRest(${i})"><div class="sw${d.rest?' on':''}" id="rsw-${i}"></div><span>Giorno di riposo</span></label>
      ${d.rest?'':`<div id="exl-${i}">${exH}</div><button class="add-ex-btn" onclick="openExSheet(${i})">＋ Aggiungi esercizio</button>`}
    </div>
  </div>`;
}
function exItemHTML(ex,di,j){
  const exD=EX_DB.find(e=>e.id===ex.id)||{name:ex.name||ex.id,m:'custom'};
  const tc=TC[exD.m]||TC.custom;
  return `<div class="ex-item">
    <span class="ex-drag">⠿</span>
    <div class="ex-body">
      <div class="ex-nm"><span style="font-size:10px;background:${tc.bg};color:${tc.c};padding:2px 7px;border-radius:99px;margin-right:6px">${exD.m}</span>${exD.name}</div>
      <div class="params">
        <div class="param-w"><input class="param-in" value="${ex.s||'3'}" onchange="editProg.days[${di}].exercises[${j}].s=this.value"><div class="param-lbl">Serie</div></div>
        <div class="param-w"><input class="param-in" value="${ex.r||'10'}" onchange="editProg.days[${di}].exercises[${j}].r=this.value"><div class="param-lbl">Reps</div></div>
        <div class="param-w"><input class="param-in" value="${ex.rs||'75s'}" onchange="editProg.days[${di}].exercises[${j}].rs=this.value"><div class="param-lbl">Riposo</div></div>
      </div>
    </div>
    <button class="ex-del" onclick="removeEx(${di},${j})">✕</button>
  </div>`;
}
function toggleDay(i){const b=document.getElementById('dbd-'+i),a=document.getElementById('da-'+i);b.classList.toggle('open');a.classList.toggle('open');}
const TYPES_CYC=['push','pull','lower','full','calisthenics','cardio','skill','rest','custom'];
function cycleType(i){const ci=TYPES_CYC.indexOf(editProg.days[i].type||'push');editProg.days[i].type=TYPES_CYC[(ci+1)%TYPES_CYC.length];renderDays();}
function toggleRest(i){editProg.days[i].rest=!editProg.days[i].rest;if(editProg.days[i].rest){editProg.days[i].type='rest';editProg.days[i].exercises=[];}renderDays();document.getElementById('dbd-'+i)?.classList.add('open');document.getElementById('da-'+i)?.classList.add('open');}
function removeDay(i){editProg.days.splice(i,1);renderDays();}
function removeEx(di,j){editProg.days[di].exercises.splice(j,1);refreshDay(di);}
function refreshDay(di){const el=document.getElementById('exl-'+di);if(el)el.innerHTML=(editProg.days[di].exercises||[]).map((ex,j)=>exItemHTML(ex,di,j)).join('');}
function addDay(){editProg.days.push({name:'Giorno '+(editProg.days.length+1),type:'push',rest:false,exercises:[]});renderDays();}
async function saveProgram(){
  const nm=document.getElementById('b-name').value.trim();
  if(!nm){showToast('⚠️ Inserisci un nome!');return;}
  editProg.name=nm;editProg.type=document.getElementById('b-type').value;
  editProg.duration=document.getElementById('b-dur').value;
  editProg.difficulty=document.getElementById('b-diff').value;
  normalizeProgramSets(editProg);
  const activeDays=editProg.days.filter(d=>!d.rest);
  if(!activeDays.length){showToast('⚠️ Aggiungi almeno un giorno!');return;}
  closeSub('sub-new-sess');
  beginWorkout(editProg,activeDays[0]);
}

// ── WORKOUT ACTIVE ────────────────────────
function startPreset(preset){
  // Close any open subscreen (sub-workout, sub-new-sess, etc.)
  document.querySelectorAll('.subscreen.open').forEach(s=>s.classList.remove('open'));
  const normalized=normalizeProgramSets(JSON.parse(JSON.stringify(preset)));
  const activeDays=normalized.days.filter(d=>!d.rest);
  if(!activeDays.length){showToast('Nessun giorno attivo nel programma');return;}
  beginWorkout(normalized,activeDays[0]);
}

function beginWorkout(prog,day){
  woProgram=prog;woDayData=day;woSets={};woWeights={};woStart=Date.now();
  const _wonm=document.getElementById('wo-nm'); if(_wonm) _wonm.textContent=(prog.name||'Allenamento').toUpperCase();
  const _woday=document.getElementById('wo-day'); if(_woday) _woday.textContent=day.name;
  renderWoExs();
  const _woovl=document.getElementById('wo-ovl'); if(_woovl) _woovl.classList.add('open');
  woTimer=setInterval(()=>{
    const s=Math.floor((Date.now()-woStart)/1000);
    const _wot=document.getElementById('wo-time'); if(_wot) _wot.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
  },1000);
}
function renderWoExs(){
  const exs=woDayData.exercises||[];
  const totalSets=exs.reduce((a,ex)=>a+safeSets(ex.s),0);
  const doneSetsCount=Object.keys(woSets).filter(k=>woSets[k]).length;
  const pct=totalSets>0?Math.round(doneSetsCount/totalSets*100):0;
  const progFill=document.getElementById('wo-prog-fill');
  const pctLabel=document.getElementById('wo-pct-label');
  if(progFill) progFill.style.width=pct+'%';
  if(pctLabel) pctLabel.textContent=pct+'% completato';

  const _woExsEl=document.getElementById('wo-exs'); if(_woExsEl) _woExsEl.innerHTML=exs.map((ex,ei)=>{
    const exD=EX_DB.find(e=>e.id===ex.id)||{name:ex.name||ex.id,tags:[]};
    const sets=safeSets(ex.s);
    const isPushPull=ex.id&&!['burpees','mt-cl','jump-j','hi-kn','sprint','plank','side-plank','hollow','lsit','hshold'].includes(ex.id);
    return `<div class="wo-ex-card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
        <div class="wo-ex-nm" style="margin-bottom:0">${exD.name}</div>
        <div style="display:flex;gap:5px;flex-shrink:0;">
        </div>
      </div>
      ${(()=>{try{const prog=typeof checkAutoProgression==='function'?checkAutoProgression(ex.id):null;return prog?`<div style="font-size:11px;color:var(--acc);background:rgba(200,245,60,.08);border:1px solid rgba(200,245,60,.2);border-radius:8px;padding:5px 10px;margin-bottom:8px;">${prog.message}</div>`:'';} catch(e){return '';} })()}
      ${(()=>{try{const smartSec=typeof getSmartRestTime==='function'?getSmartRestTime(ex.id,ex.rs):parseRest(ex.rs||'75s');return `<div style="font-size:10px;color:var(--text3);margin-bottom:8px;">⏱ Riposo consigliato: <strong style="color:var(--text2)">${smartSec}s</strong></div>`;}catch(e){return '';}})()}
      ${Array.from({length:sets},(_,si)=>{
        const done=!!woSets[ei+'_'+si];
        const wKey='wo_w_'+ei+'_'+si;
        const savedW=woWeights[wKey]||'';
        return `<div class="wo-set-row${done?' done':''}" style="cursor:default;display:block;padding:10px 13px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="wo-set-n">Serie ${si+1}</div>
            <div class="wo-set-info" style="flex:1">${ex.r||'10'} reps · riposo ${ex.rs||'75s'}</div>
            ${isPushPull?`<div style="display:flex;align-items:center;gap:4px;">
              <input type="number" inputmode="decimal" placeholder="kg" min="0" max="999" step="0.5"
                value="${savedW}"
                onchange="const v=parseFloat(this.value);if(v<0||isNaN(v)){this.value='';this.style.borderColor='var(--red)';if(typeof showToast==='function')showToast('⚠️ Peso non valido');return;}this.style.borderColor='';woWeights['${wKey}']=this.value;_autoSaveWorkout()"
                onclick="event.stopPropagation()"
                style="width:54px;background:var(--bg4);border:1px solid ${done?'var(--acc)':'var(--border)'};border-radius:var(--r-sm);padding:5px 7px;font-size:12px;font-family:'DM Mono',monospace;color:var(--text);text-align:center;outline:none;transition:border-color .15s;">
              <span style="font-size:10px;color:var(--text3)">kg</span>
            </div>`:''}
            <div class="wo-set-chk" onclick="toggleWoSet(${ei},${si},'${ex.rs||'75s'}')" style="cursor:pointer;padding:4px;font-size:20px;">${done?'✅':'○'}</div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
}

// Apre la guida esercizio senza chiudere l'allenamento
function openExDetailInWorkout(exId){
  if(!exId) return;
  openExDetail(exId);
}
function toggleWoSet(ei,si,rs){
  woSets[ei+'_'+si]=!woSets[ei+'_'+si];
  renderWoExs();
  if(woSets[ei+'_'+si]){
    // Determina il prossimo esercizio
    const exs=woDayData.exercises||[];
    const sets=safeSets(exs[ei]?.s);
    let nextName='';
    if(si+1 < sets){
      nextName='Serie '+(si+2)+' — '+(exs[ei]?.name||EX_DB.find(e=>e.id===exs[ei]?.id)?.name||'');
    } else if(exs[ei+1]){
      const nex=EX_DB.find(e=>e.id===exs[ei+1].id);
      nextName=nex?.name||exs[ei+1].name||exs[ei+1].id;
    }
    const smartSec = getSmartRestTime(exs[ei]?.id, rs);
    startRest(smartSec, nextName);
    // Autosave durante l'allenamento
    _autoSaveWorkout();
  }
}
function _autoSaveWorkout(){
  try{
    const snap={progName:woProgram?.name,dayName:woDayData?.name,woSets:{...woSets},start:woStart,ts:Date.now()};
    localStorage.setItem('ft_wo_autosave',JSON.stringify(snap));
  }catch(e){}
}
function _clearAutoSave(){localStorage.removeItem('ft_wo_autosave');}
function _checkAutoSaveOnLoad(){
  try{
    const raw=localStorage.getItem('ft_wo_autosave');
    if(!raw) return;
    const snap=JSON.parse(raw);
    if(!snap||!snap.progName) return;
    const ageMin=Math.round((Date.now()-snap.ts)/60000);
    if(ageMin>180){localStorage.removeItem('ft_wo_autosave');return;}
    setTimeout(()=>{
      const ok=confirm(`⚠️ Allenamento non concluso rilevato!\n"${snap.progName} — ${snap.dayName}" (${ageMin} min fa)\n\nRiprendere?`);
      if(!ok){localStorage.removeItem('ft_wo_autosave');return;}
      // Ricostruisce la sessione
      const preset=PRESETS_DATA.find(p=>p.name===snap.progName||p.id===snap.progName);
      if(!preset){showToast('⚠️ Programma non trovato');localStorage.removeItem('ft_wo_autosave');return;}
      const day=preset.days?.find(d=>d.name===snap.dayName);
      if(!day){showToast('⚠️ Giorno non trovato');localStorage.removeItem('ft_wo_autosave');return;}
      woSets=snap.woSets||{};
      woStart=snap.start||Date.now();
      beginWorkout(normalizeProgramSets(JSON.parse(JSON.stringify(preset))),day);
      showToast('✅ Sessione ripristinata!');
    },1200);
  }catch(e){localStorage.removeItem('ft_wo_autosave');}
}
function parseRest(s){const m=(s||'').match(/(\d+)/);return m?parseInt(m[1]):75;}

/* ══ SMART REST TIMER — riposo variabile per tipo esercizio ══ */
function getSmartRestTime(exId, defaultRs) {
  const _exdb = (typeof EX_DB !== 'undefined' && Array.isArray(EX_DB)) ? EX_DB : [];
  const exD = _exdb.find(e => e.id === exId) || {};
  const isCardioCore = ['burpees','mt-cl','jump-j','hi-kn','sprint','plank','side-plank',
    'hollow','lsit','hshold','jumping-jack','mountain-climber'].includes(exId);
  const isCompound = !!(exD.fundamental) || ['bs','dl','bp','mil-press','squat-w','pull-up-w',
    'dips-w','chin-up','lat-pull','seated-row','rdl','hip-thr'].includes(exId);
  const isMachineIso = !!(exD.machine) && !isCompound;
  if (isCardioCore) return 30;
  if (isMachineIso) return 45;
  if (isCompound) return 120;
  if (defaultRs) return parseRest(defaultRs);
  return 75;
}
window.getSmartRestTime = getSmartRestTime;

/* ══ EXERCISE VARIANTS — alternativa senza macchinario ══ */
const EX_VARIANTS = {
  'lat-pull':{alt:'pull-up-w',reason:'Sbarra al posto della lat machine'},
  'lat-mach':{alt:'pull-up-w',reason:'Sbarra al posto della lat machine'},
  'seated-row':{alt:'row',reason:'Rematore con manubrio/elastico'},
  'cable-row':{alt:'row',reason:'Rematore con manubrio'},
  'leg-press':{alt:'squat-w',reason:'Squat a corpo libero/goblet squat'},
  'hack-sq':{alt:'bs',reason:'Squat con bilanciere'},
  'leg-ext':{alt:'bss',reason:'Bulgarian split squat per i quadricipiti'},
  'leg-curl':{alt:'nordic',reason:'Nordic curl / Romanian deadlift'},
  'pec-deck':{alt:'push-up-w',reason:'Push-up largo per il petto'},
  'mac-pec-deck':{alt:'push-up-w',reason:'Push-up largo per il petto'},
  'mac-chest-press':{alt:'bp',reason:'Panca con manubri'},
  'tri-dip-mach':{alt:'dips-w',reason:'Dip alle parallele'},
  'calf-mach':{alt:'calf',reason:'Calf raise su scalino'},
  'abductor':{alt:'glute-b',reason:'Glute bridge con elastico'},
  'ab-roll':{alt:'hollow',reason:'Hollow body/plank avanzato'},
  'mac-shoulder-press':{alt:'ohp',reason:'Overhead press con manubri'},
  'face-pull-c':{alt:'face-pull',reason:'Face pull con elastico'},
};
window.suggestExVariant = function(exId) {
  const v = EX_VARIANTS[exId]; if (!v) return null;
  const _exdb = (typeof EX_DB !== 'undefined' && Array.isArray(EX_DB)) ? EX_DB : [];
  const altEx = _exdb.find(e => e.id === v.alt);
  return altEx ? {...v, altEx} : null;
};

/* ══ MACHINE LOG — traccia il macchinario usato ══ */
window.woMachineLog = {};
window.logMachineUsed = function(ei, machineName) {
  if (!machineName) return;
  window.woMachineLog[ei] = {machine:machineName, ts:Date.now()};
  try {
    const stored = JSON.parse(localStorage.getItem('ft_machine_log') || '{}');
    const exId = woDayData?.exercises?.[ei]?.id || 'unknown';
    if (!stored[exId]) stored[exId] = [];
    stored[exId].push({machine:machineName, date:today(), gym:profile.gym||''});
    if (stored[exId].length > 20) stored[exId].shift();
    localStorage.setItem('ft_machine_log', JSON.stringify(stored));
  } catch(e) {}
  showToast('\u2705 Macchinario salvato: ' + machineName);
};
window.getMachineHistory = function(exId) {
  try { return JSON.parse(localStorage.getItem('ft_machine_log') || '{}')[exId] || []; }
  catch(e) { return []; }
};

/* ══ AUTO PROGRESSIONE — +peso dopo 3 sessioni uguali ══ */
window.checkAutoProgression = function(exId) {
  try {
    const db = JSON.parse(localStorage.getItem('ft_ex_weights') || '{}');
    const history = db[exId] || [];
    if (history.length < 3) return null;
    const last3 = history.slice(-3);
    const sameWeight = last3.every(e => e.kg && e.kg === last3[0].kg && e.kg > 0);
    const allCompleted = last3.every(e => e.completed);
    if (!sameWeight || !allCompleted) return null;
    const currentKg = parseFloat(last3[0].kg);
    const _exdb4 = (typeof EX_DB !== 'undefined' && Array.isArray(EX_DB)) ? EX_DB : [];
    const ex = _exdb4.find(e => e.id === exId) || {};
    const isLower = ex.m === 'lower' || ['bs','dl','rdl','leg-press'].includes(exId);
    const increment = isLower ? 2.5 : 1.25;
    return {currentKg, increment, suggested: currentKg+increment,
      message: '\uD83C\uDFAF Aumenta a '+(currentKg+increment)+' kg (+'+increment+'kg)'};
  } catch(e) { return null; }
};
window.saveExWeightHistory = function(exId, kg, completed) {
  try {
    const db = JSON.parse(localStorage.getItem('ft_ex_weights') || '{}');
    if (!db[exId]) db[exId] = [];
    db[exId].push({kg:parseFloat(kg)||0, completed, date:today()});
    if (db[exId].length > 30) db[exId].shift();
    localStorage.setItem('ft_ex_weights', JSON.stringify(db));
  } catch(e) {}
};

/* ══ DELOAD AUTOMATICO — dopo 4 settimane di training ══ */
window.checkDeloadNeeded = function() {
  try {
    const WEEKS = 4;
    const weekMs = 7*24*3600*1000;
    const lastDeload = localStorage.getItem('ft_last_deload');
    const ref = lastDeload ? new Date(parseInt(lastDeload)) : new Date(Date.now() - WEEKS*weekMs);
    const _sess = (typeof sessions !== 'undefined' && Array.isArray(sessions)) ? sessions : [];
    const recentSessions = _sess.filter(s => new Date(s.date) >= ref);
    const trainingWeeks = new Set(recentSessions.map(s => {
      const d = new Date(s.date);
      return d.getFullYear()+'-W'+Math.floor((d-new Date(d.getFullYear(),0,1))/weekMs);
    })).size;
    return trainingWeeks >= WEEKS;
  } catch(e) { return false; }
};
window.confirmDeload = function() {
  localStorage.setItem('ft_last_deload', Date.now().toString());
  showToast('\u2705 Deload registrato. Lavora al 60% questa settimana!');
  document.getElementById('ft-deload-banner')?.remove();
};
window.showDeloadBannerIfNeeded = function() {
  if (!checkDeloadNeeded() || document.getElementById('ft-deload-banner')) return;
  const homeBody = document.getElementById('h-body') || document.getElementById('page-home');
  if (!homeBody) return;
  const banner = document.createElement('div');
  banner.id = 'ft-deload-banner';
  banner.style.cssText = 'margin:0 16px 14px;padding:14px 16px;background:linear-gradient(135deg,rgba(168,126,248,.12),rgba(168,126,248,.05));border:1.5px solid rgba(168,126,248,.35);border-radius:16px;';
  banner.innerHTML = [
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">',
    '<span style="font-size:22px">😴</span>',
    '<div><div style="font-size:13px;font-weight:800;color:var(--purple)">Deload Consigliato</div>',
    '<div style="font-size:11px;color:var(--text2)">Hai allenato 4+ settimane consecutive</div></div></div>',
    '<div style="font-size:12px;color:var(--text2);margin-bottom:10px;line-height:1.6">Una settimana a 60% del volume ti permetterà di recuperare e tornare più forte.</div>',
    '<div style="display:flex;gap:8px;">',
    '<button onclick="confirmDeload()" style="flex:1;padding:9px;background:var(--purple);color:white;border:none;border-radius:10px;font-family:Syne,sans-serif;font-size:12px;font-weight:800;cursor:pointer;">✓ Inizia deload</button>',
    '<button onclick="this.closest(\'#ft-deload-banner\') && this.closest(\'[id]\').remove()" style="padding:9px 14px;background:var(--bg4);border:1px solid var(--border);border-radius:10px;font-family:Syne,sans-serif;font-size:12px;color:var(--text2);cursor:pointer;">Ignora</button>',
    '</div>'
  ].join('');
  try { homeBody.insertBefore(banner, homeBody.firstChild); } catch(e) { homeBody.appendChild(banner); }
};

function startRest(sec, nextExName){
  restTot=sec;restLeft=sec;
  // Vibrazione feedback tattile (se supportata)
  if(navigator.vibrate) navigator.vibrate([60,40,60]);
  // Mostra il prossimo esercizio nel banner
  const nextEl=document.getElementById('rest-next-ex');
  if(nextEl) nextEl.textContent=nextExName ? '▶ ' + nextExName : '';
  const _rmOpen=document.getElementById('rest-modal'); if(_rmOpen) _rmOpen.classList.add('open');
  updateRestUI();
  clearInterval(restInterval);
  restInterval=setInterval(()=>{restLeft--;updateRestUI();if(restLeft<=0){clearInterval(restInterval);const _rmClose=document.getElementById('rest-modal');if(_rmClose)_rmClose.classList.remove('open');if(navigator.vibrate) navigator.vibrate([80,50,80,50,120]);showToast('💪 Vai!');} },1000);
}
function updateRestUI(){
  const _rn=document.getElementById('rest-n'); if(_rn) _rn.textContent=restLeft;
  const circ=2*Math.PI*25;
  const _rc=document.getElementById('rest-circ');
  if(_rc){_rc.style.strokeDasharray=circ;_rc.style.strokeDashoffset=circ*(1-restLeft/restTot);}
}
function skipRest(){clearInterval(restInterval);const _rm=document.getElementById('rest-modal');if(_rm)_rm.classList.remove('open');}
async function finishWorkout(){
  clearInterval(woTimer);
  _clearAutoSave();
  const dur=Math.round((Date.now()-woStart)/60000);
  const exs=woDayData.exercises||[];
  let vol=0;(Array.isArray(exs)?exs:[]).forEach(ex=>{vol+=safeSets(ex.s)*safeReps(ex.r);});
  const completedSets={};
  Object.keys(woSets).forEach(k=>{if(woSets[k])completedSets[k]=true;});
  const totalSets=exs.reduce((a,ex)=>a+safeSets(ex.s),0);
  const doneSets=Object.keys(completedSets).length;
  const sessionRecord={date:today(),progName:(woProgram&&woProgram.name)||'',dayName:(woDayData&&woDayData.name)||'',duration:dur,exCount:exs.length,volume:vol,doneSets,totalSets,woSetsSnap:{...woSets}};
  sessions.push(sessionRecord);
  await saveAll();
  const _woovlClose=document.getElementById('wo-ovl'); if(_woovlClose) _woovlClose.classList.remove('open');
  renderAllenamento();renderHome();
  // Add notification
  addNotification('🎉 Sessione completata',''+woDayData.name+' · '+dur+' min · volume '+vol,'workout');
  // Show rich post-workout summary
  setTimeout(()=>showPwSummary(dur,exs,vol,sessionRecord),300);
  // Save weight history for auto-progression tracking
  (exs||[]).forEach((ex,ei)=>{
    const allKeys=Array.from({length:safeSets(ex.s)},(_,si)=>ei+'_'+si);
    const allDone=allKeys.every(k=>woSets[k]);
    const kg=Object.values(woWeights).find((_,i)=>Math.floor(i/safeSets(ex.s))===ei)||'';
    if(typeof saveExWeightHistory==='function') saveExWeightHistory(ex.id, kg, allDone);
  });
  // Check auto-progression suggestions
  setTimeout(()=>{
    const progSuggestions=[];
    (exs||[]).forEach(ex=>{
      const p=checkAutoProgression?checkAutoProgression(ex.id):null;
      if(p){const exD=EX_DB.find(e=>e.id===ex.id)||{name:ex.name||ex.id};progSuggestions.push(exD.name+': '+p.message);}
    });
    if(progSuggestions.length>0){
      setTimeout(()=>showToast('\u{1F4C8} '+progSuggestions[0]),2500);
    }
    // Check deload
    if(typeof showDeloadBannerIfNeeded==='function') setTimeout(showDeloadBannerIfNeeded, 3000);
  },1000);
}

// ── EX PICKER ────────────────────────────
const EX_FILTERS=['all','push','pull','lower','skill','core','cardio','casa'];
const EX_FLBLS={all:'Tutti',push:'Push',pull:'Pull',lower:'Lower',skill:'Skill',core:'Core',cardio:'Cardio',casa:'Casa 🏠'};
function openExSheet(di){
  sheetDayIdx=di;exFilter='all';
  const _exq=document.getElementById('ex-q'); if(_exq) _exq.value='';
  const _exf=document.getElementById('ex-ftrs'); if(_exf) _exf.innerHTML=EX_FILTERS.map(f=>`<button class="f-chip${f==='all'?' on':''}" onclick="setExFilter('${f}',this)">${EX_FLBLS[f]}</button>`).join('');
  renderExList('');const _exovl=document.getElementById('ex-ovl');if(_exovl)_exovl.classList.add('open');
}
function closeExSheet(){const _exovl=document.getElementById('ex-ovl');if(_exovl)_exovl.classList.remove('open');}
function setExFilter(f,btn){exFilter=f;document.querySelectorAll('.f-chip').forEach(c=>c.classList.remove('on'));btn.classList.add('on');filterEx();}
function filterEx(){const _eq=document.getElementById('ex-q');renderExList(_eq?_eq.value.toLowerCase():'');}
function renderExList(q){
  const isCasa=exFilter==='casa';
  const list=EX_DB.filter(e=>{
    const tags=e.tags||[];
    const mf=exFilter==='all'||(isCasa?tags.includes('casa'):e.m===exFilter);
    return mf&&(!q||((e.name||'').toLowerCase().includes(q)||tags.some(t=>t.includes(q))));
  });
  const tc=m=>TC[m]||TC.custom;
  document.getElementById('ex-pick').innerHTML=list.map(e=>`
    <div class="pi-item" onclick="pickEx('${e.id}')">
      <div class="pi-ico" style="background:${tc(e.m).bg}">${e.icon||'🏋️'}</div>
      <div style="flex:1"><div class="pi-nm">${e.name}</div><div class="pi-tags">${[e.m,...(e.tags||[])].slice(0,3).join(' · ')}</div></div>
      <div class="pi-add">＋</div>
    </div>`).join('')||'<div style="padding:24px;text-align:center;color:var(--text2);font-size:13px">Nessun risultato</div>';
}
function pickEx(id){
  if(sheetDayIdx===null) return;
  const day=editProg.days[sheetDayIdx];
  if(!day.exercises)day.exercises=[];
  day.exercises.push({id,s:'3',r:'10',rs:'75s'});
  refreshDay(sheetDayIdx);closeExSheet();showToast('✅ Aggiunto');
}
function addCustomEx(){
  const nm=document.getElementById('cust-inp').value.trim();
  if(!nm||sheetDayIdx===null) return;
  const day=editProg.days[sheetDayIdx];
  if(!day.exercises)day.exercises=[];
  day.exercises.push({id:'c'+Date.now(),name:nm,s:'3',r:'10',rs:'75s'});
  refreshDay(sheetDayIdx);document.getElementById('cust-inp').value='';closeExSheet();showToast('✅ Aggiunto');
}
const _exOvlEl = document.getElementById('ex-ovl');
if (_exOvlEl && _exOvlEl.addEventListener) _exOvlEl.addEventListener('click',e=>{if(e.target===_exOvlEl)closeExSheet();});

const LIB_FILTERS=['all','push','pull','lower','skill','core','cardio'];
const LIB_FLBLS={all:'Tutti',push:'Push',pull:'Pull',lower:'Lower',skill:'Skill',core:'Core',cardio:'Cardio'};
function renderLibrary(){
  const froot=document.getElementById('lib-filters');
  if(!froot) return;
  froot.innerHTML=LIB_FILTERS.map(f=>`<button class="f-chip${f===libFilter?' on':''}" onclick="setLibFilter('${f}',this)">${LIB_FLBLS[f]}</button>`).join('');
  const grid=document.getElementById('lib-grid');
  if(grid && !document.getElementById('lib-guide-card')){
    const card=document.createElement('div');
    card.id='lib-guide-card';
    card.className='lib-head-card';
    card.innerHTML='<div class="lib-head-title">Esplora esercizi con guida pratica</div><div class="lib-head-sub">Apri un esercizio per vedere tecnica, difficolta, obiettivo e muscoli coinvolti.</div>';
    grid.parentNode.insertBefore(card,grid);
  }
  filterLibrary();
}
function setLibFilter(f,btn){
  libFilter=f;
  document.querySelectorAll('#lib-filters .f-chip').forEach(c=>c.classList.remove('on'));
  btn.classList.add('on');
  filterLibrary();
}
function filterLibrary(){
  const q=(document.getElementById('lib-search')?.value||'').toLowerCase().trim();
  const list=EX_DB.filter(e=>{
    const tags=e.tags||[];
    const fOk=libFilter==='all'||e.m===libFilter;
    const qOk=!q||(e.name||'').toLowerCase().includes(q)||(e.m||'').toLowerCase().includes(q)||tags.some(t=>t.toLowerCase().includes(q))||(e.id||'').toLowerCase().includes(q);
    return fOk&&qOk;
  });
  const grid=document.getElementById('lib-grid');
  if(!grid) return;
  const tc=m=>TC[m]||TC.custom;
  const total=EX_DB.length;
  const cColor=libFilter==='all'?'var(--acc)':libFilter==='push'?'#ff6b6b':libFilter==='pull'?'#51cf66':libFilter==='lower'?'#ffd43b':libFilter==='skill'?'#cc5de8':libFilter==='core'?'#74c0fc':'#20c997';
  const counterCard=`<div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:6px;">
    <div style="font-size:18px;font-weight:800;color:${cColor};">🎮 ${list.length} / ${total} esercizi</div>
    <div style="font-size:11px;color:var(--text2);margin-top:3px;">Tocca un esercizio per vedere guida tecnica, muscoli e progressione storica.</div>
  </div>`;
  if(list.length===0){
    grid.innerHTML=counterCard+`<div style="padding:32px 16px;text-align:center;color:var(--text2);"><div style="font-size:32px;margin-bottom:8px;">🔍</div><div style="font-size:14px;font-weight:700;">Nessun esercizio trovato</div><div style="font-size:12px;margin-top:4px;opacity:.6;">Cambia filtro o parola chiave</div></div>`;
    return;
  }
  grid.innerHTML=counterCard+`<div class="lib-grid">${list.map(e=>`
    <div class="lib-card" onclick="openExDetail('${e.id}')">
      <div class="lib-card-ico">${e.icon||'🏋️'}</div>
      <div style="flex:1;min-width:0;">
        <div class="lib-card-nm">${e.name}</div>
        <div style="font-size:12px;color:var(--text2);margin-bottom:4px;">${(e.tags||[]).slice(0,2).join(' · ')||e.m}</div>
        <span style="font-size:10px;color:${tc(e.m).c}">Guida esecuzione</span>
      </div>
      <div style="font-size:18px;color:var(--border2);flex-shrink:0;">›</div>
    </div>`).join('')}</div>`;
}
function openExDetail(id){
  const ex=EX_DB.find(e=>e.id===id);
  if(!ex) return;
  const guide=EX_GUIDES[id]||{
    difficulty:'Intermedio',
    objective:'Migliorare performance globale',
    desc:'Esercizio utile per sviluppare forza e coordinazione nel pattern specifico.',
    steps:['Imposta una posizione stabile.','Esegui il movimento in controllo su tutto il ROM.','Mantieni ritmo costante e postura neutra.'],
    tip:'Qualita prima della quantita: interrompi la serie se perdi tecnica.'
  };
  const tc=TC[ex.m]||TC.custom;
  const primary=(ex.tags&&ex.tags[0])||ex.m;
  const secondary=(ex.tags&&ex.tags[1])||'core';
  const _edt=document.getElementById('ex-detail-title'); if(_edt) _edt.textContent=ex.name;
  const _edc=document.getElementById('ex-detail-content'); if(_edc) _edc.innerHTML=`
    <div class="ex-detail-hero">
      <div class="ex-detail-ico">${ex.icon}</div>
      <div class="ex-detail-nm">${ex.name}</div>
      <div class="ex-detail-tags">
        <span class="ex-dtag" style="background:${tc.bg};color:${tc.c}">${ex.m}</span>
        <span class="ex-dtag" style="background:var(--bg4);color:var(--text2)">Difficolta: ${guide.difficulty}</span>
        <span class="ex-dtag" style="background:var(--bg4);color:var(--text2)">Obiettivo: ${guide.objective}</span>
      </div>
      <div class="ex-detail-desc">${guide.desc}</div>
    </div>
    ${renderMuscleMap(primary,secondary)}
    ${guide.steps.map((s,i)=>`<div class="ex-step-card"><div class="ex-step-num">${i+1}</div><div class="ex-step-ttl">Step ${i+1}</div><div class="ex-step-txt">${s}</div></div>`).join('')}
    <div class="ex-tip-box"><div class="ex-tip-ico">🎯</div><div class="ex-tip-txt">${guide.tip}</div></div>`;
  openSub('sub-ex-detail');
}
function anatomyFigure(mode, fillFn, classFn){
  // Ultra-detailed anatomical SVG
  if(mode==='front'){
    return `<svg class="ana-svg" viewBox="0 0 200 460" xmlns="http://www.w3.org/2000/svg">
      
      <defs>
        <filter id="glow-front"><feGaussianBlur stdDeviation="2.5" result="cb"/><feComposite in="SourceGraphic" in2="cb" operator="over"/></filter>
        <linearGradient id="skin-f" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2a2c3e;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#1e2030;stop-opacity:1"/>
        </linearGradient>
      </defs>
      
      <ellipse fill="url(#skin-f)" stroke="#3a3c52" stroke-width="1" cx="100" cy="36" rx="26" ry="30"/>
      <path fill="url(#skin-f)" stroke="#3a3c52" stroke-width="1" d="M60 75 C56 115,58 158,70 218 C78 258,78 295,76 345 C75 375,72 398,76 422 L94 422 L98 350 L102 422 L120 422 C124 398,121 375,120 345 C118 295,118 258,126 218 C138 158,140 115,136 75 Z"/>
      
      <path fill="url(#skin-f)" stroke="#3a3c52" stroke-width="1" d="M38 90 C28 118,26 155,32 185 L46 185 C46 155,50 125,58 98 Z"/>
      <path fill="url(#skin-f)" stroke="#3a3c52" stroke-width="1" d="M162 90 C172 118,174 155,168 185 L154 185 C154 155,150 125,142 98 Z"/>
      
      <path fill="url(#skin-f)" stroke="#3a3c52" stroke-width="1" d="M32 185 C28 215,30 240,36 260 L46 256 C44 234,44 210,46 185 Z"/>
      <path fill="url(#skin-f)" stroke="#3a3c52" stroke-width="1" d="M168 185 C172 215,170 240,164 260 L154 256 C156 234,156 210,154 185 Z"/>
      
      <ellipse fill="url(#skin-f)" stroke="#3a3c52" stroke-width="1" cx="38" cy="270" rx="10" ry="14"/>
      <ellipse fill="url(#skin-f)" stroke="#3a3c52" stroke-width="1" cx="162" cy="270" rx="10" ry="14"/>

      
      
      <path class="${classFn('traps')}" style="fill:${fillFn('traps')}" d="M72 78 C84 68,116 68,128 78 C126 92,118 102,100 108 C82 102,74 92,72 78 Z"/>
      
      <line stroke="rgba(255,255,255,0.12)" stroke-width="0.8" x1="72" y1="85" x2="128" y2="85"/>
      
      <path class="${classFn('chest_upper')}" style="fill:${fillFn('chest_upper')}" d="M62 90 C74 76,98 74,112 84 C114 97,110 114,98 120 C88 123,76 120,68 114 C63 107,61 98,62 90 Z"/>
      <path class="${classFn('chest_upper')}" style="fill:${fillFn('chest_upper')}" d="M138 90 C126 76,102 74,88 84 C86 97,90 114,102 120 C112 123,124 120,132 114 C137 107,139 98,138 90 Z"/>
      
      <path class="${classFn('chest_lower')}" style="fill:${fillFn('chest_lower')}" d="M65 116 C76 108,98 108,110 116 C114 130,110 142,100 147 C90 151,80 148,72 142 C65 135,63 124,65 116 Z"/>
      <path class="${classFn('chest_lower')}" style="fill:${fillFn('chest_lower')}" d="M135 116 C124 108,102 108,90 116 C86 130,90 142,100 147 C110 151,120 148,128 142 C135 135,137 124,135 116 Z"/>
      
      <line stroke="rgba(255,255,255,0.1)" stroke-width="0.8" x1="100" y1="86" x2="100" y2="150"/>
      
      <path class="${classFn('front_delts')}" style="fill:${fillFn('front_delts')}" d="M44 94 C48 80,60 76,72 86 C74 98,72 116,60 124 C52 126,44 116,42 106 Z"/>
      <path class="${classFn('front_delts')}" style="fill:${fillFn('front_delts')}" d="M156 94 C152 80,140 76,128 86 C126 98,128 116,140 124 C148 126,156 116,158 106 Z"/>
      
      <path class="${classFn('side_delts')}" style="fill:${fillFn('side_delts')}" d="M36 96 C42 84,54 82,64 92 C66 110,62 128,48 136 C38 130,32 116,34 104 Z"/>
      <path class="${classFn('side_delts')}" style="fill:${fillFn('side_delts')}" d="M164 96 C158 84,146 82,136 92 C134 110,138 128,152 136 C162 130,168 116,166 104 Z"/>
      
      <path class="${classFn('biceps')}" style="fill:${fillFn('biceps')}" d="M36 136 C46 130,56 140,56 162 C56 182,50 196,38 210 C30 202,28 174,30 150 Z"/>
      <path class="${classFn('biceps')}" style="fill:${fillFn('biceps')}" d="M164 136 C154 130,144 140,144 162 C144 182,150 196,162 210 C170 202,172 174,170 150 Z"/>
      
      <path stroke="rgba(255,255,255,0.08)" stroke-width="0.7" fill="none" d="M38 145 Q47 163 40 185"/>
      <path stroke="rgba(255,255,255,0.08)" stroke-width="0.7" fill="none" d="M162 145 Q153 163 160 185"/>
      
      <path class="${classFn('forearms')}" style="fill:${fillFn('forearms')}" d="M32 188 C44 182,52 196,50 220 C48 240,42 256,32 264 C24 254,24 222,28 198 Z"/>
      <path class="${classFn('forearms')}" style="fill:${fillFn('forearms')}" d="M168 188 C156 182,148 196,150 220 C152 240,158 256,168 264 C176 254,176 222,172 198 Z"/>
      
      <path class="${classFn('serratus')}" style="fill:${fillFn('serratus')}" d="M69 144 C76 140,82 146,80 160 C78 178,75 192,67 202 C61 190,61 160,69 144 Z"/>
      <path class="${classFn('serratus')}" style="fill:${fillFn('serratus')}" d="M131 144 C124 140,118 146,120 160 C122 178,125 192,133 202 C139 190,139 160,131 144 Z"/>
      
      <path class="${classFn('upper_abs')}" style="fill:${fillFn('upper_abs')}" d="M85 148 C92 144,108 144,115 148 C118 164,118 180,115 200 C107 204,93 204,85 200 C82 180,82 164,85 148 Z"/>
      
      <line stroke="rgba(255,255,255,0.1)" stroke-width="0.8" x1="85" y1="163" x2="115" y2="163"/>
      <line stroke="rgba(255,255,255,0.1)" stroke-width="0.8" x1="85" y1="178" x2="115" y2="178"/>
      <line stroke="rgba(255,255,255,0.08)" stroke-width="0.8" x1="100" y1="148" x2="100" y2="200"/>
      
      <path class="${classFn('lower_abs')}" style="fill:${fillFn('lower_abs')}" d="M84 202 C92 198,108 198,116 202 C118 218,116 234,110 248 C103 252,97 252,90 248 C84 234,82 218,84 202 Z"/>
      <line stroke="rgba(255,255,255,0.08)" stroke-width="0.8" x1="100" y1="202" x2="100" y2="250"/>
      
      <path class="${classFn('obliques')}" style="fill:${fillFn('obliques')}" d="M67 152 C75 146,82 150,82 164 C81 194,80 222,74 242 C64 234,59 218,57 192 Z"/>
      <path class="${classFn('obliques')}" style="fill:${fillFn('obliques')}" d="M133 152 C125 146,118 150,118 164 C119 194,120 222,126 242 C136 234,141 218,143 192 Z"/>
      
      <path class="${classFn('hip_flexors')}" style="fill:${fillFn('hip_flexors')}" d="M82 248 C90 244,100 246,104 252 C106 264,106 276,100 282 C94 282,86 278,83 268 Z"/>
      <path class="${classFn('hip_flexors')}" style="fill:${fillFn('hip_flexors')}" d="M118 248 C110 244,100 246,96 252 C94 264,94 276,100 282 C106 282,114 278,117 268 Z"/>
      
      <path class="${classFn('quads_outer')}" style="fill:${fillFn('quads_outer')}" d="M72 254 C82 248,90 252,92 268 C93 295,92 322,86 344 C78 347,71 342,66 332 C62 305,62 276,72 254 Z"/>
      <path class="${classFn('quads_outer')}" style="fill:${fillFn('quads_outer')}" d="M128 254 C118 248,110 252,108 268 C107 295,108 322,114 344 C122 347,129 342,134 332 C138 305,138 276,128 254 Z"/>
      
      <path class="${classFn('quads_inner')}" style="fill:${fillFn('quads_inner')}" d="M91 254 C96 250,104 250,109 254 C112 278,112 312,107 342 C103 346,97 346,93 342 C88 312,88 278,91 254 Z"/>
      
      <path class="${classFn('adductors')}" style="fill:${fillFn('adductors')}" d="M88 298 C94 292,102 292,107 298 C110 316,106 336,99 344 C93 344,90 336,87 316 Z"/>
      
      <path class="${classFn('tibialis')}" style="fill:${fillFn('tibialis')}" d="M76 350 C84 346,90 352,90 368 C89 384,86 398,80 410 C73 402,70 384,71 366 Z"/>
      <path class="${classFn('tibialis')}" style="fill:${fillFn('tibialis')}" d="M124 350 C116 346,110 352,110 368 C111 384,114 398,120 410 C127 402,130 384,129 366 Z"/>
      
      <path class="${classFn('calves')}" style="fill:${fillFn('calves')}" d="M70 360 C80 354,90 360,91 378 C91 396,86 410,77 420 C67 413,62 396,63 378 Z"/>
      <path class="${classFn('calves')}" style="fill:${fillFn('calves')}" d="M130 360 C120 354,110 360,109 378 C109 396,114 410,123 420 C133 413,138 396,137 378 Z"/>
      
      <line stroke="rgba(255,255,255,0.06)" stroke-width="0.6" x1="100" y1="64" x2="100" y2="350" stroke-dasharray="3,4"/>
    </svg>`;
  }
  // BACK VIEW
  return `<svg class="ana-svg" viewBox="0 0 200 460" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="glow-back"><feGaussianBlur stdDeviation="2.5" result="cb"/><feComposite in="SourceGraphic" in2="cb" operator="over"/></filter>
      <linearGradient id="skin-b" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#2a2c3e;stop-opacity:1"/>
        <stop offset="100%" style="stop-color:#1e2030;stop-opacity:1"/>
      </linearGradient>
    </defs>
    
    <ellipse fill="url(#skin-b)" stroke="#3a3c52" stroke-width="1" cx="100" cy="36" rx="26" ry="30"/>
    <path fill="url(#skin-b)" stroke="#3a3c52" stroke-width="1" d="M60 75 C56 115,58 158,70 218 C78 258,78 295,76 345 C75 375,72 398,76 422 L94 422 L98 350 L102 422 L120 422 C124 398,121 375,120 345 C118 295,118 258,126 218 C138 158,140 115,136 75 Z"/>
    <path fill="url(#skin-b)" stroke="#3a3c52" stroke-width="1" d="M38 90 C28 118,26 155,32 185 L46 185 C46 155,50 125,58 98 Z"/>
    <path fill="url(#skin-b)" stroke="#3a3c52" stroke-width="1" d="M162 90 C172 118,174 155,168 185 L154 185 C154 155,150 125,142 98 Z"/>
    <path fill="url(#skin-b)" stroke="#3a3c52" stroke-width="1" d="M32 185 C28 215,30 240,36 260 L46 256 C44 234,44 210,46 185 Z"/>
    <path fill="url(#skin-b)" stroke="#3a3c52" stroke-width="1" d="M168 185 C172 215,170 240,164 260 L154 256 C156 234,156 210,154 185 Z"/>
    <ellipse fill="url(#skin-b)" stroke="#3a3c52" stroke-width="1" cx="38" cy="270" rx="10" ry="14"/>
    <ellipse fill="url(#skin-b)" stroke="#3a3c52" stroke-width="1" cx="162" cy="270" rx="10" ry="14"/>

    
    
    <path class="${classFn('traps')}" style="fill:${fillFn('traps')}" d="M68 76 C82 66,118 66,132 76 C130 96,118 116,100 122 C82 116,70 96,68 76 Z"/>
    
    <path class="${classFn('traps')}" style="fill:${fillFn('traps')}" d="M72 120 C84 114,100 120,116 114 C130 120,136 140,126 156 C112 162,100 160,88 162 C74 156,66 140,72 120 Z"/>
    <path stroke="rgba(255,255,255,0.08)" stroke-width="0.8" fill="none" d="M72 120 C84 114,116 114,128 120"/>
    
    <path class="${classFn('rear_delts')}" style="fill:${fillFn('rear_delts')}" d="M44 94 C50 80,62 78,72 90 C74 104,70 118,60 126 C50 126,42 116,42 104 Z"/>
    <path class="${classFn('rear_delts')}" style="fill:${fillFn('rear_delts')}" d="M156 94 C150 80,138 78,128 90 C126 104,130 118,140 126 C150 126,158 116,158 104 Z"/>
    
    <path class="${classFn('rear_delts')}" style="fill:${fillFn('rear_delts')}" d="M66 104 C74 96,86 98,88 112 C88 126,84 138,74 142 C65 136,62 120,66 104 Z"/>
    <path class="${classFn('rear_delts')}" style="fill:${fillFn('rear_delts')}" d="M134 104 C126 96,114 98,112 112 C112 126,116 138,126 142 C135 136,138 120,134 104 Z"/>
    
    <path class="${classFn('lats_upper')}" style="fill:${fillFn('lats_upper')}" d="M60 128 C72 118,78 136,76 168 C74 192,68 210,56 224 C46 212,44 178,48 150 Z"/>
    <path class="${classFn('lats_upper')}" style="fill:${fillFn('lats_upper')}" d="M140 128 C128 118,122 136,124 168 C126 192,132 210,144 224 C154 212,156 178,152 150 Z"/>
    
    <path class="${classFn('lats_lower')}" style="fill:${fillFn('lats_lower')}" d="M60 200 C68 194,74 200,76 216 C76 232,72 244,63 252 C55 244,53 222,56 210 Z"/>
    <path class="${classFn('lats_lower')}" style="fill:${fillFn('lats_lower')}" d="M140 200 C132 194,126 200,124 216 C124 232,128 244,137 252 C145 244,147 222,144 210 Z"/>
    
    <path class="${classFn('mid_back')}" style="fill:${fillFn('mid_back')}" d="M72 120 C84 114,100 118,116 114 C126 122,128 148,122 166 C112 172,100 170,88 172 C78 164,72 148,72 120 Z"/>
    
    <path class="${classFn('erectors')}" style="fill:${fillFn('erectors')}" d="M90 128 C95 125,100 126,105 128 C107 162,107 198,104 228 C101 232,99 232,96 228 C93 198,89 162,90 128 Z"/>
    
    <line stroke="rgba(255,255,255,0.08)" stroke-width="0.7" x1="100" y1="72" x2="100" y2="350" stroke-dasharray="2,3"/>
    
    <path class="${classFn('triceps')}" style="fill:${fillFn('triceps')}" d="M40 126 C54 120,63 136,61 162 C59 184,54 196,42 208 C33 196,32 165,36 144 Z"/>
    <path class="${classFn('triceps')}" style="fill:${fillFn('triceps')}" d="M160 126 C146 120,137 136,139 162 C141 184,146 196,158 208 C167 196,168 165,164 144 Z"/>
    
    <path class="${classFn('triceps')}" style="fill:${fillFn('triceps')}" d="M38 128 C44 122,54 130,58 150 C58 170,52 186,42 194 C34 182,32 152,36 138 Z"/>
    <path class="${classFn('triceps')}" style="fill:${fillFn('triceps')}" d="M162 128 C156 122,146 130,142 150 C142 170,148 186,158 194 C166 182,168 152,164 138 Z"/>
    
    <path class="${classFn('forearms')}" style="fill:${fillFn('forearms')}" d="M32 188 C44 184,50 198,48 222 C46 242,40 258,30 266 C23 254,24 224,28 202 Z"/>
    <path class="${classFn('forearms')}" style="fill:${fillFn('forearms')}" d="M168 188 C156 184,150 198,152 222 C154 242,160 258,170 266 C177 254,176 224,172 202 Z"/>
    
    <path class="${classFn('glutes')}" style="fill:${fillFn('glutes')}" d="M70 242 C80 232,100 230,120 242 C126 258,120 278,100 290 C80 278,74 258,70 242 Z"/>
    
    <path class="${classFn('glutes')}" style="fill:${fillFn('glutes')}" d="M66 234 C78 226,94 230,96 242 C94 256,82 262,68 256 C60 248,60 240,66 234 Z"/>
    <path class="${classFn('glutes')}" style="fill:${fillFn('glutes')}" d="M134 234 C122 226,106 230,104 242 C106 256,118 262,132 256 C140 248,140 240,134 234 Z"/>
    
    <path stroke="rgba(255,255,255,0.1)" stroke-width="0.8" fill="none" d="M72 283 C84 292,116 292,128 283"/>
    
    <path class="${classFn('hamstrings')}" style="fill:${fillFn('hamstrings')}" d="M70 274 C82 268,92 276,92 300 C92 326,86 348,74 360 C63 352,58 326,60 298 Z"/>
    <path class="${classFn('hamstrings')}" style="fill:${fillFn('hamstrings')}" d="M130 274 C118 268,108 276,108 300 C108 326,114 348,126 360 C137 352,142 326,140 298 Z"/>
    
    <path class="${classFn('hamstrings')}" style="fill:${fillFn('hamstrings')}" d="M95 276 C100 274,108 276,110 296 C110 320,105 344,100 356 C95 344,90 320,90 296 Z"/>
    
    <path class="${classFn('calves')}" style="fill:${fillFn('calves')}" d="M68 364 C80 358,90 366,91 385 C91 404,85 418,75 428 C65 420,61 402,62 382 Z"/>
    <path class="${classFn('calves')}" style="fill:${fillFn('calves')}" d="M132 364 C120 358,110 366,109 385 C109 404,115 418,125 428 C135 420,139 402,138 382 Z"/>
    
    <path class="${classFn('calves')}" style="fill:${fillFn('calves')}" d="M63 382 C70 378,82 382,86 400 C84 416,76 426,68 424 C60 416,58 398,63 382 Z"/>
    <path class="${classFn('calves')}" style="fill:${fillFn('calves')}" d="M137 382 C130 378,118 382,114 400 C116 416,124 426,132 424 C140 416,142 398,137 382 Z"/>
    
    <path stroke="rgba(255,255,255,0.08)" stroke-width="0.7" fill="none" d="M74 366 Q80 400 75 426"/>
    <path stroke="rgba(255,255,255,0.08)" stroke-width="0.7" fill="none" d="M126 366 Q120 400 125 426"/>
  </svg>`;
}
function renderMuscleMap(primaryTag,secondaryTag){
  const p1=muscleParts(primaryTag),p2=muscleParts(secondaryTag);
  const pri=new Set([...p1.p,...p2.p]), sec=new Set([...p1.s,...p2.s]);
  const fillFn=(id)=>pri.has(id)?'var(--acc)':sec.has(id)?'var(--orange)':'#1e2030';
  const classFn=(id)=>pri.has(id)?'muscle-part high':sec.has(id)?'muscle-part mid':'muscle-part low';
  return `<div class="muscle-map-wrap">
    <div class="muscle-figure">${anatomyFigure('front',fillFn,classFn)}<div class="muscle-fig-label">Frontale</div></div>
    <div class="muscle-figure">${anatomyFigure('back',fillFn,classFn)}<div class="muscle-fig-label">Posteriore</div><div class="muscle-legend"><div class="ml-item"><span class="ml-dot" style="background:var(--acc)"></span>Primario</div><div class="ml-item"><span class="ml-dot" style="background:var(--orange)"></span>Secondario</div></div></div>
  </div>`;
}
function muscleParts(tag){
  const k=(tag||'').toLowerCase();
  if(k.includes('petto')) return {p:['chest_upper','chest_lower'],s:['front_delts','serratus']};
  if(k.includes('spalle')||k.includes('front_delt')) return {p:['front_delts','side_delts'],s:['rear_delts','traps']};
  if(k.includes('tricipiti')) return {p:['triceps'],s:['rear_delts']};
  if(k.includes('bicipiti')) return {p:['biceps'],s:['forearms']};
  if(k.includes('dorsali')) return {p:['lats_upper','lats_lower'],s:['mid_back']};
  if(k.includes('schiena')||k.includes('trapezi')) return {p:['traps','mid_back','erectors'],s:['lats_upper','rear_delts']};
  if(k.includes('quadricipiti')||k.includes('gambe')) return {p:['quads_outer','quads_inner'],s:['adductors','tibialis','hip_flexors']};
  if(k.includes('femorali')) return {p:['hamstrings'],s:['glutes','calves']};
  if(k.includes('glutei')) return {p:['glutes'],s:['hamstrings','hip_flexors']};
  if(k.includes('polpacci')) return {p:['calves'],s:['tibialis']};
  if(k.includes('obliqui')) return {p:['obliques'],s:['serratus','upper_abs']};
  if(k.includes('addominali')||k.includes('core')) return {p:['upper_abs','lower_abs'],s:['obliques','serratus','hip_flexors']};
  if(k.includes('hip')||k.includes('flessori')) return {p:['hip_flexors'],s:['lower_abs','quads_inner']};
  return {p:['forearms'],s:['upper_abs']};
}
function tagToMuscleKeys(tag){
  const t=(tag||'').toLowerCase();
  if(t.includes('petto')) return ['chest_upper','chest_lower','serratus'];
  if(t.includes('spalle')) return ['front_delts','side_delts','rear_delts'];
  if(t.includes('tricipiti')) return ['triceps'];
  if(t.includes('bicipiti')) return ['biceps'];
  if(t.includes('dorsali')) return ['lats_upper','lats_lower','mid_back'];
  if(t.includes('schiena')||t.includes('trapezi')) return ['traps','mid_back','erectors'];
  if(t.includes('quadricipiti')) return ['quads_outer','quads_inner','adductors'];
  if(t.includes('femorali')) return ['hamstrings'];
  if(t.includes('glutei')) return ['glutes'];
  if(t.includes('polpacci')) return ['calves','tibialis'];
  if(t.includes('obliqui')) return ['obliques'];
  if(t.includes('addominali')||t.includes('core')) return ['upper_abs','lower_abs','hip_flexors'];
  if(t.includes('hip')) return ['hip_flexors','lower_abs'];
  return ['forearms'];
}
/* ── MUSCLE LOAD con decay temporale ─────────────────────────
   Ogni sessione contribuisce allo stimolo muscolare con un fattore
   che decade esponenzialmente nel tempo:
   - Picco: subito dopo l'allenamento (decay = 1.0)
   - 48h dopo: decay ≈ 0.70  (recupero in corso)
   - 72h dopo: decay ≈ 0.50  (quasi recuperato)
   - 5 giorni:  decay ≈ 0.15  (residuo basso)
   - 7 giorni:  decay ≈ 0.05  (quasi zero)
   - 10+ giorni: decay → 0    (muscolo non allenato)
   Il colore nella mappa va dal grigio scuro (non allenato) →
   giallo → arancio → rosso (massimo affaticamento).
   I muscoli si schiariscono man mano che il tempo passa.
─────────────────────────────────────────────────────────── */
function calcMuscleLoad(){
  const load={};
  const now=Date.now();
  const HALF_LIFE_MS = 1000*60*60*48; // 48 ore = dimezza lo stimolo
  const MAX_AGE_MS   = 1000*60*60*24*10; // 10 giorni = stimolo trascurabile

  (sessions||[]).forEach(s=>{
    const d=new Date(s.date);
    if(isNaN(d)) return;
    const ageMs = now - d.getTime();
    if(ageMs > MAX_AGE_MS) return; // troppo vecchio → ignora
    // Decadimento esponenziale: decay = e^(-t/τ) dove τ = HALF_LIFE / ln(2)
    const tau = HALF_LIFE_MS / Math.LN2;
    const decay = Math.exp(-ageMs / tau);
    if(decay < 0.01) return;

    const preset=PRESETS_DATA.find(p=>p.name===s.progName||p.id===s.progName||p.id===s.presetId);
    const day=preset?.days?.find(d=>d.name===s.dayName)||s._dayData||null;
    (day?.exercises||s.exercises||[]).forEach(ex=>{
      const exMeta=EX_DB.find(e=>e.id===ex.id);
      const tags=(exMeta?.tags||[ex.m||'core']).slice(0,3);
      tags.forEach(tag=>{
        tagToMuscleKeys(tag).forEach(k=>{
          load[k]=(load[k]||0)+(isFundamentalEx(ex)?1.5:1.0)*decay;
        });
      });
    });
  });
  return load;
}
function loadColor(v){
  const clamped=Math.min(1,Math.max(0,v/5.5));
  if(clamped<0.01) return '#1e2030';
  const hue=4+(1-clamped)*48;
  const sat=88;
  const light=25+clamped*36;
  return `hsl(${hue} ${sat}% ${light}%)`;
}
function renderMuscleFatigue(){
  const root=document.getElementById('muscle-fatigue-wrap');
  if(!root) return;
  const m=calcMuscleLoad();
  const f=(id)=>loadColor(m[id]||0);
  const cls=(id)=>{
    const v=m[id]||0;
    return v>4?'muscle-part high':v>2.5?'muscle-part mid':v>0.8?'muscle-part low':'muscle-part';
  };

  // Calcola gruppi muscolari attivi per la lista dettaglio
  const muscleGroups = [
    {id:'chest_upper',name:'Petto (alto)',ids:['chest_upper','chest_lower']},
    {id:'front_delts',name:'Spalle',ids:['front_delts','side_delts','rear_delts']},
    {id:'biceps',name:'Bicipiti',ids:['biceps']},
    {id:'triceps',name:'Tricipiti',ids:['triceps']},
    {id:'traps',name:'Trapezio',ids:['traps']},
    {id:'lats_upper',name:'Dorsali',ids:['lats_upper','lats_lower']},
    {id:'upper_abs',name:'Addome',ids:['upper_abs','lower_abs','obliques']},
    {id:'erectors',name:'Lombari',ids:['erectors','mid_back']},
    {id:'glutes',name:'Glutei',ids:['glutes']},
    {id:'quads_inner',name:'Quadricipiti',ids:['quads_inner','quads_outer']},
    {id:'hamstrings',name:'Femorali',ids:['hamstrings']},
    {id:'calves',name:'Polpacci',ids:['calves']},
    {id:'forearms',name:'Avambracci',ids:['forearms']},
  ];

  const getMuscleLevel = (ids) => {
    const vals = ids.map(id => m[id]||0);
    return Math.max(...vals);
  };

  const levelLabel = (v) => v>4?'Max':v>2.5?'Alto':v>0.8?'Medio':v>0?'Basso':'';
  const levelColor = (v) => v>4?'var(--red)':v>2.5?'var(--orange)':v>0.8?'#F5C842':v>0?'var(--green)':'var(--border)';
  const levelBg = (v) => v>4?'rgba(255,92,106,.12)':v>2.5?'rgba(255,154,60,.1)':v>0.8?'rgba(245,200,66,.08)':v>0?'rgba(62,223,138,.08)':'var(--bg3)';

  const activeMuscles = muscleGroups
    .map(g => ({...g, level: getMuscleLevel(g.ids)}))
    .filter(g => g.level > 0)
    .sort((a,b) => b.level - a.level);

  root.innerHTML = `
    
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
      <div>
        <div style="font-size:16px;font-weight:800;letter-spacing:-.2px;">Mappa Muscolare</div>
        <div style="font-size:11px;color:var(--text2);margin-top:2px;">Stimolo e affaticamento in tempo reale</div>
      </div>
      <div style="font-size:10px;color:var(--text3);text-align:right;">
        <div>Aggiornamento</div>
        <div style="color:var(--acc);">automatico</div>
      </div>
    </div>

    
    <div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;overflow:visible;">
      <div style="flex:1;max-width:160px;text-align:center;">
        <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">FRONTALE</div>
        ${anatomyFigure('front',f,cls)}
      </div>
      <div style="flex:1;max-width:160px;text-align:center;">
        <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;">POSTERIORE</div>
        ${anatomyFigure('back',f,cls)}
      </div>
    </div>

    
    <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;padding:10px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:14px;">
      <div style="display:flex;align-items:center;gap:5px;">
        <span style="width:10px;height:10px;border-radius:50%;background:#1e2030;border:1px solid #3a3c52;display:inline-block;"></span>
        <span style="font-size:11px;color:var(--text2);">Non allenato</span>
      </div>
      <div style="display:flex;align-items:center;gap:5px;">
        <span style="width:10px;height:10px;border-radius:50%;background:var(--green);display:inline-block;"></span>
        <span style="font-size:11px;color:var(--text2);">Basso</span>
      </div>
      <div style="display:flex;align-items:center;gap:5px;">
        <span style="width:10px;height:10px;border-radius:50%;background:#F5C842;display:inline-block;"></span>
        <span style="font-size:11px;color:var(--text2);">Medio</span>
      </div>
      <div style="display:flex;align-items:center;gap:5px;">
        <span style="width:10px;height:10px;border-radius:50%;background:var(--orange);display:inline-block;"></span>
        <span style="font-size:11px;color:var(--text2);">Alto</span>
      </div>
      <div style="display:flex;align-items:center;gap:5px;">
        <span style="width:10px;height:10px;border-radius:50%;background:var(--red);display:inline-block;"></span>
        <span style="font-size:11px;color:var(--text2);">Max</span>
      </div>
    </div>

    
    ${activeMuscles.length > 0 ? `
    <div style="margin-bottom:14px;">
      <div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;">
        Muscoli allenati questa settimana
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        ${activeMuscles.map(g => `
          <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:${levelBg(g.level)};border:1px solid ${levelColor(g.level)}30;border-radius:var(--r-sm);">
            <div style="flex:1;font-size:13px;font-weight:700;">${g.name}</div>
            <div style="height:5px;flex:2;background:var(--bg4);border-radius:99px;overflow:hidden;">
              <div style="height:100%;width:${Math.min(100,Math.round(g.level/5.5*100))}%;background:${levelColor(g.level)};border-radius:99px;transition:width .5s ease;"></div>
            </div>
            <div style="min-width:36px;text-align:right;font-size:10px;font-weight:700;color:${levelColor(g.level)};">${levelLabel(g.level)}</div>
          </div>
        `).join('')}
      </div>
    </div>` : `
    <div style="text-align:center;padding:14px;background:var(--bg3);border-radius:var(--r-sm);margin-bottom:14px;">
      <div style="font-size:24px;margin-bottom:6px;">💪</div>
      <div style="font-size:13px;color:var(--text2);">Completa un allenamento per vedere la mappa attiva!</div>
    </div>`}

    
    ${activeMuscles.filter(g=>g.level>3).length > 0 ? `
    <div style="padding:10px 14px;background:rgba(255,154,60,.08);border:1px solid rgba(255,154,60,.2);border-radius:var(--r-sm);margin-bottom:10px;">
      <div style="font-size:12px;font-weight:700;color:var(--orange);margin-bottom:4px;">⚠️ Recupero consigliato</div>
      <div style="font-size:11px;color:var(--text2);">
        ${activeMuscles.filter(g=>g.level>3).map(g=>g.name).join(', ')} — aspetta 48-72h prima di allenarti di nuovo intensamente.
      </div>
    </div>` : ''}

    
    <div style="font-size:10px;color:var(--text3);text-align:center;line-height:1.5;">
      🕐 Lo stimolo decade gradualmente nel tempo — la mappa si aggiorna ogni 30 minuti.
    </div>
  `;

  clearTimeout(window._muscleFatigueTimer);
  window._muscleFatigueTimer = setTimeout(()=>{
    if(document.getElementById('muscle-fatigue-wrap')) renderMuscleFatigue();
  }, 30*60*1000);
}

// ── NUTRIZIONE ───────────────────────────
function renderNutrizione(){
  if(typeof profile==='undefined'||typeof nutrition==='undefined') return;
  const _ndt=document.getElementById('nutr-dt'); if(_ndt) _ndt.textContent='Oggi';
  const nt=todayNutr();
  const totals = calcNutritionTotals(nt);
  const eaten = totals.eaten;
  const ep = totals.p;
  const ec = totals.c;
  const eg = totals.g;
  const tgt=safeKcal(profile.kcalTarget)||2500;
  const {p:tp,c:tc,g:tg}=profile.macros||{p:180,c:280,g:70};
  const pct=Math.min(100,Math.round(eaten/tgt*100));
  const rem=Math.max(0,tgt-eaten);

  // text nodes
  const nEaten=document.getElementById('n-eaten');
  if(nEaten) nEaten.textContent=eaten;
  const nTarget=document.getElementById('n-target');
  if(nTarget) nTarget.textContent='/ '+tgt+' kcal target';
  const nBar=document.getElementById('n-bar');
  if(nBar) nBar.style.width=pct+'%';
  const nRem=document.getElementById('n-rem');
  if(nRem) nRem.textContent=rem>0?rem+' kcal rimanenti':'🎉 Obiettivo raggiunto!';
  const nBarPct=document.getElementById('n-bar-pct');
  if(nBarPct) nBarPct.textContent=pct+'%';

  // ── update new multi-arc ring ──
  // outer ring: kcal (r=50, circ=314)
  const kcalArc=document.getElementById('nr-kcal-arc');
  if(kcalArc){ const off=314*(1-pct/100); kcalArc.style.strokeDashoffset=off; }
  // middle ring: protein (r=38, circ=239)
  const pArc=document.getElementById('nr-p-arc');
  if(pArc){ const pPct=Math.min(100,tp>0?Math.round(ep/tp*100):0); pArc.style.strokeDashoffset=239*(1-pPct/100); }
  // inner ring: carbs (r=26, circ=163)
  const cArc=document.getElementById('nr-c-arc');
  if(cArc){ const cPct=Math.min(100,tc>0?Math.round(ec/tc*100):0); cArc.style.strokeDashoffset=163*(1-cPct/100); }
  // innermost ring: fat (r=14, circ=88)
  const gArc=document.getElementById('nr-g-arc');
  if(gArc){ const gPct=Math.min(100,tg>0?Math.round(eg/tg*100):0); gArc.style.strokeDashoffset=88*(1-gPct/100); }

  setNM('nm-pv','nm-pb','nm-pc',ep,tp,'var(--green)');
  setNM('nm-cv','nm-cb','nm-cc',ec,tc,'var(--blue)');
  setNM('nm-gv','nm-gb','nm-gc',eg,tg,'var(--orange)');
  renderMeals(nt);
}
function setNM(vid,bid,cid,curr,tgt,color){
  const pct=Math.min(100,tgt>0?Math.round(curr/tgt*100):0);
  const ve=document.getElementById(vid); if(ve) ve.textContent=curr+'g';
  const be=document.getElementById(bid); if(be){be.style.width=pct+'%';be.style.background=color;}
  const ce=document.getElementById(cid); if(ce) ce.textContent='/ '+tgt+'g';
}
function renderMeals(nt){
  const wrap=document.getElementById('meals-wrap');
  if(!wrap) return;
  const mealIcos=['☀️','🍴','🌙','🍎'];
  wrap.innerHTML=(nt.meals||[]).map((m,mi)=>{
    const mkcal=(m.items||[]).reduce((a,it)=>a+safeNumber(it?.kcal, 0, 50000, 0),0);
    const itemsH=m.items.map((it,ii)=>`
      <div class="food-row">
        <div><div class="food-nm">${it.name}</div><div class="food-meta">${it.g}${it.unit||'g'} · P:${it.p}g C:${it.c}g G:${it.g_fat}g</div></div>
        <div class="food-kcal-wrap"><div class="food-kcal">${it.kcal} kcal</div><div class="food-del" onclick="removeFood(${mi},${ii})">Elimina</div></div>
      </div>`).join('');
    return `<div class="meal-card">
      <div class="meal-head" onclick="toggleMeal(this)">
        <div class="meal-head-l"><span class="meal-ico">${mealIcos[mi]||'🍽️'}</span><span class="meal-nm">${m.name}</span></div>
        <span class="meal-kcal">${mkcal} kcal</span>
      </div>
      <div class="meal-items" id="mi-${mi}">${itemsH}</div>
      <div class="meal-add-btn" onclick="openFoodSheet(${mi})">＋ Aggiungi alimento</div>
    </div>`;
  }).join('');
}
function toggleMeal(hd){const items=hd.nextElementSibling;items.style.display=items.style.display==='block'?'none':'block';}
function removeFood(mi,ii){const nt=todayNutr();nt.meals[mi].items.splice(ii,1);saveAll();renderNutrizione();}
function openFoodSheet(mi){
  addFoodMeal=mi;
  const _fsnm=document.getElementById('fs-meal-nm'); if(_fsnm) _fsnm.textContent='Aggiungi a: '+todayNutr().meals[mi].name;
  const _fsq=document.getElementById('fs-q'); if(_fsq) _fsq.value='';
  renderFoodList('');
  const _fovl=document.getElementById('food-ovl'); if(_fovl) _fovl.classList.add('open');
}
function closeFoodSheet(){const _fovl=document.getElementById('food-ovl');if(_fovl)_fovl.classList.remove('open');}
function filterFood(){const _fsq=document.getElementById('fs-q');renderFoodList(_fsq?_fsq.value.toLowerCase():'');}
function renderFoodList(q){
  const list=FOOD_DB.filter(f=>!q||(f.name||'').toLowerCase().includes(q));
  const _fsl=document.getElementById('fs-list');
  if(!_fsl) return;
  _fsl.innerHTML=list.map(f=>`
    <div class="food-item" onclick="addFood('${f.id}')">
      <div style="flex:1"><div class="fi-nm">${f.name}</div><div class="fi-meta">${f.kcal} kcal/100${f.unit||'g'} · P:${f.p}g C:${f.c}g G:${f.g}g</div></div>
      <div class="fi-add">＋</div>
    </div>`).join('');
}
// Stato temporaneo per la selezione alimento
let _pendingFood = null;

function addFood(id){
  const f=FOOD_DB.find(x=>x.id===id);
  if(!f||addFoodMeal===null) return;
  _pendingFood = f;
  // Mostra sheet di conferma quantità inline
  openFoodQtySheet(f);
}

function openFoodQtySheet(f){
  // Rimuovi eventuale precedente
  document.getElementById('food-qty-ovl')?.remove();
  const defaultQty = f.unit==='pz'?'1':'100';
  const ovl = document.createElement('div');
  ovl.id = 'food-qty-ovl';
  ovl.style.cssText = 'position:fixed;inset:0;z-index:450;background:rgba(0,0,0,.75);display:flex;align-items:flex-end;justify-content:center;backdrop-filter:blur(4px);';
  ovl.innerHTML = `
    <div style="background:var(--bg2);border:1px solid var(--border2);
      border-radius:var(--r-xl) var(--r-xl) 0 0;width:100%;max-width:480px;
      padding:0 0 calc(20px + var(--safe-bot));
      animation:slideUp .28s cubic-bezier(.22,1,.36,1) both;">
      <div style="width:36px;height:4px;border-radius:99px;background:var(--border2);margin:10px auto 12px;"></div>
      <div style="padding:0 20px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-size:15px;font-weight:800;">${f.name}</div>
          <div style="font-size:11px;color:var(--text2);margin-top:2px;">${f.kcal} kcal / 100${f.unit} · P:${f.p}g C:${f.c}g G:${f.g}g</div>
        </div>
        <button onclick="document.getElementById('food-qty-ovl').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:30px;height:30px;color:var(--text2);cursor:pointer;font-size:14px;">✕</button>
      </div>
      <div style="padding:16px 20px 4px;">
        <div style="font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;">Quantità (${f.unit})</div>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:14px;">
          <button onclick="adjustFoodQty(-10)" style="width:42px;height:42px;background:var(--bg4);border:1px solid var(--border2);border-radius:var(--r);font-size:18px;font-weight:700;color:var(--text2);cursor:pointer;">−</button>
          <input id="food-qty-inp" type="number" min="1" step="${f.unit==='pz'?'1':'5'}" value="${defaultQty}"
            style="flex:1;text-align:center;background:var(--bg3);border:1.5px solid var(--acc);
              border-radius:var(--r);padding:10px;font-size:22px;font-weight:700;
              font-family:'DM Mono',monospace;color:var(--text);outline:none;"
            oninput="updateFoodPreview()">
          <button onclick="adjustFoodQty(+10)" style="width:42px;height:42px;background:var(--bg4);border:1px solid var(--border2);border-radius:var(--r);font-size:18px;font-weight:700;color:var(--text2);cursor:pointer;">＋</button>
        </div>
        <div id="food-qty-preview" style="background:var(--bg3);border-radius:var(--r-sm);padding:10px 14px;font-size:12px;color:var(--text2);text-align:center;margin-bottom:14px;">—</div>
        <button onclick="confirmAddFood()" style="width:100%;padding:14px;background:var(--acc);color:#080810;border:none;border-radius:var(--r-lg);font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer;letter-spacing:.03em;">
          ＋ Aggiungi al pasto
        </button>
      </div>
    </div>`;
  document.body.appendChild(ovl);
  ovl.addEventListener('click', e=>{ if(e.target===ovl) ovl.remove(); });
  setTimeout(()=>{ document.getElementById('food-qty-inp')?.focus(); updateFoodPreview(); }, 80);
}

function adjustFoodQty(delta){
  const inp = document.getElementById('food-qty-inp');
  if(!inp) return;
  const cur = parseFloat(inp.value)||0;
  inp.value = Math.max(1, cur+delta);
  updateFoodPreview();
}

function updateFoodPreview(){
  const f = _pendingFood;
  const inp = document.getElementById('food-qty-inp');
  const prev = document.getElementById('food-qty-preview');
  if(!f||!inp||!prev) return;
  const g = parseFloat(inp.value)||0;
  const r = g/100;
  const kcal = Math.round(f.kcal*r);
  const p = Math.round(f.p*r);
  const c = Math.round(f.c*r);
  const gf = Math.round(f.g*r);
  prev.innerHTML = `<strong style="color:var(--acc);font-size:15px;">${kcal} kcal</strong>&nbsp; · &nbsp;P:${p}g &nbsp;C:${c}g &nbsp;G:${gf}g`;
}

function confirmAddFood(){
  const f = _pendingFood;
  if(!f||addFoodMeal===null){ document.getElementById('food-qty-ovl')?.remove(); return; }
  const g = parseFloat(document.getElementById('food-qty-inp')?.value)||100;
  const r = g/100;
  todayNutr().meals[addFoodMeal].items.push({
    name:f.name, g, unit:f.unit,
    kcal: safeKcal(Math.round(f.kcal*r)),
    p:    safeNumber(Math.round(f.p*r), 0, 500, 0),
    c:    safeNumber(Math.round(f.c*r), 0, 500, 0),
    g_fat:safeNumber(Math.round(f.g*r), 0, 500, 0)
  });
  saveAll();
  document.getElementById('food-qty-ovl')?.remove();
  closeFoodSheet();
  renderNutrizione();
  renderHome();
  showToast('✅ '+f.name+' aggiunto');
  _pendingFood = null;
}
document.getElementById('food-ovl').addEventListener('click',e=>{if(e.target===document.getElementById('food-ovl'))closeFoodSheet();});
function openNutrGoals(){
  if(document.getElementById('ngs-modal')) return;
  _ensureGoals();

  const g   = profile.goalsMeta || {};
  const m   = profile.macros    || {p:180,c:280,g:70};
  const ph  = profile.physique  || {};
  const kcal= profile.kcalTarget || g.calories || 2500;
  const tdee= profile.tdee || kcal;
  const bw  = ph.weight || 75;
  const gt  = g.goalType || 'maintain';
  const pset= profile._macroPset || gt;

  /* mode: ratios | fixed | keto */
  const mode= profile._macroMode || 'ratios';

  /* calc current % */
  const totKc = m.p*4 + m.c*4 + m.g*9 || kcal;
  const pPct = Math.round(m.p*4/totKc*100) || 25;
  const cPct = Math.round(m.c*4/totKc*100) || 45;
  const gPct = 100-pPct-cPct;

  const ovl = document.createElement('div');
  ovl.id = 'ngs-modal';
  ovl.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:99999;display:flex;align-items:flex-end;backdrop-filter:blur(10px)';

  ovl.innerHTML = `
  <div id="ngs-sheet" style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:26px 26px 0 0;width:100%;max-height:94vh;overflow-y:auto;padding:0 0 48px">

    
    <div style="display:flex;justify-content:center;padding:12px 0 0">
      <div style="width:40px;height:4px;border-radius:4px;background:var(--border2)"></div>
    </div>

    
    <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px 4px">
      <div style="font-size:18px;font-weight:800">Macro &amp; Energia</div>
      <button onclick="document.getElementById('ngs-modal').remove()"
        style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center">&times;</button>
    </div>

    
    <div style="margin:16px 20px 0;background:var(--bg3);border-radius:16px;padding:18px 20px">
      <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:10px">Target Calorico Giornaliero</div>
      <div style="display:flex;align-items:center;gap:12px">
        <input id="ngs-kcal" type="number" step="50" min="1000" max="8000" value="${kcal}"
          oninput="ngsKcalChange()"
          style="flex:1;background:var(--bg4);border:2px solid var(--border2);border-radius:12px;padding:12px 16px;font-size:22px;font-family:'DM Mono',monospace;color:var(--acc);outline:none;font-weight:700">
        <div style="font-size:14px;color:var(--text2);font-weight:700">kcal</div>
      </div>
      <div style="font-size:11px;color:var(--text2);margin-top:8px">TDEE calcolato: <b style="color:var(--text)">${tdee} kcal</b></div>
      
      <div style="display:flex;gap:8px;margin-top:10px">
        <button onclick="ngsSetKcal(${tdee})" style="flex:1;padding:7px 0;background:var(--bg4);border:1px solid var(--border);border-radius:9px;color:var(--text2);font-size:11px;font-weight:700;cursor:pointer">= TDEE</button>
        <button onclick="ngsSetKcal(${Math.round(tdee*0.80)})" style="flex:1;padding:7px 0;background:var(--red-d);border:1px solid rgba(255,92,106,.25);border-radius:9px;color:var(--red);font-size:11px;font-weight:700;cursor:pointer">&#8722;20% Cut</button>
        <button onclick="ngsSetKcal(${Math.round(tdee*1.10)})" style="flex:1;padding:7px 0;background:var(--green-d);border:1px solid rgba(62,223,138,.25);border-radius:9px;color:var(--green);font-size:11px;font-weight:700;cursor:pointer">+10% Bulk</button>
        <button onclick="ngsSetKcal(${Math.round(tdee*1.15)})" style="flex:1;padding:7px 0;background:var(--green-d);border:1px solid rgba(62,223,138,.25);border-radius:9px;color:var(--green);font-size:11px;font-weight:700;cursor:pointer">+15%</button>
      </div>
    </div>

    
    <div style="padding:20px 20px 0">
      <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:12px">Macro Target</div>

      
      <div style="display:flex;background:var(--bg4);border-radius:12px;padding:3px;gap:3px;margin-bottom:18px">
        ${['ratios','fixed','keto'].map(mo=>`
        <button onclick="ngsSetMode('${mo}')" id="ngs-tab-${mo}"
          style="flex:1;padding:9px 0;border:none;border-radius:9px;font-family:'Syne',sans-serif;font-size:12px;font-weight:800;cursor:pointer;transition:all .15s;
            background:${mode===mo?'var(--acc)':'transparent'};
            color:${mode===mo?'#080810':'var(--text2)'}">
          ${{ratios:'Proporzioni',fixed:'Fisso',keto:'Keto'}[mo]}
        </button>`).join('')}
      </div>

      
      <div id="ngs-panel-ratios" style="display:${mode==='ratios'?'block':'none'}">
        <div style="font-size:12px;color:var(--text2);margin-bottom:14px;line-height:1.6">Le proporzioni dividono l'energia in proteine, carbs e grassi. Al variare delle calorie i grammi si aggiornano in automatico.</div>

        
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:8px">Preset obiettivo</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
          ${[['cut','Definizione 📉','var(--red)'],['bulk','Massa 📈','var(--green)'],['maintain','Mantenimento ⚖️','var(--blue)'],['recomp','Recomp 🔄','var(--purple)'],['custom','Personalizzato ✏️','var(--acc)']].map(([k,lbl,col])=>`
          <div onclick="ngsSelectPreset('${k}')" id="ngs-pre-${k}"
            style="padding:11px 13px;border-radius:12px;cursor:pointer;transition:all .15s;
              border:1.5px solid ${pset===k?col:'var(--border)'};
              background:${pset===k?'rgba(255,255,255,.04)':'var(--bg3)'};
              ${k==='custom'?'grid-column:1/-1':''}">
            <div style="font-size:13px;font-weight:700;color:${pset===k?col:'var(--text)'}">${lbl}</div>
          </div>`).join('')}
        </div>


        
        <div id="ngs-sliders" style="margin-bottom:6px">
          <div id="ngs-custom-notice" style="font-size:11px;color:var(--text2);margin-bottom:12px;display:none">Inserisci le percentuali e premi <b>Applica</b> per confermare.</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px">
            ${[['p','Proteine',pPct,'var(--green)'],['c','Carbs',cPct,'var(--blue)'],['g','Grassi',gPct,'var(--orange)']].map(([k,lbl,pct,col])=>`
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
              <div style="font-size:11px;font-weight:800;color:${col};text-align:center">${lbl}</div>
              <div style="display:flex;align-items:center;gap:4px">
                <input type="number" id="ngs-inp-${k}" min="5" max="80" step="1" value="${pct}"
                  style="width:62px;background:var(--bg3);border:2px solid ${col}40;border-radius:10px;padding:8px 5px;font-size:18px;font-family:'DM Mono',monospace;color:${col};outline:none;text-align:center;font-weight:800"
                  oninput="ngsInpChange()">
                <span style="font-size:13px;font-weight:700;color:${col}">%</span>
              </div>
              <div id="ngs-g-${k}" style="font-size:12px;font-weight:800;font-family:'DM Mono',monospace;color:${col}">—g</div>
              <div id="ngs-kcl-${k}" style="font-size:10px;color:var(--text3)">—kcal</div>
            </div>`).join('')}
          </div>
          <div id="ngs-pct-total" style="text-align:center;font-size:11px;padding:6px;border-radius:8px;background:var(--bg4);color:var(--text2);margin-bottom:10px">Totale: ${pPct+cPct+gPct}%</div>
          <button onclick="ngsApplyCustomPct()" id="ngs-apply-btn"
            style="width:100%;padding:11px;background:var(--acc4);border:1.5px solid rgba(200,245,60,.3);border-radius:12px;color:var(--acc);font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer;display:none">
            ✅ Applica percentuali
          </button>
        </div>
      </div>

      
      <div id="ngs-panel-fixed" style="display:${mode==='fixed'?'block':'none'}">
        <div style="font-size:12px;color:var(--text2);margin-bottom:14px;line-height:1.6">Imposta i grammi esatti per ogni macro. Le calorie vengono ricalcolate automaticamente.</div>
        <div style="display:flex;flex-direction:column;gap:12px">
          ${[['p','Proteine',m.p,'var(--green)','4 kcal/g'],['c','Carbs',m.c,'var(--blue)','4 kcal/g'],['g','Grassi',m.g,'var(--orange)','9 kcal/g']].map(([k,lbl,val,col,hint])=>`
          <div style="background:var(--bg3);border-radius:12px;padding:14px 16px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
              <div style="font-size:13px;font-weight:700;color:${col}">${lbl}</div>
              <div style="font-size:10px;color:var(--text3)">${hint}</div>
            </div>
            <div style="display:flex;align-items:center;gap:10px">
              <input id="ngs-fix-${k}" type="number" min="0" max="600" value="${val}" oninput="ngsFixedChange()"
                style="flex:1;background:var(--bg4);border:1.5px solid var(--border);border-radius:10px;padding:10px 14px;font-size:18px;font-family:'DM Mono',monospace;color:${col};outline:none">
              <div style="font-size:13px;color:var(--text2)">g</div>
              <div id="ngs-fix-kc-${k}" style="font-size:12px;color:var(--text3);min-width:56px;text-align:right">— kcal</div>
            </div>
          </div>`).join('')}
        </div>
        <div id="ngs-fix-total" style="margin-top:12px;padding:12px 16px;background:var(--bg3);border-radius:12px;font-size:13px;font-weight:700;color:var(--text2)">
          Totale macro: — kcal
        </div>
      </div>

      
      <div id="ngs-panel-keto" style="display:${mode==='keto'?'block':'none'}">
        <div style="font-size:12px;color:var(--text2);margin-bottom:14px;line-height:1.6">Dieta chetogenica classica: carboidrati molto bassi, grassi elevati.</div>
        <div style="background:var(--acc4);border:1px solid rgba(200,245,60,.2);border-radius:12px;padding:14px 16px;margin-bottom:16px">
          <div style="font-size:12px;font-weight:800;color:var(--acc);margin-bottom:6px">Distribuzione consigliata Keto</div>
          <div style="font-size:11px;color:var(--text2);line-height:1.7">
            🥩 <b>Proteine: 25%</b> — massa magra preservata<br>
            🥑 <b>Grassi: 70%</b> — fonte energetica principale<br>
            🌾 <b>Carbs: 5%</b> — sotto soglia chetogenica (&lt;25-30g/die)
          </div>
        </div>
        <div id="ngs-keto-result" style="background:var(--bg3);border-radius:12px;padding:14px 16px">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center">
            <div><div id="ngs-keto-p" style="font-size:20px;font-weight:800;color:var(--green)">—</div><div style="font-size:10px;color:var(--text2)">Proteine g</div></div>
            <div><div id="ngs-keto-c" style="font-size:20px;font-weight:800;color:var(--blue)">—</div><div style="font-size:10px;color:var(--text2)">Carbs g</div></div>
            <div><div id="ngs-keto-g" style="font-size:20px;font-weight:800;color:var(--orange)">—</div><div style="font-size:10px;color:var(--text2)">Grassi g</div></div>
          </div>
        </div>
        <div style="margin-top:14px;padding:10px 14px;background:var(--red-d);border:1px solid rgba(255,92,106,.2);border-radius:10px;font-size:11px;color:var(--text2);line-height:1.6">
          ⚠️ La dieta chetogenica è restrittiva. Consulta un professionista prima di iniziarla.
        </div>
      </div>

      
      <div id="ngs-summary" style="margin-top:16px;background:var(--bg3);border:1px solid var(--border2);border-radius:14px;padding:16px">
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:12px">Riepilogo macro calcolati</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center">
          <div><div id="ngs-sum-p" style="font-size:22px;font-weight:800;color:var(--green)">—</div><div style="font-size:10px;color:var(--text2)">Proteine g</div><div id="ngs-sum-pkc" style="font-size:10px;color:var(--text3)">—</div></div>
          <div><div id="ngs-sum-c" style="font-size:22px;font-weight:800;color:var(--blue)">—</div><div style="font-size:10px;color:var(--text2)">Carbs g</div><div id="ngs-sum-ckc" style="font-size:10px;color:var(--text3)">—</div></div>
          <div><div id="ngs-sum-g" style="font-size:22px;font-weight:800;color:var(--orange)">—</div><div style="font-size:10px;color:var(--text2)">Grassi g</div><div id="ngs-sum-gkc" style="font-size:10px;color:var(--text3)">—</div></div>
        </div>
        <div id="ngs-sum-check" style="font-size:11px;margin-top:10px;padding:8px;border-radius:8px;background:var(--bg4);text-align:center"></div>
      </div>
    </div>

    
    <div style="padding:20px 20px 0">
      <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:12px">Alimenti &amp; Pasti</div>

      
      <div style="background:var(--bg3);border-radius:14px;margin-bottom:10px;overflow:hidden">
        <div style="display:flex;align-items:center;gap:14px;padding:14px 16px">
          <div style="width:40px;height:40px;border-radius:12px;background:var(--orange-d);display:flex;align-items:center;justify-content:center;font-size:20px">🍎</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:700">Alimenti personalizzati</div>
            <div style="font-size:11px;color:var(--text2)">Aggiungi qualsiasi alimento con i tuoi macro per 100g</div>
          </div>
        </div>
        <div style="display:flex;gap:8px;padding:0 16px 14px">
          <button onclick="document.getElementById('ngs-modal').remove();openAddCustomFoodModal()"
            style="flex:1;padding:10px;background:var(--acc);border:none;border-radius:10px;color:#080810;font-size:12px;font-weight:800;cursor:pointer;font-family:'Syne',sans-serif">
            &#10133; Crea alimento
          </button>
          <button onclick="document.getElementById('ngs-modal').remove();openCustomFoodsList()"
            style="flex:1;padding:10px;background:var(--bg4);border:1px solid var(--border);border-radius:10px;color:var(--text2);font-size:12px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif">
            &#128203; I miei
          </button>
        </div>
      </div>

      
      <div style="background:var(--bg3);border-radius:14px;margin-bottom:10px;overflow:hidden">
        <div style="display:flex;align-items:center;gap:14px;padding:14px 16px">
          <div style="width:40px;height:40px;border-radius:12px;background:var(--blue-d);display:flex;align-items:center;justify-content:center;font-size:20px">🍽️</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:700">Pasti personalizzati</div>
            <div style="font-size:11px;color:var(--text2)">Combina alimenti in un pasto per aggiungere tutto in un tap</div>
          </div>
        </div>
        <div style="padding:0 16px 14px">
          <button onclick="ngsOpenCustomMeal()"
            style="width:100%;padding:10px;background:var(--bg4);border:1px solid var(--border);border-radius:10px;color:var(--blue);font-size:12px;font-weight:700;cursor:pointer;font-family:'Syne',sans-serif">
            &#10133; Crea pasto
          </button>
        </div>
      </div>

      
      <div style="background:var(--bg3);border-radius:14px;margin-bottom:10px;overflow:hidden">
        <div style="display:flex;align-items:center;gap:14px;padding:14px 16px">
          <div style="width:40px;height:40px;border-radius:12px;background:var(--green-d);display:flex;align-items:center;justify-content:center;font-size:20px">🔁</div>
          <div style="flex:1">
            <div style="font-size:14px;font-weight:700">Pasti ripetuti</div>
            <div style="font-size:11px;color:var(--text2)">Aggiungi velocemente gli alimenti che mangi più spesso</div>
          </div>
          <button onclick="ngsAddRepeat()"
            style="background:var(--green-d);border:1px solid rgba(62,223,138,.2);border-radius:8px;padding:7px 12px;color:var(--green);font-size:12px;font-weight:700;cursor:pointer">&#10133;</button>
        </div>
        <div id="ngs-repeat-list" style="padding:0 16px 14px;display:flex;flex-direction:column;gap:7px"></div>
      </div>
    </div>

    
    <div style="padding:20px">
      <button onclick="ngsSave()"
        style="width:100%;padding:16px;background:var(--acc);color:#080810;border:none;border-radius:16px;font-family:'Syne',sans-serif;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:.02em">
        &#128190; Salva impostazioni
      </button>
    </div>
  </div>`;

  document.body.appendChild(ovl);

  // Close on backdrop tap
  ovl.addEventListener('click', e => { if(e.target===ovl) ovl.remove(); });

  window._ngsMode = mode;
  window._ngsPset = pset;
  // Initialize custom pct: prefer saved custom pct from profile, then derive from current macros
  if(profile._customMacroPct && pset==='custom'){
    window._ngsCustomPct=profile._customMacroPct;
  } else {
    const totKc2=m.p*4+m.c*4+m.g*9||kcal;
    window._ngsCustomPct={p:m.p*4/totKc2,c:m.c*4/totKc2,g:m.g*9/totKc2};
  }
  // Pre-select the right preset visually
  if(typeof ngsSelectPreset==='function') setTimeout(()=>ngsSelectPreset(pset),0);
  ngsRefresh();
  ngsLoadRepeat();
}
window.openNutrGoals = openNutrGoals;

/* ── Helpers NGS ───────────────────────────────────────────────── */
window.ngsSetKcal = function(v){
  const inp=document.getElementById('ngs-kcal');
  if(inp){inp.value=v; ngsKcalChange();}
};
window.ngsKcalChange = function(){ ngsRefresh(); };

window.ngsSetMode = function(mo){
  window._ngsMode = mo;
  ['ratios','fixed','keto'].forEach(t=>{
    const btn=document.getElementById('ngs-tab-'+t);
    if(btn){btn.style.background=t===mo?'var(--acc)':'transparent';btn.style.color=t===mo?'#080810':'var(--text2)';}
    const panel=document.getElementById('ngs-panel-'+t);
    if(panel) panel.style.display=t===mo?'block':'none';
  });
  ngsRefresh();
};

window.ngsSelectPreset = function(k){
  window._ngsPset = k;
  const presets={
    cut:{p:30,c:40,g:30},bulk:{p:25,c:50,g:25},
    maintain:{p:25,c:45,g:30},recomp:{p:30,c:40,g:30},custom:null
  };
  const cols={cut:'var(--red)',bulk:'var(--green)',maintain:'var(--blue)',recomp:'var(--purple)',custom:'var(--acc)'};
  ['cut','bulk','maintain','recomp','custom'].forEach(t=>{
    const el=document.getElementById('ngs-pre-'+t);
    if(!el)return;
    const active=t===k;
    el.style.borderColor=active?cols[t]:'var(--border)';
    el.style.background=active?'rgba(255,255,255,.04)':'var(--bg3)';
    el.querySelector('div').style.color=active?cols[t]:'var(--text)';
  });
  // Show/hide apply button and notice
  const applyBtn=document.getElementById('ngs-apply-btn');
  const notice=document.getElementById('ngs-custom-notice');
  if(applyBtn)applyBtn.style.display=k==='custom'?'block':'none';
  if(notice)notice.style.display=k==='custom'?'block':'none';
  if(k!=='custom' && presets[k]){
    const ip=document.getElementById('ngs-inp-p');
    const ic=document.getElementById('ngs-inp-c');
    const ig=document.getElementById('ngs-inp-g');
    if(ip)ip.value=presets[k].p;
    if(ic)ic.value=presets[k].c;
    if(ig)ig.value=presets[k].g;
    window._ngsCustomPct={p:presets[k].p/100,c:presets[k].c/100,g:presets[k].g/100};
  }
  ngsInpChange();
  ngsRefresh();
};

window.ngsInpChange = function(){
  const total=['p','c','g'].reduce((a,k)=>a+(parseInt(document.getElementById('ngs-inp-'+k)?.value)||0),0);
  const tEl=document.getElementById('ngs-pct-total');
  const ok=total===100;
  if(tEl){tEl.textContent='Totale: '+total+'%';tEl.style.color=ok?'var(--green)':'var(--orange)';}
  const applyBtn=document.getElementById('ngs-apply-btn');
  if(applyBtn&&window._ngsPset==='custom'){applyBtn.style.opacity=ok?'1':'0.5';applyBtn.style.cursor=ok?'pointer':'not-allowed';}
  // For non-custom presets, update in real time
  if(window._ngsPset!=='custom'){
    window._ngsCustomPct={
      p:parseInt(document.getElementById('ngs-inp-p')?.value||25)/100,
      c:parseInt(document.getElementById('ngs-inp-c')?.value||45)/100,
      g:parseInt(document.getElementById('ngs-inp-g')?.value||30)/100
    };
    ngsRefresh();
  }
};

window.ngsApplyCustomPct = function(){
  const total=['p','c','g'].reduce((a,k)=>a+(parseInt(document.getElementById('ngs-inp-'+k)?.value)||0),0);
  if(total!==100){if(typeof showToast==='function')showToast('⚠️ La somma deve essere 100%. Ora è '+total+'%');return;}
  window._ngsCustomPct={
    p:parseInt(document.getElementById('ngs-inp-p')?.value||30)/100,
    c:parseInt(document.getElementById('ngs-inp-c')?.value||45)/100,
    g:parseInt(document.getElementById('ngs-inp-g')?.value||25)/100
  };
  ngsRefresh();
  if(typeof showToast==='function')showToast('✅ Percentuali applicate!');
};

window.ngsFixedChange = function(){
  const p=parseFloat(document.getElementById('ngs-fix-p')?.value)||0;
  const c=parseFloat(document.getElementById('ngs-fix-c')?.value)||0;
  const g=parseFloat(document.getElementById('ngs-fix-g')?.value)||0;
  const setKc=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val+' kcal';};
  setKc('ngs-fix-kc-p',Math.round(p*4));
  setKc('ngs-fix-kc-c',Math.round(c*4));
  setKc('ngs-fix-kc-g',Math.round(g*9));
  const tot=Math.round(p*4+c*4+g*9);
  const ftEl=document.getElementById('ngs-fix-total');
  if(ftEl) ftEl.innerHTML=`Totale macro: <b style="color:var(--acc)">${tot} kcal</b>`;
  ngsUpdateSummary({p:Math.round(p),c:Math.round(c),g:Math.round(g)},tot);
  // Sync kcal input
  const ki=document.getElementById('ngs-kcal');
  if(ki){ki.value=tot;}
};

function ngsRefresh(){
  const kcal=parseFloat(document.getElementById('ngs-kcal')?.value)||2000;
  const mode=window._ngsMode||'ratios';
  let macros;

  if(mode==='ratios'){
    const pct=window._ngsCustomPct||{p:0.25,c:0.45,g:0.30};
    macros={p:Math.round(kcal*pct.p/4),c:Math.round(kcal*pct.c/4),g:Math.round(kcal*pct.g/9)};
    // Update gram/kcal labels
    ['p','c','g'].forEach(k=>{
      const gEl=document.getElementById('ngs-g-'+k);
      const kEl=document.getElementById('ngs-kcl-'+k);
      if(gEl)gEl.textContent=macros[k]+'g';
      if(kEl)kEl.textContent=(macros[k]*(k==='g'?9:4))+' kcal';
    });
    // Also sync the input values to reflect preset pct
    const inp={p:Math.round((pct.p||0)*100),c:Math.round((pct.c||0)*100),g:Math.round((pct.g||0)*100)};
    ['p','c','g'].forEach(k=>{const el=document.getElementById('ngs-inp-'+k);if(el&&el!==document.activeElement)el.value=inp[k];});
    // Update total
    const tot=inp.p+inp.c+inp.g;
    const tEl=document.getElementById('ngs-pct-total');
    if(tEl){tEl.textContent='Totale: '+tot+'%';tEl.style.color=tot===100?'var(--green)':'var(--orange)';}
  } else if(mode==='fixed'){
    const p=parseFloat(document.getElementById('ngs-fix-p')?.value)||0;
    const c=parseFloat(document.getElementById('ngs-fix-c')?.value)||0;
    const g=parseFloat(document.getElementById('ngs-fix-g')?.value)||0;
    macros={p:Math.round(p),c:Math.round(c),g:Math.round(g)};
    ngsFixedChange();
    window._ngsMacros=macros;
    return;
  } else if(mode==='keto'){
    macros={p:Math.round(kcal*0.25/4),c:Math.round(kcal*0.05/4),g:Math.round(kcal*0.70/9)};
    const sk=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v+'g';};
    sk('ngs-keto-p',macros.p);sk('ngs-keto-c',macros.c);sk('ngs-keto-g',macros.g);
  }

  window._ngsMacros=macros;
  ngsUpdateSummary(macros, kcal);
}
window.ngsRefresh=ngsRefresh;

function ngsUpdateSummary(macros, kcal){
  const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('ngs-sum-p',macros.p+'g'); set('ngs-sum-pkc',(macros.p*4)+' kcal');
  set('ngs-sum-c',macros.c+'g'); set('ngs-sum-ckc',(macros.c*4)+' kcal');
  set('ngs-sum-g',macros.g+'g'); set('ngs-sum-gkc',(macros.g*9)+' kcal');
  const fromM=macros.p*4+macros.c*4+macros.g*9;
  const diff=Math.abs(fromM-kcal);
  const chk=document.getElementById('ngs-sum-check');
  if(chk){
    chk.textContent=diff<=60?`✅ ${fromM} kcal — Macro coerenti`:`ℹ️ Macro → ${fromM} kcal (diff ${diff} kcal)`;
    chk.style.color=diff<=60?'var(--green)':'var(--text2)';
  }
  window._ngsMacros=macros;
}

/* ── Repeat Items ───────────────────────────────────────────────── */
const REPEAT_KEY='ft_repeat_foods';
function loadRepeat(){try{return JSON.parse(localStorage.getItem(REPEAT_KEY))||[];}catch(e){return[];}}
function saveRepeat(arr){localStorage.setItem(REPEAT_KEY,JSON.stringify(arr));}

window.ngsLoadRepeat=function(){
  const list=loadRepeat();
  const el=document.getElementById('ngs-repeat-list');
  if(!el)return;
  if(!list.length){el.innerHTML='<div style="font-size:11px;color:var(--text3);text-align:center;padding:4px 0">Nessun pasto ripetuto ancora</div>';return;}
  el.innerHTML=list.map((r,i)=>`
    <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--bg4);border-radius:10px">
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700">${r.name}</div>
        <div style="font-size:11px;color:var(--text2)">${r.kcal} kcal · P${r.p}g C${r.c}g G${r.g}g</div>
      </div>
      <button onclick="ngsAddRepeatToMeal(${i})" style="padding:6px 10px;background:var(--acc4);border:1px solid rgba(200,245,60,.2);border-radius:8px;color:var(--acc);font-size:11px;font-weight:700;cursor:pointer">+ Log</button>
      <button onclick="ngsDeleteRepeat(${i})" style="padding:6px 8px;background:var(--red-d);border:1px solid rgba(255,92,106,.2);border-radius:8px;color:var(--red);font-size:11px;cursor:pointer">&#128465;</button>
    </div>`).join('');
};

window.ngsAddRepeat=function(){
  _showProfileModal({
    title:'🔁 Pasto Ripetuto',
    fields:[
      {id:'name',label:'Nome pasto (es. Colazione proteica)',type:'text',value:''},
      {id:'kcal',label:'Calorie (kcal)',type:'number',value:'',min:0,max:9999},
      {id:'p',label:'Proteine (g)',type:'number',value:'',min:0,max:500},
      {id:'c',label:'Carboidrati (g)',type:'number',value:'',min:0,max:800},
      {id:'g',label:'Grassi (g)',type:'number',value:'',min:0,max:300},
    ],
    onSave(vals){
      if(!vals.name.trim()) return 'Inserisci un nome per il pasto';
      const kcal=parseInt(vals.kcal)||0;
      if(!kcal) return 'Inserisci le calorie';
      const arr=loadRepeat();
      arr.push({name:vals.name.trim(),kcal,p:parseInt(vals.p)||0,c:parseInt(vals.c)||0,g:parseInt(vals.g)||0});
      saveRepeat(arr);
      ngsLoadRepeat();
      showToast('🔁 Pasto ripetuto salvato');
    }
  });
};

window.ngsAddRepeatToMeal=function(i){
  const r=loadRepeat()[i];
  if(!r)return;
  const nt=todayNutr();
  if(!nt.meals||!nt.meals.length)return;
  nt.meals[0].items.push({fid:'repeat_'+Date.now(),name:r.name,qty:100,unit:'g',kcal:r.kcal,p:r.p,c:r.c,g:r.g});
  saveAll();
  renderNutrizione();
  document.getElementById('ngs-modal')?.remove();
  showToast('✅ '+r.name+' aggiunto al diario');
};

window.ngsDeleteRepeat=function(i){
  const arr=loadRepeat();arr.splice(i,1);saveRepeat(arr);ngsLoadRepeat();
};

window.ngsOpenCustomMeal=function(){
  document.getElementById('ngs-modal')?.remove();
  showToast('ℹ️ Funzione pasti personalizzati: aggiungi prima gli alimenti al diario, poi salvali come pasto');
};

/* ── Save ───────────────────────────────────────────────────────── */
window.ngsSave=async function(){
  const kcal=parseFloat(document.getElementById('ngs-kcal')?.value)||profile.kcalTarget||2500;
  const mode=window._ngsMode||'ratios';
  // Recalculate macros from latest custom pct to ensure freshness
  let macros;
  if(mode==='ratios'){
    const pct=window._ngsCustomPct||{p:0.25,c:0.45,g:0.30};
    macros={p:Math.round(kcal*pct.p/4),c:Math.round(kcal*pct.c/4),g:Math.round(kcal*pct.g/9)};
  } else {
    macros=window._ngsMacros||profile.macros||{p:180,c:280,g:70};
  }

  profile.kcalTarget=Math.round(kcal);
  profile.macros={p:Math.round(macros.p),c:Math.round(macros.c),g:Math.round(macros.g)};
  profile._macroMode=mode;
  profile._macroPset=window._ngsPset||'maintain';
  if(window._ngsCustomPct) profile._customMacroPct=window._ngsCustomPct;

  if(typeof updateGoals==='function')
    updateGoals({calories:Math.round(kcal),goalType:profile.goalsMeta?.goalType||'maintain'});

  if(typeof saveAll==='function') await saveAll();
  if(typeof renderNutrizione==='function') renderNutrizione();
  if(typeof renderHome==='function') renderHome();
  if(typeof renderProfilePage==='function') renderProfilePage();

  document.getElementById('ngs-modal')?.remove();
  showToast('✅ Salvato — '+Math.round(kcal)+' kcal · P'+Math.round(macros.p)+' C'+Math.round(macros.c)+' G'+Math.round(macros.g)+'g');
};

// ── PROGRESSI ────────────────────────────
function renderProgressi(){
  if(typeof sessions==='undefined'||typeof profile==='undefined') return;
  const streak=calcStreak();
  const _pgs=document.getElementById('pg-streak'); if(_pgs) _pgs.textContent=streak;
  const _pgss=document.getElementById('pg-streak-sub'); if(_pgss) _pgss.textContent=streak>0?streak+' giorni consecutivi. Continua così!':'Completa una sessione per iniziare!';

  // Weight goal card
  const wg = profile.weightGoal || {};
  const card = document.getElementById('pg-weight-goal-card');
  if(card && wg.goalWeight && profile.physique?.weight){
    card.style.display='block';
    const startW        = safeWeight(wg.startWeight || profile.physique.weight); // peso iniziale obiettivo
    const goalW         = safeWeight(wg.goalWeight);
    const currentActual = safeWeight(metrics.peso) || safeWeight(profile.physique.weight);
    const isGain        = goalW >= startW;
    const totalDiff     = Math.abs(goalW - startW);
    const doneDiff      = isGain
      ? Math.max(0, currentActual - startW)
      : Math.max(0, startW - currentActual);
    const progress = totalDiff > 0 ? Math.min(100, Math.round(doneDiff / totalDiff * 100)) : 100;

    // Calcola settimane rimanenti dinamicamente
    const kgLeft = Math.abs(goalW - currentActual);
    const weeklyRate = 0.5; // 0.5 kg/sett standard
    const weeksLeft = kgLeft < 0.1 ? 0 : Math.ceil(kgLeft / weeklyRate);
    const dateTarget = (() => {
      if(weeksLeft === 0) return 'Obiettivo raggiunto!';
      const d = new Date(); d.setDate(d.getDate() + weeksLeft * 7);
      return d.toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});
    })();

    // Popola elementi
    const elStart = document.getElementById('pg-wg-start');
    const elCur   = document.getElementById('pg-wg-cur');
    const elGoal  = document.getElementById('pg-wg-goal');
    const elTime  = document.getElementById('pg-wg-time');
    const elDate  = document.getElementById('pg-wg-date');
    const elBar   = document.getElementById('pg-wg-bar');
    const elPct   = document.getElementById('pg-wg-pct');
    const elKcal  = document.getElementById('pg-wg-kcal');
    const elSLbl  = document.getElementById('pg-wg-start-lbl');
    const elGLbl  = document.getElementById('pg-wg-goal-lbl');

    if(elStart) elStart.textContent = startW.toFixed(1);
    if(elCur)   elCur.textContent   = currentActual.toFixed(1);
    if(elGoal)  elGoal.textContent  = goalW.toFixed(1);
    if(elTime)  elTime.textContent  = weeksLeft === 0 ? '🎉 Raggiunto!' : `~${weeksLeft} sett.`;
    if(elDate)  elDate.textContent  = weeksLeft > 0 ? `📅 ${dateTarget}` : '';
    if(elBar)   elBar.style.width   = progress + '%';
    if(elPct)   elPct.textContent   = progress + '%';
    if(elKcal)  elKcal.textContent  = `🔥 ${profile.kcalTarget || '—'} kcal/gg · ${isGain ? 'surplus per massa' : 'deficit per definizione'}`;
    if(elSLbl)  elSLbl.textContent  = startW.toFixed(1) + ' kg';
    if(elGLbl)  elGLbl.textContent  = goalW.toFixed(1) + ' kg';

    // Colore dot e barra: verde se gain, lime se cut
    if(elBar) elBar.style.background = isGain
      ? 'linear-gradient(90deg,var(--blue),var(--green))'
      : 'linear-gradient(90deg,var(--acc),var(--green))';
  } else if(card){
    card.style.display='none';
  }

  renderVolChart();renderHeatmap();renderPBs();renderMuscleFatigue();
  const _mip=document.getElementById('mi-peso'); if(_mip) _mip.value=metrics.peso||'';
  const _mih=document.getElementById('mi-h'); if(_mih) _mih.value=metrics.altezza||'';
  const _mibr=document.getElementById('mi-br'); if(_mibr) _mibr.value=metrics.braccio||'';
  const _mipt=document.getElementById('mi-pt'); if(_mipt) _mipt.value=metrics.petto||'';
}
function renderVolChart(){
  const now=new Date();
  const lbls=['D','L','M','M','G','V','S'];
  const data=Array.from({length:7},(_,i)=>{
    const d=new Date(now);d.setDate(d.getDate()-6+i);
    const ds=d.toISOString().split('T')[0];
    return{lbl:lbls[d.getDay()],val:sessions.filter(s=>s.date===ds).reduce((a,s)=>a+(s.volume||0),0),dt:ds};
  });
  const max=Math.max(...data.map(d=>d.val),1);
  const tod=today();
  document.getElementById('vol-chart').innerHTML=data.map(d=>`
    <div class="bar-col">
      <div class="bar-v">${d.val||''}</div>
      <div class="bar${d.dt===tod?' peak':''}" style="height:${Math.max(4,Math.round(d.val/max*74))}px"></div>
      <div class="bar-l">${d.lbl}</div>
    </div>`).join('');
}
function renderHeatmap(){
  const now=new Date();let h='';
  for(let i=27;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);const ds=d.toISOString().split('T')[0];const c=sessions.filter(s=>s.date===ds).length;h+=`<div class="hm-c${c===0?'':c===1?' l2':c===2?' l3':' l4'}" title="${ds}"></div>`;}
  document.getElementById('hm-grid').innerHTML=h;
}
function renderPBs(){
  const el=document.getElementById('pb-list');
  const entries=Object.entries(pbs);
  if(!entries.length){el.innerHTML=`<div style="padding:16px 0;text-align:center;color:var(--text2);font-size:13px">Completa sessioni per vedere i tuoi record!</div>`;return;}
  el.innerHTML=entries.map(([id,v])=>{const ex=EX_DB.find(e=>e.id===id)||{name:id,icon:'🏅'};return`<div class="pb-row"><span class="pb-ico">${ex.icon||'🏅'}</span><div class="pb-nm">${ex.name}</div><div class="pb-val">${v}</div></div>`;}).join('');
}
async function saveMetrics(){
  const pesoEl = document.getElementById('mi-peso');
  const pesoVal = pesoEl ? safeNumber(pesoEl.value, 20, 400, null) : null;
  metrics={
    peso:    pesoEl?.value || '',
    altezza: document.getElementById('mi-h')?.value  || '',
    braccio: document.getElementById('mi-br')?.value || '',
    petto:   document.getElementById('mi-pt')?.value || ''
  };
  // Auto-track weight history when peso is updated
  if(pesoVal !== null) updateWeight(pesoVal);
  else await saveAll();
}

// ── COACH IA SUBSCREENS ──────────────────
function renderSubWorkout(){
  const pid=profile.recPreset;
  const rec=pid?PRESETS_DATA.find(x=>x.id===pid):null;
  document.getElementById('sub-workout-content').innerHTML=`
    ${rec?`<div class="rec-banner" style="margin-bottom:16px">
      <div class="rec-eye">🎯 Consigliato per i tuoi obiettivi</div>
      <div class="rec-nm">${rec.icon} ${rec.name}</div>
      <div class="rec-desc">${rec.desc}</div>
      <button class="rec-btn" style="margin-top:10px" onclick="startPreset(PRESETS_DATA.find(x=>x.id==='${rec.id}'))">▶ Inizia ora</button>
    </div>`:''}
    <button class="btn btn-ghost btn-full" style="margin-bottom:16px" onclick="closeSub('sub-workout');openNewSession()">⊕ Crea programma custom</button>
    <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px">TUTTI I PRESET</div>
    ${PRESETS_DATA.map(p=>{
      const tc=TC[p.t]||TC.custom;
      return `<div class="pres-card">
        <div class="pres-stripe" style="background:${p.color}"></div>
        <span class="pres-ico">${p.icon}</span>
        <div class="pres-nm">${p.name}</div>
        <div class="pres-desc">${p.desc}</div>
        <div class="pres-tags">
          <span class="ptag" style="background:${tc.bg};color:${tc.c}">${p.t}</span>
          <span class="ptag" style="background:var(--bg4);color:var(--text2)">${p.dur} min</span>
          <span class="ptag" style="background:var(--bg4);color:var(--text2)">${p.diff}</span>
          <span class="ptag" style="background:var(--bg4);color:var(--text2)">${p.days.filter(d=>!d.rest).length} sessioni/sett.</span>
        </div>
        <button class="pres-btn" onclick="startPreset(PRESETS_DATA.find(x=>x.id==='${p.id}'))">▶ Inizia allenamento</button>
      </div>`;
    }).join('')}`;
}

function renderSubNutrTips(){
  const goals=profile.goals||[];
  const isMassa=goals.includes('hypertrophy')||goals.includes('strength');
  const isDef=goals.includes('fat_loss');
  const kcal=profile.kcalTarget||2500;
  const tdee=profile.tdee||kcal;
  const {p:tp,c:tc,g:tg}=profile.macros||{p:180,c:280,g:70};

  document.getElementById('sub-nutr-content').innerHTML=`
    <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin-bottom:14px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--acc),var(--green))"></div>
      <div style="font-size:15px;font-weight:800;margin-bottom:12px">🧮 Calcolo Personalizzato</div>
      <div style="font-size:13px;color:var(--text2);line-height:1.8">
        TDEE base: <b style="color:var(--text)">${tdee} kcal</b><br>
        Target calorico: <b style="color:var(--acc)">${kcal} kcal/giorno</b><br>
        Proteine: <b style="color:var(--green)">${tp}g</b> · Carbs: <b style="color:var(--blue)">${tc}g</b> · Grassi: <b style="color:var(--orange)">${tg}g</b>
      </div>
    </div>
    ${[
      {ico:'☀️',t:'Pre-workout (1–1.5h prima)',b:'Carboidrati complessi + proteine. Riso + pollo, avena + whey, pane integrale + uova.'},
      {ico:'💪',t:'Post-workout (entro 30–45 min)',b:'40–50g proteine + carboidrati veloci. Whey + banana + pane bianco. Finestra anabolica.'},
      {ico:'🌙',t:'Prima di dormire',b:'20–30g caseina o ricotta. Rilascio lento di aminoacidi nelle 8–9 ore di sonno.'},
      {ico:'💧',t:'Idratazione',b:'2–3 litri d\'acqua al giorno. +500ml durante allenamento intenso.'},
      {ico:'💊',t:'Supplementazione',b:'Creatina 5g/die sempre. Vitamina D3 2000–3000 IU. Magnesio glicinato 300mg prima di dormire.'},
      isMassa?{ico:'🍗',t:'Per la massa muscolare',b:'Non scendere sotto '+(kcal-100)+' kcal. Aumenta di 200–300 kcal se il peso non sale in 2 settimane.'}:
      isDef?{ico:'🥗',t:'Per la definizione',b:'Deficit di 300–500 kcal. Mantieni alta la proteina (2g/kg) per preservare il muscolo. Riduci carbs la sera.'}:
             {ico:'⚖️',t:'Per il mantenimento',b:'Varia le calorie tra giorni di allenamento (+200 kcal) e riposo (-100 kcal). Ciclizza i carbs.'}
    ].map(t=>`<div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:10px">
      <div style="font-weight:700;margin-bottom:6px">${t.ico} ${t.t}</div>
      <div style="font-size:13px;color:var(--text2);line-height:1.65">${t.b}</div>
    </div>`).join('')}`;
}

function renderSubSkill(){
  document.getElementById('sub-skill-content').innerHTML=[
    {ico:'💪',nm:'Muscle-up',steps:['Explosive pull-up: tocca il petto alla sbarra — 5×3–5','Negative muscle-up: parti dall\'alto, scendi in 5 sec — 4×3','Muscle-up con banda leggera — 4×3–5','Muscle-up pulito: obiettivo 3 reps senza kip']},
    {ico:'🤸',nm:'Planche (da Tuck)',steps:['Tuck planche hold: consolida 4×20–30 sec','Tuck planche push-up: 3×5–8','Advanced tuck planche: 4×10–15 sec','Straddle planche: gambe aperte 4×8–12 sec']},
    {ico:'🏋️',nm:'L-Sit → V-Sit',steps:['L-sit sulle parallele: 4×25–45 sec','Consolida 45 sec prima di avanzare','V-sit: inclina busto, piedi sopra i fianchi 4×8–12 sec','Manna lean: 3×20 sec']},
    {ico:'🔥',nm:'Front Lever',steps:['Tucked front lever hold: 4×8–12 sec','Advanced tuck: 4×6–10 sec','One leg front lever: 4×5–8 sec','Full front lever: 3–5 sec target']},
  ].map(sk=>`<div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:16px;margin-bottom:12px">
    <div style="font-size:16px;font-weight:800;margin-bottom:12px">${sk.ico} ${sk.nm}</div>
    ${sk.steps.map((s,i)=>`<div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px">
      <div style="min-width:22px;height:22px;border-radius:50%;background:var(--acc3);color:var(--acc);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0">${i+1}</div>
      <div style="color:var(--text2)">${s}</div>
    </div>`).join('')}
    <div style="background:var(--acc4);border-radius:var(--r-sm);padding:10px;margin-top:10px;font-size:12px;color:var(--acc)">⚡ Regola: non avanzare prima di 2 settimane consecutive al livello attuale.</div>
  </div>`).join('');
}

function renderSubRecovery(){
  document.getElementById('sub-recovery-content').innerHTML=[
    {ico:'😴',t:'Sonno — il tuo steroide naturale',b:'8–9 ore per notte. Il GH picca nelle prime ore di sonno profondo. Meno di 7h = -20% testosterone, recupero dimezzato. Stesso orario ogni giorno.'},
    {ico:'🧘',t:'Mobilità attiva (15–20 min)',b:'Eseguila nei giorni di riposo. Hip flexor, spalle, colonna. Foam roller su femorali e polpacci. Previene infortuni da sovrauso.'},
    {ico:'❄️',t:'Freddo e calore',b:'Doccia fredda post-workout (2–3 min): riduce infiammazione. Sauna: aumenta GH. Niente ghiaccio diretto sui muscoli — interferisce col segnale anabolico.'},
    {ico:'📅',t:'Deload ogni 4–6 settimane',b:'Riduci volume del 40–50% per 1 settimana. Il corpo si adatta durante il recupero, non durante lo stress. Spesso si raggiungono PR la settimana dopo.'},
    {ico:'🍖',t:'Nutrizione per il recupero',b:'Entro 30 min post-workout: 40g proteine + carbs veloci. Magnesio prima di dormire. Non saltare i pasti nei giorni di riposo.'},
  ].map(t=>`<div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:16px;margin-bottom:10px">
    <div style="font-size:15px;font-weight:800;margin-bottom:8px">${t.ico} ${t.t}</div>
    <div style="font-size:13px;color:var(--text2);line-height:1.7">${t.b}</div>
  </div>`).join('');
}

// ── TOAST ────────────────────────────────
let toastTmr;
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  clearTimeout(toastTmr);toastTmr=setTimeout(()=>t.classList.remove('show'),2600);
}

// ════════════════════════════════════════
// V4 — THEME TOGGLE
// ════════════════════════════════════════
function toggleTheme(){
  document.body.classList.toggle('light-theme');
  const isLight=document.body.classList.contains('light-theme');
  localStorage.setItem('ft4_theme',isLight?'light':'dark');
}
function applyTheme(){
  if(localStorage.getItem('ft4_theme')==='light') document.body.classList.add('light-theme');
}
applyTheme();

// ════════════════════════════════════════
// V4 — TDEE EXTENDED (job + sleep + stress + pregnancy)
// ════════════════════════════════════════
// Show pregnancy field only for females
document.getElementById('ob-sex').addEventListener('change',function(){
  const pw=document.getElementById('ob-preg-wrap');
  if(pw) pw.style.display=this.value==='f'?'':'none';
  calcTDEE();
});

// Patch calcTDEE to include extra factors
const _origCalcTDEE=calcTDEE;
calcTDEE=function(){
  const age       = safeNumber(document.getElementById('ob-age')?.value,    13,  90,   0);
  const weight    = safeNumber(document.getElementById('ob-weight')?.value,  20, 400,   0);
  const height    = safeNumber(document.getElementById('ob-height')?.value, 100, 250,   0);
  const sex       = document.getElementById('ob-sex')?.value||'m';
  const act       = safeNumber(document.getElementById('ob-activity')?.value, 1.0, 2.5, 1.55);
  const jobExtra  = safeNumber(document.getElementById('ob-job')?.value,    0, 600,   0);
  const sleepAdj  = safeNumber(document.getElementById('ob-sleep')?.value, -200, 200,  0);
  const stressAdj = safeNumber(document.getElementById('ob-stress')?.value, -300, 0,   0);
  const pregAdj   = safeNumber(document.getElementById('ob-preg')?.value,   0, 500,   0);
  if(!age||!weight||!height){document.getElementById('tdee-result-wrap').style.display='none';return;}
  // Mifflin-St Jeor with adolescent bonus
  let bmr=sex==='m'?10*weight+6.25*height-5*age+5:10*weight+6.25*height-5*age-161;
  if(age<20) bmr*=1.06; // growing bonus for teens
  let tdee=Math.round(bmr*act)+jobExtra;
  // Sleep bad = less recovery = slightly higher need for repair but lower performance
  // We apply net: bad sleep = catabolic, reduce protein synthesis efficiency flag only
  const goals=obGoals;
  let kcalTarget=tdee;
  if(goals.includes('fat_loss')) kcalTarget=Math.round(tdee*0.82);
  else if(goals.includes('hypertrophy')||goals.includes('strength')) kcalTarget=Math.round(tdee*1.12);
  else if(goals.includes('endurance')) kcalTarget=Math.round(tdee*1.05);
  // Stress adds cortisol = higher gluconeogenesis
  kcalTarget+=stressAdj;
  kcalTarget+=pregAdj;
  const rawKcal=kcalTarget;
  kcalTarget=Math.max(1200,kcalTarget);
  const floored=rawKcal<1200;
  _tdeeVal=tdee;
  const proteinG=Math.round(weight*(goals.includes('hypertrophy')||goals.includes('strength')?2.2:1.8));
  const fatG=Math.round(kcalTarget*0.25/9);
  const carbsG=Math.round((kcalTarget-proteinG*4-fatG*9)/4);
  let goalLbl='Mantenimento';
  if(goals.includes('fat_loss')) goalLbl='Deficit (-18%) per definizione';
  else if(goals.includes('hypertrophy')||goals.includes('strength')) goalLbl='Surplus (+12%) per massa';
  else if(goals.includes('endurance')) goalLbl='Surplus leggero (+5%)';
  const extras=[];
  if(jobExtra>0) extras.push(`+${jobExtra} kcal lavoro fisico`);
  if(stressAdj>0) extras.push(`+${stressAdj} kcal stress`);
  if(pregAdj>0) extras.push(`+${pregAdj} kcal stato fisiologico`);
  if(sleepAdj<0) extras.push('⚠️ Sonno insufficiente — recupero ridotto');
  if(age<20) extras.push('🌱 Bonus crescita +6% per under-20');
  const floorWarning=floored?`<div style="margin-top:8px;background:rgba(255,154,60,.12);border:1px solid rgba(255,154,60,.3);border-radius:8px;padding:8px 12px;font-size:11px;color:var(--orange);">⚠️ Calcolo reale: <strong>${rawKcal} kcal</strong> — portato al minimo sicuro di 1200 kcal/giorno per tutelare la salute. Considera un ritmo di perdita più graduale.</div>`:'';
  document.getElementById('tdee-result-wrap').style.display='block';
  document.getElementById('tdee-result-box').innerHTML=`
    <div class="tdee-result-title">⚡ Calcolo Preciso — Mifflin-St Jeor + Fattori</div>
    <div class="tdee-result-kcal">${kcalTarget}</div>
    <div class="tdee-result-sub">TDEE base: <strong>${tdee} kcal</strong> · ${goalLbl}${extras.length?'<br><span style="color:var(--acc)">'+extras.join(' · ')+'</span>':''}</div>
    ${floorWarning}
    <div class="tdee-macros">
      <div class="tdee-macro-item"><div class="tdee-macro-val" style="color:var(--green)">${proteinG}g</div><div class="tdee-macro-lbl">Proteine</div></div>
      <div class="tdee-macro-item"><div class="tdee-macro-val" style="color:var(--blue)">${carbsG}g</div><div class="tdee-macro-lbl">Carbs</div></div>
      <div class="tdee-macro-item"><div class="tdee-macro-val" style="color:var(--orange)">${fatG}g</div><div class="tdee-macro-lbl">Grassi</div></div>
    </div>`;
  window._tempKcal=kcalTarget;
  window._tempMacros={p:proteinG,c:carbsG,g:fatG};
  window._tempPhysique={age,weight,height,sex,activity:act,job:jobExtra,sleep:sleepAdj,stress:stressAdj,preg:pregAdj};
  calcWeightGoal();
};

// ════════════════════════════════════════
// V4 — WEIGHT DIARY & CHART
// ════════════════════════════════════════
// weightLog is array of {date, kg} stored in profile
function getWeightLog(){return profile.weightLog||[];}

function openAddWeight(){
  const m=document.getElementById('add-weight-modal');
  const inp=document.getElementById('awm-val');
  inp.value=metrics.peso||'';
  m.classList.add('open');
  setTimeout(()=>inp.focus(),100);
}
function closeAddWeight(){document.getElementById('add-weight-modal').classList.remove('open');}
async function saveWeightEntry(){
  const kg=parseFloat(document.getElementById('awm-val').value);
  if(!kg||kg<20||kg>300){showToast('⚠️ Valore non valido');return;}
  if(!profile.weightLog) profile.weightLog=[];
  const tod=today();
  const existing=profile.weightLog.findIndex(e=>e.date===tod);
  if(existing>=0) profile.weightLog[existing].kg=kg;
  else profile.weightLog.push({date:tod,kg});
  profile.weightLog.sort((a,b)=>a.date.localeCompare(b.date));
  // Keep last 60 days
  if(profile.weightLog.length>60) profile.weightLog=profile.weightLog.slice(-60);
  // Update metrics.peso
  metrics.peso=kg;
  await saveAll();
  closeAddWeight();
  renderWeightChart();
  renderHealthCard();
  showToast('✅ Peso registrato: '+kg+' kg');
}

function renderWeightChart(){
  const log=getWeightLog().slice(-14); // last 14 entries
  const svg=document.getElementById('wc-svg');
  const lineEl=document.getElementById('wc-line');
  const areaEl=document.getElementById('wc-area');
  const dotsEl=document.getElementById('wc-dots');
  const labelsEl=document.getElementById('wc-labels');
  const curEl=document.getElementById('wc-cur');
  const deltaEl=document.getElementById('wc-delta');
  if(!svg){return;}
  if(log.length<1){
    curEl.textContent='—';
    deltaEl.textContent='';
    lineEl.setAttribute('d','');
    areaEl.setAttribute('d','');
    dotsEl.innerHTML='';
    if(labelsEl) labelsEl.innerHTML='<span style="color:var(--text3);font-size:12px">Nessun dato — registra il tuo primo peso!</span>';
    return;
  }
  const kgs=log.map(e=>e.kg);
  const minKg=Math.min(...kgs)-1;
  const maxKg=Math.max(...kgs)+1;
  const range=maxKg-minKg||1;
  const W=300,H=100;
  const pts=log.map((e,i)=>{
    const x=log.length===1?W/2:Math.round((i/(log.length-1))*(W-20))+10;
    const y=Math.round(H-((e.kg-minKg)/range*(H-10))-5);
    return{x,y,kg:e.kg,date:e.date};
  });
  const lineD=pts.map((p,i)=>(i===0?`M${p.x},${p.y}`:`L${p.x},${p.y}`)).join(' ');
  const areaD=lineD+` L${pts[pts.length-1].x},${H} L${pts[0].x},${H} Z`;
  lineEl.setAttribute('d',lineD);
  areaEl.setAttribute('d',areaD);
  dotsEl.innerHTML=pts.map(p=>`<circle class="wc-dot" cx="${p.x}" cy="${p.y}" r="3" title="${p.kg} kg · ${p.date}"/>`).join('');
  // Labels: first, mid, last
  const showIdxs=[0,Math.floor((log.length-1)/2),log.length-1].filter((v,i,a)=>a.indexOf(v)===i);
  if(labelsEl) labelsEl.innerHTML=showIdxs.map(i=>`<span class="wc-lbl">${log[i].date.slice(5)}</span>`).join('');
  // Current and delta
  const cur=kgs[kgs.length-1];
  curEl.textContent=cur.toFixed(1);
  if(kgs.length>=2){
    const diff=cur-kgs[0];
    const sign=diff>0?'+':'';
    const col=diff>0?(profile.goals?.includes('fat_loss')?'var(--red)':'var(--green)'):(profile.goals?.includes('fat_loss')?'var(--green)':'var(--red)');
    deltaEl.textContent=`${sign}${diff.toFixed(1)} kg`;
    deltaEl.style.color=col;
  } else {deltaEl.textContent='';}
}

// ════════════════════════════════════════════════════════════
//  CORPO & SALUTE — BMI adattivo + metriche personalizzate
//  Legge: physique (age/weight/height/sex/activity),
//         goalsMeta (goalType/targetWeight/tdee),
//         goals[], level, trainingDays, sessions
// ════════════════════════════════════════════════════════════
function renderHealthCard(){
  const wrap = document.getElementById('health-card-wrap');
  if(!wrap) return;

  // ── 1. Raccolta dati dal profilo (tutte le sorgenti) ──────
  const ph  = profile.physique || {};
  const gm  = profile.goalsMeta || {};
  const w   = safeWeight(metrics.peso || ph.weight || gm.weight);
  const h   = safeNumber(metrics.altezza || ph.height, 100, 250, 0);
  const age = safeNumber(ph.age, 5, 100, 25);
  const sex = (ph.sex === 'f') ? 'f' : 'm';
  const activityFactor = safeNumber(ph.activity, 1.0, 2.5, 1.55);
  const level    = profile.level || 'intermediate';
  const goals    = Array.isArray(profile.goals) ? profile.goals : [];
  const goalType = gm.goalType || 'maintain';
  const targetW  = safeWeight(gm.targetWeight || gm.weight);
  const trainingDays = safeNumber(profile.trainingDays || profile.days, 0, 7, 3);

  if(!w || !h){
    wrap.innerHTML=`
      <div class="health-card">
        <div class="health-title">📊 Corpo &amp; Salute</div>
        <div style="text-align:center;padding:28px 0 16px;">
          <div style="font-size:40px;margin-bottom:12px;">📏</div>
          <div style="font-size:14px;font-weight:700;margin-bottom:8px;">Dati fisici mancanti</div>
          <div style="font-size:12px;color:var(--text2);line-height:1.65;margin-bottom:18px;">Inserisci peso e altezza nelle impostazioni profilo per vedere la tua analisi completa e personalizzata.</div>
          <button onclick="goPage('profile')" style="background:var(--acc);color:#080810;border:none;border-radius:99px;padding:10px 22px;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer;">Vai al Profilo →</button>
        </div>
      </div>`;
    return;
  }

  // ── 2. Calcolo BMI ────────────────────────────────────────
  const bmi = w / ((h / 100) ** 2);

  // ── 3. Soglie BMI ADATTIVE per profilo personale ─────────
  //  OMS standard: 18.5 / 25 / 30
  //  Corrette per: sesso, età, livello, obiettivi muscolari
  const isAthlete     = ['advanced','athlete'].includes(level);
  const isIntermediate= level === 'intermediate';
  const hasStrength   = goals.includes('hypertrophy') || goals.includes('strength');
  const hasFatLoss    = goals.includes('fat_loss');
  const isFemale      = sex === 'f';
  const isSenior      = age >= 60;
  const isMiddleAge   = age >= 40 && age < 60;
  const isYoung       = age < 20;

  // Base OMS per sesso
  let bmiLow  = isFemale ? 18.0 : 18.5;   // sottopeso / normopeso
  let bmiMid  = isFemale ? 24.0 : 25.0;   // normopeso / sovrappeso
  let bmiHigh = isFemale ? 29.0 : 30.0;   // sovrappeso / obesità

  // Aggiustamenti per contesto atletico
  // Atleti con massa muscolare elevata: il BMI sovrastima il grasso
  if (isAthlete && hasStrength) {
    bmiMid  += isFemale ? 1.2 : 2.0;
    bmiHigh += isFemale ? 1.0 : 1.5;
  } else if (isIntermediate && hasStrength) {
    bmiMid  += isFemale ? 0.5 : 1.0;
    bmiHigh += isFemale ? 0.5 : 0.8;
  }

  // Over 60: perdita di massa ossea → tolleranza +1 pt in alto
  if (isSenior) { bmiMid += 1.0; bmiHigh += 1.0; }

  // 40–60: metabolismo rallenta, distribuzione grasso cambia
  if (isMiddleAge && !isAthlete) { bmiMid += 0.5; }

  // Under 20: in crescita, soglia sottopeso più alta
  if (isYoung) { bmiLow += 0.5; }

  // ── 4. Categoria BMI contestualizzata ────────────────────
  let bmiCat, bmiCol, bmiEmoji, bmiAdvice;
  let athleteDisclaimer = '';

  if(bmi < 16){
    bmiCat='Grave sottopeso'; bmiCol='#5B9CEF'; bmiEmoji='⚠️';
    bmiAdvice=`Con ${w} kg e ${h} cm sei in una situazione critica. Consulta un medico. Aumenta l'apporto calorico gradualmente con cibi densi di nutrienti.`;
  } else if(bmi < bmiLow){
    bmiCat='Sottopeso'; bmiCol='#5B9CEF'; bmiEmoji='📉';
    const calBoost = goals.includes('hypertrophy') ? '400–600' : '300–500';
    bmiAdvice=`Aumenta di ${calBoost} kcal/giorno rispetto al tuo TDEE (${Math.round(safeNumber(profile.tdee||gm.tdee,1200,6000,2500))} kcal). Priorità a proteine (${Math.round(w*2)}g/g) e carboidrati complessi. ${goalType==='bulk'?'Ottimo momento per iniziare una fase di massa controllata.':'Evita il deficit calorico.'}`;
  } else if(bmi < bmiMid){
    bmiCat='Normopeso'; bmiCol='#3EDF8A'; bmiEmoji='✅';
    if(goalType==='bulk') bmiAdvice=`Sei nel range ottimale per una fase di massa pulita. Surplus moderato di 200–350 kcal. Con il tuo livello (${level}), mira a +0.3–0.5 kg/mese.`;
    else if(goalType==='cut') bmiAdvice=`Stai tagliando partendo da un peso ideale. Deficit conservativo: –250–350 kcal. Proteine alte (${Math.round(w*2.2)}g/g) per proteggere la massa muscolare.`;
    else bmiAdvice=`Peso ideale per la tua corporatura. Mantieni con ${trainingDays} sessioni/settimana e alimentazione bilanciata. Ottimo punto di partenza per qualsiasi obiettivo.`;
  } else if(bmi < bmiHigh){
    if(isAthlete && hasStrength){
      bmiCat='Sovrappeso / Composizione atletica'; bmiCol='#3ECFCF'; bmiEmoji='💪';
      bmiAdvice=`Con il tuo livello atletico e focus sulla forza/massa, un BMI di ${bmi.toFixed(1)} è nella norma. Il BMI non distingue muscolo da grasso. Considera la % grasso come metrica principale.`;
      athleteDisclaimer = `<div style="margin-top:8px;padding:6px 10px;background:rgba(62,207,207,.1);border-radius:8px;border-left:3px solid var(--teal);font-size:10px;color:var(--teal);font-weight:700;">🏋️ Soglie adattate al profilo ${level} con obiettivi di ${hasStrength?'forza/massa':'allenamento'}</div>`;
    } else {
      bmiCat='Sovrappeso'; bmiCol='#FF9A3C'; bmiEmoji='📊';
      const deficit = isSenior ? '200–350' : isMiddleAge ? '300–450' : '350–500';
      bmiAdvice=`Deficit calorico di ${deficit} kcal/giorno. Con ${trainingDays} sessioni/settimana, punta a –0.3–0.5 kg/mese. ${isFemale?'Ciclo mestruale può influenzare la bilancia: considera la media settimanale.':'Focus su HIIT + forza per massimizzare il TDEE.'} Proteine: ${Math.round(w*2)}g/giorno.`;
    }
  } else {
    bmiCat='Obesità'; bmiCol='#FF5C6A'; bmiEmoji='🔴';
    bmiAdvice=`Deficit progressivo e sostenibile: –400–600 kcal/giorno senza scendere sotto ${sex==='f'?1200:1500} kcal. Inizia con attività a basso impatto (cammino, nuoto, cyclette). ${age>=50?'Priorità assoluta alla salute articolare.':'Aggiungi 1 sessione forza/settimana per preservare il muscolo.'} Consulta un nutrizionista.`;
  }

  // Nota aggiuntiva per atleti (se non già mostrata)
  if(!athleteDisclaimer && (isAthlete || (isIntermediate && hasStrength))){
    athleteDisclaimer = `<div style="margin-top:8px;padding:5px 10px;background:rgba(62,207,207,.08);border-radius:8px;border-left:3px solid var(--teal);font-size:10px;color:var(--teal);font-weight:700;">🏋️ Soglie adattate: livello ${level}${hasStrength?', obiettivo massa/forza':''}</div>`;
  }
  if(isFemale){
    athleteDisclaimer += `<div style="margin-top:4px;padding:5px 10px;background:rgba(168,126,248,.08);border-radius:8px;border-left:3px solid var(--purple);font-size:10px;color:var(--purple);font-weight:700;">👩 Soglie calibrate per fisiologia femminile</div>`;
  }
  if(isSenior){
    athleteDisclaimer += `<div style="margin-top:4px;padding:5px 10px;background:rgba(91,156,239,.08);border-radius:8px;border-left:3px solid var(--blue);font-size:10px;color:var(--blue);font-weight:700;">🧓 Soglie adattate per over 60</div>`;
  }

  // ── 5. Peso ideale personalizzato ────────────────────────
  //  Formula Devine corretta per sesso + aggiustamento atletico
  let pesoIdealeLow, pesoIdealeHigh;
  const hCm = h - 152.4;
  if(isFemale){
    const base = 45.5 + 0.9 * (hCm / 2.54);
    pesoIdealeLow  = Math.round((base - 4) * (isAthlete ? 1.05 : 1.0));
    pesoIdealeHigh = Math.round((base + 4) * (isAthlete ? 1.12 : 1.0));
  } else {
    const base = 50 + 0.91 * (hCm / 2.54);
    pesoIdealeLow  = Math.round((base - 5) * (isAthlete ? 1.08 : 1.0));
    pesoIdealeHigh = Math.round((base + 5) * (isAthlete ? 1.15 : 1.0));
  }
  pesoIdealeLow  = Math.max(40, pesoIdealeLow);
  pesoIdealeHigh = Math.max(pesoIdealeLow + 3, pesoIdealeHigh);

  // Quanto manca / avanza rispetto al range ideale
  let pesoGap = '';
  if(w < pesoIdealeLow){
    pesoGap = `<span style="color:var(--blue)">−${(pesoIdealeLow-w).toFixed(1)} kg</span> al range`;
  } else if(w > pesoIdealeHigh){
    pesoGap = `<span style="color:var(--orange)">+${(w-pesoIdealeHigh).toFixed(1)} kg</span> oltre range`;
  } else {
    pesoGap = `<span style="color:var(--green)">✓ nel range</span>`;
  }

  // ── 6. Grasso corporeo stimato (formula Deurenberg) ──────
  let bfPct = 1.20 * bmi + 0.23 * age - (isFemale ? 5.4 : 16.2);
  bfPct = Math.max(3, Math.min(60, Math.round(bfPct * 10) / 10));
  // Aggiustamento per atleti: tendono ad avere meno grasso
  if(isAthlete)      bfPct = Math.max(5, bfPct - 3);
  else if(isIntermediate && hasStrength) bfPct = Math.max(5, bfPct - 1.5);

  // Categoria BF%
  let bfCat, bfCol;
  if(isFemale){
    if(bfPct<14){bfCat='Essenziale';bfCol='var(--blue)';}
    else if(bfPct<21){bfCat='Atletica';bfCol='var(--teal)';}
    else if(bfPct<25){bfCat='Fitness';bfCol='var(--green)';}
    else if(bfPct<32){bfCat='Media';bfCol='var(--orange)';}
    else{bfCat='Alta';bfCol='var(--red)';}
  } else {
    if(bfPct<6){bfCat='Essenziale';bfCol='var(--blue)';}
    else if(bfPct<14){bfCat='Atletica';bfCol='var(--teal)';}
    else if(bfPct<18){bfCat='Fitness';bfCol='var(--green)';}
    else if(bfPct<25){bfCat='Media';bfCol='var(--orange)';}
    else{bfCat='Alta';bfCol='var(--red)';}
  }
  const leanMass = Math.round(w * (1 - bfPct/100) * 10) / 10;

  // ── 7. BMR (Mifflin-St Jeor, più precisa di Harris-Benedict) ─
  let bmr = isFemale
    ? 10*w + 6.25*h - 5*age - 161
    : 10*w + 6.25*h - 5*age + 5;
  if(isYoung) bmr *= 1.06;
  bmr = Math.round(bmr);

  // TDEE effettivo (dal profilo se disponibile, altrimenti calcolato)
  const profileTdee = safeNumber(profile.tdee || gm.tdee, 1000, 8000, 0);
  const calcTdee = Math.round(bmr * activityFactor);
  const tdee = profileTdee > 1000 ? profileTdee : calcTdee;

  // Target calorico in base all'obiettivo
  let kcalTarget, kcalDelta, kcalColor;
  if(goalType === 'cut'){
    const pace = gm.pace || 0.5;
    kcalDelta = -Math.min(700, Math.round(pace * 1100));
    kcalTarget = Math.max(isFemale ? 1200 : 1500, tdee + kcalDelta);
    kcalColor = 'var(--orange)';
  } else if(goalType === 'bulk'){
    const pace = gm.pace || 0.3;
    kcalDelta = Math.min(600, Math.round(pace * 550));
    kcalTarget = tdee + kcalDelta;
    kcalColor = 'var(--green)';
  } else {
    kcalDelta = 0;
    kcalTarget = tdee;
    kcalColor = 'var(--acc)';
  }

  // ── 8. Fabbisogni personalizzati ─────────────────────────
  // Proteine: basate su lean mass e obiettivo
  let protMultiplier = 1.6;
  if(isAthlete && hasStrength)     protMultiplier = 2.3;
  else if(isAthlete)               protMultiplier = 2.0;
  else if(isIntermediate && hasStrength) protMultiplier = 2.0;
  else if(hasStrength)             protMultiplier = 1.8;
  else if(hasFatLoss && isAthlete) protMultiplier = 2.2;
  else if(hasFatLoss)              protMultiplier = 1.8;
  if(isSenior)                     protMultiplier = Math.max(1.8, protMultiplier);
  const protNeed = Math.round(leanMass * protMultiplier);

  // Acqua: 35ml/kg base + bonus attività + bonus training
  const trainingToday = (sessions||[]).some(s=>s.date===today());
  const waterML = Math.round(w*35 + activityFactor*100 + (trainingToday?600:0) + (isSenior?200:0));
  const waterL  = (waterML/1000).toFixed(1);

  // Sonno
  const sleepNeed = isYoung ? '8–10h' : age<25 ? '8–9h' : isSenior ? '7–8h' : '7–8h';

  // ── 9. BMI bar marker (range 15–38) ──────────────────────
  const bmiPct = Math.min(100, Math.max(0, ((bmi-15)/23)*100));

  // ── 10. Consigli personalizzati contestuali ──────────────
  const advices = [];

  // Peso obiettivo vs peso attuale
  if(targetW && Math.abs(targetW - w) > 1){
    const diff    = targetW - w;
    const months  = Math.abs(diff) / (gm.pace || 0.5) / 4;
    const dir     = diff > 0 ? 'aumentare' : 'perdere';
    advices.push(`🎯 Obiettivo: ${targetW} kg (devi ${dir} ${Math.abs(diff).toFixed(1)} kg — ~${Math.round(months)} sett. al ritmo attuale).`);
  }

  // Consigli per età
  if(isYoung)     advices.push('🌱 Sei in fase di crescita: sonno e proteine sono priorità assoluta. Evita deficit severi.');
  if(isSenior)    advices.push('🧓 Over 60: priorità alla massa muscolare. Allenamento forza 2×/sett + proteine ≥1.8g/kg prevengono la sarcopenia.');
  if(isMiddleAge) advices.push('🔄 Dopo i 40, il metabolismo rallenta ~3% per decade. Compensa con +1 sessione di forza e –100 kcal/giorno rispetto ai tuoi 30 anni.');

  // Consigli per sesso
  if(isFemale && !isSenior) advices.push('👩 Il ciclo mestruale influenza ritenzione e peso: pesati sempre allo stesso momento. La fase luteale può dare +1–3 kg di ritenzione temporanea.');

  // Consigli per obiettivo
  if(goalType==='cut')     advices.push(`✂️ Taglio: punta a –${Math.round(Math.abs(kcalDelta))} kcal/giorno (${kcalTarget} kcal totali). Mai sotto il tuo BMR (${bmr} kcal).`);
  if(goalType==='bulk')    advices.push(`📈 Massa: surplus di +${kcalDelta} kcal/giorno (${kcalTarget} kcal totali). Carboidrati intorno all'allenamento per massimizzare la sintesi proteica.`);
  if(goalType==='maintain') advices.push(`⚖️ Mantenimento: TDEE stimato ${tdee} kcal/giorno. Ricalcola ogni 4–6 settimane con il variare del peso.`);

  // Attività e training
  if(trainingDays >= 5) advices.push('⚡ Con 5+ sessioni/sett., priorità al recupero: sonno 8h, 1g creatina/kg, magnesio sera.');
  if(trainingDays <= 2) advices.push('📅 Con 2 sessioni/sett., maximizza ogni allenamento: full body compound, recupero 48–72h tra sessioni.');

  // Acqua e proteine sempre
  advices.push(`💧 Acqua: almeno <b style="color:var(--acc)">${waterL}L</b> oggi${trainingToday?' (giorno di allenamento!)':''}.`);
  advices.push(`🥩 Proteine: <b style="color:var(--green)">${protNeed}g/giorno</b> (${protMultiplier}g per kg massa magra · ${leanMass}kg).`);

  // BF% consiglio
  if(bfPct > (isFemale ? 30 : 22) && !isAthlete){
    advices.push(`📉 % Grasso stimata elevata (${bfPct}%): combina deficit moderato + allenamento forza per perdere grasso preservando muscolo.`);
  }

  // ── 11. Render HTML ──────────────────────────────────────
  wrap.innerHTML = `
    <div class="health-card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <div class="health-title" style="margin:0;">📊 BMI & Composizione</div>
        <div style="font-size:9px;color:var(--text3);font-weight:700;text-transform:uppercase;letter-spacing:.06em;">${sex==='f'?'👩 F':'👤 M'} · ${age}a · ${level}</div>
      </div>

      
      <div class="bmi-wrap">
        <div style="position:relative;width:72px;height:72px;flex-shrink:0;">
          <svg width="72" height="72" viewBox="0 0 72 72" style="transform:rotate(-90deg)">
            <circle cx="36" cy="36" r="30" fill="none" stroke="var(--bg4)" stroke-width="6"/>
            <circle cx="36" cy="36" r="30" fill="none" stroke="${bmiCol}" stroke-width="6"
              stroke-linecap="round"
              stroke-dasharray="${Math.round(188.4*(Math.min(bmi,40)/40))},188.4"
              style="transition:stroke-dasharray .6s ease;"/>
          </svg>
          <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
            <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:${bmiCol};line-height:1;">${bmi.toFixed(1)}</div>
            <div style="font-size:8px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;">BMI</div>
          </div>
        </div>
        <div class="bmi-info">
          <div style="font-size:15px;font-weight:800;color:${bmiCol};margin-bottom:3px;">${bmiEmoji} ${bmiCat}</div>
          <div style="font-size:11px;color:var(--text2);">Range personale: <b style="color:var(--text)">${bmiLow.toFixed(1)}–${bmiMid.toFixed(1)}</b></div>
          <div style="font-size:11px;color:var(--text2);margin-top:2px;">${w} kg · ${h} cm · ${pesoGap}</div>
          ${athleteDisclaimer}
        </div>
      </div>

      
      <div class="bmi-bar-track" style="margin-top:10px;">
        <div class="bmi-marker" style="left:${bmiPct}%;background:${bmiCol};box-shadow:0 0 8px ${bmiCol};"></div>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:8px;color:var(--text3);margin-top:5px;margin-bottom:12px;">
        <span style="color:#5B9CEF">Sotto</span>
        <span style="color:#3EDF8A">Normale<br><b style="font-size:7px">${bmiLow.toFixed(1)}–${bmiMid.toFixed(1)}</b></span>
        <span style="color:#FF9A3C">Sovrap.</span>
        <span style="color:#FF5C6A">Obeso</span>
      </div>

      
      <div style="font-size:12px;color:var(--text2);line-height:1.65;margin-bottom:14px;padding:10px 12px;background:var(--bg3);border-radius:var(--r-sm);border-left:3px solid ${bmiCol};">${bmiAdvice}</div>

      
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:8px;">
        <div class="health-tile">
          <div class="ht-ico">⚖️</div>
          <div class="ht-val" style="color:var(--green);">${pesoIdealeLow}–${pesoIdealeHigh} kg</div>
          <div class="ht-lbl">Peso ideale${isAthlete?' (atleta)':''}</div>
        </div>
        <div class="health-tile">
          <div class="ht-ico">🫀</div>
          <div class="ht-val" style="color:${bfCol};">${bfPct}%</div>
          <div class="ht-lbl">% Grasso stim. · <span style="color:${bfCol}">${bfCat}</span></div>
        </div>
        <div class="health-tile">
          <div class="ht-ico">💪</div>
          <div class="ht-val" style="color:var(--teal);">${leanMass} kg</div>
          <div class="ht-lbl">Massa magra stimata</div>
        </div>
        <div class="health-tile">
          <div class="ht-ico">🔥</div>
          <div class="ht-val">${bmr}</div>
          <div class="ht-lbl">BMR (kcal/giorno)</div>
        </div>
        <div class="health-tile">
          <div class="ht-ico">⚡</div>
          <div class="ht-val" style="color:var(--acc);">${tdee}</div>
          <div class="ht-lbl">TDEE (mantenimento)</div>
        </div>
        <div class="health-tile">
          <div class="ht-ico">${goalType==='cut'?'✂️':goalType==='bulk'?'📈':'⚖️'}</div>
          <div class="ht-val" style="color:${kcalColor};">${kcalTarget}</div>
          <div class="ht-lbl">Target kcal (${goalType==='cut'?'deficit':goalType==='bulk'?'surplus':'mant.'})</div>
        </div>
        <div class="health-tile">
          <div class="ht-ico">💧</div>
          <div class="ht-val">${waterL}L</div>
          <div class="ht-lbl">Acqua consigliata</div>
        </div>
        <div class="health-tile">
          <div class="ht-ico">😴</div>
          <div class="ht-val">${sleepNeed}</div>
          <div class="ht-lbl">Sonno ideale</div>
        </div>
      </div>
    </div>

    
    <div class="health-card" style="margin-top:0;">
      <div class="health-title">🧠 Consigli per il tuo profilo</div>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px;">
        ${advices.map(a=>`
          <div style="font-size:12px;color:var(--text2);line-height:1.6;padding:8px 12px;background:var(--bg3);border-radius:8px;">
            ${a}
          </div>`).join('')}
      </div>
      <div style="font-size:10px;color:var(--text3);line-height:1.6;padding:8px 10px;background:var(--bg4);border-radius:8px;margin-top:4px;">
        ℹ️ BMI e % grasso sono stime. Per atleti con alta massa muscolare, affiancali con misurazioni corporee (circonferenze, pliche) per una valutazione più precisa.
      </div>
    </div>`;
}

function switchProfileTab(tab,btn){
  document.querySelectorAll('.ptab').forEach(t=>t.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('.profile-section').forEach(s=>s.classList.remove('active'));
  document.getElementById('prof-'+tab).classList.add('active');
}

function renderProfilePage(){
  _ensureGoals();
  const n   = profile.name || 'Atleta';
  const g   = profile.goalsMeta;
  const ph  = profile.physique || {};
  const gt  = g.goalType || 'maintain';
  const GOAL_LABELS   = { cut:'Definizione 📉', bulk:'Massa 📈', maintain:'Mantenimento ⚖️' };
  const LEVEL_LABELS  = { beginner:'Principiante', intermediate:'Intermedio', advanced:'Avanzato', athlete:'Atleta' };

  const _set = (id, val) => { const el=document.getElementById(id); if(el) el.textContent=val; };

  // Header avatar
  const av = document.getElementById('pr-avatar-big');
  if(av){ av.textContent = n[0].toUpperCase(); av.style.background='var(--acc)'; }
  _set('pr-name-big', n);
  _set('pr-sub-big',  (LEVEL_LABELS[profile.level]||profile.level||'Intermedio') + ' · ' + (profile.days||5) + ' gg/sett.');

  // Settings row values
  _set('pr-name-val',     n);
  _set('pr-kcal-val',     (g.calories || profile.kcalTarget || 2500) + ' kcal');
  _set('pr-goaltype-val', GOAL_LABELS[gt] || gt);
  _set('pr-weight-val',   (ph.weight || '—') + ' kg');
  _set('pr-wg-val',       (profile.weeklyWorkoutsTarget || 3) + ' all./sett.');
  _set('pr-level-val',    LEVEL_LABELS[profile.level] || profile.level || '—');
  _set('pr-days-val',     (profile.days || 5) + ' giorni/sett.');
  _set('pr-sex-val',      ph.sex === 'f' ? 'Femmina' : 'Maschio');
  _set('pr-age-val',      (ph.age || '—') + ' anni');
  _set('pr-height-val',   (ph.height || '—') + ' cm');
  _set('pr-macros-val',   'P' + (profile.macros?.p||'—') + ' C' + (profile.macros?.c||'—') + ' G' + (profile.macros?.g||'—') + ' g');
  _set('pr-preset-val',   profile.recPreset
    ? (PRESETS_DATA.find(x=>x.id===profile.recPreset)?.name || profile.recPreset)
    : 'Nessuno');

  // Inline edit panel
  renderSettingsPanel();

  renderHealthCard();

  // Cycle card visibility
  const cycleCard = document.getElementById('pr-cycle-card');
  if(cycleCard) cycleCard.style.display = ph.sex === 'f' ? '' : 'none';
}

/** Renders the full inline-editable settings panel (id: settings-panel) */
function renderSettingsPanel(){
  const wrap = document.getElementById('settings-panel');
  if(!wrap) return;
  _ensureGoals();
  const g  = profile.goalsMeta;
  const ph = profile.physique || {};
  const m  = profile.macros || {p:180,c:280,g:70};

  const LEVEL_OPTS = ['beginner','intermediate','advanced','athlete']
    .map(v => `<option value="${v}" ${profile.level===v?'selected':''}>${{beginner:'Principiante',intermediate:'Intermedio',advanced:'Avanzato',athlete:'Atleta'}[v]}</option>`)
    .join('');
  const GOAL_OPTS = ['cut','bulk','maintain']
    .map(v => `<option value="${v}" ${g.goalType===v?'selected':''}>${{cut:'Definizione (Cut) 📉',bulk:'Massa (Bulk) 📈',maintain:'Mantenimento ⚖️'}[v]}</option>`)
    .join('');
  const PRESET_OPTS = ['<option value="" ' + (!profile.recPreset?'selected':'') + '>— Nessuno —</option>']
    .concat(PRESETS_DATA.map(p => `<option value="${p.id}" ${profile.recPreset===p.id?'selected':''}>${p.icon} ${p.name}</option>`))
    .join('');
  const DAYS_OPTS = [2,3,4,5,6]
    .map(v => `<option value="${v}" ${(profile.days==v)?'selected':''}>${v} giorni/sett.</option>`)
    .join('');
  const ACT_OPTS = [
    ['1.2','Sedentario'],['1.375','Leggero (1–2 gg/sett.)'],
    ['1.55','Moderato (3–5 gg/sett.)'],['1.725','Intenso (6–7 gg/sett.)'],['1.9','Molto intenso'],
  ].map(([v,l]) => `<option value="${v}" ${String(ph.activity)===v?'selected':''}>${l}</option>`).join('');
  const WG_OPTS = [1,2,3,4,5,6,7]
    .map(v => `<option value="${v}" ${(profile.weeklyWorkoutsTarget==v)?'selected':''}>${v} allenamenti/sett.</option>`)
    .join('');

  wrap.innerHTML = `
  <div class="sp-section-title">👤 Dati personali</div>
  <div class="sp-row"><label class="sp-lbl">Nome</label><input class="sp-inp" id="sp-name" value="${profile.name||''}" maxlength="20"></div>
  <div class="sp-row"><label class="sp-lbl">Sesso</label>
    <select class="sp-inp" id="sp-sex">
      <option value="m" ${ph.sex!=='f'?'selected':''}>Maschio</option>
      <option value="f" ${ph.sex==='f'?'selected':''}>Femmina</option>
    </select></div>
  <div class="sp-row"><label class="sp-lbl">Età (anni)</label><input class="sp-inp" id="sp-age" type="number" min="13" max="90" value="${ph.age||''}"></div>
  <div class="sp-row"><label class="sp-lbl">Altezza (cm)</label><input class="sp-inp" id="sp-height" type="number" min="100" max="250" value="${ph.height||''}"></div>
  <div class="sp-row"><label class="sp-lbl">Peso attuale (kg)</label><input class="sp-inp" id="sp-weight" type="number" step="0.5" min="20" max="400" value="${ph.weight||''}"></div>
  <div class="sp-row"><label class="sp-lbl">Livello</label><select class="sp-inp" id="sp-level">${LEVEL_OPTS}</select></div>
  <div class="sp-row"><label class="sp-lbl">Attività fisica</label><select class="sp-inp" id="sp-activity">${ACT_OPTS}</select></div>

  <div class="sp-section-title" style="margin-top:20px">🎯 Obiettivi</div>
  <div class="sp-row"><label class="sp-lbl">Obiettivo</label><select class="sp-inp" id="sp-goaltype">${GOAL_OPTS}</select></div>
  <div class="sp-row"><label class="sp-lbl">Peso obiettivo (kg)</label><input class="sp-inp" id="sp-goalweight" type="number" step="0.5" min="30" max="300" value="${g.weight||ph.weight||''}"></div>
  <div class="sp-row"><label class="sp-lbl">Calorie giornaliere (kcal)</label><input class="sp-inp" id="sp-kcal" type="number" step="50" min="1000" max="8000" value="${g.calories||profile.kcalTarget||2500}"></div>
  <div class="sp-row" style="flex-direction:column;align-items:flex-start;gap:10px;">
    <label class="sp-lbl">Macronutrienti giornalieri</label>

    
    <div id="sp-presets-wrap" style="display:flex;gap:6px;width:100%;flex-wrap:wrap">
      <button type="button" onclick="spSelectPreset('cut')"      id="sp-pre-cut"      style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;font-family:'Syne',sans-serif;border:1.5px solid var(--border);background:var(--bg4);color:var(--text2)">Cut</button>
      <button type="button" onclick="spSelectPreset('bulk')"     id="sp-pre-bulk"     style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;font-family:'Syne',sans-serif;border:1.5px solid var(--border);background:var(--bg4);color:var(--text2)">Bulk</button>
      <button type="button" onclick="spSelectPreset('maintain')" id="sp-pre-maintain" style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;font-family:'Syne',sans-serif;border:1.5px solid var(--border);background:var(--bg4);color:var(--text2)">Mantenimento</button>
      <button type="button" onclick="spSelectPreset('recomp')"   id="sp-pre-recomp"   style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;font-family:'Syne',sans-serif;border:1.5px solid var(--border);background:var(--bg4);color:var(--text2)">Recomp</button>
      <button type="button" onclick="spSelectPreset('custom')"   id="sp-pre-custom"   style="padding:5px 12px;border-radius:8px;font-size:11px;font-weight:800;cursor:pointer;font-family:'Syne',sans-serif;border:1.5px solid var(--border);background:var(--bg4);color:var(--text2)">Custom</button>
    </div>

    
    <div style="width:100%;display:flex;flex-direction:column;gap:12px;background:var(--bg3);border-radius:12px;padding:12px 14px">
      
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
          <span style="font-size:12px;font-weight:700;color:var(--green)">Proteine</span>
          <div style="display:flex;align-items:center;gap:10px">
            <span id="sp-g-p" style="font-size:12px;color:var(--text2);font-family:'DM Mono',monospace">0g</span>
            <span id="sp-pct-p" style="font-size:13px;font-weight:800;font-family:'DM Mono',monospace;color:var(--green);min-width:36px;text-align:right">30%</span>
          </div>
        </div>
        <input type="range" id="sp-range-p" min="10" max="70" step="1" value="30"
          oninput="spOnRange('p')" style="width:100%;accent-color:var(--green);height:5px;cursor:pointer">
      </div>
      
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
          <span style="font-size:12px;font-weight:700;color:var(--blue)">Carbs</span>
          <div style="display:flex;align-items:center;gap:10px">
            <span id="sp-g-c" style="font-size:12px;color:var(--text2);font-family:'DM Mono',monospace">0g</span>
            <span id="sp-pct-c" style="font-size:13px;font-weight:800;font-family:'DM Mono',monospace;color:var(--blue);min-width:36px;text-align:right">45%</span>
          </div>
        </div>
        <input type="range" id="sp-range-c" min="10" max="70" step="1" value="45"
          oninput="spOnRange('c')" style="width:100%;accent-color:var(--blue);height:5px;cursor:pointer">
      </div>
      
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px">
          <span style="font-size:12px;font-weight:700;color:var(--orange)">Grassi</span>
          <div style="display:flex;align-items:center;gap:10px">
            <span id="sp-g-g" style="font-size:12px;color:var(--text2);font-family:'DM Mono',monospace">0g</span>
            <span id="sp-pct-g" style="font-size:13px;font-weight:800;font-family:'DM Mono',monospace;color:var(--orange);min-width:36px;text-align:right">25%</span>
          </div>
        </div>
        <input type="range" id="sp-range-g" min="10" max="70" step="1" value="25"
          oninput="spOnRange('g')" style="width:100%;accent-color:var(--orange);height:5px;cursor:pointer">
      </div>
      
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:4px;border-top:1px solid var(--border)">
        <span id="sp-pct-total" style="font-size:12px;font-weight:700;color:var(--text2)">Totale: 100%</span>
        <span id="sp-macro-check" style="font-size:11px;color:var(--text2)"></span>
      </div>
    </div>

    
    <div style="display:flex;gap:8px;width:100%">
      <div style="flex:1"><div class="sp-macro-lbl" style="color:var(--green)">Proteine g</div><input class="sp-inp" id="sp-prot" type="number" min="0" max="500" value="${m.p||180}" oninput="spGramsChange()"></div>
      <div style="flex:1"><div class="sp-macro-lbl" style="color:var(--blue)">Carbs g</div><input class="sp-inp" id="sp-carbs" type="number" min="0" max="800" value="${m.c||280}" oninput="spGramsChange()"></div>
      <div style="flex:1"><div class="sp-macro-lbl" style="color:var(--orange)">Grassi g</div><input class="sp-inp" id="sp-fats" type="number" min="0" max="300" value="${m.g||70}" oninput="spGramsChange()"></div>
    </div>
  </div>

    <div class="sp-section-title" style="margin-top:20px">🏋️ Allenamento</div>
  <div class="sp-row"><label class="sp-lbl">Giorni/settimana</label><select class="sp-inp" id="sp-days">${DAYS_OPTS}</select></div>
  <div class="sp-row"><label class="sp-lbl">Obiettivo settimanale</label><select class="sp-inp" id="sp-wgtarget">${WG_OPTS}</select></div>
  <div class="sp-row"><label class="sp-lbl">Programma attivo</label><select class="sp-inp" id="sp-preset">${PRESET_OPTS}</select></div>

  
  <div class="sp-row" style="flex-direction:column;align-items:flex-start;gap:8px">
    <label class="sp-lbl">Attrezzatura disponibile</label>
    <button type="button" onclick="openEquipmentSettings()"
      id="sp-eq-btn"
      style="width:100%;padding:13px 16px;background:var(--bg3);border:1.5px solid var(--border2);border-radius:var(--r);font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;display:flex;align-items:center;gap:12px;text-align:left">
      <span style="font-size:20px">🏋️</span>
      <div style="flex:1">
        <div id="sp-eq-label" style="font-size:13px;font-weight:700">Configura palestra</div>
        <div id="sp-eq-sub" style="font-size:11px;color:var(--text2);margin-top:2px">Nessuna attrezzatura configurata</div>
      </div>
      <span style="color:var(--acc);font-size:16px">›</span>
    </button>
  </div>

  <div id="sp-autosave-indicator" style="text-align:center;margin-top:16px;font-size:12px;color:var(--text3);opacity:0;transition:opacity .4s;">
    ✅ Salvato automaticamente
  </div>`;
  // Auto-save: aggancia tutti gli input/select del pannello
  setTimeout(function() {
    document.querySelectorAll('#page-settings input, #page-settings select').forEach(function(el) {
      el.addEventListener('change', function() { _ftAutoSave(); });
      if (el.tagName === 'INPUT' && el.type !== 'range') {
        el.addEventListener('blur', function() { _ftAutoSave(); });
      }
    });
  }, 300);

  // Live update: kcal → macro auto
  const spKcalEl = document.getElementById('sp-kcal');
  const spGoalEl = document.getElementById('sp-goaltype');
  if(spKcalEl) spKcalEl.addEventListener('input', spKcalChanged);
  if(spGoalEl) spGoalEl.addEventListener('change', () => { spSelectPreset(spGoalEl.value); });
  // Init sliders with current macro values
  spInitSliders();
}

/* ── Settings Panel Live Macro Engine ─────────────────────────── */

function spInitSliders(){
  const m = profile.macros || {p:180,c:280,g:70};
  const kcal = parseFloat(document.getElementById('sp-kcal')?.value) || profile.kcalTarget || 2500;
  const totKc = Math.max(1, m.p*4 + m.c*4 + m.g*9);

  // Calc % from current macros
  const pPct = Math.max(10, Math.min(70, Math.round(m.p*4/totKc*100)));
  const cPct = Math.max(10, Math.min(70, Math.round(m.c*4/totKc*100)));
  const gPct = Math.max(10, Math.min(70, 100 - pPct - cPct));

  const setR = (id, v) => { const el=document.getElementById(id); if(el) el.value=v; };
  setR('sp-range-p', pPct); setR('sp-range-c', cPct); setR('sp-range-g', gPct);

  // Update % labels
  const setPct = (id, v) => { const el=document.getElementById(id); if(el) el.textContent=v+'%'; };
  setPct('sp-pct-p', pPct); setPct('sp-pct-c', cPct); setPct('sp-pct-g', gPct);

  // Update g labels
  const setG = (id, v) => { const el=document.getElementById(id); if(el) el.textContent=v+'g'; };
  setG('sp-g-p', m.p); setG('sp-g-c', m.c); setG('sp-g-g', m.g);

  // Highlight active preset button
  const pset = profile._macroPset || profile.goalsMeta?.goalType || 'maintain';
  window._spPset = pset;
  ['cut','bulk','maintain','recomp','custom'].forEach(t => {
    const el = document.getElementById('sp-pre-'+t);
    if(!el) return;
    const active = t === pset;
    el.style.borderColor = active ? 'var(--acc)' : 'var(--border)';
    el.style.background  = active ? 'var(--acc4)' : 'var(--bg4)';
    el.style.color       = active ? 'var(--acc)'  : 'var(--text2)';
  });

  spUpdatePctTotal();
  spUpdateCheck(kcal, m.p, m.c, m.g);

  // Aggiorna il pulsante attrezzatura con i dati correnti
  try {
    const eq = JSON.parse(localStorage.getItem('ft_equipment')||'[]');
    const lbl = document.getElementById('sp-eq-label');
    const sub = document.getElementById('sp-eq-sub');
    if(lbl) lbl.textContent = eq.length > 0 ? 'Modifica attrezzatura' : 'Configura palestra';
    if(sub) sub.textContent = eq.length > 0
      ? eq.slice(0,3).join(', ') + (eq.length > 3 ? ` +${eq.length-3} altri` : '')
      : 'Nessuna attrezzatura configurata — tap per aggiungere';
  } catch(e){}
}
window.spInitSliders = spInitSliders;

function spKcalChanged(){
  const kcal = safeKcal(document.getElementById('sp-kcal')?.value);
  if(!kcal) return;
  const pset = window._spPset || profile._macroPset || profile.goalsMeta?.goalType || 'maintain';
  spApplyPresetToKcal(kcal, pset);
}

function spApplyPresetToKcal(kcal, pset){
  const presets = {
    cut:      {pPct:0.30, cPct:0.40, gPct:0.30},
    bulk:     {pPct:0.25, cPct:0.50, gPct:0.25},
    maintain: {pPct:0.25, cPct:0.45, gPct:0.30},
    recomp:   {pPct:0.30, cPct:0.40, gPct:0.30},
    custom:   null
  };
  const pr = presets[pset] || presets.maintain;

  let p, c, g;
  if(pset === 'custom'){
    // Don't override custom — just recalc from current %
    const pP = parseInt(document.getElementById('sp-range-p')?.value||30)/100;
    const cP = parseInt(document.getElementById('sp-range-c')?.value||45)/100;
    const gP = parseInt(document.getElementById('sp-range-g')?.value||25)/100;
    p = Math.round(kcal*pP/4); c = Math.round(kcal*cP/4); g = Math.round(kcal*gP/9);
  } else {
    p = Math.round(kcal * pr.pPct / 4);
    c = Math.round(kcal * pr.cPct / 4);
    g = Math.round(kcal * pr.gPct / 9);
  }

  // Set gram inputs
  const setVal = (id, v) => { const el=document.getElementById(id); if(el) el.value=v; };
  setVal('sp-prot',  p);
  setVal('sp-carbs', c);
  setVal('sp-fats',  g);

  // Update sliders
  const tot = p*4 + c*4 + g*9 || kcal;
  const setRange = (id, gid, pid, val, kcalPer) => {
    const pct = Math.round(val*kcalPer/tot*100);
    const r = document.getElementById(id); if(r) r.value = Math.max(10,Math.min(70,pct));
    const gEl = document.getElementById(gid); if(gEl) gEl.textContent = val+'g';
    const pEl = document.getElementById(pid); if(pEl) pEl.textContent = Math.max(10,Math.min(70,pct))+'%';
  };
  setRange('sp-range-p','sp-g-p','sp-pct-p', p, 4);
  setRange('sp-range-c','sp-g-c','sp-pct-c', c, 4);
  setRange('sp-range-g','sp-g-g','sp-pct-g', g, 9);

  spUpdateCheck(kcal, p, c, g);
  spUpdatePctTotal();
}

window.spSelectPreset = function(k){
  window._spPset = k;
  ['cut','bulk','maintain','recomp','custom'].forEach(t=>{
    const el = document.getElementById('sp-pre-'+t);
    if(!el) return;
    const active = t===k;
    el.style.borderColor = active ? 'var(--acc)' : 'var(--border)';
    el.style.background  = active ? 'var(--acc4)' : 'var(--bg4)';
    el.style.color       = active ? 'var(--acc)'  : 'var(--text2)';
  });
  const kcal = safeKcal(document.getElementById('sp-kcal')?.value) || profile.kcalTarget || 2500;
  spApplyPresetToKcal(kcal, k);
};

window.spOnRange = function(changed){
  window._spPset = 'custom';
  // Highlight custom preset
  ['cut','bulk','maintain','recomp','custom'].forEach(t=>{
    const el=document.getElementById('sp-pre-'+t);
    if(!el)return;
    const active=t==='custom';
    el.style.borderColor=active?'var(--acc)':'var(--border)';
    el.style.background=active?'var(--acc4)':'var(--bg4)';
    el.style.color=active?'var(--acc)':'var(--text2)';
  });

  const keys=['p','c','g'];
  const others=keys.filter(k=>k!==changed);
  const cv=parseInt(document.getElementById('sp-range-'+changed)?.value||33);
  const rem=Math.max(0,100-cv);
  const o1=document.getElementById('sp-range-'+others[0]);
  const o2=document.getElementById('sp-range-'+others[1]);
  if(!o1||!o2) return;
  const sum=parseInt(o1.value)+parseInt(o2.value);
  if(sum>0){const f1=Math.round(rem*parseInt(o1.value)/sum);o1.value=Math.max(10,f1);o2.value=Math.max(10,rem-f1);}

  // Recalc grams from %
  const kcal = safeKcal(document.getElementById('sp-kcal')?.value) || 2000;
  const pPct = parseInt(document.getElementById('sp-range-p')?.value||30)/100;
  const cPct = parseInt(document.getElementById('sp-range-c')?.value||45)/100;
  const gPct = parseInt(document.getElementById('sp-range-g')?.value||25)/100;
  const p = Math.round(kcal*pPct/4);
  const c = Math.round(kcal*cPct/4);
  const g = Math.round(kcal*gPct/9);

  const setVal=(id,v)=>{const el=document.getElementById(id);if(el)el.value=v;};
  setVal('sp-prot',p); setVal('sp-carbs',c); setVal('sp-fats',g);

  // Update % labels and g labels
  ['p','c','g'].forEach(k=>{
    const r=document.getElementById('sp-range-'+k);
    const pEl=document.getElementById('sp-pct-'+k);
    const gEl=document.getElementById('sp-g-'+k);
    const val={p,c,g}[k];
    if(pEl&&r) pEl.textContent=r.value+'%';
    if(gEl) gEl.textContent=val+'g';
  });

  spUpdateCheck(kcal,p,c,g);
  spUpdatePctTotal();
};

window.spGramsChange = function(){
  // User manually changed grams — update % labels accordingly
  const kcal = safeKcal(document.getElementById('sp-kcal')?.value) || 2000;
  const p = parseFloat(document.getElementById('sp-prot')?.value)||0;
  const c = parseFloat(document.getElementById('sp-carbs')?.value)||0;
  const g = parseFloat(document.getElementById('sp-fats')?.value)||0;
  const tot = p*4+c*4+g*9 || 1;
  const setP=(k,val,kcalPer)=>{
    const pct=Math.max(10,Math.min(70,Math.round(val*kcalPer/tot*100)));
    const r=document.getElementById('sp-range-'+k); if(r) r.value=pct;
    const pEl=document.getElementById('sp-pct-'+k); if(pEl) pEl.textContent=pct+'%';
    const gEl=document.getElementById('sp-g-'+k); if(gEl) gEl.textContent=val+'g';
  };
  setP('p',p,4); setP('c',c,4); setP('g',g,9);
  spUpdateCheck(kcal,p,c,g);
  spUpdatePctTotal();
  window._spPset='custom';
};

function spUpdateCheck(kcal,p,c,g){
  const check = document.getElementById('sp-macro-check');
  if(!check||!kcal) return;
  const fromM = Math.round(p*4+c*4+g*9);
  const diff = Math.abs(fromM-kcal);
  check.textContent = diff<=40
    ? `✅ Macro coerenti: ${fromM} kcal`
    : `⚠️ Macro → ${fromM} kcal vs ${kcal} kcal (diff ${diff})`;
  check.style.color = diff<=40 ? 'var(--green)' : 'var(--orange)';
}

function spUpdatePctTotal(){
  const tot=['p','c','g'].reduce((a,k)=>a+parseInt(document.getElementById('sp-range-'+k)?.value||33),0);
  const el=document.getElementById('sp-pct-total');
  if(el){
    el.textContent='Totale: '+tot+'%';
    el.style.color=tot===100?'var(--green)':'var(--orange)';
  }
}

function updateSpMacroCheck(){
  const kcal = safeKcal(document.getElementById('sp-kcal')?.value);
  const p    = safeNumber(document.getElementById('sp-prot')?.value, 0, 500, 0);
  const c    = safeNumber(document.getElementById('sp-carbs')?.value, 0, 800, 0);
  const g    = safeNumber(document.getElementById('sp-fats')?.value, 0, 300, 0);
  spUpdateCheck(kcal,p,c,g);
}

/** Save all settings from the inline panel */
async function applySettings(){
  const prevGoalType = profile.goalsMeta?.goalType || 'maintain';
  const prevGoalWeight = safeNumber(profile.goalsMeta?.weight, 20, 400, profile.physique?.weight||70);

  const name   = (document.getElementById('sp-name')?.value||'').trim() || profile.name || 'Atleta';
  const sex    = document.getElementById('sp-sex')?.value    || profile.physique?.sex    || 'm';
  const age    = safeNumber(document.getElementById('sp-age')?.value, 13, 90, profile.physique?.age||17);
  const height = safeNumber(document.getElementById('sp-height')?.value, 100, 250, profile.physique?.height||175);
  const weight = safeNumber(document.getElementById('sp-weight')?.value, 20, 400, profile.physique?.weight||70);
  const level  = document.getElementById('sp-level')?.value  || profile.level || 'intermediate';
  const act    = parseFloat(document.getElementById('sp-activity')?.value) || profile.physique?.activity || 1.55;

  const goalType   = document.getElementById('sp-goaltype')?.value || profile.goalsMeta?.goalType || 'maintain';
  const goalWeight = safeNumber(document.getElementById('sp-goalweight')?.value, 20, 400, profile.goalsMeta?.weight||weight);
  let kcal       = safeKcal(document.getElementById('sp-kcal')?.value) || profile.kcalTarget || 2500;
  let prot       = safeNumber(document.getElementById('sp-prot')?.value, 0, 500, profile.macros?.p||180);
  let carbs      = safeNumber(document.getElementById('sp-carbs')?.value, 0, 800, profile.macros?.c||280);
  let fats       = safeNumber(document.getElementById('sp-fats')?.value, 0, 300, profile.macros?.g||70);

  const days       = String(safeNumber(document.getElementById('sp-days')?.value, 1, 7, profile.days||5));
  const wgTarget   = safeNumber(document.getElementById('sp-wgtarget')?.value, 1, 7, profile.weeklyWorkoutsTarget||3);
  const recPreset  = document.getElementById('sp-preset')?.value || profile.recPreset || '';

  // Recalc TDEE with latest profile data
  const bmr = sex === 'f'
    ? 10*weight + 6.25*height - 5*age - 161
    : 10*weight + 6.25*height - 5*age + 5;
  const newTdee = Math.round(bmr * act);

  const objectiveChanged = goalType !== prevGoalType || Math.abs(goalWeight - prevGoalWeight) >= 0.1;
  if(objectiveChanged){
    const auto = derivePlanNumbersFromGoalType(goalType, newTdee, weight);
    kcal = auto.kcal;
    prot = auto.macros.p;
    carbs = auto.macros.c;
    fats = auto.macros.g;
  }

  // Apply
  profile.name   = name;
  profile.level  = level;
  profile.days   = days;
  profile.kcalTarget        = kcal;
  profile.macros            = {p: prot, c: carbs, g: fats};
  profile.weeklyWorkoutsTarget = wgTarget;
  profile.recPreset         = recPreset;
  profile.physique          = { ...(profile.physique||{}), sex, age, height, weight, activity: act };
  profile.goals = goalsFromGoalType(goalType);

  updateGoals({ calories: kcal, weight: goalWeight, targetWeight: goalWeight, goalType });

  // Sync weight history
  if(weight !== profile.physique?.weight) updateWeight(weight);

  profile.tdee = newTdee;

  if(objectiveChanged){
    const bestPresetId = (typeof window.getRecommendedPresetV19 === 'function')
      ? window.getRecommendedPresetV19({ ...profile, goalsMeta: { ...(profile.goalsMeta||{}), goalType } })
      : getRecommendedPreset(profile.goals, profile.level);
    const bestPreset = PRESETS_DATA.find(p => p.id === bestPresetId) || PRESETS_DATA.find(p => p.id === profile.recPreset) || PRESETS_DATA[0];
    if(bestPreset){
      profile.recPreset = bestPreset.id;
      woProgram = JSON.parse(JSON.stringify(bestPreset));
      if(typeof normalizeProgramSets === 'function') normalizeProgramSets(woProgram);
      if(typeof adaptProgramToGoal === 'function') woProgram = adaptProgramToGoal(woProgram, goalType) || woProgram;
      profile.generatedPlan = null;
      await dbSet('program', woProgram);
    }
  }

  await saveAll();

  // Refresh UI
  const av = document.getElementById('tb-av');
  if(av) av.textContent = name[0].toUpperCase();
  renderProfilePage();
  renderHome();
  renderWeeklyGoalCard();
  renderWeeklyProgram();
  if(typeof renderHomeCalendar === 'function') renderHomeCalendar();
  if(typeof renderMonthCalendar === 'function') renderMonthCalendar();
  if(document.getElementById('page-nutrizione')?.classList.contains('active')) renderNutrizione();

  showToast(objectiveChanged
    ? '✅ Obiettivo aggiornato: calorie, macro e programma ricalcolati.'
    : '✅ Impostazioni salvate!');
}

function _ftAutoSave() {
  clearTimeout(window._ftAutoSaveTimer);
  window._ftAutoSaveTimer = setTimeout(async function() {
    await applySettings();
    var ind = document.getElementById('sp-autosave-indicator');
    if (ind) {
      ind.style.opacity = '1';
      setTimeout(function() { ind.style.opacity = '0'; }, 2000);
    }
  }, 600);
}

function editName(){
  _showProfileModal({
    title:'✏️ Nome utente',
    fields:[{id:'name', label:'Il tuo nome', type:'text', value:profile.name||''}],
    onSave(vals){
      const n=vals.name.trim();
      if(!n) return 'Inserisci un nome';
      profile.name=n; saveAll(); initApp(); renderProfilePage();
      showToast('✅ Nome aggiornato!');
    }
  });
}

async function confirmReset(){
  // Modal in-app per il reset — sostituisce i confirm() nativi
  await new Promise((resolve) => {
    const ovl = document.createElement('div');
    ovl.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.80);z-index:9900;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px);';
    ovl.innerHTML = `
      <div style="background:var(--bg2);border:1.5px solid rgba(255,92,106,.3);border-radius:20px;padding:28px 24px;max-width:340px;width:100%;text-align:center;">
        <div style="font-size:40px;margin-bottom:14px;">⚠️</div>
        <div style="font-size:18px;font-weight:800;color:var(--red);margin-bottom:8px;">Reset completo</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.65;margin-bottom:24px;">Tutti i dati (allenamenti, nutrizione, progressi) verranno <b>eliminati in modo irreversibile</b> — <b style="color:var(--red)">anche dal cloud Google</b>. Non è possibile annullare questa azione.</div>
        <div style="display:flex;gap:10px;">
          <button id="_reset-cancel" style="flex:1;padding:13px;background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r-lg);font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--text);cursor:pointer;">Annulla</button>
          <button id="_reset-confirm" style="flex:1;padding:13px;background:var(--red);color:#fff;border:none;border-radius:var(--r-lg);font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer;">🗑 Elimina tutto</button>
        </div>
      </div>`;
    document.body.appendChild(ovl);
    document.getElementById('_reset-cancel').onclick = () => { ovl.remove(); resolve(false); };
    document.getElementById('_reset-confirm').onclick = () => { ovl.remove(); resolve(true); };
  }).then(confirmed => {
    if (!confirmed) return;
    // Procedi con il reset
    _doReset();
  });
}

async function _doReset(){
  if(typeof showToast==='function') showToast('🗑 Reset in corso...');

  // 1. Resetta variabili in memoria PRIMA di tutto
  profile={name:'',level:'',goals:{calories:2500,weight:70,goalType:'maintain'},days:'5',kcalTarget:2500,macros:{p:180,c:280,g:70},tdee:2500,physique:{age:17,weight:70,height:175,sex:'m',activity:1.55},weeklyWorkoutsTarget:3,weightHistory:[]};
  sessions=[];nutrition={};metrics={};pbs={};

  // 2. Svuota IndexedDB
  try{
    if(typeof dbSet==='function'){
      await Promise.all([dbSet('profile',profile),dbSet('sessions',[]),dbSet('nutrition',{}),dbSet('metrics',{}),dbSet('pbs',{})]);
    }
  }catch(e){}

  // 3. Svuota localStorage (tutte le chiavi ft_*, ft3_*, v45_* + chiavi auth)
  try{
    const toRemove=[];
    for(var i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&(k.startsWith('ft_')||k.startsWith('ft3_')||k.startsWith('v45_')))toRemove.push(k);}
    toRemove.forEach(function(k){localStorage.removeItem(k);});
    // Rimuovi tutte le chiavi di autenticazione e sessione
    // così dopo il reload l'app riparte dalla schermata di login → onboarding completo
    ['ft_google_token','ft_google_user','ft_skip_google',
     'ft_firebase_user','ft_last_local_save','ft_last_sync',
     'ft_badges','ft_pro_status','ft_v45_settings','v45_settings',
     'ft3_profile','ft3_sessions','ft3_nutrition','ft3_metrics','ft3_pbs'
    ].forEach(function(k){ try{ localStorage.removeItem(k); }catch(e){} });
  }catch(e){}

  // 4. Cancella dati su Firestore (sovrascrive con profilo vuoto)
  try{
    if(typeof setDoc==='function'&&typeof doc==='function'&&typeof db!=='undefined'&&typeof auth!=='undefined'&&auth.currentUser){
      const emptyCloud={profile:profile,sessions:[],nutrition:{},metrics:{},pbs:{},badges:{},settings:{},proStatus:{},updatedAt:new Date().toISOString(),appVersion:'RESET'};
      await setDoc(doc(db,'users',auth.currentUser.uid,'data','main'),emptyCloud);
    }
  }catch(e){console.warn('[Reset] Firestore:',e.message);}

  // 5. Google Drive reset — skip: il token è già stato rimosso dal localStorage
  //    GoogleSync.save() fallirebbe con "Error creating iframe id" su mobile

  // 6. Imposta flag "just reset" e azzera il timestamp locale
  // così al prossimo login il cloud (già azzerato) risulterà più recente
  try{
    localStorage.setItem('ft_just_reset','1');
    localStorage.removeItem('ft_last_local_save'); // forza cloudIsNewer=false sul prossimo load
  }catch(e){}

  // 7. Non fare signOut Firebase — causa "Error creating iframe id" su mobile.
  // Il flag ft_just_reset + localStorage svuotato sono sufficienti.
  // L'utente dovrà scegliere di nuovo l'account Google al prossimo login.
  // Il provider Google ha già prompt:'select_account' — l'utente vedrà la scelta account al prossimo login

  showToast('✅ Account resettato — scegli di nuovo il tuo account Google');
  setTimeout(function(){location.reload();},1200);
}

// ════════════════════════════════════════
// V4 — RICETTE FIT
// ════════════════════════════════════════
var RICETTE=[
  // MASSA
  {id:'r1',name:'Bowl Proteica del Campione',ico:'🏆',tags:['massa','post-workout'],time:'10 min',kcal:620,p:52,c:68,g:14,diff:'Facile',
   desc:'Il pasto post-workout perfetto per chi vuole crescere.',
   ingredienti:['150g petto di pollo grigliato','120g riso basmati cotto','50g avocado','2 cucchiai di hummus','Pomodorini e cetriolo q.b.','Sale, limone, olio EVO'],
   steps:['Cuoci il riso e lascialo raffreddare 5 minuti.','Taglia il pollo a striscioline e condisci con limone e sale.','Assembla nella ciotola: riso, pollo, avocado a cubetti.','Aggiungi hummus, pomodorini e un filo d\'olio.']},
  {id:'r2',name:'Pancake Proteici alla Banana',ico:'🥞',tags:['massa','colazione'],time:'15 min',kcal:480,p:38,c:52,g:12,diff:'Facile',
   desc:'Colazione anabolica senza bilancia — gustosa e macros perfette.',
   ingredienti:['2 banane mature','4 albumi + 1 uovo intero','30g farina d\'avena','1 scoop whey vaniglia (30g)','Cannella q.b.','Miele per servire'],
   steps:['Schiacciate le banane con una forchetta fino a crema.','Aggiungete uova, farina d\'avena e whey. Mescolate bene.','Scaldate padella antiaderente con un velo d\'olio.','Cuocete a fuoco medio 2-3 min per lato. Servite con miele.']},
  {id:'r3',name:'Pasta con Tonno e Pomodoro',ico:'🍝',tags:['massa','pranzo'],time:'20 min',kcal:540,p:40,c:72,g:10,diff:'Facile',
   desc:'Classico intramontabile con un ottimo profilo proteico.',
   ingredienti:['90g pasta integrale','160g tonno al naturale','200g pomodori pelati','1 spicchio aglio','Basilico fresco','Sale, olio EVO'],
   steps:['Cuoci la pasta in acqua salata al dente.','Soffriggi aglio in olio, aggiungi pomodori e cuoci 8 min.','Aggiungi il tonno sgocciolato e mescola.','Condisci la pasta con il sugo e basilico fresco.']},
  {id:'r4',name:'Omelette Proteica Mega',ico:'🍳',tags:['massa','colazione','rapido'],time:'8 min',kcal:410,p:42,c:6,g:24,diff:'Facile',
   desc:'Veloce, proteica e saziante. Perfetta anche come cena leggera.',
   ingredienti:['4 albumi + 2 uova intere','50g ricotta magra','30g parmigiano','Spinaci freschi a piacere','Sale, pepe, origano'],
   steps:['Sbatti uova e albumi con ricotta, sale e pepe.','Scalda padella con olio e aggiungi gli spinaci 1 min.','Versa il composto e cuoci a fuoco basso con coperchio 4 min.','Aggiungi parmigiano, piega e servi.']},
  {id:'r5',name:'Shake Gainer Artigianale',ico:'🥤',tags:['massa','colazione','rapido'],time:'5 min',kcal:700,p:50,c:88,g:16,diff:'Facilissimo',
   desc:'Gainer homemade senza additivi. Ideale per chi fa fatica a mangiare abbastanza.',
   ingredienti:['300ml latte intero','2 banane','1 scoop whey cioccolato (30g)','40g avena','1 cucchiaio burro di arachidi','4 cubetti di ghiaccio'],
   steps:['Inserisci tutti gli ingredienti nel frullatore.','Frulla 45 secondi a piena velocità.','Servi subito. Consume entro 20 min dalla preparazione.']},
  // DEFINIZIONE
  {id:'r6',name:'Insalata Salmone e Quinoa',ico:'🥗',tags:['definizione','pranzo'],time:'15 min',kcal:380,p:32,c:34,g:12,diff:'Facile',
   desc:'Omega-3 e fibre per un pasto saziante a basse calorie.',
   ingredienti:['120g salmone al vapore','80g quinoa cotta','100g spinacini baby','Pomodorini 100g','Cetriolo 80g','Limone, olio EVO, sale'],
   steps:['Cuoci la quinoa per 12 min e lascia raffreddare.','Cuoci il salmone al vapore 8-10 min e sminuzza.','Assembla spinacini, quinoa, pomodorini e cetriolo.','Condisci con salmone, succo di limone e filo d\'olio.']},
  {id:'r7',name:'Pollo alla Piastra con Verdure',ico:'🍗',tags:['definizione','cena'],time:'20 min',kcal:290,p:40,c:14,g:8,diff:'Facile',
   desc:'Il classico della definizione — efficace, semplice, proteico.',
   ingredienti:['180g petto di pollo','Zucchine 150g','Peperoni 100g','Rosmarino, aglio in polvere','Sale, pepe, olio spray'],
   steps:['Batti il pollo per uno spessore uniforme di 1.5cm.','Condisci con rosmarino, aglio in polvere, sale e pepe.','Cuoci sulla piastra calda 4 min per lato.','Grigliare le verdure a pezzi grandi nello stesso periodo.']},
  {id:'r8',name:'Greek Yogurt Bowl',ico:'🫙',tags:['definizione','colazione','rapido'],time:'3 min',kcal:280,p:28,c:32,g:4,diff:'Facilissimo',
   desc:'Colazione anti-catabolica in 3 minuti. Saziante e leggera.',
   ingredienti:['200g yogurt greco 0%','1 cucchiaio miele grezzo','30g mirtilli','30g fragole','15g granola (senza zuccheri aggiunti)'],
   steps:['Versa lo yogurt in una ciotola.','Aggiungi miele e mescola.','Disponi frutta fresca e granola sopra.','Consuma subito per mantenere la croccantezza.']},
  {id:'r9',name:'Zuppa di Lenticchie Proteica',ico:'🍲',tags:['definizione','cena','veg'],time:'25 min',kcal:320,p:20,c:48,g:6,diff:'Facile',
   desc:'Vegana, economica e ricca di proteine vegetali e ferro.',
   ingredienti:['150g lenticchie rosse secche','1 carota + 1 cipolla + 1 gambo sedano','400ml brodo vegetale','Cumino, curcuma, peperoncino','1 cucchiaio olio EVO + limone'],
   steps:['Soffriggi le verdure tagliate fini in olio 5 min.','Aggiungi le spezie e mescola 1 min.','Aggiungi lenticchie e brodo, cuoci 15-18 min.','Frulla parzialmente, condisci con limone e servi.']},
  // PRE-WORKOUT
  {id:'r10',name:'Toast Pre-Workout Energetico',ico:'🍞',tags:['pre-workout','colazione'],time:'5 min',kcal:350,p:22,c:44,g:8,diff:'Facilissimo',
   desc:'Carboidrati + proteine 60-90 min prima del training. Energia sostenuta.',
   ingredienti:['2 fette pane integrale','100g ricotta magra','1 banana a fette','1 cucchiaino miele','Cannella q.b.'],
   steps:['Tosta le fette di pane 2 minuti.','Spalma la ricotta uniformemente.','Disponi la banana a fette sopra.','Aggiungi miele e un pizzico di cannella.']},
  {id:'r11',name:'Riso e Pollo Pre-Training',ico:'🍚',tags:['pre-workout','pranzo'],time:'20 min',kcal:440,p:38,c:54,g:6,diff:'Facile',
   desc:'Il pasto che usano i bodybuilder da 50 anni. Funziona ancora.',
   ingredienti:['100g riso basmati','150g petto di pollo','Brodo di pollo q.b.','Erbe aromatiche','Sale, un filo olio'],
   steps:['Cuoci il riso nel brodo di pollo per più sapore.','Cuoci il pollo in padella 4-5 min per lato a fuoco medio.','Unisci in un piatto, condisci con erbe e olio.','Consuma 60-90 min prima dell\'allenamento.']},
  // POST-WORKOUT
  {id:'r12',name:'Shake Recupero Ultra Rapido',ico:'🥛',tags:['post-workout','rapido'],time:'2 min',kcal:320,p:40,c:36,g:4,diff:'Facilissimo',
   desc:'La finestra anabolica non aspetta. Pronto in 2 minuti.',
   ingredienti:['1 scoop whey (30g)','1 banana grande','250ml acqua o latte scremato','5g creatina monoidrato'],
   steps:['Metti tutti gli ingredienti nello shaker o frullatore.','Agita vigorosamente per 20 secondi.','Bevi entro 30 minuti dalla fine dell\'allenamento.']},
  // VEGANO/VEGETARIANO
  {id:'r13',name:'Buddha Bowl Vegana',ico:'🥙',tags:['veg','pranzo','definizione'],time:'20 min',kcal:420,p:18,c:58,g:14,diff:'Facile',
   desc:'Colorata, nutriente, 100% vegetale. Completa in nutrienti.',
   ingredienti:['100g quinoa cotta','80g ceci arrostiti','100g edamame','1/2 avocado','Carote grattugiate 60g','Tahini 20g + limone + aglio'],
   steps:['Arrostisci i ceci in forno a 200° per 15 min con paprika.','Prepara la salsa: tahini + succo limone + aglio + acqua.','Assembla la bowl con tutti gli ingredienti.','Condisci con la salsa al tahini.']},
  {id:'r14',name:'Tofu Saltato con Riso',ico:'🥢',tags:['veg','cena'],time:'20 min',kcal:390,p:24,c:48,g:10,diff:'Facile',
   desc:'Proteina vegetale completa con aminoacidi essenziali.',
   ingredienti:['200g tofu extra-firm','100g riso jasmine cotto','Broccoli 150g','Salsa di soia 2 cucchiai','Zenzero fresco, aglio','Sesamo e olio di sesamo'],
   steps:['Taglia il tofu a cubetti e asciuga con carta da cucina.','Soffriggi aglio e zenzero in olio di sesamo 1 min.','Aggiungi tofu e rosola 5 min per lato fino a doratura.','Aggiungi broccoli, salsa di soia e riso. Mescola 3 min.']},
  // SNACK/SPUNTINO
  {id:'r15',name:'Energy Balls al Cacao',ico:'⚫',tags:['spuntino','rapido','massa'],time:'10 min',kcal:180,p:8,c:22,g:7,diff:'Facilissimo',
   desc:'8-10 palline · snack energetico senza cottura.',
   ingredienti:['100g avena tritata','2 cucchiai burro di arachidi','1 cucchiaio miele','1 scoop proteine cioccolato (15g)','Cacao amaro 1 cucchiaio'],
   steps:['Mescola tutti gli ingredienti in una ciotola fino a composto omogeneo.','Se troppo secco aggiungi un cucchiaino di acqua.','Forma palline da 25g con le mani.','Refrigera 20 min prima di consumare. Si conservano 5 giorni.']},

  // ── RICETTE DA SOCIAL ──────────────────────────────────────────
  {id:'r16',name:'Bowl 114g Proteine (Louie Testa)',ico:'🏋️',tags:['massa','post-workout','pranzo'],time:'15 min',kcal:650,p:114,c:18,g:22,diff:'Facile',
   desc:'Questa bowl ha più proteine di quelle che la maggior parte delle persone mangia in un giorno intero. Solo ingredienti puliti e interi.',
   ingredienti:['200g petto di pollo grigliato (a straccetti)','150g cottage cheese','3 uova strapazzate con curcuma e pepe','50g rucola fresca','20g parmigiano a scaglie','Un filo di olio EVO','Sale e pepe q.b.'],
   steps:['Cuoci il pollo alla piastra e taglialo a straccetti. Condisci con sale e pepe.','Strapazza le uova in padella antiaderente con curcuma e pepe nero — cuoci morbide.','Disponi la rucola come base nella ciotola.','Aggiungi il cottage cheese, le uova strapazzate e il pollo.','Finalizza con le scaglie di parmigiano e un filo d\'olio EVO.']},

  {id:'r17',name:'Udon in Salsa di Arachidi Vegan',ico:'🍜',tags:['veg','pranzo','cena','massa'],time:'15 min',kcal:1776,p:140,c:146,g:62,diff:'Facile',
   desc:'Bowl vegan ad alto contenuto proteico con noodles udon, tempeh croccante e salsa di arachidi. Ricetta per 2 porzioni abbondanti.',
   ingredienti:['400g udon precotti','100g broccoli','200g tempeh (saltato in padella)','150g wok-verdure miste','160g pollo vegano (saltato)','30g spinaci freschi','Salsa arachidi: 60g burro di arachidi in polvere, 75ml acqua, 2 cucchiai salsa di soia, 2 cucchiai sciroppo d\'acero, 1 cucchiaio olio chili croccante, succo di 1/2 lime','250ml latte di cocco light','200ml acqua','2 cucchiai salsa di soia','1 cucchiaino curry in pasta'],
   steps:['Prepara la salsa di arachidi: mescola burro di arachidi in polvere, acqua, salsa di soia, sciroppo d\'acero, olio chili e succo di lime. Metti da parte.','Unisci latte di cocco, acqua, salsa di soia e curry in pasta in un wok/padella capiente.','Aggiungi uno a uno tutti gli ingredienti (broccoli, verdure, spinaci, tempeh, pollo vegano, udon).','Copri con il coperchio e cuoci a fuoco medio per 5-7 minuti, mescolando a metà cottura.','Servi nei piatti con la salsa di arachidi versata sopra.']},

  {id:'r18',name:'5 Insalate di Riso Anti-Gonfiore',ico:'🥗',tags:['definizione','pranzo','veg'],time:'20 min',kcal:350,p:18,c:48,g:8,diff:'Facile',
   desc:'5 versioni di insalata di riso leggere e sgonfianti. Scegline una! La n°1 è freschissima.',
   ingredienti:['Versione 1 — Riso integrale, cetriolo, menta: 80g riso integrale cotto, 1/2 cetriolo, foglie di menta, succo di limone, filo d\'olio EVO','Versione 2 — Riso basmati, zucchine, avocado: 80g riso basmati, 1 zucchina grigliata, 1/2 avocado, semi di girasole','Versione 3 — Riso Venere, salmone, finocchio: 80g riso Venere, 100g salmone, 1/2 finocchio, succo d\'arancia','Versione 4 — Riso integrale, pollo, rucola: 80g riso integrale, 100g pollo grigliato a pezzi, rucola, pomodorini, olio EVO','Versione 5 — Riso basmati, gamberi, zucchine: 80g riso basmati, 100g gamberi saltati, 1 zucchina, curcuma'],
   steps:['Cuoci il riso scelto seguendo le istruzioni sulla confezione, poi lascia raffreddare.','Prepara gli ingredienti della versione scelta: griglia, cuoci o prepara a crudo le proteine.','Assembla tutto in una ciotola.','Condisci come indicato per ogni versione e servi freddo o a temperatura ambiente.']},

  {id:'r19',name:'Insalata di Patate Giapponese',ico:'🥔',tags:['pranzo','spuntino'],time:'20 min',kcal:420,p:22,c:38,g:18,diff:'Facile',
   desc:'La versione giapponese della potato salad — cremosa, saporita, unica. Il trucco è nella salsa!',
   ingredienti:['2 patate medie','4 uova sode (1 come topping)','1/2 cetriolo a fette sottili','Bacon a piacere','Salsa: 2 cucchiai yogurt greco, 2 cucchiai maionese, 1 cucchiaio senape, 2 cucchiai latte, pepe nero q.b.'],
   steps:['Ammorbidisci le patate: avvolgile nella pellicola trasparente e metti nel microonde a 600W per 4-6 minuti.','Prepara le uova sode (circa 8-10 min in acqua bollente), poi raffreddale e sbucciale.','Mescola tutti gli ingredienti della salsa in una ciotola: yogurt, maionese, senape, latte e pepe.','Schiaccia le patate grossolanamente, aggiungi 3 uova a pezzi, cetriolo e bacon.','Condisci con la salsa, mescola e disponi l\'ultima uova soda sopra come topping.']},

  // ── V6 NUOVE RICETTE FIT ─────────────────────────────────────
  {id:'rv1',name:'Porridge Proteico al Cacao',ico:'🍫',tags:['massa','colazione'],time:'5 min',kcal:420,p:32,c:48,g:8,diff:'Facile',
   desc:'Colazione anabolica ad alto contenuto proteico. La whey si aggiunge a freddo fuori dal fuoco per non denaturarla.',
   ingredienti:['80g fiocchi d\'avena','30g whey al cioccolato','200ml latte scremato','1 banana a fette','1 cucchiaio burro di arachidi','Cannella q.b.'],
   steps:['Cuoci l\'avena nel latte mescolando per 3 minuti.','Togli dal fuoco, aspetta 1 minuto, poi aggiungi la whey e mescola energicamente.','Versa nella ciotola e aggiungi banana, burro di arachidi e un pizzico di cannella.']},

  {id:'rv2',name:'Pancake di Albumi e Avena',ico:'🥞',tags:['colazione','definizione'],time:'10 min',kcal:310,p:28,c:35,g:5,diff:'Facile',
   desc:'Pancake proteici senza farina. Usate la banana matura: più è matura, più l\'impasto si lega bene.',
   ingredienti:['150g albumi','60g fiocchi d\'avena frullati','1 banana matura','Cannella','Vaniglia','Frutti di bosco per servire'],
   steps:['Frulla albumi, avena frullata, banana, cannella e vaniglia fino a ottenere un composto omogeneo.','Scalda una padella antiaderente a fuoco medio. Versa cucchiai di impasto.','Cuoci 2 min per lato finché i bordi sono asciutti. Servi con frutti di bosco freschi.']},

  {id:'rv3',name:'Yogurt Bowl ad Alto Contenuto Proteico',ico:'🫙',tags:['colazione','spuntino','definizione'],time:'3 min',kcal:290,p:30,c:28,g:5,diff:'Facile',
   desc:'Colazione o spuntino da 30g di proteine in 3 minuti esatti.',
   ingredienti:['200g yogurt greco 0%','30g granola integrale','100g mirtilli freschi','1 cucchiaio miele','10g mandorle a scaglie','Semi di chia q.b.'],
   steps:['Versa lo yogurt nella bowl.','Disponi granola, mirtilli, miele, mandorle e semi di chia sopra.','Nessuna cottura — mangia subito o metti in frigo per overnight bowl.']},

  {id:'rv4',name:'Shake Post-Workout Banana',ico:'🍌',tags:['post-workout','massa'],time:'3 min',kcal:380,p:35,c:40,g:5,diff:'Facile',
   desc:'Finestra anabolica aperta: consuma questo shake entro 30 minuti dal fine allenamento.',
   ingredienti:['30g whey vaniglia','1 banana congelata','200ml latte scremato','5g creatina monoidrato','1 cucchiaio miele','Ghiaccio q.b.'],
   steps:['Metti tutti gli ingredienti nel frullatore.','Frulla 30 secondi a potenza massima.','Consuma immediatamente entro 30 minuti dall\'allenamento.']},

  {id:'rv5',name:'Petto di Pollo con Patate Dolci al Forno',ico:'🍠',tags:['cena','pranzo','massa'],time:'30 min',kcal:480,p:44,c:42,g:8,diff:'Facile',
   desc:'Il classico combo bodybuilder reso saporito con spezie e cottura corretta.',
   ingredienti:['180g petto di pollo','200g patate dolci','Paprika affumicata','Curcuma','Aglio in polvere','Olio EVO 10ml','Rosmarino','Sale, pepe'],
   steps:['Preriscalda il forno a 200°C.','Taglia le patate dolci a cubetti 2cm. Condisci con olio, paprika, curcuma, sale.','Disponi pollo e patate in teglia separata. Aggiungi rosmarino.','Inforna per 25-28 min, girando le patate a metà cottura.','Fai riposare il pollo 3 min prima di tagliare.']},

  {id:'rv6',name:'Salmone al Forno con Asparagi',ico:'🐟',tags:['cena','definizione'],time:'20 min',kcal:420,p:38,c:8,g:18,diff:'Facile',
   desc:'Omega-3, proteine complete e micronutrienti in un unico piatto. Il limone è fondamentale.',
   ingredienti:['200g filetto di salmone','200g asparagi','150g pomodorini','1 limone','2 spicchi aglio','Rosmarino','10ml olio EVO','Sale, pepe'],
   steps:['Preriscalda il forno a 180°C.','Metti il salmone in teglia con gli asparagi e i pomodorini.','Irrora con olio, succo di limone, aglio schiacciato e rosmarino.','Inforna per 16-18 minuti. Il salmone è pronto quando si sfalda facilmente con la forchetta.']},

  {id:'rv7',name:'Chili di Tacchino e Fagioli Neri',ico:'🌶️',tags:['cena','pranzo','massa','definizione'],time:'35 min',kcal:390,p:42,c:34,g:8,diff:'Media',
   desc:'Meal prep per 4 porzioni. Si conserva 4 giorni in frigo e si congela benissimo.',
   ingredienti:['400g tacchino macinato','240g fagioli neri cotti','400g pomodori pelati','2 peperoni misti','1 cipolla','3 spicchi aglio','Cumino 2 cucchiaini','Paprika affumicata 2 cucchiaini','Coriandolo in polvere','Peperoncino a piacere'],
   steps:['Rosola la cipolla tritata con l\'aglio per 3 min.','Aggiungi il tacchino macinato e cuoci spezzettandolo finché dorato.','Aggiungi peperoni, spezie e pomodori pelati. Mescola bene.','Cuoci a fuoco medio 20 min con coperchio. Aggiungi i fagioli e cuoci altri 5 min.','Aggiusta di sale e servi con riso o tortilla integrale.']},

  {id:'rv8',name:'Curry di Lenticchie Rosse e Spinaci',ico:'🍛',tags:['cena','veg'],time:'30 min',kcal:360,p:22,c:50,g:7,diff:'Facile',
   desc:'Piatto vegano ad alto contenuto proteico. Le lenticchie rosse si cuociono senza ammollo.',
   ingredienti:['200g lenticchie rosse secche','200ml latte di cocco light','200g spinaci freschi','1 cipolla','2 spicchi aglio','Zenzero fresco 1cm','Curry in polvere 2 cucchiai','300g pomodori pelati','Sale'],
   steps:['Soffriggi cipolla, aglio e zenzero tritati per 4 min.','Aggiungi curry e tosta 1 minuto mescolando.','Unisci lenticchie, pomodori e latte di cocco. Aggiungi 300ml acqua.','Cuoci 20 min a fuoco medio finché le lenticchie si disfano.','Aggiungi gli spinaci, mescola e cuoci 2 min. Aggiusta di sale.']},

  {id:'rv9',name:'Burger di Tonno e Ceci',ico:'🍔',tags:['cena','pranzo','definizione'],time:'20 min',kcal:360,p:34,c:32,g:8,diff:'Facile',
   desc:'Burger ad alta proteina senza carne rossa. Croccanti fuori, morbidi dentro.',
   ingredienti:['160g tonno al naturale sgocciolato','100g ceci cotti','1 uovo','Prezzemolo fresco','1 limone (succo)','Curcuma 1 cucchiaino','2 cucchiai pangrattato integrale','Sale, pepe'],
   steps:['Frulla i ceci grossolanamente (non purea). Sgocciola bene il tonno.','Mescola tonno, ceci, uovo, prezzemolo, limone, curcuma e pangrattato.','Forma 2 burger e metti in frigo 10 minuti (si compattano).','Cuoci in padella antiaderente con 1 cucchiaino olio, 4 min per lato a fuoco medio.']},

  {id:'rv10',name:'Muffin Fit Avena e Mirtilli',ico:'🫐',tags:['spuntino','colazione'],time:'20 min',kcal:180,p:8,c:26,g:5,diff:'Facile',
   desc:'Preparane 6 in una volta. Durano 3 giorni in frigo, ideali come snack post-WO.',
   ingredienti:['120g fiocchi d\'avena frullati','2 uova','100g yogurt greco','80g mirtilli freschi','30ml miele o sciroppo d\'agave','1 cucchiaino lievito per dolci','Cannella','Vaniglia'],
   steps:['Preriscalda il forno a 180°C. Prepara 6 pirottini in silicone.','Mescola avena, uova, yogurt, miele, lievito, cannella e vaniglia.','Aggiungi delicatamente i mirtilli senza schiacciarli.','Distribuisci il composto nei pirottini fino a 3/4.','Cuoci 18 minuti. Verifica con stuzzicadenti al centro.']},

  {id:'rv11',name:'Energy Balls Burro d\'Arachidi',ico:'⚡',tags:['spuntino','pre-workout','massa'],time:'10 min',kcal:200,p:7,c:22,g:10,diff:'Facile',
   desc:'Non richiedono cottura. Prepara 8-10 palline, mettile in frigo e hai spuntini per tutta la settimana.',
   ingredienti:['100g fiocchi d\'avena','3 cucchiai burro d\'arachidi naturale','2 cucchiai miele','30g cioccolato fondente 85% a scaglie','1 cucchiaio semi di chia'],
   steps:['Mescola avena, burro di arachidi, miele e semi di chia in una ciotola.','Aggiungi il cioccolato a scaglie e mescola.','Forma palline da 30g con le mani umide.','Metti in frigo 30 minuti prima di consumare. Conserva fino a 5 giorni.']},

  {id:'rv12',name:'Frittata Alta al Forno',ico:'🍳',tags:['cena','definizione','colazione'],time:'20 min',kcal:290,p:38,c:6,g:12,diff:'Facile',
   desc:'Più proteica di una frittata normale grazie agli albumi aggiuntivi. Perfetta fredda il giorno dopo.',
   ingredienti:['4 uova intere','150g albumi','100g spinaci freschi','100g funghi champignon','50g feta sgocciolata','Erbe aromatiche miste','Sale, pepe nero'],
   steps:['Preriscalda il forno a 180°C.','Rosola i funghi in padella antiaderente 3 min.','Sbatti uova e albumi con sale, pepe e erbe aromatiche.','Aggiungi spinaci crudi, funghi e feta sbriciolata.','Versa in teglia da 20cm antiaderente. Cuoci in forno 18 minuti finché gonfia e dorata.']},

  {id:'rv13',name:'Overnight Oats al Burro di Arachidi',ico:'🌙',tags:['colazione','massa'],time:'5 min',kcal:460,p:26,c:55,g:12,diff:'Facile',
   desc:'Preparazione serale: 5 minuti la sera, colazione pronta al mattino. Zero compromessi sui macros.',
   ingredienti:['80g fiocchi d\'avena','200ml latte scremato','30g whey vaniglia','2 cucchiai burro d\'arachidi','1 cucchiaio miele','Semi di chia','Banana o mirtilli per servire'],
   steps:['La sera: mescola avena, latte, whey, burro di arachidi, miele e semi di chia in un barattolo.','Chiudi e metti in frigo tutta la notte.','Al mattino: aggiungi la frutta e consuma freddo o scalda 1 min al microonde.']},

  {id:'rv14',name:'Bowl Riso Venere Salmone e Avocado',ico:'🍱',tags:['pranzo','cena','massa'],time:'20 min',kcal:540,p:38,c:48,g:14,diff:'Facile',
   desc:'Il poke bowl italiano. Il riso venere dà più fibre e antiossidanti del riso bianco.',
   ingredienti:['150g riso venere cotto','150g salmone fresco a cubetti','1/2 avocado','50g edamame cotti','1/2 cetriolo','1 cucchiaio salsa di soia','Semi di sesamo','Lime'],
   steps:['Cuoci il riso venere (circa 35 min o usa il microonde).','Marina il salmone con salsa di soia e succo di lime per 5 minuti.','Assembla la bowl: riso, salmone, avocado a fette, edamame, cetriolo.','Guarnisci con sesamo tostato e un filo di salsa di soia.']},

  {id:'rv15',name:'Pasta Proteica al Tonno e Pomodorini',ico:'🍝',tags:['pranzo','massa','rapido'],time:'15 min',kcal:490,p:38,c:52,g:8,diff:'Facile',
   desc:'Il classico veloce e bilanciato. Con pasta proteica arrivi a 40g di proteine per porzione.',
   ingredienti:['90g pasta integrale o proteica','160g tonno al naturale','150g pomodorini ciliegino','2 spicchi aglio','Basilico fresco','10ml olio EVO','Peperoncino a piacere','Sale'],
   steps:['Cuoci la pasta in acqua salata.','Rosola l\'aglio in olio, aggiungi i pomodorini e cuoci 5 min finché scoppiettano.','Aggiungi il tonno sgocciolato, mescola e spegni il fuoco.','Scola la pasta tenendo 2 cucchiai d\'acqua. Condisci con il sugo. Aggiungi basilico fresco.']},
,
  {id:'nx1',name:'Pollo Teriyaki con Riso',ico:'🍱',tags:['massa','cena','pranzo'],time:'25 min',kcal:510,p:46,c:52,g:8,diff:'Facile',alimenti:['pollo','riso','salsa di soia','zenzero','aglio','miele'],desc:'Il classico giapponese adattato al fitness. La salsa teriyaki homemade è superiore.',ingredienti:['180g petto di pollo a cubetti','120g riso basmati cotto','3 cucchiai salsa di soia','1 cucchiaio miele','Zenzero fresco 1cm grattugiato','2 spicchi aglio','1 cucchiaino amido di mais','Sesamo e cipollotto'],steps:['Mescola salsa di soia, miele, aglio, zenzero e amido. Marina il pollo 10 min.','Cuoci il riso.','Rosola il pollo 5-6 min finché caramellato.','Aggiungi la marinata e cuoci 2 min a glassa.','Servi su riso con sesamo e cipollotto.']},
  {id:'nx2',name:'Pollo al Curry e Yogurt',ico:'🍛',tags:['cena','definizione'],time:'30 min',kcal:350,p:44,c:12,g:10,diff:'Facile',alimenti:['pollo','yogurt greco','curry','pomodori','cipolla','aglio'],desc:'Versione light del curry. Lo yogurt al posto della panna taglia metà dei grassi.',ingredienti:['200g petto di pollo a cubetti','150g yogurt greco 0%','1 cipolla','2 spicchi aglio','Curry 2 cucchiaini','200g pomodori pelati','Coriandolo','Sale, olio EVO'],steps:['Rosola cipolla e aglio 3 min.','Aggiungi curry e tosta 1 min.','Unisci pollo e cuoci 5 min.','Aggiungi pomodori e cuoci 15 min.','Spegni, aggiungi yogurt. Non far bollire.']},
  {id:'nx3',name:'Caesar Wrap Proteico',ico:'🌯',tags:['pranzo','definizione','rapido'],time:'10 min',kcal:380,p:36,c:28,g:12,diff:'Facile',alimenti:['pollo','lattuga','parmigiano','limone','yogurt greco','tortilla integrale'],desc:'Il pranzo da portare in ufficio. Preparalo la sera.',ingredienti:['150g pollo grigliato a straccetti','1 tortilla integrale','50g lattuga romana','20g parmigiano a scaglie','Salsa: 2 cucchiai yogurt greco + limone + senape + aglio in polvere'],steps:['Mescola gli ingredienti della salsa caesar.','Scalda la tortilla 30 sec.','Disponi lattuga, pollo e parmigiano.','Aggiungi la salsa e arrotola strettamente.','Taglia a metà e servi.']},
  {id:'nx4',name:'Pollo alla Diavola al Forno',ico:'🌶️',tags:['cena','massa','definizione'],time:'35 min',kcal:380,p:52,c:4,g:14,diff:'Facile',alimenti:['pollo','peperoncino','aglio','limone','rosmarino','olio EVO'],desc:'Alta proteina, quasi zero carbs. Il peperoncino accelera il metabolismo.',ingredienti:['250g cosce di pollo disossate senza pelle','2 cucchiai olio EVO','Succo di 1 limone','2 spicchi aglio','Peperoncino','Rosmarino','Sale, pepe nero'],steps:['Incidi il pollo in profondità.','Marina con olio, limone, aglio, peperoncino, rosmarino minimo 20 min.','Cuoci in forno a 210°C per 28-30 min girando a metà.','Fai riposare 5 min prima di servire.']},
  {id:'nx5',name:'Uova in Purgatorio Fit',ico:'🍳',tags:['colazione','cena','rapido','definizione'],time:'15 min',kcal:280,p:22,c:18,g:10,diff:'Facile',alimenti:['uova','pomodori','peperoncino','aglio','cipolla'],desc:'Piatto mediterraneo low-carb e ad alta proteina. Perfetto come cena veloce.',ingredienti:['3 uova','300g passata di pomodoro','1/2 cipolla','2 spicchi aglio','Peperoncino','Basilico','Sale, olio EVO'],steps:['Soffriggi cipolla e aglio in olio 3 min.','Aggiungi passata, peperoncino, sale. Cuoci 8 min.','Crea 3 fossette nella salsa.','Rompi un uovo per ogni fossetta. Copri.','Cuoci 4-5 min per tuorlo morbido. Guarnisci con basilico.']},
  {id:'nx6',name:'Strapazzate con Salmone Affumicato',ico:'🥚',tags:['colazione','definizione','rapido'],time:'8 min',kcal:320,p:30,c:4,g:18,diff:'Facile',alimenti:['uova','salmone affumicato','erba cipollina','burro'],desc:'Tecnica dello chef: fuoco basso, movimento costante, ritiro dal fuoco prima che sia cotta.',ingredienti:['3 uova intere + 1 albume','60g salmone affumicato a pezzi','5g burro','Erba cipollina','Sale, pepe bianco'],steps:['Sbatti le uova con sale e pepe. NON aggiungere latte.','Padella a fuoco BASSO con il burro.','Versa le uova e mescola continuamente.','Quando ancora lucide, togli dal fuoco.','Aggiungi salmone ed erba cipollina. Il calore residuo finisce la cottura.']},
  {id:'nx7',name:'Frittata Mediterranea',ico:'🫔',tags:['cena','colazione','definizione'],time:'18 min',kcal:300,p:28,c:8,g:16,diff:'Facile',alimenti:['uova','feta','olive','pomodorini','spinaci','cipolla rossa'],desc:'Fredda il giorno dopo è ancora più buona.',ingredienti:['4 uova + 3 albumi','60g feta sbriciolata','50g olive kalamata','80g pomodorini','80g spinaci','1/4 cipolla rossa','Origano','Olio EVO'],steps:['Sbatti uova e albumi con origano.','Rosola cipolla 2 min. Aggiungi spinaci 1 min.','Versa le uova. Distribuisci pomodorini, olive e feta.','Cuoci sul fornello 3 min, poi forno 180°C per 8-10 min.']},
  {id:'nx8',name:'Trota al Cartoccio con Erbe',ico:'🐠',tags:['cena','definizione'],time:'25 min',kcal:310,p:40,c:2,g:14,diff:'Facile',alimenti:['trota','limone','rosmarino','prezzemolo','aglio','olio EVO'],desc:'Cottura al cartoccio = zero grassi aggiunti, sapore intatto.',ingredienti:['200g filetto di trota','1/2 limone a fette','Rosmarino e timo freschi','2 spicchi aglio a lamelle','Prezzemolo tritato','10ml olio EVO','Sale grosso, pepe'],steps:['Preriscalda forno a 190°C.','Stendi carta forno. Metti il filetto al centro.','Distribuisci aglio, erbe e limone sopra e sotto.','Irrora con olio. Chiudi il cartoccio.','Cuoci 18-20 min.']},
  {id:'nx9',name:'Gamberoni Saltati all Aglio',ico:'🍤',tags:['cena','definizione','rapido'],time:'10 min',kcal:220,p:32,c:4,g:8,diff:'Facile',alimenti:['gamberoni','aglio','prezzemolo','vino bianco','limone','peperoncino'],desc:'Piatto da ristorante in 10 minuti.',ingredienti:['250g gamberoni freschi sgusciati','3 spicchi aglio a lamelle','Prezzemolo abbondante','50ml vino bianco','1/2 limone','Peperoncino','15ml olio EVO'],steps:['Asciuga i gamberoni. Fondamentale per la rosolatura.','Scalda olio a fuoco alto. Aglio e peperoncino 30 sec.','Gamberoni in un solo strato. NON mescolare per 90 sec.','Gira, aggiungi vino, cuoci 60 sec.','Prezzemolo e succo limone. Servi subito.']},
  {id:'nx10',name:'Zuppa di Pesce Proteica',ico:'🍲',tags:['cena','definizione'],time:'35 min',kcal:340,p:42,c:16,g:8,diff:'Media',alimenti:['merluzzo','gamberoni','pomodori','cipolla','aglio','patate'],desc:'Cacciucco light con patate invece del pane.',ingredienti:['150g filetto di merluzzo','100g gamberoni','100g cozze','200g pomodori pelati','100g patate a cubetti','1 cipolla','3 spicchi aglio','50ml vino bianco','Prezzemolo','Olio EVO'],steps:['Soffriggi cipolla e aglio 4 min.','Aggiungi vino, evapori 1 min.','Pomodori, peperoncino e patate. Cuoci 15 min.','Aggiungi merluzzo a pezzi 5 min.','Gamberoni e cozze 4-5 min. Guarnisci con prezzemolo.']},
  {id:'nx11',name:'Bowl Bistecca e Patate Dolci',ico:'🥩',tags:['cena','massa'],time:'30 min',kcal:580,p:48,c:38,g:18,diff:'Facile',alimenti:['manzo','patate dolci','rucola','avocado','limone'],desc:'Pasto completo per chi vuole massa seria. La bistecca e tra le fonti di creatina naturale piu alte.',ingredienti:['180g controfiletto di manzo','150g patate dolci a cubetti','40g rucola','1/2 avocado','Limone','Aglio in polvere','Paprika','Olio EVO','Sale, pepe nero'],steps:['Cuoci patate dolci con olio, paprika e aglio a 200°C per 22 min.','Bistecca a temperatura ambiente 15 min prima.','Padella in ghisa a fuoco massimo. Asciuga la bistecca.','Cuoci 2-3 min per lato. Sale e pepe solo dopo.','Fai riposare 5 min, affetta. Assembla la bowl.']},
  {id:'nx12',name:'Polpette di Tacchino al Sugo',ico:'🍝',tags:['cena','pranzo','massa','meal-prep'],time:'35 min',kcal:420,p:44,c:22,g:12,diff:'Media',alimenti:['tacchino macinato','passata di pomodoro','uova','pangrattato','aglio','basilico'],desc:'Meal prep da fare in 4 porzioni. Le polpette si congelano benissimo.',ingredienti:['350g tacchino macinato','1 uovo','2 cucchiai pangrattato integrale','30g parmigiano','Aglio in polvere','Prezzemolo','500g passata di pomodoro','Basilico','Cipolla'],steps:['Mescola tacchino, uovo, pangrattato, parmigiano, aglio e prezzemolo.','Forma polpette da 30g. Frigo 10 min.','Rosola le polpette in olio 5 min. Metti da parte.','Sugo: cipolla in olio 3 min, passata + basilico.','Polpette nel sugo, cuoci a fuoco basso 20 min.']},
  {id:'nx13',name:'Hummus Bowl con Falafel al Forno',ico:'🥙',tags:['pranzo','veg','definizione'],time:'25 min',kcal:440,p:20,c:52,g:14,diff:'Media',alimenti:['ceci','tahini','limone','aglio','prezzemolo','cipolla','cumino'],desc:'Falafel al forno invece che fritti: stessa croccantezza, meta grassi.',ingredienti:['Hummus: 200g ceci cotti, 2 cucchiai tahini, limone, aglio, olio EVO','Falafel: 150g ceci cotti, 1/4 cipolla, prezzemolo, cumino, coriandolo, 2 cucchiai farina di ceci','Guarnizione: pomodorini, cetriolo, cipolla rossa, olive'],steps:['Falafel: frulla ceci con cipolla, prezzemolo e spezie. Aggiungi farina.','Forma palline, spennella con olio. Cuoci 200°C per 18-20 min.','Hummus: frulla ceci, tahini, limone, aglio e olio.','Assembla la bowl con hummus, falafel caldi e guarnizioni.']},
  {id:'nx14',name:'Tempeh Croccante con Quinoa',ico:'🌱',tags:['cena','veg','massa'],time:'25 min',kcal:480,p:34,c:46,g:14,diff:'Facile',alimenti:['tempeh','quinoa','broccoli','salsa di soia','aglio','zenzero','sesamo'],desc:'Il tempeh fermentato ha un profilo amminoacidico completo.',ingredienti:['200g tempeh a fette','100g quinoa cotta','150g broccoli','2 cucchiai salsa di soia','1 cucchiaio olio di sesamo','Zenzero grattugiato','Aglio','Sesamo tostato'],steps:['Marina tempeh con salsa di soia + aglio + zenzero + lime 10 min.','Cuoci quinoa.','Cuoci tempeh in olio sesamo 4 min per lato finche croccante.','Aggiungi broccoli e salta 3 min.','Servi su quinoa con sesamo.']},
  {id:'nx15',name:'Dahl di Lenticchie Rosse',ico:'🍛',tags:['cena','veg','meal-prep','definizione'],time:'30 min',kcal:370,p:22,c:54,g:6,diff:'Facile',alimenti:['lenticchie rosse','latte di cocco','cipolla','aglio','zenzero','curcuma','pomodori'],desc:'Vegan, economico, miglior il giorno dopo in frigo.',ingredienti:['200g lenticchie rosse secche','400ml latte di cocco light','200g pomodori pelati','1 cipolla','3 spicchi aglio','Zenzero 2cm','Curcuma 1 cucchiaino','Garam masala 1 cucchiaino','Spinaci 100g','Limone'],steps:['Soffriggi cipolla, aglio e zenzero 4 min.','Aggiungi spezie e tosta 1 min.','Lenticchie, pomodori e latte di cocco. Aggiungi 200ml acqua.','Cuoci 20 min finche le lenticchie si disfano.','Aggiungi spinaci 2 min. Regola di sale e limone.']},
  {id:'nx16',name:'Pasta e Ceci',ico:'🍝',tags:['pranzo','veg','massa'],time:'25 min',kcal:480,p:22,c:72,g:8,diff:'Facile',alimenti:['pasta integrale','ceci','rosmarino','aglio','pomodori','olio EVO'],desc:'Piatto della tradizione italiana, perfetto per il carico di carboidrati.',ingredienti:['80g pasta integrale corta','200g ceci cotti','200g pomodori pelati','2 spicchi aglio','Rosmarino','Peperoncino','Brodo vegetale','Olio EVO'],steps:['Soffriggi aglio e rosmarino in olio 2 min.','Aggiungi peperoncino e meta ceci. Cuoci 3 min.','Aggiungi pomodori e schiaccia grossolanamente. Cuoci 8 min.','Frulla meta della zuppa per cremosita.','Cuoci pasta direttamente nella zuppa. Servi con olio a crudo.']},
  {id:'nx17',name:'Smoothie Bowl Tropicale',ico:'🍓',tags:['colazione','spuntino','definizione'],time:'5 min',kcal:320,p:24,c:42,g:5,diff:'Facile',alimenti:['yogurt greco','mango','banana','frutti di bosco','granola','semi di chia'],desc:'Base cremosa densa che si mangia con il cucchiaio.',ingredienti:['150g yogurt greco 0%','100g mango congelato','1/2 banana','30g granola integrale','Frutti di bosco freschi','1 cucchiaio semi di chia'],steps:['Frulla yogurt, mango e banana fino a crema densa.','Versa in una bowl larga.','Disponi granola, frutti di bosco e chia per file.','Consuma subito.']},
  {id:'nx18',name:'Toast Avocado e Uova Pochees',ico:'🥑',tags:['colazione','definizione','rapido'],time:'10 min',kcal:380,p:22,c:28,g:18,diff:'Media',alimenti:['avocado','uova','pane integrale','limone','peperoncino','erba cipollina'],desc:'Le uova pochees sembrano difficili ma con la tecnica giusta sono infallibili.',ingredienti:['2 fette pane integrale','1/2 avocado maturo','2 uova fresche','Succo di limone','Peperoncino in scaglie','Erba cipollina','Aceto bianco'],steps:['Toasta il pane.','Schiaccia avocado con limone, sale e pepe.','Uova pochees: acqua bollente + aceto, fuoco dolce, mulinello, uovo 3 min.','Assembla: pane - avocado - uova - peperoncino ed erba cipollina.']},
  {id:'nx19',name:'Granola Proteica Homemade',ico:'🌾',tags:['colazione','spuntino','meal-prep'],time:'25 min',kcal:220,p:9,c:28,g:8,diff:'Facile',alimenti:['avena','mandorle','noci','miele','albumi','cannella'],desc:'Preparane 500g. Dura 2 settimane in barattolo ermetico.',ingredienti:['200g fiocchi avena grandi','50g mandorle tritate','30g noci tritate','30g semi di girasole','2 albumi','3 cucchiai miele','Cannella e vaniglia'],steps:['Preriscalda forno a 160°C.','Mescola avena, frutta secca e semi.','Sbatti albumi a schiuma. Aggiungi miele e spezie.','Mescola tutto e stendi su carta forno.','Cuoci 20-22 min mescolando a meta. Raffredda prima di conservare.']},
  {id:'nx20',name:'Crepes Proteiche alla Ricotta',ico:'🫔',tags:['colazione','massa'],time:'20 min',kcal:400,p:32,c:36,g:12,diff:'Facile',alimenti:['uova','ricotta','farina di avena','banana','miele','frutti di bosco'],desc:'La ricotta sostituisce il burro e triplica le proteine.',ingredienti:['3 uova','100g ricotta magra','40g farina avena frullata','1/2 banana','Cannella, vaniglia','Frutti di bosco','Miele'],steps:['Frulla uova, ricotta, farina, banana, cannella e vaniglia.','Padella antiaderente piccola a fuoco medio-basso.','Cuoci ogni crepe 2 min, gira, 1 min.','Farcisci con ricotta e frutti di bosco.','Piega e servi con miele.']},
  {id:'nx21',name:'Pudding di Chia al Cioccolato',ico:'🍫',tags:['spuntino','colazione','definizione'],time:'5 min',kcal:260,p:18,c:26,g:10,diff:'Facile',alimenti:['semi di chia','latte di mandorla','cacao amaro','miele','banana'],desc:'Preparalo la sera: 3 giorni di spuntini pronti in frigo.',ingredienti:['40g semi di chia','250ml latte di mandorla','1 cucchiaio cacao amaro','1 cucchiaino miele','Vaniglia','Banana o frutti di bosco per servire'],steps:['Mescola chia, latte, cacao, miele e vaniglia.','Mescola energicamente 2 min per evitare grumi.','Frigo minimo 4 ore.','Al mattino mescola e aggiungi frutta.']},
  {id:'nx22',name:'Barrette Proteiche Avena e Cioccolato',ico:'🍫',tags:['spuntino','pre-workout','massa'],time:'15 min',kcal:190,p:11,c:22,g:6,diff:'Facile',alimenti:['avena','whey cioccolato','burro di arachidi','miele','cioccolato fondente'],desc:'8 barrette in 15 minuti senza cottura. Pronte per tutta la settimana.',ingredienti:['150g fiocchi avena frullati','40g whey cioccolato','60g burro di arachidi','3 cucchiai miele','30ml latte','40g cioccolato fondente 85%'],steps:['Mescola avena, whey, burro di arachidi, miele e latte.','Stendi in stampo rettangolare (spessore 2cm).','Frigo 20 min.','Sciogli cioccolato e stendi sopra. Frigo 10 min.','Taglia in 8 barrette. Conserva in frigo 7 giorni.']},
  {id:'nx23',name:'Tzatziki Proteico con Verdure',ico:'🥒',tags:['spuntino','definizione','veg'],time:'10 min',kcal:160,p:14,c:12,g:4,diff:'Facile',alimenti:['yogurt greco','cetriolo','aglio','limone','carote','peperoni'],desc:'Spuntino saziante. Il tzatziki e naturalmente alto in proteine.',ingredienti:['200g yogurt greco 0%','1 cetriolo piccolo grattugiato e strizzato','1 spicchio aglio','Aneto','Succo di limone','Sale','Verdure crude per intingolo'],steps:['Grattugia cetriolo e strizzalo bene.','Mescola yogurt, cetriolo, aglio, aneto, limone e sale.','Frigo 10 min per amalgamare.','Taglia verdure a bastoncini.','Servi il tzatziki con le verdure.']},
  {id:'nx24',name:'Pasta al Pesto di Pistacchi',ico:'🍝',tags:['pranzo','massa'],time:'20 min',kcal:520,p:28,c:58,g:16,diff:'Facile',alimenti:['pasta integrale','pistacchi','ricotta','basilico','limone','parmigiano'],desc:'Il pesto di pistacchi e ricco di grassi buoni. La ricotta aggiunge cremosita.',ingredienti:['90g pasta integrale','Pesto: 40g pistacchi, 30g basilico, 2 cucchiai olio EVO, 20g parmigiano, limone','2 cucchiai ricotta magra','Acqua di cottura'],steps:['Frulla pistacchi, basilico, olio, parmigiano e limone a pesto grossolano.','Cuoci pasta al dente. Tieni acqua di cottura.','Mescola pesto con ricotta e acqua di cottura per cremosita.','Condisci la pasta calda.','Guarnisci con pistacchi tritati.']},
  {id:'nx25',name:'Riso al Salto con Verdure e Uova',ico:'🍳',tags:['cena','pranzo','definizione','rapido'],time:'15 min',kcal:380,p:22,c:48,g:10,diff:'Facile',alimenti:['riso','uova','piselli','carote','salsa di soia','zenzero','aglio'],desc:'Il modo migliore per riutilizzare il riso avanzato. Riso freddo di frigo ideale.',ingredienti:['150g riso cotto freddo di frigo','2 uova','50g piselli','1 carota a cubetti','2 cucchiai salsa di soia','Zenzero e aglio','Olio di sesamo'],steps:['Wok a fuoco alto con olio di sesamo.','Aglio e zenzero 30 sec. Carote 2 min.','Spingi sui bordi, strapazza le uova al centro.','Aggiungi riso e piselli. Mescola con salsa di soia.','Cuoci 3-4 min a fuoco alto.']},
  {id:'nx26',name:'Insalata Nizzarda Fit',ico:'🥗',tags:['pranzo','definizione'],time:'15 min',kcal:340,p:30,c:18,g:14,diff:'Facile',alimenti:['tonno','uova','fagiolini','pomodori','olive','lattuga','limone'],desc:'La salade nicoise e gia bilanciata. Versione fit con tonno al naturale.',ingredienti:['120g tonno al naturale','2 uova sode','80g fagiolini cotti','100g pomodorini','30g olive nere','2 manciate lattuga romana','Olio EVO, limone, senape, sale'],steps:['Cuoci le uova sode 9 min. Raffredda e sbucciale.','Cuoci fagiolini 5 min, raffredda in acqua ghiacciata.','Disponi lattuga come base.','Aggiungi ingredienti in sezioni separate.','Emulsiona olio, limone e senape. Condisci al momento.']},
  {id:'nx27',name:'Poke Bowl al Tonno Fresco',ico:'🍱',tags:['pranzo','cena','definizione','massa'],time:'15 min',kcal:480,p:38,c:42,g:12,diff:'Facile',alimenti:['tonno fresco','riso','avocado','edamame','cetriolo','salsa di soia','sesamo'],desc:'Il poke autentico hawaiano. Usa tonno sushi-grade freschissimo.',ingredienti:['150g tonno fresco a cubetti','120g riso cotto','1/2 avocado','50g edamame cotti','1/2 cetriolo','Salsa: salsa di soia, olio sesamo, miele, lime','Sesamo e cipollotto'],steps:['Marina il tonno nella salsa 10 min.','Cuoci riso e lascia intiepidire.','Bowl: riso come base.','Disponi tonno, avocado, edamame e cetriolo in sezioni.','Versa la marinata. Guarnisci con sesamo.']},
  {id:'nx28',name:'Prep Settimanale Pollo e Riso',ico:'📦',tags:['meal-prep','massa'],time:'45 min',kcal:430,p:42,c:44,g:8,diff:'Facile',alimenti:['pollo','riso','broccoli','carote','olio EVO','aglio','limone'],desc:'4 contenitori pronti per la settimana. 45 minuti totali.',ingredienti:['600g petti di pollo','300g riso basmati secco','400g broccoli','200g carote','Marinata: olio, aglio, paprika, curcuma, limone, sale','4 contenitori ermetici 1L'],steps:['Preriscalda forno a 200°C.','Marina pollo con olio, aglio, paprika, curcuma e limone.','Cuoci il riso 17 min.','Pollo, broccoli e carote in teglia. Cuoci 25 min.','Dividi equamente in 4 contenitori. Conserva in frigo 4 giorni.']},
  {id:'nx29',name:'Prep Bowl Legumi Misti',ico:'📦',tags:['meal-prep','veg','definizione'],time:'40 min',kcal:360,p:20,c:52,g:7,diff:'Facile',alimenti:['ceci','lenticchie','fagioli','quinoa','zucchine','peperoni'],desc:'Prep vegano per 4 giorni. I legumi misti danno tutti gli amminoacidi.',ingredienti:['200g ceci cotti','200g lenticchie verdi cotte','200g fagioli cannellini cotti','200g quinoa cotta','Verdure arrostite: zucchine, peperoni, melanzane','Olio EVO, limone, cumino, paprika affumicata'],steps:['Arrostisc le verdure a 200°C per 20 min.','Cuoci la quinoa 15 min.','Mescola tutti i legumi con spezie.','Assembla: quinoa + legumi + verdure in 4 container.','Conserva in frigo 4 giorni.']},
  {id:'nx30',name:'Banana Bread Proteico',ico:'🍌',tags:['colazione','pre-workout','massa'],time:'45 min',kcal:280,p:18,c:34,g:6,diff:'Media',alimenti:['banana','uova','farina di avena','whey vaniglia','burro di arachidi','miele'],desc:'Preparane una pagnotta intera: 8-10 fette per tutta la settimana.',ingredienti:['3 banane molto mature','3 uova','100g farina avena frullata','40g whey vaniglia','60g burro di arachidi','2 cucchiai miele','Lievito, cannella, vaniglia'],steps:['Preriscalda forno a 175°C.','Schiacciate le banane. Aggiungete uova e burro di arachidi.','Unite farina, whey, lievito e spezie.','Versa in stampo da plumcake foderato.','Cuoci 40-45 min. Verifica con stuzzicadenti.']},
  {id:'nx31',name:'Waffle Proteici',ico:'🧇',tags:['colazione','massa','pre-workout'],time:'15 min',kcal:420,p:34,c:38,g:12,diff:'Facile',alimenti:['uova','ricotta','farina di avena','whey','latte','miele','frutti di bosco'],desc:'Croccanti fuori, morbidi dentro. Servono la piastra per waffle.',ingredienti:['2 uova','100g ricotta magra','50g farina avena frullata','20g whey vaniglia','50ml latte scremato','1 cucchiaino lievito','Vaniglia','Frutti di bosco e miele per servire'],steps:['Scalda la piastra per waffle.','Frulla tutti gli ingredienti a pastella omogenea.','Versa nelle piastre. Cuoci 4-5 min.','Servi immediatamente con frutti di bosco e miele.']},
  {id:'nx32',name:'Zuppa Toscana di Fagioli',ico:'🥣',tags:['cena','veg','meal-prep','definizione'],time:'30 min',kcal:330,p:18,c:48,g:6,diff:'Facile',alimenti:['fagioli','rosmarino','aglio','salvia','pomodori','spinaci'],desc:'La ribollita fit senza pane per mantenere i carbs controllati.',ingredienti:['400g fagioli cannellini cotti','200g pomodori pelati','100g spinaci freschi','2 spicchi aglio','Rosmarino e salvia','1 cipolla','Brodo vegetale 400ml','Olio EVO'],steps:['Soffriggi cipolla, aglio, rosmarino e salvia 4 min.','Aggiungi pomodori 5 min.','Unisci fagioli e brodo. Cuoci 15 min.','Preleva 1/3 dei fagioli, frullali e rimetti.','Aggiungi spinaci 2 min. Olio EVO a crudo.']},
  {id:'nx33',name:'Minestrone Proteico con Quinoa',ico:'🥣',tags:['cena','veg','meal-prep'],time:'35 min',kcal:310,p:16,c:46,g:5,diff:'Facile',alimenti:['quinoa','zucchine','carote','sedano','cipolla','pomodori','fagioli'],desc:'Minestrone con quinoa al posto della pasta per profilo amminoacidico completo.',ingredienti:['80g quinoa secca','400g verdure miste: zucchine, carote, sedano, cipolla','200g fagioli borlotti cotti','300g pomodori pelati','Brodo vegetale 500ml','Basilico e prezzemolo','Olio EVO'],steps:['Taglia le verdure a cubetti.','Soffriggi cipolla e sedano 4 min.','Aggiungi carote, zucchine, pomodori e brodo. Porta a bollore.','Aggiungi quinoa e fagioli. Cuoci 15 min.','Regola di sale. Servi con basilico.']},
  {id:'nx34',name:'Bowl Tahini e Verdure Arrostite',ico:'🫙',tags:['cena','veg','definizione'],time:'30 min',kcal:380,p:14,c:38,g:18,diff:'Facile',alimenti:['tahini','ceci','zucchine','peperoni','limone','aglio'],desc:'La salsa al tahini e il condimento piu nutriente del Medio Oriente.',ingredienti:['Verdure: melanzana, zucchine, peperone','100g ceci cotti','80g quinoa o riso cotto','Salsa: 3 cucchiai tahini, succo di 1 limone, 1 spicchio aglio, acqua, sale'],steps:['Verdure con olio e paprika. Arrostisc a 200°C per 22 min.','Arrostisc ceci con cumino gli ultimi 10 min.','Prepara salsa: tahini + limone + aglio + acqua.','Assembla: quinoa, verdure, ceci.','Versa salsa tahini abbondante sopra.']},
  {id:'nx35',name:'Cheesecake Proteica senza Cottura',ico:'🍰',tags:['spuntino','definizione'],time:'15 min',kcal:220,p:18,c:20,g:6,diff:'Facile',alimenti:['yogurt greco','ricotta','miele','frutti di bosco','limone'],desc:'Nessuna cottura ne gelatina. Consistenza reale di cheesecake.',ingredienti:['Base: 60g biscotti avena tritati + 15g burro fuso','Crema: 200g ricotta magra + 100g yogurt greco + 2 cucchiai miele + scorza limone','Topping: frutti di bosco misti'],steps:['Mescola biscotti con burro fuso. Pressa in 4 bicchieri.','Frulla ricotta, yogurt, miele e scorza limone.','Versa crema sopra la base.','Frigo minimo 2 ore.','Aggiungi frutti di bosco prima di servire.']},
  {id:'nx36',name:'Gelato Proteico alla Banana',ico:'🍦',tags:['spuntino','definizione'],time:'5 min',kcal:180,p:14,c:28,g:2,diff:'Facilissimo',alimenti:['banana','yogurt greco','whey vaniglia','latte'],desc:'Texture di vero gelato grazie alle banane congelate. Zero sensi di colpa.',ingredienti:['2 banane congelate a pezzi','100g yogurt greco 0%','20g whey vaniglia','30ml latte scremato se necessario'],steps:['Metti banane, yogurt e whey nel frullatore.','Frulla 60 sec a potenza massima.','Consuma immediatamente per soft-serve.','Per gelato duro: congelatore 1 ora e frulli di nuovo.']},
  {id:'nx37',name:'Shakshuka Fit',ico:'🍳',tags:['colazione','cena','definizione'],time:'25 min',kcal:290,p:22,c:20,g:10,diff:'Facile',alimenti:['uova','pomodori','peperoni','cipolla','cumino','paprika','feta'],desc:'Colazione mediorientale ad alto contenuto proteico.',ingredienti:['4 uova','400g pomodori pelati','1 peperone rosso','1 cipolla','2 spicchi aglio','Cumino 1 cucchiaino','Paprika affumicata','30g feta sbriciolata','Prezzemolo'],steps:['Soffriggi cipolla, aglio e peperone 5 min.','Aggiungi cumino e paprika. Tosta 1 min.','Aggiungi pomodori, sale. Cuoci 10 min.','Crea fossette, rompi un uovo per fossetta.','Copri e cuoci 5-8 min. Aggiungi feta e prezzemolo.']},
  {id:'nx38',name:'Burrito Bowl Messicano Fit',ico:'🌮',tags:['pranzo','cena','massa'],time:'25 min',kcal:520,p:40,c:52,g:12,diff:'Facile',alimenti:['manzo','fagioli neri','riso','mais','peperoni','avocado','limone'],desc:'Bowl messicana senza tortilla. Tutti i sapori, meno i carboidrati raffinati.',ingredienti:['150g manzo macinato magro','100g fagioli neri','100g riso integrale cotto','50g mais','1/2 peperone','1/4 avocado','Cumino, paprika, coriandolo','Yogurt greco come sour cream'],steps:['Rosola il macinato con cumino e paprika 6 min.','Aggiungi fagioli e mais. Cuoci 3 min.','Assembla la bowl: riso, macinato, avocado, salsa lime.','Guarnisci con yogurt greco e coriandolo.']},
  {id:'nx39',name:'Insalata Greca con Pollo',ico:'🥗',tags:['pranzo','definizione'],time:'15 min',kcal:360,p:36,c:12,g:16,diff:'Facile',alimenti:['pollo','feta','olive','cetriolo','pomodori','cipolla rossa','origano','limone'],desc:'Sazia grazie alla combinazione di proteine, grassi e fibre.',ingredienti:['150g pollo grigliato','80g feta','40g olive kalamata','1 cetriolo','150g pomodori','1/4 cipolla rossa','Origano','Olio EVO + limone + sale'],steps:['Taglia le verdure a pezzi generosi.','Disponi in ciotola capiente.','Aggiungi feta a cubetti e olive.','Aggiungi pollo a straccetti.','Condisci con olio, limone, origano e sale.']},
  {id:'nx40',name:'Bistecca di Tonno alla Siciliana',ico:'🐟',tags:['cena','definizione','pranzo'],time:'15 min',kcal:320,p:44,c:8,g:12,diff:'Facile',alimenti:['tonno fresco','olive','capperi','pomodori','aglio','prezzemolo','limone'],desc:'La bistecca di tonno si cuoce come quella di manzo. Max due minuti per lato.',ingredienti:['200g trancio di tonno fresco','60g olive verdi denocciolate','1 cucchiaio capperi','100g pomodorini','2 spicchi aglio','Prezzemolo','Limone','Olio EVO'],steps:['Scalda padella a fuoco alto. Asciuga il tonno.','Cuoci 2 min per lato. Deve restare rosa al centro.','Togli tonno. Cuoci aglio 30 sec nella stessa padella.','Aggiungi pomodorini, olive, capperi. Cuoci 3 min.','Servi con sughetto, prezzemolo e limone.']},
  {id:'nx41',name:'Zuppa Satiante di Verdure',ico:'🥦',tags:['cena','definizione','veg'],time:'30 min',kcal:200,p:12,c:28,g:4,diff:'Facile',alimenti:['broccoli','cavolfiore','zucchine','carote','cipolla','ceci','curcuma'],desc:'Alto volume, basse calorie. Un litro di zuppa per meno di 200 kcal.',ingredienti:['200g broccoli','200g cavolfiore','1 zucchina','2 carote','1 cipolla','100g ceci','Curcuma, zenzero','Brodo vegetale 800ml','Olio EVO'],steps:['Taglia tutte le verdure.','Soffriggi cipolla in olio 3 min. Aggiungi curcuma e zenzero 1 min.','Unisci verdure e brodo. Porta a bollore.','Cuoci 18-20 min. Frulla meta per cremosita.','Aggiungi ceci. Aggiusta di sale.']},
  {id:'nx42',name:'Insalata di Cavolfiore Arrostito',ico:'🥦',tags:['cena','definizione','veg'],time:'30 min',kcal:250,p:14,c:22,g:10,diff:'Facile',alimenti:['cavolfiore','ceci','tahini','limone','prezzemolo','pinoli'],desc:'Il cavolfiore arrostito diventa dolce e cremoso. Completamente diverso da bollito.',ingredienti:['400g cavolfiore a cimette','100g ceci cotti','2 cucchiai tahini','Succo di 1 limone','Prezzemolo abbondante','20g pinoli tostati','Cumino, paprika','Olio EVO'],steps:['Cavolfiore con olio, cumino e paprika. Arrostisc 220°C per 20 min.','Arrostisc ceci nella stessa teglia gli ultimi 10 min.','Prepara salsa: tahini + limone + acqua + sale.','Mescola cavolfiore, ceci, prezzemolo e pinoli.','Versa salsa tahini e servi tiepido.']},
  {id:'nx43',name:'Salmone con Crosta di Sesamo',ico:'🐟',tags:['cena','definizione','massa'],time:'20 min',kcal:430,p:40,c:8,g:24,diff:'Facile',alimenti:['salmone','sesamo','salsa di soia','zenzero','aglio','miele'],desc:'La crosta di sesamo protegge il salmone e aggiunge croccantezza.',ingredienti:['200g filetto di salmone','3 cucchiai sesamo misto bianco e nero','Glassa: 2 cucchiai salsa di soia, 1 cucchiaino miele, zenzero grattugiato, aglio','Olio di sesamo'],steps:['Prepara la glassa mescolando soia, miele, zenzero e aglio.','Spennella il salmone con la glassa.','Pressa il sesamo su tutta la superficie del filetto.','Cuoci in padella con olio sesamo 3-4 min per lato.','Servi con verdure saltate o riso.']},
  {id:'nx44',name:'Pollo in Salsa di Miso',ico:'🍱',tags:['cena','pranzo','definizione'],time:'25 min',kcal:350,p:44,c:14,g:10,diff:'Facile',alimenti:['pollo','miso','miele','zenzero','aglio','salsa di soia'],desc:'Il miso e un probiotico naturale che migliora la digestione e aggiunge umami profondo.',ingredienti:['200g petto di pollo','2 cucchiai miso bianco','1 cucchiaio miele','1 cucchiaio salsa di soia','Zenzero grattugiato','Aglio in polvere','Olio di sesamo'],steps:['Mescola miso, miele, salsa di soia, zenzero e aglio.','Marina il pollo 20 min (meglio 1h in frigo).','Cuoci in padella con olio sesamo 5-6 min per lato.','Aggiungi la marinata rimanente e caramella 1 min.','Fai riposare 3 min prima di tagliare.']},
  // ── BATCH 3: 60 nuove ricette ─────────────────────────
  // ── COLAZIONE AVANZATA ──
  {id:'ny1',name:'Overnight Oats Proteici al Cacao',ico:'🌑',tags:['colazione','massa','meal-prep'],time:'5 min',kcal:440,p:32,c:52,g:10,diff:'Facilissimo',alimenti:['avena','yogurt greco','latte','cacao amaro','whey','banana'],desc:'Preparali la sera: 5 giorni di colazioni pronte in frigo. Mai più "non ho tempo".',ingredienti:['80g fiocchi avena','150g yogurt greco 0%','100ml latte scremato','1 cucchiaio cacao amaro','20g whey cioccolato','1/2 banana a fette','1 cucchiaio miele','Granola per topping'],steps:['Mescola avena, yogurt, latte, cacao e whey in un barattolo.','Copri e metti in frigo tutta la notte.','Al mattino mescola, aggiungi banana e miele.','Top con granola per la croccantezza. Pronto in 30 secondi.']},
  {id:'ny2',name:'Muffin Proteici Avena e Mirtilli',ico:'🫐',tags:['colazione','spuntino','massa'],time:'30 min',kcal:160,p:10,c:18,g:4,diff:'Facile',alimenti:['avena','uova','yogurt greco','mirtilli','miele','albumi'],desc:'12 muffin in 30 minuti. Colazione della settimana intiera in una volta.',ingredienti:['150g farina avena frullata','2 uova + 2 albumi','100g yogurt greco','3 cucchiai miele','150g mirtilli freschi o congelati','1 cucchiaino lievito','Cannella','Vaniglia','Buccia di limone'],steps:['Preriscalda forno 175°C. Fodera 12 pirottini.','Mescola farina, lievito e cannella.','In altro bowl: uova, yogurt, miele e vaniglia.','Unisci secchi e umidi. Aggiungi mirtilli mescolando delicatamente.','Dividi nei pirottini. Cuoci 20-22 min. Uno stuzzicadenti pulito = pronti.']},
  {id:'ny3',name:'French Toast Proteico',ico:'🍞',tags:['colazione','massa'],time:'12 min',kcal:390,p:28,c:38,g:10,diff:'Facile',alimenti:['pane integrale','uova','albumi','latte','cannella','frutti di bosco','miele'],desc:'Il brunch del weekend che soddisfa sia i macro che il palato.',ingredienti:['3 fette pane integrale spesso','2 uova + 2 albumi','60ml latte scremato','Cannella abbondante','Vaniglia','Frutti di bosco','1 cucchiaino miele'],steps:['Sbatti uova, albumi, latte, cannella e vaniglia.','Immergi ogni fetta di pane nel composto 30 secondi per lato.','Cuoci in padella antiaderente a fuoco medio 2-3 min per lato.','Servi con frutti di bosco freschi e un filo di miele.']},
  {id:'ny4',name:'Porridge Salato con Uovo Pochée',ico:'🥣',tags:['colazione','definizione'],time:'12 min',kcal:310,p:22,c:36,g:8,diff:'Media',alimenti:['avena','uova','brodo vegetale','parmigiano','erba cipollina'],desc:'Il porridge dolce stanca. Questa versione salata con uovo è il cambio di paradigma.',ingredienti:['70g fiocchi avena grandi','250ml brodo vegetale caldo','1 uovo pochée','20g parmigiano grattugiato','Erba cipollina fresca','Pepe nero abbondante','Olio EVO a crudo'],steps:['Cuoci i fiocchi nel brodo caldo 5 min mescolando.','Nel frattempo prepara l\'uovo pochée (acqua bollente + aceto, 3 min).','Incorpora parmigiano nel porridge. Versa in una bowl.','Posa l\'uovo al centro. Erba cipollina, pepe e olio. Rompi il tuorlo servendo.']},
  {id:'ny5',name:'Acai Bowl Proteica',ico:'🫐',tags:['colazione','spuntino','definizione'],time:'8 min',kcal:350,p:22,c:44,g:8,diff:'Facile',alimenti:['yogurt greco','acai','frutti di bosco','banana','granola','semi di chia','cocco'],desc:'Instagram-worthy ma anche efficace. La base allo yogurt triplica le proteine vs quella al succo.',ingredienti:['150g yogurt greco 0%','100g mix frutti di bosco congelati','1 cucchiaio polvere di acai','1/2 banana congelata','30g granola','Frutti freschi per topping','Semi di chia, cocco rapé'],steps:['Frulla yogurt, frutti di bosco, acai e banana congelata a crema densa.','Se troppo liquido: aggiungi ghiaccio. Se troppo denso: un cucchiaio di latte.','Versa in bowl fredda.','Decora con granola, frutti freschi, chia e cocco in file ordinate.']},
  // ── PRANZI VELOCI ──
  {id:'ny6',name:'Wraps di Lattuga con Pollo Thai',ico:'🥬',tags:['pranzo','definizione','rapido'],time:'15 min',kcal:280,p:32,c:12,g:10,diff:'Facile',alimenti:['pollo macinato','lattuga','carote','cetriolo','arachidi','limone','salsa di soia'],desc:'Zero carb artificiali: la lattuga sostituisce la tortilla. Fresco e croccante.',ingredienti:['200g pollo macinato','8 foglie lattuga iceberg grandi','1 carota julienne','1/2 cetriolo julienne','30g arachidi tostate tritate','Salsa: 2 cucchiai salsa di soia + succo lime + zenzero + aglio + peperoncino','Coriandolo fresco'],steps:['Rosola il pollo macinato con aglio e zenzero 6 min.','Aggiungi la salsa, cuoci 2 min finché caramellata.','Disponi le foglie di lattuga su un piatto.','Riempi ogni foglia con pollo, carote, cetriolo.','Aggiungi arachidi e coriandolo. Mangia con le mani.']},
  {id:'ny7',name:'Insalata di Farro e Tonno',ico:'🥗',tags:['pranzo','massa','meal-prep'],time:'20 min',kcal:460,p:34,c:52,g:10,diff:'Facile',alimenti:['farro','tonno','pomodori','olive','rucola','limone','capperi'],desc:'Il farro ha un indice glicemico più basso del riso e più proteine della pasta.',ingredienti:['90g farro perlato secco','150g tonno al naturale','100g pomodorini','30g olive nere','40g rucola','1 cucchiaio capperi','Olio EVO + limone + sale'],steps:['Cuoci il farro in acqua salata 25 min. Scola e raffredda.','Scola il tonno e sminuzzalo con una forchetta.','Mescola farro, tonno, pomodorini, olive, capperi e rucola.','Condisci con olio, limone e sale. Regola di pepe.','Ottimo anche freddo: perfetto per il pranzo in ufficio.']},
  {id:'ny8',name:'Zuppa Fredda di Avocado e Gamberi',ico:'🥑',tags:['pranzo','cena','definizione'],time:'10 min',kcal:320,p:28,c:12,g:16,diff:'Facile',alimenti:['avocado','gamberoni','cetriolo','yogurt greco','limone','aglio','erba cipollina'],desc:'Gazpacho proteico per l\'estate. Servita fredda, pronta in 10 minuti.',ingredienti:['2 avocado maturi','150g gamberoni cotti sgusciati','1/2 cetriolo','100g yogurt greco','Succo di 1 limone','1 spicchio aglio','Erba cipollina','Sale, pepe','Paprika affumicata per guarnire'],steps:['Frulla avocado, yogurt, cetriolo, aglio e limone fino a crema liscia.','Regola di sale e aggiungi un po\' d\'acqua se troppo denso.','Versa in 2 ciotole. Disponi i gamberoni sopra.','Erba cipollina, paprika e un filo d\'olio. Servi subito o raffredda 20 min.']},
  {id:'ny9',name:'Riso Venere con Salmone e Avocado',ico:'🍱',tags:['pranzo','cena','definizione'],time:'30 min',kcal:500,p:36,c:42,g:18,diff:'Facile',alimenti:['riso venere','salmone','avocado','edamame','sesamo','salsa di soia'],desc:'Il riso venere ha il doppio delle proteine del riso bianco e antiossidanti naturali.',ingredienti:['80g riso venere secco','150g salmone cotto (al vapore o grigliato)','1/2 avocado','50g edamame cotti','Sesamo tostato','Salsa: salsa di soia + olio sesamo + lime','Zenzero grattugiato'],steps:['Cuoci il riso venere (30 min in acqua salata).','Cuoci il salmone in padella con olio sesamo 3 min per lato.','Prepara la salsa mescolando soia, olio sesamo, lime e zenzero.','Assembla: riso venere + salmone a pezzi + avocado + edamame.','Versa la salsa e aggiungi sesamo.']},
  {id:'ny10',name:'Sandwich Proteico con Tacchino e Hummus',ico:'🥪',tags:['pranzo','definizione','rapido'],time:'5 min',kcal:340,p:34,c:26,g:10,diff:'Facilissimo',alimenti:['tacchino affettato','pane integrale','hummus','spinaci','pomodori','cetriolo'],desc:'Il sandwich che non sembra da palestra ma è da palestra. Rapido come un bar.',ingredienti:['2 fette pane integrale','120g tacchino affettato magro','3 cucchiai hummus','Manciata spinaci baby','2 fette pomodoro','Fettine di cetriolo','Sale, pepe, origano'],steps:['Toasta il pane (opzionale ma miglior texture).','Spalma hummus abbondante su entrambe le fette.','Disponi tacchino, spinaci, pomodoro e cetriolo.','Chiudi, taglia in diagonale. Avvolgi in carta se porti fuori.']},
  // ── CENE AVANZATE ──
  {id:'ny11',name:'Spiedini di Pollo al Limone',ico:'🍢',tags:['cena','definizione','pre-workout'],time:'25 min',kcal:340,p:44,c:6,g:14,diff:'Facile',alimenti:['pollo','limone','rosmarino','aglio','olio EVO','peperoni'],desc:'Grigliati in padella o al BBQ. La marinatura al limone tenera la carne.',ingredienti:['250g petto di pollo a cubetti 3cm','2 peperoni di colori diversi','Marinata: succo 2 limoni + scorza + 3 cucchiai olio EVO + 2 spicchi aglio + rosmarino + sale','Stecchi da spiedino (bagnati in acqua 20 min)'],steps:['Marina il pollo nella marinata per minimo 30 min (meglio 2h).','Alterna pollo e peperoni sugli stecchi.','Griglia in padella a fuoco alto 4-5 min per lato.','Griglia a bbq: fuoco diretto 3-4 min per lato girando.','Servi con tzatziki o hummus.']},
  {id:'ny12',name:'Hamburger di Merluzzo',ico:'🐟',tags:['cena','definizione'],time:'20 min',kcal:310,p:38,c:18,g:8,diff:'Facile',alimenti:['merluzzo','uova','pangrattato','aglio','prezzemolo','limone'],desc:'Fish burger senza friggere. Croccante in padella con metà dei grassi.',ingredienti:['300g filetto di merluzzo tritato','1 uovo','2 cucchiai pangrattato integrale','Aglio in polvere','Prezzemolo tritato abbondante','Scorza di limone','Sale, pepe'],steps:['Trita il merluzzo grossolanamente (non a pasta, ci vogliono pezzi).','Mescola con uovo, pangrattato, aglio, prezzemolo e scorza limone.','Forma 3 burger. Metti in frigo 10 min per compattare.','Cuoci in padella antiaderente con un filo d\'olio 4 min per lato.','Servi su insalata o con patate dolci al forno.']},
  {id:'ny13',name:'Pollo in Crosta di Panko e Parmigiano',ico:'🍗',tags:['cena','massa'],time:'30 min',kcal:420,p:48,c:16,g:14,diff:'Facile',alimenti:['pollo','pangrattato','parmigiano','uova','aglio','rosmarino'],desc:'La versione fit del pollo impanato. Forno invece di padella: stessa croccantezza.',ingredienti:['2 petti di pollo (200g cad.)','Impanatura: pangrattato integrale + parmigiano grattugiato + aglio polvere + rosmarino + sale + pepe','2 uova sbattute','Olio spray o 1 cucchiaino olio EVO'],steps:['Preriscalda forno a 210°C con griglia alta.','Appiattisci i petti tra due fogli di pellicola (più sottile = più croccante).','Passa nel mix di impanatura premendo per far aderire.','Disponi su griglia forata. Spruzza con olio spray.','Cuoci 18-20 min girando a metà. Ultimi 2 min grill per dorare.']},
  {id:'ny14',name:'Agnello con Chimichurri Verde',ico:'🥩',tags:['cena','massa'],time:'20 min',kcal:480,p:40,c:4,g:32,diff:'Facile',alimenti:['costolette di agnello','prezzemolo','aglio','limone','olio EVO','peperoncino','origano'],desc:'Il chimichurri argentino copre qualsiasi carne. Con l\'agnello è un matrimonio perfetto.',ingredienti:['4 costolette di agnello','Chimichurri: 50g prezzemolo + 3 spicchi aglio + 60ml olio EVO + 2 cucchiai aceto rosso + peperoncino + origano + sale'],steps:['Frulla tutti gli ingredienti del chimichurri. Metti metà da parte per servire.','Massaggia le costolette con l\'altra metà del chimichurri.','Griglia a fuoco altissimo 3 min per lato (cottura media).','Fai riposare 3 min coperte con stagnola.','Servi con chimichurri fresco sopra.']},
  {id:'ny15',name:'Pasta all\'Amatriciana Fit',ico:'🍝',tags:['cena','pranzo','massa'],time:'25 min',kcal:490,p:28,c:56,g:14,diff:'Facile',alimenti:['pasta integrale','guanciale','pomodori','pecorino','peperoncino'],desc:'L\'originale ma con pasta integrale e guanciale controllato. I macro reggono.',ingredienti:['90g pasta integrale spaghetti','60g guanciale a cubetti','200g pomodori pelati San Marzano','20g pecorino romano grattugiato','Peperoncino fresco o secco','Vino bianco (opzionale)','Sale, pepe nero abbondante'],steps:['Rosola il guanciale in padella a fuoco medio senza olio finché croccante.','Aggiungi peperoncino. Sfuma con vino bianco (opzionale).','Aggiungi pomodori e schiaccia. Cuoci 12 min.','Cuoci pasta al dente. Tieni l\'acqua di cottura.','Manteca pasta nel sugo con acqua di cottura. Pecorino abbondante fuori fuoco.']},
  {id:'ny16',name:'Costine di Maiale al Miele e Soia',ico:'🍖',tags:['cena','massa'],time:'90 min',kcal:540,p:42,c:20,g:28,diff:'Media',alimenti:['costine di maiale','miele','salsa di soia','aglio','zenzero','aceto di mele'],desc:'Slow roasted: 80 min in forno + 10 min grill. Carne che si stacca dall\'osso.',ingredienti:['600g costine di maiale','Glassa: 3 cucchiai miele + 3 cucchiai salsa di soia + 2 spicchi aglio + zenzero grattugiato + 1 cucchiaio aceto mele + paprika affumicata'],steps:['Preriscalda forno a 160°C.','Rimuovi la membrana dal retro delle costine.','Massaggia con metà glassa. Avvolgi in stagnola doppia.','Cuoci 80 min a 160°C (rimangono morbidissime).','Apri la stagnola, spennella con glassa rimanente. Grill 200°C per 10 min finché caramellate.']},
  // ── VEGETARIANO/VEGANO AVANZATO ──
  {id:'ny17',name:'Curry di Tofu e Spinaci',ico:'🌿',tags:['cena','veg','definizione'],time:'25 min',kcal:340,p:22,c:24,g:14,diff:'Facile',alimenti:['tofu','spinaci','latte di cocco','cipolla','aglio','zenzero','curry','curcuma'],desc:'Il tofu impara ad assorbire i sapori: cucinalo così e non ti deluderà più.',ingredienti:['300g tofu extra-firm a cubetti','200g spinaci freschi','200ml latte di cocco light','1 cipolla','3 spicchi aglio','Zenzero 2cm','Curry 2 cucchiaini','Curcuma 1 cucchiaino','Coriandolo','Olio'],steps:['Asciuga il tofu pressandolo con carta da cucina 10 min. Fondamentale.','Rosola il tofu in padella senza olio 5 min per lato finché dorato. Metti da parte.','Soffriggi cipolla, aglio e zenzero 4 min.','Aggiungi spezie 1 min, poi latte di cocco e spinaci.','Rimetti il tofu e cuoci 5 min. Guarnisci con coriandolo.']},
  {id:'ny18',name:'Involtini di Melanzane con Ricotta',ico:'🍆',tags:['cena','veg','definizione'],time:'35 min',kcal:280,p:18,c:14,g:14,diff:'Media',alimenti:['melanzane','ricotta','uova','basilico','parmigiano','passata di pomodoro'],desc:'Alternativa agli involtini di carne. Ricotta + uova = proteina vegetale completa.',ingredienti:['2 melanzane grandi','200g ricotta magra','1 uovo','30g parmigiano','Basilico fresco','Aglio in polvere','300g passata di pomodoro','Sale, olio EVO'],steps:['Taglia le melanzane a fette longitudinali 5mm. Sala e lascia 15 min, poi asciuga.','Griglia le fette su padella calda senza olio 2 min per lato.','Mescola ricotta, uovo, parmigiano, basilico e aglio.','Metti un cucchiaio di ripieno su ogni fetta. Arrotola e metti in teglia.','Copri con passata. Cuoci forno 180°C per 20 min.']},
  {id:'ny19',name:'Buddha Bowl con Falafel e Tahini',ico:'🥙',tags:['pranzo','cena','veg'],time:'30 min',kcal:520,p:22,c:60,g:16,diff:'Media',alimenti:['ceci','quinoa','avocado','cetriolo','pomodorini','tahini','limone','cumino'],desc:'La bowl completa: proteine vegetali + carbs complessi + grassi buoni.',ingredienti:['100g quinoa cotta','Falafel: 150g ceci + cipolla + prezzemolo + cumino + farina di ceci','1/2 avocado','50g pomodorini','1/2 cetriolo','Salsa tahini: 3 cucchiai tahini + limone + aglio + acqua','Paprika e sesamo'],steps:['Falafel al forno 200°C per 18 min (vedi ricetta nx13 per dettagli).','Cuoci quinoa.','Prepara salsa tahini con limone, aglio e acqua fino a cremosità colabile.','Assembla la bowl: quinoa + falafel + avocado + verdure.','Versa salsa tahini abbondante. Paprika e sesamo.']},
  {id:'ny20',name:'Zucchine Ripiene di Quinoa e Feta',ico:'🫑',tags:['cena','veg','definizione'],time:'35 min',kcal:300,p:16,c:28,g:12,diff:'Facile',alimenti:['zucchine','quinoa','feta','pomodorini','cipolla','origano'],desc:'Piatto estivo completo. Le zucchine diventano il "contenitore" edibile.',ingredienti:['3 zucchine grandi','100g quinoa cotta','80g feta sbriciolata','80g pomodorini a metà','1/4 cipolla rossa tritata','Origano secco e basilico','Olio EVO','Sale'],steps:['Taglia le zucchine a metà nel senso della lunghezza. Svuota la polpa con cucchiaio.','Trita la polpa grossolanamente.','Mescola quinoa, feta, pomodorini, cipolla, polpa di zucchina e origano.','Riempi le barchette di zucchina con il mix.','Cuoci in forno a 190°C per 22-25 min finché dorate.']},
  {id:'ny21',name:'Crocchette di Lenticchie e Curcuma',ico:'🟡',tags:['cena','veg','meal-prep'],time:'30 min',kcal:320,p:18,c:40,g:8,diff:'Facile',alimenti:['lenticchie rosse','curcuma','cumino','cipolla','aglio','farina di ceci','limone'],desc:'Vegane, senza glutine. Si congelano crude: bake direttamente dal freezer.',ingredienti:['200g lenticchie rosse cotte e scolate','1/4 cipolla tritata','2 spicchi aglio','Curcuma 1 cucchiaino','Cumino 1 cucchiaino','4 cucchiai farina di ceci','Succo di limone','Sale, pepe','Prezzemolo'],steps:['Frulla le lenticchie con cipolla e aglio grossolanamente (non a crema).','Aggiungi spezie, farina, limone e prezzemolo.','Forma crocchette da 40g. Se troppo morbide: aggiungi farina.','Forno 200°C per 18-20 min, girando a metà. O padella con olio 3 min per lato.','Servi con hummus o yogurt greco condito.']},
  // ── ALTA PROTEINA ALTERNATIVA ──
  {id:'ny22',name:'Tartare di Salmone con Avocado',ico:'🐟',tags:['cena','definizione'],time:'15 min',kcal:380,p:32,c:8,g:22,diff:'Facile',alimenti:['salmone fresco','avocado','scalogno','salsa di soia','sesamo','limone','zenzero'],desc:'Usa salmone sushi-grade. Il coltello ben affilato fa tutto il lavoro.',ingredienti:['200g salmone freschissimo sushi-grade','1/2 avocado a cubetti','1 scalogno piccolo tritato','1 cucchiaio salsa di soia','1 cucchiaino olio di sesamo','Zenzero grattugiato','Succo di lime','Sesamo nero e erba cipollina'],steps:['Taglia il salmone a cubetti 1cm con coltello affilato freddo (non tritare).','Mescola delicatamente con scalogno, salsa di soia, olio sesamo, zenzero e lime.','Dividi in 2 ciotole. Aggiungi l\'avocado sopra (non mescolare per non ossidare).','Guarnisci con sesamo e erba cipollina. Servi subito.']},
  {id:'ny23',name:'Polpo alla Griglia con Patate',ico:'🐙',tags:['cena','definizione'],time:'60 min',kcal:380,p:38,c:30,g:8,diff:'Avanzata',alimenti:['polpo','patate','limone','prezzemolo','aglio','olio EVO'],desc:'Il polpo è una delle proteine più magre del mare. La bollitura + griglia è la tecnica corretta.',ingredienti:['400g polpo pulito','200g patate piccole','Condimento: olio EVO + limone + prezzemolo + aglio + origano','Sale grosso'],steps:['Bollire il polpo: immergilo in acqua fredda salata. Porta a bollore, abbassa, cuoci 45 min.','Scola e raffredda. La bollitura lenta = tenerezza.','Cuoci le patate in acqua salata 20 min.','Griglia il polpo a fuoco alto 3-4 min per lato finché ha le strisce.','Taglia a pezzi. Condisci polpo e patate con olio, limone, prezzemolo e aglio.']},
  {id:'ny24',name:'Insalata di Polipo e Citrus',ico:'🐙',tags:['pranzo','definizione'],time:'15 min',kcal:240,p:30,c:12,g:6,diff:'Facile',alimenti:['polpo cotto','arancia','sedano','olive','prezzemolo','limone','olio EVO'],desc:'Fresca, leggera, zero grassi. Il polpo cotto precucinato rende questo piatto veloce.',ingredienti:['250g polpo cotto e raffreddato','1 arancia a spicchi','2 gambi sedano a fettine','30g olive verdi','Prezzemolo fresco','Succo di limone','Olio EVO','Sale, pepe'],steps:['Taglia il polpo a pezzi boccone.','Pela l\'arancia a vivo e taglia a spicchi.','Mescola polpo, arancia, sedano, olive e prezzemolo.','Condisci con olio, limone, sale e pepe. Mescola delicatamente.','Lascia riposare 5 min prima di servire.']},
  {id:'ny25',name:'Manzo Marinato allo Stile Coreano (Bulgogi)',ico:'🥩',tags:['cena','massa'],time:'25 min',kcal:460,p:44,c:20,g:18,diff:'Facile',alimenti:['manzo','pera asiatica','salsa di soia','aglio','zenzero','olio di sesamo','cipollotti'],desc:'La pera asiatica tenerisce la carne in modo naturale: nessun martello necessario.',ingredienti:['250g manzo (controfiletto o ribeye) a fettine sottili','Marinata: 1/2 pera asiatica frullata + 3 cucchiai salsa di soia + 1 cucchiaio zucchero di canna + sesamo + aglio + zenzero + olio sesamo','Cipollotti','Sesamo tostato','Riso bianco per servire'],steps:['Frulla la pera. Mescola tutti gli ingredienti della marinata.','Marinate il manzo 20 min minimo (meglio 2h).','Scalda wok a fuoco altissimo. Cuoci la carne in piccole porzioni, non ammassarla.','Cuoci 2-3 min per lato. Dovrebbe caramellare ai bordi.','Servi su riso con cipollotti e sesamo.']},
  // ── ZUPPE E VELLUTATE ──
  {id:'ny26',name:'Vellutata di Zucca e Lenticchie',ico:'🎃',tags:['cena','veg','meal-prep','definizione'],time:'30 min',kcal:290,p:16,c:44,g:5,diff:'Facile',alimenti:['zucca','lenticchie rosse','cipolla','aglio','curcuma','zenzero','latte di cocco'],desc:'Due superfoods in una sola zuppa. Calda e satiante, pochissime calorie.',ingredienti:['400g zucca a cubetti','150g lenticchie rosse','1 cipolla','3 spicchi aglio','Curcuma 1 cucchiaino','Zenzero fresco grattugiato','100ml latte di cocco light','Brodo vegetale 700ml','Olio EVO','Sale'],steps:['Soffriggi cipolla e aglio 4 min.','Aggiungi curcuma e zenzero 1 min.','Unisci zucca, lenticchie e brodo. Porta a bollore.','Cuoci 20 min finché tutto è morbido.','Frulla completamente. Aggiungi latte di cocco. Regola di sale.']},
  {id:'ny27',name:'Zuppa di Miso e Tofu',ico:'🍜',tags:['cena','veg','definizione','rapido'],time:'10 min',kcal:180,p:16,c:12,g:6,diff:'Facilissimo',alimenti:['miso bianco','tofu','alga nori','cipollotto','dashi','funghi shiitake'],desc:'La zuppa più veloce. Il miso non va fatto bollire o perde i probiotici.',ingredienti:['2 cucchiai miso bianco','150g tofu morbido a cubetti','1 foglio alga nori tagliata a strisce','Cipollotto affettato','3-4 funghi shiitake secchi (reidratati)','600ml brodo dashi o vegetale caldo'],steps:['Porta il brodo a 80°C (fuori bollore — il miso non va bollito).','Reidrata i funghi in acqua calda 5 min. Strizza e aggiungi al brodo.','Scioglie il miso in un po\' di brodo caldo, poi aggiungi al resto.','Aggiungi tofu, alga nori e cipollotto.','Servi immediatamente. Non far riprendere il bollore.']},
  {id:'ny28',name:'Minestra di Orzo e Funghi Porcini',ico:'🍄',tags:['cena','pranzo','veg','meal-prep'],time:'35 min',kcal:320,p:12,c:52,g:6,diff:'Facile',alimenti:['orzo perlato','funghi porcini secchi','cipolla','aglio','rosmarino','parmigiano'],desc:'L\'orzo è più proteico del riso e ricco di beta-glucani per il sistema immunitario.',ingredienti:['100g orzo perlato','30g funghi porcini secchi','1 cipolla','2 spicchi aglio','Rosmarino e timo','Brodo vegetale 800ml','20g parmigiano grattugiato','Olio EVO','Sale, pepe'],steps:['Reidrata i funghi in acqua calda 20 min. Tieni l\'acqua di ammollo (filtrata).','Soffriggi cipolla e aglio in olio 4 min.','Aggiungi i funghi strizzati, rosmarino e timo. Cuoci 3 min.','Unisci l\'orzo, il brodo e l\'acqua dei funghi filtrata. Cuoci 25 min.','Servi con parmigiano e pepe abbondante.']},
  {id:'ny29',name:'Gazpacho Proteico con Gamberi',ico:'🍅',tags:['pranzo','definizione'],time:'15 min',kcal:220,p:22,c:14,g:8,diff:'Facile',alimenti:['pomodori','gamberoni','cetriolo','peperone','aglio','limone','olio EVO'],desc:'Freddo, crudo, massima nutrizione. Il gazpacho originale con gamberi diventa un pasto completo.',ingredienti:['500g pomodori maturi','1 peperone rosso','1 cetriolo','2 spicchi aglio','2 cucchiai olio EVO','Aceto di sherry o vino rosso','150g gamberoni cotti sgusciati','Sale','Pan di segale per accompagnare (opzionale)'],steps:['Frulla pomodori, peperone, cetriolo, aglio, olio e aceto.','Passa al setaccio per una consistenza vellutata.','Regola di sale. Metti in frigo almeno 30 min.','Servi nelle ciotole con i gamberoni sopra.','Condisci con un filo d\'olio EVO a crudo.']},
  // ── POST-WORKOUT AVANZATI ──
  {id:'ny30',name:'Shake Proteico Biscotto e Burro di Arachidi',ico:'🥤',tags:['post-workout','spuntino','massa'],time:'3 min',kcal:380,p:36,c:30,g:12,diff:'Facilissimo',alimenti:['whey vaniglia','burro di arachidi','banana','latte','avena','cannella'],desc:'Il post-workout che sembra un dessert. Macro bilanciati per la crescita muscolare.',ingredienti:['30g whey vaniglia','1 cucchiaio burro di arachidi naturale','1/2 banana','200ml latte scremato','2 cucchiai avena frullata','Cannella','4-5 cubetti ghiaccio'],steps:['Metti tutti gli ingredienti nel frullatore.','Frulla 30 secondi a potenza alta.','Bevi entro 30 minuti dall\'allenamento.','Variante: aggiungi 1 cucchiaino di cacao per versione cioccolato.']},
  {id:'ny31',name:'Rice Cake con Mozzarella e Prosciutto',ico:'🍱',tags:['post-workout','spuntino','definizione','rapido'],time:'3 min',kcal:220,p:22,c:20,g:6,diff:'Facilissimo',alimenti:['gallette di riso','mozzarella light','prosciutto crudo','pomodoro','basilico'],desc:'Post-workout immediato: carbs veloci delle gallette + proteine rapide. Pronto in 3 minuti.',ingredienti:['4 gallette di riso','80g mozzarella light','60g prosciutto crudo magro','2 pomodori a fette','Basilico fresco','Olio EVO, sale'],steps:['Disponi le gallette su un piatto.','Aggiungi fette di mozzarella su ogni galletta.','Copri con prosciutto crudo a rose.','Aggiungi pomodoro e basilico.','Un filo d\'olio e sale. Mangia subito.']},
  {id:'ny32',name:'Bowl Post-Workout Ananas e Gamberoni',ico:'🍍',tags:['post-workout','cena','definizione'],time:'20 min',kcal:380,p:34,c:38,g:8,diff:'Facile',alimenti:['gamberoni','riso','ananas','peperoni','salsa di soia','lime','coriandolo'],desc:'L\'ananas accelera il recupero muscolare grazie alla bromelina. Con i gamberoni = combo perfetto.',ingredienti:['200g gamberoni','100g riso basmati cotto','100g ananas fresca a cubetti','1 peperone giallo','Salsa: 2 cucchiai salsa di soia + succo lime + zenzero','Coriandolo fresco','Olio di sesamo'],steps:['Rosola i gamberoni in olio sesamo 2 min per lato.','Aggiungi ananas e peperone. Cuoci 2 min.','Versa la salsa. Mescola e cuoci 1 min.','Servi su riso basmati.','Guarnisci con coriandolo.']},
  // ── SNACK E DOLCI FIT ──
  {id:'ny33',name:'Brownies Proteici al Cioccolato Fondente',ico:'🍫',tags:['spuntino','massa'],time:'25 min',kcal:160,p:12,c:16,g:5,diff:'Facile',alimenti:['fagioli neri','cacao amaro','uova','miele','cioccolato fondente','whey cioccolato'],desc:'Fagioli neri: l\'ingrediente segreto che dà la texture e aggiunge proteine.',ingredienti:['200g fagioli neri cotti (ben scolati)','2 uova','3 cucchiai cacao amaro','3 cucchiai miele','20g whey cioccolato','1 cucchiaino lievito','1/4 cucchiaino sale','40g cioccolato fondente 85% a pezzetti'],steps:['Preriscalda forno a 175°C. Fodera teglia 20x20cm con carta forno.','Frulla fagioli, uova, cacao, miele e whey fino a crema liscia.','Aggiungi lievito e sale. Mescola.','Versa nella teglia. Distribuisci pezzi di cioccolato sopra.','Cuoci 20-22 min. Devono sembrare leggermente umidi al centro. Raffredda 10 min.']},
  {id:'ny34',name:'Energy Balls Datteri e Cacao',ico:'⚽',tags:['spuntino','pre-workout'],time:'10 min',kcal:120,p:4,c:18,g:4,diff:'Facilissimo',alimenti:['datteri','mandorle','cacao amaro','cocco rapé','vaniglia'],desc:'12 palline in 10 minuti senza cottura. Pre-workout naturale con zuccheri lenti.',ingredienti:['150g datteri medjool denocciolati','80g mandorle pelate','2 cucchiai cacao amaro','1 cucchiaino vaniglia','Pizzico di sale','Cocco rapé per rotolare'],steps:['Metti datteri in acqua calda 5 min se duri.','Frulla datteri, mandorle, cacao, vaniglia e sale nel robot da cucina.','Il mix deve compattarsi quando premuto tra le dita.','Forma palline da 25g con le mani leggermente bagnate.','Rotola nel cocco rapé. Metti in frigo 30 min. Conserva fino a 2 settimane.']},
  {id:'ny35',name:'Panna Cotta Proteica alla Vaniglia',ico:'🍮',tags:['spuntino','definizione'],time:'10 min',kcal:160,p:16,c:12,g:4,diff:'Facile',alimenti:['yogurt greco','ricotta','gelatina','miele','vaniglia','frutti di bosco'],desc:'Dessert da ristorante con il profilo macro di un pasto da palestra.',ingredienti:['200g yogurt greco 0%','100g ricotta magra','2 fogli gelatina (4g)','1 cucchiaio miele','Vaniglia','50ml latte','Frutti di bosco per servire'],steps:['Ammolla la gelatina in acqua fredda 5 min.','Scalda il latte con il miele senza bollire. Scioglie la gelatina strizzata nel latte caldo.','Frulla yogurt, ricotta e vaniglia a crema liscia.','Aggiungi il latte con gelatina e mescola bene.','Versa in 4 bicchieri. Frigo minimo 3 ore. Servi con frutti di bosco.']},
  // ── RICETTE CON INGREDIENTI ECONOMICI ──
  {id:'ny36',name:'Riso e Fagioli alla Cubana',ico:'🍚',tags:['pranzo','cena','veg','massa'],time:'20 min',kcal:420,p:18,c:72,g:6,diff:'Facile',alimenti:['riso','fagioli neri','cipolla','aglio','cumino','peperoni','lime'],desc:'La combinazione riso+fagioli è proteina vegetale completa. Economicissimo.',ingredienti:['100g riso bianco cotto','150g fagioli neri cotti','1 cipolla','3 spicchi aglio','Cumino e origano','1 peperone verde','Succo di lime','Prezzemolo o coriandolo','Olio'],steps:['Rosola cipolla e aglio in olio 4 min.','Aggiungi peperone e cuoci 3 min.','Aggiungi fagioli, cumino e origano. Cuoci 8 min schiacciando qualcuno.','Regola di sale e aggiungi il succo di lime.','Servi sui fagioli il riso. Prezzemolo o coriandolo.']},
  {id:'ny37',name:'Frittata di Patate e Cipolla',ico:'🍳',tags:['pranzo','cena','massa'],time:'25 min',kcal:350,p:24,c:32,g:12,diff:'Facile',alimenti:['uova','albumi','patate','cipolla','rosmarino','parmigiano'],desc:'La tortilla española fit. Più albumi, meno tuorli, risultato uguale.',ingredienti:['3 uova + 3 albumi','200g patate a cubetti piccoli','1 cipolla media','Rosmarino','20g parmigiano grattugiato','Olio EVO','Sale, pepe'],steps:['Cuoci le patate in padella con olio e rosmarino 12 min finché dorate.','Aggiungi la cipolla affettata. Cuoci altri 5 min.','Sbatti uova e albumi con parmigiano, sale e pepe.','Versa sulle patate. Cuoci a fuoco basso 5 min con coperchio.','Gira con un piatto grande. Cuoci l\'altro lato 3 min.']},
  {id:'ny38',name:'Pasta e Patate Napoletana Fit',ico:'🍝',tags:['pranzo','massa'],time:'30 min',kcal:440,p:18,c:74,g:8,diff:'Facile',alimenti:['pasta integrale','patate','cipolla','rosmarino','sedano','pomodori','parmigiano'],desc:'Doppio carb ma indice glicemico bilanciato. Piatto povero dell\'Italia meridionale.',ingredienti:['60g pasta integrale mista spezzata','150g patate a cubetti','1/2 cipolla','1 gambo sedano','100g pomodori pelati','Rosmarino','Brodo vegetale 500ml','10g parmigiano','Olio EVO'],steps:['Soffriggi cipolla e sedano in olio 4 min.','Aggiungi pomodori e rosmarino. Cuoci 5 min.','Unisci patate e brodo. Cuoci 15 min.','Aggiungi la pasta. Cuoci al dente mescolando (deve rimanere brodosa).','Manteca con parmigiano. Lascia riposare 2 min.']},
  // ── RICETTE INTERNAZIONALI ──
  {id:'ny39',name:'Pollo Tikka Masala Fit',ico:'🍛',tags:['cena','massa'],time:'35 min',kcal:420,p:44,c:16,g:14,diff:'Media',alimenti:['pollo','yogurt greco','passata di pomodoro','cipolla','aglio','zenzero','garam masala','curcuma'],desc:'Il curry britannico per eccellenza rivisitato: yogurt greco al posto della panna.',ingredienti:['250g petto di pollo','Marinata: yogurt greco + garam masala + curcuma + aglio + zenzero','Salsa: 200g passata + 1 cipolla + 2 spicchi aglio + zenzero + garam masala 2 cucchiaini + curcuma + paprika','50ml yogurt greco per finire'],steps:['Marina il pollo in yogurt+spezie per 30 min minimo.','Cuoci il pollo in padella grill 5-6 min per lato. Taglia a pezzi.','Prepara la salsa: cipolla+aglio+zenzero 5 min, spezie 1 min, passata 15 min.','Aggiungi il pollo alla salsa. Cuoci 5 min.','Spegni e mescola lo yogurt. Non far bollire.']},
  {id:'ny40',name:'Ramen Proteico Homemade',ico:'🍜',tags:['cena','massa'],time:'30 min',kcal:480,p:38,c:46,g:12,diff:'Media',alimenti:['uova','pollo','ramen','miso bianco','salsa di soia','zenzero','aglio','funghi shiitake'],desc:'Il ramen dal zero è facile se hai i componenti giusti. Noodles al dente nella salsa umami.',ingredienti:['2 porzioni noodles ramen','200g petto di pollo','2 uova sode marinate','Brodo: 800ml brodo di pollo + 2 cucchiai miso bianco + 2 cucchiai salsa di soia + zenzero + aglio','Toppings: cipollotto, alga nori, sesamo, mais'],steps:['Cuoci le uova 7 min in acqua bollente. Raffredda e pela. Marina in soia+acqua.','Cuoci il pollo in padella con salsa di soia e zenzero 6 min per lato.','Scalda il brodo con miso, soia, zenzero e aglio (non bollire il miso).','Cuoci i noodles secondo le istruzioni.','Assembla: noodles + brodo + pollo affettato + uovo a metà + toppings.']},
  {id:'ny41',name:'Pad Thai Fit con Gamberoni',ico:'🍜',tags:['cena','definizione'],time:'20 min',kcal:420,p:32,c:46,g:10,diff:'Media',alimenti:['gamberoni','noodles di riso','uova','germogli di soia','cipollotti','arachidi','salsa di pesce','lime'],desc:'Street food thai rivisitato: la salsa autentica fa tutta la differenza.',ingredienti:['150g gamberoni','100g noodles di riso (reidratati)','1 uovo','50g germogli di soia','3 cipollotti','20g arachidi tritate','Salsa: 2 cucchiai salsa di pesce + 1 cucchiaio zucchero di canna + succo lime + sriracha','Coriandolo'],steps:['Reidrata i noodles in acqua calda 8 min.','Scalda wok a fuoco alto con olio. Cuoci gamberoni 2 min per lato.','Aggiungi uovo e strapazza velocemente.','Aggiungi noodles e salsa. Mescola a fuoco alto 2-3 min.','Aggiungi germogli e cipollotti. 1 min. Servi con arachidi e coriandolo.']},
  {id:'ny42',name:'Moussaka Greca Fit',ico:'🍆',tags:['cena','massa'],time:'60 min',kcal:480,p:36,c:30,g:20,diff:'Avanzata',alimenti:['manzo macinato','melanzane','pomodori','cipolla','aglio','cannella','yogurt greco','uova'],desc:'Béchamel sostituita con yogurt greco: stessa cremosità, triple proteine.',ingredienti:['350g manzo macinato magro','2 melanzane','200g pomodori pelati','1 cipolla','2 spicchi aglio','Cannella, noce moscata, origano','Besciamella fit: 200g yogurt greco + 1 uovo + 20g parmigiano + noce moscata'],steps:['Fetta melanzane 7mm, sala 15 min, asciuga. Griglia su padella senza olio.','Ragù: cipolla+aglio 4 min, macinato 6 min, pomodori+spezie 15 min.','Besciamella fit: mescola yogurt, uovo e parmigiano.','Assembla: melanzane + ragù + melanzane + besciamella.','Forno 180°C per 30 min finché dorata.']},
  {id:'ny43',name:'Okonomiyaki Proteico',ico:'🥞',tags:['cena','pranzo','definizione'],time:'20 min',kcal:320,p:28,c:26,g:10,diff:'Facile',alimenti:['uova','albumi','cavolo','gamberoni','farina di avena','salsa di soia'],desc:'La frittata giapponese. Versatile: dentro ci puoi mettere quasi tutto.',ingredienti:['3 uova + 2 albumi','100g cavolo cappuccio tritato finissimo','80g gamberoni o tonno','4 cucchiai farina di avena','2 cucchiai salsa di soia','Cipollotto','Mayo + sriracha per servire (opzionale)'],steps:['Mescola uova, albumi, cavolo, farina di avena e salsa di soia.','Aggiungi i gamberoni tritati o il tonno sgocciolato.','Scalda padella con olio a fuoco medio.','Versa il composto come una frittata spessa. Cuoci 5 min per lato.','Servi con cipollotto e un mix mayo+sriracha se vuoi.']},
  // ── MEAL PREP AVANZATA ──
  {id:'ny44',name:'Prep 5 Giorni: Salmone + Verdure + Farro',ico:'📦',tags:['meal-prep','definizione'],time:'50 min',kcal:450,p:40,c:38,g:14,diff:'Facile',alimenti:['salmone','farro','zucchine','asparagi','pomodorini','limone','olio EVO','aglio'],desc:'Investimento di 50 minuti domenica = 5 pranzi perfetti senza stress.',ingredienti:['4 filetti salmone 150g','200g farro perlato secco','600g verdure miste: zucchine, asparagi, pomodorini','Marinata salmone: olio+limone+aglio+aneto+sale','5 contenitori ermetici'],steps:['Preriscalda forno a 200°C.','Cuoci il farro in acqua salata 25 min.','Marinate il salmone 15 min.','Disponi salmone e verdure su due teglie separate.','Cuoci: verdure 20 min, salmone 15 min.','Dividi farro in 5 container. Aggiungi un filetto di salmone e le verdure. Conserva 4 giorni.']},
  {id:'ny45',name:'Prep Tacos Bowl per 5 Giorni',ico:'📦',tags:['meal-prep','massa'],time:'40 min',kcal:480,p:38,c:50,g:12,diff:'Facile',alimenti:['manzo macinato','fagioli neri','riso integrale','mais','peperoni','avocado','lime'],desc:'La prep messicana. Tieni avocado e lime separati, aggiungi al momento.',ingredienti:['500g manzo macinato magro','2 lattine fagioli neri','250g riso integrale secco','1 lattina mais','2 peperoni','Spezie: cumino+paprika+aglio+origano+sale','Avocado e lime al momento'],steps:['Cuoci il riso integrale 35 min.','Rosola macinato con spezie 8 min.','Aggiungi fagioli e mais, cuoci 3 min.','Arrostisc i peperoni in forno 200°C 20 min.','Dividi riso + mix carne + peperoni in 5 container. Al momento: avocado e lime.']},
  {id:'ny46',name:'Prep Asian Bowl con Manzo',ico:'📦',tags:['meal-prep','massa'],time:'45 min',kcal:500,p:42,c:46,g:14,diff:'Facile',alimenti:['manzo','riso','broccoli','carote','salsa di soia','zenzero','aglio','sesamo'],desc:'Tutti i sapori del wok, preparati in batch per la settimana.',ingredienti:['500g manzo a straccetti','250g riso basmati secco','400g broccoli','200g carote','Salsa: 4 cucchiai salsa di soia + 2 cucchiai miele + 1 cucchiaio olio sesamo + aglio + zenzero','Sesamo e cipollotto'],steps:['Cuoci il riso.','Salta il manzo in wok a fuoco alto 5 min.','Aggiungi broccoli e carote. Salta 4 min.','Versa la salsa e cuoci 2 min finché caramellata.','Dividi in 4-5 container con riso. Sesamo e cipollotto al servizio.']},
  // ── COLAZIONI SPECIALI ──
  {id:'ny47',name:'Pancakes alla Banana senza Glutine',ico:'🥞',tags:['colazione','massa','veg'],time:'15 min',kcal:360,p:20,c:42,g:10,diff:'Facile',alimenti:['banana','uova','farina di riso','yogurt greco','miele','frutti di bosco'],desc:'Senza glutine naturalmente. La banana matura è il dolcificante e il legante.',ingredienti:['2 banane molto mature','3 uova','3 cucchiai farina di riso','50g yogurt greco','1 cucchiaino lievito','Cannella','Frutti di bosco e miele per servire'],steps:['Schiacciate le banane a purea con una forchetta.','Aggiungi uova e yogurt. Mescola.','Incorpora farina di riso, lievito e cannella.','Cuoci piccole frittelline in padella antiaderente 2 min per lato.','Servi con frutti di bosco freschi e miele.']},
  {id:'ny48',name:'Uova in Cocotte con Spinaci e Salmone',ico:'🍳',tags:['colazione','cena','definizione'],time:'20 min',kcal:300,p:28,c:6,g:16,diff:'Facile',alimenti:['uova','salmone affumicato','spinaci','panna','erba cipollina'],desc:'Presentazione da ristorante, preparazione da 5 minuti. Cotte in cocotte o ramekin.',ingredienti:['4 uova','80g salmone affumicato a pezzetti','60g spinaci freschi','2 cucchiai yogurt greco (al posto della panna)','Sale, pepe','Erba cipollina','Burro per gli stampini'],steps:['Preriscalda forno a 180°C. Imburra 4 cocotte o ramekin.','Metti spinaci crudi e salmone sul fondo.','Rompi un uovo in ogni cocotte.','Aggiungi un cucchiaino di yogurt greco sopra ogni uovo.','Cuoci a bagnomaria in forno per 12-14 min (tuorlo morbido).']},
  // ── CARNE BIANCA ALTERNATIVA ──
  {id:'ny49',name:'Coniglio alla Cacciatora',ico:'🐇',tags:['cena','definizione'],time:'60 min',kcal:380,p:46,c:12,g:12,diff:'Media',alimenti:['coniglio','pomodori','olive','rosmarino','aglio','vino bianco','cipolla'],desc:'Il coniglio è la carne bianca più magra: meno grassi del pollo con più ferro.',ingredienti:['400g coniglio a pezzi','200g pomodori pelati','40g olive verdi denocciolate','Rosmarino e salvia','3 spicchi aglio','100ml vino bianco','1 cipolla','Olio EVO','Sale'],steps:['Rosola il coniglio in olio a fuoco alto 5 min per lato. Metti da parte.','Nella stessa padella: cipolla e aglio 4 min.','Sfuma con il vino bianco. Fai evaporare 2 min.','Aggiungi pomodori, olive e erbe. Metti il coniglio.','Cuoci coperto a fuoco basso per 40 min.']},
  {id:'ny50',name:'Petto di Tacchino Farcito',ico:'🦃',tags:['cena','massa','meal-prep'],time:'45 min',kcal:400,p:52,c:8,g:14,diff:'Media',alimenti:['tacchino','spinaci','feta','aglio','limone','rosmarino'],desc:'Un petto di tacchino intero farcito sfama 4 persone o 4 giorni di meal prep.',ingredienti:['500g petto di tacchino','150g spinaci freschi','80g feta sbriciolata','2 spicchi aglio','Buccia di limone','Rosmarino e timo','Sale, pepe','Stecchini o spago da cucina'],steps:['Apri il petto a libro con un coltello affilato.','Appassisce spinaci in padella con aglio 2 min.','Distribuisci spinaci, feta e scorza limone sul petto aperto.','Arrotola e lega con spago da cucina o stecchini.','Rosola in padella 5 min per lato, poi forno 185°C per 25 min.']},
  // ── RICETTE DOLCI FIT AVANZATE ──
  {id:'ny51',name:'Tiramisù Proteico',ico:'🍰',tags:['spuntino','massa'],time:'20 min',kcal:250,p:22,c:22,g:6,diff:'Media',alimenti:['ricotta','yogurt greco','uova','savoiardi','caffè','cacao amaro','miele'],desc:'Il tiramisù preferito dagli italiani, con la metà delle calorie e il doppio delle proteine.',ingredienti:['200g ricotta magra','150g yogurt greco 0%','2 tuorli (o 30g whey vaniglia per no uova)','2 cucchiai miele','200ml caffè espresso freddo','12 savoiardi leggeri','Cacao amaro per spolverare','Vaniglia'],steps:['Frulla ricotta, yogurt, tuorli (o whey) e miele fino a crema liscia.','Immergi rapidamente i savoiardi nel caffè freddo (1-2 sec per lato — non inzuppare).','Disponi uno strato di savoiardi, poi la crema, poi di nuovo savoiardi e crema.','Spolvera abbondante cacao amaro.','Frigo minimo 2 ore prima di servire.']},
  {id:'ny52',name:'Crumble di Mele e Avena',ico:'🍎',tags:['spuntino','colazione'],time:'35 min',kcal:240,p:8,c:36,g:7,diff:'Facile',alimenti:['mele','avena','mandorle','miele','cannella','burro','vaniglia'],desc:'Dessert da forno che profuma di autunno. Ottimo anche a colazione.',ingredienti:['3 mele Golden','Crumble: 80g avena + 30g mandorle tritate + 2 cucchiai miele + 15g burro fuso + cannella','Vaniglia','Succo di mezzo limone'],steps:['Preriscalda forno a 180°C.','Sbuccia e taglia le mele. Condisci con succo limone, cannella e vaniglia.','Disponi le mele in una pirofila.','Mescola avena, mandorle, miele e burro fuso a briciole.','Distribuisci il crumble sopra le mele. Cuoci 30 min.']},
  // ── RICETTE ESTATE / LEGGERE ──
  {id:'ny53',name:'Carpaccio di Manzo con Rucola',ico:'🥩',tags:['pranzo','definizione'],time:'10 min',kcal:290,p:30,c:4,g:16,diff:'Facile',alimenti:['manzo','rucola','parmigiano','limone','olive','capperi','olio EVO'],desc:'Zero cottura, massimo sapore. Usa un coltello affilato o chiedi al macellaio di affettare.',ingredienti:['200g controfiletto di manzo congelato 30 min (più facile da affettare)','40g rucola fresca','20g parmigiano a scaglie','Succo di limone','1 cucchiaio capperi','Olio EVO','Sale, pepe nero'],steps:['Affetta il manzo semi-congelato il più sottile possibile con coltello affilato.','Disponi le fette su un piatto freddo.','Condisci con olio EVO, succo di limone e sale.','Distribuisci rucola, parmigiano a scaglie e capperi.','Pepe nero abbondante. Servi subito.']},
  {id:'ny54',name:'Ceviche di Salmone',ico:'🐟',tags:['pranzo','cena','definizione'],time:'20 min',kcal:280,p:34,c:10,g:10,diff:'Facile',alimenti:['salmone fresco','limone','lime','cipolla rossa','peperoncino','coriandolo','avocado'],desc:'Il pesce viene "cotto" dall\'acido citrico. Fresco, leggero, elevatissimo in proteine.',ingredienti:['250g salmone sushi-grade a cubetti 1.5cm','Succo di 3 lime + 2 limoni','1/4 cipolla rossa a julienne sottile','1 peperoncino fresco','Coriandolo abbondante','1/2 avocado a cubetti','Sale, pepe'],steps:['Metti il salmone in un bowl con il succo di lime e limone.','Assicurati che il pesce sia completamente coperto.','Lascia "cuocere" in frigo 15-20 min (diventa opaco all\'esterno).','Scola parte del succo. Aggiungi cipolla, peperoncino e coriandolo.','Aggiungi avocado. Regola di sale.']},
  {id:'ny55',name:'Insalata di Farro Estiva',ico:'🥗',tags:['pranzo','massa','meal-prep'],time:'30 min',kcal:430,p:22,c:56,g:12,diff:'Facile',alimenti:['farro','mozzarella','pomodori','basilico','olive','pesto','limone'],desc:'Fredda il giorno dopo è ancora più buona. Prep per 3 giorni.',ingredienti:['100g farro perlato cotto','80g mozzarella di bufala a pezzi','150g pomodori datterini','30g olive taggiasche','Basilico fresco abbondante','2 cucchiai pesto','Olio EVO + limone'],steps:['Cuoci il farro in acqua salata 25 min. Scola e raffredda.','Mescola il farro con il pesto quando ancora tiepido.','Aggiungi pomodori, olive e basilico.','Aggiungi la mozzarella solo al momento di servire.','Condisci con olio e limone.']},
  // ── HIGH PROTEIN EXTREME ──
  {id:'ny56',name:'White Fish Taco Bowl',ico:'🌮',tags:['cena','definizione'],time:'20 min',kcal:370,p:40,c:28,g:10,diff:'Facile',alimenti:['merluzzo','cavolo','avocado','lime','yogurt greco','mais','coriandolo'],desc:'Tacos bowl senza guscio. Il merluzzo è la proteina più magra tra i pesci bianchi.',ingredienti:['200g filetto di merluzzo','80g cavolo cappuccio tritato','1/2 avocado','50g mais','Crema: yogurt greco + succo lime + sriracha + sale','Coriandolo','Mais soffiato per croccantezza (opzionale)'],steps:['Condisci il merluzzo con paprika, aglio, sale e un filo d\'olio.','Cuoci in padella 3-4 min per lato finché si sfalda.','Prepara la crema mescolando yogurt, lime e sriracha.','Assembla: cavolo + pesce sbriciolato + mais + avocado.','Versa la crema. Coriandolo e lime.']},
  {id:'ny57',name:'Bistecche di Cavolfiore Grigliate',ico:'🥦',tags:['cena','veg','definizione'],time:'25 min',kcal:240,p:10,c:22,g:10,diff:'Facile',alimenti:['cavolfiore','tahini','curcuma','paprika','limone','prezzemolo','ceci'],desc:'Il cavolfiore affettato spesso e grigliato cambia completamente consistenza e sapore.',ingredienti:['1 cavolfiore grande','Marinata: olio EVO + curcuma + paprika affumicata + aglio + sale','100g ceci arrostiti','Salsa: tahini + limone + acqua + sale','Prezzemolo e pomegranate'],steps:['Taglia il cavolfiore in "bistecche" da 2cm mantenendo il gambo.','Marina con olio e spezie.','Griglia in padella a fuoco alto 4-5 min per lato finché ben colorata.','Arrostisc i ceci in forno con cumino.','Disponi le bistecche, versa la salsa tahini, aggiungi ceci e prezzemolo.']},
  {id:'ny58',name:'Insalata Proteica con Edamame',ico:'🌿',tags:['pranzo','definizione','veg','rapido'],time:'10 min',kcal:380,p:28,c:32,g:12,diff:'Facilissimo',alimenti:['edamame','quinoa','avocado','cetriolo','carote','sesamo','salsa di soia','lime'],desc:'Vegan, ad alto contenuto proteico. Pronta in 10 minuti se hai la quinoa cotta.',ingredienti:['150g edamame cotti sgusciati','100g quinoa cotta','1/2 avocado','1/2 cetriolo','1 carota julienne','Sesamo tostato','Dressing: 2 cucchiai soia + 1 cucchiaio olio sesamo + lime + zenzero'],steps:['Mescola edamame, quinoa, cetriolo e carote.','Prepara il dressing.','Aggiungi l\'avocado a cubetti.','Versa il dressing e mescola delicatamente.','Guarnisci con sesamo.']},
  {id:'ny59',name:'Salmone con Crosta di Pistacchio',ico:'🐟',tags:['cena','massa'],time:'20 min',kcal:480,p:40,c:10,g:28,diff:'Facile',alimenti:['salmone','pistacchi','miele','senape','limone','aglio'],desc:'La crosta di pistacchio è un modo elegante per aggiungere grassi buoni al salmone.',ingredienti:['2 filetti salmone 180g','60g pistacchi tritati grossolanamente','1 cucchiaio miele','1 cucchiaio senape di Digione','Succo di limone','Aglio in polvere','Sale'],steps:['Preriscalda forno a 200°C.','Mescola senape e miele. Spennella i filetti.','Pressa i pistacchi tritati sulla superficie del salmone.','Cuoci su carta forno 12-14 min (roseo al centro = perfetto).','Servi con limone e verdure a vapore.']},
  {id:'ny60',name:'Zuppa Proteica di Kimchi e Tofu',ico:'🌶️',tags:['cena','definizione'],time:'20 min',kcal:260,p:22,c:18,g:10,diff:'Facile',alimenti:['kimchi','tofu','uova','brodo','cipollotto','sesamo','salsa di soia'],desc:'Il kimchi fermentato ha miliardi di probiotici. La zuppa kimchi è il comfort food coreano per eccellenza.',ingredienti:['200g kimchi','200g tofu morbido a cubetti','1 uovo','600ml brodo di pollo o vegetale','2 cucchiai salsa di soia','Cipollotti','Olio di sesamo','Gochujang (pasta peperoncino coreano) a piacere'],steps:['Scalda il brodo in una pentola.','Aggiungi kimchi e gochujang. Cuoci 5 min.','Aggiungi tofu e salsa di soia. Cuoci 3 min.','Rompi l\'uovo direttamente nella zuppa. Cuoci 3 min senza mescolare.','Servi con cipollotti e un filo di olio di sesamo.']},
  // ── BATCH 4: 30 ricette senza apostrofi non escapati ──
  {id:'nz1',name:'Petto di Pollo Ripienato agli Spinaci',ico:'🍗',tags:['cena','massa'],time:'35 min',kcal:390,p:52,c:4,g:16,diff:'Media',alimenti:['pollo','spinaci','feta','aglio','rosmarino'],desc:'Tecnica del petto farcito: piu proteina, piu sapore, zero noia.',ingredienti:['2 petti di pollo 180g cadauno','80g spinaci freschi','60g feta','2 spicchi aglio','Rosmarino','Olio EVO','Sale, pepe','Stecchini da cucina'],steps:['Apri i petti a taschino con un coltello affilato.','Appassisci spinaci con aglio 2 min. Aggiungi feta sbriciolata.','Farcisci ogni petto con il mix. Chiudi con stecchini.','Rosola in padella 4 min per lato. Poi forno 185 gradi per 15 min.','Fai riposare 3 min prima di tagliare.']},
  {id:'nz2',name:'Soba Fredda con Pollo e Sesamo',ico:'🍜',tags:['pranzo','definizione'],time:'20 min',kcal:420,p:36,c:46,g:10,diff:'Facile',alimenti:['noodles soba','pollo','cetriolo','carote','sesamo','salsa di soia','zenzero'],desc:'I noodles soba al grano saraceno sono naturalmente proteici e senza glutine.',ingredienti:['100g noodles soba','150g petto di pollo grigliato a fettine','1/2 cetriolo julienne','1 carota julienne','Dressing: 3 cucchiai salsa di soia + olio sesamo + lime + zenzero + peperoncino','Sesamo tostato','Cipollotto'],steps:['Cuoci i soba in acqua bollente 4 min. Scola e raffredda in acqua fredda.','Prepara il dressing mescolando tutti gli ingredienti.','Disponi i soba in una bowl.','Aggiungi pollo, cetriolo e carote.','Versa il dressing. Guarnisci con sesamo e cipollotto.']},
  {id:'nz3',name:'Quiche Proteica senza Pasta',ico:'🥧',tags:['pranzo','cena','definizione','meal-prep'],time:'40 min',kcal:320,p:26,c:8,g:18,diff:'Facile',alimenti:['uova','albumi','salmone affumicato','spinaci','ricotta','cipolla'],desc:'Niente pasta frolla: la base e fatta di uova e ricotta. Keto-friendly.',ingredienti:['4 uova + 3 albumi','100g ricotta magra','80g salmone affumicato a pezzi','100g spinaci freschi','1/4 cipolla tritata','Erba cipollina','Sale, pepe, noce moscata','Olio EVO'],steps:['Preriscalda forno a 180 gradi. Ungi una teglia rotonda da 22cm.','Appassisci cipolla e spinaci in padella 3 min.','Sbatti uova, albumi e ricotta. Aggiungi sale, pepe e noce moscata.','Aggiungi salmone, spinaci e cipolla al composto.','Versa nella teglia. Cuoci 28-30 min finche solida al centro.']},
  {id:'nz4',name:'Carpaccio di Zucchine con Tonno',ico:'🥒',tags:['pranzo','definizione','rapido'],time:'10 min',kcal:260,p:28,c:8,g:12,diff:'Facilissimo',alimenti:['zucchine','tonno','limone','menta','olive','olio EVO'],desc:'Zero cottura. Le zucchine crude tagliate sottili si marinano nel limone in pochi minuti.',ingredienti:['2 zucchine fresche e sode','120g tonno al naturale','Succo e scorza di 1 limone','Foglie di menta fresca','20g olive taggiasche','1 cucchiaio olio EVO','Sale, pepe nero'],steps:['Taglia le zucchine a nastri molto sottili con un pelapatate o mandolina.','Disponi i nastri su un piatto. Condisci con limone, olio e sale.','Lascia marinare 5 min: le zucchine si ammorbidiscono leggermente.','Distribuisci il tonno sbriciolato sopra.','Aggiungi olive, menta e scorza di limone. Pepe abbondante.']},
  {id:'nz5',name:'Stufato di Manzo e Verdure Invernale',ico:'🥘',tags:['cena','massa'],time:'90 min',kcal:480,p:44,c:28,g:16,diff:'Media',alimenti:['manzo','carote','sedano','patate','cipolla','rosmarino','pomodori','vino rosso'],desc:'Lo stufato lento e una delle migliori tecniche per rendere la carne tenerissima.',ingredienti:['400g manzo per stufato a cubetti','2 carote','2 gambi sedano','2 patate medie','1 cipolla','200g pomodori pelati','100ml vino rosso','Rosmarino e alloro','Olio EVO','Sale, pepe'],steps:['Rosola il manzo a pezzi in olio a fuoco alto 5 min. Metti da parte.','Nella stessa pentola: cipolla, carote e sedano 5 min.','Sfuma con il vino rosso. Fai evaporare 2 min.','Aggiungi pomodori, rosmarino, alloro e la carne. Copri con acqua.','Cuoci a fuoco basso per 70 min. Aggiungi patate gli ultimi 20 min.']},
  {id:'nz6',name:'Bowl di Riso Integrale e Edamame',ico:'🌿',tags:['pranzo','veg','definizione','rapido'],time:'10 min',kcal:400,p:20,c:58,g:8,diff:'Facilissimo',alimenti:['riso integrale','edamame','avocado','cetriolo','alga nori','sesamo','salsa di soia'],desc:'Assemblaggio da 10 minuti se hai il riso gia cotto. Vegana e completa.',ingredienti:['150g riso integrale cotto','100g edamame cotti sgusciati','1/2 avocado a cubetti','1/2 cetriolo a rondelle','Striscioline di alga nori','Sesamo tostato','Salsa: soia + olio sesamo + lime'],steps:['Metti il riso caldo nella bowl.','Disponi edamame, avocado e cetriolo in sezioni separate.','Aggiungi le striscioline di nori.','Prepara la salsa e versala sopra.','Guarnisci con sesamo. Mescola prima di mangiare.']},
  {id:'nz7',name:'Tacchino Macinato alla Messicana',ico:'🌮',tags:['cena','pranzo','definizione'],time:'20 min',kcal:350,p:42,c:12,g:12,diff:'Facile',alimenti:['tacchino macinato','fagioli neri','peperoni','cipolla','cumino','paprika','aglio'],desc:'Alternativa leggera al classico macinato di manzo. Meno grassi, stessa soddisfazione.',ingredienti:['300g tacchino macinato','100g fagioli neri cotti','1 peperone rosso a cubetti','1/2 cipolla','2 spicchi aglio','Cumino 1 cucchiaino','Paprika affumicata','Peperoncino','Olio EVO','Sale'],steps:['Rosola cipolla e aglio in olio 3 min.','Aggiungi il macinato e cuoci 6 min rompendolo con il cucchiaio.','Aggiungi peperone, cumino, paprika e peperoncino. Cuoci 3 min.','Unisci i fagioli. Cuoci altri 4 min.','Regola di sale. Servi con riso, lattuga o gallette.']},
  {id:'nz8',name:'Salmone en Papillote con Verdure',ico:'🐟',tags:['cena','definizione'],time:'25 min',kcal:380,p:40,c:10,g:18,diff:'Facile',alimenti:['salmone','zucchine','pomodorini','aglio','limone','timo','olio EVO'],desc:'Cottura en papillote: il salmone cuoce nel suo vapore. Zero grassi aggiunti, sapore intenso.',ingredienti:['200g filetto di salmone','1 zucchina a rondelle','80g pomodorini','2 spicchi aglio a lamelle','1/2 limone a fette','Timo fresco','1 cucchiaio olio EVO','Sale, pepe'],steps:['Preriscalda forno a 190 gradi.','Stendi un foglio di carta forno. Metti le zucchine come base.','Posa il salmone sulle zucchine. Aggiungi pomodorini, aglio e limone.','Irrora con olio. Chiudi ermeticamente il cartoccio.','Cuoci 18-20 min. Apri solo al momento di servire.']},
  {id:'nz9',name:'Frullato Verde Proteico',ico:'🥤',tags:['colazione','post-workout','definizione'],time:'5 min',kcal:280,p:24,c:32,g:4,diff:'Facilissimo',alimenti:['spinaci','banana','latte di mandorla','whey vaniglia','zenzero','limone','semi di chia'],desc:'Verde non significa cattivo. La banana maschera completamente il gusto degli spinaci.',ingredienti:['Grande manciata spinaci baby','1 banana congelata','250ml latte di mandorla','20g whey vaniglia','1cm zenzero fresco','Succo di 1/2 limone','1 cucchiaio semi di chia'],steps:['Metti spinaci e latte nel frullatore per primo.','Frulla 20 sec per liquefar gli spinaci completamente.','Aggiungi banana, whey, zenzero e limone.','Frulla 30 sec ad alta velocita. Aggiungi ghiaccio se vuoi.','Bevi subito: i nutrienti si degradano in fretta.']},
  {id:'nz10',name:'Lonza di Maiale con Mela e Rosmarino',ico:'🥩',tags:['cena','massa'],time:'35 min',kcal:390,p:48,c:12,g:14,diff:'Facile',alimenti:['lonza di maiale','mele','rosmarino','aglio','senape','miele'],desc:'La lonza e il taglio di maiale piu magro: meno grassi del petto di pollo.',ingredienti:['250g lonza di maiale a fettine','1 mela a spicchi','Rosmarino fresco','2 spicchi aglio','1 cucchiaio senape di Digione','1 cucchiaino miele','Olio EVO','Sale, pepe'],steps:['Condisci la lonza con senape, miele, rosmarino e aglio. Marina 15 min.','Rosola le fettine in padella 3 min per lato. Metti da parte.','Nella stessa padella rosola gli spicchi di mela 2 min per lato.','Rimetti la carne con la mela. Cuoci 2 min insieme.','Servi con le mele caramellate sopra.']},
  {id:'nz11',name:'Couscous con Pollo e Verdure',ico:'🍲',tags:['pranzo','massa','rapido'],time:'15 min',kcal:450,p:36,c:54,g:8,diff:'Facilissimo',alimenti:['couscous','pollo','zucchine','peperoni','cipolla','curcuma','cumino','prezzemolo'],desc:'Il couscous si cuoce in 5 minuti: il pasto con il rapporto tempo/nutrizione migliore.',ingredienti:['100g couscous integrale','150g pollo grigliato a cubetti','1 zucchina a dadini','1/2 peperone rosso','1/4 cipolla rossa','Curcuma, cumino, paprika','Brodo vegetale bollente','Prezzemolo e limone'],steps:['Versa il couscous in una bowl. Aggiungi le spezie.','Copri con brodo bollente fino a 1cm sopra il couscous. Copri con piatto.','Aspetta 5 min. Sgrana con una forchetta.','Mescola pollo, zucchina, peperone e cipolla rossa.','Condisci con limone e prezzemolo. Servi tiepido o freddo.']},
  {id:'nz12',name:'Sopa de Lima Messicana',ico:'🥣',tags:['cena','definizione'],time:'25 min',kcal:280,p:30,c:18,g:8,diff:'Facile',alimenti:['pollo','lime','pomodori','cipolla','aglio','peperoncino','coriandolo','tortilla'],desc:'La zuppa acida e aromatica dello Yucatan. Leggera, proteica, piena di profumi.',ingredienti:['200g petto di pollo cotto e sfilacciato','Succo di 3 lime','300g pomodori a cubetti','1 cipolla','3 spicchi aglio','1 peperoncino habanero o jalapeno','Coriandolo fresco abbondante','Brodo di pollo 700ml','Olio','Sale'],steps:['Soffriggi cipolla, aglio e peperoncino in olio 4 min.','Aggiungi pomodori e cuoci 5 min.','Versa il brodo e porta a bollore.','Aggiungi il pollo sfilacciato e il succo di lime.','Cuoci 5 min. Servi con coriandolo e, se vuoi, strisce di tortilla tostata.']},
  {id:'nz13',name:'Polpettone di Pollo al Forno',ico:'🍗',tags:['cena','massa','meal-prep'],time:'55 min',kcal:360,p:46,c:10,g:12,diff:'Media',alimenti:['pollo macinato','uova','pangrattato','aglio','prezzemolo','pomodori','parmigiano'],desc:'Un polpettone sfama 4 persone o 4 giorni di meal prep. Freddo in sandwich il giorno dopo.',ingredienti:['500g pollo macinato','1 uovo + 1 albume','3 cucchiai pangrattato integrale','30g parmigiano','2 spicchi aglio tritato','Prezzemolo abbondante','Sale, pepe','Passata di pomodoro per nappare'],steps:['Mescola pollo, uovo, pangrattato, parmigiano, aglio e prezzemolo. Impasta bene.','Forma un polpettone e metti in una teglia da forno.','Nappa con la passata di pomodoro sopra.','Cuoci a 175 gradi per 45 min.','Lascia riposare 5 min prima di tagliare a fette.']},
  {id:'nz14',name:'Insalata di Riso Venere con Gamberoni',ico:'🍱',tags:['pranzo','cena','definizione'],time:'30 min',kcal:420,p:32,c:44,g:10,diff:'Facile',alimenti:['riso venere','gamberoni','mango','cetriolo','cipollotto','lime','coriandolo','sesamo'],desc:'Il riso venere freddo con gamberoni e mango e il piatto estivo per eccellenza.',ingredienti:['80g riso venere secco','150g gamberoni cotti sgusciati','80g mango a cubetti','1/2 cetriolo a rondelle','Cipollotto affettato','Succo di 2 lime','Coriandolo fresco','Sesamo nero e bianco'],steps:['Cuoci il riso venere 30 min. Scola e raffredda completamente.','Condisci il riso con il succo di lime e un filo di olio.','Mescola gamberoni, mango e cetriolo.','Combina tutto. Aggiungi cipollotto e coriandolo.','Guarnisci con sesamo misto. Servi freddo.']},
  {id:'nz15',name:'Zuppa Spagnola di Pollo e Ceci',ico:'🥣',tags:['cena','massa','meal-prep'],time:'30 min',kcal:420,p:38,c:38,g:10,diff:'Facile',alimenti:['pollo','ceci','pomodori','cipolla','paprika affumicata','aglio','rosmarino'],desc:'Il cocido spagnolo semplificato. Due proteine in una zuppa: pollo e legumi.',ingredienti:['200g petto di pollo a cubetti','200g ceci cotti','300g pomodori pelati','1 cipolla','3 spicchi aglio','Paprika affumicata 2 cucchiaini','Rosmarino','Brodo di pollo 500ml','Olio EVO','Sale'],steps:['Rosola il pollo in olio 5 min. Metti da parte.','Soffriggi cipolla e aglio 4 min.','Aggiungi paprika e tosta 1 min. Aggiungi pomodori.','Cuoci 8 min. Aggiungi ceci, brodo e rosmarino.','Rimetti il pollo e cuoci 10 min. Regola di sale.']},
  {id:'nz16',name:'Tacos di Pesce Grigliato',ico:'🌮',tags:['cena','definizione'],time:'20 min',kcal:360,p:34,c:32,g:10,diff:'Facile',alimenti:['merluzzo','tortilla di mais','cavolo','avocado','lime','yogurt greco','coriandolo','sriracha'],desc:'Fish tacos californiani: il pesce grigliato invece di fritto cambia completamente i macro.',ingredienti:['200g filetto di merluzzo','4 tortillas di mais piccole','80g cavolo cappuccio tritato','1/2 avocado a fette','Crema: yogurt greco + lime + sriracha + sale','Coriandolo','Lime a spicchi'],steps:['Condisci il merluzzo con paprika, cumino, sale e un filo di olio.','Griglia in padella 4 min per lato finche si sfalda.','Scalda le tortillas 30 sec per lato su padella asciutta.','Prepara la crema mescolando yogurt, lime e sriracha.','Assembla: tortilla + pesce + cavolo + avocado + crema + coriandolo.']},
  {id:'nz17',name:'Pollo al Limone Greco',ico:'🍋',tags:['cena','definizione'],time:'30 min',kcal:340,p:44,c:6,g:14,diff:'Facile',alimenti:['pollo','limone','aglio','origano','olive kalamata','capperi','olio EVO'],desc:'Il pollo avgolemono semplificato. Acidita del limone e origano greco sono una combo imbattibile.',ingredienti:['250g cosce di pollo senza pelle','Succo e scorza di 2 limoni','4 spicchi aglio schiacciati','Origano secco abbondante','30g olive kalamata','1 cucchiaio capperi','2 cucchiai olio EVO','Sale, pepe nero'],steps:['Marina il pollo con limone, aglio, origano, olio e pepe per 20 min.','Cuoci in padella 6 min per lato a fuoco medio-alto.','Aggiungi olive e capperi. Cuoci 3 min.','Versa la marinata rimasta e cuoci 2 min.','Servi con il sughetto e verdure grigliate.']},
  {id:'nz18',name:'Riso al Forno con Carne e Patate',ico:'🍚',tags:['cena','massa','meal-prep'],time:'50 min',kcal:520,p:36,c:56,g:14,diff:'Facile',alimenti:['riso','manzo macinato','patate','cipolla','pomodori','prezzemolo','parmigiano'],desc:'Piatto unico da forno: riso, proteine e verdure in una teglia sola.',ingredienti:['150g riso parboiled','200g manzo macinato magro','150g patate a fette sottili','1/2 cipolla tritata','200g passata di pomodoro','Brodo di carne 300ml','Prezzemolo','20g parmigiano','Olio EVO'],steps:['Preriscalda forno a 180 gradi. Ungi una teglia da forno.','Rosola la cipolla e il macinato in olio 5 min.','Stendi le fettine di patate sul fondo della teglia.','Aggiungi riso crudo, macinato, passata e brodo. Mescola.','Copri con stagnola e cuoci 35 min. Togli la stagnola, aggiungi parmigiano, cuoci 10 min.']},
  {id:'nz19',name:'Hamburger di Pollo Croccante Fit',ico:'🍔',tags:['cena','pranzo','massa'],time:'25 min',kcal:430,p:40,c:32,g:14,diff:'Facile',alimenti:['petto di pollo','pangrattato','parmigiano','uova','aglio','pane integrale','lattuga','pomodoro'],desc:'Il burger di pollo croccante fatto in casa: impanatura leggera al forno, niente friggitrice.',ingredienti:['200g petto di pollo schiacciato a 1cm','Impanatura: pangrattato integrale + parmigiano + paprika + aglio polvere','1 uovo sbattuto','2 panini integrali','Lattuga, pomodoro, cipolla rossa','Salsa: yogurt greco + senape + limone'],steps:['Passa il pollo nell uovo, poi nella miscela di impanatura.','Disponi su teglia con carta forno. Spruzza con olio.','Cuoci a 210 gradi per 18-20 min girando a meta.','Prepara la salsa mescolando yogurt, senape e limone.','Assembla il burger con il pollo croccante e le verdure.']},
  {id:'nz20',name:'Pasta Fredda al Pesto di Rucola',ico:'🍝',tags:['pranzo','definizione','meal-prep'],time:'20 min',kcal:440,p:22,c:54,g:14,diff:'Facile',alimenti:['pasta integrale','rucola','mandorle','parmigiano','aglio','limone','tonno','pomodorini'],desc:'Il pesto di rucola e piu amaro del basilico: si sposa perfettamente con il tonno.',ingredienti:['90g pasta integrale','Pesto: 40g rucola + 20g mandorle + 20g parmigiano + 2 cucchiai olio EVO + aglio + limone','100g tonno al naturale','80g pomodorini','Sale'],steps:['Cuoci la pasta al dente. Scola e raffredda in acqua fredda.','Frulla rucola, mandorle, parmigiano, olio, aglio e limone a pesto.','Condisci la pasta fredda con il pesto.','Aggiungi il tonno sbriciolato e i pomodorini.','Regola di sale. Ottima anche il giorno dopo.']},
  {id:'nz21',name:'Sformato di Verdure e Quinoa',ico:'🫙',tags:['cena','veg','meal-prep'],time:'40 min',kcal:310,p:16,c:38,g:10,diff:'Media',alimenti:['quinoa','zucchine','peperoni','uova','parmigiano','origano'],desc:'Versione alta-proteina del flan di verdure. Si taglia a fette: perfetto per il meal prep.',ingredienti:['100g quinoa cotta','2 zucchine grattugiate','1 peperone arrostito a cubetti','3 uova','30g parmigiano','Origano secco','Aglio in polvere','Sale, pepe','Olio per la teglia'],steps:['Preriscalda forno a 180 gradi. Ungi una teglia da plumcake.','Strizza bene le zucchine grattugiate per togliere l acqua.','Mescola quinoa, zucchine, peperone, uova, parmigiano e spezie.','Versa nella teglia. Livella bene.','Cuoci 30-35 min finche solido e dorato. Raffredda prima di tagliare.']},
  {id:'nz22',name:'Insalata di Lenticchie e Salmone',ico:'🥗',tags:['pranzo','definizione'],time:'20 min',kcal:400,p:36,c:32,g:12,diff:'Facile',alimenti:['lenticchie verdi','salmone','cetriolo','cipolla rossa','prezzemolo','limone','senape','olio EVO'],desc:'Due fonti di proteine in una sola insalata. Le lenticchie verdi si mantengono croccanti.',ingredienti:['150g lenticchie verdi cotte','150g salmone cotto (al vapore o al forno)','1/2 cetriolo','1/4 cipolla rossa','Prezzemolo fresco abbondante','Dressing: olio EVO + limone + senape + sale'],steps:['Assicurati che le lenticchie siano ben scolate e fredde.','Taglia cetriolo e cipolla. Mescola con le lenticchie.','Aggiungi il salmone sbriciolato.','Prepara il dressing emulsionando olio, limone e senape.','Condisci e aggiungi prezzemolo. Meglio riposato 10 min.']},
  {id:'nz23',name:'Carne alla Pizzaiola Fit',ico:'🍅',tags:['cena','massa'],time:'20 min',kcal:360,p:44,c:12,g:12,diff:'Facile',alimenti:['fettine di manzo','passata di pomodoro','aglio','origano','olive','capperi'],desc:'Cinque ingredienti, venti minuti. La pizzaiola e il pasto del martedi sera perfetto.',ingredienti:['250g fettine di manzo magre','200g passata di pomodoro','3 spicchi aglio','Origano secco abbondante','20g olive nere','1 cucchiaio capperi','Olio EVO','Sale, pepe'],steps:['Scalda un filo di olio in padella. Rosola le fettine 2 min per lato. Metti da parte.','Soffriggi aglio nello stesso olio 1 min.','Aggiungi passata, origano, olive e capperi. Cuoci 8 min.','Rimetti la carne nel sugo. Cuoci 3 min.','Regola di sale. Servi con il sugo abbondante.']},
  {id:'nz24',name:'Shakshuka Verde con Feta',ico:'🥬',tags:['colazione','cena','veg'],time:'20 min',kcal:280,p:20,c:12,g:16,diff:'Facile',alimenti:['uova','spinaci','zucchine','peperoni verdi','feta','aglio','cumino'],desc:'La versione verde della shakshuka: senza pomodoro, piu leggera e altrettanto soddisfacente.',ingredienti:['4 uova','200g spinaci freschi','1 zucchina a cubetti','1 peperone verde a cubetti','60g feta sbriciolata','3 spicchi aglio','Cumino 1 cucchiaino','Peperoncino','Olio EVO'],steps:['Soffriggi aglio e peperoncino in olio 1 min.','Aggiungi zucchina e peperone. Cuoci 4 min.','Aggiungi spinaci. Cuoci 2 min finche appassiti.','Crea fossette e rompi le uova. Copri con coperchio.','Cuoci 5-6 min. Aggiungi feta sopra. Servi subito.']},
  {id:'nz25',name:'Sushi Bowl con Tonno Marinato',ico:'🍣',tags:['pranzo','definizione'],time:'15 min',kcal:440,p:34,c:46,g:10,diff:'Facile',alimenti:['riso sushi','tonno fresco','avocado','edamame','sesamo','salsa di soia','aceto di riso'],desc:'Il sushi bowl e il sushi democratico: tutti i sapori, senza la tecnica del rotolino.',ingredienti:['120g riso sushi cotto con aceto di riso','150g tonno sushi-grade a cubetti','1/2 avocado','40g edamame cotti','Sesamo nero','Salsa: soia + olio sesamo + miele + wasabi (opzionale)','Cipollotto e alga nori'],steps:['Prepara il riso sushi: cuoci e condisci con aceto di riso, zucchero e sale.','Marina il tonno nella salsa 10 min.','Dividi il riso in 2 bowl.','Disponi tonno, avocado ed edamame in sezioni.','Guarnisci con sesamo, cipollotto e striscioline di nori.']},
  {id:'nz26',name:'Frittelle di Avena e Mela',ico:'🥞',tags:['colazione','spuntino'],time:'15 min',kcal:260,p:12,c:36,g:7,diff:'Facilissimo',alimenti:['avena','mele','uova','yogurt greco','cannella','miele'],desc:'Frittelle soffici senza farina. La mela grattugiata le rende umide e dolci naturalmente.',ingredienti:['80g fiocchi avena frullati','1 mela grattugiata (con la buccia)','2 uova','50g yogurt greco','1 cucchiaino cannella','1 cucchiaino lievito','Miele per servire'],steps:['Mescola avena frullata, uova, yogurt, mela grattugiata, cannella e lievito.','Lascia riposare 2 min: il composto si addensa.','Scalda padella antiaderente a fuoco medio-basso con velo di olio.','Versa cucchiaiate di impasto. Cuoci 2 min per lato.','Servi con un filo di miele.']},
  {id:'nz27',name:'Minestra di Farro e Verdure Estive',ico:'🥣',tags:['pranzo','cena','veg','meal-prep'],time:'30 min',kcal:320,p:12,c:52,g:6,diff:'Facile',alimenti:['farro','pomodori','zucchine','fagiolini','basilico','aglio','olio EVO'],desc:'La minestra fredda estiva: ottima calda e ancora migliore il giorno dopo a temperatura ambiente.',ingredienti:['100g farro perlato','200g pomodori maturi a cubetti','1 zucchina a cubetti','80g fagiolini','2 spicchi aglio','Basilico fresco abbondante','Brodo vegetale 600ml','Olio EVO','Sale'],steps:['Porta il brodo a bollore con aglio.','Aggiungi il farro. Cuoci 15 min.','Aggiungi fagiolini e cuoci 5 min.','Aggiungi zucchine e pomodori. Cuoci 8 min.','Spegni. Aggiungi basilico abbondante e olio a crudo.']},
  {id:'nz28',name:'Cous Cous di Cavolfiore con Gamberi',ico:'🍤',tags:['cena','definizione'],time:'20 min',kcal:280,p:30,c:18,g:8,diff:'Facile',alimenti:['cavolfiore','gamberoni','pomodorini','aglio','prezzemolo','limone','curcuma'],desc:'Il cavolfiore tritato diventa couscous: metà delle calorie, stessa soddisfazione.',ingredienti:['400g cavolfiore','150g gamberoni','100g pomodorini','3 spicchi aglio','Prezzemolo abbondante','Succo di limone','Curcuma 1 cucchiaino','Olio EVO','Sale'],steps:['Trita il cavolfiore nel robot fino a ottenere granuli simili al couscous.','Rosola in padella con olio e curcuma 5 min. Metti da parte.','Nella stessa padella cuoci aglio 1 min, aggiungi gamberoni 2 min per lato.','Aggiungi pomodorini e cuoci 2 min.','Combina cavolfiore e gamberi. Prezzemolo e limone. Servi subito.']},
  {id:'nz29',name:'Omelette Soufflé Proteica',ico:'🥚',tags:['colazione','cena','rapido','definizione'],time:'10 min',kcal:250,p:26,c:4,g:14,diff:'Media',alimenti:['uova','albumi','ricotta','erba cipollina','salmone affumicato'],desc:'La versione soufflee dell omelette: albumi montati = volume doppio, macro identici.',ingredienti:['2 uova intere','3 albumi','2 cucchiai ricotta magra','60g salmone affumicato','Erba cipollina','Sale, pepe bianco'],steps:['Separa tuorli e albumi. Monta gli albumi a neve ferma con un pizzico di sale.','Mescola tuorli con ricotta, sale e pepe.','Incorpora gli albumi montati ai tuorli con movimenti delicati dal basso verso l alto.','Versa in padella antiaderente calda. Cuoci 2 min coperchia.','Aggiungi salmone ed erba cipollina. Piega a meta e servi subito.']},
  {id:'nz30',name:'Zuppa di Pollo e Orzo Terapeutica',ico:'🍲',tags:['cena','massa','meal-prep'],time:'35 min',kcal:380,p:36,c:38,g:8,diff:'Facile',alimenti:['pollo','orzo','carote','sedano','cipolla','aglio','rosmarino','brodo di pollo'],desc:'La zuppa che guarisce tutto. Il brodo di pollo con orzo e la versione fitness della chicken soup.',ingredienti:['200g petto di pollo sfilacciato','80g orzo perlato','2 carote a rondelle','2 gambi sedano','1 cipolla','3 spicchi aglio','Rosmarino e alloro','Brodo di pollo 800ml','Olio EVO','Sale, pepe','Prezzemolo'],steps:['Soffriggi cipolla, sedano e aglio in olio 4 min.','Aggiungi carote, rosmarino e alloro. Cuoci 3 min.','Versa il brodo e porta a bollore.','Aggiungi orzo e cuoci 20 min.','Aggiungi il pollo sfilacciato. Regola di sale. Prezzemolo abbondante.']},

  // ══════════════════════════════════════════════════════════════
  // 🍰 DOLCI FIT — Soddisfa la voglia di dolce senza sensi di colpa
  // ══════════════════════════════════════════════════════════════

  {id:'df1',name:'Torta al Cioccolato Proteica (Zero Farina)',ico:'🎂',tags:['dolci','spuntino','definizione'],time:'30 min',kcal:190,p:14,c:16,g:8,diff:'Facile',alimenti:['uova','cacao amaro','yogurt greco','ricotta','miele','cioccolato fondente'],desc:'La torta al cioccolato che puoi mangiare senza sensi di colpa. Zero farina, zero zucchero aggiunto, 14g di proteine a fetta.',ingredienti:['4 uova','3 cucchiai cacao amaro 100%','200g ricotta magra','100g yogurt greco 0%','3 cucchiai miele o sciroppo dacero','1 cucchiaino lievito','Vaniglia','Pizzico di sale','50g cioccolato fondente 85% tritato grossolanamente'],steps:['Preriscalda forno a 170°C. Fodera una teglia da 20cm.','Sbatti uova con miele e vaniglia per 2 minuti fino a che schiumano.','Aggiungi ricotta e yogurt. Mescola fino a crema liscia.','Incorpora cacao, lievito e sale setacciati.','Aggiungi il cioccolato tritato. Versa in teglia. Cuoci 22-25 min. Il centro deve essere leggermente mosso. Raffredda completamente prima di tagliare.']},

  {id:'df2',name:'Cookies Proteici al Burro di Arachidi',ico:'🍪',tags:['dolci','spuntino','pre-workout','massa'],time:'20 min',kcal:160,p:9,c:14,g:7,diff:'Facilissimo',alimenti:['burro di arachidi','uova','miele','avena','cioccolato fondente','vaniglia'],desc:'4 ingredienti, 12 minuti in forno. I cookies più veloci e sani del mondo.',ingredienti:['200g burro di arachidi naturale (solo arachidi)','2 uova','3 cucchiai miele','1 cucchiaino vaniglia','60g fiocchi avena frullati','1 cucchiaino lievito','50g cioccolato fondente 85% a scaglie','Pizzico di sale'],steps:['Preriscalda forno a 175°C. Fodera una teglia.','Mescola burro di arachidi, uova, miele e vaniglia.','Aggiungi avena frullata, lievito e sale.','Incorpora le scaglie di cioccolato.','Forma 12 palline, appiattisci con la forchetta. Cuoci 10-12 min. Sembrano morbidi: si compattano raffreddandosi.']},

  {id:'df3',name:'Cheesecake al Limone senza Cottura',ico:'🍋',tags:['dolci','definizione','spuntino'],time:'20 min',kcal:200,p:16,c:18,g:6,diff:'Facile',alimenti:['yogurt greco','ricotta','limone','miele','biscotti avena','gelatina'],desc:'Fresca, leggera, proteica. La cheesecake estiva per eccellenza. Prepara la sera, pronta al mattino.',ingredienti:['Base: 80g fiocchi avena frullati + 20g burro fuso + 1 cucchiaio miele','Crema: 250g ricotta magra + 150g yogurt greco 0% + scorza e succo di 2 limoni + 3 cucchiai miele + 2 fogli gelatina + 50ml latte caldo','Topping: frutti di bosco o composta'],steps:['Base: mescola avena, burro e miele. Pressa in teglia da 18cm. Frigo 15 min.','Ammolla la gelatina in acqua fredda 5 min. Scioglila nel latte caldo.','Frulla ricotta, yogurt, scorza limone, succo e miele a crema liscia.','Incorpora il latte con gelatina. Versa sulla base.','Frigo minimo 4 ore (meglio tutta la notte). Decora con frutti di bosco.']},

  {id:'df4',name:'Brownies Proteici al Cioccolato e Fagioli',ico:'🍫',tags:['dolci','spuntino','massa'],time:'35 min',kcal:175,p:8,c:22,g:5,diff:'Facile',alimenti:['fagioli neri','cacao amaro','uova','miele','burro di mandorle','cioccolato fondente'],desc:'I brownies con i fagioli neri. Sembrano normali, hanno il doppio delle proteine. Nessuno lo indovinerà.',ingredienti:['400g fagioli neri in scatola (scolati e sciacquati)','3 cucchiai cacao amaro','2 uova','4 cucchiai miele','60g burro di mandorle','1 cucchiaino lievito','Vaniglia','Pizzico di sale','50g cioccolato fondente 85% a scaglie'],steps:['Preriscalda forno a 180°C. Fodera teglia 20x20cm.','Frulla fagioli, uova, miele, burro di mandorle, cacao, lievito e vaniglia a crema liscia.','Incorpora il cioccolato a scaglie con una spatola.','Versa in teglia. Cuoci 20-22 min. Il centro deve essere leggermente morbido.','Raffredda 30 min PRIMA di tagliare. Conserva in frigo 5 giorni.']},

  {id:'df5',name:'Tiramisù Proteico Senza Zucchero',ico:'☕',tags:['dolci','spuntino','definizione'],time:'25 min',kcal:220,p:18,c:18,g:6,diff:'Media',alimenti:['yogurt greco','ricotta','caffè','savoiardi','cacao amaro','miele','albumi'],desc:'Il tiramisù che non sabota la dieta. La crema al mascarpone sostituita da ricotta+yogurt: stessa cremosità, metà dei grassi.',ingredienti:['Crema: 250g ricotta magra + 200g yogurt greco 0% + 3 cucchiai miele + scorza limone + vaniglia','Bagna: 200ml caffè espresso freddo + 1 cucchiaio rum (opzionale)','16-20 savoiardi (o biscotti avena)','Cacao amaro per spolverare'],steps:['Frulla ricotta, yogurt, miele e vaniglia a crema liscia e senza grumi.','Immergi rapidamente i savoiardi nel caffè freddo (1 secondo per lato, non imbibire troppo).','Strato di savoiardi in una teglia 20x20. Metà crema. Altro strato savoiardi. Altra crema.','Copri con pellicola. Frigo minimo 4 ore (tutta la notte è meglio).','Spolvera di cacao amaro abbondante solo prima di servire.']},

  {id:'df6',name:'Gelato alla Fragola Senza Lattosio',ico:'🍓',tags:['dolci','spuntino','definizione'],time:'10 min',kcal:140,p:10,c:22,g:1,diff:'Facilissimo',alimenti:['fragole','yogurt greco','miele','banana','whey vaniglia'],desc:'Solo frullatore e freezer. Zero panna, zero zucchero. La banana congelata crea la consistenza cremosa.',ingredienti:['300g fragole congelate','2 banane congelate a pezzi','100g yogurt greco 0%','20g whey vaniglia','1 cucchiaio miele','Succo di 1/2 limone'],steps:['Tutti gli ingredienti nel frullatore potente.','Frulla 60 sec pulsando: prima sembra granulare, poi diventa cremoso.','Per soft-serve: consuma subito.','Per gelato solido: versa in contenitore e congela 2 ore. Rifrulla prima di servire.','Decorare con fragole fresche e foglioline di menta.']},

  {id:'df7',name:'Mug Cake Proteica al Cioccolato (2 minuti)',ico:'☕',tags:['dolci','spuntino','rapido','massa'],time:'3 min',kcal:250,p:22,c:20,g:8,diff:'Facilissimo',alimenti:['uova','cacao amaro','yogurt greco','miele','whey cioccolato','lievito'],desc:'La torta più veloce del mondo: 2 minuti al microonde. Perfetta per la voglia di dolce improvvisa.',ingredienti:['1 uovo','2 cucchiai cacao amaro','20g whey cioccolato','2 cucchiai yogurt greco','1 cucchiaio miele','1/4 cucchiaino lievito','Pizzico di sale','Gocce di cioccolato fondente (opzionale)'],steps:['Mescola tutti gli ingredienti in una tazza capiente.','Aggiungi un cucchiaio di latte se troppo denso.','Microonde a potenza massima 90 secondi.','Controlla: deve essere ancora leggermente umido al centro.','Mangia direttamente dalla tazza. Aggiungi un cucchiaio di yogurt greco sopra.']},

  {id:'df8',name:'Panna Cotta al Cocco con Mango',ico:'🥥',tags:['dolci','definizione','spuntino'],time:'15 min',kcal:170,p:12,c:20,g:4,diff:'Facile',alimenti:['latte di cocco','yogurt greco','gelatina','miele','mango','vaniglia'],desc:'Esotica, fresca e proteica. Il contrasto cocco freddo-mango caldo è irresistibile.',ingredienti:['200ml latte di cocco light','150g yogurt greco 0%','2 fogli gelatina (4g)','2 cucchiai miele','Vaniglia','Coulis: 150g mango fresco + succo di lime + 1 cucchiaino miele'],steps:['Ammolla la gelatina in acqua fredda 5 min.','Scalda il latte di cocco con il miele senza far bollire. Scioglie la gelatina.','Frulla yogurt con vaniglia. Aggiungi latte di cocco e mescola.','Versa in 4 bicchieri o stampi da budino. Frigo 3 ore minimo.','Coulis: frulla mango con lime e miele. Versa sulla panna cotta fredda prima di servire.']},

  {id:'df9',name:'Crostata Fit con Marmellata Senza Zucchero',ico:'🥧',tags:['dolci','colazione','spuntino'],time:'40 min',kcal:210,p:10,c:26,g:7,diff:'Media',alimenti:['farina di avena','uova','yogurt greco','miele','marmellata','mandorle'],desc:'La crostata sana che puoi mangiare anche a colazione. La pasta frolla con avena e yogurt invece di burro.',ingredienti:['Frolla: 200g farina avena frullata + 2 uova + 60g yogurt greco + 2 cucchiai miele + vaniglia + pizzico di sale','Ripieno: 200g marmellata ai frutti di bosco senza zucchero aggiunto','20g mandorle a lamelle per decorare'],steps:['Preriscalda forno a 175°C.','Mescola farina di avena, uova, yogurt, miele e vaniglia a impasto omogeneo.','Stendi 3/4 dell impasto in teglia 22cm rivestita di carta forno.','Distribuisci la marmellata lasciando 1cm dal bordo.','Crea le strisce della griglia con il rimanente impasto. Aggiungi mandorle. Cuoci 25-28 min finché dorata.']},

  {id:'df10',name:'Mousse di Ricotta e Frutti di Bosco',ico:'🫐',tags:['dolci','definizione','spuntino'],time:'10 min',kcal:160,p:14,c:16,g:3,diff:'Facilissimo',alimenti:['ricotta','yogurt greco','frutti di bosco','miele','vaniglia','limone'],desc:'Dessert in 10 minuti. La consistenza mousse si ottiene frullando ricotta e yogurt insieme.',ingredienti:['300g ricotta magra','100g yogurt greco 0%','2 cucchiai miele','Scorza di 1 limone','Vaniglia','200g frutti di bosco misti (fragole, mirtilli, lamponi, more)','Foglioline di menta'],steps:['Frulla ricotta, yogurt, miele, scorza limone e vaniglia fino a crema liscia e ariosa.','Versa in 4 bicchieri.','Disponi i frutti di bosco sopra in modo generoso.','Frigo almeno 30 min per una consistenza più compatta.','Guarnisci con menta e un filo di miele prima di servire.']},

  {id:'df11',name:'Truffles al Cioccolato e Datteri',ico:'🍫',tags:['dolci','spuntino','pre-workout','veg'],time:'15 min',kcal:130,p:4,c:18,g:5,diff:'Facilissimo',alimenti:['datteri','cacao amaro','burro di mandorle','noci','cocco rapé','vaniglia'],desc:'Dolcificati solo con datteri. Ricarica di energia naturale senza picco glicemico.',ingredienti:['200g datteri Medjool denocciolati','3 cucchiai burro di mandorle','2 cucchiai cacao amaro','30g noci tritate','Vaniglia','Pizzico di sale marino','Copertura: 3 cucchiai cacao amaro O cocco rapé OR noci tritate'],steps:['Ammolla i datteri in acqua calda 5 min se sono secchi.','Frulla datteri, burro di mandorle, cacao, vaniglia e sale a pasta omogenea.','Aggiungi noci tritate grossolanamente e mescola.','Metti in frigo 20 min per rassodarsi.','Forma palline da 20g e rotolale nella copertura scelta. Conserva in frigo 2 settimane.']},

  {id:'df12',name:'Tarte Tatin di Mele Fit',ico:'🍎',tags:['dolci','spuntino','colazione'],time:'45 min',kcal:230,p:8,c:32,g:7,diff:'Media',alimenti:['mele','uova','farina di avena','yogurt greco','miele','cannella','burro'],desc:'La tarte tatin francese rivisitata in chiave fit. Le mele caramellate naturalmente con il miele.',ingredienti:['4 mele golden pelate e a spicchi','Pasta: 150g farina avena + 2 uova + 50g yogurt greco + 2 cucchiai miele + vaniglia','Caramello fit: 3 cucchiai miele + 1/2 cucchiaino cannella + 5g burro'],steps:['Preriscalda forno 180°C. In teglia antiaderente da forno, scalda miele, burro e cannella sul fornello.','Disponi le mele a raggiera nel caramello. Cuoci sul fornello 5 min.','Prepara la pasta mescolando gli ingredienti fino a impasto morbido.','Stendi la pasta sulle mele. Rimbocca i bordi sotto le mele.','Forno 25 min. Raffredda 5 min PRIMA di capovolgerla sul piatto.']},

  {id:'df13',name:'Budino di Avena al Cioccolato Fondente',ico:'🍮',tags:['dolci','colazione','spuntino'],time:'10 min',kcal:280,p:16,c:36,g:8,diff:'Facile',alimenti:['avena','latte','cacao amaro','whey','cioccolato fondente','miele','banana'],desc:'A metà tra porridge e budino. Caldo, cremoso, cioccolatoso. Colazione o dessert.',ingredienti:['70g fiocchi avena','250ml latte scremato o mandorla','1 cucchiaio cacao amaro','20g whey cioccolato','1 cucchiaio miele','1/2 banana schiacciata','30g cioccolato fondente 85% tritato','Pizzico di sale'],steps:['Cuoci avena nel latte a fuoco medio per 4 min mescolando.','Togli dal fuoco. Aggiungi cacao, whey e banana schiacciata.','Mescola energicamente fino a crema densa.','Aggiungi miele e mescola.','Versa in una bowl. Disponi il cioccolato tritato sopra: il calore lo fonde parzialmente.']},

  {id:'df14',name:'Croissant Proteico (Senza Burro)',ico:'🥐',tags:['dolci','colazione','massa'],time:'50 min',kcal:200,p:14,c:22,g:5,diff:'Difficile',alimenti:['farina di avena','yogurt greco','uova','ricotta','miele','lievito'],desc:'Il croissant proteico. La texture non è identica all originale, ma è la versione più sana possibile.',ingredienti:['180g farina avena frullata fine','100g yogurt greco','1 uovo + 1 tuorlo','40g ricotta magra','1 cucchiaio miele','1 cucchiaino lievito istantaneo','Vaniglia','Pizzico di sale','1 tuorlo per spennellare'],steps:['Mescola farina, lievito e sale. Aggiungi yogurt, uovo, ricotta, miele e vaniglia.','Impasta fino a ottenere un panetto liscio. Frigo 20 min.','Stendi a cerchio. Taglia 8 triangoli come pizza.','Arrotola ogni triangolo dalla base verso la punta. Forma a mezzaluna.','Spennella con tuorlo. Forno 180°C per 16-18 min finché dorati.']},

  {id:'df15',name:'Donuts Proteici al Forno',ico:'🍩',tags:['dolci','colazione','massa'],time:'25 min',kcal:180,p:12,c:20,g:5,diff:'Facile',alimenti:['farina di avena','uova','yogurt greco','whey vaniglia','miele','latte','cioccolato fondente'],desc:'I donuts al forno che sembrano fritti. Stampo specifico necessario, ma il risultato è spettacolare.',ingredienti:['130g farina avena frullata','30g whey vaniglia','2 uova','100g yogurt greco','2 cucchiai miele','50ml latte','1 cucchiaino lievito','Glassa: 50g cioccolato fondente 85% fuso + 1 cucchiaio olio cocco'],steps:['Preriscalda forno a 180°C. Ungi lo stampo per donuts.','Mescola ingredienti secchi (farina, whey, lievito).','Mescola ingredienti umidi (uova, yogurt, miele, latte).','Combina tutto fino a pastella omogenea. Versa nello stampo riempiendo 3/4.','Cuoci 12 min. Raffredda 5 min. Immergi la superficie nella glassa al cioccolato fuso.']},

  {id:'df16',name:'Crème Brûlée Proteica',ico:'🔥',tags:['dolci','definizione','spuntino'],time:'60 min',kcal:180,p:16,c:14,g:5,diff:'Media',alimenti:['yogurt greco','uova','latte','miele','vaniglia'],desc:'L effetto caramellato si ottiene con un cannello da cucina. Dessert da ristorante a casa.',ingredienti:['300g yogurt greco 0%','2 uova intere + 2 tuorli','150ml latte scremato','3 cucchiai miele','1 stecca vaniglia (o estratto)','4 cucchiaini zucchero di canna per caramellare'],steps:['Preriscalda forno a 150°C. Prepara un bagnomaria.','Sbatti yogurt, uova, tuorli, latte, miele e vaniglia senza fare schiuma.','Versa in 4 cocotte da 120ml.','Cuoci a bagnomaria 35-40 min finché tremolano ma non liquide.','Raffredda, poi frigo 2 ore. Prima di servire: cospargi zucchero, caramella con cannello.']},

  {id:'df17',name:'Barrette Energy Cocco e Limone',ico:'🍋',tags:['dolci','spuntino','pre-workout'],time:'15 min',kcal:145,p:6,c:16,g:6,diff:'Facilissimo',alimenti:['avena','cocco rapé','limone','miele','burro di mandorle','semi di chia'],desc:'Fresche, energizzanti, senza cottura. 8 barrette in 15 minuti più 1 ora di frigo.',ingredienti:['130g fiocchi avena frullati','40g cocco rapé non zuccherato','Scorza e succo di 2 limoni','3 cucchiai miele','50g burro di mandorle','1 cucchiaio semi di chia','Pizzico di sale'],steps:['Mescola tutti gli ingredienti in una ciotola.','Il composto deve essere compatto: aggiungi cucchiai di latte se troppo secco.','Versa in stampo 20x10cm rivestito di carta forno. Pressa bene.','Frigo 1 ora minimo.','Taglia in 8 barrette. Conserva in frigo 10 giorni o freezer 1 mese.']},

  {id:'df18',name:'Parfait di Yogurt e Granola',ico:'🫙',tags:['dolci','colazione','spuntino','definizione'],time:'5 min',kcal:280,p:18,c:34,g:8,diff:'Facilissimo',alimenti:['yogurt greco','granola','frutti di bosco','miele','semi di chia'],desc:'Il dolce che puoi mangiare a colazione. Stratificato in bicchiere trasparente, sembra uscito da un bar.',ingredienti:['200g yogurt greco 0%','30g granola integrale (vedi ricetta nx19)','100g frutti di bosco misti','1 cucchiaio miele','1 cucchiaino semi di chia'],steps:['Versa metà yogurt in un bicchiere largo.','Strato di granola.','Metà frutti di bosco.','Altro yogurt, altra granola, altri frutti.','Finisci con miele e semi di chia. Consuma subito per la granola croccante o prepara la sera senza granola (aggiungila al mattino).']},

  {id:'df19',name:'Semifreddo Proteico al Pistacchio',ico:'🍦',tags:['dolci','definizione','spuntino'],time:'20 min',kcal:210,p:16,c:18,g:8,diff:'Media',alimenti:['yogurt greco','ricotta','pistacchi','miele','albumi','vaniglia'],desc:'Il semifreddo italiano in versione fitness. Texture morbida grazie agli albumi montati.',ingredienti:['200g yogurt greco 0%','150g ricotta magra','60g pistacchi non salati tritati finemente','3 cucchiai miele','3 albumi','Vaniglia','Pizzico di sale'],steps:['Frulla yogurt, ricotta e miele a crema liscia. Incorpora i pistacchi tritati.','Monta gli albumi a neve fermissima con un pizzico di sale.','Incorpora gli albumi al composto con movimenti delicati dal basso verso l alto.','Versa in uno stampo da plumcake rivestito di pellicola.','Congela 4 ore. Tira fuori 10 min prima di servire. Taglia a fette.']},

  {id:'df20',name:'Torta di Carote Proteica',ico:'🥕',tags:['dolci','colazione','spuntino','massa'],time:'45 min',kcal:200,p:12,c:22,g:7,diff:'Facile',alimenti:['carote','uova','farina di avena','yogurt greco','miele','noci','cannella'],desc:'La torta di carote è già fit per natura. Questa versione ha 12g di proteine a fetta.',ingredienti:['200g carote grattugiate finemente','3 uova','150g farina avena frullata','100g yogurt greco','3 cucchiai miele','40g noci tritate','1 cucchiaino cannella','1/2 cucchiaino zenzero in polvere','1 cucchiaino lievito','Vaniglia','Topping: 100g ricotta + 1 cucchiaio miele + scorza limone'],steps:['Preriscalda forno a 175°C. Fodera uno stampo da 20cm.','Sbatti uova e miele 2 min. Aggiungi yogurt e vaniglia.','Incorpora farina setacciata, lievito e spezie.','Aggiungi carote grattugiate e noci. Mescola con spatola.','Cuoci 30-35 min. Raffredda completamente. Distribuisci il topping di ricotta sulla superficie.']},

  {id:'df21',name:'Frullato Proteico Stile Milkshake Oreo',ico:'🥛',tags:['dolci','post-workout','spuntino','massa'],time:'5 min',kcal:320,p:28,c:32,g:8,diff:'Facilissimo',alimenti:['yogurt greco','latte','whey vaniglia','banana','cacao amaro','biscotti avena'],desc:'Il post-workout che sembra un dessert da bar. Tutti i macro al posto giusto.',ingredienti:['200g yogurt greco 0%','150ml latte scremato','30g whey vaniglia','1 banana congelata','1 cucchiaio cacao amaro','4 cubetti ghiaccio','2 biscotti avena sbriciolati per decorare'],steps:['Metti yogurt, latte, whey, banana e ghiaccio nel frullatore.','Frulla 30 secondi ad alta potenza.','Assaggia: se vuoi più dolce aggiungi miele, se vuoi più cioccolato aggiungi cacao.','Versa in un bicchiere alto.','Spolvera i biscotti sbriciolati sopra. Bevi subito.']},

  {id:'df22',name:'Crespelle Dolci alla Ricotta e Marmellata',ico:'🫔',tags:['dolci','colazione','spuntino'],time:'20 min',kcal:220,p:14,c:26,g:5,diff:'Facile',alimenti:['uova','ricotta','farina di avena','latte','marmellata','miele'],desc:'Le crepes dolci fit. Sottili, morbide, con ripieno di ricotta e frutta.',ingredienti:['Pastella: 2 uova + 150ml latte scremato + 50g farina avena frullata + vaniglia + pizzico di sale','Ripieno: 200g ricotta magra + 1 cucchiaio miele + scorza limone','Marmellata di frutti di bosco senza zucchero aggiunto q.b.'],steps:['Frulla tutti gli ingredienti della pastella fino a ottenere una pastella liscia.','Lascia riposare 5 min.','Cuoci le crespelle in padella piccola antiaderente, 1 min per lato.','Mescola ricotta, miele e scorza limone.','Farcisci ogni crespella con ricotta e un cucchiaio di marmellata. Piega in quarti.']},

  {id:'df23',name:'Lava Cake Proteico al Cioccolato',ico:'🎂',tags:['dolci','spuntino','massa'],time:'25 min',kcal:270,p:20,c:20,g:10,diff:'Media',alimenti:['cioccolato fondente','uova','yogurt greco','farina di avena','miele','cacao amaro'],desc:'Il cuore fondente che cola. Tecnica semplice se rispetti i tempi di cottura.',ingredienti:['80g cioccolato fondente 85%','2 uova + 1 tuorlo','2 cucchiai yogurt greco','1 cucchiaio farina avena frullata','1 cucchiaio miele','Cacao per spolverare gli stampini'],steps:['Preriscalda forno a 200°C. Ungi 2 stampini rotondi e spolverali di cacao.','Sciogli il cioccolato a bagnomaria o microonde 30 sec.','Sbatti uova, tuorlo e miele. Aggiungi yogurt.','Incorpora il cioccolato fuso. Aggiungi farina.','Versa negli stampini. ESATTAMENTE 10-11 min in forno. Il bordo deve essere solido, il centro mosso. Capovolgi subito sul piatto.']},

  {id:'df24',name:'Biscotti alla Cannella e Avena (Senza Burro)',ico:'🍪',tags:['dolci','colazione','spuntino','meal-prep'],time:'25 min',kcal:120,p:5,c:16,g:4,diff:'Facilissimo',alimenti:['avena','uova','mele','miele','cannella','noci','uvetta'],desc:'Biscotti morbidi stile americano. Senza burro, senza farina raffinata. 16 biscotti in 25 min.',ingredienti:['200g fiocchi avena grandi','1 uovo','1 mela grattugiata','3 cucchiai miele','1 cucchiaino cannella abbondante','30g noci tritate','30g uvetta','1 cucchiaino lievito','Vaniglia'],steps:['Preriscalda forno a 175°C. Fodera teglia.','Mescola tutti gli ingredienti in una ciotola. Il composto è morbido e appiccicoso.','Lascia riposare 3 min: l avena assorbe la mela.','Forma 16 palline, appiattisci leggermente.','Cuoci 12-14 min finché i bordi sono dorati. Al tatto sembrano morbidi, si compattano raffreddandosi.']},

  {id:'df25',name:'Cheesecake Proteica ai Frutti di Bosco (al Forno)',ico:'🫐',tags:['dolci','spuntino','definizione'],time:'55 min',kcal:195,p:16,c:18,g:5,diff:'Media',alimenti:['ricotta','yogurt greco','uova','miele','frutti di bosco','farina di avena','vaniglia'],desc:'La cheesecake cotta: più simile all originale newyorkese. Soda fuori, cremosa dentro.',ingredienti:['Base: 80g avena frullata + 20g burro fuso + 1 cucchiaio miele','Ripieno: 400g ricotta magra + 150g yogurt greco + 3 uova + 4 cucchiai miele + scorza di 2 limoni + vaniglia + 1 cucchiaio farina avena','Topping: 150g frutti di bosco + 1 cucchiaio miele'],steps:['Preriscalda forno a 160°C. Teglia a cerchio apribile da 20cm.','Base: mescola avena, burro e miele. Pressa. Frigo.','Ripieno: frulla ricotta, yogurt, uova, miele, scorza limone e vaniglia. Aggiunge farina.','Versa sulla base. Cuoci a bagnomaria 40-45 min finché il bordo è solido.','Raffredda in forno spento con porta aperta 30 min. Frigo 4 ore. Coulis di frutti di bosco sopra.']},

  // ══════════════════════════════════════════════════════════════
  // 🍽️ NUOVE RICETTE PRINCIPALI — Varietà per tutti
  // ══════════════════════════════════════════════════════════════

  {id:'extra1',name:'Tacos Proteici di Manzo e Avocado',ico:'🌮',tags:['cena','pranzo','massa'],time:'20 min',kcal:480,p:36,c:36,g:18,diff:'Facile',alimenti:['manzo macinato','tortilla di mais','avocado','cipolla','lime','pomodori','yogurt greco'],desc:'I tacos fitness: tortilla di mais, macinato magro e avocado. Soddisfazione garantita.',ingredienti:['200g manzo macinato magro 5%','4 tortillas di mais piccole','1 avocado','100g pomodorini a dadini','1/4 cipolla rossa','Lime','Coriandolo','Mix spezie: cumino + paprika + aglio + peperoncino','Yogurt greco come crema acida'],steps:['Rosola il macinato spezzandolo con una forchetta 6-7 min.','Aggiungi spezie e 2 cucchiai di acqua. Cuoci 2 min a glassa.','Scalda le tortillas in padella asciutta 20 sec per lato.','Guacamole rapido: avocado schiacciato + lime + sale.','Assembla: tortilla + macinato + guacamole + pomodori + cipolla + coriandolo + yogurt.']},

  {id:'extra2',name:'Polpo alla Griglia con Patate',ico:'🐙',tags:['cena','definizione','pranzo'],time:'40 min',kcal:360,p:38,c:28,g:8,diff:'Media',alimenti:['polpo','patate','limone','prezzemolo','aglio','olio EVO'],desc:'Pesce alto in proteine, quasi zero grassi. La pre-cottura a fuoco dolce è il segreto.',ingredienti:['400g polpo (già cotto o fresco)','300g patate lesse','Succo e scorza di 1 limone','Prezzemolo abbondante','3 spicchi aglio','30ml olio EVO','Paprika affumicata','Sale, pepe nero'],steps:['Se il polpo è crudo: cuoci in acqua bollente 35-40 min finché morbido.','Taglia il polpo a pezzi. Asciuga bene.','Griglia su padella caldissima 2-3 min per lato per la crosta esterna.','Patate lesse tagliate a cubetti, condite con olio, limone, aglio e prezzemolo.','Servi polpo sulle patate con altra limone e paprika affumicata.']},

  {id:'extra3',name:'Pesto Rosso con Pasta Integrale e Ricotta',ico:'🍝',tags:['pranzo','cena','massa','veg'],time:'20 min',kcal:490,p:24,c:62,g:14,diff:'Facile',alimenti:['pasta integrale','pomodori secchi','ricotta','basilico','pinoli','parmigiano','aglio'],desc:'Il pesto rosso è più ricco di licopene del verde. Con la ricotta diventa cremoso e proteico.',ingredienti:['90g pasta integrale','Pesto rosso: 60g pomodori secchi + 30g basilico + 20g pinoli + 20g parmigiano + 2 spicchi aglio + 30ml olio EVO','2 cucchiai ricotta magra','Sale, pepe nero'],steps:['Frulla pomodori secchi, basilico, pinoli, parmigiano, aglio e olio a pesto grossolano.','Cuoci pasta al dente. Tieni 3 cucchiai acqua di cottura.','Scola pasta. Aggiungi pesto rosso e acqua di cottura.','Manteca. Aggiungi ricotta a tocchetti fuori dal fuoco.','Mescola con delicatezza. Parmigiano extra se vuoi.']},

  {id:'extra4',name:'Risotto al Limone e Gamberi',ico:'🍚',tags:['cena','pranzo','definizione'],time:'30 min',kcal:420,p:32,c:48,g:8,diff:'Media',alimenti:['riso arborio','gamberi','limone','vino bianco','cipolla','brodo pesce','parmigiano'],desc:'Il risotto che sembra pesante ma non lo è. Gamberi e limone lo rendono leggero e aromatico.',ingredienti:['80g riso arborio','150g gamberi sgusciati','Scorza e succo di 1 limone','50ml vino bianco','1/2 cipolla','400ml brodo di pesce caldo','20g parmigiano','Sale, pepe','Prezzemolo'],steps:['Soffriggi la cipolla 3 min. Aggiungi riso e tosta 2 min.','Sfuma con vino bianco. Quando evaporato, inizia ad aggiungere brodo caldo un mestolo alla volta.','Continua mescolando e aggiungendo brodo per 16-18 min.','Ultimi 3 min: aggiungi i gamberi e la scorza di limone.','Fuori fuoco: succo di limone, parmigiano e prezzemolo. Manten cremoso.']},

  {id:'extra5',name:'Pollo al Forno con Verdure Mediterranee',ico:'🍗',tags:['cena','massa','meal-prep'],time:'45 min',kcal:400,p:46,c:20,g:12,diff:'Facile',alimenti:['pollo','melanzane','zucchine','peperoni','pomodorini','olive','aglio','rosmarino'],desc:'Il pasto completo in una teglia. Tutto insieme in forno, zero sforzo.',ingredienti:['300g coscia di pollo disossata senza pelle','1 melanzana','2 zucchine','1 peperone','100g pomodorini','30g olive kalamata','4 spicchi aglio','Rosmarino, origano','30ml olio EVO','Sale, pepe nero'],steps:['Preriscalda forno a 200°C.','Taglia tutte le verdure a pezzi simili.','Disponi pollo e verdure in teglia grande. Non sovrapporre.','Condisci tutto con olio, aglio, rosmarino, origano, sale e pepe.','Cuoci 35-38 min girando le verdure a metà. Il pollo deve raggiungere 74°C al cuore.']},

  {id:'extra6',name:'Sushi Bowl Proteica',ico:'🍣',tags:['pranzo','cena','definizione'],time:'25 min',kcal:450,p:34,c:46,g:10,diff:'Facile',alimenti:['riso','salmone','tonno','avocado','cetriolo','sesamo','salsa di soia','zenzero'],desc:'Il sushi senza arrotolare. Tutti i sapori in una bowl. Con il riso caldo è ancora meglio.',ingredienti:['120g riso per sushi cotto e condito (aceto di riso + miele + sale)','100g salmone fresco a cubetti','80g tonno fresco a cubetti','1/2 avocado','1/2 cetriolo','20g edamame','Zenzero sott aceto','Salsa: soia + wasabi + olio sesamo'],steps:['Cuoci e condisci il riso con aceto di riso, miele e sale.','Prepara la salsa mescolando soia, wasabi e olio sesamo.','Assembla: riso tiepido come base.','Disponi salmone, tonno, avocado, cetriolo ed edamame in sezioni separate.','Versa la salsa. Aggiungi sesamo, cipollotto e zenzero.']},

  {id:'extra7',name:'Frittata di Pasta Integrale e Verdure',ico:'🍳',tags:['pranzo','cena','veg','meal-prep'],time:'25 min',kcal:380,p:26,c:42,g:10,diff:'Facile',alimenti:['pasta integrale','uova','albumi','zucchine','cipolla','parmigiano'],desc:'La frittata di pasta napoletana in versione fit. Il pasto del lunedi con gli avanzi del weekend.',ingredienti:['150g pasta integrale cotta avanzata','3 uova + 2 albumi','1 zucchina a dadini','1/2 cipolla','30g parmigiano','Sale, pepe','Origano','Olio EVO'],steps:['Rosola cipolla e zucchina in padella da forno 4 min.','Sbatti uova e albumi con parmigiano, sale, pepe e origano.','Aggiungi la pasta fredda alla padella con le verdure.','Versa le uova sbattute. Cuoci a fuoco dolce 5 min senza mescolare.','Trasferisci in forno a 180°C per 8-10 min finché la superficie è dorata.']},

  {id:'extra8',name:'Spezzatino di Manzo con Ceci',ico:'🍲',tags:['cena','massa','meal-prep'],time:'50 min',kcal:440,p:44,c:28,g:14,diff:'Media',alimenti:['manzo a spezzatino','ceci','carote','sedano','cipolla','pomodori','rosmarino','vino rosso'],desc:'Piatto invernale nutriente. I ceci aggiungono fibre e proteine vegetali al manzo.',ingredienti:['300g spezzatino di manzo magro','200g ceci cotti','2 carote a rondelle','2 gambi sedano','1 cipolla','200g pomodori pelati','50ml vino rosso','Rosmarino e alloro','Brodo di carne 200ml','Olio EVO'],steps:['Asciuga la carne. Rosola a fuoco alto 5 min finché bruna su tutti i lati. Metti da parte.','Soffriggi cipolla, sedano e carote 5 min.','Sfuma con vino rosso. Aggiungi pomodori, rosmarino e alloro.','Rimetti la carne. Aggiungi brodo. Copri e cuoci a fuoco bassissimo 35 min.','Aggiungi ceci gli ultimi 10 min. Aggiusta di sale.']},

  {id:'extra9',name:'Frittura di Pesce al Forno',ico:'🐟',tags:['cena','definizione'],time:'30 min',kcal:310,p:38,c:16,g:8,diff:'Facile',alimenti:['merluzzo','calamari','gamberi','pangrattato','limone','prezzemolo','uova'],desc:'La frittura di pesce senza friggere. Pangrattato + forno + calore alto = croccantezza senza olio.',ingredienti:['150g filetto merluzzo a bocconcini','100g anelli di calamaro','100g gamberoni','Impanatura: pangrattato integrale + prezzemolo + aglio + scorza limone + sale + pepe','2 uova sbattute','Olio spray','Limone per servire'],steps:['Preriscalda forno a 220°C con griglia.','Prepara 3 piatti: uova sbattute, impanatura, e teglia con carta forno.','Passa pesce nell uovo, poi nell impanatura premendo.','Disponi sulla teglia. Spruzza generosamente con olio spray.','Cuoci 12-15 min girando a metà. Ultimi 2 min grill per croccantezza.']},

  {id:'extra10',name:'Piadina Proteica con Squacquerone e Rucola',ico:'🫓',tags:['pranzo','rapido','massa'],time:'10 min',kcal:420,p:30,c:36,g:16,diff:'Facilissimo',alimenti:['piadina integrale','squacquerone','prosciutto crudo','rucola','pomodori'],desc:'La piadina romagnola in versione fit. Con piadina integrale e meno squacquerone.',ingredienti:['1 piadina integrale grande','80g squacquerone magro','80g prosciutto crudo magro senza grasso','40g rucola fresca','4 pomodorini a fettine','Sale, olio EVO'],steps:['Scalda la piadina in padella asciutta 1 min per lato.','Spalma lo squacquerone su tutta la superficie.','Disponi il prosciutto crudo.','Aggiungi la rucola fresca e i pomodorini.','Piega a metà. Taglia in 2 e servi subito.']},

  {id:'extra11',name:'Vellutata di Zucca e Zenzero',ico:'🎃',tags:['cena','definizione','veg','meal-prep'],time:'30 min',kcal:190,p:8,c:28,g:4,diff:'Facile',alimenti:['zucca','cipolla','zenzero','latte di cocco','brodo vegetale','curcuma'],desc:'Vellutata autunnale. La zucca è ricca di betacarotene e naturalmente dolce.',ingredienti:['500g zucca mantovana a cubetti','1 cipolla','3cm zenzero fresco','1 cucchiaino curcuma','200ml latte di cocco light','Brodo vegetale 400ml','Olio EVO','Sale, pepe nero','Semi di zucca tostati per guarnire'],steps:['Soffriggi cipolla e zenzero in olio 4 min.','Aggiungi zucca e curcuma. Cuoci 5 min.','Versa il brodo. Porta a bollore. Cuoci 20 min finché la zucca è morbidissima.','Aggiungi latte di cocco. Frulla con frullatore a immersione.','Regola di sale. Servi con semi di zucca tostati e un filo di olio EVO.']},

  {id:'extra12',name:'Tagliatelle al Ragù di Cinghiale Fit',ico:'🍝',tags:['cena','massa'],time:'90 min',kcal:520,p:36,c:52,g:14,diff:'Difficile',alimenti:['cinghiale macinato','pasta integrale','carote','sedano','cipolla','pomodori','vino rosso','rosmarino'],desc:'Il ragù di cinghiale toscano in versione fit con pasta integrale. Per le occasioni speciali.',ingredienti:['300g cinghiale macinato (o spalla macinata)','90g tagliatelle integrali','Soffritto: carota, sedano, cipolla, aglio','100ml vino rosso','300g pomodori pelati','Rosmarino, alloro, bacche di ginepro','Olio EVO'],steps:['Rosola il cinghiale a fuoco alto 8 min finché ben rosolato. Sfuma con vino.','Prepara il soffritto in altra padella: carota, sedano, cipolla e aglio 6 min.','Unisci carne e soffritto. Aggiungi pomodori, rosmarino, alloro e ginepro.','Cuoci a fuoco bassissimo COPERTO 60 min mescolando ogni 15 min.','Cuoci le tagliatelle al dente. Condisci con il ragù abbondante.']},

  {id:'extra13',name:'Gnocchi di Ricotta al Pesto di Basilico',ico:'🫙',tags:['pranzo','cena','veg','massa'],time:'30 min',kcal:430,p:26,c:44,g:14,diff:'Media',alimenti:['ricotta','farina di avena','uova','parmigiano','basilico','pinoli','olio EVO'],desc:'Gnocchi leggeri: senza patate, più proteici. Il pesto classico genovese li esalta al massimo.',ingredienti:['Gnocchi: 300g ricotta ben scolata + 100g farina avena frullata + 1 uovo + 30g parmigiano + sale + noce moscata','Pesto: 40g basilico + 30g pinoli + 30g parmigiano + 60ml olio EVO + 1 spicchio aglio + sale'],steps:['Mescola ricotta, farina, uovo, parmigiano e noce moscata a impasto omogeneo. Frigo 10 min.','Frulla pesto: basilico, pinoli, parmigiano, aglio e olio. Non frullare troppo.','Forma rotolini da 2cm, taglia gnocchi da 2cm.','Cuoci in acqua salata: pronti quando salgono a galla + 30 secondi.','Salta gnocchi nel pesto con acqua di cottura per legare.']},

  {id:'extra14',name:'Polpettone di Tacchino al Forno',ico:'🍖',tags:['cena','massa','meal-prep'],time:'55 min',kcal:350,p:44,c:10,g:12,diff:'Media',alimenti:['tacchino macinato','uova','parmigiano','spinaci','aglio','pangrattato','pomodori'],desc:'Il polpettone americano in versione fit. Tagliato a fette si conserva 4 giorni in frigo.',ingredienti:['500g tacchino macinato','2 uova','40g pangrattato integrale','40g parmigiano','100g spinaci cotti e strizzati','2 spicchi aglio','Prezzemolo','Sale, pepe','Glassa: 2 cucchiai concentrato di pomodoro + 1 cucchiaio miele + paprika'],steps:['Preriscalda forno a 185°C.','Mescola tacchino, uova, pangrattato, parmigiano, spinaci, aglio e prezzemolo.','Forma un filone su teglia rivestita di carta forno.','Spennella con la glassa di pomodoro.','Cuoci 40-45 min. Fai riposare 10 min prima di tagliare.']},

  {id:'extra15',name:'Salmone in Crosta di Mandorle',ico:'🐟',tags:['cena','definizione','massa'],time:'20 min',kcal:450,p:42,c:8,g:26,diff:'Facile',alimenti:['salmone','mandorle','prezzemolo','limone','aglio','senape','olio EVO'],desc:'La crosta di mandorle protegge il salmone e aggiunge croccantezza e grassi buoni.',ingredienti:['200g filetto di salmone con pelle','Crosta: 40g mandorle tritate + 2 cucchiai prezzemolo + scorza di 1 limone + 1 spicchio aglio tritato + sale','1 cucchiaio senape di Digione'],steps:['Preriscalda forno a 200°C.','Spalma la senape sul lato superiore del salmone (senza pelle).','Mescola mandorle, prezzemolo, scorza limone e aglio. Pressa sulla senape.','Disponi su teglia con carta forno, pelle in basso.','Cuoci 12-14 min. La crosta deve essere dorata, il salmone rosa al centro.']},
];

let ricetteFilter='all';
let ricetteIngFiltri=[];
let ricetteSearchQ='';

window.ricettaSearch = function(){
  var inp = document.getElementById('ricette-search');
  ricetteSearchQ = inp ? inp.value.toLowerCase().trim() : '';
  renderRicette();
};
