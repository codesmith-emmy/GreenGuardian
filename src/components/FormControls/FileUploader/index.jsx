import React, { useRef } from "react";
import { FaTrashAlt, FaImage } from "react-icons/fa";

const FileUploader = ({
  id,
  fileTypes = ["image/jpeg", "image/png", "image/gif"], // Restrict to image file types
  className,
  file,
  setFile,
}) => {
  const fileInputRef = useRef(null);

  const handleFiles = (selectedFiles) => {
    const filteredFiles = Array.from(selectedFiles).filter((file) =>
      fileTypes.includes(file.type)
    );

    if (filteredFiles.length > 0) {
      const newFile = filteredFiles[0];
      setFile({ file: newFile, preview: URL.createObjectURL(newFile) });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    handleFiles(selectedFiles);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={className}>
      <div
        className="w-full flex items-center justify-center border-2 border-gray-300 hover:border-green-400 focus:border-green-500 rounded-xl py-6 px-4 bg-white bg-opacity-20 cursor-pointer transition-all hover:bg-opacity-40"
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={fileTypes.join(",")}
          onChange={handleFileChange}
        />
        <label
          htmlFor={id}
          className="flex flex-col items-center cursor-pointer"
        >
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
          <div className="flex items-center justify-between border border-green-300 p-3 rounded-lg bg-white bg-opacity-30">
            <div className="mr-2">
              <FaImage className="text-green-500" />
            </div>
            <p className="text-sm text-gray-800 font-medium">
              {file.file.name}
            </p>
            <button
              type="button"
              onClick={() => setFile(null)}
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
