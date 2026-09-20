"use client";

import React from "react";
import { Receipt, ActiveTab } from "@/types/receipts";
import { HeroConstellation } from "./HeroConstellation";
import { ArrowRight, Compass, Info, Sparkles, BookOpen, Share2 } from "lucide-react";

interface IntroSectionProps {
  receipts: Receipt[];
  onExplore: () => void;
  onOpenAbout: () => void;
  onSelectReceipt: (receipt: Receipt) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({
  receipts,
  onExplore,
  onOpenAbout,
  onSelectReceipt,
  setActiveTab,
}) => {
  const categoriesList = [
    { label: "Music", emoji: "🎵", color: "#8b5cf6" },
    { label: "Places", emoji: "📍", color: "#10b981" },
    { label: "Photos", emoji: "📷", color: "#06b6d4" },
    { label: "Purchases", emoji: "🛍", color: "#f59e0b" },
    { label: "Messages", emoji: "💬", color: "#3b82f6" },
    { label: "Searches", emoji: "🔎", color: "#6366f1" },
    { label: "Movies", emoji: "🎬", color: "#ec4899" },
    { label: "Events", emoji: "📅", color: "#f43f5e" },
    { label: "Notes", emoji: "📝", color: "#eab308" },
  ];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          {/* Tagline Pill */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-museum-900 border border-gold/30 text-gold text-xs font-mono tracking-wider uppercase shadow-[0_0_15px_rgba(226,177,112,0.1)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WebRush Challenge · Digital Museum Archive</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-museum-100 tracking-tight leading-[1.1]">
            Your life leaves <br />
            <span className="bg-gradient-to-r from-gold via-gold-light to-amber-200 bg-clip-text text-transparent italic">
              receipts.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-museum-300 font-sans leading-relaxed max-w-xl mx-auto lg:mx-0">
            Songs. Places. Photos. Purchases. Searches. Messages. Individually, they are fragments.
            Together, they tell the story of who you became.
          </p>

          {/* Category Chips Bar */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-2">
            {categoriesList.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-museum-900/80 border border-museum-800 text-xs text-museum-300 font-mono hover:border-gold/40 transition-colors"
              >
                <span>{c.emoji}</span>
                <span>{c.label}</span>
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gold text-museum-950 font-semibold text-sm hover:bg-gold-light transition-all shadow-[0_0_25px_rgba(226,177,112,0.3)] flex items-center justify-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <span>Explore the Life</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenAbout}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-museum-900 hover:bg-museum-850 text-museum-200 border border-museum-750 hover:border-gold/40 transition-all text-sm font-medium flex items-center justify-center space-x-2"
            >
              <Info className="w-4 h-4 text-gold" />
              <span>How It Works</span>
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="pt-6 border-t border-museum-800/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <div>
              <div className="font-serif font-bold text-xl text-gold">108</div>
              <div className="text-[11px] font-mono uppercase text-museum-400">Traces & Receipts</div>
            </div>
            <div>
              <div className="font-serif font-bold text-xl text-museum-100">48</div>
              <div className="text-[11px] font-mono uppercase text-museum-400">Connections</div>
            </div>
            <div>
              <div className="font-serif font-bold text-xl text-emerald-400">6</div>
              <div className="text-[11px] font-mono uppercase text-museum-400">Life Chapters</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Constellation Visual */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <HeroConstellation
            receipts={receipts}
            onSelectReceipt={onSelectReceipt}
          />
          <p className="mt-3 text-xs font-mono text-museum-500 text-center">
            &ldquo;One dataset. Hundreds of moments. Infinite stories.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
