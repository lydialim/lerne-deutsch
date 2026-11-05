/* Bildkarten: picture flashcards (cards mode) and "guess the article" (guess mode).
   Data: "emoji|article|word|English|plural?|extra?". plural = the plural without "die" (empty = look it up in NOUNS / VOCAB, "-" = none, "PL" = the word itself is a plural, e.g. Schuhe: shown purple and left out of the der/die/das game).
   extra = a short hint shown on the back: a related adjective, the verb forms, an example. For colours the first field is a CSS colour starting with #. Verbs and adjectives have an empty article. */
/* Pictures that have no emoji: "svg:<name>" in the data below. Sized by the parent's font-size. */
const SVGPIC = {
  table: '<svg class="psvg" viewBox="0 0 64 64"><rect x="6" y="20" width="52" height="8" rx="2" fill="#c68a4e"/><rect x="10" y="28" width="5" height="26" rx="1.5" fill="#a56a33"/><rect x="49" y="28" width="5" height="26" rx="1.5" fill="#a56a33"/><rect x="15" y="28" width="34" height="3" fill="#a56a33" opacity=".55"/></svg>',
  desk: '<svg class="psvg" viewBox="0 0 64 64"><rect x="4" y="18" width="56" height="7" rx="2" fill="#c68a4e"/><rect x="8" y="25" width="4" height="29" rx="1.5" fill="#a56a33"/><rect x="38" y="25" width="18" height="29" rx="2" fill="#a56a33"/><path d="M41 34h12M41 44h12" stroke="#c68a4e" stroke-width="2"/><circle cx="47" cy="30" r="1.4" fill="#f3d9b1"/><circle cx="47" cy="39" r="1.4" fill="#f3d9b1"/><circle cx="47" cy="49" r="1.4" fill="#f3d9b1"/></svg>',
  grid: '<svg class="psvg" viewBox="0 0 64 64"><rect x="8" y="12" width="48" height="40" rx="3" fill="#fff" stroke="#546e7a" stroke-width="2"/><rect x="8" y="12" width="48" height="10" rx="3" fill="#1e5bd6"/><path d="M8 32h48M8 42h48M24 22v30M40 22v30" stroke="#546e7a" stroke-width="2"/></svg>',
  flask: '<svg class="psvg" viewBox="0 0 64 64"><rect x="22" y="8" width="20" height="9" rx="3" fill="#455a64"/><rect x="18" y="17" width="28" height="39" rx="7" fill="#90a4ae"/><rect x="18" y="30" width="28" height="4" fill="#607d8b"/><path d="M46 24c8 0 8 16 0 16" fill="none" stroke="#455a64" stroke-width="3"/></svg>'
};
const picGlyph = p => p.startsWith("svg:") ? SVGPIC[p.slice(4)] : p;

