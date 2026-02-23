import BondResults from "@/components/BondResults";
import type { BondOutput } from "@/lib/bond-calculator";

interface Props {
  results: BondOutput;
}

export default function ResultsSummary({ results }: Props) {
  return <BondResults results={results} />;
}
