import { GoSingleSelect } from "react-icons/go";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getTvGenre, getMovieGenre } from "../store/rootSlice";
import useFetch from "../hooks/useFetch";

export default function GenreDropdown({ mediaType }) {
    const dispatch = useDispatch();
    const { tvGenre, movieGenre } = useSelector((state) => state.home);
    const [genreTv, setGenreTv] = useState(tvGenre || null);
    const [genreMovie, setGenreMovie] = useState(movieGenre || null);
    const [optionOpen, setOptionOpen] = useState(false);
    const { data } = useFetch(`genre/${mediaType}/list`);

    return mediaType === "tv" ? (
        <>
            <span
                className="flex gap-[10px] items-center"
                onClick={() => { setOptionOpen(true) }}
            >Tv. Genre <GoSingleSelect className="text-xl" />
            </span>
            <span className="text-sm text-slate-100 pl-1 font-light">- {genreTv ? genreTv.name : "All"}</span>
            {optionOpen &&
                <div
                    className="absolute top-14 left-0 flex flex-col items-center justify-start text-white w-full bg-black z-50 py-5 gap-5 h-[40vh] overflow-y-scroll border border-gray-600"
                    onMouseLeave={() => { setOptionOpen(false) }}
                >
                    <div
                        className="border-b border-white pb-4 w-full text-center text-sm md:text-md"
                    >Select Tv Genre : </div>
                    {data?.genres.map(opt => {
                        return (<div
                            className="hover:bg-slate-800 py-1 w-full text-center text-sm md:text-md"
                            key={opt.id}
                            onClick={() => {
                                setGenreTv(opt);
                                dispatch(getTvGenre(opt));
                                setOptionOpen(false);
                            }}
                        > {opt.name}</div>);
                    })}
                </div>}
        </>
    )
        :
        (
            <>
                <span
                    className="flex gap-[10px] items-center"
                    onClick={() => { setOptionOpen(true) }}
                >M. Genre <GoSingleSelect className="text-xl" />
                </span>
                <span className="text-sm text-slate-100 pl-1 font-light">- {genreMovie ? genreMovie.name : "All"}</span>
                {optionOpen &&
                    <div
                        className="absolute top-14 left-0 flex flex-col items-center justify-start text-white w-full bg-black z-50 py-5 gap-5 h-[40vh] overflow-y-scroll border border-gray-600"
                        onMouseLeave={() => { setOptionOpen(false) }}
                    >
                        <div
                            className="border-b border-white pb-4 w-full text-center text-sm md:text-md"
                        >Select Movie Genre : </div>
                        {data?.genres.map(opt => {
                            return (<div
                                className="hover:bg-slate-800 py-1 w-full text-center text-sm md:text-md"
                                key={opt.id}
                                onClick={() => {
                                    setGenreMovie(opt);
                                    dispatch(getMovieGenre(opt));
                                    setOptionOpen(false);
                                }}
                            > {opt.name}</div>);
                        })}
                    </div>}
            </>
        );
}
