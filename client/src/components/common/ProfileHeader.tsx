import React from "react";
import { ArrowLeft, Settings } from "lucide-react";

interface ProfileHeaderProps {
  username: string;
  onBack?: () => void;
  onMenuClick?: () => void;
  isDesktop?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  onBack,
  onMenuClick,
  isDesktop = false,
}) => {
  if (isDesktop) {
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-light">{username}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
            Edit profile
          </button>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
            View archive
          </button>
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
      <button onClick={onBack} className="p-2 -ml-2">
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <h1 className="text-base font-semibold">{username}</h1>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <button onClick={onMenuClick} className="p-2 -mr-2">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </header>
  );
};

export default ProfileHeader;
