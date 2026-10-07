import { launch, URL } from './cdp.mjs';
const W = 'file:///C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/';
const p = await launch(9344, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile12');
const to = sel => p.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return 'nf'; const hh=document.querySelector('header.top').offsetHeight; window.scrollTo(0, e.getBoundingClientRect().top + scrollY - hh - 8); return Math.round(scrollY);})()`);
const tab = id => p.eval(`document.querySelector('.tab[data-tab="${id}"]').click()`);
try {
  // график длины разделов
  await p.viewport(1200, 1000, false, 1);
  await p.goto(W + 'length_chart.html', 500);
  await p.shot('28_chart_section_length_screens', { full: true });

  await p.viewport(1280, 800, false, 1);
  await p.goto(URL, 1500); await p.eval('localStorage.clear()');
  await p.goto(URL, 2500); await p.calm(); await p.theme('light');
  // немного прогресса: раздел 0 полностью
  await p.eval(`(()=>{const keys=bridge.keys, reg=Progress.reg; for(const k in keys){ if(['layers','zachem','life'].includes(keys[k])) Progress.report(k, reg[k]); } })()`);
  // Практика: верх
  await tab('practice'); await p.sleep(300);
  await p.shot('29_laptop_practice_top');
  // код результата
  await p.eval(`document.getElementById('sub-name').value='Иван Петров'; document.getElementById('sub-go').click()`); await p.sleep(300);
  const info = await p.eval(`(()=>{const o=document.getElementById('sub-out'); const t=o.textContent; const code=t.split('КОД ДЛЯ ОТПРАВКИ:\\n')[1]||''; return {lines:t.split('\\n').length, codeLen:code.length}})()`);
  console.log('code', JSON.stringify(info));
  await to('#sub-name'); await p.eval('window.scrollBy(0,-90)'); await p.sleep(200);
  await p.shot('30_laptop_practice_code_generated');
  // мобильный вид кода
  await p.viewport(390, 844, true, 2); await p.sleep(400);
  await to('#sub-out'); await p.eval('window.scrollBy(0,-260)'); await p.sleep(300);
  await p.shot('31_mobile_practice_code_output', { vp: true });

  // тёмная тема — мобильный первый экран
  await p.goto(URL, 2500); await p.calm(); await p.theme('dark');
  await p.shot('32_dark_mobile_first_screen', { vp: true });
  // тёмная — ноутбук, пульт репликации
  await p.viewport(1280, 800, false, 1);
  await p.goto(URL, 2500); await p.calm(); await p.theme('dark');
  await tab('repl'); await p.sleep(300);
  await to('#rpx-ch5'); await p.eval(`document.getElementById('rpx-p-run').click()`); await p.sleep(2500);
  await p.eval('window.scrollBy(0,330)'); await p.sleep(300);
  await p.shot('33_dark_laptop_repl_console');
  // скоро появится: ссылка на BPMN из Event Storming
  await p.theme('light');
  await tab('estorm'); await p.sleep(300);
  const r = await p.eval(`(()=>{const b=document.querySelector('#estorm [data-goto="bpmn"]'); if(!b) return 'nf'; const hh=document.querySelector('header.top').offsetHeight; window.scrollTo(0, b.getBoundingClientRect().top + scrollY - 300); b.click(); return b.textContent + ' | title=' + b.title})()`);
  console.log('soon', r); await p.sleep(250);
  await p.shot('36_laptop_soon_toast_bpmn');
  // каталог паттернов
  await tab('catalog'); await p.sleep(300);
  await p.shot('37_laptop_catalog_top');
  // игры
  await tab('life'); await p.sleep(300);
  await p.shot('38_laptop_game_cafe_top');
  await tab('duty'); await p.sleep(300);
  await p.shot('39_laptop_game_duty_top');

  // iframe 1000 px
  await p.viewport(1290, 880, false, 1);
  await p.goto(W + 'iframe_host.html', 4000);
  await p.shot('34_iframe1000_first_screen');
  const ok = await p.eval(`(()=>{try{const d=document.getElementById('f').contentDocument; d.getElementById('nav-open').click(); return 'ok '+d.documentElement.clientWidth}catch(e){return 'ERR '+e.message}})()`);
  console.log('iframe', ok); await p.sleep(400);
  await p.shot('35_iframe1000_menu_open');
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
