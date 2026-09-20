"use client";

import React from "react";
import { Receipt } from "@/types/receipts";
import { Sparkles, Compass, Share2, BookOpen, Layers, Clock, TrendingUp } from "lucide-react";

interface StatsOverviewProps {
  receipts: Receipt[];
  connectionCount: number;
  onExploreConnections: () => void;
  onReadChapters: () => void;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({
  receipts,
  connectionCount,
  onExploreConnections,
  onReadChapters,
}) => {
  return (
    <div className="space-y-4">
      {/* Header Narrative Summary */}
      <div className="border-l-2 border-gold pl-4 py-1">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-museum-100 tracking-tight">
          Your Life, In Receipts
        </h2>
        <p className="text-sm text-museum-300 mt-1 font-sans">
          One person&apos;s digital trail — and the patterns hidden inside it.
        </p>
      </div>

      {/* Story-Connected Statistic Grid (Not generic SaaS KPI cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {/* Metric 1: Total Moments */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-museum-900 to-museum-950 border border-museum-800 hover:border-gold/30 transition-all group">
          <div className="flex items-center justify-between text-xs font-mono text-museum-400">
            <span className="uppercase tracking-wider">Total Moments</span>
            <Clock className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-museum-100 group-hover:text-gold transition-colors">
              {receipts.length}
            </span>
            <span className="text-xs text-museum-400 font-sans">digital traces</span>
          </div>
          <p className="mt-2 text-xs text-museum-400 leading-relaxed">
            March 01 — August 28, 2024. Spanning 9 everyday categories across 3 European cities.
          </p>
          <div className="mt-3 pt-2 border-t border-museum-850 flex items-center text-[11px] font-mono text-gold">
            <span>Peak density: Late nights & Saturdays</span>
          </div>
        </div>

        {/* Metric 2: Discovered Connections */}
        <div
          onClick={onExploreConnections}
          className="p-5 rounded-2xl bg-gradient-to-br from-museum-900 to-museum-950 border border-museum-800 hover:border-gold/40 transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-mono text-museum-400">
            <span className="uppercase tracking-wider">Meaningful Links</span>
            <Share2 className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-indigo-300 group-hover:text-gold transition-colors">
              {connectionCount}
            </span>
            <span className="text-xs text-museum-400 font-sans">scored connections</span>
          </div>
          <p className="mt-2 text-xs text-museum-400 leading-relaxed">
            Moments tied together by shared locations, tight timestamps, and causal chains.
          </p>
          <div className="mt-3 pt-2 border-t border-museum-850 flex items-center justify-between text-[11px] font-mono text-indigo-400 group-hover:text-gold transition-colors">
            <span>Explore Connection Map</span>
            <span>→</span>
          </div>
        </div>

        {/* Metric 3: Emerging Chapters */}
        <div
          onClick={onReadChapters}
          className="p-5 rounded-2xl bg-gradient-to-br from-museum-900 to-museum-950 border border-museum-800 hover:border-gold/40 transition-all group cursor-pointer"
        >
          <div className="flex items-center justify-between text-xs font-mono text-museum-400">
            <span className="uppercase tracking-wider">Life Chapters</span>
            <BookOpen className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-emerald-300 group-hover:text-gold transition-colors">
              6
            </span>
            <span className="text-xs text-museum-400 font-sans">narrative eras</span>
          </div>
          <p className="mt-2 text-xs text-museum-400 leading-relaxed">
            From &ldquo;The Quiet Nights&rdquo; in March to &ldquo;The Week Everything Connected&rdquo; in August.
          </p>
          <div className="mt-3 pt-2 border-t border-museum-850 flex items-center justify-between text-[11px] font-mono text-emerald-400 group-hover:text-gold transition-colors">
            <span>Read Life Chapters</span>
            <span>→</span>
          </div>
        </div>

        {/* Metric 4: Dominant Rhythm */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-museum-900 to-museum-950 border border-museum-800 hover:border-gold/30 transition-all group">
          <div className="flex items-center justify-between text-xs font-mono text-museum-400">
            <span className="uppercase tracking-wider">Dominant Rhythm</span>
            <TrendingUp className="w-4 h-4 text-amber-400 group-hover:translate-y-[-2px] transition-transform" />
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 group-hover:text-gold transition-colors">
              Creativity
            </span>
          </div>
          <p className="mt-2 text-xs text-museum-400 leading-relaxed">
            34% of all moments tagged with creative discovery and engineering synthesis.
          </p>
          <div className="mt-3 pt-2 border-t border-museum-850 flex items-center text-[11px] font-mono text-museum-400">
            <span>Followed by Connection &amp; Exploration</span>
          </div>
        </div>
      </div>
    </div>
  );
};
