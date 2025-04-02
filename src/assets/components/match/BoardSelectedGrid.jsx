import React from "react";
import { Link } from "react-router-dom";
import BoardSelectCard from "./BoardSelectedCard";

const BoardSelectGrid = ({ boards, selectedBoards, onToggle, spotName }) => {
  if (boards.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-lg text-sky-600 font-semibold mb-4">
          No boards found in your quiver yet.
        </p>
        <Link
          to="/add-board"
          className="inline-block bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
        >
          Add Your First Board →
        </Link>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl font-semibold text-sky-700 mb-4">
        Select Boards from Your Quiver
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {boards.map((board) => (
          <BoardSelectCard
            key={board._id}
            board={board}
            selected={selectedBoards.includes(board._id)}
            onClick={() => onToggle(board._id)}
          />
        ))}
      </div>
    </>
  );
};

export default BoardSelectGrid;
