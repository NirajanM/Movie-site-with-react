import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';
import CastSection from '../components/CastSection';
import DetailSection from '../components/DetailSection';

export default function SelectedCinema() {
    const { mediaType, id } = useParams();
    const { data } = useFetch(`${mediaType}/${id}`);
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
                    <DetailSection mediaType={mediaType} id={id} data={data} />
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
