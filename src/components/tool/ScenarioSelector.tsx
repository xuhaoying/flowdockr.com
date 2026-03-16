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
        className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-900 shadow-xs transition-colors outline-none focus:border-slate-500"
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
