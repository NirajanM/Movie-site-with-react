import { useState } from "react";
import PlayContext from "./playcontext";

const PlayContextProvider = ({
  children,
  season,
  episode,
  url,
  setUrl,
  id,
}) => {
  const [seasonNumber, setSeasonNumber] = useState(season);
  const [episodeNumber, setEpisodeNumber] = useState(episode);
  const [nowPlaying, setNowPlaying] = useState({
    S: season,
    E: episode,
    T: null,
  });
  return (
    <PlayContext.Provider
      value={{
        seasonNumber,
        setSeasonNumber,
        episodeNumber,
        setEpisodeNumber,
        nowPlaying,
        setNowPlaying,
        url,
        setUrl,
        id,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export default PlayContextProvider;
