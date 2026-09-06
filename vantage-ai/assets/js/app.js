/* ============================================================
   VANTAGE AI — Frontend application script.
   Vanilla JS, no dependencies. Handles:
     - Custom cursor (dot + ring with hover state)
     - Light/dark theme toggle (persisted to localStorage)
     - Scroll reveal + stats counter
     - 3D card tilt effect on portfolio/blog cards
     - Timeline progressive reveal
     - Radar chart with proper per-vertex hover layering
       (fix for the 4/5 hover-state issue: vertices are rendered
        in the SVG AFTER the polygon, with transparent hit-area
        circles around each for stable pointer hit-testing.)
     - Contact form (client-side only, demo submission)
   ============================================================ */

(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const HAS_FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Theme ---------- */
  const THEME_KEY = "vantage-theme";
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = $(".theme-toggle");
    if (btn) {
      const label = btn.querySelector(".theme-label");
      if (label) label.textContent = theme === "light" ? "Dark mode" : "Light mode";
    }
  }
  function initTheme() {
    let theme = localStorage.getItem(THEME_KEY);
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    applyTheme(theme);
    const btn = $(".theme-toggle");
    if (btn) {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      });
    }
  }

  /* ---------- Custom Cursor ---------- */
  function initCursor() {
    if (!HAS_FINE_POINTER || REDUCED_MOTION) return;
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add("has-custom-cursor");

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
    });

    function tick() {
      dotX += (mouseX - dotX) * 0.9;
      dotY += (mouseY - dotY) * 0.9;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    tick();

    const hoverTargets = "a, button, .card, .blog-card, .btn, .stat, .timeline-item, .theme-toggle";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverTargets)) ring.classList.remove("is-hover");
    });
    document.addEventListener("mouseleave", () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    });
  }

  /* ---------- Scroll Reveal ---------- */
  function initReveal() {
    if (REDUCED_MOTION) {
      $$(".reveal, .timeline-item").forEach(el => el.classList.add("is-visible"));
      return;
    }
    const items = $$(".reveal, .timeline-item");
    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
    items.forEach(el => io.observe(el));
  }

  /* ---------- Stats Counter ---------- */
  function initStats() {
    const stats = $$(".stat-value[data-target]");
    if (!stats.length) return;

    function animateCounter(el) {
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      const duration = 1600;
      const start = performance.now();
      function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = (target * eased).toFixed(decimals);
        el.textContent = value;
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = target.toFixed(decimals);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) {
      stats.forEach(animateCounter);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    stats.forEach(s => io.observe(s));
  }

  /* ---------- 3D Card Tilt ---------- */
  function initCardTilt() {
    if (REDUCED_MOTION) return;
    const cards = $$(".card.tilt, .blog-card.tilt, .stat.tilt");
    cards.forEach(card => {
      let rect = null;
      function onMove(e) {
        if (!rect) rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 8;
        const ry = (x - 0.5) * 10;
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      }
      function onLeave() {
        rect = null;
        card.style.transform = "";
      }
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      window.addEventListener("scroll", () => { rect = null; }, { passive: true });
    });
  }

  /* ---------- Radar Chart (with hover-layering fix) ---------- */
  /*
   * The hover-layering fix: in the original build, hovering a front-end
   * vertex caused it to be obscured by the back-end polygon vertices
   * drawn behind/above it depending on draw order. We solve this two ways:
   *   1. Each vertex is rendered AFTER the polygon in the SVG (later
   *      children render on top by default), so the front-end dot
   *      stays visually above the polygon even when hovered.
   *   2. Each vertex gets a transparent larger "hit" circle drawn on
   *      top of everything, so pointer events land reliably even when
   *      vertices overlap.
   * This produces stable, single-vertex highlight behavior on hover.
   */
  function initRadar() {
    const svg = $("#radar-svg");
    if (!svg) return;

    const dataAttr = svg.dataset.skills;
    if (!dataAttr) return;
    let skills;
    try { skills = JSON.parse(dataAttr); }
    catch (err) { console.warn("Radar data invalid:", err); return; }
    if (!Array.isArray(skills) || skills.length < 3) return;

    const NS = "http://www.w3.org/2000/svg";
    const size = 480;
    const cx = size / 2, cy = size / 2;
    const radius = 170;
    const labelOffset = 28;
    const levels = 4;
    const n = skills.length;
    const angleFor = (i) => -Math.PI / 2 + (i * 2 * Math.PI / n);

    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    for (let lv = 1; lv <= levels; lv++) {
      const r = (radius * lv) / levels;
      const points = [];
      for (let i = 0; i < n; i++) {
        const a = angleFor(i);
        points.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
      }
      const poly = document.createElementNS(NS, "polygon");
      poly.setAttribute("points", points.join(" "));
      poly.setAttribute("class", "radar-grid-line");
      svg.appendChild(poly);
    }
    for (let i = 0; i < n; i++) {
      const a = angleFor(i);
      const x = cx + radius * Math.cos(a);
      const y = cy + radius * Math.sin(a);
      const line = document.createElementNS(NS, "line");
      line.setAttribute("x1", cx);
      line.setAttribute("y1", cy);
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
      line.setAttribute("class", "radar-axis-line");
      svg.appendChild(line);
    }

    const valuePoints = skills.map((s, i) => {
      const a = angleFor(i);
      const r = (radius * s.value) / 100;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    });
    const poly = document.createElementNS(NS, "polygon");
    poly.setAttribute("points", valuePoints.join(" "));
    poly.setAttribute("class", "radar-poly");
    svg.appendChild(poly);

    const container = svg.parentElement;
    if (container && getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
    const tooltip = document.createElement("div");
    tooltip.className = "radar-tooltip";
    container.appendChild(tooltip);

    const labels = [];

    skills.forEach((s, i) => {
      const a = angleFor(i);
      const vx = cx + (radius * s.value / 100) * Math.cos(a);
      const vy = cy + (radius * s.value / 100) * Math.sin(a);

      // Visible vertex — drawn AFTER polygon so it sits on top (fix #1)
      const dot = document.createElementNS(NS, "circle");
      dot.setAttribute("cx", vx);
      dot.setAttribute("cy", vy);
      dot.setAttribute("r", 5);
      dot.setAttribute("class", "radar-vertex");
      dot.dataset.index = i;
      svg.appendChild(dot);

      // Hit area — drawn LAST so it's on top of everything (fix #2)
      const hit = document.createElementNS(NS, "circle");
      hit.setAttribute("cx", vx);
      hit.setAttribute("cy", vy);
      hit.setAttribute("r", 18);
      hit.setAttribute("class", "radar-vertex-bg");
      hit.setAttribute("fill", "transparent");
      hit.dataset.index = i;
      svg.appendChild(hit);

      const lx = cx + (radius + labelOffset) * Math.cos(a);
      const ly = cy + (radius + labelOffset) * Math.sin(a);
      const label = document.createElementNS(NS, "text");
      label.setAttribute("x", lx);
      label.setAttribute("y", ly);
      label.setAttribute("class", "radar-label");
      label.textContent = s.name;
      svg.appendChild(label);
      labels.push(label);

      const showHover = () => {
        dot.classList.add("is-hover");
        labels.forEach((l, j) => l.classList.toggle("is-hover", j === i));
        const rect = container.getBoundingClientRect();
        tooltip.innerHTML = `<strong>${s.name}</strong> — ${s.value}/100`;
        tooltip.style.left = (vx * rect.width / size) + "px";
        tooltip.style.top = (vy * rect.height / size) + "px";
        tooltip.classList.add("is-visible");
      };
      const hideHover = () => {
        dot.classList.remove("is-hover");
        labels.forEach(l => l.classList.remove("is-hover"));
        tooltip.classList.remove("is-visible");
      };
      hit.addEventListener("mouseenter", showHover);
      hit.addEventListener("mouseleave", hideHover);
      dot.addEventListener("mouseenter", showHover);
      dot.addEventListener("mouseleave", hideHover);
    });
  }

  /* ---------- Contact Form ---------- */
  function initContact() {
    const form = $("#contact-form");
    if (!form) return;
    const status = $(".form-status", form);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();
      if (!name || !email || !message) {
        status.textContent = "Please fill in every field.";
        status.style.color = "var(--danger)";
        return;
      }
      status.textContent = `Thanks, ${name.split(" ")[0]} — your message is queued (demo).`;
      status.style.color = "var(--accent)";
      form.reset();
    });
  }

  /* ---------- Mark Active Nav Link ---------- */
  function initNav() {
    const here = location.pathname.split("/").pop() || "index.html";
    $$(".nav-links a").forEach(a => {
      const target = (a.getAttribute("href") || "").split("/").pop();
      if (target === here) a.classList.add("is-active");
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNav();
    initCursor();
    initReveal();
    initStats();
    initCardTilt();
    initRadar();
    initContact();
  });
})();
