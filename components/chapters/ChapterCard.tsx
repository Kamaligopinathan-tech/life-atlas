"use client";

import React from "react";
import { LifeChapter, Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate } from "@/lib/utils";
import { BookOpen, Sparkles, Calendar, ArrowRight, Quote } from "lucide-react";

interface ChapterCardProps {
  chapter: LifeChapter;
  allReceipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
  onExploreConnections: (receiptId: string) => void;
}

export const ChapterCard: React.FC<ChapterCardProps> = ({
  chapter,
  allReceipts,
  onSelectReceipt,
  onExploreConnections,
}) => {
  // Find highlight receipts
  const highlightMoments = chapter.highlightReceiptIds
    .map((id) => allReceipts.find((r) => r.id === id))
    .filter(Boolean) as Receipt[];

  return (
    <div className="rounded-3xl border border-museum-800 bg-museum-900/80 p-6 sm:p-8 shadow-2xl space-y-6 hover:border-gold/40 transition-all">
      {/* Chapter Number & Date Range Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-museum-800 pb-4">
        <div className="flex items-center space-x-3">
          <span className="font-serif font-bold text-2xl text-gold/60">
            CHAPTER {chapter.number}
          </span>
          <span className="text-museum-600">/</span>
          <span className="text-xs font-mono text-museum-400 uppercase tracking-widest">
            {chapter.statCallout}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 text-xs font-mono text-museum-400 bg-museum-950 px-3 py-1 rounded-full border border-museum-800 self-start sm:self-auto">
          <Calendar className="w-3.5 h-3.5 text-gold" />
          <span>{chapter.dateRange}</span>
        </div>
      </div>

      {/* Chapter Title & Subtitle */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-museum-100 tracking-tight">
          {chapter.title}
        </h3>
        <p className="text-sm font-sans text-gold/90 mt-1 italic">
          {chapter.subtitle}
        </p>
      </div>

      {/* Narrative Excerpt */}
      <p className="text-sm text-museum-200 font-sans leading-relaxed">
        {chapter.narrative}
      </p>

      {/* Quote / Key Thesis */}
      <div className="p-4 rounded-2xl bg-museum-950/90 border border-gold/20 flex items-start space-x-3">
        <Quote className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-serif text-gold-light italic leading-relaxed">
            &ldquo;{chapter.quote}&rdquo;
          </p>
          <span className="text-[10px] font-mono uppercase text-museum-500 mt-1 block">
            Archival Voice · {chapter.title}
          </span>
        </div>
      </div>

      {/* Key Insight Badge */}
      <div className="p-3 rounded-xl bg-museum-950/60 border border-museum-850 flex items-center space-x-2.5 text-xs font-mono text-museum-300">
        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          <strong className="text-museum-100">Key Insight:</strong> {chapter.keyInsight}
        </span>
      </div>

      {/* Visual Collage of Key Receipts in this Chapter */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-xs font-mono text-museum-400">
          <span className="uppercase tracking-wider">Representative Archival Receipts:</span>
          <span>{highlightMoments.length} key moments</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {highlightMoments.map((r) => {
            const cat = CATEGORY_CONFIG[r.type];
            return (
              <div
                key={r.id}
                onClick={() => onSelectReceipt(r)}
                className="p-3 rounded-xl bg-museum-950 border border-museum-800 hover:border-gold/50 cursor-pointer transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span style={{ color: cat.color }} className="font-semibold uppercase">
                      {cat.name}
                    </span>
                    <span className="text-museum-500">{formatDate(r.date)}</span>
                  </div>
                  <h5 className="text-xs font-semibold text-museum-100 group-hover:text-gold transition-colors line-clamp-1">
                    {r.title}
                  </h5>
                  <p className="text-[11px] text-museum-400 line-clamp-2 mt-1">
                    {r.description}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-museum-850/80 flex items-center justify-between text-[10px] font-mono text-gold">
                  <span>#{r.theme}</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">
                    Inspect moment →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
