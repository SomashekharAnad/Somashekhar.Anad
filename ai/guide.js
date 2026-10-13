/* "Sam" – animated guide who walks visitors through the portfolio.
   Features: page tours with spotlight, scroll narration, eyes follow cursor, waving/pointing/talking,
   optional voice (Web Speech API) and Q&A from on-page data. Nothing is sent to any server. */
(function(){
 const P=window.PORTFOLIO||{};const base=document.body.dataset.base||'';
 const MAN="<svg class=\"g-man\" viewBox=\"0 0 120 170\" role=\"img\" aria-label=\"Guide character, click to talk\">\n<defs>\n <linearGradient id=\"gShirt\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#1f2229\"/><stop offset=\"1\" stop-color=\"#111318\"/></linearGradient>\n <linearGradient id=\"gSkin\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#c98d63\"/><stop offset=\"1\" stop-color=\"#b07650\"/></linearGradient>\n <linearGradient id=\"gTab\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#0b1020\"/><stop offset=\"1\" stop-color=\"#1e293b\"/></linearGradient>\n</defs>\n<ellipse cx=\"60\" cy=\"165\" rx=\"34\" ry=\"4\" fill=\"rgba(0,0,0,.25)\"/>\n<g class=\"torso\">\n <rect x=\"44\" y=\"138\" width=\"13\" height=\"26\" rx=\"5\" fill=\"#1e293b\"/><rect x=\"63\" y=\"138\" width=\"13\" height=\"26\" rx=\"5\" fill=\"#1e293b\"/>\n <path d=\"M34 100 Q36 86 50 84 L70 84 Q84 86 86 100 L88 142 Q60 148 32 142 Z\" fill=\"url(#gShirt)\"/>\n <path d=\"M52 84 L60 96 L68 84\" fill=\"#f8fafc\"/>\n <path d=\"M58 88 L62 88 L64 112 L60 118 L56 112 Z\" fill=\"#7c8cff\"/><path d=\"M60 96 L60 140\" stroke=\"rgba(255,255,255,.35)\" stroke-width=\"1.2\"/>\n <rect x=\"64\" y=\"104\" width=\"12\" height=\"15\" rx=\"2\" fill=\"#f8fafc\" opacity=\".9\"/><rect x=\"66\" y=\"108\" width=\"8\" height=\"2\" fill=\"#4cc9f0\"/><rect x=\"66\" y=\"112\" width=\"6\" height=\"2\" fill=\"#94a3b8\"/>\n <path d=\"M60 96 L70 104\" stroke=\"#f8fafc\" stroke-width=\"1\" opacity=\".6\"/>\n <g class=\"arm-l\"><path d=\"M36 98 Q26 112 30 128\" stroke=\"url(#gShirt)\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/>\n  <rect x=\"22\" y=\"118\" width=\"22\" height=\"28\" rx=\"3\" fill=\"url(#gTab)\" stroke=\"#7c8cff\" stroke-width=\"1.2\" transform=\"rotate(-12 33 132)\"/>\n  <path d=\"M27 136 l4-4 3 3 5-7\" stroke=\"#7c8cff\" stroke-width=\"1.4\" fill=\"none\" transform=\"rotate(-12 33 132)\"/>\n  <circle cx=\"34\" cy=\"128\" r=\"4.5\" fill=\"url(#gSkin)\"/></g>\n <g class=\"arm-r\"><path d=\"M84 98 Q92 114 88 128\" stroke=\"url(#gShirt)\" stroke-width=\"11\" stroke-linecap=\"round\" fill=\"none\"/><circle cx=\"88\" cy=\"131\" r=\"5\" fill=\"url(#gSkin)\"/></g>\n</g>\n<g class=\"head\">\n <rect x=\"54\" y=\"72\" width=\"12\" height=\"14\" rx=\"4\" fill=\"#b07650\"/>\n <ellipse cx=\"60\" cy=\"52\" rx=\"21\" ry=\"24\" fill=\"url(#gSkin)\"/>\n <ellipse cx=\"39.5\" cy=\"54\" rx=\"3.5\" ry=\"5.5\" fill=\"#b07650\"/><ellipse cx=\"80.5\" cy=\"54\" rx=\"3.5\" ry=\"5.5\" fill=\"#b07650\"/>\n <path d=\"M38 48 Q36 24 60 24 Q84 24 82 48 Q80 36 70 34 Q60 40 48 34 Q40 38 38 48Z\" fill=\"#1a1a1a\"/>\n <path d=\"M44 66 Q60 80 76 66 Q76 74 60 77 Q44 74 44 66Z\" fill=\"#1a1a1a\" opacity=\".85\"/>\n <path d=\"M47 44 q5 -3 10 0\" stroke=\"#1a1a1a\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M63 44 q5 -3 10 0\" stroke=\"#1a1a1a\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\"/>\n <g class=\"eyes\"><ellipse cx=\"52\" cy=\"51\" rx=\"4.2\" ry=\"4.6\" fill=\"#fff\"/><ellipse cx=\"68\" cy=\"51\" rx=\"4.2\" ry=\"4.6\" fill=\"#fff\"/>\n  <g class=\"pupils\"><circle cx=\"52\" cy=\"51.5\" r=\"2.3\" fill=\"#1a1a1a\"/><circle cx=\"68\" cy=\"51.5\" r=\"2.3\" fill=\"#1a1a1a\"/><circle cx=\"52.8\" cy=\"50.6\" r=\".7\" fill=\"#fff\"/><circle cx=\"68.8\" cy=\"50.6\" r=\".7\" fill=\"#fff\"/></g>\n  <ellipse class=\"lid\" cx=\"52\" cy=\"51\" rx=\"4.6\" ry=\"5\" fill=\"#b9805a\"/><ellipse class=\"lid\" cx=\"68\" cy=\"51\" rx=\"4.6\" ry=\"5\" fill=\"#b9805a\"/></g>\n <rect x=\"45\" y=\"46\" width=\"14\" height=\"10\" rx=\"4\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1.4\"/><rect x=\"61\" y=\"46\" width=\"14\" height=\"10\" rx=\"4\" fill=\"none\" stroke=\"#0f172a\" stroke-width=\"1.4\"/><path d=\"M59 50 h2\" stroke=\"#0f172a\" stroke-width=\"1.4\"/>\n <path d=\"M58 55 q2 4 4 0\" stroke=\"#8a5a3c\" stroke-width=\"1.3\" fill=\"none\"/>\n <path class=\"mouth-s\" d=\"M53 64 Q60 69 67 64\" stroke=\"#6b2f1d\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>\n <ellipse class=\"mouth-o\" cx=\"60\" cy=\"65.5\" rx=\"4\" ry=\"3\" fill=\"#6b2f1d\"/>\n</g>\n</svg>";
 const page=document.body.dataset.page||'home';
 const intro={home:`Hi, I'm Sam, your guide. This is ${P.name}'s portfolio. He's an Industrial IoT and automation engineer. Want a quick tour?`,
  about:`This is the About page: profile, skills and education.`,experience:`Here's the career timeline, from internship to ABB Edgenius IoT.`,
  projects:`These are case studies. Use the filters or search, and open any card for details.`,certifications:`At the top is his verified ABB ReliaQuote Small Project Specialist badge. Below it are his hands-on competencies.`,
  blog:`Short field notes on protocols, DCS upgrades and IIoT testing.`,contact:`Want to get in touch? Phone, email and a quick form are here.`,
  dashboard:`A live-style dashboard: skill radar, project mix and a simulated protocol monitor.`,resume:`A print-ready resume. Use the button to save it as PDF.`,
  project:`This is a case study. Scroll for the challenge, approach and outcome.`,cert:`Details for this competency.`,downloads:`Resume PDF, contact card and data downloads.`,code:`How this site is built.`};
 const wrap=document.createElement('div');wrap.id='guide';
 wrap.innerHTML=MAN+`<div class="g-bubble" role="status" aria-live="polite">
  <div class="g-name"><span>Sam · Guide</span><span><button class="g-voice" title="Voice on/off" aria-label="Toggle voice">🔇</button><button class="g-min" title="Hide" aria-label="Hide guide">–</button></span></div>
  <div class="g-text"></div>
  <div class="g-ctrl"></div>
  <div class="g-chips"></div>
  <form class="g-ask"><input placeholder="Ask me anything about Somashekhar…" aria-label="Ask the guide"><button>Ask</button></form></div>`;
 document.body.appendChild(wrap);
 const man=wrap.querySelector('.g-man'),txt=wrap.querySelector('.g-text'),ctrl=wrap.querySelector('.g-ctrl'),chips=wrap.querySelector('.g-chips');
 let voice=localStorage.getItem('g-voice')==='1',typing=null,mode='idle',steps=[],idx=0,spot=null;
 const vb=wrap.querySelector('.g-voice');const setV=()=>vb.textContent=voice?'🔊':'🔇';setV();
 vb.onclick=()=>{voice=!voice;localStorage.setItem('g-voice',voice?'1':'0');setV();if(!voice)speechSynthesis?.cancel();};
 wrap.querySelector('.g-min').onclick=()=>{wrap.classList.add('min');clearSpot();mode='idle';localStorage.setItem('g-min','1');};
 man.addEventListener('click',()=>{if(wrap.classList.contains('min')){wrap.classList.remove('min');localStorage.removeItem('g-min');greet();}else{act('wave');say(pick(['Need a hand? Try the tour or ask me a question.','Click "Tour" and I will walk you through this page.','You can ask me about skills, projects or contact details.']));}});

 // eyes follow pointer
 const pupils=man.querySelector('.pupils');
 addEventListener('pointermove',e=>{const r=man.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height*.3;const a=Math.atan2(e.clientY-cy,e.clientX-cx),d=Math.min(1.6,Math.hypot(e.clientX-cx,e.clientY-cy)/120);
  pupils.setAttribute('transform',`translate(${Math.cos(a)*d} ${Math.sin(a)*d})`);},{passive:true});

 const pick=a=>a[Math.floor(Math.random()*a.length)];
 function act(c){man.classList.remove('wave','nod');void man.offsetWidth;man.classList.add(c);setTimeout(()=>man.classList.remove(c),2400);}
 function say(html,opts={}){
  clearTimeout(typing);man.classList.add('talk');
  const plain=html.replace(/<[^>]+>/g,'');let i=0;txt.innerHTML='';
  if(voice&&'speechSynthesis' in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(plain);u.rate=1.02;u.pitch=1;const v=speechSynthesis.getVoices().find(v=>/en(-|_)(IN|GB|US)/.test(v.lang)&&/male|David|Ravi|Daniel|Guy/i.test(v.name))||speechSynthesis.getVoices().find(v=>v.lang.startsWith('en'));if(v)u.voice=v;u.onend=()=>man.classList.remove('talk');speechSynthesis.speak(u);}
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){txt.innerHTML=html;man.classList.remove('talk');return;}
  (function type(){i+=2;txt.textContent=plain.slice(0,i);if(i<plain.length)typing=setTimeout(type,16);else{txt.innerHTML=html;if(!voice)man.classList.remove('talk');}})();
 }
 function buttons(list){ctrl.innerHTML='';list.forEach(([label,fn,pri])=>{const b=document.createElement('button');b.textContent=label;if(pri)b.className='pri';b.onclick=fn;ctrl.appendChild(b);});}
 function clearSpot(){if(spot){spot.classList.remove('g-spot');spot=null;}man.classList.remove('point');}

 // tour
 function collect(){steps=[...document.querySelectorAll('[data-guide]')].sort((a,b)=>(+a.dataset.step||0)-(+b.dataset.step||0));}
 function tour(i){collect();if(!steps.length){say('This page is short. Just scroll and explore.');return;}
  mode='tour';idx=Math.max(0,Math.min(i,steps.length-1));const el=steps[idx];clearSpot();spot=el;
  el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>{el.classList.add('g-spot');man.classList.add('point');},350);
  say(el.dataset.guide);
  buttons([['‹ Back',()=>tour(idx-1)],[idx===steps.length-1?'Finish ✓':'Next ›',()=>idx===steps.length-1?endTour():tour(idx+1),true],['Stop',endTour]]);
  const s=document.createElement('span');s.className='g-step';s.textContent=`${idx+1} / ${steps.length}`;ctrl.appendChild(s);chips.innerHTML='';}
 function endTour(){clearSpot();mode='idle';act('nod');
  const next={home:['experience.html','Experience'],experience:['projects.html','Projects'],projects:['certifications.html','Certifications'],about:['experience.html','Experience'],certifications:['blog.html','Insights'],blog:['contact.html','Contact']}[page];
  say(next?`That's this page. Next, I'd recommend the <a href="${base}${next[0]}">${next[1]}</a> page.`:'That is the tour. Ask me anything, or keep exploring.');idle();}
 function idle(){buttons([['▶ Tour this page',()=>tour(0),true],['Go to…',menu]]);
  chips.innerHTML=['Current role','Key skills','NTPC projects','How to contact'].map(c=>`<button>${c}</button>`).join('');}
 function menu(){const L=[['index.html','Home'],['about.html','About'],['experience.html','Experience'],['projects.html','Projects'],['certifications.html','Certifications'],['blog.html','Insights'],['dashboard/index.html','Dashboard'],['contact.html','Contact']];
  say('Where would you like to go? '+L.map(([h,t])=>`<a href="${base}${h}">${t}</a>`).join(' · '));}
 chips.addEventListener('click',e=>{if(e.target.tagName==='BUTTON')answer(e.target.textContent);});
 wrap.querySelector('.g-ask').addEventListener('submit',e=>{e.preventDefault();const i=e.target.querySelector('input');if(i.value.trim()){answer(i.value.trim());i.value='';}});

 // knowledge
 const K=[];
 (P.experience||[]).forEach(x=>K.push({k:(x.role+' '+x.company+' '+x.tags.join(' ')+' '+x.points.join(' ')+' current role job work').toLowerCase(),a:`<b>${x.role}</b> at ${x.company}. ${x.points.slice(0,3).join('; ')}. <a href="${base}experience.html">See timeline</a>`,w:x.period==='Current'?1:0}));
 (P.projects||[]).forEach(x=>K.push({k:(x.title+' '+x.cat+' '+x.stack.join(' ')+' '+x.summary+' project').toLowerCase(),a:`<b>${x.title}</b>: ${x.summary} <a href="${base}projects/${x.slug}.html">Open case study</a>`}));
 (P.skills||[]).forEach(g=>K.push({k:(g.group+' skill skills key '+g.items.map(i=>i[0]).join(' ')).toLowerCase(),a:`<b>${g.group}</b>: ${g.items.map(i=>i[0]).join(', ')}.`}));
 K.push({k:'certification certified certificate credential badge credly reliaquote abb specialist verified quote quoting estimation estimating',a:`<b>ABB Certified ReliaQuote Small Project Specialist</b>, verified on Credly. It covers electrical distribution, ABB products, take-offs and quoting. <a href="${base}certifications/abb-reliaquote-small-project-specialist.html">See credential</a> · <a href="https://www.credly.com/badges/55aab926-018b-4b22-8e56-af446c737d95" target="_blank" rel="noopener">Verify</a>`,w:1});
 K.push({k:'switchgear breaker breakers circuit protection transformer metering nema distribution electrical bidding bid takeoff take-off bom value engineering division 26 salesforce crm procurement',a:`His certified electrical skills include: ${(P.credentialSkills||[]).slice(0,14).join(', ')}, and more. <a href="${base}certifications/abb-reliaquote-small-project-specialist.html">All skills</a>`});
 K.push({k:'contact phone email call reach number mail hire how',a:`Call <a href="tel:${P.phoneRaw}">${P.phone}</a> or <a href="tel:${P.phone2Raw}">${P.phone2}</a>, or email <a href="mailto:${P.email}">${P.email}</a>. The <a href="${base}contact.html">contact page</a> also has a form.`,w:1});
 K.push({k:'education degree college study university qualification engineering vtu',a:(P.education||[]).map(e=>`${e.degree}, ${e.school} (${e.year})`).join('<br>')});
 K.push({k:'language languages speak',a:'He speaks '+(P.languages||[]).join(', ')+'.'});
 K.push({k:'resume cv pdf download',a:`Get the <a href="${base}downloads/Somashekhar_S_Anad_Resume.pdf">PDF resume</a> or open the <a href="${base}resume/index.html">printable version</a>.`});
 K.push({k:'who about summary overview introduce',a:P.summary||''});
 const stop=new Set('the a an of to in on for and or is are what which who how does do his he him me tell about any has have with'.split(' '));
 function answer(q){mode='qa';clearSpot();act('nod');
  const t=q.toLowerCase().replace(/[^a-z0-9+.\s]/g,' ').split(/\s+/).filter(w=>w&&!stop.has(w));
  const r=K.map(c=>({c,s:t.reduce((a,w)=>a+(c.k.includes(w)?(w.length>3?2:1):0),0)+(c.w||0)*.5})).filter(x=>x.s>=1).sort((a,b)=>b.s-a.s);
  say(r.length?r[0].c.a:`I don't know that one yet. You can ask Somashekhar directly at <a href="mailto:${P.email}">${P.email}</a>.`);idle();}

 // scroll narration (when not touring)
 const seen=new Set();
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting&&mode==='idle'&&!wrap.classList.contains('min')&&!seen.has(en.target)&&scrollY>200){seen.add(en.target);say(en.target.dataset.guide);}}),{threshold:.6});
 function greet(){act('wave');say(intro[page]||intro.home);idle();}
 addEventListener('DOMContentLoaded',()=>{});
 setTimeout(()=>{collect();steps.forEach(s=>io.observe(s));
  if(localStorage.getItem('g-min')){wrap.classList.add('min');return;}
  greet();},700);
 addEventListener('keydown',e=>{if(mode!=='tour')return;if(e.key==='ArrowRight')tour(idx+1);if(e.key==='ArrowLeft')tour(idx-1);if(e.key==='Escape')endTour();});
})();
