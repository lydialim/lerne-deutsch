/* Exam page extras: writing checker (Schreiben Teil 2) and speaking practice (record yourself, compare with the model).
   Nothing is uploaded: texts and recordings stay in this browser. Needs common.js (levelStore, esc, $) and speech.js (speak).
   checkWriting() is a plain top-level function, so the tests can call it without the page. */

/* ---------- Schreiben: Textprüfer ---------- */
const WRITING_TASKS = [
  { id: "w1", form: "du", title: "Einladung", en: "invitation",
    de: "Du hast am Samstag Geburtstag. Schreibe an deine Freundin Anna. Schreibe zu allen drei Punkten.",
    eng: "It is your birthday on Saturday. Write to your friend Anna. Cover all three points.",
    points: [["Wann ist die Party? (when)", /(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|morgen|heute|\d{1,2}\.\s?(\d{1,2}\.|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember))/i],
             ["Um wie viel Uhr beginnt sie? (what time)", /(\d{1,2}[:.]\d{2}|\d{1,2}\s?uhr|\buhr\b|halb\s\w+|viertel)/i],
             ["Was soll Anna mitbringen? (what to bring)", /(mitbring|bring|kuchen|getränk|musik|essen|salat|geschenk|wein|brot)/i]],
    model: "Liebe Anna,\nam Samstag habe ich Geburtstag. Die Party beginnt um 19 Uhr. Kannst du bitte Kuchen mitbringen?\nViele Grüße\nMaria" },
  { id: "w2", form: "Sie", title: "Anfrage an die Sprachschule", en: "enquiry to a language school",
    de: "Sie möchten einen Deutschkurs machen. Schreiben Sie an die Sprachschule. Schreiben Sie zu allen drei Punkten: Wer sind Sie? Welcher Kurs? Preis?",
    eng: "You want to take a German course. Write to the language school: who are you, which course, price?",
    points: [["Wer sind Sie? (your name)", /(?:[Ii]ch heiße|[Mm]ein [Nn]ame ist|[Ii]ch bin\s+[A-ZÄÖÜ])/],
             ["Welcher Kurs? (which course / when)", /(kurs|abend|vormittag|nachmittag|montag|dienstag|mittwoch|donnerstag|freitag|anfänger|a1)/i],
             ["Preis? (price)", /(preis|kost|euro|wie viel|teuer)/i]],
    model: "Sehr geehrte Damen und Herren,\nich heiße Tom Weber und möchte einen Deutschkurs am Abend machen. Ich bin Anfänger. Was kostet der Kurs?\nMit freundlichen Grüßen\nTom Weber" },
  { id: "w3", form: "du", title: "Absage", en: "cancelling a meeting",
    de: "Du kannst am Freitag nicht zum Treffen kommen. Schreibe an Tom. Schreibe zu allen drei Punkten: Warum? Wann hast du Zeit? Was möchtest du machen?",
    eng: "You cannot come to the meeting on Friday. Write to Tom: why, when are you free, what would you like to do?",
    points: [["Warum? (why)", /(krank|arbeit|keine zeit|muss|leider|termin|arzt|kind)/i],
             ["Wann hast du Zeit? (when)", /(montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag|morgen|heute|\d{1,2}\.\s?(\d{1,2}\.|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember))/i],
             ["Was möchtest du machen? (what)", /(kino|café|essen|spazier|treffen|kaffee|sport|film|besuch|trinken|gehen)/i]],
    model: "Lieber Tom,\nleider kann ich am Freitag nicht kommen, denn ich bin krank. Hast du am Montag Zeit? Wir können Kaffee trinken.\nViele Grüße\nAnna" }
];
/* Nouns that must start with a capital letter. Lowercase matches only; the adverb "morgen" is deliberately not listed. */
const WRITING_NOUNS = /(?<![A-Za-zÄÖÜäöüß])(kuchen|party|musik|geburtstag|kaffee|arbeit|zeit|kurs|preis|freund|freundin|getränke|geschenk|salat|tee|wein|brot|wasser|kino|sprachschule|anfänger|termin|arzt|tag|woche|euro|abend|wochenende|montag|dienstag|mittwoch|donnerstag|freitag|samstag|sonntag)(?![A-Za-zÄÖÜäöüß])/g;

/* Checks a letter against one task. Returns rows [status, html], status "ok", "warn" or "bad". Checks form and content, not grammar. */
function checkWriting(task, text) {
  const t = text.trim(), lines = t.split(/\n+/).map(s => s.trim()).filter(Boolean), out = [];
  const words = s => (s.trim().match(/[A-Za-zÄÖÜäöüß0-9:.,-]+/g) || []);
  const first = lines[0] || "";
  const formal = task.form === "Sie";
  const hasGreet = formal ? /^sehr geehrte/i.test(first) : /^(liebe|lieber|hallo|hi)\b/i.test(first);
  out.push([hasGreet ? "ok" : "bad", hasGreet ? "Anrede: " + esc(first.replace(/,\s*$/, "")) : formal ? "Anrede fehlt: <b>Sehr geehrte Damen und Herren,</b> <span class=\"en\">(greeting missing)</span>" : "Anrede fehlt: <b>Liebe Anna,</b> / <b>Lieber Tom,</b> <span class=\"en\">(greeting missing)</span>"]);
  const hasClose = formal ? /(mit freundlichen gr[uü]ß?en|freundliche gr[uü]ß?en)/i.test(t) : /(viele gr[uü]ß?e|liebe gr[uü]ß?e|herzliche gr[uü]ß?e|bis bald|tsch[uü]ss)/i.test(t);
  out.push([hasClose ? "ok" : "bad", hasClose ? "Gruß am Ende gefunden" : formal ? "Gruß fehlt: <b>Mit freundlichen Grüßen</b> <span class=\"en\">(closing missing)</span>" : "Gruß fehlt: <b>Viele Grüße</b> <span class=\"en\">(closing missing)</span>"]);
  task.points.forEach(([label, re], i) => { const ok = re.test(t); out.push([ok ? "ok" : "bad", `Punkt ${i + 1}: ${label} ${ok ? "" : "<b>nicht gefunden</b>"}`]); });
  const n = words(t).length;
  out.push([n >= 20 && n <= 70 ? "ok" : "warn", `Länge: <b>${n}</b> Wörter ${n < 20 ? "<span class=\"en\">(too short: aim for about 30)</span>" : n > 70 ? "<span class=\"en\">(longer than needed: about 30 is enough)</span>" : "<span class=\"en\">(good: about 30)</span>"}`]);
  const badStart = [];
  lines.forEach((l, k) => {
    if (k > 0 && /,\s*$/.test(lines[k - 1])) l = l.replace(/^[a-zäöüß]/, c => c.toUpperCase()); /* after a greeting comma a small letter is correct */
    l.split(/(?<=[.!?])\s+/).forEach(s => { if (s.split(/\s+/).length > 2 && /^[a-zäöüß]/.test(s)) badStart.push(s); });
  });
  badStart.splice(2);
  out.push([badStart.length ? "warn" : "ok", badStart.length ? `Satzanfang groß schreiben: <i>${badStart.map(esc).join(" · ")}</i> <span class="en">(start sentences with a capital)</span>` : "Satzanfänge: in Ordnung"]);
  const lower = [...new Set((t.match(WRITING_NOUNS) || []))];
  out.push([lower.length ? "warn" : "ok", lower.length ? `Nomen groß schreiben: <b>${lower.map(w => w[0].toUpperCase() + w.slice(1)).join(", ")}</b> <span class="en">(nouns have a capital letter)</span>` : "Nomen: keine kleinen Nomen gefunden"]);
  const wrongForm = formal ? /(?<![A-Za-zÄÖÜäöüß])(du|dein|deine|deinen|dir|dich)(?![A-Za-zÄÖÜäöüß])/.test(t) : /(?<![A-Za-zÄÖÜäöüß])(Ihr|Ihre|Ihnen)(?![A-Za-zÄÖÜäöüß])|Sehr geehrte/.test(t);
  out.push([wrongForm ? "bad" : "ok", wrongForm ? (formal ? "In diesem Brief: <b>Sie</b>, nicht du <span class=\"en\">(this is a formal letter: use Sie, Ihr)</span>" : "In dieser Nachricht: <b>du</b>, nicht Sie <span class=\"en\">(this is to a friend: use du, dein)</span>") : "du / Sie: passt"]);
  const capAfter = lines[1] && /^(Ich|Am|Es|Wir|Heute|Leider|Das|Der|Die|Vielen)\b/.test(lines[1]) && /,\s*$/.test(lines[0]);
  out.push([capAfter ? "warn" : "ok", capAfter ? "Nach dem Komma in der Anrede klein weiterschreiben: <i>Liebe Anna, ich …</i> <span class=\"en\">(after the greeting comma, start with a small letter)</span>" : "Nach der Anrede: in Ordnung"]);
  return out;
}

