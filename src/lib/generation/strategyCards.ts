import type { Scenario } from '@/lib/scenarios';
import type { GenerateReplyRequest } from '@/types/generation';

type ServiceType = NonNullable<GenerateReplyRequest['serviceType']>;

export type StrategyCardSource = 'top10' | 'compat';

export type ServiceAdjustment = {
  scopeLever: string;
  caution: string;
};

export type StrategyCard = {
  slug: string;
  title: string;
  primaryGoal: string;
  pressureType:
    | 'pricing_pushback'
    | 'budget_limit'
    | 'price_comparison'
    | 'decision_delay'
    | 'follow_up'
    | 'payment_collection'
    | 'scope_expansion'
    | 'revision_pressure'
    | 'start_without_commitment'
    | 'availability_boundary'
    | 'urgency_pressure'
    | 'project_decline';
  userPositioning: string;
  counterpartMindset: string;
  requiredReframe: string;
  allowedConcessions: string[];
  forbiddenConcessions: string[];
  redFlags: string[];
  preferredMoves: string[];
  avoidMoves: string[];
  nextStepTemplates: string[];
  toneProfile: string;
  serviceAdjustments?: Partial<Record<ServiceType, ServiceAdjustment>>;
};

const PRICING_SERVICE_ADJUSTMENTS: Partial<
  Record<ServiceType, ServiceAdjustment>
> = {
  designer: {
    scopeLever: 'reduce concept count, revision rounds, or asset variants',
    caution: 'Do not keep the same creative rounds at a lower fee.',
  },
  developer: {
    scopeLever: 'phase features, integrations, or QA depth',
    caution: 'Do not compress the same build scope into the smaller budget.',
  },
  copywriter: {
    scopeLever: 'reduce page count, research depth, or revision rounds',
    caution:
      'Do not discount the same number of deliverables without a tradeoff.',
  },
  marketer: {
    scopeLever: 'narrow channels, campaign scope, or reporting cadence',
    caution: 'Do not promise the full channel mix at the reduced fee.',
  },
  video_editor: {
    scopeLever:
      'trim cut count, runtime, motion complexity, or revision rounds',
    caution: 'Do not keep unlimited revisions or extra cutdowns bundled in.',
  },
  consultant: {
    scopeLever:
      'reduce session count, workshop depth, or follow-up deliverables',
    caution: 'Do not leave advisory access open-ended while lowering price.',
  },
  other: {
    scopeLever: 'shrink deliverables, phases, or turnaround obligations',
    caution: 'Do not lower the number while leaving the scope vague.',
  },
};

const SCOPE_SERVICE_ADJUSTMENTS: Partial<
  Record<ServiceType, ServiceAdjustment>
> = {
  designer: {
    scopeLever: 'move extra screens, concepts, or rounds into a change request',
    caution: 'Do not absorb “small” extras that create a new baseline.',
  },
  developer: {
    scopeLever:
      'separate extra features, integrations, or support into a follow-on phase',
    caution:
      'Do not merge new technical work into the current sprint for free.',
  },
  copywriter: {
    scopeLever: 'scope extra pages, interviews, or revisions separately',
    caution: 'Do not let content additions hide inside the original brief.',
  },
  marketer: {
    scopeLever:
      'split new channels, assets, or analytics requests into add-ons',
    caution: 'Do not add campaign work without naming time and ownership.',
  },
  video_editor: {
    scopeLever: 'scope extra cuts, subtitles, or platform versions separately',
    caution: 'Do not treat extra exports as invisible effort.',
  },
  consultant: {
    scopeLever: 'separate added sessions, deliverables, or advisory access',
    caution: 'Do not allow informal requests to become standing scope.',
  },
  other: {
    scopeLever:
      'define any added deliverable as a scoped change before doing it',
    caution: 'Do not rely on goodwill language instead of naming the change.',
  },
};

