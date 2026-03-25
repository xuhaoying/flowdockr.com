import type { PricingScenario } from '@/types/pricing-cluster';

const pricingGuideLinks = [
  {
    href: '/guides/how-to-negotiate-freelance-pricing',
    label: 'How to negotiate freelance pricing',
  },
  {
    href: '/guides/when-to-discount-and-when-not-to',
    label: 'When to discount and when not to',
  },
];

const scopeGuideLinks = [
  {
    href: '/guides/reduce-scope-instead-of-lowering-rate',
    label: 'Reduce scope instead of lowering your rate',
  },
  {
    href: '/guides/how-to-negotiate-freelance-pricing',
    label: 'How to negotiate freelance pricing',
  },
];

const corePricingScenarios: PricingScenario[] = [
  {
    tier: 'tier1',
    featured: true,
    slug: 'price-pushback-after-proposal',
    title: 'Price pushback after proposal',
    seoTitle:
      'How to Respond When a Prospect Says Your Quote Is Too High | Flowdockr',
    metaDescription:
      'Learn how to respond when a prospect says your quote is too high after reviewing your proposal. Protect your rate, keep the deal alive, and generate a tailored reply with Flowdockr.',
    primaryKeyword: 'quote too high',
    keywordVariants: [
      'price too high',
      'rate too high',
      'too expensive proposal',
      'how to respond to a price objection',
      'proposal too expensive',
    ],
    heroSubtitle:
      'Handle price pushback after sending a proposal without discounting too early.',
    shortDescription:
      'Prospect reviews your proposal, says it feels expensive, and you need to keep leverage.',
    situationSnapshot: [
      'You already shared a proposal or quote and the prospect says the number feels high.',
      'This stage is often a negotiation signal, not an immediate rejection.',
      'If you react too fast, you can lose anchor before real constraints are clear.',
    ],
    whatsReallyHappening: [
      'The buyer may be testing flexibility rather than rejecting value.',
      'You are balancing two risks: discounting too early or sounding too rigid.',
      'Your response needs calm structure, not defensive over-explaining.',
    ],
    realGoals: [
      'Keep the deal alive without lowering your rate by default.',
      'Test whether the budget issue is real or tactical.',
      'Move toward scoped options instead of blind concessions.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Hold value without conceding',
        whenToUse:
          'Use when interest is still strong and price pushback feels exploratory.',
        risk: 'If phrasing is too hard, the prospect may read it as inflexibility.',
        exampleWording:
          'Thanks for sharing that. The quote reflects the scope and outcome we aligned on. If helpful, I can clarify where the core value sits so we can decide the best next step.',
      },
      {
        id: 'B',
        title: 'Test whether budget is real',
        whenToUse:
          'Use when you are unsure if this is budget reality or negotiation habit.',
        risk: 'If you ask vaguely, the conversation can stay abstract and circular.',
        exampleWording:
          'Understood. Can you share the working range you need to stay within so I can tell you whether we should adjust scope or keep the current structure?',
      },
      {
        id: 'C',
        title: 'Reframe through scope, not rate',
        whenToUse:
          'Use when budget may be constrained but project fit is still good.',
        risk: 'If scope changes are not explicit, expectations will drift later.',
        exampleWording:
          'If budget is the main constraint, I can suggest a leaner scope that keeps the critical outcome strong while lowering total project cost.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Thanks for the honest feedback. If budget is the main issue, we can look at adjusting the scope while keeping the core outcome strong.',
      },
      {
        tone: 'Warm',
        text: 'I understand the quote may feel high at first glance. The pricing reflects the scope and level of work involved, but if budget is the main constraint, I’m happy to explore a leaner version that still gets you the key result.',
      },
      {
        tone: 'Firm',
        text: 'The quote is based on the scope and standard required for the project. If needed, we can discuss a reduced scope, but I’d prefer not to compromise the quality by lowering the rate without changing the work involved.',
      },
    ],
    faq: [
      {
        q: 'Should you lower your rate immediately when a prospect says your quote is too high?',
        a: 'Usually no. First determine whether the pressure is tactical pushback or a true budget limit.',
      },
      {
        q: 'How do you tell whether this is a real budget issue or a negotiation tactic?',
        a: 'Ask for the working range and decision constraints before discussing concessions.',
      },
      {
        q: 'Is it better to reduce scope or offer a discount?',
        a: 'In most cases, reducing scope is safer because it preserves your pricing logic and delivery quality.',
      },
    ],
    nextDecisionSlugs: [
      'discount-pressure-before-signing',
      'budget-lower-than-expected',
      'cheaper-competitor-comparison',
    ],
    guideLinks: [
      {
        href: '/guides/how-to-negotiate-freelance-pricing',
        label: 'How to negotiate freelance pricing',
      },
      {
        href: '/guides/when-to-discount-and-when-not-to',
        label: 'When to discount and when not to',
      },
    ],
    generatorScenarioSlug: 'quote-too-high',
    toolCta:
      'Paste the prospect’s exact message, your quote, and the tone you want. Flowdockr will draft a reply that protects your rate without sounding defensive.',
  },

  {
    tier: 'tier1',
    featured: true,
    slug: 'discount-pressure-before-signing',
    title: 'Discount pressure before signing',
    seoTitle: 'How to Handle Discount Pressure Before Signing | Flowdockr',
    metaDescription:
      'Learn how to respond when a prospect asks for a discount right before signing. Protect your margin, keep leverage, and generate a tailored reply with Flowdockr.',
    primaryKeyword: 'ask for discount before signing',
    keywordVariants: [
      'discount before closing',
      'lower price before moving forward',
      'can you lower your rate before we start',
      'final discount request',
    ],
    heroSubtitle:
      'Keep the deal moving without training the client to expect last-minute concessions.',
    shortDescription:
      'Closing-stage conversation where the buyer explicitly asks for a lower number.',
    situationSnapshot: [
      'The buyer is close to committing but asks for a discount before signature.',
      'This stage creates urgency and often triggers avoidable concessions.',
      'Your pricing anchor is most vulnerable right before close.',
    ],
    whatsReallyHappening: [
      'They are testing late-stage leverage, not necessarily rejecting your value.',
      'A quick concession can weaken both this deal and future negotiations.',
      'You need a close-oriented reply that preserves structure and tone.',
    ],
    realGoals: [
      'Protect margin while keeping the conversation constructive.',
      'Trade any flexibility for explicit terms instead of giving it away.',
      'Close with clarity, not pressure-induced compromise.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Hold the price and reaffirm fit',
        whenToUse:
          'Use when deal quality is strong and scope is already aligned.',
        risk: 'Too much rigidity can create unnecessary friction near close.',
        exampleWording:
          'I’d prefer to keep the current pricing as quoted since it reflects the agreed scope. If everything else is aligned, I can move straight to final signature details.',
      },
      {
        id: 'B',
        title: 'Trade, don’t concede',
        whenToUse:
          'Use when you are open to movement only with reciprocal commitments.',
        risk: 'If trade terms are vague, the concession becomes a pure margin leak.',
        exampleWording:
          'If we confirm this week and keep payment terms as proposed, I can offer a revised option tied to that commitment.',
      },
      {
        id: 'C',
        title: 'Offer a smaller version',
        whenToUse:
          'Use when budget is constrained but collaboration still makes sense.',
        risk: 'Without scope precision, reduced budget can still carry full expectations.',
        exampleWording:
          'Rather than discounting unchanged scope, I can share a leaner version that fits a lower range while keeping delivery realistic.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I’d prefer to keep the pricing as quoted, since it reflects the agreed scope. If helpful, we can look at adjusting the scope rather than reducing the rate.',
      },
      {
        tone: 'Warm',
        text: 'I’d love to make this work, and I also want to keep the project set up properly from the start. The quoted rate reflects the current scope, so rather than discounting directly, I’d be happy to discuss a lighter version if that helps.',
      },
      {
        tone: 'Firm',
        text: 'At this stage I’d prefer not to reduce the rate without changing the scope. If budget is the concern, the best next step is to adjust deliverables rather than compress the pricing.',
      },
    ],
    faq: [
      {
        q: 'Should you give a discount right before the deal closes?',
        a: 'Only if it is intentional and tied to explicit terms, not as a reflexive concession.',
      },
      {
        q: 'What can you offer instead of a discount?',
        a: 'You can trade for scope adjustments, faster approvals, or stronger payment terms.',
      },
      {
        q: 'How do you avoid sounding rigid when you hold your price?',
        a: 'Use calm language, explain structure, and provide a workable alternative path.',
      },
    ],
    nextDecisionSlugs: [
      'client-asking-for-discount',
      'small-discount-before-closing',
      'stand-firm-on-pricing',
    ],
    guideLinks: [
      {
        href: '/guides/when-to-discount-and-when-not-to',
        label: 'When to discount and when not to',
      },
      {
        href: '/guides/how-to-negotiate-freelance-pricing',
        label: 'How to negotiate freelance pricing',
      },
    ],
    generatorScenarioSlug: 'discount-request',
    toolCta:
      'Paste the exact discount request and your current offer. Flowdockr will help you reply without weakening your position right before the deal closes.',
  },

  {
    tier: 'tier1',
    featured: true,
    slug: 'budget-lower-than-expected',
    title: 'Budget lower than expected',
    seoTitle:
      'How to Respond When the Budget Is Lower Than Your Quote | Flowdockr',
    metaDescription:
      'Learn how to handle low-budget projects without lowering your rate by default. Use scope reduction, option framing, and tailored replies with Flowdockr.',
    primaryKeyword: 'budget lower than quote',
    keywordVariants: [
      'lower budget than expected',
      'limited budget project',
      'small budget freelance project',
      'how to reduce scope instead of price',
    ],
    heroSubtitle:
      'Protect your pricing logic by reshaping the project, not shrinking your value.',
    shortDescription:
      'Budget and quote do not align, but the project may still be worth pursuing.',
    situationSnapshot: [
      'The prospect shares a budget that is clearly below your current quote.',
      'This may be a real constraint, not always a negotiation tactic.',
      'You need to preserve quality and economics if you continue the conversation.',
    ],
    whatsReallyHappening: [
      'The deal may still be viable if scope and sequencing are redesigned.',
      'Lowering rate on unchanged scope creates delivery and margin risk.',
      'A structured alternative protects your pricing model and client trust.',
    ],
    realGoals: [
      'Assess whether the budget constraint is fixed or flexible.',
      'Offer a reduced-scope structure without collapsing your rate logic.',
      'Keep deal momentum when there is still strategic fit.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Reduce scope, keep quality',
        whenToUse:
          'Use when project fit is strong but full scope is unrealistic at current budget.',
        risk: 'If scope cuts are vague, expectations become mismatched later.',
        exampleWording:
          'At that budget, the cleanest path is a reduced scope that protects the key outcome rather than lowering rate on the full version.',
      },
      {
        id: 'B',
        title: 'Offer tiered options',
        whenToUse: 'Use when you want to test the buyer’s true decision range.',
        risk: 'Too many options can confuse decision-making if not clearly prioritized.',
        exampleWording:
          'I can send two scoped options so you can choose between a lean version now and an expanded version when budget allows.',
      },
      {
        id: 'C',
        title: 'Decline respectfully',
        whenToUse:
          'Use when the budget gap is too large for credible delivery.',
        risk: 'Direct decline can end relationship if tone sounds dismissive.',
        exampleWording:
          'Given the current budget range, I would not be able to deliver this scope to the expected standard, so it may be better to pause for now.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Thanks for sharing the budget. At that level, the best option would be to reduce scope rather than lower the rate for the current scope.',
      },
      {
        tone: 'Warm',
        text: 'Thanks for being transparent about the budget. I don’t think the current scope would be realistic at that level, but I’d be happy to suggest a leaner version that still delivers the core outcome.',
      },
      {
        tone: 'Firm',
        text: 'The current quote reflects the work required for this scope. If the available budget is lower, we’d need to adjust deliverables rather than reduce the rate for the same project.',
      },
    ],
    faq: [
      {
        q: 'Should you accept lower-budget projects?',
        a: 'Yes, but only when scope and expectations are reset to match the budget.',
      },
      {
        q: 'How do you reduce scope without looking inflexible?',
        a: 'Frame it as priority sequencing and outcome protection, not refusal.',
      },
      {
        q: 'What if the project is a great fit but the budget is too small?',
        a: 'Offer a phased or reduced version that preserves delivery quality and rate integrity.',
      },
    ],
    nextDecisionSlugs: [
      'more-work-same-price',
      'say-no-to-low-budget-client',
      'decline-underpaid-project-politely',
    ],
    guideLinks: [
      {
        href: '/guides/reduce-scope-instead-of-lowering-rate',
        label: 'Reduce scope instead of lowering your rate',
      },
      {
        href: '/guides/how-to-negotiate-freelance-pricing',
        label: 'How to negotiate freelance pricing',
      },
    ],
    generatorScenarioSlug: 'budget-limited',
    toolCta:
      'Paste the client’s budget, your original quote, and what parts of the project matter most. Flowdockr will help you draft a reply that restructures the work without underpricing yourself.',
  },

  {
    tier: 'tier1',
    featured: true,
    slug: 'cheaper-competitor-comparison',
    title: 'Cheaper competitor comparison',
    seoTitle:
      'How to Respond When a Prospect Says Someone Else Is Cheaper | Flowdockr',
    metaDescription:
      'Learn how to respond when a prospect compares your price to a cheaper competitor. Reframe value, avoid price wars, and generate a tailored reply with Flowdockr.',
    primaryKeyword: 'another freelancer is cheaper',
    keywordVariants: [
      'competitor quoted less',
      'someone else offered a lower price',
      'cheaper option comparison',
      'lower quote from another provider',
    ],
    heroSubtitle:
      'Stay out of commodity pricing and bring the conversation back to fit, quality, and outcomes.',
    shortDescription:
      'Client brings a cheaper quote into the negotiation and pressures you to match.',
    situationSnapshot: [
      'You are being compared directly against a lower-priced competitor.',
      'The buyer may be testing elasticity rather than making a final decision.',
      'A reactive price match can erase your strategic differentiation.',
    ],
    whatsReallyHappening: [
      'The decision frame has shifted to pure price unless you reset criteria quickly.',
      'Over-explaining can sound defensive and reduce perceived confidence.',
      'You need to clarify fit and scope differences without attacking competitors.',
    ],
    realGoals: [
      'Avoid entering a race-to-the-bottom pricing dynamic.',
      'Reframe the decision around outcomes and delivery reliability.',
      'Qualify whether this is a fit client or a commodity buyer.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Reframe around outcomes',
        whenToUse:
          'Use when buyer still values quality and delivery confidence.',
        risk: 'Abstract claims can fail if you do not connect to concrete scope.',
        exampleWording:
          'Totally fair to compare options. The key is whether scope, process, and support levels are truly equivalent to the outcome you want.',
      },
      {
        id: 'B',
        title: 'Clarify differences in scope',
        whenToUse:
          'Use when you suspect the compared quote is not apples-to-apples.',
        risk: 'Too much detail can overwhelm instead of clarifying.',
        exampleWording:
          'I can map the scope side by side so you can see the practical difference in deliverables, support, and delivery standards.',
      },
      {
        id: 'C',
        title: 'Bless and release',
        whenToUse:
          'Use when buyer clearly optimizes only for the lowest number.',
        risk: 'You may lose short-term volume while improving client fit quality.',
        exampleWording:
          'If lowest cost is the primary criterion, I may not be the right fit for this engagement, and that is completely okay.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'That makes sense. Pricing can vary a lot depending on scope, process, and level of support, so it may be worth checking whether the deliverables are directly comparable.',
      },
      {
        tone: 'Warm',
        text: 'I understand, and it’s completely reasonable to compare options. In many cases the difference comes down to scope, level of involvement, and how the work is handled, so I’d be happy to clarify what’s included on my side if that helps you evaluate fairly.',
      },
      {
        tone: 'Firm',
        text: 'A lower quote doesn’t always reflect the same scope or standard. If price is the only decision factor, I may not be the right fit, but if you want the outcome this proposal is designed for, I’m happy to walk through the differences clearly.',
      },
    ],
    faq: [
      {
        q: 'How do you respond when a client says someone else is cheaper?',
        a: 'Acknowledge comparison, then reframe around scope, fit, and delivery quality.',
      },
      {
        q: 'Should you match a competitor’s lower price?',
        a: 'Usually no, unless scope and standards are truly equivalent and still economically viable.',
      },
      {
        q: 'How do you compare proposals without entering a price war?',
        a: 'Use side-by-side scope clarity and outcomes-based decision criteria.',
      },
    ],
    nextDecisionSlugs: [
      'discount-pressure-before-signing',
      'budget-lower-than-expected',
      'price-pushback-after-proposal',
    ],
    guideLinks: [
      {
        href: '/guides/how-to-negotiate-freelance-pricing',
        label: 'How to negotiate freelance pricing',
      },
      {
        href: '/guides/when-to-discount-and-when-not-to',
        label: 'When to discount and when not to',
      },
    ],
    generatorScenarioSlug: 'cheaper-freelancer',
    toolCta:
      'Paste the competitor comparison message and your offer details. Flowdockr will help you reply without slipping into a defensive price war.',
  },

  {
    tier: 'tier2',
    slug: 'more-work-same-price',
    title: 'More work for the same price',
    seoTitle:
      'How to Respond When They Want More Work for the Same Price | Flowdockr',
    metaDescription:
      'Learn how to handle extra requests without opening the door to unpaid scope creep. Set boundaries, re-quote clearly, and generate a tailored reply with Flowdockr.',
    primaryKeyword: 'more work same price',
    keywordVariants: [
      'extra deliverables same budget',
      'more scope without more pay',
      'expanded scope same fee',
      'more revisions same price',
    ],
    heroSubtitle:
      'Protect the project boundary before “just one more thing” becomes a new scope.',
    shortDescription:
      'Client asks for extra tasks, revisions, or deliverables under the original budget.',
    situationSnapshot: [
      'The request sounds small but expands effort beyond the original agreement.',
      'If you accept silently, baseline expectations shift for the rest of the project.',
      'This is a scope boundary issue that often masquerades as a service attitude issue.',
    ],
    whatsReallyHappening: [
      'The client may not intentionally exploit scope unless boundaries are explicit.',
      'One casual yes can normalize unpaid expansion and timeline drift.',
      'You need process clarity more than emotional resistance.',
    ],
    realGoals: [
      'Clarify included scope before discussing added work.',
      'Protect relationship while keeping economics and timeline sane.',
      'Route added requests into re-quote or phased alternatives.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Clarify what’s included',
        whenToUse:
          'Use when request may come from unclear scope understanding.',
        risk: 'If phrasing is vague, the boundary still remains ambiguous.',
        exampleWording:
          'Happy to support that direction. This request sits outside the current scope, so we can either keep the existing plan or scope the addition properly.',
      },
      {
        id: 'B',
        title: 'Re-quote the expanded scope',
        whenToUse:
          'Use when added work materially changes effort or delivery timeline.',
        risk: 'If you skip explicit pricing update, expansion becomes implicit default.',
        exampleWording:
          'I can add these deliverables with an updated quote so expectations stay clear on both sides.',
      },
      {
        id: 'C',
        title: 'Offer phased delivery',
        whenToUse:
          'Use when you want to preserve goodwill without absorbing full expansion now.',
        risk: 'Phasing fails if priorities and boundaries are not documented.',
        exampleWording:
          'If useful, we can keep current budget for phase one and schedule these additions as phase two.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Happy to help. That request would sit outside the current scope, so I can either quote it separately or suggest a lighter adjustment to fit the existing budget.',
      },
      {
        tone: 'Warm',
        text: 'I’m glad to support the direction you’re aiming for. Since this would add to the original scope, the cleanest option is either to quote the extra work separately or reshape priorities within the current budget.',
      },
      {
        tone: 'Firm',
        text: 'That request goes beyond the scope covered in the current pricing. I’m happy to add it, but it would need either a revised quote or a change in deliverables elsewhere.',
      },
    ],
    faq: [
      {
        q: 'How do you say no to extra work professionally?',
        a: 'Use neutral scope language and present options instead of emotional pushback.',
      },
      {
        q: 'When should you re-quote instead of absorbing the request?',
        a: 'Re-quote when added work changes effort, risk, or timeline beyond minor courtesy scope.',
      },
      {
        q: 'What if the client says it’s only a small addition?',
        a: 'Decide intentionally: either one-time courtesy with explicit boundary or scoped add-on.',
      },
    ],
    nextDecisionSlugs: [
      'client-asking-for-extra-work',
      'client-requesting-additional-revisions',
      'say-no-to-scope-creep-politely',
    ],
    guideLinks: [
      {
        href: '/guides/reduce-scope-instead-of-lowering-rate',
        label: 'Reduce scope instead of lowering your rate',
      },
    ],
    generatorScenarioSlug: 'extra-work-outside-scope',
    toolCta:
      'Paste the extra request and your original scope. Flowdockr will help you respond clearly without sounding defensive or opening the door to unpaid work.',
  },

  {
    tier: 'tier2',
    slug: 'free-trial-work-request',
    title: 'Free trial work request',
    seoTitle: 'How to Respond to a Free Trial Work Request | Flowdockr',
    metaDescription:
      'Learn how to respond when a prospect asks for unpaid trial work. Protect your boundaries, offer paid alternatives, and generate a tailored reply with Flowdockr.',
    primaryKeyword: 'free trial work request',
    keywordVariants: [
      'unpaid sample work',
      'unpaid test project',
      'spec work request',
      'can you do a sample first',
    ],
    heroSubtitle: 'Stay professional without normalizing unpaid proof-of-work.',
    shortDescription: 'Prospect asks for free sample work before commitment.',
    situationSnapshot: [
      'The prospect requests unpaid test work to evaluate fit.',
      'You want to protect boundaries without sounding hostile.',
      'This often determines whether the relationship starts with healthy expectations.',
    ],
    whatsReallyHappening: [
      'Decision risk is being shifted onto your unpaid labor.',
      'If you open this boundary early, downstream scope and payment pressure often increase.',
      'You need an alternative path that keeps trust but protects your process.',
    ],
    realGoals: [
      'Set a clear no-unpaid-custom-work boundary.',
      'Offer portfolio or paid test alternatives.',
      'Qualify whether this lead is viable long-term.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Offer portfolio proof instead',
        whenToUse:
          'Use when you have relevant prior work that demonstrates fit quickly.',
        risk: 'Examples that are too generic may fail to resolve trust concern.',
        exampleWording:
          'I don’t provide unpaid custom trial work, but I can share relevant examples and process detail so you can evaluate fit clearly.',
      },
      {
        id: 'B',
        title: 'Offer a paid test',
        whenToUse:
          'Use when buyer needs tailored proof and you want a fair trial structure.',
        risk: 'Test can sprawl unless scope and timeline are tightly defined.',
        exampleWording:
          'If you want a tailored validation step, we can run a small paid test with fixed scope and timeline.',
      },
      {
        id: 'C',
        title: 'Decline and qualify the lead',
        whenToUse: 'Use when unpaid work is a hard requirement and fit is low.',
        risk: 'May end opportunity, but protects future negotiation standards.',
        exampleWording:
          'If unpaid trial work is required before engagement, this may not be the right fit on my side.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I don’t usually provide unpaid trial work, but I’m happy to share relevant examples or discuss a small paid test if that would help.',
      },
      {
        tone: 'Warm',
        text: 'I understand why you’d want to see fit before moving forward. I don’t take on unpaid trial work, but I’d be glad to share similar work or set up a small paid test piece if that helps you decide with confidence.',
      },
      {
        tone: 'Firm',
        text: 'I don’t provide free trial work as part of my process. If you’d like to assess fit, the best options are reviewing relevant examples or arranging a paid test engagement.',
      },
    ],
    faq: [
      {
        q: 'Should freelancers do unpaid trial work?',
        a: 'Usually no for custom work. It often creates misaligned risk and weak boundaries.',
      },
      {
        q: 'What can you offer instead of a free sample?',
        a: 'Offer relevant portfolio proof, a case walkthrough, or a tightly scoped paid test.',
      },
      {
        q: 'How do you say no without losing the opportunity?',
        a: 'Acknowledge evaluation needs, state your policy, and provide practical alternatives.',
      },
    ],
    nextDecisionSlugs: [
      'can-you-do-it-cheaper',
      'budget-lower-than-expected',
      'more-work-same-price',
    ],
    guideLinks: [
      {
        href: '/guides/how-to-negotiate-freelance-pricing',
        label: 'How to negotiate freelance pricing',
      },
    ],
    generatorScenarioSlug: 'free-sample-request-response',
    toolCta:
      'Paste the free-trial request and your preferred boundary. Flowdockr will draft a response that stays professional without giving away unpaid work.',
  },

  {
    tier: 'tier3',
    slug: 'can-you-do-it-cheaper',
    title: 'Can you do it cheaper?',
    seoTitle:
      'How to Respond When They Ask “Can You Do It Cheaper?” | Flowdockr',
    metaDescription:
      'Learn how to respond when someone asks if you can do it cheaper. Use scope options, protect your pricing, and find the right next move with Flowdockr.',
    primaryKeyword: 'can you do it cheaper',
    keywordVariants: [
      'can you make it cheaper',
      'do you offer a lower price',
      'lower-cost option',
      'reduce price request',
    ],
    heroSubtitle:
      'A common question, but not always the same decision problem underneath.',
    shortDescription:
      'High-frequency direct price-cut request that needs fast triage.',
    situationSnapshot: [
      'This is often the shortest and most common negotiation line you will receive.',
      'It can map to multiple underlying pressures: pushback, discount, or budget mismatch.',
      'The goal is to classify pressure quickly before choosing a deeper path.',
    ],
    whatsReallyHappening: [
      'The phrase itself is ambiguous and should trigger diagnosis, not automatic concessions.',
      'Responding with immediate discount weakens your anchor before facts are clear.',
      'This page acts as entry routing into the correct pillar decision page.',
    ],
    realGoals: [
      'Clarify what the real constraint is.',
      'Protect pricing while keeping tone calm.',
      'Route conversation into the right strategic branch.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Clarify the real constraint',
        whenToUse:
          'Use when message is short and intent behind the ask is unclear.',
        risk: 'If too many questions are asked, momentum can drop.',
        exampleWording:
          'Possibly, depending on scope priorities. Which outcome matters most to you within budget?',
      },
      {
        id: 'B',
        title: 'Offer a smaller version',
        whenToUse: 'Use when you suspect budget is the real issue.',
        risk: 'If scope is not narrowed clearly, full-scope expectations remain.',
        exampleWording:
          'Instead of lowering rate on full scope, I can suggest a lighter version that fits a lower range.',
      },
      {
        id: 'C',
        title: 'Hold your position',
        whenToUse:
          'Use when scope fit is strong and price pressure appears tactical.',
        risk: 'Too blunt delivery can feel inflexible.',
        exampleWording:
          'I wouldn’t reduce the rate for the same scope, but I can help structure a reduced-scope option if needed.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Possibly, depending on what part of the scope matters most. If budget is tight, the cleanest option is usually to reduce scope rather than lower the rate for the same work.',
      },
      {
        tone: 'Warm',
        text: 'That may be possible, depending on what outcome matters most to you. Rather than simply lowering the price, I’d usually suggest adjusting scope so the project still works properly.',
      },
      {
        tone: 'Firm',
        text: 'I wouldn’t reduce the rate for the same scope, but I’d be happy to discuss a lighter version if budget is the main concern.',
      },
    ],
    faq: [
      {
        q: 'What does “can you do it cheaper” usually mean?',
        a: 'It can mean tactical pushback, direct discount pressure, or real budget mismatch.',
      },
      {
        q: 'Should you answer with a discount?',
        a: 'Not by default. Diagnose first, then choose the right response path.',
      },
      {
        q: 'How do you tell if this is a real budget issue?',
        a: 'Ask for range and priorities, then decide whether scope restructuring is appropriate.',
      },
    ],
    nextDecisionSlugs: [
      'client-negotiating-price',
      'client-asking-for-discount',
      'budget-lower-than-expected',
    ],
    guideLinks: [
      {
        href: '/guides/when-to-discount-and-when-not-to',
        label: 'When to discount and when not to',
      },
    ],
    generatorScenarioSlug: 'discount-request',
    toolCta:
      'Paste the exact message and Flowdockr will help you figure out whether this is price pushback, budget mismatch, or discount pressure, then draft the right reply.',
  },

  {
    tier: 'tier2',
    slug: 'small-discount-before-closing',
    title: 'Small discount before closing',
    seoTitle:
      'How to Handle a Small Discount Request Right Before Closing | Flowdockr',
    metaDescription:
      'Learn how to respond when a prospect asks for one last small discount before signing. Protect your price anchor and close without unnecessary concessions using Flowdockr.',
    primaryKeyword: 'small discount before signing',
    keywordVariants: [
      'final small discount request',
      'one last discount before close',
      'little discount to move forward',
      'can you do a little better',
    ],
    heroSubtitle:
      'The request sounds small, but the pricing signal it sends is not.',
    shortDescription: 'Final-stage micro-concession pressure before signature.',
    situationSnapshot: [
      'The prospect is close to signing and asks for one last small reduction.',
      'You want to avoid losing momentum but also avoid softening your anchor.',
      'The wording must stay warm while preserving pricing discipline.',
    ],
    whatsReallyHappening: [
      'Small final asks often test whether your quote has hidden flexibility.',
      'A casual concession can reset expectations for future renewals.',
      'You need close-oriented language with clear boundaries and options.',
    ],
    realGoals: [
      'Close professionally without unnecessary concession.',
      'If flexibility is offered, tie it to explicit commitments.',
      'Protect long-term positioning at the final stage.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Hold the line politely',
        whenToUse:
          'Use when deal is healthy and no further concession is needed.',
        risk: 'If too abrupt, buyer may perceive avoidable friction at close.',
        exampleWording:
          'I’d prefer to keep pricing as quoted so we start on strong footing, and I’m ready to proceed immediately if everything else is aligned.',
      },
      {
        id: 'B',
        title: 'Exchange for a commitment',
        whenToUse:
          'Use when you can offer micro-flexibility only with reciprocal terms.',
        risk: 'Without clear terms, discount becomes pure margin leakage.',
        exampleWording:
          'If we finalize this week and keep payment terms as proposed, I can offer a one-time close adjustment.',
      },
      {
        id: 'C',
        title: 'Repackage, not discount',
        whenToUse:
          'Use when you want to preserve price logic while offering practical movement.',
        risk: 'Packaging change can become hidden scope unless bounded clearly.',
        exampleWording:
          'Rather than lowering the quoted rate directly, I can adjust packaging or process support so we keep structure intact and still move forward.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I’d prefer to keep the pricing as quoted, but I’m happy to move quickly from here if everything else feels aligned.',
      },
      {
        tone: 'Warm',
        text: 'I appreciate you asking. I’d prefer to keep the pricing where it is so the project starts on the right footing, but if helpful I can make the process smoother on timing or packaging rather than adjusting the rate directly.',
      },
      {
        tone: 'Firm',
        text: 'At this stage I’d prefer not to reduce the quoted price further. If we move ahead on the current scope, I’m ready to proceed as outlined.',
      },
    ],
    faq: [
      {
        q: 'Should you give a small final discount to close a deal?',
        a: 'Only when intentional and conditional. “Small” concessions still signal pricing flexibility.',
      },
      {
        q: 'Is a “small” discount really harmless?',
        a: 'Not always. It can change future expectations for the same client relationship.',
      },
      {
        q: 'What can you trade instead of lowering the price?',
        a: 'Trade for faster commitment, cleaner payment terms, or bounded packaging changes.',
      },
    ],
    nextDecisionSlugs: [
      'discount-pressure-before-signing',
      'budget-lower-than-expected',
      'cheaper-competitor-comparison',
    ],
    guideLinks: [
      {
        href: '/guides/when-to-discount-and-when-not-to',
        label: 'When to discount and when not to',
      },
    ],
    generatorScenarioSlug: 'discount-request',
    toolCta:
      'Paste the final discount request and your current offer. Flowdockr will help you close professionally without undermining your pricing at the last minute.',
  },
];

