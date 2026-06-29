'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Pencil, Check, X, MapPin } from "lucide-react";
import {
AVATAR_CHOICES,
DEFAULT_PROFILE,
loadProfile,
loadTheme,
saveProfile,
saveTheme,
type Profile,
type Theme,
} from "../../lib/profile";
import { loadTrips, type SavedTrip } from "../../lib/trips";
import { SideNav } from "../../components/SideNav";

export default function ProfileClient() {
const [mounted, setMounted] = useState(false);
const [profile, setProfile] = useState(DEFAULT_PROFILE);
const [theme, setTheme] = useState("light");
const [trips, setTrips] = useState<SavedTrip[]>([]);
const [editing, setEditing] = useState(false);
const [draftName, setDraftName] = useState(DEFAULT_PROFILE.name);
const [draftAvatar, setDraftAvatar] = useState(DEFAULT_PROFILE.avatar);

useEffect(() => {
const p = loadProfile();
const t = loadTheme();
setProfile(p);
setTheme(t);
setDraftName(p.name);
setDraftAvatar(p.avatar);
setTrips(loadTrips());

// Apply theme on initial client mount
if (t === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

setMounted(true);


}, []);

function startEdit() {
setDraftName(profile.name);
setDraftAvatar(profile.avatar);
setEditing(true);
}

function save() {
const next: Profile = {
name: draftName.trim() || DEFAULT_PROFILE.name,
avatar: draftAvatar || DEFAULT_PROFILE.avatar,
};
saveProfile(next);
setProfile(next);
setEditing(false);
}

function toggleTheme() {
const next: Theme = theme === "dark" ? "light" : "dark";
saveTheme(next);
setTheme(next);

if (next === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}


}

return (
<main>
  <header className="border-b border-[color-mix(in_oklab,var(--ink)_10%,transparent)] bg-gradient-to-br from-[color-mix(in_oklab,var(--primary)_18%,transparent)] via-transparent to-[color-mix(in_oklab,var(--teal)_12%,transparent)]">
    <div className="mx-auto bg-[var(--card)] max-w-3xl px-5 py-10 sm:px-6 sm:py-14">
      <span className="chip">
        <MapPin className="h-3 w-3 text-[var(--primary)]" /> Your profile
      </span>
      <h1 className="text-display mt-4 text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
        Namaste{mounted ? `, ${profile.name}` : ""}.
      </h1>
      <p className="mt-2 max-w-xl text-sm text-[var(--muted-foreground)]">
        Make this passport your own — pick an avatar, change your name and switch to night mode for long planning sessions.
      </p>
    </div>
  </header>

  <div className="mx-auto mt-8 grid max-w-3xl gap-5 px-5 sm:px-6">
    
    <section className="rounded-[28px] border border-[color-mix(in_oklab,var(--ink)_10%,transparent)] bg-[var(--card)] p-6 shadow-sm">
      {!editing ? (
        <div className="flex items-center gap-5">
          <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[var(--sand)] text-4xl">
            {profile.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Traveler</div>
            <div className="text-display truncate text-2xl font-semibold text-[var(--ink)]">
              {profile.name}
            </div>
          </div>
          <button
            onClick={startEdit}
            className="flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-medium text-[var(--primary-foreground)] cursor-pointer hover:opacity-90 transition-all"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">Name</label>
            <input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              maxLength={32}
              autoFocus
              className="mt-1.5 w-full rounded-2xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--primary)]"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-[var(--muted-foreground)]">Avatar</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {AVATAR_CHOICES.map((a) => (
                <button
                  key={a}
                  onClick={() => setDraftAvatar(a)}
                  className={`grid h-11 w-11 place-items-center rounded-full border text-xl transition cursor-pointer ${
                    draftAvatar === a
                      ? "border-[var(--primary)] bg-[color-mix(in_oklab,var(--primary)_15%,transparent)]"
                      : "border-[var(--border)] bg-[var(--background)] hover:bg-[var(--sand)]"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-1.5 rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--ink)] cursor-pointer hover:bg-[var(--sand)]"
            >
              <X className="h-3.5 w-3.5" /> Cancel
            </button>
            <button
              onClick={save}
              className="flex items-center gap-1.5 rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-medium text-[var(--primary-foreground)] cursor-pointer hover:opacity-90"
            >
              <Check className="h-3.5 w-3.5" /> Save
            </button>
          </div>
        </div>
      )}
    </section>

    <div className="grid gap-5 sm:grid-cols-2">
      
      <Link
        href="/trips"
        className="group rounded-[28px] border border-[color-mix(in_oklab,var(--ink)_10%,transparent)] bg-[var(--card)] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">My Trips</div>
        <div className="mt-2 flex items-end gap-2">
          <div className="text-display text-5xl font-semibold text-[var(--ink)]">
            {mounted ? trips.length : "—"}
          </div>
          <div className="pb-2 text-sm text-[var(--muted-foreground)]">
            {trips.length === 1 ? "trip saved" : "trips saved"}
          </div>
        </div>
        <div className="mt-3 text-xs font-medium text-[var(--primary)] group-hover:underline">
          View all →
        </div>
      </Link>

      <section className="rounded-[28px] border border-[color-mix(in_oklab,var(--ink)_10%,transparent)] bg-[var(--card)] p-6 shadow-sm">
        <div className="text-xs uppercase tracking-wide text-[var(--muted-foreground)]">Appearance</div>
        <div className="mt-2 flex items-center justify-between gap-4">
          <div>
            <div className="text-display text-lg font-semibold text-[var(--ink)]">
              {mounted && theme === "dark" ? "Night mode" : "Day mode"}
            </div>
            <div className="text-xs text-[var(--muted-foreground)]">
              {mounted && theme === "dark" ? "Warm darks for late planning." : "Bright sand for daytime use."}
            </div>
          </div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="relative h-9 w-16 rounded-full bg-[var(--sand)] transition cursor-pointer"
          >
            <span
              className={`absolute top-1 grid h-7 w-7 place-items-center rounded-full bg-[var(--primary)] text-[var(--primary-foreground)] shadow transition-all duration-300 ${
                mounted && theme === "dark" ? "left-8" : "left-1"
              }`}
            >
              {mounted && theme === "dark" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            </span>
          </button>
        </div>
      </section>

    </div>
  </div>
</main>
);
}