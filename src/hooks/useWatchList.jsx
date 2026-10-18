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

export function addMovieToWatchlist(movie) {
  let watchlist = readList("watchlist");

  const existingMovieIndex = watchlist.findIndex(
    (item) => item.id === movie.id
  );

  // If movie with the same ID exists, you may choose to update or ignore it
  if (existingMovieIndex !== -1) {
    console.log(`Movie with ID ${movie.id} already exists in the watchlist.`);
    return;
  }
  watchlist.push(movie);

  // Save updated watchlist to localStorage
  writeList("watchlist", watchlist);
}

export function getWatchListCinemas() {
  return readList("watchlist");
}

export function setContinuePlaying(cinema, s, e) {
  let list = readList("continuePlaying");

  const existingMovieIndex = list.findIndex((item) => item.id === cinema.id);

  // If movie with the same ID exists, remove it
  if (existingMovieIndex !== -1) {
    list.splice(existingMovieIndex, 1);
  } else {
    // Check if the list contains 15 items, if so, remove the last item
    if (list.length >= 15) {
      list.pop();
    }
  }

  // Add the movie to the beginning of the list with new s and e values
  list.unshift({ id: cinema.id, details: cinema, s: s, e: e });

  // Save updated watchlist to localStorage
  writeList("continuePlaying", list);
}

export function updateContinuePlaying(id, s, e) {
  let list = readList("continuePlaying");
  let searchId = parseInt(id);

  const existingCinemaIndex = list.findIndex((item) => item.id === searchId);
  // If movie with the same ID exists, remove it
  if (existingCinemaIndex === -1) {
    return;
  }
  const existingCinemaDetails = list[existingCinemaIndex].details;
  list.splice(existingCinemaIndex, 1);

  // Add the movie to the end of the list with new s and e values
  list.unshift({ id: searchId, details: existingCinemaDetails, s: s, e: e });

  // Save updated watchlist to localStorage
  writeList("continuePlaying", list);
}

export function getContinuePlaying() {
  return readList("continuePlaying");
}
