type PaymentClusterLink = {
  href: string;
  label: string;
};

type PaymentStrategyBranch = {
  title: string;
  description: string;
};

export type PaymentScenarioSupport = {
  scenarioDefinition: string;
  guide: PaymentClusterLink;
  template?: PaymentClusterLink;
  risks: string[];
  strategyBranches: PaymentStrategyBranch[];
  nextSteps: string[];
};

const paymentScenarioSupportBySlug: Record<string, PaymentScenarioSupport> = {
  'overdue-invoice-no-response': {
    scenarioDefinition:
      'Use this scenario when the invoice is already overdue, at least one reminder exists in the thread, and the client has now gone quiet. This page owns the silence-plus-overdue stage, not the first follow-up or the first overdue reminder.',
    guide: {
      href: '/guides/how-to-remind-a-client-about-overdue-payment/',
      label: 'How to remind a client about overdue payment',
    },
    template: {
      href: '/templates/payment-reminder',
      label: 'Payment reminder templates',
    },
    risks: [
      'Sending another vague nudge and letting the overdue status stay ambiguous.',
      'Sounding emotional instead of asking for a concrete payment date.',
      'Leaving the client without a clear next step or response deadline.',
    ],
    strategyBranches: [
      {
        title: 'Ask for a payment date directly',
        description:
          'Use this when the invoice is already overdue and the client has gone quiet. Name the invoice status and ask for one specific date.',
      },
      {
        title: 'Surface blockers without softening the ask',
        description:
          'Use this when the client may be stuck in finance or approval. Ask what is blocking payment, but keep the invoice and due date explicit.',
      },
      {
        title: 'Prepare the next escalation step',
        description:
          'Use this when prior reminders already failed. Signal that the next action depends on getting a confirmed payment timeline now.',
      },
    ],
    nextSteps: [
      'Send the reply with the invoice number, overdue status, and one clear ask for the payment date.',
      'If they reply with a vague promise, move to a firmer reminder instead of restarting the thread from zero.',
      'If they still do not respond, use the next boundary or escalation step you referenced in the reply.'
    ]
  },
  'deposit-not-paid-yet': {
    scenarioDefinition:
      'Use this scenario when the deposit was already agreed, kickoff depends on it, and payment still has not arrived. This page owns the blocked-kickoff stage, not the earlier policy decision about whether to ask for a deposit.',
    guide: {
      href: '/guides/when-to-ask-for-a-deposit-before-work/',
      label: 'When to ask for a deposit before work',
    },
    template: {
      href: '/templates/advance-payment-message-examples',
      label: 'Advance payment message examples',
    },
    risks: [
      'Starting work before the agreed payment step is complete.',
      'Letting the kickoff timeline become a verbal promise instead of a payment-triggered milestone.',
      'Trying to sound flexible in a way that weakens the deposit boundary.',
    ],
    strategyBranches: [
      {
        title: 'Keep kickoff tied to the deposit',
        description:
          'Use this when the client says payment is coming soon. Restate that the project start is reserved once the deposit is in place.',
      },
      {
        title: 'Remove friction without removing the boundary',
        description:
          'Use this when the client seems willing but disorganized. Make the payment step easy and concrete instead of sounding suspicious.',
      },
      {
        title: 'Reconfirm the fastest path forward',
        description:
          'Use this when you want to stay collaborative. Show exactly what happens next once the deposit arrives, without starting early.',
      },
    ],
    nextSteps: [
      'Send the reply with one clear payment step and keep kickoff tied to the deposit instead of a verbal promise.',
      'If the client hesitates, answer the hesitation directly without adding unpaid custom work or starting early.',
      'If they keep pushing to begin before paying, move into a firmer start-after-payment boundary.'
    ]
  },
};

export function getPaymentScenarioSupport(
  slug: string
): PaymentScenarioSupport | null {
  return paymentScenarioSupportBySlug[slug] || null;
}
