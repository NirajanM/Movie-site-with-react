import PlayContext from "@/context/PlayContext";
import { useContext } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function NowPlaying() {
  const { nowPlaying } = useContext(PlayContext);
  return (
    <section className="flex flex-col">
      <div id="episode-details" className="flex gap-2">
        <span>Now Playing:</span>
        <span>
          S{nowPlaying.S}E{nowPlaying.E}.{nowPlaying.T}
        </span>
      </div>
      <div>
        <span>
          <GrFormPrevious /> Previous Episode
        </span>
        <span>
          <GrFormNext /> Next Episode
        </span>
      </div>
    </section>
  );
}
