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
