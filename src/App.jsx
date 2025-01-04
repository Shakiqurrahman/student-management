import React from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import Layout from "./AllRoutes/Layout";
import { router } from "./AllRoutes/Routes";
import AppProviders from "./context/AppProviders";

const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
      <Toaster position="top-center" />
    </AppProviders>
  );
};

export default App;
