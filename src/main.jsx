import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/Root";
import Anotherpage from './routes/Anotherpage';
import './index.css'
import { store } from './store/store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SelectedCinema from './routes/SelectedCinema';
import PageNotFound from './routes/PageNotFound';
import RootLayout from './layouts/rootLayout';
import SearchResult from './routes/SearchResult';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Root />} />
      <Route path=':mediaType/:id' element={<SelectedCinema />} />
      <Route path='search/:query' element={<SearchResult />} />
      <Route path='anotherpage' element={<Anotherpage />} />
      <Route path='*' element={<PageNotFound />} />
    </Route>
  ));

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

// {
//     path: "/search/:query",
//     element: <SearchResult />,
//   },
//   {
//     path: "/explore/:mediaType",
//     element: <Explore />,
//   },
