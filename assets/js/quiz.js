/* Lerne Deutsch: test engine shared by every level.
   Needs TESTS and GROUPS (and optional RULES) from <level>/js/tests.js, and num() from <level>/js/data.js.
   GROUPS entries: [title, english, [test keys], tabLabel?, tabEnglish?]. The tests page shows one tab per group (except the "mix" group).
   Each test: {tag, title, en, enReq? (true = the English line is part of the exercise, so it stays visible even when EN is off), kind: "choice" | "input" | "order" | "gap" | "tapcar" | "mixed", ranges?, gen(range) -> question}
   Each question: {prompt, answer, explain, kind? (overrides the test's kind), options? (choice), inputmode?, umlauts?,
     tokens + end? (order: shuffled word chips the learner taps into place; answer = tokens in order joined by spaces + end;
       optional tokV/tokZ/tokWW per token = verb (red) / connector (dashed) / word-by-word gloss, slots [{lab,v,z}] per place, lock = first n tokens fixed),
     cars + insert + p (gap: the learner taps the gap ▾ where `insert` belongs; answer = the full sentence),
     cars + p (tapcar: the learner taps the car that is in the wrong place; answer = that car's text),
     say? (listening: German text read aloud with assets/js/speech.js, plays automatically), sayAfter? (read aloud from the feedback)}
   Every test runs in rounds of 20 questions (no repeats inside a round), with a progress bar, a streak counter, points and stars.
   Open a test directly with tests.html#<key>, e.g. tests.html#artikel or tests.html#mix. */
const ROUND=20, GOAL=20;
const FLAME='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2c1 3.5 5.5 6 5.5 11a5.5 5.5 0 0 1-11 0c0-2.4 1-4 2.2-5.2.2 1.6.9 2.7 2 3.2C10 8 10.5 5 12 2z"/></svg>';
let current=null, q=null, stats=null, rangeIdx={};
/* English hints in questions are hidden by default; the EN button toggles them (remembered per level). */
let showEn=lstore.get("showEn",false);
/* Colour hints in sentence tests (red verb, Verb label on its place). The 🎨 button switches them off for a harder round (remembered per level). */
let showHint=lstore.get("hint",true);
const applyHint=()=>{ document.body.classList.toggle("nohint",!showHint); document.querySelectorAll(".hinttog").forEach(b=>b.setAttribute("aria-pressed",showHint)); };
const hintBtn=()=>`<button class="btn ghost hinttog" type="button" aria-pressed="${showHint}" title="Farbhilfe an/aus (colour hints on/off)">🎨 Hilfe <span class="en">(hints)</span></button>`;
/* Sentence pictures, shared by every sentence test: one car per word or word group.
   c = {t: text, v: verb (red), z: connector (dashed), ww: word-by-word English, lab: position ("E" = end), cls: extra class, after: text after the car}.
   pos: true shows the position number above each car. wrong: true = a wrong sentence (no 🔊 button, so it is never read aloud). */
const carHtml=(c,pos)=>`<span class="car${c.v?" v":""}${c.z?" z":""}${c.cls?" "+c.cls:""}">${pos&&c.lab?`<small class="pos">${c.lab==="E"?"Ende":c.lab}</small>`:""}${esc(c.t)}${c.ww?`<em class="en">${esc(c.ww)}</em>`:""}</span>${c.after?`<span class="endp">${esc(c.after)}</span>`:""}`;
const carsHtml=(cars,o={})=>`<div class="${o.wrong?"cars wrong":"train cars"}${o.cls?" "+o.cls:""}">${cars.map(c=>carHtml(c,o.pos)).join("")}</div>`;
/* English-only instructions (inside .en) → German instruction that stays visible when English is off */
const INSTR=[
 [/^What does this verb mean\?$/,"Was bedeutet dieses Verb?"],[/^Which German verb is it\?$/,"Welches deutsche Verb ist das?"],
 [/^What does (this|it) mean\?$/,"Was bedeutet das?"],[/^Which German word is this\?$/,"Welches deutsche Wort ist das?"],
 [/^Which direction is this\?$/,"Welche Richtung ist das?"],[/^Which German form field is this\?$/,"Welches deutsche Formularfeld ist das?"],
 [/^What does this form field mean\?$/,"Was bedeutet dieses Formularfeld?"],[/^Which German day\?$/,"Welcher deutsche Tag ist das?"],
 [/^What day is it in English\?$/,"Welcher Tag ist das auf Englisch?"],[/^Which German month\?$/,"Welcher deutsche Monat ist das?"],
 [/^Which month is it\?$/,"Welcher Monat ist das?"],[/^This short form is on calendars and opening hours\. Which day\?$/,"Welcher Tag ist das?"],
 [/^Which country is it\?$/,"Welches Land ist das?"],[/^Which colou?r is it\?$/,"Welche Farbe ist das?"],
 [/^Which price is it\?$/,"Welcher Preis ist das?"],[/^How do you say this price\?$/,"Wie sagt man diesen Preis?"],
 [/^Type this number in digits\./,"Schreib die Zahl mit Ziffern."],[/^Type this year in digits\.$/,"Schreib das Jahr mit Ziffern."],
 [/^Type it in digits\.$/,"Schreib es mit Ziffern."],[/^Choose the German word( for this year)?\.$/,"Wähle das deutsche Wort."],
 [/^Choose the German words\./,"Wähle die deutschen Wörter."],[/^This is the German name of a letter\. Which letter is it\?$/,"Welcher Buchstabe ist das?"],
 [/^Which word do you use for you\?$/,"Welches Wort sagt man für „you“?"],[/^The examiner asks:$/,"Die Prüferin fragt:"],
 [/^Which date is it\? \(day\.month\.\)$/,"Welches Datum ist das?"],[/^Listen\. Which date is it\? \(day\.month\.\)$/,"Hör zu. Welches Datum ist das?"],
 [/^Today is the .* How do you say it\?$/,"Wie sagt man das?"]];
