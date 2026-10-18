import { memo } from "react";
import { fetchData } from "../utils/api";
import MediaGrid from "./MediaGrid";
import useInfiniteMedia from "../hooks/useInfiniteMedia";

// Search grid: people are filtered out, so no narrow "3 column" step.
const GRID =
  "grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-x-5 xl:grid-cols-5";
const SIZES = "(max-width: 640px) 45vw, (max-width: 1280px) 22vw, 240px";

const SearchRepeater = memo(function SearchRepeater({ keyword, type }) {
  const media = useInfiniteMedia({
    queryKey: ["search", type, keyword],
    queryFn: ({ pageParam = 1 }) =>
      fetchData(`search/${type}`, { query: keyword, page: pageParam }),
    // A "multi" search also returns people; we only show titles.
    filter: (result) => result.media_type !== "person",
  });

  return (
    <MediaGrid
      {...media}
      endpoint={type}
      sizes={SIZES}
      gridClassName={GRID}
      errorMessage="We could not run that search. Check your connection and try again."
      emptyTitle="No results"
      emptyMessage={`We could not find anything for "${keyword}". Try a different title.`}
      emptyActionLabel="Browse movies"
      emptyActionTo="/movies"
    />
  );
});

export default SearchRepeater;
