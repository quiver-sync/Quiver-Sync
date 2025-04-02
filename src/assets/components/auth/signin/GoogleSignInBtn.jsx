import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import
import axios from "../../../../utils/axiosInstance";
import { useUser } from "../../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleSignInButton = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential); // ✅ Works now
      console.log("Decoded Google user:", decoded);

      const res = await axios.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      setUser(res.data.user);
      toast.success("Signed in with Google 🌞");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("Google sign-in failed.");
      console.error("Google login error:", err);
    }
  };

  const handleError = () => {
    toast.error("Google login failed. Try again.");
  };

  return (
    <div className="text-center">
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleSignInButton;
