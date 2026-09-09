export type NovelAccent = "amber" | "blue" | "crimson" | "gold" | "violet" | "monsoon";

export interface Novel {
  id: string;
  title: string;
  premise: string;
  genre: string;
  tone: string;
  accent: NovelAccent;
}

export const novels: Novel[] = [
  {
    id: "still-figuring-it-out",
    title: "Still Figuring It Out",
    premise: "A story about uncertainty, relationships, and becoming without pretending adulthood arrives with instructions.",
    genre: "Contemporary fiction",
    tone: "Reflective · intimate",
    accent: "blue",
  },
  {
    id: "bare-minimum",
    title: "Bare Minimum",
    premise: "A cautionary relationship drama about what happens when emotional expectations harden into a language of scorekeeping.",
    genre: "Relationship drama",
    tone: "Intimate · cautionary",
    accent: "amber",
  },
  {
    id: "you-always-come-back",
    title: "You Always Come Back",
    premise: "A psychological relationship drama about recurring patterns, entitlement, and the stories people tell themselves to stay innocent.",
    genre: "Psychological drama",
    tone: "Uncomfortable · observant",
    accent: "violet",
  },
  {
    id: "regret",
    title: "REGRET",
    premise: "A woman looks back at choices, intimacy, stigma, and the cost of being reduced to the parts of her past other people can judge.",
    genre: "Literary drama",
    tone: "Adult · reflective",
    accent: "crimson",
  },
  {
    id: "the-cat-who-stayed",
    title: "The Cat Who Stayed",
    premise: "A gentle story about grief, loneliness, home, and a white ragdoll cat that refuses to leave when everything else feels temporary.",
    genre: "Contemporary fiction",
    tone: "Warm · bittersweet",
    accent: "gold",
  },
  {
    id: "wolf-one-red-monsoon",
    title: "Wolf One: Red Monsoon",
    premise: "A Hyderabad vigilante thriller about a medical student, family legacy, and the line between protecting people and becoming what you hunt.",
    genre: "Vigilante thriller",
    tone: "Dark · kinetic",
    accent: "monsoon",
  },
];
