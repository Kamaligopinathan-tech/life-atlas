export type ReceiptType =
  | 'music'
  | 'movie'
  | 'place'
  | 'purchase'
  | 'photo'
  | 'message'
  | 'search'
  | 'event'
  | 'note';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'late_night';

export type MoodTheme =
  | 'Exploration'
  | 'Connection'
  | 'Creativity'
  | 'Routine'
  | 'Celebration'
  | 'Change'
  | 'Discovery';

export type LocationCategory = 'home' | 'work' | 'city' | 'travel';

export interface ReceiptLocation {
  name: string;
  city: string;
  area?: string;
  category: LocationCategory;
  coordinates?: [number, number];
}

export interface BaseMetadata {
  [key: string]: any;
}

export interface MusicMetadata extends BaseMetadata {
  artist: string;
  album?: string;
  duration: string;
  bpm?: number;
  mood?: string;
}

export interface MovieMetadata extends BaseMetadata {
  director: string;
  runtime: string;
  platform?: string;
  rating?: string;
}

export interface PlaceMetadata extends BaseMetadata {
  placeType: string;
  address: string;
  dwellTimeMinutes: number;
  isFirstVisit: boolean;
}

export interface PurchaseMetadata extends BaseMetadata {
  amount: number;
  currency: string;
  merchant: string;
  itemCategory: string;
}

export interface PhotoMetadata extends BaseMetadata {
  camera: string;
  focalLength: string;
  caption: string;
  aspectRatio: '1:1' | '4:3' | '16:9' | '3:2';
  colorPalette?: string[];
}

export interface MessageMetadata extends BaseMetadata {
  recipient: string;
  platform: string;
  sentiment: 'reflective' | 'excited' | 'tender' | 'urgent' | 'casual';
  wordCount: number;
}

export interface SearchMetadata extends BaseMetadata {
  query: string;
  engine: string;
  resultClicked?: string;
  searchType: 'informational' | 'exploratory' | 'transactional';
}

export interface EventMetadata extends BaseMetadata {
  attendeesCount: number;
  venue: string;
  role: 'attendee' | 'host' | 'speaker' | 'performer';
}

export interface NoteMetadata extends BaseMetadata {
  notebook: string;
  wordCount: number;
  mood: string;
  excerpt: string;
}

export interface Receipt {
  id: string;
  type: ReceiptType;
  title: string;
  description: string;
  timestamp: string; // ISO 8601 string
  date: string; // YYYY-MM-DD
  timeOfDay: TimeOfDay;
  location: ReceiptLocation;
  tags: string[];
  theme: MoodTheme;
  importance: 1 | 2 | 3 | 4 | 5;
  metadata: BaseMetadata;
  relatedIds: string[];
  editorialWhy: string;
}

export interface ConnectionScore {
  targetId: string;
  score: number; // 0.0 to 1.0
  strength: 'weak' | 'moderate' | 'strong' | 'profound';
  reasons: string[];
  sharedThemes: string[];
  sharedTags: string[];
  timeGapHours?: number;
}

export interface ConnectedStoryChain {
  id: string;
  title: string;
  subtitle: string;
  receiptIds: string[];
  narrative: string;
  theme: MoodTheme;
  dateRange: string;
}

export interface LifeChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  dateRange: string;
  narrative: string;
  dominantCategories: ReceiptType[];
  highlightReceiptIds: string[];
  keyInsight: string;
  quote: string;
  statCallout: string;
}

export interface LifePattern {
  id: string;
  title: string;
  explanation: string;
  supportingReceiptIds: string[];
  categories: ReceiptType[];
  confidence: number;
  metric: string;
  detectedContext: string;
  chartData: Array<{ label: string; value: number; baseline?: number }>;
}

export type ViewMode = 'grid' | 'stream' | 'cluster';

export type ActiveTab =
  | 'intro'
  | 'overview'
  | 'explore'
  | 'connections'
  | 'patterns'
  | 'chapters'
  | 'story'
  | 'about';
