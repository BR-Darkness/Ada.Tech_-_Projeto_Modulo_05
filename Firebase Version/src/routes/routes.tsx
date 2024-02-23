import { createBrowserRouter } from "react-router-dom";
import { CharacterPage } from "../pages/CharacterPage";
import { HomePage } from "../pages/HomePage";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/details/:characterId", 
    element: <CharacterPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/home", 
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register", 
    element: <RegisterPage />,
    errorElement: <ErrorPage />
  }
])