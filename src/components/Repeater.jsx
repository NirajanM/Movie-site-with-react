import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import posterNotFound from "../assets/posterNotFound.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import dateFormat from './dateFormat';
import { AiFillStar } from "react-icons/ai";

const skeletonItem = () => {
    return (<div className='flex flex-col gap-2 group'>
        <div className='relative aspect-poster min-w-[128px] md:min-w-[144px] lg:min-w-[160px]'>
            <Skeleton count={1} className='object-cover w-full h-full object-center ' />
        </div>
        <Skeleton count={1} className='h-3' />
        <Skeleton count={1} className='h-3' />
    </div>)
}

export default function Repeater({ data, loading, endpoint }) {
    const navigate = useNavigate();
    //will pass this reference to my carousel component
    const carouselBox = useRef();

    //importing url from configured redux store
    const { url } = useSelector((state) => state.home);


    return (
        <div className='relative my-16 md:my-6'>

            {!loading ? (
                <>
                    <div className=' grid mx-auto my-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-7 xl:gap-10 ' ref={carouselBox}>
                        {data?.map((item) => {
                            //creating posterUrl if found or noposter url from assest incase of error
                            const posterUrl = item.poster_path ? url.backdrop + item.poster_path : posterNotFound;
                            return (
                                <div
                                    key={item.id}
                                    className='flex flex-col gap-2 group'
                                    onClick={() =>
                                        navigate(`/${item.media_type || endpoint}/${item.id}`)
                                    }>
                                    <div className='relative aspect-poster min-w-[128px] md:min-w-[144px] lg:min-w-[160px]'>
                                        <LazyLoadImage alt={item.title} src={posterUrl} className='object-cover w-full h-full object-center ' />
                                    </div>
                                    <span className='text-ellipsis overflow-x-hidden whitespace-nowrap group-hover:text-pahelo'>{item.title || item.name}</span>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-xs text-slate-200 group-hover:text-pahelo'>
                                            {dateFormat(item.release_date || item.first_air_date)}
                                        </span>
                                        <span className='flex gap-1 items-center text-xs text-slate-200 group-hover:text-pahelo pr-4'>
                                            {item.vote_average.toFixed(1)}<AiFillStar />
                                        </span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            ) : (<div className=' grid mx-auto my-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-7 xl:gap-10 '>
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
                {skeletonItem()}
            </div>
            )}
        </div>
    )
}
