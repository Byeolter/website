'use strict';
// User-supplied design, adapted to native HTML templates and dialogs.
const {PROJECTS, CASES} = JSON.parse(document.getElementById('portfolio-data').textContent);
const state = {filter:'all', caseKey:'runtime'};
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const pointerHover = matchMedia('(hover: hover) and (pointer: fine)');
const projectDialog = document.getElementById('project-dialog');
const videoDialog = document.getElementById('video-dialog');
const resolve = (key, values) => key.trim().split('.').reduce((o,k)=>o?.[k],values);
const interpolate = (text, values) => text.replace(/{{\s*([^}]+)\s*}}/g,(_,key)=>String(resolve(key,values)??''));
// Templates contain only the authored design. Bind data as text/attributes, never eval.
function renderTemplate(name, values) {
  const fragment = document.getElementById('template-'+name).content.cloneNode(true);
  function bind(parent, scope) {
    for(const node of [...parent.childNodes]) {
      if(node.nodeType === Node.TEXT_NODE) { node.textContent=interpolate(node.textContent,scope); continue; }
      if(node.nodeType !== Node.ELEMENT_NODE) continue;
      if(node.tagName==='SC-FOR') {
        const list=resolve(node.getAttribute('list').replace(/[{}]/g,''),scope)||[];
        const rendered=document.createDocumentFragment();
        for(const item of list) {
          const group=document.createDocumentFragment();
          for(const child of node.childNodes) group.append(child.cloneNode(true));
          bind(group,{...scope,[node.getAttribute('as')]:item}); rendered.append(group);
        }
        node.replaceWith(rendered); continue;
      }
      if(node.tagName==='SC-IF') {
        if(resolve(node.getAttribute('value').replace(/[{}]/g,''),scope)) {
          const group=document.createDocumentFragment();group.append(...node.childNodes);bind(group,scope);node.replaceWith(group);
        } else node.remove();
        continue;
      }
      for(const attribute of [...node.attributes]) node.setAttribute(attribute.name,interpolate(attribute.value,scope));
      bind(node,scope);
    }
  }
  bind(fragment,values);return fragment;
}
function projectValues(p,i=0) {
  return {...p,top:`${88+i*24}px`,game:!p.product,product:!!p.product,video:!!p.video,
    mediaBg:p.product?'var(--color-surface)':'var(--color-text)',imgW:p.product?'auto':'100%',
    artLine1:p.art?.[0],artLine2:p.art?.[1],open:'open:'+p.id,watch:'watch:'+p.id,
    meta:[['기간',p.period],['역할',p.role],['기술',p.stack]].map(([k,v],i)=>({k,v,border:i?'2px solid var(--color-text)':'0'})),
    links:p.links.map(([label,url])=>({label,url}))};
}
function setFilter(key) {
  if(!['all','game','product'].includes(key)) return;
  state.filter=key;
  const projects=PROJECTS.filter(p=>key==='all'||p.cat===key);
  document.getElementById('project-list').replaceChildren(renderTemplate('projects',{visibleProjects:projects.map(projectValues)}));
  document.querySelectorAll('#project-filters [data-action]').forEach(button=>{
    const active=button.dataset.action==='filter:'+key;
    button.setAttribute('aria-pressed',String(active));button.style.background=active?'var(--color-text)':'transparent';button.style.color=active?'var(--color-bg)':'var(--color-text)';
  });
}
function setCase(key, focus=false) {
  const c=CASES[key];if(!c) return;state.caseKey=key;
  document.getElementById('case-panel').setAttribute('aria-labelledby','case-tab-'+Object.keys(CASES).indexOf(key));
  document.querySelectorAll('#case-tabs [role=tab]').forEach(button=>{
    const active=button.dataset.action==='case:'+key;
    button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;
    button.style.background=active?'var(--color-text)':'transparent';button.style.color=active?'var(--color-bg)':'var(--color-text)';
    if(active&&focus)button.focus();
  });
  const activeCase={...c,foot1:c.foot[0],foot2:c.foot[1],nodes:c.nodes.map((text,i)=>({text,step:`STEP 0${i+1}`,bg:i===1?'var(--color-accent)':'var(--color-bg)',fg:'var(--color-text)',border:i?'2px solid var(--color-text)':'0'}))};
  document.getElementById('case-panel').replaceChildren(renderTemplate('panel',{activeCase}));
}
function updateScrollLock(){document.body.classList.toggle('modal-open',projectDialog.open||videoDialog.open);}
function openProject(id){
  const p=PROJECTS.find(p=>p.id===id);if(!p)return;
  projectDialog.replaceChildren(renderTemplate('project',{sel:projectValues(p),closeDialog:'close-project'}));
  projectDialog.showModal();updateScrollLock();
}
function watchProject(id){
  const p=PROJECTS.find(p=>p.id===id);if(!p?.video)return;
  videoDialog.replaceChildren(renderTemplate('video',{videoTitle:p.title+' — 시연 영상',videoSrc:`https://www.youtube-nocookie.com/embed/${p.video}?autoplay=1&rel=0`,videoLink:`https://www.youtube.com/watch?v=${p.video}`,closeVideo:'close-video'}));
  videoDialog.showModal();updateScrollLock();
}
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button)return;
  const [action,id]=button.dataset.action.split(':');
  if(action==='filter')setFilter(id);
  if(action==='case')setCase(id);
  if(action==='open')openProject(id);
  if(action==='watch')watchProject(id);
  if(action==='close-project')projectDialog.close();
  if(action==='close-video')videoDialog.close();
});
for(const dialog of [projectDialog,videoDialog]){
  let pressedBackdrop=false;
  dialog.addEventListener('pointerdown',e=>{pressedBackdrop=e.target===dialog;});
  dialog.addEventListener('click',e=>{if(pressedBackdrop&&e.target===dialog)dialog.close();pressedBackdrop=false;});
  dialog.addEventListener('close',()=>{if(dialog===videoDialog)videoDialog.replaceChildren();updateScrollLock();});
}
const tabs=[...document.querySelectorAll('#case-tabs [role=tab]')];
tabs.forEach((tab,i)=>{tab.id='case-tab-'+i;tab.setAttribute('aria-controls','case-panel');tab.tabIndex=i===0?0:-1;});
document.getElementById('case-panel').setAttribute('aria-labelledby','case-tab-0');
document.getElementById('case-tabs').addEventListener('keydown',event=>{
  const keys=['ArrowDown','ArrowRight','ArrowUp','ArrowLeft','Home','End'];if(!keys.includes(event.key))return;event.preventDefault();
  const current=Object.keys(CASES).indexOf(state.caseKey);
  const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(current+(event.key==='ArrowDown'||event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  setCase(Object.keys(CASES)[next],true);document.getElementById('case-panel').setAttribute('aria-labelledby','case-tab-'+next);
});
// Keep all content visible without JavaScript or when reduced motion is requested.
if(!reducedMotion.matches){
  document.querySelectorAll('[data-intro]').forEach(el=>el.animate([{opacity:0,transform:'translateY(28px)'},{opacity:1,transform:'none'}],{duration:700,delay:Number(el.dataset.intro)*100,easing:'ease-out'}));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'none'}],{duration:650,easing:'ease-out'});observer.unobserve(entry.target);}}),{threshold:0.08});
  document.querySelectorAll('[data-fade]').forEach(el=>observer.observe(el));
}
const row1=document.getElementById('marquee-one'),row2=document.getElementById('marquee-two'),reveal=document.getElementById('journey-reveal');
let scheduled=false;
function tick(){
  scheduled=false;const vh=innerHeight;
  if(row1&&row2&&!reducedMotion.matches){const off=(vh-row1.parentElement.getBoundingClientRect().top)*0.3;row1.style.transform=`translateX(${off-600}px)`;row2.style.transform=`translateX(${-off-200}px)`;}
  const chars=reveal?.querySelectorAll('[data-ch]')||[],r=reveal?.getBoundingClientRect();
  const progress=reducedMotion.matches||!r?1:Math.min(1,Math.max(0,(vh*.9-r.top)/(r.height+vh*.3)));
  chars.forEach((c,i)=>{c.style.opacity=i<progress*chars.length?'1':'.3';});
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(tick);}}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reducedMotion.addEventListener('change',schedule);tick();
// A restrained pointer response matches the reference without moving the page layout.
const magnet=document.getElementById('hero-magnet');
magnet?.addEventListener('pointermove',event=>{
  if(reducedMotion.matches||!pointerHover.matches)return;
  const r=magnet.getBoundingClientRect();magnet.style.transform=`translate(${(event.clientX-r.left-r.width/2)/35}px, ${(event.clientY-r.top-r.height/2)/35}px)`;
});
magnet?.addEventListener('pointerleave',()=>{magnet.style.transform='';});
