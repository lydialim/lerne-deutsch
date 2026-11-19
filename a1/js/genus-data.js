/* Data for genus.html (how German assigns der / die / das).
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
    ["-o","n","strong",1,"das Auto · das Kino · das Radio","der Euro · der Zoo · die Avocado"],
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
    ["-en","m",80,"no feminine noun ends in -en"],
    ["one syllable","m",67,"about two in three"],
    ["-el","m",60,"a good bet"]
  ],
  semantic: [
    ["m","Days, months, seasons","der Montag · der Mai · der Winter","das Frühjahr"],
    ["m","Weather","der Regen · der Schnee · der Wind","das Gewitter · die Wolke · das Wetter"],
    ["m","Compass points, winds","der Norden · der Föhn","none common"],
    ["m","Alcoholic drinks","der Wein · der Sekt · der Whisky","das Bier"],
    ["m","Car brands","der BMW · der Audi","none common"],
    ["m","Male people and animals","der Vater · der Hahn · der Stier","none common"],
    ["f","Trees and flowers (most)","die Eiche · die Rose · die Tulpe","der Ahorn · der Flieder"],
    ["f","Numbers as nouns","die Eins · die Sieben · die Million","das Hundert · das Tausend"],
    ["f","Ships, planes, motorbikes","die Titanic · die Boeing · die Harley","none common"],
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
    ["See",[["m","lake"],["f","sea"]]],
    ["Leiter",[["m","manager, leader"],["f","ladder"]]],
    ["Kiefer",[["m","jaw"],["f","pine tree"]]],
    ["Band",[["m","volume (of a book)"],["f","band (music)"],["n","ribbon"]]],
    ["Steuer",[["f","tax"],["n","steering wheel"]]],
    ["Tor",[["m","fool (old)"],["n","gate; goal"]]],
    ["Moment",[["m","instant"],["n","factor"]]],
    ["Gehalt",[["m","content"],["n","salary"]]],
    ["Mark",[["f","old German currency"],["n","marrow"]]],
    ["Teil",[["m","part of a whole"],["n","piece, component"]]]
  ],
  /* regional: [word, standard, variant, where] */
  regional: [
    ["Cola","das Cola or die Cola","both are listed as correct","die: more in the north · das: more in the south, Austria, Switzerland"],
    ["Butter","die Butter","der Butter","southern Germany, Austria, Switzerland"],
    ["Joghurt","der Joghurt","das Joghurt","Austria, parts of Germany"],
    ["Virus","das Virus","der Virus","everyday speech"],
    ["E-Mail","die E-Mail","das E-Mail","Austria, Switzerland"],
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
