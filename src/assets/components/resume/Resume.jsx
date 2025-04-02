// src/assets/components/about/Resume.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const Resume = () => {
  return (
    <motion.section
      className="max-w-5xl mx-auto px-6 py-16 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Intro */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-sky-800">About Me 🧠</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          I'm Gal Levi — a full-stack developer, surfer, musician, and lifelong
          tech explorer. I specialize in crafting seamless, modern web
          applications using React, Node.js, and MongoDB, and I’m deeply
          passionate about AI and real-time systems. From building clean,
          scalable frontend interfaces to designing efficient backend
          architectures, I bring precision, curiosity, and creativity to every
          project. I'm currently looking for an opportunity where I can
          contribute to impactful products, collaborate with passionate teams,
          and continue growing as a developer. Whether it's solving complex
          problems or riding clean waves — I’m all in with energy and
          commitment.
        </p>
      </div>

      {/* Resume Preview */}
      <div className="border rounded-xl overflow-hidden shadow-lg bg-white">
        <iframe
          src="/Gal Levi Resume.pdf"
          title="Gal Levi Resume"
          className="w-full h-[800px]"
        />
      </div>

      {/* Download Button */}
      <div className="text-center">
        <a
          href="/Gal Levi Resume.pdf"
          download
          className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition"
        >
          <FaDownload />
          Download Resume (PDF)
        </a>
      </div>
    </motion.section>
  );
};

export default Resume;
