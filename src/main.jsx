import ReactDOM from "react-dom/client";
import "./fonts.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        theme="dark"
      />
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </QueryClientProvider>
  </Provider>
);
