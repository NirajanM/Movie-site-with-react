import { useParams } from "react-router-dom";
import SearchRepeater from "../components/SearchRepeater";
import Menu from "../components/Menu";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SearchResult() {
  const { query } = useParams();
  const [type, setType] = useState("multi");

  return (
    <div className="flex max-w-screen-xl mx-auto">
      <Menu />
      <div className="w-full lg:w-5/6 md:px-4 text-white mx-auto mt-10 md:mt-0">
        <section
          id="filters"
          className="flex flex-col mt-4 lg:mt-6 mb-2 lg:mb-4 gap-2 pb-8 "
        >
          <Tabs defaultValue={type} onValueChange={setType}>
            <TabsList className="bg-transparent dark:bg-transparent px-0 gap-2">
              <TabsTrigger
                value="movie"
                className="hover:bg-slate-800 hover:text-slate-300"
              >
                Movies
              </TabsTrigger>
              <TabsTrigger
                value="tv"
                className="hover:bg-slate-800 hover:text-slate-300"
              >
                TV shows
              </TabsTrigger>
              <TabsTrigger
                value="multi"
                className="hover:bg-slate-800 hover:text-slate-300"
              >
                All
              </TabsTrigger>
            </TabsList>
            <TabsContent value="movie">
              <SearchRepeater keyword={query} type="movie" />
            </TabsContent>
            <TabsContent value="tv">
              <SearchRepeater keyword={query} type="tv" />
            </TabsContent>
            <TabsContent value="multi">
              <SearchRepeater keyword={query} type="multi" />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}
