/* Lerne Deutsch: test engine shared by every level.
   Needs TESTS and GROUPS from <level>/js/tests.js.
   Each test: {tag, title, en, kind: "choice" | "input" | "mixed", ranges?, gen(range) -> question}
   Each question: {prompt, answer, explain, options? (choice), inputmode?, umlauts?}
   Open a test directly with tests.html#<key>, e.g. tests.html#artikel or tests.html#mix. */
let current = null, q = null, stats = { ok: 0, n: 0, miss: [] }, rangeIdx = {};
const best = lstore.get("best", {});
const MIX_LEN = 10;

function renderGrid() {
  $("#testGrid").innerHTML = GROUPS.map(([g, ge, keys]) =>
    `<div class="tgroup"><h3>${g} <span class="en">(${ge})</span></h3><div class="tgrid">` +
    keys.map(k => {
      const t = TESTS[k], b = best[k];
      return `<a class="tcard" href="#${k}" aria-pressed="${k === current}"><span class="tag">${t.tag}</span><h3>${t.title}</h3><span class="en">${t.en}</span>
        <span class="best">${b ? `Your total: ${b.ok}/${b.n} right (${Math.round(b.ok / b.n * 100)}%)` : "Not tried yet"}</span></a>`;
    }).join("") + `</div></div>`).join("");
}

function start(k) {
  if (!TESTS[k]) return;
  current = k; stats = { ok: 0, n: 0, miss: [] }; lstore.set("test", k);
  renderGrid(); nextQ();
}

function nextQ() {
  if (current === "mix" && stats.n >= MIX_LEN) { showResult(); return; }
  const t = TESTS[current], r = t.ranges ? t.ranges[rangeIdx[current] || 0] : null;
  q = t.gen(r); q.done = false; draw();
}

function draw() {
  const t = TESTS[current], kind = q.kind || t.kind;
  let h = `<div class="panelhead"><div><h2>${t.title}</h2><span class="en">${current === "mix" ? `Frage ${stats.n + 1} von ${MIX_LEN} · ${q.from}` : t.en}</span></div><span class="score">Richtig (correct): ${stats.ok}/${stats.n}</span></div>`;
  if (t.ranges) h += `<div class="seg" role="group" aria-label="Range">${t.ranges.map((r, i) => `<button data-r="${i}" aria-pressed="${(rangeIdx[current] || 0) === i}">${r[0]}</button>`).join("")}</div>`;
  h += `<div class="q">${q.prompt}</div>`;
  if (kind === "choice") {
    h += `<div class="opts">${q.options.map((o, i) => `<button class="opt ${q.cls ? q.cls(o) : ""}" data-i="${i}">${q.label ? q.label(o) : esc(o)}</button>`).join("")}</div>`;
  } else {
    h += `<form class="answerrow" id="ansForm"><input type="text" id="ans" autocomplete="off" autocapitalize="off" spellcheck="false" ${q.inputmode ? `inputmode="${q.inputmode}"` : ""} aria-label="Your answer" placeholder="Antwort (answer)">
      ${q.umlauts ? `<div class="umlauts">${["ä", "ö", "ü", "ß"].map(c => `<button type="button" data-ch="${c}">${c}</button>`).join("")}</div>` : ""}
      <button class="btn" type="submit">Prüfen <span style="font-weight:400">(check)</span></button></form>`;
  }
  h += `<div id="fb"></div>`;
  $("#panel").innerHTML = h;
  $("#panel").querySelectorAll("[data-r]").forEach(b => b.onclick = () => { rangeIdx[current] = +b.dataset.r; nextQ(); });
  if (kind === "choice") {
    $("#panel").querySelectorAll(".opt").forEach(b => b.onclick = () => answer(q.options[+b.dataset.i], b));
  } else {
    const inp = $("#ans"); inp.focus({ preventScroll: true });
    $("#panel").querySelectorAll("[data-ch]").forEach(b => b.onclick = () => { inp.value += b.dataset.ch; inp.focus(); });
    $("#ansForm").onsubmit = e => { e.preventDefault(); if (q.done) { nextQ(); return; } if (inp.value.trim()) answer(inp.value.trim()); };
  }
}

function answer(v, btn) {
  if (q.done) return; q.done = true;
  const kind = q.kind || TESTS[current].kind;
  const ok = kind === "choice" ? v === q.answer : (norm(v) === norm(q.answer) || v.trim() === q.answer);
  stats.n++;
  if (ok) stats.ok++; else if (q.fromKey && !stats.miss.includes(q.fromKey)) stats.miss.push(q.fromKey);
  const b = best[current] || { ok: 0, n: 0 }; b.n++; if (ok) b.ok++; best[current] = b; lstore.set("best", best);
  if (btn) {
    $("#panel").querySelectorAll(".opt").forEach(o => { o.disabled = true; if (q.options[+o.dataset.i] === q.answer) o.classList.add("right"); });
    if (!ok) btn.classList.add("wrong");
  }
  $("#panel .score").textContent = `Richtig (correct): ${stats.ok}/${stats.n}`;
  const last = current === "mix" && stats.n >= MIX_LEN;
  $("#fb").innerHTML = `<div class="feedback ${ok ? "ok" : "no"}"><span class="verdict">${ok ? pick(["Richtig! (correct)", "Super! (great)", "Sehr gut! (very good)", "Genau! (exactly)"]) : `Leider falsch. (Sadly wrong.) Answer: ${esc(q.answer)}`}</span><span>${q.explain}</span></div>
   <div class="controls" style="margin-top:10px"><button class="btn" id="next">${last ? 'Ergebnis <span style="font-weight:400">(result)</span> →' : 'Weiter <span style="font-weight:400">(next)</span> →'}</button></div>`;
  $("#next").onclick = nextQ; $("#next").focus({ preventScroll: true });
  renderGrid();
}

function showResult() {
  const pct = Math.round(stats.ok / stats.n * 100);
  const msg = pct >= 80 ? "Super! Sehr gut. (Great! Very good.)" : pct >= 60 ? "Gut! (Good!) 60% is the pass mark in the exam." : "Weiter üben! (Keep practising!)";
  $("#panel").innerHTML = `<div class="panelhead"><div><h2>Ergebnis <span class="en">(result)</span></h2><span class="en">Gemischter Test · ${MIX_LEN} Fragen</span></div></div>
   <div class="q"><span class="big">${stats.ok} / ${stats.n}</span><span class="en">${msg}</span></div>
   ${stats.miss.length ? `<div class="practice"><span>Üb das noch einmal <span class="en">(practise these again)</span></span>${stats.miss.map(k => `<a class="go" href="#${k}">${TESTS[k].title}</a>`).join("")}</div>` : ""}
   <div class="controls"><button class="btn" id="againMix" type="button">Neuer Test <span style="font-weight:400">(new test)</span></button></div>`;
  $("#againMix").onclick = () => start("mix");
}

/* Hash routing: tests.html#artikel opens that test. Clicking the current test again restarts it. */
function fromHash(scroll) {
  const k = decodeURIComponent(location.hash.slice(1));
  if (!TESTS[k]) return false;
  start(k);
  if (scroll) setTimeout(() => $("#panel").scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  return true;
}
window.addEventListener("hashchange", () => fromHash(true));
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (a && a.getAttribute("href").slice(1) === location.hash.slice(1)) { e.preventDefault(); fromHash(true); }
});
renderGrid();
if (!fromHash(true)) start(lstore.get("test", "artikel"));
