"use client";

import React from "react";
import { useReceiptState } from "@/hooks/useReceiptState";
import { Navbar } from "@/components/Navbar";
import { SearchModal } from "@/components/SearchModal";
import { AboutModal } from "@/components/AboutModal";
import { IntroSection } from "@/components/intro/IntroSection";
import { OverviewView } from "@/components/overview/OverviewView";
import { ExploreView } from "@/components/receipts/ExploreView";
import { ConnectionsView } from "@/components/connections/ConnectionsView";
import { PatternsView } from "@/components/patterns/PatternsView";
import { ChaptersView } from "@/components/chapters/ChaptersView";
import { StoryView } from "@/components/story/StoryView";
import { Sparkles, Heart, ShieldCheck } from "lucide-react";

export default function Home() {
  const {
    allReceipts,
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
  } = useReceiptState();

  const handleFilterByMonth = (monthIndex: number) => {
    // Map monthIndex (2=March, 3=April, etc.) into explore view
    setActiveTab("explore");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Global Application Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        totalMoments={allReceipts.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === "intro" && (
          <IntroSection
            receipts={allReceipts}
            onExplore={() => setActiveTab("overview")}
            onOpenAbout={() => setIsAboutOpen(true)}
            onSelectReceipt={openReceipt}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "overview" && (
          <OverviewView
            receipts={allReceipts}
            connectionCount={allEdges.length}
            selectedMonth={selectedPulseMonth}
            onSelectMonth={setSelectedPulseMonth}
            onSelectReceipt={openReceipt}
            onFilterByMonth={handleFilterByMonth}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              setActiveTab("explore");
            }}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === "explore" && (
          <ExploreView
            receipts={filteredReceipts}
            allReceipts={allReceipts}
            connectionCounts={connectionCounts}
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
            onResetFilters={resetFilters}
            selectedReceipt={selectedReceipt}
            onSelectReceipt={setSelectedReceipt}
            onExploreConnection={exploreConnection}
          />
        )}

        {activeTab === "connections" && (
          <ConnectionsView
            receipts={allReceipts}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
            onOpenReceiptDetail={openReceipt}
          />
        )}

        {activeTab === "patterns" && (
          <PatternsView
            allReceipts={allReceipts}
            onSelectReceipt={openReceipt}
          />
        )}

        {activeTab === "chapters" && (
          <ChaptersView
            allReceipts={allReceipts}
            onSelectReceipt={openReceipt}
            onExploreConnections={exploreConnection}
          />
        )}

        {activeTab === "story" && (
          <StoryView
            allReceipts={allReceipts}
            onSelectReceipt={openReceipt}
            onExploreConnections={exploreConnection}
          />
        )}
      </main>

      {/* Global Search Modal (Keyboard shortcut /) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        receipts={filteredReceipts}
        onSelectReceipt={openReceipt}
        onExploreConnection={exploreConnection}
      />

      {/* Concept & Architecture Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Global Footer */}
      <footer className="border-t border-museum-850/80 bg-museum-950/90 py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-museum-500">
          <div className="flex items-center space-x-3">
            <span className="text-gold font-bold font-serif text-sm">LIFE ATLAS</span>
            <span>·</span>
            <span>WebRush Hackathon Challenge</span>
            <span>·</span>
            <span>&ldquo;Your Life, In Receipts&rdquo;</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="text-museum-400 hover:text-gold transition-colors"
            >
              How it works
            </button>
            <span className="text-museum-800">|</span>
            <span className="flex items-center space-x-1 text-museum-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Client-Side Runtime</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
