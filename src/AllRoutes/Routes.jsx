import { createBrowserRouter } from "react-router";
import Attendence from "../pages/Attendence";
import CreateStudent from "../pages/CreateStudent";
import EditStudent from "../pages/EditStudent";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import ResultsPage from "../pages/ResultsPage";
import SignUpPage from "../pages/SignUpPage";
import StudentPage from "../pages/StudentPage";
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
      {
        path: "/students",
        element: (
          <ProtectedRoute>
            <StudentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/students/create",
        element: (
          <ProtectedRoute>
            <CreateStudent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/students/:id/edit",
        element: (
          <ProtectedRoute>
            <EditStudent />
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
    path: "/attendence",
    element: (
      <ProtectedRoute>
        <Attendence />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Results",
    element: (
      <ProtectedRoute>
        <ResultsPage />
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
