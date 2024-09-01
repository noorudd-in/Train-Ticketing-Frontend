import React, { useEffect } from "react";
import { getProfile } from "../api/auth";
import { Link } from "react-router-dom";
import { User, Ticket, LogOut } from "lucide-react";
import { useAppStore } from "../store";
import TrainSVG from "/train.svg";

const NavBar = () => {
  const { isLoggedIn, setIsLoggedIn, setUser } = useAppStore();

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    const userId = localStorage.getItem("UserId");
    if (!token || !userId) {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("UserId");
    }
    if (token && userId) {
      getProfile(token, userId).then((res) => {
        if (res.success) {
          setIsLoggedIn(true);
          setUser({
            id: res.data.id,
            full_name: res.data.full_name,
            email: res.data.email,
            phone_number: res.data.phone_number,
            role: res.data.role,
          });
        }
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("UserId");
    window.location.reload();
  };
  return (
    <div className="flex justify-between my-2">
      <Link to="/">
        <h1 className="ml-5">
          <img src={TrainSVG} alt="Train Logo" className="w-12 h-12" />
        </h1>
      </Link>
      <div className="mr-5 no-print">
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0}>
              <button className="btn btn-neutral">Account</button>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile">
                  <User />
                  Profile
                </Link>
              </li>

              <li>
                <a>
                  <Ticket />
                  Bookings
                </a>
              </li>
              <li>
                <a onClick={handleLogout}>
                  <LogOut />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <button className="btn btn-neutral">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
