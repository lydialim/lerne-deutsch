/* Bildkarten: picture flashcards (cards mode) and "guess the article" (guess mode).
   Data: "emoji|article|word|English". For colours the first field is a CSS colour starting with #. */
const KARTEN = [
 ["Essen", "food", `🍎|der|Apfel|apple
🍌|die|Banane|banana
🍊|die|Orange|orange
🍓|die|Erdbeere|strawberry
🍇|die|Traube|grape
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
🍝|die|Nudeln|noodles, pasta
🥔|die|Kartoffel|potato
🍅|die|Tomate|tomato
🥕|die|Karotte|carrot
🥗|der|Salat|salad
🍕|die|Pizza|pizza
🥩|das|Fleisch|meat
🍗|das|Hähnchen|chicken
🐟|der|Fisch|fish
🍰|der|Kuchen|cake
🍫|die|Schokolade|chocolate`],
 ["Familie", "family", `👩|die|Mutter|mother
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
🐱|die|Katze|cat`],
 ["Wohnung", "home", `🏠|das|Haus|house
🏢|die|Wohnung|flat
🚪|die|Tür|door
🪟|das|Fenster|window
🍳|die|Küche|kitchen
🛏️|das|Schlafzimmer|bedroom
🛁|das|Badezimmer|bathroom
🚿|die|Dusche|shower
🛏|das|Bett|bed
🛋️|das|Sofa|sofa
🪑|der|Stuhl|chair
🍽️|der|Tisch|table
💡|die|Lampe|lamp
📺|der|Fernseher|television
🧊|der|Kühlschrank|fridge
🪞|der|Spiegel|mirror
🪴|die|Pflanze|plant
🔑|der|Schlüssel|key
⏰|die|Uhr|clock, watch`],
 ["Berufe", "jobs", `👨‍🏫|der|Lehrer|teacher (male)
👩‍🏫|die|Lehrerin|teacher (female)
👨‍⚕️|der|Arzt|doctor (male)
👩‍⚕️|die|Ärztin|doctor (female)
👨‍🍳|der|Koch|cook (male)
👩‍🍳|die|Köchin|cook (female)
🧑‍🎓|der|Student|student
👮|der|Polizist|police officer
👷|der|Bauarbeiter|construction worker
🧑‍🔧|der|Mechaniker|mechanic
🧑‍✈️|der|Pilot|pilot`],
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
 ["Dinge", "things", `📖|das|Buch|book
🖊️|der|Kuli|pen
📱|das|Handy|mobile phone
💻|der|Computer|computer
👜|die|Tasche|bag
👓|die|Brille|glasses
💶|das|Geld|money
✉️|der|Brief|letter
📰|die|Zeitung|newspaper
☂️|der|Regenschirm|umbrella
🚗|das|Auto|car
🚌|der|Bus|bus
🚆|der|Zug|train
🚲|das|Fahrrad|bicycle`]
].map(([de, en, raw]) => ({ de, en, items: raw.split("\n").map(l => { const [pic, art, word, eng] = l.split("|"); return { pic, art, word, eng }; }) }));

(function () {
  const root = document.getElementById("karten"); if (!root) return;
  let tab = Math.min(lstore.get("kTab", 0), KARTEN.length - 1), mode = lstore.get("kMode", "cards");
  let deck = [], pos = 0, score = 0, answered = false;
  const said = it => (it.art ? it.art + " " : "") + it.word;
  const face = it => it.pic.startsWith("#") ? `<span class="swatch" style="background:${it.pic}"></span>` : `<span class="pic" aria-hidden="true">${it.pic}</span>`;
  const cls = a => a === "der" ? "m" : a === "die" ? "f" : a === "das" ? "n" : "";
  const arts = { der: "der", die: "die", das: "das" };

  function newDeck() { deck = shuffle(KARTEN[tab].items.filter(i => i.art)); pos = 0; score = 0; answered = false; }
  function render() {
    const cat = KARTEN[tab], guessOk = cat.items.some(i => i.art);
    if (mode === "guess" && !guessOk) mode = "cards";
    let h = `<div class="ktabs" role="tablist">${KARTEN.map((c, i) => `<button type="button" role="tab" data-tab="${i}" aria-selected="${i === tab}">${c.de}<small>${c.en}</small></button>`).join("")}</div>
    <div class="kmode"><button type="button" data-mode="cards" aria-pressed="${mode === "cards"}">🃏 Karten <small>(cards)</small></button>${guessOk ? `<button type="button" data-mode="guess" aria-pressed="${mode === "guess"}">🎯 der, die oder das? <small>(guess the article)</small></button>` : ""}</div>`;
    if (mode === "cards") {
      h += `<p class="en">Tap a card to turn it over and hear the word. Blue = der, red = die, green = das.</p><div class="kgrid">${cat.items.map((it, i) => `<button type="button" class="fc ${cls(it.art)}" data-i="${i}" aria-label="${esc(it.eng)}"><span class="front">${face(it)}<small>${esc(it.eng)}</small></span><span class="back">${it.art ? `<span class="art">${it.art}</span>` : ""}<b>${esc(it.word)}</b><small>${esc(it.eng)}</small></span></button>`).join("")}</div>`;
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
    root.innerHTML = h;
  }
  root.addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    if (t.dataset.tab) { tab = +t.dataset.tab; lstore.set("kTab", tab); deck = []; render(); return; }
    if (t.dataset.mode) { mode = t.dataset.mode; lstore.set("kMode", mode); deck = []; render(); return; }
    if (t.classList.contains("fc")) { const on = t.classList.toggle("flip"); if (on) speak(said(KARTEN[tab].items[+t.dataset.i])); return; }
    if (t.hasAttribute("data-again")) { newDeck(); render(); return; }
    if (t.id === "knext") { pos++; answered = false; render(); return; }
    if (t.dataset.a && !answered) {
      answered = true; const it = deck[pos], ok = t.dataset.a === it.art; if (ok) score++;
      root.querySelectorAll(".kopt").forEach(b => { b.disabled = true; if (b.dataset.a === it.art) b.classList.add("right"); else if (b === t) b.classList.add("wrong"); });
      $("#kfb").innerHTML = `${ok ? "✅ Richtig!" : "❌ Nicht ganz."} <b class="${cls(it.art)}">${it.art} ${esc(it.word)}</b>`;
      $("#knext").hidden = false; $("#knext").focus({ preventScroll: true }); speak(said(it));
    }
  });
  render();
})();
