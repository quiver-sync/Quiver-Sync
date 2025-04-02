import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const MatchCallToAction = () => {
  return (
    <motion.section
      className="max-w-6xl w-full px-6 py-20"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative bg-white border border-sky-100 rounded-3xl shadow-md overflow-hidden">
        {/* Soft abstract background blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-100 to-sky-200 opacity-60 blur-[1px] pointer-events-none" />

        <div className="relative z-10 px-10 py-14 text-center space-y-6">
          <h2 className="text-4xl font-extrabold text-sky-800 drop-shadow-sm">
            🌊 Ready to Match Your Quiver?
          </h2>

          <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed text-lg">
            You've built your perfect setup. Now let the ocean — and AI — tell you which board is calling for your next session.
          </p>

          <Link
            to="/match"
            className="inline-flex items-center gap-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition text-lg"
          >
            Match My Board
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default MatchCallToAction;
