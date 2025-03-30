import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "../../../utils/axiosInstance";
import ForecastCard from "./ForecastCard"

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 34.0195,
  lng: -118.4912,
};

function Forecast() {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [forecast, setForecast] = useState(null);
  const autocompleteRef = useRef(null);

  const libraries = ["places"];
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // 📍 When user selects a location from autocomplete
  const handlePlaceSelect = async () => {
    const place = autocompleteRef.current.getPlace();
    if (!place.geometry) return;

    const location = place.geometry.location;
    const lat = location.lat();
    const lng = location.lng();

    setMapCenter({ lat, lng });
    setMarkerPosition({ lat, lng });

    await fetchForecast(lat, lng);
  };

  // 📍 When user clicks "Use My Location"
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setMapCenter({ lat, lng });
        setMarkerPosition({ lat, lng });

        await fetchForecast(lat, lng);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Showing default map.");
        setMapCenter(defaultCenter);
        setMarkerPosition(defaultCenter);
      }
    );
  };

  // 🔁 Called from both location and search
  const fetchForecast = async (lat, lng) => {
    try {
      const res = await axios.post("/forecast", { lat, lng });
      setForecast(res.data);
      console.log("📡 Forecast response:", res.data);
    } catch (err) {
      console.error("Forecast error:", err.message);
    }
  };

  // 📦 Try geolocation once when page loads
  useEffect(() => {
    handleUseMyLocation();
  }, []);

  if (!isLoaded) return <div className="text-center py-20">Loading map...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-sky-800 text-center">
          Search a Surf Spot 🌊
        </h1>

        {/* Autocomplete Search Bar */}
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceSelect}
        >
          <input
            type="text"
            placeholder="Enter a beach, break, or city"
            className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow focus:ring-2 focus:ring-sky-500"
          />
        </Autocomplete>

        {/* Map + Floating Button */}
        <div className="relative">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={10}
          >
            {markerPosition && <Marker position={markerPosition} />}
          </GoogleMap>

          {/* 📍 Use My Location Button */}
          <div className="absolute bottom-6 right-6 z-10">
            <button
              onClick={handleUseMyLocation}
              className="bg-white border border-gray-300 hover:border-sky-500 shadow-md rounded-full p-3 transition duration-300 hover:shadow-lg"
              title="Use My Location"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-sky-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0zm9-5v2m0 10v2m5-7h2M4 12H2"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Forecast Display */}
        {forecast && (
          <div className="mt-10 bg-gradient-to-br from-white to-sky-50 border border-sky-100 rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300">
            <h2 className="text-2xl font-bold text-sky-800 mb-6 text-center tracking-tight">
              🌊 Surf Forecast Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sky-900">
              <ForecastCard
                label="Wave Height"
                value={`${forecast.waveHeight?.toFixed(1)} m`}
                icon="🌊"
                highlight
              />
              <ForecastCard
                label="Swell Period"
                value={`${forecast.swellPeriod?.toFixed(1)} s`}
                icon="🕒"
              />
              <ForecastCard
                label="Wind Speed"
                value={`${forecast.windSpeed?.toFixed(1)} m/s`}
                icon="💨"
              />
              <ForecastCard
                label="Wind Direction"
                value={`${forecast.windDirection?.toFixed(0)}°`}
                icon="🧭"
              />
              <ForecastCard
                label="Water Temp"
                value={`${forecast.waterTemperature?.toFixed(1)} °C`}
                icon="🌡️"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Forecast;
