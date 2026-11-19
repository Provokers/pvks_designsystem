/* Provokers Output Library · núcleo compartilhado
   Gate de senha, topbar, tooltip, formatação, gráficos SVG (barras, linhas, heatmap,
   empilhado, quadrante, flow bands, waffle, sparkline), exportação e animações. */
(function () {
  'use strict';
  const PV = (window.PV = {});
  const script = document.currentScript;
  PV.base = script ? script.src.replace(/pvks\.js.*$/, '') : 'assets/';
  const HASH = '87296c64db548ebb1265eddb049532c7f81ae66103a108e9fe89eabf45b054a1';
  const KEY = 'pvks-access', TTL = 12 * 3600 * 1000;
  const RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- utilidades ---------- */
  PV.css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  PV.col = (c) => (c && c.slice(0, 2) === '--' ? PV.css(c) : c);
  PV.fmt = (v, d = 0) => (v == null || !isFinite(v) ? 'n/d' : Number(v).toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d }));
  PV.pct = (v, d = 0) => PV.fmt(v, d) + '%';
  PV.pp = (v, d = 0) => { const f = Math.pow(10, d), r = Math.round(v * f) / f; return (r > 0 ? '+' : r < 0 ? '−' : '±') + PV.fmt(Math.abs(r), d) + '\u00A0p.p.'; };
  PV.esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  PV.clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, k) => a + (b - a) * k;
  PV.lerp = lerp;
  PV.ease = (t) => 1 - Math.pow(1 - t, 3);
  PV.animate = function (dur, fn) {
    if (RM) { fn(1); return; }
    const t0 = performance.now();
    const step = (t) => { const k = PV.clamp((t - t0) / dur, 0, 1); fn(PV.ease(k)); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const store = {
    get(k) { try { return localStorage.getItem(k) || sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { try { sessionStorage.setItem(k, v); } catch (e2) {} } },
  };
  PV.toast = function (msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2200);
  };
  PV.copy = function (text) {
    const done = () => PV.toast('Link copiado');
    const fallback = () => { const a = document.createElement('textarea'); a.value = text; a.setAttribute('readonly', ''); a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (e) {} a.remove(); ok ? done() : PV.toast(text); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  };

  /* ---------- ícones (traço 1.7, 24px) ---------- */
  const I = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  PV.icon = {
    dl: I('<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>'),
    link: I('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
    arrow: I('<path d="M5 12h14m-5-6 6 6-6 6"/>'),
    back: I('<path d="M19 12H5m5-6-6 6 6 6"/>'),
    grid: I('<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>'),
    full: I('<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'),
    sliders: I('<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
    pulse: I('<path d="M3 12h4l2-6 4 12 2-6h6"/>'),
    book: I('<path d="M5 4h13v16H6.5A1.5 1.5 0 0 1 5 18.5z"/><path d="M5 18.5A1.5 1.5 0 0 1 6.5 17H18"/><path d="M9 8h6"/>'),
    story: I('<path d="M4 5h9M4 9h16M4 13h16M4 17h10"/><circle cx="18" cy="5" r="2"/>'),
    present: I('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/>'),
    users: I('<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2A4.5 4.5 0 0 1 21 18.5"/>'),
    cart: I('<path d="M3 4h2l2.2 11h10.6L20 8H6.4"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>'),
    eye: I('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>'),
    heart: I('<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>'),
    star: I('<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>'),
    target: I('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>'),
    clock: I('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    map: I('<path d="M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6z"/><path d="M9 4v14M15 6v14"/>'),
    drop: I('<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/>'),
    snow: I('<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="m9.5 4.5 2.5 2 2.5-2M9.5 19.5l2.5-2 2.5 2"/>'),
    tag: I('<path d="M3.5 12.5V4.5h8l9 9-8 8z"/><circle cx="8" cy="9" r="1.4"/>'),
    spark: I('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
    shield: I('<path d="M12 3.5 19 6v6c0 4.4-3 7.3-7 8.5-4-1.2-7-4.1-7-8.5V6z"/><path d="m9 12 2 2 4-4"/>'),
    leaf: I('<path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14z"/><path d="M5 19 13 11"/>'),
    box: I('<path d="M3.5 7.5 12 3.5l8.5 4v9L12 20.5l-8.5-4z"/><path d="M3.5 7.5 12 11.5l8.5-4M12 11.5v9"/>'),
    bolt: I('<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>'),
    home: I('<path d="M4 11 12 4.5l8 6.5"/><path d="M6 9.5V20h12V9.5"/>'),
    sun: I('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>'),
    chat: I('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>'),
    search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    check: I('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    print: I('<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="8" rx="2"/><path d="M7 14h10v6H7z"/>'),
    swap: I('<path d="M4 8h14l-3-3M20 16H6l3 3"/>'),
    coin: I('<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v5c0 1.7 3.1 3 7 3s7-1.3 7-3V7M5 12v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5"/>'),
    trend: I('<path d="M3 17 9 11l4 4 8-8"/><path d="M15 7h6v6"/>'),
    layers: I('<path d="m12 4 8.5 4.5L12 13 3.5 8.5z"/><path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5"/>'),
    filter: I('<path d="M4 5h16l-6 7.5V19l-4 1.5v-8z"/>'),
  };

  /* ---------- gate de senha ---------- */
  async function sha(s) {
    if (window.crypto && crypto.subtle && window.TextEncoder) {
      try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, '0')).join(''); } catch (e) {}
    }
    return null;
  }
  PV.gate = function () {
    const raw = store.get(KEY);
    if (raw) { try { const o = JSON.parse(raw); if (o.h === HASH && Date.now() - o.t < TTL) { unlock(); return; } } catch (e) {} }
    const g = document.createElement('div');
    g.className = 'gate';
    g.innerHTML = `<form novalidate><img src="${PV.base}img/logo-color.png" alt="Provokers"><div><h1>${PV.gateTitle || "Output Library"}</h1><p style="margin-top:6px">Samples navegáveis com dados fictícios. Acesso restrito.</p></div><div><label for="pv-pass">Senha</label><input id="pv-pass" type="password" autocomplete="current-password" style="margin-top:8px"></div><div class="err" aria-live="polite"></div><button type="submit">Entrar</button></form>`;
    document.body.appendChild(g);
    const f = g.querySelector('form'), inp = g.querySelector('input'), err = g.querySelector('.err'), bt = g.querySelector('button');
    setTimeout(() => inp.focus(), 60);
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const v = inp.value;
      if (!v) { err.textContent = 'Digite a senha.'; return; }
      bt.disabled = true;
      const h = await sha(v);
      const ok = h ? h === HASH : v === atob('QWJhY2F0ZTIwMjYh');
      bt.disabled = false;
      if (ok) { store.set(KEY, JSON.stringify({ h: HASH, t: Date.now() })); g.remove(); unlock(); }
      else { err.textContent = 'Senha incorreta.'; inp.select(); }
    });
  };
  PV.unlocked = () => !document.documentElement.classList.contains('locked');
  function unlock() { document.documentElement.classList.remove('locked'); document.dispatchEvent(new Event('pv:unlock')); }
  PV.whenOpen = (fn) => { if (PV.unlocked()) fn(); else document.addEventListener('pv:unlock', fn, { once: true }); };

  /* ---------- topbar e rodapé ---------- */
  PV.mount = function (o) {
    const hub = o.hub || '../';
    const top = document.createElement('header');
    top.className = 'topbar no-print';
    top.innerHTML = `<div class="wrap"><a href="${hub}" aria-label="Ir para o hub"><img class="logo" src="${PV.base}img/logo-color.png" alt="Provokers"></a><div class="crumb">${PV.siteName || "Output Library"} · <b>${PV.esc(o.title)}</b></div><div class="sp"></div>${o.hubLink === false ? '' : `<a class="btn sm" href="${hub}">${PV.icon.grid}<span>Todos os outputs</span></a>`}</div>`;
    document.body.prepend(top);
    if (o.foot !== false) {
      const f = document.createElement('footer');
      f.className = 'foot';
      f.innerHTML = `<div class="wrap"><img src="${PV.base}img/logo-gray.png" alt="Provokers"><span class="note">${PV.footNote || "Dados fictícios para demonstração · Provokers Output Library"}</span><div class="sp"></div><button type="button" class="btn sm no-print" data-copy-page>${PV.icon.link}Copiar link desta página</button></div>`;
      document.body.appendChild(f);
      f.querySelector('[data-copy-page]').addEventListener('click', () => PV.copy(location.href.split('#')[0]));
    }
  };

  /* ---------- tooltip ---------- */
  PV.tip = {
    el: null,
    show(html, e) {
      if (!html) { this.hide(); return; }
      if (!this.el) { this.el = document.createElement('div'); this.el.className = 'tip'; this.el.setAttribute('role', 'tooltip'); document.body.appendChild(this.el); }
      if (this.el._html !== html) { this.el.innerHTML = html; this.el._html = html; }
      this.el.classList.add('on');
      const r = this.el.getBoundingClientRect(), pad = 14, W = document.documentElement.clientWidth, H = window.innerHeight;
      let x = e.clientX + pad, y = e.clientY + pad;
      if (x + r.width > W - 8) x = e.clientX - r.width - pad;
      if (y + r.height > H - 8) y = e.clientY - r.height - pad;
      this.el.style.left = PV.clamp(x, 8, Math.max(8, W - r.width - 8)) + 'px';
      this.el.style.top = PV.clamp(y, 8, Math.max(8, H - r.height - 8)) + 'px';
    },
    hide() { if (this.el) this.el.classList.remove('on'); },
  };
  PV.tipHTML = (o) => `${o.t1 ? `<div class="t1">${o.t1}</div>` : ''}${o.t2 ? `<div class="t2">${o.t2}</div>` : ''}${o.t3 ? `<div class="t3">${o.t3}</div>` : ''}${o.t4 ? `<div class="t4">${o.t4}</div>` : ''}${o.t5 ? `<div class="t5">${o.t5}</div>` : ''}`;
  PV.deltaHTML = (d, sig, ref) => { const cls = !sig ? '' : d > 0 ? 'pos' : 'neg'; const ar = !sig ? '' : d > 0 ? '▲ ' : '▼ '; return `<span class="${cls}">${ar}${PV.pp(d)}</span> vs. ${ref}${sig ? '' : ' · sem diferença significativa'}`; };
  document.addEventListener('pointerdown', (e) => { if (!e.target.closest || !e.target.closest('[data-i],[data-xi]')) PV.tip.hide(); });
  window.addEventListener('scroll', () => PV.tip.hide(), { passive: true });

  /* ---------- motor de gráficos ---------- */
  const charts = new Set();
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { const c = en.target._pv; io.unobserve(en.target); if (c) c.intro(); } }), { threshold: 0.2 }) : null;
  PV.redrawAll = () => charts.forEach((c) => c.draw(c.k == null ? 1 : c.k));
  const FONT = '"Schibsted Grotesk", Aptos, "Segoe UI", Arial, sans-serif';
  const svgOpen = (w, h, aria) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family='${FONT}' role="img" aria-label="${PV.esc(aria || 'Gráfico')}">`;
  PV.svgOpen = svgOpen;

  function makeChart(el, drawFn, bind) {
    const c = { el, k: 0, prev: null, ready: false, seen: false };
    c.width = () => { let w = el.clientWidth; if (!w) { const p = el.closest('.card') || el.parentElement; w = p ? p.clientWidth - 48 : 600; } return Math.max(260, w || 600); };
    c.draw = (k) => { c.k = k; drawFn(c.width(), k, c); };
    c.intro = () => { c.seen = true; c.ready = false; PV.animate(750, (k) => { c.draw(k); if (k === 1) c.ready = true; }); };
    c.update = (apply) => { c.prev = c.snapshot ? c.snapshot() : null; apply(); if (!c.seen) { c.draw(0); return; } c.ready = false; PV.animate(600, (k) => { c.draw(k); if (k === 1) { c.ready = true; c.prev = null; } }); };
    el._pv = c; charts.add(c);
    let lw = 0;
    if ('ResizeObserver' in window) new ResizeObserver(() => { const w = el.clientWidth; if (w && Math.abs(w - lw) > 4) { lw = w; c.draw(c.k); } }).observe(el);
    if (bind) bind(c);
    el.addEventListener('pointerleave', () => PV.tip.hide());
    c.draw(0);
    PV.whenOpen(() => { if (io) io.observe(el); else { c.seen = true; c.draw(1); c.ready = true; } });
    return c;
  }
  function hover(el, c, getHTML, attr) {
    attr = attr || 'i';
    const fn = (e) => { const g = e.target.closest && e.target.closest(`[data-${attr}]`); if (g && el.contains(g) && (c.ready || e.type === 'pointerdown')) PV.tip.show(getHTML(g.dataset[attr]), e); else PV.tip.hide(); };
    el.addEventListener('pointermove', fn); el.addEventListener('pointerdown', fn);
  }
  PV.textW = (s, size) => String(s).length * size * 0.56;
  function trunc(s, size, max) { s = String(s); if (PV.textW(s, size) <= max) return s; let n = Math.max(3, Math.floor(max / (size * 0.56)) - 1); return s.slice(0, n) + '…'; }

  /* barras horizontais: { items:[{label,value,base?,color?,icon?}], fmt, max, labelW, rowH, fs, delta(item)->{txt,color}, tip(i,item) } */
  PV.barsH = function (el, opt) {
    const st = { opt };
    const c = makeChart(el, (w, k, c) => {
      const o = st.opt, items = o.items || [], fmt = o.fmt || PV.pct, fs = o.fs || 1;
      const stacked = !o.noStack && w < 520 && fs === 1;
      const rowH = stacked ? 50 : (o.rowH || 36) * fs, barH = stacked ? 18 : Math.round(rowH * 0.58);
      const lw = stacked ? 0 : Math.min((o.labelW || 170) * fs, w * 0.42);
      const dw = o.delta ? 82 * fs : 0;
      const bw = Math.max(40, w - lw - 52 * fs - dw);
      const max = o.max || Math.max(1, ...items.map((d) => Math.max(d.value, d.base || 0))) * 1.04;
      const ink5 = PV.css('--ink-500'), ink9 = PV.css('--ink-900'), muted = PV.css('--muted');
      const h = Math.max(rowH, items.length * rowH);
      let s = svgOpen(w, h, o.aria);
      items.forEach((d, i) => {
        const from = c.prev && c.prev[d.label] != null ? c.prev[d.label] : 0;
        const v = lerp(from, d.value, k), y = i * rowH, by = stacked ? y + 24 : y + (rowH - barH) / 2, cy = stacked ? by + barH / 2 : y + rowH / 2;
        const bwid = Math.max(0, (v / max) * bw);
        s += `<g data-i="${i}" style="cursor:default"><rect x="0" y="${y}" width="${w}" height="${rowH}" fill="#000" fill-opacity="0"/>`;
        s += stacked ? `<text x="0" y="${y + 12}" dominant-baseline="central" font-size="12.5" font-weight="600" fill="${PV.css('--ink-700')}">${PV.esc(trunc(d.label, 12.5, w - 4))}</text>` : `<text x="${lw - 12}" y="${y + rowH / 2}" text-anchor="end" dominant-baseline="central" font-size="${13 * fs}" fill="${ink5}">${PV.esc(trunc(d.label, 13 * fs, lw - 14))}</text>`;
        if (d.base != null) s += `<rect x="${lw}" y="${by}" width="${Math.max(0, (d.base / max) * bw)}" height="${barH}" rx="3" fill="none" stroke="${PV.css('--ink-300')}" stroke-dasharray="3 3"/>`;
        s += `<rect x="${lw}" y="${by}" width="${bwid}" height="${barH}" rx="3" fill="${PV.col(d.color) || muted}"/>`;
        const lx = lw + Math.max(bwid, d.base != null ? (d.base / max) * bw : 0) + 8;
        s += `<text x="${lx}" y="${cy}" dominant-baseline="central" font-size="${13 * fs}" font-weight="700" fill="${ink9}">${fmt(v)}</text>`;
        if (o.delta && k === 1) { const dd = o.delta(d); if (dd && dd.txt) s += `<text x="${w - 2}" y="${cy}" text-anchor="end" dominant-baseline="central" font-size="${12 * fs}" font-weight="600" fill="${PV.col(dd.color) || ink5}">${dd.txt}</text>`; }
        s += `</g>`;
      });
      el.innerHTML = s + '</svg>';
    }, (c) => { c.snapshot = () => Object.fromEntries((st.opt.items || []).map((d) => [d.label, d.value])); hover(el, c, (i) => st.opt.tip && st.opt.tip(+i, st.opt.items[+i])); });
    c.set = (o) => c.update(() => { st.opt = Object.assign({}, st.opt, o); });
    return c;
  };

  /* linhas: { x:[], series:[{name,values,color,focus,hidden}], min,max, fmt, height, fs, tip(xi) } */
  PV.line = function (el, opt) {
    const st = { opt };
    const c = makeChart(el, (w, k, c) => {
      const o = st.opt, fmt = o.fmt || PV.pct, fs = o.fs || 1, H = o.height || 320;
      const L = 12, R = Math.min(120 * fs, w * 0.3), T = 26 * fs, B = 30 * fs;
      const iw = Math.max(40, w - L - R), ih = H - T - B, n = o.x.length;
      const min = o.min != null ? o.min : 0, max = o.max != null ? o.max : 100;
      const X = (i) => L + (n === 1 ? iw / 2 : (i / (n - 1)) * iw), Y = (v) => T + ih - ((v - min) / (max - min)) * ih;
      const ink5 = PV.css('--ink-500'), line = PV.css('--line');
      let s = svgOpen(w, H, o.aria);
      for (let g = 0; g <= 4; g++) { const v = min + ((max - min) * g) / 4; s += `<line x1="${L}" x2="${L + iw}" y1="${Y(v)}" y2="${Y(v)}" stroke="${line}"/><text x="${L + iw + 4}" y="${Y(v)}" dominant-baseline="central" font-size="${10 * fs}" fill="${PV.css('--ink-300')}" opacity="${g === 0 || g === 4 ? 1 : 0}">${fmt(v)}</text>`; }
      const step = Math.max(1, Math.ceil(PV.textW(o.x[0] || '', 12 * fs) * 1.3 / (iw / Math.max(1, n - 1))));
      o.x.forEach((lab, i) => { if (i !== n - 1 && (i % step || n - 1 - i < step)) return; s += `<text x="${X(i)}" y="${H - 8}" text-anchor="${i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'}" font-size="${12 * fs}" fill="${ink5}">${PV.esc(lab)}</text>`; });
      s += `<line class="guide" x1="0" x2="0" y1="${T - 8}" y2="${T + ih}" stroke="${PV.css('--ink-300')}" stroke-dasharray="3 3" opacity="0"/>`;
      const anyFocus = o.series.some((d) => d.focus && !d.hidden);
      const ord = o.series.filter((d) => !d.hidden).sort((a, b) => (a.focus ? 1 : 0) - (b.focus ? 1 : 0));
      const ends = [];
      ord.forEach((d) => {
        const pv = c.prev && c.prev[d.name];
        const vals = d.values.map((v, i) => { if (v == null) return null; const st0 = pv ? (pv[i] != null ? pv[i] : d.values[i - 1] != null ? d.values[i - 1] : v) : min; return lerp(st0, v, k); });
        const dim = anyFocus && !d.focus, col = PV.col(d.color), sw = d.focus ? 3 : 2, op = dim ? 0.5 : 1;
        let p = ''; vals.forEach((v, i) => { if (v == null) return; p += (p ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1); });
        if (d.focus && o.area) { const f = vals.map((v, i) => [i, v]).filter((a) => a[1] != null); if (f.length > 1) s += `<path d="${p} L${X(f[f.length - 1][0])} ${T + ih} L${X(f[0][0])} ${T + ih}Z" fill="${col}" opacity=".08"/>`; }
        s += `<path d="${p}" fill="none" stroke="${col}" stroke-width="${sw * fs}" stroke-linejoin="round" stroke-linecap="round" opacity="${op}"/>`;
        vals.forEach((v, i) => { if (v == null) return; s += `<circle cx="${X(i)}" cy="${Y(v)}" r="${(d.focus ? 4.5 : 3) * fs}" fill="#fff" stroke="${col}" stroke-width="${2 * fs}" opacity="${op}"/>`; if (d.focus && i < vals.length - 1 && vals[i + 1] != null && k === 1) s += `<text x="${X(i)}" y="${Y(v) - 12 * fs}" text-anchor="middle" font-size="${12 * fs}" font-weight="700" fill="${col}">${fmt(v)}</text>`; });
        let li = -1; vals.forEach((v, i) => { if (v != null) li = i; });
        if (li >= 0) ends.push({ y: Y(vals[li]), x: X(li), txt: `${fmt(vals[li])} ${d.name}`, col, focus: d.focus, op });
      });
      ends.sort((a, b) => a.y - b.y);
      for (let i = 1; i < ends.length; i++) if (ends[i].y - ends[i - 1].y < 16 * fs) ends[i].y = ends[i - 1].y + 16 * fs;
      ends.forEach((e) => { s += `<text x="${e.x + 10}" y="${e.y}" dominant-baseline="central" font-size="${12 * fs}" font-weight="${e.focus ? 700 : 500}" fill="${e.col}" opacity="${e.op}">${PV.esc(trunc(e.txt, 12 * fs, R - 14))}</text>`; });
      for (let i = 0; i < n; i++) { const x0 = i === 0 ? 0 : (X(i - 1) + X(i)) / 2, x1 = i === n - 1 ? L + iw : (X(i) + X(i + 1)) / 2; s += `<rect data-xi="${i}" x="${x0}" y="${T - 8}" width="${Math.max(1, x1 - x0)}" height="${ih + 8}" fill="#000" fill-opacity="0"/>`; }
      el.innerHTML = s + '</svg>';
      c._X = X;
    }, (c) => {
      c.snapshot = () => Object.fromEntries(st.opt.series.map((d) => [d.name, d.values.slice()]));
      const move = (e) => { const r = e.target.closest && e.target.closest('[data-xi]'); const g = el.querySelector('.guide'); if (!r || !(c.ready || e.type === 'pointerdown')) { PV.tip.hide(); if (g) g.setAttribute('opacity', 0); return; } const i = +r.dataset.xi; if (g) { g.setAttribute('x1', c._X(i)); g.setAttribute('x2', c._X(i)); g.setAttribute('opacity', 1); } if (st.opt.tip) PV.tip.show(st.opt.tip(i), e); };
      el.addEventListener('pointermove', move); el.addEventListener('pointerdown', move);
      el.addEventListener('pointerleave', () => { const g = el.querySelector('.guide'); if (g) g.setAttribute('opacity', 0); });
    });
    c.set = (o) => c.update(() => { st.opt = Object.assign({}, st.opt, o); });
    Object.defineProperty(c, 'opt', { get: () => st.opt });
    return c;
  };

  /* heatmap: { rows, cols, data, focusCol, fmt, tip(r,c) } */
  PV.heat = function (el, opt) {
    const st = { opt };
    const c = makeChart(el, (w, k) => {
      const o = st.opt, fmt = o.fmt || PV.pct;
      const nar = w < 520, lw = nar ? w * 0.3 : Math.min(200, w * 0.36), ch = 42, hh = 34, cw = (w - lw) / o.cols.length, hfs = nar ? 11 : 12.5;
      const seq = [1, 2, 3, 4, 5].map((i) => PV.css('--seq' + i));
      const col = (v) => seq[Math.min(4, Math.floor(v / 15))];
      let s = svgOpen(w, hh + o.rows.length * ch, o.aria);
      o.cols.forEach((cn, j) => { s += `<text x="${lw + cw * j + cw / 2}" y="${hh / 2}" text-anchor="middle" dominant-baseline="central" font-size="${hfs}" font-weight="700" fill="${j === o.focusCol ? PV.css('--brand-strong') : PV.css('--ink-700')}">${PV.esc(trunc(cn, hfs, cw - 2))}</text>`; });
      o.rows.forEach((rn, i) => {
        const y = hh + i * ch;
        s += `<text x="0" y="${y + ch / 2}" dominant-baseline="central" font-size="${nar ? 11.5 : 13}" fill="${PV.css('--ink-700')}">${PV.esc(trunc(rn, nar ? 11.5 : 13, lw - 6))}</text>`;
        o.data[i].forEach((v, j) => { const hi = v >= 60; s += `<g data-i="${i * 100 + j}" opacity="${k}"><rect x="${lw + cw * j + 1}" y="${y + 1}" width="${cw - 2}" height="${ch - 2}" rx="4" fill="${col(v)}"/><text x="${lw + cw * j + cw / 2}" y="${y + ch / 2}" text-anchor="middle" dominant-baseline="central" font-size="13" font-weight="${hi ? 700 : 500}" fill="${hi ? '#fff' : PV.css('--ink-900')}">${fmt(v)}</text></g>`; });
      });
      el.innerHTML = s + '</svg>';
    }, (c) => hover(el, c, (n) => st.opt.tip && st.opt.tip(Math.floor(+n / 100), +n % 100)));
    c.set = (o) => { st.opt = Object.assign({}, st.opt, o); if (!c.seen) { c.draw(0); return; } c.ready = false; PV.animate(400, (k) => { c.draw(0.35 + 0.65 * k); if (k === 1) c.ready = true; }); };
    return c;
  };

  /* empilhado 100%: { rows:[{label,parts}], colors, lastLight, tip(r,p) } */
  PV.stack = function (el, opt) {
    const st = { opt };
    const c = makeChart(el, (w, k) => {
      const o = st.opt, rowH = 40, barH = 26, lw = Math.min(150, w * 0.34), bw = w - lw;
      let s = svgOpen(w, o.rows.length * rowH, o.aria);
      o.rows.forEach((r, i) => {
        const y = i * rowH, tot = r.parts.reduce((a, b) => a + b, 0) || 1;
        s += `<text x="${lw - 12}" y="${y + rowH / 2}" text-anchor="end" dominant-baseline="central" font-size="13" font-weight="${i === 0 ? 700 : 400}" fill="${PV.css('--ink-700')}">${PV.esc(trunc(r.label, 13, lw - 14))}</text>`;
        let x = lw;
        r.parts.forEach((p, j) => {
          const pw = (p / tot) * bw * k, light = o.lastLight && j === r.parts.length - 1;
          s += `<g data-i="${i * 100 + j}"><rect x="${x}" y="${y + (rowH - barH) / 2}" width="${Math.max(0, pw - 1.5)}" height="${barH}" fill="${PV.col(o.colors[j])}"/>`;
          if (pw > 36 && k === 1) s += `<text x="${x + pw / 2}" y="${y + rowH / 2}" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="${light ? PV.css('--ink-900') : '#fff'}">${PV.pct((p / tot) * 100)}</text>`;
          s += `</g>`; x += pw;
        });
      });
      el.innerHTML = s + '</svg>';
    }, (c) => hover(el, c, (n) => st.opt.tip && st.opt.tip(Math.floor(+n / 100), +n % 100)));
    c.set = (o) => c.update(() => { st.opt = Object.assign({}, st.opt, o); });
    return c;
  };

  /* quadrante (brand drivers): { items:[{label,x,y,color,focus}], xLab, yLab, xMid, yMid, xMax, yMax, quads:[tl,tr,bl,br], tip(i) } */
  PV.quad = function (el, opt) {
    const st = { opt };
    const c = makeChart(el, (w, k, c) => {
      const o = st.opt, H = o.height || (w < 520 ? 440 : Math.min(440, Math.max(340, w * 0.62)));
      const L = 34, R = 14, T = 14, B = 34, iw = w - L - R, ih = H - T - B;
      const X = (v) => L + (v / o.xMax) * iw, Y = (v) => T + ih - (v / o.yMax) * ih;
      const ink3 = PV.css('--ink-300'), ink5 = PV.css('--ink-500');
      let s = svgOpen(w, H, o.aria);
      const mx = X(o.xMid), my = Y(o.yMid);
      s += `<rect x="${mx}" y="${T}" width="${L + iw - mx}" height="${my - T}" fill="${PV.css('--brand-tint')}"/>`;
      s += `<line x1="${mx}" x2="${mx}" y1="${T}" y2="${T + ih}" stroke="${ink3}" stroke-dasharray="4 4"/><line x1="${L}" x2="${L + iw}" y1="${my}" y2="${my}" stroke="${ink3}" stroke-dasharray="4 4"/>`;
      s += `<line x1="${L}" x2="${L + iw}" y1="${T + ih}" y2="${T + ih}" stroke="${PV.css('--line')}"/><line x1="${L}" x2="${L}" y1="${T}" y2="${T + ih}" stroke="${PV.css('--line')}"/>`;
      const q = o.quads || [];
      const qp = [[L + 8, T + 16, 'start'], [L + iw - 8, T + 16, 'end'], [L + 8, T + ih - 10, 'start'], [L + iw - 8, T + ih - 10, 'end']];
      q.forEach((t, i) => { s += `<text x="${qp[i][0]}" y="${qp[i][1]}" text-anchor="${qp[i][2]}" font-size="11.5" font-weight="700" fill="${i === 1 ? PV.css('--brand-strong') : ink5}" letter-spacing=".02em">${PV.esc(t)}</text>`; });
      s += `<text x="${L + iw / 2}" y="${H - 6}" text-anchor="middle" font-size="12" fill="${ink5}">${PV.esc(o.xLab)} →</text>`;
      s += `<text transform="translate(12 ${T + ih / 2}) rotate(-90)" text-anchor="middle" font-size="12" fill="${ink5}">${PV.esc(o.yLab)} →</text>`;
      const pts = o.items.map((d, i) => { const pv = c.prev && c.prev[d.label]; const x = lerp(pv ? pv[0] : o.xMid, d.x, k), y = lerp(pv ? pv[1] : o.yMid, d.y, k); return { d, i, cx: X(x), cy: Y(y) }; });
      const labs = [];
      pts.forEach((p) => { const r = p.d.focus ? 9 : 7; const col = PV.col(p.d.color) || PV.css('--ink-500'); s += `<g data-i="${p.i}"><circle cx="${p.cx}" cy="${p.cy}" r="${r + 10}" fill="#000" fill-opacity="0"/><circle cx="${p.cx}" cy="${p.cy}" r="${r * (0.4 + 0.6 * k)}" fill="${col}" stroke="#fff" stroke-width="2"/></g>`; labs.push({ x: p.cx, y: p.cy, t: p.d.label, f: p.d.focus, col }); });
      if (k === 1) {
        const boxes = labs.map((l) => ({ x0: l.x - 10, x1: l.x + 10, y0: l.y - 10, y1: l.y + 10 }));
        const hit = (bx) => boxes.some((o) => !(bx.x1 < o.x0 || bx.x0 > o.x1 || bx.y1 < o.y0 || bx.y0 > o.y1));
        labs.slice().sort((a, b) => (b.f ? 1 : 0) - (a.f ? 1 : 0)).forEach((l) => {
          const tw = PV.textW(l.t, 12), th = 14;
          const cands = [[l.x + 13, l.y, 'start'], [l.x - 13, l.y, 'end'], [l.x, l.y - 17, 'middle'], [l.x, l.y + 17, 'middle'], [l.x + 13, l.y - 15, 'start'], [l.x + 13, l.y + 15, 'start'], [l.x - 13, l.y - 15, 'end'], [l.x - 13, l.y + 15, 'end']];
          let pick = null;
          for (const [x, y, an] of cands) {
            const x0 = an === 'start' ? x : an === 'end' ? x - tw : x - tw / 2, bx = { x0, x1: x0 + tw, y0: y - th / 2, y1: y + th / 2 };
            if (bx.x0 < L + 2 || bx.x1 > L + iw - 2 || bx.y0 < T || bx.y1 > T + ih) continue;
            if (!hit(bx)) { pick = [x, y, an, bx]; break; }
          }
          if (!pick) { const right = l.x + 13 + tw < L + iw; pick = [right ? l.x + 13 : l.x - 13, l.y, right ? 'start' : 'end', null]; }
          if (pick[3]) boxes.push(pick[3]);
          s += `<text x="${pick[0]}" y="${pick[1]}" text-anchor="${pick[2]}" dominant-baseline="central" font-size="12" font-weight="${l.f ? 700 : 500}" fill="${PV.css('--ink-700')}" paint-order="stroke" stroke="#fff" stroke-width="3" stroke-linejoin="round">${PV.esc(l.t)}</text>`;
        });
      }
      el.innerHTML = s + '</svg>';
    }, (c) => { c.snapshot = () => Object.fromEntries(st.opt.items.map((d) => [d.label, [d.x, d.y]])); hover(el, c, (i) => st.opt.tip && st.opt.tip(+i)); });
    c.set = (o) => c.update(() => { st.opt = Object.assign({}, st.opt, o); });
    return c;
  };

  /* flow bands: { left:[{label,value,color}], right:[{label,value,color}], flows:[[li,ri,value]], fmt, tip(fi) } */
  PV.flow = function (el, opt) {
    const st = { opt };
    const c = makeChart(el, (w, k) => {
      const o = st.opt, fmt = o.fmt || PV.pct, H = o.height || 340, gap = 14;
      const narrow = w < 520, need = (arr) => Math.max(40, ...arr.map((n) => PV.textW(n.label, 13) + PV.textW(fmt(n.value), 12) + 22)), lw = narrow ? Math.min(100, w * 0.3) : Math.min(need(o.left), w * 0.3), rw = narrow ? lw : Math.min(need(o.right), w * 0.3), nw = narrow ? 8 : 12, top = o.heads ? 26 : 0, lfs = narrow ? 11.5 : 13;
      const x0 = lw, x1 = w - rw - nw;
      const tot = o.left.reduce((a, b) => a + b.value, 0) || 1, totR = o.right.reduce((a, b) => a + b.value, 0) || 1;
      const avail = H - top - gap * (Math.max(o.left.length, o.right.length) - 1);
      const sc = avail / Math.max(tot, totR);
      const ly = [], ry = []; let y = top;
      o.left.forEach((n) => { ly.push(y); y += n.value * sc + gap; });
      y = top; o.right.forEach((n) => { ry.push(y); y += n.value * sc + gap; });
      const lo = o.left.map(() => 0), ro = o.right.map(() => 0);
      let s = svgOpen(w, H, o.aria);
      const order = o.flows.map((f, i) => [f, i]);
      order.forEach(([f, fi]) => {
        const [a, b, v] = f, h = v * sc;
        const ya = ly[a] + lo[a], yb = ry[b] + ro[b]; lo[a] += h; ro[b] += h;
        const xa = x0 + nw, xb = lerp(xa, x1, k), cx = (xa + xb) / 2;
        const col = PV.col(o.left[a].color);
        s += `<path data-i="${fi}" d="M${xa} ${ya} C${cx} ${ya} ${cx} ${yb} ${xb} ${yb} L${xb} ${yb + h} C${cx} ${yb + h} ${cx} ${ya + h} ${xa} ${ya + h}Z" fill="${col}" data-b="${a === b ? 0.22 : 0.45}" fill-opacity="${a === b ? 0.22 : 0.45}" style="transition:fill-opacity .2s"/>`;
      });
      const place = (arr, ys, SP) => { const c0 = arr.map((n, i) => ys[i] + (n.value * sc) / 2); for (let i = 1; i < c0.length; i++) if (c0[i] - c0[i - 1] < SP) c0[i] = c0[i - 1] + SP; return c0; };
      const SP = narrow ? 32 : 21;
      const lc = place(o.left, ly, SP), rc = place(o.right, ry, SP);
      const HH = Math.max(H, ...lc.map((v) => v + 20), ...rc.map((v) => v + 20));
      s = s.replace(/^<svg[^>]*>/, svgOpen(w, HH, o.aria));
      if (o.heads) s += `<text x="${x0 + nw}" y="12" text-anchor="end" font-size="11" font-weight="700" fill="${PV.css('--ink-300')}" letter-spacing=".04em">${PV.esc(o.heads[0])}</text><text x="${x1}" y="12" font-size="11" font-weight="700" fill="${PV.css('--ink-300')}" letter-spacing=".04em">${PV.esc(o.heads[1])}</text>`;
      o.left.forEach((n, i) => { const h = n.value * sc; s += `<rect x="${x0}" y="${ly[i]}" width="${nw}" height="${Math.max(1, h)}" rx="2" fill="${PV.col(n.color)}"/>${narrow ? `<text x="${x0 - 6}" y="${lc[i] - 7}" text-anchor="end" dominant-baseline="central" font-size="${lfs}" font-weight="600" fill="${PV.css('--ink-700')}">${PV.esc(trunc(n.label, lfs, lw - 8))}</text><text x="${x0 - 6}" y="${lc[i] + 8}" text-anchor="end" dominant-baseline="central" font-size="${lfs}" fill="${PV.css('--ink-500')}">${fmt(n.value)}</text>` : `<text x="${x0 - 8}" y="${lc[i]}" text-anchor="end" dominant-baseline="central" font-size="${lfs}" fill="${PV.css('--ink-500')}"><tspan font-weight="600" fill="${PV.css('--ink-700')}">${PV.esc(trunc(n.label, lfs, lw - 54))}</tspan> ${fmt(n.value)}</text>`}`; });
      o.right.forEach((n, i) => { const h = n.value * sc; s += `<g opacity="${k}"><rect x="${x1}" y="${ry[i]}" width="${nw}" height="${Math.max(1, h)}" rx="2" fill="${PV.col(n.color)}"/>${narrow ? `<text x="${x1 + nw + 6}" y="${rc[i] - 7}" dominant-baseline="central" font-size="${lfs}" font-weight="600" fill="${PV.css('--ink-700')}">${PV.esc(trunc(n.label, lfs, rw - 8))}</text><text x="${x1 + nw + 6}" y="${rc[i] + 8}" dominant-baseline="central" font-size="${lfs}" font-weight="700" fill="${PV.css('--ink-900')}">${fmt(n.value)}</text>` : `<text x="${x1 + nw + 8}" y="${rc[i]}" dominant-baseline="central" font-size="${lfs}" fill="${PV.css('--ink-900')}"><tspan font-weight="600" fill="${PV.css('--ink-700')}">${PV.esc(trunc(n.label, lfs, rw - 54))}</tspan> <tspan font-weight="700">${fmt(n.value)}</tspan></text>`}</g>`; });
      el.innerHTML = s + '</svg>';
    }, (c) => {
      hover(el, c, (i) => st.opt.tip && st.opt.tip(+i));
      el.addEventListener('pointerover', (e) => { const p = e.target.closest && e.target.closest('path[data-i]'); el.querySelectorAll('path[data-i]').forEach((q) => q.setAttribute('fill-opacity', !p ? q.dataset.b : q === p ? 0.75 : 0.1)); });
      el.addEventListener('pointerleave', () => el.querySelectorAll('path[data-i]').forEach((q) => q.setAttribute('fill-opacity', q.dataset.b)));
    });
    c.set = (o) => c.update(() => { st.opt = Object.assign({}, st.opt, o); });
    return c;
  };


  /* colunas verticais: { items:[{label,value,color}], fmt, max, height, tip(i,item) } */
  PV.barsV = function (el, opt) {
    const st = { opt };
    const c = makeChart(el, (w, k, c) => {
      const o = st.opt, items = o.items || [], fmt = o.fmt || PV.pct, H = o.height || 260, T = 24, B = 28;
      const n = items.length, gw = w / Math.max(1, n), bw = Math.min(56, gw * 0.62), ih = H - T - B;
      const max = o.max || Math.max(1, ...items.map((d) => d.value)) * 1.08;
      const nar = gw < 34, fs = nar ? 10.5 : 12;
      let s = svgOpen(w, H, o.aria);
      s += `<line x1="0" x2="${w}" y1="${T + ih}" y2="${T + ih}" stroke="${PV.css('--line')}"/>`;
      items.forEach((d, i) => {
        const from = c.prev && c.prev[d.label] != null ? c.prev[d.label] : 0, v = lerp(from, d.value, k);
        const x = i * gw + (gw - bw) / 2, h = (v / max) * ih, y = T + ih - h;
        s += `<g data-i="${i}"><rect x="${i * gw}" y="${T}" width="${gw}" height="${ih}" fill="#000" fill-opacity="0"/><rect x="${x}" y="${y}" width="${bw}" height="${Math.max(0, h)}" rx="3" fill="${PV.col(d.color) || PV.css('--muted')}"/>`;
        s += `<text x="${x + bw / 2}" y="${y - 7}" text-anchor="middle" font-size="${fs}" font-weight="700" fill="${PV.css('--ink-900')}">${fmt(v)}</text>`;
        s += `<text x="${x + bw / 2}" y="${H - 8}" text-anchor="middle" font-size="${fs}" fill="${PV.css('--ink-500')}">${PV.esc(d.label)}</text></g>`;
      });
      el.innerHTML = s + '</svg>';
    }, (c) => { c.snapshot = () => Object.fromEntries((st.opt.items || []).map((d) => [d.label, d.value])); hover(el, c, (i) => st.opt.tip && st.opt.tip(+i, st.opt.items[+i])); });
    c.set = (o) => c.update(() => { st.opt = Object.assign({}, st.opt, o); });
    return c;
  };
  /* waffle 10x10: PV.waffle(el, value, {color, label}) */
  PV.waffle = function (el, v, o) {
    o = o || {};
    el.classList.add('waffle');
    el.setAttribute('role', 'img');
    const draw = (val) => {
      el.setAttribute('aria-label', o.label ? `${o.label}: ${PV.pct(val)}` : PV.pct(val));
      if (el.children.length !== 100) el.innerHTML = Array.from({ length: 100 }, (_, i) => `<i style="transition-delay:${RM ? 0 : (i % 10) * 18 + Math.floor(i / 10) * 18}ms"></i>`).join('');
      const n = Math.round(val);
      [...el.children].forEach((c, i) => { c.className = i < n ? 'on' : ''; if (o.color) c.style.background = i < n ? PV.col(o.color) : ''; });
    };
    draw(v);
    PV.whenOpen(() => { if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; } const ob = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); ob.disconnect(); } }), { threshold: 0.3 }); ob.observe(el); });
    return { set: draw };
  };

  /* sparkline */
  PV.spark = function (vals, o) {
    o = o || {}; const w = 120, h = 28, mn = Math.min(...vals), mx = Math.max(...vals), r = mx - mn || 1;
    const X = (i) => 2 + (i / Math.max(1, vals.length - 1)) * (w - 6), Y = (v) => h - 3 - ((v - mn) / r) * (h - 6);
    const p = vals.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join('');
    const col = PV.col(o.color || '--brand');
    return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="${p}" fill="none" stroke="${col}" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><circle cx="${X(vals.length - 1)}" cy="${Y(vals[vals.length - 1])}" r="3" fill="${col}"/></svg>`;
  };

  /* ---------- exportar card em JPG ---------- */
  PV.exportCard = async function (card, name) {
    try {
      const scale = 2, rc = card.getBoundingClientRect();
      const cv = document.createElement('canvas'); cv.width = Math.round(rc.width * scale); cv.height = Math.round(rc.height * scale);
      const ctx = cv.getContext('2d'); ctx.scale(scale, scale);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, rc.width, rc.height);
      const wrapText = (t, x, y, mw, lh) => { const words = t.split(/\s+/); let line = ''; words.forEach((wd) => { const test = line ? line + ' ' + wd : wd; if (ctx.measureText(test).width > mw && line) { ctx.fillText(line, x, y); line = wd; y += lh; } else line = test; }); ctx.fillText(line, x, y); };
      const draw = (el, font, color, size) => { const r = el.getBoundingClientRect(); if (!r.width) return; ctx.font = font; ctx.fillStyle = color; ctx.textBaseline = 'top'; wrapText(el.textContent.trim(), r.left - rc.left, r.top - rc.top, r.width + 4, size * 1.3); };
      card.querySelectorAll('[data-x="h"]').forEach((el) => draw(el, '700 18px "Schibsted Grotesk", Arial, sans-serif', '#1A1A1A', 18));
      card.querySelectorAll('[data-x="p"]').forEach((el) => draw(el, '13.5px "Schibsted Grotesk", Arial, sans-serif', '#5E5E5E', 13.5));
      card.querySelectorAll('[data-x="n"]').forEach((el) => draw(el, '11px "JetBrains Mono", monospace', '#8C8C8C', 11));
      for (const svg of card.querySelectorAll('svg[role="img"]')) {
        const r = svg.getBoundingClientRect(); if (!r.width) continue;
        const xml = new XMLSerializer().serializeToString(svg);
        await new Promise((res) => { const im = new Image(); im.onload = () => { ctx.drawImage(im, r.left - rc.left, r.top - rc.top, r.width, r.height); res(); }; im.onerror = res; im.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(xml); });
      }
      for (const wf of card.querySelectorAll('.waffle')) {
        const r = wf.getBoundingClientRect();
        [...wf.children].forEach((c) => { const cr = c.getBoundingClientRect(); ctx.fillStyle = getComputedStyle(c).backgroundColor; ctx.fillRect(cr.left - rc.left, cr.top - rc.top, cr.width, cr.height); });
        void r;
      }
      const a = document.createElement('a');
      a.download = (name || 'grafico') + '.jpg';
      a.href = cv.toDataURL('image/jpeg', 0.92);
      document.body.appendChild(a); a.click(); a.remove();
      PV.toast('Imagem exportada');
    } catch (e) { PV.toast('Não foi possível exportar neste navegador'); }
  };
  PV.bindExports = function (root) {
    (root || document).querySelectorAll('[data-export]').forEach((b) => {
      if (b._b) return; b._b = 1;
      b.innerHTML = PV.icon.dl + '<span>JPG</span>';
      b.setAttribute('aria-label', 'Exportar em JPG');
      b.addEventListener('click', () => PV.exportCard(b.closest('.card'), b.dataset.export));
    });
  };

  /* ---------- revelar e contadores ---------- */
  PV.reveal = function (root) {
    const els = (root || document).querySelectorAll('.rv:not(.in)');
    if (!('IntersectionObserver' in window) || RM) { els.forEach((e) => e.classList.add('in')); return; }
    const o = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); } }), { threshold: 0.08 });
    PV.whenOpen(() => els.forEach((e) => o.observe(e)));
  };
  PV.countUp = function (el, to, d, suf) {
    d = d || 0; suf = suf == null ? '%' : suf;
    const from = el._v != null ? el._v : 0; el._v = to;
    PV.animate(900, (k) => { el.textContent = PV.fmt(lerp(from, to, k), d) + suf; });
  };
  PV.counters = function (root) {
    const els = (root || document).querySelectorAll('[data-count]');
    const run = (el) => PV.countUp(el, parseFloat(el.dataset.count), +(el.dataset.dec || 0), el.dataset.suf == null ? '%' : el.dataset.suf);
    els.forEach((el) => { el.textContent = PV.fmt(parseFloat(el.dataset.count), +(el.dataset.dec || 0)) + (el.dataset.suf == null ? '%' : el.dataset.suf); });
    if (!('IntersectionObserver' in window) || RM) return;
    const o = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { e.target._v = 0; run(e.target); o.unobserve(e.target); } }), { threshold: 0.4 });
    PV.whenOpen(() => els.forEach((e) => o.observe(e)));
  };
  PV.rng = function (seed) { let s = seed >>> 0 || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; };
  PV.hash = function (str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
})();
