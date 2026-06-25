import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export default function InkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["rgba(20,20,20,", "rgba(40,40,40,", "rgba(184,134,11,", "rgba(60,60,60,"];

    const spawnInk = (x: number, y: number, count = 5) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 80 + Math.random() * 120,
          size: Math.random() * 30 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    // Spawn initial ink drops
    const spawnInitial = () => {
      for (let i = 0; i < 8; i++) {
        spawnInk(Math.random() * canvas.width, Math.random() * canvas.height, 8);
      }
    };
    spawnInitial();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (Math.random() < 0.3) spawnInk(mouseRef.current.x, mouseRef.current.y, 2);
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.fillStyle = "rgba(10,10,10,0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vy += 0.01;
        p.life++;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : 1 - (progress - 0.1) / 0.9;
        const size = p.size * (1 - progress * 0.5);

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        grad.addColorStop(0, p.color + (alpha * 0.8).toFixed(2) + ")");
        grad.addColorStop(1, p.color + "0)");
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Respawn periodically
      if (Math.random() < 0.02) {
        spawnInk(Math.random() * canvas.width, Math.random() * canvas.height, 3);
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "auto" }}
    />
  );
}
