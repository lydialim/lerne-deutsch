/* Lerne Deutsch: page shell built from window.LEVEL (see <level>/js/level.js).
   Header + page tabs (wide screens), a bottom tab bar (phones), the lesson menu sheet,
   and the "which lesson am I reading" highlight on lesson pages. */
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
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };
  const svg = k => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg>`;

  el.className = "top";
  el.innerHTML = `
  <div class="brand">
    <div class="flagline" aria-hidden="true"><span style="background:var(--der)"></span><span style="background:var(--die)"></span><span style="background:var(--das)"></span></div>
    <p class="crumb"><a href="../index.html">Lerne Deutsch</a> › ${L.level}</p>
    <h1><a href="index.html">${L.title}</a></h1>
  </div>
  <nav class="tabs toptabs" aria-label="${L.title}">
    ${L.pages.map(([href, de, en]) => `<a class="tab" href="${href}"${href === here ? ' aria-current="page"' : ""}>${de}${en ? ` <small>(${en})</small>` : ""}</a>`).join("")}
    ${L.mix ? `<a class="go" href="${L.mix}">Gemischter Test · 20 Fragen</a>` : ""}
  </nav>`;

  /* bottom tab bar for phones */
  const cur = h => h === here ? ' aria-current="page"' : "";
  document.body.insertAdjacentHTML("beforeend", `
  <nav class="bnav" aria-label="Menü (menu)">
    <a class="btab" href="index.html"${cur("index.html")}>${svg("home")}Start<small>overview</small></a>
    <button class="btab" type="button" data-sheet${onPartPage ? ' aria-current="page"' : ""}>${svg("book")}Lektionen<small>lessons</small></button>
    <a class="btab" href="tests.html"${cur("tests.html")}>${svg("target")}Tests<small>practise</small></a>
    <a class="btab" href="spickzettel.html"${cur("spickzettel.html")}>${svg("note")}Spickzettel<small>cheat sheet</small></a>
  </nav>
  <div class="sheet" id="lessonSheet" hidden>
    <div class="scrim" data-close></div>
    <div class="sheetbox" role="dialog" aria-modal="true" aria-labelledby="sheetTitle">
      <div class="grab" aria-hidden="true"></div>
      <div class="sheethead"><h2 id="sheetTitle">Alle Lektionen <span class="en">(all lessons)</span></h2><button class="xbtn" type="button" data-close aria-label="Schließen (close)">✕</button></div>
      ${parts.map(([letter, de, en, page, ls]) => `<div class="lgroup"><h3>Teil ${letter} · ${de} <span>(${en})</span></h3>` +
        ls.map(([id, n, lde, len]) => `<a class="litem" href="${page === here ? "" : page}#${id}" data-id="${id}"><span class="n">${n}</span><span class="t"><b>${lde}</b><small>${len}</small></span></a>`).join("") + `</div>`).join("")}
      <a class="litem more" href="tests.html"><span class="n">${svg("target")}</span><span class="t"><b>Alle Tests</b><small>all tests</small></span></a>
    </div>
  </div>`);

  const sheet = document.getElementById("lessonSheet");
  let lastFocus = null;
  function openSheet() {
    lastFocus = document.activeElement; sheet.hidden = false;
    const on = sheet.querySelector(".litem.on") || sheet.querySelector(".litem");
    if (on) { on.scrollIntoView({ block: "center" }); on.focus({ preventScroll: true }); }
  }
  function closeSheet() { if (sheet.hidden) return; sheet.hidden = true; if (lastFocus) lastFocus.focus({ preventScroll: true }); }
  window.closeLessonSheet = closeSheet;
  document.addEventListener("click", e => {
    if (e.target.closest("[data-sheet]")) { e.preventDefault(); openSheet(); return; }
    if (e.target.closest("[data-close]")) { closeSheet(); return; }
    const a = e.target.closest(".sheet .litem");
    if (a && a.getAttribute("href").startsWith("#")) { closeSheet(); }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });

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

/* Footer on every page: credit, disclaimer and privacy note. Edit here once for all pages. */
(function () {
  const f = document.getElementById("site-footer");
  if (!f) return;
  f.innerHTML = `
  <p class="love">Mit <span class="heart" aria-label="Liebe">♥</span> gemacht von <b>lydialim</b> · © 2026 Lerne Deutsch</p>
  <p>Entstanden auf meiner Deutsch-Lernreise, zusammen mit Claude. <span class="en">(Created on my German learning journey, together with Claude.)</span></p>
  <p>Privates, nichtkommerzielles Lernprojekt. Kein offizielles Material und ohne Verbindung zum Goethe-Institut oder zu Ernst Klett Sprachen. <span class="nb">„Goethe-Zertifikat“</span> und <span class="nb">„Netzwerk neu“</span> sind Marken ihrer jeweiligen Inhaber. Von einer Lernenden erstellt: Fehler sind möglich, bitte mit Kurs oder Lehrbuch vergleichen.
  <span class="en">(Private, non-commercial learning project. Not official material of, and not affiliated with, the Goethe-Institut or Ernst Klett Sprachen. "Goethe-Zertifikat" and "Netzwerk neu" belong to their owners. Made by a learner: mistakes are possible, so please compare with your course or textbook.)</span></p>
  <p>Datenschutz: keine Cookies, kein Tracking, keine externen Schriftarten. Testergebnisse bleiben nur in deinem Browser. Gehostet bei GitHub Pages.
  <span class="en">(Privacy: no cookies, no tracking, no external fonts. Test results stay only in your browser. Hosted on GitHub Pages.)</span></p>`;
})();
