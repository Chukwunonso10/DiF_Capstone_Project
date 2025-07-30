import React, { useState } from "react";

interface InputProps {
  type?: "text" | "email" | "password";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  showPasswordToggle?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  className = "",
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [, setIsFocused] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          className={`
            w-full px-3 py-2.5 text-sm
            bg-gray-50 border border-gray-300 rounded-sm
            focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }
            ${className}
          `}
        />

        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-gray-600 hover:text-gray-800"
            disabled={disabled}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
