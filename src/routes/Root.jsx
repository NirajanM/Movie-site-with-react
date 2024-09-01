import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Carousel from "../components/Carousel";
import OnOff from "../components/OnOff";
import Menu from "../components/Menu";
import { fetchData } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import MovieAnimation from "../assets/movieAnimation.json";
import Lottie from "lottie-react";
import ContinueWatching from "@/components/ContinueWatching";

function Root() {
  const [popularOpt, setPopularOpt] = useState("movie");

  const pOpt = [
    { name: "Movie", value: "movie" },
    { name: "Tv Shows", value: "tv" },
  ];

  const popular = useQuery({
    queryKey: [popularOpt, "popular"],
    queryFn: () => fetchData(`${popularOpt}/popular`),
  });

  const playing = useQuery({
    queryKey: ["playing"],
    queryFn: () => fetchData("movie/now_playing"),
  });

  const [topOpt, setTopOpt] = useState("movie");

  const tOpt = [
    { name: "Movie", value: "movie" },
    { name: "Tv Shows", value: "tv" },
  ];

  const toprated = useQuery({
    queryKey: [topOpt, "toprated"],
    queryFn: () => fetchData(`${topOpt}/top_rated`),
  });

  const [trendingOpt, setTrendingOpt] = useState("day");

  const trOpt = [
    { name: "Today", value: "day" },
    { name: "This Week", value: "week" },
  ];

  const trending = useQuery({
    queryKey: [trendingOpt, "trending"],
    queryFn: () => fetchData(`trending/all/${trendingOpt}`),
  });

  return (
    <div className="flex flex-row-reverse md:flex-row max-w-screen-xl mx-auto ">
      <Menu />
      <div className="w-full lg:pl-9 text-white lg:w-[79%] xl:w-[88%] flex flex-col gap-14 md:gap-28">
        <section className="mt-20 md:mt-0">
          <div
            id="landing-section"
            className="grid grid-cols-1 sm:grid-cols-2 pb-20 sm:pt-20 gap-5 sm:gap:0"
          >
            <div className="flex flex-col h-full items-start justify-end sm:order-last -z-10">
              <Lottie
                animationData={MovieAnimation}
                loop={true}
                className="h-60 sm:h-72 md:h-80 lg:h-96"
              />
            </div>
            <div className="flex flex-col h-full items-start justify-center gap-8 sm:gap-5">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold lg:font-bold w-5/6 sm:w-full">
                Explore, Discover, Enjoy.
              </h1>
              <h2 className="text-lg">
                Our mission is to amplify the joy of cinema exploration,
                offering a user-friendly interface that makes browsing
                effortless and enjoyable. Watch your favorite movies and series
                with ease.{" "}
                <NavLink to="/about" className="text-pahelo">
                  Know more.
                </NavLink>
              </h2>
            </div>
          </div>
        </section>

        <ContinueWatching />

        <section>
          <div>
            <span className="text-pahelo font-black text-3xl">Trending</span>
            <OnOff opt={trOpt} stateChanger={setTrendingOpt} />
          </div>
          <Carousel
            data={trending?.data?.results}
            loading={trending?.isLoading}
          />
        </section>
        <section>
          <span className="text-pahelo font-black text-3xl">Now Playing</span>
          <Carousel
            data={playing?.data?.results}
            loading={playing?.isLoading}
            endpoint={"movie"}
          />
        </section>

        <section>
          <div>
            <span className="text-pahelo font-black text-3xl">Popular</span>
            <OnOff opt={pOpt} stateChanger={setPopularOpt} />
          </div>
          <Carousel
            data={popular?.data?.results}
            loading={popular?.isLoading}
            endpoint={popularOpt}
          />
        </section>

        <section>
          <div>
            <span className="text-pahelo font-black text-3xl">Top rated</span>
            <OnOff opt={tOpt} stateChanger={setTopOpt} />
          </div>
          <Carousel
            data={toprated?.data?.results}
            loading={toprated?.isLoading}
            endpoint={topOpt}
          />
        </section>
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
