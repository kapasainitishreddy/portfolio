"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/accessibility/useReducedMotion";
import { usePerformanceTier } from "@/lib/hooks/usePerformanceTier";
import { useInk } from "@/components/ink/InkProvider";
import { useTheme } from "@/components/theme/ThemeProvider";

const VERT = `
precision highp float;
attribute vec2 aP;
varying vec2 vUv,vL,vR,vT,vB;
uniform vec2 texelSize;
void main(){
  vUv=aP*0.5+0.5;
  vL=vUv-vec2(texelSize.x,0.0);vR=vUv+vec2(texelSize.x,0.0);
  vT=vUv+vec2(0.0,texelSize.y);vB=vUv-vec2(0.0,texelSize.y);
  gl_Position=vec4(aP,0.0,1.0);
}`;

const FRAG = {
  clear: `precision highp float;varying vec2 vUv;uniform sampler2D uTex;uniform float value;void main(){gl_FragColor=value*texture2D(uTex,vUv);}`,
  splat: `precision highp float;varying vec2 vUv;uniform sampler2D uTarget;uniform float aspect,radius;uniform vec2 point;uniform vec3 color;void main(){vec2 p=vUv-point;p.x*=aspect;vec3 base=texture2D(uTarget,vUv).xyz;gl_FragColor=vec4(base+color*exp(-dot(p,p)/radius),1.0);}`,
  dropWarp: `precision highp float;varying vec2 vUv;uniform sampler2D uTarget;uniform float aspect,r2,isInk,seed;uniform vec2 point;uniform vec3 inkCol;void main(){vec2 p=vUv-point;p.x*=aspect;float d2=dot(p,p);float rr=sqrt(r2),d=sqrt(d2);float ang=atan(p.y,p.x);float wob=0.5*sin(ang*7.0+seed*13.0)+0.3*sin(ang*17.0+seed*29.0)+0.2*sin(ang*3.0-seed*7.0);float re=rr*(1.0+0.055*wob);if(d<re){if(isInk>0.5){float t=smoothstep(re*0.93,re,d);gl_FragColor=vec4(inkCol*(1.0-0.28*t),1.0);}else{gl_FragColor=vec4(0.0,0.0,0.0,1.0);}}else{vec2 q=p*sqrt(max(1.0-r2/max(d2,r2*1.05),0.0));q.x/=aspect;vec3 c=texture2D(uTarget,point+q).rgb;gl_FragColor=vec4(c,1.0);}}`,
  advect: `precision highp float;varying vec2 vUv;uniform sampler2D uVelocity,uSource;uniform vec2 texelSize;uniform float dt,dissipation;void main(){vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize;gl_FragColor=texture2D(uSource,coord)/(1.0+dissipation*dt);}`,
  mcc: `precision highp float;varying vec2 vUv;uniform sampler2D uDye,uPhi1,uPhi2,uVelocity;uniform vec2 vTexel,dTexel;uniform float dt,dissipation;void main(){vec2 disp=dt*texture2D(uVelocity,vUv).xy*vTexel;if(dot(disp,disp)<dot(dTexel,dTexel)*0.0025){gl_FragColor=vec4(texture2D(uDye,vUv).rgb/(1.0+dissipation*dt),1.0);return;}vec3 r=texture2D(uPhi1,vUv).rgb+0.5*(texture2D(uDye,vUv).rgb-texture2D(uPhi2,vUv).rgb);vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*vTexel;vec2 st=coord/dTexel-0.5;vec2 i=floor(st);vec3 a=texture2D(uDye,(i+vec2(0.5,0.5))*dTexel).rgb;vec3 b=texture2D(uDye,(i+vec2(1.5,0.5))*dTexel).rgb;vec3 c=texture2D(uDye,(i+vec2(0.5,1.5))*dTexel).rgb;vec3 d=texture2D(uDye,(i+vec2(1.5,1.5))*dTexel).rgb;vec3 mn=min(min(a,b),min(c,d)),mx=max(max(a,b),max(c,d));gl_FragColor=vec4(clamp(r,mn,mx)/(1.0+dissipation*dt),1.0);}`,
  div: `precision highp float;varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uVelocity;void main(){float L=texture2D(uVelocity,vL).x,R=texture2D(uVelocity,vR).x;float B=texture2D(uVelocity,vB).y,T=texture2D(uVelocity,vT).y;vec2 C=texture2D(uVelocity,vUv).xy;if(vL.x<0.0)L=-C.x;if(vR.x>1.0)R=-C.x;if(vB.y<0.0)B=-C.y;if(vT.y>1.0)T=-C.y;gl_FragColor=vec4(0.5*(R-L+T-B),0.0,0.0,1.0);}`,
  curl: `precision highp float;varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uVelocity;void main(){float L=texture2D(uVelocity,vL).y,R=texture2D(uVelocity,vR).y;float B=texture2D(uVelocity,vB).x,T=texture2D(uVelocity,vT).x;gl_FragColor=vec4(0.5*(R-L-T+B),0.0,0.0,1.0);}`,
  vort: `precision highp float;varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uVelocity,uCurl;uniform float curlK,dt;void main(){float L=texture2D(uCurl,vL).x,R=texture2D(uCurl,vR).x;float B=texture2D(uCurl,vB).x,T=texture2D(uCurl,vT).x;float C=texture2D(uCurl,vUv).x;vec2 f=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));f/=(length(f)+1e-4);f*=curlK*C;f.y*=-1.0;vec2 v=texture2D(uVelocity,vUv).xy+f*dt;gl_FragColor=vec4(clamp(v,-1000.0,1000.0),0.0,1.0);}`,
  press: `precision highp float;varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uPressure,uDivergence;void main(){float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x;float B=texture2D(uPressure,vB).x,T=texture2D(uPressure,vT).x;float d=texture2D(uDivergence,vUv).x;gl_FragColor=vec4((L+R+B+T-d)*0.25,0.0,0.0,1.0);}`,
  grad: `precision highp float;varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uPressure,uVelocity;void main(){float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x;float B=texture2D(uPressure,vB).x,T=texture2D(uPressure,vT).x;vec2 v=texture2D(uVelocity,vUv).xy-vec2(R-L,T-B);gl_FragColor=vec4(v,0.0,1.0);}`,
  show: `precision highp float;varying vec2 vUv;uniform sampler2D uDye;uniform vec2 res;uniform float time,uMode;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}void main(){vec3 d=texture2D(uDye,vUv).rgb;vec2 q=vUv*res/600.0;float fib=n2(vec2(q.x*46.0,q.y*640.0))*0.5+n2(vec2(q.x*620.0,q.y*52.0))*0.28+n2(q*90.0)*0.22;float mottle=n2(q*7.0)*0.6+n2(q*17.0)*0.4;vec3 paper=vec3(0.952,0.917,0.845);paper*=0.962+fib*0.052+mottle*0.022;float fleck=step(0.9965,h(floor(q*220.0)));paper*=1.0-fleck*0.16;vec3 dye=d*(0.82+fib*0.42);vec3 lightCol=paper*exp(-dye);float density=clamp(1.0-exp(-dot(dye,vec3(0.34))),0.0,1.0);vec3 night=vec3(0.025,0.031,0.038)*(0.94+fib*0.08);vec3 nightInk=mix(vec3(0.12,0.16,0.28),vec3(0.76,0.73,0.67),smoothstep(0.2,0.95,density));vec3 darkCol=mix(night,nightInk,smoothstep(0.015,0.78,density));vec3 col=mix(darkCol,lightCol,uMode);vec2 e=vUv*(1.0-vUv);col*=0.88+0.12*pow(e.x*e.y*16.0,0.18);gl_FragColor=vec4(col,1.0);}`,
};

