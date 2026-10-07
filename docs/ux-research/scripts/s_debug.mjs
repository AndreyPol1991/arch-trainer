import { launch, URL } from './cdp.mjs';
const p = await launch(9339, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile7');
const st = () => p.eval(`JSON.stringify({sy:scrollY, sx:scrollX, vv:[visualViewport.offsetLeft,visualViewport.offsetTop,visualViewport.width,visualViewport.height,visualViewport.scale], hdr:document.querySelector('header.top').getBoundingClientRect().top, sw:document.documentElement.scrollWidth, cw:document.documentElement.clientWidth, iw:innerWidth})`);
try {
  await p.viewport(390, 844, true, 2);
  for (const h of ['', '#repl', '#raft', '#saga', '#layers']) {
    await p.goto(URL + h, 2500);
    console.log(h, await st());
    if (h) { const wide = await p.eval(`(()=>{const pn=document.querySelector('.panel.active'); const out=[]; pn.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect(); if(r.right>innerWidth+2 && out.length<6) out.push(e.tagName+'.'+e.className+' '+Math.round(r.right))}); return out.join(' | ')})()`); console.log('  wide:', wide); }
  }
} finally { p.close(); }
