import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import NavBar from "../components/NavBar";
import NavBarLoggedOut from "../components/NavBarLoggedOut";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";

const APP_ROUTES = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavBar />
        <Home />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: (
      <>
        <NavBarLoggedOut show="register" />
        <Login />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <>
        <NavBarLoggedOut show="login" />
        <Register />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default APP_ROUTES;
