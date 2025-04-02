import React from "react";
import { Link } from "react-router-dom";

const HeroCarouselSection = ({ Carousel, user }) => {
  return (
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
          {!user ? (
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-100 transition">Sign up!</Link>
              <Link to="/signin" className="border border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition">Sign in!</Link>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              <Link to="/match" className="bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl shadow hover:bg-blue-100 transition">Match your boards!</Link>
              <Link to="/myboards" className="border border-white text-white px-6 py-3 rounded-xl font-medium hover:bg-white/10 transition">Check boards</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroCarouselSection;