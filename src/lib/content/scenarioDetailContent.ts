import { getScenarioPageBySlug } from '@/lib/content/scenarioPages';
import type { CanonicalScenario } from '@/types/scenario-catalog';

export type ScenarioToneExample = {
  tone: 'Concise' | 'Warm' | 'Firm';
  text: string;
  bestFor: string;
};

export type ScenarioFaqItem = {
  question: string;
  answer: string;
};

export type ScenarioDistinction = {
  href: string;
  label: string;
  description: string;
};

export type ScenarioDetailContent = {
  intentSummary: string;
  useWhen: string[];
  notFor: string[];
  steps: Array<{
    title: string;
    body: string;
  }>;
  toneExamples: ScenarioToneExample[];
  mistakes: string[];
  faq: ScenarioFaqItem[];
  distinctions: ScenarioDistinction[];
};

type GeneratorScenarioDetail = {
  exampleReply?: string;
  exampleAltReply?: string;
  avoid?: string[];
};

const scenarioDetailOverrides: Record<string, ScenarioDetailContent> = {
  'discount-request': {
    intentSummary:
      'Use this when the client is asking for a discount before the terms are firm and you need to stay cooperative without making your rate feel arbitrary.',
    useWhen: [
      'The client asks directly for a discount, lower rate, or better number.',
      'They mention future work, volume, or a long-term relationship before committing to anything specific.',
      'You are open to adjusting structure, but not to cutting the same scope for the same expectations.',
    ],
    notFor: [
      'A competitor comparison where the main issue is another provider being cheaper.',
      'A true budget cap where the client has already shared a fixed range.',
      'A small final discount ask at signature stage; use the closing-stage page instead.',
    ],
    steps: [
      {
        title: 'Acknowledge without conceding',
        body: 'Show that you heard the budget pressure, but do not answer the discount request with an instant yes or a defensive explanation.',
      },
      {
        title: 'Protect the pricing logic',
        body: 'Tie the current price back to scope, delivery standard, timeline, and decision risk so the number does not sound flexible on command.',
      },
      {
        title: 'Offer a structured tradeoff',
        body: 'If there is room to move, trade against reduced scope, faster commitment, clearer terms, or a defined package rather than a vague discount.',
      },
    ],
    toneExamples: [
      {
        tone: 'Concise',
        text: 'I can look at structure, but I would not reduce the same scope without changing something real behind it. If budget is the constraint, we can tighten the scope or phase the work.',
        bestFor:
          'Use when the conversation is still warm and you want to keep momentum.',
      },
      {
        tone: 'Warm',
        text: 'I understand wanting to make the numbers work. The current price reflects the scope we discussed, so rather than discounting the full version, I would suggest we look at priorities and shape a leaner option if needed.',
        bestFor:
          'Use when relationship tone matters and the client may still be a good fit.',
      },
      {
        tone: 'Firm',
        text: 'I would keep the quoted rate for the current scope. If the budget needs to come down, the clean path is to reduce scope or change terms, not keep the same deliverables at a lower price.',
        bestFor:
          'Use when the client is testing leverage or repeating the ask.',
      },
    ],
    mistakes: [
      'Apologizing for your price before the client has explained the real constraint.',
      'Offering a discount because the client hints at future work without a concrete commitment.',
      'Explaining every cost line in a way that invites line-item negotiation.',
    ],
    faq: [
      {
        question: 'Should I ever give a discount when a client asks?',
        answer:
          'Yes, but only when the discount is attached to a real tradeoff such as reduced scope, faster payment, a committed package, or lower delivery complexity.',
      },
      {
        question: 'What if the client promises long-term work?',
        answer:
          'Treat long-term work as a structure to define, not as a reason to discount the first project. Ask for a retainer, volume commitment, or phased agreement.',
      },
      {
        question: 'How do I avoid sounding rigid?',
        answer:
          'Hold the rate calmly and offer options. The tone should be collaborative, but the economics should stay explicit.',
      },
    ],
    distinctions: [
      {
        href: '/pricing/client-asking-for-discount',
        label: 'Client asking for discount pricing pillar',
        description:
          'Use the pricing pillar when you want the broader negotiation framework, risks, and next decision paths.',
      },
      {
        href: '/scenario/ten-percent-off-request',
        label: '10 percent off request',
        description:
          'Use this when the client names a specific percentage and ties it to approval speed.',
      },
      {
        href: '/scenario/meet-their-budget',
        label: 'Meet their budget',
        description:
          'Use this when the issue is a real budget ceiling and the answer should reshape scope.',
      },
    ],
  },
  'ten-percent-off-request': {
    intentSummary:
      'Use this when the client frames a specific percentage discount as the final thing needed to approve the project.',
    useWhen: [
      'The ask is specific, like 10% off, and sounds small enough to pressure a quick yes.',
      'The client connects the discount to speed, approval, or signing today.',
      'You need to decide whether to hold price, trade terms, or repackage the offer.',
    ],
    notFor: [
      'Broad discount pressure with no specific percentage or close-stage context.',
      'A competitor comparison where they are asking you to match another quote.',
      'A true low-budget situation where the project needs a smaller scope.',
    ],
    steps: [
      {
        title: 'Slow down the percentage frame',
        body: 'Do not let the small number make the concession feel automatic. Treat it as a commercial change, not a courtesy detail.',
      },
      {
        title: 'Ask what the discount solves',
        body: 'Clarify whether the blocker is approval process, total budget, payment timing, or internal optics.',
      },
      {
        title: 'Trade for something concrete',
        body: 'If you move, attach it to immediate signature, cleaner payment terms, reduced scope, or a narrower first phase.',
      },
    ],
    toneExamples: [
      {
        tone: 'Concise',
        text: 'I would prefer to keep the current pricing as quoted. If 10% is needed for approval, we can look at a reduced scope or adjusted terms instead of discounting the same work.',
        bestFor:
          'Use when you want to hold the line without prolonging the thread.',
      },
      {
        tone: 'Warm',
        text: 'I understand the approval pressure. The quote reflects the scope we aligned on, so I would rather solve the constraint by adjusting scope or terms than simply remove 10% from the same deliverables.',
        bestFor:
          'Use when the client is close to signing and tone still matters.',
      },
      {
        tone: 'Firm',
        text: 'I cannot take 10% off the current scope by default. If the budget needs to change, the scope or terms need to change with it.',
        bestFor:
          'Use when the client is turning the percentage into a condition.',
      },
    ],
    mistakes: [
      'Treating a 10% ask as harmless when it resets the client expectation for future negotiation.',
      'Trading margin for a vague promise of approval instead of a signed agreement or clear term.',
      'Saying yes before confirming whether scope, payment, or timing can change.',
    ],
    faq: [
      {
        question: 'Is a small percentage discount safer than a large one?',
        answer:
          'Not automatically. Even a small discount can train the client to ask late and expect movement unless you tie it to a real exchange.',
      },
      {
        question: 'What should I ask before agreeing?',
        answer:
          'Ask whether the issue is total budget, approval optics, payment timing, or scope. The answer determines what you can trade.',
      },
      {
        question: 'What if approval really depends on the discount?',
        answer:
          'You can offer a smaller version or a term-based trade, but avoid reducing unchanged work just to pass an internal approval step.',
      },
    ],
    distinctions: [
      {
        href: '/pricing/small-discount-before-closing',
        label: 'Small discount before closing',
        description:
          'The canonical pricing page for final small-discount pressure near signature.',
      },
      {
        href: '/scenario/discount-request',
        label: 'General discount request',
        description:
          'Use when the client asks for a discount without a specific percentage or close-stage condition.',
      },
      {
        href: '/scenario/best-price-before-signing',
        label: 'Best price before signing',
        description:
          'Use when the client asks for your final number but does not name a percentage.',
      },
    ],
  },
  'negotiate-price-email-reply': {
    intentSummary:
      'Use this when the client negotiates price over email and you need wording that is calm, short, and hard to misread.',
    useWhen: [
      'The message is written, not live, so tone and structure carry more weight.',
      'The client asks about flexibility but has not explained the real constraint.',
      'You need to keep the reply concise enough that it does not invite a long debate.',
    ],
    notFor: [
      'A detailed pricing strategy page where you need multiple negotiation paths.',
      'A scope-creep issue where the price pressure is caused by extra work.',
      'A final signature-stage discount request with a specific close condition.',
    ],
    steps: [
      {
        title: 'Open with a calm acknowledgement',
        body: 'Keep the first sentence neutral so the email does not read as defensive.',
      },
      {
        title: 'Name your pricing basis',
        body: 'Connect the number to scope, assumptions, and the result instead of debating whether the price is fair in the abstract.',
      },
      {
        title: 'Give one next path',
        body: 'Offer a scope adjustment, a quick call, or a narrower option. Avoid leaving the door open to vague back-and-forth.',
      },
    ],
    toneExamples: [
      {
        tone: 'Concise',
        text: 'Thanks for asking. The price reflects the scope we discussed. If budget is the blocker, I can suggest a leaner version rather than reduce the same scope.',
        bestFor:
          'Use when the email thread is short and you want to keep it moving.',
      },
      {
        tone: 'Warm',
        text: 'I understand wanting to check flexibility before moving forward. The quote is based on the scope and delivery standard we outlined, but I am happy to look at a smaller version if that better fits the budget.',
        bestFor:
          'Use when the client is reasonable and you want to preserve warmth.',
      },
      {
        tone: 'Firm',
        text: 'I would keep the current price for the current scope. If the budget changes, we should adjust the scope or terms so expectations stay aligned.',
        bestFor:
          'Use when the client is pushing for price movement without tradeoffs.',
      },
    ],
    mistakes: [
      'Writing a long justification email that creates more points to negotiate.',
      'Answering with a lower number before asking what constraint the client is solving.',
      'Using vague phrases like "I can be flexible" without defining what changes.',
    ],
    faq: [
      {
        question: 'How long should a price negotiation email be?',
        answer:
          'Usually short. A useful reply acknowledges the ask, protects the pricing logic, and offers one structured next step.',
      },
      {
        question: 'Should I explain my costs in the email?',
        answer:
          'Only at a high level. Over-explaining costs can turn the conversation into line-item negotiation.',
      },
      {
        question: 'What is the safest alternative to discounting?',
        answer:
          'Offer a reduced scope, phased start, or clearer terms so any lower number changes the commitment too.',
      },
    ],
    distinctions: [
      {
        href: '/pricing/client-negotiating-price',
        label: 'Client negotiating price',
        description:
          'The canonical pricing page for broader price negotiation strategy.',
      },
      {
        href: '/scenario/discount-request',
        label: 'Client asks for a discount',
        description:
          'Use when the email is specifically a discount request rather than broad flexibility.',
      },
      {
        href: '/pricing/stand-firm-on-pricing',
        label: 'Stand firm on pricing',
        description:
          'Use when your decision is to hold price clearly with minimal negotiation.',
      },
    ],
  },
  'extra-revision-rounds': {
    intentSummary:
      'Use this when the client has already used or exceeded the agreed revision rounds and is asking to keep iterating as if more rounds are included.',
    useWhen: [
      'The agreement included a revision cap or clear approval rounds.',
      'The client is asking for more rounds, not just one clarified fix.',
      'You want to keep helping but need the next work to be paid or explicitly scoped.',
    ],
    notFor: [
      'A pre-contract request for unlimited revisions; use the revision-policy page.',
      'A broader scope-creep pattern involving new deliverables or features.',
      'A quality issue where the original deliverable did not meet the agreed brief.',
    ],
    steps: [
      {
        title: 'Refer to the agreed revision boundary',
        body: 'Use factual wording. Mention the included revision rounds without blaming the client.',
      },
      {
        title: 'Separate fixes from new rounds',
        body: 'Clarify whether the request is a correction inside the brief or a new round of subjective refinement.',
      },
      {
        title: 'Offer a paid continuation path',
        body: 'Give a simple option for another round, hourly refinement, or a scoped follow-up phase.',
      },
    ],
    toneExamples: [
      {
        tone: 'Concise',
        text: 'The included revision rounds are now complete. I can continue refining, but I would treat the next round as additional work and quote it separately.',
        bestFor:
          'Use when the boundary is clear and the client needs a direct answer.',
      },
      {
        tone: 'Warm',
        text: 'Happy to keep helping this land well. Since we have used the included revision rounds, the next set of changes would need to be handled as an additional round so timing and scope stay clear.',
        bestFor:
          'Use when the relationship is good and you want to preserve momentum.',
      },
      {
        tone: 'Firm',
        text: 'I cannot include unlimited extra revision rounds under the current fee. If you want to continue, I can price the next round or we can prioritize the remaining changes.',
        bestFor:
          'Use when the client is treating open-ended revisions as expected.',
      },
    ],
    mistakes: [
      'Letting "just one more round" repeat until the revision cap becomes meaningless.',
      'Arguing about whether the feedback is reasonable instead of clarifying the agreement.',
      'Continuing work without naming the cost, approval point, or final handoff.',
    ],
    faq: [
      {
        question: 'Should I charge for extra revision rounds?',
        answer:
          'Yes when the included rounds are complete and the new feedback changes or extends the agreed work. Keep the explanation factual.',
      },
      {
        question: 'How do I avoid sounding petty?',
        answer:
          'Frame the boundary around timeline, quality, and clear approval, not frustration with the client.',
      },
      {
        question: 'What if the feedback is small?',
        answer:
          'You can make a one-time courtesy fix, but name it as a courtesy so it does not become the new baseline.',
      },
    ],
    distinctions: [
      {
        href: '/pricing/client-requesting-additional-revisions',
        label: 'Additional revisions pricing page',
        description:
          'The canonical pricing page for extra revision requests and paid continuation paths.',
      },
      {
        href: '/scenario/unlimited-revisions',
        label: 'Unlimited revisions',
        description:
          'Use when the client wants unlimited revisions before or during terms discussion.',
      },
      {
        href: '/scenario/scope-creep-polite-response',
        label: 'Scope creep polite response',
        description:
          'Use when revisions are part of a broader pattern of expanding work.',
      },
    ],
  },
  'scope-creep-polite-response': {
    intentSummary:
      'Use this when small extra asks are beginning to pile up and you need to make the boundary visible before the pattern becomes the project norm.',
    useWhen: [
      'The client is asking for additions that sound small one by one.',
      'You want to keep the relationship cooperative while stopping silent scope expansion.',
      'The right answer is not a hard no, but a structured choice.',
    ],
    notFor: [
      'A single clearly out-of-scope item that needs a separate quote immediately.',
      'A revision-policy issue where the problem is extra rounds, not new scope.',
      'A bad-fit client situation where you should exit rather than reset scope.',
    ],
    steps: [
      {
        title: 'Name the pattern early',
        body: 'Use neutral language like "this is starting to expand the original scope" before the extra work feels normal.',
      },
      {
        title: 'Keep the door open with options',
        body: 'Offer an add-on, a swap, or a later phase so the client can still move forward without getting free scope.',
      },
      {
        title: 'Reset the approval point',
        body: 'Ask the client to choose priorities before you continue. The boundary should create a decision, not a fight.',
      },
    ],
    toneExamples: [
      {
        tone: 'Concise',
        text: 'Happy to look at that. Since these requests are starting to expand the original scope, the cleanest next step is to choose whether we add it, swap it, or save it for a later phase.',
        bestFor: 'Use when the client is reasonable and the pattern is early.',
      },
      {
        tone: 'Warm',
        text: 'I can see why that would be useful. To keep the project clean, I would separate this from the current scope and decide together whether it should be added now, traded against another item, or queued for a follow-up phase.',
        bestFor: 'Use when you want the boundary to feel collaborative.',
      },
      {
        tone: 'Firm',
        text: 'That request sits outside the current scope, so I cannot fold it into the existing fee by default. I can quote it separately or we can reprioritize the current deliverables.',
        bestFor: 'Use when the client has repeated extra asks.',
      },
    ],
    mistakes: [
      'Calling it "scope creep" in a way that makes the client feel accused.',
      'Absorbing small extras until the project no longer matches the original budget.',
      'Saying "no problem" before deciding whether the work is an add-on, swap, or later phase.',
    ],
    faq: [
      {
        question: 'How early should I mention scope creep?',
        answer:
          'As soon as the pattern appears. Early wording can stay light and practical; late wording often feels like a confrontation.',
      },
      {
        question: 'Can I say yes and still protect scope?',
        answer:
          'Yes. Say yes to discussing the request, then make the client choose between add-on budget, tradeoff, or later phase.',
      },
      {
        question: 'What phrase keeps it polite?',
        answer:
          'Use "this is starting to expand the original scope" rather than blaming the client or saying they are causing scope creep.',
      },
    ],
    distinctions: [
      {
        href: '/pricing/client-asking-for-extra-work',
        label: 'Client asking for extra work',
        description:
          'The canonical pricing page for extra-work requests and scope-boundary decisions.',
      },
      {
        href: '/scenario/extra-work-outside-scope',
        label: 'Extra work outside scope',
        description:
          'Use when the new request is clearly outside the existing agreement.',
      },
      {
        href: '/scenario/extra-revision-rounds',
        label: 'Extra revision rounds',
        description:
          'Use when the issue is more revisions than agreed rather than new deliverables.',
      },
    ],
  },
};

