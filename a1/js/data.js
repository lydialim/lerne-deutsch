/* A1 word lists, sentences and language helpers used by the lessons, the picture cards and the tests.
   Lists that the tests draw from are plain arrays; tests.js says how each one is used. */
const NOUNS = [
 ["der","Tisch","Tische","table"],["der","Stuhl","Stühle","chair"],["die","Lampe","Lampen","lamp"],["das","Buch","Bücher","book"],
 ["der","Kuli","Kulis","pen"],["das","Heft","Hefte","notebook"],["die","Tasche","Taschen","bag"],["die","Brille","Brillen","glasses"],
 ["die","Uhr","Uhren","clock / watch"],["der","Computer","Computer","computer"],["die","Zeitung","Zeitungen","newspaper"],["das","Wörterbuch","Wörterbücher","dictionary"],
 ["das","Handy","Handys","mobile phone"],["das","Telefon","Telefone","telephone"],["die","Familie","Familien","family"],["die","Mutter","Mütter","mother"],
 ["der","Vater","Väter","father"],["das","Kind","Kinder","child"],["der","Bruder","Brüder","brother"],["die","Schwester","Schwestern","sister"],
 ["der","Freund","Freunde","friend (m)"],["die","Freundin","Freundinnen","friend (f)"],["die","Wohnung","Wohnungen","flat / apartment"],["das","Zimmer","Zimmer","room"],
 ["die","Küche","Küchen","kitchen"],["das","Bett","Betten","bed"],["der","Kaffee","Kaffees","coffee"],["der","Tee","Tees","tea"],
 ["das","Brot","Brote","bread"],["der","Apfel","Äpfel","apple"],["die","Banane","Bananen","banana"],["das","Auto","Autos","car"],
 ["das","Fahrrad","Fahrräder","bicycle"],["die","Straße","Straßen","street"],["die","Stadt","Städte","city"],["das","Land","Länder","country"],
 ["der","Name","Namen","name"],["der","Kurs","Kurse","course"],["die","Sprache","Sprachen","language"],["der","Beruf","Berufe","job"],
 ["das","Mädchen","Mädchen","girl"],["die","Frau","Frauen","woman"],["der","Mann","Männer","man"],["das","Haus","Häuser","house"],
 ["die","Information","Informationen","information"],["der","Lehrer","Lehrer","teacher (m)"],["die","Lehrerin","Lehrerinnen","teacher (f)"],["das","Foto","Fotos","photo"],
 ["die","Firma","Firmen","company"],["das","Büro","Büros","office"],["der","Kollege","Kollegen","colleague (m)"],["die","Kollegin","Kolleginnen","colleague (f)"],
 ["der","Chef","Chefs","boss (m)"],["die","Besprechung","Besprechungen","meeting"],["der","Termin","Termine","appointment"],["das","Projekt","Projekte","project"],
 ["der","Schrank","Schränke","wardrobe"],["das","Sofa","Sofas","sofa"],["die","Tür","Türen","door"],["das","Fenster","Fenster","window"],
 ["der","Bahnhof","Bahnhöfe","train station"],["die","Haltestelle","Haltestellen","bus / tram stop"],["die","Apotheke","Apotheken","pharmacy"],["das","Hotel","Hotels","hotel"],
 ["das","Museum","Museen","museum"],["die","Bank","Banken","bank"],["der","Supermarkt","Supermärkte","supermarket"],["das","Krankenhaus","Krankenhäuser","hospital"],
 ["die","Ampel","Ampeln","traffic light"],["die","Kreuzung","Kreuzungen","crossroads"],["der","Platz","Plätze","square"],["der","Bus","Busse","bus"],
 ["der","Tag","Tage","day"],["die","Woche","Wochen","week"],["der","Monat","Monate","month"],["das","Jahr","Jahre","year"],
 ["die","Stunde","Stunden","hour"],["die","Minute","Minuten","minute"],["der","Saft","Säfte","juice"],["das","Ei","Eier","egg"],
 ["die","Kartoffel","Kartoffeln","potato"],["die","Tomate","Tomaten","tomato"],["das","Glas","Gläser","glass"],["die","Flasche","Flaschen","bottle"],
 ["der","Schlüssel","Schlüssel","key"],["der","Sohn","Söhne","son"],["die","Tochter","Töchter","daughter"],["der","Hund","Hunde","dog"],
 ["die","Katze","Katzen","cat"],["das","Kino","Kinos","cinema"],["das","Restaurant","Restaurants","restaurant"],["der","Garten","Gärten","garden"],
 ["das","Bad","Bäder","bathroom"],["der","Fernseher","Fernseher","TV"],["die","Wurst","Würste","sausage"],["der","Stift","Stifte","pen / pencil"]
].map(([a,w,p,en])=>({a,w,p,en}));

function ruleFor(n){
  const w=n.w;
  if(w==="Kuchen") return "Exception: Kuchen ends in -chen but is der. It is not a diminutive (the -chen words that mean “little …” are das).";
  if(/chen$|lein$/.test(w)) return "Nouns ending -chen/-lein are always das.";
  if(/um$/.test(w)&&n.a==="das") return "Nouns ending -um are das.";
  if(/(ung|heit|keit|ion)$/.test(w)) return "Nouns ending -ung, -heit, -keit, -ion are always die.";
  if(/in$/.test(w)&&n.a==="die") return "Feminine words ending -in are die.";
  if(["Mann","Vater","Bruder","Freund","Lehrer","Kollege","Chef","Sohn"].includes(w)) return "Masculine people are der.";
  if(["Frau","Mutter","Schwester","Tochter"].includes(w)) return "Feminine people are die.";
  if(/e$/.test(w)&&n.a==="die") return "Most nouns ending -e are die.";
  if(/e$/.test(w)&&n.a!=="die") return "Exception: ends in -e but is "+n.a+". Learn it by heart.";
  if(["Handy","Auto","Foto","Büro","Sofa","Kino","Hotel","Restaurant"].includes(w)) return "Many loan words ending in a vowel are das.";
  if(w==="Computer") return "Many nouns ending -er (tools, machines) are der.";
  return `No pattern for this one. Learn it with its colour: ${n.a==="der"?"blue":n.a==="die"?"red":"green"} <b>${n.a}</b>. Always say “${n.a} ${w}”, never just “${w}”.`;
}
/* nouns that exist only in the plural */
const PLURAL_ONLY=["Eltern","Geschwister","Möbel","Lebensmittel","Pommes frites","Leute"];
function pluralNote(n){
  const s=n.w,p=n.p,a=n.a;
  if(s===p) return "No ending added: "+s+" stays "+p+".";
  if(p.endsWith("nnen")) return "Feminine -in → -innen.";
  if(p.endsWith("s")&&!s.endsWith("s")) return "Loan word / vowel ending → -s.";
  const uml=/[äöü]/i.test(p)&&!/[äöü]/i.test(s);
  const noUml=p.replace(/[äöü]/g,m=>({"ä":"a","ö":"o","ü":"u"}[m]));
  if(uml&&noUml===s) return "Only an umlaut is added.";
  const U=uml?"Umlaut + ":"";
  if(/um$/.test(s)&&p.endsWith("a")) return "-um → -a: Praktikum → Praktika. Learn this pair by heart.";
  if(/um$/.test(s)&&p.endsWith("en")) return "-um → -en: Museum → Museen. Learn this pair by heart.";
  if(p.endsWith("er")&&!s.endsWith("er")) return U+"-er plural "+(a==="das"?"(typical for das words).":"(mostly das words; a few der words, e.g. der Mann → Männer).");
  if(p.endsWith("en")||p.endsWith("n")&&!uml) return "-n / -en plural "+(a==="die"?"(typical for die words).":a==="der"?"(der words: often weak nouns like der Name → Namen).":"(less common for das words, e.g. das Bett → Betten).");
  if(p.endsWith("e")) return U+"-e plural "+(a==="die"?"(only a few die words, e.g. die Stadt → Städte).":a==="der"?"(typical for der words).":"(common for das words too).");
  if(uml) return "Only an umlaut is added.";
  return "Learn the plural with the noun.";
}

/* numbers */
const U={0:["null","nool"],1:["eins","aynss"],2:["zwei","tsvy"],3:["drei","dry"],4:["vier","feer"],5:["fünf","fuenf"],6:["sechs","zeks"],7:["sieben","ZEE-ben"],8:["acht","akht"],9:["neun","noyn"],10:["zehn","tsayn"],11:["elf","elf"],12:["zwölf","tsvoelf"],13:["dreizehn","DRY-tsayn"],14:["vierzehn","FEER-tsayn"],15:["fünfzehn","FUENF-tsayn"],16:["sechzehn","ZEKH-tsayn"],17:["siebzehn","ZEEP-tsayn"],18:["achtzehn","AKHT-tsayn"],19:["neunzehn","NOYN-tsayn"]};
const T={2:["zwanzig","TSVAN-tsikh"],3:["dreißig","DRY-sikh"],4:["vierzig","FEER-tsikh"],5:["fünfzig","FUENF-tsikh"],6:["sechzig","ZEKH-tsikh"],7:["siebzig","ZEEP-tsikh"],8:["achtzig","AKHT-tsikh"],9:["neunzig","NOYN-tsikh"]};
function num(n){
  if(n<20) return U[n];
  if(n<100){const t=Math.floor(n/10),o=n%10; if(!o) return T[t];
    return [(o===1?"ein":U[o][0])+"und"+T[t][0], (o===1?"ayn":U[o][1])+"-oont-"+T[t][1]];}
  if(n<1000){const h=Math.floor(n/100),r=n%100; const hw=(h===1?"ein":U[h][0])+"hundert", hp=(h===1?"ayn":U[h][1])+"-HOON-dert";
    if(!r) return [hw,hp]; const rr=num(r); return [hw+rr[0], hp+"-"+rr[1]];}
  if(n<1e6){const t=Math.floor(n/1000), r=n%1000, tt=num(t), tw=tt[0].replace(/eins$/,"ein")+"tausend", tp=tt[1].replace(/aynss$/,"ayn")+"-TOW-zent";
    if(!r) return [tw,tp]; const rr=num(r); return [tw+rr[0], tp+"-"+rr[1]];}
  if(n<1e9){const m=Math.floor(n/1e6), r=n%1e6, mw=m===1?"eine Million":num(m)[0]+" Millionen", mp=m===1?"AY-nuh mil-YOHN":num(m)[1]+" mil-YOH-nen";
    if(!r) return [mw,mp]; const rr=num(r); return [mw+" "+rr[0], mp+" "+rr[1]];}
  return [String(n),""];
}
const dots=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,".");
/* a random big number; often a "round" one like 62.000 or 293.300 */
function rndBig(lo,hi){ if(lo>=10000&&Math.random()<.65){ const n=rnd(Math.ceil(lo/1000),Math.floor(hi/1000))*1000+rnd(0,9)*100; return Math.min(n,hi); } return rnd(lo,hi); }
/* "2,5 Millionen": m,d → [German words, pronunciation] */
const millionDec=(m,d)=>[`${num(m)[0]} Komma ${num(d)[0]} Millionen`,`${num(m)[1]} KOM-ah ${num(d)[1]} mil-YOH-nen`];
/* years: 1100–1999 are said in hundreds (1990 = neunzehnhundertneunzig), from 2000 as a normal number (2026 = zweitausendsechsundzwanzig) */
function yearSay(y){
  if(y>=2000||y<1100) return num(y);
  const h=Math.floor(y/100), r=y%100, hh=num(h), hw=hh[0]+"hundert", hp=hh[1]+"-HOON-dert";
  if(!r) return [hw,hp]; const rr=num(r); return [hw+rr[0], hp+"-"+rr[1]];
}
/* short memory hint shown after a number question (n = the number, yr = it is a year) */
function bigNote(n,yr){
  const last=n%100; let s="";
  if(last>20&&last%10) s+=`<br>Ones first: ${U[last%10][0]}… then …${T[Math.floor(last/10)][0]}.`;
  if(yr&&n<2000) s+="<br>Years before 2000: say the hundreds. 19|90 = neunzehn·hundert·neunzig.";
  else if(yr) s+="<br>From 2000 a year is a normal number: zwei·tausend·sechsundzwanzig.";
  else if(n>=1e6) s+="<br>die Million: <b>eine</b> Million, zwei Million<b>en</b> (plural -en), written as a separate word.";
  else if(n>=10000) s+="<br>Say the number before “tausend” like a normal number: 62.000 = zweiundsechzig·tausend.";
  else if(n>=1000) s+="<br>1000 = (ein)tausend. No “und” after hundert or tausend.";
  else if(n>=100) s+="<br>No “und” after hundert: hundert·fünfundzwanzig.";
  return s;
}

/* alphabet */
const ABC=[["A","ah"],["B","bay"],["C","tsay"],["D","day"],["E","ay",1],["F","eff"],["G","gay",1],["H","hah"],["I","ee",1],["J","yot",1],["K","kah"],["L","ell"],["M","emm"],["N","enn"],["O","oh"],["P","pay"],["Q","koo"],["R","err"],["S","ess"],["T","tay"],["U","oo"],["V","fow",1],["W","vay",1],["X","iks"],["Y","UEP-see-lon",1],["Z","tset",1],["Ä","eh"],["Ö","oe"],["Ü","ue"],["ß","ESS-tset"]];
const SAY={A:"Ah",B:"Beh",C:"Zeh",D:"Deh",E:"Eh",F:"Eff",G:"Geh",H:"Hah",I:"Ih",J:"Jott",K:"Kah",L:"Ell",M:"Emm",N:"Enn",O:"Oh",P:"Peh",Q:"Kuh",R:"Err",S:"Ess",T:"Teh",U:"Uh",V:"Fau",W:"Weh",X:"Ix",Y:"Üpsilon",Z:"Zett","Ä":"Äh","Ö":"Öh","Ü":"Üh","ß":"Eszett"};
const CONFUSE=[["E","I","A","Ä"],["G","J","K","Y"],["V","W","F","B"],["Z","C","S","T"],["I","E","Y","Ü"],["J","G","Y","I"],["W","V","U","B"],["H","A","K","R"],["Ü","U","I","Ö"],["Ö","O","E","Ä"],["Q","K","U","C"],["R","A","H","E"],["B","P","D","T"],["D","T","B","E"],["X","S","Z","C"],["F","V","W","H"],["L","R","N","M"],["Ä","E","A","Ö"],["ß","S","Z","B"],["N","M","L","U"]];
const SPELL=["Maria","Müller","Schmidt","Weber","Becker","Koch","Wagner","Hoffmann","Bauer","Jung","Vogel","Zimmer","Schulz","Keller","Hilde","Yvonne","Goethe","Straße","Weg","Platz","Jasmin","Viktor","Krüger","Schäfer","Jäger","Fischer","Meyer","Wolf","Lehmann","Neumann","Ziegler","Hamburg","Bahnhof","Kaffee","Quelle","Xaver"];

/* word types */
const TYPES=["Nomen","Verb","Artikel","Pronomen","Adjektiv","Adverb","Präposition","Konjunktion"];
const TEN={Nomen:"noun",Verb:"verb",Artikel:"article",Pronomen:"pronoun",Adjektiv:"adjective",Adverb:"adverb","Präposition":"preposition",Konjunktion:"conjunction"};
const SENTS=[
 [["Ich","Pronomen","I"],["heiße","Verb","am called"],["Maria","Nomen","Maria"]],
 [["Die","Artikel","the"],["Frau","Nomen","woman"],["trinkt","Verb","drinks"],["einen","Artikel","a"],["Kaffee","Nomen","coffee"]],
 [["Das","Artikel","the"],["Buch","Nomen","book"],["ist","Verb","is"],["neu","Adjektiv","new"]],
 [["Wir","Pronomen","we"],["wohnen","Verb","live"],["in","Präposition","in"],["Hamburg","Nomen","Hamburg"]],
 [["Er","Pronomen","he"],["kommt","Verb","comes"],["aus","Präposition","from"],["Brasilien","Nomen","Brazil"],["und","Konjunktion","and"],["sie","Pronomen","she"],["kommt","Verb","comes"],["aus","Präposition","from"],["Spanien","Nomen","Spain"]],
 [["Der","Artikel","the"],["Kurs","Nomen","course"],["ist","Verb","is"],["heute","Adverb","today"],["sehr","Adverb","very"],["gut","Adjektiv","good"]],
 [["Du","Pronomen","you"],["lernst","Verb","learn"],["auch","Adverb","also"],["Deutsch","Nomen","German"]],
 [["Die","Artikel","the"],["Lampe","Nomen","lamp"],["ist","Verb","is"],["klein","Adjektiv","small"],["aber","Konjunktion","but"],["schön","Adjektiv","beautiful"]],
 [["Ich","Pronomen","I"],["trinke","Verb","drink"],["Tee","Nomen","tea"],["oder","Konjunktion","or"],["Wasser","Nomen","water"]],
 [["Sie","Pronomen","she"],["wohnt","Verb","lives"],["hier","Adverb","here"],["mit","Präposition","with"],["ihrer","Artikel","her"],["Familie","Nomen","family"]],
 [["Wir","Pronomen","we"],["gehen","Verb","go"],["heute","Adverb","today"],["ins","Präposition","to the"],["Kino","Nomen","cinema"]],
 [["Der","Artikel","the"],["Bahnhof","Nomen","station"],["ist","Verb","is"],["nicht","Adverb","not"],["weit","Adjektiv","far"]],
 [["Gehen","Verb","go"],["Sie","Pronomen","you"],["hier","Adverb","here"],["links","Adverb","left"]],
 [["Mein","Artikel","my"],["Bruder","Nomen","brother"],["wohnt","Verb","lives"],["in","Präposition","in"],["Berlin","Nomen","Berlin"]],
 [["Das","Artikel","the"],["Brot","Nomen","bread"],["ist","Verb","is"],["frisch","Adjektiv","fresh"],["und","Konjunktion","and"],["billig","Adjektiv","cheap"]],
 [["Ich","Pronomen","I"],["arbeite","Verb","work"],["oft","Adverb","often"],["mit","Präposition","with"],["Kollegen","Nomen","colleagues"]],
 [["Wir","Pronomen","we"],["fahren","Verb","drive"],["morgen","Adverb","tomorrow"],["nach","Präposition","to"],["Berlin","Nomen","Berlin"]],
 [["Die","Artikel","the"],["Wohnung","Nomen","flat"],["ist","Verb","is"],["groß","Adjektiv","big"],["aber","Konjunktion","but"],["teuer","Adjektiv","expensive"]],
[["Wir","Pronomen","we"],["wohnen","Verb","live"],["in","Präposition","in"],["Berlin","Nomen","Berlin"]],
 [["Mein","Artikel","my"],["Bruder","Nomen","brother"],["ist","Verb","is"],["groß","Adjektiv","tall"]],
 [["Ich","Pronomen","I"],["trinke","Verb","drink"],["Kaffee","Nomen","coffee"],["und","Konjunktion","and"],["Tee","Nomen","tea"]],
 [["Er","Pronomen","he"],["kommt","Verb","comes"],["heute","Adverb","today"]]
];

