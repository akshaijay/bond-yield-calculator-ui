import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BondInputForm from "@/components/BondInputForm";
import BondResults from "@/components/BondResults";
import CashFlowTable from "@/components/CashFlowTable";
import CashFlowChart from "@/components/CashFlowChart";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
  const [screen, setScreen] = useState<"input" | "results">("input");
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (input: BondInput) => {
    setResults(calculateBond(input));
    setCashFlow(generateCashFlowSchedule(input));
    setLastInput(input);
    setScreen("results");
  };

  const handleBack = () => {
    setScreen("input");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative bg */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[15%] h-[500px] w-[500px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {screen === "input" ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mb-8 text-center"
            >
              <div className="flex justify-center mb-4">
                <Logo size="large" />
              </div>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                Calculate current yield, YTM, and view detailed cash flow schedules for any bond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="w-full"
            >
              <BondInputForm onCalculate={handleCalculate} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-xs text-muted-foreground/60"
            >
              YTM solved via Newton-Raphson iteration
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="min-h-screen"
          >
            {/* Header */}
            <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
              <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                <Logo />
                <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">New Calculation</span>
                </Button>
              </div>
            </header>

            {/* Results content */}
            <main ref={resultsRef} className="container max-w-6xl mx-auto px-4 py-6 space-y-6">
              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <BondResults results={results} />
                </motion.div>
              )}

              {cashFlow.length > 0 && lastInput && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CashFlowChart rows={cashFlow} faceValue={lastInput.faceValue} />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <CashFlowTable rows={cashFlow} faceValue={lastInput.faceValue} />
                  </motion.div>
                </>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
