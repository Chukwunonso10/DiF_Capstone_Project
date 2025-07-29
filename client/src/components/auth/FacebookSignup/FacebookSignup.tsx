import React from "react";
import fb from "../../../assets/icons/fb.png";

interface FacebookSignupProps {
  text?: string;
}

const FacebookSignup = ({
  text = "Sign up with Facebook",
}: FacebookSignupProps) => (
  <button className="w-full flex items-center justify-center space-x-2 py-3 text-blue-500 font-semibold">
    <img src={fb} alt="Facebook" className="w-5 h-5" />
    <span>{text}</span>
  </button>
);

export default FacebookSignup;
