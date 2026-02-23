import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CashFlowRow } from "@/interfaces/bond";

interface Props {
  rows: CashFlowRow[];
  faceValue: number;
}

function fmt(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export default function CashFlowChart({ rows, faceValue }: Props) {
  const data = rows.map((r) => ({
    period: `P${r.period}`,
    coupon: r.couponPayment,
    cumulative: r.cumulativeInterest,
    principal: r.period === rows.length ? faceValue : 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Cash Flow Visualization</CardTitle>
        <p className="text-sm text-muted-foreground">
          Cumulative interest growth over {rows.length} periods
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cumulative Interest Area Chart */}
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Cumulative Interest</p>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(217, 91%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 88%)" opacity={0.3} />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 10, fill: "hsl(220, 10%, 46%)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "hsl(220, 10%, 46%)" }}
                    tickFormatter={(v) => fmt(v)}
                    tickLine={false}
                    axisLine={false}
                    width={60}
                  />
                  <Tooltip
                    formatter={(value: number) => [fmt(value), "Cumulative Interest"]}
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(220, 13%, 88%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    stroke="hsl(217, 91%, 50%)"
                    strokeWidth={2}
                    fill="url(#colorCumulative)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Coupon + Principal Bar Chart */}
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Per-Period Cash Flow</p>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 88%)" opacity={0.3} />
                  <XAxis
                    dataKey="period"
                    tick={{ fontSize: 10, fill: "hsl(220, 10%, 46%)" }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 10, fill: "hsl(220, 10%, 46%)" }}
                    tickFormatter={(v) => fmt(v)}
                    tickLine={false}
                    axisLine={false}
                    width={60}
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      fmt(value),
                      name === "coupon" ? "Coupon" : "Principal Return",
                    ]}
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(220, 13%, 88%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="coupon" fill="hsl(217, 91%, 50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="principal" fill="hsl(152, 60%, 40%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
