// src/components/common/Divider.tsx
import React from "react";

const Divider = () => (
  <div className="mt-8 flex items-center">
    <div className="flex-1 border-t border-gray-300" />
    <span className="px-4 text-gray-500 text-sm">OR</span>
    <div className="flex-1 border-t border-gray-300" />
  </div>
);

export default Divider;
