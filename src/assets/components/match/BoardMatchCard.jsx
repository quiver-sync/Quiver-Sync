import React, { useState } from "react";
import AnimatedPercentage from "./AnimatedPercentage"


const BoardMatchCard = ({ board, prediction }) => {
    const [expanded, setExpanded] = useState(false);
  
    const truncatedDescription = prediction.reason.length > 180 && !expanded;
    const truncatedTitle = prediction.model.length > 25 && !expanded;
  
    const displayDescription = truncatedDescription
      ? prediction.reason.slice(0, 180) + "..."
      : prediction.reason;
  
    const displayTitle = truncatedTitle
      ? prediction.model.slice(0, 22) + "..."
      : prediction.model;
  
    return (
      <div className="w-full sm:w-72 bg-sky-50 border border-sky-100 p-4 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col justify-between min-h-[320px]">
        {/* Image + Title + Score */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border bg-white">
            <img
              src={board?.image || "/default-board.jpg"}
              alt={prediction.model}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-md font-bold text-sky-900 leading-snug">
              {displayTitle}
            </h4>
            <p className="text-xs text-gray-600 capitalize">
              {board?.type || "Board"} | Fins: {board?.fins || "-"}
            </p>
          </div>
          <AnimatedPercentage value={prediction.score} />
        </div>
  
        {/* Description */}
        <p className="text-sm text-gray-700 mb-2 leading-snug">{displayDescription}</p>
  
        {/* Toggle Buttons */}
        {(truncatedDescription || truncatedTitle) ? (
          <button
            onClick={() => setExpanded(true)}
            className="text-xs text-sky-600 font-semibold hover:underline"
          >
            Read more →
          </button>
        ) : (
          <button
            onClick={() => setExpanded(false)}
            className="text-xs text-sky-600 font-semibold hover:underline"
          >
            Read less →
          </button>
        )}
      </div>
    );
  };

  export default BoardMatchCard;