import React from "react";
import { RouterProvider } from "react-router";
import Layout from "./AllRoutes/Layout";
import { router } from "./AllRoutes/Routes";
import { ActiveProvider } from "./context/ActiveProvider";

const App = () => {
  return (
    <ActiveProvider>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </ActiveProvider>
  );
};

export default App;
