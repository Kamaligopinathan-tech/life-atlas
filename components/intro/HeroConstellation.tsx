"use client";

import React, { useState, useEffect, useRef } from "react";
import { Receipt } from "@/types/receipts";
import { CATEGORY_CONFIG, formatDate } from "@/lib/utils";

interface ConstellationNode {
  id: string;
  receipt: Receipt;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  categoryColor: string;
  icon: string;
}

interface HeroConstellationProps {
  receipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
}

export const HeroConstellation: React.FC<HeroConstellationProps> = ({
  receipts,
  onSelectReceipt,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<ConstellationNode | null>(null);
  const [nodes, setNodes] = useState<ConstellationNode[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize sample nodes representing diverse categories
  useEffect(() => {
    // Pick 18 representative receipts covering all 9 types
    const sampleReceipts = receipts.slice(0, 20);
    const initialNodes: ConstellationNode[] = sampleReceipts.map((r, i) => {
      const angle = (i / sampleReceipts.length) * 2 * Math.PI;
      const dist = 140 + (i % 3) * 60;
      return {
        id: r.id,
        receipt: r,
        x: 350 + Math.cos(angle) * dist + (Math.random() - 0.5) * 40,
        y: 240 + Math.sin(angle) * dist + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: r.importance >= 4 ? 18 : 14,
        categoryColor: CATEGORY_CONFIG[r.type].color,
        icon: CATEGORY_CONFIG[r.type].name.charAt(0),
      };
    });
    setNodes(initialNodes);
  }, [receipts]);

  // Gentle float animation loop
  useEffect(() => {
    let animId: number;

    const animate = () => {
      setNodes((prevNodes) =>
        prevNodes.map((node) => {
          let nx = node.x + node.vx;
          let ny = node.y + node.vy;

          // Boundary bouncing in 700x480 coordinate space
          if (nx < 40 || nx > 660) node.vx *= -1;
          if (ny < 40 || ny > 440) node.vy *= -1;

          // Gentle pull toward center
          const dx = 350 - nx;
          const dy = 240 - ny;
          node.vx += dx * 0.00005;
          node.vy += dy * 0.00005;

          // Mouse subtle repulsion/attraction if nearby
          if (mouseRef.current) {
            const mdx = mouseRef.current.x - nx;
            const mdy = mouseRef.current.y - ny;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mdist < 100 && mdist > 5) {
              nx += (mdx / mdist) * 0.4;
              ny += (mdy / mdist) * 0.4;
            }
          }

          return { ...node, x: nx, y: ny };
        })
      );
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = 700 / rect.width;
    const scaleY = 480 / rect.height;
    mouseRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = null;
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
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[7/4.8] max-w-2xl mx-auto rounded-2xl border border-museum-800/80 bg-gradient-to-b from-museum-950 via-museum-900 to-museum-950 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.6)]"
      aria-label="Interactive Constellation of Digital Life Receipts"
    >
      {/* Background ambient radial grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,177,112,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(#8e98b5 1px, transparent 1px), radial-gradient(#8e98b5 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundPosition: "0 0, 12px 12px",
        }}
      />

      {/* SVG Canvas for nodes & gravitational connection lines */}
      <svg
        viewBox="0 0 700 480"
        className="w-full h-full relative z-10"
      >
        {/* Draw subtle constellation lines between nearby nodes */}
        {nodes.map((nodeA, i) =>
          nodes.slice(i + 1).map((nodeB) => {
            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const isRelated =
              nodeA.receipt.relatedIds.includes(nodeB.receipt.id) ||
              nodeB.receipt.relatedIds.includes(nodeA.receipt.id);

            if (dist > 130 && !isRelated) return null;

            const opacity = isRelated
              ? Math.max(0.35, 1 - dist / 220)
              : Math.max(0.08, 1 - dist / 130) * 0.4;

            return (
              <line
                key={`${nodeA.id}-${nodeB.id}`}
                x1={nodeA.x}
                y1={nodeA.y}
                x2={nodeB.x}
                y2={nodeB.y}
                stroke={isRelated ? "#e2b170" : "#414a66"}
                strokeWidth={isRelated ? 1.5 : 0.7}
                strokeDasharray={isRelated ? undefined : "3,3"}
                strokeOpacity={opacity}
              />
            );
          })
        )}

        {/* Nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredNode?.id === node.id;
          const emoji = getEmoji(node.receipt.type);

          return (
            <g
              key={node.id}
              className="cursor-pointer transition-transform duration-150"
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onSelectReceipt(node.receipt)}
            >
              {/* Outer pulsing glow on hover */}
              {isHovered && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius + 10}
                  fill="none"
                  stroke={node.categoryColor}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  className="animate-pulse"
                />
              )}

              {/* Node body */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radius}
                fill="#151822"
                stroke={node.categoryColor}
                strokeWidth={isHovered ? "2.5" : "1.5"}
                className="transition-all"
              />

              {/* Icon / Emoji */}
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fontSize={node.radius > 15 ? "12" : "10"}
                className="select-none pointer-events-none"
              >
                {emoji}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover preview tooltip */}
      {hoveredNode && (
        <div
          className="absolute z-20 pointer-events-none max-w-xs bg-museum-900/95 border border-gold/40 rounded-xl p-3 shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-100"
          style={{
            left: `${Math.min(75, Math.max(10, (hoveredNode.x / 700) * 100))}%`,
            top: `${Math.min(70, Math.max(10, (hoveredNode.y / 480) * 100 + 4))}%`,
          }}
        >
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase mb-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: hoveredNode.categoryColor }}
            />
            <span style={{ color: hoveredNode.categoryColor }}>
              {CATEGORY_CONFIG[hoveredNode.receipt.type].name}
            </span>
            <span className="text-museum-500">·</span>
            <span className="text-museum-400">
              {formatDate(hoveredNode.receipt.date)}
            </span>
          </div>
          <h4 className="text-xs font-semibold text-museum-100 line-clamp-1">
            {hoveredNode.receipt.title}
          </h4>
          <p className="text-[11px] text-museum-300 mt-1 line-clamp-2 leading-relaxed">
            {hoveredNode.receipt.description}
          </p>
          <div className="mt-2 pt-1.5 border-t border-museum-800/80 flex items-center justify-between text-[10px] font-mono text-gold">
            <span>#{hoveredNode.receipt.theme}</span>
            <span>Click to view details →</span>
          </div>
        </div>
      )}

      {/* Bottom overlay badge */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none text-[10px] font-mono text-museum-400 bg-museum-950/70 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-museum-800/60">
        <span className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
          <span>Interactive Constellation</span>
        </span>
        <span className="hidden sm:inline">
          Hover over nodes to preview · Click to explore connections
        </span>
      </div>
    </div>
  );
};
