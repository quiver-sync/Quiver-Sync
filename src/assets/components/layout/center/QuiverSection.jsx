import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MatchCallToAction from "./MatchCallToAction";

const QuiverSection = ({ boards }) => {
  if (!boards) return null;

  const latest = boards[boards.length - 1];

  return (
    <>
      <motion.section
        className="w-3xl max-w-6xl px-3 py-10"
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
                You haven’t added any boards yet. Let’s get your quiver set up.
              </p>
              <Link to="/add-board" className="inline-block bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition">
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
                  Your Quiver Has {boards.length} Board{boards.length > 1 && "s"} 🌊
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Here's your latest setup — dialed and ready. Want to add another?
                </p>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:flex sm:justify-center sm:items-center gap-6 max-w-4xl mx-auto hover:shadow-xl transition"
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={latest.image}
                  alt={`${latest.brand} ${latest.model}`}
                  className="w-full sm:w-48 h-32 sm:h-40 object-contain rounded-xl mb-4 sm:mb-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-sky-800 mb-1">
                    {latest.brand} - {latest.model}
                  </h3>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Type:</strong> {latest.type}
                  </p>
                  <p className="text-gray-700 text-sm mb-2">
                    <strong>Dims:</strong> {latest.length}′ × {latest.width}" – {latest.volume}L
                  </p>
                  <p className="text-gray-700 text-sm">
                    <strong>Fins:</strong> {latest.fins}
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-center">
                <Link to="/add-board" className="inline-block bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition">
                  Add Another Board →
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </motion.section>
      {boards.length > 0 && <MatchCallToAction />}
    </>
  );
};

export default QuiverSection;
