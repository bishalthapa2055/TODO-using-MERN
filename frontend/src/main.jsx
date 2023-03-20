import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./store/index";
import { QueryClientProvider, QueryClient } from "react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={6}>
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
