import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getTvGenre, getMovieGenre } from "../store/rootSlice";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function GenreDropdown({ mediaType, setExpanded }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tvGenre, movieGenre } = useSelector((state) => state.home);
  const [genreTv, setGenreTv] = useState(tvGenre || null);
  const [genreMovie, setGenreMovie] = useState(movieGenre || null);
  const { data } = useFetch(`genre/${mediaType}/list`);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (opt, type) => {
    setIsOpen(false);
    if (type === "tv") {
      setGenreTv(opt);
      dispatch(getTvGenre(opt));
      navigate(`/tvshow`);
    } else {
      setGenreMovie(opt);
      dispatch(getMovieGenre(opt));
      navigate("/movies");
    }
    setExpanded(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col" onClick={() => setIsOpen(true)}>
          <span className="flex gap-[10px] items-center cursor-pointer">
            {mediaType === "tv" ? "Tv. Genre" : "M. Genre"}
          </span>
          <span className="text-sm text-slate-300/90 pl-1 font-light">
            -{" "}
            {mediaType === "tv"
              ? genreTv
                ? genreTv.name
                : "All"
              : genreMovie
              ? genreMovie.name
              : "All"}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md bg-black dialog-content text-white p-5 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-pahelo">
            Select {mediaType === "tv" ? "Tv" : "Movie"} Genre
          </DialogTitle>
          <DialogDescription className="border-b border-white/10 pb-4 w-full text-sm md:text-md">
            Choose a genre from the list below:
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-scroll max-h-[40vh] custom-scrollbar">
          {data?.genres.map((opt) => (
            <div
              key={opt.id}
              className="hover:bg-slate-800 px-3 py-2 w-full text-sm md:text-md cursor-pointer"
              onClick={() => handleSelect(opt, mediaType)}
            >
              {opt.name}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
