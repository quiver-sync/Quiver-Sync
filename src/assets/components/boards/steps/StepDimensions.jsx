import React, { useState, useEffect } from "react";
import { boardSpecs } from "../boardSpecs";

export default function StepDimensions({ formData, updateField, nextStep, prevStep }) {
  const type = formData.type;
  const specs = boardSpecs[type] || {};

  const [length, setLength] = useState(formData.length || specs.length?.default || "");
  const [width, setWidth] = useState(parseFloat(formData.width) || specs.width?.default || 19.5);
  const [volume, setVolume] = useState(formData.volume || specs.volume?.default || "");

  const isValid = length && width && volume;

  // Auto-sync form state
  useEffect(() => {
    updateField("length", length);
    updateField("width", width.toFixed(2));
    updateField("volume", volume);
  }, [length, width, volume]);

  // Width stepper logic
  const incrementWidth = () => {
    if (width + 0.25 <= (specs.width?.max || 24)) {
      setWidth(parseFloat((width + 0.25).toFixed(2)));
    }
  };

  const decrementWidth = () => {
    if (width - 0.25 >= (specs.width?.min || 17)) {
      setWidth(parseFloat((width - 0.25).toFixed(2)));
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-sky-800 mb-6 text-center">
        Enter Your Board’s Dimensions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Length */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Length (ft)
          </label>
          <input
            type="number"
            min={specs.length?.min}
            max={specs.length?.max}
            step="0.1"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder={`e.g. ${specs.length?.default}`}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          />
          <p className="text-xs text-gray-400 mt-1">
            Range: {specs.length?.min}–{specs.length?.max} ft
          </p>
        </div>

        {/* Width Stepper */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Width (in)
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={decrementWidth}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-bold text-gray-700 text-lg shadow"
            >
              –
            </button>
            <span className="text-base font-medium text-gray-800 min-w-[60px] text-center">
              {width.toFixed(2)}"
            </span>
            <button
              type="button"
              onClick={incrementWidth}
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-bold text-gray-700 text-lg shadow"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Range: {specs.width?.min}"–{specs.width?.max}"
          </p>
        </div>

        {/* Volume */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Volume (L)
          </label>
          <input
            type="number"
            min={specs.volume?.min}
            max={specs.volume?.max}
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            placeholder={`e.g. ${specs.volume?.default}`}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          />
          <p className="text-xs text-gray-400 mt-1">
            Range: {specs.volume?.min}–{specs.volume?.max} L
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
        <button
          onClick={prevStep}
          className="w-full sm:w-auto px-6 py-2 rounded-xl font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
        >
          ← Back
        </button>
        <button
          onClick={nextStep}
          disabled={!isValid}
          className={`w-full sm:w-auto px-6 py-2 rounded-xl font-semibold text-white transition ${
            isValid ? "bg-sky-600 hover:bg-sky-700 shadow" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          On to fins →
        </button>
      </div>
    </div>
  );
}
