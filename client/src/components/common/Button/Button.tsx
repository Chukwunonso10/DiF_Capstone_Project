// src/components/common/Button.tsx
import React from "react";

const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
  >
    {children}
  </button>
);

export default Button;
