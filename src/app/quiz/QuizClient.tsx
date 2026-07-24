'use client';

import { useState } from "react";
import { Compass, RotateCcw, ArrowRight, Sparkles, MapPin, IndianRupee, Calendar } from "lucide-react";

type Option = {
  label: string;
  value: string;
  emoji: string;
};

type Question = {
  id: number;
  text: string;
  options: Option[];
};

interface Destination {
  id: string;
  name: string;
  state: string;
  avgBudgetPerDayINR: number;
  cheapestSeason: string;
  tags: {
    climate: string;
    terrain: string;
    activity: string;
    food: string;
    vibe: string;
    stay: string;
  };
  description: string;
  tagTitle: string;
  bg: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What's your ideal climate vibe?",
    options: [
      { label: "Warm & Sunny", value: "warm", emoji: "☀️" },
      { label: "Cool & Snowy", value: "cold", emoji: "❄️" },
      { label: "Tropical & Rainy", value: "tropical", emoji: "🌧️" }
    ]
  },
  {
    id: 2,
    text: "Choose your primary terrain escape:",
    options: [
      { label: "Golden Beaches", value: "beach", emoji: "🏖️" },
      { label: "Majestic Mountains", value: "mountain", emoji: "🏔️" },
      { label: "Historic Ancient Cities", value: "history", emoji: "🏛️" }
    ]
  },
  {
    id: 3,
    text: "How do you prefer to spend your days?",
    options: [
      { label: "Thrilling Adventures", value: "adventure", emoji: "🪂" },
      { label: "Relaxing & Unwinding", value: "relaxation", emoji: "🧘🏽‍♂️" },
      { label: "Exploring Local Culture", value: "culture", emoji: "🎨" }
    ]
  },
  {
    id: 4,
    text: "What kind of food are you tracking down?",
    options: [
      { label: "Spicy Street Markets", value: "spicy", emoji: "🌶️" },
      { label: "Fresh Seafood by the Coast", value: "seafood", emoji: "🦞" },
      { label: "Hearty Mountain Stews", value: "hearty", emoji: "🍲" }
    ]
  },
  {
    id: 5,
    text: "Who is accompanying you on this voyage?",
    options: [
      { label: "Solo Backpacking", value: "solo", emoji: "🎒" },
      { label: "Romantic Getaway", value: "romantic", emoji: "👩‍❤️‍👨" },
      { label: "Family Holiday", value: "family", emoji: "👨‍👩‍👧‍👦" }
    ]
  },
  {
    id: 6,
    text: "What's your preferred accommodation style?",
    options: [
      { label: "Luxury Heritage Resort", value: "luxury", emoji: "🏰" },
      { label: "Cozy Wooden Cabin", value: "cabin", emoji: "🏡" },
      { label: "Vibrant Social Hostel", value: "hostel", emoji: "🏢" }
    ]
  },
  {
    id: 7,
    text: "Pick an evening activity timeline:",
    options: [
      { label: "Stargazing by a Campfire", value: "stars", emoji: "🌌" },
      { label: "Bustling Night Clubs", value: "nightlife", emoji: "🪩" },
      { label: "Traditional Dance Showcase", value: "dance", emoji: "💃🏽" }
    ]
  },
  {
    id: 8,
    text: "Which historical element appeals to you most?",
    options: [
      { label: "Lost Jungle Ruins", value: "ruins", emoji: "🗿" },
      { label: "Royal Forts & Palaces", value: "palaces", emoji: "🕌" },
      { label: "Mid-century Vintage Towns", value: "vintage", emoji: "🚂" }
    ]
  },
  {
    id: 9,
    text: "What pace suits your itinerary?",
    options: [
      { label: "Fast & Packed Full", value: "fast", emoji: "⚡" },
      { label: "Slow, Mindful & Slow", value: "slow", emoji: "🍃" },
      { label: "Balanced day-by-day", value: "balanced", emoji: "⚖️" }
    ]
  },
  {
    id: 10,
    text: "Finally, how do you want to document your trip?",
    options: [
      { label: "Cinematic Drone Videos", value: "video", emoji: "🛸" },
      { label: "A Hidden Written Journal", value: "journal", emoji: "📓" },
      { label: "Just keeping it in memory", value: "memory", emoji: "🧠" }
    ]
  }
];

