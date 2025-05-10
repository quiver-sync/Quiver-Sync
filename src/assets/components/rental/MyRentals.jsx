import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";

export default function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [rentedBoards, setRentedBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        console.log("🔄 Fetching rentals and rented board info...");
        const [res1, res2] = await Promise.all([
          axios.get("/rentals/mine"),
          axios.get("/boards/getMyRentedBoards"),
        ]);

        console.log("📦 Rentals fetched from /rentals/mine:");
        console.table(res1.data);

        console.log("🏄 Boards fetched from /boards/getMyRentedBoards:");
        console.table(res2.data);

        setRentals(res1.data);
        setRentedBoards(res2.data); // already includes board + rental
      } catch (err) {
        console.error("❌ Failed to load rentals or boards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  if (loading) {
    console.log("⏳ Loading rental data...");
    return (
      <div className="text-center mt-20 text-gray-500">Loading your rentals...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-sky-800 mb-10">
          My Rentals
        </h1>

        {/* Section 2: Boards currently rented out */}
        <section>
          <h2 className="text-2xl font-bold text-sky-700 mb-6">Boards Currently Rented Out</h2>
          {rentedBoards.length === 0 ? (
            <p className="text-gray-600">No boards are currently marked as rented.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rentedBoards.map(({ board, rental }) => (
                <div
                  key={rental._id}
                  className="bg-white border border-yellow-300 rounded-2xl p-5 shadow hover:shadow-lg transition"
                >
                  <img
                    src={board.image}
                    alt={board.model}
                    className="h-40 w-full object-contain mb-4 rounded-xl"
                  />
                  <h3 className="text-lg font-bold text-yellow-700">
                    {board.brand} – {board.model}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{board.type}</p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Size:</span>{" "}
                    {board.length}′ × {board.width}" — {board.volume}L
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Location:</span> {rental.location}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Price:</span> ${rental.pricePerDay}/day
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Available Until:</span>{" "}
                    {new Date(rental.availableUntil).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
