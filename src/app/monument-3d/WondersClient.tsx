'use client';

import { useEffect, useMemo, useState } from "react";
import { 
  Globe, 
  X, 
  Play, 
  Pause, 
  Mic, 
  Volume2, 
  ZoomIn, 
  Search, 
  Loader2 
} from "lucide-react";
import { SideNav } from "../../components/SideNav";
import { WONDERS, type WonderData, type CultureTopic } from "../../data/monuments-data";
import { getMonumentCulture, type CultureInfo, type TopicData } from "./actions";

const TOPIC_META: Record<CultureTopic, { label: string; color: string }> = {
  history: { label: "History",           color: "#60a5fa" },
  past:    { label: "Legends",           color: "#a78bfa" },
  culture: { label: "Culture",           color: "#f472b6" },
  cuisine: { label: "Cuisine",           color: "#fb923c" },
  food:    { label: "Signature Food",   color: "#facc15" },
  dance:   { label: "Dance",            color: "#34d399" },
  dress:   { label: "Traditional Dress",color: "#22d3ee" },
};

const TOPIC_ORDER: CultureTopic[] = [
  "history", "past", "culture", "cuisine", "food", "dance", "dress",
];

function pickFemaleVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const preferred = [
    /female/i, /zira/i, /samantha/i, /victoria/i, /tessa/i, /karen/i,
    /google.*(uk|us).*english/i, /heera|priya|veena|aditi|raveena/i,
  ];
  for (const re of preferred) {
    const v = voices.find((v) => re.test(v.name));
    if (v) return v;
  }
  return voices.find((v) => v.lang.startsWith("en")) ?? voices[0];
}

function ImageModal({ imageUrl, imageAlt, onClose }: {
  imageUrl: string; imageAlt: string; onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative mx-4 max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl border border-white/20 bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button" onClick={onClose}
          className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/70 text-white backdrop-blur hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
        <img src={imageUrl} alt={imageAlt}
          className="max-h-[80vh] w-full object-contain" loading="lazy" />
        <p className="bg-black/60 px-4 py-2 text-center text-xs text-white/60">{imageAlt}</p>
      </div>
    </div>
  );
}

