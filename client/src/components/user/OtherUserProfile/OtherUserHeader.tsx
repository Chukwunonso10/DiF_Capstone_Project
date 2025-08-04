import React from "react";
import { ArrowLeft, MoreHorizontal } from "lucide-react";

interface OtherUserHeaderProps {
  username: string;
  postsCount: number;
  onBack?: () => void;
  onMore?: () => void;
  isDesktop?: boolean;
}

const OtherUserHeader: React.FC<OtherUserHeaderProps> = ({
  username,
  postsCount,
  onBack,
  onMore,
  isDesktop = false,
}) => {
  if (isDesktop) {
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-light">{username}</h1>
        </div>

        <div className="flex items-center gap-4">
          {onMore && (
            <button
              onClick={onMore}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal className="w-6 h-6" />
            </button>
          )}
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <h1 className="text-base font-semibold">{username}</h1>
        {postsCount > 0 && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <div className="flex items-center">
        {onMore && (
          <button
            onClick={onMore}
            className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="More options"
          >
            <MoreHorizontal className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
};

export default OtherUserHeader;
