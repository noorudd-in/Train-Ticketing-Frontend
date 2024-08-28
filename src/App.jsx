import "./App.css";
import { RouterProvider } from "react-router-dom";
import APP_ROUTES from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={APP_ROUTES} />
    </>
  );
}

export default App;
