import React, { useState } from "react";
import toast from "react-hot-toast";
import { Form, TextBox, FileUploader } from "@components/FormControls";
import { clientBaseURL, clientEndPoints } from "../config";

const GetStarted = () => {
  const [species, setSpecies] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [plantDetails, setPlantDetails] = useState(null); // Store plant details

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("species", species);

    if (image) {
      formData.append("plant", image.file);
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

      if (response.status >= 200 && response.status < 300) {
        toast.success("Data Submitted Successfully");

        const plantId = response?.data?.id; // Capture the ID from POST response
        setSpecies("");
        setImage(null); // Clear the image state here
        fetchPlantDetails(plantId); // Pass the plant ID to fetch details
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

  // Function to fetch plant details
  const fetchPlantDetails = async (id) => {
    try {
      const response = await clientBaseURL.get(
        `${clientEndPoints.plantDetail}?image_id=${id}`
      );
      console.log("response in get api of plant details", response);
      if (response.status >= 200 && response.status < 300) {
        setPlantDetails(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching plant details:", error);
      toast.error("Failed to fetch plant details.");
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
            handleDelete={() => setImage(null)}
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

      {/* Display Plant Details Below the Form */}
      {plantDetails && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            Plant Care Details
          </h3>
          <p>
            <strong>Species:</strong> {plantDetails?.species}
          </p>
          <p>
            <strong>Watering Instructions:</strong> {plantDetails?.water}
          </p>
          <p>
            <strong>Light Requirements:</strong> {plantDetails?.light}
          </p>
          <p>
            <strong>Toxicity:</strong> {plantDetails?.toxicity}
          </p>
          <p>
            <strong>Humidity:</strong> {plantDetails?.humidity}
          </p>
          <p>
            <strong>Fertilizer:</strong> {plantDetails?.fertilizer}
          </p>
          <p>
            <strong>Health Status:</strong> {plantDetails?.health_status}
          </p>

          {/* Show Health Details only if the plant is unhealthy */}
          {plantDetails?.health_status === "Unhealthy" && (
            <p>
              <strong>Health Details:</strong> {plantDetails.health_detail}
            </p>
          )}

          <p>
            <strong>Notes:</strong> {plantDetails?.notes}
          </p>
          <div className="mt-4">
            <strong>Common Names:</strong>
            <ul className="list-disc pl-5">
              {plantDetails?.common_names?.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetStarted;
