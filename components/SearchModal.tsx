"use client";

import React, { useEffect, useRef } from "react";
import { Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate, formatTime } from "@/lib/utils";
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  receipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
  onExploreConnection: (receiptId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  receipts,
  onSelectReceipt,
  onExploreConnection,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const quickThemes = ["Exploration", "Creativity", "Connection", "Celebration", "Change"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Search all life receipts"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-museum-900 border border-museum-750 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-museum-800 px-4 py-3 flex items-center">
          <Search className="w-5 h-5 text-gold mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across songs, places, books, messages, notes, and thoughts..."
            className="w-full bg-transparent text-museum-100 placeholder-museum-500 text-sm focus:outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded text-museum-500 hover:text-museum-300"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-mono text-museum-500 hover:text-museum-300 px-2 py-1 bg-museum-850 rounded border border-museum-750"
          >
            ESC
          </button>
        </div>

        {/* Quick Theme Pills */}
        <div className="px-4 py-2 border-b border-museum-850 bg-museum-950/60 flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-museum-500 font-mono text-[11px] shrink-0">Quick themes:</span>
          {quickThemes.map((theme) => (
            <button
              key={theme}
              onClick={() => setSearchQuery(theme)}
              className="px-2 py-0.5 rounded-full bg-museum-850 hover:bg-museum-800 text-museum-300 border border-museum-750 hover:border-gold/30 text-[11px] shrink-0 transition-colors"
            >
              {theme}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1.5 flex-1 divide-y divide-museum-850/50">
          {receipts.length === 0 ? (
            <div className="py-12 text-center text-museum-500">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40 text-gold" />
              <p className="text-sm">No receipts match &ldquo;{searchQuery}&rdquo;</p>
              <p className="text-xs text-museum-600 mt-1">Try searching for &apos;ambient&apos;, &apos;warehouse&apos;, &apos;Lisbon&apos;, or &apos;Elena&apos;</p>
            </div>
          ) : (
            receipts.slice(0, 15).map((r) => {
              const cat = CATEGORY_CONFIG[r.type];
              return (
                <div
                  key={r.id}
                  className="pt-1.5 first:pt-0 group flex items-start justify-between p-2.5 rounded-lg hover:bg-museum-850/80 cursor-pointer transition-colors"
                  onClick={() => {
                    onSelectReceipt(r);
                    onClose();
                  }}
                >
                  <div className="flex items-start space-x-3 pr-2 min-w-0">
                    <span
                      className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border shrink-0 mt-0.5 font-medium"
                      style={{
                        backgroundColor: cat.bgMuted,
                        color: cat.color,
                        borderColor: cat.border,
                      }}
                    >
                      {cat.name}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-museum-100 group-hover:text-gold transition-colors truncate">
                        {r.title}
                      </h4>
                      <p className="text-xs text-museum-400 line-clamp-1 mt-0.5">
                        {r.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1 text-[11px] font-mono text-museum-500">
                        <span>{formatDate(r.date)}</span>
                        <span>·</span>
                        <span>{r.location.name}, {r.location.city}</span>
                        <span>·</span>
                        <span className="text-gold/80">#{r.theme}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onExploreConnection(r.id);
                        onClose();
                      }}
                      className="px-2 py-1 rounded bg-museum-800 text-[11px] text-museum-300 hover:text-gold border border-museum-700 flex items-center space-x-1"
                      title="View in Connection Map"
                    >
                      <Sparkles className="w-3 h-3 text-gold" />
                      <span className="hidden sm:inline">Connect</span>
                    </button>
                    <div className="p-1 text-museum-400">
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-museum-950/80 border-t border-museum-800 text-xs text-museum-400 flex items-center justify-between font-mono">
          <span>
            Showing <strong className="text-gold">{Math.min(15, receipts.length)}</strong> of {receipts.length} matches
          </span>
          <span className="text-[11px] text-museum-500">Click a result to view moment details</span>
        </div>
      </div>
    </div>
  );
};
