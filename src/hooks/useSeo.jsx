import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SITE_ORIGIN = "https://letswatchmovie.pages.dev";
export const SITE_NAME = "LetsWatchMovie";
const DEFAULT_DESCRIPTION =
  "Browse movies and TV shows, build a watchlist and press play. Powered by TMDB.";
const DEFAULT_IMAGE = `${SITE_ORIGIN}/og-image.png`;

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  const link = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    if (link) link.remove();
    return;
  }
  if (link) {
    link.setAttribute("href", href);
    return;
  }
  const created = document.createElement("link");
  created.setAttribute("rel", "canonical");
  created.setAttribute("href", href);
  document.head.appendChild(created);
}

/**
 * Keeps document title, description, canonical and social tags in sync with
 * the current route. Pages that should stay out of the index pass noindex.
 */
export default function useSeo({
  title,
  description,
  image,
  type = "website",
  noindex = false,
} = {}) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME}: movies and TV shows, one place`;
    const desc = description || DEFAULT_DESCRIPTION;
    const url = `${SITE_ORIGIN}${pathname}`;
    const img = image || DEFAULT_IMAGE;

    document.title = fullTitle;
    upsertMeta("name", "description", desc);
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, follow" : "index, follow, max-image-preview:large"
    );
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", desc);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:image", img);
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", desc);
    upsertMeta("name", "twitter:image", img);
    upsertCanonical(noindex ? null : url);
  }, [title, description, image, type, noindex, pathname]);
}
