import React from "react";
import { degreesToCompass } from "./forecastHelpers";

const ForecastMultiDay = ({ forecastByDay, spotName }) => {
  if (!forecastByDay || forecastByDay.length === 0) return null;

  return (
    <div className="mt-12 border border-sky-100 rounded-2xl overflow-hidden shadow-xl bg-white px-4 sm:px-6 py-4 sm:py-6">
      <h2 className="text-2xl font-bold text-sky-800 text-center py-6 border-b">
        🗓️ 5-Day Surf Forecast {spotName && ` for ${spotName}`}
      </h2>

      <div className="divide-y divide-sky-100">
        {forecastByDay.map((day, index) => (
          <div
            key={index}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-start gap-y-4 gap-x-6 px-4 sm:px-6 py-6 hover:bg-sky-50 transition text-center sm:text-left"
          >
            {/* 📅 Date */}
            <div className="col-span-2 md:col-span-1">
              <p className="text-sm text-sky-500 font-medium">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* 🌊 Wave Height */}
            <div>
              <p className="text-xs text-gray-500">Wave Height</p>
              <p className="font-semibold text-sky-800">
                {day.waveHeight?.toFixed(1)} m
              </p>
            </div>

            {/* 🕒 Swell Period + Direction */}
            <div>
              <p className="text-xs text-gray-500">Swell</p>
              <p className="font-semibold text-sky-800">
                {day.swellPeriod?.toFixed(1)}s •{" "}
                <span className="text-xs">
                  {degreesToCompass(day.swellDirection)} ({day.swellDirection?.toFixed(0)}°)
                </span>
              </p>
            </div>

            {/* 💨 Wind */}
            <div>
              <p className="text-xs text-gray-500">Wind</p>
              <p className="font-semibold text-sky-800">
                {day.windSpeed?.toFixed(1)} m/s •{" "}
                <span className="text-xs">
                  {degreesToCompass(day.windDirection)} ({day.windDirection?.toFixed(0)}°)
                </span>
              </p>
            </div>

            {/* 🌡️ Water Temp */}
            <div className="block">
              {/* If you want to hide this on mobile, change `block` to `hidden sm:block` */}
              <p className="text-xs text-gray-500">Water Temp</p>
              <p className="font-semibold text-sky-800">
                {day.waterTemperature?.toFixed(1)} °C
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastMultiDay;
