<style>
/* ═══════════════════════════════════════════
   DESIGN SYSTEM — FitTrack AI v3
═══════════════════════════════════════════ */
:root {
  /* ── BACKGROUNDS ── */
  --bg:#06060E; --bg2:#0B0B18; --bg3:#11111F; --bg4:#181828; --bg5:#1F1F34;
  /* ── GLASS ── */
  --glass:rgba(255,255,255,0.03); --glass2:rgba(255,255,255,0.055);
  /* ── BORDERS ── */
  --border:rgba(255,255,255,0.05); --border2:rgba(255,255,255,0.09); --border3:rgba(255,255,255,0.16);
  /* ── TEXT ── */
  --text:#EEEBe6; --text2:#797688; --text3:#3E3C4A;
  /* ── ACCENT ── */
  --acc:#C8F53C; --acc2:#A8D828; --acc3:rgba(200,245,60,0.10); --acc4:rgba(200,245,60,0.05);
  /* ── SEMANTIC ── */
  --red:#FF5C6A; --red-d:rgba(255,92,106,0.10);
  --blue:#5B9CEF; --blue-d:rgba(91,156,239,0.12);
  --orange:#FF9A3C; --orange-d:rgba(255,154,60,0.12);
  --green:#3EDF8A; --green-d:rgba(62,223,138,0.12);
  --purple:#A87EF8; --purple-d:rgba(168,126,248,0.12);
  --teal:#3ECFCF; --teal-d:rgba(62,207,207,0.12);
  /* ── RADIUS ── */
  --r:13px; --r-sm:8px; --r-lg:18px; --r-xl:24px; --r-2xl:32px;
  /* ── LAYOUT ── */
  --nav-h:68px;
  --safe-top:env(safe-area-inset-top,0px);
  --safe-bot:env(safe-area-inset-bottom,0px);
  /* ── SHADOWS / GLOW ── */
  --shadow-acc:0 0 32px rgba(200,245,60,0.14);
  --shadow-card:0 4px 28px rgba(0,0,0,0.55);
  --shadow-sm:0 2px 10px rgba(0,0,0,0.4);
  --glow-acc:0 0 20px rgba(200,245,60,0.16);
  --glow-acc-sm:0 0 10px rgba(200,245,60,0.10);
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html,body{height:100%;overscroll-behavior:none;background:var(--bg);}
body{color:var(--text);font-family:'Syne',sans-serif;overflow:hidden;}
input,select,button{font-family:'Syne',sans-serif;}

/* ── ANIMATIONS ── */
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}
@keyframes popIn{0%{transform:scale(.5);opacity:0}70%{transform:scale(1.07)}100%{transform:scale(1);opacity:1}}
@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes glowPulse{0%,100%{box-shadow:0 0 20px rgba(200,245,60,0.1)}50%{box-shadow:0 0 40px rgba(200,245,60,0.25)}}
@keyframes barGrow{from{width:0}to{width:var(--w)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes countUp{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}

/* ── SCREEN SYSTEM ── */
.screen{display:none;position:fixed;inset:0;overflow:hidden;background:var(--bg);}
.screen.active{display:flex;flex-direction:column;}

/* scr-home è rimosso — l'app usa scr-app con page-home */
.home-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:calc(14px + var(--safe-top)) 20px 14px;
  background:rgba(6,6,14,0.7);
  backdrop-filter:blur(24px) saturate(160%);
  -webkit-backdrop-filter:blur(24px) saturate(160%);
  border-bottom:1px solid var(--border);
  position:sticky;top:0;z-index:50;
}
.home-search-ico{font-size:20px;cursor:pointer;opacity:.8;}
.home-ttl{font-size:20px;font-weight:700;letter-spacing:-.3px;}
.home-notif-ico{font-size:20px;cursor:pointer;position:relative;}
.home-notif-ico::after{
  content:'';position:absolute;top:-6px;right:-8px;
  background:var(--red);color:white;font-size:9px;font-weight:700;
  border-radius:50%;width:18px;height:18px;
  display:flex;align-items:center;justify-content:center;
  visibility:hidden;
}

.home-body{flex:1;overflow-y:auto;padding:20px 16px;padding-bottom:calc(88px + var(--safe-bot));}

/* HERO CARD */
.home-workout-hero{
  position:relative;height:380px;border-radius:var(--r-xl);
  overflow:hidden;margin-bottom:24px;animation:fadeUp .5s cubic-bezier(.22,1,.36,1);
}
.hero-background{
  position:absolute;inset:0;background:linear-gradient(135deg,
    #1a1a2e 0%,#16213e 50%,#0f3460 100%);
  opacity:.3;
}
.hero-overlay{
  position:absolute;inset:0;background:linear-gradient(180deg,
    rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.6) 80%,rgba(0,0,0,0.9) 100%);
}
.hero-content{
  position:relative;height:100%;display:flex;flex-direction:column;
  padding:20px;justify-content:space-between;z-index:2;
}

.hero-calendar-badge{display:flex;justify-content:flex-end;}
.calendar-btn{
  background:rgba(0,0,0,0.4);color:var(--text);
  border:1px solid rgba(255,255,255,0.15);border-radius:24px;
  padding:10px 20px;font-size:13px;font-weight:600;
  backdrop-filter:blur(10px);cursor:pointer;
  transition:all .2s ease;
}
.calendar-btn:hover{background:rgba(0,0,0,0.5);border-color:var(--acc);}

/* WEEKDAYS */
.hero-weekdays{
  display:flex;gap:10px;justify-content:center;margin:20px 0;
}
.weekday-item{
  width:40px;height:40px;border-radius:50%;
  background:rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);
  display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:600;cursor:pointer;
  transition:all .2s ease;color:var(--text2);
}
.weekday-item:hover{background:rgba(255,255,255,0.1);}
.weekday-item.current{
  background:rgba(200,245,60,0.25);border-color:var(--acc);
  color:var(--acc);box-shadow:0 0 20px rgba(200,245,60,0.3);
}

/* STATUS PILLS */
.hero-status-pills{display:flex;gap:12px;margin-top:10px;}
.status-pill{
  flex:1;display:flex;align-items:center;gap:8px;
  background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.15);
  border-radius:99px;padding:12px 16px;
  backdrop-filter:blur(10px);font-size:12px;
}
.pill-icon{font-size:16px;}
.pill-text{font-weight:600;}
.status-pill.likes{justify-content:center;}

/* WORKOUT DETAILS SECTION */
.home-workout-section{
  background:var(--bg3);border:1px solid var(--border2);
  border-radius:var(--r-xl);padding:24px 20px;
  display:flex;gap:20px;animation:fadeUp .5s .1s cubic-bezier(.22,1,.36,1) both;
}
.workout-visual{
  flex:0 0 100px;display:flex;align-items:center;justify-content:center;
}
.muscle-diagram{
  width:100%;height:auto;color:var(--text);
}
.figure{opacity:.7;}

.workout-info{flex:1;display:flex;flex-direction:column;}
.workout-title{
  font-size:18px;font-weight:800;margin-bottom:4px;color:var(--acc);
}
.workout-date{
  font-size:12px;color:var(--text2);margin-bottom:16px;
}
.workout-stats{
  display:flex;gap:16px;margin-bottom:16px;
}
.stat-item{
  display:flex;align-items:center;gap:8px;
  font-size:13px;color:var(--text);
}
.stat-icon{font-size:16px;}

.workout-action-btn{
  background:var(--acc);color:var(--bg);border:none;
  border-radius:var(--r-lg);padding:12px 16px;
  font-size:14px;font-weight:700;cursor:pointer;
  display:flex;align-items:center;justify-content:center;gap:8px;
  transition:all .2s ease;
}
.workout-action-btn:hover{
  background:var(--acc2);transform:translateY(-2px);
  box-shadow:0 8px 24px rgba(200,245,60,0.3);
}
.btn-arrow{font-size:16px;}

/* HOME EMPTY STATE */
.home-empty{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:60px 20px;text-align:center;
}
.empty-ico{font-size:48px;margin-bottom:16px;}
.empty-ttl{font-size:18px;font-weight:700;margin-bottom:8px;}
.empty-sub{font-size:13px;color:var(--text2);}

/* EVENTS SECTION */
.home-events{
  padding:20px 16px;border-top:1px solid var(--border);
  background:var(--bg2);position:fixed;bottom:var(--nav-h);
  left:0;right:0;
}
.events-ttl{
  font-size:16px;font-weight:700;margin-bottom:8px;
}
.events-sub{
  font-size:12px;color:var(--text2);line-height:1.6;
}

/* ═══════════════════════════════════════════
   SPLASH
═══════════════════════════════════════════ */
#scr-splash{
  align-items:center;justify-content:center;
  background:
    radial-gradient(ellipse 60% 40% at 50% 30%, rgba(200,245,60,.12) 0%, transparent 60%),
    radial-gradient(ellipse 40% 30% at 80% 80%, rgba(91,156,239,.08) 0%, transparent 50%),
    var(--bg);
}
.splash-logo{
  font-family:'Bebas Neue',sans-serif;font-size:76px;color:var(--acc);
  letter-spacing:5px;line-height:.9;text-align:center;
  filter:drop-shadow(0 0 40px rgba(200,245,60,0.5));
  animation:fadeUp .9s cubic-bezier(.22,1,.36,1) both, glowPulse 3s 1s ease infinite;
}
.splash-sub{
  font-size:11px;color:var(--text2);letter-spacing:.18em;text-transform:uppercase;
  margin-top:12px;animation:fadeUp .9s .18s cubic-bezier(.22,1,.36,1) both;
}
.splash-badge{
  display:inline-flex;align-items:center;gap:6px;
  background:var(--acc3);border:1px solid rgba(200,245,60,.25);
  color:var(--acc);font-size:11px;font-weight:700;padding:4px 12px;
  border-radius:99px;margin-top:14px;
  animation:fadeUp .9s .28s cubic-bezier(.22,1,.36,1) both;
}
.splash-spin{
  width:38px;height:38px;border-radius:50%;
  border:2px solid var(--border2);border-top-color:var(--acc);
  animation:spin .9s linear infinite, fadeIn .5s .65s both;
  margin-top:56px;
}

/* ═══════════════════════════════════════════
   ONBOARDING — luxury feel
═══════════════════════════════════════════ */
#scr-onboard{overflow-y:auto;background:var(--bg);}
.ob-wrap{padding:52px 24px 48px;max-width:440px;width:100%;margin:0 auto;flex:1;}

.ob-logo-wrap{margin-bottom:32px;}
.ob-logo{
  font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--acc);
  letter-spacing:2px;line-height:1;
}

.ob-prog-track{display:flex;gap:5px;margin-bottom:40px;}
.ob-prog-seg{
  height:2px;flex:1;border-radius:99px;
  background:var(--border2);transition:background .4s ease,box-shadow .4s ease;
}
.ob-prog-seg.on{background:var(--acc);box-shadow:0 0 8px rgba(200,245,60,.4);}

.ob-step{display:none;}
.ob-step.active{display:block;animation:fadeUp .38s cubic-bezier(.22,1,.36,1) both;}

.ob-eyebrow{
  font-size:10px;font-weight:700;letter-spacing:.15em;text-transform:uppercase;
  color:var(--acc);margin-bottom:8px;
}
.ob-ttl{font-size:26px;font-weight:800;letter-spacing:-.5px;line-height:1.2;margin-bottom:8px;}
.ob-sub{font-size:13px;color:var(--text2);margin-bottom:24px;line-height:1.7;}

/* OPTION CARDS */
.ob-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:24px;}
.ob-card{
  background:var(--bg3);border:1.5px solid var(--border);
  border-radius:var(--r-lg);padding:14px 12px;cursor:pointer;
  transition:border-color .15s,background .15s,transform .12s,box-shadow .15s;
  user-select:none;position:relative;overflow:visible;
  min-height:auto;box-sizing:border-box;
}
.ob-card::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(200,245,60,0) 0%,rgba(200,245,60,.04) 100%);
  opacity:0;transition:opacity .2s;
}
.ob-card:hover::before{opacity:1;}
.ob-card:active{transform:scale(.96);}
.ob-card.sel{
  border-color:var(--acc);background:var(--acc4);
  box-shadow:0 0 0 1px var(--acc),inset 0 0 20px rgba(200,245,60,.04);
}
.ob-card.sel::before{opacity:1;}
.ob-card-ico{font-size:28px;margin-bottom:10px;display:block;animation:none;}
.ob-card.sel .ob-card-ico{animation:popIn .3s cubic-bezier(.22,1,.36,1);}
.ob-card-nm{font-size:13px;font-weight:700;color:var(--text);word-break:break-word;line-height:1.35;}
.ob-card-sub{font-size:11px;color:var(--text2);margin-top:3px;line-height:1.4;word-break:break-word;}

/* INPUTS */
.ob-inp{
  width:100%;background:var(--bg3);border:1.5px solid var(--border);
  border-radius:var(--r);padding:15px 18px;font-size:16px;
  color:var(--text);outline:none;
  transition:border-color .15s,box-shadow .15s;margin-bottom:16px;
}
.ob-inp:focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(200,245,60,.1);}
.ob-inp::placeholder{color:var(--text3);}

/* TDEE GRID */
.tdee-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:20px;}
.tdee-field{display:flex;flex-direction:column;gap:6px;}
.tdee-lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text3);}
.tdee-inp{
  background:var(--bg3);border:1.5px solid var(--border);border-radius:var(--r);
  padding:12px 14px;font-size:15px;color:var(--text);outline:none;
  transition:border-color .15s;width:100%;
}
.tdee-inp:focus{border-color:var(--acc);}

.tdee-result{
  background:linear-gradient(135deg,rgba(200,245,60,.1),rgba(200,245,60,.04));
  border:1px solid rgba(200,245,60,.25);border-radius:var(--r-lg);
  padding:16px 18px;margin-bottom:20px;
  animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both;
}
.tdee-result-title{font-size:11px;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.1em;margin-bottom:8px;}
.tdee-result-kcal{font-family:'Bebas Neue',sans-serif;font-size:48px;color:var(--acc);line-height:1;margin-bottom:4px;}
.tdee-result-sub{font-size:12px;color:var(--text2);line-height:1.6;}
.tdee-macros{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px;}
.tdee-macro-item{background:var(--bg4);border-radius:var(--r-sm);padding:10px 8px;text-align:center;}
.tdee-macro-val{font-size:16px;font-weight:800;margin-bottom:2px;}
.tdee-macro-lbl{font-size:9px;color:var(--text2);text-transform:uppercase;letter-spacing:.06em;}

/* PRESET RECOMMENDATION */
.preset-rec{
  background:var(--bg3);border:1.5px solid var(--border2);border-radius:var(--r-lg);
  padding:18px;margin-bottom:20px;position:relative;overflow:hidden;
}
.preset-rec::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--acc),var(--green));
}
.preset-rec-eye{font-size:10px;font-weight:700;color:var(--acc);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;}
.preset-rec-name{font-size:17px;font-weight:800;letter-spacing:-.2px;margin-bottom:5px;}
.preset-rec-desc{font-size:12px;color:var(--text2);line-height:1.6;}
.preset-rec-tags{display:flex;gap:6px;margin-top:10px;flex-wrap:wrap;}
.pr-tag{font-size:10px;font-weight:700;padding:3px 10px;border-radius:99px;}

/* BUTTONS */
.btn{
  padding:14px 28px;border-radius:99px;font-size:13px;font-weight:700;
  cursor:pointer;border:none;transition:all .15s;letter-spacing:.04em;
  user-select:none;position:relative;overflow:hidden;
}
.btn::after{
  content:'';position:absolute;inset:0;background:white;opacity:0;
  transition:opacity .12s;border-radius:inherit;
}
.btn:active::after{opacity:.07;}
.btn-acc{
  background:var(--acc);color:#080810;
  box-shadow:0 4px 20px rgba(200,245,60,.25);
}
.btn-acc:hover{background:var(--acc2);transform:translateY(-1px);box-shadow:0 6px 28px rgba(200,245,60,.35);}
.btn-acc:active{transform:scale(.97);}
.btn-ghost{background:transparent;border:1.5px solid var(--border2);color:var(--text2);}
.btn-ghost:hover{color:var(--text);border-color:var(--border3);}
.btn-sm{padding:9px 18px;font-size:12px;}
.btn-full{width:100%;text-align:center;}
.btn-danger{background:var(--red-d);color:var(--red);border:1px solid rgba(255,92,106,.2);}
.ob-nav{display:flex;gap:9px;margin-top:4px;}

/* ═══════════════════════════════════════════
   MAIN APP SHELL
═══════════════════════════════════════════ */
#scr-app{flex-direction:column;}
.app-content{
  flex:1;overflow-y:auto;overflow-x:hidden;
  padding-bottom:calc(var(--nav-h) + var(--safe-bot) + 16px);
  -webkit-overflow-scrolling:touch;
}
.app-content::-webkit-scrollbar{display:none;}

/* TOP BAR */
.topbar{
  flex-shrink:0;display:flex;align-items:center;justify-content:space-between;
  padding:calc(12px + var(--safe-top)) 18px 12px;
  background:rgba(8,8,16,.85);backdrop-filter:blur(20px);
  border-bottom:1px solid var(--border);
  position:relative;z-index:50;
}
.tb-brand{display:flex;align-items:center;gap:10px;}
.tb-logo-wrap{display:flex;align-items:center;gap:7px;}
.tb-logo{font-family:'Bebas Neue',sans-serif;font-size:20px;color:var(--text);letter-spacing:1px;}
.tb-badge{display:none!important;
  background:var(--acc3);color:var(--acc);font-size:10px;font-weight:700;
  padding:2px 8px;border-radius:99px;border:1px solid rgba(200,245,60,.2);
  letter-spacing:.04em;
}
.tb-subtitle{font-size:10px;color:var(--text3);margin-top:1px;letter-spacing:.04em;}
.tb-avatar{
  width:36px;height:36px;border-radius:50%;background:var(--acc);
  display:flex;align-items:center;justify-content:center;
  font-weight:800;font-size:15px;color:#080810;cursor:pointer;
  transition:transform .15s;box-shadow:0 0 0 2px rgba(200,245,60,.2);
}
.tb-avatar:active{transform:scale(.92);}

/* BOTTOM NAV */
.bnav{
  flex-shrink:0;display:flex;align-items:center;justify-content:space-around;
  background:rgba(6,6,14,0.88);
  backdrop-filter:blur(32px) saturate(180%);
  -webkit-backdrop-filter:blur(32px) saturate(180%);
  border-top:1px solid rgba(255,255,255,0.06);
  box-shadow:0 -1px 0 rgba(200,245,60,0.03), 0 -12px 40px rgba(0,0,0,0.5);
  height:calc(var(--nav-h) + var(--safe-bot));
  padding-bottom:var(--safe-bot);
  position:fixed;bottom:0;left:0;right:0;z-index:100;
}
.bni{
  display:flex;flex-direction:column;align-items:center;gap:3px;
  padding:8px 14px 6px;cursor:pointer;border:none;background:none;
  transition:all .22s cubic-bezier(.22,1,.36,1);min-width:52px;position:relative;
  border-radius:16px;
}
.bni:active{transform:scale(.82);}
.bni-ico{
  font-size:20px;
  transition:transform .25s cubic-bezier(.22,1,.36,1), filter .25s;
  filter:grayscale(30%) opacity(0.65);
}
.bni-lbl{
  font-size:8.5px;font-weight:700;color:var(--text3);
  text-transform:uppercase;letter-spacing:.07em;
  transition:color .2s, opacity .2s;
  opacity:0.7;
}
.bni.on .bni-ico{
  transform:scale(1.18) translateY(-1px);
  filter:grayscale(0%) opacity(1) drop-shadow(0 0 8px rgba(200,245,60,0.35));
}
.bni.on .bni-lbl{color:var(--acc);opacity:1;font-weight:800;}
.bni.on::before{
  content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);
  width:24px;height:2.5px;background:var(--acc);border-radius:0 0 3px 3px;
  box-shadow:0 0 10px rgba(200,245,60,0.5);
}
.bni-dot{
  position:absolute;top:6px;right:10px;width:7px;height:7px;
  border-radius:50%;background:var(--red);border:2px solid var(--bg);
  display:none;
}

/* PAGES */
.page{display:none;animation:fadeUp .32s cubic-bezier(.22,1,.36,1) both;}
.page.active{display:block;}

/* SECTION LABELS */
.sec-lbl{
  font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;
  letter-spacing:.1em;padding:0 18px;margin-bottom:10px;
}

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
.home-hero{
  padding:20px 18px 16px;
  background:linear-gradient(180deg,rgba(200,245,60,.05) 0%,transparent 100%);
}
.home-greet{font-size:13px;color:var(--text2);margin-bottom:4px;}
.home-name{font-size:28px;font-weight:800;letter-spacing:-.5px;line-height:1.1;}
.home-name em{color:var(--acc);font-style:normal;}
/* CTA banner */
.cta-banner{
  margin:16px 16px 4px;border-radius:var(--r-lg);padding:18px 18px 16px;
  position:relative;overflow:hidden;
}
.cta-banner::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
}
.cta-banner.has-prog{
  background:linear-gradient(135deg,rgba(200,245,60,.09),rgba(200,245,60,.03));
  border:1.5px solid rgba(200,245,60,.28);
}
.cta-banner.has-prog::before{background:linear-gradient(90deg,var(--acc),var(--green));}
.cta-banner.no-prog{
  background:var(--bg2);border:1.5px solid var(--border2);
}
.cta-banner.no-prog::before{background:var(--border2);}
.cta-eyebrow{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;margin-bottom:6px;}
.cta-prog-name{font-size:18px;font-weight:800;letter-spacing:-.3px;margin-bottom:4px;}
.cta-day-info{font-size:12px;color:var(--text2);margin-bottom:14px;line-height:1.5;}
.cta-btn-main{
  display:flex;align-items:center;justify-content:center;gap:8px;
  width:100%;padding:13px;border:none;border-radius:var(--r-lg);
  font-family:'Syne',sans-serif;font-size:14px;font-weight:800;
  cursor:pointer;letter-spacing:.03em;transition:all .15s;
}
.cta-btn-main:active{transform:scale(.98);}
.cta-btn-main.accent{background:var(--acc);color:#080810;box-shadow:0 4px 20px rgba(200,245,60,.22);}
.cta-btn-main.accent:hover{background:var(--acc2);}
.cta-btn-main.ghost{background:var(--bg3);color:var(--text);border:1.5px solid var(--border2);}
.cta-btn-main.ghost:hover{border-color:var(--acc);color:var(--acc);}
.cta-no-prog-txt{font-size:13px;color:var(--text2);margin-bottom:14px;line-height:1.6;}

/* STATS STRIP */
.stats-strip{
  display:grid;grid-template-columns:repeat(4,1fr);gap:8px;
  padding:0 16px 18px;
}
.stat-tile{
  background:var(--bg3);border:1px solid var(--border);
  border-radius:var(--r);padding:13px 8px;text-align:center;
  transition:border-color .2s,background .2s;cursor:default;
}
.stat-tile:hover{border-color:var(--border2);}
.stat-v{
  font-family:'Bebas Neue',sans-serif;font-size:27px;color:var(--acc);
  line-height:1;transition:transform .2s;
}
.stat-tile:hover .stat-v{transform:scale(1.06);}
.stat-l{font-size:8px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;margin-top:4px;}

/* GLASS CARDS — premium */
.glass-card{
  background:linear-gradient(145deg, rgba(255,255,255,0.028), rgba(255,255,255,0.012));
  border:1px solid var(--border2);
  border-radius:var(--r-xl);padding:20px;margin:0 16px 14px;
  box-shadow:0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  transition:border-color .25s, box-shadow .25s;
}
.glass-card:hover{border-color:var(--border3);box-shadow:0 8px 32px rgba(0,0,0,0.5);}
.card-hdr{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.card-hdr-l{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--text2);}
.card-hdr-r{font-size:12px;font-weight:700;color:var(--acc);}

/* STAT TILES — premium */
.stat-tile{
  background:linear-gradient(160deg,var(--bg3),var(--bg4));
  border:1px solid var(--border);
  border-radius:var(--r-lg);padding:14px 8px;text-align:center;
  transition:border-color .2s, transform .2s, box-shadow .2s;
  box-shadow:0 2px 12px rgba(0,0,0,0.35);
}
.stat-tile:hover{border-color:rgba(200,245,60,0.2);transform:translateY(-1px);box-shadow:0 6px 20px rgba(0,0,0,0.45);}
.stat-v{
  font-family:'Bebas Neue',sans-serif;font-size:28px;color:var(--acc);
  line-height:1;transition:transform .2s;
  text-shadow:0 0 16px rgba(200,245,60,0.25);
}
.stat-tile:hover .stat-v{transform:scale(1.08);}
.stat-l{font-size:8px;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;margin-top:5px;font-weight:700;}

/* CTA BTN — premium */
.cta-btn-main.accent{
  background:var(--acc);color:#06060E;
  box-shadow:0 4px 20px rgba(200,245,60,0.25), 0 1px 0 rgba(255,255,255,0.15) inset;
  font-weight:800;letter-spacing:.04em;
}
.cta-btn-main.accent:active{
  transform:scale(.97);
  box-shadow:0 2px 10px rgba(200,245,60,0.2);
}
.cta-banner.has-prog{
  background:linear-gradient(135deg,rgba(200,245,60,.07),rgba(62,223,138,.04));
  border:1px solid rgba(200,245,60,.22);
  box-shadow:0 4px 24px rgba(0,0,0,0.4), var(--glow-acc);
}

/* PRES CARD — premium */
.pres-card{
  background:linear-gradient(150deg,var(--bg3) 0%,var(--bg4) 100%);
  border:1px solid var(--border2);border-radius:var(--r-xl);
  padding:20px;margin-bottom:14px;position:relative;overflow:hidden;
  cursor:pointer;transition:all .22s cubic-bezier(.22,1,.36,1);
  box-shadow:0 4px 20px rgba(0,0,0,0.4);
}
.pres-card:hover{
  border-color:var(--border3);transform:translateY(-2px);
  box-shadow:0 12px 36px rgba(0,0,0,0.55);
}
.pres-card:active{transform:scale(.98) translateY(0);}
.pres-stripe{position:absolute;top:0;left:0;right:0;height:3px;border-radius:var(--r-xl) var(--r-xl) 0 0;}
.pres-ico{font-size:30px;margin-bottom:10px;display:block;}
.pres-nm{font-size:16px;font-weight:800;letter-spacing:-.2px;margin-bottom:5px;}
.pres-desc{font-size:12px;color:var(--text2);line-height:1.65;margin-bottom:12px;}
.pres-tags{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px;}
.ptag{font-size:10px;font-weight:700;padding:3px 9px;border-radius:99px;}
.pres-btn{
  width:100%;padding:13px;background:var(--acc);color:#06060E;border:none;
  border-radius:var(--r-lg);font-weight:800;font-size:13px;cursor:pointer;
  transition:all .18s;letter-spacing:.04em;
  box-shadow:0 3px 14px rgba(200,245,60,0.22);
}
.pres-btn:hover{background:var(--acc2);box-shadow:0 5px 20px rgba(200,245,60,0.3);}
.pres-btn:active{transform:scale(.97);}

/* REC BANNER — premium */
.rec-banner{
  background:linear-gradient(135deg,rgba(200,245,60,.08),rgba(62,223,138,.04));
  border:1px solid rgba(200,245,60,.2);border-radius:var(--r-xl);
  padding:20px;margin-bottom:16px;position:relative;overflow:hidden;
  box-shadow:0 4px 24px rgba(0,0,0,0.4), var(--glow-acc-sm);
}
.rec-banner::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--acc),var(--green));
  box-shadow:0 0 12px rgba(200,245,60,0.4);
}
.rec-btn{
  background:var(--acc);color:#06060E;border:none;border-radius:var(--r);
  padding:12px 22px;font-weight:800;font-size:13px;cursor:pointer;
  letter-spacing:.04em;transition:all .18s;
  box-shadow:0 3px 14px rgba(200,245,60,0.22);
}
.rec-btn:hover{background:var(--acc2);}
.rec-btn:active{transform:scale(.97);}

/* SEC-LBL — upgraded */
.sec-lbl{
  font-size:10px;font-weight:800;color:var(--text3);text-transform:uppercase;
  letter-spacing:.12em;padding:0 20px;margin-bottom:12px;
  display:flex;align-items:center;gap:8px;
}
.sec-lbl::after{content:'';flex:1;height:1px;background:var(--border);}

/* KCAL RING */
.kcal-wrap{display:flex;align-items:center;gap:18px;margin-bottom:14px;}
.kcal-ring-wrap{flex-shrink:0;position:relative;width:90px;height:90px;}
.kcal-ring-wrap svg{transform:rotate(-90deg);}
.kr-bg{fill:none;stroke:var(--bg4);stroke-width:8;}
.kr-fg{fill:none;stroke:var(--acc);stroke-width:8;stroke-linecap:round;stroke-dasharray:245;stroke-dashoffset:245;transition:stroke-dashoffset .8s cubic-bezier(.22,1,.36,1);}
.kcal-ring-num{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}
.kcal-ring-val{font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--acc);line-height:1;}
.kcal-ring-pct{font-size:9px;color:var(--text2);}
.kcal-info-col{flex:1;}
.kcal-big{font-family:'Bebas Neue',sans-serif;font-size:40px;color:var(--acc);line-height:1;margin-bottom:2px;}
.kcal-tgt{font-size:12px;color:var(--text2);}
.kcal-rem{font-size:11px;color:var(--text3);margin-top:3px;}

/* MACRO PILLS */
.macro-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.macro-pill{background:var(--bg4);border-radius:var(--r-sm);padding:10px 8px;text-align:center;}
.macro-pill-val{font-size:15px;font-weight:800;margin-bottom:3px;}
.macro-pill-bar{height:3px;background:var(--bg5);border-radius:99px;margin-bottom:5px;overflow:hidden;}
.macro-pill-fill{height:100%;border-radius:99px;transition:width .8s cubic-bezier(.22,1,.36,1);}
.macro-pill-lbl{font-size:9px;color:var(--text2);text-transform:uppercase;letter-spacing:.05em;}

/* LAST SESSION CARD */
.ls-card{display:flex;align-items:center;gap:14px;}
.ls-icon{
  width:52px;height:52px;border-radius:var(--r);background:var(--acc3);
  display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;
  border:1px solid rgba(200,245,60,.2);
}
.ls-body{flex:1;}
.ls-name{font-size:17px;font-weight:800;letter-spacing:-.3px;}
.ls-date{font-size:11px;color:var(--text2);margin-top:2px;}
.ls-stats{display:flex;gap:16px;margin-top:8px;}
.ls-stat .v{font-family:'Bebas Neue',sans-serif;font-size:20px;color:var(--acc);}
.ls-stat .l{font-size:9px;color:var(--text2);text-transform:uppercase;letter-spacing:.05em;}

/* MOTIVATIONAL */
.moto-strip{
  background:linear-gradient(135deg,rgba(200,245,60,.08),rgba(91,156,239,.06));
  border:1px solid var(--border);border-radius:var(--r-lg);
  padding:14px 16px;margin:0 16px 18px;
  display:flex;align-items:center;gap:12px;
}
.moto-ico{font-size:22px;flex-shrink:0;animation:float 3s ease infinite;}
.moto-txt{font-size:13px;color:var(--text2);line-height:1.6;}

/* ═══════════════════════════════════════════
   ALLENAMENTO PAGE
═══════════════════════════════════════════ */
.al-head{padding:20px 18px 14px;display:flex;align-items:flex-end;justify-content:space-between;}
.al-title{font-size:28px;font-weight:800;letter-spacing:-.5px;}

.btn-nuova{
  display:flex;align-items:center;justify-content:center;gap:8px;
  background:var(--acc);color:#080810;
  font-weight:700;font-size:14px;padding:16px;
  border-radius:var(--r-lg);border:none;cursor:pointer;
  width:calc(100% - 32px);margin:0 16px 20px;
  transition:all .15s;letter-spacing:.03em;
  box-shadow:0 4px 24px rgba(200,245,60,.2);
}
.btn-nuova:active{transform:scale(.98);background:var(--acc2);}
.btn-nuova:hover{box-shadow:0 6px 32px rgba(200,245,60,.3);}

.sess-card{
  background:var(--bg2);border:1px solid var(--border);
  border-radius:var(--r-lg);padding:16px;margin:0 16px 10px;
  cursor:pointer;transition:all .18s;
}
.sess-card:hover{border-color:var(--border2);transform:translateY(-1px);}
.sess-card:active{transform:scale(.98);}
.sess-top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;}
.sess-name{font-size:17px;font-weight:800;letter-spacing:-.3px;}
.sess-date{font-size:11px;color:var(--text2);margin-top:2px;}
.sess-del{background:none;border:none;color:var(--text3);cursor:pointer;font-size:18px;padding:3px;transition:color .15s;}
.sess-del:hover{color:var(--red);}
.sess-chips{display:flex;gap:6px;flex-wrap:wrap;}
.sc{font-size:11px;color:var(--text2);background:var(--bg4);border:1px solid var(--border);border-radius:99px;padding:4px 10px;}
.sc.hi{color:var(--acc);border-color:rgba(200,245,60,.2);background:var(--acc4);}

.empty-state{text-align:center;padding:52px 20px;}
.es-ico{font-size:46px;margin-bottom:16px;animation:float 3s ease infinite;}
.es-txt{font-size:13px;color:var(--text2);line-height:1.75;margin-bottom:22px;}

/* ═══════════════════════════════════════════
   NUTRIZIONE PAGE
═══════════════════════════════════════════ */
.nutr-head{padding:20px 18px 14px;display:flex;align-items:flex-end;justify-content:space-between;}
.nutr-title{font-size:28px;font-weight:800;letter-spacing:-.5px;}

.riepilogo{
  background:var(--bg2);border:1px solid var(--border);
  border-radius:var(--r-lg);padding:20px;margin:0 16px 14px;
  position:relative;overflow:hidden;
}
.riepilogo::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--acc),var(--green),var(--blue));
}
/* LEGACY (kept for compatibility) */
.rk-row{display:flex;align-items:flex-end;gap:8px;margin-bottom:6px;}
.rk-num{font-family:'Bebas Neue',sans-serif;font-size:54px;color:var(--acc);line-height:1;}
.rk-unit{font-size:13px;color:var(--text2);padding-bottom:8px;}
.rk-tgt{font-size:13px;color:var(--text2);margin-bottom:10px;}
.nutr-pbar{height:6px;background:var(--bg4);border-radius:99px;overflow:hidden;margin-bottom:14px;}
.nutr-pbar-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--acc),var(--green));transition:width .8s cubic-bezier(.22,1,.36,1);}

/* ── NUTRITION RING (nuova rotella) ── */
.nutr-ring-row{display:flex;align-items:center;gap:18px;margin-bottom:16px;}
.nutr-ring-wrap{flex-shrink:0;position:relative;width:120px;height:120px;}
.nr-bg{fill:none;stroke:var(--bg4);stroke-width:9;}
.nr-bg-md{stroke-width:7;}
.nr-bg-sm{stroke-width:6;}
.nr-bg-xs{stroke-width:5;}
.nr-g{fill:none;stroke:var(--orange);stroke-width:5;stroke-linecap:round;
  stroke-dasharray:88;stroke-dashoffset:88;
  transition:stroke-dashoffset .9s .24s cubic-bezier(.22,1,.36,1);}
.nr-kcal{fill:none;stroke:var(--acc);stroke-width:9;stroke-linecap:round;
  stroke-dasharray:314;stroke-dashoffset:314;
  transition:stroke-dashoffset .9s cubic-bezier(.22,1,.36,1);}
.nr-p{fill:none;stroke:var(--green);stroke-width:7;stroke-linecap:round;
  stroke-dasharray:239;stroke-dashoffset:239;
  transition:stroke-dashoffset .9s .08s cubic-bezier(.22,1,.36,1);}
.nr-c{fill:none;stroke:var(--blue);stroke-width:6;stroke-linecap:round;
  stroke-dasharray:163;stroke-dashoffset:163;
  transition:stroke-dashoffset .9s .16s cubic-bezier(.22,1,.36,1);}
.nutr-ring-center{position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;}
.nutr-ring-val{font-family:'Bebas Neue',sans-serif;font-size:26px;color:var(--acc);
  line-height:1;text-shadow:0 0 20px rgba(200,245,60,.25);}
.nutr-ring-unit{font-size:9px;color:var(--text2);text-transform:uppercase;letter-spacing:.06em;}
.nutr-ring-pct{font-size:9px;color:var(--text3);margin-top:1px;}
.nutr-ring-info{flex:1;min-width:0;}
.nutr-ring-tgt{font-size:13px;color:var(--text2);margin-bottom:3px;}
.nutr-ring-rem{font-size:12px;color:var(--text3);}
.nutr-ring-legend{display:flex;gap:10px;margin-top:10px;}
.nrl-item{display:flex;align-items:center;gap:4px;}
.nrl-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
.nrl-lbl{font-size:10px;color:var(--text2);font-weight:600;}

/* MACRO BOXES */
.nutr-macros{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.nm-box{background:var(--bg3);border:1px solid var(--border);
  border-radius:var(--r-sm);padding:12px 8px;text-align:center;
  transition:border-color .2s;}
.nm-box:hover{border-color:var(--border2);}
.nm-val{font-size:16px;font-weight:800;margin-bottom:2px;}
.nm-curr{font-size:10px;color:var(--text2);}
.nm-bar-wrap{height:3px;background:var(--bg5);border-radius:99px;overflow:hidden;margin:6px 0 5px;}
.nm-bar-fill{height:100%;border-radius:99px;transition:width .8s cubic-bezier(.22,1,.36,1);}
.nm-lbl{font-size:9px;color:var(--text2);text-transform:uppercase;letter-spacing:.06em;}

.meal-card{
  background:var(--bg2);border:1px solid var(--border);
  border-radius:var(--r-lg);margin:0 16px 10px;overflow:hidden;
}
.meal-head{
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 16px;cursor:pointer;transition:background .12s;
}
.meal-head:hover{background:var(--glass);}
.meal-head-l{display:flex;align-items:center;gap:10px;}
.meal-ico{font-size:19px;}
.meal-nm{font-size:15px;font-weight:700;}
.meal-kcal{font-size:13px;font-weight:700;color:var(--acc);}
.meal-items{padding:0 16px;display:none;}
.food-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border);}
.food-row:last-of-type{border-bottom:none;}
.food-nm{font-size:13px;font-weight:600;}
.food-meta{font-size:11px;color:var(--text2);margin-top:2px;}
.food-kcal-wrap{text-align:right;}
.food-kcal{font-size:12px;color:var(--text2);}
.food-del{font-size:11px;color:var(--red);cursor:pointer;font-weight:600;margin-top:2px;}
.meal-add-btn{
  display:flex;align-items:center;justify-content:center;gap:6px;
  padding:12px;color:var(--acc);font-size:13px;font-weight:700;cursor:pointer;
  border-top:1px solid var(--border);transition:background .12s;
}
.meal-add-btn:hover{background:var(--acc4);}

/* FOOD SHEET */
.food-ovl{display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:250;backdrop-filter:blur(8px);align-items:flex-end;}
.food-ovl.open{display:flex;animation:fadeIn .2s ease both;}
.food-sheet{
  background:var(--bg2);border:1px solid var(--border2);
  border-radius:var(--r-xl) var(--r-xl) 0 0;
  width:100%;max-height:88vh;display:flex;flex-direction:column;
  animation:slideUp .3s cubic-bezier(.22,1,.36,1) both;
  padding-bottom:var(--safe-bot);
}
.sheet-handle{width:36px;height:4px;border-radius:99px;background:var(--border2);margin:10px auto 0;flex-shrink:0;}
.sheet-hd{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;flex-shrink:0;}
.sheet-ttl{font-size:16px;font-weight:800;}
.sheet-close{background:var(--bg4);border:none;border-radius:50%;width:30px;height:30px;color:var(--text2);cursor:pointer;font-size:14px;transition:all .15s;}
.sheet-close:hover{background:var(--bg5);color:var(--text);}
.sheet-search{margin:0 16px 12px;flex-shrink:0;}
.sheet-inp{
  width:100%;background:var(--bg3);border:1.5px solid var(--border);
  border-radius:99px;padding:11px 18px;font-size:13px;color:var(--text);
  outline:none;transition:border-color .15s;
}
.sheet-inp:focus{border-color:var(--acc);}
.sheet-inp::placeholder{color:var(--text3);}
.sheet-list{flex:1;overflow-y:auto;padding:4px 8px 16px;}
.food-item{
  display:flex;align-items:center;gap:12px;padding:11px 10px;
  border-radius:var(--r);cursor:pointer;transition:background .1s;
}
.food-item:hover{background:var(--glass2);}
.food-item:active{background:var(--bg4);}
.fi-nm{font-size:13px;font-weight:700;flex:1;}
.fi-meta{font-size:11px;color:var(--text2);}
.fi-add{width:30px;height:30px;border-radius:var(--r-sm);background:var(--bg4);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:17px;color:var(--text2);transition:all .15s;flex-shrink:0;}
.food-item:hover .fi-add{background:var(--acc3);border-color:var(--acc);color:var(--acc);}

/* ═══════════════════════════════════════════
   PROGRESSI PAGE
═══════════════════════════════════════════ */
.prog-head{padding:20px 18px 14px;}
.prog-title{font-size:28px;font-weight:800;letter-spacing:-.5px;}

.streak-hero{
  background:linear-gradient(135deg,rgba(200,245,60,.1),rgba(62,223,138,.06));
  border:1px solid rgba(200,245,60,.2);border-radius:var(--r-lg);
  padding:20px;margin:0 16px 14px;display:flex;align-items:center;gap:18px;
}
.streak-n{font-family:'Bebas Neue',sans-serif;font-size:72px;color:var(--acc);line-height:1;}
.streak-ttl{font-size:15px;font-weight:800;margin-bottom:4px;}
.streak-sub{font-size:12px;color:var(--text2);line-height:1.6;}

.chart-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin:0 16px 14px;}
.chart-lbl{font-size:11px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.07em;margin-bottom:16px;}
.bar-chart{display:flex;align-items:flex-end;gap:6px;height:88px;}
.bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;}
.bar-v{font-size:9px;color:var(--text3);font-family:'DM Mono',monospace;}
.bar{width:100%;border-radius:5px 5px 0 0;background:var(--bg4);border:1px solid var(--border);min-height:4px;transition:height .6s cubic-bezier(.22,1,.36,1);}
.bar.peak{background:linear-gradient(180deg,var(--acc),var(--acc2));border-color:var(--acc);}
.bar-l{font-size:9px;color:var(--text3);text-align:center;}

.hmap-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin:0 16px 14px;}
.hmap-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-top:12px;}
.hm-c{aspect-ratio:1;border-radius:3px;background:var(--bg4);transition:background .2s;}
.hm-c.l1{background:var(--acc4);}
.hm-c.l2{background:var(--acc3);}
.hm-c.l3{background:rgba(200,245,60,.4);}
.hm-c.l4{background:var(--acc);}
.hm-leg{display:flex;gap:6px;align-items:center;margin-top:10px;}
.hm-leg-c{width:11px;height:11px;border-radius:2px;}
.hm-leg-t{font-size:9px;color:var(--text3);}

.pb-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin:0 16px 14px;}
.pb-row{display:flex;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid var(--border);}
.pb-row:last-child{border-bottom:none;}
.pb-ico{font-size:20px;flex-shrink:0;}
.pb-nm{font-size:13px;font-weight:700;flex:1;}
.pb-val{font-family:'DM Mono',monospace;font-size:13px;color:var(--acc);}

.misure-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin:0 16px 14px;}
.mi-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
.mi-wrap{display:flex;flex-direction:column;gap:6px;}
.mi-lbl{font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;}
.mi-inp{
  background:var(--bg3);border:1px solid var(--border);border-radius:var(--r);
  padding:11px 14px;font-size:14px;font-family:'DM Mono',monospace;
  color:var(--text);outline:none;transition:border-color .15s;
}
.mi-inp:focus{border-color:var(--acc);}

/* ═══════════════════════════════════════════
   COACH IA PAGE
═══════════════════════════════════════════ */
.coach-head{padding:20px 18px 14px;}
.coach-title{font-size:28px;font-weight:800;letter-spacing:-.5px;}
.coach-sub{font-size:12px;color:var(--text2);margin-top:2px;}

.coach-card{
  background:var(--bg2);border:1px solid var(--border);
  border-radius:var(--r-lg);padding:16px;margin:0 16px 10px;
  cursor:pointer;transition:all .18s;position:relative;overflow:hidden;
}
.coach-card::before{
  content:'';position:absolute;left:0;top:0;bottom:0;width:3px;
  opacity:0;transition:opacity .18s;
}
.coach-card:hover::before{opacity:1;}
.coach-card:hover{border-color:var(--border2);transform:translateY(-1px);}
.coach-card:active{transform:scale(.98);}
.cc-head{display:flex;align-items:center;gap:12px;margin-bottom:8px;}
.cc-ico{font-size:28px;}
.cc-nm{font-size:15px;font-weight:800;}
.cc-tag{font-size:10px;font-weight:700;padding:3px 9px;border-radius:99px;text-transform:uppercase;letter-spacing:.04em;}
.cc-arrow{font-size:18px;color:var(--text3);margin-left:auto;}
.cc-desc{font-size:12px;color:var(--text2);line-height:1.65;}

/* SUBSCREENS */
.subscreen{
  display:none;position:fixed;inset:0;background:var(--bg);z-index:150;
  overflow-y:auto;padding-bottom:calc(var(--nav-h) + 20px);
}
.subscreen.open{display:block;animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both;}
.sub-topbar{
  display:flex;align-items:center;gap:12px;
  padding:calc(14px + var(--safe-top)) 16px 14px;
  background:rgba(8,8,16,.92);backdrop-filter:blur(16px);
  position:sticky;top:0;z-index:10;border-bottom:1px solid var(--border);
}
.sub-back{
  background:var(--bg3);border:1px solid var(--border2);border-radius:99px;
  padding:8px 16px;font-size:13px;font-weight:700;color:var(--text2);
  cursor:pointer;display:flex;align-items:center;gap:6px;transition:all .15s;
}
.sub-back:hover{color:var(--text);border-color:var(--border3);}
.sub-ttl{font-size:16px;font-weight:800;flex:1;}
.sub-content{padding:18px;}

/* PRESET CARDS (in subscreen) */
.pres-card{
  background:var(--bg2);border:1px solid var(--border);
  border-radius:var(--r-lg);padding:20px;margin-bottom:12px;
  cursor:pointer;transition:all .2s;position:relative;overflow:hidden;
}
.pres-card:hover{border-color:var(--border2);transform:translateY(-2px);box-shadow:var(--shadow-card);}
.pres-card:active{transform:scale(.98);}
.pres-stripe{position:absolute;top:0;left:0;right:0;height:3px;}
.pres-ico{font-size:32px;margin-bottom:12px;display:block;}
.pres-nm{font-size:17px;font-weight:800;letter-spacing:-.2px;margin-bottom:6px;}
.pres-desc{font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:12px;}
.pres-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;}
.ptag{font-size:10px;font-weight:700;padding:4px 10px;border-radius:99px;}
/* PRES CARD / BTN — see premium styles above */

/* REC BANNER (in coach) - see premium styles above */
.rec-eye{font-size:10px;font-weight:700;color:var(--acc);letter-spacing:.12em;text-transform:uppercase;margin-bottom:6px;}
.rec-nm{font-size:18px;font-weight:800;margin-bottom:5px;}
.rec-desc{font-size:12px;color:var(--text2);line-height:1.65;margin-bottom:12px;}

/* BUILDER */
.build-inp{
  width:100%;background:transparent;border:none;border-bottom:2px solid var(--border2);
  font-family:'Bebas Neue',sans-serif;font-size:32px;color:var(--text);
  padding:4px 0 10px;outline:none;letter-spacing:1px;
  transition:border-color .15s;margin-bottom:14px;
}
.build-inp:focus{border-color:var(--acc);}
.build-inp::placeholder{color:var(--text3);}
.meta-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;}
.meta-sel{
  background:var(--bg3);border:1px solid var(--border);border-radius:99px;
  padding:8px 14px;font-size:12px;font-weight:600;color:var(--text2);
  outline:none;cursor:pointer;transition:all .15s;appearance:none;
}
.meta-sel:focus{border-color:var(--acc);color:var(--text);}
.day-blk{
  background:var(--bg2);border:1px solid var(--border);
  border-radius:var(--r-lg);margin-bottom:8px;overflow:hidden;
  transition:border-color .15s;animation:fadeUp .25s cubic-bezier(.22,1,.36,1) both;
}
.day-blk:hover{border-color:var(--border2);}
.day-hd{
  display:flex;align-items:center;gap:10px;padding:13px 14px;
  cursor:pointer;transition:background .12s;user-select:none;
}
.day-hd:hover{background:var(--glass);}
.day-arr{font-size:10px;color:var(--text3);transition:transform .22s cubic-bezier(.22,1,.36,1);flex-shrink:0;}
.day-arr.open{transform:rotate(90deg);}
.day-nm-inp{
  flex:1;background:transparent;border:none;
  font-size:14px;font-weight:700;color:var(--text);outline:none;
}
.day-type-btn{
  font-size:10px;font-weight:700;padding:4px 10px;border-radius:99px;
  border:none;cursor:pointer;text-transform:uppercase;letter-spacing:.04em;
  transition:all .15s;flex-shrink:0;
}
.day-rm{background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;padding:2px;flex-shrink:0;transition:color .15s;}
.day-rm:hover{color:var(--red);}
.day-bd{display:none;padding:12px 14px 14px;animation:fadeUp .22s cubic-bezier(.22,1,.36,1) both;}
.day-bd.open{display:block;}
.rest-sw-row{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--text2);cursor:pointer;margin-bottom:12px;padding:8px 10px;border-radius:var(--r-sm);transition:background .12s;}
.rest-sw-row:hover{background:var(--glass);}
.sw{width:36px;height:20px;border-radius:99px;border:1.5px solid var(--border2);background:var(--bg4);position:relative;transition:all .2s;flex-shrink:0;}
.sw.on{background:rgba(200,245,60,.15);border-color:var(--acc);}
.sw::after{content:'';position:absolute;width:14px;height:14px;border-radius:50%;background:var(--text3);top:1px;left:1px;transition:all .2s cubic-bezier(.22,1,.36,1);}
.sw.on::after{left:17px;background:var(--acc);}
.ex-item{display:flex;align-items:flex-start;gap:8px;padding:9px 0;border-bottom:1px solid var(--border);}
.ex-item:last-child{border-bottom:none;}
.ex-drag{font-size:14px;color:var(--text3);padding-top:3px;flex-shrink:0;cursor:grab;}
.ex-body{flex:1;}
.ex-nm{font-size:13px;font-weight:700;}
.params{display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;}
.param-w{display:flex;flex-direction:column;align-items:center;gap:2px;}
.param-in{
  background:var(--bg4);border:1px solid var(--border);border-radius:var(--r-sm);
  padding:5px 8px;font-size:11px;font-family:'DM Mono',monospace;
  color:var(--text2);width:68px;outline:none;transition:all .15s;text-align:center;
}
.param-in:focus{border-color:var(--acc);color:var(--text);}
.param-lbl{font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;}
.ex-del{background:none;border:none;color:var(--text3);cursor:pointer;font-size:16px;padding:2px;flex-shrink:0;transition:color .15s;}
.ex-del:hover{color:var(--red);}
.add-ex-btn{width:100%;margin-top:10px;padding:10px;border-radius:var(--r-sm);border:1.5px dashed var(--border2);background:transparent;color:var(--text2);font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;}
.add-ex-btn:hover{border-color:var(--acc);color:var(--acc);background:var(--acc4);}
.add-day-btn{width:100%;padding:14px;border-radius:var(--r-lg);margin-top:8px;border:1.5px dashed var(--border2);background:transparent;color:var(--text2);font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;}
.add-day-btn:hover{border-color:var(--acc);color:var(--acc);background:var(--acc4);}

/* EX PICKER */
.ex-ovl{display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:300;backdrop-filter:blur(6px);align-items:flex-end;}
.ex-ovl.open{display:flex;animation:fadeIn .2s ease both;}
.ex-sheet{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r-xl) var(--r-xl) 0 0;width:100%;max-height:85vh;display:flex;flex-direction:column;animation:slideUp .32s cubic-bezier(.22,1,.36,1) both;}
.ex-handle{width:36px;height:4px;border-radius:99px;background:var(--border2);margin:10px auto 0;flex-shrink:0;}
.ex-sh-hd{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;flex-shrink:0;}
.ex-sh-ttl{font-size:16px;font-weight:800;}
.ex-sh-cls{background:var(--bg4);border:none;border-radius:50%;width:30px;height:30px;color:var(--text2);cursor:pointer;font-size:14px;transition:all .15s;}
.ex-sh-cls:hover{background:var(--bg5);color:var(--text);}
.ex-srch{padding:0 16px 12px;flex-shrink:0;}
.ex-srch-inp{width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:99px;padding:10px 18px;font-size:13px;color:var(--text);outline:none;transition:border-color .15s;box-sizing:border-box;font-family:inherit;}
.ex-srch-inp:focus{border-color:var(--acc);}
.ex-srch-inp::placeholder{color:var(--text3);}
.ex-ftrs{display:flex;gap:6px;padding:0 16px 12px;overflow-x:auto;flex-shrink:0;scrollbar-width:none;}
.f-chip{font-size:11px;font-weight:700;padding:6px 14px;border-radius:99px;border:1px solid var(--border);background:transparent;color:var(--text2);cursor:pointer;white-space:nowrap;transition:all .15s;flex-shrink:0;}
.f-chip.on{background:var(--acc3);border-color:var(--acc);color:var(--acc);}
.ex-pick-list{flex:1;overflow-y:auto;padding:4px 8px 16px;}
.pi-item{display:flex;align-items:center;gap:12px;padding:11px 10px;border-radius:var(--r);cursor:pointer;transition:background .1s;}
.pi-item:hover{background:var(--glass2);}
.pi-item:active{background:var(--bg4);}
.pi-ico{width:38px;height:38px;border-radius:var(--r-sm);display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0;}
.pi-nm{font-size:13px;font-weight:700;}
.pi-tags{font-size:11px;color:var(--text2);margin-top:2px;}
.pi-add{width:29px;height:29px;border-radius:var(--r-sm);background:var(--bg4);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:17px;color:var(--text2);transition:all .15s;flex-shrink:0;}
.pi-item:hover .pi-add{background:var(--acc3);border-color:var(--acc);color:var(--acc);}
.custom-row{display:flex;gap:8px;padding:12px 16px;border-top:1px solid var(--border);flex-shrink:0;}
.custom-inp{flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:99px;padding:10px 16px;font-size:13px;color:var(--text);outline:none;transition:border-color .15s;}
.custom-inp:focus{border-color:var(--acc);}
.custom-inp::placeholder{color:var(--text3);}

/* ACTIVE WORKOUT */
.wo-ovl{display:none;position:fixed;inset:0;background:var(--bg);z-index:400;overflow-y:auto;padding:0 16px calc(20px + var(--safe-bot));}
.wo-ovl.open{display:block;animation:fadeIn .25s ease both;}
.wo-head{display:flex;align-items:flex-start;justify-content:space-between;padding:calc(18px + var(--safe-top)) 0 18px;}
.wo-nm{font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--acc);letter-spacing:1px;}
.wo-day{font-size:12px;color:var(--text2);margin-top:2px;}
.wo-time{font-family:'DM Mono',monospace;font-size:16px;color:var(--text2);}
.wo-ex-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin-bottom:10px;}
.wo-ex-nm{font-size:17px;font-weight:800;margin-bottom:14px;}
.wo-set-row{
  display:flex;align-items:center;gap:10px;padding:11px 13px;
  background:var(--bg3);border-radius:var(--r-sm);
  transition:all .15s;margin-bottom:6px;border:1px solid transparent;
}
.wo-set-row.done{background:var(--acc4);border-color:rgba(200,245,60,.2);}
.wo-set-row:last-child{margin-bottom:0;}
.wo-weight-inp:focus{border-color:var(--acc)!important;outline:none;}
.wo-set-n{font-size:11px;font-weight:700;color:var(--text3);min-width:52px;}
.wo-set-info{flex:1;font-size:13px;color:var(--text2);}
.wo-set-row.done .wo-set-info{color:var(--acc);}
.wo-set-chk{font-size:18px;}

/* REST MODAL — banner bottom, non blocca la vista dell'allenamento */
.rest-modal{
  display:none;position:fixed;left:0;right:0;bottom:calc(var(--nav-h) + 8px + var(--safe-bot));
  background:var(--bg2);border:1.5px solid var(--acc);border-radius:var(--r-xl);
  z-index:500;margin:0 12px;
  box-shadow:0 -4px 32px rgba(200,245,60,0.18);
}
.rest-modal.open{display:block;animation:slideUp .28s cubic-bezier(.22,1,.36,1) both;}
.rest-modal-inner{display:flex;align-items:center;gap:14px;padding:14px 18px;}
.rest-ring{position:relative;width:56px;height:56px;flex-shrink:0;}
.rest-ring svg{transform:rotate(-90deg);}
.r-bg{fill:none;stroke:var(--border2);stroke-width:5;}
.r-fg{fill:none;stroke:var(--acc);stroke-dasharray:157;stroke-dashoffset:0;transition:stroke-dashoffset 1s linear;stroke-linecap:round;filter:drop-shadow(0 0 4px rgba(200,245,60,.5));}
.rest-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:20px;color:var(--acc);}
.rest-lbl{font-size:11px;color:var(--text2);letter-spacing:.06em;text-transform:uppercase;margin-bottom:2px;}

/* TOAST */
.toast{
  position:fixed;bottom:calc(var(--nav-h) + 18px + var(--safe-bot));left:50%;
  transform:translateX(-50%) translateY(16px);
  background:var(--bg4);border:1px solid var(--border2);border-radius:99px;
  padding:12px 24px;font-size:13px;font-weight:600;color:var(--text);
  z-index:600;transition:all .28s cubic-bezier(.22,1,.36,1);
  pointer-events:none;opacity:0;white-space:nowrap;
  box-shadow:0 8px 32px rgba(0,0,0,.5);
}
.toast.show{transform:translateX(-50%) translateY(0);opacity:1;}

/* AL TABS */
.al-tab{
  font-size:12px;font-weight:700;padding:8px 16px;border-radius:99px;
  border:1px solid var(--border);background:transparent;color:var(--text2);
  cursor:pointer;white-space:nowrap;transition:all .15s;flex-shrink:0;
}
.al-tab.on{background:var(--acc3);border-color:var(--acc);color:var(--acc);}
.al-tab:active{transform:scale(.94);}

/* LIBRARY GRID */
.lib-grid{display:flex;flex-direction:column;gap:0;margin-bottom:20px;background:var(--bg2);border-radius:var(--r-lg);overflow:hidden;margin:0 16px 20px;}
.lib-card{
  background:var(--bg2);border:none;border-bottom:1px solid var(--border);
  padding:13px 14px;cursor:pointer;transition:background .15s;
  display:flex;align-items:center;gap:12px;width:100%;box-sizing:border-box;
}
.lib-card:last-child{border-bottom:none;}
.lib-card:active{background:var(--bg3);}
.lib-card-ico{font-size:22px;flex-shrink:0;width:36px;height:36px;border-radius:50%;background:var(--bg3);display:flex;align-items:center;justify-content:center;}
.lib-card-nm{font-size:14px;font-weight:700;line-height:1.3;margin-bottom:2px;}
.lib-card-tag{font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;display:inline-block;}
.lib-card-diff{font-size:10px;color:var(--text3);margin-top:5px;}

/* WEEKLY PROGRAM VIEW */
.wp-day{
  background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);
  margin-bottom:12px;overflow:hidden;
}
.wp-day-head{
  display:flex;align-items:center;gap:12px;padding:14px 16px;
  cursor:pointer;transition:background .12s;
}
.wp-day-head:hover{background:var(--glass);}
.wp-day-icon{
  width:40px;height:40px;border-radius:var(--r-sm);
  display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;
}
.wp-day-nm{font-size:15px;font-weight:800;}
.wp-day-sub{font-size:11px;color:var(--text2);margin-top:2px;}
.wp-day-body{display:none;border-top:1px solid var(--border);}
.wp-day-body.open{display:block;}
.wp-ex-row{
  display:flex;align-items:center;gap:12px;padding:11px 16px;
  border-bottom:1px solid var(--border);cursor:pointer;transition:background .1s;
}
.wp-ex-row:last-child{border-bottom:none;}
.wp-ex-row:hover{background:var(--glass);}
.wp-ex-ico{font-size:16px;flex-shrink:0;width:24px;text-align:center;}
.wp-ex-info{flex:1;}
.wp-ex-nm{font-size:13px;font-weight:700;}
.wp-ex-sets{font-size:11px;color:var(--text2);margin-top:2px;}
.wp-ex-muscle{font-size:10px;font-weight:700;padding:2px 7px;border-radius:99px;flex-shrink:0;}
.wp-rest-row{padding:14px 16px;display:flex;align-items:center;gap:10px;color:var(--text2);font-size:13px;}

/* MUSCLE MAP */
.muscle-map-wrap{
  display:flex;gap:16px;align-items:flex-start;margin:16px 0;
}
.muscle-figure{flex:1;text-align:center;}
.muscle-figure svg{width:100%;max-width:140px;}
.muscle-svg-part{fill:var(--bg4);stroke:var(--border2);stroke-width:1;transition:fill .3s,filter .3s;}
.muscle-svg-part.active-primary{fill:var(--acc);filter:drop-shadow(0 0 6px rgba(200,245,60,0.6));}
.muscle-svg-part.active-secondary{fill:var(--orange);filter:drop-shadow(0 0 4px rgba(255,154,60,0.4));}
.muscle-fig-label{font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-top:6px;}
.muscle-legend{display:flex;flex-direction:column;gap:8px;margin-top:8px;}
.ml-item{display:flex;align-items:center;gap:7px;font-size:11px;color:var(--text2);}
.ml-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}

