import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
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
