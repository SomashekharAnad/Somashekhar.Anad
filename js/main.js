/* Site interactions: theme, header, reveal, counters, spotlight cards, filters, contact,
   command palette (Ctrl/Cmd+K), mobile drawer, tab bar and contact sheet. */
(function(){
 const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)],root=document.documentElement;
 try{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t;}catch(e){}
 window.toast=m=>{let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t);}t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2200);};
 const IC={home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  work:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
  career:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 6h16M4 12h16M4 18h10"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 19z"/></svg>',
  save:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'};
 window.ICONS=IC;

 document.addEventListener('DOMContentLoaded',()=>{
  const B=document.body,base=B.dataset.base||'',P=window.PORTFOLIO||{};
  // theme
  const tb=$('#theme');const setI=()=>{if(tb)tb.textContent=root.dataset.theme==='light'?'☾':'☀';};setI();
  document.addEventListener('click',e=>{
   if(e.target.closest('#theme')){const t=root.dataset.theme==='light'?'dark':'light';root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(_){}setI();}
   const c=e.target.closest('[data-copy]');if(c&&navigator.clipboard)navigator.clipboard.writeText(c.dataset.copy).then(()=>toast('Copied '+c.dataset.copy));
  });
  // header + progress + top
  const hd=$('header.site'),pg=$('#progress'),tp=$('#top');
  const onS=()=>{const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;hd&&hd.classList.toggle('scrolled',y>8);if(pg)pg.style.width=(h>0?y/h*100:0)+'%';tp&&tp.classList.toggle('show',y>700);};
  onS();addEventListener('scroll',onS,{passive:true});
  // reveal, counters, meters
  const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;const el=en.target;el.classList.add('in');
   if(el.dataset.count!==undefined){const end=parseFloat(el.dataset.count),dec=(el.dataset.count.split('.')[1]||'').length,suf=el.dataset.suffix||'';let s0=null;
    const st=ts=>{s0=s0||ts;const k=Math.min((ts-s0)/1200,1);el.textContent=(end*(1-Math.pow(1-k,3))).toFixed(dec)+suf;if(k<1)requestAnimationFrame(st);};requestAnimationFrame(st);}
   $$('.meter span',el).forEach(m=>m.style.width=m.dataset.w+'%');io.unobserve(el);}),{threshold:.15,rootMargin:'0px 0px -5% 0px'});
  $$('.reveal,[data-count],.meters').forEach(el=>io.observe(el));
  // spotlight
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){document.addEventListener('pointermove',e=>{const c=e.target.closest('.card');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');},{passive:true});}
  // filters
  const seg=$('.seg');if(seg){let cat='All',q='';const ap=()=>$$('[data-cat]').forEach(c=>{c.style.display=(cat==='All'||c.dataset.cat===cat)&&(!q||c.textContent.toLowerCase().includes(q))?'':'none';});
   seg.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('button',seg).forEach(x=>x.classList.remove('on'));b.classList.add('on');cat=b.dataset.f;ap();});
   const s=$('.search');s&&s.addEventListener('input',()=>{q=s.value.toLowerCase().trim();ap();});}
  // contact form
  const f=$('#contact-form');f&&f.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f);
   const body=`Name: ${d.get('name')}\nEmail: ${d.get('email')}\nCompany: ${d.get('company')||'-'}\n\n${d.get('message')}`;
   location.href=`mailto:${f.dataset.to}?subject=${encodeURIComponent('[Portfolio] '+d.get('topic'))}&body=${encodeURIComponent(body)}`;toast('Opening your email app');});
  // clock
  const ck=$$('[data-clock]');if(ck.length){const u=()=>{const t=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Asia/Kolkata',hour12:false}).format(new Date());ck.forEach(c=>c.textContent=t);};u();setInterval(u,1000);}

  // command palette
  const items=[['Home','index.html','Page'],['About','about.html','Page'],['Experience','experience.html','Page'],['Projects','projects.html','Page'],['Certifications','certifications.html','Page'],['Insights','blog.html','Page'],['Dashboard','dashboard/index.html','Page'],['Contact','contact.html','Page'],['Resume','resume/index.html','Page'],['Download resume (PDF)','downloads/Somashekhar_S_Anad_Resume.pdf','File']]
   .concat((P.projects||[]).map(p=>[p.title,'projects/'+p.slug+'.html','Project'])).concat((P.blog||[]).map(b=>[b.title,'blog.html#'+b.slug,'Article']))
   .concat([['Email '+P.email,'mailto:'+P.email,'Action'],['Call '+P.phone,'tel:'+P.phoneRaw,'Action'],['Call '+P.phone2,'tel:'+P.phone2Raw,'Action'],['Toggle theme','#theme','Action']]);
  B.insertAdjacentHTML('beforeend',`<div class="cmdk-back" role="dialog" aria-label="Command menu"><div class="cmdk"><input placeholder="Type a command or search…" aria-label="Search"><ul></ul><div class="foot-k"><span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div></div></div>`);
  const kb=$('.cmdk-back'),ki=$('input',kb),ul=$('ul',kb);let sel=0,list=items;
  const href=i=>/^(mailto|tel|#)/.test(i[1])?i[1]:base+i[1];
  const render=()=>{ul.innerHTML=list.map((it,i)=>`<li class="${i===sel?'sel':''}"><a href="${href(it)}">${it[0]}<small>${it[2]}</small></a></li>`).join('');const s=$('.sel',ul);s&&s.scrollIntoView({block:'nearest'});};
  const open=()=>{kb.classList.add('on');ki.value='';list=items;sel=0;render();setTimeout(()=>ki.focus(),20);},close=()=>kb.classList.remove('on');
  ki.addEventListener('input',()=>{const q=ki.value.toLowerCase();list=items.filter(i=>(i[0]+' '+i[2]).toLowerCase().includes(q));sel=0;render();});
  kb.addEventListener('click',e=>{if(e.target===kb)close();const a=e.target.closest('a');if(a&&a.getAttribute('href')==='#theme'){e.preventDefault();$('#theme').click();close();}});
  $$('.kbd-btn').forEach(b=>b.addEventListener('click',open));
  addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();kb.classList.contains('on')?close():open();return;}
   if(e.key==='Escape'){close();closeD();closeS();}
   if(!kb.classList.contains('on'))return;
   if(e.key==='ArrowDown'){sel=Math.min(sel+1,list.length-1);render();e.preventDefault();}
   if(e.key==='ArrowUp'){sel=Math.max(sel-1,0);render();e.preventDefault();}
   if(e.key==='Enter'){const a=$('.sel a',ul);a&&a.click();}});

  // mobile drawer
  const L=[['index.html','Home'],['about.html','About'],['experience.html','Experience'],['projects.html','Projects'],['certifications.html','Certifications'],['blog.html','Insights'],['dashboard/index.html','Dashboard'],['contact.html','Contact'],['resume/index.html','Resume']];
  const cur=B.dataset.nav||'';
  B.insertAdjacentHTML('beforeend',`<div class="drawer" role="dialog" aria-modal="true" aria-label="Menu"><div class="top"><a class="brand" href="${base}index.html"><span class="logo">SA</span>Somashekhar S. Anad</a><button class="icon-btn d-close" aria-label="Close menu">✕</button></div>
   <nav>${L.map(([h,t],i)=>`<a href="${base}${h}" class="${cur===h?'active':''}">${t}<small>0${i+1}</small></a>`).join('')}</nav>
   <div class="contact"><a class="btn btn-primary" href="tel:${P.phoneRaw}">Call ${P.phone}</a><a class="btn btn-ghost" href="tel:${P.phone2Raw}">Alternate ${P.phone2}</a><a class="btn btn-ghost" href="mailto:${P.email}">${P.email}</a></div></div>`);
  const dr=$('.drawer');const openD=()=>{dr.classList.add('on');B.classList.add('lock');},closeD=()=>{dr.classList.remove('on');B.classList.remove('lock');};
  $$('.burger').forEach(b=>b.addEventListener('click',openD));$('.d-close',dr).addEventListener('click',closeD);

  // tab bar + sheet
  const T=[['index.html','home','Home'],['projects.html','work','Work'],['#','phone','Call'],['experience.html','career','Career'],['contact.html','mail','Contact']];
  B.insertAdjacentHTML('beforeend',`<nav class="tabbar" aria-label="Quick navigation">${T.map(([h,i,t])=>h==='#'?`<button class="call" aria-label="Call or email"><span class="c">${IC[i]}</span>${t}</button>`:`<a href="${base}${h}" class="${cur===h?'on':''}">${IC[i]}${t}</a>`).join('')}</nav>
   <div class="scrim"></div><div class="sheet" role="dialog" aria-label="Contact options"><div class="grab"></div>
   <a href="tel:${P.phoneRaw}"><span class="icon">${IC.phone}</span><span>Call<small>${P.phone}</small></span></a>
   <a href="tel:${P.phone2Raw}"><span class="icon">${IC.phone}</span><span>Call alternate<small>${P.phone2}</small></span></a>
   <a href="https://wa.me/${(P.phoneRaw||'').replace('+','')}" target="_blank" rel="noopener"><span class="icon">${IC.wa}</span><span>WhatsApp<small>${P.phone}</small></span></a>
   <a href="mailto:${P.email}"><span class="icon">${IC.mail}</span><span>Email<small>${P.email}</small></span></a>
   <a href="${base}downloads/somashekhar-anad.vcf" download><span class="icon">${IC.save}</span><span>Save contact<small>vCard</small></span></a></div>`);
  const sh=$('.sheet'),sc=$('.scrim');const openS=()=>{sh.classList.add('on');sc.classList.add('on');},closeS=()=>{sh.classList.remove('on');sc.classList.remove('on');};
  $('.tabbar .call').addEventListener('click',openS);sc.addEventListener('click',closeS);
  let sy=0;sh.addEventListener('touchstart',e=>sy=e.touches[0].clientY,{passive:true});sh.addEventListener('touchend',e=>{if(e.changedTouches[0].clientY-sy>50)closeS();});
  const bar=$('.tabbar');let ly=scrollY;addEventListener('scroll',()=>{const y=scrollY;if(y>ly+6&&y>240)bar.classList.add('hide');else if(y<ly-6)bar.classList.remove('hide');ly=y;},{passive:true});
  addEventListener('resize',()=>{if(innerWidth>1080)closeD();if(innerWidth>640)closeS();});
 });
 if('serviceWorker' in navigator&&location.protocol.startsWith('http'))addEventListener('load',()=>navigator.serviceWorker.register((document.body.dataset.base||'')+'sw.js').catch(()=>{}));
})();
