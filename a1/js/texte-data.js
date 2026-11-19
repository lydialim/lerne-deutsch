/* Stories and dialogues (read by texte.js on geschichten.html and dialoge.html).
   Markup inside German text: {der:Kaffee} {die:Milch} {das:Brot} {pl:Äpfel} = noun in its gender colour, {v:steht} = verb.
   Story panel: [emoji, German, word-by-word English, natural English, number pronunciation (optional)].
   Quiz item: [German statement, English, true|false]. */
const STORIES = [
  { id: "lea", emoji: "⏰", title: "Leas Tag", en: "Lea's day", tip: ["Zeit: um + Zahl + Uhr. Trennbares Verb: aufstehen → Lea {v:steht} um 7 Uhr {v:auf}.", "Time: um + number + Uhr. Separable verb: the second part goes to the end."],
    panels: [
      ["⏰", "Lea {v:steht} um 7 Uhr {v:auf}.", "Lea · gets · at · 7 · o'clock · up", "Lea gets up at seven o'clock.", "7 = sieben (ZEE-ben)"],
      ["☕", "Sie {v:trinkt} {der:Kaffee} und {v:isst} {das:Brot}.", "She · drinks · coffee · and · eats · bread", "She drinks coffee and eats bread."],
      ["🚌", "Um 8 Uhr {v:fährt} sie mit dem {der:Bus} zur Arbeit.", "At · 8 · o'clock · drives · she · with · the · bus · to-the · work", "At eight she takes the bus to work.", "8 = acht (AKHT)"],
      ["💻", "Sie {v:arbeitet} im {das:Büro}.", "She · works · in-the · office", "She works in the office."],
      ["🍕", "Um 12 Uhr {v:isst} sie {die:Pizza}.", "At · 12 · o'clock · eats · she · pizza", "At twelve she eats pizza.", "12 = zwölf (ZVOELF)"],
      ["🏠", "Um 17 Uhr {v:geht} sie nach Hause.", "At · 17 · o'clock · goes · she · to · home", "At five in the afternoon she goes home.", "17 = siebzehn (ZEEP-tsayn)"],
      ["😴", "Um 22 Uhr ist sie müde. Gute Nacht!", "At · 22 · o'clock · is · she · tired · good · night", "At ten at night she is tired. Good night!", "22 = zweiundzwanzig (TSVAI-oont-TSVAN-tsikh)"]
    ],
    quiz: [["Lea fährt mit dem Bus zur Arbeit.", "Lea takes the bus to work.", true], ["Lea isst um 17 Uhr Pizza.", "Lea eats pizza at 5 pm.", false], ["Lea steht um 7 Uhr auf.", "Lea gets up at 7.", true]] },
  { id: "markt", emoji: "🛒", title: "Auf dem Markt", en: "At the market", tip: ["Was kostet …? und Ich nehme …. Preise: 2,50 € = zwei Euro fünfzig.", "Ask the price with Was kostet …? and decide with Ich nehme …."],
    panels: [
      ["🛒", "Tom ist auf dem {der:Markt}.", "Tom · is · on · the · market", "Tom is at the market."],
      ["🍎", "Er möchte ein Kilo {pl:Äpfel}. Was {v:kostet} das?", "He · would-like · a · kilo · apples · what · costs · that", "He wants a kilo of apples. What does that cost?"],
      ["💶", "Ein Kilo {v:kostet} 2,50 Euro.", "One · kilo · costs · 2.50 · euro", "A kilo costs 2.50 euros.", "2,50 = zwei Euro fünfzig (TSVAI OY-ro FUENF-tsikh)"],
      ["🥛", "Er {v:kauft} auch {die:Milch} und {das:Brot}.", "He · buys · also · milk · and · bread", "He also buys milk and bread."],
      ["🧀", "Der {der:Käse} {v:schmeckt} gut. Er {v:nimmt} ein Stück.", "The · cheese · tastes · good · he · takes · a · piece", "The cheese tastes good. He takes a piece."],
      ["👍", "Das {v:macht} 8,30 Euro. – Bitte schön! – Danke, tschüss!", "That · makes · 8.30 · euro · please · nice · thanks · bye", "That is 8.30 euros. – Here you go! – Thanks, bye!", "8,30 = acht Euro dreißig (AKHT OY-ro DRAI-sikh)"]
    ],
    quiz: [["Ein Kilo Äpfel kostet 2,50 Euro.", "A kilo of apples costs 2.50.", true], ["Tom kauft keine Milch.", "Tom does not buy milk.", false]] },
  { id: "grill", emoji: "🔥", title: "Die Grillparty", en: "The barbecue party", tip: ["kein / keine verneint ein Nomen: Sie isst keine Wurst (die Wurst).", "kein/keine says \"not a / no\" in front of a noun. Match it to the gender."],
    panels: [
      ["🔥", "Am Samstag {v:ist} eine {die:Grillparty}.", "On · Saturday · is · a · barbecue-party", "On Saturday there is a barbecue party."],
      ["🥩", "Es {v:gibt} {die:Wurst}, {das:Fleisch} und {der:Salat}.", "There · gives · sausage · meat · and · salad", "There is sausage, meat and salad."],
      ["🥗", "Anna {v:ist} Vegetarierin. Sie {v:isst} keine {die:Wurst}.", "Anna · is · vegetarian · she · eats · no · sausage", "Anna is a vegetarian. She eats no sausage."],
      ["🍉", "Sie {v:nimmt} {der:Salat} und {das:Brot}. Das {v:schmeckt} lecker!", "She · takes · salad · and · bread · that · tastes · delicious", "She takes salad and bread. It tastes delicious!"],
      ["💧", "Noch ein {das:Wasser}? – Ja, gern!", "Another · a · water · yes · gladly", "Another water? – Yes, please!"],
      ["😋", "Schmeckt's? – Sehr gut. Ich {v:bin} satt. Danke!", "Tastes-it · very · good · I · am · full · thanks", "Does it taste good? – Very good. I am full. Thanks!"]
    ],
    quiz: [["Anna isst keine Wurst.", "Anna eats no sausage.", true], ["Es gibt keinen Salat.", "There is no salad.", false]] },
  { id: "wochenende", emoji: "📅", title: "Mein Wochenende", en: "My weekend", tip: ["am + Tag: am Samstag, am Sonntag. sein → seine (die Mutter, die Eltern).", "am + day of the week. Use seine in front of die-words and plurals."],
    panels: [
      ["😴", "Am Samstag {v:schläft} Ben lange.", "On · Saturday · sleeps · Ben · long", "On Saturday Ben sleeps in."],
      ["🚴", "Um 10 Uhr {v:fährt} er {das:Fahrrad}.", "At · 10 · o'clock · rides · he · bicycle", "At ten he rides his bike.", "10 = zehn (TSAYN)"],
      ["🛍️", "Am Nachmittag {v:geht} er einkaufen.", "In-the · afternoon · goes · he · shopping", "In the afternoon he goes shopping."],
      ["👨‍👩‍👧", "Am Sonntag {v:besucht} er seine {pl:Eltern}.", "On · Sunday · visits · he · his · parents", "On Sunday he visits his parents."],
      ["🎂", "Seine {die:Mutter} {v:ist} 50 Jahre alt.", "His · mother · is · 50 · years · old", "His mother is 50 years old.", "50 = fünfzig (FUENF-tsikh)"],
      ["🎉", "Sie {v:feiern} zusammen. Es {v:ist} schön!", "They · celebrate · together · it · is · nice", "They celebrate together. It is lovely!"]
    ],
    quiz: [["Ben besucht seine Eltern am Samstag.", "Ben visits his parents on Saturday.", false], ["Bens Mutter ist 50 Jahre alt.", "Ben's mother is 50.", true]] },
  { id: "weber", emoji: "👨‍👩‍👧‍👦", title: "Familie Weber", en: "The Weber family", tip: ["Plural: die Zimmer, die Eltern. Die Wohnung hat 3 Zimmer (nach der Zahl: Plural).", "After a number the noun is plural: drei Zimmer."],
    panels: [
      ["👨‍👩‍👧‍👦", "Das {v:ist} {die:Familie} Weber. Sie {v:sind} vier {pl:Personen}.", "That · is · family · Weber · they · are · four · persons", "This is the Weber family. They are four people.", "4 = vier (FEER)"],
      ["🏙️", "Sie {v:wohnen} in München.", "They · live · in · Munich", "They live in Munich."],
      ["🏠", "Die {die:Wohnung} {v:hat} 3 {pl:Zimmer}, {die:Küche} und {das:Bad}.", "The · flat · has · 3 · rooms · kitchen · and · bathroom", "The flat has three rooms, a kitchen and a bathroom.", "3 = drei (DRAI)"],
      ["🐱", "Sie {v:haben} eine {die:Katze}. Sie {v:heißt} Mimi.", "They · have · a · cat · she · is-called · Mimi", "They have a cat. Her name is Mimi."],
      ["💼", "Herr Weber {v:ist} Lehrer. Frau Weber {v:ist} Ärztin.", "Mr · Weber · is · teacher · Mrs · Weber · is · doctor", "Mr Weber is a teacher. Mrs Weber is a doctor."],
      ["🌳", "Am Sonntag {v:gehen} sie in den {der:Park}.", "On · Sunday · go · they · into · the · park", "On Sunday they go to the park."]
    ],
    quiz: [["Die Familie Weber wohnt in Berlin.", "The Webers live in Berlin.", false], ["Frau Weber ist Ärztin.", "Mrs Weber is a doctor.", true]] }
];

