export const outputFormatInstructions = `
Return valid JSON only with this exact shape:

{
  "strategy": {
    "objective": "string",
    "why_it_works": ["string", "string"],
    "what_to_avoid": ["string", "string"],
    "negotiation_framing": "string"
  },
  "replies": {
    "professional": "string",
    "firm": "string",
    "softer": "string"
  },
  "risk_insights": ["string", "string"],
  "follow_up": {
    "reply": "string",
    "direction": "string"
  }
}

Rules:
- Return JSON only. No markdown fences.
- Return all required keys exactly as written. No extra keys.
- All reply fields must be directly sendable client-facing text.
- "firm" should be stronger than "professional" without becoming hostile.
- "softer" should preserve boundaries while sounding more accommodating.
- Keep strategy fields short and concrete.
- Include at least 1 meaningful risk insight. If the risk is low, write a neutral caution.
- Include a practical follow-up reply for the case where the client pushes again.
- Do not collapse multiple bullets into a single string.
`.trim();

export type RawModelSections = {
  strategy: {
    objective: string;
    why_it_works: string[];
    what_to_avoid: string[];
    negotiation_framing: string;
  };
  replies: {
    professional: string;
    firm: string;
    softer: string;
  };
  risk_insights: string[];
  follow_up: {
    reply: string;
    direction: string;
  };
};
