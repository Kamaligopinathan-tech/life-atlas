"use client";

import React from "react";
import { Receipt } from "@/types/receipts";
import { ConnectionMap } from "./ConnectionMap";
import { ConnectionPanel } from "./ConnectionPanel";

interface ConnectionsViewProps {
  receipts: Receipt[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  onOpenReceiptDetail: (receipt: Receipt) => void;
}

export const ConnectionsView: React.FC<ConnectionsViewProps> = ({
  receipts,
  selectedNodeId,
  onSelectNode,
  onOpenReceiptDetail,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="border-l-2 border-gold pl-4 py-1">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-museum-100 tracking-tight">
          Connection Map
        </h2>
        <p className="text-sm text-museum-300 mt-1 font-sans">
          Discover how music, places, photos, purchases, and messages interconnect across space and time.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Network Graph */}
        <div className="lg:col-span-7 xl:col-span-8">
          <ConnectionMap
            receipts={receipts}
            selectedNodeId={selectedNodeId}
            onSelectNode={onSelectNode}
            onOpenReceiptDetail={onOpenReceiptDetail}
          />
        </div>

        {/* Right Column: Connected Story Panel */}
        <div className="lg:col-span-5 xl:col-span-4">
          <ConnectionPanel
            selectedNodeId={selectedNodeId}
            receipts={receipts}
            onSelectNode={onSelectNode}
            onOpenReceiptDetail={onOpenReceiptDetail}
          />
        </div>
      </div>
    </div>
  );
};