(function () {
  const root = document.getElementById("writeCheck"); if (!root) return;
  let taskIndex = 0, showModel = false, result = null;

  function renderWriting() {
    const task = WRITING_TASKS[taskIndex], saved = levelStore.get("write:" + task.id, "");
    const icon = { ok: "✅", warn: "⚠️", bad: "❌" };
    root.innerHTML = `<div class="ktabs" role="tablist">${WRITING_TASKS.map((x, i) => `<button type="button" role="tab" data-task="${i}" aria-selected="${i === taskIndex}">${x.title}<small>${x.en}</small></button>`).join("")}</div>
    <div class="rule"><b>Aufgabe</b> (${task.form === "Sie" ? "Sie" : "du"}): ${esc(task.de)}<br><span class="en">${esc(task.eng)}</span></div>
    <textarea id="wText" class="wtext" rows="9" placeholder="${task.form === "Sie" ? "Sehr geehrte Damen und Herren,\n…" : "Liebe …,\n…"}" aria-label="Your text" spellcheck="false">${esc(saved)}</textarea>
    <p class="en" id="wCount"></p>
    <div class="btns"><button type="button" class="go" data-w="check">Prüfen <span class="en">(check)</span></button><button type="button" class="go" data-w="model">${showModel ? "Beispiel verbergen" : "Beispiel zeigen"} <span class="en">(${showModel ? "hide" : "show"} model)</span></button><button type="button" class="go" data-w="clear">Löschen <span class="en">(clear)</span></button></div>
    ${showModel ? `<div class="sol" data-say="${esc(task.model.replace(/\n/g, " "))}"><b>Beispiel (model)</b><br>${esc(task.model).replace(/\n/g, "<br>")}</div>` : ""}
    ${result ? `<ul class="checklist" aria-live="polite">${result.map(([k, h]) => `<li class="${k}"><span aria-hidden="true">${icon[k]}</span><span>${h}</span></li>`).join("")}</ul><p class="en">This checks form and content points only, not your grammar. Read your text aloud once, then compare with the model.</p>` : ""}`;
    updateWordCount();
    if (typeof addSpeakers === "function") addSpeakers(root);
  }
  function updateWordCount() {
    const el = $("#wText"), c = $("#wCount");
    if (el && c) c.textContent = (el.value.trim().match(/[A-Za-zÄÖÜäöüß0-9:.,-]+/g) || []).length + " Wörter (words) · Ziel (goal): ca. 30";
  }
  root.addEventListener("input", e => {
    if (e.target.id !== "wText") return;
    levelStore.set("write:" + WRITING_TASKS[taskIndex].id, e.target.value);
    if (result) { result = null; root.querySelectorAll(".checklist, .checklist + p").forEach(n => n.remove()); } /* drop stale feedback without redrawing the textarea */
    updateWordCount();
  });
  root.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.task) { taskIndex = +b.dataset.task; result = null; showModel = false; renderWriting(); return; }
    const task = WRITING_TASKS[taskIndex];
    if (b.dataset.w === "check") { result = checkWriting(task, $("#wText").value || ""); renderWriting(); }
    else if (b.dataset.w === "model") { showModel = !showModel; renderWriting(); }
    else if (b.dataset.w === "clear") { levelStore.set("write:" + task.id, ""); result = null; renderWriting(); }
  });
  renderWriting();
})();

