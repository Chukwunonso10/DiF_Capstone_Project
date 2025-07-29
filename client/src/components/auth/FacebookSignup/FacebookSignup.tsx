// src/components/auth/FacebookSignup.tsx
import React from "react";
import fb from "../../../assets/icons/fb.png";

const FacebookSignup = () => (
  <button className="w-full flex items-center justify-center space-x-2 py-3 text-blue-500 font-semibold">
    <img src={fb} alt="Instagram" className="w-5 h-5" />
    <span>Sign up with Facebook</span>
  </button>
);

export default FacebookSignup;
