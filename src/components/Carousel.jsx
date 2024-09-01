import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import posterNotFound from "../assets/posterNotFound.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dateFormat from "./dateFormat";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const skeletonItem = () => {
  return (
    <div className="flex flex-col gap-2 w-32 md:w-36 lg:w-40 xl:w-44 group">
      <div className="relative w-32 md:w-36 lg:w-40 xl:w-44 aspect-poster">
        <Skeleton
          count={1}
          className="object-cover w-full h-full object-center"
        />
      </div>
      <Skeleton count={1} className="h-3" />
      <Skeleton count={1} className="h-3" />
    </div>
  );
};

export default function Carousel({ data, loading, endpoint }) {
  //will pass this reference to my carousel component
  const carouselBox = useRef();

  //importing url from configured redux store
  const { url } = useSelector((state) => state.home);

  const navigate = useNavigate();

  //writing logic for left and right movement of carousel

  const navigation = (dir) => {
    const container = carouselBox.current;

    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - container.offsetWidth / 1.234
        : container.scrollLeft + container.offsetWidth / 1.234;

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative pt-7 md:pt-14  max-w-[1024px] ">
      {!loading ? (
        <>
          <span
            onClick={() => navigation("left")}
            className="hidden md:inline absolute left-0 -bottom-10 z-50 cursor-pointer text-slate-300/70 hover:text-white"
          >
            <FaChevronLeft />
          </span>
          <span
            onClick={() => navigation("right")}
            className="hidden md:inline absolute right-0 -bottom-10 z-50 cursor-pointer text-slate-300/70 hover:text-white"
          >
            <FaChevronRight />
          </span>
          <div
            className="flex pb-8 md:pb-0 md:mb-8 gap-4 md:gap-5 overflow-x-scroll my-4 no-scrollbar"
            ref={carouselBox}
          >
            {data?.map((item) => {
              //creating posterUrl if found or noposter url from assest incase of error
              const posterUrl = item.poster_path
                ? url.backdrop + item.poster_path
                : posterNotFound;
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 w-32 md:w-36 lg:w-40 xl:w-44 group cursor-pointer font-light"
                  onClick={() => {
                    navigate(`/${item.media_type || endpoint}/${item.id}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  <div className="relative w-32 md:w-36 lg:w-40 xl:w-44 aspect-poster rounded-md">
                    <LazyLoadImage
                      alt={item.title || item.name}
                      src={posterUrl}
                      className="object-cover w-full h-full object-center rounded-md"
                    />
                  </div>
                  <span className="text-ellipsis overflow-x-hidden whitespace-nowrap group-hover:text-pahelo text-xs md:text-base lg:font-normal">
                    {item.title || item.name}
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-[0.633rem] md:text-xs text-slate-200/70 group-hover:text-pahelo">
                      {dateFormat(item.release_date || item.first_air_date)}
                    </span>
                    <span className="flex gap-1 items-center text-[0.633rem] md:text-xs text-slate-200/80 group-hover:text-pahelo ">
                      {item.vote_average.toFixed(1)}
                      <AiFillStar />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex mb-8 gap-2 overflow-x-scroll my-4 no-scrollbar">
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
  );
}