/* exam data */
const WWORDS=["Wer","Was","Wo","Woher","Wohin","Wie","Wie alt","Wie viele","Wie viel","Wann","Welche","Warum","Wie spät"];
const WQ=[
 ["Ich komme aus Brasilien.","Woher","kommen Sie","I come from Brazil.","Where do you come from?"],
 ["Ich wohne in Hamburg.","Wo","wohnen Sie","I live in Hamburg.","Where do you live?"],
 ["Ich heiße Maria.","Wie","heißen Sie","My name is Maria.","What is your name? (lit. how are you called?)"],
 ["Ich bin dreißig Jahre alt.","Wie alt","sind Sie","I am thirty (dreißig = DRY-sikh) years old.","How old are you?"],
 ["Ich bin Ingenieurin.","Was","sind Sie von Beruf","I am an engineer.","What is your job? (lit. what are you by profession?)"],
 ["Das ist mein Bruder.","Wer","ist das","That is my brother.","Who is that?"],
 ["Ich fahre nach Berlin.","Wohin","fahren Sie","I am going to Berlin.","Where are you going (to)?"],
 ["Am Montag und Mittwoch.","Wann","haben Sie Deutschkurs","On Monday and Wednesday.","When do you have German class?"],
 ["Englisch und ein bisschen Deutsch.","Welche","Sprachen sprechen Sie","English and a little German.","Which languages do you speak?"],
 ["Ich spreche drei Sprachen.","Wie viele","Sprachen sprechen Sie","I speak three (drei = dry) languages.","How many languages do you speak?"],
 ["Ich arbeite bei Siemens.","Wo","arbeiten Sie","I work at Siemens.","Where do you work?"],
 ["Von 9 bis 17 Uhr.","Wann","arbeiten Sie","From 9 to 17 o'clock (neun bis siebzehn Uhr = noyn bis ZEEP-tsayn oor).","When do you work?"],
 ["Das kostet fünf Euro.","Wie viel","kostet das","That costs five (fünf = fuenf) euros.","How much does that cost?"],
 ["Ich trinke gern Tee.","Was","trinken Sie gern","I like drinking tea.","What do you like to drink?"],
 ["Danke, gut.","Wie","geht es Ihnen","Fine, thanks.","How are you?"],
 ["Für die Arbeit.","Warum","lernen Sie Deutsch","For work.","Why do you learn German?"],
 ["Um 19 Uhr.","Wann","beginnt die Party","At 7 pm (neunzehn Uhr = NOYN-tsayn oor).","When does the party start?"],
 ["Im Supermarkt.","Wo","kaufen Sie ein","At the supermarket.","Where do you shop?"],
 ["Mit dem Bus.","Wie","kommen Sie zur Arbeit","By bus.","How do you get to work?"],
 ["Geradeaus und dann links.","Wie","komme ich zum Bahnhof","Straight ahead and then left.","How do I get to the station?"],
 ["Der Bahnhof ist hier links.","Wo","ist der Bahnhof","The station is here on the left.","Where is the station?"],
 ["Es ist halb drei.","Wie spät","ist es","It is half past two. (halb drei = hulp dry)","What time is it?"],
 ["Mein Kollege.","Wer","ist der Mann","My colleague.","Who is the man?"],
 ["Sechs, bitte.","Wie viele","Äpfel möchten Sie","Six, please. (sechs = zeks)","How many apples would you like?"],
 ["Aus Italien.","Woher","kommt dein Kollege","From Italy.","Where does your colleague come from?"],
 ["Nach Hause.","Wohin","gehst du","Home.","Where are you going?"],
 ["Am Wochenende.","Wann","hast du Zeit","At the weekend.","When do you have time?"],
 ["Pizza und Salat.","Was","isst du gern","Pizza and salad.","What do you like to eat?"],
 ["Zwei Euro fünfzig.","Wie viel","kostet der Kaffee","Two euros fifty. (tsvy OY-ro FUENF-tsikh)","How much is the coffee?"],
 ["Er heißt Tom.","Wie","heißt dein Bruder","He is called Tom.","What is your brother called?"]
];
/* Sprechen Teil 1, sich vorstellen. Every row: keyword, question, answer start, English of the question,
   English of the keyword, English of the answer (word by word, then the meaning), where it comes up:
   "card" = one of the 7 keywords on the exam card, "ask" = the examiner asks it after your introduction,
   "more" = not on the card, but a common question in Sprechen Teil 2 and in everyday talk. */
const INTRO=[
 {k:"Name",q:"Wie heißen Sie?",a:"Ich heiße …",qe:"What is your name? (lit. How are you called?)",ke:"name",ae:"I am called … (= My name is …)",w:"card"},
 {k:"Alter",q:"Wie alt sind Sie?",a:"Ich bin … Jahre alt.",qe:"How old are you?",ke:"age",ae:"I am … years old. (e.g. dreißig, DRY-sikh = 30)",w:"card"},
 {k:"Land",q:"Woher kommen Sie?",a:"Ich komme aus …",qe:"Where are you from? (lit. Where-from come you?)",ke:"country",ae:"I come from … (aus + country: aus Malaysia)",w:"card"},
 {k:"Wohnort",q:"Wo wohnen Sie?",a:"Ich wohne in …",qe:"Where do you live?",ke:"place where you live",ae:"I live in … (in + town: in München)",w:"card"},
 {k:"Sprachen",q:"Welche Sprachen sprechen Sie?",a:"Ich spreche …",qe:"Which languages do you speak? (lit. Which languages speak you?)",ke:"languages",ae:"I speak … (e.g. Englisch und ein bisschen Deutsch = English and a little German)",w:"card"},
 {k:"Beruf",q:"Was sind Sie von Beruf?",a:"Ich bin … von Beruf.",qe:"What is your job? (lit. What are you by profession?)",ke:"job",ae:"I am … by profession. (no article: Ich bin Ingenieurin.)",w:"card"},
 {k:"Hobby",q:"Was sind Ihre Hobbys?",a:"Meine Hobbys sind …",qe:"What are your hobbies?",ke:"hobby",ae:"My hobbies are … (e.g. Lesen und Kochen = reading and cooking)",w:"card"},
 {k:"Buchstabieren",q:"Können Sie das bitte buchstabieren?",a:"Ja: M – A – R – I – A.",qe:"Can you spell that, please? (lit. Can you that please spell?)",ke:"spelling",ae:"Yes: M – A – R – I – A. (Emm – Ah – Err – Ih – Ah)",w:"ask"},
 {k:"Telefonnummer",q:"Wie ist Ihre Telefonnummer?",a:"Meine Telefonnummer ist …",qe:"What is your phone number? (lit. How is your phone number?)",ke:"phone number",ae:"My phone number is … (digit by digit: null, eins, sieben = nool, aynss, ZEE-ben)",w:"ask"},
 {k:"Geburtstag",q:"Wann haben Sie Geburtstag?",a:"Ich habe am … Geburtstag.",qe:"When is your birthday? (lit. When have you birthday?)",ke:"birthday",ae:"I have on-the … birthday. (= My birthday is on the …, e.g. am dritten Mai, DRIT-en = on 3 May)",w:"more"},
 {k:"Familie",q:"Haben Sie Familie?",a:"Ja, ich bin verheiratet und habe … Kinder. / Nein, ich bin ledig.",qe:"Do you have a family? (lit. Have you family?)",ke:"family",ae:"Yes, I am married and have … children. / No, I am single. (e.g. zwei Kinder, tsvy = two children)",w:"more"},
 {k:"Adresse",q:"Wie ist Ihre Adresse?",a:"Meine Adresse ist … Straße …",qe:"What is your address? (lit. How is your address?)",ke:"address",ae:"My address is … Street … (street first, then the number: Goethestraße 12, zwölf = tsvoelf)",w:"more"},
 {k:"Lieblingsessen",q:"Was essen Sie gern?",a:"Ich esse gern …",qe:"What do you like to eat? (lit. What eat you gladly?)",ke:"favourite food",ae:"I eat gladly … (= I like eating …)",w:"more"},
 {k:"Wochenende",q:"Was machen Sie am Wochenende?",a:"Am Wochenende …",qe:"What do you do at the weekend? (lit. What make you at-the weekend?)",ke:"weekend",ae:"At-the weekend … (the verb comes next: Am Wochenende fahre ich Fahrrad = at the weekend I ride my bike)",w:"more"},
 {k:"Geschwister",q:"Haben Sie Geschwister?",a:"Ja, ich habe einen Bruder. / Nein, ich habe keine Geschwister.",qe:"Do you have brothers or sisters? (lit. Have you siblings?)",ke:"brothers and sisters",ae:"Yes, I have a brother. / No, I have no siblings.",w:"more"},
 {k:"Deutsch lernen",q:"Warum lernen Sie Deutsch?",a:"Ich lerne Deutsch, denn …",qe:"Why are you learning German? (lit. Why learn you German?)",ke:"learning German",ae:"I learn German, because … (after denn: normal word order, e.g. denn ich arbeite hier = because I work here)",w:"more"},
 {k:"Urlaub",q:"Wohin fahren Sie gern in Urlaub?",a:"Ich fahre gern nach …",qe:"Where do you like to go on holiday? (lit. Where-to drive you gladly in holiday?)",ke:"holiday",ae:"I drive gladly to … (= I like going to …; nach + country or town)",w:"more"},
 {k:"Wohnung",q:"Wie wohnen Sie?",a:"Ich wohne in einer Wohnung mit … Zimmern.",qe:"How do you live? (= What is your home like?)",ke:"flat / home",ae:"I live in a flat with … rooms. (e.g. drei Zimmern, dry = three rooms)",w:"more"},
 {k:"E-Mail",q:"Haben Sie eine E-Mail-Adresse?",a:"Ja, meine E-Mail-Adresse ist …",qe:"Do you have an e-mail address? (lit. Have you an e-mail address?)",ke:"e-mail",ae:"Yes, my e-mail address is … (@ = ät, . = Punkt)",w:"more"},
 {k:"Sport",q:"Machen Sie Sport?",a:"Ja, ich spiele … / Ich fahre gern Fahrrad.",qe:"Do you do sport? (lit. Make you sport?)",ke:"sport",ae:"Yes, I play … / I ride gladly bicycle. (= I like cycling.)",w:"more"},
 {k:"Arbeitszeit",q:"Wann arbeiten Sie?",a:"Ich arbeite von … bis …",qe:"When do you work?",ke:"working hours",ae:"I work from … to … (e.g. von 9 bis 17 Uhr = von neun, noyn, bis siebzehn, ZEEP-tsayn, Uhr)",w:"more"}
];
const ORDER=[
 ["Wo wohnen Sie?","Wo Sie wohnen?","Wohnen wo Sie?","Where do you live?","W-question: W-word 1st, verb 2nd."],
 ["Woher kommst du?","Woher du kommst?","Du woher kommst?","Where do you come from?","W-question: W-word 1st, verb 2nd."],
 ["Wie alt sind Sie?","Wie alt Sie sind?","Sind wie alt Sie?","How old are you?","'Wie alt' counts as one position; the verb comes next."],
 ["Was sind Sie von Beruf?","Was Sie sind von Beruf?","Was von Beruf Sie sind?","What is your job?","W-question: W-word 1st, verb 2nd."],
 ["Ich wohne in Hamburg.","Ich in Hamburg wohne.","In Hamburg ich wohne.","I live in Hamburg.","Statement: the verb is always in position 2."],
 ["Heute lerne ich Deutsch.","Heute ich lerne Deutsch.","Ich heute lerne Deutsch.","Today I learn German.","If you start with 'heute', the verb still comes 2nd and the person moves after it."],
 ["Am Wochenende fahre ich Fahrrad.","Am Wochenende ich fahre Fahrrad.","Ich am Wochenende fahre Fahrrad.","At the weekend I ride my bike.","Time first → verb 2nd → then 'ich'."],
 ["Sprechen Sie Englisch?","Englisch Sie sprechen?","Sprechen Englisch Sie?","Do you speak English?","Yes/no question: the verb comes 1st."],
 ["Arbeiten Sie in Hamburg?","Sie in Hamburg arbeiten?","Arbeiten in Hamburg Sie?","Do you work in Hamburg?","Yes/no question: the verb comes 1st."],
 ["Ich arbeite als Ingenieurin bei Siemens.","Ich als Ingenieurin arbeite bei Siemens.","Als Ingenieurin ich arbeite bei Siemens.","I work as an engineer at Siemens.","Statement: the verb (arbeite) in position 2."],
 ["Kannst du bitte das Fenster öffnen?","Kannst du bitte öffnen das Fenster?","Kannst öffnen du bitte das Fenster?","Can you please open the window?","kannst early, the infinitive (öffnen) at the end."],
 ["Ich möchte einen Kaffee trinken.","Ich möchte trinken einen Kaffee.","Ich trinken möchte einen Kaffee.","I would like to drink a coffee.","möchte in position 2, the infinitive (trinken) at the end."],
 ["Meine Hobbys sind Lesen und Kochen.","Meine Hobbys Lesen und Kochen sind.","Sind meine Hobbys Lesen und Kochen.","My hobbies are reading and cooking.","Statement: the verb (sind) in position 2."],
 ["Wie komme ich zum Bahnhof?","Wie ich komme zum Bahnhof?","Wie komme zum Bahnhof ich?","How do I get to the station?","W-question: W-word 1st, verb 2nd."],
 ["Gehen Sie geradeaus.","Geradeaus Sie gehen.","Sie geradeaus gehen.","Go straight ahead.","Request with Sie: verb 1st, then Sie."],
 ["Morgen arbeite ich im Homeoffice.","Morgen ich arbeite im Homeoffice.","Ich morgen arbeite im Homeoffice.","Tomorrow I work from home.","Time first → verb 2nd → ich."],
 ["Um 8 Uhr frühstücke ich.","Um 8 Uhr ich frühstücke.","Ich um 8 Uhr frühstücke.","At 8 (acht, akht) o'clock I have breakfast.","Time first → verb 2nd → ich."],
 ["Hast du heute Zeit?","Heute du hast Zeit?","Hast heute du Zeit?","Do you have time today?","Yes/no question: verb 1st, then the person."],
 ["Ich habe kein Auto.","Ich habe nicht Auto.","Ich kein Auto habe.","I don't have a car.","kein + noun; verb in position 2."],
 ["Das Museum ist nicht weit.","Das Museum nicht ist weit.","Das Museum ist weit nicht.","The museum is not far.","nicht comes before the adjective."],
 ["Wann beginnt der Kurs?","Wann der Kurs beginnt?","Wann beginnt Kurs der?","When does the course start?","W-word 1st, verb 2nd, then the subject."],
 ["Ich stehe um 7 Uhr auf.","Ich aufstehe um 7 Uhr.","Ich stehe auf um 7 Uhr.","I get up at 7 (sieben, ZEE-ben) o'clock.","Separable verb: stehe in position 2, auf goes to the end."],
 ["Ich kann heute nicht kommen.","Ich kann nicht kommen heute.","Ich kommen kann heute nicht.","I can't come today.","Modal verb 2nd, infinitive at the end, nicht just before it."],
 ["Ich muss morgen früh aufstehen.","Ich muss morgen früh stehe auf.","Ich muss aufstehen morgen früh.","I have to get up early tomorrow.","With a modal, the separable verb stays in one piece at the end."],
 ["Wann fängt der Kurs an?","Wann anfängt der Kurs?","Wann fängt an der Kurs?","When does the course start?","Separable verb in a question: the prefix still goes to the end."],
 ["Zuerst frühstücke ich, dann gehe ich zur Arbeit.","Zuerst ich frühstücke, dann ich gehe zur Arbeit.","Zuerst frühstücke ich, dann ich gehe zur Arbeit.","First I have breakfast, then I go to work.","zuerst and dann take place 1, so the verb comes next."],
 ["Ich lerne Deutsch, denn ich arbeite in Deutschland.","Ich lerne Deutsch, denn arbeite ich in Deutschland.","Ich lerne Deutsch, denn ich in Deutschland arbeite.","I learn German because I work in Germany.","denn is position 0: normal word order after it."],
 ["Ich komme aus Brasilien, aber ich wohne in Berlin.","Ich komme aus Brasilien, aber wohne ich in Berlin.","Ich komme aus Brasilien, aber ich in Berlin wohne.","I come from Brazil, but I live in Berlin.","aber is position 0: normal word order after it."],
 ["Ich fahre morgen mit dem Bus zur Arbeit.","Ich fahre zur Arbeit mit dem Bus morgen.","Morgen ich fahre mit dem Bus zur Arbeit.","Tomorrow I'm taking the bus to work.","Verb 2nd; in the middle: when → how → where."],
 ["Ich möchte bitte zwei Brötchen.","Ich bitte möchte zwei Brötchen.","Möchte ich bitte zwei Brötchen.","I would like two (zwei, tsvy) bread rolls, please.","Statement: verb (möchte) in position 2."]
];
const FORM=[
 ["Familienname / Nachname","surname / last name"],["Vorname","first name"],["Geburtsdatum","date of birth"],["Geburtsort","place of birth"],
 ["Staatsangehörigkeit","nationality"],["Muttersprache","native language"],["Straße, Hausnummer","street, house number"],["PLZ (Postleitzahl)","postcode"],
 ["Wohnort","town where you live"],["Telefonnummer","phone number"],["Familienstand","marital status"],["ledig","single (not married)"],
 ["verheiratet","married"],["geschieden","divorced"],["Anzahl der Kinder","number of children"],["Geschlecht","sex (male / female)"],
 ["männlich","male"],["weiblich","female"],["Beruf","job / profession"],["Unterschrift","signature"],["Datum","date"]
];

