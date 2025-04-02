import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HowItWorksSteps from "./HowItWorksSteps";

const SurfHeroPitch = ({ user }) => (
  <motion.section
    className="max-w-7xl w-full px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {/* Left side: pitch */}
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

    {/* Right side: steps */}
    <HowItWorksSteps />
  </motion.section>
);

export default SurfHeroPitch;
