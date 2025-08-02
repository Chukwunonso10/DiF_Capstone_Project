import React from "react";

interface FollowButtonProps {
  isFollowing: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  isFollowing,
  onClick,
  size = "md",
  disabled = false,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-3 py-1 text-xs";
      case "lg":
        return "px-6 py-2 text-base";
      default:
        return "px-4 py-1.5 text-sm";
    }
  };

  const baseClasses = `font-semibold rounded-lg transition-colors ${getSizeClasses()}`;

  if (isFollowing) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        Following
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses}  text-blue-500 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      Follow
    </button>
  );
};

export default FollowButton;
