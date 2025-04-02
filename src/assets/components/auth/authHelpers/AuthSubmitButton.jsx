import React from "react";

export function AuthSubmitButton({ loading, children }) {
    return (
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-sky-600 to-blue-600 text-white py-3 rounded-xl font-bold tracking-wide hover:from-sky-700 transition transform hover:scale-105 shadow-md"
      >
        {loading ? "Please wait..." : children}
      </button>
    );
  }