/* EX DETAIL */
.ex-detail-hero{
  background:linear-gradient(135deg,rgba(200,245,60,.08),rgba(91,156,239,.06));
  border:1px solid var(--border);border-radius:var(--r-lg);padding:20px;margin-bottom:16px;
}
.ex-detail-ico{font-size:40px;margin-bottom:10px;}
.ex-detail-nm{font-size:22px;font-weight:800;letter-spacing:-.3px;margin-bottom:8px;}
.ex-detail-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;}
.ex-dtag{font-size:11px;font-weight:700;padding:4px 10px;border-radius:99px;}
.ex-detail-desc{font-size:13px;color:var(--text2);line-height:1.75;}
.ex-step-card{
  background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);
  padding:14px 16px;margin-bottom:10px;
}
.ex-step-num{
  width:26px;height:26px;border-radius:50%;background:var(--acc3);
  color:var(--acc);font-size:12px;font-weight:800;
  display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-bottom:8px;
}
.ex-step-ttl{font-size:13px;font-weight:700;margin-bottom:4px;}
.ex-step-txt{font-size:12px;color:var(--text2);line-height:1.65;}
.ex-tip-box{
  background:var(--acc4);border:1px solid rgba(200,245,60,.2);border-radius:var(--r-lg);
  padding:14px;display:flex;gap:10px;align-items:flex-start;
}
.ex-tip-ico{font-size:18px;flex-shrink:0;}
.ex-tip-txt{font-size:12px;color:var(--text2);line-height:1.65;}

/* PRESET EXPLORE CARDS */
.ep-card{
  background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);
  margin-bottom:12px;overflow:hidden;cursor:pointer;transition:all .18s;
}
.ep-card:hover{border-color:var(--border2);}
.ep-card-head{
  display:flex;align-items:center;gap:12px;padding:14px 16px;
}
.ep-card-ico{font-size:28px;}
.ep-card-info{flex:1;}
.ep-card-nm{font-size:16px;font-weight:800;letter-spacing:-.2px;}
.ep-card-sub{font-size:11px;color:var(--text2);margin-top:3px;}
.ep-card-arrow{font-size:18px;color:var(--text3);}
.ep-card-body{display:none;border-top:1px solid var(--border);}
.ep-card-body.open{display:block;}
.wp-overview{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:12px;}
.wp-title{font-size:16px;font-weight:800;letter-spacing:-.2px;margin-bottom:4px;}
.wp-sub{font-size:12px;color:var(--text2);line-height:1.6;}
.wp-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;}
.wp-meta-chip{font-size:10px;font-weight:700;padding:4px 9px;border-radius:99px;background:var(--bg4);color:var(--text2);}
.tt-filters{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:12px;}
.tt-chip{border:1px solid var(--border);background:var(--bg2);color:var(--text2);border-radius:999px;padding:7px 10px;font-size:11px;font-weight:700;cursor:pointer;}
.tt-chip.on{background:var(--acc3);border-color:var(--acc);color:var(--acc);}
.lib-head-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:12px 16px;margin:0 16px 12px;}
.lib-head-title{font-size:13px;font-weight:800;margin-bottom:4px;}
.lib-head-sub{font-size:12px;color:var(--text2);line-height:1.55;}
.fatigue-legend{display:flex;gap:10px;align-items:center;margin-top:12px;flex-wrap:wrap;}
.fatigue-dot{width:11px;height:11px;border-radius:50%;box-shadow:0 0 10px rgba(255,120,80,.45);}
.fatigue-lbl{font-size:11px;color:var(--text2);}
.ana-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.ana-card{
  background:radial-gradient(120% 120% at 50% 0%,rgba(255,255,255,.04),rgba(255,255,255,0) 45%),var(--bg2);
  border:1px solid var(--border2);border-radius:14px;padding:14px;
  box-shadow:0 10px 30px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.04);
}
.ana-ttl{font-size:10px;color:var(--text3);text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px;}
.ana-svg{width:100%;height:auto;display:block;max-height:420px;}
.ana-base{fill:#1a1b28;stroke:#2e3048;stroke-width:1.2;opacity:1;}
.ana-outline{fill:none;stroke:rgba(255,255,255,.06);stroke-width:.8;}
.muscle-part{
  stroke:rgba(255,245,238,.25);stroke-width:.8;
  transition:fill .3s ease,filter .3s ease,opacity .3s ease;
}
.muscle-part.low{opacity:.65}
.muscle-part.mid{opacity:.88}
.muscle-part.high{opacity:1;filter:drop-shadow(0 0 4px rgba(255,100,60,.5));}
@keyframes heatPulse{
  0%,100%{filter:drop-shadow(0 0 2px rgba(255,110,80,.15));}
  50%{filter:drop-shadow(0 0 7px rgba(255,110,80,.5));}
}
.muscle-part.high{animation:heatPulse 1.8s ease-in-out infinite;}

/* lib-grid always 1 col */

/* ══════════ CALENDARIO SETTIMANALE ══════════ */
.cal-card{
  background:var(--bg2);border:1px solid var(--border2);
  border-radius:var(--r-xl);margin:0 16px 14px;
  overflow:hidden;position:relative;
  box-shadow:var(--shadow-card);
}
.cal-card-top{
  padding:0;position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--acc),var(--green),var(--blue));
}
.cal-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:16px 18px 12px;
}
.cal-title-wrap{display:flex;flex-direction:column;gap:2px;}
.cal-title{font-size:14px;font-weight:800;letter-spacing:-.2px;}
.cal-subtitle{font-size:11px;color:var(--text2);}
.cal-nav{display:flex;align-items:center;gap:6px;}
.cal-nav-btn{
  background:var(--bg3);border:1px solid var(--border);border-radius:50%;
  width:28px;height:28px;display:flex;align-items:center;justify-content:center;
  cursor:pointer;font-size:14px;color:var(--text2);transition:all .15s;
  flex-shrink:0;
}
.cal-nav-btn:hover{background:var(--bg4);color:var(--text);border-color:var(--border2);}
.cal-week-label{font-size:11px;font-weight:700;color:var(--text2);min-width:60px;text-align:center;}

/* Days strip */
.cal-days{
  display:grid;grid-template-columns:repeat(7,1fr);
  padding:0 10px 10px;gap:4px;
}
.cal-day{
  display:flex;flex-direction:column;align-items:center;gap:3px;
  padding:6px 2px 8px;border-radius:var(--r);cursor:pointer;
  transition:all .15s;position:relative;
  border:1.5px solid transparent;
}
.cal-day:hover{background:var(--glass2);}
.cal-day.cal-today{
  background:rgba(200,245,60,.07);
  border-color:rgba(200,245,60,.3);
}
.cal-day.cal-selected{
  background:rgba(200,245,60,.14);
  border-color:var(--acc);
  box-shadow:0 0 0 1px var(--acc);
}
.cal-day.cal-rest{opacity:.55;}
.cal-day-lbl{font-size:9px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;}
.cal-day-num{
  font-family:'Bebas Neue',sans-serif;font-size:20px;line-height:1;
  color:var(--text);
}
.cal-day.cal-today .cal-day-num{color:var(--acc);}
.cal-day-dot{
  width:6px;height:6px;border-radius:50%;margin-top:1px;
  transition:all .2s;
}
.cal-day-done-ring{
  width:10px;height:10px;border-radius:50%;
  border:2px solid var(--green);
  position:absolute;bottom:4px;
}
.cal-day-type-chip{
  font-size:8px;font-weight:700;padding:1px 5px;border-radius:99px;
  text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;
  overflow:hidden;max-width:100%;text-overflow:ellipsis;
}

/* Detail panel */
.cal-detail{
  border-top:1px solid var(--border);
  padding:14px 18px 16px;
  animation:fadeUp .22s cubic-bezier(.22,1,.36,1) both;
}
.cal-det-day-header{
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:12px;
}
.cal-det-day-name{font-size:16px;font-weight:800;letter-spacing:-.2px;}
.cal-det-status-chip{
  font-size:10px;font-weight:700;padding:3px 10px;border-radius:99px;
}
.cal-det-workout-name{
  font-size:13px;font-weight:700;color:var(--acc);margin-bottom:8px;
  display:flex;align-items:center;gap:6px;
}
.cal-det-exercises{display:flex;flex-direction:column;gap:6px;margin-bottom:14px;}
.cal-det-ex-row{
  display:flex;align-items:center;gap:10px;
  background:var(--bg3);border-radius:var(--r-sm);padding:8px 12px;
}
.cal-det-ex-ico{font-size:14px;flex-shrink:0;}
.cal-det-ex-nm{font-size:12px;font-weight:700;flex:1;}
.cal-det-ex-sets{font-size:11px;color:var(--text2);}
.cal-start-btn{
  width:100%;padding:13px;background:var(--acc);color:#080810;border:none;
  border-radius:var(--r-lg);font-family:'Syne',sans-serif;font-size:14px;
  font-weight:800;cursor:pointer;letter-spacing:.03em;
  transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;
}
.cal-start-btn:hover{background:var(--acc2);transform:translateY(-1px);box-shadow:0 8px 24px rgba(200,245,60,.3);}
.cal-start-btn:disabled{background:var(--bg4);color:var(--text3);cursor:default;transform:none;box-shadow:none;}
.cal-rest-block{
  text-align:center;padding:16px 0;color:var(--text2);
}
.cal-rest-ico{font-size:32px;margin-bottom:6px;}

/* Training page full calendar */
.cal-full-card{
  background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-xl);
  margin:0 16px 16px;overflow:hidden;
}
.cal-month-header{
  display:flex;align-items:center;justify-content:space-between;
  padding:14px 18px;border-bottom:1px solid var(--border);
}
.cal-month-title{font-size:15px;font-weight:800;}
.cal-month-grid{
  display:grid;grid-template-columns:repeat(7,1fr);
  padding:8px;gap:3px;
}
.cal-month-day{
  display:flex;flex-direction:column;align-items:center;
  padding:6px 2px;border-radius:var(--r-sm);cursor:pointer;
  transition:background .12s;min-height:40px;
  border:1px solid transparent;
}
.cal-month-day:hover{background:var(--glass);}
.cal-month-day.today{background:rgba(200,245,60,.1);border-color:rgba(200,245,60,.3);}
.cal-month-day.has-session{position:relative;}
.cal-month-day.other-month{opacity:.3;}
.cal-month-day-n{font-size:12px;font-weight:700;color:var(--text2);}
.cal-month-day.today .cal-month-day-n{color:var(--acc);}
.cal-month-day-dot{width:5px;height:5px;border-radius:50%;margin-top:3px;}
.cal-month-header-days{
  display:grid;grid-template-columns:repeat(7,1fr);
  padding:4px 8px 0;
}
.cal-month-hd{font-size:9px;font-weight:700;color:var(--text3);text-align:center;text-transform:uppercase;padding:4px 0;}

/* Compact home calendar (allenamento section) */
.al-cal-wrap{padding:0 16px 16px;}


/* ══════════ DYNAMIC GOALS SYSTEM ══════════ */
.dg-overlay{
  position:fixed;inset:0;z-index:920;
  background:rgba(6,6,14,.92);
  backdrop-filter:blur(16px) saturate(160%);
  -webkit-backdrop-filter:blur(16px) saturate(160%);
  display:flex;align-items:flex-end;justify-content:center;
  animation:fadeIn .22s ease;
}
.dg-sheet{
  width:100%;max-width:480px;
  background:var(--bg2);
  border:1px solid var(--border2);
  border-radius:var(--r-2xl) var(--r-2xl) 0 0;
  max-height:88vh;overflow-y:auto;
  animation:slideUp .3s cubic-bezier(.22,1,.36,1) both;
  position:relative;
  padding-bottom:calc(28px + env(safe-area-inset-bottom,0px));
}
.dg-sheet::before{
  content:'';position:sticky;top:0;left:0;right:0;height:2px;display:block;
  background:linear-gradient(90deg,var(--acc),var(--green),var(--blue));
  z-index:2;
}
.dg-header{
  position:sticky;top:0;z-index:1;
  background:var(--bg2);
  padding:14px 20px 12px;
  border-bottom:1px solid var(--border);
  display:flex;align-items:center;justify-content:space-between;
}
.dg-handle{
  width:36px;height:3px;border-radius:99px;
  background:var(--border2);margin:0 auto 0;
  position:absolute;top:8px;left:50%;transform:translateX(-50%);
}
.dg-title{font-size:18px;font-weight:800;letter-spacing:-.4px;}
.dg-close{
  background:var(--bg3);border:1px solid var(--border);
  border-radius:50%;width:30px;height:30px;
  color:var(--text2);cursor:pointer;font-size:14px;
  display:flex;align-items:center;justify-content:center;
  transition:all .15s;
}
.dg-close:hover{background:var(--bg4);color:var(--text);}
.dg-body{padding:20px;}
.dg-section{margin-bottom:22px;}
.dg-section-label{
  font-size:9px;font-weight:800;color:var(--text3);
  text-transform:uppercase;letter-spacing:.12em;
  margin-bottom:12px;display:flex;align-items:center;gap:8px;
}
.dg-section-label::after{content:'';flex:1;height:1px;background:var(--border);}
.dg-field{
  background:var(--bg3);border:1.5px solid var(--border);
  border-radius:var(--r-lg);padding:14px 16px;
  margin-bottom:8px;transition:border-color .15s;
  cursor:pointer;
}
.dg-field:hover{border-color:var(--border2);}
.dg-field.focus{border-color:var(--acc);box-shadow:0 0 0 3px rgba(200,245,60,.08);}
.dg-field-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;}
.dg-field-label{font-size:10px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.08em;}
.dg-field-edit{font-size:10px;font-weight:700;color:var(--acc);}
.dg-field-val{font-size:20px;font-weight:800;color:var(--text);letter-spacing:-.3px;}
.dg-field-sub{font-size:11px;color:var(--text2);margin-top:2px;}
.dg-field-input{
  width:100%;background:transparent;border:none;outline:none;
  font-family:'Syne',sans-serif;font-size:20px;font-weight:800;
  color:var(--text);letter-spacing:-.3px;
  -moz-appearance:textfield;
}
.dg-field-input::-webkit-outer-spin-button,
.dg-field-input::-webkit-inner-spin-button{-webkit-appearance:none;}

/* Insight banners */
.dg-insight{
  border-radius:var(--r-lg);padding:12px 14px;
  display:flex;align-items:flex-start;gap:10px;
  margin-bottom:8px;
  animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both;
}
.dg-insight.warn{
  background:linear-gradient(135deg,rgba(255,154,60,.09),rgba(255,92,106,.05));
  border:1px solid rgba(255,154,60,.28);
}
.dg-insight.ok{
  background:linear-gradient(135deg,rgba(62,223,138,.08),rgba(200,245,60,.05));
  border:1px solid rgba(62,223,138,.25);
}
.dg-insight.info{
  background:linear-gradient(135deg,rgba(91,156,239,.09),rgba(168,126,248,.05));
  border:1px solid rgba(91,156,239,.25);
}
.dg-insight-ico{font-size:18px;flex-shrink:0;line-height:1.3;}
.dg-insight-body{}
.dg-insight-title{font-size:11px;font-weight:800;margin-bottom:2px;}
.dg-insight.warn .dg-insight-title{color:var(--orange);}
.dg-insight.ok   .dg-insight-title{color:var(--green);}
.dg-insight.info .dg-insight-title{color:var(--blue);}
.dg-insight-txt{font-size:11px;color:var(--text2);line-height:1.55;}
.dg-insight-action{
  display:inline-block;margin-top:6px;
  font-size:10px;font-weight:700;color:var(--acc);cursor:pointer;
  text-decoration:underline;text-underline-offset:2px;
}

/* Progress bar inside field */
.dg-progress-row{margin-top:8px;}
.dg-prog-bar{height:5px;background:var(--bg4);border-radius:99px;overflow:hidden;}
.dg-prog-fill{height:100%;border-radius:99px;background:linear-gradient(90deg,var(--acc),var(--green));transition:width .7s cubic-bezier(.22,1,.36,1);}
.dg-prog-labels{display:flex;justify-content:space-between;margin-top:4px;}
.dg-prog-lbl{font-size:9px;color:var(--text3);font-weight:700;}

/* Goal objective chips */
.dg-obj-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;}
.dg-obj-chip{
  padding:12px 10px;border-radius:var(--r-lg);
  background:var(--bg3);border:1.5px solid var(--border);
  cursor:pointer;transition:all .15s;text-align:center;
  font-family:'Syne',sans-serif;
}
.dg-obj-chip:active{transform:scale(.95);}
.dg-obj-chip.sel{border-color:var(--acc);background:var(--acc4);}
.dg-obj-chip-ico{font-size:20px;margin-bottom:4px;}
.dg-obj-chip-nm{font-size:12px;font-weight:700;color:var(--text);}
.dg-obj-chip.sel .dg-obj-chip-nm{color:var(--acc);}
.dg-obj-chip-sub{font-size:10px;color:var(--text3);margin-top:2px;}

/* Frequency stepper */
.dg-freq-row{display:flex;align-items:center;gap:12px;}
.dg-freq-btn{
  width:40px;height:40px;border-radius:50%;
  background:var(--bg3);border:1.5px solid var(--border);
  font-size:20px;color:var(--text);cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .15s;flex-shrink:0;
}
.dg-freq-btn:hover{border-color:var(--acc);color:var(--acc);}
.dg-freq-btn:active{transform:scale(.88);}
.dg-freq-val{
  font-family:'Bebas Neue',sans-serif;font-size:36px;
  color:var(--acc);flex:1;text-align:center;line-height:1;
}
.dg-freq-label{font-size:11px;color:var(--text2);text-align:center;margin-top:2px;}

/* Inline goals widget (home/profile) */
.dg-mini-card{
  background:var(--bg2);border:1px solid var(--border2);
  border-radius:var(--r-xl);margin:0 16px 14px;overflow:hidden;
}
.dg-mini-hdr{
  padding:12px 16px 10px;
  display:flex;align-items:center;justify-content:space-between;
  border-bottom:1px solid var(--border);
}
.dg-mini-title{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.09em;color:var(--text2);}
.dg-mini-edit{
  font-size:11px;font-weight:700;color:var(--acc);
  cursor:pointer;background:none;border:none;
  font-family:'Syne',sans-serif;padding:0;
}
.dg-mini-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0;}
.dg-mini-stat{
  padding:12px 14px;
  border-right:1px solid var(--border);
  border-bottom:1px solid var(--border);
}
.dg-mini-stat:nth-child(2n){border-right:none;}
.dg-mini-stat:nth-last-child(-n+2){border-bottom:none;}
.dg-mini-stat-label{font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.07em;font-weight:700;margin-bottom:4px;}
.dg-mini-stat-val{font-size:16px;font-weight:800;color:var(--text);letter-spacing:-.3px;}
.dg-mini-stat-sub{font-size:10px;color:var(--text2);margin-top:2px;}
.dg-mini-insights{padding:12px 14px;border-top:1px solid var(--border);}

/* Save button */
.dg-save{
  width:calc(100% - 32px);margin:0 16px;
  padding:15px;border:none;border-radius:var(--r-lg);
  font-family:'Syne',sans-serif;font-size:15px;font-weight:800;
  cursor:pointer;letter-spacing:.04em;
  background:var(--acc);color:#06060E;
  box-shadow:0 4px 24px rgba(200,245,60,.25);
  transition:all .15s;
}
.dg-save:hover{background:var(--acc2);transform:translateY(-1px);}
.dg-save:active{transform:scale(.98);}

