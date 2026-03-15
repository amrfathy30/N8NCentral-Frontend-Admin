import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./i18n/i18n.js";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <HelmetProvider>
      <ErrorBoundary>
        <PrimeReactProvider>
          <BrowserRouter>
            <App />
            <Toaster richColors position="top-right" />
          </BrowserRouter>
        </PrimeReactProvider>
      </ErrorBoundary>
    </HelmetProvider>
  </Provider>,
);
