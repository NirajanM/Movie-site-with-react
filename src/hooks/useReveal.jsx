import { useLayoutEffect, useRef } from "react";

/**
 * Reveals children on entry with a small stagger.
 * Returns a ref to attach to the container; mark children with `data-reveal`.
 * Collapses to visible when the user prefers reduced motion or IO is missing.
 */
export default function useReveal({
  stagger = 55,
  selector = "[data-reveal]",
  trigger,
} = {}) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll(selector));
    if (items.length === 0) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      items.forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    items.forEach((el) => el.classList.add("reveal-init"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.transitionDelay = `${Math.min(items.indexOf(el), 10) * stagger}ms`;
          el.classList.remove("reveal-init");
          el.classList.add("is-revealed");
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector, stagger, trigger]);

  return ref;
}