/* ═══ LIGHT THEME — complete variable overrides ═══ */
body.light-theme {
  --bg:#F4F4F0;--bg2:#FFFFFF;--bg3:#EBEBEB;--bg4:#E0E0DC;--bg5:#D4D4D0;
  --glass:rgba(0,0,0,0.03);--glass2:rgba(0,0,0,0.06);
  --border:rgba(0,0,0,0.08);--border2:rgba(0,0,0,0.14);--border3:rgba(0,0,0,0.22);
  --text:#1A1A1A;--text2:#5A5A5A;--text3:#9A9A9A;
  --shadow-card:0 4px 28px rgba(0,0,0,0.10);
  --shadow-sm:0 2px 10px rgba(0,0,0,0.08);
  --shadow-acc:0 0 32px rgba(160,200,24,0.18);
  color-scheme: light;
}
/* Fix hardcoded dark backgrounds in light mode */
body.light-theme .screen { background: var(--bg); }
body.light-theme .glass-card { background: rgba(255,255,255,0.85); }
body.light-theme .pres-card { background: linear-gradient(150deg,#FFFFFF 0%,#F4F4F0 100%); }
body.light-theme .home-header { background: rgba(244,244,240,0.85); border-bottom-color: var(--border); }
body.light-theme .stat-tile { background: linear-gradient(160deg,#FFFFFF,#EBEBEB); }
body.light-theme .ob-card { background: var(--bg3); }
body.light-theme .ob-card.sel { background: rgba(160,200,24,0.08); }
body.light-theme .cta-banner.has-prog { background: linear-gradient(135deg,rgba(160,200,24,.10),rgba(62,180,100,.05)); }
body.light-theme .cta-banner.no-prog { background: var(--bg2); }
body.light-theme .app-content { background: var(--bg); }
body.light-theme #scr-onboard { background: var(--bg); }
body.light-theme .ob-inp { background: var(--bg2); }
body.light-theme .tdee-inp { background: var(--bg2); }
body.light-theme .home-workout-section { background: var(--bg2); }
body.light-theme .wo-ovl { background: var(--bg); }
/* Fix text contrast issues in light mode */
body.light-theme .stat-l { color: var(--text3); }
body.light-theme .bni-lbl { color: var(--text3); }
body.light-theme .bni-ico { filter: grayscale(20%) opacity(0.75); }
body.light-theme .bni.on .bni-ico { filter: none; }
/* Fix cards with hardcoded dark colors */
body.light-theme [style*="background:var(--bg3)"] { background: var(--bg3); }
body.light-theme .health-card { background: var(--bg2); }
body.light-theme .health-tile { background: var(--bg3); }
body.light-theme .recipe-card { background: var(--bg2); }
body.light-theme .rf-chip { background: var(--bg2); }
/* Fix workout overlay */
body.light-theme .workout-action-btn { background: var(--acc); color: #080810; }
/* Input/select in light mode */
body.light-theme input, body.light-theme select, body.light-theme textarea {
  background: var(--bg2);
  color: var(--text);
  border-color: var(--border2);
}
/* Fix modals/sheets */
body.light-theme .v21-panel { background: var(--bg2); }
body.light-theme .dg-sheet { background: var(--bg2); }
/* Topbar / header in light mode */
body.light-theme .topbar { background: rgba(244,244,240,0.92); border-bottom: 1px solid var(--border); }
/* Fix splash screen */
body.light-theme #scr-splash { 
  background: radial-gradient(ellipse 60% 40% at 50% 30%, rgba(160,200,24,.14) 0%, transparent 60%), var(--bg);
}
/* Fix google login screen */
body.light-theme #scr-google-login { background: var(--bg); }
body.light-theme .bnav{background:rgba(244,244,240,.95);}
body.light-theme .topbar{background:rgba(244,244,240,.92);}
body.light-theme .ana-base{fill:#E8E8E4;stroke:#D0D0CC;}
body.light-theme .muscle-svg-part{stroke:rgba(0,0,0,.2);}

.theme-toggle{
  width:44px;height:24px;border-radius:99px;border:none;cursor:pointer;
  background:var(--bg4);position:relative;transition:background .25s;flex-shrink:0;
}
.theme-toggle::after{
  content:'';position:absolute;width:18px;height:18px;border-radius:50%;
  background:var(--acc);top:3px;left:3px;
  transition:transform .25s cubic-bezier(.22,1,.36,1);
}
body.light-theme .theme-toggle::after{transform:translateX(20px);}

/* WEIGHT CHART (diario peso) */
.weight-chart-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin:0 16px 14px;}
.wc-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;}
.wc-title{font-size:13px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.07em;}
.wc-current{font-family:'Bebas Neue',sans-serif;font-size:32px;color:var(--acc);line-height:1;}
.wc-unit{font-size:12px;color:var(--text2);}
.wc-delta{font-size:12px;font-weight:700;margin-top:2px;}
.wc-graph{position:relative;height:100px;margin-top:8px;}
.wc-svg{width:100%;height:100%;overflow:visible;}
.wc-line{fill:none;stroke:var(--acc);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.wc-area{fill:url(#wc-grad);opacity:.35;}
.wc-dot{fill:var(--acc);cursor:pointer;transition:r .15s;}
.wc-dot:hover{r:5;}
.wc-labels{display:flex;justify-content:space-between;margin-top:6px;}
.wc-lbl{font-size:9px;color:var(--text3);}
.wc-add-btn{
  display:flex;align-items:center;justify-content:center;gap:6px;
  margin-top:12px;padding:10px;border-radius:var(--r);
  border:1.5px dashed var(--border2);background:transparent;
  color:var(--text2);font-size:13px;font-weight:700;cursor:pointer;
  font-family:'Syne',sans-serif;transition:all .15s;
}
.wc-add-btn:hover{border-color:var(--acc);color:var(--acc);background:var(--acc4);}

/* CORPO & SALUTE (profile tab) */
.health-card{background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);padding:18px;margin:0 16px 12px;}
.health-title{font-size:15px;font-weight:800;margin-bottom:14px;}
.bmi-wrap{display:flex;align-items:center;gap:16px;margin-bottom:16px;}
.bmi-circle{
  width:80px;height:80px;border-radius:50%;flex-shrink:0;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  border:3px solid var(--border2);
}
.bmi-val{font-family:'Bebas Neue',sans-serif;font-size:28px;line-height:1;}
.bmi-lbl-sm{font-size:9px;color:var(--text2);text-transform:uppercase;letter-spacing:.06em;margin-top:2px;}
.bmi-info{flex:1;}
.bmi-cat{font-size:15px;font-weight:800;margin-bottom:4px;}
.bmi-range{font-size:12px;color:var(--text2);line-height:1.6;}
.bmi-bar-track{height:8px;border-radius:99px;background:linear-gradient(90deg,#5B9CEF,#3EDF8A,#FF9A3C,#FF5C6A);margin-top:10px;position:relative;overflow:visible;}
.bmi-marker{position:absolute;top:-4px;width:16px;height:16px;border-radius:50%;background:var(--text);border:2px solid var(--bg2);transform:translateX(-50%);transition:left .6s cubic-bezier(.22,1,.36,1);}
.health-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;}
.health-tile{flex:1;min-width:120px;background:var(--bg3);border-radius:var(--r);padding:12px 14px;}
.ht-ico{font-size:20px;margin-bottom:6px;}
.ht-val{font-size:17px;font-weight:800;margin-bottom:2px;}
.ht-lbl{font-size:11px;color:var(--text2);}
.health-advice{background:var(--acc4);border:1px solid rgba(200,245,60,.2);border-radius:var(--r);padding:12px 14px;font-size:12px;color:var(--text2);line-height:1.7;}

/* RICETTE */
.ricette-page-head{padding:20px 18px 14px;display:flex;align-items:flex-end;justify-content:space-between;}
.ricette-title{font-size:28px;font-weight:800;letter-spacing:-.5px;}
.ricette-filters{display:flex;flex-wrap:nowrap;gap:8px;padding:0 16px 14px;overflow-x:auto;scrollbar-width:none;}
.ricette-filters::-webkit-scrollbar{display:none;}
.rf-chip{border:1.5px solid var(--border);background:var(--bg2);color:var(--text2);border-radius:999px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;transition:all .15s;flex-shrink:0;}
.rf-chip.on{background:rgba(200,245,60,0.15);border-color:var(--acc);color:var(--acc);box-shadow:0 0 12px rgba(200,245,60,0.1);}
.recipe-card{
  background:var(--bg2);border:1px solid var(--border);border-radius:var(--r-lg);
  margin:0 16px 12px;overflow:hidden;cursor:pointer;transition:all .18s;
}
.recipe-card:hover{border-color:var(--border2);transform:translateY(-1px);box-shadow:0 4px 20px rgba(0,0,0,0.3);}
.recipe-card:active{transform:scale(.98);}
.recipe-head{padding:16px;display:flex;align-items:flex-start;gap:12px;}
.recipe-ico{font-size:36px;flex-shrink:0;}
.recipe-info{flex:1;}
.recipe-name{font-size:16px;font-weight:800;letter-spacing:-.2px;margin-bottom:4px;}
.recipe-tags{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:6px;}
.recipe-tag{font-size:10px;font-weight:700;padding:2px 8px;border-radius:99px;}
.recipe-desc{font-size:12px;color:var(--text2);line-height:1.55;}
.recipe-macros{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--border);padding:10px 14px;}
.recipe-macro{text-align:center;}
.recipe-macro-val{font-size:14px;font-weight:800;}
.recipe-macro-lbl{font-size:9px;color:var(--text2);text-transform:uppercase;letter-spacing:.05em;margin-top:2px;}
.recipe-body{display:none;border-top:1px solid var(--border);padding:16px;animation:fadeUp .25s ease;}
.recipe-body.open{display:block;}
.recipe-ingredients{margin-bottom:14px;}
.ri-title{font-size:11px;font-weight:700;color:var(--text2);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;}
.ri-item{font-size:13px;color:var(--text2);padding:5px 0;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;}
.ri-item:last-child{border-bottom:none;}
.ri-dot{width:6px;height:6px;border-radius:50%;background:var(--acc);flex-shrink:0;}
.rs-step{display:flex;gap:10px;margin-bottom:10px;align-items:flex-start;}
.rs-num{width:24px;height:24px;border-radius:50%;background:var(--acc3);color:var(--acc);font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.rs-txt{font-size:13px;color:var(--text2);line-height:1.6;}

/* WORKOUT TIMER enhanced */
.wo-progress-bar{height:3px;background:var(--bg4);margin-bottom:12px;border-radius:99px;overflow:hidden;}
.wo-progress-fill{height:100%;background:linear-gradient(90deg,var(--acc),var(--green));border-radius:99px;transition:width .3s ease;}
.wo-pct-label{font-size:11px;color:var(--text2);text-align:right;margin-bottom:8px;}

/* TDEE new fields */
.ob-section-label{
  font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
  color:var(--acc);margin:16px 0 8px;
  display:flex;align-items:center;gap:8px;
}
.ob-section-label::after{content:'';flex:1;height:1px;background:var(--border2);}

/* PROFILE PAGE */
.profile-tabs{display:flex;gap:6px;padding:0 16px 16px;}
.ptab{border:1px solid var(--border);background:var(--bg2);color:var(--text2);border-radius:99px;padding:8px 16px;font-size:12px;font-weight:700;cursor:pointer;transition:all .15s;font-family:'Syne',sans-serif;}
.ptab.on{background:var(--acc3);border-color:var(--acc);color:var(--acc);}
.profile-section{display:none;}
.profile-section.active{display:block;}
.pr-row{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid var(--border);cursor:pointer;transition:background .12s;gap:10px;}
.pr-row:last-child{border-bottom:none;}
.pr-row:hover{background:var(--glass);}
.pr-row:active{background:var(--bg3);}
.pr-row-lbl{font-size:14px;font-weight:700;color:var(--text);flex:1;}
.pr-row-val{font-size:13px;color:var(--text2);font-weight:600;text-align:right;flex-shrink:0;max-width:55%;}
.pr-row-val.acc{color:var(--acc);}
/* Settings panel inline */
.sp-section-title{font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.1em;padding:0 2px;margin-bottom:8px;margin-top:4px;}
.sp-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 14px;border-bottom:1px solid var(--border);background:var(--bg2);}
.sp-row:first-of-type{border-radius:var(--r-lg) var(--r-lg) 0 0;}
.sp-row:last-of-type{border-radius:0 0 var(--r-lg) var(--r-lg);border-bottom:none;}
.sp-lbl{font-size:13px;font-weight:600;color:var(--text);flex-shrink:0;}
.sp-inp{background:var(--bg3);border:1.5px solid var(--border);border-radius:var(--r-sm);padding:8px 10px;font-size:13px;font-family:'DM Mono',monospace;color:var(--text);outline:none;transition:border-color .15s;min-width:0;flex:1;text-align:right;max-width:160px;}
.sp-inp:focus{border-color:var(--acc);}
select.sp-inp{text-align:left;font-family:'Syne',sans-serif;max-width:175px;appearance:none;cursor:pointer;}
.sp-macro-lbl{font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px;}


/* ADD WEIGHT MODAL */
.add-weight-modal{
  display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:300;
  backdrop-filter:blur(8px);align-items:center;justify-content:center;
}
.add-weight-modal.open{display:flex;animation:fadeIn .2s ease both;}
.awm-box{
  background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r-xl);
  padding:24px;width:calc(100% - 40px);max-width:340px;
  animation:fadeUp .3s cubic-bezier(.22,1,.36,1) both;
}
.awm-title{font-size:18px;font-weight:800;margin-bottom:16px;}
.awm-inp{
  width:100%;background:var(--bg3);border:1.5px solid var(--border);border-radius:var(--r);
  padding:14px 18px;font-size:24px;font-family:'Bebas Neue',sans-serif;
  color:var(--acc);outline:none;text-align:center;margin-bottom:16px;
  transition:border-color .15s;
}
.awm-inp:focus{border-color:var(--acc);}
.awm-row{display:flex;gap:10px;}

/* ══════════════════════════════
   v45 Premium Design
══════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   FITTRACK V45 — PREMIUM DESIGN OVERHAUL
   Apple Health + Modern Fitness App aesthetic
   Improves: typography, spacing, cards, nav, animations, colors
   Does NOT change functionality
═══════════════════════════════════════════════════════════════ */

/* ── ENHANCED DESIGN TOKENS ── */
:root {
  /* Refined backgrounds — slightly warmer, less stark */
  --bg:    #07070F;
  --bg2:   #0C0C1A;
  --bg3:   #121220;
  --bg4:   #191928;
  --bg5:   #212134;

  /* Softer, more premium borders */
  --border:  rgba(255,255,255,0.055);
  --border2: rgba(255,255,255,0.10);
  --border3: rgba(255,255,255,0.18);

  /* Text — slightly warmer */
  --text:  #F0EDE8;
  --text2: #7A7890;
  --text3: #42404F;

  /* Accent — same lime but with better support tones */
  --acc:   #C8F53C;
  --acc2:  #B0D830;
  --acc3:  rgba(200,245,60,0.09);
  --acc4:  rgba(200,245,60,0.05);

  /* Enhanced semantic colors */
  --green:  #34D680;
  --green-d: rgba(52,214,128,0.12);
  --blue:   #4E8FE8;
  --blue-d: rgba(78,143,232,0.12);
  --orange: #F59432;
  --orange-d: rgba(245,148,50,0.12);
  --red:    #F05060;
  --red-d:  rgba(240,80,96,0.10);
  --purple: #9B6EF0;
  --purple-d: rgba(155,110,240,0.12);

  /* Enhanced radius system */
  --r:     12px;
  --r-sm:  8px;
  --r-md:  14px;
  --r-lg:  20px;
  --r-xl:  26px;
  --r-2xl: 34px;

  /* Premium shadows */
  --shadow-card:   0 2px 20px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.04) inset;
  --shadow-raised: 0 8px 32px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.05) inset;
  --shadow-acc:    0 0 28px rgba(200,245,60,0.12);
  --shadow-sm:     0 2px 12px rgba(0,0,0,0.4);

  /* Spacing */
  --px: 18px;
  --card-gap: 10px;
}

/* ── BASE TYPOGRAPHY REFINEMENT ── */
body { 
  font-family: -apple-system, 'SF Pro Display', 'Syne', sans-serif;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.01em;
}
h1, h2, h3, .font-display {
  font-family: 'Syne', -apple-system, sans-serif;
  font-weight: 800;
  letter-spacing: -0.04em;
}

/* ── ENHANCED ANIMATIONS ── */
@keyframes fadeUpPremium {
  from { opacity:0; transform:translateY(14px) scale(0.99); }
  to   { opacity:1; transform:translateY(0)    scale(1); }
}
@keyframes slideUpPremium {
  from { transform:translateY(100%) scale(0.98); opacity:0; }
  to   { transform:translateY(0)    scale(1);    opacity:1; }
}
@keyframes tapRipple {
  from { opacity:0.12; transform:scale(0.6); }
  to   { opacity:0;    transform:scale(2.8); }
}
@keyframes checkmark {
  0%   { transform:scale(0) rotate(-20deg); opacity:0; }
  60%  { transform:scale(1.2) rotate(4deg); opacity:1; }
  100% { transform:scale(1)   rotate(0deg); opacity:1; }
}
@keyframes numberTick {
  from { transform:translateY(8px); opacity:0; }
  to   { transform:translateY(0);   opacity:1; }
}
@keyframes shimmerPremium {
  0%   { background-position:-200% center; }
  100% { background-position: 200% center; }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOP BAR — cleaner, more premium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.topbar {
  padding: calc(14px + var(--safe-top)) var(--px) 14px;
  background: rgba(7,7,15,0.88);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border-bottom: 1px solid rgba(255,255,255,0.055);
  box-shadow: 0 1px 0 rgba(0,0,0,0.5);
}
.tb-logo {
  font-family: 'Syne', sans-serif;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: var(--text);
}
.tb-badge {
  font-size: 9px;
  font-weight: 800;
  padding: 3px 9px;
  border-radius: 99px;
  background: var(--acc3);
  color: var(--acc);
  border: 1px solid rgba(200,245,60,0.18);
  letter-spacing: 0.05em;
}
.tb-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--acc), var(--green));
  font-size: 14px;
  font-weight: 800;
  color: #060610;
  box-shadow: 0 0 0 2px rgba(200,245,60,0.18), var(--shadow-sm);
  transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
}
.tb-avatar:active { transform: scale(0.9); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BOTTOM NAV — Apple-style elevated
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.bnav {
  background: rgba(7,7,15,0.92);
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border-top: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 -20px 60px rgba(0,0,0,0.5);
  height: calc(68px + var(--safe-bot));
  padding-bottom: var(--safe-bot);
}
.bni {
  padding: 9px 12px 7px;
  border-radius: 14px;
  transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
  min-width: 50px;
  gap: 4px;
}
.bni:active { transform: scale(0.84); }
.bni-ico {
  font-size: 21px;
  line-height: 1;
  transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), filter 0.22s;
  filter: grayscale(40%) opacity(0.55);
}
.bni-lbl {
  font-size: 8px;
  font-weight: 700;
  color: var(--text3);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: color 0.2s, opacity 0.2s;
  opacity: 0.6;
}
.bni.on { background: rgba(200,245,60,0.06); }
.bni.on .bni-ico {
  transform: scale(1.15) translateY(-1px);
  filter: grayscale(0%) opacity(1) drop-shadow(0 0 6px rgba(200,245,60,0.4));
}
.bni.on .bni-lbl {
  color: var(--acc);
  font-weight: 800;
  opacity: 1;
}
.bni.on::before {
  content: '';
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 22px; height: 2.5px;
  background: var(--acc);
  border-radius: 0 0 4px 4px;
  box-shadow: 0 0 12px rgba(200,245,60,0.6);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE HEADERS — consistent premium style
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.al-head, .nutr-head, .prog-head, .coach-head {
  padding: 22px var(--px) 14px;
}
.al-title, .nutr-title, .prog-title, .coach-title {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1.1;
}
.coach-sub { font-size: 13px; color: var(--text2); margin-top: 4px; line-height: 1.5; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOME PAGE — premium dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.home-hero { padding: 20px var(--px) 10px; }
.home-greet { font-size: 13px; color: var(--text2); font-weight: 500; letter-spacing: 0; margin-bottom: 3px; }
.home-name  { font-size: 30px; font-weight: 800; letter-spacing: -0.06em; line-height: 1.1; }
.home-name em { color: var(--acc); font-style: normal; }

/* CTA Banner — elevated */
.cta-banner {
  margin: 14px var(--px) 0;
  border-radius: var(--r-xl);
  padding: 20px;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s;
}
.cta-banner:active { transform: scale(0.99); }
.cta-banner.has-prog {
  background: linear-gradient(145deg, rgba(200,245,60,0.08), rgba(62,214,128,0.04));
  border: 1.5px solid rgba(200,245,60,0.22);
  box-shadow: var(--shadow-card), var(--shadow-acc);
}
.cta-banner.has-prog::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, var(--acc), var(--green));
  box-shadow: 0 0 14px rgba(200,245,60,0.5);
}
.cta-banner.no-prog {
  background: var(--bg2);
  border: 1.5px solid var(--border2);
  box-shadow: var(--shadow-card);
}
.cta-eyebrow {
  font-size: 9px; font-weight: 800; text-transform: uppercase;
  letter-spacing: 0.14em; margin-bottom: 6px; color: var(--acc);
}
.cta-prog-name { font-size: 20px; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 4px; }
.cta-day-info  { font-size: 12px; color: var(--text2); margin-bottom: 16px; line-height: 1.6; }
.cta-btn-main {
  border-radius: var(--r-md);
  padding: 14px;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.02em;
  transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1);
}
.cta-btn-main.accent {
  background: var(--acc);
  color: #060610;
  box-shadow: 0 4px 22px rgba(200,245,60,0.28), 0 1px 0 rgba(255,255,255,0.18) inset;
}
.cta-btn-main.accent:hover {
  background: var(--acc2);
  transform: translateY(-1px);
  box-shadow: 0 8px 30px rgba(200,245,60,0.36);
}
.cta-btn-main.accent:active { transform: scale(0.97); box-shadow: 0 2px 12px rgba(200,245,60,0.2); }
.cta-btn-main.ghost {
  background: var(--bg3);
  border: 1.5px solid var(--border2);
  color: var(--text);
}
.cta-btn-main.ghost:hover { border-color: var(--acc); color: var(--acc); }

