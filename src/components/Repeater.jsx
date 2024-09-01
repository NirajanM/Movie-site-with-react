import React, { useRef } from "react";
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

export default function Repeater({ genre, endpoint }) {
  const navigate = useNavigate();
  //will pass this reference to my carousel component
  const carouselBox = useRef();
  //importing url from configured redux store
  const { url } = useSelector((state) => state.home);
  // const [loading, setLoading] = useState(null);
  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);

  //   fetchData(fetchingUrl)
  //     .then((res) => {
  //       setLoading(false);
  //       setItems(res.results);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       setError(err);
  //     });
  // }, [genre]);

  // useEffect(() => {
  //   page !== 1 &&
  //     fetchData(fetchingUrl)
  //       .then((res) => {
  //         setLoading(false);
  //         setItems((prevItems) => [...prevItems, ...res.results]);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         setError(err);
  //       });
  // }, [page]);

  // // Intersection Observer callback function
  // const handleIntersection = (entries) => {
  //   const [entry] = entries;
  //   if (entry.isIntersecting) {
  //     // Scrollbar has reached the bottom
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  // useEffect(() => {
  //   // Create an Intersection Observer
  //   const observer = new IntersectionObserver(handleIntersection, {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0, // Adjust this threshold as needed
  //   });

  //   // Observe the last item in the list
  //   if (carouselBox.current && items.length > 0) {
  //     observer.observe(carouselBox.current.lastChild);
  //   }

  //   return () => {
  //     // Disconnect the Intersection Observer when the component unmounts
  //     observer.disconnect();
  //   };
  // }, [items]);

  const fetchPage = async ({ pageParam = 1 }) => {
    let cinemaFetchingUrl =
      `discover/${endpoint}?page=${pageParam}` +
      (genre && `&with_genres=${genre}`);
    const res = await fetchData(cinemaFetchingUrl);
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
    queryKey: ["items", genre, endpoint],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });
  return (
    <div className="relative mt-16 md:mt-6 min-h-screen">
      {error ? (
        error
      ) : !isLoading ? (
        <>
          <div
            className="grid mx-auto my-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-10 min-h-screen"
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
                      onClick={() => {
                        navigate(`/${item.media_type || endpoint}/${item.id}`);
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
                          {dateFormat(item.release_date || item.first_air_date)}
                        </span>
                        <span className="flex gap-1 items-center text-xs text-slate-200 group-hover:text-pahelo">
                          {item.vote_average.toFixed(1)}
                          <AiFillStar />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center items-center pt-5 pb-10 w-full">
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
        <div className="grid mx-auto my-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-x-3 md:gap-x-5 gap-y-10 min-h-screen">
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
