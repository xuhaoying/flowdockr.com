import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';

const FAQ_ITEMS = [
  {
    value: 'credits',
    question: 'Do credits expire?',
    answer: 'No. Negotiation credits do not expire.',
  },
  {
    value: 'subscription',
    question: 'Is this a subscription?',
    answer:
      'No. Flowdockr uses one-time credit packs, so you can buy support only when you need it.',
  },
  {
    value: 'ai-tool',
    question: 'Is this just an AI writing tool?',
    answer:
      'No. Flowdockr is built around negotiation guidance, response strategy, and client conversation decisions rather than generic writing prompts.',
  },
  {
    value: 'when-to-use',
    question: 'When should I use Flowdockr?',
    answer:
      'Use it when a client pushes on price, asks for a discount, expands scope, requests rush delivery, or when you need to respond clearly without weakening your position.',
  },
];

export function PricingFAQ() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="max-w-3xl space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            FAQ
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Common questions before you choose a plan
          </h2>
        </div>
        <Accordion
          type="single"
          collapsible
          defaultValue="credits"
          className="w-full"
        >
          {FAQ_ITEMS.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
