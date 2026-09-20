"use client";

import React from "react";
import { Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate, formatTime } from "@/lib/utils";
import { Share2, MapPin, ArrowRight } from "lucide-react";

interface ReceiptStreamViewProps {
  receipts: Receipt[];
  onSelect: (receipt: Receipt) => void;
  onExploreConnection: (receiptId: string) => void;
}

export const ReceiptStreamView: React.FC<ReceiptStreamViewProps> = ({
  receipts,
  onSelect,
  onExploreConnection,
}) => {
  return (
    <div className="relative border-l-2 border-museum-800 ml-4 sm:ml-8 my-6 space-y-6">
      {receipts.map((r, i) => {
        const cat = CATEGORY_CONFIG[r.type];
        return (
          <div
            key={r.id}
            onClick={() => onSelect(r)}
            className="relative pl-6 sm:pl-8 group cursor-pointer"
          >
            {/* Timeline node marker */}
            <div
              className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-museum-950 transition-transform group-hover:scale-125"
              style={{ backgroundColor: cat.color }}
            />

            {/* Stream card */}
            <div className="p-4 sm:p-5 rounded-xl bg-museum-900/90 border border-museum-800 hover:border-gold/50 transition-all shadow-md group-hover:shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono mb-2">
                <div className="flex items-center space-x-2">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold border"
                    style={{
                      backgroundColor: cat.bgMuted,
                      color: cat.color,
                      borderColor: cat.border,
                    }}
                  >
                    {cat.name}
                  </span>
                  <span className="text-museum-400">
                    {formatDate(r.date)} at {formatTime(r.timestamp)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-museum-400 text-[11px]">
                  <MapPin className="w-3 h-3 text-gold/80" />
                  <span>{r.location.name}, {r.location.city}</span>
                </div>
              </div>

              <h4 className="text-base font-serif font-bold text-museum-100 group-hover:text-gold transition-colors">
                {r.title}
              </h4>
              <p className="text-xs text-museum-300 mt-1 font-sans leading-relaxed">
                {r.description}
              </p>

              <div className="mt-3 pt-2.5 border-t border-museum-850 flex items-center justify-between text-xs font-mono text-museum-400">
                <span className="text-gold">#{r.theme}</span>
                <div className="flex items-center space-x-3">
                  {r.relatedIds.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreConnection(r.id);
                      }}
                      className="text-indigo-400 hover:text-gold text-[11px] flex items-center space-x-1"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{r.relatedIds.length} connected traces</span>
                    </button>
                  )}
                  <span className="text-museum-400 group-hover:text-gold text-xs">
                    Inspect moment →
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
