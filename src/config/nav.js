import {
  Bookmark,
  Clapperboard,
  Heart,
  Home,
  Info,
  List,
  Tv,
} from "lucide-react";

/**
 * Single source of truth for navigation.
 *
 * Every screen that draws nav links (header, sidebar, mobile sheet, bottom tab
 * bar) reads from this file, so adding, renaming or reordering a page is a
 * one-place change. `end: true` tells NavLink to match the route exactly,
 * which is only needed for "/" so it does not stay active on every page.
 */

// Desktop header: the three main destinations.
export const MAIN_NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/movies", label: "Movies" },
  { to: "/tvshow", label: "TV Shows" },
];

// Sidebar and mobile sheet: every page, each with an icon.
export const FULL_NAV = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/movies", label: "Movies", icon: Clapperboard },
  { to: "/tvshow", label: "TV Shows", icon: Tv },
  { to: "/watchlist", label: "Watchlist", icon: Heart },
  { to: "/about", label: "About", icon: Info },
  { to: "/faq", label: "FAQs", icon: List },
];

// Bottom tab bar shown on small screens.
export const BOTTOM_TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/movies", label: "Movies", icon: Clapperboard },
  { to: "/tvshow", label: "TV", icon: Tv },
  { to: "/watchlist", label: "Watchlist", icon: Bookmark },
];

// Custom window event the bottom tab bar fires to open the header search box.
// Header listens for it; keep both sides importing this constant so the name
// can never drift out of sync.
export const FOCUS_SEARCH_EVENT = "lwm:focus-search";
