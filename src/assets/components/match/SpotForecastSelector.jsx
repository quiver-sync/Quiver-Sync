import React, { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "../../../utils/axiosInstance";
import ForecastMultiDay from "../forecast/ForecastMultiDay";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 34.0195,
  lng: -118.4912,
};

const SpotForecastSelector = ({ onForecastReady , setSpotName }) => {
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [spotNameCurrent, setSpotNameCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const handlePlaceSelect = async () => {
    const place = autocompleteRef.current.getPlace();
    if (!place?.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    const name = place.name || place.formatted_address || "Selected Spot";
    console.log(name)
    setSpotNameCurrent(name)
    if (spotNameCurrent) {
      console.log(spotNameCurrent);
    }
    setSpotName(name)    
    setMapCenter({ lat, lng });
    setMarkerPosition({ lat, lng });

    await fetchForecast(lat, lng);
  };

  const fetchForecast = async (lat, lng) => {
    setLoading(true);
    try {
      const res = await axios.post("/forecast", { lat, lng });
      setForecast(res.data.daily);
      console.log(spotNameCurrent);
      onForecastReady({ lat, lng, forecast: res.data , spotNameCurrent });
    } catch (err) {
      console.error("Forecast error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-bold text-sky-800">Choose a Surf Spot 🌍</h2>
        <p className="text-sky-600 mt-1">
          Search any beach, break or location worldwide
        </p>
      </div>

      {/* Autocomplete input */}
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceSelect}
      >
        <input
          type="text"
          placeholder="Enter beach, break or city..."
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-500"
        />
      </Autocomplete>

      {/* Map display */}
      <div className="rounded-2xl overflow-hidden shadow">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={10}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </GoogleMap>
      </div>

      {/* Forecast summary */}
      {Array.isArray(forecast) && forecast.length > 0 && (
        <ForecastMultiDay forecastByDay={forecast} spotName={spotNameCurrent}/>
      )}

      {/* Loading state */}
      {loading && (
        <div className="text-center text-sky-500 animate-pulse">
          Fetching forecast...
        </div>
      )}
    </div>
  );
};

export default SpotForecastSelector;
