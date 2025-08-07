// src/components/user/OtherUserProfile/OtherUserActions.tsx

import React, { useState } from "react";
import {
  MessageCircle,
  UserPlus,
  UserCheck,
  MoreHorizontal,
} from "lucide-react";

interface OtherUserActionsProps {
  isFollowing: boolean;
  onFollow: () => Promise<void>;
  onMessage: () => void;
  onMore?: () => void;
  className?: string;
}

const OtherUserActions: React.FC<OtherUserActionsProps> = ({
  isFollowing,
  onFollow,
  onMessage,
  onMore,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFollowClick = async () => {
    setIsLoading(true);
    try {
      await onFollow();
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Follow/Following Button */}
      <button
        onClick={handleFollowClick}
        disabled={isLoading}
        className={`flex-1 lg:flex-none lg:px-8 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 min-w-[100px] ${
          isFollowing
            ? "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isFollowing ? (
          <>
            <UserCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Following</span>
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Follow</span>
          </>
        )}
      </button>

      {/* Message Button */}
      <button
        onClick={onMessage}
        className="flex-1 lg:flex-none lg:px-8 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 min-w-[100px] border border-gray-300"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">Message</span>
      </button>

      {/* More Options Button */}
      {onMore && (
        <button
          onClick={onMore}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default OtherUserActions;
