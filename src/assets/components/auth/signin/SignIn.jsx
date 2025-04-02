import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import axios from "../../../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Waves } from "lucide-react";
import GoogleSignInButton from "./GoogleSignInBtn";

import { AuthFormWrapper } from "../authHelpers/AuthFormWrapper";
import { AuthInput } from "../authHelpers/AuthInput";
import { AuthSubmitButton } from "../authHelpers/AuthSubmitButton";

function SignIn() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/auth/login", form);
      setUser(response.data.user);
      toast.success("Welcome back! 🌊");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <AuthFormWrapper
        icon={<Waves size={40} className="text-sky-600 mx-auto h-12" />}
        title="Welcome back, surfer 🌊"
        subtitle="Sign in to catch your next session"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <AuthInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <AuthSubmitButton loading={loading}>Sign In</AuthSubmitButton>
        </form>

        <div className="my-6 flex items-center gap-4 text-sm text-gray-400">
          <div className="flex-1 border-t" />
          OR
          <div className="flex-1 border-t" />
        </div>

        <GoogleSignInButton />

        <p className="mt-6 text-center text-sm text-gray-500">
          Not on board yet?{" "}
          <Link
            to="/register"
            className="font-semibold text-sky-700 hover:text-sky-900 transition"
          >
            Join the tribe →
          </Link>
        </p>
      </AuthFormWrapper>
    </>
  );
}

export default SignIn;
