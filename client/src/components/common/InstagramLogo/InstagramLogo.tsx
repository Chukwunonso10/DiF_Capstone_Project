import React from "react";

interface InstagramLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const InstagramLogo: React.FC<InstagramLogoProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-5xl",
  };

  return (
    <h1
      className={`font-bold text-black ${sizeClasses[size]} ${className}`}
      style={{ fontFamily: "Billabong, cursive" }}
    >
      Instagram
    </h1>
  );
};

export default InstagramLogo;
