// src/assets/components/register/Register.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import axios from "../../../../utils/axiosInstance";
import { useUser } from "../../../../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const [image, setImage] = useState("/broken-image.jpg");
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    image: image,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setForm({ ...form, image: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      toast.error("Passwords do not match 🛑");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
        picture: form.image,
      });

      setUser(response.data.user);
      toast.success("Welcome to the tribe 🏄‍♂️");

      // Navigate after a short delay
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-100 to-sky-200 flex flex-col justify-center px-4 py-12">
        <div className="max-w-xl w-full mx-auto bg-white/90 backdrop-blur-sm border border-blue-200 shadow-2xl rounded-3xl p-10">
          <div className="text-center mb-8">
            <img
              className="mx-auto h-14"
              src="https://www.svgrepo.com/show/301692/login.svg"
              alt="surf"
            />
            <h2 className="mt-4 text-3xl font-bold text-sky-800 font-[Pacifico]">
              Join the Lineup
            </h2>
            <p className="text-sm text-gray-500">
              Register now to match boards with your dream waves 🌊
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-sm">
            <div>
              <label className="block font-semibold text-sky-800">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Taylor Knox"
                required
                className="w-full mt-1 px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-sky-800">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="surf_dog89"
                required
                className="w-full mt-1 px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block font-semibold text-sky-800">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@surfmail.com"
                required
                className="w-full mt-1 px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-300 bg-white shadow-sm"
              />
            </div>

            {/* Avatar */}
            <div className="text-center">
              <p className="font-semibold text-sky-800 mb-2">Profile Pic</p>
              <Avatar src={image} sx={{ width: 100, height: 100 }} className="mx-auto" />
              <div className="mt-3">
                <input
                  type="file"
                  accept="image/*"
                  id="avatar-upload"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer inline-block bg-gradient-to-r from-sky-600 to-blue-600 text-white px-4 py-1 rounded-full hover:shadow-lg hover:from-sky-700 transition"
                >
                  Upload Image
                </label>
              </div>
            </div>

            {/* Passwords */}
            <div>
              <label className="block font-semibold text-sky-800">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-sky-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-sky-800">Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-sky-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-3 rounded-xl font-bold tracking-wide hover:from-sky-700 transition transform hover:scale-105 shadow-md"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
