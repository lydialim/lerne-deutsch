/* A1 tests. Each key is also the link: tests.html#<key>. GROUPS sets the order on the tests page. */
const TESTS={
 artikel:{tag:"Artikel",title:"der, die oder das?",en:"the: which gender?",kind:"choice",
  gen(){const n=pick(NOUNS);return{prompt:`<span class="big">___ ${n.w}</span><span class="en">${n.en}</span>`,
   options:["der","die","das"],cls:o=>"o-"+o,answer:n.a,explain:`<b><span class="${n.a}">${n.a}</span> ${n.w}</b>, Plural: <span class="plc">die</span> ${n.p}. ${ruleFor(n)}`}}},
 plural:{tag:"Plural",title:"Singular → Plural",en:"choose the plural form",kind:"choice",
  gen(){const n=pick(NOUNS.filter(x=>!["Name","Kaffee","Tee"].includes(x.w)));const s=n.w;
   const cand=new Set([s+"e",s+"en",s+"n",s+"s",s+"er",s,s+"nen"]);
   const um=s.replace(/a(?!.*[aou])|o(?!.*[aou])|u(?!.*[aou])/,m=>({a:"ä",o:"ö",u:"ü"}[m]));
   if(um!==s){cand.add(um+"e");cand.add(um+"er");cand.add(um);}
   cand.delete(n.p); const wrong=shuffle([...cand].filter(c=>!/(ee|nnn|ene$)/.test(c))).slice(0,2);
   return{prompt:`<span class="en">Singular</span><span class="big"><span class="${n.a}">${n.a}</span> ${s}</span><span class="en">${n.en} → Plural: <span class="plc">die</span> ___ ?</span>`,
   options:shuffle([n.p,...wrong]),answer:n.p,explain:`<b><span class="${n.a}">${n.a}</span> ${s} → <span class="plc">die</span> ${n.p}</b>. ${pluralNote(n)}`}}},
 ein:{tag:"ein / eine",title:"ein, eine oder nichts?",en:"a / an, or no article",kind:"choice",
  gen(){const n=pick(NOUNS.filter(x=>x.w!==x.p)); const pl=Math.random()<.25;
   if(pl) return{prompt:`<span class="big">Das sind ___ ${n.p}.</span><span class="en">Those are ___ (plural of “${n.en}”).</span>`,options:["ein","eine","— (nothing)"],answer:"— (nothing)",
     explain:`<b>Das sind ${n.p}.</b> In plural there is no ein/eine. Negative: <i>Das sind keine ${n.p}.</i>`};
   const a=n.a==="die"?"eine":"ein";
   return{prompt:`<span class="big">Das ist ___ ${n.w}.</span><span class="en">That is a ${n.en}.</span>`,options:["ein","eine","— (nothing)"],answer:a,
     explain:`<b><span class="${n.a}">${n.a}</span> ${n.w}</b> → <b>${a} ${n.w}</b>. ${n.a==="die"?"die → eine (feminine adds -e).":"der and das → ein."}`}}},
 hoerZahl:{tag:"Lesen · Zahlen",title:"Wort → Zahl",en:"read the German number and type it in digits",kind:"input",ranges:[["0–20",0,20],["21–99",21,99],["0–100",0,100],["100–999",100,999]],
  gen(r){const n=rnd(r[1],r[2]);const [w,p]=num(n);return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,40px)">${w}</span><span class="en">Type this number in digits.</span>`,answer:String(n),inputmode:"numeric",
   explain:`<b>${w}</b> = <b>${n}</b> <span class="pron">(${p})</span>${n>20&&n<100&&n%10?`<br>Ones first: ${U[n%10][0]}… then …${T[Math.floor(n/10)][0]}.`:""}`}}},
 zahlWort:{tag:"Lesen · Zahlen",title:"Welches Wort passt?",en:"which word matches the number?",kind:"choice",ranges:[["0–20",0,20],["21–99",21,99],["100–999",100,999]],
  gen(r){const n=rnd(r[1],r[2]); const opts=new Set([n]); const o=n%10,t=Math.floor(n/10)%10;
   if(n>20&&o&&t&&o!==t) opts.add(n-o-t*10+o*10+t); // digit swap trap 47↔74
   while(opts.size<4){const d=n+pick([-10,-1,1,10,-2,2,20,-20,100,-100]); if(d>=r[1]&&d<=r[2]) opts.add(d);}
   const list=shuffle([...opts]);
   return{prompt:`<span class="big">${n}</span><span class="en">Choose the German word.</span>`,options:list.map(x=>num(x)[0]),answer:num(n)[0],say:null,
   explain:`<b>${n}</b> = ${num(n)[0]} <span class="pron">(${num(n)[1]})</span>${n>20&&n<100&&o?" · Remember: ones first!":""}`}}},
 hoerBuchstabe:{tag:"Lesen · ABC",title:"Welcher Buchstabe ist das?",en:"which letter has this German name?",kind:"choice",
  gen(){const set=pick(CONFUSE);const l=set[0];const p=ABC.find(x=>x[0]===l)[1];
   return{prompt:`<span class="big">${SAY[l]}</span><span class="en">This is the German name of a letter. Which letter is it?</span>`,options:shuffle(set),answer:l,
   explain:`<b>${SAY[l]}</b> = <b>${l}</b> <span class="pron">(sounds like "${p}")</span>`}}},
 buchstabieren:{tag:"Lesen · Buchstabieren",title:"Name buchstabieren",en:"read the spelled letters and write the word",kind:"input",
  gen(){const w=pick(SPELL);const letters=[...w.toUpperCase().replace("STRASSE","STRAßE")].map(c=>c==="ẞ"?"ß":c);
   return{prompt:`<span class="big" style="font-size:clamp(20px,5vw,30px)">${letters.map(c=>SAY[c]||c).join(" – ")}</span><span class="en">Wie schreibt man das? <span class="pron">(How do you write that?)</span> Type the word.</span>`,answer:w,umlauts:true,
   explain:`<b>${w}</b>: ${letters.map(c=>{const f=ABC.find(x=>x[0]===c);return f?`${c} <span class="pron">(${f[1]})</span>`:c}).join(" · ")}`}}},
 wortart:{tag:"Wortarten",title:"Welche Wortart?",en:"what type of word is it?",kind:"choice",
  gen(){const s=pick(SENTS);const i=rnd(0,s.length-1);const [w,t,e]=s[i];
   const opts=shuffle([t,...shuffle(TYPES.filter(x=>x!==t)).slice(0,3)]);
   return{prompt:`<span class="big" style="font-size:clamp(22px,5vw,32px)">${s.map((x,j)=>j===i?`<span class="hl">${x[0]}</span>`:x[0]).join(" ")}.</span><span class="en">${s.map(x=>x[2]).join(" · ")}</span>`,
   options:opts,label:o=>`${o} <span class="en" style="font-weight:400">(${TEN[o]})</span><br><span class="en" style="font-weight:400;font-size:13px">${TEXPL[o]}</span>`,answer:t,explain:`<b>${w}</b> (${e}) is a <b>${t}</b> (${TEN[t]}) = ${TEXPL[t]}.`}}},
 wfrage:{enReq:true,tag:"W-Fragen",title:"Welches Fragewort?",en:"which question word fits the answer?",kind:"choice",
  gen(){const x=pick(WQ);const opts=shuffle([x[1],...shuffle(WWORDS.filter(w=>w!==x[1])).slice(0,3)]);
   return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">___ ${x[2]}?</span><span class="en">Antwort <span class="pron">(answer)</span>: <b>${x[0]}</b> · ${x[3]}</span>`,options:opts,answer:x[1],
   explain:`<b>${x[1]} ${x[2]}?</b> · ${x[4]}<br>Reminder: W-word 1st, verb 2nd.`}}},
 satzbau:{tag:"Satzbau",title:"Welcher Satz ist richtig?",en:"which sentence has the right word order?",kind:"choice",
  gen(){const x=pick(ORDER);return{prompt:`<span class="en">${x[3]}</span>`,options:shuffle([x[0],x[1],x[2]]),answer:x[0],
   explain:`<b>${x[0]}</b><br>${x[4]}`}}},
 vorstellen:{tag:"Prüfung · Sprechen 1",title:"Sich vorstellen",en:"introduce yourself: keyword, question, answer",kind:"choice",
  gen(){const x=pick(INTRO);const others=shuffle(INTRO.filter(y=>y!==x)).slice(0,3);const mode=rnd(0,1);
   if(mode===0) return{prompt:`<span class="en">Prüfungskarte <span class="pron">(exam card)</span>: which question asks about…</span><span class="big">${x[0]}?</span>`,
     options:shuffle([x[1],...others.map(y=>y[1])]),answer:x[1],say:null,
     explain:`<b>${x[0]}</b> → <b>${x[1]}</b> <span class="en">(${x[3]})</span><br>Answer: <i>${x[2]}</i>`};
   return{prompt:`<span class="en">The examiner asks:</span><span class="big" style="font-size:clamp(24px,6vw,36px)">${x[1]}</span><span class="en">${x[3]} · How do you start your answer?</span>`,
     options:shuffle([x[2],...others.map(y=>y[2])]),answer:x[2],
     explain:`<b>${x[1]}</b> → <b>${x[2]}</b>`}}},
 telefon:{tag:"Lesen · Prüfung",title:"Telefon, PLZ, Hausnummer",en:"read exam-style numbers and type them in digits",kind:"input",
  gen(){const m=rnd(0,2);const zwo=Math.random()<.4;let digits,label,words,ex;
   const dw=d=>d==="2"&&zwo?"zwo":U[+d][0];
   if(m===2){const h=rnd(1,120);digits=String(h);label="Hausnummer (house number)";words=num(h)[0];
     ex=`House numbers are said as one number <span class="pron">(${num(h)[1]})</span>.`;}
   else{digits=m===0?"01"+pick(["5","6","7"])+rnd(0,9)+Array.from({length:7},()=>rnd(0,9)).join(""):"8"+rnd(0,1)+Array.from({length:3},()=>rnd(0,9)).join("");
     label=m===0?"Telefonnummer (phone number)":"Postleitzahl, PLZ (postcode)";words=[...digits].map(dw).join(" · ");
     ex=`${m===0?"Phone numbers":"Postcodes"} are said digit by digit.${zwo&&digits.includes("2")?" <b>zwo</b> = zwei; people say it on the phone so it doesn't sound like drei.":""}`;}
   return{prompt:`<span class="en">${label}</span><span class="big" style="font-size:clamp(20px,5vw,30px)">${words}</span><span class="en">Type it in digits.</span>`,answer:digits,inputmode:"numeric",explain:`<b>${digits}</b><br>${ex}`}}},
 formular:{tag:"Prüfung · Schreiben 1",title:"Formular-Wörter",en:"form vocabulary for the writing test",kind:"choice",
  gen(){const x=pick(FORM);const others=shuffle(FORM.filter(y=>y!==x)).slice(0,3);
   if(Math.random()<.5) return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${x[0]}</span><span class="en">What does this form field mean?</span>`,
     options:shuffle([x[1],...others.map(y=>y[1])]),answer:x[1],explain:`<b>${x[0]}</b> = ${x[1]}`};
   return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${x[1]}</span><span class="en">Which German form field is this?</span>`,
     options:shuffle([x[0],...others.map(y=>y[0])]),answer:x[0],explain:`${x[1]} = <b>${x[0]}</b>`}}},
 arbeit:{tag:"Arbeit",title:"Über die Arbeit sprechen",en:"talking about work: fill the gap",kind:"choice",
  gen(){const x=pick(WORK);return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${x[0]}</span><span class="en">${x[1]}</span>`,
   options:shuffle(x[2]),answer:x[3],explain:`<b>${x[0].replace("___ Freitag","Freitag").replace("___",x[3]).replace("von … bis Montag","von Montag bis").replace(/von … bis/,"von")}</b><br>${x[4]}`}}},
 verbform:{enReq:true,tag:"Verben",title:"Verb-Endungen",en:"choose the right verb form",kind:"choice",
  gen(){const all=[...VREG.map(x=>x[0]),...Object.keys(VIRR)];const v=pick(all);const f=forms(v);const i=rnd(0,5);const ans=f[i];
   const others=[...new Set(f.filter(x=>x!==ans))];const opts=shuffle([ans,...shuffle(others).slice(0,2)]);
   const per=i===2?pick(["er","sie","es"]):i===5?pick(["sie","Sie"]):["ich","du","","wir","ihr"][i];
   const en=VIRR[v]?VIRR[v][6]:VREG.find(x=>x[0]===v)[2];
   const note=VIRR[v]?`<b>${v}</b> is irregular: ${f.join(", ")}.`:`${["ich → -e","du → -st","er/sie/es → -t","wir → -en","ihr → -t","sie/Sie → -en"][i]}: ${v.replace(/en$/,"")}-${["e","st","t","en","t","en"][i]}.`;
   return{prompt:`<span class="big">${per} ___</span><span class="en">${v} (${en})</span>`,options:opts,answer:ans,explain:`<b>${per} ${ans}</b><br>${note}`}}},
 kein:{enReq:true,tag:"Fragen & Antworten",title:"nicht oder kein?",en:"say no the right way",kind:"choice",
  gen(){const x=pick(KEIN);return{prompt:`<span class="en">${x[0]}</span><span class="big" style="font-size:clamp(22px,5.5vw,34px)">${x[1]}</span><span class="en">${x[2]}</span>`,
   options:shuffle(x[3]),answer:x[4],explain:`<b>${x[1].replace("___",x[4])}</b><br>${x[5]}`}}},
 antworten:{tag:"Fragen & Antworten",title:"Die richtige Antwort",en:"choose the correct answer to the question",kind:"choice",
  gen(){const x=pick(ANSW);return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${x[0]}</span><span class="en">${x[1]}</span>`,
   options:shuffle([x[2],x[3],x[4]]),answer:x[2],explain:`<b>${x[0]} → ${x[2]}</b><br>${x[5]}`}}},
 uhrzeit:{tag:"Zahlen · Uhrzeit",title:"Wie spät ist es?",en:"what time is it? choose the words",kind:"choice",
  gen(){const h=rnd(1,23),m=pick([0,5,10,15,20,30,40,45,50]);const inf=Math.random()<.6;const f=inf?timeInf:timeOff;const ans=f(h,m);const opts=new Set([ans]);
   const tries=inf?[[h-1,m],[h+1,m],[h,m===30?0:30],[h,m===15?45:m===45?15:15],[h,60-m===60?0:60-m]]:[[h,m===55?50:m+5],[h+1,m],[h-1,m],[h,m===30?13:30]];
   for(const [a,b] of shuffle(tries)){ if(opts.size>=4) break; const hh=((a%24)+24)%24||12; if(b<0||b>59) continue; opts.add(f(hh,b)); }
   let guard=0; while(opts.size<4&&guard++<20) opts.add(f(rnd(1,23),pick([0,15,30,45])));
   const hs=String(h).padStart(2,"0"),ms=String(m).padStart(2,"0");
   return{prompt:`<span class="big">${hs}:${ms}</span><span class="en">${inf?"Informell (everyday)":"Offiziell (official)"}: wie sagt man das? <span class="pron">(how do you say it?)</span></span>`,
   options:shuffle([...opts]),answer:ans,explain:`<b>${hs}:${ms}</b> = offiziell <b>${timeOff(h,m)}</b> · informell <b>${timeInf(h,m)}</b>${m===30?"<br>Reminder: halb looks forward to the next hour.":""}`}}},
 preis:{tag:"Zahlen · Preise",title:"Was kostet das?",en:"match the price and the words",kind:"choice",
  gen(){const e=rnd(1,30),c=pick([0,10,20,25,40,49,50,60,75,80,90,95,99]);const set=new Map([[priceFmt(e,c),[e,c]]]);
   for(const [a,b] of shuffle([[e,teenSwap(c)],[teenSwap(e),c],[e+1,c],[e,(c+10)%100],[e>1?e-1:e+2,c]])){ if(set.size>=4) break; if(a>=1&&a<=99&&b>=0&&b<=99) set.set(priceFmt(a,b),[a,b]); }
   const items=[...set.values()];const mode=Math.random()<.5;
   if(mode) return{prompt:`<span class="big">${priceFmt(e,c)}</span><span class="en">How do you say this price?</span>`,options:shuffle(items.map(([a,b])=>priceSay(a,b))),answer:priceSay(e,c),
     explain:`<b>${priceFmt(e,c)}</b> = ${priceSay(e,c)} <span class="pron">(${pricePron(e,c)})</span>`};
   return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${priceSay(e,c)}</span><span class="en">Which price is it?</span>`,options:shuffle(items.map(([a,b])=>priceFmt(a,b))),answer:priceFmt(e,c),
     explain:`<b>${priceSay(e,c)}</b> = ${priceFmt(e,c)} <span class="pron">(${pricePron(e,c)})</span>`}}},
 weg:{tag:"Wegbeschreibung",title:"Wie komme ich …?",en:"directions: words, zum / zur, sentences",kind:"choice",
  gen(){const m=rnd(0,2);
   if(m===0){const pl=pick(PLACES);const a=pl[0]==="die"?"zur":"zum";return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">Wie komme ich ___ ${pl[1]}?</span><span class="en">How do I get to the ${pl[2]}?</span>`,options:["zum","zur","zu"],answer:a,
     explain:`<b><span class="${pl[0]}">${pl[0]}</span> ${pl[1]}</b> → <b>${a} ${pl[1]}</b>. der/das → zum, die → zur.`};}
   if(m===1){const x=pick(ARROWS);return{prompt:`<span class="big" style="color:var(--die)">${x[0]}</span><span class="en">Which direction is this?</span>`,options:shuffle(ARROWS.map(y=>y[1])),answer:x[1],explain:`${x[0]} = <b>${x[1]}</b> (${x[2]})`};}
   const x=pick(DIR);const others=shuffle(DIR.filter(y=>y!==x)).slice(0,3);
   return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,32px)">${x[0]}</span><span class="en">What does it mean?</span>`,options:shuffle([x[1],...others.map(y=>y[1])]),answer:x[1],explain:`<b>${x[0]}</b> = ${x[1]}`}}},
 aktion:{tag:"Aktivitäten",title:"Was machst du gern?",en:"action verbs and gern",kind:"choice",
  gen(){const m=rnd(0,2);
   if(m<2){const x=pick(ACT);const o=shuffle(ACT.filter(y=>y!==x)).slice(0,3);const f=forms(x[0]);
     const ex=`<b>${x[0]}</b> = ${x[1]} · ich ${f[0]}, du ${f[1]}, er ${f[2]}`;
     if(m===0) return{prompt:`<span class="big">${x[0]}</span><span class="en">What does this verb mean?</span>`,options:shuffle([x[1],...o.map(y=>y[1])]),answer:x[1],explain:ex};
     return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${x[1]}</span><span class="en">Which German verb is it?</span>`,options:shuffle([x[0],...o.map(y=>y[0])]),answer:x[0],explain:ex};}
   const x=pick(GERN);return{prompt:`<span class="en">${x[3]}</span><span class="en">Welcher Satz ist richtig? (Which sentence is correct?)</span>`,options:shuffle([x[0],x[1],x[2]]),answer:x[0],
     explain:`<b>${x[0]}</b><br>gern comes right after the verb (and the person). Check the verb form too.`};}},
 ordnen:{tag:"Satzbau · Ordnen",title:"Sätze ordnen",en:"put the words in the right order",kind:"order",
  gen(){const x=pick(ARRANGE);const idx=x.toks.map((_,i)=>i);let sh=shuffle(idx),g=0;while(sh.every((v,i)=>x.toks[v]===x.toks[i])&&g++<20) sh=shuffle(idx);
   const answer=x.toks.join(" ")+x.p;
   return{prompt:`<span class="en">Bring die Wörter in die richtige Reihenfolge. <span class="pron">(Bring the words into the right order.)</span></span><span class="big" style="font-size:clamp(20px,5vw,28px)">${esc(x.en)}</span>`,
    tokens:sh.map(i=>x.toks[i]),answerTokens:x.toks,end:x.p,answer,
    explain:`${trainOf(x)}<span>${esc(x.en)}</span><br>${x.r}`}}},
 luecke:{enReq:true,tag:"Satzbau · Ergänzen",title:"Sätze ergänzen",en:"complete the sentence: brackets, connectors, word order",kind:"choice",
  gen(){const x=pick(GAPS);const typed=x[5]&&Math.random()<.4;
   const head=`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${esc(x[0])}</span><span class="en">${esc(x[1])}</span>`;
   const ex=`<b>${esc(x[0].replace("___",x[3][0]))}</b><br><span class="en">Wort für Wort (word by word): ${esc(x[2])}</span><br>${x[4]}`;
   if(typed) return{kind:"input",prompt:head+`<span class="en">Schreib das fehlende Wort. <span class="pron">(Write the missing word.)</span></span>`,answer:x[3][0],umlauts:true,explain:ex};
   return{prompt:head,options:shuffle([...x[3]]),answer:x[3][0],explain:ex}}},
 mix:{tag:"Alle Teile",title:"Gemischter Test",en:"20 random questions from all parts",kind:"mixed",
  gen(){const keys=Object.keys(TESTS).filter(k=>k!=="mix");const k=pick(keys);const t=TESTS[k];const r=t.ranges?pick(t.ranges):null;const q=t.gen(r);q.kind=q.kind||t.kind;q.enReq=t.enReq;q.from=t.tag;q.fromKey=k;return q;}}
};

const GROUPS=[
 ["Alles","everything",["mix"]],
 ["Wörter","words: articles, plural",["artikel","ein","plural","wortart"],"Wörter","words"],
 ["Sätze","sentences: verbs, word order, questions",["verbform","satzbau","ordnen","luecke","wfrage","antworten","kein"],"Sätze","sentences"],
 ["B · Buchstaben und Zahlen","letters and numbers",["hoerBuchstabe","buchstabieren","hoerZahl","zahlWort","telefon","uhrzeit","preis"],"ABC 123","letters, nos."],
 ["C · Themen","topics",["vorstellen","arbeit","aktion","weg"],"Themen","topics"],
 ["D · Prüfung","exam",["formular"],"Prüfung","exam"]
];

/* Rule of the day on the tests page: [German title, English, example, English word by word, test key] */
const RULES=[
 ["Verb an Position 2","verb in position 2","Heute <b>lerne</b> ich Deutsch.","Today learn I German. In a statement the verb is always the 2nd element.","satzbau"],
 ["-ung, -heit, -keit, -ion → die","these endings are always die","<span class=\"die\">die</span> Zeitung, <span class=\"die\">die</span> Information","the newspaper, the information","artikel"],
 ["-chen, -lein → das","these endings are always das","<span class=\"das\">das</span> Mädchen","the girl. Even a girl is das, because of -chen.","artikel"],
 ["Plural → immer die","plural → always die","<span class=\"plc\">die</span> Bücher, <span class=\"plc\">die</span> Tische","the books, the tables. In the plural der, die and das all become die.","plural"],
 ["Beruf ohne Artikel","job without an article","Ich bin Lehrerin.","I am teacher. No ein/eine before a job.","arbeit"],
 ["kein = not a","kein replaces ein","Das ist <b>kein</b> Tisch.","That is no table. ein → kein, eine → keine.","kein"],
 ["Zahlen: Einer zuerst","numbers: ones first","24 = vier·und·zwanzig <span class=\"pron\">(FEER-oont-TSVAN-tsikh)</span>","four-and-twenty. German says the ones before the tens.","zahlWort"],
 ["W-Frage: Verb an Position 2","W-question: verb in position 2","Wo <b>wohnst</b> du?","Where live you? Question word first, then the verb.","wfrage"],
 ["du-Form endet auf -st","du-form ends in -st","du wohn<b>st</b>, du lern<b>st</b>","you live, you learn","verbform"]
];
