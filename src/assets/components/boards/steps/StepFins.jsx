import React, { useState, useEffect } from "react";
import { finOptions } from "../demosdbhelpers/finOptions";
import axios from "../../../../utils/axiosInstance"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

export default function StepFins({ formData, updateField, prevStep }) {
  const [fins, setFins] = useState(formData.fins || "");
  const navigate = useNavigate();

  useEffect(() => {
    updateField("fins", fins);
    console.log(formData)
  }, [fins]);

  const isValid = !!fins;

  const handleSubmit = async () => {
    console.log(formData)
    try {
      const res = await axios.post("/boards", formData);
      console.log("✅ Board saved:", res.data);

      // Optional: redirect to user quiver or show confirmation
      navigate("/"); // or "/myboards"
    } catch (err) {
      console.error("❌ Failed to save board:", err.response?.data || err.message);
      alert("Something went wrong while saving your board. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-sky-800 mb-6 text-center">
        Select Your Fin Setup
      </h2>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        {finOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setFins(option.value)}
            className={`relative group rounded-2xl border p-4 transition text-left shadow-sm hover:shadow-md ${
              fins === option.value
                ? "border-sky-500 bg-sky-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={option.image}
                alt={option.name}
                className="w-12 h-12 object-contain"
              />
              <div>
                <h3 className="text-base font-semibold text-gray-800">{option.name}</h3>
                {option.description && (
                  <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                )}
              </div>
            </div>

            {fins === option.value && (
              <span className="absolute top-2 right-2 text-xs bg-sky-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                Selected
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={prevStep}
          className="w-full sm:w-auto px-6 py-2 rounded-xl font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full sm:w-auto px-6 py-2 rounded-xl font-semibold text-white transition ${
            isValid ? "bg-sky-600 hover:bg-sky-700 shadow" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Finish →
        </button>
      </div>
    </div>
  );
}
