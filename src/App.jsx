import { lazy } from "react";
import Root from "./routes/Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./routes/ErrorPage";

const Anotherpage = lazy(() => import("./routes/Anotherpage"));
const SelectedCinema = lazy(() => import("./routes/SelectedCinema"));
const PageNotFound = lazy(() => import("./routes/PageNotFound"));
const SearchResult = lazy(() => import("./routes/SearchResult"));
const Play = lazy(() => import("./routes/Play"));
const Tvshow = lazy(() => import("./routes/Tvshow"));
const Movies = lazy(() => import("./routes/Movies"));
const About = lazy(() => import("./routes/About"));
const FaqPage = lazy(() => import("./routes/Faq"));
const Watchlist = lazy(() => import("./routes/Watchlist"));

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<Root />} />
        <Route path=":mediaType/:id" element={<SelectedCinema />} />
        <Route path=":mediaType/:id/play/:season/:episode" element={<Play />} />
        <Route path="search/:query" element={<SearchResult />} />
        <Route path="anotherpage" element={<Anotherpage />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="tvshow" element={<Tvshow />} />
        <Route path="movies" element={<Movies />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}
