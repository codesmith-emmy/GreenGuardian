import React, { useState } from "react";
import toast from "react-hot-toast";
import { Form, TextBox, FileUploader } from "@components/FormControls";
import { clientBaseURL, clientEndPoints } from "../config";

const GetStarted = () => {
  const [species, setSpecies] = useState("");
  const [image, setImage] = useState(null); // Store the image and its preview
  // const [carePlan, setCarePlan] = useState(null);
  // const [healthStatus, setHealthStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    // Append species to the formData
    formData.append("species", species);

    // Append image file if available
    if (image) {
      formData.append("plant", image.file); // 'plant' key to send image file
    }

    try {
      const response = await clientBaseURL.post(
        `${clientEndPoints.createPlant}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response in Get Started:", response);
      if (response.status >= 200 && response.status < 300) {
        toast.success("Data Submitted Successfully");

        // Reset species and image after successful upload
        setSpecies("");
        setImage(null);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
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
            file={image}
            setFile={setImage}
            handleDelete={() => setImage(null)} // Reset the image state on delete
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
      {/* 
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
      )} */}
    </div>
  );
};

export default GetStarted;
