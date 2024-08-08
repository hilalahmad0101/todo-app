import React, { useEffect } from "react";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import DashBoard from "./admin/scenes/dashBoard";
import UploadContent from "./admin/scenes/uploadContent";
import ForgeViewer from "./pages/ForgeViewer";
import ViewContent from "./admin/scenes/viewContent";
import AdminLayout from "./admin";
import Project from "./pages/Project";
import UserList from "./admin/scenes/userslist";
import Comments from "./admin/scenes/global/Comments";
import UserProjects from "./admin/scenes/UserProjects";
import View360 from "./pages/View360";
import CreateUser from "./admin/scenes/createUser";

const ProtectedRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || (role && user.role !== role)) {
    // If user is not logged in or doesn't have the required role, redirect to the signin page
    return <Navigate to="/" />;
  }

  return children;
};

function CustomRoute() {
  const navigate = useNavigate();

  // Define routes
  const routes = useRoutes([
    { path: "/", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/forgeviewer", element: <ForgeViewer /> },
    { path: "/View360", element: <View360 /> },

    {
      path: "/project",
      element: (
        <ProtectedRoute role="USER">
          <Project />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute role="ADMIN">
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <DashBoard /> },
        { path: "uploadContent", element: <UploadContent /> },
        { path: "viewContent", element: <ViewContent /> },
        { path: "createUsers", element: <CreateUser /> },
        { path: "usersList", element: <UserList /> },
        { path: "userProjects", element: <UserProjects /> },
        { path: "commentsList", element: <Comments /> },

        { path: "*", element: <Navigate to="dashboard" /> }, // Redirect to dashboard for any unmatched route
      ],
    },
    { path: "*", element: <Navigate to="/" /> }, // Redirect to signin for any unmatched route
  ]);

  useEffect(() => {
    // Redirect if user is logged in and tries to access certain routes
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/signup"
      ) {
        // Redirect logged-in users away from the sign-in and signup pages
        if (user.role === "USER") {
          navigate("/project");
        } else if (user.role === "ADMIN") {
          navigate("/admin/dashboard");
        }
      }
    }
  }, [navigate]);

  return routes;
}

export default CustomRoute;
