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

/* Mobile helpers (all pages):
   1. tab rows that scroll sideways get data-more="l|r|lr", so CSS can fade the edge with hidden tabs.
   2. lesson tables with 4+ columns get class "stack" and a data-label per cell, so phones show them as cards. */
(function(){
  function more(el){
    const max=el.scrollWidth-el.clientWidth;
    const v=(el.scrollLeft>4?"l":"")+(el.scrollLeft<max-4?"r":"");
    if(v) el.dataset.more=v; else delete el.dataset.more;
  }
  const all=()=>document.querySelectorAll(".gtabs,.ktabs").forEach(more);
  document.addEventListener("scroll",e=>{ const t=e.target; if(t.matches&&t.matches(".gtabs,.ktabs")) more(t); },true);
  window.addEventListener("resize",all);
  document.addEventListener("click",e=>{ const b=e.target.closest(".gtabs button,.ktabs button"); if(b){ b.scrollIntoView({block:"nearest",inline:"nearest"}); setTimeout(all,350); } });
  function stack(){
    document.querySelectorAll(".lesson .tablebox > table:not(.mini):not(.stack)").forEach(tb=>{
      const heads=[...tb.querySelectorAll("thead th")].map(th=>th.textContent.trim());
      if(heads.length<4) return;
      /* short-cell grids (verb forms, ein/kein tables) read better as a grid: only stack tables with sentence-length cells */
      const cells=[...tb.querySelectorAll("tbody td")], avg=cells.reduce((n,td)=>n+td.textContent.trim().length,0)/(cells.length||1);
      if(avg<16) return;
      tb.classList.add("stack");
      tb.querySelectorAll("tbody tr").forEach(tr=>[...tr.children].forEach((td,i)=>{ if(heads[i]) td.dataset.label=heads[i]; }));
    });
  }
  const go=()=>{ stack(); all(); setTimeout(all,800); };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",go); else go();
  new MutationObserver(()=>{ clearTimeout(go._t); go._t=setTimeout(all,100); }).observe(document.documentElement,{childList:true,subtree:true});
})();
