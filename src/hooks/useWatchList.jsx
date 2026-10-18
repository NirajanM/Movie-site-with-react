/**
 * Everything that reads or writes the two lists we keep in localStorage.
 * Components never touch localStorage directly; they call these functions so
 * the storage keys and the JSON handling stay in one place.
 *
 *   watchlist       -> titles the user saved
 *   continuePlaying -> recently watched titles, newest first, with season/episode
 */

const WATCHLIST_KEY = "watchlist";
const CONTINUE_KEY = "continuePlaying";
const CONTINUE_LIMIT = 15;

function readList(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : [];
  } catch (error) {
    console.error(`Failed to read ${key} from localStorage`, error);
    return [];
  }
}

function writeList(key, list) {
  try {
    localStorage.setItem(key, JSON.stringify(list));
  } catch (error) {
    console.error(`Failed to write ${key} to localStorage`, error);
  }
}

// --- Watchlist ---------------------------------------------------------

export function getWatchListCinemas() {
  return readList(WATCHLIST_KEY);
}

export function addMovieToWatchlist(movie) {
  const watchlist = readList(WATCHLIST_KEY);
  const alreadySaved = watchlist.some((item) => item.id === movie.id);
  if (alreadySaved) return watchlist;

  const updated = [...watchlist, movie];
  writeList(WATCHLIST_KEY, updated);
  return updated;
}

/** Removes a title and returns the new list. */
export function removeFromWatchlist(id) {
  const updated = readList(WATCHLIST_KEY).filter((item) => item.id !== id);
  writeList(WATCHLIST_KEY, updated);
  return updated;
}

// --- Continue watching ------------------------------------------------

export function getContinuePlaying() {
  return readList(CONTINUE_KEY);
}

/**
 * Records progress for a title. The list is newest first, capped at
 * CONTINUE_LIMIT entries, and a title that is already in it moves back to the
 * top with the new season/episode.
 */
export function setContinuePlaying(cinema, s, e) {
  const list = readList(CONTINUE_KEY);
  const existingIndex = list.findIndex((item) => item.id === cinema.id);

  if (existingIndex !== -1) {
    list.splice(existingIndex, 1);
  } else if (list.length >= CONTINUE_LIMIT) {
    list.pop();
  }

  list.unshift({ id: cinema.id, details: cinema, s, e });
  writeList(CONTINUE_KEY, list);
}

/**
 * Moves an already-tracked title back to the top with a new season/episode.
 * Does nothing if the title is not in the list yet.
 */
export function updateContinuePlaying(id, s, e) {
  const list = readList(CONTINUE_KEY);
  const searchId = parseInt(id, 10);
  const index = list.findIndex((item) => item.id === searchId);
  if (index === -1) return;

  const { details } = list[index];
  list.splice(index, 1);
  list.unshift({ id: searchId, details, s, e });
  writeList(CONTINUE_KEY, list);
}

/** Removes a title and returns the new list. */
export function removeContinuePlaying(id) {
  const updated = readList(CONTINUE_KEY).filter((item) => item.id !== id);
  writeList(CONTINUE_KEY, updated);
  return updated;
}