type GL = WebGLRenderingContext | WebGL2RenderingContext;
type Format = { i: number; f: number };
type ProgramBundle = { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null>; bind: () => void };

export default function SuminagashiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const tier = usePerformanceTier();
  const { intensity, paused } = useInk();
  const { mode } = useTheme();
  const intensityRef = useRef(intensity);
  const pausedRef = useRef(paused);
  const modeRef = useRef(mode);
  useEffect(() => { intensityRef.current = intensity; }, [intensity]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { modeRef.current = mode; }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const attrs = { alpha: false, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    const gl2 = canvas.getContext("webgl2", attrs);
    const gl = (gl2 || canvas.getContext("webgl", attrs)) as GL | null;
    if (!gl) return;
    const is2 = Boolean(gl2);
    let halfType: number;
    let linear = false;
    let rgba: Format;
    let rg: Format;
    let r: Format;
    if (is2) {
      const g = gl as WebGL2RenderingContext;
      g.getExtension("EXT_color_buffer_float");
      linear = Boolean(g.getExtension("OES_texture_float_linear") || g.getExtension("OES_texture_half_float_linear"));
      halfType = g.HALF_FLOAT;
      rgba = { i: g.RGBA16F, f: g.RGBA }; rg = { i: g.RG16F, f: g.RG }; r = { i: g.R16F, f: g.RED };
    } else {
      const ext = gl.getExtension("OES_texture_half_float") as { HALF_FLOAT_OES: number } | null;
      linear = Boolean(gl.getExtension("OES_texture_half_float_linear"));
      halfType = ext?.HALF_FLOAT_OES ?? gl.UNSIGNED_BYTE;
      rgba = { i: gl.RGBA, f: gl.RGBA }; rg = rgba; r = rgba;
    }
    const filter = linear ? gl.LINEAR : gl.NEAREST;
    const mobile = tier === "low";

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) throw new Error("Unable to create Suminagashi shader");
      gl.shaderSource(shader, source); gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Suminagashi shader compile failed");
      return shader;
    };
    const vertex = compile(gl.VERTEX_SHADER, VERT);
    const makeProgram = (source: string): ProgramBundle => {
      const program = gl.createProgram(); if (!program) throw new Error("Unable to create Suminagashi program");
      gl.attachShader(program, vertex); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, source)); gl.bindAttribLocation(program, 0, "aP"); gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Suminagashi program link failed");
      const u: Record<string, WebGLUniformLocation | null> = {};
      const total = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < total; i++) { const info = gl.getActiveUniform(program, i); if (info) u[info.name] = gl.getUniformLocation(program, info.name); }
      return { p: program, u, bind: () => gl.useProgram(program) };
    };
    const P = Object.fromEntries(Object.entries(FRAG).map(([key, value]) => [key, makeProgram(value)])) as Record<string, ProgramBundle>;

    const quad = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, quad); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0,2,gl.FLOAT,false,0,0);
    const createFBO = (w: number, h: number, format: Format, filt: number) => {
      const tex = gl.createTexture(); const fbo = gl.createFramebuffer(); if (!tex || !fbo) throw new Error("Unable to create Suminagashi framebuffer");
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filt); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filt); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); gl.texImage2D(gl.TEXTURE_2D,0,format.i,w,h,0,format.f,halfType,null); gl.bindFramebuffer(gl.FRAMEBUFFER,fbo); gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0); gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      return { tex, fbo, w, h, texel: [1/w,1/h] as [number,number], attach(id: number){ gl.activeTexture(gl.TEXTURE0+id); gl.bindTexture(gl.TEXTURE_2D,tex); return id; } };
    };
    const createDouble = (w: number, h: number, format: Format, filt: number) => {
      let a = createFBO(w,h,format,filt), b = createFBO(w,h,format,filt);
      return { get r(){ return a; }, get w2(){ return b; }, texel: a.texel, swap(){ const t=a;a=b;b=t; } };
    };
    const blit = (target: any | null) => { if (target) { gl.bindFramebuffer(gl.FRAMEBUFFER,target.fbo); gl.viewport(0,0,target.w,target.h); } else { gl.bindFramebuffer(gl.FRAMEBUFFER,null); gl.viewport(0,0,canvas.width,canvas.height); } gl.drawArrays(gl.TRIANGLE_STRIP,0,4); };
    const setTexel = (program: ProgramBundle, texel: [number,number]) => gl.uniform2f(program.u.texelSize, texel[0], texel[1]);

    let velocity: any, dye: any, pressure: any, divergence: any, curlField: any, dyeTmp1: any, dyeTmp2: any;
    const sizeCanvas = () => { const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.75); const w=Math.max(1,Math.floor(window.innerWidth*dpr)),h=Math.max(1,Math.floor(window.innerHeight*dpr)); const changed=canvas.width!==w||canvas.height!==h; if(changed){canvas.width=w;canvas.height=h;} return changed; };
    const initFBOs = () => { const aspect=canvas.width/canvas.height; const simR=mobile?80:128; const dyeR=mobile?Math.min(360,Math.max(220,Math.floor(Math.min(canvas.width,canvas.height)*0.7))):Math.min(760,Math.max(420,Math.floor(Math.max(canvas.width,canvas.height)/2))); const dims=(res:number)=>aspect>1?[Math.round(res*aspect),res]:[res,Math.round(res/aspect)]; const [sw,sh]=dims(simR),[dw,dh]=dims(dyeR); velocity=createDouble(sw,sh,rg,filter); dye=createDouble(dw,dh,rgba,filter); dyeTmp1=createFBO(dw,dh,rgba,filter); dyeTmp2=createFBO(dw,dh,rgba,filter); pressure=createDouble(sw,sh,r,gl.NEAREST); divergence=createFBO(sw,sh,r,gl.NEAREST); curlField=createFBO(sw,sh,r,gl.NEAREST); };
    sizeCanvas(); initFBOs();

    const aspect = () => canvas.width / canvas.height;
    const dropWarp = (x:number,y:number,radius:number,ink:number[]|null) => { const p=P.dropWarp;p.bind();setTexel(p,dye.texel);gl.uniform1i(p.u.uTarget,dye.r.attach(0));gl.uniform1f(p.u.aspect,aspect());gl.uniform2f(p.u.point,x,y);gl.uniform1f(p.u.r2,radius*radius);gl.uniform1f(p.u.isInk,ink?1:0);gl.uniform1f(p.u.seed,Math.random()*100);gl.uniform3f(p.u.inkCol,...((ink??[0,0,0]) as [number,number,number]));blit(dye.w2);dye.swap(); };
    const splatVelocity = (x:number,y:number,dx:number,dy:number,radius:number) => { const p=P.splat;p.bind();setTexel(p,velocity.texel);gl.uniform1i(p.u.uTarget,velocity.r.attach(0));gl.uniform1f(p.u.aspect,aspect());gl.uniform2f(p.u.point,x,y);gl.uniform3f(p.u.color,dx,dy,0);gl.uniform1f(p.u.radius,radius);blit(velocity.w2);velocity.swap(); };
    const ink = [7.6,7.25,6.6]; const indigo=[7.15,4.4,1.45]; let alternate=0;
    const waterQueue: { at:number;x:number;y:number;r:number }[]=[];
    const tapDrop = (x:number,y:number,forceColor?:number[]) => { const base=mobile?0.043:0.028; const radius=base+Math.random()*(mobile?0.014:0.010); const color=forceColor ?? (alternate++%5===4?indigo:ink); dropWarp(x,y,radius,color); waterQueue.push({at:performance.now()+150,x,y,r:radius*0.52}); };
    const flushWater = () => { while(waterQueue.length && performance.now()>=waterQueue[0].at){ const item=waterQueue.shift()!; dropWarp(item.x,item.y,item.r,null); } };

    const pressureIterations=mobile?12:20, curlK=2.6, velocityDiss=2.4, dyeDiss=0.018;
    const step=(dt:number)=>{
      gl.disable(gl.BLEND);
      let p=P.curl;p.bind();setTexel(p,velocity.texel);gl.uniform1i(p.u.uVelocity,velocity.r.attach(0));blit(curlField);
      p=P.vort;p.bind();setTexel(p,velocity.texel);gl.uniform1i(p.u.uVelocity,velocity.r.attach(0));gl.uniform1i(p.u.uCurl,curlField.attach(1));gl.uniform1f(p.u.curlK,curlK);gl.uniform1f(p.u.dt,dt);blit(velocity.w2);velocity.swap();
      p=P.div;p.bind();setTexel(p,velocity.texel);gl.uniform1i(p.u.uVelocity,velocity.r.attach(0));blit(divergence);
      p=P.clear;p.bind();gl.uniform1i(p.u.uTex,pressure.r.attach(0));gl.uniform1f(p.u.value,0.8);blit(pressure.w2);pressure.swap();
      p=P.press;p.bind();setTexel(p,velocity.texel);gl.uniform1i(p.u.uDivergence,divergence.attach(0));for(let i=0;i<pressureIterations;i++){gl.uniform1i(p.u.uPressure,pressure.r.attach(1));blit(pressure.w2);pressure.swap();}
      p=P.grad;p.bind();setTexel(p,velocity.texel);gl.uniform1i(p.u.uPressure,pressure.r.attach(0));gl.uniform1i(p.u.uVelocity,velocity.r.attach(1));blit(velocity.w2);velocity.swap();
      p=P.advect;p.bind();setTexel(p,velocity.texel);gl.uniform1i(p.u.uVelocity,velocity.r.attach(0));gl.uniform1i(p.u.uSource,velocity.r.attach(0));gl.uniform1f(p.u.dt,dt);gl.uniform1f(p.u.dissipation,velocityDiss);blit(velocity.w2);velocity.swap();
      // MacCormack/BFECC keeps the thin marbling rings sharper while the water moves.
      p=P.advect;p.bind();setTexel(p,velocity.texel);gl.uniform1f(p.u.dissipation,0);gl.uniform1i(p.u.uVelocity,velocity.r.attach(0));gl.uniform1i(p.u.uSource,dye.r.attach(1));gl.uniform1f(p.u.dt,dt);blit(dyeTmp1);gl.uniform1i(p.u.uSource,dyeTmp1.attach(1));gl.uniform1f(p.u.dt,-dt);blit(dyeTmp2);
      p=P.mcc;p.bind();gl.uniform1i(p.u.uVelocity,velocity.r.attach(0));gl.uniform1i(p.u.uDye,dye.r.attach(1));gl.uniform1i(p.u.uPhi1,dyeTmp1.attach(2));gl.uniform1i(p.u.uPhi2,dyeTmp2.attach(3));gl.uniform2f(p.u.vTexel,velocity.texel[0],velocity.texel[1]);gl.uniform2f(p.u.dTexel,dye.texel[0],dye.texel[1]);gl.uniform1f(p.u.dt,dt);gl.uniform1f(p.u.dissipation,dyeDiss);blit(dye.w2);dye.swap();
    };
    const show=(time:number)=>{const p=P.show;p.bind();gl.uniform1i(p.u.uDye,dye.r.attach(0));gl.uniform2f(p.u.res,canvas.width,canvas.height);gl.uniform1f(p.u.time,time);gl.uniform1f(p.u.uMode,modeRef.current==="light"?1:0);blit(null);};

    let windClock=Math.random()*100;
    const wind=(dt:number)=>{ windClock+=dt; const x=0.5+0.36*Math.sin(windClock*0.071),y=0.5+0.32*Math.cos(windClock*0.059);const amount=dt*60*0.09*intensityRef.current;splatVelocity(x,y,Math.cos(windClock*0.17)*amount,Math.sin(windClock*0.13)*amount,0.02); };
    const pointers=new Map<number,{x:number;y:number}>();
    const norm=(event:PointerEvent)=>[event.clientX/window.innerWidth,1-event.clientY/window.innerHeight] as [number,number];
    const interactive=(event:PointerEvent)=>Boolean((event.target as Element | null)?.closest?.("a,button,input,textarea,select,summary,[role='dialog']"));
    const onPointerDown=(event:PointerEvent)=>{ if(interactive(event))return; const [x,y]=norm(event);tapDrop(x,y);pointers.set(event.pointerId,{x,y}); };
    const onPointerMove=(event:PointerEvent)=>{ const previous=pointers.get(event.pointerId);if(!previous)return;const [x,y]=norm(event);const dx=x-previous.x,dy=y-previous.y;if(dx||dy)splatVelocity(x,y,dx*2100*intensityRef.current,dy*2100*intensityRef.current,event.pointerType==="touch"?0.0035:0.0013);previous.x=x;previous.y=y; };
    const endPointer=(event:PointerEvent)=>pointers.delete(event.pointerId);
    let lastScroll=window.scrollY;
    const onScroll=()=>{const delta=window.scrollY-lastScroll;lastScroll=window.scrollY;if(Math.abs(delta)>2&&!pausedRef.current)splatVelocity(0.5,0.52,0,-Math.sign(delta)*0.12*intensityRef.current,0.09);};
    window.addEventListener("pointerdown",onPointerDown,{passive:true});window.addEventListener("pointermove",onPointerMove,{passive:true});window.addEventListener("pointerup",endPointer,{passive:true});window.addEventListener("pointercancel",endPointer,{passive:true});window.addEventListener("scroll",onScroll,{passive:true});

    const demoTimers:number[]=[];[[0.5,0.56,0],[0.5,0.56,260],[0.5,0.56,520],[0.5,0.56,780],[0.32,0.66,1100],[0.72,0.43,1420]].forEach(([x,y,delay],index)=>{demoTimers.push(window.setTimeout(()=>tapDrop(x as number,y as number,index>3?indigo:ink),delay as number));});
    let resizeTimer=0;const onResize=()=>{window.clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>{if(sizeCanvas())initFBOs();},220);};window.addEventListener("resize",onResize);
    let raf=0,last=performance.now(),running=true;
    const frame=(now:number)=>{const dt=Math.min((now-last)/1000,1/40);last=now;flushWater();if(!pausedRef.current){wind(dt);step(dt*0.78*Math.max(0.2,intensityRef.current));}show(now/1000);if(running)raf=requestAnimationFrame(frame);};
    raf=requestAnimationFrame(frame);
    const onVisibility=()=>{running=!document.hidden;if(running){last=performance.now();raf=requestAnimationFrame(frame);}else cancelAnimationFrame(raf);};document.addEventListener("visibilitychange",onVisibility);
    return()=>{running=false;cancelAnimationFrame(raf);demoTimers.forEach(window.clearTimeout);window.clearTimeout(resizeTimer);window.removeEventListener("pointerdown",onPointerDown);window.removeEventListener("pointermove",onPointerMove);window.removeEventListener("pointerup",endPointer);window.removeEventListener("pointercancel",endPointer);window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onResize);document.removeEventListener("visibilitychange",onVisibility);(gl.getExtension("WEBGL_lose_context") as {loseContext?:()=>void}|null)?.loseContext?.();};
  }, [reduced, tier]);

  if (reduced) return <StaticSuminagashi />;
  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}

function StaticSuminagashi() {
  return <div className="suminagashi-static" aria-hidden>{[0,1,2,3,4,5].map((ring)=><span key={ring} className={`suminagashi-static__ring suminagashi-static__ring--${ring+1}`} />)}</div>;
}
