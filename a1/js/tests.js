/* A1 tests. Each key is also the link: tests.html#<key>.
   TESTS: every test (the shapes are documented at the top of assets/js/quiz.js). GROUPS: the tabs and order on the tests page.
   RULES: the rule of the day. The word lists the tests draw from are in data.js. */
const artSpan=(a,w)=>`<span class="${a}">${a}</span> ${w}`;
const fmtT=(h,m)=>`${h}:${String(m).padStart(2,"0")}`;
/* ONE explanation layout for every noun test (artikel, plural, wortschatz, bildwoerter, mix):
   1) article + word = English   2) plural, with the rule   3) WHY this article (rule or colour tip)   4) extra note / example (optional) */
function nounInfo({a,w,p,en,note,ex}){
  const plural=p===""?"No plural.":(p===w&&a==="die"&&note)?"Plural only.":`Plural: <span class="plc">die</span> ${p} <span class="en">· ${pluralNote({w,p})}</span>`;
  return `<b>${artSpan(a,w)}</b>${en?` = ${en}`:""}<br>${plural}<br>${ruleOrCompound({a,w})}${note&&!(p===w&&a==="die")?`<br>${note}`:""}${ex?`<br>${ex}`:""}`;
}
const enArt=(n)=>n.p===""?"":/^[aeiou]/i.test(n.en)?"an ":"a ";
function opts4(right, pool, n=4){ const s=new Set([right]); for(const x of shuffle(pool)){ if(s.size>=n) break; s.add(x); } return shuffle([...s]); }

