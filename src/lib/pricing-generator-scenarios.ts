import type { PricingScenarioSlug } from '@/types/pricing-cluster';
import type {
  Scenario,
  ScenarioCategory,
  ScenarioRiskLevel,
  ScenarioSlug,
  ScenarioToneProfile,
} from '@/types/scenario';

type PricingGeneratorScenarioDefinition = {
  slug: PricingScenarioSlug;
  category: ScenarioCategory;
  title: string;
  metaDescription: string;
  heroIntro: string;
  shortDescription: string;
  problemText: string[];
  exampleClientMessage: string;
  exampleReply: string;
  exampleAltReply: string;
  primaryGoal: string;
  avoid: string[];
  preferredMoves: string[];
  relatedSlugs: ScenarioSlug[];
  promptContext: string;
  riskLevel: ScenarioRiskLevel;
  toneProfile: ScenarioToneProfile;
  placeholder: string;
  faq?: Scenario['faq'];
};

function buildPricingGeneratorScenario(
  definition: PricingGeneratorScenarioDefinition
): Scenario {
  return {
    slug: definition.slug,
    category: definition.category,
    title: definition.title,
    seoTitle: `${definition.title} | Flowdockr`,
    metaDescription: definition.metaDescription,
    h1: definition.title,
    heroIntro: definition.heroIntro,
    shortDescription: definition.shortDescription,
    problemText: definition.problemText,
    exampleClientMessage: definition.exampleClientMessage,
    exampleReply: definition.exampleReply,
    exampleAltReply: definition.exampleAltReply,
    strategyBullets: definition.preferredMoves,
    faq:
      definition.faq || [
        {
          q: `What matters most in "${definition.title}"?`,
          a: definition.primaryGoal,
        },
        {
          q: 'What should I avoid?',
          a: definition.avoid.join(' '),
        },
      ],
    relatedSlugs: definition.relatedSlugs,
    promptContext: definition.promptContext,
    riskLevel: definition.riskLevel,
    primaryGoal: definition.primaryGoal,
    avoid: definition.avoid,
    preferredMoves: definition.preferredMoves,
    toneProfile: definition.toneProfile,
    placeholder: definition.placeholder,
  };
}

