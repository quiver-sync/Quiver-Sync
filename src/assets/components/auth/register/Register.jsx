import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import axios from "../../../../utils/axiosInstance";
import { useUser } from "../../../../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Waves } from "lucide-react";

import { AuthFormWrapper } from "../authHelpers/AuthFormWrapper";
import { AuthInput } from "../authHelpers/AuthInput";
import { AuthSubmitButton } from "../authHelpers/AuthSubmitButton";
import { AvatarUploader } from "../authHelpers/AvatarUploader";

function Register() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("/broken-image.jpg");
  const isStrongPassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return regex.test(password);
  };

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

    if (!isStrongPassword(form.password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character 💪"
      );
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
      <AuthFormWrapper
        icon={<Waves size={40} className="text-sky-600 mx-auto h-12" />}
        title="Join the Lineup"
        subtitle="Register now to match boards with your dream waves 🌊"
      >
        <form onSubmit={handleSubmit} className="space-y-6 text-sm">
          <AuthInput
            label="Name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Taylor Knox"
            required
          />

          <AuthInput
            label="Username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="surf_dog89"
            required
          />

          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@surfmail.com"
            required
          />

          <AvatarUploader image={image} onChange={handleImageUpload} />

          <AuthInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            required
          />

          <AuthSubmitButton loading={loading}>Create Account</AuthSubmitButton>
        </form>
      </AuthFormWrapper>
    </>
  );
}

export default Register;
