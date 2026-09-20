import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReceiptType, TimeOfDay, MoodTheme } from "@/types/receipts";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_CONFIG: Record<
  ReceiptType,
  {
    name: string;
    iconName: string;
    color: string;
    bgMuted: string;
    border: string;
    glow: string;
    textColor: string;
    description: string;
  }
> = {
  music: {
    name: "Music",
    iconName: "Music",
    color: "#8b5cf6",
    bgMuted: "rgba(139, 92, 246, 0.12)",
    border: "rgba(139, 92, 246, 0.35)",
    glow: "rgba(139, 92, 246, 0.4)",
    textColor: "text-purple-400",
    description: "Tracks, albums, listening sessions, and late-night loops",
  },
  movie: {
    name: "Movies & Cinema",
    iconName: "Film",
    color: "#ec4899",
    bgMuted: "rgba(236, 72, 153, 0.12)",
    border: "rgba(236, 72, 153, 0.35)",
    glow: "rgba(236, 72, 153, 0.4)",
    textColor: "text-pink-400",
    description: "Films watched, theatre visits, and midnight cinema screenings",
  },
  place: {
    name: "Places",
    iconName: "MapPin",
    color: "#10b981",
    bgMuted: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.35)",
    glow: "rgba(16, 185, 129, 0.4)",
    textColor: "text-emerald-400",
    description: "Locations visited, studios, coastal overlooks, and cafes",
  },
  purchase: {
    name: "Purchases",
    iconName: "ShoppingBag",
    color: "#f59e0b",
    bgMuted: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.35)",
    glow: "rgba(245, 158, 11, 0.4)",
    textColor: "text-amber-400",
    description: "Books, hardware, espresso, tickets, and travel transit",
  },
  photo: {
    name: "Photos",
    iconName: "Camera",
    color: "#06b6d4",
    bgMuted: "rgba(6, 182, 212, 0.12)",
    border: "rgba(6, 182, 212, 0.35)",
    glow: "rgba(6, 182, 212, 0.4)",
    textColor: "text-cyan-400",
    description: "Visual frames, 35mm captures, studio sketches, and moments",
  },
  message: {
    name: "Messages",
    iconName: "MessageSquare",
    color: "#3b82f6",
    bgMuted: "rgba(59, 130, 246, 0.12)",
    border: "rgba(59, 130, 246, 0.35)",
    glow: "rgba(59, 130, 246, 0.4)",
    textColor: "text-blue-400",
    description: "Conversations, shared excitement, midnight texts, and voice notes",
  },
  search: {
    name: "Searches",
    iconName: "Search",
    color: "#6366f1",
    bgMuted: "rgba(99, 102, 241, 0.12)",
    border: "rgba(99, 102, 241, 0.35)",
    glow: "rgba(99, 102, 241, 0.4)",
    textColor: "text-indigo-400",
    description: "Curiosities, technical inquiries, directions, and late-night rabbit holes",
  },
  event: {
    name: "Events",
    iconName: "Calendar",
    color: "#f43f5e",
    bgMuted: "rgba(244, 63, 94, 0.12)",
    border: "rgba(244, 63, 94, 0.35)",
    glow: "rgba(244, 63, 94, 0.4)",
    textColor: "text-rose-400",
    description: "Exhibitions, reunions, project launches, concerts, and gatherings",
  },
  note: {
    name: "Notes",
    iconName: "FileText",
    color: "#eab308",
    bgMuted: "rgba(234, 179, 8, 0.12)",
    border: "rgba(234, 179, 8, 0.35)",
    glow: "rgba(234, 179, 8, 0.4)",
    textColor: "text-yellow-400",
    description: "Personal journals, architectural ideas, raw reflections, and drafts",
  },
};

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

export function formatTime(timestamp: string): string {
  try {
    const d = new Date(timestamp);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

export function formatDateTime(timestamp: string): string {
  try {
    const d = new Date(timestamp);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return timestamp;
  }
}

export function getTimeOfDayBadge(timeOfDay: TimeOfDay): { label: string; icon: string } {
  switch (timeOfDay) {
    case "morning":
      return { label: "Morning", icon: "Sunrise" };
    case "afternoon":
      return { label: "Afternoon", icon: "Sun" };
    case "evening":
      return { label: "Evening", icon: "Sunset" };
    case "late_night":
      return { label: "Late Night", icon: "Moon" };
  }
}

export function getThemeColor(theme: MoodTheme): string {
  switch (theme) {
    case "Exploration":
      return "#10b981";
    case "Connection":
      return "#3b82f6";
    case "Creativity":
      return "#8b5cf6";
    case "Routine":
      return "#64748b";
    case "Celebration":
      return "#f43f5e";
    case "Change":
      return "#f59e0b";
    case "Discovery":
      return "#06b6d4";
    default:
      return "#94a3b8";
  }
}
