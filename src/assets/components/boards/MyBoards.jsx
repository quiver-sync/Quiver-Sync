import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { Link, useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { FaSearch, FaTrashAlt } from "react-icons/fa";

export default function MyBoards() {
  const [boards, setBoards] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const boardsPerPage = 6;

  const navigate = useNavigate(); 

  const handleDelete = async (id) => {
    try {
      await axios.delete("/boards/" + id);
      setBoards((prev) => prev.filter((board) => board._id !== id));
      setFiltered((prev) => prev.filter((board) => board._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const handleRent = (boardId) => {
    navigate(`/rent-board/${boardId}`);
  };

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const [boardsRes, rentalsRes] = await Promise.all([
          axios.get("/boards/mine"),
          axios.get("/rentals/mine"),
        ]);
  
        console.log("📦 Raw boards from /boards/mine:");
        console.table(boardsRes.data);
  
        console.log("📦 Raw rentals from /rentals/mine:");
        console.table(rentalsRes.data);
  
        const rentedBoardIds = new Set(
          rentalsRes.data.map((r) =>
            typeof r.board === "string" ? r.board : r.board._id.toString()
          )
        );
  
        console.log("🆔 Rented board IDs:");
        console.table([...rentedBoardIds]);
  
        const mergedBoards = boardsRes.data.map((board) => {
          const isRented = rentedBoardIds.has(board._id.toString());
          console.log(
            `🔍 Checking board ${board.model} (${board._id}): rented = ${isRented}`
          );
          return { ...board, isRented };
        });
  
        const sorted = mergedBoards.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
  
        setBoards(sorted);
        setFiltered(sorted);
      } catch (err) {
        console.error("❌ Failed to load boards or rentals:", err);
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
    setCurrentPage(1);
  }, [search, boards]);

  const totalPages = Math.ceil(filtered.length / boardsPerPage);
  const startIdx = (currentPage - 1) * boardsPerPage;
  const currentBoards = filtered.slice(startIdx, startIdx + boardsPerPage);

  console.log(currentBoards)

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
              className="bg-sky-700 hover:bg-sky-700 text-white font-semibold px-5 py-2 rounded-xl shadow transition"
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
                  <div className="relative w-full h-40 mb-4">
                    <img
                      src={board.image}
                      alt={board.model}
                      className="w-full h-full object-contain rounded-xl"
                    />
                    {board.isRented && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        Offered for rent
                      </span>
                    )}
                  </div>

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
                  <div className="mt-5 flex gap-3 w-full justify-center">
                    <div className="flex-1">
                      {board.isRented ? (
                        <button
                          className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold 
                        bg-yellow-400 text-white shadow-md 
                  focus:ring-2 focus:ring-offset-2"
                        >
                          Offered for rent
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRent(board._id)}
                          className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold 
               bg-sky-500 text-white shadow-md hover:shadow-lg 
               hover:bg-sky-600 focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 
               transition-all duration-200"
                        >
                          Rent this Board
                        </button>
                      )}
                    </div>
                    <div className="flex-1">
                    {board.isRented ? (
                      <button
                      // onClick={() => handleDelete(board._id)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold 
               border border-yellow-500 text-yellow-600 bg-white
               transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      
                      rented
                    </button>
                      
                    ):(
                      <button
                        onClick={() => handleDelete(board._id)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold 
                 border border-red-500 text-red-600 bg-white 
                 hover:bg-red-50 hover:text-red-700 hover:border-red-600 
                 focus:ring-2 focus:ring-offset-2 focus:ring-red-400 
                 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <FaTrashAlt />
                        Delete
                      </button>
                    )
}
                    </div>
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
