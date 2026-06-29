'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { SideNav } from "../../../components/SideNav";
import { type Place, type State } from "../../../data/trip-data";

const RELIABLE_FALLBACKS = [
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80", // Taj Mahal
  "https://images.unsplash.com/photo-1506461883276-594a12b11cc3?auto=format&fit=crop&w=800&q=80", // Mountains
  "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80", // Temple
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80", // Greenery
];

interface SafeImageProps {
  src: string;
  alt: string;
  fallbackIndex?: number;
  className?: string;
  loading?: "lazy" | "eager";
}

function SafeImage({ src, alt, fallbackIndex = 0, className, loading = "lazy" }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading={loading}
      className={className}
      onError={() => {
        // Fallback to beautiful default images in case Unsplash 404s
        setImgSrc(RELIABLE_FALLBACKS[fallbackIndex % RELIABLE_FALLBACKS.length]);
      }}
    />
  );
}

interface StateClientProps {
  state: State;
}

export default function StateClient({ state }: StateClientProps) {
  return (
    <div className="min-h-screen bg-background paper-grain">
      <SideNav />

      {/* Header with state visual background */}
      <header className="relative isolate h-[55vh] min-h-[420px] overflow-hidden">
        <SafeImage
          src={state.image}
          alt={state.name}
          loading="eager"
          fallbackIndex={1}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div 
          className="absolute inset-0 opacity-55 mix-blend-multiply" 
          style={{ background: state.gradient }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-14">
          <Link 
            href="/" 
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white backdrop-blur transition hover:bg-white/25"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All states
          </Link>
          <div className="text-xs uppercase tracking-[0.3em] text-white/80">Step 02 · {state.tagline}</div>
          <h1 className="mt-2 font-display text-6xl text-white drop-shadow-lg md:text-8xl">{state.name}</h1>
          <p className="mt-3 max-w-xl text-white/90">{state.vibe}</p>
        </div>
      </header>

      {/* Cities exploration grid */}
      <section className="mx-auto max-w-7xl px-6 pb-32 pt-16">
        <h2 className="font-display text-3xl text-foreground md:text-4xl">
          Pick a city to plan
        </h2>
        <p className="mt-2 text-muted-foreground">
          We've curated maps and starter itineraries for each.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {state.places.map((p: Place, i: number) => (
            <Link
              key={p.id}
              href={`/trip/${state.id}/${p.id}`}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <SafeImage 
                  src={p.image} 
                  alt={p.name} 
                  fallbackIndex={i}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-foreground">
                  City {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="flex items-center justify-between gap-6 p-6">
                <div>
                  <h3 className="font-display text-3xl text-foreground">{p.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {p.attractions.length} curated spots · {p.defaultItinerary.length}-day starter plan
                  </div>
                </div>
                <div className="rounded-full bg-primary p-3 text-primary-foreground transition group-hover:translate-x-1">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}