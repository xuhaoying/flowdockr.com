'use client';

import { useEffect, useState } from 'react';

import { Link } from '@/core/i18n/navigation';
import { Button } from '@/shared/components/ui/button';

export function ScenarioStickyBottomCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const computeVisibility = () => {
      const heroCta = document.getElementById('scenario-hero-primary-cta');
      const tool = document.getElementById('scenario-inline-tool');
      const resultReady = document.querySelector(
        '#tool-result-panel[data-result-ready="true"]'
      );

      if (resultReady) {
        setVisible(false);
        return;
      }

      const isVisibleInViewport = (element: HTMLElement | null) => {
        if (!element) {
          return false;
        }

        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
      };

      const heroVisible = isVisibleInViewport(heroCta as HTMLElement | null);
      const toolVisible = isVisibleInViewport(tool as HTMLElement | null);
      setVisible(!heroVisible && !toolVisible);
    };

    computeVisibility();
    window.addEventListener('scroll', computeVisibility, { passive: true });
    window.addEventListener('resize', computeVisibility);

    const observer = new MutationObserver(computeVisibility);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['data-result-ready'],
    });

    return () => {
      window.removeEventListener('scroll', computeVisibility);
      window.removeEventListener('resize', computeVisibility);
      observer.disconnect();
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="mx-auto w-full max-w-6xl space-y-1">
        <div className="flex items-center gap-2">
          <Button asChild className="h-10 flex-1">
            <a href="#scenario-inline-tool">Draft reply</a>
          </Button>
          <Button asChild variant="outline" className="h-10 px-3 text-xs">
            <Link href="/pricing">2 free credits</Link>
          </Button>
        </div>
        <p className="text-center text-[11px] text-slate-600">
          No subscription required.
        </p>
      </div>
    </div>
  );
}
