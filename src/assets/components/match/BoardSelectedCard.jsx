import axios from "../../../utils/axiosInstance";
import React from "react";

const BoardSelectCard = ({ board, selected, onClick }) => {
  
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer border rounded-2xl p-4 shadow-sm transition-all space-y-2
        ${selected ? "border-sky-500 bg-sky-50" : "border-gray-200"}
      `}
    >
      <div className="h-40 flex items-center justify-center bg-white rounded-t-xl">
        <img
          src={board.image || "/default-board.png"}
          alt={board.model}
          className="max-h-full object-contain"
        />
      </div>

      <div>
        <h3 className="text-lg font-bold text-sky-800">{board.model}</h3>
        <p className="text-sm text-gray-600">
          {board.length}ft × {board.width}" – {board.volume}L
        </p>
        <p className="text-sm text-sky-600 capitalize">{board.type}</p>
        {board.fins && (
          <p className="text-xs text-gray-500">Fins: {board.fins}</p>
        )}
      </div>
    </div>
  );
};

export default BoardSelectCard;
