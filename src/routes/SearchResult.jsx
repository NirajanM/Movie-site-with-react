import { useParams } from "react-router-dom";
import SearchRepeater from "../components/SearchRepeater";
import Menu from "../components/Menu";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import useSeo from "@/hooks/useSeo";

const tabClass =
  "rounded-sm px-3 py-1.5 text-small text-fg-mid transition-colors duration-fast ease-state hover:text-fg-hi data-[state=active]:bg-ink-700 data-[state=active]:text-fg-hi";

export default function SearchResult() {
  const { query } = useParams();
  useSeo({ title: `Search: ${query}`, noindex: true });

  return (
    <div className="mx-auto flex max-w-screen-xl px-4 lg:px-6">
      <Menu />
      <div className="w-full min-w-0 text-fg-hi lg:pl-8">
        <Tabs defaultValue="multi">
          <div className="sticky top-16 z-40 mb-2 flex flex-wrap items-center gap-3 border-b border-line/10 bg-ink-950 px-1 py-3">
            <h1 className="font-display text-xl text-fg-hi">
              Results for <span className="text-pahelo">{query}</span>
            </h1>
            <TabsList className="ml-auto">
              <TabsTrigger value="multi" className={tabClass}>
                All
              </TabsTrigger>
              <TabsTrigger value="movie" className={tabClass}>
                Movies
              </TabsTrigger>
              <TabsTrigger value="tv" className={tabClass}>
                TV shows
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="multi">
            <SearchRepeater keyword={query} type="multi" />
          </TabsContent>
          <TabsContent value="movie">
            <SearchRepeater keyword={query} type="movie" />
          </TabsContent>
          <TabsContent value="tv">
            <SearchRepeater keyword={query} type="tv" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
