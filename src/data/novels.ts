export type NovelAccent = "amber" | "blue" | "crimson" | "gold" | "violet" | "monsoon" | "noir" | "city";
export type NovelCoverKey = "girlDeadMan" | "cityDrinking";

export interface Novel {
  id: string;
  title: string;
  premise: string;
  genre: string;
  tone: string;
  accent: NovelAccent;
  coverKey?: NovelCoverKey;
}

export const novels: Novel[] = [
  {
    id: "still-figuring-it-out",
    title: "Still Figuring It Out",
    premise: "Uncertainty, relationships, and becoming without pretending adulthood arrives with instructions.",
    genre: "Autofiction",
    tone: "Reflective · intimate",
    accent: "blue",
  },
  {
    id: "bare-minimum",
    title: "Bare Minimum",
    premise: "A relationship turns emotional expectations into a language of scorekeeping.",
    genre: "Relationship drama",
    tone: "Intimate · cautionary",
    accent: "amber",
  },
  {
    id: "you-always-come-back",
    title: "You Always Come Back",
    premise: "Recurring patterns, entitlement, and the stories people tell themselves to stay innocent.",
    genre: "Psychological drama",
    tone: "Uncomfortable · observant",
    accent: "violet",
  },
  {
    id: "regret",
    title: "REGRET",
    premise: "A woman confronts intimacy, stigma, memory, and the cost of being reduced to her past.",
    genre: "Literary drama",
    tone: "Adult · reflective",
    accent: "crimson",
  },
  {
    id: "the-cat-who-stayed",
    title: "The Cat Who Stayed",
    premise: "Grief, loneliness, home, and a white ragdoll cat that refuses to leave.",
    genre: "Contemporary fiction",
    tone: "Warm · bittersweet",
    accent: "gold",
  },
  {
    id: "wolf-one-red-monsoon",
    title: "Wolf One: Red Monsoon",
    premise: "A Hyderabad vigilante thriller about family legacy and the line between protection and obsession.",
    genre: "Vigilante thriller",
    tone: "Dark · kinetic",
    accent: "monsoon",
  },
  {
    id: "girl-who-drew-a-dead-man",
    title: "The Girl Who Drew a Dead Man",
    premise: "A strange drawing pulls a quiet life toward a mystery it should never have known.",
    genre: "Mystery thriller",
    tone: "Unsettling · atmospheric",
    accent: "noir",
    coverKey: "girlDeadMan",
  },
  {
    id: "when-city-stopped-drinking",
    title: "When the City Stopped Drinking",
    premise: "A city-wide rupture exposes the habits, loyalties, and desperation hiding beneath routine.",
    genre: "Speculative drama",
    tone: "Urban · tense",
    accent: "city",
    coverKey: "cityDrinking",
  },
];
