"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { novels, type Novel } from "@/data/novels";
import { visualMedia } from "@/data/visualMedia";

const coverImage = {
  girlDeadMan: visualMedia.girlDeadManCover,
  cityDrinking: visualMedia.cityDrinkingCover,
} as const;

function BookCoverArt({ novel, compact = false }: { novel: Novel; compact?: boolean }) {
  const image = novel.coverKey ? coverImage[novel.coverKey] : null;

  if (image) {
    return (
      <div className={`book-cover book-cover--image ${compact ? "book-cover--compact" : ""}`}>
        <img src={image} alt={`Cover of ${novel.title}`} />
        <span className="book-cover__shine" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className={`book-cover book-cover--${novel.accent} ${compact ? "book-cover--compact" : ""}`} aria-label={`Cover design for ${novel.title}`} role="img">
      <div className="book-cover__texture" aria-hidden="true" />
      <span className="book-cover__eyebrow">A NOVEL BY ASTA</span>
      <div className="book-cover__motif" aria-hidden="true">
        <span /><span /><span />
      </div>
      <strong className="book-cover__title">{novel.title}</strong>
      <span className="book-cover__rule" aria-hidden="true" />
      <small>ASTA</small>
      <span className="book-cover__shine" aria-hidden="true" />
    </div>
  );
}

export default function Novels() {
  const [activeNovel, setActiveNovel] = useState(0);
  const novel = novels[activeNovel];

  const step = (direction: number) => {
    setActiveNovel((current) => (current + direction + novels.length) % novels.length);
  };

  return (
    <Section id="novels" label="Novels">
      <Reveal>
        <div className="novels-visual-heading">
          <div>
            <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>Fiction by Asta</p>
            <h2 className="text-rice">Eight stories. One other side of me.</h2>
          </div>
          <p>Engineering is how I build systems. Fiction is how I study people.</p>
        </div>
      </Reveal>

      <div className="novel-stage mt-10">
        <div className="novel-stage__visual" aria-live="polite">
          <motion.div
            key={novel.id}
            className="novel-stage__book"
            initial={{ opacity: 0, x: 18, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <BookCoverArt novel={novel} />
          </motion.div>
          <div className="novel-stage__shadow" aria-hidden="true" />
          <div className="novel-stage__number" aria-hidden="true">{String(activeNovel + 1).padStart(2, "0")}</div>
        </div>

        <div className="novel-stage__copy">
          <div className="novel-stage__meta">
            <span>{novel.genre}</span>
            <span>{novel.tone}</span>
          </div>
          <h3>{novel.title}</h3>
          <p>{novel.premise}</p>
          <div className="novel-stage__controls" aria-label="Book carousel controls">
            <button type="button" onClick={() => step(-1)} aria-label="Previous novel">←</button>
            <span>{activeNovel + 1} / {novels.length}</span>
            <button type="button" onClick={() => step(1)} aria-label="Next novel">→</button>
          </div>
          <div className="novel-stage__note">
            <span>ASTA</span>
            <p>Long-form fiction, relationship drama, mystery, horror, and speculative worlds.</p>
          </div>
        </div>
      </div>

      <div className="novel-cover-rail" aria-label="Choose a novel">
        {novels.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveNovel(index)}
            data-active={index === activeNovel ? "true" : "false"}
            aria-pressed={index === activeNovel}
            aria-label={`Show ${item.title}`}
          >
            <BookCoverArt novel={item} compact />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </Section>
  );
}
