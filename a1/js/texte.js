/* Renders STORIES (geschichten.html, <div id="stories">) or DIALOGS (dialoge.html, <div id="dialogs">) from texte-data.js. */
(function () {
  const KINDS = { der: "der", die: "die", das: "das", pl: "plc" };
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  /* {der:Kaffee} → coloured noun with a small article tag, {v:geht} → verb */
  const mark = (s, sup = true) => esc(s).replace(/\{(der|die|das|pl|v):([^}]+)\}/g, (_, k, w) =>
    k === "v" ? `<span class="vb">${w}</span>` : `<span class="${KINDS[k]}">${w}${k === "pl" || !sup ? "" : `<sup>${k}</sup>`}</span>`);
  const plain = s => s.replace(/\{\w+:([^}]+)\}/g, "$1").replace(/(\d+),(\d\d) Euro/g, "$1 Euro $2");
  const tipHtml = t => `<div class="rule"><b>💡 ${esc(plain(t[0]))}</b><span class="en">(${esc(t[1])})</span></div>`;

  const KIND = { news: ["📰", "Nachrichten", "news"], story: ["📖", "Geschichte", "story"], mix: ["📖📰", "Geschichte + Nachrichten", "story + news"] };
  const CHIP = { der: "der", die: "die", das: "das", pl: "plc" };
  const sentence = x => `<span class="s" role="button" tabindex="0" aria-expanded="false" data-say="${esc(plain(x[0]))}"><span class="sd">${mark(x[0], false)}</span><span class="sg pron">${esc(x[1])}</span><span class="se en">${esc(x[2])}</span>${x[3] ? `<span class="sp pron">${esc(x[3])}</span>` : ""}</span>`;

  function story(s) {
    const k = KIND[s.kind];
    const text = s.paras.map(p => `<p class="para">${p.map(sentence).join(" ")}</p>`).join("");
    const words = s.words.map(w => `<span class="chip ${CHIP[w[0]] || ""}">${w[0] && w[0] !== "pl" ? w[0] + " " : ""}<b>${esc(w[1])}</b><small>${esc(w[2])}</small></span>`).join("");
    const quiz = s.quiz.map(q => `<div class="rf" data-ok="${q[2]}"><p class="de">${esc(q[0])} <span class="en">(${esc(q[1])})</span></p>
      <div class="rfb"><button type="button" class="btn ghost" data-a="true">✔ richtig</button><button type="button" class="btn ghost" data-a="false">✘ falsch</button><span class="fb" aria-live="polite"></span></div></div>`).join("");
    const src = s.source ? `<p class="srcnote en">Quelle (source): <a class="srclink" href="${s.source[1]}" rel="noopener">${esc(s.source[0])}</a> · ${s.date}. Simplified and shortened into A1 German.</p>` : "";
    return `<section class="lesson story ${s.kind}" id="${s.id}">
      <p class="kindtag"><span>${k[0]} ${k[1]} <span class="en">(${k[2]})</span></span>${s.date ? `<span class="en">${s.date}</span>` : ""}</p>
      <h2>${esc(s.title)} <span class="en">(${esc(s.en)})</span></h2>
      <figure class="scene" role="img" aria-label="${esc(s.en)}"><svg viewBox="0 0 600 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${SCENES[s.scene] || ""}</svg></figure>
      <p class="sum en">${esc(s.sum)}</p>
      <div class="text">${text}</div>
      <p class="readrow"><button type="button" class="btn ghost" data-read="${s.id}">🔊 Ganze Geschichte vorlesen <span class="en">(read aloud)</span></button></p>
      ${src}
      <div class="wordbox"><b>Neue Wörter <span class="en">(new words)</span></b><div class="chips">${words}</div></div>
      ${tipHtml(s.tip)}<div class="rfbox"><b>Richtig oder falsch? <span class="en">(true or false?)</span></b>${quiz}</div></section>`;
  }

  /* read a whole story aloud, paragraph by paragraph (long texts are unreliable in one go on iPhone) */
  let reading = null;
  function readAloud(btn) {
    if (typeof speak !== "function") return;
    if (reading) { reading = null; if (window.speechSynthesis) speechSynthesis.cancel(); document.querySelectorAll("[data-read]").forEach(b => b.classList.remove("on")); if (btn.classList.contains("was")) { btn.classList.remove("was"); return; } }
    const sec = btn.closest(".story"), paras = [...sec.querySelectorAll(".para")].map(p => [...p.querySelectorAll(".s")].map(x => x.dataset.say).join(" "));
    const token = reading = {}; btn.classList.add("on", "was");
    const next = i => { if (reading !== token || i >= paras.length) { if (reading === token) { reading = null; btn.classList.remove("on", "was"); } return; } speak(paras[i], { done: () => next(i + 1) }); };
    next(0);
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
    if (st) { st.innerHTML = STORIES.map(story).join(""); }
    if (dl) dl.innerHTML = DIALOGS.map(dialog).join("");
    if (st) document.querySelector(".storybar")?.addEventListener("click", e => {
      const b = e.target.closest("[data-mode]"); if (!b) return;
      const on = st.classList.toggle("m-" + b.dataset.mode); b.setAttribute("aria-pressed", String(on)); b.classList.toggle("on", on);
    });
    const nav = document.getElementById("textnav");
    if (nav) nav.innerHTML = (st ? STORIES : DIALOGS).map(x => `<a href="#${x.id}">${st ? KIND[x.kind][0] : x.emoji} ${esc(x.title.replace(/^Nachrichten: /, ""))}</a>`).join("");
    if (typeof addSpeakers === "function") addSpeakers(document);
    const toggle = el => { const o = el.classList.toggle("open"); el.setAttribute("aria-expanded", String(o)); };
    document.addEventListener("keydown", e => { const el = e.target.closest && e.target.closest(".s"); if (el && (e.key === "Enter" || e.key === " ") && e.target === el) { e.preventDefault(); toggle(el); } });
    document.addEventListener("click", e => {
      const rd = e.target.closest("[data-read]"); if (rd) { readAloud(rd); return; }
      const sn = e.target.closest(".s"); if (sn && !e.target.closest(".spk")) { toggle(sn); return; }
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
