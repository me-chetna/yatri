'use client';

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Send, Trash2, MessageCircle, ArrowLeft, Loader2 } from "lucide-react";
import { SideNav } from "../../../components/SideNav";
import { askTourismBot, type ChatMsg } from "../actions";

interface ThreadMeta {
  id: string;
  title: string;
  updatedAt: number;
}

interface StoredMsg {
  role: "user" | "assistant";
  content: string;
}

const THREADS_KEY = "yatri:threads";
const msgsKey = (id: string) => `yatri:msgs:${id}`;

function loadThreads(): ThreadMeta[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(THREADS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveThreads(t: ThreadMeta[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(THREADS_KEY, JSON.stringify(t));
}

function loadMsgs(id: string): StoredMsg[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(msgsKey(id)) || "[]");
  } catch {
    return [];
  }
}

function saveMsgs(id: string, m: StoredMsg[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(msgsKey(id), JSON.stringify(m));
}

function newId() {
  return "t_" + Math.random().toString(36).slice(2, 10);
}

// Minimal markdown parsing utilities to avoid large downstream libraries
function renderMd(text: string) {
  const esc = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
    
  return esc
    .replace(/`([^`]+)`/g, '<code class="rounded bg-muted px-1 py-0.5 text-[0.85em]">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*\n]+)\*/g, "<em>$1</em>")
    .replace(/^\s*[-*]\s+(.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul class="my-2 ml-5 list-disc space-y-1">$1</ul>')
    .replace(/\n{2,}/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

interface ChatClientProps {
  threadId: string;
}

export default function ChatClient({ threadId }: ChatClientProps) {
  const router = useRouter();

  const [threads, setThreads] = useState<ThreadMeta[]>([]);
  const [messages, setMessages] = useState<StoredMsg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Synchronize threads on mounting and when active thread changes
  useEffect(() => {
    const t = loadThreads();
    if (!t.find((x) => x.id === threadId)) {
      const next: ThreadMeta = { id: threadId, title: "New chat", updatedAt: Date.now() };
      const merged = [next, ...t];
      saveThreads(merged);
      setThreads(merged);
    } else {
      setThreads(t);
    }
    setMessages(loadMsgs(threadId));
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 30);
  }, [threadId]);

  // Handle automatic scrolling to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, busy]);

  function createThread() {
    const id = newId();
    const meta: ThreadMeta = { id, title: "New chat", updatedAt: Date.now() };
    const next = [meta, ...loadThreads()];
    saveThreads(next);
    router.push(`/chatbot/${id}`);
  }

  function deleteThread(id: string) {
    const next = loadThreads().filter((t) => t.id !== id);
    saveThreads(next);
    localStorage.removeItem(msgsKey(id));
    setThreads(next);
    if (id === threadId) {
      if (next[0]) {
        router.push(`/chatbot/${next[0].id}`);
      } else {
        router.push("/chatbot");
      }
    }
  }

  async function send(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    
    setError(null);
    const userMsg: StoredMsg = { role: "user", content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    saveMsgs(threadId, next);
    setInput("");
    setBusy(true);

    // Dynamic thread title generator based on the initial prompt
    const allThreads = loadThreads().map((t) =>
      t.id === threadId
        ? { ...t, title: messages.length === 0 ? text.slice(0, 40) : t.title, updatedAt: Date.now() }
        : t
    );
    saveThreads(allThreads);
    setThreads(allThreads);

    try {
      const payload: ChatMsg[] = next.map((m) => ({ role: m.role, content: m.content }));
      const { reply } = await askTourismBot(payload);
      const updated = [...next, { role: "assistant" as const, content: reply }];
      setMessages(updated);
      saveMsgs(threadId, updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }

  const suggestions = [
    "Best time to visit Ladakh and what to pack",
    "History of the Hampi ruins in 5 bullet points",
    "Signature street foods of Old Delhi I must try",
    "Traditional dress and dances of Rajasthan",
  ];

  return (
    <div className="min-h-screen bg-background paper-grain">
      <SideNav />

      <div className="flex h-screen pb-20 md:pb-0">
        {/* Thread Sidebar Panel */}
        <aside className="hidden w-72 shrink-0 border-r border-border/60 bg-card/40 p-3 md:flex md:flex-col">
          <div className="mb-3 flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Link>
            <button
              onClick={createThread}
              className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              <Plus className="h-3.5 w-3.5" /> New
            </button>
          </div>
          <div className="mb-2 px-1 font-display text-lg">Yatri</div>
          <div className="mb-3 px-1 text-xs text-muted-foreground">Your travel companion</div>
          <div className="flex-1 space-y-1 overflow-y-auto pr-1">
            {threads.length === 0 && (
              <div className="px-2 py-6 text-center text-xs text-muted-foreground">No chats yet</div>
            )}
            {threads.map((t) => {
              const active = t.id === threadId;
              return (
                <div key={t.id} className={`group flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm transition ${
                  active ? "bg-primary/10 text-foreground animate-fade-in" : "text-muted-foreground hover:bg-muted/60"
                }`}>
                  <button
                    type="button"
                    onClick={() => router.push(`/chatbot/${t.id}`)}
                    className="flex flex-1 items-center gap-2 truncate text-left"
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{t.title || "New chat"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteThread(t.id)}
                    className="opacity-0 transition group-hover:opacity-100"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Core Chat Stream Panel */}
        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-border/60 px-5 py-3">
            <div>
              <div className="font-display text-lg leading-tight">Ask Yatri</div>
              <div className="text-xs text-muted-foreground">History · culture · food · packing · itineraries</div>
            </div>
            <button
              onClick={createThread}
              className="md:hidden inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground"
            >
              <Plus className="h-3.5 w-3.5" /> New
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
            <div className="mx-auto max-w-2xl space-y-5">
              {messages.length === 0 && (
                <div className="rounded-2xl border border-border/50 bg-card/40 p-6">
                  <div className="font-display text-xl">Namaste, fellow traveller 🌿</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ask me anything about a place — history, what to eat, what to wear, what to pack for the trip.
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setInput(s)}
                        className="rounded-lg border border-border/60 px-3 py-2 text-left text-sm text-foreground/80 transition hover:border-primary/60 hover:bg-primary/5"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div 
                  key={`msg-${m.role}-${i}`} 
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  {m.role === "user" ? (
                    <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground">
                      {m.content}
                    </div>
                  ) : (
                    <div
                      className="max-w-[90%] text-sm leading-relaxed text-foreground"
                      dangerouslySetInnerHTML={{ __html: renderMd(m.content) }}
                    />
                  )}
                </div>
              ))}

              {busy && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Yatri is thinking…
                </div>
              )}
              {error && (
                <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error}
                </div>
              )}
            </div>
          </div>

          <form onSubmit={send} className="border-t border-border/60 bg-background/80 px-4 py-3 backdrop-blur">
            <div className="mx-auto flex max-w-2xl items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(e as unknown as FormEvent);
                  }
                }}
                placeholder="Ask about a destination, food, packing list…"
                rows={1}
                className="flex-1 resize-none rounded-2xl border border-border/60 bg-card/60 px-4 py-2.5 text-sm outline-none focus:border-primary/60"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
                title="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}