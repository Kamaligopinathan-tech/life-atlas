"use client";

import React from "react";
import { X, Sparkles, Cpu, Layers, ShieldCheck, Heart } from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="About Life Atlas"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-museum-900 border border-museum-750 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative border-b border-museum-800 px-6 py-5 flex items-center justify-between bg-gradient-to-r from-museum-900 via-museum-850 to-museum-900">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-serif font-bold text-lg shadow-[0_0_15px_rgba(226,177,112,0.2)]">
              LA
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-museum-100">
                LIFE ATLAS
              </h2>
              <p className="text-xs font-mono text-gold tracking-wider uppercase">
                &ldquo;Every moment leaves a trace. Connect the traces. Discover the story.&rdquo;
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-museum-400 hover:text-museum-100 hover:bg-museum-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-sm text-museum-300 leading-relaxed font-sans">
          {/* Mission */}
          <div className="p-4 rounded-xl bg-museum-950/60 border border-museum-800">
            <h3 className="font-serif font-semibold text-base text-museum-100 mb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>The WebRush Challenge: Your Life, In Receipts</span>
            </h3>
            <p className="text-xs text-museum-300 mb-3">
              Modern digital life is fragmented across dozens of disconnected logs: music tracks played at 2 AM, grocery slips, tram tickets, photo EXIF stamps, unpolished voice notes, and midnight search queries.
            </p>
            <p className="text-xs text-museum-300">
              <strong>LIFE ATLAS</strong> rejects the premise of generic analytics dashboards or linear calendars. Instead, it operates as an interactive digital museum and personal narrative archive that elevates:
            </p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono font-bold">
              <div className="p-2 rounded bg-museum-900 border border-museum-800 text-museum-400">
                RAW DATA
              </div>
              <div className="p-2 rounded bg-museum-900 border border-museum-800 text-indigo-400">
                → INSIGHTS
              </div>
              <div className="p-2 rounded bg-museum-900 border border-museum-800 text-gold">
                → CONNECTIONS
              </div>
              <div className="p-2 rounded bg-museum-900 border border-museum-800 text-emerald-400">
                → STORY
              </div>
            </div>
          </div>

          {/* Connection Engine Architecture */}
          <div>
            <h3 className="font-serif font-semibold text-base text-museum-100 mb-2 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-gold" />
              <span>100% Client-Side Deterministic Connection Engine</span>
            </h3>
            <p className="text-xs text-museum-400 mb-3">
              In accordance with hackathon constraints, Life Atlas executes zero server calls and relies on no cloud AI APIs. Every relationship is dynamically computed in your browser using multi-factor deterministic scoring:
            </p>
            <ul className="space-y-2 text-xs text-museum-300 list-disc list-inside">
              <li>
                <strong className="text-museum-100">Temporal Proximity:</strong> Same-hour moments receive strong causality weighting (+0.40); same 4-hour time block receives (+0.30).
              </li>
              <li>
                <strong className="text-museum-100">Spatial Proximity:</strong> Identical venue check-ins receive (+0.35); shared neighborhoods receive (+0.22).
              </li>
              <li>
                <strong className="text-museum-100">Semantic & Tag Overlap:</strong> Intersecting tags scale (+0.08 per match), reflecting thematic alignment.
              </li>
              <li>
                <strong className="text-museum-100">Cross-Category Causal Affinities:</strong> Natural cause-and-effect pairs (e.g., <em>Search → Purchase</em>, <em>Place → Photo → Music</em>, <em>Music → Nocturnal Note</em>) are boosted (+0.12).
              </li>
            </ul>
          </div>

          {/* The Protagonist Narrative */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-museum-950 via-museum-900 to-museum-950 border border-museum-800">
            <h3 className="font-serif font-semibold text-base text-gold mb-1 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-gold" />
              <span>The Persona: Alex & The Summer of Resonant Geometry</span>
            </h3>
            <p className="text-xs text-museum-300">
              The dataset portrays six months (March to August 2024) in the life of Alex, a sound artist and creative developer who walked away from agency consulting to build an acoustic and laser art installation in Lisbon&apos;s industrial Marvila district. What starts as isolated receipts in March becomes an unforgettable communal experience in August.
            </p>
          </div>

          {/* Hackathon Specs */}
          <div className="pt-2 border-t border-museum-800 flex flex-wrap items-center justify-between text-xs text-museum-500 font-mono gap-2">
            <span>Built with Next.js, TypeScript, Tailwind CSS, Lucide & Recharts</span>
            <span className="flex items-center space-x-1 text-gold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-backend · Client-side runtime</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
