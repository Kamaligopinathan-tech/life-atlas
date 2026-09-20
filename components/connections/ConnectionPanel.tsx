"use client";

import React from "react";
import { Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate, formatTime } from "@/lib/utils";
import {
  calculateConnectionStrength,
  generateNarrativeChain,
  getRelatedReceipts,
} from "@/lib/connections";
import { Sparkles, Share2, MapPin, ArrowDown, ExternalLink } from "lucide-react";

interface ConnectionPanelProps {
  selectedNodeId: string;
  receipts: Receipt[];
  onSelectNode: (id: string) => void;
  onOpenReceiptDetail: (receipt: Receipt) => void;
}

export const ConnectionPanel: React.FC<ConnectionPanelProps> = ({
  selectedNodeId,
  receipts,
  onSelectNode,
  onOpenReceiptDetail,
}) => {
  const selectedReceipt = receipts.find((r) => r.id === selectedNodeId) || receipts[0];
  const cat = CATEGORY_CONFIG[selectedReceipt.type];

  // Generate dynamic 4-step narrative chain starting from this node
  const narrativeChain = generateNarrativeChain(selectedReceipt.id, receipts, 4);

  // Get top related receipts with calculated relationship scores
  const relatedMoments = getRelatedReceipts(selectedReceipt.id, receipts, 5, 0.25);

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
    <div className="rounded-2xl border border-museum-800 bg-museum-900/90 p-5 sm:p-6 shadow-xl space-y-6 flex flex-col justify-between">
      {/* Top Banner: Focused Node */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-gold uppercase tracking-wider font-semibold flex items-center space-x-1.5">
            <Share2 className="w-3.5 h-3.5" />
            <span>Connected Story Chain</span>
          </span>
          <span className="text-museum-500">ID: #{selectedReceipt.id}</span>
        </div>

        {/* Selected Moment Card */}
        <div className="p-4 rounded-xl bg-museum-950 border border-museum-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span
              className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold border"
              style={{
                backgroundColor: cat.bgMuted,
                color: cat.color,
                borderColor: cat.border,
              }}
            >
              {getEmoji(selectedReceipt.type)} {cat.name}
            </span>
            <span className="text-museum-400">
              {formatDate(selectedReceipt.date)}
            </span>
          </div>

          <h3 className="text-lg font-serif font-bold text-museum-100 leading-snug">
            {selectedReceipt.title}
          </h3>

          <p className="text-xs text-museum-300 font-sans leading-relaxed">
            {selectedReceipt.description}
          </p>

          <div className="pt-2 border-t border-museum-850 flex items-center justify-between text-xs font-mono text-museum-400">
            <span className="flex items-center space-x-1 text-gold/80">
              <MapPin className="w-3 h-3" />
              <span>{selectedReceipt.location.name}</span>
            </span>
            <button
              onClick={() => onOpenReceiptDetail(selectedReceipt)}
              className="text-gold hover:underline flex items-center space-x-1 text-xs"
            >
              <span>Full Details</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* CORE FEATURE: The Narrative Story Chain (e.g. Song -> Place -> Photo -> Purchase) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between border-b border-museum-800 pb-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-museum-200 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>The Causality Chain</span>
          </h4>
          <span className="text-[10px] font-mono text-gold">4 sequential moments</span>
        </div>

        {/* Chain explanation banner */}
        <div className="p-3 rounded-lg bg-gold/10 border border-gold/30 text-xs text-museum-200 font-serif italic leading-relaxed">
          &ldquo;What looked like four unrelated digital receipts was actually one connected human journey.&rdquo;
        </div>

        {/* Vertical Chain Items */}
        <div className="space-y-2 relative">
          {narrativeChain.map((item, idx) => {
            const itemCat = CATEGORY_CONFIG[item.type];
            const isCurrent = item.id === selectedReceipt.id;

            return (
              <React.Fragment key={item.id}>
                <div
                  onClick={() => onSelectNode(item.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer group flex items-start justify-between ${
                    isCurrent
                      ? "bg-museum-850 border-gold/60 shadow-[0_0_15px_rgba(226,177,112,0.15)]"
                      : "bg-museum-950/70 border-museum-800 hover:border-gold/30"
                  }`}
                >
                  <div className="flex items-start space-x-2.5">
                    <span className="text-base select-none mt-0.5">
                      {getEmoji(item.type)}
                    </span>
                    <div>
                      <div className="flex items-center space-x-2 text-[10px] font-mono">
                        <span style={{ color: itemCat.color }} className="font-semibold uppercase">
                          {itemCat.name}
                        </span>
                        <span className="text-museum-500">·</span>
                        <span className="text-museum-400">{formatTime(item.timestamp)}</span>
                      </div>
                      <h5 className="text-xs font-semibold text-museum-100 group-hover:text-gold transition-colors mt-0.5 line-clamp-1">
                        {item.title}
                      </h5>
                      <p className="text-[11px] text-museum-400 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-museum-500 group-hover:text-gold shrink-0">
                    Step 0{idx + 1}
                  </span>
                </div>

                {idx < narrativeChain.length - 1 && (
                  <div className="flex justify-center -my-1 text-gold/60">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Top Connected Reasons Breakdown */}
      <div className="space-y-2 pt-2 border-t border-museum-800">
        <h4 className="text-xs font-mono uppercase tracking-wider text-museum-400">
          Closest Connected Neighbors ({relatedMoments.length})
        </h4>

        <div className="space-y-2">
          {relatedMoments.slice(0, 3).map(({ receipt: rel, connection }) => {
            const relCat = CATEGORY_CONFIG[rel.type];
            return (
              <div
                key={rel.id}
                onClick={() => onSelectNode(rel.id)}
                className="p-2.5 rounded-lg bg-museum-950/90 border border-museum-850 hover:border-gold/40 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2 min-w-0 pr-2">
                  <span className="text-sm">{getEmoji(rel.type)}</span>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-museum-200 group-hover:text-gold transition-colors truncate">
                      {rel.title}
                    </div>
                    <div className="text-[10px] font-mono text-museum-500 truncate">
                      {connection.reasons[0]}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-gold">
                    {Math.round(connection.score * 100)}%
                  </span>
                  <span className="block text-[9px] font-mono uppercase text-museum-500">
                    {connection.strength}
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
