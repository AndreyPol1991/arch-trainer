import { launch, URL } from './cdp.mjs';
const p = await launch(9337, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile5');
const to = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; const hh=document.querySelector('header.top').offsetHeight; window.scrollTo(0, e.getBoundingClientRect().top + scrollY - hh - 8); return Math.round(scrollY);})()`);
const q = v => p.eval(`(()=>{const i=document.getElementById('nav-q'); i.value=${JSON.stringify(v)}; i.dispatchEvent(new Event('input')); return [...document.querySelectorAll('.tab')].filter(t=>!t.hidden).map(t=>t.textContent.trim()).join(' | ') || 'NOTHING'})()`);
const g = v => p.eval(`(()=>{const i=document.getElementById('gl-q'); i.value=${JSON.stringify(v)}; i.dispatchEvent(new Event('input')); return document.getElementById('gl-n').textContent})()`);
try {
  await p.viewport(1280, 800, false, 1);
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  await p.eval(`document.getElementById('nav-open').click()`); await p.sleep(200);
  for (const s of ['kafka', 'кафка', 'Kafka', '2pc', '2PC', 'jwt', 'токен', 'сага', 'саги', 'идемпотент', 'outbox', 'аутбокс', 'rabbit', 'redis', 'кеш', 'кэш', 'c4', 'adr', 'circuit', 'размыкатель', 'grpc', 'rest', 'sql', 'шардир', 'event sourcing', 'ddd'])
    console.log(s.padEnd(14), '→', await q(s));
  await q('2pc'); await p.sleep(100);
  await p.shot('14_laptop_search_2pc');
  await q('идемпотент'); await p.sleep(100);
  await p.shot('15_laptop_search_idempotency_nothing');
  await q('');
  await p.eval(`document.getElementById('nav-close').click()`);
  // глоссарий
  await p.eval(`document.querySelector('.tab[data-tab="gloss"]').click()`); await p.sleep(300);
  for (const s of ['JWT', 'Kafka', '2PC', 'идемпотент', 'сага']) console.log('gloss', s, '→', await g(s));
  await g('JWT'); await to('#gl-q'); await p.eval('window.scrollBy(0,-80)'); await p.sleep(200);
  await p.shot('16_laptop_glossary_jwt');
  // мобильный — поиск kafka
  await p.viewport(390, 844, true, 2);
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  await p.eval(`document.getElementById('nav-open').click()`); await p.sleep(200);
  await q('kafka'); await p.sleep(100);
  await p.shot('13_mobile_search_kafka');
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
