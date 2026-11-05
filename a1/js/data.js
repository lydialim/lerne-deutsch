/* A1 word lists, sentences and language helpers used by the lessons and the tests. */
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
 [["Die","Artikel","the"],["Wohnung","Nomen","flat"],["ist","Verb","is"],["groß","Adjektiv","big"],["aber","Konjunktion","but"],["teuer","Adjektiv","expensive"]]
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
const INTRO=[
 ["Name","Wie heißen Sie?","Ich heiße …","What is your name?"],
 ["Alter","Wie alt sind Sie?","Ich bin … Jahre alt.","How old are you?"],
 ["Land","Woher kommen Sie?","Ich komme aus …","Where are you from?"],
 ["Wohnort","Wo wohnen Sie?","Ich wohne in …","Where do you live?"],
 ["Sprachen","Welche Sprachen sprechen Sie?","Ich spreche …","Which languages do you speak?"],
 ["Beruf","Was sind Sie von Beruf?","Ich bin … von Beruf.","What is your job?"],
 ["Hobby","Was sind Ihre Hobbys?","Meine Hobbys sind …","What are your hobbies?"]
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
 ["Ich habe heute ___ Termin.","I have an appointment today.",["einen","eine","ein"],"einen","<b>der</b> Termin → Akkusativ: <b>einen</b> Termin. Only der changes."]
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
 ["Ich koche nicht so gern.","Ich nicht so gern koche.","Ich kochst nicht so gern.","I don't really like cooking."]
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
 ["Ist das ein Bahnhof?","Nein, das ist ___ Bahnhof.","Is that a station? – No, that is not a station.",["kein","keinen","nicht"],"kein","der Bahnhof after 'ist' (not Akkusativ): ein → <b>kein</b>."]
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
 ["Was machst du am Wochenende?","What do you do at the weekend?","Ich koche und lese.","Du kochst und liest.","Ich kochst und lese.","du → <b>ich</b>: ich koche, ich lese."]
];
const PLACES=[["der","Bahnhof","station"],["der","Supermarkt","supermarket"],["der","Marktplatz","market square"],["das","Museum","museum"],["das","Hotel","hotel"],["das","Krankenhaus","hospital"],["das","Kino","cinema"],["die","Post","post office"],["die","Apotheke","pharmacy"],["die","Bank","bank"],["die","Haltestelle","bus stop"],["die","Universität","university"]];
const ARROWS=[["←","links","left"],["→","rechts","right"],["↑","geradeaus","straight ahead"],["↓","zurück","back"]];
const DIR=[["Gehen Sie geradeaus.","Go straight ahead."],["Gehen Sie die erste Straße links.","Take the first street on the left."],["An der Ampel rechts.","Turn right at the traffic light."],["Der Bahnhof ist gegenüber.","The station is opposite."],["Die Post ist neben der Bank.","The post office is next to the bank."],["Das ist nicht weit, nur fünf Minuten zu Fuß.","It's not far, only five minutes on foot."],["Nehmen Sie den Bus Nummer drei.","Take bus number three."],["Gehen Sie über die Kreuzung.","Go across the crossroads."],["Die Apotheke ist an der Ecke.","The pharmacy is on the corner."],["Gehen Sie zurück.","Go back."],["Die zweite Straße rechts.","The second street on the right."]];
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
