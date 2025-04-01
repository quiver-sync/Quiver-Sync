import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

export default function MyBoards() {
  const [boards, setBoards] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const boardsPerPage = 6;

  const handleDelete = async (id) => {
    try {
      await axios.delete("/boards/" + id);
      setBoards((prev) => prev.filter((board) => board._id !== id));
      setFiltered((prev) => prev.filter((board) => board._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };
  

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axios.get("/boards/mine");
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBoards(sorted);
        setFiltered(sorted);
      } catch (err) {
        console.error("Failed to load boards:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    const query = search.toLowerCase();
    const results = boards.filter(
      (board) =>
        board.brand.toLowerCase().includes(query) ||
        board.model.toLowerCase().includes(query) ||
        board.type.toLowerCase().includes(query)
    );
    setFiltered(results);
    setCurrentPage(1); // reset to first page on new search
  }, [search, boards]);

  const totalPages = Math.ceil(filtered.length / boardsPerPage);
  const startIdx = (currentPage - 1) * boardsPerPage;
  const currentBoards = filtered.slice(startIdx, startIdx + boardsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <h1 className="text-3xl font-extrabold text-sky-800">
            My Quiver ({boards.length})
          </h1>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search brand, model, or type"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Link
              to="/add-board"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-5 py-2 rounded-xl shadow transition"
            >
              + Add New
            </Link>
          </div>
        </div>

        {/* Board Grid or States */}
        {loading ? (
          <div className="text-center text-gray-600 mt-20 animate-pulse">
            Loading your boards...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-600 mt-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/427/427735.png"
              alt="Empty quiver"
              className="w-24 h-24 mx-auto mb-4 opacity-60"
            />
            <p className="mb-4">
              No boards match your search or have been added yet.
            </p>
            <Link
              to="/add-board"
              className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Add Your First Stick →
            </Link>
          </div>
        ) : (
          <>
            {/* Board Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentBoards.map((board) => (
                <motion.div
                  key={board._id}
                  className="bg-white rounded-2xl border border-gray-200 shadow hover:shadow-lg transition p-6 flex flex-col items-center text-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={board.image}
                    alt={board.model}
                    className="h-40 object-contain mb-4 rounded-xl"
                  />
                  <h3 className="text-xl font-bold text-sky-800 mb-1 tracking-tight">
                    {board.brand} – {board.model}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wide">
                    {board.type}
                  </p>
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      <span className="font-semibold">Length:</span>{" "}
                      {board.length}′
                    </p>
                    <p>
                      <span className="font-semibold">Width:</span>{" "}
                      {board.width}"
                    </p>
                    <p>
                      <span className="font-semibold">Volume:</span>{" "}
                      {board.volume}L
                    </p>
                    <p>
                      <span className="font-semibold">Fins:</span> {board.fins}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => handleDelete(board._id)}
                      className="bg-sky-700 hover:bg-sky-800 text-white px-6 py-3 rounded-xl shadow-md text-lg font-semibold transition"
                    >
                      Delete board
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  }`}
                >
                  ← Back
                </button>

                <span className="text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-sky-500 text-white hover:bg-sky-600"
                  }`}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
