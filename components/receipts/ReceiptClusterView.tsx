"use client";

import React, { useState } from "react";
import { Receipt, MoodTheme } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate } from "@/lib/utils";
import { Sparkles, MapPin } from "lucide-react";

interface ReceiptClusterViewProps {
  receipts: Receipt[];
  onSelect: (receipt: Receipt) => void;
  onExploreConnection: (receiptId: string) => void;
}

export const ReceiptClusterView: React.FC<ReceiptClusterViewProps> = ({
  receipts,
  onSelect,
  onExploreConnection,
}) => {
  const themes: MoodTheme[] = [
    "Creativity",
    "Connection",
    "Exploration",
    "Celebration",
    "Change",
    "Discovery",
    "Routine",
  ];

  const [activeCluster, setActiveCluster] = useState<MoodTheme>("Creativity");

  // Group receipts by theme
  const clusters = themes.map((theme) => {
    const items = receipts.filter((r) => r.theme === theme);
    return {
      theme,
      count: items.length,
      items,
    };
  });

  const selectedClusterData = clusters.find((c) => c.theme === activeCluster) || clusters[0];

  return (
    <div className="space-y-6">
      {/* Cluster Pills Bar */}
      <div className="flex flex-wrap gap-2 pt-2">
        {clusters.map((c) => {
          const isSelected = activeCluster === c.theme;
          return (
            <button
              key={c.theme}
              onClick={() => setActiveCluster(c.theme)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-2 border ${
                isSelected
                  ? "bg-gold text-museum-950 font-bold border-gold shadow-[0_0_15px_rgba(226,177,112,0.25)]"
                  : "bg-museum-900 text-museum-300 border-museum-800 hover:border-gold/30"
              }`}
            >
              <span>#{c.theme}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? "bg-museum-950/20 text-museum-950" : "bg-museum-950 text-museum-400"
                }`}
              >
                {c.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Cluster Narrative Details Header */}
      <div className="p-4 rounded-xl bg-museum-950 border border-museum-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono text-gold uppercase tracking-wider">
            Spatial Cluster: #{selectedClusterData.theme}
          </span>
          <h4 className="text-base font-serif font-bold text-museum-100 mt-0.5">
            {selectedClusterData.count} receipts converging around this life dimension
          </h4>
        </div>
        <div className="text-xs font-mono text-museum-400">
          Click any card to open the detail panel
        </div>
      </div>

      {/* Receipts in Active Cluster */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedClusterData.items.map((r) => {
          const cat = CATEGORY_CONFIG[r.type];
          return (
            <div
              key={r.id}
              onClick={() => onSelect(r)}
              className="p-4 rounded-xl bg-museum-900 border border-museum-800 hover:border-gold/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                  <span style={{ color: cat.color }} className="font-medium">
                    {cat.name}
                  </span>
                  <span className="text-museum-400">{formatDate(r.date)}</span>
                </div>
                <h5 className="text-sm font-semibold text-museum-100 group-hover:text-gold transition-colors line-clamp-1">
                  {r.title}
                </h5>
                <p className="text-xs text-museum-300 mt-1 line-clamp-2">
                  {r.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-museum-850 flex items-center justify-between text-[11px] font-mono text-museum-400">
                <span className="flex items-center space-x-1 truncate max-w-[150px]">
                  <MapPin className="w-3 h-3 text-gold/70 shrink-0" />
                  <span className="truncate">{r.location.name}</span>
                </span>
                <span className="text-gold group-hover:translate-x-0.5 transition-transform">
                  Details →
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
