"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { month: string; revenue: number; expenses: number };

type Props = {
  history: Point[];
};

export function RevenueChart({ history }: Props) {
  const data = history.map((p) => ({
    ...p,
    label: p.month.slice(5),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="rev" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="exp" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#fb7185" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#fb7185" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1f2937"
          vertical={false}
          strokeOpacity={0.6}
        />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#94a3b8", fontSize: 10 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{ fill: "#64748b", fontSize: 10 }}
          tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#020617",
            borderRadius: 12,
            border: "1px solid rgba(148, 163, 184, 0.4)",
            fontSize: 11,
          }}
          labelStyle={{ color: "#e2e8f0" }}
          formatter={(value: unknown, name: string) => [
            `${Number(value).toLocaleString()} rSOL`,
            name === "revenue" ? "Revenue" : "Expenses",
          ]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#22c55e"
          strokeWidth={2}
          fill="url(#rev)"
          name="revenue"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          stroke="#fb7185"
          strokeWidth={1.5}
          fill="url(#exp)"
          name="expenses"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

