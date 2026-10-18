import { memo } from "react";
import { fetchData } from "../utils/api";
import MediaGrid from "./MediaGrid";
import useInfiniteMedia from "../hooks/useInfiniteMedia";

// Browse grid: two columns on phones up to five on wide screens.
const GRID =
  "grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 md:gap-x-5 xl:grid-cols-5";
const SIZES = "(max-width: 640px) 45vw, (max-width: 1280px) 22vw, 240px";

const Repeater = memo(function Repeater({
  genre,
  endpoint,
  sortBy = "popularity.desc",
}) {
  const media = useInfiniteMedia({
    queryKey: ["items", genre, endpoint, sortBy],
    queryFn: ({ pageParam = 1 }) =>
      fetchData(
        `discover/${endpoint}?page=${pageParam}&sort_by=${sortBy}${
          genre ? `&with_genres=${genre}` : ""
        }`
      ),
  });

  return (
    <MediaGrid
      {...media}
      endpoint={endpoint}
      sizes={SIZES}
      gridClassName={GRID}
      errorMessage="We could not load these titles. Check your connection and try again."
      emptyTitle="Nothing here yet"
      emptyMessage="No titles matched this filter. Try another genre or sort."
      emptyActionLabel="Reset filters"
      emptyActionTo={endpoint === "tv" ? "/tvshow" : "/movies"}
    />
  );
});

export default Repeater;
