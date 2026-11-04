/* Setup page: detect the device, show only its steps, and test the German voice and the microphone. */
(function () {
  const bar = document.getElementById("devbar"); if (!bar) return;
  const ua = navigator.userAgent || "", plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  const touchMac = /Mac/i.test(plat) && navigator.maxTouchPoints > 1; /* iPadOS pretends to be a Mac */
  const DEV = [
    ["android", "📱 Android"], ["ios", "📱 iPhone / iPad"], ["windows", "💻 Windows"], ["mac", "💻 Mac"], ["other", "🖥 Linux / other"]
  ];
  const detect = () => /Android/i.test(ua) ? "android" : (/iPhone|iPad|iPod/i.test(ua) || touchMac) ? "ios" : /Win/i.test(plat + ua) ? "windows" : /Mac/i.test(plat + ua) ? "mac" : "other";
  const browser = () => /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Firefox|FxiOS/.test(ua) ? "Firefox" : /Chrome|CriOS/.test(ua) ? "Chrome" : /Safari/.test(ua) ? "Safari" : "browser";
  const found = detect();
  let dev = lstore.get("dev", "") === "" ? found : lstore.get("dev", found);
  if (!DEV.some(d => d[0] === dev)) dev = found;

  function show() {
    document.querySelectorAll(".dev").forEach(s => s.hidden = s.dataset.dev !== dev);
    const name = DEV.find(d => d[0] === found)[1];
    bar.innerHTML = `Erkannt <span class="en">(detected)</span>: <b>${name}</b> · ${browser()}${dev !== found ? ` · <span class="en">showing steps for another device</span>` : ""}`;
    document.getElementById("devtabs").innerHTML = DEV.map(d => `<button type="button" role="tab" data-dev="${d[0]}" aria-selected="${d[0] === dev}">${d[1]}</button>`).join("");
  }
  document.getElementById("devtabs").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    dev = b.dataset.dev; lstore.set("dev", dev === found ? "" : dev); show();
  });
  show();

  /* voice test */
  const vs = document.getElementById("voiceStatus"), vl = document.getElementById("voiceList"), vt = document.getElementById("voiceTest");
  function voiceInfo() {
    if (!TTS.ok) { vs.innerHTML = `❌ This browser can't speak. Try <b>Chrome</b>, <b>Edge</b> or <b>Safari</b>.`; vt.disabled = true; return; }
    const v = speechSynthesis.getVoices().filter(x => /^de(-|_|$)/i.test(x.lang));
    if (v.length) { vs.innerHTML = `✅ ${v.length} German voice${v.length > 1 ? "s" : ""} found. Press play and listen.`; vl.textContent = v.slice(0, 6).map(x => x.name).join(" · "); }
    else { vs.innerHTML = `⚠️ No German voice found yet. Follow the steps below, or press play anyway (some devices load voices only when they speak).`; vl.textContent = ""; }
  }
  voiceInfo();
  if (TTS.ok) { speechSynthesis.addEventListener("voiceschanged", voiceInfo); setTimeout(voiceInfo, 800); }
  vt.addEventListener("click", () => { speak("Hallo! Ich heiße Anna. Ich komme aus Berlin."); setTimeout(voiceInfo, 600); });

  /* microphone test: ask for permission, show a level bar for 6 seconds */
  const ms = document.getElementById("micStatus"), mb = document.getElementById("micBar"), mt = document.getElementById("micTest");
  let busy = false;
  mt.addEventListener("click", async () => {
    if (busy) return;
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { ms.innerHTML = `❌ No microphone access in this browser. Use <b>https</b> and a current Chrome, Edge, Firefox or Safari.`; return; }
    busy = true; ms.textContent = "Allow the microphone when your browser asks …";
    let stream, ctx, raf, peak = 0;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream), an = ctx.createAnalyser(); an.fftSize = 512; src.connect(an);
      const buf = new Uint8Array(an.fftSize), t0 = Date.now();
      ms.textContent = "🔴 Say: „Guten Tag!“ …";
      await new Promise(done => {
        (function tick() {
          an.getByteTimeDomainData(buf);
          let m = 0; for (const x of buf) m = Math.max(m, Math.abs(x - 128)); const lvl = Math.min(1, m / 60); peak = Math.max(peak, lvl);
          mb.style.width = Math.round(lvl * 100) + "%";
          if (Date.now() - t0 < 6000) raf = requestAnimationFrame(tick); else done();
        })();
      });
      ms.innerHTML = peak > 0.12 ? `✅ Your microphone works. <span class="en">(Sehr gut!)</span>` : `⚠️ Allowed, but I heard almost nothing. Check that the right microphone is selected and not muted.`;
    } catch (e) {
      ms.innerHTML = e && e.name === "NotAllowedError" ? `❌ Microphone blocked. Follow the steps below to allow it, then reload the page.`
        : e && e.name === "NotFoundError" ? `❌ No microphone found on this device.` : `❌ Could not start the microphone (${e && e.name ? e.name : "error"}).`;
    } finally {
      cancelAnimationFrame(raf); mb.style.width = "0"; if (stream) stream.getTracks().forEach(t => t.stop()); if (ctx) ctx.close(); busy = false;
    }
  });
})();
