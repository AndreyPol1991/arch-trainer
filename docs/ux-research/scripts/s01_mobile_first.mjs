import { launch, URL } from './cdp.mjs';
const p = await launch(9333);
try {
  await p.viewport(390, 844, true, 2);
  await p.goto(URL, 2500);
  await p.eval(`localStorage.clear()`);
  await p.goto(URL, 2500);
  await p.calm();
  await p.theme('light');
  await p.shot('01_mobile_first_screen');
  const info = await p.eval(`({title:document.title, navGroup:document.getElementById('nav-group').textContent, navTitle:document.getElementById('nav-title').textContent, pts:document.getElementById('pg-pts').textContent, h:document.documentElement.scrollHeight})`);
  console.log(JSON.stringify(info));
  // второй экран — что ниже первого
  await p.eval(`window.scrollTo(0, 800)`); await p.sleep(300);
  await p.shot('02_mobile_first_scroll2');
  // открыть меню
  await p.eval(`window.scrollTo(0,0); document.getElementById('nav-open').click()`); await p.sleep(400);
  await p.shot('03_mobile_menu_open');
  console.log('errors', JSON.stringify(p.logs));
} finally { p.close(); }
