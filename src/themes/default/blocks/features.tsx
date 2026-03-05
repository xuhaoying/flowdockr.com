'use client';

import { Link } from '@/core/i18n/navigation';
import { SmartIcon } from '@/shared/blocks/common/smart-icon';
import { ScrollAnimation } from '@/shared/components/ui/scroll-animation';
import { cn } from '@/shared/lib/utils';
import { Section } from '@/shared/types/blocks/landing';

export function Features({
  section,
  className,
}: {
  section: Section;
  className?: string;
}) {
  return (
    <section
      id={section.id}
      className={cn('py-16 md:py-24', section.className, className)}
    >
      <div className={`container space-y-8 md:space-y-16`}>
        <ScrollAnimation>
          <div className="mx-auto max-w-4xl text-center text-balance">
            <h2 className="text-foreground mb-4 text-3xl font-semibold tracking-tight md:text-4xl">
              {section.title}
            </h2>
            <p className="text-muted-foreground mb-6 md:mb-12 lg:mb-16">
              {section.description}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={0.2}>
          <div className="relative mx-auto grid divide-x divide-y border sm:grid-cols-2 lg:grid-cols-3">
            {section.items?.map((item, idx) => (
              <FeatureItem
                key={idx}
                title={item.title || ''}
                description={item.description || ''}
                icon={item.icon as string}
                url={item.url}
                target={item.target}
              />
            ))}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

function FeatureItem({
  title,
  description,
  icon,
  url,
  target,
}: {
  title: string;
  description: string;
  icon?: string;
  url?: string;
  target?: string;
}) {
  const content = (
    <div className="space-y-3 p-8 sm:p-10">
      <div className="flex items-center gap-2">
        {icon ? <SmartIcon name={icon} size={24} /> : null}
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );

  if (!url) {
    return content;
  }

  return (
    <Link
      href={url}
      target={target || '_self'}
      className="hover:bg-muted/40 transition-colors"
    >
      {content}
    </Link>
  );
}
