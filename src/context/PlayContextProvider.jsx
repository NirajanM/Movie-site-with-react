import { useState } from "react";
import PlayContext from "./PlayContext";
import { playerUrl } from "../utils/player";

const PlayContextProvider = ({
  children,
  season,
  episode,
  url,
  setUrl,
  id,
  navigate,
  mediaType,
}) => {
  const [seasonNumber, setSeasonNumber] = useState(season);
  const [episodeNumber, setEpisodeNumber] = useState(episode);
  const [nowPlaying, setNowPlaying] = useState({
    S: season,
    E: episode,
    T: null,
  });

  // Called when an episode is chosen in the list or with the "next episode"
  // shortcut. `index` is zero-based; the URL uses one-based numbering.
  const handleEpisodeClick = (index, episodeName, isNext) => {
    const chosenEpisode = parseInt(index, 10) + 1;
    const chosenSeason = isNext ? nowPlaying.S : seasonNumber;
    navigate(`/tv/${id}/play/${chosenSeason}/${chosenEpisode}`);
    setEpisodeNumber(chosenEpisode);
    setNowPlaying({
      S: chosenSeason,
      E: chosenEpisode,
      T: episodeName,
    });
    setUrl(playerUrl("tv", id, chosenSeason, chosenEpisode));
    window.scrollTo(0, 0);
  };
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
        handleEpisodeClick,
        mediaType,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
};

export default PlayContextProvider;