function VideoPlayer({ wonder, videoUrl }: { wonder: WonderData | CultureInfo; videoUrl?: string }) {
  const isCustom = !('videoUrl' in wonder);
  
  // Detect if videoUrl is a local asset
  const isLocalVideo = useMemo(() => {
    if (!videoUrl) return false;
    return (
      videoUrl.startsWith("/") || 
      videoUrl.endsWith(".mp4") || 
      videoUrl.endsWith(".webm") || 
      videoUrl.endsWith(".ogg")
    );
  }, [videoUrl]);

  // Append parameters to YouTube videos to force muted autoplay and hide controls
  const processedVideoUrl = useMemo(() => {
    if (!videoUrl || isLocalVideo) return videoUrl;
    try {
      const url = new URL(videoUrl);
      url.searchParams.set("controls", "0");
      url.searchParams.set("mute", "1");
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("loop", "1");
      return url.toString();
    } catch {
      const separator = videoUrl.includes("?") ? "&" : "?";
      let res = videoUrl;
      if (!res.includes("controls=")) res += `${separator}controls=0`;
      if (!res.includes("mute=")) res += `&mute=1`;
      if (!res.includes("autoplay=")) res += `&autoplay=1`;
      return res;
    }
  }, [videoUrl, isLocalVideo]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0617] shadow-2xl">
      <div className="aspect-video w-full relative">
        {isCustom || !videoUrl ? (
          <img 
            src={Object.values(wonder.topics)[0].imageUrl} 
            alt={('name' in wonder) ? wonder.name : wonder.monument}
            className="h-full w-full object-cover brightness-75"
          />
        ) : isLocalVideo ? (
          <video
            key={wonder.id}
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover pointer-events-none"
          />
        ) : (
          <iframe
            key={wonder.id}
            src={processedVideoUrl}
            title={`${wonder.name} video`}
            className="h-full w-full pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4 pointer-events-none">
        <p className="text-xs uppercase tracking-widest text-white/50">{wonder.region}</p>
        <p className="font-semibold text-white text-lg">{('id' in wonder) ? wonder.name : wonder.monument}</p>
      </div>
    </div>
  );
}

export default function WondersPage() {
  const [wonder, setWonder] = useState<WonderData | CultureInfo>(WONDERS[0]);
  const [activeTopic, setActiveTopic] = useState<CultureTopic | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [voiceReady, setVoiceReady] = useState(false);
  const [imageModal, setImageModal] = useState<{ url: string; alt: string } | null>(null);
  
  // Custom AI Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const handle = () => setVoiceReady(true);
    window.speechSynthesis.onvoiceschanged = handle;
    if (window.speechSynthesis.getVoices().length > 0) setVoiceReady(true);
    return () => { 
      window.speechSynthesis.onvoiceschanged = null; 
      window.speechSynthesis.cancel(); 
    };
  }, []);

  useEffect(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setActiveTopic(null);
  }, [wonder]);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickFemaleVoice();
    if (v) u.voice = v;
    u.rate = 0.97; u.pitch = 1.12;
    u.onstart = () => setSpeaking(true);
    u.onend   = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  };

  const stopSpeak = () => { 
    window.speechSynthesis?.cancel(); 
    setSpeaking(false); 
  };

  const openTopic = (t: CultureTopic) => {
    setActiveTopic(t);
    const narration = wonder.topics[t]?.narration;
    if (narration) speak(narration);
  };

  const closeTopic = () => { 
    setActiveTopic(null); 
    stopSpeak(); 
  };

  // Perform dynamic AI query using the Next.js Server Action
  async function handleAISearch(e: React.FormEvent) {
    e.preventDefault();
    if (!searchQuery.trim() || loadingCustom) return;
    
    setLoadingCustom(true);
    setError(null);
    try {
      const data = await getMonumentCulture(searchQuery);
      setWonder(data);
      setSearchQuery("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoadingCustom(false);
    }
  }

  const topic = activeTopic ? (wonder.topics[activeTopic] as TopicData | undefined) : null;
  const isCustom = !('id' in wonder);

  return (
    <div className="min-h-screen bg-[#0c0820] text-foreground">
      <SideNav />

      {imageModal && (
        <ImageModal imageUrl={imageModal.url} imageAlt={imageModal.alt}
          onClose={() => setImageModal(null)} />
      )}

      <div className="mx-auto max-w-7xl px-4 pt-6 pb-28 md:pt-8">

        {/* Header Grid */}
        <header className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
              <Globe className="h-3.5 w-3.5" /> 7 Wonders & Global Landmarks
            </div>
            <h1 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              Explore {isCustom ? (wonder as CultureInfo).monument : wonder.name}.<br />
              <span className="text-white/50 text-xl md:text-2xl">{wonder.region}</span>
            </h1>
            <p className="mt-2 text-sm text-white/50">
              Select a wonder, tap a topic, or use AI to explore any monument in the world.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search Bar */}
            <form onSubmit={handleAISearch} className="relative flex items-center shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any monument (AI)..."
                disabled={loadingCustom}
                className="w-full rounded-full border border-white/10 bg-white/5 pl-4 pr-10 py-2.5 text-xs text-white outline-none focus:border-pink-500 sm:w-60"
              />
              <button
                type="submit"
                disabled={loadingCustom || !searchQuery.trim()}
                className="absolute right-2 grid h-8 w-8 place-items-center rounded-full bg-white text-black hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {loadingCustom ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Search className="h-3.5 w-3.5" />}
              </button>
            </form>

            {/* Wonders list */}
            <div className="flex flex-wrap gap-1.5 justify-start lg:justify-end max-w-lg">
              {WONDERS.map((w) => (
                <button
                  key={w.id} type="button" 
                  onClick={() => {
                    setWonder(w);
                    setError(null);
                  }}
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition ${
                    (!isCustom && wonder.id === w.id)
                      ? "border-white bg-white text-black"
                      : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {w.name}
                </button>
              ))}
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-400 max-w-xl">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">

          {/* ── Visual Media Player ── */}
          <VideoPlayer wonder={wonder} videoUrl={isCustom ? undefined : (wonder as WonderData).videoUrl} />

          {/* ── Guide Panel ── */}
          <div className="flex flex-col gap-4">

            {/* Guide Profile */}
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur shadow-lg">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-pink-400 via-fuchsia-500 to-indigo-500 ring-2 ring-white/20">
                <div className="absolute inset-0 grid place-items-center text-2xl">👩🏽‍🦱</div>
                {speaking && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-pink-400/40" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wider text-white/50">Your guide</p>
                <p className="font-display text-lg text-white">Meera</p>
                <p className="text-xs text-white/60">
                  {speaking
                    ? "Narrating…"
                    : topic
                      ? `Telling you about ${TOPIC_META[activeTopic!].label}`
                      : `Ready for ${isCustom ? (wonder as CultureInfo).monument : wonder.name}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => { 
                  if (speaking) stopSpeak(); 
                  else if (topic) speak(topic.narration); 
                }}
                disabled={!topic}
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-black disabled:opacity-40 transition"
                title={speaking ? "Pause" : "Play narration"}
              >
                {speaking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
            </div>

            {/* Topic Information Card */}
            <div className="min-h-55 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur shadow-sm">
              {!activeTopic && (
                <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                  <Mic className="mx-auto mb-3 h-8 w-8 text-white/30" />
                  <p className="text-sm text-white/60">
                    Select a topic below. Meera will narrate history, legends,
                    culture, dance, dress and food — and show you an image.
                  </p>
                </div>
              )}

              {activeTopic && topic && (
                <div>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div>
                      <span
                        className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                        style={{
                          backgroundColor: TOPIC_META[activeTopic].color + "28",
                          color: TOPIC_META[activeTopic].color,
                        }}
                      >
                        {TOPIC_META[activeTopic].label}
                      </span>
                      <h2 className="mt-2 font-display text-xl text-white">{topic.title}</h2>
                    </div>
                    <button type="button" onClick={closeTopic}
                      className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white">
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Topic image preview */}
                  <button
                    type="button"
                    className="group relative mb-4 w-full overflow-hidden rounded-2xl bg-muted"
                    onClick={() => setImageModal({ url: topic.imageUrl, alt: topic.imageAlt })}
                  >
                    <img src={topic.imageUrl} alt={topic.imageAlt}
                      className="h-44 w-full object-cover transition duration-300 group-hover:brightness-110"
                      loading="lazy" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-200 group-hover:opacity-100">
                      <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur">
                        <ZoomIn className="h-3.5 w-3.5" /> View full image
                      </div>
                    </div>
                  </button>

                  <p className="text-sm leading-relaxed text-white/80">{topic.body}</p>

                  <div className="mt-4 flex items-start gap-2 rounded-2xl border border-white/10 bg-black/30 p-3 text-xs text-white/55">
                    <Volume2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pink-400" />
                    <span className="italic">{topic.narration}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Topic Navigation Buttons Grid */}
            <div className="grid grid-cols-2 gap-2">
              {TOPIC_ORDER.map((t) => (
                <button
                  key={t} type="button" onClick={() => openTopic(t)}
                  className={`flex items-center gap-2 rounded-2xl border px-3 py-2 text-left text-xs font-medium transition ${
                    activeTopic === t
                      ? "border-white bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/65 hover:bg-white/10"
                  }`}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: TOPIC_META[t].color }} />
                  {TOPIC_META[t].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}