import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { getTvGenre, getMovieGenre } from "../store/rootSlice";
import useFetch from "../hooks/useFetch";

const genreOption =
  "block w-full rounded-md px-3 py-2 text-left text-small text-fg-mid transition-colors duration-fast ease-state hover:bg-ink-800 hover:text-fg-hi";

export default function GenreDropdown({ mediaType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tvGenre, movieGenre } = useSelector((state) => state.home);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useFetch(`genre/${mediaType}/list`);
  const current = mediaType === "tv" ? tvGenre : movieGenre;

  const handleSelect = (opt) => {
    setIsOpen(false);
    if (mediaType === "tv") {
      dispatch(getTvGenre(opt));
      navigate("/tvshow");
    } else {
      dispatch(getMovieGenre(opt));
      navigate("/movies");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-expanded={isOpen}
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-ink-850 px-3 py-1.5 text-small text-fg-hi transition duration-fast ease-state hover:border-white/25"
        >
          <span className="text-fg-low">Genre</span>
          {current ? current.name : "All"}
          <ChevronDown size={14} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md gap-3 border-white/10 bg-ink-900 p-5 text-fg-hi">
        <DialogHeader>
          <DialogTitle className="font-display text-lg text-fg-hi">
            Select {mediaType === "tv" ? "TV" : "movie"} genre
          </DialogTitle>
          <DialogDescription className="border-b border-white/10 pb-3 text-small text-fg-mid">
            Choose a genre from the list below.
          </DialogDescription>
        </DialogHeader>
        <div className="custom-scrollbar max-h-[45vh] overflow-y-auto">
          <button
            type="button"
            onClick={() => handleSelect(null)}
            className={genreOption}
          >
            All genres
          </button>
          {data?.genres?.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt)}
              className={genreOption}
            >
              {opt.name}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
