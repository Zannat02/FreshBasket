import React from "react";
import { createBrowserRouter } from "react-router";

import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "shop", element: <Shop /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);