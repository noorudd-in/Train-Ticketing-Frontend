import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Mail, LockKeyhole, User, Phone } from "lucide-react";
import { registerUser } from "../api/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const validatePassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (
      name == "" ||
      phone == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      toast.error("All fields are required.");
      return;
    }
    if (phone.length != 10) {
      toast.error("Phone Number must be 10 digits.");
      return;
    }
    if (!email.match(validateEmail)) {
      toast.error("Invalid Email");
      return;
    }
    if (password != confirmPassword) {
      toast.error("Passsword doesn't match");
      return;
    }
    if (!password.match(validatePassword)) {
      toast.error("Invalid Password Format");
      return;
    }
    const userEmail = email.split("@");
    if (!userEmail[1].toLowerCase().includes("gmail")) {
      toast.error("Only gmails are allowed for registration.");
      return;
    }
    setLoading(true);
    registerUser({ name, phone, email, password }).then((res) => {
      setLoading(false);
      if (!res.success) {
        if (res.error == "SequelizeUniqueConstraintError") {
          toast.error("Email already registered!");
          return;
        } else {
          toast.error("Unable to register user.");
          return;
        }
      }
      toast.success(res.message);
      navigate("/login");
      return;
    });
  };
  return (
    <>
      <Toaster />
      <div className="text-center">
        <div className="w-2/3 lg:w-1/3 mx-auto">
          <h1 className="font-bold text-2xl my-5">Register</h1>
          <div className="my-5">
            <label className="input input-bordered flex items-center gap-2">
              <User />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="my-5">
            <label className="input input-bordered flex items-center gap-2">
              <Phone />
              <input
                type="text"
                className="grow"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>
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
            <p className="text-left text-xs lg:text-sm">
              Must be 7+ letters including uppercase, lowercase, number and
              special character.
            </p>
          </div>
          <div className="my-5">
            <label className="input input-bordered flex items-center gap-2">
              <LockKeyhole />
              <input
                type="password"
                className="grow"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>

          <div>
            <button
              className="btn btn-neutral w-full"
              onClick={handleRegister}
              disabled={loading}
            >
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {loading ? "Please Wait" : "Register"}
            </button>
          </div>
          <div className="mt-2">
            <p>
              Already have an account?{" "}
              <Link to="/login">
                <span className="font-bold">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
