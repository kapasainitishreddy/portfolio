const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const lyrics=[
  'I brought clean code, brave ideas, and coffee...',
  'Please hire me before my EMI finds me.',
  'My parents call. I say the interviews went great.',
  'The recruiter said soon. The calendar said wait.',
  'I train the model, test the edge case, ship the fix.',
  'I can explain the roadmap without forty-six slides.',
  'Give me a hard problem and a team that cares.',
  'I will bring the systems, the story, and the snacks.',
  'First I clear the debts. Then I make my parents proud.',
  'Then one small startup becomes something loud.',
  'Please hire me. I promise this chorus has unit tests.'
];
$('#year').textContent=new Date().getFullYear();
const wave=$('.waveform');for(let i=0;i<92;i++){const bar=document.createElement('i');bar.style.height=`${5+Math.abs(Math.sin(i*.91)*25)+Math.random()*8}px`;wave.append(bar)}
const themeButton=$('.theme-toggle');const saved=localStorage.getItem('portfolio-theme');if(saved==='theater'){document.documentElement.dataset.theme='theater';themeButton.setAttribute('aria-pressed','true')}
themeButton.addEventListener('click',()=>{const theater=document.documentElement.dataset.theme!=='theater';document.documentElement.dataset.theme=theater?'theater':'split';themeButton.setAttribute('aria-pressed',String(theater));themeButton.setAttribute('aria-label',theater?'Switch to Split Screenplay theme':"Switch to Director's Cut theme");localStorage.setItem('portfolio-theme',theater?'theater':'split')});
const dialog=$('#lyricsDialog');$('#fullLyrics').innerHTML=lyrics.map(x=>`<li>${x}</li>`).join('');$('#lyricsToggle').addEventListener('click',()=>dialog.showModal());$('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const audio=$('#audio'),play=$('#play'),progress=$('#progress'),elapsed=$('#elapsed'),lyric=$('#lyric');let ctx,master,timer,startAt=0,playing=false,muted=false,duration=168,audioReady=false;
audio.addEventListener('loadedmetadata',()=>{audioReady=true;duration=Number.isFinite(audio.duration)?audio.duration:168;startAt=audio.currentTime||0;setUI(startAt)});
audio.addEventListener('error',()=>{audioReady=false});
audio.addEventListener('ended',()=>{playing=false;startAt=0;setUI(0)});
function format(t){return`${Math.floor(t/60)}:${String(Math.floor(t%60)).padStart(2,'0')}`}
function current(){if(audioReady)return audio.currentTime||0;return playing?Math.min(duration,startAt+(ctx.currentTime-timer)):startAt}
function setUI(t){progress.value=t/duration*100;elapsed.textContent=format(t);lyric.textContent=lyrics[Math.min(lyrics.length-1,Math.floor(t/(duration/lyrics.length)))];play.innerHTML=`<span>${playing?'Ⅱ':'▶'}</span>`;play.setAttribute('aria-label',playing?'Pause Please Hire Me':'Play Please Hire Me')}
function synth(){ctx??=new(window.AudioContext||window.webkitAudioContext)();master??=ctx.createGain();master.connect(ctx.destination);master.gain.value=muted?0:.09;timer=ctx.currentTime;const notes=[110,138.59,164.81,220,196,164.81,138.59,123.47];for(let i=0;i<48;i++){const osc=ctx.createOscillator(),gain=ctx.createGain(),when=ctx.currentTime+i*.42;osc.type=i%4?'triangle':'sine';osc.frequency.value=notes[i%notes.length]*(i%8===7?2:1);gain.gain.setValueAtTime(0,when);gain.gain.linearRampToValueAtTime(.55,when+.025);gain.gain.exponentialRampToValueAtTime(.001,when+.38);osc.connect(gain).connect(master);osc.start(when);osc.stop(when+.4)}}
function tick(){if(!playing)return;const t=current();setUI(t);if(t>=duration){playing=false;startAt=0;setUI(0);return}requestAnimationFrame(tick)}
play.addEventListener('click',async()=>{if(playing){startAt=current();playing=false;if(audioReady)audio.pause();else if(ctx)ctx.suspend();setUI(startAt)}else{if(audioReady){audio.currentTime=startAt;await audio.play()}else if(!ctx||ctx.state==='closed')synth();else{await ctx.resume();synth()}playing=true;if(!audioReady)timer=ctx.currentTime;setUI(startAt);tick()}});
$('#restart').addEventListener('click',()=>{startAt=0;if(audioReady)audio.currentTime=0;else if(playing){timer=ctx.currentTime;synth()}setUI(0)});$('#mute').addEventListener('click',e=>{muted=!muted;audio.muted=muted;if(master)master.gain.value=muted?0:.09;e.currentTarget.textContent=muted?'×))':'◖))'});progress.addEventListener('input',()=>{startAt=duration*(progress.value/100);if(audioReady)audio.currentTime=startAt;else if(playing)timer=ctx.currentTime;setUI(startAt)});setUI(0);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&innerWidth>1050){const lines=$$('[data-type-line]');lines.forEach(l=>l.dataset.full=l.textContent);const observer=new IntersectionObserver(entries=>{entries.forEach(({isIntersecting,target})=>{if(!isIntersecting||target.dataset.done)return;target.dataset.done='1';const full=target.dataset.full;target.textContent='';let i=0;const id=setInterval(()=>{target.textContent=full.slice(0,++i);if(i>=full.length)clearInterval(id)},32)})},{threshold:.6});lines.forEach(l=>observer.observe(l))}