/* labels such as "Hausnummer (house number)" or "Postleitzahl (postcode): type the digits." */
const LABEL=/^(Hausnummer|Postleitzahl, PLZ|Postleitzahl|Telefonnummer) \(([^)]*)\)(: type the digits\.)?$/;
function applyEn(){ document.body.classList.toggle("hide-en",!showEn); document.querySelectorAll(".entog").forEach(b=>{b.setAttribute("aria-pressed",showEn); b.classList.toggle("on",showEn);}); }
function toggleEn(){ showEn=!showEn; lstore.set("showEn",showEn); applyEn(); }
const enBtn=()=>`<button class="entog" type="button" aria-pressed="${showEn}" title="Englisch zeigen/verstecken (show/hide English)">EN<span class="sr"> Englisch zeigen (show English)</span></button>`;
/* Reset every score, star, point and streak of this level (the EN preference stays). */
function resetProgress(){
  if(!confirm("Alle Ergebnisse, Sterne, Punkte und Serien löschen?\n(Delete all results, stars, points and streaks? This cannot be undone.)")) return;
  ["best","stars","xp","day","test"].forEach(k=>{ try{localStorage.removeItem(LS+k)}catch(e){} });
  Object.keys(best).forEach(k=>delete best[k]); Object.keys(starBest).forEach(k=>delete starBest[k]);
  xp=0; day={date:"",count:0,streak:0};
  renderHome(); toast("Zurückgesetzt. (Reset.)");
}
const GROUPS_SHOWN=GROUPS.filter(g=>!(g[2].length===1&&g[2][0]==="mix")).map(g=>[g[0],g[1],g[2],g[3]||g[0].split(" · ")[0],g[4]||g[1]]);
const RULESET=typeof RULES!=="undefined"?RULES:[];
const best=lstore.get("best",{});
const starBest=lstore.get("stars",{});
let xp=lstore.get("xp",0);
let day=lstore.get("day",{date:"",count:0,streak:0});
const ymd=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const today=()=>ymd(new Date()), yesterday=()=>ymd(new Date(Date.now()-864e5));
function bumpDay(){ const t=today(); if(day.date!==t){ day.streak=day.date===yesterday()?day.streak+1:1; day.date=t; day.count=0; } day.count++; lstore.set("day",day); }
/* numbers: spaces are fine (0176 1234567), a dot only as a thousands dot (62.000, not 4.7 for 47),
   and a decimal point for a decimal comma (2.5 for 2,5, also with "Mio." or "Millionen" after it) */
const numEq=(v,a)=>{
  const s=v.replace(/\s+/g,"");
  if(/^\d+$/.test(a)) return (/^\d+$/.test(s)||/^\d{1,3}(\.\d{3})+$/.test(s))&&s.replace(/\./g,"")===a;
  if(/^\d+,\d+$/.test(a)){ const t=s.replace(/(mio\.?|millionen?)$/i,""); return /^\d+[.,]\d+$/.test(t)&&t.replace(".",",")===a; }
  return false;
};
const numSay=n=>typeof num==="function"?`${num(n)[0]} <span class="pron">(${num(n)[1]})</span>`:String(n);
const starStr=s=>"★".repeat(s)+"☆".repeat(3-s);

