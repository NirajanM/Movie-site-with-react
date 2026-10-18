import { NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { BOTTOM_TABS, FOCUS_SEARCH_EVENT } from "../config/nav";

export default function BottomTabBar() {
  // The search box lives in the header, so ask the header to open it instead
  // of duplicating a second input here.
  const focusSearch = () => {
    window.dispatchEvent(new Event(FOCUS_SEARCH_EVENT));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Primary mobile"
      className="fixed inset-x-0 bottom-0 z-nav border-t border-line/10 bg-ink-900 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {BOTTOM_TABS.map((tab) => (
          <li key={tab.to}>
            <NavLink
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2 text-[0.625rem] transition-colors duration-fast ease-state ${
                  isActive ? "text-pahelo" : "text-fg-mid hover:text-fg-hi"
                }`
              }
            >
              <tab.icon size={20} />
              {tab.label}
            </NavLink>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={focusSearch}
            className="flex w-full flex-col items-center gap-1 py-2 text-[0.625rem] text-fg-mid transition-colors duration-fast ease-state hover:text-fg-hi"
          >
            <Search size={20} />
            Search
          </button>
        </li>
      </ul>
    </nav>
  );
}
