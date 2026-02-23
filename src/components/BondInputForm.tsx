import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, Percent, Clock, Repeat } from "lucide-react";
import type { CouponFrequency } from "@/interfaces/bond";


export default function BondInputForm() {
  const navigate = useNavigate();
  const [faceValue, setFaceValue] = useState("");
  const [couponRate, setCouponRate] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState<CouponFrequency>("annual");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const input = {
      faceValue: parseFloat(faceValue),
      annualCouponRate: parseFloat(couponRate),
      marketPrice: parseFloat(marketPrice),
      yearsToMaturity: parseFloat(years),
      couponFrequency: frequency,
    };

    // Build query string
    const params = new URLSearchParams({
      faceValue: faceValue,
      annualCouponRate: couponRate,
      marketPrice: marketPrice,
      yearsToMaturity: years,
      couponFrequency: frequency,
    });

    // Navigate to results page with query parameters
    navigate(`/results?${params.toString()}`);
  };

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm border-border/50 shadow-xl">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="faceValue" className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                <DollarSign className="h-3 w-3" /> Face Value
              </Label>
              <Input
                id="faceValue"
                type="number"
                min="0"
                step="0.01"
                value={faceValue}
                placeholder="1000"
                onChange={(e) => setFaceValue(e.target.value)}
                className="font-mono h-11 text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="couponRate" className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                <Percent className="h-3 w-3" /> Coupon Rate
              </Label>
              <Input
                id="couponRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={couponRate}
                placeholder="5"
                onChange={(e) => setCouponRate(e.target.value)}
                className="font-mono h-11 text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketPrice" className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                <DollarSign className="h-3 w-3" /> Market Price
              </Label>
              <Input
                id="marketPrice"
                type="number"
                min="0"
                step="0.01"
                value={marketPrice}
                placeholder="950"
                onChange={(e) => setMarketPrice(e.target.value)}
                className="font-mono h-11 text-base"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years" className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-medium">
                <Clock className="h-3 w-3" /> Years to Maturity
              </Label>
              <Input
                id="years"
                type="number"
                min="0.5"
                step="0.5"
                value={years}
                placeholder="10"
                onChange={(e) => setYears(e.target.value)}
                className="font-mono h-11 text-base"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground font-medium">
              <Repeat className="h-3 w-3" /> Coupon Frequency
            </Label>
            <Select value={frequency} onValueChange={(v) => setFrequency(v as CouponFrequency)}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="semi-annual">Semi-Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold gap-2 mt-2" size="lg">
            <Calculator className="h-4 w-4" />
            Calculate Yield
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
