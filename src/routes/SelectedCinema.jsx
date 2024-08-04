import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import CastSection from "../components/CastSection";
import DetailSection from "../components/DetailSection";
import Skeleton from "react-loading-skeleton";
import Recommended from "../components/Recommended";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/api";
import loadingAnimation from "../assets/loading.json";
import Lottie from "lottie-react";

export default function SelectedCinema() {
  const { mediaType, id } = useParams();

  const cinemaData = useQuery({
    queryKey: [mediaType, id, "data"],
    queryFn: () => fetchData(`${mediaType}/${id}`),
  });

  const cinemaCast = useQuery({
    queryKey: [mediaType, id, "cast"],
    queryFn: () => fetchData(`${mediaType}/${id}/credits`),
  });

  const similarData = useQuery({
    queryKey: [mediaType, id, "similar"],
    queryFn: () => fetchData(`${mediaType}/${id}/similar`),
  });

  const recommendationsData = useQuery({
    queryKey: [mediaType, id, "recommendations"],
    queryFn: () => fetchData(`${mediaType}/${id}/recommendations`),
  });

  let { url } = useSelector((state) => state.home);
  url = url.backdrop ? url.backdrop : "https://image.tmdb.org/t/p/original";

  if (cinemaData.isLoading) {
    return (
      <div className="max-w-screen-xl mx-auto lg:px-4 flex flex-col gap-10 lg:gap-24 pb-10 lg:pb-24 h-screen justify-center items-center">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="h-60 sm:h-72 md:h-80 lg:h-96"
        />
      </div>
    );
  }
  const { data, isLoading: loading } = cinemaData;
  const backdrop = url + data?.backdrop_path;
  const posterpath = url + data?.poster_path;

  return (
    <div className="text-white">
      <LazyLoadImage
        alt={data?.title}
        src={backdrop}
        className="absolute top-0 left-0 -z-10 object-cover w-screen h-screen object-center opacity-10"
      />
      <div className="max-w-screen-xl mx-auto lg:px-4 flex flex-col gap-10 lg:gap-24 pb-10 lg:pb-24">
        <section className="w-full mt-14 md:mt-3 py-6 flex flex-col md:flex-row gap-2 md:gap-10 lg:gap-14 xl:gap-18 relative">
          <div className="md:basis-1/4 md:min-w-60 aspect-poster">
            {loading ? (
              <Skeleton className="aspect-poster" />
            ) : (
              <LazyLoadImage
                src={posterpath}
                alt={data?.title}
                className="md:rounded-md"
              />
            )}
          </div>
          <DetailSection
            mediaType={mediaType}
            id={id}
            data={data}
            loading={loading}
          />
        </section>

        {cinemaCast?.data?.cast.length !== 0 && (
          <section>
            <span className="text-3xl font-bold text-pahelo/90">Cast</span>
            <CastSection
              mediaType={mediaType}
              id={id}
              data={cinemaCast.data}
              loading={cinemaCast.isLoading}
            />
          </section>
        )}

        {similarData?.data?.results.length !== 0 && (
          <section>
            <span className="text-3xl font-bold text-pahelo/90">
              Similar {mediaType === "tv" ? "tv shows" : "movies"}
            </span>
            <Recommended
              data={similarData?.data?.results}
              loading={similarData?.isLoading}
              endpoint={mediaType}
            />
          </section>
        )}

        {recommendationsData?.data?.results.length !== 0 && (
          <section>
            <span className="text-3xl font-bold text-pahelo/90">
              Recommended
            </span>
            <Recommended
              data={recommendationsData?.data?.results}
              loading={recommendationsData?.isLoading}
              endpoint={mediaType}
            />
          </section>
        )}
      </div>
    </div>
  );
}
