// src/assets/components/match/BoardSelectGrid.jsx
import React from "react";
import BoardSelectCard from "./BoardSelectedCard";

const BoardSelectGrid = ({ boards, selectedBoards, onToggle ,spotName }) => {
  return (
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
  );
};

export default BoardSelectGrid;