const TOP_STRATEGY_CARDS: StrategyCard[] = [
  {
    slug: 'quote-too-high',
    title: 'Client says your quote is too high',
    primaryGoal:
      'Protect the price anchor while reopening the conversation around value and scope.',
    pressureType: 'pricing_pushback',
    userPositioning:
      'You already scoped the work and need to sound calm, credible, and commercially grounded.',
    counterpartMindset:
      'They are testing whether the quote is flexible or whether the value is actually tied to outcomes.',
    requiredReframe:
      'Treat price as a reflection of scope, risk, and execution quality, not a number to defend emotionally.',
    allowedConcessions: [
      'Offer a leaner scope or phased first step.',
      'Clarify assumptions behind the quote.',
    ],
    forbiddenConcessions: [
      'Discount the same scope immediately.',
      'Turn the reply into a defensive line-item essay.',
    ],
    redFlags: [
      'Fast discounting weakens the anchor.',
      'Over-explaining makes the price sound negotiable by default.',
    ],
    preferredMoves: [
      'Re-anchor on outcomes and what is included.',
      'Offer scope adjustment only if budget is real.',
      'End with a concrete path forward.',
    ],
    avoidMoves: [
      'Apologizing for the quote.',
      'Vague “I can be flexible” language.',
    ],
    nextStepTemplates: [
      'If budget is the issue, I can outline a leaner version that still protects the core result.',
      'If helpful, I can send two options so you can compare full scope versus a smaller first phase.',
    ],
    toneProfile: 'Calm, value-led, and commercially steady.',
    serviceAdjustments: PRICING_SERVICE_ADJUSTMENTS,
  },
  {
    slug: 'discount-request',
    title: 'Client asks for a discount',
    primaryGoal:
      'Keep the base rate intact unless the client accepts a real tradeoff.',
    pressureType: 'pricing_pushback',
    userPositioning:
      'You need to stay cooperative without teaching the client that your rate is arbitrary.',
    counterpartMindset: 'They want a concession first and clarity later.',
    requiredReframe:
      'Any movement on price must be tied to scope, timing, or commitment.',
    allowedConcessions: [
      'Offer a smaller scope or faster commitment tradeoff.',
      'Convert vague future-work promises into defined terms.',
    ],
    forbiddenConcessions: [
      'Give an unearned percentage discount.',
      'Accept “long-term potential” as a substitute for commitment.',
    ],
    redFlags: [
      'Discount-first language invites more pressure.',
      'Vague future work is not a concession trigger.',
    ],
    preferredMoves: [
      'Ask what constraint they are trying to solve.',
      'Tie any movement to a specific tradeoff.',
      'Keep the reply short and commercial.',
    ],
    avoidMoves: [
      'Negotiating against yourself.',
      'Sounding defensive about your margin.',
    ],
    nextStepTemplates: [
      'If we need to hit a different number, the cleanest route is to adjust scope or structure rather than reduce the same deliverables.',
      'If this is tied to timing or a longer-term arrangement, I can outline what that would need to look like.',
    ],
    toneProfile: 'Confident, cooperative, and conditional.',
    serviceAdjustments: PRICING_SERVICE_ADJUSTMENTS,
  },
  {
    slug: 'cheaper-freelancer',
    title: 'Client says another freelancer is cheaper',
    primaryGoal:
      'Avoid a commodity comparison and move the decision back to fit, scope, and reliability.',
    pressureType: 'price_comparison',
    userPositioning:
      'You are not trying to “win” the cheaper quote. You are trying to frame the comparison correctly.',
    counterpartMindset:
      'They want to see whether you will race downward or explain the difference in a credible way.',
    requiredReframe:
      'Competing numbers only matter when the scope, process, and delivery standard are comparable.',
    allowedConcessions: [
      'Offer a narrower option if budget is truly the blocker.',
      'Help them compare like-for-like scope.',
    ],
    forbiddenConcessions: [
      'Attack the other freelancer.',
      'Match the lower price without changing the work.',
    ],
    redFlags: [
      'Price matching without scope change destroys positioning.',
      'Defensive comparisons sound insecure.',
    ],
    preferredMoves: [
      'Acknowledge the comparison without reacting emotionally.',
      'Reframe around scope, reliability, and execution standard.',
      'Offer a scope-based alternative if needed.',
    ],
    avoidMoves: [
      'Trying to justify yourself with too many words.',
      'Pretending price does not matter at all.',
    ],
    nextStepTemplates: [
      'If the lower quote reflects a different scope, I can map the tradeoffs so you are comparing the same thing.',
      'If budget is the issue, I can suggest a narrower version rather than force the original scope into that number.',
    ],
    toneProfile: 'Measured, unthreatened, and comparison-savvy.',
    serviceAdjustments: PRICING_SERVICE_ADJUSTMENTS,
  },
  {
    slug: 'meet-their-budget',
    title: 'Client asks if you can meet their budget',
    primaryGoal:
      'Treat the budget as a planning constraint, not a reason to compress the same scope.',
    pressureType: 'budget_limit',
    userPositioning:
      'You need to stay workable while protecting the integrity of the original quote.',
    counterpartMindset:
      'They are finally naming the number and hoping you will make the current scope fit it.',
    requiredReframe:
      'Budget can define the version of the project, but it does not redefine the workload for free.',
    allowedConcessions: [
      'Offer a leaner scope or phased rollout.',
      'Clarify the minimum viable version.',
    ],
    forbiddenConcessions: [
      'Say yes to the budget without changing assumptions.',
      'Pretend the same result can be delivered with less effort.',
    ],
    redFlags: [
      'Ambiguous “we can make it work” language creates hidden scope debt.',
      'Budget sympathy without structure leads to underpricing.',
    ],
    preferredMoves: [
      'Acknowledge the budget plainly.',
      'Translate the budget into scope or sequencing options.',
      'Ask them to choose between clear paths.',
    ],
    avoidMoves: [
      'Relitigating every line item.',
      'Saying no without a structured alternative.',
    ],
    nextStepTemplates: [
      'At that budget, the cleanest option is to narrow the scope to the highest-priority deliverables.',
      'If helpful, I can send a lean version and a fuller version so you can decide which path makes sense.',
    ],
    toneProfile: 'Constructive, constraint-aware, and clear about tradeoffs.',
    serviceAdjustments: PRICING_SERVICE_ADJUSTMENTS,
  },
  {
    slug: 'reviewing-internally-no-response',
    title: 'Client says they are reviewing internally and then goes quiet',
    primaryGoal:
      'Restart momentum without sounding needy or forcing a decision too aggressively.',
    pressureType: 'decision_delay',
    userPositioning:
      'You need to make it easy for the client to re-engage while keeping your positioning intact.',
    counterpartMindset:
      'They are stalled, distracted, or comparing options and need a low-friction next step.',
    requiredReframe:
      'The job of the follow-up is to reduce friction and create a clean decision path, not to guilt them into replying.',
    allowedConcessions: [
      'Offer clarification help.',
      'Make the next response easy with a specific prompt or option.',
    ],
    forbiddenConcessions: [
      'Guilt-heavy chasing.',
      'Artificial urgency with no business basis.',
    ],
    redFlags: [
      'Repeated check-ins with no decision path look needy.',
      'Long emotional follow-ups erode confidence.',
    ],
    preferredMoves: [
      'Reference the review context briefly.',
      'Offer a low-pressure next step.',
      'Keep the note concise enough to send as-is.',
    ],
    avoidMoves: [
      'Over-explaining your availability.',
      'Asking broad “just following up” questions.',
    ],
    nextStepTemplates: [
      'If it is still under review, I am happy to clarify scope or recommend the cleanest next step.',
      'If timing changed on your side, no problem. If it is still live, I can help you decide between the available options.',
    ],
    toneProfile: 'Light-touch, decision-oriented, and low-pressure.',
  },
  {
    slug: 'ghosted-after-rate',
    title: 'Client ghosted after asking your rate',
    primaryGoal:
      'Reopen the conversation with a short, low-pressure message that gives the client an easy way back in.',
    pressureType: 'follow_up',
    userPositioning:
      'You do not need to chase hard. You need to make responding feel easy and worthwhile.',
    counterpartMindset:
      'They may have sticker shock, competing options, or simple inbox drift.',
    requiredReframe:
      'The follow-up should recover momentum and clarify the next step without apologizing for the rate.',
    allowedConcessions: [
      'Offer to clarify scope or options.',
      'Mention a smaller first step if budget is the issue.',
    ],
    forbiddenConcessions: [
      'Pre-emptive discounting in the follow-up.',
      'Multiple pressure signals in one message.',
    ],
    redFlags: [
      'A needy tone confirms the client should keep delaying.',
      'Discounting before they re-engage weakens your position.',
    ],
    preferredMoves: [
      'Reference the prior pricing conversation briefly.',
      'Offer clarification help or a structured option.',
      'End with an easy yes/no style response path.',
    ],
    avoidMoves: [
      'Long reminders.',
      'Assuming they rejected you without saying so.',
    ],
    nextStepTemplates: [
      'If budget is the sticking point, I can suggest a narrower option instead of forcing the original scope.',
      'If this is still active, I am happy to clarify anything you need to make a decision.',
    ],
    toneProfile: 'Short, confident, and easy to answer.',
  },
  {
    slug: 'unpaid-invoice-follow-up',
    title: 'Follow up on an unpaid invoice',
    primaryGoal:
      'Get a concrete payment update without softening the payment boundary.',
    pressureType: 'payment_collection',
    userPositioning:
      'You are entitled to clarity on timing and payment status. The note should sound direct, not apologetic.',
    counterpartMindset:
      'They may be slow, disorganized, or hoping the delay carries no consequence.',
    requiredReframe:
      'This is not a relationship check-in. It is a payment-status message tied to an overdue invoice.',
    allowedConcessions: [
      'Acknowledge internal processing if they mention it.',
      'Ask for a concrete payment date if they need more time.',
    ],
    forbiddenConcessions: [
      'Vague “just checking in” language.',
      'Continuing the thread without a clear ask.',
    ],
    redFlags: [
      'Soft language lets the invoice stay ambiguous.',
      'Missing dates or invoice references weakens urgency.',
    ],
    preferredMoves: [
      'Name the invoice status and due date plainly.',
      'Ask for the exact payment timing or next action.',
      'Keep the tone professional and brief.',
    ],
    avoidMoves: [
      'Emotional frustration.',
      'Passive wording with no direct ask.',
    ],
    nextStepTemplates: [
      'Please confirm the payment date for the outstanding invoice so I can update my records accordingly.',
      'If there is an issue with the invoice on your side, let me know what is needed so we can clear it quickly.',
    ],
    toneProfile: 'Polite, firm, and invoice-specific.',
  },
  {
    slug: 'scope-creep-polite-response',
    title: 'Handle scope creep politely',
    primaryGoal:
      'Protect the original agreement while keeping the conversation collaborative.',
    pressureType: 'scope_expansion',
    userPositioning:
      'You want to stay helpful without training the client that extra work is included by default.',
    counterpartMindset:
      'They often see the extra ask as small and expect flexibility.',
    requiredReframe:
      'Name the extra work as a scope change and turn it into a choice, not an assumption.',
    allowedConcessions: [
      'Offer to swap priorities inside the current scope.',
      'Quote the add-on or next phase clearly.',
    ],
    forbiddenConcessions: [
      'Absorb the added work silently.',
      'Let “quick” replace actual effort.',
    ],
    redFlags: [
      'One exception can become the new baseline.',
      'Vague boundary language invites more additions.',
    ],
    preferredMoves: [
      'Acknowledge the request without agreeing yet.',
      'Name the scope impact clearly.',
      'Offer keep/swap/expand options.',
    ],
    avoidMoves: [
      'Defensive tone.',
      'Doing the work first and clarifying later.',
    ],
    nextStepTemplates: [
      'The cleanest next step is to decide whether we keep the current scope, swap priorities, or add this as a scoped extension.',
      'If you want this included, I can outline the change in scope, timing, and cost so you can choose the best route.',
    ],
    toneProfile: 'Polite, boundary-clear, and option-oriented.',
    serviceAdjustments: SCOPE_SERVICE_ADJUSTMENTS,
  },
  {
    slug: 'unlimited-revisions',
    title: 'Client asks for unlimited revisions',
    primaryGoal:
      'Hold a revision boundary while keeping the client confident that refinement is still supported.',
    pressureType: 'revision_pressure',
    userPositioning: 'You need to sound structured, not inflexible.',
    counterpartMindset:
      'They want certainty that feedback will be accommodated without extra friction.',
    requiredReframe:
      'Revisions are a quality-control structure, not a refusal to collaborate.',
    allowedConcessions: [
      'Offer a defined revision count or paid add-on rounds.',
      'Explain how the revision structure protects speed and focus.',
    ],
    forbiddenConcessions: [
      'Agree to unlimited revisions.',
      'Make the client feel punished for normal feedback.',
    ],
    redFlags: [
      'Unlimited revision language turns time risk into your problem.',
      'Hard-no wording can sound uncooperative if you do not offer structure.',
    ],
    preferredMoves: [
      'Frame revision limits as part of a reliable process.',
      'Offer a clear alternative for extra rounds.',
      'Keep the tone calm and practical.',
    ],
    avoidMoves: [
      'Talking only about your boundaries.',
      'Using policy language with no client benefit.',
    ],
    nextStepTemplates: [
      'I usually scope a defined number of revision rounds so feedback stays focused and timing stays predictable.',
      'If you expect more iteration than that, I can price extra rounds separately so the process stays clear on both sides.',
    ],
    toneProfile: 'Process-led, reassuring, and firm on limits.',
    serviceAdjustments: SCOPE_SERVICE_ADJUSTMENTS,
  },
  {
    slug: 'start-before-payment',
    title: 'Client wants you to start before payment',
    primaryGoal: 'Protect kickoff terms without sounding rigid or distrustful.',
    pressureType: 'start_without_commitment',
    userPositioning:
      'You can move fast once the commercial basics are in place, but not before.',
    counterpartMindset:
      'They want urgency benefits without accepting the normal commitment step yet.',
    requiredReframe:
      'Starting work is a commercial milestone that follows the agreed payment or kickoff condition.',
    allowedConcessions: [
      'Offer to reserve time or prepare the kickoff path.',
      'Explain how quickly you can begin once payment is in place.',
    ],
    forbiddenConcessions: [
      'Starting billable work before the agreed trigger.',
      'Leaving kickoff terms implied instead of explicit.',
    ],
    redFlags: [
      'Urgency often hides commitment avoidance.',
      'Informal “just start now” language creates collection risk.',
    ],
    preferredMoves: [
      'Acknowledge the urgency.',
      'State the kickoff condition clearly.',
      'Make the next payment step easy and specific.',
    ],
    avoidMoves: [
      'Sounding suspicious or accusatory.',
      'Explaining your policy at length.',
    ],
    nextStepTemplates: [
      'I can move quickly once the deposit and kickoff details are confirmed, and I can reserve the slot for you in the meantime.',
      'As soon as that step is in place, I can start and keep the timeline moving.',
    ],
    toneProfile: 'Calm, protected, and operationally clear.',
  },
  {
    slug: 'client-messaging-outside-work-hours',
    title: 'Client messages outside work hours',
    primaryGoal:
      'Reset after-hours messaging expectations without turning one message into a confrontation.',
    pressureType: 'availability_boundary',
    userPositioning:
      'You want to stay responsive, but not teach the client that off-hours access is part of the service.',
    counterpartMindset:
      'They may be stressed or simply following the responsiveness pattern they have seen from you.',
    requiredReframe:
      'Treat the issue as a communication-structure boundary, not a personal annoyance.',
    allowedConcessions: [
      'Acknowledge the message and give the next working window.',
      'Define urgent exceptions only if they are truly needed.',
    ],
    forbiddenConcessions: [
      'Normalize instant after-hours replies.',
      'Scold the client for messaging late.',
    ],
    redFlags: [
      'Every instant after-hours reply becomes a new expectation.',
      'A defensive tone makes the boundary feel personal instead of professional.',
    ],
    preferredMoves: [
      'Acknowledge the message calmly.',
      'Set the normal response window clearly.',
      'Separate urgent from normal communication only if needed.',
    ],
    avoidMoves: [
      'Complaining about your personal time.',
      'Leaving the next response window vague.',
    ],
    nextStepTemplates: [
      'I have seen this and will pick it up in my next working window so timing stays predictable on both sides.',
      'For normal project items I reply during working hours, and if something is genuinely urgent we can define that separately.',
    ],
    toneProfile: 'Calm, matter-of-fact, and boundary-led.',
  },
  {
    slug: 'set-boundaries-with-demanding-client',
    title: 'Set boundaries with a demanding client',
    primaryGoal:
      'Reset a demanding-client relationship into a clearer working structure before it becomes fully reactive.',
    pressureType: 'availability_boundary',
    userPositioning:
      'You need to sound structured and commercially steady, not emotional or resentful.',
    counterpartMindset:
      'They are pushing on access, responsiveness, or flexibility and will keep testing the edges until the structure is visible.',
    requiredReframe:
      'Make the reply about the working model, not about the client being difficult.',
    allowedConcessions: [
      'Clarify how requests, revisions, and response timing should run going forward.',
      'Offer to revisit scope or support structure if the client truly needs more access.',
    ],
    forbiddenConcessions: [
      'Keep solving a pattern one message at a time.',
      'Turn the reply into criticism of the client’s behavior.',
    ],
    redFlags: [
      'Fragmented one-off resets train the client to negotiate every boundary separately.',
      'Personal or emotional language invites argument instead of compliance.',
    ],
    preferredMoves: [
      'Define the working model clearly.',
      'Reset the drifting expectation directly.',
      'Escalate into scope, timing, or support changes only if needed.',
    ],
    avoidMoves: [
      'Sounding annoyed.',
      'Threatening consequences before you have stated the structure.',
    ],
    nextStepTemplates: [
      'To keep this working cleanly, I need to handle requests and response timing inside a clearer structure rather than as open-ended live asks.',
      'If you need a higher-touch setup than the current arrangement supports, we can revisit scope, timing, or support structure directly.',
    ],
    toneProfile: 'Firm, structured, and low-drama.',
  },
  {
    slug: 'tell-client-you-are-unavailable',
    title: 'Tell a client you are unavailable',
    primaryGoal:
      'Communicate unavailability in a way that sounds reliable rather than flaky or guilty.',
    pressureType: 'availability_boundary',
    userPositioning:
      'You need a short, clear answer that protects the current window without sounding evasive.',
    counterpartMindset:
      'They mostly need timing clarity, not a long explanation of why you are unavailable.',
    requiredReframe:
      'Treat the reply as expectation-setting, not permission-seeking.',
    allowedConcessions: [
      'Give the next realistic response window.',
      'Offer a fallback only if there is a real deadline to solve around.',
    ],
    forbiddenConcessions: [
      'Over-explaining the reason for being unavailable.',
      'Leaving the next touchpoint so vague that pressure stays high.',
    ],
    redFlags: [
      'Long apologetic explanations sound unstable.',
      'A vague “later” answer does not actually reduce the client’s uncertainty.',
    ],
    preferredMoves: [
      'State that you are unavailable directly.',
      'Give the next realistic window.',
      'Keep the tone calm and brief.',
    ],
    avoidMoves: [
      'Guilt-heavy language.',
      'Softening the boundary until it no longer exists.',
    ],
    nextStepTemplates: [
      'I am not available to pick this up right now, but I can return to it in the next working window and update you from there.',
      'If there is a hard deadline before then, let me know and I can tell you whether there is a realistic way to handle it cleanly.',
    ],
    toneProfile: 'Calm, brief, and dependable.',
  },
  {
    slug: 'urgent-request-last-minute',
    title: 'Respond to an urgent last-minute request',
    primaryGoal:
      'Acknowledge urgency while forcing the real scope, timing, or rush tradeoff into the open.',
    pressureType: 'urgency_pressure',
    userPositioning:
      'You want to stay helpful without turning last-minute urgency into a free automatic yes.',
    counterpartMindset:
      'They want relief fast and may not have thought through what has to change to make the timeline real.',
    requiredReframe:
      'Treat urgency as a new decision point with tradeoffs, not as a command to compress the same work for free.',
    allowedConcessions: [
      'Offer a smaller immediate scope.',
      'Define an explicit rush path or realistic delivery window.',
    ],
    forbiddenConcessions: [
      'Promise the full request before checking feasibility.',
      'Absorb rush work into the normal timeline assumptions.',
    ],
    redFlags: [
      'Urgency language can hide a scope or availability tradeoff no one has named yet.',
      'Panic promises create delivery and relationship risk later.',
    ],
    preferredMoves: [
      'Acknowledge the urgency first.',
      'Set the realistic window before you commit.',
      'Tie speed to scope reduction or explicit rush conditions.',
    ],
    avoidMoves: [
      'Reacting as if urgency automatically decides the plan.',
      'Using defensive language about the client’s timing.',
    ],
    nextStepTemplates: [
      'I understand this is urgent, and before I commit I want to be clear about what is realistically possible in this window.',
      'If speed is the priority, the cleanest route is to reduce the immediate scope or treat it as a rush request rather than force the full version through unchanged.',
    ],
    toneProfile: 'Decision-oriented, realistic, and unflustered.',
    serviceAdjustments: SCOPE_SERVICE_ADJUSTMENTS,
  },
  {
    slug: 'client-expects-immediate-response',
    title: 'Client expects an immediate response',
    primaryGoal:
      'Reset the expectation from instant replies to a predictable communication rhythm.',
    pressureType: 'availability_boundary',
    userPositioning:
      'You want to stay engaged and responsive, but not on an always-on basis.',
    counterpartMindset:
      'They are anchoring on the fastest response pattern they have seen from you and treating it as the standard.',
    requiredReframe:
      'Frame the boundary around predictability and service quality, not personal convenience.',
    allowedConcessions: [
      'Offer a clear response window during working hours.',
      'Define what genuinely urgent communication looks like.',
    ],
    forbiddenConcessions: [
      'Accept immediate replies as the default norm.',
      'Make the boundary sound like disinterest or withdrawal.',
    ],
    redFlags: [
      'The fastest past reply quickly becomes the future baseline.',
      'Vague timing language does not reset the expectation.',
    ],
    preferredMoves: [
      'Set the normal response cadence.',
      'Separate urgent from non-urgent communication.',
      'Anchor on dependable, predictable timing.',
    ],
    avoidMoves: [
      'Talking about your frustration.',
      'Promising faster replies than you actually want to keep.',
    ],
    nextStepTemplates: [
      'I am not always available to reply immediately, but I do keep a consistent response window during working hours so communication stays predictable.',
      'For normal project items I reply in that standard window, and if something is genuinely urgent we can define that separately.',
    ],
    toneProfile: 'Calm, predictable, and clear.',
  },
  {
    slug: 'say-no-to-client-professionally',
    title: 'Say no to a client professionally',
    primaryGoal:
      'Deliver a clear professional no that closes the loop without unnecessary awkwardness or guilt.',
    pressureType: 'project_decline',
    userPositioning:
      'You need the reply to feel respectful and complete, but not so soft that it invites more pressure.',
    counterpartMindset:
      'They mostly need clarity, and they will often push harder if the no sounds uncertain.',
    requiredReframe:
      'Treat the message as a closed-loop professional decision, not an apology for declining.',
    allowedConcessions: [
      'Offer a short fit-based reason if it helps land the no.',
      'Use a warm closing line that does not reopen the discussion.',
    ],
    forbiddenConcessions: [
      'Burying the no under too much politeness.',
      'Giving a long explanation that becomes negotiable.',
    ],
    redFlags: [
      'Ambiguous declines create more pressure than honest ones.',
      'Guilt-heavy wording invites the client to solve your reason.',
    ],
    preferredMoves: [
      'Thank them briefly.',
      'State the no clearly.',
      'Close the loop without leaving a vague maybe.',
    ],
    avoidMoves: [
      'Over-apologizing.',
      'Offering false future optionality.',
    ],
    nextStepTemplates: [
      'Thanks for thinking of me for this. I am going to pass, but I wanted to let you know clearly rather than leave the conversation hanging.',
      'I appreciate the opportunity. I do not think I would be the right fit for this as it stands, so I am going to step back rather than force it.',
    ],
    toneProfile: 'Warm-firm, respectful, and settled.',
  },
  {
    slug: 'decline-project-politely',
    title: 'Decline a project politely',
    primaryGoal:
      'Close the thread with a polite decline that still sounds decisive enough to end the conversation.',
    pressureType: 'project_decline',
    userPositioning:
      'You want to be kind and clear at the same time, without writing a long explanation.',
    counterpartMindset:
      'They mainly need to understand whether this is a real no or just hesitation.',
    requiredReframe:
      'Polite does not mean vague; a good decline is respectful and settled.',
    allowedConcessions: [
      'Use a brief fit-based reason if it helps the reply land.',
      'Offer a warm closing line that does not reopen the project.',
    ],
    forbiddenConcessions: [
      'Turning the no into a maybe.',
      'Explaining enough detail for the client to negotiate every reason.',
    ],
    redFlags: [
      'A polite-but-unclear reply keeps the thread alive.',
      'Over-explaining weakens the finality of the decision.',
    ],
    preferredMoves: [
      'Lead with a quick thank-you.',
      'Decline in plain language.',
      'End cleanly rather than inviting more questions.',
    ],
    avoidMoves: [
      'Long prefacing before the actual no.',
      'Hedging the decision at the end.',
    ],
    nextStepTemplates: [
      'Thanks for considering me for this. I am going to pass on the project, but I wanted to let you know clearly rather than leave it open-ended.',
      'I appreciate the opportunity, but I am going to step back on this one rather than take it on without the right fit.',
    ],
    toneProfile: 'Warm-firm and complete.',
  },
  {
    slug: 'reject-client-without-burning-bridge',
    title: 'Reject a client without burning the bridge',
    primaryGoal:
      'Hold a clear no while preserving goodwill and future optionality where it is genuine.',
    pressureType: 'project_decline',
    userPositioning:
      'You want the decline to feel settled and respectful, not slippery or personal.',
    counterpartMindset:
      'They will usually trust a calm, honest no more than a vague attempt to sound nice.',
    requiredReframe:
      'Protect the bridge through clarity and tone, not by weakening the decision.',
    allowedConcessions: [
      'Frame the no around fit rather than criticism.',
      'Use a selective positive close if it does not reopen the current project.',
    ],
    forbiddenConcessions: [
      'Criticizing the client or project unnecessarily.',
      'Leaving the no ambiguous in the name of being nice.',
    ],
    redFlags: [
      'Trying too hard to preserve goodwill can make the message less trustworthy.',
      'A fake future invitation is easy for the client to test immediately.',
    ],
    preferredMoves: [
      'Decline with appreciation.',
      'Ground the no in fit or alignment.',
      'Keep any future-open line narrow and genuine.',
    ],
    avoidMoves: [
      'Personal criticism.',
      'Overly open-ended future language.',
    ],
    nextStepTemplates: [
      'I appreciate you thinking of me for this. I am going to pass on the current opportunity, but I wanted to let you know directly and respectfully.',
      'I do not think I would be the right fit for the current version, so I would rather be honest now than create friction later.',
    ],
    toneProfile: 'Warm, clear, and bridge-safe.',
  },
  {
    slug: 'turn-down-freelance-work-nicely',
    title: 'Turn down freelance work nicely',
    primaryGoal:
      'Keep the decline kind and concise while still making it unmistakably clear that the answer is no.',
    pressureType: 'project_decline',
    userPositioning:
      'You want a friendly message that still sounds like a decision rather than hesitation.',
    counterpartMindset:
      'They mostly want a quick clear answer and can misread overly gentle phrasing as maybe.',
    requiredReframe:
      'Nice should describe the tone, not the certainty level.',
    allowedConcessions: [
      'Add a light fit reason if it helps.',
      'Close warmly without promising future availability you do not mean.',
    ],
    forbiddenConcessions: [
      'Using vague wording that keeps the project alive.',
      'Adding a long explanation for a query that mostly needs a simple answer.',
    ],
    redFlags: [
      'Kind-but-unclear wording often creates more follow-up than a direct reply.',
      'A fake future maybe makes the decline less credible.',
    ],
    preferredMoves: [
      'Thank them quickly.',
      'Say no in plain language.',
      'End on a warm but settled line.',
    ],
    avoidMoves: [
      'Over-explaining.',
      'Turning the close into another opening.',
    ],
    nextStepTemplates: [
      'Thanks for thinking of me for this. I am going to pass on the project, but I wanted to let you know clearly and promptly.',
      'Thanks again for reaching out. I do not think I would be the right fit for this one, so I am going to step back rather than take it on without the right alignment.',
    ],
    toneProfile: 'Warm, simple, and settled.',
  },
  {
    slug: 'refuse-project-due-to-workload',
    title: 'Refuse a project due to workload',
    primaryGoal:
      'Decline due to workload in a way that sounds responsible and quality-protective rather than chaotic.',
    pressureType: 'project_decline',
    userPositioning:
      'You know capacity is the honest answer and want the message to sound deliberate, not overloaded.',
    counterpartMindset:
      'They need confidence that the decline reflects responsible judgment, not instability.',
    requiredReframe:
      'Frame workload as a delivery-quality and capacity decision, not as an excuse.',
    allowedConcessions: [
      'Explain the capacity limit briefly.',
      'Mention a future reconnect only if it is genuinely realistic.',
    ],
    forbiddenConcessions: [
      'Describing yourself as chaotic or overwhelmed.',
      'Leaving the client waiting on a maybe when capacity is the real answer.',
    ],
    redFlags: [
      'Workload becomes a weak excuse only when it is phrased vaguely or frantically.',
      'An unclear future-open line can keep the client stalled on your capacity.',
    ],
    preferredMoves: [
      'Name the capacity constraint clearly.',
      'Tie the decline to doing the work well.',
      'Keep any future-open option narrow and real.',
    ],
    avoidMoves: [
      'Rambling about how busy you are.',
      'Sounding apologetic enough to invite negotiation.',
    ],
    nextStepTemplates: [
      'I am at capacity on current commitments, so I would rather decline this now than take it on without enough room to do it well.',
      'I would not want to commit to this without the bandwidth to handle it properly, so I think the better call is for me to step back on this one.',
    ],
    toneProfile: 'Decision-oriented and responsible.',
  },
  {
    slug: 'say-no-to-low-budget-client',
    title: 'Say no to a low-budget client',
    primaryGoal:
      'Turn an unworkable low-budget inquiry into a clear professional no instead of a prolonged underpricing negotiation.',
    pressureType: 'project_decline',
    userPositioning:
      'You need to protect your economics without sounding dismissive or bitter.',
    counterpartMindset:
      'They want to know whether you will collapse your standards to make the current budget work.',
    requiredReframe:
      'Treat the issue as a fit decision when the budget is fundamentally non-viable, not as a negotiation puzzle you must solve.',
    allowedConcessions: [
      'Offer a materially smaller version only if it is truly viable.',
      'Leave the door open only for a real scope or budget change.',
    ],
    forbiddenConcessions: [
      'Accepting a non-viable budget to keep the lead alive.',
      'Shaming the client for the budget level.',
    ],
    redFlags: [
      'Trying to rescue a deeply low-budget lead often creates low-margin scope debt later.',
      'A vague future-open line brings the same weak budget back again.',
    ],
    preferredMoves: [
      'Name the fit mismatch plainly.',
      'Protect the quality and scope standard.',
      'Use a smaller-scope alternative only if it is genuinely workable.',
    ],
    avoidMoves: [
      'Defensive explanations about your rates.',
      'Leaving the decline half-open.',
    ],
    nextStepTemplates: [
      'At that budget, I would not be able to deliver the work to the standard I would be comfortable putting my name on, so I would rather be honest than force a weak fit.',
      'If the range is fixed, the only workable path would be a materially smaller version rather than the current scope at a lower fee.',
    ],
    toneProfile: 'Warm-firm, selective, and economically clear.',
    serviceAdjustments: PRICING_SERVICE_ADJUSTMENTS,
  },
  {
    slug: 'stand-firm-on-pricing',
    title: 'Stand firm on pricing',
    primaryGoal:
      'Hold the current pricing in a calm, structured way that keeps the conversation commercially workable.',
    pressureType: 'pricing_pushback',
    userPositioning:
      'You want to sound deliberate and credible, not rigid or defensive.',
    counterpartMindset:
      'They are testing whether the number is a real position or just an opening ask.',
    requiredReframe:
      'Treat the rate as a consequence of scope and delivery standard, not a number to defend emotionally.',
    allowedConcessions: [
      'Offer a smaller version or different structure if the budget is real.',
      'Clarify what the rate is tied to without over-explaining.',
    ],
    forbiddenConcessions: [
      'Lowering the same scope just to ease the pressure.',
      'Sounding combative to prove firmness.',
    ],
    redFlags: [
      'Over-explaining makes the rate sound more negotiable, not less.',
      'A hard wall with no alternative path can stall a workable conversation.',
    ],
    preferredMoves: [
      'State the hold calmly.',
      'Tie the number back to scope and standard.',
      'Offer a structured alternative instead of a blind discount.',
    ],
    avoidMoves: [
      'Defensive essays about your pricing.',
      'Cold or ego-driven language.',
    ],
    nextStepTemplates: [
      'I would prefer to keep the pricing where it is, since it reflects the current scope and the standard needed for the result we discussed.',
      'If budget is the issue, the cleaner path is a smaller version rather than the same scope at a lower fee.',
    ],
    toneProfile: 'Calm, commercially steady, and structured.',
    serviceAdjustments: PRICING_SERVICE_ADJUSTMENTS,
  },
];

