import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CashFlowRow } from "@/interfaces/bond";

interface Props {
  rows: CashFlowRow[];
  faceValue: number;
}

function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CashFlowTable({ rows, faceValue }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Cash Flow Schedule</CardTitle>
        <p className="text-sm text-muted-foreground">
          {rows.length} periods · Face value ${fmt(faceValue)}
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-auto max-h-[420px]">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16">Period</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead className="text-right">Coupon Payment</TableHead>
                <TableHead className="text-right">Cumulative Interest</TableHead>
                <TableHead className="text-right">Remaining Principal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.period}>
                  <TableCell className="font-mono text-muted-foreground">{row.period}</TableCell>
                  <TableCell className="text-sm">{row.date}</TableCell>
                  <TableCell className="text-right font-mono">${fmt(row.couponPayment)}</TableCell>
                  <TableCell className="text-right font-mono">${fmt(row.cumulativeInterest)}</TableCell>
                  <TableCell className="text-right font-mono">
                    {row.remainingPrincipal === 0 ? (
                      <span className="text-positive font-semibold">Returned</span>
                    ) : (
                      `$${fmt(row.remainingPrincipal)}`
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
