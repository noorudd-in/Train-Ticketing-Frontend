import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth";
import Loading from "../components/Loading";
import { useAppStore } from "../store";

const Profile = () => {
  const { isLoggedIn, user } = useAppStore();

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace("/");
    }
  }, []);
  return (
    <div>
      <div className="text-center w-10/12 lg:w-1/2 mx-auto">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-24 rounded-full">
            <span className="text-3xl">{user.full_name?.[0]}</span>
          </div>
        </div>

        <div className="mt-10 text-lg lg:text-2xl">
          <div className="text-left">Full Name</div>
          <div className="text-left font-bold">{user.full_name}</div>
        </div>
        <div className="mt-10 text-lg lg:text-2xl">
          <div className="text-left">Email</div>
          <div className="text-left font-bold">{user.email}</div>
        </div>
        <div className="mt-10 text-lg lg:text-2xl">
          <div className="text-left">Phone Number</div>
          <div className="text-left font-bold">{user.phone_number}</div>
        </div>
        <div className="mt-10 text-lg lg:text-2xl">
          <div className="text-left">Role</div>
          <div className="text-left font-bold">
            {user.role[0].toUpperCase() + user.role.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
