/* Renders STORIES (geschichten.html, <div id="stories">) or DIALOGS (dialoge.html, <div id="dialogs">) from texte-data.js. */
(function () {
  const KINDS = { der: "der", die: "die", das: "das", pl: "plc" };
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  /* {der:Kaffee} → coloured noun with a small article tag, {v:geht} → verb */
  const mark = s => esc(s).replace(/\{(der|die|das|pl|v):([^}]+)\}/g, (_, k, w) =>
    k === "v" ? `<span class="vb">${w}</span>` : `<span class="${KINDS[k]}">${w}${k === "pl" ? "" : `<sup>${k}</sup>`}</span>`);
  const plain = s => s.replace(/\{\w+:([^}]+)\}/g, "$1").replace(/(\d+),(\d\d) Euro/g, "$1 Euro $2");
  const tipHtml = t => `<div class="rule"><b>💡 ${esc(plain(t[0]))}</b><span class="en">(${esc(t[1])})</span></div>`;

  function story(s) {
    const panels = s.panels.map((p, i) => `<div class="panel" data-say="${esc(plain(p[1]))}">
      <div class="pic" aria-hidden="true">${p[0]}</div>
      <div class="ptxt"><span class="pn">${i + 1}</span><p class="de">${mark(p[1])}</p><p class="gl pron">${esc(p[2])}</p><p class="en">${esc(p[3])}</p>${p[4] ? `<p class="pron num">${esc(p[4])}</p>` : ""}</div></div>`).join("");
    const quiz = s.quiz.map(q => `<div class="rf" data-ok="${q[2]}"><p class="de">${esc(q[0])} <span class="en">(${esc(q[1])})</span></p>
      <div class="rfb"><button type="button" class="btn ghost" data-a="true">✔ richtig</button><button type="button" class="btn ghost" data-a="false">✘ falsch</button><span class="fb" aria-live="polite"></span></div></div>`).join("");
    return `<section class="lesson story" id="${s.id}"><h2><span class="big">${s.emoji}</span> ${esc(s.title)} <span class="en">(${esc(s.en)})</span></h2>
      <div class="panels">${panels}</div>${tipHtml(s.tip)}<div class="rfbox"><b>Richtig oder falsch? <span class="en">(true or false?)</span></b>${quiz}</div></section>`;
  }

  function dialog(d) {
    const bubbles = d.lines.map(l => `<div class="bub ${l[0] === "A" ? "a" : "b"}" data-who="${l[0]}" data-say="${esc(plain(l[1]))}">
      <span class="av" title="${esc(d.who[l[0] === "A" ? 0 : 1])}">${l[0] === "A" ? "🧑" : "👤"}</span>
      <div class="bt"><small>${esc(d.who[l[0] === "A" ? 0 : 1])}</small><p class="de">${mark(l[1])}</p><p class="gl pron">${esc(l[2])}</p><p class="en">${esc(l[3])}</p>${l[4] ? `<p class="pron num">${esc(l[4])}</p>` : ""}</div></div>`).join("");
    return `<section class="lesson dlg" id="${d.id}"><h2><span class="big">${d.emoji}</span> ${esc(d.title)} <span class="en">(${esc(d.en)})</span></h2>
      <div class="roles" role="group" aria-label="Rollenspiel (role play)"><span>Rollenspiel <span class="en">(role play)</span>:</span>
        <button type="button" class="btn ghost on" data-role="">Alles zeigen</button><button type="button" class="btn ghost" data-role="A">Ich bin ${esc(d.who[0])}</button><button type="button" class="btn ghost" data-role="B">Ich bin ${esc(d.who[1])}</button></div>
      <div class="chat">${bubbles}</div>${tipHtml(d.tip)}</section>`;
  }

  function init() {
    const st = document.getElementById("stories"), dl = document.getElementById("dialogs");
    if (st) st.innerHTML = STORIES.map(story).join("");
    if (dl) dl.innerHTML = DIALOGS.map(dialog).join("");
    const nav = document.getElementById("textnav");
    if (nav) nav.innerHTML = (st ? STORIES : DIALOGS).map(x => `<a href="#${x.id}">${x.emoji} ${esc(x.title)}</a>`).join("");
    if (typeof addSpeakers === "function") addSpeakers(document);
    document.addEventListener("click", e => {
      const a = e.target.closest(".rf [data-a]");
      if (a) {
        const rf = a.closest(".rf");
        rf.querySelector(".fb").textContent = a.dataset.a === rf.dataset.ok ? "✅ Genau! (correct)" : "❌ Nicht ganz. (not quite)";
        rf.classList.toggle("good", a.dataset.a === rf.dataset.ok); rf.classList.toggle("bad", a.dataset.a !== rf.dataset.ok);
        return;
      }
      const r = e.target.closest("[data-role]");
      if (r) {
        const sec = r.closest(".dlg");
        sec.querySelectorAll("[data-role]").forEach(b => b.classList.toggle("on", b === r));
        sec.querySelectorAll(".bub").forEach(b => { b.classList.remove("shown"); b.classList.toggle("hide", !!r.dataset.role && b.dataset.who === r.dataset.role); });
        return;
      }
      const h = e.target.closest(".bub.hide");
      if (h && !e.target.closest(".spk")) h.classList.toggle("shown");
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