const KARTEN = [
 ["Essen", "food", `🍎|der|Apfel|apple
🍌|die|Banane|banana
🍊|die|Orange|orange|Orangen
🍓|die|Erdbeere|strawberry|Erdbeeren
🍇|die|Traube|grape|Trauben
🍞|das|Brot|bread
🥖|das|Brötchen|bread roll
🧈|die|Butter|butter
🧀|der|Käse|cheese
🥚|das|Ei|egg
🥛|die|Milch|milk
☕|der|Kaffee|coffee
🍵|der|Tee|tea
🧃|der|Saft|juice
💧|das|Wasser|water
🍺|das|Bier|beer
🍷|der|Wein|wine
🍚|der|Reis|rice
🍝|die|Nudeln|noodles, pasta|-|only plural (singular: die Nudel)
🥔|die|Kartoffel|potato
🍅|die|Tomate|tomato
🥕|die|Karotte|carrot|Karotten
🥗|der|Salat|salad
🍕|die|Pizza|pizza|Pizzen
🥩|das|Fleisch|meat
🍗|das|Hähnchen|chicken
🐟|der|Fisch|fish
🍰|der|Kuchen|cake
🍫|die|Schokolade|chocolate|-`],
 ["Einkaufen", "shopping", `🛒|das|Einkaufen|shopping|-|Ich gehe einkaufen. (I go shopping.)
🏪|der|Markt|market|Märkte
🥐|die|Bäckerei|bakery|Bäckereien
🧺|der|Supermarkt|supermarket|Supermärkte
🏬|das|Geschäft|shop, store|Geschäfte
💳|die|Kasse|checkout, till|Kassen
💶|das|Geld|money|-`],
 ["Familie und Leute", "family and people", `👩|die|Mutter|mother
👨|der|Vater|father
👨‍👩‍👧|die|Familie|family
👦|der|Bruder|brother
👧|die|Schwester|sister
👨‍👦|der|Sohn|son
👩‍👧|die|Tochter|daughter
👵|die|Oma|grandma
👴|der|Opa|grandpa
👶|das|Baby|baby
🧒|das|Kind|child
🐶|der|Hund|dog
🐱|die|Katze|cat
🧍|die|Person|person|Personen
👥|die|Leute|people|PL|only plural: viele Leute
🧑‍🤝‍🧑|der|Mensch|human being, people|Menschen`],
 ["Wohnung", "home", `🏠|das|Haus|house
🏢|die|Wohnung|flat
🚪|die|Tür|door
🪟|das|Fenster|window
🍳|die|Küche|kitchen
🛏️|das|Schlafzimmer|bedroom
🛁|das|Badezimmer|bathroom|Badezimmer
🚿|die|Dusche|shower
🛏|das|Bett|bed
🛋️|das|Sofa|sofa
🪑|der|Stuhl|chair
svg:table|der|Tisch|table
💡|die|Lampe|lamp
📺|der|Fernseher|television
🧊|der|Kühlschrank|fridge
🪞|der|Spiegel|mirror
svg:desk|der|Schreibtisch|desk|Schreibtische
🪴|die|Pflanze|plant|Pflanzen
🔑|der|Schlüssel|key
⏰|die|Uhr|clock, watch`],
 ["Alltag", "everyday things", `📱|das|Handy|mobile phone
svg:flask|die|Thermoskanne|flask (thermos)|Thermoskannen
👜|die|Tasche|bag
👓|die|Brille|glasses
📰|die|Zeitung|newspaper
☂️|der|Regenschirm|umbrella`],
 ["Kleidung", "clothes", `👕|das|T-Shirt|T-shirt|T-Shirts
👔|das|Hemd|shirt
👖|die|Hose|trousers
👗|das|Kleid|dress
🧥|die|Jacke|jacket
👟|die|Schuhe|shoes|PL|singular: der Schuh
🧦|die|Socken|socks|PL|singular: die Socke
🧢|die|Mütze|cap|Mützen
🧣|der|Schal|scarf|Schals
🧤|die|Handschuhe|gloves|PL|singular: der Handschuh`],
 ["Farben", "colours", `#d32f2f||rot|red
#1e5bd6||blau|blue
#2e9e4f||grün|green
#f2c200||gelb|yellow
#111111||schwarz|black
#ffffff||weiß|white
#7a4a21||braun|brown
#8c8c8c||grau|grey
#f28c00||orange|orange
#f47fb0||rosa|pink
#8e44ad||lila|purple`],
 ["Körper", "body", `🙂|der|Kopf|head|Köpfe
👁️|das|Auge|eye|Augen
👂|das|Ohr|ear|Ohren
👃|die|Nase|nose|Nasen
👄|der|Mund|mouth|Münder
🦷|der|Zahn|tooth|Zähne
💪|der|Arm|arm|Arme
✋|die|Hand|hand|Hände
🦵|das|Bein|leg|Beine
🦶|der|Fuß|foot|Füße
💊|die|Tablette|tablet|Tabletten`],
 ["Berufe", "jobs", `👨‍🏫|der|Lehrer|teacher (male)
👩‍🏫|die|Lehrerin|teacher (female)
👨‍⚕️|der|Arzt|doctor (male)
👩‍⚕️|die|Ärztin|doctor (female)
👨‍🍳|der|Koch|cook (male)|Köche
👩‍🍳|die|Köchin|cook (female)|Köchinnen
🧑‍🎓|der|Student|student|Studenten
👮|der|Polizist|police officer|Polizisten
👷|der|Bauarbeiter|construction worker|Bauarbeiter
🧑‍🔧|der|Mechaniker|mechanic|Mechaniker
🧑‍✈️|der|Pilot|pilot|Piloten
🧑‍💼|der|Buchhalter|accountant
📋|der|Projektmanager|project manager
🤵|der|Kellner|waiter
🤵‍♀️|die|Kellnerin|waitress
📐|der|Architekt|architect
📐|die|Architektin|architect (female)`],
 ["Schule und Büro", "school and office", `svg:desk|der|Schreibtisch|desk|Schreibtische
✏️|der|Bleistift|pencil|Bleistifte
🖊️|der|Kuli|pen
📓|das|Heft|exercise book
📖|das|Buch|book
📏|das|Lineal|ruler|Lineale
🎒|die|Schultasche|school bag|Schultaschen
🏫|die|Schule|school
🚪|die|Tür|door
🪟|das|Fenster|window
💻|der|Computer|computer`],
 ["Computer und E-Mail", "computer and e-mail", `💻|der|Computer|computer
svg:table|der|Tisch|table
svg:grid|die|Tabelle|table (of data)|Tabellen
📧|die|E-Mail|e-mail
@|das|At-Zeichen|@ sign|-|Say: „ät“ · max@web.de = „max ät web punkt de“
.|der|Punkt|dot, full stop|Punkte|web.de = „web punkt de“
-|der|Bindestrich|hyphen, dash|Bindestriche|auch: Strich · Anna-Maria = „Anna Strich Maria“ oder „Anna Bindestrich Maria“
_|der|Unterstrich|underscore|Unterstriche|max_koch = „max Unterstrich koch“
+|das|Plus|plus|-|3 + 2 = „drei plus zwei“
−|das|Minus|minus|-|5 − 2 = „fünf minus zwei“`],
 ["Stadt, Hotel, Post", "town, hotel, post office", `🏙️|die|Stadt|city, town
🌳|der|Park|park
🏛️|das|Rathaus|town hall|Rathäuser
⛪|die|Kirche|church
🖼️|das|Museum|museum
🎭|das|Theater|theatre|Theater
🎬|das|Kino|cinema
⚓|der|Hafen|harbour, port|Häfen
🏞️|die|Landschaft|landscape|Landschaften
🗼|der|Turm|tower|Türme
🌉|die|Brücke|bridge|Brücken
🏥|das|Krankenhaus|hospital
🏦|die|Bank|bank
⚕️|die|Apotheke|pharmacy
🏨|das|Hotel|hotel
🛏️|das|Einzelzimmer|single room|Einzelzimmer
🧳|der|Koffer|suitcase|Koffer
🧾|die|Rechnung|bill
✉️|der|Brief|letter
📮|der|Briefkasten|postbox|Briefkästen
📦|das|Paket|parcel
🏷️|die|Briefmarke|stamp|Briefmarken`],
 ["Verkehr", "transport", `🚋|die|Straßenbahn|tram
🚇|die|U-Bahn|underground
🚕|das|Taxi|taxi
✈️|das|Flugzeug|aeroplane|Flugzeuge
🚉|der|Bahnhof|station
🚏|die|Haltestelle|bus stop
🎫|die|Fahrkarte|ticket
🚦|die|Ampel|traffic light|Ampeln
🚸|der|Zebrastreifen|zebra crossing|Zebrastreifen
🔄|der|Kreisverkehr|roundabout|-
🛑|das|Stoppschild|stop sign|Stoppschilder|Stopp! = Stop!
🛣️|die|Straße|street|Straßen
🚗|das|Auto|car
🚢|das|Schiff|ship|Schiffe
🚲|das|Fahrrad|bicycle
🚌|der|Bus|bus
🚆|der|Zug|train`],
 ["Wetter", "weather", `☀️|die|Sonne|sun|-|Adj: sonnig (sunny)
🌧️|der|Regen|rain|-|Es regnet. (it is raining)
❄️|der|Schnee|snow|-|Es schneit. (it is snowing)
💨|der|Wind|wind|-|Adj: windig (windy)
☁️|die|Wolke|cloud|Wolken|Adj: bewölkt (cloudy)
⛈️|das|Gewitter|thunderstorm|Gewitter
🌫️|der|Nebel|fog|-|Adj: neblig (foggy)
🌡️|die|Temperatur|temperature|Temperaturen`],
 ["Freizeit", "free time", `📖|das|Lesen|reading|-|Verb: lesen · ich lese gern
👂|das|Hören|listening|-|Verb: hören · ich höre gern Musik
⚽|der|Fußball|football|Fußbälle (the balls)|Ich spiele gern Fußball.
📷|das|Fotografieren|photography (taking photos)|-|Mein Hobby ist Fotografieren.
🖼️|das|Foto|photo|Fotos
📚|das|Buch|book|Bücher|Ich lese gern Bücher.
🥾|das|Wandern|hiking|-|Verb: wandern · ich wandere gern
😴|das|Schlafen|sleeping|-|Verb: schlafen · ich schlafe gern lange
💤|der|Mittagsschlaf|nap|-|Mittagsschlaf machen = to take a nap
🚴|das|Radfahren|cycling|-|Verb: Rad fahren · ich fahre gern Rad
🏊|das|Schwimmen|swimming|-|Verb: schwimmen
🏃|der|Sport|sport|-|Adj: sportlich (sporty)
🎵|die|Musik|music|-|Ich höre gern Musik.
🎟️|die|Veranstaltung|event|Veranstaltungen
🎤|das|Konzert|concert|Konzerte
🎪|das|Festival|festival|Festivals
🎼|die|Konzerthalle|concert hall|Konzerthallen
🎻|das|Orchester|orchestra|Orchester`],
 ["Verben", "verbs", `🚶||gehen|to go||ich gehe · du gehst · er geht
👋||kommen|to come||ich komme · du kommst · er kommt
📖||lesen|to read||ich lese · du liest · er liest
👂||hören|to listen, to hear||ich höre · du hörst · er hört
😴||schlafen|to sleep||ich schlafe · du schläfst · er schläft
🥾||wandern|to hike||ich wandere · du wanderst · er wandert
🚗||fahren|to drive, to ride||ich fahre · du fährst · er fährt
🍽️||essen|to eat||ich esse · du isst · er isst
🥤||trinken|to drink||ich trinke · du trinkst · er trinkt
🎮||spielen|to play||ich spiele · du spielst · er spielt
💼||arbeiten|to work||ich arbeite · du arbeitest · er arbeitet
🧑‍🎓||lernen|to learn||ich lerne · du lernst · er lernt
🏠||wohnen|to live||ich wohne · du wohnst · er wohnt
🛑||halten|to stop, to hold||ich halte · du hältst · er hält
🤲||brauchen|to need||ich brauche · du brauchst · er braucht
💳||kaufen|to buy||ich kaufe · du kaufst · er kauft
🛍️||einkaufen|to shop||ich kaufe ein · du kaufst ein · er kauft ein`],
 ["Adjektive, Adverbien", "adjectives, adverbs", `🔁||immer|always||Adv. Ich trinke immer Kaffee.
✅||sicher|certainly, sure||Adv. Sicher! = Certainly!
👍||gut|good||Adj. Wie geht's? – Gut!
👎||schlecht|bad||Adj. Das ist schlecht.
🤩||super|great||Adj. Das ist super!
😴||müde|tired||Adj. Ich bin müde.
🤒||krank|ill||Adj. Ich bin krank.
😊||glücklich|happy||Adj. Ich bin glücklich.
😋||lecker|tasty||Adj. Das Essen ist lecker.`]
].map(([de, en, raw]) => ({ de, en, items: raw.split("\n").map(l => { const [pic, art, word, eng, pl, ex] = l.split("|"); return pl === "PL" ? { pic, art, word, eng, pl: "-", ex, plural: true } : { pic, art, word, eng, pl, ex }; }) }));

