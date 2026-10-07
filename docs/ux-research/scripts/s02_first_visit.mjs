import { launch, URL } from './cdp.mjs';
const p = await launch(9335, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile3');
const to = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; const hh=document.querySelector('header.top').offsetHeight; window.scrollTo(0, e.getBoundingClientRect().top + scrollY - hh - 8); return Math.round(scrollY);})()`);
try {
  // мобильный: карта раздела и конец раздела
  await p.viewport(390, 844, true, 2);
  await p.goto(URL, 2500); await p.eval('localStorage.clear()'); await p.goto(URL, 2500);
  await p.calm(); await p.theme('light');
  console.log(await p.eval(`(()=>{const t=[...document.querySelectorAll('#layers .card h2 .tag')].find(x=>x.textContent.includes('карта')); t.closest('.card').id='__map'; return 1})()`));
  console.log(await to('#__map')); await p.sleep(200);
  await p.shot('04_mobile_layers_chapter_map');
  console.log(await to('#layers .nextbar')); await p.eval('window.scrollBy(0,-300)'); await p.sleep(200);
  await p.shot('05_mobile_layers_end_nextbar');

  // ноутбук 1280×800
  await p.viewport(1280, 800, false, 1);
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  await p.shot('06_laptop1280_first_screen');
  await p.eval(`document.getElementById('nav-open').click()`); await p.sleep(300);
  await p.shot('07_laptop1280_menu_open');
  await p.eval(`document.getElementById('nav-close').click()`);
  // широкий монитор
  await p.viewport(1600, 900, false, 1);
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  await p.shot('08_wide1600_pinned_menu');
  await p.viewport(1920, 1080, false, 1);
  await p.goto(URL + '#repl', 2500); await p.calm(); await p.theme('light');
  await to('#rpx-ch1'); await p.sleep(200);
  await p.shot('09_wide1920_repl_reading');
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
