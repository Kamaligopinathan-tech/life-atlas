"use client";

import React, { useState } from "react";
import { Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate } from "@/lib/utils";
import { StoryReveal } from "./StoryReveal";
import { Sparkles, BookOpen, Layers, Heart, ArrowRight, Quote } from "lucide-react";

interface StoryViewProps {
  allReceipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
  onExploreConnections: (receiptId: string) => void;
}

export const StoryView: React.FC<StoryViewProps> = ({
  allReceipts,
  onSelectReceipt,
  onExploreConnections,
}) => {
  const storyActs = [
    {
      act: "01",
      title: "The Quiet Beginning",
      subtitle: "March 2024 · Solitary Algorithms and Nocturnal Doubts",
      narrative:
        "It started in the dark. A sound designer and programmer staring at an empty code editor in a Príncipe Real apartment, feeling the exhaustion of immaterial screens. Through late-night loops of Brian Eno and scribbled notebook manifestos, a question formed: what if digital algorithms inhabited physical acoustic space?",
      keyReceiptIds: ["music_01", "note_01", "search_01", "place_01"],
    },
    {
      act: "02",
      title: "Something Changed",
      subtitle: "April 2024 · Crossing Borders into Berlin",
      narrative:
        "The decision to leave freelance safety behind was sealed with a roundtrip flight to Berlin. In the cavernous broadcast studios of Funkhaus Berlin and at modular synth salons, a solo obsession became a collaborative mission. Elena Rostova brought light; Alex brought sound.",
      keyReceiptIds: ["purchase_03", "place_04", "event_02", "message_04", "photo_05"],
    },
    {
      act: "03",
      title: "New Places & Nature's Frequency",
      subtitle: "May 2024 · Atlantic Gale Swells and the Derelict Hall",
      narrative:
        "Standing at the edge of Europe on the granite cliffs of Cabo da Roca, microphones measured the 11.4-second rhythm of Atlantic storm swells. That wave frequency became the biological pulse of the work. Two weeks later in Marvila, an abandoned wine depot with 8-meter iron rafters was leased with remaining savings.",
      keyReceiptIds: ["place_05", "photo_06", "note_06", "place_07", "purchase_08"],
    },
    {
      act: "04",
      title: "More People, More Moments",
      subtitle: "June 2024 · The Midsummer Feast and Human Resonance",
      narrative:
        "Santos Populares filled the stone alleys of Alfama with smoke, accordion chords, and neighbors singing from balconies. The experience proved that an audience is not passive: human bodies absorb, reflect, and amplify acoustic resonance.",
      keyReceiptIds: ["event_04", "photo_09", "purchase_09", "event_05"],
    },
    {
      act: "05",
      title: "The Pattern Emerges",
      subtitle: "July 2024 · Rigging, Cable Runs, and The Optical Lock",
      narrative:
        "Four weeks on extension ladders. A stubborn 14ms timing jitter between ultrasonic sound and laser scanners was defeated by building a dedicated hardware subnet. When the laser sheet pulsed in sub-millisecond unison with the ocean bass wave, the space became alive.",
      keyReceiptIds: ["place_10", "search_09", "note_11", "photo_12"],
    },
    {
      act: "06",
      title: "One Story",
      subtitle: "August 2024 · The Vernissage and The Midnight Overlook",
      narrative:
        "Ten days. Over two thousand visitors walked into the darkness of Armazém 18B and fell silent together. When the exhibition closed, the gear was packed into flight cases, leaving only chalk outlines on the concrete floor. What remained was permanent memory.",
      keyReceiptIds: ["event_07", "photo_13", "message_10", "place_12", "note_14"],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-museum-900 border border-gold/30 text-gold text-xs font-mono uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Interactive Documentary Conclusion</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-museum-100 tracking-tight">
          The Story Hidden Inside Your Receipts
        </h2>

        <p className="text-base text-museum-300 font-sans leading-relaxed">
          From isolated fragments of daily living to a cohesive human narrative.
        </p>
      </div>

      {/* Interactive Payoff Reveal Component */}
      <StoryReveal
        allReceipts={allReceipts}
        onSelectReceipt={onSelectReceipt}
      />

      {/* Documentary Narrative Sequence */}
      <div className="space-y-10 pt-6">
        <div className="text-center">
          <span className="text-xs font-mono text-gold uppercase tracking-widest">
            The Complete Narrative Arc · 6 Acts
          </span>
        </div>

        {storyActs.map((act) => {
          const actMoments = act.keyReceiptIds
            .map((id) => allReceipts.find((r) => r.id === id))
            .filter(Boolean) as Receipt[];

          return (
            <div
              key={act.act}
              className="p-6 sm:p-8 rounded-3xl bg-museum-900/80 border border-museum-800 space-y-5 hover:border-gold/30 transition-all"
            >
              <div className="flex items-center justify-between border-b border-museum-850 pb-3">
                <span className="font-serif font-bold text-xl text-gold/60">
                  ACT {act.act}
                </span>
                <span className="text-xs font-mono text-museum-400">
                  {act.subtitle}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-museum-100">
                  {act.title}
                </h3>
                <p className="text-sm text-museum-300 font-sans mt-2 leading-relaxed">
                  {act.narrative}
                </p>
              </div>

              {/* Moments Pills */}
              <div className="pt-2 border-t border-museum-850 flex flex-wrap gap-2">
                {actMoments.map((r) => {
                  const cat = CATEGORY_CONFIG[r.type];
                  return (
                    <button
                      key={r.id}
                      onClick={() => onSelectReceipt(r)}
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-museum-950 border border-museum-800 hover:border-gold/40 text-xs font-mono transition-colors text-museum-300"
                    >
                      <span style={{ color: cat.color }}>●</span>
                      <span className="font-medium text-museum-200">{r.title}</span>
                      <span className="text-museum-500 text-[10px]">({cat.name})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Philosophical Epilogue Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-museum-950 via-museum-900 to-museum-950 border border-gold/40 text-center space-y-4 shadow-2xl">
        <Quote className="w-8 h-8 text-gold mx-auto opacity-70" />
        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-museum-100 italic max-w-xl mx-auto">
          &ldquo;Every moment leaves a trace. Connect the traces. Discover the story.&rdquo;
        </h3>
        <p className="text-xs sm:text-sm text-museum-300 font-sans max-w-lg mx-auto leading-relaxed">
          A life is not composed of broad generalizations. It is etched in the micro-receipts of our curiosity, our courage, and the people who sat beside us when dawn broke.
        </p>
        <div className="pt-4 text-xs font-mono text-gold tracking-wider uppercase">
          LIFE ATLAS · WebRush Hackathon
        </div>
      </div>
    </div>
  );
};
