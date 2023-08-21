import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';


export default function SelectedCinema() {
    const { mediaType, id } = useParams();
    const movieData = useFetch(`${mediaType}/${id}`);
    let { url } = useSelector((state) => state.home);
    url = url.backdrop ? url.backdrop : "https://image.tmdb.org/t/p/original";
    const backdrop = movieData ? url + movieData.data?.backdrop_path : "";

    return (
        <div className='text-white max-w-screen-xl mx-auto sm:px-4 px-2'>
            <section className='relative w-full aspect-[poster]'>
                {movieData.loading ? <Skeleton className='h-screen w-full' /> :
                    <LazyLoadImage alt={movieData?.data?.title} src={backdrop} className='object-cover w-full h-full object-center ' />}
            </section>
        </div>
    )
}
