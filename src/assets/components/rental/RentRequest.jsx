import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";

const RentRequest = () => {
  const { rentalId } = useParams();
  const navigate = useNavigate();

  const [rental, setRental] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRental = async () => {
      try {
        const res = await axios.get(`/rentals/${rentalId}`);
        setRental(res.data);
      } catch (err) {
        console.error("Failed to load rental:", err);
      }
    };
    loadRental();
  }, [rentalId]);

  if (!rental)
    return <p className="text-center mt-20">Loading rental details...</p>;

  const board = rental.board;
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date(rental.availableUntil).toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setError("Please select both start and end dates.");
      return;
    }

    try {
      await axios.post("/rental-requests", {
        rentalId,
        startDate,
        endDate,
      });

      navigate("/my-requests");
    } catch (err) {
      console.error("Failed to submit rental request:", err);
      setError(err.response?.data?.message || "Request failed");
    }
  };

  // 🧮 Calculate total days and price
  const getTotalPrice = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start && end && end >= start) {
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      return {
        days,
        total: days * rental.pricePerDay,
      };
    }
    return null;
  };

  const pricing = getTotalPrice();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto px-6 py-10 mt-10 mb-12 rounded-2xl shadow-md">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-800">
          📝 Request to Rent: {board?.model}
        </h1>

        {board?.image && (
          <div className="mb-6 flex justify-center">
            <img
              src={board.image}
              alt={board.model}
              className="h-64 object-contain "
            />
          </div>
        )}

        <div className="mb-8 space-y-1 text-sm text-gray-700 bg-white p-5 rounded-xl shadow-sm border">
          <p><strong>Type:</strong> {board?.type}</p>
          <p><strong>Brand:</strong> {board?.brand}</p>
          <p><strong>Size:</strong> {board?.length}' × {board?.width}" — {board?.volume}L</p>
          <p><strong>Fins:</strong> {board?.fins}</p>
          <p><strong>Location:</strong> {rental.location}</p>
          <p><strong>Available Until:</strong> {new Date(rental.availableUntil).toLocaleDateString()}</p>
          <p><strong>Price:</strong> ${rental.pricePerDay} / day</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={today}
                max={maxDate}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || today}
                max={maxDate}
              />
            </div>
          </div>

          {pricing && (
            <p className="text-blue-800 text-center font-medium text-lg mt-1">
               Total Days: {pricing.days} —  Total Price: ${pricing.total}
            </p>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Rental Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentRequest;
