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
    toolPromptIntent:
      toolPromptIntent ||
      `${scenario.userGoal || scenario.strategyPrimary} Keep the reply grounded in the client's exact wording and the real commercial boundary.`,
    sourceType: 'synthesized',
    sourceNote:
      'Scenario Dataset v1 remaining 30 integration entry for the existing scenario page template.',
    status: 'ready',
    isSeed: false,
  };
}

export const scenarioDatasetV1Remaining30: CanonicalScenario[] = [
  createDatasetScenario({
    id: 'scn_v1_cheaper_freelancer',
    slug: 'cheaper-freelancer',
    title: 'Client says another freelancer is cheaper',
    h1: 'Client says another freelancer is cheaper',
    metaTitle: 'Another Freelancer Is Cheaper: How to Respond | Flowdockr',
    metaDescription:
      'Use this scenario when a client compares your quote to a cheaper freelancer. Defend value without turning the conversation into a price match.',
    archetype: 'price_comparison',
    negotiationStage: 'quote_pushback',
    primaryClientMessage:
      'We got another quote that’s quite a bit lower than yours. Can you match that price?',
    clientMessageVariants: [
      'We got another quote that’s quite a bit lower than yours. Can you match that price?',
      'Another freelancer came in cheaper. Can you do something closer to that number?',
      'We found someone else who can do this for less. Are you able to match it?',
    ],
    userSituation:
      'After reviewing your quote, the client says they received a lower price from another freelancer and wants to know whether you can match it.',
    userGoal:
      'Defend value and avoid getting dragged into a pure price comparison.',
    searchIntentPrimary:
      'client says another freelancer is cheaper how to respond',
    searchIntentSecondary:
      'another freelancer is cheaper client reply',
    strategyPrimary:
      'Acknowledge the comparison without attacking the other option or racing to the bottom on price.',
    strategySecondary:
      'Reframe the decision around scope, reliability, and fit, or offer a narrower option if the budget truly differs.',
    relatedScenarioSlugs: [
      'quote-too-high',
      'competitor-discount-pressure',
      'best-price-before-signing',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_why_so_expensive',
    slug: 'why-so-expensive',
    title: 'Client asks why your price is so high',
    h1: 'Client asks why your price is so high',
    metaTitle: 'Why Is Your Price So High? How to Reply | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks why your pricing is so high. Explain the pricing logic clearly without sounding defensive.',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'Can I ask why your pricing is this high compared to what we expected?',
    clientMessageVariants: [
      'Can I ask why your pricing is this high compared to what we expected?',
      'Why is this priced so high from your side?',
      'Help me understand why your fee comes in at this level.',
    ],
    userSituation:
      'A prospect reacts to your pricing call or proposal by directly asking why the fee is so high.',
    userGoal:
      'Explain the pricing logic clearly without sounding defensive.',
    searchIntentPrimary:
      'client asks why your price is so high how to respond',
    searchIntentSecondary:
      'why is your freelance price so high reply',
    strategyPrimary:
      'Explain the price through scope, expertise, risk reduction, and delivery standard instead of hours alone.',
    strategySecondary:
      'Keep the explanation tied to outcomes and decision criteria so the discussion does not become line-by-line bargaining.',
    relatedScenarioSlugs: [
      'quote-too-high',
      'hard-to-justify-price',
      'too-expensive-for-small-project',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_above_budget_range',
    slug: 'above-budget-range',
    title: 'Client says your proposal is above their budget range',
    h1: 'Client says your proposal is above their budget range',
    metaTitle: 'Proposal Above Budget Range: How to Reply | Flowdockr',
    metaDescription:
      'Use this scenario when a client says your proposal is above their internal range. Find out if the budget issue is firm before conceding.',
    archetype: 'pricing_objection',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      'This came in above the range we usually work with internally. Is there any room to adjust?',
    clientMessageVariants: [
      'This came in above the range we usually work with internally. Is there any room to adjust?',
      'Finance says this sits above our normal budget range.',
      'This is higher than the range we can usually get approved. Can you work with that?',
    ],
    userSituation:
      'A company contact says they like the proposal, but finance has a budget range ceiling that your quote exceeds.',
    userGoal:
      'Find out whether the issue is a hard budget limit or a negotiable range without conceding too early.',
    searchIntentPrimary:
      'proposal above budget range how to respond',
    searchIntentSecondary:
      'client says quote is above internal budget range',
    strategyPrimary:
      'Treat this as a budget-approval constraint first and ask enough to understand whether the range is fixed or flexible.',
    strategySecondary:
      'If the budget ceiling is real, offer phased scope or a reduced version instead of trimming the same proposal by default.',
    relatedScenarioSlugs: [
      'out-of-budget-but-interested',
      'quote-too-high',
      'budget-cycle-discount-request',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_hard_to_justify_price',
    slug: 'hard-to-justify-price',
    title: 'Client says your price is hard to justify internally',
    h1: 'Client says your price is hard to justify internally',
    metaTitle:
      'Price Is Hard to Justify Internally: How to Respond | Flowdockr',
    metaDescription:
      'Use this scenario when a client likes your work but says your price is hard to justify internally. Help them defend the spend without discounting first.',
    archetype: 'pricing_objection',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      'I’m not saying no, but this price will be tough for me to justify internally. Any thoughts?',
    clientMessageVariants: [
      'I’m not saying no, but this price will be tough for me to justify internally. Any thoughts?',
      'I like this, but I need a better way to justify the price to the team.',
      'This is going to be a hard sell internally at this number.',
    ],
    userSituation:
      'The decision-maker is interested, but says they need stronger reasoning before they can get internal approval for your fee.',
    userGoal:
      'Equip the client to defend the spend without immediately discounting.',
    searchIntentPrimary:
      'client says price is hard to justify internally',
    searchIntentSecondary:
      'justify freelance price internally client reply',
    strategyPrimary:
      'Give the client a concise justification framed around outcomes, risk reduction, and what the fee protects.',
    strategySecondary:
      'Help them defend the spend without training them to expect a discount as the first solution.',
    relatedScenarioSlugs: [
      'why-so-expensive',
      'above-budget-range',
      'reviewing-internally-no-response',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_in_house_cheaper',
    slug: 'in-house-cheaper',
    title: 'Client says they could do it in-house for less',
    h1: 'Client says they could do it in-house for less',
    metaTitle:
      'Client Says They Can Do It In-House for Less | Flowdockr',
    metaDescription:
      'Use this scenario when a client says they could do the work in-house for less. Reframe around speed, expertise, and opportunity cost.',
    archetype: 'price_comparison',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'At this price, I’m wondering if we should just have someone on our team do it instead.',
    clientMessageVariants: [
      'At this price, I’m wondering if we should just have someone on our team do it instead.',
      'We may be able to handle this internally for less.',
      'Why wouldn’t we just do this in-house at this price point?',
    ],
    userSituation:
      'A client pushes back on your rate by saying their internal team could probably handle the work for a lower cost.',
    userGoal:
      'Reframe around speed, expertise, and opportunity cost instead of arguing line by line.',
    searchIntentPrimary:
      'client says they can do it in house for less',
    searchIntentSecondary:
      'in house cheaper than freelancer response',
    strategyPrimary:
      'Compare the decision on speed, reliability, and opportunity cost rather than on a simplistic internal cost assumption.',
    strategySecondary:
      'If budget really is the issue, separate whether they need outside help now or should pause until internal capacity exists.',
    relatedScenarioSlugs: [
      'cheaper-freelancer',
      'why-so-expensive',
      'too-expensive-for-small-project',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_too_expensive_for_small_project',
    slug: 'too-expensive-for-small-project',
    title: 'Client says the project is too small for your price',
    h1: 'Client says the project is too small for your price',
    metaTitle:
      'Project Is Too Small for Your Price: How to Reply | Flowdockr',
    metaDescription:
      'Use this scenario when a client says the project is too small for your price. Explain the real work involved without over-justifying.',
    archetype: 'pricing_objection',
    negotiationStage: 'quote_pushback',
    primaryClientMessage:
      'This feels like a pretty small project, so the quote seems high to me. Am I missing something?',
    clientMessageVariants: [
      'This feels like a pretty small project, so the quote seems high to me. Am I missing something?',
      'It seems too simple to cost this much.',
      'For a project this small, I expected a lower number.',
    ],
    userSituation:
      'A lead says the project scope sounds simple from their side and questions why the quote is not lower.',
    userGoal:
      'Explain the real work involved without over-justifying.',
    searchIntentPrimary:
      'client says project is too small for your price',
    searchIntentSecondary:
      'small project quote too high reply',
    strategyPrimary:
      'Clarify the work hidden behind the deliverable so the client understands what the price actually covers.',
    strategySecondary:
      'Stay concise and commercial rather than defending every task in detail.',
    relatedScenarioSlugs: [
      'why-so-expensive',
      'quote-too-high',
      'vague-project-quote',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_small_extra_tasks',
    slug: 'small-extra-tasks',
    title: 'Client keeps adding small extra tasks in chat',
    h1: 'Client keeps adding small extra tasks in chat',
    metaTitle:
      'Client Keeps Adding Small Extra Tasks in Chat | Flowdockr',
    metaDescription:
      'Use this scenario when a client keeps adding small extra tasks in chat. Stop slow scope creep without sounding irritated.',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'While you’re in there, could you also tweak these two sections and update the mobile spacing? Should only take a few mins.',
    clientMessageVariants: [
      'While you’re in there, could you also tweak these two sections and update the mobile spacing? Should only take a few mins.',
      'Can you quickly add these two little changes while you’re working on it?',
      'These are all small tweaks, so we can just roll them in, right?',
    ],
    userSituation:
      'During delivery, the client keeps dropping extra requests in chat and framing each one as tiny, even though they are adding up.',
    userGoal:
      'Stop the slow scope creep without sounding irritated.',
    searchIntentPrimary:
      'client keeps adding small extra tasks how to respond',
    searchIntentSecondary:
      'small extra tasks scope creep reply',
    strategyPrimary:
      'Name the pattern calmly and make the scope change visible before the requests keep accumulating.',
    strategySecondary:
      'Offer a clean choice between keeping the current scope or updating the work and budget explicitly.',
    relatedScenarioSlugs: [
      'extra-page-request',
      'urgent-add-on-same-budget',
      'post-project-support-request',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_added_strategy_work',
    slug: 'added-strategy-work',
    title: 'Client asks for extra strategy work that was not in scope',
    h1: 'Client asks for extra strategy work that was not in scope',
    metaTitle:
      'Client Asks for Extra Strategy Work Not in Scope | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for strategy work that was not part of the original scope. Separate advisory work from execution and price it properly.',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'Could you also map out the strategy behind this and give us recommendations on next steps?',
    clientMessageVariants: [
      'Could you also map out the strategy behind this and give us recommendations on next steps?',
      'Can you add some strategic direction here, not just execution?',
      'We’d also like your recommendations on what we should do next.',
    ],
    userSituation:
      'You were hired for execution, but the client now wants strategic recommendations, planning, or consulting that were never included.',
    userGoal:
      'Separate advisory work from execution scope and price it properly.',
    searchIntentPrimary:
      'client asks for extra strategy work not in scope',
    searchIntentSecondary:
      'out of scope strategy work client reply',
    strategyPrimary:
      'Draw a clean line between execution and advisory work so the client understands this is a scope expansion, not a small extra.',
    strategySecondary:
      'Offer a structured paid option for strategic input instead of folding it into delivery informally.',
    relatedScenarioSlugs: [
      'help-define-scope',
      'skip-discovery',
      'unscoped-extra-meetings',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_post_signoff_extra_deliverables',
    slug: 'post-signoff-extra-deliverables',
    title: 'Client asks for more deliverables after signoff',
    h1: 'Client asks for more deliverables after signoff',
    metaTitle:
      'Client Asks for More Deliverables After Signoff | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for extra deliverables after signoff. Prevent completed work from reopening as unpaid extra work.',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'Now that this is wrapped, could you also send a couple of additional versions for our other channels?',
    clientMessageVariants: [
      'Now that this is wrapped, could you also send a couple of additional versions for our other channels?',
      'Since this is approved, can you also send a few extra assets off the back of it?',
      'Can you add some extra versions now that the main deliverable is done?',
    ],
    userSituation:
      'The main deliverable has already been approved, but the client comes back asking for extra assets related to the project.',
    userGoal:
      'Prevent completed work from reopening as unpaid extra work.',
    searchIntentPrimary:
      'client asks for more deliverables after signoff',
    searchIntentSecondary:
      'post signoff extra deliverables client reply',
    strategyPrimary:
      'Treat signoff as a real project boundary and make any additional deliverables a new scoped request.',
    strategySecondary:
      'Stay helpful, but do not let approval become an excuse for unpaid expansion.',
    relatedScenarioSlugs: [
      'extra-revision-rounds',
      'multiple-format-request',
      'post-project-support-request',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_unscoped_extra_meetings',
    slug: 'unscoped-extra-meetings',
    title: 'Client expects extra meetings that were not included',
    h1: 'Client expects extra meetings that were not included',
    metaTitle:
      'Client Expects Extra Meetings That Were Not Included | Flowdockr',
    metaDescription:
      'Use this scenario when a client expects extra meetings that were not included. Set a boundary around communication overhead and billable time.',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'Looping you into our weekly team sync moving forward so you can stay aligned with everyone.',
    clientMessageVariants: [
      'Looping you into our weekly team sync moving forward so you can stay aligned with everyone.',
      'We’ll add you to the recurring review call each week.',
      'You should probably join the stakeholder syncs going forward too.',
    ],
    userSituation:
      'The client starts inviting you to recurring syncs, review calls, or stakeholder meetings that were not part of the scoped time.',
    userGoal:
      'Set a boundary around communication overhead and billable time.',
    searchIntentPrimary:
      'client expects extra meetings not included how to respond',
    searchIntentSecondary:
      'extra meetings not in scope client reply',
    strategyPrimary:
      'Treat meeting time as real project scope and clarify what is included in the current engagement.',
    strategySecondary:
      'Offer a clear way to add meeting support without absorbing it as invisible overhead.',
    relatedScenarioSlugs: [
      'added-strategy-work',
      'post-project-support-request',
      'small-extra-tasks',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_changed_brief_mid_project',
    slug: 'changed-brief-mid-project',
    title: 'Client changes the brief after work has started',
    h1: 'Client changes the brief after work has started',
    metaTitle: 'Client Changes the Brief After Work Starts | Flowdockr',
    metaDescription:
      'Use this scenario when a client changes the brief after work has started. Re-anchor to the original brief and define a change-order path.',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'After thinking more about it, we want to shift the direction and include a few more things in this round.',
    clientMessageVariants: [
      'After thinking more about it, we want to shift the direction and include a few more things in this round.',
      'We’ve changed direction a bit and want to expand what this phase includes.',
      'We want to revise the brief now that you’ve started.',
    ],
    userSituation:
      'You began work based on one agreed brief, and the client now sends a broader direction that changes the project substantially.',
    userGoal:
      'Re-anchor to the original brief and define a change-order path.',
    searchIntentPrimary:
      'client changes the brief after work has started',
    searchIntentSecondary:
      'changed project brief mid project client reply',
    strategyPrimary:
      'Reference the original brief clearly so the scope shift is visible and factual.',
    strategySecondary:
      'Offer a structured change path instead of informally absorbing the new direction.',
    relatedScenarioSlugs: [
      'extra-page-request',
      'extra-revision-rounds',
      'urgent-add-on-same-budget',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_multiple_format_request',
    slug: 'multiple-format-request',
    title: 'Client assumes extra formats or versions are included',
    h1: 'Client assumes extra formats or versions are included',
    metaTitle: 'Client Assumes Extra Formats Are Included | Flowdockr',
    metaDescription:
      'Use this scenario when a client assumes extra formats or versions are included. Clarify what is included and price versioning separately.',
    archetype: 'scope_control',
    negotiationStage: 'in_project',
    primaryClientMessage:
      'Can you also adapt this into social, email, and deck versions while you’re at it?',
    clientMessageVariants: [
      'Can you also adapt this into social, email, and deck versions while you’re at it?',
      'We’ll also need alternate sizes and channel versions from the same asset.',
      'Can you turn this into a few extra formats as part of the same project?',
    ],
    userSituation:
      'The original scope covers one core deliverable, but the client assumes alternate sizes, formats, or channel versions are included automatically.',
    userGoal:
      'Clarify what is included and price versioning separately.',
    searchIntentPrimary:
      'client assumes extra formats are included',
    searchIntentSecondary:
      'extra versions included client reply',
    strategyPrimary:
      'Make versioning and repurposing visible as separate work rather than an invisible extension of the original deliverable.',
    strategySecondary:
      'Offer a clear add-on path so the client can choose whether the extra formats are worth including.',
    relatedScenarioSlugs: [
      'extra-page-request',
      'post-signoff-extra-deliverables',
      'small-extra-tasks',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_no_response_after_discovery_call',
    slug: 'no-response-after-discovery-call',
    title: 'Client goes quiet after a discovery call',
    h1: 'Client goes quiet after a discovery call',
    metaTitle:
      'Client Goes Quiet After a Discovery Call | Flowdockr',
    metaDescription:
      'Use this scenario when a client goes quiet after a discovery call. Reconnect while referring back to the momentum from the call.',
    archetype: 'follow_up',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'This was really helpful. Let me talk to the team and I’ll get back to you.',
    clientMessageVariants: [
      'This was really helpful. Let me talk to the team and I’ll get back to you.',
      'Great call. I’ll take this back to the team and circle back.',
      'Thanks, this gave me a lot to think about. I’ll follow up soon.',
    ],
    userSituation:
      'You had a strong intro call and clear interest, but after the call the client stopped responding to next-step messages.',
    userGoal:
      'Reconnect while referencing the momentum from the call.',
    searchIntentPrimary:
      'client went quiet after discovery call how to follow up',
    searchIntentSecondary:
      'follow up after discovery call no response',
    strategyPrimary:
      'Reference the call briefly and make the next step easy to answer instead of sending a generic check-in.',
    strategySecondary:
      'Keep the follow-up light so it feels like a helpful nudge rather than pressure.',
    relatedScenarioSlugs: [
      'no-response-after-proposal',
      'price-before-scope',
      'vague-project-quote',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_proposal_viewed_no_response',
    slug: 'proposal-viewed-no-response',
    title: 'Client viewed your proposal but has not replied',
    h1: 'Client viewed your proposal but has not replied',
    metaTitle:
      'Client Viewed Your Proposal but Has Not Replied | Flowdockr',
    metaDescription:
      'Use this scenario when a client viewed your proposal but has not replied. Nudge them without sounding like you are tracking them.',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage: 'Thanks, we’ll take a look.',
    clientMessageVariants: [
      'Thanks, we’ll take a look.',
      'Received the proposal. We’ll review it shortly.',
      'We have it. I’ll review and come back to you.',
    ],
    userSituation:
      'You know the proposal was opened, but the client has not sent any questions or updates.',
    userGoal:
      'Nudge the client without sounding like you are monitoring them.',
    searchIntentPrimary:
      'client viewed proposal but has not replied',
    searchIntentSecondary:
      'proposal opened no response follow up',
    strategyPrimary:
      'Reference the proposal naturally and prompt a decision or question without mentioning view tracking.',
    strategySecondary:
      'Keep the note short so the client can respond with a quick status update.',
    relatedScenarioSlugs: [
      'no-response-after-proposal',
      'reviewing-internally-no-response',
      'keeps-delaying-decision',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_no_response_after_objections',
    slug: 'no-response-after-objections',
    title: 'Client goes quiet after you answer their objections',
    h1: 'Client goes quiet after you answer their objections',
    metaTitle:
      'Client Goes Quiet After You Answer Their Objections | Flowdockr',
    metaDescription:
      'Use this scenario when a client goes quiet after you answer objections. Bring the conversation back to a decision point.',
    archetype: 'follow_up',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'Thanks for clarifying. Let me think about it and get back to you.',
    clientMessageVariants: [
      'Thanks for clarifying. Let me think about it and get back to you.',
      'That helps. I need to think on it a bit more.',
      'Thanks, that answers my question. Let me come back to you.',
    ],
    userSituation:
      'The client raised concerns, you answered them clearly, and then they stopped replying instead of moving forward.',
    userGoal:
      'Bring the conversation back to a decision point.',
    searchIntentPrimary:
      'client goes quiet after you answer objections',
    searchIntentSecondary:
      'follow up after answering objections no response',
    strategyPrimary:
      'Frame the follow-up around decision clarity, not another round of explanation.',
    strategySecondary:
      'Invite the client to say whether the blocker is still budget, timing, or fit so the thread can move again.',
    relatedScenarioSlugs: [
      'no-response-after-rate',
      'no-response-after-proposal',
      'quote-too-high',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_bad_timing_no_response',
    slug: 'bad-timing-no-response',
    title: 'Client says timing is bad and then stops responding',
    h1: 'Client says timing is bad and then stops responding',
    metaTitle:
      'Client Says Timing Is Bad Then Stops Responding | Flowdockr',
    metaDescription:
      'Use this scenario when a client says timing is bad and then stops responding. Check whether the opportunity is delayed or dead.',
    archetype: 'follow_up',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'This looks good, but the timing is tough on our side right now.',
    clientMessageVariants: [
      'This looks good, but the timing is tough on our side right now.',
      'The timing is not ideal for us at the moment.',
      'We’re interested, but it’s bad timing right now.',
    ],
    userSituation:
      'The client did not say no, only that timing was not ideal. Now the thread has gone cold and you want to reopen it without sounding like a hard sell.',
    userGoal:
      'Check whether the opportunity is delayed or dead and reopen the door cleanly.',
    searchIntentPrimary:
      'client says timing is bad then stops responding',
    searchIntentSecondary:
      'bad timing no response client follow up',
    strategyPrimary:
      'Treat the earlier message as a timing question and ask whether the opportunity is postponed, paused, or no longer active.',
    strategySecondary:
      'Keep the follow-up light so the client can reply honestly without feeling pushed.',
    relatedScenarioSlugs: [
      'keeps-delaying-decision',
      'no-response-after-proposal',
      'no-response-after-discovery-call',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_keeps_delaying_decision',
    slug: 'keeps-delaying-decision',
    title: 'Client keeps saying they will get back to you soon',
    h1: 'Client keeps saying they will get back to you soon',
    metaTitle:
      'Client Keeps Saying They Will Get Back to You Soon | Flowdockr',
    metaDescription:
      'Use this scenario when a client keeps delaying a decision with vague updates. Move the conversation toward a real commitment or close.',
    archetype: 'follow_up',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      'Sorry for the delay — I’ll get back to you soon.',
    clientMessageVariants: [
      'Sorry for the delay — I’ll get back to you soon.',
      'Still with us. I’ll get back to you shortly.',
      'Apologies for the delay. I should have an answer for you soon.',
    ],
    userSituation:
      'The client is not fully ghosting, but keeps sending vague delay messages without making a decision.',
    userGoal:
      'Move the conversation from soft delay to a real commitment or close.',
    searchIntentPrimary:
      'client keeps saying they will get back to you soon',
    searchIntentSecondary:
      'client delaying decision follow up',
    strategyPrimary:
      'Push the conversation toward a concrete status or timeline instead of accepting endless soft delays.',
    strategySecondary:
      'Make it easy for the client to give a yes, no, or date so the thread can close cleanly either way.',
    relatedScenarioSlugs: [
      'reviewing-internally-no-response',
      'bad-timing-no-response',
      'no-response-after-proposal',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_competitor_discount_pressure',
    slug: 'competitor-discount-pressure',
    title: 'Client says other vendors offered a discount',
    h1: 'Client says other vendors offered a discount',
    metaTitle:
      'Other Vendors Offered a Discount: How to Reply | Flowdockr',
    metaDescription:
      'Use this scenario when a client says other vendors offered a discount. Keep the conversation on fit and scope instead of reacting to market pressure.',
    archetype: 'price_comparison',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'A couple of others are offering discounts here. Can you do something on the price too?',
    clientMessageVariants: [
      'A couple of others are offering discounts here. Can you do something on the price too?',
      'Other vendors are giving us discounts. Can you match that?',
      'We’re seeing discounting from others. Is there anything you can do?',
    ],
    userSituation:
      'The client pressures you by saying competing vendors are offering discounts and implies you should do the same.',
    userGoal:
      'Keep the conversation on fit and scope instead of reacting to market pressure.',
    searchIntentPrimary:
      'client says other vendors offered a discount',
    searchIntentSecondary:
      'competitor discount pressure client reply',
    strategyPrimary:
      'Acknowledge the comparison without accepting that competitor discounting should set your pricing logic.',
    strategySecondary:
      'Reframe around what the client is actually comparing and what tradeoffs a lower discounted option implies.',
    relatedScenarioSlugs: [
      'cheaper-freelancer',
      'ten-percent-off-request',
      'best-price-before-signing',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_partner_rate_request',
    slug: 'partner-rate-request',
    title: 'Client asks for a partner rate before you have worked together',
    h1: 'Client asks for a partner rate before you have worked together',
    metaTitle:
      'Client Asks for a Partner Rate Before You Have Worked Together | Flowdockr',
    metaDescription:
      'Use this scenario when a new client asks for a partner rate before you have worked together. Stay warm without weakening your starting anchor.',
    archetype: 'pricing_objection',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'If this is the start of a long-term relationship, can you do a partner rate for us?',
    clientMessageVariants: [
      'If this is the start of a long-term relationship, can you do a partner rate for us?',
      'Can you offer us a partnership rate if we work together long term?',
      'If we’re building a relationship here, can you give us a better rate?',
    ],
    userSituation:
      'A new client uses relationship language early and asks for a discount as a gesture of partnership.',
    userGoal:
      'Stay warm while avoiding a weak starting anchor.',
    searchIntentPrimary:
      'client asks for partner rate before working together',
    searchIntentSecondary:
      'partner rate request client reply',
    strategyPrimary:
      'Treat relationship language as goodwill, not as a substitute for a real commitment or pricing structure.',
    strategySecondary:
      'If there is genuine long-term potential, define what commitment would actually justify a different rate.',
    relatedScenarioSlugs: [
      'discount-for-future-work',
      'nonprofit-discount-request',
      'budget-cycle-discount-request',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_nonprofit_discount_request',
    slug: 'nonprofit-discount-request',
    title: 'Client asks for a nonprofit discount',
    h1: 'Client asks for a nonprofit discount',
    metaTitle: 'Client Asks for a Nonprofit Discount | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a nonprofit discount. Respond respectfully without letting mission-based pressure override business boundaries.',
    archetype: 'pricing_objection',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'We’re a nonprofit, so I wanted to ask if you offer any discounted pricing.',
    clientMessageVariants: [
      'We’re a nonprofit, so I wanted to ask if you offer any discounted pricing.',
      'Do you have a nonprofit rate for this kind of work?',
      'Since we’re mission-driven, I wanted to ask whether you discount your pricing.',
    ],
    userSituation:
      'The client appeals to mission, impact, or nonprofit status and asks whether you can lower the fee because of it.',
    userGoal:
      'Respond respectfully without letting values-based pressure override business boundaries.',
    searchIntentPrimary:
      'client asks for nonprofit discount how to respond',
    searchIntentSecondary:
      'nonprofit discount request client reply',
    strategyPrimary:
      'Acknowledge the mission respectfully while keeping your pricing logic anchored in the actual work and capacity required.',
    strategySecondary:
      'If you offer any flexibility, define it as a deliberate policy or tradeoff rather than an emotional exception.',
    relatedScenarioSlugs: [
      'partner-rate-request',
      'budget-cycle-discount-request',
      'discount-before-starting',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_budget_cycle_discount_request',
    slug: 'budget-cycle-discount-request',
    title: 'Client asks for a discount because their budget cycle is tight',
    h1: 'Client asks for a discount because their budget cycle is tight',
    metaTitle:
      'Discount Request Because Budget Cycle Is Tight | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a discount because their budget cycle is tight. Offer alternatives that protect your rate integrity.',
    archetype: 'pricing_objection',
    negotiationStage: 'post_quote',
    primaryClientMessage:
      'We’re tight on this quarter’s budget. Is there any way you can come down on the price?',
    clientMessageVariants: [
      'We’re tight on this quarter’s budget. Is there any way you can come down on the price?',
      'This quarter is tight on our side. Can you work with us on the number?',
      'Budget timing is the issue here. Can you lower it for this cycle?',
    ],
    userSituation:
      'The client says the timing of their budget is tight this quarter and asks for price relief rather than adjusting scope or timing.',
    userGoal:
      'Offer alternatives that protect rate integrity.',
    searchIntentPrimary:
      'client asks for discount because budget cycle is tight',
    searchIntentSecondary:
      'quarterly budget discount request client reply',
    strategyPrimary:
      'Treat budget timing as a planning constraint, not an automatic reason to cut the same work.',
    strategySecondary:
      'Offer phasing, a delayed start, or a smaller first step if timing is the real issue.',
    relatedScenarioSlugs: [
      'above-budget-range',
      'out-of-budget-but-interested',
      'discount-before-starting',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_bulk_discount_request',
    slug: 'bulk-discount-request',
    title: 'Client asks for a bulk discount for multiple deliverables',
    h1: 'Client asks for a bulk discount for multiple deliverables',
    metaTitle: 'Client Asks for a Bulk Discount | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a bulk discount for multiple deliverables. Evaluate package logic without devaluing the work.',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'If we roll all of this into one package, can you lower the overall price?',
    clientMessageVariants: [
      'If we roll all of this into one package, can you lower the overall price?',
      'If we bundle these deliverables together, can you do a package rate?',
      'We’re looking at multiple phases. Can you reduce the total if we include all of them now?',
    ],
    userSituation:
      'The client bundles several items or phases together and asks for a discount on the whole package.',
    userGoal:
      'Evaluate package logic without devaluing the work.',
    searchIntentPrimary:
      'client asks for bulk discount for multiple deliverables',
    searchIntentSecondary:
      'package pricing discount client reply',
    strategyPrimary:
      'Assess whether the bundled work creates real efficiency before discussing price movement.',
    strategySecondary:
      'If you offer a package structure, make the commercial logic explicit instead of treating size alone as a reason to discount.',
    relatedScenarioSlugs: [
      'discount-for-future-work',
      'discount-before-starting',
      'quick-approval-discount',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_quick_approval_discount',
    slug: 'quick-approval-discount',
    title: 'Client asks for a discount in exchange for approving quickly',
    h1: 'Client asks for a discount in exchange for approving quickly',
    metaTitle: 'Discount in Exchange for Quick Approval | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a discount in exchange for quick approval. Decide whether speed is a real concession and respond clearly.',
    archetype: 'pricing_objection',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'If you can bring this down today, I can get it approved right away.',
    clientMessageVariants: [
      'If you can bring this down today, I can get it approved right away.',
      'If you lower the price now, we can sign this off quickly.',
      'I can move fast on this if you sharpen the number today.',
    ],
    userSituation:
      'The client uses speed as leverage and suggests they will sign immediately if you lower the price now.',
    userGoal:
      'Decide whether speed is a real concession and respond without sounding rigid.',
    searchIntentPrimary:
      'client asks for discount in exchange for quick approval',
    searchIntentSecondary:
      'quick approval discount request client reply',
    strategyPrimary:
      'Do not treat faster approval as valuable by default unless it changes something real about the engagement.',
    strategySecondary:
      'If you offer anything, make it deliberate and conditional rather than a reflexive price drop under closing pressure.',
    relatedScenarioSlugs: [
      'ten-percent-off-request',
      'best-price-before-signing',
      'discount-before-starting',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_vague_project_quote',
    slug: 'vague-project-quote',
    title: 'Client message is too vague to quote the project properly',
    h1: 'Client message is too vague to quote the project properly',
    metaTitle:
      'Client Message Too Vague to Quote the Project | Flowdockr',
    metaDescription:
      'Use this scenario when a client message is too vague to quote the project properly. Ask for the missing details without creating friction.',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'Can you send me a quote for this? It’s a pretty straightforward project.',
    clientMessageVariants: [
      'Can you send me a quote for this? It’s a pretty straightforward project.',
      'Can you price this up for us? It should be simple.',
      'We just need a quick quote. It’s nothing too complicated.',
    ],
    userSituation:
      'A lead asks for a quote but gives very little usable detail, making it risky to price or promise anything accurately.',
    userGoal:
      'Ask for the missing details without sounding like you are creating friction.',
    searchIntentPrimary:
      'client message too vague to quote project',
    searchIntentSecondary:
      'vague brief quote request client reply',
    strategyPrimary:
      'Ask for the minimum clarifying information needed to make the quote meaningful instead of guessing.',
    strategySecondary:
      'Keep the request lightweight so the client feels guided, not blocked.',
    relatedScenarioSlugs: [
      'price-before-scope',
      'help-define-scope',
      'fixed-price-unclear-scope',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_changing_brief_before_quote',
    slug: 'changing-brief-before-quote',
    title: 'Client brief keeps changing before you quote',
    h1: 'Client brief keeps changing before you quote',
    metaTitle:
      'Client Brief Keeps Changing Before You Quote | Flowdockr',
    metaDescription:
      'Use this scenario when the client brief keeps changing before you quote. Slow the process down enough to define a stable brief.',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'Actually, let’s also include the landing page... and maybe email too. We’re still figuring it out.',
    clientMessageVariants: [
      'Actually, let’s also include the landing page... and maybe email too. We’re still figuring it out.',
      'The scope is still moving a bit, but can you quote it now anyway?',
      'We keep adding things as we think through it. Can you still price this up?',
    ],
    userSituation:
      'You are still in the quoting stage, but each new message changes the deliverables, priorities, or timeline.',
    userGoal:
      'Slow the process down enough to define a stable brief.',
    searchIntentPrimary:
      'client brief keeps changing before quote',
    searchIntentSecondary:
      'changing brief before quote client reply',
    strategyPrimary:
      'Pause the quoting motion long enough to confirm a stable brief and the assumptions a quote would be based on.',
    strategySecondary:
      'Guide the client toward a clearer scope checkpoint instead of guessing at a moving target.',
    relatedScenarioSlugs: [
      'vague-project-quote',
      'help-define-scope',
      'fixed-price-unclear-scope',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_timeline_before_assets',
    slug: 'timeline-before-assets',
    title: 'Client asks for a timeline before sharing what you need',
    h1: 'Client asks for a timeline before sharing what you need',
    metaTitle:
      'Client Asks for a Timeline Before Sharing Assets | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks for a timeline before sharing what you need. Clarify dependencies before committing to dates.',
    archetype: 'pricing_probe',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'How quickly can you get this done? We haven’t gathered everything yet, but roughly what would the timeline be?',
    clientMessageVariants: [
      'How quickly can you get this done? We haven’t gathered everything yet, but roughly what would the timeline be?',
      'Can you give us a timeline before we pull everything together?',
      'We do not have the assets yet, but how fast could this move on your side?',
    ],
    userSituation:
      'The client wants a delivery estimate but has not sent the assets, content, access, or dependencies required to judge timing.',
    userGoal:
      'Clarify dependencies before committing to a timeline.',
    searchIntentPrimary:
      'client asks for timeline before sharing assets',
    searchIntentSecondary:
      'timeline estimate before assets client reply',
    strategyPrimary:
      'Make the dependencies explicit so the client understands which inputs drive timing.',
    strategySecondary:
      'If you give any estimate, frame it as conditional on the missing inputs rather than as a fixed commitment.',
    relatedScenarioSlugs: [
      'price-before-scope',
      'vague-project-quote',
      'what-is-included',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_what_is_included',
    slug: 'what-is-included',
    title: 'Client asks exactly what is included before approving',
    h1: 'Client asks exactly what is included before approving',
    metaTitle:
      'What Is Included Before Approving: How to Reply | Flowdockr',
    metaDescription:
      'Use this scenario when a client asks exactly what is included before approving. Clarify boundaries clearly so the deal closes with fewer surprises.',
    archetype: 'expectation_management',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'Before we approve this, can you outline exactly what’s included and what’s not?',
    clientMessageVariants: [
      'Before we approve this, can you outline exactly what’s included and what’s not?',
      'Can you break down precisely what is covered before we sign off?',
      'I want to make sure we’re aligned on what is and is not included here.',
    ],
    userSituation:
      'The client is close to moving forward but wants a tighter explanation of what is and is not included in the work.',
    userGoal:
      'Clarify boundaries clearly so the deal closes with fewer surprises later.',
    searchIntentPrimary:
      'client asks what is included before approving',
    searchIntentSecondary:
      'scope inclusions client reply',
    strategyPrimary:
      'Spell out inclusions and exclusions in plain language so the agreement is clearer before work begins.',
    strategySecondary:
      'Use the clarification to prevent later scope disputes rather than treating it as a side question.',
    relatedScenarioSlugs: [
      'fixed-price-unclear-scope',
      'deliverables-vs-outcomes',
      'skip-discovery',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_unclear_process',
    slug: 'unclear-process',
    title: 'Client is confused about your process or phases',
    h1: 'Client is confused about your process or phases',
    metaTitle: 'Client Is Confused About Your Process | Flowdockr',
    metaDescription:
      'Use this scenario when a client is confused about your process or phases. Increase trust by explaining how the project runs step by step.',
    archetype: 'expectation_management',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'Can you explain how this would actually work step by step? I’m not fully clear on the process.',
    clientMessageVariants: [
      'Can you explain how this would actually work step by step? I’m not fully clear on the process.',
      'I’m interested, but I’m not sure how your process actually runs.',
      'Can you walk me through the phases so I know what to expect?',
    ],
    userSituation:
      'The client seems interested but is hesitant because they do not understand how the project will run from kickoff to delivery.',
    userGoal:
      'Increase trust by clarifying the process in simple terms.',
    searchIntentPrimary:
      'client is confused about your process how to respond',
    searchIntentSecondary:
      'explain project process to client reply',
    strategyPrimary:
      'Turn your process into a simple sequence the client can picture instead of abstract service language.',
    strategySecondary:
      'Use the explanation to reduce uncertainty and make next steps feel easier to approve.',
    relatedScenarioSlugs: [
      'help-define-scope',
      'skip-discovery',
      'what-is-included',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_skip_discovery',
    slug: 'skip-discovery',
    title: 'Client wants to skip discovery and go straight to execution',
    h1: 'Client wants to skip discovery and go straight to execution',
    metaTitle:
      'Client Wants to Skip Discovery and Go Straight to Execution | Flowdockr',
    metaDescription:
      'Use this scenario when a client wants to skip discovery and go straight to execution. Explain why discovery matters without sounding bureaucratic.',
    archetype: 'expectation_management',
    negotiationStage: 'early_inquiry',
    primaryClientMessage:
      'Can we skip the discovery part and just get started on the actual work?',
    clientMessageVariants: [
      'Can we skip the discovery part and just get started on the actual work?',
      'Do we really need discovery, or can we go straight into delivery?',
      'We’d rather skip the planning phase and start executing now.',
    ],
    userSituation:
      'You need a discovery or planning phase to do the work well, but the client wants to jump directly into deliverables to save time or money.',
    userGoal:
      'Explain why discovery matters without sounding bureaucratic.',
    searchIntentPrimary:
      'client wants to skip discovery and go straight to execution',
    searchIntentSecondary:
      'skip discovery phase client reply',
    strategyPrimary:
      'Frame discovery as the step that reduces wasted work and protects the result, not as process for process’s sake.',
    strategySecondary:
      'If the client wants speed, explain what risk they are choosing by removing the discovery layer.',
    relatedScenarioSlugs: [
      'help-define-scope',
      'unclear-process',
      'fixed-price-unclear-scope',
    ],
    priority: 'p1',
  }),
  createDatasetScenario({
    id: 'scn_v1_deliverables_vs_outcomes',
    slug: 'deliverables-vs-outcomes',
    title: 'Client is unclear on deliverables versus outcomes',
    h1: 'Client is unclear on deliverables versus outcomes',
    metaTitle:
      'Client Is Unclear on Deliverables vs Outcomes | Flowdockr',
    metaDescription:
      'Use this scenario when a client mixes deliverables with outcomes. Clarify what you are delivering and what depends on broader factors.',
    archetype: 'expectation_management',
    negotiationStage: 'active_negotiation',
    primaryClientMessage:
      'I just want to be sure this includes the actual results we’re aiming for, not just the files or deliverables.',
    clientMessageVariants: [
      'I just want to be sure this includes the actual results we’re aiming for, not just the files or deliverables.',
      'I want to make sure this guarantees the result, not just the output.',
      'Are you delivering the assets, or are you also responsible for the final outcome here?',
    ],
    userSituation:
      'The conversation is getting messy because the client is mixing business goals with concrete deliverables and expects both to be guaranteed the same way.',
    userGoal:
      'Clarify what you are delivering versus what results depend on broader factors.',
    searchIntentPrimary:
      'client unclear on deliverables versus outcomes',
    searchIntentSecondary:
      'deliverables vs outcomes client reply',
    strategyPrimary:
      'Separate what you control directly from the broader business outcome so expectations stay realistic.',
    strategySecondary:
      'Stay clear and commercially useful rather than sounding evasive about responsibility.',
    relatedScenarioSlugs: [
      'what-is-included',
      'unclear-process',
      'help-define-scope',
    ],
    priority: 'p1',
  }),
];
