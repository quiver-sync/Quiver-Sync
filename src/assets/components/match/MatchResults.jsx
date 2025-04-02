import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import BoardMatchCard from "./BoardMatchCard"

const MatchResults = ({ selectedBoards, forecast, profile, spotName }) => {
  const [resultsByDay, setResultsByDay] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const dayResults = await Promise.all(
          forecast.daily.map(async (day) => {
            const res = await axios.post("/match", {
              boards: selectedBoards,
              forecast: day,
              user: {
                email:profile.email,
                height: profile.height,
                weight: profile.weight,
                level : profile.level,
              },
            });

            return {
              date: day.date,
              predictions: res.data.predictions,
            };
          })
        );
        setResultsByDay(dayResults);
      } catch (err) {
        console.error("LLM match error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (forecast?.daily?.length && selectedBoards.length && profile) {
      fetchMatch();
    }
  }, [selectedBoards, forecast, profile]);

  if (loading) {
    return (
      <div className="text-center py-12 text-sky-600 font-medium animate-pulse text-lg">
        🔮 Analyzing boards with Gemini AI...
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-12 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-extrabold text-sky-800 text-center">
        Your AI-Powered Board Matches {spotName && `for ${spotName}`} 🌊✨
      </h2>

      {resultsByDay.map((day) => (
        <DayMatchSection
          key={day.date}
          date={day.date}
          predictions={day.predictions}
          selectedBoards={selectedBoards}
        />
      ))}
    </div>
  );
};

const DayMatchSection = ({ date, predictions, selectedBoards }) => {
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const [page, setPage] = useState(0);
  const perPage = 3;
  const sorted = [...predictions].sort((a, b) => b.score - a.score);
  const paginated = sorted.slice(page * perPage, page * perPage + perPage);
  const totalPages = Math.ceil(sorted.length / perPage);

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
    </section>
  );
};

export default MatchResults;
