import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData } from "../utils/api";
import posterNotFound from "../assets/posterNotFound.png";
import { useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function Play() {
  const { mediaType, id, season, episode } = useParams();
  const [seasonNumber, setSeasonNumber] = useState(season);
  const [episodeNumber, setEpisodeNumber] = useState(episode);
  const { url: urlTemp } = useSelector((state) => state.home);
  const navigate = useNavigate();

  const [url, setUrl] = useState(
    mediaType === "movie"
      ? `https://vidsrc.me/embed/movie?tmdb=${id}`
      : `https://vidsrc.me/embed/tv?tmdb=${id}&season=${seasonNumber}&episode=${episodeNumber}`
  );

  const seriesDetails = useQuery({
    queryKey: ["series", id],
    queryFn: () => fetchData(`tv/${id}`),
  });

  const episodesDetail = useQuery({
    queryKey: ["episodes", id, seasonNumber],
    queryFn: () => fetchData(`tv/${id}/season/${seasonNumber}`),
  });

  useEffect(() => {
    // Set sandbox attribute once window loads
    const iframe = document.getElementById("framez");
    iframe.addEventListener("load", handleLoad);
    // Clean up the event listener when the component unmounts
    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, []);

  const handleLoad = () => {
    const iframe = document.getElementById("framez");
    iframe.sandbox =
      "allow-same-origin allow-pointer-lock allow-orientation-lock";
  };

  return (
    <div className="flex flex-col text-xl text-white w-screen mt-24 md:mt-16 max-w-screen-xl mx-auto sm:px-4 px-2 mb-20">
      <iframe
        name="framez"
        id="framez"
        src={url}
        width="100%"
        height="100%"
        className="aspect-video"
        allowFullScreen
      />
      {mediaType == "tv" && (
        <div className="flex flex-col justify-start mt-14">
          <h3 className="text-xl lg:text-3xl font-bold">Seasons</h3>
          <div
            id="seasons-holder"
            className="flex flex-wrap gap-2 mt-5 max-w-screen-xl"
          >
            {seriesDetails?.data?.seasons?.map((item) => {
              return (
                <span
                  key={item.id}
                  className={`border rounded-sm px-4 py-1 text-base cursor-pointer hover:bg-gray-50/20 ${
                    item.season_number === seasonNumber && "bg-gray-50/20"
                  }`}
                  onClick={() => {
                    setSeasonNumber(item.season_number);
                    episodesDetail.refetch();
                  }}
                >
                  {item.season_number}
                </span>
              );
            })}
          </div>
          <div id="episodes-holder" className="mt-5 flex flex-col gap-2">
            <h2 className=" font-semibold font-mono mt-2 ">
              {episodesDetail?.data?.name}
            </h2>
            <p className="text-base mb-5">{episodesDetail?.data?.overview}</p>

            {episodesDetail?.data?.episodes?.map((item, index) => {
              const posterUrl = item.still_path
                ? urlTemp.backdrop + item.still_path
                : posterNotFound;
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-3 md:gap-5 border-b py-4 cursor-pointer hover:bg-slate-50/10"
                  onClick={() => {
                    const iframe = document.getElementById("framez");
                    iframe.removeAttribute("sandbox");
                    navigate(`/tv/${id}/play/${seasonNumber}/${index + 1}`);
                    setEpisodeNumber(index + 1);
                    setUrl(
                      `https://vidsrc.xyz/embed/tv?tmdb=${id}&season=${seasonNumber}&episode=${
                        index + 1
                      }`
                    );
                    window.scrollTo(0, 0);
                  }}
                >
                  <LazyLoadImage
                    alt={item?.name || "poster image"}
                    src={posterUrl}
                    className="h-32 w-44 object-cover object-center "
                    loading="lazy"
                  />

                  <div className="flex flex-col gap-2 items-start">
                    <h3 className="font-mono text-lg">
                      Episode: {item.episode_number}
                    </h3>
                    <h4 className="text-base font-medium font-mono">
                      {item.name}
                    </h4>
                    <p className="text-sm hidden sm:block">{item.overview}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
