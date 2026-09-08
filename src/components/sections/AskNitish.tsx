"use client";

import { FormEvent, useState } from "react";
import { Section } from "@/components/layout/Section";
import Reveal from "@/components/layout/Reveal";
import { findGroundedAnswer, suggestedQuestions, type GroundedAnswer } from "@/data/askNitish";

const initialAnswer: GroundedAnswer = {
  title: "Start anywhere",
  body:
    "Ask about the AI systems I build, agent work, safety and governance, undergraduate teaching, Syrava, experience, or writing. Every answer stays grounded in the public information on this portfolio.",
  links: [
    { label: "Explore the AI universe", href: "#ai-universe" },
    { label: "See experience", href: "#experience" },
  ],
};

export default function AskNitish() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<GroundedAnswer>(initialAnswer);

  const ask = (value: string) => {
    setQuestion(value);
    setAnswer(findGroundedAnswer(value));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    ask(question);
  };

  return (
    <Section id="ask-nitish" label="Ask Nitish">
      <div className="ask-nitish">
        <Reveal>
          <div className="ask-nitish__intro">
            <h2 className="text-rice" style={{ fontSize: "clamp(2.3rem, 5vw, 4.8rem)" }}>
              A grounded guide to my work.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-silver md:text-lg md:leading-8">
              Explore the portfolio conversationally. The guide only uses the public information on this site, so it stays useful without inventing claims.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="ask-nitish__panel">
            <form onSubmit={onSubmit} className="ask-nitish__form">
              <label htmlFor="ask-nitish-question" className="font-mono-label">
                Ask about my work
              </label>
              <div className="ask-nitish__composer">
                <input
                  id="ask-nitish-question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  className="ask-nitish__input"
                  placeholder="What have you built with AI agents?"
                  autoComplete="off"
                />
                <button type="submit" className="portfolio-cta portfolio-cta--primary ask-nitish__submit">
                  Ask Nitish
                </button>
              </div>
            </form>

            <div className="ask-nitish__suggestions" aria-label="Suggested questions">
              {suggestedQuestions.map((suggestion) => (
                <button key={suggestion} type="button" onClick={() => ask(suggestion)} className="ask-nitish__suggestion">
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="ask-nitish__answer" aria-live="polite">
              <p className="font-mono-label" style={{ color: "var(--color-copper)" }}>
                Grounded answer
              </p>
              <h3 className="mt-3 font-serif text-2xl text-rice md:text-3xl">{answer.title}</h3>
              <p className="mt-4 max-w-3xl leading-7 text-silver">{answer.body}</p>
              {answer.links && answer.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {answer.links.map((link) => (
                    <a key={link.href + link.label} href={link.href} className="link-quiet text-sm text-rice">
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
