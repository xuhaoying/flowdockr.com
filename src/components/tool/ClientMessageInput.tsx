import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';

type ClientMessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
};

export function ClientMessageInput({
  value,
  onChange,
  maxLength = 3000,
}: ClientMessageInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="client_message">Client message</Label>
      <Textarea
        id="client_message"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste the exact client message. Include budget/scope details if provided."
        rows={6}
        maxLength={maxLength}
        className="resize-y"
      />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-muted-foreground text-xs">
          Tip: keep your own wording. FlowDockr performs better with real
          context.
        </p>
        <p className="text-muted-foreground text-xs">
          {value.length}/{maxLength}
        </p>
      </div>
    </div>
  );
}
