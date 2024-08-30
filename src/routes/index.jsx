import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../pages/Profile";
import Booking from "../pages/Booking";

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
        <NavBar />
        <Login />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: (
      <>
        <NavBar />
        <Register />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/booking",
    element: (
      <>
        <NavBar />
        <Booking />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <>
        <NavBar />
        <Profile />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default APP_ROUTES;
