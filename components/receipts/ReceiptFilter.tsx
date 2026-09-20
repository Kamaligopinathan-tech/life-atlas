"use client";

import React from "react";
import {
  ReceiptType,
  TimeOfDay,
  MoodTheme,
  LocationCategory,
  ViewMode,
} from "@/types/receipts";
import { CATEGORY_CONFIG } from "@/lib/utils";
import {
  LayoutGrid,
  ListTree,
  Network,
  RotateCcw,
  SlidersHorizontal,
  Search,
} from "lucide-react";
import { SortOption } from "@/hooks/useReceiptState";

interface ReceiptFilterProps {
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
  onReset: () => void;
  totalFiltered: number;
}

export const ReceiptFilter: React.FC<ReceiptFilterProps> = ({
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
  onReset,
  totalFiltered,
}) => {
  const categories: Array<{ id: ReceiptType | "all"; label: string }> = [
    { id: "all", label: "All Moments" },
    { id: "music", label: "Music" },
    { id: "place", label: "Places" },
    { id: "photo", label: "Photos" },
    { id: "purchase", label: "Purchases" },
    { id: "note", label: "Notes" },
    { id: "event", label: "Events" },
    { id: "message", label: "Messages" },
    { id: "search", label: "Searches" },
    { id: "movie", label: "Movies" },
  ];

  const times: Array<{ id: TimeOfDay | "all"; label: string }> = [
    { id: "all", label: "Any Time" },
    { id: "morning", label: "Morning" },
    { id: "afternoon", label: "Afternoon" },
    { id: "evening", label: "Evening" },
    { id: "late_night", label: "Late Night" },
  ];

  const themes: Array<{ id: MoodTheme | "all"; label: string }> = [
    { id: "all", label: "All Themes" },
    { id: "Creativity", label: "Creativity" },
    { id: "Connection", label: "Connection" },
    { id: "Exploration", label: "Exploration" },
    { id: "Celebration", label: "Celebration" },
    { id: "Change", label: "Change" },
    { id: "Discovery", label: "Discovery" },
    { id: "Routine", label: "Routine" },
  ];

  const locations: Array<{ id: LocationCategory | "all"; label: string }> = [
    { id: "all", label: "All Places" },
    { id: "home", label: "Home" },
    { id: "city", label: "City" },
    { id: "travel", label: "Travel" },
  ];

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTimeOfDay !== "all" ||
    selectedTheme !== "all" ||
    selectedLocation !== "all" ||
    searchQuery !== "" ||
    sortBy !== "date_desc";

  return (
    <div className="space-y-4 rounded-2xl bg-museum-900/95 border border-museum-800 p-4 sm:p-5 shadow-lg">
      {/* Top Bar: Search Input, View Switcher & Sort */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by keyword, title, tag, artist, city..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-museum-950 border border-museum-750 text-sm text-museum-100 placeholder-museum-500 focus:outline-none focus:border-gold font-sans"
          />
        </div>

        {/* Controls: Sort & View Mode */}
        <div className="flex items-center space-x-2 shrink-0">
          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-2 rounded-xl bg-museum-950 border border-museum-750 text-xs font-mono text-museum-200 focus:outline-none focus:border-gold cursor-pointer"
            aria-label="Sort receipts"
          >
            <option value="date_desc">Newest First</option>
            <option value="date_asc">Oldest First</option>
            <option value="importance">Highest Significance</option>
            <option value="connections">Most Connected</option>
          </select>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-museum-950 border border-museum-750 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-museum-800 text-gold shadow-sm"
                  : "text-museum-400 hover:text-museum-200"
              }`}
              title="Editorial Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("stream")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "stream"
                  ? "bg-museum-800 text-gold shadow-sm"
                  : "text-museum-400 hover:text-museum-200"
              }`}
              title="Chronological Stream View"
              aria-label="Stream View"
            >
              <ListTree className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("cluster")}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === "cluster"
                  ? "bg-museum-800 text-gold shadow-sm"
                  : "text-museum-400 hover:text-museum-200"
              }`}
              title="Spatial Map View"
              aria-label="Cluster Map View"
            >
              <Network className="w-4 h-4" />
            </button>
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="p-2 rounded-xl bg-museum-850 hover:bg-museum-800 text-museum-400 hover:text-gold border border-museum-750 transition-colors"
              title="Reset all filters"
              aria-label="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills with Counters */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        {categories.map((c) => {
          const isSelected = selectedCategory === c.id;
          const count = categoryCounts[c.id] || 0;
          const config = c.id !== "all" ? CATEGORY_CONFIG[c.id] : null;

          return (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all flex items-center space-x-1.5 border ${
                isSelected
                  ? "bg-gold text-museum-950 font-semibold border-gold shadow-[0_0_12px_rgba(226,177,112,0.2)]"
                  : "bg-museum-950/80 text-museum-300 border-museum-800 hover:border-museum-650 hover:text-museum-100"
              }`}
            >
              {config && (
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: isSelected ? "#090a0f" : config.color }}
                />
              )}
              <span>{c.label}</span>
              <span
                className={`text-[10px] px-1 rounded ${
                  isSelected ? "bg-museum-950/20 text-museum-950" : "bg-museum-850 text-museum-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Multi-Axis Filters (Time of Day, Mood/Theme, Location) */}
      <div className="pt-2 border-t border-museum-850/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Filter */}
          <div className="flex items-center space-x-1">
            <span className="text-[11px] font-mono text-museum-500 mr-1">Time:</span>
            {times.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTimeOfDay(t.id)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  selectedTimeOfDay === t.id
                    ? "bg-gold/20 text-gold border border-gold/40"
                    : "text-museum-400 hover:text-museum-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <span className="hidden sm:inline text-museum-700">|</span>

          {/* Theme Filter */}
          <div className="flex items-center space-x-1">
            <span className="text-[11px] font-mono text-museum-500 mr-1">Theme:</span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value as MoodTheme | "all")}
              className="px-2 py-0.5 rounded bg-museum-950 border border-museum-750 text-[11px] font-mono text-museum-300 focus:outline-none focus:border-gold cursor-pointer"
            >
              {themes.map((th) => (
                <option key={th.id} value={th.id}>
                  {th.label}
                </option>
              ))}
            </select>
          </div>

          <span className="hidden sm:inline text-museum-700">|</span>

          {/* Location Filter */}
          <div className="flex items-center space-x-1">
            <span className="text-[11px] font-mono text-museum-500 mr-1">Location:</span>
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  selectedLocation === loc.id
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "text-museum-400 hover:text-museum-200"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Counter of filtered results */}
        <div className="text-[11px] font-mono text-museum-400">
          Showing <strong className="text-gold">{totalFiltered}</strong> moments
        </div>
      </div>
    </div>
  );
};
