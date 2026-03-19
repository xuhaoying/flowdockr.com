export type CalibrationExampleKind = 'good' | 'bad' | 'boundary';

export type CalibrationExample = {
  kind: CalibrationExampleKind;
  clientMessage: string;
  sampleReply: string;
  notes: string[];
};

const EXAMPLES_BY_SLUG: Record<string, CalibrationExample[]> = {
  'quote-too-high': [
    {
      kind: 'good',
      clientMessage: 'Your quote feels high for what we expected.',
      sampleReply:
        'Thanks for flagging that. The quote reflects the full scope, revision time, and the level of polish needed for the result we discussed. If the budget is tighter than expected, I can outline a leaner version rather than trim the same scope arbitrarily.',
      notes: [
        'Re-anchors on scope and value before discussing movement.',
        'Offers a structured scope option instead of a fast discount.',
      ],
    },
    {
      kind: 'bad',
      clientMessage: 'Your quote feels high for what we expected.',
      sampleReply:
        'Totally understand. I really appreciate the honesty and I can definitely be flexible if that helps. Let me know what price feels fair to you and I will do my best to make it work.',
      notes: [
        'Too generic and too soft.',
        'Hands pricing control to the client with no next-step structure.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage: 'Your quote feels high for what we expected.',
      sampleReply:
        'I understand the reaction. The current quote is built around the full scope we discussed, so I would not reduce that version without changing something else. If budget is the real constraint, I can suggest a smaller first phase that still covers the core priority.',
      notes: [
        'Holds the line without sounding combative.',
        'Shows the tradeoff logic clearly but stays sendable.',
      ],
    },
  ],
  'discount-request': [
    {
      kind: 'good',
      clientMessage: 'Can you give us a discount if we move forward this week?',
      sampleReply:
        'I can move quickly on this, but I would not lower the same scope just to reach a different number. If speed or budget is the main constraint, I can adjust the scope or structure the engagement differently so the tradeoff is clear.',
      notes: [
        'Keeps the base rate intact.',
        'Links any concession to a concrete tradeoff.',
      ],
    },
    {
      kind: 'bad',
      clientMessage: 'Can you give us a discount if we move forward this week?',
      sampleReply:
        'Sure, I can do 15% off if that helps and we can figure out the details later.',
      notes: [
        'Immediate unearned discount.',
        'No scope, timing, or commitment condition attached.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage: 'Can you give us a discount if we move forward this week?',
      sampleReply:
        'If the timing is what matters, I can prioritize the slot. If the number itself needs to change, the cleanest route is to narrow scope or define a larger commitment rather than discount the same package by default.',
      notes: [
        'Balances cooperation with a clear condition.',
        'Avoids sounding rigid while still protecting the rate.',
      ],
    },
  ],
  'cheaper-freelancer': [
    {
      kind: 'good',
      clientMessage: 'Another freelancer said they can do this for much less.',
      sampleReply:
        'That can make sense if the scope, process, and level of support are different. My rate reflects how I handle the work and the standard I am accountable for. If budget is the main issue, I can suggest a narrower version so you are comparing like for like.',
      notes: [
        'Avoids attacking the competitor.',
        'Reframes the comparison around scope and accountability.',
      ],
    },
    {
      kind: 'bad',
      clientMessage: 'Another freelancer said they can do this for much less.',
      sampleReply:
        'They are probably inexperienced or low quality. I can match them if I have to, but I do not think you should hire them.',
      notes: [
        'Too aggressive and insecure.',
        'Undercuts positioning by offering to match immediately.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage: 'Another freelancer said they can do this for much less.',
      sampleReply:
        'I understand comparing options. I would not try to win this by dropping the same scope to a lower number, but I am happy to help compare what is actually included or suggest a leaner version if that fits the budget better.',
      notes: [
        'Firm on not racing downward.',
        'Still gives the client a practical decision path.',
      ],
    },
  ],
  'meet-their-budget': [
    {
      kind: 'good',
      clientMessage: 'Our cap is $2,000. Can you make it work?',
      sampleReply:
        'Thanks for sharing the budget. At that number, the right question is which version of the work makes sense rather than how to squeeze the original scope into it. If helpful, I can send a lean option focused on the highest-priority deliverables.',
      notes: [
        'Treats budget as a constraint, not an automatic concession.',
        'Moves quickly toward a scope-based next step.',
      ],
    },
    {
      kind: 'bad',
      clientMessage: 'Our cap is $2,000. Can you make it work?',
      sampleReply:
        'I can probably make it work somehow. Let us just keep everything the same and I will try to be efficient.',
      notes: [
        'Too vague and commercially unsafe.',
        'Promises the same scope without naming tradeoffs.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage: 'Our cap is $2,000. Can you make it work?',
      sampleReply:
        'I can work within that budget if we narrow the scope to the most important pieces. I would not want to promise the full original version at that number, but I can suggest a smaller first phase that still moves the project forward.',
      notes: [
        'Clear about the tradeoff.',
        'Keeps the tone constructive and practical.',
      ],
    },
  ],
  'reviewing-internally-no-response': [
    {
      kind: 'good',
      clientMessage: 'We are reviewing this internally and will circle back.',
      sampleReply:
        'Just checking in in case this is still under review. If it would help, I can clarify scope, timing, or the cleanest next step so your team can make the decision more easily.',
      notes: [
        'Low pressure and easy to answer.',
        'Offers useful help instead of guilt.',
      ],
    },
    {
      kind: 'bad',
      clientMessage: 'We are reviewing this internally and will circle back.',
      sampleReply:
        'I have not heard back and I really need an answer today because I cannot keep waiting like this.',
      notes: [
        'Pushy and self-focused.',
        'Creates pressure without making the next step easier.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage: 'We are reviewing this internally and will circle back.',
      sampleReply:
        'Wanted to follow up in case this is still active on your side. If the team needs anything clarified before deciding, I am happy to help. If timing changed, no problem at all.',
      notes: [
        'Keeps the door open without sounding needy.',
        'Handles uncertainty gracefully.',
      ],
    },
  ],
  'ghosted-after-rate': [
    {
      kind: 'good',
      clientMessage: 'Thanks, I will get back to you on the rate.',
      sampleReply:
        'Wanted to circle back in case this is still active. If you are weighing options or need a smaller version of the scope, I am happy to outline that so it is easier to compare.',
      notes: [
        'Reconnects on the original friction point without discounting.',
        'Offers a structured re-entry path.',
      ],
    },
    {
      kind: 'bad',
      clientMessage: 'Thanks, I will get back to you on the rate.',
      sampleReply:
        'Just following up again. Please let me know. I am very available and happy to be flexible on the pricing if needed.',
      notes: [
        'Sounds needy and generic.',
        'Offers pricing flexibility before the client re-engages.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage: 'Thanks, I will get back to you on the rate.',
      sampleReply:
        'Checking back in on this in case it is still under consideration. If budget is the sticking point, I can suggest a narrower option instead of reopening the same quote without structure.',
      notes: [
        'Protects value while keeping the follow-up short.',
        'Useful when silence likely came from price friction.',
      ],
    },
  ],
  'unpaid-invoice-follow-up': [
    {
      kind: 'good',
      clientMessage: "We haven't processed the invoice yet.",
      sampleReply:
        'Following up on invoice #104, which is still outstanding. Please let me know the expected payment date so I can update my records accordingly. If anything is blocking it on your side, I am happy to help resolve that quickly.',
      notes: [
        'Direct, specific, and still professional.',
        'Asks for a concrete payment date.',
      ],
    },
    {
      kind: 'bad',
      clientMessage: "We haven't processed the invoice yet.",
      sampleReply:
        'Hi, just gently checking in again whenever you have a moment. No rush at all, I just wanted to see if there were any updates.',
      notes: [
        'Too soft for an invoice follow-up.',
        'No invoice reference, due date, or clear ask.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage: "We haven't processed the invoice yet.",
      sampleReply:
        'Thanks for the update. Please confirm when payment is expected for the outstanding invoice so I can plan accordingly. If there is a process issue on your side, let me know what is needed to clear it.',
      notes: [
        'Acknowledges their note without losing firmness.',
        'Works when you need clarity, not confrontation.',
      ],
    },
  ],
  'scope-creep-polite-response': [
    {
      kind: 'good',
      clientMessage:
        'Can you also add these extra tasks? They should be quick.',
      sampleReply:
        'I can help with that. Since those items sit outside the current scope, the cleanest route is to decide whether we swap priorities inside the existing work or add them as an extension with updated timing and cost.',
      notes: [
        'Names the scope change calmly.',
        'Gives clear options instead of reacting defensively.',
      ],
    },
    {
      kind: 'bad',
      clientMessage:
        'Can you also add these extra tasks? They should be quick.',
      sampleReply:
        'Sure, I will squeeze them in this time. Just keep in mind I cannot do this forever.',
      notes: [
        'Absorbs the scope change.',
        'Creates resentment without a commercial structure.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage:
        'Can you also add these extra tasks? They should be quick.',
      sampleReply:
        'Happy to look at that. Because it changes the agreed scope, I would want to either swap it with existing priorities or add it as a scoped extra so timing and ownership stay clear.',
      notes: [
        'Polite but clear about the boundary.',
        'Useful for “small extra” requests that can expand quickly.',
      ],
    },
  ],
  'unlimited-revisions': [
    {
      kind: 'good',
      clientMessage: 'Can we make revisions unlimited?',
      sampleReply:
        'I usually scope a defined number of revision rounds so feedback stays focused and the timeline stays predictable. If you expect more iteration than that, I can price extra rounds separately so the process stays clear on both sides.',
      notes: [
        'Frames the boundary as process quality, not resistance.',
        'Offers a structured alternative.',
      ],
    },
    {
      kind: 'bad',
      clientMessage: 'Can we make revisions unlimited?',
      sampleReply:
        'No, unlimited revisions are not allowed and that is just our policy.',
      notes: [
        'Too rigid and abrupt.',
        'Misses the chance to explain the client-facing logic or offer an option.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage: 'Can we make revisions unlimited?',
      sampleReply:
        'I would not leave revisions unlimited because that usually slows the work down and muddies the scope. What I can do is include a defined number of rounds and add more if the project needs them.',
      notes: [
        'Firm enough to protect the boundary.',
        'Still collaborative and solution-oriented.',
      ],
    },
  ],
  'start-before-payment': [
    {
      kind: 'good',
      clientMessage: 'Can you get started now and we will sort payment after?',
      sampleReply:
        'I can move quickly once the deposit and kickoff details are confirmed. That keeps the project protected on both sides and lets me reserve the time properly. As soon as that step is done, I can start right away.',
      notes: [
        'Acknowledges urgency but protects kickoff terms.',
        'Makes the next step operationally clear.',
      ],
    },
    {
      kind: 'bad',
      clientMessage: 'Can you get started now and we will sort payment after?',
      sampleReply:
        'Normally I do not like that, but I can make an exception and trust that it will be fine.',
      notes: [
        'Undermines the boundary.',
        'Signals the payment condition is optional.',
      ],
    },
    {
      kind: 'boundary',
      clientMessage: 'Can you get started now and we will sort payment after?',
      sampleReply:
        'I am happy to keep the timeline moving, but I start once the agreed payment step is in place. If helpful, I can send that over now so there is nothing slowing kickoff down.',
      notes: [
        'Protects the rule without sounding suspicious.',
        'Good for urgency without commitment pressure.',
      ],
    },
  ],
};

export function getCalibrationExamples(
  scenarioSlug: string
): CalibrationExample[] {
  return EXAMPLES_BY_SLUG[scenarioSlug] || [];
}

export function formatCalibrationExamples(scenarioSlug: string): {
  text: string;
  count: number;
} {
  const examples = getCalibrationExamples(scenarioSlug);
  if (examples.length === 0) {
    return {
      text: '',
      count: 0,
    };
  }

  return {
    text: [
      'Calibration examples:',
      ...examples.map((example) =>
        [
          `[${example.kind.toUpperCase()}]`,
          `Client message: "${example.clientMessage}"`,
          `Example reply: "${example.sampleReply}"`,
          ...example.notes.map((note) => `- ${note}`),
        ].join('\n')
      ),
    ].join('\n\n'),
    count: examples.length,
  };
}
