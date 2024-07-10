import React, { useEffect, useRef, useState } from "react";
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

const skeletonItem = () => {
  return (
    <div className="flex flex-col gap-2 group">
      <div className="relative aspect-poster min-w-[128px] md:min-w-[144px] lg:min-w-[160px]">
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

export default function SearchRepeater({ keyword }) {
  const navigate = useNavigate();
  //will pass this reference to my carousel component
  const carouselBox = useRef();
  //importing url from configured redux store
  const { url } = useSelector((state) => state.home);

  const fetchPage = async ({ pageParam = 1 }) => {
    console.log(pageParam);
    const res = await fetchData(
      `search/multi?query=${keyword}&page=${pageParam}`
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
  } = useInfiniteQuery({
    queryKey: ["search", keyword],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  return (
    <div className="relative my-16 md:my-6">
      {error ? (
        <p>Error: {error.message}</p>
      ) : !isLoading ? (
        <>
          {data?.pages?.length > 0 ? (
            <>
              <div
                className=" grid mx-auto my-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-7 xl:gap-10 "
                ref={carouselBox}
              >
                {data.pages.map((group, i) => (
                  <React.Fragment key={i}>
                    {group.results.map((item) => {
                      //creating posterUrl if found or noposter url from assest incase of error
                      const posterUrl = item.poster_path
                        ? url.backdrop + item.poster_path
                        : posterNotFound;
                      return (
                        <div
                          key={item.id}
                          className="flex flex-col gap-2 group w-full cursor-pointer"
                          onClick={() =>
                            navigate(`/${item.media_type}/${item.id}`)
                          }
                        >
                          <div className="relative aspect-poster min-w-[128px] md:min-w-[144px] lg:min-w-[160px]">
                            <LazyLoadImage
                              alt={item.title}
                              src={posterUrl}
                              className="object-cover w-full h-full object-center "
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
                    className="text-white my-6 text-center font-mono border rounded-md inline py-1 px-2 hover:bg-slate-800/70 hover:border-purple-400"
                  >
                    {isFetchingNextPage ? "Loading.." : "Load more"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-white text-3xl text-center w-full font-mono">
              No result found!
            </div>
          )}
        </>
      ) : (
        <div className=" grid mx-auto my-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-7 xl:gap-10 ">
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
