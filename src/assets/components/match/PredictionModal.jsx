import React from "react";

const PredictionModal = ({ isOpen, onClose, board, prediction ,date}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
      <h2 className="text-lg font-bold text-sky-800">{date}</h2>
        <div className="flex justify-between items-center">
          <h2 className="text-md font-bold text-sky-800">{prediction.model}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>

        <div className="flex gap-4 items-start">
          <img
            src={board?.image || "/default-board.jpg"}
            alt={prediction.model}
            className="w-24 h-24 object-cover rounded-xl border"
          />
          <div>
            <p className="text-sm text-gray-600">
              Type: <strong>{board?.type || "-"}</strong><br />
              Fins: <strong>{board?.fins || "-"}</strong><br />
              Score: <strong>{prediction.score}%</strong>
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-800 whitespace-pre-wrap">
          {prediction.reason}
        </p>
      </div>
    </div>
  );
};

export default PredictionModal;
