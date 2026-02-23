import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BondInput } from "@/interfaces/bond";
import { DollarSign, Percent, TrendingUp, Calendar, Clock } from "lucide-react";

interface Props {
  input: BondInput;
}

export default function ResultsInputDisplay({ input }: Props) {
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const inputFields = [
    {
      label: "Face Value",
      value: formatCurrency(input.faceValue),
      icon: DollarSign,
    },
    {
      label: "Annual Coupon Rate",
      value: formatPercentage(input.annualCouponRate),
      icon: Percent,
    },
    {
      label: "Market Price",
      value: formatCurrency(input.marketPrice),
      icon: TrendingUp,
    },
    {
      label: "Years to Maturity",
      value: `${input.yearsToMaturity.toFixed(2)} years`,
      icon: Calendar,
    },
    {
      label: "Coupon Frequency",
      value: input.couponFrequency === "annual" ? "Annual" : "Semi-Annual",
      icon: Clock,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Bond Parameters</CardTitle>
        <p className="text-sm text-muted-foreground">Input values used for calculation</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {inputFields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.label} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground font-medium">{field.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-mono text-sm font-semibold">{field.value}</p>
                  {field.label === "Coupon Frequency" && (
                    <Badge variant="outline" className="text-xs">
                      {input.couponFrequency === "annual" ? "1x/year" : "2x/year"}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
