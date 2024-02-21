import { createBrowserRouter } from "react-router-dom";
import { CharacterPage } from "../pages/CharacterPage";
import { HomePage } from "../pages/HomePage";
import { ErrorPage } from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/details/:characterName", 
    element: <CharacterPage />,
    errorElement: <ErrorPage />
  }
])