const WORK=[
 ["Ich arbeite ___ Siemens.","I work at Siemens.",["bei","als","in"],"bei","<b>bei</b> + company."],
 ["Ich arbeite ___ Ingenieurin.","I work as an engineer.",["als","bei","in"],"als","<b>als</b> + job, with no article."],
 ["Ich arbeite ___ Hamburg.","I work in Hamburg.",["in","bei","als"],"in","<b>in</b> + city."],
 ["Du ___ im Büro.","You work in the office.",["arbeitest","arbeitst","arbeiten"],"arbeitest","arbeit ends in -t, so add an extra <b>e</b>: du arbeit<b>e</b>st."],
 ["Er ___ im Homeoffice.","He works from home.",["arbeitet","arbeit","arbeitt"],"arbeitet","arbeit ends in -t, so add an extra <b>e</b>: er arbeit<b>e</b>t."],
 ["Ich arbeite ___ Montag ___ Freitag.","I work from Monday to Friday.",["von … bis","bis … von","um … bis"],"von … bis","<b>von … bis</b> = from … to."],
 ["Die Besprechung ist ___ 10 Uhr.","The meeting is at 10 o'clock. (zehn Uhr = tsayn oor)",["um","von","am"],"um","<b>um</b> + clock time."],
 ["Ich komme ___ dem Fahrrad zur Arbeit.","I come to work by bike.",["mit","bei","von"],"mit","<b>mit</b> = with / by (transport)."],
 ["Sie ist ___.","She is a teacher.",["Lehrerin","eine Lehrerin","Lehrer"],"Lehrerin","No article before a job, and feminine job titles add -in."],
 ["___ arbeiten Sie?","Where do you work?",["Wo","Woher","Wer"],"Wo","<b>Wo</b> = where (place)."],
 ["Meine ___ ist sehr nett.","My (female) colleague is very nice.",["Kollegin","Kollege","Kollegen"],"Kollegin","Meine + feminine: <b>die Kollegin</b>."],
 ["Ich arbeite ___ März dort.","I have worked there since March.",["seit","um","von"],"seit","<b>seit</b> = since."],
 ["Das ist ___ Büro.","That is the office.",["das","der","die"],"das","<b>das</b> Büro (loan word ending in a vowel)."],
 ["Ich habe heute ___ Termin.","I have an appointment today.",["einen","eine","ein"],"einen","<b>der</b> Termin → Akkusativ: <b>einen</b> Termin. Only der changes."],
["Ich arbeite ___ Montag bis Freitag.","I work from Monday to Friday.",["von","um","seit"],"von","<b>von</b> … bis = from … to."],
 ["Mein Chef ___ sehr nett.","My boss is very nice.",["ist","bin","hat"],"ist","er (mein Chef) → <b>ist</b>."],
 ["Ich habe ___ Uhr Feierabend.","I finish work at 5 pm (17 Uhr, siebzehn, ZEEP-tsayn).",["um 17","am 17","im 17"],"um 17","<b>um</b> + clock time. Feierabend = end of the working day."],
 ["Was ___ du von Beruf?","What do you do for a living?",["bist","ist","hast"],"bist","du → <b>bist</b>."],
 ["Er ist Arzt. Sie ist ___.","He is a doctor. She is a doctor.",["Ärztin","Arztin","Arzt"],"Ärztin","Feminine forms add -in (and here an umlaut): <b>Ärztin</b>."],
 ["Ich arbeite ___ Teilzeit.","I work part-time.",["in","als","bei"],"in","<b>in Teilzeit</b> / <b>in Vollzeit</b> = part-time / full-time."],
 ["Ich mache eine ___ als Köchin.","I'm doing an apprenticeship as a cook.",["Ausbildung","Arbeit","Beruf"],"Ausbildung","<b>die Ausbildung</b> = training / apprenticeship."]
];

/* more data */
const VREG=[["wohnen","wohn","to live"],["kommen","komm","to come"],["lernen","lern","to learn"],["spielen","spiel","to play"],["trinken","trink","to drink"],["machen","mach","to do / make"],["kaufen","kauf","to buy"],["gehen","geh","to go"],["kochen","koch","to cook"],["brauchen","brauch","to need"],["hören","hör","to hear"],["schreiben","schreib","to write"],["schwimmen","schwimm","to swim"],["joggen","jogg","to jog"],["fragen","frag","to ask"],["suchen","such","to look for"]];
const VIRR={sein:["bin","bist","ist","sind","seid","sind","to be"],haben:["habe","hast","hat","haben","habt","haben","to have"],heißen:["heiße","heißt","heißt","heißen","heißt","heißen","to be called"],arbeiten:["arbeite","arbeitest","arbeitet","arbeiten","arbeitet","arbeiten","to work"],fahren:["fahre","fährst","fährt","fahren","fahrt","fahren","to drive / ride"],essen:["esse","isst","isst","essen","esst","essen","to eat"],sprechen:["spreche","sprichst","spricht","sprechen","sprecht","sprechen","to speak"],möchten:["möchte","möchtest","möchte","möchten","möchtet","möchten","would like"],
 schlafen:["schlafe","schläfst","schläft","schlafen","schlaft","schlafen","to sleep"],lesen:["lese","liest","liest","lesen","lest","lesen","to read"],
 sehen:["sehe","siehst","sieht","sehen","seht","sehen","to see"],laufen:["laufe","läufst","läuft","laufen","lauft","laufen","to run / walk"],
 treffen:["treffe","triffst","trifft","treffen","trefft","treffen","to meet"],nehmen:["nehme","nimmst","nimmt","nehmen","nehmt","nehmen","to take"],
 tanzen:["tanze","tanzt","tanzt","tanzen","tanzt","tanzen","to dance"],reisen:["reise","reist","reist","reisen","reist","reisen","to travel"]};
const ACT=[["gehen","to go"],["machen","to do / make"],["spielen","to play"],["hören","to hear / listen"],["kochen","to cook"],["trinken","to drink"],["kaufen","to buy"],["schwimmen","to swim"],["tanzen","to dance"],["reisen","to travel"],["fahren","to drive / ride"],["schlafen","to sleep"],["laufen","to run / walk"],["essen","to eat"],["sprechen","to speak"],["treffen","to meet"],["nehmen","to take"],["lesen","to read"],["sehen","to see / watch"],["schreiben","to write"],["arbeiten","to work"],["lernen","to learn"]];
const GERN=[
 ["Ich spiele gern Tennis.","Ich gern spiele Tennis.","Ich spielen gern Tennis.","I like playing tennis."],
 ["Ich lese gern.","Ich gern lese.","Ich liest gern.","I like reading."],
 ["Er fährt gern Fahrrad.","Er fahrt gern Fahrrad.","Er gern fährt Fahrrad.","He likes cycling."],
 ["Wir tanzen nicht gern.","Wir nicht gern tanzen.","Wir tanzt nicht gern.","We don't like dancing."],
 ["Was machst du gern?","Was du machst gern?","Was machen du gern?","What do you like doing?"],
 ["Spielst du gern Fußball?","Du gern spielst Fußball?","Spielt du gern Fußball?","Do you like playing football?"],
 ["Sie liest gern Zeitung.","Sie lest gern Zeitung.","Sie gern liest Zeitung.","She likes reading the newspaper."],
 ["Isst du gern Pizza?","Esst du gern Pizza?","Du gern isst Pizza?","Do you like eating pizza?"],
 ["Am Wochenende schlafe ich gern lange.","Am Wochenende ich schlafe gern lange.","Am Wochenende schläfe ich gern lange.","At the weekend I like sleeping in."],
 ["Er sieht gern Filme.","Er seht gern Filme.","Er gern sieht Filme.","He likes watching films."],
 ["Triffst du gern Freunde?","Treffst du gern Freunde?","Triffst gern du Freunde?","Do you like meeting friends?"],
 ["Ich koche nicht so gern.","Ich nicht so gern koche.","Ich kochst nicht so gern.","I don't really like cooking."],
["Ich höre gern Musik.","Ich gern höre Musik.","Ich hörst gern Musik.","I like listening to music."],
 ["Wir kochen gern zusammen.","Wir gern kochen zusammen.","Wir kocht gern zusammen.","We like cooking together."],
 ["Sie fährt gern Auto.","Sie fahrt gern Auto.","Sie gern fährt Auto.","She likes driving."],
 ["Ich trinke lieber Tee.","Ich lieber trinke Tee.","Ich trinke Tee lieber gern.","I prefer drinking tea."],
 ["Spielt ihr gern Karten?","Ihr gern spielt Karten?","Spielen ihr gern Karten?","Do you (all) like playing cards?"],
 ["Mein Bruder schwimmt nicht gern.","Mein Bruder nicht gern schwimmt.","Mein Bruder schwimmen nicht gern.","My brother doesn't like swimming."],
 ["Am Abend sieht er gern fern.","Am Abend er sieht gern fern.","Am Abend sieht er gern fernsehen.","In the evening he likes watching TV."],
 ["Was isst du am liebsten?","Was du isst am liebsten?","Was esst du am liebsten?","What do you like eating most?"]
];
function forms(v){ if(VIRR[v]) return VIRR[v].slice(0,6); const r=VREG.find(x=>x[0]===v); return ["e","st","t","en","t","en"].map(e=>r[1]+e); }
const KEIN=[
 ["Hast du ein Auto?","Nein, ich habe ___ Auto.","Do you have a car? – No, I have no car.",["kein","keine","nicht"],"kein","das Auto: ein → <b>kein</b>."],
 ["Ist das eine Lampe?","Nein, das ist ___ Lampe.","Is that a lamp? – No, that is not a lamp.",["keine","kein","nicht"],"keine","die Lampe: eine → <b>keine</b>."],
 ["Wohnst du in Berlin?","Nein, ich wohne ___ in Berlin.","Do you live in Berlin? – No, I don't live in Berlin.",["nicht","kein","keine"],"nicht","A place, no noun with ein → <b>nicht</b>."],
 ["Ist der Bahnhof weit?","Nein, er ist ___ weit.","Is the station far? – No, it is not far.",["nicht","kein","keine"],"nicht","Adjective (weit) → <b>nicht</b>."],
 ["Trinkst du Kaffee?","Nein, ich trinke ___ Kaffee.","Do you drink coffee? – No, I drink no coffee.",["keinen","kein","nicht"],"keinen","Noun without article → kein. der Kaffee in Akkusativ → <b>keinen</b>."],
 ["Hast du Zeit?","Nein, ich habe ___ Zeit.","Do you have time? – No, I have no time.",["keine","kein","nicht"],"keine","die Zeit, no article → <b>keine</b>."],
 ["Arbeitest du heute?","Nein, ich arbeite heute ___.","Are you working today? – No, I'm not working today.",["nicht","kein","keine"],"nicht","Verb → <b>nicht</b>, often at the end."],
 ["Ist das dein Handy?","Nein, das ist ___ Handy.","Is that your phone? – No, that is not my phone.",["nicht mein","kein mein","keine"],"nicht mein","With mein/dein use <b>nicht</b>. kein only replaces ein or no article."],
 ["Brauchst du einen Stift?","Nein, ich brauche ___ Stift.","Do you need a pen? – No, I don't need a pen.",["keinen","kein","nicht"],"keinen","der Stift, Akkusativ: einen → <b>keinen</b>."],
 ["Ist das Hotel teuer?","Nein, es ist ___ teuer.","Is the hotel expensive? – No, it is not expensive.",["nicht","kein","keine"],"nicht","Adjective (teuer) → <b>nicht</b>."],
 ["Gibt es hier eine Apotheke?","Nein, hier gibt es ___ Apotheke.","Is there a pharmacy here? – No, there is no pharmacy here.",["keine","kein","nicht"],"keine","die Apotheke: eine → <b>keine</b>."],
 ["Kommst du aus Spanien?","Nein, ich komme ___ aus Spanien.","Are you from Spain? – No, I'm not from Spain.",["nicht","kein","keine"],"nicht","A country / place → <b>nicht</b>."],
 ["Ist das ein Bahnhof?","Nein, das ist ___ Bahnhof.","Is that a station? – No, that is not a station.",["kein","keinen","nicht"],"kein","der Bahnhof after 'ist' (not Akkusativ): ein → <b>kein</b>."],
["Hast du Geschwister?","Nein, ich habe ___ Geschwister.","Do you have siblings? – No, I have no siblings.",["keine","kein","nicht"],"keine","Plural: <b>keine</b>."],
 ["Ist das dein Bruder?","Nein, das ist ___ Bruder.","Is that your brother? – No, that is not my brother.",["nicht mein","kein mein","keinen"],"nicht mein","With mein/dein use <b>nicht</b>."],
 ["Kommst du heute?","Nein, ich komme heute ___.","Are you coming today? – No, I'm not coming today.",["nicht","kein","keine"],"nicht","Verb → <b>nicht</b> at the end."],
 ["Gibt es hier einen Supermarkt?","Nein, hier gibt es ___ Supermarkt.","Is there a supermarket here? – No, there is no supermarket here.",["keinen","kein","nicht"],"keinen","es gibt + Akkusativ: der → <b>keinen</b>."],
 ["Hast du Hunger?","Nein, ich habe ___ Hunger.","Are you hungry? – No, I'm not hungry.",["keinen","kein","nicht"],"keinen","der Hunger, no article → <b>keinen</b>."],
 ["Ist die Wohnung groß?","Nein, sie ist ___ groß.","Is the flat big? – No, it is not big.",["nicht","kein","keine"],"nicht","Adjective → <b>nicht</b>."],
 ["Habt ihr ein Kind?","Nein, wir haben ___ Kinder.","Do you have a child? – No, we have no children.",["keine","kein","nicht"],"keine","Plural: <b>keine</b> Kinder."]
];
const ANSW=[
 ["Wo wohnst du?","Where do you live?","Ich wohne in Hamburg.","Ich wohnst in Hamburg.","Du wohnst in Hamburg.","du-question → answer with <b>ich</b> + -e: ich wohne."],
 ["Wie heißen Sie?","What is your name?","Ich heiße Maria.","Sie heißen Maria.","Ich heißen Maria.","Sie-question → answer with <b>ich</b>: ich heiße."],
 ["Woher kommst du?","Where are you from?","Ich komme aus Brasilien.","Ich komme in Brasilien.","Ich kommst aus Brasilien.","Woher → <b>aus</b> + country."],
 ["Wohnst du in Berlin?","Do you live in Berlin?","Nein, ich wohne in Hamburg.","Nein, du wohnst in Hamburg.","Ja, ich wohnst in Berlin.","Yes/no question → Ja / Nein + full sentence with ich."],
 ["Was ist dein Lieblingsessen?","What is your favourite food?","Mein Lieblingsessen ist Pizza.","Dein Lieblingsessen ist Pizza.","Mein Lieblingsessen bin Pizza.","<b>dein → mein</b> when you answer."],
 ["Wie ist Ihre Telefonnummer?","What is your phone number?","Meine Nummer ist 0176 1234567.","Ihre Nummer ist 0176 1234567.","Mein Nummer ist 0176 1234567.","<b>Ihre → meine</b> (die Nummer)."],
 ["Habt ihr heute Zeit?","Do you (all) have time today?","Ja, wir haben Zeit.","Ja, ihr habt Zeit.","Ja, wir habt Zeit.","ihr-question → answer with <b>wir</b>."],
 ["Sprechen Sie Englisch?","Do you speak English?","Ja, ich spreche Englisch.","Ja, Sie sprechen Englisch.","Ja, ich sprichst Englisch.","Sie → ich: <b>ich spreche</b>."],
 ["Wie komme ich zum Bahnhof?","How do I get to the station?","Gehen Sie geradeaus und dann links.","Ich gehe geradeaus und dann links.","Gehen geradeaus Sie und dann links.","Give directions with the Sie form: <b>Gehen Sie</b> …"],
 ["Was sind Sie von Beruf?","What is your job?","Ich bin Ingenieurin.","Ich bin eine Ingenieurin.","Ich sind Ingenieurin.","No article before a job; Sie → <b>ich bin</b>."],
 ["Wann beginnt der Kurs?","When does the course start?","Um 18 Uhr.","Am 18 Uhr.","In 18 Uhr.","<b>um</b> + clock time. (achtzehn Uhr = AKHT-tsayn oor)"],
 ["Hast du ein Fahrrad?","Do you have a bike?","Nein, ich habe kein Fahrrad.","Nein, ich habe nicht Fahrrad.","Nein, ich hast kein Fahrrad.","ein → <b>kein</b> in a no-answer."],
 ["Wie alt bist du?","How old are you?","Ich bin 30 Jahre alt.","Ich habe 30 Jahre.","Du bist 30 Jahre alt.","German uses <b>sein</b>: Ich bin … Jahre alt. (dreißig = DRY-sikh)"],
 ["Was machst du am Wochenende?","What do you do at the weekend?","Ich koche und lese.","Du kochst und liest.","Ich kochst und lese.","du → <b>ich</b>: ich koche, ich lese."],
["Wann hast du Geburtstag?","When is your birthday?","Am 12. Mai.","Im 12. Mai.","Um 12. Mai.","Date → <b>am</b>: am zwölften (TSVOELF-ten) Mai."],
 ["Hast du Kinder?","Do you have children?","Ja, ich habe zwei Kinder.","Ja, ich hat zwei Kinder.","Ja, du hast zwei Kinder.","du → ich: <b>ich habe</b>. zwei = tsvy."],
 ["Wie viel kostet das?","How much does that cost?","Drei Euro fünfzig.","Drei Uhr fünfzig.","Am dritten.","Price: Euro, not Uhr. 3,50 € = dry OY-ro FUENF-tsikh."],
 ["Wann beginnt der Kurs?","When does the course start?","Um 18 Uhr.","Am 18 Uhr.","Im 18 Uhr.","Clock time → <b>um</b>. 18 = achtzehn (AKHT-tsayn)."],
 ["Was machst du am Wochenende?","What are you doing at the weekend?","Ich besuche meine Eltern.","Du besuchst meine Eltern.","Ich besuchst meine Eltern.","du → <b>ich besuche</b>."],
 ["Bist du verheiratet?","Are you married?","Nein, ich bin ledig.","Nein, ich habe ledig.","Nein, du bist ledig.","<b>ledig</b> = single. ich <b>bin</b>."],
 ["Wo warst du gestern?","Where were you yesterday?","Ich war zu Hause.","Ich bin zu Hause gestern.","Ich hatte zu Hause.","Past of sein: <b>ich war</b>."],
 ["Wie ist deine Wohnung?","What is your flat like?","Sie ist klein, aber hell.","Er ist klein, aber hell.","Ich bin klein, aber hell.","die Wohnung → <b>sie</b>."]
];
const PLACES=[["der","Bahnhof","station"],["der","Supermarkt","supermarket"],["der","Marktplatz","market square"],["das","Museum","museum"],["das","Hotel","hotel"],["das","Krankenhaus","hospital"],["das","Kino","cinema"],["die","Post","post office"],["die","Apotheke","pharmacy"],["die","Bank","bank"],["die","Haltestelle","bus stop"],["die","Universität","university"],
 ["der","Park","park"],["der","Flughafen","airport"],["das","Restaurant","restaurant"],["das","Rathaus","town hall"],["die","Schule","school"],["die","Kirche","church"],["die","Bibliothek","library"],["die","Bäckerei","bakery"]
];
const ARROWS=[["←","links","left"],["→","rechts","right"],["↑","geradeaus","straight ahead"],["↓","zurück","back"]];
const DIR=[["Gehen Sie geradeaus.","Go straight ahead."],["Gehen Sie die erste Straße links.","Take the first street on the left."],["An der Ampel rechts.","Turn right at the traffic light."],["Der Bahnhof ist gegenüber.","The station is opposite."],["Die Post ist neben der Bank.","The post office is next to the bank."],["Das ist nicht weit, nur fünf Minuten zu Fuß.","It's not far, only five minutes on foot."],["Nehmen Sie den Bus Nummer drei.","Take bus number three."],["Gehen Sie über die Kreuzung.","Go across the crossroads."],["Die Apotheke ist an der Ecke.","The pharmacy is on the corner."],["Gehen Sie zurück.","Go back."],["Die zweite Straße rechts.","The second street on the right."],
 ["Gehen Sie bis zur Kreuzung.","Go as far as the crossroads."],["Nehmen Sie die U-Bahn, Linie zwei.","Take the underground, line two (zwei, tsvy)."],["Steigen Sie am Marktplatz aus.","Get off at the market square."],["Das Kino ist hinter dem Bahnhof.","The cinema is behind the station."],["Das Hotel ist links neben der Post.","The hotel is on the left next to the post office."],["Gehen Sie die erste Straße rechts.","Take the first street on the right."],["Fahren Sie drei Stationen.","Go three (drei, dry) stops."],["Es ist ungefähr zehn Minuten zu Fuß.","It is about ten (zehn, tsayn) minutes on foot."],["Die Haltestelle ist vor dem Supermarkt.","The stop is in front of the supermarket."]
];
function timeOff(h,m){return `${h===1?"ein":num(h)[0]} Uhr${m?" "+num(m)[0]:""}`;}
function timeInf(h,m){const a=h%12||12,b=a%12+1,w=x=>U[x][0];
 if(m===0) return a===1?"ein Uhr":`${w(a)} Uhr`;
 return m===5?`fünf nach ${w(a)}`:m===10?`zehn nach ${w(a)}`:m===15?`Viertel nach ${w(a)}`:m===20?`zwanzig nach ${w(a)}`:m===25?`fünf vor halb ${w(b)}`:m===30?`halb ${w(b)}`:m===35?`fünf nach halb ${w(b)}`:m===40?`zwanzig vor ${w(b)}`:m===45?`Viertel vor ${w(b)}`:m===55?`fünf vor ${w(b)}`:`zehn vor ${w(b)}`;}
