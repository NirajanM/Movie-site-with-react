import ReactStars from "react-rating-stars-component";
import { BiCameraMovie } from "react-icons/bi";
import useFetch from "../hooks/useFetch";
import ReactPlayer from "react-player";
import { useState } from "react";

export default function DetailSection({ mediaType, id, data }) {
    const { data: videos } = useFetch(`${mediaType}/${id}/videos`);
    const ytUrl = "https://www.youtube.com/watch?v=";
    const [trailer, setTrailer] = useState(false);

    return (
        <>
            <div className='md:basis-3/4 flex flex-col gap-2'>
                {data &&
                    <div className='flex items-center gap-2'>
                        <ReactStars
                            count={5}
                            size={24}
                            value={data?.vote_average / 2}
                            isHalf={true}
                            edit={false}
                            activeColor="#ffd700"
                        />
                        <span>{Math.round(data?.vote_average * 10) / 10}/10</span>
                    </div>
                }
                <span className='text-xl md:text-4xl lg:text-6xl font-bold md:font-black text-pahelo'>{data?.title?.toUpperCase()}</span>
                <span className='text-xl md:text-4xl lg:text-6xl font-bold md:font-black text-pahelo'>{data?.original_name?.toUpperCase()}</span>
                <span className='text-slate-300/70 italic font-normal lg:text-xl'>{data?.tagline}</span>
                <div>
                    <span></span>
                    <span
                        className='inline-flex items-center px-2 bg-red-700 gap-1 cursor-pointer'
                        onClick={() => { setTrailer(true) }}
                    ><BiCameraMovie /> TRAILER</span>
                    {trailer ?
                        <div
                            className="flex fixed h-screen bg-slate-950/70 w-screen top-0 left-0 justify-center items-center z-50"
                            onClick={() => { setTrailer(false) }}
                        >
                            <ReactPlayer url={ytUrl + videos?.results?.find((v) => v.type === "Trailer").key} controls={true} playing={true} />
                        </div> : null
                    }
                </div>
                <p className='lg:text-md'>{data?.overview}</p>
            </div>
        </>
    )
}