const ALL_INDIAN_DESTINATIONS: Destination[] = [
  // NORTH INDIA
  {
    id: "kasol-hp",
    name: "Kasol & Parvati Valley",
    state: "Himachal Pradesh",
    avgBudgetPerDayINR: 900,
    cheapestSeason: "March - May",
    tags: { climate: "cold", terrain: "mountain", activity: "adventure", food: "hearty", vibe: "solo", stay: "hostel" },
    description: "Pine-forested valleys, backpacker riverside hostels, and picturesque Himalayan trails at unbeatable prices.",
    tagTitle: "Alpine Nomad 🏔️",
    bg: "from-sky-500/20 via-blue-500/10 to-transparent border-sky-300 dark:border-sky-900/50 text-sky-950 dark:text-sky-200"
  },
  {
    id: "mcleodganj-hp",
    name: "Dharamshala & Bir Billing",
    state: "Himachal Pradesh",
    avgBudgetPerDayINR: 1100,
    cheapestSeason: "March - June",
    tags: { climate: "cold", terrain: "mountain", activity: "adventure", food: "hearty", vibe: "solo", stay: "hostel" },
    description: "Tibetan culture, world-famous paragliding spots, and budget-friendly hillside cafes.",
    tagTitle: "Sky Explorer 🪂",
    bg: "from-sky-500/20 via-blue-500/10 to-transparent border-sky-300 dark:border-sky-900/50 text-sky-950 dark:text-sky-200"
  },
  {
    id: "rishikesh-uk",
    name: "Rishikesh & Lansdowne",
    state: "Uttarakhand",
    avgBudgetPerDayINR: 850,
    cheapestSeason: "September - November",
    tags: { climate: "cold", terrain: "mountain", activity: "adventure", food: "spicy", vibe: "solo", stay: "hostel" },
    description: "Yoga capitals, affordable Ganges river rafting camps, and tranquil pine forest trails.",
    tagTitle: "Spiritual Adventurer 🧘🏽‍♂️",
    bg: "from-indigo-500/20 via-blue-500/10 to-transparent border-indigo-300 dark:border-indigo-900/50 text-indigo-950 dark:text-indigo-200"
  },
  {
    id: "pahalgam-jk",
    name: "Pahalgam & Aru Valley",
    state: "Jammu & Kashmir",
    avgBudgetPerDayINR: 1600,
    cheapestSeason: "April - June",
    tags: { climate: "cold", terrain: "mountain", activity: "relaxation", food: "hearty", vibe: "romantic", stay: "cabin" },
    description: "Lush alpine meadows, crystal-clear mountain streams, and cozy wooden homestays.",
    tagTitle: "Valley Wanderer 🌲",
    bg: "from-blue-500/20 via-cyan-500/10 to-transparent border-blue-300 dark:border-blue-900/50 text-blue-950 dark:text-blue-200"
  },
  {
    id: "leh-ladakh",
    name: "Leh & Nubra Valley",
    state: "Ladakh",
    avgBudgetPerDayINR: 2000,
    cheapestSeason: "May - July",
    tags: { climate: "cold", terrain: "mountain", activity: "adventure", food: "hearty", vibe: "solo", stay: "hostel" },
    description: "High-altitude cold deserts, ancient monasteries, and breathtaking mountain passes.",
    tagTitle: "High Pass Voyager 🚵🏽",
    bg: "from-slate-500/20 via-sky-500/10 to-transparent border-slate-300 dark:border-slate-800 text-slate-950 dark:text-slate-200"
  },

  // WEST INDIA
  {
    id: "pushkar-rj",
    name: "Pushkar & Bundi",
    state: "Rajasthan",
    avgBudgetPerDayINR: 800,
    cheapestSeason: "July - October",
    tags: { climate: "warm", terrain: "history", activity: "culture", food: "spicy", vibe: "solo", stay: "hostel" },
    description: "Sacred lake ghats, royal stepwells, and ultra-cheap heritage guesthouses.",
    tagTitle: "Heritage Seeker 📜",
    bg: "from-amber-500/20 via-orange-500/10 to-transparent border-amber-300 dark:border-amber-900/50 text-amber-900 dark:text-amber-200"
  },
  {
    id: "jaisalmer-rj",
    name: "Jaisalmer Golden Fort",
    state: "Rajasthan",
    avgBudgetPerDayINR: 1100,
    cheapestSeason: "October - March",
    tags: { climate: "warm", terrain: "history", activity: "culture", food: "spicy", vibe: "family", stay: "hostel" },
    description: "Living sandstone fort, desert dunes, and vibrant folk cultural showcases.",
    tagTitle: "Desert Monarch 🏰",
    bg: "from-amber-500/20 via-orange-500/10 to-transparent border-amber-300 dark:border-amber-900/50 text-amber-900 dark:text-amber-200"
  },
  {
    id: "diu-ut",
    name: "Diu Island & Daman",
    state: "Daman and Diu",
    avgBudgetPerDayINR: 1000,
    cheapestSeason: "November - February",
    tags: { climate: "warm", terrain: "beach", activity: "relaxation", food: "seafood", vibe: "family", stay: "hostel" },
    description: "Portuguese sea forts, peaceful golden beaches, and affordable coastal retreats.",
    tagTitle: "Island Escapist ⛵",
    bg: "from-teal-500/20 via-cyan-500/10 to-transparent border-teal-300 dark:border-teal-900/50 text-teal-950 dark:text-teal-200"
  },

  // SOUTH INDIA
  {
    id: "gokarna-ka",
    name: "Gokarna & Kudle Beach",
    state: "Karnataka",
    avgBudgetPerDayINR: 1000,
    cheapestSeason: "October - March",
    tags: { climate: "warm", terrain: "beach", activity: "relaxation", food: "seafood", vibe: "solo", stay: "hostel" },
    description: "Tranquil beach shacks, pristine coastline, and a peaceful alternative to commercial crowds.",
    tagTitle: "Coastal Nomad 🏖️",
    bg: "from-teal-500/20 via-emerald-500/10 to-transparent border-teal-300 dark:border-teal-900/50 text-teal-950 dark:text-teal-200"
  },
  {
    id: "hampi-ka",
    name: "Hampi Boulder Valley",
    state: "Karnataka",
    avgBudgetPerDayINR: 950,
    cheapestSeason: "November - February",
    tags: { climate: "warm", terrain: "history", activity: "culture", food: "spicy", vibe: "solo", stay: "hostel" },
    description: "Surreal boulder landscapes, Vijayanagara empire ruins, and budget-friendly backpacker cafes.",
    tagTitle: "Ancient Pioneer 🗿",
    bg: "from-orange-500/20 via-amber-500/10 to-transparent border-orange-300 dark:border-orange-900/50 text-orange-950 dark:text-orange-200"
  },
  {
    id: "varkala-kl",
    name: "Varkala Cliff & Munroe Island",
    state: "Kerala",
    avgBudgetPerDayINR: 1200,
    cheapestSeason: "June - September (Monsoon)",
    tags: { climate: "tropical", terrain: "beach", activity: "relaxation", food: "seafood", vibe: "romantic", stay: "hostel" },
    description: "Red ocean cliffs, serene backwater canal homestays, and fresh coastal seafood.",
    tagTitle: "Tropical Dreamer 🥥",
    bg: "from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-300 dark:border-emerald-900/50 text-emerald-950 dark:text-emerald-200"
  },
  {
    id: "pondicherry-py",
    name: "Puducherry & Auroville",
    state: "Puducherry",
    avgBudgetPerDayINR: 1100,
    cheapestSeason: "October - March",
    tags: { climate: "warm", terrain: "beach", activity: "relaxation", food: "seafood", vibe: "romantic", stay: "hostel" },
    description: "French Quarter cobblestone streets, beach promenades, and serene spiritual retreats.",
    tagTitle: "French Quarter Flâneur ☕",
    bg: "from-rose-500/20 via-pink-500/10 to-transparent border-rose-300 dark:border-rose-900/50 text-rose-950 dark:text-rose-200"
  },
  {
    id: "araku-ap",
    name: "Araku Valley",
    state: "Andhra Pradesh",
    avgBudgetPerDayINR: 950,
    cheapestSeason: "September - February",
    tags: { climate: "cold", terrain: "mountain", activity: "relaxation", food: "spicy", vibe: "family", stay: "cabin" },
    description: "Aromatic coffee plantations, Eastern Ghats hill trails, and limestone caves.",
    tagTitle: "Highland Retreat 🌿",
    bg: "from-green-500/20 via-emerald-500/10 to-transparent border-green-300 dark:border-green-900/50 text-green-950 dark:text-green-200"
  },

  // EAST & NORTH-EAST INDIA
  {
    id: "cherrapunji-ml",
    name: "Sohra & Mawlynnong",
    state: "Meghalaya",
    avgBudgetPerDayINR: 1300,
    cheapestSeason: "September - November",
    tags: { climate: "tropical", terrain: "mountain", activity: "adventure", food: "hearty", vibe: "solo", stay: "cabin" },
    description: "Living root bridges, cloud-filled valleys, and eco-friendly indigenous village stays.",
    tagTitle: "Cloud Valley Trekker 🌧️",
    bg: "from-teal-500/20 via-cyan-500/10 to-transparent border-teal-300 dark:border-teal-900/50 text-teal-950 dark:text-teal-200"
  },
  {
    id: "puri-or",
    name: "Gopalpur-on-Sea & Puri",
    state: "Odisha",
    avgBudgetPerDayINR: 800,
    cheapestSeason: "All Year Round",
    tags: { climate: "warm", terrain: "beach", activity: "culture", food: "seafood", vibe: "family", stay: "hostel" },
    description: "Quiet uncrowded beaches, ancient coastal temples, and ultra-cheap fresh seafood stalls.",
    tagTitle: "Coastal Pilgrim 🌊",
    bg: "from-cyan-500/20 via-blue-500/10 to-transparent border-cyan-300 dark:border-cyan-900/50 text-cyan-950 dark:text-cyan-200"
  },
  {
    id: "darjeeling-wb",
    name: "Darjeeling & Kalimpong",
    state: "West Bengal",
    avgBudgetPerDayINR: 1100,
    cheapestSeason: "March - May",
    tags: { climate: "cold", terrain: "mountain", activity: "culture", food: "hearty", vibe: "family", stay: "hostel" },
    description: "Majestic Kanchenjunga views, historic tea gardens, and vibrant mountain toy train heritage.",
    tagTitle: "Tea Garden Escapist 🍃",
    bg: "from-emerald-500/20 via-green-500/10 to-transparent border-emerald-300 dark:border-emerald-900/50 text-emerald-950 dark:text-emerald-200"
  },

  // CENTRAL INDIA
  {
    id: "orchha-mp",
    name: "Orchha & Khajuraho",
    state: "Madhya Pradesh",
    avgBudgetPerDayINR: 850,
    cheapestSeason: "October - March",
    tags: { climate: "warm", terrain: "history", activity: "culture", food: "spicy", vibe: "solo", stay: "hostel" },
    description: "Betwa river cenotaphs, majestic palatial architecture, and quiet riverside camping.",
    tagTitle: "Palace Explorer 🏰",
    bg: "from-amber-500/20 via-yellow-500/10 to-transparent border-amber-300 dark:border-amber-900/50 text-amber-900 dark:text-amber-200"
  }
];

