import React, { useEffect, useState } from "react";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { toast } from "react-hot-toast";
import { resendVerification } from "../api/auth";

const ResendVerificationEmail = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { isLoggedIn } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setLoading(true);
    const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email == "") {
      toast.error("Email required.");
      setLoading(false);
      return;
    }
    if (!email.match(validateEmail)) {
      toast.error("Invalid Email");
      setLoading(false);
      return;
    }
    resendVerification(email).then((res) => {
      setLoading(false);
      if (!res.success) {
        toast.error(res.message);
        return;
      }
      toast.success(res.data, { duration: 4000 });
      navigate("/");
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      return;
    }
    const savedEmail = localStorage.getItem("UserEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);
  return (
    <div className="w-2/3 lg:w-1/3 mx-auto mt-10">
      <h1 className="text-center text-lg lg:text-2xl font-bold">
        Resend Verification Email
      </h1>

      <div className="mt-5">
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
        <button
          className="btn btn-neutral w-full mt-2"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          {loading ? "Please Wait" : "Resend Verification Mail"}
        </button>
      </div>

      <p className="mt-5">
        If your email is not verified or the verification link is expired, you
        can request for new verification link which will be valid for next 2
        hour.
      </p>

      <div>
        <div className="divider">OR</div>
        <button
          className="btn btn-neutral w-full"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default ResendVerificationEmail;
