import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Star, Trash2 } from "lucide-react";
import posterNotFound from "../assets/posterNotFound.png";
import { posterSources } from "../utils/image";
import { getRating, getTitle } from "../utils/media";
import {
  getContinuePlaying,
  removeContinuePlaying,
} from "@/hooks/useWatchList";
import { toast } from "react-toastify";
import SectionHeader from "./SectionHeader";
import { ghostButton } from "./ui/buttonStyles";

const SIZES = "(max-width: 640px) 45vw, 200px";

const ContinueWatching = memo(function ContinueWatching() {
  const [list, setList] = useState(getContinuePlaying());

  if (list.length === 0) return null;

  const handleRemove = (id) => {
    setList(removeContinuePlaying(id));
    toast("Removed from Continue watching");
  };

  return (
    <section>
      <SectionHeader
        eyebrow="Pick up where you left off"
        title="Continue watching"
      />
      <ul className="no-scrollbar rail-mask mt-4 flex gap-4 overflow-x-auto pb-2 md:gap-5">
        {list.map((entry) => {
          const item = entry.details;
          const sources = item.poster_path
            ? posterSources(item.poster_path)
            : { src: posterNotFound };
          const title = getTitle(item);
          const rating = getRating(item);
          return (
            <li
              key={item.id}
              className="w-32 shrink-0 md:w-36 lg:w-40 xl:w-44"
            >
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
                  <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-transparent transition duration-base ease-state group-hover:ring-white/20 group-focus-visible:ring-pahelo" />
                </div>
                <h3 className="mt-2 truncate text-h3 text-fg-hi transition-colors duration-fast ease-state group-hover:text-pahelo">
                  {title}
                </h3>
                <div className="mt-1 flex items-center justify-between text-meta text-fg-mid">
                  <span className="tabular-nums">
                    S{entry.s} E{entry.e}
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
    </section>
  );
});

export default ContinueWatching;
