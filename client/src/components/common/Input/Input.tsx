// src/components/common/Input.tsx
import React from "react";

type InputProps = {
  variant?: string; // optional custom prop
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant,
  className = "",
  ...rest
}) => {
  return (
    <input
      {...rest}
      className={`w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  );
};

export default Input;
