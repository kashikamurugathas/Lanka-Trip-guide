export type DestinationCategory =
  | 'Cultural & Heritage'
  | 'Hill Country & Nature'
  | 'Beaches & Coastal'
  | 'Wildlife & Safari'
  | 'Adventure & Hiking';

export type Province =
  | 'Central'
  | 'Southern'
  | 'Western'
  | 'Eastern'
  | 'Northern'
  | 'North Central'
  | 'Uva'
  | 'Sabaragamuwa'
  | 'North Western';

export interface Attraction {
  title: string;
  description: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  localNameSinhala?: string;
  localNameTamil?: string;
  province: Province;
  region: string;
  category: DestinationCategory;
  summary: string;
  description: string;
  coverImage: string;
  gallery: string[];
  attractions: Attraction[];
  thingsToDo: string[];
  bestTimeToVisit: string;
  seasonCaveats: string;
  visitDuration: string;
  estimatedBudgetLkr: {
    budgetDaily: number;
    midRangeDaily: number;
    note: string;
  };
  suggestedActivities: string[];
  travelTips: string[];
  accessibilityTransport: string;
  nearbySlugs: string[];
  relatedPackageSlugs: string[];
  isFeatured?: boolean;
}

export interface TourPackageDay {
  dayNumber: number;
  title: string;
  places: string[];
  activities: string[];
  meals: string;
  overnightStay: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  name: string;
  duration: string;
  durationDays: number;
  estimatedPriceLkr: number;
  coverImage: string;
  destinations: string[];
  destinationSlugs: string[];
  highlights: string[];
  mainActivities: string[];
  overview: string;
  itinerary: TourPackageDay[];
  inclusions: string[];
  exclusions: string[];
  sampleAccommodation: string;
  travelRecommendations: string[];
  isPopular?: boolean;
}

export type AccommodationType =
  | 'Luxury Resort'
  | 'Boutique Hotel'
  | 'Mid-range Hotel'
  | 'Eco Lodge'
  | 'Guesthouse & Homestay'
  | 'Budget Stay';

export interface RoomType {
  name: string;
  occupancy: string;
  pricePerNightLkr: number;
  features: string[];
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  type: AccommodationType;
  region: string;
  province: Province;
  location: string;
  pricePerNightLkr: number;
  rating: number;
  image: string;
  gallery: string[];
  description: string;
  facilities: string[];
  roomTypes: RoomType[];
  nearbyAttractions: string[];
  isFeatured?: boolean;
}

export interface TravelGuideSection {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  content: {
    subtitle?: string;
    paragraphs: string[];
    bulletPoints?: { label: string; text: string }[];
    tables?: { headers: string[]; rows: string[][] };
    highlights?: string[];
  };
}

export interface ItineraryItem {
  id: string;
  destinationSlug: string;
  destinationName: string;
  days: number;
  notes: string;
  estimatedDailyBudgetLkr: number;
}

export interface SavedTripPlan {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  travelersCount: number;
  totalBudgetLkr: number;
  items: ItineraryItem[];
  generalNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface TourEnquiry {
  id: string;
  packageSlug: string;
  packageName: string;
  fullName: string;
  email: string;
  phone?: string;
  travelDate: string;
  travelersCount: number;
  notes?: string;
  submittedAt: string;
}

export interface HotelEnquiry {
  id: string;
  hotelSlug: string;
  hotelName: string;
  fullName: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  roomType: string;
  specialRequests?: string;
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
}
