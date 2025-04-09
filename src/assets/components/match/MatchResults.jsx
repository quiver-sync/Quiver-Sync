import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import DayMatchSection from "./DayMatchSection"; // Extracted component

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
                email: profile.email,
                height: profile.height,
                weight: profile.weight,
                level: profile.level,
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

export default MatchResults;
