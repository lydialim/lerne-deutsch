/* Lerne Deutsch: small helpers shared by every page and level. */
const $=s=>document.querySelector(s);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* localStorage with JSON values. Missing or unreadable values fall back to the default; writes never throw. */
const localStore={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* loose match for searching: ae = ä, oe = ö, ue = ü, ss = ß in both directions */
const norm=s=>s.toLowerCase().replace(/\s+/g,"").replace(/ae/g,"ä").replace(/oe/g,"ö").replace(/ue/g,"ü").replace(/ss/g,"ß");
/* typed answer check: case and spaces don't matter, and ä ö ü ß may be typed as ae oe ue ss
   (handy without a German keyboard). Only that way round: "Waßer" is not accepted for "Wasser". */
const sameAnswer=(v,a)=>{
  const k=s=>String(s).toLowerCase().replace(/\s+/g,"");
  const alt={"ä":"(?:ä|ae)","ö":"(?:ö|oe)","ü":"(?:ü|ue)","ß":"(?:ß|ss)"};
  return new RegExp("^"+[...k(a)].map(c=>alt[c]||c.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("")+"$").test(k(v));
};

/* Per-level browser storage: keys are prefixed with the level id (a1:, a2:, …). */
const storagePrefix = (window.LEVEL && LEVEL.id ? LEVEL.id : "site") + ":";
const levelStore = { get: (k, d) => localStore.get(storagePrefix + k, d), set: (k, v) => localStore.set(storagePrefix + k, v) };

/* Bottom sheets (lesson menu, category picker): show one, and give focus back to the control that opened it when it closes.
   The opener is remembered on the sheet element itself, so every sheet works the same way. */
function showSheet(sheet, focusEl) {
  sheet._opener = document.activeElement;
  sheet.hidden = false; document.body.classList.add("sheet-open");
  if (focusEl) { focusEl.scrollIntoView({ block: "center" }); focusEl.focus({ preventScroll: true }); }
}
function hideSheet(sheet) {
  if (sheet.hidden) return;
  sheet.hidden = true; document.body.classList.remove("sheet-open");
  const back = sheet._opener;
  if (back && document.contains(back)) back.focus({ preventScroll: true });
}
