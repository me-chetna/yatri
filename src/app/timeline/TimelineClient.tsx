'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Loader2, RotateCcw, Upload, Clock } from "lucide-react";
import { SideNav } from "../../components/SideNav";
import {
  identifyMonument,
  getMonumentTimeline,
  generateEraImage,
  type TimelineEra,
  type IdentificationResult
} from "./actions";

export default function TimelineClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [busy, setBusy] = useState<"idle" | "identifying" | "timeline">("idle");
  const [error, setError] = useState<string | null>(null);
  const [snapshot, setSnapshot] = useState<string | null>(null);
  const [identified, setIdentified] = useState<IdentificationResult | null>(null);
  const [eras, setEras] = useState<TimelineEra[] | null>(null);
  const [year, setYear] = useState<number>(2026);
  const [eraImages, setEraImages] = useState<Record<number, string>>({});
  const [eraImgLoading, setEraImgLoading] = useState(false);

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
      } catch (e) {
        setError(
          "Camera unavailable. You can still upload a photo of any monument."
        );
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

  const runIdentify = async (dataUrl: string) => {
    setError(null);
    setSnapshot(dataUrl);
    setIdentified(null);
    setEras(null);
    setBusy("identifying");
    try {
      const res = await identifyMonument(dataUrl);
      setIdentified(res);
      if (res.confidence < 0.25 || res.name.toLowerCase() === "unknown") {
        setError(
          "Couldn't recognise the monument confidently. Try a clearer angle or a different photo."
        );
        setBusy("idle");
        return;
      }
      setBusy("timeline");
      const tl = await getMonumentTimeline(res.name);
      setEras(tl.eras);
      const latest = tl.eras[tl.eras.length - 1]?.year ?? 2026;
      setYear(latest);
      setBusy("idle");
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setBusy("idle");
    }
  };

  const onCapture = () => {
    const url = captureDataUrl();
    if (!url) {
      setError("Camera frame not ready yet.");
      return;
    }
    void runIdentify(url);
  };

  const onFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      void runIdentify(url);
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setSnapshot(null);
    setIdentified(null);
    setEras(null);
    setError(null);
    setBusy("idle");
    setEraImages({});
  };

  const activeEra = useMemo(() => {
    if (!eras || eras.length === 0) return null;
    const past = eras.filter((e) => e.year <= year);
    if (past.length === 0) return eras[0];
    return past[past.length - 1];
  }, [eras, year]);

  const minYear = eras?.[0]?.year ?? 1500;
  const maxYear = eras?.[eras.length - 1]?.year ?? 2026;

  const ageRatio = useMemo(() => {
    if (!eras) return 0;
    const span = Math.max(1, maxYear - minYear);
    return 1 - (year - minYear) / span;
  }, [eras, year, minYear, maxYear]);

  const imageFilter = `sepia(${(ageRatio * 80).toFixed(0)}%) saturate(${(100 - ageRatio * 50).toFixed(0)}%) contrast(${(100 + ageRatio * 10).toFixed(0)}%) brightness(${(100 - ageRatio * 15).toFixed(0)}%)`;

  useEffect(() => {
    if (!identified || !activeEra) return;
    if (eraImages[activeEra.year]) return;
    let cancelled = false;
    setEraImgLoading(true);
    generateEraImage(identified.name, activeEra.year, activeEra.appearance)
      .then((res) => {
        if (cancelled) return;
        setEraImages((prev) => ({ ...prev, [activeEra.year]: res.dataUrl }));
      })
      .catch((e) => {
        console.error("era image error", e);
      })
      .finally(() => {
        if (!cancelled) setEraImgLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [identified, activeEra, eraImages]);

  const displayImage =
    eras && activeEra && eraImages[activeEra.year]
      ? eraImages[activeEra.year]
      : snapshot;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SideNav />
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-28 md:pt-10">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> Live Monument Timeline
          </div>
          <h1 className="mt-3 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
            Point. Recognise. Travel through time.
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Aim your camera at a monument. We identify it with AI, then let you
            scrub the year to see how it looked across centuries.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Camera Visual Capture Column */}
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
                  src={displayImage ?? snapshot ?? ""}
                  alt="monument"
                  className="h-full w-full object-cover transition-[filter] duration-500"
                  style={{
                    filter:
                      eras && !eraImages[activeEra?.year ?? -1]
                        ? imageFilter
                        : undefined,
                  }}
                />
              )}
              {(busy !== "idle" || eraImgLoading) && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                  <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium shadow-md">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {busy === "identifying"
                      ? "Identifying monument…"
                      : busy === "timeline"
                        ? "Loading history…"
                        : "Rendering this era…"}
                  </div>
                </div>
              )}
              {eras && (
                <div className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold backdrop-blur">
                  Year {year}
                </div>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-border p-3">
              {!snapshot ? (
                <>
                  <button
                    type="button"
                    onClick={onCapture}
                    disabled={!streaming || busy !== "idle"}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-40"
                  >
                    <Camera className="h-4 w-4" /> Capture & Identify
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
                  <RotateCcw className="h-4 w-4" /> Try another
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

          {/* Dynamic History Timeline Content Column */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            {!identified && (
              <div className="flex h-full min-h-[260px] flex-col items-center justify-center text-center text-muted-foreground">
                <Clock className="mb-3 h-10 w-10 opacity-30" />
                <p className="max-w-xs text-sm">
                  Capture a monument to unlock its living timeline — Taj Mahal,
                  Hawa Mahal, Qutub Minar, India Gate and beyond.
                </p>
              </div>
            )}

            {identified && (
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Identified
                </p>
                <h2 className="mt-1 font-display text-3xl">{identified.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {identified.location} ·{" "}
                  {(identified.confidence * 100).toFixed(0)}% confidence
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                  {identified.summary}
                </p>

                {eras && activeEra && (
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
                      <span>{minYear}</span>
                      <span className="text-foreground">{year}</span>
                      <span>{maxYear}</span>
                    </div>
                    <input
                      type="range"
                      min={minYear}
                      max={maxYear}
                      step={1}
                      value={year}
                      onChange={(e) => setYear(parseInt(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {eras.map((e) => (
                        <button
                          key={e.year}
                          onClick={() => setYear(e.year)}
                          className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition ${
                            activeEra.year === e.year
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-background text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {e.year}
                        </button>
                      ))}
                    </div>

                    <div className="mt-5 rounded-2xl border border-border bg-background/60 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                        {activeEra.year} · {activeEra.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed">
                        {activeEra.description}
                      </p>
                      <p className="mt-3 border-t border-border pt-3 text-xs italic text-muted-foreground">
                        How it looked: {activeEra.appearance}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}