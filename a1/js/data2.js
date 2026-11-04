/* A1 word lists, part 2: vocabulary with articles, calendar, food, family, flat, countries, colours,
   possessives, war/hatte, exam reading and listening texts, and extra items for older tests. */

/* ---------- vocabulary: [article, word, plural ("" = no plural), English, topic, note?] ---------- */
const VTOPICS=[["essen","Essen und Trinken","food and drink"],["familie","Familie","family"],["wohnung","Wohnung","flat / home"],["stadt","Stadt und Verkehr","town and transport"],["zeit","Zeit","time"],["alltag","Alltag und Kleidung","everyday things and clothes"]];
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
 ["der","Montag","Montage","Monday","zeit","Days of the week are all der."],["der","Freitag","Freitage","Friday","zeit","Days of the week are all der."],["der","Mai","Maie","May","zeit","Months are all der."],["der","Dezember","Dezember","December","zeit","Months are all der."],

 ["der","Kuli","Kulis","pen","alltag"],["das","Heft","Hefte","exercise book","alltag"],["das","Buch","Bücher","book","alltag"],["die","Tasche","Taschen","bag","alltag"],
 ["die","Brille","Brillen","glasses","alltag"],["die","Uhr","Uhren","clock / watch","alltag"],["das","Handy","Handys","mobile phone","alltag"],["der","Schlüssel","Schlüssel","key","alltag"],
 ["der","Ausweis","Ausweise","ID card","alltag"],["das","Geld","","money","alltag"],["die","Kreditkarte","Kreditkarten","credit card","alltag"],["der","Computer","Computer","computer","alltag"],
 ["die","E-Mail","E-Mails","e-mail","alltag"],["die","Zeitung","Zeitungen","newspaper","alltag"],["der","Brief","Briefe","letter","alltag"],["das","Paket","Pakete","parcel","alltag"],
 ["die","Adresse","Adressen","address","alltag"],["die","Telefonnummer","Telefonnummern","phone number","alltag"],["der","Kurs","Kurse","course / class","alltag"],["die","Hausaufgabe","Hausaufgaben","homework","alltag"],
 ["der","Regenschirm","Regenschirme","umbrella","alltag"],["die","Jacke","Jacken","jacket","alltag"],["der","Pullover","Pullover","pullover / jumper","alltag"],["die","Hose","Hosen","trousers","alltag"],
 ["das","Hemd","Hemden","shirt","alltag"],["der","Schuh","Schuhe","shoe","alltag"],["das","Kleid","Kleider","dress","alltag"],["der","Mantel","Mäntel","coat","alltag"]
].map(([a,w,p,en,t,note])=>({a,w,p,en,t,note}));
function vocabNote(n){
  if(n.note) return n.note;
  const parts=n.w.match(/^(.+?)(zimmer|schrank|karte|essen|haus|nummer|aufgabe|schirm|maschine|bahn|hafen|stelle|tag)$/i);
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
 ["Die Tochter von meinen Eltern ist meine ___.","My parents' daughter is my …","Schwester","Tochter","Tante"],
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
 ["___ ihr gestern im Kino?","Were you (all) at the cinema yesterday?","Wart","Wart ihr","Waren","ihr → <b>wart</b>."],
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
  en:"Flat to rent: 2 (zwei) rooms, kitchen, bath, balcony. 55 m² (fünfundfünfzig Quadratmeter), 3rd (dritter) floor, 750 € (siebenhundertfünfzig) incl. heating. From 1 March (ersten März). Phone …",
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
 ["Hallo Maria, hier ist Peter. Wir treffen uns morgen um halb neun am Café. Tschüss!","Wann treffen sie sich?","When are they meeting?","um 8:30 Uhr","um 9:30 Uhr","um 9:00 Uhr","Hello Maria, here is Peter. We meet tomorrow at half nine (halb neun, halp noyn = 8:30) at-the café."],
 ["Guten Tag, hier ist die Praxis Dr. Klein. Ihr Termin ist nicht am Montag, sondern am Mittwoch um zehn Uhr.","Wann ist der Termin?","When is the appointment?","Mittwoch, 10 Uhr","Montag, 10 Uhr","Mittwoch, 12 Uhr","Good day, here is the practice Dr Klein. Your appointment is not on Monday but on Wednesday at ten (zehn, tsayn) o'clock."],
 ["Was kostet das T-Shirt? – Das kostet neunzehn Euro neunundneunzig.","Was kostet das T-Shirt?","How much is the T-shirt?","19,99 €","9,99 €","90,99 €","What costs the T-shirt? – It costs 19.99 € (NOYN-tsayn OY-ro NOYN-oont-NOYN-tsikh)."],
 ["Liebe Kunden, heute haben wir Äpfel im Angebot: ein Kilo nur einen Euro fünfzig.","Was kostet ein Kilo Äpfel?","How much is a kilo of apples?","1,50 €","5,10 €","1,15 €","Dear customers, today we have apples on offer: a kilo only one euro fifty (FUENF-tsikh)."],
 ["Hallo, ich bin Frau Schulz. Meine Telefonnummer ist null eins sieben sechs, drei vier fünf, zwei zwei eins.","Wie ist die Telefonnummer?","What is the phone number?","0176 345 221","0167 345 221","0176 354 221","Hello, I am Mrs Schulz. My phone number is 0176 345 221."],
 ["Mein Name ist Krüger. K – R – Ü – G – E – R.","Wie heißt die Frau?","What is the woman's name?","Krüger","Kröger","Krieger","My name is Krüger, spelled K-R-Ü-G-E-R."],
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
 ["Guten Tag, ich hätte gern zwei Brötchen und ein Stück Kuchen.","Was kauft die Frau?","What does the woman buy?","2 Brötchen und Kuchen","2 Brote und Kuchen","2 Stück Kuchen","Good day, I would like two (zwei) bread rolls and a piece of cake."],
 ["Wir sehen uns am Wochenende. Am Samstag habe ich keine Zeit, aber am Sonntag geht es.","Wann haben sie Zeit?","When do they have time?","am Sonntag","am Samstag","am Freitag","We see each other at the weekend. On Saturday I have no time, but on Sunday it works."],
 ["Das Museum ist montags geschlossen. Von Dienstag bis Sonntag ist es von zehn bis achtzehn Uhr geöffnet.","Wann ist das Museum geschlossen?","When is the museum closed?","am Montag","am Sonntag","am Dienstag","The museum is closed on Mondays. From Tuesday to Sunday it is open from ten (zehn) to eighteen (achtzehn) o'clock."],
 ["Entschuldigung, wie spät ist es? – Es ist zehn vor drei.","Wie spät ist es?","What time is it?","2:50 Uhr","3:10 Uhr","10:03 Uhr","Excuse me, what time is it? – It is ten to three (zehn vor drei = 2:50)."],
 ["Ich bin Ärztin und arbeite im Krankenhaus. Ich arbeite oft in der Nacht.","Wo arbeitet die Frau?","Where does the woman work?","im Krankenhaus","in der Apotheke","in der Schule","I am a doctor and work in-the hospital. I work often at night."]
];

