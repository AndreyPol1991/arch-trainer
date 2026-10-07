import { launch, URL } from './cdp.mjs';
const p = await launch(9340, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile8');
try {
  await p.viewport(390, 844, true, 1);
  await p.goto(URL, 2500);
  const r = await p.eval(`(() => {
    const out = [];
    const scrollable = e => { const s = getComputedStyle(e); return /(auto|scroll|hidden)/.test(s.overflowX); };
    for (const t of document.querySelectorAll('.tab')) {
      t.click();
      const pn = document.getElementById(t.dataset.tab);
      const W = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      const culprits = [];
      if (sw > W + 1) {
        pn.querySelectorAll('*').forEach(e => {
          const rc = e.getBoundingClientRect(); if (rc.right <= W + 1 || rc.width === 0) return;
          // есть ли предок со своим скроллом
          let a = e.parentElement, clipped = false;
          while (a && a !== pn) { if (scrollable(a)) { clipped = true; break; } a = a.parentElement; }
          if (!clipped && culprits.length < 3) culprits.push(e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + (typeof e.className === 'string' && e.className ? '.' + e.className.split(' ')[0] : '') + '→' + Math.round(rc.right));
        });
      }
      out.push(t.dataset.tab + ' ' + sw + (culprits.length ? '  ' + culprits.join(', ') : ''));
    }
    return out.join('\\n');
  })()`);
  console.log(r);
} finally { p.close(); }
