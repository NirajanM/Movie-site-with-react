import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import posterNotFound from "../../assets/posterNotFound.png";
import PlayContext from "@/context/PlayContext";
import { fetchData } from "@/utils/api";
import { updateContinuePlaying } from "@/hooks/useWatchList";
import { backdropSources } from "@/utils/image";

export default function EpisodesHolder() {
  const {
    seasonNumber,
    nowPlaying,
    episodeNumber,
    setNowPlaying,
    id,
    handleEpisodeClick,
  } = useContext(PlayContext);

  const episodesDetail = useQuery({
    queryKey: ["episodes", id, seasonNumber],
    queryFn: () => fetchData(`tv/${id}/season/${seasonNumber}`),
  });

  useEffect(() => {
    if (episodesDetail.data?.episodes && !nowPlaying.T) {
      const name =
        episodesDetail.data.episodes[parseInt(episodeNumber, 10) - 1]?.name;
      setNowPlaying((prev) => ({ ...prev, T: name }));
    }
  }, [episodesDetail.data, episodeNumber, setNowPlaying, nowPlaying.T]);

  const currentSeason = Number(nowPlaying.S);
  const currentEpisode = Number(nowPlaying.E);

  return (
    <div className="flex flex-col gap-4">
      {episodesDetail?.data?.overview && (
        <p className="max-w-[65ch] text-body text-fg-mid [text-wrap:pretty]">
          {episodesDetail.data.overview}
        </p>
      )}
      <ul className="flex flex-col gap-2">
        {episodesDetail.isLoading &&
          Array.from({ length: 4 }, (_, i) => (
            <li key={i}>
              <Skeleton className="h-24 rounded-lg" />
            </li>
          ))}
        {episodesDetail?.data?.episodes?.map((item, index) => {
          const still = item.still_path
            ? backdropSources(item.still_path)
            : { src: posterNotFound };
          const isCurrent =
            Number(seasonNumber) === currentSeason &&
            index + 1 === currentEpisode;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  const name =
                    episodesDetail.data.episodes[index]?.name ?? null;
                  handleEpisodeClick(index, name, false);
                  updateContinuePlaying(id, seasonNumber, index + 1);
                }}
                aria-current={isCurrent ? "true" : undefined}
                className={`flex w-full gap-3 rounded-lg border p-2 text-left transition-colors duration-base ease-state ${
                  isCurrent
                    ? "border-pahelo/60 bg-line/5"
                    : "border-transparent hover:border-line/10 hover:bg-line/5"
                }`}
              >
                <div className="h-20 w-36 shrink-0 overflow-hidden rounded-sm bg-ink-850 md:h-24 md:w-44">
                  <LazyLoadImage
                    alt={item?.name || `Episode ${item.episode_number}`}
                    src={still.src}
                    srcSet={still.srcSet}
                    sizes="176px"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-center gap-1 pr-2">
                  <h3 className="truncate text-h3 text-fg-hi">
                    {item.episode_number}. {item.name}
                  </h3>
                  <p className="text-meta tabular-nums text-fg-mid">
                    Rating {item?.vote_average ? item.vote_average.toFixed(1) : "0.0"}
                    {isCurrent && (
                      <span className="ml-2 text-pahelo">Watching now</span>
                    )}
                  </p>
                  {item.overview && (
                    <p className="line-clamp-2 text-small text-fg-mid">
                      {item.overview}
                    </p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
