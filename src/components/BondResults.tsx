import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BondOutput } from "@/lib/bond-calculator";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface Props {
  results: BondOutput;
}

export default function BondResults({ results }: Props) {
  const statusConfig = {
    premium: {
      label: "Premium",
      icon: TrendingUp,
      className: "bg-negative/10 text-negative border-negative/20",
      description: "Trading above face value",
    },
    discount: {
      label: "Discount",
      icon: TrendingDown,
      className: "bg-positive/10 text-positive border-positive/20",
      description: "Trading below face value",
    },
    par: {
      label: "At Par",
      icon: Minus,
      className: "bg-muted text-muted-foreground border-border",
      description: "Trading at face value",
    },
  };

  const status = statusConfig[results.premiumDiscount];
  const StatusIcon = status.icon;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Results</CardTitle>
          <Badge variant="outline" className={status.className}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {status.label}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{status.description}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <ResultCard
            label="Current Yield"
            value={`${results.currentYield.toFixed(3)}%`}
          />
          <ResultCard
            label="Yield to Maturity"
            value={`${results.ytm.toFixed(3)}%`}
            highlight
          />
          <ResultCard
            label="Total Interest"
            value={`$${results.totalInterest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          />
          <ResultCard
            label={results.premiumDiscount === "par" ? "Difference" : results.premiumDiscount === "premium" ? "Premium Amount" : "Discount Amount"}
            value={`$${results.premiumDiscountAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-3 ${highlight ? "bg-primary/5 border border-primary/20" : "bg-muted/50"}`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`font-mono text-lg font-semibold ${highlight ? "text-primary" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}
