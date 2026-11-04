/* A1 level config: menu entries used by assets/js/layout.js and the storage prefix used by assets/js/common.js. */
window.LEVEL = {
  id: "a1",
  level: "A1",
  title: "Deutsch A1 Trainer",
  pages: [
    ["index.html", "Übersicht", "overview"],
    ["grammatik.html", "A · Grammatik", ""],
    ["zahlen.html", "B · Buchstaben & Zahlen", ""],
    ["themen.html", "C · Themen", ""],
    ["pruefung.html", "D · Prüfung", ""],
    ["spickzettel.html", "Spickzettel", "cheat sheet"],
    ["tests.html", "Tests", ""]
  ],
  mix: "tests.html#mix",
  /* Lesson menu (bottom sheet on phones). Keep in step with the lessons on each page:
     [letter, German, English, page, [[section id, number, German, English], …]] */
  parts: [
    ["A", "Grammatik", "grammar", "grammatik.html", [
      ["l-types", "1", "Wortarten", "word types"],
      ["l-articles", "2", "der, die, das", "the: gender"],
      ["l-ein", "3", "ein, eine, kein", "a / an, not a"],
      ["l-poss", "3+", "mein, dein, sein …", "my, your, his …"],
      ["l-plural", "4", "Singular und Plural", "one and many"],
      ["l-verbs", "5", "Verben im Präsens", "verbs, present tense"],
      ["l-war", "5+", "war und hatte", "was and had"],
      ["l-w", "6", "Satzbau und W-Fragen", "word order, W-questions"],
      ["l-modal", "6+", "Modalverben", "can, must, want, may, would like"],
      ["l-qa", "7", "Fragen und Antworten", "asking and answering"],
      ["l-satz", "7+", "Längere Sätze bauen", "building longer sentences"]]],
    ["B", "Buchstaben & Zahlen", "letters & numbers", "zahlen.html", [
      ["l-abc", "8", "Das Alphabet", "the alphabet"],
      ["l-numbers", "9", "Zahlen, Uhrzeit, Preise", "numbers, time, prices"],
      ["l-cal", "9+", "Kalender", "days, months, date"]]],
    ["C", "Themen", "topics", "themen.html", [
      ["l-me", "10", "Über mich", "about me"],
      ["l-work", "11", "Arbeit und Beruf", "work and job"],
      ["l-act", "12", "Aktivitäten", "activities, free time"],
      ["l-weg", "13", "Wegbeschreibung", "directions"],
      ["l-essen", "14", "Essen, Trinken, Einkaufen", "eating, drinking, shopping"],
      ["l-familie", "15", "Familie", "family"],
      ["l-wohnung", "16", "Wohnung", "flat / home"],
      ["l-laender", "17", "Länder, Sprachen, Farben", "countries, languages, colours"]]],
    ["D", "Prüfung", "the exam", "pruefung.html", [
      ["l-exam", "18", "Goethe-Zertifikat A1", "the A1 exam"],
      ["l-hl", "18+", "Hören und Lesen üben", "listening and reading"],
      ["l-tips", "★", "Lerntipps", "study tips"]]]
  ]
};