/* Tests overview: one screen. Slim stats line, one start button, group tabs, compact test list. */
let homeTab=lstore.get("tab",0);
function renderHome(){
  const t=today(), streak=(day.date===t||day.date===yesterday())?day.streak:0, cnt=day.date===t?day.count:0;
  const r=RULESET.length?RULESET[Math.floor(Date.now()/864e5)%RULESET.length]:null;
  const weak=Object.entries(best).filter(([k,b])=>TESTS[k]&&k!=="mix"&&b.n>=5).sort((a,b)=>a[1].ok/a[1].n-b[1].ok/b[1].n)[0];
  if(homeTab>=GROUPS_SHOWN.length) homeTab=0;
  const [g,ge,keys]=GROUPS_SHOWN[homeTab];
  document.body.classList.add("tests-page");
  let h=`<div class="thome">
   <div class="statline">
    <span title="Tage in Folge (days in a row)"><span class="fl">${FLAME}</span><b>${streak}</b> Tage <small>(days)</small></span>
    <span title="Tagesziel (daily goal)"><b>${Math.min(cnt,GOAL)}/${GOAL}</b> heute <small>(today)</small></span>
    <span><b>${xp}</b> Punkte <small>(points)</small></span>
   </div>
   <a class="mixbtn" href="#mix"><span><b>Gemischter Test</b><small>${ROUND} Fragen, alle Teile (${ROUND} questions, all parts)</small></span><span class="play" aria-hidden="true">▶</span></a>`;
  if(weak){ const [k,b]=weak; h+=`<a class="weakline" href="#${k}">Schwächstes <span class="en">(weakest)</span>: <b>${TESTS[k].title}</b> <span class="pct">${Math.round(b.ok/b.n*100)}%</span> →</a>`; }
  h+=`<div class="gtabs" role="tablist" aria-label="Testgruppen (test groups)">${GROUPS_SHOWN.map((x,i)=>`<button type="button" role="tab" data-tab="${i}" aria-selected="${i===homeTab}">${x[3]}<small>${x[4]}</small></button>`).join("")}</div>
   <div class="tlist" role="tabpanel" aria-label="${esc(g)} (${esc(ge)})">`+keys.map(k=>{const tt=TESTS[k],b=best[k],st=starBest[k]||0,pc=b?Math.round(b.ok/b.n*100):null;
    return `<a class="trow" href="#${k}"><span class="tt"><b>${tt.title}</b><small>${tt.en}</small></span><span class="tr"><span class="stars" aria-label="${st} von 3 Sternen (${st} of 3 stars)">${starStr(st)}</span>${pc===null?"":`<small>${pc}%</small>`}</span></a>`}).join("")+`</div>`;
  if(r) h+=`<div class="rday"><span class="tag">Regel des Tages · rule of the day</span><h3>${r[0]} <span class="en">(${r[1]})</span></h3><span class="ex">${r[2]}</span><span class="en">${r[3]}</span><a class="go" href="#${r[4]}">Üben (practise) →</a></div>`;
  h+=`<div class="homefoot"><button type="button" class="btn ghost" id="resetAll">Ergebnisse zurücksetzen <span class="en">(reset scores)</span></button></div>`;
  $("#testHome").innerHTML=h+`</div>`;
  $("#resetAll").onclick=resetProgress;
  $("#testHome").querySelectorAll("[data-tab]").forEach(btn=>btn.onclick=()=>{homeTab=+btn.dataset.tab; lstore.set("tab",homeTab); renderHome(); const f=$(`#testHome [data-tab="${homeTab}"]`); if(f) f.focus({preventScroll:true});});
  const sel=$(`#testHome [data-tab="${homeTab}"]`), strip=$("#testHome .gtabs"); if(sel&&strip) strip.scrollLeft=sel.offsetLeft-(strip.clientWidth-sel.offsetWidth)/2;
}

