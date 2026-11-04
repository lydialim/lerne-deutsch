/* Lerne Deutsch: builds the page header and the level menu from window.LEVEL (see <level>/js/level.js). */
(function () {
  const L = window.LEVEL, el = document.getElementById("site-header");
  if (!L || !el) return;
  const here = location.pathname.split("/").pop() || "index.html";
  el.innerHTML = `
  <div class="flagline" aria-hidden="true"><span style="background:var(--der)"></span><span style="background:var(--die)"></span><span style="background:var(--das)"></span></div>
  <p class="crumb"><a href="../index.html">Lerne Deutsch</a> › ${L.level}</p>
  <h1><a href="index.html">${L.title}</a></h1>
  <nav class="tabs" aria-label="${L.title}">
    ${L.pages.map(([href, de, en]) => `<a class="tab" href="${href}"${href === here ? ' aria-current="page"' : ""}>${de}${en ? ` <small>(${en})</small>` : ""}</a>`).join("")}
    ${L.mix ? `<a class="go" href="${L.mix}">Gemischter Test · 10 Fragen</a>` : ""}
  </nav>`;
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
