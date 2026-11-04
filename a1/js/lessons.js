/* A1 lessons: small interactive parts. Each block only runs on the page that has its element. */

/* Lesson 1: example sentence, word by word */
const typeColor={Nomen:"var(--der)",Verb:"var(--die)",Artikel:"var(--das)",Pronomen:"var(--pl)",Adjektiv:"var(--muted)",Adverb:"var(--muted)","Präposition":"var(--muted)",Konjunktion:"var(--muted)"};
if($("#demoSent")) $("#demoSent").innerHTML=SENTS[1].map(([w,t,e])=>`<span class="tok"><b>${w}</b><i>${e}</i><s style="color:${typeColor[t]}">${t}</s></span>`).join("")
;


/* Lesson 9: number grid and number explorer */
if($("#numGrid")){
const gridNums=[...Array(21).keys(),21,22,25,30,40,47,50,60,70,74,80,90,99,100,101,250];
$("#numGrid").innerHTML=gridNums.map(n=>{const [w,p]=num(n);return `<div class="numcell" data-tap-say="${w}"><span class="d">${n}</span><span class="w">${w}</span><span class="pron">${p}</span></div>`}).join("");
function explore(){ const v=parseInt($("#explIn").value,10); if(isNaN(v)||v<0||v>999){$("#explOut").innerHTML='<span class="en">Enter a number from 0 to 999.</span>';return}
  const [w,p]=num(v); $("#explOut").innerHTML=`<b>${w}</b><br><span class="pron">${p}</span>`; }
$("#explIn").addEventListener("input",explore); explore();
}

/* Lesson 8: alphabet grid */
if($("#abcGrid")) $("#abcGrid").innerHTML=ABC.map(([l,p,t])=>`<div class="abcc${t?' trap':''}" data-tap-say="${SAY[l]}"><b>${l}</b><span style="font-weight:600">${SAY[l]}</span><span class="pron">${p}</span></div>`).join("");

/* Lesson 10: introduce yourself (text builder, saved in this browser) */
if($("#builder")){
const BF=["b-name","b-alter","b-land","b-ort","b-spr","b-beruf","b-hobby","b-tel"];
const saved=lstore.get("intro",{}); BF.forEach(id=>{ if(saved[id]!=null) document.getElementById(id).value=saved[id]; });
function buildIntro(){
  const g=id=>document.getElementById(id).value.trim(); const v={}; BF.forEach(id=>v[id]=g(id)); lstore.set("intro",v);
  const name=v["b-name"]||"…", land=esc(v["b-land"]||"…"), ort=esc(v["b-ort"]||"…"), spr=esc(v["b-spr"]||"…"), beruf=esc(v["b-beruf"]||"…"), hob=esc(v["b-hobby"]||"…");
  const a=parseInt(v["b-alter"],10), aOk=!isNaN(a)&&a>=0&&a<1000;
  const letters=[...name.toUpperCase()].filter(c=>/[A-ZÄÖÜß]/.test(c));
  const spellDe=letters.join(" – "), spellPron=letters.map(c=>{const f=ABC.find(x=>x[0]===c);return f?`${c} = ${f[1]}`:c}).join(" · ");
  const tel=v["b-tel"].replace(/\D/g,""), telWords=[...tel].map(d=>U[+d][0]);
  const L=[
   ["Name",`Hallo, ich heiße ${esc(name)}.`,`Hello, I am called ${esc(name)}.`],
   ["Alter",`Ich bin ${aOk?a:"…"} Jahre alt.`,aOk?`I am ${a} years old. · ${a} = ${num(a)[0]} <span class="pron">(${num(a)[1]})</span>`:"I am … years old. · Type your age above.",aOk?`Ich bin ${num(a)[0]} Jahre alt.`:null],
   ["Land",`Ich komme aus ${land}.`,`I come from ${land}.`],
   ["Wohnort",`Ich wohne in ${ort}.`,`I live in ${ort}.`],
   ["Sprachen",`Ich spreche ${spr}.`,`I speak ${spr}.`],
   ["Beruf",`Ich bin ${beruf} von Beruf.`,`I am ${beruf} by profession. (no article!)`],
   ["Hobby",`Meine Hobbys sind ${hob}.`,`My hobbies are ${hob}.`],
   ["Buchstabieren",`Mein Name: ${spellDe}.`,`Spelling: <span class="pron">${spellPron}</span>`,letters.length?["Mein Name",...letters.map(letterSay)]:null],
   ["Nummer",`Meine Telefonnummer ist ${esc(v["b-tel"]||"…")}.`,tel?`Say it digit by digit: ${telWords.join(" · ")}`:"Type a number above.",tel?["Meine Telefonnummer ist",...telWords]:null]
  ];
  document.getElementById("introOut").innerHTML=L.map((l,i)=>{return `<div class="iline"><div><span class="kw">${l[0]}</span><span class="de">${l[1]}</span><span class="en">${l[2]}</span></div></div>`;}).join("");
}
document.getElementById("builder").addEventListener("input",buildIntro);
document.getElementById("builder").addEventListener("submit",e=>e.preventDefault());
buildIntro();

}


