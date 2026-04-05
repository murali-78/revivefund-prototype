"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Item = { label: string; percent: number };

type Props = {
  items: Item[];
};

const COLORS = ["#22c55e", "#0ea5e9", "#eab308", "#fb7185", "#a855f7"];

export function FundUsagePie({ items }: Props) {
  const total = items.reduce((sum, item) => sum + (item.percent || 0), 0) || 1;
  const data = items.map((item) => ({
    ...item,
    value: (item.percent / total) * 100,
  }));

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={45}
              outerRadius={70}
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.label}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#020617"
                  strokeWidth={1}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                borderRadius: 12,
                border: "1px solid rgba(148, 163, 184, 0.4)",
                fontSize: 11,
              }}
              labelStyle={{ color: "#e2e8f0" }}
              formatter={(
                value: unknown,
                name: string | undefined,
                entry: { payload?: { label?: string } },
              ) => [
                `${Math.round(Number(value))}%`,
                entry?.payload?.label ?? name ?? "",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
        {data.map((item, index) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="truncate">{item.label}</span>
            <span className="ml-auto text-slate-500">
              {Math.round(item.value).toString()}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

