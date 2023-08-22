import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';


export default function SelectedCinema() {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`${mediaType}/${id}`);
    let { url } = useSelector((state) => state.home);
    url = url.backdrop ? url.backdrop : "https://image.tmdb.org/t/p/original";
    const backdrop = data?.backdrop_path ? url + data?.backdrop_path : null;

    return (
        <div className='text-white max-w-screen-xl mx-auto sm:px-4 px-2'>
            <section className='relative w-full aspect-[poster]'>
                {backdrop ?
                    <LazyLoadImage alt={data?.title} src={backdrop} className='object-cover w-full h-full object-center ' /> :
                    <div className=' h-96 w-full flex justify-center items-center gap-2 lg:gap-4 text-lg font-black text-white flex-col'>
                        <span className='text-3xl lg:text-6xl'>404</span>
                        <span className='text-white font-normal lg:text-2xl'>Image not found!</span>
                    </div>
                }
            </section>
        </div>
    )
}
