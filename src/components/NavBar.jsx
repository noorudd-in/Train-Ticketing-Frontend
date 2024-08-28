import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    const userId = localStorage.getItem("UserId");
    if (token && userId) {
      getProfile(token, userId).then((res) => {
        if (res.success) {
          setIsLoggedIn(true);
        }
      });
    }
  }, []);
  return (
    <div className="flex justify-end my-2 mr-5">
      {isLoggedIn ? (
        <button className="btn btn-neutral">Profile</button>
      ) : (
        <button className="btn btn-neutral">
          <Link to="/login">Login</Link>
        </button>
      )}
    </div>
  );
};

export default NavBar;
