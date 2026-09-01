"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";
import { useTheme } from "@/components/theme/ThemeProvider";

type Point = { x: number; y: number; pressure: number };

export default function CalligraphyBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const { mode } = useTheme();

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const light = mode === "light";
    const paper = light ? "244,240,231" : "10,12,14";
    const ink = light ? "29,25,21" : "239,233,221";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width=0,height=0,raf=0,running=true,idleFrames=400,active=false;
    let previous: Point | null=null;
    let previousAngle=0;

    const drawPaper = (alpha=1) => {
      ctx.fillStyle=`rgba(${paper},${alpha})`;ctx.fillRect(0,0,width,height);
      ctx.globalAlpha=light?0.08:0.04;ctx.strokeStyle=light?"#6f6251":"#d9d0c0";ctx.lineWidth=0.5;
      for(let i=0;i<10;i++){const y=(i*97+37)%Math.max(height,1);ctx.beginPath();ctx.moveTo(0,y);ctx.bezierCurveTo(width*.3,y+2,width*.68,y-2,width,y+1);ctx.stroke();}
      ctx.globalAlpha=1;
    };
    const resize=()=>{width=window.innerWidth;height=window.innerHeight;canvas.width=Math.floor(width*dpr);canvas.height=Math.floor(height*dpr);canvas.style.width=`${width}px`;canvas.style.height=`${height}px`;ctx.setTransform(dpr,0,0,dpr,0,0);drawPaper();};

    const pool=(p:Point,size:number,alpha:number)=>{const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,size);g.addColorStop(0,`rgba(${ink},${alpha})`);g.addColorStop(1,`rgba(${ink},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,size,0,Math.PI*2);ctx.fill();};
    const splatter=(p:Point,speed:number)=>{const count=Math.min(8,2+Math.floor(speed/7));for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2;const r=8+Math.random()*Math.min(38,speed*1.7);const dot=0.5+Math.random()*1.8;ctx.fillStyle=`rgba(${ink},${0.16+Math.random()*0.22})`;ctx.beginPath();ctx.arc(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,dot,0,Math.PI*2);ctx.fill();}};
    const brushSegment=(a:Point,b:Point,ghost=false)=>{
      const dx=b.x-a.x,dy=b.y-a.y,speed=Math.hypot(dx,dy);if(speed<0.1)return;
      const angle=Math.atan2(dy,dx);const pressure=Math.max(0.18,b.pressure||0.45);const base=Math.max(2.2,17*pressure-speed*0.18);
      const nx=-dy/speed,ny=dx/speed;
      // Wet edge feathering sits below the bristles.
      ctx.strokeStyle=`rgba(${ink},${ghost?0.08:0.12})`;ctx.lineWidth=base*1.7;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      // Separated bristles create dry gaps instead of a digital marker line.
      const bristles=7;
      for(let i=0;i<bristles;i++){
        if(speed>11&&Math.random()<0.22)continue;
        const offset=((i/(bristles-1))-.5)*base*0.92+(Math.random()-.5)*1.1;
        const wobble=(Math.random()-.5)*0.8;
        ctx.strokeStyle=`rgba(${ink},${ghost?0.12:0.34+Math.random()*0.22})`;ctx.lineWidth=Math.max(.6,base/bristles*(0.55+Math.random()*.8));ctx.beginPath();ctx.moveTo(a.x+nx*offset,a.y+ny*offset);ctx.lineTo(b.x+nx*offset+nx*wobble,b.y+ny*offset+ny*wobble);ctx.stroke();
      }
      if(!ghost&&speed<2.2)pool(b,base*1.2,0.18*pressure);
      let turn=Math.abs(angle-previousAngle);if(turn>Math.PI)turn=Math.PI*2-turn;
      if(!ghost&&(speed>18||turn>0.85))splatter(b,speed);
      previousAngle=angle;
    };

    const interactive=(event:PointerEvent)=>Boolean((event.target as Element|null)?.closest?.("a,button,input,textarea,select,summary,[role='dialog']"));
    const onDown=(event:PointerEvent)=>{if(interactive(event))return;active=true;idleFrames=0;previous={x:event.clientX,y:event.clientY,pressure:event.pressure||0.45};};
    const onMove=(event:PointerEvent)=>{if(!active||!previous)return;const next={x:event.clientX,y:event.clientY,pressure:event.pressure||previous.pressure||0.45};brushSegment(previous,next);previous=next;idleFrames=0;};
    const end=(event:PointerEvent)=>{if(!active||!previous)return;const endPoint={x:event.clientX,y:event.clientY,pressure:0.12};brushSegment(previous,endPoint);pool(endPoint,4,0.08);active=false;previous=null;idleFrames=0;};
    window.addEventListener("pointerdown",onDown,{passive:true});window.addEventListener("pointermove",onMove,{passive:true});window.addEventListener("pointerup",end,{passive:true});window.addEventListener("pointercancel",end,{passive:true});

    const paths = () => {const cx=width*.5,cy=height*.48,s=Math.min(width,height)*.3;return [
      [{x:cx-s*.9,y:cy-s*.5,pressure:.55},{x:cx-s*.25,y:cy-s*.68,pressure:.8},{x:cx+s*.08,y:cy-s*.12,pressure:.7},{x:cx-s*.08,y:cy+s*.5,pressure:.35}],
      [{x:cx-s*.65,y:cy+s*.5,pressure:.5},{x:cx,y:cy+s*.15,pressure:.85},{x:cx+s*.32,y:cy-s*.45,pressure:.65},{x:cx+s*.88,y:cy-s*.58,pressure:.24}],
    ];};
    const lerpPoint=(points:Point[],t:number)=>{const scaled=t*(points.length-1),i=Math.min(points.length-2,Math.floor(scaled)),u=scaled-i,a=points[i],b=points[i+1];return{x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u,pressure:a.pressure+(b.pressure-a.pressure)*u};};
    let ghostIndex=0,ghostT=0,ghostPrev:Point|null=null;
    const frame=()=>{
      ctx.fillStyle=`rgba(${paper},0.012)`;ctx.fillRect(0,0,width,height);idleFrames++;
      if(!reduced&&!active&&idleFrames>300){const path=paths()[ghostIndex];if(!ghostPrev)ghostPrev=lerpPoint(path,0);ghostT+=0.0048;const next=lerpPoint(path,Math.min(1,ghostT));brushSegment(ghostPrev,next,true);ghostPrev=next;if(ghostT>=1){ghostT=0;ghostPrev=null;ghostIndex=(ghostIndex+1)%2;idleFrames=150;}}
      if(running)raf=requestAnimationFrame(frame);
    };
    resize();
    if(reduced){for(const path of paths()){let prev=lerpPoint(path,0);for(let t=.02;t<=1;t+=.02){const next=lerpPoint(path,t);brushSegment(prev,next,true);prev=next;}}}else raf=requestAnimationFrame(frame);
    const onResize=()=>resize();window.addEventListener("resize",onResize);
    const onVisibility=()=>{running=!document.hidden;if(running&&!reduced)raf=requestAnimationFrame(frame);else cancelAnimationFrame(raf);};document.addEventListener("visibilitychange",onVisibility);
    return()=>{running=false;cancelAnimationFrame(raf);window.removeEventListener("pointerdown",onDown);window.removeEventListener("pointermove",onMove);window.removeEventListener("pointerup",end);window.removeEventListener("pointercancel",end);window.removeEventListener("resize",onResize);document.removeEventListener("visibilitychange",onVisibility);};
  },[reduced,mode]);

  return <canvas ref={ref} className="h-full w-full" aria-hidden />;
}
