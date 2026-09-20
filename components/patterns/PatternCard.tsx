"use client";

import React from "react";
import { LifePattern, Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Sparkles, Repeat, ArrowRight, CheckCircle2 } from "lucide-react";

interface PatternCardProps {
  pattern: LifePattern;
  allReceipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
}

export const PatternCard: React.FC<PatternCardProps> = ({
  pattern,
  allReceipts,
  onSelectReceipt,
}) => {
  // Find supporting receipt objects
  const supportingReceipts = pattern.supportingReceiptIds
    .map((id) => allReceipts.find((r) => r.id === id))
    .filter(Boolean) as Receipt[];

  return (
    <div className="rounded-2xl border border-museum-800 bg-museum-900/90 p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-5 hover:border-gold/40 transition-all">
      <div>
        {/* Top Meta: Confidence Badge & Categories */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-museum-850 pb-3">
          <div className="flex items-center space-x-2">
            {pattern.categories.map((catType) => {
              const config = CATEGORY_CONFIG[catType];
              return (
                <span
                  key={catType}
                  className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border"
                  style={{
                    backgroundColor: config.bgMuted,
                    color: config.color,
                    borderColor: config.border,
                  }}
                >
                  {config.name}
                </span>
              );
            })}
          </div>

          <div className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            <span>Pattern detected ({pattern.confidence}% consistency)</span>
          </div>
        </div>

        {/* Title & Explanation */}
        <div className="mt-3.5 space-y-2">
          <h3 className="text-xl font-serif font-bold text-museum-100 leading-snug">
            {pattern.title}
          </h3>
          <p className="text-xs text-museum-300 font-sans leading-relaxed">
            {pattern.explanation}
          </p>
        </div>

        {/* Metric Highlight Box */}
        <div className="mt-3 p-3 rounded-xl bg-museum-950 border border-museum-850 text-xs font-mono text-gold flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>{pattern.metric}</span>
        </div>

        {/* Mini Chart Visualization */}
        <div className="mt-4 pt-3 border-t border-museum-850 space-y-1">
          <span className="text-[10px] font-mono uppercase text-museum-500 tracking-wider block">
            Frequency Distribution:
          </span>
          <div className="h-28 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pattern.chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="label" stroke="#606b8c" fontSize={10} tickLine={false} />
                <YAxis stroke="#606b8c" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f1118",
                    borderColor: "#2d3448",
                    borderRadius: "6px",
                    fontSize: "11px",
                    color: "#f3f4f8",
                  }}
                />
                <Bar dataKey="value" fill="#e2b170" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Supporting Moments Carousel/Pills */}
      <div className="pt-3 border-t border-museum-850 space-y-2">
        <span className="text-[10px] font-mono uppercase text-museum-500 tracking-wider block">
          Supporting Traces in Dataset ({supportingReceipts.length}):
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {supportingReceipts.slice(0, 4).map((r) => {
            const cat = CATEGORY_CONFIG[r.type];
            return (
              <div
                key={r.id}
                onClick={() => onSelectReceipt(r)}
                className="p-2 rounded-lg bg-museum-950/80 border border-museum-800 hover:border-gold/40 cursor-pointer transition-colors group flex items-center justify-between"
              >
                <div className="min-w-0 pr-1">
                  <span style={{ color: cat.color }} className="text-[9px] font-mono uppercase block font-semibold">
                    {cat.name}
                  </span>
                  <span className="text-xs text-museum-200 group-hover:text-gold transition-colors truncate block">
                    {r.title}
                  </span>
                </div>
                <ArrowRight className="w-3 h-3 text-museum-500 group-hover:text-gold shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
