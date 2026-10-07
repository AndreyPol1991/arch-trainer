import { launch, URL } from './cdp.mjs';
const p = await launch(9346, 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile14');
const st = () => p.eval(`location.hash + ' active=' + document.querySelector('.panel.active').id + ' title=' + document.getElementById('nav-title').textContent`);
try {
  await p.viewport(1280, 800, false, 1);
  await p.goto(URL, 2500);
  await p.eval(`document.querySelector('.tab[data-tab="saga"]').click()`); await p.sleep(200);
  await p.eval(`document.querySelector('.tab[data-tab="raft"]').click()`); await p.sleep(200);
  console.log('after clicks:', await st());
  await p.eval('history.back()'); await p.sleep(600);
  console.log('after back:  ', await st());
  // кнопка «Сбросить весь прогресс»: есть ли подтверждение
  await p.eval(`window.__c=0; window.confirm=()=>{window.__c++; return false}`);
  await p.eval(`Progress.report('sga-score', 3)`);
  await p.eval(`document.getElementById('sub-clear').click()`); await p.sleep(200);
  console.log('confirm calls:', await p.eval('window.__c'), 'pts after reset:', await p.eval(`document.getElementById('pg-pts').textContent`));
  // клавиши ← → при фокусе на кнопке
  await p.eval(`document.querySelector('.tab[data-tab="raft"]').click()`);
  await p.eval(`document.getElementById('rfx-l-run').focus()`);
  await p.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
  await p.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
  await p.sleep(200);
  console.log('after → on focused sim button:', await st());
  // подсказки-термины: сколько и есть ли tabindex
  console.log(await p.eval(`(()=>{const t=[...document.querySelectorAll('.t[data-d]')]; return t.length + ' terms, tabindex: ' + t.filter(x=>x.hasAttribute('tabindex')).length})()`));
  // «Что именно это улучшает» без стилей
  console.log(await p.eval(`(()=>{const g=[...document.querySelectorAll('.lgrid')].filter(x=>!x.closest('.skout,.lout')); return g.length + ' unstyled lgrid; fs=' + (g[0]?getComputedStyle(g[0].querySelector('div')).fontSize:'')})()`));
  // время, где в разделах «Справа» при узкой ширине
} finally { p.close(); }
