"use client";

import React from "react";
import { Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate, formatTime } from "@/lib/utils";
import { Share2, MapPin, Sparkles, Tag } from "lucide-react";

interface ReceiptCardProps {
  receipt: Receipt;
  connectedCount: number;
  allReceipts: Receipt[];
  onSelect: (receipt: Receipt) => void;
  onExploreConnection: (receiptId: string) => void;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({
  receipt,
  connectedCount,
  allReceipts,
  onSelect,
  onExploreConnection,
}) => {
  const cat = CATEGORY_CONFIG[receipt.type];

  // Connected moments previews (first 3)
  const connectedMoments = receipt.relatedIds
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
      case "search":
        return "🔎";
      case "movie":
        return "🎬";
      case "event":
        return "📅";
      case "note":
        return "📝";
      default:
        return "✦";
    }
  };

  return (
    <div
      onClick={() => onSelect(receipt)}
      className="group relative rounded-2xl bg-museum-900/90 border border-museum-800/90 hover:border-gold/50 p-5 shadow-lg hover:shadow-2xl transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Category accent bar top highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: cat.color }}
      />

      <div>
        {/* Top meta row: Category pill, timestamp, importance dots */}
        <div className="flex items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span
              className="px-2.5 py-0.5 rounded-full font-medium text-[10px] tracking-wider uppercase border"
              style={{
                backgroundColor: cat.bgMuted,
                color: cat.color,
                borderColor: cat.border,
              }}
            >
              {getEmoji(receipt.type)} {cat.name}
            </span>
            <span className="text-museum-400 text-[11px]">
              {formatTime(receipt.timestamp)}
            </span>
          </div>

          <div className="flex items-center space-x-1" title={`Significance: ${receipt.importance}/5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i < receipt.importance ? "bg-gold" : "bg-museum-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Title & Description */}
        <div className="mt-3.5 space-y-1.5">
          <h4 className="text-base font-serif font-bold text-museum-100 group-hover:text-gold transition-colors leading-snug">
            {receipt.title}
          </h4>
          <p className="text-xs text-museum-300 font-sans leading-relaxed line-clamp-2">
            {receipt.description}
          </p>
        </div>

        {/* Location & Metadata Chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-mono text-museum-400">
          <span className="inline-flex items-center space-x-1 bg-museum-950 px-2 py-0.5 rounded border border-museum-850">
            <MapPin className="w-3 h-3 text-gold/80" />
            <span className="truncate max-w-[150px]">
              {receipt.location.name}
            </span>
          </span>

          <span className="inline-flex items-center space-x-1 bg-museum-950 px-2 py-0.5 rounded border border-museum-850 text-museum-400">
            <span>{formatDate(receipt.date)}</span>
          </span>

          {receipt.metadata.amount && (
            <span className="bg-amber-950/40 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded">
              €{receipt.metadata.amount.toFixed(2)}
            </span>
          )}

          {receipt.metadata.artist && (
            <span className="bg-purple-950/40 text-purple-300 border border-purple-800/40 px-2 py-0.5 rounded">
              {receipt.metadata.artist}
            </span>
          )}
        </div>

        {/* Connected moments peek */}
        {connectedMoments.length > 0 && (
          <div className="mt-3.5 pt-2.5 border-t border-museum-850 space-y-1">
            <span className="text-[10px] font-mono uppercase text-museum-500 tracking-wider block">
              Connected Traces:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {connectedMoments.map((conn) => (
                <span
                  key={conn.id}
                  className="inline-flex items-center space-x-1 text-[11px] font-mono text-museum-300 bg-museum-950/90 px-2 py-0.5 rounded border border-museum-800 hover:border-gold/40 transition-colors"
                >
                  <span>{getEmoji(conn.type)}</span>
                  <span className="truncate max-w-[120px]">{conn.title}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Tags, Connected Count Badge & Action */}
      <div className="mt-4 pt-3 border-t border-museum-850/80 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center space-x-1.5">
          <span className="text-gold/90 text-[11px]">#{receipt.theme}</span>
          <span className="text-museum-600">·</span>
          <span className="text-museum-500 text-[11px]">
            {receipt.tags[0] ? `#${receipt.tags[0]}` : ""}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {connectedCount > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExploreConnection(receipt.id);
              }}
              className="flex items-center space-x-1 px-2 py-0.5 rounded bg-museum-950 border border-museum-800 hover:border-gold/50 text-indigo-400 hover:text-gold text-[11px] transition-all"
              title="View in Connection Map"
            >
              <Share2 className="w-3 h-3" />
              <span>{connectedCount}</span>
            </button>
          )}
          <span className="text-museum-400 group-hover:text-gold group-hover:translate-x-0.5 transition-all text-xs font-medium">
            Details →
          </span>
        </div>
      </div>
    </div>
  );
};
