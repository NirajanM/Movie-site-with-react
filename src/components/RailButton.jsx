import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * The left/right arrows shown over a horizontal rail. Fades in when the rail
 * group is hovered or the button itself is focused. Hidden on small screens,
 * where swiping is used instead.
 */
export default function RailButton({ dir, onClick }) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={`Scroll ${dir}`}
      onClick={onClick}
      className={`absolute top-1/3 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-md border border-line/10 bg-ink-900/90 text-fg-mid opacity-0 transition duration-base ease-state hover:text-fg-hi focus-visible:opacity-100 group-hover/rail:opacity-100 md:grid ${
        dir === "left" ? "left-0" : "right-0"
      }`}
    >
      <Icon size={18} />
    </button>
  );
}
