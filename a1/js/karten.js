/* Bildkarten screen: picture flashcards (cards mode) and "guess the article" (guess mode).
   Data: "emoji|article|word|English|plural?|extra?". plural = the plural without "die" (empty = look it up in NOUNS / VOCAB, "-" = none, "PL" = the word itself is a plural, e.g. Schuhe: shown purple and left out of the der/die/das game).
   extra = a short hint shown on the back: a related adjective, the verb forms, an example. For colours the first field is a CSS colour starting with #. Verbs and adjectives have an empty article. */
/* The card data and helpers (KARTEN, cardPlural, plLine, extraLine, picGlyph) are in karten-data.js. */

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
  /* why der / die / das: GENUS_TIP is in karten-data.js; the category name helps (drinks, weather) */
  const tipOf = it => (typeof GENUS_TIP === "function" ? GENUS_TIP(it, KARTEN[tab].de) : "");
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
  const card = (it, ci, ii, showCat) => `<button type="button" class="fc ${colourClass(it)}" data-c="${ci}" data-i="${ii}" aria-pressed="false" aria-label="${esc(it.word)}"><span class="front">${face(it)}<b class="fw">${esc(it.word)}</b></span><span class="back"><span class="snd" aria-hidden="true">🔊</span>${it.art ? `<span class="art">${it.art}</span>` : ""}<b>${esc(it.word)}</b><small>${esc(it.eng)}</small>${plLine(it) ? `<small class="pl">${esc(plLine(it))}</small>` : ""}${it.ex ? `<small class="ex">${esc(it.ex)}</small>` : ""}${showCat ? `<small class="cat">${esc(KARTEN[ci].de)}</small>` : ""}</span></button>`;

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
    if (!learnFlipped) { flipL(); return; }
    if (how === "known") { known.add(knownKey(KARTEN[tab].items[learnQueue.shift()])); saveKnown(); }
    else { const i = learnQueue.shift(); learnQueue.splice(Math.min(3, learnQueue.length), 0, i); }
    learnFlipped = false; render();
  };
  function flipL() { if (!$("#lcard")) return; learnFlipped = !learnFlipped; render(); const b = $("#lcard"); if (b) b.focus({ preventScroll: true }); if (learnFlipped) speak(said(KARTEN[tab].items[learnQueue[0]])); }

  function render() {
    const cat = KARTEN[tab], searching = query.trim().length > 0, guessOk = cat.items.some(gameable);
    if (mode === "guess" && !guessOk) mode = "cards";
    if (!["cards", "learn", "guess"].includes(mode)) mode = "cards";
    const kn = knownCount(tab);
    let t = `<div class="kcatrow"><button type="button" class="kcat" id="kcat" aria-haspopup="dialog">${catIcon(cat)}<span class="kct"><b>${esc(cat.de)}</b><small>${esc(cat.en)} · ${kn} / ${cat.items.length} ✓</small></span><span aria-hidden="true">▾</span></button>
    ${!searching && mode === "cards" ? `<button type="button" class="kdens" data-dens aria-label="Karten pro Reihe wechseln (switch cards per row): ${dens}" title="2 / 3"><b>${dens}</b><small>Spalten</small></button>` : ""}</div>
    <div class="ktabs${searching ? " dim" : ""}" role="tablist">${KARTEN.map((c, i) => `<button type="button" role="tab" data-tab="${i}" aria-selected="${!searching && i === tab}">${c.de}<small>${c.en} · ${c.items.length}</small></button>`).join("")}</div>
    ${searching ? "" : `<div class="kseg" role="group" aria-label="Übungsart (mode)"><button type="button" data-mode="cards" aria-pressed="${mode === "cards"}">🃏 Karten<small>browse</small></button><button type="button" data-mode="learn" aria-pressed="${mode === "learn"}">🧠 Abfragen<small>test yourself</small></button>${guessOk ? `<button type="button" data-mode="guess" aria-pressed="${mode === "guess"}">🎯 der/die/das<small>guess the article</small></button>` : ""}</div>`}`;
    let h = "";
    if (searching) {
      const res = search(query);
      h += res.length ? `<p class="en">${res.length} Treffer <span>(matches)</span> in allen Kategorien. Tap a card to see the article and the English.</p><div class="kgrid">${res.map(r => card(KARTEN[r.ci].items[r.ii], r.ci, r.ii, true)).join("")}</div>`
        : `<p class="en">Nichts gefunden <span>(nothing found)</span> for “${esc(query)}”. Try the English word or the German word without the article.</p>`;
    } else if (mode === "cards") {
      h += `<p class="khint">Der, die oder das? Tap a card to see the article and the English, and hear the word. <span class="der">der</span> · <span class="die">die</span> · <span class="das">das</span> · <span class="plc">Plural</span></p><div class="kgrid d${dens}">${cat.items.map((it, i) => card(it, tab, i, false)).join("")}</div>`;
    } else if (mode === "learn") {
      if (!learnQueue || learnQueueTab !== tab) buildQueue();
      const total = cat.items.length, pct = Math.round(kn / total * 100);
      h += `<div class="klearn"><div class="kprog" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${kn}"><span>✓ ${kn} gewusst <span class="en">(known)</span> · noch ${total - kn} <span class="en">(to go)</span></span><i style="--p:${pct}%"></i></div>`;
      if (!learnQueue.length) {
        h += `<div class="kdone"><h3>Alle gewusst! 🎉 <span class="en">(all known)</span></h3><div class="rbtns"><button type="button" class="btn ghost" data-reset>Nochmal von vorn <small class="en">(start over)</small></button><button type="button" class="btn" data-nextcat>Nächste Kategorie <small>(next)</small></button></div></div>`;
      } else {
        const it = cat.items[learnQueue[0]];
        h += `<button type="button" class="lcard ${colourClass(it)}${learnFlipped ? " flip" : ""}" id="lcard" aria-pressed="${learnFlipped}" aria-label="${esc(it.eng)}"><span class="front">${face(it)}<b>${esc(it.eng)}</b><small>Sag das Wort mit der, die oder das. <span>(Say the word with der, die or das.)</span></small></span><span class="back"><span class="snd" aria-hidden="true">🔊</span>${it.art ? `<span class="art">${it.art}</span>` : ""}<b>${esc(it.word)}</b><small>${esc(it.eng)}</small>${plLine(it) ? `<small>${esc(plLine(it))}</small>` : ""}${it.ex ? `<small>${esc(it.ex)}</small>` : ""}${tipOf(it) ? `<small class="ktip">${tipOf(it)}</small>` : ""}</span></button>
        ${learnFlipped
          ? `<p class="kask">Hast du es gewusst? <span class="en">(Did you know it?)</span></p><div class="kjudge"><button type="button" class="btn ghost" data-j="again">🔁 Noch nicht<small>not yet · comes back soon</small></button><button type="button" class="btn" data-j="known">✅ Gewusst<small>I knew it</small></button></div>`
          : `<div class="kjudge one"><button type="button" class="btn show" data-show>👀 Antwort zeigen<small>show answer</small></button></div>`}
        <p class="khint keys">Leertaste = Antwort zeigen · ← noch nicht · → gewusst <span class="en">(space = show answer, ← not yet, → I knew it)</span></p>`;
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
    if (t.dataset.mode) { mode = t.dataset.mode; levelStore.set("kMode", mode); deck = []; learnQueue = null; render(); const k = $(".ktool"); if (k && mode !== "cards") window.scrollTo({ top: k.getBoundingClientRect().top + scrollY - 12 }); return; }
    if (t.classList.contains("fc")) {
      const on = t.classList.toggle("flip"), it = KARTEN[+t.dataset.c].items[+t.dataset.i];
      t.setAttribute("aria-pressed", on); t.setAttribute("aria-label", on ? said(it) + " (" + it.eng + ")" : it.word);
      if (on) speak(said(it)); return;
    }
    if (t.id === "lcard" || t.hasAttribute("data-show")) { flipL(); return; }
    if (t.dataset.j) { judge(t.dataset.j); return; }
    if (t.hasAttribute("data-reset")) { categoryItems().forEach(i => known.delete(knownKey(i))); saveKnown(); learnQueue = null; render(); return; }
    if (t.hasAttribute("data-nextcat")) { pickCat((tab + 1) % KARTEN.length); return; }
    if (t.hasAttribute("data-again")) { newDeck(); render(); return; }
    if (t.id === "knext") { pos++; answered = false; render(); return; }
    if (t.dataset.a && !answered) {
      answered = true; const it = deck[pos], ok = t.dataset.a === it.art; if (ok) score++;
      root.querySelectorAll(".kopt").forEach(b => { b.disabled = true; if (b.dataset.a === it.art) b.classList.add("right"); else if (b === t) b.classList.add("wrong"); });
      $("#kfb").innerHTML = `${ok ? "✅ Richtig!" : "❌ Nicht ganz."} <b class="${colourClass(it)}">${it.art} ${esc(it.word)}</b>${plLine(it) ? ` · <span class="en">${esc(plLine(it))}</span>` : ""}${tipOf(it) ? `<span class="ktip">${tipOf(it)}</span>` : ""}`;
      $("#knext").hidden = false; $("#knext").focus({ preventScroll: true }); speak(said(it));
    }
  });
  const categoryItems = () => KARTEN[tab].items;
  /* total number of cards, shown in the page intro */
  const lead = document.querySelector(".part .lead");
  if (lead) lead.insertAdjacentHTML("beforeend", ` <b class="ktotal">${KARTEN.reduce((n, c) => n + c.items.length, 0)} Wörter <span class="en">(words)</span> · ${KARTEN.length} Kategorien <span class="en">(categories)</span></b>`);
  render();
})();