function teenSwap(x){ if(x>=13&&x<=19) return (x-10)*10; if(x%10===0&&x>=30&&x<=90) return x/10+10; return x+10<100?x+10:x-10; }
const priceFmt=(e,c)=>`${e},${String(c).padStart(2,"0")} €`;
const priceSay=(e,c)=>`${e===1?"ein":num(e)[0]} Euro${c?" "+num(c)[0]:""}`;
const pricePron=(e,c)=>`${e===1?"ayn":num(e)[1]} OY-ro${c?" "+num(c)[1]:""}`;

const letterSay=l=>SAY[l]||l;

/* sentence building: * = verb part (red car), ^ = position-0 connector. Each token has a word-by-word gloss. */
const ARRANGE=[
 ["Heute|*lerne|ich|Deutsch",".","Today I am learning German.","today|learn|I|German","Time first → verb stays in place 2 → ich jumps behind the verb."],
 ["Am Wochenende|*spiele|ich|Tennis",".","At the weekend I play tennis.","at-the weekend|play|I|tennis","Time first → verb 2nd → ich."],
 ["Wo|*wohnen|Sie","?","Where do you live?","where|live|you (formal)","W-question: W-word 1st, verb 2nd."],
 ["*Sprechen|Sie|Englisch","?","Do you speak English?","speak|you|English","Yes/no question: the verb comes 1st."],
 ["Was|*machst|du|am Wochenende","?","What are you doing at the weekend?","what|do|you|at-the weekend","W-question: W-word 1st, verb 2nd, then the person."],
 ["Ich|*möchte|einen Kaffee|*trinken",".","I would like to drink a coffee.","I|would like|a coffee|drink","Bracket: möchte in place 2, the infinitive (trinken) at the end."],
 ["*Kannst|du|mir|*helfen","?","Can you help me?","can|you|me|help","Yes/no question with a modal: modal 1st, infinitive at the end."],
 ["Ich|*kann|heute|nicht|*kommen",".","I can't come today.","I|can|today|not|come","Bracket: kann … kommen. nicht stands just before the end verb."],
 ["Ich|*muss|heute|lange|*arbeiten",".","I have to work late today.","I|must|today|long|work","müssen: ich muss (no ending!). Infinitive at the end."],
 ["Ich|*stehe|um 7 Uhr|*auf",".","I get up at 7 (sieben, ZEE-ben) o'clock.","I|stand|at 7 (sieben) o'clock|up","Separable verb aufstehen: stehe in place 2, auf at the end."],
 ["Wann|*stehst|du|*auf","?","When do you get up?","when|stand|you|up","Separable verb in a W-question: the prefix still goes to the end."],
 ["Am Samstag|*kaufe|ich|im Supermarkt|*ein",".","On Saturday I go shopping at the supermarket.","on Saturday|shop|I|in-the supermarket|(in)","einkaufen is separable: kaufe in place 2, ein at the end."],
 ["Ich|*rufe|dich|morgen|*an",".","I'll call you tomorrow.","I|call|you|tomorrow|(on)","anrufen is separable: rufe … an."],
 ["Sie|*sieht|am Abend|*fern",".","She watches TV in the evening.","she|sees|in-the evening|far","fernsehen: sieht … fern. sehen is irregular: sie sieht."],
 ["Um halb acht|*fängt|der Kurs|*an",".","The course starts at 7:30 (halb acht, halp akht).","at half eight|catches|the course|on","halb acht = 7:30 (half way to eight). anfangen: fängt … an."],
 ["*Möchtest|du|am Sonntag|*mitkommen","?","Would you like to come along on Sunday?","would like|you|on Sunday|come along","Modal + separable verb: the separable verb stays in ONE piece at the end."],
 ["Ich|*trinke|Kaffee|^und|du|*trinkst|Tee",".","I drink coffee and you drink tea.","I|drink|coffee|and|you|drink|tea","und = position 0: after it a normal sentence (du trinkst)."],
 ["Ich|*komme|aus Brasilien,|^aber|ich|*wohne|in Berlin",".","I come from Brazil, but I live in Berlin.","I|come|from Brazil|but|I|live|in Berlin","aber = position 0: ich wohne (normal order). Comma before aber."],
 ["Ich|*lerne|Deutsch,|^denn|ich|*arbeite|in Deutschland",".","I learn German because I work in Germany.","I|learn|German|because|I|work|in Germany","denn = position 0: ich arbeite (normal order). Comma before denn."],
 ["*Trinkst|du|Kaffee|^oder|Tee","?","Do you drink coffee or tea?","drink|you|coffee|or|tea","oder joins two choices. Yes/no question: verb 1st."],
 ["Zuerst|*frühstücke|ich,|dann|*gehe|ich|zur Arbeit",".","First I have breakfast, then I go to work.","first|breakfast|I|then|go|I|to-the work","zuerst and dann take place 1, so the verb comes next and ich goes behind it."],
 ["Ich|*fahre|morgen|mit dem Bus|zur Arbeit",".","I'm taking the bus to work tomorrow.","I|go|tomorrow|with the bus|to-the work","Middle order: when (morgen) → how (mit dem Bus) → where (zur Arbeit)."],
 ["Am Abend|*gehe|ich|gern|ins Kino",".","In the evening I like going to the cinema.","in-the evening|go|I|gladly|into-the cinema","gern comes right after the verb and person."],
 ["Das Museum|*ist|nicht|weit",".","The museum is not far.","the museum|is|not|far","nicht stands before the adjective (weit)."],
 ["Ich|*arbeite|heute|nicht",".","I'm not working today.","I|work|today|not","The whole sentence is negative → nicht at the end."],
 ["Wir|*gehen|heute|nicht|ins Kino",".","We're not going to the cinema today.","we|go|today|not|into-the cinema","nicht stands before the place / direction (ins Kino)."],
 ["Wie viel|*kostet|das Brot","?","How much does the bread cost?","how much|costs|the bread","'Wie viel' counts as one place; the verb comes next."],
 ["Ich|*lerne|Deutsch,|^weil|ich|in München|*wohne",".","I learn German because I live in Munich. (A2 preview)","I|learn|German|because|I|in Munich|live","Ausblick A2: weil pulls the verb to the END (wohne)."]
].map(([t,p,en,ww,r])=>{const raw=t.split("|");return{raw,toks:raw.map(x=>x.replace(/^[*^]/,"")),p,en,ww:ww.split("|"),r};});

/* [sentence with ___, English, word by word, options (first = right), rule, typeable?] */
const GAPS=[
 ["Ich stehe um 7 Uhr ___.","I get up at 7 (sieben, ZEE-ben) o'clock.","I stand at 7 o'clock up.",["auf","an","ein"],"<b>auf</b>|stehen is separable: the prefix goes to the end.",1],
 ["Ich rufe meine Mutter ___.","I call my mother.","I call my mother (on).",["an","auf","mit"],"<b>an</b>|rufen is separable: rufe … an.",1],
 ["Am Samstag kaufe ich im Supermarkt ___.","On Saturday I shop at the supermarket.","On Saturday buy I in-the supermarket (in).",["ein","auf","an"],"<b>ein</b>|kaufen is separable: kaufe … ein.",1],
 ["Wann fängt der Film ___?","When does the film start?","When catches the film on?",["an","auf","ein"],"<b>an</b>|fangen: fängt … an. Even in a question the prefix goes to the end.",1],
 ["Ich möchte eine Pizza ___.","I would like to eat a pizza.","I would-like a pizza eat.",["essen","esse","isst"],"After a modal verb the 2nd verb is the <b>infinitive</b> (-en form) at the end.",1],
 ["Kannst du gut ___?","Can you cook well?","Can you well cook?",["kochen","kochst","kocht"],"Modal (kannst) + infinitive (<b>kochen</b>) at the end.",1],
 ["Ich ___ heute nicht kommen.","I can't come today.","I can today not come.",["kann","kanne","können"],"Modal verbs: <b>ich kann</b>, no -e ending.",0],
 ["Er ___ gut Deutsch sprechen.","He can speak German well.","He can well German speak.",["kann","kannt","können"],"Modal verbs: <b>er kann</b>, no -t ending.",0],
 ["Wir ___ heute Abend ins Kino gehen.","We want to go to the cinema tonight.","We want today evening into-the cinema go.",["wollen","will","wollt"],"wollen: ich will, du willst, er will, <b>wir wollen</b>.",0],
 ["___ du mir bitte helfen?","Can you please help me?","Can you me please help?",["Kannst","Kann","Können"],"du → <b>kannst</b> (-st, like every du form).",0],
 ["Ich muss morgen früh ___.","I have to get up early tomorrow.","I must tomorrow early get-up.",["aufstehen","stehe auf","aufstehe"],"Modal + separable verb: the separable verb stays in <b>one piece</b> at the end: aufstehen.",0],
 ["Sie ___ am Abend fern.","She watches TV in the evening.","She sees in-the evening far.",["sieht","seht","sehen"],"fern|sehen: sehen is irregular: <b>sie sieht</b>.",0],
 ["Um halb acht ___ der Kurs an.","The course starts at 7:30 (halb acht, halp akht).","At half eight catches the course on.",["fängt","fangt","fangen"],"anfangen: <b>er/sie/es fängt</b> (a → ä). Remember: halb acht = 7:30.",0],
 ["Ich gehe ins Bett, ___ ich bin müde.","I'm going to bed because I'm tired.","I go into-the bed, because I am tired.",["denn","aber","oder"],"<b>denn</b> = because. Position 0: ich bin (normal order).",0],
 ["Ich komme aus Spanien, ___ ich wohne in Berlin.","I come from Spain, but I live in Berlin.","I come from Spain, but I live in Berlin.",["aber","denn","oder"],"<b>aber</b> = but. Position 0: ich wohne (normal order).",0],
 ["Möchtest du Tee ___ Kaffee?","Would you like tea or coffee?","Would-like you tea or coffee?",["oder","und","denn"],"<b>oder</b> = or, for a choice.",0],
 ["Ich habe keine Zeit, ___ ich muss arbeiten.","I have no time because I have to work.","I have no time, because I must work.",["denn","oder","und"],"<b>denn</b> = because. It explains the reason.",0],
 ["Ich wohne nicht in Berlin, ___ in München.","I don't live in Berlin but in Munich.","I live not in Berlin, but-rather in Munich.",["sondern","aber","oder"],"After a <b>nicht / kein</b> + correction use <b>sondern</b>.",0],
 ["Zuerst frühstücke ich, dann ___ zur Arbeit.","First I have breakfast, then I go to work.","First breakfast I, then go I to-the work.",["gehe ich","ich gehe","ich gehen"],"<b>dann</b> takes place 1 → verb 2nd → <b>gehe ich</b>.",0],
 ["Ich lerne Deutsch, denn ___ in Deutschland.","I learn German because I work in Germany.","I learn German, because I work in Germany.",["ich arbeite","arbeite ich","ich arbeiten"],"<b>denn</b> is position 0 → normal order: <b>ich arbeite</b>.",0],
 ["Heute Abend ___ ins Kino.","Tonight we're going to the cinema.","Today evening go we into-the cinema.",["gehen wir","wir gehen","wir geht"],"Time first → verb 2nd → <b>gehen wir</b>.",0],
 ["Ich kann heute ___ kommen.","I can't come today.","I can today not come.",["nicht","kein","keine"],"Negating a verb → <b>nicht</b>, just before the end verb.",0],
 ["Ich fahre morgen ___ zur Arbeit.","Tomorrow I'm going to work by bike.","I go tomorrow with-the bicycle to-the work.",["mit dem Fahrrad","zur Arbeit mit","Fahrrad mit dem"],"Middle order: when (morgen) → <b>how (mit dem Fahrrad)</b> → where (zur Arbeit).",0],
 ["Er ___ seine Freundin am Abend an.","He calls his girlfriend in the evening.","He calls his girlfriend in-the evening (on).",["ruft","rufe","rufen"],"an|rufen: <b>er ruft</b> … an.",0],
 ["Ich lerne Deutsch, weil ___.","I learn German because I live in Munich. (A2 preview)","I learn German, because I in Munich live.",["ich in München wohne","ich wohne in München","wohne ich in München"],"Ausblick A2: <b>weil</b> pulls the verb to the end.",0]
];
function trainOf(x){return `<div class="train">${x.raw.map((r,i)=>`<span class="car${r[0]==="*"?" v":r[0]==="^"?" z":""}">${esc(x.toks[i])}${i===x.raw.length-1?x.p:""}<em>${esc(x.ww[i])}</em></span>`).join("")}</div>`;}

/* ============ vocabulary, calendar, topics, grammar extras and exam texts ============ */

