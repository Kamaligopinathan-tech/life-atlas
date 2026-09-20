"use client";

import React, { useState } from "react";
import { Receipt, ReceiptType } from "@/types/receipts";
import { LIFE_PATTERNS } from "@/data/patternsData";
import { PatternCard } from "./PatternCard";
import { Repeat, Sparkles, SlidersHorizontal } from "lucide-react";

interface PatternsViewProps {
  allReceipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
}

export const PatternsView: React.FC<PatternsViewProps> = ({
  allReceipts,
  onSelectReceipt,
}) => {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ReceiptType | "all">("all");

  const filteredPatterns = LIFE_PATTERNS.filter((p) => {
    if (selectedCategoryFilter === "all") return true;
    return p.categories.includes(selectedCategoryFilter);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-2 border-gold pl-4 py-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-museum-100 tracking-tight">
            What Keeps Repeating?
          </h2>
          <p className="text-sm text-museum-300 mt-1 font-sans max-w-2xl">
            Recurring behavioral signatures detected from temporal rhythms, location transitions, and cross-category sequences.
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-museum-900 border border-gold/30 text-gold text-xs font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>6 Patterns Detected from Dataset</span>
        </div>
      </div>

      {/* Grid of Patterns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPatterns.map((pat) => (
          <PatternCard
            key={pat.id}
            pattern={pat}
            allReceipts={allReceipts}
            onSelectReceipt={onSelectReceipt}
          />
        ))}
      </div>
    </div>
  );
};
