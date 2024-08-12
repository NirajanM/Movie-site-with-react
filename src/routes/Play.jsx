import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayContextProvider from "@/context/PlayContextProvider";
import NowPlaying from "@/components/play/NowPlaying";
import SeasonAndEpisodes from "@/components/play/SeasonAndEpisodes";

// Function to handle the load event
const handleLoad = (event) => {
  const iframe = event.target;
  iframe.sandbox = "allow-same-origin ";
  // Prevent the button click from propagating
  document.getElementById("pl_but").onclick = function (e) {
    e.stopPropagation();
  };
};

export default function Play() {
  const { mediaType, id, season, episode } = useParams();
  const navigate = useNavigate();

  const [url, setUrl] = useState(
    mediaType === "movie"
      ? `https://vidsrc.me/embed/movie?tmdb=${id}`
      : `https://vidsrc.me/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`
  );

  useEffect(() => {
    // Select all iframes in the document
    const iframes = document.querySelectorAll("iframe");

    // Add load event listener to each iframe
    iframes.forEach((iframe) => {
      iframe.addEventListener("load", handleLoad);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      iframes.forEach((iframe) => {
        iframe.removeEventListener("load", handleLoad);
      });
    };
  }, []);

  return (
    <PlayContextProvider
      id={id}
      season={season}
      episode={episode}
      url={url}
      setUrl={setUrl}
      navigate={navigate}
    >
      <div className="flex flex-col text-xl text-white mt-24 md:mt-16 max-w-screen-xl mx-auto mb-20 lg:px-4 gap-14">
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
