import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

const TONE_OPTIONS = [
  { value: 'professional_firm', label: 'Professional + firm' },
  { value: 'warm_confident', label: 'Warm + confident' },
  { value: 'direct', label: 'Direct' },
  { value: 'diplomatic', label: 'Diplomatic' },
] as const;

type ToneSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function ToneSelect({ value, onValueChange }: ToneSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="tone">Tone</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id="tone" className="w-full">
          <SelectValue placeholder="Select tone" />
        </SelectTrigger>
        <SelectContent>
          {TONE_OPTIONS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
