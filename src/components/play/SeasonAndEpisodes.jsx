import { useQuery } from "@tanstack/react-query";
import EpisodesHolder from "./EpisodesHolder";
import SeasonsHolder from "./SeasonsHolder";
import { fetchData } from "@/utils/api";
import { useContext } from "react";
import PlayContext from "@/context/PlayContext";

export default function SeasonAndEpisodes() {
  const { seasonNumber, id } = useContext(PlayContext);

  const episodesDetail = useQuery({
    queryKey: ["episodes", id, seasonNumber],
    queryFn: () => fetchData(`tv/${id}/season/${seasonNumber}`),
  });
  return (
    <>
      <SeasonsHolder refetchEpisodes={episodesDetail.refetch} />
      <EpisodesHolder />
    </>
  );
}