const TESTS={
 artikel:{tag:"Artikel",title:"der, die oder das?",en:"the: which gender?",kind:"choice",
  gen(){const n=pick(NOUNS);return{prompt:`<span class="big">___ ${n.w}</span><span class="en">${n.en}</span>`,
   options:["der","die","das"],cls:o=>"o-"+o,answer:n.a,explain:nounInfo(n)}}},
 plural:{tag:"Plural",title:"Singular → Plural",en:"choose the plural form",kind:"choice",
  gen(){const n=pick(NOUNS.filter(x=>!["Name","Kaffee","Tee"].includes(x.w)));const s=n.w;
   const cand=new Set([s+"e",s+"en",s+"n",s+"s",s+"er",s,s+"nen"]);
   const um=s.replace(/a(?!.*[aou])|o(?!.*[aou])|u(?!.*[aou])/,m=>({a:"ä",o:"ö",u:"ü"}[m]));
   if(um!==s){cand.add(um+"e");cand.add(um+"er");cand.add(um);}
   cand.delete(n.p); const wrong=shuffle([...cand].filter(c=>!/(ee|nnn|ene$)/.test(c))).slice(0,2);
   return{prompt:`<span class="dq">Singular <span class="en">(one)</span></span><span class="big"><span class="${n.a}">${n.a}</span> ${s}</span><span class="dq">Plural: <span class="plc">die</span> ___ ? <span class="en">(${n.en}, many)</span></span>`,
   options:shuffle([n.p,...wrong]),answer:n.p,explain:nounInfo(n)}}},
 ein:{tag:"ein / eine",title:"ein, eine oder nichts?",en:"a / an, or no article",kind:"choice",
  gen(){const n=pick(NOUNS.filter(x=>x.w!==x.p)); const pl=Math.random()<.25;
   if(pl) return{prompt:`<span class="big">Das sind ___ ${n.p}.</span><span class="en">Those are ___ (plural of “${n.en}”).</span>`,options:["ein","eine","— (nothing)"],answer:"— (nothing)",
     explain:`<b>Das sind ${n.p}.</b> In plural there is no ein/eine. Negative: <i>Das sind keine ${n.p}.</i>`};
   const a=n.a==="die"?"eine":"ein";
   return{prompt:`<span class="big">Das ist ___ ${n.w}.</span><span class="en">That is a ${n.en}.</span>`,options:["ein","eine","— (nothing)"],answer:a,
     explain:`<b><span class="${n.a}">${n.a}</span> ${n.w}</b> → <b>${a} ${n.w}</b>. ${n.a==="die"?"die → eine (feminine adds -e).":"der and das → ein."}`}}},
 hoerZahl:{tag:"Lesen · Zahlen",title:"Wort → Zahl",en:"read the German number and type it in digits",kind:"input",ranges:[["0–20",0,20],["21–99",21,99],["0–100",0,100],["100–999",100,999],["1000–9999",1000,9999],["10.000–999.999",10000,999999],["Millionen",0,0,"mio"],["Jahre (years)",1900,2030,1]],
  gen(r){const yr=r[3]===1,mio=r[3]==="mio",n=mio?rnd(1,9)*1e6+rnd(0,9)*1e5:r[1]>=10000?rndBig(r[1],r[2]):rnd(r[1],r[2]);const [w,p]=yr?yearSay(n):num(n);
   return{prompt:`<span class="big" style="font-size:clamp(20px,5vw,34px);overflow-wrap:anywhere">${w}</span><span class="en">${yr?"Type this year in digits.":mio?"Type this number in digits. (Dots are fine: 2.500.000)":"Type this number in digits."}</span>`,answer:String(n),inputmode:"numeric",
   explain:`<b>${w}</b> = <b>${yr?n:dots(n)}</b> <span class="pron">(${p})</span>${mio?`<br>Short form: ${(n/1e6).toString().replace(".",",")} Millionen.`:""}${bigNote(n,yr)}`}}},
 zahlWort:{tag:"Lesen · Zahlen",title:"Welches Wort passt?",en:"which word matches the number?",kind:"choice",ranges:[["0–20",0,20],["21–99",21,99],["100–999",100,999],["1000–9999",1000,9999],["10.000–999.999",10000,999999],["Millionen (2,5 Mio.)",0,0,"mio"],["Jahre (years)",1900,2030,1]],
  gen(r){const yr=r[3]===1,mio=r[3]==="mio";
   if(mio){const m=rnd(2,9),d=rnd(1,9);const right=millionDec(m,d)[0];const s=new Set([right]);
    for(const [a,b] of shuffle([[d,m],[m,d*10<100?d*10:d],[m+1,d],[m,d===9?1:d+1],[m===2?3:m-1,d]])){ if(s.size>=4) break; if(a>=2&&a<=9&&b>=1&&b<=90&&!(a===m&&b===d)) s.add(`${num(a)[0]} Komma ${num(b)[0]} Millionen`); }
    let g=0; while(s.size<4&&g++<30) s.add(millionDec(rnd(2,9),rnd(1,9))[0]);
    return{prompt:`<span class="big">${m},${d} Millionen</span><span class="en">Choose the German words. (a comma is said “Komma”)</span>`,options:shuffle([...s]),answer:right,say:null,
     explain:`<b>${m},${d} Millionen</b> = ${right} <span class="pron">(${millionDec(m,d)[1]})</span><br>= ${dots(m*1e6+d*1e5)}. Also possible: <i>${m} Millionen ${num(d*100000)[0]}</i>.`}}
   const f=yr?yearSay:num,n=r[1]>=10000?rndBig(r[1],r[2]):rnd(r[1],r[2]); const opts=new Set([n]); const o=n%10,t=Math.floor(n/10)%10;
   if(n>20&&o&&t&&o!==t){const sw=n-o-t*10+o*10+t; if(sw>=r[1]&&sw<=r[2]) opts.add(sw);} // digit swap trap 47↔74
   if(n>=10000&&n%1000===0){ if(n*10<=r[2]) opts.add(n*10); if(n/10>=r[1]) opts.add(n/10); }
   const steps=r[1]>=10000?[-10000,10000,-1000,1000,-100,100,-300,300]:r[1]>=1000&&!yr?[-1000,1000,-100,100,-10,10,-1,1]:yr?[-10,10,-1,1,-100,100,-9,9]:[-10,-1,1,10,-2,2,20,-20,100,-100];
   let g=0; while(opts.size<4&&g++<60){const d=n+pick(steps); if(d>=r[1]&&d<=r[2]) opts.add(d);}
   const list=shuffle([...opts]);
   return{prompt:`<span class="big">${yr?n:dots(n)}</span><span class="en">${yr?"Choose the German word for this year.":"Choose the German word."}</span>`,options:list.map(x=>f(x)[0]),answer:f(n)[0],say:null,
   explain:`<b>${yr?n:dots(n)}</b> = ${f(n)[0]} <span class="pron">(${f(n)[1]})</span>${bigNote(n,yr)}`}}},
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
     options:shuffle([x[0],...others.map(y=>y[0])]),answer:x[0],explain:`<b>${x[0]}</b> = ${x[1]}`}}},
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
     const ex=`<b>${x[0]}</b> = ${x[1]}<br>ich ${f[0]}, du ${f[1]}, er ${f[2]}`;
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
 /* ---------- vocabulary with article ---------- */
 wortschatz:{tag:"Wortschatz",title:"Was bedeutet das?",en:"word + article → English, and English → word with the right article",kind:"choice",
  ranges:[["Alle",null],...VTOPICS.map(t=>[t[1],t[0]])],
  gen(r){const pool=r&&r[1]?VOCAB.filter(v=>v.t===r[1]):VOCAB; const n=pick(pool); const m=rnd(0,2);
   const ex=nounInfo({a:n.a,w:n.w,p:n.p,en:n.en,note:n.note});
   const same=pool.filter(v=>v!==n&&v.en!==n.en);
   if(m===0) return{prompt:`<span class="big">${artSpan(n.a,n.w)}</span><span class="en">Was bedeutet das? <span class="pron">(What does that mean?)</span></span>`,
     options:opts4(n.en,same.map(v=>v.en)),answer:n.en,explain:ex,sayAfter:`${n.a} ${n.w}`};
   if(m===1){const wrongArt=["der","die","das"].filter(a=>a!==n.a).map(a=>`${a} ${n.w}`);const other=pick(same);
     return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${enArt(n)}${n.en}</span><span class="dq">Welches deutsche Wort, mit Artikel? <span class="en">(Which German word, with the right article?)</span></span>`,
     options:shuffle([`${n.a} ${n.w}`,...wrongArt,`${other.a} ${other.w}`]),answer:`${n.a} ${n.w}`,cls:o=>"o-"+o.split(" ")[0],explain:ex,sayAfter:`${n.a} ${n.w}`};}
   return{prompt:`<span class="big">___ ${n.w}</span><span class="dq">der, die oder das? <span class="en">(${n.en})</span></span>`,options:["der","die","das"],cls:o=>"o-"+o,answer:n.a,explain:ex,sayAfter:`${n.a} ${n.w}`}}},

 wortliste:{enReq:false,tag:"Wortliste",title:"Verben und Wörter",en:"verbs, adjectives and little words from the official A1 word list",kind:"choice",
  ranges:[["Alle",null],["Trennbare Verben",'vs'],["Verben",'v'],["Adjektive & Co.",'a']],
  gen(r){const pool=r&&r[1]?WLISTE.filter(x=>x[2]===r[1]):WLISTE; const x=pick(pool);
   const same=pool.filter(y=>y!==x&&y[1]!==x[1]).concat(pool.length<8?WLISTE.filter(y=>y[2]===x[2]&&y!==x&&y[1]!==x[1]):[]);
   const sep=x[2]==="vs"?`<br>Separable verb: the prefix goes to the <b>end</b> of a main clause.`:"";
   const ex=`<b>${esc(x[0])}</b> = ${esc(x[1])}<br>${esc(x[3])} <span class="en">(${esc(x[4])})</span>${sep}`;
   if(Math.random()<.5) return{prompt:`<span class="big">${esc(x[0])}</span><span class="dq">Was bedeutet das? <span class="en">(What does that mean?)</span></span>`,options:opts4(x[1],same.map(y=>y[1])),answer:x[1],explain:ex,sayAfter:x[3]};
   return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${esc(x[1])}</span><span class="dq">Welches deutsche Wort ist das? <span class="en">(Which German word is it?)</span></span>`,options:opts4(x[0],same.map(y=>y[0])),answer:x[0],explain:ex,sayAfter:x[3]}}},

 /* ---------- listening drills (read aloud by the browser) ---------- */
 hoerenZahl:{tag:"🔊 Hören · Zahlen",title:"Zahlen hören",en:"listen to the number or year and type it in digits",kind:"input",ranges:[["0–20",0,20],["21–99",21,99],["100–999",100,999],["1000–9999",1000,9999],["10.000–999.999",10000,999999],["Millionen (2,5)",0,0,"mio"],["Jahre (years)",1900,2030,1]],
  gen(r){const yr=r[3]===1,mio=r[3]==="mio";
   if(mio){const m=rnd(2,9),d=rnd(1,9),[w,p]=millionDec(m,d);
    return{say:w,prompt:`<span class="big">🔊</span><span class="en">Hör zu: wie viele Millionen? Schreib zum Beispiel 2,5. <span class="pron">(Listen: how many millions? Write e.g. 2,5.)</span></span>`,answer:`${m},${d}`,inputmode:"decimal",
     explain:`<b>${m},${d} Millionen</b> = ${w} <span class="pron">(${p})</span><br>Komma = decimal comma. ${m},${d} Millionen = ${dots(m*1e6+d*1e5)}.`}}
   const n=r[1]>=10000?rndBig(r[1],r[2]):rnd(r[1],r[2]);const [w,p]=yr?yearSay(n):num(n);
   return{say:w,prompt:`<span class="big">🔊</span><span class="en">${yr?"Hör zu und schreib das Jahr. <span class=\"pron\">(Listen and write the year.)</span>":"Hör zu und schreib die Zahl. <span class=\"pron\">(Listen and write the number.)</span>"}</span>`,answer:String(n),inputmode:"numeric",
    explain:`<b>${yr?n:dots(n)}</b> = ${w} <span class="pron">(${p})</span>${bigNote(n,yr)}`}}},
 hoerenUhr:{tag:"🔊 Hören · Uhrzeit",title:"Uhrzeit hören",en:"listen to the time and choose it",kind:"choice",
  gen(){const h=rnd(1,23),m=pick([0,5,10,15,20,25,30,35,40,45,50,55]);const inf=Math.random()<.6;
   const show=(a,b)=>inf?fmtT(a%12||12,b):fmtT(a,b); const ans=show(h,m); const s=new Set([ans]);
   const cand=[[h+1,m],[h-1,m],[h,(m+30)%60],[h,60-m===60?0:60-m],[h+12,m],[h,m===15?45:15],[h,m===30?0:30]];
   if(inf&&m===30) s.add(fmtT((h%12||12),30)), s.add(fmtT(((h+1)%12||12),30));
   for(const [a,b] of shuffle(cand)){ if(s.size>=4) break; const aa=((a%24)+24)%24||12; s.add(show(aa,b)); }
   const said=inf?timeInf(h,m):timeOff(h,m);
   return{say:"Es ist "+said+".",prompt:`<span class="big">🔊</span><span class="en">Wie spät ist es? <span class="pron">(What time is it?)</span> ${inf?"Everyday way of saying it.":"Official way (radio, station)."}</span>`,
    options:shuffle([...s]),answer:ans,explain:`<b>Es ist ${said}.</b> = ${ans}${inf&&m===30?"<br>Reminder: <b>halb</b> looks forward: halb acht = 7:30 (half way to eight).":""}${inf&&(m===25||m===35)?"<br>fünf vor / nach halb = 5 min before / after the half hour.":""}`}}},
 hoerenPreis:{tag:"🔊 Hören · Preise",title:"Preise hören",en:"listen to the price and choose it",kind:"choice",
  gen(){const e=rnd(1,99),c=pick([0,10,20,25,40,49,50,60,75,80,90,95,99]);const s=new Map([[priceFmt(e,c),1]]);
   for(const [a,b] of shuffle([[e,teenSwap(c)],[teenSwap(e),c],[e+1,c],[e,(c+10)%100],[e>1?e-1:e+2,c],[e%10*10+Math.floor(e/10),c]])){ if(s.size>=4) break; if(a>=1&&a<=99&&b>=0&&b<=99) s.set(priceFmt(a,b),1); }
   return{say:priceSay(e,c),prompt:`<span class="big">🔊</span><span class="en">Was kostet das? <span class="pron">(How much is it?)</span></span>`,options:shuffle([...s.keys()]),answer:priceFmt(e,c),
    explain:`<b>${priceSay(e,c)}</b> = ${priceFmt(e,c)} <span class="pron">(${pricePron(e,c)})</span>`}}},
 hoerenTelefon:{tag:"🔊 Hören · Prüfung",title:"Telefonnummer hören",en:"listen to the phone number or postcode and type it",kind:"input",
  gen(){const tel=Math.random()<.6;const digits=tel?"01"+pick(["5","6","7"])+rnd(0,9)+Array.from({length:7},()=>rnd(0,9)).join(""):"8"+rnd(0,1)+Array.from({length:3},()=>rnd(0,9)).join("");
   const zwo=Math.random()<.4; const words=[...digits].map(d=>d==="2"&&zwo?"zwo":U[+d][0]);
   return{say:words.join(", "),prompt:`<span class="big">🔊</span><span class="en">${tel?"Telefonnummer (phone number)":"Postleitzahl (postcode)"}: type the digits.</span>`,answer:digits,inputmode:"numeric",
    explain:`<b>${digits}</b> = ${words.join(" · ")}${zwo&&digits.includes("2")?"<br><b>zwo</b> = zwei, said on the phone so it doesn't sound like drei.":""}`}}},
 hoerenMail:{tag:"🔊 Hören · E-Mail",title:"E-Mail-Adresse hören",en:"listen and choose the right e-mail address (@ . - _)",kind:"choice",
  gen(){const N=["maria","tom","anna","lukas","sara","jonas","lena","ben"],S=["schmidt","weber","fischer","meyer","wagner","koch","becker","wolf"],D=["web.de","gmx.de","gmail.com","mail.de"];
   const W={".":"Punkt","_":"Unterstrich","-":Math.random()<.5?"Strich":"Bindestrich"},spoken=d=>d.replace(".", " Punkt ");
   const n=pick(N),s=pick(S),d=pick(D),sep=pick([".","_","-"]);
   const mk=(a,b,c,e)=>`${a}${e}${b}@${c}`, right=mk(n,s,d,sep);
   const opts=new Set([right]); [".","_","-"].filter(x=>x!==sep).forEach(x=>opts.add(mk(n,s,d,x)));
   opts.add(mk(n,s,pick(D.filter(x=>x!==d)),sep)); let g=0; while(opts.size<4&&g++<20) opts.add(mk(pick(N),s,d,sep));
   const say=`${n} ${W[sep]} ${s} ät ${spoken(d)}`;
   return{say,prompt:`<span class="big">🔊</span><span class="en">Welche E-Mail-Adresse hörst du? <span class="pron">(Which e-mail address do you hear?)</span></span>`,options:shuffle([...opts].slice(0,4).includes(right)?[...opts].slice(0,4):[right,...[...opts].slice(1,4)]),answer:right,
    explain:`<b>${right}</b> = ${say}<br>@ = ät · . = Punkt · - = Bindestrich (auch: Strich) · _ = Unterstrich`}}},
 hoerenName:{tag:"🔊 Hören · Buchstabieren",title:"Namen hören",en:"listen to the spelled name and write it",kind:"input",
  gen(){const w=pick(SPELL);const letters=[...w.toUpperCase().replace("STRASSE","STRAßE")].map(c=>c==="ẞ"?"ß":c);
   return{say:letters.map(c=>SAY[c]||c).join(", "),prompt:`<span class="big">🔊</span><span class="en">Wie schreibt man das? <span class="pron">(How do you write that?)</span></span>`,answer:w,umlauts:true,
    explain:`<b>${w}</b>: ${letters.map(c=>{const f=ABC.find(x=>x[0]===c);return f?`${c} <span class="pron">(${f[1]})</span>`:c}).join(" · ")}`}}},

 /* ---------- calendar ---------- */
 kalender:{tag:"Kalender",title:"Tage, Monate, Jahreszeiten",en:"days, months, seasons and times of day",kind:"choice",
  gen(){const m=rnd(0,7);
   if(m===0){const d=pick(DAYS);return{prompt:`<span class="big">${d[0]}</span><span class="en">What day is it in English?</span>`,options:opts4(d[2],DAYS.map(x=>x[2])),answer:d[2],explain:`<b>der ${d[0]}</b> <span class="pron">(${d[1]})</span> = ${d[2]} · short: ${d[3]}`,sayAfter:d[0]}}
   if(m===1){const d=pick(DAYS);return{prompt:`<span class="big">${d[2]}</span><span class="en">Which German day?</span>`,options:opts4(d[0],DAYS.map(x=>x[0])),answer:d[0],explain:`<b>der ${d[0]}</b> <span class="pron">(${d[1]})</span> = ${d[2]} · short: ${d[3]}`,sayAfter:d[0]}}
   if(m===2){const x=pick(MONTHS);return{prompt:`<span class="big">${x[0]}</span><span class="en">Which month is it?</span>`,options:opts4(x[2],MONTHS.map(y=>y[2])),answer:x[2],explain:`<b>der ${x[0]}</b> <span class="pron">(${x[1]})</span> = ${x[2]}`,sayAfter:x[0]}}
   if(m===3){const x=pick(MONTHS);return{prompt:`<span class="big">${x[2]}</span><span class="en">Which German month?</span>`,options:opts4(x[0],MONTHS.map(y=>y[0])),answer:x[0],explain:`<b>der ${x[0]}</b> <span class="pron">(${x[1]})</span> = ${x[2]}`,sayAfter:x[0]}}
   if(m===4){const i=rnd(0,6),next=Math.random()<.5;const a=DAYS[(i+(next?1:6))%7];
     return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Welcher Tag kommt ${next?"nach":"vor"} ${DAYS[i][0]}?</span><span class="en">Which day comes ${next?"after":"before"} ${DAYS[i][2]}?</span>`,options:opts4(a[0],DAYS.map(x=>x[0]).filter(x=>x!==DAYS[i][0])),answer:a[0],
     explain:`${DAYS.map(x=>x[0]===a[0]?`<b>${x[0]}</b>`:x[0]).join(" → ")}<br><b>nach</b> = after, <b>vor</b> = before.`,sayAfter:a[0]}}
   if(m===5){const d=pick(DAYS);return{prompt:`<span class="big">${d[3]}</span><span class="en">This short form is on calendars and opening hours. Which day?</span>`,options:opts4(d[0],DAYS.map(x=>x[0])),answer:d[0],explain:`<b>${d[3]}</b> = ${d[0]} (${d[2]})`}}
   if(m===6){const mi=rnd(0,11);const s=SEASONS[mi===11||mi<2?3:mi<5?0:mi<8?1:2];
     return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Im ${MONTHS[mi][0]} ist ___.</span><span class="en">In ${MONTHS[mi][2]} it is … (in Germany)</span>`,options:shuffle(SEASONS.map(x=>x[0])),answer:s[0],
     explain:`<b>der ${s[0]}</b> <span class="pron">(${s[1]})</span> = ${s[2]}: ${s[3]}.`,sayAfter:`Im ${MONTHS[mi][0]} ist ${s[0]}.`}}
   const t=pick(DAYTIMES);const hr=t[4].split("–").map(Number);const h=t[0]==="Nacht"?pick([23,1,3]):rnd(hr[0],hr[1]-1);
   return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Es ist ${h} Uhr. Es ist ___.</span><span class="en">It is ${h} o'clock (${num(h)[0]}, ${num(h)[1]}). Which time of day?</span>`,
    options:opts4(t[0]==="Nacht"?"Nacht":t[0],DAYTIMES.map(x=>x[0])),answer:t[0],explain:`<b>${t[0]==="Nacht"?"die":"der"} ${t[0]}</b> = ${t[2]} (${t[4]} Uhr) · am ${t[0]} / ${t[3]} = in the ${t[2]}${t[0]==="Nacht"?"<br>Exception: <b>in der Nacht</b>, not am.":""}`,sayAfter:`Es ist ${h} Uhr.`}}},
 datum:{tag:"Kalender · Datum",title:"Das Datum",en:"dates: der dritte Mai, am dritten Mai",kind:"choice",
  gen(){const d=rnd(1,31),mi=rnd(0,11),M=MONTHS[mi];const m=rnd(0,3);const dig=`${d}.${mi+1}.`;
   const pr=`<span class="pron">(${ordPron(d)}-uh / ${ordPron(d)}-en)</span>`;
   const why=`${d<20?"1–19: number + <b>-t-</b>":"20 and up: number + <b>-st-</b>"}${ORD_IRR[d]?` · <b>${ordBase(d)}e</b> is irregular, learn it by heart`:""}.<br><b>der</b> …<b>e</b> after "Heute ist" · <b>am</b> …<b>en</b> after "am".`;
   if(m===0){const ans=`der ${ordNom(d)} ${M[0]}`;const wr=ordWrong(d).map(w=>`der ${w}e ${M[0]}`).concat([`der ${ordDat(d)} ${M[0]}`]);
     return{prompt:`<span class="big">Heute ist der ${d}. ${mi+1}.</span><span class="en">Today is the ${d}/${mi+1} (day/month). How do you say it?</span>`,options:opts4(ans,wr),answer:ans,explain:`<b>Heute ist ${ans}.</b> ${pr}<br>${why}`,sayAfter:`Heute ist ${ans}.`}}
   if(m===1){const ans=`Am ${ordDat(d)} ${M[0]}.`;const wr=[`Am ${ordNom(d)} ${M[0]}.`,`Im ${ordDat(d)} ${M[0]}.`,...ordWrong(d).map(w=>`Am ${w}en ${M[0]}.`)];
     return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Wann hast du Geburtstag? – ${dig}</span><span class="en">When is your birthday? – On the ${d}/${mi+1}.</span>`,options:opts4(ans,wr),answer:ans,explain:`<b>${ans}</b> ${pr}<br>${why}`,sayAfter:ans}}
   const ans=dig;const wr=[`${d}.${(mi+1)%12+1}.`,`${d===31?30:d+1}.${mi+1}.`,`${d>1?d-1:2}.${mi+1}.`,d<10?`${d+10}.${mi+1}.`:`${d%10||1}.${mi+1}.`];
   if(m===2) return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,32px)">am ${ordDat(d)} ${M[0]}</span><span class="en">Which date is it? (day.month.)</span>`,options:opts4(ans,wr),answer:ans,explain:`<b>am ${ordDat(d)} ${M[0]}</b> = ${dig} ${pr}<br>${why}`,sayAfter:`am ${ordDat(d)} ${M[0]}`};
   return{say:`am ${ordDat(d)} ${M[0]}`,prompt:`<span class="big">🔊</span><span class="en">Listen. Which date is it? (day.month.)</span>`,options:opts4(ans,wr),answer:ans,explain:`<b>am ${ordDat(d)} ${M[0]}</b> = ${dig} ${pr}<br>${why}`}}},
 zeitpraep:{tag:"Kalender · am, um, im",title:"am, um, im, von … bis",en:"time words: when, from when, how long",kind:"choice",
  gen(){const x=pick(ZEITPRAEP);const parts=x[2][0].split(" … ");let i=0;const full=x[0].replace(/___/g,()=>parts[i++]||parts[0]);
   return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${esc(x[0])}</span><span class="en">${esc(x[1])}</span>`,options:shuffle([...x[2]]),answer:x[2][0],explain:`<b>${esc(full)}</b><br>${x[3]}<br><span class="en">Trick: <b>am</b> Tag (day) · <b>um</b> Uhr (clock) · <b>im</b> Monat, Jahreszeit (month, season).</span>`,sayAfter:full}}},

 /* ---------- food and shopping ---------- */
 akkusativ:{enReq:true,tag:"Akkusativ",title:"einen, eine, ein · den, die, das",en:"the object form: Ich nehme einen Kaffee",kind:"choice",
  gen(){const m=rnd(0,3);const pool=VOCAB.filter(v=>v.p!==""&&!v.note&&["essen","alltag","wohnung"].includes(v.t));const n=pick(pool);const v=pick(SHOPVERBS);
   const tab=`<br><span class="en">Akkusativ: der → <b>den / einen / keinen</b> · die, das, plural stay the same.</span>`;
   if(m===0){const a=n.a==="der"?"einen":n.a==="die"?"eine":"ein";return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Ich ${v[0]} ___ ${n.w}.</span><span class="en">I ${v[1]} a ${n.en}.</span>`,options:["einen","eine","ein"],answer:a,
     explain:`<b>${artSpan(n.a,n.w)}</b> → Ich ${v[0]} <b>${a} ${n.w}</b>.${tab}`,sayAfter:`Ich ${v[0]} ${a} ${n.w}.`}}
   if(m===1){const a=n.a==="der"?"den":n.a;return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Ich ${v[0]} ___ ${n.w}.</span><span class="en">I ${v[1]} the ${n.en}.</span>`,options:["den","die","das","der"],answer:a,
     explain:`<b>${artSpan(n.a,n.w)}</b> → Ich ${v[0]} <b>${a} ${n.w}</b>.${tab}`,sayAfter:`Ich ${v[0]} ${a} ${n.w}.`}}
   if(m===2){const a=n.a==="der"?"keinen":n.a==="die"?"keine":"kein";return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Ich habe ___ ${n.w}.</span><span class="en">I have no ${n.en}.</span>`,options:["keinen","keine","kein"],answer:a,
     explain:`<b>${artSpan(n.a,n.w)}</b> → Ich habe <b>${a} ${n.w}</b>.${tab}`,sayAfter:`Ich habe ${a} ${n.w}.`}}
   const d=VOCAB.filter(x=>x.a==="der"&&x.p!==""&&!x.note&&["essen","wohnung","alltag"].includes(x.t));const k=pick(d);const subj=Math.random()<.5;
   const ans=subj?"der":"den";return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${subj?`___ ${k.w} ist neu.`:`Ich kaufe ___ ${k.w}.`}</span><span class="en">${subj?`The ${k.en} is new.`:`I buy the ${k.en}.`}</span>`,options:["der","den"],answer:ans,
     explain:subj?`The ${k.en} is the <b>subject</b> (who/what is new?) → Nominativ: <b>der</b> ${k.w}. Only the object changes.`:`The ${k.en} is the <b>object</b> (what do I buy?) → Akkusativ: <b>den</b> ${k.w}.`,sayAfter:subj?`Der ${k.w} ist neu.`:`Ich kaufe den ${k.w}.`}}},
 cafe:{tag:"Essen · Einkaufen",title:"Im Café und im Geschäft",en:"ordering, paying and shopping: choose the right reply",kind:"choice",
  gen(){const x=pick(CAFE);return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${esc(x[0])}</span><span class="en">${esc(x[1])}</span>`,options:shuffle([x[2],x[3],x[4]]),answer:x[2],
   explain:`<b>${esc(x[0])}</b> → <b>${esc(x[2])}</b><br>${x[5]}`,sayAfter:`${x[0]} ${x[2].startsWith("(")?"":x[2]}`}}},

 /* ---------- family, countries, colours ---------- */
 familie:{tag:"Familie",title:"Wer ist das?",en:"family words: who is who?",kind:"choice",
  gen(){const x=pick(FAMQ);const full=x[0].replace("___",x[2]);const v=VOCAB.find(y=>y.w===x[2]);
   const ex2={Großeltern:"grandparents",Einzelkind:"only child",ledig:"single (not married)",geschieden:"divorced",verheiratet:"married",Nichte:"niece",Neffe:"nephew"}[x[2]];
   return{prompt:`<span class="big" style="font-size:clamp(20px,5vw,30px)">${esc(x[0])}</span><span class="en">${esc(x[1])}</span>`,options:shuffle([x[2],x[3],x[4]]),answer:x[2],
   explain:`<b>${esc(full)}</b><br>${x[2]} = ${v?`${artSpan(v.a,v.w)} = ${v.en}`:ex2||""}`,sayAfter:full}}},
 laender:{enReq:true,tag:"Länder · Sprachen",title:"Länder, Sprachen, Leute",en:"countries, languages and nationalities",kind:"choice",
  gen(){const c=pick(COUNTRIES);const m=rnd(0,3);const name=c[0].replace(/^(die|der) /,"");const aus=`aus ${c[1]?c[1]+" ":""}${name}`;
   if(m===0) return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Was spricht man in ${c[1]==="den"?"den USA":c[1]==="der"?"der "+name:c[1]?"im "+name:name}?</span><span class="en">What language do people speak in ${c[5]}?</span>`,
     options:opts4(c[2],COUNTRIES.map(y=>y[2]).filter(y=>y!==c[2])),answer:c[2],explain:`<b>${c[0]}</b> <span class="pron">(${c[6]})</span> → <b>${c[2]}</b>. Languages often end in <b>-isch</b>.`,sayAfter:`In ${name} spricht man ${c[2]}.`};
   if(m===1){const opts=c[1]?[aus,`aus ${name}`,`aus ${c[0]}`]:[aus,`aus der ${name}`,`aus dem ${name}`];
     return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Ich komme ___.</span><span class="en">I come from ${c[5]}.</span>`,options:shuffle(opts),answer:aus,
     explain:`<b>Ich komme ${aus}.</b><br>${c[1]?`A few countries have an article: <b>die</b> Schweiz, <b>die</b> Türkei, <b>die</b> Ukraine → aus <b>der</b> …; <b>der</b> Iran → aus <b>dem</b> Iran; <b>die</b> USA → aus <b>den</b> USA.`:"Most countries have no article: aus Spanien, in Spanien."}`,sayAfter:`Ich komme ${aus}.`};}
   if(m===2){const fem=Math.random()<.5;const ans=fem?c[4]:c[3];const o=pick(COUNTRIES.filter(y=>y!==c));
     return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${fem?"Sie":"Er"} kommt ${aus}. ${fem?"Sie":"Er"} ist ___.</span><span class="en">${fem?"She":"He"} comes from ${c[5]}. ${fem?"She":"He"} is …</span>`,
     options:shuffle([...new Set([ans,fem?c[3]:c[4],fem?o[4]:o[3]])]),answer:ans,explain:`masculine: <b>${c[3]}</b> · feminine: <b>${c[4]}</b>. The feminine form usually adds <b>-in</b> (but: Deutsche).`,sayAfter:`${fem?"Sie":"Er"} ist ${ans}.`};}
   return{prompt:`<span class="big">${c[0]}</span><span class="en">Which country is it?</span>`,options:opts4(c[5],COUNTRIES.map(y=>y[5])),answer:c[5],explain:`<b>${c[0]}</b> <span class="pron">(${c[6]})</span> = ${c[5]}`,sayAfter:c[0]}}},
 farben:{tag:"Farben · Adjektive",title:"Farben und Adjektive",en:"colours, opposites and zu + adjective",kind:"choice",
  gen(){const m=rnd(0,3);
   if(m===0){const c=pick(COLORS);return{prompt:`<span class="big">${c[0]}</span><span class="en">Which colour is it?</span>`,options:opts4(c[1],COLORS.map(x=>x[1])),answer:c[1],explain:`<span class="swatch" style="background:${c[2]}"></span><b>${c[0]}</b> = ${c[1]}`,sayAfter:c[0]}}
   if(m===1){const c=pick(COLORS);return{prompt:`<span class="big"><span class="swatch" style="background:${c[2]};width:56px;height:56px;border-radius:12px"></span></span><span class="en">Welche Farbe ist das? <span class="pron">(Which colour is that?)</span></span>`,options:opts4(c[0],COLORS.map(x=>x[0])),answer:c[0],explain:`<b>${c[0]}</b> = ${c[1]}`,sayAfter:`Das ist ${c[0]}.`}}
   if(m===2){const p=pick(ADJ_PAIRS);const flip=Math.random()<.5;const [a,ae,b,be]=flip?[p[2],p[3],p[0],p[1]]:p;
     return{prompt:`<span class="big">${a}</span><span class="en">${ae} · Was ist das Gegenteil? <span class="pron">(What is the opposite?)</span></span>`,options:opts4(b,ADJ_PAIRS.flatMap(x=>[x[0],x[2]]).filter(x=>x!==a)),answer:b,explain:`<b>${a}</b> (${ae}) ↔ <b>${b}</b> (${be})`,sayAfter:`${a}, ${b}`}}
   const x=pick(ZU);return{prompt:`<span class="big" style="font-size:clamp(20px,5vw,30px)">${esc(x[0])}</span><span class="en">${esc(x[1])}</span>`,options:shuffle([x[2],x[3],x[4]]),answer:x[2],explain:`<b>${esc(x[0].replace("___",x[2]))}</b><br>${x[5]}`,sayAfter:x[0].replace("___",x[2])}}},

 /* ---------- possessives, war/hatte ---------- */
 possessiv:{enReq:true,tag:"mein, dein, sein",title:"Possessivartikel",en:"my, your, his, her …: choose the right word",kind:"choice",
  gen(){const p=pick(POSS);const acc=Math.random()<.3;const nn=acc?pick(POSSN.filter(n=>["Schlüssel","Handy","Tasche","Auto","Name","Telefonnummer","Adresse"].includes(n[1]))):pick(POSSN);
   const ans=possForm(p[1],nn[0],nn[3],acc);const b=p[1]==="euer"?"eur":p[1];
   const wrongs=[b+"e",p[1],b+"en",b+"er"].filter(x=>x!==ans);const other=pick(POSS.filter(q=>q[1]!==p[1]));const oth=possForm(other[1],nn[0],nn[3],acc);
   const de=acc?`Ich suche ___ ${nn[1]}.`:`Das ${nn[3]?"sind":"ist"} ___ ${nn[1]}.`;const en=acc?`I'm looking for ${p[2]} ${nn[2]}.`:`That ${nn[3]?"are":"is"} ${p[2]} ${nn[2]}.`;
   return{prompt:`<span class="dq">Person: <b>${p[0]}</b> <span class="en">→ ${p[2]}</span></span><span class="big" style="font-size:clamp(22px,5.5vw,34px)">${de}</span><span class="en">${en}</span>`,
    options:shuffle([ans,...[...new Set([...shuffle(wrongs).slice(0,2),oth])].filter(x=>x!==ans)].slice(0,4)),answer:ans,
    explain:`${p[0]} → <b>${p[1]}</b> (${p[2]}) · ${artSpan(nn[0],nn[1])}${nn[3]?" (plural)":""} → <b>${ans} ${nn[1]}</b><br>Endings like ein: der / das → ${p[1]}, die / plural → ${b}e${acc&&nn[0]==="der"?`, der in Akkusativ → <b>${b}en</b>`:""}.`,sayAfter:de.replace("___",ans)}}},
 warHatte:{tag:"war / hatte",title:"war oder hatte?",en:"the past of sein (was) and haben (had)",kind:"choice",
  gen(){if(Math.random()<.6){const x=pick(WARHATTE);return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${esc(x[0])}</span><span class="en">${esc(x[1])}</span>`,options:shuffle([x[2],x[3],x[4]]),answer:x[2],explain:`<b>${esc(x[0].replace("___",x[2]))}</b><br>${x[5]}`,sayAfter:x[0].replace("___",x[2])}}
   const v=pick(["sein","haben"]);const i=rnd(0,5);const f=PRAET[v];const ans=f[i];
   return{prompt:`<span class="big">${PERS6[i][0]} ___</span><span class="en">${PERS6[i][1]} ${v==="sein"?"was / were":"had"} (${v} → past)</span>`,options:shuffle([ans,...shuffle([...new Set(f.filter(x=>x!==ans))]).slice(0,2)]),answer:ans,
    explain:`${v}: ${f.map((x,j)=>`${PERS6[j][0]} <b>${x}</b>`).join(", ")}<br>Trick: ich and er/sie/es are the same (war, hatte), like modal verbs.`}}},

 /* ---------- exam: reading and listening ---------- */
 lesenPruefung:{tag:"Prüfung · Lesen",title:"Lesen: richtig oder falsch?",en:"read short notes, signs and ads: true or false?",kind:"choice",
  gen(){const t=pick(LESEN);const s=pick(t.qs);const ans=s[2]?"richtig (true)":"falsch (false)";
   return{prompt:`<div class="readtext">${esc(t.t)}</div><span class="big" style="font-size:clamp(20px,5vw,28px)">${esc(s[0])}</span><span class="en">${esc(s[1])}</span>`,options:["richtig (true)","falsch (false)"],answer:ans,
   explain:`${s[3]}<br><span class="en">Text in English: ${esc(t.en)}</span>`}}},
 hoerenPruefung:{tag:"🔊 Prüfung · Hören",title:"Hören: kurze Texte",en:"listen to announcements, messages and short talks",kind:"choice",
  gen(){const x=pick(HOEREN);return{say:x[0],prompt:`<span class="big">🔊</span><span class="big" style="font-size:clamp(20px,5vw,28px)">${esc(x[1])}</span><span class="en">${esc(x[2])}</span>`,options:shuffle([x[3],x[4],x[5]]),answer:x[3],
   explain:`<b>Text:</b> ${esc(x[0])}<br><span class="en">${esc(x[6])}</span>`}}},

 /* ---------- modal verbs ---------- */
 modal:{enReq:true,tag:"Modalverben",title:"Modalverben",en:"können, müssen, wollen, dürfen, möchten: forms, meaning, word order",kind:"choice",
  gen(){const m=Math.random();
   if(m<.35){const v=pick(MODKEYS);const i=rnd(0,5);const f=MOD[v].slice(0,6);const ans=f[i];
    return{prompt:`<span class="big">${PERS6[i][0]} ___</span><span class="en">${v} (${MOD[v][6]}) · ${PERS6[i][1]}</span>`,
     options:shuffle([ans,...shuffle([...new Set(f.filter(x=>x!==ans))]).slice(0,2)]),answer:ans,
     explain:`${v}: ${f.map((x,j)=>`${PERS6[j][0]} <b>${x}</b>`).join(", ")}<br>Trick: ich and er/sie/es are twins, with no ending.`}}
   if(m<.7){const x=pick(MODGAP);const ans=MOD[x[3]][x[0]];
    const opts=shuffle([ans,...shuffle(MODKEYS.filter(k=>k!==x[3])).map(k=>MOD[k][x[0]]).filter((f,j,a)=>f!==ans&&a.indexOf(f)===j).slice(0,2)]);
    return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${x[1]}</span><span class="en">${x[2]}</span>`,options:opts,answer:ans,
     explain:`<b>${x[1].replace("___",ans)}</b><br>${x[3]} = ${MOD[x[3]][6]}.${x[4]?" "+x[4]:""}`,sayAfter:x[1].replace("___",ans)}}
   const x=pick(MODORD);
   return{prompt:`<span class="en">${x[3]}</span>`,options:shuffle([x[0],x[1],x[2]]),answer:x[0],
    explain:`<b>${x[0]}</b><br>${x[4]}`,sayAfter:x[0]}}},

 /* ---------- du or Sie ---------- */
 dusie:{tag:"du oder Sie",title:"du oder Sie?",en:"informal or formal you: choose the word or the verb form",kind:"choice",
  gen(){if(Math.random()<.45){const x=pick(DUSIE_SIT);
    return{prompt:`<span class="en">Which word do you use for you?</span><span class="big" style="font-size:clamp(22px,5.5vw,34px)">${x[0]}</span>`,options:["du","Sie"],answer:x[1],
     explain:`<b>${x[1]}</b>: ${x[1]==="du"?"you know the person well, or it is a friend, family or child. Verb ending -st.":"formal: strangers, officials, doctors, bosses and letters to companies. Verb ending -en, like wir."}`}}
   const x=pick(DUSIE_GAP);
   return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${x[0]}</span><span class="en">${x[3]}</span>`,options:shuffle([x[1],...x[2]]),answer:x[1],
    explain:`<b>${x[0].replace("___",x[1])}</b><br>${x[4]}`,sayAfter:x[0].replace("___",x[1])}}},

 /* ---------- new topics: weather, body, clothes, transport, hotel and post ---------- */
 themen2:{tag:"Neue Themen",title:"Neue Themen: Wörter",en:"weather, body, clothes, transport, hotel and post: words and phrases",kind:"choice",
  gen(){const x=pick(THEMEN2),others=shuffle(THEMEN2.filter(y=>y!==x)).slice(0,3);
   if(Math.random()<.5) return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${x[0]}</span><span class="en">What does this mean?</span>`,options:shuffle([x[1],...others.map(y=>y[1])]),answer:x[1],explain:`<b>${x[0]}</b> = ${x[1]}`,sayAfter:x[0]};
   return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${x[1]}</span><span class="en">Which German word is this?</span>`,options:shuffle([x[0],...others.map(y=>y[0])]),answer:x[0],explain:`<b>${x[0]}</b> = ${x[1]}`,sayAfter:x[0]}}},

 /* ---------- picture-card words: word + article (+ plural). Data comes from the Bildkarten (js/karten.js) ---------- */
 bildwoerter:{tag:"Bildkarten",title:"Bildwörter: Wort + Artikel",en:"picture-card words: which word, which article, which plural?",kind:"choice",
  ranges:[["Alle",null],...KARTEN.map((c,i)=>[c.de,i])],
  gen(r){
   const cats=r&&r[1]!=null?[KARTEN[r[1]]]:KARTEN;
   const pool=cats.flatMap(c=>c.items.map(it=>Object.assign({cat:c.de},it)));
   const n=pick(pool), mine=KARTEN.find(c=>c.de===n.cat).items;
   const pic=n.pic.startsWith("#")?`<span class="swatch" style="background:${n.pic};width:72px;height:72px;border-radius:50%;border:2px solid var(--line);display:inline-block"></span>`:`<span class="big" style="font-size:72px;line-height:1.1">${picGlyph(n.pic)}</span>`;
   const pl=cardPlural(n), say=(n.art?n.art+" ":"")+n.word;
   const info=n.art?nounInfo({a:n.art,w:n.word,p:pl||"",en:esc(n.eng),ex:n.ex?esc(n.ex):""}):`<b>${n.word}</b> = ${esc(n.eng)}${n.ex?`<br>${esc(n.ex)}`:""}`;
   if(!n.art){ /* verbs, adjectives, colours: no article */
    const words=[...new Set(mine.filter(v=>v.word!==n.word).map(v=>v.word))];
    const opts=shuffle([n.word,...shuffle(words).slice(0,3)]);
    if(Math.random()<.5) return{prompt:`${pic}<span class="dq">Welches Wort ist das? <span class="en">(Which word is this?)</span></span>`,options:opts,answer:n.word,explain:info,sayAfter:say};
    return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${esc(n.eng)}</span><span class="dq">Welches deutsche Wort ist das? <span class="en">(Which German word is this?)</span></span>`,options:opts,answer:n.word,explain:info,sayAfter:say};
   }
   const m=rnd(0,pl?3:2);
   const nouns=mine.filter(v=>v.art&&v.word!==n.word), others=nouns.length>=2?nouns:KARTEN.flatMap(c=>c.items).filter(v=>v.art&&v.word!==n.word);
   const right=`${n.art} ${n.word}`;
   const full=()=>{const wrongArt=["der","die","das"].filter(a=>a!==n.art).map(a=>`${a} ${n.word}`);const o=pick(others);
     return shuffle([...new Set([right,...wrongArt,`${o.art} ${o.word}`])]);};
   if(m===0) return{prompt:`${pic}<span class="dq">Welches Wort ist das, mit Artikel? <span class="en">(Which word is this, with its article?)</span></span>`,options:full(),answer:right,cls:o=>"o-"+o.split(" ")[0],explain:info,sayAfter:say};
   if(m===1) return{prompt:`<span class="big">___ ${n.word}</span><span class="dq">der, die oder das? <span class="en">(${esc(n.eng)})</span></span>`,options:["der","die","das"],cls:o=>"o-"+o,answer:n.art,explain:info,sayAfter:say};
   if(m===2) return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${esc(n.eng)}</span><span class="dq">Welches deutsche Wort, mit Artikel? <span class="en">(Which German word, with the right article?)</span></span>`,options:full(),answer:right,cls:o=>"o-"+o.split(" ")[0],explain:info,sayAfter:say};
   const s=n.word, cand=new Set([s+"e",s+"en",s+"n",s+"s",s+"er",s,s+"nen"]);
   const um=s.replace(/a(?!.*[aou])|o(?!.*[aou])|u(?!.*[aou])/,x=>({a:"ä",o:"ö",u:"ü"}[x]));
   if(um!==s){cand.add(um+"e");cand.add(um+"er");cand.add(um);}
   cand.delete(pl); const wrong=shuffle([...cand].filter(c=>!/(ee|nnn|ene$)/.test(c))).slice(0,2);
   if(wrong.length<2) return{prompt:`<span class="big">___ ${n.word}</span><span class="dq">der, die oder das? <span class="en">(${esc(n.eng)})</span></span>`,options:["der","die","das"],cls:o=>"o-"+o,answer:n.art,explain:info,sayAfter:say};
   return{prompt:`<span class="dq">Singular <span class="en">(one)</span></span><span class="big">${artSpan(n.art,s)}</span><span class="dq">Plural: <span class="plc">die</span> ___ ? <span class="en">(${esc(n.eng)}, many)</span></span>`,options:shuffle([pl,...wrong]),answer:pl,explain:info,sayAfter:say};
  }},
 mix:{tag:"Alle Teile",title:"Gemischter Test",en:"20 random questions from all parts",kind:"mixed",
  gen(){const keys=Object.keys(TESTS).filter(k=>k!=="mix");const k=pick(keys);const t=TESTS[k];const r=t.ranges?pick(t.ranges):null;const q=t.gen(r);q.kind=q.kind||t.kind;q.enReq=t.enReq;q.from=t.tag;q.fromKey=k;return q;}}
};

/* tests page: [title, English, [test keys], tab label, tab English]. A test that is not listed here does not show up. */
const GROUPS=[
 ["Alles","everything",["mix"]],
 ["Wörter","words: vocabulary, articles, plural",["wortschatz","wortliste","bildwoerter","artikel","ein","plural","wortart","akkusativ","possessiv"],"Wörter","words"],
 ["Sätze","sentences: verbs, word order, questions",["verbform","dusie","warHatte","modal","satzbau","ordnen","luecke","wfrage","antworten","kein"],"Sätze","sentences"],
 ["Buchstaben und Zahlen","letters and numbers",["hoerBuchstabe","buchstabieren","hoerZahl","zahlWort","telefon","uhrzeit","preis"],"ABC 123","letters, nos."],
 ["Kalender","calendar",["kalender","datum","zeitpraep"],"Kalender","calendar"],
 ["Hören","listening (turn the sound on)",["hoerenZahl","hoerenUhr","hoerenPreis","hoerenTelefon","hoerenName","hoerenMail","hoerenPruefung"],"Hören","listening"],
 ["Themen","topics",["vorstellen","arbeit","aktion","weg","cafe","familie","laender","farben","themen2"],"Themen","topics"],
 ["Prüfung","exam",["lesenPruefung","formular"],"Prüfung","exam"]
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
