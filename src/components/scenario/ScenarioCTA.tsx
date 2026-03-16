import { Button } from '@/shared/components/ui/button';

type ScenarioCTAProps = {
  title: string;
};

export function ScenarioCTA({ title }: ScenarioCTAProps) {
  return (
    <section className="rounded-[24px] border border-slate-900 bg-slate-900 p-6 text-white shadow-sm lg:p-7">
      <div className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-300 uppercase">
          Ready to reply
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-white">
          Turn this situation into a send-ready reply
        </h2>
        <p className="text-sm leading-6 text-slate-200">
          Use the embedded tool to draft a reply for &ldquo;{title}&rdquo; with
          the exact client wording from your conversation.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            asChild
            size="lg"
            className="w-full bg-white text-slate-900 hover:bg-slate-100 sm:w-auto"
          >
            <a href="#scenario-inline-tool">Open the reply tool</a>
          </Button>
          <p className="text-sm text-slate-300">
            2 free drafts. No subscription required.
          </p>
        </div>
      </div>
    </section>
  );
}
