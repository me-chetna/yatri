'use client';

import { useEffect, useRef, useState } from "react";
import {
  Apple,
  Camera,
  Loader2,
  RotateCcw,
  Upload,
  Leaf,
  AlertTriangle,
  MapPin,
  Sparkles,
} from "lucide-react";
import { SideNav } from "../../components/SideNav";
import { scanFoodItem, type FoodScanResult } from "./actions";

export default function FoodScanClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [result, setResult] = useState<FoodScanResult | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    (async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setStreaming(true);
        }
      } catch {
        setError("Camera unavailable. Upload a photo of the packaging instead.");
      }
    })();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const captureDataUrl = (): string | null => {
    const v = videoRef.current;
    if (!v || !v.videoWidth) return null;
    const canvas = document.createElement("canvas");
    const maxW = 1024;
    const scale = Math.min(1, maxW / v.videoWidth);
    canvas.width = v.videoWidth * scale;
    canvas.height = v.videoHeight * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.82);
  };

  const runScan = async (dataUrl: string) => {
    setError(null);
    setSnapshot(dataUrl);
    setResult(null);
    setBusy(true);
    try {
      // Execute standard Next.js Server Action directly
      const res = await scanFoodItem(dataUrl);
      setResult(res);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Scan failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const onCapture = () => {
    const url = captureDataUrl();
    if (!url) {
      setError("Camera frame not ready yet.");
      return;
    }
    void runScan(url);
  };

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => void runScan(reader.result as string);
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setSnapshot(null);
    setResult(null);
    setError(null);
    setBusy(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SideNav />
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-28 md:pt-10">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> AI Snack Coach
          </div>
          <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            Scan the wrapper. Get smarter trip snacks.
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Point your camera at any packaged food and we'll suggest healthier,
            travel-friendly alternatives that actually survive the journey.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Camera Viewport Container */}
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="relative aspect-[4/3] w-full bg-muted">
              {!snapshot ? (
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={snapshot}
                  alt="scanned food"
                  className="h-full w-full object-cover"
                />
              )}
              {busy && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium shadow-md">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analysing snack…
                  </div>
                </div>
              )}
              {!snapshot && (
                <div className="pointer-events-none absolute inset-6 rounded-2xl border-2 border-dashed border-white/60" />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-border p-3">
              {!snapshot ? (
                <>
                  <button
                    type="button"
                    onClick={onCapture}
                    disabled={!streaming || busy}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-40"
                  >
                    <Camera className="h-4 w-4" /> Scan item
                  </button>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
                  >
                    <Upload className="h-4 w-4" /> Upload photo
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <RotateCcw className="h-4 w-4" /> Scan another
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onFile(f);
                  e.target.value = "";
                }}
              />
              {error && (
                <span className="ml-1 text-xs text-destructive">{error}</span>
              )}
            </div>
          </div>

          {/* Evaluation Results Card */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            {!result && !busy && (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center text-muted-foreground">
                <Apple className="mb-3 h-10 w-10 opacity-30" />
                <p className="max-w-xs text-sm">
                  Scan any chips packet, cold drink, biscuits or instant noodles
                  to see healthier swaps for your trip.
                </p>
              </div>
            )}

            {result && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Scanned product
                </p>
                <h2 className="mt-1 font-display text-3xl">
                  {result.productName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {result.category}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <RatingChip
                    label="Health"
                    value={result.healthRating}
                    icon={<Leaf className="h-3.5 w-3.5" />}
                  />
                  <RatingChip
                    label="Trip-friendly"
                    value={result.travelRating}
                    icon={<MapPin className="h-3.5 w-3.5" />}
                  />
                </div>

                {result.concerns?.length > 0 && (
                  <div className="mt-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-3">
                    <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-destructive">
                      <AlertTriangle className="h-3.5 w-3.5" /> Why skip on trips
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      {result.concerns.map((c, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-destructive" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {result?.alternatives?.length ? (
          <section className="mt-10">
            <h3 className="font-display text-2xl">
              Better picks for the road
            </h3>
            <p className="text-sm text-muted-foreground">
              Hand-picked swaps that travel well and keep your energy up.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {result.alternatives.map((alt, i) => (
                <div
                  key={i}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                      {alt.tripScore}/10
                    </span>
                  </div>
                  <h4 className="mt-3 font-display text-lg leading-tight">
                    {alt.name}
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {alt.reason}
                  </p>
                  <ul className="mt-3 space-y-1 text-xs">
                    {alt.benefits.map((b, j) => (
                      <li key={j} className="flex gap-1.5">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto pt-3 text-[11px] font-medium text-muted-foreground">
                    <MapPin className="mr-1 inline h-3 w-3" />
                    {alt.whereToFind}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function RatingChip({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  const pct = Math.max(0, Math.min(10, value)) * 10;
  const tone =
    value >= 7
      ? "text-emerald-600"
      : value >= 4
        ? "text-amber-600"
        : "text-destructive";
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-3">
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span className="inline-flex items-center gap-1">{icon} {label}</span>
        <span className={`font-semibold ${tone}`}>{value}/10</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}