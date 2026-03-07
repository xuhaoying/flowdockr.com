const EXAMPLES_BY_SLUG: Record<string, string> = {
  'lowball-offer': `
Quality calibration example:

Client message:
"Your quote is higher than expected. Another freelancer said they can do it for $300."

Good style:
Recommended reply should re-anchor on value, avoid racing to the bottom, and offer reduced scope as a structured alternative.
Alternative reply should keep the same strategy but use a different framing.
Strategy bullets should explain value anchoring, boundary protection, and structured next step.

Bad style to avoid:
- over-apologetic tone
- immediate discounting
- generic filler like "thank you so much for your honesty"
- shallow strategy bullets with no negotiation logic
`.trim(),
  'delayed-decision': `
Quality calibration example:

Client message:
"Thanks, we'll review internally and get back to you soon."

Good style:
Recommended reply should reopen momentum with low pressure, offer clarification help, and make it easy to respond.
Alternative reply should remain respectful and concise with a decision-oriented next step.
Strategy bullets should mention momentum, response ease, and low-pressure tone.

Bad style to avoid:
- pushy urgency
- guilt pressure
- threat-style follow-up language
- long emotional explanation
`.trim(),
};

export function getCalibrationExample(scenarioSlug: string): string | null {
  return EXAMPLES_BY_SLUG[scenarioSlug] || null;
}
