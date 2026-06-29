export type Profile = {
  name: string;
  avatar: string;
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