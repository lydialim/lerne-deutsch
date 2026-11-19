/* Lerne Deutsch A1: shared word lists and helpers, loaded by every page that needs data (lessons, exam, cards, tests).
   The word lists that only the tests use are in data-tests.js. Add a list here only if a lesson or the card screen reads it. */
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

/* numbers */

const U={0:["null","nool"],1:["eins","aynss"],2:["zwei","tsvy"],3:["drei","dry"],4:["vier","feer"],5:["fünf","fünf"],6:["sechs","zeks"],7:["sieben","ZEE-ben"],8:["acht","akht"],9:["neun","noyn"],10:["zehn","tsayn"],11:["elf","elf"],12:["zwölf","tsvölf"],13:["dreizehn","DRY-tsayn"],14:["vierzehn","FEER-tsayn"],15:["fünfzehn","FÜNF-tsayn"],16:["sechzehn","ZEKH-tsayn"],17:["siebzehn","ZEEP-tsayn"],18:["achtzehn","AKHT-tsayn"],19:["neunzehn","NOYN-tsayn"]};

const T={2:["zwanzig","TSVAN-tsikh"],3:["dreißig","DRY-sikh"],4:["vierzig","FEER-tsikh"],5:["fünfzig","FÜNF-tsikh"],6:["sechzig","ZEKH-tsikh"],7:["siebzig","ZEEP-tsikh"],8:["achtzig","AKHT-tsikh"],9:["neunzig","NOYN-tsikh"]};

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
/* years: 1100–1999 are said in hundreds (1990 = neunzehnhundertneunzig), from 2000 as a normal number (2026 = zweitausendsechsundzwanzig) */

function yearSay(y){
  if(y>=2000||y<1100) return num(y);
  const h=Math.floor(y/100), r=y%100, hh=num(h), hw=hh[0]+"hundert", hp=hh[1]+"-HOON-dert";
  if(!r) return [hw,hp]; const rr=num(r); return [hw+rr[0], hp+"-"+rr[1]];
}

/* alphabet */

const ABC=[["A","ah"],["B","bay"],["C","tsay"],["D","day"],["E","ay",1],["F","eff"],["G","gay",1],["H","hah"],["I","ee",1],["J","yot",1],["K","kah"],["L","ell"],["M","emm"],["N","enn"],["O","oh"],["P","pay"],["Q","koo"],["R","air"],["S","ess"],["T","tay"],["U","oo"],["V","fow",1],["W","vay",1],["X","iks"],["Y","ÜP-si-lon",1],["Z","tset",1],["Ä","eh"],["Ö","öh"],["Ü","üh"],["ß","ESS-tset"]];

const SAY={A:"Ah",B:"Beh",C:"Zeh",D:"Deh",E:"Eh",F:"Eff",G:"Geh",H:"Hah",I:"Ih",J:"Jott",K:"Kah",L:"Ell",M:"Emm",N:"Enn",O:"Oh",P:"Peh",Q:"Kuh",R:"Err",S:"Ess",T:"Teh",U:"Uh",V:"Fau",W:"Weh",X:"Ix",Y:"Üpsilon",Z:"Zett","Ä":"Äh","Ö":"Öh","Ü":"Üh","ß":"Eszett"};

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

/* more data */

const VREG=[["wohnen","wohn","to live"],["kommen","komm","to come"],["lernen","lern","to learn"],["spielen","spiel","to play"],["trinken","trink","to drink"],["machen","mach","to do / make"],["kaufen","kauf","to buy"],["gehen","geh","to go"],["kochen","koch","to cook"],["brauchen","brauch","to need"],["hören","hör","to hear"],["schreiben","schreib","to write"],["schwimmen","schwimm","to swim"],["joggen","jogg","to jog"],["fragen","frag","to ask"],["suchen","such","to look for"]];

