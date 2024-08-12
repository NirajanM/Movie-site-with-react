import { LazyLoadImage } from "react-lazy-load-image-component";
import { fetchData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import posterNotFound from "../../assets/posterNotFound.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PlayContext from "@/context/PlayContext";

export default function EpisodesHolder() {
  const {
    seasonNumber,
    nowPlaying,
    episodeNumber,
    setNowPlaying,
    setEpisodeNumber,
    setUrl,
    id,
  } = useContext(PlayContext);

  const { url: urlTemp } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const episodesDetail = useQuery({
    queryKey: ["episodes", id, seasonNumber],
    queryFn: () => fetchData(`tv/${id}/season/${seasonNumber}`),
  });

  // Use a flag to ensure the title is set only once
  useEffect(() => {
    if (episodesDetail.data && episodesDetail.data.episodes && !nowPlaying.T) {
      const episodeName =
        episodesDetail.data.episodes[parseInt(episodeNumber) - 1]?.name;
      setNowPlaying((prev) => ({
        ...prev,
        T: episodeName,
      }));
    }
  }, [episodesDetail.data, episodeNumber, setNowPlaying, nowPlaying.T]);

  const handleEpisodeClick = (index) => {
    const iframe = document.getElementById("framez");
    iframe.removeAttribute("sandbox");
    navigate(`/tv/${id}/play/${seasonNumber}/${index + 1}`);
    setEpisodeNumber(index + 1);
    const episodeName = episodesDetail.data.episodes[index]?.name | null;
    setNowPlaying({
      S: seasonNumber,
      E: index + 1,
      T: episodeName,
    });
    setUrl(
      `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${seasonNumber}&episode=${
        index + 1
      }`
    );
    window.scrollTo(0, 0);
  };

  return (
    <div
      id="episodes-holder"
      className="mt-5 md:mt-7 lg:mt-9 flex flex-col gap-2 md:gap-3 lg:gap-4"
    >
      <p className="text-sm md:text-base lg:text-lg mb-5 md:mb-7 lg:mb-9">
        {episodesDetail?.data?.overview}
      </p>

      {episodesDetail?.data?.episodes?.map((item, index) => {
        const posterUrl = item.still_path
          ? urlTemp.backdrop + item.still_path
          : posterNotFound;
        return (
          <div
            key={item.id}
            className="flex flex-col gap-1 md:gap-2 lg:gap-4 py-6 cursor-pointer hover:bg-white/5"
            onClick={() => {
              handleEpisodeClick(index);
            }}
          >
            <div className="flex gap-3 md:gap-4">
              <div className="rounded-sm h-20 md:h-24 lg:h-28 w-36 md:w-44 lg:w-52">
                <LazyLoadImage
                  alt={item?.name || "poster image"}
                  src={posterUrl}
                  className="h-full w-full object-cover object-center rounded-sm"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col items-start justify-center w-full text-sm md:text-base lg:text-lg font-semibold">
                <h3>
                  {item.episode_number}. {item.name}
                </h3>
                <h4 className="text-white/60 font-normal">
                  Rated: {item?.vote_average || 0}
                </h4>
              </div>
            </div>
            <p className="text-sm text-white/60 md:text-base lg:text-lg">
              {item.overview}
            </p>
          </div>
        );
      })}
    </div>
  );
}
