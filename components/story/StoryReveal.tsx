"use client";

import React, { useState } from "react";
import { Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatTime } from "@/lib/utils";
import { Sparkles, Eye, Share2, Heart, ArrowRight } from "lucide-react";

interface StoryRevealProps {
  onSelectReceipt: (receipt: Receipt) => void;
  allReceipts: Receipt[];
}

export const StoryReveal: React.FC<StoryRevealProps> = ({
  onSelectReceipt,
  allReceipts,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  // The 5 key moments from August 16, 2024 (02:45 AM - 04:15 AM)
  const revealIds = ["place_12", "purchase_18", "photo_14", "music_10", "message_11"];
  const moments = revealIds
    .map((id) => allReceipts.find((r) => r.id === id))
    .filter(Boolean) as Receipt[];

  const getEmoji = (type: string) => {
    switch (type) {
      case "music":
        return "🎵";
      case "place":
        return "📍";
      case "photo":
        return "📷";
      case "purchase":
        return "🛍";
      case "message":
        return "💬";
      default:
        return "✦";
    }
  };

  return (
    <div className="rounded-3xl border border-gold/40 bg-gradient-to-b from-museum-900 via-museum-950 to-museum-900 p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Payoff · The Reveal</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-serif font-bold text-museum-100 tracking-tight">
          {isRevealed ? "One Evening." : "These moments look unrelated."}
        </h3>

        <p className="text-sm text-museum-300 font-sans leading-relaxed">
          {isRevealed
            ? "Five digital logs recorded within 90 minutes. Together, they form the unforgettable peak of a five-month artistic voyage."
            : "A geolocation check-in, an espresso purchase, a 35mm photo, a streamed synthpop track, and an encrypted message. At first glance, random database trivia."}
        </p>
      </div>

      {/* Interactive Reveal Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className={`px-6 py-3.5 rounded-2xl font-semibold text-xs tracking-wider uppercase transition-all flex items-center space-x-2 shadow-xl ${
            isRevealed
              ? "bg-museum-800 text-gold border border-gold/40 hover:bg-museum-750"
              : "bg-gold text-museum-950 hover:bg-gold-light shadow-[0_0_30px_rgba(226,177,112,0.35)] scale-105"
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>{isRevealed ? "Reset Comparison" : "Look Closer — Connect the Traces"}</span>
        </button>
      </div>

      {/* The 5 Moments Sequence */}
      <div className="relative pt-4">
        {/* Connection Thread Line drawn across moments when revealed */}
        {isRevealed && (
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-emerald-500 via-gold to-purple-500 z-0 -translate-y-4 animate-in fade-in duration-500 shadow-[0_0_15px_rgba(226,177,112,0.8)]" />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
          {moments.map((m, idx) => {
            const cat = CATEGORY_CONFIG[m.type];

            return (
              <div
                key={m.id}
                onClick={() => onSelectReceipt(m)}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                  isRevealed
                    ? "bg-museum-900 border-gold/60 shadow-[0_0_20px_rgba(226,177,112,0.15)] -translate-y-1"
                    : "bg-museum-950 border-museum-800 hover:border-museum-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                    <span
                      style={{ color: cat.color }}
                      className="font-bold flex items-center space-x-1"
                    >
                      <span>{getEmoji(m.type)}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-museum-400 font-medium">
                      {formatTime(m.timestamp)}
                    </span>
                  </div>

                  <h5 className="text-xs font-semibold text-museum-100 group-hover:text-gold transition-colors line-clamp-2">
                    {m.title}
                  </h5>

                  <p className="text-[11px] text-museum-400 mt-1 line-clamp-2">
                    {m.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-museum-850 flex items-center justify-between text-[10px] font-mono text-museum-500">
                  <span className="text-gold">0{idx + 1} of 05</span>
                  <span className="text-museum-400 group-hover:text-gold">Inspect →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Revealed Synthesis Narrative Callout */}
      {isRevealed && (
        <div className="p-6 rounded-2xl bg-museum-900/90 border border-gold/30 space-y-3 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center space-x-2 text-gold font-serif font-bold text-base">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>The Story Revealed: August 16, 2024 (02:45 AM — 04:15 AM)</span>
          </div>
          <p className="text-xs sm:text-sm text-museum-200 font-sans leading-relaxed">
            Following the triumphant opening night of <em>&ldquo;Resonant Geometry&rdquo;</em> in Marvila, Alex, Elena, and Clara walked through the deserted hills of Lisbon to Miradouro da Graça. Sitting on the centuries-old pine-shaded terrace overlooking the illuminated castle, they shared warm pastéis de nata and a pair of earbuds playing M83&apos;s <em>&ldquo;Midnight City&rdquo;</em> as dawn broke over the Tagus.
          </p>
          <p className="text-xs sm:text-sm text-museum-300 font-sans italic">
            Individually, these receipts were metadata rows. Connected, they represent the sweetest, most transcendent moment of their lives.
          </p>
        </div>
      )}
    </div>
  );
};
