import React, { useState } from "react";
import BoardMatchCard from "./BoardMatchCard";
import PredictionModal from "./PredictionModal";

const DayMatchSection = ({ date, predictions, selectedBoards }) => {
  const [page, setPage] = useState(0);
  const [modalData, setModalData] = useState(null);
  const perPage = 3;

  const sorted = [...predictions].sort((a, b) => b.score - a.score);
  const paginated = sorted.slice(page * perPage, page * perPage + perPage);
  const totalPages = Math.ceil(sorted.length / perPage);

  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const handleExpand = (prediction, board) => {
    setModalData({ prediction, board });
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <section className="bg-white border border-sky-100 rounded-3xl shadow-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold text-sky-800">{formattedDate}</h3>

      <div className="flex gap-6 overflow-x-auto">
        {paginated.map((prediction, idx) => {
          const board = selectedBoards.find((b) =>
            prediction.model.toLowerCase().includes(b.model.toLowerCase())
          );
          return (
            <BoardMatchCard
              key={idx}
              board={board}
              prediction={prediction}
              onExpand={handleExpand}
            />
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-1 rounded-full bg-sky-100 text-sky-700 disabled:opacity-40"
          >
            ⬅️ Previous
          </button>
          <span className="text-sky-700 font-semibold">
            {page + 1} / {totalPages}
          </span>
          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1 rounded-full bg-sky-100 text-sky-700 disabled:opacity-40"
          >
            Next ➡️
          </button>
        </div>
      )}

      <PredictionModal
        date={formattedDate}
        isOpen={!!modalData}
        onClose={handleCloseModal}
        prediction={modalData?.prediction}
        board={modalData?.board}
      />
    </section>
  );
};

export default DayMatchSection;
