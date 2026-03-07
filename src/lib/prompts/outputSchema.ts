export const outputFormatInstructions = `
Return your answer in the following exact structure:

Recommended reply:
<directly sendable reply>

Alternative reply:
<second directly sendable reply>

Strategy:
- <bullet 1>
- <bullet 2>
- <bullet 3>

Rules:
- The two replies must not be identical.
- The alternative reply should offer a slightly different phrasing angle, not just a trivial paraphrase.
- Strategy bullets must explain negotiation logic.
- Keep each strategy bullet short and concrete.
- Do not add any extra sections.
`.trim();

export type RawModelSections = {
  recommendedReply: string;
  alternativeReply: string;
  strategy: string[];
};
