import { canonicalScenarioBatchOne } from '@/content/scenario-pages/scenario-batch-1';
import { canonicalScenarioBatchTwo } from '@/content/scenario-pages/scenario-batch-2';
import type { CanonicalScenario } from '@/types/scenario-catalog';

export const canonicalScenarioSeeds: CanonicalScenario[] = [
  {
    id: 'scn_quote_too_high',
    title: 'Client says your quote is too high',
    slug: 'quote-too-high',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: 'Your quote seems a bit high.',
    clientMessageVariants: [
      'Your quote seems a bit high.',
      'Your rate is too high.',
      'This is too much, please reconsider.',
    ],
    userSituation:
      'You already sent a proposal. The client pushes back on price without giving a clear budget, and you need to protect value without sounding defensive.',
    searchIntentPrimary: 'client says quote too high',
    searchIntentSecondary:
      'how to respond when a client says your rate is too high',
    strategyPrimary:
      'Re-anchor the quote around outcomes, scope, and what is included before discussing any movement on price.',
    strategySecondary:
      'If budget is real, offer a smaller version of the work instead of discounting the same scope.',
    toolPromptIntent:
      'Draft a calm response when a client says the quote is too high after you already sent pricing. Defend value first and only offer scope adjustment if needed.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 1, 2, 11, and 12 covering direct quote-too-high pushback from freelancer discussions.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_higher_than_expected',
    title: 'Client says your price is higher than expected',
    slug: 'higher-than-expected',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: "That's more than we expected.",
    clientMessageVariants: [
      "That's more than we expected.",
      'Your rate is higher than we expected.',
    ],
    userSituation:
      'The client responds to your quote with a softer expectation gap instead of a hard rejection. You need to keep the deal alive while clarifying what feels off.',
    searchIntentPrimary: 'client says price higher than expected',
    searchIntentSecondary: 'client says quote higher than expected',
    strategyPrimary:
      'Acknowledge the mismatch and ask whether the issue is budget, scope, or assumptions behind the quote.',
    strategySecondary:
      'If the gap is real, reframe around phased delivery or a leaner version instead of defending every line item.',
    toolPromptIntent:
      'Write a professional reply for a client who says your price is higher than expected. Keep the tone collaborative and move the conversation toward scope, budget, or priorities.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 21 and 31 about higher-than-expected pricing feedback after a quote was sent.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_justify_your_price',
    title: 'Client asks why your price is so high',
    slug: 'justify-your-price',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Why does this cost so much?',
    clientMessageVariants: ['Why does this cost so much?'],
    userSituation:
      'The client is not just pushing back on price. They are asking you to explain the logic behind it, and the reply needs to justify value without turning into a defensive essay.',
    searchIntentPrimary: 'client asks you to justify your price',
    searchIntentSecondary: 'why is your freelance price so high',
    strategyPrimary:
      'Explain the price through scope, expertise, and risk reduction instead of hours alone.',
    strategySecondary:
      'Keep the explanation tied to deliverables and decision criteria so the conversation does not become line-by-line bargaining.',
    toolPromptIntent:
      'Generate a concise reply when a client asks why your price is so high. Explain pricing logic clearly, stay confident, and avoid sounding apologetic.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 44 about clients asking freelancers to justify pricing.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_budget_limited',
    title: "Client says they don't have the budget",
    slug: 'budget-limited',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: "We don't have the budget for this.",
    clientMessageVariants: ["We don't have the budget for this."],
    userSituation:
      'The client signals interest but says the budget cannot support the current proposal. You need to protect pricing integrity while finding out whether there is still a workable version of the deal.',
    searchIntentPrimary: 'client says they do not have the budget',
    searchIntentSecondary: 'how to respond when client budget is too low',
    strategyPrimary:
      'Keep the same price logic and move the conversation toward priorities, phases, or a leaner scope.',
    strategySecondary:
      'If budget is fixed, define the minimum viable version instead of squeezing the full scope into a smaller number.',
    toolPromptIntent:
      'Draft a reply for a client who says they do not have the budget. Acknowledge the constraint, keep the tone constructive, and offer scope or sequencing options without underpricing the original scope.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 16 from freelancer discussions about budget pushback after pricing.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_do_it_for_less',
    title: 'Client asks if you can do it for less',
    slug: 'do-it-for-less',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can you do it for less?',
    clientMessageVariants: [
      'Can you do it for less?',
      'Can you lower your price a little?',
      'Can you lower your rate a bit?',
    ],
    userSituation:
      'The client is pressing for a smaller number mid-conversation. You need to keep control of the negotiation without treating price as arbitrary.',
    searchIntentPrimary: 'client asks lower price freelancer',
    searchIntentSecondary:
      'how to respond when a client says can you do it for less',
    strategyPrimary:
      'Do not concede on the same scope. Ask what budget or delivery target they are actually trying to hit.',
    strategySecondary:
      'Trade any reduction against reduced scope, phased work, or clearer terms so the concession has structure.',
    toolPromptIntent:
      'Write a firm but professional response when a client asks if you can do it for less. Protect the original price logic and redirect the negotiation toward scope or terms.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 18, 34, and 41 covering direct asks to lower the number during negotiation.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_discount_request',
    title: 'Client asks for a discount',
    slug: 'discount-request',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can you give us a discount?',
    clientMessageVariants: [
      'Can you give us a discount?',
      'If we work together long term, can you lower your rate?',
      'If we work long-term can you lower your rate?',
    ],
    userSituation:
      'The client wants a discount before committing. Sometimes they frame it as a long-term opportunity, but the immediate pressure is still to cut price first and define terms later.',
    searchIntentPrimary: 'client asks for discount freelancer',
    searchIntentSecondary: 'how to respond to discount request',
    strategyPrimary:
      'Keep the base rate intact and make any concession conditional on a real tradeoff such as scope, commitment speed, or a defined long-term arrangement.',
    strategySecondary:
      'If the client promises future work, convert that into a concrete retainer, package, or volume commitment instead of accepting a vague discount request.',
    toolPromptIntent:
      'Draft a confident response when a client asks for a discount. Protect the base rate, stay cooperative, and offer structured alternatives instead of an unearned price cut.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 5, 8, 14, and 47 covering direct discount asks and long-term discount pressure.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_cheaper_freelancer',
    title: 'Client says another freelancer is cheaper',
    slug: 'cheaper-freelancer',
    archetype: 'price_comparison',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: 'Another freelancer offered a lower price.',
    clientMessageVariants: [
      'Another freelancer offered a lower price.',
      'I know someone who can do it cheaper.',
      'Another freelancer quoted us less.',
    ],
    userSituation:
      'The client is comparing your quote with a cheaper option and testing whether you will race downward on price. You need to differentiate without sounding threatened.',
    searchIntentPrimary: 'client found cheaper freelancer',
    searchIntentSecondary: 'how to respond when another freelancer is cheaper',
    strategyPrimary:
      'Stay calm, acknowledge the comparison, and shift the decision back to scope, reliability, and execution quality.',
    strategySecondary:
      'If budget is the real issue, offer a narrower option instead of trying to win on price alone.',
    toolPromptIntent:
      'Write a confident reply when a client says another freelancer is cheaper. Avoid a price race and explain the difference in fit, process, or quality.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 6, 17, and 43 about clients comparing quotes with cheaper freelancers.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_match_lower_rate',
    title: 'Client asks if you can match a lower rate',
    slug: 'match-lower-rate',
    archetype: 'price_comparison',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can you match this rate?',
    clientMessageVariants: ['Can you match this rate?'],
    userSituation:
      'The client does not just mention another number. They explicitly want you to match it, which turns the conversation into a direct pricing test.',
    searchIntentPrimary: 'client asks match price freelancer',
    searchIntentSecondary: 'client wants lower rate negotiation',
    strategyPrimary:
      'Do not match by default. Explain what would need to change for that budget or why your current rate reflects a different scope and standard.',
    strategySecondary:
      'If they want a middle ground, redefine the engagement instead of discounting the same work.',
    toolPromptIntent:
      'Generate a firm response when a client asks you to match a lower rate. Protect the rate, stay professional, and offer a scope-based alternative only if appropriate.',
    sourceType: 'forum',
    sourceNote:
      'Based on raw scenario 36 from an Upwork-style negotiation about rate matching pressure.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_laughs_at_rate',
    title: 'Client laughs at your rate',
    slug: 'laughs-at-rate',
    archetype: 'price_comparison',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: "You charge $30/hour? That's ridiculous.",
    clientMessageVariants: [
      "You charge $30/hour? That's ridiculous.",
      "$30/hour? That's ridiculous.",
    ],
    userSituation:
      'The client reacts disrespectfully to your number. The reply needs to reset the tone or end the conversation cleanly without inviting more bad behavior.',
    searchIntentPrimary: 'client laughs at my rate freelancer',
    searchIntentSecondary: 'client says rate ridiculous',
    strategyPrimary:
      'Do not defend yourself emotionally. Reset the discussion around fit, scope, and professionalism.',
    strategySecondary:
      'If the tone stays disrespectful, close the loop instead of rewarding the behavior with more negotiation.',
    toolPromptIntent:
      'Draft a composed reply when a client laughs at your rate. Keep dignity, avoid emotional overreaction, and either reset the conversation or disengage professionally.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 29 and 40 covering clients mocking the hourly rate.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_rate_before_project_details',
    title: 'Client asks your rate before explaining the project',
    slug: 'rate-before-project-details',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage: "What's your rate?",
    clientMessageVariants: ["What's your rate?", 'What’s your rate?'],
    userSituation:
      'The lead asks for pricing before giving enough context to quote responsibly. You need to avoid locking yourself into a number too early while still being helpful.',
    searchIntentPrimary: 'client asks rate first',
    searchIntentSecondary: 'how to answer what is your rate freelancer',
    strategyPrimary:
      'Acknowledge the question and ask for the project scope, goals, and timeline before giving a concrete number.',
    strategySecondary:
      'If they insist on a number, give conditional language or a range tied to assumptions instead of a blind quote.',
    toolPromptIntent:
      'Write a response when a potential client asks your rate before explaining the project. Stay helpful, but ask for enough project context before committing to pricing.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 4 and 13 about clients asking for a rate before sharing project details.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_hourly_rate_request',
    title: 'Client asks for your hourly rate',
    slug: 'hourly-rate-request',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage: "What's your hourly rate?",
    clientMessageVariants: ["What's your hourly rate?"],
    userSituation:
      'The client wants an hourly number early. You need to answer clearly without letting one rate answer stand in for the whole engagement.',
    searchIntentPrimary: 'client asks hourly rate freelancer',
    searchIntentSecondary: 'how respond hourly rate question freelance',
    strategyPrimary:
      'Answer the hourly question directly, but frame it as one pricing input rather than the full quote.',
    strategySecondary:
      'Use the reply to find out whether hourly billing is actually the right model for the project.',
    toolPromptIntent:
      'Draft a reply when a client asks for your hourly rate. Give a clear answer, but keep space to discuss scope and whether hourly pricing fits the work.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 22 about early hourly-rate questions from clients.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_day_rate_request',
    title: 'Client asks for your day rate',
    slug: 'day-rate-request',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage: 'Can you give us your day rate?',
    clientMessageVariants: ['Can you give us your day rate?'],
    userSituation:
      'A client wants to price the work by day rather than by hour or project. You need to answer in a way that sets assumptions around what a day actually covers.',
    searchIntentPrimary: 'client asks day rate freelancer',
    searchIntentSecondary: 'hourly vs day rate freelancer',
    strategyPrimary:
      'Give the day rate with clear assumptions about availability, deliverables, and how a day is defined.',
    strategySecondary:
      'Use the question to decide whether the work should be day-based, retainer-based, or project-based instead.',
    toolPromptIntent:
      'Write a reply when a client asks for your day rate. Provide the number with guardrails about what a day includes and when a different pricing model would make more sense.',
    sourceType: 'forum',
    sourceNote:
      'Based on raw scenario 37 from a freelancer thread about day-rate negotiation.',
    status: 'ready',
    priority: 'p2',
    isSeed: true,
  },
  {
    id: 'scn_price_range_request',
    title: 'Client asks for a rough price range',
    slug: 'price-range-request',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage: 'Can you give me a rough price range?',
    clientMessageVariants: ['Can you give me a rough price range?'],
    userSituation:
      'The client is not asking for an exact quote yet. They want a quick range, and you need to answer without pretending the project has already been scoped.',
    searchIntentPrimary: 'client asks for a price range',
    searchIntentSecondary: 'how to give a rough freelance price range',
    strategyPrimary:
      'Give a range with assumptions so the client understands what would move the number up or down.',
    strategySecondary:
      'Tell them what details you still need before converting the range into a formal quote.',
    toolPromptIntent:
      'Generate a reply when a client asks for a rough price range. Give a useful range, explain the assumptions, and avoid overcommitting before scope is clear.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 42 about freelancers using ranges before a full quote.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_immediate_quote_request',
    title: 'Client asks for an immediate quote',
    slug: 'immediate-quote-request',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage: 'Can you give me a price right now?',
    clientMessageVariants: ['Can you give me a price right now?'],
    userSituation:
      'The client wants a number immediately, but you do not yet understand the project well enough to quote cleanly. You need to slow the decision without sounding evasive.',
    searchIntentPrimary: 'client asks price quote immediately',
    searchIntentSecondary: 'how to delay quote freelancer',
    strategyPrimary:
      'Slow the quote down just enough to understand scope, timeline, and deliverables before committing to a price.',
    strategySecondary:
      'If they need a fast answer, offer a provisional range and state what still needs to be confirmed.',
    toolPromptIntent:
      'Draft a response when a client asks for a price quote immediately. Keep it helpful, but explain what information you need before giving a confident number.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 38 about clients demanding an immediate quote before scope is clear.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_rates_negotiable',
    title: 'Client asks if your rates are negotiable',
    slug: 'rates-negotiable',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage: 'Are your rates negotiable?',
    clientMessageVariants: ['Are your rates negotiable?'],
    userSituation:
      'The client is probing for flexibility before the real work discussion has even started. You need to answer clearly without sounding rigid or weak.',
    searchIntentPrimary: 'are your rates negotiable freelancer',
    searchIntentSecondary: 'freelancer rate negotiable response',
    strategyPrimary:
      'Answer directly and explain where flexibility does or does not exist so the client does not assume the rate is arbitrary.',
    strategySecondary:
      'Keep flexibility tied to scope, timing, or package structure rather than to an undefined price cut.',
    toolPromptIntent:
      'Write a concise reply when a client asks if your rates are negotiable. Keep boundaries clear and explain how you handle flexibility without sounding robotic.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 3 and 15, including freelancer forum and StackExchange-style discussions about negotiable rates.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_reduce_scope_to_lower_cost',
    title: 'Client asks to reduce scope to lower the cost',
    slug: 'reduce-scope-to-lower-cost',
    archetype: 'scope_control',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can we remove some features to reduce the cost?',
    clientMessageVariants: ['Can we remove some features to reduce the cost?'],
    userSituation:
      'The client wants the project to fit a smaller budget by trimming deliverables. This can be a healthy negotiation if you manage the tradeoffs clearly.',
    searchIntentPrimary: 'reduce scope instead of discount freelancer',
    searchIntentSecondary: 'client reduce project scope cost',
    strategyPrimary:
      'Treat this as a scope design conversation and identify what can be removed without breaking the main outcome.',
    strategySecondary:
      'Make the tradeoff explicit by showing what stays, what goes, and what the cheaper version changes.',
    toolPromptIntent:
      'Generate a response when a client asks to reduce scope to lower the cost. Keep the tone collaborative and structure the reply around priorities, deliverables, and tradeoffs.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 20 about freelancers using scope reduction instead of direct price cuts.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_extra_work_outside_scope',
    title: 'Client asks for extra work outside the agreed scope',
    slug: 'extra-work-outside-scope',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Can you also add this?',
    clientMessageVariants: ['Can you also add this?'],
    userSituation:
      'The work is already in motion, and the client wants something extra without clearly reopening budget or scope. You need to protect the boundary without sounding difficult.',
    searchIntentPrimary: 'client asks for additional work without extra pay',
    searchIntentSecondary: 'how to respond to extra work outside scope',
    strategyPrimary:
      'Separate the new request from the original agreement and make the client choose between extra budget, reduced scope elsewhere, or a later phase.',
    strategySecondary:
      'If you make a small courtesy exception, name it as one-time so it does not reset the baseline.',
    toolPromptIntent:
      'Draft a professional reply when a client asks for extra work outside the agreed scope. Clarify the boundary and offer structured options instead of absorbing the request silently.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 45 about extra work requests without extra pay.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_unlimited_revisions',
    title: 'Client asks for unlimited revisions',
    slug: 'unlimited-revisions',
    archetype: 'scope_control',
    negotiationStage: 'contract_terms',
    primaryClientMessage: 'Can we do unlimited revisions?',
    clientMessageVariants: ['Can we do unlimited revisions?'],
    userSituation:
      'The client is pushing on revision policy before work starts or while terms are being clarified. You need a clear boundary that still feels cooperative.',
    searchIntentPrimary: 'client asks unlimited revisions freelancer',
    searchIntentSecondary: 'revision policy freelancer',
    strategyPrimary:
      'Set a revision boundary that protects quality, timeline, and decision-making.',
    strategySecondary:
      'If they need more flexibility, convert it into a paid revision policy, support package, or change-order structure.',
    toolPromptIntent:
      'Write a clear reply when a client asks for unlimited revisions. Keep the tone professional and explain the revision boundary without sounding inflexible.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 24 about unlimited revision requests in freelance projects.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_project_should_be_easy',
    title: 'Client says the project should be easy',
    slug: 'project-should-be-easy',
    archetype: 'scope_control',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'This should only take a few hours.',
    clientMessageVariants: ['This should only take a few hours.'],
    userSituation:
      'The client is minimizing the work based on how simple it looks from the outside. You need to reframe the conversation around expertise, process, and outcome quality.',
    searchIntentPrimary: 'client says project easy freelancer',
    searchIntentSecondary: 'client thinks project simple price negotiation',
    strategyPrimary:
      'Move the conversation away from hours alone and explain what the work actually includes.',
    strategySecondary:
      'Show that the value comes from expertise, judgment, and execution quality, not just visible effort.',
    toolPromptIntent:
      'Generate a response when a client says the project should be easy. Reframe the work around value and complexity without sounding defensive.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 7 and 35 about clients underestimating how much work a project requires.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_start_before_payment',
    title: 'Client asks you to start work before payment',
    slug: 'start-before-payment',
    archetype: 'payment_protection',
    negotiationStage: 'pre_kickoff',
    primaryClientMessage: "Can you start now and we'll handle payment later?",
    clientMessageVariants: [
      "Can you start now and we'll handle payment later?",
    ],
    userSituation:
      'The client wants work to begin before the payment or deposit step is complete. You need to protect kickoff terms without killing momentum.',
    searchIntentPrimary: 'client asks start work before payment',
    searchIntentSecondary: 'freelancer deposit policy',
    strategyPrimary:
      'Hold the deposit and kickoff boundary before doing billable work.',
    strategySecondary:
      'If urgency is real, give the client the fastest path to start once payment or contract steps are complete.',
    toolPromptIntent:
      'Draft a reply when a client asks you to start work before payment. Keep the tone calm, hold the deposit boundary, and show the next step to begin properly.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 25 about clients requesting work before deposit or payment.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_start_immediately',
    title: 'Client asks you to start work immediately',
    slug: 'start-immediately',
    archetype: 'payment_protection',
    negotiationStage: 'pre_kickoff',
    primaryClientMessage: 'Can you start today?',
    clientMessageVariants: ['Can you start today?'],
    userSituation:
      'The client wants immediate action before scope, timeline, and start terms are fully settled. You need to respond quickly without creating an unstructured kickoff.',
    searchIntentPrimary: 'client asks you to start work immediately',
    searchIntentSecondary:
      'how to respond when client says can you start today',
    strategyPrimary:
      'Confirm availability only with explicit scope, start terms, and a clear decision step.',
    strategySecondary:
      'If the urgency is real, turn it into an expedited kickoff with defined conditions instead of an informal yes.',
    toolPromptIntent:
      'Write a reply when a client asks you to start immediately. Stay helpful, but make the start conditional on scope clarity and kickoff terms.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 48 about start-today pressure before proper kickoff.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  {
    id: 'scn_exclusive_low_rate',
    title: 'Client asks for exclusivity but offers a low rate',
    slug: 'exclusive-low-rate',
    archetype: 'contract_terms',
    negotiationStage: 'contract_terms',
    primaryClientMessage: "We'd like you to work exclusively with us.",
    clientMessageVariants: ["We'd like you to work exclusively with us."],
    userSituation:
      'The client wants a stronger commitment from you than the price supports. The real negotiation is about the value of exclusivity, not just the headline rate.',
    searchIntentPrimary: 'client asks exclusivity freelancer',
    searchIntentSecondary: 'exclusive contract freelance rate',
    strategyPrimary:
      'Price exclusivity as a premium commitment with clear limits, duration, and opportunity cost.',
    strategySecondary:
      'If the client cannot support that premium, narrow the commitment or decline exclusivity altogether.',
    toolPromptIntent:
      'Generate a reply when a client asks for exclusivity but offers a low rate. Explain the cost of exclusivity clearly and protect your optionality.',
    sourceType: 'community_discussion',
    sourceNote:
      'Based on raw scenario 26 about exclusive arrangements offered at below-market rates.',
    status: 'ready',
    priority: 'p2',
    isSeed: true,
  },
  {
    id: 'scn_ghosted_after_rate',
    title: 'Client ghosted after asking your rate',
    slug: 'ghosted-after-rate',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: "Thanks, I'll get back to you.",
    clientMessageVariants: [
      "Thanks, I'll get back to you.",
      'Let me think about it.',
    ],
    userSituation:
      'The lead went quiet after the pricing conversation. You need a follow-up that reopens the decision without sounding needy or guilt-driven.',
    searchIntentPrimary: 'client ghosted after quote',
    searchIntentSecondary: 'follow up after sending rate',
    strategyPrimary:
      'Follow up with a low-pressure message that invites a clear yes, no, or next step.',
    strategySecondary:
      'Make it easy for the client to respond by offering a concrete path forward or a graceful close.',
    toolPromptIntent:
      'Write a short follow-up when a client asks your rate and then disappears. Keep the tone professional, low-pressure, and action-oriented.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 10, 33, and 50 covering price-related ghosting and delayed decision language.',
    status: 'ready',
    priority: 'p0',
    isSeed: true,
  },
  {
    id: 'scn_guarantee_results',
    title: 'Client asks you to guarantee results',
    slug: 'guarantee-results',
    archetype: 'expectation_management',
    negotiationStage: 'contract_terms',
    primaryClientMessage: 'Can you guarantee results?',
    clientMessageVariants: ['Can you guarantee results?'],
    userSituation:
      'The client wants certainty about outcomes that may depend on variables you do not control. You need to protect the relationship without promising something unrealistic.',
    searchIntentPrimary: 'client asks guarantee freelancer',
    searchIntentSecondary: 'guarantee results freelance response',
    strategyPrimary:
      'Separate what you can control from what you cannot promise, and explain that clearly.',
    strategySecondary:
      'Offer process commitments, reporting, or milestones instead of hard outcome guarantees.',
    toolPromptIntent:
      'Draft a response when a client asks you to guarantee results. Stay reassuring, but avoid promises you cannot responsibly make.',
    sourceType: 'synthesized',
    sourceNote:
      'Merged from raw scenarios 28 and 39 about clients asking freelancers to guarantee performance outcomes.',
    status: 'ready',
    priority: 'p1',
    isSeed: true,
  },
  ...canonicalScenarioBatchOne,
  ...canonicalScenarioBatchTwo,
];
