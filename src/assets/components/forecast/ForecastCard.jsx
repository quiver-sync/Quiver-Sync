// ForecastCard.jsx
import React from "react";

const ForecastCard = ({ label, value, icon, highlight }) => (
  <div
    className={`flex flex-col items-start gap-1 rounded-xl p-4 border ${
      highlight
        ? "bg-sky-100/60 border-sky-300 shadow-md"
        : "bg-white border-gray-200"
    } transition hover:scale-[1.02]`}
  >
    <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
      <span className="text-xl">{icon}</span>
      {label}
    </div>
    <p className={`text-xl font-semibold ${highlight ? "text-sky-800" : "text-sky-700"}`}>
      {value}
    </p>
  </div>
);

export default ForecastCard;
