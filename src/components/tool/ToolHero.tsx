import type { ToolPageData } from '@/types/content';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';

type ToolHeroProps = {
  tool: Pick<ToolPageData, 'h1' | 'heroSubheading'>;
};

export function ToolHero({ tool }: ToolHeroProps) {
  return (
    <Card className="border-border/80 overflow-hidden bg-white py-0 shadow-sm">
      <CardHeader className="border-border/70 gap-4 border-b bg-gradient-to-br from-white via-white to-slate-50/80 px-5 py-5 md:px-6 md:py-6">
        <div className="space-y-3">
          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-balance text-slate-900 md:text-4xl">
            {tool.h1}
          </h1>
          <p className="max-w-4xl text-base leading-7 text-slate-700">
            {tool.heroSubheading}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#tool-workspace">Start with your client message</a>
          </Button>
          <p className="text-sm text-slate-600">
            Start with 2 free drafts. No subscription required.
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2 px-5 py-4 text-xs md:px-6">
        <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
          Paste exact client wording
        </span>
        <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
          Get negotiation-aware draft
        </span>
      </CardContent>
    </Card>
  );
}
