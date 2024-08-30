import React, { useEffect, useState } from "react";
import { getProfile } from "../api/auth";
import Loading from "./Loading";

const Profile = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("AccessToken");
    const userId = localStorage.getItem("UserId");
    if (!token || !userId) {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("UserId");
      window.location.replace("/");
    }

    getProfile(token, userId).then((res) => {
      setLoading(false);
      if (!res.success) {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("UserId");
        window.location.replace("/");
      }
      setName(res.data.full_name);
      setEmail(res.data.email);
      setPhone(res.data.phone_number);
    });
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <div className="text-center w-10/12 lg:w-1/2 mx-auto">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-24 rounded-full">
              <span className="text-3xl">{name?.[0]}</span>
            </div>
          </div>

          <div className="mt-10 text-lg lg:text-2xl">
            <div className="text-left">Full Name</div>
            <div className="text-left font-bold">{name}</div>
          </div>
          <div className="mt-10 text-lg lg:text-2xl">
            <div className="text-left">Email</div>
            <div className="text-left font-bold">{email}</div>
          </div>
          <div className="mt-10 text-lg lg:text-2xl">
            <div className="text-left">Phone Number</div>
            <div className="text-left font-bold">{phone}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
