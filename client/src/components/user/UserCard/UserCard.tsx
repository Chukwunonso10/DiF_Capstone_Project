import React, { useState } from "react";
import UserAvatar from "../UserProfile/UserAvatar";
import FollowButton from "../FollowButton/FollowButton";

interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  isVerified?: boolean;
}

interface UserCardProps {
  user: User;
  onFollow: () => void;
  showFollowButton?: boolean;
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical";
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  onFollow,
  showFollowButton = true,
  size = "sm",
  layout = "horizontal",
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow();
  };

  const avatarSize =
    size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : "w-16 h-16";

  if (layout === "vertical") {
    return (
      <div className="flex flex-col items-center text-center p-4">
        <UserAvatar
          src={user.avatar}
          alt={user.username}
          size={size}
          className={avatarSize}
        />
        <div className="mt-2">
          <div className="flex items-center justify-center">
            <h3 className="font-semibold text-sm">{user.username}</h3>
            {user.isVerified && (
              <svg
                className="w-3 h-3 ml-1 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.248.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-xs text-gray-500 mt-1">{user.name}</p>
        </div>
        {showFollowButton && (
          <div className="mt-3">
            <FollowButton
              isFollowing={isFollowing}
              onClick={handleFollow}
              size="sm"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <UserAvatar
          src={user.avatar}
          alt={user.username}
          size={size}
          className={avatarSize}
        />
        <div>
          <div className="flex items-center">
            <h3 className="font-semibold text-sm">{user.username}</h3>
            {user.isVerified && (
              <svg
                className="w-3 h-3 ml-1 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.248.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-xs text-gray-500">{user.name}</p>
        </div>
      </div>
      {showFollowButton && (
        <FollowButton
          isFollowing={isFollowing}
          onClick={handleFollow}
          size="sm"
        />
      )}
    </div>
  );
};

export default UserCard;
