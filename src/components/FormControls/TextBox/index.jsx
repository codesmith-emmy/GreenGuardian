import React from "react";

const TextBox = ({
  className,
  disabled,
  label,
  type,
  placeholder,
  id,
  value,
  onChange,
  name,
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block w-full text-sm font-medium text-gray-900 mb-2"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="border border-gray-300 bg-gray-50 outline-none text-gray-900 text-sm rounded-md block w-full p-2.5 transition-all focus:outline-none hover:bg-white focus:bg-white hover:border-green-400 focus:border-green-500 disabled:bg-gray-200"
      />
    </div>
  );
};

export default TextBox;