/* ---------- vocabulary: [article, word, plural ("" = no plural), English, topic, note?] ---------- */
const VTOPICS=[["essen","Essen und Trinken","food and drink"],["beruf","Berufe","jobs"],["familie","Familie","family"],["wohnung","Wohnung","flat / home"],["stadt","Stadt und Verkehr","town and transport"],["zeit","Zeit","time"],["alltag","Alltag und Kleidung","everyday things and clothes"],["reise","Reise und Freizeit","travel and free time"],["buero","Büro, Schule, Technik","office, school, technology"],["leute","Menschen und Alltagsleben","people and daily life"]];
const VOCAB=[
 ["der","Kaffee","Kaffees","coffee","essen"],["der","Tee","Tees","tea","essen"],["der","Saft","Säfte","juice","essen"],["das","Wasser","","water","essen"],
 ["die","Milch","","milk","essen"],["das","Bier","Biere","beer","essen"],["der","Wein","Weine","wine","essen"],["das","Brot","Brote","bread","essen"],
 ["das","Brötchen","Brötchen","bread roll","essen"],["die","Butter","","butter","essen"],["der","Käse","Käse","cheese","essen"],["die","Wurst","Würste","sausage","essen"],
 ["das","Ei","Eier","egg","essen"],["der","Apfel","Äpfel","apple","essen"],["die","Banane","Bananen","banana","essen"],["die","Tomate","Tomaten","tomato","essen"],
 ["die","Kartoffel","Kartoffeln","potato","essen"],["der","Reis","","rice","essen"],["die","Nudel","Nudeln","noodle / pasta","essen"],["das","Fleisch","","meat","essen"],
 ["der","Fisch","Fische","fish","essen"],["das","Hähnchen","Hähnchen","chicken (food)","essen"],["der","Salat","Salate","salad / lettuce","essen"],["die","Suppe","Suppen","soup","essen"],
 ["der","Kuchen","Kuchen","cake","essen"],["das","Obst","","fruit","essen"],["das","Gemüse","","vegetables","essen"],["der","Zucker","","sugar","essen"],
 ["das","Salz","","salt","essen"],["die","Flasche","Flaschen","bottle","essen"],["die","Tasse","Tassen","cup","essen"],["das","Glas","Gläser","glass","essen"],
 ["die","Rechnung","Rechnungen","bill (in a café)","essen"],["die","Speisekarte","Speisekarten","menu","essen"],["das","Frühstück","Frühstücke","breakfast","essen"],["das","Mittagessen","Mittagessen","lunch","essen"],
 ["das","Abendessen","Abendessen","dinner","essen"],["der","Supermarkt","Supermärkte","supermarket","essen"],["die","Bäckerei","Bäckereien","bakery","essen"],

 ["die","Familie","Familien","family","familie"],["der","Vater","Väter","father","familie"],["die","Mutter","Mütter","mother","familie"],["der","Sohn","Söhne","son","familie"],
 ["die","Tochter","Töchter","daughter","familie"],["der","Bruder","Brüder","brother","familie"],["die","Schwester","Schwestern","sister","familie"],["der","Großvater","Großväter","grandfather","familie"],
 ["die","Großmutter","Großmütter","grandmother","familie"],["der","Opa","Opas","grandpa","familie"],["die","Oma","Omas","grandma","familie"],["der","Onkel","Onkel","uncle","familie"],
 ["die","Tante","Tanten","aunt","familie"],["der","Cousin","Cousins","cousin (m)","familie"],["die","Cousine","Cousinen","cousin (f)","familie"],["das","Kind","Kinder","child","familie"],
 ["das","Baby","Babys","baby","familie"],["der","Mann","Männer","man / husband","familie"],["die","Frau","Frauen","woman / wife","familie"],["der","Partner","Partner","partner (m)","familie"],
 ["die","Partnerin","Partnerinnen","partner (f)","familie"],["der","Enkel","Enkel","grandson","familie"],["die","Enkelin","Enkelinnen","granddaughter","familie"],
 ["die","Eltern","Eltern","parents","familie","Plural only: there is no singular. die Eltern = mother + father."],
 ["die","Geschwister","Geschwister","brothers and sisters (siblings)","familie","Plural only: die Geschwister = all your brothers and sisters."],

 ["die","Wohnung","Wohnungen","flat / apartment","wohnung"],["das","Haus","Häuser","house","wohnung"],["das","Zimmer","Zimmer","room","wohnung"],["das","Wohnzimmer","Wohnzimmer","living room","wohnung"],
 ["das","Schlafzimmer","Schlafzimmer","bedroom","wohnung"],["das","Kinderzimmer","Kinderzimmer","children's room","wohnung"],["das","Arbeitszimmer","Arbeitszimmer","study / home office","wohnung"],["die","Küche","Küchen","kitchen","wohnung"],
 ["das","Bad","Bäder","bathroom","wohnung"],["die","Toilette","Toiletten","toilet","wohnung"],["der","Flur","Flure","hallway","wohnung"],["der","Balkon","Balkone","balcony","wohnung"],
 ["der","Garten","Gärten","garden","wohnung"],["der","Keller","Keller","basement / cellar","wohnung"],["die","Miete","Mieten","rent","wohnung"],["der","Tisch","Tische","table","wohnung"],
 ["der","Stuhl","Stühle","chair","wohnung"],["das","Sofa","Sofas","sofa","wohnung"],["der","Sessel","Sessel","armchair","wohnung"],["der","Schrank","Schränke","cupboard / wardrobe","wohnung"],
 ["das","Bett","Betten","bed","wohnung"],["das","Regal","Regale","shelf","wohnung"],["die","Lampe","Lampen","lamp","wohnung"],["der","Teppich","Teppiche","carpet / rug","wohnung"],
 ["das","Bild","Bilder","picture","wohnung"],["der","Kühlschrank","Kühlschränke","fridge","wohnung"],["der","Herd","Herde","stove / cooker","wohnung"],["die","Waschmaschine","Waschmaschinen","washing machine","wohnung"],
 ["das","Fenster","Fenster","window","wohnung"],["die","Tür","Türen","door","wohnung"],["der","Spiegel","Spiegel","mirror","wohnung"],["die","Dusche","Duschen","shower","wohnung"],

 ["der","Bahnhof","Bahnhöfe","train station","stadt"],["die","Haltestelle","Haltestellen","bus / tram stop","stadt"],["der","Bus","Busse","bus","stadt"],["die","U-Bahn","U-Bahnen","underground / subway","stadt"],
 ["der","Zug","Züge","train","stadt"],["die","Straßenbahn","Straßenbahnen","tram","stadt"],["das","Auto","Autos","car","stadt"],["das","Fahrrad","Fahrräder","bicycle","stadt"],
 ["das","Taxi","Taxis","taxi","stadt"],["der","Flughafen","Flughäfen","airport","stadt"],["die","Post","","post office","stadt"],["die","Bank","Banken","bank","stadt"],
 ["die","Apotheke","Apotheken","pharmacy","stadt"],["das","Krankenhaus","Krankenhäuser","hospital","stadt"],["der","Arzt","Ärzte","doctor (m)","stadt"],["die","Ärztin","Ärztinnen","doctor (f)","stadt"],
 ["das","Kino","Kinos","cinema","stadt"],["das","Museum","Museen","museum","stadt"],["das","Hotel","Hotels","hotel","stadt"],["das","Restaurant","Restaurants","restaurant","stadt"],
 ["der","Park","Parks","park","stadt"],["die","Kirche","Kirchen","church","stadt"],["die","Schule","Schulen","school","stadt"],["der","Markt","Märkte","market","stadt"],
 ["die","Ampel","Ampeln","traffic light","stadt"],["die","Fahrkarte","Fahrkarten","ticket (bus / train)","stadt"],["die","Straße","Straßen","street","stadt"],["die","Stadt","Städte","town / city","stadt"],

 ["der","Tag","Tage","day","zeit"],["die","Woche","Wochen","week","zeit"],["der","Monat","Monate","month","zeit"],["das","Jahr","Jahre","year","zeit"],
 ["die","Stunde","Stunden","hour","zeit"],["die","Minute","Minuten","minute","zeit"],["der","Morgen","Morgen","morning","zeit","Times of day are der … except die Nacht."],["der","Vormittag","Vormittage","late morning","zeit","Times of day are der … except die Nacht."],
 ["der","Mittag","Mittage","noon / midday","zeit","Times of day are der … except die Nacht."],["der","Nachmittag","Nachmittage","afternoon","zeit","Times of day are der … except die Nacht."],["der","Abend","Abende","evening","zeit","Times of day are der … except die Nacht."],["die","Nacht","Nächte","night","zeit","The one exception: die Nacht. All other times of day are der."],
 ["das","Wochenende","Wochenenden","weekend","zeit","das Ende (the end) decides: das Wochenende."],["der","Termin","Termine","appointment","zeit"],["der","Geburtstag","Geburtstage","birthday","zeit","Like all days: der Tag → der Geburtstag."],["der","Urlaub","Urlaube","holiday / vacation","zeit"],
 ["der","Frühling","Frühlinge","spring","zeit","Seasons, months and days are all der."],["der","Sommer","Sommer","summer","zeit","Seasons, months and days are all der."],["der","Herbst","Herbste","autumn / fall","zeit","Seasons, months and days are all der."],["der","Winter","Winter","winter","zeit","Seasons, months and days are all der."],
 ["der","Montag","Montage","Monday","zeit","Days of the week are all der."],["der","Freitag","Freitage","Friday","zeit","Days of the week are all der."],["der","Mai","","May","zeit","Months are all der."],["der","Dezember","Dezember","December","zeit","Months are all der."],

 ["der","Buchhalter","Buchhalter","accountant (m)","beruf"],
 ["die","Buchhalterin","Buchhalterinnen","accountant (f)","beruf"],
 ["der","Projektmanager","Projektmanager","project manager (m)","beruf"],
 ["die","Projektmanagerin","Projektmanagerinnen","project manager (f)","beruf"],
 ["der","Kellner","Kellner","waiter","beruf"],
 ["die","Kellnerin","Kellnerinnen","waitress","beruf"],
 ["der","Architekt","Architekten","architect (m)","beruf"],
 ["die","Architektin","Architektinnen","architect (f)","beruf"],
 ["der","Ingenieur","Ingenieure","engineer (m)","beruf"],
 ["die","Ingenieurin","Ingenieurinnen","engineer (f)","beruf"],
 ["der","Lehrer","Lehrer","teacher (m)","beruf"],
 ["die","Lehrerin","Lehrerinnen","teacher (f)","beruf"],
 ["der","Verkäufer","Verkäufer","salesperson (m)","beruf"],
 ["die","Verkäuferin","Verkäuferinnen","salesperson (f)","beruf"],

 ["der","Kuli","Kulis","pen","alltag"],["das","Heft","Hefte","exercise book","alltag"],["das","Buch","Bücher","book","alltag"],["die","Tasche","Taschen","bag","alltag"],
 ["die","Brille","Brillen","glasses","alltag"],["die","Uhr","Uhren","clock / watch","alltag"],["das","Handy","Handys","mobile phone","alltag"],["der","Schlüssel","Schlüssel","key","alltag"],
 ["der","Ausweis","Ausweise","ID card","alltag"],["das","Geld","","money","alltag"],["die","Kreditkarte","Kreditkarten","credit card","alltag"],["der","Computer","Computer","computer","alltag"],
 ["die","E-Mail","E-Mails","e-mail","alltag"],["die","Zeitung","Zeitungen","newspaper","alltag"],["der","Brief","Briefe","letter","alltag"],["das","Paket","Pakete","parcel","alltag"],
 ["die","Adresse","Adressen","address","alltag"],["die","Telefonnummer","Telefonnummern","phone number","alltag"],["der","Kurs","Kurse","course / class","alltag"],["die","Hausaufgabe","Hausaufgaben","homework","alltag"],
 ["der","Regenschirm","Regenschirme","umbrella","alltag"],["die","Jacke","Jacken","jacket","alltag"],["der","Pullover","Pullover","pullover / jumper","alltag"],["die","Hose","Hosen","trousers","alltag"],
 ["das","Hemd","Hemden","shirt","alltag"],["der","Schuh","Schuhe","shoe","alltag"],["das","Kleid","Kleider","dress","alltag"],["der","Mantel","Mäntel","coat","alltag"],
["der","Ausflug","Ausflüge","trip, excursion","reise"], ["das","Ausland","","abroad","reise","Always with ‘im’ or ‘ins’: im Ausland (abroad), ins Ausland (to another country)."], ["der","Ausländer","Ausländer","foreigner","reise"],
 ["die","Autobahn","Autobahnen","motorway","reise"], ["der","Bahnsteig","Bahnsteige","platform (station)","reise"], ["der","Abflug","Abflüge","departure (flight)","reise"],
 ["das","Gepäck","","luggage","reise"], ["die","Halbpension","","half board (hotel)","reise"], ["die","Führung","Führungen","guided tour","reise"],
 ["das","Reisebüro","Reisebüros","travel agency","reise"], ["der","Reiseführer","Reiseführer","guidebook; tour guide","reise"], ["die","Sehenswürdigkeit","Sehenswürdigkeiten","sight, tourist attraction","reise"],
 ["der","Eintritt","","admission, entrance fee","reise"], ["der","Zoll","Zölle","customs","reise"], ["das","Café","Cafés","café","reise","Loan word ending in a vowel sound: das Café, plural Cafés."],
 ["die","Disco","Discos","disco","reise"], ["der","Kiosk","Kioske","kiosk","reise"], ["das","Schwimmbad","Schwimmbäder","swimming pool","reise"],
 ["das","Meer","Meere","sea","reise"], ["der","Baum","Bäume","tree","reise"], ["die","Blume","Blumen","flower","reise"],
 ["das","Dorf","Dörfer","village","reise"], ["die","Welt","Welten","world","reise"], ["das","Lied","Lieder","song","reise"],
 ["die","Hochzeit","Hochzeiten","wedding","reise"], ["der","Glückwunsch","Glückwünsche","congratulations","reise","Usually: Herzlichen Glückwunsch! (Congratulations!)"], ["der","Verein","Vereine","club, association","reise"],
 ["die","S-Bahn","S-Bahnen","suburban train","reise","Compound: the LAST part decides the article (die Bahn → die S-Bahn)."], ["der","Lkw","Lkws","lorry, truck","reise","Short for der Lastkraftwagen."], ["der","Fahrer","Fahrer","driver","reise"],
 ["die","Anmeldung","Anmeldungen","registration; reception desk","buero"], ["der","Anrufbeantworter","Anrufbeantworter","answering machine","buero"], ["die","Ansage","Ansagen","announcement; recorded message","buero"],
 ["der","Anschluss","Anschlüsse","connection; line","buero"], ["die","Anzeige","Anzeigen","advertisement, notice","buero"], ["der","Arbeitsplatz","Arbeitsplätze","workplace; job","buero"],
 ["die","Auskunft","Auskünfte","information (desk)","buero"], ["die","Durchsage","Durchsagen","announcement (loudspeaker)","buero"], ["der","Drucker","Drucker","printer","buero"],
 ["das","Fax","Faxe","fax","buero"], ["das","Internet","","internet","buero"], ["die","CD","CDs","CD","buero","Abbreviations take the article of the main word: die CD (die Compact Disc)."],
 ["das","Konto","Konten","bank account","buero"], ["der","Bogen","Bögen","sheet (of paper)","buero"], ["das","Ergebnis","Ergebnisse","result","buero"],
 ["der","Fehler","Fehler","mistake, error","buero"], ["das","Gespräch","Gespräche","conversation","buero"], ["die","Lösung","Lösungen","solution; answer","buero"],
 ["das","Papier","Papiere","paper","buero"], ["der","Prospekt","Prospekte","brochure","buero"], ["die","Klasse","Klassen","class","buero"],
 ["der","Schüler","Schüler","pupil (m)","buero"], ["das","Studium","Studien","studies (at university)","buero"], ["der","Unterricht","","lessons, teaching","buero"],
 ["das","Praktikum","Praktika","internship","buero"], ["der","Kugelschreiber","Kugelschreiber","ballpoint pen","buero","Short form: der Kuli."], ["die","Gruppe","Gruppen","group","buero"],
 ["der","Kindergarten","Kindergärten","nursery school","buero"], ["der","Aufzug","Aufzüge","lift, elevator","buero"], ["der","Automat","Automaten","vending machine","buero"],
 ["die","Reparatur","Reparaturen","repair","buero"], ["die","Halle","Hallen","hall","buero"], ["der","Beamte","Beamten","civil servant","leute","Made from an adjective, so the ending changes: ein Verwandter (man) / eine Verwandte (woman)."],
 ["der","Bekannte","Bekannten","acquaintance","leute","Made from an adjective, so the ending changes: ein Verwandter (man) / eine Verwandte (woman)."], ["der","Erwachsene","Erwachsenen","adult","leute","Made from an adjective, so the ending changes: ein Verwandter (man) / eine Verwandte (woman)."], ["der","Jugendliche","Jugendlichen","teenager, young person","leute","Made from an adjective, so the ending changes: ein Verwandter (man) / eine Verwandte (woman)."],
 ["der","Verwandte","Verwandten","relative","leute","Made from an adjective, so the ending changes: ein Verwandter (man) / eine Verwandte (woman)."], ["der","Doktor","Doktoren","doctor (title)","leute"], ["die","Ehefrau","Ehefrauen","wife","leute"],
 ["der","Ehemann","Ehemänner","husband","leute"], ["die","Hausfrau","Hausfrauen","housewife","leute"], ["der","Hausmann","Hausmänner","house husband","leute"],
 ["der","Vermieter","Vermieter","landlord","leute"], ["die","Polizei","","police","leute"], ["die","Heimat","","home, homeland","leute"],
 ["das","Geburtsjahr","Geburtsjahre","year of birth","leute"], ["das","Haar","Haare","hair","leute"], ["das","Leben","","life","leute"],
 ["der","Blick","Blicke","view; look","leute"], ["die","Vorsicht","","caution","leute","Usually: Vorsicht! (Careful!)"], ["die","Vorwahl","Vorwahlen","area code","leute"],["der","Ausgang","Ausgänge","exit","reise"],["der","Eingang","Eingänge","entrance","reise"],["die","Aussage","Aussagen","statement","buero"],["der","Gast","Gäste","guest","leute"],["das","Grad","Grad","degree (temperature)","leute","Used with numbers: 20 Grad (twenty degrees)."],["das","Lokal","Lokale","restaurant, pub","reise"],["die","Mitte","","middle, centre","leute"],["der","Schalter","Schalter","counter, ticket window","buero"],["das","Schild","Schilder","sign","reise"],["das","Wiederhören","","goodbye (on the phone)","leute","Only in: Auf Wiederhören! Said on the phone; face to face you say: Auf Wiedersehen!"],
 ["das","Gewicht","Gewichte","weight","leute"], ["der","Laden","Läden","shop","leute"], ["die","Möbel","Möbel","furniture","wohnung","Plural only: die Möbel (ein Möbelstück = one piece)."],
 ["die","Treppe","Treppen","stairs","wohnung"], ["das","Licht","Lichter","light","wohnung"], ["das","Feuer","Feuer","fire","wohnung"],
 ["die","Birne","Birnen","pear; light bulb","essen"], ["der","Durst","","thirst","essen","Ich habe Durst. (I am thirsty.)"], ["die","Lebensmittel","Lebensmittel","groceries, food","essen","Plural only: die Lebensmittel."],
 ["das","Öl","Öle","oil","essen"], ["die","Pommes frites","Pommes frites","chips, french fries","essen","Plural only: die Pommes frites (often just die Pommes)."], ["der","Schinken","Schinken","ham","essen"]
].map(([a,w,p,en,t,note])=>({a,w,p,en,t,note}));
/* Verbs, adjectives and little words from the official Goethe A1 list: [German, English, kind (v verb, vs separable verb, a other), example, example in English] */
const WLISTE=[
 ["abgeben","to hand in, to drop off","vs","Ich gebe den Brief ab.","I hand in the letter."],
 ["abholen","to pick up, to collect","vs","Ich hole dich um acht ab.","I pick you up at eight."],
 ["anbieten","to offer","vs","Er bietet mir einen Kaffee an.","He offers me a coffee."],
 ["anklicken","to click on","vs","Klicken Sie das Feld an.","Click on the box."],
 ["ankommen","to arrive","vs","Der Zug kommt um zehn Uhr an.","The train arrives at ten o'clock."],
 ["ankreuzen","to tick, to mark with a cross","vs","Bitte kreuzen Sie an: a, b oder c.","Please tick: a, b or c."],
 ["anmachen","to switch on, to turn on","vs","Mach bitte das Licht an.","Please switch on the light."],
 ["sich anmelden","to register, to sign up","vs","Ich melde mich für den Kurs an.","I sign up for the course."],
 ["sich anziehen","to get dressed, to put on","vs","Ich ziehe mich schnell an.","I get dressed quickly."],
 ["aufhören","to stop, to finish","vs","Der Kurs hört um 12 Uhr auf.","The course finishes at twelve."],
 ["ausmachen","to switch off, to turn off","vs","Mach bitte den Fernseher aus.","Please turn off the TV."],
 ["aussehen","to look (like)","vs","Du siehst müde aus.","You look tired."],
 ["aussteigen","to get off (bus, train)","vs","Hier müssen Sie aussteigen.","You have to get off here."],
 ["sich ausziehen","to get undressed, to take off","vs","Ich ziehe die Schuhe aus.","I take off my shoes."],
 ["einsteigen","to get on (bus, train)","vs","Bitte einsteigen!","All aboard, please!"],
 ["abfliegen","to take off, to depart (plane)","vs","Das Flugzeug fliegt um 7 Uhr ab.","The plane takes off at seven."],
 ["mitmachen","to join in, to take part","vs","Machst du beim Kurs mit?","Are you taking part in the course?"],
 ["mitnehmen","to take along","vs","Nehmen Sie einen Ausweis mit.","Take an ID card with you."],
 ["umziehen","to move (house)","vs","Wir ziehen nach München um.","We are moving to Munich."],
 ["kennenlernen","to get to know, to meet","vs","Ich lerne neue Leute kennen.","I get to know new people."],
 ["baden","to bathe, to swim","v","Im Sommer baden wir im See.","In summer we swim in the lake."],
 ["bekommen","to get, to receive","v","Ich bekomme ein Paket.","I am getting a parcel."],
 ["besichtigen","to visit (a sight), to look round","v","Wir besichtigen das Schloss.","We visit the castle."],
 ["dauern","to last, to take (time)","v","Der Film dauert zwei Stunden.","The film lasts two hours."],
 ["drucken","to print","v","Ich drucke die Karte.","I print the ticket."],
 ["drücken","to press, to push","v","Drücken Sie die Taste.","Press the button."],
 ["empfehlen","to recommend","v","Ich empfehle das Hotel.","I recommend the hotel."],
 ["enden","to end","v","Der Kurs endet im Mai.","The course ends in May."],
 ["erklären","to explain","v","Können Sie das bitte erklären?","Can you explain that, please?"],
 ["erzählen","to tell (a story)","v","Erzähl mir von deiner Familie.","Tell me about your family."],
 ["feiern","to celebrate","v","Wir feiern meinen Geburtstag.","We celebrate my birthday."],
 ["fliegen","to fly","v","Ich fliege nach Berlin.","I fly to Berlin."],
 ["gefallen","to please, to like (it pleases me)","v","Die Wohnung gefällt mir.","I like the flat (it pleases me)."],
 ["gehören","to belong to","v","Das Handy gehört mir.","The phone belongs to me."],
 ["gewinnen","to win","v","Wer gewinnt das Spiel?","Who wins the game?"],
 ["glauben","to believe, to think","v","Ich glaube, das ist richtig.","I think that is right."],
 ["gratulieren","to congratulate","v","Ich gratuliere dir zum Geburtstag.","I congratulate you on your birthday."],
 ["grillen","to barbecue, to grill","v","Am Wochenende grillen wir.","At the weekend we have a barbecue."],
 ["heiraten","to marry, to get married","v","Sie heiraten im Juni.","They are getting married in June."],
 ["holen","to fetch, to get","v","Ich hole Brötchen.","I fetch bread rolls."],
 ["kennen","to know (a person, a place)","v","Kennst du Anna?","Do you know Anna?"],
 ["lachen","to laugh","v","Wir lachen viel.","We laugh a lot."],
 ["leben","to live (be alive)","v","Meine Eltern leben in Malaysia.","My parents live in Malaysia."],
 ["legen","to lay, to put (flat)","v","Ich lege das Buch auf den Tisch.","I put the book on the table."],
 ["reparieren","to repair","v","Er repariert mein Fahrrad.","He repairs my bicycle."],
 ["riechen","to smell","v","Das Essen riecht gut.","The food smells good."],
 ["schließen","to close","v","Das Geschäft schließt um 18 Uhr.","The shop closes at 6 pm."],
 ["studieren","to study (at university)","v","Sie studiert Medizin.","She studies medicine."],
 ["telefonieren","to phone, to make a call","v","Ich telefoniere mit meiner Mutter.","I am on the phone with my mother."],
 ["übernachten","to stay overnight","v","Wir übernachten im Hotel.","We stay overnight in a hotel."],
 ["überweisen","to transfer (money)","v","Ich überweise die Miete.","I transfer the rent."],
 ["unterschreiben","to sign","v","Bitte unterschreiben Sie hier.","Please sign here."],
 ["verdienen","to earn","v","Er verdient gut.","He earns well."],
 ["sich waschen","to wash (oneself)","v","Ich wasche mich am Morgen.","I wash in the morning."],
 ["sich kümmern","to take care (of)","v","Ich kümmere mich um die Kinder.","I take care of the children."],
 ["werden","to become, to get","v","Es wird kalt.","It is getting cold."],
 ["wissen","to know (a fact)","v","Ich weiß es nicht.","I don't know."],
 ["arbeitslos","unemployed","a","Er ist seit Mai arbeitslos.","He has been unemployed since May."],
 ["ausländisch","foreign","a","Das ist ein ausländischer Name.","That is a foreign name."],
 ["automatisch","automatic","a","Die Tür geht automatisch auf.","The door opens automatically."],
 ["beide","both","a","Beide Kinder sind in der Schule.","Both children are at school."],
 ["bekannt","well-known","a","Das ist ein bekanntes Hotel.","That is a well-known hotel."],
 ["besetzt","occupied; engaged (phone)","a","Die Toilette ist besetzt.","The toilet is occupied."],
 ["bitter","bitter","a","Der Kaffee ist bitter.","The coffee is bitter."],
 ["böse","angry; bad, evil","a","Bist du böse auf mich?","Are you angry with me?"],
 ["breit","wide, broad","a","Der Tisch ist zwei Meter breit.","The table is two metres wide."],
 ["circa","about, approximately","a","Die Fahrt dauert circa zehn Minuten.","The trip takes about ten minutes."],
 ["daneben","next to it, beside","a","Das Hotel ist daneben.","The hotel is next to it."],
 ["draußen","outside","a","Wir sitzen draußen.","We are sitting outside."],
 ["durch","through","a","Gehen Sie durch den Park.","Go through the park."],
 ["eilig","hurried, urgent","a","Ich habe es eilig.","I am in a hurry."],
 ["fremd","strange, foreign, unknown","a","Ich bin hier fremd.","I am a stranger here."],
 ["gestorben","dead, died","a","Mein Opa ist gestorben.","My grandpa has died."],
 ["gültig","valid","a","Der Ausweis ist gültig.","The ID card is valid."],
 ["günstig","cheap, good value","a","Das Hotel ist günstig.","The hotel is good value."],
 ["hoch","high","a","Der Turm ist sehr hoch.","The tower is very high."],
 ["ihm","to him","a","Ich gebe ihm das Buch.","I give him the book."],
 ["ihn","him","a","Ich sehe ihn.","I see him."],
 ["international","international","a","Das ist ein internationaler Kurs.","That is an international course."],
 ["kaputt","broken","a","Mein Handy ist kaputt.","My phone is broken."],
 ["klar","clear; of course","a","Klar, das mache ich.","Of course, I'll do that."],
 ["kulturell","cultural","a","Das ist ein kulturelles Angebot.","That is a cultural offer."],
 ["lustig","funny","a","Der Film ist lustig.","The film is funny."],
 ["möglich","possible","a","Ist das möglich?","Is that possible?"],
 ["nie","never","a","Ich esse nie Fleisch.","I never eat meat."],
 ["ruhig","quiet, calm","a","Die Wohnung ist ruhig.","The flat is quiet."],
 ["selbstständig","self-employed; independent","a","Sie ist selbstständig.","She is self-employed."],
 ["sofort","immediately, at once","a","Ich komme sofort.","I'm coming right away."],
 ["tot","dead","a","Die Blume ist tot.","The flower is dead."],
 ["unter","under, below","a","Die Katze ist unter dem Tisch.","The cat is under the table."],
 ["verboten","forbidden","a","Rauchen ist hier verboten.","Smoking is forbidden here."],
 ["vielleicht","perhaps, maybe","a","Vielleicht komme ich morgen.","Maybe I'll come tomorrow."],
 ["wenig","little, not much","a","Ich habe wenig Zeit.","I have little time."],
 ["wichtig","important","a","Das ist sehr wichtig.","That is very important."],
 ["willkommen","welcome","a","Herzlich willkommen!","A warm welcome!"],
 ["wunderbar","wonderful","a","Das Wetter ist wunderbar.","The weather is wonderful."],
 ["zurzeit","at the moment","a","Ich arbeite zurzeit in München.","I work in Munich at the moment."],
 ["zufrieden","satisfied, happy with","a","Ich bin mit dem Kurs zufrieden.","I am happy with the course."],
 ["ausfüllen","to fill in","vs","Bitte füllen Sie das Formular aus.","Please fill in the form."],
 ["bestellen","to order","v","Ich bestelle einen Tee.","I order a tea."],
 ["bezahlen","to pay","v","Ich bezahle mit Karte.","I pay by card."],
 ["bleiben","to stay, to remain","v","Wir bleiben zu Hause.","We are staying at home."],
 ["erlauben","to allow","v","Hier ist Rauchen nicht erlaubt.","Smoking is not allowed here."],
 ["geben","to give; es gibt = there is","v","Es gibt hier ein Café.","There is a café here."],
 ["sagen","to say, to tell","v","Was sagen Sie?","What do you say?"],
 ["scheinen","to shine; to seem","v","Die Sonne scheint.","The sun is shining."],
 ["schicken","to send","v","Ich schicke dir eine E-Mail.","I send you an e-mail."],
 ["tun","to do","v","Was kann ich für Sie tun?","What can I do for you?"],
 ["weh tun","to hurt","vs","Mein Kopf tut weh.","My head hurts."],
 ["allein","alone","a","Ich wohne allein.","I live alone."],
 ["bar","in cash","a","Ich zahle bar.","I pay in cash."],
 ["einmal","once; one time","a","Einmal Kaffee, bitte.","One coffee, please."],
 ["geboren","born","a","Ich bin in Kuala Lumpur geboren.","I was born in Kuala Lumpur."],
 ["gegen","against; around (time)","a","Ich komme gegen acht Uhr.","I come at around eight o'clock."],
 ["pünktlich","on time, punctual","a","Der Zug ist pünktlich.","The train is on time."],
 ["zwischen","between","a","Das Café ist zwischen Bank und Post.","The café is between the bank and the post office."]
];
function vocabNote(n){
  if(n.note) return n.note;
  return ruleOrCompound(n);
}
/* article rule for a noun: compound hint first, otherwise the general rule / colour tip */
function ruleOrCompound(n){
  const parts=n.w.match(/^(.+?)(zimmer|schrank|karte|essen|haus|nummer|aufgabe|schirm|maschine|bahn|hafen|stelle|tag|land|büro|platz|plan|wahl|jahr|frau|mann)$/i);
  if(parts&&parts[1].length>1) return `Compound noun: the LAST part decides the article (${n.a} …${parts[2].toLowerCase()}).`;
  return ruleFor(n);
}

