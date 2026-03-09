import type { PricingScenario } from '@/types/pricing-cluster';

export const pricingScenarios: PricingScenario[] = [
  {
    tier: 'tier1',
    featured: true,
    slug: 'price-pushback-after-proposal',
    title: 'How to respond to price pushback after sending a proposal',
    seoTitle: 'How to Respond to Price Pushback After Sending a Proposal | Flowdockr',
    metaDescription:
      'Handle proposal price pushback without discounting too early. Keep leverage, protect positioning, and move the deal forward.',
    primaryKeyword: 'quote too high',
    keywordVariants: [
      'price too high',
      'rate too high',
      'too expensive proposal',
      'price objection freelance',
    ],
    heroSubtitle:
      'Keep the deal alive without discounting too early or sounding defensive.',
    shortDescription:
      'Prospect says your quote is too high after reviewing the proposal.',
    situationSnapshot: [
      'This usually happens when the prospect likes the project but tests your flexibility before committing.',
      'Dropping your rate immediately weakens your anchor for the rest of the deal.',
      'Pushing too hard can stall momentum, so your reply needs structure and calm tone.',
    ],
    whatsReallyHappening: [
      'The objection may be tactical testing rather than a full rejection of your proposal.',
      'They may still want your approach but need clearer confidence on value and outcomes.',
      'You need to protect anchor while offering a structured path to continue the deal.',
    ],
    realGoals: [
      'Keep the deal active while protecting your original positioning.',
      'Test whether budget is the real blocker or a negotiation move.',
      'Move the conversation to scope, options, and next steps.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Hold value',
        whenToUse: 'Use when they challenge price but still show clear interest in your approach.',
        risk: 'If too rigid, it may read like inflexibility instead of confidence.',
        exampleWording:
          'I understand the concern. My quote reflects the scope and quality needed for the outcome we discussed. If useful, I can walk through where the value is concentrated so we can decide the best path forward.',
      },
      {
        id: 'B',
        title: 'Restructure scope',
        whenToUse: 'Use when budget may be real and you still want to keep the opportunity.',
        risk: 'If scope cuts are vague, expectations can become messy later.',
        exampleWording:
          'If budget is the main limit, I can offer a reduced-scope option that keeps the highest-impact parts. That gives a lower total without weakening delivery quality.',
      },
      {
        id: 'C',
        title: 'Walk away politely',
        whenToUse: 'Use when they only optimize for lowest price and ignore fit or quality.',
        risk: 'Walking too early can lose deals that were still recoverable.',
        exampleWording:
          'Thanks for the transparency. It sounds like we may be targeting different delivery levels right now, so it may be better to pause here. If priorities shift, happy to reconnect.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Thanks for the pushback. My quote reflects the agreed scope and delivery quality. If budget is the issue, I can suggest a reduced-scope option instead of discounting the same scope.',
      },
      {
        tone: 'Warm',
        text: 'I appreciate you sharing that. My pricing is tied to the scope and outcome we discussed. If it helps, I can draft a leaner version that fits a lower range while keeping core quality intact.',
      },
      {
        tone: 'Firm',
        text: 'I do not lower pricing on the same scope by default. I can either keep the current scope and price, or propose a smaller scope at a lower total so expectations stay clear.',
      },
    ],
    faq: [
      {
        q: 'Should I discount immediately after price pushback?',
        a: 'Usually no. First identify whether this is a true budget constraint or a negotiation test.',
      },
      {
        q: 'How do I avoid sounding defensive?',
        a: 'Keep tone calm, explain scope-value logic, and offer structured options instead of emotional justification.',
      },
      {
        q: 'Can this still close without discounting?',
        a: 'Yes. Many deals close when you reframe around scope and outcomes rather than reacting to the number alone.',
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
  },
  {
    tier: 'tier1',
    featured: true,
    slug: 'discount-pressure-before-signing',
    title: 'How to handle discount pressure before signing',
    seoTitle: 'How to Handle Discount Pressure Before Signing | Flowdockr',
    metaDescription:
      'Prospect asks for a discount right before signing. Learn how to keep leverage and close without weakening your pricing model.',
    primaryKeyword: 'discount pressure before signing',
    keywordVariants: [
      'last minute discount request',
      'discount before contract signing',
      'prospect asks for discount before close',
    ],
    heroSubtitle:
      'Negotiate the close without giving away unnecessary margin.',
    shortDescription:
      'Near-close discount request right before contract signature.',
    situationSnapshot: [
      'This appears late in the process when clients sense urgency on your side.',
      'A quick yes can damage your anchor and set weak expectations for future work.',
      'Your response should trade concessions for clear terms, not random flexibility.',
    ],
    whatsReallyHappening: [
      'They are applying close-stage pressure to extract extra value before commitment.',
      'Your urgency is being tested more than your delivery quality.',
      'A structured close option can preserve both momentum and pricing integrity.',
    ],
    realGoals: [
      'Protect your base rate during the highest-leverage moment.',
      'Close with structure instead of emotional urgency.',
      'Avoid setting a precedent that every close needs a discount.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Hold value and close',
        whenToUse: 'Use when buying intent is clear and objection is mostly tactical.',
        risk: 'If tone is too hard, it may create avoidable friction near close.',
        exampleWording:
          'I keep this scope at the quoted rate so quality and delivery stay reliable. If you are ready, we can finalize this version and begin on the agreed timeline.',
      },
      {
        id: 'B',
        title: 'Trade concession for terms',
        whenToUse: 'Use when you are open to flexibility only with a reciprocal commitment.',
        risk: 'Unclear tradeoffs can become hidden scope or process debt.',
        exampleWording:
          'If we simplify scope and confirm this week, I can adjust pricing on that revised version. I can send both options so you can choose quickly.',
      },
      {
        id: 'C',
        title: 'Pause politely',
        whenToUse: 'Use when they continue pushing without commitment signals.',
        risk: 'You may lose a deal that could have closed with tighter framing.',
        exampleWording:
          'It sounds like we are not aligned on terms yet. I would rather pause than force a structure that is weak for both sides.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I keep this scope at the quoted rate. If budget is fixed, I can provide a reduced-scope option instead.',
      },
      {
        tone: 'Warm',
        text: 'I want this to work and keep quality high. Rather than discounting the same scope, I can suggest a leaner version that fits your target budget.',
      },
      {
        tone: 'Firm',
        text: 'I do not apply last-minute discounts to unchanged scope. We can either proceed as quoted or revise scope and price together.',
      },
    ],
    faq: [
      {
        q: 'Is discount pressure before signing normal?',
        a: 'Yes. It is a common tactic near close when the buyer tests your flexibility.',
      },
      {
        q: 'What is safer than saying yes to a discount?',
        a: 'Exchange any concession for scope reduction, faster approval, or clear payment terms.',
      },
      {
        q: 'Will holding price always kill the deal?',
        a: 'No. Clear and calm positioning often increases trust when handled professionally.',
      },
    ],
    nextDecisionSlugs: [
      'small-discount-before-closing',
      'budget-lower-than-expected',
      'price-pushback-after-proposal',
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
  },
  {
    tier: 'tier1',
    featured: true,
    slug: 'budget-lower-than-expected',
    title: 'How to reply when budget is lower than expected',
    seoTitle: 'How to Reply When Budget Is Lower Than Expected | Flowdockr',
    metaDescription:
      'When a client budget is below your quote, learn how to test constraints and reshape scope without collapsing your pricing logic.',
    primaryKeyword: 'budget lower than expected',
    keywordVariants: [
      'client budget too low',
      'budget mismatch freelance quote',
      'what to do when budget is lower than quote',
    ],
    heroSubtitle:
      'Treat budget mismatch as a scope design problem, not instant discount pressure.',
    shortDescription:
      'Prospect says they want to proceed but budget is below your quote.',
    situationSnapshot: [
      'Sometimes budget constraints are real and still worth engaging.',
      'Cutting price on unchanged scope creates margin leakage and delivery risk.',
      'A better move is to prioritize outcomes and sequence the work.',
    ],
    whatsReallyHappening: [
      'This is often a scope-shaping problem, not a pure rate-negotiation problem.',
      'The client may value your approach but cannot fund the full package immediately.',
      'Phasing or reduced scope can keep quality intact without collapsing your rate logic.',
    ],
    realGoals: [
      'Verify whether budget is fixed or flexible.',
      'Protect quality by reshaping scope, timeline, or phases.',
      'Keep collaboration viable without underpricing core work.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Prioritize outcomes',
        whenToUse: 'Use when they care about impact but cannot fund full scope now.',
        risk: 'If priorities are unclear, reduced scope can disappoint later.',
        exampleWording:
          'Given the budget range, the best move is to prioritize the highest-impact deliverables first. I can map a phase one version that fits your current constraints.',
      },
      {
        id: 'B',
        title: 'Phase delivery',
        whenToUse: 'Use when project value is strong but timing or cash flow is tight.',
        risk: 'Without clear phase boundaries, phase one can become full scope by stealth.',
        exampleWording:
          'We can split this into two phases so phase one fits your current budget, then expand once the first outcomes are validated.',
      },
      {
        id: 'C',
        title: 'Decline politely',
        whenToUse: 'Use when budget gap is too large for meaningful delivery.',
        risk: 'You may lose a relationship if wording sounds dismissive.',
        exampleWording:
          'Thanks for the transparency. At that range I would not be able to deliver the standard we discussed, so it is better to pause than overpromise.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Understood. Rather than discounting full scope, I can design a smaller phase that matches your budget and still delivers useful results.',
      },
      {
        tone: 'Warm',
        text: 'Thanks for being clear on budget. I would rather adapt scope and sequence than cut the same work to a level that weakens outcomes.',
      },
      {
        tone: 'Firm',
        text: 'I do not reduce full scope to fit that range. I can either propose a reduced scope or we pause until budget aligns with the original plan.',
      },
    ],
    faq: [
      {
        q: 'How do I respond to low budget without sounding rigid?',
        a: 'Acknowledge the constraint and offer a scoped or phased alternative instead of rejecting the client outright.',
      },
      {
        q: 'Should I always offer a cheaper option?',
        a: 'Only when it maps to less scope, not less value expectation for the same work.',
      },
      {
        q: 'Can low-budget clients still be good clients?',
        a: 'Yes, if they respect scope boundaries and decision clarity.',
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
  },
  {
    tier: 'tier1',
    featured: true,
    slug: 'cheaper-competitor-comparison',
    title: 'How to respond when a prospect compares cheaper competitors',
    seoTitle: 'How to Respond to Cheaper Competitor Comparison | Flowdockr',
    metaDescription:
      'Handle competitor price comparison without entering a race to the bottom. Differentiate on fit, scope, and delivery reliability.',
    primaryKeyword: 'cheaper competitor comparison',
    keywordVariants: [
      'another freelancer is cheaper',
      'client compares my price to cheaper quote',
      'respond to cheaper competitor pricing',
    ],
    heroSubtitle:
      'Stay out of pure price competition and reframe the decision criteria.',
    shortDescription:
      'Prospect says another freelancer can do it cheaper.',
    situationSnapshot: [
      'Comparison pressure often appears when the buyer wants reassurance on value.',
      'Matching the cheapest option turns your service into a commodity.',
      'You need to differentiate clearly without attacking competitors.',
    ],
    whatsReallyHappening: [
      'The buyer is using competitor pricing to test whether your quote is elastic.',
      'They may not see the process and reliability difference behind pricing gaps.',
      'Your response must reframe decision criteria beyond a single number.',
    ],
    realGoals: [
      'Shift decision from price-only to fit and execution quality.',
      'Keep tone calm and non-defensive.',
      'Offer a narrowed option only if budget is truly constrained.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Differentiate on delivery',
        whenToUse: 'Use when client still considers your proposal seriously.',
        risk: 'If too abstract, value claims can sound generic.',
        exampleWording:
          'Totally fair to compare options. My pricing includes strategy depth, communication cadence, and delivery reliability, not only output volume.',
      },
      {
        id: 'B',
        title: 'Offer a narrower option',
        whenToUse: 'Use when budget is likely real but they prefer your approach.',
        risk: 'If not scoped clearly, you may still get full expectations at lower price.',
        exampleWording:
          'If cost is the deciding factor, I can draft a narrower version so you can compare options on aligned scope rather than mismatched packages.',
      },
      {
        id: 'C',
        title: 'Disqualify with respect',
        whenToUse: 'Use when buyer only optimizes for lowest number.',
        risk: 'Direct tone can feel abrupt if relationship context is early.',
        exampleWording:
          'If the main decision criterion is lowest price only, I may not be the right fit for this engagement, and that is completely okay.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Comparison makes sense. My quote reflects scope, process, and reliability. If needed, I can outline a narrower scope for a lower total.',
      },
      {
        tone: 'Warm',
        text: 'I appreciate the transparency. Different quotes often reflect different delivery levels. Happy to map a leaner option if budget is the key constraint.',
      },
      {
        tone: 'Firm',
        text: 'I do not compete on price alone. I can provide a reduced-scope alternative, but I would not match lower pricing on unchanged expectations.',
      },
    ],
    faq: [
      {
        q: 'Should I match a cheaper competitor?',
        a: 'Not by default. Match only if scope and operating model are genuinely equivalent.',
      },
      {
        q: 'How do I avoid sounding insecure?',
        a: 'Acknowledge comparison calmly and state concrete differences in process and outcomes.',
      },
      {
        q: 'What if they only care about price?',
        a: 'That is a qualification signal. It can be better to exit than accept weak-fit economics.',
      },
    ],
    nextDecisionSlugs: [
      'price-pushback-after-proposal',
      'discount-pressure-before-signing',
      'budget-lower-than-expected',
      'can-you-do-it-cheaper',
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
  },
  {
    tier: 'tier2',
    slug: 'more-work-same-price',
    title: 'How to handle more work requests at the same price',
    seoTitle: 'How to Handle More Work Requests at the Same Price | Flowdockr',
    metaDescription:
      'When clients ask for extra deliverables without extra budget, learn how to re-establish scope and present clear options.',
    primaryKeyword: 'more work same price',
    keywordVariants: [
      'extra deliverables same budget',
      'scope creep same fee',
      'client wants more work no budget increase',
    ],
    heroSubtitle:
      'Protect scope boundaries before hidden expansion erodes margin.',
    shortDescription:
      'Client asks for additional deliverables but wants original budget.',
    situationSnapshot: [
      'Scope creep often starts with requests framed as small add-ons.',
      'Agreeing silently resets expectations for the rest of the project.',
      'Clear scope framing can protect both relationship and delivery quality.',
    ],
    whatsReallyHappening: [
      'The client may not see the request as expansion unless boundaries are made explicit.',
      'Without a scope reset, your project economics erode incrementally.',
      'Clear options reduce friction better than emotional pushback.',
    ],
    realGoals: [
      'Separate original scope from new requests clearly.',
      'Offer choices rather than emotional pushback.',
      'Protect project economics and timeline reliability.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Clarify boundary and preserve scope',
        whenToUse: 'Use when added requests are clearly outside agreed deliverables.',
        risk: 'If tone is too abrupt, client may read it as resistance.',
        exampleWording:
          'I can help with those additions. Since they are outside current scope, we can either keep the original plan, or add the new items with an updated estimate.',
      },
      {
        id: 'B',
        title: 'Trade off within current budget',
        whenToUse: 'Use when budget cannot move but client is open to substitutions.',
        risk: 'Trade-offs must be explicit or complexity returns later.',
        exampleWording:
          'If budget needs to stay fixed, we can swap lower-priority items for these new requests so total effort remains aligned.',
      },
      {
        id: 'C',
        title: 'One-time courtesy with boundary',
        whenToUse: 'Use when request is truly minor and relationship value is high.',
        risk: 'If not framed clearly, courtesy becomes default expectation.',
        exampleWording:
          'I can include this one item as a one-time courtesy to keep momentum. Any further additions we can treat as a scoped add-on.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'Those additions are outside the original scope. I can either keep current deliverables and budget, or send an updated scope and total.',
      },
      {
        tone: 'Warm',
        text: 'Happy to support those additions. Since they extend scope, I can map two options so you can choose between current budget or expanded deliverables.',
      },
      {
        tone: 'Firm',
        text: 'I would not include added deliverables under the existing quote by default. We should either swap scope items or revise budget.',
      },
    ],
    faq: [
      {
        q: 'How do I push back on extra work without conflict?',
        a: 'Use process language: clarify scope, identify additions, and present options calmly.',
      },
      {
        q: 'Can I include small extras sometimes?',
        a: 'Yes, but label them as one-time courtesy so baseline expectations stay clear.',
      },
      {
        q: 'What is the biggest risk with scope creep?',
        a: 'Margin erosion and timeline instability caused by hidden work expansion.',
      },
    ],
    nextDecisionSlugs: [
      'budget-lower-than-expected',
      'discount-pressure-before-signing',
      'free-trial-work-request',
    ],
    guideLinks: [
      {
        href: '/guides/reduce-scope-instead-of-lowering-rate',
        label: 'Reduce scope instead of lowering your rate',
      },
    ],
    generatorScenarioSlug: 'more-work-same-budget',
  },
  {
    tier: 'tier2',
    slug: 'free-trial-work-request',
    title: 'How to respond to free trial work requests',
    seoTitle: 'How to Respond to Free Trial Work Requests | Flowdockr',
    metaDescription:
      'Handle unpaid trial requests professionally. Set boundaries while offering safer ways to evaluate fit.',
    primaryKeyword: 'free trial work request',
    keywordVariants: [
      'unpaid trial work client request',
      'free sample work freelance',
      'how to refuse unpaid custom trial',
    ],
    heroSubtitle:
      'Protect boundaries without sounding hostile or defensive.',
    shortDescription:
      'Prospect asks for unpaid custom work before committing.',
    situationSnapshot: [
      'Free trial asks often shift delivery risk fully to the freelancer.',
      'Saying yes quickly can set a weak precedent for the engagement.',
      'You can decline custom unpaid work while still helping them evaluate fit.',
    ],
    whatsReallyHappening: [
      'The client is trying to reduce decision risk by transferring it to your unpaid labor.',
      'If unpaid custom work becomes normal, boundary problems usually continue later.',
      'A paid mini-test or portfolio proof keeps evaluation fair and professional.',
    ],
    realGoals: [
      'Set a clear professional boundary on unpaid custom work.',
      'Offer low-risk alternatives like portfolio proof or paid mini-tests.',
      'Keep conversation constructive if opportunity is still viable.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Policy-based boundary',
        whenToUse: 'Use when request is clearly unpaid custom execution.',
        risk: 'A short rejection without alternatives can feel abrupt.',
        exampleWording:
          'I do not provide unpaid custom sample work, but I can share relevant examples and process notes so you can evaluate fit confidently.',
      },
      {
        id: 'B',
        title: 'Paid trial option',
        whenToUse: 'Use when buyer wants tailored proof before larger commitment.',
        risk: 'Trial scope must be strict to avoid open-ended unpaid expansion.',
        exampleWording:
          'If you want tailored validation, we can run a small paid test with fixed scope and timeline, then decide next steps from concrete results.',
      },
      {
        id: 'C',
        title: 'Polite decline and exit',
        whenToUse: 'Use when prospect insists on free custom work as requirement.',
        risk: 'May close the opportunity, but protects long-term positioning.',
        exampleWording:
          'Given your current process requires unpaid custom work upfront, this may not be the right fit on my side. Wishing you a smooth search.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I do not provide unpaid custom samples. I can share relevant case work or propose a fixed paid test if that helps your decision.',
      },
      {
        tone: 'Warm',
        text: 'I understand wanting confidence before commitment. For custom work I keep validation inside a paid trial, and I can share similar portfolio examples now.',
      },
      {
        tone: 'Firm',
        text: 'I do not take unpaid custom trial assignments. I can offer a scoped paid test, otherwise it is better to pause here.',
      },
    ],
    faq: [
      {
        q: 'How do I say no to free trial work politely?',
        a: 'Acknowledge their need to evaluate fit, state your policy, and offer alternatives.',
      },
      {
        q: 'Is a free sample request always a red flag?',
        a: 'Not always, but repeated insistence on unpaid custom work is a quality filter signal.',
      },
      {
        q: 'What alternatives should I offer?',
        a: 'Relevant portfolio pieces, case studies, paid discovery, or a fixed paid test task.',
      },
    ],
    nextDecisionSlugs: [
      'more-work-same-price',
      'can-you-do-it-cheaper',
      'price-pushback-after-proposal',
    ],
    guideLinks: [
      {
        href: '/guides/how-to-negotiate-freelance-pricing',
        label: 'How to negotiate freelance pricing',
      },
    ],
    generatorScenarioSlug: 'free-sample-work',
  },
  {
    tier: 'tier3',
    slug: 'can-you-do-it-cheaper',
    title: 'How to reply when a prospect asks “can you do it cheaper?”',
    seoTitle: 'How to Reply to “Can You Do It Cheaper?” | Flowdockr',
    metaDescription:
      'Respond to direct price-cut requests with clear structure. Protect positioning while keeping the conversation open.',
    primaryKeyword: 'can you do it cheaper',
    keywordVariants: [
      'client asks can you lower your price',
      'how to answer can you do it cheaper',
      'direct price cut request reply',
    ],
    heroSubtitle:
      'Handle direct price pressure with calm structure, not instant concessions.',
    shortDescription:
      'Short, direct request to lower the quoted number.',
    situationSnapshot: [
      'This is a high-frequency negotiation line in freelance deals.',
      'A direct yes usually signals that your first price was negotiable by default.',
      'You need a short response that protects anchor and offers a controlled alternative.',
    ],
    whatsReallyHappening: [
      'The request is often habitual haggling rather than evidence your pricing is wrong.',
      'They are testing response speed and confidence more than detailed economics.',
      'A concise boundary plus one structured option usually performs best.',
    ],
    realGoals: [
      'Avoid reactive discounting in one message.',
      'Keep response concise and professional.',
      'Shift to scope/terms-based options if needed.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Hold quote',
        whenToUse: 'Use when scope fit is strong and price integrity matters most.',
        risk: 'If too blunt, tone can sound inflexible.',
        exampleWording:
          'For this scope I keep the quoted rate. If budget needs adjustment, I can revise scope so price and expectations stay aligned.',
      },
      {
        id: 'B',
        title: 'Offer structured alternative',
        whenToUse: 'Use when you want to preserve momentum while controlling concessions.',
        risk: 'Alternative must be concrete to avoid repeated haggling.',
        exampleWording:
          'I do not discount the same scope by default, but I can offer a leaner version if you want a lower total.',
      },
      {
        id: 'C',
        title: 'Exit quickly',
        whenToUse: 'Use when conversation repeatedly centers only on lower price.',
        risk: 'Can reduce deal volume if used too early.',
        exampleWording:
          'If lowest price is the primary criterion, I may not be the right fit for this project, and that is completely fine.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'For this scope I keep the quoted rate. If useful, I can send a reduced-scope option at a lower total.',
      },
      {
        tone: 'Warm',
        text: 'I understand the budget ask. Rather than discounting the same scope, I can suggest a leaner version that fits a lower range.',
      },
      {
        tone: 'Firm',
        text: 'I do not reduce pricing on unchanged scope. We can either keep the current scope or revise deliverables and price together.',
      },
    ],
    faq: [
      {
        q: 'How short should this reply be?',
        a: 'Short is better. One clear boundary plus one structured option is usually enough.',
      },
      {
        q: 'Is this different from full price pushback?',
        a: 'Yes. It is usually more direct and tactical, so concise boundary language matters more.',
      },
      {
        q: 'Should I explain my full pricing model?',
        a: 'Not initially. Start concise, then expand only if the prospect engages seriously.',
      },
    ],
    nextDecisionSlugs: [
      'price-pushback-after-proposal',
      'budget-lower-than-expected',
      'discount-pressure-before-signing',
    ],
    guideLinks: [
      {
        href: '/guides/when-to-discount-and-when-not-to',
        label: 'When to discount and when not to',
      },
    ],
    generatorScenarioSlug: 'client-asks-discount',
  },
  {
    tier: 'tier2',
    slug: 'small-discount-before-closing',
    title: 'How to handle small discount asks right before closing',
    seoTitle: 'How to Handle Small Discount Asks Before Closing | Flowdockr',
    metaDescription:
      'Prospect is ready to sign but asks for a small final discount. Learn how to close while protecting long-term pricing integrity.',
    primaryKeyword: 'small discount before closing',
    keywordVariants: [
      'final discount before signing',
      'last minute small discount request',
      'closing stage discount ask response',
    ],
    heroSubtitle:
      'Close confidently without training clients to expect last-minute discounts.',
    shortDescription:
      'Final-stage ask for a “small” reduction before signature.',
    situationSnapshot: [
      'Late-stage discount asks are common even when intent to buy is high.',
      'Small concessions can feel harmless but create precedent risk.',
      'You need a close-ready reply that preserves positioning and momentum.',
    ],
    whatsReallyHappening: [
      'The buyer may be trying to optimize terms after deciding they want to proceed.',
      'A final small discount can reset expectations for renewals or follow-on work.',
      'Conditional concessions or value-add framing can protect your long-term anchor.',
    ],
    realGoals: [
      'Close the deal without weakening baseline pricing norms.',
      'Use conditional concessions only when terms are explicit.',
      'Keep tone collaborative at the finish line.',
    ],
    responsePaths: [
      {
        id: 'A',
        title: 'Close at quoted terms',
        whenToUse: 'Use when deal is healthy and concessions are unnecessary.',
        risk: 'May feel strict if no rationale is provided.',
        exampleWording:
          'I keep this final scope at the quoted rate so delivery quality and process stay intact. If that works for you, I can send final signature details today.',
      },
      {
        id: 'B',
        title: 'Conditional close incentive',
        whenToUse: 'Use when a small concession is acceptable with strong reciprocation.',
        risk: 'Without conditions it becomes pure margin loss.',
        exampleWording:
          'If we finalize by this week and keep payment terms as proposed, I can make a small one-time adjustment to help close cleanly.',
      },
      {
        id: 'C',
        title: 'Alternative value add',
        whenToUse: 'Use when you prefer not to reduce price but can add bounded value.',
        risk: 'Value add can become hidden scope if not constrained.',
        exampleWording:
          'Rather than changing the project price, I can include one small post-delivery review pass so you still get extra support at close.',
      },
    ],
    copyReadyExamples: [
      {
        tone: 'Concise',
        text: 'I keep this scope at the quoted rate. If you are ready, I can send final signature details today.',
      },
      {
        tone: 'Warm',
        text: 'I appreciate the final ask. To keep scope and quality aligned, I usually keep this rate, but I can suggest a small close option if terms stay fixed.',
      },
      {
        tone: 'Firm',
        text: 'I do not apply final-stage discounts on unchanged scope by default. We can proceed as quoted or adjust scope and price together.',
      },
    ],
    faq: [
      {
        q: 'Should I always give a small closing discount?',
        a: 'No. It should be a deliberate exception, not default behavior.',
      },
      {
        q: 'What can I offer instead of reducing price?',
        a: 'A bounded value add or process convenience can preserve price integrity.',
      },
      {
        q: 'How do I avoid losing momentum near close?',
        a: 'Use clear close-oriented language and provide immediate next steps.',
      },
    ],
    nextDecisionSlugs: [
      'discount-pressure-before-signing',
      'price-pushback-after-proposal',
      'budget-lower-than-expected',
    ],
    guideLinks: [
      {
        href: '/guides/when-to-discount-and-when-not-to',
        label: 'When to discount and when not to',
      },
    ],
    generatorScenarioSlug: 'client-asks-discount',
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
