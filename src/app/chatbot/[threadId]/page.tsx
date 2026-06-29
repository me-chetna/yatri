'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function newId() {
  return "t_" + Math.random().toString(36).slice(2, 10);
}

export default function ChatbotIndex() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let id: string | null = null;
    try {
      const raw = localStorage.getItem("yatri:threads");
      const arr = raw ? (JSON.parse(raw) as Array<{ id: string }>) : [];
      id = arr[0]?.id ?? null;
    } catch (err) {
      console.error("Failed to read threads from localStorage", err);
    }

    // If there is no existing thread, create a default first thread
    if (!id) {
      id = newId();
      const seed = [{ id, title: "New chat", updatedAt: Date.now() }];
      localStorage.setItem("yatri:threads", JSON.stringify(seed));
    }

    // Redirect to the dynamic thread page route immediately
    router.replace(`/chatbot/${id}`);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
      Loading Yatri…
    </div>
  );
}