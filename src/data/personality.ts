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
      "I'm a Forward Deployed Engineer who genuinely likes sitting with a problem — and the people who have it — until it's shipped. If you want someone who cares deeply, listens first, and grows alongside your team, maybe we're a match.",
    traits: [
      {
        title: "I go to where the problem is",
        description:
          "I don't build from a distance. I embed, watch the real workflow, and build against the messy reality — that's where forward deployed work earns its keep.",
      },
      {
        title: "I ship, then I stay",
        description:
          "Getting a system live is the start, not the finish. I hand over docs, runbooks, and governance so the team can own what I built — and I stick around to make it stick.",
      },
      {
        title: "Humble and hungry",
        description:
          "There's always more to learn. I listen more than I talk, ask questions before concluding, and I'm actively trying to talk to more people to sharpen how I communicate.",
      },
      {
        title: "I love otters 🦦",
        description:
          "Small things bring me joy. Kindness matters. If I'd stop to pet an otter, I'll definitely stop to unblock a teammate.",
      },
      {
        title: "I care that AI stays accountable",
        description:
          "I'm training toward an AI governance certification because shipping fast and shipping responsibly shouldn't be a trade-off. Evals, oversight, and audit trails come standard.",
      },
      {
        title: "Loyal to a fault",
        description:
          "If I commit to something, I show up. That reliability extends to clients, teammates, and the systems I put my name on.",
      },
    ],
  },
  hireMeMode: {
    heading: "Why hire me?",
    intro:
      "I'm a Forward Deployed Engineer: I embed with teams, turn real problems into deployed AI software, and keep it governed. FDE-certified through Educative, training toward an AI governance credential, and always looking for the next hard problem — and the next good conversation.",
    traits: [
      {
        title: "Prototype-to-production, fast",
        description:
          "I've taken AI prototypes from 'nice demo' to systems a team relies on daily — in weeks, not quarters — by shipping thin working slices and iterating from real usage.",
      },
      {
        title: "Deep integration, not workarounds",
        description:
          "I wire into the customer's actual stack: data, auth, APIs, and internal tools. Solutions that survive contact with production, not glue that breaks on Monday.",
      },
      {
        title: "Governance built in",
        description:
          "Evaluations, drift monitoring, human-in-the-loop approvals, and audit logs. I ship AI you can point an auditor at, not a black box you cross your fingers over.",
      },
      {
        title: "Fluent between code and stakeholders",
        description:
          "The FDE superpower is moving between the terminal and the conversation. I translate ambiguous requirements into architecture and back into plain language.",
      },
      {
        title: "Always improving my communication",
        description:
          "I deliberately reach out and talk to more people because clear communication is half the job. I'd rather over-communicate and align than ship in silence.",
      },
      {
        title: "Reliability incarnate",
        description:
          "I don't cancel on people. Ever. That loyalty extends to clients, teams, and the systems I deploy. When you need someone in the trenches, I'm there.",
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
