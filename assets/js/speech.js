/* Lerne Deutsch: read German aloud with the browser's built-in voice (Web Speech API).
   - speak(text, rate?) reads text in German. Works in Chrome, Edge, Safari (also iPhone) and most Android browsers.
   - Adds a 🔊 button to: every .train, every element with data-say, and example cells in lesson tables
     (columns whose header starts with Beispiel, Deutsch, Satz, Wort, Fragewort, Frage, Antwort, Modalverb, Trennbares).
   - Adds a small voice picker and speed toggle to the page header (saved in this browser).
   Text in .en, .pron, small and em is never read aloud. */
const TTS = (() => {
  const ok = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  let voices = [];
  const pref = () => store.get("voice", "");
  const slow = () => store.get("slow", false);
  function load() {
    if (!ok) return;
    voices = speechSynthesis.getVoices().filter(v => /^de(-|_|$)/i.test(v.lang));
    voices.sort((a, b) => (b.lang === "de-DE") - (a.lang === "de-DE") || (/google|natural|premium|enhanced/i.test(b.name)) - (/google|natural|premium|enhanced/i.test(a.name)));
    fillPicker();
  }
  function voice() { return voices.find(v => v.name === pref()) || voices[0] || null; }
  /* iOS Safari quirks handled here:
     - the first speak() must happen inside a real tap, so we "unlock" speech on the first touch/click;
     - cancel() directly followed by speak() is silently dropped, so cancel only when needed and wait a tick;
     - utterances can be garbage-collected mid-speech and then never play, so keep a reference. */
  let unlocked = false, keep = null;
  function unlock() {
    if (unlocked || !ok) return;
    unlocked = true;
    try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; speechSynthesis.speak(u); } catch (e) {}
  }
  ["touchstart", "touchend", "click"].forEach(ev => document.addEventListener(ev, unlock, { once: false, passive: true, capture: true }));
  function speak(text, rate) {
    if (!ok || !text) return false;
    const busy = speechSynthesis.speaking || speechSynthesis.pending;
    if (busy) speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text));
    u.lang = "de-DE";
    const v = voice(); if (v) u.voice = v;
    u.rate = rate || (slow() ? 0.65 : 0.9);
    keep = u;
    u.onend = u.onerror = () => { if (keep === u) keep = null; };
    const go = () => { if (speechSynthesis.paused) speechSynthesis.resume(); speechSynthesis.speak(u); };
    if (busy) setTimeout(go, 80); else go();
    return true;
  }
  function fillPicker() {
    const sel = document.getElementById("voiceSel"); if (!sel) return;
    sel.innerHTML = voices.length ? voices.map(v => `<option value="${esc(v.name)}"${v === voice() ? " selected" : ""}>${esc(v.name)} (${v.lang})</option>`).join("")
      : `<option value="">Standard (default)</option>`;
    const w = document.getElementById("voiceWarn");
    if (w) w.hidden = voices.length > 0;
  }
  if (ok) { load(); speechSynthesis.onvoiceschanged = load; setTimeout(load, 500); }
  return { ok, speak, load, fillPicker, slow };
})();
const speak = (t, r) => TTS.speak(t, r);

/* text of an element without the English help, pronunciation hints and word-by-word glosses */
function sayText(el) {
  if (el.dataset && el.dataset.say) return el.dataset.say;
  const c = el.cloneNode(true);
  c.querySelectorAll(".en,.pron,small,em,.spk,button,s").forEach(x => x.remove());
  return c.textContent.replace(/\([^)]*\)/g, " ").replace(/[→·|=]/g, ", ").replace(/…/g, " ").replace(/\s+/g, " ").trim();
}
function spkBtn(getText, label) {
  const b = document.createElement("button");
  b.type = "button"; b.className = "spk"; b.textContent = "🔊"; b.title = "Anhören (listen)";
  b.setAttribute("aria-label", "Anhören (listen)" + (label ? ": " + label : ""));
  b.onclick = e => { e.preventDefault(); e.stopPropagation(); speak(getText()); };
  return b;
}
function addSpeakers(root) {
  if (!TTS.ok) return;
  root = root || document;
  root.querySelectorAll(".train").forEach(t => {
    if (t.querySelector(":scope > .spk")) return;
    t.appendChild(spkBtn(() => [...t.querySelectorAll(".car")].map(sayText).join(" ")));
  });
  root.querySelectorAll("[data-say]").forEach(el => {
    if (el.querySelector(":scope > .spk") || el.tagName === "BUTTON") return;
    el.appendChild(spkBtn(() => el.dataset.say));
  });
  root.querySelectorAll(".lesson table, .ccard table").forEach(tb => {
    const heads = [...tb.querySelectorAll("thead th")].map(th => th.textContent.trim());
    const cols = heads.map((h, i) => /^(Beispiel|Deutsch|Satz|Wort(?! für)|Fragewort|Frage|Antwort|Modalverb|Trennbares|Dialog|Sie sagen|Land|Sprache|Zahl|Tag|Monat)/i.test(h) && !/English|Wort für Wort/i.test(h) ? i : -1).filter(i => i >= 0);
    if (!cols.length) return;
    tb.querySelectorAll("tbody tr").forEach(tr => cols.forEach(i => {
      const td = tr.children[i]; if (!td || td.querySelector(".spk") || td.classList.contains("en")) return;
      const txt = sayText(td); if (!txt) return;
      td.appendChild(spkBtn(() => sayText(td)));
    }));
  });
}
/* clickable cells: numbers, letters */
document.addEventListener("click", e => {
  const c = e.target.closest(".numcell,.abcc,[data-tap-say]"); if (!c || e.target.closest(".spk")) return;
  const t = c.dataset.tapSay || c.dataset.say || sayText(c); if (t) speak(t);
});
function voicePicker() {
  const h = document.getElementById("site-header"); if (!h || document.getElementById("voiceBox")) return;
  const box = document.createElement("details"); box.id = "voiceBox"; box.className = "voicepick";
  const inner = TTS.ok
    ? `<span>🔊 Stimme <span class="en">(voice)</span></span><select id="voiceSel" aria-label="German voice"></select>
       <label><input type="checkbox" id="slowChk"${TTS.slow() ? " checked" : ""}> 🐢 langsam <span class="en">(slow)</span></label>
       <button type="button" class="spk" id="voiceTest">Test</button>
       <span class="warn" id="voiceWarn" hidden>No German voice found on this device. Audio may sound English. <a href="../einrichtung.html">How to add a German voice →</a></span>`
    : `<span class="warn">This browser cannot read text aloud. Try Chrome, Edge or Safari.</span>`;
  box.innerHTML = `<summary>🔊 Stimme &amp; Tempo <span class="en">(voice &amp; speed)</span></summary><div class="vbody">${inner}</div>`;
  box.open = !(window.matchMedia && matchMedia("(max-width: 759px)").matches);
  h.appendChild(box);
  if (!TTS.ok) return;
  TTS.fillPicker();
  $("#voiceSel").onchange = e => { store.set("voice", e.target.value); speak("Hallo! Ich spreche Deutsch."); };
  $("#slowChk").onchange = e => store.set("slow", e.target.checked);
  $("#voiceTest").onclick = () => speak("Hallo! Ich heiße Anna. Ich wohne in München. Meine Nummer ist null, eins, sieben, sechs.");
}
document.addEventListener("DOMContentLoaded", () => { voicePicker(); addSpeakers(); });
