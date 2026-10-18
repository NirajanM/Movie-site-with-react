import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PosterCard from "./PosterCard";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import useReveal from "../hooks/useReveal";
import { secondaryButtonSm } from "./ui/buttonStyles";

const SKELETON_COUNT = 14;

/**
 * The results grid shared by the browse and search pages.
 *
 * It renders one of four things: the loading skeleton, an error with a retry,
 * an empty state, or the grid itself plus a "load more" button. All paging
 * state comes from useInfiniteMedia (spread in as props by the caller).
 */
export default function MediaGrid({
  results,
  isLoading,
  failed,
  refetch,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  sentinelRef,
  gridClassName,
  sizes,
  endpoint,
  errorMessage,
  emptyTitle,
  emptyMessage,
  emptyActionLabel,
  emptyActionTo,
}) {
  const gridRef = useReveal({ trigger: results.length });

  if (isLoading) {
    return (
      <div className={`${gridClassName} mt-6`}>
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <Skeleton key={i} className="aspect-poster rounded-lg" />
        ))}
      </div>
    );
  }

  if (failed) {
    return <ErrorState message={errorMessage} onRetry={() => refetch()} />;
  }

  if (results.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        message={emptyMessage}
        actionLabel={emptyActionLabel}
        actionTo={emptyActionTo}
      />
    );
  }

  return (
    <div className="mt-6">
      <ul ref={gridRef} className={gridClassName}>
        {results.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            data-reveal
            className={index === 0 ? "col-span-2 row-span-2" : "grid-card"}
          >
            <PosterCard
              item={item}
              endpoint={endpoint}
              sizes={sizes}
              featured={index === 0}
              titleTag="h2"
              className="h-full"
            />
          </li>
        ))}
      </ul>
      <div ref={sentinelRef} aria-hidden="true" className="h-4" />
      {hasNextPage && (
        <div className="flex justify-center pb-10 pt-6">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={secondaryButtonSm}
          >
            {isFetchingNextPage ? "Loading" : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
