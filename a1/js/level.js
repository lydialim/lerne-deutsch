/* A1 level config: menu entries used by assets/js/layout.js and the storage prefix used by assets/js/common.js. */
window.LEVEL = {
  id: "a1",
  level: "A1",
  title: "Deutsch A1 Trainer",
  /* Top navigation (wide screens) and footer links:
     [href, short label, English / full name (tooltip), group "learn" | "tools", part letter] */
  pages: [
    ["index.html", "Übersicht", "overview", "learn", ""],
    ["grammatik.html", "Grammatik", "Teil A · grammar", "learn", "A"],
    ["zahlen.html", "Zahlen", "Teil B · letters & numbers", "learn", "B"],
    ["themen.html", "Themen", "Teil C · topics", "learn", "C"],
    ["pruefung.html", "Prüfung", "Teil D · the exam", "learn", "D"],
    ["karten.html", "Bildkarten", "picture cards", "tools", ""],
    ["spickzettel.html", "Spickzettel", "cheat sheet", "tools", ""],
    ["tests.html", "Tests", "practise", "tools", ""]
  ],
  mix: "tests.html#mix",
  /* Lesson menu (bottom sheet on phones). Keep in step with the lessons on each page:
     [letter, German, English, page, [[section id, number, German, English], …]] */
  parts: [
    ["A", "Grammatik", "grammar", "grammatik.html", [
      ["l-types", "1", "Wortarten", "word types"],
      ["l-articles", "2", "der, die, das", "the: gender"],
      ["l-ein", "3", "ein, eine, kein, mein", "a / an, not a, my"],
      ["l-poss", "3+", "mein, dein, sein …", "my, your, his …"],
      ["l-plural", "4", "Singular und Plural", "one and many"],
      ["l-verbs", "5", "Verben, du oder Sie, war und hatte", "verbs, you (formal / informal), was and had"],
      ["l-dusie", "5+", "du oder Sie?", "informal or formal you"],
      ["l-war", "5+", "war und hatte", "was and had"],
      ["l-w", "6", "Satzbau, W-Fragen, Modalverben", "word order, questions, modal verbs"],
      ["l-modal", "6+", "Modalverben", "can, must, want, may, would like"],
      ["l-qa", "7", "Fragen, Antworten, längere Sätze", "questions, answers, longer sentences"],
      ["l-satz", "7+", "Längere Sätze bauen", "building longer sentences"]]],
    ["B", "Buchstaben & Zahlen", "letters & numbers", "zahlen.html", [
      ["l-abc", "8", "Das Alphabet", "the alphabet"],
      ["l-numbers", "9", "Zahlen, Uhrzeit, Preise, Kalender", "numbers, time, prices, calendar"],
      ["l-cal", "9+", "Kalender", "days, months, date"]]],
    ["C", "Themen", "topics", "themen.html", [
      ["l-me", "10", "Über mich", "about me"],
      ["l-work", "11", "Arbeit und Beruf", "work and job"],
      ["l-act", "12", "Aktivitäten", "activities, free time"],
      ["l-weg", "13", "Wegbeschreibung", "directions"],
      ["l-essen", "14", "Essen, Trinken, Einkaufen", "eating, drinking, shopping"],
      ["l-familie", "15", "Familie", "family"],
      ["l-wohnung", "16", "Wohnung", "flat / home"],
      ["l-laender", "17", "Länder, Sprachen, Farben", "countries, languages, colours"],
      ["l-wetter", "18", "Wetter", "weather"],
      ["l-koerper", "19", "Körper und Gesundheit", "body and health"],
      ["l-kleidung", "20", "Kleidung", "clothes"],
      ["l-verkehr", "21", "Verkehr und Tickets", "transport and tickets"],
      ["l-hotelpost", "22", "Hotel und Post", "hotel and post office"]]],
    ["D", "Prüfung", "the exam", "pruefung.html", [
      ["l-exam", "23", "Goethe-Zertifikat A1", "the A1 exam"],
      ["l-hl", "23+", "Hören und Lesen üben", "listening and reading"],
      ["l-schreiben", "✎", "Schreiben üben", "writing checker"],
      ["l-sprechen", "🎙", "Sprechen üben", "speaking practice"],
      ["l-tips", "★", "Lerntipps", "study tips"]]]
  ]
};
