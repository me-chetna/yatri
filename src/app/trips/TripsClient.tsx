'use client';

import { useEffect, useState } from "react";
import { ArrowRight, Bookmark, Trash2, AlertTriangle } from "lucide-react";
import { SideNav } from "@/src/components/SideNav";
import { loadTrips, deleteTrip, type SavedTrip } from "@/src/lib/trips";
import { findPlace } from "@/src/data/trip-data";

export default function TripsPage() {
  const [trips, setTrips] = useState<SavedTrip[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTrips(loadTrips());
    setMounted(true);
  }, []);

  const remove = (id: string) => {
    deleteTrip(id);
    setTrips(loadTrips());
  };

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        Loading saved adventures…
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-32">
      <SideNav />
      <div className="mx-auto max-w-5xl px-6 pt-12">
        <a href="/" className="text-sm text-[var(--muted-foreground)] hover:text-[var(--ink)] transition-colors">
          ← Dashboard
        </a>
        <div className="mt-6 flex items-end justify-between">
          <div>
            <h1 className="text-display text-4xl font-semibold text-[var(--ink)]">My Trips</h1>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Itineraries you've designed and saved.
            </p>
          </div>
          <span className="chip"><Bookmark className="h-3 w-3" /> {trips.length} saved</span>
        </div>

        {trips.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-[var(--border)] p-12 text-center">
            <div className="text-5xl">🧳</div>
            <h2 className="text-display mt-4 text-2xl font-semibold">No trips yet</h2>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              Pick a state, build an itinerary, hit "Save to My Trips".
            </p>
            <a
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-[var(--primary-foreground)] shadow-sm hover:opacity-90 transition-opacity"
            >
              Start planning <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {trips.map((t) => {
              const place = t.stateSlug && t.placeSlug ? findPlace(t.stateSlug, t.placeSlug) : undefined;
              const stops = (t.poiIds || [])
                .map(id => place?.pois.find(p => p.id === id))
                .filter(Boolean);
              
              const cost = stops.reduce((s, p) => s + (p?.cost ?? 0), 0);
              const isBroken = !place;

              return (
                <div key={t.id} className="group rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-30px_rgba(40,20,10,0.3)]">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
                        {place?.state ?? "Unknown destination"}
                      </div>
                      <h3 className="text-display mt-1 text-xl font-semibold text-[var(--ink)]">
                        {t.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => remove(t.id)}
                      className="grid h-8 w-8 place-items-center rounded-full text-[var(--muted-foreground)] hover:bg-[var(--sand)] hover:text-[var(--destructive)] transition-colors"
                      aria-label="Delete trip"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {isBroken ? (
                    <div className="mt-4 flex items-start gap-2 rounded-xl border border-dashed border-amber-500/50 bg-amber-50/60 px-3 py-2.5 text-xs text-amber-800">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <span>
                        This trip's place data couldn't be found — it may have been saved before an
                        update. Remove it with the trash icon above and re-save it from the trip page.
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
                        <span>{new Date(t.savedAt).toLocaleDateString()}</span>
                        <span>·</span>
                        <span>{stops.length} stops</span>
                        <span>·</span>
                        <span>₹{cost.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="mt-4 flex -space-x-2">
                        {stops.slice(0, 6).map((s) => (
                          <span key={s!.id} className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--card)] bg-[var(--sand)] text-base shadow-xs" title={s!.name}>
                            {s!.emoji}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`/trip/${t.stateSlug}/${t.placeSlug}`}
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
                      >
                        Open trip <ArrowRight className="h-4 w-4" />
                      </a>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}