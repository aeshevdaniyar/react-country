import { CountryPage, FavoritePage, HomePage } from "@pages";
import { createBrowserRouter, RouteObject } from "react-router-dom";

export const HOME_URL = "/";
export const FAVORITE_URL = "/favorite";
export const COUNTRY_URl = "/country";

const routes: RouteObject[] = [
  {
    path: HOME_URL,
    element: <HomePage />,
  },
  
  {
    path: COUNTRY_URl + "/:name",
    element: <CountryPage />,
  },

  {
    path: FAVORITE_URL,
    element: <FavoritePage />,
  },

];

const router = createBrowserRouter(routes);
export default router;
