import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkPlus, Clapperboard, Play, Star } from "lucide-react";
import ReactPlayer from "react-player";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/api";
import { toast } from "react-toastify";
import {
  addMovieToWatchlist,
  getContinuePlaying,
  setContinuePlaying,
} from "../hooks/useWatchList";
import { primaryButton, secondaryButton } from "./ui/buttonStyles";

export default function DetailSection({ mediaType, id, data, loading }) {
  const navigate = useNavigate();
  const [trailerOpen, setTrailerOpen] = useState(false);

  // Trailers are YouTube keys from the videos endpoint. We reverse the list so
  // the newest trailer is the one that plays first.
  const trailerQuery = useQuery({
    queryKey: [mediaType, id, "videos"],
    queryFn: () => fetchData(`${mediaType}/${id}/videos`),
    enabled: Boolean(mediaType && id),
  });
  const trailerUrls = (trailerQuery.data?.results ?? [])
    .map((video) => `https://www.youtube.com/watch?v=${video.key}`)
    .reverse();

  const {
    original_title,
    popularity,
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
  } = data ?? {};

  const movieTitle = title || name || "";
  const dateReleased = release_date || first_air_date;
  const year = (dateReleased || "").slice(0, 4);
  const runtime = data?.runtime
    ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m`
    : null;
  const seasons =
    mediaType === "tv" && data?.number_of_seasons
      ? `${data.number_of_seasons} season${data.number_of_seasons > 1 ? "s" : ""}`
      : null;
  const rating =
    typeof vote_average === "number" ? vote_average.toFixed(1) : null;
  const genres = data?.genres ?? [];

  // Shape stored in the watchlist / continue-watching lists. Keep it flat:
  // PosterCard and the list pages read these same field names.
  const newObj = {
    id,
    original_title,
    popularity,
    title: movieTitle,
    poster_path,
    release_date: dateReleased,
    media_type: mediaType,
    vote_average,
  };

  const handlePlay = () => {
    const list = getContinuePlaying();
    // Ids can be strings (from the URL) or numbers (after updateContinuePlaying),
    // so compare them as strings.
    const already = list.find((item) => String(item.id) === String(id));
    if (already) {
      setContinuePlaying(newObj, already.s, already.e);
      navigate(`play/${already.s}/${already.e}`);
    } else {
      setContinuePlaying(newObj, 1, 1);
      navigate("play/1/1");
    }
  };

  const handleAddToWatchlist = () => {
    try {
      addMovieToWatchlist(newObj);
      toast("Added to watchlist");
    } catch (error) {
      console.error("Error adding movie to watchlist:", error.message);
      toast("Could not add to watchlist");
    }
  };

  return (
    <>
      {trailerOpen && (
        <div
          className="fixed inset-0 z-toast flex items-center justify-center bg-ink-950/80 backdrop-blur-sm"
          onClick={() => setTrailerOpen(false)}
        >
          {!trailerQuery.isLoading && trailerUrls.length > 0 && (
            <ReactPlayer url={trailerUrls} controls playing />
          )}
        </div>
      )}

      <div className="flex flex-col gap-4 md:basis-3/4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-meta text-fg-mid">
          {year && <span className="tabular-nums">{year}</span>}
          {runtime && <span className="tabular-nums">{runtime}</span>}
          {seasons && <span>{seasons}</span>}
          {rating && (
            <span className="flex items-center gap-1 tabular-nums text-pahelo">
              <Star size={12} fill="currentColor" />
              {rating}
            </span>
          )}
          {genres.map((g) => (
            <span
              key={g.id}
              className="rounded-sm border border-white/10 px-1.5 py-0.5"
            >
              {g.name}
            </span>
          ))}
        </div>

        {loading ? (
          <Skeleton width={400} height={56} />
        ) : (
          <h1 className="font-display text-4xl text-fg-hi [text-wrap:balance] lg:text-5xl">
            {movieTitle}
          </h1>
        )}

        {data?.tagline && (
          <p className="text-body italic text-fg-mid">{data.tagline}</p>
        )}

        <div className="flex flex-wrap gap-3 pt-1">
          <button
            type="button"
            onClick={handlePlay}
            disabled={loading}
            className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <Play size={16} fill="currentColor" />
            Play
          </button>
          <button
            type="button"
            onClick={() => setTrailerOpen(true)}
            disabled={trailerQuery.isLoading || trailerUrls.length === 0}
            className={`${secondaryButton} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            <Clapperboard size={16} />
            Trailer
          </button>
          <button
            type="button"
            onClick={handleAddToWatchlist}
            className={secondaryButton}
          >
            <BookmarkPlus size={16} />
            Watchlist
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2">
            <Skeleton width="100%" height={16} />
            <Skeleton width="100%" height={16} />
            <Skeleton width="60%" height={16} />
          </div>
        ) : (
          <p className="max-w-[65ch] text-body text-fg-mid [text-wrap:pretty]">
            {data?.overview}
          </p>
        )}
      </div>
    </>
  );
}
