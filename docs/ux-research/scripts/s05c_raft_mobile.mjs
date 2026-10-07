import { launch, URL } from './cdp.mjs';
const p = await launch(9342, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile10');
const tab = id => p.eval(`document.querySelector('.tab[data-tab="${id}"]').click()`);
const abs = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); const r=e.getBoundingClientRect(); return {x:r.left+scrollX, y:r.top+scrollY, w:r.width, h:r.height}})()`);
try {
  await p.viewport(390, 844, true, 2);
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  await tab('raft'); await p.sleep(300);
  await p.eval(`document.querySelector('[data-rfx-preset="killL"]').click()`); await p.sleep(3500);
  const a = await abs('#rfx-l-run');
  await p.shot('22_mobile_raft_live_cluster', { clip: { x: 0, y: a.y - 70, width: 390, height: 1500 } });
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
