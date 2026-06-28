import { ReactNode } from 'react';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { PublicHeader } from '@/components/layout/PublicHeader';

import { LocaleDetector } from '@/shared/blocks/common/locale-detector';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-brand-bg text-brand-text min-h-screen">
      <LocaleDetector />
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
}
