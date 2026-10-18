import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayContextProvider from "@/context/PlayContextProvider";
import NowPlaying from "@/components/play/NowPlaying";
import SeasonAndEpisodes from "@/components/play/SeasonAndEpisodes";
import useSeo from "@/hooks/useSeo";
import { isTypingTarget } from "@/utils/keyboard";
import { playerUrl } from "@/utils/player";

export default function Play() {
  const { mediaType, id, season, episode } = useParams();
  useSeo({ title: "Player", noindex: true });
  const navigate = useNavigate();
  const playerRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);

  const [url, setUrl] = useState(() =>
    playerUrl(mediaType, id, season, episode)
  );

  useEffect(() => {
    const onFsChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (isTypingTarget()) return;
      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        const el = playerRef.current;
        if (!el) return;
        if (document.fullscreenElement) document.exitFullscreen();
        else el.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <PlayContextProvider
      id={id}
      season={season}
      episode={episode}
      url={url}
      setUrl={setUrl}
      navigate={navigate}
      mediaType={mediaType}
    >
      <div className="mx-auto mb-20 mt-6 max-w-screen-xl px-4 lg:px-6">
        <div className="relative">
          <div
            ref={playerRef}
            className={`overflow-hidden bg-black ${
              fullscreen ? "h-[100dvh] w-screen" : "rounded-xl border border-line/10"
            }`}
          >
            <iframe
              name="framez"
              id="framez"
              src={url}
              title="Video player"
              className="aspect-video h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              referrerPolicy="origin"
              allowFullScreen
            />
          </div>
          {fullscreen && (
            <button
              type="button"
              onClick={() => document.exitFullscreen()}
              className="absolute right-4 top-4 rounded-md border border-onscrim/20 bg-scrim/70 px-3 py-1.5 text-small text-onscrim"
            >
              Exit fullscreen
            </button>
          )}
        </div>

        <p className="mt-2 text-meta text-fg-low">
          Press F for fullscreen
          {mediaType === "tv" ? ", N for the next episode" : ""}. Playback
          controls live in the player.
        </p>

        {mediaType === "tv" && (
          <div className="mt-8 flex flex-col gap-5">
            <NowPlaying />
            <h3 className="font-display text-xl text-fg-hi">Seasons</h3>
            <SeasonAndEpisodes />
          </div>
        )}
      </div>
    </PlayContextProvider>
  );
}