/* ---------- Sprechen: record yourself and compare with the model ---------- */
(function () {
  const root = document.getElementById("speakPractice"); if (!root) return;
  const PHRASES = [
    ["Teil 1 · Sich vorstellen", "Hallo, ich heiße Maria López. Ich komme aus Spanien und wohne in Berlin.", "Hi, I am Maria López. I come from Spain and live in Berlin.", ""],
    ["Teil 1 · Sich vorstellen", "Ich bin achtundzwanzig Jahre alt. Ich spreche Spanisch, Englisch und ein bisschen Deutsch.", "I am 28 years old. I speak Spanish, English and a little German.", ""],
    ["Teil 1 · Sich vorstellen", "Ich bin Lehrerin von Beruf. Mein Hobby ist Fotografieren.", "I am a teacher. My hobby is photography.", ""],
    ["Teil 1 · Sich vorstellen", "Meine Telefonnummer ist null eins sieben sechs, drei vier fünf, acht neun zwei eins.", "My phone number is 0176 345 8921.", "Say numbers digit by digit."],
    ["Teil 2 · Fragen", "Was machst du am Wochenende?", "What do you do at the weekend?", "Voice goes up at the end ↗ only for yes/no questions. W-questions go down ↘."],
    ["Teil 2 · Antworten", "Ich fahre Fahrrad und treffe Freunde.", "I ride my bike and meet friends.", ""],
    ["Teil 2 · Fragen", "Wo kaufst du ein?", "Where do you shop?", ""],
    ["Teil 2 · Fragen", "Wie viel kostet das Brot?", "How much is the bread?", ""],
    ["Teil 2 · Fragen", "Machst du gern Sport?", "Do you like doing sport?", "A yes/no question: your voice goes up ↗ at the end."],
    ["Teil 3 · Bitten", "Kannst du bitte das Fenster öffnen?", "Can you open the window, please?", "Stress: Fenster · öffnen."],
    ["Teil 3 · Bitten", "Ich möchte bitte einen Kaffee.", "I would like a coffee, please.", ""],
    ["Teil 3 · Bitten", "Darf ich dein Handy benutzen?", "May I use your phone?", ""],
    ["Hilfe in der Prüfung", "Entschuldigung, ich verstehe das nicht. Können Sie das bitte wiederholen?", "Sorry, I don't understand. Can you repeat that, please?", "Use this if you did not hear the question: it is allowed and costs no points."],
    ["Hilfe in der Prüfung", "Bitte sprechen Sie langsamer.", "Please speak more slowly.", ""]
  ];
  let phraseIndex = Math.min(levelStore.get("spkI", 0), PHRASES.length - 1);
  let recorder = null, stream = null, recordStart = 0, timer = null, starting = false;
  const clips = {};                                       /* phrase index -> object URL of the recording */
  const practised = levelStore.get("spkDone", {});
  const canRecord = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder);

  function renderSpeaking(msg) {
    const [cat, de, en, tip] = PHRASES[phraseIndex];
    root.innerHTML = `<div class="spk-top"><label for="spkSel" class="en">Satz (phrase)</label><select id="spkSel">${PHRASES.map((p, k) => `<option value="${k}"${k === phraseIndex ? " selected" : ""}>${practised[k] ? "✓ " : ""}${k + 1}. ${esc(p[1].slice(0, 42))}${p[1].length > 42 ? "…" : ""}</option>`).join("")}</select>
      <span class="en">${Object.keys(practised).length} / ${PHRASES.length} geübt (practised)</span></div>
    <div class="scard spk-card"><div class="top">${esc(cat)}</div><div class="thema">${esc(en)}</div><b style="padding:14px 12px 8px">${esc(de)}</b></div>
    ${tip ? `<p class="en" style="text-align:center">💡 ${esc(tip)}</p>` : ""}
    <ol class="steps"><li><b>Hören:</b> listen to the model (the slow button helps).</li><li><b>Sprechen:</b> record yourself saying it.</li><li><b>Vergleichen:</b> play both, one after the other. Same rhythm? Same stress?</li></ol>
    <div class="btns"><button type="button" class="go" data-s="hear">🔊 Anhören <span class="en">(listen)</span></button><button type="button" class="go" data-s="slow">🐢 Langsam <span class="en">(slow)</span></button>
      ${canRecord ? `<button type="button" class="go ${recorder ? "recording" : ""}" data-s="rec">${recorder ? "⏹ Stopp <span class=\"en\">(stop)</span>" : "🎙 Aufnehmen <span class=\"en\">(record)</span>"}</button>` : ""}</div>
    <p class="en" id="spkMsg" aria-live="polite" style="text-align:center">${msg || (canRecord ? "Press record and say the sentence. Your recording stays on this device." : "Recording is not available in this browser. Try Chrome, Edge, Firefox or Safari over https.")}</p>
    ${clips[phraseIndex] ? `<div class="spk-play"><span>Meine Aufnahme <span class="en">(my recording)</span></span><audio controls src="${clips[phraseIndex]}"></audio><div class="btns"><button type="button" class="go" data-s="cmp">Vergleichen: Modell → ich <span class="en">(compare)</span></button></div>
      <p class="en" style="margin:8px 0 4px">How did it feel?</p><div class="btns"><button type="button" class="go" data-r="1">😟 nochmal <span class="en">(again)</span></button><button type="button" class="go" data-r="2">🙂 gut <span class="en">(good)</span></button><button type="button" class="go" data-r="3">😀 super</button></div></div>` : ""}
    <div class="btns" style="margin-top:10px"><button type="button" class="go" data-s="prev">← zurück</button><button type="button" class="go" data-s="next">weiter →</button></div>`;
  }
  async function startRecording() {
    if (recorder || starting) return; /* ignore a second tap while the permission prompt is open */
    starting = true;
    const recordingFor = phraseIndex; /* onstop fires after a phrase change, so remember which phrase this recording is for */
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chunks = []; recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop()); clearInterval(timer);
        if (clips[recordingFor]) URL.revokeObjectURL(clips[recordingFor]);
        clips[recordingFor] = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || "audio/webm" })); recorder = null;
        renderSpeaking(phraseIndex === recordingFor ? "Fertig! Play your recording, then compare it with the model." : undefined);
      };
      recorder.start(); recordStart = Date.now(); renderSpeaking("🔴 Recording … 0 s");
      timer = setInterval(() => {
        const secs = Math.round((Date.now() - recordStart) / 1000), msg = $("#spkMsg");
        if (msg && phraseIndex === recordingFor) msg.textContent = "🔴 Recording … " + secs + " s";
        if (secs >= 25) stopRecording();
      }, 500);
    } catch (e) {
      if (stream) stream.getTracks().forEach(t => t.stop()); /* release the microphone if the recorder could not start */
      stream = null; recorder = null; renderSpeaking("No microphone access. Allow the microphone in your browser, or use a device with a microphone.");
    } finally { starting = false; }
  }
  function stopRecording() { if (recorder && recorder.state !== "inactive") recorder.stop(); }
  root.addEventListener("change", e => {
    if (e.target.id !== "spkSel") return;
    if (recorder) stopRecording();
    phraseIndex = +e.target.value; levelStore.set("spkI", phraseIndex); renderSpeaking();
  });
  root.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    const action = b.dataset.s;
    if (b.dataset.r) {
      if (+b.dataset.r >= 2) { practised[phraseIndex] = 1; levelStore.set("spkDone", practised); }
      renderSpeaking(+b.dataset.r >= 2 ? "Gespeichert ✓ (saved as practised)." : "Try once more: listen, then record again.");
      return;
    }
    if (action === "hear") speak(PHRASES[phraseIndex][1]);
    else if (action === "slow") speak(PHRASES[phraseIndex][1], { rate: 0.6 });
    else if (action === "rec") { recorder ? stopRecording() : startRecording(); }
    else if (action === "cmp") {
      /* model first, then my recording as soon as the model has finished. The timer is only a fallback for browsers that never report the end. */
      const audio = root.querySelector("audio"); if (!audio) return;
      let played = false; const play = () => { if (played) return; played = true; audio.currentTime = 0; audio.play(); };
      const modelText = PHRASES[phraseIndex][1];
      if (!speak(modelText, { done: () => setTimeout(play, 250) })) play(); else setTimeout(play, 2500 + modelText.length * 110);
    }
    else if (action === "next" || action === "prev") {
      if (recorder) stopRecording();
      phraseIndex = (phraseIndex + (action === "next" ? 1 : PHRASES.length - 1)) % PHRASES.length;
      levelStore.set("spkI", phraseIndex); renderSpeaking();
    }
  });
  renderSpeaking();
})();
