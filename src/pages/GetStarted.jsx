import React, { useState } from "react";
import axios from "axios";
import { Form, TextBox, FileUploader } from "@components/FormControls";

const GetStarted = () => {
  const [species, setSpecies] = useState("");
  const [images, setImages] = useState([]); // Store the image and its preview
  const [carePlan, setCarePlan] = useState(null);
  const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image to backend for health assessment
      const formData = new FormData();
      formData.append("image", image.file); // Pass the actual image file
      formData.append("species", species);

      const response = await axios.post("/api/plant-care", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCarePlan(response.data.carePlan);
      setHealthStatus(response.data.healthStatus);
    } catch (error) {
      console.error("Error fetching plant care data:", error);
      alert("There was an error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-screen-md mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        Get Started with Your Plant Care
      </h2>
      <Form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Plant Species
          </label>
          <TextBox
            type="text"
            value={species}
            onChange={handleSpeciesChange}
            required
            placeholder="e.g., Fiddle Leaf Fig"
            className="bg-gray-50 w-full rounded-md border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Plant Image
          </label>
          <FileUploader
            files={images}
            setFiles={setImages}
            handleDelete={(index) =>
              setImages(images.filter((_, i) => i !== index))
            }
            className="block w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </div>
      </Form>

      {carePlan && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Personalized Care Plan
          </h3>
          <p className="text-gray-800">{carePlan}</p>
        </div>
      )}

      {healthStatus && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-red-700 mb-4">
            Plant Health Assessment
          </h3>
          <p className="text-gray-800">{healthStatus}</p>
        </div>
      )}
    </div>
  );
};

export default GetStarted;
