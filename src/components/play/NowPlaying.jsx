import { useCallback, useContext, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import PlayContext from "@/context/PlayContext";
import { updateContinuePlaying } from "@/hooks/useWatchList";
import { fetchData } from "@/utils/api";
import { isTypingTarget } from "@/utils/keyboard";
import { secondaryButtonSm } from "@/components/ui/buttonStyles";
import { useQuery } from "@tanstack/react-query";

export default function NowPlaying() {
  const { nowPlaying, id, handleEpisodeClick } = useContext(PlayContext);

  const episodesDetail = useQuery({
    queryKey: ["episodes", id, nowPlaying.S],
    queryFn: () => fetchData(`tv/${id}/season/${nowPlaying.S}`),
  });

  const playNext = useCallback(() => {
    const list = episodesDetail?.data?.episodes;
    if (!list) return;
    const nextIndex = Number(nowPlaying.E);
    const episodeName = list[nextIndex]?.name ?? null;
    handleEpisodeClick(nextIndex, episodeName, true);
    updateContinuePlaying(id, nowPlaying.S, nextIndex + 1);
  }, [episodesDetail?.data?.episodes, id, nowPlaying.S, nowPlaying.E, handleEpisodeClick]);

  useEffect(() => {
    const onKey = (e) => {
      if (isTypingTarget()) return;
      if (e.key.toLowerCase() === "n") {
        e.preventDefault();
        playNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playNext]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline gap-2 text-fg-hi">
        <span className="text-fg-low">Now playing</span>
        <span className="font-medium">
          S{nowPlaying.S} E{nowPlaying.E}
        </span>
        {nowPlaying.T && (
          <span className="truncate text-fg-mid">{nowPlaying.T}</span>
        )}
      </div>
      <button
        type="button"
        onClick={playNext}
        className={`w-fit ${secondaryButtonSm}`}
      >
        Next episode
        <ChevronRight size={16} />
        <span className="text-fg-low">(N)</span>
      </button>
    </section>
  );
}
