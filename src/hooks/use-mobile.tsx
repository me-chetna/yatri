"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * A Next.js-safe hook that detects if the current screen size is mobile.
 * It prevents server-side rendering (SSR) hydration mismatch warnings
 * by only evaluating the media query once mounted on the client.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Set up media query list to match standard Tailwind max-width breakpoints
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      setIsMobile(mql.matches);
    };

    // Set the initial mobile state immediately after client-side mounting
    setIsMobile(mql.matches);

    // Listen to window size changes dynamically
    mql.addEventListener("change", onChange);
    
    // Clean up event listener on unmount
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}