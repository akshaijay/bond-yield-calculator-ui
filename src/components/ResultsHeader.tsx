import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

interface Props {
  onBack: () => void;
}

export default function ResultsHeader({ onBack }: Props) {
  return (
    <header className="sticky top-0 z-50 border-b bg-white backdrop-blur-md">
      <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo onClick={onBack}  />
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">New Calculation</span>
        </Button>
      </div>
    </header>
  );
}
