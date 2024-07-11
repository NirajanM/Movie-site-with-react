import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Play() {
  const { mediaType, id, season, episode } = useParams();
  const [seasonNumber, setSeasonNumber] = useState(season);
  const [episodeNumber, setEpisodeNumber] = useState(episode);

  const [url, setUrl] = useState(
    mediaType === "movie"
      ? `https://embed.smashystream.com/playere.php?tmdb=${id}`
      : `https://embed.smashystream.com/playere.php?tmdb=${id}&season=${seasonNumber}&episode=${episodeNumber}`
  );
  return (
    <div className="flex flex-col text-xl text-white w-screen h-screen mt-16 max-w-screen-xl mx-auto sm:px-4 px-2 mb-20">
      <iframe
        name="iframe1"
        id="iframe1"
        src={url}
        width="100%"
        height="100%"
        allowFullScreen
      />
    </div>
  );
}
