import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu as MenuIcon, Search } from "lucide-react";
import Logo from "../assets/LetsWatchMovie.png";
import MobileMenu from "./MobileMenu";
import { FOCUS_SEARCH_EVENT, MAIN_NAV } from "../config/nav";
import { isTypingTarget } from "../utils/keyboard";

export default function Header() {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Open the search box and put the cursor in it. Stable so it can be reused
  // by the click handler, the "/" shortcut and the bottom tab bar event.
  const openSearch = useCallback(() => {
    setSearchOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !isTypingTarget() && !menuOpen) {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(FOCUS_SEARCH_EVENT, openSearch);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(FOCUS_SEARCH_EVENT, openSearch);
    };
  }, [menuOpen, openSearch]);

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search/${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <>
      <header className="sticky top-0 z-nav border-b border-white/10 bg-ink-900/[0.72] backdrop-blur-[14px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-3 px-4 lg:px-6">
          <NavLink
            to="/"
            className="flex items-center gap-2"
            aria-label="LetsWatchMovie home"
          >
            <img src={Logo} alt="" className="h-9 w-9" />
            <span className="hidden font-display text-lg font-semibold tracking-tight text-fg-hi sm:block">
              LetsWatchMovie
            </span>
          </NavLink>

          <nav aria-label="Primary" className="ml-2 hidden items-center md:flex">
            {MAIN_NAV.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `group relative rounded-md px-3 py-2 text-small transition-colors duration-fast ease-state ${
                    isActive ? "text-fg-hi" : "text-fg-mid hover:text-fg-hi"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-pahelo transition-transform duration-base ease-state ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <form onSubmit={submit} className="ml-auto flex items-center">
            <div
              className={`flex items-center overflow-hidden rounded-md border border-white/10 bg-ink-850 transition-[width] duration-base ease-state ${
                searchOpen ? "w-52 sm:w-64" : "w-10"
              }`}
            >
              <button
                type="button"
                aria-label="Search"
                aria-expanded={searchOpen}
                onClick={() => (searchOpen ? setSearchOpen(false) : openSearch())}
                className="grid h-10 w-10 shrink-0 place-items-center text-fg-mid transition-colors duration-fast ease-state hover:text-fg-hi"
              >
                <Search size={18} />
              </button>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies and TV"
                aria-label="Search movies and TV shows"
                className={`h-10 w-full bg-transparent pr-3 text-small text-fg-hi placeholder:text-fg-low focus:outline-none ${
                  searchOpen ? "block" : "hidden"
                }`}
              />
            </div>
          </form>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md text-fg-mid transition-colors duration-fast ease-state hover:text-fg-hi lg:hidden"
          >
            <MenuIcon size={20} />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
