import { motion, AnimatePresence } from "framer-motion";
import BondInputForm from "@/components/BondInputForm";
import Logo from "@/components/Logo";

const Index = () => {
  return (
    <div className="min-h-screen bg-muted">
      {/* Decorative bg */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[20%] h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[15%] h-[500px] w-[500px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
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
              <BondInputForm />
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
      </AnimatePresence>
    </div>
  );
};

export default Index;
