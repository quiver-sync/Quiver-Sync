import React, { useState } from "react";
import StepBoardType from "./steps/StepBoardType";
import StepBrandModel from "./steps/StepBrandModel";
import StepDimensions from "./steps/StepDimensions";
import StepFins from "./steps/StepFins";
import BoardStepper from "./BoardStepper";

const steps = ["Board Type", "Brand & Model", "Dimensions", "Fins"];

export default function AddBoardWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: "",
    image:"",
    brand: "",
    model: "",
    length: "",
    width: "",
    volume: "",
    fins: "",
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);
  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepBoardType
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
          />
        );
      case 1:
        return (
          <StepBrandModel
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 2:
        return (
          <StepDimensions
            formData={formData}
            updateField={updateField}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <StepFins
            formData={formData}
            updateField={updateField}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-sky-100 to-white flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl sm:max-w-2xl bg-white/90 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl px-4 py-6 sm:p-8">
        {/* Title */}
        <div className="mb-4 sm:mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-800">
            Add a New Board to Your Quiver
          </h1>
          <p className="text-sm text-sky-600 mt-1">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Stepper */}
        <div className="overflow-x-auto mb-8 sm:mb-10">
          <BoardStepper current={currentStep} steps={steps} />
        </div>

        {/* Current Step Component */}
        <div>{renderStep()}</div>
      </div>
    </div>
  );
}
