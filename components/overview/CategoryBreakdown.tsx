"use client";

import React from "react";
import { Receipt, ReceiptType } from "@/types/receipts";
import { CATEGORY_CONFIG } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { PieChart, Clock, Layers } from "lucide-react";

interface CategoryBreakdownProps {
  receipts: Receipt[];
  onSelectCategory: (category: ReceiptType) => void;
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  receipts,
  onSelectCategory,
}) => {
  // Aggregate category counts
  const data = Object.keys(CATEGORY_CONFIG).map((key) => {
    const type = key as ReceiptType;
    const config = CATEGORY_CONFIG[type];
    const count = receipts.filter((r) => r.type === type).length;
    return {
      type,
      name: config.name,
      count,
      color: config.color,
    };
  });

  // Time of day breakdown
  const timeOfDayCounts = {
    morning: receipts.filter((r) => r.timeOfDay === "morning").length,
    afternoon: receipts.filter((r) => r.timeOfDay === "afternoon").length,
    evening: receipts.filter((r) => r.timeOfDay === "evening").length,
    late_night: receipts.filter((r) => r.timeOfDay === "late_night").length,
  };

  const timeData = [
    { label: "Morning", sub: "06:00 – 12:00", count: timeOfDayCounts.morning, pct: Math.round((timeOfDayCounts.morning / receipts.length) * 100), color: "#f59e0b" },
    { label: "Afternoon", sub: "12:00 – 18:00", count: timeOfDayCounts.afternoon, pct: Math.round((timeOfDayCounts.afternoon / receipts.length) * 100), color: "#06b6d4" },
    { label: "Evening", sub: "18:00 – 23:00", count: timeOfDayCounts.evening, pct: Math.round((timeOfDayCounts.evening / receipts.length) * 100), color: "#3b82f6" },
    { label: "Late Night", sub: "23:00 – 05:00", count: timeOfDayCounts.late_night, pct: Math.round((timeOfDayCounts.late_night / receipts.length) * 100), color: "#8b5cf6" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Category Activity Chart */}
      <div className="lg:col-span-7 rounded-2xl border border-museum-800 bg-museum-900/90 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-museum-800 pb-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Category Distribution</span>
          </div>
          <span className="text-xs font-mono text-museum-400">9 dimensions of living</span>
        </div>

        <p className="text-xs text-museum-300 font-sans leading-relaxed">
          Every receipt category captures a different facet of conscious presence: from private journal notes to public communal gatherings.
        </p>

        {/* Recharts Bar Visualization */}
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <XAxis type="number" stroke="#606b8c" fontSize={11} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#bcc3d6"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f1118",
                  borderColor: "#2d3448",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "#f3f4f8",
                }}
                formatter={(val: number) => [`${val} moments`, "Total"]}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} cursor="pointer">
                {data.map((entry) => (
                  <Cell
                    key={entry.type}
                    fill={entry.color}
                    onClick={() => onSelectCategory(entry.type)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-[11px] font-mono text-museum-400 text-right">
          Click any bar to filter receipts by category
        </div>
      </div>

      {/* Time of Day Rhythm */}
      <div className="lg:col-span-5 rounded-2xl border border-museum-800 bg-museum-900/90 p-5 sm:p-6 shadow-xl space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-museum-800 pb-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Circadian Rhythm</span>
            </div>
            <span className="text-xs font-mono text-museum-400">Time-of-day</span>
          </div>

          <p className="text-xs text-museum-300 font-sans leading-relaxed mt-3">
            A distinct nocturnal bias: 31% of meaningful creative breakthroughs and journal reflections were authored after 11:00 PM.
          </p>

          <div className="mt-4 space-y-3">
            {timeData.map((t) => (
              <div key={t.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                    <span className="text-museum-100 font-medium">{t.label}</span>
                    <span className="text-museum-500 text-[10px]">({t.sub})</span>
                  </div>
                  <span className="text-gold font-bold">{t.count} ({t.pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-museum-950 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${t.pct}%`, backgroundColor: t.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-museum-950/80 border border-museum-850 text-xs text-museum-300">
          <span className="text-gold font-mono font-bold block mb-1">Observation:</span>
          Morning activity is routine-driven (coffee, transit). Late-night activity is exploration-driven (ambient synthesis, journal manifestos).
        </div>
      </div>
    </div>
  );
};
