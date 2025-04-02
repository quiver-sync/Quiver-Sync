import React from "react";

export default function BoardStepper({ current, steps }) {
  return (
    <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
      {steps.map((label, index) => {
        const isActive = index === current;
        const isCompleted = index < current;

        return (
          <div key={index} className="flex-1 text-center relative min-w-[70px]">
            {/* Step Circle */}
            <div
              className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-semibold text-sm transition duration-300 ${
                isCompleted
                  ? "bg-sky-600 text-white"
                  : isActive
                  ? "bg-white border-2 border-sky-500 text-sky-800"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>

            {/* Step Label */}
            <p
              className={`text-xs mt-2 font-medium truncate transition ${
                isCompleted || isActive ? "text-sky-700" : "text-gray-400"
              }`}
            >
              {label}
            </p>

            {/* Progress Bar Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-[18px] left-[50%] w-full translate-x-[50%] h-1">
                <div
                  className={`h-full ${
                    isCompleted ? "bg-sky-400" : "bg-gray-200"
                  }`}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
