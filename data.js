/* ══════════════════════════════════════════════════════════════════════════
   FitTrack AI — V25 PATCH
   1. Calorie → macro auto-adattivi con preset cut/bulk/maintain/recomp
   2. Modale obiettivi avanzato con slider percentuali
   3. Database alimenti espanso + alimenti personalizzati (100g macro)
   4. Database esercizi espanso con equipment
   5. Step equipaggiamento in onboarding
══════════════════════════════════════════════════════════════════════════ */
(function v25Main(){

function safeN(v,min,max,fb){ const n=parseFloat(v); return(isNaN(n)||!isFinite(n))?fb:Math.max(min,Math.min(max,n)); }
function qs(id){ return document.getElementById(id); }
function showToastSafe(msg){ if(typeof showToast==='function') showToast(msg); else console.log(msg); }

/* ══ 1. MACRO PRESETS ══════════════════════════════════════════ */
const MACRO_PRESETS = {
  cut:      { label:'Definizione (Cut) \u{1F4C9}',    pPct:0.30, cPct:0.40, gPct:0.30, kcalMult:0.80 },
  bulk:     { label:'Massa (Bulk) \u{1F4C8}',          pPct:0.25, cPct:0.50, gPct:0.25, kcalMult:1.15 },
  maintain: { label:'Mantenimento \u2696\uFE0F',        pPct:0.25, cPct:0.45, gPct:0.30, kcalMult:1.00 },
  recomp:   { label:'Recomposizione \u{1F504}',        pPct:0.30, cPct:0.40, gPct:0.30, kcalMult:1.00 },
  custom:   { label:'Personalizzato \u270F\uFE0F',     pPct:null,  cPct:null,  gPct:null,  kcalMult:null }
};

function calcMacrosFromKcal(kcal, preset, bodyWeight){
  const p = MACRO_PRESETS[preset] || MACRO_PRESETS.maintain;
  const protG  = Math.round(kcal*p.pPct/4);
  const fatG   = Math.round(kcal*p.gPct/9);
  const carbsG = Math.round(kcal*p.cPct/4);
  return {p:Math.max(0,protG),c:Math.max(0,carbsG),g:Math.max(0,Math.min(fatG,300))};
}

function calcMacrosFromPct(kcal,pPct,cPct,gPct){
  return {p:Math.round(kcal*pPct/4),c:Math.round(kcal*cPct/4),g:Math.round(kcal*gPct/9)};
}
window.MACRO_PRESETS=MACRO_PRESETS;
window.calcMacrosFromKcal=calcMacrosFromKcal;

/* ══ 2. MODALE OBIETTIVI AVANZATO ══════════════════════════════ */
function openGoalsModal(){
  if(qs('v25-goals-modal'))return;
  const g=profile.goalsMeta||{};
  const ph=profile.physique||{};
  const m=profile.macros||{p:180,c:280,g:70};
  const curKcal=profile.kcalTarget||g.calories||2500;
  const curTdee=profile.tdee||curKcal;
  const bw=ph.weight||75;
  const goalType=g.goalType||'maintain';
  const presetOpts=Object.entries(MACRO_PRESETS).map(([k,v])=>`<option value="${k}" ${(profile._macroPset||goalType)===k?'selected':''}>${v.label}</option>`).join('');

  const overlay=document.createElement('div');
  overlay.id='v25-goals-modal';
  overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9000;display:flex;align-items:flex-end;backdrop-filter:blur(8px)';
  overlay.innerHTML=`
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;max-height:92vh;overflow-y:auto;padding:24px 20px 40px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
      <div style="font-size:19px;font-weight:800">&#127919; Obiettivi &amp; Macro</div>
      <button onclick="qs('v25-goals-modal').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px">&times;</button>
    </div>
    <div style="font-size:12px;color:var(--text2);margin-bottom:20px">Modifica calorie e distribuzione macro. I grammi si aggiornano in automatico.</div>
    <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:8px">Tipo obiettivo</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px">
      ${['cut','bulk','maintain','recomp'].map(k=>`<div onclick="gmSelectGoalType('${k}')" id="gm-gt-${k}" style="padding:12px 14px;border-radius:12px;cursor:pointer;border:1.5px solid ${goalType===k?'var(--acc)':'var(--border)'};background:${goalType===k?'var(--acc4)':'var(--bg3)'};transition:all .15s"><div style="font-size:13px;font-weight:700">${MACRO_PRESETS[k].label}</div></div>`).join('')}
    </div>
    <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:8px">Calorie giornaliere target</div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
      <input id="gm-kcal" type="number" step="50" min="1000" max="8000" value="${curKcal}" oninput="gmOnKcalChange()" style="flex:1;background:var(--bg3);border:1.5px solid var(--border);border-radius:12px;padding:12px 14px;font-size:18px;font-family:'DM Mono',monospace;color:var(--acc);outline:none">
      <div style="font-size:13px;color:var(--text2)">kcal</div>
    </div>
    <div style="font-size:11px;color:var(--text2);margin-bottom:8px">TDEE calcolato: <b style="color:var(--text)">${curTdee} kcal</b></div>
    <div style="display:flex;gap:8px;margin-bottom:18px">
      <button onclick="gmSetKcal(${curTdee})" style="flex:1;padding:8px;background:var(--bg4);border:1px solid var(--border);border-radius:10px;color:var(--text2);font-size:11px;font-weight:700;cursor:pointer">= TDEE</button>
      <button onclick="gmSetKcal(Math.round(${curTdee}*0.80))" style="flex:1;padding:8px;background:var(--red-d);border:1px solid rgba(255,92,106,.2);border-radius:10px;color:var(--red);font-size:11px;font-weight:700;cursor:pointer">&#8722;20% Cut</button>
      <button onclick="gmSetKcal(Math.round(${curTdee}*1.15))" style="flex:1;padding:8px;background:var(--green-d);border:1px solid rgba(62,223,138,.2);border-radius:10px;color:var(--green);font-size:11px;font-weight:700;cursor:pointer">+15% Bulk</button>
    </div>
    <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:8px">Distribuzione macro</div>
    <select id="gm-preset" onchange="gmOnPresetChange()" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:12px;padding:12px 14px;font-size:13px;color:var(--text);outline:none;margin-bottom:14px">${presetOpts}</select>
    <div id="gm-pct-rows" style="display:none;margin-bottom:14px">
      <div style="font-size:11px;color:var(--text2);margin-bottom:10px">Inserisci le percentuali e premi <b>Applica</b> per confermare (totale deve essere 100%)</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px">
        ${[['p','Proteine','var(--green)'],['c','Carbs','var(--blue)'],['g','Grassi','var(--orange)']].map(([k,lbl,col])=>`
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px">
          <span style="font-size:11px;font-weight:800;color:${col}">${lbl}</span>
          <div style="display:flex;align-items:center;gap:4px">
            <input type="number" id="gm-inp-${k}" min="5" max="80" step="1" value="33"
              style="width:64px;background:var(--bg3);border:2px solid ${col}40;border-radius:10px;padding:8px 6px;font-size:18px;font-family:'DM Mono',monospace;color:${col};outline:none;text-align:center;font-weight:800"
              oninput="gmInpChange()">
            <span style="font-size:13px;font-weight:700;color:${col}">%</span>
          </div>
        </div>`).join('')}
      </div>
      <div id="gm-pct-check" style="font-size:11px;padding:8px;border-radius:8px;text-align:center;background:var(--bg4);margin-bottom:10px"></div>
      <button onclick="gmApplyCustomPct()" id="gm-apply-btn"
        style="width:100%;padding:12px;background:var(--acc4);border:1.5px solid rgba(200,245,60,.3);border-radius:12px;color:var(--acc);font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer">
        ✅ Applica percentuali
      </button>
    </div>
    <div style="background:var(--bg3);border:1px solid var(--border2);border-radius:14px;padding:16px;margin-bottom:20px">
      <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:12px">Macro calcolati</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;text-align:center">
        <div><div id="gm-out-p" style="font-size:26px;font-weight:800;color:var(--green)">&#8212;</div><div style="font-size:11px;color:var(--text2)">Proteine g</div><div id="gm-out-pkc" style="font-size:10px;color:var(--text3)">&#8212; kcal</div></div>
        <div><div id="gm-out-c" style="font-size:26px;font-weight:800;color:var(--blue)">&#8212;</div><div style="font-size:11px;color:var(--text2)">Carbs g</div><div id="gm-out-ckc" style="font-size:10px;color:var(--text3)">&#8212; kcal</div></div>
        <div><div id="gm-out-g" style="font-size:26px;font-weight:800;color:var(--orange)">&#8212;</div><div style="font-size:11px;color:var(--text2)">Grassi g</div><div id="gm-out-gkc" style="font-size:10px;color:var(--text3)">&#8212; kcal</div></div>
      </div>
      <div id="gm-kcal-check" style="font-size:11px;margin-top:10px;padding:8px;border-radius:8px;text-align:center;background:var(--bg4)"></div>
    </div>
    <div style="margin-bottom:20px">
      <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:6px">Peso obiettivo (kg)</div>
      <input id="gm-goalweight" type="number" step="0.5" min="30" max="300" value="${g.weight||bw}" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:12px;padding:12px 14px;font-size:15px;color:var(--text);outline:none">
    </div>
    <button onclick="gmSave()" style="width:100%;padding:15px;background:var(--acc);color:#080810;border:none;border-radius:16px;font-family:'Syne',sans-serif;font-size:15px;font-weight:800;cursor:pointer">&#128190; Salva obiettivi</button>
  </div>`;
  document.body.appendChild(overlay);
  window._gmGoalType=goalType;
  window._gmBW=bw;
  // Load saved custom pct from profile if available
  if(profile._customMacroPct) window._gmCustomPct=profile._customMacroPct;
  else window._gmCustomPct=null;
  gmRefreshOutput();
}

window.gmSelectGoalType=function(k){
  window._gmGoalType=k;
  ['cut','bulk','maintain','recomp'].forEach(t=>{
    const el=qs('gm-gt-'+t);
    if(!el)return;
    el.style.border='1.5px solid '+(t===k?'var(--acc)':'var(--border)');
    el.style.background=t===k?'var(--acc4)':'var(--bg3)';
  });
  const tdee=profile.tdee||profile.kcalTarget||2500;
  const mult=MACRO_PRESETS[k]?.kcalMult||1;
  gmSetKcal(Math.round(tdee*mult));
  const sel=qs('gm-preset'); if(sel)sel.value=k;
  gmOnPresetChange();
};
window.gmSetKcal=function(val){const inp=qs('gm-kcal');if(inp){inp.value=val;gmOnKcalChange();}};
window.gmOnKcalChange=function(){gmRefreshOutput();};
window.gmOnPresetChange=function(){
  const preset=qs('gm-preset')?.value||'maintain';
  const pctRows=qs('gm-pct-rows');
  if(pctRows)pctRows.style.display=preset==='custom'?'block':'none';
  if(preset==='custom'){
    // Use saved custom pct if available, else derive from current macros
    const saved=window._gmCustomPct||profile._customMacroPct;
    let pP,cP,gP;
    if(saved){
      pP=Math.round(saved.p*100); cP=Math.round(saved.c*100); gP=Math.round(saved.g*100);
    } else {
      const kcal=safeN(qs('gm-kcal')?.value,1000,8000,2000);
      const m=profile.macros||{p:180,c:280,g:70};
      pP=Math.round(m.p*4/kcal*100)||30;
      cP=Math.round(m.c*4/kcal*100)||45;
      gP=100-pP-cP;
    }
    const ip=qs('gm-inp-p'),ic=qs('gm-inp-c'),ig=qs('gm-inp-g');
    if(ip)ip.value=pP; if(ic)ic.value=cP; if(ig)ig.value=Math.max(5,gP);
    gmInpChange();
  }
  gmRefreshOutput();
};
window.gmInpChange=function(){
  const total=['p','c','g'].reduce((a,k)=>a+(parseInt(qs('gm-inp-'+k)?.value)||0),0);
  const chk=qs('gm-pct-check');
  const applyBtn=qs('gm-apply-btn');
  const ok=total===100;
  if(chk){chk.textContent=ok?'✅ Totale 100% — pronto per applicare':'⚠️ Totale: '+total+'% (deve essere esattamente 100%)';chk.style.color=ok?'var(--green)':'var(--orange)';}
  if(applyBtn){applyBtn.style.opacity=ok?'1':'0.5';applyBtn.style.cursor=ok?'pointer':'not-allowed';}
};
window.gmApplyCustomPct=function(){
  const total=['p','c','g'].reduce((a,k)=>a+(parseInt(qs('gm-inp-'+k)?.value)||0),0);
  if(total!==100){showToastSafe('⚠️ La somma deve essere 100%. Ora è '+total+'%');return;}
  window._gmCustomPct={
    p:parseInt(qs('gm-inp-p')?.value||30)/100,
    c:parseInt(qs('gm-inp-c')?.value||45)/100,
    g:parseInt(qs('gm-inp-g')?.value||25)/100
  };
  gmRefreshOutput();
  showToastSafe('✅ Percentuali applicate!');
};
window.gmRefreshOutput=function(){
  const kcal=safeN(qs('gm-kcal')?.value,1000,8000,2000);
  const preset=qs('gm-preset')?.value||'maintain';
  const bw=window._gmBW||profile.physique?.weight||75;
  let macros;
  if(preset==='custom'){
    const pct=window._gmCustomPct||{p:0.30,c:0.45,g:0.25};
    macros=calcMacrosFromPct(kcal,pct.p,pct.c,pct.g);
  } else { macros=calcMacrosFromKcal(kcal,preset,bw); }
  const set=(id,val)=>{const el=qs(id);if(el)el.textContent=val;};
  set('gm-out-p',macros.p+'g');set('gm-out-pkc',(macros.p*4)+' kcal');
  set('gm-out-c',macros.c+'g');set('gm-out-ckc',(macros.c*4)+' kcal');
  set('gm-out-g',macros.g+'g');set('gm-out-gkc',(macros.g*9)+' kcal');
  const fromMacros=macros.p*4+macros.c*4+macros.g*9;
  const diff=Math.abs(fromMacros-kcal);
  const chk=qs('gm-kcal-check');
  if(chk){chk.textContent=diff<=50?`✅ ${fromMacros} kcal — Coerenti`:`ℹ️ Macro → ${fromMacros} kcal · diff ${diff}`;chk.style.color=diff<=50?'var(--green)':'var(--text2)';}
  window._gmCurrentMacros=macros;
};
window.gmSave=async function(){
  const kcal=safeN(qs('gm-kcal')?.value,1000,8000,2000);
  const goalWeight=safeN(qs('gm-goalweight')?.value,30,300,75);
  const goalType=window._gmGoalType||'maintain';
  const preset=qs('gm-preset')?.value||goalType;
  if(preset==='custom'&&!window._gmCustomPct){showToastSafe('⚠️ Premi "Applica percentuali" prima di salvare!');return;}
  const macros=window._gmCurrentMacros||calcMacrosFromKcal(kcal,goalType,profile.physique?.weight||75);
  profile.kcalTarget=kcal; profile.macros=macros; profile._macroPset=preset;
  if(preset==='custom') profile._customMacroPct=window._gmCustomPct;
  if(typeof updateGoals==='function') updateGoals({calories:kcal,weight:goalWeight,goalType});
  if(typeof saveAll==='function') await saveAll();
  if(typeof renderProfilePage==='function') renderProfilePage();
  if(typeof renderNutrizione==='function') renderNutrizione();
  qs('v25-goals-modal')?.remove();
  showToastSafe(`✅ Salvato — ${kcal} kcal · P${macros.p} C${macros.c} G${macros.g}g`);
};
window.openGoalsModal=openGoalsModal;
window.editGoalsPrompt=openGoalsModal;

/* ══ 3. ALIMENTI PERSONALIZZATI ════════════════════════════════ */
const CF_KEY='ft_custom_foods_v25';
function loadCF(){try{return JSON.parse(localStorage.getItem(CF_KEY))||[];}catch(e){return[];}}
function saveCF(arr){localStorage.setItem(CF_KEY,JSON.stringify(arr));}
function mergeCF(){const ids=new Set(FOOD_DB.map(f=>f.id));loadCF().forEach(f=>{if(!ids.has(f.id)){FOOD_DB.push(f);ids.add(f.id);}});}
mergeCF();

window.openAddCustomFoodModal=function(){
  if(qs('v25-cf-modal'))return;
  const ovl=document.createElement('div');
  ovl.id='v25-cf-modal';
  ovl.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9100;display:flex;align-items:flex-end;backdrop-filter:blur(8px)';
  ovl.innerHTML=`
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;padding:24px 20px 40px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:18px;font-weight:800">&#10133; Nuovo alimento</div>
      <button onclick="qs('v25-cf-modal').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px">&times;</button>
    </div>
    <div style="font-size:12px;color:var(--text2);margin-bottom:16px;line-height:1.7">Valori per <b>100g</b> di prodotto — la quantità viene scalata automaticamente.</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      <div style="grid-column:1/-1"><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Nome alimento</div><input id="cf-name" placeholder="Es. Yogurt greco 0%" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px 13px;font-size:14px;color:var(--text);outline:none"></div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Categoria</div>
        <select id="cf-cat" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:13px;color:var(--text);outline:none">
          <option>&#127831; Proteine</option><option>&#127806; Carboidrati</option><option>&#129361; Grassi</option><option>&#129382; Verdure</option><option>&#127822; Frutta</option><option>&#129371; Latticini</option><option>&#9889; Altro</option>
        </select>
      </div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--orange);margin-bottom:5px">Calorie (kcal/100g)</div><input id="cf-kcal" type="number" min="0" max="900" placeholder="100" oninput="cfCheck()" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:14px;color:var(--orange);outline:none"></div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--green);margin-bottom:5px">Proteine (g/100g)</div><input id="cf-prot" type="number" min="0" max="100" placeholder="0" oninput="cfCheck()" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:14px;color:var(--green);outline:none"></div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--blue);margin-bottom:5px">Carboidrati (g/100g)</div><input id="cf-carbs" type="number" min="0" max="100" placeholder="0" oninput="cfCheck()" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:14px;color:var(--blue);outline:none"></div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--orange);margin-bottom:5px">Grassi (g/100g)</div><input id="cf-fat" type="number" min="0" max="100" placeholder="0" oninput="cfCheck()" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:14px;color:var(--orange);outline:none"></div>
    </div>
    <div id="cf-check-msg" style="font-size:11px;padding:8px 12px;border-radius:8px;background:var(--bg3);margin-bottom:14px;color:var(--text2)">Compila tutti i campi per salvare</div>
    <button onclick="saveCFFood()" style="width:100%;padding:14px;background:var(--acc);color:#080810;border:none;border-radius:14px;font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer">&#128190; Aggiungi al database</button>
  </div>`;
  document.body.appendChild(ovl);
};

window.cfCheck=function(){
  const k=safeN(qs('cf-kcal')?.value,0,900,0);
  const p=safeN(qs('cf-prot')?.value,0,100,0);
  const c=safeN(qs('cf-carbs')?.value,0,100,0);
  const g=safeN(qs('cf-fat')?.value,0,100,0);
  const fm=p*4+c*4+g*9; const diff=Math.abs(fm-k);
  const chk=qs('cf-check-msg');if(!chk)return;
  if(!k){chk.textContent='Inserisci le calorie';chk.style.color='var(--text2)';return;}
  chk.textContent=diff<=15?`✅ Macro coerenti — ${fm} kcal calcolate`:`ℹ️ Macro calcolati: ${fm} kcal vs ${k} inserite (diff ${diff})`;
  chk.style.color=diff<=15?'var(--green)':'var(--text2)';
};

window.saveCFFood=function(){
  const name=qs('cf-name')?.value?.trim();
  if(!name){showToastSafe('⚠️ Inserisci il nome');return;}
  const kcal=safeN(qs('cf-kcal')?.value,0,900,0);
  if(!kcal){showToastSafe('⚠️ Inserisci le calorie');return;}
  const p=safeN(qs('cf-prot')?.value,0,100,0);
  const c=safeN(qs('cf-carbs')?.value,0,100,0);
  const g=safeN(qs('cf-fat')?.value,0,100,0);
  const cat=qs('cf-cat')?.value||'⚡ Altro';
  const id='cf_'+Date.now();
  const food={id,name,kcal,p,c,g,unit:'g',cat,custom:true};
  const arr=loadCF(); arr.push(food); saveCF(arr);
  FOOD_DB.push(food);
  qs('v25-cf-modal')?.remove();
  showToastSafe(`✅ "${name}" aggiunto!`);
  if(typeof renderNutrizione==='function') renderNutrizione();
};

window.openCustomFoodsList=function(){
  const arr=loadCF();
  if(!arr.length){showToastSafe('Nessun alimento personalizzato ancora');return;}
  if(qs('v25-cf-list'))return;
  const ovl=document.createElement('div');
  ovl.id='v25-cf-list';
  ovl.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9100;display:flex;align-items:flex-end;backdrop-filter:blur(8px)';
  ovl.innerHTML=`<div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;max-height:80vh;overflow-y:auto;padding:24px 20px 40px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:18px;font-weight:800">&#128203; I miei alimenti</div>
      <button onclick="qs('v25-cf-list').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px">&times;</button>
    </div>
    ${arr.map(f=>`<div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg3);border-radius:12px;margin-bottom:8px">
      <div style="flex:1"><div style="font-size:13px;font-weight:700">${f.name}</div><div style="font-size:11px;color:var(--text2)">${f.kcal} kcal · P${f.p}g C${f.c}g G${f.g}g per 100g</div></div>
      <button onclick="deleteCFFood('${f.id}')" style="background:var(--red-d);border:1px solid rgba(255,92,106,.2);border-radius:8px;padding:6px 10px;color:var(--red);font-size:12px;font-weight:700;cursor:pointer">&#128465;</button>
    </div>`).join('')}
  </div>`;
  document.body.appendChild(ovl);
};

window.deleteCFFood=function(id){
  saveCF(loadCF().filter(f=>f.id!==id));
  const idx=FOOD_DB.findIndex(f=>f.id===id); if(idx>=0)FOOD_DB.splice(idx,1);
  qs('v25-cf-list')?.remove();
  showToastSafe('&#128465; Alimento rimosso');
};

/* ══ 4. ESPANSIONE FOOD DB ══════════════════════════════════════ */
(function(){
  const extra=[
    {id:'v25_tempeh',name:'Tempeh',kcal:193,p:19,c:9,g:11,unit:'g',cat:'🍗 Proteine'},
    {id:'v25_seitan',name:'Seitan',kcal:150,p:31,c:5,g:2,unit:'g',cat:'🍗 Proteine'},
    {id:'v25_edamame',name:'Edamame',kcal:121,p:11,c:9,g:5,unit:'g',cat:'🍗 Proteine'},
    {id:'v25_sardine',name:'Sardine al naturale',kcal:135,p:20,c:0,g:6,unit:'g',cat:'🍗 Proteine'},
    {id:'v25_whey',name:'Whey Protein (polvere)',kcal:380,p:80,c:5,g:4,unit:'g',cat:'🍗 Proteine'},
    {id:'v25_cottage',name:'Cottage Cheese',kcal:98,p:11,c:3,g:4,unit:'g',cat:'🍗 Proteine'},
    {id:'v25_tofu',name:'Tofu sodo',kcal:76,p:8,c:2,g:4,unit:'g',cat:'🍗 Proteine'},
    {id:'v25_polpo',name:'Polpo cotto',kcal:82,p:15,c:2,g:1,unit:'g',cat:'🍗 Proteine'},
    {id:'v25_farro',name:'Farro perlato cotto',kcal:130,p:5,c:26,g:1,unit:'g',cat:'🌾 Carboidrati'},
    {id:'v25_miglio',name:'Miglio cotto',kcal:119,p:3,c:23,g:1,unit:'g',cat:'🌾 Carboidrati'},
    {id:'v25_grano_s',name:'Grano saraceno cotto',kcal:92,p:3,c:19,g:1,unit:'g',cat:'🌾 Carboidrati'},
    {id:'v25_riso_b',name:'Riso basmati cotto',kcal:121,p:3,c:25,g:0,unit:'g',cat:'🌾 Carboidrati'},
    {id:'v25_pasta_int',name:'Pasta integrale cotta',kcal:131,p:5,c:25,g:1,unit:'g',cat:'🌾 Carboidrati'},
    {id:'v25_couscous',name:'Couscous cotto',kcal:112,p:4,c:23,g:0,unit:'g',cat:'🌾 Carboidrati'},
    {id:'v25_mais',name:'Mais dolce chicchi',kcal:86,p:3,c:18,g:1,unit:'g',cat:'🌾 Carboidrati'},
    {id:'v25_avocado',name:'Avocado',kcal:160,p:2,c:9,g:15,unit:'g',cat:'🥑 Grassi'},
    {id:'v25_arachidi',name:'Arachidi tostate',kcal:567,p:26,c:16,g:49,unit:'g',cat:'🥑 Grassi'},
    {id:'v25_chia',name:'Semi di Chia',kcal:486,p:17,c:42,g:31,unit:'g',cat:'🥑 Grassi'},
    {id:'v25_pb',name:'Burro di arachidi naturale',kcal:588,p:25,c:20,g:50,unit:'g',cat:'🥑 Grassi'},
    {id:'v25_olio',name:'Olio EVO',kcal:884,p:0,c:0,g:100,unit:'g',cat:'🥑 Grassi'},
    {id:'v25_kefir',name:'Kefir intero',kcal:61,p:3,c:5,g:3,unit:'ml',cat:'🥛 Latticini'},
    {id:'v25_skyr',name:'Skyr proteico',kcal:63,p:11,c:4,g:0,unit:'g',cat:'🥛 Latticini'},
    {id:'v25_parm',name:'Parmigiano Reggiano',kcal:392,p:33,c:0,g:28,unit:'g',cat:'🥛 Latticini'},
    {id:'v25_mango',name:'Mango',kcal:60,p:1,c:15,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v25_kiwi',name:'Kiwi',kcal:61,p:1,c:15,g:1,unit:'g',cat:'🍎 Frutta'},
    {id:'v25_bosco',name:'Frutti di bosco misti',kcal:57,p:1,c:14,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v25_asparagi',name:'Asparagi',kcal:20,p:2,c:4,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v25_cavoletti',name:'Cavoletti di Bruxelles',kcal:43,p:3,c:9,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v25_zucca',name:'Zucca cotta',kcal:26,p:1,c:6,g:0,unit:'g',cat:'🥦 Verdure'},
  ];
  const ids=new Set(FOOD_DB.map(f=>f.id));
  extra.forEach(f=>{if(!ids.has(f.id)){FOOD_DB.push(f);ids.add(f.id);}});
})();

/* ══ 5. ESPANSIONE EX DB ════════════════════════════════════════ */
(function(){
  const extra=[
    {id:'v25_cable_fly',name:'Croci ai cavi',m:'push',tags:['petto'],icon:'🔴',equipment:['macchinari']},
    {id:'v25_pec_deck',name:'Pectoral Machine',m:'push',tags:['petto'],icon:'🔴',equipment:['macchinari']},
    {id:'v25_tricep_pd',name:'Pushdown tricipiti ai cavi',m:'push',tags:['tricipiti'],icon:'🔴',equipment:['macchinari']},
    {id:'v25_skull_c',name:'French Press (Skull Crusher)',m:'push',tags:['tricipiti'],icon:'🔴',equipment:['bilanciere','manubri']},
    {id:'v25_cg_bench',name:'Panca stretta tricipiti',m:'push',tags:['tricipiti','petto'],icon:'🔴',equipment:['bilanciere']},
    {id:'v25_lat_raise_c',name:'Alzate laterali ai cavi',m:'push',tags:['spalle'],icon:'🔴',equipment:['macchinari']},
    {id:'v25_seated_row',name:'Rematore seduto ai cavi',m:'pull',tags:['dorsali','bicipiti'],icon:'🟢',equipment:['macchinari']},
    {id:'v25_lat_pd',name:'Lat Pulldown',m:'pull',tags:['dorsali'],icon:'🟢',equipment:['macchinari']},
    {id:'v25_tbar',name:'T-Bar Row',m:'pull',tags:['dorsali'],icon:'🟢',equipment:['bilanciere']},
    {id:'v25_face_pull',name:'Face Pull',m:'pull',tags:['spalle post','trapezio'],icon:'🟢',equipment:['macchinari']},
    {id:'v25_shrug',name:'Scrollate spalle (Shrugs)',m:'pull',tags:['trapezio'],icon:'🟢',equipment:['bilanciere','manubri']},
    {id:'v25_hammer',name:'Hammer Curl',m:'pull',tags:['bicipiti','avambracci'],icon:'🟢',equipment:['manubri']},
    {id:'v25_conc_curl',name:'Curl a concentrazione',m:'pull',tags:['bicipiti'],icon:'🟢',equipment:['manubri']},
    {id:'v25_leg_press',name:'Leg Press',m:'legs',tags:['quadricipiti','glutei'],icon:'🔵',equipment:['macchinari']},
    {id:'v25_hack_sq',name:'Hack Squat',m:'legs',tags:['quadricipiti'],icon:'🔵',equipment:['macchinari']},
    {id:'v25_leg_ext',name:'Leg Extension',m:'legs',tags:['quadricipiti'],icon:'🔵',equipment:['macchinari']},
    {id:'v25_leg_curl',name:'Leg Curl sdraiato',m:'legs',tags:['femorali'],icon:'🔵',equipment:['macchinari']},
    {id:'v25_goblet',name:'Goblet Squat',m:'legs',tags:['quadricipiti','glutei'],icon:'🔵',equipment:['kettlebell','manubri']},
    {id:'v25_sumo',name:'Sumo Squat',m:'legs',tags:['glutei','femorali'],icon:'🔵',equipment:['manubri','bilanciere']},
    {id:'v25_nordic',name:'Nordic Hamstring Curl',m:'legs',tags:['femorali'],icon:'🔵',equipment:[]},
    {id:'v25_adductor',name:'Adduttore macchinario',m:'legs',tags:['adduttori'],icon:'🔵',equipment:['macchinari']},
    {id:'v25_dragon',name:'Dragon Flag',m:'core',tags:['core','addominali'],icon:'🟡',equipment:[]},
    {id:'v25_ab_wheel',name:'Ab Wheel Rollout',m:'core',tags:['core'],icon:'🟡',equipment:['accessori']},
    {id:'v25_cable_crunch',name:'Cable Crunch',m:'core',tags:['addominali'],icon:'🟡',equipment:['macchinari']},
    {id:'v25_pallof',name:'Pallof Press',m:'core',tags:['core','obliqui'],icon:'🟡',equipment:['macchinari']},
    {id:'v25_box_jump',name:'Box Jump',m:'cardio',tags:['esplosivita','gambe'],icon:'⚪',equipment:[]},
    {id:'v25_kb_swing',name:'Kettlebell Swing',m:'cardio',tags:['glutei','femorali','cardio'],icon:'⚪',equipment:['kettlebell']},
    {id:'v25_jump_rope',name:'Corda per saltare',m:'cardio',tags:['cardio'],icon:'⚪',equipment:['accessori']},
    {id:'v25_assault',name:'Assault Bike',m:'cardio',tags:['cardio'],icon:'⚪',equipment:['cardio']},
  ];
  const ids=new Set(EX_DB.map(e=>e.id));
  extra.forEach(e=>{if(!ids.has(e.id)){EX_DB.push(e);ids.add(e.id);}});
})();

/* ══ 6. STEP EQUIPAGGIAMENTO ONBOARDING ═══════════════════════ */
const V25_EQ=[
  {id:'sbarra',label:'Sbarra trazioni',ico:'🏋️',group:'calisthenics'},
  {id:'anelli',label:'Anelli ginnastica',ico:'⭕',group:'calisthenics'},
  {id:'parallele',label:'Parallele/Dip station',ico:'🤸',group:'calisthenics'},
  {id:'manubri',label:'Manubri',ico:'💪',group:'pesi'},
  {id:'bilanciere',label:'Bilanciere + dischi',ico:'🏋️',group:'pesi'},
  {id:'kettlebell',label:'Kettlebell',ico:'🔔',group:'pesi'},
  {id:'macchinari',label:'Macchinari in palestra',ico:'⚙️',group:'macchinari'},
  {id:'tapis_roulant',label:'Tapis roulant',ico:'🏃',group:'cardio'},
  {id:'cyclette',label:'Cyclette / Bike',ico:'🚴',group:'cardio'},
  {id:'accessori',label:'Bande elastiche / TRX',ico:'🎯',group:'accessori'},
  {id:'niente',label:'Solo corpo libero',ico:'🤸',group:'base'},
];
window.V25_EQ=V25_EQ;
window._obEquipSet=new Set();

function injectEqStep(){
  const ob6=document.getElementById('ob6');
  if(!ob6||document.getElementById('ob-eq-step'))return;
  const step=document.createElement('div');
  step.className='ob-step'; step.id='ob-eq-step';
  step.innerHTML=`
    <div class="ob-eyebrow">Equipaggiamento disponibile</div>
    <div class="ob-ttl">Cosa hai a disposizione?</div>
    <div class="ob-sub">Seleziona tutto l'equipaggiamento. Il programma verrà costruito esattamente su quello che hai.</div>
    <div id="ob-eq-grid" style="display:flex;flex-direction:column;gap:7px;margin-bottom:20px">
      ${V25_EQ.map(e=>`<div onclick="obToggleEq('${e.id}',this)" id="ob-eq-${e.id}"
        style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;cursor:pointer;background:var(--bg3);border:1.5px solid var(--border);transition:all .15s">
        <span style="font-size:20px">${e.ico}</span>
        <span style="font-size:13px;font-weight:700;flex:1">${e.label}</span>
        <span class="eq-chk" style="font-size:18px;color:var(--border)">○</span>
      </div>`).join('')}
    </div>
    <div class="ob-nav">
      <button class="btn btn-ghost btn-sm" onclick="obGo(5)">&#8592; Indietro</button>
      <button class="btn btn-acc" onclick="obEqDone()">Continua &#8594;</button>
    </div>`;
  // Safe insertBefore with parent check
  try {
    if (ob6.parentNode && ob6.parentNode.contains(ob6)) {
      ob6.parentNode.insertBefore(step, ob6);
    } else {
      var obContent2 = document.querySelector('#scr-onboard .ob-content') || document.getElementById('scr-onboard');
      if (obContent2) obContent2.appendChild(step);
    }
  } catch(e) { console.warn('[injectEqStep] insertBefore failed:', e); }
}

window.obToggleEq=function(id,el){
  const set=window._obEquipSet;
  if(set.has(id)){
    set.delete(id);
    el.style.background='var(--bg3)'; el.style.borderColor='var(--border)';
    el.querySelector('.eq-chk').textContent='○'; el.querySelector('.eq-chk').style.color='var(--border)';
  } else {
    if(id==='niente'){
      set.clear();
      document.querySelectorAll('#ob-eq-grid>[id^="ob-eq-"]').forEach(d=>{d.style.background='var(--bg3)';d.style.borderColor='var(--border)';d.querySelector('.eq-chk').textContent='○';d.querySelector('.eq-chk').style.color='var(--border)';});
    } else {
      set.delete('niente');
      const ne=document.getElementById('ob-eq-niente');
      if(ne){ne.style.background='var(--bg3)';ne.style.borderColor='var(--border)';ne.querySelector('.eq-chk').textContent='○';ne.querySelector('.eq-chk').style.color='var(--border)';}
    }
    set.add(id);
    el.style.background='var(--acc4)'; el.style.borderColor='var(--acc)';
    el.querySelector('.eq-chk').textContent='✓'; el.querySelector('.eq-chk').style.color='var(--acc)';
  }
};

window.obEqDone=function(){
  const eq=[...window._obEquipSet];
  window.obEquipment=eq;
  if(typeof profile!=='undefined') profile.equipment=eq;
  try{localStorage.setItem('ft_equipment',JSON.stringify(eq));}catch(e){}
  document.querySelectorAll('.ob-step').forEach(s=>s.classList.remove('active'));
  document.getElementById('ob6')?.classList.add('active');
};

/* V41: v30 alternate equipment step merged into consolidated obGo */
var _origObGoV41b=window.obGo||null; // reference kept, override neutralised
// v30 obGo override neutralised

/* ══ 7. PATCH FOOD SHEET — pulsante alimento custom ═══════════ */
function patchFoodSheet(){
  const _orig=window.openFoodSheet;
  if(!_orig||window._v25FSP)return;
  window._v25FSP=true;
  window.openFoodSheet=function(mi){
    _orig(mi);
    setTimeout(()=>{
      const sheet=document.querySelector('.food-sheet');
      if(!sheet||document.getElementById('v25-fs-btns'))return;
      const wrap=document.createElement('div');
      wrap.id='v25-fs-btns';
      wrap.style.cssText='display:flex;gap:8px;padding:10px 16px;border-top:1px solid var(--border);flex-shrink:0';
      wrap.innerHTML=`<button onclick="openAddCustomFoodModal()" style="flex:1;padding:10px;background:var(--acc4);border:1px solid rgba(200,245,60,.2);border-radius:10px;color:var(--acc);font-size:12px;font-weight:800;cursor:pointer">&#10133; Aggiungi alimento</button><button onclick="openCustomFoodsList()" style="padding:10px 14px;background:var(--bg4);border:1px solid var(--border);border-radius:10px;color:var(--text2);font-size:12px;font-weight:700;cursor:pointer">&#128203; I miei</button>`;
      sheet.appendChild(wrap);
    },100);
  };
}

/* ══ INIT ══════════════════════════════════════════════════════ */
function v25Init(){
  injectEqStep();
  patchFoodSheet();
  mergeCF();
  // Restore saved equipment
  try{const eq=JSON.parse(localStorage.getItem('ft_equipment')||'[]');if(eq.length&&typeof profile!=='undefined')profile.equipment=eq;}catch(e){}
  // Patch editGoalsPrompt globally
  window.editGoalsPrompt=openGoalsModal;
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',v25Init);
else setTimeout(v25Init,250);

})();

(function v27Patch(){
'use strict';

/* ── helpers ───────────────────────────────────────────────────── */
function qs(id){return document.getElementById(id);}
function showT(msg){if(typeof showToast==='function')showToast(msg);else console.log(msg);}
function safeN(v,mn,mx,fb){const n=parseFloat(v);return(isNaN(n)||!isFinite(n))?fb:Math.max(mn,Math.min(mx,n));}

/* ══ 1. FOOD DB ESPANSIONE V27 ══════════════════════════════════ */
(function expandFoodDB(){
  const extra=[
    /* CARNI */
    {id:'v27_agnello',name:'Agnello macinato',kcal:235,p:18,c:0,g:18,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_cinghiale',name:'Cinghiale cotto',kcal:181,p:27,c:0,g:8,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_coniglio',name:'Coniglio al forno',kcal:173,p:26,c:0,g:7,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_maiale_l',name:'Lonza di maiale magra',kcal:143,p:22,c:0,g:6,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_manzo_m',name:'Manzo macinato 10%',kcal:175,p:20,c:0,g:10,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_vitello_c',name:'Cotoletta di vitello',kcal:196,p:22,c:5,g:10,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_speck',name:'Speck',kcal:280,p:26,c:1,g:19,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_salmone_af',name:'Salmone affumicato',kcal:142,p:20,c:0,g:7,unit:'g',cat:'🍗 Proteine'},
    /* PESCE */
    {id:'v27_acciughe',name:'Acciughe al naturale',kcal:131,p:20,c:0,g:5,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_trota',name:'Trota al forno',kcal:119,p:20,c:0,g:4,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_calamari',name:'Calamari grigliati',kcal:92,p:16,c:3,g:1,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_cozze',name:'Cozze cotte',kcal:86,p:12,c:4,g:2,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_vongole',name:'Vongole cotte',kcal:74,p:13,c:2,g:1,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_baccala',name:'Baccalà lessato',kcal:105,p:23,c:0,g:1,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_spigola',name:'Spigola al forno',kcal:124,p:22,c:0,g:4,unit:'g',cat:'🍗 Proteine'},
    {id:'v27_halibut',name:'Halibut al forno',kcal:140,p:22,c:0,g:5,unit:'g',cat:'🍗 Proteine'},
    /* LATTICINI */
    {id:'v27_burro',name:'Burro',kcal:717,p:1,c:0,g:81,unit:'g',cat:'🥛 Latticini'},
    {id:'v27_pecorino',name:'Pecorino romano',kcal:387,p:31,c:0,g:29,unit:'g',cat:'🥛 Latticini'},
    {id:'v27_provolone',name:'Provolone',kcal:352,p:26,c:2,g:27,unit:'g',cat:'🥛 Latticini'},
    {id:'v27_brie',name:'Brie',kcal:334,p:21,c:0,g:28,unit:'g',cat:'🥛 Latticini'},
    {id:'v27_feta',name:'Feta',kcal:264,p:14,c:4,g:21,unit:'g',cat:'🥛 Latticini'},
    {id:'v27_panna',name:'Panna da cucina 20%',kcal:191,p:3,c:3,g:19,unit:'ml',cat:'🥛 Latticini'},
    {id:'v27_formaggio_sp',name:'Formaggio spalmabile light',kcal:125,p:8,c:5,g:8,unit:'g',cat:'🥛 Latticini'},
    /* CEREALI E CARBOIDRATI */
    {id:'v27_pane_seg',name:'Pane di segale',kcal:259,p:9,c:48,g:3,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_gallette',name:'Gallette di riso',kcal:387,p:8,c:82,g:3,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_pizza_bianca',name:'Pizza bianca',kcal:266,p:8,c:52,g:4,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_pasta_riso',name:'Pasta di riso cotta',kcal:130,p:2,c:29,g:0,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_pasta_cec',name:'Pasta di ceci cotta',kcal:145,p:9,c:24,g:3,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_cornflakes',name:'Corn flakes',kcal:357,p:8,c:84,g:1,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_amaranto',name:'Amaranto cotto',kcal:102,p:4,c:19,g:2,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_teff',name:'Teff cotto',kcal:101,p:4,c:20,g:1,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_spaghetti',name:'Spaghetti crudi',kcal:371,p:13,c:74,g:2,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_piadina',name:'Piadina romagnola',kcal:302,p:8,c:44,g:11,unit:'g',cat:'🌾 Cereali'},
    /* VERDURE */
    {id:'v27_carciofi',name:'Carciofi cotti',kcal:53,p:3,c:11,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v27_bietola',name:'Bietola cotta',kcal:19,p:2,c:4,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v27_porro',name:'Porro cotto',kcal:31,p:1,c:7,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v27_finocchio',name:'Finocchio crudo',kcal:31,p:1,c:7,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v27_sedano',name:'Sedano',kcal:16,p:1,c:3,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v27_topinambur',name:'Topinambur cotto',kcal:76,p:2,c:17,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v27_rape',name:'Rape cotte',kcal:22,p:1,c:5,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v27_verza',name:'Verza cotta',kcal:25,p:2,c:5,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v27_indivia',name:'Indivia',kcal:17,p:1,c:3,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v27_cicoria',name:'Cicoria cotta',kcal:22,p:2,c:4,g:0,unit:'g',cat:'🥦 Verdure'},
    /* FRUTTA */
    {id:'v27_melone',name:'Melone giallo',kcal:34,p:1,c:8,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v27_anguria',name:'Anguria',kcal:30,p:1,c:8,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v27_fico',name:'Fichi freschi',kcal:74,p:1,c:19,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v27_ciliegie',name:'Ciliegie',kcal:63,p:1,c:16,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v27_melograno',name:'Melograno',kcal:83,p:2,c:19,g:1,unit:'g',cat:'🍎 Frutta'},
    {id:'v27_limone',name:'Limone succo',kcal:29,p:1,c:9,g:0,unit:'ml',cat:'🍎 Frutta'},
    {id:'v27_prugne',name:'Prugne secche',kcal:240,p:2,c:64,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v27_uva_secca',name:'Uva passa',kcal:299,p:3,c:79,g:0,unit:'g',cat:'🍎 Frutta'},
    /* LEGUMI */
    {id:'v27_fave',name:'Fave cotte',kcal:110,p:8,c:20,g:0,unit:'g',cat:'🫘 Legumi'},
    {id:'v27_lupini',name:'Lupini',kcal:114,p:16,c:10,g:3,unit:'g',cat:'🫘 Legumi'},
    {id:'v27_fagioli_b',name:'Fagioli bianchi cotti',kcal:127,p:9,c:23,g:1,unit:'g',cat:'🫘 Legumi'},
    {id:'v27_piselli_s',name:'Piselli secchi',kcal:341,p:25,c:60,g:1,unit:'g',cat:'🫘 Legumi'},
    {id:'v27_lenticchie_r',name:'Lenticchie rosse cotte',kcal:116,p:9,c:20,g:0,unit:'g',cat:'🫘 Legumi'},
    /* GRASSI e CONDIMENTI */
    {id:'v27_noci_brasile',name:'Noci del Brasile',kcal:659,p:14,c:12,g:67,unit:'g',cat:'🫒 Grassi'},
    {id:'v27_tahini',name:'Tahini (crema sesamo)',kcal:595,p:17,c:21,g:54,unit:'g',cat:'🫒 Grassi'},
    {id:'v27_olio_cocco',name:'Olio di cocco',kcal:862,p:0,c:0,g:100,unit:'g',cat:'🫒 Grassi'},
    {id:'v27_ghee',name:'Ghee (burro chiarificato)',kcal:900,p:0,c:0,g:100,unit:'g',cat:'🫒 Grassi'},
    {id:'v27_avena_noc',name:'Crema di nocciole',kcal:550,p:7,c:57,g:33,unit:'g',cat:'🫒 Grassi'},
    /* SNACK e ALTRO */
    {id:'v27_crackers',name:'Crackers integrali',kcal:419,p:11,c:70,g:12,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_wafer_prot',name:'Barretta proteica',kcal:350,p:25,c:40,g:10,unit:'g',cat:'💊 Integratori'},
    {id:'v27_riso_souf',name:'Gallette mais soffiato',kcal:393,p:8,c:84,g:2,unit:'g',cat:'🌾 Cereali'},
    {id:'v27_miso',name:'Miso (pasta di soia)',kcal:199,p:12,c:27,g:6,unit:'g',cat:'🫘 Legumi'},
    {id:'v27_tofu_seta',name:'Tofu setoso',kcal:55,p:5,c:3,g:3,unit:'g',cat:'🫘 Legumi'},
    /* BEVANDE */
    {id:'v27_caffe',name:'Caffè espresso',kcal:2,p:0,c:0,g:0,unit:'ml',cat:'☕ Bevande'},
    {id:'v27_te_verde',name:'Tè verde',kcal:1,p:0,c:0,g:0,unit:'ml',cat:'☕ Bevande'},
    {id:'v27_latte_mand',name:'Latte di mandorla',kcal:24,p:1,c:3,g:1,unit:'ml',cat:'☕ Bevande'},
    {id:'v27_latte_soia',name:'Latte di soia',kcal:33,p:3,c:3,g:2,unit:'ml',cat:'☕ Bevande'},
    {id:'v27_latte_avena',name:'Latte di avena',kcal:45,p:1,c:8,g:1,unit:'ml',cat:'☕ Bevande'},
    {id:'v27_succo_arancia',name:'Succo d\'arancia',kcal:45,p:1,c:10,g:0,unit:'ml',cat:'☕ Bevande'},
    {id:'v27_acqua_coc',name:'Acqua di cocco',kcal:19,p:0,c:4,g:0,unit:'ml',cat:'☕ Bevande'},
    /* CONDIMENTI */
    {id:'v27_aceto_balsa',name:'Aceto balsamico',kcal:88,p:0,c:17,g:0,unit:'ml',cat:'🥦 Verdure'},
    {id:'v27_salsa_soia',name:'Salsa di soia',kcal:53,p:8,c:5,g:1,unit:'ml',cat:'🥦 Verdure'},
    {id:'v27_worcester',name:'Salsa Worcester',kcal:78,p:2,c:18,g:0,unit:'ml',cat:'🥦 Verdure'},
  ];
  if(typeof FOOD_DB!=='undefined'){
    const ids=new Set(FOOD_DB.map(f=>f.id));
    extra.forEach(f=>{if(!ids.has(f.id)){FOOD_DB.push(f);}});
  }
})();

/* ══ 2. EXERCISE DB ESPANSIONE V27 ═════════════════════════════ */
(function expandExDB(){
  const extra=[
    /* PUSH — MANUBRI */
    {id:'v27_db_ohp',name:'OHP Manubri seduto',m:'push',tags:['spalle'],icon:'🔴',equipment:['manubri'],difficulty:'intermediate',desc:'Overhead press con manubri in posizione seduta, busto eretto.'},
    {id:'v27_incline_db',name:'Panca inclinata manubri',m:'push',tags:['petto alto','spalle'],icon:'🔴',equipment:['manubri','panca'],difficulty:'intermediate',desc:'Panca inclinata ~30°, movimenti controllati.'},
    {id:'v27_decline_db',name:'Panca declinata manubri',m:'push',tags:['petto basso'],icon:'🔴',equipment:['manubri','panca'],difficulty:'intermediate',desc:'Panca declinata per petto basso.'},
    {id:'v27_front_raise',name:'Front Raise',m:'push',tags:['spalle anteriori'],icon:'🔴',equipment:['manubri'],difficulty:'beginner',desc:'Alzate frontali con manubri.'},
    {id:'v27_arnold',name:'Arnold Press',m:'push',tags:['spalle'],icon:'🔴',equipment:['manubri'],difficulty:'intermediate',desc:'Variante dell\'OHP con rotazione del polso.'},
    {id:'v27_chest_fly',name:'Croci manubri piana',m:'push',tags:['petto'],icon:'🔴',equipment:['manubri','panca'],difficulty:'intermediate',desc:'Croci su panca piana.'},
    {id:'v27_tricep_kick',name:'Tricep Kickback',m:'push',tags:['tricipiti'],icon:'🔴',equipment:['manubri'],difficulty:'beginner',desc:'Estensioni tricipiti con manubri.'},
    {id:'v27_ov_ext_db',name:'Estensione tricipiti sopra testa',m:'push',tags:['tricipiti'],icon:'🔴',equipment:['manubri'],difficulty:'beginner',desc:'Manubrio sopra la testa, estensione tricipiti.'},
    /* PUSH — BILANCIERE */
    {id:'v27_close_bench',name:'Panca stretta bilanciere',m:'push',tags:['tricipiti','petto'],icon:'🔴',equipment:['bilanciere','panca'],difficulty:'intermediate',desc:'Presa stretta per enfasi tricipiti.'},
    {id:'v27_floor_press',name:'Floor Press',m:'push',tags:['petto','tricipiti'],icon:'🔴',equipment:['bilanciere'],difficulty:'intermediate',desc:'Panca piana eseguita a terra.'},
    {id:'v27_incline_bar',name:'Panca inclinata bilanciere',m:'push',tags:['petto alto'],icon:'🔴',equipment:['bilanciere','panca'],difficulty:'intermediate',desc:'Panca inclinata con bilanciere.'},
    /* PULL — MANUBRI */
    {id:'v27_db_row',name:'Rematore manubrio',m:'pull',tags:['dorsali','bicipiti'],icon:'🟢',equipment:['manubri'],difficulty:'beginner',desc:'Rematore unilaterale con manubrio, ginocchio sulla panca.'},
    {id:'v27_db_curl',name:'Curl manubri alternati',m:'pull',tags:['bicipiti'],icon:'🟢',equipment:['manubri'],difficulty:'beginner',desc:'Curl alternati con manubri.'},
    {id:'v27_conc_curl_db',name:'Curl concentrato',m:'pull',tags:['bicipiti'],icon:'🟢',equipment:['manubri'],difficulty:'beginner',desc:'Curl concentrato su coscia.'},
    {id:'v27_rev_fly',name:'Alzate posteriori',m:'pull',tags:['spalle posteriori','romboidi'],icon:'🟢',equipment:['manubri'],difficulty:'intermediate',desc:'Alzate per spalle posteriori busto inclinato.'},
    {id:'v27_renegade',name:'Renegade Row',m:'pull',tags:['dorsali','core'],icon:'🟢',equipment:['manubri'],difficulty:'advanced',desc:'Rematore in posizione da push-up alternato.'},
    /* PULL — BILANCIERE */
    {id:'v27_bar_curl',name:'Curl bilanciere',m:'pull',tags:['bicipiti'],icon:'🟢',equipment:['bilanciere'],difficulty:'beginner',desc:'Curl con bilanciere presa supina.'},
    {id:'v27_goodmorning',name:'Good Morning',m:'pull',tags:['schiena bassa','femorali'],icon:'🟢',equipment:['bilanciere'],difficulty:'intermediate',desc:'Esercizio per lombare e femorali.'},
    {id:'v27_rdl',name:'Romanian Deadlift',m:'pull',tags:['femorali','glutei'],icon:'🟢',equipment:['bilanciere'],difficulty:'intermediate',desc:'Stacco rumeno per femorali.'},
    {id:'v27_rdl_db',name:'Romanian Deadlift manubri',m:'pull',tags:['femorali','glutei'],icon:'🟢',equipment:['manubri'],difficulty:'intermediate',desc:'Stacco rumeno con manubri.'},
    /* LEGS — MANUBRI/BILANCIERE */
    {id:'v27_split_squat_db',name:'Split Squat manubri',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡',equipment:['manubri'],difficulty:'beginner',desc:'Split squat con manubri.'},
    {id:'v27_lunge_db',name:'Affondi manubri',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡',equipment:['manubri'],difficulty:'beginner',desc:'Affondi alternati con manubri.'},
    {id:'v27_sumo_bar',name:'Sumo Deadlift bilanciere',m:'lower',tags:['glutei','femorali','adduttori'],icon:'🟡',equipment:['bilanciere'],difficulty:'intermediate',desc:'Stacco sumo con presa larga.'},
    {id:'v27_step_up',name:'Step-up',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡',equipment:['manubri'],difficulty:'beginner',desc:'Step-up su rialzo con manubri.'},
    {id:'v27_hip_thrust_db',name:'Hip Thrust manubri',m:'lower',tags:['glutei'],icon:'🟡',equipment:['manubri','panca'],difficulty:'beginner',desc:'Hip thrust con manubrio sul bacino.'},
    {id:'v27_hip_thrust_bar',name:'Hip Thrust bilanciere',m:'lower',tags:['glutei'],icon:'🟡',equipment:['bilanciere','panca'],difficulty:'intermediate',desc:'Hip thrust con bilanciere.'},
    {id:'v27_calf_seated',name:'Calf Raises seduto',m:'lower',tags:['polpacci'],icon:'🟡',equipment:['manubri'],difficulty:'beginner',desc:'Calf raises seduto con manubri sulle ginocchia.'},
    /* KETTLEBELL */
    {id:'v27_kb_clean',name:'Kettlebell Clean',m:'push',tags:['spalle','schiena'],icon:'🔴',equipment:['kettlebell'],difficulty:'intermediate',desc:'Clean con kettlebell.'},
    {id:'v27_kb_press',name:'Kettlebell Press',m:'push',tags:['spalle'],icon:'🔴',equipment:['kettlebell'],difficulty:'intermediate',desc:'Press unilaterale con kettlebell.'},
    {id:'v27_kb_snatch',name:'Kettlebell Snatch',m:'cardio',tags:['full body','esplosività'],icon:'⚪',equipment:['kettlebell'],difficulty:'advanced',desc:'Snatch con kettlebell, esercizio esplosivo.'},
    {id:'v27_kb_tgu',name:'Turkish Get-Up',m:'core',tags:['core','spalle'],icon:'🔵',equipment:['kettlebell'],difficulty:'advanced',desc:'Turkish get-up, esercizio complesso.'},
    {id:'v27_kb_goblet',name:'Goblet Squat KB',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡',equipment:['kettlebell'],difficulty:'beginner',desc:'Squat con kettlebell al petto.'},
    {id:'v27_kb_deadlift',name:'Single-leg Deadlift KB',m:'lower',tags:['femorali','glutei','equilibrio'],icon:'🟡',equipment:['kettlebell'],difficulty:'intermediate',desc:'Stacco su una gamba con kettlebell.'},
    /* BANDE ELASTICHE */
    {id:'v27_band_squat',name:'Squat con banda',m:'lower',tags:['quadricipiti','glutei'],icon:'🟡',equipment:['bande'],difficulty:'beginner',desc:'Squat con resistenza delle bande.'},
    {id:'v27_band_pull',name:'Pull-apart bande',m:'pull',tags:['spalle posteriori','romboidi'],icon:'🟢',equipment:['bande'],difficulty:'beginner',desc:'Pull-apart per spalle posteriori.'},
    {id:'v27_band_row',name:'Row con banda',m:'pull',tags:['dorsali'],icon:'🟢',equipment:['bande'],difficulty:'beginner',desc:'Rematore con banda elastica.'},
    {id:'v27_band_press',name:'Chest Press con banda',m:'push',tags:['petto'],icon:'🔴',equipment:['bande'],difficulty:'beginner',desc:'Press orizzontale con banda.'},
    {id:'v27_band_curl',name:'Curl bicipiti con banda',m:'pull',tags:['bicipiti'],icon:'🟢',equipment:['bande'],difficulty:'beginner',desc:'Curl con banda elastica.'},
    {id:'v27_band_hip',name:'Hip Thrust con banda',m:'lower',tags:['glutei'],icon:'🟡',equipment:['bande'],difficulty:'beginner',desc:'Hip thrust con resistenza banda.'},
    /* CARDIO */
    {id:'v27_corsa',name:'Corsa (tapis roulant)',m:'cardio',tags:['cardio','endurance'],icon:'⚪',equipment:['tapis_roulant'],difficulty:'beginner',desc:'Corsa a ritmo costante.'},
    {id:'v27_bici',name:'Cyclette',m:'cardio',tags:['cardio'],icon:'⚪',equipment:['cyclette'],difficulty:'beginner',desc:'Pedalata a intensità variabile.'},
    {id:'v27_nuoto',name:'Nuoto',m:'cardio',tags:['cardio','full body'],icon:'⚪',equipment:[],difficulty:'intermediate',desc:'Nuoto continuato.'},
    {id:'v27_hiit_run',name:'HIIT Corsa intervallata',m:'cardio',tags:['cardio','HIIT'],icon:'⚪',equipment:['tapis_roulant'],difficulty:'intermediate',desc:'Sprint 30s + recupero 30s.'},
    {id:'v27_jump_squat',name:'Jump Squat',m:'cardio',tags:['esplosività','gambe'],icon:'⚪',equipment:[],difficulty:'intermediate',desc:'Squat esplosivo con salto.'},
    {id:'v27_skip',name:'Skip sul posto',m:'cardio',tags:['cardio'],icon:'⚪',equipment:[],difficulty:'beginner',desc:'Corsa sul posto con ginocchia alte.'},
    {id:'v27_rowing_erg',name:'Vogatore (ergometro)',m:'cardio',tags:['cardio','schiena'],icon:'⚪',equipment:['cardio'],difficulty:'intermediate',desc:'Vogatore a ritmo costante.'},
    /* CORE */
    {id:'v27_crunch',name:'Crunch classico',m:'core',tags:['addominali'],icon:'🔵',equipment:[],difficulty:'beginner',desc:'Crunch addominale base.'},
    {id:'v27_bicycle',name:'Bicycle Crunch',m:'core',tags:['addominali','obliqui'],icon:'🔵',equipment:[],difficulty:'beginner',desc:'Crunch con rotazione alternata.'},
    {id:'v27_leg_raise',name:'Leg Raise',m:'core',tags:['addominali bassi','hip flexor'],icon:'🔵',equipment:[],difficulty:'intermediate',desc:'Sollevamento gambe disteso.'},
    {id:'v27_russian_tw',name:'Russian Twist',m:'core',tags:['obliqui'],icon:'🔵',equipment:[],difficulty:'intermediate',desc:'Rotazione con peso o senza.'},
    {id:'v27_dead_bug',name:'Dead Bug',m:'core',tags:['core','stabilità'],icon:'🔵',equipment:[],difficulty:'beginner',desc:'Esercizio di stabilità core.'},
    {id:'v27_bird_dog',name:'Bird Dog',m:'core',tags:['core','schiena bassa'],icon:'🔵',equipment:[],difficulty:'beginner',desc:'Estensione alternata arto superiore e inferiore.'},
    {id:'v27_pallof_press',name:'Pallof Press',m:'core',tags:['core','anti-rotazione'],icon:'🔵',equipment:['macchinari','bande'],difficulty:'intermediate',desc:'Press anti-rotazione.'},
    /* STRETCHING/MOBILITÀ */
    {id:'v27_hip_flex',name:'Hip Flexor Stretch',m:'mobility',tags:['flessori anca'],icon:'🤸',equipment:[],difficulty:'beginner',desc:'Allungamento flessori anca in affondo.'},
    {id:'v27_pigeon',name:'Pigeon Pose',m:'mobility',tags:['glutei','anche'],icon:'🤸',equipment:[],difficulty:'intermediate',desc:'Pigeon pose yoga per glutei.'},
    {id:'v27_cat_cow',name:'Cat-Cow',m:'mobility',tags:['colonna vertebrale'],icon:'🤸',equipment:[],difficulty:'beginner',desc:'Mobilità spinale.'},
  ];
  if(typeof EX_DB!=='undefined'){
    const ids=new Set(EX_DB.map(e=>e.id));
    extra.forEach(e=>{if(!ids.has(e.id)){EX_DB.push(e);}});
  }
})();

/* ══ 3. ESERCIZI PERSONALIZZATI ════════════════════════════════ */
const CEX_KEY='ft_custom_exercises_v27';
function loadCEX(){try{return JSON.parse(localStorage.getItem(CEX_KEY)||'[]');}catch(e){return[];}}
function saveCEX(arr){try{localStorage.setItem(CEX_KEY,JSON.stringify(arr));}catch(e){}}
function mergeCEX(){
  if(typeof EX_DB==='undefined') return;
  const saved=loadCEX();
  const ids=new Set(EX_DB.map(e=>e.id));
  saved.forEach(e=>{if(!ids.has(e.id)){EX_DB.push(e);ids.add(e.id);}});
}

window.openAddCustomExModal=function(editId){
  if(qs('v27-cex-modal'))qs('v27-cex-modal').remove();
  const existing=editId?loadCEX().find(e=>e.id===editId):null;
  const ovl=document.createElement('div');
  ovl.id='v27-cex-modal';
  ovl.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:9200;display:flex;align-items:flex-end;backdrop-filter:blur(8px)';
  ovl.innerHTML=`
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;max-height:90vh;overflow-y:auto;padding:24px 20px 44px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:18px;font-weight:800">${editId?'✏️ Modifica':'➕ Nuovo'} Esercizio</div>
      <button onclick="qs('v27-cex-modal').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px">&times;</button>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div>
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Nome esercizio *</div>
        <input id="cex-name" value="${existing?.name||''}" placeholder="Es. Curl manubri alternati" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px 13px;font-size:14px;color:var(--text);outline:none">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Gruppo muscolare *</div>
          <select id="cex-group" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:13px;color:var(--text);outline:none">
            ${['push','pull','lower','core','cardio','mobility','skill'].map(g=>`<option value="${g}" ${existing?.m===g?'selected':''}>${g}</option>`).join('')}
          </select>
        </div>
        <div>
          <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Difficoltà</div>
          <select id="cex-diff" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:13px;color:var(--text);outline:none">
            ${['beginner','intermediate','advanced'].map(d=>`<option value="${d}" ${(existing?.difficulty||'intermediate')===d?'selected':''}>${d}</option>`).join('')}
          </select>
        </div>
      </div>
      <div>
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Muscoli (separati da virgola)</div>
        <input id="cex-tags" value="${existing?.tags?.join(', ')||''}" placeholder="Es. petto, tricipiti" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px 13px;font-size:14px;color:var(--text);outline:none">
      </div>
      <div>
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Attrezzatura (separata da virgola)</div>
        <input id="cex-equip" value="${existing?.equipment?.join(', ')||''}" placeholder="Es. manubri, panca" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px 13px;font-size:14px;color:var(--text);outline:none">
      </div>
      <div>
        <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Descrizione breve</div>
        <textarea id="cex-desc" placeholder="Come si esegue l'esercizio..." style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px 13px;font-size:13px;color:var(--text);outline:none;resize:none;height:70px;line-height:1.5">${existing?.desc||''}</textarea>
      </div>
    </div>
    <button onclick="saveCEX_modal('${editId||''}')" style="width:100%;padding:14px;background:var(--acc);color:#080810;border:none;border-radius:14px;font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer;margin-top:16px">💾 Salva esercizio</button>
  </div>`;
  document.body.appendChild(ovl);
};

window.saveCEX_modal=function(editId){
  const name=qs('cex-name')?.value?.trim();
  if(!name){showT('⚠️ Inserisci il nome');return;}
  const group=qs('cex-group')?.value||'push';
  const diff=qs('cex-diff')?.value||'intermediate';
  const tagsRaw=qs('cex-tags')?.value||'';
  const equipRaw=qs('cex-equip')?.value||'';
  const desc=qs('cex-desc')?.value?.trim()||'';
  const tags=tagsRaw.split(',').map(t=>t.trim()).filter(Boolean);
  const equipment=equipRaw.split(',').map(t=>t.trim()).filter(Boolean);
  const icons={push:'🔴',pull:'🟢',lower:'🟡',core:'🔵',cardio:'⚪',mobility:'🤸',skill:'🟣'};
  if(editId){
    const arr=loadCEX();
    const idx=arr.findIndex(e=>e.id===editId);
    if(idx>=0){arr[idx]={...arr[idx],name,m:group,difficulty:diff,tags,equipment,desc};saveCEX(arr);}
    const dbIdx=typeof EX_DB!=='undefined'?EX_DB.findIndex(e=>e.id===editId):-1;
    if(dbIdx>=0){EX_DB[dbIdx]={...EX_DB[dbIdx],name,m:group,difficulty:diff,tags,equipment,desc};}
    showT(`✅ "${name}" aggiornato`);
  } else {
    const id='cex_'+Date.now();
    const ex={id,name,m:group,difficulty:diff,tags,equipment,desc,icon:icons[group]||'⚡',custom:true};
    const arr=loadCEX();arr.push(ex);saveCEX(arr);
    if(typeof EX_DB!=='undefined') EX_DB.push(ex);
    showT(`✅ "${name}" aggiunto al database!`);
  }
  qs('v27-cex-modal')?.remove();
};

window.openCustomExList=function(){
  if(qs('v27-cex-list'))return;
  const arr=loadCEX();
  const ovl=document.createElement('div');
  ovl.id='v27-cex-list';
  ovl.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:9200;display:flex;align-items:flex-end;backdrop-filter:blur(8px)';
  const renderList=()=>{
    const items=loadCEX();
    qs('v27-cex-list-body').innerHTML=items.length?items.map(e=>`
      <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg3);border-radius:12px;margin-bottom:8px;border:1px solid var(--border)">
        <div style="font-size:22px">${e.icon||'⚡'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:700">${e.name} <span style="font-size:10px;background:var(--acc4);color:var(--acc);border-radius:4px;padding:1px 5px;font-weight:800">CUSTOM</span></div>
          <div style="font-size:11px;color:var(--text2)">${e.m} · ${e.difficulty||'—'} · ${(e.tags||[]).join(', ')||'—'}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0">
          <button onclick="openAddCustomExModal('${e.id}')" style="background:var(--blue-d);border:1px solid rgba(91,156,239,.2);border-radius:8px;padding:6px 8px;color:var(--blue);font-size:12px;cursor:pointer">✏️</button>
          <button onclick="deleteCEX('${e.id}')" style="background:var(--red-d);border:1px solid rgba(255,92,106,.2);border-radius:8px;padding:6px 8px;color:var(--red);font-size:12px;cursor:pointer">🗑️</button>
        </div>
      </div>`).join(''):'<div style="text-align:center;color:var(--text3);padding:20px">Nessun esercizio personalizzato</div>';
  };
  ovl.innerHTML=`
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;max-height:85vh;overflow-y:auto;padding:24px 20px 44px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:18px;font-weight:800">🏋️ I miei esercizi</div>
      <button onclick="qs('v27-cex-list').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px">&times;</button>
    </div>
    <button onclick="openAddCustomExModal()" style="width:100%;padding:11px;background:var(--acc4);border:1.5px solid rgba(200,245,60,.25);border-radius:12px;color:var(--acc);font-size:13px;font-weight:800;cursor:pointer;margin-bottom:14px">➕ Nuovo esercizio personalizzato</button>
    <div id="v27-cex-list-body"></div>
  </div>`;
  document.body.appendChild(ovl);
  renderList();
};

window.deleteCEX=function(id){
  saveCEX(loadCEX().filter(e=>e.id!==id));
  if(typeof EX_DB!=='undefined'){const idx=EX_DB.findIndex(e=>e.id===id);if(idx>=0)EX_DB.splice(idx,1);}
  qs('v27-cex-list')?.remove();
  showT('🗑️ Esercizio rimosso');
};

/* ══ 4. GENERA ALLENAMENTO SMART ═══════════════════════════════ */
/* Mappa attrezzatura → tag esercizio */
const EQ_MAP={
  bilanciere:['bilanciere'],manubri:['manubri'],kettlebell:['kettlebell'],
  sbarra:['sbarra','pull-up'],bande:['bande','elastiche'],
  tapis_roulant:['tapis_roulant'],cyclette:['cyclette'],
  macchinari:['macchinari'],panca:['panca'],niente:[],accessori:['accessori']
};

function getAvailableEquipment(){
  try{
    const saved=JSON.parse(localStorage.getItem('ft_equipment')||'[]');
    return new Set(saved);
  }catch(e){return new Set(['niente']);}
}

function exerciseFitsEquipment(ex, availEq){
  if(!ex.equipment||ex.equipment.length===0) return true; // corpo libero
  return ex.equipment.some(eq=>availEq.has(eq)||availEq.has('macchinari'));
}

function generateSmartWorkout(opts={}){
  const {goal='maintain',muscles=[],difficulty='intermediate',days=3}=opts;
  const availEq=getAvailableEquipment();
  const allExercises=typeof EX_DB!=='undefined'?EX_DB:[];

  // Filtra per attrezzatura
  const available=allExercises.filter(e=>exerciseFitsEquipment(e,availEq));

  // Funzione per ottenere esercizi per gruppo
  function getByGroup(group,n,diffFilter){
    const pool=available.filter(e=>{
      if(e.m!==group) return false;
      if(diffFilter==='beginner') return (e.difficulty||'intermediate')==='beginner'||(e.difficulty||'intermediate')==='intermediate';
      if(diffFilter==='advanced') return true;
      return true;
    });
    const shuffled=[...pool].sort(()=>Math.random()-.5);
    return shuffled.slice(0,n);
  }

  // Preset macro per obiettivo
  const goalPresets={
    cut:{pPct:.30,cPct:.40,gPct:.30,kcalMult:.80},
    bulk:{pPct:.25,cPct:.50,gPct:.25,kcalMult:1.15},
    maintain:{pPct:.25,cPct:.45,gPct:.30,kcalMult:1.00},
    recomp:{pPct:.30,cPct:.40,gPct:.30,kcalMult:1.00}
  };

  // Struttura settimana in base ai giorni
  const weekStructures={
    1:[{type:'full',name:'Full Body'}],
    2:[{type:'upper',name:'Upper Body'},{type:'lower',name:'Lower Body'}],
    3:[{type:'push',name:'Push (Petto/Spalle/Tricipiti)'},{type:'pull',name:'Pull (Schiena/Bicipiti)'},{type:'lower',name:'Lower (Gambe/Glutei)'}],
    4:[{type:'push',name:'Push'},{type:'pull',name:'Pull'},{type:'lower',name:'Gambe'},{type:'full',name:'Full Body Leggero'}],
    5:[{type:'push',name:'Push'},{type:'pull',name:'Pull'},{type:'lower',name:'Gambe'},{type:'push',name:'Push Volume'},{type:'pull',name:'Pull Volume'}],
  };
  const structure=weekStructures[Math.min(days,5)]||weekStructures[3];

  const workoutDays=structure.map(({type,name})=>{
    let exercises=[];
    const sets=goal==='cut'?'3':goal==='bulk'?'4':'3';
    const reps=goal==='cut'?'12-15':goal==='bulk'?'6-10':'10-12';
    const rest=goal==='cut'?'45s':goal==='bulk'?'90s':'60s';

    if(type==='push'||type==='upper'||type==='full'){
      const pushEx=getByGroup('push',type==='full'?2:4,difficulty);
      pushEx.forEach(e=>exercises.push({id:e.id,s:sets,r:reps,rs:rest}));
    }
    if(type==='pull'||type==='upper'||type==='full'){
      const pullEx=getByGroup('pull',type==='full'?2:4,difficulty);
      pullEx.forEach(e=>exercises.push({id:e.id,s:sets,r:reps,rs:rest}));
    }
    if(type==='lower'||type==='full'){
      const lowerEx=getByGroup('lower',type==='full'?3:5,difficulty);
      lowerEx.forEach(e=>exercises.push({id:e.id,s:sets,r:reps,rs:rest}));
    }
    // Core sempre
    const coreEx=getByGroup('core',2,difficulty);
    coreEx.forEach(e=>exercises.push({id:e.id,s:'3',r:'30-45s',rs:'30s'}));

    return {name,type,rest:false,exercises};
  });

  return {
    id:'generated_'+Date.now(),
    name:`Workout Generato — ${goal.charAt(0).toUpperCase()+goal.slice(1)}`,
    icon:'⚡',
    color:'var(--acc)',
    t:'full',
    diff:difficulty,
    dur:'50',
    goals:[goal],
    levels:[difficulty],
    desc:`Allenamento generato automaticamente per ${goal}. ${days} giorni/settimana. Attrezzatura: ${availEq.size>0?[...availEq].join(', '):'corpo libero'}.`,
    days:workoutDays,
    generated:true,
    goalMacros:goalPresets[goal]||goalPresets.maintain
  };
}

window.openGenerateWorkoutModal=function(){
  if(qs('v27-gen-modal'))return;
  const availEq=getAvailableEquipment();
  const ovl=document.createElement('div');
  ovl.id='v27-gen-modal';
  ovl.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:9300;display:flex;align-items:flex-end;backdrop-filter:blur(10px)';
  ovl.innerHTML=`
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:26px 26px 0 0;width:100%;max-height:92vh;overflow-y:auto;padding:24px 20px 48px">
    <div style="width:40px;height:4px;border-radius:4px;background:var(--border2);margin:0 auto 20px"></div>
    <div style="font-size:20px;font-weight:800;margin-bottom:4px">⚡ Genera Allenamento</div>
    <div style="font-size:12px;color:var(--text2);margin-bottom:24px">Crea una scheda personalizzata basata sulla tua attrezzatura e obiettivi</div>

    
    <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:8px">Attrezzatura rilevata</div>
    <div style="background:var(--bg3);border-radius:12px;padding:12px 14px;margin-bottom:18px;font-size:12px;color:var(--text2)">
      ${availEq.size?[...availEq].map(e=>`<span style="display:inline-block;background:var(--bg4);border:1px solid var(--border);border-radius:8px;padding:3px 10px;margin:2px;font-size:11px;font-weight:700">${e}</span>`).join(''):'<span style="color:var(--text3)">Nessuna configurata — corpo libero</span>'}
      <button onclick="openEquipmentSettings()" style="display:block;margin-top:8px;padding:6px 12px;background:var(--acc4);border:1px solid rgba(200,245,60,.2);border-radius:8px;color:var(--acc);font-size:11px;font-weight:700;cursor:pointer">⚙️ Modifica attrezzatura</button>
    </div>

    
    <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:8px">Obiettivo</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px">
      ${[['cut','🔴 Definizione'],['bulk','🟢 Massa'],['maintain','🟡 Mantenimento'],['recomp','🔄 Recomp']].map(([k,lbl])=>`
      <div onclick="v27SelGoal('${k}',this)" data-goal="${k}" class="v27-goal-btn"
        style="padding:12px;border-radius:12px;cursor:pointer;border:1.5px solid var(--border);background:var(--bg3);text-align:center;font-size:13px;font-weight:700;transition:all .15s">
        ${lbl}
      </div>`).join('')}
    </div>

    
    <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:8px">Giorni/settimana</div>
    <div style="display:flex;gap:8px;margin-bottom:18px">
      ${[1,2,3,4,5].map(n=>`
      <div onclick="v27SelDays(${n},this)" data-days="${n}" class="v27-days-btn"
        style="flex:1;height:42px;border-radius:10px;cursor:pointer;border:1.5px solid var(--border);background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800;transition:all .15s">
        ${n}
      </div>`).join('')}
    </div>

    
    <div style="font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:8px">Livello</div>
    <div style="display:flex;background:var(--bg4);border-radius:12px;padding:3px;gap:3px;margin-bottom:24px">
      ${[['beginner','Principiante'],['intermediate','Intermedio'],['advanced','Avanzato']].map(([k,lbl])=>`
      <button onclick="v27SelDiff('${k}',this)" data-diff="${k}" class="v27-diff-btn"
        style="flex:1;padding:9px 0;border:none;border-radius:9px;font-family:'Syne',sans-serif;font-size:11px;font-weight:800;cursor:pointer;transition:all .15s;background:transparent;color:var(--text2)">
        ${lbl}
      </button>`).join('')}
    </div>

    <button onclick="v27DoGenerate()"
      style="width:100%;padding:16px;background:var(--acc);color:#080810;border:none;border-radius:16px;font-family:'Syne',sans-serif;font-size:15px;font-weight:800;cursor:pointer;letter-spacing:.02em">
      ⚡ Genera Scheda
    </button>
  </div>`;
  document.body.appendChild(ovl);
  ovl.addEventListener('click',e=>{if(e.target===ovl)ovl.remove();});
  // Default selections
  setTimeout(()=>{
    document.querySelector('[data-goal="maintain"]')&&v27SelGoal('maintain',document.querySelector('[data-goal="maintain"]'));
    document.querySelector('[data-days="3"]')&&v27SelDays(3,document.querySelector('[data-days="3"]'));
    v27SelDiff('intermediate',document.querySelector('[data-diff="intermediate"]'));
  },50);
};

window._v27genOpts={goal:'maintain',days:3,difficulty:'intermediate'};

window.v27SelGoal=function(k,el){
  window._v27genOpts.goal=k;
  document.querySelectorAll('.v27-goal-btn').forEach(b=>{
    b.style.borderColor='var(--border)';b.style.background='var(--bg3)';b.style.color='var(--text)';
  });
  if(el){el.style.borderColor='var(--acc)';el.style.background='var(--acc4)';el.style.color='var(--acc)';}
};
window.v27SelDays=function(n,el){
  window._v27genOpts.days=n;
  document.querySelectorAll('.v27-days-btn').forEach(b=>{
    b.style.borderColor='var(--border)';b.style.background='var(--bg3)';b.style.color='var(--text)';
  });
  if(el){el.style.borderColor='var(--acc)';el.style.background='var(--acc4)';el.style.color='var(--acc)';}
};
window.v27SelDiff=function(k,el){
  window._v27genOpts.difficulty=k;
  document.querySelectorAll('.v27-diff-btn').forEach(b=>{
    b.style.background='transparent';b.style.color='var(--text2)';
  });
  if(el){el.style.background='var(--acc)';el.style.color='#080810';}
};

window.v27DoGenerate=function(){
  const opts=window._v27genOpts||{goal:'maintain',days:3,difficulty:'intermediate'};
  const workout=generateSmartWorkout(opts);
  // Save to profile
  if(typeof profile!=='undefined'){
    profile.generatedWorkout=workout;
    if(typeof saveAll==='function') saveAll();
  }
  qs('v27-gen-modal')?.remove();
  showT('⚡ Scheda generata! Vai su Training → Generato');
  // Show generated workout in training section
  showGeneratedWorkout(workout);
};

function showGeneratedWorkout(workout){
  // Inject into training section as a preview
  if(qs('v27-generated-section')){qs('v27-generated-section').remove();}
  const trainingRoot=qs('page-training')||qs('scr-training');
  if(!trainingRoot) return;
  // Navigate to training
  if(typeof goPage==='function') goPage('allenamento');
  setTimeout(()=>{
    const container=qs('page-training')?.querySelector('.page-body')||qs('page-training');
    if(!container) return;
    const section=document.createElement('div');
    section.id='v27-generated-section';
    section.style.cssText='margin:16px;background:linear-gradient(135deg,rgba(200,245,60,.07),rgba(200,245,60,.03));border:1.5px solid rgba(200,245,60,.3);border-radius:18px;overflow:hidden';
    section.innerHTML=`
      <div style="padding:16px 18px;border-bottom:1px solid rgba(200,245,60,.15)">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-size:24px">⚡</div>
          <div style="flex:1">
            <div style="font-size:9px;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.1em">GENERATO PER TE</div>
            <div style="font-size:15px;font-weight:800">${workout.name}</div>
            <div style="font-size:11px;color:var(--text2)">${workout.desc}</div>
          </div>
          <button onclick="qs('v27-generated-section').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:28px;height:28px;color:var(--text2);cursor:pointer;font-size:14px;flex-shrink:0">&times;</button>
        </div>
        <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap">
          <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--acc4);color:var(--acc)">${workout.diff}</span>
          <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2)">${workout.days.length} giorni</span>
          <span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:99px;background:var(--bg4);color:var(--text2)">${workout.dur} min</span>
        </div>
      </div>
      ${workout.days.map((d,di)=>`
      <div style="border-bottom:1px solid rgba(255,255,255,.04)">
        <div onclick="this.nextElementSibling.style.display=this.nextElementSibling.style.display==='none'?'block':'none'"
          style="padding:14px 18px;cursor:pointer;display:flex;align-items:center;gap:10px">
          <div style="font-size:18px">${d.type==='push'?'🔴':d.type==='pull'?'🟢':d.type==='lower'?'🦵':'🏋️'}</div>
          <div style="flex:1"><div style="font-size:13px;font-weight:700">${d.name}</div>
          <div style="font-size:11px;color:var(--text2)">${d.exercises.length} esercizi</div></div>
          <div style="color:var(--text3)">›</div>
        </div>
        <div style="display:${di===0?'block':'none'};padding:0 18px 14px">
          ${d.exercises.map(ex=>{
            const info=typeof EX_DB!=='undefined'?EX_DB.find(e=>e.id===ex.id):null;
            return info?`<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.03)">
              <div style="font-size:18px">${info.icon||'•'}</div>
              <div style="flex:1"><div style="font-size:13px;font-weight:600">${info.name}</div>
              <div style="font-size:11px;color:var(--text2)">${ex.s} serie × ${ex.r} · riposo ${ex.rs}</div></div>
            </div>`:''}).join('')}
        </div>
      </div>`).join('')}
      <div style="padding:14px 18px">
        <button onclick="useGeneratedWorkout()" style="width:100%;padding:12px;background:var(--acc);color:#080810;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer">✅ Usa questa scheda</button>
      </div>`;
    try { container.insertBefore(section,container.firstChild); } catch(e) { container.appendChild(section); }
  },200);
}

window.useGeneratedWorkout=function(){
  const w=profile?.generatedWorkout;
  if(!w){showT('Nessun workout generato');return;}
  if(typeof PRESETS_DATA!=='undefined'){
    const existing=PRESETS_DATA.findIndex(p=>p.id===w.id||p.generated);
    if(existing>=0) PRESETS_DATA[existing]=w; else PRESETS_DATA.unshift(w);
  }
  if(typeof profile!=='undefined'){profile.selectedPreset=w.id;if(typeof saveAll==='function')saveAll();}
  if(typeof renderTraining==='function') renderTraining();
  qs('v27-generated-section')?.remove();
  showT('✅ Scheda attivata!');
};

/* ══ 5. SETUP ATTREZZATURA DA IMPOSTAZIONI ══════════════════════ */
const ALL_EQ_LIST=[
  {id:'bilanciere',label:'Bilanciere + Pesi',ico:'🏋️'},
  {id:'manubri',label:'Manubri',ico:'💪'},
  {id:'kettlebell',label:'Kettlebell',ico:'🔔'},
  {id:'sbarra',label:'Sbarra per trazioni',ico:'🤸'},
  {id:'bande',label:'Bande elastiche',ico:'🪢'},
  {id:'tapis_roulant',label:'Tapis roulant',ico:'🏃'},
  {id:'panca',label:'Panca piana',ico:'🪑'},
  {id:'macchinari',label:'Macchine isotoniche',ico:'🦾'},
  {id:'cyclette',label:'Cyclette',ico:'🚴'},
  {id:'accessori',label:'Accessori vari (TRX, parallele...)',ico:'🎯'},
  {id:'niente',label:'Solo corpo libero',ico:'🧘'},
];

window.openEquipmentSettings=function(){
  if(qs('v27-eq-modal'))return;
  const saved=getAvailableEquipment();
  const ovl=document.createElement('div');
  ovl.id='v27-eq-modal';
  ovl.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.82);z-index:9400;display:flex;align-items:flex-end;backdrop-filter:blur(10px)';
  ovl.innerHTML=`
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:26px 26px 0 0;width:100%;max-height:92vh;overflow-y:auto;padding:24px 20px 48px">
    <div style="width:40px;height:4px;border-radius:4px;background:var(--border2);margin:0 auto 20px"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
      <div style="font-size:19px;font-weight:800">⚙️ La mia palestra</div>
      <button onclick="qs('v27-eq-modal').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px">&times;</button>
    </div>
    <div style="font-size:12px;color:var(--text2);margin-bottom:20px">Seleziona l'attrezzatura disponibile. Gli allenamenti generati si adatteranno automaticamente.</div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px">
      ${ALL_EQ_LIST.map(e=>{
        const sel=saved.has(e.id);
        return `<div onclick="v27ToggleEq('${e.id}',this)" id="v27eq-${e.id}"
          style="display:flex;align-items:center;gap:14px;padding:13px 16px;border-radius:14px;cursor:pointer;background:${sel?'var(--acc4)':'var(--bg3)'};border:1.5px solid ${sel?'var(--acc)':'var(--border)'};transition:all .15s">
          <span style="font-size:22px">${e.ico}</span>
          <span style="font-size:13px;font-weight:700;flex:1">${e.label}</span>
          <span style="font-size:20px;color:${sel?'var(--acc)':'var(--border)'}">${sel?'✓':'○'}</span>
        </div>`;
      }).join('')}
    </div>
    <div style="margin-bottom:12px">
      <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:6px">Altro (campo libero)</div>
      <input id="v27-eq-custom" placeholder="Es. anelli ginnastica, pesi russi..." style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px 13px;font-size:13px;color:var(--text);outline:none">
    </div>
    <button onclick="v27SaveEquipment()" style="width:100%;padding:15px;background:var(--acc);color:#080810;border:none;border-radius:16px;font-family:'Syne',sans-serif;font-size:15px;font-weight:800;cursor:pointer">💾 Salva configurazione</button>
  </div>`;
  document.body.appendChild(ovl);
  ovl.addEventListener('click',e=>{if(e.target===ovl)ovl.remove();});
};

window.v27ToggleEq=function(id,el){
  const isOn=el.style.borderColor==='var(--acc)';
  if(id==='niente'&&!isOn){
    // Deselect all others
    ALL_EQ_LIST.forEach(e=>{
      if(e.id!=='niente'){
        const d=qs('v27eq-'+e.id);
        if(d){d.style.background='var(--bg3)';d.style.borderColor='var(--border)';d.querySelector('span:last-child').textContent='○';d.querySelector('span:last-child').style.color='var(--border)';}
      }
    });
  } else if(id!=='niente'&&!isOn){
    // Deselect "niente"
    const nd=qs('v27eq-niente');
    if(nd){nd.style.background='var(--bg3)';nd.style.borderColor='var(--border)';nd.querySelector('span:last-child').textContent='○';nd.querySelector('span:last-child').style.color='var(--border)';}
  }
  if(isOn){
    el.style.background='var(--bg3)';el.style.borderColor='var(--border)';
    el.querySelector('span:last-child').textContent='○';el.querySelector('span:last-child').style.color='var(--border)';
  } else {
    el.style.background='var(--acc4)';el.style.borderColor='var(--acc)';
    el.querySelector('span:last-child').textContent='✓';el.querySelector('span:last-child').style.color='var(--acc)';
  }
};

window.v27SaveEquipment=function(){
  const selected=ALL_EQ_LIST.filter(e=>{
    const d=qs('v27eq-'+e.id);
    return d&&d.style.borderColor==='var(--acc)';
  }).map(e=>e.id);
  const customRaw=qs('v27-eq-custom')?.value?.trim();
  if(customRaw) customRaw.split(',').forEach(c=>{const t=c.trim();if(t)selected.push(t);});
  localStorage.setItem('ft_equipment',JSON.stringify(selected));
  if(typeof profile!=='undefined') profile.equipment=selected;
  if(typeof window.obEquipment!=='undefined'){window.obEquipment.clear();selected.forEach(e=>window.obEquipment.add(e));}
  qs('v27-eq-modal')?.remove();
  // Aggiorna il pulsante nel pannello impostazioni se visibile
  const lbl=document.getElementById('sp-eq-label');
  const sub=document.getElementById('sp-eq-sub');
  if(lbl) lbl.textContent = selected.length > 0 ? 'Modifica attrezzatura' : 'Configura palestra';
  if(sub) sub.textContent = selected.length > 0
    ? selected.slice(0,3).join(', ') + (selected.length > 3 ? ` +${selected.length-3} altri` : '')
    : 'Nessuna attrezzatura configurata — tap per aggiungere';
  showT(`✅ Attrezzatura salvata (${selected.length} voci)`);
};

/* ══ 6. ALIMENTI CUSTOM — EDIT + BADGE ════════════════════════ */
// Patch openCustomFoodsList to add edit button and badge
window.openCustomFoodsList=function(){
  const arr=typeof loadCF==='function'?loadCF():[];
  if(qs('v27-cf-list')) qs('v27-cf-list').remove();
  const ovl=document.createElement('div');
  ovl.id='v27-cf-list';
  ovl.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:9100;display:flex;align-items:flex-end;backdrop-filter:blur(8px)';
  const renderBody=()=>{
    const items=typeof loadCF==='function'?loadCF():[];
    qs('v27-cf-body').innerHTML=items.length?items.map(f=>`
      <div style="display:flex;align-items:center;gap:10px;padding:12px;background:var(--bg3);border-radius:12px;margin-bottom:8px;border:1px solid var(--border)">
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:700">${f.name} <span style="font-size:10px;background:var(--acc4);color:var(--acc);border-radius:4px;padding:1px 5px;font-weight:800">✏️ CUSTOM</span></div>
          <div style="font-size:11px;color:var(--text2)">${f.kcal} kcal · P${f.p}g C${f.c}g G${f.g}g per 100g</div>
          <div style="font-size:10px;color:var(--text3)">${f.cat||''}</div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0">
          <button onclick="v27EditCF('${f.id}')" style="background:var(--blue-d);border:1px solid rgba(91,156,239,.2);border-radius:8px;padding:6px 9px;color:var(--blue);font-size:12px;cursor:pointer">✏️</button>
          <button onclick="v27DelCF('${f.id}')" style="background:var(--red-d);border:1px solid rgba(255,92,106,.2);border-radius:8px;padding:6px 9px;color:var(--red);font-size:12px;cursor:pointer">🗑️</button>
        </div>
      </div>`).join(''):'<div style="text-align:center;color:var(--text3);padding:20px">Nessun alimento personalizzato</div>';
  };
  ovl.innerHTML=`
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;max-height:85vh;overflow-y:auto;padding:24px 20px 44px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div style="font-size:18px;font-weight:800">📋 I miei alimenti</div>
      <button onclick="qs('v27-cf-list').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px">&times;</button>
    </div>
    <button onclick="openAddCustomFoodModal();qs('v27-cf-list').remove()" style="width:100%;padding:11px;background:var(--acc4);border:1.5px solid rgba(200,245,60,.25);border-radius:12px;color:var(--acc);font-size:13px;font-weight:800;cursor:pointer;margin-bottom:14px">➕ Nuovo alimento</button>
    <div id="v27-cf-body"></div>
  </div>`;
  document.body.appendChild(ovl);
  ovl.addEventListener('click',e=>{if(e.target===ovl)ovl.remove();});
  renderBody();
};

window.v27DelCF=function(id){
  if(typeof saveCF==='function'&&typeof loadCF==='function') saveCF(loadCF().filter(f=>f.id!==id));
  if(typeof FOOD_DB!=='undefined'){const idx=FOOD_DB.findIndex(f=>f.id===id);if(idx>=0)FOOD_DB.splice(idx,1);}
  qs('v27-cf-body')&&(window.openCustomFoodsList());
  showT('🗑️ Alimento rimosso');
};

window.v27EditCF=function(id){
  const f=typeof loadCF==='function'?loadCF().find(x=>x.id===id):null;
  if(!f) return;
  qs('v27-cf-list')?.remove();
  if(qs('v25-cf-modal'))qs('v25-cf-modal').remove();
  const ovl=document.createElement('div');
  ovl.id='v25-cf-modal';
  ovl.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:9100;display:flex;align-items:flex-end;backdrop-filter:blur(8px)';
  const cats=['🍗 Proteine','🌾 Carboidrati','🥑 Grassi','🥦 Verdure','🍎 Frutta','🥛 Latticini','🫘 Legumi','💊 Integratori','☕ Bevande','⚡ Altro'];
  ovl.innerHTML=`
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;padding:24px 20px 40px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <div style="font-size:18px;font-weight:800">✏️ Modifica alimento</div>
      <button onclick="qs('v25-cf-modal').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px">&times;</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px">
      <div style="grid-column:1/-1"><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Nome</div><input id="cf-name" value="${f.name}" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px 13px;font-size:14px;color:var(--text);outline:none"></div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:5px">Categoria</div>
        <select id="cf-cat" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:12px;color:var(--text);outline:none">
          ${cats.map(c=>`<option ${f.cat===c?'selected':''}>${c}</option>`).join('')}
        </select></div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--orange);margin-bottom:5px">Kcal/100g</div><input id="cf-kcal" type="number" value="${f.kcal}" oninput="cfCheck()" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:14px;color:var(--orange);outline:none"></div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--green);margin-bottom:5px">Proteine g</div><input id="cf-prot" type="number" value="${f.p}" oninput="cfCheck()" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:14px;color:var(--green);outline:none"></div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--blue);margin-bottom:5px">Carbs g</div><input id="cf-carbs" type="number" value="${f.c}" oninput="cfCheck()" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:14px;color:var(--blue);outline:none"></div>
      <div><div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--orange);margin-bottom:5px">Grassi g</div><input id="cf-fat" type="number" value="${f.g}" oninput="cfCheck()" style="width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:10px;padding:11px;font-size:14px;color:var(--orange);outline:none"></div>
    </div>
    <div id="cf-check-msg" style="font-size:11px;padding:8px 12px;border-radius:8px;background:var(--bg3);margin-bottom:14px;color:var(--text2)">Modifica i valori e salva</div>
    <button onclick="v27UpdateCF('${id}')" style="width:100%;padding:14px;background:var(--acc);color:#080810;border:none;border-radius:14px;font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer">💾 Aggiorna alimento</button>
  </div>`;
  document.body.appendChild(ovl);
};

window.v27UpdateCF=function(id){
  const name=qs('cf-name')?.value?.trim();
  if(!name){showT('⚠️ Inserisci il nome');return;}
  const kcal=safeN(qs('cf-kcal')?.value,0,900,0);
  const p=safeN(qs('cf-prot')?.value,0,200,0);
  const c=safeN(qs('cf-carbs')?.value,0,200,0);
  const g=safeN(qs('cf-fat')?.value,0,200,0);
  const cat=qs('cf-cat')?.value||'⚡ Altro';
  if(typeof loadCF==='function'&&typeof saveCF==='function'){
    const arr=loadCF();
    const idx=arr.findIndex(f=>f.id===id);
    if(idx>=0){arr[idx]={...arr[idx],name,kcal,p,c,g,cat};saveCF(arr);}
  }
  if(typeof FOOD_DB!=='undefined'){
    const idx=FOOD_DB.findIndex(f=>f.id===id);
    if(idx>=0) FOOD_DB[idx]={...FOOD_DB[idx],name,kcal,p,c,g,cat};
  }
  qs('v25-cf-modal')?.remove();
  showT(`✅ "${name}" aggiornato!`);
  if(typeof renderNutrizione==='function') renderNutrizione();
};

/* ══ 7. INIEZIONE PULSANTI UI ════════════════════════════════════
   Aggiunge pulsanti "Genera Allenamento", "I miei esercizi" e
   "Configura Palestra" nelle sezioni pertinenti dell'app
═════════════════════════════════════════════════════════════════ */
function injectV27Buttons(){
  // — Pulsante "Genera Allenamento" nella sezione training —
  if(!qs('v27-gen-btn')){
    const trainingHeader=document.querySelector('.page-header-training,.training-header,#page-training .page-header');
    const trainingPage=qs('page-training');
    if(trainingPage&&!qs('v27-train-actions')){
      const bar=document.createElement('div');
      bar.id='v27-train-actions';
      bar.style.cssText='display:flex;gap:8px;padding:0 16px 12px;flex-wrap:wrap';
      bar.innerHTML=`
        <button onclick="openGenerateWorkoutModal()" style="flex:1;padding:10px 14px;background:var(--acc);color:#080810;border:none;border-radius:12px;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer;min-width:140px">⚡ Genera Scheda</button>
        <button onclick="openCustomExList()" style="flex:1;padding:10px 14px;background:var(--bg3);border:1px solid var(--border2);border-radius:12px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;min-width:120px">🏋️ I miei esercizi</button>
        <button onclick="openEquipmentSettings()" style="padding:10px 14px;background:var(--bg3);border:1px solid var(--border2);border-radius:12px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text2);cursor:pointer">⚙️</button>`;
      const body=trainingPage.querySelector('.page-body')||trainingPage;
      try { body.insertBefore(bar,body.firstChild); } catch(e) { body.appendChild(bar); }
    }
  }

  // — Pulsante "Configura palestra" nella sezione impostazioni/profilo —
  const profilePage=qs('page-profilo');
  if(profilePage&&!qs('v27-eq-profile-btn')){
    const btn=document.createElement('div');
    btn.id='v27-eq-profile-btn';
    btn.style.cssText='margin:0 16px 12px';
    btn.innerHTML=`<button onclick="openEquipmentSettings()" style="width:100%;padding:13px;background:var(--bg3);border:1.5px solid var(--border2);border-radius:14px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--text);cursor:pointer;display:flex;align-items:center;gap:10px"><span style="font-size:20px">🏋️</span><div style="flex:1;text-align:left"><div>Configura la mia palestra</div><div style="font-size:11px;color:var(--text2)">Attrezzatura disponibile per allenamenti personalizzati</div></div><span style="color:var(--text3)">›</span></button>`;
    const body=profilePage.querySelector('.page-body')||profilePage;
    body.appendChild(btn);
  }
}

/* ══ INIT V27 ════════════════════════════════════════════════════ */
function v27Init(){
  mergeCEX();
  // Restore generated workout if exists
  if(typeof profile!=='undefined'&&profile.generatedWorkout&&typeof PRESETS_DATA!=='undefined'){
    const w=profile.generatedWorkout;
    const existing=PRESETS_DATA.findIndex(p=>p.id===w.id||p.generated);
    if(existing>=0) PRESETS_DATA[existing]=w; else PRESETS_DATA.unshift(w);
  }
  // Inject UI buttons after render
  setTimeout(injectV27Buttons, 600);
  // Re-inject on page navigation
  const origGoPage=window.goPage;
  if(origGoPage&&!window._v27GoPagePatched){
    window._v27GoPagePatched=true;
    window.goPage=function(page){
      origGoPage(page);
      setTimeout(injectV27Buttons,300);
    };
  }
  }

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',v27Init);
else setTimeout(v27Init,500);

})(); // end v27Patch

(function v28Patch(){
'use strict';

/* ═══════════════════════════════════════════════════════════════
   UTILITY
═══════════════════════════════════════════════════════════════ */
const qs28 = id => document.getElementById(id);
const EQ_KEY = 'ft_equipment';
const EQ_CONFIGURED_KEY = 'ft_equipment_configured';

function isEquipmentConfigured(){
  try {
    return localStorage.getItem(EQ_CONFIGURED_KEY) === '1';
  } catch(e){ return false; }
}
function markEquipmentConfigured(){
  try { localStorage.setItem(EQ_CONFIGURED_KEY,'1'); } catch(e){}
}

/* ═══════════════════════════════════════════════════════════════
   1. MACRO BIDIRECTIONAL SYNC ENGINE
   Garantisce che profile.macros e profile.kcalTarget siano sempre
   la fonte di verità, e che entrambe le UI leggano da lì.
═══════════════════════════════════════════════════════════════ */

/**
 * Legge i macro correnti da profile e restituisce oggetto {p,c,g,kcal}
 */
function getCurrentMacros(){
  const m = (typeof profile !== 'undefined') ? (profile.macros || {p:180,c:280,g:70}) : {p:180,c:280,g:70};
  const kcal = (typeof profile !== 'undefined') ? (profile.kcalTarget || 2500) : 2500;
  return { p: m.p||180, c: m.c||280, g: m.g||70, kcal };
}

/**
 * Scrive i macro nel profilo e triggera re-render UI.
 * Questa è la funzione centrale chiamata da ENTRAMBE le UI.
 */
window.v28SetMacros = async function(p, c, g, kcal){
  if(typeof profile === 'undefined') return;
  profile.macros = { p: Math.round(p), c: Math.round(c), g: Math.round(g) };
  profile.kcalTarget = Math.round(kcal);
  if(profile.goalsMeta) profile.goalsMeta.calories = Math.round(kcal);
  if(typeof saveAll === 'function') await saveAll();
  // Re-render nutrizione se attiva
  if(typeof renderNutrizione === 'function'){
    const np = qs28('page-nutrizione');
    if(np && np.classList.contains('active')) renderNutrizione();
  }
  // Re-render profilo se attivo
  if(typeof renderProfilePage === 'function'){
    const pp = qs28('page-profilo') || qs28('page-profile');
    if(pp && pp.classList.contains('active')) renderProfilePage();
  }
  // Aggiorna header app (top bar kcal indicator se presente)
  const kcalBadge = qs28('tb-kcal-badge');
  if(kcalBadge) kcalBadge.textContent = Math.round(kcal) + ' kcal';
};

/* Patch ngsSave per usare v28SetMacros dopo il salvataggio */
const _origNgsSave = window.ngsSave;
if(typeof window.ngsSave === 'function'){
  window.ngsSave = async function(){
    if(_origNgsSave) await _origNgsSave.apply(this, arguments);
    // Sync: dopo ngsSave, profile.macros è già aggiornato
    // Forza re-render Settings Panel se aperto
    if(typeof renderSettingsPanel === 'function'){
      const sp = qs28('settings-panel');
      if(sp && sp.innerHTML.length > 0) renderSettingsPanel();
    }
  };
}

/* Patch applySettings per aggiornare anche il ngs-modal se aperto */
const _origApplySettings = window.applySettings;
if(typeof window.applySettings === 'function'){
  window.applySettings = async function(){
    if(_origApplySettings) await _origApplySettings.apply(this, arguments);
    // Se il modal NGS è aperto, aggiornalo
    const ngsModal = qs28('ngs-modal');
    if(ngsModal){
      const kcalInp = qs28('ngs-kcal');
      if(kcalInp && typeof profile !== 'undefined'){
        kcalInp.value = profile.kcalTarget || 2500;
        if(typeof ngsRefresh === 'function') ngsRefresh();
      }
    }
  };
}

/* ═══════════════════════════════════════════════════════════════
   2. EQUIPMENT FIRST-LAUNCH MODAL
   Appare al primo avvio se ft_equipment non è configurato
═══════════════════════════════════════════════════════════════ */

const EQ_FULL_LIST = [
  { id:'bilanciere',   label:'Bilanciere + Pesi',          ico:'🏋️',  desc:'Squat rack, bench press, deadlift' },
  { id:'manubri',      label:'Manubri',                    ico:'💪',   desc:'Set completo o regolabili' },
  { id:'kettlebell',   label:'Kettlebell',                  ico:'🔵',   desc:'Uno o più kettlebell' },
  { id:'sbarra',       label:'Sbarra per trazioni',         ico:'🤸',   desc:'Pull-up bar, sbarra a muro o porta' },
  { id:'parallele',    label:'Parallele / Dip station',     ico:'🟣',   desc:'Per dip e L-sit' },
  { id:'bande',        label:'Bande elastiche',             ico:'🪢',   desc:'Resistenza variabile' },
  { id:'trx',          label:'TRX / Anelli',                ico:'🎯',   desc:'Sospensione bodyweight' },
  { id:'tapis_roulant',label:'Tapis roulant',               ico:'🏃',   desc:'Corsa indoor' },
  { id:'cyclette',     label:'Cyclette / Bike',             ico:'🚴',   desc:'Cardio bici stazionaria' },
  { id:'panca',        label:'Panca piana',                 ico:'🪑',   desc:'Panca per press e hip thrust' },
  { id:'macchinari',   label:'Macchine isotoniche',         ico:'🦾',   desc:'Leg press, lat machine, cavi...' },
  { id:'niente',       label:'Solo corpo libero',           ico:'🧘',   desc:'Nessun attrezzo — calisthenics' },
];

/**
 * Mostra il modal di primo avvio per configurare l'attrezzatura.
 * Viene chiamato automaticamente al primo accesso all'app.
 */
window.showEquipmentFirstLaunch = function(){
  if(qs28('v28-eq-onboard')) return;

  const saved = new Set();
  try {
    const raw = JSON.parse(localStorage.getItem(EQ_KEY)||'[]');
    raw.forEach(e => saved.add(e));
  } catch(e){}

  const modal = document.createElement('div');
  modal.id = 'v28-eq-onboard';
  modal.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:rgba(8,8,16,0.96);
    display:flex;align-items:flex-end;
    backdrop-filter:blur(16px);
    animation:fadeIn .3s ease;
  `;

  modal.innerHTML = `
  <div style="
    background:var(--bg2);
    border-top:1px solid var(--border2);
    border-radius:28px 28px 0 0;
    width:100%;max-height:92vh;
    overflow-y:auto;
    padding:0 0 calc(40px + var(--safe-bot));
    animation:slideUp .4s cubic-bezier(.22,1,.36,1) both;
  ">
    
    <div style="display:flex;justify-content:center;padding:14px 0 0">
      <div style="width:44px;height:5px;border-radius:99px;background:var(--border2)"></div>
    </div>

    
    <div style="padding:18px 22px 6px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:4px">
        <div style="
          width:48px;height:48px;border-radius:16px;
          background:var(--acc4);border:1.5px solid rgba(200,245,60,.3);
          display:flex;align-items:center;justify-content:center;font-size:26px;
          flex-shrink:0;
        ">🏋️</div>
        <div>
          <div style="font-size:20px;font-weight:800;letter-spacing:-.3px">Configura la tua palestra</div>
          <div style="font-size:12px;color:var(--text2);margin-top:2px">Seleziona l'attrezzatura disponibile</div>
        </div>
      </div>
      <div style="
        background:var(--acc4);border:1px solid rgba(200,245,60,.2);
        border-radius:12px;padding:10px 14px;margin-top:14px;
        font-size:12px;color:var(--text2);line-height:1.6;
      ">
        💡 Gli allenamenti generati si adatteranno <b style="color:var(--acc)">esattamente</b> a ciò che hai.
        Se selezioni solo "corpo libero" ricevi un programma calisthenics completo.
      </div>
    </div>

    
    <div style="padding:10px 22px 0;display:flex;flex-direction:column;gap:9px" id="v28-eq-grid">
      ${EQ_FULL_LIST.map(e => `
        <div id="v28eq-item-${e.id}" onclick="v28ToggleEqOb('${e.id}',this)"
          style="
            display:flex;align-items:center;gap:14px;
            padding:14px 16px;border-radius:16px;cursor:pointer;
            background:${saved.has(e.id) ? 'rgba(200,245,60,0.07)' : 'var(--bg3)'};
            border:1.5px solid ${saved.has(e.id) ? 'var(--acc)' : 'var(--border)'};
            transition:all .15s cubic-bezier(.22,1,.36,1);
          ">
          <span style="font-size:26px;flex-shrink:0">${e.ico}</span>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:700">${e.label}</div>
            <div style="font-size:11px;color:var(--text2)">${e.desc}</div>
          </div>
          <div id="v28eq-chk-${e.id}" style="
            width:26px;height:26px;border-radius:50%;
            background:${saved.has(e.id) ? 'var(--acc)' : 'transparent'};
            border:2px solid ${saved.has(e.id) ? 'var(--acc)' : 'var(--border2)'};
            display:flex;align-items:center;justify-content:center;
            font-size:14px;flex-shrink:0;transition:all .15s;
          ">${saved.has(e.id) ? '✓' : ''}</div>
        </div>
      `).join('')}
    </div>

    
    <div style="padding:14px 22px 0">
      <div style="font-size:10px;font-weight:800;text-transform:uppercase;color:var(--text3);margin-bottom:7px;letter-spacing:.1em">Altro (campo libero)</div>
      <input id="v28-eq-custom-inp"
        placeholder="Es. anelli ginnastica, pesi russi, TRX..."
        style="
          width:100%;background:var(--bg3);
          border:1.5px solid var(--border);border-radius:12px;
          padding:12px 14px;font-size:13px;color:var(--text);
          font-family:'Syne',sans-serif;outline:none;
        ">
    </div>

    
    <div style="padding:18px 22px 0;display:flex;gap:10px">
      <button onclick="v28SkipEquipment()"
        style="
          flex:1;padding:14px;
          background:var(--bg3);border:1px solid var(--border2);
          border-radius:16px;font-family:'Syne',sans-serif;
          font-size:13px;font-weight:700;color:var(--text2);cursor:pointer;
        ">Salta per ora</button>
      <button onclick="v28SaveEquipmentOb()"
        style="
          flex:2;padding:14px;
          background:var(--acc);color:#080810;
          border:none;border-radius:16px;
          font-family:'Syne',sans-serif;
          font-size:14px;font-weight:800;cursor:pointer;
          letter-spacing:.02em;
        ">💾 Salva configurazione</button>
    </div>
  </div>`;

  document.body.appendChild(modal);

  // Tracked selections in this modal
  window._v28EqSelected = new Set(saved);
};

/* Toggle un elemento nel modal onboarding */
window.v28ToggleEqOb = function(id, row){
  if(!window._v28EqSelected) window._v28EqSelected = new Set();
  const sel = window._v28EqSelected;
  const chk = qs28('v28eq-chk-'+id);

  if(id === 'niente'){
    // Corpo libero → deseleziona tutto il resto
    sel.clear();
    sel.add('niente');
    EQ_FULL_LIST.forEach(e => {
      const r = qs28('v28eq-item-'+e.id);
      const c = qs28('v28eq-chk-'+e.id);
      if(!r||!c) return;
      const isThis = e.id === 'niente';
      r.style.background = isThis ? 'rgba(200,245,60,0.07)' : 'var(--bg3)';
      r.style.borderColor = isThis ? 'var(--acc)' : 'var(--border)';
      c.style.background = isThis ? 'var(--acc)' : 'transparent';
      c.style.borderColor = isThis ? 'var(--acc)' : 'var(--border2)';
      c.textContent = isThis ? '✓' : '';
    });
    return;
  }

  // Deseleziona "niente" se si sceglie qualcosa
  sel.delete('niente');
  const nr = qs28('v28eq-item-niente');
  const nc = qs28('v28eq-chk-niente');
  if(nr){ nr.style.background='var(--bg3)'; nr.style.borderColor='var(--border)'; }
  if(nc){ nc.style.background='transparent'; nc.style.borderColor='var(--border2)'; nc.textContent=''; }

  if(sel.has(id)){
    sel.delete(id);
    row.style.background = 'var(--bg3)';
    row.style.borderColor = 'var(--border)';
    if(chk){ chk.style.background='transparent'; chk.style.borderColor='var(--border2)'; chk.textContent=''; }
  } else {
    sel.add(id);
    row.style.background = 'rgba(200,245,60,0.07)';
    row.style.borderColor = 'var(--acc)';
    if(chk){ chk.style.background='var(--acc)'; chk.style.borderColor='var(--acc)'; chk.textContent='✓'; }
  }
};

window.v28SaveEquipmentOb = function(){
  const sel = [...(window._v28EqSelected || new Set())];
  const customRaw = qs28('v28-eq-custom-inp')?.value?.trim() || '';
  if(customRaw) customRaw.split(',').forEach(c => { const t=c.trim(); if(t) sel.push(t); });
  try { localStorage.setItem(EQ_KEY, JSON.stringify(sel)); } catch(e){}
  markEquipmentConfigured();
  if(typeof profile !== 'undefined') profile.equipment = sel;
  if(typeof saveAll === 'function') saveAll();
  qs28('v28-eq-onboard')?.remove();
  if(typeof showToast === 'function') showToast(`✅ Palestra configurata! ${sel.length} elementi salvati.`);
  else if(typeof showT === 'function') showT(`✅ Palestra configurata!`);
  // Refresh training buttons if visible
  if(typeof injectV27Buttons === 'function') setTimeout(injectV27Buttons, 200);
};

window.v28SkipEquipment = function(){
  markEquipmentConfigured();
  qs28('v28-eq-onboard')?.remove();
};

/* ═══════════════════════════════════════════════════════════════
   3. AUTO-SHOW EQUIPMENT MODAL ON FIRST LAUNCH
   Triggered when launchApp() finishes + equipment not configured
═══════════════════════════════════════════════════════════════ */

/* Patch launchApp to show equipment modal on first launch */
const _origLaunchApp = window.launchApp;
if(typeof window.launchApp === 'function'){
  window.launchApp = function(){
    if(_origLaunchApp) _origLaunchApp.apply(this, arguments);
    // Check if equipment has ever been configured
    if(!isEquipmentConfigured()){
      setTimeout(()=> {
        // Only show if app is active (not still in onboarding)
        const appEl = qs28('scr-app');
        if(appEl && appEl.classList.contains('active')){
          window.showEquipmentFirstLaunch();
        }
      }, 800);
    }
  };
}

/* ═══════════════════════════════════════════════════════════════
   4. EQUIPMENT BANNER IN NUTRITION PAGE
   Se no attrezzatura → mostra banner suggerimento nella sezione
   Nutrizione sotto il riepilogo giornaliero
═══════════════════════════════════════════════════════════════ */

const _origRenderNutrizione = window.renderNutrizione;
if(typeof window.renderNutrizione === 'function'){
  window.renderNutrizione = function(){
    if(_origRenderNutrizione) _origRenderNutrizione.apply(this, arguments);
    // Inietta banner attrezzatura se non configurata
    setTimeout(()=> {
      injectEquipmentBannerInNutrition();
    }, 100);
  };
}

function injectEquipmentBannerInNutrition(){
  // Rimuovi banner precedente
  qs28('v28-nutr-eq-banner')?.remove();
  if(isEquipmentConfigured()) return;
  // Cerca un punto di inserimento nella pagina nutrizione
  const nutrPage = qs28('page-nutrizione');
  if(!nutrPage || !nutrPage.classList.contains('active')) return;
  const mealsWrap = qs28('meals-wrap');
  if(!mealsWrap) return;

  const banner = document.createElement('div');
  banner.id = 'v28-nutr-eq-banner';
  banner.style.cssText = `
    margin:14px 16px 0;
    background:linear-gradient(135deg,rgba(200,245,60,.07),rgba(91,156,239,.05));
    border:1.5px solid rgba(200,245,60,.25);
    border-radius:16px;padding:14px 16px;
    display:flex;align-items:center;gap:12px;
    animation:fadeUp .35s cubic-bezier(.22,1,.36,1) both;
  `;
  banner.innerHTML = `
    <div style="font-size:28px;flex-shrink:0">🏋️</div>
    <div style="flex:1">
      <div style="font-size:13px;font-weight:800;color:var(--acc)">Palestra non configurata</div>
      <div style="font-size:11px;color:var(--text2);margin-top:2px;line-height:1.5">
        Configura la tua attrezzatura per allenamenti personalizzati
      </div>
    </div>
    <button onclick="showEquipmentFirstLaunch()"
      style="
        background:var(--acc);color:#080810;border:none;
        border-radius:10px;padding:9px 14px;
        font-family:'Syne',sans-serif;font-size:12px;
        font-weight:800;cursor:pointer;flex-shrink:0;
      ">Configura</button>
  `;
  // Inserisci prima dei pasti
  try { if(mealsWrap.parentNode && mealsWrap.parentNode.contains(mealsWrap)) mealsWrap.parentNode.insertBefore(banner, mealsWrap); } catch(e) {}
}

/* ═══════════════════════════════════════════════════════════════
   5. EQUIPMENT QUICK ACCESS IN TRAINING PAGE
   Aggiunge un badge con l'attrezzatura configurata sotto il header
   della sezione Training, con link rapido a configurazione
═══════════════════════════════════════════════════════════════ */

function injectEquipmentBadgeInTraining(){
  if(qs28('v28-training-eq-badge')) return;
  const trainingPage = qs28('page-training') || qs28('page-allenamento');
  if(!trainingPage) return;

  const eq = [];
  try { JSON.parse(localStorage.getItem(EQ_KEY)||'[]').forEach(e=>eq.push(e)); } catch(e){}

  const badge = document.createElement('div');
  badge.id = 'v28-training-eq-badge';
  badge.style.cssText = `
    margin:4px 16px 8px;
    background:var(--bg3);border:1px solid var(--border);
    border-radius:12px;padding:10px 14px;
    display:flex;align-items:center;gap:10px;
    cursor:pointer;
  `;
  badge.onclick = () => window.openEquipmentSettings && window.openEquipmentSettings();

  if(eq.length > 0){
    const labels = eq.slice(0,4).map(e => {
      const found = EQ_FULL_LIST.find(x=>x.id===e);
      return found ? `<span style="display:inline-flex;align-items:center;gap:3px;background:var(--bg4);border:1px solid var(--border);border-radius:6px;padding:2px 8px;font-size:10px;font-weight:700;margin:1px">${found.ico} ${found.label}</span>` : `<span style="display:inline-flex;background:var(--bg4);border:1px solid var(--border);border-radius:6px;padding:2px 8px;font-size:10px;font-weight:700;margin:1px">${e}</span>`;
    }).join('');
    const extra = eq.length > 4 ? `<span style="font-size:10px;color:var(--text3);margin-left:2px">+${eq.length-4} altri</span>` : '';
    badge.innerHTML = `
      <div style="font-size:12px;flex-shrink:0">🏋️</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:4px">Attrezzatura</div>
        <div style="display:flex;flex-wrap:wrap;gap:2px">${labels}${extra}</div>
      </div>
      <div style="color:var(--text3);font-size:14px;flex-shrink:0">⚙️</div>
    `;
  } else {
    badge.innerHTML = `
      <div style="font-size:18px">🏋️</div>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:700;color:var(--text2)">Configura la tua palestra</div>
        <div style="font-size:10px;color:var(--text3)">Tap per aggiungere l'attrezzatura disponibile</div>
      </div>
      <div style="color:var(--acc);font-size:13px;font-weight:800">Configura →</div>
    `;
  }

  // Inserisci nella pagina training
  const body = trainingPage.querySelector('.page-body') || trainingPage;
  // Inserisci dopo eventuali header
  const firstCard = body.querySelector('.card, .training-header, [id^="v27-train-actions"]') || body.firstChild;
  if(firstCard && firstCard.parentNode === body){
    try { if(firstCard.parentNode===body) body.insertBefore(badge, firstCard.nextSibling); else body.insertBefore(badge, body.firstChild); } catch(e) { body.appendChild(badge); }
  } else {
    body.appendChild(badge);
  }
}

/* ═══════════════════════════════════════════════════════════════
   6. PATCH goPage PER INIETTARE BADGE TRAINING
   Quando si naviga verso training, mostra il badge attrezzatura
═══════════════════════════════════════════════════════════════ */

const _origGoPage28 = window.goPage;
if(typeof window.goPage === 'function' && !window._v28GoPagePatched){
  window._v28GoPagePatched = true;
  window.goPage = function(page){
    if(_origGoPage28) _origGoPage28.apply(this, arguments);
    if(page === 'training' || page === 'allenamento'){
      setTimeout(()=>{
        // Rimuovi badge vecchio e reinserisce (aggiorna l'equipaggiamento)
        qs28('v28-training-eq-badge')?.remove();
        injectEquipmentBadgeInTraining();
      }, 350);
    }
    if(page === 'nutrizione'){
      setTimeout(injectEquipmentBannerInNutrition, 200);
    }
  };
}

/* ═══════════════════════════════════════════════════════════════
   7. AGGIUNGE BOTTONE "CONFIGURA PALESTRA" IN IMPOSTAZIONI PROFILO
   (In aggiunta a quello già esistente, posizionato meglio)
═══════════════════════════════════════════════════════════════ */

function injectEquipmentInSettings(){
  if(qs28('v28-settings-eq-btn')) return;
  const sp = qs28('settings-panel');
  if(!sp) return;

  const btn = document.createElement('div');
  btn.id = 'v28-settings-eq-btn';
  btn.style.cssText = 'margin-top:16px';
  btn.innerHTML = `
    <div style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--text3);margin-bottom:8px">🏋️ Attrezzatura</div>
    <button onclick="openEquipmentSettings()"
      style="
        width:100%;padding:14px 16px;
        background:var(--bg3);border:1.5px solid var(--border2);
        border-radius:14px;font-family:'Syne',sans-serif;
        font-size:13px;font-weight:700;color:var(--text);
        cursor:pointer;display:flex;align-items:center;gap:12px;
        text-align:left;
      ">
      <span style="font-size:22px">🏋️</span>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700">Configura la mia palestra</div>
        <div style="font-size:11px;color:var(--text2);margin-top:1px" id="v28-eq-status-text">
          Attrezzatura disponibile per allenamenti personalizzati
        </div>
      </div>
      <span style="color:var(--acc);font-size:18px">›</span>
    </button>`;

  // Aggiorna il testo di stato
  const eq = [];
  try { JSON.parse(localStorage.getItem(EQ_KEY)||'[]').forEach(e=>eq.push(e)); } catch(e){}
  if(eq.length > 0){
    const statusEl = btn.querySelector('#v28-eq-status-text');
    if(statusEl) statusEl.textContent = `${eq.length} elementi configurati`;
  }

  sp.appendChild(btn);
}

/* Patch renderSettingsPanel per aggiungere sezione attrezzatura */
const _origRenderSettingsPanel = window.renderSettingsPanel;
if(typeof window.renderSettingsPanel === 'function'){
  window.renderSettingsPanel = function(){
    if(_origRenderSettingsPanel) _origRenderSettingsPanel.apply(this, arguments);
    setTimeout(injectEquipmentInSettings, 50);
  };
}

/* ═══════════════════════════════════════════════════════════════
   8. SYNC MACRO: Patch openNutrGoals per leggere SEMPRE
      i valori più freschi da profile (garantisce sync bidirezionale)
═══════════════════════════════════════════════════════════════ */

/* Wrapper per openNutrGoals: assicura che il modal legga i valori
   attuali da profile.macros e profile.kcalTarget */
const _origOpenNutrGoals = window.openNutrGoals;
if(typeof window.openNutrGoals === 'function'){
  window.openNutrGoals = function(){
    // Sincronizza profile.kcalTarget con goalsMeta.calories se divergono
    if(typeof profile !== 'undefined'){
      if(profile.goalsMeta && profile.goalsMeta.calories && !profile.kcalTarget){
        profile.kcalTarget = profile.goalsMeta.calories;
      }
      if(profile.goalsMeta && profile.kcalTarget){
        profile.goalsMeta.calories = profile.kcalTarget;
      }
    }
    if(_origOpenNutrGoals) _origOpenNutrGoals.apply(this, arguments);
  };
}

/* ═══════════════════════════════════════════════════════════════
   9. INIT V28
═══════════════════════════════════════════════════════════════ */

function v28Init(){
  // Se l'app è già avviata (utente esistente) e equipment non configurato,
  // mostra il modal dopo un breve delay
  setTimeout(()=>{
    const appEl = qs28('scr-app');
    if(appEl && appEl.classList.contains('active') && !isEquipmentConfigured()){
      // Controlla se ci sono già dati equipment nel localStorage (utente esistente)
      const existingEq = [];
      try { JSON.parse(localStorage.getItem(EQ_KEY)||'[]').forEach(e=>existingEq.push(e)); } catch(e){}
      if(existingEq.length > 0){
        // Utente aveva già equipment configurato in v27, non mostrare onboarding
        markEquipmentConfigured();
      } else if(typeof profile !== 'undefined' && profile.name){
        // Utente esistente senza equipment → mostra modal gentilmente
        showEquipmentFirstLaunch();
      }
    }
  }, 1200);

  }

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', v28Init);
} else {
  setTimeout(v28Init, 700);
}

})(); // end v28Patch

(function v29Patch(){

/* ══ INIT GUARD ═════════════════════════════════════════════════ */
function waitReady(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn); else setTimeout(fn,100); }

/* ══ 1. EX_DB ESPANSIONE V29 ════════════════════════════════════ */
(function expandExV29(){
  const extra=[
    /* ── OLIMPIONICO / WEIGHTLIFTING ── */
    {id:'v29_clean',name:'Clean',m:'full',tags:['esplosività','fondamentale'],icon:'🏅',equipment:['bilanciere'],difficulty:'advanced',desc:'Sollevamento olimpionico dalla terra al rack clavicolare.'},
    {id:'v29_jerk',name:'Jerk',m:'push',tags:['spalle','esplosività'],icon:'🏅',equipment:['bilanciere'],difficulty:'advanced',desc:'Distensione esplosiva sopra la testa dal rack.'},
    {id:'v29_snatch',name:'Snatch',m:'full',tags:['full body','esplosività'],icon:'🏅',equipment:['bilanciere'],difficulty:'advanced',desc:'Sollevamento olimpionico mono-fase dalla terra sopra la testa.'},
    {id:'v29_power_clean',name:'Power Clean',m:'full',tags:['esplosività'],icon:'🏅',equipment:['bilanciere'],difficulty:'intermediate',desc:'Variante del clean senza squat completo.'},
    {id:'v29_hang_clean',name:'Hang Clean',m:'full',tags:['esplosività'],icon:'🏅',equipment:['bilanciere'],difficulty:'intermediate',desc:'Clean partendo dall\'altezza delle ginocchia.'},
    {id:'v29_push_press',name:'Push Press',m:'push',tags:['spalle','esplosività'],icon:'🏅',equipment:['bilanciere'],difficulty:'intermediate',desc:'Distensione sopra la testa con spinta delle gambe.'},
    /* ── STRONGMAN ── */
    {id:'v29_log_press',name:'Log Press',m:'push',tags:['spalle','strongman'],icon:'💪',equipment:['attrezzi_strongman'],difficulty:'advanced',desc:'Distensione del log sopra la testa, tipico degli eventi strongman.'},
    {id:'v29_tire_flip',name:'Tire Flip',m:'full',tags:['full body','strongman','esplosività'],icon:'🔄',equipment:['attrezzi_strongman'],difficulty:'advanced',desc:'Ribaltamento del pneumatico gigante — forza esplosiva totale.'},
    {id:'v29_farmers',name:'Farmers Walk',m:'full',tags:['grip','core','strongman'],icon:'🧺',equipment:['manubri','kettlebell'],difficulty:'beginner',desc:'Camminata con carichi pesanti ai fianchi — grip e stabilità totale.'},
    {id:'v29_sled_push',name:'Sled Push',m:'full',tags:['gambe','cardio','strongman'],icon:'🛷',equipment:['attrezzi_strongman'],difficulty:'intermediate',desc:'Spinta del sled — potenza gambe e resistenza cardiovascolare.'},
    {id:'v29_stone_lift',name:'Atlas Stone Lift',m:'full',tags:['full body','strongman'],icon:'🪨',equipment:['attrezzi_strongman'],difficulty:'advanced',desc:'Sollevamento pietra Atlas su piattaforma.'},
    {id:'v29_yoke_walk',name:'Yoke Walk',m:'full',tags:['core','strongman'],icon:'🏗️',equipment:['attrezzi_strongman'],difficulty:'intermediate',desc:'Trasporto del giogo sulle spalle — stabilità e forza.'},
    /* ── KETTLEBELL ── */
    {id:'v29_kb_swing',name:'Kettlebell Swing',m:'full',tags:['glutei','core','cardio'],icon:'🫛',equipment:['kettlebell'],difficulty:'beginner',desc:'Il fondamentale del kettlebell — potenza posteriore + cardio.'},
    {id:'v29_kb_clean',name:'KB Clean',m:'full',tags:['esplosività'],icon:'🫛',equipment:['kettlebell'],difficulty:'intermediate',desc:'Clean con kettlebell, arrivo al rack position.'},
    {id:'v29_kb_press',name:'KB Press',m:'push',tags:['spalle'],icon:'🫛',equipment:['kettlebell'],difficulty:'beginner',desc:'Distensione sopra la testa con kettlebell.'},
    {id:'v29_kb_snatch',name:'KB Snatch',m:'full',tags:['full body','esplosività'],icon:'🫛',equipment:['kettlebell'],difficulty:'advanced',desc:'Snatch con kettlebell, mono-fase.'},
    {id:'v29_kb_goblet',name:'Goblet Squat KB',m:'lower',tags:['quadricipiti','glutei'],icon:'🫛',equipment:['kettlebell'],difficulty:'beginner',desc:'Squat tenendo il kettlebell al petto.'},
    {id:'v29_kb_row',name:'KB Row',m:'pull',tags:['dorsali'],icon:'🫛',equipment:['kettlebell'],difficulty:'beginner',desc:'Rematore con kettlebell, busto inclinato.'},
    {id:'v29_kb_tgu',name:'Turkish Get-Up',m:'full',tags:['mobilità','core','spalle'],icon:'🫛',equipment:['kettlebell'],difficulty:'advanced',desc:'Il re degli esercizi con KB — mobilità, stabilità e forza.'},
    {id:'v29_kb_dl',name:'KB Deadlift',m:'pull',tags:['schiena','glutei'],icon:'🫛',equipment:['kettlebell'],difficulty:'beginner',desc:'Stacco con kettlebell tra le gambe.'},
    {id:'v29_kb_lunge',name:'KB Lunge',m:'lower',tags:['quadricipiti','glutei'],icon:'🫛',equipment:['kettlebell'],difficulty:'beginner',desc:'Affondi con kettlebell.'},
    {id:'v29_kb_windmill',name:'KB Windmill',m:'core',tags:['obliqui','mobilità'],icon:'🫛',equipment:['kettlebell'],difficulty:'intermediate',desc:'Lavoro obliqui e mobilità dell\'anca.'},
    /* ── RESISTANCE BAND ── */
    {id:'v29_band_pu',name:'Push-up con banda',m:'push',tags:['petto','progressione'],icon:'🟨',equipment:['bande'],difficulty:'intermediate',desc:'Push-up con resistenza aggiuntiva della banda.'},
    {id:'v29_band_pull',name:'Pull-apart banda',m:'pull',tags:['spalle posteriori'],icon:'🟨',equipment:['bande'],difficulty:'beginner',desc:'Apertura orizzontale della banda — salute della spalla.'},
    {id:'v29_band_row',name:'Rematore con banda',m:'pull',tags:['dorsali'],icon:'🟨',equipment:['bande'],difficulty:'beginner',desc:'Rematore seduto con banda elastica.'},
    {id:'v29_band_squat',name:'Squat con banda',m:'lower',tags:['glutei','abduttori'],icon:'🟨',equipment:['bande'],difficulty:'beginner',desc:'Squat con banda attorno alle ginocchia.'},
    {id:'v29_band_hip',name:'Hip Thrust con banda',m:'lower',tags:['glutei'],icon:'🟨',equipment:['bande'],difficulty:'beginner',desc:'Spinta dell\'anca con banda elastica.'},
    {id:'v29_band_curl',name:'Curl Bicipiti con banda',m:'pull',tags:['bicipiti'],icon:'🟨',equipment:['bande'],difficulty:'beginner',desc:'Curl con banda elastica.'},
    {id:'v29_band_tri',name:'Pushdown Tricipiti con banda',m:'push',tags:['tricipiti'],icon:'🟨',equipment:['bande'],difficulty:'beginner',desc:'Estensione tricipiti verso il basso con banda.'},
    /* ── CORPO LIBERO PRIMORDIALE / ATLETA ── */
    {id:'v29_bar_mu',name:'Bar Muscle-up',m:'skill',tags:['pull','push','skill'],icon:'⭐',difficulty:'athlete',desc:'Muscle-up alla sbarra — combinazione trazione + spinta.'},
    {id:'v29_ring_mu',name:'Ring Muscle-up',m:'skill',tags:['pull','push','skill'],icon:'⭐',difficulty:'athlete',desc:'Muscle-up agli anelli — più difficile della sbarra.'},
    {id:'v29_ring_dips',name:'Ring Dips',m:'push',tags:['petto','tricipiti','skill'],icon:'⭐',equipment:['anelli'],difficulty:'advanced',desc:'Dips agli anelli — destabilizzazione per forza superiore.'},
    {id:'v29_ring_row',name:'Ring Row',m:'pull',tags:['dorsali','skill'],icon:'⭐',equipment:['anelli'],difficulty:'beginner',desc:'Australian row agli anelli.'},
    {id:'v29_iron_cross',name:'Iron Cross',m:'skill',tags:['spalle','petto','skill'],icon:'⭐',equipment:['anelli'],difficulty:'athlete',desc:'Croce di ferro agli anelli — elemento ginnico avanzato.'},
    {id:'v29_back_lever',name:'Back Lever',m:'skill',tags:['dorsali','skill'],icon:'⭐',equipment:['anelli','sbarra'],difficulty:'advanced',desc:'Leva posteriore — forza isometrica dorsali.'},
    {id:'v29_front_lever',name:'Front Lever',m:'skill',tags:['dorsali','core','skill'],icon:'⭐',equipment:['anelli','sbarra'],difficulty:'athlete',desc:'Leva frontale — vertice della forza a trazione.'},
    {id:'v29_planche_adv',name:'Straddle Planche',m:'skill',tags:['spalle','core','skill'],icon:'⭐',difficulty:'athlete',desc:'Planche con gambe divaricate — progressione verso la planche completa.'},
    {id:'v29_wrist_roll',name:'Wrist Roller',m:'pull',tags:['avambracci','grip'],icon:'⭐',difficulty:'beginner',desc:'Arrotolamento peso con corda — forza degli avambracci.'},
    {id:'v29_sprint_sl',name:'Sprint Salita',m:'cardio',tags:['gambe','cardio','esplosività'],icon:'🏃',difficulty:'intermediate',desc:'Sprint in salita per potenza e resistenza anaerobica.'},
    /* ── POWERLIFTING ── */
    {id:'v29_sumo_dl',name:'Sumo Deadlift',m:'pull',tags:['glutei','femorali','fondamentale'],icon:'🏋️',equipment:['bilanciere'],difficulty:'intermediate',desc:'Stacco sumo con presa larga — enfasi sui glutei e anca.'},
    {id:'v29_rdl',name:'Romanian Deadlift (RDL)',m:'pull',tags:['femorali','glutei'],icon:'🏋️',equipment:['bilanciere','manubri'],difficulty:'beginner',desc:'Stacco rumeno — eccellente per catena posteriore.'},
    {id:'v29_paused_squat',name:'Squat Paused',m:'lower',tags:['quadricipiti','fondamentale'],icon:'🏋️',equipment:['bilanciere'],difficulty:'intermediate',desc:'Squat con pausa in buca — elimina lo stretch reflex.'},
    {id:'v29_box_squat',name:'Box Squat',m:'lower',tags:['quadricipiti','glutei'],icon:'🏋️',equipment:['bilanciere'],difficulty:'intermediate',desc:'Squat su box — sviluppa la partenza dalla buca.'},
    {id:'v29_goodmorning',name:'Good Morning',m:'pull',tags:['femorali','schiena'],icon:'🏋️',equipment:['bilanciere'],difficulty:'intermediate',desc:'Bilanciere sulle spalle, inclinazione del busto — catena posteriore.'},
    {id:'v29_rack_pull',name:'Rack Pull',m:'pull',tags:['schiena','trapezi'],icon:'🏋️',equipment:['bilanciere'],difficulty:'intermediate',desc:'Stacco parziale da rack — allenamento forza dorsali e trapezi.'},
    /* ── MACCHINARI ── */
    {id:'v29_leg_press',name:'Leg Press',m:'lower',tags:['quadricipiti','glutei'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Pressa per le gambe — volumi elevati in sicurezza.'},
    {id:'v29_hack_squat',name:'Hack Squat',m:'lower',tags:['quadricipiti'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Squat su macchina guidata 45°.'},
    {id:'v29_leg_curl',name:'Leg Curl',m:'lower',tags:['femorali'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Isolamento femorali su macchina.'},
    {id:'v29_leg_ext',name:'Leg Extension',m:'lower',tags:['quadricipiti'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Isolamento quadricipiti su macchina.'},
    {id:'v29_cable_row',name:'Cable Row',m:'pull',tags:['dorsali'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Rematore ai cavi bassi.'},
    {id:'v29_lat_pull',name:'Lat Machine',m:'pull',tags:['dorsali','bicipiti'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Trazioni alla lat machine.'},
    {id:'v29_chest_press',name:'Chest Press Machine',m:'push',tags:['petto'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Panca orizzontale su macchina guidata.'},
    {id:'v29_shoulder_m',name:'Shoulder Press Machine',m:'push',tags:['spalle'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Distensione spalle su macchina.'},
    {id:'v29_calf_machine',name:'Calf Raise Machine',m:'lower',tags:['polpacci'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Calf raises su macchina dedicata.'},
    {id:'v29_smith_bench',name:'Smith Machine Bench',m:'push',tags:['petto'],icon:'🔩',equipment:['macchinari'],difficulty:'beginner',desc:'Panca piana guidata su Smith Machine.'},
    /* ── CARDIO / HIIT AVANZATI ── */
    {id:'v29_assault_bike',name:'Assault Bike',m:'cardio',tags:['cardio','full body'],icon:'🚴',equipment:['cyclette'],difficulty:'intermediate',desc:'Bici a resistenza aria — full body cardio ad alta intensità.'},
    {id:'v29_row_erg',name:'Rowing Ergometro',m:'cardio',tags:['cardio','full body'],icon:'🚣',equipment:['rower'],difficulty:'beginner',desc:'Vogatore — uno dei migliori cardio full body.'},
    {id:'v29_box_jump',name:'Box Jump',m:'lower',tags:['esplosività','gambe'],icon:'📦',difficulty:'intermediate',desc:'Salto esplosivo su box — potenza gambe.'},
    {id:'v29_broad_jump',name:'Broad Jump',m:'lower',tags:['esplosività'],icon:'📦',difficulty:'intermediate',desc:'Salto in lungo da fermo — esplosività orizzontale.'},
    {id:'v29_battle_rope',name:'Battle Rope',m:'cardio',tags:['cardio','spalle'],icon:'🪢',equipment:['corda'],difficulty:'intermediate',desc:'Corda da battaglia — resistenza e potenza muscolare.'},
    {id:'v29_jump_rope',name:'Salto con la corda',m:'cardio',tags:['cardio','coordinazione'],icon:'🪢',difficulty:'beginner',desc:'Cardio classico — coordinazione e resistenza.'},
    /* ── CORE AVANZATI ── */
    {id:'v29_ab_wheel',name:'Ab Wheel Rollout',m:'core',tags:['addominali','core'],icon:'⭕',equipment:['ab_wheel'],difficulty:'intermediate',desc:'Rollout con ruota — core totale in modo brutale.'},
    {id:'v29_dragon_flag',name:'Dragon Flag',m:'core',tags:['addominali'],icon:'⭕',difficulty:'advanced',desc:'Variante avanzata: corpo rigido inclinato — forza addominale estrema.'},
    {id:'v29_toes_bar',name:'Toes to Bar',m:'core',tags:['addominali','hip flexor'],icon:'⭕',equipment:['sbarra'],difficulty:'intermediate',desc:'Portare i piedi alla sbarra in sospensione.'},
    {id:'v29_pallof',name:'Pallof Press',m:'core',tags:['core','anti-rotazione'],icon:'⭕',equipment:['macchinari','bande'],difficulty:'beginner',desc:'Anti-rotazione con cavo — stabilità funzionale del core.'},
    {id:'v29_landmine_rot',name:'Landmine Rotation',m:'core',tags:['obliqui','core'],icon:'⭕',equipment:['bilanciere'],difficulty:'intermediate',desc:'Rotazione con bilanciere a terra — obliqui e core rotazionale.'},
  ];
  if(typeof EX_DB!=='undefined'){
    const ids=new Set(EX_DB.map(e=>e.id));
    extra.forEach(e=>{if(!ids.has(e.id)){EX_DB.push(e);ids.add(e.id);}});
    if(window.EX_DB) window.EX_DB=EX_DB;
  }
})();

/* ══ 2. FOOD_DB ESPANSIONE V29 ══════════════════════════════════ */
(function expandFoodV29(){
  const extra=[
    /* ── SNACK / BARRETTE ── */
    {id:'v29_riso_sof',name:'Gallette di riso soffiato',kcal:393,p:8,c:82,g:3,unit:'g',cat:'🍪 Snack'},
    {id:'v29_barretta_p',name:'Barretta proteica (media)',kcal:200,p:20,c:20,g:5,unit:'pz',cat:'🍪 Snack'},
    {id:'v29_crackers',name:'Crackers integrali',kcal:432,p:11,c:72,g:12,unit:'g',cat:'🍪 Snack'},
    {id:'v29_pop_corn',name:'Popcorn senza burro',kcal:387,p:13,c:78,g:4,unit:'g',cat:'🍪 Snack'},
    {id:'v29_dark_choc',name:'Cioccolato fondente 85%',kcal:598,p:8,c:30,g:46,unit:'g',cat:'🍪 Snack'},
    {id:'v29_energy_ball',name:'Energy ball (datt+avena)',kcal:280,p:6,c:42,g:9,unit:'pz',cat:'🍪 Snack'},
    {id:'v29_hummus',name:'Hummus',kcal:166,p:8,c:14,g:10,unit:'g',cat:'🍪 Snack'},
    {id:'v29_rice_cakes',name:'Torte di riso proteiche',kcal:70,p:3,c:14,g:0,unit:'pz',cat:'🍪 Snack'},
    /* ── CUCINA MONDIALE ── */
    {id:'v29_bulgur',name:'Bulgur cotto',kcal:83,p:3,c:19,g:0,unit:'g',cat:'🌾 Cereali'},
    {id:'v29_injera',name:'Injera (pane etiop.)',kcal:154,p:6,c:28,g:1,unit:'g',cat:'🌾 Cereali'},
    {id:'v29_naan',name:'Naan bread',kcal:317,p:10,c:56,g:7,unit:'g',cat:'🌾 Cereali'},
    {id:'v29_soba',name:'Noodles soba cotti',kcal:99,p:5,c:21,g:0,unit:'g',cat:'🌾 Cereali'},
    {id:'v29_udon',name:'Udon cotti',kcal:97,p:3,c:20,g:0,unit:'g',cat:'🌾 Cereali'},
    {id:'v29_miso',name:'Pasta di miso',kcal:199,p:12,c:26,g:6,unit:'g',cat:'🥦 Verdure'},
    {id:'v29_kimchi',name:'Kimchi',kcal:15,p:1,c:2,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v29_tamari',name:'Salsa tamari',kcal:60,p:11,c:5,g:0,unit:'ml',cat:'☕ Bevande'},
    /* ── UOVA E LATTICINI EXTRA ── */
    {id:'v29_uova_sode',name:'Uova sode (intere)',kcal:155,p:13,c:1,g:11,unit:'pz',cat:'🍗 Proteine'},
    {id:'v29_albumi_liq',name:'Albumi liquidi pastorizzati',kcal:52,p:11,c:1,g:0,unit:'ml',cat:'🍗 Proteine'},
    {id:'v29_quark',name:'Quark 0%',kcal:59,p:12,c:4,g:0,unit:'g',cat:'🥛 Latticini'},
    {id:'v29_emmental',name:'Emmental',kcal:380,p:29,c:0,g:29,unit:'g',cat:'🥛 Latticini'},
    {id:'v29_asiago',name:'Asiago',kcal:352,p:29,c:0,g:26,unit:'g',cat:'🥛 Latticini'},
    {id:'v29_latte_int',name:'Latte intero',kcal:61,p:3,c:5,g:3,unit:'ml',cat:'🥛 Latticini'},
    {id:'v29_pann_veg',name:'Panna vegetale soia',kcal:182,p:2,c:6,g:17,unit:'ml',cat:'☕ Bevande'},
    /* ── PROTEINE EXTRA ── */
    {id:'v29_agnello_c',name:'Costolette d\'agnello',kcal:250,p:25,c:0,g:16,unit:'g',cat:'🍗 Proteine'},
    {id:'v29_polpo_g',name:'Polpo grigliato',kcal:82,p:15,c:2,g:1,unit:'g',cat:'🍗 Proteine'},
    {id:'v29_seppie',name:'Seppie grigliate',kcal:79,p:16,c:1,g:1,unit:'g',cat:'🍗 Proteine'},
    {id:'v29_astice',name:'Astice lessato',kcal:89,p:19,c:0,g:1,unit:'g',cat:'🍗 Proteine'},
    {id:'v29_carne_oca',name:'Petto d\'oca',kcal:238,p:29,c:0,g:13,unit:'g',cat:'🍗 Proteine'},
    {id:'v29_tacchino_p',name:'Prosciutto di tacchino',kcal:98,p:17,c:1,g:3,unit:'g',cat:'🍗 Proteine'},
    {id:'v29_piatto_p',name:'Proteina di piselli',kcal:372,p:80,c:5,g:3,unit:'g',cat:'💊 Integratori'},
    {id:'v29_collagene',name:'Collagene peptidi',kcal:360,p:90,c:0,g:0,unit:'g',cat:'💊 Integratori'},
    {id:'v29_bcaa',name:'BCAA in polvere',kcal:32,p:7,c:0,g:0,unit:'g',cat:'💊 Integratori'},
    {id:'v29_beta_alan',name:'Beta-Alanina',kcal:0,p:0,c:0,g:0,unit:'g',cat:'💊 Integratori'},
    {id:'v29_vitD',name:'Vitamina D3 (integr.)',kcal:0,p:0,c:0,g:0,unit:'pz',cat:'💊 Integratori'},
    /* ── FRUTTA ESOTICA ── */
    {id:'v29_lichi',name:'Litchi',kcal:66,p:1,c:17,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v29_jackfruit',name:'Jackfruit verde',kcal:51,p:2,c:11,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v29_cachi',name:'Cachi',kcal:70,p:1,c:19,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v29_melograno',name:'Chicchi di melograno',kcal:83,p:2,c:19,g:1,unit:'g',cat:'🍎 Frutta'},
    {id:'v29_dragon_f',name:'Dragon fruit',kcal:60,p:1,c:13,g:0,unit:'g',cat:'🍎 Frutta'},
    {id:'v29_tamarindo',name:'Tamarindo',kcal:239,p:3,c:62,g:1,unit:'g',cat:'🍎 Frutta'},
    /* ── VERDURE E LEGUMI EXTRA ── */
    {id:'v29_pak_choi',name:'Pak choi',kcal:13,p:2,c:2,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v29_radicchio',name:'Radicchio',kcal:23,p:1,c:5,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v29_sedano',name:'Sedano',kcal:16,p:1,c:3,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v29_finocchio',name:'Finocchio',kcal:31,p:1,c:7,g:0,unit:'g',cat:'🥦 Verdure'},
    {id:'v29_lupini',name:'Lupini',kcal:119,p:16,c:10,g:3,unit:'g',cat:'🫘 Legumi'},
    {id:'v29_soia_g',name:'Soia gialla cotta',kcal:173,p:17,c:10,g:9,unit:'g',cat:'🫘 Legumi'},
    {id:'v29_fave',name:'Fave cotte',kcal:110,p:8,c:20,g:0,unit:'g',cat:'🫘 Legumi'},
    {id:'v29_azuki',name:'Fagioli azuki cotti',kcal:129,p:8,c:25,g:0,unit:'g',cat:'🫘 Legumi'},
    /* ── BEVANDE SPORTIVE ── */
    {id:'v29_sport_drink',name:'Sport drink isotonico',kcal:25,p:0,c:6,g:0,unit:'ml',cat:'☕ Bevande'},
    {id:'v29_coconut_w',name:'Acqua di cocco',kcal:19,p:0,c:5,g:0,unit:'ml',cat:'☕ Bevande'},
    {id:'v29_beet_juice',name:'Succo di barbabietola',kcal:44,p:2,c:10,g:0,unit:'ml',cat:'☕ Bevande'},
    {id:'v29_matcha',name:'Matcha latté (latte magro)',kcal:57,p:4,c:7,g:1,unit:'ml',cat:'☕ Bevande'},
    /* ── GRASSI E CONDIMENTI ── */
    {id:'v29_tahini',name:'Tahini (pasta sesamo)',kcal:595,p:17,c:21,g:54,unit:'g',cat:'🫒 Grassi'},
    {id:'v29_olio_coc',name:'Olio di cocco',kcal:890,p:0,c:0,g:100,unit:'g',cat:'🫒 Grassi'},
    {id:'v29_ghee',name:'Ghee (burro chiarificato)',kcal:900,p:0,c:0,g:100,unit:'g',cat:'🫒 Grassi'},
    {id:'v29_avena_p',name:'Avena proteica (instant)',kcal:370,p:20,c:55,g:7,unit:'g',cat:'🌾 Cereali'},
    {id:'v29_farina_av',name:'Farina d\'avena',kcal:379,p:13,c:68,g:7,unit:'g',cat:'🌾 Cereali'},
    {id:'v29_farina_int',name:'Farina integrale di farro',kcal:337,p:13,c:68,g:2,unit:'g',cat:'🌾 Cereali'},
    {id:'v29_pane_prot',name:'Pane proteico (panini prot.)',kcal:200,p:18,c:24,g:4,unit:'pz',cat:'🌾 Cereali'},
  ];
  if(typeof FOOD_DB!=='undefined'){
    const ids=new Set(FOOD_DB.map(f=>f.id));
    extra.forEach(f=>{if(!ids.has(f.id)){FOOD_DB.push(f);ids.add(f.id);}});
    if(window.FOOD_DB) window.FOOD_DB=FOOD_DB;
  }
})();

/* ══ 3. PRESET PROGRAMMI V29 ════════════════════════════════════ */
(function expandPresetsV29(){
  const newPresets=[
    /* ── 5×5 STRONGLIFTS (Bilanciere) ── */
    {
      id:'v29_5x5',name:'StrongLifts 5×5',icon:'🏋️',color:'var(--orange)',
      t:'full',diff:'intermediate',dur:'60',
      goals:['strength','hypertrophy'],
      levels:['intermediate','advanced'],
      desc:'Il programma di forza più testato al mondo. 2 allenamenti alternati, 3×/settimana, progressioni lineari su fondamentali.',
      days:[
        {name:'Workout A',type:'push',rest:false,exercises:[
          {id:'v29_paused_squat',s:'5',r:'5',rs:'180s'},{id:'bench',s:'5',r:'5',rs:'180s'},{id:'barbell-row',s:'5',r:'5',rs:'180s'}
        ]},
        {name:'Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Workout B',type:'pull',rest:false,exercises:[
          {id:'v29_paused_squat',s:'5',r:'5',rs:'180s'},{id:'ohp',s:'5',r:'5',rs:'180s'},{id:'deadlift',s:'1',r:'5',rs:'300s'}
        ]},
        {name:'Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Workout A (ripetuto)',type:'push',rest:false,exercises:[
          {id:'v29_paused_squat',s:'5',r:'5',rs:'180s'},{id:'bench',s:'5',r:'5',rs:'180s'},{id:'barbell-row',s:'5',r:'5',rs:'180s'}
        ]},
      ]
    },
    /* ── GERMAN VOLUME TRAINING (GVT) ── */
    {
      id:'v29_gvt',name:'GVT — German Volume Training',icon:'🇩🇪',color:'var(--purple)',
      t:'full',diff:'advanced',dur:'75',
      goals:['hypertrophy'],
      levels:['advanced','athlete'],
      desc:'10 serie × 10 reps a 60% del massimale. Volume estremo per ipertrofia muscolare massiva. Solo i forti sopravvivono.',
      days:[
        {name:'Petto + Dorsali',type:'push',rest:false,exercises:[
          {id:'incl-bench',s:'10',r:'10',rs:'90s'},{id:'pull-up',s:'10',r:'10',rs:'90s'},
          {id:'lateral-r',s:'3',r:'15',rs:'60s'},{id:'face-pull',s:'3',r:'15',rs:'60s'}
        ]},
        {name:'Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Gambe + Glutei',type:'lower',rest:false,exercises:[
          {id:'back-squat',s:'10',r:'10',rs:'90s'},{id:'v29_rdl',s:'10',r:'10',rs:'90s'},
          {id:'calf',s:'3',r:'15',rs:'60s'},{id:'glute-b',s:'3',r:'20',rs:'45s'}
        ]},
        {name:'Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Spalle + Braccia',type:'push',rest:false,exercises:[
          {id:'ohp',s:'10',r:'10',rs:'90s'},{id:'hammer-c',s:'10',r:'10',rs:'90s'},
          {id:'lateral-r',s:'3',r:'15',rs:'60s'},{id:'face-pull',s:'3',r:'15',rs:'60s'}
        ]},
      ]
    },
    /* ── KETTLEBELL PRIMORDIALE ── */
    {
      id:'v29_kb_program',name:'Kettlebell Primordiale',icon:'🫛',color:'var(--teal)',
      t:'full',diff:'intermediate',dur:'40',
      goals:['strength','fat_loss','endurance'],
      levels:['beginner','intermediate','advanced'],
      desc:'Solo kettlebell. Swing, Clean, Press, TGU. Forza funzionale, grasso bruciato, nessuna macchina necessaria.',
      days:[
        {name:'Forza KB',type:'full',rest:false,exercises:[
          {id:'v29_kb_swing',s:'5',r:'20',rs:'60s'},{id:'v29_kb_clean',s:'4',r:'5',rs:'90s'},
          {id:'v29_kb_press',s:'4',r:'8',rs:'90s'},{id:'v29_kb_tgu',s:'3',r:'3',rs:'120s'}
        ]},
        {name:'Riposo Attivo',type:'rest',rest:true,exercises:[]},
        {name:'HIIT KB',type:'cardio',rest:false,exercises:[
          {id:'v29_kb_swing',s:'6',r:'30s',rs:'30s'},{id:'v29_kb_goblet',s:'4',r:'15',rs:'45s'},
          {id:'v29_kb_snatch',s:'4',r:'5',rs:'90s'},{id:'v29_kb_dl',s:'3',r:'10',rs:'60s'}
        ]},
        {name:'Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Mobilità + Forza',type:'full',rest:false,exercises:[
          {id:'v29_kb_tgu',s:'5',r:'5',rs:'120s'},{id:'v29_kb_windmill',s:'3',r:'8',rs:'60s'},
          {id:'v29_kb_row',s:'4',r:'10',rs:'60s'},{id:'v29_kb_lunge',s:'3',r:'10',rs:'60s'}
        ]},
      ]
    },
    /* ── CALISTHENICS PRIMORDIALE (sbarra + parallele) ── */
    {
      id:'v29_primal_cal',name:'Calisthenics Primordiale',icon:'🦍',color:'var(--acc)',
      t:'calisthenics',diff:'advanced',dur:'60',
      goals:['calisthenics','strength'],
      levels:['advanced','athlete'],
      desc:'Solo sbarra, parallele e pavimento. Il programma primordiale senza fronzoli: forza reale, controllo totale del corpo.',
      days:[
        {name:'Lunedì — Forza Trazione',type:'pull',rest:false,exercises:[
          {id:'pull-exp',s:'5',r:'5',rs:'180s'},{id:'v29_bar_mu',s:'5',r:'3',rs:'240s'},
          {id:'pull-up-w',s:'4',r:'6',rs:'120s'},{id:'v29_front_lever',s:'4',r:'10s',rs:'120s'},
          {id:'v29_toes_bar',s:'3',r:'10',rs:'60s'}
        ]},
        {name:'Martedì — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Mercoledì — Spinta',type:'push',rest:false,exercises:[
          {id:'dips-w',s:'5',r:'5',rs:'180s'},{id:'hspu',s:'4',r:'5',rs:'180s'},
          {id:'v29_planche_adv',s:'4',r:'15s',rs:'120s'},{id:'push-up-w',s:'3',r:'10',rs:'90s'},
          {id:'v29_ring_dips',s:'3',r:'8',rs:'120s'}
        ]},
        {name:'Giovedì — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Venerdì — Skill + Full',type:'skill',rest:false,exercises:[
          {id:'v29_bar_mu',s:'5',r:'5',rs:'240s'},{id:'v29_back_lever',s:'4',r:'8s',rs:'120s'},
          {id:'lsit',s:'4',r:'30s',rs:'90s'},{id:'tuck-p',s:'3',r:'20s',rs:'90s'},
          {id:'hollow',s:'4',r:'45s',rs:'45s'}
        ]},
        {name:'Sabato — Lower',type:'lower',rest:false,exercises:[
          {id:'pistol-w',s:'5',r:'5',rs:'120s'},{id:'v29_box_jump',s:'4',r:'5',rs:'90s'},
          {id:'nordic',s:'4',r:'5',rs:'120s'},{id:'calf',s:'4',r:'20',rs:'45s'}
        ]},
        {name:'Domenica — Riposo',type:'rest',rest:true,exercises:[]},
      ]
    },
    /* ── POWERBUILDING (Forza + Ipertrofia) ── */
    {
      id:'v29_powerbuild',name:'Powerbuilding 4×/Sett.',icon:'⚡',color:'var(--blue)',
      t:'full',diff:'intermediate',dur:'70',
      goals:['strength','hypertrophy'],
      levels:['intermediate','advanced'],
      desc:'Unisce la forza del powerlifting all\'ipertrofia del bodybuilding. Prima i fondamentali pesanti, poi l\'isolamento.',
      days:[
        {name:'Lunedì — Lower Forza',type:'lower',rest:false,exercises:[
          {id:'back-squat',s:'4',r:'5',rs:'240s'},{id:'v29_rdl',s:'4',r:'6',rs:'180s'},
          {id:'v29_leg_press',s:'3',r:'12',rs:'90s'},{id:'v29_leg_curl',s:'3',r:'12',rs:'75s'},
          {id:'calf',s:'4',r:'15',rs:'60s'}
        ]},
        {name:'Martedì — Upper Forza',type:'push',rest:false,exercises:[
          {id:'bench',s:'4',r:'5',rs:'240s'},{id:'barbell-row',s:'4',r:'6',rs:'180s'},
          {id:'ohp',s:'3',r:'8',rs:'120s'},{id:'v29_lat_pull',s:'3',r:'12',rs:'90s'},
          {id:'lateral-r',s:'3',r:'15',rs:'60s'}
        ]},
        {name:'Mercoledì — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Giovedì — Lower Ipertrofia',type:'lower',rest:false,exercises:[
          {id:'v29_box_squat',s:'4',r:'10',rs:'90s'},{id:'bss',s:'4',r:'10',rs:'90s'},
          {id:'v29_leg_ext',s:'4',r:'15',rs:'60s'},{id:'nordic',s:'3',r:'8',rs:'90s'},
          {id:'glute-b',s:'4',r:'20',rs:'45s'}
        ]},
        {name:'Venerdì — Upper Ipertrofia',type:'push',rest:false,exercises:[
          {id:'incl-bench',s:'4',r:'10',rs:'90s'},{id:'pull-up',s:'4',r:'10',rs:'90s'},
          {id:'v29_chest_press',s:'3',r:'12',rs:'75s'},{id:'hammer-c',s:'4',r:'12',rs:'60s'},
          {id:'face-pull',s:'3',r:'15',rs:'45s'}
        ]},
      ]
    },
    /* ── STRONGMAN TRAINING ── */
    {
      id:'v29_strongman',name:'Strongman — Forza Brutale',icon:'💥',color:'var(--red)',
      t:'full',diff:'advanced',dur:'80',
      goals:['strength','endurance'],
      levels:['advanced','athlete'],
      desc:'Allenamento ispirato ai competitor strongman. Sollevamento, trasporto, spinta. Forza grezza e resistenza totale.',
      days:[
        {name:'Martedì — Spinta + Presse',type:'push',rest:false,exercises:[
          {id:'v29_log_press',s:'5',r:'5',rs:'240s'},{id:'ohp',s:'5',r:'3',rs:'180s'},
          {id:'v29_push_press',s:'4',r:'5',rs:'180s'},{id:'v29_sled_push',s:'4',r:'30m',rs:'180s'}
        ]},
        {name:'Giovedì — Terra + Trasporto',type:'pull',rest:false,exercises:[
          {id:'deadlift',s:'5',r:'3',rs:'300s'},{id:'v29_rack_pull',s:'4',r:'5',rs:'240s'},
          {id:'v29_tire_flip',s:'4',r:'6',rs:'180s'},{id:'v29_farmers',s:'4',r:'30m',rs:'180s'}
        ]},
        {name:'Sabato — Forza Totale',type:'full',rest:false,exercises:[
          {id:'v29_stone_lift',s:'5',r:'5',rs:'240s'},{id:'v29_yoke_walk',s:'4',r:'20m',rs:'180s'},
          {id:'v29_sled_push',s:'3',r:'40m',rs:'240s'},{id:'v29_battle_rope',s:'4',r:'30s',rs:'60s'}
        ]},
      ]
    },
    /* ── OLYMPIC WEIGHTLIFTING ── */
    {
      id:'v29_olympic',name:'Weightlifting Olimpionico',icon:'🏅',color:'var(--orange)',
      t:'full',diff:'advanced',dur:'90',
      goals:['strength','calisthenics'],
      levels:['advanced','athlete'],
      desc:'Snatch, Clean & Jerk e le loro varianti. Velocità, mobilità e forza esplosiva in un unico programma.',
      days:[
        {name:'Lunedì — Snatch',type:'full',rest:false,exercises:[
          {id:'v29_snatch',s:'6',r:'2',rs:'240s'},{id:'v29_hang_clean',s:'4',r:'3',rs:'180s'},
          {id:'back-squat',s:'4',r:'4',rs:'180s'},{id:'v29_rdl',s:'3',r:'5',rs:'120s'}
        ]},
        {name:'Mercoledì — Clean & Jerk',type:'full',rest:false,exercises:[
          {id:'v29_clean',s:'5',r:'3',rs:'240s'},{id:'v29_jerk',s:'5',r:'2',rs:'240s'},
          {id:'v29_push_press',s:'4',r:'4',rs:'180s'},{id:'front-squat',s:'4',r:'4',rs:'180s'}
        ]},
        {name:'Venerdì — Forza Accessoria',type:'full',rest:false,exercises:[
          {id:'v29_power_clean',s:'5',r:'3',rs:'180s'},{id:'v29_goodmorning',s:'4',r:'6',rs:'120s'},
          {id:'back-squat',s:'5',r:'5',rs:'180s'},{id:'v29_rack_pull',s:'3',r:'4',rs:'180s'}
        ]},
      ]
    },
    /* ── CROSSFIT-STYLE WOD ── */
    {
      id:'v29_crossfit',name:'CrossFit Style — WOD',icon:'🔥',color:'var(--red)',
      t:'full',diff:'intermediate',dur:'45',
      goals:['fat_loss','endurance','strength'],
      levels:['intermediate','advanced'],
      desc:'Workout of the Day in stile CrossFit. Alta intensità, movimenti funzionali, nessun muscolo escluso. Metabolismo a mille.',
      days:[
        {name:'WOD — Fran Style',type:'full',rest:false,exercises:[
          {id:'v29_clean',s:'1',r:'21-15-9',rs:'0s'},{id:'dips',s:'1',r:'21-15-9',rs:'0s'},
          {id:'v29_box_jump',s:'4',r:'10',rs:'30s'},{id:'burpees',s:'3',r:'15',rs:'30s'}
        ]},
        {name:'Riposo',type:'rest',rest:true,exercises:[]},
        {name:'WOD — Forza + Condiz.',type:'full',rest:false,exercises:[
          {id:'deadlift',s:'5',r:'3',rs:'120s'},{id:'v29_row_erg',s:'1',r:'500m',rs:'60s'},
          {id:'v29_kb_swing',s:'4',r:'20',rs:'45s'},{id:'pull-up',s:'4',r:'max',rs:'60s'}
        ]},
        {name:'Riposo',type:'rest',rest:true,exercises:[]},
        {name:'WOD — AMRAP 20min',type:'cardio',rest:false,exercises:[
          {id:'v29_assault_bike',s:'1',r:'10cal',rs:'0s'},{id:'v29_box_jump',s:'1',r:'10',rs:'0s'},
          {id:'v29_kb_swing',s:'1',r:'15',rs:'0s'},{id:'v29_toes_bar',s:'1',r:'10',rs:'0s'}
        ]},
      ]
    },
    /* ── CORPO LIBERO PRIMORDIALE (no attrezzi assoluto) ── */
    {
      id:'v29_primal_bw',name:'Primordiale — Zero Attrezzi',icon:'🦁',color:'var(--green)',
      t:'full',diff:'beginner',dur:'35',
      goals:['hypertrophy','fat_loss','endurance'],
      levels:['beginner','intermediate'],
      desc:'Niente sbarre, niente pesi. Solo il tuo corpo e il pavimento. Esercizi primordiali che l\'uomo fa da millenni.',
      days:[
        {name:'Giorno 1 — Forza',type:'full',rest:false,exercises:[
          {id:'push-up',s:'5',r:'max',rs:'60s'},{id:'ct-squat',s:'5',r:'20',rs:'60s'},
          {id:'plank',s:'4',r:'60s',rs:'45s'},{id:'ct-lunge',s:'4',r:'15',rs:'60s'},
          {id:'v-ups',s:'3',r:'15',rs:'45s'}
        ]},
        {name:'Giorno 2 — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Giorno 3 — Cardio',type:'cardio',rest:false,exercises:[
          {id:'burpees',s:'5',r:'45s',rs:'15s'},{id:'mt-cl',s:'5',r:'40s',rs:'20s'},
          {id:'squat-j',s:'4',r:'30s',rs:'30s'},{id:'hi-kn',s:'4',r:'40s',rs:'20s'},
          {id:'jump-j',s:'3',r:'60s',rs:'0s'}
        ]},
        {name:'Giorno 4 — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Giorno 5 — Core + Glutei',type:'full',rest:false,exercises:[
          {id:'ct-hollow',s:'4',r:'40s',rs:'45s'},{id:'glute-b',s:'4',r:'25',rs:'45s'},
          {id:'ct-crunch',s:'4',r:'20',rs:'30s'},{id:'ct-wall',s:'3',r:'90s',rs:'30s'},
          {id:'side-plank',s:'3',r:'45s',rs:'30s'}
        ]},
      ]
    },
    /* ── UPPER/LOWER 4 GIORNI ── */
    {
      id:'v29_upper_lower',name:'Upper / Lower — 4 giorni',icon:'↕️',color:'var(--purple)',
      t:'full',diff:'intermediate',dur:'55',
      goals:['hypertrophy','strength'],
      levels:['intermediate','advanced'],
      desc:'Classic upper/lower split 4×/settimana. Ogni muscolo colpito due volte. Bilanciato, efficiente, proven.',
      days:[
        {name:'Lunedì — Upper A',type:'push',rest:false,exercises:[
          {id:'bench',s:'4',r:'8',rs:'120s'},{id:'pull-up',s:'4',r:'8',rs:'120s'},
          {id:'ohp',s:'3',r:'10',rs:'90s'},{id:'barbell-row',s:'3',r:'10',rs:'90s'},
          {id:'lateral-r',s:'3',r:'15',rs:'60s'},{id:'hammer-c',s:'3',r:'12',rs:'60s'}
        ]},
        {name:'Martedì — Lower A',type:'lower',rest:false,exercises:[
          {id:'back-squat',s:'4',r:'8',rs:'180s'},{id:'v29_rdl',s:'4',r:'8',rs:'120s'},
          {id:'bss',s:'3',r:'10',rs:'90s'},{id:'v29_leg_curl',s:'3',r:'12',rs:'75s'},
          {id:'calf',s:'4',r:'20',rs:'45s'}
        ]},
        {name:'Giovedì — Upper B',type:'push',rest:false,exercises:[
          {id:'incl-bench',s:'4',r:'10',rs:'90s'},{id:'chin-up',s:'4',r:'10',rs:'90s'},
          {id:'v29_db_ohp',s:'3',r:'12',rs:'75s'},{id:'v29_cable_row',s:'3',r:'12',rs:'75s'},
          {id:'face-pull',s:'3',r:'15',rs:'45s'},{id:'dips',s:'3',r:'12',rs:'75s'}
        ]},
        {name:'Venerdì — Lower B',type:'lower',rest:false,exercises:[
          {id:'v29_sumo_dl',s:'4',r:'6',rs:'180s'},{id:'v29_hack_squat',s:'4',r:'10',rs:'90s'},
          {id:'nordic',s:'3',r:'8',rs:'120s'},{id:'v29_leg_ext',s:'3',r:'15',rs:'60s'},
          {id:'glute-b',s:'4',r:'20',rs:'45s'}
        ]},
      ]
    },
    /* ── BODYWEIGHT ATHLETE (Calisthenics Beginner Totale) ── */
    {
      id:'v29_bw_athlete',name:'Bodyweight Athlete',icon:'🤸',color:'var(--teal)',
      t:'calisthenics',diff:'beginner',dur:'30',
      goals:['calisthenics','mobility'],
      levels:['beginner','intermediate'],
      desc:'Costruisci la base atletica con il corpo libero. Dalla pull-up al plank al pistol. Progressioni chiare, risultati garantiti.',
      days:[
        {name:'Lun — Push + Core',type:'push',rest:false,exercises:[
          {id:'push-up',s:'4',r:'15',rs:'60s'},{id:'pike-pu',s:'3',r:'10',rs:'75s'},
          {id:'dips',s:'3',r:'8',rs:'75s'},{id:'plank',s:'4',r:'45s',rs:'30s'},
          {id:'hollow',s:'3',r:'30s',rs:'30s'}
        ]},
        {name:'Mar — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Mer — Pull + Gambe',type:'pull',rest:false,exercises:[
          {id:'pull-up',s:'4',r:'max',rs:'90s'},{id:'chin-up',s:'3',r:'8',rs:'75s'},
          {id:'squat',s:'4',r:'20',rs:'60s'},{id:'bss',s:'3',r:'12',rs:'75s'},
          {id:'glute-b',s:'4',r:'20',rs:'30s'}
        ]},
        {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
        {name:'Ven — Full + Skill',type:'skill',rest:false,exercises:[
          {id:'archer-pu',s:'3',r:'8',rs:'90s'},{id:'lsit',s:'4',r:'15s',rs:'60s'},
          {id:'pistol',s:'3',r:'5',rs:'90s'},{id:'tuck-p',s:'3',r:'10s',rs:'90s'},
          {id:'v-ups',s:'3',r:'15',rs:'45s'}
        ]},
        {name:'Sab — Cardio',type:'cardio',rest:false,exercises:[
          {id:'burpees',s:'4',r:'40s',rs:'20s'},{id:'squat-j',s:'4',r:'30s',rs:'30s'},
          {id:'mt-cl',s:'4',r:'40s',rs:'20s'},{id:'v29_jump_rope',s:'3',r:'2min',rs:'60s'}
        ]},
      ]
    },
    /* ── MOBILITÀ E YOGA ATHLETE ── */
    {
      id:'v29_mobility_pro',name:'Mobilità Pro — Yoga Athlete',icon:'🧘',color:'var(--teal)',
      t:'custom',diff:'beginner',dur:'45',
      goals:['mobility'],
      levels:['beginner','intermediate','advanced','athlete'],
      desc:'Sessioni di mobilità avanzata, stretching dinamico e static, rotazioni articolari. Ideale per prevenzione infortuni e recupero.',
      days:[
        {name:'Mobilità Totale',type:'custom',rest:false,exercises:[
          {id:'hollow',s:'3',r:'30s',rs:'30s'},{id:'plank',s:'3',r:'60s',rs:'30s'},
          {id:'v29_kb_windmill',s:'3',r:'8',rs:'60s'},{id:'ct-wall',s:'3',r:'90s',rs:'30s'},
          {id:'glute-b',s:'3',r:'20',rs:'30s'}
        ]},
        {name:'Mobilità Inferiore',type:'custom',rest:false,exercises:[
          {id:'ct-squat',s:'3',r:'30s',rs:'30s'},{id:'bss',s:'3',r:'10',rs:'60s'},
          {id:'nordic',s:'3',r:'5',rs:'90s'},{id:'calf',s:'3',r:'20',rs:'30s'}
        ]},
      ]
    },
  ];

  if(typeof PRESETS_DATA!=='undefined'){
    const ids=new Set(PRESETS_DATA.map(p=>p.id));
    newPresets.forEach(p=>{if(!ids.has(p.id)){PRESETS_DATA.push(p);ids.add(p.id);}});
    // Sync alias
    if(typeof WORKOUT_PRESETS!=='undefined') window.WORKOUT_PRESETS=PRESETS_DATA;
    window.PRESETS_DATA=PRESETS_DATA;
  }
})();

/* ══ 4. FIX GLOBALE obGo / finishOnboard ════════════════════════ */
(function fixGlobalRefs(){
  // Garantisce che obGo sia sempre window.obGo
  if(typeof obGo === 'function' && !window.obGo) window.obGo = obGo;
  if(typeof finishOnboard === 'function' && !window.finishOnboard) window.finishOnboard = finishOnboard;
  if(typeof renderWoExs === 'function' && !window.renderWoExs) window.renderWoExs = renderWoExs;
  if(typeof profile !== 'undefined' && !window.profile) window.profile = profile;
})();

/* ══ 5. PATCH getRecommendedPreset con nuovi preset ════════════ */
(function patchPresetRecommender(){
  const _orig = window.getRecommendedPreset || (typeof getRecommendedPreset==='function' ? getRecommendedPreset : null);
  window.getRecommendedPreset = function(goals, level){
    const g = goals || [];
    const l = level || 'intermediate';
    if(g.includes('strength') && l==='athlete') return 'v29_olympic';
    if(g.includes('strength') && g.includes('hypertrophy') && ['advanced','athlete'].includes(l)) return 'v29_powerbuild';
    if(g.includes('strength') && ['intermediate'].includes(l)) return 'v29_5x5';
    if(g.includes('hypertrophy') && l==='advanced') return 'v29_gvt';
    if(g.includes('endurance') && g.includes('strength')) return 'v29_crossfit';
    if(_orig) return _orig(goals, level);
    return 'ppl';
  };
})();

waitReady(()=>{
  });

})(); // end v29Patch

(function v30Patch(){

/* ══ MAPPA EQUIPMENT: ogni attrezzo del preset → id EQ_FULL_LIST ════
   Gli esercizi hanno equipment:['manubri','sbarra',...] 
   I preset in PRESETS_DATA hanno days[].exercises[].id
   Dobbiamo capire quali attrezzi servono per ogni preset.
═══════════════════════════════════════════════════════════════════ */

/* Ottieni la lista di equipment dall'utente (localStorage) */
function getUserEquipment(){
  try {
    const raw = JSON.parse(localStorage.getItem('ft_equipment') || '[]');
    return new Set(raw);
  } catch(e){ return new Set(); }
}

/* Dato un presetId, calcola gli attrezzi MANCANTI per l'utente corrente.
   Ritorna: { canDo: bool, missing: Set<string>, missingLabels: string[] } */
function getPresetCompatibility(presetId){
  const userEq = getUserEquipment();
  const hasFreeBody = userEq.has('niente') || userEq.size === 0;

  // Se l'utente ha macchinari, ha anche panca e bilanciere implicitamente? No — rispettiamo la scelta.
  // "niente" = solo corpo libero, ma può ancora usare sedia/tavolo (ct- exercises)

  const preset = (typeof PRESETS_DATA !== 'undefined' ? PRESETS_DATA : [])
    .find(p => p.id === presetId);
  if(!preset) return { canDo: true, missing: new Set(), missingLabels: [] };

  const neededEq = new Set();
  (preset.days||[]).forEach(day => {
    if(day.rest) return;
    day.exercises.forEach(ex => {
      const exDef = (typeof EX_DB !== 'undefined' ? EX_DB : []).find(e => e.id === ex.id);
      if(exDef && exDef.equipment && exDef.equipment.length > 0){
        exDef.equipment.forEach(eq => neededEq.add(eq));
      }
    });
  });

  // Rimuovi attrezzi che l'utente ha
  const missing = new Set();
  neededEq.forEach(eq => {
    // "anelli" e "trx" → mappati su "trx" in EQ_FULL_LIST
    const mapped = eq === 'anelli' ? 'trx' : eq === 'ruota_addome' ? null : eq === 'ab_wheel' ? null : eq === 'corda' ? null : eq === 'rower' ? null : eq === 'attrezzi_strongman' ? null : eq;
    if(mapped && !userEq.has(mapped) && !userEq.has('niente') && eq !== '') {
      missing.add(mapped || eq);
    }
  });

  // Se utente ha selezionato "niente" (solo corpo libero), qualsiasi attrezzo manca
  if(userEq.has('niente')){
    neededEq.forEach(eq => {
      if(eq && eq !== '') missing.add(eq);
    });
  }

  // Traduzione label
  const EQ_LABELS = {
    bilanciere:'Bilanciere + Pesi', manubri:'Manubri', kettlebell:'Kettlebell',
    sbarra:'Sbarra per trazioni', parallele:'Parallele / Dip station', bande:'Bande elastiche',
    trx:'TRX / Anelli', tapis_roulant:'Tapis roulant', cyclette:'Cyclette / Bike',
    panca:'Panca piana', macchinari:'Macchine isotoniche',
    anelli:'TRX / Anelli', attrezzi_strongman:'Attrezzi Strongman',
    ruota_addome:'Ab Wheel', ab_wheel:'Ab Wheel', corda:'Corda da battaglia', rower:'Vogatore / Rowing erg',
  };
  const missingLabels = [...missing].map(m => EQ_LABELS[m] || m).filter(Boolean);

  return {
    canDo: missing.size === 0 || userEq.size === 0, // se no eq configurato → non bloccare
    missing,
    missingLabels
  };
}

/* Esponi globalmente */
window.getPresetCompatibility = getPresetCompatibility;
window.getUserEquipment = getUserEquipment;

/* ══ INJECT BADGE SUI PRESET CARD ══════════════════════════════ */
function injectPresetBadges(){
  // Cerca tutte le card preset nel DOM
  // Le card hanno data-preset-id o id simile — proviamo a trovare il punto di render
  if(typeof PRESETS_DATA === 'undefined') return;
  const userEq = getUserEquipment();
  if(userEq.size === 0) return; // equipment non configurato → non mostrare nulla

  // Patch renderEsploraPresets se esiste
  const _origRender = window.renderEsploraPresets || window.renderPresets || window.renderProgramList;
  // Non sovrascriviamo direttamente — usiamo un MutationObserver sui container
}

/* ══ PATCH renderEsploraPresets PER AGGIUNGERE BADGE ══════════ */
(function patchPresetRenderer(){
  // Aspetta che la funzione esista
  function tryPatch(){
    const fnName = ['renderEsploraPresets','renderPresets','renderProgramList','renderProgrammi'].find(n => typeof window[n] === 'function');
    if(!fnName) return false;

    const _orig = window[fnName];
    if(window['_v30_' + fnName + '_patched']) return true;
    window['_v30_' + fnName + '_patched'] = true;

    window[fnName] = function(){
      _orig.apply(this, arguments);
      setTimeout(applyCompatibilityBadges, 80);
    };
    return true;
  }

  if(!tryPatch()){
    // Riprova dopo boot
    const iv = setInterval(()=>{ if(tryPatch()) clearInterval(iv); }, 300);
    setTimeout(()=>clearInterval(iv), 8000);
  }
})();

/* ══ PATCH renderEsploraPresets PER AGGIUNGERE BADGE ══════════ */
window.showMissingEquipmentAlert = function(presetName, missingLabels){
  document.getElementById('v30-missing-modal')?.remove();
  const modal = document.createElement('div');
  modal.id = 'v30-missing-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,0.7);display:flex;align-items:flex-end;backdrop-filter:blur(8px);';
  modal.innerHTML = `
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;padding:24px 20px calc(32px + env(safe-area-inset-bottom));animation:slideUp .35s cubic-bezier(.22,1,.36,1) both;">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <div style="font-size:28px">⚠️</div>
      <div>
        <div style="font-size:16px;font-weight:800;color:var(--red)">Attrezzatura mancante</div>
        <div style="font-size:12px;color:var(--text2);margin-top:2px">${presetName}</div>
      </div>
    </div>
    <div style="font-size:13px;color:var(--text2);margin-bottom:14px;line-height:1.6;">
      Per eseguire questo programma ti serve:
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:20px;">
      ${missingLabels.map(l=>`
        <div style="display:flex;align-items:center;gap:10px;background:var(--red-d);border:1px solid rgba(255,92,106,.2);border-radius:10px;padding:10px 14px;">
          <span style="font-size:16px">❌</span>
          <span style="font-size:13px;font-weight:700;color:var(--text)">${l}</span>
        </div>`).join('')}
    </div>
    <div style="font-size:12px;color:var(--text3);margin-bottom:18px;line-height:1.5;background:var(--bg3);border-radius:10px;padding:10px 12px;">
      💡 Puoi comunque avviare il programma, ma alcuni esercizi potrebbero non essere eseguibili senza l'attrezzatura indicata.
    </div>
    <div style="display:flex;gap:10px;">
      <button onclick="document.getElementById('v30-missing-modal').remove();openEquipmentSettings&&openEquipmentSettings();"
        style="flex:1;padding:13px;background:var(--acc);color:#080810;border:none;border-radius:14px;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer;">
        🏋️ Configura attrezzatura
      </button>
      <button onclick="document.getElementById('v30-missing-modal').remove();"
        style="flex:1;padding:13px;background:var(--bg4);color:var(--text2);border:1px solid var(--border2);border-radius:14px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;cursor:pointer;">
        Chiudi
      </button>
    </div>
  </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e=>{ if(e.target===modal) modal.remove(); });
};

/* Re-applica i badge ogni volta che cambia pagina */
(function watchPageChanges(){
  const _origGoPage = window.goPage;
  if(typeof _origGoPage === 'function' && !window._v30GoPagePatched){
    window._v30GoPagePatched = true;
    window.goPage = function(page){
      _origGoPage.apply(this, arguments);
      if(['esplora','training','programma','preset'].some(k=>String(page).includes(k))){
        setTimeout(applyCompatibilityBadges, 400);
      }
    };
  }
  // MutationObserver solo sul container preset, non su tutto il body
  const observer = new MutationObserver(()=>{ 
    clearTimeout(window._v30BadgeTimer);
    window._v30BadgeTimer = setTimeout(applyCompatibilityBadges, 400);
  });
  // Sempre defer — garantisce che il DOM sia completamente pronto
  function _startBadgeObserver() {
    var _presetTarget = document.getElementById('page-esplora') || document.getElementById('preset-list') || document.getElementById('preset-explorer') || document.body;
    if (_presetTarget && typeof _presetTarget.nodeType !== 'undefined') {
      try { observer.observe(_presetTarget, { childList:true, subtree:true }); } catch(e) {}
    }
  }
  // Sempre via setTimeout — evita TypeError se DOM non ancora pronto durante parsing
  setTimeout(_startBadgeObserver, 0);
})();

/* ══ NUOVE RICETTE V30 (+25) ════════════════════════════════════ */
(function addRicetteV30(){
  const nuove = [
    /* ── COLAZIONI ── */
    {id:'v30_r1',name:'Overnight Oats Proteici',ico:'🌙',tags:['massa','colazione'],time:'5 min + riposo',kcal:520,p:40,c:62,g:12,diff:'Facilissimo',
     desc:'Prepara la sera, mangia la mattina. Zero stress, macro perfette.',
     ingredienti:['80g fiocchi d\'avena','250ml latte scremato','1 scoop whey vaniglia (30g)','2 cucchiai skyr','1 cucchiaio burro di arachidi','Mirtilli freschi q.b.'],
     steps:['Mescola avena, latte, whey e skyr in un barattolo.','Aggiungi il burro di arachidi e mescola.','Chiudi e metti in frigo tutta la notte.','Mattina: topping di mirtilli e mangia freddo o riscaldato 90 sec in microonde.']},
    {id:'v30_r2',name:'French Toast Proteico',ico:'🍞',tags:['massa','colazione'],time:'12 min',kcal:490,p:38,c:52,g:14,diff:'Facile',
     desc:'Versione fit del french toast — senza sensi di colpa.',
     ingredienti:['3 fette pane proteico (o integrale)','3 albumi + 1 uovo intero','1 scoop whey vaniglia (20g)','Cannella, vaniglia q.b.','Sciroppo d\'acero senza zucchero per servire'],
     steps:['Sbatti uova, albumi, whey, cannella e vaniglia in una ciotola.','Immergi le fette di pane 1 min per lato.','Cuoci in padella antiaderente a fuoco medio 3 min per lato.','Servi con sciroppo d\'acero e frutta fresca.']},
    {id:'v30_r3',name:'Smoothie Bowl Tropical',ico:'🥭',tags:['definizione','colazione','rapido'],time:'5 min',kcal:310,p:24,c:44,g:6,diff:'Facilissimo',
     desc:'Colazione fresca ed energetica. Densità nutritiva massima.',
     ingredienti:['1 banana congelata','100g mango congelato','150ml latte di cocco light','1 scoop whey vaniglia','Topping: granola, kiwi, semi di chia'],
     steps:['Frulla banana, mango, latte di cocco e whey fino a cremoso denso.','Versa nella ciotola — deve essere spessa, non liquida.','Aggiungi topping: granola, fette di kiwi, semi di chia.','Consuma subito.']},
    {id:'v30_r4',name:'Muffin Proteici all\'Avena',ico:'🧁',tags:['spuntino','massa','colazione'],time:'25 min',kcal:180,p:12,c:22,g:5,diff:'Facile',
     desc:'6 muffin — prep domenicale per tutta la settimana.',
     ingredienti:['150g farina d\'avena','2 scoop whey cioccolato (60g)','3 uova intere','100ml latte scremato','2 cucchiai miele','1/2 bustina lievito per dolci','Gocce di cioccolato fondente q.b.'],
     steps:['Preriscalda il forno a 180°C.','Mescola farina d\'avena, whey e lievito.','Sbatti uova con miele e latte, unisci al secco.','Aggiungi gocce di cioccolato, versa nei pirottini.','Cuoci 18-20 minuti. Toothpick test per verificare.']},
    /* ── PRANZI ── */
    {id:'v30_r5',name:'Pasta al Salmone e Agrumi',ico:'🍋',tags:['massa','pranzo'],time:'20 min',kcal:580,p:42,c:68,g:14,diff:'Facile',
     desc:'Omega-3 + carboidrati complessi — combo perfetta per il recupero.',
     ingredienti:['90g pasta integrale','150g salmone fresco','Scorza + succo di 1 limone','Scorza d\'arancia q.b.','1 spicchio aglio','Aneto fresco, capperi, olio EVO'],
     steps:['Cuoci la pasta al dente.','Soffriggi aglio in olio, aggiungi salmone a cubetti 3-4 min.','Aggiungi scorza di limone e arancia, succo di limone, capperi.','Mescola con la pasta, manteca con acqua di cottura. Aneto fresco.']},
    {id:'v30_r6',name:'Riso Integrale Pollo e Curry',ico:'🍛',tags:['massa','pranzo','pre-workout'],time:'25 min',kcal:520,p:40,c:62,g:10,diff:'Facile',
     desc:'Speziato, saziante e ricco di proteine. Meal prep ideale.',
     ingredienti:['100g riso integrale','160g petto di pollo a cubetti','1 cipolla + 1 peperone','Curry in polvere 2 cucchiaini','200ml latte di cocco light','Coriandolo fresco'],
     steps:['Cuoci il riso e tienilo da parte.','Soffriggi cipolla e peperone 5 min, aggiungi pollo.','Aggiungi curry e latte di cocco, cuoci 8 min a fuoco medio.','Servi sul riso con coriandolo fresco.']},
    {id:'v30_r7',name:'Poke Bowl Hawaiiana Fit',ico:'🐟',tags:['definizione','pranzo'],time:'15 min',kcal:420,p:35,c:44,g:10,diff:'Facile',
     desc:'Poke originale rivisitato per i macros dell\'atleta.',
     ingredienti:['120g tonno fresco (sushi grade)','100g riso sushi cotto','50g edamame sgusciati','1/2 avocado','Cetriolo, carote grattugiate q.b.','Salsa soia, sesamo, zenzero'],
     steps:['Taglia il tonno a cubetti e marina 10 min in soia + zenzero.','Metti il riso nella ciotola come base.','Disponi tonno, edamame, avocado, cetriolo e carote.','Condisci con salsa di soia, semi di sesamo e olio di sesamo.']},
    {id:'v30_r8',name:'Wrap Pollo Caesar Fit',ico:'🌯',tags:['definizione','pranzo','rapido'],time:'10 min',kcal:380,p:35,c:30,g:12,diff:'Facilissimo',
     desc:'Portalo in palestra. Pratico, proteico, zero sprechi.',
     ingredienti:['1 tortilla integrale grande','150g petto di pollo grigliato','60g lattuga romana','20g parmigiano grattugiato','Salsa Caesar light 2 cucchiai','Pomodorini 60g'],
     steps:['Affetta il pollo a striscioline.','Scalda la tortilla 20 secondi in padella o microonde.','Distribuisci lattuga, pollo, pomodorini, parmigiano.','Aggiungi salsa Caesar, arrotola stretto. Taglia a metà.']},
    {id:'v30_r9',name:'Zuppa Miso Proteica',ico:'🍜',tags:['definizione','cena','veg'],time:'15 min',kcal:280,p:22,c:20,g:8,diff:'Facile',
     desc:'Anti-infiammatoria, fermentata, saporita e leggera.',
     ingredienti:['800ml brodo dashi (o vegetale)','2 cucchiai pasta di miso','150g tofu sodo a cubetti','50g edamame','Alga nori tagliata a strisce','Cipollotto, zenzero fresco'],
     steps:['Porta il brodo a quasi ebollizione (non bollire il miso).','Sciogli il miso in una ciotola con poco brodo freddo.','Unisci miso sciolto al brodo, aggiungi tofu e edamame.','Servi con nori, cipollotto e zenzero grattugiato.']},
    {id:'v30_r10',name:'Pasta e Ceci Fitness',ico:'🫘',tags:['massa','pranzo','veg'],time:'30 min',kcal:490,p:24,c:72,g:10,diff:'Facile',
     desc:'Proteina vegetale completa + carboidrati. Grande classico reinventato.',
     ingredienti:['70g pasta mista (spaghetti spezzati)','200g ceci cotti','1 spicchio aglio + rosmarino','150ml brodo vegetale','Pomodorini 80g','Olio EVO, peperoncino'],
     steps:['Soffriggi aglio, rosmarino e peperoncino in olio.','Aggiungi ceci schiacciandone metà con il cucchiaio.','Aggiungi brodo e pomodorini, cuoci 5 min.','Aggiungi pasta cruda e cuoci nel brodo 10-12 min. Manteca.']},
    /* ── CENE ── */
    {id:'v30_r11',name:'Merluzzo al Forno con Patate Dolci',ico:'🐟',tags:['definizione','cena'],time:'30 min',kcal:340,p:36,c:34,g:6,diff:'Facile',
     desc:'Basso contenuto calorico, altissimo valore nutritivo.',
     ingredienti:['200g filetto di merluzzo','200g patate dolci a fette','Aglio, paprika affumicata','Rosmarino fresco','Limone, olio spray, sale'],
     steps:['Preriscalda forno a 200°C.','Distribuisci patate dolci condite con paprika e rosmarino su teglia.','Cuoci 15 min, poi aggiungi il merluzzo condito.','Cuoci altri 12-15 min. Servi con limone.']},
    {id:'v30_r12',name:'Stir-Fry Manzo e Verdure',ico:'🥩',tags:['massa','cena'],time:'15 min',kcal:480,p:40,c:28,g:22,diff:'Facile',
     desc:'Alta proteina, ferro, sapore umami. Pronto in 15 minuti.',
     ingredienti:['180g manzo taglio magro a striscioline','Broccoli 150g, carote 100g','Salsa di soia 2 cucchiai + oyster sauce 1 cucchiaio','Zenzero + aglio + olio di sesamo','Sesamo bianco per servire'],
     steps:['Marina il manzo 5 min in soia + zenzero.','Scalda wok o padella a fuoco alto con olio di sesamo.','Cuoci manzo 3 min a fuoco vivace, togli.','Soffriggi verdure 4 min, riunisci manzo, aggiungi oyster sauce. Sesamo.']},
    {id:'v30_r13',name:'Frittata di Albumi e Verdure',ico:'🍳',tags:['definizione','cena','rapido'],time:'12 min',kcal:230,p:28,c:8,g:9,diff:'Facile',
     desc:'Cena leggera ad alto profilo proteico. Pronta in 12 min.',
     ingredienti:['6 albumi + 1 uovo intero','Spinaci 80g, pomodorini 60g','Feta 30g','Erba cipollina, sale, pepe','Olio EVO spray'],
     steps:['Sbatti uova e albumi con sale e pepe.','Scalda padella antiaderente con olio spray.','Aggiungi spinaci e pomodorini, appassisci 2 min.','Versa le uova, cuoci 4 min con coperchio. Aggiungi feta.','Piega e servi con erba cipollina.']},
    {id:'v30_r14',name:'Salmone Teriyaki con Riso',ico:'🍣',tags:['massa','cena'],time:'20 min',kcal:540,p:38,c:60,g:14,diff:'Facile',
     desc:'Glassatura teriyaki homemade — molto meglio del ristorante.',
     ingredienti:['160g trancio di salmone','100g riso basmati cotto','3 cucchiai salsa soia','1 cucchiaio miele','Zenzero grattugiato, aglio, sesamo'],
     steps:['Mescola soia, miele, zenzero e aglio per la salsa.','Cuoci il salmone in padella 3 min per lato.','Aggiungi la salsa teriyaki e glassa 2 min per lato.','Servi sul riso con semi di sesamo e cipollotto.']},
    {id:'v30_r15',name:'Burger di Lenticchie Rosse',ico:'🍔',tags:['definizione','cena','veg'],time:'25 min',kcal:350,p:18,c:48,g:9,diff:'Intermedio',
     desc:'Plant burger ad alto contenuto di proteine vegetali e fibra.',
     ingredienti:['200g lenticchie rosse cotte e schiacciate','50g farina di ceci','1 uovo','Cipolla rossa, cumino, coriandolo, peperoncino','Pane proteico, lattuga, pomodoro'],
     steps:['Mescola lenticchie schiacciate con farina di ceci, uovo e spezie.','Aggiungi cipolla tritata finemente. Forma 2 burger.','Cuoci in padella antiaderente 4-5 min per lato.','Assembla nel pane con lattuga e pomodoro.']},
    /* ── POST-WORKOUT ── */
    {id:'v30_r16',name:'Riso Cotto nel Latte Proteico',ico:'🍚',tags:['post-workout','massa'],time:'20 min',kcal:480,p:38,c:62,g:8,diff:'Facile',
     desc:'Post-workout solido e caldo — ottimo d\'inverno.',
     ingredienti:['90g riso Arborio (o basmati)','400ml latte scremato','1 scoop whey vaniglia (30g)','2 cucchiai miele','Cannella e cardamomo q.b.'],
     steps:['Cuoci il riso nel latte a fuoco basso mescolando spesso.','Dopo 15 min aggiungi whey e mescola velocemente.','Aggiungi miele e spezie.','Servi caldo. Il risotto si addensa raffreddandosi.']},
    {id:'v30_r17',name:'Cottage Cheese Power Bowl',ico:'🫙',tags:['post-workout','rapido','massa'],time:'3 min',kcal:360,p:36,c:32,g:10,diff:'Facilissimo',
     desc:'Proteine lente + veloci. Doppio effetto anabolico.',
     ingredienti:['200g cottage cheese','1 scoop caseina cioccolato (20g)','1 banana a fette','1 cucchiaio granola proteica','Mirtilli, cannella'],
     steps:['Mescola cottage cheese con la caseina in una ciotola.','Aggiungi banana a fette e mirtilli.','Topping di granola e un pizzico di cannella.','Consuma entro 30 min dall\'allenamento.']},
    /* ── SNACK / SPUNTINI ── */
    {id:'v30_r18',name:'Apple Nachos Proteici',ico:'🍏',tags:['spuntino','rapido','definizione'],time:'5 min',kcal:220,p:8,c:30,g:8,diff:'Facilissimo',
     desc:'Snack furbo che sembra un dessert ma fa solo bene.',
     ingredienti:['2 mele a fette sottili','2 cucchiai burro di arachidi naturale','1 cucchiaio miele','Cannella, granola q.b.','Semi di canapa facoltativi'],
     steps:['Affetta le mele a rondelle sottili, sistemale su un piatto.','Scalda il burro di arachidi 15 sec nel microonde.','Irrora le mele con burro di arachidi e miele.','Completa con cannella, granola e semi.']},
    {id:'v30_r19',name:'Pudding di Chia al Cioccolato',ico:'🍫',tags:['spuntino','veg','definizione'],time:'5 min + riposo',kcal:290,p:14,c:28,g:14,diff:'Facilissimo',
     desc:'Omega-3, fibre e proteine. Si prepara la sera.',
     ingredienti:['40g semi di chia','300ml latte vegetale (mandorla o avena)','1 cucchiaio cacao amaro','1 cucchiaio sciroppo d\'acero','1/2 scoop whey cioccolato'],
     steps:['Mescola tutto in un barattolo con una frusta.','Aspetta 5 min, mescola di nuovo per evitare grumi.','Frigo per almeno 4 ore (o tutta la notte).','Topping al mattino: banana, nocciole, scaglie cacao.']},
    {id:'v30_r20',name:'Skyr Bark Congelato',ico:'❄️',tags:['spuntino','rapido','definizione'],time:'5 min + congelamento',kcal:190,p:20,c:18,g:4,diff:'Facilissimo',
     desc:'Dessert proteico congelato — più sano di un gelato.',
     ingredienti:['400g skyr naturale','2 cucchiai miele','Fragole, mirtilli, lamponi q.b.','Granola 20g','Gocce di cioccolato fondente'],
     steps:['Stendi lo skyr su carta forno in strato uniforme (1.5cm).','Aggiungi miele, frutta, granola e gocce di cioccolato.','Congela per almeno 3 ore.','Taglia a pezzi irregolari e consuma subito.']},
    /* ── VEG / VEGANO ── */
    {id:'v30_r21',name:'Dhal di Lenticchie Proteico',ico:'🫘',tags:['veg','cena','massa'],time:'30 min',kcal:400,p:22,c:52,g:10,diff:'Facile',
     desc:'Cucina indiana adattata per l\'atleta. Proteine vegetali esplosive.',
     ingredienti:['200g lenticchie rosse secche','400ml latte di cocco light','1 cipolla + 2 spicchi aglio + zenzero','Curcuma, cumino, coriandolo, peperoncino','Riso basmati cotto per servire'],
     steps:['Soffriggi cipolla, aglio e zenzero in olio 5 min.','Aggiungi spezie e tosta 1 min.','Aggiungi lenticchie e latte di cocco. Cuoci 20 min mescolando.','Servi sul riso con coriandolo fresco e limone.']},
    {id:'v30_r22',name:'Tacos di Jackfruit e Fagioli',ico:'🌮',tags:['veg','cena'],time:'25 min',kcal:370,p:16,c:54,g:9,diff:'Facile',
     desc:'100% plant-based. Saporito come carne, senza.',
     ingredienti:['1 lattina jackfruit verde in acqua','1 lattina fagioli neri','Tortillas mais (3 pezzi)','Guacamole 60g','Cumino, paprika affumicata, aglio','Coriandolo, lime, cipolla rossa'],
     steps:['Scola e straccia il jackfruit con le mani.','Rosola in padella con spezie 8 min.','Aggiungi i fagioli scolati, cuoci 5 min.','Assembla i tacos con jackfruit, fagioli, guacamole, cipolla, lime.']},
    {id:'v30_r23',name:'Tempeh alla Piastra con Salsa Tahini',ico:'🌿',tags:['veg','pranzo','massa'],time:'15 min',kcal:440,p:26,c:26,g:24,diff:'Facile',
     desc:'Proteina vegetale fermentata con massima biodisponibilità.',
     ingredienti:['200g tempeh a fette','2 cucchiai tahini','Succo di limone, aglio, acqua','Salsa di soia 1 cucchiaio','Insalata verde mista, pomodorini'],
     steps:['Marina le fette di tempeh in soia 10 min.','Grigliare sulla piastra 3-4 min per lato.','Prepara la salsa: tahini + limone + aglio + acqua fino a cremoso.','Servi il tempeh sull\'insalata con la salsa tahini.']},
    /* ── PRE-WORKOUT EXTRA ── */
    {id:'v30_r24',name:'Rice Cake PB&J Proteico',ico:'🍓',tags:['pre-workout','spuntino','rapido'],time:'3 min',kcal:280,p:14,c:36,g:9,diff:'Facilissimo',
     desc:'Il pre-workout perfetto quando hai fretta.',
     ingredienti:['2 gallette di riso soffiato','2 cucchiai burro di arachidi naturale','1 cucchiaio marmellata di fragole senza zucchero','1/2 scoop whey vaniglia (15g)'],
     steps:['Spalma il burro di arachidi sulle gallette.','Aggiungi un cucchiaio di marmellata su ciascuna.','Spolvera con la whey (opzionale per macros).','Consuma 45-60 min prima dell\'allenamento.']},
    {id:'v30_r25',name:'Crepe Proteiche Ripiene',ico:'🥞',tags:['colazione','massa'],time:'20 min',kcal:460,p:42,c:44,g:12,diff:'Intermedio',
     desc:'4 crepe — colazione domenicale che sembra un cheat ma non lo è.',
     ingredienti:['3 albumi + 1 uovo','50g farina d\'avena','150ml latte scremato','1 scoop whey vaniglia (20g)','Ricotta 80g + miele + fragole per il ripieno'],
     steps:['Frulla uova, albumi, farina, latte e whey fino a liscio.','Cuoci ogni crepe in padella antiaderente 1.5 min per lato.','Prepara il ripieno: ricotta + miele + fragole a pezzi.','Farcisci ogni crepe e arrotola. Servi con frutta fresca.']},
  ];

  if(typeof RICETTE !== 'undefined'){
    const ids = new Set(RICETTE.map(r => r.id));
    nuove.forEach(r => { if(!ids.has(r.id)){ RICETTE.push(r); ids.add(r.id); }});
    window.RICETTE = RICETTE;
  }
})();

/* ══ PATCH startPreset / startPresetDay con warning attrezzatura ══ */
(function patchStartPreset(){
  function doWarnIfNeeded(presetId, proceedFn){
    const userEq = getUserEquipment();
    if(userEq.size === 0){ proceedFn(); return; } // eq non config → procedi

    const compat = getPresetCompatibility(presetId);
    if(compat.missing.size === 0){ proceedFn(); return; } // tutto ok

    // Mostra modal di conferma
    document.getElementById('v30-warn-modal')?.remove();
    const modal = document.createElement('div');
    modal.id = 'v30-warn-modal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:9997;background:rgba(0,0,0,0.75);display:flex;align-items:flex-end;backdrop-filter:blur(10px);';
    const preset = (typeof PRESETS_DATA !== 'undefined' ? PRESETS_DATA : []).find(p=>p.id===presetId);
    const pName = preset ? preset.name : presetId;
    const missingHtml = compat.missingLabels.map(l=>`
      <div style="display:flex;align-items:center;gap:10px;background:rgba(255,92,106,.1);border:1px solid rgba(255,92,106,.3);border-radius:10px;padding:9px 12px;">
        <span>❌</span><span style="font-size:13px;font-weight:700;color:var(--text)">${l}</span>
      </div>`).join('');
    modal.innerHTML = `
    <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;padding:22px 18px calc(28px + env(safe-area-inset-bottom));animation:slideUp .35s cubic-bezier(.22,1,.36,1) both;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
        <div style="font-size:30px">⚠️</div>
        <div>
          <div style="font-size:15px;font-weight:800;color:#FF5C6A;">Attrezzatura mancante</div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px;">${pName}</div>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text2);margin-bottom:12px;">Non hai questi attrezzi configurati nel tuo profilo:</div>
      <div style="display:flex;flex-direction:column;gap:7px;margin-bottom:14px;">${missingHtml}</div>
      <div style="font-size:11px;color:var(--text3);background:var(--bg3);border-radius:10px;padding:9px 11px;margin-bottom:16px;line-height:1.5;">
        💡 Puoi comunque iniziare, ma gli esercizi che richiedono questi attrezzi potrebbero non essere eseguibili.
      </div>
      <div style="display:flex;gap:8px;">
        <button id="v30-warn-proceed" style="flex:1.2;padding:13px;background:var(--acc);color:#080810;border:none;border-radius:14px;font-family:'Syne',sans-serif;font-size:13px;font-weight:800;cursor:pointer;">▶ Inizia comunque</button>
        <button onclick="document.getElementById('v30-warn-modal').remove();" style="flex:1;padding:13px;background:var(--bg4);color:var(--text2);border:1px solid var(--border2);border-radius:14px;font-family:'Syne',sans-serif;font-size:12px;font-weight:700;cursor:pointer;">Annulla</button>
      </div>
    </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click',e=>{ if(e.target===modal) modal.remove(); });
    document.getElementById('v30-warn-proceed').onclick = ()=>{
      modal.remove();
      proceedFn();
    };
  }

  // Patch startPreset
  function tryPatchStart(){
    if(typeof startPreset !== 'function') return false;
    if(window._v30startPresetPatched) return true;
    window._v30startPresetPatched = true;
    const _orig = startPreset;
    window.startPreset = startPreset = function(preset){
      if(!preset) return;
      doWarnIfNeeded(preset.id, ()=> _orig.call(this, preset));
    };
    return true;
  }

  // Patch startPresetDay
  function tryPatchStartDay(){
    if(typeof startPresetDay !== 'function') return false;
    if(window._v30startPresetDayPatched) return true;
    window._v30startPresetDayPatched = true;
    const _origDay = startPresetDay;
    window.startPresetDay = startPresetDay = function(presetId, dayIndex){
      doWarnIfNeeded(presetId, ()=> _origDay.call(this, presetId, dayIndex));
    };
    return true;
  }

  if(!tryPatchStart() || !tryPatchStartDay()){
    const iv = setInterval(()=>{
      const a = tryPatchStart();
      const b = tryPatchStartDay();
      if(a && b) clearInterval(iv);
    }, 300);
    setTimeout(()=>clearInterval(iv), 8000);
  }
})();

/* ══ INDICA COMPATIBILITÀ NELLA CARD PRESET (icona verde/gialla) ══ */
/* Aggiunge anche un indicator sulla lista presets nella pagina Esplora */
function applyCompatibilityBadges(){
  const userEq = getUserEquipment();
  if(userEq.size === 0) return;
  if(typeof PRESETS_DATA === 'undefined') return;

  PRESETS_DATA.forEach(preset => {
    const compat = getPresetCompatibility(preset.id);

    // Cerca card con onclick che contiene l'id del preset
    const selector = `[onclick*="${preset.id}"], [data-id="${preset.id}"]`;
    document.querySelectorAll(selector).forEach(card => {
      // Rimuovi vecchi badge
      card.querySelector('.v30-compat-badge')?.remove();
      if(compat.missing.size === 0) return; // compatibile → nessun badge

      const badge = document.createElement('div');
      badge.className = 'v30-compat-badge';
      const n = compat.missingLabels.length;
      badge.style.cssText = `
        display:block;width:100%;margin-top:8px;
        background:rgba(255,92,106,0.12);
        border:1px solid rgba(255,92,106,0.35);
        border-radius:8px;padding:5px 10px;
        font-size:10px;font-weight:800;
        color:#FF5C6A;
        cursor:pointer;text-align:center;
        box-sizing:border-box;
      `;
      badge.textContent = `⚠️ ${n} attrezzo${n>1?'i':''} mancante${n>1?'i':''}`;
      badge.title = 'Mancante: ' + compat.missingLabels.join(', ');
      badge.onclick = e=>{
        e.stopPropagation();
        showMissingEquipmentAlert(preset.name, compat.missingLabels);
      };
      // NON position:absolute — appende DOPO il contenuto della card
      card.style.position = '';  // rimuovi position:relative
      card.appendChild(badge);
    });
  });
}

/* ══ INIT ═════════════════════════════════════════════════════ */
(function v30Init(){
  function run(){
    applyCompatibilityBadges();
      }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ()=>setTimeout(run,800));
  else setTimeout(run, 800);
})();

})(); // end v30Patch

(function v31Patch(){

/* ── 1. GLOBAL SAFETY NET ─────────────────────────────── */
// Espone tutto come window.* in modo sicuro
window.EX_GUIDES    = typeof EX_GUIDES    !== 'undefined' ? EX_GUIDES    : {};
window.RICETTE      = typeof RICETTE      !== 'undefined' ? RICETTE      : [];
window.RICETTE_CATS = typeof RICETTE_CATS !== 'undefined' ? RICETTE_CATS : [];

// qs universale — sempre disponibile ovunque
if(typeof window.qs !== 'function'){
  window.qs = function(id){ return document.getElementById(id); };
}

// [confirmReset deduplicata — usa la definizione consolidata sopra];

/* ── 3. EXPORT DATA FIX ──────────────────────────────── */
window.exportData = function(){
  try{
    const data = {
      profile: typeof profile!=='undefined'?profile:{},
      sessions: typeof sessions!=='undefined'?sessions:[],
      nutrition: typeof nutrition!=='undefined'?nutrition:{},
      metrics: typeof metrics!=='undefined'?metrics:{},
      pbs: typeof pbs!=='undefined'?pbs:{},
      exportedAt: new Date().toISOString(),
      version: 'FitTrack-V31'
    };
    const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `fittrack_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if(typeof showToast==='function') showToast('📤 Backup esportato!');
  }catch(err){
    if(typeof showToast==='function') showToast('❌ Errore esportazione: '+err.message);
  }
};

/* ── 4. IMPORT DATA FIX ──────────────────────────────── */
window.importData = function(){
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = async function(e){
    try{
      const text = await e.target.files[0].text();
      const data = JSON.parse(text);
      if(!data.profile){ if(typeof showToast==='function') showToast('❌ File non valido'); return; }
      document.getElementById('v31-import-modal')?.remove();
      const modal = document.createElement('div');
      modal.id = 'v31-import-modal';
      modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(12px);padding:20px;box-sizing:border-box;';
      modal.innerHTML = `
      <div style="background:var(--bg2);border:1px solid var(--border2);border-radius:24px;width:100%;max-width:360px;padding:28px 22px;text-align:center;">
        <div style="font-size:36px;margin-bottom:12px;">📥</div>
        <div style="font-size:17px;font-weight:800;color:var(--text);margin-bottom:8px;">Importa backup</div>
        <div style="font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:20px;">
          Backup del <strong>${new Date(data.exportedAt||Date.now()).toLocaleDateString('it')}</strong><br>
          Tutti i dati attuali verranno <strong style="color:var(--red)">sovrascritti</strong>.
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          <button id="v31-import-confirm" style="padding:14px;background:var(--acc);color:#080810;border:none;border-radius:14px;font-family:'Syne',sans-serif;font-size:14px;font-weight:800;cursor:pointer;">
            ✅ Importa ora
          </button>
          <button onclick="document.getElementById('v31-import-modal').remove();" style="padding:14px;background:var(--bg4);color:var(--text2);border:1px solid var(--border2);border-radius:14px;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;cursor:pointer;">
            Annulla
          </button>
        </div>
      </div>`;
      document.body.appendChild(modal);
      modal.addEventListener('click', e=>{ if(e.target===modal) modal.remove(); });
      document.getElementById('v31-import-confirm').onclick = async function(){
        modal.remove();
        if(data.profile)   window.profile   = data.profile;
        if(data.sessions)  window.sessions  = data.sessions;
        if(data.nutrition) window.nutrition = data.nutrition;
        if(data.metrics)   window.metrics   = data.metrics;
        if(data.pbs)       window.pbs       = data.pbs;
        if(typeof saveAll==='function') await saveAll();
        if(typeof showToast==='function') showToast('✅ Dati importati!');
        setTimeout(()=>location.reload(),900);
      };
    }catch(err){
      if(typeof showToast==='function') showToast('❌ Errore: '+err.message);
    }
  };
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
};

/* ── 5. GUIDA BUTTON FIX ──────────────────────────────── */
// openExDetailInWorkout potrebbe fallire se openSub non è ancora montato
window.openExDetailInWorkout = function(exId){
  if(!exId) return;
  const ex = typeof EX_DB!=='undefined' ? EX_DB.find(e=>e.id===exId) : null;
  if(!ex){
    if(typeof showToast==='function') showToast('⚠️ Esercizio non trovato');
    return;
  }
  const guide = (typeof EX_GUIDES!=='undefined'&&EX_GUIDES[exId]) || {
    difficulty:'Intermedio',
    objective:'Migliorare performance globale',
    desc:'Esercizio utile per sviluppare forza e coordinazione nel pattern specifico.',
    steps:['Imposta una posizione stabile.','Esegui il movimento in controllo su tutto il ROM.','Mantieni ritmo costante e postura neutra.'],
    tip:'Qualità prima della quantità: interrompi la serie se perdi tecnica.'
  };
  // Prova prima openExDetail nativo, poi fallback modal
  if(typeof openExDetail==='function'){
    try{ openExDetail(exId); return; }catch(e){}
  }
  // Fallback: modal inline
  document.getElementById('v31-guide-modal')?.remove();
  const tc = (typeof TC!=='undefined'&&TC[ex.m])||{bg:'var(--bg4)',c:'var(--acc)'};
  const modal = document.createElement('div');
  modal.id = 'v31-guide-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:9995;background:rgba(0,0,0,0.8);display:flex;align-items:flex-end;backdrop-filter:blur(10px);';
  modal.innerHTML = `
  <div style="background:var(--bg2);border-top:1px solid var(--border2);border-radius:24px 24px 0 0;width:100%;padding:24px 20px calc(36px + env(safe-area-inset-bottom));max-height:85vh;overflow-y:auto;animation:slideUp .35s cubic-bezier(.22,1,.36,1) both;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <div style="font-size:16px;font-weight:800">${ex.icon||'💪'} ${ex.name}</div>
      <button onclick="document.getElementById('v31-guide-modal').remove()" style="background:var(--bg4);border:none;border-radius:50%;width:32px;height:32px;color:var(--text2);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">×</button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
      <span style="background:${tc.bg};color:${tc.c};border-radius:99px;padding:3px 10px;font-size:11px;font-weight:700;">${ex.m||'custom'}</span>
      <span style="background:var(--bg4);color:var(--text2);border-radius:99px;padding:3px 10px;font-size:11px;font-weight:700;">📊 ${guide.difficulty}</span>
      ${(ex.tags||[]).slice(0,3).map(t=>`<span style="background:var(--bg3);color:var(--text2);border-radius:99px;padding:3px 10px;font-size:11px;">${t}</span>`).join('')}
    </div>
    <div style="font-size:13px;color:var(--text2);line-height:1.7;margin-bottom:16px;">${guide.desc}</div>
    <div style="font-weight:800;font-size:12px;color:var(--text3);margin-bottom:10px;letter-spacing:.08em;">ESECUZIONE</div>
    ${guide.steps.map((s,i)=>`
      <div style="display:flex;gap:12px;margin-bottom:10px;background:var(--bg3);border-radius:12px;padding:12px;">
        <div style="min-width:24px;height:24px;background:var(--acc);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#080810;">${i+1}</div>
        <div style="font-size:13px;color:var(--text);line-height:1.6;">${s}</div>
      </div>`).join('')}
    ${guide.tip?`<div style="background:rgba(var(--acc-rgb,163,230,53),0.08);border:1px solid rgba(163,230,53,.2);border-radius:12px;padding:12px 14px;margin-top:8px;">
      <div style="font-size:11px;font-weight:800;color:var(--acc);margin-bottom:4px;">🎯 CONSIGLIO</div>
      <div style="font-size:12px;color:var(--text2);line-height:1.6;">${guide.tip}</div>
    </div>`:''}
  </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.remove(); });
};

/* ── 6. NUOVI PRESET V31 (+20) ────────────────────────── */
(function addPresetsV31(){
  const extra=[
    /* ── PRINCIPIANTI ASSOLUTI ── */
    {id:'v31_absolute_beg',name:'Assoluto Principiante',icon:'🌱',color:'var(--green)',
     t:'full',diff:'beginner',dur:'25',goals:['hypertrophy','fat_loss'],levels:['beginner'],
     desc:'Il primo programma della tua vita. Zero presupposti, massima sicurezza. 3 giorni alternati di movimento base.',
     days:[
       {name:'Giorno 1',type:'full',rest:false,exercises:[
         {id:'push-up',s:'3',r:'8',rs:'90s'},{id:'ct-squat',s:'3',r:'15',rs:'75s'},
         {id:'plank',s:'3',r:'20s',rs:'60s'},{id:'glute-b',s:'3',r:'15',rs:'45s'}
       ]},
       {name:'Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Giorno 2',type:'full',rest:false,exercises:[
         {id:'push-up',s:'3',r:'10',rs:'90s'},{id:'ct-lunge',s:'3',r:'10',rs:'75s'},
         {id:'hollow',s:'3',r:'20s',rs:'60s'},{id:'hi-kn',s:'3',r:'30s',rs:'60s'}
       ]},
       {name:'Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Giorno 3',type:'full',rest:false,exercises:[
         {id:'ct-wall',s:'3',r:'45s',rs:'60s'},{id:'glute-b',s:'4',r:'20',rs:'45s'},
         {id:'plank',s:'3',r:'30s',rs:'45s'},{id:'push-up',s:'3',r:'12',rs:'75s'}
       ]},
     ]},
    /* ── 3 GIORNI MASSA SEMPLICE (palestra base) ── */
    {id:'v31_3day_mass',name:'3 Giorni Massa — Palestra',icon:'💪',color:'var(--orange)',
     t:'full',diff:'beginner',dur:'55',goals:['hypertrophy'],levels:['beginner','intermediate'],
     desc:'Tre giorni Full Body in palestra. Fondamentali + accessori. Perfetto per chi inizia con i pesi.',
     days:[
       {name:'Lunedì — FB A',type:'push',rest:false,exercises:[
         {id:'bench',s:'4',r:'10',rs:'120s'},{id:'back-squat',s:'4',r:'10',rs:'120s'},
         {id:'pull-up',s:'3',r:'8',rs:'90s'},{id:'ohp',s:'3',r:'10',rs:'90s'},
         {id:'calf',s:'3',r:'15',rs:'60s'}
       ]},
       {name:'Martedì — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Mercoledì — FB B',type:'pull',rest:false,exercises:[
         {id:'deadlift',s:'4',r:'6',rs:'180s'},{id:'incl-bench',s:'3',r:'10',rs:'90s'},
         {id:'barbell-row',s:'4',r:'8',rs:'120s'},{id:'lateral-r',s:'3',r:'15',rs:'60s'},
         {id:'glute-b',s:'4',r:'20',rs:'45s'}
       ]},
       {name:'Giovedì — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Venerdì — FB C',type:'full',rest:false,exercises:[
         {id:'back-squat',s:'4',r:'8',rs:'120s'},{id:'bench',s:'3',r:'12',rs:'90s'},
         {id:'chin-up',s:'3',r:'max',rs:'90s'},{id:'v29_rdl',s:'3',r:'10',rs:'90s'},
         {id:'hammer-c',s:'3',r:'12',rs:'60s'}
       ]},
     ]},
    /* ── DONNA SCULTURA (focus glutei + tono) ── */
    {id:'v31_donna_scultura',name:'Scultura Donna — Glutei & Tono',icon:'🍑',color:'var(--purple)',
     t:'full',diff:'beginner',dur:'45',goals:['fat_loss','hypertrophy'],levels:['beginner','intermediate'],
     desc:'Programma specifico per il corpo femminile: enfasi su glutei, cosce e addome. Nessuna attrezzatura pesante necessaria.',
     days:[
       {name:'Lun — Glutei',type:'lower',rest:false,exercises:[
         {id:'glute-b',s:'5',r:'20',rs:'45s'},{id:'bss',s:'4',r:'12',rs:'75s'},
         {id:'ct-lunge',s:'4',r:'15',rs:'60s'},{id:'v29_kb_swing',s:'4',r:'20',rs:'60s'},
         {id:'side-plank',s:'3',r:'30s',rs:'30s'}
       ]},
       {name:'Mar — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Mer — Upper + Core',type:'push',rest:false,exercises:[
         {id:'push-up',s:'4',r:'12',rs:'75s'},{id:'pull-up',s:'4',r:'6',rs:'90s'},
         {id:'lateral-r',s:'3',r:'15',rs:'60s'},{id:'plank',s:'4',r:'45s',rs:'30s'},
         {id:'hollow',s:'3',r:'30s',rs:'30s'}
       ]},
       {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Ven — Gambe & Cardio',type:'lower',rest:false,exercises:[
         {id:'ct-squat',s:'4',r:'20',rs:'60s'},{id:'v29_box_jump',s:'4',r:'10',rs:'60s'},
         {id:'glute-b',s:'4',r:'25',rs:'30s'},{id:'burpees',s:'3',r:'10',rs:'60s'},
         {id:'hi-kn',s:'4',r:'40s',rs:'20s'}
       ]},
       {name:'Sab — Riposo',type:'rest',rest:true,exercises:[]},
     ]},
    /* ── LEAN GAINS (definizione + massa) ── */
    {id:'v31_lean_gains',name:'Lean Gains — Ricomposizione',icon:'⚗️',color:'var(--teal)',
     t:'full',diff:'intermediate',dur:'60',goals:['hypertrophy','fat_loss'],levels:['intermediate','advanced'],
     desc:'L\'approccio scientifico alla ricomposizione corporea. Deficit calorico moderato + alto volume. Perdi grasso, mantieni o guadagni muscolo.',
     days:[
       {name:'Lun — Push',type:'push',rest:false,exercises:[
         {id:'bench',s:'4',r:'8',rs:'120s'},{id:'incl-bench',s:'4',r:'10',rs:'90s'},
         {id:'ohp',s:'3',r:'10',rs:'90s'},{id:'lateral-r',s:'4',r:'15',rs:'60s'},
         {id:'dips',s:'3',r:'12',rs:'75s'}
       ]},
       {name:'Mar — Pull',type:'pull',rest:false,exercises:[
         {id:'pull-up',s:'4',r:'8',rs:'120s'},{id:'barbell-row',s:'4',r:'8',rs:'120s'},
         {id:'v29_cable_row',s:'3',r:'12',rs:'75s'},{id:'hammer-c',s:'3',r:'12',rs:'60s'},
         {id:'face-pull',s:'3',r:'15',rs:'45s'}
       ]},
       {name:'Mer — Lower',type:'lower',rest:false,exercises:[
         {id:'back-squat',s:'4',r:'8',rs:'150s'},{id:'v29_rdl',s:'4',r:'10',rs:'120s'},
         {id:'bss',s:'3',r:'10',rs:'90s'},{id:'v29_leg_curl',s:'3',r:'12',rs:'75s'},
         {id:'calf',s:'4',r:'20',rs:'45s'}
       ]},
       {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Ven — Push (vol.)',type:'push',rest:false,exercises:[
         {id:'incl-bench',s:'4',r:'12',rs:'90s'},{id:'ohp',s:'4',r:'12',rs:'90s'},
         {id:'lateral-r',s:'5',r:'15',rs:'45s'},{id:'face-pull',s:'4',r:'15',rs:'45s'},
         {id:'dips',s:'3',r:'15',rs:'75s'}
       ]},
       {name:'Sab — Pull + Lower (vol.)',type:'full',rest:false,exercises:[
         {id:'pull-up',s:'4',r:'12',rs:'90s'},{id:'v29_lat_pull',s:'3',r:'15',rs:'75s'},
         {id:'v29_leg_press',s:'4',r:'15',rs:'90s'},{id:'v29_leg_ext',s:'3',r:'20',rs:'60s'},
         {id:'glute-b',s:'4',r:'20',rs:'45s'}
       ]},
     ]},
    /* ── GREASE THE GROOVE (frequenza alta, bassi volume) ── */
    {id:'v31_gtg',name:'Grease the Groove',icon:'🔁',color:'var(--blue)',
     t:'calisthenics',diff:'intermediate',dur:'15',goals:['strength','calisthenics'],levels:['intermediate','advanced'],
     desc:'Metodo Pavlov: esegui esercizi al 50% del massimale, molte volte al giorno. Costruisce forza neurali senza affaticamento.',
     days:[
       {name:'Giorno 1 (× 5 volte/giorno)',type:'full',rest:false,exercises:[
         {id:'pull-up',s:'1',r:'50%max',rs:'0s'},{id:'dips',s:'1',r:'50%max',rs:'0s'},
         {id:'push-up',s:'1',r:'50%max',rs:'0s'}
       ]},
       {name:'Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Giorno 3 (× 5 volte/giorno)',type:'full',rest:false,exercises:[
         {id:'pull-up',s:'1',r:'50%max',rs:'0s'},{id:'chin-up',s:'1',r:'50%max',rs:'0s'},
         {id:'push-up',s:'1',r:'50%max',rs:'0s'}
       ]},
       {name:'Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Giorno 5 (× 5 volte/giorno)',type:'full',rest:false,exercises:[
         {id:'pull-up-w',s:'1',r:'50%max',rs:'0s'},{id:'dips-w',s:'1',r:'50%max',rs:'0s'},
         {id:'archer-pu',s:'1',r:'50%max',rs:'0s'}
       ]},
     ]},
    /* ── PUSH/PULL/LEGS/CORE 4 GIORNI ── */
    {id:'v31_pplc',name:'PPL + Core — 4 giorni',icon:'🔀',color:'var(--orange)',
     t:'full',diff:'intermediate',dur:'60',goals:['hypertrophy','strength'],levels:['intermediate','advanced'],
     desc:'Variante del classico PPL con giorno dedicato al core. Volume ottimale distribuito su 4 sessioni.',
     days:[
       {name:'Lun — Push',type:'push',rest:false,exercises:[
         {id:'bench',s:'4',r:'8',rs:'120s'},{id:'incl-bench',s:'3',r:'10',rs:'90s'},
         {id:'ohp',s:'4',r:'8',rs:'120s'},{id:'lateral-r',s:'4',r:'15',rs:'60s'},
         {id:'face-pull',s:'3',r:'15',rs:'45s'}
       ]},
       {name:'Mar — Pull',type:'pull',rest:false,exercises:[
         {id:'pull-up',s:'4',r:'8',rs:'120s'},{id:'barbell-row',s:'4',r:'8',rs:'120s'},
         {id:'v29_cable_row',s:'3',r:'12',rs:'75s'},{id:'hammer-c',s:'4',r:'12',rs:'60s'},
         {id:'v29_rdl',s:'3',r:'10',rs:'90s'}
       ]},
       {name:'Gio — Legs',type:'lower',rest:false,exercises:[
         {id:'back-squat',s:'5',r:'5',rs:'180s'},{id:'v29_leg_press',s:'4',r:'12',rs:'90s'},
         {id:'v29_leg_curl',s:'4',r:'12',rs:'75s'},{id:'bss',s:'3',r:'10',rs:'90s'},
         {id:'calf',s:'5',r:'20',rs:'45s'}
       ]},
       {name:'Ven — Core + Accesso.',type:'full',rest:false,exercises:[
         {id:'plank',s:'4',r:'60s',rs:'30s'},{id:'hollow',s:'4',r:'45s',rs:'30s'},
         {id:'lsit',s:'4',r:'15s',rs:'60s'},{id:'v29_ab_wheel',s:'3',r:'12',rs:'60s'},
         {id:'v29_pallof',s:'3',r:'12',rs:'60s'}
       ]},
     ]},
    /* ── WENDLER 5/3/1 SEMPLIFICATO ── */
    {id:'v31_531',name:'Wendler 5/3/1 — Forza Base',icon:'📐',color:'var(--red)',
     t:'full',diff:'advanced',dur:'60',goals:['strength'],levels:['intermediate','advanced'],
     desc:'Il programma di forza a lungo termine più usato al mondo. Progressioni mensili sui 4 fondamentali. Semplicità + efficacia.',
     days:[
       {name:'Lun — Squat Day',type:'lower',rest:false,exercises:[
         {id:'back-squat',s:'3',r:'5/3/1',rs:'300s'},{id:'v29_leg_press',s:'5',r:'10',rs:'90s'},
         {id:'v29_leg_curl',s:'5',r:'10',rs:'75s'},{id:'calf',s:'5',r:'15',rs:'60s'}
       ]},
       {name:'Mar — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Mer — OHP Day',type:'push',rest:false,exercises:[
         {id:'ohp',s:'3',r:'5/3/1',rs:'240s'},{id:'chin-up',s:'5',r:'max',rs:'90s'},
         {id:'barbell-row',s:'5',r:'10',rs:'90s'},{id:'face-pull',s:'4',r:'15',rs:'45s'}
       ]},
       {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Ven — Deadlift Day',type:'pull',rest:false,exercises:[
         {id:'deadlift',s:'3',r:'5/3/1',rs:'360s'},{id:'v29_rdl',s:'5',r:'10',rs:'90s'},
         {id:'glute-b',s:'4',r:'20',rs:'45s'},{id:'plank',s:'4',r:'60s',rs:'30s'}
       ]},
       {name:'Sab — Bench Day',type:'push',rest:false,exercises:[
         {id:'bench',s:'3',r:'5/3/1',rs:'300s'},{id:'incl-bench',s:'5',r:'10',rs:'90s'},
         {id:'dips',s:'5',r:'12',rs:'75s'},{id:'lateral-r',s:'5',r:'15',rs:'45s'}
       ]},
     ]},
    /* ── IPERTROFIA AVANZATA 6 GIORNI (PHAT-style) ── */
    {id:'v31_phat',name:'PHAT — Potenza + Ipertrofia',icon:'🧬',color:'var(--purple)',
     t:'full',diff:'advanced',dur:'75',goals:['strength','hypertrophy'],levels:['advanced','athlete'],
     desc:'Power Hypertrophy Adaptive Training: 2 giorni di potenza pura + 4 giorni di ipertrofia. Il programma di Layne Norton.',
     days:[
       {name:'Lun — Potenza Upper',type:'push',rest:false,exercises:[
         {id:'bench',s:'3',r:'3',rs:'300s'},{id:'pull-up-w',s:'3',r:'3',rs:'300s'},
         {id:'ohp',s:'3',r:'6',rs:'240s'},{id:'barbell-row',s:'3',r:'6',rs:'240s'},
         {id:'hammer-c',s:'2',r:'6',rs:'120s'}
       ]},
       {name:'Mar — Potenza Lower',type:'lower',rest:false,exercises:[
         {id:'back-squat',s:'3',r:'3',rs:'360s'},{id:'deadlift',s:'3',r:'3',rs:'360s'},
         {id:'v29_leg_press',s:'2',r:'8',rs:'180s'},{id:'nordic',s:'2',r:'5',rs:'180s'}
       ]},
       {name:'Mer — Riposo Attivo',type:'rest',rest:true,exercises:[]},
       {name:'Gio — Ipertrofia Upper (Push)',type:'push',rest:false,exercises:[
         {id:'incl-bench',s:'4',r:'10',rs:'90s'},{id:'v29_chest_press',s:'3',r:'12',rs:'75s'},
         {id:'ohp',s:'4',r:'12',rs:'90s'},{id:'lateral-r',s:'5',r:'15',rs:'45s'},
         {id:'face-pull',s:'4',r:'20',rs:'45s'}
       ]},
       {name:'Ven — Ipertrofia Upper (Pull)',type:'pull',rest:false,exercises:[
         {id:'pull-up',s:'4',r:'10',rs:'90s'},{id:'v29_lat_pull',s:'3',r:'12',rs:'75s'},
         {id:'v29_cable_row',s:'4',r:'12',rs:'75s'},{id:'hammer-c',s:'4',r:'15',rs:'60s'},
         {id:'face-pull',s:'3',r:'20',rs:'45s'}
       ]},
       {name:'Sab — Ipertrofia Lower',type:'lower',rest:false,exercises:[
         {id:'v29_hack_squat',s:'4',r:'10',rs:'90s'},{id:'v29_leg_press',s:'4',r:'15',rs:'90s'},
         {id:'v29_leg_curl',s:'4',r:'12',rs:'75s'},{id:'v29_leg_ext',s:'4',r:'15',rs:'60s'},
         {id:'calf',s:'5',r:'20',rs:'45s'},{id:'glute-b',s:'4',r:'20',rs:'45s'}
       ]},
     ]},
    /* ── CARDIO FUNCTIONAL TRAINING ── */
    {id:'v31_functional',name:'Functional Training — HIIT',icon:'🌀',color:'var(--teal)',
     t:'full',diff:'intermediate',dur:'40',goals:['fat_loss','endurance'],levels:['beginner','intermediate'],
     desc:'Movimento funzionale + cardio ad alta intensità. Brucia grasso, migliora coordinazione e resistenza globale.',
     days:[
       {name:'Giorno 1 — Circuito A',type:'cardio',rest:false,exercises:[
         {id:'burpees',s:'4',r:'45s',rs:'15s'},{id:'v29_kb_swing',s:'4',r:'20',rs:'30s'},
         {id:'v29_box_jump',s:'3',r:'10',rs:'45s'},{id:'mt-cl',s:'4',r:'40s',rs:'20s'},
         {id:'plank',s:'3',r:'60s',rs:'15s'}
       ]},
       {name:'Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Giorno 3 — Circuito B',type:'cardio',rest:false,exercises:[
         {id:'squat-j',s:'4',r:'30s',rs:'30s'},{id:'push-up',s:'4',r:'20',rs:'30s'},
         {id:'hi-kn',s:'4',r:'45s',rs:'15s'},{id:'v29_battle_rope',s:'3',r:'30s',rs:'30s'},
         {id:'v29_jump_rope',s:'4',r:'60s',rs:'30s'}
       ]},
       {name:'Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Giorno 5 — Full Circuit',type:'full',rest:false,exercises:[
         {id:'burpees',s:'3',r:'60s',rs:'30s'},{id:'v29_kb_swing',s:'3',r:'30',rs:'30s'},
         {id:'pull-up',s:'3',r:'max',rs:'60s'},{id:'squat-j',s:'3',r:'30s',rs:'30s'},
         {id:'mt-cl',s:'3',r:'45s',rs:'15s'}
       ]},
     ]},
    /* ── TRIATHLON / ENDURANCE ATHLETE ── */
    {id:'v31_endurance',name:'Endurance Athlete — Resistenza',icon:'🏃',color:'var(--blue)',
     t:'custom',diff:'intermediate',dur:'50',goals:['endurance'],levels:['intermediate','advanced'],
     desc:'Programma per atleti di resistenza: rinforzo muscolare specifico per runner, ciclisti e nuotatori.',
     days:[
       {name:'Lun — Lower Rinforzo',type:'lower',rest:false,exercises:[
         {id:'back-squat',s:'3',r:'12',rs:'90s'},{id:'v29_rdl',s:'3',r:'12',rs:'90s'},
         {id:'bss',s:'3',r:'10',rs:'90s'},{id:'nordic',s:'3',r:'6',rs:'120s'},
         {id:'calf',s:'4',r:'20',rs:'45s'},{id:'v29_pallof',s:'3',r:'12',rs:'60s'}
       ]},
       {name:'Mar — Riposo / Cardio',type:'rest',rest:true,exercises:[]},
       {name:'Mer — Upper + Core',type:'push',rest:false,exercises:[
         {id:'push-up',s:'4',r:'15',rs:'60s'},{id:'pull-up',s:'4',r:'10',rs:'90s'},
         {id:'ohp',s:'3',r:'12',rs:'90s'},{id:'plank',s:'4',r:'60s',rs:'30s'},
         {id:'hollow',s:'4',r:'45s',rs:'30s'},{id:'v29_ab_wheel',s:'3',r:'10',rs:'60s'}
       ]},
       {name:'Gio — Riposo / Cardio',type:'rest',rest:true,exercises:[]},
       {name:'Sab — Full + Esplosività',type:'full',rest:false,exercises:[
         {id:'v29_box_jump',s:'4',r:'8',rs:'90s'},{id:'v29_broad_jump',s:'3',r:'5',rs:'90s'},
         {id:'deadlift',s:'3',r:'8',rs:'120s'},{id:'v29_farmers',s:'3',r:'30m',rs:'90s'},
         {id:'burpees',s:'3',r:'15',rs:'60s'}
       ]},
     ]},
    /* ── CORPO LIBERO INTERMEDIO ── */
    {id:'v31_bw_inter',name:'Corpo Libero Intermedio',icon:'🐅',color:'var(--orange)',
     t:'calisthenics',diff:'intermediate',dur:'45',goals:['hypertrophy','calisthenics'],levels:['intermediate'],
     desc:'Il gap tra principiante e avanzato nel calisthenics. Progressioni reali verso muscle-up e front lever.',
     days:[
       {name:'Lun — Push Progressivo',type:'push',rest:false,exercises:[
         {id:'dips',s:'5',r:'10',rs:'90s'},{id:'pike-pu',s:'4',r:'12',rs:'90s'},
         {id:'archer-pu',s:'4',r:'8',rs:'90s'},{id:'tuck-p',s:'4',r:'15s',rs:'90s'},
         {id:'push-up',s:'3',r:'20',rs:'60s'}
       ]},
       {name:'Mar — Pull Progressivo',type:'pull',rest:false,exercises:[
         {id:'pull-up',s:'5',r:'8',rs:'120s'},{id:'chin-up',s:'4',r:'10',rs:'90s'},
         {id:'neg-mu',s:'4',r:'5',rs:'120s'},{id:'v29_back_lever',s:'4',r:'8s',rs:'90s'},
         {id:'v29_toes_bar',s:'3',r:'10',rs:'60s'}
       ]},
       {name:'Mer — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Gio — Lower + Core',type:'lower',rest:false,exercises:[
         {id:'pistol',s:'5',r:'5',rs:'120s'},{id:'nordic',s:'4',r:'6',rs:'120s'},
         {id:'v29_box_jump',s:'3',r:'8',rs:'90s'},{id:'lsit',s:'4',r:'20s',rs:'75s'},
         {id:'hollow',s:'4',r:'45s',rs:'30s'}
       ]},
       {name:'Sab — Skill + Full',type:'skill',rest:false,exercises:[
         {id:'mu',s:'5',r:'max',rs:'180s'},{id:'v29_front_lever',s:'4',r:'10s',rs:'90s'},
         {id:'tuck-p',s:'4',r:'20s',rs:'90s'},{id:'v29_ring_dips',s:'3',r:'8',rs:'90s'},
         {id:'v29_ring_row',s:'3',r:'10',rs:'75s'}
       ]},
     ]},
    /* ── MASSA ANZIANI / OVER 40 ── */
    {id:'v31_over40',name:'Over 40 — Forza Sana',icon:'🎯',color:'var(--green)',
     t:'full',diff:'beginner',dur:'50',goals:['hypertrophy','strength'],levels:['beginner','intermediate'],
     desc:'Programma specifico per chi ha più di 40 anni. Recupero lungo, carichi moderati, mobilità integrata. Senza dolori, con risultati.',
     days:[
       {name:'Lun — Upper',type:'push',rest:false,exercises:[
         {id:'bench',s:'3',r:'10',rs:'120s'},{id:'pull-up',s:'3',r:'8',rs:'120s'},
         {id:'ohp',s:'3',r:'10',rs:'90s'},{id:'v29_band_pull',s:'3',r:'15',rs:'60s'},
         {id:'face-pull',s:'4',r:'15',rs:'45s'}
       ]},
       {name:'Mar — Riposo Attivo',type:'rest',rest:true,exercises:[]},
       {name:'Mer — Lower',type:'lower',rest:false,exercises:[
         {id:'back-squat',s:'3',r:'10',rs:'150s'},{id:'v29_rdl',s:'3',r:'10',rs:'120s'},
         {id:'v29_leg_press',s:'3',r:'12',rs:'90s'},{id:'calf',s:'4',r:'20',rs:'45s'},
         {id:'glute-b',s:'3',r:'20',rs:'45s'}
       ]},
       {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Sab — Full + Mobilità',type:'full',rest:false,exercises:[
         {id:'deadlift',s:'3',r:'8',rs:'150s'},{id:'barbell-row',s:'3',r:'10',rs:'90s'},
         {id:'v29_kb_tgu',s:'3',r:'4',rs:'120s'},{id:'plank',s:'3',r:'60s',rs:'30s'},
         {id:'v29_kb_windmill',s:'3',r:'8',rs:'60s'}
       ]},
     ]},
    /* ── SPORT SPECIFICO — CALCIO/BASKET ── */
    {id:'v31_sport_team',name:'Sport di Squadra — Potenza',icon:'⚽',color:'var(--blue)',
     t:'full',diff:'intermediate',dur:'55',goals:['strength','endurance'],levels:['intermediate','advanced'],
     desc:'Programma per calciatori, baskettari, tennisti. Potenza esplosiva, agilità e resistenza anaerobica specifica.',
     days:[
       {name:'Lun — Esplosività',type:'lower',rest:false,exercises:[
         {id:'back-squat',s:'4',r:'5',rs:'180s'},{id:'v29_box_jump',s:'4',r:'8',rs:'90s'},
         {id:'v29_broad_jump',s:'3',r:'5',rs:'90s'},{id:'v29_sprint_sl',s:'6',r:'20m',rs:'60s'},
         {id:'calf',s:'3',r:'20',rs:'45s'}
       ]},
       {name:'Mar — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Mer — Upper Potenza',type:'push',rest:false,exercises:[
         {id:'bench',s:'4',r:'5',rs:'180s'},{id:'v29_push_press',s:'4',r:'5',rs:'180s'},
         {id:'pull-up',s:'4',r:'8',rs:'120s'},{id:'barbell-row',s:'3',r:'8',rs:'120s'},
         {id:'v29_kb_swing',s:'4',r:'15',rs:'60s'}
       ]},
       {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Sab — Resistenza Anaerobica',type:'cardio',rest:false,exercises:[
         {id:'burpees',s:'5',r:'45s',rs:'15s'},{id:'squat-j',s:'5',r:'30s',rs:'30s'},
         {id:'v29_battle_rope',s:'4',r:'30s',rs:'30s'},{id:'v29_jump_rope',s:'4',r:'2min',rs:'60s'},
         {id:'mt-cl',s:'5',r:'40s',rs:'20s'}
       ]},
     ]},
    /* ── MINIMALISTA 2 GIORNI / SETTIMANA ── */
    {id:'v31_mini2',name:'Minimalista — 2 Giorni/Sett.',icon:'⚡',color:'var(--acc)',
     t:'full',diff:'beginner',dur:'35',goals:['hypertrophy','fat_loss'],levels:['beginner'],
     desc:'Per chi ha pochissimo tempo. Due sessioni Full Body a settimana: semplici, complete, efficaci.',
     days:[
       {name:'Sessione A',type:'full',rest:false,exercises:[
         {id:'push-up',s:'4',r:'15',rs:'75s'},{id:'pull-up',s:'4',r:'max',rs:'90s'},
         {id:'ct-squat',s:'4',r:'20',rs:'75s'},{id:'plank',s:'3',r:'60s',rs:'30s'},
         {id:'glute-b',s:'4',r:'20',rs:'30s'}
       ]},
       {name:'Sessione B',type:'full',rest:false,exercises:[
         {id:'dips',s:'4',r:'12',rs:'90s'},{id:'chin-up',s:'4',r:'max',rs:'90s'},
         {id:'bss',s:'4',r:'10',rs:'90s'},{id:'hollow',s:'3',r:'45s',rs:'30s'},
         {id:'burpees',s:'3',r:'10',rs:'60s'}
       ]},
     ]},
    /* ── MASSA 5 GIORNI BRO SPLIT ── */
    {id:'v31_bro_split',name:'Bro Split — 5 Giorni',icon:'🦁',color:'var(--red)',
     t:'full',diff:'intermediate',dur:'55',goals:['hypertrophy'],levels:['intermediate','advanced'],
     desc:'Il classico bodybuilder split: un muscolo al giorno, volume altissimo, pump garantito. Funziona, anche se non è ottimale.',
     days:[
       {name:'Lun — Petto',type:'push',rest:false,exercises:[
         {id:'bench',s:'5',r:'10',rs:'90s'},{id:'incl-bench',s:'4',r:'12',rs:'90s'},
         {id:'v29_chest_press',s:'4',r:'12',rs:'75s'},{id:'dips',s:'4',r:'12',rs:'75s'},
         {id:'face-pull',s:'3',r:'15',rs:'45s'}
       ]},
       {name:'Mar — Dorsali',type:'pull',rest:false,exercises:[
         {id:'deadlift',s:'4',r:'6',rs:'180s'},{id:'barbell-row',s:'4',r:'10',rs:'120s'},
         {id:'pull-up',s:'4',r:'10',rs:'90s'},{id:'v29_cable_row',s:'4',r:'12',rs:'75s'},
         {id:'v29_lat_pull',s:'3',r:'15',rs:'75s'}
       ]},
       {name:'Mer — Spalle',type:'push',rest:false,exercises:[
         {id:'ohp',s:'5',r:'10',rs:'120s'},{id:'lateral-r',s:'5',r:'15',rs:'60s'},
         {id:'v29_shoulder_m',s:'4',r:'12',rs:'75s'},{id:'face-pull',s:'4',r:'15',rs:'45s'},
         {id:'v29_band_pull',s:'4',r:'20',rs:'30s'}
       ]},
       {name:'Gio — Gambe',type:'lower',rest:false,exercises:[
         {id:'back-squat',s:'5',r:'8',rs:'150s'},{id:'v29_leg_press',s:'4',r:'12',rs:'90s'},
         {id:'v29_leg_ext',s:'4',r:'15',rs:'60s'},{id:'v29_leg_curl',s:'4',r:'12',rs:'75s'},
         {id:'calf',s:'5',r:'20',rs:'45s'}
       ]},
       {name:'Ven — Braccia',type:'push',rest:false,exercises:[
         {id:'dips',s:'4',r:'12',rs:'90s'},{id:'chin-up',s:'4',r:'10',rs:'90s'},
         {id:'hammer-c',s:'4',r:'12',rs:'75s'},{id:'face-pull',s:'4',r:'15',rs:'45s'},
         {id:'lateral-r',s:'3',r:'20',rs:'45s'}
       ]},
     ]},
    /* ── BOXE CONDITIONING ── */
    {id:'v31_boxing',name:'Boxing Conditioning',icon:'🥊',color:'var(--red)',
     t:'custom',diff:'intermediate',dur:'50',goals:['fat_loss','endurance'],levels:['beginner','intermediate'],
     desc:'Condizionamento fisico ispirato alla boxe. Resistenza, forza esplosiva, riflessi e composizione corporea.',
     days:[
       {name:'Lun — Shadow + Forza',type:'full',rest:false,exercises:[
         {id:'v29_jump_rope',s:'5',r:'3min',rs:'60s'},{id:'push-up',s:'4',r:'20',rs:'60s'},
         {id:'v29_battle_rope',s:'4',r:'30s',rs:'30s'},{id:'pull-up',s:'4',r:'10',rs:'60s'},
         {id:'plank',s:'3',r:'60s',rs:'30s'}
       ]},
       {name:'Mar — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Mer — Esplosività',type:'cardio',rest:false,exercises:[
         {id:'v29_jump_rope',s:'3',r:'5min',rs:'90s'},{id:'v29_box_jump',s:'4',r:'8',rs:'60s'},
         {id:'burpees',s:'5',r:'30s',rs:'30s'},{id:'mt-cl',s:'5',r:'45s',rs:'15s'},
         {id:'squat-j',s:'4',r:'30s',rs:'30s'}
       ]},
       {name:'Gio — Riposo',type:'rest',rest:true,exercises:[]},
       {name:'Ven — Forza + Condiz.',type:'full',rest:false,exercises:[
         {id:'v29_kb_swing',s:'5',r:'20',rs:'30s'},{id:'dips',s:'4',r:'12',rs:'60s'},
         {id:'v29_battle_rope',s:'5',r:'30s',rs:'30s'},{id:'v29_jump_rope',s:'4',r:'2min',rs:'60s'},
         {id:'hi-kn',s:'4',r:'45s',rs:'15s'}
       ]},
     ]},
    /* ── YOGA FORZA — STRETCHING ATLETICO ── */
    {id:'v31_yoga_strength',name:'Yoga Strength — Flessibilità Attiva',icon:'🧘',color:'var(--purple)',
     t:'custom',diff:'beginner',dur:'40',goals:['mobility','calisthenics'],levels:['beginner','intermediate','advanced'],
     desc:'Yoga applicato all\'atleta: stretching attivo, mobilità articolare, forza isometrica. Prevenzione infortuni e recupero.',
     days:[
       {name:'Sessione — Mobilità Totale',type:'custom',rest:false,exercises:[
         {id:'ct-wall',s:'3',r:'90s',rs:'30s'},{id:'v29_kb_windmill',s:'3',r:'8',rs:'60s'},
         {id:'hollow',s:'3',r:'30s',rs:'30s'},{id:'lsit',s:'3',r:'15s',rs:'60s'},
         {id:'plank',s:'3',r:'60s',rs:'30s'}
       ]},
       {name:'Sessione — Lower Mob.',type:'custom',rest:false,exercises:[
         {id:'ct-squat',s:'3',r:'30s',rs:'30s'},{id:'pistol',s:'3',r:'5',rs:'90s'},
         {id:'nordic',s:'3',r:'5',rs:'120s'},{id:'calf',s:'3',r:'25',rs:'30s'},
         {id:'glute-b',s:'3',r:'25',rs:'30s'}
       ]},
     ]},
    /* ── VOLUME SHOCK (Deload antidoto) ── */
    {id:'v31_volume_shock',name:'Volume Shock — Deload Attivo',icon:'💥',color:'var(--orange)',
     t:'full',diff:'intermediate',dur:'30',goals:['hypertrophy'],levels:['intermediate','advanced'],
     desc:'Settimana di scarico attivo con volume ridotto al 50% e focus su tecnica e connessione mente-muscolo.',
     days:[
       {name:'Lun — Upper 50%',type:'push',rest:false,exercises:[
         {id:'bench',s:'3',r:'10',rs:'90s'},{id:'pull-up',s:'3',r:'8',rs:'90s'},
         {id:'lateral-r',s:'3',r:'15',rs:'45s'},{id:'face-pull',s:'3',r:'20',rs:'45s'}
       ]},
       {name:'Mer — Lower 50%',type:'lower',rest:false,exercises:[
         {id:'back-squat',s:'3',r:'10',rs:'90s'},{id:'v29_rdl',s:'3',r:'10',rs:'90s'},
         {id:'glute-b',s:'3',r:'20',rs:'30s'},{id:'calf',s:'3',r:'20',rs:'30s'}
       ]},
       {name:'Ven — Full 50%',type:'full',rest:false,exercises:[
         {id:'deadlift',s:'2',r:'8',rs:'120s'},{id:'ohp',s:'3',r:'10',rs:'90s'},
         {id:'pull-up',s:'3',r:'8',rs:'75s'},{id:'plank',s:'3',r:'60s',rs:'30s'}
       ]},
     ]},
    /* ── ANZIANI MOBILITÀ + EQUILIBRIO ── */
    {id:'v31_senior_fit',name:'Senior Fit — Vitalità',icon:'🌿',color:'var(--green)',
     t:'custom',diff:'beginner',dur:'30',goals:['mobility'],levels:['beginner'],
     desc:'Movimento sicuro per over 60. Equilibrio, coordinazione, forza funzionale leggera. Mantieni la tua autonomia.',
     days:[
       {name:'Lun — Forza Funzionale',type:'full',rest:false,exercises:[
         {id:'ct-wall',s:'3',r:'60s',rs:'60s'},{id:'ct-squat',s:'3',r:'12',rs:'90s'},
         {id:'glute-b',s:'3',r:'15',rs:'60s'},{id:'plank',s:'3',r:'20s',rs:'60s'}
       ]},
       {name:'Mer — Mobilità',type:'custom',rest:false,exercises:[
         {id:'v29_kb_windmill',s:'3',r:'6',rs:'60s'},{id:'hollow',s:'3',r:'15s',rs:'60s'},
         {id:'ct-lunge',s:'3',r:'8',rs:'75s'},{id:'calf',s:'3',r:'15',rs:'45s'}
       ]},
       {name:'Ven — Equilibrio + Leggerezza',type:'custom',rest:false,exercises:[
         {id:'pistol',s:'3',r:'5',rs:'90s'},{id:'v29_band_pull',s:'3',r:'15',rs:'45s'},
         {id:'face-pull',s:'3',r:'15',rs:'45s'},{id:'plank',s:'3',r:'30s',rs:'45s'}
       ]},
     ]},
  ];

  if(typeof PRESETS_DATA !== 'undefined'){
    const ids = new Set(PRESETS_DATA.map(p=>p.id));
    extra.forEach(p=>{ if(!ids.has(p.id)){ PRESETS_DATA.push(p); ids.add(p.id); }});
    window.PRESETS_DATA = PRESETS_DATA;
  }
})();

/* ── 7. MUSCLE FATIGUE — REFRESH SU OGNI NAVIGAZIONE ─── */
(function patchGoPageV31(){
  if(window._v31GoPagePatched) return;
  window._v31GoPagePatched = true;
  const _orig = window.goPage;
  if(typeof _orig !== 'function') return;
  window.goPage = function(p){
    _orig.apply(this, arguments);
    if(String(p).includes('progress')||String(p).includes('statistic')){
      setTimeout(()=>{
        if(typeof renderMuscleFatigue==='function') renderMuscleFatigue();
      }, 200);
    }
  };
})();

/* ── 8. INIT ──────────────────────────────────────────── */
(function v31Init(){
  function run(){
    // Espone qs globale
    window.qs = id => document.getElementById(id);
    // Fix versione badge
    const badge = document.querySelector('#ft-version-footer, [id*="version"]');
    if(badge && !badge.textContent.includes('V31')) badge.textContent = 'FitTrack AI V31 · Dati salvati localmente';
      }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run);
  else run();
})();

})(); // end v31Patch
