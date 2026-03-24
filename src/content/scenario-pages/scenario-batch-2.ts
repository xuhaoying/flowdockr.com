import type { CanonicalScenario } from '@/types/scenario-catalog';

type BatchScenarioInput = Omit<
  CanonicalScenario,
  'sourceType' | 'sourceNote' | 'status' | 'priority' | 'isSeed'
> & {
  targetQuery: string;
  priority?: CanonicalScenario['priority'];
};

function createBatchTwoScenario({
  targetQuery,
  priority = 'p0',
  ...scenario
}: BatchScenarioInput): CanonicalScenario {
  return {
    ...scenario,
    sourceType: 'synthesized',
    sourceNote: `Batch 2 cluster expansion targeting "${targetQuery}".`,
    status: 'ready',
    priority,
    isSeed: true,
  };
}

export const canonicalScenarioBatchTwo: CanonicalScenario[] = [
  createBatchTwoScenario({
    id: 'scn_best_price_request',
    title: 'Client asks for your best price',
    slug: 'best-price-request',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: "What's your best price on this?",
    clientMessageVariants: [
      "What's your best price on this?",
      'Can you give us your best price?',
    ],
    userSituation:
      'The client wants a last-number concession without changing the scope. You need to protect the rate without sounding stiff or evasive.',
    searchIntentPrimary: 'client asks for your best price',
    searchIntentSecondary: 'what is your best price client reply',
    strategyPrimary:
      'Do not negotiate against yourself. Clarify what constraint they are trying to solve before offering any movement.',
    strategySecondary:
      'If you do move, tie it to scope, timing, or commitment so the concession has structure.',
    toolPromptIntent:
      'Draft a confident reply when a client asks for your best price. Keep the tone professional, avoid a free concession, and guide the conversation toward concrete tradeoffs.',
    targetQuery: 'client asks for your best price',
  }),
  createBatchTwoScenario({
    id: 'scn_meet_their_budget',
    title: 'Client asks if you can meet their budget',
    slug: 'meet-their-budget',
    metaTitle:
      'Can You Meet Their Budget Without Undercutting the Scope? | Flowdockr',
    metaDescription:
      'Use this scenario when a client gives you a real budget cap and asks if you can make it work. Draft a reply that protects your pricing logic and offers a scoped alternative instead of squeezing the same work into a smaller fee.',
    previewReply:
      'Thanks for sharing the budget. If that number is fixed, the cleanest way to make it work would be to adjust scope, timing, or phasing rather than squeeze the same deliverables into a smaller fee. If helpful, I can outline the version I would recommend at that level.',
    heroDescription:
      'Use this scenario when a client gives you a real budget cap that sits below your quote and wants to know whether you can make it work. Get a constructive reply that protects the logic of the original proposal.',
    pagePromise:
      'Generate a budget-cap reply that offers a workable scope path without turning the same project into a cheaper one.',
    cluster: 'pricing',
    intentTier: 'core',
    valueIntent: 'money',
    commercialPriority: 'high',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage: 'Our budget is $2,000. Can you make it work?',
    clientMessageVariants: [
      'Our budget is $2,000. Can you make it work?',
      'This is our cap. Is there a way to fit within it?',
    ],
    userSituation:
      'The client finally gives a real budget number, but it sits below your quote. You need to respond without compressing the same work into a smaller fee.',
    searchIntentPrimary: 'client asks can you meet our budget',
    searchIntentSecondary: 'can you make it work within our budget reply',
    strategyPrimary:
      'Treat the budget as a planning constraint, not an automatic reason to cut the same scope.',
    strategySecondary:
      'Offer a leaner version, phased rollout, or smaller first step if there is still a workable deal.',
    similarScenarioSlugs: [
      'out-of-budget-but-interested',
      'quote-too-high',
    ],
    nextStepScenarioSlugs: [
      'same-scope-lower-price',
      'lower-rate-after-proposal',
      'discount-request',
    ],
    relatedScenarioSlugs: [
      'out-of-budget-but-interested',
      'quote-too-high',
      'same-scope-lower-price',
      'lower-rate-after-proposal',
      'discount-request',
    ],
    toolPromptIntent:
      'Write a professional reply when a client asks if you can meet their budget. Keep the tone constructive and protect your pricing logic.',
    targetQuery: 'client asks can you meet our budget',
  }),
  createBatchTwoScenario({
    id: 'scn_price_flexible_request',
    title: 'Client asks if your price is flexible',
    slug: 'price-flexible-request',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: 'Is your price flexible at all?',
    clientMessageVariants: [
      'Is your price flexible at all?',
      'Do you have any flexibility on the rate?',
    ],
    userSituation:
      'The client is probing for flexibility before committing to the number. You need to answer clearly without training them to think the price is arbitrary.',
    searchIntentPrimary: 'client asks if your price is flexible',
    searchIntentSecondary: 'is your price flexible client reply',
    strategyPrimary:
      'Answer directly and explain where flexibility exists, if any, around scope, timing, or package structure.',
    strategySecondary:
      'Keep the base pricing logic intact so the client does not assume every quote is a starting point for discounts.',
    toolPromptIntent:
      'Draft a concise reply when a client asks if your price is flexible. Keep the tone calm and explain how you handle flexibility without sounding robotic.',
    targetQuery: 'client asks if your price is flexible',
  }),
  createBatchTwoScenario({
    id: 'scn_same_scope_lower_budget',
    title: 'Client wants the same scope for a lower budget',
    slug: 'same-scope-lower-budget',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'Can we keep everything the same and bring the price down?',
    clientMessageVariants: [
      'Can we keep everything the same and bring the price down?',
      'We want the full scope, just at a lower budget.',
    ],
    userSituation:
      'The client wants the full project but not the full fee. You need to push back on the mismatch without making the reply adversarial.',
    searchIntentPrimary: 'client wants same scope for lower budget',
    searchIntentSecondary: 'same scope lower budget client reply',
    strategyPrimary:
      'Name the mismatch clearly and explain that the current price reflects the current scope.',
    strategySecondary:
      'If the budget must change, make the client choose what gets reduced, delayed, or moved into a later phase.',
    toolPromptIntent:
      'Write a firm but professional reply when a client wants the same scope for a lower budget. Keep the boundary clear and offer structured alternatives.',
    targetQuery: 'client wants same scope for lower budget',
  }),
  createBatchTwoScenario({
    id: 'scn_approved_budget_lower_than_quote',
    title: 'Client says the approved budget is lower than your quote',
    slug: 'approved-budget-lower-than-quote',
    archetype: 'pricing_objection',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      'Finance approved less than your quote. Can you work with that?',
    clientMessageVariants: [
      'Finance approved less than your quote. Can you work with that?',
      'The approved budget came in lower than expected on our side.',
    ],
    userSituation:
      'The client says the internal budget approval came back below your price. You need to protect the quote while still giving them a path forward if the opportunity is real.',
    searchIntentPrimary: 'approved budget lower than your quote client reply',
    searchIntentSecondary: 'finance approved less than quote response',
    strategyPrimary:
      'Treat this as a budget-approval problem, not a reason to weaken the quoted scope by default.',
    strategySecondary:
      'Offer a revised version only if the client is ready to change scope, timing, or phasing to match the approved number.',
    toolPromptIntent:
      'Draft a professional reply when a client says the approved budget is lower than your quote. Keep the tone collaborative and protect the integrity of the proposal.',
    targetQuery: 'approved budget lower than your quote client reply',
  }),
  createBatchTwoScenario({
    id: 'scn_lower_rate_counteroffer',
    title: 'Client sends a lower counteroffer on your rate',
    slug: 'lower-rate-counteroffer',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'We can do $75/hour instead of $100/hour. Does that work?',
    clientMessageVariants: [
      'We can do $75/hour instead of $100/hour. Does that work?',
      'Our counteroffer would be a lower rate than what you proposed.',
    ],
    userSituation:
      'The client is no longer hinting. They have put a lower number on the table and want you to react to it. You need to respond without getting pulled into reactive bargaining.',
    searchIntentPrimary: 'client counteroffers your rate how to respond',
    searchIntentSecondary: 'lower rate counteroffer client reply',
    strategyPrimary:
      'Do not accept or reject too quickly. Re-anchor around what the original rate covers and whether the counteroffer changes the engagement.',
    strategySecondary:
      'If you explore middle ground, define what changes in scope, availability, or billing model would make it workable.',
    toolPromptIntent:
      'Write a steady reply when a client sends a lower counteroffer on your rate. Keep the tone professional and avoid reactive price bargaining.',
    targetQuery: 'client counteroffers your rate how to respond',
  }),
  createBatchTwoScenario({
    id: 'scn_final_price_before_signing',
    title: 'Client asks for your final price before signing',
    slug: 'final-price-before-signing',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage: "If we move ahead today, what's your final price?",
    clientMessageVariants: [
      "If we move ahead today, what's your final price?",
      'What is the final number if we sign this now?',
    ],
    userSituation:
      'The client is close to signing and wants one last price squeeze before they commit. You need to protect margin without derailing the close.',
    searchIntentPrimary: 'client asks for final price before signing',
    searchIntentSecondary: 'final price before signing client reply',
    strategyPrimary:
      'Hold the original quote unless there is a real tradeoff tied to commitment speed, scope, or terms.',
    strategySecondary:
      'If you offer anything, make it deliberate and conditional rather than a last-minute concession under pressure.',
    toolPromptIntent:
      'Draft a confident reply when a client asks for your final price before signing. Keep the deal moving without training the client to expect a last-minute discount.',
    targetQuery: 'client asks for final price before signing',
  }),
  createBatchTwoScenario({
    id: 'scn_silent_after_discovery_call',
    title: 'Client went silent after the discovery call',
    slug: 'silent-after-discovery-call',
    metaTitle:
      'Client Went Silent After the Discovery Call | Flowdockr',
    metaDescription:
      'Use this scenario when a client went silent after the discovery call. Send a useful follow-up that references the conversation and makes the next step easy.',
    previewReply:
      'Hi [Name] — thanks again for the call. Based on what we discussed, I wanted to check whether there is anything you need from me to help you decide on next steps, or if timing shifted on your side.',
    heroDescription:
      'Use this scenario when the discovery call felt promising but the client disappeared right after. Get a follow-up you can send that feels grounded in the conversation, not generic.',
    pagePromise:
      'Generate a discovery-call follow-up that restarts the conversation without sounding needy.',
    cluster: 'ghosting',
    intentTier: 'supporting',
    valueIntent: 'followup',
    commercialPriority: 'medium',
    archetype: 'follow_up',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      "Thanks for the call. We'll talk internally and get back to you.",
    clientMessageVariants: [
      "Thanks for the call. We'll talk internally and get back to you.",
      'This was helpful. Let us review and follow up.',
    ],
    userSituation:
      'The discovery call went well enough to keep the opportunity alive, but the client disappeared right after. You need a follow-up that feels useful, not needy.',
    searchIntentPrimary: 'client went silent after discovery call',
    searchIntentSecondary: 'follow up after discovery call no response',
    strategyPrimary:
      'Reference the call briefly and give the client a simple next step instead of a vague check-in.',
    strategySecondary:
      'Keep the tone light so the message feels like a helpful nudge, not pressure.',
    similarScenarioSlugs: [
      'no-response-after-rate',
      'after-client-ghosted',
    ],
    nextStepScenarioSlugs: [
      'client-no-response-follow-up',
      'no-response-after-proposal',
      'reviewing-internally-no-response',
    ],
    relatedScenarioSlugs: [
      'no-response-after-rate',
      'after-client-ghosted',
      'client-no-response-follow-up',
      'no-response-after-proposal',
      'reviewing-internally-no-response',
    ],
    toolPromptIntent:
      'Write a short follow-up when a client goes silent after the discovery call. Keep it professional, low-pressure, and easy to answer.',
    targetQuery: 'client went silent after discovery call',
  }),
  createBatchTwoScenario({
    id: 'scn_no_response_after_proposal_email',
    title: 'Client is not responding after your proposal email',
    slug: 'no-response-after-proposal-email',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'Thanks, we received the proposal.',
    clientMessageVariants: [
      'Thanks, we received the proposal.',
      'We got the proposal and will review it shortly.',
    ],
    userSituation:
      'You sent the proposal, got a quick acknowledgment, and then the thread went cold. You need to reopen the conversation without sounding like you are chasing.',
    searchIntentPrimary: 'client not responding after proposal email',
    searchIntentSecondary: 'no response after sending proposal email',
    strategyPrimary:
      'Reference the proposal directly and make it easy for the client to tell you whether the blocker is timing, budget, or fit.',
    strategySecondary:
      'Keep the follow-up short so it feels like a clean prompt to decide, not a long sales email.',
    toolPromptIntent:
      'Draft a follow-up when a client does not respond after your proposal email. Keep the tone clear, professional, and easy to reply to.',
    targetQuery: 'client not responding after proposal email',
  }),
  createBatchTwoScenario({
    id: 'scn_reviewing_internally_no_response',
    title: 'Client said they were reviewing internally and disappeared',
    slug: 'reviewing-internally-no-response',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      "We're reviewing this internally and will come back to you.",
    clientMessageVariants: [
      "We're reviewing this internally and will come back to you.",
      'Let us review this with the team and get back to you.',
    ],
    userSituation:
      'The client gave you a plausible reason for the delay, but the internal review has stretched into silence. You need to follow up without sounding impatient.',
    searchIntentPrimary: 'client reviewing internally no response',
    searchIntentSecondary: 'reviewing internally and disappeared client',
    strategyPrimary:
      'Acknowledge that internal review can take time, then ask a focused question that helps the client close the loop.',
    strategySecondary:
      'Offer a clear yes, no, or timing update path so the client does not need to write a long explanation.',
    toolPromptIntent:
      'Write a professional follow-up when a client says they are reviewing internally and then disappears. Keep it polite and easy to answer.',
    targetQuery: 'client reviewing internally no response',
  }),
  createBatchTwoScenario({
    id: 'scn_no_response_after_contract_sent',
    title: 'Client stopped replying after you sent the contract',
    slug: 'no-response-after-contract-sent',
    archetype: 'follow_up',
    negotiationStage: 'contract_terms',
    primaryClientMessage: "Looks good. Send the contract over and we'll sign.",
    clientMessageVariants: [
      "Looks good. Send the contract over and we'll sign.",
      "Please send the contract and we'll take care of it.",
    ],
    userSituation:
      'The deal felt close, you sent the contract, and then the client vanished. You need a follow-up that reopens the signing step without sounding anxious.',
    searchIntentPrimary: 'client not responding after sending contract',
    searchIntentSecondary: 'no response after contract sent client',
    strategyPrimary:
      'Reference the contract step directly and make it easy for the client to tell you whether the delay is legal review, timing, or hesitation.',
    strategySecondary:
      'Keep the message focused on the next action instead of replaying the whole deal.',
    toolPromptIntent:
      'Draft a follow-up when a client stops replying after you send the contract. Keep the tone calm, professional, and focused on closing the loop.',
    targetQuery: 'client not responding after sending contract',
  }),
  createBatchTwoScenario({
    id: 'scn_check_back_next_month_no_response',
    title: 'Client said check back next month and went quiet',
    slug: 'check-back-next-month-no-response',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      "This isn't the right time. Check back with us next month.",
    clientMessageVariants: [
      "This isn't the right time. Check back with us next month.",
      'Reach out again next month and we can revisit it then.',
    ],
    userSituation:
      'The client pushed the conversation out, but when the time came there was still no response. You need a follow-up that feels natural instead of awkwardly reviving an old thread.',
    searchIntentPrimary: 'client said check back next month no response',
    searchIntentSecondary: 'check back next month client follow up',
    strategyPrimary:
      'Reference their original timing so the follow-up feels expected and grounded in their own request.',
    strategySecondary:
      'Keep the message brief and forward-looking so it invites a clean yes, no, or later date.',
    toolPromptIntent:
      'Write a follow-up when a client said check back next month and then went quiet. Keep it professional and low-pressure.',
    targetQuery: 'client said check back next month no response',
  }),
  createBatchTwoScenario({
    id: 'scn_interested_then_disappeared',
    title: 'Interested client stopped replying',
    slug: 'interested-then-disappeared',
    archetype: 'follow_up',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      "We're definitely interested. Let us discuss and come back to you.",
    clientMessageVariants: [
      "We're definitely interested. Let us discuss and come back to you.",
      'This looks promising. We just need to talk internally first.',
    ],
    userSituation:
      'The client showed clear interest, which makes the silence more confusing. You need a follow-up that moves the decision forward without sounding entitled to a reply.',
    searchIntentPrimary: 'interested client stopped replying',
    searchIntentSecondary: 'client was interested then disappeared',
    strategyPrimary:
      'Acknowledge the prior interest and invite a simple update on whether timing, budget, or priorities changed.',
    strategySecondary:
      'Make the reply easy by giving the client a few clear paths instead of a vague open question.',
    toolPromptIntent:
      'Draft a follow-up when an interested client stops replying. Keep the tone professional, clear, and easy to answer.',
    targetQuery: 'interested client stopped replying',
  }),
  createBatchTwoScenario({
    id: 'scn_silent_after_pricing_call',
    title: 'Client went quiet after the pricing call',
    slug: 'silent-after-pricing-call',
    archetype: 'follow_up',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      "Thanks for walking us through the pricing. We'll review and follow up.",
    clientMessageVariants: [
      "Thanks for walking us through the pricing. We'll review and follow up.",
      'Appreciate the pricing call. Let us discuss and get back to you.',
    ],
    userSituation:
      'You already talked through the price live, but the client disappeared after the call. You need a follow-up that feels grounded in the conversation rather than generic.',
    searchIntentPrimary: 'client went quiet after pricing call',
    searchIntentSecondary: 'follow up after pricing call no response',
    strategyPrimary:
      'Reference the pricing discussion directly and ask whether the blocker is budget, scope, or timing.',
    strategySecondary:
      'Keep the follow-up specific enough to reopen the deal without overexplaining.',
    toolPromptIntent:
      'Write a follow-up when a client goes quiet after the pricing call. Keep the tone calm, direct, and easy to respond to.',
    targetQuery: 'client went quiet after pricing call',
  }),
  createBatchTwoScenario({
    id: 'scn_unpaid_invoice_follow_up',
    title: 'How to follow up on an unpaid invoice',
    slug: 'unpaid-invoice-follow-up',
    metaTitle:
      'How to Follow Up on an Unpaid Invoice Before Escalating | Flowdockr',
    metaDescription:
      'Use this scenario when an invoice is unpaid and you want a professional follow-up before the reminders turn more forceful. Ask for a concrete payment date without sounding apologetic or vague.',
    previewReply:
      'Hi [Name] — following up on invoice [number], which is still open on my side. Could you let me know the payment date, or whether there is anything blocking processing there that I should account for?',
    heroDescription:
      'Use this scenario when an invoice is still unpaid and you want an early, professional follow-up before the tone needs to get firmer. Get wording you can adapt and send without sounding awkward or overly soft.',
    pagePromise:
      'Generate an early unpaid-invoice follow-up that asks for a date and keeps the tone steady.',
    cluster: 'payment',
    intentTier: 'supporting',
    valueIntent: 'money',
    commercialPriority: 'medium',
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage: "We haven't processed the invoice yet.",
    clientMessageVariants: [
      "We haven't processed the invoice yet.",
      'The invoice is still pending on our side.',
    ],
    userSituation:
      'The invoice is outstanding and you need to follow up without sounding apologetic or vague. The goal is to get a clear payment update and next step.',
    searchIntentPrimary: 'how to follow up on unpaid invoice',
    searchIntentSecondary: 'unpaid invoice follow up to client',
    strategyPrimary:
      'Keep the message focused on the invoice status, due date, and requested payment timing.',
    strategySecondary:
      'Ask for a concrete date so the follow-up creates accountability instead of another soft promise.',
    similarScenarioSlugs: [
      'ask-for-payment-politely',
      'payment-overdue-reminder',
    ],
    nextStepScenarioSlugs: [
      'second-payment-reminder',
      'final-payment-reminder',
      'overdue-invoice-no-response',
    ],
    relatedScenarioSlugs: [
      'ask-for-payment-politely',
      'payment-overdue-reminder',
      'second-payment-reminder',
      'final-payment-reminder',
      'overdue-invoice-no-response',
    ],
    toolPromptIntent:
      'Draft a professional unpaid-invoice follow-up. Keep the tone direct, polite, and clear about the payment step needed.',
    targetQuery: 'how to follow up on unpaid invoice',
  }),
  createBatchTwoScenario({
    id: 'scn_payment_overdue_reminder',
    title: 'Client payment is overdue',
    slug: 'payment-overdue-reminder',
    metaTitle:
      'First Overdue Payment Reminder After the Due Date | Flowdockr',
    metaDescription:
      'Use this scenario when the due date has passed and you need your first firmer overdue-payment reminder. Ask for a specific payment date clearly, without jumping straight to a final notice.',
    previewReply:
      'Hi [Name] — invoice [number] is now past due, so I wanted to follow up directly on the payment date. Please let me know when I should expect it, or whether there is a blocker I should account for on my side.',
    heroDescription:
      'Use this scenario when the due date has passed and you need the first overdue reminder to sound firmer than a casual nudge, but not yet like a final warning. Get a message you can send right away.',
    pagePromise:
      'Generate a first overdue-payment reminder that raises urgency without over-escalating.',
    cluster: 'payment',
    intentTier: 'supporting',
    valueIntent: 'money',
    commercialPriority: 'medium',
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Sorry, payment has slipped on our side.',
    clientMessageVariants: [
      'Sorry, payment has slipped on our side.',
      'The payment is overdue on our end. We are working on it.',
    ],
    userSituation:
      'The payment date has already passed and the client knows it. You need a reminder that is polite but firmer than a casual check-in.',
    searchIntentPrimary: 'client payment overdue follow up',
    searchIntentSecondary: 'payment overdue reminder to client',
    strategyPrimary:
      'State the overdue status plainly and ask for a specific payment date rather than another generic update.',
    strategySecondary:
      'If needed, connect continued work or delivery to the payment timeline so the boundary is clear.',
    similarScenarioSlugs: [
      'ask-for-payment-politely',
      'unpaid-invoice-follow-up',
    ],
    nextStepScenarioSlugs: [
      'second-payment-reminder',
      'final-payment-reminder',
      'payment-extension-request',
    ],
    relatedScenarioSlugs: [
      'ask-for-payment-politely',
      'unpaid-invoice-follow-up',
      'second-payment-reminder',
      'final-payment-reminder',
      'payment-extension-request',
    ],
    toolPromptIntent:
      'Write a professional overdue-payment reminder to a client. Keep the tone firm, polite, and focused on securing a clear payment date.',
    targetQuery: 'client payment overdue follow up',
  }),
  createBatchTwoScenario({
    id: 'scn_second_payment_reminder',
    title: 'Second payment reminder to a client',
    slug: 'second-payment-reminder',
    metaTitle:
      'Second Payment Reminder Before a Final Notice | Flowdockr',
    metaDescription:
      'Use this scenario when you already sent one overdue reminder and still have not been paid. Draft a firmer second reminder that stays professional and sets up the next step clearly.',
    previewReply:
      'Hi [Name] — following up again on invoice [number], which is still outstanding after my previous reminder. Please confirm the payment date today so I can plan next steps clearly on my side.',
    heroDescription:
      'Use this scenario when the first overdue reminder did not work and you need a stronger second follow-up before moving to a final notice. Get a firm reminder you can adapt and send.',
    pagePromise:
      'Generate a second payment reminder that clearly raises urgency before the conversation turns into a final notice.',
    cluster: 'payment',
    intentTier: 'supporting',
    valueIntent: 'money',
    commercialPriority: 'medium',
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage: "I know we're overdue on this invoice.",
    clientMessageVariants: [
      "I know we're overdue on this invoice.",
      'Sorry for the delay. This payment is still outstanding.',
    ],
    userSituation:
      'You already sent one reminder and still have not been paid. The next message needs a stronger tone without becoming emotional or messy.',
    searchIntentPrimary: 'second payment reminder to client',
    searchIntentSecondary: 'second reminder for unpaid invoice',
    strategyPrimary:
      'Be more direct than the first reminder and restate the invoice, due date, and payment action required.',
    strategySecondary:
      'Ask for a firm date or immediate confirmation so the second reminder moves the situation forward.',
    similarScenarioSlugs: [
      'payment-overdue-reminder',
      'unpaid-invoice-follow-up',
    ],
    nextStepScenarioSlugs: [
      'final-payment-reminder',
      'pay-later-request',
      'payment-extension-request',
    ],
    relatedScenarioSlugs: [
      'payment-overdue-reminder',
      'unpaid-invoice-follow-up',
      'final-payment-reminder',
      'pay-later-request',
      'payment-extension-request',
    ],
    toolPromptIntent:
      'Draft a second payment reminder to a client. Keep the tone professional, firmer than the first follow-up, and clear about the next action needed.',
    targetQuery: 'second payment reminder to client',
  }),
  createBatchTwoScenario({
    id: 'scn_final_payment_after_completion',
    title: 'How to ask for final payment after project completion',
    slug: 'final-payment-after-completion',
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage:
      "Everything looks good. We'll settle the balance shortly.",
    clientMessageVariants: [
      "Everything looks good. We'll settle the balance shortly.",
      'The project is complete. We will handle the final payment soon.',
    ],
    userSituation:
      'The project is done, the client is satisfied, and the final balance is still open. You need to close payment cleanly without weakening the handoff.',
    searchIntentPrimary:
      'how to ask for final payment after project completion',
    searchIntentSecondary: 'final payment after project completion client',
    strategyPrimary:
      'Keep the message tied to the completed milestone, final invoice, and agreed payment step.',
    strategySecondary:
      'Use clear next-step language so the request feels like normal closeout, not awkward chasing.',
    toolPromptIntent:
      'Write a professional request for final payment after project completion. Keep the tone clear, polite, and tied to the agreed closeout step.',
    targetQuery: 'how to ask for final payment after project completion',
  }),
  createBatchTwoScenario({
    id: 'scn_pay_later_request',
    title: 'Client asks to pay later',
    slug: 'pay-later-request',
    metaTitle:
      'Client Wants to Pay Later? How to Reply Without Leaving It Open-Ended | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks to pay later than agreed, but has not proposed clear revised terms yet. Protect the payment boundary and avoid leaving the delay open-ended.',
    previewReply:
      'I understand the request. If we move the payment date, I would want to confirm the exact revised date in writing now so the timeline stays clear on both sides.',
    heroDescription:
      'Use this scenario when a client asks to pay later in a general way and you need to protect cash flow without leaving the revised timeline vague. Get a reply that keeps the payment boundary clear.',
    pagePromise:
      'Generate a pay-later reply that turns a vague delay request into a clear next payment step.',
    cluster: 'payment',
    intentTier: 'supporting',
    valueIntent: 'money',
    commercialPriority: 'medium',
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Can we pay this next month instead?',
    clientMessageVariants: [
      'Can we pay this next month instead?',
      'Would it be possible to delay payment until next month?',
    ],
    userSituation:
      'The client is asking to move the payment date after the agreed terms. You need to respond in a way that protects cash flow without making the relationship tense.',
    searchIntentPrimary: 'client asks to pay later what to say',
    searchIntentSecondary: 'client asks to delay payment reply',
    strategyPrimary:
      'Respond to the request directly and decide whether you are offering an exception, a condition, or a firm no.',
    strategySecondary:
      'If you allow extra time, document the new date clearly so the delay does not become open-ended.',
    similarScenarioSlugs: [
      'payment-extension-request',
      'deposit-not-paid-yet',
    ],
    nextStepScenarioSlugs: [
      'ask-for-payment-politely',
      'payment-overdue-reminder',
      'second-payment-reminder',
    ],
    relatedScenarioSlugs: [
      'payment-extension-request',
      'deposit-not-paid-yet',
      'ask-for-payment-politely',
      'payment-overdue-reminder',
      'second-payment-reminder',
    ],
    toolPromptIntent:
      'Draft a professional reply when a client asks to pay later. Keep the tone calm and protect the payment boundary.',
    targetQuery: 'client asks to pay later what to say',
  }),
  createBatchTwoScenario({
    id: 'scn_payment_extension_request',
    title: 'Client asks for more time to pay',
    slug: 'payment-extension-request',
    metaTitle:
      'Client Asks for More Time to Pay? How to Set Clear Extension Terms | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a payment extension on a specific invoice. Draft a reply that sets a revised date clearly and avoids leaving the new payment window vague.',
    previewReply:
      'If we extend the payment date, I would want to confirm the exact revised date now so the terms stay clear. Let me know the date you can commit to and I can confirm the extension from there.',
    heroDescription:
      'Use this scenario when a client asks for more time to pay on a specific invoice and you need a clear answer, not vague flexibility. Get a payment-extension reply that protects the commercial boundary.',
    pagePromise:
      'Generate a payment-extension reply that confirms the revised date and keeps the new terms explicit.',
    cluster: 'payment',
    intentTier: 'core',
    valueIntent: 'money',
    commercialPriority: 'high',
    distributionPriority: 'primary',
    clusterCore: true,
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Can we get another week to pay the invoice?',
    clientMessageVariants: [
      'Can we get another week to pay the invoice?',
      'Could we have a short extension on the invoice due date?',
    ],
    userSituation:
      'The client is asking for a payment extension and you need to answer without being vague. The reply should protect the commercial boundary and make the new terms explicit if you allow them.',
    searchIntentPrimary: 'client asks for payment extension',
    searchIntentSecondary: 'payment extension request client reply',
    strategyPrimary:
      'Decide quickly whether to allow the extension and spell out the revised date and any conditions in clear language.',
    strategySecondary:
      'Avoid soft wording that leaves the payment window open-ended or unclear.',
    similarScenarioSlugs: [
      'pay-later-request',
      'deposit-not-paid-yet',
    ],
    nextStepScenarioSlugs: [
      'payment-overdue-reminder',
      'second-payment-reminder',
      'final-payment-reminder',
    ],
    relatedScenarioSlugs: [
      'pay-later-request',
      'deposit-not-paid-yet',
      'payment-overdue-reminder',
      'second-payment-reminder',
      'final-payment-reminder',
    ],
    toolPromptIntent:
      'Write a professional reply when a client asks for more time to pay. Keep the tone clear and make any new payment terms explicit.',
    targetQuery: 'client asks for payment extension',
  }),
  createBatchTwoScenario({
    id: 'scn_deposit_not_paid_yet',
    title: 'Client has not paid the deposit yet',
    slug: 'deposit-not-paid-yet',
    metaTitle:
      'Deposit Still Not Paid? What to Say Before Kickoff | Flowdockr',
    metaDescription:
      'Use this scenario when the kickoff deposit was promised but still has not arrived. Follow up clearly and keep the start-after-payment boundary intact without sounding awkward.',
    previewReply:
      'Hi [Name] — just checking in on the deposit for this project. Once that is in place, I can lock the kickoff and move forward right away, so let me know if anything is blocking it on your side.',
    heroDescription:
      'Use this scenario when kickoff is blocked because the client promised the deposit but it still has not arrived. Get a clear follow-up that keeps the start-after-payment rule intact.',
    pagePromise:
      'Generate a deposit follow-up that keeps kickoff tied to the deposit arriving, not just a verbal promise.',
    cluster: 'payment',
    intentTier: 'core',
    valueIntent: 'money',
    commercialPriority: 'high',
    distributionPriority: 'primary',
    clusterCore: true,
    archetype: 'payment_protection',
    negotiationStage: 'pre_kickoff',
    primaryClientMessage: "We'll send the deposit soon.",
    clientMessageVariants: [
      "We'll send the deposit soon.",
      'The deposit is coming. We just need a little more time.',
    ],
    userSituation:
      'Kickoff is blocked because the deposit still has not arrived. You need to follow up without blurring the rule that work starts after payment.',
    searchIntentPrimary: 'client has not paid deposit yet what to say',
    searchIntentSecondary: 'follow up on unpaid deposit client',
    strategyPrimary:
      'Restate the deposit step clearly and tie kickoff to payment completion, not good intentions.',
    strategySecondary:
      'Keep the tone professional and give the client the fastest path to start once the deposit is paid.',
    similarScenarioSlugs: [
      'start-before-payment',
      'pay-later-request',
    ],
    nextStepScenarioSlugs: [
      'payment-extension-request',
      'ask-for-payment-politely',
      'overdue-invoice-no-response',
    ],
    relatedScenarioSlugs: [
      'start-before-payment',
      'pay-later-request',
      'payment-extension-request',
      'ask-for-payment-politely',
      'overdue-invoice-no-response',
    ],
    toolPromptIntent:
      'Draft a professional follow-up when a client has not paid the deposit yet. Keep the boundary clear and the next step simple.',
    targetQuery: 'client has not paid deposit yet what to say',
  }),
];
