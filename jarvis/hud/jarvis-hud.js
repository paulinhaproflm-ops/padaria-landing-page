/*!
 * J.A.R.V.I.S. HUD — widget autônomo, sem dependências.
 * Uso:
 *   <script src="jarvis-hud.js"></script>
 *   <script>
 *     const j = JarvisHUD.mount();          // cria a telinha no canto da página
 *     j.think("Analisando...");             // estado "pensando"
 *     j.say("Pronto, senhor.");             // estado "falando" (voz + legenda)
 *     j.idle();                             // volta ao repouso
 *   </script>
 * Opções: JarvisHUD.mount({ position:'bottom-right', size:220, voice:true, color:'#4fd8ff', name:'J.A.R.V.I.S.' })
 */
(function (global) {
  'use strict';

  function mount(opts) {
    opts = Object.assign({
      position: 'bottom-right', size: 220, voice: true,
      color: '#4fd8ff', name: 'J.A.R.V.I.S.', lang: 'pt-BR', parent: document.body
    }, opts || {});

    var root = document.createElement('div');
    root.setAttribute('data-jarvis-hud', '');
    var pos = {
      'bottom-right': 'bottom:16px;right:16px;', 'bottom-left': 'bottom:16px;left:16px;',
      'top-right': 'top:16px;right:16px;', 'top-left': 'top:16px;left:16px;'
    }[opts.position] || 'bottom:16px;right:16px;';
    root.style.cssText = 'position:fixed;z-index:2147483000;' + pos +
      'width:' + opts.size + 'px;font-family:ui-monospace,Menlo,Consolas,monospace;' +
      'color:' + opts.color + ';background:radial-gradient(circle at 50% 40%,rgba(8,30,45,.92),rgba(2,8,14,.95));' +
      'border:1px solid ' + opts.color + '55;border-radius:14px;box-shadow:0 0 24px ' + opts.color + '33;' +
      'padding:10px;user-select:none;';

    var head = document.createElement('div');
    head.style.cssText = 'display:flex;justify-content:space-between;align-items:center;font-size:10px;letter-spacing:.2em;opacity:.85;margin-bottom:4px;';
    var title = document.createElement('span'); title.textContent = opts.name;
    var status = document.createElement('span'); status.textContent = 'EM ESPERA';
    head.appendChild(title); head.appendChild(status);

    var cv = document.createElement('canvas');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var S = opts.size - 22;
    cv.width = S * dpr; cv.height = S * dpr;
    cv.style.cssText = 'width:' + S + 'px;height:' + S + 'px;display:block;';
    var ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);

    var cap = document.createElement('div');
    cap.style.cssText = 'min-height:2.6em;font-size:11px;line-height:1.3;text-align:center;opacity:.9;padding-top:4px;';

    root.appendChild(head); root.appendChild(cv); root.appendChild(cap);
    opts.parent.appendChild(root);

    var state = 'idle', level = 0, target = 0, t0 = performance.now(), raf;
    var C = S / 2;

    function rgba(a) {
      var h = opts.color.replace('#', '');
      var n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16);
      return 'rgba(' + (n >> 16) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
    }
    function arc(r, start, len, w, a) {
      ctx.beginPath(); ctx.arc(C, C, r, start, start + len);
      ctx.lineWidth = w; ctx.strokeStyle = rgba(a); ctx.stroke();
    }

    function frame(now) {
      var t = (now - t0) / 1000;
      var speed = state === 'thinking' ? 3 : state === 'speaking' ? 1.4 : 0.5;
      // nível de "voz" simulado enquanto fala
      target = state === 'speaking' ? 0.35 + 0.65 * Math.abs(Math.sin(t * 9) * Math.sin(t * 3.7 + 1)) : 0;
      level += (target - level) * 0.2;

      ctx.clearRect(0, 0, S, S);
      ctx.lineCap = 'round';

      // anéis externos
      arc(C * 0.95, t * speed, Math.PI * 1.2, 2, 0.9);
      arc(C * 0.95, t * speed + Math.PI * 1.4, Math.PI * 0.4, 2, 0.5);
      arc(C * 0.82, -t * speed * 1.3, Math.PI * 0.8, 3, 0.8);
      arc(C * 0.82, -t * speed * 1.3 + Math.PI, Math.PI * 0.6, 3, 0.4);

      // marcações
      for (var i = 0; i < 60; i++) {
        var a = i / 60 * Math.PI * 2 + t * speed * 0.2;
        var r1 = C * 0.70, r2 = C * (i % 5 === 0 ? 0.63 : 0.66);
        ctx.beginPath();
        ctx.moveTo(C + Math.cos(a) * r1, C + Math.sin(a) * r1);
        ctx.lineTo(C + Math.cos(a) * r2, C + Math.sin(a) * r2);
        ctx.lineWidth = 1; ctx.strokeStyle = rgba(0.35); ctx.stroke();
      }

      // barras radiais de áudio (falando) / pontos orbitando (pensando)
      var bars = 48;
      for (var k = 0; k < bars; k++) {
        var ang = k / bars * Math.PI * 2;
        var wave = Math.abs(Math.sin(k * 0.7 + t * 8) * Math.sin(k * 0.23 - t * 3));
        var len = 3 + (state === 'speaking' ? level * wave * C * 0.28 : state === 'thinking' ? 2 + 3 * Math.abs(Math.sin(k + t * 6)) : 1.5);
        var rb = C * 0.5;
        ctx.beginPath();
        ctx.moveTo(C + Math.cos(ang) * rb, C + Math.sin(ang) * rb);
        ctx.lineTo(C + Math.cos(ang) * (rb + len), C + Math.sin(ang) * (rb + len));
        ctx.lineWidth = 2; ctx.strokeStyle = rgba(state === 'idle' ? 0.35 : 0.9); ctx.stroke();
      }
      if (state === 'thinking') {
        for (var d = 0; d < 3; d++) {
          var da = t * 4 + d * 2.094;
          ctx.beginPath(); ctx.arc(C + Math.cos(da) * C * 0.3, C + Math.sin(da) * C * 0.3, 3, 0, 7);
          ctx.fillStyle = rgba(0.95); ctx.fill();
        }
      }

      // núcleo
      var pulse = state === 'idle' ? 0.5 + 0.5 * Math.sin(t * 1.5) : state === 'thinking' ? 0.6 + 0.4 * Math.sin(t * 8) : 0.5 + level * 0.5;
      var g = ctx.createRadialGradient(C, C, 0, C, C, C * 0.32);
      g.addColorStop(0, rgba(0.35 + 0.5 * pulse)); g.addColorStop(1, rgba(0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(C, C, C * 0.32, 0, 7); ctx.fill();
      arc(C * 0.18 + level * 6, 0, Math.PI * 2, 2, 0.9);

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    var labels = { idle: 'EM ESPERA', thinking: 'PENSANDO', speaking: 'FALANDO' };
    function set(s, text) {
      state = s; status.textContent = labels[s];
      if (text !== undefined) cap.textContent = text;
    }

    var api = {
      el: root,
      idle: function (text) { if (global.speechSynthesis) speechSynthesis.cancel(); set('idle', text || ''); },
      think: function (text) { set('thinking', text || 'Processando...'); },
      say: function (text, onend) {
        set('speaking', text);
        var done = function () { set('idle'); if (onend) onend(); };
        if (opts.voice && global.speechSynthesis && global.SpeechSynthesisUtterance) {
          speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance(text);
          u.lang = opts.lang; u.onend = done; u.onerror = done;
          speechSynthesis.speak(u);
        } else {
          setTimeout(done, Math.max(1500, text.length * 55));
        }
      },
      destroy: function () { cancelAnimationFrame(raf); root.remove(); }
    };
    return api;
  }

  global.JarvisHUD = { mount: mount };
})(window);
