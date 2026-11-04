/* Bildkarten: picture flashcards (cards mode) and "guess the article" (guess mode).
   Data: "emoji|article|word|English|plural?|extra?". plural = the plural without "die" (empty = look it up in NOUNS / VOCAB, "-" = none).
   extra = a short hint shown on the back: a related adjective, the verb forms, an example. For colours the first field is a CSS colour starting with #. Verbs and adjectives have an empty article. */
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
🥖|die|Bäckerei|bakery|Bäckereien
🛒|der|Supermarkt|supermarket|Supermärkte
🏬|das|Geschäft|shop, store|Geschäfte
🧾|die|Kasse|checkout, till|Kassen
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
👥|die|Leute|people|-|only plural: viele Leute
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
🍽️|der|Tisch|table
💡|die|Lampe|lamp
📺|der|Fernseher|television
🧊|der|Kühlschrank|fridge
🪞|der|Spiegel|mirror
🖥️|der|Schreibtisch|desk|Schreibtische
🪴|die|Pflanze|plant|Pflanzen
🔑|der|Schlüssel|key
⏰|die|Uhr|clock, watch`],
 ["Alltag", "everyday things", `📱|das|Handy|mobile phone
🍶|die|Thermoskanne|flask (thermos)|Thermoskannen
👜|die|Tasche|bag
👓|die|Brille|glasses
📰|die|Zeitung|newspaper
☂️|der|Regenschirm|umbrella`],
 ["Kleidung", "clothes", `👕|das|T-Shirt|T-shirt|T-Shirts
👔|das|Hemd|shirt
👖|die|Hose|trousers
👗|das|Kleid|dress
🧥|die|Jacke|jacket
👟|die|Schuhe|shoes|-|singular: der Schuh
🧦|die|Socken|socks|-|singular: die Socke
🧢|die|Mütze|cap|Mützen
🧣|der|Schal|scarf|Schals
🧤|die|Handschuhe|gloves|-|singular: der Handschuh`],
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
 ["Körper", "body", `🧠|der|Kopf|head|Köpfe
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
🍽️|der|Kellner|waiter
🛎️|die|Kellnerin|waitress
📐|der|Architekt|architect
📐|die|Architektin|architect (female)`],
 ["Schule und Büro", "school and office", `🖥️|der|Schreibtisch|desk|Schreibtische
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
💊|die|Apotheke|pharmacy
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
⚽|der|Sport|sport|-|Adj: sportlich (sporty)
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
].map(([de, en, raw]) => ({ de, en, items: raw.split("\n").map(l => { const [pic, art, word, eng, pl, ex] = l.split("|"); return { pic, art, word, eng, pl, ex }; }) }));

/* plurals come from the word lists of the lessons (data.js, data2.js) unless the card gives its own */
const PLK = {};
try { if (typeof NOUNS !== "undefined") NOUNS.forEach(n => PLK[n.w] = n.p); if (typeof VOCAB !== "undefined") VOCAB.forEach(v => { if (!(v.w in PLK)) PLK[v.w] = v.p; }); } catch (e) {}
/* the plural of a card word ("" = none): own value, else the lesson word lists; notes in brackets are cut off */
function cardPlural(it) {
  if (!it.art || it.pl === "-") return "";
  const p = it.pl ? it.pl : PLK[it.word]; return p ? p.replace(/\s*\(.*\)$/, "") : "";
}
function plLine(it) {
  if (!it.art || it.pl === "-") return "";
  const p = it.pl ? it.pl : PLK[it.word]; if (p === undefined) return "";
  return p === "" ? "kein Plural" : "Plural: die " + p;
}
const extraLine = it => it.ex ? it.ex : "";

