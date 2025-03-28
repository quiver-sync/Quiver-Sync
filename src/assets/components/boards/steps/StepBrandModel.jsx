import React, { useState, useEffect } from "react";

// Simulated brand/model data (replace with API later)
const brandModels = {
  "Channel Islands": ["Rocket Wide", "Happy Everyday", "Two Happy", "CI Mid"],
  Firewire: ["Seaside", "Sunday", "Mashup", "Dominator 2.0"],
  JS: ["Monsta 2020", "Red Baron", "Xero Gravity"],
  Pyzel: ["Ghost", "Phantom", "Gremlin", "Radius"],
  Lost: ["Driver 3.0", "Puddle Jumper", "Mayhem Twin"],
};

export default function StepBrandModel({ formData, updateField, nextStep, prevStep }) {
  const [brand, setBrand] = useState(formData.brand || "");
  const [model, setModel] = useState(formData.model || "");
  const [modelsForBrand, setModelsForBrand] = useState([]);

  useEffect(() => {
    updateField("brand", brand);
    setModelsForBrand(brandModels[brand] || []);
    if (!brandModels[brand]?.includes(model)) setModel(""); // reset model if switching brand
  }, [brand]);

  useEffect(() => {
    updateField("model", model);
  }, [model]);

  const isValid = brand && model;

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-sky-800 mb-6 text-center">
        What Brand & Model Is It?
      </h2>

      <div className="space-y-6">
        {/* Brand Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Surfboard Brand
          </label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          >
            <option value="">Choose a brand</option>
            {Object.keys(brandModels).map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Model Select */}
        {brand && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="">Choose a model</option>
              {modelsForBrand.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={prevStep}
          className="w-full sm:w-auto px-6 py-2 rounded-xl font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          disabled={!isValid}
          className={`w-full sm:w-auto px-6 py-2 rounded-xl font-semibold text-white transition ${
            isValid
              ? "bg-sky-600 hover:bg-sky-700 shadow"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Let’s keep going →
        </button>
      </div>
    </div>
  );
}
