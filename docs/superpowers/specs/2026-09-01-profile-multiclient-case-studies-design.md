# Profile and Multi-Client Case Studies Design

## Goal
Make the portfolio immediately personal and broaden the professional proof beyond three FDE examples. The exact user-uploaded photo becomes the hero profile image and favicon source. A dedicated multi-client startup delivery section explains how Sai handled financial workflows, chatbots, AI workflows, tool-using agents, and increasingly advanced systems across different client environments.

## Identity treatment
- Use the exact uploaded photo, cropped only. No generated or retouched substitute.
- Add a square profile image to the right side of the hero, above the proof metrics.
- On mobile, stack the profile image after the hero copy and before proof metrics.
- Use a tight crop from the same exact photo as the favicon.

## Multi-client startup delivery section
Add a dedicated section after Selected Work and before Experience. It contains anonymized patterns from client/startup delivery and separates them from personal/open-source projects.

Each case study includes:
- Complexity stage
- Client context
- Problem
- Discovery
- Build
- Production controls
- Delivery proof
- Technologies

The cases progress from basic to advanced:
1. Support chatbot
2. Structured AI workflow automation
3. Financial operations and reconciliation workflow
4. Tool-using AI agent
5. Customer onboarding agent
6. Multi-client configurable AI assistant
7. Multi-agent research and operations workflow
8. Natural-language analytics assistant

## Credibility rules
- No invented client names.
- No invented metrics.
- Existing measured metrics can be reused only where already supported in the current portfolio.
- New case studies use implementation evidence and operating controls when numeric proof is unavailable.
- Clearly label the section as anonymized client/startup work.

## UX
- Use compact expandable cards to avoid making the homepage overly long.
- Show complexity and domain badges for scanning.
- Keep the existing Japanese ink visual system and section spacing.
- Preserve keyboard accessibility and mobile stacking.
- Do not use em dashes in visible copy.

## Testing
- Assert the hero references the profile asset.
- Assert the homepage includes the multi-client section in the intended order.
- Assert at least eight anonymized cases exist and cover chatbot, financial, workflow, agent, multi-client, multi-agent, and analytics categories.
- Assert favicon metadata uses the uploaded-photo crop.
- Run existing quality tests and static GitHub Pages production build.
