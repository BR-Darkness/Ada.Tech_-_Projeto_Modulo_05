import { createBrowserRouter } from "react-router-dom";
import { CharacterPage } from "../pages/CharacterPage";
import { HomePage } from "../pages/HomePage";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

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
  },
  {
    path: "/login", 
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register", 
    element: <RegisterPage />,
    errorElement: <ErrorPage />
  }
])