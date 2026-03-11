import type { Scenario } from '@/types/scenario';

export const scenarios: Scenario[] = [
  {
    slug: "lowball-offer",
    category: 'pricing',
    title: "Price pushback after proposal",
    seoTitle: "Price pushback after proposal | Flowdockr",
    metaDescription:
      "Generate a professional reply when a client offers too little for your freelance work. Protect your rate, re-anchor value, and keep the deal alive.",
    h1: "Price pushback after proposal",
    heroIntro:
      "Lowball offers pressure freelancers into fast concessions. A stronger reply does not argue emotionally or race to the bottom. It re-anchors value, clarifies what the quote includes, and offers a practical next step if budget is the real constraint.",
    shortDescription:
      "Generate a professional response when a client offers far below your rate.",
    problemText: [
      "A lowball offer is often a negotiation test, not just a budget statement. The client is checking whether your price is flexible, whether you will defend your value, and whether you are confident in your positioning.",
      "The biggest mistake is reacting emotionally or instantly dropping your rate. That teaches the client that your original quote was weak and that more pressure may get even more concessions.",
      "A better reply keeps the tone calm, re-centers the conversation on scope and outcomes, and gives the client a structured option if they truly cannot afford the original proposal.",
    ],
    exampleClientMessage:
      "Thanks for the quote. It's higher than I expected. Another freelancer said they can do this for $300, so I can only offer $350.",
    exampleReply:
      "Thanks for sharing that. Pricing differences usually come down to scope, process, and execution quality. My quote reflects the level of strategy and delivery needed for the result you're aiming for. If budget is the main constraint, I'm happy to suggest a reduced-scope version that fits a lower range while still keeping the work effective.",
    exampleAltReply:
      "I understand budget matters. I wouldn't recommend cutting the core parts needed for a strong result just to match a lower quote, but I can offer a narrower version of the project if that helps us find a workable path forward.",
    strategyBullets: [
      "Re-anchors the discussion on value and delivery quality instead of defending price emotionally.",
      "Avoids matching the lower quote and protects your pricing position.",
      "Introduces a reduced-scope path instead of a blind discount.",
    ],
    faq: [
      {
        q: "Should I match a lowball offer from a client?",
        a: "Usually no. Matching a low offer too quickly weakens your positioning and can attract the wrong kind of client relationship. It is usually better to defend the value of the original scope or offer a smaller version of the project.",
      },
      {
        q: "How do I respond to a client who offers much less than my quote?",
        a: "A strong response stays calm, explains that pricing reflects scope and quality, and offers alternatives only if they are structured. The goal is to avoid sounding defensive while keeping the conversation open.",
      },
      {
        q: "What if the client says another freelancer is cheaper?",
        a: "You do not need to compete on price alone. You can acknowledge the comparison, emphasize what your quote includes, and explain that different pricing often reflects different levels of process, reliability, and outcome quality.",
      },
      {
        q: "Can I still save the deal after a lowball offer?",
        a: "Yes, often you can. A lowball message does not always mean the client is lost. Sometimes they are testing flexibility. A calm, structured reply can reset the tone and move the conversation toward scope, priorities, or phased delivery.",
      },
    ],
    relatedSlugs: ["client-asks-discount", "cheaper-freelancer", "budget-limited"],
    promptContext:
      "The client has made a lowball offer that is significantly below the freelancer's quote. The response should protect pricing position, avoid emotional defensiveness, re-anchor on value or scope, and suggest a structured alternative only if appropriate.",
    riskLevel: "medium",
    primaryGoal: "Protect pricing position without sounding defensive.",
    avoid: [
      "Immediately matching the lower offer",
      "Sounding offended or insecure",
      "Over-justifying the original quote",
    ],
    preferredMoves: [
      "Re-anchor on value and delivery quality",
      "Clarify what the quoted work includes",
      "Offer reduced scope instead of discounting the same scope",
    ],
    toneProfile: "calm",
    placeholder:
      "Paste the exact message where the client offered a much lower number...",
  },
  {
    slug: "client-asks-discount",
    category: 'pricing',
    title: "Discount pressure before signing",
    seoTitle: "Discount pressure before signing | Flowdockr",
    metaDescription:
      "Generate a confident response when a client asks for a discount. Protect your rate and offer smart alternatives instead of weakening your pricing.",
    h1: "Discount pressure before signing",
    heroIntro:
      "Discount requests are common, but immediate discounts weaken pricing power. A stronger reply protects the core price and trades any concession against reduced scope, faster decisions, or clearer terms.",
    shortDescription:
      "Generate a confident response when a client asks you to lower your rate.",
    problemText: [
      "When a client asks for a discount, many freelancers feel pressure to be accommodating in order to keep the deal alive. But unstructured discounting weakens your anchor and makes future negotiations harder.",
      "The real problem is not the question itself. The problem is how you answer it. If you lower your rate too easily, you imply there was extra room all along.",
      "A stronger response keeps your pricing logic intact. If you make a concession, it should be exchanged for a smaller scope, faster commitment, simplified process, or different terms.",
    ],
    exampleClientMessage:
      "This looks good overall. Is there any discount you can offer if we move ahead this week?",
    exampleReply:
      "I try to keep pricing aligned with the scope and outcome rather than reduce it by default. If budget is the main concern, I can adjust the scope or delivery structure to bring the total down in a way that still makes sense for both of us.",
    exampleAltReply:
      "I don't usually discount the same scope, but if you want, I can put together a leaner version of the project that fits a lower budget while keeping the essentials intact.",
    strategyBullets: [
      "Protects the base rate instead of immediately granting a discount.",
      "Frames any price change as a scope or terms adjustment, not a random reduction.",
      "Keeps the relationship cooperative rather than rigid or defensive.",
    ],
    faq: [
      {
        q: "How should I respond when a client asks for a discount?",
        a: "A strong response avoids immediate price cuts. Instead, protect your pricing logic and offer options such as reduced scope, phased delivery, or simplified terms if needed.",
      },
      {
        q: "Should freelancers ever give discounts?",
        a: "Sometimes, but only with structure. A discount should usually be tied to a tradeoff, such as less scope, a quicker decision, or a simpler engagement. Otherwise it can weaken your perceived value.",
      },
      {
        q: "What is better than giving a discount?",
        a: "Offering a smaller version of the project is often better. That protects your rate while giving the client a lower-cost path forward.",
      },
      {
        q: "Will saying no to a discount lose the client?",
        a: "Not necessarily. Many clients ask by habit. A calm, well-framed reply can actually increase respect because it shows clarity and confidence.",
      },
    ],
    relatedSlugs: ["lowball-offer", "budget-limited", "more-work-same-budget"],
    promptContext:
      "The client is explicitly asking for a discount on the quoted work. The response should avoid immediate price concessions, protect pricing integrity, and offer structured alternatives such as reduced scope or revised terms where appropriate.",
    riskLevel: "medium",
    primaryGoal:
      "Protect the base rate and make any concession conditional or structured.",
    avoid: [
      "Giving an immediate unstructured discount",
      "Sounding rigid or cold",
      "Treating price as arbitrary",
    ],
    preferredMoves: [
      "Defend pricing logic",
      "Trade any reduction against scope or terms",
      "Offer a leaner version if needed",
    ],
    toneProfile: "warm-firm",
    placeholder:
      "Paste the client's discount request exactly as they sent it...",
  },
  {
    slug: "cheaper-freelancer",
    category: 'negotiation',
    title: "Cheaper competitor comparison",
    seoTitle: "Cheaper competitor comparison | Flowdockr",
    metaDescription:
      "Generate a strong reply when a client compares your price with a cheaper freelancer. Re-anchor on value, execution quality, and fit.",
    h1: "Cheaper competitor comparison",
    heroIntro:
      "When a client compares you to a cheaper freelancer, the trap is obvious: get pulled into a price race. A better response differentiates on value, process, reliability, and fit rather than trying to win by being cheaper.",
    shortDescription:
      "Generate a strong reply when a client says someone else can do it for less.",
    problemText: [
      "Price comparison is one of the most common pressure tactics in service sales. The client may be genuinely comparing options, or they may be testing whether your quote is negotiable.",
      "The worst move is to panic and compete only on price. That turns your service into a commodity and removes your strategic advantage.",
      "A stronger response acknowledges the comparison without sounding threatened. It explains that different prices usually reflect different levels of thinking, process, communication, speed, and delivery quality.",
    ],
    exampleClientMessage:
      "We like your proposal, but to be transparent, another freelancer quoted much lower. Why should we go with you if they can do it cheaper?",
    exampleReply:
      "That's a fair question. Lower quotes can absolutely make sense depending on scope and delivery model. My pricing reflects not just execution, but also the level of strategy, communication, and reliability built into the process. If you'd like, I can also outline a narrower version of the work so you can compare options more clearly.",
    exampleAltReply:
      "I completely understand comparing quotes. In most cases, the real difference is not just the output itself, but how the work is scoped, managed, and delivered. If budget is your main concern, I'm happy to suggest a leaner version rather than compromise the quality of the original scope.",
    strategyBullets: [
      "Acknowledges the comparison calmly without sounding insecure.",
      "Shifts the discussion from price alone to scope, process, and reliability.",
      "Offers a narrower option instead of collapsing your positioning.",
    ],
    faq: [
      {
        q: "How do I reply when a client says another freelancer is cheaper?",
        a: "A good reply acknowledges the comparison, avoids getting defensive, and explains that pricing differences often reflect different scope, communication, speed, or quality standards.",
      },
      {
        q: "Should I lower my rate because another freelancer is cheaper?",
        a: "Usually not automatically. If you reduce your rate without changing scope or terms, you weaken your value positioning. A smaller project version is often a better move.",
      },
      {
        q: "What should I emphasize instead of price?",
        a: "Emphasize fit, quality of execution, process, reliability, strategic thinking, and the kind of outcome the client actually wants.",
      },
      {
        q: "Can a client comparison still become a win?",
        a: "Yes. Many clients are not only buying the cheapest output. They are also buying trust, lower risk, smoother communication, and stronger execution.",
      },
    ],
    relatedSlugs: ["lowball-offer", "client-asks-discount", "free-sample-work"],
    promptContext:
      "The client is comparing the freelancer's quote to a cheaper competitor. The response should avoid a price race, differentiate on value and execution, and optionally offer a narrower scoped alternative if budget is the real issue.",
    riskLevel: "high",
    primaryGoal:
      "Avoid a price race and differentiate on fit, process, and execution quality.",
    avoid: [
      "Competing only on price",
      "Sounding threatened by the comparison",
      "Attacking the cheaper freelancer",
    ],
    preferredMoves: [
      "Acknowledge the comparison calmly",
      "Differentiate on scope, quality, and reliability",
      "Offer a narrower option only if budget is the real issue",
    ],
    toneProfile: "calm",
    placeholder:
      "Paste the message where the client compares you to a cheaper freelancer...",
  },
  {
    slug: "free-sample-work",
    category: 'difficult-clients',
    title: "Free trial work request",
    seoTitle: "Free trial work request | Flowdockr",
    metaDescription:
      "Create a polite but firm reply when a client asks for unpaid sample work. Protect your boundaries and propose safer alternatives.",
    h1: "Free trial work request",
    heroIntro:
      "Free sample requests often shift risk from the client to the freelancer. A strong reply keeps the tone professional, protects your boundaries, and offers alternatives like portfolio proof, paid discovery, or a small paid test instead.",
    shortDescription:
      "Generate a polite but firm response when a client asks you to do sample work for free.",
    problemText: [
      "Requests for unpaid sample work can sound reasonable on the surface, especially when the client says they just want to check fit. But the structure matters: if you are doing real work with real value, someone is absorbing the risk.",
      "The biggest mistake is agreeing too quickly out of fear of losing the opportunity. That sets a precedent that your time and thinking can be extracted before commitment.",
      "A stronger response does not become hostile. It explains your policy clearly and offers safer alternatives such as portfolio examples, a paid mini-test, or a paid discovery phase.",
    ],
    exampleClientMessage:
      "Before we decide, can you do a quick sample so we can see your style? It shouldn't take long.",
    exampleReply:
      "Happy to help you assess fit. I don't provide unpaid custom sample work, but I can share relevant past examples or propose a small paid test if you want something tailored to your project.",
    exampleAltReply:
      "I understand wanting to evaluate quality before committing. For custom work, I keep that inside a paid test or discovery step, but I'm happy to show portfolio samples that are close to what you need.",
    strategyBullets: [
      "Protects your boundary without sounding combative.",
      "Reframes the request around professional process rather than personal reluctance.",
      "Offers lower-risk alternatives that still help the client evaluate fit.",
    ],
    faq: [
      {
        q: "How do I say no to free sample work politely?",
        a: "A strong response acknowledges the client's need to evaluate fit, then explains that custom sample work is not unpaid. Offer portfolio examples or a paid test instead.",
      },
      {
        q: "Is free sample work a red flag?",
        a: "Sometimes. It depends on the context, but unpaid custom work often shifts too much risk to the freelancer and can attract clients who undervalue professional work.",
      },
      {
        q: "What can I offer instead of free sample work?",
        a: "Good alternatives include past work samples, case studies, a paid trial, a paid discovery step, or a tightly scoped paid mini-project.",
      },
      {
        q: "Will saying no ruin the opportunity?",
        a: "Not always. In many cases, a clear professional boundary increases trust because it shows that you have a real process and do not improvise your standards under pressure.",
      },
    ],
    relatedSlugs: ["cheaper-freelancer", "small-extra-free", "more-work-same-budget"],
    promptContext:
      "The client is asking for unpaid sample work. The response should protect the freelancer's boundaries, remain polite and professional, and redirect to safer alternatives like portfolio proof or a paid test.",
    riskLevel: "high",
    primaryGoal:
      "Protect boundaries while offering a professional evaluation alternative.",
    avoid: [
      "Agreeing to unpaid custom work too quickly",
      "Sounding hostile or suspicious",
      "Giving a vague refusal without alternatives",
    ],
    preferredMoves: [
      "State the boundary clearly",
      "Offer portfolio proof or a paid test",
      "Frame the boundary as professional process",
    ],
    toneProfile: "warm-firm",
    placeholder:
      "Paste the message where the client asks for free sample work...",
  },
  {
    slug: "more-work-same-budget",
    category: 'negotiation',
    title: "More work for the same price",
    seoTitle: "More work for the same price | Flowdockr",
    metaDescription:
      "Generate a response when a client asks for extra work without increasing budget. Keep scope control and preserve the relationship.",
    h1: "More work for the same price",
    heroIntro:
      "Extra work without extra budget is how margin quietly disappears. A stronger reply separates what is already included from what is additional, then gives the client clear options instead of absorbing hidden scope creep.",
    shortDescription:
      "Generate a professional response when a client wants additional work but no budget increase.",
    problemText: [
      "Many service projects become unprofitable not because the initial quote was wrong, but because the scope expands while the budget stays frozen. Clients often do this gradually, sometimes without even realizing the impact.",
      "If you say yes too casually, you train the client to treat your scope as elastic. Over time, that hurts timelines, margins, and trust in the process.",
      "A stronger response clarifies what the original agreement covered, identifies what is newly requested, and offers the client a choice: adjust budget, reduce something else, or treat the new request as a separate addition.",
    ],
    exampleClientMessage:
      "Can we also add two more landing pages and another revision round? We'd still like to stay within the original budget if possible.",
    exampleReply:
      "I can definitely help with those additions. Since they expand the original scope, I'd treat them as an adjustment rather than include them inside the current quote by default. If helpful, I can outline two options: one that keeps the original scope and budget, and one that includes the extra items with an updated total.",
    exampleAltReply:
      "Those requests make sense, but they do go beyond what was originally scoped. I'm happy to revise the proposal so you can choose between keeping the current budget with the original deliverables, or expanding the scope with an updated price.",
    strategyBullets: [
      "Separates in-scope work from new requests clearly and professionally.",
      "Avoids sounding resistant while still defending boundaries.",
      "Turns the situation into a structured choice instead of an emotional negotiation.",
    ],
    faq: [
      {
        q: "How do I respond when a client wants extra work for the same budget?",
        a: "A strong response makes the scope distinction explicit. Clarify what was included originally, explain that the new request changes the scope, and offer clear options rather than absorbing the change silently.",
      },
      {
        q: "What is the best way to handle scope creep?",
        a: "The best way is to identify the added work early, name it clearly, and tie it to a decision: update the budget, reduce another part of the project, or keep it as a separate add-on.",
      },
      {
        q: "Should I do a little extra work for goodwill?",
        a: "Sometimes yes, but only intentionally and in small doses. If you do it, frame it as a one-time courtesy rather than silently expanding the baseline expectation.",
      },
      {
        q: "How do I avoid sounding difficult when pushing back on extra work?",
        a: "Use neutral, process-driven language. Focus on scope clarity and choices rather than personal frustration.",
      },
    ],
    relatedSlugs: ["small-extra-free", "client-asks-discount", "budget-limited"],
    promptContext:
      "The client is requesting additional work while expecting the same budget. The response should clarify scope boundaries, remain cooperative, and present structured options rather than silently accepting scope creep.",
    riskLevel: "medium",
    primaryGoal:
      "Re-establish scope boundaries and turn expansion into a structured choice.",
    avoid: [
      "Silently absorbing scope creep",
      "Sounding frustrated or resentful",
      "Arguing over effort instead of scope",
    ],
    preferredMoves: [
      "Separate original scope from new requests",
      "Present options clearly",
      "Tie extra work to updated budget or tradeoffs",
    ],
    toneProfile: "firm",
    placeholder:
      "Paste the message where the client asks for more work without increasing budget...",
  },
  {
    slug: "budget-limited",
    category: 'pricing',
    title: "Budget lower than expected",
    seoTitle: "Budget lower than expected | Flowdockr",
    metaDescription:
      "Generate a strategic reply when a client says budget is limited. Keep the deal alive without underpricing your work.",
    h1: "Budget lower than expected",
    heroIntro:
      "A limited budget does not automatically mean you need to lower your rate. A stronger response acknowledges the constraint, then reshapes the engagement around scope, priorities, or phased delivery.",
    shortDescription:
      "Generate a strategic reply when a client says their budget is limited.",
    problemText: [
      "When a client says the budget is limited, many freelancers hear only one message: lower your price. But often the real issue is fit between desired outcome and available budget.",
      "If you immediately cut price without changing the work, you absorb the mismatch yourself. That is not a negotiation win. It is just margin leakage disguised as flexibility.",
      "A stronger response acknowledges the budget reality while protecting the integrity of your offer. Instead of lowering the same scope, you can reduce scope, phase the work, or focus on the most important outcome first.",
    ],
    exampleClientMessage:
      "We want to work with you, but our budget is pretty tight right now. Is there anything you can do to make it work?",
    exampleReply:
      "I appreciate the transparency. If budget is the main constraint, the best approach is usually to adjust scope or sequence rather than reduce the same work arbitrarily. If you'd like, I can suggest a leaner version that focuses on the highest-priority pieces first and fits a lower budget more realistically.",
    exampleAltReply:
      "Thanks for sharing that. I'd rather adapt the project structure than cut the same scope to a level that weakens the result. I'm happy to put together a smaller first phase if that helps you move forward within budget.",
    strategyBullets: [
      "Acknowledges the budget constraint without collapsing pricing.",
      "Shifts the discussion to priorities, scope, and sequencing.",
      "Keeps the deal alive through phased or leaner options.",
    ],
    faq: [
      {
        q: "How should I respond when a client says their budget is limited?",
        a: "A good response acknowledges the budget issue and redirects the discussion toward scope, priorities, or phased delivery rather than reducing the same work blindly.",
      },
      {
        q: "What is better than lowering the quote?",
        a: "Reducing scope or splitting the work into phases is often better. That preserves quality and avoids underpricing the full project.",
      },
      {
        q: "Can limited budget clients still become good clients?",
        a: "Yes, sometimes. Budget limits do not always mean low value. The key is whether they respect process and are willing to adjust scope realistically.",
      },
      {
        q: "Should I always offer a cheaper option?",
        a: "Not always, but it is often useful. The key is that the cheaper option should reflect less work, fewer deliverables, or phased delivery.",
      },
    ],
    relatedSlugs: ["client-asks-discount", "lowball-offer", "more-work-same-budget"],
    promptContext:
      "The client says their budget is limited but may still want to proceed. The response should acknowledge the budget constraint, avoid lowering the same scope blindly, and guide the conversation toward priorities, reduced scope, or phased delivery.",
    riskLevel: "medium",
    primaryGoal:
      "Keep the deal alive by adjusting scope or sequence instead of underpricing the same work.",
    avoid: [
      "Blindly lowering the same scope",
      "Sounding dismissive about the client's budget",
      "Treating budget as an insult",
    ],
    preferredMoves: [
      "Acknowledge budget reality calmly",
      "Refocus on priorities",
      "Offer phased delivery or reduced scope",
    ],
    toneProfile: "calm",
    placeholder:
      "Paste the message where the client explains their budget is limited...",
  },
  {
    slug: "delayed-decision",
    category: 'difficult-clients',
    title: "Decision delay after proposal",
    seoTitle: "Decision delay after proposal | Flowdockr",
    metaDescription:
      "Generate a professional follow-up when a client delays after receiving your quote. Re-open momentum without sounding pushy.",
    h1: "Decision delay after proposal",
    heroIntro:
      "Silence after a quote is common, but passivity kills momentum. A good follow-up is short, respectful, and decision-oriented. It reopens the conversation without sounding needy or over-eager.",
    shortDescription:
      "Generate a strong follow-up when a client goes quiet after your quote.",
    problemText: [
      "After sending a quote, many freelancers either wait too long or follow up in a way that sounds anxious. Both are costly. Waiting too long slows your pipeline. Pushing too hard damages tone.",
      "The goal of a good follow-up is not to chase attention. It is to reopen a stalled decision in a calm, low-friction way.",
      "A strong reply gives the client an easy path to respond. It can ask whether timing changed, whether they need clarification, or whether the project should be parked for now.",
    ],
    exampleClientMessage:
      "Thanks, we'll review internally and get back to you soon.",
    exampleReply:
      "Just checking in on this in case it's helpful to keep things moving. If you're still reviewing, I'm happy to clarify anything in the proposal. And if timing has shifted, no problem at all - just let me know what makes the most sense on your side.",
    exampleAltReply:
      "Wanted to follow up on the proposal in case it's still under consideration. If useful, I can also simplify the options or answer any questions that might help with your decision.",
    strategyBullets: [
      "Reopens momentum without sounding desperate.",
      "Makes it easy for the client to respond honestly.",
      "Keeps your tone professional and low-pressure.",
    ],
    faq: [
      {
        q: "How do I follow up after sending a quote without sounding pushy?",
        a: "Keep the message short, calm, and decision-oriented. Offer help, acknowledge that timing may have changed, and make it easy for the client to reply honestly.",
      },
      {
        q: "What should I say when a client goes quiet after a proposal?",
        a: "A good follow-up checks in respectfully, offers clarification if needed, and gives the client room to share whether the project is delayed, paused, or still under review.",
      },
      {
        q: "How long should I wait before following up on a quote?",
        a: "It depends on context, but the bigger principle is not to wait passively forever. A concise follow-up after a reasonable interval helps maintain momentum.",
      },
      {
        q: "Should I lower my price in the follow-up message?",
        a: "Usually no. Silence alone is not a reason to discount. It is better to seek clarity first.",
      },
    ],
    relatedSlugs: ["budget-limited", "client-asks-discount", "lowball-offer"],
    promptContext:
      "The client has delayed or gone quiet after receiving a quote. The response should be a respectful follow-up that reopens the conversation, encourages clarity, and avoids sounding needy or pushy.",
    riskLevel: "low",
    primaryGoal: "Reopen momentum without sounding needy or pushy.",
    avoid: [
      "Sounding impatient",
      "Using pressure tactics too early",
      "Offering discounts just because of silence",
    ],
    preferredMoves: [
      "Check in respectfully",
      "Make it easy for the client to clarify status",
      "Offer help or simplification if useful",
    ],
    toneProfile: "decision-oriented",
    placeholder:
      "Paste the last message or silence context after you sent your quote...",
  },
  {
    slug: "small-extra-free",
    category: 'negotiation',
    title: "Small extra request for free",
    seoTitle: "Small extra request for free | Flowdockr",
    metaDescription:
      "Write a professional reply when a client asks for a small extra task for free. Keep boundaries while preserving the relationship.",
    h1: "Small extra request for free",
    heroIntro:
      "Small free requests feel harmless, but repeated unpriced extras quietly reset expectations. A strong reply decides clearly: either it is a one-time goodwill gesture, or it is scope expansion that should be named and priced.",
    shortDescription:
      "Generate a professional reply when a client asks for a small extra task for free.",
    problemText: [
      "Not every small extra request is a problem by itself. The real issue is whether it changes the baseline. If you keep saying yes casually, the client learns that your boundaries are soft and that extra work may be absorbed automatically.",
      "At the same time, pushing back too hard on every small request can create unnecessary friction. That is why the structure matters more than the sentence itself.",
      "A good response makes a conscious choice. Either you frame it as a one-time courtesy, or you clarify that it falls outside the current scope and can be added properly.",
    ],
    exampleClientMessage:
      "Could you also just quickly update these two extra sections? It should only take a few minutes.",
    exampleReply:
      "Happy to help. Since this is outside the original scope, I'd normally treat it as an add-on. If it helps keep things moving, I can include this one as a one-time courtesy, and then we can keep any further additions separate.",
    exampleAltReply:
      "I can definitely take care of that. Because it sits outside the current scope, I'd treat it as an extra item rather than include it by default. If you want, I can add it in with a small update to the project total.",
    strategyBullets: [
      "Keeps the relationship warm while still naming the scope boundary.",
      "Prevents a small free task from silently becoming the new baseline.",
      "Lets you choose between goodwill and billable expansion consciously.",
    ],
    faq: [
      {
        q: "How do I respond when a client asks for a small extra task for free?",
        a: "A strong response names the scope boundary clearly and then makes a conscious choice: either include it as a one-time courtesy or treat it as an add-on.",
      },
      {
        q: "Should I do small extras for free?",
        a: "Sometimes, but only intentionally. The danger is not the single small task. The danger is normalizing unpaid extras as the expectation.",
      },
      {
        q: "How do I avoid sounding petty about a small request?",
        a: "Use calm, professional language and focus on scope clarity rather than effort alone. The point is not that the task is impossible, but that repeated extras affect process and expectations.",
      },
      {
        q: "What is the best way to preserve goodwill while keeping boundaries?",
        a: "If you choose to include something small, frame it explicitly as a one-time courtesy. That protects goodwill without changing the default scope rules.",
      },
    ],
    relatedSlugs: ["more-work-same-budget", "free-sample-work", "client-asks-discount"],
    promptContext:
      "The client is asking for a small extra task for free. The response should preserve the relationship, clarify whether the task is outside scope, and either frame it as a one-time courtesy or as a billable add-on.",
    riskLevel: "medium",
    primaryGoal:
      "Keep goodwill while preventing small unpaid extras from becoming the default expectation.",
    avoid: [
      "Treating every small request as a major confrontation",
      "Automatically absorbing extra work",
      "Leaving the scope boundary unspoken",
    ],
    preferredMoves: [
      "Name that the request is outside scope",
      "Choose consciously between courtesy and billable add-on",
      "Protect the future baseline expectation",
    ],
    toneProfile: "warm-firm",
    placeholder:
      "Paste the message where the client asks for a small extra for free...",
  },
];

export const scenarioOptions = [
  { value: 'lowball-offer', label: 'Price pushback after proposal' },
  { value: 'client-asks-discount', label: 'Discount pressure before signing' },
  { value: 'budget-limited', label: 'Budget lower than expected' },
  { value: 'cheaper-freelancer', label: 'Cheaper competitor comparison' },
  { value: 'more-work-same-budget', label: 'More work for the same price' },
  { value: 'free-sample-work', label: 'Free trial work request' },
] as const;

export type ScenarioSlug = (typeof scenarios)[number]["slug"];

const scenarioMap = new Map<string, Scenario>(
  scenarios.map((scenario) => [scenario.slug, scenario])
);

export function isScenarioSlug(value: string): value is ScenarioSlug {
  return scenarioMap.has(value);
}

export function getScenarioBySlug(slug: string): Scenario | null {
  return scenarioMap.get(slug) || null;
}

export function getRelatedScenarios(slug: string): Scenario[] {
  const scenario = getScenarioBySlug(slug);
  if (!scenario) {
    return [];
  }

  return scenario.relatedSlugs
    .map((relatedSlug) => scenarioMap.get(relatedSlug))
    .filter((item): item is Scenario => Boolean(item));
}
