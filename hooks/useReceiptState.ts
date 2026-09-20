"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Receipt,
  ReceiptType,
  TimeOfDay,
  MoodTheme,
  LocationCategory,
  ViewMode,
  ActiveTab,
} from "@/types/receipts";
import { MOCK_RECEIPTS } from "@/data/mockReceipts";
import { calculateConnectionStrength, getAllConnectionEdges } from "@/lib/connections";

export type SortOption = "date_desc" | "date_asc" | "importance" | "connections";

export function useReceiptState() {
  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>("intro");

  // Filter criteria
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ReceiptType | "all">("all");
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<TimeOfDay | "all">("all");
  const [selectedTheme, setSelectedTheme] = useState<MoodTheme | "all">("all");
  const [selectedLocation, setSelectedLocation] = useState<LocationCategory | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("date_desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // Interaction selections
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>("place_12"); // default focus on Miradouro da Graça
  const [selectedPulseMonth, setSelectedPulseMonth] = useState<string>("August");

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Precomputed all connection counts for performance
  const connectionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of MOCK_RECEIPTS) {
      let c = 0;
      for (const other of MOCK_RECEIPTS) {
        if (r.id !== other.id) {
          const score = calculateConnectionStrength(r, other);
          if (score.score >= 0.35) c++;
        }
      }
      counts[r.id] = c;
    }
    return counts;
  }, []);

  // Filtered and sorted receipts
  const filteredReceipts = useMemo(() => {
    return MOCK_RECEIPTS.filter((r) => {
      // Category filter
      if (selectedCategory !== "all" && r.type !== selectedCategory) {
        return false;
      }
      // Time of day filter
      if (selectedTimeOfDay !== "all" && r.timeOfDay !== selectedTimeOfDay) {
        return false;
      }
      // Theme filter
      if (selectedTheme !== "all" && r.theme !== selectedTheme) {
        return false;
      }
      // Location category filter
      if (selectedLocation !== "all" && r.location.category !== selectedLocation) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesDesc = r.description.toLowerCase().includes(q);
        const matchesCity = r.location.city.toLowerCase().includes(q);
        const matchesArea = r.location.area?.toLowerCase().includes(q) ?? false;
        const matchesTags = r.tags.some((t) => t.toLowerCase().includes(q));
        const matchesTheme = r.theme.toLowerCase().includes(q);
        const matchesCategory = r.type.toLowerCase().includes(q);
        if (
          !matchesTitle &&
          !matchesDesc &&
          !matchesCity &&
          !matchesArea &&
          !matchesTags &&
          !matchesTheme &&
          !matchesCategory
        ) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "date_desc") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      if (sortBy === "date_asc") {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      }
      if (sortBy === "importance") {
        return b.importance - a.importance;
      }
      if (sortBy === "connections") {
        return (connectionCounts[b.id] || 0) - (connectionCounts[a.id] || 0);
      }
      return 0;
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedTimeOfDay,
    selectedTheme,
    selectedLocation,
    sortBy,
    connectionCounts,
  ]);

  // Global graph edges precomputed
  const allEdges = useMemo(() => {
    return getAllConnectionEdges(MOCK_RECEIPTS, 0.38);
  }, []);

  // Quick category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: MOCK_RECEIPTS.length };
    for (const r of MOCK_RECEIPTS) {
      counts[r.type] = (counts[r.type] || 0) + 1;
    }
    return counts;
  }, []);

  // Keyboard shortcut listener: `/` to trigger search, `Escape` to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (isSearchOpen) setIsSearchOpen(false);
        if (isAboutOpen) setIsAboutOpen(false);
        if (selectedReceipt) setSelectedReceipt(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isAboutOpen, selectedReceipt]);

  // Action helpers
  const openReceipt = useCallback((receipt: Receipt) => {
    setSelectedReceipt(receipt);
  }, []);

  const closeReceipt = useCallback(() => {
    setSelectedReceipt(null);
  }, []);

  const exploreConnection = useCallback((receiptId: string) => {
    setSelectedNodeId(receiptId);
    setSelectedReceipt(null);
    setActiveTab("connections");
  }, []);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTimeOfDay("all");
    setSelectedTheme("all");
    setSelectedLocation("all");
    setSortBy("date_desc");
  }, []);

  return {
    allReceipts: MOCK_RECEIPTS,
    filteredReceipts,
    connectionCounts,
    allEdges,
    categoryCounts,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
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
    selectedReceipt,
    setSelectedReceipt,
    selectedNodeId,
    setSelectedNodeId,
    selectedPulseMonth,
    setSelectedPulseMonth,
    isSearchOpen,
    setIsSearchOpen,
    isAboutOpen,
    setIsAboutOpen,
    openReceipt,
    closeReceipt,
    exploreConnection,
    resetFilters,
  };
}