function calculateBestDestination(answers: string[]) {
  const answerSet = new Set(answers);
  let bestMatch: Destination = ALL_INDIAN_DESTINATIONS[0];
  let highestScore = -1;

  for (const dest of ALL_INDIAN_DESTINATIONS) {
    let score = 0;

    // 1. Tag Match Scoring
    Object.values(dest.tags).forEach((tagValue) => {
      if (answerSet.has(tagValue)) {
        score += 10;
      }
    });

    // 2. Affordability / Cheapest Option Priority
    if (dest.avgBudgetPerDayINR <= 900) {
      score += 8; // Highest bonus for ultra-cheap options
    } else if (dest.avgBudgetPerDayINR <= 1300) {
      score += 4;
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = dest;
    }
  }

  return bestMatch;
}

// Background Floating Items Configuration
const FLOATING_BG_ITEMS = [
  { emoji: "✈️", style: { top: "12%", left: "8%", fontSize: "2rem", opacity: 0.15, animationDelay: "0s" } },
  { emoji: "🏔️", style: { top: "18%", right: "10%", fontSize: "2.5rem", opacity: 0.12, animationDelay: "2s" } },
  { emoji: "🏖️", style: { bottom: "15%", left: "12%", fontSize: "2.2rem", opacity: 0.15, animationDelay: "4s" } },
  { emoji: "🥥", style: { bottom: "25%", right: "8%", fontSize: "1.8rem", opacity: 0.1, animationDelay: "1s" } },
  { emoji: "🗺️", style: { top: "45%", left: "4%", fontSize: "1.5rem", opacity: 0.08, animationDelay: "3s" } },
  { emoji: "⛺", style: { bottom: "45%", right: "5%", fontSize: "2rem", opacity: 0.13, animationDelay: "5s" } },
];

