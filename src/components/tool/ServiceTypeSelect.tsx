import { Label } from '@/shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

const SERVICE_TYPES = [
  { value: 'designer', label: 'Designer' },
  { value: 'developer', label: 'Developer' },
  { value: 'copywriter', label: 'Copywriter' },
  { value: 'marketer', label: 'Marketer' },
  { value: 'video_editor', label: 'Video editor' },
  { value: 'consultant', label: 'Consultant' },
  { value: 'other', label: 'Other' },
] as const;

type ServiceTypeSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

export function ServiceTypeSelect({ value, onValueChange }: ServiceTypeSelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="service_type">Service type</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id="service_type" className="w-full">
          <SelectValue placeholder="Select service type" />
        </SelectTrigger>
        <SelectContent>
          {SERVICE_TYPES.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
