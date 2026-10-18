import MediaBrowse from "@/components/MediaBrowse";
import useSeo from "@/hooks/useSeo";

export default function Tvshow() {
  useSeo({
    title: "TV Shows",
    description:
      "Discover popular, top rated and newly released TV shows. Filter by genre and sort by rating or air date.",
  });

  return (
    <MediaBrowse
      mediaType="tv"
      title="TV Shows"
      newestSortValue="first_air_date.desc"
    />
  );
}
