import { memo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import posterNotFound from "../assets/posterNotFound.png";
import dateFormat from "./dateFormat";
import Rating from "./Rating";
import { posterSources } from "../utils/image";
import { getRating, getReleaseDate, getTitle } from "../utils/media";

const NEW_WINDOW_MS = 1000 * 60 * 60 * 24 * 45;

const isNew = (date) => {
  if (!date) return false;
  const t = new Date(date).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t < NEW_WINDOW_MS;
};

const PosterCard = memo(function PosterCard({
  item,
  endpoint,
  sizes,
  featured = false,
  className = "",
  titleTag: TitleTag = "h3",
}) {
  const navigate = useNavigate();
  const mediaRef = useRef(null);

  const sources = item.poster_path
    ? posterSources(item.poster_path)
    : { src: posterNotFound };
  const to = `/${item.media_type || endpoint}/${item.id}`;
  const title = getTitle(item);
  const date = getReleaseDate(item);
  const rating = getRating(item);

  // Morph the poster into the detail hero where View Transitions are supported.
  const handleClick = (event) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      typeof document === "undefined" ||
      typeof document.startViewTransition !== "function"
    ) {
      return;
    }
    event.preventDefault();
    const el = mediaRef.current;
    if (el) el.style.viewTransitionName = "poster";
    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => navigate(to));
      });
      if (transition?.finished?.finally) {
        transition.finished.finally(() => {
          if (el) el.style.viewTransitionName = "";
        });
      }
    } catch {
      navigate(to);
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`group rounded-lg ${
        featured ? "flex h-full flex-col" : "block"
      } ${className}`}
    >
      <div
        className={`relative overflow-hidden rounded-lg bg-ink-850 shadow-card ${
          featured ? "min-h-0 flex-1" : ""
        }`}
      >
        <div
          ref={mediaRef}
          className={featured ? "h-full" : "relative aspect-poster"}
        >
          <LazyLoadImage
            alt={title}
            src={sources.src}
            srcSet={sources.srcSet}
            sizes={sizes}
            className="h-full w-full object-cover object-center transition-transform duration-slow ease-enter group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-transparent transition duration-base ease-state group-hover:ring-line/20 group-focus-visible:ring-pahelo" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-scrim/90 to-transparent opacity-0 transition-opacity duration-base ease-state group-hover:opacity-100" />
        {isNew(date) && (
          <span className="absolute left-2 top-2 rounded-sm bg-pahelo px-1.5 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-onaccent">
            New
          </span>
        )}
      </div>
      <div className="mt-2">
        <TitleTag
          className={`truncate text-fg-hi transition-colors duration-fast ease-state group-hover:text-pahelo ${
            featured ? "text-base font-medium" : "text-h3"
          }`}
        >
          {title}
        </TitleTag>
        <div className="mt-1 flex items-center justify-between gap-2 text-meta text-fg-mid">
          <span className="tabular-nums">{dateFormat(date)}</span>
          <Rating value={rating} className="text-mato" />
        </div>
      </div>
    </Link>
  );
});

export default PosterCard;
