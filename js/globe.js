/* Globe: canvas 2D renderer, no libraries.
   Fibonacci-sphere dots shaded by depth, great-circle data arcs with travelling pulses,
   atmosphere rim, drag-to-rotate with inertia. Resizes with zoom and container changes. */
(function(){
 const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const col=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
 const rgb=h=>{h=h.replace('#','');if(h.length===3)h=[...h].map(c=>c+c).join('');const n=parseInt(h,16);return[(n>>16)&255,(n>>8)&255,n&255]};
 function rotate(p,ax,ay){let c=Math.cos(ay),s=Math.sin(ay);let x=p[0]*c-p[2]*s,z=p[0]*s+p[2]*c,y=p[1];c=Math.cos(ax);s=Math.sin(ax);return[x,y*c-z*s,y*s+z*c];}
 function slerp(a,b,t){const d=Math.acos(Math.max(-1,Math.min(1,a[0]*b[0]+a[1]*b[1]+a[2]*b[2])));if(d<1e-4)return a;const s=Math.sin(d),k1=Math.sin((1-t)*d)/s,k2=Math.sin(t*d)/s;return[a[0]*k1+b[0]*k2,a[1]*k1+b[1]*k2,a[2]*k1+b[2]*k2];}
 function globe(cv,opt={}){
  const ctx=cv.getContext('2d');let W=0,H=0,dpr=1,Rr=0,cx=0,cy=0;
  const N=opt.dots||(innerWidth<640?900:1600),pts=[],gold=Math.PI*(3-Math.sqrt(5));
  for(let i=0;i<N;i++){const y=1-(i/(N-1))*2,r=Math.sqrt(1-y*y),t=gold*i;pts.push([Math.cos(t)*r,y,Math.sin(t)*r]);}
  // hubs: pseudo-random but stable
  let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const hubs=Array.from({length:14},()=>{const u=rnd()*2-1,a=rnd()*Math.PI*2,r=Math.sqrt(1-u*u);return[Math.cos(a)*r,u*.8,Math.sin(a)*r];});
  const arcs=[];for(let i=0;i<hubs.length;i++){arcs.push({a:hubs[i],b:hubs[(i*5+3)%hubs.length],o:rnd(),sp:.15+rnd()*.2});}
  let ax=-.32,ay=.6,vy=RM?0:.0022,vx=0,drag=false,lx=0,ly=0,t=0,visible=true;
  function size(){const r=cv.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);W=cv.width=Math.max(1,r.width*dpr);H=cv.height=Math.max(1,r.height*dpr);Rr=Math.min(W*.42,H*(opt.scale||.48));cx=W/2;cy=H*(opt.cy||.56);if(RM)draw();}
  size();addEventListener('resize',size);if(window.ResizeObserver)new ResizeObserver(size).observe(cv);
  if(window.IntersectionObserver)new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(visible&&!RM)requestAnimationFrame(loop);}).observe(cv);
  cv.addEventListener('pointerdown',e=>{drag=true;lx=e.clientX;ly=e.clientY;cv.setPointerCapture(e.pointerId);});
  addEventListener('pointerup',()=>drag=false);
  cv.addEventListener('pointermove',e=>{if(!drag)return;vy=(e.clientX-lx)*.004;vx=(e.clientY-ly)*.002;lx=e.clientX;ly=e.clientY;});
  const P=p=>{const f=2.6/(2.6+p[2]);return[cx+p[0]*Rr*f,cy+p[1]*Rr*f,f];};
  function draw(){
   const A=rgb(col('--accent')||'#7c8cff'),B=rgb(col('--accent-2')||'#4cc9f0'),T=rgb(col('--text')||'#f7f8f8');
   ctx.clearRect(0,0,W,H);
   // atmosphere
   let g=ctx.createRadialGradient(cx,cy,Rr*.85,cx,cy,Rr*1.25);g.addColorStop(0,`rgba(${A},.22)`);g.addColorStop(1,`rgba(${A},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,Rr*1.25,0,7);ctx.fill();
   g=ctx.createRadialGradient(cx-Rr*.3,cy-Rr*.4,Rr*.1,cx,cy,Rr);g.addColorStop(0,`rgba(${A},.10)`);g.addColorStop(1,'rgba(0,0,0,.0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,Rr,0,7);ctx.fill();
   ctx.strokeStyle=`rgba(${A},.35)`;ctx.lineWidth=1*dpr;ctx.beginPath();ctx.arc(cx,cy,Rr*1.002,0,7);ctx.stroke();
   // dots
   for(const p of pts){const r=rotate(p,ax,ay);if(r[2]>.15)continue;const q=P(r),f=Math.min(1,(-r[2]+.15)/1.15);
    ctx.fillStyle=`rgba(${T},${(.08+.62*f).toFixed(3)})`;const s=(.7+f*1.1)*dpr;ctx.fillRect(q[0]-s/2,q[1]-s/2,s,s);}
   // arcs
   for(const a of arcs){ctx.beginPath();let first=true,pulse=null;const k=(t*a.sp+a.o)%1;
    for(let i=0;i<=40;i++){const u=i/40;let p=slerp(a.a,a.b,u);const lift=1+.22*Math.sin(Math.PI*u);p=[p[0]*lift,p[1]*lift,p[2]*lift];const r=rotate(p,ax,ay);const q=P(r);
     if(r[2]>.35){first=true;continue;}first?ctx.moveTo(q[0],q[1]):ctx.lineTo(q[0],q[1]);first=false;if(Math.abs(u-k)<.013)pulse=q;}
    ctx.strokeStyle=`rgba(${A},.45)`;ctx.lineWidth=1.1*dpr;ctx.stroke();
    if(pulse){ctx.fillStyle=`rgb(${B})`;ctx.shadowColor=`rgb(${B})`;ctx.shadowBlur=14*dpr;ctx.beginPath();ctx.arc(pulse[0],pulse[1],2.4*dpr,0,7);ctx.fill();ctx.shadowBlur=0;}}
   // hubs
   for(const h of hubs){const r=rotate(h,ax,ay);if(r[2]>.1)continue;const q=P(r);const pul=(Math.sin(t*2.2+h[0]*9)+1)/2;
    ctx.strokeStyle=`rgba(${B},${.25+.35*(1-pul)})`;ctx.lineWidth=1*dpr;ctx.beginPath();ctx.arc(q[0],q[1],(3+pul*7)*dpr,0,7);ctx.stroke();
    ctx.fillStyle=`rgb(${B})`;ctx.beginPath();ctx.arc(q[0],q[1],2.2*dpr,0,7);ctx.fill();}
  }
  function loop(){if(!visible)return;t+=.016;ay+=vy;ax+=vx;if(!drag){vy+=(.0022-vy)*.03;vx*=.92;ax+=(-.32-ax)*.03;}draw();requestAnimationFrame(loop);}
  if(RM)draw();else loop();
 }
 window.Globe=globe;
 addEventListener('DOMContentLoaded',()=>{const h=document.getElementById('globe');if(h)globe(h);
  document.querySelectorAll('canvas[data-globe]').forEach(c=>globe(c,{dots:700,scale:.62,cy:.62}));});
})();
