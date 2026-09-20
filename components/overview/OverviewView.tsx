"use client";

import React from "react";
import { Receipt, ReceiptType, ActiveTab } from "@/types/receipts";
import { StatsOverview } from "./StatsOverview";
import { LifePulse } from "./LifePulse";
import { CategoryBreakdown } from "./CategoryBreakdown";

interface OverviewViewProps {
  receipts: Receipt[];
  connectionCount: number;
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
  onSelectReceipt: (receipt: Receipt) => void;
  onFilterByMonth: (monthIndex: number) => void;
  onSelectCategory: (category: ReceiptType) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  receipts,
  connectionCount,
  selectedMonth,
  onSelectMonth,
  onSelectReceipt,
  onFilterByMonth,
  onSelectCategory,
  setActiveTab,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-200">
      {/* Narrative Stats Summary */}
      <StatsOverview
        receipts={receipts}
        connectionCount={connectionCount}
        onExploreConnections={() => setActiveTab("connections")}
        onReadChapters={() => setActiveTab("chapters")}
      />

      {/* Interactive Life Pulse Density Scrubber */}
      <LifePulse
        receipts={receipts}
        selectedMonth={selectedMonth}
        onSelectMonth={onSelectMonth}
        onSelectReceipt={onSelectReceipt}
        onFilterByMonth={onFilterByMonth}
      />

      {/* Category Breakdown & Circadian Rhythm */}
      <CategoryBreakdown
        receipts={receipts}
        onSelectCategory={onSelectCategory}
      />
    </div>
  );
};
