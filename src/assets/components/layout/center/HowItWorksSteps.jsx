import React from "react";
import { motion } from "framer-motion";

const steps = [
  { id: 1, text: "Add your surfboards", icon: "🛹" },
  { id: 2, text: "Select a surf spot & dates", icon: "📍" },
  { id: 3, text: "See your best board matches", icon: "🤙" },
];

const HowItWorksSteps = () => (
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
);

export default HowItWorksSteps;