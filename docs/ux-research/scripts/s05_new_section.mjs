import { launch, URL } from './cdp.mjs';
const p = await launch(9338, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile6');
const to = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; const hh=document.querySelector('header.top').offsetHeight; window.scrollTo(0, e.getBoundingClientRect().top + scrollY - hh - 8); return Math.round(scrollY);})()`);
const click = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; e.click(); return 'ok'})()`);
try {
  // ── мобильный
  await p.viewport(390, 844, true, 2);
  await p.goto(URL, 1500); await p.eval('localStorage.clear()');
  await p.goto(URL + '#repl', 2500); await p.calm(); await p.theme('light');
  await p.shot('17_mobile_repl_top');
  await to('#rpx-ch9'); await p.eval('window.scrollBy(0,600)'); await p.sleep(200);
  await p.shot('20_mobile_repl_midsection_no_position');
  await to('#rpx-ch5'); await p.eval('window.scrollBy(0,250)'); await p.sleep(200);
  await p.shot('18_mobile_repl_console_controls');
  // raft на мобильном
  await p.goto(URL + '#raft', 2500); await p.calm(); await p.theme('light');
  await click('[data-rfx-preset="killL"]'); await p.sleep(3500);
  await to('#rfx-l-kpi'); await p.eval('window.scrollBy(0,-120)'); await p.sleep(300);
  await p.shot('22_mobile_raft_live_cluster');

  // ── ноутбук
  await p.viewport(1280, 800, false, 1);
  await p.goto(URL + '#repl', 2500); await p.calm(); await p.theme('light');
  await to('#rpx-map'); await p.eval('window.scrollBy(0,-90)'); await p.sleep(200);
  await p.shot('19_laptop_repl_chapter_map');
  await to('#rpx-ch5'); await p.sleep(100);
  await click('#rpx-p-run'); await p.sleep(2500); await click('#rpx-p-kill'); await p.sleep(3000);
  await p.eval('window.scrollBy(0,150)'); await p.sleep(200);
  await p.shot('21_laptop_repl_console_after_kill');
  // проверь себя + «Дальше»
  console.log(await p.eval(`(()=>{const r=[...document.querySelectorAll('#rpx-ch15 .rtask')]; r.slice(0,3).forEach((t,i)=>{const b=t.querySelectorAll('.rb'); b[i%b.length].click()}); return r.length})()`));
  await to('#repl .nextbar'); await p.eval('window.scrollBy(0,-560)'); await p.sleep(300);
  await p.shot('23_laptop_repl_end_quiz_nextbar');
  // raft живой кластер на ноутбуке
  await p.goto(URL + '#raft', 2500); await p.calm(); await p.theme('light');
  await click('[data-rfx-preset="killL"]'); await p.sleep(4000);
  await to('#rfx-ch5'); await p.eval('window.scrollBy(0,60)'); await p.sleep(300);
  await p.shot('22b_laptop_raft_live_cluster');
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
