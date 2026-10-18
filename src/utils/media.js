/**
 * TMDB returns the same idea under different field names depending on whether
 * the result is a movie or a TV show. These helpers hide that difference so
 * every card and detail view reads the same way.
 *
 *   movies: title, release_date
 *   TV:     name,  first_air_date
 */

export const getTitle = (item) => item?.title || item?.name || "Untitled";

export const getReleaseDate = (item) =>
  item?.release_date || item?.first_air_date || "";

export const getYear = (item) => getReleaseDate(item).slice(0, 4);

// Vote average comes back as a number, or missing when TMDB has no score.
// Return one decimal place as a string, or null so callers can skip the badge.
export const getRating = (item) =>
  typeof item?.vote_average === "number" ? item.vote_average.toFixed(1) : null;