/* ---------- Visual widgets ---------- */
const artCls=a=>a==="der"?"m":a==="die"?"f":"n";

/* Scenes: tap an object to hear it. rooms = [[title, English, [[emoji, article, word], …]], …] */
function renderScene(id, rooms){
  const el=$("#"+id); if(!el) return;
  el.innerHTML=rooms.map(([t,en,os])=>`<div class="room"><h4>${t} <span>(${en})</span></h4><div class="objs">${os.map(([e,a,w])=>`<button type="button" class="obj ${artCls(a)}" data-tap-say="${a} ${w}"><span class="e" aria-hidden="true">${e}</span><span class="w"><i>${a}</i> ${w}</span></button>`).join("")}</div></div>`).join("");
}
renderScene("sceneWohnung",[
 ["Die Küche","kitchen",[["🧊","der","Kühlschrank"],["🍽️","der","Tisch"],["🪑","der","Stuhl"],["🍳","die","Pfanne"]]],
 ["Das Wohnzimmer","living room",[["🛋️","das","Sofa"],["📺","der","Fernseher"],["💡","die","Lampe"],["🪴","die","Pflanze"]]],
 ["Das Schlafzimmer","bedroom",[["🛏","das","Bett"],["⏰","die","Uhr"],["🪞","der","Spiegel"],["🪟","das","Fenster"]]],
 ["Das Badezimmer","bathroom",[["🚿","die","Dusche"],["🛁","die","Badewanne"],["🚽","die","Toilette"],["🪥","die","Zahnbürste"]]],
 ["Der Flur","hallway",[["🚪","die","Tür"],["🔑","der","Schlüssel"]]]]);
renderScene("sceneMarkt",[
 ["Obst und Gemüse","fruit and veg",[["🍎","der","Apfel"],["🍌","die","Banane"],["🥕","die","Karotte"],["🍅","die","Tomate"]]],
 ["Milch und Eier","dairy and eggs",[["🥛","die","Milch"],["🧀","der","Käse"],["🧈","die","Butter"],["🥚","das","Ei"]]],
 ["Brot und Kuchen","bakery",[["🍞","das","Brot"],["🥖","das","Brötchen"],["🍰","der","Kuchen"]]],
 ["Getränke","drinks",[["💧","das","Wasser"],["🧃","der","Saft"],["🍺","das","Bier"],["🍷","der","Wein"]]],
 ["Fleisch und Fisch","meat and fish",[["🥩","das","Fleisch"],["🍗","das","Hähnchen"],["🐟","der","Fisch"]]]]);
renderScene("sceneBaum",[
 ["Die Großeltern","grandparents",[["👴","der","Opa"],["👵","die","Oma"]]],
 ["Die Eltern","parents",[["👨","der","Vater"],["👩","die","Mutter"]]],
 ["Die Kinder","children",[["👦","der","Bruder"],["👧","die","Schwester"],["👨‍👦","der","Sohn"],["👩‍👧","die","Tochter"]]]]);