/* plurals come from the word lists of the lessons (data.js) unless the card gives its own */
const PLK = {};
try { if (typeof NOUNS !== "undefined") NOUNS.forEach(n => PLK[n.w] = n.p); if (typeof VOCAB !== "undefined") VOCAB.forEach(v => { if (!(v.w in PLK)) PLK[v.w] = v.p; }); } catch (e) {}
/* the plural of a card word ("" = none): own value, else the lesson word lists; notes in brackets are cut off */
function cardPlural(it) {
  if (!it.art || it.pl === "-") return "";
  const p = it.pl ? it.pl : PLK[it.word]; return p ? p.replace(/\s*\(.*\)$/, "") : "";
}
function plLine(it) {
  if (it.plural) return "Plural: immer die (plural: always die)";
  if (!it.art || it.pl === "-") return "";
  const p = it.pl ? it.pl : PLK[it.word]; if (p === undefined) return "";
  return p === "" ? "kein Plural" : "Plural: die " + p;
}
const extraLine = it => it.ex ? it.ex : "";

(function () {
  const root = document.getElementById("karten"); if (!root) return;
  let tab = Math.min(levelStore.get("kTab", 0), KARTEN.length - 1), mode = levelStore.get("kMode", "cards"), query = "";
  let deck = [], pos = 0, score = 0, answered = false;
  let known = new Set(levelStore.get("kKnown", [])), dens = levelStore.get("kDens", 2) === 3 ? 3 : 2, learnQueue = null, learnQueueTab = -1, learnFlipped = false;
  const said = it => (it.art ? it.art + " " : "") + it.word;
  const face = it => it.pic.startsWith("#") ? `<span class="swatch" style="background:${it.pic}"></span>` : `<span class="pic" aria-hidden="true">${picGlyph(it.pic)}</span>`;
  const cls = a => a === "der" ? "m" : a === "die" ? "f" : a === "das" ? "n" : "";
  const colourClass = it => it.plural ? "p" : cls(it.art); /* colour of a card: plural words are purple, not red */
  const gameable = it => it.art && !it.plural; /* der/die/das game: a plural is always die, so it would teach nothing */
  const normKey = s => norm(String(s || ""));
  function newDeck() { deck = shuffle(KARTEN[tab].items.filter(gameable)); pos = 0; score = 0; answered = false; }

  /* quick search over every category: German word, article + word, English, plural, hint. Same word in two categories shows once. */
  function search(q) {
    const n = normKey(q); if (!n) return [];
    const seen = new Set(), out = [];
    KARTEN.forEach((c, ci) => c.items.forEach((it, ii) => {
      const hay = [it.word, it.art + it.word, it.eng, cardPlural(it), it.ex].map(normKey);
      if (!hay.some(h => h.includes(n))) return;
      const key = it.art + "|" + it.word; if (seen.has(key)) return; seen.add(key);
      out.push({ ci, ii, rank: normKey(it.word).startsWith(n) || normKey(it.eng).startsWith(n) ? 0 : 1 });
    }));
    return out.sort((a, b) => a.rank - b.rank);
  }
  const card = (it, ci, ii, showCat) => `<button type="button" class="fc ${colourClass(it)}" data-c="${ci}" data-i="${ii}" aria-pressed="false" aria-label="${esc(it.eng)}"><span class="front">${face(it)}<small>${esc(it.eng)}</small></span><span class="back"><span class="snd" aria-hidden="true">🔊</span>${it.art ? `<span class="art">${it.art}</span>` : ""}<b>${esc(it.word)}</b><small>${esc(it.eng)}</small>${plLine(it) ? `<small class="pl">${esc(plLine(it))}</small>` : ""}${it.ex ? `<small class="ex">${esc(it.ex)}</small>` : ""}${showCat ? `<small class="cat">${esc(KARTEN[ci].de)}</small>` : ""}</span></button>`;

  /* ---- progress ("gewusst"), saved per browser ---- */
  const knownKey = it => it.art + "|" + it.word;
  const saveKnown = () => levelStore.set("kKnown", [...known]);
  const knownCount = t => KARTEN[t].items.filter(i => known.has(knownKey(i))).length;
  function buildQueue() { learnQueue = []; KARTEN[tab].items.forEach((it, i) => { if (!known.has(knownKey(it))) learnQueue.push(i); }); learnQueueTab = tab; learnFlipped = false; }
  const catIcon = c => { const f = c.items[0]; return f.pic.startsWith("#") ? `<span class="swatch" style="background:${f.pic}"></span>` : `<span class="cpic" aria-hidden="true">${picGlyph(f.pic)}</span>`; };

  /* ---- category sheet (phones) ---- */
  const sheet = document.createElement("div"); sheet.className = "sheet"; sheet.id = "catSheet"; sheet.hidden = true;
  sheet.innerHTML = `<div class="scrim" data-kclose></div><div class="sheetbox" role="dialog" aria-modal="true" aria-labelledby="catTitle"><div class="sheettop"><div class="grab" aria-hidden="true"></div><div class="sheethead"><h2 id="catTitle">Kategorie <span class="en">(category)</span></h2><button class="xbtn" type="button" data-kclose aria-label="Schließen (close)">✕</button></div></div><div class="cattiles" id="cattiles"></div></div>`;
  document.body.appendChild(sheet);
  function openCats() {
    $("#cattiles").innerHTML = KARTEN.map((c, i) => `<button type="button" class="ctile${i === tab && !query.trim() ? " on" : ""}" data-pick="${i}">${catIcon(c)}<b>${esc(c.de)}</b><small>${esc(c.en)}</small><em>${knownCount(i)} / ${c.items.length} ✓</em></button>`).join("");
    showSheet(sheet, sheet.querySelector(".ctile.on") || sheet.querySelector(".ctile"));
  }
  function closeCats() { hideSheet(sheet); }
  function pickCat(i) { tab = i; query = ""; searchBox.value = ""; levelStore.set("kTab", tab); deck = []; learnQueue = null; closeCats(); render(); const t = $(".ktool"); if (t) window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 12 }); }
  const judge = how => {
    if (!learnQueue || !learnQueue.length) return;
    if (how === "known") { known.add(knownKey(KARTEN[tab].items[learnQueue.shift()])); saveKnown(); } else learnQueue.push(learnQueue.shift());
    learnFlipped = false; render();
  };
  function flipL() { const b = $("#lcard"); if (!b) return; learnFlipped = !learnFlipped; b.classList.toggle("flip", learnFlipped); b.setAttribute("aria-pressed", learnFlipped); if (learnFlipped) speak(said(KARTEN[tab].items[learnQueue[0]])); }

  function render() {
    const cat = KARTEN[tab], searching = query.trim().length > 0, guessOk = cat.items.some(gameable);
    if (mode === "guess" && !guessOk) mode = "cards";
    if (!["cards", "learn", "guess"].includes(mode)) mode = "cards";
    const kn = knownCount(tab);
    let t = `<div class="kcatrow"><button type="button" class="kcat" id="kcat" aria-haspopup="dialog">${catIcon(cat)}<span class="kct"><b>${esc(cat.de)}</b><small>${esc(cat.en)} · ${kn} / ${cat.items.length} ✓</small></span><span aria-hidden="true">▾</span></button>
    ${!searching && mode === "cards" ? `<button type="button" class="kdens" data-dens aria-label="Karten pro Reihe wechseln (switch cards per row): ${dens}" title="2 / 3"><b>${dens}</b><small>Spalten</small></button>` : ""}</div>
    <div class="ktabs${searching ? " dim" : ""}" role="tablist">${KARTEN.map((c, i) => `<button type="button" role="tab" data-tab="${i}" aria-selected="${!searching && i === tab}">${c.de}<small>${c.en}</small></button>`).join("")}</div>
    ${searching ? "" : `<div class="kseg" role="group" aria-label="Übungsart (mode)"><button type="button" data-mode="cards" aria-pressed="${mode === "cards"}">🃏 Karten<small>cards</small></button><button type="button" data-mode="learn" aria-pressed="${mode === "learn"}">🧠 Lernen<small>study</small></button>${guessOk ? `<button type="button" data-mode="guess" aria-pressed="${mode === "guess"}">🎯 Raten<small>guess der/die/das</small></button>` : ""}</div>`}`;
    let h = "";
    if (searching) {
      const res = search(query);
      h += res.length ? `<p class="en">${res.length} Treffer <span>(matches)</span> in allen Kategorien. Tap a card to turn it over and hear the word.</p><div class="kgrid">${res.map(r => card(KARTEN[r.ci].items[r.ii], r.ci, r.ii, true)).join("")}</div>`
        : `<p class="en">Nichts gefunden <span>(nothing found)</span> for “${esc(query)}”. Try the English word or the German word without the article.</p>`;
    } else if (mode === "cards") {
      h += `<p class="khint">Tap a card to turn it over and hear the word. <span class="der">der</span> · <span class="die">die</span> · <span class="das">das</span> · <span class="plc">Plural</span></p><div class="kgrid d${dens}">${cat.items.map((it, i) => card(it, tab, i, false)).join("")}</div>`;
    } else if (mode === "learn") {
      if (!learnQueue || learnQueueTab !== tab) buildQueue();
      const total = cat.items.length, pct = Math.round(kn / total * 100);
      h += `<div class="klearn"><div class="kprog" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${kn}"><span>${kn} / ${total} gewusst <span class="en">(known)</span></span><i style="--p:${pct}%"></i></div>`;
      if (!learnQueue.length) {
        h += `<div class="kdone"><h3>Alle gewusst! 🎉 <span class="en">(all known)</span></h3><div class="rbtns"><button type="button" class="btn ghost" data-reset>Nochmal von vorn <small class="en">(start over)</small></button><button type="button" class="btn" data-nextcat>Nächste Kategorie <small>(next)</small></button></div></div>`;
      } else {
        const it = cat.items[learnQueue[0]];
        h += `<button type="button" class="lcard ${colourClass(it)}${learnFlipped ? " flip" : ""}" id="lcard" aria-pressed="${learnFlipped}" aria-label="${esc(it.eng)}"><span class="front">${face(it)}<b>${esc(it.eng)}</b><small>Tippen zum Umdrehen <span>(tap to turn)</span></small></span><span class="back"><span class="snd" aria-hidden="true">🔊</span>${it.art ? `<span class="art">${it.art}</span>` : ""}<b>${esc(it.word)}</b><small>${esc(it.eng)}</small>${plLine(it) ? `<small>${esc(plLine(it))}</small>` : ""}${it.ex ? `<small>${esc(it.ex)}</small>` : ""}</span></button>
        <div class="kjudge"><button type="button" class="btn ghost" data-j="again">🔁 Nochmal<small>again</small></button><button type="button" class="btn" data-j="known">✅ Gewusst<small>known</small></button></div>
        <p class="khint keys">Leertaste = umdrehen · ← nochmal · → gewusst <span class="en">(space = turn, ← again, → known)</span></p>`;
      }
      h += `</div>`;
    } else {
      if (!deck.length || deck.some(d => !cat.items.includes(d))) newDeck();
      if (pos >= deck.length) {
        h += `<div class="kdone"><h3>Fertig! <span class="en">(done)</span></h3><p class="big">${score} / ${deck.length}</p><button type="button" class="go" data-again>Nochmal <span class="en">(again)</span></button></div>`;
      } else {
        const it = deck[pos];
        h += `<div class="kguess"><p class="en">${pos + 1} / ${deck.length} · richtig (right): ${score}</p>
        <div class="fcbig">${face(it)}<b>${esc(it.word)}</b><small>${esc(it.eng)}</small></div>
        <div class="kopts">${["der", "die", "das"].map(a => `<button type="button" class="kopt ${cls(a)}" data-a="${a}">${a}</button>`).join("")}</div>
        <p class="kfb" id="kfb" aria-live="polite"></p><button type="button" class="go" id="knext" hidden>Weiter <span class="en">(next)</span></button></div>`;
      }
    }
    $("#ktoolRest").innerHTML = t;
    $("#kbody").innerHTML = h;
  }
  /* The search box stays in the page while you type. Redrawing it would cancel a half-typed umlaut
     (dead keys such as Option+u on a Mac, or the US-International keyboard), so only the rest is redrawn. */
  root.innerHTML = `<div class="ktool"><div class="ksearch"><input type="search" id="ksearch" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="🔍 Wort suchen … (search all categories)" aria-label="Wort suchen (search a word in all categories)"></div><div id="ktoolRest" class="ktoolrest"></div></div><div id="kbody"></div>`;
  const searchBox = $("#ksearch");
  const setQuery = v => { query = v; if (searchBox.value !== v) searchBox.value = v; render(); };
  searchBox.addEventListener("input", e => { if (e.isComposing) return; setQuery(searchBox.value); });
  searchBox.addEventListener("compositionend", () => setQuery(searchBox.value));
  searchBox.addEventListener("keydown", e => { if (e.key === "Escape" && query) setQuery(""); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCats();
    if (mode !== "learn" || query.trim() || document.body.classList.contains("sheet-open") || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName) || !learnQueue || !learnQueue.length) return;
    if (e.key === "ArrowRight") { e.preventDefault(); judge("known"); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); judge("again"); }
    else if (e.key === " " && e.target.tagName !== "BUTTON") { e.preventDefault(); flipL(); }
  });
  sheet.addEventListener("click", e => {
    if (e.target.closest("[data-kclose]")) { closeCats(); return; }
    const p = e.target.closest("[data-pick]"); if (p) pickCat(+p.dataset.pick);
  });
  root.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.id === "kcat") { openCats(); return; }
    if (t.hasAttribute("data-dens")) { dens = dens === 2 ? 3 : 2; levelStore.set("kDens", dens); render(); return; }
    if (t.dataset.tab) { query = ""; searchBox.value = ""; tab = +t.dataset.tab; levelStore.set("kTab", tab); deck = []; learnQueue = null; render(); return; }
    if (t.dataset.mode) { mode = t.dataset.mode; levelStore.set("kMode", mode); deck = []; learnQueue = null; render(); return; }
    if (t.classList.contains("fc")) {
      const on = t.classList.toggle("flip"), it = KARTEN[+t.dataset.c].items[+t.dataset.i];
      t.setAttribute("aria-pressed", on); t.setAttribute("aria-label", on ? said(it) + " (" + it.eng + ")" : it.eng);
      if (on) speak(said(it)); return;
    }
    if (t.id === "lcard") { flipL(); return; }
    if (t.dataset.j) { judge(t.dataset.j); return; }
    if (t.hasAttribute("data-reset")) { categoryItems().forEach(i => known.delete(knownKey(i))); saveKnown(); learnQueue = null; render(); return; }
    if (t.hasAttribute("data-nextcat")) { pickCat((tab + 1) % KARTEN.length); return; }
    if (t.hasAttribute("data-again")) { newDeck(); render(); return; }
    if (t.id === "knext") { pos++; answered = false; render(); return; }
    if (t.dataset.a && !answered) {
      answered = true; const it = deck[pos], ok = t.dataset.a === it.art; if (ok) score++;
      root.querySelectorAll(".kopt").forEach(b => { b.disabled = true; if (b.dataset.a === it.art) b.classList.add("right"); else if (b === t) b.classList.add("wrong"); });
      $("#kfb").innerHTML = `${ok ? "✅ Richtig!" : "❌ Nicht ganz."} <b class="${colourClass(it)}">${it.art} ${esc(it.word)}</b>${plLine(it) ? ` · <span class="en">${esc(plLine(it))}</span>` : ""}`;
      $("#knext").hidden = false; $("#knext").focus({ preventScroll: true }); speak(said(it));
    }
  });
  const categoryItems = () => KARTEN[tab].items;
  render();
})();
