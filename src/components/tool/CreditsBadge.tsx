import { Badge } from '@/shared/components/ui/badge';

type CreditsBadgeProps = {
  loggedIn: boolean;
  creditsBalance: number;
  remainingFreeGenerations: number;
};

export function CreditsBadge(props: CreditsBadgeProps) {
  const { loggedIn, creditsBalance, remainingFreeGenerations } = props;

  if (loggedIn) {
    return <Badge variant="outline">Credits: {Math.max(0, creditsBalance)}</Badge>;
  }

  return (
    <Badge variant="outline">
      Free left: {Math.max(0, remainingFreeGenerations)}/2
    </Badge>
  );
}
