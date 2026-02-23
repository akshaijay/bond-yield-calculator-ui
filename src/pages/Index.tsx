import { useState } from "react";
import BondInputForm from "@/components/BondInputForm";
import BondResults from "@/components/BondResults";
import CashFlowTable from "@/components/CashFlowTable";
import {
  calculateBond,
  generateCashFlowSchedule,
  type BondInput,
  type BondOutput,
  type CashFlowRow,
} from "@/lib/bond-calculator";

const Index = () => {
  const [results, setResults] = useState<BondOutput | null>(null);
  const [cashFlow, setCashFlow] = useState<CashFlowRow[]>([]);
  const [lastInput, setLastInput] = useState<BondInput | null>(null);

  const handleCalculate = (input: BondInput) => {
    setResults(calculateBond(input));
    setCashFlow(generateCashFlowSchedule(input));
    setLastInput(input);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container max-w-5xl mx-auto py-4 px-4">
          <h1 className="text-xl font-bold tracking-tight">Bond Yield Calculator</h1>
          <p className="text-sm text-muted-foreground">
            Calculate current yield, YTM, and view cash flow schedules
          </p>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto py-6 px-4 space-y-6">
        <div className="grid md:grid-cols-[340px_1fr] gap-6">
          <BondInputForm onCalculate={handleCalculate} />
          {results ? (
            <BondResults results={results} />
          ) : (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-border p-12">
              <p className="text-muted-foreground text-sm">
                Enter bond parameters and click Calculate to see results
              </p>
            </div>
          )}
        </div>

        {cashFlow.length > 0 && lastInput && (
          <CashFlowTable rows={cashFlow} faceValue={lastInput.faceValue} />
        )}
      </main>
    </div>
  );
};

export default Index;
