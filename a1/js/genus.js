/* Renders genus.html from GX (genus-data.js). */
(function () {
  const G = { m: ["der", "der", "masculine"], f: ["die", "die", "feminine"], n: ["das", "das", "neuter"] };
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  const STRENGTH = { rule: "rule · no real exceptions", strong: "strong · a few exceptions", tendency: "tendency · a good guess only" };

  /* 1. ending explorer: three blocks, each with its own detail box right under the chips */
  let onlyA1 = true;
  function endings() {
    const box = $("gx-endings"); if (!box) return;
    box.innerHTML = ["m", "f", "n"].map(g => `
      <div class="gx-col ${G[g][0]}">
        <h4><span class="${G[g][0]}">${G[g][0]}</span> <span class="en">${G[g][2]}</span></h4>
        <div class="gx-chips">${GX.endings.filter(e => e[1] === g && (!onlyA1 || e[3])).map(e =>
          `<button type="button" class="gx-chip ${e[2]}" data-end="${esc(e[0])}" aria-pressed="false">${esc(e[0])}</button>`).join("")}</div>
        <div class="gx-detail" id="gx-d-${g}" aria-live="polite">Tap an ending.</div>
      </div>`).join("");
  }
  document.addEventListener("click", ev => {
    const f = ev.target.closest("[data-a1]");
    if (f) {
      onlyA1 = f.dataset.a1 === "1";
      document.querySelectorAll("[data-a1]").forEach(b => b.setAttribute("aria-pressed", String(b === f)));
      endings(); return;
    }
    const b = ev.target.closest(".gx-chip"); if (!b) return;
    const e = GX.endings.find(x => x[0] === b.dataset.end), g = e[1], col = b.closest(".gx-col");
    col.querySelectorAll(".gx-chip").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    $("gx-d-" + g).innerHTML = `<b class="${G[g][0]}">${esc(e[0])} → ${G[g][0]}</b> <span class="en">${STRENGTH[e[2]]}</span>
      <div>${esc(e[4])}</div><div class="gx-exc"><span class="en">exceptions:</span> ${esc(e[5])}</div>`;
  });

  /* 2. reliability bars */
  const clues = $("gx-clues");
  if (clues) clues.innerHTML = GX.clues.map(c => `
    <div class="gx-bar"><span class="gx-bl">${esc(c[0])}<small class="en"> ${esc(c[3])}</small></span>
    <span class="gx-track"><i class="${G[c[1]][0]}-bg" style="width:${c[2]}%"></i><b>${c[2] >= 100 ? "≈100" : c[2]} %</b></span></div>`).join("");

  /* 3. meaning groups with filter */
  function semantic(f) {
    const box = $("gx-sem"); if (!box) return;
    box.innerHTML = GX.semantic.filter(r => f === "all" || r[0] === f).map(r => `
      <div class="gx-sem ${G[r[0]][0]}-bg"><b class="${G[r[0]][0]}">${G[r[0]][0]}</b>
      <div><div class="gx-st">${esc(r[1])}</div><div>${esc(r[2])}</div>
      ${r[3] === "none common" ? "" : `<div class="gx-exc"><span class="en">not:</span> ${esc(r[3])}</div>`}</div></div>`).join("");
  }
  document.addEventListener("click", ev => {
    const b = ev.target.closest("[data-sem]"); if (!b) return;
    document.querySelectorAll("[data-sem]").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    semantic(b.dataset.sem);
  });

  /* 4. same word, different gender */
  const tw = $("gx-twins");
  if (tw) tw.innerHTML = GX.twins.map(t => `
    <div class="gx-twin"><h4>${esc(t[0])}</h4>${t[1].map(x =>
      `<div class="gx-tl ${G[x[0]][0]}-bg"><b class="${G[x[0]][0]}">${G[x[0]][0]}</b> ${esc(x[1])}</div>`).join("")}</div>`).join("");

  /* 5. regional variants */
  const rg = $("gx-regional");
  if (rg) rg.innerHTML = GX.regional.map(r => `<tr><td><b>${esc(r[0])}</b></td><td>${esc(r[1])}<br><span class="en">${esc(r[2])}</span></td><td class="en">${esc(r[3])}</td></tr>`).join("");

  /* 6. detective flow (A1 steps carry a badge) */
  const fl = $("gx-flow");
  if (fl) fl.innerHTML = GX.flow.map((s, i) => `
    <li><span class="gx-n">${i + 1}</span><div><b>${esc(s[0])}</b>${s[3] ? ' <span class="gx-a1">A1</span>' : ""}
    <div class="gx-fs">${s[1]}</div><div class="gx-fe">${s[2]}</div></div></li>`).join("");

  endings(); semantic("all");
})();
