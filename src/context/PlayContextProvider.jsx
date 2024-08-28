import { useState } from "react";
import PlayContext from "./PlayContext";

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
  const handleEpisodeClick = (index, episodeName, isNext) => {
    const iframe = document.getElementById("framez");
    iframe.removeAttribute("sandbox");
    const choosenEpisode = parseInt(index) + 1;
    const choosenSeason = isNext ? nowPlaying.S : seasonNumber;
    navigate(`/tv/${id}/play/${choosenSeason}/${choosenEpisode}`);
    setEpisodeNumber(choosenEpisode);
    setNowPlaying({
      S: choosenSeason,
      E: choosenEpisode,
      T: episodeName,
    });
    setUrl(
      `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${choosenSeason}&episode=${choosenEpisode}`
    );
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
