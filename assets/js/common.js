/* Lerne Deutsch: small helpers shared by every page and level. */
const $=s=>document.querySelector(s);
const pick=a=>a[Math.floor(Math.random()*a.length)];
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const store={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

const norm=s=>s.toLowerCase().replace(/\s+/g,"").replace(/ae/g,"ä").replace(/oe/g,"ö").replace(/ue/g,"ü").replace(/ss/g,"ß");

/* Per-level browser storage: keys are prefixed with the level id (a1:, a2:, …). */
const LS = (window.LEVEL && LEVEL.id ? LEVEL.id : "site") + ":";
const lstore = { get: (k, d) => store.get(LS + k, d), set: (k, v) => store.set(LS + k, v) };
