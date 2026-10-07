// Мини-обвязка над Chrome DevTools Protocol: запуск headless Chrome, вкладка, эмуляция, снимки.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
export const SHOTS = 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/shots/';
export const URL = 'file:///E:/arch_trainer/index.html';
const sleep = ms => new Promise(r => setTimeout(r, ms));

export async function launch(port = 9333, profile = 'C:/Users/A4F7~1/AppData/Local/Temp/claude/e--arch-trainer/85752aa2-bc36-4f0a-ace9-812e2c703277/scratchpad/ux/walk/profile') {
  const proc = spawn(CHROME, ['--headless=new', '--hide-scrollbars', `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check',
    '--allow-file-access-from-files', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
  let list;
  for (let i = 0; i < 60; i++) {
    try { list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); if (list.length) break; } catch (e) {}
    await sleep(250);
  }
  const t = list.find(x => x.type === 'page');
  const ws = new WebSocket(t.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 0; const pend = new Map(); const handlers = [];
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(JSON.stringify(m.error))) : p.res(m.result); }
    else if (m.method) handlers.forEach(h => h(m));
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pend.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  const once = name => new Promise(res => { const h = m => { if (m.method === name) { handlers.splice(handlers.indexOf(h), 1); res(m.params); } }; handlers.push(h); });
  await send('Page.enable'); await send('Runtime.enable');
  const logs = [];
  handlers.push(m => { if (m.method === 'Runtime.exceptionThrown') logs.push(m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text); });

  const page = {
    send, logs,
    async viewport(w, h, mobile = false, dsf = 1) {
      await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dsf, mobile });
      await send('Emulation.setTouchEmulationEnabled', { enabled: mobile, maxTouchPoints: mobile ? 5 : 1 });
      if (mobile) await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
      else await send('Emulation.setUserAgentOverride', { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36' });
    },
    async goto(url, wait = 1500) {
      await send('Page.navigate', { url: 'about:blank' }); await sleep(150);
      const l = once('Page.loadEventFired');
      await send('Page.navigate', { url });
      await l; await sleep(wait);
    },
    async eval(expr) {
      const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error('eval: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
      return r.result.value;
    },
    async calm() { // без переходов и анимаций
      await this.eval(`(()=>{const s=document.createElement('style');s.textContent='*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}';document.head.appendChild(s);})()`);
    },
    async theme(t) { await this.eval(`document.documentElement.setAttribute('data-theme','${t}')`); },
    async shot(name, opts = {}) {
      const p = { format: 'png' };
      if (opts.vp) { const v = await this.eval('({x:scrollX,y:scrollY,w:document.documentElement.clientWidth,h:innerHeight})'); p.clip = { x: v.x, y: v.y, width: v.w, height: opts.h || 844, scale: 1 }; p.captureBeyondViewport = true; }
      else if (opts.full || opts.clip) {
        const dims = await this.eval(`({w:document.documentElement.clientWidth,h:Math.max(document.documentElement.scrollHeight,document.body.scrollHeight)})`);
        const clip = opts.clip || { x: 0, y: 0, width: dims.w, height: Math.min(dims.h, opts.maxH || 12000) };
        p.clip = { ...clip, scale: 1 }; p.captureBeyondViewport = true;
      }
      const r = await send('Page.captureScreenshot', p);
      writeFileSync(SHOTS + name + '.png', Buffer.from(r.data, 'base64'));
      console.log('shot', name);
    },
    sleep,
    close() { try { ws.close(); } catch (e) {} proc.kill(); },
  };
  return page;
}