export function getScenarioDetailContent(
  page: CanonicalScenario,
  generatorScenario?: GeneratorScenarioDetail | null
): ScenarioDetailContent {
  const override = scenarioDetailOverrides[page.slug];

  if (override) {
    return override;
  }

  return {
    intentSummary: buildDefaultIntentSummary(page),
    useWhen: [
      page.userSituation,
      page.userGoal || page.strategyPrimary,
      `The client's wording is close to: "${page.primaryClientMessage}"`,
    ],
    notFor: buildDefaultNotFor(page),
    steps: [
      {
        title: 'Confirm the real pressure',
        body: page.userSituation,
      },
      {
        title: 'Lead with the strongest boundary',
        body: page.strategyPrimary,
      },
      {
        title: 'Give the client a clean next step',
        body: page.strategySecondary || page.toolPromptIntent,
      },
    ],
    toneExamples: buildDefaultToneExamples(page, generatorScenario),
    mistakes: buildDefaultMistakes(page, generatorScenario),
    faq: buildDefaultFaq(page),
    distinctions: buildDefaultDistinctions(page),
  };
}

function buildDefaultIntentSummary(page: CanonicalScenario): string {
  const secondary = page.searchIntentSecondary
    ? ` It also covers searches like "${page.searchIntentSecondary}".`
    : '';

  return `Use this when the search intent is "${page.searchIntentPrimary}" and the client message matches this negotiation stage.${secondary}`;
}

