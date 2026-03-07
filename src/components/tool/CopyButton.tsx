'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';

type CopyButtonProps = {
  value: string;
  onCopied?: () => void;
};

export function CopyButton({ value, onCopied }: CopyButtonProps) {
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
    <Button type="button" variant="ghost" size="sm" className="h-7 px-2" onClick={handleCopy}>
      {copied ? <Check className="mr-1.5 size-3.5" /> : <Copy className="mr-1.5 size-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
}
