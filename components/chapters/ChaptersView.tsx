"use client";

import React, { useState } from "react";
import { Receipt } from "@/types/receipts";
import { LIFE_CHAPTERS } from "@/data/chaptersData";
import { ChapterCard } from "./ChapterCard";
import { BookOpen, Sparkles, ChevronRight } from "lucide-react";

interface ChaptersViewProps {
  allReceipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
  onExploreConnections: (receiptId: string) => void;
}

export const ChaptersView: React.FC<ChaptersViewProps> = ({
  allReceipts,
  onSelectReceipt,
  onExploreConnections,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>("all");

  const visibleChapters =
    selectedChapterId === "all"
      ? LIFE_CHAPTERS
      : LIFE_CHAPTERS.filter((c) => c.id === selectedChapterId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-l-2 border-gold pl-4 py-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-museum-100 tracking-tight">
            Life Chapters
          </h2>
          <p className="text-sm text-museum-300 mt-1 font-sans max-w-2xl">
            Activity is not random. It clusters into meaningful personal epochs defined by shifts in curiosity, relationships, geography, and focus.
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 text-xs font-mono text-gold bg-museum-900 px-3 py-1.5 rounded-full border border-gold/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>6 Curated Narrative Chapters</span>
        </div>
      </div>

      {/* Chapter Quick Jumper Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 text-xs font-mono scrollbar-none">
        <button
          onClick={() => setSelectedChapterId("all")}
          className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors border ${
            selectedChapterId === "all"
              ? "bg-gold text-museum-950 font-bold border-gold"
              : "bg-museum-900 text-museum-300 border-museum-800 hover:border-gold/40"
          }`}
        >
          All 6 Chapters
        </button>
        {LIFE_CHAPTERS.map((c) => {
          const isSelected = selectedChapterId === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedChapterId(c.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors border flex items-center space-x-1.5 ${
                isSelected
                  ? "bg-gold text-museum-950 font-bold border-gold"
                  : "bg-museum-900 text-museum-300 border-museum-800 hover:border-gold/40"
              }`}
            >
              <span className="text-gold/70">Ch. {c.number}:</span>
              <span>{c.title}</span>
            </button>
          );
        })}
      </div>

      {/* Chapters Journey Stack */}
      <div className="space-y-12">
        {visibleChapters.map((chapter) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            allReceipts={allReceipts}
            onSelectReceipt={onSelectReceipt}
            onExploreConnections={onExploreConnections}
          />
        ))}
      </div>
    </div>
  );
};
