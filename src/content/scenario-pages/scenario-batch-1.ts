import type { CanonicalScenario } from '@/types/scenario-catalog';

type BatchScenarioInput = Omit<
  CanonicalScenario,
  'sourceType' | 'sourceNote' | 'status' | 'priority' | 'isSeed'
> & {
  targetQuery: string;
  priority?: CanonicalScenario['priority'];
};

const growthPriorityById: Record<string, CanonicalScenario['priority']> = {
  scn_price_too_high_response: 'p0',
  scn_discount_request_response: 'p0',
  scn_found_someone_cheaper: 'p0',
  scn_low_budget_client_reply: 'p0',
  scn_can_you_do_it_cheaper_reply: 'p0',
  scn_negotiate_price_email_reply: 'p2',
  scn_price_objection_freelancer_reply: 'p2',
  scn_client_questions_pricing: 'p2',
  scn_out_of_budget_still_interested: 'p0',
  scn_lower_rate_after_proposal: 'p0',
  scn_after_client_ghosted: 'p0',
  scn_stopped_replying_after_quote: 'p0',
  scn_client_no_response_follow_up: 'p0',
  scn_professional_rejection_response: 'p2',
  scn_after_client_says_no: 'p2',
  scn_changing_requirements_response: 'p0',
  scn_scope_creep_polite_response: 'p0',
  scn_extra_work_for_free: 'p0',
  scn_out_of_scope_professionally: 'p0',
  scn_adding_small_requests: 'p0',
  scn_set_boundaries_politely: 'p2',
  scn_urgent_request_response: 'p0',
  scn_unrealistic_deadline_response: 'p0',
  scn_faster_delivery_no_extra_pay: 'p0',
  scn_difficult_client_response: 'p2',
  scn_passive_aggressive_client_response: 'p2',
  scn_delayed_payment_follow_up: 'p0',
  scn_ask_for_payment_politely: 'p0',
  scn_free_sample_request_response: 'p0',
  scn_unlimited_revisions_response: 'p0',
  scn_competitor_comparison_response: 'p2',
  scn_trial_project_reply: 'p0',
  scn_discount_after_delivery: 'p0',
  scn_experience_question_response: 'p2',
};

function createBatchScenario({
  targetQuery,
  priority = 'p1',
  ...scenario
}: BatchScenarioInput): CanonicalScenario {
  const reviewedPriority = growthPriorityById[scenario.id] ?? priority;

  return {
    ...scenario,
    sourceType: 'synthesized',
    sourceNote: `Batch 1 SEO scenario entry targeting "${targetQuery}".`,
    status: 'ready',
    priority: reviewedPriority,
    isSeed: true,
  };
}

