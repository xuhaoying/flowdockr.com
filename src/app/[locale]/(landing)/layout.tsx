import { ReactNode } from 'react';

import { PublicFooter } from '@/components/layout/PublicFooter';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { LocaleDetector } from '@/shared/blocks/common';

export default function LandingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f4f6f3] text-slate-900">
      <LocaleDetector />
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
}
