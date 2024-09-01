import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import posterNotFound from "../assets/posterNotFound.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import dateFormat from "./dateFormat";
import { fetchData } from "../utils/api";
import { AiFillStar } from "react-icons/ai";
import { useInfiniteQuery } from "@tanstack/react-query";
import ghostLoading from "../assets/ghostLoading.json";
import Lottie from "lottie-react";

const skeletonItem = () => {
  return (
    <div className="flex flex-col gap-2 group">
      <div className="relative aspect-poster">
        <Skeleton
          count={1}
          className="object-cover w-full h-full object-center "
        />
      </div>
      <Skeleton count={1} className="h-3" />
      <Skeleton count={1} className="h-3" />
    </div>
  );
};

export default function SearchRepeater({ keyword, type }) {
  const navigate = useNavigate();
  //will pass this reference to my carousel component
  const carouselBox = useRef();
  //importing url from configured redux store
  const { url } = useSelector((state) => state.home);

  const fetchPage = async ({ pageParam = 1 }) => {
    console.log(pageParam);
    const res = await fetchData(
      `search/${type}?query=${keyword}&page=${pageParam}`
    );
    return res;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["search", keyword],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  useEffect(() => {
    refetch();
  }, [type]);

  return (
    <div className="relative">
      {error ? (
        <p>Error: {error.message}</p>
      ) : !isLoading ? (
        <>
          {data?.pages?.length > 0 && data?.pages[0]?.results?.length > 0 ? (
            <>
              <div
                className="grid mx-auto my-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-10"
                ref={carouselBox}
              >
                {data.pages.map((group, i) => (
                  <React.Fragment key={i}>
                    {group.results.map((item) => {
                      if (item.media_type === "person") {
                        return;
                      }
                      //creating posterUrl if found or noposter url from assest incase of error
                      const posterUrl = item.poster_path
                        ? url.backdrop + item.poster_path
                        : posterNotFound;
                      return (
                        <div
                          key={item.id}
                          className="flex flex-col gap-2 group w-full cursor-pointer"
                          onClick={() => {
                            navigate(`/${item.media_type || type}/${item.id}`);
                            window.scrollTo(0, 0);
                          }}
                        >
                          <div className="relative aspect-poster rounded-md">
                            <LazyLoadImage
                              alt={item.title}
                              src={posterUrl}
                              className="object-cover w-full h-full object-center rounded-md"
                            />
                          </div>
                          <span className="text-ellipsis overflow-x-hidden whitespace-nowrap group-hover:text-pahelo">
                            {item.title || item.name}
                          </span>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-slate-200 group-hover:text-pahelo">
                              {dateFormat(
                                item.release_date || item.first_air_date
                              )}
                            </span>
                            <span className="flex gap-1 items-center text-xs text-slate-200 group-hover:text-pahelo">
                              {item.vote_average?.toFixed(1)}
                              <AiFillStar />
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div className="flex flex-col gap-2 group w-full cursor-pointer items-center justify-center h-full">
                {hasNextPage && (
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="text-white my-6 text-center font-mono border rounded-md inline py-1 px-2 hover:bg-slate-800/70 hover:border-pahelo"
                  >
                    {isFetchingNextPage ? "Loading.." : "Load more"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-center lg:text-left lg:items-start w-full ">
              <Lottie
                animationData={ghostLoading}
                loop={true}
                className="h-52 sm:h-56 md:h-64 opacity-80"
              />
              <div className="font-mono">
                <p className="text-base md:text-lg text-red-200/70">
                  Oops! We couldn&apos;t find any results.
                </p>
                <p className="text-xs md:text-sm text-white/80 py-1">
                  Try adjusting your search or explore our popular movies and TV
                  shows!
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="grid mx-auto my-4 grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-10 min-h-screen">
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
  );
}
