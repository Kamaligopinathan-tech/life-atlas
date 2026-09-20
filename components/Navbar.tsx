"use client";

import React, { useState } from "react";
import { ActiveTab } from "@/types/receipts";
import {
  Compass,
  Grid,
  Share2,
  BookOpen,
  Sparkles,
  Repeat,
  Info,
  Search,
  Menu,
  X,
  Layers,
} from "lucide-react";

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenSearch: () => void;
  onOpenAbout: () => void;
  totalMoments: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAbout,
  totalMoments,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: Array<{
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    { id: "intro", label: "Intro", icon: <Sparkles className="w-4 h-4" /> },
    { id: "overview", label: "Overview", icon: <Compass className="w-4 h-4" /> },
    { id: "explore", label: "Explore", icon: <Grid className="w-4 h-4" /> },
    { id: "connections", label: "Connections", icon: <Share2 className="w-4 h-4" />, badge: "Core" },
    { id: "patterns", label: "Patterns", icon: <Repeat className="w-4 h-4" /> },
    { id: "chapters", label: "Chapters", icon: <BookOpen className="w-4 h-4" /> },
    { id: "story", label: "The Story", icon: <Layers className="w-4 h-4" />, badge: "Finale" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-museum-800/80 bg-museum-950/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTab("intro")}
            className="flex items-center space-x-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg px-1.5 py-1"
            aria-label="Life Atlas Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold/30 via-gold/10 to-transparent border border-gold/40 flex items-center justify-center text-gold font-serif font-bold text-lg shadow-[0_0_15px_rgba(226,177,112,0.2)] group-hover:border-gold transition-all">
              LA
            </div>
            <div>
              <span className="font-serif font-bold text-lg tracking-wide text-museum-100 group-hover:text-gold transition-colors">
                LIFE ATLAS
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono tracking-widest uppercase text-museum-400 border border-museum-800 px-1.5 py-0.5 rounded">
                Personal Archive
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3 py-1.5 rounded-md text-xs font-medium tracking-wider uppercase transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? "text-gold bg-museum-850 border border-gold/30 shadow-[0_0_12px_rgba(226,177,112,0.15)]"
                    : "text-museum-400 hover:text-museum-200 hover:bg-museum-900/60"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-mono bg-gold/20 text-gold-light px-1 py-0.2 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Search trigger, About info, Mobile menu */}
        <div className="flex items-center space-x-2">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-museum-900 border border-museum-750 text-museum-300 hover:text-museum-100 hover:border-museum-600 transition-all text-xs font-mono group"
            title="Press / to search"
            aria-label="Search all receipts"
          >
            <Search className="w-3.5 h-3.5 text-museum-400 group-hover:text-gold transition-colors" />
            <span className="hidden lg:inline text-museum-400 group-hover:text-museum-300">
              Search receipts...
            </span>
            <kbd className="hidden sm:inline-block bg-museum-800 border border-museum-700 text-[10px] text-gold px-1.5 py-0.5 rounded shadow-sm">
              /
            </kbd>
          </button>

          {/* About / Manifesto Modal Trigger */}
          <button
            onClick={onOpenAbout}
            className="p-2 rounded-lg text-museum-400 hover:text-gold hover:bg-museum-900 transition-colors border border-transparent hover:border-museum-750"
            title="About Life Atlas"
            aria-label="About Life Atlas"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-museum-400 hover:text-museum-100 hover:bg-museum-900 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-museum-800 bg-museum-950/98 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-museum-850 text-gold border border-gold/30"
                    : "text-museum-300 hover:bg-museum-900 hover:text-museum-100"
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono bg-gold/20 text-gold-light px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
