import { useParams } from "react-router-dom";
import SearchRepeater from "../components/SearchRepeater";
import Menu from "../components/Menu";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function SearchResult() {
  const { query } = useParams();
  const [type, setType] = useState("multi");
  return (
    <div className="flex max-w-screen-xl mx-auto">
      <Menu />
      <div className="w-full lg:w-5/6 md:px-4 text-white mx-auto mt-10 md:mt-0">
        <section
          id="filters"
          className="flex flex-col mt-4 lg:mt-6 mb-2 lg:mb-4 gap-2 border-b border-white/10 pb-8 "
        >
          <h3 className="text-base lg:text-base text-white/50">Select Type</h3>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[180px] ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="ring-0">
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="tv">TV shows</SelectItem>
              <SelectItem value="multi">Both</SelectItem>
            </SelectContent>
          </Select>
        </section>
        <SearchRepeater keyword={query} type={type} />
      </div>
    </div>
  );
}
