import { HomePage } from "@pages";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const HOME_URL = "/";

const routes: RouteObject[] = [
  {
    path: HOME_URL,
    element: <HomePage />,
  },
];
const router = createBrowserRouter(routes);
export default router;
