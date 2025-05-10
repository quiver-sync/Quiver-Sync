import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../utils/axiosInstance";

export default function RentBoard() {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState(null);
  const [location, setLocation] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const res = await axios.get(`/boards/${boardId}`);
        setBoard(res.data);
      } catch (err) {
        console.error("Failed to fetch board", err);
        navigate("/myboards");
      }
    };
    fetchBoard();
  }, [boardId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!location || !pricePerDay || !availableUntil || !agreementAccepted) {
      setError("Please fill all fields and accept the agreement.");
      return;
    }

    const payload = {
      boardId: board._id,
      location,
      pricePerDay: parseFloat(pricePerDay),
      availableUntil,
      agreementAccepted,
    };

    try {
      setSubmitting(true);
      await axios.post("/rentals", payload);
      setSuccess(true);
      setTimeout(() => navigate("/myboards"), 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!board) {
    return (
      <div className="text-center mt-20 text-gray-600 animate-pulse">
        Loading board details...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white">
    <div className="min-h-screen from-sky-100 via-white to-sky-200 py-12 px-4">
      <div className="max-w-3xl mx-auto p-6  bg-gradient-to-b from-sky-50 to-white rounded-3xl shadow-xl border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-sky-800">
            📦 Rent Out Your Board
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start bg-gradient-to-br from-white to-sky-50 p-4 rounded-xl border border-gray-100 mb-6">
          {board.image && (
            <img
              src={board.image}
              alt={board.model}
              className="w-36 h-36 object-contain border rounded-xl bg-white"
            />
          )}
          <div className="flex-1 text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-semibold">Model:</span> {board.brand} –{" "}
              {board.model}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {board.type}
            </p>
            <p>
              <span className="font-semibold">Size:</span> {board.length}′ ×{" "}
              {board.width}" – {board.volume}L
            </p>
            <p>
              <span className="font-semibold">Fins:</span> {board.fins}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1 text-sky-700">
              📍 Rental Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Lima, Peru"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sky-700">
              💲 Price per Day
            </label>
            <input
              type="number"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              min="1"
              placeholder="e.g., 25"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sky-700">
              📅 Available Until
            </label>
            <input
              type="date"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agreementAccepted}
              onChange={(e) => setAgreementAccepted(e.target.checked)}
              className="mt-1"
            />
            <label className="text-sm text-gray-700">
              I agree that if I violate rental terms or receive complaints, I may
              lose rental privileges.
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-600 font-medium">{error}</p>
          )}
          {success && (
            <p className="text-sm text-green-600 font-medium">
              Rental listing created!
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/myboards")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-semibold border border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Rental"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
