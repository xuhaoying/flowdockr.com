import { ScenarioContent } from '@/types/scenario';

export const saysBudgetLimitedScenario: ScenarioContent = {
  slug: 'client-says-budget-is-limited',
  seoTitle: 'Client Says Budget Is Limited: Freelance Negotiation Reply',
  seoDescription:
    'Generate a strategic reply when a client says budget is limited. Keep the deal alive without underpricing your work.',
  h1: 'Client says their budget is limited',
  intro:
    'Budget objections are often solvable when scope and outcomes are reframed. Your response should preserve value and still move the deal forward.',
  problemSummary:
    'When clients cite budget limits, many freelancers either cave or walk away too early. Better replies use scoped options and phased delivery.',
  bullets: [
    'Acknowledge constraints without assuming rejection',
    'Re-anchor around priority outcomes',
    'Propose leaner scope or phased rollout',
  ],
  examples: [
    {
      title: 'Phased option',
      reply:
        'Thanks for sharing the budget limits. We can still make progress by prioritizing phase one outcomes first, then expanding once results are in.',
    },
    {
      title: 'Lean scope offer',
      reply:
        'Understood. For this budget, I can recommend a reduced scope focused on highest-impact deliverables, while keeping quality standards intact.',
    },
    {
      title: 'Decision-focused',
      reply:
        'I appreciate the transparency. I can send two scope options today so you can choose the one that fits your budget and timeline best.',
    },
  ],
  mistakes: [
    'Treating budget concern as a hard no',
    'Discounting full scope to fit budget',
    'Skipping prioritization and phased alternatives',
  ],
  faq: [
    {
      question: 'Should I ask for exact budget numbers?',
      answer:
        'Yes, if possible. A concrete budget helps you design realistic options and reduce back-and-forth.',
    },
    {
      question: 'What if their budget is far below minimum?',
      answer:
        'Offer a clearly smaller scope. If even that is not viable, decline respectfully and keep the relationship open.',
    },
    {
      question: 'How do I avoid sounding salesy?',
      answer:
        'Use plain language and practical options, not persuasion-heavy copy.',
    },
  ],
  relatedSlugs: [
    'how-to-respond-to-a-lowball-offer',
    'client-asks-for-a-discount',
    'client-delays-decision-after-quote',
  ],
  promptContext: {
    scenarioType: 'budget_limited',
    negotiationGoal: 'keep_deal_alive_with_scope_prioritization',
    riskLevel: 'medium',
    defaultTone: 'diplomatic',
  },
};
