import { PropsWithChildren } from 'react';

import { cn } from '@/shared/lib/utils';

type ContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-6xl px-4', className)}>{children}</div>;
}
