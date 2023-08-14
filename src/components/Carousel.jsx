import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import posterNotFound from "../assets/posterNotFound.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
                                className='flex flex-col gap-2'
                                onClick={() =>
                                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                                }>
                                <div className='relative w-32 md:w-36 lg:w-40 aspect-[poster]'>
                                    <LazyLoadImage alt={item.title} src={posterUrl} className='object-cover w-full h-full object-center' />
                                </div>
                                <span>{item.original_title}</span>
                            </div>
                        )
                    })}
                </div>
            ) : (<span>loading ...</span>)}
        </div>
    )
}
