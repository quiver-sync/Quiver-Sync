import React from "react";

export function AuthInput({ label, ...props }) {
    return (
      <div>
        <label className="block text-sm font-medium text-sky-800">{label}</label>
        <input
          {...props}
          className="mt-1 w-full px-4 py-2 border border-sky-200 rounded-xl shadow-sm focus:ring-2 focus:ring-sky-300 bg-white"
        />
      </div>
    );
  }