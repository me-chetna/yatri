import { Attraction, STATES, State, Place } from "../data/trip-data";

export type Hotel = {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  pricePerNight: number;
  vibe: string;
  image: string;
};

export const HOTELS: Hotel[] = [
  { id: "h1", name: "Taj Lake Palace", city: "Udaipur", state: "Rajasthan", rating: 4.9, pricePerNight: 42000, vibe: "Floating marble heritage", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=70" },
  { id: "h2", name: "The Oberoi Amarvilas", city: "Agra", state: "Uttar Pradesh", rating: 4.9, pricePerNight: 38000, vibe: "Taj views from every room", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=70" },
  { id: "h3", name: "Kumarakom Lake Resort", city: "Alleppey", state: "Kerala", rating: 4.8, pricePerNight: 22000, vibe: "Backwater villas & ayurveda", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=70" },
  { id: "h4", name: "Wildflower Hall", city: "Shimla", state: "Himachal Pradesh", rating: 4.8, pricePerNight: 35000, vibe: "Himalayan cedar retreat", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=70" },
  { id: "h5", name: "Taj Fort Aguada", city: "North Goa", state: "Goa", rating: 4.7, pricePerNight: 18000, vibe: "Cliffside Portuguese fort", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=70" },
  { id: "h6", name: "BrijRama Palace", city: "Varanasi", state: "Uttar Pradesh", rating: 4.7, pricePerNight: 26000, vibe: "On the ghats, by the Ganga", image: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200&q=70" },
];

export type AITip = {
  id: string;
  icon: string;
  title: string;
  body: string;
  tag: "weather" | "crowd" | "season" | "vibe";
};

// Light "AI" — varies hourly by date so the dashboard feels alive
export function getAITips(): AITip[] {
  const month = new Date().getMonth(); // 0–11
  const hour = new Date().getHours();
  const tips: AITip[] = [];

  if (month >= 10 || month <= 1) {
    tips.push({ id: "t1", icon: "❄️", tag: "weather", title: "Crisp 18°C across Rajasthan", body: "Perfect window for the desert — pair Jaisalmer dunes with an Udaipur sunset boat ride." });
    tips.push({ id: "t2", icon: "🌤️", tag: "season", title: "Kerala backwaters are calm", body: "Post-monsoon greens are at their peak. Houseboats book out 2 weeks ahead." });
  } else if (month >= 2 && month <= 4) {
    tips.push({ id: "t1", icon: "🌸", tag: "season", title: "Spring in the hills", body: "Manali & Munnar wildflowers are blooming. Go before May heat sets in." });
    tips.push({ id: "t2", icon: "🌡️", tag: "weather", title: "Plains heating up", body: "Visit the Taj before 8am — golden marble, half the crowd." });
  } else if (month >= 5 && month <= 8) {
    tips.push({ id: "t1", icon: "🌧️", tag: "weather", title: "Monsoon magic in the Ghats", body: "Coorg & Munnar waterfalls are roaring. Pack a light shell, not an umbrella." });
    tips.push({ id: "t2", icon: "🏝️", tag: "vibe", title: "Goa is empty & cheap", body: "Off-season rates drop 60%. Shacks closed, but cafés & forts open." });
  } else {
    tips.push({ id: "t1", icon: "🪔", tag: "season", title: "Festival corridor", body: "Varanasi Dev Deepawali + Pushkar Mela fall this month — book trains early." });
    tips.push({ id: "t2", icon: "🌤️", tag: "weather", title: "Cool & clear everywhere", body: "Best month of the year for North India. All routes open, low humidity." });
  }

  tips.push(
    hour < 11
      ? { id: "t3", icon: "☕", tag: "vibe", title: "Morning person?", body: "Start with the ghats of Varanasi or Hawa Mahal at first light — zero queues." }
      : hour < 18
        ? { id: "t3", icon: "👥", tag: "crowd", title: "Skip the midday rush", body: "Forts get packed 12–3pm. Swap to a market or long lunch, return at golden hour." }
        : { id: "t3", icon: "🌙", tag: "vibe", title: "Night wanderers", body: "Mysore Palace lights up Sundays. Old Delhi food walks start 7pm sharp." },
  );

  tips.push({ id: "t4", icon: "💸", tag: "vibe", title: "Smart spend this week", body: "Domestic flights to Goa & Kochi are 32% below average — lock them in." });
  return tips;
}

// All POIs flattened with parent context for cross-cutting lists
export type EnrichedAttraction = Attraction & { stateSlug: string; stateName: string; placeSlug: string; placeName: string };
export const ALL_ATTRACTIONS: EnrichedAttraction[] = STATES.flatMap((s) =>
  s.places.flatMap((pl) =>
    pl.attractions.map((attraction) => ({
      ...attraction,
      stateSlug: s.id,
      stateName: s.name,
      placeSlug: pl.id,
      placeName: pl.name,
    })),
  ),
);

export const topByKind = (kind: Attraction["type"], n = 10) =>
  ALL_ATTRACTIONS.filter((p) => p.type === kind).sort((a, b) => b.rating - a.rating).slice(0, n);

export const topRatedPlaces = (n = 8) =>
  ALL_ATTRACTIONS.filter((p) => p.type === "attraction").sort((a, b) => b.rating - a.rating).slice(0, n);
