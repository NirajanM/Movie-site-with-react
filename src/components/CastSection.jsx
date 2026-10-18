import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import avatar from "../assets/avatar.svg";
import RailButton from "./RailButton";
import { profileSources } from "../utils/image";
import useRailScroll from "../hooks/useRailScroll";

const SIZES = "(max-width: 640px) 45vw, 200px";

const skeletonItem = (i) => (
  <li key={i} className="w-32 shrink-0 md:w-36 lg:w-40">
    <Skeleton className="aspect-poster rounded-lg" />
    <Skeleton className="mt-2 h-3" />
    <Skeleton className="mt-1 h-3 w-1/2" />
  </li>
);

const CastSection = memo(function CastSection({ data, loading }) {
  const { trackRef, scrollStep } = useRailScroll({
    trigger: loading ? 0 : data?.cast?.length ?? 0,
  });

  return (
    <div className="group/rail relative">
      <ul
        ref={trackRef}
        className="no-scrollbar rail-mask mt-4 flex gap-4 overflow-x-auto pb-2 md:gap-6"
      >
        {loading
          ? Array.from({ length: 6 }, (_, i) => skeletonItem(i))
          : data?.cast?.map((item) => {
              const sources = item.profile_path
                ? profileSources(item.profile_path)
                : { src: avatar };
              return (
                <li
                  key={item.id}
                  data-card
                  data-reveal
                  className="w-32 shrink-0 md:w-36 lg:w-40"
                >
                  <div className="relative aspect-poster overflow-hidden rounded-lg bg-ink-850">
                    <LazyLoadImage
                      alt={item.name || item.original_name || "Cast member"}
                      src={sources.src}
                      srcSet={sources.srcSet}
                      sizes={SIZES}
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="mt-2 truncate text-h3 text-fg-hi">{item.name}</p>
                  <p className="truncate text-meta text-fg-mid">
                    {item.character}
                  </p>
                </li>
              );
            })}
      </ul>
      {!loading && (
        <>
          <RailButton dir="left" onClick={() => scrollStep("left")} />
          <RailButton dir="right" onClick={() => scrollStep("right")} />
        </>
      )}
    </div>
  );
});

export default CastSection;
