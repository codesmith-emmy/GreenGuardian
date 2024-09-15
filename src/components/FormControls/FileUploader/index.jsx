import React, { useRef } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaImage } from "react-icons/fa";

const FileUploader = ({
  label,
  id,
  fileTypes = ["image/jpeg", "image/png", "image/gif"], // Restrict to image file types
  className,
  file, // Single file object
  setFile, // Function to set the single file
  handleDelete, // Function to handle file removal
}) => {
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const selectedFile = selectedFiles[0]; // Since we only allow one file, take the first one

    if (fileTypes.includes(selectedFile.type)) {
      const newFile = {
        file: selectedFile,
        preview: URL.createObjectURL(selectedFile),
      };

      setFile(newFile); // Set the selected file
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFiles([droppedFile]); // Handle only the first dropped file
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFiles([selectedFile]); // Handle only the first selected file
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {label}
        </label>
      )}
      <div
        className="w-full flex items-center justify-center border-2 border-gray-300 hover:border-green-400 focus:border-green-500 rounded-xl py-6 px-4 bg-white bg-opacity-20 cursor-pointer transition-all hover:bg-opacity-40"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          className="hidden"
          accept={fileTypes.join(",")}
          onChange={handleFileChange}
        />
        <label className="flex flex-col items-center cursor-pointer">
          <div className="flex justify-center mb-2">
            <FaImage className="w-10 h-10 text-green-500" />
          </div>
          <p className="text-md text-gray-700">
            <span className="font-medium">Drop your image here, or</span>{" "}
            <span className="text-green-600 font-semibold">browse</span>
          </p>
        </label>
      </div>

      {file && (
        <div className="mt-4">
          <div className="flex items-center justify-between border border-green-300 p-3 rounded-lg bg-white bg-opacity-30 mb-2">
            <div className="mr-2">
              <img
                src={file.preview}
                alt={file.file.name}
                className="w-10 h-10 object-cover"
              />
            </div>
            <p className="text-sm text-gray-800 font-medium">
              {file.file.name}
            </p>
            <button
              type="button"
              onClick={() => handleDelete()}
              className="text-red-400 hover:text-red-600"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
