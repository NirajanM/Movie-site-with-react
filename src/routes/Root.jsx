import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Play } from "lucide-react";
import Carousel from "../components/Carousel";
import OnOff from "../components/OnOff";
import Menu from "../components/Menu";
import SectionHeader from "../components/SectionHeader";
import { fetchData } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import { backdropSources } from "../utils/image";
import ContinueWatching from "@/components/ContinueWatching";
import useSeo from "@/hooks/useSeo";
import { primaryButton, secondaryButton } from "@/components/ui/buttonStyles";

function Root() {
  useSeo();
  const [popularOpt, setPopularOpt] = useState("movie");
  const [topOpt, setTopOpt] = useState("movie");
  const [trendingOpt, setTrendingOpt] = useState("day");

  const pOpt = [
    { name: "Movies", value: "movie" },
    { name: "TV", value: "tv" },
  ];
  const tOpt = [...pOpt];
  const trOpt = [
    { name: "Today", value: "day" },
    { name: "This week", value: "week" },
  ];

  const popular = useQuery({
    queryKey: [popularOpt, "popular"],
    queryFn: () => fetchData(`${popularOpt}/popular`),
  });

  const playing = useQuery({
    queryKey: ["playing"],
    queryFn: () => fetchData("movie/now_playing"),
  });

  const toprated = useQuery({
    queryKey: [topOpt, "toprated"],
    queryFn: () => fetchData(`${topOpt}/top_rated`),
  });

  const trending = useQuery({
    queryKey: [trendingOpt, "trending"],
    queryFn: () => fetchData(`trending/all/${trendingOpt}`),
  });

  const nowPlaying = playing?.data?.results || [];
  const hero = nowPlaying.find((m) => m.backdrop_path) || nowPlaying[0] || null;
  const heroBackdrop = hero?.backdrop_path
    ? backdropSources(hero.backdrop_path)
    : { src: undefined, srcSet: undefined };
  const altTitles = nowPlaying.filter((m) => m.id !== hero?.id).slice(0, 3);

  return (
    <div className="mx-auto flex max-w-screen-xl flex-row-reverse px-4 md:flex-row lg:px-6">
      <Menu />
      <div className="flex w-full min-w-0 flex-col gap-14 overflow-x-hidden text-fg-hi md:gap-20 lg:pl-8">
        <section aria-label="Featured">
          <div className="relative overflow-hidden rounded-none lg:rounded-xl">
            {heroBackdrop.src && (
              <img
                src={heroBackdrop.src}
                srcSet={heroBackdrop.srcSet}
                sizes="100vw"
                fetchpriority="high"
                loading="eager"
                decoding="async"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_0%,rgba(255,223,43,0.06),transparent)]"
            />
            <div className="relative flex min-h-[24rem] flex-col justify-end gap-4 px-5 py-8 sm:min-h-[28rem] lg:px-10 lg:py-12">
              <p className="text-eyebrow uppercase text-pahelo">Now playing</p>
              <h1 className="max-w-2xl font-display text-display-xl text-fg-hi [text-wrap:balance]">
                {hero
                  ? hero.title || hero.name
                  : "Something worth watching tonight."}
              </h1>
              {hero?.overview && (
                <p className="line-clamp-2 max-w-[52ch] text-body text-fg-mid [text-wrap:pretty]">
                  {hero.overview}
                </p>
              )}
              <div className="flex flex-wrap gap-3 pt-1">
                {hero && (
                  <>
                    <Link
                      to={`/movie/${hero.id}/play/1/1`}
                      className={primaryButton}
                    >
                      <Play size={16} fill="currentColor" />
                      Play
                    </Link>
                    <Link to={`/movie/${hero.id}`} className={secondaryButton}>
                      Details
                    </Link>
                  </>
                )}
              </div>
              {altTitles.length > 0 && (
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-fg-mid">
                  <span className="text-fg-low">Also playing</span>
                  {altTitles.map((m) => (
                    <Link
                      key={m.id}
                      to={`/movie/${m.id}`}
                      className="rounded transition-colors duration-fast ease-state hover:text-mato"
                    >
                      {m.title || m.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <ContinueWatching />

        <section>
          <SectionHeader
            eyebrow="This moment"
            title="Trending"
            action={
              <OnOff
                opt={trOpt}
                value={trendingOpt}
                onChange={setTrendingOpt}
              />
            }
          />
          <Carousel
            data={trending?.data?.results}
            loading={trending?.isLoading}
          />
        </section>

        <section>
          <SectionHeader
            eyebrow="In cinemas"
            title="Now playing"
            action={
              <Link
                to="/movies"
                className="text-small text-fg-mid transition-colors duration-fast ease-state hover:text-mato"
              >
                See all
              </Link>
            }
          />
          <Carousel
            data={playing?.data?.results}
            loading={playing?.isLoading}
            endpoint="movie"
          />
        </section>

        <section>
          <SectionHeader
            eyebrow="Most watched"
            title="Popular"
            action={
              <OnOff opt={pOpt} value={popularOpt} onChange={setPopularOpt} />
            }
          />
          <Carousel
            data={popular?.data?.results}
            loading={popular?.isLoading}
            endpoint={popularOpt}
          />
        </section>

        <section className="pb-14 md:pb-24">
          <SectionHeader
            eyebrow="All time"
            title="Top rated"
            action={<OnOff opt={tOpt} value={topOpt} onChange={setTopOpt} />}
          />
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
