import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import posterNotFound from "../assets/posterNotFound.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import dateFormat from './dateFormat';

const skeletonItem = () => {
    return (<div className='flex flex-col gap-2 w-32 md:w-36 lg:w-40'>
        <Skeleton count={1} className=' h-52 md:h-56 lg:h-60 w-32 md:w-36 lg:w-40' />
        <Skeleton count={1} className='h-4' />
        <Skeleton count={1} className='h-4' />
    </div>)
}

export default function Carousel({ data, loading, endpoint }) {
    const carouselBox = useRef();
    //importing url from configured redux store
    const { url } = useSelector((state) => state.home);

    const navigate = useNavigate();

    //writing logic for left and right movement of carousel
    const navigation = (dir) => {
        const container = carouselBox.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };
    return (
        <div>
            {/* <span
                onClick={() => navigation("left")}
            >left</span>
            <span
                onClick={() => navigation("right")}
            >right</span> */}

            {!loading ? (
                <div className='flex mb-8 gap-2 overflow-x-scroll my-4 no-scrollbar'>
                    {data?.map((item) => {
                        //creating posterUrl if found or noposter url from assest incase of error
                        const posterUrl = item.poster_path ? url.backdrop + item.poster_path : posterNotFound;
                        return (
                            <div
                                key={item.id}
                                className='flex flex-col gap-2 w-32 md:w-36 lg:w-40'
                                onClick={() =>
                                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                                }>
                                <div className='relative w-32 md:w-36 lg:w-40 aspect-[poster] h-60'>
                                    <LazyLoadImage alt={item.title} src={posterUrl} className='object-cover w-full h-full object-center' />
                                </div>
                                <span className='text-ellipsis overflow-x-hidden whitespace-nowrap'>{item.title || item.name}</span>
                                <span className='text-xs text-slate-200'>{dateFormat(item.release_date)}</span>
                            </div>
                        )
                    })}
                </div>
            ) : (<div className='flex mb-8 gap-2 overflow-x-scroll my-4 no-scrollbar'>
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
