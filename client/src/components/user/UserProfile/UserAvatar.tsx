import React from "react";

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  hasStory?: boolean;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  src,
  alt,
  size = "md",
  hasStory = false,
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  const storyRing = hasStory
    ? "ring-2 ring-gradient-to-r from-purple-500 to-pink-500 ring-offset-2"
    : "";

  return (
    <div
      className={`${sizeClasses[size]} rounded-full overflow-hidden ${storyRing} ${className}`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default UserAvatar;
