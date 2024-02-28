import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSelector } from "react-redux";
import CastSection from "../components/CastSection";
import DetailSection from "../components/DetailSection";
import Skeleton from "react-loading-skeleton";
import Recommended from "../components/Recommended";

export default function SelectedCinema() {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`${mediaType}/${id}`);
  const { data: similarData, loading: similarLoading } = useFetch(
    `${mediaType}/${id}/similar`
  );
  const { data: recommendationsData, loading: recommendationsLoading } =
    useFetch(`${mediaType}/${id}/recommendations`);
  let { url } = useSelector((state) => state.home);
  url = url.backdrop ? url.backdrop : "https://image.tmdb.org/t/p/original";
  const backdrop = url + data?.backdrop_path;
  const posterpath = url + data?.poster_path;

  return (
    <div className="text-white">
      <LazyLoadImage
        alt={data?.title}
        src={backdrop}
        className="absolute top-0 -z-10 object-cover w-screen h-screen object-center opacity-10"
      />
      <div className="max-w-screen-xl mx-auto sm:px-4 px-2 ">
        <section className="w-full mt-10 md:mt-3 p-4 md:p-0 flex flex-col md:flex-row gap-2 md:gap-10 lg:gap-14 xl:gap-18 relative md:h-[70svh] md:justify-start">
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
        <section className="mt-10 md:mb-20">
          <span className="text-lg sm:text-xl md:text-3xl font-bold text-pahelo opacity-70 italic">
            Cast
          </span>
          <CastSection mediaType={mediaType} id={id} />
        </section>
        <section className="mt-10 md:mb-20">
          <span className="text-lg sm:text-xl md:text-3xl font-bold text-pahelo opacity-70 italic">
            Similar {mediaType === "tv" ? "tv shows" : "movies"}
          </span>
          <Recommended
            data={similarData?.results}
            loading={similarLoading}
            endpoint={mediaType}
          />
        </section>
        <section className="mt-10 md:mb-20">
          <span className="text-lg sm:text-xl md:text-3xl font-bold text-pahelo opacity-70 italic">
            Recommended
          </span>
          <Recommended
            data={recommendationsData?.results}
            loading={recommendationsLoading}
            endpoint={mediaType}
          />
        </section>
      </div>
    </div>
  );
}
