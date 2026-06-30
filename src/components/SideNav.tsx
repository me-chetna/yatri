"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Map,
  Clock,
  Boxes,
  Apple,
  MessageCircle,
  User,
  Menu,
  X,
} from "lucide-react";

const items = [
  { icon: Compass, label: "Explore", to: "/" },
  { icon: Boxes, label: "7 wonder", to: "/monument-3d" },
  { icon: Apple, label: "Food Scan", to: "/food-scan" },
  { icon: Clock, label: "Timeline", to: "/timeline" },
  { icon: MessageCircle, label: "Ask Yatri", to: "/chatbot" },
  { icon: Map, label: "My Trips", to: "/trips" },
  { icon: User, label: "Profile", to: "/profile" },
];

export function SideNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[1000] flex items-center gap-2 sm:right-auto sm:bottom-5 sm:left-5 sm:gap-3">
      {/* Menu Toggle Trigger Button */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full shadow-[0_18px_40px_-12px_rgba(180,80,30,0.4)] transition-all sm:h-14 sm:w-14 text-primary-foreground ${
          open
            ? "bg-primary rotate-90"
            : "bg-ink hover:bg-primary hover:scale-105 dark:bg-card dark:text-foreground dark:hover:bg-primary dark:hover:text-primary-foreground"
        }`}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Floating Pill Nav Dock */}
      <div
        className={`flex min-w-0 flex-1 items-center gap-1 overflow-x-auto rounded-full bg-ink px-2 shadow-[0_18px_40px_-16px_rgba(40,20,10,0.5)] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-none dark:bg-card dark:border dark:border-border ${
          open
            ? "max-w-[640px] py-2 opacity-100"
            : "pointer-events-none max-w-0 px-0 py-0 opacity-0"
        }`}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;

          return (
            <Link
              key={item.to}
              href={item.to}
              onClick={() => setOpen(false)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-colors sm:text-sm ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-primary-foreground/85 hover:bg-white/10 hover:text-primary-foreground dark:text-muted-foreground dark:hover:bg-muted/50 dark:hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}