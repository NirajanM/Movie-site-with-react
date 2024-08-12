import PlayContext from "@/context/PlayContext";
import { fetchData } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export default function SeasonsHolder({ refetchEpisodes }) {
  const { seasonNumber, setSeasonNumber, id } = useContext(PlayContext);
  const seriesDetails = useQuery({
    queryKey: ["series", id],
    queryFn: () => fetchData(`tv/${id}`),
  });
  return (
    <div
      id="seasons-holder"
      className="flex flex-wrap gap-2 mt-5 md:mt-7 lg:mt-8 max-w-screen-xl"
    >
      {seriesDetails?.data?.seasons?.map((item) => {
        return (
          <span
            key={item.id}
            className={`border rounded-sm px-4 py-1 text-base lg:text-lg cursor-pointer hover:bg-gray-50/20 ${
              item.season_number == seasonNumber && "bg-gray-50/20"
            }`}
            onClick={() => {
              setSeasonNumber(item.season_number);
              refetchEpisodes();
            }}
          >
            {item.season_number}
          </span>
        );
      })}
    </div>
  );
}