export const canonicalScenarioBatchOne: CanonicalScenario[] = [
  createBatchScenario({
    id: 'scn_price_too_high_response',
    title: 'How to respond when a client says your price is too high',
    slug: 'price-too-high-response',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: 'Your price is too high for us.',
    clientMessageVariants: [
      'Your price is too high for us.',
      'This feels too expensive for what we need.',
    ],
    userSituation:
      'The client is interested, but the number becomes the sticking point. You need to hold value without sounding defensive or discounting too fast.',
    searchIntentPrimary: 'client says your price is too high how to respond',
    searchIntentSecondary:
      'how to respond when a client says your price is too high',
    strategyPrimary:
      'Acknowledge the pushback and bring the conversation back to scope, outcomes, and what the price covers.',
    strategySecondary:
      'If the budget is real, offer a smaller version or phased path instead of discounting the same work.',
    toolPromptIntent:
      'Draft a calm reply when a client says your price is too high. Keep the tone professional, protect the value of the work, and offer structured alternatives only if needed.',
    targetQuery: 'client says your price is too high how to respond',
  }),
  createBatchScenario({
    id: 'scn_discount_request_response',
    title: 'How to respond when a client asks for a discount',
    slug: 'discount-request-response',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can you give us a discount?',
    clientMessageVariants: [
      'Can you give us a discount?',
      'Is there any room to bring the price down?',
    ],
    userSituation:
      'The client wants price movement before committing. You need to stay cooperative without turning the rate into something negotiable by default.',
    searchIntentPrimary: 'how to respond when client asks for discount',
    searchIntentSecondary: 'client asks for discount what to say',
    strategyPrimary:
      'Keep the base rate intact and only discuss movement if there is a real tradeoff in scope, timing, or commitment.',
    strategySecondary:
      'Turn any concession into a defined exchange instead of giving away margin for free.',
    toolPromptIntent:
      'Write a confident reply when a client asks for a discount. Keep the tone professional, protect your rate, and offer structured alternatives if appropriate.',
    targetQuery: 'how to respond when client asks for discount',
  }),
  createBatchScenario({
    id: 'scn_found_someone_cheaper',
    title: 'Client says they found someone cheaper',
    slug: 'found-someone-cheaper',
    metaTitle:
      'Client Found Someone Cheaper? What to Say Next | Flowdockr',
    metaDescription:
      'Use this scenario when a client says they found someone cheaper. Defend your value, avoid a price war, and keep the reply professional.',
    previewReply:
      'I understand. If the decision comes down to price alone, the cheaper option may be the better fit, but if you want, I can also clarify what is different in my scope, process, or level of support so you can compare it properly.',
    heroDescription:
      'Use this scenario when a client says they found someone cheaper and you need to protect your positioning without sounding threatened. Get a reply you can adapt and send.',
    pagePromise:
      'Generate a price-comparison reply that protects value and avoids a race to the bottom.',
    cluster: 'pricing',
    archetype: 'price_comparison',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: 'We found someone cheaper.',
    clientMessageVariants: [
      'We found someone cheaper.',
      'Another freelancer offered a lower price.',
    ],
    userSituation:
      'The client is testing whether you will race to the lowest number. You need to differentiate clearly without sounding threatened.',
    searchIntentPrimary: 'client says they found someone cheaper what to say',
    searchIntentSecondary: 'client found someone cheaper what to say',
    strategyPrimary:
      'Acknowledge the comparison without attacking the other option or racing to the lowest number.',
    strategySecondary:
      'Reframe around scope, reliability, and fit, or offer a smaller package if the budget truly differs.',
    relatedScenarioSlugs: [
      'quote-too-high',
      'meet-their-budget',
      'lower-rate-after-proposal',
      'same-scope-lower-price',
      'discount-request',
    ],
    toolPromptIntent:
      'Draft a composed reply when a client says they found someone cheaper. Keep the tone confident, avoid a price war, and explain the difference in fit or scope.',
    targetQuery: 'client says they found someone cheaper what to say',
  }),
  createBatchScenario({
    id: 'scn_low_budget_client_reply',
    title: 'How to respond to a low-budget client politely',
    slug: 'low-budget-client-reply',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: 'Your quote is above our budget.',
    clientMessageVariants: [
      'Your quote is above our budget.',
      'We do not have that kind of budget for this.',
    ],
    userSituation:
      'The budget gap looks real, but the client may still want to work with you. You need to protect your pricing while staying polite and useful.',
    searchIntentPrimary: 'how to respond to low budget client politely',
    searchIntentSecondary: 'low budget client polite reply',
    strategyPrimary:
      'Acknowledge the budget limit respectfully and shift the conversation to priorities, phases, or a smaller version of the work.',
    strategySecondary:
      'Avoid squeezing the original scope into a weaker price just to keep the lead alive.',
    toolPromptIntent:
      'Write a polite reply for a low-budget client. Keep the tone constructive, protect your pricing logic, and offer a realistic smaller option if there is one.',
    targetQuery: 'how to respond to low budget client politely',
  }),
  createBatchScenario({
    id: 'scn_negotiate_price_email_reply',
    title: 'How to reply when a client negotiates your price by email',
    slug: 'negotiate-price-email-reply',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'Thanks for the proposal. Is there any flexibility in the price?',
    clientMessageVariants: [
      'Can we negotiate the price a bit?',
      'Can you revisit the number before we proceed?',
    ],
    userSituation:
      'The price discussion is happening over email, where tone gets flattened fast. You need to stay firm without sounding cold or defensive.',
    searchIntentPrimary: 'client wants to negotiate price email reply',
    searchIntentSecondary: 'price negotiation email reply to client',
    strategyPrimary:
      'Keep the email calm and structured so the price discussion does not spiral into vague back-and-forth.',
    strategySecondary:
      'If you offer flexibility, tie it to a specific scope or term change rather than an open-ended discount.',
    toolPromptIntent:
      'Draft a professional email reply when a client wants to negotiate price. Keep it concise, confident, and structured around clear options.',
    targetQuery: 'client wants to negotiate price email reply',
  }),
  createBatchScenario({
    id: 'scn_can_you_do_it_cheaper_reply',
    title: 'Client asks if you can do it cheaper',
    slug: 'can-you-do-it-cheaper-reply',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can you do it cheaper?',
    clientMessageVariants: [
      'Can you do it cheaper?',
      'Can you lower the price on this?',
    ],
    userSituation:
      'The client is pushing directly for a lower number. You need to hold the line without making the exchange feel tense or robotic.',
    searchIntentPrimary: 'client asks can you do it cheaper what to say',
    searchIntentSecondary: 'can you do it cheaper client reply',
    strategyPrimary:
      'Do not treat the price as arbitrary. Ask what budget or outcome they are trying to hit before talking about movement.',
    strategySecondary:
      'If you make room, change scope, timing, or terms so the concession has structure.',
    toolPromptIntent:
      'Write a firm but professional reply when a client asks if you can do it cheaper. Protect the rate logic and guide the discussion toward scope or terms.',
    targetQuery: 'client asks can you do it cheaper what to say',
  }),
  createBatchScenario({
    id: 'scn_price_objection_freelancer_reply',
    title: 'How to reply when a client pushes back on price',
    slug: 'price-objection-freelancer-reply',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: 'This is more than we were hoping to spend.',
    clientMessageVariants: [
      'I have concerns about the price.',
      'The quote feels high from our side.',
    ],
    userSituation:
      'The client is pushing back on price, but they have not said whether the issue is budget, value, or negotiation. You need a reply that keeps the deal alive without conceding too early.',
    searchIntentPrimary: 'how to respond to price objection freelancer',
    searchIntentSecondary: 'freelancer price objection response',
    strategyPrimary:
      'Acknowledge the concern and ask what feels off before you try to solve the wrong pricing problem.',
    strategySecondary:
      'Once the issue is clear, respond through value, scope, or sequencing instead of reflexively cutting the number.',
    toolPromptIntent:
      'Draft a professional reply to a client price objection. Keep the tone calm, clarify the real issue, and avoid discounting too early.',
    targetQuery: 'how to respond to price objection freelancer',
  }),
  createBatchScenario({
    id: 'scn_out_of_budget_still_interested',
    title: 'Client says it is out of budget but still interested',
    slug: 'out-of-budget-still-interested',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: "This is out of budget, but we're still interested.",
    clientMessageVariants: [
      "This is out of budget, but we're still interested.",
      'We like this, but the number is beyond where we can land.',
    ],
    userSituation:
      'The client is giving a buying signal, but the current version does not fit budget. You need to preserve momentum without shrinking the work blindly.',
    searchIntentPrimary: 'client says out of budget but still interested reply',
    searchIntentSecondary: 'out of budget but interested client reply',
    strategyPrimary:
      'Treat the interest as real and move the conversation toward a leaner scope, phased delivery, or a narrower first step.',
    strategySecondary:
      'Keep the original pricing logic intact so the client sees the tradeoff clearly.',
    toolPromptIntent:
      'Write a constructive reply when a client says the project is out of budget but they are still interested. Keep the tone collaborative and shift the discussion toward workable options.',
    targetQuery: 'client says out of budget but still interested reply',
  }),
  createBatchScenario({
    id: 'scn_client_questions_pricing',
    title: 'How to explain your pricing to a client',
    slug: 'client-questions-pricing',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can you walk me through how you priced this?',
    clientMessageVariants: [
      'Can you explain your pricing?',
      'How did you get to this number?',
    ],
    userSituation:
      'The client is not rejecting the quote yet, but they want to understand the number. You need to explain the pricing clearly without sounding defensive.',
    searchIntentPrimary: 'how to respond when client questions your pricing',
    searchIntentSecondary: 'client questions your pricing what to say',
    strategyPrimary:
      'Explain the number through scope, judgment, process, and business outcome instead of raw effort alone.',
    strategySecondary:
      'Keep the answer concise so the conversation stays strategic rather than turning into line-by-line bargaining.',
    toolPromptIntent:
      'Draft a clear reply when a client questions your pricing. Explain the logic confidently, stay concise, and avoid sounding apologetic.',
    targetQuery: 'how to respond when client questions your pricing',
  }),
  createBatchScenario({
    id: 'scn_lower_rate_after_proposal',
    title: 'Client asks for a lower rate after your proposal',
    slug: 'lower-rate-after-proposal',
    metaTitle:
      'Client Asks for a Lower Rate After Your Proposal | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a lower rate after you already sent the proposal. Protect the original quote and offer structured alternatives only if needed.',
    previewReply:
      'The proposal price reflects the scope we outlined, so I would not usually revise the number downward without changing something behind it. If the budget needs to change, I can suggest a smaller version or adjusted phase plan rather than weakening the same proposal.',
    heroDescription:
      'Use this scenario when a client comes back after the proposal and asks for a lower rate. Get a reply that protects the original quote without stalling the deal.',
    pagePromise:
      'Generate a post-proposal pricing reply that keeps the scope-price link intact.',
    cluster: 'pricing',
    archetype: 'pricing_objection',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'Can you lower the rate from the proposal?',
    clientMessageVariants: [
      'Can you lower the rate from the proposal?',
      'Would you be open to revising the proposal price downward?',
    ],
    userSituation:
      'You already sent a proposal with a defined scope, and now the client wants a cheaper version of the same plan. You need to protect the original quote without stalling the deal.',
    searchIntentPrimary: 'client asks for lower rate after proposal response',
    searchIntentSecondary: 'lower rate after proposal client response',
    strategyPrimary:
      'Re-anchor the proposal around the agreed scope and explain that price changes need scope or term changes behind them.',
    strategySecondary:
      'If the client cannot support the original version, offer a revised scope instead of weakening the same proposal.',
    relatedScenarioSlugs: [
      'quote-too-high',
      'same-scope-lower-price',
      'meet-their-budget',
      'discount-request',
      'found-someone-cheaper',
    ],
    toolPromptIntent:
      'Write a professional reply when a client asks for a lower rate after you sent a proposal. Keep the tone steady and protect the integrity of the original quote.',
    targetQuery: 'client asks for lower rate after proposal response',
  }),
  createBatchScenario({
    id: 'scn_proposal_rejected_response',
    title: 'How to respond after a client rejects your proposal',
    slug: 'proposal-rejected-response',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      "We've decided not to move forward with the proposal.",
    clientMessageVariants: [
      "We've decided not to move forward with the proposal.",
      "We're going in a different direction for now.",
    ],
    userSituation:
      'The proposal has been declined and you need to close the thread well. The goal is to protect the relationship, not to argue them back into the deal.',
    searchIntentPrimary: 'client rejected your proposal how to respond',
    searchIntentSecondary: 'how to respond when proposal is rejected',
    strategyPrimary:
      'Acknowledge the decision professionally and close the loop without making one last needy sales push.',
    strategySecondary:
      'Leave room for future work or referrals if appropriate, but keep the message clean and respectful.',
    toolPromptIntent:
      'Draft a professional reply after a client rejects your proposal. Keep the tone gracious, concise, and relationship-safe.',
    targetQuery: 'client rejected your proposal how to respond',
  }),
  createBatchScenario({
    id: 'scn_after_client_ghosted',
    title: 'How to reply after a client ghosts you',
    slug: 'after-client-ghosted',
    metaTitle:
      'Client Ghosted You? How to Follow Up Professionally | Flowdockr',
    metaDescription:
      'Use this scenario when a client ghosts you after showing interest. Send a follow-up that is direct, low-pressure, and easy to answer.',
    previewReply:
      'Hi [Name] — just checking back in on this. If timing or priorities changed on your side, no problem, but if you are still considering it, I am happy to answer anything that would help you decide on next steps.',
    heroDescription:
      'Use this scenario when a client showed interest and then disappeared. Get a follow-up you can send that feels professional, not resentful or needy.',
    pagePromise:
      'Generate a ghosting follow-up that reopens the thread without adding pressure.',
    cluster: 'ghosting',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: "Thanks, I'll get back to you.",
    clientMessageVariants: [
      "Thanks, I'll get back to you.",
      'Let me review this and circle back.',
    ],
    userSituation:
      'The conversation went quiet after interest was shown. You need a follow-up that is direct enough to reopen the thread without sounding resentful or needy.',
    searchIntentPrimary: 'how to reply after client ghosted you',
    searchIntentSecondary: 'reply after client ghosted you',
    strategyPrimary:
      'Follow up with a low-pressure message that invites a clear yes, no, or next step.',
    strategySecondary:
      'Make it easy for the client to respond by naming a simple option instead of asking a vague question.',
    relatedScenarioSlugs: [
      'client-no-response-follow-up',
      'no-response-after-rate',
      'no-response-after-proposal',
      'reviewing-internally-no-response',
      'silent-after-discovery-call',
    ],
    toolPromptIntent:
      'Write a short follow-up after a client ghosts you. Keep the tone professional, low-pressure, and easy to answer.',
    targetQuery: 'how to reply after client ghosted you',
  }),
  createBatchScenario({
    id: 'scn_stopped_replying_after_quote',
    title: 'Client stopped replying after your quote',
    slug: 'stopped-replying-after-quote',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'Thanks for the quote. We will review it internally.',
    clientMessageVariants: [
      'Thanks for the quote. We will review it internally.',
      'Let us review the quote and get back to you.',
    ],
    userSituation:
      'The quote was sent, the client acknowledged it, and then the thread stalled. You need to re-open the decision without chasing too hard.',
    searchIntentPrimary: 'client stopped replying after quote what to do',
    searchIntentSecondary: 'stopped replying after quote follow up',
    strategyPrimary:
      'Send a follow-up that references the quote clearly and asks whether timing, budget, or scope is the blocker.',
    strategySecondary:
      'Give them an easy path to close the loop so the silence does not drag on indefinitely.',
    toolPromptIntent:
      'Draft a follow-up when a client stops replying after your quote. Keep it clear, polite, and focused on getting a real answer.',
    targetQuery: 'client stopped replying after quote what to do',
  }),
  createBatchScenario({
    id: 'scn_client_no_response_follow_up',
    title: 'How to follow up with a client who did not respond',
    slug: 'client-no-response-follow-up',
    metaTitle:
      'How to Follow Up With a Client Who Did Not Respond | Flowdockr',
    metaDescription:
      'Use this scenario when a client did not respond and you need a short follow-up that nudges the conversation forward without sounding pushy.',
    previewReply:
      'Hi [Name] — wanted to follow up on my last note in case it got buried. If it helps, I can clarify anything or adjust timing on my side, but even a quick yes, no, or later update would be helpful.',
    heroDescription:
      'Use this scenario when a client did not respond and you need a polite nudge that makes replying feel simple. Get a follow-up you can copy, adjust, and send.',
    pagePromise:
      'Generate a low-friction client follow-up that invites a clear response.',
    cluster: 'ghosting',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'Sounds good, let me think about it.',
    clientMessageVariants: [
      'Sounds good, let me think about it.',
      'I will get back to you soon.',
    ],
    userSituation:
      'You need a follow-up that nudges the client without guilt or pressure. The main job is to make replying feel simple and worthwhile.',
    searchIntentPrimary: 'how to follow up with client who did not respond',
    searchIntentSecondary: 'client did not respond follow up message',
    strategyPrimary:
      'Keep the follow-up brief and specific so the client can answer without reprocessing the whole deal.',
    strategySecondary:
      'Invite a decision, timing update, or graceful close instead of just asking if they saw your message.',
    relatedScenarioSlugs: [
      'after-client-ghosted',
      'no-response-after-proposal',
      'no-response-after-rate',
      'reviewing-internally-no-response',
      'contract-sent-no-response',
    ],
    toolPromptIntent:
      'Write a polite follow-up for a client who did not respond. Keep the message short, clear, and easy to reply to.',
    targetQuery: 'how to follow up with client who did not respond',
  }),
  createBatchScenario({
    id: 'scn_professional_rejection_response',
    title: 'How to reply when a client says they are passing',
    slug: 'professional-rejection-response',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: "We're going to pass on this for now.",
    clientMessageVariants: [
      "We've decided to pass for now.",
      'We will not move forward at this time.',
    ],
    userSituation:
      'The client has decided not to move forward, and you want to close the thread well. The right reply protects the relationship without sounding needy.',
    searchIntentPrimary: 'how to respond to rejection professionally',
    searchIntentSecondary: 'professional response to client rejection',
    strategyPrimary:
      'Thank them for the update and acknowledge the decision cleanly instead of reopening the negotiation.',
    strategySecondary:
      'Leave the door open respectfully if there is a real reason to do so, then move on.',
    toolPromptIntent:
      'Draft a professional response to a client rejection. Keep it gracious, concise, and useful for future rapport.',
    targetQuery: 'how to respond to rejection professionally',
  }),
  createBatchScenario({
    id: 'scn_not_now_maybe_later_reply',
    title: 'Client says not now, maybe later',
    slug: 'not-now-maybe-later-reply',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'Not now, maybe later.',
    clientMessageVariants: [
      'Not now, maybe later.',
      'The timing is not right for us at the moment.',
    ],
    userSituation:
      'The client is not rejecting the work forever, but they are putting it off. You need to respond in a way that keeps the door open without hovering around the lead.',
    searchIntentPrimary: 'client says not now maybe later reply',
    searchIntentSecondary: 'not now maybe later client reply',
    strategyPrimary:
      'Acknowledge the timing issue and offer a simple way to revisit the conversation later.',
    strategySecondary:
      'Avoid turning a soft delay into a long thread of vague check-ins.',
    toolPromptIntent:
      'Write a reply when a client says not now, maybe later. Keep the tone warm, low-pressure, and easy to pick back up later.',
    targetQuery: 'client says not now maybe later reply',
  }),
  createBatchScenario({
    id: 'scn_re_engage_silent_client_email',
    title: 'How to re-engage a silent client by email',
    slug: 're-engage-silent-client-email',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'I will review and come back to you.',
    clientMessageVariants: [
      'I will review and come back to you.',
      'Let me check internally and reply soon.',
    ],
    userSituation:
      'The lead has gone silent, but you still have reason to believe the opportunity is alive. You need an email that is light, specific, and easy to respond to.',
    searchIntentPrimary: 'how to re-engage a silent client email',
    searchIntentSecondary: 're-engage silent client email',
    strategyPrimary:
      'Re-enter the conversation with a short email that gives context and a simple next step.',
    strategySecondary:
      'Offer a low-friction response path so the client does not need to write a long explanation.',
    toolPromptIntent:
      'Draft a re-engagement email for a silent client. Keep the tone professional, clear, and low-pressure.',
    targetQuery: 'how to re-engage a silent client email',
  }),
  createBatchScenario({
    id: 'scn_ignored_last_message_follow_up',
    title: 'Client ignored your last message',
    slug: 'ignored-last-message-follow-up',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'Let me get back to you after I review this.',
    clientMessageVariants: [
      'Let me get back to you after I review this.',
      'I will reply once I have had a chance to look through it.',
    ],
    userSituation:
      'Your last message got no response and you do not want the follow-up to feel awkward. The goal is to restart the thread with a useful nudge, not a guilt trip.',
    searchIntentPrimary: 'client ignored your last message follow up',
    searchIntentSecondary: 'ignored last message client follow up',
    strategyPrimary:
      'Reference the thread briefly and ask a concrete question that helps the client reply quickly.',
    strategySecondary:
      'Keep the message short so it feels like a helpful nudge rather than pressure.',
    toolPromptIntent:
      'Write a follow-up after a client ignores your last message. Keep it professional, light, and easy to answer.',
    targetQuery: 'client ignored your last message follow up',
  }),
  createBatchScenario({
    id: 'scn_after_client_says_no',
    title: 'What to say after a client says no',
    slug: 'after-client-says-no',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: "No, we're going to pass.",
    clientMessageVariants: [
      "No, we're going to pass.",
      'We will not be moving forward.',
    ],
    userSituation:
      'The client gave you a direct no and you want to respond in a way that preserves professionalism. This is more about relationship management than persuasion.',
    searchIntentPrimary: 'what to say after client says no',
    searchIntentSecondary: 'client says no reply',
    strategyPrimary:
      'Accept the decision gracefully and keep the reply centered on professionalism rather than second-chance selling.',
    strategySecondary:
      'If there is a clear future fit, leave a short door open and end cleanly.',
    toolPromptIntent:
      'Draft a reply for after a client says no. Keep it respectful, short, and relationship-safe.',
    targetQuery: 'what to say after client says no',
  }),
  createBatchScenario({
    id: 'scn_think_about_it_reply',
    title: 'Client says they will think about it',
    slug: 'think-about-it-reply',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'Let me think about it.',
    clientMessageVariants: [
      'Let me think about it.',
      'We need some time to think this through.',
    ],
    userSituation:
      'The client has not said yes or no, and vague waiting can drag on. You need a reply that keeps momentum without forcing the decision too hard.',
    searchIntentPrimary: 'client says they will think about it reply',
    searchIntentSecondary: 'let me think about it client reply',
    strategyPrimary:
      'Acknowledge the pause and guide the client toward a concrete next step or timeline for revisiting the decision.',
    strategySecondary:
      'Make your reply easy to act on so the conversation does not disappear into indefinite silence.',
    toolPromptIntent:
      'Write a professional reply when a client says they will think about it. Keep the tone calm and move the conversation toward a clear next step.',
    targetQuery: 'client says they will think about it reply',
  }),
  createBatchScenario({
    id: 'scn_changing_requirements_response',
    title: 'Client keeps changing requirements',
    slug: 'changing-requirements-response',
    metaTitle:
      'Client Keeps Changing Requirements? What to Say | Flowdockr',
    metaDescription:
      'Use this scenario when a client keeps changing requirements mid-project. Slow the drift down and redirect the conversation toward a clear scope change process.',
    previewReply:
      'I can work through those changes, but since they move beyond the requirements we originally aligned on, the cleanest next step is to update the scope before I keep building against a moving target.',
    heroDescription:
      'Use this scenario when a client keeps changing requirements and the project is starting to drift. Get a structured reply that protects scope without sounding inflexible.',
    pagePromise:
      'Generate a scope-change reply that restores clarity around requirements, timing, and budget.',
    cluster: 'scope',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage: 'We need to change a few things again.',
    clientMessageVariants: [
      'We need to change a few things again.',
      'A few requirements have shifted since the last version.',
    ],
    userSituation:
      'The moving target is starting to affect time, quality, and momentum. You need to slow the drift down without sounding inflexible.',
    searchIntentPrimary: 'client keeps changing requirements how to respond',
    searchIntentSecondary: 'client keeps changing requirements reply',
    strategyPrimary:
      'Separate the new requirements from the current agreement and restate what the existing scope covers.',
    strategySecondary:
      'Offer a change path through revised scope, timeline, or budget instead of absorbing the movement silently.',
    relatedScenarioSlugs: [
      'scope-creep-polite-response',
      'adding-small-requests',
      'out-of-scope-professionally',
      'extra-work-outside-scope',
      'extra-page-request',
    ],
    toolPromptIntent:
      'Draft a professional reply when a client keeps changing requirements. Keep the tone calm, restate the current scope, and propose a structured way to handle changes.',
    targetQuery: 'client keeps changing requirements how to respond',
  }),
  createBatchScenario({
    id: 'scn_scope_creep_polite_response',
    title: 'How to handle scope creep politely',
    slug: 'scope-creep-polite-response',
    metaTitle:
      'How to Handle Scope Creep Politely | Flowdockr',
    metaDescription:
      'Use this scenario when small client requests keep stretching the project. Protect the boundary politely and offer a practical next step.',
    previewReply:
      'Happy to look at that. Since it sits outside the scope we are currently working from, the cleanest option is to either treat it as an add-on, trade it against something already included, or move it into a later phase.',
    heroDescription:
      'Use this scenario when the extra asks seem small one by one, but together they are turning into scope creep. Get a polite boundary-setting reply you can send.',
    pagePromise:
      'Generate a scope-creep reply that stays collaborative while making the boundary explicit.',
    cluster: 'scope',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Can you also add this while you are in there?',
    clientMessageVariants: [
      'Can you also add this while you are in there?',
      'This should be a quick extra, right?',
    ],
    userSituation:
      'The extra asks seem small on their own, but together they are stretching the project. You need a polite way to protect the boundary before it becomes the new baseline.',
    searchIntentPrimary: 'how to handle scope creep politely',
    searchIntentSecondary: 'scope creep polite response',
    strategyPrimary:
      'Name the request as additional scope without making the client feel scolded.',
    strategySecondary:
      'Offer a paid add-on, tradeoff, or later phase so the boundary stays practical and collaborative.',
    relatedScenarioSlugs: [
      'changing-requirements-response',
      'extra-work-outside-scope',
      'extra-work-for-free',
      'adding-small-requests',
      'out-of-scope-professionally',
    ],
    toolPromptIntent:
      'Write a polite reply for scope creep. Keep the tone professional, explain the boundary clearly, and offer a structured next step.',
    targetQuery: 'how to handle scope creep politely',
  }),
  createBatchScenario({
    id: 'scn_extra_work_for_free',
    title: 'Client asks for extra work for free',
    slug: 'extra-work-for-free',
    metaTitle:
      'Client Wants Extra Work for Free? What to Say | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for extra work for free. Hold the scope boundary clearly and offer structured options instead of absorbing the request.',
    previewReply:
      'I can help with that, but it would sit outside the scope we agreed. The cleanest option is to add it as an extra item, swap it with something currently included, or save it for a later phase so the project stays clear on both sides.',
    heroDescription:
      'Use this scenario when a client wants extra work for free and you need to protect the project economics without sounding hostile. Get a reply that keeps the boundary professional.',
    pagePromise:
      'Generate a free-extra-work reply that protects scope and keeps the relationship intact.',
    cluster: 'scope',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'Can you include this extra part at no additional cost?',
    clientMessageVariants: [
      'Can you include this extra part at no additional cost?',
      'Can you just add this in for free?',
    ],
    userSituation:
      'The client wants more work without reopening scope or budget. You need to protect the project economics without making the reply feel hostile.',
    searchIntentPrimary: 'client asks for extra work for free reply',
    searchIntentSecondary: 'extra work for free client reply',
    strategyPrimary:
      'Separate the extra request from the agreed work and explain that it needs its own scope, budget, or tradeoff.',
    strategySecondary:
      'If you choose to make a small exception, name it as one-time so it does not reset expectations.',
    relatedScenarioSlugs: [
      'extra-work-outside-scope',
      'out-of-scope-professionally',
      'extra-page-request',
      'scope-creep-polite-response',
      'unlimited-revisions',
    ],
    toolPromptIntent:
      'Draft a firm but professional reply when a client asks for extra work for free. Keep the boundary clear and offer structured options.',
    targetQuery: 'client asks for extra work for free reply',
  }),
  createBatchScenario({
    id: 'scn_out_of_scope_professionally',
    title: 'How to say that is out of scope professionally',
    slug: 'out-of-scope-professionally',
    metaTitle:
      'How to Say That Is Out of Scope Professionally | Flowdockr',
    metaDescription:
      'Use this scenario when you need to tell a client a request is out of scope. Keep the tone respectful, practical, and solution-oriented.',
    previewReply:
      'That request sits outside the scope we originally agreed, so I would treat it as a separate add-on rather than fold it into the current plan. If you want, I can map out the cleanest way to include it from here.',
    heroDescription:
      'Use this scenario when you need to tell a client a request is out of scope without making the message feel blunt. Get wording that is clear, respectful, and useful.',
    pagePromise:
      'Generate an out-of-scope reply that sets the boundary and gives the client a practical next step.',
    cluster: 'scope',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Can you add this to the original scope?',
    clientMessageVariants: [
      'Can you add this to the original scope?',
      'Can we fold this into the current project?',
    ],
    userSituation:
      'You need to draw a line without making the client feel shut down. The best reply is clear, respectful, and practical about next options.',
    searchIntentPrimary: 'how to say that is out of scope professionally',
    searchIntentSecondary: 'out of scope professionally reply',
    strategyPrimary:
      'State the boundary plainly and connect it back to the original agreement or deliverables.',
    strategySecondary:
      'Offer a change order, add-on, or later phase so the answer feels useful rather than blunt.',
    relatedScenarioSlugs: [
      'extra-work-outside-scope',
      'extra-work-for-free',
      'scope-creep-polite-response',
      'extra-page-request',
      'unlimited-revisions',
    ],
    toolPromptIntent:
      'Write a professional reply that says a request is out of scope. Keep the tone respectful, clear, and solution-oriented.',
    targetQuery: 'how to say that is out of scope professionally',
  }),
  createBatchScenario({
    id: 'scn_unclear_requirements',
    title: 'Client is unclear about requirements',
    slug: 'unclear-requirements',
    archetype: 'expectation_management',
    negotiationStage: 'early_inquiry',
    primaryClientMessage: "We're not fully sure what we need yet.",
    clientMessageVariants: [
      "We're not fully sure what we need yet.",
      'The details are still a bit loose on our side.',
    ],
    userSituation:
      'The client wants progress before the project is defined well enough to quote or execute. You need to guide them toward clarity without sounding difficult.',
    searchIntentPrimary: 'client unclear about requirements what to say',
    searchIntentSecondary: 'client unclear requirements reply',
    strategyPrimary:
      'Slow the project down just enough to get clarity on goals, scope, and decision-makers before committing.',
    strategySecondary:
      'Ask focused questions so the client feels guided rather than challenged.',
    toolPromptIntent:
      'Draft a reply when a client is unclear about requirements. Keep the tone helpful, ask clarifying questions, and create a clearer path forward.',
    targetQuery: 'client unclear about requirements what to say',
  }),
  createBatchScenario({
    id: 'scn_ask_for_clarification_politely',
    title: 'How to ask a client for clarification politely',
    slug: 'ask-for-clarification-politely',
    archetype: 'expectation_management',
    negotiationStage: 'early_inquiry',
    primaryClientMessage: 'Can you just work from what I sent?',
    clientMessageVariants: [
      'Can you just work from what I sent?',
      'I think the current notes should be enough to start.',
    ],
    userSituation:
      'You need better inputs before moving forward, but you do not want the client to feel questioned. The reply has to be clear, respectful, and easy to answer.',
    searchIntentPrimary:
      'how to ask client for clarification without sounding rude',
    searchIntentSecondary: 'ask client for clarification politely',
    strategyPrimary:
      'Explain briefly why the missing detail matters, then ask for the smallest set of specifics you need to move responsibly.',
    strategySecondary:
      'Use guided questions or options so the client can answer quickly without feeling put on the spot.',
    toolPromptIntent:
      'Write a polite clarification request for a client. Keep the tone professional, explain why the detail matters, and make the questions easy to answer.',
    targetQuery: 'how to ask client for clarification without sounding rude',
  }),
  createBatchScenario({
    id: 'scn_adding_small_requests',
    title: 'Client keeps adding small requests',
    slug: 'adding-small-requests',
    metaTitle:
      'Client Keeps Adding Small Requests? What to Say | Flowdockr',
    metaDescription:
      'Use this scenario when a client keeps adding small requests and the extras are starting to add up. Flag the scope impact early and redirect the conversation professionally.',
    previewReply:
      'I can see those requests are each small on their own, but together they are pushing beyond the scope we are working from. Rather than keep folding them in one by one, the cleaner move is to group the extras and decide how you want to handle them.',
    heroDescription:
      'Use this scenario when a client keeps adding small requests and the project is drifting by inches. Get a reply that names the pattern early without sounding dramatic.',
    pagePromise:
      'Generate a reply that handles small extra requests before they turn into silent scope creep.',
    cluster: 'scope',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Can you add these two small tweaks as well?',
    clientMessageVariants: [
      'Can you add these two small tweaks as well?',
      'This is small, but can we include it too?',
    ],
    userSituation:
      'Each request is framed as minor, but the total is adding up. You need a reply that protects the project from death by a thousand extras.',
    searchIntentPrimary: 'client keeps adding small requests what to do',
    searchIntentSecondary: 'client keeps adding small requests reply',
    strategyPrimary:
      'Name the pattern early and restate what the current scope includes before the extra requests pile up further.',
    strategySecondary:
      'Group the extras into a scoped add-on or later phase instead of reacting one request at a time.',
    relatedScenarioSlugs: [
      'extra-work-outside-scope',
      'scope-creep-polite-response',
      'extra-page-request',
      'extra-work-for-free',
      'changing-requirements-response',
    ],
    toolPromptIntent:
      'Draft a reply when a client keeps adding small requests. Keep the tone calm, flag the scope impact, and offer a structured way to handle the extras.',
    targetQuery: 'client keeps adding small requests what to do',
  }),
  createBatchScenario({
    id: 'scn_set_boundaries_politely',
    title: 'How to set boundaries with a client politely',
    slug: 'set-boundaries-politely',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'Can we keep this flexible and figure it out as we go?',
    clientMessageVariants: [
      'Can we just keep this flexible as we go?',
      'I would rather not be too rigid about the process here.',
    ],
    userSituation:
      'The client wants flexibility, but the project is starting to lose structure. You need to set boundaries without making the message feel stiff or confrontational.',
    searchIntentPrimary: 'how to set boundaries with a client politely',
    searchIntentSecondary: 'set boundaries with client politely',
    strategyPrimary:
      'Define the working boundary in simple language around scope, turnaround, revisions, or communication expectations.',
    strategySecondary:
      'Make the boundary sound like a quality and clarity tool, not a personal preference.',
    toolPromptIntent:
      'Write a polite boundary-setting reply for a client. Keep the tone professional, clear, and easy to agree to.',
    targetQuery: 'how to set boundaries with a client politely',
  }),
  createBatchScenario({
    id: 'scn_urgent_request_response',
    title: 'Client wants it done urgently',
    slug: 'urgent-request-response',
    archetype: 'expectation_management',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can you get this done urgently?',
    clientMessageVariants: [
      'Can you get this done urgently?',
      'We need this turned around as fast as possible.',
    ],
    userSituation:
      'The client is pushing urgency, but the reply still needs to protect realism and quality. You need to respond quickly without automatically accepting rush conditions.',
    searchIntentPrimary: 'client wants it done urgently how to respond',
    searchIntentSecondary: 'urgent client request response',
    strategyPrimary:
      'Acknowledge the urgency, then state what is realistically possible and what assumptions that timeline depends on.',
    strategySecondary:
      'If the client wants faster delivery, tie it to scope tradeoffs, sequencing, or a rush fee instead of vague overpromising.',
    toolPromptIntent:
      'Draft a professional reply when a client wants urgent delivery. Keep the tone calm, realistic, and clear about what is possible.',
    targetQuery: 'client wants it done urgently how to respond',
  }),
  createBatchScenario({
    id: 'scn_unrealistic_deadline_response',
    title: 'How to respond to an unrealistic deadline',
    slug: 'unrealistic-deadline-response',
    archetype: 'expectation_management',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can you deliver this by Friday?',
    clientMessageVariants: [
      'Can you deliver this by Friday?',
      'We need the whole thing finished by the end of the week.',
    ],
    userSituation:
      'The deadline does not fit the scope as currently defined. You need to protect feasibility without sounding unhelpful or slow.',
    searchIntentPrimary: 'how to respond to unrealistic deadline',
    searchIntentSecondary: 'unrealistic deadline client reply',
    strategyPrimary:
      'Say clearly what the timeline supports and what it does not, so the client can make a real tradeoff decision.',
    strategySecondary:
      'Offer a realistic date, a reduced scope, or phased delivery instead of a flat no with no path forward.',
    toolPromptIntent:
      'Write a professional reply to an unrealistic deadline request. Keep it firm, constructive, and grounded in what is realistically possible.',
    targetQuery: 'how to respond to unrealistic deadline',
  }),
  createBatchScenario({
    id: 'scn_faster_delivery_no_extra_pay',
    title: 'Client asks for faster delivery without extra pay',
    slug: 'faster-delivery-no-extra-pay',
    archetype: 'expectation_management',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Can you deliver faster without changing the price?',
    clientMessageVariants: [
      'Can you deliver faster without changing the price?',
      'We need a quicker turnaround, but the budget needs to stay the same.',
    ],
    userSituation:
      'The client wants speed but does not want to absorb the cost or tradeoff. You need to reset the expectation without creating unnecessary friction.',
    searchIntentPrimary: 'client asks for faster delivery without extra pay',
    searchIntentSecondary: 'faster delivery without extra pay reply',
    strategyPrimary:
      'Explain that faster delivery changes workload, sequencing, or availability, so it cannot be treated as a free upgrade.',
    strategySecondary:
      'Offer reduced scope, phased delivery, or rush pricing so the client can choose consciously.',
    toolPromptIntent:
      'Draft a reply when a client asks for faster delivery without extra pay. Keep the tone professional and explain the tradeoffs clearly.',
    targetQuery: 'client asks for faster delivery without extra pay',
  }),
  createBatchScenario({
    id: 'scn_need_more_time_response',
    title: 'How to say you need more time professionally',
    slug: 'need-more-time-response',
    archetype: 'expectation_management',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Can you still hit the original timeline?',
    clientMessageVariants: [
      'Can you still hit the original timeline?',
      'Are we still on track for the current deadline?',
    ],
    userSituation:
      'You now know the current timing is too tight for the quality promised. You need to reset expectations early and keep trust intact.',
    searchIntentPrimary: 'how to say you need more time professionally',
    searchIntentSecondary: 'need more time professionally client reply',
    strategyPrimary:
      'Tell the client as soon as possible, explain the impact clearly, and propose a realistic new date or sequence.',
    strategySecondary:
      'Focus on protecting quality and predictability rather than apologizing in circles.',
    toolPromptIntent:
      'Write a professional message explaining that you need more time. Keep it clear, accountable, and focused on a realistic next step.',
    targetQuery: 'how to say you need more time professionally',
  }),
  createBatchScenario({
    id: 'scn_client_rushing_you_response',
    title: 'Client is rushing you',
    slug: 'client-rushing-you-response',
    archetype: 'expectation_management',
    negotiationStage: 'in_project',
    primaryClientMessage: 'We need this sooner than planned.',
    clientMessageVariants: [
      'We need this sooner than planned.',
      'Can you speed this up from here?',
    ],
    userSituation:
      'The client is applying pressure mid-project and the pace is becoming unrealistic. You need to calm the timeline conversation down without sounding defensive.',
    searchIntentPrimary: 'client is rushing you what to say',
    searchIntentSecondary: 'client rushing you reply',
    strategyPrimary:
      'Acknowledge the urgency and restate the current timeline, dependencies, and what would need to change to accelerate it.',
    strategySecondary:
      'Keep the reply practical so the conversation shifts from pressure to clear choices.',
    toolPromptIntent:
      'Draft a professional reply when a client is rushing you. Keep the tone steady, realistic, and focused on concrete options.',
    targetQuery: 'client is rushing you what to say',
  }),
  createBatchScenario({
    id: 'scn_difficult_client_response',
    title: 'How to reply to a difficult client without escalating',
    slug: 'difficult-client-response',
    archetype: 'expectation_management',
    negotiationStage: 'in_project',
    primaryClientMessage: 'This whole process has been frustrating.',
    clientMessageVariants: [
      "I'm not happy with how this is going.",
      'This process has been frustrating on our side.',
    ],
    userSituation:
      'The relationship is tense and every message risks turning into an argument. You need to lower the temperature while still moving the work toward a clear next step.',
    searchIntentPrimary: 'how to respond to difficult client professionally',
    searchIntentSecondary: 'difficult client professional response',
    strategyPrimary:
      'Lower the emotional temperature and move the conversation back to facts, decisions, and next steps.',
    strategySecondary:
      'Set a professional tone without mirroring the client frustration or overexplaining yourself.',
    toolPromptIntent:
      'Write a professional reply for a difficult client. Keep the tone calm, respectful, and focused on moving the work forward.',
    targetQuery: 'how to respond to difficult client professionally',
  }),
  createBatchScenario({
    id: 'scn_rude_client_tone_response',
    title: 'Client tone is rude',
    slug: 'rude-client-tone-response',
    archetype: 'expectation_management',
    negotiationStage: 'in_project',
    primaryClientMessage: 'This is not good enough.',
    clientMessageVariants: [
      'This is not good enough.',
      'I do not know why this is taking so long.',
    ],
    userSituation:
      'The client message crosses into disrespectful territory and you need to reply without escalating it. The response needs to protect dignity and keep boundaries intact.',
    searchIntentPrimary: 'client tone is rude how to reply',
    searchIntentSecondary: 'rude client tone reply',
    strategyPrimary:
      'Respond to the substance of the issue in a calm tone and avoid mirroring the rudeness back.',
    strategySecondary:
      'If the tone continues, set a clear communication boundary so the project does not normalize disrespect.',
    toolPromptIntent:
      'Draft a composed reply when a client tone is rude. Keep the tone professional, address the issue, and protect your boundaries.',
    targetQuery: 'client tone is rude how to reply',
  }),
  createBatchScenario({
    id: 'scn_passive_aggressive_client_response',
    title: 'How to reply to a passive-aggressive client',
    slug: 'passive-aggressive-client-response',
    archetype: 'expectation_management',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Sure, if you ever get to it.',
    clientMessageVariants: [
      'Sure, if you ever get to it.',
      'I guess we will see if this actually happens on time.',
    ],
    userSituation:
      'The client is signaling frustration indirectly, which can be harder to answer cleanly than open criticism. You need to respond without taking the bait.',
    searchIntentPrimary: 'how to handle passive aggressive client',
    searchIntentSecondary: 'passive aggressive client response',
    strategyPrimary:
      'Stay literal and professional, then redirect the conversation toward facts, timing, and the next action.',
    strategySecondary:
      'Do not answer sarcasm with sarcasm. Reduce ambiguity and keep the exchange grounded in specifics.',
    toolPromptIntent:
      'Write a professional reply for a passive-aggressive client. Keep the tone calm, direct, and focused on practical next steps.',
    targetQuery: 'how to handle passive aggressive client',
  }),
  createBatchScenario({
    id: 'scn_unclear_feedback_response',
    title: 'How to respond to unclear client feedback',
    slug: 'unclear-feedback-response',
    archetype: 'expectation_management',
    negotiationStage: 'in_project',
    primaryClientMessage: "This isn't quite right.",
    clientMessageVariants: [
      "This isn't quite right.",
      'It still does not feel there yet.',
    ],
    userSituation:
      'The client is unhappy, but the feedback is too vague to act on well. You need to get to specifics without sounding defensive or burdensome.',
    searchIntentPrimary: 'how to respond to unclear feedback from client',
    searchIntentSecondary: 'unclear client feedback response',
    strategyPrimary:
      'Turn vague reactions into specific asks, examples, or acceptance criteria that you can actually work from.',
    strategySecondary:
      'Summarize your current interpretation and ask the client to confirm or correct it so the loop tightens quickly.',
    toolPromptIntent:
      'Draft a reply to unclear client feedback. Keep the tone collaborative, ask for specifics, and make it easy for the client to clarify.',
    targetQuery: 'how to respond to unclear feedback from client',
  }),
  createBatchScenario({
    id: 'scn_client_contradicts_themselves',
    title: 'Client contradicts themselves',
    slug: 'client-contradicts-themselves',
    archetype: 'expectation_management',
    negotiationStage: 'in_project',
    primaryClientMessage:
      "Actually, let's do the opposite of what I said earlier.",
    clientMessageVariants: [
      "Actually, let's do the opposite of what I said earlier.",
      'I know I asked for that before, but now I want the reverse.',
    ],
    userSituation:
      'The client direction is conflicting and the project will keep looping unless you surface it clearly. You need a reply that resets the decision without sounding accusatory.',
    searchIntentPrimary: 'client contradicts themselves what to say',
    searchIntentSecondary: 'client contradicts themselves reply',
    strategyPrimary:
      'Surface the conflicting direction clearly and ask the client to choose which version should govern the work.',
    strategySecondary:
      'Document the decision in simple language so the project can move forward without another loop.',
    toolPromptIntent:
      'Write a professional reply when a client contradicts themselves. Keep the tone neutral, summarize the conflict clearly, and ask for a concrete decision.',
    targetQuery: 'client contradicts themselves what to say',
  }),
  createBatchScenario({
    id: 'scn_delayed_payment_follow_up',
    title: 'Client delayed payment',
    slug: 'delayed-payment-follow-up',
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Finance is still processing the payment.',
    clientMessageVariants: [
      'Finance is still processing the payment.',
      'There is a delay on our side with the invoice.',
    ],
    userSituation:
      'Payment keeps slipping and you need to follow up clearly without sounding apologetic. The reply has to stay polite while protecting the commercial boundary.',
    searchIntentPrimary: 'client delayed payment how to follow up',
    searchIntentSecondary: 'delayed payment client follow up',
    strategyPrimary:
      'Ask for a concrete payment date and restate the invoice status plainly so there is no ambiguity.',
    strategySecondary:
      'If the delay continues, connect further work, handoff, or next milestones to payment being completed.',
    toolPromptIntent:
      'Draft a follow-up for delayed client payment. Keep the tone professional, direct, and clear about the next payment step.',
    targetQuery: 'client delayed payment how to follow up',
  }),
  createBatchScenario({
    id: 'scn_ask_for_payment_politely',
    title: 'How to ask a client for payment politely',
    slug: 'ask-for-payment-politely',
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Thanks, we received the final files.',
    clientMessageVariants: [
      'Thanks, we received the final files.',
      'Everything looks good on our side.',
    ],
    userSituation:
      'The work is delivered and you need to ask for payment without sounding awkward. The best message is simple, direct, and invoice-focused.',
    searchIntentPrimary: 'how to ask client for payment politely',
    searchIntentSecondary: 'ask client for payment politely',
    strategyPrimary:
      'Keep the request brief and attach it to the invoice, due date, or agreed payment step rather than emotional language.',
    strategySecondary:
      'Use clear next-step wording so the client knows exactly what action is needed.',
    toolPromptIntent:
      'Write a polite payment request for a client. Keep it clear, professional, and tied to the agreed invoice or payment terms.',
    targetQuery: 'how to ask client for payment politely',
  }),
  createBatchScenario({
    id: 'scn_free_sample_request_response',
    title: 'How to respond when a client asks for a free sample',
    slug: 'free-sample-request-response',
    archetype: 'payment_protection',
    negotiationStage: 'pre_kickoff',
    primaryClientMessage: 'Can you do a free sample first?',
    clientMessageVariants: [
      'Can you do a free sample first?',
      'Could you show us a quick sample before we commit?',
    ],
    userSituation:
      'The client wants proof before buying, but the request crosses into unpaid production work. You need to protect the line between trust-building and free labor.',
    searchIntentPrimary: 'how to respond to client asking for free sample',
    searchIntentSecondary: 'client asks for free sample reply',
    strategyPrimary:
      'Protect the boundary between proof of fit and unpaid production work.',
    strategySecondary:
      'Offer portfolio, case studies, references, or a paid test instead of giving away custom work for free.',
    toolPromptIntent:
      'Draft a professional reply when a client asks for a free sample. Keep the tone respectful, protect the boundary, and offer better alternatives.',
    targetQuery: 'how to respond to client asking for free sample',
  }),
  createBatchScenario({
    id: 'scn_unlimited_revisions_response',
    title: 'How to respond when a client asks for unlimited revisions',
    slug: 'unlimited-revisions-response',
    archetype: 'scope_control',
    negotiationStage: 'contract_terms',
    primaryClientMessage: "We'd want unlimited revisions included.",
    clientMessageVariants: [
      "We'd want unlimited revisions included.",
      'Can we make revisions unlimited on this?',
    ],
    userSituation:
      'The client wants open-ended revision access and you need to answer without sounding rigid. The reply should make the boundary feel reasonable and professional.',
    searchIntentPrimary: 'client asks for unlimited revisions what to say',
    searchIntentSecondary: 'unlimited revisions client reply',
    strategyPrimary:
      'Set a revision boundary tied to decision-making, timeline, and scope rather than preference alone.',
    strategySecondary:
      'If they need more revision room, convert it into a paid revision or support structure.',
    toolPromptIntent:
      'Write a clear reply when a client asks for unlimited revisions. Keep the tone professional, explain the boundary, and offer a structured alternative if needed.',
    targetQuery: 'client asks for unlimited revisions what to say',
  }),
  createBatchScenario({
    id: 'scn_competitor_comparison_response',
    title: 'How to reply when a client compares you to another freelancer',
    slug: 'competitor-comparison-response',
    archetype: 'price_comparison',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'Another freelancer says they can do this a different way.',
    clientMessageVariants: [
      'Another provider says they can handle this differently.',
      'We are comparing your approach with another freelancer.',
    ],
    userSituation:
      'The client is comparing approaches and looking for a reason to choose one provider over another. You need to differentiate clearly without sounding defensive.',
    searchIntentPrimary:
      'how to respond when client compares you to competitor',
    searchIntentSecondary: 'client compares you to competitor reply',
    strategyPrimary:
      'Acknowledge the comparison calmly and focus on differences in scope, process, reliability, or outcome.',
    strategySecondary:
      'Keep the conversation on fit and tradeoffs instead of trying to win by attacking the competitor.',
    toolPromptIntent:
      'Draft a confident reply when a client compares you to a competitor. Keep the tone professional and explain the difference in fit, scope, or approach.',
    targetQuery: 'how to respond when client compares you to competitor',
  }),
  createBatchScenario({
    id: 'scn_too_expensive_but_good',
    title: 'Client says your work is too expensive but good',
    slug: 'too-expensive-but-good',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage:
      'Your work looks great, but it is too expensive for us.',
    clientMessageVariants: [
      'Your work looks great, but it is too expensive for us.',
      'We like the quality, but the price is hard to justify on our side.',
    ],
    userSituation:
      'The client is validating the quality while still resisting the price. You need to keep the compliment from turning into pressure to undercut yourself.',
    searchIntentPrimary: 'client says your work is too expensive but good',
    searchIntentSecondary: 'too expensive but good client reply',
    strategyPrimary:
      'Acknowledge the positive signal, then bring the conversation back to scope, outcomes, and the real budget constraint.',
    strategySecondary:
      'If the gap is real, adjust the shape of the project rather than discounting the same work because the client likes it.',
    toolPromptIntent:
      'Write a professional reply when a client says your work is good but too expensive. Keep the tone confident and guide the discussion toward a real decision path.',
    targetQuery: 'client says your work is too expensive but good',
  }),
  createBatchScenario({
    id: 'scn_trial_project_reply',
    title: 'How to reply when a client wants a trial project',
    slug: 'trial-project-reply',
    archetype: 'contract_terms',
    negotiationStage: 'pre_kickoff',
    primaryClientMessage: 'Can we start with a small trial project?',
    clientMessageVariants: [
      'Can we start with a small trial project?',
      'Would you be open to doing a trial before the full engagement?',
    ],
    userSituation:
      'A trial project can be a useful step, but only if it is scoped and paid properly. You need to make the trial safe without turning it into open-ended proving work.',
    searchIntentPrimary: 'how to reply when client wants a trial project',
    searchIntentSecondary: 'client wants a trial project reply',
    strategyPrimary:
      'Define the trial as a paid, limited engagement with clear goals, deliverables, and success criteria.',
    strategySecondary:
      'Avoid vague trial language that creates unpaid or underpriced proof work with no end point.',
    toolPromptIntent:
      'Draft a professional reply when a client wants a trial project. Keep the tone open, but define the trial as a paid and limited engagement.',
    targetQuery: 'how to reply when client wants a trial project',
  }),
  createBatchScenario({
    id: 'scn_portfolio_before_payment',
    title: 'Client asks for portfolio before paying',
    slug: 'portfolio-before-payment',
    archetype: 'payment_protection',
    negotiationStage: 'pre_kickoff',
    primaryClientMessage:
      'Can you show more portfolio examples before we pay the deposit?',
    clientMessageVariants: [
      'Can you show more portfolio examples before we pay the deposit?',
      'We want to see more proof before sending payment.',
    ],
    userSituation:
      'The client wants more reassurance before paying, but the deal is already at the commitment stage. You need to answer the trust question without sliding into unpaid custom work or a weak payment boundary.',
    searchIntentPrimary: 'client asks for portfolio before paying reply',
    searchIntentSecondary: 'portfolio before payment client reply',
    strategyPrimary:
      'Answer the trust question with relevant proof, but keep the payment step and project start clearly tied together.',
    strategySecondary:
      'Offer case studies, references, or a short call instead of doing more unpaid custom work before deposit.',
    toolPromptIntent:
      'Write a professional reply when a client asks for more portfolio proof before paying. Keep the tone reassuring and preserve the payment boundary.',
    targetQuery: 'client asks for portfolio before paying reply',
  }),
  createBatchScenario({
    id: 'scn_discount_after_delivery',
    title: 'Client asks for a discount after delivery',
    slug: 'discount-after-delivery',
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'Now that the work is delivered, can you reduce the price?',
    clientMessageVariants: [
      'Now that the work is delivered, can you reduce the price?',
      'Would you be open to discounting the final invoice now that everything is done?',
    ],
    userSituation:
      'The work is already completed and the client is trying to renegotiate after receiving the value. You need to hold the agreed price without turning the exchange hostile.',
    searchIntentPrimary:
      'how to respond to client asking for discount after delivery',
    searchIntentSecondary: 'discount after delivery client reply',
    strategyPrimary:
      'Treat the agreed price as settled unless there is a specific issue with the work that needs to be addressed directly.',
    strategySecondary:
      'If the client raises a real concern, solve that concern instead of granting a retroactive discount by default.',
    toolPromptIntent:
      'Draft a firm but professional reply when a client asks for a discount after delivery. Keep the tone calm and protect the original agreement.',
    targetQuery: 'how to respond to client asking for discount after delivery',
  }),
  createBatchScenario({
    id: 'scn_experience_question_response',
    title: 'How to answer when a client asks about your experience',
    slug: 'experience-question-response',
    archetype: 'expectation_management',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Have you done this kind of project before?',
    clientMessageVariants: [
      'How much experience do you have with this exactly?',
      'Have you done this kind of project enough times before?',
    ],
    userSituation:
      'The client wants reassurance that you can actually deliver. You need to answer with proof and calm confidence, not a defensive resume dump.',
    searchIntentPrimary: 'client questions your experience what to say',
    searchIntentSecondary: 'client questions your experience reply',
    strategyPrimary:
      'Answer directly with relevant proof, examples, or process signals instead of a long defensive biography.',
    strategySecondary:
      'Shift the conversation toward similar outcomes, judgment, and fit for this project rather than status alone.',
    toolPromptIntent:
      'Write a confident reply when a client questions your experience. Keep the tone calm, evidence-based, and relevant to the project at hand.',
    targetQuery: 'client questions your experience what to say',
  }),
  createBatchScenario({
    id: 'scn_boundaries_not_respected',
    title: 'Client does not respect boundaries',
    slug: 'boundaries-not-respected',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'Can you just keep making changes until it feels right?',
    clientMessageVariants: [
      'Can you just keep making changes until it feels right?',
      'Can you be flexible on this one again?',
    ],
    userSituation:
      'The client keeps pushing past agreed lines around scope, time, or communication. You need to reset the working boundary before the project becomes unmanageable.',
    searchIntentPrimary:
      'how to reply to client who does not respect boundaries',
    searchIntentSecondary: 'client does not respect boundaries reply',
    strategyPrimary:
      'Restate the working boundary clearly and explain what happens if the project moves beyond it.',
    strategySecondary:
      'Keep the tone calm, but make the cost of boundary-crossing explicit so the pattern does not continue by default.',
    toolPromptIntent:
      'Draft a professional reply when a client does not respect boundaries. Keep the tone steady, clarify the limit, and explain the next step clearly.',
    targetQuery: 'how to reply to client who does not respect boundaries',
  }),
  createBatchScenario({
    id: 'scn_pause_project_response',
    title: 'Client wants to pause the project',
    slug: 'pause-project-response',
    archetype: 'contract_terms',
    negotiationStage: 'in_project',
    primaryClientMessage: 'We need to pause the project for now.',
    clientMessageVariants: [
      'We need to pause the project for now.',
      'Can we put this on hold until next month?',
    ],
    userSituation:
      'The client wants to stop momentum mid-project, and a vague pause can create scheduling and scope problems later. You need to respond in a way that protects timeline, availability, and restart terms.',
    searchIntentPrimary: 'client wants to pause project what to say',
    searchIntentSecondary: 'pause project client reply',
    strategyPrimary:
      'Clarify what the pause changes around timeline, availability, outstanding work, and any active commitments.',
    strategySecondary:
      'Confirm restart conditions in writing so the project does not drift into an undefined holding pattern.',
    toolPromptIntent:
      'Write a professional reply when a client wants to pause a project. Keep the tone flexible, but define the pause terms and restart path clearly.',
    targetQuery: 'client wants to pause project what to say',
  }),
];