/* Stats strip — cleaner grid */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 8px;
  padding: 14px var(--px);
}
.stat-tile {
  background: linear-gradient(160deg, var(--bg3), var(--bg4));
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 14px 8px;
  text-align: center;
  box-shadow: var(--shadow-card);
  transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
}
.stat-tile:active { transform: scale(0.95); }
.stat-v {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 28px;
  color: var(--acc);
  line-height: 1;
  text-shadow: 0 0 18px rgba(200,245,60,0.22);
  animation: numberTick 0.4s ease both;
}
.stat-l {
  font-size: 8px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.09em;
  margin-top: 5px;
  font-weight: 700;
}

/* Section labels */
.sec-lbl {
  font-size: 9px;
  font-weight: 800;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.13em;
  padding: 0 var(--px);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.sec-lbl::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CARDS — premium glass system
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.glass-card {
  background: linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
  border: 1px solid var(--border2);
  border-radius: var(--r-xl);
  padding: 20px;
  margin: 0 var(--px) var(--card-gap);
  box-shadow: var(--shadow-card);
  transition: border-color 0.22s, box-shadow 0.22s, transform 0.18s;
}
.glass-card:hover {
  border-color: var(--border3);
  box-shadow: var(--shadow-raised);
}
.card-hdr { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.card-hdr-l { font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:0.1em; color:var(--text2); }
.card-hdr-r { font-size:12px; font-weight:700; color:var(--acc); cursor:pointer; }
.card-hdr-r:hover { text-decoration: underline; }

/* Session cards */
.sess-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 16px var(--px);
  margin: 0 var(--px) 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  box-shadow: var(--shadow-card);
}
.sess-card:hover {
  border-color: var(--border2);
  transform: translateY(-2px);
  box-shadow: var(--shadow-raised);
}
.sess-card:active { transform: scale(0.98) translateY(0); }
.sess-name { font-size: 16px; font-weight: 800; letter-spacing: -0.03em; }
.sess-date { font-size: 11px; color: var(--text2); margin-top: 2px; }
.sc { 
  font-size: 10px; font-weight: 700; padding: 4px 10px;
  border-radius: 99px; border: 1px solid var(--border);
  background: var(--bg4); color: var(--text2);
  transition: all 0.15s;
}
.sc.hi { color: var(--acc); border-color: rgba(200,245,60,0.2); background: var(--acc4); }

/* Preset cards */
.pres-card {
  background: linear-gradient(150deg, var(--bg3), var(--bg4));
  border: 1px solid var(--border2);
  border-radius: var(--r-xl);
  padding: 20px;
  margin-bottom: var(--card-gap);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
  box-shadow: var(--shadow-card);
}
.pres-card:hover {
  border-color: var(--border3);
  transform: translateY(-3px);
  box-shadow: var(--shadow-raised);
}
.pres-card:active { transform: scale(0.98); }
.pres-stripe { position:absolute; top:0; left:0; right:0; height:3px; border-radius:var(--r-xl) var(--r-xl) 0 0; }
.pres-ico { font-size: 32px; margin-bottom: 12px; display:block; }
.pres-nm  { font-size: 17px; font-weight: 800; letter-spacing: -0.04em; margin-bottom: 6px; }
.pres-desc{ font-size: 12px; color: var(--text2); line-height: 1.7; margin-bottom: 14px; }
.pres-tags{ display:flex; gap:5px; flex-wrap:wrap; margin-bottom: 14px; }
.ptag { 
  font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 99px;
}
.pres-btn {
  width: 100%;
  padding: 13px;
  background: var(--acc);
  color: #060610;
  border: none;
  border-radius: var(--r-md);
  font-weight: 800;
  font-size: 13px;
  cursor: pointer;
  letter-spacing: 0.03em;
  transition: all 0.18s;
  box-shadow: 0 3px 16px rgba(200,245,60,0.22);
}
.pres-btn:hover { background: var(--acc2); box-shadow: 0 6px 22px rgba(200,245,60,0.32); }
.pres-btn:active { transform: scale(0.97); }

/* Rec banner */
.rec-banner {
  background: linear-gradient(135deg, rgba(200,245,60,0.07), rgba(52,214,128,0.04));
  border: 1px solid rgba(200,245,60,0.2);
  border-radius: var(--r-xl);
  padding: 20px;
  margin-bottom: 14px;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-card), var(--shadow-acc);
}
.rec-banner::before {
  content: '';
  position: absolute; top:0; left:0; right:0; height:2px;
  background: linear-gradient(90deg, var(--acc), var(--green));
}
.rec-btn {
  background: var(--acc); color: #060610; border: none;
  border-radius: var(--r-md); padding: 12px 22px;
  font-weight: 800; font-size: 13px; cursor: pointer;
  letter-spacing: 0.03em; transition: all 0.18s;
  box-shadow: 0 3px 16px rgba(200,245,60,0.22);
}
.rec-btn:hover { background: var(--acc2); }
.rec-btn:active { transform: scale(0.97); }

/* Coach cards */
.coach-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 16px var(--px);
  margin: 0 var(--px) 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  box-shadow: var(--shadow-card);
  position: relative; overflow: hidden;
}
.coach-card:hover {
  border-color: var(--border2);
  transform: translateY(-2px);
  box-shadow: var(--shadow-raised);
}
.coach-card:active { transform: scale(0.98); }
.coach-card::before {
  content: '';
  position: absolute; left:0; top:0; bottom:0; width:3px;
  opacity: 0; transition: opacity 0.2s;
}
.coach-card:hover::before { opacity: 1; }
.cc-nm { font-size: 15px; font-weight: 800; letter-spacing: -0.02em; }
.cc-tag { font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 99px; text-transform: uppercase; letter-spacing: 0.04em; }
.cc-desc { font-size: 12px; color: var(--text2); line-height: 1.65; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BUTTONS — refined system
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.btn {
  padding: 14px 28px;
  border-radius: 99px;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  border: none;
  transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1);
  letter-spacing: 0.03em;
  user-select: none;
  position: relative;
  overflow: hidden;
}
.btn:active { transform: scale(0.95); }
.btn-acc {
  background: var(--acc);
  color: #060610;
  box-shadow: 0 4px 22px rgba(200,245,60,0.28), 0 1px 0 rgba(255,255,255,0.18) inset;
}
.btn-acc:hover { background: var(--acc2); transform: translateY(-1px); box-shadow: 0 8px 30px rgba(200,245,60,0.36); }
.btn-ghost {
  background: transparent;
  border: 1.5px solid var(--border2);
  color: var(--text2);
}
.btn-ghost:hover { color: var(--text); border-color: var(--border3); }
.btn-sm { padding: 9px 18px; font-size: 12px; }
.btn-full { width: 100%; text-align: center; }
.btn-danger { background: var(--red-d); color: var(--red); border: 1px solid rgba(240,80,96,0.2); }
.btn-nuova {
  background: var(--acc);
  color: #060610;
  font-weight: 800;
  font-size: 14px;
  padding: 16px;
  border-radius: var(--r-lg);
  border: none;
  cursor: pointer;
  width: calc(100% - var(--px)*2);
  margin: 0 var(--px) 18px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1);
  letter-spacing: 0.03em;
  box-shadow: 0 4px 24px rgba(200,245,60,0.22), 0 1px 0 rgba(255,255,255,0.15) inset;
}
.btn-nuova:hover { box-shadow: 0 8px 32px rgba(200,245,60,0.32); transform: translateY(-1px); }
.btn-nuova:active { transform: scale(0.98); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WORKOUT SCREEN — focused, clean
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.wo-ex-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  margin: 0 var(--px) 10px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-shadow: var(--shadow-card);
}
.wo-ex-card.done-all { border-color: rgba(52,214,128,0.3); background: rgba(52,214,128,0.03); }
.wo-ex-hd {
  display: flex; align-items: center; gap: 12px;
  padding: 14px var(--px);
  cursor: pointer;
  transition: background 0.12s;
}
.wo-ex-hd:hover { background: var(--glass); }
.wo-ex-nm {
  font-size: 16px; font-weight: 800; letter-spacing: -0.03em; flex: 1;
  word-break: break-word; overflow-wrap: break-word; min-width: 0;
  white-space: normal; line-height: 1.25;
}
.wo-set-row {
  display: flex; align-items: center; gap: 10px;
  padding: 10px var(--px) 10px calc(var(--px) + 8px);
  border-top: 1px solid var(--border);
  transition: background 0.12s;
}
.wo-set-row.done { background: rgba(200,245,60,0.04); }
.wo-set-chk {
  width: 28px; height: 28px;
  border-radius: 8px;
  border: 2px solid var(--border2);
  background: var(--bg4);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.18s cubic-bezier(0.34,1.56,0.64,1);
  flex-shrink: 0;
}
.wo-set-chk.done {
  background: var(--acc);
  border-color: var(--acc);
  color: #060610;
  animation: checkmark 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
}
.wo-set-inp {
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--r-sm);
  padding: 8px 10px;
  font-size: 14px;
  font-family: 'DM Mono', monospace;
  color: var(--text);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  text-align: center;
  width: 72px;
}
.wo-set-inp:focus {
  border-color: var(--acc);
  box-shadow: 0 0 0 3px rgba(200,245,60,0.1);
}

/* Rest timer modal */
#rest-modal {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}
.rest-sheet {
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: var(--r-2xl) var(--r-2xl) 0 0;
  box-shadow: 0 -20px 60px rgba(0,0,0,0.6);
}
.rest-timer-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 80px;
  color: var(--acc);
  text-align: center;
  line-height: 1;
  text-shadow: 0 0 40px rgba(200,245,60,0.3);
  letter-spacing: -2px;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NUTRITION — clean and scannable
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.riepilogo {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r-xl);
  padding: 20px;
  margin: 0 var(--px) var(--card-gap);
  box-shadow: var(--shadow-card);
  position: relative; overflow: hidden;
}
.riepilogo::before {
  content: '';
  position: absolute; top:0; left:0; right:0; height:2px;
  background: linear-gradient(90deg, var(--acc), var(--green), var(--blue));
}
.rk-num {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 56px;
  color: var(--acc);
  line-height: 1;
  text-shadow: 0 0 30px rgba(200,245,60,0.2);
}
.rk-unit { font-size: 14px; color: var(--text2); padding-bottom: 10px; }
.rk-tgt  { font-size: 13px; color: var(--text2); margin-bottom: 12px; }
.nutr-pbar {
  height: 6px; background: var(--bg4); border-radius: 99px;
  overflow: hidden; margin-bottom: 16px;
}
.nutr-pbar-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, var(--acc), var(--green));
  transition: width 0.8s cubic-bezier(0.22,1,0.36,1);
}

/* Macro pills */
.nm-box {
  background: linear-gradient(160deg, var(--bg3), var(--bg4));
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 12px 8px;
  text-align: center;
  box-shadow: var(--shadow-card);
  transition: all 0.2s;
}
.nm-val { font-size: 16px; font-weight: 800; margin-bottom: 2px; }
.nm-bar-wrap { height: 3px; background: var(--bg5); border-radius: 99px; overflow: hidden; margin: 6px 0 5px; }
.nm-bar-fill { height: 100%; border-radius: 99px; transition: width 0.8s cubic-bezier(0.22,1,0.36,1); }
.nm-lbl { font-size: 9px; color: var(--text2); text-transform: uppercase; letter-spacing: 0.06em; }

/* Meal cards */
.meal-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  margin: 0 var(--px) 8px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: border-color 0.2s;
}
.meal-card:hover { border-color: var(--border2); }
.meal-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px var(--px); cursor: pointer; transition: background 0.12s;
}
.meal-head:hover { background: var(--glass); }
.meal-nm  { font-size: 15px; font-weight: 700; }
.meal-kcal{ font-size: 14px; font-weight: 800; color: var(--acc); }
.food-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px var(--px); border-bottom: 1px solid var(--border);
}
.food-row:last-of-type { border-bottom: none; }
.food-nm  { font-size: 13px; font-weight: 600; }
.food-meta{ font-size: 11px; color: var(--text2); margin-top: 2px; }
.meal-add-btn {
  padding: 13px var(--px);
  color: var(--acc); font-size: 13px; font-weight: 700;
  cursor: pointer; border-top: 1px solid var(--border);
  transition: background 0.12s;
  display: flex; align-items: center; justify-content: center; gap: 6px;
}
.meal-add-btn:hover { background: var(--acc4); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROGRESS PAGE — stats at a glance
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.streak-hero {
  background: linear-gradient(135deg, rgba(200,245,60,0.09), rgba(52,214,128,0.05));
  border: 1px solid rgba(200,245,60,0.2);
  border-radius: var(--r-xl);
  padding: 22px;
  margin: 0 var(--px) var(--card-gap);
  display: flex; align-items: center; gap: 18px;
  box-shadow: var(--shadow-card), var(--shadow-acc);
}
.streak-n {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 76px; color: var(--acc); line-height: 1;
  text-shadow: 0 0 30px rgba(200,245,60,0.3);
}
.streak-ttl { font-size: 16px; font-weight: 800; margin-bottom: 4px; }
.streak-sub { font-size: 12px; color: var(--text2); line-height: 1.6; }

.chart-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 20px;
  margin: 0 var(--px) var(--card-gap);
  box-shadow: var(--shadow-card);
}
.chart-lbl { font-size: 11px; font-weight: 700; color: var(--text2); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 18px; }
.bar { border-radius: 6px 6px 0 0; min-height: 4px; transition: height 0.6s cubic-bezier(0.22,1,0.36,1); }
.bar.peak {
  background: linear-gradient(180deg, var(--acc), var(--acc2));
  box-shadow: 0 -4px 14px rgba(200,245,60,0.3);
}

.hmap-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 20px;
  margin: 0 var(--px) var(--card-gap);
  box-shadow: var(--shadow-card);
}
.hm-c { border-radius: 4px; transition: background 0.3s; }
.hm-c.l1 { background: var(--acc4); }
.hm-c.l2 { background: var(--acc3); }
.hm-c.l3 { background: rgba(200,245,60,0.4); }
.hm-c.l4 { background: var(--acc); box-shadow: 0 0 6px rgba(200,245,60,0.4); }

