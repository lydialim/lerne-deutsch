/* Dialogues (read by texte.js on dialoge.html; the stories are in stories-data.js).
   Markup inside German text: {der:Kaffee} {die:Milch} {das:Brot} {pl:Äpfel} = noun in its gender colour, {v:steht} = verb.
   Story panel: [emoji, German, word-by-word English, natural English, number pronunciation (optional)].
   Quiz item: [German statement, English, true|false]. */
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
