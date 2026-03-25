type PaymentClusterLink = {
  href: string;
  label: string;
};

type PaymentStrategyBranch = {
  title: string;
  description: string;
};

export type PaymentScenarioSupport = {
  guide: PaymentClusterLink;
  template?: PaymentClusterLink;
  risks: string[];
  strategyBranches: PaymentStrategyBranch[];
};

const paymentScenarioSupportBySlug: Record<string, PaymentScenarioSupport> = {
  'overdue-invoice-no-response': {
    guide: {
      href: '/guides/how-to-follow-up-an-unpaid-invoice/',
      label: 'How to follow up an unpaid invoice',
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
  },
  'deposit-not-paid-yet': {
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
  },
};

export function getPaymentScenarioSupport(
  slug: string
): PaymentScenarioSupport | null {
  return paymentScenarioSupportBySlug[slug] || null;
}
