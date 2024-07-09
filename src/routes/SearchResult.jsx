import { useParams } from "react-router-dom";
import SearchRepeater from "../components/SearchRepeater";

export default function SearchResult() {
  const { query } = useParams();
  return (
    <div className="flex max-w-screen-xl mx-auto">
      <div className="w-full md:w-5/6 md:pl-9 text-white px-2">
        <SearchRepeater keyword={query} />
      </div>
    </div>
  );
}