/* ---------- calendar ---------- */
const DAYS=[["Montag","MOHN-tahk","Monday","Mo"],["Dienstag","DEENS-tahk","Tuesday","Di"],["Mittwoch","MIT-vokh","Wednesday","Mi"],["Donnerstag","DON-ers-tahk","Thursday","Do"],["Freitag","FRY-tahk","Friday","Fr"],["Samstag","ZAMS-tahk","Saturday","Sa"],["Sonntag","ZON-tahk","Sunday","So"]];
const MONTHS=[["Januar","YAH-noo-ahr","January"],["Februar","FAY-broo-ahr","February"],["März","mairts","March"],["April","ah-PRIL","April"],["Mai","my","May"],["Juni","YOO-nee","June"],["Juli","YOO-lee","July"],["August","ow-GOOST","August"],["September","zep-TEM-ber","September"],["Oktober","ok-TOH-ber","October"],["November","no-VEM-ber","November"],["Dezember","day-TSEM-ber","December"]];
const SEASONS=[["Frühling","FRUE-ling","spring","März – Mai"],["Sommer","ZOM-er","summer","Juni – August"],["Herbst","hairpst","autumn","September – November"],["Winter","VIN-ter","winter","Dezember – Februar"]];
const DAYTIMES=[["Morgen","MOR-gen","morning","morgens","6–10"],["Vormittag","FOR-mit-tahk","late morning","vormittags","10–12"],["Mittag","MIT-tahk","noon","mittags","12–14"],["Nachmittag","NAKH-mit-tahk","afternoon","nachmittags","14–18"],["Abend","AH-bent","evening","abends","18–22"],["Nacht","nakht","night","nachts","22–6"]];
const ORD_IRR={1:["erst","EHRST"],3:["dritt","DRIT"],7:["siebt","ZEEPT"],8:["acht","AKHT"]};
function ordBase(n){ if(ORD_IRR[n]) return ORD_IRR[n][0]; return num(n)[0]+(n<20?"t":"st"); }
function ordPron(n){ if(ORD_IRR[n]) return ORD_IRR[n][1]; return num(n)[1]+(n<20?"t":"st"); }
const ordNom=n=>ordBase(n)+"e", ordDat=n=>ordBase(n)+"en";
function ordWrong(n){ // plausible mistakes for distractors
  const w=num(n)[0], s=new Set();
  s.add(w+(n<20?"st":"t")); if(n===1) s.add("einst"); if(n===3) s.add("dreit"); if(n===7) s.add("siebent"); if(n===8) s.add("achtt");
  if(n===1) s.add("einsst"); if(n>20&&n%10===1) s.add(w.replace(/^ein/,"erst")+"st");
  s.delete(ordBase(n)); return [...s];
}
/* [sentence with ___, English, options (first = right), rule] */
const ZEITPRAEP=[
 ["Der Kurs ist ___ Montag.","The course is on Monday.",["am","um","im"],"<b>am</b> + day."],
 ["Ich stehe ___ 7 Uhr auf.","I get up at 7 (sieben, ZEE-ben) o'clock.",["um","am","im"],"<b>um</b> + clock time."],
 ["Mein Geburtstag ist ___ Mai.","My birthday is in May.",["im","am","um"],"<b>im</b> + month."],
 ["___ Sommer fahre ich nach Italien.","In summer I go to Italy.",["Im","Am","Um"],"<b>im</b> + season."],
 ["Was machst du ___ Wochenende?","What are you doing at the weekend?",["am","im","um"],"<b>am</b> Wochenende (like a day)."],
 ["___ Abend sehe ich fern.","In the evening I watch TV.",["Am","Im","Um"],"<b>am</b> + time of day: am Morgen, am Abend …"],
 ["Ich schlafe ___ der Nacht.","I sleep at night.",["in","am","um"],"Exception: <b>in der Nacht</b> (not am)."],
 ["Ich arbeite ___ 9 ___ 17 Uhr.","I work from 9 (neun, noyn) to 17 (siebzehn, ZEEP-tsayn) o'clock.",["von … bis","um … bis","am … bis"],"<b>von … bis</b> = from … to."],
 ["Der Supermarkt ist ___ Montag ___ Samstag geöffnet.","The supermarket is open from Monday to Saturday.",["von … bis","am … am","im … bis"],"<b>von</b> Montag <b>bis</b> Samstag."],
 ["Wir haben ___ 3. Mai Urlaub.","We are on holiday from 3 May (dritten, DRIT-en).",["ab","um","im"],"<b>ab</b> = from … on (start, no end)."],
 ["Der Termin ist ___ 3. Juni.","The appointment is on 3 June (am dritten Juni, DRIT-en).",["am","im","um"],"<b>am</b> + date: am dritten Juni."],
 ["Der Film beginnt ___ halb acht.","The film starts at 7:30 (halb acht, halp akht).",["um","am","im"],"<b>um</b> + clock time. halb acht = 7:30!"],
 ["___ Nachmittag gehe ich spazieren.","In the afternoon I go for a walk.",["Am","Im","Um"],"<b>am</b> Nachmittag."],
 ["___ Winter ist es kalt.","In winter it is cold.",["Im","Am","Um"],"<b>im</b> Winter."],
 ["Ich habe ___ Dezember Geburtstag.","My birthday is in December.",["im","am","um"],"<b>im</b> + month."],
 ["___ Freitag gehen wir ins Kino.","On Friday we go to the cinema.",["Am","Im","Um"],"<b>am</b> Freitag."],
 ["Ich lerne ___ zwei Jahren Deutsch.","I have been learning German for two (zwei, tsvy) years.",["seit","um","am"],"<b>seit</b> = since / for (started in the past, still going)."],
 ["Ich fahre ___ zwei Wochen nach Spanien.","I'm going to Spain for two (zwei, tsvy) weeks.",["für","seit","um"],"<b>für</b> = for (a planned length of time)."],
 ["___ ist der Termin? – Am Dienstag.","When is the appointment? – On Tuesday.",["Wann","Wie lange","Wie spät"],"<b>Wann?</b> = when?"],
 ["___ dauert der Kurs? – Zwei Stunden.","How long does the course last? – Two (zwei, tsvy) hours.",["Wie lange","Wann","Wie viel Uhr"],"<b>Wie lange?</b> = how long?"],
 ["Um ___ Uhr kommst du? – Um 6.","At what time are you coming? – At 6 (sechs, zeks).",["wie viel","wann","wie lange"],"<b>Um wie viel Uhr?</b> = at what time?"],
 ["Ich habe ___ Mittag eine Pause.","I have a break at noon.",["am","um","im"],"<b>am</b> Mittag (time of day)."],
 ["Das Geschäft ist ___ 20 Uhr offen.","The shop is open until 20 (zwanzig, TSVAN-tsikh) o'clock.",["bis","von","am"],"<b>bis</b> = until."],
 ["Wir treffen uns ___ Viertel nach drei.","We meet at quarter past three (drei, dry).",["um","am","im"],"<b>um</b> + clock time."],
 ["___ Frühling ist es oft schön.","In spring it is often nice.",["Im","Am","Um"],"<b>im</b> + season."],
 ["___ Morgen trinke ich Kaffee.","In the morning I drink coffee.",["Am","Im","In"],"<b>am</b> Morgen."]
];

/* ---------- food: café and shopping. [situation / question, English, right reply, wrong, wrong, note] ---------- */
const CAFE=[
 ["Was möchten Sie trinken?","What would you like to drink?","Einen Kaffee, bitte.","Ein Kaffee, bitte.","Kaffee möchten bitte.","der Kaffee → Akkusativ: <b>einen</b> Kaffee."],
 ["Was nehmen Sie?","What will you have?","Ich nehme die Suppe.","Ich nehme der Suppe.","Ich nimmst die Suppe.","nehmen: ich <b>nehme</b>. die Suppe stays die."],
 ["Möchten Sie noch etwas?","Would you like anything else?","Nein, danke. Das ist alles.","Ja, danke. Das ist alles.","Nein, bitte. Ich möchte.","<b>Das ist alles.</b> = That's all."],
 ["Zusammen oder getrennt?","Together or separately? (paying)","Getrennt, bitte.","Ja, gern.","Zwei Kaffee.","The waiter asks if you pay together (zusammen) or separately (getrennt)."],
 ["Das macht 7,50 €.","That comes to 7.50 € (sieben Euro fünfzig, ZEE-ben OY-ro FUENF-tsikh).","Hier, bitte. Stimmt so.","Danke, ich nehme 7,50 €.","Das ist teuer, danke.","<b>Stimmt so.</b> = Keep the change (tip)."],
 ["Kann ich mit Karte zahlen?","Can I pay by card?","Ja, natürlich.","Ja, ich zahle.","Nein, mit Karte.","The waiter answers: <b>Ja, natürlich.</b> = Yes, of course."],
 ["Die Rechnung, bitte!","The bill, please!","(You ask for the bill.)","(You order a drink.)","(You say hello.)","<b>Die Rechnung, bitte!</b> or <b>Zahlen, bitte!</b>"],
 ["Was kostet ein Kilo Äpfel?","How much does a kilo of apples cost?","2,99 € das Kilo.","Ein Kilo, bitte.","Ich mag Äpfel.","2,99 € = zwei Euro neunundneunzig (tsvy OY-ro NOYN-oont-NOYN-tsikh)."],
 ["Ich hätte gern 500 Gramm Käse.","I would like 500 grams (fünfhundert Gramm, FUENF-hoon-dert) of cheese.","Gern. Noch etwas?","Ja, das ist Käse.","Nein, ich habe Käse.","<b>Ich hätte gern …</b> = I would like … (very polite)."],
 ["Haben Sie Brötchen?","Do you have bread rolls?","Ja, wie viele möchten Sie?","Ja, ich habe Hunger.","Nein, ich bin Brötchen.","<b>Wie viele?</b> = how many (things you can count)."],
 ["Wie viele Brötchen möchten Sie?","How many bread rolls would you like?","Vier, bitte.","Vier Euro, bitte.","Am Montag.","vier (feer) = 4."],
 ["Wo finde ich die Milch?","Where do I find the milk?","Da hinten, links.","Ja, ich trinke Milch.","Die Milch ist weiß.","Answer a <b>Wo?</b> question with a place."],
 ["Schmeckt es Ihnen?","Do you like the food? (lit. Does it taste to you?)","Ja, sehr gut, danke.","Ja, ich schmecke.","Nein, ich esse.","<b>Es schmeckt gut.</b> = It tastes good."],
 ["Was isst du gern?","What do you like eating?","Ich esse gern Fisch.","Ich gern esse Fisch.","Ich isst gern Fisch.","essen: ich <b>esse</b>, du <b>isst</b>. gern after the verb."],
 ["Magst du Käse?","Do you like cheese?","Nein, ich mag keinen Käse.","Nein, ich mag nicht Käse.","Nein, ich magst Käse.","mögen: ich <b>mag</b>. No article → <b>kein</b>: keinen Käse (der)."],
 ["Was trinkst du zum Frühstück?","What do you drink for breakfast?","Ich trinke Tee mit Milch.","Ich trinkst Tee.","Zum Frühstück esse.","trinken: ich <b>trinke</b>."],
 ["Ein Tisch für zwei Personen, bitte.","A table for two (zwei, tsvy) people, please.","Gern. Hier am Fenster?","Zwei Euro, bitte.","Ich bin zwei.","The waiter offers a table."],
 ["Was kostet der Kuchen?","How much does the cake cost?","3,20 € das Stück.","Der Kuchen ist lecker.","Ja, ich esse Kuchen.","3,20 € = drei Euro zwanzig (dry OY-ro TSVAN-tsikh). <b>das Stück</b> = per piece."],
 ["Ich brauche eine Flasche Wasser.","I need a bottle of water.","Die Getränke sind da vorne.","Ja, ich brauche.","Eine Flasche, danke.","<b>eine Flasche</b> Wasser = a bottle of water (no 'of' in German)."],
 ["Möchtest du ein Glas Wein?","Would you like a glass of wine?","Nein danke, lieber ein Wasser.","Nein, ich möchte Glas.","Ja, ich bin Wein.","<b>lieber</b> = rather. A polite way to say no and choose something else."],
 ["Guten Appetit!","Enjoy your meal!","Danke, gleichfalls!","Danke, ich bin satt.","Guten Morgen!","<b>gleichfalls</b> = you too."],
 ["Haben Sie einen Tisch frei?","Do you have a free table?","Ja, bitte kommen Sie.","Ja, einen Tisch.","Nein, ich habe Tisch.","der Tisch → <b>einen</b> Tisch (Akkusativ)."]
];
const SHOPVERBS=[["nehme","take"],["möchte","would like"],["kaufe","buy"],["brauche","need"],["suche","am looking for"],["habe","have"]];