function buildDefaultNotFor(page: CanonicalScenario): string[] {
  if (page.cluster === 'pricing') {
    return [
      'A payment collection issue after work has already been delivered.',
      'A scope-creep issue where the real problem is added work, not price pressure.',
      'A client relationship issue where you already know you should decline the project.',
    ];
  }

  if (page.cluster === 'scope') {
    return [
      'A pure pricing objection before scope is defined.',
      'A late-payment or deposit issue.',
      'A situation where you need to end the client relationship entirely.',
    ];
  }

  if (page.cluster === 'payment') {
    return [
      'A pre-sale discount or pricing objection.',
      'An extra-work request that should be quoted as scope.',
      'A general follow-up where no payment boundary exists yet.',
    ];
  }

  return [
    'A materially different negotiation stage.',
    'A message where the client is asking for payment, scope, or pricing changes outside this scenario.',
    'A situation where you need legal or contract-specific advice.',
  ];
}

function buildDefaultToneExamples(
  page: CanonicalScenario,
  generatorScenario?: GeneratorScenarioDetail | null
): ScenarioToneExample[] {
  return [
    {
      tone: 'Concise',
      text:
        generatorScenario?.exampleReply ||
        `${page.strategyPrimary} ${page.strategySecondary || ''}`.trim(),
      bestFor: 'Use when you need a short reply that keeps the thread moving.',
    },
    {
      tone: 'Warm',
      text:
        generatorScenario?.exampleAltReply ||
        `I understand the request. ${page.strategyPrimary} ${page.strategySecondary || ''}`.trim(),
      bestFor:
        'Use when you want to preserve trust while still keeping the boundary clear.',
    },
    {
      tone: 'Firm',
      text: `${page.strategyPrimary} If the client wants a different path, make the tradeoff explicit before you continue.`,
      bestFor:
        'Use when the client is repeating the pressure or treating the boundary as optional.',
    },
  ];
}