/* Conjugation chips: the stem stays, the ending slides */
if($("#conj")){
 const V=[["wohnen","wohn","live"],["lernen","lern","learn"],["machen","mach","make, do"],["kommen","komm","come"],["spielen","spiel","play"]];
 const P=[["ich","e","e-e"],["du","st","e-st"],["er / sie / es","t","e-t"],["wir","en","e-en"],["ihr","t","e-t"],["sie / Sie","en","e-en"]];
 let vi=0,pi=0;
 const draw=()=>{const [inf,stem,en]=V[vi],[p,end,c]=P[pi];
  $("#conj").innerHTML=`<div class="vsel" role="group" aria-label="Verb">${V.map((v,i)=>`<button type="button" data-v="${i}" aria-pressed="${i===vi}">${v[0]}</button>`).join("")}</div>
  <div class="psel" role="group" aria-label="Person">${P.map((x,i)=>`<button type="button" data-p="${i}" aria-pressed="${i===pi}">${x[0]}</button>`).join("")}</div>
  <div class="word" aria-live="polite"><span class="pron0">${p}</span><span class="stem">${stem}</span><span class="end ${c}">${end}</span></div>
  <p class="en" style="text-align:center">${inf} (${en}): the stem <b>${stem}</b> never changes, only the ending slides. Tap a person.</p>`;};
 $("#conj").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
  if(b.dataset.v!==undefined)vi=+b.dataset.v; else if(b.dataset.p!==undefined)pi=+b.dataset.p; else return;
  draw();speak(`${P[pi][0].split(" / ")[0]} ${V[vi][1]}${P[pi][1]}`);const f=$(`#conj [data-p="${pi}"]`);if(f)f.focus({preventScroll:true});});
 draw();
}

/* Word-order builder: tap or drag the coloured tiles into the right order. Tile types: v verb, s subject, t time, w question word, o other */
if($("#wordbuilder")){
 const S=[
  [[["Ich","s"],["lerne","v"],["Deutsch.","o"]],"I learn German.","The verb is in place 2."],
  [[["Heute","t"],["lerne","v"],["ich","s"],["Deutsch.","o"]],"Today I learn German.","Time first: the verb stays in place 2, ich jumps behind it."],
  [[["Wo","w"],["wohnst","v"],["du?","s"]],"Where do you live?","W-word 1st, verb 2nd."],
  [[["Wohnst","v"],["du","s"],["in Berlin?","o"]],"Do you live in Berlin?","Yes/no question: the verb is first."],
  [[["Ich","s"],["kann","v"],["heute","t"],["nicht","o"],["kommen.","v"]],"I can't come today.","Modal verb in place 2, the infinitive at the very end."],
  [[["Möchtest","v"],["du","s"],["einen Kaffee","o"],["trinken?","v"]],"Would you like to drink a coffee?","Modal first in a yes/no question, the infinitive at the end."],
  [[["Morgen","t"],["muss","v"],["ich","s"],["früh","t"],["aufstehen.","v"]],"Tomorrow I have to get up early.","Time first, modal in place 2, aufstehen stays in one piece at the end."]];
 let cur=-1,placed=[],pool=[],solved=false;
 const tile=(x,from)=>`<button type="button" class="tile ${x.c}" draggable="true" data-i="${x.i}" data-from="${from}">${esc(x.t)}</button>`;
 const draw=()=>{$("#wordbuilder").innerHTML=`<p class="en">${S[cur][1]}</p><div class="line" id="wbLine" aria-label="Your sentence">${placed.map(x=>tile(x,"line")).join("")}</div><div class="pool" id="wbPool" aria-label="Words">${pool.map(x=>tile(x,"pool")).join("")}</div><p class="fb" id="wbFb" aria-live="polite"></p><div class="btns"><button type="button" class="go" data-act="check">Prüfen <span class="en">(check)</span></button><button type="button" class="go" data-act="next">Neuer Satz <span class="en">(new sentence)</span></button></div>`;};
 const next=()=>{cur=(cur+1+Math.floor(Math.random()*(S.length-1)))%S.length;pool=shuffle(S[cur][0].map((t,i)=>({t:t[0],c:t[1],i})));placed=[];solved=false;draw();};
 const move=(i,to)=>{const x=pool.find(o=>o.i==i)||placed.find(o=>o.i==i);if(!x)return;pool=pool.filter(o=>o!==x);placed=placed.filter(o=>o!==x);(to==="line"?placed:pool).push(x);draw();};
 $("#wordbuilder").addEventListener("click",e=>{const t=e.target.closest(".tile"),b=e.target.closest("[data-act]");
  if(t&&!solved){move(t.dataset.i,t.dataset.from==="pool"?"line":"pool");return;}
  if(!b)return;if(b.dataset.act==="next"){next();return;}
  const ok=placed.length===S[cur][0].length&&placed.every((x,k)=>x.i===k);
  const right=S[cur][0].map(x=>x[0]).join(" ");
  $("#wbFb").innerHTML=ok?`✅ Richtig! <span class="en">${esc(S[cur][2])}</span>`:`❌ Nicht ganz. <b>${esc(right)}</b> <span class="en">${esc(S[cur][2])}</span>`;
  if(ok){solved=true;speak(right);}});
 $("#wordbuilder").addEventListener("dragstart",e=>{const t=e.target.closest(".tile");if(t)e.dataTransfer.setData("text/plain",t.dataset.i);});
 $("#wordbuilder").addEventListener("dragover",e=>{if(e.target.closest("#wbLine,#wbPool"))e.preventDefault();});
 $("#wordbuilder").addEventListener("drop",e=>{const z=e.target.closest("#wbLine,#wbPool");if(!z)return;e.preventDefault();move(e.dataTransfer.getData("text/plain"),z.id==="wbLine"?"line":"pool");});
 next();
}

