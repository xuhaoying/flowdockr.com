import type { PricingScenario } from '@/types/pricing-cluster';

export const pricingScenarios: PricingScenario[] = [
  {
    tier: 'tier1',
    featured: true,
    slug: 'price-pushback-after-proposal',
    title: 'How to respond when a prospect says your quote is too high',
    seoTitle: 'How to Respond When a Prospect Says Your Quote Is Too High | Flowdockr',
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
        whenToUse: 'Use when interest is still strong and price pushback feels exploratory.',
        risk: 'If phrasing is too hard, the prospect may read it as inflexibility.',
        exampleWording:
          'Thanks for sharing that. The quote reflects the scope and outcome we aligned on. If helpful, I can clarify where the core value sits so we can decide the best next step.',
      },
      {
        id: 'B',
        title: 'Test whether budget is real',
        whenToUse: 'Use when you are unsure if this is budget reality or negotiation habit.',
        risk: 'If you ask vaguely, the conversation can stay abstract and circular.',
        exampleWording:
          'Understood. Can you share the working range you need to stay within so I can tell you whether we should adjust scope or keep the current structure?',
      },
      {
        id: 'C',
        title: 'Reframe through scope, not rate',
        whenToUse: 'Use when budget may be constrained but project fit is still good.',
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
    generatorScenarioSlug: 'lowball-offer',
    toolCta:
      'Paste the prospect’s exact message, your quote, and the tone you want. Flowdockr will draft a reply that protects your rate without sounding defensive.',
  },

  {
    tier: 'tier1',
    featured: true,
    slug: 'discount-pressure-before-signing',
    title: 'How to handle discount pressure before signing',
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
        whenToUse: 'Use when deal quality is strong and scope is already aligned.',
        risk: 'Too much rigidity can create unnecessary friction near close.',
        exampleWording:
          'I’d prefer to keep the current pricing as quoted since it reflects the agreed scope. If everything else is aligned, I can move straight to final signature details.',
      },
      {
        id: 'B',
        title: 'Trade, don’t concede',
        whenToUse: 'Use when you are open to movement only with reciprocal commitments.',
        risk: 'If trade terms are vague, the concession becomes a pure margin leak.',
        exampleWording:
          'If we confirm this week and keep payment terms as proposed, I can offer a revised option tied to that commitment.',
      },
      {
        id: 'C',
        title: 'Offer a smaller version',
        whenToUse: 'Use when budget is constrained but collaboration still makes sense.',
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
      'small-discount-before-closing',
      'budget-lower-than-expected',
      'cheaper-competitor-comparison',
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
    generatorScenarioSlug: 'client-asks-discount',
    toolCta:
      'Paste the exact discount request and your current offer. Flowdockr will help you reply without weakening your position right before the deal closes.',
  },

  {
    tier: 'tier1',
    featured: true,
    slug: 'budget-lower-than-expected',
    title: 'How to respond when the budget is lower than your quote',
    seoTitle: 'How to Respond When the Budget Is Lower Than Your Quote | Flowdockr',
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
        whenToUse: 'Use when project fit is strong but full scope is unrealistic at current budget.',
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
        whenToUse: 'Use when the budget gap is too large for credible delivery.',
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
      'discount-pressure-before-signing',
      'price-pushback-after-proposal',
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
    title: 'How to respond when a prospect says someone else is cheaper',
    seoTitle: 'How to Respond When a Prospect Says Someone Else Is Cheaper | Flowdockr',
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
        whenToUse: 'Use when buyer still values quality and delivery confidence.',
        risk: 'Abstract claims can fail if you do not connect to concrete scope.',
        exampleWording:
          'Totally fair to compare options. The key is whether scope, process, and support levels are truly equivalent to the outcome you want.',
      },
      {
        id: 'B',
        title: 'Clarify differences in scope',
        whenToUse: 'Use when you suspect the compared quote is not apples-to-apples.',
        risk: 'Too much detail can overwhelm instead of clarifying.',
        exampleWording:
          'I can map the scope side by side so you can see the practical difference in deliverables, support, and delivery standards.',
      },
      {
        id: 'C',
        title: 'Bless and release',
        whenToUse: 'Use when buyer clearly optimizes only for the lowest number.',
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
    title: 'How to respond when they want more work for the same price',
    seoTitle: 'How to Respond When They Want More Work for the Same Price | Flowdockr',
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
        whenToUse: 'Use when request may come from unclear scope understanding.',
        risk: 'If phrasing is vague, the boundary still remains ambiguous.',
        exampleWording:
          'Happy to support that direction. This request sits outside the current scope, so we can either keep the existing plan or scope the addition properly.',
      },
      {
        id: 'B',
        title: 'Re-quote the expanded scope',
        whenToUse: 'Use when added work materially changes effort or delivery timeline.',
        risk: 'If you skip explicit pricing update, expansion becomes implicit default.',
        exampleWording:
          'I can add these deliverables with an updated quote so expectations stay clear on both sides.',
      },
      {
        id: 'C',
        title: 'Offer phased delivery',
        whenToUse: 'Use when you want to preserve goodwill without absorbing full expansion now.',
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
      'budget-lower-than-expected',
      'can-you-do-it-cheaper',
      'price-pushback-after-proposal',
    ],
    guideLinks: [
      {
        href: '/guides/reduce-scope-instead-of-lowering-rate',
        label: 'Reduce scope instead of lowering your rate',
      },
    ],
    generatorScenarioSlug: 'more-work-same-budget',
    toolCta:
      'Paste the extra request and your original scope. Flowdockr will help you respond clearly without sounding defensive or opening the door to unpaid work.',
  },

  {
    tier: 'tier2',
    slug: 'free-trial-work-request',
    title: 'How to respond to a free trial work request',
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
    heroSubtitle:
      'Stay professional without normalizing unpaid proof-of-work.',
    shortDescription:
      'Prospect asks for free sample work before commitment.',
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
        whenToUse: 'Use when you have relevant prior work that demonstrates fit quickly.',
        risk: 'Examples that are too generic may fail to resolve trust concern.',
        exampleWording:
          'I don’t provide unpaid custom trial work, but I can share relevant examples and process detail so you can evaluate fit clearly.',
      },
      {
        id: 'B',
        title: 'Offer a paid test',
        whenToUse: 'Use when buyer needs tailored proof and you want a fair trial structure.',
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
    generatorScenarioSlug: 'free-sample-work',
    toolCta:
      'Paste the free-trial request and your preferred boundary. Flowdockr will draft a response that stays professional without giving away unpaid work.',
  },

  {
    tier: 'tier3',
    slug: 'can-you-do-it-cheaper',
    title: 'How to respond when they ask, “Can you do it cheaper?”',
    seoTitle: 'How to Respond When They Ask “Can You Do It Cheaper?” | Flowdockr',
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
        whenToUse: 'Use when message is short and intent behind the ask is unclear.',
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
        whenToUse: 'Use when scope fit is strong and price pressure appears tactical.',
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
      'price-pushback-after-proposal',
      'discount-pressure-before-signing',
      'budget-lower-than-expected',
    ],
    guideLinks: [
      {
        href: '/guides/when-to-discount-and-when-not-to',
        label: 'When to discount and when not to',
      },
    ],
    generatorScenarioSlug: 'client-asks-discount',
    toolCta:
      'Paste the exact message and Flowdockr will help you figure out whether this is price pushback, budget mismatch, or discount pressure, then draft the right reply.',
  },

  {
    tier: 'tier2',
    slug: 'small-discount-before-closing',
    title: 'How to handle a small discount request right before closing',
    seoTitle: 'How to Handle a Small Discount Request Right Before Closing | Flowdockr',
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
    shortDescription:
      'Final-stage micro-concession pressure before signature.',
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
        whenToUse: 'Use when deal is healthy and no further concession is needed.',
        risk: 'If too abrupt, buyer may perceive avoidable friction at close.',
        exampleWording:
          'I’d prefer to keep pricing as quoted so we start on strong footing, and I’m ready to proceed immediately if everything else is aligned.',
      },
      {
        id: 'B',
        title: 'Exchange for a commitment',
        whenToUse: 'Use when you can offer micro-flexibility only with reciprocal terms.',
        risk: 'Without clear terms, discount becomes pure margin leakage.',
        exampleWording:
          'If we finalize this week and keep payment terms as proposed, I can offer a one-time close adjustment.',
      },
      {
        id: 'C',
        title: 'Repackage, not discount',
        whenToUse: 'Use when you want to preserve price logic while offering practical movement.',
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
    generatorScenarioSlug: 'client-asks-discount',
    toolCta:
      'Paste the final discount request and your current offer. Flowdockr will help you close professionally without undermining your pricing at the last minute.',
  },
];

export function getPricingScenarioBySlug(slug: string): PricingScenario | undefined {
  return pricingScenarios.find((scenario) => scenario.slug === slug);
}

export function getRelatedPricingScenarios(slugs: string[]): PricingScenario[] {
  return slugs
    .map((slug) => getPricingScenarioBySlug(slug))
    .filter((scenario): scenario is PricingScenario => Boolean(scenario));
}
