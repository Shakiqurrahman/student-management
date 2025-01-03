import { createBrowserRouter } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import WaitingPage from "../pages/WaitingPage";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/waiting",
    element: (
      <ProtectedRoute>
        <WaitingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
