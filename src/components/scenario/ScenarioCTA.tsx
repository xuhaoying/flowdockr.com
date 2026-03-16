import { Button } from '@/shared/components/ui/button';

type ScenarioCTAProps = {
  title: string;
};

export function ScenarioCTA({ title }: ScenarioCTAProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="max-w-3xl space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Turn this situation into a send-ready reply
        </h2>
        <p className="text-sm leading-6 text-slate-700">
          Use the embedded tool to draft a reply for &ldquo;{title}&rdquo; with
          the exact client wording from your conversation.
        </p>
        <Button asChild>
          <a href="#scenario-inline-tool">Open the reply tool</a>
        </Button>
      </div>
    </section>
  );
}