/* ---------- family riddles: [question, English, right, wrong, wrong] ---------- */
const FAMQ=[
 ["Die Mutter von meiner Mutter ist meine ___.","My mother's mother is my …","Großmutter","Tante","Schwester"],
 ["Der Vater von meinem Vater ist mein ___.","My father's father is my …","Großvater","Onkel","Bruder"],
 ["Der Bruder von meiner Mutter ist mein ___.","My mother's brother is my …","Onkel","Großvater","Cousin"],
 ["Die Schwester von meinem Vater ist meine ___.","My father's sister is my …","Tante","Cousine","Oma"],
 ["Der Sohn von meiner Tante ist mein ___.","My aunt's son is my …","Cousin","Bruder","Onkel"],
 ["Die Tochter von meinem Onkel ist meine ___.","My uncle's daughter is my …","Cousine","Schwester","Tante"],
 ["Meine Mutter und mein Vater sind meine ___.","My mother and my father are my …","Eltern","Geschwister","Kinder"],
 ["Mein Bruder und meine Schwester sind meine ___.","My brother and my sister are my …","Geschwister","Eltern","Großeltern"],
 ["Der Sohn von meinem Sohn ist mein ___.","My son's son is my …","Enkel","Neffe","Bruder"],
 ["Die andere Tochter von meinen Eltern ist meine ___.","My parents' other daughter is my …","Schwester","Tochter","Tante"],
 ["Ich bin die Mutter. Mein Kind ist ein Junge. Er ist mein ___.","I am the mother. My child is a boy. He is my …","Sohn","Bruder","Vater"],
 ["Ich bin der Vater. Mein Kind ist ein Mädchen. Sie ist meine ___.","I am the father. My child is a girl. She is my …","Tochter","Schwester","Mutter"],
 ["Mein Opa und meine Oma sind meine ___.","My grandpa and my grandma are my …","Großeltern","Eltern","Geschwister"],
 ["Ich bin verheiratet. Mein Mann und ich haben zwei ___.","I am married. My husband and I have two (zwei, tsvy) …","Kinder","Kind","Eltern"],
 ["Der Mann von meiner Tante ist mein ___.","My aunt's husband is my …","Onkel","Großvater","Cousin"],
 ["Mein Vater ist der ___ von meinem Opa.","My father is my grandpa's …","Sohn","Bruder","Enkel"],
 ["Meine Mutter ist die ___ von meiner Oma.","My mother is my grandma's …","Tochter","Schwester","Tante"],
 ["Ich habe keine Geschwister. Ich bin ein ___.","I have no brothers or sisters. I am an only child.","Einzelkind","Enkel","Baby"],
 ["Ich bin nicht verheiratet. Ich bin ___.","I am not married. I am …","ledig","geschieden","verheiratet"],
 ["Ich war verheiratet, jetzt nicht mehr. Ich bin ___.","I was married, not any more. I am …","geschieden","ledig","verheiratet"],
 ["Die Tochter von meiner Schwester ist meine ___.","My sister's daughter is my …","Nichte","Cousine","Enkelin"],
 ["Der Sohn von meinem Bruder ist mein ___.","My brother's son is my …","Neffe","Cousin","Enkel"]
];

/* ---------- countries: [country, article in 'aus …' ("" = none), language, masculine, feminine, English, pron] ---------- */
const COUNTRIES=[
 ["Deutschland","","Deutsch","Deutscher","Deutsche","Germany","DOYTCH-lant"],["Österreich","","Deutsch","Österreicher","Österreicherin","Austria","OE-ster-rykh"],
 ["die Schweiz","der","Deutsch, Französisch, Italienisch","Schweizer","Schweizerin","Switzerland","shvyts"],["Frankreich","","Französisch","Franzose","Französin","France","FRANK-rykh"],
 ["Italien","","Italienisch","Italiener","Italienerin","Italy","ee-TAH-lee-en"],["Spanien","","Spanisch","Spanier","Spanierin","Spain","SHPAH-nee-en"],
 ["England","","Englisch","Engländer","Engländerin","England","ENG-lant"],["Polen","","Polnisch","Pole","Polin","Poland","POH-len"],
 ["die Türkei","der","Türkisch","Türke","Türkin","Turkey","tuer-KY"],["Griechenland","","Griechisch","Grieche","Griechin","Greece","GREE-khen-lant"],
 ["Russland","","Russisch","Russe","Russin","Russia","ROOS-lant"],["die Ukraine","der","Ukrainisch","Ukrainer","Ukrainerin","Ukraine","oo-kra-EE-nuh"],
 ["China","","Chinesisch","Chinese","Chinesin","China","KHEE-nah"],["Japan","","Japanisch","Japaner","Japanerin","Japan","YAH-pan"],
 ["Indien","","Hindi, Englisch","Inder","Inderin","India","IN-dee-en"],["Malaysia","","Malaiisch","Malaysier","Malaysierin","Malaysia","ma-LY-zee-ah"],
 ["Vietnam","","Vietnamesisch","Vietnamese","Vietnamesin","Vietnam","vee-et-NAM"],["die USA","den","Englisch","Amerikaner","Amerikanerin","the USA","oo-ess-AH"],
 ["Brasilien","","Portugiesisch","Brasilianer","Brasilianerin","Brazil","bra-ZEE-lee-en"],["Mexiko","","Spanisch","Mexikaner","Mexikanerin","Mexico","MEK-see-ko"],
 ["der Iran","dem","Persisch","Iraner","Iranerin","Iran","ee-RAHN"],["Ägypten","","Arabisch","Ägypter","Ägypterin","Egypt","ae-GUEP-ten"]
];
const COLORS=[["rot","red","#d33"],["blau","blue","#2a5bd7"],["grün","green","#2b9a4b"],["gelb","yellow","#f2c500"],["schwarz","black","#111"],["weiß","white","#fff"],["grau","grey","#888"],["braun","brown","#8a5a2b"],["orange","orange","#f28c28"],["lila","purple","#8e44ad"],["rosa","pink","#f4a6c0"],["hellblau","light blue","#8ec5ff"],["dunkelblau","dark blue","#13306b"],["dunkelgrün","dark green","#1d5c2f"]];
const ADJ_PAIRS=[["groß","big / tall","klein","small"],["neu","new","alt","old"],["teuer","expensive","billig","cheap"],["hell","bright / light","dunkel","dark"],["schön","beautiful / nice","hässlich","ugly"],["laut","loud / noisy","leise","quiet"],["warm","warm","kalt","cold"],["lang","long","kurz","short"],["schnell","fast","langsam","slow"],["gut","good","schlecht","bad"],["voll","full","leer","empty"],["jung","young","alt","old (person)"],["richtig","right","falsch","wrong"],["früh","early","spät","late"],["offen","open","geschlossen","closed"],["leicht","easy / light","schwer","difficult / heavy"]];
/* [sentence, English, right, wrong, wrong, note] */
const ZU=[
 ["Die Wohnung kostet 2.000 € im Monat. Sie ist ___.","The flat costs 2,000 € (zweitausend, TSVY-tow-zent) a month. It is …","zu teuer","sehr billig","zu klein und billig","<b>zu</b> + adjective = too … (a problem): zu teuer = too expensive."],
 ["Das Zimmer hat nur 8 m². Es ist ___.","The room has only 8 m² (acht Quadratmeter, akht kvah-DRAHT-may-ter). It is …","zu klein","zu groß","sehr groß","<b>zu klein</b> = too small."],
 ["Ich kann nichts sehen. Das Zimmer ist ___.","I can't see anything. The room is …","zu dunkel","sehr hell","zu hell","<b>dunkel</b> = dark, <b>hell</b> = bright."],
 ["Die Musik ist ___. Ich kann nicht schlafen.","The music is … I can't sleep.","zu laut","sehr leise","zu leise","<b>laut</b> = loud, <b>leise</b> = quiet."],
 ["Die Suppe ist ___. Ich kann sie nicht essen.","The soup is … I can't eat it.","zu heiß","sehr gut","lecker","<b>zu heiß</b> = too hot."],
 ["Die Wohnung ist hell und groß. Sie ist ___ schön!","The flat is bright and big. It is … nice!","sehr","zu","nicht","<b>sehr</b> = very (positive). <b>zu</b> = too (negative)."],
 ["Der Pullover ist ___. Ich brauche Größe L.","The pullover is … I need size L.","zu klein","zu groß","sehr groß","<b>zu klein</b>: you need a bigger size."],
 ["Das Sofa ist ___ alt. Es ist von 1970.","The sofa is … old. It is from 1970 (neunzehnhundertsiebzig, NOYN-tsayn-hoon-dert-ZEEP-tsikh).","sehr","zu","nicht","<b>sehr</b> alt = very old (just a fact)."]
];

/* ---------- possessives ---------- */
const POSS=[["ich","mein","my"],["du","dein","your (friend)"],["er","sein","his"],["sie","ihr","her"],["es","sein","its"],["wir","unser","our"],["ihr","euer","your (group)"],["sie (Plural)","ihr","their"],["Sie","Ihr","your (formal)"]];
const POSSN=[["der","Bruder","brother"],["die","Schwester","sister"],["das","Kind","child"],["die","Eltern","parents",1],["der","Vater","father"],["die","Mutter","mother"],["das","Handy","phone"],["der","Schlüssel","key"],["die","Tasche","bag"],["das","Auto","car"],["die","Wohnung","flat"],["der","Freund","friend (m)"],["die","Freundin","friend (f)"],["das","Zimmer","room"],["die","Kinder","children",1],["die","Adresse","address"],["der","Name","name"],["die","Telefonnummer","phone number"]];
function possForm(base,art,pl,acc){ const b=base==="euer"?"eur":base; if(pl||art==="die") return b+"e"; if(art==="der"&&acc) return b+"en"; return base; }

/* ---------- war / hatte ---------- */
const PRAET={sein:["war","warst","war","waren","wart","waren"],haben:["hatte","hattest","hatte","hatten","hattet","hatten"]};
const PERS6=[["ich","I"],["du","you"],["er / sie / es","he / she / it"],["wir","we"],["ihr","you (group)"],["sie / Sie","they / you (formal)"]];
/* [sentence with ___, English, right, wrong, wrong, note] */
const WARHATTE=[
 ["Gestern ___ ich krank.","Yesterday I was ill.","war","hatte","bin","sein → <b>ich war</b>. Gestern = yesterday."],
 ["Letzte Woche ___ ich keine Zeit.","Last week I had no time.","hatte","war","habe","haben → <b>ich hatte</b>."],
 ["Wo ___ du am Wochenende?","Where were you at the weekend?","warst","hattest","wart","du → <b>warst</b> (-st, like every du form)."],
 ["___ ihr gestern im Kino?","Were you (all) at the cinema yesterday?","Wart","Warst","Waren","ihr → <b>wart</b>."],
 ["Wir ___ im Urlaub in Spanien.","We were on holiday in Spain.","waren","war","hatten","wir → <b>waren</b>."],
 ["Mein Vater ___ früher ein Auto.","My father had a car in the past.","hatte","hat","war","er → <b>hatte</b>. früher = in the past."],
 ["Das Wetter ___ schön.","The weather was nice.","war","hatte","waren","es → <b>war</b>."],
 ["___ du Hunger?","Were you hungry? (lit. Had you hunger?)","Hattest","Warst","Hatte","German: Hunger <b>haben</b> → du <b>hattest</b> Hunger."],
 ["Die Kinder ___ müde.","The children were tired.","waren","war","hatten","sie (plural) → <b>waren</b>."],
 ["Ich ___ am Montag einen Termin beim Arzt.","On Monday I had an appointment at the doctor's.","hatte","war","habe","<b>ich hatte</b> einen Termin."],
 ["Letztes Jahr ___ wir in Berlin.","Last year we were in Berlin.","waren","wart","hatten","wir → <b>waren</b>. letztes Jahr = last year."],
 ["Wie ___ der Film?","How was the film?","war","hatte","waren","der Film → er → <b>war</b>."],
 ["Sie ___ gestern Geburtstag.","She had her birthday yesterday.","hatte","war","hatten","Geburtstag <b>haben</b> → sie <b>hatte</b> Geburtstag."],
 ["Ihr ___ viel Glück!","You (all) were very lucky! (lit. had much luck)","hattet","wart","hatten","ihr → <b>hattet</b>."],
 ["Herr Müller, ___ Sie gestern im Büro?","Mr Müller, were you in the office yesterday?","waren","war","hatten","Sie → <b>waren</b>."],
 ["Früher ___ ich keine Kinder.","Before, I had no children.","hatte","war","hattest","<b>ich hatte</b> keine Kinder."],
 ["Um 8 Uhr ___ ich im Kurs.","At 8 (acht, akht) o'clock I was in class.","war","hatte","bin","<b>ich war</b> im Kurs."],
 ["Das Essen ___ sehr lecker.","The food was very tasty.","war","hatte","waren","das Essen → es → <b>war</b>."],
 ["Wir ___ keine Fahrkarte.","We had no ticket.","hatten","waren","hattet","wir → <b>hatten</b>."],
 ["___ du schon in Deutschland?","Have you been to Germany before? (lit. Were you already in Germany?)","Warst","Hattest","War","<b>Warst du schon …?</b> = Have you ever been …?"]
];