export default function QuizClient() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  function handleSelect(value: string) {
    if (isExiting) return;
    
    setIsExiting(true);
    
    setTimeout(() => {
      const nextAnswers = [...answers, value];
      setAnswers(nextAnswers);

      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
      }
      setIsExiting(false);
    }, 350);
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setAnswers([]);
    setIsFinished(false);
    setIsExiting(false);
  }

  const recommendation = isFinished ? calculateBestDestination(answers) : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[var(--background)] to-[color-mix(in_oklab,var(--sand)_30%,transparent)] px-5 py-12 sm:px-6">
      
      {/* ── BACKGROUND FLOATING LAYER ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {FLOATING_BG_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="absolute animate-[bounce_6s_infinite_ease-in-out] hover:scale-125 transition-transform duration-500"
            style={item.style}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-xl">
        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--primary)_12%,transparent)] border border-[color-mix(in_oklab,var(--primary)_20%,transparent)] text-[var(--primary)] mb-4 shadow-xs relative group">
            <Compass className="h-5 w-5 transition-transform duration-700 group-hover:rotate-180" />
            <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-amber-400 animate-pulse" />
          </div>
          <h1 className="text-display text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
            Match Your Travel DNA
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[var(--muted-foreground)] max-w-sm">
            Answer the interactive deck below to unlock your budget-friendly destination in India.
          </p>
        </div>

        {!isFinished ? (
          /* ── INTERACTIVE DECK LAYER CONTAINER ── */
          <div className="relative min-h-[420px] w-full flex items-center justify-center">
            {QUIZ_QUESTIONS.map((q, idx) => {
              if (idx < currentIndex) return null;

              const stackLevel = idx - currentIndex;
              const isTopCard = stackLevel === 0;

              if (stackLevel > 2) return null;

              return (
                <div
                  key={q.id}
                  style={{
                    transform: isTopCard && isExiting
                      ? `scale(0.95) translateX(110%) rotate(12deg)`
                      : `scale(${1 - stackLevel * 0.045}) translateY(${stackLevel * 14}px)`,
                    zIndex: 40 - stackLevel,
                  }}
                  className={`absolute top-0 w-full rounded-[36px] border border-[color-mix(in_oklab,var(--ink)_10%,transparent)] bg-[var(--card)] p-6 sm:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(.25,1,.5,1)] flex flex-col justify-between min-h-[400px] ${
                    isTopCard 
                      ? "opacity-100 pointer-events-auto" 
                      : "opacity-40 pointer-events-none select-none"
                  }`}
                >
                  {/* Progress & Card Top Metrics */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[var(--sand)] border border-[color-mix(in_oklab,var(--ink)_5%,transparent)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[var(--muted-foreground)]">
                        Question {q.id} / {QUIZ_QUESTIONS.length}
                      </span>
                      {isTopCard && (
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-[var(--sand)] border border-[color-mix(in_oklab,var(--ink)_5%,transparent)]">
                          <div 
                            className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--teal)] transition-all duration-500"
                            style={{ width: `${(q.id / QUIZ_QUESTIONS.length) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>

                    <h2 className="text-display mt-6 text-xl font-bold leading-snug text-[var(--ink)] sm:text-2xl">
                      {q.text}
                    </h2>
                  </div>

                  {/* Option Buttons */}
                  <div className="mt-8 space-y-3">
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        disabled={!isTopCard || isExiting}
                        onClick={() => handleSelect(opt.value)}
                        className="group flex w-full items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-3.5 text-left text-sm font-semibold text-[var(--ink)] shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:bg-[color-mix(in_oklab,var(--primary)_6%,var(--background))] hover:border-[var(--primary)] active:scale-[0.98] cursor-pointer disabled:opacity-50"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--sand)] text-xl border border-[color-mix(in_oklab,var(--ink)_5%,transparent)] shadow-xs group-hover:scale-110 group-hover:bg-[var(--card)] transition-transform duration-300">
                          {opt.emoji}
                        </span>
                        <span className="flex-1 transition-colors group-hover:text-[var(--primary)]">
                          {opt.label}
                        </span>
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-[var(--primary)]" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── CELEBRATORY RECOMMENDATION MODULE ── */
          <div className={`rounded-[38px] border bg-gradient-to-b p-6 sm:p-10 text-center shadow-2xl border-[color-mix(in_oklab,var(--ink)_8%,transparent)] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-500 ${recommendation?.bg}`}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--card)] border border-white/20 dark:border-black/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest shadow-xs mb-4">
              <Sparkles className="h-3 w-3 text-amber-500 animate-spin-slow" />
              {recommendation?.tagTitle}
            </span>

            <h2 className="text-display text-3xl font-black tracking-tight text-[var(--ink)] sm:text-4xl">
              {recommendation?.name}
            </h2>

            <p className="mt-1 flex items-center justify-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              <MapPin className="h-3.5 w-3.5 text-[var(--primary)]" /> {recommendation?.state}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)] font-medium max-w-sm mx-auto">
              {recommendation?.description}
            </p>

            {/* Budget & Best Season Chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-xl bg-[var(--card)] border border-[color-mix(in_oklab,var(--ink)_10%,transparent)] px-3 py-1.5 text-xs font-bold text-[var(--ink)] shadow-xs">
                <IndianRupee className="h-3.5 w-3.5 text-emerald-600" /> ~₹{recommendation?.avgBudgetPerDayINR}/day
              </span>
              <span className="inline-flex items-center gap-1 rounded-xl bg-[var(--card)] border border-[color-mix(in_oklab,var(--ink)_10%,transparent)] px-3 py-1.5 text-xs font-bold text-[var(--ink)] shadow-xs">
                <Calendar className="h-3.5 w-3.5 text-sky-600" /> {recommendation?.cheapestSeason}
              </span>
            </div>

            <div className="mt-10 pt-6 border-t border-[color-mix(in_oklab,var(--ink)_8%,transparent)] flex justify-center">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] text-[var(--background)] px-6 py-3 text-xs font-bold tracking-wide shadow-md hover:opacity-90 hover:scale-[1.02] transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="h-4 w-4" /> Retake Matchmaker Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}