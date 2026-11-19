/* Buchseiten: renders PAGES (buchseiten-data.js) as cards.
   Top: the newest class day ("Letzte Stunde"). Below: every page in page order, with a page-number jump bar and search. */
(function () {
  const list = document.getElementById("pgList"), latestBox = document.getElementById("pgLatest"),
        jump = document.getElementById("pgJump"), q = document.getElementById("pq"), count = document.getElementById("pgCount"),
        empty = document.getElementById("pgEmpty");
  if (!list || typeof PAGES === "undefined") return;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const DAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], DAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const fmt = d => { const t = new Date(d + "T12:00:00"); return `${DAYS[t.getDay()]}, ${t.getDate()}.${t.getMonth() + 1}. <span class="en">(${DAYS_EN[t.getDay()]})</span>`; };
  const pages = PAGES.slice().sort((a, b) => a.p - b.p);
  const newest = pages.reduce((m, x) => x.date > m ? x.date : m, "");

  const card = (x, id) => `<article class="pgcard${x.date === newest ? " is-new" : ""}"${id ? ` id="s${x.p}"` : ""} data-find="${esc([x.p, x.say, x.title, x.en, x.words, x.grammar].join(" ").toLowerCase())}">
    <button type="button" class="pgnum" data-tap-say="Seite ${esc(x.say)}" aria-label="Seite ${x.p}: ${esc(x.say)}. Tap to hear.">
      <span class="pgS">S.</span><span class="pgN">${x.p}</span></button>
    <div class="pgbody">
      <div class="pgtop">${x.date === newest ? '<span class="pgtag new">Neu</span>' : ""}${x.star ? '<span class="pgtag star">★ Prüfung</span>' : ""}<span class="pgsay">${esc(x.say)} <span class="pron">(${esc(x.pron)})</span></span></div>
      <h3>${esc(x.title)} <span class="en">(${esc(x.en)})</span></h3>
      <p class="pgwords">${esc(x.words)}</p>
      <p class="pggram"><span aria-hidden="true">💡</span> ${esc(x.grammar)}</p>
      <div class="pgact">${x.learn.map(([h, l]) => `<a class="pgbtn learn" href="${h}"><span aria-hidden="true">📖</span> ${esc(l)}</a>`).join("")}<a class="pgbtn test" href="${x.test[0]}"><span aria-hidden="true">✏️</span> ${esc(x.test[1])}</a></div>
    </div></article>`;

  const latest = pages.filter(x => x.date === newest);
  latestBox.innerHTML = `<h2 class="pgh">Letzte Stunde <span class="en">(last class)</span> · ${fmt(newest)}</h2>` + latest.map(x => card(x, false)).join("");
  list.innerHTML = pages.map(x => card(x, true)).join("");
  jump.innerHTML = pages.map(x => `<a href="#s${x.p}" class="${x.date === newest ? "new" : ""}">${x.p}</a>`).join("");

  const cards = [].slice.call(list.querySelectorAll(".pgcard"));
  const update = () => {
    const v = q.value.trim().toLowerCase();
    let n = 0;
    cards.forEach(c => { const hit = !v || c.dataset.find.indexOf(v) >= 0; c.hidden = !hit; if (hit) n++; });
    latestBox.hidden = !!v; jump.hidden = !!v;
    count.textContent = v ? `${n} von ${pages.length} Seiten` : `${pages.length} Seiten`;
    empty.hidden = n > 0;
  };
  q.addEventListener("input", update);
  update();
})();