/* Clock face: pick a time, see the hands and both ways to say it */
if($("#clockbox")){
 const T=[[8,0,"acht Uhr","acht Uhr"],[8,15,"acht Uhr fünfzehn","Viertel nach acht"],[8,30,"acht Uhr dreißig","halb neun"],[8,45,"acht Uhr fünfundvierzig","Viertel vor neun"],[8,50,"acht Uhr fünfzig","zehn vor neun"],[14,30,"vierzehn Uhr dreißig","halb drei"],[19,5,"neunzehn Uhr fünf","fünf nach sieben"]];
 let ti=2;
 const draw=()=>{const [h,m,off,inf]=T[ti];const ha=((h%12)+m/60)*30,ma=m*6,r=(a,l)=>[100+l*Math.sin(a*Math.PI/180),100-l*Math.cos(a*Math.PI/180)];
  const ticks=[...Array(12).keys()].map(i=>{const a=i*30,[x1,y1]=r(a,80),[x2,y2]=r(a,90),[tx,ty]=r(a,68);return `<line class="tick" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/><text x="${tx}" y="${ty+5}" text-anchor="middle">${i||12}</text>`}).join("");
  const [hx,hy]=r(ha,45),[mx,my]=r(ma,70);
  $("#clockbox").innerHTML=`<svg viewBox="0 0 200 200" role="img" aria-label="Clock showing ${h}:${String(m).padStart(2,"0")}"><circle class="cface" cx="100" cy="100" r="95"/>${ticks}<line class="hh" x1="100" y1="100" x2="${hx}" y2="${hy}"/><line class="mh" x1="100" y1="100" x2="${mx}" y2="${my}"/><circle cx="100" cy="100" r="5" fill="currentColor"/></svg>
  <div class="says"><div class="tsel">${T.map((x,i)=>`<button type="button" data-t="${i}" aria-pressed="${i===ti}">${x[0]}:${String(x[1]).padStart(2,"0")}</button>`).join("")}</div>
  <div><span class="en">offiziell (official)</span><br><b>${off}</b></div><div><span class="en">informell (everyday)</span><br><b>${inf}</b></div><p class="en">Blue short hand = hours, red long hand = minutes.</p></div>`;};
 $("#clockbox").addEventListener("click",e=>{const b=e.target.closest("[data-t]");if(!b)return;ti=+b.dataset.t;draw();speak(T[ti][3]);const f=$(`#clockbox [data-t="${ti}"]`);if(f)f.focus({preventScroll:true});});
 draw();
}

/* Tens and ones blocks under the number explorer (11-999) */
function numBlocks(v){ if(v<11||v>999) return "";
 const h=Math.floor(v/100),t=Math.floor(v%100/10),o=v%10;
 const grp=(cls,n,label)=>n?`<div><div class="grp">${Array.from({length:n},()=>`<span class="${cls}"></span>`).join("")}</div><small>${label}</small></div>`:"";
 const ones=o?`<div><div class="o2">${Array.from({length:o},()=>'<span class="o"></span>').join("")}</div><small>${o} Einer (ones): said FIRST</small></div>`:"";
 return `<div class="blocks" aria-hidden="true">${grp("h",h,h+" Hunderter")}${grp("t",t,t+" Zehner (tens)")}${ones}</div>`; }
