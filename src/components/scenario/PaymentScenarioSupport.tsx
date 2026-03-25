import { Link } from '@/core/i18n/navigation';
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card';
import type { PaymentScenarioSupport as PaymentScenarioSupportData } from '@/lib/content/paymentCluster';

type PaymentScenarioSupportProps = {
  support: PaymentScenarioSupportData;
};

export function PaymentScenarioSupport({
  support,
}: PaymentScenarioSupportProps) {
  return (
    <Card className="border-border/80 bg-white">
      <CardHeader className="gap-2">
        <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
          Payment execution map
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          Risks, response path, and next resource
        </h2>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          This scenario is part of the payment communication cluster. Use the
          guide for judgment, the template for wording, and this scenario for
          the live execution step.
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">
            Communication risks
          </h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {support.risks.map((risk) => (
              <li key={risk} className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-slate-500" />
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">
            Strategy branches
          </h3>
          <div className="grid gap-3 md:grid-cols-3">
            {support.strategyBranches.map((branch) => (
              <div
                key={branch.title}
                className="rounded-[18px] border border-slate-200 bg-slate-50/70 p-4"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {branch.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {branch.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <Link
            href={support.guide.href}
            className="rounded-[18px] border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300"
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
              Start with the guide
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {support.guide.label}
            </p>
          </Link>
          {support.template ? (
            <Link
              href={support.template.href}
              className="rounded-[18px] border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
                Use the template
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                {support.template.label}
              </p>
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
