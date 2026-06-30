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
  const [failed, setFailed] = useState(false);

  const handleCopy = async () => {
    if (!value) {
      return;
    }

    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }

      await navigator.clipboard.writeText(value);
      setFailed(false);
      setCopied(true);
      onCopied?.();
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
      setFailed(true);
      window.setTimeout(() => setFailed(false), 1600);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-8 rounded-lg px-3 text-xs shadow-xs"
      onClick={handleCopy}
      aria-live="polite"
    >
      {copied ? (
        <Check className="mr-1.5 size-3.5" />
      ) : (
        <Copy className="mr-1.5 size-3.5" />
      )}
      {failed ? 'Copy failed' : copied ? copiedLabel : idleLabel}
    </Button>
  );
}
