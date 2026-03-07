'use client';

import { useState } from 'react';

import { GenerateReplyRequest, GenerateReplyResponse } from '@/types/generation';

export type ToolGenerationState = {
  isLoading: boolean;
  error: string | null;
  result: GenerateReplyResponse | null;
  submit: (payload: GenerateReplyRequest) => Promise<GenerateReplyResponse | null>;
  setResult: (result: GenerateReplyResponse | null) => void;
};

export function useToolGeneration(): ToolGenerationState {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateReplyResponse | null>(null);

  const submit = async (
    payload: GenerateReplyRequest
  ): Promise<GenerateReplyResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as GenerateReplyResponse;
      setResult(data);

      if (!response.ok || !data.success) {
        setError(data.error || 'GENERATION_FAILED');
      }

      return data;
    } catch (requestError) {
      const nextError =
        requestError instanceof Error ? requestError.message : 'GENERATION_FAILED';
      setError(nextError);
      setResult(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    result,
    submit,
    setResult,
  };
}
