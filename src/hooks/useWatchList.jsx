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

export function setContinuePlaying(cinema, s, e) {
  let list = JSON.parse(localStorage.getItem("continuePlaying")) || [];

  const existingMovieIndex = list.findIndex((item) => item.id === cinema.id);

  // If movie with the same ID exists, remove it
  if (existingMovieIndex !== -1) {
    list.splice(existingMovieIndex, 1);
  }

  // Add the movie to the end of the list with new s and e values
  list.push({ id: cinema.id, details: cinema, s: s, e: e });

  // Save updated watchlist to localStorage
  localStorage.setItem("continuePlaying", JSON.stringify(list));
}

export function updateContinuePlaying(id, s, e) {
  let list = JSON.parse(localStorage.getItem("continuePlaying")) || [];
  let searchId = parseInt(id);

  const existingCinemaIndex = list.findIndex((item) => item.id === searchId);
  let existingCinemaDetails = null;
  // If movie with the same ID exists, remove it
  if (existingCinemaIndex !== -1) {
    existingCinemaDetails = list[existingCinemaIndex].details;
    list.splice(existingCinemaIndex, 1);
  } else {
    return;
  }

  // Add the movie to the end of the list with new s and e values
  list.push({ id: searchId, details: existingCinemaDetails, s: s, e: e });

  // Save updated watchlist to localStorage
  localStorage.setItem("continuePlaying", JSON.stringify(list));
}

export function getContinuePlaying() {
  return JSON.parse(localStorage.getItem("continuePlaying")) || [];
}
