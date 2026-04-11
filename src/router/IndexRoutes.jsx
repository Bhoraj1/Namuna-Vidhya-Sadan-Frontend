import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/shared/NotFound";
import PublicLayout from "../layout/PublicLayout";
import PublicRoutes from "./PublicRoutes";

export const indexRouter = createBrowserRouter([
  {
     path: "",
    element: <PublicLayout />,
    children: PublicRoutes,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
