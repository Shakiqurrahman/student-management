import React from "react";
import { AuthProvider } from "./AuthProvider";

const AppProviders = ({ children }) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

export default AppProviders;
