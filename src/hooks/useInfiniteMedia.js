import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * Paging helper shared by the browse and search grids.
 *
 * Small gotcha worth knowing: `fetchData` (src/utils/api.js) catches network
 * errors and *returns* them instead of throwing. So a failed page arrives as
 * an Error object sitting in `pages`, and that is why we check for it
 * ourselves instead of relying on react-query's isError flag.
 *
 * @param {object}   options
 * @param {Array}    options.queryKey   react-query cache key
 * @param {Function} options.queryFn    receives { pageParam } and returns a page
 * @param {Function} [options.filter]   optional filter applied to each page's results
 */
export default function useInfiniteMedia({ queryKey, queryFn, filter }) {
  const sentinelRef = useRef(null);

  const query = useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (last) =>
      last?.page && last?.total_pages && last.page < last.total_pages
        ? last.page + 1
        : undefined,
  });

  const pages = query.data?.pages ?? [];
  const failed = pages.some((page) => page instanceof Error);
  const results = pages.flatMap((page) => {
    if (!Array.isArray(page?.results)) return [];
    return filter ? page.results.filter(filter) : page.results;
  });

  const { hasNextPage, isFetchingNextPage, fetchNextPage } = query;

  // Ask for the next page shortly before the sentinel scrolls into view.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasNextPage || failed) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, failed]);

  return { ...query, sentinelRef, failed, results };
}
