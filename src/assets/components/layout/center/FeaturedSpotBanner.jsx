import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FeaturedSpotBanner = () => {
  const navigate = useNavigate();

  return (
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
  );
};

export default FeaturedSpotBanner;