export const pricingGeneratorScenarios: Scenario[] = [
  buildPricingGeneratorScenario({
    slug: 'client-messaging-outside-work-hours',
    category: 'difficult-clients',
    title: 'Client messaging outside work hours',
    metaDescription:
      'Draft a calm reply that resets after-hours messaging expectations without turning the conversation into a confrontation.',
    heroIntro:
      'Use this when a client messages late at night, on weekends, or outside the response window you want to keep.',
    shortDescription:
      'Reset after-hours communication expectations in a way that sounds normal and professional.',
    problemText: [
      'The client is messaging outside your working hours and may expect a real-time response.',
      'You want to acknowledge the message without normalizing 24/7 access.',
      'The reply should protect the boundary and make the next response window visible.',
    ],
    exampleClientMessage:
      'Sorry for messaging so late, but can you look at this tonight and get back to me as soon as you see it?',
    exampleReply:
      'Thanks for sending this through. I handle project messages in my normal working window rather than in real time outside hours, so I will pick this up then and update you from there.',
    exampleAltReply:
      'I have seen this and will review it in the next working window. Keeping responses inside that window helps me keep timing predictable on both sides.',
    primaryGoal:
      'Protect off-hours without sounding annoyed or making the client feel ignored.',
    avoid: [
      'Do not make the reply sound like a personal complaint.',
      'Do not apologize your way into immediate access.',
      'Do not imply that every after-hours message becomes urgent by default.',
    ],
    preferredMoves: [
      'Acknowledge the message calmly.',
      'Name the normal response window explicitly.',
      'Separate true urgency from standard communication only if needed.',
    ],
    relatedSlugs: [
      'set-boundaries-with-demanding-client',
      'tell-client-you-are-unavailable',
      'client-expects-immediate-response',
    ],
    promptContext:
      'Scenario: client messaging outside work hours. The reply should reset the availability expectation without sounding sharp, personal, or defensive. Keep the tone calm, professional, and boundary-led. If urgency is mentioned, separate true urgent exceptions from normal project communication.',
    riskLevel: 'medium',
    toneProfile: 'calm',
    placeholder:
      'Paste the after-hours client message and any response window you want to reinforce...',
    faq: [
      {
        q: 'What makes this reply work?',
        a: 'Acknowledge the message, set the response window, and keep the tone matter-of-fact rather than emotional.',
      },
      {
        q: 'What should the reply avoid?',
        a: 'Avoid sounding irritated or accidentally teaching the client that after-hours messaging gets instant access.',
      },
    ],
  }),
  buildPricingGeneratorScenario({
    slug: 'set-boundaries-with-demanding-client',
    category: 'difficult-clients',
    title: 'Set boundaries with a demanding client',
    metaDescription:
      'Draft a structured reply that resets a demanding client relationship without escalating tone or sounding personal.',
    heroIntro:
      'Use this when the client keeps pushing on access, responsiveness, flexibility, or open-ended requests.',
    shortDescription:
      'Reset a broader demanding-client pattern instead of solving one message at a time.',
    problemText: [
      'The client is creating pressure across time, access, or request handling.',
      'You need to reset the working model, not just patch one isolated message.',
      'The reply should sound process-led and commercially steady.',
    ],
    exampleClientMessage:
      'We need you to stay flexible on quick asks as they come up, and I need faster replies throughout the day.',
    exampleReply:
      'To keep the project running well, I need to handle requests, revisions, and response timing inside a clearer structure rather than as open-ended live asks. That keeps the work predictable on both sides.',
    exampleAltReply:
      'I want to keep this working smoothly, so it would help to reset a few boundaries around request handling, revisions, and response windows rather than stretching the current setup informally.',
    primaryGoal:
      'Re-establish a professional working model before the relationship becomes reactive and hard to manage.',
    avoid: [
      'Do not make the boundary sound like a mood problem.',
      'Do not respond to a repeated pattern with one-off concessions.',
      'Do not threaten consequences before naming the structure clearly.',
    ],
    preferredMoves: [
      'Describe the working model you need.',
      'Reset the specific expectation that is drifting.',
      'Add a firmer structural consequence only if the pattern is repeated.',
    ],
    relatedSlugs: [
      'client-messaging-outside-work-hours',
      'client-expects-immediate-response',
      'say-no-to-client-professionally',
    ],
    promptContext:
      'Scenario: demanding client boundary reset. The user needs a polite but firm reply that resets communication, scope, or responsiveness norms without sounding emotional. Frame the boundary as a working structure, not a personal complaint.',
    riskLevel: 'high',
    toneProfile: 'firm',
    placeholder:
      'Paste the demanding-client message pattern and the structure you want to reset...',
  }),
  buildPricingGeneratorScenario({
    slug: 'tell-client-you-are-unavailable',
    category: 'difficult-clients',
    title: 'Tell a client you are unavailable',
    metaDescription:
      'Draft a short, reliable reply that says you are unavailable without sounding flaky, guilty, or evasive.',
    heroIntro:
      'Use this when you cannot respond or act in the window the client expects and need a clean way to say it.',
    shortDescription:
      'Say unavailable clearly, give the next realistic window, and keep trust intact.',
    problemText: [
      'The client wants action now, but you are not available in that window.',
      'Too much explanation sounds guilty or unstable.',
      'Too little detail leaves the client unsure when to expect movement.',
    ],
    exampleClientMessage:
      'Can you jump on this now? I need to know if you are available today.',
    exampleReply:
      'I am not available to pick this up right now, but I can come back to it in the next working window and update you from there.',
    exampleAltReply:
      'I am not available to respond to this in real time, so I will return to it in my next working block rather than give you a rushed answer now.',
    primaryGoal:
      'Communicate unavailability in a way that feels dependable rather than reluctant.',
    avoid: [
      'Do not over-explain the reason unless it materially helps.',
      'Do not leave the next window completely vague.',
      'Do not soften the reply so much that the client still expects an immediate answer.',
    ],
    preferredMoves: [
      'State that you are unavailable directly.',
      'Give the next realistic response window if you have one.',
      'Offer a fallback only if there is a real decision deadline.',
    ],
    relatedSlugs: [
      'client-messaging-outside-work-hours',
      'urgent-request-last-minute',
      'refuse-project-due-to-workload',
    ],
    promptContext:
      'Scenario: tell a client you are unavailable. The reply should be calm, brief, and reliable. It should communicate that the user is not available now, optionally give the next realistic window, and avoid sounding flaky, apologetic, or over-explanatory.',
    riskLevel: 'medium',
    toneProfile: 'calm',
    placeholder:
      'Paste the client message and the next time you can realistically respond...',
  }),
  buildPricingGeneratorScenario({
    slug: 'urgent-request-last-minute',
    category: 'difficult-clients',
    title: 'Respond to an urgent last-minute request',
    metaDescription:
      'Draft a reply for a last-minute urgent request that keeps urgency visible, names tradeoffs, and avoids rush overpromises.',
    heroIntro:
      'Use this when the client frames something as urgent at the last minute and you need to answer without blindly absorbing the rush.',
    shortDescription:
      'Handle urgency pressure without turning urgency into your default problem.',
    problemText: [
      'The client wants a fast turnaround on short notice.',
      'If you accept the urgency too fast, you inherit the tradeoff without choosing it.',
      'The reply should protect feasibility, scope, and rush conditions.',
    ],
    exampleClientMessage:
      'This just came up. We need it urgently today. Can you fit it in right away?',
    exampleReply:
      'I understand this is urgent. Before I commit, I want to be clear about what is realistically possible in this window so I do not overpromise.',
    exampleAltReply:
      'If speed is the priority here, the cleanest path is to reduce the immediate scope or treat it as a rush request rather than assume the full version fits the same timeline.',
    primaryGoal:
      'Acknowledge urgency while making the speed, scope, or rush tradeoff explicit.',
    avoid: [
      'Do not promise speed before clarifying what has to give.',
      'Do not accept last-minute urgency as free by default.',
      'Do not answer with panic language that sounds less reliable.',
    ],
    preferredMoves: [
      'Acknowledge the urgency first.',
      'State what is realistically possible in the window.',
      'Tie faster turnaround to scope reduction or explicit rush treatment.',
    ],
    relatedSlugs: [
      'client-expects-immediate-response',
      'client-messaging-outside-work-hours',
      'extra-work-outside-scope',
    ],
    promptContext:
      'Scenario: urgent request at the last minute. The user wants to stay helpful without overpromising or absorbing rush work for free. The reply should make scope, speed, and rush conditions explicit and should not sound defensive.',
    riskLevel: 'high',
    toneProfile: 'decision-oriented',
    placeholder:
      'Paste the urgent request and any real timing or scope constraints...',
  }),
  buildPricingGeneratorScenario({
    slug: 'client-expects-immediate-response',
    category: 'difficult-clients',
    title: 'Client expects an immediate response',
    metaDescription:
      'Draft a reply that resets immediate-response expectations into a stable working cadence without sounding checked out.',
    heroIntro:
      'Use this when the client expects very fast replies as a normal rule and you need to reset the response-time expectation.',
    shortDescription:
      'Move the relationship from reactive immediacy to predictable communication.',
    problemText: [
      'The client is treating instant responses as the default.',
      'The boundary problem is response expectation, not just one message.',
      'The reply should define a dependable cadence the client can work with.',
    ],
    exampleClientMessage:
      'I need quicker answers from you during the day. I expect a faster reply when something comes up.',
    exampleReply:
      'I am not always available to reply immediately, but I do keep a consistent response window during working hours so communication stays predictable.',
    exampleAltReply:
      'For normal project items I reply in my standard working window. If something is genuinely urgent, we can define that separately rather than treat every message as immediate.',
    primaryGoal:
      'Reset the response-time norm while still sounding engaged and dependable.',
    avoid: [
      'Do not make the reply about your frustration.',
      'Do not leave the response window too vague to trust.',
      'Do not imply that immediate replies are available if pressed hard enough.',
    ],
    preferredMoves: [
      'Set the normal response cadence clearly.',
      'Separate urgent from normal communication if needed.',
      'Frame the boundary around predictability rather than personal preference.',
    ],
    relatedSlugs: [
      'client-messaging-outside-work-hours',
      'tell-client-you-are-unavailable',
      'urgent-request-last-minute',
    ],
    promptContext:
      'Scenario: client expects immediate responses. The user needs a reply that resets the response-time expectation into a predictable rhythm, without sounding cold or unavailable. Separate genuine urgency from normal messaging if it helps.',
    riskLevel: 'medium',
    toneProfile: 'calm',
    placeholder:
      'Paste the message and the response cadence you want to maintain...',
  }),
  buildPricingGeneratorScenario({
    slug: 'say-no-to-client-professionally',
    category: 'difficult-clients',
    title: 'Say no to a client professionally',
    metaDescription:
      'Draft a professional no that feels clear, respectful, and complete instead of awkward or over-explained.',
    heroIntro:
      'Use this when you need a general-purpose professional decline that closes the loop without sounding harsh.',
    shortDescription:
      'Decline a client or project clearly without making the message longer than it needs to be.',
    problemText: [
      'You need to say no to the client, but the tone still matters.',
      'Over-explaining turns the reply into a negotiation target.',
      'The message should be respectful, final enough to close, and easy to send.',
    ],
    exampleClientMessage:
      'Would you be interested in taking this on for us?',
    exampleReply:
      'Thanks for thinking of me for this. I am going to pass, but I wanted to let you know clearly rather than leave the conversation hanging.',
    exampleAltReply:
      'I appreciate you reaching out. I do not think I would be the right fit for this as it stands, so I am going to step back rather than force it.',
    primaryGoal:
      'Deliver a clear professional no that closes the loop without unnecessary friction.',
    avoid: [
      'Do not bury the no inside too much politeness.',
      'Do not write a long defense of your decision.',
      'Do not sound guilty enough that the client keeps pushing.',
    ],
    preferredMoves: [
      'Thank them briefly.',
      'State the no clearly.',
      'Use a short fit-based reason only if it helps close the loop.',
    ],
    relatedSlugs: [
      'decline-project-politely',
      'reject-client-without-burning-bridge',
      'refuse-project-due-to-workload',
    ],
    promptContext:
      'Scenario: say no to a client professionally. The user needs a decline that is clear, respectful, and final enough to close the thread. Keep the explanation brief and avoid making the no sound negotiable.',
    riskLevel: 'medium',
    toneProfile: 'warm-firm',
    placeholder:
      'Paste the inquiry and the main reason you want to say no...',
  }),
  buildPricingGeneratorScenario({
    slug: 'decline-project-politely',
    category: 'difficult-clients',
    title: 'Decline a project politely',
    metaDescription:
      'Draft a polite decline that still sounds final enough to end the thread cleanly.',
    heroIntro:
      'Use this when the goal is a respectful project decline that does not leave the client guessing whether you are actually saying no.',
    shortDescription:
      'Keep the tone polite while making the decision unmistakably clear.',
    problemText: [
      'The project is not the right yes, and you need to close the conversation well.',
      'Polite declines often fail because they are too soft to sound final.',
      'The reply should be short, gracious, and complete.',
    ],
    exampleClientMessage:
      'Would you like to move forward with this project with us?',
    exampleReply:
      'Thanks for considering me for this. I am going to pass on the project, but I wanted to let you know clearly rather than leave it open-ended.',
    exampleAltReply:
      'I appreciate the opportunity. I do not think I would be the best fit for this in its current form, so I am going to step back rather than force it.',
    primaryGoal:
      'Close the project discussion with a clear, polite decline that does not invite more negotiation.',
    avoid: [
      'Do not write a polite maybe when the real answer is no.',
      'Do not include so much detail that the client starts solving your reasons.',
      'Do not end with a vague line that reopens the loop.',
    ],
    preferredMoves: [
      'Lead with thanks.',
      'State the decline clearly.',
      'End with a clean closing line rather than an open negotiation prompt.',
    ],
    relatedSlugs: [
      'say-no-to-client-professionally',
      'turn-down-freelance-work-nicely',
      'reject-client-without-burning-bridge',
    ],
    promptContext:
      'Scenario: decline a project politely. The reply should feel kind and respectful, but it must still close the loop clearly. Avoid over-explaining or leaving the project half-open.',
    riskLevel: 'medium',
    toneProfile: 'warm-firm',
    placeholder:
      'Paste the project request and how direct you want the decline to feel...',
  }),
  buildPricingGeneratorScenario({
    slug: 'reject-client-without-burning-bridge',
    category: 'difficult-clients',
    title: 'Reject a client without burning the bridge',
    metaDescription:
      'Draft a respectful decline that protects goodwill and future optionality without reopening the current project.',
    heroIntro:
      'Use this when you need to reject the client but still want the interaction to feel respectful and bridge-safe.',
    shortDescription:
      'Keep the no settled, generous in tone, and free of criticism.',
    problemText: [
      'The fit is wrong, but the relationship may still matter.',
      'A vague no sounds slippery, while a sharp no sounds personal.',
      'The reply should preserve goodwill without weakening the decision.',
    ],
    exampleClientMessage:
      'We would love to work with you on this if you are interested.',
    exampleReply:
      'Thanks again for thinking of me for this. I am going to pass on the current opportunity, but I wanted to let you know directly and respectfully rather than leave it uncertain.',
    exampleAltReply:
      'I do not think I would be the right fit for the current version, so I would rather be honest now than create friction later. I appreciate the opportunity.',
    primaryGoal:
      'Say no clearly while keeping the tone positive enough that the relationship stays intact.',
    avoid: [
      'Do not criticize the client or project more than necessary.',
      'Do not hedge the no so much that the thread stays alive.',
      'Do not promise future openness unless you genuinely mean it.',
    ],
    preferredMoves: [
      'Decline with appreciation.',
      'Ground the no in fit rather than judgment.',
      'Use a selective positive close only if it does not reopen the current discussion.',
    ],
    relatedSlugs: [
      'say-no-to-client-professionally',
      'decline-project-politely',
      'turn-down-freelance-work-nicely',
    ],
    promptContext:
      'Scenario: reject a client without burning the bridge. The reply should hold a clear no, avoid criticism, and preserve goodwill. If future optionality is mentioned, it must not reopen the current project or sound fake.',
    riskLevel: 'medium',
    toneProfile: 'warm-firm',
    placeholder:
      'Paste the inquiry and any relationship context you want the reply to preserve...',
  }),
  buildPricingGeneratorScenario({
    slug: 'turn-down-freelance-work-nicely',
    category: 'difficult-clients',
    title: 'Turn down freelance work nicely',
    metaDescription:
      'Draft a kind but clear decline for freelance work so the message sounds like a decision, not hesitation.',
    heroIntro:
      'Use this when the work is not the right fit and you want a concise, friendly decline that still sounds settled.',
    shortDescription:
      'Turn down freelance work nicely without creating a vague maybe.',
    problemText: [
      'The client mostly wants wording, not a theory lesson.',
      'If the decline is too soft, it sounds like hesitation instead of a decision.',
      'The reply should be warm, brief, and final enough to end the thread.',
    ],
    exampleClientMessage:
      'Are you interested in taking this freelance project on?',
    exampleReply:
      'Thanks for thinking of me for this. I am going to pass on the project, but I wanted to let you know clearly and promptly.',
    exampleAltReply:
      'Thanks again for reaching out. I do not think I would be the right fit for this one, so I am going to step back rather than take it on without the right alignment.',
    primaryGoal:
      'Keep the decline kind and simple while still sounding like a real no.',
    avoid: [
      'Do not soften the answer into a vague maybe.',
      'Do not add a long explanation the client did not ask for.',
      'Do not promise future availability you do not mean.',
    ],
    preferredMoves: [
      'Thank them quickly.',
      'Say no in plain language.',
      'End on a positive note that does not reopen the work.',
    ],
    relatedSlugs: [
      'say-no-to-client-professionally',
      'decline-project-politely',
      'refuse-project-due-to-workload',
    ],
    promptContext:
      'Scenario: turn down freelance work nicely. The response should be kind, concise, and settled. Make the no easy to understand and avoid hedging or over-explaining.',
    riskLevel: 'medium',
    toneProfile: 'warm-firm',
    placeholder:
      'Paste the freelance inquiry and the tone you want for the decline...',
  }),
  buildPricingGeneratorScenario({
    slug: 'refuse-project-due-to-workload',
    category: 'difficult-clients',
    title: 'Refuse a project due to workload',
    metaDescription:
      'Draft a capacity-based project decline that sounds responsible rather than chaotic or unreliable.',
    heroIntro:
      'Use this when the honest reason for the decline is workload or bandwidth and you want the message to sound intentional.',
    shortDescription:
      'Protect current capacity while keeping the decline professional and credible.',
    problemText: [
      'The project may be fine, but your workload makes it a bad yes.',
      'If you phrase it poorly, workload can sound chaotic rather than responsible.',
      'The reply should make capacity protection sound deliberate and professional.',
    ],
    exampleClientMessage:
      'We want to move quickly. Do you have room to take this project on right now?',
    exampleReply:
      'I am at capacity on current commitments, so I would rather decline this now than take it on without enough room to do it well.',
    exampleAltReply:
      'I would not want to commit to this without the bandwidth to handle it properly, so I think the better call is for me to step back on this one.',
    primaryGoal:
      'Decline due to workload in a way that sounds responsible, not overwhelmed.',
    avoid: [
      'Do not describe your workload in a frantic way.',
      'Do not leave the client hanging on a maybe if capacity is the real answer.',
      'Do not imply future availability unless you genuinely want to preserve that path.',
    ],
    preferredMoves: [
      'Name the capacity constraint clearly.',
      'Frame the decision around doing the work well.',
      'Mention a future reconnect only if it is genuinely realistic.',
    ],
    relatedSlugs: [
      'decline-project-politely',
      'turn-down-freelance-work-nicely',
      'tell-client-you-are-unavailable',
    ],
    promptContext:
      'Scenario: refuse a project due to workload. The user needs a professional decline that frames capacity as a responsible delivery decision, not an excuse. Keep the reply clear and avoid sounding chaotic or uncertain.',
    riskLevel: 'medium',
    toneProfile: 'decision-oriented',
    placeholder:
      'Paste the project request and any workload or timing context you want reflected...',
  }),
  buildPricingGeneratorScenario({
    slug: 'say-no-to-low-budget-client',
    category: 'pricing',
    title: 'Say no to a low-budget client',
    metaDescription:
      'Draft a respectful low-budget decline that protects your economics and avoids dragging a weak-fit deal forward.',
    heroIntro:
      'Use this when the client budget is fundamentally too low and the reply should protect standards rather than rescue the deal.',
    shortDescription:
      'Turn an unworkable low-budget inquiry into a clean professional no.',
    problemText: [
      'The current budget is too low to be a workable fit.',
      'Trying to rescue the deal may just drag you into weak economics and weak boundaries.',
      'The reply should sound respectful while clearly declining the current budget.',
    ],
    exampleClientMessage:
      'This is our full budget. Can you still make it work somehow?',
    exampleReply:
      'At that budget, I would not be able to deliver the work to the standard I would be comfortable putting my name on, so I would rather be honest than force a weak fit.',
    exampleAltReply:
      'If the range is fixed, the only workable path would be a materially smaller version rather than the current scope at a lower fee. Otherwise I would rather step back than overpromise.',
    primaryGoal:
      'Decline a low-budget fit cleanly instead of negotiating yourself into underpriced work.',
    avoid: [
      'Do not shame the client for their budget.',
      'Do not accept a non-viable scope just to keep the lead alive.',
      'Do not leave the door open so broadly that the same weak budget keeps returning.',
    ],
    preferredMoves: [
      'Name the fit mismatch plainly.',
      'Offer a smaller version only if it is truly viable.',
      'Keep any future-open door tied to a real budget or scope change.',
    ],
    relatedSlugs: [
      'stand-firm-on-pricing',
      'budget-limited',
      'discount-request',
    ],
    promptContext:
      'Scenario: say no to a low-budget client. The reply should protect economics and professionalism, not shame the client or collapse into a weak concession. If a smaller version is mentioned, it must be materially smaller and genuinely workable.',
    riskLevel: 'high',
    toneProfile: 'warm-firm',
    placeholder:
      'Paste the budget message and, if relevant, the minimum workable scope or range...',
  }),
  buildPricingGeneratorScenario({
    slug: 'stand-firm-on-pricing',
    category: 'pricing',
    title: 'Stand firm on pricing',
    metaDescription:
      'Draft a calm, structured hold on pricing that sounds deliberate rather than stiff or defensive.',
    heroIntro:
      'Use this when the client is pushing for movement on price and you want to hold the line without sounding tense.',
    shortDescription:
      'Hold price through structure, not bravado.',
    problemText: [
      'The client is pushing for a lower number, but conceding would weaken the deal.',
      'The tone needs to sound calm and commercially grounded.',
      'The reply should hold the rate while offering a structured alternative path if needed.',
    ],
    exampleClientMessage:
      'We want to move ahead, but only if the rate is a bit more flexible.',
    exampleReply:
      'I would prefer to keep the pricing where it is, since it reflects the current scope and the standard needed for the result we discussed. If something needs to move, I would rather adjust the structure than lower the same work blindly.',
    exampleAltReply:
      'If budget is the issue, the cleaner path is a smaller version rather than the same scope at a lower fee. I would rather keep the pricing logic intact than soften the rate without changing the work.',
    primaryGoal:
      'Hold the line on price while sounding structured, calm, and workable.',
    avoid: [
      'Do not over-explain your rate defensively.',
      'Do not sound rigid for its own sake.',
      'Do not hold price with no next-step option at all.',
    ],
    preferredMoves: [
      'State the hold calmly.',
      'Tie the number back to scope and standard.',
      'Offer a smaller yes instead of a blind discount if the budget is real.',
    ],
    relatedSlugs: [
      'discount-request',
      'quote-too-high',
      'say-no-to-low-budget-client',
    ],
    promptContext:
      'Scenario: stand firm on pricing. The user wants a reply that holds the current rate without sounding combative or defensive. Re-anchor the number to scope and delivery standard, and use a smaller-scope alternative instead of a blind discount if needed.',
    riskLevel: 'medium',
    toneProfile: 'warm-firm',
    placeholder:
      'Paste the pricing pushback and any scope or budget context you want the reply to use...',
  }),
];

export const dedicatedPricingGeneratorScenarioSlugs = pricingGeneratorScenarios.map(
  (scenario) => scenario.slug
);

const dedicatedPricingGeneratorScenarioSlugSet = new Set<ScenarioSlug>(
  dedicatedPricingGeneratorScenarioSlugs
);

export function isDedicatedPricingGeneratorScenarioSlug(
  slug: string
): slug is PricingScenarioSlug {
  return dedicatedPricingGeneratorScenarioSlugSet.has(slug);
}
