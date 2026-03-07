import { PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/utils';

type SectionProps = PropsWithChildren<{
  className?: string;
}>;

export function Section({ children, className }: SectionProps) {
  return (
    <section
      className={cn('space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm', className)}
    >
      {children}
    </section>
  );
}
