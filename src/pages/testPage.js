import { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
  });
  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when typing
  };

  // Validate Form Fields
  const validate = () => {
    let newErrors = {};
    if (step === 1 && !formData.name.trim()) newErrors.name = "First name is required.";
    if (step === 2 && !formData.location.trim()) newErrors.location = "Location is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Move to Next Step (only if valid)
  const nextStep = () => {
    if (validate()) setStep(step + 1);
  };

  // Move to Previous Step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Submit Data
  const handleSubmit = async () => {
    if (!validate()) return;

    const response = await fetch("http://your-api-endpoint.com/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Data saved successfully!");
    } else {
      alert("Error saving data.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 1: Enter First Name</h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="border p-2 w-full mb-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white p-2 rounded mt-2"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Step 2: Enter Location</h2>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            className="border p-2 w-full mb-2"
          />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          <button
            onClick={prevStep}
            className="bg-gray-500 text-white p-2 rounded mr-2"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
