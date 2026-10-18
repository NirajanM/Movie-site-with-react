import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayContextProvider from "@/context/PlayContextProvider";
import NowPlaying from "@/components/play/NowPlaying";
import SeasonAndEpisodes from "@/components/play/SeasonAndEpisodes";

export default function Play() {
  const { mediaType, id, season, episode } = useParams();
  const navigate = useNavigate();

  const [url, setUrl] = useState(
    mediaType === "movie"
      ? `https://vidsrc.sh/embed/movie?tmdb=${id}`
      : `https://vidsrc.sh/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`
  );

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
      <div className="flex flex-col text-xl text-white mt-24 md:mt-16 max-w-screen-xl mx-auto mb-20 lg:px-4 gap-14">
        <iframe
          name="framez"
          id="framez"
          src={url}
          width="100%"
          height="100%"
          className="aspect-video"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          referrerPolicy="origin"
          allowFullScreen
        />
        {mediaType == "tv" && (
          <div className="flex flex-col justify-start">
            <NowPlaying />
            <h3 className="text-2xl lg:text-3xl font-semibold">Seasons</h3>
            <SeasonAndEpisodes />
          </div>
        )}
      </div>
    </PlayContextProvider>
  );
}