/* ---------- exam: reading. Each text: German, English (word by word where useful), statements [German, English, true?, why] ---------- */
const LESEN=[
 {t:"Liebe Anna,\nich bin heute bis 18 Uhr im Büro. Kannst du bitte Brot und Milch kaufen? Das Geld liegt auf dem Tisch.\nDanke! Tom",
  en:"Dear Anna, I am today until 18 (achtzehn, AKHT-tsayn) o'clock in-the office. Can you please bread and milk buy? The money lies on the table. Thanks! Tom",
  qs:[["Tom ist bis 18 Uhr im Büro.","Tom is in the office until 6 pm.",1,"„bis 18 Uhr im Büro“ = until 18:00 in the office."],["Anna soll Brot und Käse kaufen.","Anna should buy bread and cheese.",0,"Brot und <b>Milch</b>, not Käse."]]},
 {t:"Praxis Dr. Weber\nMo – Fr: 8 – 12 Uhr\nMo, Di, Do: 15 – 18 Uhr\nMittwoch- und Freitagnachmittag geschlossen.",
  en:"Practice Dr Weber. Mon–Fri 8 (acht) – 12 (zwölf, tsvoelf) o'clock. Mon, Tue, Thu 15 (fünfzehn) – 18 (achtzehn). Wednesday and Friday afternoon closed.",
  qs:[["Am Mittwochnachmittag ist die Praxis offen.","On Wednesday afternoon the practice is open.",0,"Mittwoch<b>nachmittag geschlossen</b> = closed."],["Am Montag kann man um 16 Uhr zum Arzt gehen.","On Monday you can go to the doctor at 4 pm.",1,"Mo 15 – 18 Uhr: 16 (sechzehn) is in between."]]},
 {t:"Hallo Lena,\nam Samstag habe ich Geburtstag. Ich mache eine Party um 20 Uhr. Kommst du? Bring bitte etwas zu trinken mit.\nViele Grüße\nMarco",
  en:"Hello Lena, on Saturday have I birthday. I make a party at 20 (zwanzig) o'clock. Come you? Bring please something to drink along. Many greetings, Marco",
  qs:[["Marco hat am Sonntag Geburtstag.","Marco's birthday is on Sunday.",0,"am <b>Samstag</b>."],["Lena soll Getränke mitbringen.","Lena should bring drinks.",1,"„etwas zu trinken mitbringen“ = bring something to drink."]]},
 {t:"Bitte nicht rauchen!",en:"Please not smoke!",qs:[["Hier darf man nicht rauchen.","You may not smoke here.",1,"nicht rauchen = no smoking."],["Hier kann man Zigaretten kaufen.","You can buy cigarettes here.",0,"The sign only says: do not smoke."]]},
 {t:"Supermarkt Frisch\nÖffnungszeiten: Mo – Sa 7 – 21 Uhr\nSonntag geschlossen",
  en:"Supermarket Frisch. Opening hours: Mon–Sat 7 (sieben) – 21 (einundzwanzig, AYN-oont-TSVAN-tsikh) o'clock. Sunday closed.",
  qs:[["Man kann am Sonntag einkaufen.","You can go shopping on Sunday.",0,"Sonntag <b>geschlossen</b>."],["Am Samstag ist der Supermarkt bis 21 Uhr offen.","On Saturday the supermarket is open until 9 pm.",1,"Mo – Sa 7 – 21 Uhr."]]},
 {t:"Wohnung zu vermieten: 2 Zimmer, Küche, Bad, Balkon. 55 m², 3. Stock, 750 € warm. Ab 1. März. Tel. 0176 554433",
  en:"Flat to rent: 2 (zwei) rooms, kitchen, bath, balcony. 55 m² (fünfundfünfzig Quadratmeter), 3rd (dritter) floor, 750 € (siebenhundertfünfzig) including utilities (warm). From 1 March (ersten März). Phone …",
  qs:[["Die Wohnung hat einen Balkon.","The flat has a balcony.",1,"„Balkon“ is in the list."],["Die Wohnung ist ab Januar frei.","The flat is free from January.",0,"ab 1. <b>März</b>."]]},
 {t:"Deutschkurs A1 für Anfänger\nDienstag und Donnerstag, 18:30 – 20:00 Uhr\nBeginn: 4. November\nAnmeldung im Büro, Raum 12",
  en:"German course A1 for beginners. Tuesday and Thursday 18:30 (achtzehn Uhr dreißig) – 20:00. Start: 4 (vierten) November. Registration in-the office, room 12 (zwölf).",
  qs:[["Der Kurs ist zweimal pro Woche.","The course is twice a week.",1,"Dienstag <b>und</b> Donnerstag = 2 days."],["Man meldet sich im Raum 20 an.","You register in room 20.",0,"Raum <b>12</b> (zwölf). 20 is the time."]]},
 {t:"Liebe Frau Schmidt,\nleider kann ich morgen nicht zum Kurs kommen. Mein Sohn ist krank.\nViele Grüße\nAli Hassan",
  en:"Dear Mrs Schmidt, unfortunately can I tomorrow not to-the course come. My son is ill. Many greetings, Ali Hassan",
  qs:[["Herr Hassan ist krank.","Mr Hassan is ill.",0,"Sein <b>Sohn</b> ist krank."],["Herr Hassan kommt morgen nicht zum Kurs.","Mr Hassan isn't coming to class tomorrow.",1,"„kann morgen nicht kommen“."]]},
 {t:"Gleis 5: Der ICE nach München fährt heute 20 Minuten später ab.",
  en:"Platform 5 (fünf): The ICE to Munich departs today 20 (zwanzig) minutes later.",
  qs:[["Der Zug nach München hat Verspätung.","The train to Munich is delayed.",1,"20 Minuten später = 20 minutes late (Verspätung = delay)."],["Der Zug fährt von Gleis 3.","The train leaves from platform 3.",0,"<b>Gleis 5</b>."]]},
 {t:"Verkaufe Fahrrad, 3 Jahre alt, sehr gut, nur 120 €. Bitte nur abends anrufen: 089 123456",
  en:"Selling bicycle, 3 (drei) years old, very good, only 120 € (hundertzwanzig). Please only in-the-evenings call.",
  qs:[["Das Fahrrad ist neu.","The bicycle is new.",0,"3 Jahre alt."],["Man soll am Abend anrufen.","You should call in the evening.",1,"„nur abends anrufen“."]]},
 {t:"Restaurant Bella Italia\nMittagsmenü: Suppe + Pizza oder Pasta + Getränk: 12,90 €\nMo – Fr 11:30 – 14:30 Uhr",
  en:"Lunch menu: soup + pizza or pasta + drink: 12.90 € (zwölf Euro neunzig). Mon–Fri 11:30 – 14:30.",
  qs:[["Das Mittagsmenü gibt es auch am Samstag.","The lunch menu is also available on Saturday.",0,"Only <b>Mo – Fr</b>."],["Im Menü ist ein Getränk.","A drink is included in the menu.",1,"„+ Getränk“."]]},
 {t:"Hallo Sara, ich warte am Bahnhof, nicht am Kino! Bis gleich, Jonas",
  en:"Hello Sara, I wait at-the station, not at-the cinema! See you soon, Jonas",
  qs:[["Jonas wartet am Kino.","Jonas is waiting at the cinema.",0,"am <b>Bahnhof</b>, <b>nicht</b> am Kino."],["Jonas und Sara treffen sich gleich.","Jonas and Sara will meet soon.",1,"„Bis gleich“ = see you in a moment."]]}
];
/* ---------- exam: listening. [what is said, question, English question, right, wrong, wrong, English of the text] ---------- */
const HOEREN=[
 ["Achtung an Gleis 4: Der Zug nach Hamburg fährt heute von Gleis 7.","Von welchem Gleis fährt der Zug?","From which platform does the train leave?","Gleis 7","Gleis 4","Gleis 11","Attention at platform 4 (vier): The train to Hamburg leaves today from platform 7 (sieben, ZEE-ben)."],
 ["Hallo Maria, hier ist Peter. Wir treffen uns morgen um halb neun im Café. Tschüss!","Wann treffen sie sich?","When are they meeting?","um 8:30 Uhr","um 9:30 Uhr","um 9:00 Uhr","Hello Maria, here is Peter. We meet tomorrow at half nine (halb neun, halp noyn = 8:30) in the café."],
 ["Guten Tag, hier ist die Praxis Dr. Klein. Ihr Termin ist nicht am Montag, sondern am Mittwoch um zehn Uhr.","Wann ist der Termin?","When is the appointment?","Mittwoch, 10 Uhr","Montag, 10 Uhr","Mittwoch, 12 Uhr","Good day, here is the practice Dr Klein. Your appointment is not on Monday but on Wednesday at ten (zehn, tsayn) o'clock."],
 ["Was kostet das T-Shirt? – Das kostet neunzehn Euro neunundneunzig.","Was kostet das T-Shirt?","How much is the T-shirt?","19,99 €","9,99 €","90,99 €","What costs the T-shirt? – It costs 19.99 € (NOYN-tsayn OY-ro NOYN-oont-NOYN-tsikh)."],
 ["Liebe Kunden, heute haben wir Äpfel im Angebot: ein Kilo nur einen Euro fünfzig.","Was kostet ein Kilo Äpfel?","How much is a kilo of apples?","1,50 €","5,10 €","1,15 €","Dear customers, today we have apples on offer: a kilo only one euro fifty (FUENF-tsikh)."],
 ["Hallo, ich bin Frau Schulz. Meine Telefonnummer ist null eins sieben sechs, drei vier fünf, zwei zwei eins.","Wie ist die Telefonnummer?","What is the phone number?","0176 345 221","0167 345 221","0176 354 221","Hello, I am Mrs Schulz. My phone number is 0176 345 221."],
 ["Mein Name ist Krüger. K – R – Ü – G – E – R.","Wie heißt die Person?","What is the person's name?","Krüger","Kröger","Krieger","My name is Krüger, spelled K-R-Ü-G-E-R."],
 ["Der Deutschkurs beginnt nicht heute, sondern am Donnerstag.","Wann beginnt der Kurs?","When does the course start?","am Donnerstag","heute","am Dienstag","The German course starts not today but on Thursday."],
 ["Entschuldigung, wo ist die Post? – Gehen Sie geradeaus und dann die zweite Straße links.","Wo ist die Post?","Where is the post office?","zweite Straße links","erste Straße rechts","zweite Straße rechts","Excuse me, where is the post office? – Go straight ahead and then the second street left."],
 ["Ich komme heute etwas später. Mein Bus hat Verspätung. Ich bin um Viertel nach sieben da.","Wann kommt die Person?","When is the person arriving?","um 7:15 Uhr","um 6:45 Uhr","um 7:45 Uhr","I come today somewhat later. My bus is delayed. I am at quarter past seven (Viertel nach sieben = 7:15) there."],
 ["Möchtest du Tee oder Kaffee? – Kaffee, bitte, mit Milch, aber ohne Zucker.","Was trinkt die Person?","What does the person drink?","Kaffee mit Milch","Tee mit Zucker","Kaffee mit Zucker","Would you like tea or coffee? – Coffee, please, with milk but without sugar."],
 ["Der Supermarkt ist am Samstag von acht bis zwanzig Uhr geöffnet.","Bis wann ist der Supermarkt am Samstag offen?","Until when is the supermarket open on Saturday?","bis 20 Uhr","bis 18 Uhr","bis 8 Uhr","The supermarket is open on Saturday from eight (acht) until twenty (zwanzig) o'clock."],
 ["Hallo Tim, hier ist Mama. Kannst du bitte heute Brot und sechs Eier kaufen? Danke!","Was soll Tim kaufen?","What should Tim buy?","Brot und Eier","Brot und Milch","Käse und Eier","Hello Tim, here is Mum. Can you please today bread and six (sechs, zeks) eggs buy?"],
 ["Die Wohnung hat drei Zimmer, eine Küche und ein Bad. Sie kostet achthundert Euro.","Wie viele Zimmer hat die Wohnung?","How many rooms does the flat have?","3","2","8","The flat has three (drei) rooms, a kitchen and a bath. It costs 800 € (achthundert)."],
 ["Ich wohne in der Goethestraße, Hausnummer vierundzwanzig.","Wie ist die Hausnummer?","What is the house number?","24","42","14","I live in Goethe Street, house number 24 (vierundzwanzig — four-and-twenty)."],
 ["Mein Geburtstag ist am dritten Juli.","Wann hat die Person Geburtstag?","When is the person's birthday?","3. Juli","3. Juni","13. Juli","My birthday is on the third (dritten) of July (Juli)."],
 ["Achtung: Heute fährt die U-Bahn Linie drei nicht. Bitte nehmen Sie den Bus.","Was ist das Problem?","What is the problem?","Die U3 fährt nicht.","Der Bus fährt nicht.","Die U3 ist zu voll.","Attention: Today runs the underground line three not. Please take the bus."],
 ["Guten Tag, ich hätte gern zwei Brötchen und ein Stück Kuchen.","Was kauft die Person?","What does the person buy?","2 Brötchen und Kuchen","2 Brote und Kuchen","2 Stück Kuchen","Good day, I would like two (zwei) bread rolls and a piece of cake."],
 ["Wir sehen uns am Wochenende. Am Samstag habe ich keine Zeit, aber am Sonntag geht es.","Wann haben sie Zeit?","When do they have time?","am Sonntag","am Samstag","am Freitag","We see each other at the weekend. On Saturday I have no time, but on Sunday it works."],
 ["Das Museum ist montags geschlossen. Von Dienstag bis Sonntag ist es von zehn bis achtzehn Uhr geöffnet.","Wann ist das Museum geschlossen?","When is the museum closed?","am Montag","am Sonntag","am Dienstag","The museum is closed on Mondays. From Tuesday to Sunday it is open from ten (zehn) to eighteen (achtzehn) o'clock."],
 ["Entschuldigung, wie spät ist es? – Es ist zehn vor drei.","Wie spät ist es?","What time is it?","2:50 Uhr","3:10 Uhr","10:03 Uhr","Excuse me, what time is it? – It is ten to three (zehn vor drei = 2:50)."],
 ["Ich bin Ärztin und arbeite im Krankenhaus. Ich arbeite oft in der Nacht.","Wo arbeitet die Frau?","Where does the woman work?","im Krankenhaus","in der Apotheke","in der Schule","I am a doctor and work in-the hospital. I work often at night."]
];

/* plain-English meaning of each word type (used in the Welche Wortart? test) */
const TEXPL={Nomen:"a naming word: a thing, person, place or idea (you can say 'the …' before it)",Verb:"a doing or being word: what someone does or is",Artikel:"the little word before a noun, like 'the' or 'a'",Pronomen:"a short word used instead of a name or noun (I, you, she …)",Adjektiv:"a describing word: what something is like",Adverb:"an extra-information word: when, where, how, how much",Präposition:"a small place / time / direction word (in, from, with …)",Konjunktion:"a joining word that glues words or sentences together"};

/* ---------- modal verbs, du or Sie, more topics (used by the tests) ---------- */
/* modal verb data: [ich, du, er/sie/es, wir, ihr, sie/Sie, English] */
const MOD={"können":["kann","kannst","kann","können","könnt","können","can, to be able to"],
 "müssen":["muss","musst","muss","müssen","müsst","müssen","must, have to"],
 "wollen":["will","willst","will","wollen","wollt","wollen","want to"],
 "dürfen":["darf","darfst","darf","dürfen","dürft","dürfen","may, to be allowed to"],
 "möchten":["möchte","möchtest","möchte","möchten","möchtet","möchten","would like to"]};
const MODKEYS=Object.keys(MOD);
/* gap sentences: [person index, sentence with ___, English, correct modal, extra note] */
const MODGAP=[
 [0,"Ich ___ gut kochen.","I can cook well.","können"],
 [0,"Ich ___ heute lange arbeiten.","I have to work long today.","müssen"],
 [0,"Ich ___ einen Kaffee trinken.","I would like to drink a coffee (polite).","möchten"],
 [3,"Wir ___ ins Kino gehen.","We want to go to the cinema.","wollen"],
 [1,"___ du mir helfen?","Can you help me?","können"],
 [0,"___ ich hier sitzen?","May I sit here?","dürfen"],
 [2,"Das Kind ___ nicht lange fernsehen.","The child is not allowed to watch TV for long.","dürfen","nicht dürfen = forbidden."],
 [5,"Sie ___ am Montag nicht arbeiten, denn Montag ist frei.","They don't have to work on Monday, because Monday is a day off.","müssen","nicht müssen = don't have to."],
 [4,"Ihr ___ leise sein.","You (all) must be quiet.","müssen"],
 [1,"Was ___ du am Wochenende machen?","What do you want to do at the weekend?","wollen"],
 [2,"Anna ___ sehr gut Deutsch sprechen.","Anna can speak German very well.","können"],
 [3,"Wir ___ bitte zwei Tee haben.","We would like two teas, please.","möchten"],
 [2,"Hier ___ man nicht rauchen.","You must not smoke here (forbidden).","dürfen","nicht dürfen = forbidden."],
 [1,"Du ___ nicht kommen.","You don't have to come.","müssen","nicht müssen = don't have to."]
];
/* word order: [right, wrong, wrong, English, explanation] */
const MODORD=[
 ["Ich kann heute nicht kommen.","Ich kann kommen heute nicht.","Ich kommen heute nicht kann.","I can't come today.","The modal verb is in place 2, the infinitive goes to the end."],
 ["Möchtest du einen Kaffee trinken?","Trinken möchtest du einen Kaffee?","Möchtest du trinken einen Kaffee?","Would you like to drink a coffee?","Yes/no question: modal first, infinitive last."],
 ["Morgen muss ich früh aufstehen.","Morgen ich muss früh aufstehen.","Morgen muss ich früh stehen auf.","Tomorrow I have to get up early.","Time first: the verb stays in place 2. The separable verb stays in one piece at the end."],
 ["Wir wollen am Samstag ins Kino gehen.","Wir wollen gehen am Samstag ins Kino.","Wir gehen wollen am Samstag ins Kino.","We want to go to the cinema on Saturday.","Everything else goes inside the sandwich; gehen is last."],
 ["Darf ich das Fenster öffnen?","Darf ich öffnen das Fenster?","Öffnen darf ich das Fenster?","May I open the window?","Modal first, infinitive last."],
 ["Was möchten Sie trinken?","Was Sie möchten trinken?","Was möchten trinken Sie?","What would you like to drink?","W-word 1st, modal 2nd, infinitive at the end."],
 ["Kannst du bitte langsam sprechen?","Kannst du sprechen bitte langsam?","Sprechen kannst du bitte langsam?","Can you speak slowly, please?","bitte and langsam sit inside the sandwich."],
 ["Er muss heute lange arbeiten.","Er musst heute lange arbeiten.","Er muss arbeiten heute lange.","He has to work long today.","er has no ending after a modal verb (muss, not musst), and arbeiten is at the end."]
];



/* du or Sie: situations [text, du|Sie] and gaps [sentence, answer, [wrong, wrong], English, explanation] */
const DUSIE_SIT=[["Your friend Anna","du"],["The examiner in the speaking test","Sie"],["Your classmate","du"],["A doctor you meet for the first time","Sie"],["An older man you do not know","Sie"],["A child in the park","du"],["The bank clerk","Sie"],["Your brother","du"],["The hotel receptionist","Sie"],["Your boss","Sie"],["Your exam partner in Sprechen Teil 2","du"],["An email to a language school","Sie"],["A colleague who says: 'Wir können uns duzen.'","du"],["Your landlord, first meeting","Sie"]];
const DUSIE_GAP=[
 ["Wie ___ du?","heißt",["heißen","heiße"],"What is your name? (friend)","du → -st, but after ß only -t: du heißt."],
 ["Wie ___ Sie?","heißen",["heißt","heiße"],"What is your name? (formal)","Sie → -en, the same as wir."],
 ["Woher ___ du?","kommst",["kommen","kommt"],"Where are you from? (friend)","du → -st."],
 ["Woher ___ Sie?","kommen",["kommst","kommt"],"Where are you from? (formal)","Sie → -en."],
 ["Wo ___ Sie?","wohnen",["wohnst","wohnt"],"Where do you live? (formal)","Sie → -en."],
 ["Wo ___ du?","wohnst",["wohnen","wohnt"],"Where do you live? (friend)","du → -st."],
 ["___ Sie Deutsch?","Sprechen",["Sprichst","Spricht"],"Do you speak German? (formal)","Sie → sprechen (same as wir)."],
 ["___ du Zeit?","Hast",["Haben","Hat"],"Do you have time? (friend)","du hast."],
 ["___ Sie mir helfen?","Können",["Kannst","Kann"],"Can you help me? (formal)","Sie → können."],
 ["Wie ist ___ Telefonnummer? (formal)","Ihre",["deine","dein"],"What is your phone number? (formal)","Formal: Ihr / Ihre with a capital I."],
 ["Wie ist ___ Name? (to a friend)","dein",["Ihr","deine"],"What is your name? (friend)","Informal: dein / deine."],
 ["Wie geht es ___? (formal)","Ihnen",["dir","dich"],"How are you? (formal)","Formal: Ihnen. Informal: Wie geht's dir?"],
 ["Wie geht's ___? (to a friend)","dir",["Ihnen","Ihr"],"How are you? (friend)","Informal: dir."]
];
/* new topics vocabulary [German, English] */
const THEMEN2=[
 ["das Wetter","weather"],["die Sonne","sun"],["der Regen","rain"],["der Schnee","snow"],["der Wind","wind"],["die Wolke","cloud"],["das Gewitter","thunderstorm"],["Es regnet.","It is raining."],["Es schneit.","It is snowing."],["sonnig","sunny"],["bewölkt","cloudy"],["kalt","cold"],["heiß","hot"],
 ["der Kopf","head"],["das Auge","eye"],["das Ohr","ear"],["der Mund","mouth"],["die Nase","nose"],["der Hals","neck, throat"],["der Arm","arm"],["die Hand","hand"],["der Bauch","stomach, belly"],["das Bein","leg"],["der Fuß","foot"],["der Rücken","back"],["der Zahn","tooth"],["der Arzt","doctor"],["das Fieber","fever"],["der Husten","cough"],["Kopfschmerzen","headache"],["die Tablette","tablet"],["die Apotheke","pharmacy"],["Gute Besserung!","Get well soon!"],["krank","ill"],
 ["das T-Shirt","T-shirt"],["die Hose","trousers"],["das Kleid","dress"],["die Jacke","jacket"],["die Schuhe","shoes"],["die Socken","socks"],["die Mütze","cap, hat"],["der Schal","scarf"],["die Größe","size"],["zu groß","too big"],["zu klein","too small"],["zu teuer","too expensive"],["anprobieren","to try on"],
 ["der Bus","bus"],["die Straßenbahn","tram"],["die U-Bahn","underground"],["der Zug","train"],["das Flugzeug","aeroplane"],["der Bahnhof","station"],["die Haltestelle","bus stop"],["das Gleis","platform"],["die Fahrkarte","ticket"],["einfach","single (ticket)"],["hin und zurück","return (ticket)"],["die Verspätung","delay"],["die Abfahrt","departure"],["die Ankunft","arrival"],
 ["das Zimmer","room"],["das Einzelzimmer","single room"],["das Doppelzimmer","double room"],["der Schlüssel","key"],["das Frühstück","breakfast"],["die Rechnung","bill"],["der Brief","letter"],["die Briefmarke","stamp"],["das Paket","parcel"],["die Postkarte","postcard"],["der Absender","sender"],["der Empfänger","recipient"],["die Postleitzahl","postcode"]
];
