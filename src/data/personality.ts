/**
 * Personality, dreams, and "why hire me" section.
 * Supports two modes: humble and hire-me.
 */

export interface WhyHireMe {
  humble: {
    heading: string;
    intro: string;
    traits: { title: string; description: string }[];
  };
  hireMeMode: {
    heading: string;
    intro: string;
    traits: { title: string; description: string }[];
  };
}

export const whyHireMe: WhyHireMe = {
  humble: {
    heading: "Why work with me?",
    intro:
      "I'm just someone who loves building things and telling stories. If you're looking for someone who cares deeply, thinks before acting, and genuinely believes in growing together, maybe we're a match.",
    traits: [
      {
        title: "I'm actually funny",
        description:
          "Not in a trying-too-hard way. Just... genuinely enjoy making people laugh and don't take myself too seriously.",
      },
      {
        title: "I grow old with orgs",
        description:
          "I don't bounce around. I want to find a place where we can build something lasting together, where the org becomes the best version of itself and I'm part of that journey.",
      },
      {
        title: "Humble and hungry",
        description:
          "I know there's always more to learn. I listen more than I talk, ask questions before concluding, and genuinely celebrate others' wins.",
      },
      {
        title: "I love otters 🦦",
        description:
          "Small things bring me joy. Kindness matters. If I'd stop to pet an otter, I'll definitely stop to help a teammate.",
      },
      {
        title: "Long-term crypto believer",
        description:
          "I don't chase pumps. I hold. It's not about get-rich schemes—it's about believing in something and staying committed through cycles.",
      },
      {
        title: "Loyal to a fault",
        description:
          "I feel genuinely bad canceling free trials. That's just how I'm wired. If I commit to something, I show up.",
      },
    ],
  },
  hireMeMode: {
    heading: "Why hire me?",
    intro:
      "I build products that matter, ship fast, and lead with empathy. I'm looking for a company where I can grow roots—somewhere we can build something legendary together.",
    traits: [
      {
        title: "Builder with storytelling DNA",
        description:
          "I ship products, not just code. 2M+ views as a webnovel author means I know how to engage, iterate based on feedback, and keep readers (users) coming back.",
      },
      {
        title: "Genuinely funny and human",
        description:
          "Culture matters. I bring levity without being a distraction, build trust through authenticity, and make hard problems feel solvable.",
      },
      {
        title: "Company loyalist",
        description:
          "I'm looking to stay. Not for 2 years—for 10+. The kind of person who invests in org culture, mentors juniors, and genuinely cares about collective wins.",
      },
      {
        title: "Strategic thinker",
        description:
          "GTM analysis, network effects, incentive design. I think systems-first, not task-first. I see how moves ripple.",
      },
      {
        title: "Long-term conviction over hype",
        description:
          "Like my approach to crypto—I hold through cycles. I evaluate decisions by 5-year outcomes, not quarterly metrics.",
      },
      {
        title: "Reliability incarnate",
        description:
          "I don't cancel on people. Ever. That loyalty extends to projects, teams, and orgs. When you need someone, I'm there.",
      },
    ],
  },
};

export const dreams = {
  near: [
    "Voice over an anime character (seriously)",
    "Launch my own manhwa (Korean web comic)",
    "Restart the webnovel—2M+ readers are waiting for the next arc",
  ],
  career:
    "I want to build products that millions use and love. Not alone—with a team that feels like family. Where we all grow old together watching the org become legendary.",
};

export const otterFacts = [
  "Otters hold hands while sleeping so they don't drift apart.",
  "They're one of the few animals that use tools.",
  "They're endlessly curious and playful.",
  "They mate for life in some species.",
  "They're honestly just perfect.",
];
