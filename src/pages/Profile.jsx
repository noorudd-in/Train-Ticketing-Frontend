import { useEffect } from "react";
import { useAppStore } from "../store";
import { getProfile } from "../api/auth";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { isLoggedIn, user, setUser, setIsLoggedIn, removeUser } =
    useAppStore();

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.replace("/");
      return;
    }
    const token = localStorage.getItem("AccessToken");
    const userId = localStorage.getItem("UserId");
    if (!user.role) {
      getProfile(token, userId).then((res) => {
        if (!res.success) {
          toast.error("Session Expired Please login again.");
          setIsLoggedIn(false);
          removeUser();
          return;
        }
        setUser({
          id: res.data.id,
          full_name: res.data.full_name,
          email: res.data.email,
          phone_number: res.data.phone_number,
          role: res.data.role,
        });
      });
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
            {user?.role?.[0]?.toUpperCase() + user?.role?.slice(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
