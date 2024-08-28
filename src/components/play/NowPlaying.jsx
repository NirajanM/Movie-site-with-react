import PlayContext from "@/context/PlayContext";
import { updateContinuePlaying } from "@/hooks/useWatchList";
import { fetchData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FaChevronRight } from "react-icons/fa";

export default function NowPlaying() {
  const { nowPlaying, id, handleEpisodeClick } = useContext(PlayContext);

  const episodesDetail = useQuery({
    queryKey: ["episodes", id, nowPlaying.S],
    queryFn: () => fetchData(`tv/${id}/season/${nowPlaying.S}`),
  });
  return (
    <section className="flex flex-col gap-3 pb-5 text-sm md:text-base">
      <div id="episode-details" className="flex gap-2 text-white/90">
        <span>Now Playing:</span>
        <span>
          S{nowPlaying.S}E{nowPlaying.E}.{nowPlaying.T}
        </span>
      </div>
      <div
        className="inline-flex w-fit gap-1 py-3 rounded-md items-center hover:bg-slate-800/50 hover:text-white cursor-pointer text-white/80"
        onClick={() => {
          const episodeName =
            episodesDetail.data.episodes[nowPlaying.E]?.name | null;
          handleEpisodeClick(nowPlaying.E, episodeName, true);
          updateContinuePlaying(id, nowPlaying.S, parseInt(nowPlaying.E) + 1);
        }}
      >
        <span>Play Next Episode</span>
        <FaChevronRight />
      </div>
    </section>
  );
}