function showQuiz(on){ $("#testHome").hidden=on; $("#quiz").hidden=!on; document.body.classList.toggle("quizzing",on); if(!on) closeFb(); }
function start(k,skipIntro){ current=k; stats={ok:0,n:0,miss:[],wrong:[],res:[],combo:0,maxCombo:0,xp:0,seen:new Set()}; q=null; lstore.set("test",k); showQuiz(true); window.scrollTo(0,0); if(skipIntro) nextQ(); else showIntro(); }
/* Short "how it works" screen before the first question. The English lines (class keep) always show. */
function showIntro(){
  closeFb();
  const t=TESTS[current], kind=t.kind;
  const how=kind==="input"?["⌨️","Schreibe die Antwort und drücke Enter.","Type your answer and press Enter (or tap Prüfen)."]
    :kind==="order"?["👆","Tippe die Wörter an. Sie füllen die Plätze 1, 2, 3 … Rot = Verb.","Tap the words: they fill places 1, 2, 3 … in turn. Red = verb. Tap a word in your sentence to take it back, then tap Prüfen (check). 🎨 switches the colour hints off."]
    :kind==="gap"?["▾","Tippe auf die Lücke, wo das Wort hingehört.","Tap the gap ▾ where the word belongs. Look at the places: the verb loves position 2."]
    :kind==="tapcar"?["👆","Ein Wort steht am falschen Platz. Tippe es an.","One word is in the wrong place. Tap it. Tip: find the verb and count its position."]
    :kind==="mixed"?["👆","Tippe auf die Antwort, oder schreibe sie.","Tap an answer, or type it and press Enter. The question types change."]
    :["👆","Tippe auf die richtige Antwort.","Tap the right answer. On a keyboard you can also press 1, 2, 3 …"];
  $("#quiz").innerHTML=`<div class="qtop"><button class="xbtn" id="qx" type="button" aria-label="Test beenden (end test)">✕</button><span class="grow"></span>${enBtn()}</div>
   <div class="qcard intro">
   <div class="qhead"><span class="tag">${current==="mix"?"Alle Teile":esc(t.tag)}</span><h2 class="qtitle">${t.title} <span class="en">(${t.en})</span></h2></div>
   <h3>So geht's <span class="keep">(how it works)</span></h3>
   <ol class="howto">
    <li><span class="ic">${how[0]}</span><span>${how[1]}<small class="keep">${how[2]}</small></span></li>
    <li><span class="ic">✅</span><span>Unten siehst du: richtig oder falsch, mit Erklärung.<small class="keep">A panel at the bottom tells you right or wrong, with an explanation.</small></span></li>
    <li><span class="ic">➡️</span><span>Tippe auf „Weiter“ oder drücke Enter.<small class="keep">Tap “Weiter” (next) or press Enter for the next question.</small></span></li>
    <li><span class="ic">EN</span><span>Englisch ein- oder ausschalten.<small class="keep">The EN button (top right) shows or hides English hints. It is off by default. In a few exercises English stays on because you need it.</small></span></li>
    <li><span class="ic">✕</span><span>Mit ✕ beendest du den Test.<small class="keep">✕ (top left) ends the test. One round = ${ROUND} questions.</small></span></li>
   </ol>
   <div class="rbtns"><button class="btn" id="go" type="button">Los geht's <span style="font-weight:400">(start)</span> →</button><button class="btn ghost" id="intx" type="button">Zurück <span class="en">(back)</span></button></div></div>`;
  $("#qx").onclick=exitQuiz; $("#intx").onclick=exitQuiz; $(".entog").onclick=toggleEn; applyEn();
  $("#go").onclick=nextQ; $("#go").focus({preventScroll:true});
}
function exitQuiz(){ if(TESTS[decodeURIComponent(location.hash.slice(1))]){ location.hash=""; return; } current=null; showQuiz(false); renderHome(); window.scrollTo(0,0); }
function nextQ(){
  closeFb();
  if(stats.n>=ROUND){ showResult(); return; }
  const t=TESTS[current]; const r=t.ranges?t.ranges[rangeIdx[current]||0]:null;
  let tries=0; do{ q=t.gen(r); tries++; }while(stats.seen.has(q.prompt+"|"+q.answer)&&tries<25);
  stats.seen.add(q.prompt+"|"+q.answer); q.done=false; draw();
}
function togo(){
  const left=ROUND-stats.n;
  if(left<=0) return `<b>Fertig!</b> (done) Alle ${numSay(ROUND)} Fragen beantwortet (all questions answered)`;
  if(left===1) return `<b>Letzte Frage!</b> (last question)`;
  return `<b>Noch ${left} Fragen</b> (${left} questions to go) · ${numSay(left)}`;
}
function topBar(){
  const shown=Math.min(stats.n+1,ROUND);
  return `<div class="qtop"><button class="xbtn" id="qx" type="button" aria-label="Test beenden (end test)">✕</button>
   <div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="${ROUND}" aria-valuenow="${stats.n}" aria-label="Fortschritt (progress)">${Array.from({length:ROUND},(_,i)=>`<i class="${stats.res[i]===true?"ok":stats.res[i]===false?"no":i===stats.n?"cur":""}"></i>`).join("")}</div>
   <span class="qcount" id="qcount" aria-label="Frage ${shown} von ${ROUND} (question ${shown} of ${ROUND})">${shown}<small>/${ROUND}</small></span>${enBtn()}
   <div class="qtogo"><span id="togo">${togo()}</span><span class="streak ${stats.combo>=3?"hot":""}" title="Richtig in Folge (correct in a row)">${FLAME}<span id="combo">${stats.combo}</span></span></div></div>`;
}
function draw(){
  const t=TESTS[current], kind=q.kind||t.kind;
  window.scrollTo(0,0);
  let h=topBar()+`<div class="qcard">
   <div class="qhead"><span class="tag">${current==="mix"?esc(q.from):esc(t.tag)}</span><h2 class="qtitle">${t.title} <span class="en">(${t.en})</span></h2></div>`;
  if(t.ranges) h+=`<div class="seg" role="group" aria-label="Bereich (range)">${t.ranges.map((r,i)=>`<button type="button" data-r="${i}" aria-pressed="${(rangeIdx[current]||0)===i}">${r[0]}</button>`).join("")}</div>`;
  h+=`<div class="q">${q.prompt}</div>`;
  if(q.say) h+=`<div class="controls"><button class="btn ghost" type="button" id="again">▶ Anhören <span class="en">(listen)</span></button><button class="btn ghost" type="button" id="slow">🐢 Langsam <span class="en">(slow)</span></button>${typeof TTS!=="undefined"&&TTS.ok?"":`<span class="warn">Audio doesn't work in this browser. Try Chrome, Edge or Safari.</span>`}</div>`;
  if(kind==="order"){
    h+=`<div class="slots" id="built" aria-label="Dein Satz (your sentence)"></div><div class="pool" id="pool"></div>
      <div class="controls"><button class="btn" type="button" id="chk">Prüfen <span style="font-weight:400">(check)</span></button><button class="btn ghost" type="button" id="undo">↺ Neu <span class="en">(reset)</span></button>${q.tokV?hintBtn():""}</div>`;
  } else if(kind==="gap"){
    h+=`<div class="gaptrain" id="gt" aria-label="Satz mit Lücken (sentence with gaps)"></div>`;
  } else if(kind==="tapcar"){
    h+=`<div class="tapcars" id="tc" aria-label="Tippe das falsche Wort an (tap the wrong word)">${q.cars.map((c,i)=>`<button type="button" class="car" data-c="${i}">${esc(c.t)}${c.ww?`<em class="en">${esc(c.ww)}</em>`:""}</button>`).join("")}<span class="endp">${esc(q.p||"")}</span></div>`;
  } else if(kind==="choice"){
    h+=`<div class="opts">${q.options.map((o,i)=>`<button type="button" class="opt ${q.cls?q.cls(o):""}" data-i="${i}">${i<9?`<span class="k">${i+1}</span>`:""}<span>${q.label?q.label(o):esc(o)}</span></button>`).join("")}</div>`;
  } else {
    h+=`<form class="answerrow" id="ansForm"><input type="text" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" ${q.inputmode?`inputmode="${q.inputmode}"`:""} aria-label="Deine Antwort (your answer)" placeholder="Antwort (answer)">
      ${q.umlauts?`<div class="umlauts">${["ä","ö","ü","ß"].map(c=>`<button type="button" data-ch="${c}">${c}</button>`).join("")}</div>`:""}
      <button class="btn" type="submit">Prüfen <span style="font-weight:400">(check)</span></button></form>`;
  }
  $("#quiz").innerHTML=h+`</div>`;
  $("#qx").onclick=exitQuiz; $(".entog").onclick=toggleEn;
  /* German instructions stay visible when English is off: text before the first (English) .pron moves out of .en */
  $("#quiz").querySelectorAll(".q > .en").forEach(e=>{ const kids=[...e.childNodes], i=kids.findIndex(n=>n.nodeType===1&&n.classList.contains("pron")); if(i<1) return; const pre=kids.slice(0,i); if(!pre.map(n=>n.textContent).join("").trim()) return; const dq=document.createElement("span"); dq.className="dq"; e.before(dq); pre.forEach(n=>dq.appendChild(n)); dq.appendChild(document.createTextNode(" ")); dq.appendChild(e); });
  $("#quiz").querySelectorAll(".q > .en").forEach(e=>{ const t=e.textContent.replace(/\s+/g," ").trim(); let de=null,en=t; const m=LABEL.exec(t);
    if(m){ de=m[1]+(m[3]?": Schreib die Ziffern.":""); en="("+m[2]+")"+(m[3]?" type the digits.":""); }
    else { const r=INSTR.find(x=>x[0].test(t)); if(r){ de=r[1]; en=t.startsWith("(")?t:"("+t+")"; } }
    if(!de) return; const dq=document.createElement("span"); dq.className="dq"; dq.append(de+" "); const sp=document.createElement("span"); sp.className="en"; sp.textContent=en; dq.append(sp); e.replaceWith(dq); });
  applyEn(); applyHint(); $("#quiz").querySelectorAll(".hinttog").forEach(b=>b.onclick=()=>{ showHint=!showHint; lstore.set("hint",showHint); applyHint(); });
  { const qq=$("#quiz .q"), c=qq.cloneNode(true); c.querySelectorAll(".en").forEach(e=>e.remove()); if(!c.textContent.trim()||TESTS[current].enReq||q.enReq) qq.classList.add("needs-en"); }
  $("#quiz").querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{rangeIdx[current]=+b.dataset.r; const tt=TESTS[current]; q=tt.gen(tt.ranges[+b.dataset.r]); q.done=false; draw();});
  if(q.say){ $("#again").onclick=()=>speak(q.say); $("#slow").onclick=()=>speak(q.say,0.6); speak(q.say); }
  if(kind==="order") drawOrder();
  else if(kind==="gap") drawGap();
  else if(kind==="tapcar") $("#quiz").querySelectorAll("#tc .car").forEach(b=>b.onclick=()=>{
    if(q.done) return; const c=q.cars[+b.dataset.c]; answer(c.t);
    $("#quiz").querySelectorAll("#tc .car").forEach(x=>{ x.disabled=true; if(q.cars[+x.dataset.c].t===q.answer) x.classList.add("good"); });
    if(c.t!==q.answer) b.classList.add("bad"); })
  else if(kind==="choice") $("#quiz").querySelectorAll(".opt").forEach(b=>b.onclick=()=>answer(q.options[+b.dataset.i],b));
  else {
    const inp=$("#ans"); if(matchMedia("(hover:hover)").matches) inp.focus({preventScroll:true});
    $("#quiz").querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>{inp.value+=b.dataset.ch; inp.focus();});
    $("#ansForm").onsubmit=e=>{e.preventDefault(); if(q.done){nextQ();return} if(inp.value.trim()) answer(inp.value.trim());};
  }
}
/* order questions: tap a chip in the pool to fill the next place, tap it in the sentence to take it back.
   The sentence line shows one numbered place per word (with q.slots: the grammar position, red "Verb" places, "Ende" for the end). */
