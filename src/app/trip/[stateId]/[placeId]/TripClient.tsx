'use client';

import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock,
  Heart,
  IndianRupee,
  MapPin,
  Plus,
  Star,
  Trash2,
  Utensils,
  ShoppingBag,
  Camera,
  Route as RouteIcon,
  X,
} from "lucide-react";
import { SideNav } from "../../../../components/SideNav";
import {
  travelMinutes,
  distanceKm,
  type Attraction,
  type Place,
  type State,
} from "../../../../data/trip-data";
import { loadItinerary, saveItinerary, saveTrip } from "../../../../lib/trips";

// Lazily load your separate TripMap component to prevent Next.js server-side window errors
const TripMap = lazy(() => import("../../../../components/TripMap"));

const RELIABLE_FALLBACKS = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
];

function SafeImage({ src, alt, fallbackIndex = 0, className, ...props }: { src: string; alt: string; fallbackIndex?: number; className?: string; [key: string]: any }) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImgSrc(RELIABLE_FALLBACKS[fallbackIndex % RELIABLE_FALLBACKS.length]);
      }}
    />
  );
}

interface TripClientProps {
  state: State;
  place: Place;
}

export default function TripClient({ state, place }: TripClientProps) {
  const initial = useMemo(() => place.defaultItinerary.flat(), [place]);
  const [order, setOrder] = useState<string[]>(initial);
  const [selectedId, setSelectedId] = useState<string | null>(initial[0] ?? null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = loadItinerary(state.id, place.id);
    if (existing && existing.length) {
      setOrder(existing);
      setSelectedId(existing[0] ?? null);
    }
  }, [state.id, place.id]);

  useEffect(() => {
    if (order.length) saveItinerary(state.id, place.id, order);
  }, [order, state.id, place.id]);

  const byId = useMemo(
    () => Object.fromEntries(place.attractions.map((a: Attraction) => [a.id, a])) as Record<string, Attraction>,
    [place],
  );

  const selected = selectedId ? byId[selectedId] : null;

  const toggle = (id: string) => {
    setOrder((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  const reorder = (fromId: string, toId: string) => {
    if (fromId === toId) return;
    setOrder((cur) => {
      const next = cur.filter((x) => x !== fromId);
      const idx = next.indexOf(toId);
      if (idx === -1) return cur;
      next.splice(idx, 0, fromId);
      return next;
    });
  };

  const allRestaurants = useMemo(
    () => place.attractions.filter((a) => a.type === "restaurant"),
    [place],
  );
  
  const topNearbyRestaurant = (a: Attraction): Attraction | null => {
    if (a.type === "restaurant") return null;
    const ranked = allRestaurants
      .map((r) => ({ r, d: distanceKm([a.lat, a.lng], [r.lat, r.lng]) }))
      .filter((x) => x.d <= 6)
      .sort((x, y) => y.r.rating - x.r.rating || x.d - y.d);
    return ranked[0]?.r ?? null;
  };

  const dayCount = Math.max(1, place.defaultItinerary.length);
  const days = useMemo(() => {
    const stops = order.map((id) => byId[id]).filter((a): a is Attraction => Boolean(a));
    if (stops.length === 0) return [];
    const perDay = Math.ceil(stops.length / dayCount);
    const chunks: Attraction[][] = [];
    for (let i = 0; i < stops.length; i += perDay) {
      chunks.push(stops.slice(i, i + perDay));
    }
    return chunks;
  }, [order, byId, dayCount]);

  const totalBudget = order.reduce((sum, id) => sum + (byId[id]?.costINR ?? 0), 0);
  const totalMinutes = days.reduce((sum, day) => {
    let m = day.reduce((s, a) => s + a.visitMinutes, 0);
    for (let i = 1; i < day.length; i++) {
      m += travelMinutes([day[i - 1].lat, day[i - 1].lng], [day[i].lat, day[i].lng]);
    }
    return sum + m;
  }, 0);

  const handleSaveTrip = () => {
    saveTrip({
      stateSlug: state.id,
      placeSlug: place.id,
      poiIds: order,
      title: `${place.name} — ${order.length} stop${order.length === 1 ? "" : "s"}`,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const candidates = place.attractions.filter((a: Attraction) => !order.includes(a.id));

  const typeIcon = (type: Attraction["type"]) => {
    if (type === "restaurant") return Utensils;
    if (type === "market")     return ShoppingBag;
    if (type === "wellness")   return Heart;
    return Camera;
  };

  return (
    <div className="flex min-h-screen w-full flex-col-reverse bg-background md:h-screen md:w-screen md:flex-row md:overflow-hidden">
      <SideNav />

      {/* Sidebar Panel */}
      <aside className="relative z-10 flex w-full shrink-0 flex-col border-t border-border bg-card md:h-full md:w-[420px] md:border-r md:border-t-0">
        <div className="border-b border-border px-4 pb-4 pt-5 sm:px-6 sm:pb-5 sm:pt-6">
          <div className="flex items-center justify-between gap-3">
            <a
              href={`/state/${state.id}`}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" /> {state.name}
            </a>
            <button
              type="button"
              onClick={handleSaveTrip}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              {saved ? <Check className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
              {saved ? "Saved" : "Save trip"}
            </button>
          </div>
          <h1 className="mt-2 font-display text-3xl text-foreground sm:text-4xl">{place.name}</h1>
          <p className="text-sm text-muted-foreground">{place.tagline}</p>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Stat icon={<RouteIcon className="h-3.5 w-3.5" />} label="Days" value={String(days.length)} />
            <Stat icon={<Clock className="h-3.5 w-3.5" />} label="Time" value={fmtHours(totalMinutes)} />
            <Stat icon={<IndianRupee className="h-3.5 w-3.5" />} label="Budget" value={`₹${totalBudget.toLocaleString("en-IN")}`} />
          </div>
        </div>

        {/* Scrollable Itinerary stops */}
        <div className="flex-1 px-4 py-5 sm:px-6 md:overflow-y-auto">
          {days.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Your itinerary is empty. Tap pins on the map or "Add" below to start.
            </p>
          ) : (
            days.map((day, di) => {
              const dayBudget = day.reduce((s, a) => s + a.costINR, 0);
              return (
                <div key={di} className="mb-7">
                  <div className="mb-3 flex items-baseline justify-between">
                    <h2 className="font-display text-2xl text-foreground">
                      Day <span className="text-primary">{di + 1}</span>
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      ₹{dayBudget.toLocaleString("en-IN")} · {day.length} stops
                    </span>
                  </div>

                  <ol className="relative space-y-2 border-l-2 border-dashed border-border pl-5">
                    {day.map((a, ai) => {
                      const prev = day[ai - 1];
                      const travel = prev ? travelMinutes([prev.lat, prev.lng], [a.lat, a.lng]) : 0;
                      const Icon = typeIcon(a.type);
                      const nearby = topNearbyRestaurant(a);
                      return (
                        <li
                          key={a.id}
                          className={`relative ${dragOverId === a.id ? "scale-[1.01]" : ""}`}
                          draggable
                          onDragStart={(e) => {
                            setDragId(a.id);
                            e.dataTransfer.effectAllowed = "move";
                          }}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";
                            if (dragOverId !== a.id) setDragOverId(a.id);
                          }}
                          onDragLeave={() => {
                            if (dragOverId === a.id) setDragOverId(null);
                          }}
                          onDrop={(e) => {
                            e.preventDefault();
                            if (dragId) reorder(dragId, a.id);
                            setDragId(null);
                            setDragOverId(null);
                          }}
                          onDragEnd={() => {
                            setDragId(null);
                            setDragOverId(null);
                          }}
                        >
                          {travel > 0 && (
                            <div className="ml-2 mb-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                              <Clock className="h-3 w-3" />~{travel} min travel
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => setSelectedId(a.id)}
                            className={`group flex w-full items-start gap-3 rounded-xl border p-3 text-left transition cursor-grab active:cursor-grabbing ${
                              selectedId === a.id
                                ? "border-primary bg-primary/5"
                                : "border-border bg-background hover:border-primary/40"
                            } ${dragOverId === a.id ? "ring-2 ring-primary/40" : ""} ${dragId === a.id ? "opacity-50" : ""}`}
                          >
                            <span className="absolute -left-[14px] mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground ring-4 ring-card">
                              {order.indexOf(a.id) + 1}
                            </span>
                            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${a.type === "wellness" ? "text-violet-600" : "text-primary"}`} />
                            <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-medium text-foreground">{a.name}</div>
                              <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                                <span className="flex items-center gap-0.5">
                                  <Star className="h-3 w-3 fill-current text-amber-500" />
                                  {a.rating}
                                </span>
                                <span>·</span>
                                <span>{a.visitMinutes}m</span>
                                <span>·</span>
                                <span>₹{a.costINR}</span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggle(a.id);
                              }}
                              className="text-muted-foreground opacity-0 transition hover:text-destructive group-hover:opacity-100 focus-visible:opacity-100"
                              title="Remove from itinerary"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </button>

                          {nearby && (
                            <div className="ml-2 mt-1.5 flex items-center gap-2 rounded-lg border border-dashed border-amber-500/40 bg-amber-50/60 px-2.5 py-1.5">
                              <Utensils className="h-3.5 w-3.5 shrink-0 text-amber-700" />
                              <div className="min-w-0 flex-1">
                                <div className="truncate text-[11px] font-medium text-foreground">
                                  Top eats nearby · {nearby.name}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                  <span className="flex items-center gap-0.5">
                                    <Star className="h-2.5 w-2.5 fill-current text-amber-500" />
                                    {nearby.rating}
                                  </span>
                                  <span>·</span>
                                  <span>{distanceKm([a.lat, a.lng], [nearby.lat, nearby.lng]).toFixed(1)} km</span>
                                  <span>·</span>
                                  <span>₹{nearby.costINR}</span>
                                </div>
                              </div>
                              {!order.includes(nearby.id) ? (
                                <button
                                  type="button"
                                  onClick={() => toggle(nearby.id)}
                                  className="rounded-full bg-amber-600 px-2 py-0.5 text-[10px] font-medium text-white hover:bg-amber-700"
                                  title="Add to itinerary"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              ) : (
                                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                                  Added
                                </span>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })
          )}

          {candidates.length > 0 && (
            <div className="mt-2 rounded-2xl border border-dashed border-border bg-muted/30 p-4">
              <div className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Explore more in {place.name}
              </div>
              <p className="mb-3 text-[11px] text-muted-foreground">
                All the other spots locals love — tap any to add to your plan.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {candidates.map((a, i) => {
                  const TypeIcon = typeIcon(a.type);
                  const isWellness = a.type === "wellness";
                  return (
                    <button
                      key={a.id}
                      onClick={() => {
                        setSelectedId(a.id);
                        toggle(a.id);
                      }}
                      className="group overflow-hidden rounded-xl border border-border bg-background text-left transition hover:border-primary hover:shadow-md"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                        <SafeImage
                          src={a.image}
                          alt={a.name}
                          fallbackIndex={i}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/70 to-transparent" />
                        <span className={`absolute left-1.5 top-1.5 inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] uppercase tracking-wide ${isWellness ? "bg-violet-100 text-violet-700" : "bg-white/95 text-foreground"}`}>
                          <TypeIcon className="h-2.5 w-2.5" />
                          {a.type}
                        </span>
                        <span className="absolute right-1.5 top-1.5 inline-flex items-center gap-0.5 rounded-full bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white">
                          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                          {a.rating}
                        </span>
                        <div className="absolute bottom-1 left-2 right-2 truncate text-[11px] font-medium text-white drop-shadow">
                          {a.name}
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-2 py-1.5 text-[10px] text-muted-foreground">
                        <span>{a.visitMinutes}m · ₹{a.costINR}</span>
                        <span className="inline-flex items-center gap-0.5 font-medium text-primary">
                          <Plus className="h-3 w-3" />Add
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Map View Frame */}
      <main className="relative h-[70vh] w-full shrink-0 md:h-full md:flex-1">
        <Suspense fallback={<div className="grid h-full place-items-center text-muted-foreground animate-pulse">Loading map…</div>}>
          <TripMap
            place={place}
            itinerary={order}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onToggle={toggle}
          />
        </Suspense>

        {/* Map legend */}
        <div className="pointer-events-none absolute left-1/2 top-4 z-[500] w-[92vw] max-w-md -translate-x-1/2 sm:top-6 sm:w-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full border border-border bg-card/95 px-3 py-2 text-[10px] text-muted-foreground shadow-lg backdrop-blur sm:gap-x-4 sm:px-4 sm:text-xs">
            <Legend color="oklch(0.62 0.16 40)" label="In plan" />
            <Legend color="#6b7280" label="Available" />
            <Legend color="#c97a3a" label="Restaurant" />
            <Legend color="#b8860b" label="Market" />
            <Legend color="#7c3aed" label="Wellness" />
            <span className="hidden md:inline">· right-click or long-press a pin to add / remove</span>
          </div>
        </div>

        {/* Selected place details card */}
        {selected && (
          <div className="absolute inset-x-3 bottom-3 z-[600] mx-auto max-h-[75vh] max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl sm:inset-x-6 sm:bottom-6 md:left-auto md:right-6 md:max-w-md">
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              <SafeImage
                src={selected.image}
                alt={selected.name}
                fallbackIndex={0}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${selected.type === "wellness" ? "bg-violet-100 text-violet-700" : "bg-white/95 text-foreground"}`}>
                {selected.type === "restaurant" ? <Utensils className="h-3 w-3" /> :
                 selected.type === "market"     ? <ShoppingBag className="h-3 w-3" /> :
                 selected.type === "wellness"   ? <Heart className="h-3 w-3" /> :
                 <MapPin className="h-3 w-3" />}
                {selected.type}
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-foreground transition hover:bg-white"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-display text-3xl leading-tight drop-shadow">{selected.name}</h3>
                <div className="mt-1 flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{selected.rating}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{selected.visitMinutes} min</span>
                  <span className="flex items-center gap-1"><IndianRupee className="h-3.5 w-3.5" />{selected.costINR}</span>
                </div>
              </div>
            </div>
            <div className="p-5">
              <p className="text-sm leading-relaxed text-foreground/90">{selected.description}</p>
              <button
                onClick={() => toggle(selected.id)}
                className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  order.includes(selected.id)
                    ? "border border-border bg-background text-foreground hover:bg-destructive hover:text-destructive-foreground"
                    : selected.type === "wellness"
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                }`}
              >
                {order.includes(selected.id) ? (
                  <><Trash2 className="h-4 w-4" /> Remove from itinerary</>
                ) : (
                  <><Plus className="h-4 w-4" /> Add to itinerary</>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background px-2.5 py-2">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {icon}{label}
      </div>
      <div className="mt-0.5 truncate text-sm font-semibold text-foreground">{value}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function fmtHours(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? `${h}h ${m ? `${m}m` : ""}`.trim() : `${m}m`;
}