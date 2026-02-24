import { useSearchParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { type BondInput, type BondOutput, type CashFlowRow } from "@/interfaces/bond";
import ResultsHeader from "@/components/ResultsHeader";
import ResultsInputDisplay from "@/components/ResultsInputDisplay";
import ResultsSummary from "@/components/ResultsSummary";
import ResultsSkeleton from "@/components/ResultsSkeleton";
import CashFlowChart from "@/components/CashFlowChart";
import CashFlowTable from "@/components/CashFlowTable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { setBondData } from "@/store/bondSlice";

interface ParsedParams {
  input: BondInput | null;
  error: string | null;
}

function parseSearchParams(searchParams: URLSearchParams): ParsedParams {
  try {
    const faceValue = parseFloat(searchParams.get("faceValue") || "");
    const annualCouponRate = parseFloat(searchParams.get("annualCouponRate") || "");
    const marketPrice = parseFloat(searchParams.get("marketPrice") || "");
    const yearsToMaturity = parseFloat(searchParams.get("yearsToMaturity") || "");
    const couponFrequency = (searchParams.get("couponFrequency") || "annual") as "annual" | "semi-annual";

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
      return {
        input: null,
        error:
          "Invalid or missing query parameters. Please provide valid faceValue, annualCouponRate, marketPrice, and yearsToMaturity.",
      };
    }

    if (couponFrequency !== "annual" && couponFrequency !== "semi-annual") {
      return {
        input: null,
        error: "Invalid couponFrequency. Must be 'annual' or 'semi-annual'.",
      };
    }

    const input: BondInput = {
      faceValue,
      annualCouponRate,
      marketPrice,
      yearsToMaturity,
      couponFrequency,
    };

    return { input, error: null };
  } catch (err) {
    return {
      input: null,
      error: err instanceof Error ? err.message : "An error occurred while processing the bond calculation.",
    };
  }
}

const Results = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { input, error: parseError } = useMemo(() => parseSearchParams(searchParams), [searchParams]);

  const {
    data: results,
    isLoading: isLoadingResults,
    isError: isResultsError,
    error: resultsError,
  } = useQuery<BondOutput>({
    queryKey: ["bondCalculation", input],
    queryFn: async () => {
      const response = await api.post<BondOutput>("/bond/calculate", input);
      return response.data;
    },
    enabled: !!input && !parseError,
  });

  const {
    data: cashFlow,
    isLoading: isLoadingCashFlow,
    isError: isCashFlowError,
    error: cashFlowError,
  } = useQuery<CashFlowRow[]>({
    queryKey: ["cashFlowSchedule", input],
    queryFn: async () => {
      const response = await api.post<CashFlowRow[]>("/bond/cash-flow-schedule", input);
      return response.data;
    },
    enabled: !!input && !parseError,
  });

  if (input && results && cashFlow) {
    dispatch(
      setBondData({
        input,
        results,
        cashFlow,
      }),
    );
  }

  const effectiveError =
    parseError ||
    (isResultsError ? (resultsError as Error | null)?.message ?? "Failed to fetch bond results." : null) ||
    (isCashFlowError ? (cashFlowError as Error | null)?.message ?? "Failed to fetch cash flow schedule." : null);

  if (effectiveError) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{effectiveError}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const isLoading = isLoadingResults || isLoadingCashFlow;

  if (!input || isLoading || !results || !cashFlow) {
    return (
      <div className="min-h-screen bg-muted">
        {/* Decorative bg */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[15%] h-[500px] w-[500px] rounded-full bg-primary/3 blur-3xl" />
        </div>

        <ResultsHeader onBack={() => navigate("/")} />
        <ResultsSkeleton />
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
          <ResultsInputDisplay input={input} />
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
              <CashFlowChart rows={cashFlow} faceValue={input.faceValue} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CashFlowTable rows={cashFlow} faceValue={input.faceValue} />
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};

export default Results;
