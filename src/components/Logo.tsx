import { TrendingUp } from "lucide-react";

export default function Logo({ size = "default", onClick }: { size?: "default" | "large", onClick?: () => void }) {
  const isLarge = size === "large";
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
      <div
        className={`flex items-center justify-center rounded-xl bg-primary text-primary-foreground ${
          isLarge ? "h-12 w-12" : "h-9 w-9"
        }`}
      >
        <TrendingUp className={isLarge ? "h-6 w-6" : "h-4 w-4"} />
      </div>
      <div>
        <h1 className={`font-bold tracking-tight leading-none ${isLarge ? "text-2xl" : "text-lg"}`}>
          BondCalc
        </h1>
        {isLarge && (
          <p className="text-xs text-muted-foreground mt-0.5">Yield & Cash Flow Analyzer</p>
        )}
      </div>
    </div>
  );
}
