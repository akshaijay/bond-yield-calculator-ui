import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  calculateBond,
  generateCashFlowSchedule,
  type BondInput,
  type BondOutput,
  type CashFlowRow,
} from "@/lib/bond-calculator";
import ResultsHeader from "@/components/ResultsHeader";
import ResultsInputDisplay from "@/components/ResultsInputDisplay";
import ResultsSummary from "@/components/ResultsSummary";
import CashFlowChart from "@/components/CashFlowChart";
import CashFlowTable from "@/components/CashFlowTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bondInput, setBondInput] = useState<BondInput | null>(null);
  const [results, setResults] = useState<BondOutput | null>(null);
  const [cashFlow, setCashFlow] = useState<CashFlowRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Parse query parameters
      const faceValue = parseFloat(searchParams.get("faceValue") || "");
      const annualCouponRate = parseFloat(searchParams.get("annualCouponRate") || "");
      const marketPrice = parseFloat(searchParams.get("marketPrice") || "");
      const yearsToMaturity = parseFloat(searchParams.get("yearsToMaturity") || "");
      const couponFrequency = (searchParams.get("couponFrequency") || "annual") as "annual" | "semi-annual";

      // Validate required parameters
      if (
        isNaN(faceValue) ||
        isNaN(annualCouponRate) ||
        isNaN(marketPrice) ||
        isNaN(yearsToMaturity) ||
        faceValue <= 0 ||
        annualCouponRate < 0 ||
        marketPrice <= 0 ||
        yearsToMaturity <= 0
      ) {
        setError("Invalid or missing query parameters. Please provide valid faceValue, annualCouponRate, marketPrice, and yearsToMaturity.");
        return;
      }

      // Validate coupon frequency
      if (couponFrequency !== "annual" && couponFrequency !== "semi-annual") {
        setError("Invalid couponFrequency. Must be 'annual' or 'semi-annual'.");
        return;
      }

      const input: BondInput = {
        faceValue,
        annualCouponRate,
        marketPrice,
        yearsToMaturity,
        couponFrequency,
      };

      setBondInput(input);
      setResults(calculateBond(input));
      setCashFlow(generateCashFlowSchedule(input));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while processing the bond calculation.");
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!bondInput || !results) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Decorative bg */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[15%] h-[500px] w-[500px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <ResultsHeader onBack={() => navigate("/")} />

      <main className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ResultsInputDisplay input={bondInput} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ResultsSummary results={results} />
        </motion.div>

        {cashFlow.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CashFlowChart rows={cashFlow} faceValue={bondInput.faceValue} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CashFlowTable rows={cashFlow} faceValue={bondInput.faceValue} />
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};

export default Results;