const boundaryScopeControlScenarios: PricingScenario[] = [
  {
    tier: 'tier1',
    featured: true,
    slug: 'client-asking-for-extra-work',
    title: 'How to respond when a client asks for extra work',
    seoTitle: 'How to Respond When a Client Asks for Extra Work | Flowdockr',
    metaDescription:
      'Learn how to respond when a client asks for extra work outside the original agreement. Set a clean scope boundary, protect the relationship, and draft the reply with Flowdockr.',
    primaryKeyword: 'how to respond to client asking for extra work',
    keywordVariants: [
      'client asks for extra work what to say',
      'reply to extra work request',
      'client asking for additional work',
      'how to respond to extra work outside scope',
    ],
    heroSubtitle:
      'Name the scope change clearly before an extra request becomes the new default.',
    shortDescription:
      'Client asks for additional work and you need a reply that protects scope without sounding difficult.',
    situationSnapshot: [
      'The original scope is already defined, but the client is now asking for something extra.',
      'If you absorb the request casually, the baseline for the project shifts immediately.',
      'The best reply keeps the tone helpful while making the added work explicit.',
    ],
    whatsReallyHappening: [
      'This is often less about one task and more about whether your boundaries are visible.',
      'Clients will usually keep pushing until scope, timing, or budget tradeoffs are named clearly.',
      'You need process language, not emotional resistance.',
    ],
    realGoals: [
      'Separate the new request from the original agreement.',
      'Keep the relationship workable while protecting margin and timeline.',
      'Offer a clean next step instead of a vague maybe.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Name it as added scope',
        whenToUse: 'Use when the request is clearly outside what was agreed.',
        risk: 'If you stay too soft, the client may still hear this as an included extra.',
        exampleWording:
          'Happy to look at that. Since it sits outside the current scope, the cleanest next step is to decide whether we add it as extra work or keep the existing plan unchanged.',
      },
      {
        id: 'B',
        title: 'Offer a tradeoff inside the current budget',
        whenToUse:
          'Use when the client needs options and you are open to reshuffling priorities.',
        risk: 'If you do not name what comes out, you can still end up doing more for the same fee.',
        exampleWording:
          'If you want to keep the current budget, we can swap priorities and replace something already included rather than add this on top.',
      },
      {
        id: 'C',
        title: 'Quote the addition cleanly',
        whenToUse:
          'Use when the extra request materially changes effort or delivery.',
        risk: 'If the quote update feels abrupt, the client may focus only on the no instead of the path.',
        exampleWording:
          'I can absolutely add that. I would treat it as an additional scope item and send a quick update for budget and timing so expectations stay clean on both sides.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Happy to help. That request would count as added scope, so I can either quote it separately or help you swap it against something already included.',
      },
      {
        tone: 'Warm',
        text: 'I am glad to support that direction. Since this would add to the original scope, the cleanest option is either to price it as an extra item or reshape priorities within the current budget.',
      },
      {
        tone: 'Firm',
        text: 'That request is outside the scope covered in the current fee. I am happy to add it, but it would need either a revised quote or a clear tradeoff elsewhere in the project.',
      },
    ],
    commonClientMessages: [
      'Can you also add this while you are in there?',
      'This was not in the original list, but can we include it too?',
      'I know this is extra, but it should be quick, right?',
    ],
    commonMistakes: [
      'Answering the request before you clearly separate it from the original agreement.',
      'Using apologetic wording that makes added scope sound like your fault instead of a decision point.',
      'Quoting the extra work without restating what the current scope already covers.',
    ],
    faq: [
      {
        q: 'How do you respond when a client asks for extra work?',
        a: 'Acknowledge the request, name it as additional scope, and give a clean option for budget, tradeoff, or a later phase.',
      },
      {
        q: 'Should you ever include extra work for free?',
        a: 'Only if it is a deliberate one-time courtesy and you say that clearly so it does not reset the baseline.',
      },
      {
        q: 'What is the safest tone for scope-boundary replies?',
        a: 'Calm, neutral, and options-based. You are clarifying the structure, not arguing with the client.',
      },
    ],
    nextDecisionSlugs: [
      'more-work-same-price',
      'client-requesting-additional-revisions',
      'say-no-to-scope-creep-politely',
      'more-work-than-agreed',
    ],
    guideLinks: scopeGuideLinks,
    generatorScenarioSlug: 'extra-work-outside-scope',
    toolCta:
      'Paste the extra request and the original scope. Flowdockr will help you write a reply that keeps the relationship intact without silently expanding the project.',
  },

  {
    tier: 'tier2',
    slug: 'say-no-to-scope-creep-politely',
    title: 'How to say no to scope creep politely',
    seoTitle: 'How to Say No to Scope Creep Politely | Flowdockr',
    metaDescription:
      'Learn how to say no to scope creep politely without sounding defensive. Use clear scope language, client-safe wording, and Flowdockr to draft the reply.',
    primaryKeyword: 'how to say no to scope creep politely',
    keywordVariants: [
      'polite scope creep response',
      'how to push back on scope creep',
      'scope creep boundary reply',
      'say no to extra requests politely',
    ],
    heroSubtitle:
      'You do not need a harsh no. You need language that makes the boundary hard to miss.',
    shortDescription:
      'A scope-creep reply should stay polite, but it still has to feel like a real boundary.',
    situationSnapshot: [
      'The extra asks are starting to pile up, and a casual yes would keep the pattern going.',
      'You want to protect the relationship without training the client to expect unpriced additions.',
      'The tone matters because the project is still active and trust still matters.',
    ],
    whatsReallyHappening: [
      'This is usually a pattern-management problem, not just one sentence.',
      'If the client feels no friction around extra asks, more will follow.',
      'Your reply needs to sound easy to agree to while still resetting expectations.',
    ],
    realGoals: [
      'Use polite language that still makes the boundary explicit.',
      'Keep the project moving without absorbing extra work by default.',
      'Turn vague flexibility into concrete options.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Acknowledge, then reset scope',
        whenToUse:
          'Use when you want the client to feel heard before you restate the limit.',
        risk: 'Too much empathy without a reset can sound like soft agreement.',
        exampleWording:
          'That makes sense. To keep the current project clear, I would treat that as outside the agreed scope and we can either add it properly or keep it for a next phase.',
      },
      {
        id: 'B',
        title: 'Use neutral process language',
        whenToUse:
          'Use when you want the reply to feel administrative rather than emotional.',
        risk: 'If the language is too dry, it can feel abrupt or transactional.',
        exampleWording:
          'To keep scope, budget, and timing aligned, anything beyond the current deliverables would need to be scoped separately.',
      },
      {
        id: 'C',
        title: 'Offer a graceful alternative',
        whenToUse: 'Use when you want to soften the no without undoing it.',
        risk: 'Alternatives become dangerous if they sound like open-ended free support.',
        exampleWording:
          'If helpful, I can either quote that separately now or note it for a later phase once the current work is wrapped cleanly.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'That makes sense. Since it sits outside the current scope, I would either quote it separately or keep it for a later phase so we do not blur the existing agreement.',
      },
      {
        tone: 'Warm',
        text: 'I understand why you are asking for it. To keep the project clean on both sides, I would treat that as additional scope rather than fold it into the current plan by default.',
      },
      {
        tone: 'Firm',
        text: 'I would prefer not to add that into the current scope informally. If you want to include it, the cleanest option is to scope it properly and update budget or priorities.',
      },
    ],
    commonClientMessages: [
      'Can we just keep this flexible as we go?',
      'I know this is a bit outside the original plan, but can you make it work?',
      'Can we avoid being too rigid on scope here?',
    ],
    commonMistakes: [
      'Trying to sound so nice that the boundary disappears.',
      'Explaining your frustration instead of naming the scope issue neutrally.',
      'Saying maybe now and hoping you can fix the expectation later.',
    ],
    faq: [
      {
        q: 'Can you be polite and still hold a hard scope boundary?',
        a: 'Yes. The key is to be neutral and explicit at the same time, instead of apologetic or emotional.',
      },
      {
        q: 'What wording helps the most with scope creep?',
        a: 'Language like outside the current scope, separate item, revised quote, or next phase keeps the issue concrete.',
      },
      {
        q: 'How do you avoid sounding difficult?',
        a: 'Frame the boundary as a clarity tool that protects scope, budget, and delivery quality for both sides.',
      },
    ],
    nextDecisionSlugs: [
      'client-asking-for-extra-work',
      'refuse-extra-work-without-losing-client',
      'more-work-same-price',
      'client-requesting-additional-revisions',
    ],
    guideLinks: scopeGuideLinks,
    generatorScenarioSlug: 'set-boundaries-politely',
    toolCta:
      'Paste the exact scope-creep message and the tone you want. Flowdockr will draft a reply that stays polite without making the boundary disappear.',
  },

  {
    tier: 'tier3',
    slug: 'more-work-than-agreed',
    title: 'Client wants more work than agreed',
    seoTitle: 'Client Wants More Work Than Agreed? What to Say | Flowdockr',
    metaDescription:
      'Learn what to say when a client wants more work than agreed. Keep the agreement visible, avoid unpaid expansion, and draft the reply with Flowdockr.',
    primaryKeyword: 'client asking for more work than agreed what to say',
    keywordVariants: [
      'more work than agreed reply',
      'client wants more than contract says',
      'what to say when client adds more work',
      'extra deliverables not agreed',
    ],
    heroSubtitle:
      'When the agreement and the request no longer match, the reply should make that mismatch visible fast.',
    shortDescription:
      'A direct landing page for when the client is asking for more than the original agreement covers.',
    situationSnapshot: [
      'The request is now clearly beyond what was agreed, but the client may still treat it as a normal continuation.',
      'If you answer loosely, the old agreement stops protecting you in practice.',
      'This page is for high-clarity wording when the mismatch is obvious and needs to be named.',
    ],
    whatsReallyHappening: [
      'The problem is not only the extra work. It is the assumption that the agreement can stretch without a new decision.',
      'Many scope disputes get worse because the original boundary is never restated clearly enough.',
      'A short, specific reply often works better than a long explanation.',
    ],
    realGoals: [
      'Point back to the agreement without sounding combative.',
      'Separate the new ask from the current commitment.',
      'Offer the client a concrete next step instead of a vague dispute.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Point back to the agreed scope',
        whenToUse:
          'Use when the mismatch with the original agreement is straightforward.',
        risk: 'If you only reference the agreement without options, the reply can feel like a dead stop.',
        exampleWording:
          'That would go beyond the scope we originally agreed, so the clean next step is either to keep the current scope or reopen the project around this added work.',
      },
      {
        id: 'B',
        title: 'Separate old work from new work',
        whenToUse:
          'Use when the client is blending the two together in one thread.',
        risk: 'If the separation is not explicit enough, expectations remain muddy.',
        exampleWording:
          'I am treating this as a new request rather than part of the original deliverables, so I would scope it separately from the current agreement.',
      },
      {
        id: 'C',
        title: 'Offer a simple change-order path',
        whenToUse:
          'Use when you want the reply to move quickly into execution.',
        risk: 'If the process sounds too heavy, the client may resist the structure rather than the actual tradeoff.',
        exampleWording:
          'If you want to include it, I can send a small scope update with timing and pricing so we can keep everything aligned before work expands further.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'That request would go beyond the original agreement, so I would treat it as added scope rather than fold it into the current plan by default.',
      },
      {
        tone: 'Warm',
        text: 'I am happy to look at it. Since it sits outside what we originally agreed, the cleanest path is to scope it separately so expectations stay clear on both sides.',
      },
      {
        tone: 'Firm',
        text: 'This would be additional work beyond the agreed scope. If you want to include it, I would need to reopen scope, timing, and budget rather than treat it as already covered.',
      },
    ],
    commonClientMessages: [
      'Can we include these extra pieces too even though they were not part of the original plan?',
      'I thought this was all part of the same project anyway.',
      'This was not listed before, but I assume it is still covered?',
    ],
    commonMistakes: [
      'Trying to resolve the new request without first naming that it is outside the original agreement.',
      'Using fuzzy language like maybe or we can see, which keeps the door open.',
      'Treating the scope mismatch like a personal disagreement instead of a structural issue.',
    ],
    faq: [
      {
        q: 'What do you say when a client wants more work than agreed?',
        a: 'Restate that the request is beyond the original scope, then offer a clean path such as a revised quote, scope tradeoff, or a later phase.',
      },
      {
        q: 'Should you quote the extra immediately?',
        a: 'Only after the new work is clearly separated from the old agreement. Otherwise the client may still see it as included.',
      },
      {
        q: 'How direct should the wording be?',
        a: 'Direct enough that the boundary is unmistakable, but calm enough that it still feels professional and collaborative.',
      },
    ],
    nextDecisionSlugs: [
      'client-asking-for-extra-work',
      'more-work-same-price',
      'say-no-to-scope-creep-politely',
      'refuse-extra-work-without-losing-client',
    ],
    guideLinks: scopeGuideLinks,
    generatorScenarioSlug: 'extra-work-outside-scope',
    toolCta:
      'Paste the client message and the original agreement details. Flowdockr will help you reply clearly when the request no longer matches what was agreed.',
  },

  {
    tier: 'tier2',
    slug: 'client-requesting-additional-revisions',
    title: 'How to handle a client requesting additional revisions',
    seoTitle:
      'How to Handle a Client Requesting Additional Revisions | Flowdockr',
    metaDescription:
      'Learn how to respond when a client asks for additional revisions beyond the expected rounds. Protect approvals, timeline, and scope with Flowdockr.',
    primaryKeyword: 'how to handle client requesting additional revisions',
    keywordVariants: [
      'client asking for more revisions',
      'additional revisions what to say',
      'how to respond to extra revision rounds',
      'revision request outside scope',
    ],
    heroSubtitle:
      'Extra revisions feel small until they start replacing a real approval process.',
    shortDescription:
      'The client wants more revision rounds and you need to keep revision scope from becoming unlimited.',
    situationSnapshot: [
      'The work is already moving, but the client keeps asking for another round of changes.',
      'If revision boundaries stay vague, timeline and decision-making both start to drift.',
      'The best response makes the revision limit and the next option easy to understand.',
    ],
    whatsReallyHappening: [
      'Revision pressure often signals unclear approval structure, not just perfectionism.',
      'If you keep saying yes to one more round, you effectively create unlimited revisions by behavior.',
      'A clear revision boundary is usually good project management, not rigid service.',
    ],
    realGoals: [
      'Clarify what revision rounds are already included.',
      'Protect the project from open-ended changes.',
      'Offer a paid or structured path for extra rounds if needed.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Clarify the included revision limit',
        whenToUse:
          'Use when the client may not understand what is already included.',
        risk: 'If you only explain the limit without next steps, the reply can feel like a stop sign.',
        exampleWording:
          'We are now beyond the revision rounds included in the current scope, so the clean next step is either to finalize from here or scope an additional round separately.',
      },
      {
        id: 'B',
        title: 'Offer an extra round as an add-on',
        whenToUse:
          'Use when the client still needs one more decision cycle and you want a workable path.',
        risk: 'If pricing or boundaries are vague, the add-on can become another open loop.',
        exampleWording:
          'If you want another revision pass, I can add one as a separate item so the timeline and scope stay clear.',
      },
      {
        id: 'C',
        title: 'Shift the conversation to approval',
        whenToUse:
          'Use when the pattern is more about indecision than one final edit.',
        risk: 'If the client feels cornered, they may resist the approval step emotionally.',
        exampleWording:
          'Before we continue revising, it may help to lock the core direction so we are not reopening the same decisions in each round.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'We are now beyond the revision rounds included in the current scope, so the next step would be either to finalize from here or add another round separately.',
      },
      {
        tone: 'Warm',
        text: 'I want to make sure we land this well. Since we are now outside the included revision rounds, the cleanest option is either to sign off on the current version or add another round as a separate item.',
      },
      {
        tone: 'Firm',
        text: 'Additional revision rounds are not included in the current scope by default. I am happy to continue, but I would treat any extra round as a separate add-on so timing and expectations stay clear.',
      },
    ],
    commonClientMessages: [
      'Can we do one more round of revisions?',
      'I know we already revised this, but I have a few more changes.',
      'Can we keep iterating a bit more before we call it done?',
    ],
    commonMistakes: [
      'Treating every extra revision as harmless instead of noticing the pattern.',
      'Talking only about effort instead of clarifying the revision limit and next step.',
      'Leaving approval criteria vague while continuing to revise.',
    ],
    faq: [
      {
        q: 'What do you say when a client wants more revisions?',
        a: 'Clarify whether the request is still within the included revision rounds, then offer either approval or a separately scoped extra round.',
      },
      {
        q: 'How do you avoid sounding rigid about revisions?',
        a: 'Frame the boundary around timeline, clarity, and decision-making rather than personal preference.',
      },
      {
        q: 'Should you ever give one more revision for free?',
        a: 'Only if it is a deliberate courtesy and you say clearly that it is an exception, not the new rule.',
      },
    ],
    nextDecisionSlugs: [
      'more-work-same-price',
      'client-asking-for-extra-work',
      'refuse-extra-work-without-losing-client',
      'say-no-to-scope-creep-politely',
    ],
    guideLinks: scopeGuideLinks,
    generatorScenarioSlug: 'unlimited-revisions',
    toolCta:
      'Paste the revision request and what rounds were originally included. Flowdockr will help you reply without drifting into unlimited revisions by default.',
  },

  {
    tier: 'tier2',
    slug: 'refuse-extra-work-without-losing-client',
    title: 'How to refuse extra work without losing the client',
    seoTitle: 'How to Refuse Extra Work Without Losing the Client | Flowdockr',
    metaDescription:
      'Learn how to refuse extra work without losing the client. Use polite but firm wording, offer clean alternatives, and draft the reply with Flowdockr.',
    primaryKeyword: 'how to refuse extra work without losing client',
    keywordVariants: [
      'refuse extra work politely',
      'say no to extra work without losing client',
      'decline extra request professionally',
      'how to reject scope increase nicely',
    ],
    heroSubtitle:
      'The goal is not to sound nicer. The goal is to make the no easier to accept.',
    shortDescription:
      'You need to refuse the extra work while keeping trust and momentum with the client.',
    situationSnapshot: [
      'The added work is not a good yes, but you still want the client to feel supported.',
      'A hard no with no path forward can create unnecessary friction.',
      'A soft maybe creates even bigger problems later.',
    ],
    whatsReallyHappening: [
      'This is a relationship-management moment as much as a scope decision.',
      'Clients usually handle a no better when the reason is structural and the next step is clear.',
      'You are trying to protect both the project and the working relationship at the same time.',
    ],
    realGoals: [
      'Refuse the extra work without sounding resentful.',
      'Make the boundary feel like a practical project decision.',
      'Offer a clean alternative if the client still wants the outcome.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Lead with support for the goal',
        whenToUse:
          'Use when you want to reduce friction before holding the boundary.',
        risk: 'If the support sounds like agreement, the no will feel confusing.',
        exampleWording:
          'I understand why you want to include that. To keep the current project clean, I would not add it into the existing scope informally, but I can show you the cleanest way to handle it.',
      },
      {
        id: 'B',
        title: 'Offer a separate path',
        whenToUse:
          'Use when the client may still want the added outcome and you want to stay constructive.',
        risk: 'If the separate path is vague, the client will push the issue back into the current project.',
        exampleWording:
          'I would treat that as a separate item rather than absorb it into the current scope. If you want, I can quote it or note it for the next phase.',
      },
      {
        id: 'C',
        title: 'Protect the project standard',
        whenToUse:
          'Use when the cleanest justification is quality and delivery integrity.',
        risk: 'If you over-explain quality too much, it can sound like sales copy instead of a boundary.',
        exampleWording:
          'I want to keep the project realistic and well-executed, so I would prefer not to keep expanding scope inside the original setup.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I understand why you are asking for it. I would not fold it into the current scope informally, but I can quote it separately or keep it for a later phase.',
      },
      {
        tone: 'Warm',
        text: 'I am happy to help you get to that outcome. To keep this project clean on both sides, I would treat it as additional scope rather than squeeze it into the existing plan by default.',
      },
      {
        tone: 'Firm',
        text: 'I would prefer not to add that into the current scope without revisiting budget or priorities. If you want to include it, I can map the cleanest next option.',
      },
    ],
    commonClientMessages: [
      'Can you just include this one extra thing?',
      'I do not want to change the scope formally, but can we still make this happen?',
      'How can we fit this in without making the project a bigger deal?',
    ],
    commonMistakes: [
      'Trying to protect the relationship by giving a fuzzy answer that does not actually refuse the work.',
      'Making the reply too personal instead of framing it as project structure.',
      'Saying no with no alternative path when a cleaner option exists.',
    ],
    faq: [
      {
        q: 'Can you refuse extra work without losing the client?',
        a: 'Yes. The best replies acknowledge the goal, hold the boundary, and offer a practical alternative instead of sounding irritated or vague.',
      },
      {
        q: 'What makes these replies go wrong?',
        a: 'Usually either the no is too soft and disappears, or it is so abrupt that the client hears rejection instead of structure.',
      },
      {
        q: 'Should you explain your reasons in detail?',
        a: 'Only enough to make the boundary credible. Over-explaining usually weakens the message rather than helping it.',
      },
    ],
    nextDecisionSlugs: [
      'say-no-to-scope-creep-politely',
      'client-asking-for-extra-work',
      'client-requesting-additional-revisions',
      'say-no-to-client-professionally',
    ],
    guideLinks: scopeGuideLinks,
    generatorScenarioSlug: 'set-boundaries-politely',
    toolCta:
      'Paste the exact extra-work request and the relationship context. Flowdockr will help you refuse the added work without making the reply feel cold or reactive.',
  },

  {
    tier: 'tier1',
    featured: true,
    slug: 'client-asking-for-discount',
    title: 'How to respond when a client asks for a discount',
    seoTitle: 'How to Respond When a Client Asks for a Discount | Flowdockr',
    metaDescription:
      'Learn how to respond when a client asks for a discount. Protect your rate, diagnose the real issue, and draft the right reply with Flowdockr.',
    primaryKeyword: 'how to respond to client asking for discount',
    keywordVariants: [
      'client asks for discount what to say',
      'reply to discount request',
      'how to answer discount ask',
      'client wants lower price response',
    ],
    heroSubtitle:
      'A direct discount ask does not need a reflex discount reply.',
    shortDescription:
      'The client is asking for a discount and you need a response that keeps leverage without stalling the deal.',
    situationSnapshot: [
      'The client moves from general price discomfort into a direct discount ask.',
      'This is where many freelancers concede before they know whether the issue is budget, leverage, or fit.',
      'A strong reply stays calm, tests the real pressure, and protects your pricing logic.',
    ],
    whatsReallyHappening: [
      'A discount request is often a test of flexibility before it is a final no.',
      'If you reduce price too early, the client learns your rate is negotiable by default.',
      'The best response keeps the conversation moving without treating discounting as the only path.',
    ],
    realGoals: [
      'Understand what is driving the discount request.',
      'Hold your position unless there is a real reason to restructure the deal.',
      'Offer a scope or terms-based alternative instead of a blind concession.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Hold first, then ask why',
        whenToUse:
          'Use when the ask is direct but the reason behind it is still unclear.',
        risk: 'If you sound too stiff too early, the client may read the reply as inflexible posturing.',
        exampleWording:
          'Possibly, depending on what is driving the request. Before I change pricing, I would want to understand whether the issue is budget, scope, or something else in the offer.',
      },
      {
        id: 'B',
        title: 'Trade scope, not margin',
        whenToUse:
          'Use when there is likely a real budget issue and the project still looks viable.',
        risk: 'If scope changes are not explicit, you end up conceding twice.',
        exampleWording:
          'If budget is the main constraint, the cleaner route is usually to adjust scope rather than lower the rate for the same work.',
      },
      {
        id: 'C',
        title: 'Trade for stronger terms',
        whenToUse:
          'Use when you are open to movement only with a meaningful commitment in return.',
        risk: 'If the trade is weak or vague, the discount becomes a free concession.',
        exampleWording:
          'If there is a reason to revise the offer, I would want to tie that to a concrete trade such as faster approval, simpler scope, or cleaner payment terms.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Possibly, depending on what is driving the request. Before I lower pricing, I would want to understand whether the issue is budget, scope, or something else in the structure.',
      },
      {
        tone: 'Warm',
        text: 'I understand why you are asking. Rather than cut the same scope immediately, I would first want to clarify whether the real issue is budget, priorities, or the structure of the offer so I can suggest the cleanest path.',
      },
      {
        tone: 'Firm',
        text: 'I would not reduce the price for the same scope by default. If budget is the concern, the better move is usually to adjust scope or terms rather than compress the work into a lower fee.',
      },
    ],
    commonClientMessages: [
      'Can you do any better on the price?',
      'Is there any room for a discount here?',
      'We like this, but we would need a lower number to move forward.',
    ],
    commonMistakes: [
      'Answering the discount question before you know what problem the client is actually trying to solve.',
      'Treating every discount ask like a special case instead of a negotiation pattern.',
      'Giving a lower number with no change to scope, timing, or commitment.',
    ],
    faq: [
      {
        q: 'How should you respond when a client asks for a discount?',
        a: 'Acknowledge the request, understand the reason behind it, and then decide whether to hold, trade, or restructure the offer.',
      },
      {
        q: 'Should you ever give the discount right away?',
        a: 'Usually no. You give away leverage before you know whether the request is strategic, budget-based, or just reflex negotiation.',
      },
      {
        q: 'What can you say instead of yes or no immediately?',
        a: 'You can ask what is driving the request and offer a scope or terms-based alternative instead of a blind price cut.',
      },
    ],
    nextDecisionSlugs: [
      'discount-pressure-before-signing',
      'client-negotiating-price',
      'stand-firm-on-pricing',
      'say-no-to-low-budget-client',
    ],
    guideLinks: pricingGuideLinks,
    generatorScenarioSlug: 'discount-request',
    toolCta:
      'Paste the exact discount ask and the current offer. Flowdockr will help you reply without slipping into an automatic concession.',
  },

  {
    tier: 'tier2',
    slug: 'say-no-to-low-budget-client',
    title: 'How to say no to a low-budget client',
    seoTitle: 'How to Say No to a Low-Budget Client | Flowdockr',
    metaDescription:
      'Learn how to say no to a low-budget client politely. Protect your economics, avoid weak-fit work, and draft the reply with Flowdockr.',
    primaryKeyword: 'how to say no to low budget client',
    keywordVariants: [
      'decline low budget client politely',
      'low budget client what to say',
      'how to reject low budget project',
      'client budget too low response',
    ],
    heroSubtitle:
      'When the gap is too large, the right reply should protect your standards rather than rescue the deal at any cost.',
    shortDescription:
      'The client budget is too low to be workable and you need a respectful way to say no.',
    situationSnapshot: [
      'The budget is so low that even a reduced version would still be a weak-fit engagement.',
      'The temptation is to explain too much or start bargaining against yourself.',
      'A better reply keeps the no clear and the tone professional.',
    ],
    whatsReallyHappening: [
      'This is often less about negotiation skill and more about qualification discipline.',
      'Trying to save a low-budget deal can trap you in underpriced work that expands later.',
      'The cleaner the decline, the less awkward the relationship becomes.',
    ],
    realGoals: [
      'Decline the low-budget fit without sounding dismissive.',
      'Avoid training the client to expect your standards to collapse.',
      'Leave room for a future conversation only if the economics actually change.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Decline the current budget cleanly',
        whenToUse:
          'Use when the number is clearly below any viable version of the work.',
        risk: 'If the wording is too blunt, the client may hear rejection instead of fit mismatch.',
        exampleWording:
          'At that budget, I would not be able to deliver the work to the standard I would be comfortable putting my name on, so I would rather be honest than force a bad fit.',
      },
      {
        id: 'B',
        title: 'Test for a smaller viable version',
        whenToUse:
          'Use when you want to check whether there is still a realistic stripped-down option.',
        risk: 'If the gap is huge, offering options can drag the conversation on unnecessarily.',
        exampleWording:
          'If the range is fixed, the only workable path would be a materially smaller version of the project rather than the current scope at a lower fee.',
      },
      {
        id: 'C',
        title: 'Leave the door open selectively',
        whenToUse:
          'Use when the client seems genuine and the budget may change later.',
        risk: 'If you leave the door open too broadly, the client may keep coming back with the same weak numbers.',
        exampleWording:
          'If the budget changes or the scope narrows meaningfully, I would be happy to revisit it. I just would not want to commit to the current version at that level.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'At that budget, I would not be able to deliver the project to the standard I would be comfortable with, so I would rather be honest than force a weak fit.',
      },
      {
        tone: 'Warm',
        text: 'Thanks for being open about the range. I do not think the current project would be realistic at that level, and I would rather be transparent now than overpromise and disappoint you later.',
      },
      {
        tone: 'Firm',
        text: 'I would not take on the current scope at that budget. If the range changes or the scope narrows materially, I would be happy to revisit it.',
      },
    ],
    commonClientMessages: [
      'This is our full budget. Can you make it work somehow?',
      'We really cannot go above this number.',
      'I know it is lower than your rate, but can you still do it?',
    ],
    commonMistakes: [
      'Trying to save the deal by accepting a budget you already know is not viable.',
      'Explaining your pricing in circles instead of naming the fit problem clearly.',
      'Leaving the decline so open-ended that the client keeps pushing the same weak budget back at you.',
    ],
    faq: [
      {
        q: 'How do you say no to a low-budget client politely?',
        a: 'Be direct about fit, avoid shaming the budget, and explain that the current scope would not be realistic at that level.',
      },
      {
        q: 'Should you offer a smaller version before declining?',
        a: 'Only if a genuinely workable smaller version exists. If the gap is too wide, a clean no is better.',
      },
      {
        q: 'Can you leave the door open without sounding fake?',
        a: 'Yes, if you only leave it open for a real change such as a different budget or materially reduced scope.',
      },
    ],
    nextDecisionSlugs: [
      'budget-lower-than-expected',
      'decline-underpaid-project-politely',
      'stand-firm-on-pricing',
      'client-asking-for-discount',
    ],
    guideLinks: scopeGuideLinks,
    generatorScenarioSlug: 'say-no-to-low-budget-client',
    toolCta:
      'Paste the budget message and your minimum workable range. Flowdockr will help you say no cleanly without making the reply feel hostile or defensive.',
  },

  {
    tier: 'tier3',
    slug: 'client-negotiating-price',
    title: 'Client is negotiating price: what to say',
    seoTitle: 'Client Negotiating Price? What to Say Next | Flowdockr',
    metaDescription:
      'Learn what to say when a client is negotiating price. Diagnose the pressure, protect your anchor, and draft the right response with Flowdockr.',
    primaryKeyword: 'client negotiating price what to say',
    keywordVariants: [
      'client negotiating price reply',
      'how to answer price negotiation',
      'what to say when client negotiates price',
      'price negotiation response',
    ],
    heroSubtitle:
      'A broad negotiation query should still land on a real decision page, not vague advice.',
    shortDescription:
      'The client is negotiating price and you need to decide whether to hold, scope, trade, or walk away.',
    situationSnapshot: [
      'The pressure is clearly about pricing, but the underlying reason is still fuzzy.',
      'This wording can map to pushback, direct discount pressure, or a true budget problem.',
      'The first job of your reply is classification, not concession.',
    ],
    whatsReallyHappening: [
      'Broad price negotiation language hides several different decision states under one phrase.',
      'If you respond with a discount before you classify the pressure, you lose your anchor for the wrong reason.',
      'The goal is to slow the conversation down just enough to choose the right path.',
    ],
    realGoals: [
      'Diagnose what kind of negotiation this actually is.',
      'Protect pricing while keeping momentum in the conversation.',
      'Move the client toward a specific next decision instead of endless back-and-forth.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Clarify the pressure',
        whenToUse:
          'Use when the client is negotiating broadly but has not named the real issue.',
        risk: 'If the question is too open, the conversation can stay abstract.',
        exampleWording:
          'Happy to talk it through. Before I adjust anything, it would help to know whether the main issue is budget, scope, timing, or how the offer is currently framed.',
      },
      {
        id: 'B',
        title: 'Hold the anchor',
        whenToUse:
          'Use when the pressure feels tactical and the current scope still looks right.',
        risk: 'If the wording is too blunt, the reply can feel like a shutdown.',
        exampleWording:
          'I would not lower the rate for the same scope by default, but I am happy to work through the cleanest option if there is a specific constraint we need to solve.',
      },
      {
        id: 'C',
        title: 'Switch to structured options',
        whenToUse:
          'Use when the client is engaged but needs decision paths instead of another generic reply.',
        risk: 'If the options are too broad, the client can keep negotiating against all of them.',
        exampleWording:
          'The cleanest way to keep this moving is usually to choose between the current scope, a smaller version, or a revised structure tied to a specific tradeoff.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Happy to discuss it. Before I change pricing, it would help to know whether the main issue is budget, scope, timing, or something else in the structure.',
      },
      {
        tone: 'Warm',
        text: 'I am happy to work through the pricing side with you. Rather than jump straight to a lower number, I would first want to understand what part of the offer feels misaligned so I can suggest the cleanest path.',
      },
      {
        tone: 'Firm',
        text: 'I would not reduce the rate for the same scope by default. If there is a real constraint we need to solve, I am happy to structure that intentionally rather than negotiate blindly.',
      },
    ],
    commonClientMessages: [
      'Can we negotiate on the price a bit?',
      'I want to move forward, but I need something better on the pricing side.',
      'What flexibility do you have here?',
    ],
    commonMistakes: [
      'Acting as though all price negotiations are the same scenario.',
      'Dropping the number before the client explains what they are actually negotiating against.',
      'Keeping the conversation abstract instead of giving specific paths.',
    ],
    faq: [
      {
        q: 'What should you say when a client is negotiating price?',
        a: 'Start by clarifying what is actually driving the negotiation, then choose whether to hold, restructure scope, trade, or decline.',
      },
      {
        q: 'Is broad price negotiation the same as a discount request?',
        a: 'Not always. Sometimes it is budget, sometimes it is tactical pressure, and sometimes it is uncertainty about scope or fit.',
      },
      {
        q: 'What is the main risk in these conversations?',
        a: 'Moving to a discount too early before you know what problem you are solving.',
      },
    ],
    nextDecisionSlugs: [
      'client-asking-for-discount',
      'stand-firm-on-pricing',
      'discount-pressure-before-signing',
      'budget-lower-than-expected',
    ],
    guideLinks: pricingGuideLinks,
    generatorScenarioSlug: 'discount-request',
    toolCta:
      'Paste the negotiation message and your current offer. Flowdockr will help you identify the real pressure and draft the right next reply.',
  },

  {
    tier: 'tier2',
    slug: 'decline-underpaid-project-politely',
    title: 'How to decline an underpaid project politely',
    seoTitle: 'How to Decline an Underpaid Project Politely | Flowdockr',
    metaDescription:
      'Learn how to decline an underpaid project politely without sounding bitter. Protect your positioning and draft the reply with Flowdockr.',
    primaryKeyword: 'how to decline underpaid project politely',
    keywordVariants: [
      'underpaid project what to say',
      'decline project for low pay',
      'how to reject underpaid freelance work',
      'low paying project politely decline',
    ],
    heroSubtitle:
      'A project can be wrong on economics without requiring a dramatic reply.',
    shortDescription:
      'The project is underpaid and you need a clean, professional decline instead of a frustrated explanation.',
    situationSnapshot: [
      'The scope or effort is real, but the compensation is too low to make the project healthy.',
      'You want to protect your standards without making the reply sound emotional.',
      'The safest move is usually a clear fit-based decline, not a long argument about value.',
    ],
    whatsReallyHappening: [
      'Underpaid projects rarely become better after kickoff. They usually get harder to sustain.',
      'If you sound resentful, the client focuses on tone instead of the fit problem.',
      'If you sound too open-ended, the client keeps pushing the same low number.',
    ],
    realGoals: [
      'Decline the underpaid fit cleanly and calmly.',
      'Protect your positioning without insulting the client.',
      'Avoid getting dragged into a long defense of your rate.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'State the fit gap plainly',
        whenToUse:
          'Use when the pricing gap is obvious and not worth stretching around.',
        risk: 'If the wording is too cold, it can feel like a rejection of the client rather than the project fit.',
        exampleWording:
          'At the current budget, I would not be able to take this on in a way that makes sense for the scope involved, so I would rather be direct about that now.',
      },
      {
        id: 'B',
        title: 'Decline without debating value',
        whenToUse:
          'Use when you want to stay out of a back-and-forth about whether your rate is justified.',
        risk: 'If you skip all context, the decline can feel abrupt.',
        exampleWording:
          'I do not think this would be the right fit at the current level, so I am going to step back rather than force a version that does not work well on either side.',
      },
      {
        id: 'C',
        title: 'Leave a future path only if real',
        whenToUse:
          'Use when the client seems good but the economics are wrong right now.',
        risk: 'A vague future path can restart the same low-budget discussion later.',
        exampleWording:
          'If the scope or budget changes meaningfully later, I would be happy to revisit it, but I would not want to commit to the current version as it stands.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'At the current budget, I would not be able to take this on in a way that makes sense for the scope involved, so I would rather be direct about that now.',
      },
      {
        tone: 'Warm',
        text: 'Thanks for sharing the details. I do not think the project would be a good fit at the current level, and I would rather be honest now than take it on in a way that is not sustainable for either of us.',
      },
      {
        tone: 'Firm',
        text: 'I would not move forward on the current scope at that rate. If the budget or structure changes materially later, I would be open to revisiting it.',
      },
    ],
    commonClientMessages: [
      'This is the budget we have. Can you still take it?',
      'I know it is below your usual range, but the project is simple.',
      'Would you consider doing this one for less?',
    ],
    commonMistakes: [
      'Trying to justify every part of your rate instead of deciding whether the project is a fit.',
      'Sounding resentful because you waited too long to say no.',
      'Leaving the decline open enough that the client keeps negotiating the same underpaid version.',
    ],
    faq: [
      {
        q: 'How do you decline an underpaid project politely?',
        a: 'Be direct about fit, keep the tone neutral, and decline the current version without turning it into a value argument.',
      },
      {
        q: 'Should you explain why the project is underpaid?',
        a: 'Only briefly. The goal is not to win the debate. The goal is to make the decline clear and professional.',
      },
      {
        q: 'Is it okay to leave the door open later?',
        a: 'Yes, but only if there would need to be a meaningful change in budget or scope, not just another round of the same conversation.',
      },
    ],
    nextDecisionSlugs: [
      'say-no-to-low-budget-client',
      'budget-lower-than-expected',
      'stand-firm-on-pricing',
      'decline-project-politely',
    ],
    guideLinks: scopeGuideLinks,
    generatorScenarioSlug: 'do-it-for-less',
    toolCta:
      'Paste the budget message and your scope notes. Flowdockr will help you decline the underpaid version cleanly without sounding bitter or apologetic.',
  },

  {
    tier: 'tier2',
    slug: 'stand-firm-on-pricing',
    title: 'How to stand firm on pricing as a freelancer',
    seoTitle: 'How to Stand Firm on Pricing as a Freelancer | Flowdockr',
    metaDescription:
      'Learn how to stand firm on pricing as a freelancer without sounding rigid. Use calm language, clear structure, and Flowdockr to draft the reply.',
    primaryKeyword: 'how to stand firm on pricing freelance',
    keywordVariants: [
      'stand firm on pricing what to say',
      'hold your rate freelance',
      'how to hold price with client',
      'how to stay firm on rate',
    ],
    heroSubtitle:
      'Standing firm works best when it sounds structured, not stubborn.',
    shortDescription:
      'You want wording that holds the line on price without sounding defensive or combative.',
    situationSnapshot: [
      'The client is pushing for movement, but a concession would weaken the deal more than it would help it.',
      'Your tone has to stay calm or the message will sound reactive.',
      'This page is about sounding deliberate when you hold your price.',
    ],
    whatsReallyHappening: [
      'Clients often read confidence from structure, not from hard language.',
      'If you over-explain the rate, you can make it sound more negotiable instead of less.',
      'Standing firm usually works best when paired with an alternative path, not a flat wall.',
    ],
    realGoals: [
      'Hold the current pricing without sounding tense.',
      'Keep the client focused on scope and fit instead of abstract bargaining.',
      'Give the conversation a next step other than a lower number.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'State the rate calmly',
        whenToUse:
          'Use when the current scope is still right and you want a straightforward hold.',
        risk: 'If the wording sounds too absolute, it can trigger unnecessary ego resistance.',
        exampleWording:
          'I would prefer to keep the pricing where it is, since it reflects the current scope and the standard needed for the result we discussed.',
      },
      {
        id: 'B',
        title: 'Link price to structure',
        whenToUse:
          'Use when you want to explain the logic without over-defending the rate.',
        risk: 'If you talk too long, the client may treat every point as another lever to negotiate.',
        exampleWording:
          'The current number is tied to the scope, level of involvement, and delivery standard, so if something needs to change I would rather change the structure than soften the rate blindly.',
      },
      {
        id: 'C',
        title: 'Offer a smaller yes',
        whenToUse:
          'Use when you want to stay firm on price but still keep the conversation constructive.',
        risk: 'If the reduced version is not concrete enough, the client may still expect the full outcome.',
        exampleWording:
          'If the budget needs to come down, the cleaner path would be a smaller version rather than the same scope at a lower fee.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I would prefer to keep the pricing where it is, since it reflects the current scope. If something needs to move, I would rather adjust the structure than lower the rate for the same work.',
      },
      {
        tone: 'Warm',
        text: 'I want to set this up properly from the start, so I would rather keep the pricing aligned with the current scope than soften it and create pressure elsewhere in the project. If budget is the issue, I am happy to suggest a smaller version.',
      },
      {
        tone: 'Firm',
        text: 'I would not lower the rate for the same scope. If we need to make this fit a different range, the right move is to change scope or terms rather than compress the work into a lower fee.',
      },
    ],
    commonClientMessages: [
      'I need you to come down on the price a bit.',
      'Can you sharpen the number if we want to move ahead?',
      'We want to proceed, but only if the rate is more flexible.',
    ],
    commonMistakes: [
      'Trying to sound firm by sounding cold.',
      'Over-explaining your rate until it sounds like an argument instead of a position.',
      'Holding price with no alternative path, which makes the conversation feel stuck.',
    ],
    faq: [
      {
        q: 'How do you stand firm on pricing without sounding rigid?',
        a: 'Use calm language, connect the rate to scope and standards, and offer a smaller or different structure if the budget truly needs to change.',
      },
      {
        q: 'Should you explain your pricing in detail?',
        a: 'Only enough to make the structure clear. Too much explanation can make the price sound more negotiable, not less.',
      },
      {
        q: 'What helps the most in these replies?',
        a: 'A steady tone and a clear alternative path. Firm does not have to mean confrontational.',
      },
    ],
    nextDecisionSlugs: [
      'client-negotiating-price',
      'client-asking-for-discount',
      'discount-pressure-before-signing',
      'cheaper-competitor-comparison',
    ],
    guideLinks: pricingGuideLinks,
    generatorScenarioSlug: 'stand-firm-on-pricing',
    toolCta:
      'Paste the latest pricing pushback and your current offer. Flowdockr will help you hold the line in a way that sounds structured instead of stiff.',
  },

  {
    tier: 'tier2',
    slug: 'client-messaging-outside-work-hours',
    title: 'Client messaging outside work hours: what to say',
    seoTitle: 'Client Messaging Outside Work Hours? What to Say | Flowdockr',
    metaDescription:
      'Learn what to say when a client messages outside work hours. Set a calm boundary, reset expectations, and draft the reply with Flowdockr.',
    primaryKeyword: 'client messaging outside work hours what to say',
    keywordVariants: [
      'client texting after hours what to say',
      'after hours client message response',
      'how to respond to client outside business hours',
      'client messages at night what to say',
    ],
    heroSubtitle:
      'You do not need to normalize 24/7 access just because a message came in late.',
    shortDescription:
      'The client is messaging outside work hours and you need a reply that resets availability expectations cleanly.',
    situationSnapshot: [
      'The message arrives at night, on a weekend, or outside the window you want the relationship to run in.',
      'If you answer instantly every time, you teach the client that after-hours access is part of the service.',
      'A good reply protects the boundary without turning one message into a confrontation.',
    ],
    whatsReallyHappening: [
      'After-hours messaging is often a boundary-pattern problem more than a tone problem.',
      'Clients usually follow the responsiveness pattern you reward.',
      'The safest move is to answer on your terms and make the response rhythm visible.',
    ],
    realGoals: [
      'Reset response-time expectations without sounding annoyed.',
      'Protect your off-hours without escalating the relationship.',
      'Keep a normal service boundary even if the client is stressed.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Reply in the next normal window',
        whenToUse:
          'Use when you want to reset the pattern without making it a big discussion.',
        risk: 'If you never name the boundary, the client may keep treating late messages as normal.',
        exampleWording:
          'Thanks for sending this through. I am picking it up now and will handle it during my normal working hours so we keep things clear on timing.',
      },
      {
        id: 'B',
        title: 'Set a response-time expectation',
        whenToUse:
          'Use when the after-hours messaging is becoming a repeated pattern.',
        risk: 'If the wording sounds scolding, the client may focus on tone instead of the boundary.',
        exampleWording:
          'I usually respond during working hours rather than in real time outside them, so you can expect me to pick this up in the next business window.',
      },
      {
        id: 'C',
        title: 'Separate urgent from normal',
        whenToUse:
          'Use when the client treats every message as urgent and you need a better rule.',
        risk: 'If you do not define what counts as urgent, the exception can swallow the rule.',
        exampleWording:
          'For normal project items I reply during working hours. If something is genuinely urgent, let us define what that means so we have a clear process rather than defaulting everything to immediate.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Thanks for sending this through. I am picking it up in my normal working window rather than in real time outside hours so timing stays predictable on both sides.',
      },
      {
        tone: 'Warm',
        text: 'Thanks for the note. I usually respond during working hours rather than outside them, so I will pick this up in the next window and keep you posted from there.',
      },
      {
        tone: 'Firm',
        text: 'I do not usually handle project messages in real time outside working hours. I will review this in the next working window and reply from there.',
      },
    ],
    commonClientMessages: [
      'Can you look at this tonight?',
      'Just saw this and wanted to message you now even though it is late.',
      'Sorry for the weekend message, but can you reply as soon as you see it?',
    ],
    commonMistakes: [
      'Replying instantly every time and then resenting the pattern later.',
      'Ignoring the message for too long when a simple boundary reply would do the job.',
      'Making the response sound like a personal complaint instead of a service boundary.',
    ],
    faq: [
      {
        q: 'Should you reply to clients outside work hours?',
        a: 'Only if that is an intentional part of your service model. Otherwise it is better to answer in the next normal window and make that expectation visible.',
      },
      {
        q: 'How do you avoid sounding rude?',
        a: 'Use calm language, acknowledge the message, and state your response rhythm without lecturing the client.',
      },
      {
        q: 'What if the client says everything is urgent?',
        a: 'Define what counts as urgent and keep normal project communication separate from true exceptions.',
      },
    ],
    nextDecisionSlugs: [
      'set-boundaries-with-demanding-client',
      'tell-client-you-are-unavailable',
      'client-expects-immediate-response',
      'urgent-request-last-minute',
    ],
    generatorScenarioSlug: 'client-messaging-outside-work-hours',
    toolCta:
      'Paste the after-hours message and the boundary you want to keep. Flowdockr will draft a reply that resets expectations without sounding sharp.',
  },

  {
    tier: 'tier1',
    featured: true,
    slug: 'set-boundaries-with-demanding-client',
    title: 'How to set boundaries with a demanding client',
    seoTitle: 'How to Set Boundaries With a Demanding Client | Flowdockr',
    metaDescription:
      'Learn how to set boundaries with a demanding client without escalating the relationship. Protect time, tone, and expectations with Flowdockr.',
    primaryKeyword: 'how to set boundaries with demanding client',
    keywordVariants: [
      'demanding client boundaries',
      'what to say to demanding client',
      'set boundaries with difficult client',
      'client expects too much what to say',
    ],
    heroSubtitle:
      'The more demanding the client feels, the more important it is that the reply sounds structured rather than emotional.',
    shortDescription:
      'A broader boundary page for clients who push too hard on time, access, responsiveness, or flexibility.',
    situationSnapshot: [
      'The problem is not one isolated request. The client is creating pressure across how the relationship operates.',
      'If you respond ad hoc each time, you end up negotiating your boundaries in fragments.',
      'A better reply resets the working model itself.',
    ],
    whatsReallyHappening: [
      'Demanding clients often push until they find the edge of your structure.',
      'If your boundaries sound personal or reactive, they are easier for the client to argue with.',
      'The most effective replies make the working model feel normal and professional.',
    ],
    realGoals: [
      'Reset how communication and requests are handled.',
      'Protect your time and tone before resentment builds.',
      'Keep the project workable without sliding into constant negotiation.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Name the working model',
        whenToUse:
          'Use when the client needs a clearer picture of how you operate, not just a one-off answer.',
        risk: 'If the model sounds too abstract, the client may not connect it to the current issue.',
        exampleWording:
          'To keep the project running well, I work best with clear scope, response windows, and approval points rather than handling everything as a live request stream.',
      },
      {
        id: 'B',
        title: 'Reset specific expectations',
        whenToUse:
          'Use when the pattern is visible and you need to change the rules directly.',
        risk: 'If the reset is too harsh, the client may hear criticism instead of structure.',
        exampleWording:
          'Going forward, I want to keep replies, revisions, and request handling inside a clearer structure so we are not creating confusion or avoidable pressure on either side.',
      },
      {
        id: 'C',
        title: 'Add consequences without drama',
        whenToUse:
          'Use when the client keeps pushing past softer resets and you need a firmer line.',
        risk: 'If the consequence sounds like punishment, the relationship can escalate fast.',
        exampleWording:
          'If the process needs more flexibility than the current setup allows, then the cleanest move is to revisit scope, timing, or support structure rather than keep stretching the current arrangement informally.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'To keep the project running cleanly, I need to handle scope, response times, and revision requests inside a clearer structure rather than as open-ended live asks.',
      },
      {
        tone: 'Warm',
        text: 'I want to keep this working well for both of us, so I think it would help to reset a few boundaries around how requests, revisions, and response timing are handled going forward.',
      },
      {
        tone: 'Firm',
        text: 'I do need a clearer working structure here. Without defined boundaries around requests and response timing, the project starts to lose predictability on both sides.',
      },
    ],
    commonClientMessages: [
      'Can you just stay flexible on all of this as things come up?',
      'I need you to be more available throughout the project.',
      'We may have a lot of changes and quick asks, so I hope that is fine.',
    ],
    commonMistakes: [
      'Responding to a demanding pattern one message at a time instead of resetting the structure.',
      'Making the boundary sound like a mood issue rather than a project-management issue.',
      'Waiting until you are already frustrated before saying anything.',
    ],
    faq: [
      {
        q: 'How do you set boundaries with a demanding client?',
        a: 'Define the working model clearly around communication, scope, turnaround, and approvals so the boundary sounds professional rather than personal.',
      },
      {
        q: 'What tone works best?',
        a: 'Calm and structured. A demanding client is more likely to test emotional language than simple process language.',
      },
      {
        q: 'When should you escalate beyond a soft reset?',
        a: 'When the same pressure pattern keeps repeating after the boundary has already been stated clearly.',
      },
    ],
    nextDecisionSlugs: [
      'client-messaging-outside-work-hours',
      'tell-client-you-are-unavailable',
      'client-expects-immediate-response',
      'say-no-to-client-professionally',
    ],
    generatorScenarioSlug: 'set-boundaries-with-demanding-client',
    toolCta:
      'Paste the demanding message pattern and the boundary you want to hold. Flowdockr will help you reset expectations without escalating the relationship.',
  },

  {
    tier: 'tier2',
    slug: 'tell-client-you-are-unavailable',
    title: 'How to tell a client you are unavailable',
    seoTitle: 'How to Tell a Client You Are Unavailable | Flowdockr',
    metaDescription:
      'Learn how to tell a client you are unavailable without sounding flaky or guilty. Set the expectation clearly and draft the reply with Flowdockr.',
    primaryKeyword: 'how to tell client you are unavailable',
    keywordVariants: [
      'tell client unavailable professionally',
      'what to say when you are unavailable to client',
      'client unavailable response',
      'how to say not available to client',
    ],
    heroSubtitle:
      'Unavailable is easiest to hear when it comes with a clean next window, not a long excuse.',
    shortDescription:
      'You are not available right now and need a client-safe way to say it clearly.',
    situationSnapshot: [
      'The client wants your attention now, but you are not available in the window they expect.',
      'If you over-explain, the message starts to sound guilty or unstable.',
      'If you are too vague, the client does not know when to expect movement.',
    ],
    whatsReallyHappening: [
      'The client usually needs clarity more than detail.',
      'A short answer with a next window often lands better than a long apology.',
      'This is about expectation-setting, not permission-seeking.',
    ],
    realGoals: [
      'Say you are unavailable without sounding unreliable.',
      'Give the client a realistic next touchpoint.',
      'Protect the boundary while keeping trust intact.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'State the window cleanly',
        whenToUse: 'Use when you know when you can next pick the issue up.',
        risk: 'If the next window is vague, the reply still feels uncertain.',
        exampleWording:
          'I am not available to take this on right now, but I can pick it up in the next working window and update you from there.',
      },
      {
        id: 'B',
        title: 'Protect the boundary without over-explaining',
        whenToUse:
          'Use when you do not need to justify the reason for being unavailable.',
        risk: 'If the wording is too short, it can sound dismissive.',
        exampleWording:
          'I am not available to respond in real time on this right now, so I will come back to it once I am back in my normal working block.',
      },
      {
        id: 'C',
        title: 'Offer a fallback if needed',
        whenToUse:
          'Use when the client may genuinely need a faster decision path than you can provide.',
        risk: 'If the fallback is too open, you recreate the pressure you are trying to reduce.',
        exampleWording:
          'If timing is critical before then, let me know the hard deadline and I can tell you whether there is a realistic way to handle it cleanly.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I am not available to pick this up right now, but I can come back to it in the next working window and update you from there.',
      },
      {
        tone: 'Warm',
        text: 'I am not available to respond to this in real time right now, but I will pick it up in the next working window and let you know the next step from there.',
      },
      {
        tone: 'Firm',
        text: 'I am not available for this right now. I will return to it in the next working block rather than respond in real time outside that window.',
      },
    ],
    commonClientMessages: [
      'Can you jump on this now?',
      'Are you free to handle this today?',
      'I need to know if you are available for this right away.',
    ],
    commonMistakes: [
      'Giving a long personal explanation instead of a clean availability message.',
      'Saying you are unavailable without giving any next window at all.',
      'Softening the reply so much that the client still expects an immediate answer.',
    ],
    faq: [
      {
        q: 'How do you tell a client you are unavailable professionally?',
        a: 'State that you are unavailable, give the next realistic window if you have one, and avoid over-explaining unless it truly helps.',
      },
      {
        q: 'Do you need to explain why you are unavailable?',
        a: 'Usually no. The client mainly needs clarity about timing, not a full reason.',
      },
      {
        q: 'What helps the message land well?',
        a: 'A calm tone and a specific next window make the reply feel reliable rather than evasive.',
      },
    ],
    nextDecisionSlugs: [
      'client-messaging-outside-work-hours',
      'set-boundaries-with-demanding-client',
      'urgent-request-last-minute',
      'refuse-project-due-to-workload',
    ],
    generatorScenarioSlug: 'tell-client-you-are-unavailable',
    toolCta:
      'Paste the client message and the next time you can realistically respond. Flowdockr will help you say unavailable clearly without sounding flaky.',
  },

  {
    tier: 'tier2',
    slug: 'urgent-request-last-minute',
    title: 'How to respond to an urgent last-minute request',
    seoTitle: 'How to Respond to an Urgent Last-Minute Request | Flowdockr',
    metaDescription:
      'Learn how to respond to an urgent last-minute client request without overpromising. Protect scope, time, and urgency tradeoffs with Flowdockr.',
    primaryKeyword: 'how to respond to urgent request last minute',
    keywordVariants: [
      'last minute urgent client request reply',
      'urgent request what to say client',
      'how to respond to last minute client request',
      'client urgent request response',
    ],
    heroSubtitle: 'Urgent is not the same thing as automatic.',
    shortDescription:
      'The client is asking for something urgent at the last minute and you need to respond without blindly absorbing the rush.',
    situationSnapshot: [
      'The request arrives late and is framed as urgent, often with little room for normal planning.',
      'If you say yes too fast, you inherit the urgency without choosing the tradeoff.',
      'The strongest reply keeps urgency visible and tied to scope, timing, or cost.',
    ],
    whatsReallyHappening: [
      'Last-minute urgency often hides a tradeoff the client has not been asked to make yet.',
      'If every urgent ask becomes a free yes, rush work becomes a normal expectation.',
      'A good reply protects feasibility first, then offers choices.',
    ],
    realGoals: [
      'Acknowledge the urgency without accepting it as your default problem.',
      'Make the tradeoffs around speed visible.',
      'Offer a realistic path instead of a panic promise.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Acknowledge, then set the real window',
        whenToUse:
          'Use when you need to stay helpful but cannot commit to the implied speed.',
        risk: 'If the reply stays too soft, the client may still assume the original rushed timeline is possible.',
        exampleWording:
          'I understand this is urgent. Before I commit, I want to be clear about what is realistically possible in this window so I do not overpromise.',
      },
      {
        id: 'B',
        title: 'Trade speed against scope',
        whenToUse:
          'Use when a faster path exists only if the work becomes smaller.',
        risk: 'If the reduced version is not concrete, the client may still expect the full result on the rushed schedule.',
        exampleWording:
          'If this needs to move faster, the cleanest path is usually to reduce the immediate scope rather than try to force the full version through at the same speed.',
      },
      {
        id: 'C',
        title: 'Name rush conditions explicitly',
        whenToUse:
          'Use when urgency changes effort, sequencing, or availability materially.',
        risk: 'If the condition sounds like punishment, the client may resist instead of choosing.',
        exampleWording:
          'Because this is both last-minute and urgent, I would want to treat it as a rush request rather than fold it into the normal timeline assumptions.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I understand this is urgent. Before I commit, I want to be clear about what is realistically possible in this window so I do not overpromise.',
      },
      {
        tone: 'Warm',
        text: 'I can see why this feels urgent. The cleanest way to handle it is to look at what is realistically possible in this timeframe and decide whether we need to reduce scope or treat it as a rush request.',
      },
      {
        tone: 'Firm',
        text: 'I would not want to promise the full request on a last-minute timeline without clarifying the tradeoffs. If speed is the priority, we need to adjust scope, timing, or the rush conditions accordingly.',
      },
    ],
    commonClientMessages: [
      'Can you get this done today?',
      'We need this urgently and I know it is late.',
      'This just came up. Can you fit it in right away?',
    ],
    commonMistakes: [
      'Treating urgency as agreement instead of a new decision point.',
      'Promising speed before checking what has to give.',
      'Answering the timeline question without naming the scope or rush tradeoff.',
    ],
    faq: [
      {
        q: 'How do you respond to a last-minute urgent request?',
        a: 'Acknowledge the urgency, then state what is realistically possible and what would need to change if the client wants faster delivery.',
      },
      {
        q: 'Should you always offer a rush option?',
        a: 'Only if it is real and intentional. Sometimes the right move is a realistic timeline, not a rush promise.',
      },
      {
        q: 'What is the main risk here?',
        a: 'Absorbing the urgency without making the client choose the scope, timing, or cost tradeoff that comes with it.',
      },
    ],
    nextDecisionSlugs: [
      'client-expects-immediate-response',
      'client-messaging-outside-work-hours',
      'set-boundaries-with-demanding-client',
      'more-work-same-price',
    ],
    generatorScenarioSlug: 'urgent-request-last-minute',
    toolCta:
      'Paste the urgent request and the real timeline constraints. Flowdockr will help you answer quickly without overpromising or giving away rush work for free.',
  },

  {
    tier: 'tier3',
    slug: 'client-expects-immediate-response',
    title: 'Client expects an immediate response: what to say',
    seoTitle: 'Client Expects an Immediate Response? What to Say | Flowdockr',
    metaDescription:
      'Learn what to say when a client expects an immediate response. Set reply-time boundaries clearly and draft the message with Flowdockr.',
    primaryKeyword: 'client expects immediate response what to say',
    keywordVariants: [
      'client expects instant reply',
      'client wants immediate response what to say',
      'how to handle client expecting immediate response',
      'client expects fast replies',
    ],
    heroSubtitle:
      'Fast replies are helpful. Instant replies as a default expectation are a boundary problem.',
    shortDescription:
      'The client expects immediate replies and you need to reset the response-time boundary without sounding unavailable.',
    situationSnapshot: [
      'The client is acting as though every message should get a rapid answer.',
      'If you keep rewarding the pattern, faster and faster responses become the expectation.',
      'A clear response-time boundary helps the relationship feel more predictable, not less supportive.',
    ],
    whatsReallyHappening: [
      'This is usually about response norms, not only one message.',
      'Clients often escalate their expectation based on the fastest response they have seen from you.',
      'The right move is to define the normal reply rhythm before the pressure gets worse.',
    ],
    realGoals: [
      'Reset the expectation around response time.',
      'Protect your working rhythm without seeming disengaged.',
      'Give the client a dependable cadence they can work with.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Set the normal response window',
        whenToUse: 'Use when the client needs a simple expectation reset.',
        risk: 'If the response window is too vague, the client may still expect immediacy.',
        exampleWording:
          'I am not always available to reply immediately, but I do keep a consistent response window during working hours so things stay predictable.',
      },
      {
        id: 'B',
        title: 'Separate urgent from normal items',
        whenToUse:
          'Use when the client treats all communication as equally urgent.',
        risk: 'Without clear criteria, the urgent exception becomes the norm again.',
        exampleWording:
          'For normal project items I reply in my standard working window. If something is genuinely urgent, let us define that separately so we are not treating every message the same way.',
      },
      {
        id: 'C',
        title: 'Anchor on predictability',
        whenToUse:
          'Use when you want the boundary to feel like a service standard instead of a personal preference.',
        risk: 'If the message sounds too polished, it can feel abstract.',
        exampleWording:
          'What works best on my side is predictable response timing rather than instant replies, because it keeps project updates clear and manageable instead of reactive.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I am not always available to reply immediately, but I do keep a consistent response window during working hours so things stay predictable.',
      },
      {
        tone: 'Warm',
        text: 'I may not always be able to respond in real time, but I do keep a steady response rhythm during working hours so you are not left guessing about next steps.',
      },
      {
        tone: 'Firm',
        text: 'Immediate replies are not something I can treat as the default expectation. I work within a clear response window so communication stays consistent rather than reactive.',
      },
    ],
    commonClientMessages: [
      'Can you respond a bit faster when I message?',
      'I need quicker answers from you throughout the day.',
      'I expect a faster reply when something comes up.',
    ],
    commonMistakes: [
      'Trying to satisfy an immediate-response expectation without ever naming the boundary.',
      'Making the reply about your frustration instead of the communication standard.',
      'Setting a response boundary that is too vague to be useful.',
    ],
    faq: [
      {
        q: 'What do you say when a client expects immediate responses?',
        a: 'Set a normal response window clearly, separate urgent from non-urgent issues, and frame the boundary around predictability.',
      },
      {
        q: 'How do you avoid sounding unavailable?',
        a: 'Give the client a dependable cadence rather than a flat refusal. Predictable is easier to trust than instant but inconsistent.',
      },
      {
        q: 'Why does this issue get worse over time?',
        a: 'Because clients tend to anchor on the fastest response pattern they see from you, not the most realistic one.',
      },
    ],
    nextDecisionSlugs: [
      'client-messaging-outside-work-hours',
      'tell-client-you-are-unavailable',
      'set-boundaries-with-demanding-client',
      'urgent-request-last-minute',
    ],
    generatorScenarioSlug: 'client-expects-immediate-response',
    toolCta:
      'Paste the message and the response rhythm you want to keep. Flowdockr will help you reset immediate-response expectations without sounding checked out.',
  },

  {
    tier: 'tier1',
    featured: true,
    slug: 'say-no-to-client-professionally',
    title: 'How to say no to a client professionally',
    seoTitle: 'How to Say No to a Client Professionally | Flowdockr',
    metaDescription:
      'Learn how to say no to a client professionally without sounding awkward or harsh. Decline cleanly, protect your positioning, and draft the reply with Flowdockr.',
    primaryKeyword: 'how to say no to a client professionally',
    keywordVariants: [
      'say no to client politely',
      'professional way to say no to client',
      'how to turn down a client',
      'reject client professionally',
    ],
    heroSubtitle:
      'A professional no is clearer, shorter, and cleaner than most freelancers think.',
    shortDescription:
      'You need to say no to a client and want wording that stays professional, direct, and relationship-safe.',
    situationSnapshot: [
      'The client or project is not the right yes, and continuing the conversation would create more problems than progress.',
      'The challenge is saying no in a way that sounds deliberate rather than evasive.',
      'This page is for when you need a clear decline, not another round of negotiation.',
    ],
    whatsReallyHappening: [
      'Most awkward declines happen because the message tries to soften the no until it becomes unclear.',
      'A professional no protects both your positioning and the client relationship better than a vague maybe.',
      'The best decline language sounds like fit discipline, not emotional resistance.',
    ],
    realGoals: [
      'Decline the client cleanly and professionally.',
      'Avoid opening another round of negotiation by accident.',
      'Keep the relationship intact if there is any future value in it.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Lead with fit, not apology',
        whenToUse:
          'Use when you want the no to sound clear without sounding personal.',
        risk: 'If you make the fit reason too vague, the client may try to solve around it.',
        exampleWording:
          'I do not think I would be the right fit for this in the way it is currently shaped, so I would rather be direct now than take it on and force it.',
      },
      {
        id: 'B',
        title: 'Decline cleanly and close the loop',
        whenToUse:
          'Use when you do not want the thread to drag into more negotiation.',
        risk: 'If the close is too abrupt, it can feel colder than necessary.',
        exampleWording:
          'I am going to pass on this one, but I wanted to let you know clearly rather than leave the conversation hanging.',
      },
      {
        id: 'C',
        title: 'Leave a bridge only if real',
        whenToUse:
          'Use when there is still goodwill or a future-fit possibility worth preserving.',
        risk: 'A fake open door makes the decline feel insincere and often restarts the same conversation.',
        exampleWording:
          'If the shape of the project changes later, feel free to reach back out, but I would not be the right fit for the current version.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I do not think I would be the right fit for this as it is currently shaped, so I am going to pass rather than force a weak-fit engagement.',
      },
      {
        tone: 'Warm',
        text: 'Thanks for thinking of me for this. I do not think I would be the right fit for the current version, and I would rather be honest now than take it on without the right alignment.',
      },
      {
        tone: 'Firm',
        text: 'I am going to pass on this one. I would rather be direct now than move forward on something I do not think is the right fit.',
      },
    ],
    commonClientMessages: [
      'Can you take this on?',
      'I would love to work with you on this. Are you interested?',
      'Do you want to move forward with this project?',
    ],
    commonMistakes: [
      'Trying to be so nice that the no is no longer clear.',
      'Over-explaining the decline until it sounds like the client should negotiate you back in.',
      'Leaving the message vague and hoping the client will infer the no on their own.',
    ],
    faq: [
      {
        q: 'How do you say no to a client professionally?',
        a: 'Keep the reply clear, short, and fit-based. The goal is to decline cleanly, not to write a long defense of your decision.',
      },
      {
        q: 'Should you explain the full reason?',
        a: 'Only if it helps. Most of the time, a brief fit-based reason is enough.',
      },
      {
        q: 'Can you still keep the relationship positive?',
        a: 'Yes, if the no is clear and respectful. Ambiguous declines usually damage the relationship more than honest ones.',
      },
    ],
    nextDecisionSlugs: [
      'decline-project-politely',
      'reject-client-without-burning-bridge',
      'turn-down-freelance-work-nicely',
      'refuse-project-due-to-workload',
    ],
    generatorScenarioSlug: 'say-no-to-client-professionally',
    toolCta:
      'Paste the inquiry and the reason you want to decline. Flowdockr will help you say no professionally without sounding awkward, guilty, or overly sharp.',
  },

  {
    tier: 'tier2',
    slug: 'decline-project-politely',
    title: 'How to decline a project politely',
    seoTitle: 'How to Decline a Project Politely | Flowdockr',
    metaDescription:
      'Learn how to decline a project politely without leaving the client confused. Close the loop cleanly and draft the reply with Flowdockr.',
    primaryKeyword: 'how to decline a project politely',
    keywordVariants: [
      'decline project professionally',
      'what to say when declining a project',
      'politely decline freelance project',
      'how to turn down a project',
    ],
    heroSubtitle:
      'A polite decline is most useful when it also sounds final enough to end the loop.',
    shortDescription:
      'You need to decline a project and want wording that is respectful, clear, and hard to misread.',
    situationSnapshot: [
      'The project is not the right yes and you need to close the conversation without dragging it out.',
      'Many decline messages become awkward because they are too soft to sound final.',
      'A better message is simple, respectful, and complete.',
    ],
    whatsReallyHappening: [
      'The client mainly needs clarity, not a long explanation.',
      'If the decline feels uncertain, they will usually respond with more questions or pressure.',
      'A polite close works best when the next step is obvious: there is no next step.',
    ],
    realGoals: [
      'Decline the project clearly without sounding rude.',
      'Keep the thread from reopening into more negotiation.',
      'Leave the client with a clean final impression.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Thank, then decline',
        whenToUse:
          'Use when you want a simple professional close with minimal friction.',
        risk: 'If the thank-you is too long, the no can get buried.',
        exampleWording:
          'Thanks for considering me for this. I am going to pass on the project, but I wanted to let you know clearly rather than leave it open-ended.',
      },
      {
        id: 'B',
        title: 'Use a brief fit reason',
        whenToUse:
          'Use when you want the decline to feel grounded without inviting debate.',
        risk: 'Too much detail turns the reason into a negotiation target.',
        exampleWording:
          'I do not think I would be the best fit for this in its current form, so I am going to step back rather than force it.',
      },
      {
        id: 'C',
        title: 'Close with a clean final line',
        whenToUse:
          'Use when the conversation has already had some back-and-forth and needs a firmer end.',
        risk: 'If the close sounds cold, the overall message can land harsher than intended.',
        exampleWording:
          'I appreciate the opportunity, but I am going to pass on this one. Wishing you the best with it from here.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Thanks for considering me for this. I am going to pass on the project, but I wanted to let you know clearly rather than leave it open-ended.',
      },
      {
        tone: 'Warm',
        text: 'Thanks again for reaching out. I do not think I would be the best fit for the project as it stands, so I am going to step back rather than take it on without the right alignment.',
      },
      {
        tone: 'Firm',
        text: 'I appreciate the opportunity, but I am going to pass on this one. I would rather be direct now than keep the conversation half-open.',
      },
    ],
    commonClientMessages: [
      'Would you like to take this project on?',
      'Can we move forward with you on this?',
      'I would love to confirm this with you if you are interested.',
    ],
    commonMistakes: [
      'Writing a decline that sounds polite but does not actually close the decision.',
      'Giving so much context that the client starts solving the reasons for you.',
      'Leaving the reply vague because you are uncomfortable with finality.',
    ],
    faq: [
      {
        q: 'How do you decline a project politely?',
        a: 'Thank the client, decline clearly, and keep the explanation brief enough that the no still feels final.',
      },
      {
        q: 'Do you need to give a reason?',
        a: 'Only a short fit-based reason if it helps. Long reasons usually weaken the decline.',
      },
      {
        q: 'What is the biggest mistake in polite declines?',
        a: 'Trying to avoid discomfort so much that the client cannot tell whether you are actually saying no.',
      },
    ],
    nextDecisionSlugs: [
      'say-no-to-client-professionally',
      'reject-client-without-burning-bridge',
      'turn-down-freelance-work-nicely',
      'refuse-project-due-to-workload',
    ],
    generatorScenarioSlug: 'decline-project-politely',
    toolCta:
      'Paste the project request and how direct you want to be. Flowdockr will help you decline politely without leaving the thread confusingly open.',
  },

  {
    tier: 'tier2',
    slug: 'reject-client-without-burning-bridge',
    title: 'How to reject a client without burning the bridge',
    seoTitle: 'How to Reject a Client Without Burning the Bridge | Flowdockr',
    metaDescription:
      'Learn how to reject a client without burning the bridge. Keep the tone positive, hold the no clearly, and draft the reply with Flowdockr.',
    primaryKeyword: 'how to reject a client without burning bridge',
    keywordVariants: [
      'reject client without burning bridge',
      'say no to client keep relationship',
      'turn down client nicely',
      'decline client without damaging relationship',
    ],
    heroSubtitle:
      'The bridge usually stays intact when the no is honest, calm, and not over-negotiable.',
    shortDescription:
      'You need to reject the client but still want the relationship to stay respectful and future-safe.',
    situationSnapshot: [
      'The fit is wrong, but there may still be referral value, reputational value, or future-fit value in the relationship.',
      'A vague no feels slippery. A sharp no feels personal.',
      'The right middle is a clear decline with a generous tone.',
    ],
    whatsReallyHappening: [
      'Clients usually take a no better when it feels settled rather than hedged.',
      'Trying too hard to sound nice can actually make the reply sound less trustworthy.',
      'Protecting the bridge is mostly about tone, clarity, and not criticizing the client.',
    ],
    realGoals: [
      'Decline the client without making the relationship awkward.',
      'Keep the no clear enough that it does not restart negotiation.',
      'Leave the interaction feeling respectful on both sides.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Decline with appreciation',
        whenToUse:
          'Use when you want the client to feel respected even though the answer is no.',
        risk: 'If the appreciation is too soft, the no can feel less final.',
        exampleWording:
          'I appreciate you reaching out and thinking of me for this. I am going to pass on the current opportunity, but I wanted to let you know directly and respectfully.',
      },
      {
        id: 'B',
        title: 'Use a fit-based no',
        whenToUse:
          'Use when you want to keep the decline grounded in alignment rather than judgment.',
        risk: 'If the fit language is too generic, it can sound evasive.',
        exampleWording:
          'I do not think I would be the right fit for this in its current shape, so I would rather be honest now than create friction later.',
      },
      {
        id: 'C',
        title: 'Leave a selective positive close',
        whenToUse:
          'Use when you want to preserve goodwill without reopening the current project.',
        risk: 'If the future-close is too open, the client may try to keep negotiating this same project.',
        exampleWording:
          'I hope the project goes well, and if the shape of the work changes meaningfully later, feel free to reach back out.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I appreciate you reaching out. I am going to pass on the current opportunity, but I wanted to let you know directly and respectfully rather than leave it uncertain.',
      },
      {
        tone: 'Warm',
        text: 'Thanks again for thinking of me for this. I do not think I would be the right fit for the current version, so I am going to step back now rather than create friction later.',
      },
      {
        tone: 'Firm',
        text: 'I am going to pass on this one, but I wanted to close the loop clearly and respectfully. I appreciate the opportunity.',
      },
    ],
    commonClientMessages: [
      'I would love to work together on this if you are interested.',
      'Can we confirm you for this project?',
      'Would you be open to taking this on for us?',
    ],
    commonMistakes: [
      'Trying to protect the bridge by making the no too ambiguous.',
      'Criticizing the client or project details more than necessary.',
      'Offering a future maybe so broadly that it keeps the current thread alive.',
    ],
    faq: [
      {
        q: 'How do you reject a client without burning the bridge?',
        a: 'Use a clear no, a respectful tone, and a fit-based reason rather than criticism or defensiveness.',
      },
      {
        q: 'Should you mention future possibilities?',
        a: 'Only if you genuinely mean it and only in a way that does not reopen the current discussion.',
      },
      {
        q: 'What usually burns the bridge?',
        a: 'Ambiguity, criticism, or a tone that sounds annoyed rather than simply clear.',
      },
    ],
    nextDecisionSlugs: [
      'say-no-to-client-professionally',
      'decline-project-politely',
      'turn-down-freelance-work-nicely',
      'decline-underpaid-project-politely',
    ],
    generatorScenarioSlug: 'reject-client-without-burning-bridge',
    toolCta:
      'Paste the inquiry and the relationship context. Flowdockr will help you reject the client cleanly while keeping the tone respectful and bridge-safe.',
  },

  {
    tier: 'tier3',
    slug: 'turn-down-freelance-work-nicely',
    title: 'How to turn down freelance work nicely',
    seoTitle: 'How to Turn Down Freelance Work Nicely | Flowdockr',
    metaDescription:
      'Learn how to turn down freelance work nicely without sounding vague. Keep the no clear, kind, and professional with Flowdockr.',
    primaryKeyword: 'how to turn down freelance work nicely',
    keywordVariants: [
      'turn down freelance work politely',
      'how to say no to freelance work',
      'decline freelance project nicely',
      'turn down project nicely',
    ],
    heroSubtitle: 'Nice works best when it still sounds like a decision.',
    shortDescription:
      'A direct landing page for gracefully turning down freelance work without leaving the client guessing.',
    situationSnapshot: [
      'The work is not the right fit, but you want the reply to sound kind and composed.',
      'This search intent usually wants wording, not theory.',
      'The message should sound like a decision, not hesitation wrapped in polite language.',
    ],
    whatsReallyHappening: [
      'Nice declines fail when they become so gentle that the client hears maybe.',
      'Most clients respect a clear no more than a fuzzy answer.',
      'The right tone is warm, short, and settled.',
    ],
    realGoals: [
      'Turn down the work clearly.',
      'Keep the tone kind and professional.',
      'Avoid reopening the conversation after the decline is sent.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Short and gracious',
        whenToUse: 'Use when you want the cleanest possible decline.',
        risk: 'If it is too short, it can feel abrupt.',
        exampleWording:
          'Thanks for thinking of me for this. I am going to pass on the project, but I wanted to let you know clearly and promptly.',
      },
      {
        id: 'B',
        title: 'Add a light fit reason',
        whenToUse:
          'Use when a little context will make the no easier to understand.',
        risk: 'Too much context makes the decline easier to negotiate against.',
        exampleWording:
          'I do not think I would be the right fit for this one, so I am going to step back rather than take it on without the right alignment.',
      },
      {
        id: 'C',
        title: 'Close on a positive note',
        whenToUse:
          'Use when you want the final sentence to feel generous without reopening things.',
        risk: 'If the close is too open-ended, the client may continue pursuing the same project.',
        exampleWording:
          'Wishing you the best with it, and thanks again for reaching out.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Thanks for thinking of me for this. I am going to pass on the project, but I wanted to let you know clearly and promptly.',
      },
      {
        tone: 'Warm',
        text: 'Thanks again for reaching out. I do not think I would be the right fit for this one, so I am going to step back rather than take it on without the right alignment.',
      },
      {
        tone: 'Firm',
        text: 'I am going to pass on this opportunity. I appreciate you getting in touch and wanted to close the loop clearly.',
      },
    ],
    commonClientMessages: [
      'Are you interested in taking this freelance project on?',
      'Would you like to work with us on this?',
      'Can we confirm you for this project?',
    ],
    commonMistakes: [
      'Making the decline sound nice but not final.',
      'Adding too much explanation for a query that mainly needs wording.',
      'Trying to sound friendly by promising future availability you do not actually mean.',
    ],
    faq: [
      {
        q: 'How do you turn down freelance work nicely?',
        a: 'Thank the client, decline clearly, and keep the message short enough that it still sounds like a decision.',
      },
      {
        q: 'What should you avoid?',
        a: 'Avoid vague wording, over-explaining, and leaving the reply open enough that the client treats it as a soft maybe.',
      },
      {
        q: 'Do you need a long reason?',
        a: 'No. A brief fit-based reason is usually enough if you want to include one at all.',
      },
    ],
    nextDecisionSlugs: [
      'say-no-to-client-professionally',
      'decline-project-politely',
      'reject-client-without-burning-bridge',
      'refuse-project-due-to-workload',
    ],
    generatorScenarioSlug: 'turn-down-freelance-work-nicely',
    toolCta:
      'Paste the project request and the tone you want. Flowdockr will help you turn the work down nicely without making the no ambiguous.',
  },

  {
    tier: 'tier2',
    slug: 'refuse-project-due-to-workload',
    title: 'How to refuse a project due to workload',
    seoTitle: 'How to Refuse a Project Due to Workload | Flowdockr',
    metaDescription:
      'Learn how to refuse a project due to workload without sounding chaotic or unreliable. Protect capacity and draft the reply with Flowdockr.',
    primaryKeyword: 'how to refuse a project due to workload',
    keywordVariants: [
      'decline project due to workload',
      'too busy to take project what to say',
      'how to say no to project because of workload',
      'turn down project due to capacity',
    ],
    heroSubtitle:
      'Capacity is a professional reason to say no when you communicate it clearly enough.',
    shortDescription:
      'You need to turn down a project because your workload is already too full to take it on well.',
    situationSnapshot: [
      'The opportunity may be fine in theory, but your current workload makes it a bad yes.',
      'If you phrase the decline poorly, it can sound disorganized or uncertain.',
      'A good reply makes the no sound responsible rather than overwhelmed.',
    ],
    whatsReallyHappening: [
      'This is a capacity-protection decision, not a failure of interest or professionalism.',
      'Saying yes despite workload pressure usually harms both delivery quality and client trust later.',
      'The message should make the decision sound intentional and responsible.',
    ],
    realGoals: [
      'Protect your workload without sounding chaotic.',
      'Decline the project clearly and professionally.',
      'Leave room for future fit only if it is genuine.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Name the capacity constraint cleanly',
        whenToUse:
          'Use when your workload is the real and sufficient reason for the decline.',
        risk: 'If the wording sounds frantic, the client may worry about reliability rather than fit.',
        exampleWording:
          'I am at capacity on current commitments, so I would rather decline this now than take it on without enough room to do it well.',
      },
      {
        id: 'B',
        title: 'Protect the quality standard',
        whenToUse:
          'Use when you want the decline to sound grounded in delivery quality, not only personal busyness.',
        risk: 'If you talk too much about quality, the message can drift away from the actual reason.',
        exampleWording:
          'I would not want to commit to this without enough bandwidth to handle it properly, so I think the better call is for me to step back on this one.',
      },
      {
        id: 'C',
        title: 'Offer a future reconnect only if true',
        whenToUse:
          'Use when the project might fit later and you genuinely want to preserve that option.',
        risk: 'A vague future path invites the client to wait on you instead of moving on.',
        exampleWording:
          'If timing shifts later and I have the right capacity, feel free to reach back out, but I would not want to commit to the current timing from where I am now.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I am at capacity on current commitments, so I would rather decline this now than take it on without enough room to do it well.',
      },
      {
        tone: 'Warm',
        text: 'Thanks for thinking of me for this. I am at capacity with current commitments, and I would rather be honest now than say yes without the bandwidth to handle the project properly.',
      },
      {
        tone: 'Firm',
        text: 'I would not want to commit to this with my current workload, so I am going to step back on the opportunity rather than force it.',
      },
    ],
    commonClientMessages: [
      'Can you take this on right now?',
      'We want to move quickly. Do you have room for this project?',
      'Would you be available to start on this soon?',
    ],
    commonMistakes: [
      'Describing your workload in a way that makes you sound chaotic.',
      'Softening the decline so much that the client still thinks you may take it.',
      'Leaving the client waiting on a maybe when you already know capacity is the real answer.',
    ],
    faq: [
      {
        q: 'How do you refuse a project due to workload professionally?',
        a: 'State the capacity limit clearly, frame the decision around doing the work well, and decline before the conversation drifts into false hope.',
      },
      {
        q: 'Does workload sound like a weak excuse?',
        a: 'Not when it is communicated clearly and responsibly. It often sounds more professional than saying yes and then struggling to deliver.',
      },
      {
        q: 'Should you offer to reconnect later?',
        a: 'Only if you genuinely mean it and can describe a real future change in timing or capacity.',
      },
    ],
    nextDecisionSlugs: [
      'decline-project-politely',
      'turn-down-freelance-work-nicely',
      'tell-client-you-are-unavailable',
      'say-no-to-client-professionally',
    ],
    generatorScenarioSlug: 'refuse-project-due-to-workload',
    toolCta:
      'Paste the project request and your workload context. Flowdockr will help you say no in a way that sounds responsible rather than overloaded.',
  },
];

export const pricingScenarios: PricingScenario[] = [
  ...corePricingScenarios,
  ...boundaryScopeControlScenarios,
];

export function getPricingScenarioBySlug(
  slug: string
): PricingScenario | undefined {
  return pricingScenarios.find((scenario) => scenario.slug === slug);
}

export function getRelatedPricingScenarios(slugs: string[]): PricingScenario[] {
  return slugs
    .map((slug) => getPricingScenarioBySlug(slug))
    .filter((scenario): scenario is PricingScenario => Boolean(scenario));
}
