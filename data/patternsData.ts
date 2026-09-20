import { LifePattern } from "@/types/receipts";

export const LIFE_PATTERNS: LifePattern[] = [
  {
    id: "pattern_01",
    title: "Late-Night Creative Solitude",
    explanation:
      "You frequently listen to ambient music and author long-form philosophical or engineering notes between 11:00 PM and 2:30 AM. 76% of your breakthrough ideas were documented during this quiet nocturnal window.",
    supportingReceiptIds: ["music_01", "note_01", "search_01", "note_06", "music_06", "note_11", "note_13"],
    categories: ["note", "music", "search"],
    confidence: 94,
    metric: "76% of notes logged between 23:00 and 03:00",
    detectedContext: "Correlation detected between low external stimuli (midnight) and high cognitive output.",
    chartData: [
      { label: "00:00", value: 16, baseline: 4 },
      { label: "02:00", value: 24, baseline: 2 },
      { label: "04:00", value: 8, baseline: 1 },
      { label: "08:00", value: 5, baseline: 6 },
      { label: "12:00", value: 10, baseline: 12 },
      { label: "16:00", value: 14, baseline: 15 },
      { label: "20:00", value: 18, baseline: 14 },
      { label: "22:00", value: 26, baseline: 10 },
    ],
  },
  {
    id: "pattern_02",
    title: "Weekend Coastal & Urban Explorer",
    explanation:
      "Your location receipts spike significantly outside your home neighborhood on Saturday and Sunday afternoons. 88% of your nature field trips and scenic viewpoints occurred during weekend afternoon windows.",
    supportingReceiptIds: ["place_01", "place_05", "photo_06", "place_06", "event_09", "place_18"],
    categories: ["place", "photo", "search"],
    confidence: 89,
    metric: "88% of trips beyond city bounds happen on Sat/Sun",
    detectedContext: "High geographic displacement observed on weekends, particularly toward coastal promontories.",
    chartData: [
      { label: "Mon", value: 4, baseline: 8 },
      { label: "Tue", value: 5, baseline: 8 },
      { label: "Wed", value: 6, baseline: 8 },
      { label: "Thu", value: 7, baseline: 8 },
      { label: "Fri", value: 12, baseline: 10 },
      { label: "Sat", value: 34, baseline: 14 },
      { label: "Sun", value: 28, baseline: 12 },
    ],
  },
  {
    id: "pattern_03",
    title: "New Places, New Visual Memories",
    explanation:
      "Your camera shutter clicks and photo receipts surge 4.2x within 45 minutes of checking into an unfamiliar or first-visit location. Visual curiosity peaks when navigating novel architectural spaces.",
    supportingReceiptIds: ["place_04", "photo_04", "place_05", "photo_06", "place_07", "photo_08", "photo_12"],
    categories: ["place", "photo"],
    confidence: 92,
    metric: "4.2x higher photo frequency at new postal codes",
    detectedContext: "Spatial unfamiliarity triggers heightened photographic and visual documentation instincts.",
    chartData: [
      { label: "First Visit", value: 84, baseline: 20 },
      { label: "2nd-5th Visit", value: 36, baseline: 25 },
      { label: "Familiar Hub", value: 12, baseline: 30 },
      { label: "Home Studio", value: 8, baseline: 35 },
    ],
  },
  {
    id: "pattern_04",
    title: "Music Follows Physical Movement",
    explanation:
      "Transit receipts (flights, suburban trains, Uber rides, ferry crossings) are followed by a new album listening session within 15 minutes in 83% of cases. Headphone music acts as your sensory transition chamber.",
    supportingReceiptIds: ["place_03", "music_04", "purchase_04", "photo_03", "purchase_23", "music_16"],
    categories: ["music", "purchase", "place"],
    confidence: 86,
    metric: "83% transit events coupled with new track start within 15m",
    detectedContext: "Acoustic buffering used systematically to navigate high-density transit hubs.",
    chartData: [
      { label: "< 5 mins", value: 48, baseline: 10 },
      { label: "5-15 mins", value: 35, baseline: 15 },
      { label: "15-30 mins", value: 12, baseline: 20 },
      { label: "> 30 mins", value: 5, baseline: 55 },
    ],
  },
  {
    id: "pattern_05",
    title: "Curiosity Precedes Tangible Commitment",
    explanation:
      "Detailed technical search queries (acoustics, hardware, venue rentals) reliably precede substantial financial commitments or lease contracts within 48 to 72 hours. Research is your runway for conviction.",
    supportingReceiptIds: ["search_01", "purchase_01", "search_03", "purchase_03", "search_06", "event_03", "purchase_08", "search_07", "purchase_11"],
    categories: ["search", "purchase", "event"],
    confidence: 96,
    metric: "96% of major purchases (>€50) had 3+ prior research queries",
    detectedContext: "Systematic inquiry precedes financial and spatial resource allocation.",
    chartData: [
      { label: "Search Stage", value: 92, baseline: 50 },
      { label: "24h Later", value: 44, baseline: 30 },
      { label: "48h Later (Buy)", value: 78, baseline: 25 },
      { label: "Post-Purchase", value: 14, baseline: 40 },
    ],
  },
  {
    id: "pattern_06",
    title: "Social Momentum & Table Gatherings",
    explanation:
      "Spikes in outbound message density across Signal and WhatsApp reliably culminate in shared evening dinners or courtyard celebrations within 3 to 6 hours. Words transform into breaking bread.",
    supportingReceiptIds: ["message_03", "purchase_05", "message_07", "purchase_09", "message_08", "event_05", "message_11", "purchase_18", "purchase_29"],
    categories: ["message", "purchase", "event"],
    confidence: 91,
    metric: "78% of dining receipts accompanied by pre-meal message flurry",
    detectedContext: "Digital dialogue functions as social gravitational pull toward shared physical tables.",
    chartData: [
      { label: "Morning Chat", value: 20, baseline: 15 },
      { label: "Afternoon Surge", value: 65, baseline: 22 },
      { label: "Evening Meal", value: 88, baseline: 28 },
      { label: "Night Closure", value: 30, baseline: 18 },
    ],
  },
];
