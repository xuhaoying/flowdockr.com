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
  {
    slug: "client-delays-payment",
    category: 'difficult-clients',
    title: "Delayed payment follow-up",
    seoTitle: "Delayed payment follow-up | Flowdockr",
    metaDescription:
      "Generate a clear, professional follow-up when a client delays payment. Protect cash flow without turning the message hostile.",
    h1: "Delayed payment follow-up",
    heroIntro:
      "Late payment follow-ups are delicate because the issue is both financial and relational. A stronger message stays calm, names the due status clearly, and points the client toward the next step without sounding passive.",
    shortDescription:
      "Generate a professional message when a client is late paying an invoice.",
    problemText: [
      "When a payment is late, many freelancers either send reminders that are too vague or messages that sound more frustrated than strategic. Neither works well. Vague reminders invite more delay. Overheated reminders create unnecessary friction.",
      "A better reply stays factual. It references the invoice or due date, confirms the status you need, and makes the next step obvious.",
      "The goal is not to vent. It is to move the payment conversation forward while keeping your tone professional and controlled.",
    ],
    exampleClientMessage:
      "Sorry for the delay. We're still sorting a few internal approvals and should have an update soon.",
    exampleReply:
      "Thanks for the update. Just to keep this moving, invoice #104 was due on March 5. Can you confirm the expected payment date from your side so I know how to plan next steps here?",
    exampleAltReply:
      "Understood. For clarity, the invoice is now past due, so I wanted to confirm timing on payment. If helpful, feel free to share the expected payment date or who I should coordinate with directly.",
    strategyBullets: [
      "Keeps the tone professional without sounding overly soft.",
      "Names the due status clearly instead of hinting at it.",
      "Asks for a concrete next step rather than waiting on vague reassurance.",
    ],
    faq: [
      {
        q: "How do I follow up when a client pays late?",
        a: "A strong follow-up is clear, factual, and specific. Reference the invoice or due date, ask for the expected payment timing, and keep the tone controlled rather than emotional.",
      },
      {
        q: "Should I mention that the invoice is overdue?",
        a: "Yes, usually. Avoid sounding accusatory, but do make the status explicit so the conversation stays grounded in facts.",
      },
      {
        q: "What if I want to stay polite without sounding passive?",
        a: "Focus on clarity instead of apology. You can stay respectful while still asking for a concrete payment date or next step.",
      },
      {
        q: "When should I escalate a late payment follow-up?",
        a: "Escalation depends on your agreement and the delay length, but the first step is usually a clear reminder that asks for specific timing instead of another open-ended promise.",
      },
    ],
    relatedSlugs: ["delayed-decision", "client-asks-discount", "small-extra-free"],
    promptContext:
      "The client has delayed payment or is late on an invoice. The response should stay calm, reference the due status clearly, ask for a concrete payment update, and avoid emotional escalation.",
    riskLevel: "medium",
    primaryGoal:
      "Move the payment conversation forward with a clear, professional follow-up.",
    avoid: [
      "Sending a vague reminder with no clear ask",
      "Sounding apologetic about asking for payment",
      "Letting frustration control the tone",
    ],
    preferredMoves: [
      "Reference the invoice or due date clearly",
      "Ask for a concrete payment update",
      "Keep the tone calm and controlled",
    ],
    toneProfile: "decision-oriented",
    placeholder:
      "Paste the delayed payment message or overdue invoice follow-up context...",
  },
  {
    slug: "invoice-follow-up",
    category: 'difficult-clients',
    title: "Overdue invoice follow-up",
    seoTitle: "Overdue invoice follow-up | Flowdockr",
    metaDescription:
      "Generate a professional overdue invoice reminder that is clear, specific, and harder for the client to ignore.",
    h1: "Overdue invoice follow-up",
    heroIntro:
      "Invoice follow-ups work best when they are specific, factual, and easy to act on. A stronger message references the invoice clearly, names the overdue status, and asks for a concrete payment timeline instead of sending another vague nudge.",
    shortDescription:
      "Generate a professional follow-up when a freelance invoice is overdue.",
    problemText: [
      "Once an invoice is overdue, many freelancers try to stay polite by sending messages that are too soft to move anything forward. The result is often more delay, not less tension.",
      "The goal of an overdue invoice follow-up is not to sound aggressive. It is to make the status explicit, remove ambiguity, and give the client a clear next step.",
      "A stronger reply cites the invoice, references the payment timing clearly, and asks for a specific update rather than accepting another vague promise.",
    ],
    exampleClientMessage:
      "Sorry, we've been a bit behind internally. We'll try to get this sorted soon.",
    exampleReply:
      "Thanks for the update. Invoice #1042 is now overdue, so I wanted to check the exact payment timeline from your side. Can you confirm the expected payment date so I can plan next steps here?",
    exampleAltReply:
      "Understood. Since the invoice is now past due, could you confirm when payment is scheduled? A specific date would be helpful so I can keep the project admin aligned on my side.",
    strategyBullets: [
      "Names the overdue status clearly instead of hinting at it.",
      "Asks for a concrete payment date rather than another open-ended reassurance.",
      "Keeps the tone factual and controlled without sounding passive.",
    ],
    faq: [
      {
        q: "How do I follow up on an overdue invoice without sounding rude?",
        a: "Use factual language, reference the invoice clearly, and ask for a specific payment date. Clarity is more useful than extra apology.",
      },
      {
        q: "Should I mention that the invoice is overdue?",
        a: "Yes. Avoid accusations, but make the payment status explicit so the conversation stays grounded in facts.",
      },
      {
        q: "What should I ask for in an invoice follow-up?",
        a: "Ask for a concrete payment date or a clear next step. That is usually more effective than asking whether they saw the invoice.",
      },
      {
        q: "What if the client keeps saying payment is in progress?",
        a: "Keep asking for a specific date or owner on their side. The main goal is to move the conversation from vague reassurance to actionable timing.",
      },
    ],
    relatedSlugs: ["client-delays-payment", "delayed-decision", "budget-limited"],
    promptContext:
      "The invoice is overdue and the freelancer needs a clear payment update. The response should reference the invoice status directly, ask for a specific payment date or next step, and stay calm and professional without sounding passive.",
    riskLevel: "medium",
    primaryGoal:
      "Get a clear payment timeline without making the follow-up emotional or vague.",
    avoid: [
      "Sending another vague reminder",
      "Sounding apologetic about asking for payment",
      "Letting the client stay in abstract reassurance mode",
    ],
    preferredMoves: [
      "Reference the invoice and overdue status clearly",
      "Ask for a concrete payment date",
      "Keep the tone factual and professional",
    ],
    toneProfile: "decision-oriented",
    placeholder:
      "Paste the overdue invoice follow-up message or payment delay context...",
  },
  {
    slug: "price-objection",
    category: 'pricing',
    title: "Price objection without discount framing",
    seoTitle: "Price objection without discount framing | Flowdockr",
    metaDescription:
      "Generate a calm, value-protecting reply when a client says your price feels too expensive.",
    h1: "Price objection without discount framing",
    heroIntro:
      "When a client says the price feels expensive, the pressure is often about perceived value, not just budget. A stronger response acknowledges the concern, avoids immediate concessions, and reframes the discussion around fit, scope, and tradeoffs.",
    shortDescription:
      "Generate a confident reply when a client says your price feels too expensive.",
    problemText: [
      "A pure price objection can trigger an unhelpful instinct: defend yourself or cut the number quickly. Both responses weaken your positioning.",
      "Often the client has not yet connected the quote to the scope, process, or outcome they are actually buying. That makes the objection feel broader and more emotional than a direct discount ask.",
      "A stronger reply acknowledges the concern without treating it as a verdict. It keeps the focus on value, clarifies tradeoffs, and offers a structured lower-cost path only if the scope changes.",
    ],
    exampleClientMessage:
      "This seems a bit too expensive for where we are right now.",
    exampleReply:
      "I understand the concern. The quote reflects the scope and the level of thinking needed for the outcome you're aiming for. If the current number feels heavy, I can suggest a narrower first phase or a reduced-scope version so we keep the work aligned with the budget more realistically.",
    exampleAltReply:
      "Totally fair to raise. I wouldn't recommend lowering the same scope just to make the number feel easier, but I can outline a leaner option or phased approach if that would help us find a better fit.",
    strategyBullets: [
      "Acknowledges the objection without sounding defensive.",
      "Re-centers the discussion on scope, value, and tradeoffs instead of price alone.",
      "Offers a structured alternative only if the engagement changes.",
    ],
    faq: [
      {
        q: "How do I respond when a client says my price is too expensive?",
        a: "A strong reply acknowledges the concern, protects the pricing logic, and shifts the conversation toward value, scope, or phased work instead of immediate concessions.",
      },
      {
        q: "Is this the same as a discount request?",
        a: "Not exactly. A price objection is broader. The client is pushing back on perceived value or fit, not always asking for a specific discount.",
      },
      {
        q: "What should I offer instead of lowering the same scope?",
        a: "Reduced scope, a phased approach, or a leaner first version are usually stronger than simply cutting the price on unchanged work.",
      },
      {
        q: "What tone works best for price objections?",
        a: "Calm and confident. You want to show clarity, not defensiveness or over-justification.",
      },
    ],
    relatedSlugs: ["lowball-offer", "client-asks-discount", "budget-limited"],
    promptContext:
      "The client says the freelancer's price feels too expensive, but has not necessarily asked for a direct discount yet. The response should acknowledge the concern, reinforce value framing, avoid immediate price concessions, and suggest scope or phased alternatives only if appropriate.",
    riskLevel: "medium",
    primaryGoal:
      "Protect value framing and keep the conversation moving toward fit or tradeoffs instead of immediate concessions.",
    avoid: [
      "Apologizing for the quote",
      "Dropping the same scope to a lower price immediately",
      "Over-explaining every line item in the estimate",
    ],
    preferredMoves: [
      "Acknowledge the objection calmly",
      "Reconnect the quote to scope and outcomes",
      "Offer a leaner or phased option if budget fit is the real issue",
    ],
    toneProfile: "calm",
    placeholder:
      "Paste the message where the client says your price feels too expensive...",
  },
  {
    slug: "extra-revisions",
    category: 'negotiation',
    title: "Extra revisions beyond agreed rounds",
    seoTitle: "Extra revisions beyond agreed rounds | Flowdockr",
    metaDescription:
      "Generate a clear reply when a client asks for more revision rounds than the project originally included.",
    h1: "Extra revisions beyond agreed rounds",
    heroIntro:
      "Extra revisions often sound harmless, but they quickly reset expectations if you keep absorbing them. A stronger reply references the agreed revision scope, keeps the relationship warm, and gives the client a structured next step.",
    shortDescription:
      "Generate a professional response when a client asks for more revisions than agreed.",
    problemText: [
      "Revision pressure is tricky because it often comes wrapped in collaborative language. The client is not always asking for a major change, but repeated extra rounds still expand the work.",
      "If you keep saying yes casually, the revision limit stops meaning anything. That makes later boundaries much harder to defend.",
      "A stronger reply references the original revision scope, clarifies what would count as additional rounds, and offers a simple path forward instead of letting the process drift.",
    ],
    exampleClientMessage:
      "Could we do a couple more revision rounds before we lock this in?",
    exampleReply:
      "Happy to keep refining it. We have already moved through the revision rounds included in the original scope, so any additional rounds would be treated as an extension rather than part of the base project. If helpful, I can outline the next revision step and what it would add.",
    exampleAltReply:
      "I can absolutely help with further changes. Since they go beyond the revision rounds we originally planned for, I'd frame them as extra rounds so we keep the scope and timeline clear on both sides.",
    strategyBullets: [
      "References the agreed revision scope instead of arguing about effort.",
      "Keeps the tone supportive while still naming the boundary.",
      "Turns extra revisions into a clear next-step decision rather than an assumption.",
    ],
    faq: [
      {
        q: "How do I push back on extra revisions without sounding difficult?",
        a: "Use process language. Refer to the agreed revision scope, explain that further rounds are additional, and offer a clear next step.",
      },
      {
        q: "Should I ever allow extra revisions for free?",
        a: "Sometimes, but only intentionally. The key is not letting extra rounds quietly replace the original agreement.",
      },
      {
        q: "What makes revision requests hard to handle?",
        a: "They often sound collaborative and minor, which makes it easy to keep saying yes without noticing the scope change.",
      },
      {
        q: "How do I keep the client relationship positive?",
        a: "Stay warm, refer to process, and focus on what happens next instead of making it personal.",
      },
    ],
    relatedSlugs: ["small-extra-free", "more-work-same-budget", "additional-features"],
    promptContext:
      "The client is asking for additional revision rounds beyond what was originally agreed. The response should stay cooperative, reference the agreed revision scope clearly, and frame further rounds as an extension or add-on rather than an assumed free continuation.",
    riskLevel: "medium",
    primaryGoal:
      "Protect the revision boundary while keeping the collaboration constructive.",
    avoid: [
      "Treating unlimited revisions as the default",
      "Sounding irritated about client feedback",
      "Talking only about effort instead of agreed scope",
    ],
    preferredMoves: [
      "Reference the original revision scope",
      "Clarify that extra rounds are an extension",
      "Offer a clear next step for additional changes",
    ],
    toneProfile: "warm-firm",
    placeholder:
      "Paste the message where the client asks for more revision rounds...",
  },
  {
    slug: "scope-creep",
    category: 'negotiation',
    title: "Scope creep during delivery",
    seoTitle: "Scope creep during delivery | Flowdockr",
    metaDescription:
      "Generate a structured response when a client expands the project scope mid-stream.",
    h1: "Scope creep during delivery",
    heroIntro:
      "Scope creep gets expensive when it stays unnamed. A stronger response identifies what changed, reconnects the conversation to the original agreement, and gives the client a structured choice instead of silently absorbing the expansion.",
    shortDescription:
      "Generate a structured reply when a client expands project scope mid-project.",
    problemText: [
      "Scope creep rarely arrives as a dramatic reset. More often it appears in small additions that make the original agreement harder to recognize.",
      "The trap is waiting too long because each individual request feels manageable. By the time you react, the client may already assume the new work is included.",
      "A stronger response names the scope change clearly, explains that the request affects timeline or price, and offers a decision path instead of frustration.",
    ],
    exampleClientMessage:
      "Can we also add these extra pages and adjust the flow while we're already in here?",
    exampleReply:
      "Those additions make sense, and they do expand the original scope from what we agreed at the start. The cleanest way to handle it is to treat them as a scope change, so I can outline what stays inside the current plan and what would sit in an updated version with revised timing or budget.",
    exampleAltReply:
      "Happy to help with those additions. Since they go beyond the original scope, I'd suggest we reset the plan before moving ahead so the deliverables, timeline, and pricing stay clear on both sides.",
    strategyBullets: [
      "Names the scope change clearly instead of letting it stay implicit.",
      "Frames the response around agreement clarity rather than frustration.",
      "Turns expansion into a structured decision about scope, timing, or budget.",
    ],
    faq: [
      {
        q: "What is the best way to respond to scope creep?",
        a: "Identify the change clearly, connect it to the original scope, and offer structured options for handling the added work.",
      },
      {
        q: "Why is scope creep hard to address early?",
        a: "Because each request often feels small on its own. The challenge is naming the pattern before it becomes the assumed baseline.",
      },
      {
        q: "Should I talk about budget immediately?",
        a: "If the added work materially changes the project, yes. Budget or timeline implications should be part of the reset conversation.",
      },
      {
        q: "How do I avoid sounding defensive?",
        a: "Use calm, process-based language and keep the focus on agreement clarity rather than blame.",
      },
    ],
    relatedSlugs: ["more-work-same-budget", "additional-features", "extra-revisions"],
    promptContext:
      "The client is expanding project scope after work is already underway. The response should name the scope change clearly, reconnect the conversation to the original agreement, and present structured options around timing, scope, or budget rather than silently absorbing the change.",
    riskLevel: "high",
    primaryGoal:
      "Reset the agreement clearly before the expanded scope becomes the default expectation.",
    avoid: [
      "Silently absorbing the scope change",
      "Waiting so long that the new scope feels assumed",
      "Making the response sound emotional or resentful",
    ],
    preferredMoves: [
      "Identify what changed from the original scope",
      "Frame the issue around agreement clarity",
      "Offer structured options for scope, timing, or budget",
    ],
    toneProfile: "firm",
    placeholder:
      "Paste the message where the client expands the project scope...",
  },
  {
    slug: "additional-features",
    category: 'negotiation',
    title: "Additional feature request after agreement",
    seoTitle: "Additional feature request after agreement | Flowdockr",
    metaDescription:
      "Generate a positive but boundary-aware reply when a client asks to add new features after the project is already agreed.",
    h1: "Additional feature request after agreement",
    heroIntro:
      "New feature requests sound exciting, but they still change the original agreement. A stronger response stays positive, makes the impact visible, and turns the request into a scoped decision rather than a casual yes.",
    shortDescription:
      "Generate a boundary-aware response when a client asks for new features after agreement.",
    problemText: [
      "Feature requests often arrive when the client is excited and already imagining more possibilities. That makes them feel collaborative, not negotiable.",
      "The danger is saying yes before assessing implementation impact. Once you do that, the new feature starts to feel included by default.",
      "A stronger reply welcomes the idea, explains that it changes the scope, and proposes a clear way to evaluate or add it properly.",
    ],
    exampleClientMessage:
      "We were thinking it would be great to add one more feature before launch. Could you include that too?",
    exampleReply:
      "That could absolutely be valuable. Since it adds new functionality beyond the original agreement, I'd treat it as a feature addition rather than include it by default. If you want, I can outline the impact on scope and timing so you can decide whether to add it now or keep it for a later phase.",
    exampleAltReply:
      "I like the direction. Because it changes what we originally scoped, the cleanest approach is to price and plan it as an add-on so we stay clear on delivery expectations.",
    strategyBullets: [
      "Keeps the tone positive instead of making the request feel unreasonable.",
      "Makes the scope impact visible before work is accepted.",
      "Creates a clear decision point around whether to add the feature now or later.",
    ],
    faq: [
      {
        q: "How do I respond when a client asks for another feature after agreement?",
        a: "Acknowledge the idea positively, explain that it changes the scope, and suggest a structured way to evaluate or add it.",
      },
      {
        q: "Why are feature requests tricky?",
        a: "Because they often sound like natural extensions, even when they add real implementation time, testing, and delivery risk.",
      },
      {
        q: "Should I push the feature to a later phase?",
        a: "Sometimes that is the strongest option. It keeps the current work stable while giving the client a path to add more later.",
      },
      {
        q: "How do I avoid sounding negative?",
        a: "Stay collaborative, but be explicit that the request changes the agreed scope and needs its own decision.",
      },
    ],
    relatedSlugs: ["scope-creep", "more-work-same-budget", "rush-delivery"],
    promptContext:
      "The client is asking to add new functionality after the project is already agreed. The response should stay positive, explain that the feature changes scope or delivery, and propose a structured way to add it now or phase it later.",
    riskLevel: "medium",
    primaryGoal:
      "Keep the relationship positive while preventing new features from sliding into scope by default.",
    avoid: [
      "Saying yes before evaluating impact",
      "Treating the feature as already included",
      "Making the client feel scolded for asking",
    ],
    preferredMoves: [
      "Acknowledge the idea positively",
      "Explain that it changes scope or delivery",
      "Offer a clear add-now or phase-later decision path",
    ],
    toneProfile: "warm-firm",
    placeholder:
      "Paste the message where the client asks to add a new feature...",
  },
  {
    slug: "rush-delivery",
    category: 'negotiation',
    title: "Rush delivery request",
    seoTitle: "Rush delivery request | Flowdockr",
    metaDescription:
      "Generate a professional reply when a client asks for delivery much sooner than originally agreed.",
    h1: "Rush delivery request",
    heroIntro:
      "Rush delivery requests create pressure fast because the client wants speed without always seeing the tradeoffs. A stronger response acknowledges urgency, names feasibility and pricing implications, and offers a workable rush path only if it is real.",
    shortDescription:
      "Generate a clear response when a client asks for significantly faster delivery.",
    problemText: [
      "Urgent delivery requests often compress decision-making. The temptation is to say yes first and figure out the consequences later.",
      "That usually creates hidden costs: schedule disruption, quality risk, or resentment about unpriced urgency.",
      "A stronger reply acknowledges the urgency, explains that faster delivery changes the working conditions, and offers concrete options around rush handling, scope reduction, or timing.",
    ],
    exampleClientMessage:
      "Can you deliver this by Friday instead of next week?",
    exampleReply:
      "I understand the urgency. Delivering by Friday would require a rush adjustment because it changes the timeline we originally planned around. If that deadline is fixed, I can look at what is realistically possible and either price it as a rush delivery or reduce scope so the compressed timeline still works.",
    exampleAltReply:
      "That may be possible, but it would change the delivery conditions from what we agreed. The cleanest next step is for me to confirm what can move into a rush timeline and what tradeoffs or rush terms would come with it.",
    strategyBullets: [
      "Acknowledges urgency instead of dismissing it.",
      "Makes timeline compression sound negotiated rather than free.",
      "Introduces rush terms, scope reduction, or scheduling alternatives.",
    ],
    faq: [
      {
        q: "How do I respond to a rush delivery request?",
        a: "Acknowledge the urgency, then explain that the faster delivery changes feasibility, pricing, or scope. Offer concrete options instead of a vague yes.",
      },
      {
        q: "Should rush work cost more?",
        a: "Often yes. If the faster timeline affects your schedule, response windows, or other commitments, it should usually come with adjusted terms.",
      },
      {
        q: "What if I cannot meet the rush deadline?",
        a: "Say that clearly and offer the closest realistic alternative. It is better than agreeing to something you cannot actually deliver.",
      },
      {
        q: "How do I stay helpful without giving urgency away for free?",
        a: "Recognize the deadline, then frame the response around what is feasible and what tradeoffs would be required.",
      },
    ],
    relatedSlugs: ["timeline-pressure", "more-work-same-budget", "client-asks-discount"],
    promptContext:
      "The client wants delivery faster than originally agreed. The response should acknowledge urgency, explain feasibility or scheduling tradeoffs, introduce rush terms if appropriate, and offer scope or timing alternatives rather than treating the speed change as free.",
    riskLevel: "high",
    primaryGoal:
      "Protect schedule and pricing logic while still giving the client a realistic path forward.",
    avoid: [
      "Agreeing before checking feasibility",
      "Treating the rush timeline as automatically included",
      "Giving a vague maybe with no tradeoffs",
    ],
    preferredMoves: [
      "Acknowledge the urgency clearly",
      "Explain the scheduling or rush tradeoff",
      "Offer rush terms, reduced scope, or a realistic alternative timeline",
    ],
    toneProfile: "firm",
    placeholder:
      "Paste the message where the client asks for rush delivery...",
  },
  {
    slug: "timeline-pressure",
    category: 'negotiation',
    title: "Timeline pressure without explicit rush terms",
    seoTitle: "Timeline pressure without explicit rush terms | Flowdockr",
    metaDescription:
      "Generate a professional response when a client asks to speed up the project timeline.",
    h1: "Timeline pressure without explicit rush terms",
    heroIntro:
      "Timeline pressure often sounds softer than a rush request, but it still changes scheduling and tradeoffs. A stronger response clarifies what the faster turnaround would affect and guides the client toward a realistic adjustment.",
    shortDescription:
      "Generate a response when a client asks whether the project can move faster.",
    problemText: [
      "Clients often ask to speed things up without naming the consequences. That makes the request sound lighter than it really is.",
      "If you answer too quickly, you can accidentally agree to a compressed schedule without clarifying reprioritization, scope trimming, or availability.",
      "A stronger reply acknowledges the request, frames it around scheduling constraints, and offers options that make the tradeoff visible.",
    ],
    exampleClientMessage:
      "Is there any way to speed this up?",
    exampleReply:
      "Possibly, but it would depend on what needs to move in the schedule and whether we keep the current scope unchanged. If the timeline needs to shorten, I can suggest the cleanest options around reprioritizing deliverables, tightening the schedule, or adjusting the plan so the faster turnaround is still realistic.",
    exampleAltReply:
      "I can look at ways to accelerate it, but I would want to frame that around scheduling and scope tradeoffs rather than promise a faster turnaround without checking what shifts on the backend.",
    strategyBullets: [
      "Acknowledges the request without committing too early.",
      "Frames the conversation around scheduling constraints and tradeoffs.",
      "Suggests practical ways to shorten the timeline without hiding the cost.",
    ],
    faq: [
      {
        q: "How do I respond when a client asks to speed up the timeline?",
        a: "Acknowledge the request, then explain that faster delivery depends on scheduling, scope, and feasibility. Offer concrete options rather than a vague yes.",
      },
      {
        q: "Is timeline pressure the same as rush delivery?",
        a: "Not always. It is often a softer request, but it still creates real tradeoffs that need to be named.",
      },
      {
        q: "What should I offer when the client wants it faster?",
        a: "Useful options include reprioritizing scope, adjusting the schedule, or defining a tighter version of the deliverable.",
      },
      {
        q: "How do I avoid underpricing speed?",
        a: "Make the scheduling impact visible before you commit. If speed creates real cost or disruption, treat it as a negotiated change.",
      },
    ],
    relatedSlugs: ["rush-delivery", "more-work-same-budget", "budget-limited"],
    promptContext:
      "The client wants the work to move faster, but the request is framed more as timeline pressure than a formal rush ask. The response should acknowledge the request, reframe the conversation around scheduling constraints, and suggest realistic timeline or scope adjustments instead of committing too quickly.",
    riskLevel: "medium",
    primaryGoal:
      "Make the timeline tradeoff visible before the faster turnaround becomes an assumption.",
    avoid: [
      "Committing to a faster schedule too quickly",
      "Ignoring the scheduling impact",
      "Treating acceleration as a free add-on",
    ],
    preferredMoves: [
      "Acknowledge the timeline request",
      "Reframe around scheduling constraints",
      "Offer scope or schedule adjustments that make the tradeoff explicit",
    ],
    toneProfile: "calm",
    placeholder:
      "Paste the message where the client asks if the timeline can move faster...",
  },
];

export const scenarioOptions = scenarios.map((scenario) => ({
  value: scenario.slug,
  label: scenario.title,
})) as ReadonlyArray<{ value: string; label: string }>;

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
