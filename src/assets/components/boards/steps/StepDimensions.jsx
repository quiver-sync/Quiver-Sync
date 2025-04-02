import React, { useState, useEffect } from "react";
import { boardSpecs } from "../demosdbhelpers/boardSpecs";

function generateLengthOptions(minFt, maxFt) {
  const options = [];
  for (let ft = Math.floor(minFt); ft <= Math.floor(maxFt); ft++) {
    for (let inch = 0; inch < 12; inch++) {
      const decimal = parseFloat((ft + inch / 12).toFixed(3));
      if (decimal >= minFt && decimal <= maxFt) {
        options.push({ label: `${ft}'${inch}"`, value: decimal });
      }
    }
  }
  return options;
}

function generateVolumeOptions(min, max) {
  const options = [];
  for (let v = min; v <= max; v += 0.5) {
    options.push({ label: `${v.toFixed(1)} L`, value: v.toFixed(1) });
  }
  return options;
}

export default function StepDimensions({ formData, updateField, nextStep, prevStep }) {
  const type = formData.type;
  const specs = boardSpecs[type] || {};

  const lengthOptions = generateLengthOptions(specs.length?.min || 4.0, specs.length?.max || 7.6);
  const volumeOptions = generateVolumeOptions(specs.volume?.min || 25, specs.volume?.max || 60);

  const [length, setLength] = useState(parseFloat(formData.length) || specs.length?.default || 6.0);
  const [width, setWidth] = useState(parseFloat(formData.width) || specs.width?.default || 19.5);
  const [volume, setVolume] = useState(formData.volume || specs.volume?.default || "");

  const isValid = length && width && volume;

  useEffect(() => {
    updateField("length", length);
    updateField("width", width.toFixed(2));
    updateField("volume", volume);
  }, [length, width, volume]);

  const incrementWidth = () => {
    if (width + 0.25 <= (specs.width?.max || 24)) {
      setWidth((prev) => parseFloat((prev + 0.25).toFixed(2)));
    }
  };

  const decrementWidth = () => {
    if (width - 0.25 >= (specs.width?.min || 17)) {
      setWidth((prev) => parseFloat((prev - 0.25).toFixed(2)));
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-sky-800 mb-6 text-center">
        Enter Your Board’s Dimensions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {/* Length Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Length (ft/in)</label>
          <select
            value={length}
            onChange={(e) => setLength(parseFloat(e.target.value))}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          >
            <option value="">Choose a length</option>
            {lengthOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            Range: {specs.length?.min}–{specs.length?.max} ft
          </p>
        </div>

        {/* Width Stepper */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Width (in)</label>
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

        {/* Volume Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Volume (L)</label>
          <select
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
          >
            <option value="">Choose a volume</option>
            {volumeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
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
