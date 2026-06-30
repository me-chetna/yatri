export type Profile = {
  name: string;
  avatar: string;
};

export type Badge = {
  label: string;
  emoji: string;
  className: string;
  description: string;
};

const PROFILE_KEY = "yatra:profile";
const THEME_KEY = "yatra:theme";

export const DEFAULT_PROFILE: Profile = { name: "Yatri", avatar: "🧭" };

export const AVATAR_CHOICES = ["🧭", "🧳", "🛕", "🐘", "🪷", "🐅", "🦚", "🌄", "🛺", "🪕", "🧕", "🧔"];

export const loadProfile = (): Profile => {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const p = JSON.parse(raw);
    return {
      name: typeof p.name === "string" && p.name.trim() ? p.name : DEFAULT_PROFILE.name,
      avatar: typeof p.avatar === "string" && p.avatar ? p.avatar : DEFAULT_PROFILE.avatar,
    };
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveProfile = (p: Profile) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
};

export type Theme = "light" | "dark";

export const loadTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === "dark" || stored === "light") return stored;
  return "light";
};

export const applyTheme = (theme: Theme) => {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const saveTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
};

export function getBadges(tripsCount: number, avatar: string): Badge[] {
  const badges: Badge[] = [];

  // 1. Milestone Achievement Badges (Based on Trips Count)
  if (tripsCount === 0) {
    badges.push({
      label: "Wander-lusting",
      emoji: "💭",
      className: "from-slate-500/10 to-slate-600/5 dark:from-slate-400/10 dark:to-slate-500/5 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 shadow-slate-500/5",
      description: "Dreaming up the first big escape.",
    });
  } else if (tripsCount >= 1 && tripsCount <= 3) {
    badges.push({
      label: "Backpacker",
      emoji: "🎒",
      className: "from-emerald-500/10 to-teal-600/5 dark:from-emerald-400/10 dark:to-teal-500/5 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/40 shadow-emerald-500/5",
      description: "Getting your feet wet on the trail.",
    });
  } else if (tripsCount >= 4 && tripsCount <= 7) {
    badges.push({
      label: "Voyager",
      emoji: "✈️",
      className: "from-sky-500/10 to-indigo-600/5 dark:from-sky-400/10 dark:to-indigo-500/5 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-900/40 shadow-sky-500/5",
      description: "A seasoned planner mapping the world.",
    });
  } else if (tripsCount >= 8) {
    badges.push({
      label: "Globetrotter",
      emoji: "👑",
      className: "from-amber-500/15 to-orange-600/5 dark:from-amber-400/15 dark:to-orange-500/5 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-900/50 shadow-amber-500/10 animate-pulse",
      description: "Ultimate elite explorer status.",
    });
  }

  // 2. Secret Themed Badges (Based on Chosen Character Avatar)
  if (avatar === "🐘" || avatar === "🐅" || avatar === "🦚") {
    badges.push({
      label: "Wildlife Explorer",
      emoji: "🌿",
      className: "from-green-500/10 to-emerald-600/5 dark:from-green-400/10 dark:to-emerald-500/5 text-green-800 dark:text-green-300 border-green-200 dark:border-green-900/40 shadow-green-500/5",
      description: "Drawn to nature and the wild.",
    });
  }
  if (avatar === "🛺" || avatar === "🧳") {
    badges.push({
      label: "Street Nomad",
      emoji: "🚦",
      className: "from-orange-500/10 to-red-600/5 dark:from-orange-400/10 dark:to-red-500/5 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-900/40 shadow-orange-500/5",
      description: "Prefers the local high-speed transit.",
    });
  }
  if (avatar === "🛕" || avatar === "🪷") {
    badges.push({
      label: "Heritage Seeker",
      emoji: "📜",
      className: "from-purple-500/10 to-fuchsia-600/5 dark:from-purple-400/10 dark:to-fuchsia-500/5 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-900/40 shadow-purple-500/5",
      description: "Fascinated by ancient roots and art.",
    });
  }

  return badges;
}