const VIRR={sein:["bin","bist","ist","sind","seid","sind","to be"],haben:["habe","hast","hat","haben","habt","haben","to have"],heißen:["heiße","heißt","heißt","heißen","heißt","heißen","to be called"],arbeiten:["arbeite","arbeitest","arbeitet","arbeiten","arbeitet","arbeiten","to work"],fahren:["fahre","fährst","fährt","fahren","fahrt","fahren","to drive / ride"],essen:["esse","isst","isst","essen","esst","essen","to eat"],sprechen:["spreche","sprichst","spricht","sprechen","sprecht","sprechen","to speak"],möchten:["möchte","möchtest","möchte","möchten","möchtet","möchten","would like"],
 schlafen:["schlafe","schläfst","schläft","schlafen","schlaft","schlafen","to sleep"],lesen:["lese","liest","liest","lesen","lest","lesen","to read"],
 sehen:["sehe","siehst","sieht","sehen","seht","sehen","to see"],laufen:["laufe","läufst","läuft","laufen","lauft","laufen","to run / walk"],
 treffen:["treffe","triffst","trifft","treffen","trefft","treffen","to meet"],nehmen:["nehme","nimmst","nimmt","nehmen","nehmt","nehmen","to take"],
 tanzen:["tanze","tanzt","tanzt","tanzen","tanzt","tanzen","to dance"],reisen:["reise","reist","reist","reisen","reist","reisen","to travel"]};

function forms(v){ if(VIRR[v]) return VIRR[v].slice(0,6); const r=VREG.find(x=>x[0]===v); return ["e","st","t","en","t","en"].map(e=>r[1]+e); }


const letterSay=l=>SAY[l]||l;

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
 ["der","Blick","Blicke","view; look","leute"], ["die","Vorsicht","","caution","leute","Usually: Vorsicht! (Careful!)"], ["die","Vorwahl","Vorwahlen","area code","leute"],["der","Ausgang","Ausgänge","exit","reise"],["der","Eingang","Eingänge","entrance","reise"],["die","Aussage","Aussagen","statement","buero"],["der","Gast","Gäste","guest","leute"],["der","Grad","Grad","degree (temperature)","leute","Used with numbers: 20 Grad (zwanzig Grad, TSVAN-tsikh graht = twenty degrees). Technical texts sometimes say das Grad."],["das","Lokal","Lokale","restaurant, pub","reise"],["die","Mitte","","middle, centre","leute"],["der","Schalter","Schalter","counter, ticket window","buero"],["das","Schild","Schilder","sign","reise"],["das","Wiederhören","","goodbye (on the phone)","leute","Only in: Auf Wiederhören! Said on the phone; face to face you say: Auf Wiedersehen!"],
 ["das","Gewicht","Gewichte","weight","leute"], ["der","Laden","Läden","shop","leute"], ["die","Möbel","Möbel","furniture","wohnung","Plural only: die Möbel (ein Möbelstück = one piece)."],
 ["die","Treppe","Treppen","stairs","wohnung"], ["das","Licht","Lichter","light","wohnung"], ["das","Feuer","Feuer","fire","wohnung"],
 ["die","Birne","Birnen","pear; light bulb","essen"], ["der","Durst","","thirst","essen","Ich habe Durst. (I am thirsty.)"], ["die","Lebensmittel","Lebensmittel","groceries, food","essen","Plural only: die Lebensmittel."],
 ["das","Öl","Öle","oil","essen"], ["die","Pommes frites","Pommes frites","chips, french fries","essen","Plural only: die Pommes frites (often just die Pommes)."], ["der","Schinken","Schinken","ham","essen"]
].map(([a,w,p,en,t,note])=>({a,w,p,en,t,note}));
/* times of day: [noun, sound, English, "every day" form, hours]. Used by the tests and the day bar (daybar.js). */
const DAYTIMES=[["Morgen","MOR-gen","morning","morgens","6–9"],["Vormittag","FOR-mit-tahk","late morning","vormittags","9–12"],["Mittag","MIT-tahk","noon","mittags","12–14"],["Nachmittag","NAKH-mit-tahk","afternoon","nachmittags","14–18"],["Abend","AH-bent","evening","abends","18–22"],["Nacht","nakht","night","nachts","22–6"]];
