import type { CanonicalScenario } from '@/types/scenario-catalog';

type DatasetScenarioInput = Omit<
  CanonicalScenario,
  'sourceType' | 'sourceNote' | 'status' | 'isSeed' | 'toolPromptIntent'
> & {
  toolPromptIntent?: string;
};

function createDatasetScenario({
  toolPromptIntent,
  ...scenario
}: DatasetScenarioInput): CanonicalScenario {
  return {
    ...scenario,
    isPriority: true,
    toolPromptIntent:
      toolPromptIntent ||
      `${scenario.userGoal || scenario.strategyPrimary} Keep the reply grounded in the client's exact wording and the real commercial boundary.`,
    sourceType: 'synthesized',
    sourceNote:
      'Scenario Dataset v1 Top 20 integration entry for the existing scenario page template.',
    status: 'ready',
    isSeed: false,
  };
}

export const scenarioDatasetV1Top20: CanonicalScenario[] = [
  createDatasetScenario({
    id: 'scn_v1_quote_too_high',
    slug: 'quote-too-high',
    title: 'Client says your quote is too high',
    h1: 'Client says your quote is too high',
    metaTitle:
      'Client Says Your Quote Is Too High? What to Say Next | Flowdockr',
    metaDescription:
      'Use this scenario to draft a calm reply when a client says your quote is too high. Protect value, explain the scope, and keep the deal moving without discounting too fast.',
    previewReply:
      'Thanks for flagging that. The quote reflects the scope, timeline, and level of work needed to get the result we discussed. If budget is the constraint, I can outline a leaner version so we adjust scope rather than cut the same work blindly.',
    heroDescription:
      'Use this scenario when a client says your quote is too high and you need to protect value without sounding defensive. Get a stronger pricing reply you can adapt and send.',
    pagePromise:
      'Generate a value-based reply that explains the price clearly and reopens the conversation without rushing into a discount.',
    cluster: 'pricing',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage:
      'Thanks for sending this over. To be honest, the quote is a bit higher than we expected. Is there any flexibility here?',
    clientMessageVariants: [
      'Thanks for sending this over. To be honest, the quote is a bit higher than we expected. Is there any flexibility here?',
      'This came in higher than we expected. Can you do anything on the price?',
      'The proposal looks solid, but the number feels high from our side.',
    ],
    userSituation:
      'You sent a detailed proposal with scope, timeline, and price. The client replies saying the quote is higher than expected, but they have not given you a real budget yet.',
    userGoal:
      'Protect the quoted price while reopening the conversation around scope and priorities.',
    searchIntentPrimary:
      'client says your quote is too high how to respond',
    searchIntentSecondary:
      'how to respond when a client says your quote is too high',
    strategyPrimary:
      'Re-anchor the quote around outcomes, scope, and what is included before discussing any price movement.',
    strategySecondary:
      'If budget is real, offer a smaller version or phased path instead of discounting the same work.',
    relatedScenarioSlugs: [
      'same-scope-lower-price',
      'out-of-budget-but-interested',
      'best-price-before-signing',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_no_response_after_proposal',
    slug: 'no-response-after-proposal',
    title: 'Client goes quiet after you send a proposal',
    h1: 'Client goes quiet after you send a proposal',
    metaTitle:
      'Client Goes Quiet After You Send a Proposal: How to Follow Up | Flowdockr',
    metaDescription:
      'Use this scenario when a client goes quiet after you send a proposal. Get a yes, no, or timeline update without sounding pushy.',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      'Thanks, got it. We’ll review and get back to you.',
    clientMessageVariants: [
      'Thanks, got it. We’ll review and get back to you.',
      'Received, thank you. We’ll take a look internally.',
      'Looks good so far. Let me come back to you after I review everything.',
    ],
    userSituation:
      'You sent a proposal and the client acknowledged it, but the thread has gone quiet for several days and you need a follow-up that moves the deal forward.',
    userGoal:
      'Restart the conversation and get a yes, no, or timing update without sounding needy.',
    searchIntentPrimary:
      'how to follow up after sending a proposal and getting no response',
    searchIntentSecondary:
      'client went quiet after proposal follow up',
    strategyPrimary:
      'Reference the proposal directly and make it easy for the client to reply with timing, questions, or a decision.',
    strategySecondary:
      'Keep the follow-up short so it feels like a clean prompt to respond, not a long sales email.',
    relatedScenarioSlugs: [
      'reviewing-internally-no-response',
      'contract-sent-no-response',
      'no-response-after-rate',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_no_response_after_rate',
    slug: 'no-response-after-rate',
    title: 'Client ghosts after asking your rate',
    h1: 'Client ghosts after asking your rate',
    metaTitle:
      'Client Ghosts After Asking Your Rate: How to Follow Up | Flowdockr',
    metaDescription:
      'Use this scenario when a client ghosts after asking your rate. Re-engage without sounding needy and diagnose whether price was the blocker.',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'What’s your rate for this kind of project?',
    clientMessageVariants: [
      'What’s your rate for this kind of project?',
      'Can you send over your pricing?',
      'What would you charge for something like this?',
    ],
    userSituation:
      'A lead asked for pricing, you replied with your rate, and then the conversation stopped. You need a follow-up that reopens the thread without sounding desperate.',
    userGoal:
      'Re-engage the lead and surface whether price, timing, or fit caused the silence.',
    searchIntentPrimary:
      'client ghosted after asking your rate how to follow up',
    searchIntentSecondary: 'follow up after sending rate no response',
    strategyPrimary:
      'Use a low-pressure follow-up that invites a clear yes, no, or next step.',
    strategySecondary:
      'Make it easy for the client to reply by giving them a simple decision path.',
    relatedScenarioSlugs: [
      'no-response-after-proposal',
      'quote-too-high',
      'reviewing-internally-no-response',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_same_scope_lower_price',
    slug: 'same-scope-lower-price',
    title: 'Client wants the same scope for a lower price',
    h1: 'Client wants the same scope for a lower price',
    metaTitle:
      'Client Wants the Same Scope for a Lower Price | Flowdockr',
    metaDescription:
      'Use this scenario when a client wants the same scope for a lower price. Hold the line that scope and price move together.',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'Everything in the proposal looks good. We just need the number to come down a bit.',
    clientMessageVariants: [
      'Everything in the proposal looks good. We just need the number to come down a bit.',
      'Can we keep the same scope and just lower the total?',
      'We want to move ahead as-is, but need a smaller number.',
    ],
    userSituation:
      'The client is not asking to reduce scope, timeline, or revision count. They simply want the same work at a lower price.',
    userGoal:
      'Hold the boundary that price and scope are linked, without turning the exchange confrontational.',
    searchIntentPrimary:
      'client wants same scope for lower price how to respond',
    searchIntentSecondary:
      'same scope lower price client reply',
    strategyPrimary:
      'Name clearly that the current price reflects the current scope and standard.',
    strategySecondary:
      'If the budget must change, make the client choose what gets reduced, delayed, or moved into a later phase.',
    relatedScenarioSlugs: [
      'quote-too-high',
      'discount-after-scope-approved',
      'best-price-before-signing',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_discount_before_starting',
    slug: 'discount-before-starting',
    title: 'Client asks for a discount before starting',
    h1: 'Client asks for a discount before starting',
    metaTitle:
      'Client Asks for a Discount Before Starting: How to Respond | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a discount before starting. Hold price or trade any concession for a real scope or commitment change.',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'Looks good overall. Before we move ahead, can you give us a discount?',
    clientMessageVariants: [
      'Looks good overall. Before we move ahead, can you give us a discount?',
      'Can you do anything on the price before we sign off?',
      'If we proceed, can you sharpen the number a little?',
    ],
    userSituation:
      'A prospect is interested, but before agreeing to the project they ask for a discount as part of the starting conversation.',
    userGoal:
      'Protect the base rate or trade any concession for a real scope, timing, or commitment change.',
    searchIntentPrimary:
      'client asks for a discount before starting how to respond',
    searchIntentSecondary:
      'discount request before project starts',
    strategyPrimary:
      'Keep the base rate intact unless there is a defined tradeoff in scope, speed, or commitment.',
    strategySecondary:
      'Turn any movement into an explicit exchange instead of giving away margin for free.',
    relatedScenarioSlugs: [
      'ten-percent-off-request',
      'discount-for-future-work',
      'discount-after-scope-approved',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_ten_percent_off_request',
    slug: 'ten-percent-off-request',
    title: 'Client asks for 10 percent off to move forward',
    h1: 'Client asks for 10 percent off to move forward',
    metaTitle: 'Client Asks for 10 Percent Off: How to Reply | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for 10 percent off to move forward. Avoid automatic discounting and reframe the tradeoff.',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'If you can do 10% off, I think we can get this approved today.',
    clientMessageVariants: [
      'If you can do 10% off, I think we can get this approved today.',
      'Can you take 10% off so we can move now?',
      'We’re close. We just need a small percentage reduction to sign this off.',
    ],
    userSituation:
      'The client is using a specific percentage discount as the condition for approval, which puts direct pressure on you to respond quickly.',
    userGoal:
      'Avoid reflexively discounting and move the conversation toward a structured tradeoff.',
    searchIntentPrimary:
      'client asks for 10 percent off how to respond',
    searchIntentSecondary: '10 percent discount request client reply',
    strategyPrimary:
      'Do not negotiate against yourself just because the ask is framed as a small percentage.',
    strategySecondary:
      'If you explore movement, tie it to scope, terms, or decision speed in a deliberate way.',
    relatedScenarioSlugs: [
      'discount-before-starting',
      'best-price-before-signing',
      'discount-after-scope-approved',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_best_price_before_signing',
    slug: 'best-price-before-signing',
    title: 'Client asks for your best price before signing',
    h1: 'Client asks for your best price before signing',
    metaTitle:
      'Client Asks for Your Best Price Before Signing | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for your best price before signing. Avoid a last-minute discount becoming the default close tactic.',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'We’re close. Can you send me your best possible price so I can get this signed off today?',
    clientMessageVariants: [
      'We’re close. Can you send me your best possible price so I can get this signed off today?',
      'If we move ahead now, what’s your best number?',
      'Can you give me your final price before I approve this?',
    ],
    userSituation:
      'The client is near the finish line and is using a last-minute price squeeze before approval.',
    userGoal:
      'Protect margin and keep the close moving without training the client to expect a last-minute concession.',
    searchIntentPrimary:
      'client asks for best price before signing',
    searchIntentSecondary:
      'final price before signing client reply',
    strategyPrimary:
      'Hold the original quote unless there is a real tradeoff tied to commitment speed, scope, or terms.',
    strategySecondary:
      'If you offer anything, make it deliberate and conditional rather than a free last-minute concession.',
    relatedScenarioSlugs: [
      'same-scope-lower-price',
      'ten-percent-off-request',
      'discount-after-scope-approved',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_fixed_price_unclear_scope',
    slug: 'fixed-price-unclear-scope',
    title: 'Client wants a fixed price for an unclear project',
    h1: 'Client wants a fixed price for an unclear project',
    metaTitle:
      'Client Wants a Fixed Price for an Unclear Project | Flowdockr',
    metaDescription:
      'Use this scenario when a client wants a fixed price for an unclear project. Protect yourself from under-scoping while still moving the deal forward.',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'Can you just give us a fixed price for the whole thing now? We can sort out the details later.',
    clientMessageVariants: [
      'Can you just give us a fixed price for the whole thing now? We can sort out the details later.',
      'We just need one fixed number now. We can refine scope afterward.',
      'Can you quote the whole project before we define everything in detail?',
    ],
    userSituation:
      'The client wants a fixed quote before the scope is stable enough to price accurately, which creates real delivery risk.',
    userGoal:
      'Protect yourself from under-scoping while still keeping the opportunity alive.',
    searchIntentPrimary:
      'client wants fixed price for unclear scope',
    searchIntentSecondary:
      'fixed price unclear project client reply',
    strategyPrimary:
      'Explain that a fixed price depends on a stable scope, assumptions, and boundaries.',
    strategySecondary:
      'Offer a discovery step, scoped range, or smaller first phase instead of a blind fixed number.',
    relatedScenarioSlugs: [
      'price-before-scope',
      'help-define-scope',
      'quote-too-high',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_price_before_scope',
    slug: 'price-before-scope',
    title: 'Client wants a price before sharing the full scope',
    h1: 'Client wants a price before sharing the full scope',
    metaTitle:
      'Client Wants a Price Before Sharing the Full Scope | Flowdockr',
    metaDescription:
      'Use this scenario when a client wants a price before sharing the full scope. Get clarity before committing to a misleading number.',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'Can you just give me a ballpark price first, then I can send more details if it makes sense?',
    clientMessageVariants: [
      'Can you just give me a ballpark price first, then I can send more details if it makes sense?',
      'I just need a number before I go into scope.',
      'Can you give me pricing first and we can sort out the details after?',
    ],
    userSituation:
      'The client keeps pushing for a number before they have shared enough information to price the work responsibly.',
    userGoal:
      'Get the missing scope details before you commit to a number that can backfire later.',
    searchIntentPrimary:
      'client wants price before scope how to respond',
    searchIntentSecondary:
      'ballpark price before details client reply',
    strategyPrimary:
      'Clarify what assumptions a number would depend on so the conversation stays grounded in scope.',
    strategySecondary:
      'Offer a range, discovery step, or structured next question instead of pretending the quote can be accurate already.',
    relatedScenarioSlugs: [
      'fixed-price-unclear-scope',
      'help-define-scope',
      'no-response-after-proposal',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_reviewing_internally_no_response',
    slug: 'reviewing-internally-no-response',
    title: 'Client says they are reviewing internally and then disappears',
    h1: 'Client says they are reviewing internally and then disappears',
    metaTitle:
      'Reviewing Internally Then No Response: How to Follow Up | Flowdockr',
    metaDescription:
      'Use this scenario when a client says they are reviewing internally and then disappears. Prompt a decision or concrete next step.',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      'Looks good on my side. I just need to review internally and I’ll circle back soon.',
    clientMessageVariants: [
      'Looks good on my side. I just need to review internally and I’ll circle back soon.',
      'We’re reviewing this internally and will get back to you.',
      'Let me take this to the team and I’ll follow up.',
    ],
    userSituation:
      'The client gave a plausible reason for delay, but now the internal review has stretched into silence and you need a reply that closes the loop.',
    userGoal:
      'Prompt a concrete timing update or decision without sounding impatient.',
    searchIntentPrimary:
      'client reviewing internally no response',
    searchIntentSecondary:
      'reviewing internally and disappeared client',
    strategyPrimary:
      'Acknowledge that internal review can take time, then ask a focused question that helps the client close the loop.',
    strategySecondary:
      'Offer an easy yes, no, or timing-update path so the client does not need to write a long explanation.',
    relatedScenarioSlugs: [
      'no-response-after-proposal',
      'contract-sent-no-response',
      'no-response-after-rate',
    ],
    priority: 'p0',
  }),
  createDatasetScenario({
    id: 'scn_v1_contract_sent_no_response',
    slug: 'contract-sent-no-response',
    title: 'Client asks for the contract and then disappears',
    h1: 'Client asks for the contract and then disappears',
    metaTitle:
      'Client Asked for the Contract Then Disappeared | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for the contract and then disappears. Recover the deal and surface any hidden friction.',
    archetype: 'follow_up',
    negotiationStage: 'contract_terms',
    primaryClientMessage: 'Please send over the contract and we’ll review.',
    clientMessageVariants: [
      'Please send over the contract and we’ll review.',
      'Send the agreement through and I’ll take a look.',
      'We’re ready for the paperwork. Send it over.',
    ],
    userSituation:
      'The deal looked close enough for paperwork, but after you sent the contract the client stopped responding.',
    userGoal:
      'Recover the deal and find out whether there is hidden friction on the contract, budget, or timing side.',
    searchIntentPrimary:
      'client asked for contract then disappeared',
    searchIntentSecondary:
      'follow up after sending contract no response',
    strategyPrimary:
      'Reference the contract step directly so the client can tell you whether the blocker is legal, internal, or commercial.',
    strategySecondary:
      'Keep the follow-up decision-oriented so the thread moves toward resolution, not another vague delay.',
    relatedScenarioSlugs: [
      'reviewing-internally-no-response',
      'no-response-after-proposal',
      'best-price-before-signing',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_overdue_invoice_no_response',
    slug: 'overdue-invoice-no-response',
    title: 'Client has not paid the invoice and stopped replying',
    h1: 'Client has not paid the invoice and stopped replying',
    metaTitle:
      'Client Not Paying the Invoice? What to Say Next | Flowdockr',
    metaDescription:
      'Use this scenario to write an overdue invoice follow-up when a client stopped replying. Ask for a payment date clearly without sounding vague, awkward, or hostile.',
    previewReply:
      'Hi [Name] — following up on invoice [number], which is now overdue. Please let me know the payment date on your side, or tell me if anything is blocking it so we can close it out quickly.',
    heroDescription:
      'Use this scenario when a client is late paying and the thread has gone quiet. Get a professional overdue invoice follow-up you can send without sounding rude.',
    pagePromise:
      'Generate a clear payment follow-up that asks for a date, surfaces blockers, and keeps the message professional.',
    cluster: 'payment',
    relatedSectionTitle: 'More client payment scripts',
    relatedSectionDescription:
      'Related payment reminders, unpaid invoice follow-ups, and deposit conversations.',
    archetype: 'payment_protection',
    negotiationStage: 'in_project',
    primaryClientMessage: 'Got it, thanks. We’ll process this.',
    clientMessageVariants: [
      'Got it, thanks. We’ll process this.',
      'Thanks for sending the invoice. We’ll handle it.',
      'Received. I’ll pass this to finance.',
    ],
    userSituation:
      'You sent the invoice and at least one reminder, but payment is now overdue and the client has stopped responding.',
    userGoal:
      'Push for payment while keeping the message clear, professional, and specific about next action.',
    searchIntentPrimary:
      'client has not paid invoice and stopped replying',
    searchIntentSecondary:
      'overdue invoice no response client follow up',
    strategyPrimary:
      'Treat this as a payment-status message, not a relationship check-in.',
    strategySecondary:
      'Ask for a concrete payment date or blocking issue instead of sending another vague reminder.',
    relatedScenarioSlugs: [
      'ask-for-payment-politely',
      'final-payment-reminder',
      'start-before-payment',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_extra_revision_rounds',
    slug: 'extra-revision-rounds',
    title: 'Client wants more revisions than agreed',
    h1: 'Client wants more revisions than agreed',
    metaTitle:
      'Client Wants More Revisions Than Agreed | Flowdockr',
    metaDescription:
      'Use this scenario when a client wants more revisions than agreed. Enforce the revision boundary and offer a paid path forward.',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'We have a few more rounds of feedback coming. Just send updated versions as we go and we’ll keep refining.',
    clientMessageVariants: [
      'We have a few more rounds of feedback coming. Just send updated versions as we go and we’ll keep refining.',
      'We need another few revision rounds before we lock this in.',
      'Let’s keep iterating until everyone is happy.',
    ],
    userSituation:
      'The agreement includes a fixed number of revision rounds, but the client is now asking for more as if they are included.',
    userGoal:
      'Reinforce the revision boundary and give the client a clean paid option for continuing.',
    searchIntentPrimary:
      'client wants more revisions than agreed',
    searchIntentSecondary:
      'extra revision rounds client response',
    strategyPrimary:
      'Reference the agreed revision scope and keep the boundary factual rather than emotional.',
    strategySecondary:
      'Offer a clear paid continuation path instead of letting open-ended revisions become the new default.',
    relatedScenarioSlugs: [
      'extra-page-request',
      'urgent-add-on-same-budget',
      'post-project-support-request',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_post_project_support_request',
    slug: 'post-project-support-request',
    title: 'Client expects ongoing support after the project ends',
    h1: 'Client expects ongoing support after the project ends',
    metaTitle:
      'Client Expects Ongoing Support After the Project Ends | Flowdockr',
    metaDescription:
      'Use this scenario when a client expects ongoing support after the project ends. Draw a clean line between project delivery and ongoing support.',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'After launch, we’ll probably keep sending you updates and fixes here and there if that’s okay.',
    clientMessageVariants: [
      'After launch, we’ll probably keep sending you updates and fixes here and there if that’s okay.',
      'We may need small tweaks after this wraps. We’ll just send them over as they come up.',
      'Once this is done, can we keep using this thread for little updates?',
    ],
    userSituation:
      'The project is ending, but the client is starting to treat you like open-ended support without a maintenance or retainer agreement.',
    userGoal:
      'Separate project delivery from ongoing support and set a cleaner commercial boundary.',
    searchIntentPrimary:
      'client expects ongoing support after project ends',
    searchIntentSecondary:
      'post project support client reply',
    strategyPrimary:
      'Clarify that the current project has an endpoint and that ongoing support needs its own scope or retainer.',
    strategySecondary:
      'Keep the tone helpful so the boundary feels structured, not abrupt.',
    relatedScenarioSlugs: [
      'extra-revision-rounds',
      'overdue-invoice-no-response',
      'urgent-add-on-same-budget',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_discount_for_future_work',
    slug: 'discount-for-future-work',
    title: 'Client asks for a discount in exchange for future work',
    h1: 'Client asks for a discount in exchange for future work',
    metaTitle:
      'Discount in Exchange for Future Work: How to Respond | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a discount in exchange for future work. Convert vague promises into real commitments before changing price.',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'We’ve got more work coming if this goes well, so can you sharpen the price on this first one?',
    clientMessageVariants: [
      'We’ve got more work coming if this goes well, so can you sharpen the price on this first one?',
      'If this is the start of a long-term relationship, can you do a better rate now?',
      'Can you come down on this one since there should be more projects after?',
    ],
    userSituation:
      'The client is asking for a lower rate now based on future work that is still vague and uncommitted.',
    userGoal:
      'Convert vague future-work promises into a defined commitment before you trade price.',
    searchIntentPrimary:
      'client asks for discount in exchange for future work',
    searchIntentSecondary:
      'future work discount request client reply',
    strategyPrimary:
      'Do not treat possible future work as the same thing as an actual commitment.',
    strategySecondary:
      'If there is a long-term opportunity, structure it as a retainer, package, or defined next-step commitment.',
    relatedScenarioSlugs: [
      'discount-before-starting',
      'discount-after-scope-approved',
      'out-of-budget-but-interested',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_discount_after_scope_approved',
    slug: 'discount-after-scope-approved',
    title: 'Client asks for a discount after approving the scope',
    h1: 'Client asks for a discount after approving the scope',
    metaTitle:
      'Client Asks for a Discount After Approving the Scope | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a discount after approving the scope. Do not let a late-stage ask reset the deal terms.',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'The scope works for us. If you can trim the price a little, we’re ready to proceed.',
    clientMessageVariants: [
      'The scope works for us. If you can trim the price a little, we’re ready to proceed.',
      'We’re aligned on scope. We just need a slightly better number.',
      'Everything looks good. We only need a small discount before we move ahead.',
    ],
    userSituation:
      'The client has already accepted the scope and only at the final step asks for a discount before committing.',
    userGoal:
      'Prevent a late-stage discount ask from quietly resetting the terms of the deal.',
    searchIntentPrimary:
      'client asks for discount after approving scope',
    searchIntentSecondary:
      'late stage discount request client reply',
    strategyPrimary:
      'Make it clear that the current price reflects the already approved scope.',
    strategySecondary:
      'If you offer anything, tie it to a concrete tradeoff instead of rewarding a last-minute squeeze.',
    relatedScenarioSlugs: [
      'same-scope-lower-price',
      'best-price-before-signing',
      'discount-before-starting',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_out_of_budget_but_interested',
    slug: 'out-of-budget-but-interested',
    title: 'Client says it is out of budget but still interested',
    h1: 'Client says it is out of budget but still interested',
    metaTitle:
      'Out of Budget but Still Interested? What to Say | Flowdockr',
    metaDescription:
      'Use this scenario to reply when a client says they want to work with you but the current proposal is out of budget. Keep the deal alive without shrinking the same scope into a weaker price.',
    previewReply:
      'I appreciate that, and I\'m glad there\'s real interest here. Rather than reduce the same scope and weaken the result, the better move is to look at a smaller first phase or a leaner version that fits the budget more cleanly.',
    heroDescription:
      'Use this scenario when the client wants to move forward, but the current proposal is out of budget. Get a reply that keeps momentum without defaulting to a discount.',
    pagePromise:
      'Generate a budget-response reply that protects your pricing logic while offering a credible path forward.',
    cluster: 'pricing',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage:
      'We really want to work with you, but this is outside our budget right now. Is there any way to make it work?',
    clientMessageVariants: [
      'We really want to work with you, but this is outside our budget right now. Is there any way to make it work?',
      'This is beyond what we can spend, but we still want to find a way to work together.',
      'We like this a lot. The challenge is that it is currently out of budget for us.',
    ],
    userSituation:
      'The client is giving a real buying signal, but the current version does not fit budget and they want help finding another path.',
    userGoal:
      'Keep the deal alive without shrinking the same scope into a weaker price.',
    searchIntentPrimary:
      'client says out of budget but still interested',
    searchIntentSecondary:
      'out of budget but interested client reply',
    strategyPrimary:
      'Treat the interest as real and shift the conversation toward a leaner scope, phased rollout, or smaller first step.',
    strategySecondary:
      'Keep the original pricing logic intact so the tradeoff stays visible.',
    relatedScenarioSlugs: [
      'quote-too-high',
      'discount-for-future-work',
      'same-scope-lower-price',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_extra_page_request',
    slug: 'extra-page-request',
    title: 'Client asks for one more page after scope is agreed',
    h1: 'Client asks for one more page after scope is agreed',
    metaTitle:
      'Client Asks for One More Page After Scope Is Agreed | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for one more page after scope is already agreed. Make the scope change explicit and billable.',
    archetype: 'scope_control',
    negotiationStage: 'pre_kickoff',
    primaryClientMessage:
      'Can we also add one more page to this? It should be quick since we’re already doing the rest.',
    clientMessageVariants: [
      'Can we also add one more page to this? It should be quick since we’re already doing the rest.',
      'Can we squeeze in one extra page while you’re already building this?',
      'We just need one more page added. I assume that fits into the current scope.',
    ],
    userSituation:
      'You already aligned on project scope and pricing, but before kickoff the client casually adds another page and treats it like a minor extra.',
    userGoal:
      'Acknowledge the request while making the scope change explicit and billable.',
    searchIntentPrimary:
      'client asks for one more page after scope agreed',
    searchIntentSecondary:
      'extra page request client reply',
    strategyPrimary:
      'Name the additional deliverable clearly instead of absorbing it as a casual add-on.',
    strategySecondary:
      'Offer a simple choice between keeping the current scope or updating scope and budget.',
    relatedScenarioSlugs: [
      'extra-revision-rounds',
      'urgent-add-on-same-budget',
      'post-project-support-request',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_urgent_add_on_same_budget',
    slug: 'urgent-add-on-same-budget',
    title: 'Client adds urgent work but expects the same budget',
    h1: 'Client adds urgent work but expects the same budget',
    metaTitle:
      'Client Adds Urgent Work but Expects the Same Budget | Flowdockr',
    metaDescription:
      'Use this scenario when a client adds urgent work but expects the same budget. Flag both the scope increase and urgency cost clearly.',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'We need to add this by Friday as well. It’s important, but I assume we can keep the current budget.',
    clientMessageVariants: [
      'We need to add this by Friday as well. It’s important, but I assume we can keep the current budget.',
      'Can you fit this extra piece in by end of week without changing the quote?',
      'This is urgent now. Can we add it in and still stay on the same budget?',
    ],
    userSituation:
      'Mid-project, the client adds urgent work with a tighter deadline and assumes it fits within the original quote.',
    userGoal:
      'Flag both the scope increase and urgency cost without escalating the tone.',
    searchIntentPrimary:
      'client adds urgent work but expects same budget',
    searchIntentSecondary:
      'urgent add on same budget client reply',
    strategyPrimary:
      'Separate the urgency issue from the scope issue so both tradeoffs stay visible.',
    strategySecondary:
      'Offer a clear choice between scope, timeline, and budget rather than absorbing the pressure silently.',
    relatedScenarioSlugs: [
      'extra-page-request',
      'extra-revision-rounds',
      'post-project-support-request',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_help_define_scope',
    slug: 'help-define-scope',
    title: 'Client says they need help figuring out the scope',
    h1: 'Client says they need help figuring out the scope',
    metaTitle:
      'Client Needs Help Figuring Out the Scope | Flowdockr',
    metaDescription:
      'Use this scenario when a client says they need help figuring out the scope. Turn ambiguity into a structured discovery step instead of free consulting.',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'We know what outcome we want, but we’re not fully sure what the scope should be. Can you help us figure it out?',
    clientMessageVariants: [
      'We know what outcome we want, but we’re not fully sure what the scope should be. Can you help us figure it out?',
      'We need help defining what should actually be included.',
      'Can you help us figure out the scope before we lock in the project?',
    ],
    userSituation:
      'A lead is interested but does not have a stable brief yet and wants you to help shape what the project should include.',
    userGoal:
      'Turn ambiguity into a structured discovery step instead of free consulting.',
    searchIntentPrimary:
      'client needs help figuring out scope',
    searchIntentSecondary:
      'help client define project scope reply',
    strategyPrimary:
      'Treat scope definition as real strategic work rather than an informal pre-sales extra.',
    strategySecondary:
      'Give the client a structured discovery next step so the project can move forward cleanly.',
    relatedScenarioSlugs: [
      'price-before-scope',
      'fixed-price-unclear-scope',
      'quote-too-high',
    ],
    priority: 'p1',
  }),
];
