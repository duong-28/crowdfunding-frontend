import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateProjectPage from "./pages/CreateProjectPage"
import UserPage from "./pages/UserPage.jsx";

import NavBar from "./components/NavBar";
import { AuthProvider } from "./components/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/projects", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/projects/:id", element: <ProjectPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/create-project", element: <CreateProjectPage /> },
      { path: "/user-page", element: <UserPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* Here we wrap our app in the router provider so they render */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)