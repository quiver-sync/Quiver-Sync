import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";
import EditRentalModal from "./EditRentalModal";

export default function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [rentedBoards, setRentedBoards] = useState([]);
  const [editingRental, setEditingRental] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        const [res1, res2] = await Promise.all([
          axios.get("/rentals/mine"),
          axios.get("/boards/getMyRentedBoards"),
        ]);

        setRentals(res1.data);
        setRentedBoards(res2.data);
      } catch (err) {
        console.error("❌ Failed to load rentals or boards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500 animate-pulse">
        Loading your rentals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-6 py-16 relative">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-sky-800 mb-10">
          My Rentals
        </h1>

        <section>
          <h2 className="text-2xl font-bold text-sky-700 mb-6">
            Boards Currently Rented Out
          </h2>
          {rentedBoards.length === 0 ? (
            <p className="text-gray-600">
              No boards are currently marked as rented.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rentedBoards.map(({ board, rental }) => (
                <div
                  key={rental._id}
                  className="bg-white border border-yellow-300 rounded-2xl p-5 shadow hover:shadow-lg transition flex flex-col justify-between h-full"
                >
                  <div className="flex-1">
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
                      <span className="font-semibold">Size:</span> {board.length}′ × {board.width}" — {board.volume}L
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Location:</span> {rental.location}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Price:</span> ${rental.pricePerDay}/day
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Available Until:</span> {new Date(rental.availableUntil).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingRental({ rental, board })}
                    className="mt-4 w-full text-sm font-medium bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl px-4 py-2"
                  >
                    Edit Rental
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {editingRental && (
        <EditRentalModal
          rental={editingRental.rental}
          board={editingRental.board}
          onClose={() => setEditingRental(null)}
          onSave={(updated) => {
            setRentedBoards((prev) =>
              prev.map((r) =>
                r.rental._id === updated._id ? { ...r, rental: updated } : r
              )
            );
            setEditingRental(null);
          }}
        />
      )}
    </div>
  );
}
