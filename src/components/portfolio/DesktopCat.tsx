"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { withBasePath } from "@/lib/basePath";

type DragStart = {
  pointerX: number;
  pointerY: number;
  offsetX: number;
  offsetY: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export default function DesktopCat() {
  const [open, setOpen] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const windowRef = useRef<HTMLElement>(null);
  const dragRef = useRef<DragStart | null>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(motionPreference.matches);
    sync();
    // On small screens, keep the pet accessible without covering portfolio content.
    if (window.matchMedia("(max-width: 720px)").matches) setOpen(false);
    motionPreference.addEventListener("change", sync);
    return () => motionPreference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !open || reducedMotion) {
      video?.pause();
      return;
    }
    let active = true;
    const maybePlay = () => {
      if (document.hidden) {
        video.pause();
        return;
      }
      video.play().then(() => {
        if (active) setPlaying(true);
      }).catch(() => {
        if (active) setPlaying(false);
      });
    };
    maybePlay();
    document.addEventListener("visibilitychange", maybePlay);
    return () => {
      active = false;
      document.removeEventListener("visibilitychange", maybePlay);
      video.pause();
    };
  }, [open, reducedMotion]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
      setPlaying(false);
    } else {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !windowRef.current) return;
    const rect = windowRef.current.getBoundingClientRect();
    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: offset.x,
      offsetY: offset.y,
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = dragRef.current;
    if (!start) return;
    const x = start.offsetX + event.clientX - start.pointerX;
    const y = start.offsetY + event.clientY - start.pointerY;
    setOffset({
      x: Math.min(start.offsetX + window.innerWidth - start.right - 8, Math.max(start.offsetX + 8 - start.left, x)),
      y: Math.min(start.offsetY + window.innerHeight - start.bottom - 56, Math.max(start.offsetY + 8 - start.top, y)),
    });
  };

  if (!open) {
    return (
      <button type="button" className="retro-cat-launcher" onClick={() => setOpen(true)}
        aria-label="Open animated desktop kitten">
        <span aria-hidden="true">🐾</span> MEOW.EXE
      </button>
    );
  }

  return (
    <aside ref={windowRef} className="retro-cat-window" aria-label="Animated desktop kitten"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
      <div className="retro-cat-titlebar" onPointerDown={beginDrag} onPointerMove={moveDrag}
        onPointerUp={() => { dragRef.current = null; }}
        onPointerCancel={() => { dragRef.current = null; }}>
        <span><span aria-hidden="true">🐾</span> MEOW.EXE</span>
        <button type="button" onPointerDown={(event) => event.stopPropagation()}
          onClick={() => { setOpen(false); setPlaying(false); }}
          aria-label="Minimize desktop kitten" title="Minimize">_</button>
      </div>
      <div className="retro-cat-screen">
        <video ref={videoRef} muted playsInline loop preload="metadata" width={320} height={180}
          aria-label="A fluffy white kitten with blue eyes and a blue bow blinks, meows, plays, and falls asleep">
          <source src={withBasePath("/media/desktop-kitten.mp4")} type="video/mp4" />
          Animated kitten video.
        </video>
      </div>
      <div className="retro-cat-toolbar">
        <span>A little joy between commits.</span>
        <button type="button" onClick={togglePlayback} aria-label={playing ? "Pause kitten animation" : "Play kitten animation"}>
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </aside>
  );
}
