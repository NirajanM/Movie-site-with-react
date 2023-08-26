import ReactStars from "react-rating-stars-component";
import { BiCameraMovie } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { fetchData } from "../utils/api";
import { useNavigate } from "react-router-dom";


export default function DetailSection({ mediaType, id, data, loading }) {
    const ytUrl = "https://www.youtube.com/watch?v=";
    const [allUrls, setAllUrls] = useState(null);

    const [trailer, setTrailer] = useState(false);
    const [trailerLoading, setTrailerLoading] = useState(true);
    useEffect(() => {
        fetchData(`${mediaType}/${id}/videos`).then(
            (res) => {
                console.log(res.results);
                const Urls = res.results.map(item => { return (ytUrl + item.key) });
                const newUrls = Urls.reverse();
                setAllUrls(newUrls);
                setTrailerLoading(false);
            }
        ).catch((err) => {
            console.log(err);
        })
    }, []);
    const navigate = useNavigate();

    return (
        <>
            {trailer ?
                <div
                    className="flex fixed h-screen bg-slate-950/70 w-screen top-0 left-0 justify-center items-center z-50"
                    onClick={() => { setTrailer(false) }}
                >
                    {!trailerLoading && <ReactPlayer url={allUrls} controls={true} playing={true} />}
                </div> : null
            }
            <div className='md:basis-3/4 flex flex-col gap-2'>
                {loading ? <Skeleton width={100} /> : data &&
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
                {
                    loading
                        ?
                        <>
                            <Skeleton width={400} height={80} />
                            <Skeleton width={200} height={23} />

                        </>
                        :
                        <>
                            <span
                                className='text-xl md:text-4xl lg:text-6xl font-bold md:font-black text-pahelo'
                            >{data?.title?.toUpperCase()}</span>

                            <span
                                className='text-xl md:text-4xl lg:text-6xl font-bold md:font-black text-pahelo'
                            >{data?.original_name?.toUpperCase()}</span>
                            <span className='text-slate-300/70 italic font-normal lg:text-xl'>{data?.tagline}</span>
                        </>
                }


                <div>
                    <span></span>
                    {!trailerLoading ?
                        <span
                            className='inline-flex items-center px-2 bg-red-700 gap-1 cursor-pointer hover:bg-red-800 hover:scale-105'
                            onClick={() => { setTrailer(true) }}
                        ><BiCameraMovie /> TRAILER</span>
                        :
                        <Skeleton width={90} height={23} />
                    }
                </div>

                {
                    loading
                        ?
                        <>
                            <Skeleton width="100%" height={18} />
                            <Skeleton width="100%" height={18} />
                            <Skeleton width="50%" height={18} />
                        </>
                        :
                        <p className='lg:text-md'>{data?.overview}</p>

                }
                <div
                    className="mt-5 text-xl md:text-3xl xl:text-4xl text-slate-400 hover:text-white cursor-pointer inline-flex items-center gap-1 font-black border-l-8 border-slate-600/70 px-3 w-fit"
                    onClick={() =>
                        navigate(`play`)
                    }
                >
                    <FaPlay />PLAY
                </div>
            </div>

        </>
    )
}
