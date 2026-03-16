'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

type CopyButtonProps = {
  value: string;
  onCopied?: () => void;
  idleLabel?: string;
  copiedLabel?: string;
};

export function CopyButton({
  value,
  onCopied,
  idleLabel = 'Copy',
  copiedLabel = 'Copied',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // no-op
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-8 rounded-lg px-3 text-xs shadow-xs"
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="mr-1.5 size-3.5" />
      ) : (
        <Copy className="mr-1.5 size-3.5" />
      )}
      {copied ? copiedLabel : idleLabel}
    </Button>
  );
}
