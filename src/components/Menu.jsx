import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { FULL_NAV } from "../config/nav";

export default function Menu() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`sticky top-16 hidden shrink-0 border-r border-line/10 pr-4 pt-4 lg:block ${
        collapsed ? "w-16" : "w-48"
      }`}
      style={{ height: "calc(100dvh - 4rem)" }}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        {!collapsed && (
          <span className="text-eyebrow uppercase text-fg-low">Browse</span>
        )}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? "Expand menu" : "Collapse menu"}
          className="rounded-md p-1.5 text-fg-mid transition-colors duration-fast ease-state hover:text-fg-hi"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>
      <nav aria-label="Sections">
        <ul className="flex flex-col gap-1">
          {FULL_NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                title={item.label}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-md px-3 py-2 text-small transition-colors duration-fast ease-state ${
                    isActive
                      ? "bg-line/5 text-fg-hi"
                      : "text-fg-mid hover:text-fg-hi"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-pahelo transition-opacity duration-base ease-state ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {/* Text when open; the icon only stands in when collapsed
                        to a rail, where there is no room for the label. */}
                    {collapsed ? (
                      <item.icon size={18} />
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
