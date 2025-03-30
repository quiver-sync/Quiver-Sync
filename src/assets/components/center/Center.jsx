import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../../utils/axiosInstance";
import { useUser } from "../../../context/UserContext";

const steps = [
  { id: 1, text: "Add your surfboards", icon: "🛹" },
  { id: 2, text: "Select a surf spot & dates", icon: "📍" },
  { id: 3, text: "See your best board matches", icon: "🤙" },
  { id: 4, text: "Find rentals if needed", icon: "🏄‍♂️" },
];

function Center({ Carousel }) {
  const [boards, setBoards] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axios.get("/boards/mine");
        setBoards(res.data || []);
      } catch (err) {
        console.error("Failed to load user boards:", err);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="flex flex-col items-center w-full bg-gradient-to-b from-sky-50 to-white">
      {/* Surf-Style Carousel Section */}
      <div className="relative w-full overflow-hidden bg-blue-900 text-white">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#8ecae6"
            d="M0,224L80,224C160,224,320,224,480,202.7C640,181,800,139,960,138.7C1120,139,1280,181,1360,202.7L1440,224L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-6 py-28">
          <div className="rounded-3xl shadow-2xl">
            <div className="w-full">{Carousel}</div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-white">
              All things surfer must, <br /> all in one place.
            </h2>
            <p className="text-lg mb-6 text-white/90">
              Sync your quiver. Make you great surfer.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-100 transition"
              >
                Get started
              </Link>
              <Link
                to="/signin"
                className="border border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition"
              >
                Check the surf
              </Link>
            </div>
          </div>
        </div>
      </div>
      {user && (
        <motion.section
          className="w-full max-w-6xl px-6 py-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl p-10">
            {boards.length === 0 ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <h2 className="text-3xl font-bold text-sky-700 mb-2">
                  Start Building Your Quiver 🏄
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto mb-6">
                  You haven’t added any boards yet. Let’s get your quiver set up
                  so we can match you to the right gear for any swell.
                </p>
                <Link
                  to="/add-board"
                  className="inline-block bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
                >
                  Add Your First Board →
                </Link>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-bold text-sky-700 mb-2">
                    Your Quiver Has {boards.length} Board
                    {boards.length > 1 && "s"} 🌊
                  </h2>
                  <p className="text-gray-600 max-w-xl mx-auto">
                    Here's your latest setup — dialed and ready. Want to add
                    another?
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:flex items-center gap-6 hover:shadow-xl transition"
                  whileHover={{ scale: 1.01 }}
                >
                  <img
                    src={boards[boards.length - 1].image}
                    alt={`${boards[boards.length - 1].brand} ${
                      boards[boards.length - 1].model
                    }`}
                    className="w-full sm:w-48 h-32 sm:h-40 object-contain rounded-xl mb-4 sm:mb-0"
                  />

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-sky-800 mb-1">
                      {boards[boards.length - 1].brand} -{" "}
                      {boards[boards.length - 1].model}
                    </h3>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Type:</strong> {boards[boards.length - 1].type}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      <strong>Dims:</strong> {boards[boards.length - 1].length}′
                      × {boards[boards.length - 1].width}" –{" "}
                      {boards[boards.length - 1].volume}L
                    </p>
                    <p className="text-gray-700 text-sm">
                      <strong>Fins:</strong> {boards[boards.length - 1].fins}
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <Link
                    to="/add-board"
                    className="inline-block bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition"
                  >
                    Add Another Board →
                  </Link>
                </motion.div>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* Hero Section */}
      <motion.section
        className="max-w-7xl w-full px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <p className="text-sm uppercase tracking-widest text-sky-500 mb-4 font-semibold">
            Find your perfect wave match
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Surf smarter, <br /> ride better.
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            SurfSync analyzes your quiver, body type, and upcoming forecasts to
            help you paddle out with confidence — wherever you're headed.
          </p>

          {!user && (
            <motion.div
              className="mt-10 flex gap-4 flex-wrap"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to="/register"
                className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-md transition"
              >
                Get Started
              </Link>
              <Link
                to="/signin"
                className="bg-white border border-gray-300 px-6 py-3 rounded-2xl text-lg font-semibold text-gray-800 shadow-sm hover:shadow-md transition"
              >
                I already have an account
              </Link>
            </motion.div>
          )}
        </div>

        {/* How It Works */}
        <motion.div
          className="grid gap-4 p-8 bg-white/80 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">How It Works</h2>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border hover:shadow-lg hover:bg-sky-50 transition"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl">{step.icon}</span>
              <p className="text-gray-700 font-medium">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Featured Spot */}
      <motion.section
        className="max-w-6xl w-full px-6 py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative bg-gradient-to-br from-blue-100 to-sky-200 p-10 rounded-3xl text-center shadow-lg">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">
            🏄 Featured Spot: Uluwatu, Bali
          </h3>
          <p className="text-gray-700 max-w-xl mx-auto">
            Peeling lefts, crystal water, and hollow reef barrels. We’ve
            preloaded the forecast — just match your board and go.
          </p>
          <motion.button
            onClick={() => navigate("/forecast")}
            whileHover={{ scale: 1.05 }}
            className="mt-8 bg-white px-6 py-3 rounded-xl text-sky-600 font-semibold shadow hover:shadow-md hover:bg-blue-50 transition"
          >
            Explore Forecast →
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}

export default Center;
