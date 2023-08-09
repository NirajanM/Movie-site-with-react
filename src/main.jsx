import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/Root";
import Anotherpage from './routes/Anotherpage';
import './index.css'
import { store } from './store/store';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SelectedMovie from './routes/SelectedMovie';
import PageNotFound from './routes/PageNotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/:mediaType/:id",
    element: <SelectedMovie />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

// {
  //   path: "/search/:query",
  //   element: <SearchResult />,
  // },
  // {
  //   path: "/explore/:mediaType",
  //   element: <Explore />,
  // },
