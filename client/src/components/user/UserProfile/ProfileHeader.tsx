// src/components/user/ProfileHeader.tsx
import React from "react";
import { ChevronDown } from "lucide-react";

interface ProfileHeaderProps {
  username: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username }) => {
  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
          <svg className="w-2 h-2" viewBox="0 0 8 8" fill="white">
            <rect x="1" y="1" width="6" height="6" rx="1" />
          </svg>
        </div>
        <span className="font-semibold text-lg">{username}</span>
        <ChevronDown className="w-4 h-4 text-gray-900" />
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="w-6 h-0.5 bg-gray-900 rounded"></div>
        <div className="w-6 h-0.5 bg-gray-900 rounded"></div>
        <div className="w-6 h-0.5 bg-gray-900 rounded"></div>
      </div>
    </div>
  );
};

export default ProfileHeader;
