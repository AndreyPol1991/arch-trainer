const fs=require('fs');
const {JSDOM, VirtualConsole}=require('E:/gym_db_trainer_teacher/src/node_modules/jsdom');
const html=fs.readFileSync('index.html','utf8');
const errors=[];
const vc=new VirtualConsole();
vc.on('jsdomError',e=>{const m=(e.stack||e.message||'');if(/scrollTo|scrollIntoView|Not implemented/.test(m))return;errors.push('jsdomError: '+m);});
vc.on('error',(...a)=>errors.push('console.error: '+a.join(' ')));
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc,url:'http://localhost/'});
const w=dom.window, d=w.document;
w.Element.prototype.scrollIntoView=function(){};
w.HTMLElement.prototype.scrollIntoView=function(){};
w.HTMLCanvasElement.prototype.getContext=()=>({clearRect(){},save(){},translate(){},rotate(){},fillRect(){},restore(){},set fillStyle(v){}});
setTimeout(()=>{
  const tabs=[...d.querySelectorAll('.tab')];
  console.log('tabs found:',tabs.length);
  tabs.forEach(t=>{ try{t.click();}catch(e){errors.push('tab '+t.dataset.tab+': '+e.message);} });
  // click every button in every panel
  let clicks=0;
  [...d.querySelectorAll('.panel')].forEach(p=>{
    [...p.querySelectorAll('button, .rb, .pcard, .numitem, .cell[data-i], [data-i], [data-kill], tr.exp')].forEach(b=>{
      try{ b.click(); clicks++; }catch(e){ errors.push('click in #'+p.id+' ('+(b.textContent||'').slice(0,30)+'): '+e.message); }
    });
    [...p.querySelectorAll('input[type=range], input[type=number], select, input[type=search]')].forEach(i=>{
      try{
        if(i.type==='range'||i.type==='number'){ i.value=i.max||'5'; }
        else if(i.tagName==='SELECT'&&i.options.length>1){ i.selectedIndex=1; }
        else { i.value='а'; }
        i.dispatchEvent(new w.Event('input',{bubbles:true}));
        i.dispatchEvent(new w.Event('change',{bubbles:true}));
      }catch(e){ errors.push('input in #'+p.id+': '+e.message); }
    });
  });
  console.log('clicks:',clicks);
  // second pass after state changes
  [...d.querySelectorAll('.panel button')].forEach(b=>{ try{b.click();}catch(e){errors.push('2nd pass: '+e.message);} });
  setTimeout(()=>{
    console.log('--- errors:',errors.length);
    errors.slice(0,25).forEach(e=>console.log(e.split('\n').slice(0,3).join('\n')));
    process.exit(errors.length?1:0);
  },2500);
},400);
