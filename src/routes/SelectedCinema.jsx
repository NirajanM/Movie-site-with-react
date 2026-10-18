import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Play } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import CastSection from "../components/CastSection";
import DetailSection from "../components/DetailSection";
import Carousel from "../components/Carousel";
import SectionHeader from "../components/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/utils/api";
import { backdropSources, posterSources, tmdb } from "../utils/image";
import useSeo from "@/hooks/useSeo";

export default function SelectedCinema() {
  const { mediaType, id } = useParams();
  const [showMini, setShowMini] = useState(false);
  const sentinelRef = useRef(null);

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

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowMini(!entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { data, isLoading: loading } = cinemaData;
  const backdrop = backdropSources(data?.backdrop_path);
  const poster = data?.poster_path ? posterSources(data.poster_path) : null;
  const title = data?.title || data?.name || "";
  const year = (data?.release_date || data?.first_air_date || "").slice(0, 4);

  const hasCast = cinemaCast.data?.cast?.length > 0;
  const hasSimilar = similarData.data?.results?.length > 0;
  const hasRecommended = recommendationsData.data?.results?.length > 0;

  useSeo({
    title: title ? `${title}${year ? ` (${year})` : ""}` : undefined,
    description: data?.overview ? data.overview.slice(0, 155) : undefined,
    image:
      tmdb(data?.backdrop_path, "w780") ||
      tmdb(data?.poster_path, "w500") ||
      undefined,
    type: mediaType === "tv" ? "video.tv_show" : "video.movie",
  });

  return (
    <div className="text-fg-hi">
      {showMini && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-line/10 bg-ink-900">
          <div className="mx-auto flex max-w-screen-xl items-center gap-3 px-4 py-2 lg:px-6">
            {poster?.src && (
              <img
                src={poster.src}
                alt=""
                className="h-10 w-7 rounded-sm object-cover"
              />
            )}
            <span className="truncate font-display text-small text-fg-hi">
              {title}
            </span>
            {year && (
              <span className="text-meta tabular-nums text-fg-mid">{year}</span>
            )}
            <Link
              to={`/${mediaType}/${id}/play/1/1`}
              className="ml-auto inline-flex items-center gap-2 rounded-md bg-pahelo px-4 py-1.5 text-small font-semibold text-onaccent transition duration-fast ease-state hover:bg-pahelo-deep"
            >
              <Play size={14} fill="currentColor" />
              Play
            </Link>
          </div>
        </div>
      )}

      <div className="relative">
        <div
          ref={sentinelRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 h-px w-full"
        />
        {backdrop.src && (
          <img
            src={backdrop.src}
            srcSet={backdrop.srcSet}
            sizes="100vw"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            alt=""
            className="absolute inset-x-0 top-0 h-[70dvh] w-full object-cover object-top"
          />
        )}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-[70dvh] bg-gradient-to-b ${
            loading
              ? "from-ink-900 to-ink-950"
              : "from-ink-950/40 via-ink-950/75 to-ink-950"
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[70dvh] bg-[radial-gradient(60%_50%_at_20%_0%,rgba(255,223,43,0.06),transparent)]"
        />

        <div className="relative mx-auto max-w-screen-xl px-4 pb-12 pt-10 lg:px-6">
          <section className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="w-40 shrink-0 md:w-56">
              {loading || !poster ? (
                <Skeleton className="aspect-poster rounded-lg" />
              ) : (
                <img
                  src={poster.src}
                  srcSet={poster.srcSet}
                  sizes="(max-width: 768px) 40vw, 240px"
                  alt={title}
                  decoding="async"
                  style={{ viewTransitionName: "poster" }}
                  className="aspect-poster w-full rounded-lg object-cover shadow-pop"
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

          {(cinemaCast.isLoading || hasCast) && (
            <section className="mt-16">
              <SectionHeader eyebrow="Who is in it" title="Cast" />
              <CastSection
                mediaType={mediaType}
                id={id}
                data={cinemaCast.data}
                loading={cinemaCast.isLoading}
              />
            </section>
          )}

          {(similarData.isLoading || hasSimilar) && (
            <section className="mt-16">
              <SectionHeader
                eyebrow="More like this"
                title={`Similar ${mediaType === "tv" ? "TV shows" : "movies"}`}
              />
              <Carousel
                data={similarData.data?.results}
                loading={similarData.isLoading}
                endpoint={mediaType}
              />
            </section>
          )}

          {(recommendationsData.isLoading || hasRecommended) && (
            <section className="mt-16">
              <SectionHeader eyebrow="Because you watched" title="Recommended" />
              <Carousel
                data={recommendationsData.data?.results}
                loading={recommendationsData.isLoading}
                endpoint={mediaType}
              />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
