import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/App.jsx";
import { bootstrapAdvancedConsent } from "@/lib/cookieConsent";

// Loads gtag.js and the Meta Pixel base code unconditionally (Advanced
// Consent Mode) before React mounts. index.html has already set the
// consent "default" to denied for the EEA/UK/CH, so nothing identifiable
// is sent until the cookie banner grants consent.
bootstrapAdvancedConsent();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
