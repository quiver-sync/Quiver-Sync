import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axiosInstance";
import surfboardBrands from "./demosdbhelpers/Brands";

const PushBrandsToDB = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const pushBrands = async () => {
      try {
        const res = await axios.post("/brands", surfboardBrands);
        console.log("Brands uploaded:", res.data);
        setTimeout(() => navigate("/"), 2000);
      } catch (err) {
        console.error("Upload failed:", err.response?.data || err.message);
      }
    };

    pushBrands();
  }, [navigate]);

  return (
    <div className="text-center py-20 text-sky-600 font-semibold">
      Uploading brands to database...
    </div>
  );
};

export default PushBrandsToDB;