if($("#explIn")){ const upd=()=>{const v=parseInt($("#explIn").value,10); if(!isNaN(v)&&v>=0&&v<=999) $("#explOut").insertAdjacentHTML("beforeend",numBlocks(v));}; $("#explIn").addEventListener("input",upd); upd(); }

/* Sprechen card simulator */
if($("#sprechSim")){
 const C=[
  [2,"Essen und Trinken","Frühstück","🥐","Was isst du zum Frühstück?","Ich esse Brot und trinke Kaffee."],
  [2,"Essen und Trinken","Lieblingsessen","🍕","Was ist dein Lieblingsessen?","Mein Lieblingsessen ist Pizza."],
  [2,"Essen und Trinken","Restaurant","🍽️","Gehst du oft ins Restaurant?","Nein, nicht oft. Ich koche gern."],
  [2,"Freizeit","Wochenende","🏖️","Was machst du am Wochenende?","Ich fahre Fahrrad."],
  [2,"Freizeit","Sport","⚽","Machst du gern Sport?","Ja, sehr gern."],
  [2,"Einkaufen","Supermarkt","🛒","Wo kaufst du ein?","Im Supermarkt."],
  [2,"Einkaufen","Preis","💶","Wie viel kostet das Brot?","Zwei Euro."],
  [2,"Arbeit","Büro","🏢","Arbeitest du im Büro?","Ja, aber auch im Homeoffice."],
  [2,"Arbeit","Kollegen","👥","Wie sind deine Kollegen?","Sehr nett!"],
  [2,"Arbeit","Arbeitszeit","🕘","Wann arbeitest du?","Von 9 bis 17 Uhr."],
  [3,"","Fenster","🪟","Kannst du bitte das Fenster öffnen?","Ja, gern."],
  [3,"","Kuli","🖊️","Hast du einen Kuli für mich?","Ja, hier bitte."],
  [3,"","Kaffee","☕","Ich möchte bitte einen Kaffee.","Gern. Mit Milch?"],
  [3,"","Wasser","💧","Gib mir bitte das Wasser.","Hier, bitte."],
  [3,"","Handy","📱","Darf ich dein Handy benutzen?","Nein, tut mir leid."]];
 let c=null,shown=false;
 const draw=()=>{ if(!c){$("#sprechSim").innerHTML=`<div class="btns"><button type="button" class="go" data-g="2">Teil 2 · Karte ziehen <span class="en">(draw a card)</span></button><button type="button" class="go" data-g="3">Teil 3 · Bild ziehen <span class="en">(draw a picture)</span></button></div>`;return;}
  $("#sprechSim").innerHTML=`<div class="scard"><div class="top">Sprechen · Teil ${c[0]}</div><div class="thema">${c[1]?"Thema: "+esc(c[1]):"Bitte formulieren"}</div><div class="pic" aria-hidden="true">${c[3]}</div><b>${esc(c[2])}</b></div>
  <p class="en" style="text-align:center">${c[0]===2?"Ask your partner a question with this word. Then answer their question.":"Ask your partner for something with this picture."}</p>
  ${shown?`<div class="sol"><b>${esc(c[4])}</b><br>${esc(c[5])}</div>`:""}
  <div class="btns"><button type="button" class="go" data-act="sol">${shown?"Anhören <span class=\"en\">(listen)</span>":"Beispiel zeigen <span class=\"en\">(show example)</span>"}</button><button type="button" class="go" data-g="${c[0]}">Nächste Karte <span class="en">(next card)</span></button><button type="button" class="go" data-act="back">Zurück <span class="en">(back)</span></button></div>`;};
 $("#sprechSim").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;
  if(b.dataset.g){c=pick(C.filter(x=>x[0]==+b.dataset.g&&x!==c));shown=false;draw();return;}
  if(b.dataset.act==="back"){c=null;draw();return;}
  if(b.dataset.act==="sol"){shown=true;draw();speak(c[4]+" "+c[5]);}});
 draw();
}
