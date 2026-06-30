'use client';

import { useState, useEffect } from "react";
import { Compass, RotateCcw, ArrowRight, Sparkles } from "lucide-react";

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

function getRecommendation(answers: string[]) {
  const counts = answers.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (counts["cold"] || counts["mountain"] || counts["cabin"]) {
    return {
      name: "Leh-Ladakh & Himachal Ranges",
      description: "You thrive in majestic alpine atmospheres. Think winding snow passes, serene high-altitude monasteries, cozy cabins, and warm hearty local stews.",
      tag: "Alpine Adventurer 🏔️",
      bg: "from-sky-500/20 via-blue-500/10 to-transparent border-sky-300 dark:border-sky-900/50 text-sky-950 dark:text-sky-200"
    };
  }
  if (counts["beach"] || counts["seafood"] || counts["relaxation"]) {
    return {
      name: "The Coastlines of Goa & Kerala",
      description: "The ocean is calling you. Your perfect match includes fresh maritime coastal cuisines, sunset walks under high palms, and unwinding at your own slow, relaxed pace.",
      tag: "Coastal Nomad 🏖️",
      bg: "from-teal-500/20 via-emerald-500/10 to-transparent border-teal-300 dark:border-teal-900/50 text-teal-950 dark:text-teal-200"
    };
  }
  if (counts["history"] || counts["culture"] || counts["palaces"]) {
    return {
      name: "Imperial Rajasthan (Jaipur & Udaipur)",
      description: "You appreciate deep cultural ancestry. Get ready to explore royal pink-stone palaces, vibrant street bazaars, and traditional performance arts.",
      tag: "Heritage Seeker 📜",
      bg: "from-amber-500/20 via-orange-500/10 to-transparent border-amber-300 dark:border-amber-900/50 text-amber-900 dark:text-amber-200"
    };
  }

  return {
    name: "The Western Ghats & Coorg Highlands",
    description: "You appreciate a perfect equilibrium. A mix of rich misty coffee plantations, ancient heritage trails, local culinary gems, and fresh balanced weather.",
    tag: "Mindful Explorer 🌿",
    bg: "from-purple-500/20 via-indigo-500/10 to-transparent border-purple-300 dark:border-purple-900/50 text-purple-950 dark:text-purple-200"
  };
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
    
    // Trigger deck throw animation sequence
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
    }, 350); // Matches sliding transition speed
  }

  function restartQuiz() {
    setCurrentIndex(0);
    setAnswers([]);
    setIsFinished(false);
    setIsExiting(false);
  }

  const recommendation = isFinished ? getRecommendation(answers) : null;

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
            Answer the interactive deck below to discover your next destination checkpoint.
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

                  {/* Enhanced Option Buttons with Micro-actions */}
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
              {recommendation?.tag}
            </span>
            <h2 className="text-display text-3xl font-black tracking-tight text-[var(--ink)] sm:text-4xl">
              {recommendation?.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)] font-medium max-w-sm mx-auto">
              {recommendation?.description}
            </p>

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