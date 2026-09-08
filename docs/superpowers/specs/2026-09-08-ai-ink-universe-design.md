# AI Ink Universe Portfolio Design

## Goal

Transform Sai Nitish Reddy Kapa's existing Suminagashi portfolio into a premium AI-first personal universe that communicates four identities clearly and truthfully: AI builder, forward deployed engineer, founder/product builder, and writer/teacher.

The redesign must preserve the strongest parts of the current site: the real profile photo, the three Japanese-inspired visual themes, recruiter-friendly evidence, accessible motion, and the existing project/case-study data.

## Public positioning

Primary identity:

> Sai Nitish Reddy Kapa is an AI builder and forward deployed engineer who turns ambiguous real-world problems into shipped AI systems.

Supporting identities:

- Applied AI and agentic systems engineer
- AI governance and evaluation practitioner
- Founder and product builder behind the Syrava ecosystem
- Undergraduate instructor/guest educator on jailbreaks, AI safety, and AI governance
- Writer under the Asta pen name

The site must never imply credentials, revenue, clients, scale, or outcomes that are not already supported by the repository or explicitly supplied by Sai.

## Visual direction

### Core idea

"AI Ink Universe": ancient Japanese ink aesthetics combined with modern AI systems thinking.

The visual system should feel editorial, technical, atmospheric, and premium, not like a generic neon AI landing page.

### Existing theme engines to preserve

- Suminagashi: fluid ink marbling
- Shodo/calligraphy: expressive brush motion
- Bushido/samurai: sharper scar-like motion

### Palette and surface language

Keep the existing rice, silver, charcoal, ink, copper, and soft-accent tokens. Continue using translucent charcoal surfaces with restrained blur, hairline borders, and copper as the primary accent.

### Typography

Keep the existing serif display voice for large narrative headings and the current mono-label system for technical labels. Body copy must remain highly readable and spacious.

### Portrait treatment

`public/profile.webp` remains the real profile image and is a first-class hero asset. It should not be replaced by an illustration or AI-generated portrait.

## Information architecture

1. Hero
2. AI identity rail
3. Ask Nitish grounded portfolio guide
4. AI Universe
5. Featured work
6. Startup case studies
7. AI safety and governance teaching
8. Experience
9. Projects
10. About / founder / writer perspective
11. Why hire me
12. Certifications and principles
13. Contact

## Hero

The first viewport must immediately communicate that Sai builds AI systems and products.

Headline direction:

> I build AI systems, products, and agents that survive contact with reality.

Supporting copy should mention agentic AI, data and API integration, production delivery, evaluation, and governance.

The hero keeps the real photo and measurable proof blocks. It adds a concise identity line that allows recruiter, founder, and builder visitors to understand the breadth without making the opening viewport crowded.

## AI identity rail

A narrow, editorial strip directly after the hero highlights four public identities:

- AI Builder
- Forward Deployed Engineer
- Founder / Product Builder
- AI Safety Educator

Each item should have one short sentence, not a card wall.

## Ask Nitish grounded portfolio guide

Add an interactive recruiter-focused portfolio guide. It must be useful even without an external API key.

Version 1 behavior:

- Client-side prompt input
- Suggested questions
- Grounded answers assembled only from a curated public knowledge base in the repo
- Keyword and intent matching for topics such as AI, agents, governance, teaching, projects, Syrava, experience, writing, and hiring
- Clear empty-state and no-match responses
- No claim that an external large language model is being used

The interface may be titled "Ask Nitish" with supporting text "A grounded guide to my work". This avoids misleading visitors while giving the interaction an AI-assistant feel.

Future model-backed behavior can be added separately when a provider/key is explicitly configured.

## AI Universe

Introduce a signature section that organizes the portfolio around systems rather than a flat repo list.

Required groups:

- Agents and infrastructure
- Developer tools
- Consumer AI
- Health and fitness AI
- Language and voice
- Knowledge and research
- Evaluation, privacy, compliance, and governance
- Public good and climate
- Syrava ecosystem

Each group has:

- a strong title
- a one-sentence description
- a small set of representative project names already present in the user's portfolio/repositories
- a focus tag such as agents, multimodal, evals, computer vision, data, or integrations

The visual pattern should be a staggered rail/constellation rather than a repetitive nine-card grid.

## AI safety, jailbreaks, and governance teaching

Add a dedicated section with the user-supplied statement that Sai teaches undergraduate classes/workshops about:

- AI jailbreaks and adversarial prompting
- AI safety
- AI governance

The section should explain the educational purpose in professional language: understanding failure modes, responsible system design, evaluations, controls, human oversight, and governance.

Do not describe operational jailbreak bypass steps or unsafe exploit instructions. The public portfolio copy should frame this as safety education and responsible AI practice.

Suggested heading:

> I teach the failure modes, not just the happy path.

Suggested supporting copy:

> I teach undergraduate sessions on AI jailbreaks, AI safety, and AI governance. The goal is to help students understand how AI systems fail, how misuse happens, and how evaluations, guardrails, human oversight, and governance reduce risk in real deployments.

## Founder and product-builder narrative

The portfolio should make it obvious that Sai is not only completing isolated demos. The Syrava ecosystem and the breadth of shipped experiments/products should be presented as evidence of product taste, rapid iteration, and systems thinking.

Do not invent company traction or customer counts.

## Writer identity

The About section may acknowledge writing under the Asta pen name as evidence of long-form creativity and narrative thinking. This should remain secondary to the AI/engineering story so recruiters are not confused by the site purpose.

## Navigation

Desktop navigation should remain concise. Recommended items:

- AI
- Work
- Safety
- Experience
- Projects
- About
- Contact

Mobile navigation preserves the current full-screen readable surface.

## Responsive behavior

- Hero image remains prominent but does not crowd the headline on mobile
- Identity rail becomes a vertical editorial list on narrow screens
- Ask Nitish stacks input and suggestions cleanly
- AI Universe keeps hierarchy without horizontal overflow
- Teaching section remains readable and avoids tiny chips
- All interactive controls retain visible focus states and large touch targets

## Motion

Use restrained Framer Motion reveals and the existing background engines. Avoid decorative motion that competes with the user's photo or makes text harder to read. Respect reduced-motion preference.

## Accessibility

- Semantic section headings
- Form labels for Ask Nitish
- `aria-live` region for guide answers
- Keyboard-operable suggested questions
- Existing skip link retained
- Contrast maintained across all three themes and light/dark modes

## Copy constraints

- No em dashes in visible portfolio copy
- No fabricated metrics
- No inflated titles beyond claims explicitly supplied by the user
- No statement that the local portfolio guide is a large language model
- AI safety teaching is framed defensively and educationally

## Verification requirements

- Update static quality tests to assert the new section order and required teaching copy
- Assert the real profile photo is still used
- Assert visible copy remains free of em dashes
- Run `npm test`
- Run a production `npm run build`
- Check desktop and mobile composition through a deployed preview or browser render when available
