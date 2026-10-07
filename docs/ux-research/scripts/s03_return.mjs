import { launch, URL } from './cdp.mjs';
const p = await launch(9336, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile4');
const to = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; const hh=document.querySelector('header.top').offsetHeight; window.scrollTo(0, e.getBoundingClientRect().top + scrollY - hh - 8); return Math.round(scrollY);})()`);
try {
  await p.viewport(1280, 800, false, 1);
  await p.goto(URL, 2000); await p.eval('localStorage.clear()');
  await p.goto(URL + '#saga', 2500); await p.calm(); await p.theme('light');
  // отвечаем на задания саги: в каждом — первая кнопка
  console.log(await p.eval(`(()=>{const r=[...document.querySelectorAll('#sga-tasks .rtask')]; r.forEach(t=>t.querySelector('.rb').click()); return r.length + ' / ' + document.getElementById('sga-score').textContent})()`));
  await to('#sga-tasks'); await p.eval('window.scrollBy(0,-60)'); await p.sleep(300);
  await p.shot('24_saga_quiz_feedback');
  // засеять прогресс: разделы 0–11 пройдены полностью
  console.log(await p.eval(`(()=>{const keys=bridge.keys, reg=Progress.reg, d=Progress.data; const tabs=[...document.querySelectorAll('.tab')].slice(0,12).map(t=>t.dataset.tab); for(const k in keys){ if(tabs.includes(keys[k])) d[k]=reg[k]; } localStorage.setItem('arch-progress-v1', JSON.stringify(d)); return Object.keys(d).length})()`));
  // «через неделю»: открываем ссылку без якоря
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  console.log(await p.eval(`document.getElementById('pg-pts').textContent + ' | ' + document.getElementById('nav-title').textContent`));
  await p.shot('10_return_lands_on_section0');
  await p.eval(`document.getElementById('nav-open').click()`); await p.sleep(300);
  await p.shot('11_return_menu_no_done_marks');
  await p.eval(`document.getElementById('nav-close').click()`);
  await p.eval(`document.querySelector('.tab[data-tab="saga"]').click()`); await p.sleep(300);
  await to('#sga-tasks'); await p.eval('window.scrollBy(0,-60)'); await p.sleep(300);
  console.log(await p.eval(`document.getElementById('sga-score').textContent + ' of ' + document.getElementById('sga-total').textContent + ' | pts ' + document.getElementById('pg-pts').textContent`));
  await p.shot('12_return_saga_counter_reset');
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
