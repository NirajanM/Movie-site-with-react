import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import PlayContext from "@/context/PlayContext";
import { fetchData } from "@/utils/api";

export default function SeasonsHolder({ refetchEpisodes }) {
  const { seasonNumber, setSeasonNumber, id } = useContext(PlayContext);

  const seriesDetails = useQuery({
    queryKey: ["series", id],
    queryFn: () => fetchData(`tv/${id}`),
  });

  return (
    <div className="flex flex-wrap gap-2">
      {seriesDetails?.data?.seasons?.map((item) => {
        const active = item.season_number == seasonNumber;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            onClick={() => {
              setSeasonNumber(item.season_number);
              refetchEpisodes();
            }}
            className={`rounded-md border px-3 py-1.5 text-small transition-colors duration-fast ease-state ${
              active
                ? "border-pahelo/60 bg-line/5 text-fg-hi"
                : "border-line/15 text-fg-mid hover:border-line/30 hover:text-fg-hi"
            }`}
          >
            Season {item.season_number}
          </button>
        );
      })}
    </div>
  );
}
