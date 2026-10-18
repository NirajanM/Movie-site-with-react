/**
 * Builds the third-party embed URL for the player iframe.
 *
 * The player is cross-origin, so we only control the src we hand it. Movies
 * need just the TMDB id; TV needs a season and episode too.
 */
const EMBED_BASE = "https://vidsrc.sh/embed";

export const playerUrl = (mediaType, id, season, episode) =>
  mediaType === "movie"
    ? `${EMBED_BASE}/movie?tmdb=${id}`
    : `${EMBED_BASE}/tv?tmdb=${id}&season=${season}&episode=${episode}`;
