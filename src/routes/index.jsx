import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import NavBar from "../components/NavBar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Booking from "../pages/Booking";
import ConfirmBooking from "../pages/ConfirmBooking";
import Receipt from "../pages/Receipt";
import MyBookings from "../pages/MyBookings";
import Ticket from "../pages/Ticket";
import ResendVerificationEmail from "../pages/ResendVerificationEmail";

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
        <NavBar show="Register" />
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
    path: "/resend-email",
    element: (
      <>
        <NavBar />
        <ResendVerificationEmail />
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
    path: "/confirm",
    element: (
      <>
        <NavBar />
        <ConfirmBooking />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/receipt",
    element: (
      <>
        <NavBar />
        <Receipt />
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
  {
    path: "/my-bookings",
    element: (
      <>
        <NavBar />
        <MyBookings />
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/ticket/:pnr",
    element: (
      <>
        <NavBar />
        <Ticket />
      </>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default APP_ROUTES;
