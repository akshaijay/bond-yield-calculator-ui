import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BondInput, CouponFrequency } from "@/lib/bond-calculator";

interface Props {
  onCalculate: (input: BondInput) => void;
}

export default function BondInputForm({ onCalculate }: Props) {
  const [faceValue, setFaceValue] = useState("1000");
  const [couponRate, setCouponRate] = useState("5");
  const [marketPrice, setMarketPrice] = useState("950");
  const [years, setYears] = useState("10");
  const [frequency, setFrequency] = useState<CouponFrequency>("semi-annual");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      faceValue: parseFloat(faceValue),
      annualCouponRate: parseFloat(couponRate),
      marketPrice: parseFloat(marketPrice),
      yearsToMaturity: parseFloat(years),
      couponFrequency: frequency,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Bond Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="faceValue">Face Value ($)</Label>
            <Input
              id="faceValue"
              type="number"
              min="0"
              step="0.01"
              value={faceValue}
              onChange={(e) => setFaceValue(e.target.value)}
              className="font-mono"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="couponRate">Annual Coupon Rate (%)</Label>
            <Input
              id="couponRate"
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={couponRate}
              onChange={(e) => setCouponRate(e.target.value)}
              className="font-mono"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketPrice">Market Price ($)</Label>
            <Input
              id="marketPrice"
              type="number"
              min="0"
              step="0.01"
              value={marketPrice}
              onChange={(e) => setMarketPrice(e.target.value)}
              className="font-mono"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Years to Maturity</Label>
            <Input
              id="years"
              type="number"
              min="0.5"
              step="0.5"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="font-mono"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Coupon Frequency</Label>
            <Select value={frequency} onValueChange={(v) => setFrequency(v as CouponFrequency)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="semi-annual">Semi-Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full mt-2">
            Calculate Yield
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
