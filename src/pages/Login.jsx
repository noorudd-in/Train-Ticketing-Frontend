import React, { useEffect, useState } from "react";
import { Mail, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(
    localStorage.getItem("UserEmail") ? true : false
  );
  const { setIsLoggedIn, setUser } = useAppStore();
  let navigate = useNavigate();

  const handleLogin = async () => {
    const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email == "" || password == "") {
      toast.error("All fields are required.");
      return;
    }
    if (!email.match(validateEmail)) {
      toast.error("Invalid Email");
      return;
    }
    if (!rememberEmail) {
      localStorage.removeItem("UserEmail");
    } else {
      localStorage.setItem("UserEmail", email);
    }
    setLoading(true);
    loginUser(email, password).then((data) => {
      setLoading(false);
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setIsLoggedIn(true);
      setUser({
        id: data.data.id,
        full_name: data.data.full_name,
        email: data.data.email,
        phone_number: data.data.phone_number,
        role: data.data.role,
      });
      toast.success("Logged in successfully!");
      localStorage.setItem("AccessToken", data.data.authToken);
      localStorage.setItem("UserId", data.data.id);
      navigate("/");
    });
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("UserEmail");
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);
  return (
    <>
      <Toaster />
      <div className="text-center">
        <div className="w-2/3 lg:w-1/3 mx-auto">
          <h1 className="font-bold text-2xl my-5">Login</h1>
          <div className="my-5">
            <label className="input input-bordered flex items-center gap-2">
              <Mail />
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="my-5">
            <label className="input input-bordered flex items-center gap-2">
              <LockKeyhole />
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="flex justify-end font-bold my-1">
              <Link>Forgot Password?</Link>
            </p>
          </div>
          <div className="my-5">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked={rememberEmail}
                onChange={(e) => setRememberEmail(e.target.checked)}
              />
              <p className="mx-5">Remember my email.</p>
            </label>
          </div>

          <div>
            <button
              className="btn btn-neutral w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {loading ? "Please Wait" : "Login"}
            </button>
          </div>

          <div className="mt-2">
            <p>
              Don't have an account?{" "}
              <Link to="/register">
                <span className="font-bold">Register</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
