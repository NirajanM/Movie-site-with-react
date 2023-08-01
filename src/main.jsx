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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/anotherpage",
    element: <Anotherpage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
