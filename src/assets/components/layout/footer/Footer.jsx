import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Github,
  Mail,
  Waves,
} from "lucide-react";
import { motion } from "framer-motion";

// SVG Wave Top Divider
const WaveDivider = () => (
  <div className="-mt-1">
    <svg
      viewBox="0 0 1440 150"
      className="w-full h-24"
      preserveAspectRatio="none"
    >
      <path
        fill="#bfdbfe"
        d="M0,64L60,85.3C120,107,240,149,360,149.3C480,149,600,107,720,90.7C840,75,960,85,1080,96C1200,107,1320,117,1380,122.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
      />
    </svg>
  </div>
);

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-br from-sky-100 to-blue-200 text-gray-800 border-t border-blue-300"
    >
      <WaveDivider />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-10 gap-y-12 text-sm">
        {/* Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Waves className="text-sky-600" size={28} />
            <h3 className="text-xl sm:text-2xl font-bold text-sky-700">QuiverSync</h3>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Helping surfers match the perfect board to every wave, every session.
          </p>

          <div className="flex gap-4 mt-6 text-sky-600 justify-start sm:justify-start md:justify-between flex-wrap">
            <motion.a
              whileHover={{ scale: 1.2, y: -2 }}
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -2 }}
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, y: -2 }}
              href="mailto:hello@surfsync.com"
              aria-label="Email"
            >
              <Mail />
            </motion.a>
          </div>
        </motion.div>

        {/* Product Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-2 text-sm sm:text-base"
        >
          <p className="text-md font-semibold mb-2 text-sky-700">Product</p>
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/register" className="hover:underline">Sign Up</Link>
          <Link to="/signin" className="hover:underline">Sign In</Link>
          <a href="#" className="hover:underline">Surf Forecast</a>
        </motion.div>

        {/* Company Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-2 text-sm sm:text-base"
        >
          <p className="text-md font-semibold mb-2 text-sky-700">Company</p>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Careers</a>
          <a href="#" className="hover:underline">Press</a>
          <a href="#" className="hover:underline">Blog</a>
        </motion.div>

        {/* Support Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col gap-2 text-sm sm:text-base"
        >
          <p className="text-md font-semibold mb-2 text-sky-700">Support</p>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
        </motion.div>
      </div>

      <div className="border-t border-blue-300 pt-6 pb-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} QuiverSync — Built with 💙 for the ocean community 🌊
      </div>
    </motion.footer>
  );
};

export default Footer;
