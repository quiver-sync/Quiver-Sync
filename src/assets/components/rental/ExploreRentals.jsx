import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext"; // adjust path if needed

const ExploreRentals = () => {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const loadRentals = async () => {
      try {
        console.log("📤 Sending request to /rentals/available");
        const res = await axios.get("/rentals/available");

        const filtered = user
          ? res.data.filter((rental) => rental.owner?._id !== user.id)
          : res.data;

        setRentals(filtered);
        console.log("✅ Rentals received (filtered):", filtered);
      } catch (err) {
        console.error(
          "❌ Error loading rentals:",
          err.response?.status,
          err.response?.data
        );
      }
    };

    loadRentals();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-800">
        🏄 Explore Surfboard Rentals
      </h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {rentals.map((rental) => {
          const board = rental.board;
          return (
            <div
              key={rental._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-200 flex flex-col overflow-hidden"
            >
              {board?.image && (
                <div className="w-full h-56 bg-gradient-to-b from-sky-50 to-white flex items-center justify-center">
                  <img
                    src={board.image}
                    alt={board.model}
                    className="h-full object-contain"
                  />
                </div>
              )}

              <div className="flex-1 p-5 flex flex-col justify-between">
                <div className="space-y-1 mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {board?.model}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Brand:{" "}
                    <span className="font-medium text-gray-700">
                      {board?.brand}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Type: <span className="text-gray-700">{board?.type}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Size:{" "}
                    <span className="text-gray-700">
                      {board?.length}' × {board?.width}" — {board?.volume}L
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Fins: <span className="text-gray-700">{board?.fins}</span>
                  </p>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  <span className="inline-block mr-2">
                    📍 {rental.location} -
                  </span>
                  <span className="inline-block">
                    📅 Until {new Date(rental.availableUntil).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-blue-600">
                    ${rental.pricePerDay}
                    <span className="text-sm"> / day</span>
                  </p>
                  <button
                    onClick={() => navigate(`/rent-request/${rental._id}`)}
                    className="bg-blue-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-blue-700 transition"
                  >
                    Request Rental
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreRentals;
