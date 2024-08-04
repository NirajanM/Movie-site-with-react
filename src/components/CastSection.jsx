import Skeleton from "react-loading-skeleton";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import avatar from "../assets/avatar.svg";
const skeletonItem = () => {
  return (
    <div className="flex flex-col gap-2 w-32 md:w-36 lg:w-40 group">
      <div className="relative w-32 md:w-36 lg:w-40 aspect-poster h-52 md:h-56  lg:h-60">
        <Skeleton
          count={1}
          className="object-cover w-full h-full object-center rounded-sm md:rounded-md"
        />
      </div>
      <Skeleton count={1} className="h-4" />
      <Skeleton count={1} className="h-4" />
    </div>
  );
};

export default function CastSection({ data, loading }) {
  // const { data, loading } = useFetch(`${mediaType}/${id}/credits`);
  const carouselBox = useRef();
  const { url } = useSelector((state) => state.home);

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
    <div className="relative mt-8 md:mb-10">
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
            className="flex pb-8 md:pb-0 md:mb-8 gap-2 md:gap-6 overflow-x-scroll my-4 no-scrollbar"
            ref={carouselBox}
          >
            {data?.cast?.map((item) => {
              const profileUrl = item.profile_path
                ? url.backdrop + item.profile_path
                : avatar;
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 w-32 md:w-36 lg:w-40 group"
                >
                  <div className="relative w-32 md:w-36 lg:w-40 aspect-poster h-52 md:h-56  lg:h-60">
                    <LazyLoadImage
                      alt={item.name}
                      src={profileUrl}
                      className="object-cover w-full h-full object-center rounded-sm md:rounded-md"
                    />
                  </div>
                  <span className="text-ellipsis overflow-x-hidden whitespace-nowrap group-hover:text-pahelo">
                    {item.name || item.original_name}
                  </span>
                  <span className=" group-hover:text-pahelo text-sm">
                    {item.character}
                  </span>
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
          {skeletonItem()}
        </div>
      )}
    </div>
  );
}
