export type Itinerary = {
  stateSlug: string;
  placeSlug: string;
  poiIds: string[]; // ordered
};

export type SavedTrip = Itinerary & {
  id: string;
  title: string;
  savedAt: number;
};

const ITIN_KEY = (s: string, p: string) => `itin:${s}:${p}`;
const TRIPS_KEY = "savedTrips";

export const loadItinerary = (s: string, p: string): string[] | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ITIN_KEY(s, p));
  return raw ? JSON.parse(raw) : null;
};

export const saveItinerary = (s: string, p: string, ids: string[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ITIN_KEY(s, p), JSON.stringify(ids));
};

export const loadTrips = (): SavedTrip[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(TRIPS_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const saveTrip = (t: Omit<SavedTrip, "id" | "savedAt">) => {
  const trips = loadTrips();
  const full: SavedTrip = { 
    ...t, 
    id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15), 
    savedAt: Date.now() 
  };
  trips.unshift(full);
  if (typeof window !== "undefined") {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  }
  return full;
};

export const deleteTrip = (id: string) => {
  const trips = loadTrips().filter(t => t.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(TRIPS_KEY, JSON.stringify(trips));
  }
};

export const distanceKm = (a: [number, number], b: [number, number]) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a[0] * Math.PI) / 180) *
      Math.cos((b[0] * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};