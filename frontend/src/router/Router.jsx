import { createBrowserRouter } from "react-router-dom";

import Layout from "../layout/Layout";
import NotFound from "../components/NotFound.jsx";
import Home from "../pages/Home.jsx";
import UserAuth from "../pages/UserAuth.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <UserAuth type="Sign-In" />,
      },
      {
        path: "/register",
        element: <UserAuth type="Sign Up" />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
