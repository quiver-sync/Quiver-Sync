import React, { useState, useEffect } from "react";

const boardTypes = [
  {
    label: "Shortboard",
    value: "shortboard",
    image: "https://sharpeyesurfboards.com/cdn/shop/products/SE_Inf72_C_D.jpg?v=1686184146&width=2100",
  },
  {
    label: "Longboard",
    value: "longboard",
    image: "https://solidsurf.co/wp-content/uploads/2019/11/IMG_9979.png",
  },
  {
    label: "Funboard",
    value: "funboard",
    image: "https://surfin.co.il/wp-content/uploads/2023/10/6822x2122-Funboard_Red_Deck.jpg",
  },
  {
    label: "Fish",
    value: "fish",
    image: "https://static.wixstatic.com/media/606590_a5b9af4785634ca9b17b35aa0df4c55e~mv2.png/v1/fill/w_422,h_1196,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/minitwinX.png",
  },
  {
    label: "Gun",
    value: "gun",
    image: "https://images.squarespace-cdn.com/content/v1/59082bc686e6c0132ce8a762/1495493673291-SB5TQXUUN3LLIAIVQ0P6/gun2.jpg",
  },
  {
    label: "Soft-top",
    value: "softtop",
    image: "https://tradewindsurf.com.au/wp-content/uploads/2020/01/ZBWSB70-Super-Wide-Top-blue-19__67044.1570060265.jpg",
  },
];

export default function StepBoardType({ formData, updateField, nextStep }) {
  const [selected, setSelected] = useState(formData.type || "");

  useEffect(() => {
    const selectedType = boardTypes.find((type) => type.value === selected);
    if (selectedType) {
      updateField("type", selectedType.value);
      console.log(selectedType.value)
      updateField("image", selectedType.image);
      
    }
  }, [selected]);

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-sky-800 mb-6 text-center">
        What Kind of Board Is It?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {boardTypes.map((type) => {
          const isActive = selected === type.value;
          return (
            <button
              key={type.value}
              onClick={() => setSelected(type.value)}
              className={`group flex flex-col items-center border rounded-xl sm:rounded-2xl overflow-hidden p-4 transition duration-300 hover:shadow-lg ${
                isActive
                  ? "border-sky-500 bg-sky-50"
                  : "border-gray-200 bg-white hover:bg-sky-50/40"
              }`}
            >
              <div className="relative w-full">
                <img
                  src={type.image}
                  alt={type.label}
                  className="w-full h-32 sm:h-44 object-contain transition group-hover:scale-105"
                />
                {isActive && (
                  <div className="absolute top-2 right-2 bg-sky-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full shadow">
                    Selected
                  </div>
                )}
              </div>
              <div className="mt-3 font-semibold text-sm sm:text-base text-sky-800">
                {type.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-4">
        <button
          onClick={nextStep}
          disabled={!selected}
          className={`w-full sm:w-auto px-6 py-2 rounded-xl font-semibold text-white transition ${
            selected
              ? "bg-sky-600 hover:bg-sky-700 shadow"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Looks good →
        </button>
      </div>
    </div>
  );
}
