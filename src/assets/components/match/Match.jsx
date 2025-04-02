import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axiosInstance";
import { FaUserEdit } from "react-icons/fa";
import { useUser } from "../../../context/UserContext";
import BoardSelectGrid from "./BoardSelectedGrid";
import ForecastSelector from "./SpotForecastSelector";
import MatchResults from "./MatchResults";

const Match = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [boards, setBoards] = useState([]);
  const [spotName, setSpotName] = useState([]);
  const [selectedBoards, setSelectedBoards] = useState([]);
  const [showForecast, setShowForecast] = useState(false);
  const [forecastData, setForecastData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/auth/profile");
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile?.height && profile?.weight) {
      fetchBoards();
    }
  }, [profile]);

  const fetchBoards = async () => {
    try {
      const res = await axios.get("/boards");
      setBoards(res.data);
    } catch (err) {
      console.error("Error loading boards:", err.message);
    }
  };

  const toggleBoard = (boardId) => {
    setSelectedBoards((prev) =>
      prev.includes(boardId)
        ? prev.filter((id) => id !== boardId)
        : [...prev, boardId]
    );
  };

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  const handleNextToForecast = () => {
    if (selectedBoards.length > 0) {
      setShowForecast(true);
    }
  };

  const handleForecastReady = (data) => {
    setForecastData(data);
    setSpotName(data.spotName);
    console.log(data.spotName);
  };

  const handleShowResults = () => {
    setShowResults(true);
  };

  const selectedBoardsData = boards.filter((b) =>
    selectedBoards.includes(b._id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-white py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-sky-800 text-center">
          Let's Match Your Board 🏄‍♂️
        </h1>

        {!profile ? (
          <p className="text-center text-sky-600">Loading profile...</p>
        ) : !profile.height || !profile.weight || !profile.level ? (
          <div className="text-center space-y-4">
            <p className="text-lg text-sky-700">
              Before we suggest a board, we need your height weight and your
              level!.
            </p>
            <button
              onClick={handleGoToProfile}
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl shadow"
            >
              <FaUserEdit />
              Complete My Profile
            </button>
          </div>
        ) : showResults ? (
          <MatchResults
            selectedBoards={selectedBoardsData}
            forecast={forecastData?.forecast}
            profile={profile}
            spotName={spotName}
          />
        ) : showForecast ? (
          <>
            <ForecastSelector onForecastReady={handleForecastReady} />
            {forecastData && (
              <div className="text-center mt-10">
                <button
                  onClick={handleShowResults}
                  className="bg-sky-700 hover:bg-sky-800 text-white px-6 py-3 rounded-xl shadow-md text-lg font-semibold transition"
                >
                  Match My Boards 🧠
                </button>
              </div>
            )}
          </>
        ) : (
          <>

            <BoardSelectGrid
              spotName={spotName}
              boards={boards}
              selectedBoards={selectedBoards}
              onToggle={toggleBoard}
            />

            {selectedBoards.length > 0 && (
              <div className="text-center mt-10">
                <button
                  onClick={handleNextToForecast}
                  className="bg-sky-700 hover:bg-sky-800 text-white px-6 py-3 rounded-xl shadow-md text-lg font-semibold transition"
                >
                  Next: Choose Surf Spot 🌊
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Match;
