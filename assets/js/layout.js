/* Lerne Deutsch: page shell built from window.LEVEL (see <level>/js/level.js).
   Header + sticky page tabs (wide screens), a bottom tab bar (phones), the lesson menu sheet,
   the "which lesson am I reading" highlight, previous/next part links, a back-to-top button
   and the footer. */
(function () {
  const L = window.LEVEL, el = document.getElementById("site-header");
  if (!L || !el) return;
  const here = location.pathname.split("/").pop() || "index.html";
  const parts = L.parts || [];
  const onPartPage = parts.some(p => p[3] === here);
  const ICON = {
    home: '<path d="M4 11.5 12 5l8 6.5V20h-5v-5H9v5H4z"/>',
    book: '<path d="M4 5.5C6.5 4 9.5 4 12 6c2.5-2 5.5-2 8-.5V19c-2.5-1.5-5.5-1.5-8 .5-2.5-2-5.5-2-8-.5z"/><path d="M12 6v13.5"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8"/>',
    note: '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
    cards: '<rect x="3.5" y="7" width="12" height="13" rx="2"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4H18a2.5 2.5 0 0 1 2.5 2.5V15a1.5 1.5 0 0 1-1.5 1.5h-3.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    up: '<path d="M12 19V6M6 11.5 12 5.5l6 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>'
  };
  const svg = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

  /* skip link + id for the main landmark */
  const main = document.querySelector("main");
  if (main) { main.id = main.id || "main"; main.tabIndex = -1; }
  document.body.insertAdjacentHTML("afterbegin", `<a class="skip" href="#main">Zum Inhalt springen <span class="en">(skip to content)</span></a>`);

  /* header: brand, then the sticky tab bar (learn pages | tools) */
  const tab = ([href, de, en, , letter]) =>
    `<a class="tab" href="${href}" title="${de}${en ? " · " + en : ""}"${href === here ? ' aria-current="page"' : ""}>${letter ? `<span class="pl">${letter} · </span>` : ""}${de}</a>`;
  const learn = L.pages.filter(p => p[3] !== "tools"), tools = L.pages.filter(p => p[3] === "tools");
  el.className = "top";
  el.innerHTML = `
  <div class="brand">
    <div class="flagline" aria-hidden="true"><span style="background:var(--der)"></span><span style="background:var(--die)"></span><span style="background:var(--das)"></span></div>
    <p class="crumb"><a href="../index.html">Lerne Deutsch</a> › ${L.level}</p>
    <h1><a href="index.html">${L.title}</a></h1>
  </div>
  <nav class="tabs toptabs" aria-label="${L.title}">
    ${learn.map(tab).join("")}<span class="sep" aria-hidden="true"></span>${tools.map(tab).join("")}
    ${L.mix ? `<a class="go" href="${L.mix}">Gemischter Test <small>· 20</small></a>` : ""}
  </nav>`;

  /* bottom tab bar for phones: the five places you go back to most */
  const cur = h => h === here ? ' aria-current="page"' : "";
  document.body.insertAdjacentHTML("beforeend", `
  <nav class="bnav" aria-label="Menü (menu)">
    <a class="btab" href="index.html"${cur("index.html")}>${svg("home")}Start<small>overview</small></a>
    <button class="btab" type="button" data-sheet${onPartPage ? ' aria-current="page"' : ""}>${svg("book")}Lektionen<small>lessons</small></button>
    <a class="btab" href="karten.html"${cur("karten.html")}>${svg("cards")}Karten<small>cards</small></a>
    <a class="btab" href="spickzettel.html"${cur("spickzettel.html")}>${svg("note")}Spickzettel<small>cheat sheet</small></a>
    <a class="btab" href="tests.html"${cur("tests.html")}>${svg("target")}Tests<small>practise</small></a>
  </nav>
  <div class="sheet" id="lessonSheet" hidden>
    <div class="scrim" data-close></div>
    <div class="sheetbox" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
      <div class="sheettop">
        <div class="grab" aria-hidden="true"></div>
        <div class="sheethead"><h2 id="sheetTitle">Alle Lektionen <span class="en">(all lessons)</span></h2><button class="xbtn" type="button" data-close aria-label="Schließen (close)">✕</button></div>
        <div class="partchips" role="group" aria-label="Teil wählen (jump to part)">${parts.map(p => `<button type="button" class="pchip" data-jump="g-${p[0]}"><b>${p[0]}</b> ${p[1].split(" & ").pop()}</button>`).join("")}</div>
      </div>
      <div class="sheetgrid">
      ${parts.map(([letter, de, en, page, ls]) => `<div class="lgroup" id="g-${letter}"><h3><a href="${page}" title="${de}: Seite öffnen (open page)">Teil ${letter} · ${de} <span>(${en})</span></a></h3>` +
        ls.map(([id, n, lde, len]) => `<a class="litem" href="${page === here ? "" : page}#${id}" data-id="${id}"><span class="n">${n}</span><span class="t"><b>${lde}</b><small>${len}</small></span></a>`).join("") + `</div>`).join("")}
      </div>
      <div class="sheetmore">
        <a class="litem more" href="tests.html"><span class="n">${svg("target")}</span><span class="t"><b>Alle Tests</b><small>all tests</small></span></a>
        <a class="litem more" href="karten.html"><span class="n">${svg("cards")}</span><span class="t"><b>Bildkarten</b><small>picture cards</small></span></a>
        <a class="litem more" href="spickzettel.html"><span class="n">${svg("note")}</span><span class="t"><b>Spickzettel</b><small>cheat sheet</small></span></a>
      </div>
    </div>
  </div>
  <button class="totop" type="button" id="toTop" aria-label="Nach oben (back to top)" title="Nach oben">${svg("up")}<span>Nach oben</span></button>`);

  const sheet = document.getElementById("lessonSheet");
  let lastFocus = null;
  function openSheet() {
    lastFocus = document.activeElement; sheet.hidden = false; document.body.classList.add("sheet-open");
    const on = sheet.querySelector(".litem.on") || sheet.querySelector(".litem");
    if (on) { on.scrollIntoView({ block: "center" }); on.focus({ preventScroll: true }); }
  }
  function closeSheet() { if (sheet.hidden) return; sheet.hidden = true; document.body.classList.remove("sheet-open"); if (lastFocus) lastFocus.focus({ preventScroll: true }); }
  window.closeLessonSheet = closeSheet;
  document.addEventListener("click", e => {
    if (e.target.closest("[data-sheet]")) { e.preventDefault(); openSheet(); return; }
    if (e.target.closest("[data-close]")) { closeSheet(); return; }
    const j = e.target.closest("[data-jump]");
    if (j) { const g = document.getElementById(j.dataset.jump), box = sheet.querySelector(".sheetbox"), top = sheet.querySelector(".sheettop");
      if (g) box.scrollTo({ top: g.offsetTop - top.offsetHeight + 8, behavior: reduce() ? "auto" : "smooth" }); return; }
    const a = e.target.closest(".sheet .litem");
    if (a && a.getAttribute("href").startsWith("#")) { closeSheet(); }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });
  function reduce() { return window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches; }

  /* back-to-top: appears after about one screen of scrolling */
  const totop = document.getElementById("toTop");
  let ticking = false;
  function checkTop() { ticking = false; totop.classList.toggle("show", window.scrollY > Math.max(480, window.innerHeight * 0.8)); }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(checkTop); } }, { passive: true });
  checkTop();
  totop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduce() ? "auto" : "smooth" });
    const h = document.querySelector("#site-header .brand h1 a"); if (h) h.focus({ preventScroll: true });
  });

  /* previous / next part at the end of a part page */
  const foot = document.getElementById("site-footer");
  const pi = parts.findIndex(p => p[3] === here);
  if (pi >= 0 && foot) {
    const prev = pi > 0 ? { href: parts[pi - 1][3], k: `Teil ${parts[pi - 1][0]}`, t: parts[pi - 1][1] } : { href: "index.html", k: "Zurück", t: "Übersicht" };
    const next = pi < parts.length - 1 ? { href: parts[pi + 1][3], k: `Teil ${parts[pi + 1][0]}`, t: parts[pi + 1][1] } : { href: "tests.html", k: "Jetzt üben", t: "Tests" };
    foot.insertAdjacentHTML("beforebegin", `<nav class="pager" aria-label="Weiter (next)">
      <a class="prev" href="${prev.href}">${svg("back")}<span><small>${prev.k}</small><b>${prev.t}</b></span></a>
      <a class="next" href="${next.href}"><span><small>${next.k}</small><b>${next.t}</b></span>${svg("arrow")}</a></nav>`);
  }

  /* lesson pages: menu button in the sticky bar + highlight the lesson being read */
  const subnav = document.querySelector(".subnav");
  if (!subnav) return;
  const links = [...subnav.querySelectorAll("a")];
  subnav.insertAdjacentHTML("afterbegin", `<button class="lessbtn" type="button" data-sheet aria-haspopup="dialog">${svg("menu")}Lektionen<span class="curl" id="curl"></span></button>`);
  function mark(id) {
    links.forEach(a => {
      const on = a.getAttribute("href") === "#" + id; a.classList.toggle("on", on);
      if (on && subnav.scrollWidth > subnav.clientWidth) subnav.scrollTo({ left: a.offsetLeft - 120, behavior: "smooth" });
    });
    sheet.querySelectorAll(".litem").forEach(a => a.classList.toggle("on", a.dataset.id === id));
    const a = links.find(x => x.getAttribute("href") === "#" + id);
    document.getElementById("curl").textContent = a ? " · " + a.textContent.trim() : "";
  }
  const sections = [...document.querySelectorAll("section.lesson")];
  if (sections.length) mark((sections.find(s => "#" + s.id === location.hash) || sections[0]).id);
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) mark(en.target.id); }), { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(s => io.observe(s));
  }
})();

