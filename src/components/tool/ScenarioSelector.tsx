import { scenarioOptions } from '@/lib/scenarios';

type ScenarioSelectorProps = {
  value: string;
  onChange: (slug: string) => void;
  label?: string;
};

export function ScenarioSelector({
  value,
  onChange,
  label = 'Scenario',
}: ScenarioSelectorProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-brand-lavender/40 focus:border-brand-primary h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-slate-900 shadow-xs transition-colors outline-none"
      >
        {scenarioOptions.map((scenario) => (
          <option key={scenario.value} value={scenario.value}>
            {scenario.label}
          </option>
        ))}
      </select>
    </label>
  );
}
