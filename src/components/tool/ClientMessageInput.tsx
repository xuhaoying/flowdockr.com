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
        placeholder="Paste the exact message from your client..."
        rows={7}
        maxLength={maxLength}
      />
      <p className="text-xs text-muted-foreground">{value.length}/{maxLength}</p>
    </div>
  );
}