const topStrategyCardMap = new Map(
  TOP_STRATEGY_CARDS.map((card) => [card.slug, card])
);

export const topStrategyCardSlugs = TOP_STRATEGY_CARDS.map((card) => card.slug);

export function getStrategyCard(scenario: Scenario): {
  card: StrategyCard;
  source: StrategyCardSource;
} {
  const topCard = topStrategyCardMap.get(scenario.slug);
  if (topCard) {
    return {
      card: topCard,
      source: 'top10',
    };
  }

  return {
    card: buildCompatibilityStrategyCard(scenario),
    source: 'compat',
  };
}

function buildCompatibilityStrategyCard(scenario: Scenario): StrategyCard {
  return {
    slug: scenario.slug,
    title: scenario.title,
    primaryGoal: scenario.primaryGoal,
    pressureType: mapCompatibilityPressureType(scenario.slug),
    userPositioning: scenario.promptContext,
    counterpartMindset:
      'The client is applying the pressure encoded in this scenario and needs a calm, structured response.',
    requiredReframe:
      'Translate the situation into a clear negotiation structure instead of reacting defensively.',
    allowedConcessions: [
      'Offer only structured tradeoffs that change scope, terms, or sequencing.',
    ],
    forbiddenConcessions: scenario.avoid.slice(0, 2),
    redFlags: scenario.avoid.slice(0, 2),
    preferredMoves: scenario.preferredMoves.slice(0, 3),
    avoidMoves: scenario.avoid.slice(0, 2),
    nextStepTemplates: [
      'If helpful, I can outline the cleanest next step based on the constraint you are trying to solve.',
      'If the current version does not fit, I can suggest an adjusted option instead of weakening the original terms.',
    ],
    toneProfile: scenario.toneProfile,
    serviceAdjustments:
      scenario.category === 'pricing'
        ? PRICING_SERVICE_ADJUSTMENTS
        : scenario.slug.includes('scope') || scenario.slug.includes('revision')
          ? SCOPE_SERVICE_ADJUSTMENTS
          : undefined,
  };
}

function mapCompatibilityPressureType(
  scenarioSlug: string
): StrategyCard['pressureType'] {
  if (scenarioSlug.includes('invoice') || scenarioSlug.includes('payment')) {
    return 'payment_collection';
  }

  if (scenarioSlug.includes('scope') || scenarioSlug.includes('extra')) {
    return 'scope_expansion';
  }

  if (scenarioSlug.includes('revision')) {
    return 'revision_pressure';
  }

  if (
    scenarioSlug.includes('ghosted') ||
    scenarioSlug.includes('no-response')
  ) {
    return 'follow_up';
  }

  if (scenarioSlug.includes('start-before-payment')) {
    return 'start_without_commitment';
  }

  if (scenarioSlug.includes('budget')) {
    return 'budget_limit';
  }

  if (scenarioSlug.includes('cheaper') || scenarioSlug.includes('match')) {
    return 'price_comparison';
  }

  return 'pricing_pushback';
}
