import { memo } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PosterCard from "./PosterCard";
import RailButton from "./RailButton";
import useRailScroll from "../hooks/useRailScroll";

const skeletonItem = (i) => (
  <li key={i} className="w-32 shrink-0 md:w-36 lg:w-40 xl:w-44">
    <Skeleton className="aspect-poster rounded-lg" />
    <Skeleton className="mt-2 h-3" />
    <Skeleton className="mt-1 h-3 w-2/3" />
  </li>
);

const Carousel = memo(function Carousel({
  data,
  loading,
  endpoint,
  sizes = "(max-width: 640px) 45vw, 200px",
}) {
  const { trackRef, scrollStep } = useRailScroll({
    trigger: loading ? 0 : data?.length ?? 0,
  });

  // Arrow keys move the rail while it has focus.
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollStep("left");
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollStep("right");
    }
  };

  return (
    <div className="group/rail relative">
      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        aria-label={endpoint ? `${endpoint} titles` : "titles"}
        className="no-scrollbar rail-mask mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:gap-5"
      >
        {loading
          ? Array.from({ length: 6 }, (_, i) => skeletonItem(i))
          : data?.map((item) => (
              <li
                key={item.id}
                data-card
                data-reveal
                className="w-32 shrink-0 snap-start md:w-36 lg:w-40 xl:w-44"
              >
                <PosterCard item={item} endpoint={endpoint} sizes={sizes} />
              </li>
            ))}
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

export default Carousel;
