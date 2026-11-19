/* Day bar: a 24-hour picture (Nacht, Morgen, Vormittag ...) drawn from DAYTIMES in data.js, so it can never disagree with the data.
   Use <div data-daybar></div> in a page and load data.js + daybar.js. */
(function () {
  const hosts = document.querySelectorAll("[data-daybar]");
  if (!hosts.length || typeof DAYTIMES === "undefined") return;
  const X0 = 10, W = 540, px = h => X0 + h * W / 24;
  /* one segment per time of day; the night (22–6) wraps around midnight, so it is drawn as two segments */
  const segs = [];
  DAYTIMES.forEach(([word, , , adv, hours]) => {
    const [a, b] = hours.split("–").map(Number);
    if (a < b) segs.push({ word, adv, a, b }); else { segs.push({ word, adv, a, b: 24 }); segs.push({ word, adv, a: 0, b }); }
  });
  const night = s => s.word === "Nacht";
  const bars = segs.map((s, i) => {
    const x = px(s.a), w = px(s.b) - x, cx = x + w / 2;
    const fill = night(s) ? "var(--die)" : "var(--der)", op = night(s) ? 1 : (i % 2 ? 0.9 : 0.75);
    const label = night(s) ? (w >= 100 ? "die Nacht" : "") : s.word;
    return `<rect x="${x}" y="8" width="${w}" height="34" rx="${night(s) ? 4 : 0}" fill="${fill}" fill-opacity="${op}"/>`
      + (label ? `<text x="${cx}" y="30" font-size="${w >= 90 ? 13 : 12}" font-weight="700" fill="#fff">${label}</text>` : "")
      + `<text x="${cx}" y="78" font-size="13" font-style="italic" fill="var(--muted)">${s.adv}</text>`;
  }).join("");
  const ticks = [...new Set([0, 24, ...segs.flatMap(s => [s.a, s.b])])].sort((a, b) => a - b)
    .map(h => `<text x="${px(h)}" y="58" font-size="13" fill="var(--ink)">${h}</text>`).join("");
  const svg = `<svg viewBox="0 0 560 90" role="img" aria-label="24-hour bar: ${DAYTIMES.map(d => `${d[0]} ${d[4].replace("–", " to ")}`).join(", ")}" style="width:100%;height:auto;max-width:560px;display:block;margin:6px 0 4px"><g font-family="inherit" text-anchor="middle">${bars}${ticks}</g></svg>`;
  hosts.forEach(h => { h.innerHTML = svg; });
})();
