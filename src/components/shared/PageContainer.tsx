import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/utils';

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main
      className={cn(
        'mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 pb-24 md:py-10 md:pb-10',
        className
      )}
    >
      {children}
    </main>
  );
}

