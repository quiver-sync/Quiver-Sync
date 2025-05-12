import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useUser } from "../../../context/UserContext";

const ActiveRentals = () => {
  const { user } = useUser();
  const [activeRentals, setActiveRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveRentals = async () => {
      try {
        const res = await axios.get("/active-rentals/mine");
        setActiveRentals(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch active rentals:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchActiveRentals();
  }, [user]);

  const today = new Date();

  const isActiveNow = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return today >= s && today <= e;
  };

  const active = activeRentals.filter(r => isActiveNow(r.startDate, r.endDate));
  const planned = activeRentals.filter(r => new Date(r.startDate) > today);

  const renderRentalCard = (rental, statusLabel, statusColor) => {
    const { startDate, endDate, rental: rentalInfo, renter, _id } = rental;
    const board = rentalInfo?.board;
    const owner = rentalInfo?.owner;
    const isOwner = owner?._id === user.id;
    const role = isOwner ? "Owner" : "Renter";
    const otherUser = isOwner ? renter : owner;

    const start = new Date(startDate);
    const end = new Date(endDate);

    return (
      <div
        key={_id}
        className="bg-white rounded-xl shadow-sm border p-5 flex gap-4 items-start"
      >
        <img
          src={board?.image}
          alt={board?.model}
          className="h-24 w-24 object-contain border rounded"
        />
        <div className="flex-1 space-y-1 text-sm text-gray-700">
          <h2 className="text-lg font-semibold text-blue-800">
            {board?.model}
            <span
              className={`ml-2 text-xs px-2 py-0.5 rounded-full ${statusColor}`}
            >
              {statusLabel}
            </span>
          </h2>
          <p><strong>Role:</strong> {role}</p>
          <p><strong>With:</strong> {otherUser?.username}</p>
          <p><strong>Dates:</strong> {start.toLocaleDateString()} → {end.toLocaleDateString()}</p>
          <p><strong>Location:</strong> {rentalInfo?.location}</p>
        </div>
      </div>
    );
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-blue-700">
        Loading active rentals...
      </p>
    );

  if (!activeRentals.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-50 to-white px-6 py-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5957/5957231.png"
          alt="No active rentals"
          className="w-28 h-28 mb-4 opacity-80"
        />
        <h2 className="text-xl font-semibold text-blue-700 mb-1">
          No Active Rentals
        </h2>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          You currently have no active rentals. Once a rental is approved and
          started, it will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-800">
          🌊 Your Rentals
        </h1>

        {active.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-green-700 mb-4">Currently Active</h2>
            <div className="space-y-6 mb-10">
              {active.map(r =>
                renderRentalCard(r, "Active Now", "bg-green-100 text-green-700")
              )}
            </div>
          </>
        )}

        {planned.length > 0 && (
          <>
            <h2 className="text-xl font-bold text-yellow-600 mb-4">Planned Rentals</h2>
            <div className="space-y-6">
              {planned.map(r =>
                renderRentalCard(r, "Planned", "bg-yellow-100 text-yellow-700")
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActiveRentals;
