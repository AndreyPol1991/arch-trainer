import { launch, URL } from './cdp.mjs';
import { writeFileSync } from 'node:fs';
const p = await launch(9334, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile2');
const out = {};
try {
  for (const [w, h, mob] of [[390, 844, true], [1280, 800, false]]) {
    await p.viewport(w, h, mob, 1);
    await p.goto(URL, 2500);
    await p.calm();
    const res = await p.eval(`(() => {
      const keys = bridge.keys, reg = Progress.reg;
      const ptsByTab = {}; for (const k in keys) { ptsByTab[keys[k]] = (ptsByTab[keys[k]]||0) + (reg[k]||0); }
      const unplaced = Object.keys(reg).filter(k => !(k in keys));
      const tabs = [...document.querySelectorAll('.tab')];
      const rows = tabs.map((t, i) => {
        t.click();
        const pn = document.getElementById(t.dataset.tab);
        const txt = pn.innerText || '';
        const words = txt.split(/\\s+/).filter(Boolean).length;
        const cards = pn.querySelectorAll('.card').length;
        const btns = [...pn.querySelectorAll('button')].filter(b => b.offsetParent !== null).length;
        const inputs = pn.querySelectorAll('input,select,textarea').length;
        const tags = [...pn.querySelectorAll('.card h2 .tag')].map(x => x.textContent.trim().toLowerCase());
        const hasMap = tags.some(x => x.includes('карта'));
        const chapters = tags.filter(x => x.startsWith('глава')).length;
        const next = !!pn.querySelector('.nextbar');
        const hasWhy = tags.some(x => x.includes('зачем'));
        const life = pn.querySelectorAll('[class$="-life"]').length;
        const defs = pn.querySelectorAll('[class$="-def"]').length;
        const smallText = (() => { let n=0, tot=0; pn.querySelectorAll('p,li,td,small,span,div').forEach(e => { if (!e.childNodes.length) return; const own=[...e.childNodes].some(c=>c.nodeType===3&&c.textContent.trim().length>20); if(!own) return; tot++; const fs=parseFloat(getComputedStyle(e).fontSize); if(fs<13) n++; }); return tot? Math.round(n/tot*100):0; })();
        // ширина текста
        const lp = pn.querySelector('.card > p');
        const lineW = lp ? Math.round(lp.getBoundingClientRect().width) : 0;
        const fs = lp ? getComputedStyle(lp).fontSize : '';
        return { i, id: t.dataset.tab, title: t.textContent.trim(), group: t.closest('.nav-group').querySelector('.nav-gt').textContent.trim(),
          h: document.documentElement.scrollHeight, words, cards, btns, inputs, hasMap, chapters, next, hasWhy, life, defs, pts: ptsByTab[t.dataset.tab]||0, smallText, lineW, fs };
      });
      return { rows, unplaced, total: Object.values(reg).reduce((a,b)=>a+b,0), data: Progress.data };
    })()`);
    out[w] = res;
    console.log(w, 'total', res.total, 'unplaced', res.unplaced.length, JSON.stringify(res.unplaced).slice(0, 300), 'data', JSON.stringify(res.data));
  }
  writeFileSync('C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/survey.json', JSON.stringify(out, null, 1));
  const m = out[390].rows, d = out[1280].rows;
  console.log('i id | h390 screens | h1280 | words | min | cards | btns | map | ch | life | defs | pts | next | small% | lineW | fs');
  m.forEach((r, k) => console.log([r.i, r.id, r.h, (r.h/844).toFixed(0), d[k].h, r.words, Math.round(r.words/130), r.cards, d[k].btns, r.hasMap?'MAP':'-', r.chapters, r.life, r.defs, r.pts, r.next?'next':'NO', d[k].smallText, d[k].lineW, d[k].fs].join(' | ')));
} finally { p.close(); }
