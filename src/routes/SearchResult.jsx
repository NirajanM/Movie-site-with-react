import { useParams } from "react-router-dom";
import SearchRepeater from "../components/SearchRepeater";
import Menu from "../components/Menu";

export default function SearchResult() {
  const { query } = useParams();
  return (
    <div className="flex max-w-screen-xl mx-auto">
      <Menu />
      <div className="w-full lg:w-5/6 md:px-4 text-white mx-auto">
        <SearchRepeater keyword={query} />
      </div>
    </div>
  );
}
