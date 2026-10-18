import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Toggles the `.dark` class on <html>. The initial value is set before paint
 * by the inline script in index.html (stored choice, else system preference),
 * so this only needs to read it back and persist changes.
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof document === "undefined"
      ? false
      : document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Ignore storage failures (private mode, etc).
    }
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((value) => !value)}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-fg-mid transition-colors duration-fast ease-state hover:text-fg-hi"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
