import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './App';




ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
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
