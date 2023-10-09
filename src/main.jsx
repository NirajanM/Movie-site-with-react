import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
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
