"use client";

import React, { useState, useMemo } from "react";
import { Receipt, ReceiptType } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate } from "@/lib/utils";
import { Activity, Sparkles, ArrowRight, Calendar, Compass, MapPin } from "lucide-react";

interface LifePulseProps {
  receipts: Receipt[];
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
  onSelectReceipt: (receipt: Receipt) => void;
  onFilterByMonth: (monthIndex: number) => void;
}

interface MonthSummary {
  name: string;
  monthIndex: number; // 2=March, 3=April, etc.
  year: number;
  label: string;
  narrativeHeadline: string;
  detectedTheme: string;
  count: number;
  categoryBreakdown: Partial<Record<ReceiptType, number>>;
  notableReceipts: Receipt[];
}

export const LifePulse: React.FC<LifePulseProps> = ({
  receipts,
  selectedMonth,
  onSelectMonth,
  onSelectReceipt,
  onFilterByMonth,
}) => {
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Month data definition
  const monthsConfig: Array<{ name: string; index: number; year: number; headline: string; theme: string }> = [
    {
      name: "March",
      index: 2,
      year: 2024,
      headline: "A quiet, solitary incubation behind closed doors.",
      theme: "Creativity & Solitude",
    },
    {
      name: "April",
      index: 3,
      year: 2024,
      headline: "Movement across borders: Berlin studios and a key partnership.",
      theme: "Exploration & Connection",
    },
    {
      name: "May",
      index: 4,
      year: 2024,
      headline: "Listening to the Atlantic: Waves, dunes, and the Marvila warehouse.",
      theme: "Discovery & Ocean",
    },
    {
      name: "June",
      index: 5,
      year: 2024,
      headline: "Festivals, midsummer rooftops, and community warmth.",
      theme: "Celebration & Community",
    },
    {
      name: "July",
      index: 6,
      year: 2024,
      headline: "Exhaustive staging, cable rigging, and the optical breakthrough.",
      theme: "Rigging & Creation",
    },
    {
      name: "August",
      index: 7,
      year: 2024,
      headline: "Your life became more social, culminating in the exhibition and midnight overlook.",
      theme: "Culmination & Connection",
    },
  ];

  // Compute stats for each month
  const monthSummaries: MonthSummary[] = useMemo(() => {
    return monthsConfig.map((m) => {
      const monthReceipts = receipts.filter((r) => {
        const d = new Date(r.timestamp);
        return d.getUTCMonth() === m.index && d.getUTCFullYear() === m.year;
      });

      const breakdown: Partial<Record<ReceiptType, number>> = {};
      for (const r of monthReceipts) {
        breakdown[r.type] = (breakdown[r.type] || 0) + 1;
      }

      // Top notable moments (importance >= 4 or high connectivity)
      const notable = [...monthReceipts]
        .sort((a, b) => b.importance - a.importance)
        .slice(0, 3);

      return {
        name: m.name,
        monthIndex: m.index,
        year: m.year,
        label: `${m.name} ${m.year}`,
        narrativeHeadline: m.headline,
        detectedTheme: m.theme,
        count: monthReceipts.length,
        categoryBreakdown: breakdown,
        notableReceipts: notable,
      };
    });
  }, [receipts]);

  const activeSummary =
    monthSummaries.find((m) => m.name === (hoveredMonth || selectedMonth)) ||
    monthSummaries[5]; // Default to August

  // Maximum count for scaling bar heights
  const maxCount = Math.max(...monthSummaries.map((m) => m.count), 1);

  return (
    <div className="rounded-2xl border border-museum-800 bg-museum-900/90 p-5 sm:p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-museum-800 pb-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-gold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Interactive Life Pulse</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-museum-100 mt-1">
            Activity Density &amp; Rhythm Over Time
          </h3>
        </div>
        <div className="text-xs font-mono text-museum-400">
          Click any month to inspect detected themes &amp; moments
        </div>
      </div>

      {/* Visual Density Spectrum / Bar Wave */}
      <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end pt-4 pb-2 h-44 px-2">
        {monthSummaries.map((m) => {
          const isSelected = selectedMonth === m.name;
          const isHovered = hoveredMonth === m.name;
          const heightPercent = Math.max(25, Math.round((m.count / maxCount) * 100));

          return (
            <div
              key={m.name}
              onMouseEnter={() => setHoveredMonth(m.name)}
              onMouseLeave={() => setHoveredMonth(null)}
              onClick={() => onSelectMonth(m.name)}
              className="flex flex-col items-center h-full justify-end cursor-pointer group select-none"
            >
              {/* Moment count badge */}
              <span
                className={`text-[11px] font-mono mb-2 transition-all ${
                  isSelected || isHovered
                    ? "text-gold font-bold scale-110"
                    : "text-museum-400 group-hover:text-museum-200"
                }`}
              >
                {m.count}
              </span>

              {/* Stacked category segments bar */}
              <div
                className={`w-full max-w-[56px] rounded-xl overflow-hidden transition-all duration-200 flex flex-col justify-end border ${
                  isSelected
                    ? "border-gold shadow-[0_0_20px_rgba(226,177,112,0.35)] scale-105"
                    : isHovered
                    ? "border-museum-500 bg-museum-800"
                    : "border-museum-750/70 bg-museum-850/80"
                }`}
                style={{ height: `${heightPercent}%` }}
              >
                {/* Segments representing dominant types */}
                {Object.entries(m.categoryBreakdown).map(([catType, count]) => {
                  const config = CATEGORY_CONFIG[catType as ReceiptType];
                  const segmentHeight = Math.max(3, ((count as number) / m.count) * 100);
                  return (
                    <div
                      key={catType}
                      style={{
                        height: `${segmentHeight}%`,
                        backgroundColor: config.color,
                        opacity: isSelected ? 0.9 : 0.65,
                      }}
                      title={`${config.name}: ${count}`}
                      className="w-full transition-opacity"
                    />
                  );
                })}
              </div>

              {/* Month label */}
              <span
                className={`mt-2 text-xs font-mono transition-colors ${
                  isSelected
                    ? "text-gold font-bold"
                    : "text-museum-400 group-hover:text-museum-200"
                }`}
              >
                {m.name.slice(0, 3)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Context Panel updated by click/hover */}
      <div className="p-4 sm:p-5 rounded-xl bg-museum-950 border border-museum-800 space-y-4 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-museum-850 pb-3">
          <div>
            <span className="text-[11px] font-mono text-gold uppercase tracking-wider">
              {activeSummary.label}
            </span>
            <h4 className="text-base sm:text-lg font-serif font-bold text-museum-100 mt-0.5">
              &ldquo;{activeSummary.narrativeHeadline}&rdquo;
            </h4>
          </div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-museum-900 border border-gold/30 text-gold text-xs font-mono self-start sm:self-auto shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Theme: {activeSummary.detectedTheme}</span>
          </div>
        </div>

        {/* Category Breakdown Chips */}
        <div>
          <span className="text-[11px] font-mono text-museum-400 uppercase tracking-wider block mb-2">
            Activity Composition ({activeSummary.count} moments):
          </span>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeSummary.categoryBreakdown).map(([catType, count]) => {
              const config = CATEGORY_CONFIG[catType as ReceiptType];
              return (
                <div
                  key={catType}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono"
                  style={{
                    backgroundColor: config.bgMuted,
                    borderColor: config.border,
                    color: config.color,
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
                  <span className="font-medium">{count}</span>
                  <span className="text-museum-300 font-sans">{config.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notable Moments From This Period */}
        <div>
          <span className="text-[11px] font-mono text-museum-400 uppercase tracking-wider block mb-2">
            Notable Moments From This Period:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {activeSummary.notableReceipts.map((r) => {
              const cat = CATEGORY_CONFIG[r.type];
              return (
                <div
                  key={r.id}
                  onClick={() => onSelectReceipt(r)}
                  className="p-3 rounded-lg bg-museum-900/90 border border-museum-800 hover:border-gold/40 cursor-pointer transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-museum-400 mb-1">
                      <span style={{ color: cat.color }}>{cat.name}</span>
                      <span>{formatDate(r.date)}</span>
                    </div>
                    <h5 className="text-xs font-semibold text-museum-100 group-hover:text-gold transition-colors line-clamp-1">
                      {r.title}
                    </h5>
                    <p className="text-[11px] text-museum-400 line-clamp-2 mt-1">
                      {r.description}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-museum-850 flex items-center justify-between text-[10px] font-mono text-museum-500">
                    <span className="flex items-center space-x-1 truncate max-w-[140px]">
                      <MapPin className="w-3 h-3 text-gold/70 shrink-0" />
                      <span className="truncate">{r.location.name}</span>
                    </span>
                    <span className="text-gold group-hover:translate-x-0.5 transition-transform">
                      View →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA to filter receipts by this period */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={() => onFilterByMonth(activeSummary.monthIndex)}
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-gold hover:text-gold-light hover:underline"
          >
            <span>Explore all {activeSummary.count} moments from {activeSummary.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
