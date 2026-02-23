import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BondOutput } from "@/interfaces/bond";
import { TrendingUp, TrendingDown, Minus, BarChart3, Target, Banknote, ArrowLeftRight } from "lucide-react";

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

  const cards = [
    {
      label: "Current Yield",
      value: `${results.currentYield.toFixed(3)}%`,
      icon: BarChart3,
      highlight: false,
    },
    {
      label: "Yield to Maturity",
      value: `${results.ytm.toFixed(3)}%`,
      icon: Target,
      highlight: true,
    },
    {
      label: "Total Interest",
      value: `$${results.totalInterest.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: Banknote,
      highlight: false,
    },
    {
      label:
        results.premiumDiscount === "par"
          ? "Difference"
          : results.premiumDiscount === "premium"
          ? "Premium Amount"
          : "Discount Amount",
      value: `$${results.premiumDiscountAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: ArrowLeftRight,
      highlight: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Analysis Results</h2>
        <Badge variant="outline" className={`${status.className} px-3 py-1`}>
          <StatusIcon className="w-3.5 h-3.5 mr-1.5" />
          {status.label} — {status.description}
        </Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.label}
              className={`transition-all hover:shadow-md ${
                card.highlight ? "border-primary/30 bg-primary/5" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-medium">{card.label}</p>
                </div>
                <p
                  className={`font-mono text-xl font-bold ${
                    card.highlight ? "text-primary" : "text-foreground"
                  }`}
                >
                  {card.value}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
