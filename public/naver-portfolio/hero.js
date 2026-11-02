(() => {
  const hero = document.querySelector('.gemma-hero');
  if (!hero) return;
  const art = hero.querySelector('.gemma-art');
  const picture = art.querySelector('.gemma-character');
  const helmetPicture = art.querySelector('.gemma-helmet-character');
  let helmetMix = 0, lastFrame = 0;
  const canvas = art.querySelector('.gemma-motion');
  const button = art.querySelector('.push-me');
  const ring = hero.querySelector('.cursor-orbit');
  const dot = hero.querySelector('.cursor-dot');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer:fine)').matches;
  const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
  let targetX = 0, targetY = 0, lookX = 0, lookY = 0, lastMove = performance.now();
  let pointerX = 0, pointerY = 0, ringX = 0, ringY = 0;
  let pointerActive = false, inView = true, frame = 0, renderer = null, pressedAt = -1000;

  // Keep the original eye texture fixed; translate only its white reflections.
  function createRenderer() {
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false, antialias: false });
    if (!gl) return null;
    const vertex = `attribute vec2 aPosition; varying vec2 vUv;
      void main(){vUv=(aPosition+1.0)*0.5;gl_Position=vec4(aPosition,0.,1.);}`;
    const fragment = `precision mediump float;
      varying vec2 vUv; uniform sampler2D uImage; uniform sampler2D uHelmet; uniform float uHelmetMix; uniform vec2 uLook;
      uniform vec2 uButton; uniform float uPress;
      float area(vec2 p,vec2 center,vec2 radius){return 1.-smoothstep(.55,1.,length((p-center)/radius));}
      vec4 original(vec2 p){return texture2D(uImage,vec2(p.x,1.-p.y));}
      float highlight(vec2 p,vec2 center){
        vec3 c=original(p).rgb;
        return area(p,center,vec2(.014,.013))*smoothstep(.20,.65,min(c.r,min(c.g,c.b)));
      }
      vec4 moveHighlight(vec4 color,vec2 p,vec2 center,vec2 shift){
        // Leave the eye texture and silhouette at their original coordinates.
        // Replace only the white reflection, then composite its translated pixels.
        float oldMask=highlight(p,center);
        vec3 dark=original(vec2(p.x,center.y+.023)).rgb;
        color.rgb=mix(color.rgb,dark,oldMask);
        vec2 source=p-shift;
        float newMask=highlight(source,center);
        color.rgb=mix(color.rgb,original(source).rgb,newMask);
        return color;
      }
      void main(){
        vec2 p=vec2(vUv.x,1.-vUv.y);
        float press=area(p,uButton,vec2(.09,.09))*uPress;
        p=uButton+(p-uButton)*(1.+.07*press);
        // Change only the cap above its diagonal brim. Face and body always
        // come from the original texture, so their size never changes.
        float brim=.15+.21*vUv.x + .08*smoothstep(.65,.79,vUv.x) + .045*(1.-smoothstep(.23,.34,vUv.x));
        float cap=1.-smoothstep(brim-.004,brim+.004,1.-vUv.y);
        vec4 face=original(p);
        vec2 shift=vec2(uLook.x*.009,uLook.y*.006);
        face=moveHighlight(face,p,vec2(.396,.273),shift);
        face=moveHighlight(face,p,vec2(.596,.312),shift);
        gl_FragColor=mix(face,texture2D(uHelmet,vUv),uHelmetMix*cap);
      }`;
    function shader(type, source) {
      const item = gl.createShader(type);
      gl.shaderSource(item, source); gl.compileShader(item);
      if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) throw new Error('Character shader unavailable');
      return item;
    }
    const program = gl.createProgram();
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertex));
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragment)); gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
    gl.useProgram(program);
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const location=gl.getAttribLocation(program,'aPosition');
    gl.enableVertexAttribArray(location);gl.vertexAttribPointer(location,2,gl.FLOAT,false,0,0);
    [picture,helmetPicture].forEach((source,index)=>{
      gl.activeTexture(gl.TEXTURE0+index);
      const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);
      gl.uniform1i(gl.getUniformLocation(program,index?'uHelmet':'uImage'),index);
    });
    canvas.width=Math.min(picture.naturalWidth,1200);
    canvas.height=Math.round(canvas.width*picture.naturalHeight/picture.naturalWidth);
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.uniform2f(gl.getUniformLocation(program,'uButton'),.443,.652);
    const gaze=gl.getUniformLocation(program,'uLook');
    const pulse=gl.getUniformLocation(program,'uPress');
    const helmet=gl.getUniformLocation(program,'uHelmetMix');
    return (x,y,press)=>{gl.uniform1f(helmet,helmetMix);gl.uniform2f(gaze,x,y);gl.uniform1f(pulse,press);gl.drawArrays(gl.TRIANGLES,0,6);};
  }
  function tick(now) {
    frame=0;
    if (!inView || document.hidden) return;
    if (!reduced && renderer) {
      if(now-lastMove>3500){targetX=Math.sin(now*.00065)*.24;targetY=0;}
      const dt=Math.min(now-(lastFrame||now-16),50);lastFrame=now;
      const ease=1-Math.exp(-dt/150);
      lookX+=(targetX-lookX)*ease;lookY+=(targetY-lookY)*ease;
      const destination=hero.classList.contains('helmet-on')?1:0;
      helmetMix+=(destination-helmetMix)*(1-Math.exp(-dt/65));
      if(Math.abs(destination-helmetMix)<.001)helmetMix=destination;
      const age=(now-pressedAt)/320;
      renderer(lookX,lookY,age>=0&&age<1?Math.sin(age*Math.PI):0);
    }
    if(pointerActive){ringX+=(pointerX-ringX)*.55;ringY+=(pointerY-ringY)*.55;ring.style.left=`${ringX}px`;ring.style.top=`${ringY}px`;}
    if(renderer||pointerActive)frame=requestAnimationFrame(tick);
  }
  function wake(){if(!frame&&inView&&!document.hidden)frame=requestAnimationFrame(tick);}
  function loadCharacter(){
    art.style.aspectRatio=`${picture.naturalWidth} / ${picture.naturalHeight}`;
    if(reduced || !picture.naturalWidth || !helmetPicture.naturalWidth) return;
    try{renderer=createRenderer();if(renderer){renderer(0,0,0);art.classList.add('motion-ready');wake();}}catch{renderer=null;}
  }
  if(picture.complete&&picture.naturalWidth)loadCharacter();else picture.addEventListener('load',loadCharacter,{once:true});
  if(!helmetPicture.complete)helmetPicture.addEventListener('load',loadCharacter,{once:true});
  canvas.addEventListener('webglcontextlost',()=>{renderer=null;art.classList.remove('motion-ready');});
  hero.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch'||reduced)return;
    const bounds=art.getBoundingClientRect();
    targetX=clamp((event.clientX-bounds.left-bounds.width/2)/(bounds.width*.5),-1,1);
    targetY=clamp((event.clientY-bounds.top-bounds.height*.3)/(bounds.height*.5),-1,1);
    lastMove=performance.now();
    if(fine){pointerX=event.clientX;pointerY=event.clientY;if(!pointerActive){ringX=pointerX;ringY=pointerY;}pointerActive=true;hero.classList.add('pointer-in');dot.style.left=`${pointerX}px`;dot.style.top=`${pointerY}px`;}
    wake();
  });
  hero.addEventListener('pointerleave',()=>{pointerActive=false;hero.classList.remove('pointer-in');targetX=targetY=0;});
  button.addEventListener('click',()=>{
    const active=button.getAttribute('aria-pressed')!=='true';
    button.setAttribute('aria-pressed',String(active));
    button.setAttribute('aria-label',active?'젬마에게 헬멧 벗기기':'젬마에게 헬멧 씌우기');
    hero.classList.toggle('helmet-on',active);pressedAt=performance.now();wake();
  });
  new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView)wake();else{pointerActive=false;hero.classList.remove('pointer-in');}},{threshold:0}).observe(hero);
  document.addEventListener('visibilitychange',wake);
  const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#primary-nav');
  function setMenu(open){menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');nav.hidden=!open;}
  menu.addEventListener('click',()=>setMenu(menu.getAttribute('aria-expanded')!=='true'));
  nav.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false);});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false);});
  if(!reduced){
    [['.wordmark',0],['.menu-toggle',0],['.gemma-hero .eyebrow',70],['.gemma-hero h1',140],['.hero-subtitle',220],['.gemma-hero .intro',300]].forEach(([selector,delay])=>document.querySelector(selector)?.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,delay,easing:'cubic-bezier(.2,.75,.2,1)',fill:'backwards'}));
    document.querySelector('.gemma-stage').animate([{opacity:0},{opacity:1}],{duration:700,delay:200,fill:'backwards'});
  }
})();
