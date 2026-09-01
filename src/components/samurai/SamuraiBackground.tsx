"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";
import { useTheme } from "@/components/theme/ThemeProvider";

type Slash={x1:number;y1:number;x2:number;y2:number;age:number};
type Spark={x:number;y:number;vx:number;vy:number;life:number;max:number};
type Scar={x1:number;y1:number;x2:number;y2:number;alpha:number};

export default function SamuraiBackground(){
  const ref=useRef<HTMLCanvasElement>(null);const reduced=useReducedMotion();const{mode}=useTheme();
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;
    const light=mode==="light",dojoInner=light?"#eee6d7":"#15100f",dojoOuter=light?"#d7ccb8":"#070606",blade=light?"#3a1712":"#fff6ed",dustColor=light?"rgba(80,62,48,.11)":"rgba(225,205,185,.10)",accent=light?"#8d2e20":"#bd432e";
    const dpr=Math.min(window.devicePixelRatio||1,2);let width=0,height=0,raf=0,running=true,nextIdle=performance.now()+9000+Math.random()*5000;const slashes:Slash[]=[],sparks:Spark[]=[],scars:Scar[]=[],dust:{x:number;y:number;vx:number;vy:number;r:number}[]=[];const starts=new Map<number,{x:number;y:number}>();
    const seedDust=()=>{dust.length=0;for(let i=0;i<(width<600?15:28);i++)dust.push({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.08,vy:-.025-Math.random()*.055,r:.35+Math.random()*.9});};
    const resize=()=>{width=window.innerWidth;height=window.innerHeight;canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;ctx.setTransform(dpr,0,0,dpr,0,0);seedDust();};
    const endpoints=(cx:number,cy:number,angle:number)=>{const len=Math.hypot(width,height)*.72,dx=Math.cos(angle)*len,dy=Math.sin(angle)*len;return{x1:cx-dx,y1:cy-dy,x2:cx+dx,y2:cy+dy};};
    const spawnSlash=(sx:number,sy:number,ex:number,ey:number,ambient=false)=>{let dx=ex-sx,dy=ey-sy;if(Math.hypot(dx,dy)<18){dx=ambient?width*.22:width*.16;dy=ambient?-height*.18:height*.13;}const angle=Math.atan2(dy,dx),midX=(sx+ex)/2,midY=(sy+ey)/2,line=endpoints(midX,midY,angle);slashes.push({...line,age:0});const perp=angle+Math.PI/2;for(let i=0;i<(ambient?6:12);i++){const dir=perp+(Math.random()-.5)*.9,speed=.8+Math.random()*2.8;sparks.push({x:midX+(Math.random()-.5)*30,y:midY+(Math.random()-.5)*20,vx:Math.cos(dir)*speed,vy:Math.sin(dir)*speed,life:0,max:22+Math.random()*22});}};
    const interactive=(event:PointerEvent)=>Boolean((event.target as Element|null)?.closest?.("a,button,input,textarea,select,summary,[role='dialog']"));
    const onPointerDown=(event:PointerEvent)=>{if(interactive(event)||reduced)return;starts.set(event.pointerId,{x:event.clientX,y:event.clientY});};
    const onPointerUp=(event:PointerEvent)=>{const start=starts.get(event.pointerId);if(!start)return;starts.delete(event.pointerId);spawnSlash(start.x,start.y,event.clientX,event.clientY);nextIdle=performance.now()+10000+Math.random()*6000;};
    const onPointerCancel=(event:PointerEvent)=>starts.delete(event.pointerId);
    window.addEventListener("pointerdown",onPointerDown,{passive:true});window.addEventListener("pointerup",onPointerUp,{passive:true});window.addEventListener("pointercancel",onPointerCancel,{passive:true});
    const drawBase=()=>{const g=ctx.createRadialGradient(width*.48,height*.34,0,width*.5,height*.5,Math.max(width,height)*.85);g.addColorStop(0,dojoInner);g.addColorStop(1,dojoOuter);ctx.fillStyle=g;ctx.fillRect(0,0,width,height);ctx.strokeStyle=light?"rgba(100,65,45,.045)":"rgba(190,70,50,.035)";ctx.lineWidth=1;for(let x=130;x<width;x+=150){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke();}};
    const drawScar=(scar:Scar)=>{ctx.globalAlpha=scar.alpha;ctx.strokeStyle=accent;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(scar.x1,scar.y1);ctx.lineTo(scar.x2,scar.y2);ctx.stroke();ctx.globalAlpha=1;};
    const drawSlash=(slash:Slash)=>{const draw=Math.min(1,slash.age/4),fade=Math.max(0,1-(slash.age-5)/34),ex=slash.x1+(slash.x2-slash.x1)*draw,ey=slash.y1+(slash.y2-slash.y1)*draw;ctx.save();ctx.globalAlpha=fade;ctx.strokeStyle=blade;ctx.lineWidth=1.8;ctx.shadowColor=accent;ctx.shadowBlur=16;ctx.beginPath();ctx.moveTo(slash.x1,slash.y1);ctx.lineTo(ex,ey);ctx.stroke();ctx.shadowBlur=0;ctx.globalAlpha=fade*.32;ctx.strokeStyle=accent;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(slash.x1,slash.y1);ctx.lineTo(ex,ey);ctx.stroke();ctx.globalAlpha=fade*.12;ctx.strokeStyle=blade;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(slash.x1+4,slash.y1+3);ctx.lineTo(ex+4,ey+3);ctx.stroke();ctx.restore();};
    const frame=(now:number)=>{drawBase();scars.forEach(drawScar);ctx.fillStyle=dustColor;for(const d of dust){d.x+=d.vx;d.y+=d.vy;if(d.y<-3){d.y=height+3;d.x=Math.random()*width;}ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();}
      if(!reduced&&now>nextIdle&&slashes.length===0){const sx=width*(.3+Math.random()*.25),sy=height*(.32+Math.random()*.32);spawnSlash(sx,sy,sx+width*.16,sy-height*.13,true);nextIdle=now+11000+Math.random()*7000;}
      for(let i=slashes.length-1;i>=0;i--){const s=slashes[i];s.age++;drawSlash(s);if(s.age===6){scars.push({x1:s.x1,y1:s.y1,x2:s.x2,y2:s.y2,alpha:light?.08:.11});if(scars.length>6)scars.shift();}if(s.age>40)slashes.splice(i,1);}
      for(let i=sparks.length-1;i>=0;i--){const p=sparks[i];p.life++;p.x+=p.vx;p.y+=p.vy;p.vy+=.035;p.vx*=.985;const alpha=1-p.life/p.max;if(alpha<=0){sparks.splice(i,1);continue;}ctx.globalAlpha=alpha*.7;ctx.fillStyle=Math.random()<.4?blade:accent;ctx.beginPath();ctx.arc(p.x,p.y,.5+1.1*alpha,0,Math.PI*2);ctx.fill();ctx.globalAlpha=1;}
      if(running&&!reduced)raf=requestAnimationFrame(frame);};
    resize();if(reduced){drawBase();const a=endpoints(width*.48,height*.44,-.55),b=endpoints(width*.62,height*.64,.48);scars.push({...a,alpha:light?.08:.11},{...b,alpha:light?.06:.08});scars.forEach(drawScar);}else raf=requestAnimationFrame(frame);
    const onResize=()=>resize();window.addEventListener("resize",onResize);const onVisibility=()=>{running=!document.hidden;if(running&&!reduced)raf=requestAnimationFrame(frame);else cancelAnimationFrame(raf);};document.addEventListener("visibilitychange",onVisibility);
    return()=>{running=false;cancelAnimationFrame(raf);window.removeEventListener("pointerdown",onPointerDown);window.removeEventListener("pointerup",onPointerUp);window.removeEventListener("pointercancel",onPointerCancel);window.removeEventListener("resize",onResize);document.removeEventListener("visibilitychange",onVisibility);};
  },[reduced,mode]);
  return <canvas ref={ref} className="h-full w-full" aria-hidden/>;
}
