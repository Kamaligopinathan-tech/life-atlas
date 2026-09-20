"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Receipt, ReceiptType } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate, formatTime } from "@/lib/utils";
import { calculateConnectionStrength, ConnectionEdge } from "@/lib/connections";
import { ZoomIn, ZoomOut, RotateCcw, Filter, Sparkles, Sliders } from "lucide-react";

interface ConnectionMapProps {
  receipts: Receipt[];
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  onOpenReceiptDetail: (receipt: Receipt) => void;
}

interface GraphNode {
  id: string;
  receipt: Receipt;
  x: number;
  y: number;
  radius: number;
  category: ReceiptType;
}

export const ConnectionMap: React.FC<ConnectionMapProps> = ({
  receipts,
  selectedNodeId,
  onSelectNode,
  onOpenReceiptDetail,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [minStrength, setMinStrength] = useState<number>(0.35);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Use a curated set of 28 key interconnected receipts for clear, legible map rendering
  const activeReceipts = useMemo(() => {
    // Ensure selectedNode is always in the active set
    const selected = receipts.find((r) => r.id === selectedNodeId);
    const relatedToSelected = selected ? selected.relatedIds : [];

    const keySet = new Set<string>([
      selectedNodeId,
      ...relatedToSelected,
      "music_01", "note_01", "search_01", "purchase_01", "place_01", "photo_01",
      "place_04", "note_04", "event_02", "message_04", "photo_05",
      "place_05", "photo_06", "note_06", "place_07", "photo_08", "event_03", "purchase_08",
      "event_04", "photo_09", "purchase_09",
      "place_09", "note_10", "note_11", "photo_12", "place_11",
      "event_07", "photo_13", "message_10", "place_12", "purchase_18", "photo_14", "music_10", "note_14"
    ]);

    return receipts.filter((r) => keySet.has(r.id)).slice(0, 32);
  }, [receipts, selectedNodeId]);

  // Compute 2D node coordinates using concentric thematic rings
  const nodes: GraphNode[] = useMemo(() => {
    const width = 850;
    const height = 550;
    const centerX = width / 2;
    const centerY = height / 2;

    return activeReceipts.map((r, i) => {
      // If it's the selected node, place near center
      if (r.id === selectedNodeId) {
        return {
          id: r.id,
          receipt: r,
          x: centerX,
          y: centerY,
          radius: 20,
          category: r.type,
        };
      }

      // Distribute in concentric orbits based on date/chapter
      const angle = (i / (activeReceipts.length - 1)) * 2 * Math.PI;
      const orbitRadius = 140 + (i % 3) * 65;
      const x = centerX + Math.cos(angle) * orbitRadius + (Math.sin(i * 3) * 20);
      const y = centerY + Math.sin(angle) * (orbitRadius * 0.8) + (Math.cos(i * 2) * 15);

      return {
        id: r.id,
        receipt: r,
        x,
        y,
        radius: r.importance >= 4 ? 14 : 11,
        category: r.type,
      };
    });
  }, [activeReceipts, selectedNodeId]);

  // Compute edges between active nodes with scores >= minStrength
  const edges = useMemo(() => {
    const edgeList: ConnectionEdge[] = [];
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i].receipt;
        const b = nodes[j].receipt;
        const conn = calculateConnectionStrength(a, b);

        if (conn.score >= minStrength) {
          edgeList.push({
            id: `${a.id}--${b.id}`,
            source: a.id,
            target: b.id,
            score: conn.score,
            strength: conn.strength,
            primaryReason: conn.reasons[0],
          });
        }
      }
    }
    return edgeList;
  }, [nodes, minStrength]);

  // Identify nodes directly connected to selectedNodeId
  const connectedNodeIds = useMemo(() => {
    const set = new Set<string>([selectedNodeId]);
    for (const edge of edges) {
      if (edge.source === selectedNodeId) set.add(edge.target);
      if (edge.target === selectedNodeId) set.add(edge.source);
    }
    return set;
  }, [edges, selectedNodeId]);

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

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
    <div className="relative w-full rounded-2xl border border-museum-800 bg-museum-950 overflow-hidden shadow-2xl flex flex-col">
      {/* Top Map Toolbar */}
      <div className="p-3 sm:p-4 bg-museum-900/90 border-b border-museum-800 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-gold font-bold uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connection Graph</span>
          </span>
          <span className="text-museum-500">·</span>
          <span className="text-museum-400">
            {nodes.length} nodes, {edges.length} relationships
          </span>
        </div>

        {/* Strength Slider & Zoom Controls */}
        <div className="flex items-center space-x-4">
          {/* Min Strength threshold slider */}
          <div className="flex items-center space-x-2 text-xs font-mono text-museum-300">
            <Sliders className="w-3.5 h-3.5 text-gold" />
            <span className="text-[11px] hidden sm:inline text-museum-400">Min Strength:</span>
            <input
              type="range"
              min="0.20"
              max="0.65"
              step="0.05"
              value={minStrength}
              onChange={(e) => setMinStrength(parseFloat(e.target.value))}
              className="w-20 sm:w-24 accent-gold cursor-pointer"
            />
            <span className="text-[11px] text-gold w-8 font-bold">
              {Math.round(minStrength * 100)}%
            </span>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center bg-museum-950 border border-museum-750 rounded-lg p-0.5">
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.15))}
              className="p-1 text-museum-400 hover:text-gold"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
              className="p-1 text-museum-400 hover:text-gold"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={resetView}
              className="p-1 text-museum-400 hover:text-gold"
              title="Reset View"
              aria-label="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative w-full h-[520px] cursor-${isDragging ? "grabbing" : "grab"} overflow-hidden select-none bg-[radial-gradient(circle_at_center,rgba(226,177,112,0.04)_0%,transparent_70%)]`}
      >
        <svg
          viewBox="0 0 850 550"
          className="w-full h-full transition-transform duration-75"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: "center center",
          }}
        >
          {/* Subtle background radar circles */}
          <circle cx="425" cy="275" r="120" fill="none" stroke="#24293a" strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          <circle cx="425" cy="275" r="200" fill="none" stroke="#24293a" strokeWidth="1" strokeDasharray="4,4" opacity="0.3" />
          <circle cx="425" cy="275" r="280" fill="none" stroke="#24293a" strokeWidth="1" strokeDasharray="5,5" opacity="0.2" />

          {/* Edges */}
          {edges.map((edge) => {
            const nodeA = nodes.find((n) => n.id === edge.source);
            const nodeB = nodes.find((n) => n.id === edge.target);
            if (!nodeA || !nodeB) return null;

            const isConnectedToActive =
              edge.source === selectedNodeId || edge.target === selectedNodeId;

            const strokeColor = isConnectedToActive ? "#e2b170" : "#414a66";
            const strokeWidth = isConnectedToActive
              ? Math.max(2, edge.score * 3.5)
              : Math.max(0.7, edge.score * 1.5);
            const strokeOpacity = isConnectedToActive ? 0.9 : 0.2;

            return (
              <g key={edge.id}>
                <line
                  x1={nodeA.x}
                  y1={nodeA.y}
                  x2={nodeB.x}
                  y2={nodeB.y}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeOpacity={strokeOpacity}
                  strokeDasharray={isConnectedToActive && edge.score > 0.6 ? "none" : "4,2"}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            const isConnected = connectedNodeIds.has(node.id);
            const cat = CATEGORY_CONFIG[node.category];
            const opacity = isSelected ? 1 : isConnected ? 0.95 : 0.22;
            const emoji = getEmoji(node.category);

            return (
              <g
                key={node.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectNode(node.id);
                }}
                className="cursor-pointer transition-all duration-200"
                opacity={opacity}
              >
                {/* Active halo */}
                {isSelected && (
                  <>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius + 12}
                      fill="none"
                      stroke="#e2b170"
                      strokeWidth="2"
                      strokeOpacity="0.8"
                      className="animate-pulse"
                    />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.radius + 20}
                      fill="none"
                      stroke="#e2b170"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                      strokeOpacity="0.4"
                    />
                  </>
                )}

                {/* Connected indicator ring */}
                {isConnected && !isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.radius + 4}
                    fill="none"
                    stroke={cat.color}
                    strokeWidth="1.5"
                    strokeOpacity="0.7"
                  />
                )}

                {/* Node fill */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill="#151822"
                  stroke={isSelected ? "#e2b170" : cat.color}
                  strokeWidth={isSelected ? 3 : 2}
                />

                {/* Center emoji */}
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fontSize={node.radius > 15 ? 12 : 10}
                  className="pointer-events-none select-none"
                >
                  {emoji}
                </text>

                {/* Text Label on selected or directly connected nodes */}
                {(isSelected || isConnected) && (
                  <text
                    x={node.x}
                    y={node.y + node.radius + 13}
                    textAnchor="middle"
                    fill={isSelected ? "#e2b170" : "#bcc3d6"}
                    fontSize={isSelected ? 11 : 9}
                    fontFamily="Inter, sans-serif"
                    fontWeight={isSelected ? 600 : 400}
                    className="pointer-events-none select-none"
                  >
                    {node.receipt.title.slice(0, 18)}
                    {node.receipt.title.length > 18 ? "..." : ""}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Bottom Legend */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none text-[10px] font-mono text-museum-400 bg-museum-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-museum-800">
          <span>Click any node to focus &amp; reveal relationship chains</span>
          <span className="text-gold hidden sm:inline">
            Drag to pan · Scroll to inspect
          </span>
        </div>
      </div>
    </div>
  );
};
