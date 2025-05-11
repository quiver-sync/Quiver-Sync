import React, { useState } from "react";
import axios from "../../../utils/axiosInstance";

export default function EditRentalModal({ rental, board, onClose, onSave }) {
  const [location, setLocation] = useState(rental.location);
  const [price, setPrice] = useState(rental.pricePerDay);
  const [availableUntil, setAvailableUntil] = useState(rental.availableUntil.split("T")[0]);

  const handleSave = async () => {
    try {
      const updated = {
        location,
        pricePerDay: price,
        availableUntil,
      };
      const res = await axios.patch(`/rentals/${rental._id}`, updated);
      onSave(res.data.rental);      
    } catch (err) {
      console.error("Failed to update rental:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold text-sky-800 mb-4">Edit Rental</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Rental Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-xl"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price Per Day</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-xl"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Available Until</label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-xl"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-semibold bg-sky-600 text-white rounded-xl hover:bg-sky-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
