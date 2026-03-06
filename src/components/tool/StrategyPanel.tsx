type StrategyPanelProps = {
  items: string[];
};

export function StrategyPanel({ items }: StrategyPanelProps) {
  return (
    <div className="rounded-md border bg-muted/30 p-4">
      <h4 className="text-sm font-semibold">Strategy</h4>
      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
