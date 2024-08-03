import { useSelector } from "react-redux";
import Menu from "../components/Menu";
import Repeater from "../components/Repeater";

export default function Tvshow() {
  const { tvGenre } = useSelector((state) => state.home);
  return (
    <div className="flex max-w-screen-xl mx-auto">
      <Menu />
      <div className="w-full lg:w-5/6 md:px-4 text-white">
        <Repeater genre={tvGenre.id} endpoint={"tv"} />
      </div>
    </div>
  );
}
