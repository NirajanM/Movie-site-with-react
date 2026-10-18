import MediaBrowse from "@/components/MediaBrowse";
import useSeo from "@/hooks/useSeo";

export default function Movies() {
  useSeo({
    title: "Movies",
    description:
      "Discover popular, top rated and newly released movies. Filter by genre and sort by rating or release date.",
  });

  return (
    <MediaBrowse
      mediaType="movie"
      title="Movies"
      newestSortValue="primary_release_date.desc"
    />
  );
}
