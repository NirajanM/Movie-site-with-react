import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';


export default function SelectedCinema() {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`${mediaType}/${id}`);
    let { url } = useSelector((state) => state.home);
    url = url.backdrop ? url.backdrop : "https://image.tmdb.org/t/p/original";
    const backdrop = data ? url + data?.backdrop_path : "";

    return (
        <div className='text-white max-w-screen-xl mx-auto sm:px-4 px-2'>
            <section className='relative w-full aspect-[poster]'>
                {!loading &&
                    <LazyLoadImage alt={data?.title} src={backdrop} className='object-cover w-full h-full object-center ' />}
            </section>
        </div>
    )
}
