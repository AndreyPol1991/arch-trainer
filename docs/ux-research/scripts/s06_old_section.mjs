import { launch, URL } from './cdp.mjs';
const p = await launch(9343, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile11');
const to = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; const hh=document.querySelector('header.top').offsetHeight; window.scrollTo(0, e.getBoundingClientRect().top + scrollY - hh - 8); return Math.round(scrollY);})()`);
const tab = id => p.eval(`document.querySelector('.tab[data-tab="${id}"]').click()`);
try {
  await p.viewport(1280, 800, false, 1);
  await p.goto(URL, 1500); await p.eval('localStorage.clear()');
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  await tab('saga'); await p.sleep(300);
  await p.shot('25_laptop_saga_old_top');
  await to('#sg-mode'); await p.eval('window.scrollBy(0,-120)');
  await p.eval(`document.getElementById('sg-run').click()`); await p.sleep(6000);
  await p.shot('26_laptop_saga_simulator');
  // конец нового раздела: задания отвечены + «Дальше»
  await tab('repl'); await p.sleep(300);
  console.log(await p.eval(`(()=>{const r=[...document.querySelectorAll('#rpx-ch15 .rtask')]; r.slice(-2).forEach((t,i)=>{const b=t.querySelectorAll('.rb'); b[i].click()}); return r.length})()`));
  await to('#repl .nextbar'); await p.eval('window.scrollBy(0,-480)'); await p.sleep(300);
  await p.shot('23_laptop_repl_end_quiz_nextbar');
  // мобильный: старый раздел
  await p.viewport(390, 844, true, 2);
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  await tab('consist'); await p.sleep(300);
  await p.shot('27_mobile_consist_old_top', { vp: true });
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