/* Footer on every page: link columns, credit, short disclaimer and the full notes. Edit here once for all pages. */
(function () {
  const f = document.getElementById("site-footer");
  if (!f) return;
  const L = window.LEVEL;
  const link = ([href, de, en]) => `<a href="${href}">${de}${en ? ` <small>${en.replace(/^Teil [A-D] · /, "")}</small>` : ""}</a>`;
  const cols = L
    ? `<nav class="fcol" aria-label="Lernen"><h2>Lernen <span>learn</span></h2>${L.pages.filter(p => p[3] !== "tools").map(link).join("")}</nav>
       <nav class="fcol" aria-label="Üben und Nachschlagen"><h2>Üben <span>practise &amp; look up</span></h2>${L.pages.filter(p => p[3] === "tools").map(link).join("")}${L.mix ? `<a href="${L.mix}">Gemischter Test <small>20 questions</small></a>` : ""}</nav>`
    : `<nav class="fcol" aria-label="Level"><h2>Level</h2><a href="a1/index.html">A1 <small>Deutsch A1 Trainer</small></a></nav>`;
  f.innerHTML = `
  <div class="fgrid">
    <div class="fbrand">
      <div class="flagline" aria-hidden="true"><span style="background:var(--der)"></span><span style="background:var(--die)"></span><span style="background:var(--das)"></span></div>
      <p class="fname">Lerne Deutsch</p>
      <p>Kostenlos Deutsch üben: Lektionen, Merkbilder und Tests. <span class="en">(Free German practice: lessons, memory pictures and tests.)</span></p>
    </div>
    ${cols}
  </div>
  <div class="fbar">
    <p class="love">Mit <span class="heart" aria-label="Liebe">♥</span> gemacht von <b>lydialim</b> · © 2026 Lerne Deutsch</p>
    <p>Entstanden auf meiner Deutsch-Lernreise, zusammen mit Claude. <span class="en">(Created on my German learning journey, together with Claude.)</span></p>
    <p>Privates Lernprojekt, nicht verbunden mit dem Goethe-Institut oder Klett. Keine Cookies, kein Tracking. <span class="en">(Private project, not affiliated with the Goethe-Institut or Klett. No cookies, no tracking.)</span></p>
  </div>
  <details class="fnotes">
    <summary>Hinweise &amp; Datenschutz <span class="en">(notes &amp; privacy)</span></summary>
    <p>Privates, nichtkommerzielles Lernprojekt. Kein offizielles Material und ohne Verbindung zum Goethe-Institut oder zu Ernst Klett Sprachen. <span class="nb">„Goethe-Zertifikat“</span> und <span class="nb">„Netzwerk neu“</span> sind Marken ihrer jeweiligen Inhaber. Von einer Lernenden erstellt: Fehler sind möglich, bitte mit Kurs oder Lehrbuch vergleichen.
    <span class="en">(Private, non-commercial learning project. Not official material of, and not affiliated with, the Goethe-Institut or Ernst Klett Sprachen. "Goethe-Zertifikat" and "Netzwerk neu" belong to their owners. Made by a learner: mistakes are possible, so please compare with your course or textbook.)</span></p>
    <p>Datenschutz: keine Cookies, kein Tracking, keine externen Schriftarten. Testergebnisse, Texte und Aufnahmen im Sprechtrainer bleiben nur in deinem Browser. Gehostet bei GitHub Pages.
    <span class="en">(Privacy: no cookies, no tracking, no external fonts. Test results, texts and speaking recordings stay only in your browser. Hosted on GitHub Pages.)</span></p>
  </details>
  <button class="fup" type="button" data-top>↑ Nach oben <span class="en">(back to top)</span></button>`;
  f.querySelector("[data-top]").addEventListener("click", () => {
    const calm = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
  });
  /* overview cards: lesson lists start open on wide screens, folded on phones */
  if (window.matchMedia && matchMedia("(min-width: 760px)").matches) document.querySelectorAll("details.fold").forEach(d => { d.open = true; });
})();
