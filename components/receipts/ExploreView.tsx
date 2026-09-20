"use client";

import React from "react";
import {
  Receipt,
  ReceiptType,
  TimeOfDay,
  MoodTheme,
  LocationCategory,
  ViewMode,
} from "@/types/receipts";
import { ReceiptFilter } from "./ReceiptFilter";
import { ReceiptCard } from "./ReceiptCard";
import { ReceiptStreamView } from "./ReceiptStreamView";
import { ReceiptClusterView } from "./ReceiptClusterView";
import { ReceiptDetail } from "./ReceiptDetail";
import { SortOption } from "@/hooks/useReceiptState";
import { Search } from "lucide-react";

interface ExploreViewProps {
  receipts: Receipt[];
  allReceipts: Receipt[];
  connectionCounts: Record<string, number>;
  selectedCategory: ReceiptType | "all";
  setSelectedCategory: (cat: ReceiptType | "all") => void;
  selectedTimeOfDay: TimeOfDay | "all";
  setSelectedTimeOfDay: (time: TimeOfDay | "all") => void;
  selectedTheme: MoodTheme | "all";
  setSelectedTheme: (theme: MoodTheme | "all") => void;
  selectedLocation: LocationCategory | "all";
  setSelectedLocation: (loc: LocationCategory | "all") => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryCounts: Record<string, number>;
  onResetFilters: () => void;
  selectedReceipt: Receipt | null;
  onSelectReceipt: (receipt: Receipt | null) => void;
  onExploreConnection: (receiptId: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  receipts,
  allReceipts,
  connectionCounts,
  selectedCategory,
  setSelectedCategory,
  selectedTimeOfDay,
  setSelectedTimeOfDay,
  selectedTheme,
  setSelectedTheme,
  selectedLocation,
  setSelectedLocation,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  categoryCounts,
  onResetFilters,
  selectedReceipt,
  onSelectReceipt,
  onExploreConnection,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-l-2 border-gold pl-4 py-1">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-museum-100 tracking-tight">
          Explore the Receipts
        </h2>
        <p className="text-sm text-museum-300 mt-1 font-sans">
          Curated fragments of music, cinema, locations, notes, and purchases.
        </p>
      </div>

      {/* Multi-Axis Filters & View Controls */}
      <ReceiptFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTimeOfDay={selectedTimeOfDay}
        setSelectedTimeOfDay={setSelectedTimeOfDay}
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryCounts={categoryCounts}
        onReset={onResetFilters}
        totalFiltered={receipts.length}
      />

      {/* Content Rendering based on ViewMode */}
      {receipts.length === 0 ? (
        <div className="py-24 text-center rounded-2xl border border-museum-800 bg-museum-900/60 p-8">
          <Search className="w-10 h-10 mx-auto mb-3 text-gold opacity-50" />
          <h3 className="text-base font-serif font-bold text-museum-100">
            No receipts found matching your criteria
          </h3>
          <p className="text-xs text-museum-400 mt-1 max-w-sm mx-auto">
            Try adjusting your category, time of day, or keyword filters to broaden your exploration.
          </p>
          <button
            onClick={onResetFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-gold text-museum-950 font-semibold text-xs hover:bg-gold-light transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {receipts.map((r) => (
            <ReceiptCard
              key={r.id}
              receipt={r}
              connectedCount={connectionCounts[r.id] || 0}
              allReceipts={allReceipts}
              onSelect={(item) => onSelectReceipt(item)}
              onExploreConnection={onExploreConnection}
            />
          ))}
        </div>
      ) : viewMode === "stream" ? (
        <ReceiptStreamView
          receipts={receipts}
          onSelect={(item) => onSelectReceipt(item)}
          onExploreConnection={onExploreConnection}
        />
      ) : (
        <ReceiptClusterView
          receipts={receipts}
          onSelect={(item) => onSelectReceipt(item)}
          onExploreConnection={onExploreConnection}
        />
      )}

      {/* Slide-over Receipt Detail */}
      <ReceiptDetail
        receipt={selectedReceipt}
        onClose={() => onSelectReceipt(null)}
        allReceipts={allReceipts}
        onSelectReceipt={(item) => onSelectReceipt(item)}
        onExploreConnection={onExploreConnection}
      />
    </div>
  );
};
