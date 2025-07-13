import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./reactQuery/queryClient";
import { appRouter } from "./router/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterProvider router={appRouter} />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);
