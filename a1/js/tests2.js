/* A1 tests, part 2: listening, vocabulary with articles, calendar, food, family, countries, colours,
   possessives, war/hatte, exam reading and listening. Loaded after tests.js; adds to TESTS and sets GROUPS. */
const artSpan=(a,w)=>`<span class="${a}">${a}</span> ${w}`;
const fmtT=(h,m)=>`${h}:${String(m).padStart(2,"0")}`;
const enArt=(n)=>n.p===""?"":/^[aeiou]/i.test(n.en)?"an ":"a ";
function opts4(right, pool, n=4){ const s=new Set([right]); for(const x of shuffle(pool)){ if(s.size>=n) break; s.add(x); } return shuffle([...s]); }

Object.assign(TESTS,{
 /* ---------- vocabulary with article ---------- */
 wortschatz:{tag:"Wortschatz",title:"Was bedeutet das?",en:"word + article → English, and English → word with the right article",kind:"choice",
  ranges:[["Alle",null],...VTOPICS.map(t=>[t[1],t[0]])],
  gen(r){const pool=r&&r[1]?VOCAB.filter(v=>v.t===r[1]):VOCAB; const n=pick(pool); const m=rnd(0,2);
   const pl=n.p===""?"no plural":n.p===n.w&&n.a==="die"&&n.note?"plural only":`Plural: <span class="plc">die</span> ${n.p}`;
   const ex=`<b>${artSpan(n.a,n.w)}</b> = ${n.en} · ${pl}<br>${vocabNote(n)}`;
   const same=pool.filter(v=>v!==n&&v.en!==n.en);
   if(m===0) return{prompt:`<span class="big">${artSpan(n.a,n.w)}</span><span class="en">Was bedeutet das? <span class="pron">(What does that mean?)</span></span>`,
     options:opts4(n.en,same.map(v=>v.en)),answer:n.en,explain:ex,sayAfter:`${n.a} ${n.w}`};
   if(m===1){const wrongArt=["der","die","das"].filter(a=>a!==n.a).map(a=>`${a} ${n.w}`);const other=pick(same);
     return{prompt:`<span class="big" style="font-size:clamp(24px,6vw,36px)">${enArt(n)}${n.en}</span><span class="en">Which German word, with the right article?</span>`,
     options:shuffle([`${n.a} ${n.w}`,...wrongArt,`${other.a} ${other.w}`]),answer:`${n.a} ${n.w}`,cls:o=>"o-"+o.split(" ")[0],explain:ex,sayAfter:`${n.a} ${n.w}`};}
   return{prompt:`<span class="big">___ ${n.w}</span><span class="en">${n.en} · der, die oder das?</span>`,options:["der","die","das"],cls:o=>"o-"+o,answer:n.a,explain:ex,sayAfter:`${n.a} ${n.w}`}}},

 /* ---------- listening drills (read aloud by the browser) ---------- */
 hoerenZahl:{tag:"🔊 Hören · Zahlen",title:"Zahlen hören",en:"listen to the number and type it in digits",kind:"input",ranges:[["0–20",0,20],["21–99",21,99],["100–999",100,999],["1000–9999",1000,9999]],
  gen(r){const n=rnd(r[1],r[2]);const w=n>999?numBig(n):num(n)[0];
   return{say:w,prompt:`<span class="big">🔊</span><span class="en">Hör zu und schreib die Zahl. <span class="pron">(Listen and write the number.)</span></span>`,answer:String(n),inputmode:"numeric",
    explain:`<b>${n}</b> = ${w}${n<1000?` <span class="pron">(${num(n)[1]})</span>`:""}${n>20&&n%100>20&&n%10?"<br>Remember: ones first, then tens: 47 = sieben-und-vierzig (seven-and-forty).":""}`}}},
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
 hoerenName:{tag:"🔊 Hören · Buchstabieren",title:"Namen hören",en:"listen to the spelled name and write it",kind:"input",
  gen(){const w=pick(SPELL);const letters=[...w.toUpperCase().replace("STRASSE","STRAßE")].map(c=>c==="ẞ"?"ß":c);
   return{say:letters.map(c=>SAY[c]||c).join(", "),prompt:`<span class="big">🔊</span><span class="en">Wie schreibt man das? <span class="pron">(How do you write that?)</span></span>`,answer:w,umlauts:true,
    explain:`<b>${w}</b>: ${letters.map(c=>{const f=ABC.find(x=>x[0]===c);return f?`${c} <span class="pron">(${f[1]})</span>`:c}).join(" · ")}`}}},

 /* ---------- calendar ---------- */
 kalender:{tag:"Kalender",title:"Tage, Monate, Jahreszeiten",en:"days, months, seasons and times of day",kind:"choice",
  gen(){const m=rnd(0,7);
   if(m===0){const d=pick(DAYS);return{prompt:`<span class="big">${d[0]}</span><span class="en">What day is it in English?</span>`,options:opts4(d[2],DAYS.map(x=>x[2])),answer:d[2],explain:`<b>der ${d[0]}</b> <span class="pron">(${d[1]})</span> = ${d[2]} · short: ${d[3]}`,sayAfter:d[0]}}
   if(m===1){const d=pick(DAYS);return{prompt:`<span class="big">${d[2]}</span><span class="en">Which German day?</span>`,options:opts4(d[0],DAYS.map(x=>x[0])),answer:d[0],explain:`${d[2]} = <b>der ${d[0]}</b> <span class="pron">(${d[1]})</span>`,sayAfter:d[0]}}
   if(m===2){const x=pick(MONTHS);return{prompt:`<span class="big">${x[0]}</span><span class="en">Which month is it?</span>`,options:opts4(x[2],MONTHS.map(y=>y[2])),answer:x[2],explain:`<b>der ${x[0]}</b> <span class="pron">(${x[1]})</span> = ${x[2]}`,sayAfter:x[0]}}
   if(m===3){const x=pick(MONTHS);return{prompt:`<span class="big">${x[2]}</span><span class="en">Which German month?</span>`,options:opts4(x[0],MONTHS.map(y=>y[0])),answer:x[0],explain:`${x[2]} = <b>der ${x[0]}</b> <span class="pron">(${x[1]})</span>`,sayAfter:x[0]}}
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
 akkusativ:{tag:"Akkusativ",title:"einen, eine, ein · den, die, das",en:"the object form: Ich nehme einen Kaffee",kind:"choice",
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
 laender:{tag:"Länder · Sprachen",title:"Länder, Sprachen, Leute",en:"countries, languages and nationalities",kind:"choice",
  gen(){const c=pick(COUNTRIES);const m=rnd(0,3);const name=c[0].replace(/^(die|der) /,"");const aus=`aus ${c[1]?c[1]+" ":""}${name}`;
   if(m===0) return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Was spricht man in ${c[1]==="den"?"den USA":c[1]?(c[1]==="der"?"der ":"dem ")+name:name}?</span><span class="en">What language do people speak in ${c[5]}?</span>`,
     options:opts4(c[2],COUNTRIES.map(y=>y[2]).filter(y=>y!==c[2])),answer:c[2],explain:`<b>${c[0]}</b> <span class="pron">(${c[6]})</span> → <b>${c[2]}</b>. Languages often end in <b>-isch</b>.`,sayAfter:`In ${name} spricht man ${c[2]}.`};
   if(m===1){const opts=c[1]?[aus,`aus ${name}`,`aus ${c[0]}`]:[aus,`aus der ${name}`,`aus dem ${name}`];
     return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">Ich komme ___.</span><span class="en">I come from ${c[5]}.</span>`,options:shuffle(opts),answer:aus,
     explain:`<b>Ich komme ${aus}.</b><br>${c[1]?`A few countries have an article: <b>die</b> Schweiz, <b>die</b> Türkei, <b>die</b> Ukraine → aus <b>der</b> …; <b>der</b> Iran → aus <b>dem</b> Iran; <b>die</b> USA → aus <b>den</b> USA.`:"Most countries have no article: aus Spanien, in Spanien."}`,sayAfter:`Ich komme ${aus}.`};}
   if(m===2){const fem=Math.random()<.5;const ans=fem?c[4]:c[3];const o=pick(COUNTRIES.filter(y=>y!==c));
     return{prompt:`<span class="big" style="font-size:clamp(22px,5.5vw,34px)">${fem?"Sie":"Er"} kommt ${aus}. ${fem?"Sie":"Er"} ist ___.</span><span class="en">${fem?"She":"He"} comes from ${c[5]}. ${fem?"She":"He"} is …</span>`,
     options:shuffle([...new Set([ans,fem?c[3]:c[4],fem?o[4]:o[3]])]),answer:ans,explain:`man: <b>${c[3]}</b> · woman: <b>${c[4]}</b>. Women usually add <b>-in</b> (but: Deutsche).`,sayAfter:`${fem?"Sie":"Er"} ist ${ans}.`};}
   return{prompt:`<span class="big">${c[0]}</span><span class="en">Which country is it?</span>`,options:opts4(c[5],COUNTRIES.map(y=>y[5])),answer:c[5],explain:`<b>${c[0]}</b> <span class="pron">(${c[6]})</span> = ${c[5]}`,sayAfter:c[0]}}},
 farben:{tag:"Farben · Adjektive",title:"Farben und Adjektive",en:"colours, opposites and zu + adjective",kind:"choice",
  gen(){const m=rnd(0,3);
   if(m===0){const c=pick(COLORS);return{prompt:`<span class="big">${c[0]}</span><span class="en">Which colour is it?</span>`,options:opts4(c[1],COLORS.map(x=>x[1])),answer:c[1],explain:`<span class="swatch" style="background:${c[2]}"></span><b>${c[0]}</b> = ${c[1]}`,sayAfter:c[0]}}
   if(m===1){const c=pick(COLORS);return{prompt:`<span class="big"><span class="swatch" style="background:${c[2]};width:56px;height:56px;border-radius:12px"></span></span><span class="en">Welche Farbe ist das? <span class="pron">(Which colour is that?)</span></span>`,options:opts4(c[0],COLORS.map(x=>x[0])),answer:c[0],explain:`<b>${c[0]}</b> = ${c[1]}`,sayAfter:`Das ist ${c[0]}.`}}
   if(m===2){const p=pick(ADJ_PAIRS);const flip=Math.random()<.5;const [a,ae,b,be]=flip?[p[2],p[3],p[0],p[1]]:p;
     return{prompt:`<span class="big">${a}</span><span class="en">${ae} · Was ist das Gegenteil? <span class="pron">(What is the opposite?)</span></span>`,options:opts4(b,ADJ_PAIRS.flatMap(x=>[x[0],x[2]]).filter(x=>x!==a)),answer:b,explain:`<b>${a}</b> (${ae}) ↔ <b>${b}</b> (${be})`,sayAfter:`${a}, ${b}`}}
   const x=pick(ZU);return{prompt:`<span class="big" style="font-size:clamp(20px,5vw,30px)">${esc(x[0])}</span><span class="en">${esc(x[1])}</span>`,options:shuffle([x[2],x[3],x[4]]),answer:x[2],explain:`<b>${esc(x[0].replace("___",x[2]))}</b><br>${x[5]}`,sayAfter:x[0].replace("___",x[2])}}},

 /* ---------- possessives, war/hatte ---------- */
 possessiv:{tag:"mein, dein, sein",title:"Possessivartikel",en:"my, your, his, her …: choose the right word",kind:"choice",
  gen(){const p=pick(POSS);const acc=Math.random()<.3;const nn=acc?pick(POSSN.filter(n=>["Schlüssel","Handy","Tasche","Auto","Name","Telefonnummer","Adresse"].includes(n[1]))):pick(POSSN);
   const ans=possForm(p[1],nn[0],nn[3],acc);const b=p[1]==="euer"?"eur":p[1];
   const wrongs=[b+"e",p[1],b+"en",b+"er"].filter(x=>x!==ans);const other=pick(POSS.filter(q=>q[1]!==p[1]));const oth=possForm(other[1],nn[0],nn[3],acc);
   const de=acc?`Ich suche ___ ${nn[1]}.`:`Das ${nn[3]?"sind":"ist"} ___ ${nn[1]}.`;const en=acc?`I'm looking for ${p[2]} ${nn[2]}.`:`That ${nn[3]?"are":"is"} ${p[2]} ${nn[2]}.`;
   return{prompt:`<span class="en">Person: <b>${p[0]}</b> → ${p[2]}</span><span class="big" style="font-size:clamp(22px,5.5vw,34px)">${de}</span><span class="en">${en}</span>`,
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
   explain:`<b>Text:</b> ${esc(x[0])}<br><span class="en">${esc(x[6])}</span>`}}}
});
/* big numbers for listening: 1000–9999 */
function numBig(n){const t=Math.floor(n/1000),r=n%1000;return (t===1?"ein":num(t)[0])+"tausend"+(r?num(r)[0]:"");}

/* test page order */
GROUPS.length=0;
GROUPS.push(
 ["Alles","everything",["mix"]],
 ["Wörter","words: vocabulary, articles, plural",["wortschatz","artikel","ein","plural","wortart","akkusativ","possessiv"],"Wörter","words"],
 ["Sätze","sentences: verbs, word order, questions",["verbform","warHatte","satzbau","ordnen","luecke","wfrage","antworten","kein"],"Sätze","sentences"],
 ["B · Buchstaben und Zahlen","letters and numbers",["hoerBuchstabe","buchstabieren","hoerZahl","zahlWort","telefon","uhrzeit","preis"],"ABC 123","letters, nos."],
 ["B · Kalender","calendar",["kalender","datum","zeitpraep"],"Kalender","calendar"],
 ["Hören","listening (turn the sound on)",["hoerenZahl","hoerenUhr","hoerenPreis","hoerenTelefon","hoerenName","hoerenPruefung"],"Hören","listening"],
 ["C · Themen","topics",["vorstellen","arbeit","aktion","weg","cafe","familie","laender","farben"],"Themen","topics"],
 ["D · Prüfung","exam",["lesenPruefung","formular"],"Prüfung","exam"]
);
