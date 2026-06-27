type StrategyPanelProps = {
  items: string[];
};

export function StrategyPanel({ items }: StrategyPanelProps) {
  return (
    <div className="bg-muted/20 rounded-md border p-4">
      <h4 className="text-sm font-semibold">Strategy</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className="flex items-start gap-2.5">
            <span className="text-muted-foreground mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold">
              {index + 1}
            </span>
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
