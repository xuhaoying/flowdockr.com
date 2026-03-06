import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

const GOAL_OPTIONS = [
  { value: 'protect_price', label: 'Protect price' },
  { value: 'keep_relationship', label: 'Keep relationship' },
  { value: 'close_faster', label: 'Close faster' },
  { value: 'offer_scope_reduction', label: 'Offer scope reduction' },
] as const;

type GoalSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function GoalSelect({ value, onValueChange }: GoalSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="goal">Goal</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id="goal" className="w-full">
          <SelectValue placeholder="Select goal" />
        </SelectTrigger>
        <SelectContent>
          {GOAL_OPTIONS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