/* Dialogue line: [speaker "A" | "B", German, word-by-word English, natural English, number pronunciation (optional)] */
const DIALOGS = [
  { id: "vorstellen", emoji: "👋", title: "Sich vorstellen", en: "Introducing yourself", who: ["Mia", "Max"], tip: ["Sie (formal) bei Fremden: Wie heißen Sie? Woher kommen Sie?", "Use formal Sie with strangers. The verb ends in -en: heißen Sie, kommen Sie."],
    lines: [
      ["A", "Guten Tag! Ich {v:heiße} Mia. Und wie {v:heißen} Sie?", "Good · day · I · am-called · Mia · and · how · are-called · you", "Hello! My name is Mia. And what is your name?"],
      ["B", "Guten Tag, ich {v:bin} Max Weber.", "Good · day · I · am · Max · Weber", "Hello, I am Max Weber."],
      ["A", "Woher {v:kommen} Sie?", "Where-from · come · you", "Where are you from?"],
      ["B", "Ich {v:komme} aus Deutschland. Und Sie?", "I · come · from · Germany · and · you", "I come from Germany. And you?"],
      ["A", "Ich {v:komme} aus Malaysia. Ich {v:wohne} in München.", "I · come · from · Malaysia · I · live · in · Munich", "I come from Malaysia. I live in Munich."],
      ["B", "Sehr angenehm! – Freut mich.", "Very · pleasant · pleases · me", "Pleased to meet you!"]
    ] },
  { id: "cafe", emoji: "☕", title: "Im Café bestellen", en: "Ordering in a café", who: ["Kellner", "Gast"], tip: ["Ich möchte + Nomen: einen Kaffee (der), eine Cola (die), ein Wasser (das).", "Ich möchte … with the right article: der → einen, die → eine, das → ein."],
    lines: [
      ["A", "Guten Tag! Was {v:möchten} Sie?", "Good · day · what · would-like · you", "Hello! What would you like?"],
      ["B", "Ich {v:möchte} einen {der:Kaffee}, bitte.", "I · would-like · a · coffee · please", "I would like a coffee, please."],
      ["A", "Gern. Sonst noch etwas?", "Gladly · otherwise · still · something", "Certainly. Anything else?"],
      ["B", "Ja, ein Stück {der:Kuchen}.", "Yes · a · piece · cake", "Yes, a piece of cake."],
      ["A", "Das {v:macht} 5,80 Euro.", "That · makes · 5.80 · euro", "That is 5.80 euros.", "5,80 = fünf Euro achtzig (FUENF OY-ro AKH-tsikh)"],
      ["B", "Hier, bitte. Stimmt so.", "Here · please · is-correct · so", "Here you are. Keep the change."],
      ["A", "Danke schön! Auf Wiedersehen!", "Thanks · beautiful · on · seeing-again", "Thank you very much! Goodbye!"]
    ] },
  { id: "einkaufen", emoji: "🛍️", title: "Einkaufen", en: "Shopping", who: ["Verkäuferin", "Kunde"], tip: ["Ich nehme es: es steht für das T-Shirt (das). Kann ich …? fragt höflich.", "Es replaces a das-noun. Kann ich …? is a polite question; the verb goes last."],
    lines: [
      ["A", "Guten Tag! {v:Kann} ich Ihnen {v:helfen}?", "Good · day · can · I · you · help", "Hello! Can I help you?"],
      ["B", "Ja, ich {v:suche} ein {das:T-Shirt}.", "Yes · I · look-for · a · T-shirt", "Yes, I am looking for a T-shirt."],
      ["A", "Welche Größe?", "Which · size", "Which size?"],
      ["B", "Größe M, bitte.", "Size · M · please", "Size M, please."],
      ["A", "Hier, bitte. Es {v:kostet} 15 Euro.", "Here · please · it · costs · 15 · euro", "Here you go. It costs 15 euros.", "15 = fünfzehn (FUENF-tsayn)"],
      ["B", "Ich {v:nehme} es. {v:Kann} ich mit Karte {v:zahlen}?", "I · take · it · can · I · with · card · pay", "I'll take it. Can I pay by card?"],
      ["A", "Ja, natürlich.", "Yes · of-course", "Yes, of course."]
    ] },
  { id: "termin", emoji: "📞", title: "Einen Termin machen", en: "Making an appointment", who: ["Praxis", "Patientin"], tip: ["am + Tag, um + Uhrzeit: am Dienstag um 14 Uhr. Ich möchte einen Termin (der).", "Day with am, time with um."],
    lines: [
      ["A", "Praxis Dr. Becker, guten Tag.", "Practice · Dr · Becker · good · day", "Dr. Becker's surgery, hello."],
      ["B", "Guten Tag, ich {v:möchte} einen {der:Termin}.", "Good · day · I · would-like · an · appointment", "Hello, I would like an appointment."],
      ["A", "Am Dienstag um 10 Uhr ist leider nichts frei. Um 14 Uhr?", "On · Tuesday · at · 10 · o'clock · is · unfortunately · nothing · free · at · 14 · o'clock", "Unfortunately nothing is free on Tuesday at ten. At two in the afternoon?", "10 = zehn (TSAYN) · 14 = vierzehn (FEER-tsayn)"],
      ["B", "Ja, das {v:passt}. Danke!", "Yes · that · fits · thanks", "Yes, that suits me. Thanks!"],
      ["A", "Wie {v:ist} Ihr {der:Name}?", "How · is · your · name", "What is your name?"],
      ["B", "Mia Schmidt. Bis Dienstag!", "Mia · Schmidt · until · Tuesday", "Mia Schmidt. See you Tuesday!"]
    ] },
  { id: "weg", emoji: "🧭", title: "Nach dem Weg fragen", en: "Asking the way", who: ["Passantin", "Tourist"], tip: ["Befehl mit Sie: Gehen Sie geradeaus, dann links. Wo ist der Bahnhof?", "Polite command: verb first, then Sie."],
    lines: [
      ["B", "Entschuldigung, wo {v:ist} der {der:Bahnhof}?", "Excuse-me · where · is · the · station", "Excuse me, where is the station?"],
      ["A", "{v:Gehen} Sie geradeaus, dann links.", "Go · you · straight · then · left", "Go straight on, then left."],
      ["B", "{v:Ist} es weit?", "Is · it · far", "Is it far?"],
      ["A", "Nein, nur 5 Minuten.", "No · only · 5 · minutes", "No, only five minutes.", "5 = fünf (FUENF)"],
      ["B", "Vielen Dank!", "Many · thanks", "Thank you very much!"],
      ["A", "Gern geschehen!", "Gladly · happened", "You're welcome!"]
    ] }
];
