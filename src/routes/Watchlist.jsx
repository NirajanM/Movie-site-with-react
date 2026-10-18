import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Star, Trash2 } from "lucide-react";
import Menu from "../components/Menu";
import EmptyState from "../components/EmptyState";
import posterNotFound from "../assets/posterNotFound.png";
import dateFormat from "../components/dateFormat";
import { posterSources } from "../utils/image";
import { getRating, getReleaseDate, getTitle } from "../utils/media";
import {
  getWatchListCinemas,
  removeFromWatchlist,
} from "../hooks/useWatchList";
import useReveal from "../hooks/useReveal";
import { toast } from "react-toastify";
import useSeo from "@/hooks/useSeo";
import { ghostButton } from "../components/ui/buttonStyles";

const SIZES = "(max-width: 640px) 45vw, (max-width: 1280px) 22vw, 240px";
const GRID =
  "grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 xl:grid-cols-5";

const Watchlist = memo(function Watchlist() {
  const [items, setItems] = useState(getWatchListCinemas());
  useSeo({ title: "Watchlist", noindex: true });
  const gridRef = useReveal({ trigger: items.length });

  const handleRemove = (id) => {
    setItems(removeFromWatchlist(id));
    toast("Removed from watchlist");
  };

  return (
    <div className="mx-auto flex max-w-screen-xl px-4 lg:px-6">
      <Menu />
      <div className="w-full min-w-0 py-4 text-white lg:pl-8">
        <h1 className="mb-6 font-display text-2xl text-fg-hi">Watchlist</h1>
        {items.length === 0 ? (
          <EmptyState
            title="Your watchlist is empty"
            message="Save a movie or show and it will show up here."
            actionLabel="Browse movies"
            actionTo="/movies"
          />
        ) : (
          <ul ref={gridRef} className={GRID}>
            {items.map((item) => {
              const sources = item.poster_path
                ? posterSources(item.poster_path)
                : { src: posterNotFound };
              const title = getTitle(item);
              const rating = getRating(item);
              return (
                <li key={item.id} data-reveal className="grid-card">
                  <Link
                    to={`/${item.media_type || "movie"}/${item.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-poster overflow-hidden rounded-lg bg-ink-850 shadow-card">
                      <LazyLoadImage
                        alt={title}
                        src={sources.src}
                        srcSet={sources.srcSet}
                        sizes={SIZES}
                        className="h-full w-full object-cover object-center transition-transform duration-slow ease-enter group-hover:scale-[1.03]"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-transparent transition duration-base ease-state group-hover:ring-white/20" />
                    </div>
                    <h2 className="mt-2 truncate text-h3 text-fg-hi transition-colors duration-fast ease-state group-hover:text-pahelo">
                      {title}
                    </h2>
                    <div className="mt-1 flex items-center justify-between text-meta text-fg-mid">
                      <span className="tabular-nums">
                        {dateFormat(getReleaseDate(item))}
                      </span>
                      {rating && (
                        <span className="flex items-center gap-1 tabular-nums">
                          <Star
                            size={12}
                            fill="currentColor"
                            className="text-pahelo"
                          />
                          {rating}
                        </span>
                      )}
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className={ghostButton}
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
});

export default Watchlist;
