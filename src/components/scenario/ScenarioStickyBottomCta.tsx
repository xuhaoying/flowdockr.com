import { Link } from '@/core/i18n/navigation';

export function ScenarioStickyBottomCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2">
        <a
          href="#scenario-tool"
          className="inline-flex flex-1 items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
        >
          Try your message now
        </a>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700"
        >
          2 free replies
        </Link>
      </div>
    </div>
  );
}
