/* Lerne Deutsch: read German aloud with the browser's built-in voice (Web Speech API).
   - speak(text, rate?) reads text in German. Works in Chrome, Edge, Safari (also iPhone) and most Android browsers.
   - Adds a 🔊 button to: every .train, every element with data-say, and example cells in lesson tables
     (columns whose header starts with Beispiel, Deutsch, Satz, Wort, Fragewort, Frage, Antwort, Modalverb, Trennbares).
   - Adds a small voice picker and speed toggle to the page header (saved in this browser).
   Text in .en, .pron, small and em is never read aloud. */
const TTS = (() => {
  const ok = typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
  let voices = [];
  const pref = () => localStore.get("voice", "");
  const slow = () => localStore.get("slow", false);
  /* a German voice: the language code starts with de (de-DE, de_DE or plain de) */
  const isGermanVoice = v => /^de(-|_|$)/i.test(v.lang);
  const germanVoices = () => ok ? speechSynthesis.getVoices().filter(isGermanVoice) : [];

  /* ---- diagnostics: what Safari actually did (shown under the voice picker, also in the console) ---- */
  const diag = { voices: 0, last: "idle", err: "", n: 0 };
  function diagText() {
    const s = ok ? speechSynthesis : {};
    return `voices:${diag.voices} · last:${diag.last}${diag.err ? " (" + diag.err + ")" : ""} · speaking:${!!s.speaking} pending:${!!s.pending} paused:${!!s.paused}`;
  }
  function report(ev, err) {
    diag.last = ev; diag.err = err || "";
    try { console.log("[TTS]", diagText()); } catch (e) {}
    const el = document.getElementById("voiceDiag"); if (el) el.textContent = diagText();
  }
  function note(msg) {
    let n = document.getElementById("ttsNote");
    if (!n) {
      n = document.createElement("div"); n.id = "ttsNote"; n.setAttribute("role", "status");
      n.style.cssText = "position:fixed;left:8px;right:8px;bottom:70px;z-index:99;background:#7a1f1f;color:#fff;padding:8px 12px;border-radius:10px;font-size:13px";
      document.body.appendChild(n);
    }
    n.textContent = msg; n.hidden = false;
    clearTimeout(note.t); note.t = setTimeout(() => { n.hidden = true; }, 8000);
  }

  /* ---- voices: iOS fills the list late (or only after the first tap), so keep retrying ---- */
  function load() {
    if (!ok) return;
    voices = germanVoices();
    voices.sort((a, b) => (b.lang === "de-DE") - (a.lang === "de-DE") || (/google|natural|premium|enhanced/i.test(b.name)) - (/google|natural|premium|enhanced/i.test(a.name)));
    diag.voices = voices.length;
    fillPicker();
    return voices.length;
  }
  /* poll for up to ~15 s until the browser has produced a voice list */
  function pollVoices(tries) {
    if (!ok || load() || tries <= 0) { report(diag.last, diag.err); return; }
    setTimeout(() => pollVoices(tries - 1), 300);
  }
  function voice() {
    if (!voices.length) load();                         /* late list: look again right before speaking */
    return voices.find(v => v.name === pref()) || voices[0] || null;
  }

  /* ---- speaking ----
     iOS needs speak() to run synchronously inside the tap, so we cannot wait after cancel().
     Instead: cancel + speak in the same tick, ignore stale events from the cancelled utterance
     (generation token), and use a watchdog that retries once if Safari never starts. */
  let keep = null;                                      /* keep a reference: Safari may garbage-collect a playing utterance */
  let lastText = "", lastAt = 0;
  /* speak(text, options): options = {rate?: 0.6 (slow), done?: called once the sentence has finished, retry?: internal} */
  function speak(text, options) {
    const { rate, done, retry } = options || {};
    if (!ok || !text) return false;
    /* ignore the same word fired twice within 0.6 s (double tap / touch + click) */
    const now = Date.now();
    if (!retry && text === lastText && now - lastAt < 600) return true;
    if (!retry) { lastText = text; lastAt = now; }
    const my = ++diag.n;
    try {
      const s = speechSynthesis;
      if (s.speaking || s.pending || s.paused) { s.cancel(); report("cancel-previous"); }
      if (s.paused) s.resume();
      const u = new SpeechSynthesisUtterance(String(text));
      u.lang = "de-DE";
      const v = voice(); if (v) u.voice = v;
      u.rate = rate || (slow() ? 0.65 : 0.9);
      keep = u;
      let started = false;
      u.onstart = () => { if (my !== diag.n) return; started = true; report("started"); };
      u.onend = () => { if (my !== diag.n) return; keep = null; report(started ? "finished" : "ended-without-start"); if (done) done(); };
      u.onerror = e => {
        if (my !== diag.n) return;                      /* error from a cancelled, older utterance */
        keep = null;
        const code = (e && e.error) || "unknown";
        report("error", code);
        if (!/canceled|interrupted/.test(code) && done) done();
        if (!/canceled|interrupted/.test(code)) note("Audio error: " + code + ". Check the silent switch, volume and the German voice (see Einrichtung).");
      };
      s.speak(u);
      report("queued");
      /* watchdog: if nothing started after 1.5 s, the queue is stuck */
      setTimeout(() => {
        if (my !== diag.n || started) return;
        /* Safari can play without ever firing "start": if audio is running, do not say it a second time */
        if (s.speaking) { report("playing-without-start-event"); return; }
        report("stuck");
        if (!retry) { try { s.cancel(); s.resume(); } catch (e) {} speak(text, { rate, done, retry: true }); }
        else note("Safari did not start the audio. Tap 🔊 again, check the silent switch and volume, or reload the page. " + diagText());
      }, 1500);
    } catch (e) { report("exception", e.message); note("Audio failed: " + e.message); return false; }
    return true;
  }
  function fillPicker() {
    const sel = document.getElementById("voiceSel"); if (!sel) return;
    sel.innerHTML = voices.length ? voices.map(v => `<option value="${esc(v.name)}"${v === voice() ? " selected" : ""}>${esc(v.name)} (${v.lang})</option>`).join("")
      : `<option value="">Standard (default)</option>`;
    const w = document.getElementById("voiceWarn");
    if (w) w.hidden = voices.length > 0;
  }
  if (ok) {
    load();
    if (speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", load); else speechSynthesis.onvoiceschanged = load;
    pollVoices(50);
    /* first tap: iOS often only exposes voices after a user gesture */
    document.addEventListener("touchstart", () => { if (!voices.length) pollVoices(10); }, { once: true, passive: true });
  }
  return { ok, speak, load, fillPicker, slow, germanVoices, diagText, report };
})();
/* the shorthand used by lessons and tests: speak(text) or speak(text, {rate: 0.6, done: fn}) */
const speak = (text, options) => TTS.speak(text, options);

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
    /* the header must start with one of these words as a whole word: "Wortart" or "Tagesablauf" are not speech columns */
    const cols = heads.map((h, i) => /^(Beispiel|Deutsch|Satz|Wort(?! für)|Fragewort|Frage|Antwort|Modalverb|Trennbares|Dialog|Sie sagen|Land|Sprache|Zahl|Tag|Monat)(?=$|[\s(:,/])/i.test(h) && !/English|Wort für Wort/i.test(h) ? i : -1).filter(i => i >= 0);
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
       <small id="voiceDiag" class="en" style="flex-basis:100%"></small>
       <span class="warn" id="voiceWarn" hidden>No German voice found on this device. Audio may sound English. <a href="../einrichtung.html">How to add a German voice →</a></span>`
    : `<span class="warn">This browser cannot read text aloud. Try Chrome, Edge or Safari.</span>`;
  box.innerHTML = `<summary>🔊 Stimme &amp; Tempo <span class="en">(voice &amp; speed)</span></summary><div class="vbody">${inner}</div>`;
  box.open = !(window.matchMedia && matchMedia("(max-width: 759px)").matches);
  h.appendChild(box);
  if (!TTS.ok) return;
  TTS.fillPicker(); TTS.report("idle");
  $("#voiceSel").onchange = e => { localStore.set("voice", e.target.value); speak("Hallo! Ich spreche Deutsch."); };
  $("#slowChk").onchange = e => localStore.set("slow", e.target.checked);
  $("#voiceTest").onclick = () => speak("Hallo! Ich heiße Anna. Ich wohne in München. Meine Nummer ist null, eins, sieben, sechs.");
}
document.addEventListener("DOMContentLoaded", () => { voicePicker(); addSpeakers(); });
