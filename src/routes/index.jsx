import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import NavBar from "../components/NavBar";
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
        <Login />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <>
        <Register />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default APP_ROUTES;
