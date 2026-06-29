"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Attraction, Place } from "../data/trip-data";

interface Props {
  place: Place;
  itinerary: string[]; // ordered ids currently in plan
  selectedId: string | null;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}

/**
 * Dynamically loads Leaflet CSS first, then Leaflet JS from CDN.
 * This guarantees the stylesheet is parsed and active before Leaflet initializes,
 * completely solving the "tiles loading in parts/disjointed column" bug.
 */
function loadLeaflet(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Cannot load Leaflet on server side"));
      return;
    }
    if ((window as any).L) {
      resolve((window as any).L);
      return;
    }

    // 1. Load Leaflet CSS first
    const cssId = "leaflet-cdn-css";
    let link = document.getElementById(cssId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initJavaScript = () => {
      // 2. Load Leaflet JS only after CSS is fully ready and parsed
      const scriptId = "leaflet-cdn-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        document.head.appendChild(script);
      }

      const handleLoad = () => {
        resolve((window as any).L);
      };

      const handleError = () => {
        reject(new Error("Failed to load Leaflet script from CDN"));
      };

      script.addEventListener("load", handleLoad);
      script.addEventListener("error", handleError);
    };

    if (link.sheet) {
      // CSS is already loaded and cached
      initJavaScript();
    } else {
      link.addEventListener("load", initJavaScript);
      link.addEventListener("error", () => reject(new Error("Failed to load Leaflet CSS")));
    }
  });
}

/**
 * Leaflet is loaded dynamically client-side to avoid SSR window references.
 */
export function TripMap({ place, itinerary, selectedId, onSelect, onToggle }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const LRef = useRef<any>(null);
  const cleanupResizeRef = useRef<(() => void) | null>(null);

  // Initialize map once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const L = await loadLeaflet();
        if (cancelled || !containerRef.current) return;
        LRef.current = L;

        // Coarse pointers (phones/tablets) get the zoom control out of the way
        // of the bottom-anchored info card, and bottom-right where thumbs reach.
        const isCompact =
          typeof window !== "undefined" &&
          (window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth < 768);

        const map = L.map(containerRef.current, {
          center: place.center,
          zoom: place.zoom,
          zoomControl: false,
          attributionControl: false,
        });
        L.control.zoom({ position: isCompact ? "bottomright" : "topleft" }).addTo(map);
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
          { maxZoom: 19 },
        ).addTo(map);
        
        mapRef.current = map;
        layerRef.current = L.layerGroup().addTo(map);
        renderMarkers();

        // Safe recalculation: Force Leaflet to re-measure size after layout has painted
        const resizeTimeout = setTimeout(() => {
          if (!cancelled && mapRef.current) {
            mapRef.current.invalidateSize();
          }
        }, 150);

        // Re-measure the map whenever the viewport changes (resize, rotation,
        // sidebar collapse/expand) so tiles don't stay clipped or off-center.
        const handleResize = () => map.invalidateSize();
        window.addEventListener("resize", handleResize);
        cleanupResizeRef.current = () => {
          window.removeEventListener("resize", handleResize);
          clearTimeout(resizeTimeout);
        };
      } catch (err) {
        console.error("Leaflet loader error:", err);
      }
    })();

    return () => {
      cancelled = true;
      cleanupResizeRef.current?.();
      cleanupResizeRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place.id]);

  const inItinerary = useMemo(() => new Set(itinerary), [itinerary]);

  const renderMarkers = () => {
    const L = LRef.current;
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!L || !map || !layer) return;
    layer.clearLayers();

    // Draw route polyline for itinerary
    const routeLatLngs = itinerary
      .map((id) => place.attractions.find((a) => a.id === id))
      .filter((a): a is Attraction => !!a)
      .map((a) => [a.lat, a.lng] as [number, number]);
    if (routeLatLngs.length > 1) {
      L.polyline(routeLatLngs, {
        color: "oklch(0.62 0.16 40)",
        weight: 3,
        opacity: 0.85,
        dashArray: "6 8",
      }).addTo(layer);
    }

    place.attractions.forEach((a) => {
      const order = itinerary.indexOf(a.id);
      const active = inItinerary.has(a.id);
      const selected = selectedId === a.id;

      // Wellness gets a calming violet pin so it visually stands apart
      // from sights (orange), restaurants (brown), and markets (gold).
      const color =
        a.type === "restaurant"
          ? "#c97a3a"
          : a.type === "market"
          ? "#b8860b"
          : a.type === "wellness"
          ? "#7c3aed"
          : active
          ? "oklch(0.62 0.16 40)"
          : "#6b7280";

      const pinContent =
        active && order >= 0
          ? order + 1
          : a.type === "restaurant"
          ? "🍽"
          : a.type === "market"
          ? "🛍"
          : a.type === "wellness"
          ? "🧘"
          : "•";

      const html = `
        <div class="map-pin ${selected ? "selected" : ""} ${active ? "active" : ""}" style="--c:${color}">
          <div class="pin-dot">${pinContent}</div>
          <div class="pin-label">${a.name}</div>
        </div>`;
      const icon = L.divIcon({
        html,
        className: "map-pin-wrap",
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });
      const m = L.marker([a.lat, a.lng], { icon }).addTo(layer);
      m.on("click", () => onSelect(a.id));
      // On desktop this fires on right-click. On touch devices Leaflet's
      // built-in long-press handling simulates the same "contextmenu"
      // event, so this also doubles as the mobile add/remove gesture.
      m.on("contextmenu", (e: any) => {
        e.originalEvent.preventDefault();
        onToggle(a.id);
      });
    });
  };

  useEffect(() => {
    renderMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itinerary, selectedId, place.id]);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
      <style>{`
        .leaflet-container { background: #f1ece4; font-family: inherit; }
        .map-pin-wrap { background: transparent !important; border: none !important; }
        .map-pin {
          position: relative;
          transform: translate(-50%, -100%);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          cursor: pointer;
        }
        .pin-dot {
          width: 30px; height: 30px; border-radius: 50% 50% 50% 0;
          background: var(--c); color: white;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600;
          transform: rotate(-45deg);
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          border: 2px solid white;
        }
        .pin-dot > * { transform: rotate(45deg); }
        .pin-dot { line-height: 1; }
        .map-pin .pin-dot { transition: transform .2s ease; }
        .map-pin:hover .pin-dot { transform: rotate(-45deg) scale(1.1); }
        .map-pin.selected .pin-dot {
          transform: rotate(-45deg) scale(1.25);
          box-shadow: 0 0 0 4px oklch(0.78 0.13 80 / 0.5), 0 4px 14px rgba(0,0,0,.3);
        }
        .pin-label {
          background: white; color: #2a1f17;
          padding: 2px 8px; border-radius: 999px;
          font-size: 11px; font-weight: 500;
          white-space: nowrap;
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          opacity: 0; transition: opacity .15s ease;
        }
        .map-pin:hover .pin-label, .map-pin.selected .pin-label, .map-pin.active .pin-label { opacity: 1; }

        /* Touch devices: no hover, so make tap targets a little bigger and
           keep labels from overrunning narrow phone screens. */
        @media (pointer: coarse) {
          .pin-dot { width: 34px; height: 34px; font-size: 14px; }
          .pin-label { max-width: 40vw; font-size: 10.5px; }
        }
      `}</style>
    </>
  );
}

export default TripMap;