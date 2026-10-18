import { useState } from "react";
import { useSelector } from "react-redux";
import Menu from "./Menu";
import Repeater from "./Repeater";
import GenreDropdown from "./GenreDropdown";

/**
 * Shared layout for the Movies and TV Shows pages.
 *
 * The two pages are the same screen; they only differ in their heading, the
 * genre stored in Redux and which date field "Newest" sorts by. Those three
 * things come in as props, so the layout lives here once.
 */
export default function MediaBrowse({ mediaType, title, newestSortValue }) {
  const { movieGenre, tvGenre } = useSelector((state) => state.home);
  const genre = mediaType === "tv" ? tvGenre : movieGenre;
  const [sortBy, setSortBy] = useState("popularity.desc");

  const sortOptions = [
    { value: "popularity.desc", label: "Popularity" },
    { value: "vote_average.desc", label: "Rating" },
    { value: newestSortValue, label: "Newest" },
  ];

  return (
    <div className="mx-auto flex max-w-screen-xl px-4 lg:px-6">
      <Menu />
      <div className="w-full min-w-0 text-white lg:pl-8">
        <div className="sticky top-16 z-40 mb-2 border-b border-white/10 bg-ink-950/80 px-1 py-3 backdrop-blur-[14px]">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-xl text-fg-hi">{title}</h1>
            <GenreDropdown mediaType={mediaType} />
            <label className="ml-auto flex items-center gap-2 text-small text-fg-mid">
              <span className="sr-only">Sort {title.toLowerCase()}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-white/10 bg-ink-850 px-2 py-1.5 text-small text-fg-hi"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <Repeater genre={genre?.id} endpoint={mediaType} sortBy={sortBy} />
      </div>
    </div>
  );
}