function drawOrder(){
  const lock=q.lock||0, end=q.end||"";
  const slots=q.slots||q.tokens.map((_,i)=>({lab:String(i+1)}));
  let built=Array.from({length:lock},(_,i)=>i);
  const chip=(i,attr)=>`<button type="button" class="chipbtn${q.tokV&&q.tokV[i]?" v":""}${q.tokZ&&q.tokZ[i]?" z":""}" ${attr}>${esc(q.tokens[i])}${q.tokWW?`<em class="en">${esc(q.tokWW[i])}</em>`:""}</button>`;
  const paint=checked=>{
    $("#built").innerHTML=slots.map((s,k)=>{ const i=built[k], st=checked&&i!==undefined?(q.tokens[i]===q.answerTokens[k]?" good":" bad"):"";
      return `<div class="slot${s.v?" v":""}${s.z?" z":""}${k<lock?" lock":""}${st}"><small class="pos">${s.lab==="E"?"Ende":s.lab}${s.v?` <b class="vt">Verb</b>`:""}</small>${i===undefined?`<span class="hole" aria-hidden="true"></span>`:chip(i,k<lock?"disabled":`data-b="${i}"`)}</div>`; }).join("")+`<span class="endp">${esc(end)}</span>`;
    const inPool=q.tokens.map((_,i)=>i).filter(i=>!built.includes(i));
    $("#pool").innerHTML=inPool.map(i=>chip(i,`data-p="${i}"`)).join("");
    if(q.done) $("#quiz").querySelectorAll(".chipbtn").forEach(b=>b.disabled=true);
    $("#pool").querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{ if(q.done) return; built.push(+b.dataset.p); paint(); });
    $("#built").querySelectorAll("[data-b]").forEach(b=>b.onclick=()=>{ if(q.done) return; built=built.filter(i=>i!==+b.dataset.b); paint(); });
  };
  paint();
  $("#undo").onclick=()=>{ if(q.done) return; built=built.slice(0,lock); paint(); };
  $("#chk").onclick=()=>{
    if(q.done) return;
    if(built.length<q.tokens.length){ toast("Benutze alle Wörter. (Use all the words.)"); return; }
    const v=built.map(i=>q.tokens[i]).join(" ")+end;
    /* wrong: show your sentence as a picture above the right one, wrong places outlined */
    if(v!==q.answer) q.explain=`<span class="lbl">Dein Satz <span class="en">(your sentence)</span></span>`+carsHtml(built.map((i,k)=>({t:q.tokens[i]+(k===built.length-1?end:""),v:q.tokV&&q.tokV[i],z:q.tokZ&&q.tokZ[i],cls:q.tokens[i]===q.answerTokens[k]?"":"bad"})),{wrong:true})
      +`<span class="lbl">Richtig <span class="en">(right)</span></span>`+q.explain;
    answer(v);
    $("#built").classList.add(v===q.answer?"ok":"no"); paint(true);
    $("#chk").disabled=true; $("#undo").disabled=true;
  };
}
/* gap questions: a ▾ before, between and after the words; tapping one puts q.insert there */
function drawGap(){
  const n=q.cars.length;
  const paint=pos=>{
    let h="";
    for(let i=0;i<=n;i++){
      if(pos===undefined) h+=`<button type="button" class="gapbtn" data-g="${i}" aria-label="Lücke ${i+1} (gap ${i+1})">▾</button>`;
      else if(pos===i) h+=carHtml({...q.insert,cls:q.done&&q.lastOk?"good":"bad"});
      if(i<n) h+=carHtml(q.cars[i]);
    }
    $("#gt").innerHTML=h+`<span class="endp">${esc(q.p||"")}</span>`;
    $("#gt").querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{
      if(q.done) return; const g=+b.dataset.g, w=q.cars.map(c=>c.t); w.splice(g,0,q.insert.t);
      const v=w.join(" ")+(q.p||""); q.lastOk=v===q.answer; answer(v); paint(g); });
  };
  paint();
}
const CHEERS=["Richtig! (correct)","Super! (great)","Sehr gut! (very good)","Genau! (exactly)","Toll! (great)","Prima! (excellent)"];
const COMBO={3:"3 in Folge! (3 in a row)",5:"5 in Folge! Weiter so! (keep it up)",7:"7 in Folge! Wow!",10:"10 in Folge! Super!",20:"Perfekt! 20 von 20!"};
function answer(v,btn){
  if(q.done) return; q.done=true;
  const kind=q.kind||TESTS[current].kind;
  const ok = ["choice","order","gap","tapcar"].includes(kind) ? v===q.answer : (sameAnswer(v,q.answer)||numEq(v,q.answer));
  stats.n++; stats.res.push(ok); let gain=0;
  if(ok){ stats.ok++; stats.combo++; stats.maxCombo=Math.max(stats.maxCombo,stats.combo); gain=10+(stats.combo>=3?5:0); stats.xp+=gain; xp+=gain; lstore.set("xp",xp); }
  else { stats.combo=0; if(q.from&&!stats.miss.includes(q.fromKey)) stats.miss.push(q.fromKey); stats.wrong.push({p:q.prompt,a:q.answer,e:q.explain,given:v}); }
  const b=best[current]||{ok:0,n:0}; b.n++; if(ok) b.ok++; best[current]=b; lstore.set("best",best);
  bumpDay();
  if(btn){ $("#quiz").querySelectorAll(".opt").forEach(o=>{o.disabled=true; if(q.options[+o.dataset.i]===q.answer) o.classList.add("right");}); if(!ok) btn.classList.add("wrong"); }
  else if(!["order","gap","tapcar"].includes(kind)){ const inp=$("#ans"); if(inp) inp.readOnly=true; }
  const pi=$("#quiz").querySelectorAll(".prog i"); pi[stats.n-1].className=ok?"ok":"no"; $("#togo").innerHTML=togo();
  $("#combo").textContent=stats.combo; $("#quiz .streak").classList.toggle("hot",stats.combo>=3);
  if(ok&&COMBO[stats.combo]) toast(COMBO[stats.combo]);
  const last=stats.n>=ROUND;
  const sh=$("#fbSheet"); sh.className="fbsheet "+(ok?"ok":"no");
  sh.innerHTML=`<div class="fbin"><div class="fbtop"><span class="verdict">${ok?pick(CHEERS):"Leider falsch. (Sadly wrong.)"}</span>${ok?`<span class="gain">+${gain} ${stats.combo>=3?"🔥":""}</span>`:""}</div>
   ${ok?"":`<span class="ans">Richtig ist (correct is): ${esc(q.answer)}</span>`}<span>${q.explain}</span>
   <div class="fbrow">${(q.say||q.sayAfter)&&typeof TTS!=="undefined"&&TTS.ok?`<button class="btn ghost" type="button" id="hearAns" aria-label="Noch einmal anhören (listen again)">🔊</button>`:""}<button class="btn" id="next" type="button">${last?'Ergebnis <span style="font-weight:400">(result)</span> →':`Weiter <span style="font-weight:400">(next)</span> →`}</button></div></div>`;
  sh.hidden=false; document.body.classList.add("fbopen"); fitAboveSheet();
  $("#next").onclick=nextQ; $("#next").focus({preventScroll:true});
  if($("#hearAns")) $("#hearAns").onclick=()=>speak(q.sayAfter||q.say);
  if(typeof addSpeakers==="function") addSpeakers(sh);
}
function closeFb(){ const s=$("#fbSheet"); if(s){ s.hidden=true; s.innerHTML=""; } document.body.classList.remove("fbopen"); const z=$("#quiz"); if(z) z.style.paddingBottom=""; }
/* Keep the question and your answer visible above the feedback panel, without manual scrolling. */
function fitAboveSheet(){
  const sh=$("#fbSheet"), z=$("#quiz"); if(!sh||!z) return;
  const hgt=sh.offsetHeight; z.style.paddingBottom=(hgt+16)+"px";
  const target=z.querySelector(".opts")||z.querySelector(".answerrow")||z.querySelector(".pool")||z.querySelector(".gaptrain")||z.querySelector(".tapcars"); if(!target) return;
  const over=target.getBoundingClientRect().bottom-(innerHeight-hgt-12);
  if(over>0) window.scrollBy({top:over,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}
let toastT=null;
function toast(msg){ const el=$("#toast"); el.textContent=msg; el.hidden=false; el.style.animation="none"; void el.offsetWidth; el.style.animation=""; clearTimeout(toastT); toastT=setTimeout(()=>el.hidden=true,1500); }

document.addEventListener("keydown",e=>{
  if(!document.body.classList.contains("quizzing")||!q||q.done) return;
  if(e.target.matches("input,textarea,select")) return;
  const n=parseInt(e.key,10); if(!n) return;
  const o=$("#quiz").querySelectorAll(".opt")[n-1]; if(o){ e.preventDefault(); o.click(); }
});

function showResult(){
  closeFb();
  const pct=Math.round(stats.ok/stats.n*100), s=pct===100?3:pct>=80?2:pct>=60?1:0;
  const newBest=s>(starBest[current]||0); if(newBest){ starBest[current]=s; lstore.set("stars",starBest); }
  const msg=pct===100?"Perfekt! Alles richtig. (Perfect! All correct.)":pct>=80?"Super! Sehr gut. (Great! Very good.)":pct>=60?"Bestanden! (Passed!) 60% is the pass mark in the exam.":"Weiter üben! (Keep practising!) You will get there.";
  const t=TESTS[current];
  let h=topBar()+`<div class="qcard"><div class="result">
   <div class="bigstars" aria-label="${s} von 3 Sternen (${s} of 3 stars)">${[0,1,2].map(i=>`<span class="${i<s?"on":""}">★</span>`).join("")}</div>
   <div class="rscore">${stats.ok} / ${stats.n}</div>
   <span class="en">${numSay(stats.ok)} von <span class="pron">(fon)</span> ${numSay(stats.n)}</span>
   <p class="rmsg">${msg}</p>
   <div class="rchips"><span class="xp">+${stats.xp} Punkte (points)</span><span>${FLAME.replace('<svg','<svg style="width:16px;height:16px;vertical-align:-2px;color:var(--gold)"')} Beste Serie (best streak): ${stats.maxCombo}</span>${newBest?`<span>Neuer Rekord! (new record)</span>`:""}</div>`;
  if(stats.wrong.length) h+=`<details class="review" ${stats.wrong.length<=3?"open":""}><summary><h3>Wiederholen <span class="en">(review your ${stats.wrong.length} mistakes)</span></h3></summary>${stats.wrong.map(w=>`<div class="rv"><div class="rp">${w.p}</div><span class="ra">✓ ${esc(w.a)} <span class="en" style="font-weight:400;color:var(--bad)">· deine Antwort (your answer): ${esc(w.given)}</span></span><span class="re">${w.e}</span></div>`).join("")}</details>`;
  if(current==="mix"&&stats.miss.length) h+=`<div class="practice"><span>Üb das noch einmal <span class="en">(practise these again)</span></span>${stats.miss.map(k=>`<a class="go" href="#${k}">${TESTS[k].title}</a>`).join("")}</div>`;
  h+=`<div class="rbtns"><button class="btn" id="again10" type="button">Noch eine Runde <span style="font-weight:400">(one more round)</span></button><button class="btn ghost" id="home10" type="button">Übersicht <span style="font-weight:400">(overview)</span></button></div></div></div>`;
  $("#quiz").innerHTML=h; window.scrollTo(0,0);
  $("#qx").onclick=exitQuiz; $(".entog").onclick=toggleEn; applyEn(); $("#again10").onclick=()=>start(current,true); $("#home10").onclick=exitQuiz;
  if(s>=2) confetti();
}

function confetti(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c=$("#confetti"), x=c.getContext("2d"), cs=getComputedStyle(document.documentElement);
  const cols=["--der","--die","--das","--gold","--pl"].map(v=>cs.getPropertyValue(v).trim());
  const W=c.width=innerWidth, H=c.height=innerHeight;
  const P=Array.from({length:120},()=>({x:W/2+(Math.random()-.5)*W*.3,y:H*.35,vx:(Math.random()-.5)*11,vy:-Math.random()*12-4,r:Math.random()*6+4,a:Math.random()*6,va:(Math.random()-.5)*.3,c:pick(cols)}));
  let f=0; (function step(){ x.clearRect(0,0,W,H); P.forEach(p=>{p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.va; x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore();});
    if(++f<150) requestAnimationFrame(step); else x.clearRect(0,0,W,H); })();
}


/* Hash routing: tests.html#artikel opens that test, tests.html shows the overview.
   The browser's back button leaves a running test. */
function fromHash(){
  const k=decodeURIComponent(location.hash.slice(1));
  if(TESTS[k]){ start(k); return true; }
  if(current){ current=null; showQuiz(false); renderHome(); window.scrollTo(0,0); }
  return false;
}
window.addEventListener("hashchange",fromHash);
document.addEventListener("click",e=>{
  const a=e.target.closest('a[href^="#"]'); if(!a) return;
  const k=a.getAttribute("href").slice(1);
  if(a.hasAttribute("data-scroll")){ e.preventDefault(); const el=document.getElementById(k); if(el) el.scrollIntoView({behavior:"smooth",block:"start"}); return; }
  if(TESTS[k]&&k===decodeURIComponent(location.hash.slice(1))){ e.preventDefault(); start(k); }
});
document.body.insertAdjacentHTML("beforeend",'<div class="fbsheet" id="fbSheet" hidden></div><div class="toast" id="toast" role="status" hidden></div><canvas id="confetti" aria-hidden="true"></canvas>');
applyEn(); applyHint();
renderHome();
fromHash();