.pb-card {
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: 20px;
  margin: 0 var(--px) var(--card-gap);
  box-shadow: var(--shadow-card);
}
.pb-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 0; border-bottom: 1px solid var(--border);
}
.pb-row:last-child { border-bottom: none; }
.pb-nm  { font-size: 13px; font-weight: 700; flex: 1; }
.pb-val { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--acc); font-weight: 600; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MODALS & SHEETS — polished
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.food-ovl { backdrop-filter: blur(12px) saturate(160%); -webkit-backdrop-filter: blur(12px) saturate(160%); }
.food-sheet {
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: var(--r-2xl) var(--r-2xl) 0 0;
  box-shadow: 0 -20px 60px rgba(0,0,0,0.6);
  animation: slideUpPremium 0.32s cubic-bezier(0.22,1,0.36,1) both;
}
.sheet-handle {
  width: 36px; height: 4px;
  border-radius: 99px;
  background: var(--border3);
  margin: 12px auto 0;
}
.sheet-ttl { font-size: 17px; font-weight: 800; letter-spacing: -0.03em; }
.sheet-close {
  background: var(--bg4);
  border: none;
  border-radius: 50%;
  width: 30px; height: 30px;
  color: var(--text2);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.15s;
}
.sheet-close:hover { background: var(--bg5); color: var(--text); }
.sheet-inp {
  width: 100%;
  background: var(--bg3);
  border: 1.5px solid var(--border);
  border-radius: 99px;
  padding: 11px 18px;
  font-size: 13px;
  color: var(--text);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.sheet-inp:focus {
  border-color: var(--acc);
  box-shadow: 0 0 0 3px rgba(200,245,60,0.1);
}
.food-item {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 10px; border-radius: var(--r-md);
  cursor: pointer; transition: background 0.12s;
}
.food-item:hover { background: var(--glass2); }
.food-item:active { background: var(--bg4); }
.fi-add {
  width: 30px; height: 30px;
  border-radius: 8px;
  background: var(--bg4);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: var(--text2);
  transition: all 0.15s;
}
.food-item:hover .fi-add { background: var(--acc3); border-color: var(--acc); color: var(--acc); }

/* Subscreens */
.subscreen {
  background: var(--bg);
  animation: fadeUpPremium 0.3s cubic-bezier(0.22,1,0.36,1) both;
}
.sub-topbar {
  padding: calc(14px + var(--safe-top)) var(--px) 14px;
  background: rgba(7,7,15,0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}

/* pw summary */
#pw-summary-modal {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ONBOARDING — luxury, premium
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ob-step.active { animation: fadeUpPremium 0.38s cubic-bezier(0.22,1,0.36,1) both; }
.ob-ttl { font-size: 28px; font-weight: 800; letter-spacing: -0.05em; line-height: 1.15; margin-bottom: 8px; }
.ob-sub { font-size: 14px; color: var(--text2); margin-bottom: 28px; line-height: 1.75; }
.ob-card {
  background: var(--bg3);
  border: 1.5px solid var(--border);
  border-radius: var(--r-lg);
  padding: 18px 14px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  position: relative; overflow: hidden;
}
.ob-card:hover { border-color: var(--border2); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
.ob-card:active { transform: scale(0.96); }
.ob-card.sel {
  border-color: var(--acc);
  background: var(--acc4);
  box-shadow: 0 0 0 1px var(--acc), var(--shadow-acc);
}
.ob-card-nm  { font-size: 13px; font-weight: 800; color: var(--text); letter-spacing: -0.01em; word-break:break-word; line-height:1.35; }
.ob-card-sub { font-size: 11px; color: var(--text2); margin-top: 3px; line-height: 1.45; word-break:break-word; }
.ob-inp {
  border-radius: var(--r-md);
  padding: 15px 18px;
  font-size: 16px;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.ob-inp:focus { box-shadow: 0 0 0 3px rgba(200,245,60,0.1); }
.btn-acc { border-radius: 99px; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EMPTY STATES — elegant guidance
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.empty-state {
  text-align: center;
  padding: 56px 24px;
  display: flex; flex-direction: column; align-items: center;
}
.es-ico {
  font-size: 52px;
  margin-bottom: 18px;
  animation: float 3.5s ease infinite;
}
.es-txt {
  font-size: 14px;
  color: var(--text2);
  line-height: 1.75;
  margin-bottom: 24px;
  max-width: 280px;
}
.empty-state .btn-acc { min-width: 180px; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MICRO-INTERACTIONS — premium feel
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

/* Ripple effect on tap */
.btn-acc::after,
.pres-btn::after,
.cta-btn-main.accent::after {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: inherit;
}
.btn-acc:active::after,
.pres-btn:active::after,
.cta-btn-main.accent:active::after { opacity: 1; }

/* Toast notification */
#toast {
  position: fixed;
  bottom: calc(var(--nav-h) + 16px + var(--safe-bot));
  left: 50%; transform: translateX(-50%) translateY(20px);
  background: rgba(18,18,32,0.95);
  color: var(--text);
  border: 1px solid var(--border2);
  border-radius: 99px;
  padding: 12px 22px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset;
  opacity: 0;
  transition: opacity 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  z-index: 9999;
  pointer-events: none;
}
#toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

/* Loading skeleton */
.skeleton {
  background: linear-gradient(90deg, var(--bg3) 25%, var(--bg4) 50%, var(--bg3) 75%);
  background-size: 200% 100%;
  animation: shimmerPremium 1.5s infinite;
  border-radius: var(--r-sm);
}

/* Segmented control */
.seg-ctrl {
  display: flex;
  background: var(--bg3);
  border: 1px solid var(--border);
  border-radius: var(--r-md);
  padding: 3px;
  gap: 2px;
}
.seg-btn {
  flex: 1;
  padding: 8px 10px;
  border-radius: calc(var(--r-md) - 3px);
  border: none;
  background: none;
  color: var(--text2);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  font-family: 'Syne', sans-serif;
}
.seg-btn.active {
  background: var(--bg2);
  color: var(--text);
  box-shadow: var(--shadow-sm);
}

/* Pills and tags */
.tag-pill {
  display: inline-flex; align-items: center;
  padding: 4px 10px; border-radius: 99px;
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.04em;
}
.tag-green  { background: var(--green-d);  color: var(--green);  border: 1px solid rgba(52,214,128,0.2); }
.tag-blue   { background: var(--blue-d);   color: var(--blue);   border: 1px solid rgba(78,143,232,0.2); }
.tag-orange { background: var(--orange-d); color: var(--orange); border: 1px solid rgba(245,148,50,0.2); }
.tag-acc    { background: var(--acc3);     color: var(--acc);    border: 1px solid rgba(200,245,60,0.22); }
.tag-purple { background: var(--purple-d); color: var(--purple); border: 1px solid rgba(155,110,240,0.2); }

/* Kcal ring */
.kr-fg {
  transition: stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1);
  filter: drop-shadow(0 0 4px rgba(200,245,60,0.4));
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RESPONSIVE TOUCH TARGETS — 44px minimum
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.bni, .wo-set-chk, .sheet-close, .tb-avatar { min-height: 44px; }
.bni { min-width: 48px; }
.meal-head { min-height: 52px; }
.food-item { min-height: 48px; }
.ob-card { min-height: auto; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SMOOTH SCROLLING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.app-content,
.subscreen,
.food-sheet,
.sheet-list {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
.app-content::-webkit-scrollbar,
.subscreen::-webkit-scrollbar,
.sheet-list::-webkit-scrollbar { display: none; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE TRANSITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.page.active { animation: fadeUpPremium 0.28s cubic-bezier(0.22,1,0.36,1) both; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SPLASH — refined
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
#scr-splash {
  background:
    radial-gradient(ellipse 70% 50% at 50% 20%, rgba(200,245,60,0.10) 0%, transparent 65%),
    radial-gradient(ellipse 50% 40% at 80% 85%, rgba(78,143,232,0.07) 0%, transparent 55%),
    radial-gradient(ellipse 40% 30% at 20% 70%, rgba(52,214,128,0.06) 0%, transparent 55%),
    #07070F;
}
.splash-logo {
  font-family: 'Syne', 'Bebas Neue', sans-serif;
  font-size: 72px;
  font-weight: 800;
  color: var(--acc);
  letter-spacing: 3px;
  filter: drop-shadow(0 0 40px rgba(200,245,60,0.45));
}
.splash-badge {
  background: var(--acc3);
  border: 1px solid rgba(200,245,60,0.22);
  color: var(--acc);
  font-size: 11px;
  font-weight: 800;
  padding: 5px 14px;
  border-radius: 99px;
  letter-spacing: 0.06em;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MATCH / ESPLORA CARDS — premium preset cards
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
[id^="v20-pcard-"] {
  background: linear-gradient(150deg, var(--bg3) 0%, var(--bg4) 100%);
  border: 1px solid var(--border2);
  border-radius: var(--r-xl) !important;
  margin-bottom: 10px !important;
  overflow: hidden;
  transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
  box-shadow: var(--shadow-card);
}
[id^="v20-pcard-"]:hover {
  border-color: var(--border3);
  transform: translateY(-2px);
  box-shadow: var(--shadow-raised);
}
[id^="v20-pcard-"]:active { transform: scale(0.99); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   IMPROVED SEGMENTED TABS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
[id*="-tabs"], .al-tabs, .tabs-row {
  display: flex;
  gap: 3px;
  background: var(--bg3);
  border-radius: var(--r-md);
  padding: 3px;
  margin: 0 var(--px) 16px;
  border: 1px solid var(--border);
}
[id*="-tabs"] button, .al-tabs button, .tabs-row button {
  flex: 1;
  padding: 9px 8px;
  border-radius: calc(var(--r-md) - 3px);
  border: none;
  background: none;
  color: var(--text2);
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
  font-family: 'Syne', sans-serif;
  letter-spacing: 0.01em;
}
[id*="-tabs"] button.on, .al-tabs button.on, .tabs-row button.on,
[id*="-tabs"] button.active, .al-tabs button.active, .tabs-row button.active {
  background: var(--bg2);
  color: var(--text);
  box-shadow: 0 1px 6px rgba(0,0,0,0.4);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   INPUTS — polished
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
input[type="text"],
input[type="number"],
input[type="email"],
textarea,
select {
  border-radius: var(--r-md);
  transition: border-color 0.15s, box-shadow 0.15s;
}
input:focus, textarea:focus, select:focus {
  border-color: var(--acc) !important;
  box-shadow: 0 0 0 3px rgba(200,245,60,0.1) !important;
  outline: none !important;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MUSCLE FATIGUE — premium visual
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
#muscle-fatigue-wrap > div {
  border-radius: var(--r-lg) !important;
  border: 1px solid var(--border) !important;
  box-shadow: var(--shadow-card) !important;
  overflow: hidden;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROFILE PAGE — cleaner sections
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.profile-section,
[id*="profile"] > div > div {
  border-radius: var(--r-lg);
  overflow: hidden;
}

/* ── Extra style block (originale riga 3824) ── */
/* Habit tracker rimosso */
#v45-habit-tracker { display: none !important; }
/* Badge versione nascosti */
.tb-badge, .splash-badge { display: none !important; }
/* Mappa muscolare migliorata */
.ana-grid { display: flex; gap: 12px; justify-content: center; }
.ana-card { flex: 1; min-width: 0; overflow: visible; }
.ana-ttl { font-size: 11px; font-weight: 700; text-align: center; color: var(--text2); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .08em; }
.ana-svg { width: 100%; height: auto; max-height: 420px; overflow: visible; }
#muscle-fatigue-wrap { overflow: visible !important; }
.muscle-map-wrap { overflow: visible !important; }
.fatigue-legend { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 10px; }
.fatigue-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.fatigue-lbl { font-size: 11px; color: var(--text2); }

/* ── Extra style block (originale riga 3842) ── */
/* ══════════════════════════════════════════════════════════
   FITTRACK — GLOBAL LAYOUT FIX
   Risolve: testo tagliato, icone fuori viewport,
   riquadri che non mostrano contenuto correttamente
══════════════════════════════════════════════════════════ */

/* 1. REGOLA BASE — tutto rispetta il box model */
*, *::before, *::after {
  box-sizing: border-box !important;
  min-width: 0; /* permette agli item flex/grid di restringersi */
}

/* 2. APP CONTENT — niente overflow-x nascosto che taglia testo */
.app-content {
  overflow-x: hidden !important;
  width: 100% !important;
  max-width: 100vw !important;
}

/* 3. TUTTE LE PAGINE — larghezza piena, niente traboccamento */
.page {
  width: 100% !important;
  max-width: 100% !important;
  overflow-x: hidden !important;
  box-sizing: border-box !important;
}

/* 4. CONTAINER GENERICI — padding corretto, non strabordano */
.page > div,
.page > section,
[id^="page-"] > div {
  max-width: 100% !important;
  box-sizing: border-box !important;
}



/* 8. MAPPA ANATOMICA — overflow visibile ma non spinge il layout */
#muscle-fatigue-wrap {
  overflow: visible !important;
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}
#muscle-fatigue-wrap > div {
  max-width: 100% !important;
  box-sizing: border-box !important;
}

/* 9. SVG mappa — ridimensiona correttamente */
#muscle-fatigue-wrap svg {
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
}

/* 10. SEZIONE PROGRESSI — nessun clip */
#page-progressi {
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

/* 11. COACH CHAT — non trabocca */
#v45-coach-chat-wrap {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  margin: 0 16px 14px !important;
  overflow: hidden !important;
}
#v45-coach-chat {
  width: 100% !important;
  overflow-x: hidden !important;
}
.chat-msg-ai, .chat-msg-user {
  max-width: 100% !important;
  word-break: break-word !important;
  white-space: normal !important;
}

/* 12. PROFILO — tutti i blocchi iniettati a larghezza piena */
#page-profile > div,
#ft-pro-badge-section,
#ft-account-section,
#v45-adv-settings,
#v45-export-btn,
#ft-version-footer {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
}

/* 13. PRO PAYWALL — safe area e scroll */
#ft-pro-sheet {
  max-height: 90vh !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
  width: 100% !important;
  box-sizing: border-box !important;
}
#ft-pro-sheet > div {
  max-width: 100% !important;
  box-sizing: border-box !important;
}

/* 14. SETTINGS AVANZATE — icone colore non tagliate */
#v45-adv-settings .settings-row {
  flex-wrap: wrap !important;
  gap: 8px !important;
}
#v45-adv-settings .settings-row > div:first-child {
  flex: 1 1 60% !important;
  min-width: 0 !important;
}

/* 15. BOTTONI RAPIDI NUTRIZIONE — scroll orizzontale fluido */
#v45-quick-add > div {
  overflow-x: auto !important;
  -webkit-overflow-scrolling: touch !important;
  padding-bottom: 6px !important;
  scrollbar-width: none !important;
}
#v45-quick-add > div::-webkit-scrollbar { display: none; }
.fqa-chip {
  flex-shrink: 0 !important;
  white-space: nowrap !important;
}

/* 16. WATER TRACKER — non trabocca */
#v45-water-widget {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  margin: 0 16px 12px !important;
}

/* 17. WEEKLY OVERVIEW — dot giorni non si comprimono */
#v45-weekly-overview {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  margin: 0 16px 12px !important;
}

/* 18. INSIGHT CARD */
#v45-daily-insight {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  margin: 0 16px 12px !important;
  overflow: hidden !important;
}

/* 19. VOLUME COMPARE */
#v45-vol-compare {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

/* 20. NUTR TREND */
#v45-nutr-trend {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

/* 21. SEARCH MODAL INPUT */
#v45-search-modal input {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
  min-width: 0 !important;
}

/* 22. COPY PRESET MODAL */
#v45-cm-sheet {
  width: 100% !important;
  box-sizing: border-box !important;
}
#v45-cm-sheet input {
  width: 100% !important;
  box-sizing: border-box !important;
}

/* 23. MILESTONE BANNER */
.milestone-banner {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  margin: 0 16px 12px !important;
  overflow: hidden !important;
}

/* 24. PRO HOME BANNER */
#ft-pro-home-banner {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  margin: 0 16px 12px !important;
}

/* 25. DELOAD BANNER */
#v45-deload-banner {
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  box-sizing: border-box !important;
  margin: 0 16px 12px !important;
}

/* 26. LOGIN SCREEN — non trabocca e scrolla su schermi piccoli */
#scr-google-login {
  overflow-y: auto !important;
  overflow-x: hidden !important;
  -webkit-overflow-scrolling: touch !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
}
#scr-google-login > div {
  width: 100% !important;
  max-width: 420px !important;
  min-height: unset !important;
  box-sizing: border-box !important;
  margin: 0 auto !important;
}
#scr-google-login input {
  width: 100% !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}
#google-signin-btn:hover, 
#auth-email-btn:hover {
  opacity: .9;
  transform: translateY(-1px);
}
#auth-email-btn:active, #google-signin-btn:active, 

/* 27. AUTH TABS — non escono dal viewport */
#auth-tabs {
  width: 100% !important;
  box-sizing: border-box !important;
}

/* 28. TOPBAR — non si espande */
.topbar {
  max-width: 100vw !important;
  overflow: hidden !important;
}

/* 29. FONT SIZE FLUIDO — non overflow su mobile */
.tb-logo {
  font-size: clamp(16px, 4vw, 22px) !important;
}

/* 30. PRESET CARDS — altezza auto, non tagliano */
[id^="v20-pcard-"] {
  overflow: visible !important;
  height: auto !important;
  max-width: 100% !important;
  box-sizing: border-box !important;
}

/* 31. ESPLORA PRESET VIEW — larghezza corretta */
#esplora-preset-view {
  width: 100% !important;
  max-width: 100% !important;
  overflow-x: hidden !important;
  box-sizing: border-box !important;
}

/* 33. PRO PLAN CARDS — no overflow su mobile */
.pro-plan-card {
  min-width: 0 !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}
.pro-plan-card div {
  white-space: normal !important;
  word-break: break-word !important;
}

/* 34. FLEX GRID RESPONSIVI — wrap su mobile */
[style*="display:grid"][style*="1fr 1fr"] {
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
}

/* 35. TITOLI GRANDI — non traboccano */
.ob-ttl, h1, h2 {
  overflow-wrap: break-word !important;
  word-break: break-word !important;
}

/* 36. ICONE TOPBAR — dimensione fissa */
#notif-bell-btn,
.tb-avatar,
#ft-cloud-badge {
  flex-shrink: 0 !important;
}

/* 37. SCROLL CONTENUTO — smooth e senza jitter */
.app-content,
#page-progressi,
#page-profile,
#page-nutrizione,
#page-allenamento,
#page-esercizi,
#page-coach {
  scroll-behavior: smooth !important;
  -webkit-overflow-scrolling: touch !important;
}

/* 39. HIDE artifacts visivi */
.tb-badge { display: none !important; }
#v45-habit-tracker { display: none !important; }

/* 40. SAFE AREA — rispetta notch e barra di navigazione */
.topbar {
  padding-top: max(12px, calc(12px + env(safe-area-inset-top))) !important;
}

/* ══ GLOBAL OVERFLOW & LAYOUT FIX ══
   Risolve tutti i problemi di ritaglio orizzontale
   (sezioni profilo, card dinamiche, ecc.)
   Nessun elemento deve uscire dal viewport.
══════════════════════════════════════════════════════ */

/* Blocca overflow orizzontale su tutto */
html, body {
  max-width: 100vw !important;
  overflow-x: hidden !important;
}

/* Tutte le schermate e pagine */
.screen, .page, .app-content,
#page-home, #page-allenamento, #page-nutrizione,
#page-progressi, #page-profile, #page-coach,
#page-esercizi, #page-ricette, #page-esplora {
  max-width: 100% !important;
  overflow-x: hidden !important;
  box-sizing: border-box !important;
}

/* Sezioni iniettate dinamicamente con margin laterale:
   #v45-timeline-section, eq-profile-section, ecc. */
#v47-timeline-section,
#eq-profile-section,
#v40-dashboard-section,
.v47-prog-preview,
.v47-banner-actions,
[id^="v4"], [id^="v45-"], [id^="v47-"] {
  max-width: 100% !important;
  box-sizing: border-box !important;
  overflow-x: hidden !important;
}

/* Grid a 2 colonne: mai andare fuori schermo */
.tdee-grid, .tdee-macros, .ob-grid {
  max-width: 100% !important;
  box-sizing: border-box !important;
  width: 100% !important;
}



/* Tutte le card iniettate con margin orizzontale */
#page-profile > div,
#page-profile [style*="margin:0 16px"],
#page-profile [style*="margin: 0 16px"],
[style*="margin:0 16px 14px"],
[style*="margin: 0 16px 14px"] {
  max-width: calc(100% - 32px) !important;
  box-sizing: border-box !important;
}

/* Testo troncato dove necessario */
.v47-tl-name, .v47-tl-meta,
.v47-banner-title, .v47-banner-sub,
.v47-banner-reason {
  max-width: 100% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.v47-banner-reason { white-space: normal !important; }

/* Fix modali e overlay */
.v21-overlay, #v47-prog-modal,
#v47-prog-inner {
  max-width: 100vw !important;
  box-sizing: border-box !important;
  overflow-x: hidden !important;
}
#v47-prog-inner {
  max-width: 480px !important;
  width: 100% !important;
  margin: 0 auto !important;
}

/* Intestazioni grandi: non uscire dal bordo */
.v47-timeline-title,
[style*="font-family:'Bebas Neue'"],
[style*="Bebas Neue"] {
  overflow-wrap: break-word !important;
  word-break: break-word !important;
}

/* Fix generale per ogni contenitore con display:flex che causa overflow */
.glass-card, .stat-tile, .sess-card,
.coach-card, .ob-card, .ep-card,
.recipe-card, .wo-ex-card, .wp-day-card {
  max-width: 100% !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  min-width: 0 !important;
}

/* Fix flex children che spingono il parent fuori schermo */
.glass-card *, .stat-tile *,
.ep-card *, .wo-ex-card * {
  min-width: 0 !important;
}

/* Testo lungo in flex: tronca invece di espandere */
.ep-card > div > div,
.wo-ex-nm, .wb-nm, .ls-name,
.rec-nm, .pres-nm {
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  max-width: 100% !important;
}

/* Coach AI: textarea e chat non escono */
#coach-chat-input, #coach-chat-messages,
.coach-msg, .coach-msg-ai {
  max-width: 100% !important;
  box-sizing: border-box !important;
  word-break: break-word !important;
}

/* Profilo: sezioni con layout inline che bucano */
#prof-corpo, #prof-impostazioni,
.pr-section, .pr-row {
  max-width: 100% !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
}

/* Tabelle / griglie stats */
.stats-strip, .macro-grid, .kcal-wrap {
  max-width: 100% !important;
  box-sizing: border-box !important;
  flex-wrap: wrap !important;
}


/* ── Fix padding body app ── */
.home-body, #h-body,
.app-content > .page > div {
  padding-left: max(16px, env(safe-area-inset-left)) !important;
  padding-right: max(16px, env(safe-area-inset-right)) !important;
  box-sizing: border-box !important;
}

/* ── Body style block riga 4325 ── */
/* ── Auth screen premium ── */
#scr-google-login {
  background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,245,60,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 90% 110%, rgba(91,156,239,0.06) 0%, transparent 50%),
              var(--bg);
}
.auth-glass-card {
  width: 100%;
  max-width: 400px;
  background: rgba(17,17,31,0.72);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 28px;
  padding: 36px 28px 32px;
  backdrop-filter: blur(32px) saturate(160%);
  -webkit-backdrop-filter: blur(32px) saturate(160%);
  box-shadow: 0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset;
  position: relative;
  overflow: hidden;
  animation: fadeUp .45s cubic-bezier(.22,1,.36,1);
}
.auth-glass-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200,245,60,0.3), transparent);
}
.auth-logo-ring {
  width: 64px; height: 64px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(200,245,60,0.15), rgba(200,245,60,0.05));
  border: 1px solid rgba(200,245,60,0.25);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 0 40px rgba(200,245,60,0.12), 0 8px 24px rgba(0,0,0,0.4);
  position: relative;
}
.auth-logo-ring::after {
  content: '';
  position: absolute; inset: -1px;
  border-radius: 21px;
  background: conic-gradient(from 180deg, rgba(200,245,60,0.4), transparent 60%, rgba(200,245,60,0.15));
  opacity: 0.6;
  z-index: -1;
}
.auth-field-wrap {
  width: 100%; margin-bottom: 14px;
}
.auth-field-lbl {
  font-size: 11px; font-weight: 700; color: var(--text2);
  letter-spacing: .08em; font-family: 'Syne', sans-serif;
  display: block; margin-bottom: 7px; text-transform: uppercase;
}
.auth-field-inp {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1.5px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 14px 16px;
  font-size: 15px; color: var(--text);
  outline: none; font-family: 'Syne', sans-serif;
  box-sizing: border-box;
  transition: border-color .2s, background .2s, box-shadow .2s;
}
.auth-field-inp:focus {
  border-color: rgba(200,245,60,0.5);
  background: rgba(200,245,60,0.03);
  box-shadow: 0 0 0 3px rgba(200,245,60,0.07);
}
.auth-cta-btn {
  width: 100%; padding: 16px;
  background: linear-gradient(135deg, var(--acc), #a8d828);
  color: #080810; border: none;
  border-radius: 50px;
  font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 800;
  cursor: pointer; letter-spacing: .03em;
  margin-bottom: 22px;
  transition: all .2s;
  box-shadow: 0 4px 24px rgba(200,245,60,0.30), 0 1px 0 rgba(255,255,255,0.2) inset;
}
.auth-cta-btn:active { transform: scale(.98); }

/* Separatore elegante */
.auth-separator {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 18px;
}
.auth-sep-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
}
.auth-sep-text {
  font-size: 11px; color: var(--text3);
  font-family: 'Syne', sans-serif;
  white-space: nowrap;
  letter-spacing: .06em;
  text-transform: uppercase;
}

/* Social login ufficiali */
.auth-social-wrap {
  width: 100%; display: flex; flex-direction: column; gap: 10px;
  margin-bottom: 26px;
}

/* Google — sfondo bianco per brand compliance */
#google-signin-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  padding: 13px 20px;
  background: #ffffff;
  border: none;
  border-radius: 50px;
  font-family: 'Roboto', 'Syne', sans-serif;
  font-size: 14px; font-weight: 500;
  color: #3c4043;
  cursor: pointer;
  transition: all .2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1);
  box-sizing: border-box;
}
#google-signin-btn:hover { background: #f8f8f8; box-shadow: 0 4px 14px rgba(0,0,0,0.4); }
#google-signin-btn:active { transform: scale(.98); }

/* Apple — sfondo nero brand-compliant */




/* ══ FINAL OVERRIDE: login screen always scrollable ══ */
#scr-google-login {
  position: fixed !important;
  inset: 0 !important;
  display: none;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: flex-start !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
  -webkit-overflow-scrolling: touch !important;
  padding: 0 !important;
}
#scr-google-login.active { display: flex !important; }
#scr-google-login > div {
  width: 100% !important;
  max-width: 420px !important;
  min-height: auto !important;
  flex-shrink: 0 !important;
  margin: 0 auto !important;
}

/* ── Body style block riga 5084 ── */
      .max-inp-wrap { margin-bottom:14px; }
      .max-inp-row { display:flex;align-items:center;gap:10px;background:var(--bg3);border:1.5px solid var(--border);border-radius:var(--r);padding:12px 14px;margin-bottom:8px;transition:border-color .15s; }
      .max-inp-row:focus-within { border-color:var(--acc); }
      .max-inp-ico { font-size:26px;flex-shrink:0;width:36px;text-align:center; }
      .max-inp-info { flex:1;min-width:0; }
      .max-inp-name { font-size:13px;font-weight:800;color:var(--text); }
      .max-inp-hint { font-size:11px;color:var(--text2);margin-top:2px; }
      .max-inp-field { display:flex;align-items:center;gap:6px;flex-shrink:0; }
      .max-inp-field input { width:70px;background:var(--bg4);border:1.5px solid var(--border2);border-radius:var(--r-sm);padding:8px 10px;font-size:15px;font-weight:700;color:var(--text);text-align:center;outline:none;font-family:'Syne',sans-serif;transition:border-color .15s; }
      .max-inp-field input:focus { border-color:var(--acc); }
      .max-inp-field span { font-size:12px;color:var(--text2);font-weight:600; }
      .max-skip-btn { display:block;text-align:center;width:100%;margin-top:4px;background:none;border:none;color:var(--text3);font-family:'Syne',sans-serif;font-size:11px;cursor:pointer;text-decoration:underline;padding:6px; }

