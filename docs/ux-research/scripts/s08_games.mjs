import { launch, URL } from './cdp.mjs';
const p = await launch(9345, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile13');
const to = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; const hh=document.querySelector('header.top').offsetHeight; window.scrollTo(0, e.getBoundingClientRect().top + scrollY - hh - 8); return Math.round(scrollY);})()`);
const tab = id => p.eval(`document.querySelector('.tab[data-tab="${id}"]').click()`);
try {
  await p.viewport(1280, 800, false, 1);
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  // каталог: глава «Весь каталог»
  await tab('catalog'); await p.sleep(300);
  console.log(await p.eval(`(()=>{const h=[...document.querySelectorAll('#catalog .card h2')].map(x=>x.textContent.trim().slice(0,60)); return h.join(' || ')})()`));
  await p.eval(`(()=>{const c=[...document.querySelectorAll('#catalog .card')][3]; c.id='__c3'})()`);
  await to('#__c3'); await p.sleep(200);
  await p.shot('37_laptop_catalog_cards');
  // кафе: игра, один ход
  await tab('life'); await p.sleep(300);
  await to('#cf-root'); await p.eval('window.scrollBy(0,-170)'); await p.sleep(200);
  await p.shot('38_laptop_game_cafe');
  // дежурный: игра
  await tab('duty'); await p.sleep(300);
  await to('#dt-root'); await p.eval('window.scrollBy(0,-170)'); await p.sleep(200);
  await p.shot('39_laptop_game_duty');
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
