/* Portfolio behaviour: theme, 3D phone, project tour, lightbox, resume viewer */
(function(){
  var B='https://yamlxgwmwzahovbjpnjc.supabase.co/storage/v1/object/public/projects/',PDF=B+'docs/Boliver_Reynold.pdf';
  var SOCIAL=[['LinkedIn','https://www.linkedin.com/in/reynold-boliver-38065a32a/'],['Facebook','https://www.facebook.com/boliver06/']];
  /* My Roxas phone screens, shown in order. Add or reorder entries here. */
  var SH=['assets/my-roxas/01-home.webp','assets/my-roxas/02-ai-report.webp','assets/my-roxas/03-reports.webp','assets/my-roxas/04-news.webp','assets/my-roxas/05-explore.webp','assets/my-roxas/06-hotlines.webp','assets/my-roxas/07-ask-rox.webp'];
  var G={asan:{t:'Asan',i:['asan_app/asan1.png','asan_app/asn2.png','asan_app/asn3.jpg']},
    lugar:{t:'Lugar',i:['lugar/lugar1.jpg','lugar/lugar2.png','lugar/lugar3.mp4']},
    craw:{t:'Craw set',i:['craw_seth/claw_seth1.jpg','craw_seth/claw_seth2.jpg','craw_seth/claw_seth3.jpg']},
    apx:{t:'APXNEX',i:['apx/apx1.jpg','apx/apx_bom_upload.mp4']}};
  var $=function(s){return document.querySelector(s)},isV=function(p){return /\.mp4$/i.test(p)};
  document.querySelectorAll('[data-soc]').forEach(function(h){SOCIAL.forEach(function(x){var a=document.createElement('a');a.href=x[1];a.target='_blank';a.rel='noopener';a.textContent=x[0];h.appendChild(a)})});

  /* theme with circular reveal */
  var root=document.documentElement,tb=$('#theme'),reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setT(t){root.setAttribute('data-theme',t);tb.setAttribute('aria-checked',t==='dark');try{localStorage.setItem('rb-theme',t)}catch(e){}}
  var st=null;try{st=localStorage.getItem('rb-theme')}catch(e){}
  setT(st||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'));
  tb.onclick=function(){var t=root.getAttribute('data-theme')==='dark'?'light':'dark';
    if(!document.startViewTransition||reduce){setT(t);return}
    var r=tb.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,R=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
    document.startViewTransition(function(){setT(t)}).ready.then(function(){root.animate({clipPath:['circle(0 at '+x+'px '+y+'px)','circle('+R+'px at '+x+'px '+y+'px)']},{duration:700,easing:'ease-in-out',pseudoElement:'::view-transition-new(root)'})}).catch(function(){})};

  /* gallery media */
  function media(p,thumb){var m;if(isV(p)){m=document.createElement('video');m.muted=true;m.playsInline=true;m.preload='metadata';m.src=B+p+'#t=0.1';if(!thumb){m.controls=true;m.autoplay=true}}
    else{m=document.createElement('img');m.referrerPolicy='no-referrer';m.alt='';m.decoding='async';m.src=B+p;if(thumb)m.loading='lazy'}
    m.onerror=function(){m.style.visibility='hidden'};return m}

  /* project tour (My Roxas is pinned above, so it is not listed here) */
  var T=[
   {k:'deya',n:'Deya',s:'Live on Google Play',d:'Freelance app. I handled the release, from Play Console setup and closed testing to production approval.',t:['Play Console','Closed testing','Release management'],u:'https://play.google.com/store/apps/details?id=com.deya.expo&hl=en',pk:'com.deya.expo'},
   {k:'asan',n:'Asan',s:'Commission · 2026',d:'Mobile app for drills and emergencies at Rizal National High School.',t:['Flutter','Supabase']},
   {k:'lugar',n:'Lugar',s:'Commission · 2025',d:'Mobile app and management dashboard for buses on the Pontevedra to Roxas routes, with passenger stop requests.',t:['Flutter','Supabase','Dashboard']},
   {k:'craw',n:'Craw set',s:'Commission · 2025',d:'Water monitoring on Arduino and Raspberry Pi sensors, with a web dashboard, a Flutter app and email alerts.',t:['Python','Arduino','Flutter','Firebase']},
   {k:'apx',n:'APXNEX',s:'Project',d:'Construction management with materials tracking, a bill-of-materials Excel upload and review flow, and a map view.',t:['Flutter','BLoC','Supabase','OpenStreetMap']}];
  var tour=$('#tour'),stage=$('#tstage'),rail=$('#trail'),tps=[],pad=function(n){return(n<10?'0':'')+n};
  tour.style.setProperty('--n',T.length);
  T.forEach(function(x,i){var a=document.createElement('article');a.className='tp';
    a.innerHTML='<div class="tt"><div class="mono lv">'+x.s+'</div><div class="big0">'+pad(i+2)+'<small> / '+pad(T.length+1)+'</small></div><h3>'+x.n+'</h3><p>'+x.d+'</p><div class="tags">'+x.t.map(function(t){return'<span>'+t+'</span>'}).join('')+'</div><div class="cta flex flex-wrap gap-2"></div></div><div class="tv"></div>';
    var cta=a.querySelector('.cta'),tv=a.querySelector('.tv'),g=G[x.k];
    if(x.u){var l=document.createElement('a');l.className='btn p';l.href=x.u;l.target='_blank';l.rel='noopener';l.textContent='View on Google Play';cta.appendChild(l)}
    if(g){var b=document.createElement('button');b.className='btn';b.type='button';b.textContent='Open gallery ('+g.i.length+')';b.onclick=function(){openG(x.k,0)};cta.appendChild(b);
      var im=g.i.filter(function(p){return!isV(p)}).slice(0,3);im.forEach(function(p,j){var f=document.createElement('button');f.type='button';f.className='fr';f.style.setProperty('--k',j-(im.length-1)/2);f.setAttribute('aria-label',x.n+' screenshot');f.appendChild(media(p,1));f.onclick=function(){openG(x.k,g.i.indexOf(p))};tv.appendChild(f)})}
    else tv.innerHTML='<div class="dyb">'+x.n[0]+'<small>'+x.pk+'</small></div>';
    stage.appendChild(a);tps.push(a);
    var d=document.createElement('button');d.type='button';d.setAttribute('aria-label','Go to '+x.n);d.onclick=function(){scrollTo({top:scrollY+tour.getBoundingClientRect().top-56+((i+.5)/T.length)*(tour.offsetHeight-stage.offsetHeight),behavior:'smooth'})};rail.appendChild(d)});
  function upd(){var r=tour.getBoundingClientRect();if(r.bottom<-300||r.top>innerHeight+300)return;var rg=(tour.offsetHeight-stage.offsetHeight)||1,pr=Math.max(0,Math.min(.9999,(56-r.top)/rg)),f=pr*T.length,i=Math.floor(f);
    tps.forEach(function(a,j){a.classList.toggle('act',j===i);a.classList.toggle('prev',j<i)});tps[i].style.setProperty('--p',(f-i).toFixed(3));
    rail.querySelectorAll('button').forEach(function(b,j){b.classList.toggle('on',j===i)})}

  /* My Roxas 3D phone */
  var rw=$('#rwrap'),rp=$('#rp'),fa=$('#rfa'),fb=$('#rfb'),gl=$('#rgl'),rtx=[].slice.call(document.querySelectorAll('.rtx')),rtr=$('#rtr'),ri=-1,front=fa,RN=rtx.length;
  var shot=function(i){return SH[Math.min(i,SH.length-1)]};
  [-9,-6,-3,0,3,6].forEach(function(z){var m=document.createElement('div');m.className='rm';m.style.transform='translateZ('+z+'px)';rp.insertBefore(m,rp.firstChild)});
  fa.referrerPolicy=fb.referrerPolicy='no-referrer';fa.src=shot(0);fa.classList.add('on');(window.requestIdleCallback||setTimeout)(function(){SH.forEach(function(s){new Image().src=s})},1200);
  rtx.forEach(function(x,i){var d=document.createElement('button');d.type='button';d.setAttribute('aria-label','Feature '+(i+1));d.onclick=function(){scrollTo({top:scrollY+rw.getBoundingClientRect().top+(i/(RN-1))*(rw.offsetHeight-innerHeight),behavior:'smooth'})};rtr.appendChild(d)});
  function roll(){var r=rw.getBoundingClientRect();if(r.bottom<-300||r.top>innerHeight+300)return;var pr=Math.max(0,Math.min(1,-r.top/((rw.offsetHeight-innerHeight)||1))),ai=Math.round(pr*(RN-1));
    rp.style.transform='rotateX(5deg) rotateY('+(-22+pr*34)+'deg)';gl.style.transform='translateX('+(pr*160-80)+'%)';
    if(ai!==ri){ri=ai;var nx=front===fa?fb:fa;nx.src=shot(ai);nx.classList.add('on');front.classList.remove('on');front=nx;
      rtx.forEach(function(e,j){e.classList.toggle('on',j===ai)});rtr.querySelectorAll('button').forEach(function(e,j){e.classList.toggle('on',j===ai)})}}

  /* lightbox */
  var lb=$('#lb'),cur,idx;
  function show(i){var g=G[cur];idx=(i+g.i.length)%g.i.length;var h=$('#lbm');h.innerHTML='';h.appendChild(media(g.i[idx],0));$('#lbc').textContent=(idx+1)+' / '+g.i.length;document.querySelectorAll('#lbt button').forEach(function(b,j){b.classList.toggle('on',j===idx)})}
  function openG(k,i){cur=k;$('#lbn').textContent=G[k].t;var t=$('#lbt');t.innerHTML='';G[k].i.forEach(function(p,j){var b=document.createElement('button');b.type='button';b.appendChild(media(p,1));b.onclick=function(){show(j)};t.appendChild(b)});lb.showModal();show(i)}
  $('#lbp').onclick=function(){show(idx-1)};$('#lbnx').onclick=function(){show(idx+1)};$('#lbx').onclick=function(){lb.close()};
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.id==='lbm'||e.target.classList.contains('stage'))lb.close()});
  lb.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)});
  lb.addEventListener('close',function(){$('#lbm').innerHTML=''});

  /* resume */
  var DL=PDF+'?download=Boliver_Reynold.pdf',dlg=$('#rv'),box=$('#pages'),zoom=1,doc=null;
  $('#dl').href=DL;$('#dl2').href=DL;$('#nt').href=PDF;
  function lib(){return new Promise(function(ok,no){if(window.pdfjsLib)return ok();var s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';s.onload=ok;s.onerror=no;document.head.appendChild(s)}).then(function(){pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'})}
  function get(){return doc||(doc=lib().then(function(){return pdfjsLib.getDocument(PDF).promise}))}
  function draw(pdf,n,w){return pdf.getPage(n).then(function(pg){var d=Math.min(devicePixelRatio||1,2),s=w/pg.getViewport({scale:1}).width,v=pg.getViewport({scale:s*d}),c=document.createElement('canvas');c.width=v.width;c.height=v.height;c.style.width=w+'px';c.style.height=v.height/d+'px';return pg.render({canvasContext:c.getContext('2d'),viewport:v}).promise.then(function(){return c})})}
  var failed=function(){box.innerHTML='<div class="msg">The preview could not load here.<br><br><a class="btn p" href="'+PDF+'" target="_blank" rel="noopener">Open the PDF</a></div>'};
  function full(){get().then(function(pdf){$('#pg').textContent=pdf.numPages+' page'+(pdf.numPages>1?'s':'');var w=Math.min(box.clientWidth-32,880)*zoom,f=document.createDocumentFragment(),p=Promise.resolve();
    for(var n=1;n<=pdf.numPages;n++)(function(n){p=p.then(function(){return draw(pdf,n,w)}).then(function(c){f.appendChild(c)})})(n);
    return p.then(function(){box.innerHTML='';box.appendChild(f)})}).catch(failed)}
  function openR(){dlg.showModal();document.body.style.overflow='hidden';zoom=1;full()}
  document.querySelectorAll('[data-resume]').forEach(function(b){b.onclick=openR});$('#pv').onclick=openR;$('#pv').onkeydown=function(e){if(e.key==='Enter')openR()};
  $('#zi').onclick=function(){zoom=Math.min(zoom+.25,2.5);full()};$('#zo').onclick=function(){zoom=Math.max(zoom-.25,.5);full()};
  $('#x').onclick=function(){dlg.close()};dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});dlg.addEventListener('close',function(){document.body.style.overflow=''});

  /* progress bar, counters, rotating headline */
  var bar=$('#bar');function sp(){var h=document.documentElement;bar.style.transform='scaleX('+(h.scrollTop/((h.scrollHeight-h.clientHeight)||1))+')'}addEventListener('scroll',sp,{passive:true});sp();
  setTimeout(function(){document.querySelectorAll('[data-n]').forEach(function(b){b.textContent=b.dataset.n+(b.dataset.s||'')})},4000);
  if(!reduce){
    var W=['Apps that ship.','Play Store releases.','Clean architecture.'],wi=0,rot=$('#rot');rot.style.transition='opacity .35s,transform .35s';
    setInterval(function(){rot.style.opacity=0;rot.style.transform='translateY(8px)';setTimeout(function(){wi=(wi+1)%W.length;rot.textContent=W[wi];rot.style.transform='translateY(-8px)';requestAnimationFrame(function(){requestAnimationFrame(function(){rot.style.opacity=1;rot.style.transform='none'})})},350)},3200);
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);var el=e.target,n=+el.dataset.n,sf=el.dataset.s||'',t0=performance.now();(function f(t){var p=Math.min((t-t0)/900,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)))+sf;if(p<1)requestAnimationFrame(f)})(t0)})});
      document.querySelectorAll('[data-n]').forEach(function(b){b.textContent='0'+(b.dataset.s||'');io.observe(b)})}
  }
  (function(){var h=$('.hero h1'),d=0;[].slice.call(h.childNodes).forEach(function(n){if(n.nodeType===3){var f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(function(w){if(!w)return;if(/^\s+$/.test(w))f.appendChild(document.createTextNode(w));else{var sp=document.createElement('span');sp.className='w1';sp.style.setProperty('--d',d++);sp.textContent=w;f.appendChild(sp)}});h.replaceChild(f,n)}else if(n.nodeType===1){n.classList.add('w1');n.style.setProperty('--d',d++)}})})();
  var fl=$('#fill'),fw=[];(function(){var t=fl.textContent.trim().split(/\s+/);fl.innerHTML='';t.forEach(function(w,i){var sp=document.createElement('span');sp.textContent=w;fl.appendChild(sp);fw.push(sp);if(i<t.length-1)fl.appendChild(document.createTextNode(' '))})})();
  function tick(){try{$('#clk').textContent=new Intl.DateTimeFormat('en-US',{hour:'numeric',minute:'2-digit',timeZone:'Asia/Manila'}).format(new Date())}catch(e){}}tick();setInterval(tick,15000);

  /* scroll driver */
  var tk=false;function sc(){var y=scrollY;upd();roll();$('.nav').classList.toggle('sc',y>20);
    var cur='';['work','experience','skills','resume'].forEach(function(id){if($('#'+id).getBoundingClientRect().top<innerHeight*.4)cur=id});
    document.querySelectorAll('.links a,.mnav a').forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)});
    var ac=$('.links a.on'),ind=$('.ind');if(ind){if(ac){ind.style.opacity=1;ind.style.left=ac.offsetLeft+'px';ind.style.width=ac.offsetWidth+'px'}else ind.style.opacity=0}
    var fr=fl.getBoundingClientRect(),pg=Math.max(0,Math.min(1,(innerHeight*.88-fr.top)/(innerHeight*.45))),kk=Math.round(pg*fw.length);fw.forEach(function(w,i){w.classList.toggle('on',i<kk)});tk=false}
  addEventListener('scroll',function(){if(!tk){tk=true;requestAnimationFrame(sc)}},{passive:true});addEventListener('resize',sc);sc();
  function preview(){get().then(function(pdf){return draw(pdf,1,420)}).then(function(c){var v=$('#pv');v.innerHTML='';v.appendChild(c)}).catch(function(){$('#pv').textContent='Click to open resume'})}
  if('IntersectionObserver' in window){var po=new IntersectionObserver(function(es){if(es[0].isIntersecting){po.disconnect();preview()}},{rootMargin:'600px'});po.observe($('#resume'))}else addEventListener('load',preview);
})();