/* ── Body style block riga 21819 ── */
/* ── OVERLAY PANELS ── */
.v21-overlay{
  position:fixed;inset:0;background:rgba(0,0,0,.72);
  z-index:9000;display:flex;align-items:flex-end;
  opacity:0;pointer-events:none;transition:opacity .25s ease;
}
.v21-overlay.open{opacity:1;pointer-events:all;}
.v21-panel{
  width:100%;background:var(--bg2);border-radius:24px 24px 0 0;
  padding:0 0 max(20px,env(safe-area-inset-bottom));
  transform:translateY(100%);transition:transform .35s cubic-bezier(.22,1,.36,1);
  max-height:90vh;overflow-y:auto;
}
.v21-overlay.open .v21-panel{transform:translateY(0);}
.v21-drag-handle{
  width:40px;height:4px;border-radius:99px;background:var(--border3);
  margin:12px auto 0;
}
.v21-panel-title{
  font-size:17px;font-weight:800;letter-spacing:-.3px;
  padding:16px 20px 8px;color:var(--text);
}
.v21-panel-sub{
  font-size:12px;color:var(--text2);padding:0 20px 16px;line-height:1.5;
  border-bottom:1px solid var(--border);
}

/* ── THEME CARDS ── */
.theme-grid{
  display:grid;grid-template-columns:repeat(3,1fr);gap:10px;
  padding:16px;
}
.theme-card{
  border-radius:14px;overflow:hidden;cursor:pointer;
  border:2.5px solid transparent;transition:border-color .15s,transform .12s,box-shadow .15s;
  position:relative;
}
.theme-card:active{transform:scale(.94);}
.theme-card.selected{box-shadow:0 0 0 3px white;}
.theme-card-preview{
  height:64px;display:flex;align-items:flex-end;padding:6px;
  position:relative;overflow:hidden;
}
.theme-card-dot{
  width:18px;height:18px;border-radius:50%;border:2px solid rgba(255,255,255,.4);
  position:absolute;bottom:6px;right:6px;
}
.theme-card-label{
  font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;
  padding:7px 8px;background:var(--bg3);color:var(--text);text-align:center;
}
.theme-card.selected .theme-card-label{color:var(--acc);}
.theme-check{
  position:absolute;top:6px;left:6px;width:20px;height:20px;border-radius:50%;
  background:rgba(255,255,255,.9);display:none;align-items:center;justify-content:center;
  font-size:11px;
}
.theme-card.selected .theme-check{display:flex;}

/* ── LIGHT/DARK TOGGLE STRIP ── */
.mode-strip{
  display:flex;gap:8px;padding:0 16px 16px;
}
.mode-btn{
  flex:1;padding:11px;border-radius:12px;border:1.5px solid var(--border2);
  background:var(--bg3);font-family:'Syne',sans-serif;font-size:13px;font-weight:700;
  color:var(--text2);cursor:pointer;transition:all .15s;
  display:flex;align-items:center;justify-content:center;gap:6px;
}
.mode-btn.on{
  background:var(--acc3);border-color:var(--acc);color:var(--acc);
}

/* lang-selector removed — Italian only */

/* ── SECTION DIVIDER ── */
.v21-section-sep{
  font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;
  color:var(--text3);padding:4px 20px 8px;margin-top:4px;
}

/* ── V35 MOBILE OVERFLOW FIX ── */
*{box-sizing:border-box;}
html,body{max-width:100vw;overflow-x:hidden;}
.page,.screen{max-width:100vw;overflow-x:hidden;}
/* Preset cards - previeni testo che esce */
.ep-card,.wp-day-card,.sess-card,.cta-banner{
  min-width:0;overflow:hidden;word-break:break-word;
}
/* Chip e badge - wrap su mobile */
.wp-meta,.cta-day-info,[style*="display:flex"][style*="gap"]{
  flex-wrap:wrap;
}
/* Testo lungo nei titoli */
.cta-prog-name,.wp-day-nm,.sess-name{
  overflow:hidden;text-overflow:ellipsis;
  white-space:nowrap;max-width:100%;
}
.wp-title{
  white-space:normal;word-break:break-word;overflow-wrap:break-word;max-width:100%;
}
/* Evita che i preset card title escano */
.ob-card-nm, .ob-card-sub{word-break:break-word;}
/* Fix grid preset su mobile stretto */
@media(max-width:380px){
  .ob-grid{grid-template-columns:1fr !important;}
  .pws-stats-grid,[id="pws-stats-grid"]{grid-template-columns:repeat(3,1fr) !important;}
  .ft-plan-card{padding:12px !important;}
}
/* Fix bottom nav labels */
.nav-lbl{font-size:9px !important;}
/* Preset explorer cards */
#esplora-preset-view > div{min-width:0;overflow:hidden;}
/* Fix modal paywall su mobile */
#ft-paywall-modal > div{padding:20px 16px 36px !important;}
/* Bottoni affiancati nel summary */
#pw-summary-modal [style*="display:flex;gap:10px"]{flex-wrap:wrap;}
#pw-summary-modal [style*="display:flex;gap:10px"] button{min-width:120px;}
/* Fix training day cards su mobile */
.wp-day-head{min-width:0;}
.wp-day-head > div:first-child + div{min-width:0;overflow:hidden;}


/* ── Onboarding nuovi step ── */
.ob-multi.sel{border-color:var(--acc);background:rgba(200,245,60,.08);}
.ob-time-btn,.ob-energy-btn{
  padding:8px 14px;border-radius:99px;border:1.5px solid rgba(255,255,255,.1);
  background:var(--bg3);color:var(--text2);font-family:'Syne',sans-serif;
  font-size:12px;font-weight:700;cursor:pointer;transition:all .15s;
}
.ob-time-btn.sel,.ob-energy-btn.sel{
  border-color:var(--acc);background:rgba(200,245,60,.1);color:var(--acc);
}


/* ── Body style block riga 32728 ── */
/* ═══════════ V45 UX FINAL PATCH STYLES ═══════════ */
/* RPE Slider */
.rpe-slider{-webkit-appearance:none;width:100%;height:6px;border-radius:99px;background:linear-gradient(90deg,var(--green),var(--orange),var(--red));outline:none;}
.rpe-slider::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:var(--acc);border:3px solid var(--bg2);cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.4);}
/* Progressive overload badge */
.prog-badge{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:99px;font-size:10px;font-weight:700;background:rgba(62,223,138,.12);color:var(--green);border:1px solid rgba(62,223,138,.25);}
.prog-badge.warn{background:rgba(255,154,60,.12);color:var(--orange);border-color:rgba(255,154,60,.25);}
/* Weekly planner mini */
.wp-mini-day{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--r-sm);border:1px solid var(--border);margin-bottom:4px;cursor:pointer;transition:all .12s;}
.wp-mini-day:active{transform:scale(.98);}
.wp-mini-day.today{border-color:var(--acc);background:var(--acc3);}
/* Habit tracker */
.habit-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border);}
.habit-check{width:26px;height:26px;border-radius:8px;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .12s;flex-shrink:0;}
.habit-check.done{background:var(--acc);border-color:var(--acc);color:#080810;}
/* Food quick-add */
.fqa-chip{padding:6px 14px;border-radius:99px;border:1.5px solid var(--border);background:var(--bg3);font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;color:var(--text2);transition:all .12s;font-family:'Syne',sans-serif;}
.fqa-chip:active{transform:scale(.95);}
/* Progress milestone */
.milestone{background:linear-gradient(135deg,rgba(200,245,60,.08),rgba(62,223,138,.05));border:1px solid rgba(200,245,60,.2);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:10px;}
/* Coach AI chat bubble */
.coach-bubble{background:var(--bg3);border:1px solid var(--border);border-radius:0 var(--r-lg) var(--r-lg) var(--r-lg);padding:12px 14px;margin-bottom:8px;font-size:13px;color:var(--text2);line-height:1.65;}
/* Superset indicator */
.superset-badge{font-size:9px;font-weight:700;padding:2px 7px;border-radius:99px;background:rgba(168,126,248,.15);color:var(--purple);border:1px solid rgba(168,126,248,.3);}
/* Water tracker */
.water-btn{width:100%;aspect-ratio:1;border-radius:8px;border:1.5px solid var(--border);background:var(--bg3);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .12s;}
.water-btn.filled{background:rgba(91,156,239,.15);border-color:var(--blue);}
/* Insight card */
.insight-card{background:linear-gradient(135deg,var(--bg2),var(--bg3));border:1px solid var(--border2);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:10px;position:relative;overflow:hidden;}
.insight-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--acc);}
/* Effort bar */
.effort-bar{height:4px;border-radius:99px;background:var(--bg4);overflow:hidden;margin-top:6px;}
.effort-fill{height:100%;border-radius:99px;transition:width .5s ease;}

/* ── Body style block riga 33310 ── */
/* FITTRACK V45 ULTIMATE STYLES */
.custom-timer-wrap{display:flex;align-items:center;gap:6px;padding:8px 0;}
.ct-preset{padding:6px 12px;border-radius:99px;border:1.5px solid var(--border);background:var(--bg3);font-size:11px;font-weight:700;cursor:pointer;color:var(--text2);font-family:'Syne',sans-serif;transition:all .12s;}
.ct-preset.active{border-color:var(--acc);background:var(--acc3);color:var(--acc);}
.set-note-area{width:100%;background:var(--bg4);border:1px solid var(--border);border-radius:8px;padding:7px 10px;font-size:12px;color:var(--text);font-family:'Syne',sans-serif;resize:none;outline:none;margin-top:4px;}
.set-note-area:focus{border-color:var(--acc);}
.superset-connector{display:flex;align-items:center;gap:8px;padding:4px 0 4px 16px;margin:2px 0;}
.ss-label{font-size:10px;font-weight:700;color:var(--purple);background:rgba(168,126,248,.12);padding:3px 10px;border-radius:99px;border:1px solid rgba(168,126,248,.25);}
.pr-flash{animation:prFlash 1.2s ease both;}
@keyframes prFlash{0%{transform:scale(1)}30%{transform:scale(1.08);color:var(--acc)}60%{transform:scale(.98)}100%{transform:scale(1)}}
.chat-msg-ai{background:var(--bg3);border:1px solid var(--border);border-radius:4px var(--r-lg) var(--r-lg) var(--r-lg);padding:12px 14px;font-size:13px;color:var(--text2);line-height:1.65;position:relative;margin-top:14px;}
.chat-msg-ai::before{content:'🤖';position:absolute;top:-12px;left:0;font-size:16px;}
.chat-msg-user{background:var(--acc3);border:1px solid rgba(200,245,60,.2);border-radius:var(--r-lg) 4px var(--r-lg) var(--r-lg);padding:12px 14px;font-size:13px;color:var(--acc);line-height:1.65;text-align:right;}
.chat-input-row{display:flex;gap:8px;align-items:flex-end;padding-top:8px;border-top:1px solid var(--border);}
.chat-input{flex:1;background:var(--bg3);border:1.5px solid var(--border);border-radius:var(--r-sm);padding:10px 14px;font-size:13px;color:var(--text);outline:none;font-family:'Syne',sans-serif;resize:none;}
.chat-input:focus{border-color:var(--acc);}
.chat-send{width:40px;height:40px;border-radius:var(--r-sm);background:var(--acc);border:none;font-size:16px;cursor:pointer;flex-shrink:0;}
.milestone-banner{background:linear-gradient(135deg,rgba(200,245,60,.12),rgba(62,223,138,.08));border:1.5px solid rgba(200,245,60,.3);border-radius:var(--r-lg);padding:16px;margin:0 16px 12px;position:relative;overflow:hidden;animation:fadeUp .4s ease both;}
.milestone-banner::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--acc),var(--green));}
.settings-row{display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);}
.settings-row:last-child{border-bottom:none;}
.settings-lbl{font-size:13px;font-weight:700;}
.settings-sub{font-size:11px;color:var(--text2);margin-top:2px;}
.toggle-switch{position:relative;width:44px;height:24px;flex-shrink:0;}
.toggle-switch input{opacity:0;width:0;height:0;position:absolute;}
.toggle-track{position:absolute;inset:0;border-radius:99px;background:var(--bg4);border:1.5px solid var(--border);cursor:pointer;transition:all .2s;}
.toggle-track::before{content:'';position:absolute;width:18px;height:18px;border-radius:50%;background:var(--text2);top:2px;left:2px;transition:all .2s;}
.toggle-switch input:checked ~ .toggle-track{background:var(--acc3);border-color:var(--acc);}
.toggle-switch input:checked ~ .toggle-track::before{transform:translateX(20px);background:var(--acc);}
.muscle-stat-row{display:flex;align-items:center;gap:10px;padding:6px 0;}
.muscle-stat-bar{flex:1;height:5px;border-radius:99px;background:var(--bg4);overflow:hidden;}
.muscle-stat-fill{height:100%;border-radius:99px;transition:width .5s ease;}

/* ── Body style block riga 33705 ── */
#v47-prog-banner {
  margin: 0 16px 14px;
  background: linear-gradient(135deg, rgba(200,245,60,.10), rgba(62,223,138,.06));
  border: 1.5px solid rgba(200,245,60,.3);
  border-radius: var(--r-xl);
  padding: 18px 16px 14px;
  position: relative; overflow: hidden;
  animation: fadeUp .4s ease both;
}
#v47-prog-banner::before {
  content:''; position:absolute; top:0;left:0;right:0; height:2px;
  background:linear-gradient(90deg,var(--acc),var(--green));
}
.v47-banner-tag{font-size:10px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--acc);margin-bottom:6px;}
.v47-banner-title{font-size:16px;font-weight:800;margin-bottom:4px;line-height:1.3;}
.v47-banner-sub{font-size:12px;color:var(--text2);line-height:1.6;margin-bottom:12px;}
.v47-banner-reason{display:flex;align-items:flex-start;gap:8px;font-size:11px;color:var(--text2);background:rgba(0,0,0,.2);border-radius:var(--r-sm);padding:8px 10px;margin-bottom:12px;line-height:1.5;}
.v47-banner-actions{display:flex;gap:8px;}
.v47-banner-accept{flex:2;padding:11px;background:var(--acc);color:#080810;border:none;border-radius:var(--r-lg);font-family:"Syne",sans-serif;font-size:13px;font-weight:800;cursor:pointer;}
.v47-banner-later{flex:1;padding:11px;background:transparent;color:var(--text2);border:1px solid var(--border2);border-radius:var(--r-lg);font-family:"Syne",sans-serif;font-size:12px;font-weight:700;cursor:pointer;}
.v47-banner-dismiss{position:absolute;top:12px;right:12px;background:none;border:none;color:var(--text3);font-size:16px;cursor:pointer;}
.v47-timeline-section{padding:0 16px;margin-bottom:24px;}
.v47-timeline-title{font-size:13px;font-weight:800;letter-spacing:.5px;text-transform:uppercase;color:var(--text2);margin-bottom:14px;}
.v47-timeline{position:relative;padding-left:28px;}
.v47-timeline::before{content:'';position:absolute;left:9px;top:6px;bottom:6px;width:2px;background:linear-gradient(180deg,var(--acc),var(--border));}
.v47-tl-item{position:relative;margin-bottom:14px;padding:12px 14px;background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r-lg);}
.v47-tl-item.current{background:var(--acc3);border-color:rgba(200,245,60,.3);}
.v47-tl-dot{position:absolute;left:-22px;top:14px;width:10px;height:10px;border-radius:50%;background:var(--border3);border:2px solid var(--bg);}
.v47-tl-item.current .v47-tl-dot{background:var(--acc);box-shadow:0 0 8px rgba(200,245,60,.5);}
.v47-tl-item.future .v47-tl-dot{background:var(--bg4);opacity:.5;}
.v47-tl-name{font-size:13px;font-weight:700;margin-bottom:3px;}
.v47-tl-item.future .v47-tl-name{opacity:.45;}
.v47-tl-meta{font-size:11px;color:var(--text2);}
.v47-tl-badge{display:inline-block;margin-top:6px;padding:2px 8px;border-radius:99px;font-size:10px;font-weight:700;}
.v47-tl-badge.now{background:var(--acc3);color:var(--acc);}
.v47-tl-badge.done{background:var(--green-d);color:var(--green);}
.v47-tl-badge.next{background:var(--bg4);color:var(--text3);}
#v47-prog-modal{position:fixed;inset:0;z-index:9900;background:rgba(0,0,0,.88);display:flex;align-items:flex-end;animation:fadeIn .2s ease;}
#v47-prog-inner{width:100%;background:var(--bg2);border-radius:28px 28px 0 0;max-height:90vh;overflow-y:auto;animation:slideUp .32s cubic-bezier(.22,1,.36,1);padding-bottom:calc(28px + var(--safe-bot));}
.v47-prog-preview{margin:12px 16px 0;padding:16px;background:var(--bg3);border:1px solid var(--border2);border-radius:var(--r-lg);}
.v47-prog-day{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);font-size:12px;}
.v47-prog-day:last-child{border-bottom:none;}
.v47-prog-day-icon{font-size:16px;width:24px;text-align:center;flex-shrink:0;}
.v47-prog-day-name{font-weight:700;flex:1;}
.v47-prog-day-exs{color:var(--text2);font-size:11px;}

/* ═══════════════════════════════════════════════════════
   FITTRACK — NUTRITION RING & PROPORTION FIX (final)
   Garantisce che rotella, macro box e widget siano
   proporzionati e coerenti con il resto dell'app.
═══════════════════════════════════════════════════════ */

/* Forza riepilogo con proporzioni corrette */
.riepilogo {
  background: var(--bg2) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--r-xl) !important;
  padding: 20px !important;
  margin: 0 var(--px) var(--card-gap) !important;
  box-shadow: var(--shadow-card) !important;
  position: relative !important;
  overflow: hidden !important;
}
.riepilogo::before {
  content: '';
  position: absolute; top:0; left:0; right:0; height:2px;
  background: linear-gradient(90deg, var(--acc), var(--green), var(--blue));
}

/* Nutr ring row: ring a sinistra, info a destra */
.nutr-ring-row {
  display: flex !important;
  align-items: center !important;
  gap: 18px !important;
  margin-bottom: 16px !important;
}
.nutr-ring-wrap {
  flex-shrink: 0 !important;
  width: 120px !important;
  height: 120px !important;
  position: relative !important;
}
.nutr-ring-info {
  flex: 1 !important;
  min-width: 0 !important;
}
/* Barra progresso dentro l'info col */
.nutr-ring-info .nutr-pbar {
  margin-bottom: 0 !important;
}

/* Macro boxes uniformi */
.nutr-macros {
  display: grid !important;
  grid-template-columns: repeat(3,1fr) !important;
  gap: 8px !important;
}
.nm-box {
  background: linear-gradient(160deg, var(--bg3), var(--bg4)) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--r-md) !important;
  padding: 12px 8px !important;
  text-align: center !important;
  box-shadow: var(--shadow-sm) !important;
  transition: border-color .2s !important;
  min-width: 0 !important;
  overflow: hidden !important;
}
.nm-box:hover { border-color: var(--border2) !important; }
.nm-val  { font-size: 15px !important; font-weight: 800 !important; }
.nm-lbl  { font-size: 9px !important; color: var(--text2) !important;
           text-transform: uppercase !important; letter-spacing: .06em !important; }
.nm-curr { font-size: 10px !important; color: var(--text2) !important; }

/* Water widget + trend: stessa larghezza delle card */
#v45-water-widget,
#v45-nutr-trend {
  box-sizing: border-box !important;
  width: calc(100% - 32px) !important;
  max-width: calc(100vw - 32px) !important;
  margin: 0 var(--px) 12px !important;
  background: var(--bg2) !important;
  border: 1px solid var(--border) !important;
  border-radius: var(--r-lg) !important;
  padding: 14px 16px !important;
}
/* Water cups grid */
.water-btn {
  width: 100% !important;
  aspect-ratio: 1 !important;
  border-radius: 8px !important;
  border: 1.5px solid var(--border) !important;
  background: var(--bg3) !important;
  font-size: 15px !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all .12s !important;
}
.water-btn.filled {
  background: rgba(78,143,232,.15) !important;
  border-color: var(--blue) !important;
}

/* Meal cards: margine coerente */
.meal-card {
  margin: 0 var(--px) 8px !important;
  box-sizing: border-box !important;
}