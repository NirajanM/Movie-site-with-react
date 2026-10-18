import { useCallback } from "react";
import useReveal from "./useReveal";

/**
 * Shared behaviour for the horizontal rails (poster carousels, cast lists).
 *
 * Returns a ref to attach to the scrolling <ul> and a scrollStep(dir) helper
 * that moves one card at a time. The 16px added to the card width matches the
 * `gap-4` used on the rails; if that gap changes, update it here too.
 */
export default function useRailScroll({ trigger }) {
  const trackRef = useReveal({ trigger });

  const scrollStep = useCallback(
    (dir) => {
      const el = trackRef.current;
      if (!el) return;
      const card = el.querySelector("[data-card]");
      const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
      el.scrollBy({ left: dir === "left" ? -step : step, behavior: "smooth" });
    },
    [trackRef]
  );

  return { trackRef, scrollStep };
}
