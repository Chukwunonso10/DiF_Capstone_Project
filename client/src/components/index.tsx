
import type { FC } from "react";

type UserProps = {
  avatarUrl: string;
  username: string;
  showFollowButton?: boolean;
};

const User: FC<UserProps> = ({ avatarUrl, username, showFollowButton = false }) => {
  return (
    <div className="flex items-center space-x-3">
      <img src={avatarUrl} alt={username} className="w-10 h-10 rounded-full" />
      <span className="font-medium text-gray-800">{username}</span>
      {showFollowButton && (
        <button className="text-blue-500 font-semibold text-sm ml-auto">Follow</button>
      )}
    </div>
  );
};

export default User;
