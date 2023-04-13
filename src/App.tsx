import router from "@router";
import axios from "axios";
import { RouterProvider } from "react-router-dom";

export const axiosInstance = axios.create({
  baseURL: "https://restcountries.com/v3.1",
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
