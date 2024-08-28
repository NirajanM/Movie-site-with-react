export function addMovieToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

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
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

export function getWatchListCinemas() {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
}

export function getContinuePlaying() {
  return JSON.parse(localStorage.getItem("continuePlaying")) || [];
}
