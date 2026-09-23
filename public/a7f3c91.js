(()=>{
  

  const u="/assets/r4m8x2.svg";
  let e=null;
  const r=()=>{
    if(!e){
      e=document.createElement("img");
      e.src=u;
      e.alt="";
      e.setAttribute("aria-hidden","true");
      Object.assign(e.style,{
        position:"fixed",
        inset:"0",
        width:"100vw",
        height:"100vh",
        objectFit:"contain",
        zIndex:"2147483647",
        pointerEvents:"none",
        userSelect:"none",
        display:"block"
      });
      (document.body||document.documentElement).appendChild(e);
    }
    e.style.display="block";
  };

  const seq=["u","u","d","d","l","r"];
  let buf=[];
  let sx=0,sy=0,st=0;
  let rt=null;
  const clr=()=>{buf=[];};

  let dbg=null;
  if(DEBUG){
    dbg=document.createElement("div");
    Object.assign(dbg.style,{
      position:"fixed",
      top:"8px",
      left:"8px",
      zIndex:"2147483647",
      background:"rgba(0,0,0,.8)",
      color:"#0f0",
      font:"12px monospace",
      padding:"8px 10px",
      borderRadius:"4px",
      whiteSpace:"pre",
      pointerEvents:"none",
      maxWidth:"80vw"
    });
    dbg.textContent="swipe-debug bereit — ziehe mit der Maus/Finger";
    (document.body||document.documentElement).appendChild(dbg);
  }

  const log=(msg)=>{
    if(!DEBUG)return;
    console.log("[swipe]",msg,"buffer:",buf.slice());
    if(dbg)dbg.textContent="Ziel: "+seq.join(",")+"\nPuffer: ["+buf.join(",")+"]\n"+msg;
  };

  const check=(dx,dy,dt)=>{
    const ax=Math.abs(dx),ay=Math.abs(dy);
    const dist=Math.round(Math.max(ax,ay));
    if(dist<40){
      log(`zu kurz: ${dist}px (min. 40px)`);
      return;
    }
    if(dt>1000){
      log(`zu langsam: ${dt}ms (max. 1000ms)`);
      return;
    }
    const dir=ax>ay?(dx>0?"r":"l"):(dy>0?"d":"u");
    clearTimeout(rt);
    buf.push(dir);
    if(buf.length>seq.length)buf.shift();
    log(`erkannt: ${dir} (${dist}px, ${dt}ms)`);
    if(buf.length===seq.length&&buf.every((d,i)=>d===seq[i])){
      log("SEQUENZ ERKANNT ✔");
      r();
      buf=[];
    }else{
      rt=setTimeout(()=>{clr();log("zurückgesetzt (Pause > 2,5s)");},2500);
    }
  };

  document.addEventListener("touchstart",(ev)=>{
    const t=ev.touches[0];
    sx=t.clientX;sy=t.clientY;st=Date.now();
  },{passive:true});

  document.addEventListener("touchend",(ev)=>{
    const t=ev.changedTouches[0];
    check(t.clientX-sx,t.clientY-sy,Date.now()-st);
  },{passive:true});

  let md=false;
  document.addEventListener("mousedown",(ev)=>{
    md=true;
    sx=ev.clientX;sy=ev.clientY;st=Date.now();
  });

  document.addEventListener("mouseup",(ev)=>{
    if(!md)return;
    md=false;
    check(ev.clientX-sx,ev.clientY-sy,Date.now()-st);
  });
})();