/* ---------- extra items for older tests (all lists now have at least 20) ---------- */
WORK.push(
 ["Ich arbeite ___ Montag bis Freitag.","I work from Monday to Friday.",["von","um","seit"],"von","<b>von</b> … bis = from … to."],
 ["Mein Chef ___ sehr nett.","My boss is very nice.",["ist","bin","hat"],"ist","er (mein Chef) → <b>ist</b>."],
 ["Ich habe ___ Uhr Feierabend.","I finish work at 5 pm (17 Uhr, siebzehn, ZEEP-tsayn).",["um 17","am 17","im 17"],"um 17","<b>um</b> + clock time. Feierabend = end of the working day."],
 ["Was ___ du von Beruf?","What do you do for a living?",["bist","ist","hast"],"bist","du → <b>bist</b>."],
 ["Er ist Arzt. Sie ist ___.","He is a doctor. She is a doctor.",["Ärztin","Arztin","Arzt"],"Ärztin","Feminine forms add -in (and here an umlaut): <b>Ärztin</b>."],
 ["Ich arbeite ___ Teilzeit.","I work part-time.",["in","als","bei"],"in","<b>in Teilzeit</b> / <b>in Vollzeit</b> = part-time / full-time."],
 ["Ich mache eine ___ als Köchin.","I'm doing an apprenticeship as a cook.",["Ausbildung","Arbeit","Beruf"],"Ausbildung","<b>die Ausbildung</b> = training / apprenticeship."]
);
GERN.push(
 ["Ich höre gern Musik.","Ich gern höre Musik.","Ich hörst gern Musik.","I like listening to music."],
 ["Wir kochen gern zusammen.","Wir gern kochen zusammen.","Wir kocht gern zusammen.","We like cooking together."],
 ["Sie fährt gern Auto.","Sie fahrt gern Auto.","Sie gern fährt Auto.","She likes driving."],
 ["Ich trinke lieber Tee.","Ich lieber trinke Tee.","Ich trinke Tee lieber gern.","I prefer drinking tea."],
 ["Spielt ihr gern Karten?","Ihr gern spielt Karten?","Spielen ihr gern Karten?","Do you (all) like playing cards?"],
 ["Mein Bruder schwimmt nicht gern.","Mein Bruder nicht gern schwimmt.","Mein Bruder schwimmen nicht gern.","My brother doesn't like swimming."],
 ["Am Abend sieht er gern fern.","Am Abend er sieht gern fern.","Am Abend sieht er gern fernsehen.","In the evening he likes watching TV."],
 ["Was isst du am liebsten?","Was du isst am liebsten?","Was esst du am liebsten?","What do you like eating most?"]
);
KEIN.push(
 ["Hast du Geschwister?","Nein, ich habe ___ Geschwister.","Do you have siblings? – No, I have no siblings.",["keine","kein","nicht"],"keine","Plural: <b>keine</b>."],
 ["Ist das dein Bruder?","Nein, das ist ___ Bruder.","Is that your brother? – No, that is not my brother.",["nicht mein","kein mein","keinen"],"nicht mein","With mein/dein use <b>nicht</b>."],
 ["Kommst du heute?","Nein, ich komme heute ___.","Are you coming today? – No, I'm not coming today.",["nicht","kein","keine"],"nicht","Verb → <b>nicht</b> at the end."],
 ["Gibt es hier einen Supermarkt?","Nein, hier gibt es ___ Supermarkt.","Is there a supermarket here? – No, there is no supermarket here.",["keinen","kein","nicht"],"keinen","es gibt + Akkusativ: der → <b>keinen</b>."],
 ["Hast du Hunger?","Nein, ich habe ___ Hunger.","Are you hungry? – No, I'm not hungry.",["keinen","kein","nicht"],"keinen","der Hunger, no article → <b>keinen</b>."],
 ["Ist die Wohnung groß?","Nein, sie ist ___ groß.","Is the flat big? – No, it is not big.",["nicht","kein","keine"],"nicht","Adjective → <b>nicht</b>."],
 ["Habt ihr ein Kind?","Nein, wir haben ___ Kinder.","Do you have a child? – No, we have no children.",["keine","kein","nicht"],"keine","Plural: <b>keine</b> Kinder."]
);
ANSW.push(
 ["Wann hast du Geburtstag?","When is your birthday?","Am 12. Mai.","Im 12. Mai.","Um 12. Mai.","Date → <b>am</b>: am zwölften (TSVOELF-ten) Mai."],
 ["Hast du Kinder?","Do you have children?","Ja, ich habe zwei Kinder.","Ja, ich hat zwei Kinder.","Ja, du hast zwei Kinder.","du → ich: <b>ich habe</b>. zwei = tsvy."],
 ["Wie viel kostet das?","How much does that cost?","Drei Euro fünfzig.","Drei Uhr fünfzig.","Am dritten.","Price: Euro, not Uhr. 3,50 € = dry OY-ro FUENF-tsikh."],
 ["Wann beginnt der Kurs?","When does the course start?","Um 18 Uhr.","Am 18 Uhr.","Im 18 Uhr.","Clock time → <b>um</b>. 18 = achtzehn (AKHT-tsayn)."],
 ["Was machst du am Wochenende?","What are you doing at the weekend?","Ich besuche meine Eltern.","Du besuchst meine Eltern.","Ich besuchst meine Eltern.","du → <b>ich besuche</b>."],
 ["Bist du verheiratet?","Are you married?","Nein, ich bin ledig.","Nein, ich habe ledig.","Nein, du bist ledig.","<b>ledig</b> = single. ich <b>bin</b>."],
 ["Wo warst du gestern?","Where were you yesterday?","Ich war zu Hause.","Ich bin zu Hause gestern.","Ich hatte zu Hause.","Past of sein: <b>ich war</b>."],
 ["Wie ist deine Wohnung?","What is your flat like?","Sie ist klein, aber hell.","Er ist klein, aber hell.","Ich bin klein, aber hell.","die Wohnung → <b>sie</b>."]
);
PLACES.push(["der","Park","park"],["der","Flughafen","airport"],["das","Restaurant","restaurant"],["das","Rathaus","town hall"],["die","Schule","school"],["die","Kirche","church"],["die","Bibliothek","library"],["die","Bäckerei","bakery"]);
DIR.push(["Gehen Sie bis zur Kreuzung.","Go as far as the crossroads."],["Nehmen Sie die U-Bahn, Linie zwei.","Take the underground, line two (zwei, tsvy)."],["Steigen Sie am Marktplatz aus.","Get off at the market square."],["Das Kino ist hinter dem Bahnhof.","The cinema is behind the station."],["Das Hotel ist links neben der Post.","The hotel is on the left next to the post office."],["Gehen Sie die erste Straße rechts.","Take the first street on the right."],["Fahren Sie drei Stationen.","Go three (drei, dry) stops."],["Es ist ungefähr zehn Minuten zu Fuß.","It is about ten (zehn, tsayn) minutes on foot."],["Die Haltestelle ist vor dem Supermarkt.","The stop is in front of the supermarket."]);
INTRO.push(
 ["Telefonnummer","Wie ist Ihre Telefonnummer?","Meine Telefonnummer ist …","What is your phone number?"],
 ["Geburtstag","Wann haben Sie Geburtstag?","Ich habe am … Geburtstag.","When is your birthday?"],
 ["Familie","Haben Sie Familie?","Ja, ich bin verheiratet und habe …","Do you have a family?"],
 ["Adresse","Wie ist Ihre Adresse?","Meine Adresse ist … Straße …","What is your address?"],
 ["Lieblingsessen","Was essen Sie gern?","Ich esse gern …","What do you like to eat?"],
 ["Wochenende","Was machen Sie am Wochenende?","Am Wochenende …","What do you do at the weekend?"],
 ["Geschwister","Haben Sie Geschwister?","Ja, ich habe einen Bruder. / Nein, ich habe keine Geschwister.","Do you have brothers or sisters?"],
 ["Deutsch lernen","Warum lernen Sie Deutsch?","Ich lerne Deutsch, denn …","Why are you learning German?"],
 ["Urlaub","Wohin fahren Sie gern in Urlaub?","Ich fahre gern nach …","Where do you like to go on holiday?"],
 ["Wohnung","Wie wohnen Sie?","Ich wohne in einer Wohnung mit … Zimmern.","How do you live?"],
 ["E-Mail","Haben Sie eine E-Mail-Adresse?","Ja, meine E-Mail-Adresse ist …","Do you have an e-mail address?"],
 ["Sport","Machen Sie Sport?","Ja, ich spiele … / Ich fahre gern Fahrrad.","Do you do sport?"],
 ["Arbeitszeit","Wann arbeiten Sie?","Ich arbeite von … bis …","When do you work?"]
);
SENTS.push(
 [["Wir","Pronomen","we"],["wohnen","Verb","live"],["in","Präposition","in"],["Berlin","Nomen","Berlin"]],
 [["Mein","Artikel","my"],["Bruder","Nomen","brother"],["ist","Verb","is"],["groß","Adjektiv","tall"]],
 [["Ich","Pronomen","I"],["trinke","Verb","drink"],["Kaffee","Nomen","coffee"],["und","Konjunktion","and"],["Tee","Nomen","tea"]],
 [["Er","Pronomen","he"],["kommt","Verb","comes"],["heute","Adverb","today"]]
);
/* plain-English meaning of each word type (used in the Welche Wortart? test) */
const TEXPL={Nomen:"a naming word: a thing, person, place or idea (you can say 'the …' before it)",Verb:"a doing or being word: what someone does or is",Artikel:"the little word before a noun, like 'the' or 'a'",Pronomen:"a short word used instead of a name or noun (I, you, she …)",Adjektiv:"a describing word: what something is like",Adverb:"an extra-information word: when, where, how, how much",Präposition:"a small place / time / direction word (in, from, with …)",Konjunktion:"a joining word that glues words or sentences together"};
