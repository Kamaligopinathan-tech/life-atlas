"use client";

import React from "react";
import { Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate, formatTime } from "@/lib/utils";
import { calculateConnectionStrength } from "@/lib/connections";
import {
  X,
  Share2,
  MapPin,
  Clock,
  Sparkles,
  Tag,
  ArrowRight,
  Bookmark,
  Calendar,
} from "lucide-react";

interface ReceiptDetailProps {
  receipt: Receipt | null;
  onClose: () => void;
  allReceipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
  onExploreConnection: (receiptId: string) => void;
}

export const ReceiptDetail: React.FC<ReceiptDetailProps> = ({
  receipt,
  onClose,
  allReceipts,
  onSelectReceipt,
  onExploreConnection,
}) => {
  if (!receipt) return null;

  const cat = CATEGORY_CONFIG[receipt.type];

  // Calculate detailed connections to related moments
  const relatedWithScores = receipt.relatedIds
    .map((id) => {
      const found = allReceipts.find((r) => r.id === id);
      if (!found) return null;
      const score = calculateConnectionStrength(receipt, found);
      return { receipt: found, connection: score };
    })
    .filter(Boolean) as Array<{
      receipt: Receipt;
      connection: ReturnType<typeof calculateConnectionStrength>;
    }>;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/75 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${receipt.title}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl h-full bg-museum-950 border-l border-museum-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-250"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Detail Header */}
        <div className="p-5 border-b border-museum-800 flex items-center justify-between bg-museum-900/90">
          <div className="flex items-center space-x-2">
            <span
              className="px-2.5 py-1 rounded-full text-xs font-mono uppercase font-semibold border flex items-center space-x-1.5"
              style={{
                backgroundColor: cat.bgMuted,
                color: cat.color,
                borderColor: cat.border,
              }}
            >
              <span>{cat.name}</span>
            </span>
            <span className="text-xs font-mono text-museum-400">
              Receipt #{receipt.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-museum-400 hover:text-museum-100 hover:bg-museum-800 transition-colors"
            aria-label="Close detail panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title and Timestamp */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-gold mb-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(receipt.date)}</span>
              <span>·</span>
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(receipt.timestamp)}</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-museum-100 leading-snug">
              {receipt.title}
            </h2>
            <p className="text-sm text-museum-300 font-sans mt-2 leading-relaxed">
              {receipt.description}
            </p>
          </div>

          {/* MOST IMPORTANT: "Why this moment matters" Editorial Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-gold/10 via-museum-900 to-museum-900 border border-gold/40 shadow-[0_0_20px_rgba(226,177,112,0.1)] space-y-2">
            <div className="flex items-center space-x-2 text-gold font-serif font-bold text-sm">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Why This Moment Matters</span>
            </div>
            <p className="text-xs text-museum-200 font-sans leading-relaxed">
              {receipt.editorialWhy}
            </p>
          </div>

          {/* Primary CTA: Explore this connection */}
          <button
            onClick={() => onExploreConnection(receipt.id)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold to-amber-400 text-museum-950 font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 hover:brightness-110 transition-all shadow-[0_0_20px_rgba(226,177,112,0.25)]"
          >
            <Share2 className="w-4 h-4" />
            <span>Explore This Moment in Connection Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Location & Context Details */}
          <div className="rounded-xl bg-museum-900 border border-museum-800 p-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-museum-400 border-b border-museum-850 pb-2">
              Spatial &amp; Contextual Trace
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <span className="text-museum-500 block text-[10px]">Location:</span>
                <span className="text-museum-200 font-medium">{receipt.location.name}</span>
              </div>
              <div>
                <span className="text-museum-500 block text-[10px]">City &amp; Area:</span>
                <span className="text-museum-200">
                  {receipt.location.area ? `${receipt.location.area}, ` : ""}
                  {receipt.location.city}
                </span>
              </div>
              <div>
                <span className="text-museum-500 block text-[10px]">Environment:</span>
                <span className="text-museum-200 capitalize">{receipt.location.category}</span>
              </div>
              <div>
                <span className="text-museum-500 block text-[10px]">Time of Day:</span>
                <span className="text-museum-200 capitalize">{receipt.timeOfDay.replace("_", " ")}</span>
              </div>
            </div>
          </div>

          {/* Specific Metadata Attributes */}
          <div className="rounded-xl bg-museum-900 border border-museum-800 p-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-museum-400 border-b border-museum-850 pb-2">
              Receipt Technical Metadata
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              {Object.entries(receipt.metadata).map(([key, value]) => {
                if (typeof value === "object" || value === undefined) return null;
                return (
                  <div key={key}>
                    <span className="text-museum-500 block text-[10px] capitalize">
                      {key.replace(/([A-Z])/g, " $1")}:
                    </span>
                    <span className="text-museum-200 font-medium">
                      {typeof value === "number" && key.toLowerCase().includes("amount")
                        ? `€${value.toFixed(2)}`
                        : String(value)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Connected Moments Network */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-museum-800 pb-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-museum-300 flex items-center space-x-1.5">
                <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Directly Connected Moments ({relatedWithScores.length})</span>
              </h4>
              <span className="text-[10px] font-mono text-museum-500">
                Click any moment to navigate
              </span>
            </div>

            {relatedWithScores.length === 0 ? (
              <p className="text-xs text-museum-500 italic">No direct curated links.</p>
            ) : (
              <div className="space-y-2.5">
                {relatedWithScores.map(({ receipt: rel, connection }) => {
                  const relCat = CATEGORY_CONFIG[rel.type];
                  return (
                    <div
                      key={rel.id}
                      onClick={() => onSelectReceipt(rel)}
                      className="p-3 rounded-xl bg-museum-900 border border-museum-800 hover:border-gold/50 transition-all cursor-pointer group space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span style={{ color: relCat.color }} className="font-semibold uppercase">
                          {relCat.name}
                        </span>
                        <span className="text-gold font-bold">
                          Score: {Math.round(connection.score * 100)}%
                        </span>
                      </div>
                      <h5 className="text-xs font-semibold text-museum-100 group-hover:text-gold transition-colors">
                        {rel.title}
                      </h5>
                      <p className="text-[11px] text-museum-400 line-clamp-1">
                        {rel.description}
                      </p>
                      <div className="pt-1 text-[10px] font-mono text-museum-500">
                        <span>Why connected: {connection.reasons[0]}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tags & Theme */}
          <div className="pt-2 border-t border-museum-800/80 flex flex-wrap items-center gap-1.5 text-xs font-mono">
            <span className="text-gold px-2.5 py-1 rounded bg-museum-900 border border-gold/30">
              #{receipt.theme}
            </span>
            {receipt.tags.map((tag) => (
              <span
                key={tag}
                className="text-museum-400 px-2 py-0.5 rounded bg-museum-900 border border-museum-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
