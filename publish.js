/* Сборка для публикации: только готовые разделы.
   Пока часть вкладок — заглушки («Раздел готовится»), build.sh склеил бы их в страницу.
   Этот скрипт собирает index.html без них:
   - вкладки-заглушки убираются из шапки, номера пересчитываются;
   - «Дальше →», ведущее на заглушку, перенаправляется на следующий готовый раздел;
   - прочие кнопки-ссылки на заглушки в разметке становятся неактивными.
   Запуск: node publish.js [--skip id1,id2]  (потом node check.js && node smoke.js)
   --skip — вкладки, которые ещё дописываются, хотя файл уже не заглушка. */
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '_parts');
const STUB = 'Раздел готовится';
const si = process.argv.indexOf('--skip');
const SKIP = new Set(si > 0 ? (process.argv[si + 1] || '').split(',').filter(Boolean) : []);
const files = fs.readdirSync(DIR).filter(f => /^p.*\.html$/.test(f)).sort();

const hidden = new Set();
const parts = files.map(f => {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8');
  const m = src.match(/<section class="panel[^"]*" id="([^"]+)"/);
  const stub = !!m && ((src.includes(STUB) && src.length < 2000) || SKIP.has(m[1]));
  if(stub) hidden.add(m[1]);
  return {f, src, stub};
});

const header = parts.find(p => p.f === 'p02_header.html');
const tabRe = /      <button class="tab"[^\n]*data-tab="([^"]+)"[^\n]*<\/span>(?:\d+ · )?([^<]*)<\/button>\r?\n/g;
const order = [], title = {};
for(const m of header.src.matchAll(tabRe)){ order.push(m[1]); title[m[1]] = m[2].trim(); }

const target = id => {
  let i = order.indexOf(id);
  while(i >= 0 && i < order.length && hidden.has(order[i])) i++;
  return i >= 0 && i < order.length ? order[i] : null;
};

header.src = header.src.replace(tabRe, (line, id) => hidden.has(id) ? '' : line);
let n = 0;
header.src = header.src.replace(/(<span class="dot"><\/span>)\d+( · )/g, (m, a, b) => a + (n++) + b);

const outside = (html, fn) => html.split(/(<script>[\s\S]*?<\/script>)/).map(
  (chunk, i) => i % 2 ? chunk : fn(chunk)).join('');

let rerouted = 0, disabled = 0;
const out = parts.filter(p => !p.stub).map(p => {
  if(p === header) return p.src;
  return outside(p.src, html => html
    .replace(/(<div class="nextbar">\s*<div><b>Дальше →<\/b>) <span class="sub">[\s\S]*?<\/span><\/div>\s*<button data-goto="([^"]+)">[^<]*<\/button>/g,
      (m, head, id) => {
        if(!hidden.has(id)) return m;
        const t = target(id); if(!t) return m;
        rerouted++;
        return head + ' <span class="sub">следующий раздел — «' + title[t] + '»</span></div>\n    <button data-goto="' + t + '">К разделу «' + title[t] + '»</button>';
      })
    .replace(/(<button[^>]*?)data-goto="([^"]+)"/g, (m, b, id) => {
      if(!hidden.has(id)) return m;
      disabled++;
      return b + 'data-goto="' + id + '" title="Раздел скоро появится"';
    }));
}).join('').replace('</body>', `<script>
/* ссылки на разделы, которые ещё готовятся: подсказка вместо тишины */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-goto]'); if(!b) return;
  if(document.querySelector('.tab[data-tab="' + b.dataset.goto + '"]')) return;
  let t = document.getElementById('soon-toast');
  if(!t){ t = document.createElement('div'); t.id = 'soon-toast';
    t.style.cssText = 'position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:50;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:10px;padding:10px 16px;box-shadow:var(--shadow);font:500 14px var(--sans)';
    document.body.appendChild(t); }
  t.textContent = 'Этот раздел скоро появится';
  t.style.display = 'block';
  clearTimeout(t._h); t._h = setTimeout(() => { t.style.display = 'none'; }, 2200);
});
</script>
</body>`);

fs.writeFileSync(path.join(__dirname, 'index.html'), out);
console.log('разделов в сборке:', order.length - hidden.size, 'из', order.length);
console.log('скрыты (готовятся):', [...hidden].join(', ') || '—');
console.log('«Дальше» перенаправлено:', rerouted, '· ссылок отключено:', disabled);
console.log('built:', Buffer.byteLength(out), 'bytes');
