export function addMovieToWatchlist(movie) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist.push(movie);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
}
export function getWatchlist() {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
}
