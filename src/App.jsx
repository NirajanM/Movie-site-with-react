import Root from "./routes/Root";
import Anotherpage from "./routes/Anotherpage";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SelectedCinema from "./routes/SelectedCinema";
import PageNotFound from "./routes/PageNotFound";
import RootLayout from "./layouts/rootLayout";
import SearchResult from "./routes/SearchResult";
import Play from "./routes/Play";
import Tvshow from "./routes/Tvshow";
import Movies from "./routes/Movies";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "./utils/api";
import { getApiConfigurations } from "./store/rootSlice";
import About from "./routes/About";
import FaqPage from "./routes/Faq";
import Watchlist from "./routes/Watchlist";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConfiguration();
  });

  const fetchConfiguration = () => {
    fetchData("/configuration").then((res) => {
      //extracting necessary url from config response
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      //setting it for global use
      dispatch(getApiConfigurations(url));
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
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
