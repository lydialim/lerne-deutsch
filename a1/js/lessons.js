/* A1 lessons: small interactive parts. Each block only runs on the page that has its element. */

/* Lesson 1: example sentence, word by word */
const typeColor={Nomen:"var(--der)",Verb:"var(--die)",Artikel:"var(--das)",Pronomen:"var(--pl)",Adjektiv:"var(--muted)",Adverb:"var(--muted)","Präposition":"var(--muted)",Konjunktion:"var(--muted)"};
if($("#demoSent")) $("#demoSent").innerHTML=SENTS[1].map(([w,t,e])=>`<span class="tok"><b>${w}</b><i>${e}</i><s style="color:${typeColor[t]}">${t}</s></span>`).join("")
;


/* Lesson 9: number grid and number explorer */
if($("#numGrid")){
const gridNums=[...Array(21).keys(),21,22,25,30,40,47,50,60,70,74,80,90,99,100,101,250];
$("#numGrid").innerHTML=gridNums.map(n=>{const [w,p]=num(n);return `<div class="numcell"><span class="d">${n}</span><span class="w">${w}</span><span class="pron">${p}</span></div>`}).join("");
function explore(){ const v=parseInt($("#explIn").value,10); if(isNaN(v)||v<0||v>999){$("#explOut").innerHTML='<span class="en">Enter a number from 0 to 999.</span>';return}
  const [w,p]=num(v); $("#explOut").innerHTML=`<b>${w}</b><br><span class="pron">${p}</span>`; }
$("#explIn").addEventListener("input",explore); explore();
}

/* Lesson 8: alphabet grid */
if($("#abcGrid")) $("#abcGrid").innerHTML=ABC.map(([l,p,t])=>`<div class="abcc${t?' trap':''}"><b>${l}</b><span style="font-weight:600">${SAY[l]}</span><span class="pron">${p}</span></div>`).join("");

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
