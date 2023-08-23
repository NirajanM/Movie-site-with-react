import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { BiCameraMovie } from "react-icons/bi";
import CastSection from '../components/CastSection';



export default function SelectedCinema() {
    const { mediaType, id } = useParams();
    const { data } = useFetch(`${mediaType}/${id}`);
    // const { data: videos } = useFetch(`${mediaType}/${id}/videos`);
    // console.log(videos?.results.find(v => v.type === 'Trailer'));
    let { url } = useSelector((state) => state.home);
    url = url.backdrop ? url.backdrop : "https://image.tmdb.org/t/p/original";
    const backdrop = url + data?.backdrop_path;
    const posterpath = url + data?.poster_path;

    return (
        <div className='text-white'>
            <LazyLoadImage alt={data?.title} src={backdrop} className='absolute top-0 -z-10 object-cover w-screen h-screen object-center opacity-10' />
            <div className='max-w-screen-xl mx-auto sm:px-4 px-2  '>
                <section className='w-full mt-10 md:mt-3 p-4 md:p-0 flex flex-col md:flex-row gap-2 md:gap-10 lg:gap-14 xl:gap-18 min-h-50'>
                    <div className='md:basis-1/4 md:min-w-60'>
                        <LazyLoadImage src={posterpath} alt={data?.title} className='md:rounded-md' />
                    </div>
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
                        <span className='text-xl md:text-4xl lg:text-6xl font-bold md:font-black text-pahelo'>{data?.title.toUpperCase()}</span>
                        <span className='text-slate-300/70 italic font-normal lg:text-xl'>{data?.tagline}</span>
                        <div>
                            <span></span>
                            <span
                                className='inline-flex items-center px-2 bg-red-700 gap-1 cursor-pointer'
                            ><BiCameraMovie /> TRAILER</span>
                        </div>
                        <p className='lg:text-md'>{data?.overview}</p>
                    </div>
                </section>
                <section className='mt-10 mb-20'>
                    <span className='text-lg sm:text-xl md:text-3xl font-semibold text-slate-200/80'>Cast</span>
                    <CastSection mediaType={mediaType} id={id} />
                </section>
            </div>
        </div>
    )
}

// {!loading && backdrop ?
//     <LazyLoadImage alt={data?.title} src={backdrop} className='object-cover w-screen h-screen object-center opacity-10' /> :
//     <div className=' h-96 w-full flex justify-center items-center gap-2 lg:gap-4 text-lg font-black text-white flex-col'>
//         <span className='text-3xl lg:text-6xl'>404</span>
//         <span className='text-white font-normal lg:text-2xl'>Image not found!</span>
//     </div>
// }
