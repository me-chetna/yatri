'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { STATES } from "../data/trip-data"; 
import { SideNav } from "../components/SideNav";
import { HOTELS, getAITips, topByKind, topRatedPlaces, type EnrichedAttraction, type AITip } from "../data/dashboard";
import { ArrowRight, MapPin, Sparkles, Star, Clock, Wallet, BedDouble, ShoppingBag, Utensils, Camera } from "lucide-react";

export default function WanderDashboard() {
  const [tips, setTips] = useState<AITip[]>([]);
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    setTips(getAITips());
    setToday(new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" }));
  }, []);

  const topSights = topRatedPlaces(8);
  const topFoods = topByKind("restaurant", 10);
  const topMarkets = topByKind("market", 10);

  return (
    <div className="min-h-screen bg-background paper-grain">
      <SideNav />
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          {/* ✅ Swapped to standard img tag and replaced 'fill' with 'absolute inset-0' */}
          <img 
            src="https://tltxxu1td9jw4ezp.public.blob.vercel-storage.com/hero-india.jpg" 
            alt="Wander India Hero" 
            className="absolute inset-0 h-full w-full object-cover opacity-90" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pt-44">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Plan your India · est. 2026</span>
          </div>
          <h1 className="mt-6 max-w-3xl font-display1 text-5xl leading-[0.95] text-foreground md:text-7xl">
            Wander the colours of <em className="text-primary not-italic">India !</em>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Pick a state, choose a city, and drop pins on a real map.
            We'll stitch your day-by-day route, budget, and the famous shacks &amp; bazaars in between.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#states"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition hover:translate-y-[-1px] hover:shadow-xl"
            >
              Start exploring <ArrowRight className="h-4 w-4" />
            </a>
            <span className="text-sm text-muted-foreground">28 states · 100+ cities</span>
          </div>
        </div>
      </section>

      {/* AI SUGGESTIONS */}
      <section className="mx-auto -mt-12 p-18 max-w-7xl px-5 sm:px-6 ">
        <div className="rounded-[28px] border border-[color-mix(in_oklab,var(--ink)_10%,transparent)] bg-gradient-to-br from-[color-mix(in_oklab,var(--primary)_18%,transparent)] via-transparent to-[color-mix(in_oklab,var(--teal)_12%,transparent)] sm:p-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <span className="chip bg-(--primary)/10 text-primary">
                <Sparkles className="h-3 w-3" /> AI travel co-pilot
              </span>
              <h2 className="text-display mt-3 text-2xl font-semibold text-ink sm:text-3xl">
                Tailored for today — weather, crowd & vibe
              </h2>
            </div>
            <span className="hidden text-[11px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
              {today ? `Live · ${today}` : "Live"}
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((t) => (
              <div key={t.id} className="group relative overflow-hidden rounded-2xl border border-[color-mix(in_oklab,var(--ink)_8%,transparent)] bg-white/40 p-4 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-2xl">{t.icon}</span>
                  <span className="rounded-full bg-(--sand) px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-(--ink)/70">
                    {t.tag}
                  </span>
                </div>
                <h3 className="text-[20px] font-semibold leading-tight text-ink">{t.title}</h3>
                <p className="mt-1 text-[17px] leading-snug text-muted-foreground text-base">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* States */}
      <section id="states" className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Step on it</div>
            <h2 className="mt-2 font-display text-4xl text-foreground md:text-5xl">
              Where do you want to wander?
            </h2>
          </div>
          <div className="hidden text-right text-sm text-muted-foreground md:block">
            Tap a state to see its loved cities.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.map((s, i) => (
            <Link
              key={s.id}
              href={`/state/${s.id}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 opacity-80 mix-blend-multiply"
                style={{ background: s.gradient }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="relative flex h-full flex-col justify-between p-6 text-white">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.25em] backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-3xl drop-shadow-lg">{s.emoji}</span>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-white/70">{s.tagline}</div>
                  <h3 className="mt-1 font-display text-4xl leading-none">{s.name}</h3>
                  <p className="mt-3 max-w-xs text-sm text-white/85">{s.vibe}</p>
                  <div className="mt-5 flex items-center gap-2 text-xs">
                    <MapPin className="h-3.5 w-3.5" />
                    {s.places.length} {s.places.length === 1 ? "city" : "cities"} ready
                    <ArrowRight className="ml-auto h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* TOP RATED MARQUEE — sights */}
      <section className="mt-20">
        <div className="mx-auto mb-6 max-w-7xl px-5 sm:px-6">
          <SectionHead
            eyebrow={<><Camera className="h-3 w-3" /> Top rated</>}
            title="Most loved places, ranked by travellers"
            sub="A live ladder of the highest-rated sights across every state."
          />
        </div>
        <Marquee items={topSights} render={(p, i) => <SightCard poi={p} rank={i + 1} />} />
      </section>

      {/* HOTELS */}
      <section className="mx-auto mt-20 max-w-7xl px-5 sm:px-6">
        <SectionHead
          eyebrow={<><BedDouble className="h-3 w-3" /> Stay</>}
          title="Famous hotels to fall asleep in"
          sub="Palaces, plantations and clifftop forts — the rooms that become the trip."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HOTELS.map((h) => (
            <div key={h.id} className="group relative overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--ink)_8%,transparent)] bg-white shadow-[0_18px_40px_-24px_rgba(40,20,10,0.3)] transition hover:-translate-y-1">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={h.image} 
                  alt={h.name} 
                  loading="lazy"
                  className="h-full w-full absolute inset-0 object-cover transition duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/55 to-transparent" />
                <span className="absolute left-4 top-4 chip bg-white/90">{h.state}</span>
                <span className="absolute right-4 top-4 chip bg-primary text-white border-transparent">
                  <Star className="h-3 w-3 fill-current" /> {h.rating.toFixed(1)}
                </span>
                <div className="absolute inset-x-4 bottom-3 text-white">
                  <div className="text-[11px] uppercase tracking-[0.2em] opacity-80">{h.city}</div>
                  <div className="text-display text-xl font-semibold">{h.name}</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4">
                <p className="text-sm text-muted-foreground">{h.vibe}</p>
                <span className="text-sm font-semibold text-ink">
                  ₹{h.pricePerNight.toLocaleString("en-IN")}<span className="text-xs font-normal text-muted-foreground"> /nt</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOD MARQUEE */}
      <section className="mt-20">
        <div className="mx-auto mb-6 max-w-7xl px-5 sm:px-6">
          <SectionHead
            eyebrow={<><Utensils className="h-3 w-3" /> Eat</>}
            title="Iconic plates worth the detour"
            sub="The dish, the alley, the people queuing outside — chase these."
          />
        </div>
        <Marquee speed="slow" reverse items={topFoods} render={(p) => <PoiTile poi={p} accent="var(--spice)" />} />
      </section>

      {/* MARKETS */}
      <section className="mt-20">
        <div className="mx-auto mb-6 max-w-7xl px-5 sm:px-6">
          <SectionHead
            eyebrow={<><ShoppingBag className="h-3 w-3" /> Bazaars</>}
            title="Markets that smell like the city"
            sub="Brass, silk, jasmine, cardamom — bring an empty suitcase."
          />
        </div>
        <Marquee items={topMarkets} render={(p) => <PoiTile poi={p} accent="var(--teal)" />} />
      </section>

      <footer className="border-t border-border/60 py-10 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Wander India — a slow-travel planner
      </footer>
    </div>
  );
}

/* ------------ helpers ------------ */

function SectionHead({ title, sub, step, eyebrow }: { title: string; sub: string; step?: string; eyebrow?: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <span className="chip mb-3 bg-(--sand)">{eyebrow}</span>}
        <h2 className="text-display text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
      </div>
      {step && <span className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground sm:block">Step {step}</span>}
    </div>
  );
}

function Marquee<T>({ items, render, speed, reverse }: {
  items: T[]; render: (item: T, i: number) => React.ReactNode; speed?: "slow"; reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-wrap relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-(--color-background) to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-(--color-background) to-transparent" />
      <div className={`marquee-track ${speed === "slow" ? "slow" : ""}`} style={reverse ? { animationDirection: "reverse" } : undefined}>
        {doubled.map((it, i) => (
          <div key={i} className="w-70 shrink-0">{render(it, i % items.length)}</div>
        ))}
      </div>
    </div>
  );
}

function SightCard({ poi, rank }: { poi: EnrichedAttraction; rank: number }) {
  return (
    <Link href={`/trip/${poi.stateSlug}/${poi.placeSlug}`}
      className="group relative block h-72 overflow-hidden rounded-3xl shadow-[0_18px_40px_-24px_rgba(40,20,10,0.35)]">
      <img 
        src={poi.image} 
        alt={poi.name} 
        loading="lazy" 
        className="h-full w-full absolute inset-0 object-cover transition duration-700 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-transparent" />
      <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white text-[15px] font-bold text-ink shadow">
        #{rank}
      </span>
      <span className="absolute right-3 top-3 chip border-transparent bg-primary text-white">
        <Star className="h-3 w-3 fill-current" /> {poi.rating.toFixed(1)}
      </span>
      <div className="absolute inset-x-4 bottom-4 text-white">
        <div className="text-[11px] uppercase tracking-[0.25em] opacity-80">{poi.placeName} · {poi.stateName}</div>
        <div className="text-display text-lg font-semibold leading-tight">{poi.name}</div>
      </div>
    </Link>
  );
}

function PoiTile({ poi, accent }: { poi: EnrichedAttraction; accent: string }) {
  return (
    <Link href={`/trip/${poi.stateSlug}/${poi.placeSlug}`}
      className="group flex h-72 flex-col overflow-hidden rounded-3xl border border-[color-mix(in_oklab,var(--ink)_8%,transparent)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={poi.image} 
          alt={poi.name} 
          loading="lazy" 
          className="h-full w-full absolute inset-0 object-cover transition duration-700 group-hover:scale-105" 
        />
        <span className="absolute right-3 top-3 chip border-transparent text-white" style={{ background: accent }}>
          <Star className="h-3 w-3 fill-current" /> {poi.rating.toFixed(1)}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{poi.placeName}</div>
          <div className="text-display text-[15px] font-semibold leading-tight text-ink">{poi.name}</div>
        </div>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {poi.visitMinutes}m</span>
          {poi.costINR > 0 && <span className="inline-flex items-center gap-1"><Wallet className="h-3 w-3" /> ₹{poi.costINR}</span>}
        </div>
      </div>
    </Link>
  );
}