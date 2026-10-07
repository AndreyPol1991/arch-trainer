import { launch, URL } from './cdp.mjs';
const p = await launch(9341, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile9');
const to = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; const hh=document.querySelector('header.top').offsetHeight; window.scrollTo(0, e.getBoundingClientRect().top + scrollY - hh - 8); return Math.round(scrollY);})()`);
const click = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; e.click(); return 'ok'})()`);
const tab = id => p.eval(`document.querySelector('.tab[data-tab="${id}"]').click()`);
try {
  await p.viewport(390, 844, true, 2);
  await p.goto(URL, 1500); await p.eval('localStorage.clear()');
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  await tab('repl'); await p.sleep(300);
  await p.shot('17_mobile_repl_top',{vp:true});
  await to('#rpx-ch9'); await p.eval('window.scrollBy(0,600)'); await p.sleep(200);
  await p.shot('20_mobile_repl_midsection_no_position',{vp:true});
  await to('#rpx-ch5'); await p.eval('window.scrollBy(0,250)'); await p.sleep(200);
  await p.shot('18_mobile_repl_console_controls',{vp:true});
  await tab('raft'); await p.sleep(300);
  await click('[data-rfx-preset="killL"]'); await p.sleep(3500);
  await to('#rfx-l-kpi'); await p.eval('window.scrollBy(0,-160)'); await p.sleep(300);
  await p.shot('22_mobile_raft_live_cluster',{vp:true});
  // горизонтальный вылет на #explain
  await tab('explain'); await p.sleep(300);
  const pos = await p.eval(`(()=>{const pn=document.getElementById('explain'); let best=null; pn.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect(); if(r.width && (!best || r.right>best.r)) { let a=e.parentElement, cl=false; while(a&&a!==pn){ if(/(auto|scroll|hidden)/.test(getComputedStyle(a).overflowX)){cl=true;break} a=a.parentElement } if(!cl) best={r:r.right, y:r.top+scrollY, d:e.tagName+'.'+e.className}; }}); return best})()`);
  console.log(JSON.stringify(pos));
  await p.eval(`window.scrollTo(0, ${Math.max(0, Math.round(pos.y) - 300)})`); await p.sleep(200);
  await p.eval(`window.scrollBy(260, 0)`); await p.sleep(200);
  console.log(await p.eval(`JSON.stringify({sx:scrollX, sy:scrollY, sw:document.documentElement.scrollWidth, vv:[visualViewport.offsetLeft, visualViewport.offsetTop]})`));
  await p.shot('25b_mobile_explain_horizontal_overflow',{vp:true});
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
