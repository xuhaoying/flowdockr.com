import type { ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';

type TrustPageLayoutProps = {
  title: string;
  description: string;
  effectiveDate: string;
  children: ReactNode;
};

type TrustSectionCardProps = {
  title: string;
  children: ReactNode;
};

export function TrustPageLayout({
  title,
  description,
  effectiveDate,
  children,
}: TrustPageLayoutProps) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 md:gap-8 md:py-10">
      <Card className="border-border/80 overflow-hidden rounded-[24px] bg-white py-0 shadow-sm">
        <CardHeader className="border-border/70 gap-3 border-b bg-gradient-to-br from-white via-white to-slate-50/70 px-6 py-6 lg:px-8 lg:py-7">
          <p className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">
            Trust and policy
          </p>
          <CardTitle className="text-3xl tracking-tight text-slate-900 md:text-4xl">
            {title}
          </CardTitle>
          <p className="max-w-3xl text-sm leading-6 text-slate-700 md:text-base">
            {description}
          </p>
        </CardHeader>
        <CardContent className="px-6 py-4 text-sm text-slate-600 lg:px-8">
          Effective date: {effectiveDate}
        </CardContent>
      </Card>

      <div className="space-y-4">{children}</div>
    </main>
  );
}

export function TrustSectionCard({
  title,
  children,
}: TrustSectionCardProps) {
  return (
    <Card className="border-border/80 bg-white py-0 shadow-sm">
      <CardHeader className="gap-2 px-6 py-5 lg:px-8">
        <CardTitle className="text-xl tracking-tight text-slate-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-6 pb-6 text-sm leading-6 text-slate-700 lg:px-8">
        {children}
      </CardContent>
    </Card>
  );
}
