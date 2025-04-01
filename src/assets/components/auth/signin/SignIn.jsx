// src/assets/components/signin/SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import axios from "../../../../utils/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Waves } from "lucide-react";



function SignIn() {
  const { user,setUser } = useUser();
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
    <ToastContainer/>
    <div className="min-h-screen flex flex-col justify-center bg-gradient-to-br from-sky-100 via-blue-100 to-sky-200 px-4 py-10">
      <div className="max-w-sm w-full mx-auto bg-white/90 backdrop-blur-sm border border-blue-200 rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center">
        <Waves className="text-sky-600 mx-auto h-12" size={40} />
          <h2 className="mt-6 text-2xl font-bold text-sky-800">
            Welcome back, surfer 🌊
          </h2>
          <p className="text-sm text-gray-500">
            Sign in to catch your next session
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-sky-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-sky-200 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sky-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 border border-sky-200 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-2 rounded-xl font-semibold hover:from-sky-700 transition transform hover:scale-105 shadow-md"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Not on board yet?{" "}
          <Link
            to="/register"
            className="font-semibold text-sky-700 hover:text-sky-900 transition"
          >
            Join the tribe →
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}

export default SignIn;
