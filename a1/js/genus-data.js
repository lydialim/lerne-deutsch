/* Data for entdecken.html, topic 1 (how German assigns der / die / das).
   Endings: [ending, gender m|f|n, strength rule|strong|tendency, a1 (1 = core for A1), examples, exceptions]
   Checked against Wikipedia "Grammatical gender in German", Duden online and standard grammars (see the sources box on the page). */
const GX = {
  endings: [
    ["-ung","f","rule",1,"die Zeitung · die Wohnung · die Übung","none as a suffix (der Sprung is not an -ung word)"],
    ["-heit","f","rule",1,"die Freiheit · die Gesundheit","none"],
    ["-keit","f","rule",1,"die Möglichkeit · die Schwierigkeit","none"],
    ["-schaft","f","rule",1,"die Freundschaft · die Gesellschaft","none"],
    ["-ion","f","rule",1,"die Nation · die Diskussion · die Information","der Spion · das Stadion (not the suffix)"],
    ["-tät","f","rule",1,"die Universität · die Qualität","none"],
    ["-in","f","rule",1,"die Lehrerin · die Ärztin · die Kollegin","das Benzin · der Termin (not the suffix)"],
    ["-thek","f","rule",0,"die Bibliothek · die Diskothek","none"],
    ["-ei","f","strong",1,"die Bäckerei · die Polizei","das Ei · der Papagei · der Brei (not the suffix)"],
    ["-ie","f","strong",0,"die Familie · die Biologie","das Knie · das Genie"],
    ["-ik","f","strong",0,"die Musik · die Politik · die Technik","der Atlantik · der Pazifik · das Mosaik"],
    ["-ur","f","strong",0,"die Natur · die Kultur · die Frisur","das Abitur · das Futur"],
    ["-enz / -anz","f","strong",0,"die Konferenz · die Toleranz","der Tanz · der Kranz"],
    ["-age","f","strong",0,"die Garage · die Massage · die Etage","none common"],
    ["-e","f","tendency",1,"die Lampe · die Straße · die Sonne · die Tasche","der Name · der Käse · der Junge · das Auge · das Ende"],
    ["-a","f","tendency",0,"die Pizza · die Kamera","das Sofa · das Komma · das Thema"],
    ["-ling","m","rule",0,"der Frühling · der Schmetterling · der Lehrling","none"],
    ["-ismus","m","rule",0,"der Tourismus · der Optimismus","none"],
    ["-or","m","strong",0,"der Motor · der Doktor · der Autor","das Labor · das Tor"],
    ["-ig","m","strong",0,"der Honig · der König · der Essig","none common"],
    ["-ich","m","strong",0,"der Teppich · der Rettich","none common"],
    ["-ant","m","strong",0,"der Elefant · der Praktikant","das Restaurant"],
    ["-ent (person)","m","strong",0,"der Student · der Präsident","das Talent · das Patent"],
    ["-us","m","strong",0,"der Rhythmus · der Kaktus · der Bus","das Virus (also der Virus) · das Genus"],
    ["-er (doer)","m","strong",1,"der Lehrer · der Fahrer · der Computer","das Fenster · das Messer · die Mutter · die Butter"],
    ["-en","m","tendency",1,"der Garten · der Hafen · der Regen","das Essen and every verb used as a noun · das Zeichen"],
    ["-el","m","tendency",1,"der Löffel · der Apfel · der Schlüssel","die Gabel · die Kartoffel · das Segel · das Mittel"],
    ["-chen","n","rule",1,"das Mädchen · das Brötchen · das Häuschen","none"],
    ["-lein","n","rule",0,"das Fräulein · das Büchlein","none"],
    ["verb as noun","n","rule",1,"das Essen · das Schwimmen · das Lesen","none"],
    ["-ment","n","strong",0,"das Dokument · das Instrument","der Zement · der Moment (das Moment = factor)"],
    ["-um","n","strong",1,"das Museum · das Zentrum · das Studium","der Konsum · der Baum · der Raum (-aum is masculine)"],
    ["-tum","n","strong",0,"das Eigentum · das Christentum","der Irrtum · der Reichtum"],
    ["-ma","n","strong",0,"das Thema · das Klima · das Drama","die Firma"],
    ["-o","n","tendency",1,"das Auto · das Kino · das Radio","der Euro · der Zoo · die Avocado"],
    ["-nis","n","tendency",0,"das Ergebnis · das Zeugnis · das Geheimnis","die Erlaubnis · die Kenntnis · die Wildnis"],
    ["Ge- prefix","n","tendency",0,"das Gebäude · das Gebirge · das Gemüse","der Gedanke · der Geschmack · die Geduld · die Gefahr"]
  ],
  /* reliability: [label, share %, gender, note] (sorted high to low) */
  clues: [
    ["-ung · -heit · -keit · -schaft · -ion · -tät","f",100,"treated as rules"],
    ["-chen · -lein","n",100,"rule"],
    ["-ismus · -ling","m",100,"rule"],
    ["-e","f",90,"about 88–90 % feminine"],
    ["-er","m",85,"about 85 % masculine"],
    ["-en","m",80,"almost no feminine noun ends in -en"],
    ["one syllable","m",67,"about two in three"],
    ["-el","m",60,"a good bet"]
  ],
  semantic: [
    ["m","Days, months, seasons","der Montag · der Mai · der Winter","das Frühjahr"],
    ["m","Weather","der Regen · der Schnee · der Wind","das Gewitter · die Wolke · das Wetter"],
    ["m","Compass points, winds","der Norden · der Föhn","none common"],
    ["m","Alcoholic drinks","der Wein · der Sekt · der Whisky · der Schnaps","das Bier (and every beer: das Pils, das Weißbier, das Helle, das Radler)","It is a very old word: it was already neuter in Old High German (bior), more than 1,000 years ago, before the newer drinks joined the masculine group. Words keep the gender they are born with. Every beer type copies it: compounds end in -bier (the last part decides), short names (das Pils, das Helle) follow das Bier."],
    ["m","Coffee and tea drinks","der Kaffee · der Tee · der Kakao · der Espresso · der Cappuccino","die Schokolade (heiße Schokolade: the -e ending wins)"],
    ["m","Car brands","der BMW · der Audi","none common"],
    ["m","Male people and animals","der Vater · der Hahn · der Stier","none common"],
    ["f","Trees and flowers (most)","die Eiche · die Rose · die Tulpe","der Ahorn · der Flieder"],
    ["f","Numbers as nouns","die Eins · die Sieben · die Million","das Hundert · das Tausend"],
    ["f","Ships, most planes, motorbikes","die Titanic · die Boeing · die Harley","der Airbus · der Jumbo"],
    ["f","Most German rivers","die Elbe · die Donau · die Isar","der Rhein · der Main · der Neckar"],
    ["f","Female people and animals","die Mutter · die Kuh · die Henne","das Mädchen · das Fräulein (suffix wins)"],
    ["n","Young people and animals","das Kind · das Baby · das Kalb","none common"],
    ["n","Metals, most elements","das Gold · das Eisen · das Silber","der Stahl · die Bronze · all -stoff words (der Sauerstoff)"],
    ["n","Colours as nouns","das Rot · das Blau","none"],
    ["n","Languages as nouns","das Deutsch · das Englische","none"],
    ["n","Most countries and cities","(das) Deutschland · (das) Berlin","die Schweiz · die Türkei · der Iran · die USA"],
    ["n","Hotels, cinemas, cafés","das Hilton · das Kino · das Café","none common"],
    ["n","Fractions","das Drittel · das Viertel","die Hälfte"],
    ["n","Letters of the alphabet","das A · das B","none"]
  ],
  /* same word, different gender: [word, [[gender, meaning, example?], …]] */
  twins: [
    ["See",[["m","der See","lake","die Seen"],["f","die See","sea",""]]],
    ["Leiter",[["m","der Leiter","manager, head","die Leiter"],["f","die Leiter","ladder","die Leitern"]]],
    ["Kiefer",[["m","der Kiefer","jaw","die Kiefer"],["f","die Kiefer","pine tree","die Kiefern"]]],
    ["Band",[["m","der Band","volume (of a book)","die Bände"],["f","die Band","music band","die Bands"],["n","das Band","ribbon, tape","die Bänder"]]],
    ["Steuer",[["f","die Steuer","tax","die Steuern"],["n","das Steuer","steering wheel","die Steuer"]]],
    ["Tor",[["m","der Tor","fool (rare, literary)","die Toren"],["n","das Tor","gate; goal","die Tore"]]],
    ["Moment",[["m","der Moment","moment, instant","die Momente"],["n","das Moment","factor, aspect","die Momente"]]],
    ["Gehalt",[["m","der Gehalt","content (e.g. Alkoholgehalt)","die Gehalte"],["n","das Gehalt","salary","die Gehälter"]]],
    ["Mark",[["f","die Mark","old German currency",""],["n","das Mark","bone marrow",""]]],
    ["Teil",[["m","der Teil","part of a whole","die Teile"],["n","das Teil","piece, component","die Teile"]]]
  ],

  /* regional: [word, standard, variant, where] */
  regional: [
    ["Cola","das Cola","die Cola","both are correct (Duden lists both); usage varies by region and speaker"],
    ["Butter","die Butter","der Butter","der Butter is regional: southern Germany, Austria, Switzerland. Standard is die Butter."],
    ["Joghurt","der Joghurt","das Joghurt","both are correct"],
    ["Virus","das Virus","der Virus","everyday speech"],
    ["E-Mail","die E-Mail","das E-Mail","das E-Mail is also heard in Austria and Switzerland. Standard is die E-Mail."],
    ["Radio","das Radio","der Radio","Switzerland"],
    ["Teller","der Teller","das Teller","Swiss dialects"]
  ],
  flow: [
    ["Compound word?","Only the <b>last part</b> counts.","das Haus + die Tür → <b class=\"die\">die</b> Haustür · die Hand + der Schuh → <b class=\"der\">der</b> Handschuh",1],
    ["A rule ending?","Then you are done. The ending beats the meaning.","-ung -heit -keit -schaft -ion -tät -in → <b class=\"die\">die</b> · -chen -lein, verb as noun → <b class=\"das\">das</b> · -ling -ismus → <b class=\"der\">der</b>. So: <b class=\"das\">das</b> Mädchen.",1],
    ["Person or animal?","Use the natural sex. Young ones are neuter.","<b class=\"der\">der</b> Vater · <b class=\"die\">die</b> Mutter · <b class=\"das\">das</b> Kind",1],
    ["Meaning group?","Days, months, weather, alcohol → <b class=\"der\">der</b>. Trees, flowers, numbers, ships → <b class=\"die\">die</b>. Metals, colours, languages, hotels → <b class=\"das\">das</b>.","<b class=\"der\">der</b> Montag · <b class=\"die\">die</b> Rose · <b class=\"das\">das</b> Gold",0],
    ["Shape and ending?","Good bets, not rules.","-e → <b class=\"die\">die</b> (≈ 90 %) · one syllable, -en, -er, -el → <b class=\"der\">der</b> · -um, -ment, -ma, -o → mostly <b class=\"das\">das</b>",1],
    ["Still unsure?","A true exception. Learn it as one unit: article, word, plural.","das Messer, die Messer",1]
  ]
};
