import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import { FULL_NAV } from "../config/nav";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function MobileMenu({ open, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const focusable = () =>
      panel ? Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR)) : [];

    // Trap Tab inside the sheet and close on Escape while it is open.
    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = focusable();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const previous = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => focusable()[0]?.focus());

    // Restore scroll position and focus when the sheet closes.
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      if (previous && typeof previous.focus === "function") previous.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-sheet lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink-950/70 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-[80vw] max-w-xs border-l border-white/10 bg-ink-900 p-5"
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-lg text-fg-hi">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-md p-2 text-fg-mid transition-colors duration-fast ease-state hover:text-fg-hi"
          >
            <X size={18} />
          </button>
        </div>
        <nav aria-label="Sections mobile">
          <ul className="flex flex-col gap-1">
            {FULL_NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-md px-3 py-2.5 text-small transition-colors duration-fast ease-state ${
                      isActive
                        ? "bg-white/5 text-fg-hi"
                        : "text-fg-mid hover:text-fg-hi"
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