(function () {
  const root = document.getElementById("karten"); if (!root) return;
  let tab = Math.min(lstore.get("kTab", 0), KARTEN.length - 1), mode = lstore.get("kMode", "cards"), query = "", keepFocus = false;
  let deck = [], pos = 0, score = 0, answered = false;
  const said = it => (it.art ? it.art + " " : "") + it.word;
  const face = it => it.pic.startsWith("#") ? `<span class="swatch" style="background:${it.pic}"></span>` : `<span class="pic" aria-hidden="true">${it.pic}</span>`;
  const cls = a => a === "der" ? "m" : a === "die" ? "f" : a === "das" ? "n" : "";
  const nk = s => norm(String(s || ""));
  function newDeck() { deck = shuffle(KARTEN[tab].items.filter(i => i.art)); pos = 0; score = 0; answered = false; }

  /* quick search over every category: German word, article + word, English, plural, hint. Same word in two categories shows once. */
  function search(q) {
    const n = nk(q); if (!n) return [];
    const seen = new Set(), out = [];
    KARTEN.forEach((c, ci) => c.items.forEach((it, ii) => {
      const hay = [it.word, it.art + it.word, it.eng, cardPlural(it), it.ex].map(nk);
      if (!hay.some(h => h.includes(n))) return;
      const key = it.art + "|" + it.word; if (seen.has(key)) return; seen.add(key);
      out.push({ ci, ii, rank: nk(it.word).startsWith(n) || nk(it.eng).startsWith(n) ? 0 : 1 });
    }));
    return out.sort((a, b) => a.rank - b.rank);
  }
  const card = (it, ci, ii, showCat) => `<button type="button" class="fc ${cls(it.art)}" data-c="${ci}" data-i="${ii}" aria-label="${esc(it.eng)}"><span class="front">${face(it)}<small>${esc(it.eng)}</small></span><span class="back">${it.art ? `<span class="art">${it.art}</span>` : ""}<b>${esc(it.word)}</b><small>${esc(it.eng)}</small>${plLine(it) ? `<small class="pl">${esc(plLine(it))}</small>` : ""}${it.ex ? `<small class="ex">${esc(it.ex)}</small>` : ""}${showCat ? `<small class="cat">${esc(KARTEN[ci].de)}</small>` : ""}</span></button>`;

  function render() {
    const cat = KARTEN[tab], searching = query.trim().length > 0, guessOk = cat.items.some(i => i.art);
    if (mode === "guess" && !guessOk) mode = "cards";
    let h = `<div class="ksearch"><input type="search" id="ksearch" value="${esc(query)}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="🔍 Wort suchen … (search all categories)" aria-label="Wort suchen (search a word in all categories)"></div>
    <div class="ktabs${searching ? " dim" : ""}" role="tablist">${KARTEN.map((c, i) => `<button type="button" role="tab" data-tab="${i}" aria-selected="${!searching && i === tab}">${c.de}<small>${c.en}</small></button>`).join("")}</div>`;
    if (searching) {
      const res = search(query);
      h += res.length ? `<p class="en">${res.length} Treffer <span>(matches)</span> in allen Kategorien. Tap a card to turn it over and hear the word.</p><div class="kgrid">${res.map(r => card(KARTEN[r.ci].items[r.ii], r.ci, r.ii, true)).join("")}</div>`
        : `<p class="en">Nichts gefunden <span>(nothing found)</span> for “${esc(query)}”. Try the English word or the German word without the article.</p>`;
    } else {
      h += `<div class="kmode"><button type="button" data-mode="cards" aria-pressed="${mode === "cards"}">🃏 Karten <small>(cards)</small></button>${guessOk ? `<button type="button" data-mode="guess" aria-pressed="${mode === "guess"}">🎯 der, die oder das? <small>(guess the article)</small></button>` : ""}</div>`;
      if (mode === "cards") {
        h += `<p class="en">Tap a card to turn it over and hear the word. Blue = der, red = die, green = das.</p><div class="kgrid">${cat.items.map((it, i) => card(it, tab, i, false)).join("")}</div>`;
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
    }
    root.innerHTML = h;
    if (keepFocus) { const s = $("#ksearch"); s.focus(); s.setSelectionRange(s.value.length, s.value.length); keepFocus = false; }
  }
  root.addEventListener("input", e => { if (e.target.id !== "ksearch") return; query = e.target.value; keepFocus = true; render(); });
  root.addEventListener("keydown", e => { if (e.key === "Escape" && e.target.id === "ksearch" && query) { query = ""; keepFocus = true; render(); } });
  root.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.tab) { query = ""; tab = +t.dataset.tab; lstore.set("kTab", tab); deck = []; render(); return; }
    if (t.dataset.mode) { mode = t.dataset.mode; lstore.set("kMode", mode); deck = []; render(); return; }
    if (t.classList.contains("fc")) { const on = t.classList.toggle("flip"); if (on) speak(said(KARTEN[+t.dataset.c].items[+t.dataset.i])); return; }
    if (t.hasAttribute("data-again")) { newDeck(); render(); return; }
    if (t.id === "knext") { pos++; answered = false; render(); return; }
    if (t.dataset.a && !answered) {
      answered = true; const it = deck[pos], ok = t.dataset.a === it.art; if (ok) score++;
      root.querySelectorAll(".kopt").forEach(b => { b.disabled = true; if (b.dataset.a === it.art) b.classList.add("right"); else if (b === t) b.classList.add("wrong"); });
      $("#kfb").innerHTML = `${ok ? "✅ Richtig!" : "❌ Nicht ganz."} <b class="${cls(it.art)}">${it.art} ${esc(it.word)}</b>${plLine(it) ? ` · <span class="en">${esc(plLine(it))}</span>` : ""}`;
      $("#knext").hidden = false; $("#knext").focus({ preventScroll: true }); speak(said(it));
    }
  });
  render();
})();
