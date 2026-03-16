const EXAMPLES_BY_SLUG: Record<string, string> = {
  'quote-too-high': `
Quality calibration example:

Client message:
"Your quote seems a bit high for what we expected."

Good style:
The professional reply should re-anchor on value, avoid racing to the bottom, and offer reduced scope as a structured alternative.
The firm reply should keep boundaries clearer without sounding hostile.
The softer reply should remain calm and workable without giving away pricing too early.
The strategy block should explain value anchoring, boundary protection, and a structured next step.
Risk insight should warn against fast discounting or over-explaining.

Bad style to avoid:
- over-apologetic tone
- immediate discounting
- generic filler like "thank you so much for your honesty"
- shallow strategy bullets with no negotiation logic
`.trim(),
  'lowball-offer': `
Quality calibration example:

Client message:
"Your quote is higher than expected. Another freelancer said they can do it for $300."

Good style:
The professional reply should re-anchor on value, avoid racing to the bottom, and offer reduced scope as a structured alternative.
The firm reply should keep boundaries clearer without sounding hostile.
The softer reply should remain calm and workable without giving away pricing too early.
The strategy block should explain value anchoring, boundary protection, and structured next step.
Risk insight should warn against fast discounting or over-explaining.

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
The professional reply should reopen momentum with low pressure, offer clarification help, and make it easy to respond.
The firm reply should keep the ask clearer and more decision-oriented.
The softer reply should remain respectful and concise.
The strategy block should mention momentum, response ease, and low-pressure tone.
Risk insight should warn against sounding needy or chasing too hard.

Bad style to avoid:
- pushy urgency
- guilt pressure
- threat-style follow-up language
- long emotional explanation
`.trim(),
  'ghosted-after-rate': `
Quality calibration example:

Client message:
"Thanks, I'll get back to you."

Good style:
The professional reply should reopen momentum with low pressure, offer clarification help, and make it easy to respond.
The firm reply should keep the ask clearer and more decision-oriented.
The softer reply should remain respectful and concise.
The strategy block should mention momentum, response ease, and low-pressure tone.
Risk insight should warn against sounding needy or chasing too hard.

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
