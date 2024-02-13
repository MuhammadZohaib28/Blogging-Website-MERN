import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const InputBox = ({ name, type, id, value, placeholder, icon }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type == "password" ? (showPassword ? "text" : "password") : type}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="input-box"
      />

      <span className="input-icon">{icon}</span>

      {type == "password" && (
        <span
          className="input-icon left-[auto] right-3 cursor-pointer"
          onClick={() => setShowPassword((currentVal) => !currentVal)}
        >
          {showPassword ? (
            <FaEye className="text-2xl" />
          ) : (
            <FaEyeSlash className="text-2xl" />
          )}
        </span>
      )}
    </div>
  );
};

export default InputBox;