function buildDefaultMistakes(
  page: CanonicalScenario,
  generatorScenario?: GeneratorScenarioDetail | null
): string[] {
  if (generatorScenario?.avoid?.length) {
    return generatorScenario.avoid.slice(0, 3);
  }

  return [
    'Responding too quickly before naming the real decision you need from the client.',
    'Over-explaining your position until the reply sounds defensive.',
    `Ignoring the core move: ${page.strategyPrimary}`,
  ];
}

function buildDefaultFaq(page: CanonicalScenario): ScenarioFaqItem[] {
  return [
    {
      question: `What should I focus on first in "${page.title}"?`,
      answer: page.strategyPrimary,
    },
    {
      question: 'When should I use a softer tone?',
      answer:
        'Use a softer tone when the client is still collaborative and the pressure looks like uncertainty rather than bad faith.',
    },
    {
      question: 'What should the reply accomplish?',
      answer: page.userGoal || page.strategySecondary || page.toolPromptIntent,
    },
  ];
}

function buildDefaultDistinctions(
  page: CanonicalScenario
): ScenarioDistinction[] {
  const relatedSlugs = [
    ...(page.similarScenarioSlugs || []),
    ...(page.nextStepScenarioSlugs || []),
    ...(page.relatedScenarioSlugs || []),
  ];
  const seen = new Set<string>();
  const distinctions: ScenarioDistinction[] = [];

  for (const slug of relatedSlugs) {
    if (slug === page.slug || seen.has(slug)) {
      continue;
    }

    const related = getScenarioPageBySlug(slug);

    if (!related) {
      continue;
    }

    seen.add(slug);
    distinctions.push({
      href: `/scenario/${related.slug}`,
      label: related.title,
      description: related.userSituation,
    });

    if (distinctions.length >= 3) {
      break;
    }
  }

  return distinctions;
}
