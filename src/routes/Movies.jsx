import { useSelector } from "react-redux";
import Menu from "../components/Menu";
import Repeater from "../components/Repeater";

export default function Movies() {
  const { movieGenre } = useSelector((state) => state.home);
  return (
    <div className="flex max-w-screen-xl mx-auto">
      <Menu />
      <div className="w-full md:w-5/6 md:pl-9 text-white px-2">
        <Repeater genre={movieGenre.id} endpoint={"movie"} />
      </div>
    </div>
  );
}
